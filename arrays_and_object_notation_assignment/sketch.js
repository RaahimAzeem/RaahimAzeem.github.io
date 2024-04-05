// Arrays and Object Notation 
// Muhammad Raahim 
// April 8, 2024
//
// Extra for Experts:
// - 

let state = "start screen";
let aliens = [];  
let spaceship;
let sizeW = 55; 
let sizeH = 55;
let shipX;
let shipY;
let dx = 10;
let dy = 10;


function preload() {
  spaceship = loadImage("spaceship.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shipX = width / 2;
  shipY = height - 80;
}

function draw() {
  determineState();
}

function determineState() {
  if (state === "start screen") {
    background(0);
    displayTextOnStartup();
  }
  else if (state === "game screen") {
    background(55);

    // Spawning circle shaped asteroids in the background to make it feel like space
    fill(255);
    noStroke();
    circle(random(width),random(height),10);

    // Spaceship which will shoot down the aliens
    image(spaceship,shipX,shipY,sizeW,sizeH);

    moveShip();

  }
}
function moveShip() {
  if (keyIsDown(39)) {// Right Arrow Key
    shipX +=  dx;
  }
  if (keyIsDown(37)) {// Left Arrow key
    shipX -=   dx;
  }
}

function spawnAliens() {
  let someAlien = {
    x: random(width),
    y: 0, 
    
  };
}

function mousePressed() {
  if (state === "start screen") {
    state = "game screen";
  }
}

function displayTextOnStartup() {
  // Displaying text in white color which instructs how to start the game
  fill(255);
  textSize(42);
  textAlign(CENTER, CENTER);
  text("Click the mouse to start the game",width / 2,height / 2);
  

  // Displaying my name 
  fill(255);
  textSize(20);
  text("Made by Muhammad Raahim",width-300,height-50);
}
