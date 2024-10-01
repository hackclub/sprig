/*
@title: floppyMatch
@author: GBan22
@tags: ['puzzle']
@addedOn: 2022-10-05
Instructions:

In floppyMatch, you control a pointer that can move from left to right. A floppy disk appears at the top of the screen, and you have to match it. 

You match it by moving the pointer with a and d and selecting a floppy disk top and bottom with i (that match the disk on the top). 
After you select two parts, the program checks whether the selections are correct. If they are, you get a point, 
but if they aren't, then you get a strike. After ten points, you win, but after 3 strikes, you lose and your 
progress is reset. (if you accidentally select a part that you don't want to, press k and your chosen parts should reset.) 
You can also press j to restart or play again. There is also a timer (it serves no use other than for fun).

Try to beat your time! Press j if u want to restart, by the way, and press k to reset your chosen pieces.
*/

const p1 = "a";
const p2 = "b";
const p3 = "c";
const s1 = "d";
const s2 = "e";
const dot = "l";
const s3 = "f";
const pointer = "p";
const lito = ["a", "b", "c"]
const litotwo = ["d", "e", "f"]
const checkForFull = ["a","b","c","d","e","f"]
let onesTheyChose = []
let ptsNeeded = 10
let chosen = []
let timerStart = 0
let counter = 0
let chosenimes = 0
let messUps = 0
let totalMess = 0
let wrongs =0
let ind = 1
const melody = tune`
315.7894736842105,
315.7894736842105: b4/315.7894736842105 + b5^315.7894736842105,
315.7894736842105,
315.7894736842105: b4/315.7894736842105 + b5^315.7894736842105,
315.7894736842105,
315.7894736842105: b4/315.7894736842105 + b5^315.7894736842105,
315.7894736842105,
315.7894736842105: b4/315.7894736842105 + b5^315.7894736842105,
315.7894736842105: g4/315.7894736842105,
315.7894736842105: a4/315.7894736842105 + b5^315.7894736842105,
315.7894736842105: c5/315.7894736842105,
315.7894736842105: d5/315.7894736842105 + b5^315.7894736842105,
315.7894736842105: e5/315.7894736842105,
315.7894736842105: d5/315.7894736842105 + b5^315.7894736842105,
315.7894736842105: b4/315.7894736842105,
315.7894736842105: a4/315.7894736842105 + b5^315.7894736842105,
315.7894736842105: g4/315.7894736842105,
315.7894736842105: f4/315.7894736842105 + b5^315.7894736842105,
315.7894736842105: f4/315.7894736842105,
315.7894736842105: f4/315.7894736842105 + b5^315.7894736842105,
315.7894736842105: f4/315.7894736842105,
315.7894736842105: e4/315.7894736842105 + b5^315.7894736842105,
315.7894736842105: d4/315.7894736842105,
315.7894736842105: c4/315.7894736842105 + b5^315.7894736842105,
315.7894736842105: c4/315.7894736842105,
315.7894736842105: d4/315.7894736842105 + b5^315.7894736842105,
315.7894736842105: d4/315.7894736842105,
315.7894736842105: f4/315.7894736842105 + b5^315.7894736842105,
315.7894736842105: g4/315.7894736842105,
315.7894736842105: b4/315.7894736842105 + b5^315.7894736842105,
315.7894736842105: c5/315.7894736842105,
315.7894736842105: d5/315.7894736842105 + b5^315.7894736842105`
const right = tune`
330,
30: f4-30,
30: f4~30 + g4-30,
30: g4-30 + f4~30,
30: a4-30 + g4~30,
30: b4-30 + a4~30,
30: c5-30 + b4~30,
30: c5-30 + b4~30,
30: d5~30 + b5/30 + a5/30,
30: d5~30 + b5/30 + a5/30,
30: d5~30 + b5/30 + a5/30,
30: d5~30 + b5/30 + a5/30,
300`
const wrong = tune`
30,
30: c4~30 + f5~30,
30: c4~30,
30: c4~30 + d5~30,
30: c4~30,
30: c4~30 + b4~30,
30: c4~30,
30: c4~30,
30: c4~30 + a4~30,
30,
30: f4~30,
60,
30: e4~30,
30,
30: c4~30,
480`
const choose = tune`
390,
30: c5-30,
30: c5-30,
30: c5-30,
30: c5-30,
30: c5-30,
420`
const lose = tune`
60,
30: d5/30 + c5/30,
30: c5/30 + a4/30 + b4/30 + g4/30 + f4/30,
30: f4/30 + e4/30,
30: e4/30 + d4/30,
30: d4/30,
30: d4/30 + e4/30 + f4/30,
30: d4/30 + f4/30 + f5/30,
30: d4/30 + e4/30 + d5/30 + c5/30,
30: d4/30 + c4/30 + e4/30 + c5/30 + b4/30,
30: c4/30 + e4/30 + b4/30 + a4/30,
30: c4/30 + e4/30,
30: c4/30 + d4/30 + c5/30,
30: c4/30 + d4/30,
30: c4/30 + d4/30 + b4/30 + a5/30 + g5/30,
30: c4/30 + d4/30 + b4/30,
30: c4/30 + e4/30 + c5/30,
30: c4/30 + d4/30 + c5/30 + a5/30,
30: e4/30 + d5/30 + e5/30 + a5/30,
30: a5/30,
30: d4/30 + a5/30,
30: a5/30,
30: f4/30,
30,
30: d4/30,
30,
30: f4/30,
30: f4/30,
30,
30: d5/30,
30`
const okay = tune`
30: c4/30 + d4-30,
30: d4-30 + c4~30,
30: c4/30 + d4-30,
30: d4-30 + c4~30,
30: c4/30 + d4-30,
30: d4-30 + c4~30,
30: c4/30 + d4-30,
30: d4-30 + c4~30,
30: c4/30 + d4-30,
30: d4/30 + e4/30 + f4/30 + c4~30 + g4-30,
30: g4/30 + c4~30 + d4~30 + e4~30 + f4~30,
30: a4-30 + g4~30,
30: g4/30 + f4~30 + e4~30 + d4~30 + c4~30,
30: f4/30 + e4/30 + d4/30 + c4~30 + g4-30,
30: c4-30 + d4^30,
30: d4-30,
420,
30: e4/30,
30: e4/30`;
setLegend(
  [p1, bitmap`
................
................
................
................
................
................
................
0000000000000000
0LLLLLLLLLLLLLL0
0LLLL2LLLL2LLLL0
0LLLL22LL22LLLL0
0LLLL22LL22LLLL0
0LLLL222222LLLL0
0LLLL222222LLLL0
0LLLL222222LLLL0
0000000000000000`],
  [p2, bitmap`
................
................
................
................
................
................
................
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0000000000000000
0000000000000000
0L222222222222L0
0L222222222222L0
0L222222222222L0
0L222222222222L0
0000000000000000`],
  [p3, bitmap`
................
................
................
................
................
................
................
0000000000000000
0LLLL222222LLLL0
0LLLL222222LLLL0
0LLLL222222LLLL0
0LLLL222222LLLL0
0LLLL222222LLLL0
0LLLL222222LLLL0
0LLLL222222LLLL0
0000000000000000`],
  [s1, bitmap`
0000000000000000
0LL0LLLL22L20LL0
0LL0LLLL22L20LL0
0LL0LLLL22L20LL0
00L0LLLL22L20L00
0LL0000000000LL0
0LLLLLLLLLLLLLL0
................
................
................
................
................
................
................
................
................`],
  [s2, bitmap`
0000000000000000
0LL0LLLL11L10LL0
0LL0LLLL11L10LL0
0LL0LLLL11L10LL0
00L0LLLL11L10L00
0LL0000000000LL0
0LLLLLLLLLLLLLL0
................
................
................
................
................
................
................
................
................`],
  [s3, bitmap`
0000000000000000
0LL0LLLL77L70LL0
0LL0LLLL77L70LL0
0LL0LLLL77L70LL0
00L0LLLL77L70L00
0LL0000000000LL0
0LLLLLLLLLLLLLL0
................
................
................
................
................
................
................
................
................`],
  [pointer, bitmap`
.......3........
......333.......
......333.......
......333.......
......333.......
.....33333......
.....33333......
.....33333......
....3333333.....
....3333333.....
....3333333.....
...333333333....
...333333333....
..33333333333...
.3333333333333..
.3333333333333..`],
  [dot, bitmap`
...9999999999...
..999009999999..
.99990099999999.
9999900999999999
9999900999999999
9999900999999999
9999900999999999
9999900999999999
9999900999999999
9999900999999999
9999900000009999
9999900000009999
9999900999009999
.99990099900999.
..999009990099..
...9999999999...`]
  
);

