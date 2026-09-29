/* 
@title: Car Game
@author: Chin Jie Hao
@description: this is a car game where you control a red car, dodging the blue oncoming cars, after every 10 points or 10 car dodged, he game will increase your speed level by 1, the maximum speed level it can increase up to is 8. Have fun!
@tags: ['car', 'reaction'] 
@added on: 2026-09-29
*/


const player = "p";
const enemy = "e";
const road = "r";
const lane = "l";

const playerBitmap = bitmap`
................
......3333......
.....662266.....
....0C3223C0....
....03322330....
....03000030....
....30000003....
.....CC22CC.....
.....030030....2
.....030030.....
.....C3223C.....
....0L3223L0....
....0L0220L0....
....03000030....
.....633336.....
................`;

const enemyBitmap = bitmap`
................
......7777......
.....662266.....
....05722750....
....07722770....
....07000070....
....50000005....
.....552255.....
.....070070.....
.....070070.....
.....572275.....
....0L7227L0....
....0L0220L0....
....05000050....
.....652256.....
................`;

const roadBitmap = bitmap`
0000000000000000
0000000220000000
0000000220000000
0000000220000000
0000000000000000
0000000000000000
0000000220000000
0000000220000000
0000000220000000
0000000220000000
0000000000000000
0000000000000000
0000000220000000
0000000220000000
0000000220000000
0000000000000000`;

const laneBitmap = bitmap`
000000L11L000000
000000L11L000000
000000L11L000000
000000L11L000000
000000L11L000000
000000L11L000000
000000L11L000000
000000L11L000000
000000L11L000000
000000L11L000000
000000L11L000000
000000L11L000000
000000L11L000000
000000L11L000000
000000L11L000000
000000L11L000000`;

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
