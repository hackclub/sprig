/*
@title: Parkour-Course
@author: OneForFreedom
@description: Push crates all the way to the end, into the underworld. push the final box and complete the game. 
@tags: [platformer, parkour, physics]
@addedOn: 2025-10-18
*/


const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const red = "r";
const melting = "m";
const blk = "k";
const lava = "a";

setLegend(
  [ player, bitmap`
................
................
................
...0............
....0000........
....0...........
....0000........
...000000.......
...000000.......
...000000.......
...0LLLL0.......
...200002.......
....0.00........
....0..0........
....0..0........
....0..0........`],
  [ box, bitmap`
................
................
................
..00000000000...
..00CCCCCCCC0...
..0C0CC0C00C0...
..0C00CCCC0C0...
..0C0C0CCCCC0...
..0C0CC0CC0C0...
..0CCCCC0C0C0...
..0C0CCCC00C0...
..0C00C0CC0C0...
..0CCCCCCCC00...
..00000000000...
................
................`],
  [ goal, bitmap`
................
................
................
................
.......0000.....
......055550....
.....05555550...
.....05577550...
.....05577550...
.....05555550...
......055550....
.......0000.....
................
................
................
................`],
  [ wall, bitmap`
0110001110000000
0000000000001100
00111LLL11LLLL00
00LLLLLLLLLLLL00
00LL11111111LL00
01LL11111111LL01
01LL1LLLL1L1LL01
01LL111LLL11LL01
01LL111LLL11LL00
00LL11L1LL11LL00
00LL11111111LL00
00LL11111111LL00
01LLLLLLLLLLLL00
01LLLLLLLLLLLL10
0000000000000010
0011001100011100`],
  [ red, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [ melting, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333033330333333
3303003300330333
3300003000300333
3000000000000033
3000000000000003
0000000000000000
0000000000000000`],
  [ blk, bitmap`
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
  [ lava, bitmap`
3363333333333333
3663333333333363
3936666333366669
3333333666699999
3333366663333399
9999699996333933
3996633339666663
3369333366669999
3366666633693333
3363399996993336
9999333336396663
6339993336363399
6666399363693333
3666666666666666
3633633333366666
3666333666633333`]
  );

let level = 0;
const levels = [
  map`
pb.g`,
  map`
p...a
wwwbw
a....
a....
w.www
....a
....a
www.w
a....
a....
..www
....g`,
  map`
waaaaaap.aaaaaaaww
wwaaaaaabaaaaaawww
wwwaaaa..aaaaa...w
wwwwaaa..........w
w...aaaaaaaaaaa..w
w................w
w..........aaa...w
wwwaaaaaa..aaawwww
wwwaaaaaa..aaawwww
wwwa.......aaawwww
wwwa.......aaawwww
wwwa..aaa..aaawwww
wwwa..aaaaaaaawwww
wwwa......aaaaaaaw
wwwa.......aaaaaaw
wwwaaaaa........gw
wwwwwwwaaaaaaaaaaw
wwwwwwwwwwwwwwwwww`,
  map`
paa.....
.aawb.bb
.aw.bbb.
.w..baab
....baag`,
  map`
bg.bggb
.b.b.b.
...g...
bbgpgbb
g..g..g
.b.b.b.
bg.bggb`,
  map`
ppppppp
.......
bbbbbbb
.......
bbbbbbb
ggggggg
ggggggg`,
  map`
...w.....g
p..w..w...
.b....waww
aaaw..waww
wwwwwwwwww
...w.....g
p..w..w...
.b....waww
aaaw..waww
wwwwwwwwww
...w.....g
p..w..w...
.b....waww
aaaw..waww
wwwwwwwwww
...w.....g
p..w..w...
.b....waww
aaaw..waww
wwwwwwwwww
...w.....g
p..w..w...
.b....waww
aaaw..waww
wwwwwwwwww
...w.....g
p..w..w...
.b....waww
aaaw..waww
wwwwwwwwww`,
  map`
..a......g
p.a.......
.b........
..a.......
wwwwwwwwww
.........g
p..a......
.b........
...a......
wwwwwwwwww
....aa...g
p........a
.b....a..a
......a...
wwwwwwwwww
......a..g
p.........
.b........
.......aaa
wwwwwwwwww`,
  map`
p.w.....wg....w.....
.bw.....w..b..w.....
..w..w..w..w..w..w..
..w..w..w..w..w..w..
..w..w..w..w..w..w..
..w..w..w..w..w..w..
..w..w..w..w..w..w..
..w..w..w..w..w..w..
..w..w..w..w..w..w..
..w..w..w..w..w..w..
.....w.....w..b..w.g
.....w.....w.....w.g`,
  map`
...........................
...........................
...........................
.....aaaaaaa..a...a..a.....
........a......a.a...a.....
........a.......a....a.....
.b......a.......a..........
p.......a.......a....a....g`,
  map`
rrrrrrrrrrrrrrrrrrrrrrrrrrm
rrrrrrrrrrrrrrrrrrrrrrrrmmb
rrrrrrrrrrrrrrrrrrrrrrrmkbb
mmmmmmrrrmmmmrmrmmmrrrmkbbb
kkkkkkmmrkkkkmkmkkkmrmkbbbb
kkkkkkkkmkbkkkkkkkbkmkbbbbb
kkkkkkkkkbbbkkbkkbbbkbbbbbb
kkkkkkkkbbbbbbbbbbbbbbbbbbb
p..b.g.bbbbbbbbbbbbbbbbbbbb`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall, blk ]);

setPushables({
    [player]: [ box ],
    [box]: [ box ]
});

onInput("s", () => {
  getAll(player).forEach(sprite => {
      sprite.y += 1;
  });
});

onInput("d", () => {
  getAll(player).forEach(sprite => {
      sprite.x += 1;
  });
});

onInput("w", () => {
  getAll(player).forEach(sprite => {
      sprite.y -= 1;
  });
});

onInput("a", () => {
  getAll(player).forEach(sprite => {
      sprite.x -= 1;
  });
});

function checkCollisionWithLava() {
    const playerSprites = getAll(player);
    const boxSprites = getAll(box);

    const allSprites = playerSprites.concat(boxSprites);

    allSprites.forEach(sprite => {
        const tiles = getTile(sprite.x, sprite.y);
        if (tiles.some(tile => tile.type === lava)) {
            resetLevel();
        }
    });
}

function resetLevel() {
    clearText("");
    setMap(levels[level]);
}


onInput("j", () => {
  resetLevel();
    });

onInput("l", () => { // this is intentional
  resetLevel();
    });

function moveBackLevel() {
  level = Math.max(level - 1, 0);
  setMap(levels[level]);
}

function moveForwardLevel() {
  level = Math.min(level + 1, levels.length - 1);
  setMap(levels[level]);
}

onInput("k", () => {
  moveForwardLevel();
});

onInput("i", () => {
  moveBackLevel();
});

afterInput(() => {
    checkCollisionWithLava();

    const targetNumber = tilesWith(goal).length;
    const numberCovered = tilesWith(goal, box).length;

    if (numberCovered === targetNumber) {
        level++;

        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("Game Complete!", { y: 1, color: color`2`, width: 14 });
            addText("Thanks for playing! <3", { y: 3, color: color`2`, width: 14 });
            addText("By One For Freedom!", { y: 13, color: color`2`, width: 14 });
        }
    }
});
