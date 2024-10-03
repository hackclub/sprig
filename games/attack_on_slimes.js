/*
@title: attack_on_slimes
@author: OwOSwordsman
@tags: ['endless']
@addedOn: 2022-12-26
*/

// gamestate
var gameRunning = false;
var score;
var cooldown;

// sounds
const bgm = tune`
1000: c4^1000 + a5/1000,
1000: d4^1000 + g5/1000,
1000: e4^1000 + f5/1000,
1000: f4^1000 + g4^1000 + e5/1000,
1000: a4^1000 + d5/1000,
1000: b4^1000 + c5/1000,
1000: d5-1000 + c5-1000 + b4-1000 + a4-1000 + g4-1000,
1000: e5-1000 + d5-1000 + g4-1000 + f4-1000,
1000: e5-1000 + e4-1000 + g5~1000 + f5~1000,
1000: f5-1000 + e4-1000 + d4-1000 + b5~1000 + a5~1000,
1000: g5-1000 + f5-1000 + d4-1000 + b5~1000,
1000: g5-1000 + d4-1000 + a5~1000 + a4-1000,
1000: a5-1000 + g5-1000 + c4-1000 + g4-1000,
1000: a5-1000 + c4-1000 + d5-1000 + c5-1000 + f4-1000,
1000: a5-1000 + c4-1000 + b5-1000 + d5-1000 + e4-1000,
1000: b5-1000 + c4-1000 + e4-1000,
1000: b5-1000 + c4-1000 + e4-1000,
1000: c4-1000 + b5-1000 + e4-1000,
1000: c4-1000 + b5-1000 + e4-1000,
1000: c4-1000 + b5-1000 + e4-1000,
1000: c4-1000 + a5-1000 + b5-1000 + d5-1000 + e4-1000,
1000: c4-1000 + a5-1000 + c5-1000 + d5-1000 + f4-1000,
1000: c4-1000 + g5-1000 + g4-1000,
1000: c4-1000 + g5-1000 + a5~1000 + a4-1000,
1000: c4-1000 + d4-1000 + f5-1000 + b5~1000,
1000: d4-1000 + e5-1000 + b5~1000 + f5~1000,
1000: d4-1000 + d5-1000 + c5-1000 + g5~1000 + a5~1000,
1000: e4-1000 + f4-1000 + c5-1000,
1000: f4/1000 + b4-1000 + a4-1000 + g4-1000 + c5^1000,
1000: e4/1000 + d5^1000,
1000: d4/1000 + e5^1000,
1000: c4/1000 + f5^1000`;
let playback = playTune(bgm, Infinity);

// sprites
const player = "w";
const slime = "e";
const fire = "f";
const mud = "m";
const portal = "p";
const trap = "t";
const selection = "s";
const selectionCooldown = "c";
const red = "r";
const orange = "o";
const yellow = "y";
const green = "g";
const blue = "b";

