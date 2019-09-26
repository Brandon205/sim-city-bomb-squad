//Global Variables 
const STARTING_TIME = 30;
var remainingTime = 0;
var gameOver = false;
var countdown = null;
var delay = null;
var wireState = {
    blue: false,
    green: false, 
    red: false,
    white: false,
    yellow: false
}

var wiresToCut = [];

//DOM References TO-DO: audio 
var timer = document.getElementById('timer');
var wireBox = document.getElementById('wirebox');
var resetButton = document.querySelector('button');
var explode = document.getElementById('explode');
var yay = document.getElementById('yay');
var buzz = document.getElementById('buzz');
var siren = document.getElementById('siren');
var success = document.getElementById('success');

//Event Handlers
wireBox.addEventListener('click', function(e) {
    var color = e.target.alt;
    if (!wireState[color] && !gameOver && color) {//if these things then...
        e.target.src = `img/cut-${color}-wire.png`;
        buzz.play();
        wireState[color] = true;
        //check for correctness
        var wireIndex = wiresToCut.indexOf(color);
        if (wireIndex > -1) {
            wiresToCut.splice(wireIndex, 1);
            if (checkForWin()) {
                endGame(true);
            }
        } else {
            delay = setTimeout(endGame, 750, false);
        }
    }
})

resetButton.addEventListener('click', reset);

//Other Functions
function init() {
    wiresToCut.length = 0; //Quick way to empty an array
    remainingTime = STARTING_TIME;
    for (let wire in wireState) {
        var rand = Math.random();
        if (rand > 0.5) {
            wiresToCut.push(wire);
        }
    }
    console.log(wiresToCut);
    resetButton.disable = true;
    siren.play();
    countdown = setInterval(updateClock, 1000);
}

function reset() {
    for (let wire in wireState) {
        wireState[wire] = false;
    }

    for (let i = 0; i < wireBox.children.length; i++) {
        wireBox.children[i].src = `img/uncut-${wireBox.children[i].alt}-wire.png`
    }
    gameOver = false;
    document.body.classList.remove('exploded');
    timer.classList.remove('green');
    clearTimeout(delay);
    clearInterval(countdown);
    success.pause();
    success.currentTime = 0;
    init();
}

function checkForWin() {
    return wiresToCut.length ? false : true;
}

function endGame(win) {
    clearTimeout(delay);
    clearInterval(countdown);
    gameOver = true;
    resetButton.disabled = false;
    if (win) {
        timer.classList.add('green');
        yay.addEventListener('ended', function() {
            success.play();
        })
        yay.play();
    } else {
        document.body.classList.add('exploded');
        explode.play();
    }
}

function updateClock() {
    remainingTime--;
    if (remainingTime <= 0) {
        endGame(false);
    }
    timer.textContent = `0:00:${remainingTime}`;
}
init();