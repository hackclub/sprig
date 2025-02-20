/* 
@title: maze runner 5
@author: sagrusea
@tags: ['maze', 'puzzle']
@addedOn: 2024-01-22
*/
let hp = 3; // Initialize HP
const bgmusic1 = tune`
500: c4~500,
500: d4~500,
500: e4~500,
500: f4~500,
500: g4~500,
500: a4~500,
500: b4~500,
500: c5~500`;
const bgmusic2 = tune`
500: g4~500,
500: a4~500,
500: b4~500,
500: c5~500,
500: d5~500,
500: e5~500,
500: f5~500,
500: g5~500`;
const keysfx = tune`
100: c5-100,
100: e5-100,
100: g5-100`;
const locksfx = tune`
100: g4-100,
100: e4-100,
100: c4-100`;
const doorsfx = tune`
100: c4-100,
100: d4-100,
100: e4-100`;
const winMelody = tune`
500: c5~500,
500: e5~500,
500: g5~500,
500: c6~500`;
const hurtSfx = tune`
100: c4-100,
100: b3-100,
100: a3-100`;
const healSfx = tune`
100: g4-100,
100: a4-100,
100: b4-100`;

const box = "b";
const char1 = "1";
const char2 = "2";
const char3 = "3";
const char4 = "4";
const char5 = "w";
const woodWall = "5";
const stoneWall = "6";
const flower = "7";
const door = "d";
const door2 = "h";
const lock = "l";
const key = "k";
const doorUnlocked = "u";
const door2Unlocked = "v";
const lamp = "L";
const plant = "P";
const table = "T";
let doorUnlck = 0;

setLegend(
  [char1, bitmap`
................
................
................
................
...7077777707...
...7077CC7707...
...LLL7CC7LLL...
...7777CC7777...
...3333333333...
...3........3...
...3........3...
...3........3...
...3........3...
...3........3...
..333......333..
................`],
  [box, bitmap`
................
.LLC99999999CLL.
.L1LC999999CL1L.
.CL1LC9999CL1LC.
.9CL1LC99CL1LC9.
.99CL1LCCL1LC99.
.999CL1LL1LC999.
.9999CL11LC9999.
.9999CL11LC9999.
.999CL1LL1LC999.
.99CL1LCCL1LC99.
.9CL1LC99CL1LC9.
.CL1LC9999CL1LC.
.L1LC999999CL1L.
.1LC99999999CLL.
................`],
  [char2, bitmap`
................
................
...0........0...
...0........0...
...0........0...
................
................
................
..0...00...00...
...0.0..0.0..0..
....0....0......
................
................
................
................`],
  [char3, bitmap`
................
................
.......DD.......
.......DD.......
.......DD.......
.......DD.......
.......DD.......
..DDDDDDDDDDDD..
..DDDDDDDDDDDD..
.......DD.......
.......DD.......
.......DD.......
.......DD.......
.......DD.......
................
................`],
  [char4, bitmap`
................
....LLLLLLLL....
...LLLLL1LLLL...
..LLLLLLL1LLLL..
.LLL11LLLLLLLLL.
.LLL1LLL1LLLLLL.
.LLLLLLL11L11LL.
.L1LLLLLLLLL1LL.
.L1LL1LLLLLLLLL.
.LLLLLLL1LL1LLL.
.LLLLLLL11LLLLL.
.LLL111LLLL1LLL.
..LLLLLLLLL1LL..
...LLLLL11LLL...
....LLLLLLLL....
................`],
  [char5, bitmap`
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
  [woodWall, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
C99C99999CCC9999
9C99CC99C999999C
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
9C99CC9999C99C99
C99C999C999C999C
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
C999CC99999C999C
CC9999CCC9CC9C99
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
999C9C9999C9999C
C99999C999C99C99`],
  [stoneWall, bitmap`
LLLL1LLLL1LLLL1L
LLLL1LLLL1LLLL1L
1111111111111111
1LLLL1LLLL1LLLL1
1LLLL1LLLL1LLLL1
1111111111111111
LLLL1LLLL1LLLL1L
LLLL1LLLL1LLLL1L
1111111111111111
1LLLL1LLLL1LLLL1
1LLLL1LLLL1LLLL1
1111111111111111
LLLL1LLLL1LLLL1L
LLLL1LLLL1LLLL1L
1111111111111111
1LLLL1LLLL1LLLL1`],
  [flower, bitmap`
................
................
....33333333....
...3333333333...
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
....33333333....
................
................
................`],
  [door, bitmap`
.......9C.......
.......CC.......
.......CC.......
.......CC.......
.......CC.......
.......9C.......
.......9C.......
.....6.99.6.....
.....66CC66.....
.......CC.......
.......CC.......
.......C9.......
.......CC.......
.......9C.......
.......9C.......
.......CC.......`],
  [door2, bitmap`
................
................
................
................
................
.......66.......
.......6........
CCCC9CCC9CCCCCCC
C99CCCCC999CCCC9
.......6........
.......66.......
................
................
................
................
................`],
  [lock, bitmap`
................
................
................
.....000000.....
....00000000....
...0000000000...
...00001L0000...
...00001L0000...
...00001L0000...
...00000L0000...
...0000000000...
....00000000....
.....000000.....
................
................
................`],
  [key, bitmap`
................
................
................
.....66666......
.....6...6......
.....6...6......
.....6...6......
.....66666......
.......6........
.......6........
.......666......
.......6........
.......666......
................
................
................`],
  [doorUnlocked, bitmap`
.......9C.......
.......CC.......
.......CC.......
.......CC.......
.......CC.......
.......9C.......
.......9C.......
.....6.99.6.....
.....66CC66.....
.......CC.......
.......CC.......
.......C9.......
.......CC.......
.......9C.......
.......9C.......
.......CC.......`], // Duplicate of door
  [door2Unlocked, bitmap`
................
................
................
................
................
.......66.......
.......6........
CCCC9CCC9CCCCCCC
C99CCCCC999CCCC9
.......6........
.......66.......
................
................
................
................
................`], // Duplicate of door2
  [lamp, bitmap`
................
................
.......33.......
......3333......
......3333......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
................`],
  [plant, bitmap`
................
................
.......33.......
......3333......
......3333......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
................`],
  [table, bitmap`
................
................
.......33.......
......3333......
......3333......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
................`]
);

