/*
@title: Save-The-Flower
@author: Mahir Ishum
@tags: ['strategy', 'endless']
@addedOn: 2024-02-17

About the game:
This game is about saving a fire. There is a flower in the middle. Fires will come towards the flower from two corners. You are driving a firetruck. 
Your mission should you choose to accept it is to save the flower from the fires. Do you have the speed and courage to complete this mission? 
(Actually you cannot because it is a game with no end but let's see how much can you withstand?) 

Instructions:
Press I to start the game. The fires will come from the upper left and bottom right. As time goes by, the speed of the fires will increase. 
You need to run over a fire to extinguish it. Use the keys WASD to move up, left, down and right respectively. After a certain amount of time walls will start to block your way. 
I also wrote functions for the fires to come from other two corners also but there seems to be a problem with those two function, so I'm keeping them as a comment in the code for now.

*/
const player = "p"
const fireLUP = "l"
const fireLDOWN = "m"
const fireRUP = "n"
const fireRDOWN = "o"
const flower = "f"
const wall = "y"

var gamerunning=false
var currentInterval = 1800;

addText("Welcome!", {
      x: 6,
      y: 1,
      color: color`H`
});
addText("In This Game You  ",{
  x:2,
  y:3,
  color: color`5`
});
addText("Have to Save",{
  x:4,
  y:4,
  color: color`5`
});
addText("The Flower from",{
  x:2,
  y:5,
  color: color`5`
});
addText("Fires by Running",{
  x:2,
  y:6,
  color: color`5`
});
addText("Over Them",{
  x:5,
  y:7,
  color: color`5`
});
addText("I wish:",{
  x:4,
  y:11,
  color: color`D`
});
addText("You",{
  x:11,
  y:11,
  color: color`3`
});
addText("Don't Win ;) ^=^",{
  x:2,
  y:12,
  color: color`3`
});
addText("Press i to start",{
  x:2,
  y:14,
  color: color`D`
});


onInput("i", () => {clearText();
                    gamerunning=true;
                   increaseSpeed();})

setLegend(
  [ player, bitmap`
................
................
................
................
................
..777777777777..
.77733333333777.
7777113333117777
7777113333117777
.77763333336777.
..773333333377..
....00....00....
....00....00....
................
................
................` ],
  [ fireLUP, bitmap`
................
................
................
................
................
................
.....66.........
.....33.........
....3663........
...336633.......
....3333........
.....33.........
................
................
................
................`],
  [ fireLDOWN, bitmap`
................
................
................
................
................
................
.....66.........
.....33.........
....3663........
...336633.......
....3333........
.....33.........
................
................
................
................`],
  [ wall, bitmap`
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
CCCCCCCCCCCCCCCC`],
  [ fireRUP, bitmap`
................
................
................
................
................
................
.....66.........
.....33.........
....3663........
...336633.......
....3333........
.....33.........
................
................
................
................`],
  [ fireRDOWN, bitmap`
................
................
................
................
................
................
.....66.........
.....33.........
....3663........
...336633.......
....3333........
.....33.........
................
................
................
................`],
  [ flower, bitmap `
................
................
................
.......55.......
......3HH3......
.....373373.....
....37399373....
...3735445373...
...3735445373...
....37366373....
.....396693.....
......9669......
......9999......
................
................
................`],
)


let level = 0
const levels = [
  map`
l.......n
.........
.........
....p....
....f....
.........
.........
.........
m.......o`,

]

setMap(levels[level])

setSolids([ player, flower, wall]);

setPushables({
  [ player ]: []
})

onInput("s", () => {
    if (gamerunning) {
        let playerSprite = getFirst(player);
        extinguishFireAt(playerSprite.x, playerSprite.y + 1); // Check below the player
        playerSprite.y += 1;
    }
});
onInput("w", () => {
    if (gamerunning) {
        let playerSprite = getFirst(player);
        extinguishFireAt(playerSprite.x, playerSprite.y - 1); // Check above the player
        playerSprite.y -= 1;
    }
});
onInput("a", () => {
    if (gamerunning) {
        let playerSprite = getFirst(player);
        extinguishFireAt(playerSprite.x - 1, playerSprite.y); // Check to the left of the player
        playerSprite.x -= 1;
    }
});
onInput("d", () => {
    if (gamerunning) {
        let playerSprite = getFirst(player);
        extinguishFireAt(playerSprite.x + 1, playerSprite.y); // Check to the right of the player
        playerSprite.x += 1;
    }
});


function spawnfireLUP() {
  let fires = getAll(fireLUP);
 
  for (let i = 0; i < fires.length; i++) {
    fires[i].y += 1;
    fires[i].x += 1;
  }
  addSprite(0, 0, fireLUP);
}
/*
will be implemented later as currently this function is having some problem
function spawnfireLDOWN() {
  let fires = getAll(fireLDOWN);
 
  for (let i = 0; i < fires.length; i++) {
    fires[i].y -= 1;
    fires[i].x += 1;
  }
  addSprite(8, 0, fireLDOWN);
}
*/


/*
will be implemented later as currently this function is having some problem
function spawnfireRUP() {
  let fires = getAll(fireRUP);
 
  for (let i = 0; i < fires.length; i++) {
    fires[i].y += 1;
    fires[i].x -= 1;
  }
  addSprite(0, 8, fireRUP);
}
*/

function spawnfireRDOWN() {
  let fires = getAll(fireRDOWN);
  for (let i = 0; i < fires.length; i++) {
    fires[i].y -= 1;
    fires[i].x -= 1;
  }
    addSprite(8, 8, fireRDOWN);
}


function extinguishFireAt(x, y) {
    let fires = getAll(fireLUP).concat(getAll(fireRDOWN)); 
    for (let i = 0; i < fires.length; i++) {
        if (fires[i].x === x && fires[i].y === y) {
            fires[i].remove(); 
            break;
        }
    }
}

  

function checkHit() {
  let fires = getAll(fireLUP, fireLDOWN, fireRUP, fireRDOWN);
  let f = getFirst(flower);
 
  for (let i = 0; i < fires.length; i++) {
    if (fires[i].x == f.x && fires[i].y == f.y) {
      return true;
    }
  }
 
  return false;
}




function increaseSpeed() {
    const speedIncreaseInterval = setInterval(() => {
        if (!gamerunning) {
            clearInterval(speedIncreaseInterval);
            return;
        }
        currentInterval *= 0.85; 
    }, 1500);
}


var spawnwall = setInterval(() => {
    if(gamerunning) {
      let starty=2
      let walls = getAll(wall);
  for (let i = 0; i < walls.length; i++) {
    walls[i].x += 1;
    if(walls[i].x==8){
    starty +=4}
    if (walls[i].y == 5 && walls[i].x==8 ) {
      break;}
    

  }
    addSprite(1, starty, wall);
}
  }, 6000)
                                
    

var gameloop= setInterval(() => {
  if (gamerunning) {
  spawnfireLUP();
 /* spawnfireLDOWN(); These two functions are having problem, so they will be implemented in future
  spawnfireRUP();*/
  spawnfireRDOWN();
  if (checkHit()) {
    clearInterval(gameloop);
    gamerunning = false;
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`D`
    });
  }
}
}, currentInterval);
