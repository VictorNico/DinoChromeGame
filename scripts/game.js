
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
saveButton.onclick = (e) => {
    e.preventDefault();
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
}


titleButton.onclick = (e) => {
    e.preventDefault();
    if (document.getElementById('pseudo').value != "") {
        drawCanvas('canvasP', 'canvas');

        canvas = document.getElementById('canvas');
        ctx = canvas.getContext('2d');
        cWidth = canvas.width;
        cHeight = canvas.height;
        titleScreen.classList.toggle('d-none');
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

// ── Prehistoric title screen atmosphere ──
(function buildTitleDeco() {
    const screen = document.getElementById('title-screen');
    if (!screen) return;

    // Ember particles
    const positions = [8, 18, 30, 45, 58, 68, 80, 91];
    const durations = [4.2, 5.1, 3.6, 4.8, 3.2, 5.5, 4.0, 3.8];
    const delays    = [0, 1.2, 0.5, 2.1, 1.6, 0.9, 3.0, 1.4];
    positions.forEach((left, i) => {
        const e = document.createElement('div');
        e.className = 'ember-particle';
        e.style.cssText = `left:${left}%;bottom:${5 + (i % 3) * 6}%;` +
            `animation-duration:${durations[i]}s;animation-delay:${delays[i]}s;` +
            `width:${3 + (i % 3)}px;height:${5 + (i % 3)}px;`;
        screen.appendChild(e);
    });

    // Volcano SVG decoration (bottom-right corner)
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 200 180');
    svg.style.cssText = 'position:absolute;bottom:0;right:3%;width:min(26vw,240px);opacity:0.28;pointer-events:none;z-index:0;';
    svg.innerHTML = `
        <polygon points="0,180 80,40 88,34 112,34 120,40 200,180" fill="#5A1800"/>
        <polygon points="88,34 100,14 112,34" fill="#CC3300" opacity="0.85"/>
        <ellipse cx="100" cy="32" rx="22" ry="10" fill="#FF5500" opacity="0.6"/>
        <ellipse cx="100" cy="20" rx="14" ry="8"  fill="#FF8800" opacity="0.45"/>
        <ellipse cx="100" cy="10" rx="9"  rx="6"  fill="#FFCC00" opacity="0.3"/>
    `;
    screen.appendChild(svg);

    // Fern silhouette (bottom-left)
    const fern = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    fern.setAttribute('viewBox', '0 0 120 160');
    fern.style.cssText = 'position:absolute;bottom:0;left:2%;width:min(16vw,140px);opacity:0.22;pointer-events:none;z-index:0;';
    fern.innerHTML = `
        <path d="M60,160 Q60,80 60,0 Q40,30 20,20 Q50,50 60,60 Q30,50 5,55 Q40,70 60,80 Q25,75 10,90 Q45,90 60,100 Q35,100 20,120 Q50,115 60,130 Q45,130 35,150 Q55,142 60,160Z" fill="#1A3A08"/>
    `;
    screen.appendChild(fern);
})();
