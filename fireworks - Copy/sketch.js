// Fireworks OOP Demo

const NUMBER_OF_FIREWORKS_PER_CLICK = 200;

class Particle {
  constructor(x, y, dx, dy) {
    this.x = x;
    this.y = y;
    this.size = 5;
    this.dx = dx;
    this.dy = dy;
    this.r = 255;
    this.g = 0;
    this.b = 0;
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

    // Apply basic gravity
    this.dy += 0.1;

    // Fade away over time
    this.opacity -= 3;
  }

  isDead() {
    return this.opacity <= 0;
  }

}

let theFireworks = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
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
  let angle = 0;
  for (let i = 0; i < NUMBER_OF_FIREWORKS_PER_CLICK; i++) {
    let speed = random(1,3);
    let dx = cos(angle) * speed;
    let dy = sin(angle) * speed;
    let someFirework = new Particle(mouseX,mouseY, dx, dy);
    theFireworks.push(someFirework);

    angle += 360 / NUMBER_OF_FIREWORKS_PER_CLICK;
  }
}