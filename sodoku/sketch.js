// Sodoku (Grid-Based Game)  
// Muhammad Raahim
// April 25, 2024
//
// Extra for Experts:
// - 

let state = "start screen";


function preload() {

}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  determineState();
}

function determineState() {
  // Changing the state accordingly
  if (state === "start screen") {
    startScreen();
  }
  else if (state === "game screen") {
    gameScreen();
  }
}

function startScreen() {

}

function gameScreen() {

}