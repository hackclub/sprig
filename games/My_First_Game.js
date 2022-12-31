/*
@title: My_First_Game
@author: P. Rama Ganesh

Instructions:

Welcome to Sprig!!!

Hit "run" to execute the code and
start the game (you can also press shift+enter).

To beat each level you'll have to edit the code.

The code for this game starts below this comment.

The objective is to push the purple boxes onto the green goals.
Press j to reset the current level.

Click the "open help" to discover your toolkit.

--------
Level 1
--------

Make the purple block pushable. 

--------
Level 2
--------

Add controls to move up and left, use "w" and "a" as inputs

Tip: 
Do you find it annoying restarting at level 0?
Try adjusting the starting level.

--------
Level 3
--------

Edit the map.

--------
Level 4
--------

Make boxes push boxes.

--------
Level 5
--------

Add sound effects when you move.

--------
Level 6
--------

Solve the puzzle!

--------
END
--------

Make your own game! Try
 - adding two players
 - leaving a trail as you move
 - having different blocks and goal types
 - come up with your own mechanic!

*/


const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
.......L........
....10L0L.......
...L0L000.......
...L00000.......
...0L...0.......
...0.0.00.......
...00...0.......
..000000000.....
..033303330.....
..050303530.....
..030303000.....
..030000030.....
..000303000.....
....05050.......
....00000.......
................`],
  [ box, bitmap`
................
................
................
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
................
................
................
................`],
  [ goal, bitmap`
................
................
................
................
.....444444.....
....44444444....
....44222244....
....44222244....
....44222244....
....44222244....
....44444444....
.....444444.....
................
................
................
................`],
  [ wall, bitmap`
CCC0CCC0CCC0CCC0
0000000000000000
CC0CCC0CCC0CCC0C
0000000000000000
CCC0CCC0CCC0CCC0
0000000000000000
CC0CCC0CCC0CCC0C
0000000000000000
CCC0CCC0CCC0CCC0
0000000000000000
CC0CCC0CCC0CCC0C
0000000000000000
CCC0CCC0CCC0CCC0
0000000000000000
CC0CCC0CCC0CCC0C
0000000000000000`]
);

let level = 0;
const levels = [
  map`
......
......
.bww..
p.wg..
w..w..`,
  map`
.b..g
.w...
pw.w.
.b...
..g..`,
  map`
..bg
....
...g
.bwb
..w.
.pwg`,
  map`
g..w
b..w
.gbg
..b.
..w.
p.w.
..w.
.bw.
.g..`,
  map`
.wwwgwg.w
wgwg.b.b.
..b..w...
..b.wgww.
.w..b.w..
.p....gb.
....w....`,
  map`
wwwwwwww
www...ww
wgpb..ww
www.bgww
wgw.bgww
wbb.b.ww
w..ggbgw
wwwwwwww`
  map`
.........wwww.wwww
..................
wwww..w.w....www..
wwww..w.wwww.....w
wwww..w.w..w.....w
..................
..................
..................
ww................
w.................
w...w.............
wwwww.............`
