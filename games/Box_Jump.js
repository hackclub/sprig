/*
@title: Box Jump
@author: Elijah Schneider
@tags: ['puzzle']
@addedOn: 2022-12-19

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
var score = 0;

setLegend(
  [ player, bitmap`
................
......3333......
.....333333.....
.....332533.....
.....335233.....
.....333333.....
......3333......
......3333......
......3333......
......3333......
......3333......
.....333333.....
....333..333....
..L333....333L..
.LLLLL....LLLLL.
LLLLLL....LLLLLL`],
  [ box, bitmap`
0000000000000000
0000000000000000
000L000L0000L000
0000000000000000
0000000000000L00
00L0000000000000
0000000000000000
000000L00L00L000
0000000000000000
0000L0000LL00000
00L0000000000000
0000000000000L00
0000L000L0000000
00L0000000000000
00000000000L0L00
0000000000000000`],
);

let level = 0;
const levels = [
  map`
.........
.........
.........
.p......b`,
  map`
..........................................................
..........b...............bbbb.....bb..........bbbb.bbb...
.bbbbb...b.b..............b.......b..b.b.....b.b....b..b..
.b.......b.b......b...b...b.......b..b.b.....b.b....b..b..
.b......b...b....b.b.b.b..bbbb....b..b..b...b..bbbb.bbbb..
.b.bbb..bbbbb....b.b.b.b..b.......b..b..b...b..b....bbb...
.b...b.b.....b..b...b...b.b.......b..b...b.b...b....b.bb..
.bbbbb.b.....b..b...b...b.bbbb.....bb.....b....bbbb.b..bb.
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................
..........................................................`
];

const currentLevel = levels[level];
setMap(currentLevel);


setPushables({
  [player]: []
});

// START - PLAYER MOVEMENT CONTROLS

  onInput("w", () => {
  try {
    getFirst(player).y -= 2;
    setTimeout(function(){getFirst(player).y = 3}, 1000);
  } catch(error)
  {
  
  }
})
setInterval(move, 500);
setInterval(death, 1);

onInput("l", () => {
  setMap(levels[0]);
  clearText();
})

function death()
{
  if(getTile(1, 3)[0] == getFirst(player) && getTile(1, 3)[1] == getFirst(box))
{
  addText("l to play again", { 
  x: 2,
  y: 2,
  color: color`3`
})
  getFirst(player).remove();
  setTimeout(reset(), 2000);
  
}
}

function reset()
{
    setMap(levels[1]);
}

function move()
{
  
  if(getFirst(box).x == 0)
  {
    score++;
    getFirst(box).x = 8
    addText("Score: " + score, { 
    x: 5,
    y: 2,
    color: color`3`
    });
  } else{
    getFirst(box).x -= 1
  }
}

