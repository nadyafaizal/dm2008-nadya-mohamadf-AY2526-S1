// DM2008
// Activity 1b (Georg Nees)

let x = 0;
let c = 0;
let y;
let w;

function setup() {
  createCanvas(800, 800)
  rectMode(CENTER);
  //set backgrond in set up
  background(163, 21, 21);
  
}

function draw() {
  
  stroke(2);
  strokeWeight(random(1, 4));
  noFill();
  rect(x, 250, 80, 80);
  // Add four to 'x'
  x = x + 4;
rect(mouseX, mouseY, w);
}

function mousePressed() {
  w = random(25, 200);
}
  
function keyPressed() {
  c = random(100,255);
    saveCanvas("activity1b-image", "jpg");
}
