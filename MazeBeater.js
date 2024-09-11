
/*
@title: Maze Beater
@tags: ['hackable', 'beginner']
@addedOn: 2024-09-10
@author: Pranav Emmadi

*/

const playertop = "a";
const playerbot = "b";
const wall = "c";

setLegend(
  [ playertop, bitmap`
................
......00000.....
..00000....0....
.00........00...
.0..........0...
.0..0....00.0...
.0..00...00.0...
.0..00.......0..
.00..........0..
..0..........0..
..0...0...0..0..
..0...00.00..0..
..00...000..00..
....00...0000...
......000.......
......000.......`],
  [ playerbot, bitmap`
.....000000.....
.....0000000....
...00000000000..
.000.0000000000.
00...00000000.0.
0....00000000.00
0....00000000..0
.....0000000...0
.....0000000....
.....0000000....
.....00...00....
.....00...00....
.....00...00....
.....00...00....
.....00...00....
.....00...00....`],
  [ wall, bitmap`
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
0000000000000000`]
);
setSolids([playertop, playerbot, wall]);
setPushables({
  [playertop]:[playerbot]
});

let level = 0;
const levels = [
  map`
...c........c..c......cc.........
..cc.a.......c..cccccccc.........
..c.cb........c.c.....cc.........
..cc.....cc.ccc.c.....cc.........
....cc..........c.ccc.cc.........
....ccc...cc......c.c............
..c..cc..ccc.cc.c.c.c......ccccc.
.cc..cc.cccc.c....c.cccc...c.c.c.
.cc..cc.c..c.c....c...cc...c.c.c.
.cc.ccc.c....c..c.c...cc.........
.cc.....c....cccc.c...cc...ccccc.
..ccccc.cccc...c..c...cc......cc.
......c.c..c......c...cc....cc...
......c....c....ccc...cc...ccccc.
......c....cccc.c.....cc.........
......cccc.cccc.c.....cc...ccccc.
.........c......c.....cc...c...c.
.........c......c.....cc...ccccc.
.........cccccccc.....cc.........
......................cc.........
......................cc.........`,
];

setMap(levels[level]);
onInput("w", () => {
  let top = getFirst(playertop);
  let bot = getFirst(playerbot);
  top.y -= 1
  bot.y = top.y+1;
  if(bot.y !== top.y+1){
    top.y += 1
    bot.y = top.y+1;
  }
});
onInput("a", () => {
  let top = getFirst(playertop);
  let bot = getFirst(playerbot);
  top.x -= 1
  bot.x = top.x;
  if(bot.x !== top.x){
    top.x += 1
    bot.x = top.x;
  }
});
onInput("s", () => {
  let top = getFirst(playertop);
  let bot = getFirst(playerbot);
  top.y += 1
  bot.y = top.y+1;
  if(bot.y !== top.y+1){
    top.y -= 1
    bot.y = top.y+1;
  }
});
onInput("d", () => {
  let top = getFirst(playertop);
  let bot = getFirst(playerbot);
  top.x += 1
  bot.x = top.x;
  if(bot.x !== top.x){
    top.x -= 1
    bot.x = top.x;
  }
});
