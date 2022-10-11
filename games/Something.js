/*
@title: Something
@author: Logan

Instructions:

Welcome to Sprig!!!

Hit "run" to execute the code and
start the game (you can also press shift+enter).

To beat each level you'll have to edit the code.

The code for this game starts below this comment.

The objective is to push the purple boxes onto the green goals.
Press j to reset the current level.

Hit "open-help" to discover your toolkit.

--------
Level 1
--------

Make the purple block pushable. 

--------
Level 2
--------

Add controls to move up and left, use "w" and "d" as inputs

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

const joe = "j";

const bob = "b";

setLegend(
  [joe, bitmap`
................
................
................
....DDDDDDDDD...
....DD4DDD4DD...
...9DDDD4DDDD9..
....D4DDDDD4D...
....D4444444D...
....DDDDDDDDD...
.......555......
.....7755577....
....577777775...
....5.77777.5...
....5.77777.5...
......55555.....
.....55...55....`,
   bob, bitmap`
................
................
................
................
....444444444...
....455444554...
....455444554...
....445545544...
....454444454...
....445555544...
.....4455544....
.....4444444....
................
................
................
................`
  ]
);

const levels = [
    map`
j....
.....`,
    map`
..........
..........
..........
.j........
..........
..........
..........
..........
..........
..........
..........`
];

setSolids([joe, bob ]);

setPushables({
    [joe]: [ joe, bob ]
});

setMap(levels[0]);


onInput("d", () => {
    getFirst(joe).x += 1
});

onInput("a", () => {
    getFirst(joe).x -= 1
});

onInput("w", () => {
    getFirst(joe).y -= 1
});

onInput("s", () => {
    getFirst(joe).y += 1
});



