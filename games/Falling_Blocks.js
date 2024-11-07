/*
@title: Falling Blocks
@author: Thanosan Prathifkumar
@tags: []
@addedOn: 2022-09-17

Use A and D to move. Don't get hit by the falling blocks.
*/

const updateRate = 300;

const player = "p";
const obstacle = "o";

let gameOver = false;

let lives = 3;
let timer = 0;
const hit = tune`
30,
30: g4~30,
900`;
const gameOverTune = tune`
186.33540372670808: f4-186.33540372670808,
186.33540372670808: e4-186.33540372670808,
186.33540372670808: d4-186.33540372670808,
186.33540372670808: c4-186.33540372670808,
5217.391304347826`;

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
    if(obstacles[i][0] == x && obstacles[i][1] == 0 || obstacles[i][0] == x && obstacles[i][1] == 1) {
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
    if(obstacles[i][0] == playerX && obstacles[i][1] >= playerY - 1) {
      playTune(hit);
      lives -= 1;
      toRemove.push(i);
      
    }
  }
  for(let i = 0; i < obstacles.length; ++i) {
    if(obstacles[i][1] == getFirst(player).y) {
      toRemove.push(i);
    }
  }
  for(let i = 0; i < toRemove.length; ++i) {
    getTile(...obstacles[toRemove[i]]).forEach(item => {
      if(item != null && item.type != "p") {
        item.y = getFirst(player).y;
        setTimeout(() => {
          item.remove();
          obstacles.splice(toRemove[i], 1);
        }, 100);
      }
    });
  }

  clearText();
  addText(`Lives: ${lives}`, { x : 5, y : 0});
  
  if(lives <= 0) {
    clearInterval(obstacleUpdate);
    clearInterval(obstacleSpawn);
    addText("Game Over", { x : 5, y : 0});
    addText(`Score: ${timer}`, { x : 5, y : 1});
    playTune(gameOverTune);
    gameOver = true;
  }
  timer++;
}, updateRate);

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
