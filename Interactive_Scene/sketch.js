// Interactive Scene 
// Muhammad Raahim 
// March 1, 2024
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state = "start screen";


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  
}

function draw() {
  background(0);
  stroke("green"); 
  noFill();
  strokeWeight(3);
  rect(width/2,height/2,width/2,height/2);
  
}
