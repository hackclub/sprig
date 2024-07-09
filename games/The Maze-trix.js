/* 
@title: The Maze-trix
@author: Shayan
@tags: []
*/

const player = "p";
const wall = "w";
const goal = "g";
const key = "k";
const keyBox = "b";
const placeBeforeKey = "d";
const box = "j";
const l = "l";

setLegend(
  [player, bitmap`
................
................
.....66666......
....6666666.....
...666666666....
...660660666....
...666666666....
...606666066....
...660000666....
....6666666.....
.....66666......
................
................
................
................
................`],
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
  [key, bitmap`
................
.....6666666....
.....6666666....
.....66...66....
.....66...66....
.....66...66....
.....6666666....
.....6666666....
.......66.......
.......6666.....
.......66.......
.......6666.....
.......66.......
.......66.......
................
................`],
  [keyBox, bitmap`
..1..1..1..1..1.
1111111111111111
..1..1LLLL.1..1.
..1..LL.1LL1..1.
11111L1111L11111
..1..L..1.L1..1.
..1LLLLLLLLLL.1.
111LLLLLLLLLL111
..1LLLL22LLLL.1.
..1LLL2222LLL.1.
111LLL2222LLL111
..1LLLL22LLLL.1.
..1LLLL22LLLL.1.
111LLLLLLLLLL111
..1..1..1..1..1.
..1..1..1..1..1.`],
  [goal, bitmap`
.....444444.....
....44DDDD44....
...44DDDDDD44...
..4DDDDDDDDDD4..
.44DDDDDDDDDD44.
44DDDDDDDDDDDD44
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
44DDDDDDDDDDDD44
.44DDDDDDDDDD44.
..4DDDDDDDDDD4..
...44DDDDDD44...
....44DDDD44....
.....444444.....`],
  [placeBeforeKey, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [box, bitmap`
LLLLLLLLLLLLLLLL
LL111111111111LL
L1L1111111111L1L
L11L11111111L11L
L111L111111L111L
L1111L1111L1111L
L11111L11L11111L
L111111LL111111L
L111111LL111111L
L11111L11L11111L
L1111LL111L1111L
L111L111111L111L
L11L11111111L11L
L1L1111111111L1L
LL111111111111LL
LLLLLLLLLLLLLLLL`],
  [l, bitmap `
................
..0000.......000
..0LL0.......0..
..0LL0.......0..
..0LL0.......0..
..0LL0.......0..
..0LL0.......0..
..0LL0.......0..
..0LL0.......0..
..0LL0.......0..
..0LL000000..0..
..0LLLLLLL0..0..
..0LLLLLLL0..0..
..000000000..000
................
................`],
);

setSolids([player, wall, keyBox, box]);

let level = 0
const levels = [
  map`
....
.ww.
.wg.
pw..`,
  map`
w...wp..
w.w.www.
w.w..gw.
wbwwwww.
........
www.www.
kww...w.
......w.`,
  map`
.wk.......
.wwwwwwww.
..........
jw.....www
.wwwwwbw.g
.....w.w.w
wwww.w.w.w
w.pw.w.w.w
w.ww.w.w.w
w....w...w`,
]

setMap(levels[level])

setPushables({
  [player]: [box],
  [box]: [box],
})
//Player Controls
onInput("w", () => {
  getFirst(player).y -= 1
});
onInput("a", () => {
  getFirst(player).x -= 1
});
onInput("s", () => {
  getFirst(player).y += 1
});

onInput("d", () => {
  getFirst(player).x += 1;
  clearText();
});

//key-check
let haveKey = false;
// these get run after every input
afterInput(() => {
  const goalsCovered = tilesWith(player, goal); // tiles that both contain the player and goal
  const keyCollected = tilesWith(player, key);
  const openLockedGate = tilesWith(player, placeBeforeKey);
  // if at least one goal is overlapping with a player, proceed to the next level
  if (goalsCovered.length >= 1) {
    // increase the current level number
    level = level + 1;

    // check if current level number is valid
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("You Win!", { x: 6, y: 5, color: color`9` });
    }
  }
  if (keyCollected.length >= 1) {
    getFirst(key).remove();
    getFirst(keyBox).remove();
    haveKey = true;
    addText("Door Unlocked!", { x: 6, y: 5, color: color`7` })
  }
});