/*
@title: Box Guy
@author: jli46
@tags: ['puzzle']
@addedOn: 2024-04-23
*/


/*
----------------------------------------------------------------------------
Box Guy is a very challenging and unforgiving puzzle game. You are Box Guy, 
and your mission is to complete all of the ten levels in the game. To beat 
each level you must reach the door, but this is not as easy since the door 
is not always in a convenient place. There are obstacles in the way such as 
walls that are non-moveable and boxes that are moveable, which you can use to your advantage.

INSTRUCTIONS:
Your goal is to get to the door on the map. 
Your character can fall any height but can only climb up one unit. 
You can pick up boxes with nothing on top of them and set them down 
in front of you or on top of a one-unit obstacle in front of you.

CONTROLS:
A: Move left and face left
D: Move right and face right

The following apply in the direction your character is facing:
S: Pick up or drop box
W: Move upwards

J Key: Reset current level
L Key: Reset to very beginning start screen
K key: Begin game

NOTES:
This is a Sprig spin-off recreation of an original game called "Block Dude"
by Detached Solutions, with the main developer being Brandon Sterner.
It was originally made available on the TI-83 Plus calculator.
See here for more information: https://www.detachedsolutions.com/puzzpack/blockdude.php
However, all of the following code was written independently. Enjoy and good luck!
----------------------------------------------------------------------------
*/