let score = 0
addText(score.toString() + " " + wrongs.toString() + " " + counter.toString(), {x:12, y:13, color: color`5`})
setSolids([]);

let level = 0;
const levels = [
  map`
......
......
abcdef
.p....
......
......`,
  map`
........l
.........
.........
.........
.........
.........`
];

setMap(levels[level]);
const ypos = getFirst(pointer).y


timerStart = setInterval(() => {
    addText(score.toString() + " " + wrongs.toString() + " " + counter.toString(), {x:12, y:13, color: color`5`})
    counter += 1;
}, 1000);


onInput("d", () => {
  try {
    getFirst(pointer).x += 1
    ind += 1
    if (ind > 5) {
      ind = 5
    }
    // console.log(ind)
  } catch (error) {
    // console.log("ignored")

  }
  
});

onInput("j", () => {
  //messUps += 1 cant do this here because idf want to restart the game will keep the reset cioutner and iwkll have no way of restting it unless through resetting everything if j lkey resets evberything cmpletely have tio reset evberything or nothing since i dotn want ot resrt othermessup variable when this hits bnt nmight have yto
  setMap(levels[level])
  messUps = 0
  chosenimes = 0;
  totalMess = 0;
  clearText()
  clearInterval(timerStart)
  timerStart = setInterval(() => {
    addText(score.toString() + " " + wrongs.toString() + " " + counter.toString(), {x:12, y:13, color: color`5`})
    counter += 1;
}, 1000);
  counter = 0
  score = 0
  wrongs = 0
  doStuff()
});

