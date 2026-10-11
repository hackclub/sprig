/* 
* @title: UFO Space Dodge
* @author:EliasM (MrPotatoGuy)
* @description: this is a UFO game where you control a purple UFO, dodging the oncoming asteroids, after every 10 points or 10 asteroid dodged, he game will increase your speed level by 1, the maximum speed level it can increase up to is 8. Have fun!
* @tags: ['space', 'dodge'] 
* @addedOn: 2026-10-12
*/


const player = "p";
const enemy = "e";
const road = "r";
const lane = "l";

const playerBitmap = bitmap`
................
................
......0000......
.....077770.....
....07777770....
...0000000000...
..0HHHHHHHHHH0..
.0HHHHHHHHHHHH0.
0HHHHHHHHHHHHHH0
0000000000000000
..040404040404..
...0.0.0.0.0.0..
................
................
................
................`;

const enemyBitmap = bitmap`
................
.....000000.....
....00999990....
...0066699690...
..000000000690..
.0LLLLLLLLL0690.
0LL9999999LL0990
0L9991L1L99LL060
0L9991111999L000
.0L91L1L1119L00.
.0L991L11L99L00.
..0L999L1999L0..
...0LL9999LL0...
....00LLLL00....
......0000......
................`;

const roadBitmap = bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000002000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
2000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000200000
0000000000000000
0000000000000000`;

const laneBitmap = bitmap`
0000004444000000
0000000440000000
0000004444000000
0000000040000000
0000004440000000
0000000444000000
0000000440000000
0000004444000000
0000000440000000
0000004400000000
0000000444000000
0000000440000000
0000004440000000
0000000444000000
0000004400000000
0000000440000000`;

setLegend(
  [player, playerBitmap],
  [enemy, enemyBitmap],
  [road, roadBitmap],
  [lane, laneBitmap]
);

setMap(map`
lrrrrrrl
lrrrrrrl
lrrrrrrl
lrrrrrrl
lrrrrrrl
lrrrrrrl
lrrrrrrl
lrrrrrrl
lrrrrrrl
lrrrrrrl`);

let score = 0;
let highScore = 0;
let gameOver = false;

let playerLane = 4;
let playerY = 7;

const speedTimes = [
  700, 
  600, 
  500, 
  420, 
  350, 
  290, 
  230, 
  180  
];

let speedLevel = 1;

let gameTimer = null;

let showingSpeedMessage = false;
let speedMessageTimer = null;

const maxCars = 8;

let enemyLanes = [];
let enemyYs = [];

function updateScore() {

  if (gameOver) {
    return;
  }

  clearText();

  addText("S:" + score, {
    x: 0,
    y: 0,
    color: color`7`
  });

  addText("HI:" + highScore, {
    x: 14,
    y: 0,
    color: color`3`
  });


  addText("SPD:" + speedLevel, {
    x: 7,
    y: 1,
    color: color`7`
  });
}



function clearCars() {

  getAll(player).forEach(car => {
    car.remove();
  });

  getAll(enemy).forEach(car => {
    car.remove();
  });
}



function randomLane() {

  return Math.floor(Math.random() * 6) + 1;

}

function resetEnemies() {

  enemyLanes = [];
  enemyYs = [];

  for (let i = 0; i < maxCars; i++) {

    enemyLanes.push(
      randomLane()
    );

    enemyYs.push(
      -1 - (i * 3)
    );
  }
}

function spawnCars() {

  clearCars();

  addSprite(
    playerLane,
    playerY,
    player
  );


  for (let i = 0; i < maxCars; i++) {

    if (
      enemyYs[i] >= 0 &&
      enemyYs[i] <= 8
    ) {

      addSprite(
        enemyLanes[i],
        enemyYs[i],
        enemy
      );
    }
  }
}



function calculateSpeed() {

  let newSpeed =
    Math.floor(score / 10) + 1;

  if (newSpeed > 8) {
    newSpeed = 8;
  }

  if (newSpeed > speedLevel) {

    speedLevel = newSpeed;

    showSpeedUp();

    restartGameTimer();
  }
}



function showSpeedUp() {

  showingSpeedMessage = true;

  clearText();

  addText("SPEED UP!", {
    x: 5,
    y: 6,
    color: color`3`
  });


  addText("SPEED " + speedLevel, {
    x: 5,
    y: 8,
    color: color`7`
  });


  addText("KEEP GOING!", {
    x: 4,
    y: 10,
    color: color`7`
  });

  if (speedMessageTimer !== null) {

    clearTimeout(speedMessageTimer);
  }


  speedMessageTimer = setTimeout(() => {

    showingSpeedMessage = false;

    if (!gameOver) {
      updateScore();
    }

  }, 1200);
}

function moveEnemies() {

  if (gameOver) {
    return;
  }

  for (let i = 0; i < maxCars; i++) {

    enemyYs[i] += 1;

    if (enemyYs[i] > 8) {

      enemyYs[i] = -1;

      enemyLanes[i] = randomLane();

      score += 1;
    }
  }

  calculateSpeed();

  checkCollision();


  if (gameOver) {
    return;
  }

  spawnCars();

  if (!showingSpeedMessage) {

    updateScore();
  }
}

function restartGameTimer() {

  if (gameTimer !== null) {

    clearInterval(gameTimer);

    gameTimer = null;
  }


  gameTimer = setInterval(() => {

    if (!gameOver) {

      moveEnemies();
    }

  }, speedTimes[speedLevel - 1]);
}

function checkCollision() {

  if (gameOver) {
    return;
  }

  for (let i = 0; i < maxCars; i++) {

    if (
      enemyLanes[i] === playerLane &&
      enemyYs[i] === playerY
    ) {

      endRound();

      return;
    }
  }
}

function startRound() {

  if (gameTimer !== null) {

    clearInterval(gameTimer);

    gameTimer = null;
  }

  if (speedMessageTimer !== null) {

    clearTimeout(speedMessageTimer);

    speedMessageTimer = null;
  }

  score = 0;

  speedLevel = 1;

  gameOver = false;

  showingSpeedMessage = false;

  playerLane = 4;

  playerY = 7;

  resetEnemies();

  spawnCars();

  updateScore();

  restartGameTimer();
}

function endRound() {

  gameOver = true;

  if (gameTimer !== null) {

    clearInterval(gameTimer);

    gameTimer = null;
  }

  if (speedMessageTimer !== null) {

    clearTimeout(speedMessageTimer);

    speedMessageTimer = null;
  }

  if (score > highScore) {

    highScore = score;
  }

  clearText();

  addText("CRASH!", {
    x: 7,
    y: 4,
    color: color`3`
  });

  addText("SCORE: " + score, {
    x: 4,
    y: 6,
    color: color`7`
  });

  addText("HIGH: " + highScore, {
    x: 4,
    y: 8,
    color: color`3`
  });

  addText("SPEED: " + speedLevel, {
    x: 4,
    y: 10,
    color: color`7`
  });

  addText("W/I = AGAIN", {
    x: 4,
    y: 12,
    color: color`5`
  });
}

onInput("w", () => {

  if (gameOver) {

    startRound();

    return;
  }


  if (playerY > 1) {

    playerY -= 1;
  }


  spawnCars();

  checkCollision();
});


onInput("i", () => {

  if (gameOver) {

    startRound();

    return;
  }


  if (playerY > 1) {

    playerY -= 1;
  }


  spawnCars();

  checkCollision();
});

onInput("s", () => {

  if (gameOver) {
    return;
  }


  if (playerY < 8) {

    playerY += 1;
  }


  spawnCars();

  checkCollision();
});


onInput("k", () => {

  if (gameOver) {
    return;
  }


  if (playerY < 8) {

    playerY += 1;
  }


  spawnCars();

  checkCollision();
});

onInput("a", () => {

  if (gameOver) {
    return;
  }


  if (playerLane > 1) {

    playerLane -= 1;
  }


  spawnCars();

  checkCollision();
});


onInput("j", () => {

  if (gameOver) {
    return;
  }


  if (playerLane > 1) {

    playerLane -= 1;
  }


  spawnCars();

  checkCollision();
});

onInput("d", () => {

  if (gameOver) {
    return;
  }


  if (playerLane < 6) {

    playerLane += 1;
  }


  spawnCars();

  checkCollision();
});


onInput("l", () => {

  if (gameOver) {
    return;
  }


  if (playerLane < 6) {

    playerLane += 1;
  }


  spawnCars();

  checkCollision();
});

startRound();
