/*
@title: lights_out
@author: StarGazer1258 (Nathaniel Johns)
@tags: ['puzzle']
@addedOn: 2022-12-16

Controls:
  WASD to move cursor
  K to flip tile group
  I to reset current level

How to play:
  Pressing K will flip the tile underneath your cursor and the
  four tile adjecent to it (above, below, left, right).
  
  The objective of the game is to flip all tiles so that
  all of the lights on the 5x5 grid are off. An additional
  goal is to do so with the fewest number of moves. The 
  minimum moves for each level are listed below as "Par".
  See if you can reach these numbers!

  If you get lost or confused, just press I and the level,
  timer, and move counter will be reset.

  There are 20 levels for you to enjoy, gradually getting harder.
  How far can you get?

Dev Notes:
  I have tried my best to document the workings of this game with comments.
  Hopefully they help you to understand how the game works and inspire you to
  make your own games!
  
    Best,
      -Star
*/

const tink = tune`
200: c5~200 + e5~200 + g5~200,
6200`
const successTune = tune`
150,
150: c5-150 + e5-150 + c4~150,
150: e5-150 + g5-150,
150: g5-150 + b5-150 + e4~150 + c4~150,
150: a5-150 + f5-150 + g4~150 + e4~150,
150: f4~150 + d4~150,
150: e5-150 + g5-150,
150: g5-150 + b5-150 + g4~150 + e4~150,
150: a5-150 + f5-150 + f4~150 + d4~150,
150,
150: g5-150 + e5-150 + f4~150 + d4~150,
150: e5-150 + c5-150 + c4~150,
3000`

const lightOn = "1";
const lightOff = "0";
const cursor = "c";
const bg = "b";
const black = "x";

let controlsEnabled = false;

/* 
  Dev Notes:
    As a brief aside, figuring out how to get the cursor
    to appear took me a while. I eventually found out that
    the order of these sprite matters! The sprite with transparency
    that you want to appear on top must be placed first in this list!
*/
setLegend(
  [ cursor, bitmap`
.22..........22.
2..............2
2..............2
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
2..............2
2..............2
.22..........22.`],
  [ lightOn, bitmap`
0000000000000000
00L6666666666L00
0L666666666666L0
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0L666666666666L0
00L6666666666L00
0000000000000000`],
  [ lightOff, bitmap`
0000000000000000
00LFFFFFFFFFFL00
0LFFFFFFFFFFFFL0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0LFFFFFFFFFFFFL0
00LFFFFFFFFFFL00
0000000000000000`],
  [ bg, bitmap`
0000000000000000
0000000000026600
0000000002266F00
0000000226666000
000002266666F000
00022666666F0000
00266666666F0000
0006666666600000
0000026666666000
0000266666666F00
00002666666FF000
000266666FF00000
0002666FF0000000
00266FF000000000
0066F00000000000
0000000000000000` ],
  [ black, bitmap`
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
0000000000000000` ]
);

