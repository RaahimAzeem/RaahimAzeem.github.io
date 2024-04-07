// Arrays and Object Notation 
// Muhammad Raahim 
// April 8, 2024
//
// Extra for Experts:
// - 

let state = "start screen";
let alienArray = [];  
let bulletArray = [];
let alienToRemove;
let bulletToRemove;
let spaceship;
let asteroid;
let aliens;
let shipX;
let shipY;
let shipDX = 10;
let shipDY = 10;
let sizeW = 75; 
let sizeH = 75;
let alienSpawnIntervalSet = false;
let hit = false;
let score = 0;


function preload() {
  spaceship = loadImage("spaceship.png");
  asteroid = loadImage("asteroid.png");
  aliens = loadImage("alien.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shipX = width / 2;
  shipY = height - 100;
  noStroke();
}

function draw() {
  if (state === "start screen") {
    startScreen();
  }
  else if (state === "game screen") {
    gameScreen();
  }
}

function gameScreen() {
  background(55);
  
  textSize(35);
  text("Score: " + score, width-100, 40);

  // Spawning asteroids in the background to make it feel like space
  image(asteroid,random(width),random(height),20,20);

  // Spaceship which will shoot down the aliens
  image(spaceship,shipX,shipY,sizeW,sizeH);

  moveShip();

  if (shipX !== width/2 && !alienSpawnIntervalSet) {
    window.setInterval(spawnAliens, 2500);
    alienSpawnIntervalSet = true;

  }
  displayAliens();
  moveAliens();
  displayBullets();
  moveBullets();
  hitAlien();
  
}

function hitAlien() {
  for (let theBullet of bulletArray) {
    
    for (let theAlien of alienArray) {
      hit = collideRectRect(theBullet.bX,theBullet.bY,theBullet.bWidth,theBullet.bHeight,theAlien.alienX,theAlien.alienY,theAlien.alienW,theAlien.alienH);
      
      if (hit) {
        theAlien = alienToRemove;
        bulletArray.splice(bulletArray.indexOf(theBullet),1);
        alienArray.splice(alienArray.indexOf(theAlien),1);
        score += 100;
      }

    }

  }

}
// for (let i = bulletArray.length-1; i >= 0; i--) {
//   if (hit) {
//     bulletArray.splice(i,1);
//     score += 100;
//   }
// }

// for (let i = alienArray.length-1; i >= 0; i--) {
//   if (hit) {
//     alienArray.splice(i,1);
//   }
// }

function keyPressed() {
  if (key === " ") {
    spawnBullets(shipX);
  }
}

function startScreen() {
  background(0);
  displayTextOnStartup();
} 

function moveShip() {
  if (keyIsDown(39) || keyIsDown(68)) {// Right Arrow Key or "d" Arrow Key to move right
    shipX += shipDX;
  }
  if (keyIsDown(37) || keyIsDown(65)) {// Left Arrow key or "a" Arrow Key to move left 
    shipX -= shipDX;
  }
  
  // As soon as the ship moves towards the edges, it will teleport to the opposite edge accordingly
  if (shipX + 30 < 0) {
    shipX = width;
  }
  else if (shipX  > width) {
    shipX = 0;
  }
}


function spawnBullets(bulletX) {
  let bullet = {
    bX: bulletX + 33,
    bY: height - 100, 
    bDY: 10,
    bWidth: 10,
    bHeight: 25,
  };
  bulletArray.push(bullet);
}

function displayBullets() {
  // Looping through the bulletArray
  for (let theBullet of bulletArray) { 
    rect(theBullet.bX, theBullet.bY, theBullet.bWidth,theBullet.bHeight);
  }
}

function moveBullets() {
  for (let theBullet of bulletArray) {
    theBullet.bY -= theBullet.bDY;
  }
}

function spawnAliens() {
  let alien = {
    alienX: random(width-100),
    alienY: 0, 
    alienDY: 2,
    alienW: 60,
    alienH: 60,
  };
  alienArray.push(alien);
}

function displayAliens() {
  // Looping through the alienArray
  for (let theAlien of alienArray) { 
    image(aliens,theAlien.alienX, theAlien.alienY,theAlien.alienW,theAlien.alienH);
  }
}

function moveAliens() {
  for (let theAlien of alienArray) {
    theAlien.alienY += theAlien.alienDY;
  }
}

function mousePressed() {
  if (state === "start screen") {
    state = "game screen";
  }
}

function displayTextOnStartup() {
  // Displaying text in white color which instructs how to start the game
  fill(255);
  textSize(42);
  textAlign(CENTER, CENTER);
  text("Click the mouse to start the game",width / 2,height / 2);
  

  // Displaying my name 
  fill(255);
  textSize(20);
  text("Made by Muhammad Raahim",width-300,height-50);
}
