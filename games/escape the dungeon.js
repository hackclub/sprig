/*
@title: escape the dungeon
@author: luanderfarias
*/

const player = "p";
const floor = "f";
const frontwall = "w";
const leftwall = "l";
const door = "d";
const exit = "e";
const key = "k";
const doorshadow = "s"

setLegend(
  [ player, bitmap`
..LLLLLLLLLLLL..
..L1111111111L..
..L1LL1LL1LL1L..
..L1LL1LL1LL1L..
..L1LL1LL1LL1L..
..L1111111111L..
..LLLLLLLLLLLL..
...L11111111L...
..LLL111111LLL..
..L1LL1111LL1L..
..L11LLLLLL11L..
..L111L11L111L..
..L111LLLL111L..
..L111LLLL111L..
..L111L..L111L..
..LLLLL..LLLLL..`],
  [ frontwall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
L00000L000000000
LL00LLLL0000000L
LLLLLLLLLL0000LL
LLLLLLLLLLL00LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ leftwall, bitmap`
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
  [ door, bitmap`
..LLLLLLLLLLLL..
.LLLLLLLLLLLLLL.
LL000000000000LL
L00000000000000L
0000000000000000
0000000000000000
000LLLL66LLLL000
00LLLLL66LLLLL00
0LLLLLL66LLLLLL0
LL1LLL6666LLL1LL
L1LL1L6006L1LL1L
L1LL1L6006L1LL1L
L1LL1L6666L1LL1L
LL11LLL66LLL11LL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL`],
  [ exit, bitmap`
1122222222222211
1122222222222211
1122222222222211
1112222222222111
1111222222221111
.11111111111111.
..111111111111..
....11111111....
................
................
................
................
................
................
................
................`],
  [ floor, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [ key, bitmap`
................
................
................
................
................
..66666.........
.6666666........
.66...666666666.
.66...666666666.
.66...66..66.66.
.6666666..66.66.
..66666.........
................
................
................
................`],
  [ doorshadow, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
.00000000000000.
..000000000000..
...0000000000...
................
................
................
................
................
................
................
................`]
);

let level = 0;
const levels = [
  map`
lllllelllll
lwwwwdwwwwl
l....s....l
l.........l
l....p....l
l.........l
lk........l
wwwwwwwwwww`,
  map`
...
...
...`,
  map`
p.wg
.bw.
..w.
..w.`,
  map`
p...
...b
...b
.bbg`,
  map`
...
.p.
...`,
  map`
p.w.
.bwg
....
..bg`
];

const currentLevel = levels[level];
setMap(currentLevel);
setBackground(floor);

setSolids([ player, frontwall, leftwall, door ]);

setPushables({
  [player]: []
});

// START - PLAYER MOVEMENT CONTROLS
onInput("w", () => {
  getFirst(player).y += -1;
});

onInput("a", () => {
  getFirst(player).x += -1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

let havekey;

afterInput(() => {
  var pk1 = tilesWith(player, key);
  if (pk1.length){
    havekey = true;
    clearTile(1, 6);
    addSprite(1, 6, player)
  }

  var open = tilesWith(player, doorshadow);
  if (havekey == true && open.length) {
      clearTile(5, 1);
      clearTile(5, 2);
      addSprite(5, 2, player)
  }

  var nextlevel = tilesWith(player, exit);
    if (nextlevel.length) {
      let level;
      let currentLevel = levels[level];
      level = level + 1;
      addText("you escaped!", { y: 4, color: color`3` });
      clearTile(5, 1);
    }
});