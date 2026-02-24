# DinoChromeGame

Endless runner inspiré du T-Rex hors-ligne de Chrome, développé intégralement en **HTML5 / CSS3 / JavaScript vanilla**. Aucun outil de build, aucun gestionnaire de paquets: ouvrir `index.html` suffit.

---

## Fonctionnalités

- Personnage T-Rex animé (sprites frame par frame)
- Deux types d'obstacles : **cactus** (sol) et **ptérodactyle** (hauteur variable)
- Accélération progressive du jeu toutes les 15 secondes
- **Cycle jour / nuit** automatique basé sur l'heure locale (avant 18 h → jour, après → nuit)
- **Météo en temps réel** via API Weatherbit : fond, pluie, soleil, lune, nuages s'adaptent aux conditions météo de la position GPS de l'utilisateur
- **HUD** : pseudo, horloge, meilleur score, score courant, température, niveau
- **Pause** : touche `Échap`
- **Leaderboard** persistant en `localStorage`: Top-10 + historique complet
- Panneau de paramètres : vitesse, météo et période configurables manuellement
- Compatible mobile : détection UA + contrôles tactiles

---

## Lancer le projet

Aucune installation requise. Deux méthodes :

```bash
# Option 1: serveur local Python (recommandé)
python3 -m http.server 8080
# puis ouvrir http://localhost:8080

# Option 2: directement dans le navigateur
open index.html
```

> Un serveur local est recommandé car la géolocalisation (`navigator.geolocation`) et l'API météo requièrent une origine HTTP valide.

---

## Contrôles

