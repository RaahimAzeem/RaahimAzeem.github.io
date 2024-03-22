// Translate and Rotation

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
}

function draw() {
  background(220);

  // Moves the origin
  translate(300,300);

  rotate(mouseX);
  square(0,0,200);
}
