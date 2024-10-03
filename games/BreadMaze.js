/*
@title: BreadMaze
@author: Aiden
@tags: ['puzzle']
@addedOn: 2022-10-20
*/

const player = "p";
const box = "b";
const bread = "r";
const goal = "g";
const thing = "t";

// Tunes
const music = tune`
263.1578947368421: c4~263.1578947368421,
263.1578947368421: d4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: f4~263.1578947368421,
263.1578947368421: g4~263.1578947368421,
263.1578947368421: a4~263.1578947368421,
263.1578947368421: b4~263.1578947368421,
263.1578947368421: c5~263.1578947368421,
263.1578947368421: d5~263.1578947368421,
263.1578947368421: e5~263.1578947368421,
263.1578947368421: f5~263.1578947368421,
263.1578947368421: g5~263.1578947368421,
263.1578947368421: a5~263.1578947368421,
263.1578947368421: b5~263.1578947368421,
263.1578947368421: a5~263.1578947368421,
263.1578947368421: g5~263.1578947368421,
263.1578947368421: f5~263.1578947368421,
263.1578947368421: e5~263.1578947368421,
263.1578947368421: d5~263.1578947368421,
263.1578947368421: c5~263.1578947368421,
263.1578947368421: b4~263.1578947368421,
263.1578947368421: a4~263.1578947368421,
263.1578947368421: g4~263.1578947368421,
263.1578947368421: f4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: d4~263.1578947368421,
263.1578947368421: c4~263.1578947368421,
263.1578947368421: d4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: f4~263.1578947368421,
263.1578947368421: g4~263.1578947368421,
263.1578947368421: a4~263.1578947368421`;
const pickUp = tune`
30,
30: d4-30,
120,
30: b5-30,
750`;

const initialTime = 60;
var tempototal = initialTime;

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
  [ player ]: [ box ],
  [ box ]: [ thing ]
});

playTune(music, Infinity);
addText("Press J to Start", {y: 6, color: color`4`});
addText("Pusht the Orange Box", {y: 9, color: color`0`});


onInput("w", () => {
  if(tempototal >= 0){
    getFirst(player).y -= 1
  }

});

onInput("a", () => {
  if(tempototal >= 0){
    getFirst(player).x -= 1
  }
});

onInput("s", () => {
  if(tempototal >= 0){
    getFirst(player).y += 1
  }
});

onInput("d", () => {
  if(tempototal >= 0){
    getFirst(player).x += 1
  }
});

timerfunc();

onInput("j", () => {
  const currentLevel = levels[level];
  timerfunc();
  tempototal = initialTime;
  if (currentLevel !== undefined) {
    clearText();
    setMap(currentLevel);
    
  }
});



function timerfunc() {

  //timer - code borrowerd from flurffy
var tempodescendo = setInterval(function(){
if(tempototal >= 0){
  tempototal--;
  clearText();
  addText(""+tempototal, { y: 1 , color: color`3` });
}
  
if(tempototal <= 0){
      clearTile(getFirst(player).x,getFirst(player).y);
      clearInterval(tempodescendo);
      clearText();
addText("time ran out ");
}
},1000);

}

afterInput(() => {
// count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];
    tempototal = initialTime;
    
    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } 
    else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }


  
});