| Action | Clavier | Mobile |
|--------|---------|--------|
| Sauter | `Z` ou `↑` | Tap (partie haute de l'écran) |
| S'accroupir | `S` ou `↓` | Tap (partie basse: 60 %+) |
| Pause / Reprendre | `Espace` | — |

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Structure | HTML5 |
| Style | CSS3 + Bootstrap 5.0.2 (CDN) |
| Logique | JavaScript ES6 vanilla |
| Rendu jeu | Canvas 2D API |
| HTTP | `fetch()` natif |
| Géolocalisation | `navigator.geolocation` |
| Persistance | `localStorage` |
| UI composants | Bootstrap 5 (toasts, tabs, pills, cards) |

---

## Architecture des fichiers

```
DinoChromeGame/
├── index.html              Point d'entrée unique: HTML + ordre de chargement des scripts
├── styles.css              Animations CSS (pluie, snowflakes, thème)
├── docs/
│   └── assets/
│       ├── images/         Sprites et images statiques
│       │   ├── player_frames_img/   dino-run-0/1, dino-lose, dino-stationary
│       │   ├── cactus.png
│       │   └── pterodactyles.png
│       ├── sounds/         Effets sonores et musique de fond
│       │   ├── som_1.mp3           Musique de fond (loop)
│       │   ├── jump-sound.mp3
│       │   ├── level-up.mp3
│       │   └── game-over.wav
│       └── favicon_package_v0/
└── scripts/
    ├── gps.js              Classe GPS: wraps navigator.geolocation
    ├── clocks.js           Classe clocks: formatage horloge HUD
    ├── Weather.js          Classe Weather: appel API Weatherbit via fetch()
    ├── state.js            Variables globales (source of truth unique)
    ├── environment.js      Gestion période jour/nuit et effets météo visuels
    ├── game.env.js         Moteur de jeu : drawCanvas, start(), update()
    ├── demonTopo.js        Classe Obstacle2: ptérodactyle
    ├── demons.js           Classe Obstacle (cactus) + spawnObstacle()
    ├── personagem.js       Classe Player + event listeners clavier/touch
    └── game.js             Handlers UI : titre, restart, settings, son
```

### Ordre de chargement (`defer` dans `<head>`)

```
gps.js → clocks.js → Weather.js → state.js → environment.js → game.env.js
                                                        ↓ (bas du <body>)
                              demonTopo.js → demons.js → personagem.js → game.js
```

Chaque script s'appuie sur les globaux définis par les scripts précédents. `state.js` doit toujours être chargé avant `environment.js` et `game.env.js`.

---

## État global (`state.js`)

Toutes les variables partagées sont déclarées ici. Aucun script ne redéclare ces variables.

| Variable | Valeur initiale | Rôle |
|----------|----------------|------|
| `canvas` / `ctx` | `null` | Créés dynamiquement au démarrage |
| `cWidth` / `cHeight` |: | Dimensions du canvas |
| `gameSpeed` | `5` | Vitesse de défilement des obstacles (+0.1 / 15 s) |
| `gravity` | `0.9` | Accélération gravitationnelle appliquée au player |
| `isRunning` | `false` | Partie en cours |
| `isPaused` | `false` | Togglé par `Échap` |
| `weather` | `'rain,sun'` | `'rain'`, `'sun'` ou `'rain,sun'`: mis à jour par l'API |
| `period` |: | `'d'` (jour) ou `'n'` (nuit): mis à jour par l'heure locale ou l'API |
| `players` | `[]` | Tableau de toutes les parties (`{name, score, start, end}`) |
| `bestP` | `{}` | Meilleure partie chargée depuis `localStorage` |
| `spawnTimer` | `180` | Compteur frames entre deux obstacles |
| `keys` | `{}` | État clavier courant (`keys["ArrowUp"] = true/false`) |

---

## Flux de jeu

```
Écran Titre
  └── saisie pseudo → clic "Press to Start"
        └── drawCanvas() crée le canvas
        └── localStorage chargé → players[], bestP
        └── start() → setInterval(update, 1000/60) + setInterval(speed++, 15000)
              └── update(): boucle 60 fps
                    ├── isPaused → overlay pause, return
                    ├── Score (secondes écoulées)
                    ├── Effacement canvas + dessin HUD + sol
                    ├── spawnTimer-- → spawnObstacle() si <= 0
                    ├── Mise à jour obstacles, détection sortie gauche
                    └── player.colision(obstacle) → GAME OVER
                          ├── Tri players[], top-10, sauvegarde localStorage
                          ├── Affichage écran Game Over
                          └── gameOverSong.play()

Écran Game Over (onglets Bootstrap)
  ├── Onglet "Game Over" : score actuel + meilleur score + date
  ├── Onglet "Top 10" : tableau des 10 meilleures parties
  ├── Onglet "Score List" : historique complet
  └── Onglet "Settings" : vitesse / météo / période + boutons save/reload/clear
        └── Bouton "Restart" → retour Écran Titre
```

---

## Mécanique des obstacles

`spawnObstacle()` (dans `demons.js`) choisit aléatoirement entre :
- **`Obstacle`** (cactus): au sol, taille 45–65 px
- **`Obstacle2`** (ptérodactyle): à `cHeight` ou `cHeight - 2*size`, deux hauteurs possibles

Le `spawnTimer` est recalculé après chaque spawn : `180 - gameSpeed * 5500`, plancher à 60 frames. À mesure que `gameSpeed` augmente, les obstacles arrivent plus vite **et** plus souvent.

---

## Intégration météo

```
GPS.Watcher()
  └── navigator.geolocation.getCurrentPosition()
        └── lat / lon disponibles

Weather.getCurrentWeather()
  └── fetch("https://weatherbit-v1-mashape.p.rapidapi.com/current?lat=...&lon=...")
        └── data.data[0].weather.code → getDecisionWeather() → weather ('rain'/'sun'/'rain,sun')
        └── data.data[0].pod          → getDecisionPeriod()  → period ('d'/'n')
        └── data.data[0].temp         → MyWeather.currentWeather.temp → HUD
```

**Codes météo → décision :**

| Codes | Décision `weather` |
|-------|--------------------|
| 200–202, 500–522, 600–602, 610, 900 | `'rain'` |
| 230–233, 300–302, 700–751 (drizzle) | `'sun'` |
| 800–804 (clear / clouds) | `'sun'` |
| 200–202 (thunder + rain) | `'rain,sun'` |

**Effets visuels déclenchés par `environment.js` :**

| Condition | Effets |
|-----------|--------|
| `period='d'` + `weather` inclut `'sun'` | Fond `bg-info`, icône soleil visible |
| `period='d'` + `weather` inclut `'rain'` | Icône nuages visible |
| `period='n'` | Fond `bg-dark`, icône lune visible |
| `weather` inclut `'rain'` | 51 `<div class="snowflake">` injectés (`#snow`) |

Le `PeriodWatch` vérifie l'heure toutes les **5 secondes** (simple, non bloquant).

---

## Persistance `localStorage`

| Clé | Valeur | Encodage |
|-----|--------|----------|
| `lastname` | Pseudo du joueur | `btoa(pseudo)` |
| `listP` | Tableau `players[]` sérialisé | `btoa(JSON.stringify(Object.assign({}, players)))` |

> `btoa` / `atob` = base64. Ce n'est **pas** du chiffrement, c'est uniquement pour éviter que les valeurs soient directement lisibles dans l'inspecteur.

---

## Panneau de paramètres (Settings)

Accessible depuis l'onglet Settings de l'écran Game Over. Permet de surcharger les valeurs détectées automatiquement :

| Champ | ID DOM | Variable cible |
|-------|--------|----------------|
| Vitesse du jeu | `validationDefault01` | `gameSpeed` |
| Météo | `validationDefault02` | `weather` |
| Période | `validationDefault03` | `period` |

- **Save** : applique les valeurs + `startPeriodWatcherU()` (watcher sur config manuelle)
- **Reload weather** : réinitialise `startPeriodWatcher()` (retour détection automatique)
- **Clear list** : supprime `listP` de `localStorage`

---

## Classe Player (physique)

```
Etat repos    → grounded=true, speedY=0
Saut          → speedY = -jumpForce * 1.5, pendant max 10 frames
Accroupissem. → height réduit de 20%, y ajusté au sol
Gravité       → speedY += 0.9 chaque frame tant que !grounded
Collision     → AABB (boîtes englobantes axiales)
```

Les sprites alternent entre `dino-run-0.png` et `dino-run-1.png` selon `frames % 2`. En cas de collision, `dino-lose.png` aurait vocation à être utilisé (non implémenté : le canvas est effacé immédiatement au game-over).

---

## Dépendances externes

| Lib | Version | Usage | Source |
|-----|---------|-------|--------|
| Bootstrap | 5.0.2 | UI (layout, composants, toasts) | CDN jsdelivr |
| Weatherbit API | v1 | Météo temps réel | RapidAPI (`weatherbit-v1-mashape`) |

Toutes les autres fonctionnalités (Canvas, fetch, geolocation, localStorage, Audio) utilisent des **APIs web natives**.

---

## Points d'attention

- **Clé API** : codée en base64 dans `Weather.js` ligne 44. Elle est visible dans les sources. Pour la protéger, un proxy serveur serait nécessaire.
- **Géolocalisation** : le navigateur demande la permission à l'utilisateur. En cas de refus, `lat=0 / lon=0` est envoyé à l'API (zone équatoriale par défaut).
- **Audio autoplay** : les navigateurs bloquent l'autoplay sans interaction utilisateur. La musique de fond (`song`) démarre au premier clic sur la page.
- **API météo** : si l'appel échoue (quota dépassé, réseau), `weather` reste à `'rain,sun'` (valeur par défaut de `state.js`) et `MyWeather.currentWeather` reste `null`: le HUD affiche `--°C`.
