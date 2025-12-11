/*


@title: Fissh
@author: stilk (me!)
@tags: []
@addedOn: 2025-00-00
*/
let speed = 400
const up = tune`
252.10084033613447: F5^252.10084033613447,
7815.126050420168`
const down = tune`
500: E5^500,
15500`
let score = 0;
let gameRunning = true;
const player = "p"
const trash1 = "0"
const trash2 = "1"
const trash3 = "2"
const trash4 = "3"
const wall = "w"
const sand = "s"
const sand2 = "x"
const sand3 = "c"
setLegend(
  [trash4, bitmap`
................
................
................
.....2....2.....
....222..222....
....222..222....
....22222222....
....22222222....
....23333322....
...22222222.....
...22222222.....
....22222222....
.....2222222....
................
................
................`],
  [player, bitmap`
................
................
................
................
..55...55555....
..575.5777775...
..577577777775..
..5777777775775.
..5777777777775.
..577577777775..
..575.5777775...
..55...55555....
................
................
................
................`],
  [trash1, bitmap`
................
......555.......
......222.......
.....22222......
.....22222......
.....22222......
.....55555......
.....52225......
.....55555......
.....22222......
.....22222......
.....22222......
.....22222......
................
................
................`],
  [trash2, bitmap`
................
......L1111.....
.....1111111....
.....3333333....
.....3333333....
.....3333333....
.....3332333....
.....3223223....
.....3333333....
.....3322233....
.....3333333....
.....3333333....
......33333.....
................
................
................`],
  [wall, bitmap`
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
  [trash3, bitmap`
................
................
...2222222222...
...2111111122...
..2222222222....
..2111111122....
..2222222222....
...2222222222...
...2111111112...
...2222222222...
....2222222222..
....2111111112..
....2222222222..
................
................
................`],
  [sand, bitmap`
.4...4.....66..4
6666.D..666666.D
6666666666666666
6666666666666666
6116666666666666
6116666666666666
6666666666666666
6666666666666666
6666666666666666
6666666661666666
6666666611666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [sand2, bitmap`
................
6666............
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [sand3, bitmap`
...........666..
6666....66666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`]
)

setSolids([player, sand, sand2, sand3])

function switchSound(tune) {
  playTune(tune)
}
let level = 0
const levels = [
  map`
.......
.p.....
.......
cxsxscx`
]
//grouping thing beacuse getall sucks
function groupAll(...types) {
  return types.flatMap(t => getAll(t));
}
//fairness thing
function rightSideIsClear() {
  const stuff = groupAll(trash1, trash2, trash3, trash4);
  return !stuff.some(s => s.x >= 5);
}
//fairness thing 2 electric boogaloo
function spawnTrashFair() {

  const hole = Math.floor(Math.random() * 3);

  const types = [trash1, trash2, trash3, trash4];

  for (let y = 0; y < 3; y++) {
    if (y !== hole) {
      const t = types[Math.floor(Math.random() * types.length)];
      addSprite(6, y, t);
    }
  }
}

//remove when touchuing edge
function despawnTrash() {
  const group = groupAll(trash1, trash2, trash3,trash4);
  for (let i = 0; i < group.length; i++) {
    const s = group[i];
    if (s.x == 0) {
      s.remove();
    }


  }
}

function moveTrash() {
  const group = groupAll(trash1, trash2, trash3,trash4);

  for (let i = 0; i < group.length; i++) {
    const s = group[i];
    s.x -= 1;


  }
}
//collision check
function checkHit() {
  let obstacles = groupAll(trash1, trash2, trash3,trash4);
  let p = getFirst(player);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }

  return false;
}

function resetGame() {
  clearInterval(gameLoop)
  setMap(levels[level])
  clearText()
  gameRunning = true;
  score = 0
  speed = 400
  var gameLoop = setInterval(() => {
    speed-=100
    score++
    if (checkHit()) {
      clearInterval(gameLoop);
    }
    despawnTrash();
    moveTrash();
    if (rightSideIsClear()) {
      spawnTrashFair();
    }
    if (checkHit()) {
      clearInterval(gameLoop);
      gameRunning = false;
      addText("Game Over!", {
        x: 5,
        y: 6,
        color: color`3`
      });
      addText(" Press J to restart.", {
        x: 0,
        y: 7,
        color: color`3`
      });
    }
    addText("Score:" + score.toString(), { color: color`2` })
  }, speed);
}


setMap(levels[level])
setBackground([wall])
resetGame()




//input
onInput("s", () => {
  if (gameRunning) {
    switchSound(down)
    getFirst(player).y += 1;
  }
});
onInput("w", () => {
  if (gameRunning) {
    switchSound(up)
    getFirst(player).y -= 1;
  }

});
onInput("j", () => {
  if(!gameRunning){
    resetGame();
  }
  


});

afterInput(() => {

})