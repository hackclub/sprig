/*
@title: Pong Solo
@author: Ishaan
@tags: ['classic', 'arcade']
@addedOn: 2025-01-04
*/

const paddleLeft = "l";
const paddleCenter = "c";
const paddleRight = "r";
const ball = "b";
const wall = "w";

setLegend(
  [paddleLeft, bitmap`
0000000000000000
0000000000000000
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
0000000000000000
0000000000000000`],
  [paddleCenter, bitmap`
0000000000000000
0000000000000000
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
0000000000000000
0000000000000000`],
  [paddleRight, bitmap`
0000000000000000
0000000000000000
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
0000000000000000
0000000000000000`],
  [ball, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000022222200000
0000222222220000
0002222222222000
0022222222222200
0022222222222200
0022222222222200
0022222222222200
0002222222222000
0000222222220000
0000022222200000
0000000000000000
0000000000000000
0000000000000000`],
  [wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`]
);

setBackground(wall);

let level = map`
....................
....................
....................
....................
....................
..........b.........
....................
....................
....................
....................
....................
........lcr.........`;

setMap(level);

let ballVelocity = { x: 1, y: -1 };
let score = 0;
let highScore = 0;
let gameActive = false;
let gameStarted = false;
let speed = 150;

function getAllPaddles() {
  return [...getAll(paddleLeft), ...getAll(paddleCenter), ...getAll(paddleRight)];
}

function hasPaddle(x, y) {
  const tile = getTile(x, y);
  return tile.some(s => s.type === paddleLeft || s.type === paddleCenter || s.type === paddleRight);
}

onInput("w", () => {
  if (!gameActive) return;
  const paddles = getAllPaddles();
  const canMove = paddles.every(p => p.y > 0);
  if (canMove) {
    paddles.forEach(p => p.y -= 1);
  }
});

onInput("s", () => {
  if (!gameActive) return;
  const paddles = getAllPaddles();
  const canMove = paddles.every(p => p.y < height() - 1);
  if (canMove) {
    paddles.forEach(p => p.y += 1);
  }
});

onInput("a", () => {
  if (!gameActive) return;
  const paddles = getAllPaddles();
  const canMove = paddles.every(p => p.x > 0);
  if (canMove) {
    paddles.forEach(p => p.x -= 1);
  }
});

onInput("d", () => {
  if (!gameActive) return;
  const paddles = getAllPaddles();
  const canMove = paddles.every(p => p.x < width() - 1);
  if (canMove) {
    paddles.forEach(p => p.x += 1);
  }
});

onInput("j", () => {
  if (!gameStarted) {
    startGame();
  } else if (!gameActive) {
    restartGame();
  }
});

function startGameLoop() {
  return setInterval(() => {
    if (!gameActive) return;
    
    const b = getFirst(ball);
    if (!b) return;
    
    if (ballVelocity.y > 0 && hasPaddle(b.x, b.y + 1)) {
      ballVelocity.y = -1;
      score++;
      
      if (score % 5 === 0 && speed > 80) {
        speed -= 10;
        clearInterval(gameLoop);
        gameLoop = startGameLoop();
        return;
      }
      
      const paddles = getAllPaddles();
      const paddleXPositions = paddles.map(p => p.x).sort((a, b) => a - b);
      const leftMost = paddleXPositions[0];
      const rightMost = paddleXPositions[paddleXPositions.length - 1];
      
      if (b.x === leftMost) {
        ballVelocity.x = -1;
      } else if (b.x === rightMost) {
        ballVelocity.x = 1;
      }
      
      updateScore();
    }
    
    b.x += ballVelocity.x;
    b.y += ballVelocity.y;
    
    if (b.y <= 0) {
      ballVelocity.y = 1;
    }
    
    if (b.x <= 0 || b.x >= width() - 1) {
      ballVelocity.x *= -1;
    }
    
    if (b.y >= height() - 1) {
      gameOver();
    }
  }, speed);
}

let gameLoop = null;

function showHomeScreen() {
  clearText();
  addText(`PONG`, { 
    x: 7,
    y: 4,
    color: color`2`
  });
  addText(`SOLO`, { 
    x: 7,
    y: 5,
    color: color`2`
  });
  addText(`Press J`, { 
    x: 5,
    y: 8,
    color: color`3`
  });
  addText(`to Start`, { 
    x: 5,
    y: 9,
    color: color`3`
  });
  addText(`Controls:`, { 
    x: 4,
    y: 11,
    color: color`6`
  });
  addText(`WASD-Move`, { 
    x: 3,
    y: 12,
    color: color`6`
  });
}

function startGame() {
  gameStarted = true;
  gameActive = true;
  clearText();
  updateScore();
  gameLoop = startGameLoop();
}

function updateScore() {
  clearText();
  addText(`Score: ${score}`, { 
    x: 1,
    y: 1,
    color: color`3`
  });
  addText(`High: ${highScore}`, { 
    x: 1,
    y: 2,
    color: color`6`
  });
}

function gameOver() {
  gameActive = false;
  
  if (score > highScore) {
    highScore = score;
  }
  
  clearText();
  addText(`GAME OVER`, { 
    x: 4,
    y: 5,
    color: color`3`
  });
  addText(`Score: ${score}`, { 
    x: 4,
    y: 7,
    color: color`2`
  });
  addText(`High: ${highScore}`, { 
    x: 4,
    y: 8,
    color: color`6`
  });
  addText(`Press J`, { 
    x: 5,
    y: 10,
    color: color`3`
  });
  addText(`to restart`, { 
    x: 4,
    y: 11,
    color: color`3`
  });
}

function restartGame() {
  score = 0;
  speed = 150;
  gameActive = true;
  ballVelocity = { x: 1, y: -1 };
  
  clearInterval(gameLoop);
  setMap(level);
  gameLoop = startGameLoop();
  updateScore();
}

showHomeScreen();