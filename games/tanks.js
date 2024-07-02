/*
Shoot your projectile at the other tank before they get you!

@title: Tanks
@author: Om Raheja
@tags: ['two-player', 'fighting', 'pvp']
@addedOn: 2024-06-30
*/

const player = "a";
const player2 = "b";
const wall = "w";
const projectile = "p";

const playerBitmap = bitmap`
................
................
................
...0000000......
..0DDDDDDD0...00
.0D00DD0DD000000
.0DDDDDDDDD0..00
.0000000000.....
0DD34343400.....
000000000000....
00DFCD0FCD0F0...
.0FDF0FDF0FDF0..
..0F0DCF0DCF0...
...000000000....
................
................`;
const player2Bitmap = bitmap`
................
................
................
......0000000...
00...099999990..
000000990990090.
00..09999999990.
.....0000000000.
.....00434343990
....000000000000
...0F09CF09CF900
..0F9F0F9F0F9F0.
...0FC90FC90F0..
....000000000...
................
................`;
const wallBitmap = bitmap`
10LLLLLLLLLLLL01
010LLLLLLLLLL010
L010LLLLLLLL010L
LL010LLLLLL010LL
LLL010LLLL010LLL
LLLL01022010LLLL
LLLLL010010LLLLL
LLLLL201102LLLLL
LLLLL201102LLLLL
LLLLL010010LLLLL
LLLL01022010LLLL
LLL010LLLL010LLL
LL010LLLLLL010LL
L010LLLLLLLL010L
010LLLLLLLLLL010
10LLLLLLLLLLLL01`;
const projectileBitmap = bitmap`
................
................
................
................
................
................
......LLLL......
......LL0L......
......L0LL......
......LLLL......
................
................
................
................
................
................`;

setLegend(
  [player, playerBitmap],
  [player2, player2Bitmap],
  [wall, wallBitmap],
  [projectile, projectileBitmap]
);

setSolids([player, player2, wall, projectile]);

// level 0 is the game, level 1 is end screen
let level = 0
const levels = [
  map`
a.........
..........
..w..ww...
..w.......
..w.......
.....b....
...www....
..........`,
  map`
wwwww
wwwww
wwwww
wwwww
wwwww`
]

setMap(levels[level])

// direction of the tanks
var direction1 = ">";
var direction2 = "<";

// holds all the flying bullets
var projEntities = [];

function addProjectile(x, y, direction) {
  if (level != 1) {
    setLegend([projectile, projectileBitmap]);

    if (x >= 0 && x < width() && y >= 0 && y < height() && getTile(x, y).length <= 0) {
      projEntities.push([x, y, direction]);
      addSprite(x, y, projectile);
    }

    checkWinLose(x, y);
  }
}

function checkWinLose(x, y) {
  if (level != 1) {
    const loseMusic = tune`
283.0188679245283: B4~283.0188679245283,
283.0188679245283: C5~283.0188679245283,
283.0188679245283: D5~283.0188679245283,
283.0188679245283: D5~283.0188679245283,
283.0188679245283: C5~283.0188679245283,
283.0188679245283: B4~283.0188679245283,
283.0188679245283: A4~283.0188679245283,
283.0188679245283: G4~283.0188679245283 + E4-283.0188679245283,
283.0188679245283: G4~283.0188679245283 + E4-283.0188679245283,
283.0188679245283: A4~283.0188679245283,
283.0188679245283: B4~283.0188679245283,
283.0188679245283: B4~283.0188679245283,
283.0188679245283: A4~283.0188679245283 + E4-283.0188679245283,
283.0188679245283: A4~283.0188679245283 + E4-283.0188679245283,
283.0188679245283: B4~283.0188679245283,
283.0188679245283: C5~283.0188679245283,
283.0188679245283: D5~283.0188679245283,
283.0188679245283: D5~283.0188679245283,
283.0188679245283: C5~283.0188679245283,
283.0188679245283: B4~283.0188679245283,
283.0188679245283: A4~283.0188679245283,
283.0188679245283: G4~283.0188679245283 + E4-283.0188679245283 + C4/283.0188679245283,
283.0188679245283: G4~283.0188679245283 + E4-283.0188679245283 + C4/283.0188679245283,
283.0188679245283: A4~283.0188679245283,
283.0188679245283: B4~283.0188679245283,
283.0188679245283: B4~283.0188679245283,
283.0188679245283: A4~283.0188679245283 + E4^283.0188679245283,
283.0188679245283: G4~283.0188679245283 + D4^283.0188679245283,
1132.0754716981132`;
    setLegend(
      [wall, wallBitmap],
      [projectile, projectileBitmap]);
    try {
      if (getFirst(player).x == x && getFirst(player).y == y) {
        level = 1;
        playTune(loseMusic);

        setMap(levels[level]);
        addText("ORANGE WIN", { x: 0, y: 0, color: color`9` });
        addText("ANY KEY TO CONT", { x: 0, y: 2, color: color`2` });
      } else if (getFirst(player2).x == x && getFirst(player2).y == y) {
        level = 1;
        playTune(loseMusic);

        setMap(levels[level]);
        addText("GREEN WIN", { x: 0, y: 0, color: color`4` });
        addText("ANY KEY TO CONT", { x: 0, y: 2, color: color`2` });
      }
    } catch (e) {}
  }
}

