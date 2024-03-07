const BOARD_SIZE = 100;
let xUnit = 0;
let yUnit = 0;
let lightColor;
let darkColor;
let boardSquares = [];
let lightBouncingBall = null;
let darkBouncingBall = null;
let ballDiameter = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);
  xUnit = windowWidth / BOARD_SIZE;
  yUnit = windowHeight / BOARD_SIZE;
  lightColor = color(200);
  darkColor = color(50);
  ballDiameter = min(xUnit, yUnit);
  initBoardSquares();
  lightBouncingBall = new BouncingBall(lightColor);
  darkBouncingBall = new BouncingBall(darkColor);
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
};
function initBoardSquares() {
  for (let i = 0; i < BOARD_SIZE; i++) {
    boardSquares.push([]);
    for (let j = 0; j < BOARD_SIZE; j++) {
      boardSquares[i].push({ color: Math.random() > 0.5 ? lightColor : darkColor, });
    }
  }
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
    this.move = () => {

    };
    this.render = () => {
      noStroke();
      fill(this.color);
      ellipse((this.x + 0.5) * xUnit, (this.y + 0.5) * yUnit, ballDiameter, ballDiameter);
    };
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
