/*
@title: Monty Hall
@author: Leonard (Omay)
@tags: ['simulation']
@addedOn: 2022-11-06

Why switching is better:
The door you choose has a 1/3 chance of having the car.
The other 2 doors combined have a 2/3 chance of having the car.
If you switch after the other door is revealed, you are in the group of 2/3 chance, 
and since the other door in that group has a 0/3 chance of having the car,
the door you switch to has a 2/3 chance compared to the 1/3 of the first door you selected.
*/

const car = "c";
const goat = "g";
const door = "d";
const sel = "s";
const choice = "a";

setLegend(
  [sel, bitmap`
1111111111111111
11............11
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
1..............1
11............11
1111111111111111`],
  [door, bitmap`
CCCCCCCCCCCCCCCC
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333FF3C
C33333333333FF3C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
C33333333333333C
CCCCCCCCCCCCCCCC`],
  [car, bitmap`
................
................
................
................
...........00...
..00.......0.0..
.00...00...0.00.
.0...000...0.00.
.0...0.00..000..
.0...0000..000..
.00.0...0..0.0..
....0...0..0..0.
................
................
................
................`],
  [goat, bitmap`
................
................
................
.............0..
.............000
.00..000..00.000
0...00.0..0.0.0.
0...00..0.0.0.0.
0.0..0..0.000.0.
0.00.0..0.0.0.0.
0000.000..0.0.0.
................
................
................
................
................`],
  [choice, bitmap`
.......00.......
......0..0......
.....0....0.....
....0......0....
...0........0...
..0..........0..
.0............0.
0..............0
................
................
................
................
................
................
................
................`]
);

setSolids([]);

let level = 0;
const levels = [
  map`
.......
.......
.d.d.d.
.......
.......`,
  map`
.......
.......
.......`,
];

setMap(levels[level]);
addSprite(1, 2, sel);
addSprite(1, 2, goat);
addSprite(3, 2, goat);
addSprite(5, 2, goat);
var goats = getAll(goat);
goats[Math.floor(Math.random()*3)].type = car;
var chosen = false;
onInput("a", () => {
  if(!chosen){
    getFirst(sel).x -= 2
  }else if(getAll(choice).length > 0){
    getFirst(choice).x -= 4;
  }
});
onInput("d", () => {
  if(!chosen){
    getFirst(sel).x += 2
  }else if(getAll(choice).length > 0){
    getFirst(choice).x += 4;
  }
});
onInput("i", () => {
  if(!chosen){
    var goats = tilesWith(goat);
    for(var i = 0; i < goats.length; i++){
      if(!goats[i].map(x => x.type).includes(sel)){
        goats[i][goats[i].map(x => x.type).indexOf(door)].remove();
        break;
      }
    }
    addText("Switch", {x: 1, y: 1});
    addText("Stay", {x: 15, y: 1});
    addSprite(1, 1, choice);
    chosen = true;
  }else if(getAll(choice).length > 0){
    if(getFirst(choice).x === 1){
      var doors = tilesWith(door);
      for(var i = 0; i < doors.length; i++){
        if(!doors[i].map(x => x.type).includes(sel)){
          getFirst(sel).x = doors[i][0].x;
          getFirst(sel).y = doors[i][0].y;
        }
      }
    }
    getFirst(choice).remove();
    clearText();
  }else if(getAll(door).length > 1){
    var selDoor = tilesWith(door, sel)[0];
    selDoor[selDoor.map(x => x.type).indexOf(door)].remove();
  }
});

afterInput(() => {
  
});
