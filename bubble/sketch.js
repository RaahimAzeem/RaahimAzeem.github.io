// Bubble Movement and Slcining from an Array Demo
// Object Notation and Arrays Demo
// March 25, 2024

let theBubbles = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  // Spawn 5 bubbles at the start
  for (let i = 0; i < 5; i++) {
    spawnBubble();
  }

  // Spawn new bubble every half second
  window.setInterval(spawnBubble, 500);
}

function draw() {
  background(0);

  // moveBubblesRandomly();
  moveBubblesWithNoise();
  displayBubbles();
}

function mousePressed() {
  // did you click on a bubble?
  for (let i = theBubbles.length - 1; i >= 0; i-- ) {
    if (clickedInBubble(mouseX,mouseY,theBubbles[i])) {
      // kill it 
      theBubbles.splice(i,1);
    }
  }
}

function clickedInBubble(x,y,someBubble) {
  let distanceAway = dist(x,y,someBubble.x,someBubble.y);
  let radius = someBubble.size / 2;
  return distanceAway < radius;
}

function moveBubblesWithNoise() {
  for (let bubble of theBubbles) {
    // Figure out where to be
    let x = noise(bubble.timeX) * width;
    let y = noise(bubble.timeY) * height;

    // Set the bubble objects location
    bubble.x = x;
    bubble.y = y;

    // Increment timeX and timeY
    bubble.timeX += bubble.deltaTime;
    bubble.timeY += bubble.deltaTime;
    
  }
}

function moveBubblesRandomly() {
  for (let bubble of theBubbles) {
    let choice = random(100);
    if (choice < 25) {
      // move up

      bubble.y -= bubble.speed;

    }
    else if (choice < 50) {
      // move down

      bubble.y += bubble.speed;
      
    }
    else if (choice < 75) {
      // move right

      bubble.x += bubble.speed;
      
    }
    else if (choice < 100) {
      // move left

      bubble.x -= bubble.speed;
      
    }
  }
}

function displayBubbles() {
  for (let bubble of theBubbles) {
    fill(bubble.r,bubble.g,bubble.b,bubble.alpha);
    circle(bubble.x, bubble.y, bubble.size);
  }
}

function spawnBubble() {
  let someBubble = {
    size: random(50,80),
    x: random(width),
    y: random(height),
    r: random(255),
    g: random(255),
    b: random(255),
    speed: 3,
    alpha: random(255),
    timeX: random(1000000),
    timeY: random(1000000),
    deltaTime: 0.001,
  };
  theBubbles.push(someBubble);
}