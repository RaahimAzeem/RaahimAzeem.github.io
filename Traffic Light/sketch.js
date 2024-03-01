// Traffic Light Starter Code
// Your Name Here
// The Date Here

let state = "red";
let lastTimeSwap = 0;
let redDuration = 2000;
let yellowDuration = 1500;
let greenDuration = 3500;

function setup() {
  createCanvas(100, 300);
  let greenTime = 2000;
}

function draw() {
  background(255);
  drawOutlineOfLights();
  determineState();
  drawCorrectLight();
}

function drawCorrectLight() {
  if (state === "green") {
    drawGreenLight();
  } else if (state === "yellow") {
    drawYellowLight();
  } else if (state === "red") {
    drawRedLight();
  }
}

function determineState() {
  if (state === "red" && millis() > lastTimeSwap + redDuration) {
    lastTimeSwap = millis();
    state = "green";
  }
  else if (state === "green" && millis() > lastTimeSwap + greenDuration) {
    lastTimeSwap = millis();
    state = "yellow";
  }
  else if (state === "yellow" && millis() > lastTimeSwap + yellowDuration) {
    lastTimeSwap = millis();
    state = "red";
  }
}

function drawRedLight() {
  //lights
  fill(255, 0, 0);
  ellipse(width / 2, height / 2 - 65, 50, 50); //top
}
function drawYellowLight() {
  fill(255, 255, 0);
  ellipse(width / 2, height / 2, 50, 50); //middle
}
function drawGreenLight() {
  fill(0, 255, 0);
  ellipse(width / 2, height / 2 + 65, 50, 50); //bottom
}

function drawOutlineOfLights() {
  //box
  rectMode(CENTER);
  fill(0);
  rect(width / 2, height / 2, 75, 200, 10);
}