setSolids([char1, char5, door, door2, woodWall, stoneWall, box]);

let level = 0;
const levels = [
  map`
wwwwwwwwwwwwwwwwww
w..........1..w.4w
w........w....w2.w
w...w...wwwwwww..w
w...w...w...w....w
w3..w.2.w...w.wwww
ww.wwwwww...w..3.w
.w...w.2....w....w
.w...w...w..www.ww
.w.2.w...w..2...w.
.w...w...w......w.
.w.......w3...2.w.
.w......3wwwwwwww.
.wwwwwwwww........`,
  map`
wwwwwwwwwwwwwwwwww
w1.w......2w..3..w
w..w..w....w.....w
w.....w....w..w..w
wwwwwww2......w..w
w3....wwwwwwwww..w
w...........2....w
w..w..2..........w
w..wwwwwwwwwwwwwww
w......3.w.....www
w.2......w.2.....w
w...w........w...w
w..ww..2....ww.4.w
wwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwww
w1....2....w
w..k.....l.w
wwwwwwwwwhww
w..dl......w
w..w.2.w...w
w..wwwww...w
w..w.2.....w
w..w.......w
w..ww.wwwwww
w..ww......w
w..ww...2.kw
w.4wwwwwwwww
wwwwwwwwwwww`,
  map`
5555555555666666666
51.2.5...5........6
5.k.ld...u....2...6
5555555.5566666.666
57....2..56..6....6
5.l......5k..b..2.6
55h55555556..6....6
5........56..6.3.k6
555555.555666666666
5...b...bb6....6.46
5k..b..bbb6.3.ld..6
55555v55556....6666
5......2.ld.......6
5.........6.....3.6
5.........6.......6
5555555555666666666`,
  map`
66666666666666666666666666666
61..............6.......6...6
666666.66666666.6.66666.6.6.6
6......6........6.6.....6.6.6
6.666666.66666666.6.66666.6.6
6........6........6.......6.6
66666.66.6.6666666666666666v6
6.....66.6.6...6......ld.67.6
6k666666.6.6.6.6.6666666.6k.6
666......6...6.6.66......6..6
66l.66666666.6.6..6.666666..6
66h66......6.6.66.6.66222d..6
6..6..666..6.6..6.6..66666666
6.66..6....6.66.6.66b.b..6..6
6.6..666.666..6.6..6..6..b..6
6.6.66w6......6.66.6..6..6..6
6...6ww66666666....6..6..6.46
66666wwwwww...666666666666666`,
  map`
55555555555555555555
51.b.5...........5k5
555.55.........5b..5
.b.b5..........5.555
5.5.5..........555.5
5b5555.............5
5..b.5.............5
5.5.55.............5
555.55.............5
ww5..5.............5
ww5.b...........b.b5
ww5.b.5........b.5.5
ww5..55.......5.5555
ww5..55..5....5.ld45
ww555555555555555555`
];

let currentTune = bgmusic1;
let musicInterval = null;

