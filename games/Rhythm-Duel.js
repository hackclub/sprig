/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Rhythm Duel
@description: A 2-player head-to-head rhythm duel. Hit the falling notes on the beat using AWD (Player 1) and JIL (Player 2). Don't miss a beat!
@author: AV Mishra
@tags: ['rhthym', 'multiplayer','two-player','music']
@addedOn: 2026-04-21
*/

const up = "u";
const down = "d";
const left = "l";
const right = "r";
const note = "n";
const target = "t";
setLegend(
  [ up, bitmap`
................
.......00.......
......0000......
.....000000.....
....00000000....
...0000000000...
..000000000000..
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
................
................`],
  [ down, bitmap`
................
................
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
..000000000000..
...0000000000...
....00000000....
.....000000.....
......0000......
.......00.......
................`],
  [ left, bitmap`
................
................
.........0......
.........00.....
.........000....
.........0000...
..000000000000..
..0000000000000.
..0000000000000.
..000000000000..
.........0000...
.........000....
.........00.....
.........0......
................
................`],
  [ right, bitmap`
................
................
......0.........
.....00.........
....000.........
...0000.........
..000000000000..
.0000000000000..
.0000000000000..
..000000000000..
...0000.........
....000.........
.....00.........
......0.........
................
................`],
  [ note, bitmap`
................
................
....7777777777..
....7777777777..
....77......77..
....77......77..
....77......77..
....77......77..
....77......77..
....77......77..
....77......77..
....77......77..
..7777....7777..
..7777....7777..
..7777....7777..
................`],
  [ target, bitmap`
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
3333333333333333
3333333333333333
3333333333333333
3333333333333333`]
)

setSolids([])

let level = 1
let gameState = "title";
// level 0 = blank
const levels = [
  map`
.......tt.......
.......tt.......
.......tt.......
.......tt.......
.......tt.......
.......tt.......
.......tt.......
tttttttttttttttt
.r.u.l.tt.r.u.l.
.......tt.......`,
  map`
................
................
................
................
................
................
................
................
................
................`
]

let p1Score = 0;
let p2Score = 0;

function updateScoreboard() {
  clearText();
  addText(`${p1Score} - ${p2Score}`, { y: 0, x: 7, color: color`9` });
}

updateScoreboard()
// 0 = empty, 1 = left, 2 = up, 3 = right
const baseData = [
  // Measure 1
  [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], 
  // Measure 2
  [1, 0, 1], [0, 0, 0], [0, 1, 0], [1, 0, 0], 
  // Measure 3
  [1, 1, 0], [0, 0, 1], [0, 1, 0], [1, 0, 0], 
  // Measure 4
  [1, 1, 0], [0, 0, 0], [0, 0, 0], [1, 0, 0], 
  // Measure 5
  [1, 0, 1], [0, 0, 0], [0, 1, 1], [0, 1, 0], 
  // Measure 6
  [1, 0, 1], [1, 0, 1], [0, 1, 0], [0, 1, 1], 
  // Measure 7
  [1, 1, 0], [0, 0, 0], [0, 0, 1], [1, 0, 0], 
  // Measure 8
  [1, 0, 1], [0, 1, 0], [1, 0, 1], [1, 1, 1]  
];

