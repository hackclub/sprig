/*
@title: the maze with metors
@author: Daksh Thapar (DakshRocks21/dak5h.exe)
@tags: ["maze", "obstacle"]
@addedOn: 2024-08-15
*/

const player = "p";
const wall = "w";
const goal = "g";
const obstacle = "o";
var gameRunning = true;

const gameMusic = tune`
200: C4~200 + G4^200,
200: D4~200 + G4^200 + A4^200,
200: E4~200 + B4^200 + A4^200 + C4-200,
200: F4~200 + B4^200 + C5^200 + D4-200 + G5/200,
200: G4~200 + C5^200 + D5^200 + B4-200 + E4-200,
200: A4~200 + D5^200 + E5^200 + C5-200 + F4-200,
200: B4~200 + E5^200 + F5^200 + D5-200,
200: C5~200 + G5^200 + E5-200 + F5-200 + D5/200,
200: C5~200 + G5^200 + F5-200 + E5-200 + D5/200,
200: B4~200 + F5^200 + E5^200 + D5-200,
200: A4~200 + E5^200 + D5^200 + F4-200 + C5-200,
200: G4~200 + D5^200 + C5^200 + E4-200 + B4-200,
200: F4~200 + C5^200 + B4^200 + D4-200 + G5/200,
200: E4~200 + B4^200 + A4^200 + C4-200,
200: D4~200 + A4^200 + G4^200,
200: C4~200 + G4^200,
200: C4~200 + G4^200,
200: D4~200 + G4^200 + A4^200,
200: E4~200 + B4^200 + A4^200 + C4-200,
200: F4~200 + B4^200 + C5^200 + D4-200 + G5/200,
200: G4~200 + D5^200 + C5^200 + B4-200 + E4-200,
200: A4~200 + E5^200 + D5^200 + C5-200 + F4-200,
200: B4~200 + E5^200 + F5^200 + D5-200 + G4-200,
200: C5~200 + G5^200 + F5-200 + E5-200 + D5/200,
200: C5~200 + G5^200 + E5-200 + F5-200 + D5/200,
200: B4~200 + E5^200 + F5^200 + D5-200 + G4-200,
200: A4~200 + D5^200 + E5^200 + C5-200 + F4-200,
200: G4~200 + C5^200 + D5^200 + B4-200 + E4-200,
200: F4~200 + B4^200 + C5^200 + D4-200 + G5/200,
200: E4~200 + A4^200 + B4^200 + C4-200,
200: D4~200 + G4^200 + A4^200,
200: C4~200 + G4^200`
const gameOver = tune`
208.33333333333334: C5-208.33333333333334 + B5-208.33333333333334,
208.33333333333334: G5^208.33333333333334 + C5-208.33333333333334 + A5-208.33333333333334 + E5~208.33333333333334,
208.33333333333334: D5-208.33333333333334 + C5-208.33333333333334 + A5-208.33333333333334 + E5~208.33333333333334,
208.33333333333334: G5^208.33333333333334 + D5-208.33333333333334 + C5-208.33333333333334 + A5-208.33333333333334 + E5~208.33333333333334,
208.33333333333334: G5-208.33333333333334 + E5~208.33333333333334 + C5-208.33333333333334,
208.33333333333334: F5^208.33333333333334 + G5-208.33333333333334 + E5/208.33333333333334 + C5-208.33333333333334,
208.33333333333334: F5~208.33333333333334 + G5-208.33333333333334 + E5/208.33333333333334 + C5-208.33333333333334,
208.33333333333334: G5^208.33333333333334 + F5~208.33333333333334 + A5^208.33333333333334 + C5-208.33333333333334 + E5/208.33333333333334,
208.33333333333334: G5^208.33333333333334 + A5^208.33333333333334 + F5~208.33333333333334 + D5-208.33333333333334 + E5/208.33333333333334,
208.33333333333334: F5~208.33333333333334 + G5-208.33333333333334 + A5^208.33333333333334 + D5-208.33333333333334 + E5/208.33333333333334,
208.33333333333334: F5~208.33333333333334 + G5-208.33333333333334 + A5^208.33333333333334 + D5-208.33333333333334 + E5/208.33333333333334,
208.33333333333334: G5-208.33333333333334 + A5^208.33333333333334 + D5-208.33333333333334 + E5-208.33333333333334 + F5~208.33333333333334,
208.33333333333334: G5-208.33333333333334 + A5^208.33333333333334 + D5-208.33333333333334 + E5-208.33333333333334 + F5~208.33333333333334,
208.33333333333334: G5-208.33333333333334 + A5^208.33333333333334 + E5-208.33333333333334 + F5/208.33333333333334,
208.33333333333334: G5-208.33333333333334 + A5^208.33333333333334 + E5-208.33333333333334 + F5/208.33333333333334,
208.33333333333334: A5^208.33333333333334 + G5-208.33333333333334 + E5-208.33333333333334 + F5/208.33333333333334,
208.33333333333334: A5^208.33333333333334 + G5/208.33333333333334 + E5-208.33333333333334 + F5~208.33333333333334,
208.33333333333334: G5-208.33333333333334 + A5^208.33333333333334 + E5-208.33333333333334 + D5-208.33333333333334 + F5~208.33333333333334,
208.33333333333334: G5/208.33333333333334 + A5^208.33333333333334 + F5~208.33333333333334 + D5-208.33333333333334,
208.33333333333334: G5/208.33333333333334 + F5~208.33333333333334 + D5-208.33333333333334,
208.33333333333334: G5/208.33333333333334 + F5~208.33333333333334 + D5-208.33333333333334,
208.33333333333334: G5/208.33333333333334 + F5~208.33333333333334 + D5-208.33333333333334,
208.33333333333334: F5~208.33333333333334 + A5-208.33333333333334 + D5-208.33333333333334 + G5/208.33333333333334,
208.33333333333334: F5-208.33333333333334 + A5-208.33333333333334 + D5-208.33333333333334 + G5/208.33333333333334,
208.33333333333334: F5-208.33333333333334 + A5/208.33333333333334 + D5-208.33333333333334 + G5~208.33333333333334,
208.33333333333334: F5-208.33333333333334 + A5/208.33333333333334 + D5-208.33333333333334 + G5~208.33333333333334,
208.33333333333334: F5-208.33333333333334 + A5/208.33333333333334 + D5-208.33333333333334 + G5~208.33333333333334,
208.33333333333334: F5-208.33333333333334 + A5-208.33333333333334 + C5-208.33333333333334 + G5~208.33333333333334 + B5/208.33333333333334,
208.33333333333334: F5^208.33333333333334 + A5-208.33333333333334 + C5-208.33333333333334 + G5~208.33333333333334,
208.33333333333334: E5^208.33333333333334 + C5-208.33333333333334 + G5~208.33333333333334,
208.33333333333334: C5-208.33333333333334 + A5~208.33333333333334,
208.33333333333334: A5~208.33333333333334`