let level = 1;
const levels = [
  map`
bbbbbbbbbbbbbbbbbbbbbbbbb
b00000000000000000000000b
b01000100110101011101110b
b01000101000101001001000b
b01000101010111001001110b
b01000101010101001000010b
b01110100110101001001110b
b00000000000000000000000b
b00000000100101011100000b
b00000001010101001000000b
b00000001010101001000000b
b00000001010101001000000b
b00000000100111001000000b
b00000000000000000000000b
bbbbbbbbbbbbbbbbbbbbbbbbb`, // 00 (Title)
  map`
bbbbbbbbbbb
b00000bxxxb
b00100bxxxb
b01110bxxxb
b00100bxxxb
b00000bxxxb
bbbbbbbbbbb`, // 01 (Cross)     [Par  1]
  map`
bbbbbbbbbbb
b00001bxxxb
b00011bxxxb
b01001bxxxb
b11100bxxxb
b01000bxxxb
bbbbbbbbbbb`, // 02 (2 moves)   [Par  2]
  map`
bbbbbbbbbbb
b01000bxxxb
b10100bxxxb
b10100bxxxb
b01000bxxxb
b00000bxxxb
bbbbbbbbbbb`, // 03 (Tall O)    [Par  2]
  map`
bbbbbbbbbbb
b00000bxxxb
b00110bxxxb
b01111bxxxb
b01111bxxxb
b00110bxxxb
bbbbbbbbbbb`, // 04 (Fat Cross) [Par  4]
  map`
bbbbbbbbbbb
b11011bxxxb
b00000bxxxb
b11011bxxxb
b00000bxxxb
b11011bxxxb
bbbbbbbbbbb`, // 05 (Six Lines) [Par  6]
  map`
bbbbbbbbbbb
b00010bxxxb
b00100bxxxb
b01110bxxxb
b00100bxxxb
b01000bxxxb
bbbbbbbbbbb`, // 06 (Bolt)      [Par  8]
  map`
bbbbbbbbbbb
b10001bxxxb
b00000bxxxb
b00000bxxxb
b00000bxxxb
b10001bxxxb
bbbbbbbbbbb`, // 07 (4 Corners) [Par  8]
  map`
bbbbbbbbbbb
b00000bxxxb
b01110bxxxb
b00000bxxxb
b01110bxxxb
b00000bxxxb
bbbbbbbbbbb`, // 08 (=)         [Par  9]
  map`
bbbbbbbbbbb
b11111bxxxb
b10001bxxxb
b10101bxxxb
b10001bxxxb
b11111bxxxb
bbbbbbbbbbb`, // 09 (Bullseye)  [Par  9]
  map`
bbbbbbbbbbb
b10111bxxxb
b10101bxxxb
b10101bxxxb
b10101bxxxb
b10111bxxxb
bbbbbbbbbbb`, // 10 (10)        [Par 14]
  map`
bbbbbbbbbbb
b10101bxxxb
b00000bxxxb
b10101bxxxb
b00000bxxxb
b10101bxxxb
bbbbbbbbbbb`, // 11 (Nine dots) [Par  9]
  map`
bbbbbbbbbbb
b10101bxxxb
b10101bxxxb
b11111bxxxb
b00100bxxxb
b00100bxxxb
bbbbbbbbbbb`, // 12 (Fork)      [Par 10]
  map`
bbbbbbbbbbb
b00000bxxxb
b00000bxxxb
b00100bxxxb
b00000bxxxb
b00000bxxxb
bbbbbbbbbbb`, // 13 (Dot)       [Par 11]
  map`
bbbbbbbbbbb
b01110bxxxb
b01110bxxxb
b11111bxxxb
b01110bxxxb
b00100bxxxb
bbbbbbbbbbb`, // 14 (Arrow)     [Par 12]
  map`
bbbbbbbbbbb
b10101bxxxb
b01010bxxxb
b10101bxxxb
b01010bxxxb
b10101bxxxb
bbbbbbbbbbb`, // 15 (Checker)   [Par 12]
  map`
bbbbbbbbbbb
b00100bxxxb
b01110bxxxb
b11111bxxxb
b01110bxxxb
b00100bxxxb
bbbbbbbbbbb`, // 16 (Diamond)   [Par 13]
  map`
bbbbbbbbbbb
b11111bxxxb
b11111bxxxb
b11111bxxxb
b11111bxxxb
b11111bxxxb
bbbbbbbbbbb`, // 17 (Blackout)  [Par 15]
  map`
bbbbbbbbbbb
b10001bxxxb
b01010bxxxb
b00100bxxxb
b01010bxxxb
b10001bxxxb
bbbbbbbbbbb`, // 18 (X)         [Par 15]
  map`
bbbbbbbbbbb
b01010bxxxb
b01010bxxxb
b01010bxxxb
b00000bxxxb
b01010bxxxb
bbbbbbbbbbb`, // 19 (!!)        [Par 12]
  map`
bbbbbbbbbbb
b01010bxxxb
b10101bxxxb
b10001bxxxb
b01010bxxxb
b00100bxxxb
bbbbbbbbbbb`, // 20 (Heart)     [Par 12]
];

// Flips the state of a single tile
function flipTile(x, y) {
  let lightType = getTile(x, y).map(x => x.type);
  if(lightType.includes(lightOn)) {
    clearTile(x, y);
    addSprite(x, y, lightOff);
  } else if(lightType.includes(lightOff)) {
    clearTile(x, y);
    addSprite(x, y, lightOn);
  }
}

// Flips group of adjacent tiles
function flipTileGroup(x, y) {
  flipTile(x, y);

  if(x > 0)
    flipTile(x - 1, y);

  if(x < 6)
    flipTile(x + 1, y);

  if(y > 0)
    flipTile(x, y - 1);

  if(y < 6)
    flipTile(x, y + 1);
}

