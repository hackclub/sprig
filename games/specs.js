/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: specs
@author: 
@tags: []
@addedOn: 2024-00-00

To-do, for future iterations:
[] create more levels and components

*/


// sprite definitions, bitmaps, pushables 
const player = "p";
const target = "t";
const bed = "b";

setLegend(
  [ player, bitmap`
................
................
......0000......
.....0....0.....
....0.1..1.0....
....01.11.10....
.....01..10.....
......0000......
.....0....0.....
....00....00....
....0......0....
....0......0....
...00......00...
...0........0...
...0000000000...
................` ],
  [ target, bitmap`
................
................
......LLLL......
.....L....L.....
....L......L....
....L.L..L.L....
.....L5..5L.....
......5LL5......
.....L....L.....
....LL....LL....
....L......L....
....L......L....
...LL......LL...
...L........L...
...LLLLLLLLLL...
................`],
  [ bed, bitmap`
................
...CC......CC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CC000000CC...
...C02222220C...
...0002222000...
...0200000020...
...0333333330...
...3333333333...
...3333333333...
...CC333333CC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
................`]
)

player.type = "p";
target.type = "t";

setSolids([ player, target, bed ]);

// setPushables({
//   [ player ]: []
// })

// level map definitions
let level = 0
const levels = [
  map`
t.....
......
......
......
......
.....p`
]

setMap(levels[level])

var gameRunning = true; 

// pass in a status var in playerMvt -> if player's turn, listen for onInput, if not player's turn, 


onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("d", () => {
  getFirst(player).x += 1
})

// welcome text
function welcome() {
  addText("chase your", { y: 4, color: color`3` });
  addText("friend down ", { y: 5, color: color`3` });
  addText("and hand them", { y: 6, color: color`3` });
  addText("their glasses!", { y: 7, color: color`3` });
}

// target random movement function
function targetMvt() {
  let tInit = getFirst(target);
  let moveCheck = false;
  console.log(directionPick);
  clearTile(tInit.x, tInit.y);
  while(!moveCheck){
    directionPick = Math.floor(Math.random() * 4);
    if(directionPick==0 && tInit.y!=0) {
      addSprite(tInit.x, tInit.y-1, "t");
      moveCheck = true;
    } else if(directionPick==1 && tInit.x!=5) {
      addSprite(tInit.x+1, tInit.y, "t");
      moveCheck = true;
    } else if(directionPick==2 && tInit.y!=5) {
      addSprite(tInit.x, tInit.y+1, "t");
      moveCheck = true;
    } else if(directionPick==3 && tInit.x!=0) {
      addSprite(tInit.x-1, tInit.y, "t");
      moveCheck = true;
    }
  }
}

function checkLocation() {
  let pTag = getFirst(player);
  let tTag = getFirst(target);

  if(getFirst(player).x == getFirst(target).x){
    if((getFirst(player).y == getFirst(target).y+1) || (getFirst(player).y == getFirst(target).y-1)){
      return true; 
    }
  } else if (getFirst(player).y == getFirst(target).y) {
    if((getFirst(player).x == getFirst(target).x+1) || (getFirst(player).x == getFirst(target).x-1)){
      return true; 
    }
  } else {
    return false;
  }
  
} 

welcome()
let start = false;
let caught = false;

afterInput(() => {
  if(!start) {
    clearText()
  }
  checkLocation();
  if(checkLocation()) {
    gameRunning = false;
    addText("the glassses", { y: 4, color: color`3` });
    addText("have been", { y: 5, color: color`3` });
    addText("retrieved!", { y: 5, color: color`3` });
    caught = true;
  }
  if(!caught) {
    targetMvt();
    checkLocation();
    if(checkLocation()) {
      gameRunning = false;
      addText("the glassses", { y: 4, color: color`3` });
      addText("have been", { y: 5, color: color`3` });
      addText("retrieved!", { y: 5, color: color`3` });
      caught = true;
    }
  }
});