setLegend(
  [player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`],
  [obstacle, bitmap`
6666666666666666
6666666666666666
9666666666666669
9966666666666699
9966666666666699
9966666666666699
9996666666666999
9999C666666C9999
9999CC6666CC9999
9999CCC66CC99999
.9999CCCCCC9999.
..999CCCCCC999..
...999CCCC999...
....999CC999....
.....999999.....
......9999......`],
  [goal, bitmap`
................
..66........66..
..666......666..
..666......666..
..666666666666..
..666666666666..
..666666666666..
...6666666666...
...6666666666...
....66666666....
.66666666666666.
6666.666666.6666
.....666666.....
...6666666666...
6666666666666666
..666666666666..`],

  [wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]);

setSolids([player], [wall]);

let level = 0
const levels = [
  map`
wwwwwwwwww
wpwww..wgw
w...w.ww.w
www...ww.w
w....www.w
w.wwwww..w
w...w...ww
.ww.w.w.ww
.w....w.ww
....w.....`,
  map`
wwwwwww...www
wp......w...w
.ww.w.w..wwgw
....w.ww..ww.
ww.ww..ww.w..
ww.w..ww....w
.....ww..wwww
.w.ww...ww.ww
.www.ww.ww.ww
.ww.....w..ww
..w.w..ww.w.w
w...ww......w
www.....wwwww`,
  map`
wwwwww.ww.ww..w
wpww...w..w...w
w.ww.ww.....w..
w........wwwww.
www.w.www..ww..
....ww..w.ww...
.wwww.w.w....ww
....w....ww....
www.ww.w...wwww
....w..www..www
.w.www.wwww...w
ww..wwww.......
...w.w.w..wwww.
.ww........wwg.
....wwwwwwwwwww`
]

const size_map = [
  [10, 10],
  [13, 10],
  [15,15]
]

const speeds = [
  1000,
  800,
  500
]

const endScreen = map`
wwwwwwwwww
wwwwggwwww
wwpwggwoww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww`;

var playback = playTune(gameMusic, Infinity);
var gameOverMusic = playTune(gameOver, Infinity).end();

setMap(levels[level]);

setPushables({
  [player]: []
});



onInput("s", () => {
  if (gameRunning) {
    const nextTile = getTile(getFirst(player).x, getFirst(player).y + 1);

    if (!nextTile.some(sprite => sprite.type === wall)) {
      getFirst(player).y += 1;
    }
  }
});
onInput("w", () => {
  if (gameRunning) {
    const nextTile = getTile(getFirst(player).x, getFirst(player).y - 1);

    if (!nextTile.some(sprite => sprite.type === wall)) {
      getFirst(player).y -= 1;
    }
  }
});
onInput("a", () => {
  if (gameRunning) {
    const nextTile = getTile(getFirst(player).x - 1, getFirst(player).y);

    if (!nextTile.some(sprite => sprite.type === wall)) {
      getFirst(player).x -= 1;
    }
  }
});

onInput("d", () => {
  if (gameRunning) {
    const nextTile = getTile(getFirst(player).x + 1, getFirst(player).y);

    if (!nextTile.some(sprite => sprite.type === wall)) {
      getFirst(player).x += 1;
    }
  }
});

function spawnObstacle() {

  let x = Math.floor(Math.random() * size_map[level][0]);
  let y = 0;
  addSprite(x, y, obstacle);
}
onInput("j", () => {

  // Stop the game loops
  clearInterval(gameLoop);
  clearInterval(gameLoopButHitChecker);
  clearText();

  // Reset game variables
  gameRunning = true;
  level = 0;
  setMap(levels[level])

  getAll(obstacle).forEach(obstacle => {
    obstacle.remove();
  });
  if (gameOverMusic !== undefined) {
    gameOverMusic.end()
  }
  playback.end()
  playback = playTune(gameMusic, Infinity);
  getFirst(player).x = 1;
  getFirst(player).y = 1;

  restartGameLoops();
});

function restartGameLoops(){
  clearInterval(gameLoop);
  clearInterval(gameLoopButHitChecker);
  clearText();
  gameLoop = setInterval(() => {
    if (gameRunning) {
      despawnObstacles();
      moveObstacles();
      spawnObstacle();

      if (checkHit()) {
        playback.end();
        gameOverMusic = playTune(gameOver, Infinity);
        setMap(endScreen);
        clearInterval(gameLoop);
        gameRunning = false;
        addText("Game Over!", {
          x: 5,
          y: 6,
          color: color`3`
        });
      }
    }
  }, speeds[level]);

  gameLoopButHitChecker = setInterval(() => {
    if (gameRunning) {
      if (checkHit()) {
        playback.end();
        gameOverMusic = playTune(gameOver, Infinity);
        setMap(endScreen);
        clearInterval(gameLoop);
        gameRunning = false;
        addText("Game Over!", {
          x: 5,
          y: 6,
          color: color`3`
        });
      }
    }

  }, 100);
}

function moveObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}

function despawnObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    console.log(obstacles[i].y, (size_map[level][1]-1))
    if (obstacles[i].y == size_map[level][1]-1) {
      obstacles[i].remove();
    }
  }
}


function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }

  return false;
}

var gameLoop = setInterval(() => {
  if (gameRunning) {
    despawnObstacles();
    moveObstacles();
    spawnObstacle();
    if (checkHit()) {
      playback.end();
      gameOverMusic = playTune(gameOver, Infinity);
      setMap(endScreen);
      clearInterval(gameLoop);
      gameRunning = false;
      addText("Game Over!", {
        x: 5,
        y: 6,
        color: color`3`
      });
    }
  }
}, speeds[level]);

var gameLoopButHitChecker = setInterval(() => {
  if (gameRunning) {
    if (checkHit()) {
      playback.end();
      gameOverMusic = playTune(gameOver, Infinity);
      setMap(endScreen);
      clearInterval(gameLoop);
      gameRunning = false;
      addText("Game Over!", {
        x: 5,
        y: 6,
        color: color`3`
      });
    }
  }

}, 100);

afterInput(() => {
  const winner = tilesWith(player, goal).length;
  if (winner > 0) {
    level = level + 1;
    restartGameLoops()

    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      playback.end();
      gameOverMusic = playTune(gameOver, Infinity);
      setMap(endScreen);
      gameRunning = false;
      addText("you win!", { y: 6, color: color`3` });
    }
  }
});
