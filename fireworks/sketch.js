// Fireworks OOP Demo

const NUMBER_OF_FIREWORKS_PER_CLICK = 100;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 5;
    this.dx = random(-5,5);
    this.dy = random(-5,5);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
    this.opacity = 255;
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b, this.opacity);
    circle(this.x, this.y, this.size);
  }

  update() {
    // Move the Particle
    this.x += this.dx;
    this.y += this.dy;
    this.opacity-- ;
  }

  isDead() {
    return this.opacity <= 0;
  }

}

let theFireworks = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  for (let firework of theFireworks) {
    if (firework.isDead()) {
      // Delete It
      let index = theFireworks.indexOf(firework);
      theFireworks.splice(index,1);
    }
    else {
      // Move and display it
      firework.update();
      firework.display();
    }
  }

}

function mousePressed() {
  for (let i = 0; i < NUMBER_OF_FIREWORKS_PER_CLICK; i++) {
    let someFirework = new Particle(mouseX,mouseY);
    theFireworks.push(someFirework);
  }
}