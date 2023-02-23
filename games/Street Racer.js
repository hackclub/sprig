/*
@title: Street Racer
@author: Cdogo

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
const otherCar = "b";
const goal = "g";
const road = "r";

setLegend(
  [ player, bitmap`
2111100000011112
2111000000001112
1111000000001112
2111002222001111
2111002222001111
2110000220000112
1111020000201112
1111022002201112
2111022002201111
2111020000201111
2111000220001112
1111002222001112
1110000000000112
2110000000000111
2110333003330112
2111000000001112`],
  [ otherCar, bitmap`
2111111111111112
2111333333331112
1111333333331112
2111333333331111
2111322222231111
2111322222231112
1111332222331112
1111322222231112
2111322222231111
2111322222231111
2111322222231112
1111332222331112
1111333333331112
2111333333331111
2111333333331112
2111111111111112`],
  [ goal, bitmap`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4.......4....
...4.......4....
...44......4....
....4......4....
....44....44....
.....444444.....
................
................
................`],
  [ road, bitmap`
2111111111111112
2111111111111112
1111111111111112
1111111111111111
2111111111111111
2111111111111112
2111111111111112
1111111111111112
1111111111111111
2111111111111111
2111111111111112
2111111111111112
1111111111111112
2111111111111111
2111111111111112
2111111111111112`]
);

let level = 0;
const levels = [
  map`
rrrrrrr
rrrrrrr
rbrrrbr
rrrrrrr
rrrrrrr
rrrrrrr
rrrprrr`,

];
setBackground('r')

const currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [player]: []
});

// START - PLAYER MOVEMENT CONTROLS
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

onInput("a", () => {
  if (getFirst(player).x !== 0){
    getFirst(player).x -=1;
  }
});

onInput("d", () => {
  if (getFirst(player).x !== 6){
    getFirst(player).x +=1;
  }
});

// END - PLAYER MOVEMENT CONTROLS
let intervalCount = 0
let intervalSpeed = 1000
let loop = setInterval(() => {
  intervalCount += 1
  getAll(otherCar).forEach((car) => {console.log(car); if(car.y == 6) {clearTile(car.x, car.y)}; car.y += 1})
  if (intervalCount % 2 === 0){
  addSprite(getRandomInt(6), 0, otherCar)}
  if(tilesWith(player, otherCar).length !== 0){
    clearInterval(loop)
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
  }

}, 500)