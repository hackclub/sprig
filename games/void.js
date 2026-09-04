/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: void
@description: Can Hackhen get Hackclub to its nest ??
@author: Voidx24
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/

const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const bgm = tune`
500,
500: B5~500 + A5~500,
500: G5~500 + A4~500,
500: G5~500 + F5~500 + G4~500,
500: F5~500 + E5~500 + G4~500,
500: E5~500 + G5~500 + F4~500,
500: E5~500 + D5~500 + F5~500,
500: D5~500 + F5~500 + G4~500 + A4~500,
500: D5~500 + F5~500 + F4~500 + A4~500,
500: D5~500 + F4~500,
500: D5~500 + C5~500 + F5~500 + F4~500 + A4~500,
500: C5~500 + F5~500 + F4~500 + A4~500,
500: C5~500 + D5~500 + G5~500 + F4~500 + A4~500,
500: D5~500 + G5~500 + F5~500 + F4~500 + A4~500,
500: D5~500 + C5~500 + F5~500 + F4~500 + A4~500,
500: C5~500 + F5~500 + E5~500 + F4~500 + A4~500,
500: C5~500 + F4~500 + A4~500,
500: D5~500 + E5~500 + F4~500 + A4~500,
500: D5~500 + C5~500 + E5~500 + F4~500 + A4~500,
500: C5~500 + F4~500 + A4~500,
500: C5~500 + F4~500 + A4~500,
500: C5~500 + E5~500 + F4~500 + A4~500,
500: D5~500 + E5~500 + F4~500 + A4~500,
500: D5~500 + E5~500 + F4~500 + A4~500,
500: C5~500 + E5~500 + F4~500 + A4~500,
500: C5~500 + E5~500 + F4~500 + A4~500,
500: C5~500 + E5~500 + F4~500 + A4~500,
500: C5~500 + E5~500 + F4~500 + A4~500,
500: C5~500 + B4~500 + F4~500 + A4~500,
500: B4~500 + F4~500 + A4~500,
500: B4~500 + F4~500 + A4~500,
500: B4~500 + F4~500`
const bgmPlayback = playTune(bgm, Infinity);

setLegend(
  [ player, bitmap`
................
................
.....00.........
....0000...00...
...003300.0000..
...03333000000..
..00525220000...
..002222200.....
..00288200......
...0022200......
....000000......
.....0..0.......
....00.00.......
................
................
................` ],
  [ box, bitmap`
................
................
................
..333...........
...33..333......
...33..33.......
...333333.......
...333333.......
...33..33.......
...33..33.......
..333..33.......
.......333......
................
................
................
................`],
  [ goal, bitmap`
................
................
................
................
................
................
..CCC......CCC..
...CCC....CCC...
...CCCCCCCCC....
....CCCCCC......
......CCC.......
................
................
................
................
................`],
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

//create game levels
let level = 0; //this tracks the level we are on
const levels = [
  map`
....
.b.g
...p`,
  map`
p..g
.b..
.b.g`,
    map`
p.wg
.bw.
....
....`,
  map`
p.w.g
.b...
.bw..
..w.g`
];

const currentlevel = levels[level];
setMap(currentlevel);

setSolids([player , box, wall]);
setPushables({
  [player]: [box],
  [box]: [box]
});


onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("s", () =>{
  getFirst(player).y +=1;
});

onInput("a", () =>{
  getFirst(player).x -=1;
});

onInput("d", () =>{
  getFirst(player).x += 1;
});

onInput("j", () =>{
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  const targetNumber = tilesWith(goal).length;
  const numberCovered = tilesWith(goal, box).length;
  if (numberCovered === targetNumber) {
    level = level + 1;
    const currentlevel = levels[level];
    if (currentlevel !== undefined) {
      setMap(currentlevel);
    } else {
      addText("you won mate!", { y: 4, color: color`3`});
    }
  }
});