let state = "game screen";
let grid, cellSize;
const GRID_SIZE = 20;

function preload() {

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  cellSize = height/grid.length;
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

function gameScreen() {
  displayGrid();
}

function generateEmptyGrid(cols, rows) {
  let gridArray = [];
  for (let y = 0; y < rows; y++) {
    gridArray.push([]);
    for (let x = 0; x < cols; x++) {
      // 10% chance to be a mine (0), otherwise empty (1)
      gridArray[y].push(random(100) < 10 ? 0 : 1);
    }
  }
  return gridArray;
}

function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 2) { // Revealed cell
        if (grid[y][x] === 0) { // Mine
          fill("black");
        } else { // Empty cell
          fill("grey");
        }
      } else {
        fill("white"); // Unrevealed cell
      }
      square(x * cellSize, y * cellSize, cellSize);
    }
  }
}

function toggleCell(x, y) {
  if (x < GRID_SIZE && y < GRID_SIZE && x >= 0 && y >= 0) {
    if (grid[y][x] === 1) { // Only reveal if the cell is empty
      grid[y][x] = 2; // Reveal the cell
    }
  }
}

function mousePressed() {
  let x = Math.floor(mouseX/cellSize);
  let y = Math.floor(mouseY/cellSize);

  toggleCell(x, y);
}
