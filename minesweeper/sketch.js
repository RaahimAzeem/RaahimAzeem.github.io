// Grid-Based Game (Minesweeper) 
// Muhammad Raahim 
// April 29, 2024
//
// Extra for Experts:
// - Added a few HTML, CSS elements 
// - Added code to get user input, displaying messages to the user
// - Used Class
// - Used setTimeout function

// Declraing global variables
let grid, cols, rows;
let w = 40;

let totalMines;
let level;

let markerImage, mineImage;
let mineSound, nonMineSound, gameLostSound, gameWonSound;

// Preloading assets before page loads
function preload() {
  markerImage = loadImage("assets/Marker Flag.png");
  mineImage = loadImage("assets/Mine.png");
  mineSound = loadSound("assets/minesound.mp3");
  nonMineSound = loadSound("assets/nonminesound.mp3");
  gameLostSound = loadSound("assets/gamelostsound.mp3");
  gameWonSound = loadSound("assets/gamewonsound.mp3");
}

// Defining a class for each cell in the grid
class Cell {
  constructor(i, j, w) {
    // initializing cell properties
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighbourCount = 0;

    // Initializing state variables
    this.mine = false;
    this.revealed = false;
  }
  
  // Function to display the cell
  show() {
    // Cell Borders
    stroke(0);
    noFill();
    square(this.x, this.y, this.w);

    // If the cell is revealed
    if (this.revealed) {
      // If the cell contains a mine, then display the mine image in the cell
      if (this.mine) {
        image(mineImage,this.x,this.y,this.w,this.w);
      }

      // If doesn't contain mine, display blank cell
      else {
        fill(197);
        square(this.x, this.y, this.w);

        // Following code displays the number of mines in the neighbouring cells with different numbers and colours accordingly
        if (this.neighbourCount === 1) {
          textAlign(CENTER);
          textStyle(BOLD);
          textSize(w-15);
          fill("blue");
          text(this.neighbourCount, this.x + this.w / 2, this.y + this.w / 2 + 5);

        }
        if (this.neighbourCount === 2) {
          textAlign(CENTER);
          textStyle(BOLD);
          textSize(w-15);
          fill("green");
          text(this.neighbourCount, this.x + this.w / 2, this.y + this.w / 2 + 5);

        }
        if (this.neighbourCount === 3) {
          textAlign(CENTER);
          textStyle(BOLD);
          textSize(w-15);
          fill("red");
          text(this.neighbourCount, this.x + this.w / 2, this.y + this.w / 2 + 5);

        }
        if (this.neighbourCount === 4) {
          textAlign(CENTER);
          textStyle(BOLD);
          textSize(w-15);
          fill(0,0,153);
          text(this.neighbourCount, this.x + this.w / 2, this.y + this.w / 2 + 5);

        }
        if (this.neighbourCount === 5) {
          textAlign(CENTER);
          textStyle(BOLD);
          textSize(w-15);
          fill(102,0,0);
          text(this.neighbourCount, this.x + this.w / 2, this.y + this.w / 2 + 5);

        }
        if (this.neighbourCount === 6) {
          textAlign(CENTER);
          textStyle(BOLD);
          textSize(w-15);
          fill(0,255,255);
          text(this.neighbourCount, this.x + this.w / 2, this.y + this.w / 2 + 5);

        }
        
      }
    }

    // If the cell is marked by the user, then it will display the marker image
    else if (this.marker) {
      image(markerImage,this.x,this.y,this.w,this.w);
    }
  }
  // Method to check if a given point is within the cell
  cellContains(x, y) {
    return x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w;
  }

  // Function to reveal the cell
  reveal() {
    this.revealed = true;

    // If the cell has no neighbours, reveal all the adjacent cells
    if (this.neighbourCount === 0) {
      this.blankNeigboursFill();
    }
  }

  // Function to reveal all the adjacent cells
  blankNeigboursFill() {
    // Looping through the neighbours cells
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      for (let xOffset = -1; xOffset <= 1; xOffset++) {
        let y = this.i + yOffset;
        let x = this.j + xOffset;
        
        // Check if the adjacent cell is within the grid
        if (y > -1 && y < rows && x > -1 && x < cols) {
          let neighbour = grid[y][x];

          // If the adjacent cell is not a mine and not already revealed, reveal it
          if (!neighbour.mine && !neighbour.revealed) {
            neighbour.reveal();
          }
        }
      }
    }

  }

  // Method to count the number of mines only in the neighboring cells
  countMines() {
    // If the cell is a mine, set the neighbor count to -1 and return because it's not needed, only the neighbouring ones are needed
    if (this.mine) {
      this.neighbourCount = -1;
      return;
    }

    let total = 0;

    // Loop through all adjacent cells
    for (let yOffset = -1; yOffset <= 1; yOffset++) {
      for (let xOffset = -1; xOffset <= 1; xOffset++) {
        let y = this.i + yOffset;
        let x = this.j + xOffset;

        // Check if the adjacent cell is within the grid
        if (y > -1 && y < rows && x > -1 && x < cols) {
          let neighbour = grid[y][x];

          // If the adjacent cell is a mine, increment the total
          if (neighbour.mine) {
            total++;
          }
        }
      }
    }

    // Set the neighbor count to the total number of mines found
    this.neighbourCount = total;
  }

  // Function to place marker on the cell
  placeMarker() {
    this.marker = !this.marker;
  }

}

