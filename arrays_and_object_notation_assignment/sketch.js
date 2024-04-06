// Arrays and Object Notation 
// Muhammad Raahim 
// April 8, 2024
//
// Extra for Experts:
// - 

let state = "start screen";
let aliens = [];  
let spaceship;
let asteroid;
let sizeW = 75; 
let sizeH = 75;
let shipX;
let shipY;
let dx = 10;
let dy = 10;


function preload() {
  spaceship = loadImage("spaceship.png");
  asteroid = loadImage("asteroid.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shipX = width / 2;
  shipY = height - 100;
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

    // Spawning asteroids in the background to make it feel like space
    image(asteroid,random(width),random(height),20,20);

    // Spaceship which will shoot down the aliens
    image(spaceship,shipX,shipY,sizeW,sizeH);
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
