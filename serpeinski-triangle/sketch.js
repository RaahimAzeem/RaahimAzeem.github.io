// Serpeinski Triangle Demo

let initialTriangle =  [ 
  {x: 800, y: 56},
  {x: 200, y: 700},
  {x: 1400, y: 700},
];

let theDepth = 0;
let theColours = ["black", "red", "blue", "green", "yellow", "purple", "orange", "orange"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  // initialTriangle[0].x = width/2;
}

function draw() {
  background(220);
  serpeinski(initialTriangle, theDepth);
}

function serpeinski(points, depth) {
  fill(theColours[depth]);
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);
  
  if (depth > 0) {
    // Lower left triangle
    serpeinski([midpoint(points[0], points[1]), midpoint(points[1], points[2]), points[1]], depth - 1);

    // Upper Triangle
    serpeinski([points[0], midpoint(points[0], points[1]), midpoint(points[0], points[2]),], depth - 1);

    // Lower Right Triangle
    serpeinski([midpoint(points[0], points[2]), points[2], midpoint(points[1], points[2]),], depth - 1);
  }
}

function midpoint(point1, point2) {
  let newX = (point1.x + point2.x) / 2;
  let newY = (point1.y + point2.y) / 2;
  return {x: newX, y: newY};
}

function mousePressed() {
  if (theDepth < 7) {
    theDepth++;
  }
}