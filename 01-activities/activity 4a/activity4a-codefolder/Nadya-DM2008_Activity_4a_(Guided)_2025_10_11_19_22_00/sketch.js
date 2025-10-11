// DM2008 – Activity 4a
// Bake a Cookie (30 min)

let cookie;
let flavors = ["strawberry", "vanilla", "chocolate", "matcha"];

function setup() {
  createCanvas(400, 400);
  noStroke();
  
  // Step 3: make one cookie object
cookie = new Cookie("chocolate", 250, width/2, height/2);
}

function draw() {
  background(0);

  // Step 4: call the cookie’s show() method
  cookie.show();
}

// Step 1: define the Cookie class
class Cookie {
  constructor(flavor, sz, x, y) {
    // set up required properties
    this.flavor = flavor;
    this.sz = sz;
    this.x = x;
    this.y =y;
  }

  // Step 2: display the cookie
  show() {
    if (this.flavor == "chocolate") {
      fill(137,81,41);
    }
    if (this.flavor == "strawberry") {
      fill(248,131,121);
    }
    if (this.flavor == "vanilla") {
      fill(253,251,212);
    }
    if (this.flavor == "matcha") {
      fill(132,176,103);
    }
    ellipse(this.x, this.y, this.sz);
  }
  
  // Steps 5 & 6: Implement additional methods here

// Step 5: add movement (keyboard arrows)
//function keyPressed() {
  
}

// Step 6: add flavor randomizer (mouse click)
function mousePressed() {
  cookie.flavor = random(flavors);
}