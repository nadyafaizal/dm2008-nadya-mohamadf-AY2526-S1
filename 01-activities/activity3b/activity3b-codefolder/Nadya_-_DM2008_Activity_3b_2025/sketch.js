// DM2008 — Activity 3b
// (One Function Wonder, 15 min)
let angle = 0

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(0);
  myShape(width/2, height/2, 100, 100);
  myShape(mouseX, mouseY, 25, 25);
  
  function myShape(x,y,w,h) {
  noStroke();
  fill("#E71287");
  ellipse(x,y,w,h);
  fill("#001DFF");
  ellipse(x, y - h, w/1.5, h * 1);
  ellipse(x, y + h, w/1.5, h * 1);
  ellipse(x - w, y, w * 1.5, h/2);
  ellipse(x + w, y, w * 1.5, h/2);
    
    push();
  translate(x, y);
  rotate(angle);
  fill("#E71287");
  rect(0,0,w,h);
  angle += 0.02;
  pop();
    
  }


  // TODO 1:
  // Define a function that draws something (a shape or group of shapes).
  // It should take at least one parameter (e.g., position, size, or color).

  // TODO 2:
  // Call your function multiple times with different parameter values.
  // myShape(100, 200, 50);
  // myShape(300, 200, 80);

  // TODO 3:
  // (Challenge) Call your function inside a for loop
  // to create a repeating pattern or variation.
}

// Example starter function:
// function myShape(x, y, s) {
//   ellipse(x, y, s, s);
// }