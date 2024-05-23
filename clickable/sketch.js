// P5 Clickable Demo

let startButton;
let state = "start";

function setup() {
  createCanvas(windowWidth, windowHeight);
  startButton = new Clickable();
  startButton.locate(width/2,height/2);
  startButton.resize(400,200);
  startButton.onPress = startPressed;
  startButton.text = "Start Game";
}

function draw() {
  if (state === "start") {
    background(220);
  }
  else {
    background(0);
  }
  startButton.draw();
}

function startPressed() {
  state = "gameplay";
}