let timer = 0;
let moves = 0;
let timerInterval;
function loadLevel(n) {
  clearInterval(timerInterval); // Stop the timer

  setMap(levels[n]); // Load level map

  addSprite(3, 3, cursor); // Add cursor
  
  // Draw level text
  addText("Level", { x: 13, y: 4, color: color`2` });
  addText(level.toString(), { x: 13, y: 5, color: color`2` });

  // Draw timer text
  timer = 0;
  timerInterval = setInterval(() => {
    timer++;
    addText(`${ Math.floor(timer / 60) }:${ (timer % 60).toString().padStart(2, "0") }`, { x: 13, y: 8, color: color`2` });
  }, 1000); // Start the timer
  addText("Time", { x: 13, y: 7, color: color`2` });
  addText("0:00", { x: 13, y: 8, color: color`2` });

  // Draw moves text
  moves = 0;
  addText("Moves", { x: 13, y: 10, color: color`2` });
  addText("     ", { x: 13, y: 11, color: color`2` });
  addText(moves.toString(), { x: 13, y: 11, color: color`2` });

  controlsEnabled = true; // Enable controls
}

// Cursor Control
// Up
onInput("w", () => {
  if(!controlsEnabled) return;
  
  if(getFirst(cursor).y > 1)
    getFirst(cursor).y -= 1;
});

// Left
onInput("a", () => {
  if(!controlsEnabled) return;
  
  if(getFirst(cursor).x > 1)
    getFirst(cursor).x -= 1;
});

// Down
onInput("s", () => {
  if(!controlsEnabled) return;
  
  if(getFirst(cursor).y < 5)
    getFirst(cursor).y += 1;
});

// Right
onInput("d", () => {
  if(!controlsEnabled) return;
  
  if(getFirst(cursor).x < 5)
    getFirst(cursor).x += 1;
});

// Check if the puzzle is solved
function isSolved() {
  for(let y = 1; y < 6; y++) {
    for(let x = 1; x < 6; x++) {
      /* If there is even one tile on, the puzzle is not solved.
         So we can return immediately without checking others. */
      let lightType = getTile(x, y).map(x => x.type);
      if(lightType.includes(lightOn)) return false;
    }
  }

  /* If we didn't return after checking all tile for on lights,
     we know the puzzle is solved. */
  return true;
}

// Reset level
onInput("i", () => {
  if(!controlsEnabled) return;
  loadLevel(level);
});

// Flip tile group
onInput("k", () => {
  if(!controlsEnabled) return;
  
  let tile = getFirst(cursor);
  flipTileGroup(tile.x, tile.y); // Flip the tile group underneath the cursor
  
  playTune(tink); // Play "tink" sfx
  
  addSprite(tile.x, tile.y, cursor); // Redraw cursor

  moves++; // Increment move counter
  addText(moves.toString(), { x: 13, y: 11, color: color`2` }); // Redraw moves text

  if(isSolved()) { // Check if the puzzle is solved
    controlsEnabled = false; // Disable controls to prevent weird stuff

    clearInterval(timerInterval); // Stop the timer

    // Remove cursor
    let t = getFirst(cursor);
    clearTile(t.x, t.y); // Remove the cursor (and light beneath)
    
    /* Redraw the light we removed. We can just use an off light, since
        we know the puzzle is solved and all lights will be off. */
    addSprite(t.x, t.y, lightOff);

    playTune(successTune); // Play success sfx
    
    // Add "Level Clear!" text
    addText("Level", { x: 4, y: 6, color: color`2` });
    addText("Clear!", { x: 4, y: 9, color: color`2` });

    
    setTimeout(() => {
      // Remove "Level Clear!" text
      addText("     ", { x: 4, y: 6 });
      addText("      ", { x: 4, y: 9  });

      
      level++; // Increment level counter
      
      if(level < levels.length) { // Check if we have finished the last level
        loadLevel(level); // Load next level
      } else {
        // Add "Thanks for Playing!" text
        addText("Thanks", { x: 4, y: 5, color: color`2` });
        addText(" for", { x: 4, y: 7, color: color`2` });
        addText("Playing!", { x: 3, y: 9, color: color`2` });
      }
    }, 5000);
  }
});

loadLevel(level); // Load the first level