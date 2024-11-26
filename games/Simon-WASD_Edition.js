/*
@title: Simon-WASD_Edition
@author: Eli Coustan
@tags: ['retro']
@addedOn: 2022-11-13
@github: edcous

Instructions:

1. Press J to start
2. The game will show you the pattern.
3. Once it is done displaying, use W, A, S and D to select each color in the pattern in the order that it was displayed.

Objective: to get the highest score possible
*/

// define sprites
const sprig = "a";
const red = "b";
const red_hl = "c";
const green = "d";
const green_hl = "e";
const blue = "f";
const blue_hl = "g";
const orange = "h";
const orange_hl = "i";
const game_over = "j";
const ack = "k";

// define sounds
const start = tune`
200: d4-200 + c4-200 + e4-200,
200: e4-200 + f4-200 + d4-200,
200: c4~200,
200: c4~200 + e4~200 + d4~200 + g4~200 + f4~200,
200: c4~200 + d4~200 + e4~200 + f4~200 + g4~200,
200: d4^200 + e4^200 + f4^200 + g4^200,
200: e4/200 + f4/200 + d4~200 + c4~200 + g4/200,
200: d4/200 + c4~200 + f4/200 + e4/200 + g4/200,
200: e4~200 + c4/200 + a4/200 + d4/200 + f4/200,
200: e4~200 + d4~200 + c4/200 + a4/200 + f4/200,
200: g4/200 + d4/200 + c4/200 + e4/200 + f4^200,
200: g4/200 + f4/200 + e4-200 + d4/200,
4000`
const info = tune`
500: c5^500,
15500`
const right = tune`
1500: c5/1500,
46500`
const wrong = tune`
750: d4-750,
750: c4-750,
22500`

// define vars for game logic
let current = 0;
let score = -1;
let pattern = [];
let mode = "start";
let level = 0;
let correct = "";
let chose = "";
let key = ["", "W", "A", "S", "D"]