onInput("k", () => {
  chosenimes = 0;
  chosen = [];
  playTune(okay);
});

onInput("a", () => {
  try {
    getFirst(pointer).x -= 1
    ind -= 1 
    if (ind < 0) {
      ind = 0
    }
    // console.log(ind)

  } catch (error) {
    // console.log("ignored a")

  }
  

});

onInput("i", () => {

  if (chosenimes < 2) {
    chosen.push(checkForFull[ind])
    
    chosenimes += 1
    if (chosenimes == 2) {
      // console.log(chosen)
      // console.log(onesTheyChose)
      //much more efficient way to doing this, checking if lisrts are equal has more edge case detetion with larger lists, but can jnust check if for each ithing in lis tif it exists on the other, nette rthan this big ifc loop
      if ((chosen[0] === onesTheyChose[0] && chosen[1] === onesTheyChose[1]) || (chosen[1] === onesTheyChose[0] && chosen[0] === onesTheyChose[1])) {
        playTune(right)
        score +=1
        if (score >= ptsNeeded) {
          clearInterval(timerStart)
          setMap(levels[1])
          clearText()
          
          addText("You got to " + ptsNeeded.toString() + "!", {x:1, y:3, color: color`5`})
          addText("Time it took: " + counter.toString(), {x:1, y:6, color: color`5`})
          addText("Messups: " + totalMess.toString(), {x:1, y:9, color: color`5`})
          addText("Resets: " + messUps.toString(), {x:1, y:12, color: color`5`})
      
        } else {
          doStuff()
        }
        
      }
      else {
        // console.log("rip")

        wrongs += 1
        totalMess += 1
        playTune(wrong)
        if (wrongs == 3) {
          messUps += 1
          wrongs = 0
          score = 0
          playTune(lose)
          clearText()
          addText(score.toString() + " " + wrongs.toString(), {x:12, y:13, color: color`5`})

          doStuff()
        }
      else {

          playTune(wrong)
          doStuff()
          
          
      }


        
        
      }
    }
    
  }
});

function doStuff() {

clearTile(3,0)
chosenimes = 0
onesTheyChose = []
chosen = []
var rand = Math.random();
var final = rand * lito.length;
var total = Math.floor(final);

addSprite(3, 0, lito[total])
onesTheyChose.push(lito[total])

var ran = Math.random();
var fina = ran * litotwo.length;
var tota = Math.floor(fina);

addSprite(3, 0, litotwo[tota])
onesTheyChose.push(litotwo[tota])

}

doStuff()


afterInput(() => {

  
  addText(score.toString() + " " + wrongs.toString(), {x:12, y:13, color: color`5`})


  
  
});
