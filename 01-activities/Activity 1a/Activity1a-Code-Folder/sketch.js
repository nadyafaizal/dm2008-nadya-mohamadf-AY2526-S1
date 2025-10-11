// DDM2008
// Activity 1a

// Run the sketch, then click on the preview to enable keyboard
// Use the 'Option' ('Alt' on Windows) key to view or hide the grid
// Use the 'Shift' key to change overlays between black & white
// Write the code for your creature in the space provided

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(280);
  
  ellipse(200, 300, 250, 140);
  ellipse(150, 200, 100, 100);
 fill (245, 114, 0);  
  triangle(108, 176, 50, 180, 100, 202);


  
fill (252, 198, 3);
  stroke(227, 140, 0);
  fill (0,0,0); 
  ellipse(140, 185, 15, 15);
  fill (252, 198, 3); 
  helperGrid(); // do not edit or remove this line
}
