//jumpgame! an endless runner where your aim to to maxx out your score and avoid hitting obstacles
// use A and D to move left and rigt!


setLegend(
  // this is the player sprite
  ["p", bitmap`
................
................
....LLLLLL......
...L222222L.....
...L2L22L2L.....
....LLLLLL......
....033030......
...0333330......
...0333330......
....03030.......
....0.0.0.......
................
................ 
................
................
................`],




  
  // tree spirte
  ["t", bitmap`
....DDDDD.......
...DDDDDDD......
..DDDDDDDDD.....
..DDDDDDDDD.....
.DDDDDDDDDDD....
.DDDDDDDDDDD....
..DDDDDDDDD.....
....LLLLL.......
....LLLLL.......
....LLLLL.......
....LLLLL.......
....LLLLL.......
....LLLLL.......
....LLLLL.......
....LLLLL.......
................`],
  // rock
  ["r", bitmap`
................
................
...LLLLLLLL.....
..L11111111L....
..L11111111L....
..L11L1111LL....
..L111111111....
..L1111111LL....
...LLLLLLLL.....
................
................
................
................
................
................
................`],

  // grouynd
  ["g", bitmap`
D55555555555555D
D55555555555555D
D55555555555555D
D55555555555555D
D55555555555555D
D55555555555555D
D55555555555555D
D55555555555555D
D55555555555555D
D55555555555555D
D55555555555555D
D55555555555555D
D55555555555555D
D55555555555555D
D55555555555555D
D55555555555555D`]
);






//all rows are 10 chars wide
setMap(map`
gggggggggg
gggggggggg
gggggggggg
gggggggggg
gggggggggg
gggggggggg
gggggggggg
gggggggggg`);


//gamr state
const LANES = [3, 5, 7];

const PLAYER_ROW = 4;


const OBS_START_ROW = 0;
const OBS_END_ROW = 5;

let playerLane = 1;


let obstacles = [];

let score = 0;

let gameOver = false;


let moveTimer = 0;

let spawnTimer = 0;



let scoreTimer = 0;

// placing player spirte
addSprite(LANES[playerLane], PLAYER_ROW, "p");

// the controls 



onInput("a", () => {
  if (gameOver) return;
  
  if (playerLane > 0) {
    playerLane--;
    getFirst("p").x = LANES[playerLane];
  }
});




onInput("d", () => {
  if (gameOver) return;

  
  if (playerLane < 2) {
    playerLane++;
    getFirst("p").x = LANES[playerLane];
  }
});

onInput("j", () => {
  if (gameOver) restartGame();
});

// other helper func

function spawnObstacle() {
  
  const lane = Math.floor(Math.random() * 3);
  const type = Math.random() < 0.5 ? "t" : "r";

  
  addSprite(LANES[lane], OBS_START_ROW, type);
  obstacles.push({ lane, row: OBS_START_ROW, type });


  
}

function moveObstacles() {
  const toRemove = [];

  for (let i = 0; i < obstacles.length; i++) {
    const obs = obstacles[i];

    const sprites = getAll(obs.type);
    for (const s of sprites) {
      if (s.x === LANES[obs.lane] && s.y === obs.row) {
        s.remove();
        break;
      }
    }

    obs.row++;

    if (obs.row > OBS_END_ROW) {
      toRemove.push(i);
    } else {
      addSprite(LANES[obs.lane], obs.row, obs.type);
    }
  }

  for (let i = toRemove.length - 1; i >= 0; i--) {
    obstacles.splice(toRemove[i], 1);
  }
}

function checkCollision() {
  for (const obs of obstacles) {
    if (obs.row === PLAYER_ROW && obs.lane === playerLane) {
      return true;
    }
  }
  return false;
}

function restartGame() {
  for (const obs of obstacles) {
    const sprites = getAll(obs.type);
    for (const s of sprites) {
      if (s.x === LANES[obs.lane] && s.y === obs.row) {
        s.remove();
        break;
      }
    }
  }

  obstacles = [];
  
  score = 0;
  playerLane = 1;
  gameOver = false;
  
  moveTimer = 0;
  spawnTimer = 0;

  
  scoreTimer = 0;

  getFirst("p").x = LANES[playerLane];
  getFirst("p").y = PLAYER_ROW;

  clearText();
  addText("0", { x: 1, y: 0, color: color`2` });
}

//game loop
setInterval(() => {
  if (gameOver) return;

  scoreTimer++;
  if (scoreTimer >= 5) {
    score++;
    scoreTimer = 0;
    addText(`${score}`, { x: 1, y: 0, color: color`2` });
  }

  spawnTimer++;
  const spawnRate = Math.max(8, 20 - Math.floor(score / 5));
  if (spawnTimer >= spawnRate) {
    spawnObstacle();
    spawnTimer = 0;
  }

  moveTimer++;
  if (moveTimer >= 6) {
    moveObstacles();
    moveTimer = 0;
  }

  if (checkCollision()) {
    gameOver = true;
    addText("game over :(\nbetter luck\n next time ", { x: 4, y: 2, color: color`3` });
    addText(`\n\n\nScore: ${score}`, { x: 1, y: 3, color: color`6` });
    addText("\n\n\n\npress j to restart", { x: 1, y: 4, color: color`2` });
  }

}, 100);
