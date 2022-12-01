const canvas = document.getElementById('canvas');
const canvas1 = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

let images;

let players = [];

images = [
    "./docs/assets/images/player_frames_img/dino-run-0.png",
    "./docs/assets/images/player_frames_img/dino-run-1.png",
    "./docs/assets/images/player_frames_img/dino-lose.png",
    "./docs/assets/images/player_frames_img/dino-stationary.png",
]


const titleScreen = document.getElementById('title-screen');
const levelsScreen = document.getElementById('levels');
const gameOverScreen = document.getElementById('game-over-screen');
const bgTVScreen = document.getElementById('bk-tv');
const titleButton = document.getElementById('title-button-start');
const restartButton = document.getElementById('restart-button');
const upsideDownButton = document.getElementById('btn-upsideDown');

titleButton.onclick = () => {
    event.preventDefault();
    if (document.getElementById('pseudo').value != "") {
        players.push({
            "name": document.getElementById('pseudo').value,
            "score": 0,
            "start": new Date(),
            "end": new Date()
        })
        song.play();
        titleScreen.classList.toggle('hidden');
        levelsScreen.classList.toggle('hidden');
        levelsScreen.classList.toggle('hidden');
        canvas.classList.toggle('hidden');
        canvas1.classList.toggle('hidden');
        canvas.classList.toggle('first-background');
        bgTVScreen.classList.toggle('hidden');
        localStorage.setItem("lastname", document.getElementById('pseudo').value);
        document.getElementById('pseudo').value = "";
        start();
    }

};


restartButton.onclick = () => {
    gameOverScreen.classList.toggle('hidden');
    titleScreen.classList.toggle('hidden');
};

const cWidth = canvas.width;
const cHeight = canvas.height;

let frames = 0;
let player;
let gravity;
let obstacles = [];
let gameSpeed;
let keys = {};
let interval = null;
let isRunning = false;

// function to draw the scene
function start() {

    // define the default game parameters
    gameSpeed = 5;
    gravity = 0.9;
    // add interval listening
    interval = setInterval(update, 1000 / 60);
    isRunning = true;
    // instanciate the t-rex player
    player = new Player(125, 10, 50, 100);
    player.playerDraw(frames);
};

let initialSpawTimer = 180;
let spawnTimer = initialSpawTimer;


// function to update the t-rex and the pterodactyles, cactus obstacles
function update() {
    // scoring
    players[players.length - 1].end = new Date();
    players[players.length - 1].score = end(players[players.length - 1].start, players[players.length - 1].end);
    /* if (keys["Space"]) { */
    frames++;
    ctx.clearRect(0, 0, cWidth, cHeight);
    // add the pseudo name
    ctx.font = "28px Arial";
    ctx.fillText("" + localStorage.getItem("lastname"), 10, 50);

    spawnTimer--;
    if (spawnTimer <= 0) {
        spawnObstacle();
        spawnTimer = initialSpawTimer - gameSpeed * 5500;

        if (spawnTimer < 60) {
            spawnTimer = 60;
        };
    };

    for (let i = 0; i < obstacles.length; i++) {
        let demon = obstacles[i];
        if (demon.x + demon.width < 0) {
            obstacles.splice(i, 1);
        };

        if (player.colision(demon)) {

            // sort the players by scores
            players.sort(function(a, b) {
                if (a.score < b.score) return 1;
                if (a.score > b.score) return -1;
                return 0;
            });
            let completelist = document.getElementById("list-example");
            let liste = "";
            let taille = players.length > 9 ? 10 : players.length;
            for (let i = 0; i < taille; i++) {

                liste += `<li class="list-group-item bg-transparent border-none">  ${players[i].name}  -> score:  ${players[i].score} </li> \n`;
            }
            console.table({ players, liste });
            completelist.innerHTML = liste;

            obstacles = [];
            clearInterval(interval);
            isRunning = false;
            spawnTimer;
            gameSpeed = 15;
            canvas.classList.toggle('hidden')
            canvas1.classList.toggle('hidden');
            canvas.classList.remove('first-background')
            canvas.classList.remove('second-background')
            gameOverScreen.classList.toggle('hidden')
            bgTVScreen.classList.toggle('hidden')
        };
        // update obstacle
        demon.update();
    };

    player.animate();
    player.playerDraw(frames);
    gameSpeed += 0.010;
};

function end(startTime, endTime) {
    let timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds 
    let seconds = Math.round(timeDiff);
    /* console.log(seconds + " seconds"); */
    return seconds;
}

let song = new Audio('./docs/assets/sounds/som_1.mp3');
song.loop = true;