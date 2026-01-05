/*
@title: yummy cach snorelax
@author: Ezekiel Gomez
@tags: ['rhythm']
@addedOn: 2025-01-04
*/

const noteW = "w";
const noteA = "a";
const noteS = "s";
const noteD = "d";
const hitZone = "h";
const background = "b";
const keyW = "1";
const keyA = "2";
const keyS = "3";
const keyD = "4";
const keyWPressed = "5";
const keyAPressed = "6";
const keySPressed = "7";
const keyDPressed = "8";
const player = "p";

setLegend(
  [noteW, bitmap`
5555555555555555
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5555555555555555`],
  [noteA, bitmap`
4444444444444444
4777777777777774
4777777777777774
4777777777777774
4777777777777774
4777777777777774
4777777777777774
4777777777777774
4777777777777774
4777777777777774
4777777777777774
4777777777777774
4777777777777774
4777777777777774
4777777777777774
4444444444444444`],
  [noteS, bitmap`
6666666666666666
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6666666666666666`],
  [noteD, bitmap`
8888888888888888
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8777777777777778
8888888888888888`],
  [hitZone, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0000000000000000
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
................`],
  [background, bitmap`
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
1111111111111111`],
  [player, bitmap`
................
.....000000.....
....00000000....
....02222200....
....02222200....
....00000000....
.....000000.....
....00000000....
...0000000000...
..000000000000..
..00.000000.00..
.....000000.....
.....00..00.....
.....00..00.....
....000..000....
....000..000....`],
  [keyW, bitmap`
................
.55555..55555...
.55555..55555...
.55.55..55.55...
.55.55..55.55...
.55.55..55.55...
.5555....5555...
................
................
................
................
................
................
................
................
................`],
  [keyA, bitmap`
................
..44444.........
..44..44........
..44..44........
..444444........
..44..44........
..44..44........
................
................
................
................
................
................
................
................
................`],
  [keyS, bitmap`
................
..66666.........
.66...66........
.66.............
..66666.........
.....666........
.66...66........
..66666.........
................
................
................
................
................
................
................
................`],
  [keyD, bitmap`
................
.88888..........
.88..88.........
.88..88.........
.88..88.........
.88..88.........
.88888..........
................
................
................
................
................
................
................
................
................`],
  [keyWPressed, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [keyAPressed, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [keySPressed, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [keyDPressed, bitmap`
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`]
);

setSolids([]);

let level = 0;
const levels = [
  map`
bbbbwwwwaaaassssddddbbbb
bbbbwwwwaaaassssddddbbbb
bbbbwwwwaaaassssddddbbbb
bbbbwwwwaaaassssddddbbbb
bbbbwwwwaaaassssddddbbbb
bbbbwwwwaaaassssddddbbbb
bbbbwwwwaaaassssddddbbbb
bbbbwwwwaaaassssddddbbbb
hhhhhhhhhhhhhhhhhhhhhhhh
bbbbbbbbbbbbbbbbbbbbbbbb
bbbb1111222233334444bbbb
bbbb1111222233334444bbbb
bbbb1111222233334444bbbb`
];

setMap(levels[level]);

let score = 0;
let combo = 0;
let gameActive = true;
let gameTime = 0;
const gameDuration = 60000;

const notePattern = [
  {frame: 30, lane: 0}, {frame: 60, lane: 1}, {frame: 90, lane: 2}, {frame: 120, lane: 3},
  {frame: 150, lane: 0}, {frame: 180, lane: 2}, {frame: 210, lane: 1}, {frame: 240, lane: 3},
  {frame: 270, lane: 0}, {frame: 270, lane: 2}, {frame: 300, lane: 1}, {frame: 300, lane: 3},
  {frame: 330, lane: 0}, {frame: 360, lane: 1}, {frame: 390, lane: 2}, {frame: 420, lane: 3},
  {frame: 450, lane: 0}, {frame: 450, lane: 1}, {frame: 480, lane: 2}, {frame: 480, lane: 3},
  {frame: 510, lane: 1}, {frame: 540, lane: 2}, {frame: 570, lane: 0}, {frame: 600, lane: 3},
  {frame: 630, lane: 0}, {frame: 660, lane: 1}, {frame: 690, lane: 2}, {frame: 720, lane: 3},
  {frame: 750, lane: 1}, {frame: 780, lane: 2}, {frame: 810, lane: 0}, {frame: 840, lane: 3},
  {frame: 870, lane: 0}, {frame: 870, lane: 1}, {frame: 900, lane: 2}, {frame: 900, lane: 3},
  {frame: 930, lane: 0}, {frame: 960, lane: 1}, {frame: 990, lane: 2}, {frame: 1020, lane: 3},
  {frame: 1050, lane: 0}, {frame: 1050, lane: 2}, {frame: 1080, lane: 1}, {frame: 1080, lane: 3},
  {frame: 1110, lane: 0}, {frame: 1140, lane: 1}, {frame: 1170, lane: 2}, {frame: 1200, lane: 3},
  {frame: 1230, lane: 0}, {frame: 1230, lane: 1}, {frame: 1230, lane: 2}, {frame: 1230, lane: 3}
];

let currentFrame = 0;

const noteTypes = [noteW, noteA, noteS, noteD];
const laneX = [4, 8, 12, 16];

function spawnNote(lane) {
  const noteType = noteTypes[lane];
  const startX = laneX[lane];
  // Spawn 4 blocks to fill the whole lane
  for (let i = 0; i < 4; i++) {
    addSprite(startX + i, 0, noteType);
  }
}

function moveNotes() {
  const allSprites = getAll(noteW).concat(getAll(noteA), getAll(noteS), getAll(noteD));
  
  for (let sprite of allSprites) {
    sprite.y += 1;
    
    if (sprite.y > 9) {
      sprite.remove();
      combo = 0;
      addText("MISS!", {x: 9, y: 5, color: color`3`});
      setTimeout(() => clearText(), 300);
    }
  }
}

function showKeyPress(lane) {
  const keySprites = [keyW, keyA, keyS, keyD];
  const pressedSprites = [keyWPressed, keyAPressed, keySPressed, keyDPressed];
  const x = laneX[lane];
  
  const keys = getAll(keySprites[lane]);
  for (let key of keys) {
    if (key.x === x) {
      key.remove();
      addSprite(x, 9, pressedSprites[lane]);
      
      setTimeout(() => {
        const pressed = getAll(pressedSprites[lane]);
        for (let p of pressed) {
          if (p.x === x) {
            p.remove();
            addSprite(x, 9, keySprites[lane]);
          }
        }
      }, 150);
    }
  }
}

function checkHit(lane) {
  const noteType = noteTypes[lane];
  const startX = laneX[lane];
  const notes = getAll(noteType);
  
  showKeyPress(lane);
  
  let hitNote = false;
  for (let note of notes) {
    if (note.x >= startX && note.x < startX + 4 && note.y >= 7 && note.y <= 9) {
      hitNote = true;
    }
  }
  
  if (hitNote) {
    // Remove all notes in this lane at the hit zone
    for (let note of notes) {
      if (note.x >= startX && note.x < startX + 4 && note.y >= 7 && note.y <= 9) {
        note.remove();
      }
    }
    
    let points = 100;
    let message = "PERFECT!";
    let msgColor = color`4`;
    
    score += points;
    combo += 1;
    
    playTune(tune`
60: C5-60,
1860`);
    
    clearText();
    addText(`${message}`, {x: 8, y: 5, color: msgColor});
    addText(`Score: ${score}`, {x: 1, y: 1, color: color`2`});
    addText(`Combo: ${combo}`, {x: 1, y: 2, color: color`2`});
    
    setTimeout(() => {
      clearText();
      addText(`Score: ${score}`, {x: 1, y: 1, color: color`2`});
      addText(`Combo: ${combo}`, {x: 1, y: 2, color: color`2`});
    }, 300);
    
    return;
  }
  
  combo = 0;
  addText("MISS!", {x: 9, y: 5, color: color`3`});
  setTimeout(() => {
    clearText();
    addText(`Score: ${score}`, {x: 1, y: 1, color: color`2`});
    addText(`Combo: ${combo}`, {x: 1, y: 2, color: color`2`});
  }, 300);
}

onInput("w", () => {
  if (gameActive) checkHit(0);
});

onInput("a", () => {
  if (gameActive) checkHit(1);
});

onInput("s", () => {
  if (gameActive) checkHit(2);
});

onInput("d", () => {
  if (gameActive) checkHit(3);
});

addText("Score: 0", {x: 1, y: 1, color: color`2`});
addText("Combo: 0", {x: 1, y: 2, color: color`2`});
addText("Get Ready!", {x: 7, y: 4, color: color`4`});

// Play Happy Birthday song
const happyBirthday = tune`
300: C4^300,
300: C4^300,
300: D4^300,
600: C4^600,
600: F4^600,
1200: E4^1200,
300: C4^300,
300: C4^300,
300: D4^300,
600: C4^600,
600: G4^600,
1200: F4^1200,
300: C4^300,
300: C4^300,
600: C5^600,
600: A4^600,
600: F4^600,
600: E4^600,
600: D4^600,
300: A4^300,
300: A4^300,
600: A4^600,
600: F4^600,
600: G4^600,
1200: F4^1200`;

playTune(happyBirthday);

setTimeout(() => {
  clearText();
  addText(`Score: ${score}`, {x: 1, y: 1, color: color`2`});
  addText(`Combo: ${combo}`, {x: 1, y: 2, color: color`2`});
}, 2000);

const gameInterval = setInterval(() => {
  if (!gameActive) return;
  
  currentFrame++;
  gameTime += 50;
  
  for (let pattern of notePattern) {
    if (pattern.frame === currentFrame) {
      spawnNote(pattern.lane);
    }
  }
  
  moveNotes();
  
  if (gameTime >= gameDuration) {
    gameActive = false;
    clearInterval(gameInterval);
    clearText();
    addText("GAME OVER!", {x: 6, y: 4, color: color`4`});
    addText(`Final Score:`, {x: 5, y: 5, color: color`2`});
    addText(`${score}`, {x: 9, y: 6, color: color`3`});
  }
}, 50);