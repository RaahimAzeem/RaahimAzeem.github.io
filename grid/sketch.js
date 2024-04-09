// 2D Grid

// If you are hard-coding a level, I'd use something like this
// let grid = [[1,0,0,1],
//             [0,1,0,1],
//             [0,0,0,1],
//             [1,1,0,0],
//             [1,0,1,1],
//             [0,0,0,1],
//             [0,0,1,1],
//             [0,1,0,1]];

// If randomizing the grid, do this;
let grid;
let cellSize;
const GRID_SIZE = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);

  // This is dumb -- Should check if this is the right size
  cellSize = height/grid.length;
}

function draw() {
  background(220);
  displayGrid();
  // extraCode();
}

function keyPressed() {
  if (key === "r") {
    grid = generateRandomGrid(GRID_SIZE, GRID_SIZE);
  }
}

function generateRandomGrid(cols,rows) {
  let emptyArray = [];
  for (let y = 0; y < rows; y++) {
    emptyArray.push([]);
    for (let x = 0; x < cols; x++) {
      // Half the time be a 1, Other half be a 0
      if (random(100) < 50) {
        emptyArray[y].push(0);
      }
      else {
        emptyArray[y].push(1);
      }

    }

  }

  return emptyArray;
}

function displayGrid() {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === 1) {
        fill(0);
      }
      else {
        fill(255);
      }
      square(x*cellSize,y*cellSize,cellSize);
    }
  }
}

// function extraCode() {
//   for (let y = 0; y < grid.length; y++) {
//     for (let x = 0; x < grid[y].length; x++) {
//       if (mouseX > grid[x]  && mouseX < grid[x] + cellSize && mouseY > grid[y] && mouseY < grid[y] + cellSize) {
//         if (grid[y][x] === 1) {
//           fill("red");
//         }
//         else {
//           fill(0);
//         }
//         square(x*cellSize,y*cellSize,cellSize);
//       }
//     }
//   }
// }
