/*
@title: Car Driver
@description: The road never ends. Steer left and right, dodge cars and trucks, and see how fast you can go.
@author: Arjun Pai
@tags: ['driving', 'arcade']
@addedOn: 2026-11-19
*/


const player = "p";
const redCar = "a";
const yellowCar = "b";
const cab = "t";     
const trailer = "u";  
const dash = "d";    
const grass = "g";
const road = "r";

setLegend(
  [ player, bitmap`
................
....00555500....
...0555555550...
...0577777750...
..005777777500..
..005555555500..
...0555555550...
...0555555550...
...0555555550...
..005555555500..
..005777777500..
...0555555550...
...0555555550...
...0355555530...
....00000000....
................`],
  [ cab, bitmap`
.......00.......
..000000000000..
..088888888880..
..088888888880..
..088777777880..
..088777777880..
..088888888880..
..088888888880..
..088888888880..
..088888888880..
..088888888880..
..088888888880..
..066666666660..
..000000000000..
................
................`],
  [ trailer, bitmap`
..000000000000..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..033333333330..
..033333333330..
..033333333330..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..000000000000..
.......00.......`],
  [ redCar, bitmap`
................
....00333300....
...0333333330...
...0333333330...
..003333333300..
..003777777300..
..003777777300..
...0333333330...
...0333333330...
..003333333300..
..003333333300..
...0377777730...
...0333333330...
...0366666630...
....00000000....
................`],
  [ yellowCar, bitmap`
................
....00666600....
...0666666660...
...0666666660...
..006666666600..
..006777777600..
..006777777600..
...0666666660...
...0666666660...
..006666666600..
..006666666600..
...0677777760...
...0666666660...
...0622222260...
....00000000....
................`],
  [ dash, bitmap`
................
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
................`],
  [ grass, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444644444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444244
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ road, bitmap`
1111111111111111
1111111111111111
1111111L11111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111L11111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`]
);

setBackground(road);

const startMap = map`
gg....gg
gg....gg
gg....gg
gg....gg
gg....gg
gg....gg
gg....gg
gg....gg
gg....gg
gg.p..gg`;

setMap(startMap);

const firstLane = 2;
const lastLane = 5;
const bottomRow = 9;
const traffic = [ redCar, yellowCar, cab, trailer ];

let score = 0;
let best = 0;
let crashed = false;
let wavePause = 2;
let openLane = 3;   
let stripeFlip = 0;

function roll(n) {
  return Math.floor(Math.random() * n);
}


function getSpeed() {
  return 1 + score * 0.01;
}


function getDelay() {
  return Math.max(70, Math.round(520 / getSpeed()));
}


function paintRoad() {
  for (const m of getAll(dash)) m.remove();
  for (let y = 0; y < 10; y++) {
    if ((y + stripeFlip) % 2 === 0) {
      for (let x = 2; x <= 6; x++) addSprite(x, y, dash);
    }
  }
  stripeFlip = 1 - stripeFlip;
}

function drawHud() {
  clearText();
  addText("Pts", { x: 0, y: 1, color: color`2` });
  addText("" + score, { x: 0, y: 2, color: color`2` });
  addText("Spd", { x: 12, y: 1, color: color`2` });
  addText("x" + getSpeed().toFixed(1), { x: 12, y: 2, color: color`2` });
  addText("Best", { x: 0, y: 5, color: color`6` });
  addText("" + best, { x: 0, y: 6, color: color`6` });
}


function pickLanes(howMany) {
  openLane = Math.min(lastLane, Math.max(firstLane, openLane + roll(3) - 1));
  const pool = [];
  for (let x = firstLane; x <= lastLane; x++) {
    if (x !== openLane) pool.push(x);
  }
  const chosen = [];
  while (chosen.length < howMany) {
    const i = roll(pool.length);
    chosen.push(pool[i]);
    pool.splice(i, 1);
  }
  return chosen;
}

function spawnWave() {
  let howMany = 1;
  if (Math.random() < 0.25 + score * 0.012) howMany = 2;
  if (score >= 15 && Math.random() < Math.min(0.5, (score - 15) * 0.02)) howMany = 3;
  const truckChance = Math.min(0.4, 0.1 + score * 0.006);

  for (const lane of pickLanes(howMany)) {
    if (Math.random() < truckChance) {
      addSprite(lane, 0, trailer);
      addSprite(lane, 1, cab);
    } else {
      addSprite(lane, 0, roll(2) === 0 ? redCar : yellowCar);
    }
  }
}
function hitSomething() {
  for (const t of traffic) {
    if (tilesWith(player, t).length > 0) return true;
  }
  return false;
}

function crash() {
  crashed = true;
  if (score > best) best = score;
  drawHud();
  addText("CRASH!", { x: 5, y: 8, color: color`3` });
  addText("J: retry", { x: 4, y: 11, color: color`2` });
}

function step() {

  for (const t of traffic) {
    for (const s of getAll(t)) {
      if (s.y >= bottomRow) {
        if (t !== trailer) score += 1;
        s.remove();
      } else {
        s.y += 1;
      }
    }
  }

  wavePause -= 1;
  if (wavePause <= 0) {
    spawnWave();
    wavePause = score < 20 ? 4 : 3;
  }

  paintRoad();
  if (hitSomething()) {
    crash();
  } else {
    drawHud();
  }
}

function loop() {
  if (!crashed) step();
  setTimeout(loop, getDelay());
}


onInput("a", () => {
  if (crashed) return;
  const me = getFirst(player);
  if (me.x > firstLane) {
    me.x -= 1;
    if (hitSomething()) crash();
  }
});

onInput("d", () => {
  if (crashed) return;
  const me = getFirst(player);
  if (me.x < lastLane) {
    me.x += 1;
    if (hitSomething()) crash();
  }
});

onInput("j", () => {
  setMap(startMap);
  score = 0;
  crashed = false;
  wavePause = 2;
  openLane = 3;
  paintRoad();
  drawHud();
});


paintRoad();
drawHud();
loop();
