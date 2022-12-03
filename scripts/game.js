
// constances

const titleScreen = document.getElementById('title-screen');
const levelsScreen = document.getElementById('levels');
const gameOverScreen = document.getElementById('game-over-screen');
const saveButton = document.getElementById('save');
const titleButton = document.getElementById('title-button-start');
const restartButton = document.getElementById('restart-button');
// differents t-rex states
images = [
    "./docs/assets/images/player_frames_img/dino-run-0.png",
    "./docs/assets/images/player_frames_img/dino-run-1.png",
    "./docs/assets/images/player_frames_img/dino-lose.png",
    "./docs/assets/images/player_frames_img/dino-stationary.png",
]

// listeners

titleButton.onclick = () => {
    event.preventDefault();
    gameSpeed = document.getElementById('validationDefault01').value;
    gameSpeed = document.getElementById('validationDefault01').value;

}


titleButton.onclick = () => {
    event.preventDefault();
    if (document.getElementById('pseudo').value != "") {
        drawCanvas('canvasP', 'canvas');
        drawCanvas('canvasP', 'canvas1');

        canvas = document.getElementById('canvas');
        canvas1 = document.getElementById('canvas1');
        ctx = canvas.getContext('2d');
        // console.log(document.getElementById('canvasP').innerHTML);
        cWidth = canvas.width;
        cHeight = canvas.height;
        song.play();
        titleScreen.classList.toggle('d-none');
        levelsScreen.classList.toggle('d-none');
        levelsScreen.classList.toggle('d-none');
        // canvas.classList.toggle('first-background');
        /* bgTVScreen.classList.toggle('d-none'); */
        localStorage.setItem("lastname", window.btoa(document.getElementById('pseudo').value));
        if (localStorage.getItem("listP")) {
            /* console.log(Object.values(JSON.parse(window.atob(localStorage.getItem("listP"))))[0]); */
            players = Object.values(JSON.parse(window.atob(localStorage.getItem("listP"))));
            bestP = players[0];
            /* console.log(players);
            console.log(bestP); */
        }
        players.push({
            "name": document.getElementById('pseudo').value,
            "score": 0,
            "start": new Date(),
            "end": new Date()
        });
        document.getElementById('pseudo').value = "";
        start();
    }

};


restartButton.onclick = () => {
    gameOverScreen.classList.toggle('d-none');
    titleScreen.classList.toggle('d-none');
};


// watch period
setInterval(updatePeriod, 1000 / 60);
