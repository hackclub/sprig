/* 
@title: The Ambitious Ape Maze Game
@author: atharv gupta
@tags: ['puzzle']
@addedOn: 2024-05-28
@img: ""
*/

const player = "p";
const wall = "w";
const goal = "g";
const key = "k";
const lock = "l";
const box = "b";

setLegend(
  [player, bitmap`
.....CCCCCCC....
.....C99999C....
.....C9C9C9C....
....CC99999C....
...CCC99C99CC...
...CCC99999CCC..
..CC9CCCCCCC9C..
..C9999999999C.C
..C99C99999C9CC9
..CC9CC999CC9C9.
...C99C999C99C..
...CC9999999CC..
....CC999CCCC...
.....CCCCC......
................`],
  [wall, bitmap`
................
................
................
................
...D.4.D.4.D....
...D.4.D.4.D....
..444D4D4D444...
...D.4.D.4.D....
...D.4.D.4.D....
..D4D4D4D4D4D...
...D.4.D.4.D....
..4D4D444D444...
...D.4.D.4.D....
................
................
................`],
  [goal, bitmap`
................
................
................
................
.......LL.......
......LLFL......
......LFLL......
.....LFLFLL.....
.....LLFLFLF....
.....LFLFLFL....
....LFLFLFLF....
...LFLFLFLFLL...
...FLFLLLFLLF...
................
................
................`],
  [key, bitmap`
................
................
................
................
................
............6666
..6666.....66676
..6776.....6.666
..6776666666.6.6
..67766......6.6
..6666..........
................
................
................
................
................`],
  [lock, bitmap`
................
................
................
................
.....555555.....
....55777755....
....57777775....
...5555555555...
..55777777775...
..57777577775...
..57777577775...
..55777557755...
...555777755....
.....555555.....
................
................`],
  [box, bitmap`
................
................
................
................
.....0000000....
.....0LLLLL0....
.....0L111L0....
.....0L121L0....
.....0L111L0....
.....0LLLLL0....
.....0000000....
................
................
................
................
................`]
);

const melody1 = tune`
500,
500: C5~500,
15000`;
const melody2 = tune`
500,
500: D4^500,
15000`;
const melody3 = tune`
500,
500: B4~500,
15000`;
const melody4 = tune`
500,
500: E5^500,
15000`;

setSolids([player, wall, box, lock]);

let level = 0;
const levels = [
  map`
pw
.g`,
  map`
pw
..
wg`,
  map`
p.w
wb.
w.g`,
  map`
p.ww
.bkw
.b.w
..lg`,
  map`
wkw.lg
.b.blw
...b.w
.wwkww
pwwwww`,
  map`
p..b.ww
wwb.wwk
ww.b...
ww..www
ww...ww
wlbw..w
gl.ww.k`,
  map`
pl..b.ww
bwww.www
.www.www
.b...kww
...ww.ww
ww.ww.ww
...w..ww
.w.ww.lw
kwwwwwgw`,
  map`
p.w.....wwwwwk
.bwbww..www.w.
.ww.wkbw......
.wwwww.wwb.w..
.wwww.....ww.b
.w....www.wwb.
...bwwwww.ww.w
.bwwkw......bw
b.wwwwwwwwwlww
.wwwwwwwwww.ww
kwwwwwwwgl....`,
  map`
kwwgll.w...wk
..wwwlw.w.bb.
.bwwl.....bw.
..ww.wwwwwbw.
w.b..w.....w.
w.b..wwbb.w..
..b...wpw.w..
..ww....ww.b.
..wwbbb.....b
.bww...ww..b.
.bwwww.bwww..
kwwwkwwb.kwwk`

];

setPushables({
  [player]: [box],
  [box]: [box]
});


onInput("w", () => {
  getFirst(player).y -= 1;
  playTune(melody1);
});

onInput("a", () => {
  getFirst(player).x -= 1;
  playTune(melody2);
});

onInput("s", () => {
  getFirst(player).y += 1;
  playTune(melody3);
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(melody4);
});

setMap(levels[level]);


onInput("j", () => {
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  const goalsCovered = tilesWith(player, goal);

  if (goalsCovered.length >= 1) {
    level = level + 1;
    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }

  const keysTaken = tilesWith(player, key);

  if (keysTaken.length >= 1) {
    getFirst(lock).remove();
    let playguy = getFirst(player)
    getTile(playguy.x, playguy.y)[1].remove();
  }
});
