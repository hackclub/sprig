/*
@title: CatchIt
@author: Shrey Mehra
@tags: []
@addedOn: 2023-03-14

Creds:-
A_Really_One_Sided_Duel by Saatwik Das (The working was similar so I copied algorithms)
Falling_Blocks by Thanosan Prathifkumar (Again, I copied the algorithm to make my work easy)

*/

const player = "p";
const obstacle = "o";

let gameOver = false;

let score = 0;
let miss = 5;
let timer = 0;
const hit = tune`
500,
500: F5^500 + A4^500,
15000`;
const gameOverTune = tune`
60.120240480961925: C5~60.120240480961925,
60.120240480961925: C5~60.120240480961925 + B4~60.120240480961925 + A4~60.120240480961925,
60.120240480961925: A4~60.120240480961925 + G4~60.120240480961925,
60.120240480961925: F4~60.120240480961925,
60.120240480961925: F4~60.120240480961925 + E4~60.120240480961925,
60.120240480961925: E4~60.120240480961925 + D4~60.120240480961925,
60.120240480961925: D4~60.120240480961925 + C4~60.120240480961925,
60.120240480961925: C4~60.120240480961925,
1442.8857715430863`;
const missed = tune`
86.20689655172414: B4-86.20689655172414,
86.20689655172414: A5-86.20689655172414,
86.20689655172414: B4-86.20689655172414,
2500`;

setLegend(
    [ obstacle, bitmap`
................
................
................
......99999.....
.....9666669....
....966966669...
...96699666669..
...96966666669..
...96966666669..
...96696666669..
...96666666669..
....966666669...
.....9666669....
......99999.....
................
................`],

  [ player, bitmap`
4444444444444444
4444444444444444
3333333333333333
3333333333333333
4444444444444444
4444444444444444
................
................
................
................
................
................
................
................
................
................`]
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
const clear = map`
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
............`;

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
}, 1000);

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
      score += 1;
      toRemove.push(i);
      
    }
  }
  for(let i = 0; i < obstacles.length; ++i) {
    if(obstacles[i][1] == getFirst(player).y) {
      toRemove.push(i);
      miss -= 1;
      playTune(missed);
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
   addText(`Score: ${score}`, { x : 1, y : 0});
  addText(`Misses: ${miss}`, { x : 10, y : 0});

  // Ending Game
  if(miss <= 0) {
    clearText();
    setMap(clear);
    clearInterval(obstacleUpdate);
    clearInterval(obstacleSpawn);
    addText("Game Over", { x : 5, y : 5});
    addText(`Score: ${score}`, { x : 5, y : 7});
    playTune(gameOverTune);
    gameOver = true;
  }
  timer++;
}, 1000);

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