// variables
const playerLeft = "l";
const playerRight = "r";
const wall = "w";
const box = "b";
const door = "d";
const movement = tune`
101.35135135135135: D4~101.35135135135135,
3141.891891891892`;
const boxPickUp = tune`
106.38297872340425: E4^106.38297872340425,
3297.8723404255315`;
const boxPlace = tune`
90.09009009009009: C4-90.09009009009009,
2792.7927927927926`;
const resetLOL = tune`
73.17073170731707: A5^73.17073170731707 + G5^73.17073170731707 + F5^73.17073170731707 + E5^73.17073170731707 + D5^73.17073170731707,
73.17073170731707: A5^73.17073170731707 + G5^73.17073170731707 + E5^73.17073170731707,
73.17073170731707: F5^73.17073170731707 + G4^73.17073170731707 + F4^73.17073170731707 + E4^73.17073170731707 + D4^73.17073170731707,
73.17073170731707: G5^73.17073170731707 + D5^73.17073170731707 + C5^73.17073170731707 + B4^73.17073170731707 + A4^73.17073170731707,
73.17073170731707: A5^73.17073170731707 + B5^73.17073170731707 + G5^73.17073170731707 + F5^73.17073170731707 + E5^73.17073170731707,
73.17073170731707: B5^73.17073170731707 + A5^73.17073170731707 + A4^73.17073170731707 + G4^73.17073170731707 + F4^73.17073170731707,
73.17073170731707: B4^73.17073170731707,
1829.2682926829268`;
const win = tune`
74.07407407407408: C4-74.07407407407408 + D4-74.07407407407408 + E4-74.07407407407408,
74.07407407407408: D4-74.07407407407408 + C4-74.07407407407408 + E4-74.07407407407408 + F4-74.07407407407408,
74.07407407407408: F4-74.07407407407408 + G4-74.07407407407408,
74.07407407407408: G4-74.07407407407408 + F4-74.07407407407408 + E4-74.07407407407408,
74.07407407407408: E4-74.07407407407408 + D4-74.07407407407408,
74.07407407407408: D4-74.07407407407408 + E4-74.07407407407408,
74.07407407407408: E4-74.07407407407408 + F4-74.07407407407408 + G4-74.07407407407408 + A4-74.07407407407408,
74.07407407407408: B4-74.07407407407408 + C5-74.07407407407408,
74.07407407407408: C5-74.07407407407408 + D5-74.07407407407408,
74.07407407407408: D5-74.07407407407408 + E5-74.07407407407408,
74.07407407407408: E5-74.07407407407408 + F5-74.07407407407408,
74.07407407407408: F5-74.07407407407408,
1481.4814814814815`;
let pickedUp = false;
let time = 0;
let resets = 0;
let moves = 0;
let level = -1;
const levels = [
  map`
w................w
w................w
w................w
w................w
w...w.......w....w
wd..w...w.b.w.b.lw
wwwwwwwwwwwwwwwwww`,
  map`
wd................w
ww................w
ww..........w..b..w
ww..........wb.bblw
wwwwww...wwwwwwwwww
wwwwww..bwwwwwwwwww
wwwwwwwwwwwwwwwwwww`,
  map`
w................w
w...............bw
wd.............bbw
wwww....l...wb.www
wwww....w..wwwwwww
wwwwbb.ww..wwwwwww
wwwwwwwww.wwwwwwww
wwwwwwwwwwwwwwwwww`,
  map`
w...................w
w..................bw
w.................bbw
w.............l...www
w..w..........w...www
wd.w.b........wwwwwww
ww.w.b...b..wwwwwwwww
ww.w.b.w.wb.wwwwwwwww
ww.wwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwww`,
  map`
w....................w
w....................w
w.....w..............w
w.....w..............w
w.....wbbbb..........w
wd...wwwwwwwl........w
ww.wwwwwwwwww.w.....bw
ww.wwwwwwwwww.ww...bbw
ww.wwwwwwwwww.ww..bbbw
wwwwwwwwwwwww.wwwwwwww
wwwwwwwwwwwwwwwwwwwwww`,
  map`
wd..................w
ww..................w
ww................bbw
wwbb........w..b..www
wwbbb.......wlbbb.www
wwbbbb......wwwww.www
wwwwww....wwwwwwwwwww
wwwwww...bwwwwwwwwwww
wwwwwww.wwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwww`,
  map`
w......................w
w.....................bw
w.....................bw
w....................bbw
wd...b...............www
ww...w.b.....w....ww.www
ww...w.b....ww.b.lwwwwww
www..w.bbb..ww.bbbwwwwww
www..wwwwww.wwwwwwwwwwww
wwww.wwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwww
w...wwwwwww....www........w
w....wwwww.....ww....d....w
wb....www....w.w.....w....w
wbb.........ww......www...w
wwww.......ww.........ww..w
wwwww............ww....ww.w
www....b.w......wwww......w
www....bwww....wwwww......w
ww...wwwwwww....wwww.....bw
ww......www......ww.....bbw
w........w...........wwwwww
w............b............w
w....b......www..........bw
w...www.................bbw
w........b.......b..l..bbbw
wwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
w..................w
w.........b........w
w.........bb......bw
w.........www....bbw
w.............l.wwww
w.............b....w
wd...........www...w
ww....ww...w......bw
ww....wwb..ww...wwww
ww....wwwwwww..wwwww
wwww..wwwwwww.wwwwww
wwww.wwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww`,
  map`
www...........w.........www
www...........w.........www
wwwwb.......bbwb...bbb.bwww
w..ww..w...wwwww..bwww.ww.w
w...w..ww........www.www..w
w...ww..wwbbbb............w
wd.......wwwwwww..........w
ww........wwwwwww........ww
ww.....b...www..ww........w
ww.....w....w....ww.......w
wwwww..ww.............wwwww
wwwwwwww......l...........w
wwww..........w...........w
wwww.........ww....wwwwwwww
wwww........ww...........ww
wwww..........b.........bww
wwwwb....wwwwwwwwwww...bbww
wwwwbb..wwwwwwwwwwwww.bbbww
wwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
w..w...w....................w
w..w...w....................w
w.....bwbb............wwwww.w
wb...www.bww.....b..ww..d.w.w
wbb....www...l..b.......w.w.w
www..bbw.....w.b..........w.w
w...wwww......w..www...www..w
wb........d...w.w......w..b.w
wbb.......www.w.wb....w..wwww
wwww.b...www..w.wwb..w.b.w..w
w...........b.www..bw...w...w
w...b.....bb.w...wwww.......w
w....wwwwwwwww........wwwww.w
w..............b...bww....w.w
wwww...........b...w....bbw.w
wbww...w....w..........wwww.w
wwbwww.w....w...bbb.b.......w
wbwbwbww....w........bbb....w
wwwwwwwwwwwwwwwwwwwwwwwwwwwww`
];

// functions
function currPlayer() { // returns current player's bitmap key
  if (getFirst(playerLeft)) {
    return playerLeft;
  } else {
    return playerRight;
  };
};

function updateBox(x, y, player) { // updates the box's position with each input
  if (pickedUp) {
    clearTile(x, y);
    if (!getTile(getFirst(player).x, getFirst(player).y - 1)[0]) { // checks if tile above new position is taken up
      addSprite(getFirst(player).x, getFirst(player).y - 1, box); // if not, update box to be above player new position
    } else {
      addSprite(x, y + 1, box); // if it is, drop the box where the player was
      pickedUp = false;
    };
  };
};

function checkBottom(dx, y) { // checks how far down a drop is
  let i = 0;
  while (!getTile(dx, y + i)[0]) { // while there isn't something on a tile, keep adding i
    i += 1;
  };
  return i - 1; // return y position of tile above valid tile (where the sprite will now be)
};

