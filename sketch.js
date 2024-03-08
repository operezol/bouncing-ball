const BOARD_SIZE = 200;
let xUnit = 0;
let yUnit = 0;
let lightColor;
let darkColor;
let boardSquares = [];
let lightBouncingBall = null;
let darkBouncingBall = null;
let ballDiameter = 0;
function initBoardSquares() {
  for (let i = 0; i < BOARD_SIZE; i++) {
    boardSquares.push([]);
    for (let j = 0; j < BOARD_SIZE; j++) {
      boardSquares[i].push({
        color: Math.random() > 0.5 ? lightColor : darkColor,
      });
    }
  }
}
class BouncingBall {
  constructor(colorP, xVelocityP, yVelocityP) {
    this.x = floor(random(BOARD_SIZE));
    this.y = floor(random(BOARD_SIZE));
    while (boardSquares[this.x][this.y].color === colorP) {
      this.x = floor(random(BOARD_SIZE));
      this.y = floor(random(BOARD_SIZE));
    }
    this.xVelocity = xVelocityP;
    this.yVelocity = yVelocityP;
    this.color = colorP;
    this.stationary={
      x:true,
      y:true
    };
  }

  bounceHorizontally = () => {
    this.xVelocity *= -1;
  };

  bounceVertically = () => {
    this.yVelocity *= -1;
  };

  move = () => {
    const nextX = this.x + this.xVelocity;
    const nextY = this.y + this.yVelocity;
    const isNextXInBounds = nextX >= 0 && nextX < BOARD_SIZE;
    const isNextYInBounds = nextY >= 0 && nextY < BOARD_SIZE;
    const oppositeColor = this.color === lightColor ? darkColor : lightColor;
  
    this.stationary.x = true; 

    if (!isNextXInBounds) {
      this.bounceHorizontally();
    } else if (boardSquares[nextX][this.y].color === oppositeColor) {
      this.bounceHorizontally();
      boardSquares[nextX][this.y].color = this.color;
    } else {
      this.stationary.x = false; 
    }

    this.stationary.y = true;
  
    if (!isNextYInBounds) {
      this.bounceVertically();
    } else if (boardSquares[this.x][nextY].color === oppositeColor) {
      this.bounceVertically();
      boardSquares[this.x][nextY].color = this.color;
    } else {
      this.stationary.y = false;
    }
  
    this.x += this.xVelocity * !this.stationary.x;
    this.y += this.yVelocity * !this.stationary.y;
  };
  

  render = () => {
    noStroke();
    fill(this.color);
    ellipse(
      (this.x + 0.5) * xUnit,
      (this.y + 0.5) * yUnit,
      ballDiameter,
      ballDiameter
    );
  };
}
function renderBoardSquares() {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      noStroke();
      fill(boardSquares[i][j].color);
      rect(i * xUnit, j * yUnit, xUnit, yUnit);
    }
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  xUnit = windowWidth / BOARD_SIZE;
  yUnit = windowHeight / BOARD_SIZE;
  lightColor = color(200);
  darkColor = color(50);
  ballDiameter = min(xUnit, yUnit);
  initBoardSquares();
  lightBouncingBall = new BouncingBall(lightColor, 1, 1);
  darkBouncingBall = new BouncingBall(darkColor, -1, -1);
}
function draw() {
  renderBoardSquares();
  darkBouncingBall.move();
  darkBouncingBall.render();
  lightBouncingBall.move();
  lightBouncingBall.render();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  xUnit = windowWidth / BOARD_SIZE;
  yUnit = windowHeight / BOARD_SIZE;
  ballDiameter = min(xUnit, yUnit);
  initBoardSquares();
  lightBouncingBall = new BouncingBall(lightColor, 1, 1);
  darkBouncingBall = new BouncingBall(darkColor, -1, -1);
}
