
// ── Prehistoric background drawn on canvas each frame ──
function drawBackground() {
    const isNight = period && period.includes('n');

    // 1. Sky gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, cHeight);
    if (isNight) {
        skyGrad.addColorStop(0,    '#050010');
        skyGrad.addColorStop(0.45, '#130430');
        skyGrad.addColorStop(0.72, '#2A0C08');
        skyGrad.addColorStop(1,    '#3D1200');
    } else {
        skyGrad.addColorStop(0,    '#FFE8D0');
        skyGrad.addColorStop(0.28, '#F4A460');
        skyGrad.addColorStop(0.62, '#C85A00');
        skyGrad.addColorStop(1,    '#7B2D00');
    }
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, cWidth, cHeight);

    // 2. Stars (night only)
    if (isNight) {
        ctx.fillStyle = 'rgba(255, 248, 210, 0.88)';
        [[5,5],[15,10],[25,3],[35,8],[45,4],[55,12],[65,6],[75,9],[85,2],[92,7],
         [10,18],[30,15],[50,20],[70,16],[88,13],[20,8],[42,15],[62,3],[80,11]
        ].forEach(([xP, yP]) => {
            ctx.beginPath();
            ctx.arc(cWidth * xP / 100, cHeight * yP / 100, 1.2, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // 3. Back mountain layer
    ctx.fillStyle = isNight ? '#0C0025' : '#6B2800';

    // Back-left mountain
    ctx.beginPath();
    ctx.moveTo(-cWidth * 0.05, cHeight * 0.75);
    ctx.lineTo(cWidth * 0.10,  cHeight * 0.32);
    ctx.lineTo(cWidth * 0.24,  cHeight * 0.75);
    ctx.closePath();
    ctx.fill();

    // Volcano (right side with crater)
    ctx.beginPath();
    ctx.moveTo(cWidth * 0.55,  cHeight * 0.75);
    ctx.lineTo(cWidth * 0.72,  cHeight * 0.20);
    ctx.lineTo(cWidth * 0.755, cHeight * 0.185);
    ctx.lineTo(cWidth * 0.805, cHeight * 0.185);
    ctx.lineTo(cWidth * 0.84,  cHeight * 0.20);
    ctx.lineTo(cWidth * 1.02,  cHeight * 0.75);
    ctx.closePath();
    ctx.fill();

    // 4. Lava glow + animated smoke at crater
    const cX = cWidth * 0.78;
    const cY = cHeight * 0.185;
    const glowR = cWidth * 0.055 + cWidth * 0.008 * Math.sin(frames * 0.04);

    const lavaGlow = ctx.createRadialGradient(cX, cY, 0, cX, cY, glowR * 2);
    if (isNight) {
        lavaGlow.addColorStop(0,   'rgba(255, 80, 0, 0.75)');
        lavaGlow.addColorStop(0.4, 'rgba(200, 30, 0, 0.35)');
        lavaGlow.addColorStop(1,   'rgba(140, 0, 0, 0)');
    } else {
        lavaGlow.addColorStop(0,   'rgba(255, 215, 0, 0.65)');
        lavaGlow.addColorStop(0.4, 'rgba(255, 100, 0, 0.30)');
        lavaGlow.addColorStop(1,   'rgba(255, 40, 0, 0)');
    }
    ctx.fillStyle = lavaGlow;
    ctx.beginPath();
    ctx.arc(cX, cY, glowR * 2, 0, Math.PI * 2);
    ctx.fill();

    // Smoke puffs
    const smokeA = 0.18 + 0.06 * Math.sin(frames * 0.03);
    ctx.fillStyle = isNight
        ? `rgba(60, 15, 15, ${smokeA})`
        : `rgba(100, 45, 10, ${smokeA})`;
    ctx.beginPath(); ctx.arc(cX, cY - cHeight * 0.05, cWidth * 0.022, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cX + cWidth * 0.015, cY - cHeight * 0.09, cWidth * 0.016, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(cX - cWidth * 0.01,  cY - cHeight * 0.12, cWidth * 0.012, 0, Math.PI * 2); ctx.fill();

    // 5. Front mountain (darker, closer)
    ctx.fillStyle = isNight ? '#050012' : '#3C1500';
    ctx.beginPath();
    ctx.moveTo(-cWidth * 0.02, cHeight * 0.82);
    ctx.lineTo(cWidth * 0.14,  cHeight * 0.50);
    ctx.lineTo(cWidth * 0.18,  cHeight * 0.47);
    ctx.lineTo(cWidth * 0.22,  cHeight * 0.50);
    ctx.lineTo(cWidth * 0.42,  cHeight * 0.82);
    ctx.closePath();
    ctx.fill();

    // 6. Ground fill
    const groundGrad = ctx.createLinearGradient(0, cHeight * 0.82, 0, cHeight);
    if (isNight) {
        groundGrad.addColorStop(0, '#1C0500');
        groundGrad.addColorStop(1, '#080200');
    } else {
        groundGrad.addColorStop(0, '#6B2800');
        groundGrad.addColorStop(1, '#3D1500');
    }
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, cHeight * 0.82, cWidth, cHeight);
}

// methods
function drawCanvas(parent, id) {
    let canvas = document.createElement('canvas');
    const div = document.getElementById(parent);
    canvas.id = id;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    div.appendChild(canvas);
}

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};


const FRAME_DURATION = 1000 / 60;

function gameLoop(timestamp) {
    const elapsed = timestamp - lastTime;
    if (elapsed >= FRAME_DURATION) {
        lastTime = timestamp - (elapsed % FRAME_DURATION);
        update();
    }
    if (isRunning) {
        interval = requestAnimationFrame(gameLoop);
    }
}

// Start the game
function start() {
    gameSpeed = 5;
    gravity = 0.9;
    lastTime = 0;
    gameClock = new clocks();
    interval = requestAnimationFrame(gameLoop);
    myVar = setInterval(function(){
        gameSpeed += 0.1;
    }, 15000);
    isRunning = true;
    isPaused = false;
    if(window.mobileCheck() == true){
        player = new Player(0, 0, 50, 100);
    }else{
        player = new Player(125, 0, 50, 100);
    }
    player.playerDraw(frames);
}


// Main game loop — 60 fps
function update() {

    if (isPaused) return;

    // scoring
    players[players.length - 1].end = new Date();
    players[players.length - 1].score = end(players[players.length - 1].start, players[players.length - 1].end);
    if(players[players.length - 1].score % 10 == 0){
        levelUpSong.play();
    }

    frames++;
    ctx.clearRect(0, 0, cWidth, cHeight);
    drawBackground();

    // HUD text — warm cream (night) / dark brown (day), with shadow for contrast
    const isNight = period && period.includes('n');
    ctx.fillStyle  = isNight ? "rgba(255, 220, 175, 0.95)" : "rgba(20, 8, 0, 0.92)";
    ctx.shadowColor = isNight ? "rgba(0,0,0,0.85)" : "rgba(255,200,100,0.55)";
    ctx.shadowBlur  = 5;
    ctx.font = "2vh Arial";

    ctx.fillText("" + window.atob(localStorage.getItem("lastname")), 0, 50);

    const best = Object.keys(bestP).length !== 0 ? bestP.score : players[players.length - 1].score;
    const current = players[players.length - 1];
    const Clock = gameClock;
    const level = Math.max(1, Math.floor(gameSpeed - 4));
    const temp = MyWeather.currentWeather ? MyWeather.currentWeather.temp + "°C" : "--°C";

    if(window.mobileCheck() == true){
        ctx.fillText(Clock.getTime(), cWidth - 32*cWidth/100, 30);
        ctx.fillText("best score : " + best, cWidth - 30*cWidth/100, 50);
        ctx.fillText("your score : " + players[players.length - 1].score, cWidth - 30*cWidth/100, 70);
        ctx.fillText(temp, cWidth - 30*cWidth/100, 90);
        ctx.fillText("level : " + level, cWidth - 30*cWidth/100, 110);
    }else{
        ctx.fillText(Clock.getTime(), cWidth - 12*cWidth/100, 30);
        ctx.fillText("best score : " + best, cWidth - 10*cWidth/100, 50);
        ctx.fillText("your score : " + players[players.length - 1].score, cWidth - 10*cWidth/100, 70);
        ctx.fillText(temp, cWidth - 10*cWidth/100, 90);
        ctx.fillText("level : " + level, cWidth - 10*cWidth/100, 110);
    }

    ctx.shadowBlur = 0;

    // draw ground line
    ctx.strokeStyle = isNight ? 'rgba(200, 120, 60, 0.55)' : 'rgba(80, 30, 0, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, cHeight - 1);
    ctx.lineTo(cWidth, cHeight - 1);
    ctx.stroke();

    spawnTimer--;
    if (spawnTimer <= 0) {
        spawnObstacle();
        spawnTimer = initialSpawTimer - gameSpeed * 5500;
        if (spawnTimer < 60) {
            spawnTimer = 60;
        }
    }

    for (let i = 0; i < obstacles.length; i++) {
        const demon = obstacles[i];
        if (demon.x + demon.width < 0) {
            obstacles.splice(i, 1);
        }

        if (player.colision(demon)) {

            // sort players by score
            players.sort(function(a, b) {
                if (a.score < b.score) return 1;
                if (a.score > b.score) return -1;
                return 0;
            });

            // build top-10 list
            let liste = "";
            const taille10 = players.length > 9 ? 10 : players.length;
            for (let i = 0; i < taille10; i++) {
                liste += `<tr>
                    <th scope="row">${i+1}</th>
                    <td>${players[i].name}</td>
                    <td>${players[i].score}</td>
                    <td>${format(players[i].end)}</td>
                </tr>`;
            }
            document.getElementById('top10').innerHTML = liste;

            // build full score list
            liste = "";
            for (let i = 0; i < players.length; i++) {
                liste += `<tr>
                    <th scope="row">${i+1}</th>
                    <td>${players[i].name}</td>
                    <td>${players[i].score}</td>
                    <td>${format(players[i].end)}</td>
                </tr>`;
            }
            document.getElementById('scoreL').innerHTML = liste;
            document.getElementById('score').innerHTML = current.score;
            document.getElementById('score1').innerHTML = current.score;
            document.getElementById('scoreb').innerHTML = players[0].score;
            document.getElementById('currentDate').innerHTML = format(current.end);

            localStorage.setItem("listP", window.btoa(JSON.stringify(Object.assign({}, players))));

            obstacles = [];
            isRunning = false;
            cancelAnimationFrame(interval);
            clearInterval(myVar);
            isPaused = false;
            spawnTimer = initialSpawTimer;
            gameSpeed = 5;
            document.getElementById('canvasP').innerHTML = "";
            gameOverScreen.classList.toggle('d-none');
            gameOverSong.play();
            return;
        }

        demon.update();
    }

    player.animate();
    player.playerDraw(frames);
}

// Score = elapsed seconds
function end(startTime, endTime) {
    return Math.round((endTime - startTime) / 1000);
}

function format(d) {
    return new Date(d).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        hour12: true,
    });
}

// Instantiate weather and audio
let MyWeather = new Weather();

let song = new Audio('./docs/assets/sounds/som_1.mp3');
song.loop = true;
let gameOverSong = new Audio('./docs/assets/sounds/game-over.wav');
let levelUpSong = new Audio('./docs/assets/sounds/level-up.mp3');

handleWeather();
