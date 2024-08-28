const player = "p";
const obstacle = "o";
const boom = "b";
let player_score = 0;

setLegend (
   [obstacle, bitmap`
........3.......
........3...3...
......3.3...3...
33....3.3...3...
.3.000303003....
..30..3.3.03....
...30.33..03....
...30..3..33....
...33033003.....
....3.33..3.....
....333.3.3.....
.....33.333.....
.........3......
................
................
................`],
   [player, bitmap`
................
................
................
................
....99999999....
...9999999999...
..999999999999..
..999C9999C999..
..999999999999..
..999999999999..
..999C9999C999..
..999CCCCCC999..
...9999999999...
....99999999....
................
................`],
   [boom, bitmap`
................
0000000000000000
0000000000055550
0FF0330000355550
0FF0330000355550
0FF0330000355550
0FF0008888830000
0000008888800000
0033HHHHHH800000
0033HHHHHH004444
1138HHH777777444
1138HHH777777444
1138880777777444
1138880777777444
1100000777777444
1106666660000000
1106666660000000`]
  );

setMap(map`
........
........
........
........
........
........
........
...p....`);
var gameRunning = true;

onInput("a", () => {https://sprig.hackclub.com/~
  if (gameRunning) {
  getFirst(player).x -= 1; }
});


onInput("d", () => {
  if (gameRunning) {
  getFirst(player).x += 1;
  }
});

onInput("w", () => {
  if (gameRunning && (getFirst(player).y != 5))  {
    getFirst(player).y -= 1;
  }
});

onInput("s", () => {
  if (gameRunning) {
    getFirst(player).y += 1;
  }
});

function spawnObstacles() {
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
    if (obstacles[i].y == 7) {
      obstacles[i].remove();
      player_score += 1;
    }
  }
}

function checkHit() {
  let obstacles = getAll(obstacle);
  let boomfirst = getFirst(boom);
  let p = getFirst(player);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].y == p.y && obstacles[i].x == p.x) {
      addSprite(obstacles[i].x, ((obstacles[i].y) - 1), boom);
      return true;
    }
  }
  return false;
}

var gameLoop = setInterval(() => {
  despawnObstacles();
  moveObstacles();
  spawnObstacles();

  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over!", {
      y: 6,
      color: color`4`
    });
  }

  addText("Score: " + player_score.toString(), { 
    y: 10,
      color: color`4`
  });
}, 1000);