function reset() { // resets the game
  playTune(resetLOL);
  clearText();
  time = 0;
  level = -1;
  resets = 0;
  moves = 0;
  pickedUp = false;
  setMap(map`
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww
wwwwwwwwww`);
  addText("BOX GUY by jli46", { x: 2, y: 1, color: color`2` });
  addText("10 levels.", { x: 6, y: 3, color: color`2` });
  addText("10 doors.", { y: 4, color: color`2` });
  addText("Controls:", { y: 6, color: color`2` });
  addText("W to go up", { y: 7, color: color`2` });
  addText("A to go left", { y: 8, color: color`2` });
  addText("S to pickup/place", { y: 9, color: color`2` });
  addText("D to go right", { y: 10, color: color`2` });
  addText("J to reset", { y: 11, color: color`2` });
  addText("L to full reset", { y: 12, color: color`2` });
  addText("K to begin", { y: 14, color: color`2` });
};

function timer() {
  setTimeout(() => {
    time += 1;
    timer();
  }, "1000");
};

// set functions
setLegend(
  [playerRight, bitmap`
.....0000.......
....000000......
....0000000000..
....0........0..
...00...0..000..
...000....00....
.....000.00.....
.......000..0...
.0......00..0...
.000000000000...
........0.......
......000.......
......0.00......
.....00..0......
....000..00.....
....0.....000...`],
  [playerLeft, bitmap`
.......0000.....
......000000....
..0000000000....
..0........0....
..000..0...00...
....00....000...
.....00.000.....
...0..000.......
...0..00......0.
...000000000000.
.......0........
.......000......
......00.0......
......0..00.....
.....00..000....
...000.....0....`],
  [wall, bitmap`
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
0000000000000000`],
  [box, bitmap`
0000000000000000
0000000000000000
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
0000000000000000
0000000000000000`],
  [door, bitmap`
...0000000000...
...0........0...
...0........0...
...0........0...
...0........0...
...0........0...
...0........0...
...0........0...
...0......0.0...
...0........0...
...0........0...
...0........0...
...0........0...
...0........0...
...0........0...
...0000000000...`]
);
setSolids([wall, playerRight, playerLeft, box]);
reset();
timer();

// inputs
onInput("k", () => {
  if (level === -1) {
    time = 0;
    playTune(win);
    level = 0;
    setMap(levels[level]);
    clearText();
    addText("Moves: " + String(moves), { x: 0, y: 2, color: color`2` });
    addText("Level: " + String(level), { x: 0, y: 0, color: color`2` });
    addText("Resets: " + String(resets), { x: 0, y: 1, color: color`2` });
  }
});

onInput("l", () => {
  if (level !== -1) { // not allowed to full reset on start screen
    reset();
  };
});

onInput("j", () => {
  if (level !== -1 && level !== 11) { // not allowed to reset on win and start screens
    playTune(resetLOL);
    setMap(levels[level]);
    pickedUp = false;
    resets += 1;
  };
});

onInput("w", () => {
  if (level !== -1) {
    player = currPlayer();
    let x = getFirst(player).x;
    let y = getFirst(player).y;
    let dx = x; // dx is where the player wants to go
    if (player === playerRight) { // checks which way the player is facing
      dx += 1;
    } else {
      dx -= 1;
    };
    // checks if the box in front of player is valid and that there is nothing on top of it/only door on top
    if (getTile(dx, y)[0] && (!getTile(dx, y - 1)[0] || getTile(dx, y - 1)[0]["type"] === door)) {
      clearTile(x, y);
      addSprite(dx, y - 1, player);
      playTune(movement);
    };
    moves += 1;
    updateBox(x, y - 1, player); // always update box after movement input
  };
});

onInput("s", () => {
  if (level !== -1) {
    moves += 1;
    player = currPlayer();
    let x = getFirst(player).x;
    let y = getFirst(player).y;
    let dx = x; // dx is where the box wants to go
    if (player === playerRight) {
      dx += 1;
    } else {
      dx -= 1;
    };
    if (!pickedUp) { // if not picked up
      /* check if 
      1) tile in front is valid
      2) tile in front is a box
      3) the tile in front above is not valid
      4) the tile above is not valid */
      if (getTile(dx, y)[0] && getTile(dx, y)[0]["type"] === box && !getTile(dx, y - 1)[0] && !getTile(x, y - 1)[0]) {
        clearTile(dx, y);
        addSprite(getFirst(player).x, y - 1, box);
        pickedUp = true;
        playTune(boxPickUp);
      };
    } else { // if picked up
      if (!getTile(dx, y)[0]) { // check if tile in front is valid
        if (getTile(dx, y + 1)[0]) { // check if tile in front and below is valid
          clearTile(x, y - 1);
          addSprite(dx, y, box);
        } else { // if below is not valid, that means the box is being dropped from high up
          let bottom = checkBottom(dx, y);
          clearTile(x, y - 1);
          addSprite(dx, y + bottom, box);
        };
        pickedUp = false;
        playTune(boxPlace);
      } else if (!getTile(dx, y - 1)[0]) { // if tile in front is  not empty, check if tile above that tile is valid
        clearTile(x, y - 1);
        addSprite(dx, y - 1, box);
        pickedUp = false;
        playTune(boxPlace);
      };
    };
  };
});

