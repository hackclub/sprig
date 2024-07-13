/*
@title: Among Us Survival
@tags: ['among us', 'survive']
@addedOn: 2024-06-12
@author: Anvay Ajmera
*/



const BG = "b"; 
const PLAYER = "p";
const ROCK = "r";
let deadStatus = false;

setLegend(
  [ROCK, bitmap`
................
................
................
................
...9999999999...
...9333333339...
...9333333339...
...9330000339...
...9330000339...
...9330000339...
...9333333339...
...9333333339...
...9999999999...
................
................
................`],
  
  [PLAYER, bitmap`
.....00000000...
....0333333330..
...033333300000.
...0333330772220
...0333330777770
.000333330777770
0330333333000000
033033333333330.
033033333333330.
033033333333330.
033033300003330.
.0003330..03330.
...03330..03330.
....000....000..
................
................`], 

  [BG, bitmap`
1111111111111111
1111111111111111
1111111111111111
1L11111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111L11111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`]
);

setBackground(BG);
setSolids([]);

let currentLevel = 0;
const gameLevels = [
  map`
........
........
........
........
........
........
........
....p...`
];

setMap(gameLevels[currentLevel]);

onInput("w", () => { if (!deadStatus) getFirst(PLAYER).y -= 1; });
onInput("a", () => { if (!deadStatus) getFirst(PLAYER).x -= 1; });
onInput("s", () => { if (!deadStatus) getFirst(PLAYER).y += 1; });
onInput("d", () => { if (!deadStatus) getFirst(PLAYER).x += 1; });

onInput("i", () => {
  if (deadStatus) {
    clearText();
    setMap(gameLevels[currentLevel]);
    deadStatus = false;
  }
});

function spawnRock() {
  let x = Math.floor(Math.random() * 8);
  let y = 0; 
  addSprite(x, y, ROCK);
}

function moveRocks() {
  let allRocks = getAll(ROCK);
  for (let rock of allRocks) {
    rock.y += 1;
  }
}

function despawnRocks() {
  let allRocks = getAll(ROCK);
  for (let rock of allRocks) {
    if (rock.y >= 7) {
      rock.remove();
    }
  }
}

function checkCollision() {
  let allRocks = getAll(ROCK);
  let player = getFirst(PLAYER);
  for (let rock of allRocks) {
    if (rock.x === player.x && rock.y === player.y) {
      deadStatus = true;
      return true;
    }
  }
  return false;
}

var gameLoop = setInterval(() => {
  if (!deadStatus) {
    despawnRocks();
    moveRocks();
    spawnRock();
  }

  if (checkCollision()) {
    deadStatus = true;
    addText("GAME OVER", { x: 6, y: 7, color: color`6` });
    addText("i to Restart", { x: 4, y: 10, color: color`6` });
  }
}, 1000);
