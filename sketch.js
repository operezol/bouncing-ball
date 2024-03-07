const BOARD_SIZE = 100;
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
      boardSquares[i].push({ color: Math.random() > 0.5 ? lightColor : darkColor, });
    };
  };
};

class BouncingBall {
  constructor(colorP, xVelocityP, yVelocityP) {
    this.x = floor(random(BOARD_SIZE));
    this.y = floor(random(BOARD_SIZE));
    while (boardSquares[this.x][this.y].color === colorP) {
      this.x = floor(random(BOARD_SIZE));
      this.y = floor(random(BOARD_SIZE));
    };
    this.xVelocity = xVelocityP;
    this.yVelocity = yVelocityP;
    this.color = colorP;
  };
  move = () => {
    const nextX = this.x + this.xVelocity;
    const nextY = this.y + this.yVelocity;
    if (nextX < 0 || nextX >= BOARD_SIZE) {
      this.xVelocity *= -1;
    } else if (boardSquares[nextX][this.y].color === this.color) {
      this.xVelocity *= -1;
      boardSquares[nextX][this.y].color = this.color === lightColor ? darkColor : lightColor;
    }
    if (nextY < 0 || nextY >= BOARD_SIZE) {
      this.yVelocity *= -1;
    } else if (boardSquares[this.x][nextY].color === this.color) {
      this.yVelocity *= -1;
      boardSquares[this.x][nextY].color = this.color === lightColor ? darkColor : lightColor;
    }
    if(nextX > 0 && nextX < BOARD_SIZE && nextY > 0 && nextY < BOARD_SIZE && boardSquares[nextX][nextY].color === this.color) {
      boardSquares[nextX][nextY].color = this.color;
    }
    this.x += this.xVelocity;
    this.y += this.yVelocity;
  };
  render = () => {
    noStroke();
    fill(this.color);
    ellipse((this.x + 0.5) * xUnit, (this.y + 0.5) * yUnit, ballDiameter, ballDiameter);
  };
};

function renderBoardSquares() {
  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      noStroke();
      fill(boardSquares[i][j].color);
      rect(i * xUnit, j * yUnit, xUnit, yUnit);
    };
  };
};

function setup() {
  createCanvas(windowWidth, windowHeight);
  xUnit = windowWidth / BOARD_SIZE;
  yUnit = windowHeight / BOARD_SIZE;
  lightColor = color(200);
  darkColor = color(50);
  ballDiameter = min(xUnit, yUnit);
  initBoardSquares();
  lightBouncingBall = new BouncingBall(lightColor,1,1);
  darkBouncingBall = new BouncingBall(darkColor,-1,-1);
};

function draw() {
  renderBoardSquares();
  darkBouncingBall.move();
  darkBouncingBall.render();
  lightBouncingBall.move();
  lightBouncingBall.render();
};

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  xUnit = windowWidth / BOARD_SIZE;
  yUnit = windowHeight / BOARD_SIZE;
  ballDiameter = min(xUnit, yUnit);
  initBoardSquares();
  lightBouncingBall = new BouncingBall(lightColor,1,1);
  darkBouncingBall = new BouncingBall(darkColor,-1,-1);
};
