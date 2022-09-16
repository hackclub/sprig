/*
@title: Falling Blocks
@author: Thanosan Prathifkumar

Use A and D to move. Don't get hit by the falling blocks.
*/

const updateRate = 300;

const player = "p";
const obstacle = "o";

let gameOver = false;

let lives = 3;

setLegend(
  [ player, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ obstacle, bitmap`
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
);

const level = map`
............
............
............
............
............
............
............
............
............
............
............
p...........`;

let obstacles = [];

setMap(level);

const obstacleSpawn = setInterval(() => {
  // generate obstacles
  let x = Math.floor(Math.random() * 12);
  let found = false;
  for(let i = 0; i < obstacles.length; ++i) {
    if(obstacles[i][0] == x && obstacles[i][1] == 0) {
      found = true;
    }
  }
  if(!found) {
    addSprite(x, 0, obstacle);
    obstacles.push([x, 0]);
  }
}, updateRate);

const obstacleUpdate = setInterval(() => {
  for(let i = 0; i < obstacles.length; ++i) {
    let pos = obstacles[i];
    let tile = getTile(...pos);
    if(tile.length > 0) {
      tile[0].y += 1;
      obstacles[i][1] += 1;
    }
  }
  let toRemove = [];
  
  for(let i = 0; i < obstacles.length; ++i) {
    let playerPos = getFirst(player);
    let playerX = playerPos.x;
    let playerY = playerPos.y;
    if(obstacles[i][0] == playerX && obstacles[i][1] == playerY - 1) {
      lives -= 1;
      toRemove.push(i);
    }
  }
  
  for(let i = 0; i < obstacles.length; ++i) {
    if(obstacles[i][1] >= 11) {
      toRemove.push(i);
    }
  }
  for(let i = 0; i < toRemove.length; ++i) {
    clearTile(obstacles[toRemove[i]][0], obstacles[toRemove[i]][1]);
    obstacles.splice(toRemove[i], 1);
  }
  clearText();
  addText(`Lives: ${lives}`)
  if(lives == 0) {
    clearInterval(obstacleUpdate);
    clearInterval(obstacleSpawn);
    addText("Game Over");
    gameOver = true;
  }
}, updateRate);


setSolids([ player ]);

onInput("a", () => {
  if(!gameOver) {
    getFirst(player).x -= 1;
  }
});

onInput("d", () => {
  if(!gameOver) {
    getFirst(player).x += 1;
  }
});

