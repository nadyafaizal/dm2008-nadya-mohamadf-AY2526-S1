// Notes for students:
// 1) Add flap control in handleInput() (space / ↑ to jump) 
// 2) Detect collisions between the bird and pipes → game over 
// 3) Add scoring when you pass a pipe 
// 4) (Stretch) Add start/pause/game-over states 

/* ----------------- Globals ----------------- */
let bird;
let pipes = [];
let gameState = "start";
let myFont;
let bg;
let pigeonImg;

let spawnCounter = 0; // simple timer
const SPAWN_RATE = 78; // ~ every 90 frames at 60fps ≈ 1.5s
const PIPE_SPEED = 2.5;
const PIPE_GAP = 160; // gap height (try 100–160)
const PIPE_W = 60;

let score = 0

/* ----------------- Setup & Draw ----------------- */
function setup() {
  createCanvas(480, 640);
  noStroke();
  bird = new Bird(120, height / 2);
  // Start with one pipe so there’s something to see
  pipes.push(new Pipe(width + 40));
}

function preload() {
     myFont = loadFont('assets/Pixel Game.otf');
     bg = loadImage('assets/bg.png');
     pigeonImg = loadImage('assets/pigeon.png');
}

function draw() {
   imageMode(CORNER);
    image(bg, 0, 0, width, height);
  imageMode(CENTER); // now center images like the pigeon
  //***
  
  // gamestate - start screen
  if (gameState === "start") {
    fill(255);
    textAlign(CENTER);
    textFont(myFont);
    textSize(30);
    fill(255,19,240);
    text("PRESS SPACE TO START", width / 2, height / 1.8);
    noLoop(); // wait until space is pressed
    return;
  }

  if (gameState === "playing") {

    // 1) read input (students: add flap control here)
    handleInput();

    // 2) update world
    bird.update();

    // spawn new pipes on a simple timer
    spawnCounter++;
    if (spawnCounter >= SPAWN_RATE) {
      pipes.push(new Pipe(width + 40));
      spawnCounter = 0;
    }

    // update + draw pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].update();
      pipes[i].show();

      // collision check
      if (pipes[i].hits(bird)) {
        gameState = "gameOver";
      }

      // scoring
      if (!pipes[i].passed && pipes[i].x + pipes[i].w < bird.pos.x) {
        score++; 
        pipes[i].passed = true;
      }

      // remove pipes that moved off screen
      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    // 3) draw bird last so it’s on top
    bird.show();

    // display score
    fill(255,250,250);
    textFont(myFont);
    textSize(24);
    textAlign(LEFT, TOP);
    text("Score: " + score, 10, 10);
    
    // check for touching ground
    if (bird.pos.y >= height - bird.r) {
      gameState = "gameOver";
    }
  }

  // game over screen
  if (gameState === "gameOver") {
    bird.show();
    for (let p of pipes) p.show();
    
    
    // rect behind text
    push();
    fill(0, 150);
    rectMode(CENTER);
    rect(width / 2, height / 2, 300, 150, 20); 
    pop(); 
    
    fill(255,250,250);
    textAlign(CENTER, CENTER);
    textFont(myFont);
    textSize(32);
    text("Game Over!", width / 2, height / 2 - 40);
    //textSize(25);
    //text("Score: " + score, width / 2, height / 2);
    
    fill(255,19,240);
    text("Press SPACE to restart", width / 2, height / 2 + 40);
    
    fill(255,250,250);
    textSize(25);
    text("Score: " + score, width / 2, height / 2);
    
    noLoop();
    
  }
}

/* ----------------- Input ----------------- */
function handleInput() {

}

function keyPressed() {
  // (Student choice) Uncomment to flap on space or UP:
  if (key === " " || keyCode === UP_ARROW) {
    if (gameState === "start") {
      resetGame();
    } else if (gameState === "playing") {
      bird.flap();
    } else if (gameState === "gameOver") {
      resetGame();
    }
    return false;
  }
}

/* ----------------- Game Reset ----------------- */
function resetGame() {
  bird = new Bird(120, height / 2);
  pipes = [];
  spawnCounter = 0;
  score = 0;
  gameState = "playing";
  loop();
}

/* ----------------- Classes ----------------- */
class Bird {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.r = 16; // for collision + draw
    this.gravity = 0.48; // constant downward force
    this.flapStrength = -10; // negative = upward
  }

  applyForce(fy) {
    this.acc.y += fy;
  }

  flap() {
    // instant upward kick
    this.vel.y = this.flapStrength;
  }

  update() {
    // gravity
    this.applyForce(this.gravity);

    // integrate
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // keep inside canvas vertically (simple constraints)
    if (this.pos.y < this.r) {
      this.pos.y = this.r;
      this.vel.y = 0;
    }
    if (this.pos.y > height - this.r) {
      this.pos.y = height - this.r;
      this.vel.y = 0;
      // TODO (students): treat touching the ground as game over
    }
  }

  show() {
    imageMode(CENTER);
    image(pigeonImg, this.pos.x, this.pos.y, this.r*3, this.r*3);
    
    
    //fill(255, 205, 80);
    //circle(this.pos.x, this.pos.y, this.r * 2);
    // small eye
    //fill(40);
    //circle(this.pos.x + 6, this.pos.y - 4, 4);
  }
}

class Pipe {
  constructor(x) {
    this.x = x;
    this.w = PIPE_W;
    this.speed = PIPE_SPEED;

    // randomize gap position
    const margin = 40;
    const gapY = random(margin, height - margin - PIPE_GAP);

    this.top = gapY; // bottom of top pipe
    this.bottom = gapY + PIPE_GAP; // top of bottom pipe
    this.passed = false; // for scoring once per pipe
  }

  update() {
    this.x -= this.speed;
  }

  show() {
    fill(255,61,202);
    rect(this.x, 0, this.w, this.top); // top pipe
    rect(this.x - 10, this.top - 20, this.w + 20, 20);
    
    rect(this.x, this.bottom, this.w, height - this.bottom); // bottom pipe
     rect(this.x - 10, this.bottom, this.w + 20, 20);
  }

  offscreen() {
    // look at MDN to understand what 'return' does
    // we will learn more about this in Week 6
    return this.x + this.w < 0;
  }
 
  // TODO (students): circle-rect collision (simple)
  // 1) Check if bird within pipe's x range.
  // 2) If yes, check if bird.y is outside the gap (above top OR below bottom).
  //    Then it’s a hit.
  
  hits(bird) {
    const withinX = bird.pos.x + bird.r > this.x && bird.pos.x - bird.r < this.x + this.w;
    const aboveGap = bird.pos.y - bird.r < this.top;
    const belowGap = bird.pos.y + bird.r > this.bottom;
    return withinX && (aboveGap || belowGap);
  }
}

  //function half (x) {
  // return x/2; //returns half of imput

