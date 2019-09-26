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


//Other Functions