setLegend(
  [slime, bitmap`
................
................
................
...DDDDDDDDDD...
...D44444444D...
...D44444444D...
...D4DD44444D...
...D4DD44DD4D...
...D44444DD4D...
...D44DD4444D...
...D44DD4444D...
...D44444444D...
...DDDDDDDDDD...
................
................
................`],
  [player, bitmap`
.......777799...
......7667.99...
.....7777.......
.....76767......
....0.....0.....
....0.3.D.0..HH.
....0.....0..HH.
....0.000.0..LH.
....0.....0.LL..
.....00000.LL...
......607..LL...
.....00000LL....
.....7707LL.....
....7760767.....
...767070776....
...770776077....`],
  [selection, bitmap`
3333333333333333
3333333333333333
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
3333333333333333
3333333333333333`],
  [selectionCooldown, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LL............LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [fire, bitmap`
................
........3.......
.......39.......
.......999....3.
......33999...3.
......999999.993
.9...39996999999
339.39996669993.
39999996666999..
3999999666699...
9999666666699...
.9999666666993..
.9399966666993..
..339966669999..
..339966669939..
...3396669939...`],
  [mud, bitmap`
........CC......
.......CCCC.....
......CCCCCCC...
....CCCCCCCCCCC.
...CCCCCCCCCCCC.
...CCCCCCCCCCCC.
..CCCCCCCCCCCC..
.CCCCCCCCCCCCC..
.CCCCCCCCCCCC...
.CCCCCCCCCC.....
.CCCCCCCCCCC....
.CCCCCCCCCCCC...
.CCCCCCCCCCCC...
..CCCCCCCCCCC...
..CCCCCCCCCCC...
........CCCC....`],
  [portal, bitmap`
.....HHHHHHH....
....HHHHHHHH....
...HHH5555HHH...
...H77HHH555H...
..H77HHHHHH5HH..
..H77H775H55HH..
..HHHHHH55HHHH..
..HH555555HHHH..
..HH5HHH5H57HH..
..HH5HH5HH5577..
..HH5HH5HHHHHH..
..HH5HH5HHHHHH..
...H57H55HHHH...
...HHH7H5777H...
...HHHHHHHHHH...
.....HHHHHH.....`],
  [trap, bitmap`
................
.11111111111111.
.11..........11.
.1.L........L.1.
.1..L......L..1.
.1...L....L...1.
.1....L..L....1.
.1.....LL.....1.
.1.....LL.....1.
.1....L..L....1.
.1...L....L...1.
.1..L......L..1.
.1.L........L.1.
.11..........11.
.11111111111111.
................`],
  [red, bitmap`
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
3333333333333333`],
  [orange, bitmap`
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
9999999999999999`],
  [yellow, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [green, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [blue, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
)

const defaultMap = map`
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
..........s..........
..........w..........
..........b..........
.........bbb.........
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................
.....................`;

// selection control
{
onInput("w", () => {
  if (gameRunning) {
    let cursor = getCursor();
    cursor.y -= 1;
  }
});

onInput("s", () => {
  if (gameRunning) {
    let cursor = getCursor();
    cursor.y += 1;
  }
});

onInput("a", () => {
  if (gameRunning) {
    let cursor = getCursor();
    cursor.x -= 1;
  }
});

onInput("d", () => {
  if (gameRunning) {
    let cursor = getCursor();
    cursor.x += 1;
  }
});
}

onInput("j", () => {
  if (gameRunning) {
    castSpell();
  }
});

afterInput(() => {
  if (!gameRunning) {
    reset();
  }
})

function spawnSlime() {
  // scale spawn rate with score
  if (getAll(slime).length > Math.floor(score / 10) + 3 || Math.floor(Math.random() * (score / 100 + 1)) == 0) {
    return;
  }
  
  let x = 10;
  let y = 10;
  // don't spawn in the center 7 by 7
  while ((x >= 7 && x <= 13) && (y >= 7 && y <= 13)) {
    x = Math.floor(Math.random() * width());
    y = Math.floor(Math.random() * width());
  }
  addSprite(x, y, slime);
}

function moveSlimes() {
  let slimes = getAll(slime);

  outer:
  for (let slime of slimes) {
    // don't move slime in mud
    let sprites = getTile(slime.x, slime.y);
    for (let sprite of sprites) {
      if (sprite.type == mud) {
        continue outer;
      }
    }
    
    slime.x += Math.floor(Math.random() * 3) - 1;
    slime.y += Math.floor(Math.random() * 3) - 1;
  }
}

function despawnSlimes() {
  let slimes = getAll(slime);

  for (let slime of slimes) {
   if (slime.x == 0 || slime.x == 20 || slime.y == 0 || slime.y == 20) {
     slime.remove();
   }
  }
}

function checkAttacked() {
  // let slimes = getAll(slime);
  // let p = getFirst(player);
  let isAttacked = false;

  if (checkTowerCollision(player)) {
    isAttacked = true;
  }
  if (checkTowerCollision(blue)) {
    isAttacked = true;
  }
  if (checkTowerCollision(green)) {
    isAttacked = true;
  }
  if (checkTowerCollision(yellow)) {
    isAttacked = true;
  }
  if (checkTowerCollision(orange)) {
    isAttacked = true;
  }
  if (checkTowerCollision(red)) {
    isAttacked = true;
  }

  return isAttacked;
}

function checkTowerCollision(target) {
  let collisions = tilesWith(slime, target);
  if (collisions.length != 0) {
    for (let tile of collisions) {
      for (let sprite of tile) {
        if (sprite.type == slime) {
          sprite.remove();
        }
      }
    }
    return true;
  }
  return false;
}

function damageTower() {
  let redBlocks = getAll(red);
  // tower destroyed
  if (redBlocks.length != 0) {
    return true;
  }
  
  let orangeBlocks = getAll(orange);
  for (let i of orangeBlocks) {
    i.type = red;
  }
  
  let yellowBlocks = getAll(yellow);
  for (let i of yellowBlocks) {
    i.type = orange;
  }
  
  let greenBlocks = getAll(green);
  for (let i of greenBlocks) {
    i.type = yellow;
  }
  
  let blueBlocks = getAll(blue);
  for (let i of blueBlocks) {
    i.type = green;
  }
  return false;
}

function checkSpellCooldown() {
  // get selection cursor
  let cursor = getCursor();

  // grey out selection on cooldown
  if (cooldown <= 0) {
    cursor.type = selection;
  } else {
    cursor.type = selectionCooldown;
  }
}

function getCursor() {
  let cursor;
  let s = getFirst(selection);
  let sc = getFirst(selectionCooldown);
  if (s != undefined) {
    cursor = s;
  } else {
    cursor = sc;
  }
  return cursor
}

function castSpell() {
  if (cooldown > 0) {
    return;
  }
  const spells = [fire, mud, portal, trap];
  let cursor = getCursor();

  // prevent casting spell on tower or player
  let sprites = getTile(cursor.x, cursor.y);
  for (let i of sprites) {
    if ([player, blue, green, yellow, orange, red].includes(i.type)) {
      return;
    }
  }

  // remove any existing spell/slime and cast random spell
  clearTile(cursor.x, cursor.y);
  addSprite(cursor.x, cursor.y, selectionCooldown);
  addSprite(cursor.x, cursor.y, spells[Math.floor(Math.random() * 4)]);

  // cooldown scales with score
  cooldown = Math.floor(Math.random() * Math.floor(score / 100) + 2);
}

function despawnSpells() {
  despawnSpell(mud);
  despawnSpell(fire);
  despawnSpell(portal);
}

function despawnSpell(spell) {
  let sprites = getAll(spell);
  for (let i of sprites) {
    let chance = 10 - (score / 50);
    if (chance < 3) {
      chance = 3;
    }
    if (Math.floor(Math.random() * chance) == 0) {
        i.remove();
    }
  }
}

function checkTraps() {
  let cursor = getCursor();
  cursor.remove();

  // clear the rest of the traps
  let tiles = tilesWith(trap, slime);
  for (let tile of tiles) {
    score++;
    clearTile(tile[0].x, tile[0].y);
  }

  addSprite(cursor.x, cursor.y, cursor.type);
}


function checkFire() {
  let cursor = getCursor();
  cursor.remove();

  let tiles = tilesWith(fire, slime);
  for (let tile of tiles) {
    score++;
    clearTile(tile[0].x, tile[0].y);
    addSprite(tile[0].x, tile[0].y, fire);
  }

  addSprite(cursor.x, cursor.y, cursor.type);
}

function checkPortal() {
  let tiles = tilesWith(portal, slime);
  for (let tile of tiles) {
    for (let s of tile.filter(x => x.type == slime)) {
      score++;
      s.remove();
      spawnSlime();
    }
  }
}

function reset() {
  clearText();
  setMap(defaultMap);
  gameRunning = true;
  score = 0;
  cooldown = 0;

  var gameLoop = setInterval(() => {
  score++;
  checkTraps();
  checkFire();
  checkPortal();
  spawnSlime();
  moveSlimes();
  despawnSlimes();
  despawnSpells();
  cooldown -= 1;
  checkSpellCooldown();

  if (checkAttacked() && damageTower()) {
    clearInterval(gameLoop);
    gameRunning = false;
    clearText();
    addText("Game Over!\nScore: " + score + "\n\n\n\n\nPress any key\nto restart", {
      x: 4,
      y: 4,
      color: color`3`
    });
  } else {
    addText("Score: " + score, {
      x: 2,
    });
  }

  }, 1000);
}

addText("Defend the\ntower against\nthe pesky\nslimes!\n\nWASD to move\nthe cursor.\n\nJ to cast\na random spell.\n\nPress any key\nto continue.", {
  x: 3,
  y: 1,
});
setMap(map`.`);