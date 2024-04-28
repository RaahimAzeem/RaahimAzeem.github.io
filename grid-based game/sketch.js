// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let state = "game screen";
let grid;
let cols; 
let rows;
let w = 20;

class Cell {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;

    if (random(100) < 50) {
      this.mine = true;
    }
    else {
      this.mine = false;
    }
    this.revealed = false;
  }
  show() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);

    if (this.revealed) {
      if (this.mine) {
        fill(0);
        circle(this.x + this.w / 2, this.y + this.w / 2, this.w / 2);
      }
      else {
        fill(127);
        rect(this.x, this.y, this.w, this.w);
      }
    }
  }

  contains(x, y) {
    return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w;
  }

  reveal() {
    this.revealed = true;
  }

  countNeighbours() {
    if (this.mine) {
      return -1;
    }
    let total = 0;

  }
}




function setup() {
  createCanvas(200, 200);
  
  cols = floor(width / w);
  rows = floor(height / w);
  grid = generateGrid(cols, rows);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid[y][x] = new Cell(y * w, x * w, w);
    }
  }
  
}

function draw() {
  determineState();
}

function determineState() {
  if (state === "start screen") {
    startScreen();
  }
  else if (state === "game screen") {
    gameScreen();
  }
}

function startScreen() {

}

function mousePressed() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x].contains(mouseX,mouseY)) {
        grid[y][x].reveal();
      }
    }
  }
}

function gameScreen() {
  background(255);
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid[y][x].show();
    }
  }
}

function generateGrid(cols, rows) {
  let emptyArray = new Array(rows);
  for (let i = 0; i < emptyArray.length; i++) {
    emptyArray[i] = new Array(cols);
  }
  return emptyArray;
}