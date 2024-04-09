// Arrays and Object Notation 
// Muhammad Raahim 
// April 8, 2024
//
// Extra for Experts:
// - Used Sounds
// - Added HTML Elements

// Game setup variables
let state = "start screen";
let alienArray = [];  
let bulletArray = [];
let spaceship;
let asteroid;
let aliens;
let gameLost;
let gameWon;
let bulletSound;
let alienDestroyedSound;
let lifeLostSound;
let gameWonTextDisplay;
let shipX;
let shipY;
let shipDX = 10;
let sizeW = 75; 
let sizeH = 75;
let alienSpawnIntervalSet = false;
let score = 0;
let lives = 3;


function preload() {
  // Preloading images and sounds
  spaceship = loadImage("spaceship.png");
  asteroid = loadImage("asteroid.png");
  aliens = loadImage("alien.png");
  gameLost = loadImage("gameLost.jpg");
  gameWon = loadImage("gameWon.png");
  bulletSound = loadSound("Bullet Sound.mp3");
  alienDestroyedSound = loadSound("Alien Destroyed Sound.mp3");
  lifeLostSound = loadSound("Lives Lost.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Asssigning values for shipX and shipY according to the width and height of the canvas
  shipX = width / 2;
  shipY = height *9/10;
  noStroke();
}

function draw() {
  determineState();
}

function determineState() {
  // Changing the state accordingly
  if (state === "start screen") {
    startScreen();
  }
  else if (state === "game screen") {
    gameScreen();
  }
}

function gameScreen() {
  background(55);
  
  // Displaying the score and number of lives on the top right corner of the screen
  textSize(35);
  fill(255);
  text("Score: " + score, width*9.3/10, height*0.5/9);
  text("Lives: " + lives, width*9.3/10, height*1/8);


  // Spawning asteroids in the background to make it feel like space
  image(asteroid,random(width),random(height),20,20);

  // Spaceship which will shoot down the aliens
  image(spaceship,shipX,shipY,sizeW,sizeH);

  moveShip();

  // If the ship has been moved, the aliens are gonna spawn after every 2 seconds
  if (shipX !== width/2 && !alienSpawnIntervalSet) {
    window.setInterval(spawnAliens, 2000);
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
  // Looping through 2 arrays and making the aliens and bullets disappear as soon as they collide, increase the score and let a sound play as well
  for (let theAlien of alienArray) {
    for (let theBullet of bulletArray) {
      if (collideRectRect(theBullet.bX, theBullet.bY, theBullet.bWidth, theBullet.bHeight,theAlien.alienX, theAlien.alienY, theAlien.alienW, theAlien.alienH)) {
        alienDestroyedSound.play();
        alienArray.splice(alienArray.indexOf(theAlien),1);
        bulletArray.splice(bulletArray.indexOf(theBullet),1);
        score += 100;
      }
    }
  }
  
}



function gameResult() {
  // If the lives equal 0, it will end the game and display an image. Stops all the other sounds 
  if (lives <= 0) {
    bulletSound.stop();
    alienDestroyedSound.stop();
    lifeLostSound.stop();
    background(55);
    image(gameLost,width/5,0,1024,height);
  }

  // If the score equals = 1000, you win the game and display an image and text accordingly. Stops all the other sounds 
  if (score >= 2000) {
    bulletSound.stop();
    alienDestroyedSound.stop();
    lifeLostSound.stop();
    background(55);
    image(gameWon,width/3,0,612,365);
    // gameWonText();
  }
}


function keyPressed() {
  // For every time spacebar is pressed, bullets are spawned at the x location of the ship. Letting a sound play as well and adjusting the volume
  if (key === " ") {
    bulletSound.setVolume(0.2);
    bulletSound.play();
    spawnBullets(shipX);
  }
}

function startScreen() {
  // The background is light blue and displays the instructions on the screen. Stopping the bullet sound in case user clicks spacebar on the start screen
  bulletSound.stop();
  background(0,27,45);
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
  // Make a bullet and set its attributes
  let bullet = {
    bX: bulletX + 33,
    bY: height - 100, 
    bDY: 10,
    bWidth: 10,
    bHeight: 25,
    color: "red",
  };

  // Add the bullet to the array
  bulletArray.push(bullet);
}

function displayBullets() {
  // Looping through the bulletArray and displaying the bullet as a red coloured rectangle
  for (let theBullet of bulletArray) { 
    fill(theBullet.color);
    rect(theBullet.bX, theBullet.bY, theBullet.bWidth,theBullet.bHeight);
  }
}

function moveBullets() {
  // Looping through the array and decreasing the y value of theBullet so it glides down 
  for (let theBullet of bulletArray) {
    theBullet.bY -= theBullet.bDY;
  }
}

function spawnAliens() {
  // Make an alien and set its attributes
  let alien = {
    alienX: random(width*8.5/10),
    alienY: 0, 
    alienDY: 4,
    alienW: 60,
    alienH: 60,
  };
  // Add the bullet to the array
  alienArray.push(alien);
}

function displayAliens() {
  // Looping through the alienArray and displaying theAlien as an image
  for (let theAlien of alienArray) { 
    image(aliens,theAlien.alienX, theAlien.alienY,theAlien.alienW,theAlien.alienH);
  }
}

function moveAliens() {
  // Looping through the array and incrementing the y value of theAlien so it glides upwards
  for (let theAlien of alienArray) {
    theAlien.alienY += theAlien.alienDY;
    
    // If theAlien goes past the y value of the ship, the number of lives decrease by 1 and the alien is disappeared/removed from the array. A sound is also played
    if (theAlien.alienY > shipY) {
      lifeLostSound.play();
      lives -= 1;
      alienArray.splice(alienArray.indexOf(theAlien),1);
    }
  }
  
  
}

function mousePressed() {
  // When the user clicks the mouse, the state changes to "game screen" IF the state was "start screen"
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

  // Displaying Instructions 
  fill(255);
  textSize(45);
  textAlign(CENTER, CENTER);
  text("Click the mouse to start the game",width / 2,height / 2);
  fill(255);
  textSize(30);
  text("Use the Arrow Keys or the keys 'a' and 'd' to move the ship.",width/2,height*3/4);
  text("Press the spacebar to fire bullets",width/2,height*3.3/4);
}
 