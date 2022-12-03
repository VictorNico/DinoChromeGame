
// constances

const titleScreen = document.getElementById('title-screen');
const levelsScreen = document.getElementById('levels');
const gameOverScreen = document.getElementById('game-over-screen');
const saveButton = document.getElementById('save');
const titleButton = document.getElementById('title-button-start');
const restartButton = document.getElementById('restart-button');
const reloadButton = document.getElementById('reloadP');
const clearButton = document.getElementById('clearL');
const soundChecker = document.getElementById('inlineCheckbox1');


// differents t-rex states
images = [
    "./docs/assets/images/player_frames_img/dino-run-0.png",
    "./docs/assets/images/player_frames_img/dino-run-1.png",
    "./docs/assets/images/player_frames_img/dino-lose.png",
    "./docs/assets/images/player_frames_img/dino-stationary.png",
]

// listeners
saveButton.onclick = () => {
    event.preventDefault();
    if(document.getElementById('validationDefault03').value.localeCompare("") != 0 
        && document.getElementById('validationDefault02').value.localeCompare("") != 0)
    {
        gameSpeed = document.getElementById('validationDefault01').value;
        period = document.getElementById('validationDefault03').value;
        weather = document.getElementById('validationDefault02').value;
        stopPeriodWatcher();
        startPeriodWatcherU();
        let toastLiveExample = document.getElementById('liveToast')
        toastLiveExample.classList.toggle('d-none');
        let toast = new bootstrap.Toast(toastLiveExample)
    
        toast.show();
    }else{
        let toastLiveExample = document.getElementById('liveToast1')
        toastLiveExample.classList.toggle('d-none');
        let toast = new bootstrap.Toast(toastLiveExample)
    
        toast.show();
    }

}
document.getElementById('cls1').onclick =()=>{
    document.getElementById('liveToast').classList.toggle('d-none');
}
document.getElementById('cls2').onclick =()=>{
    document.getElementById('liveToast1').classList.toggle('d-none');
}
document.getElementById('cls4').onclick =()=>{
    document.getElementById('liveToast3').classList.toggle('d-none');
}
document.getElementById('cls3').onclick =()=>{
    document.getElementById('liveToast2').classList.toggle('d-none');
}

reloadButton.onclick = () => {
    stopPeriodWatcher();
    startPeriodWatcher();
    let toastLiveExample = document.getElementById('liveToast3')
    toastLiveExample.classList.toggle('d-none');
    let toast = new bootstrap.Toast(toastLiveExample)

    toast.show();

}
clearButton.onclick = () => {
    clearParties();
    let toastLiveExample = document.getElementById('liveToast2')
    toastLiveExample.classList.toggle('d-none');
    let toast = new bootstrap.Toast(toastLiveExample)

    toast.show();

}

soundChecker.onchange = () => {
    if(soundChecker.checked){
        song.play();
    }
    else{
        song.pause();
    }
    console.log(soundChecker.checked)
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
startPeriodWatcher();
let listening = document.body.addEventListener("click", function () {
    song.play()
    delete listening;
})
