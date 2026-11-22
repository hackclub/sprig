/*
@title: Pegchinko
@description: Pegchinko! Get the ball into the bucket to increase your score on randomly generated maps.
@author: bananaman
@tags: ['endless', 'retro']
@addedOn: 2026-10-25
*/

// Variables
let wins = 0;
let bucketPos = 0;
let launcherPos = 3;
let ballX = -1;
let ballY = -1;
let tickInterval;
let playback;
let bucketDir = 0; // 0 is right and 1 is left
let tickNum = 0;
let launchReady = false;
let ballVisible = false;
let ballVisibleWaiting = false;
let recentWin = false;

// Sprites
const bucket = "c"; // catcher? because b was taken
const launcher = "l";
const ball = "b";
const peg = "p";
const background = "x";
const bucketWin = "w";

// Sounds
const moveLauncher = tune`
191.0828025477707: G5~191.0828025477707,
5923.566878980892`

const ballLaunch = tune`
500: G4/500,
15500`

const pegHit = tune`
500: C4-500,
15500`

const startup = tune`
119.5219123505976: B4/119.5219123505976,
119.5219123505976: C5/119.5219123505976,
119.5219123505976: D5/119.5219123505976,
119.5219123505976: C5/119.5219123505976,
119.5219123505976: B4/119.5219123505976,
119.5219123505976: A4/119.5219123505976,
119.5219123505976: B4/119.5219123505976,
2988.04780876494`

const bgm1 = tune`
500: A4^500 + F4~500,
500: B4^500 + E4~500,
500: B4^500 + E4~500,
1000,
500: A4^500,
500: B4^500,
500: C5^500 + G4~500,
500: D5^500 + F4~500,
500: E5^500 + E4~500,
500: D5^500 + F4~500,
500: C5^500 + G4~500,
500: B4^500,
500: A4^500,
500: B4^500,
500: B4^500,
1000,
500: A4^500,
500: B4^500,
500: C5^500,
500: B4^500,
500: A4^500,
500: B4^500,
500: B4^500,
1000,
500: B4^500,
500: A4^500,
500: G4^500,
500: A4^500,
500: B4^500`

const bgm2 = tune`
500: C5~500,
500: D5~500,
500: C5~500,
500: D5~500,
500: C5~500 + C4^500,
500: D5~500 + D4^500,
500: E5~500 + E4^500,
500,
500: C4~500,
500: D4~500,
500: C4~500,
500: D4~500,
500: C4~500 + C5^500,
500: D4~500 + D5^500,
500: E4~500 + E5^500,
500,
500: C5~500,
500: D5~500,
500: C5~500,
500: D5~500,
500: D5~500 + D4^500,
500: E5~500 + E4^500,
500: F5~500 + F4^500,
500,
500: G5~500,
500: G5~500,
500: F5~500,
500: F5~500,
500: E5~500 + E4^500,
500: D5~500 + D4^500,
500: C5~500 + C4^500,
500`

const bgm3 = tune`
500: C5^500,
500: C5^500,
500: C4^500,
500: C4^500,
500: C5^500,
500: C5^500,
1000,
500: C5^500,
500: C5^500,
500: D5~500 + C4^500,
500: D5~500 + C4^500,
500: C5^500,
500: C5^500,
1000,
500: C5^500,
500: C5^500,
500: E5~500 + C4^500,
500: F5~500 + C4^500,
500: C5^500,
500: C5^500,
1000,
500: C5^500,
500: C5^500,
500: D5^500,
500: D5^500,
500: C5^500,
500: C5^500,
1000`

const lose = tune`
150.7537688442211: G4^150.7537688442211,
150.7537688442211: F4^150.7537688442211,
150.7537688442211: E4^150.7537688442211,
150.7537688442211: D4^150.7537688442211,
150.7537688442211: C4^150.7537688442211,
4070.3517587939696`

const winner = tune`
340.90909090909093: E4^340.90909090909093,
340.90909090909093: E4^340.90909090909093,
340.90909090909093: F4^340.90909090909093,
340.90909090909093: G4^340.90909090909093,
340.90909090909093: G4^340.90909090909093,
340.90909090909093: F4^340.90909090909093,
340.90909090909093: E4^340.90909090909093,
340.90909090909093: D4^340.90909090909093,
8181.818181818182`;

