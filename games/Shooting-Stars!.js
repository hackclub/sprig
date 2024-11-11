/*
@title: Shooting Stars!
@author: Sapmix
@tags: []
@addedOn: 2024-11-11
*/

const player = "p"
const enemy = "e"
const laser = "l"
const bkg = "b";
const obstacle = "o";

let is_enemy_hit = false;
let enemies = [];

let currentObs = [];

let numEnemies = 3;
let numObs = 0;

let initialized = false;

let dead = false;

let loop = 0;

let points = 0;

setLegend(
  [enemy, bitmap`
................
................
................
................
................
.......0........
......020.......
.....02220......
.....02220......
...001000L00....
..011LLLLLLL0...
.013LLL3LLL3L0..
..001LLLLLL00...
....0606060.....
................
................`],
  [player, bitmap`
.......0........
......050.......
.....05550......
.....05550......
.....05250......
.....05250......
.....05550......
.....05550......
....0755550.....
...077555550....
...075555550....
...075555550....
...075555550....
...075555550....
....0333990.....
......966.......`],
  [laser, bitmap`
................
................
................
.......4........
.......4........
.......4........
.......4........
................
................
................
................
................
................
................
................
................`],
  /*[bkg1, bitmap`
0000000000000000
0000000000000000
0002000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000002000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000200000000000
0000000000020000
0000000000000000
0000000000000000
0000000000000000`],
  [bkg2, bitmap`
0000000000000000
0000000000000000
000000LLL0000000
00000L1L1L000000
00000L111L002000
00020LL1L0000000
000000LL00000000
0000000000000000
0000000000200000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0002000000000000
0000000000000000
0000000000000000`],
  [bkg3, bitmap`
0000000000000000
0000000000000000
0000000000000000
000LLLLL00020000
00LL11LLL0000000
00L11111L0000000
00L11L11L0002000
00L1111LL0000000
000LLLLL00000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0200000000002000
0000002000000000
0000000000000000`],*/
  [bkg, bitmap`
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
  [obstacle, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`]
);

setSolids([obstacle, laser]);


let level = 0
const levels = [
  map`
............
............
............
............
............
............
............
............
............`
  /*{ enemies: 6, map: map`
............
............
.oo..o..oo..
............
............
............
............
............
............`, obs: [{ x: 1, y: 2 }, { x: 2, y: 2 }, { x: 5, y: 2 }, { x: 8, y: 2 }, { x: 9, y: 2 }], win: false },
  { enemies: 0, map: map`
............
............
............
............
............
............
............
............
............`, obs: [], win: true },*/
]

setBackground(bkg);

setPushables({})

onInput("d", () => {
  getFirst(player).x += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("l", () => {
  addSprite(getFirst(player).x, getFirst(player).y, laser);
})

onInput("j", () => {
  clearInterval(loop);
  clearText();
  is_enemy_hit = false;
  enemies = [];
  currentObs = [];
  numObs = 0;
  numEnemies = 3;
  initialized = false;
  points = 0;
  level = 0;
  dead = false;
  initialize();
  loop = setInterval(update, 125);
})


afterInput(_ => {})

initialize();

loop = setInterval(update, 125);

function initialize() {
  initialized = false;
  // First get player coordinates before map gets cleared
  let playy = 8;
  let playx = 6;
  if (getFirst(player) !== undefined) {
    let play = getFirst(player);
    playy = play.y;
    playx = play.x;
  }
  setMap(levels[0]);
  clearObs();
  addObs();
  // Add player
  addSprite(playx, playy, player);
  // Add enemies
  addEnemy();
  initialized = true;
}

function clearObs() {
  // Function to clear previous obstacles
  currentObs = [];
  for (let obs in getAll(obstacle)) {
    clearTile(obs.x, obs.y);
  };
}

function addObs() {
  if (numObs < 8) {
    numObs += 1
  }
  // Time to generate new positions for the obstacles!
  for (let a = 0; a < numObs; a++) {
    let x = 0;
    while (true) {
      x = Math.floor(Math.random() * (12 - 0) + 0);
      if (typeof currentObs.find(e => (e.x == x)) === "undefined") {
        break;
      }
    }
    let y = 2;
    currentObs.push({ x: x, y: y});
    addSprite(x, y, obstacle);
  }
}

function addEnemy() {
  if (numEnemies < 12) {
    numEnemies += 1
  }
  
  for (let a = 0; a < numEnemies; a++) {
    let x = 0;
    while (true) {
      x = Math.floor(Math.random() * (12 - 0) + 0);
      if (typeof enemies.find(e => (e.x == x)) === "undefined") {
        break;
      }
    }
    enemies.push({ x: x, y: 1, direction: 1 });
    addSprite(x, 1, enemy);
  }
}

function update() {
  if (dead) {
    death();
    return;
  }
  
  if (initialized) {
    checkState();
    drawText();
    updateLasers();
    updateEnemies();
  }
}

function death() {
  clearInterval(loop);
  setMap(levels[0]); // load map, map is updated dynamically and randomly so level variable is only used for counting!
  clearText();
  addText(`You died!\nXP: ${points}`, { x: 6, y: 5, color: color`6` });
  addText(`Press j to restart`, { x: 1, y: 10, color: color`6` });
}

function checkState() {
  if (enemies.length == 0) {
    level++;
    initialize();
  }
}

function detectLaserCollision(x, y) {
  for (var sprite1 of getTile(x, y)) {
    // Obstacle
    obstacleCollision(sprite1, x, y);
    // Enemy
    enemyCollision(sprite1, x, y);
  }
}

function collideWithPlayer(x, y) {
  if (getTile(x, y).find(e => e.type === 'p')) {
    dead = true;
  }
}


function obstacleCollision(s, x, y) {
  if (s.type != "l") return;
  for (let ob of currentObs) {
    if (s.x == ob.x && s.y - 1 == ob.y) {
      clearTile(x, y);
    }
  }
}

function enemyCollision(s, x, y) {
  if (s.type != "e") return;
  let enemies_on_tile = enemies.length;
  enemies = enemies.filter(function(o) {
    return !(o.x == x && o.y == y);
  });
  clearTile(x, y);
  enemies_on_tile = enemies_on_tile - enemies.length;
  points += enemies_on_tile
}

function drawText() {
  clearText();
  //if (!levels[level]) {
    // Text overflows if level is above 9, so fix x coordinates dynamically
    let levell = level.toString().length-1;
    addText(`XP: ${points}`, { x: 0, y: 0, color: color`6` });
    addText(`Level: ${level}`, { x: 12-levell, y: 0, color: color`6` });
  /*} else {
    addText(`You won!!!`, { x: 6, y: 7, color: color`6` });
  }*/
}

function updateEnemies() {
  let i = 0;
  for (let e of enemies) {
    if (e.direction == -1) {
      if (e.x <= 0) {
        e.direction = 1
        if (e.y > 0) {
          e.y += 1;
        }
      }
      e.x += e.direction
    } else if (e.direction == 1) {
      if (e.x >= width() - 1) {
        e.direction = -1
        if (e.y > 0) {
          e.y += 1;
        }
      }
      e.x += e.direction
    }
    let sprite = getAll(enemy)[i];
    sprite.y = e.y;
    sprite.x = e.x;
    collideWithPlayer(e.x, e.y);
    i += 1;
  }
}

function updateLasers() {
  for (let l of getAll(laser)) {
    // Also handles collisions and points
    detectLaserCollision(l.x, l.y);
    if (l.y == 0 && getTile(l.x, l.y).length <= 1) {
      clearTile(l.x, l.y);
    };
    l.y -= 1;
  }
}
