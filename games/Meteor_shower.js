/* 
@title: Meteorshower
@author: Mate P.
@tags: ['strategy']
@addedOn: 2022-11-22
*/

const player = "p";
const meteor = "m";
const coin = "c";
const bg = "b";

setLegend(
  [
    player,
    bitmap`
.......0........
......000.......
.....00300......
.....03330......
.....00000......
.....05550......
.....05550......
....0055500.....
...000555000....
..00C05550C00...
.00CC00000CC00..
.0000055500000..
.....00000......
.....99999......
......999.......
.......9........`,
  ],
  [
    coin,
    bitmap`
................
................
................
................
......66666.....
.....6666666....
....666666666...
....666666666...
....666666666...
....666666666...
....666666666...
....666666666...
.....6666666....
......66666.....
................
................`,
  ],
  [
    meteor,
    bitmap`
...........99999
.........9999999
.........9999999
......999999999.
....11111119999.
...111111111999.
..1111111111199.
..1111111111199.
..111111111111..
..111111111111..
..111111111111..
..11111111111...
..1111111111....
...11.111111....
.......1111.....
................`,
  ],
  [
    bg,
    bitmap`
7777767777777777
7777777777777777
7777777777777777
7777777777767777
7777777777777777
7757777777777777
7777777777777777
7777777577777777
7777777777777777
7777777777777577
7776777777777777
7777777777777777
7777777777777777
7777777777777777
7775777777776777
7777777777777777`,
  ]
);

const maps = [ 
  map`
.............
....m..m....m
.m........m..
.......m...m.
m...m........
.m...........
......m...m..
.............
....m.....m..
.m...........
......m......
m.........m..
........m....
.m...........
....m........
.......m..m..
.m...........
.......p.....`,
  map`
.............
m.m.m..m....m
.m..m.....m..
..m....m.m.m.
m...m.....m..
.m.....m....m
...mm.m.m.m..
.m..........m
....m.m.m.m..
.m.......m...
..m..m.m...m.
m.........m..
.m..mm.......
..m....m.m.mm
.m..m........
....m..m..m..
m.m..........
.....m.p..m.m`,
  map`
.........m...
m.m.m..m....m
.m..mm....m..
..m....m.m.m.
m...m.m...m..
.m.....m.m..m
...mm.m.m.m..
.m..........m
m..mm.m.m.m..
.m.......m...
..m..m.m...m.
m..m......m..
.m..mm.....m.
..m....m.m.mm
.m..m........
....m..m..mm.
m.mm...m.m...
.....m.p..m.m`,
  map`
.........m...
m.m.m..m....m
.m..mm....m..
..m....m.m.m.
m...m.m...m..
.m.....m.m..m
...mm.m.m.m..
.m..m.......m
m..mm.m.m.m..
.m.......m...
..m..m.m...m.
m..m.....mm..
.m..mm.....m.
..m....m.m.mm
.m..m.m......
....m..m..mm.
m.mm...m.m...
mm...m....mpm`,
  map`
.........m...
m.m.m..m....m
.m..mm....m..
..m....m.m.m.
m...m.m...m.p
.m.....m.m..m
...mm.m.m.m..
.m..........m
m..mm.m.m.m..
.m..m....m...
..m..m.m..mm.
m..m......m.m
.m..mm..m....
..m..m.m.m.mm
.m..m....m...
...mm..m..mm.
m.mm...m.m...
m....m....m.m`,
];

maps[100] = map`
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............
.............`


setMap(maps[0]);

setBackground(bg);


const placeCoin = () => {
  let targetLocation = {};
  let tiles = [];
  do {
    targetLocation.x = Math.floor(Math.random() * width());
    targetLocation.y = Math.floor(Math.random() * height());
    tiles = getTile(targetLocation.x, targetLocation.y);
  } while (tiles.length === 1);
  addSprite(targetLocation.x, targetLocation.y, coin);
};
placeCoin();

//Start text
addText("Start(K)", {
  x: 6,
  y: 7,
  color: color`0`,
});

let started = false;

//Movement controls

onInput("a", () => {
  handleInput("left");
});

onInput("d", () => {
  handleInput("right");
});

onInput("w", () => {
  handleInput("up");
});

onInput("s", () => {
  handleInput("down");
});

function handleInput(input) {
  if (started) {
    switch (input) {
      case "left":
        getFirst(player).x -= 1;
        break;
      case "right":
        getFirst(player).x += 1;
        break;
      case "up":
        getFirst(player).y -= 1;
        break;
      case "down":
        getFirst(player).y += 1;
    }
  }
}

onInput("k", () => {
  if (!started) {
    started = true;
    clearText();
  }
});

let lvl = 0
const checkWin = () => {
  if (
    getFirst(player).x == getFirst(coin).x &&
    getFirst(player).y == getFirst(coin).y
  ) {
    setMap(maps[100])
    setBackground();
    started = false;
    lvl += 1
    addText(lvl === 5 ? "You won!" : `Lvl ${lvl} done` , {
      x: lvl === 5 ? 6 : 5,
      y: 7,
      color: color`4`,
    });
    
    lvl < 5 && setTimeout(() => {
      started = true;
      clearText()
      setMap(maps[lvl])
      setBackground(bg);
      placeCoin();
    }, 3000);
  }
}

const checkLose = () => {
  const play = getFirst(player);
  const found = getTile(play.x, play.y).find(value => value.type === meteor)
  if (found !== undefined) {
    started = false;
    addText("You lost!", {
      x: 6,
      y: 7,
      color: color`3`,
    });
  }
}

afterInput(() => {
  checkLose()
  checkWin()
});