// import sprites
setLegend(
  [sprig, bitmap`
...333..........
...333..........
...333..........
...333..........
...333..........
...333..........
...333..........
...333..........
...3333333333...
...3333333333...
...3333333333...
...333....333...
...333....333...
...333....333...
...333....333...
...333....333...`],
  [red, bitmap`
3333333333333333
3333333333333333
3323333333333233
3323333333333233
3332333333332333
3332333333332333
3332333333332333
3333233333332333
3333233333323333
3333323333323333
3333323323323333
3333323232323333
3333332232233333
3333332333233333
3333333333333333
3333333333333333`],
  [red_hl, bitmap`
6666666666666666
6666666666666666
6623333333333266
6623333333333266
6632333333332366
6632333333332366
6632333333332366
6633233333332366
6633233333323366
6633323333323366
6633323323323366
6633323232323366
6633332232233366
6633332333233366
6666666666666666
6666666666666666`],
  [green, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDD2222DDDDDD
DDDDDD2DD2DDDDDD
DDDDD2DDDD2DDDDD
DDDDD2DDDD2DDDDD
DDDDD2DDDD2DDDDD
DDDD2DDDDDD2DDDD
DDDD22222222DDDD
DDD2DDDDDDDD2DDD
DDD2DDDDDDDD2DDD
DDD2DDDDDDDD2DDD
DD2DDDDDDDDDD2DD
DD2DDDDDDDDDD2DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [green_hl, bitmap`
6666666666666666
6666666666666666
66DDDD2222DDDD66
66DDDD2DD2DDDD66
66DDD2DDDD2DDD66
66DDD2DDDD2DDD66
66DDD2DDDD2DDD66
66DD2DDDDDD2DD66
66DD22222222DD66
66D2DDDDDDDD2D66
66D2DDDDDDDD2D66
66D2DDDDDDDD2D66
662DDDDDDDDDD266
662DDDDDDDDDD266
6666666666666666
6666666666666666`],
  [blue, bitmap`
7777777777777777
7777777777777777
7722222222222277
7727777777777777
7727777777777777
7727777777777777
7727777777777777
7722222222222277
7777777777777277
7777777777777277
7777777777777277
7777777777777277
7777777777777277
7722222222222277
7777777777777777
7777777777777777`],
  [blue_hl, bitmap`
6666666666666666
6666666666666666
6622222222222266
6627777777777766
6627777777777766
6627777777777766
6627777777777766
6622222222222266
6677777777777266
6677777777777266
6677777777777266
6677777777777266
6677777777777266
6622222222222266
6666666666666666
6666666666666666`],
  [orange, bitmap`
9999999999999999
9999999999999999
9922222222222299
9929999999999299
9929999999999299
9929999999999299
9929999999999299
9929999999999299
9929999999999299
9929999999999299
9929999999999299
9929999999999299
9929999999999299
9922222222222299
9999999999999999
9999999999999999`],
  [orange_hl, bitmap`
6666666666666666
6666666666666666
6622222222222266
6629999999999266
6629999999999266
6629999999999266
6629999999999266
6629999999999266
6629999999999266
6629999999999266
6629999999999266
6629999999999266
6629999999999266
6622222222222266
6666666666666666
6666666666666666`],
  [game_over, bitmap`
2222H7HH4H4H8888
2HHH7H74H4H48HHH
2H227774HHH48888
2HH27H74HHH48HHH
22227H74HHH48888
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
555556HHH6444888
5HHH5H6H6H4HH8H8
5HHH5H6H6H44H888
5HHH5H6H6H4HH88H
55555HH6HH4448H8`],
);

// import "levels"
const levels = [
  map`
.b.
dah
.f.`,
  map`
.c.
dah
.f.`,
  map`
.b.
eah
.f.`,
  map`
.b.
dah
.g.`,
  map`
.b.
dai
.f.`,
  map`
.j.
...
a..`,
  map`
...
...
a..`,
];

// play start tune, set to starting display with instructions
playTune(start)
setMap(levels[6])
addText(`J to start`, {x: 3, y: 7})
addText(`ack on`, {x: 7, y: 15, color: color`3`})

// function to get random number from 1 to 4 and push to pattern array, increase score by 1
function addLevel(){
  mode = "display"
  pattern.push(Math.floor(Math.random() * 4 ) + 1)
  score++;
}

// displays current pattern from array in order, with sfx
function displayCurrent(){
  mode = "display"
  let l = 0;
  pattern.forEach(element => {
      setTimeout(() => {
        setMap(levels[element])
        playTune(info)
      }, l * 1000);
      setTimeout(() => {
        setMap(levels[0])
      }, l * 1000 + 650);
      l++;
    if(l === pattern.length){
      setTimeout(() => {
        mode = "start_guess"
      }, (l-1) * 1000 + 650);
    }
  });
}

// used for guessing, selects a part of the pattern and provides feedback if correct or not
function select(num){
  if(mode === "display" || mode === "start" || mode === "wrong"){
    return;
  }
  else if(pattern[current] === num){
    setMap(levels[num])
    setTimeout(() => {
      setMap(levels[0])
    }, 300);
    mode = "guess"
  }
  else{
    mode = "wrong"
    correct = pattern[current]
    chose = num
  }
  if(mode == "guess"){
    playTune(right)
    current++;
    if(current === pattern.length){
      current = 0;
      addLevel();
      setTimeout(() => {
        displayCurrent()
      }, 1000);
    }
  }
  else if(mode == "wrong"){
    playTune(wrong)
    setMap(levels[5])
    addText(`Score: ${score}`, {x: 2, y: 6})
    addText(`J for restart`, {x: 2, y: 7})
    addText(`By Eli Coustan`, {x: 2, y: 8})
    addText(`@edcous`, {x: 2, y: 9})
    addText(`ack Club!`, {x: 7, y: 15, color: color`3`})
    addText(`Correct: ${key[correct]}`, {x: 5, y: 11, color: color`D`})
    addText(`You chose: ${key[chose]}`, {x: 5, y: 12, color: color`8`})
    score = 0
    pattern = []
    mode = "start"
    current = 0
  }
}

// call select function when various keys pressed
onInput("w", () => {
  select(1)
});
onInput("a", () => {
  select(2)
});
onInput("s", () => {
  select(3)
});
onInput("d", () => {
  select(4)
});
// start (or restart) game
onInput("j", () => {
  if(mode === "start"){
    clearText()
    addLevel()
    displayCurrent()
  }
});