/* change direction */

onInput("w", () => {
  if (level != 1) {
    direction1 = "^";
    setLegend(
      [player, bitmap`
......0000......
......0000......
.......00.......
.......00.......
...00DD00DD00...
..C0DD0000DD0C..
..CDD0DDDD0DDC..
..CD0D0D0DD0DC..
..CD0DD0D0D0DC..
..CD0DDDDDD0DC..
..CDD0DDDD0DDC..
..CDDD0000DDDC..
..C0DDDDDDDD0C..
..C00DDDDDD00C..
..C0000000000C..
..C..........C..`]);
    try {
      addProjectile(getFirst(player).x, getFirst(player).y - 1, "^");
    } catch (e) {}
  }
})

onInput("s", () => {
  if (level != 1) {
    direction1 = ".";
    setLegend(
      [player, bitmap`
................
................
...00DDDDDD00...
..C0DDDDDDDD0C..
..CDDD0000DDDC..
..CDD0DDDD0DDC..
..CD0D0D0DD0DC..
..CD0DD0D0D0DC..
..CD0DDDDDD0DC..
..CDD0DDDD0DDC..
..C0DD0000DD0C..
..C00DD00DD00C..
..C0000000000C..
..C....00....C..
......0000......
......0000......`]);

    try {
      addProjectile(getFirst(player).x, getFirst(player).y + 1, ".");
    } catch (e) {}
  }
})

onInput('a', () => {
  if (level != 1) {
    direction1 = "<";
    setLegend(
      [player, bitmap`
................
................
................
......0000000...
00...0DDDDDDD0..
000000DD0DD00D0.
00..0DDDDDDDDD0.
.....0000000000.
.....00434343DD0
....000000000000
...0F0DCF0DCFD00
..0FDF0FDF0FDF0.
...0FCD0FCD0F0..
....000000000...
................
................`]);

    try {
      addProjectile(getFirst(player).x - 1, getFirst(player).y, "<");
    } catch (e) {}
  }
})

onInput('d', () => {
  if (level != 1) {
    direction1 = ">";
    setLegend(
      [player, bitmap`
................
................
................
...0000000......
..0DDDDDDD0...00
.0D00DD0DD000000
.0DDDDDDDDD0..00
.0000000000.....
0DD34343400.....
000000000000....
00DFCD0FCD0F0...
.0FDF0FDF0FDF0..
..0F0DCF0DCF0...
...000000000....
................
................`]);

    try {
      addProjectile(getFirst(player).x + 1, getFirst(player).y, ">");
    } catch (e) {}
  }
})

