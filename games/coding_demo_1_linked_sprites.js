/*
@title: Coding Demo 1 - Linked sprites
@author: Leonard (Omay)
@tags: []
@addedOn: 2022-09-13

Important code at bottom 
Movement code
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
......000.......
.....000000.....
....00000000....
...0000000000...
...0000000000...
...0.00000000...
...0.000000.0...
...0.000000.0...
...0.000000.0...
.....000000.0...
......0..00.....
.....00..00.....
.....0...0......
.....0...00.....
.....0....0.....
....00....00....`],
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
a........
b........
..c.c.c..
..c.c....
.........
....c.c..
..c.c.c..`,
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