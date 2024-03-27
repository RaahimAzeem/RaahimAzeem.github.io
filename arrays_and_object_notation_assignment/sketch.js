// Arrays and Object Notation 
// Muhammad Raahim 
// April 8, 2024
//
// Extra for Experts:
// - 

let state = "Start Screen";
let aliens = []; 

function setup() {
  createCanvas(windowWidth, windowHeight);
  
}

function draw() {
  background(0);
}

function determineState() {
  if (state === "Start Screen") {
    background(0);
    displayTextOnStartup();
  }
  else if (state === "Game Screen") {
    background(255);
  }
}

function displayTextOnStartup() {
  // Displaying text in white color which instructs how to start the game
  fill(255);
  textSize(30);
  text("Press spacebar to start the game",width/2,height/2);
  text("The Alien Invasion Game", width/2, 50);

  // Displaying my name 
  fill(255);
  textSize(20);
  text("Made by Muhammad Raahim",width-300,height-50);
}

function spawnAliens() {
  let someAlien = {
    x: random(width),
    y: 0, 
    
  };
}


