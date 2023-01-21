/*
@title: Save The Foxy
@author: Harshita Singh 
*/

const updateRate = 500;

const player = "p";
const obstacle = "o";

let gameOver = false;

let lives = 3;
let timer = 0;
const hit = tune`
135.74660633484163: c4^135.74660633484163 + e4^135.74660633484163 + f4~135.74660633484163 + a4~135.74660633484163 + b4-135.74660633484163,
135.74660633484163: d4^135.74660633484163 + f4~135.74660633484163 + a4-135.74660633484163 + c4-135.74660633484163,
135.74660633484163: f4^135.74660633484163 + b4~135.74660633484163 + c5-135.74660633484163 + e4-135.74660633484163,
135.74660633484163: e4^135.74660633484163 + c4^135.74660633484163 + c5~135.74660633484163 + g4~135.74660633484163 + b4-135.74660633484163,
3800.9049773755655`; {
}
const gameOverTune = tune`
115.38461538461539: f4-115.38461538461539,
115.38461538461539: e4-115.38461538461539 + g4-115.38461538461539,
115.38461538461539: d4-115.38461538461539 + a4-115.38461538461539,
115.38461538461539: c4-115.38461538461539 + a4-115.38461538461539,
115.38461538461539: d4-115.38461538461539 + g4-115.38461538461539,
115.38461538461539: e4-115.38461538461539 + f4-115.38461538461539,
115.38461538461539: f4-115.38461538461539 + g4-115.38461538461539,
115.38461538461539: e4-115.38461538461539 + a4-115.38461538461539,
115.38461538461539: d4-115.38461538461539 + b4-115.38461538461539,
115.38461538461539: c4-115.38461538461539 + b4-115.38461538461539 + e4-115.38461538461539,
115.38461538461539: a4-115.38461538461539 + f4-115.38461538461539 + d4-115.38461538461539,
115.38461538461539: g4-115.38461538461539,
2307.6923076923076`;

setLegend(
  [ player, bitmap`
................
......99........
.....9669.......
....960069......
...96066069.....
...90366309.....
...09366390.....
...03966930.....
...09399390.....
...06666660.....
...03099030.....
...90966906.....
.....0660.......
......00........
................
................`],
  [ obstacle, bitmap`
................
................
................
......CCC.......
.....C999C......
....0505050.....
...C5636365C....
..C903636309C...
..C956363659C...
...C0363630C....
....5050505.....
.....C999C......
......CCC.......
................
................
................`]
);

const level = map`
........
........
........
........
........
........
........
p.......`;

let obstacles = [];

setMap(level);

const obstacleSpawn = setInterval(() => {
  // generate obstacles
  let x = Math.floor(Math.random() * 8);
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
    addText("Game Over", { x : 5, y : 7});
    addText(`Score: ${timer}`, { x : 5, y : 0});
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
