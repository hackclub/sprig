/*
@title: Crystal Caper: The Jewel Thieves
@author: Jaisinh
@tags: []
@addedOn: 2024-11-21
*/
const player = "p";
const Bot = "b";
const Emerald = "e";
const obstacles1 = "o";
const background = "g";
const bullet = "l";

setLegend(
  [player, bitmap`
................
................
...........000..
...........000..
...........000..
...000.....6L6..
...000.....0L0..
...000CCCC.0L0..
...00CCCCCC000..
..0LLCCCCCCLLL..
.0330CCCCCC0330.
.0330CCCCCC0330.
.0330CCCCCC0330.
..0000CCCC0000..
................
................`],  
  
  [Bot, bitmap`
................
................
...........000..
...........000..
...........000..
...000.....2L2..
...000.....0L0..
...0002222.0L0..
...00222222000..
..0LL222222LLL..
.00002222220000.
.00002222220000.
.00002222220000.
..000022220000..
................
................`],  

  [Emerald, bitmap`
2222222222222222
2222222222222222
2222244442222222
222242DD44222222
22242DDDD4422222
22244DDDD4422222
22244DDDD4422222
22244DDDD4422222
22244DDDD4422222
22244DDDD4422222
22244DDDD4422222
222244DD44222222
2222244442222222
2222222222222222
2222222222222222
2222222222222222`],  
  
  [obstacles1, bitmap`
0000000000000000
0LL1111111111LL0
0L11LLLLLLLL11L0
011LLLLLLLLLL110
01LLLLLLLLLLLL10
01LLLLLLLLLLLL10
01LLLLLLLLLLLL10
01LLLLLLLLLLLL10
01LLLLLLLLLLLL10
01LLLLLLLLLLLL10
01LLLLLLLLLLLL10
011LLLLLLLLLL110
0L11LLLLLLLL11L0
0LL1111111111LL0
0000000000000000`], 
  
  [background, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`], 
  
  [bullet, bitmap`
................
................
................
................
................
.......L0.......
......LL00......
......L200......
......0000......
......0000......
......0000......
................
................
................
................
................`],  
);

setSolids([obstacles1]);

let level = 0;
const levels = [
  map`
eggggbggggggoggg
gggggoggeoggoggg
oooogoooooggooog
oggggggggggggggg
oegoggggggggoooo
oobogooogoogoggo
oggogoggbeogogeo
oggogoegggogogoo
ogoogoogoooggggb
gggggggggggggggg
bgggggoooogooogg
oooggggggbggeogg
gggggoooggooooge
pggogggggggggggg`
];

setMap(levels[level]);

let emeraldCount = 0;
const totalEmeralds = 8;
let gameEnded = false;

setPushables({
  [player]: []
});

onInput("w", () => movePlayer(0, -1));
onInput("s", () => movePlayer(0, 1));
onInput("a", () => movePlayer(-1, 0));
onInput("d", () => movePlayer(1, 0));

function movePlayer(dx, dy) {
  if (gameEnded) return;

  const player = getFirst("p");
  const newX = player.x + dx;
  const newY = player.y + dy;

 
  if (!getTile(newX, newY).some(t => t.type === obstacles1)) {
    player.x = newX;
    player.y = newY;

    collectEmerald(newX, newY);

 
    checkPlayerBotCollision(newX, newY);
  }
}

function collectEmerald(playerX, playerY) {
  const adjacentPositions = [
    { x: playerX, y: playerY - 1 },
    { x: playerX, y: playerY + 1 },
    { x: playerX - 1, y: playerY },
    { x: playerX + 1, y: playerY }
  ];
  
  adjacentPositions.forEach(pos => {
    const emerald = getTile(pos.x, pos.y).find(t => t.type === Emerald);
    if (emerald) {
      emeraldCount += 1;
      clearTile(pos.x, pos.y); 
      updateEmeraldCount();
      checkWinCondition();
    }
  });
}

function moveBot(bot) {
  if (gameEnded) return;

  const directions = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 }
  ];
  
  const randomDirection = directions[Math.floor(Math.random() * directions.length)];
  const newX = bot.x + randomDirection.x;
  const newY = bot.y + randomDirection.y;

  if (!getTile(newX, newY).some(t => t.type === obstacles1)) {
    bot.x = newX;
    bot.y = newY;

    
    checkBotCollision(bot.x, bot.y);
  }
}

function checkPlayerBotCollision(playerX, playerY) {
  const bots = getAll(Bot);
  bots.forEach(bot => {
    if (bot.x === playerX && bot.y === playerY) {
      gameOver(); 
    }
  });
}

function checkBotCollision(botX, botY) {
  const player = getFirst("p");
  if (player.x === botX && player.y === botY) {
    gameOver();
  }
}

function checkWinCondition() {
  if (emeraldCount >= totalEmeralds) {
    gameWin();
  }
}

function gameOver() {
  gameEnded = true;
  clearText();
  addText("Game Over", { x: 6, y: 6, color: color`3`, fontSize: 20   });
}

function gameWin() {
  gameEnded = true;
  clearText();
  addText("You Win!", { x: 5, y: 6, color: color`3`,  });
}

function updateEmeraldCount() {
  clearText();
  addText(`Emeralds: ${emeraldCount}`, { x: 5, y: 0, color: color`4`,});
}


setInterval(() => {
  const bots = getAll(Bot);
  bots.forEach(bot => moveBot(bot));
}, 500);
