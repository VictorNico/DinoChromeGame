
// methods
function drawCanvas(parent, id) {
    let canvas = document.createElement('canvas');
    div = document.getElementById(parent);
    canvas.id = id;
    if(window.mobileCheck() == true){
        canvas.width = window.screen.width;
        canvas.height = window.screen.height;
    }else{
        canvas.width = window.screen.width;
        canvas.height = window.screen.height - 8*window.screen.height/100;
    }
    
    div.appendChild(canvas)
}

window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};


// function to draw the scene
function start() {

    // define the default game parameters
    gameSpeed = 5;
    gravity = 0.9;
    // add interval listening
    interval = setInterval(update, 1000 / 60);
    // add interval speed update
    myVar = setInterval(function(){
        // update game 
        gameSpeed += 0.1;
    }, 15000);
    isRunning = true;
    // instanciate the t-rex player
    if(window.mobileCheck() == true){
        player = new Player(0, 0, 50, 100);
    }else{
        player = new Player(125, 0, 50, 100);
    }
    player.playerDraw(frames);
};


// function to update the t-rex and the pterodactyles, cactus obstacles
function update() {
    // scoring
    players[players.length - 1].end = new Date();
    players[players.length - 1].score = end(players[players.length - 1].start, players[players.length - 1].end);
    /* if (keys["Space"]) { */
    frames++;
    //console.log(frames);
    ctx.clearRect(0, 0, cWidth, cHeight);
    // add the pseudo name
    ctx.fillStyle = "white";
//     var background = new Image();
// background.src = "../docs/assets/images/ground.png";

// // Make sure the image is loaded first otherwise nothing will draw.
// background.onload = function(){
//     ctx.drawImage(background,0,0);   
// }
    if(window.mobileCheck() == true){
        ctx.font = "4vh Arial";
    }else{
        ctx.font = "4vh Arial";
    }
    ctx.font = "2vh Arial";
    ctx.fillText("" + window.atob(localStorage.getItem("lastname")), 0, 50);
    let best = Object.keys(bestP).length !== 0 ? bestP.score : players[players.length - 1].score;
    let current = players[players.length - 1];
    ctx.fillText("best score : " + best, cWidth - 10*cWidth/100, 50);
    ctx.fillText("your score : " + players[players.length - 1].score, cWidth - 10*cWidth/100, 80);

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


            // compute top 10 list
            let liste = "";
            let taille = players.length > 9 ? 10 : players.length;
            for (let i = 0;  i < taille; i++) {
                let template = `
                    <tr>
                        <th scope="row">${i+1}</th>
                        <td>${players[i].name}</td>
                        <td>${players[i].score}</td>
                        <td>${format(players[i].end)}</td>
                    </tr>
                 `
                liste += template;
            }
            // set the top 10 list
            document.getElementById('top10').innerHTML = liste;

            //compute score list
            liste = "";
            taille = players.length;
            for (let i = 0;  i < taille; i++) {
                let template = `
                    <tr>
                        <th scope="row">${i+1}</th>
                        <td>${players[i].name}</td>
                        <td>${players[i].score}</td>
                        <td>${format(players[i].end)}</td>
                    </tr>
                 `
                liste += template;
            }
            document.getElementById('scoreL').innerHTML = liste;
            document.getElementById('score').innerHTML = current.score;
            document.getElementById('score1').innerHTML = current.score;
            document.getElementById('scoreb').innerHTML = players[0].score;
            document.getElementById('currentDate').innerHTML = format(current.end);
            // completelist.innerHTML = liste;
            localStorage.setItem("listP", window.btoa(JSON.stringify(Object.assign({}, players))));

            obstacles = [];
            clearInterval(interval);
            clearInterval(myVar);
            isRunning = false;
            spawnTimer;
            gameSpeed = 5;
            canvas.classList.toggle('d-none')
            canvas1.classList.toggle('d-none');
            document.getElementById('canvasP').innerHTML = "";
            // canvas.classList.remove('first-background')
            // canvas.classList.remove('second-background')
            gameOverScreen.classList.toggle('d-none')
            // bgTVScreen.classList.toggle('d-none')
        };
        // update obstacle
        demon.update();
    };

    player.animate();
    player.playerDraw(frames);
};
// compute score
function end(startTime, endTime) {
    let timeDiff = endTime - startTime; //in ms
    // strip the ms
    timeDiff /= 1000;

    // get seconds 
    let seconds = Math.round(timeDiff);
    /* console.log(seconds + " seconds"); */
    return seconds;
}

function format(d){
    let date = new Date(d);
    return date.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            minutes: "2-digit",
            hour: "2-digit",
            hour12: true,
        });
}



// variables 


let cWidth;
let cHeight;
let canvas = null;
let canvas1 = null;
let ctx = null;
let myvar;
let images;

let players = [];
let bestP = {};

let frames = 0;
let player;
let gravity;
let obstacles = [];
let gameSpeed;
let keys = {};
let interval = null;
let isRunning = false;

let weather;
let period;

let initialSpawTimer = 180;
let spawnTimer = initialSpawTimer;

// let MyWeather = new Weather()


let song = new Audio('./docs/assets/sounds/som_1.mp3');
song.loop = true;


