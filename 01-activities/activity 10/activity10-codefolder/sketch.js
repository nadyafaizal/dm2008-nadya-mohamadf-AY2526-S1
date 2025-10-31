let colorBtn, sizeSlider, shapeSlider;
let shapeColor;

function setup() {
  createCanvas(640, 400);
  noStroke();
  textFont("Helvetica, Arial, sans-serif");
  

  // starting color
  shapeColor = color(random(255), random(255), random(255));

  // Button: change color
  colorBtn = createButton("Change Color");
  colorBtn.position(16, 20);
  colorBtn.mousePressed(randomShapeColor);
  
  colorBtn.addClass("bg-button");

  
  function randomShapeColor() {
    shapeColor = color(random(255), random(255), random(255));
  }

  // Slider: controls size
  createP("Size").position(0, 90).style("margin", "4px 0 0 16px").style("color", "white");
  sizeSlider = createSlider(20, 220, 100, 1);
  sizeSlider.position(15, 115);
  
  // slider: change shape
  createP("Shape").position(0,160).style("margin","8px 0 0 16px").style("color", "white");
  shapeSlider = createSlider(0, 2, 0, 1);
  shapeSlider.position(16, 180);
  
  shapeSlider.addClass("bg-shape");
  

  // Dropdown: choose shape
  //createP("Shape").position(0, 150).style("margin", "8px 0 0 16px").style("color", "white");
 // shapeSelect = createSelect();
 // shapeSelect.position(16, 180);
 // shapeSelect.option("ellipse");
 // shapeSelect.option("rect");
 // shapeSelect.option("triangle");
  
 // shapeSelect.addClass("bg-shape")
  
}

function draw() {
  background(0);

  push();
  translate(width * 0.65, height * 0.5);
  let s = sizeSlider.value();

  fill(shapeColor);

  // draw chosen shape
  let choice = shapeSlider.value();
  if (choice === 0) {
    ellipse(0, 0, s, s);
  } else if (choice === 1) {
    rectMode(CENTER);
    rect(0, 0, s, s);
  } else if (choice === 2) {
    triangle(-s * 0.6, s * 0.5, 0, -s * 0.6, s * 0.6, s * 0.5);
  }
  
  pop();
}
