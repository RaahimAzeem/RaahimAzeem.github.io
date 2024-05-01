// OOP 1st Demo
// Muhammad Raahim

let theWalkers = [];

class Walker {
  constructor(x,y,stepSize,colour,d) {
    this.x = x;
    this.y = y;
    this.stepSize = stepSize;
    this.colour = colour;
    this.d = d;
    
  }

  display() {
    fill(this.colour);
    circle(this.x, this.y, this.d);
  }

  move() {
    let choice = random(100);
    if (choice < 25) {
      // Move Up
      this.y -= this.stepSize;
    }
    else if (choice < 50) {
      // Move down
      this.y += this.stepSize;
    }
    else if (choice < 75) {
      // Move right
      this.x += this.stepSize;
    }
    else {
      // Move left
      this.x -= this.stepSize;
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function draw() {
  for (let someWalker of theWalkers) {
    someWalker.move();
    someWalker.display();
  }
}

function mousePressed() {
  let theColour = color(random(255), random(255), random(255));
  let myWalker = new Walker(mouseX, mouseY, 10, theColour, 10);
  theWalkers.push(myWalker);
}