// Bitmaps
setLegend(
  [background, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [bucket, bitmap`
................
................
................
................
................
................
................
................
................
................
.DDD........DDD.
.DDD........DDD.
.DDD........DDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.`],
  [bucketWin, bitmap`
................
................
................
................
................
................
................
................
................
......1111......
.DDD..1111..DDD.
.DDD..1111..DDD.
.DDD..1111..DDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.`],
  [launcher, bitmap`
................
.00000000000000.
.00000000000000.
.00000000000000.
.0000LLLLLL0000.
.0000L1111L0000.
.0000L1111L0000.
.0000L1111L0000.
.0000L1111L0000.
.0000LLLLLL0000.
.00000000000000.
.00000000000000.
.00000000000000.
..000000000000..
..LLLLLLLLLLLL..
................`],
  [ball, bitmap`
................
................
................
................
................
................
......1111......
......1111......
......1111......
......1111......
................
................
................
................
................
................`],
  [peg, bitmap`
................
................
................
................
................
................
.......55.......
......5555......
......5555......
.......55.......
................
................
................
................
................
................`]
)

const blankMap = map`
.......
.......
.......
.......
.......
.......
.......`

// Pegmap
let pegs = [
  { x: 1, y: 2 },
  { x: 3, y: 2 },
  { x: 5, y: 2 },
  { x: 0, y: 3 },
  { x: 2, y: 3 },
  { x: 4, y: 3 },
  { x: 6, y: 3 },
  { x: 1, y: 4 },
  { x: 3, y: 4 },
  { x: 5, y: 4 },
  { x: 0, y: 5 },
  { x: 2, y: 5 },
  { x: 4, y: 5 },
  { x: 6, y: 5 },
]

// Functions
function generatePegs() {
  pegs = [];

  // At least one peg per column
  for (let i = 0; i < 7; i++) {
    let yPos = Math.floor(Math.random() * 4) + 2;

    let retries = 0;

    while (pegs.some(item => (item.y == yPos && Math.abs(item.x - i) < 2)) && retries < 50) { // Dont let the pegs spawn too close together
      yPos = Math.floor(Math.random() * 4) + 2;
      retries++;
    }

    if (retries < 50) {
      pegs.push({ x: i, y: yPos });
    }
  }

  // Possibility of some extra pegs
  for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
    let xPos = Math.floor(Math.random() * 7);
    let yPos = Math.floor(Math.random() * 4) + 2;

    let retries = 0;

    while (pegs.some(item => (item.y == yPos && Math.abs(item.x - xPos) < 2) || (item.x == xPos && Math.abs(item.y - yPos) < 2)) && retries < 50) { // Dont let the pegs spawn too close together
      xPos = Math.floor(Math.random() * 7);
      yPos = Math.floor(Math.random() * 4) + 2;
      retries++;
    }

    if (retries < 50) {
      pegs.push({ x: xPos, y: yPos });
    }
  }
}

function renderLevel(ballXPos, ballYPos, launcherLoc, bucketLoc) {
  let lvl = "";
  for (let y = 0; y < 7; y++) {
    for (let x = 0; x < 7; x++) {
      if (pegs.some(item => item.x == x && item.y == y)) {
        lvl += "p";
      } else if (y == 6 && x == bucketLoc) {
        if (recentWin || (ballXPos == bucketLoc && ballYPos == 6)) {
          lvl += "w";
        } else {
          lvl += "c";
        }
      } else if (y == 0 && x == launcherLoc) {
        lvl += "l";
      } else if (x == ballXPos && y == ballYPos && ballVisible) {
        lvl += "b";
      } else {
        lvl += ".";
      }
    }
    lvl += "\n"
  }
  return lvl;
}

function randomBGM() {
  let random = Math.floor(Math.random() * 3);
  if (random == 0) {
    return bgm1;
  } else if (random == 1) {
    return bgm2;
  } else {
    return bgm3;
  }
}

// Tick function (main game loop function)
function tick() {
  tickNum++;

  // Move the ball
  if ((ballVisible || ballVisibleWaiting) && tickNum % 5 == 0) {
    if (ballVisibleWaiting) {
      ballVisible = true;
      ballVisibleWaiting = false;
      playTune(ballLaunch);
    } else {
      if (pegs.some(item => item.x == ballX && item.y == ballY + 1)) {
        playTune(pegHit);
        if (Math.floor(Math.random() * 2) == 0 && ballX < 6) {
          ballX++;
        } else if (ballX > 0) {
          ballX--;
        } else {
          ballX++;
        }
      }
      ballY++;
      if (ballY > 6) {
        if (ballX == bucketPos) {
          playback.end();
          playTune(winner);
          recentWin = true;
          wins++;
          setTimeout(() => {
            clearInterval(tickInterval);
            setMap(map`
              .......
              .......
              .......
              .......
              .......
              .......
              .......`);
            addText(`Score: ${wins}`, {
              x: 5,
              y: 7,
              color: color`C`
            });
            setTimeout(() => {
              recentWin = false;
              generatePegs();
              launchReady = true;
              clearText();
              tickInterval = setInterval(tick, 100);
              playback = playTune(randomBGM(), Infinity);
            }, 1000);
          }, 2500);
        } else {
          playTune(lose);
          launchReady = true;
        }
        ballVisible = false;
        ballY = -1;
        ballX = -1;
      }
    }
  }

  // Move the bucket
  if (tickNum % 5 == 0) {
    if (bucketDir == 0) {
      if (bucketPos > 5) {
        bucketDir = 1;
        bucketPos--
      } else {
        bucketPos++
      }
    } else if (bucketDir == 1) {
      if (bucketPos < 1) {
        bucketDir = 0;
        bucketPos++
      } else {
        bucketPos--
      }
    }
  }

  // Generate the level
  setMap(renderLevel(ballX, ballY, launcherPos, bucketPos));
}

// Input handlers
onInput("a", () => {
  if (launcherPos > 0) {
    launcherPos--
    playTune(moveLauncher);
  }
})

onInput("d", () => {
  if (launcherPos < 6) {
    launcherPos++
    playTune(moveLauncher);
  }
})

onInput("s", () => {
  if (launchReady) {
    ballX = launcherPos;
    ballY = 1;
    ballVisibleWaiting = true;
    launchReady = false;
  }
})

// Startup
setMap(blankMap);
setBackground(background);

playTune(startup);

addText("Pegchinko!", {
  x: 5,
  y: 7,
  color: color`7`
});

setTimeout(() => {

  clearText()

  addText("Controls:", {
    x: 5,
    y: 5,
    color: color`5`
  });

  addText("A + D: Move", {
    x: 5,
    y: 7,
    color: color`5`
  });

  addText("S: Drop Ball", {
    x: 5,
    y: 9,
    color: color`5`
  });

  setTimeout(() => {
    clearText();
    launchReady = true;
    playback = playTune(randomBGM(), Infinity);
    tickInterval = setInterval(tick, 100);
  }, 2500);
}, 1500);