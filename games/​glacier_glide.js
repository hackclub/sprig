/*
@title: glacier_glide
@description: glide in the frozen land, collect the key and escape without hitting the spikes!
@author: invi
@tags: ['puzzle', 'maze']
@addedOn: 2026-11-10
*/

const player = "p";
const wall = "w";
const coin = "k";
const door = "d";
const spike = "s";
const ice = "i";

setLegend(
  [ player, bitmap`
................
................
.......000......
......00000.....
.....0.000.0....
....0...0...0...
....0.0.9.0.0...
....0.0.6.0.0...
...000..9..000..
..00000...00000.
.00.0.......0.00
.0..0.......0..0
....0.......0...
....00.....00...
.....00...00....
.....9900099....` ],
  [ wall, bitmap`
................
................
................
................
................
................
.....55555......
.....55555......
.....55555......
.....55555......
.....55555......
................
................
................
................
................` ],
  [ coin, bitmap`
................
................
................
................
................
................
......66........
......66........
................
................
................
................
................
................
................
................` ],
  [ door, bitmap`
................
......LLL.......
....LLCCCLL.....
....LCCCCCL.....
....LCCCCCL.....
....LFFFFFL.....
....LCCCCCL.....
....LCCCC6L.....
....LCCCCCL.....
....LFFFFFL.....
....LCCCCCL.....
....LCCCCCL.....
....LCCCCCL.....
................
................
................` ],
  [ spike, bitmap`
................
................
................
................
................
................
................
....L.....L.....
...L1L...L1L....
..L121L.L121L...
.L12221L12221L..
................
................
................
................
................` ],
  [ ice, bitmap`
7777777777777777
7777777777777777
7777777777777277
7772777727777777
7777777777777777
7727777777727777
7777777777777777
7777727777777777
7777777727777777
7777777777777777
7727777777777777
7777777772777777
7777772777777277
7777777777777777
2777777777777777
7777777777777777` ]
);

// background
setBackground(ice);

// background music
playTune(tune`
500: A5~500,
500: A5~500,
500: D5~500,
500: F5~500,
500: D5~500,
500: F5~500,
500: D5~500,
500: F5~500,
500: D5~500,
500: D5~500,
500: F5~500,
500: F5~500,
500: D5~500,
500: D5~500,
500: F5~500,
500: D5~500,
500: F5~500,
500: D5~500,
500: F5~500,
500: D5~500,
500: F5~500,
500: D5~500,
500: D5~500,
500: F5~500,
500: F5~500,
500: D5~500,
500: F5~500,
500: D5~500,
500: F5~500,
500: D5~500,
500,
500: G5~500 + E5~500`, 1000);

setSolids([player, wall]);

let level = 0;
const levels = [
  map`
wwwwwwww
wp....kw
w......w
w..s..dw
wwwwwwww`,
  map`
wwwwwwww
wp..w..w
w......w
wk....sw
ww....dw
wwwwwwww`,
  map`
wwwwwwwwww
wp...w...w
w........w
w...wk...w
w.s..wd.ww
wwwwwwwwww`
];

const currentLevel = levels[level];
setMap(currentLevel);

onInput("w", () => {
  for (let i = 0; i < 15; i++) {
    getFirst(player).y -= 1;
  }
});

onInput("s", () => {
  for (let i = 0; i < 15; i++) {
    getFirst(player).y += 1;
  }
});

onInput("a", () => {
  for (let i = 0; i < 15; i++) {
    getFirst(player).x -= 1;
  }
});

onInput("d", () => {
  for (let i = 0; i < 15; i++) {
    getFirst(player).x += 1;
  }
});

// press j to reset level
onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText();
    setMap(currentLevel)
  }
});

afterInput(() => {
  // reset if player hits spike
  if (tilesWith(player, spike).length > 0) {
    const currentLevel = levels[level];
    clearText();
    setMap(currentLevel);
  }

  // collect coin
  if (tilesWith(player, coin).length > 0) {
    const px = getFirst(player).x;
    const py = getFirst(player).y;
    clearTile(px, py);
    addSprite(px, py, player);
  }

  // next level when coin is collected and player is on door
  if (tilesWith(coin).length === 0 && tilesWith(player, door).length > 0) {
    level = level + 1;
    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`4` });
    }
  }
});