onInput("i", () => {
  if (level != 1) {
    direction2 = "^";
    setLegend(
      [player2, bitmap`
......0000......
......0000......
.......00.......
.......00.......
...0099009900...
..C0990000990C..
..C9909999099C..
..C9090909909C..
..C9099090909C..
..C9099999909C..
..C9909999099C..
..C9990000999C..
..C0999999990C..
..C0099999900C..
..C0000000000C..
..C..........C..`]);

    try {
      addProjectile(getFirst(player2).x, getFirst(player2).y - 1, "^");
    } catch (e) {}
  }
})

onInput('k', () => {
  if (level != 1) {
    direction2 = ".";
    setLegend(
      [player2, bitmap`
................
................
...0099999900...
..C0999999990C..
..C9990000999C..
..C9909999099C..
..C9090909909C..
..C9099090909C..
..C9099999909C..
..C9909999099C..
..C0990000990C..
..C0099009900C..
..C0000000000C..
..C....00....C..
......0000......
......0000......`]);

    try {
      addProjectile(getFirst(player2).x, getFirst(player2).y + 1, ".");
    } catch (e) {}
  }
})

onInput('j', () => {
  if (level != 1) {
    direction2 = "<";
    setLegend(
      [player2, bitmap`
................
................
................
......0000000...
00...099999990..
000000990990090.
00..09999999990.
.....0000000000.
.....00434343990
....000000000000
...0F09CF09CF900
..0F9F0F9F0F9F0.
...0FC90FC90F0..
....000000000...
................
................`]);

    try {
      addProjectile(getFirst(player2).x - 1, getFirst(player2).y, "<");
    } catch (e) {}
  }
})

onInput("l", () => {
  if (level != 1) {
    direction2 = ">";
    setLegend(
      [player2, bitmap`
................
................
................
...0000000......
..099999990...00
.090099099000000
.09999999990..00
.0000000000.....
09934343400.....
000000000000....
009FC90FC90F0...
.0F9F0F9F0F9F0..
..0F09CF09CF0...
...000000000....
................
................`]);

    try {
      addProjectile(getFirst(player2).x + 1, getFirst(player2).y, ">");
    } catch (e) {}
  }
})

// restart the game if the level is different
afterInput(() => {
  if (level == 1) {
    clearText();
    setLegend(
      [player, playerBitmap],
      [player2, player2Bitmap],
      [wall, wallBitmap],
      [projectile, projectileBitmap]
    );
    level = 0;
    setMap(levels[level]);
    direction1 = ">";
    direction2 = "<";
  }
});

// actually move the sprite in a forever loop
function run() {
  if (level == 0) {
    // projectiles go first
    setLegend(
      [projectile, projectileBitmap],
    );
    for (var i = 0; i < projEntities.length;) {
      clearTile(projEntities[i][0], projEntities[i][1]);
      switch (projEntities[i][2]) {
        case "^":
          projEntities[i][1] -= 1;
          break;
        case "<":
          projEntities[i][0] -= 1;
          break;
        case ">":
          projEntities[i][0] += 1;
          break;
        case ".":
          projEntities[i][1] += 1;
          break;
        default:
          break;
      }

      const x = projEntities[i][0];
      const y = projEntities[i][1];

      var items = getTile(x, y);

      checkWinLose(x, y);

      if (x < 0 || x >= width() || y < 0 || y >= height() || items.length > 0) {
        projEntities.splice(i, 1);

      } else {
        i++;
        addSprite(x, y, projectile);
      }
    }

    // process tank movement
    try {
      switch (direction1) {
        case "^":
          getFirst(player).y -= 1;
          break;
        case "<":
          getFirst(player).x -= 1;
          break;
        case ">":
          getFirst(player).x += 1;
          break;
        case ".":
          getFirst(player).y += 1;
          break;
        default:
          break;
      }
      switch (direction2) {
        case "^":
          getFirst(player2).y -= 1;
          break;
        case "<":
          getFirst(player2).x -= 1;
          break;
        case ">":
          getFirst(player2).x += 1;
          break;
        case ".":
          getFirst(player2).y += 1;
          break;
        default:
          break;
      }
    } catch (e) {}
  }
}

setInterval(run, 500);
