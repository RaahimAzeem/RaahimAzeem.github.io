// Interactive Scene
// Muhammad Raahim 
// 11th March, 2024
// Extra for Experts: Used Arrays and class

// Game setup variables
let apple;
let L = 30;
let snake = [];
let n = 3;
let pause = true;
let t = 0;
let dir;
let gameover = false;
let ate = false;
let gameState = "start"; // Game state: 'start', 'playing', or 'gameover'

// Initialize the game
function setup() {
  createCanvas(600, 600); // Create a canvas for the game
  background("cyan"); // Set the background color
  for (let i = 0; i < n; i++) { // Initialize the snake
    snake.push(new Segment(i, 300 - L * i, 300));
    snake[i].show();
  }
  dir = createVector(1, 0); // Set initial direction
  apple = new Fruit(); // Create the apple
  apple.show(); // Show the apple
}

// Main game loop
function draw() {
  if (gameState === "start") { // Display start screen
    background(0); // Black background
    textSize(32);
    fill(255);
    text("Press SPACE to start", width / 2, height / 2);
  }
  else if (gameState === "playing") { // Game logic
    if (!pause) {
      if (gameover) { // Game over screen
        textSize(30);
        text("GAME OVER", width / 2, 0.1 * height);
      }
      else { // Gameplay
        background("cyan"); // Cyan background for gameplay
        if (ate) { // If the snake ate the apple
          apple = new Fruit(); // Create a new apple
          ate = false;
        }
        apple.show(); // Show the apple
        checkkey(); // Check for key presses
        t = t + 1; // Increment time
        if (t % 10 === 0) { // Move the snake every 10 frames
          for (let i = n - 1; i > 0; i--) { // Move each segment to the previous one's position
            snake[i].update(snake[i - 1].x, snake[i - 1].y);
          }
          snake[0].move(L * dir.x, L * dir.y); // Move the head in the current direction
        }
        for (let i = 0; i < n; i++) { // Show the snake
          snake[i].show();
        }
        checkSeg(); // Check for collision with self
        checkAte(); // Check if the snake ate the apple
      }
    }
  }
}

// Check for key presses to change direction
function checkkey() {
  if (keyIsDown(DOWN_ARROW)) {
    dir = createVector(0, 1);
  }
  if (keyIsDown(UP_ARROW)) {
    dir = createVector(0, -1);
  }
  if (keyIsDown(LEFT_ARROW)) {
    dir = createVector(-1, 0);
  }
  if (keyIsDown(RIGHT_ARROW)) {
    dir = createVector(1, 0);
  }
}

// Check for collision with self
function checkSeg() {
  for (let i = 1; i < n; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      gameover = true; // End the game if collision detected
    }
  }
}

// Check if the snake ate the apple
function checkAte() {
  if (!ate && snake[0].x === apple.x && snake[0].y === apple.y) {
    snake.push(new Segment(n, snake[n - 1].x, snake[n - 1].y)); // Add a new segment to the snake
    n += 1; // Increase the snake's length
    ate = true; // Mark that the snake has eaten the apple
  }
}

// Segment class for the snake
class Segment {
  constructor(i, x, y) {
    this.i = i;
    this.x = x;
    this.y = y;
  }
  update(x, y) { // Update the segment's position
    this.x = x;
    this.y = y;
  }
  move(dx, dy) { // Move the segment
    this.x += dx;
    this.y += dy;
  }
  show() { // Draw the segment
    stroke("black");
    strokeWeight(2);
    if (this.i === 0) {
      fill("black");
    }
    else {
      fill("blue");
    }
    square(this.x, this.y, L);
  }
}

// Fruit class for the apple
class Fruit {
  constructor() {
    this.x = round(random(0, (width - L) / L)) * L; // Random position for the apple
    this.y = round(random(0, (height - L) / L)) * L;
  }
  show() { // Draw the apple
    strokeWeight(2);
    stroke(100, 0, 0);
    fill("red");
    circle(this.x + L / 2, this.y + L / 2, L * 0.7);
  }
}

// Toggle game state or pause on mouse click
function mousePressed() {
  if (gameState === "start") {
    gameState = "playing"; // Start the game
  }
  else if (gameState === "playing") {
    pause = !pause; // Toggle pause
  }
}