onInput("a", () => {
  if (level !== -1) {
    player = currPlayer();
    let x = getFirst(player).x;
    let y = getFirst(player).y;
    let dx = x - 1; // dx is where the player wants to go
    clearTile(x, y);
    if (!getTile(dx, y)[0]) { // check if tile in front is empty
      if (getTile(dx, y + 1)[0]) { // check if next tile below is valid
        addSprite(x, y, playerLeft);
        getFirst(playerLeft).x -= 1;
        playTune(movement);
      } else { // if next tile below is not valid, means it is a drop down
        let bottom = checkBottom(dx, y); // function returns the y direction displacement
        addSprite(dx, y + bottom, playerLeft);
        playTune(movement);
      };
    } else if (getTile(dx, y)[0] && getTile(dx, y)[0]["type"] === door) { // check if going onto win tile
      addSprite(x, y, playerLeft);
      getFirst(playerLeft).x -= 1;
      playTune(movement);
    } else { // turning directions
      addSprite(x, y, playerLeft);
    };
    moves += 1;
    updateBox(x, y - 1, playerLeft); // always update box after movement input
  };
});

onInput("d", () => {
  if (level !== -1) {
    player = currPlayer();
    let x = getFirst(player).x;
    let y = getFirst(player).y;
    let dx = x + 1; // dx is where the player wants to go
    clearTile(x, y);
    if (!getTile(dx, y)[0]) { // check if tile in front is empty
      if (getTile(dx, y + 1)[0]) { // check if next tile below is valid
        addSprite(x, y, playerRight);
        getFirst(playerRight).x += 1;
        playTune(movement);
      } else { // if next tile below is not valid, means it is a drop down
        let bottom = checkBottom(dx, y); // function returns the y direction displacement
        addSprite(dx, y + bottom, playerRight);
        playTune(movement);
      };
    } else if (getTile(dx, y)[0] && getTile(dx, y)[0]["type"] === door) { // check if going onto win tile
      addSprite(x, y, playerRight);
      getFirst(playerRight).x += 1;
      playTune(movement);
    } else { // turning directions
      addSprite(x, y, playerRight);
    };
    moves += 1;
    updateBox(x, y - 1, playerRight); // always update box after movement input
  };
});

afterInput(() => {
  if (level !== -1 && level !== 11) { // afterInput() doesn't run on the win and start screens
    clearText();
    if (tilesWith(door, playerRight).length === 1 || tilesWith(door, playerLeft).length === 1) {
      level += 1;
      if (levels[level]) { // checks if next level is valid
        setMap(levels[level]);
        playTune(win);
      } else { // no more levels left
        clearText();
        playTune(win);
        setMap(map`
w...........w
w...........w
w...........w
wb.........bw
wbb...l...bbw
wbbb.bbb.bbbw
wwwwwwwwwwwww`);
        addText("You win!", { y: 0, color: color`2` });
        addText("You spent: " + String(Math.floor(time / 60)) + " mins", { y: 1, color: color`2` });
        addText("Thanks for playing!", { y: 13, color: color`2` });
        addText("Total Resets: " + String(resets), { y: 14, color: color`2` });
        addText("Total Moves: " + String(moves), { y: 15, color: color`2` });
      };
    };
    if (level === 7) { // different text placements depending on empty space available on screen
      addText("Moves: " + String(moves), { x: 0, y: 15, color: color`2` });
      addText("Resets: " + String(resets), { x: 0, y: 1, color: color`2` });
      addText("Level: " + String(level), { x: 0, y: 0, color: color`2` });
    } else if (level === 8) {
      addText("Moves: " + String(moves), { x: 0, y: 15, color: color`2` });
      addText("Resets: " + String(resets), { x: 0, y: 14, color: color`2` });
      addText("Level: " + String(level), { x: 0, y: 0, color: color`2` });
    } else if (level === 9) {
      addText("Moves: " + String(moves), { x: 0, y: 15, color: color`2` });
      addText("Resets: " + String(resets), { x: 9, y: 0, color: color`2` });
      addText("Level: " + String(level), { x: 0, y: 0, color: color`2` });
    } else if (level === 10) {
      addText("Moves: " + String(moves), { x: 0, y: 15, color: color`2` });
      addText("Resets: " + String(resets), { x: 0, y: 14, color: color`2` });
      addText("Level: " + String(level), { x: 0, y: 0, color: color`2` });
    } else if (level === 11) {} else {
      addText("Moves: " + String(moves), { x: 0, y: 2, color: color`2` });
      addText("Resets: " + String(resets), { x: 0, y: 1, color: color`2` });
      addText("Level: " + String(level), { x: 0, y: 0, color: color`2` });
    };
  };
});
