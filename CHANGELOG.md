# Changelog

Toutes les modifications notables de ce projet sont documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/).

---

## [2.1.0] - 2026-02-24

### Ajouté
- **Obstacles dessinés en Canvas 2D** : `Obstacle` (cactus vert) et `Obstacle2` (ptérodactyle violet avec animation d'ailes) remplacent les sprites PNG — plus aucun `new Image()` ni `ctx.drawImage`
- **Animation d'ailes** du ptérodactyle : alterne entre ailes levées / baissées toutes les 12 frames via `frames % 24`

### Modifié
- `setInterval` → `requestAnimationFrame` + cap 60 fps (`FRAME_DURATION = 1000/60`) dans `game.env.js`
- Pause déplacée de `Échap` vers **barre d'espace** ; overlay dessiné une seule fois au `keydown` (plus d'accumulation d'opacité)
- `cancelAnimationFrame` à la place de `clearInterval` au game-over

### Supprimé
- `docs/assets/images/cactus.png` (remplacé par canvas)
- `docs/assets/images/pterodactyles.png` (remplacé par canvas)

---

## [2.0.0] - 2026-02-24

### Ajouté
- **Pause** : touche `Échap` met le jeu en pause / reprend ; overlay semi-transparent avec texte centré sur le canvas
- **Indicateur de niveau** sur le HUD (desktop et mobile) — niveau calculé à partir de `gameSpeed`
- **Ligne de sol** dessinée sur le canvas à chaque frame (couleur adaptée au thème jour/nuit)
- **Contrôles tactiles** : tap sur la partie haute de l'écran → saut ; tap sur la partie basse (60 %+) → accroupissement
- `scripts/state.js` — fichier dédié à toutes les variables globales de l'état du jeu
- `scripts/environment.js` — fonctions période/météo extraites de `game.env.js` (`updatePeriod`, `updateDayP`, `updateNightP`, `setSnowflakes`, `handleWeather`, watchers)

### Modifié
- `game.env.js` réduit au moteur de jeu pur : `drawCanvas`, `mobileCheck`, `start`, `update`, `end`, `format`
- `update()` : commentaires morts et code commenté supprimés, branchement mobile/desktop HUD unifié
- `Weather.js` : **axios remplacé par `fetch()` natif** (suppression dépendance CDN)
- `personagem.js` : `new Audio()` pré-instancié dans le constructeur — fini la création d'une instance audio à chaque saut ; `currentTime = 0` pour rejouer depuis le début
- `game.js` : `event` implicite (`window.event`) → paramètre explicite `(e)` sur `saveButton.onclick` et `titleButton.onclick` ; double `levelsScreen.classList.toggle` corrigé ; `console.log` de debug supprimé
- `game.env.js` : `div` implicite dans `drawCanvas` → `const div` ; `let myvar` (typo) → `let myVar` ; `spawnTimer;` (no-op) → `spawnTimer = initialSpawTimer` ; `canvas1` supprimé ; bloc commenté `MyWeather` (45 lignes) supprimé
- `startPeriodWatcher` / `startPeriodWatcherU` : intervalle réduit de **60 fps → 5 000 ms**
- Génération des snowflakes : 51 `<div>` hardcodés × 2 → `Array.from({length:51})` dans `setSnowflakes(active)` partagée entre `game.env.js` et `Weather.js`
- Température HUD : `MyWeather.temp` (toujours `undefined`) → `MyWeather.currentWeather?.temp` avec fallback `"--°C"`
- `.gitignore` : ajout de `.idea/`

### Supprimé
- `scripts/rain.js` (360 lignes, jamais chargé)
- `scripts/rain.1.js` (jamais chargé)
- `style.css` (jamais lié dans `index.html`)
- `snow.css+` (extension invalide, jamais lié)
- `docs/trash.log` (log de développement commité par erreur)
- `sass.js` CDN (chargé deux fois, jamais utilisé)
- `axios` CDN (remplacé par `fetch()`)

---

## [1.3.2] - 2022-12-03

### Corrigé
- Chargement de la page revu : ajout d'un script manquant dans `index.html`
- Nettoyage mineur dans `Weather.js` (suppression d'une ligne superflue)

---

## [1.3.1] - 2022-12-03

### Ajouté
- Bouton pour effacer la liste des scores (`clearL`) avec confirmation via toast Bootstrap
- Bouton de rechargement de la configuration météo (`reloadP`)

### Modifié
- Amélioration de l'UX sur l'écran game-over : boutons d'action plus accessibles
- `game.js` : gestionnaires d'événements pour les nouveaux boutons

---

## [1.3.0] - 2022-12-03

### Ajouté
- Panneau de paramètres utilisateur : vitesse du jeu, période (jour/nuit), météo configurables manuellement
- Affichage de la température en temps réel sur le HUD du canvas (`MyWeather.temp °C`)
- Notifications toast Bootstrap (confirmation de sauvegarde, erreur de formulaire)
- Système météo réactif : `startPeriodWatcher` / `startPeriodWatcherU` / `stopPeriodWatcher`

### Modifié
- `Weather.js` : amélioration de la récupération des données et de l'affichage
- `clocks.js` : simplification du formatage de l'heure
- `game.js` : refactorisation complète des handlers d'événements (`saveButton`, `reloadButton`, `clearButton`, `soundChecker`)
- `game.env.js` : logique météo réactive découplée en fonctions indépendantes

---

## [1.3-beta] - 2022-12-03

### Ajouté
- Sons du jeu : game-over (`.wav`), level-up (`.mp3`), saut (`.mp3`)
- Son de saut déclenché à chaque appui via la classe `Player`
- Musique de fond avec contrôle checkbox (activer/désactiver)
- Leaderboard Top-10 et liste complète des scores sur l'écran game-over
- Score persisté en `localStorage` (clé `listP`, encodé en base64 JSON)
- Meilleur score (`bestP`) chargé et affiché sur le HUD
- Affichage de la date de fin de partie dans le tableau des scores

### Modifié
- Écran game-over enrichi : score actuel, meilleur score, tableau Bootstrap avec onglets
- `personagem.js` : intégration du son de saut dans la méthode `jump()`

---

## [1.3-alpha] - 2022-12-03

### Ajouté
- Gestion complète du cycle jour/nuit : `updateDayP()`, `updateNightP()`, `PeriodUserConf()`
- Affichage dynamique soleil / lune / nuages selon la période et la météo
- Changement de thème du body (`bg-info text-dark` le jour, `bg-dark text-white` la nuit)
- Watcher de période (`PeriodWatch`) mis à jour à 60 fps

### Modifié
- `game.env.js` : refactorisation majeure (+168 lignes), logique environnementale centralisée
- `styles.css` : retravail des animations pluie/neige

---

## [1.2] - 2022-12-02 / 2022-12-03

### Ajouté
- Image du ptérodactyle mise à jour (meilleure résolution, fond transparent)
- Variables et états manquants corrigés dans `game.env.js`

### Modifié
- `demons.js` : correction de la position verticale de l'`Obstacle2` (ptérodactyle)
- `index.html` : intégration des notifications toast et bouton de démarrage stabilisé
- `Weather.js` : amélioration de la robustesse des appels API

---

## [1.1] - 2022-12-02

### Modifié
- `game.env.js` : corrections du watcher de période (gestion des états initiaux)

---

## [1.0] - 2022-12-02

### Ajouté
- `game.env.js` : fichier d'environnement principal extrait de `game.js` (variables globales, `start()`, `update()`, `drawCanvas()`, détection mobile `mobileCheck()`)
- `Weather.js` : logique de décision météo (`getDecisionWeather()`, `getDecisionPeriod()`) basée sur les codes Weatherbit
- `gps.js` : classe `GPS` utilisant `navigator.geolocation` pour récupérer lat/lon en temps réel

### Modifié
- `game.js` allégé : logique de jeu déplacée vers `game.env.js`
- Séparation nette entre l'environnement (météo, période, canvas) et le contrôle UI

---

## [0.2] - 2022-12-02

### Ajouté
- Intégration de **Bootstrap 5** (CDN) pour la mise en page et les composants UI
- Écran titre avec formulaire de saisie du pseudo
- Écran game-over (structure initiale)
- `styles.css` : feuille de style principale (animation pluie, fond)
- `snow.css+` : animation des flocons de neige / pluie (`.snowflake`)
- `gps.js` : première version de la classe `GPS`
- `clocks.js` : classe `clocks` affichant la date et l'heure sur le HUD
- `Weather.js` : intégration de l'API Weatherbit via RapidAPI + axios (CDN)

### Modifié
- `index.html` : refonte complète de la structure HTML avec Bootstrap
- `game.js` : ajout de l'affichage du pseudo, de l'horloge et du score sur le canvas

---

## [0.1] - 2022-12-01

### Ajouté
- Moteur de jeu en JavaScript orienté objet from scratch
- Classe `Player` : physique (gravité, saut, accroupissement), détection de collision AABB, animation de sprites
- Classe `Obstacle` (cactus) et `Obstacle2` (ptérodactyle à deux hauteurs)
- Boucle de jeu à 60 fps via `setInterval`
- Accélération progressive du jeu toutes les 15 secondes
- Contrôles clavier : `Z` / `ArrowUp` (saut), `S` / `ArrowDown` (accroupissement)
- Sprites du dino : `dino-run-0`, `dino-run-1`, `dino-lose`, `dino-stationary`
- Assets graphiques : cactus, ptérodactyle, icône favicon
- Son de saut (`jump-sound.mp3`)

---

## [0.0.1] - 2022-12-01

### Ajouté
- Initialisation du dépôt Git
- `LICENSE` (MIT)
- `README.md`