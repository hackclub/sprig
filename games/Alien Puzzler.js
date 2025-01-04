const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const spike = "z";

// assign bitmap art to each sprite 
setLegend(       
  [player, bitmap`
................
...0000000000...
...0444444440...
...0433343330...
...0444444440...
...0444444440...
...0000440000...
......00000.....
...00004440.....
...04044440.....
...04044440.....
...04044440.....
...04044440.....
...00000000.....
.....040040.....
.....000000.....`],
  [box, bitmap`
................
................
................
...66666666666..
...66666606666..
...60000000006..
...60666606666..
...60000000006..
...66666606606..
...66666606606..
...60000000006..
...66666606666..
...66666666666..
...66666666666..
................
................`],
  [goal, bitmap`
....00000000....
...0066666600...
...0666666660...
..006666666600..
.00666666666600.
.00000000000000.
.03333333333330.
.03003333333330.
.03003333333330.
.03333000003330.
.033330FFF03330.
.033330FFF03330.
.033330FFF03330.
.033330FFF03330.
.00000000000000.
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
  [spike, bitmap`
................
................
................
................
................
................
................
................
.......3........
......333.......
......333.......
.....33333......
....3333333.....
....3333333.....
...333333333....
................`]
);


let level = 0;
const levels = [
  map`
.....g
.b.pz.
......
......
......`,
  map`
....g
..zb.
p....
.....
.....`,
  map`
.......www
.www.w....
w..w..www.
w..ww.w...
ww.ww.www.
ww.wwbw...
ww.w.gw.ww
w..wwww..w
p.......ww
wwwwww.www`,
  map`
.....
pb...
ww...
.....
...g.`,
  map`
..zzz.
.wg...
..bpz.
..z.z.
......`,
  map`
...www..
p..b....
.....w..
.ww.....
.wg..w..`,
  map`
w......
pb.ww..
w.....w
gwwww.w
.w....w
.w.....
...w.w.
.......
w......`,
  map`
...w...
.....ww
.b.w.wg
..pw.w.
w.ww.z.
.......
.......`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w....................................w
w....................................w
w....................................w
w....................................w
w....................................w
w....................................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
g.....................................
wwww.w.www.w...ww..wwwww.wwwwwww.www..
.w.w.w.w.w.ww..ww.w.w....w..w..w.w.w..
.w.www.www.w.wwwww..wwww.wwww..w.www..
.w.w.www.www..www.w....w.w..w..w.w.w..
.w.w.ww...ww...ww..wwwww.w..wwww.w..w.
......................................
.wwww.....w.ww...wwwwww..w.wwww..w....
.w.ww....www..w.w..w.www.w.w.....w....
.wwww...ww.ww..w...w.w.wwww......w....
.w..w...wwwww..w...w.w.wwww..www......
.w..w...w...w..w...w.w...www..w..w....
.w..wwwww...w..w..wwww...w.wwww.......
......................................
.pb..................................w
.....................................w`
];


let currentLevel = levels[level];
setMap(currentLevel);

setSolids([player, box, wall]);

setPushables({
  [player]: [box],
  [box]: [box],
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("j", () => {
  currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  const playerSprite = getFirst(player);
  const spikeTiles = tilesWith(spike);
  const targetNumber = tilesWith(goal).length;
  const numberCovered = tilesWith(goal, box).length;

  spikeTiles.forEach(tile => {
    if (tile.some(sprite => sprite === playerSprite)) {
      // Player touched a spike, perform game over logic
      playerSprite.remove();
      addText("Game Over!", { y: 4, color: color`3` });
    }
  });

  if (numberCovered === targetNumber) {
    level += 1;

    if (levels[level] !== undefined) {
      setMap(levels[level]);
    } else {
      addText("Good Job!", { y: 4, color: color`3` });
    }
  }
});
