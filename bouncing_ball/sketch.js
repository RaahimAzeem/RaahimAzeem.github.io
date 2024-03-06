let x;
let y;
let dx;
let dy;
let radius = 30;
let r = 0;
let g = 255;
let b = 0;
let state = "start screen";

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height / 2;
  dx = random(-5, 5);
  dy = random(-5, 5);
  changeCircleColour();
  noStroke();
}

function draw() {

  if (state === "start screen") {
    background("black");
    showInstructions();
  }
  else if (state === "bouncing ball") {
    background(220);
    drawCircle();
    moveCircle();
    bounceOffWall();
  }
}

function showInstructions() {
  fill("white");
  textSize(42);
  textAlign(CENTER, CENTER);
  text("Click the mouse to start!", width / 2, height / 2)
}

function mousePressed() {
  if (state === "start screen") {
    state = "bouncing ball";
  }
}

function keyTyped() {
  if (key === " ") {
    dx = random(-5, 5);
    dy = random(-5, 5);
  }
  if (key === "c") {
    changeCircleColour();
  }
}

function drawCircle() {
  //display circle
  fill(r, g, b);
  circle(x, y, radius * 2);
}

function moveCircle() {
  //move circle
  x += dx;
  y += dy;
}

function bounceOffWall() {
  //bounce if needed
  if (x >= width - radius || x <= 0 + radius) {
    dx = -1 * dx;
    changeCircleColour();
    console.log("Bounced");
  }
  if (y >= height - radius || y <= 0 + radius) {
    dy = -1 * dy;
    changeCircleColour();
    console.log("Bounced");

  }
}
function changeCircleColour() {
  r = random(255);
  g = random(255);
  b = random(255);
}