const levelData = Array(6).fill(baseData).flat();
const musicData =tune`
352.94117647058823: F4^352.94117647058823 + C5^352.94117647058823,
352.94117647058823: F4^352.94117647058823 + C5^352.94117647058823,
352.94117647058823: F4^352.94117647058823 + C5^352.94117647058823,
352.94117647058823: F4^352.94117647058823 + C5^352.94117647058823,
352.94117647058823: F4^352.94117647058823 + B4^352.94117647058823,
352.94117647058823: F4^352.94117647058823 + B4^352.94117647058823,
352.94117647058823: F4^352.94117647058823 + B4^352.94117647058823,
352.94117647058823: F4^352.94117647058823 + B4^352.94117647058823,
352.94117647058823: E4^352.94117647058823 + G4^352.94117647058823,
352.94117647058823: E4^352.94117647058823 + G4^352.94117647058823,
352.94117647058823: E4^352.94117647058823 + G4^352.94117647058823,
352.94117647058823: E4^352.94117647058823 + G4^352.94117647058823,
352.94117647058823: E4^352.94117647058823 + A4^352.94117647058823,
352.94117647058823: E4^352.94117647058823 + A4^352.94117647058823,
352.94117647058823: E4^352.94117647058823 + A4^352.94117647058823,
352.94117647058823: E4^352.94117647058823 + A4^352.94117647058823,
352.94117647058823: C5^352.94117647058823 + F4^352.94117647058823,
352.94117647058823: C5^352.94117647058823 + F4^352.94117647058823,
352.94117647058823: C5^352.94117647058823 + F4^352.94117647058823,
352.94117647058823: C5^352.94117647058823 + F4^352.94117647058823,
352.94117647058823: B4^352.94117647058823 + F4^352.94117647058823,
352.94117647058823: B4^352.94117647058823 + F4^352.94117647058823,
352.94117647058823: B4^352.94117647058823 + F4^352.94117647058823,
352.94117647058823: B4^352.94117647058823 + F4^352.94117647058823,
352.94117647058823: G4^352.94117647058823 + E4^352.94117647058823,
352.94117647058823: G4^352.94117647058823 + E4^352.94117647058823,
352.94117647058823: G4^352.94117647058823 + E4^352.94117647058823,
352.94117647058823: G4^352.94117647058823 + E4^352.94117647058823,
352.94117647058823: A4^352.94117647058823 + E4^352.94117647058823,
352.94117647058823: A4^352.94117647058823 + E4^352.94117647058823,
352.94117647058823: A4^352.94117647058823 + E4^352.94117647058823,
352.94117647058823: A4^352.94117647058823 + E4^352.94117647058823`

let currentStep = 0;

setMap(levels[level])

const TICK_SPEED = 631.5/2; // milliseconds between beats

function attemptHit(xPos, player) {
  const targets = getTile(xPos, 7); 
  
  const hitNote = targets.find(s => s.type === note);

  if (hitNote) {
    hitNote.remove();    
    if (player === 1) {
      p1Score += 10;
    } else {
      p2Score += 10;
    }
  }
  else{
    if (player === 1) {
      p1Score -= 5;
    } else {
      p2Score -= 5;
    }
  }
  updateScoreboard()

}

onInput("w", () => {
  if (gameState === "title") startGame();
  else if (gameState === "instructions") showTitle();
  else if (gameState === "playing") attemptHit(3, 1);
});

onInput("i", () => {
  if (gameState === "title") showInstructions();
  else if (gameState === "playing") attemptHit(12, 2);
});

onInput("a", () => { if (gameState === "playing") attemptHit(1, 1); });
onInput("d", () => { if (gameState === "playing") attemptHit(5, 1); });
onInput("j", () => { if (gameState === "playing") attemptHit(10, 2); });
onInput("l", () => { if (gameState === "playing") attemptHit(14, 2); });

function showTitle() {
  gameState = "title";
  setMap(levels[1]);
  clearText();
  addText("RHYTHM DUEL", { y: 3, x: 4, color: color`3` });
  addText("Press W to Start", { y: 6, x: 0, color: color`9` });
  addText("Press I for Info", { y: 8, x: 0, color: color`5` });
}

function showInstructions() {
  gameState = "instructions";
  setMap(levels[1]);
  clearText();
  addText("P1: A, W, D", { y: 2, x: 4, color: color`9` });
  addText("P2: J, I, L", { y: 4, x: 4, color: color`9` });
  addText("Hit notes at bottom!", { y: 6, x: 0, color: color`5` });
  addText("Press W to Return", { y: 8, x: 0, color: color`3` });
}

function startGame() {
  gameState = "playing";
  setMap(levels[0]);
  updateScoreboard();

  setTimeout(() => {
    playTune(musicData, 6);
  }, TICK_SPEED * 7);

  setInterval(() => {
    const allNotes = getAll(note);
    allNotes.forEach(n => {
      n.y += 1;
      if (n.y >= 8) {
        n.remove();
      }
    });

    if (currentStep < levelData.length) {
      const row = levelData[currentStep];
      if (row[0] === 1) { addSprite(1, 0, note); addSprite(10, 0, note); }
      if (row[1] === 1) { addSprite(3, 0, note); addSprite(12, 0, note); }
      if (row[2] === 1) { addSprite(5, 0, note); addSprite(14, 0, note); }
      currentStep++;
    }
    else if (allNotes.length === 0) {
      endLevel(); 
    }
  }, TICK_SPEED);
}

function endLevel() {
    gameState = "end";
    setMap(levels[1]);

    addText("GAME OVER!", { y: 3, x: 3, color: color`5` });

    addText("Thanks for playing!", { y: 8, x: 0, color: color`9` });
    
    p1Score = 0;
    p2Score = 0;
}

showTitle()