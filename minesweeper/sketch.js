
let state = "game screen";
let grid, cols, rows;
let w = 20;

let totalMines = 100;


class Cell {
  constructor(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighbourCount = 0;

    this.mine = false;
    this.revealed = false;
  }
  show() {
    stroke(0);
    noFill();
    square(this.x, this.y, this.w);

    if (this.revealed) {

      if (this.mine) {
        fill(0);
        circle(this.x + this.w / 2, this.y + this.w / 2, this.w / 2);
      }

      else {
        fill(137);
        square(this.x, this.y, this.w);

        if (this.neighbourCount > 0) {
          textAlign(CENTER);
          fill(0);
          text(this.neighbourCount, this.x + this.w / 2, this.y + this.w / 2 + 4);

        }
      }
    }
  }
  cellContains(x, y) {
    return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w;
  }
  reveal() {
    this.revealed = true;
    if (this.neighbourCount === 0) {
      // flood fill
      this.floodFill();
    }
  }
  floodFill() {
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      for (let xOffset = -1; xOffset <= 1; xOffset++) {
        let y = this.i + yOffset;
        let x = this.j + xOffset;
        if (y > -1 && y < rows && x > -1 && x < cols) {
          let neighbour = grid[y][x];
          if (!neighbour.mine && !neighbour.revealed) {
            neighbour.reveal();
          }
        }
      }
    }

  }
  countMines() {
    if (this.mine) {
      // Irrelevant 
      this.neighbourCount = -1;
      return;
    }

    let total = 0;
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      for (let xOffset = -1; xOffset <= 1; xOffset++) {
        let y = this.i + yOffset;
        let x = this.j + xOffset;
        if (y > -1 && y < rows && x > -1 && x < cols) {
          let neighbour = grid[y][x];
          if (neighbour.mine) {
            total++;
          }
        }
      }
    }
    this.neighbourCount = total;
  }
}

function preload() {}

function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth, windowWidth);
  }
  else {
    createCanvas(windowHeight, windowHeight);
  }
  
  cols = Math.floor(width / w);
  rows = Math.floor(height / w);
  grid = generateGrid(cols, rows);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid[y][x] = new Cell(y, x, w);
    }
  }

  // Pick totalMines Spot
  let options = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      options.push([i,j]);
    }
  }


  for (let n = 0; n < totalMines; n++) {
    let index = Math.floor(random(options.length));
    let choice = options[index];  
    let i = choice[0];
    let j = choice[1];
    // Deletes the cell to prevent a mine from appearing twice in the same cell
    options.splice(index,1);

    grid[i][j].mine = true;

  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid[y][x].countMines();
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

function gameLost() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid[y][x].revealed = true;
    }
  }
  gameLostText();
}

function gameLostText() {
  
}

function mousePressed() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      if (grid[y][x].cellContains(mouseX,mouseY)) {
        grid[y][x].reveal();

        if (grid[y][x].mine) {
          gameLost();
        }
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