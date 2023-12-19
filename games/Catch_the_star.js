const reindeer = "p";
const grass = "g";
const star = "h";
const bg = "b";
const gift ="r"; //the og gift
const red ="k"; //the red gift
const blue ="l"; //the blue gift
const purple ="u"; //the purple gift

setLegend(
  [ reindeer, bitmap`
................
.......0........
.......00.......
........0CC.....
........CCCC....
.......CCC0CC3..
........C8CCC...
........CCCC....
........333.....
.....CCCCCC6....
....CCCCCCC.....
...CCCCCCCC.....
....CC...CC.....
....CC...CC.....
....00...00.....
................`],
  [ grass, bitmap`
DDDDDDDDDD44444D
DD4444DDD4DDDDD4
D4DDDD4D4DDDDDDD
D4DDDDD4444DDDDD
D4DDDDD4DDD44DDD
4DDDDDD4DDDDD4DD
DDDDDDD4DDDDD4D4
DDD44D4DDDDDDD4D
DDD444DDDDD44DDD
DD4DDD4DDD4DD4DD
D4DDDDD4DD4DDD44
D4DDDDDD44DDDDDD
4DDDDDDDD4DD444D
DDDDDD44DDD4DDD4
44DDD4DD444DDDDD
DD4D4DDDDDDDDDDD`],
  [ star, bitmap`
................
................
................
.......99.......
......9669......
......9669......
...9996666999...
..966666666669..
..966606606669..
...9660660669...
....96666669....
....96666669....
....96699669....
.....99..99.....
................
................`],
  [ gift, bitmap`
................
................
................
................
.....333.333....
.....333.333....
...66663336666..
...66663336666..
...66663336666..
...66663336666..
...66663336666..
...66663336666..
...66663336666..
...66663336666..
...66663336666..
................`],
  [ bg, bitmap`
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
  [ red, bitmap`
................
................
....666..666....
....666..666....
..333336633333..
..333336633333..
..333336633333..
..333336633333..
..333336633333..
..333336633333..
..333336633333..
..333336633333..
..333336633333..
..333336633333..
................
................`],
  [ blue, bitmap`
................
................
....555..555....
....555..555....
..777775577777..
..777775577777..
..777775577777..
..777775577777..
..777775577777..
..777775577777..
..777775577777..
..777775577777..
..777775577777..
..777775577777..
................
................`],
  [ purple, bitmap`
................
................
....HHH..HHH....
....HHH..HHH....
..99999HH99999..
..99999HH99999..
..99999HH99999..
..99999HH99999..
..99999HH99999..
..99999HH99999..
..99999HH99999..
..99999HH99999..
..99999HH99999..
..99999HH99999..
................
................`],
);

setSolids([reindeer, grass])
setBackground(bg);

let level = 0;
const levelDimensions = [8, 8, 8, 8, 8];
const levels = [
  map`
gggggggg
gggggggg
gggggggg
gggggggg
gggggghg
ggggggbg
pbbbbbbg
gggggggg`,
  map`
pbbbbbbr
gggggggb
ggbbbbgb
ggbbbbgb
ggbbbbgb
gggggggb
gghbbbbr
gggggggg`,
  map`
pbbbbbbb
gggggggb
rbbbbrgb
bbbbgbgb
bbgbgbgb
bghbbbgb
bggggggb
bbbbbbbr`,
  map`
pbbbbbbb
bbgggggb
bbrbbbgb
bbbbbbbb
bgbbbbbr
bbgbbbbg
gbbbbbbh
bggbbrbb`,
  map`
pbbbbbbb
gbbbbbbb
rbbbbrgb
bbgbbbbb
bbbhgbbb
bgrbbrbb
bbbbbgbb
bbbbbbbb`,
];

const tunes = {
  start: tune`
113.20754716981132,
113.20754716981132: c4^113.20754716981132,
113.20754716981132: e4^113.20754716981132,
113.20754716981132: g4^113.20754716981132,
113.20754716981132: c5^113.20754716981132,
3056.603773584906`,
  reset: tune`
113.20754716981132,
113.20754716981132: c5^113.20754716981132,
113.20754716981132: c5^113.20754716981132,
113.20754716981132,
113.20754716981132: c4^113.20754716981132,
113.20754716981132: c4^113.20754716981132,
2943.396226415094`,
  win: tune`
113.20754716981132,
113.20754716981132: g4^113.20754716981132 + b4^113.20754716981132 + d5^113.20754716981132 + g5^113.20754716981132,
113.20754716981132: g4^113.20754716981132 + b4^113.20754716981132 + d5^113.20754716981132 + g5^113.20754716981132,
339.62264150943395,
113.20754716981132: c4^113.20754716981132 + e4^113.20754716981132 + g4^113.20754716981132 + c5^113.20754716981132,
113.20754716981132: c4^113.20754716981132 + e4^113.20754716981132 + g4^113.20754716981132 + c5^113.20754716981132,
113.20754716981132: c4^113.20754716981132 + e4^113.20754716981132 + g4^113.20754716981132 + c5^113.20754716981132,
113.20754716981132: c4^113.20754716981132 + e4^113.20754716981132 + g4^113.20754716981132 + c5^113.20754716981132,
2490.566037735849`,
  gift: tune`
113.20754716981132,
113.20754716981132: c5-113.20754716981132,
113.20754716981132: g4-113.20754716981132,
3283.0188679245284`,
};


function goTo(x, y) {
  const cur = getTile(x, y);
  if (cur.length && cur[0].type == grass) return false;
  if (cur.length && cur[0].type == gift) {
    cur[0].remove();
    playTune(tunes.gift);
  }
  getFirst(reindeer).x = x;
  getFirst(reindeer).y = y;
  return true;
}

onInput("s", () => {
  while (getFirst(reindeer).y + 1 < levelDimensions[level]) {
    if (!goTo(getFirst(reindeer).x, getFirst(reindeer).y + 1)) break;
  }
});

onInput("w", () => {
  while (getFirst(reindeer).y - 1 >= 0) {
    if (!goTo(getFirst(reindeer).x, getFirst(reindeer).y - 1)) break;
  }
});

onInput("a", () => {
  while (getFirst(reindeer).x - 1 >= 0) {
    if (!goTo(getFirst(reindeer).x - 1, getFirst(reindeer).y)) break;
  }
});

onInput("d", () => {
  while (getFirst(reindeer).x + 1 < levelDimensions[level]) {
    if (!goTo(getFirst(reindeer).x + 1, getFirst(reindeer).y)) break;
  }
});

onInput("j", () => {
  clearText();
  setMap(levels[level]);
  playTune(tunes.reset);
});

setMap(levels[level]);
addText("MOVE REINDEER!", { y: 1, color: color`0` });
addText("a=left  b=right", { y: 3, color: color`0` });
addText("w=up  s=down", { y: 5, color: color`0` });
playTune(tunes.start);

afterInput(() => {
  clearText();
  const numberCovered = tilesWith(reindeer, star).length;
  if (numberCovered === 1) {
    const giftsLeft = tilesWith(gift).length;
    if (giftsLeft !== 0) {
      addText("There are", { y: 6, color: color`0` });
      addText("still gifts!", { y: 7, color: color`0` });
      return;
    }
    
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
      playTune(tunes.start);
    } else {
      addText("YOU WIN!", { y: 4, color: color`0` });
      addText("TO RESET", { y: 6, color: color`0` });
    addText("PRESS J", { y: 7, color: color`0` });
      playTune(tunes.win);
    }
  }

  if (level == 0) {
    addText("REINDEER WALKS", { y: 5, color: color`0` });
    addText("UNTILL IT", { y: 6, color: color`0` });
    addText("REACHES GRASS!", { y: 7, color: color`0` });
  }

  if (level == 1) {
    addText("TO RESET", { y: 6, color: color`0` });
    addText("PRESS J", { y: 7, color: color`0` });
  }
});
