/*
@title: BreadMaze
@author: Aiden
*/

const player = "p";
const box = "b";
const bread = "r";
const goal = "g";
const thing = "t";

setLegend(
  [ player, bitmap`
................
................
................
.....55555......
....5555555.....
...555555555....
...552555255....
...555555555....
...555555555....
...552555255....
...555222555....
....5555555.....
.....55555......
................
................
................`],
  [ box, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999099999909999
9999999999999999
9999999999999999
9999099999909999
9999000000009999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  [ bread, bitmap`
................
...0000000000...
..0..........0..
..0..........0..
..00........00..
...0........0...
...0........0...
...0........0...
...0........0...
...0........0...
...0........0...
...0........0...
...0000000000...
................
................
................`],
  [ goal, bitmap`
................
.......9........
.......9........
.......9........
.......9........
.......9........
..9....9....9...
...9...9...9....
....9..9..9.....
.....9...9......
......9.9.......
.......9........
................
................
................
................`],
  [ thing,bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000900000090000
0000000000000000
0000000000000000
0000000000000000
0000900000090000
0000999999990000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
);

setSolids([ bread, box, player, thing ]);

let level = 0;
const levels = [
  map`
g......b.
rrrrrrrr.
.......r.
.rrrrr.r.
.rprrr.r.
.r.....r.
.rrrrrrr.
.........`,
  map`
........
pb.....r
rrrrrrtr
........
........
........
g.......`,
  map`
p........r
......b.r.
.......r..
......r...
.....r....
....t...rg
.b.r......
..r...r...
.r....r...
r....rg...`
];

setMap(levels[level]);

setPushables({
  [ player ]: [ box, thing ],
  [ box ]: [ thing ]
});

onInput("w", () => {
  getFirst(player).y -= 1
});

onInput("a", () => {
  getFirst(player).x -= 1
});

onInput("s", () => {
  getFirst(player).y += 1
});

onInput("d", () => {
  getFirst(player).x += 1
});
onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText();
    setMap(currentLevel);
  }
});

//timer - code borrowerd from flurffy
var tempototal = 10;
var tempodescendo = setInterval(function(){
tempototal--;
clearText();
addText(""+tempototal, { y: 1 , color: [255,0,0] });
if(tempototal <= 0){
      clearTile(getFirst(player).x,getFirst(player).y);
      clearInterval(tempodescendo);
      clearText()
}
},1000);

afterInput(() => {
// count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } 
    else {
      addText("you win!", { y: 4, color: [255, 0, 0] });
    }
  }


  
});
