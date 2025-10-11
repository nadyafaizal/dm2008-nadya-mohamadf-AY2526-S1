// DM2008 — Activity 3a
// (Array Sampler, 25 min)

// 1. Create an array of colors (or other values)
//    You can make more than one array if you'd like
let palette = ["#E71287", "#39FF14", "#0E00FC", "#F8F100", "#FFA500"];

// 2. A variable to track the current index
let currentIndex = 0;
let x, y;
let circleSize = 20

function setup() {
  createCanvas(400, 400);
  noStroke();
  x = random(width);
  y = random(height);
}

function draw() {
  background(0);

  // 3. Use the array value at currentIndex
  fill(palette[currentIndex]);
  ellipse(x, y, circleSize);
  ellipse(mouseX,mouseY,50,50);
}

// 4. Change the index when a key is pressed
function mousePressed() {
  picked = random(palette);
  // Advance to the next item
  currentIndex++;
  // Reset to 0 when we reach the end
  if (currentIndex >= palette.length) {
    currentIndex = 0;
    circleSize = circleSize + 40;
  }
  x = random(width);
  y = random(height);
  // Log in the console to check
  console.log("Current index:", currentIndex, "→", palette[currentIndex]);
}

/* 
TODOs for students:
1. Replace colors with your own data (positions, text, sizes, etc).
2. Try mousePressed() instead of keyPressed().
3. Use push() to add new items, or splice() to remove them, then check how the sketch adapts.
4. Try looping through an array to visualize all the items within it instead of accessing one item at a time.
*/