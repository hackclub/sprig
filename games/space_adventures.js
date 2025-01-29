/*
@title: Space Adventures
@author: Shreyas Jain
@tags: ['platformer']
@addedOn: 2024-06-25
*/

// Define the sprites in our game
const player = "p";
const ground = "g";
const platform = "t";
const goal = "x";2
const air = "a";

// Assign bitmap art to each sprite
setLegend(
  [player, bitmap`
................
................
......222.......
.......2........
.....22222......
.....22222......
.....22222......
......2.2.......
......2.2.......
......2.2.......
......2.2.......
......2.2.......
.....22222......
.....2...2......
.....2...2......
................`],
  [ground, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [platform, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [goal, bitmap`
................
................
...HHHHHHHHHH...
..HH99999999HH..
..H99HHHHHH99H..
..H9HH9999HH9H..
..H9H99HH99H9H..
..H9H9H99H9H9H..
..H9H9H99H9H9H..
..H9H99HH99H9H..
..H9HH9999HH9H..
..H99HHHHHH99H..
..HH99999999HH..
...HHHHHHHHHH...
................
................`],
  [air, bitmap`
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
);

// Create game levels
let level = 0;
const levels = [
  map`
..............
..............
..............
..............
..............
p..t..t..t..x.
gggggggggggggg`,
  map`
..............
..............
..............
..............
p..t..t..t..x.
g..t..t..t..g.
gggggggggggggg
`,
  map`
..............
..............
..............
..t..t..t..t..
p..t..t..t..x.
g..t..t..t..g.
gggggggggggggg`,
  map`
..............
..............
..g.......g...
p.t..t..t..tx.
g..t..t..t..g.
..t..t..t..t.g
gggggggggggg..`,
  map`
....t.t...ttt
.............
..t.....t....
p.t..t.t..tx.
gg.t.tggt.tg.
.tt.t.t.ttt..
gg.t.t.t.tggg`,
  map`
.................
.................
.................
.................
......t..t.......
...t....t....t...
p.t..t..t..t..tx.
g..t..t..t..t..g.
gg.t.t..t..t.t.g.
.tt..tt..tt..tt..
ggggggggggggggggg`,
  map`
.................
.................
.................
.................
...t.t...t..t....
...t.t...t..t....
p.t..t.t..t..t..x
g..t..t..t..t..gt
gg..t..t..t..t.gt
.tt..tt..tt..ttgt
ggggggggggggggggg`,
  map`
.................
.................
.................
...........t.....
....t..t...t..t..
...t.t...t.......
p.t..t..t..t..t.x
g..t..t..t..t..g.
gg..t..t..t..t.g.
.tt..tt..tt..tt..
ggggggggggggggggg`,
  map`
.................
.................
.................
...........t.....
....t..t..t..t...
...t.t.....t..t..
p.t..t..t..t..tx.
g..t..t..t..tttgg
gg..t..t..t..t.gg
.tt..tt..tt..tt..
ggggggggggggggggg`,
  map`
.................
.................
.................
..gt..t..t..t....
t..tt.tt.tt.t....
...t..t..t..t....
p.t..t..t..t...x.
g..t..t..t..t.tgt
gg..t..t..t..t.g.
.tt..tt..tt..tt..
ggggggggggggggggg`,
  map`
................
................
........t.......
....t.....t..tt.
....ttt...t..t..
..t........t.tx.
..t.p...t..t.tgg
gggggggggggggggg`,
  map`
................
................
.............x..
...........tttg.
....t.t...t..t.g
....t.t...t..t.g
p..t..t..t..t..g
g..t..t..t..t..g
gg..t..t..t..t.g
.tt..tt..tt..tt.
gggggggggggggggg`,
  map`
.................
.................
..tt..t..t..t....
...tt.tt.tt.t..x.
t..t..t..t..t..g.
...t..t..t..t..g.
p.t..t..t..t..t.g
g..t..t..t..t..g.
gg..t..t..t..t.g.
.tt..tt..tt..tt..
ggggggggggggggggg`,
  map`
.................
.................
.................
.................
.t..t..t..t..t..x
g..t..t..t..t..g.
gg..t..t..t..t..g
p..t..t..t..t..g.
gg..t..t..t..t..g
.tt..tt..tt..tt..
ggggggggggggggggg`,
  map`
..................
..................
..................
..................
..t..t....t..t..x.
g...t..t...t..tttg
gg..t..t..t..t..gg
p....t....t..t..g.
g..t..t..t..t..g..
gg..t..t..t..t..gg
.tt..tt..tt..tt..t
gggggggggggggggggg`,
];

const leveltext = [
  "Welcome!",
  "Ready?",
  "Good Luck",
  "Getting Harder...",
  "",
  "Wow, Space!",
  "Lots of Platforms",
  "Reach the Stars",
  "Asteroid Field!",
  "Is it Over???",
  "Nope! Almost....",
  "Cosmic Path",
  "",
  "Galactic Journey",
  "Interstellar",
  "You Win!",
];

// Set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);
addText("Space Adventures", { y: 4, color: color`2` });
addText("A Platformer Game", { y: 6, color: color`2` });
addText("By Shreyas Jain", { y: 14, color: color`1` });

setBackground(air);

setSolids([player, ground, platform]);

let isJumping = false;
let inGame = true;

// Function to check if player is on ground or platform
function isOnGround() {
  const playerPos = getFirst(player);

  const tilesBelow = getTile(playerPos.x, playerPos.y + 1);
  if (tilesBelow.some(tile => tile.type === ground || tile.type === platform)) {
    return true;
  }

  return false;
}

// Inputs for player movement control
onInput("d", () => {
  if (!inGame) return;

  getFirst(player).x++;

  setTimeout(() => {
    if (!isOnGround()) {
      while (!isOnGround()) {
        getFirst(player).y++;
      }
    }
  }, 200);
});

onInput("a", () => {
  if (!inGame) return;

  getFirst(player).x -= 1;

  setTimeout(() => {
    if (!isOnGround()) {
      while (!isOnGround()) {
        getFirst(player).y++;
      }
    }
  }, 200);
});

onInput("w", () => {
  if (!inGame) return;

  if (isJumping) return;

  isJumping = true;

  // Perform jump animation
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      if (i === 3) {
        isJumping = false;
      }
      if (i < 2) {
        getFirst(player).y--;
      } else {
        getFirst(player).y++;
      }
    }, i * 100);
  }

  setTimeout(() => {
    if (!isOnGround()) {
      while (!isOnGround()) {
        getFirst(player).y++;
      }
    }
  }, 400);
});

// Input to reset level
onInput("j", () => {
  if (!inGame) return;

  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText();
    setMap(currentLevel);
  }
});

onInput("l", () => {
  if (!inGame) return;

  getFirst(player).x = getFirst(goal).x;
  getFirst(player).y = getFirst(goal).y;
});

// These get run after every input
afterInput(() => {
  if (inGame) {
    if (getFirst(player).x === getFirst(goal).x && getFirst(player).y === getFirst(goal).y) {
      level++;

      const currentLevel = levels[level];

      if (currentLevel !== undefined) {
        setMap(currentLevel);
      }
    }
  }

  try {
    if (currentLevel !== undefined) {
      clearText();
      if (!(leveltext[level] == "You Win!")) {
        addText(leveltext[level], { y: 4, color: color`2` });
      } else {
        addText("You Win!", { y: 3, color: color`4` });
        inGame = false;
      }
    }
  } catch (err) {}
});
