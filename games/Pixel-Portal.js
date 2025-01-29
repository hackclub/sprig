/*
Pixel Portal Adventure - A Robust Sprig Game
*/

// Define the sprites for Sprig
const player = "P";
const wall = "W";
const enemy = "E";
const key = "K";
const door = "D";
const portal = "O";
const exit = "X";
const block = "B";
const trap = "T";
const countdown = "C";

// Define images for the sprites
setLegend(
  [ player, bitmap`
    00000
    0...0
    00000
    0.0.0
    0...0
    00000
  `],
  [ wall, bitmap`
    11111
    1...1
    1...1
    1...1
    11111
  `],
  [ enemy, bitmap`
    22222
    2...2
    22222
    2.2.2
    2...2
    22222
  `],
  [ key, bitmap`
    ..3..
    ..3..
    3333.
    3..3.
    3333.
  `],
  [ door, bitmap`
    44444
    4...4
    4...4
    44444
  `],
  [ portal, bitmap`
    55555
    5...5
    5.5.5
    5...5
    55555
  `],
  [ exit, bitmap`
    66666
    6...6
    6...6
    6...6
    66666
  `],
  [ block, bitmap`
    77777
    7...7
    7...7
    7...7
    77777
  `],
  [ trap, bitmap`
    88888
    8...8
    8.8.8
    8...8
    88888
  `],
  [ countdown, bitmap`
    99999
    9...9
    9.9.9
    9...9
    99999
  `]
);

// Define game levels
let levels = [
  map`
    WWWWWWWWWW
    WP....E..W
    WWWWWWWWWW
  `,
  map`
    WWWWWWWWWW
    WP.K.D.E.W
    WWWWWWWWWW
  `,
  map`
    WWWWWWWWWW
    WP.E.....W
    WWWWWWWWWW
  `,
  map`
    WWWWWWWWWW
    WP.O...E.W
    WWWWWWWWWW
  `,
  map`
    WWWWWWWWWW
    WP.B.....W
    WWWWWWWWWW
  `,
  map`
    WWWWWWWWWW
    WP.T...E.W
    WWWWWWWWWW
  `,
  map`
    WWWWWWWWWW
    WP.B.T.E.W
    WWWWWWWWWW
  `,
  map`
    WWWWWWWWWW
    WP.C.C.E.W
    WWWWWWWWWW
  `,
  map`
    WWWWWWWWWW
    WP.B.T.KDW
    W.O.E...XW
    WWWWWWWWWW
  `
];

setMap(levels[0]);

// Define player movement
onInput("w", () => getFirst(player).y -= 1);
onInput("s", () => getFirst(player).y += 1);
onInput("a", () => getFirst(player).x -= 1);
onInput("d", () => getFirst(player).x += 1);

// Game mechanics
afterInput(() => {
  // Check win condition
  if (tilesWith(player, exit).length > 0) {
    nextLevel();
  }

  // Handle interactions
  if (tilesWith(player, key).length > 0) {
    getFirst(key).remove();
  }
  
  if (tilesWith(player, door).length > 0 && getFirst(key) === undefined) {
    getFirst(door).remove();
  }
  
  if (tilesWith(player, trap).length > 0) {
    setMap(levels[currentLevel]);
  }
  
  if (tilesWith(player, enemy).length > 0) {
    setMap(levels[currentLevel]);
  }
  
  if (tilesWith(player, portal).length > 0) {
    getFirst(player).x = Math.floor(Math.random() * 8);
    getFirst(player).y = Math.floor(Math.random() * 8);
  }
});

let currentLevel = 0;
function nextLevel() {
  currentLevel++;
  if (currentLevel >= levels.length) {
    currentLevel = 0; // Restart from level 1
  }
  setMap(levels[currentLevel]);
}
