/*
@title: mr gold
@author: BoKi
@tags: []
@addedOn: 2024-00-00
*/

// Defining sprites
const player = "p";
const burntPlayer = "x"; // Burnt version of Mr. Gold (must be 1 char)
const gold = "g";
const house = "h";
const background = "b";
const trap = "t";


// Bitmap assigning
setLegend(
  [ player, bitmap`
...66666666666..
...60000000006..
...60FFFFFFF06..
...60FFFFFFF06..
...60F0FFF0F06..
...60FFF6FFF06..
...60FFFFFFF06..
...60FF333FF06..
...60FFFFFFF06..
...60000000006..
...66600000666..
.....6006006....
.....6006006....
.....6666666....
................
................` ],
  [ burntPlayer, bitmap`
...LLLLLLLLLLL..
...L000000000L..
...L0LLLLLLL0L..
...L0LLLLLLL0L..
...L0L0LLL0L0L..
...L0LLLCLLL0L..
...L0LLLLLLL0L..
...L0LL000LL0L..
...L0LLLLLLL0L..
...L000000000L..
...LLL00000LLL..
.....L00L00L....
.....L00L00L....
.....LLLLLLL....
................
................` ],
  [ gold, bitmap`
................
................
................
................
................
........00......
.......0660.....
......06660.....
.....06660......
....06660.......
....0660........
.....00.........
................
................
................
................` ],
  [ house, bitmap`
.11.1...........
1.11.1..........
.11111..........
..1.111.........
....LLL.........
....LLL.........
....LLL.........
...CCCCCCCCCC...
..CCCCCCCCCCCC..
.CCCCCCCCCCCCCC.
CCCCCCCCCCCCCCCC
...C66CCCC66C...
...C66CCCC66C...
...CCCCCLLCCC...
...CCCCCL1CCC...
...CCCCCLLCCC...`],
  [ background, bitmap`
1111111111111111
1111111111111111
11111H1111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
11111111111H1111
1111111111111111
1111111111111111
1111H11111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [ trap, bitmap`
...1L..1.....6.L
.111..L..L66..11
L..1....66...11.
......666.......
.....66..66.....
....669996......
....6693966.....
....66939966....
....66933996....
...6699333966...
..66699333966...
..669933399666..
...6993C339966..
..666933C399966.
..699933C339966.
..69933CCC39966.`]
);

// Setting background globally
setBackground(background);

// Burn counter and game over flag
let burnCount = 0;
let gameOver = false;
let isBurning = false;

// Function to update burn counter display
function updateBurnCounter() {
  clearText();
  addText(`Burns: ${burnCount}/3`, { x: 1, y: 1, color: color`2` });
}

// Function to redraw background behind all objects
function redrawBackground() {
  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      if (!getTile(x, y).some(obj => obj.type === trap)) {
        addSprite(x, y, background);
      }
    }
  }
}

// Setting solids
setSolids([player, gold]); // Player can move over traps

// Setting map to current level
let level = 0;
const levels = [
  map`
bbbbbbbbb
bbgbtpbbb
bbbbbbbgb
bbbbbbbbb
bbgbhbtbb
bbbbbbbbb
bbbbbbbbb`,
  map`
bbbbbbbbb
bbbhbtgbb
bgbbbbbbt
bbbtbbpbb
btbbbbtbb
bbbbgbbbb
bbbbbbbbb`,
  map`
bbbbbbbtt
bbgbbbbbb
bbgtbbbtb
bbgbtbpbb
bbbbbbbgb
tbbbbbbtb
bbbtbbbhb`,
  map`
bbbbbbbtb
bbtbbgbbb
bbbtbbbgb
bbbbbbtbt
btbbtbbgb
bbpbbbbbb
bbhbbbgbb`,
  map`
bbbbbbpbh
bgbbtbbbt
bbbbtbtgb
bttbtbtbb
bgbbtbtgb
bbgbtbgbb
bbbbtbbbb`,
  map`
bbbbbbbbb
bgtbtbbgb
bbbbbgbtb
btbbbbbbb
bbbthtbgb
bgpbtbgbb
bbbbbbbbb`
];

// Load first level
setMap(levels[level]);
redrawBackground();
updateBurnCounter(); // Display initial burn counter

// Player can push gold
setPushables({ [player]: [gold] });

// Player movement (disabled when burnt or game over)
onInput("s", () => { if (!isBurning && !gameOver) { getFirst(player).y += 1; redrawBackground(); checkTrapCollision(); } });
onInput("w", () => { if (!isBurning && !gameOver) { getFirst(player).y -= 1; redrawBackground(); checkTrapCollision(); } });
onInput("d", () => { if (!isBurning && !gameOver) { getFirst(player).x += 1; redrawBackground(); checkTrapCollision(); } });
onInput("a", () => { if (!isBurning && !gameOver) { getFirst(player).x -= 1; redrawBackground(); checkTrapCollision(); } });

// Function to check if player touched a trap
function checkTrapCollision() {
  let playerTile = getFirst(player);
  if (getTile(playerTile.x, playerTile.y).some(obj => obj.type === trap)) {
    isBurning = true; // Disable movement
    burnCount++; // Increase burn counter
    updateBurnCounter(); // Update counter display

    addText("Burnt!", { y: 8, color: color`3` }); // Show message with count

    // Change the player sprite to burnt version
    let x = playerTile.x;
    let y = playerTile.y;
    playerTile.remove(); // Remove normal player
    addSprite(x, y, burntPlayer); // Add burnt player

    if (burnCount >= 3) {
      setTimeout(() => {
        clearText();
        addText("Game Over!", { x: 4, y: 8, color: color`2` }); // Show "Game Over!"
        gameOver = true; // Disable game
      }, 1000);
    } else {
      setTimeout(() => {
        clearText();
        updateBurnCounter(); // Keep counter displayed
        setMap(levels[level]); // Restart level
        redrawBackground();
        isBurning = false; // Re-enable movement
      }, 1000); // Delay restart by 1 second
    }
  }
}

// Reset level with "J" (Only works if game is not over)
onInput("j", () => {
  if (!isBurning && !gameOver) {
    setMap(levels[level]);
    redrawBackground();
    updateBurnCounter();
  }
});

// Level progression
let levelSwitching = false;

afterInput(() => {
  if (levelSwitching || isBurning || gameOver) return;

  let golds = getAll(gold);
  for (let g of golds) {
    if (getTile(g.x, g.y).some(obj => obj.type === house)) {
      g.remove();
    }
  }

  let currentMapString = levels[level].trim().split("\n").join("");
  let levelHadGold = currentMapString.includes("g");

  if (levelHadGold && getAll(gold).length === 0) {
    levelSwitching = true;

    setTimeout(() => {
      if (level < levels.length - 1) {
        level++;
        setMap(levels[level]);
        redrawBackground();
        updateBurnCounter();
        levelSwitching = false;
      }
    }, 1000);
  }
});
