/* 
@title: pea-boba-maze
@description: A simple maze game where you get the green pea to the boba.
@author: Kailey Liou
@tags: []
@addedOn: 2025-07-26
*/

const player = "p"
const wall = "w";
const goal = "g";
const trap = "t";
const myTune1 = tune`
500: C5~500,
15500`;
const myTune2 = tune`
500: C5^500,
15500`;
const myTune3 = tune`
500: C5-500,
15500`;
const myTune4 = tune`
500: C5/500,
15500`;
const stepLimits = [
  6, // Level 0
  7, // Level 1
  14, // Level 2
  17, // Level 3
  9, // Level 4
  31, // Level 5
  13, // Level 6
  33, // Level 7
  17, // Level 8
  13, // Level 9
  9, // Level 10
  15, // Level 11
  51, // Level 12
  28  // Level 13
];

setLegend(
	[ player, bitmap`
................
................
................
.....4444444....
....444444444...
...4444444444...
..444444444444..
..444404404444..
..444444444444..
..444344443444..
...44433334444..
....444444444...
....444444444...
......44444.....
................
................`],
  	[ wall, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  	[ goal, bitmap`
................
................
.....77.........
.....77.........
.....77.........
...11111111111..
...11111111111..
....CCCCCCCCC...
....CCCCCCCCC...
....CCCCCCCCC...
....CCCCCCCCC...
....C0CCCCCCC...
....CC0CC0C0C...
.....CCC0CCC....
......C0CC0.....
................`],
    [ trap, bitmap`
................
................
................
.......7........
.....8.7.D......
.....11711......
....1117111.....
...111111111....
..11101110111...
..11118881111...
..11111111111.8.
...111617111.88.
....11111118888.
.....11111......
.....D...8......
................`]
);

setSolids([ player, wall]);

let level = 0
const levels = [
	map`
p...
....
...g`,
  	map`
....w
w.w..
.pwg.`,
  	map`
......
pww.w.
wwgww.
w.....`,
  	map`
g.w...w
.wwpw..
..wwww.
w......`,
    map`
g..w..
.w.w.p
.w....
....w.`,
    map`
w.......wt.
t.www.w...w
...wpwgww..
.w.w.w..w..
.w...w.www.
...t.w.....`,
    map`
ww..w.w
.......
w.wwww.
.pwg...`,
    map`
....wwp..
.ww..www.
...w..ww.
ww.ww....
...wgwtw.
.www.ww..
.....w..w`,
    map`
t...ww..
w.w...wt
p..ww...
wwwg.w.t
w.tw...w`,
	map`
...w..
...w.g
.w.ww.
.w....
pw.tww`,
  	map`
.ww...t..
p...w...w
w.w.wgw.w
w.w.www.w
w.w.....w
w.wwww..w
t......t.`,
    map`
.........
ww.www.w.
.....w.w.
.w.wgw...
.twwww.w.
..wwpwww.
w........`,
    map`
pw...w...w.....
.w.w.w.w.w.www.
...w...w...wtw.
wwwwwwwwwwww.w.
g...w......w.w.
ww.w..w..w.....
.t...w.w..www..
ww.w.tw.w......`,
  	map`
........w..wp
ww.w.ww.ww.w.
ww.w.ww...ww.
.......ww....
ww.wwt...wwww
ww..ww.w....g
.ww...ww.ww.w
.t..www....t.`
]

let stepsRemaining = stepLimits[level];

setMap(levels[level])

setPushables({
	[ player ]: []
})

let trapDirections = new Map();

setInterval(() => {
  const traps = getAll(trap);
  if (traps.length === 0) return;

  for (let t of traps) {
    if (!trapDirections.has(`${t.x},${t.y}`)) {
      trapDirections.set(`${t.x},${t.y}`, 1);
    }

    let dir = trapDirections.get(`${t.x},${t.y}`);
    let nextX = t.x + dir;

    const nextTile = getTile(nextX, t.y);
    if (
      nextX < 0 ||
      nextX >= width() ||
      nextTile.some(tile => tile.type === wall || tile.type === trap)
    ) {
      trapDirections.set(`${t.x},${t.y}`, -dir);
      continue;
    }

    clearTile(t.x, t.y);
    addSprite(nextX, t.y, trap);

    trapDirections.set(`${nextX},${t.y}`, dir);
    trapDirections.delete(`${t.x},${t.y}`);

    const tileNow = getTile(nextX, t.y);
    if (tileNow.some(s => s.type === player)) {
      addText("You hit a trap!", { y: 6, color: color`3` });
      setTimeout(() => {
        setMap(levels[level]);
        stepsRemaining = stepLimits[level];
        clearText();
      }, 1000);
      return;
    }
  }
}, 400);

onInput("w", () => {
    if (stepsRemaining > 0) {
      getFirst(player).y -= 1;
      stepsRemaining--;
      playTune(myTune1);
    }
});

onInput("a", () => {
    if (stepsRemaining > 0) {
      getFirst(player).x -= 1;
      stepsRemaining--;
      playTune(myTune2);
    }
});

onInput("s", () => {
    if (stepsRemaining > 0) {
      getFirst(player).y += 1;
      stepsRemaining--;
      playTune(myTune3);
    }
});

onInput("d", () => {
    if (stepsRemaining > 0) {
      getFirst(player).x += 1;
      stepsRemaining--;
      playTune(myTune4);
    }
});

onInput("j", () => {
	setMap(levels[level]);
    stepsRemaining = stepLimits[level];
});

// afterInput(() => {
//   const goalsCovered = tilesWith(player, goal);

//   if(goalsCovered.length >= 1) {
//     level = level + 1;

//     if(level < levels.length) {
//       setMap(levels[level]);
//     }
//     else {
//       addText("you win!", { y: 4, color: color`6` });
//     }
//   }
// })

afterInput(() => {
  clearText();
  addText(`Level ${level + 1}  Steps: ${stepsRemaining}`, { y: 14, color: color`D` });

  const playerObj = getFirst(player);
  const playerTile = getTile(playerObj.x, playerObj.y);

  // trap
  if (playerTile.some(t => t.type === trap)) {
    addText("You hit a trap!", { y: 6, color: color`3` });
    setTimeout(() => {
      setMap(levels[level]);
      stepsRemaining = stepLimits[level];
      clearText();
    }, 1000);
    return;
  }

  // step limit
  if (stepsRemaining <= 0) {
    addText("Out of steps!", { y: 6, color: color`3` });
    setTimeout(() => {
      setMap(levels[level]);
      stepsRemaining = stepLimits[level];
      clearText();
    }, 1000);
    return;
  }

  // win
  const goalsCovered = tilesWith(player, goal);
  if(goalsCovered.length >= 1) {
    level = level + 1;

    if(level < levels.length) {
      setMap(levels[level]);
      stepsRemaining = stepLimits[level];
    } else {
      addText("You win!", { y: 4, color: color`6` });
    }
  }
});
