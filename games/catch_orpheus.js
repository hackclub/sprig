/*
@title: catch_orpheus
@author: sampoder

Instructions

in this game, use WASD to try and 
catch Orpheus as she moves in all sorts
of directions! good luck!
*/

const player = "p";

const orpheus = "o";

setLegend(
  [ player, bitmap`
3333333333333333
3333333333333333
33............33
33...3........33
33...3........33
33...3........33
33...3........33
33...3........33
33...3.3333...33
33...33...3...33
33...3....3...33
33...3....3...33
33............33
33............33
3333333333333333
3333333333333333`],
  [ orpheus, bitmap`
................
....0000000.....
....0.....000...
...0....0...0...
...0...0....0...
...0........0...
....0.......0...
....00000...0...
........0...0...
........0...0...
........0...0...
........0...0...
........0...0...
........00000...
................
................`]
);

setSolids([]);

let level = 0;
const levels = [
  map`
p......
..o....
.......
.......
.......
.......`,
];

setMap(levels[level]);
setPushables({
  [ player ]: [],
});

onInput("s", () => {
  getFirst(player).y += 1
  console.log(Math.floor(Math.random() * 10) - 5)
  getFirst(orpheus).y += Math.floor(Math.random() * 5) - 2
});

onInput("w", () => {
  getFirst(player).y -= 1
  console.log(Math.floor(Math.random() * 10) - 5)
  getFirst(orpheus).y += Math.floor(Math.random() * 5) - 2
});

onInput("a", () => {
  getFirst(player).x -= 1
  console.log(Math.floor(Math.random() * 10) - 5)
  getFirst(orpheus).x += Math.floor(Math.random() * 5) - 2
});

onInput("d", () => {
  getFirst(player).x += 1
  console.log(Math.floor(Math.random() * 10) - 5)
  getFirst(orpheus).x += Math.floor(Math.random() * 5) - 2
});

afterInput(() => {
  if(getFirst(player).x == getFirst(orpheus).x  
     && getFirst(player).y == getFirst(orpheus).y){
      addText("you win!", { 
          x: 10, 
          y: 4, 
          color: [ 255, 0, 0 ] // red
      })
      setTimeout(() => setMap(levels[0]), 2000)
      setTimeout(() => clearText(), 2000)
  }
});
