/* 
@title: Meteorshower
@author: Mate P.
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
];


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
let lvl1 = false;
let lvl2 = false;
let lvl3 = false;

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
    lvl1 = true
    clearText();
  }
});

afterInput(() => {
  const meteors = getAll(meteor);
  const play = getFirst(player);
  for (const mete of meteors) {
    if (mete.x === play.x && mete.y === play.y) endOfGame();
  }
  if (lvl1 && getFirst(player).x == getFirst(coin).x && getFirst(player).y == getFirst(coin).y){
    lvl1 = false
    started = false;
    addText("Lvl 1 done", {
      x: 5,
      y: 7,
      color: color`4`,
    });
    setTimeout(() => {
      started = true;
      lvl2 = true;
      clearText()
      setMap(maps[1])
      placeCoin();
    }, 3000);
  };

    if (lvl2 && getFirst(player).x == getFirst(coin).x && getFirst(player).y == getFirst(coin).y) {
      lvl2 = false;
      started = false;
      addText("Lvl 2 done", {
      x: 5,
      y: 7,
      color: color`4`,
      }); 
      setTimeout(() => {
        started = true
        lvl3 = true
        clearText()
        setMap(maps[2])
        placeCoin();
    }, 3000);     
    };

    if (lvl3 && getFirst(player).x == getFirst(coin).x && getFirst(player).y == getFirst(coin).y) {
      started = false;
      lvl3 = false;
      addText("You won", {
      x: 6,
      y: 7,
      color: color`4`,
      });
    };    
});



  
function endOfGame() {
  started = false;
  addText("You lost!", {
    x: 6,
    y: 7,
    color: color`3`,
  });
}
