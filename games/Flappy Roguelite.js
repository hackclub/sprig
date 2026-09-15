/*
@title: Flappy Roguelite
@description: 
@author: Solenrae
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/

const player = "p";
const pipeTop = "t";
const pipeBottom = "b";
const pipeMain = "m";
const backgroundPlaying = "g";
const backgroundDead = "d";
const chicken1 = "1";
const chicken2 = "2";

setLegend(
  [chicken1, bitmap`
........00......
.......0330.....
.....003220.....
....00220260....
....0222220.....
.....02220......
......060.......
.......0........
................
................
................
................
................
................
................
................`],
  [chicken2, bitmap`
................
................
................
................
................
................
................
................
........00......
.......0330.....
.....003220.....
....00220260....
....0222220.....
.....02220......
......060.......
.......0........`],
  [pipeTop, bitmap`
0000000000000000
04444444444DDDD0
04444444444DDDD0
04444444444DDDD0
04444444444DDDD0
0000000000000000
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.`],
  [pipeBottom, bitmap`
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
0000000000000000
04444444444DDDD0
04444444444DDDD0
04444444444DDDD0
04444444444DDDD0
0000000000000000`],
  [pipeMain, bitmap`
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.
.044444444DDDD0.`],
  [ backgroundPlaying, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ backgroundDead, bitmap`
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
0000000000000000`]
)

let currentMap = 1
const maps = [
  map`
..........
..........
..........
..........
.1........
..........
..........
..........`,
  map`
..........
..........
..........
..........
..........
..........
..........
..........`
];

let varNames = ["gravity", "jump", "spacing", "speed"];
let maluses = {"gravity": -0.005, "jump": 0.05, "spacing": -5, "speed": -0.5};
let bonuses = {"gravity": 0.01, "jump": -0.1, "spacing": 10, "speed": 1};

let malus = "gravity";
let bonus1 = "gravity";
let bonus2 = "gravity";

setBackground(backgroundDead);
setMap(maps[currentMap]);

let vars = {
  "gravity": 0.115,
  "jump": -1.2,
  "spacing": 30,
  "speed": 3,
  "scoreGain": 1
};

let gameOn = false;
let choosingCard = false;
let score = 0;
let dScore = 0;
let dScoreR = 5;
let frameCount = 0;

let plr = getFirst(chicken1);
let vy = 1;
let y = 4;

let pTypesNames = [chicken1, chicken2]
let pTypes = ["1", "2"];
let pType = 0;

addText("Press W to play!", {y: 7, color: `2`});

onInput("w", () => {
  if (gameOn) {
    vy += vars["jump"];
  } else if (!choosingCard) {
    toggleGameOn();
  };
});

onInput("s", () => {
  if (choosingCard) {
    vars[malus] += maluses[malus];
    vars["scoreGain"] += 1
    toggleGameOn();
  };
});

onInput("d", () => {
  if (choosingCard) {
    vars[bonus1] += bonuses[bonus1];
    toggleGameOn();
  };
});

onInput("a", () => {
  if (choosingCard) {
    vars[bonus2] += bonuses[bonus2];
    toggleGameOn();
  };
});

function toggleGameOn() {
  if (gameOn) {
    setBackground(backgroundDead);
    setMap(maps[1]);
    clearText();
    if (!choosingCard) {
      score = 0;
      vars = {
        "gravity": 0.115,
        "jump": -1.2,
        "spacing": 30,
        "speed": 3,
        "scoreGain": 1
      };
      dScore = 0;
      dScoreR = 5;
      addText("Press W to play!", {y: 7, color: `2`});
      for (let sprite of getAll()) {
        sprite.remove();
      };
    };
  } else {
    if (!choosingCard) {
      for (let sprite of getAll()) {
        sprite.remove();
      };
    };
    choosingCard = false;
    addSprite(1, 4, chicken1);
    setBackground(backgroundPlaying);
    setMap(maps[0]);
    clearText();
    plr = getFirst(chicken1);
  };
  gameOn = !gameOn;
};

function createPipe() {
  let height = Math.floor(Math.random() * 5);
  for (let i = 0; i < height; i++) {
    addSprite(9, i, pipeMain);
  };
  addSprite(9, height, pipeBottom);
  addSprite(9, height + 3, pipeTop);
  for (let i = height + 4; i < 8; i++) {
    addSprite(9, i, pipeMain);
  };
};

function launchCardSelection() {
  choosingCard = true;
  toggleGameOn();
  malus = varNames[Math.floor(Math.random()*4)];
  bonus1 = varNames[Math.floor(Math.random()*4)];
  bonus2 = varNames[Math.floor(Math.random()*4)];
  addText(`Choose an upgrade!`, {y: 3, color: color`2`});
  addText(`(s) +pts, -${malus}`, {y: 7, color: color`2`});
  addText(`(d) +${bonus1}`, {y: 9, color: color`2`});
  addText(`(a) +${bonus2}`, {y: 11, color: color`2`});
};

function gameLoop() {
  if (gameOn) {
    clearText();
    addText(`Score : ${score}`, {x: 5, color: color`0`});
    
    vy = Math.min(vy * 0.7 + vars["gravity"], 1 + vars["gravity"]);
    if ((vy**2 < 0.001) || (y >= 6.76 && vy > 0) || (y <= 0.24 && vy < 0)) {
      vy = 0;
    };
    y += vy;
    if (y >= 7) {
      y = 6.99;
    };
    pType = Math.floor(Math.abs(y%1) * 2);
    plr.remove();
    addSprite(1, Math.ceil(y), pTypesNames[pType]);
    plr = getFirst(pTypesNames[pType]);

    let sprites = getAll();
    let gaveScore = false;
    for (let sprite of sprites) {
      if (sprite != plr) {
        if (frameCount % vars["speed"] === 0) {
          if (sprite.x === 0) {
            sprite.remove();
          } else if (sprite.x === 1 && !gaveScore) {
            gaveScore = !gaveScore;
            score += vars["scoreGain"];
            dScore += vars["scoreGain"];
            if (dScore >= dScoreR) {
              dScore = 0;
              dScoreR += 5;
              launchCardSelection();
            };
          };
          sprite.x -= 1;
        };
      };
    };

    if (getTile(plr.x, plr.y).length > 1) {
      toggleGameOn();
    };

    if (frameCount % vars["spacing"] === 0) {
      createPipe();
    };
  };
  frameCount++;
};

setInterval(gameLoop, 1000/20);