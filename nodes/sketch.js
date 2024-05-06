// Connected Nodes Demo

let points = [];

class MovingPoint {
  constructor(x,y) {
    this.speed = 5;
    this.diameter = 30;
    this.maxDiameter = 100;
    this.minDiameter = 30;
    this.reach = 100;
    this.x = x;
    this.y = y;
    this.xTime = random(1000);
    this.yTime = random(1000);
    this.deltaTime = 0.01;
    this.color = color(random(255),random(255),random(255));
  }
  display() {
    noStroke();
    fill(this.color);
    circle(this.x,this.y,this.diameter);
  }

  update() {
    this.move();
    this.wrapAroundScreen();
    this.adjustSizeWithMouse();
  }

  connectTo(pointsArray) {
    for (let otherPoint of pointsArray) {
      // Avoid drawing line to the same point
      if (this !== otherPoint) {
        let pointDistance = dist(this.x, this.y, otherPoint.x, otherPoint.y);
        if (pointDistance < this.reach) {
          stroke(this.color);
          line(this.x, this.y, otherPoint.x, otherPoint.y);
        }
        
      }

    }

  }

  move() {
    // Pick random direction of movements
    let dx = noise(this.xTime);
    let dy = noise(this.yTime);

    // Scale the movement speed
    this.dx = map(dx, 0, 1, -this.speed, this.speed);
    this.dy = map(dy, 0, 1, -this.speed, this.speed);

    // Move Point
    this.x += this.dx;
    this.y += this.dy; 

    // Move on the graph
    this.xTime += this.deltaTime;
    this.yTime += this.deltaTime;
  }

  wrapAroundScreen() {
    // Wrap around the screen if you fall off
    if (this.x < 0) {
      // Fell off Left Side
      this.x += width;
    }
    else if (this.x > width) {
      // Fell off Right Side
      this.x -= width;
    }
    else if (this.y < 0) {
      // Fell off Top
      this.y += height;
    }
    else if (this.y > height) {
      // Fell off Bottom
      this.y -= height;
    }
  }

  adjustSizeWithMouse() {
    let mouseDistance = dist(this.x, this.y, mouseX, mouseY);
    if (mouseDistance < 100) {
      let theSize = map(mouseDistance, 0, this.reach, this.maxDiameter, this.minDiameter);
      this.diameter = theSize;
    }
    else {
      this.diameter = this.minDiameter;
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  let somePoint = new MovingPoint(width/2,height/2);
  points.push(somePoint);
  
}

function mousePressed() {
  let somePoint = new MovingPoint(mouseX,mouseY);
  points.push(somePoint);
}

function draw() {
  background(0);
  
  // Draw lines first
  for (let somePoint of points) {
    somePoint.update();
    somePoint.connectTo(points);
  }

  // Display after so the points are on top
  for (let somePoint of points) {
    somePoint.display();
  }
}


