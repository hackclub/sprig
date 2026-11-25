/*
@title: The Shifting Labyrinth
@description: Trapped in a collapsing grid, a lone traveler must leap through 10 dimensional portals before time runs out.
@author: Shafal L.
@tags: ['Reachyourgoal', 'WASD', 'Lore']
@addedOn: 2026-11-20
*/

const myTune = tune`
129.31034482758622: C4~129.31034482758622,
4008.620689655173`
const player = "p"
const place = "a"
const wall = "w"
const portal = "d"
const goal = "g"
const melody = tune`
122.44897959183673: D5~122.44897959183673 + D4-122.44897959183673 + G4/122.44897959183673,
122.44897959183673,
122.44897959183673: D5~122.44897959183673,
122.44897959183673: C5~122.44897959183673,
122.44897959183673: B4~122.44897959183673 + G4/122.44897959183673,
122.44897959183673: C5~122.44897959183673,
122.44897959183673: B4~122.44897959183673,
122.44897959183673: A4~122.44897959183673,
122.44897959183673: G4~122.44897959183673 + G5^122.44897959183673,
122.44897959183673,
122.44897959183673: G4~122.44897959183673,
122.44897959183673: A4~122.44897959183673,
122.44897959183673: G4~122.44897959183673,
122.44897959183673: F4~122.44897959183673,
122.44897959183673: E4~122.44897959183673,
122.44897959183673: F4~122.44897959183673,
122.44897959183673: D5~122.44897959183673 + D4-122.44897959183673 + G4/122.44897959183673,
122.44897959183673,
122.44897959183673: D5~122.44897959183673,
122.44897959183673: C5~122.44897959183673,
122.44897959183673: B4~122.44897959183673 + G4/122.44897959183673,
122.44897959183673: A4~122.44897959183673,
122.44897959183673: G4~122.44897959183673,
122.44897959183673: A4~122.44897959183673,
122.44897959183673: G4~122.44897959183673 + F5^122.44897959183673,
122.44897959183673,
122.44897959183673: G4~122.44897959183673,
122.44897959183673: F4~122.44897959183673,
122.44897959183673: E4~122.44897959183673,
122.44897959183673: D4~122.44897959183673,
122.44897959183673: C4~122.44897959183673,
122.44897959183673`

