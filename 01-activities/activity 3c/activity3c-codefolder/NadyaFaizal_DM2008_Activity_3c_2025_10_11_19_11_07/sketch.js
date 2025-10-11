// DM2008 — Activity 3b
// (Painting App, 50 min)

// 1) Palette + size
const palette = ["#FF34E0", "#0400FF", "#FFE500", "#04FF00"]; //array
let colorIndex = 0;
let sizeVal = 20;
let eraserMode = false
let c;

// 2) Brush registry (array of functions)
const brushes = [brushCircle, brushSquare, brushStreak, brushTriangle]; //array
let currentBrush = 0; // 0, 1, or 2

function setup() {
  createCanvas(600, 600);
  background(0);
  rectMode(CENTER);
}

function draw() {
  // paint only while mouse is held
  if (mouseIsPressed) {
    if (eraserMode) {
  col = color(0); // eraser is on use bg color
} else {
  col = palette[colorIndex]; // eraser is off use selected palette color
}
    // call the selected brush function
    brushes[currentBrush](mouseX, mouseY, col, sizeVal);
    
  }
}

// 3) Brush functions (students can customize/extend)
function brushCircle(x, y, c, s) {
  noStroke();
  fill(c);
  ellipse(x, y, s);
}

function brushSquare(x, y, c, s) {
  push();
  translate(x, y);
  noStroke();
  fill(c);
  rect(0, 0, s, s);
  pop();
}

function brushStreak(x, y, c, s) {
  stroke(c);
  strokeWeight(max(2, s / 4));
  point(x,y);
}

function brushTriangle(x, y, c, s) {
    push();
  translate(x, y);
  noStroke();
  fill(c);
  triangle(-s / 2, s / 2,   // bottom left
    s / 2, s / 2,    // bottom right
    0, -s / 2); //top
  pop();
}

// 4) Brush UI: select brush, cycle color, change size, clear
function keyPressed() {
  switch (key) {
    case '1':
      currentBrush = 0; // circle
      break;
    case '2':
      currentBrush = 1; // square
      break; 
    case '3':
      currentBrush = 2; // streak
      break;
    case '4': currentBrush = 3; // triangle
      break;
  }
  if (key == 'C' || key == 'c') {
    colorIndex = (colorIndex + 1) % palette.length; // cycle color
     eraserMode = false;
  }
  if (key == '+' || key == '=') {
    sizeVal += 4;
  }
  if (key == '-' || key == '_') {
    sizeVal = max(4, sizeVal - 4);
  } 
  if (key == 'X' || key == 'x') {
    background(0); // clear canvas
  } 

   if (key === 'E' || key === 'e') {
    eraserMode = !eraserMode;
   }
  
  if (key === 'S' || key === 's') { saveCanvas('myArtwork', 'png'); //saves artwork as png
  
}
  
  // TODO: add an 'E' (eraser) mode by painting with background color
  // e.g., if eraserMode, use color(240) instead of palette[colorIndex]
}