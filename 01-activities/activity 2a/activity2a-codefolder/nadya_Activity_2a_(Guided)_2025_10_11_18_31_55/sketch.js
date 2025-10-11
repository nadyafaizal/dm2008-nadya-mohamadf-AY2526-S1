// DDM2008 — Activity 2a
// (Mode Switch, 20 min)

let x = 0;        // ellipse x-position
let size = 50;    // ellipse size (you can change this in your if/else)
let bgColor;      // background color set by switch(key)
let shapeColor;

function setup() {
  createCanvas(400, 400);
  bgColor = color(220);
  shapeColor = color(255, 105, 180);
}

function draw() {
  background(bgColor);

  // --- Movement (base behaviour) ---
  // The ellipse moves to the right each frame.
  // If you decide to control speed with an if/else below,
  // REMOVE or comment out this next line so you don't "double add" to x.
  x += 2;

  // Wrap around when it exits the right edge
  if (x > width + size / 2) {
    x = 0;
    shapeColor = color(255, 105, 180);
  }


  // --- Your if/else goes here (choose ONE behaviour rule) ---
  // Examples (uncomment ONE idea, or write your own):
  //
  //Change colour on mouse press
  if (mouseIsPressed) {
  fill(255, 13, 240);
  } else {
  fill(0);
  }
  //
  // 2) Change size on right half
  if (x > width / 2) {
  size = 80;
  } else {
  size = 50;
  }
  //
  // 3) Change speed using mouse position (THEN comment out x += 2; above)
  if (mouseX > width / 2) {
  x += 4; // faster on right
  } else {
  x += 2; // slower on left
  }
  //
  // Keep it simple: one clear rule that is easy to see on screen.

  // --- Draw the ellipse (after your if/else so changes apply this frame) ---
  // If you didn't set fill() in your rule above, it will be black.
  // fill(shapeColor);
  ellipse(x, height / 2, size);

  // Stretch (optional, if you finish early):
  // - Draw a rect instead of an ellipse when mouseIsPressed.
}

// --- Mode switching with number keys: 1, 2, 3 ---
function keyPressed() {
  switch (key) {
    case '1':
      bgColor = color(0); // black
      break;
    case '2':
      bgColor = color(44,255,5); // green
      break;
    case '3':
      bgColor = color(35,35,255); // blue
      break;
    default:
      bgColor = color(220);           // grey
  }
}