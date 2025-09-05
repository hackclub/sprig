/* 
@title: pea-boba-maze
@description: My game has 14 levels of different mazes that increasingly get more challenging. The goal is to get the green pea to the boba.
@author: Kailey Liou
@tags: []
@addedOn: 2025-08-04
*/

const player = "p"
const wall = "w";
const goal = "g";
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
w.......w..
..www.w...w
...wpwgww..
.w.w.w..w..
.w...w.www.
.....w.....`,
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
...wgw.w.
.www.ww..
.....w..w`,
    map`
....ww..
w.w...w.
p..ww...
wwwg.w..
w..w...w`,
	map`
...w..
...w.g
.w.ww.
.w....
pw..ww`,
  	map`
.ww......
p...w...w
w.w.wgw.w
w.w.www.w
w.w.....w
w.wwww..w
.........`,
    map`
.........
ww.www.w.
.....w.w.
.w.wgw...
..wwww.w.
..wwpwww.
w........`,
    map`
pw...w...w.....
.w.w.w.w.w.www.
...w...w...w.w.
wwwwwwwwwwww.w.
g...w......w.w.
ww.w..w..w.....
.....w.w..www..
ww.w..w.w......`,
  	map`
........w..wp
ww.w.ww.ww.w.
ww.w.ww...ww.
.......ww....
ww.ww....wwww
ww..ww.w....g
.ww...ww.ww.w
....www......`
]

setMap(levels[level])

setPushables({
	[ player ]: []
})

onInput("w", () => {
	getFirst(player).y -= 1
    playTune(myTune1);
});

onInput("a", () => {
	getFirst(player).x -= 1
    playTune(myTune2);
});

onInput("s", () => {
	getFirst(player).y += 1
    playTune(myTune3);
});

onInput("d", () => {
	getFirst(player).x += 1
    playTune(myTune4);
});

onInput("j", () => {
	setMap(levels[level])
});

afterInput(() => {
  const goalsCovered = tilesWith(player, goal);

  if(goalsCovered.length >= 1) {
    level = level + 1;

    if(level < levels.length) {
      setMap(levels[level]);
    }
    else {
      addText("you win!", { y: 4, color: color`6` });
    }
  }
})
