// OOP 1st Demo
// Muhammad Raahim

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

let theWalker;
let anotherWalker;
let someWalker;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  theWalker = new Walker(width / 2, height / 2, 5, "red", 50);
  anotherWalker = new Walker(200, 400, 5, "blue", 20);
  someWalker = new Walker(800, 600, 5, "black", 40);
}

function draw() {
  theWalker.move();
  anotherWalker.move();
  someWalker.move();
  
  theWalker.display();
  anotherWalker.display();
  someWalker.display();
}
