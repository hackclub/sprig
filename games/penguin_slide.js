/*
@title: penguin_slide
@author: veehz
@tags: ['strategy']
@addedOn: 2022-09-08
*/

const player = "p";
const water = "w";
const ice = "i";
const target = "t";
const coin = "c";

setLegend(
  [
    player,
    bitmap`
5555555555555555
5555555555555555
5555555555555555
5555500000005555
5555022222220555
5555022222220555
5555022020220555
5555022262220555
5555022222220555
5550022222220055
5555022222220555
5555022222220555
5555506606605555
5555555555555555
5555555555555555
5555555555555555`,
  ],
  [
    water,
    bitmap`
5555555555555555
5555555555555555
5522222255555555
5555552222555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555552222225555
5555555555525255
5555555555552555
5555555555555555
5555555555555555
5555555555555555`,
  ],
  [
    target,
    bitmap`
5555555555555555
5555555555555555
5555666666665555
5555622222265555
5555622222265555
5555622222265555
5555622222265555
5555622222265555
5555622222265555
5555622222265555
5555622222265555
5555622222265555
5555622222265555
5555666666665555
5555555555555555
5555555555555555`,
  ],
  [
    ice,
    bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777227777
7772777777722227
7777727777777722
7777777777777777
7777777777777277
7722777777777727
7777777777777777
7777722777777777
7777772222777777
7777777772277777
7777772777777727
7777277777777777
7777777777777777`,
  ],
  [
    coin,
    bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555666555555
5555556666655555
5555566666665555
5555666LLL666555
5555666L66666555
5555666LLL666555
5555566666665555
5555556666655555
5555555666555555
5555555555555555
5555555555555555
5555555555555555`,
  ]
);

setSolids([player, ice]);
setBackground(water);

let level = 0;
const levelDimensions = [8, 8, 8, 8, 8];

const levels = [
  map`
p.......
iiiiiii.
i.i.i.i.
i...i.i.
i.i.i.i.
iiiiiii.
iit.....
iiiiiiii`,
  map`
p.......
iiiiiii.
......i.
....i.i.
..i.i.i.
.it...i.
.iiiiii.
........`,
  map`
p.......
..iiiii.
....c.i.
........
.i......
..i....i
i......t
.ii.....`,
  map`
p.......
i.......
c....ci.
..i.....
..cti...
.ic..c..
.....i..
........`,
  map`
p..i...i
...i....
........
t.......
....i...
i.......
c....i..
........`,
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
  coin: tune`
113.20754716981132,
113.20754716981132: c5-113.20754716981132,
113.20754716981132: g4-113.20754716981132,
3283.0188679245284`,
};

function goTo(x, y) {
  const cur = getTile(x, y);
  if (cur.length && cur[0].type == ice) return false;
  if (cur.length && cur[0].type == coin) {
    cur[0].remove();
    playTune(tunes.coin);
  }
  getFirst(player).x = x;
  getFirst(player).y = y;
  return true;
}

onInput("s", () => {
  while (getFirst(player).y + 1 < levelDimensions[level]) {
    if (!goTo(getFirst(player).x, getFirst(player).y + 1)) break;
  }
});

onInput("w", () => {
  while (getFirst(player).y - 1 >= 0) {
    if (!goTo(getFirst(player).x, getFirst(player).y - 1)) break;
  }
});

onInput("a", () => {
  while (getFirst(player).x - 1 >= 0) {
    if (!goTo(getFirst(player).x - 1, getFirst(player).y)) break;
  }
});

onInput("d", () => {
  while (getFirst(player).x + 1 < levelDimensions[level]) {
    if (!goTo(getFirst(player).x + 1, getFirst(player).y)) break;
  }
});

onInput("j", () => {
  clearText();
  setMap(levels[level]);
  playTune(tunes.reset);
});

setMap(levels[level]);
addText("Move penguin!", { y: 4, color: color`3` });
playTune(tunes.start);

afterInput(() => {
  clearText();
  const numberCovered = tilesWith(player, target).length;
  if (numberCovered === 1) {
    const coinsLeft = tilesWith(coin).length;
    if (coinsLeft !== 0) {
      addText("There are", { y: 4, color: color`3` });
      addText("still coins!", { y: 5, color: color`3` });
      return;
    }
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
      playTune(tunes.start);
    } else {
      addText("you win!", { y: 4, color: color`3` });
      playTune(tunes.win);
    }
  }

  if (level == 0) {
    addText("Penguin slides", { y: 4, color: color`3` });
    addText("until it", { y: 5, color: color`3` });
    addText("reaches ice!", { y: 6, color: color`3` });
  }

  if (level == 1) {
    addText("To reset", { y: 4, color: color`3` });
    addText("press j", { y: 5, color: color`3` });
  }
});
