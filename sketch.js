const BOARD_SIZE = 100;
let xUnit = 0;
let yUnit = 0;
let lightColor;
let darkColor;
let boardSquares = [];
let lightBouncingBall = {
  x: 0,
  y: 0,
  dx: 1,
  dy: 1,
  color: null,
};
let darkBouncingBall = {
  x: 0,
  y: 0,
  dx: -1,
  dy: -1,
  color: null,
};
let ballDiameter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  xUnit = windowWidth / BOARD_SIZE;
  yUnit = windowHeight / BOARD_SIZE;
  lightColor = color(200);
  darkColor = color(50);
  ballDiameter = min(xUnit, yUnit);
  if (BOARD_SIZE <= 0) {
    console.error("Error: BOARD_SIZE must be a positive number.");
    return;
  }
  initBoardSquares();
  initLightBouncingBall();
  initDarkBouncingBall();
}

function draw() {
  moveDarkBouncingBall();
  moveLightBouncingBall();
  renderBoardSquares();
  renderDarkBouncingBall();
  renderLightBouncingBall();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  xUnit = windowWidth / BOARD_SIZE;
  yUnit = windowHeight / BOARD_SIZE;
  ballDiameter = min(xUnit, yUnit);
}

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

function initLightBouncingBall() {
  lightBouncingBall.x = floor(random(BOARD_SIZE));
  lightBouncingBall.y = floor(random(BOARD_SIZE));
  lightBouncingBall.color = lightColor;
}

function initDarkBouncingBall() {
  darkBouncingBall.x = floor(random(BOARD_SIZE));
  darkBouncingBall.y = floor(random(BOARD_SIZE));
  darkBouncingBall.color = darkColor;
}

function moveLightBouncingBall() {
  let newX = lightBouncingBall.x + lightBouncingBall.dx;
  let newY = lightBouncingBall.y + lightBouncingBall.dy;

  // Check if the new position is within the canvas bounds
  if (newX >= 0 && newX < BOARD_SIZE && newY >= 0 && newY < BOARD_SIZE) {
    const nextXColor = boardSquares[newX][lightBouncingBall.y].color;
    const nextYColor = boardSquares[lightBouncingBall.x][newY].color;
    const nextDiagonalColor = boardSquares[newX][newY].color;

    // If the light ball is over a light square, bounce and convert the square to dark
    if (nextXColor === lightBouncingBall.color || nextYColor === lightBouncingBall.color || nextDiagonalColor === lightBouncingBall.color) {
      lightBouncingBall.dx *= -1;
      lightBouncingBall.dy *= -1;
      boardSquares[newX][newY].color = darkColor;
    } else if (nextXColor === darkColor) {
      lightBouncingBall.dx *= -1;
      boardSquares[newX][lightBouncingBall.y].color = lightColor;
    } else if (nextYColor === darkColor) {
      lightBouncingBall.dy *= -1;
      boardSquares[lightBouncingBall.x][newY].color = lightColor;
    }

    // Update the ball position
    lightBouncingBall.x = newX;
    lightBouncingBall.y = newY;
  } else {
    // Handle bouncing off the walls (reverse direction)
    lightBouncingBall.dx *= -1;
    lightBouncingBall.dy *= -1;
  }
}

function moveDarkBouncingBall() {
  let newX = darkBouncingBall.x + darkBouncingBall.dx;
  let newY = darkBouncingBall.y + darkBouncingBall.dy;

  // Check if the new position is within the canvas bounds
  if (newX >= 0 && newX < BOARD_SIZE && newY >= 0 && newY < BOARD_SIZE) {
    const nextXColor = boardSquares[newX][darkBouncingBall.y].color;
    const nextYColor = boardSquares[darkBouncingBall.x][newY].color;
    const nextDiagonalColor = boardSquares[newX][newY].color;

    // If the dark ball is over a dark square, bounce and convert the square to light
    if (nextXColor === darkBouncingBall.color || nextYColor === darkBouncingBall.color || nextDiagonalColor === darkBouncingBall.color) {
      darkBouncingBall.dx *= -1;
      darkBouncingBall.dy *= -1;
      boardSquares[newX][newY].color = lightColor;
    } else if (nextXColor === lightColor) {
      darkBouncingBall.dx *= -1;
      boardSquares[newX][darkBouncingBall.y].color = darkColor;
    } else if (nextYColor === lightColor) {
      darkBouncingBall.dy *= -1;
      boardSquares[darkBouncingBall.x][newY].color = darkColor;
    }

    // Update the ball position
    darkBouncingBall.x = newX;
    darkBouncingBall.y = newY;
  } else {
    // Handle bouncing off the walls (reverse direction)
    darkBouncingBall.dx *= -1;
    darkBouncingBall.dy *= -1;
  }
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

function renderLightBouncingBall() {
  noStroke();
  fill(lightBouncingBall.color);
  ellipse(
    (lightBouncingBall.x + 0.5) * xUnit,
    (lightBouncingBall.y + 0.5) * yUnit,
    ballDiameter,
    ballDiameter
  );
}

function renderDarkBouncingBall() {
  noStroke();
  fill(darkBouncingBall.color);
  ellipse(
    (darkBouncingBall.x + 0.5) * xUnit,
    (darkBouncingBall.y + 0.5) * yUnit,
    ballDiameter,
    ballDiameter
  );
}