// Function to set up the game
function setup() {
  // Making the canvas the largest square that I can 
  if (windowWidth < windowHeight) {
    createCanvas(windowWidth - 200, windowWidth - 200);
  }
  else {
    createCanvas(windowHeight - 200, windowHeight - 200);
  }
  
  // Prompt the user to select the difficulty level
  level = window.prompt("Type in the type of difficulty to place number of mines accordingly: 1.Easy         2.Medium        3.Hard");

  // Set the total number of mines based on the selected difficulty
  if (level === "easy" || level === "Easy" || level === "1" || level === "1") {
    totalMines = 15;
  }
  else if (level === "medium" || level === "Medium" || level === "2" || level === "2") {
    totalMines = 25;
  }
  else if (level === "hard" || level === "Hard" || level === "3" || level === "3") {
    totalMines = 45;
  }
  

  // Calculate the number of columns and rows based on the canvas size and cell width. Generate the game grid as well
  cols = Math.floor(width / w);
  rows = Math.floor(height / w);
  grid = generateGrid(cols, rows);

  // Setting sound volumes accordingly
  nonMineSound.setVolume(0.5);
  gameLostSound.setVolume(0.5);
  gameWonSound.setVolume(0.5);

  // Initializing each cell in the grid
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid[y][x] = new Cell(y, x, w);
    }
  }

  // Placing mines randomly in the grid
  let options = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      options.push([i,j]);
    }
  }

  // Looping through the total number of mines to be placed
  for (let n = 0; n < totalMines; n++) {

    // Generate a random index within the range of available options
    let index = Math.floor(random(options.length));

    // Retrieve the choice at the randomly generated index
    let choice = options[index];  

    // Extract the row (y) and column (x) coordinates from the choice
    let y = choice[0];
    let x = choice[1];

    // Deletes the cell from the options to prevent a mine from appearing twice in the same cell
    options.splice(index,1);

    // Setting the cell as a mine
    grid[y][x].mine = true;

  }

  // Count the number of mines in the neighboring cells for each cell
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid[y][x].countMines();
    }
  }
}

function draw() {
  gameScreen();
}

// Function for when the user loses the game
function gameLost() {
  // Looping through each cell and revealing it
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid[y][x].revealed = true;
    }
  }
  
  // Playing sounds. The second sound is played after 2 seconds
  mineSound.play();
  setTimeout(gameLostSoundFunction,2000);

}

// Function for the sound when game is lost
function gameLostSoundFunction() {
  gameLostSound.play();
}

// Function to display the game lost message
function gameLostText() {
  window.confirm("YOU HAVE LOST THE GAME! To play again, reload this page.");
}

// Function to check if the game has been won
function gameWin() {
  // Looping through each cell
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let cell = grid[y][x];

      // Check if the cell is not revealed and is not a mine
      if (!cell.revealed && !cell.mine) {
        return false; // Game is not won yet
      }
    }
  }
  return true; // Now all non-mine cells are revealed, hence game is won
}

// Function for Mouse clicks
function mousePressed() {

  // If "m" key is being pressed, then loop through each cell
  if (keyIsPressed && key === "m") { 
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {

        // Based on the cell the user clicked, the marker will be placed on that specific cell
        if (grid[y][x].cellContains(mouseX, mouseY)) {
          grid[y][x].placeMarker(); 
        }
      }
    }
  } 

  // Otherwise, reveal the cell
  else {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        if (grid[y][x].cellContains(mouseX, mouseY)) {

          // If the user clicks on a mine, the game is lost and a message is displayed after 3.5 seconds. 
          if (grid[y][x].mine) {
            gameLost();
            setTimeout(gameLostText,2500);
          }

          // Otherwise, it will reveal the cell and play sounds accordingly
          else {
            grid[y][x].reveal();
            nonMineSound.play();

            // This will check if the user has won the game after revealing a non-mine cell. Then it will display the message after 0.5 seconds
            if (gameWin()) { 
              gameWonSound.play();
              setTimeout(gameWonText,500); 
            }
          }
        
        }
      }
    }
  }
}

// Function to display the game won message
function gameWonText() {
  window.confirm("YOU HAVE WON THE GAME! To play again, reload this page.");
}

// Function which is supposed to be in the draw loop
function gameScreen() {
  background(255);

  // Initially, displays the each cell in the grid
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      grid[y][x].show();
    }
  }
}

// Function to generate game grid with a specified number of rows and columns
function generateGrid(cols, rows) {

  // Create an array with the specified number of rows
  let emptyArray = new Array(rows);

  // Loop through each row in the array
  for (let i = 0; i < emptyArray.length; i++) {

    // Initialize each row as an array with the specified number of columns
    emptyArray[i] = new Array(cols);
  }

  return emptyArray;
}