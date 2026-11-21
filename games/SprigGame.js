/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

/*
@title: SprigGame
@description: A stickman is wandering around. He is trying to find his destination.
@author: Shafal L.
@tags: ['Reachyourgoal', 'WASD']
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

// Register all sprites, including the portal ("d") and goal ("g")
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

// Store your maps in an array (Level 1 has 'd', Level 2 has 'd', Level 3 has 'g')
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
...wwgwp
.w....w.
.wwwwww.
.w....w.
.w.ww.w.
.w..w.w.
.ww.w.w.
....w...`
]

let currentLevel = 0
let hasWon = false
let playback = null

setMap(levels[currentLevel])

onInput("s", () => {
  getFirst(player).y += 1
  playTune(myTune);
})

onInput("w", () => {
  getFirst(player).y -= 1
  playTune(myTune);
})

onInput("a", () => {
  getFirst(player).x -= 1
  playTune(myTune);
})

onInput("d", () => {
  getFirst(player).x += 1
  playTune(myTune);
})

// Reset current level if the player presses 'j'
onInput("j", () => {
  clearText();
  hasWon = false;
  if (playback) playback.end();
  setMap(levels[currentLevel]);
})

afterInput(() => {
  // Touching the portal ('d') loads the next level
  if (tilesWith(player, portal).length > 0) {
    currentLevel += 1;
    setMap(levels[currentLevel]);
  }
  
  // Touching the goal ('g') on Level 3 wins the game
  if (tilesWith(player, goal).length > 0 && !hasWon) {
    hasWon = true;
    playback = playTune(melody, 4);
    addText("Congrats! You", { x: 1, y: 6, color: color`3` });
    addText("reached your", { x: 1, y: 8, color: color`3` });
    addText("destination!", { x: 1, y: 10, color: color`3` });
  }
});