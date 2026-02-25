// Global game state — single source of truth

let PeriodWatch;
let cWidth;
let cHeight;
let canvas = null;
let ctx = null;
let myVar;
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
let isPaused = false;

let weather = 'rain,sun';
let period;

let initialSpawTimer = 180;
let spawnTimer = initialSpawTimer;

let lastTime = 0;
let gameClock = null;