const playBackgroundMusic = (tune) => {
  if (musicInterval) {
    clearInterval(musicInterval);
  }
  currentTune = tune;
  playTune(tune);
  musicInterval = setInterval(() => {
    playTune(tune);
  }, 4000); // Adjust timing based on tune length
};

const updateHPDisplay = () => {
  clearText();
  addText(`HP: ${hp}`, { y: 0, color: color`7` });
};

setMap(levels[level]);
setPushables({
  [char1]: [box]
});

playBackgroundMusic(bgmusic1); // Initial background music
updateHPDisplay(); // Initial HP display

const moveCharacter = (char, dx, dy) => {
  const character = getFirst(char);
  character.x += dx;
  character.y += dy;
};

// INPUTS
onInput("w", () => moveCharacter(char1, 0, -1));
onInput("a", () => moveCharacter(char1, -1, 0));
onInput("s", () => moveCharacter(char1, 0, 1));
onInput("d", () => moveCharacter(char1, 1, 0));
onInput("j", () => setMap(levels[level]));

const onCollect = (keynum) => {
  getAll(key)[keynum].remove();
};

const pickUp = (item1, item2) => {
  return tilesWith(item1, item2);
};

let touchingLock = false;

const unlockDoor = (lockTile) => {
  const adjacentTiles = [
    { x: lockTile.x + 1, y: lockTile.y },
    { x: lockTile.x - 1, y: lockTile.y },
    { x: lockTile.x, y: lockTile.y + 1 },
    { x: lockTile.x, y: lockTile.y - 1 }
  ];

  adjacentTiles.forEach(tile => {
    const doorTile = getTile(tile.x, tile.y).find(t => t.type === door);
    if (doorTile) {
      doorTile.remove(); // Remove the door
      addSprite(tile.x, tile.y, doorUnlocked); // Add unlocked door
    }
    const door2Tile = getTile(tile.x, tile.y).find(t => t.type === door2);
    if (door2Tile) {
      door2Tile.remove(); // Remove the door2
      addSprite(tile.x, tile.y, door2Unlocked); // Add unlocked door2
    }
  });
};
const decreaseHP = () => {
  hp--;
  playTune(hurtSfx); // Play hurt sound effect
  updateHPDisplay(); // Update HP display
  if (hp <= 0) {
    setMap(levels[level]); // Reset the level
    hp = 3; // Reset HP
    updateHPDisplay(); // Reset HP display
  }
};

const increaseHP = () => {
  if (hp < 3) {
    hp++;
    playTune(healSfx); // Play healing sound effect
    updateHPDisplay(); // Update HP display
  }
};

afterInput(() => {
  const numberOfGoalsCovered = tilesWith(char1, char4);
  if (numberOfGoalsCovered.length > 0) {
    level++;
    if (level < levels.length) {
      setMap(levels[level]);
      playBackgroundMusic(bgmusic2); // Switch to action music
    } else {
      addText("you win!", { y: 4, color: color`7` });
      if (musicInterval) {
        clearInterval(musicInterval);
      }
      playTune(winMelody); // Play win melody once
    }
  }

  // Check if player is on the same tile as the key
  const playerOnKey = tilesWith(char1, key);
  if (playerOnKey.length > 0) {
    playerOnKey.forEach(tile => {
      tile[1].remove(); // Remove the key
      doorUnlck++; // Increment doorUnlck
      playTune(keysfx); // Play key sound effect
    });
  }

  // Check if player is touching a lock
  const playerOnLock = tilesWith(char1, lock);
  if (playerOnLock.length > 0 && doorUnlck > 0) {
    touchingLock = true;
    addText("Press L to unlock door", { y: 1, color: color`7` });
  } else {
    touchingLock = false;
  }

  // Check if player is touching char2
  const playerOnChar2 = tilesWith(char1, char2);
  if (playerOnChar2.length > 0) {
    decreaseHP(); // Decrease HP
  }

  // Check if player is touching char3
  const playerOnChar3 = tilesWith(char1, char3);
  if (playerOnChar3.length > 0) {
    playerOnChar3.forEach(tile => {
      tile[1].remove(); // Remove char3
    });
    increaseHP(); // Increase HP
  }

  if (level > 1 && doorUnlck >= 10) {
    onCollect(doorUnlck);
    doorUnlck++;
  }
});

onInput("l", () => {
  if (touchingLock && doorUnlck > 0) {
    const playerOnLock = tilesWith(char1, lock);
    playerOnLock.forEach(tile => {
      tile[1].remove(); // Remove the lock
      unlockDoor(tile[1]); // Make the adjacent door walkthrough
      playTune(locksfx); // Play lock sound effect
    });
    doorUnlck--; // Decrement doorUnlck
    clearText(); // Clear the text
    updateHPDisplay(); // Update HP display
  }
});
