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
var resetButton = document.getElementById('button');

//Event Handlers
wireBox.addEventListener('click', function(e) {
    var color = e.target.alt;
    if (!wireState[color] && !gameOver) {//if these things then...
        e.target.src = `img/cut-${color}-wire.png`;
        //TODO: play cut audio
        wireState[color] = true;
        //check for correctness
        var wireIndex = wiresToCut.indexOf(color);
        if (wireIndex > -1) {
            wiresToCut.splice(wireIndex, 1);
        } else {
            setTimeout
        }
        // TODO: checkForWin();
    }
})

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
    //TODO: siren, and start countdown
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
    //TODO: stop song 
    init();
}