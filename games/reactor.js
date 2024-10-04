/*
@title: reaction_timer
@author: sampoder
@tags: ['multiplayer']
@addedOn: 2022-09-16

Instructions:

How fast do you react? Each colour 
is assigned a key/button on the Sprig.

Click any key, wait for a bit, then try to
react faster than the other player! And then click
run to play again. 

Go react!
*/

function randomIntFromInterval(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function getSecondsDiff(startDate, endDate) {
  const msInSecond = 1000;

  return Math.round(
    Math.abs(endDate - startDate)
  );
}

async function sleepFor(sleepDuration){
  var now = new Date().getTime();
  while(new Date().getTime() < now + sleepDuration){ 
      /* Do nothing */ 
  }
}

function theResults(player){
  clicked = true
  addText(`Player ${player} in`, { 
        x: 4, 
        y: 5, 
        color: color`2`
    })
    addText(getSecondsDiff(start, Date.now()).toString(), { 
        x: 7, 
        y: 7, 
        color: color`3`
    })
    addText("milliseconds", { 
        x: 4, 
        y: 9, 
        color: color`2`
    })   
}

function addTheText(){
  addText("hello!", { 
      x: 10, 
      y: 1, 
      color: color`3`
  })
  
  addText("w/i for blue", { 
      x: 1, 
      y: 3, 
      color: color`5` 
  })
  
  addText("a/j for green", { 
      x: 6, 
      y: 5, 
      color: color`D`
  })
  
  addText("s/k for yellow", { 
      x: 1, 
      y: 7, 
      color: color`9`
  })
  
  addText("d/l for purple", { 
      x: 5, 
      y: 9, 
      color: color`H`
  })
  
  addText("press anything", { 
      x: 1, 
      y: 11, 
      color: color`3`
  })
  
  addText("to start (and wait)!", { 
      x: 0, 
      y: 13, 
      color: color`3`
  })
}

const blue = "b";
const green = "g";
const yellow = "y";
const purple = "p";

setLegend(
  [ blue, bitmap`
................
....55555555....
...5555555555...
..555555555555..
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
..555555555555..
...5555555555...
....55555555....
................`],
  [ green, bitmap`
................
....44444444....
...4444444444...
..444444444444..
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
..444444444444..
...4444444444...
....44444444....
................`],
  [ yellow, bitmap`
................
....66666666....
...6666666666...
..666666666666..
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
..666666666666..
...6666666666...
....66666666....
................`],
  [ purple, bitmap`
................
....88888888....
...8888888888...
..888888888888..
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
..888888888888..
...8888888888...
....88888888....
................`]
);

let level = 0;

const levels = [
  map`
.....
.....
.....
.....`,
  map`
b`,
  map`
g`,
  map`
y`,
  map`
p`,
  map`
....
....
....
....`
];

let currentLevel = levels[level];

let clicked = false;

setMap(currentLevel);

setSolids([blue, green, yellow, purple]);

addTheText()

let start = Date.now()

onInput("w", () => {
  if(level == 1 && !clicked){
    theResults("1")
  }
});

onInput("i", () => {
  if(level == 1 && !clicked){
    theResults("2")
  }
});

onInput("a", () => {
  if(level == 2 && !clicked){
    theResults("1")
  }
});

onInput("j", () => {
  if(level == 2 && !clicked){
    theResults("2")
  }
});

onInput("s", () => {
  if(level == 3 && !clicked){
    theResults("1")
  }
});

onInput("k", () => {
  if(level == 3 && !clicked){
    theResults("2")
  }
});

onInput("d", () => {
  if(level == 4 && !clicked){
    theResults("1")
  }
});

onInput("l", () => {
  if(level == 4 && !clicked){
    theResults("2")
  }
});

afterInput(() => {
  if(level == 0){
    sleepFor(randomIntFromInterval(1000, 2000))
    level = randomIntFromInterval(1, 4)
    currentLevel = levels[level];
    setMap(currentLevel);
    clearText()
    start = Date.now()
  }
});
