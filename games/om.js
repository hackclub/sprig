/*
@title: Maze Escape
@description: Collect all keys to unlock the exit door!
@author: You
@tags: ['puzzle', 'maze']
@addedOn: 2026-10-20
*/

const player = "p";
const key = "k";
const door = "d";
const wall = "w";

setLegend(
  [
    player,
    bitmap`
................
.....0000.......
....033330......
....030030......
.....0000.......
......00........
.....05550......
....0555550.....
.....05550......
......00........
.....0..0.......
....0....0......
................
................
................
................`
  ],
  [
    key,
    bitmap`
................
......660.......
.....6..60......
.....6..60......
......660.......
.......60.......
.......660......
.......60.......
.......660......
.......60.......
................
................
................
................
................
................`
  ],
  [
    door,
    bitmap`
0000000000000000
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777007777770
0777777007777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0000000000000000
................`
  ],
  [
    wall,
    bitmap`
0000000000000000
0111111111111110
0100000000000010
0101111111110010
0101000000010010
0101011111010010
0101010001010010
0101010101010010
0101010001010010
0101011111010010
0101000000010010
0101111111110010
0100000000000010
0111111111111110
0000000000000000
................`
  ]
);

// Prevent walking through walls or locked doors
setSolids([wall, door]);

// Map design
setMap(map`
wwwwwwwwwwww
w.p...w....w
w.www.w.wk.w
w...w...w..w
ww.wwwww.www
wk.w.....w.w
w.ww.www.w.d
w....w.k...w
wwwwwwwwwwww
`);

let keysCollected = 0;
const totalKeys = 3;

// Movement Controls
onInput("w", () => {
  const p = getFirst(player);
  if (p) p.y -= 1;
});

onInput("s", () => {
  const p = getFirst(player);
  if (p) p.y += 1;
});

onInput("a", () => {
  const p = getFirst(player);
  if (p) p.x -= 1;
});

onInput("d", () => {
  const p = getFirst(player);
  if (p) p.x += 1;
});

afterInput(() => {
  const p = getFirst(player);
  if (!p) return;

  // Pick up key
  const currentKey = getTile(p.x, p.y).find(t => t.type === key);
  if (currentKey) {
    currentKey.remove();
    keysCollected += 1;
    
    // Unlock door once all keys are collected
    if (keysCollected === totalKeys) {
      const d = getFirst(door);
      if (d) d.remove(); // Door disappears!
    }
  }

  // Check if player reached the exit (where the door was)
  if (keysCollected === totalKeys && p.x === 10 && p.y === 6) {
    addText("YOU WIN!", { x: 4, y: 4, color: color`3` });
  }
});