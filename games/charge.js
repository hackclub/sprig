/*
@title: charge
@author: ZeroQLi
@tags: []
@addedOn: 2022-12-23
*/
let easy = true;
/*
(want a harder challenge? change above to false)

          charge - A strategy battle minigame

Welcome to the first edition of charge!, an original 
turn based strategy game by yours truly. 

Your mission? Outsmart your slimy enemy "Bob" using the
items 

Controls:
[ a / d ] to move and select your item.
[ s ] to use and play your item.
[ k ] to start a new round.

There are 3 main mechanics in this game:

1: Charge up
Charge is the currency of this game, showed on the top
of this game(unless).

Gain a Charge by using an orb(center), be carefull though,
using an orb leaves you vulnerable to an attack by Bob.

2: Attack
You can attack bob using 2 items:

  Gun: costs 1 charge to use
       win against charge
       lose against mirror
  Fireball: costs 2 charge to use
       win against charge or shield.
       no affect against mirror.

3: Defend
You can defend aginst bob using 2 items:

  Shield: Free to use.
       protection against Gun
       lose against fireball
  mirror: costs 2 charge to use
       protection against fireball 
       win against Gun.

*/
const winner = () => {
  clearText()
  playTune(win)
  score += 1;
  addText("Round win",{ x: 6,y: 6,color: color`4`})
  addText(score+"-"+enScore,{ x: 9,y: 8,color: color`2`})
  addText("'k' restart",{ x: 5,y: 12,color: color`6`})
  finished = true;
  }
const loser = () => {
  clearText()
  playTune(loss)
  enScore += 1;
  addText("Round Loss",{ x: 5,y: 6,color: color`3`})
  addText(score+"-"+enScore,{ x: 9,y: 8,color: color`2`})
  addText("k to restart",{ x: 3,y: 12,color: color`4`})
  finished = true;
  }


const start = tune`
127.65957446808511,
127.65957446808511: c5-127.65957446808511,
127.65957446808511,
127.65957446808511: d5-127.65957446808511,
127.65957446808511,
127.65957446808511: g5-127.65957446808511,
127.65957446808511: e5-127.65957446808511,
127.65957446808511: g5-127.65957446808511,
127.65957446808511,
127.65957446808511: c5-127.65957446808511,
127.65957446808511,
127.65957446808511: d5-127.65957446808511,
127.65957446808511,
127.65957446808511: g5-127.65957446808511,
127.65957446808511,
127.65957446808511: e5-127.65957446808511,
127.65957446808511: g5-127.65957446808511,
1914.8936170212767`;
const move = tune `
500: c5^500,
15500`;
const error = tune`
162.16216216216216,
162.16216216216216: d4/162.16216216216216,
162.16216216216216: d4/162.16216216216216,
4702.7027027027025`;
const win = tune`
163.9344262295082,
163.9344262295082: c4-163.9344262295082,
163.9344262295082: d4-163.9344262295082,
163.9344262295082: e4-163.9344262295082,
163.9344262295082: g4-163.9344262295082,
163.9344262295082: e4-163.9344262295082,
163.9344262295082: g4-163.9344262295082,
327.8688524590164,
163.9344262295082: a4-163.9344262295082,
163.9344262295082: b4-163.9344262295082,
163.9344262295082: c5-163.9344262295082,
163.9344262295082: e5-163.9344262295082,
163.9344262295082: c5-163.9344262295082,
163.9344262295082: e5-163.9344262295082,
163.9344262295082,
163.9344262295082: g4^163.9344262295082,
163.9344262295082: g4^163.9344262295082,
163.9344262295082: g4^163.9344262295082,
2131.1475409836066`;
const loss = tune`
136.36363636363637,
136.36363636363637: f5/136.36363636363637,
136.36363636363637,
136.36363636363637: c5/136.36363636363637,
136.36363636363637: b4/136.36363636363637,
136.36363636363637: b4/136.36363636363637,
136.36363636363637,
136.36363636363637: b4/136.36363636363637,
136.36363636363637: a4/136.36363636363637,
136.36363636363637: g4/136.36363636363637,
136.36363636363637: f4/136.36363636363637,
136.36363636363637: d4/136.36363636363637,
136.36363636363637: c4/136.36363636363637,
136.36363636363637: c4/136.36363636363637,
272.72727272727275,
136.36363636363637: d4~136.36363636363637,
136.36363636363637,
136.36363636363637: d4~136.36363636363637,
1772.727272727273`;

const player = "p";
const enemy = "e";

const charge = "c";
const gun = "g";
const shield = "s";
const fireball = "f";
const mirror = "m";

const grass = "r";
const picked = "k";
const wall = "w";

const positions = {
  pos1: [2,3],
  pos2: [2,3,4],
  pos3: [1,2,3,4,5]
}

const items = {
  c:0,
  g:1,
  s:0,
  f:2,
  m:2
}

