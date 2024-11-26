
/* 
@title: Golem-Rush
@author: Spllit1
@tags: ['action']
@addedOn: 2023-05-22
*/

    const player = "p";
const obstacle = "o";
let game = tune`
153.0612244897959,
153.0612244897959: C5^153.0612244897959 + B4^153.0612244897959 + A4^153.0612244897959 + G4^153.0612244897959 + B5^153.0612244897959,
153.0612244897959: G4^153.0612244897959 + A4^153.0612244897959 + B4^153.0612244897959 + C5^153.0612244897959 + A5^153.0612244897959,
4438.775510204081`

let score = 0

setLegend(
  [obstacle, bitmap`
........D.......
.......DD.......
......DDDD......
.....DD44D......
.....D444DD.....
....DD4444D.....
....D44444DD....
...D4444444DD...
...D44444444D...
..DD44444444DD..
..D4444444444D..
.DD4444444444DD.
.DDDDDDDDDDDDDD.
......CCCC......
......CCCC......
......CCCC......`],
  [player, bitmap`
................
................
................
....000000000...
....099999990...
....090999090...
....099999990...
....099999990...
....099999990...
....099999990...
....099999990...
....099000990...
....0990.0990...
....0990.0990...
....0990.0990...
....0000.0000...`]
)

setMap(map`
........
...p....
........
........
........
........
........
........`)

var gameRunning = true; 

onInput("a", () => {
  if (gameRunning) {
    getFirst(player).x -= 1;
  }
});

onInput("d", () => {
  if (gameRunning) {
    getFirst(player).x += 1;
  }
});

function spawnObstacle() {
  let x = Math.floor(Math.random() * 8);
  let y = 7; 
  addSprite(x, y, obstacle);
}

function moveObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y -= 1;
  }
}

function despawnObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].y == 0) {
     obstacles[i].remove();
   }
  }
}

function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      playTune(game)
      return true;
    }
  }

  return false;
}
var gameLoop = setInterval(() => {
  addText(score.toString(), {
    x: 3,
    y: 1,
    color: color`6`
  });
  despawnObstacles();
  moveObstacles();
  spawnObstacle();
  if(Math.floor(Math.random() * 3)==1){
    spawnObstacle();
  }else if(Math.floor(Math.random() * 3)==2){
    spawnObstacle();
    spawnObstacle();
  };

  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
    addText("Your score:"+score.toString(), {
      x: 4,
      y: 7,
      color: color`6`
    });
    addText("press 'j'", {
      x: 5,
      y: 8,
      color: color`9`
    });
  }else{
    score += 1
    addText(score.toString(), {
      x: 3,
      y: 1,
      color: color`6`
    });
  }

}, 1000);


function resetGame() {
  clearText("");
  gameRunning = true;
  score = 0;
  setMap(map`
........
...p....
........
........
........
........
........
........`);
  gameLoop = setInterval(() => {
    addText(score.toString(), {
    x: 3,
    y: 1,
    color: color`6`
  });
  despawnObstacles();
  moveObstacles();
  spawnObstacle();
  if(Math.floor(Math.random() * 3)==1){
    spawnObstacle();
  }else if(Math.floor(Math.random() * 3)==2){
    spawnObstacle();
    spawnObstacle();
  };

  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
    addText("Your score:"+score.toString(), {
      x: 4,
      y: 7,
      color: color`6`
    });
  }else{
    score += 1
    addText(score.toString(), {
      x: 3,
      y: 1,
      color: color`6`
    });
  }
  }, 1000);
}



onInput("j", () => {
  if (!gameRunning) {
    resetGame();
  }
});