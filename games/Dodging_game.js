/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Dodging Game
@author: Swamstick911
@tags: []
@addedOn: 2024-06-20
*/

const player = "p"
const blue = "b"
const obstacle = "o"

setLegend(
  [ player, bitmap`
0000000000000000
0666666666666660
0666666666666660
0666666666666660
0666000660006660
0666040660406660
0666000660006660
0666666666666660
0666666666666660
0666666666666660
0660000000000660
0660444444440660
0660000000000660
0666666666666660
0666666666666660
0000000000000000`] ,
  [ blue, bitmap`
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
  [ obstacle, bitmap`
....CCCCC9C.....
....CCCC99......
....CC999C......
....CC99CC......
....CCC99C......
.....C999.......
.....C666.......
.....C966.......
.....CC99.......
......C9C.......
......C9........
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
...........
...........
...........
...........
...........
...........
...........
...........
.....p.....`
]

setMap(levels[level])

var gameRunning = true;

function spawnObstacle() {
  let x = Math.floor(Math.random() * 8);
  let y = 0;
  addSprite(x, y, obstacle);
}

function moveObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;
  }
}

function despawnObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].y == 8) {
     obstacles[i].remove();
   }
  }
}

function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }

  return false;
}

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

setBackground(blue)

var gameLoop = setInterval(() => {
  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
  }
  
  despawnObstacles ();
  moveObstacles ();
  spawnObstacle ();

  

}, 1000);
