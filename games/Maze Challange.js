/*
 * 🎮 Labyrinth of Deception 🗝️
 * Author: Manjas Anand & Gemini
 */

// 1. 🎨 Define Sprites
setLegend(
  [ "p", bitmap`
................
....00000000....
...0LLLLLLLL0...
...0LL0LL0LL0...
...0LL0LL0LL0...
...0LLLLLLLL0...
...0LL0000LL0...
...0LLLLLLLL0...
....00000000....
.....033330.....
....03333330....
....03333330....
....03333330....
....03000030....
....00....00....
................` ],
  [ "0", bitmap`
0000000000000000
0111111011111110
0111111011111110
0000000000000000
0111011111101110
0111011111101110
0000000000000000
0111111011111110
0111111011111110
0000000000000000
0111011111101110
0111011111101110
0000000000000000
0111111011111110
0111111011111110
0000000000000000` ],
  [ "k", bitmap`
................
......0000......
.....0FFFF0.....
....0F0000F0....
....0F0..0F0....
....0F0000F0....
.....0FFFF0.....
......0FF0......
.......0F0......
.......0F000....
.......0FFF0....
.......0F000....
.......0FFF0....
.......0F0......
.......000......
................` ],
  [ "d", bitmap`
.00000000000000.
0999999999999990
0900000000000090
090..........090
090.000..000.090
090.090..090.090
090.000..000.090
090..........090
090....00....090
090....00....090
090..........090
090.00000000.090
090.09999990.090
090.00000000.090
0999999999999990
.00000000000000.` ],
  [ "e", bitmap`
.00000000000000.
0555555555555550
0500000000000050
050..........050
050..555555..050
050..5FFFF5..050
050..5F00F5..050
050..5FFFF5..050
050..555555..050
050....00....050
050....00....050
050..555555..050
050..5FFFF5..050
050..555555..050
0555555555555550
.00000000000000.` ]
);

// 2. 🗺️ Multi-Level Maps
const levels = [
  // Level 1: The Winding Crypt
  map`
0000000000000000
0p..0.......0.d0
000.0.00000.0.00
0...0.0...0...d0
0.000.0.0.000000
0.0...0.0.0....0
0.00000.0.0.00.0
0...k.0.0...0..0
00000.0.00000.00
0.....0.....0..0
0.000000000.00.0
0.0...0...0....0
0.0.0.0.0.0000.0
0...0...0.0..e.0
0d000000000.0000
0000000000000000`,

  // Level 2: The Hall of Illusions
  map`
0000000000000000
0p..0...0...0.d0
000.0.0.0.0.0000
0...0.0...0....0
0.000.00000000.0
0.0...0...0..k.0
0.000.0.0.0.0000
0d..0...0.0....0
000.00000.0000.0
0...0.....0....0
0.000.00000.0000
0.0...0...0....0
0.0.000.0.0000.0
0...0...0.0e...0
00000d0000000000
0000000000000000`
];

// 3. ⚙️ Game State Variables
let currentLevel = 0;
let hasKey = false;

setMap(levels[currentLevel]);

// 4. 🕹️ Movement & Game Logic
function tryMove(dx, dy) {
  const player = getFirst("p");
  if (!player) return;

  const targetX = player.x + dx;
  const targetY = player.y + dy;

  // Collision with Walls 🧱
  if (tilesWith(["0"], targetX, targetY).length > 0) {
    return;
  }

  // Interacting with Fake Doors 🚪❌
  if (tilesWith(["d"], targetX, targetY).length > 0) {
    playTune(notes`300:d4-200 100:c4-300`);
    return;
  }

  // Interacting with True Exit Door 🚪✨
  if (tilesWith(["e"], targetX, targetY).length > 0) {
    if (hasKey) {
      playTune(notes`100:c5-150 100:e5-150 100:g5-150 300:c6-400`);
      currentLevel++;
      if (currentLevel < levels.length) {
        hasKey = false;
        setMap(levels[currentLevel]);
      } else {
        clearTile(player.x, player.y);
        // Win State Tune 🎉
        playTune(notes`150:g4 150:c5 150:e5 400:g5`);
      }
    } else {
      playTune(notes`100:f4-200 100:f4-200`);
    }
    return;
  }

  // Collecting the Key 🗝️
  const keyTile = tilesWith(["k"], targetX, targetY);
  if (keyTile.length > 0) {
    clearTile(targetX, targetY);
    hasKey = true;
    playTune(notes`100:e5-100 150:b5-200`);
  }

  // Move Player
  player.x = targetX;
  player.y = targetY;
}

// 5. 🎮 Input Bindings
onInput("w", () => tryMove(0, -1));
onInput("s", () => tryMove(0, 1));
onInput("a", () => tryMove(-1, 0));
onInput("d", () => tryMove(1, 0));

onInput("i", () => tryMove(0, -1));
onInput("k", () => tryMove(0, 1));
onInput("j", () => tryMove(-1, 0));
onInput("l", () => tryMove(1, 0));
