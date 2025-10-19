/*
@title: Parkour Course Remake
@author: OneForFreedom
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
....L..L........`],
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
0000000000000000`]
  );
let level = 0;
const levels = [
  map`
pb.g`,
  map`
p....
wwwbw
.....
.....
w.www
.....
.....
www.w
.....
.....
..www
....g`,
  map`
wwwwwwwp.wwwwwwwww
wwwwwww.bwwwwwwwww
wwwwwww..www.....w
wwwwwww..........w
w.....wwwwwwwww..w
w................w
w..........www...w
wwwwwwwww..wwwwwww
wwwwwwwww..wwwwwww
wwww.......wwwwwww
wwww.......wwwwwww
wwww..www..wwwwwww
wwww..wwwwwwwwwwww
wwww......ww.....w
wwww.......wwwwwww
wwwwwwww........gw
wwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwww`,
  map`
pww.....
.wwwb.bb
.ww.bbb.
.ww.bbwb
....bbwg`,
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
.b....w.ww
...w..w.ww
wwwwwwwwww
...w.....g
p..w..w...
.b....w.ww
...w..w.ww
wwwwwwwwww
...w.....g
p..w..w...
.b....w.ww
...w..w.ww
wwwwwwwwww
...w.....g
p..w..w...
.b....w.ww
...w..w.ww
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
.....wwwwwww..w...w..w.....
........w......w.w...w.....
........w.......w....w.....
.b......w.......w..........
p.......w.......w....w....g`,
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


onInput("j", () => {
  const currentLevel = levels[level]; 


  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});


afterInput(() => {

  const targetNumber = tilesWith(goal).length;
  

  const numberCovered = tilesWith(goal, box).length;


  if (numberCovered === targetNumber) {
    level = level + 1;

    const currentLevel = levels[level];


    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("Game Complete!", { y: 1, color: color`2`, width: 14 });
      addText("Ty for playing! <3", { y: 3, color: color`2`, width: 14 });
      addText("By One For Freedom!", { y: 13, color: color`2`, width: 14 });
    }
  }
});
