/*
@title: catch_orpheus
@author: sampoder
@tags: ["endless"]
@addedOn: 2022-10-08

Instructions

in this game, use WASD to try and 
catch Orpheus as she moves in all sorts
of directions! good luck!
*/

const player = "p";

const orpheus = "o";

const background = "b";

setLegend(
  [ player, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333323333333333
3333323333333333
3333323333333333
3333323333333333
3333323333333333
3333323222233333
3333322333233333
3333323333233333
3333323333233333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [ orpheus, bitmap`
................
....0000000.....
....022222000...
...0222202220...
...0222022220...
...0222222220...
....022222220...
....000002220...
........02220...
........02220...
........02220...
........02220...
........02220...
........00000...
................
................`],
  [ background, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDD4DDDDDD
DCD4DDDDDDDD4DDD
DDDDDDDDDDDDDDDD
DDDDDDD4DDDDDDDD
DD4DDDDDDDDD44DD
DDDDDDDDDDDDDDDD
DDDDDDDDDCDDDDDD
DDDCDD4DDDDDDD4D
DDDDDDDDDDDDDDDD
4DDDD4DDDDDDDDDD
DDDDDDDDD4DDDDDD
DDCDDDDDDDDDDD4D
DDDDD4DDDDDDDDDD
DDDDDDDDDDD4DDDD
DDDDDCDDDDDDDDDD`]
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

setBackground(background)

setMap(levels[level]);
setPushables({
  [ player ]: [],
});

onInput("s", () => {
  getFirst(player).y += 1
  // console.log(Math.floor(Math.random() * 10) - 5)
  getFirst(orpheus).y += Math.floor(Math.random() * 5) - 2
});

onInput("w", () => {
  getFirst(player).y -= 1
  // console.log(Math.floor(Math.random() * 10) - 5)
  getFirst(orpheus).y += Math.floor(Math.random() * 5) - 2
});

onInput("a", () => {
  getFirst(player).x -= 1
  // console.log(Math.floor(Math.random() * 10) - 5)
  getFirst(orpheus).x += Math.floor(Math.random() * 5) - 2
});

onInput("d", () => {
  getFirst(player).x += 1
  // console.log(Math.floor(Math.random() * 10) - 5)
  getFirst(orpheus).x += Math.floor(Math.random() * 5) - 2
});

afterInput(() => {
  if(getFirst(player).x == getFirst(orpheus).x  
     && getFirst(player).y == getFirst(orpheus).y){
      addText("you win!", { 
          x: 10, 
          y: 4, 
          color: color`3`
      })
      setTimeout(() => setMap(levels[0]), 2000)
      setTimeout(() => clearText(), 2000)
  }
});
