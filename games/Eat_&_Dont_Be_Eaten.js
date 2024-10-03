
/* 
@title: Eat_&_Dont_Be_Eaten
@author: Nathan Man
@tags: []
@addedOn: 2023-08-30
*/

    /*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

const player = "p"
const enemy = "e"
const food = 'f'

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ enemy, bitmap`
................
................
................
....33333333....
....30033003....
....30033003....
....33333333....
....33300333....
....33000033....
....30000003....
....33333333....
................
................
................
................
................`],
  [food, bitmap`
................
................
................
.....606606.....
....66666666....
...6333333336...
...DDDDDDDDDD...
...CCCCCCCCCC...
...6CCCCCCCC6...
....66666666....
.....666666.....
................
................
................
................
................`]
)

setSolids([])

let level = 0
const levels = [
  map`
e.....
......
....f.
......
......
...p..`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  if (gameRunning) {
    getFirst(player).y += 1
  }
  
})
onInput("w", () => {
  if (gameRunning) {
  getFirst(player).y -= 1
  }
})
onInput("a", () => {
  if (gameRunning) {
  getFirst(player).x -= 1
  }
})
onInput("d", () => {
  if (gameRunning) {
  getFirst(player).x += 1
  }
})

onInput("i", () => {
  clearText()
  setMap(levels[level])
  startGame()
  score = 0
})
function checkDie() {
  let e = getFirst(enemy);
  let p = getFirst(player);
 
    if (e.x == p.x && e.y == p.y) {
      return true;
  }
 
  return false;
}
function moveEnemy() {
  let theEnemy = getFirst(enemy);
  let dirX = (theEnemy.x - getFirst(player).x) / Math.abs(theEnemy.x - getFirst(player).x);
  let dirY = (theEnemy.y - getFirst(player).y) / Math.abs(theEnemy.y - getFirst(player).y);

  theEnemy.x -= dirX
  theEnemy.y -= dirY
}

function spawnFood() {
  let f = getFirst(food)
  f.x = Math.floor(Math.random() * 8);
  f.y = Math.floor(Math.random() * 8);
}

function checkEat() {
  let f = getFirst(food);
  let p = getFirst(player);
 
    if (f.x == p.x && f.y == p.y) {
      return true;
  }
 
  return false;
}
let score = 0;

afterInput(() => {
  if (checkEat()) {
    score += 1;
    spawnFood();
  }
})


var gameLoop; 
let gameRunning = true;

function startGame() {
  gameRunning = true;
  gameLoop = setInterval(() => {
  moveEnemy()
    if (checkDie()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Score: " + score, {
      x: 5,
      y: 6,
      color: color`3`
    });
      addText("Press I to reset", {
      x: 2,
      y: 8,
      color: color`3`
    });
  }
 
}, 500);

}

startGame();
