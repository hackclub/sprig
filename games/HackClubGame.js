/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: HackClubGame
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const enemy = "e"

setLegend(
  [ player, bitmap`
................
................
....00000000....
...06LL66LL60...
..06L666666L60..
..066006600660..
.06660666606660.
.06666666666660.
.06660666666660.
..066000006660..
...0666666660...
....00000000....
................
................
................
................` ],
  [enemy, bitmap`
................
................
...LL......LL...
....LL0000LL....
...03LL33LL30...
...033L33L330...
..030333333030..
..030033330030..
.03333333333330.
.03330000033330.
.03330333333330.
..033333333330..
...0000000000...
................
................
................`]
)

setSolids([])

let level = 0
const levels = [
  map`
........e.
........e.
........e.
........e.
p.........
........e.
........e.
........e.`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})
let p = getFirst(player)
let pHealth = 3

let score=0
let count=0
let speed = 250
let gap = 4
let isGameOver = false;

onInput("s", () => {
  p.y += 1
})
onInput("w", () => {
  p.y -= 1
})

function generateEnemy() {
  gap = Math.floor(Math.random() * 8);
  for (let y = 0; y < 8; y++) {
    if (y != gap) {
      addSprite(9, y, enemy);
    }
  }
  score++;
}
function gameLoop() {
  addText(`Score: ${score}`, { x: 10, y: 1, color: color`4` })
  getAll(enemy).forEach((o) => {
    if (o.x == 0) {
      o.remove();
    } else {
      o.x -= 1;
    };
  });
  if (getAll(enemy).length == 0) {
    generateEnemy();
  }
  if (getFirst(enemy).x == p.x && p.y != gap) {
    gameOver();
  }
  count += 1;

 
  speed -= (250 - speed);
  if (!isGameOver) {
    setTimeout(gameLoop, speed);
  }
}
function gameOver() {
  clearText();
  isGameOver = true;
  setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........`);
  addText("Game over!", { x: 5, y: 7, color: color`3` });
  addText(`Score: ${score}`, { x: 5, y: 8, color: color`0` });
}
gameLoop();
afterInput(() => {
  
})