setLegend(
  [ player, bitmap`
................
................
.....00000......
.....02220......
.....00200......
.....02220......
......000.......
.......0........
.....00000......
....0..0..0.....
...0...0...0....
......0.0.......
.....0...0......
.....0...0......
.....0...0......
................` ],
  [ place, bitmap`
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
4444444444444444` ],
  [ wall, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC` ],
  [ portal, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999` ],
  [ goal, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999` ]
)

setSolids([ player, wall ])
setBackground(place)

const levels = [
  map`
pw.....
.w.www.
.w...w.
.w...w.
.www.w.
.....wd`,
  map`
..w...wd
....w.w.
.ww.w.w.
.w..w.w.
.w..w...
.wwwwwww
.......p`,
  map`
...wwdwp
.w....w.
.wwwwww.
.w....w.
.w.ww.w.
.w..w.w.
.ww.w.w.
....w...`,
  map`
p........
wwwwwwww.
.........
.wwwwwwww
.........
wwwww....
......ww.
......w.d`,
  map`
...w...w.d
.w.w.w.w..
.w.w.w.w..
.w.w.w.w..
.w.w.w.w..
.w.w.w.w..
.w.w.w.w..
.w.w.w.w..
pw...w....`,
  map`
p.....w..wd
wwwww.w..w.
....w.ww.w.
.wwww.ww.w.
.w....ww.w.
.w....ww.w.
.w.......w.
.w..wwwwww.
.w.........`,
  map`
d.....w.....
wwww..w.....
...w.wwww...
...w.w..w...
...w.w..w...
ww.w.....www
.w...www...p
.w..w....www
.w..w...w...
.wwww.www...
............`,
  map`
.w...........
.w.w....wwww.
...w....w..w.
.wwww.www..w.
.w..w.w...ww.
.w..wpw...w..
.w..www.www..
.w......w...w
.ww.wwwww.www
..w.w.....w..
..w.wwwwwww..
............d`,
  map`
............wp
..wwwwwwwww.w.
..w.....w.w.w.
..ww.w..w...w.
..w..w....www.
..w.wwww..w...
..w..wdw..ww..
..w.ww.wwwww..
..w........w..
..wwwwwwwwww..
....w.........
.wwwwwwwwwwww.
..............`,
  map`
wwwwwwwwwwwwwww
w.............w
w.wwwww...ww..w
w..w..wwww..w.w
w.w.w....w..w.w
w.w.w....w..w.w
w.w.w.wwww..w.w
w.w.w.wp....w.w
w.w.w.wwwww.w.w
w.w.w.......w.w
w.w.w.......w.w
w.w..wwwwww.w.w
w.w.........w.w
w...........w.w
wwwwwwwwwwwww.g`
]

const levelLore = [
  "1: Lost in the Grid",
  "2: The Walls Shift",
  "3: Echoes of Home",
  "4: Deeper Inside",
  "5: Twin Corridors",
  "6: No Turning Back",
  "7: The Maze Sees",
  "8: Heart Of Core",
  "9: Reality Fades...",
  "10: I See The Exit!"
]

let currentLevel = 0
let hasWon = false
let gameOver = false
let inIntro = true
let playback = null
let timeLeft = 120

setMap(levels[currentLevel])

function showIntro() {
  clearText();
  addText("THE SHIFTING GRID", { x: 1, y: 2, color: color`3` });
  addText("You woke up lost", { x: 1, y: 5, color: color`2` });
  addText("inside a collapsing", { x: 1, y: 6, color: color`2` });
  addText("maze. Reach the", { x: 1, y: 7, color: color`2` });
  addText("10th portal before", { x: 1, y: 8, color: color`2` });
  addText("the world erases!", { x: 1, y: 9, color: color`2` });
  addText("Press WASD to begin", { x: 1, y: 13, color: color`3` });
}

function updateTimerDisplay() {
  clearText();
  if (!hasWon && !gameOver && !inIntro) {
    addText(`Time: ${timeLeft}`, { x: 1, y: 0, color: color`2` });
    addText(levelLore[currentLevel], { x: 1, y: 15, color: color`2` });
  }
}

showIntro();

const timerInterval = setInterval(() => {
  if (hasWon || gameOver || inIntro) return;
  timeLeft -= 1;
  if (timeLeft <= 0) {
    gameOver = true;
    clearText();
    addText("The Grid Collapsed!", { x: 1, y: 5, color: color`3` });
    addText("Lost forever...", { x: 2, y: 7, color: color`3` });
    addText("Press J to retry", { x: 2, y: 10, color: color`2` });
  } else {
    updateTimerDisplay();
  }
}, 1000);

function handleMove(dx, dy) {
  if (gameOver || hasWon) return;
  if (inIntro) {
    inIntro = false;
    updateTimerDisplay();
    playTune(myTune);
    return;
  }
  getFirst(player).x += dx;
  getFirst(player).y += dy;
  playTune(myTune);
}

onInput("s", () => handleMove(0, 1))
onInput("w", () => handleMove(0, -1))
onInput("a", () => handleMove(-1, 0))
onInput("d", () => handleMove(1, 0))

onInput("j", () => {
  if (inIntro) return;
  clearText();
  if (playback) playback.end();
  if (gameOver || hasWon) {
    currentLevel = 0;
    timeLeft = 120;
    gameOver = false;
    hasWon = false;
  }
  setMap(levels[currentLevel]);
  updateTimerDisplay();
})

afterInput(() => {
  if (gameOver || hasWon || inIntro) return;
  if (tilesWith(player, portal).length > 0) {
    currentLevel += 1;
    setMap(levels[currentLevel]);
    updateTimerDisplay();
  }
  if (tilesWith(player, goal).length > 0 && !hasWon) {
    hasWon = true;
    clearText();
    playback = playTune(melody, 4);
    addText("You escaped the", { x: 2, y: 5, color: color`3` });
    addText("Shifting Grid and", { x: 1, y: 7, color: color`3` });
    addText("returned home!", { x: 3, y: 9, color: color`3` });
    addText("Press J to replay", { x: 1, y: 12, color: color`2` });
  }
});
