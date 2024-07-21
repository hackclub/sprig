/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Juice CLicker
@author: Isaac LeMieux
@tags: []
@addedOn: 2024-00-00
*/

const player = "p";
const background = "b"

setLegend(
  [ player, bitmap`
................
................
................
................
................
................
................
...75555557.....
...77555577.....
...77777777.....
...77777777.....
...77777777.....
...77777777.....
...77777777.....
...77777777.....
................` ],
  [ background, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`]
)


setSolids([])

let level = 0
const levels = [
  map`
..p
...
...`
]


setMap(levels[level])

setPushables({
  [ player ]: []
})

setBackground(background);


//game code
var counter = 0;
var autoJuicers = 0;

// Create a tune:
const buy = tune`
138.24884792626727: G4-138.24884792626727,
138.24884792626727: C5-138.24884792626727,
4147.465437788018`
const make = tune`
500: C4-500,
15500`


function gameText(){
  clearText();
  addText("Press l to\nmake juice\nand press i\nto buy auto\njuicer for\n40 juices that\nmakes 2 per\nsecond", {
    y:7,
    x:4,
    color:color`4`
  });
  
  addText(counter.toString() + " Juices", {y: 2, x: 3, color: color`4`});
  
  addText("Auto Juicers: " + autoJuicers.toString(), {
    y:5,
    x:2,
    color:color`6`
  });
  
}


gameText();

const autoIncrease = setInterval(() => {
  counter += autoJuicers * 2;
  gameText();
}, 1000);



onInput("l", () => {
  counter += 1;
  gameText();
  playTune(make);
})

onInput("i", () => {
  if (counter >= 40) {
    autoJuicers += 1;
    counter -= 40;
    gameText();
    playTune(buy)
  }
})

afterInput(() => {
  
})