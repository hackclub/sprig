/*
@title: Cricket Dodge
@author: Harsh Singh
@tags: ['endless']
@addedOn: 2023-01-17
Use A and D to move. 
*/


const updateRate = 500;

const player = "p";
const obstacle = "o";

let gameOver = false;

let lives = 5;
let timer = 0;
const hit = tune`
30,
30: e5^30,
30: e5~30,
870`;
const gameOverTune = tune`
115.38461538461539: f4-115.38461538461539,
115.38461538461539: e4-115.38461538461539,
115.38461538461539: d4-115.38461538461539,
115.38461538461539: c4-115.38461538461539,
115.38461538461539: d4-115.38461538461539,
115.38461538461539: e4-115.38461538461539,
115.38461538461539: f4-115.38461538461539,
115.38461538461539: e4-115.38461538461539,
115.38461538461539: d4-115.38461538461539,
115.38461538461539: c4-115.38461538461539,
2538.4615384615386`;

setLegend(
  [ player, bitmap`
................
................
................
................
...6....6.......
..666..666......
.66..66..66.....
.66..66..66.....
.66..66..66.....
.66..66..66.....
.66..66..66.....
.66..66..66.....
.66..66..66.....
.66..66..66.....
.66..66..66.....
.66..66..66.....`],
  [ obstacle, bitmap`
................
................
................
................
.........000....
........03230...
........03230...
........03230...
.........000....
................
................
................
................
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
