/*
@title: Christmas_Themed_Sokoban
@author: Joshua
@tags: ['puzzle']
@addedOn: 2023-01-19
*/


/*
Control the Candy Cane Character using the WASD keys
W to move up, S to move down, A to move left, and D to move right
Place each present "underneath the tree" by moving it to where the tree is
Complete each level to reach a special prize at the end 
*/

const character = "c";
const present = "p";
const socking = "s";
const tree = "t";
const obstacle = "o";

const music = tune`
263.1578947368421: e4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: g4~263.1578947368421,
263.1578947368421: c4~263.1578947368421,
263.1578947368421: d4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: f4~263.1578947368421,
263.1578947368421: f4~263.1578947368421,
263.1578947368421: f4~263.1578947368421,
263.1578947368421: f4~263.1578947368421,
263.1578947368421: f4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: d4~263.1578947368421,
263.1578947368421: d4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: d4~263.1578947368421,
263.1578947368421: g4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: e4~263.1578947368421,
263.1578947368421: e4~263.1578947368421`;

const pickUp = tune`
30,
30: e4-30,
120,
30: f4-30,
750`;

const startingTime = 60;
var tempototal = startingTime;

setLegend(
  [ character, bitmap`
................
................
................
...000000000....
...033333330....
...022222220....
...044400000....
...03330........
...02220........
...04440........
...03330........
...02220........
...04440........
...00000........
................
................`],
  [ present, bitmap`
4444443333444444
4444443333444444
4444443333444444
4444443333444444
4444443333444444
4444443333444444
3333333333333333
3333333333333333
3333333333333333
4444443333444444
4444443333444444
4444443333444444
4444443333444444
4444443333444444
4444443333444444
4444443333444444`],
  [ socking, bitmap`
................
.....000000.....
.....033330.....
.....022220.....
.....033330.....
.....022220.....
.0000033330.....
.0222222220.....
.0333333330.....
.0222222220.....
.0000000000.....
................
................
................
................
................`],
  [ tree, bitmap`
................
................
................
.......0........
......040.......
.....04440......
....0444440.....
...044444440....
..04444444440...
..00000000000...
......000.......
......000.......
......000.......
................
................
................
................`],
  [ obstacle,bitmap`
3333334444333333
3333334444333333
3333334444333333
3333334444333333
3333334444333333
3333334444333333
4444444444444444
4444444444444444
4444444444444444
3333334444333333
3333334444333333
3333334444333333
3333334444333333
3333334444333333
3333334444333333
3333334444333333`]
);

setSolids([ socking, present, character, obstacle ]);

let level = 0;
const levels = [
  map`
sssss
sc..s
s.p.s
sss.s
stp.s
s..ts
sssss`,
  map`
sssss..ssss
s.........s
s.ssssssp.s
s......s..s
ssssss.s..s
ss.c.s.st.s
ss...s.s..s
ssss.s.s..s
ssst...p..s`,
  map`
scss...ssss
s.p.......s
sssssoso.ps
st......s.s
s.......s.s
s.sssss.s.s
s.........s
sssssssssts`,
  map`
scssssssss
s.ssst.p.s
s....s.s.s
s.s.ps.s.s
s.s..s.s.s
s.s.os...t
s.ss.sss.s
s.s......s
s........s
ssssssssss`,
  map`
ssssssss
sss...ss
stcp..ss
sss.ptss
stssp.ss
s.s.t.ss
sptpppts
s...t..s
ssssssss`,
  
];

setMap(levels[level]);

setPushables({
  [ character ]: [ present ],
  [ present ]: [ obstacle ]
});

playTune(music, Infinity);
addText("Press J to Start", {y: 6, color: color`4`});
addText("Push the present", {y: 8, color: color`0`});


onInput("w", () => {
  if(tempototal >= 0){
    getFirst(character).y -= 1
  }

});

onInput("a", () => {
  if(tempototal >= 0){
    getFirst(character).x -= 1
  }
});

onInput("s", () => {
  if(tempototal >= 0){
    getFirst(character).y += 1
  }
});

onInput("d", () => {
  if(tempototal >= 0){
    getFirst(character).x += 1
  }
});

timerfunc();

onInput("j", () => {
  const currentLevel = levels[level];
  timerfunc();
  tempototal = startingTime;
  if (currentLevel !== undefined) {
    clearText();
    setMap(currentLevel);
    
  }
});


function timerfunc() {

var tempodescendo = setInterval(function(){
if(tempototal >= 0){
  tempototal--;
  clearText();
  addText(""+tempototal, { y: 1 , color: color`0` });
}
  
if(tempototal <= 0){
      clearTile(getFirst(character).x,getFirst(character).y);
      clearInterval(tempodescendo);
      clearText();
addText("You lose! ", { y: 2, color: color`3` });
}
},1000);

}

afterInput(() => {
  const targetNumber = tilesWith(tree).length;
  
  const numberCovered = tilesWith(tree, present).length;

  if (numberCovered === targetNumber) {
    level = level + 1;

    const currentLevel = levels[level];
    tempototal = startingTime;
    
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } 
    else {
      addText("You win!", { y: 4, color: color`5` });
      addText("Take this", {y: 6, color: color`5`});
      addText("cookie", {y: 7, color: color`5`});
    }
  }
  
});
