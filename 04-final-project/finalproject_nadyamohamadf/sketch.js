let images = [];
let imgSlider;
let agents = [];
const NUM_START = 22;
let hasBeenClicked = false;
let strokeColor;

let currentPage = "main"; // asked claude 2 help me...this tracks which visual/page is active
let inscribeBtn;
let buttonFont;
let drawingLayer; // off-screen canvas... drawings didnt leave a mark on the palm so I used chatgpt n it directed me to p5.graphics (using seperate layer)
let actionBtn;
let actionState = "idle";

//drawingpage stuff
let blankHand;
let drawColor = "#55170ef7";
let sizeVal = 4;
let eraserMode = false;
let pmouseX2, pmouseY2;
let agents2 = [];  
const NUM_AGENTS2 = 15;

//texture
let hennaTexture;

//coneforinscribepage
let coneActivated = false;
let hennaCone;
let coneHovered = false;

function preload() {

  //henna designs
  images[0] = loadImage("assets/designs/image1.png"); 
  images[1] = loadImage("assets/designs/image2.png"); 
  images[2] = loadImage("assets/designs/image3.png"); 
  images[3] = loadImage("assets/designs/image4.png"); 
  images[4] = loadImage("assets/designs/image5.png"); 
  images[5] = loadImage("assets/designs/image6.png"); 
  images[6] = loadImage("assets/designs/image7.png"); 
  images[7] = loadImage("assets/designs/image8.png"); 
  images[8] = loadImage("assets/designs/image9.png"); 
  images[9] = loadImage("assets/designs/image10.png"); 
  images[10] = loadImage("assets/designs/image11.png"); 
  images[11] = loadImage("assets/designs/image12.png"); 

  //font for btn
  buttonFont = loadFont("assets/font/Retrogression.ttf");


  // Blank hand for page2
  blankHand = loadImage("assets/designs/blankHand.png");

  //texture
  hennaTexture = loadImage("assets/designs/hennaTexture.png");

  //hennacone
   hennaCone = loadImage("assets/designs/hennaCone.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  drawingLayer = createGraphics(windowWidth, windowHeight); 
  drawingLayer.clear(); 
  noStroke();
  rectMode(CENTER);
  strokeColor = color(228, 0, 120);


  //sliderrrr in page1
  imgSlider = createSlider(0, 11, 0, 1);
  let sliderWidth = 500; //size of slider
  imgSlider.size(sliderWidth);
  imgSlider.position((width - sliderWidth) / 2, height - 100);
  imgSlider.addClass("bg-shape");

  //inscribe n back btn
  inscribeBtn = createButton("Inscribe");
  inscribeBtn.position(50, 20);
  inscribeBtn.addClass("bg-button");
  
  //btnfont style n stuff
 if (buttonFont.style) {
    inscribeBtn.style("font-family", buttonFont.style);
} else {
    inscribeBtn.style("font-family", "Retrogression");
}

    //whenbtnclicked
inscribeBtn.mousePressed(() => {
  if (currentPage === "main") { 
    currentPage = "second";
    inscribeBtn.html("Back");
    imgSlider.hide();

    coneActivated = false;
    document.body.classList.add("second-page");

  } else {
    currentPage = "main";
    inscribeBtn.html("Inscribe");
    imgSlider.show();
    actionBtn.hide();        
    actionState = "idle";    
    coneActivated = false;   

    drawingLayer.clear();

    document.body.classList.remove("second-page");
  }
});


// take pic
actionBtn = createButton("Done");
actionBtn.addClass("action-btn");
actionBtn.style("font-family", "Retrogression");
actionBtn.hide();   // hidden until cone is clicked

actionBtn.mousePressed(() => {
  if (actionState === "done") {
    // donechangestotakepic
    coneActivated = false;
    actionState = "photo";
    actionBtn.html("Snap!");
  }

  else if (actionState === "photo") {
    saveCanvas('myHennaDesign', 'png');

    // Reset back to Done mode
    actionState = "done";
    actionBtn.html("Done");
  }
});

  // pg1agentss
  for (let i = 0; i < NUM_START; i++) {
    let x = random(width);
    let y = random(height);
    let sz = random(12, 36);
    let speedX = random(-2, 2);
    let speedY = random(-2, 2);
    agents.push(new Agent(x, y, sz, speedX, speedY));
}
// pg2agentss
for (let i = 0; i < NUM_AGENTS2; i++) {
    let x = random(width);
    let y = random(height);
    let sz = random(12, 36);
    let speedX = random(-2, 2);
    let speedY = random(-2, 2);
    agents2.push(new Agent(
      x, y, sz, speedX, speedY ));
  }
}

function draw() {
    if (currentPage === "main") {
    drawMainPage();
  } else if (currentPage === "second") {
    drawInscribePage();
  }
}
  //mainpage-hennagallery
  function drawMainPage() {
  background("#0101F5");

  //weirdshapesbehind
  for (let i = 0; i < agents.length; i++) {
    agents[i].update(); 
    agents[i].disco();  
    agents[i].show();   
  }

    // hand on top
  let index = imgSlider.value();
  let img = images[index];
  if (img) {
    let displayWidth = windowWidth * 0.85; 
    let displayHeight = (img.height / img.width) * displayWidth;
    image(img, width/2 - displayWidth/2, height/2 - displayHeight/2, displayWidth, displayHeight);
  }


 for (let i = agents.length - 1; i >= 0; i--) {
    if (agents[i].life <= 0) agents.splice(i, 1);
  }
}

function drawSmoothTextureBrush(x1, y1, x2, y2) {
  let distTotal = dist(x1, y1, x2, y2);
  let steps = distTotal / (sizeVal * 0.15);

  for (let i = 0; i < steps; i++) {
    let t = i / steps;
    let x = lerp(x1, x2, t);
    let y = lerp(y1, y2, t);

    drawingLayer.push();
    drawingLayer.translate(x, y);
    drawingLayer.imageMode(CENTER);

    drawingLayer.rotate(random(-0.1, 0.1));
    drawingLayer.scale(random(0.97, 1.03));

    drawingLayer.tint(95, 40, 15, 100);
    drawingLayer.image(hennaTexture, 0, 0, sizeVal, sizeVal);
    drawingLayer.pop();
  }
}

//page2-inscibe
function drawInscribePage() {
  background("#E71287");
  for (let a of agents2) {
    a.update();
    a.show();
  }

  //palminpage2
let handW = width * 0.5;
  let handH = (blankHand.height / blankHand.width) * handW;
  let handX = width / 2 - handW / 2;
  let handY = height / 2 - handH / 2;
  image(blankHand, handX, handY, handW, handH);
  
    //current brush layer 
  image(drawingLayer, 0, 0); 

  //henna cone image...
  let coneW = width * 0.2; 
  let coneH = (hennaCone.height / hennaCone.width) * coneW; //asked claude how 2 keep aspect ratio
  let coneX = width - coneW - 20;
  let coneY = 30; // 

coneHovered = (!coneActivated && actionState !== "photo" &&
mouseX > coneX &&
mouseX < coneX + coneW &&
mouseY > coneY &&
mouseY < coneY + coneH);

// hovering cone darkens....
if (!coneActivated && actionState !== "photo") {
  if (coneHovered) {
    push();
    tint(0, 0, 0, 90);   // darkened cone
    image(hennaCone, coneX, coneY, coneW, coneH);
    pop();
  } else {
    image(hennaCone, coneX, coneY, coneW, coneH); 
  }
}
if (!coneActivated && actionState !== "photo") {
  push();
  textAlign(CENTER);
  textSize(45);
  fill(255);
  textFont(buttonFont);
  text("Click the cone to begin drawing", width / 2, height - 40);
  pop();
}
  //limitingdrawing2handarea
if (mouseIsPressed && coneActivated) {
if (pmouseX2 !== undefined && pmouseY2 !== undefined) {
let insideHand = isMouseOnHand(mouseX, mouseY, handX, handY, handW, handH);
let prevInsideHand = pmouseX2 !== undefined && pmouseY2 !== undefined &&
isMouseOnHand(pmouseX2, pmouseY2, handX, handY, handW, handH);

      if (insideHand && prevInsideHand) {
      drawSmoothTextureBrush(pmouseX2, pmouseY2, mouseX, mouseY);
      }
    }
    pmouseX2 = mouseX;
    pmouseY2 = mouseY;
  } else {
    pmouseX2 = undefined;
    pmouseY2 = undefined;
  }
}

//brushfunction
function brushCircle(x,y,c,s) {
  noStroke();
  fill(c);
  ellipse(x, y, s);
}

// clicking 2 spawn more weirdshapes
function mousePressed() {
  if (currentPage === "main")  {
  hasBeenClicked = !hasBeenClicked;
    strokeColor = hasBeenClicked ? color(240, 100, 80) : color(328, 100, 89);
    let sz = random(16, 40);
    let speedX = random(-2, 2);
    let speedY = random(-2, 2);
    agents.push(new Agent(mouseX, mouseY, sz, speedX, speedY));
  }

//tapping the cone 
if (currentPage === "second") {
    let coneW = width * 0.22;
    let coneH = (hennaCone.height / hennaCone.width) * coneW;
    let coneX = width - coneW - 20;
    let coneY = 30;

    let insideCone = mouseX > coneX &&
                     mouseX < coneX + coneW &&
                     mouseY > coneY &&
                     mouseY < coneY + coneH;

if (insideCone) {
  coneActivated = true;

  // donebutton to prompt users to snap a pic
  actionState = "done";
  actionBtn.html("Done");
  actionBtn.show();
}

}
}

function keyPressed() {
  if (currentPage === "second") {
    // save artwork
    if (key === 'S' || key === 's') saveCanvas('myHennaDesign', 'png');
      // clear brush drawings
    if (key === 'C' || key === 'c') {
      drawingLayer.clear();
    
    if (!coneActivated) return;
    }
  }

  if (currentPage === "main" && (key === 'C' || key === 'c')) agents = [];
}

// shapedrawing function
function myShape(x, y, w, h, angle, page) { //asked claude for help...
  noStroke();
  fill(231, 18, 135); 
  ellipse(x, y, w, h);
  fill(57, 255, 20); 
  ellipse(x, y - h, w/1.5, h * 1);
  ellipse(x, y + h, w/1.5, h * 1);
  ellipse(x - w, y, w * 1.5, h/2);
  ellipse(x + w, y, w * 1.5, h/2);
  
  push();
  translate(x, y);
  rotate(angle);
  if (page === "second") {
    fill("#FF5C00"); // orange for page 2
  } else {
    fill(231, 18, 135); // pg1pink
  }
  rect(0, 0, w, h);
  pop();
}

// agentclass
class Agent {
  constructor(x, y, sz, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.sz = sz;
    this.dx = speedX;
    this.dy = speedY;
    this.h = random(360);
    this.a = 200;
    this.angle = random(TWO_PI);
    this.rotSpeed = random(-0.05, 0.05);
    this.life = 255;

  }

  update() {
    this.x += this.dx;
    this.y += this.dy;

    if (this.x < 0 || this.x > width) this.dx *= -1;
    if (this.y < 0 || this.y > height) this.dy *= -1;

    this.angle += this.rotSpeed;
    this.sz += sin(frameCount * 0.05) * 0.2;
  }

  show() {
    myShape(this.x, this.y, this.sz, this.sz, this.angle, currentPage);
  }

  disco() {
    this.h += 1;
    if (this.h > 360) this.h = 0;
  }
}

//asked claude 2 help me to make it only draw-able within the hand surface area
function isMouseOnHand(mx, my, handX, handY, handW, handH) {
// mapping mouse coordinates to the image's pixel coordinates
let imgX = floor(map(mx, handX, handX + handW, 0, blankHand.width));
let imgY = floor(map(my, handY, handY + handH, 0, blankHand.height));

  // check bounds
if (imgX < 0 || imgX >= blankHand.width || imgY < 0 || imgY >= blankHand.height) return false;

blankHand.loadPixels();
let idx = 4 * (imgY * blankHand.width + imgX); // 4 channels per pixel
let alpha = blankHand.pixels[idx + 3]; 

return alpha > 0; // becomes true if not transparent
}

function windowResized() {
  let newLayer = createGraphics(windowWidth, windowHeight);
  newLayer.image(drawingLayer, 0, 0);
  drawingLayer = newLayer;

  resizeCanvas(windowWidth, windowHeight);

  imgSlider.position((width - imgSlider.width) / 2, height - 100);

}

