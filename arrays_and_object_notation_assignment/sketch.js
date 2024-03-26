// Arrays and Object Notation 
// Muhammad Raahim 
// April 8, 2024
//
// Extra for Experts:
// - 

let state = "startScreen";

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  
  if (state === "startScreen") {
    displayTextOnStartup();
  }
  else if (state === "game") {
    
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

