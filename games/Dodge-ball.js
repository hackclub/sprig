/*
@title: Dodge ball
@description: Dodge ball is a fun game where your objective is to avoid 500 balls and become victorious. The key mechanics are falling dodgeballs, an in-game key allowing the player to retry and the ability to win, these features make the game unique.
@author: @Ivan
@tags: ['dodging', 'ifinite']
@addedOn: 2026-05-25
*/

const player = "p"
const ball = "b"
const wall = "w"
const background = "k"
const over = "o"


setLegend(
  [player, bitmap`
.....00000......
....0222220.....
....0202020.....
....0222220.....
.....0222.......
......000.......
..003..0...300..
...333333.333...
.....333333.....
......3333......
.......33.......
.......33.......
......0000......
.....00..00.....
.....00..00.....
....00....00....`],
  [ball, bitmap`
................
....22222222....
...22FFFFFF22...
..2FFFFFFFFFF2..
.22FF222222FF22.
.2FF22FFFF22FF2.
.2FF2F2222F2FF2.
.2FF2F2F22F2FF2.
.2FF2F2FF2F2FF2.
.2FF2F2222F2FF2.
.2FF22FFFF22FF2.
.22FF222222FF22.
..2FFFFFFFFFF2..
...22FFFFFF22...
....22222222....
................`],
  [background, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [over, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`]
)

const melody = tune`
260.8695652173913: E5/260.8695652173913 + B5-260.8695652173913,
260.8695652173913: C5/260.8695652173913,
260.8695652173913: E5/260.8695652173913 + A4/260.8695652173913,
260.8695652173913: F5/260.8695652173913 + D5^260.8695652173913 + B4^260.8695652173913,
260.8695652173913: C5/260.8695652173913,
260.8695652173913: C5~260.8695652173913 + A4^260.8695652173913,
260.8695652173913: D5^260.8695652173913,
260.8695652173913: B4-260.8695652173913,
260.8695652173913: C5/260.8695652173913,
260.8695652173913: D5/260.8695652173913,
260.8695652173913: E5/260.8695652173913,
260.8695652173913: F5/260.8695652173913 + D5~260.8695652173913,
260.8695652173913: C5^260.8695652173913,
260.8695652173913: B4-260.8695652173913 + C5~260.8695652173913,
260.8695652173913: D5~260.8695652173913,
260.8695652173913: C5-260.8695652173913,
260.8695652173913: B4-260.8695652173913,
260.8695652173913: C5-260.8695652173913,
260.8695652173913: D5-260.8695652173913 + B4^260.8695652173913,
260.8695652173913: E5/260.8695652173913,
260.8695652173913: F5/260.8695652173913 + D5^260.8695652173913,
260.8695652173913: D5-260.8695652173913,
260.8695652173913: C5-260.8695652173913,
260.8695652173913: B4-260.8695652173913 + E4/260.8695652173913,
260.8695652173913: A4-260.8695652173913,
260.8695652173913: B4~260.8695652173913 + C5^260.8695652173913 + E4/260.8695652173913,
260.8695652173913: C5~260.8695652173913,
260.8695652173913: D5~260.8695652173913 + E5^260.8695652173913 + E4/260.8695652173913,
260.8695652173913: D5/260.8695652173913,
260.8695652173913: E5/260.8695652173913 + E4^260.8695652173913,
260.8695652173913: C5/260.8695652173913 + E4/260.8695652173913,
260.8695652173913: E5/260.8695652173913 + C4-260.8695652173913`

setBackground(background)

gameMap = map`
.......
.......
.......
.......
.......
.......
...p...`

setMap(gameMap)

var gameRunning = true;

onInput("a", () => {
  if (gameRunning == true) {
    getFirst(player).x -= 1
  }
})

onInput("l", () => {
  if (gameRunning == true) {
    getFirst(player).x += 1
  }
})

onInput("w", ()=> {
  if (gameRunning == false) {
    clearText();
    count = 0;
    setMap(gameMap)
    fallTime = 300
    gameRunning = true;
      var gameLoop = setInterval(() => {
      despawnBall();
      moveBall();
      spawnBall();
    
      addText(`Score: ${count}`, {x: 1, y: 1, color:color`L`});
      if (checkHit()) {
        clearInterval(gameLoop);
        gameRunning = false;
        clearText();
        addText(" GAME OVER", {x: 4, y: 6, color:color`3`})
        addText("Score:" + count, {x: 6, y: 7, color:color`1`})
    }
  }, 170);
    }
})


function spawnBall() {
  let x = Math.floor(Math.random() * 7);
  let y = 0;
  addSprite(x, y, ball);
}

function moveBall() {
  let balls = getAll(ball);
  for (let i = 0; i < balls.length; i++) {
    balls[i].y += 1;
  }
}

let count = 0

function despawnBall() {
  let balls = getAll(ball)
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].y == 6) {
      balls[i].remove();
      count = count + 1;
    }
  }
}

function checkHit() {
  let balls = getAll(ball);
  let p = getFirst(player);
 
  for (let i = 0; i < balls.length; i++) {
    if (balls[i].x == p.x && balls[i].y == p.y) {
      return true;
    }
  }
  return false;
}

var gameLoop = setInterval(() => {
  despawnBall();
  moveBall();
  spawnBall();
  
  addText(`Score: ${count}`, {x: 1, y: 1, color:color`L`});
  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    clearText();
    if (count > 499) {
      addText("  YOU WIN", {x: 4, y: 6, color:color`D`});
      addText("Score:" + count, {x: 6, y: 7, color:color`4`});
      addText("Press W to play", {x: 2, y: 9, color:color`C`})
    }
    if (count < 500) {
      addText(" GAME OVER", {x: 4, y: 6, color:color`3`});
      addText("Score:" + count, {x: 6, y: 7, color:color`1`});
      addText("Press W to retry", {x: 2, y: 9, color:color`C`});
    }
  }
}, 170);

playTune(melody, Infinity)
