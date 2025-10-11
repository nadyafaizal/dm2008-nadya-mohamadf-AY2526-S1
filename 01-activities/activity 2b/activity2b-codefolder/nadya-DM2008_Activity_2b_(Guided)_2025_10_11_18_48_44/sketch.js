// DDM2008 — Activity 2b
// (Pattern Making, 40 min)

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
}

function draw() {
  background(0);
  
  // Horizontal row of shapes
  for (let i = 0; i < width; i += 50) {
    // Alternate colors using % (modulo)
    if (i % 100 == 0) {
      fill(255);   // white
    } else {
      fill(255, 105, 180); // pink
    }
    ellipse(width/2, i + 25, mouseX + 20);
    
  }
  
    // TODO: change ellipse to rect, triangle, or something else
    // TODO: try varying size instead of color

  // TODO: add one interaction (mouse or key) to change the rule
  // Example: if (mouseIsPressed) { fill(255, 0, 0); }
}