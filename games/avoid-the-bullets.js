/*
@title: Nonemade by j4mik
@author: None
@description: None
@tags: []
@addedOn: 2025-04-17
*/
const tileA = "a";
const tileB = "b";
const tileC = "c";
const tileD = "d";
const tileE = "e";
const tileF = "f";
const tileG = "g";
const tileH = "h";
const tileI = "i";
const tileJ = "j";
const tileK = "k";
const tileL = "l";
const tileM = "m";
const tileN = "n";
const tileO = "o";
const tileP = "p";
const tileQ = "q";
const tileR = "r";
const tileS = "s";
const tileT = "t";
const hit = tune`
81.74386920980926,
81.74386920980926: G4~81.74386920980926 + F4~81.74386920980926,
81.74386920980926,
81.74386920980926: G4~81.74386920980926,
81.74386920980926: G4~81.74386920980926,
81.74386920980926: F4~81.74386920980926 + D4~81.74386920980926,
81.74386920980926,
81.74386920980926: A4~81.74386920980926 + F4~81.74386920980926,
1961.8528610354224`;
const startTune = tune`
81.74386920980926,
81.74386920980926: G4~81.74386920980926 + A4~81.74386920980926,
81.74386920980926,
81.74386920980926: G4~81.74386920980926,
81.74386920980926: G4~81.74386920980926,
81.74386920980926: A4~81.74386920980926 + C5~81.74386920980926,
2125.340599455041`;
let bomb = [[Math.floor(Math.random() * 78), 0]];
if (bomb[0][0] == 39) bomb[0][0] = 79;
let bullet = [-1, 56, 0]
let bulletRun = false;
let smoke = [];
let levelBack = [`3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`,
                 `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, 
                 `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`,
                 `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`, `3`] // background
let player = [39, 56] // player position
let playerVectY = 0;
let jump = false;
let temp = ``;
let counter = 0; // counts frames
let alive = true;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function pos(playerX, playerY, array) {
  for (let i = 0; i < array.length; i++) {
    if (playerX == array[i][0] && playerY == array[i][1]) return(true);
  }
  return(false);
}

function restart() {
  bomb = [[Math.floor(Math.random() * 79), 0]];
  player = [39, 56]
  start();
}

async function start() {
  for (let i = 0; i < levelBack.length; i++) {
    levelBack[64 - i] = `.`
    await sleep(10);
  }
}

async function end() {
  for (let i = 0; i < levelBack.length; i++) {
    levelBack[i] = `3`
    await sleep(15);
  }
}

async function bullets() {
  bulletRun = true;
  if (Math.round(Math.random())) {
    bullet[0] = 0;
    bullet[2] = 1;
  }
  else {
    bullet[0] = 79;
    bullet[2] = -1;
  }
  for (let i = 0; i < 80; i++) {
    bullet[0] += bullet[2]
    if (!alive) {
      bullet[0] = 80;
      bulletRun = false;
      return(0);
    }
    await sleep(20);
  }
  bulletRun = false;
}

function setTemp(posX, posY) {
  temp = ``
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      if ((posX + j == player[0] && (posY + i == player[1] || posY + i == player[1] + 1)) && alive) {
        temp += `0`
      } 
      else if (pos(posX + j, posY + i, bomb)) {
        temp += `3`
      } 
      else if (pos(posX + j, posY + i, smoke)){
        temp += `1`;
      }
      else if (bullet[0] == posX + j && bullet[1] == posY + i) {
        temp += `L`
      }
      else {
        temp += levelBack[i + posY];
      }
    }
    temp += `
    `;
  }
  return temp;
}

function legend() {
  setLegend([tileA, setTemp(0, 0)],
    [tileB, setTemp(16, 0)],
    [tileC, setTemp(32, 0)],
    [tileD, setTemp(48, 0)],
    [tileE, setTemp(64, 0)],
    [tileF, setTemp(0, 16)],
    [tileG, setTemp(16, 16)],
    [tileH, setTemp(32, 16)],
    [tileI, setTemp(48, 16)],
    [tileJ, setTemp(64, 16)],
    [tileK, setTemp(0, 32)],
    [tileL, setTemp(16, 32)],
    [tileM, setTemp(32, 32)],
    [tileN, setTemp(48, 32)],
    [tileO, setTemp(64, 32)],
    [tileP, setTemp(0, 48)],
    [tileQ, setTemp(16, 48)],
    [tileR, setTemp(32, 48)],
    [tileS, setTemp(48, 48)],
    [tileT, setTemp(64, 48)]);
}

async function smokeFizz() {
  if (!counter) {
    smoke = [[player[0] - 1, player[1]], [player[0] + 1, player[1]], [player[0], player[1] - 1], [player[0], player[1] + 1], player];
    legend();
    await sleep(80);
    smoke = smoke.concat([[player[0] - 1, player[1] - 1], [player[0] + 1, player[1] + 1], [player[0] + 1, player[1] - 1], [player[0] - 1, player[1] + 1]]);
    legend();
    await sleep(80);
    smoke = smoke.concat([[player[0] -2, player[1]], [player[0] + 2, player[1]], [player[0], player[1] - 2], [player[0], player[1] + 2]]);
    legend();
    await sleep(80);
    smoke = smoke.concat([[player[0] - 2, player[1] + 1], [player[0] - 2, player[1] - 1], [player[0] + 2, player[1] + 1], [player[0] + 2, player[1] - 1],
    [player[0] - 1, player[1] + 2], [player[0] - 1, player[1] - 2], [player[0] + 1, player[1] + 2], [player[0] + 1, player[1] - 2]]);
    legend();
    await sleep(80);
    smoke = smoke.concat([[player[0] - 2, player[1] + 1], [player[0] - 2, player[1] - 1], [player[0] + 2, player[1] + 1], [player[0] + 2, player[1] - 1],
    [player[0] - 1, player[1] + 2], [player[0] - 1, player[1] - 2], [player[0] + 1, player[1] + 2], [player[0] + 1, player[1] - 2]]);
    await sleep(50);
    legend();
    while (smoke.length != 0) {
      smoke = smoke.filter(n => Math.floor(Math.random() * smoke.length));
      legend();
      await sleep(Math.floor(Math.random() * 20 + 10));
    }
  }
}

var gameLoop = setInterval(() => {
  legend();
  if (!counter) {
    start();
  }

  setMap(level[0]);
  for (let i = 0; i < bomb.length; i++) {
    bomb[i][1]++;
    if (bomb[i][1] > 64) {
      bomb[i][1] = 0;
      bomb[i][0] = Math.floor(Math.random() * 80);

    }
  }
  if (alive) {
    clearText();
    addText("score: " + Math.floor(counter / 50), { y: 1, color: color`3` });
  }

  for (let i = 0; i < bomb.length; i++) {
    if (pos(player[0], player[1], bomb) || 
        pos(player[0], player[1] + 1, bomb) ||
        player[0] == bullet[0] && 
        (player[1] == bullet[1] || player[1] + 1 == bullet[1])) {
      addText("you lost!", { y: 1, color: color`.` });
      addText("score: " + Math.floor(counter / 50), { y: 3, color: color`.` });
      addText("press 's' to restart", { y: 5, color: color`.` });
      playTune(hit);
      counter = 0;
      alive = false;
      bomb = [];
      end();
    }
  }

  if (!alive) {
    if (counter == 0) {
      smokeFizz();
    }
    else if (counter == 150) {
    }
  }

  counter++;
  
  if (alive) {
    playerVectY += 0.5;
    player[1] += Math.floor(playerVectY);
  }
  jump = false;
  if (player[1] >= 56 && alive) {
    playerVectY = 0;
    player[1] = 56
    jump = true;
  }
  if (counter % 150 == 100 && alive) {
    bomb = bomb.concat([[Math.floor(Math.random() * 80), 0]]);
  }
  if (alive && !bulletRun && 1 == Math.floor(Math.random() * 150)) bullets();
}, 15);

playTune(startTune);

legend();

const level = [
  map`
abcde
fghij
klmno
pqrst`
]

setMap(level[0])


onInput("a", () => {
  if (alive && player[0] > 0){
    player[0] -= 1;
  }
});
onInput("d", () => {
  if (alive && player[0] < 79) {
    player[0] += 1;
  }
});
onInput("j", () => {
  if (alive && player[0] > 0) {
    player[0] -= 1;
  }
});
onInput("l", () => {
  if (alive && player[0] < 79) {
    player[0] += 1;
  }
});
onInput("w", () => {
  if (jump) {
    playerVectY = -5;
  }
});
onInput("i", () => {
  if (jump) {
    playerVectY = -5;
  }
});
onInput("k", () => {
  if (!alive) {
    alive = true;
    restart();
    counter = 0;
    playTune(startTune);
  }
});
onInput("s", () => {
  if (!alive) {
    alive = true;
    restart();
    counter = 0;
    playTune(startTune);
  }
});
