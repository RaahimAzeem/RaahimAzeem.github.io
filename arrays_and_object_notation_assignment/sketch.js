// Arrays and Object Notation 
// Muhammad Raahim 
// April 8, 2024
//
// Extra for Experts:
// - 

let state = "start screen";
let alienArray = [];  
let bulletArray = [];
let spaceship;
let asteroid;
let aliens;
let gameLost;
let gameWon;
let shipX;
let shipY;
let shipDX = 10;
let sizeW = 75; 
let sizeH = 75;
let alienSpawnIntervalSet = false;
let score = 0;
let lives = 3;


function preload() {
  spaceship = loadImage("spaceship.png");
  asteroid = loadImage("asteroid.png");
  aliens = loadImage("alien.png");
  gameLost = loadImage("gameLost.jpg");
  gameWon = loadImage("gameWon.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  shipX = width / 2;
  shipY = height *9/10;
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
  fill(255);
  text("Score: " + score, width*9.3/10, height*0.5/9);
  text("Lives: " + lives, width*9.3/10, height*1/8);


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
  gameResult();
  
}

function hitAlien() {
  for (let theAlien of alienArray) {
    for (let theBullet of bulletArray) {
      if (collideRectRect(theBullet.bX, theBullet.bY, theBullet.bWidth, theBullet.bHeight,theAlien.alienX, theAlien.alienY, theAlien.alienW, theAlien.alienH)) {
        alienArray.splice(alienArray.indexOf(theAlien),1);
        bulletArray.splice(bulletArray.indexOf(theBullet),1);
        score += 100;
      }
    }
  }
  
}

function gameResult() {
  if (lives <= 0) {
    background(55);
    image(gameLost,width/5,0,1024,height);
  }
  if (score >= 1000) {
    background(55);
    image(gameWon,width/3,0,612,365);
    
  }
}

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
    color: "red",
  };
  bulletArray.push(bullet);
}

function displayBullets() {
  // Looping through the bulletArray
  for (let theBullet of bulletArray) { 
    fill(theBullet.color);
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
    alienX: random(width*8.5/10),
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
    if (theAlien.alienY > shipY) {
      lives -= 1;
      alienArray.splice(alienArray.indexOf(theAlien),1);
    }
  }
  
  
}

function mousePressed() {
  if (state === "start screen") {
    state = "game screen";
  }
}

function displayTextOnStartup() {
  // Displaying text in white color which instructs how to start the game
  fill("green");
  textSize(105);
  textStyle(BOLD);
  text("SPACE INVADERS", width/2, height/6);

  fill(255);
  textSize(45);
  textAlign(CENTER, CENTER);
  text("Click the mouse to start the game",width / 2,height / 2);
  

  // Displaying my name 
  fill(255);
  textSize(30);
  text("Use the Arrow Keys or the keys 'a' and 'd' to move the ship.",width/2,height*3/4);
  text("Press the spacebar to fire bullets",width/2,height*3.3/4);
  text("Press the key 'e' to play the easy mode, Press the key 'm' to play the medium mode, Press the key 'h' to play the hard mode",width/2,height*3.6/4);

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

// Another way for alienHit() {
// // Array to hold indices of bullets to be removed
// let bulletsToRemove = [];
 
// // First pass: identify bullets that hit an alien
// for (let i = bulletArray.length - 1; i >= 0; i--) {
//   let theBullet = bulletArray[i];
//   for (let a = alienArray.length - 1; a >= 0; a--) {
//     let theAlien = alienArray[a];
//     if (collideRectRect(theBullet.bX, theBullet.bY, theBullet.bWidth, theBullet.bHeight,theAlien.alienX, theAlien.alienY, theAlien.alienW, theAlien.alienH)) {
        
//       // Mark the bullet for removal
//       bulletsToRemove.push(i);
        
//       // Remove the alien
//       alienArray.splice(a, 1);

//       score += 100; // Increment the score
//       break; // Exit the inner loop as the bullet has hit an alien
//     }
//   }
// }
 
// // Second pass: remove marked bullets
// for (let i = bulletsToRemove.length - 1; i >= 0; i--) {
//   bulletArray.splice(bulletsToRemove[i], 1);
// }