setLegend(
  [ player, bitmap`
................
................
.......5........
.....550555.....
....500000055...
...5002002005...
...5002002005...
...5000000005...
...5002200005...
...500000005....
....5555555.....
....5.....5.....
...55.....5555..
.555.........55.
................
................`],
  [ enemy, bitmap`
................
.....3333333....
...33333333333..
...33000330003..
...33203333023..
...33333333333..
...33333003333..
...33333033333..
...3.333333.33..
...3.........3..
..33.........33.
..33.33...33..3.
...33......3333.
................
................
................`],
  [ charge, bitmap`
................
................
..777777777.....
..72222222277...
..722222222277..
...72222222227..
...72222222227..
...72222222227..
...72222222227..
...72222222227..
....7222222227..
....7222222227..
.....7722222277.
......777777777.
................
................`],
  [ gun, bitmap`
................
................
..00000000000000
..0112121LL11110
.011212111111110
.00000000000000.
..0CCC0.0.0.....
.0CCCC00..0.....
.0CCC00000......
.0CCC0..........
0CCC0...........
0CCC0...........
0CCC0...........
.0000...........
................
................`],
  [ shield, bitmap`
................
.LLLLLLLLLLLLLL.
.LCCCCCCCCCCCCL.
.LCCCCCCCCCCCCL.
.LCCC111111CCCL.
.LCCC111111CCCL.
.LCCC111111CCCL.
.LCCC111111CCCL.
.LCCCC1111CCCCL.
.LCCCCC11CCCCCL.
.LLCCCCCCCCCCLL.
..LLCCCCCCCCLL..
...LLCCCCCCLL...
....LLLCCLLL....
......LLLL......
................`],
  [ fireball, bitmap`
................
..99999999999...
.9999999969999..
.96669999999999.
.99996666669999.
.99999999996669.
.99999999999999.
.99999999999999.
.96666669999999.
.99999996666669.
.99999999999999.
.9966669999999..
..9999999999....
................
................
................`],
  [ mirror ,bitmap`
................
...0000000000...
..002222222200..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..002222222200..
...0000000000...
................`],
  [ grass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ picked, bitmap`
3333333333333333
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3333333333333333`],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`]
);

setSolids([ wall, player, enemy, charge, gun, shield, grass. fireball, mirror, picked ]);

setBackground("r")

let play = false; let finished = false; // round/game vars

let total= 0; let pset; let score = 0; // player vars
let enemyPos, enTotal; let enScore = 0; //enemy vars

if (easy){enTotal = 0}
else{enTotal = 1}


const levels = [
  map`
wwwwwww
w..p..w
wmscgfw
w.....w
w.....w
wmscgfw
w.....w
wwwwwww`
];

let level = 0;
setMap(levels[level]);

setPushables({
  [player]: []
});

// THE GAME

playTune(start)

// Text additions

addText("d/a to move", { 
  y: 1,
  color: color`8`
})
addText("s to confirm", { 
  y: 15,
  color: color`8`
})
addText("Charge!", { 
  y: 6,
  color: color`2`
})
addText("by ZeroQL", { 
  y: 8,
  color: color`2`
})

// START - PLAYER MOVEMENT CONTROLS

onInput("d", () => {
  if(!finished){
    clearText();
    getFirst(player).x += 1;
    playTune(move);
  }
});
  
onInput("a", () => {
  if(!finished){
    clearText();
    getFirst(player).x -= 1;
    playTune(move); 
  }
});

onInput("s", () => {
  if(!finished){
     clearText();
  pset = getTile(getFirst(player).x, getFirst(player).y+1)[0].type;
  if (total >= items[pset]) {
    if (pset == "c"){
      total += 1;
      play = pset;
    }
    total -= items[pset];
    play = pset;
  }
  else{
    playTune(error);
  } 
  }
});

onInput('k', () => {
  if(finished){
    clearText()
    total = 0;
    if (easy){enTotal = 0}
    else{enTotal = 1}
    finished = false;
    addText(""+score, { x: 16,y: 6, color: color`2`})
    addText(""+enScore, { x: 16,y: 9, color: color`2`})
  }
})
// END - PLAYER MOVEMENT CONTROLS
afterInput(()=> {
  
  if(play && !finished){

      addText(" "+play, { y: 14, color: color`8`})

    
      if(enTotal == 0){
        enemyPos = positions.pos1[Math.floor(Math.random()*positions.pos1.length)];
      }
      if(enTotal == 1){
        enemyPos = positions.pos2[Math.floor(Math.random()*positions.pos2.length)];
      }
      if(enTotal >= 2){
        enemyPos = positions.pos3[Math.floor(Math.random()*positions.pos3.length)];
      }
    addSprite(enemyPos, 6, "e");

    let enPlay = getTile(enemyPos, 5)[0].type;

    if (enTotal >= items[enPlay]) {
    if (enPlay == "c"){
      enTotal += 1;
    }
    enTotal -= items[enPlay];
  }
  else{
    playTune(error);
  }
    addSprite(3, 3, play);
    addSprite(3, 4, enPlay);

    if(play == 'g' && enPlay == 'c'){
        winner();
    }
    if(play == 'f' && enPlay == 's'|| play == 'f' && enPlay == 'g' || play == 'f' && enPlay == 'c'){
        winner();
    }
    if(play == 'm' && enPlay == 'g'){
        winner();
    }

    if(enPlay == 'g' && play == 'c'){
        loser();
    }
    if(enPlay == 'f' && play == 's'|| enPlay == 'f' && play == 'g' || enPlay == 'f' && play == 'c'){
        loser();
    }
    if(enPlay == 'm' && play == 'g'){
        loser();
    }
    
    setTimeout(function() {
    clearTile(3,3)
    clearTile(3,4)
    clearTile(enemyPos, 6)
    },1000)
  }
  addText(""+score, { x: 16,y: 6, color: color`2`})
  addText(""+enScore, { x: 16,y: 9, color: color`2`})
  if (easy){
    addText("Charge:"+total, { y: 0, color: color`8`})
    addText("EN Charge: "+ enTotal, { y: 15,color: color`9`})    
  }
  play = false;
})
