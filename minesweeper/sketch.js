// Grid-Based Game (Minesweeper) 
// Muhammad Raahim 
// April 30, 2024
//
// Extra for Experts:
// - Added a few HTML, CSS elements 
// - Added code to get user input 
// - Used Classes

// Have to add COMMENTS, CSS ATTRIBUTES


// let state = "game screen";
let grid, cols, rows;
let w = 30;

let totalMines;

let markerImage;
let mineImage;


function preload() {
  markerImage = loadImage("assets/Marker Flag.png");
  mineImage = loadImage("assets/Mine.png");
}



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
        image(mineImage,this.x,this.y,this.w,this.w);
      }

      else {
        fill(197);
        square(this.x, this.y, this.w);

        if (this.neighbourCount === 1) {
          textAlign(CENTER);
          textStyle(BOLD);
          textSize(20);
          fill("blue");
          text(this.neighbourCount, this.x + this.w / 2, this.y + this.w / 2 + 5);

        }
        if (this.neighbourCount === 2) {
          textAlign(CENTER);
          textStyle(BOLD);
          textSize(20);
          fill("green");
          text(this.neighbourCount, this.x + this.w / 2, this.y + this.w / 2 + 5);

        }
        if (this.neighbourCount === 3) {
          textAlign(CENTER);
          textStyle(BOLD);
          textSize(20);
          fill("red");
          text(this.neighbourCount, this.x + this.w / 2, this.y + this.w / 2 + 5);

        }
        if (this.neighbourCount === 4) {
          textAlign(CENTER);
          textStyle(BOLD);
          textSize(20);
          fill(0,0,153);
          text(this.neighbourCount, this.x + this.w / 2, this.y + this.w / 2 + 5);

        }
        if (this.neighbourCount === 5) {
          textAlign(CENTER);
          textStyle(BOLD);
          textSize(20);
          fill(102,0,0);
          text(this.neighbourCount, this.x + this.w / 2, this.y + this.w / 2 + 5);

        }
        if (this.neighbourCount === 6) {
          textAlign(CENTER);
          textStyle(BOLD);
          textSize(20);
          fill(0,255,255);
          text(this.neighbourCount, this.x + this.w / 2, this.y + this.w / 2 + 5);

        }
        
      }
    }

    else if (this.marker) {
      image(markerImage,this.x,this.y,this.w,this.w);
    }
  }

  cellContains(x, y) {
    return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w;
  }

  reveal() {
    this.revealed = true;
    if (this.neighbourCount === 0) {
      // Blank Neighbours fill
      this.blankNeigboursFill();
    }
  }

  blankNeigboursFill() {
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

  placeMarker() {
    this.marker = !this.marker;
  }

}


function setup() {
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth - 200, windowWidth - 200);
  }
  else {
    createCanvas(windowHeight - 200, windowHeight - 200);
  }
  
  totalMines = window.prompt("Type in the number of Mines.");
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
    let y = choice[0];
    let x = choice[1];

    // Deletes the cell to prevent a mine from appearing twice in the same cell
    options.splice(index,1);

    grid[y][x].mine = true;

  }

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid[y][x].countMines();
    }
  }

  
}
function windowResized() {
  //make the canvas the largest square that you can...
  if (windowWidth < windowHeight) {
    resizeCanvas(windowWidth, windowWidth);
  }
  else {
    resizeCanvas(windowHeight, windowHeight);
  }
}

function draw() {
  gameScreen();
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
  fill(0,0,155);
  square(400,400,w*2);
}

function mousePressed() {
  if (keyIsPressed && key === "m") { // Check if 'm' key is pressed
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (grid[y][x].cellContains(mouseX, mouseY)) {
          grid[y][x].placeMarker(); // Toggle the marker instead of revealing
          return; // Exit the function after marking to prevent revealing
        }
      }
    }
  } 
  else {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (grid[y][x].cellContains(mouseX, mouseY)) {
          grid[y][x].reveal();

          if (grid[y][x].mine) {
            gameLost();
          }
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