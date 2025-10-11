// DM2008 – Activity 5a
// Colliding Circles (30 min)

let balls = [];
let numBalls = 20;

function setup() {
  createCanvas(400, 400);
  // Step 1: create two Ball objects (addmore)
 for (let i = 0; i < numBalls; i++) {
  balls.push(new Ball(random(width), random(height)));
}
}

function draw() {
  background(255,19,240);

  // Step 2: update and display each ball
  for (let i = 0; i < balls.length; i++) {
  let b = balls[i];
  b.move();
  b.show();
  b.checkCollision(balls);

    
  // Step 3: check collisions
  // Use dist() between ball centers
  // Trigger feedback (color, bounce, etc.)
  }
}

class Ball {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.r = random(30,40);
    this.vel = createVector(random(-2, 2), random(-2, 2));
  }

  move() {
    this.pos.add(this.vel);
    // TODO: wrap around OR bounce off edges
    if (this.pos.x - this.r < 0 || this.pos.x + this.r > width) {
      this.vel.x *= -1;
    }
    if (this.pos.y - this.r < 0 || this.pos.y + this.r > height) {
      this.vel.y *= -1;
    }
  }
  
  show() {
    push();
    blendMode(DIFFERENCE);
    fill(0,0,205);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r * 2);
     pop();
  }

  // Step 4: Add a method to checkCollision(others)
  // Use dist() and respond visually
  
  checkCollision(others) {
    for (let i = 0; i < others.length; i++) {
      // not comparing ball to itself
      if (others[i] !== this) {
        let other = others[i];
        let d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
        if (d < this.r + other.r) {
          push();
          stroke(127,0,255);
          strokeWeight(10);
          noFill();
          ellipse(this.pos.x, this.pos.y, this.r * 2); // highlight on collision
          pop();
        }
      }
    }
  }

}

