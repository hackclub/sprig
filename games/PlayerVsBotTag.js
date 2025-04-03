const player = 'p';
const bot = 'b';
const tree = 't';
const boulder = 'o';
const ground = 'g';
const speedBoost = 's';
const trap = 'x';

setLegend(
  [player, bitmap`
................
................
.....888888.....
....88888888....
....88888888....
.....888888.....
................
`],
  [bot, bitmap`
................
................
.....FFFFFF.....
....FFFFFFFF....
....FFFFFFFF....
.....FFFFFF.....
................
`],
  [tree, bitmap`
.......0........
......000.......
.....00000......
.......0........
.......0........
`],
  [boulder, bitmap`
....00000000....
...0000000000...
..000000000000..
...0000000000...
....00000000....
`],
  [speedBoost, bitmap`
................
....77777777....
...7777777777...
....77777777....
................
`],
  [trap, bitmap`
................
....666666......
...66666666.....
....666666......
................
`],
  [ground, bitmap`
................
................
................
................
................
`]
);

const levels = [
  map`
..t....o..s.
.o...t...x..
..o....t....
...t..o.....
.t...s.t....
..o...o.....
.t...t...o..
...o...t....
..t...p.b...
...t...o....
`
];

let currentRound = 1;
let isTagger = false;
let playerSpeed = 200;
let botStunned = false;

setBackground(ground);
setMap(levels[0]);

getFirst(player).x = 4;
getFirst(player).y = 8;
getFirst(bot).x = 5;
getFirst(bot).y = 8;

function startRound() {
  isTagger = false;
  setTimeout(() => {
    isTagger = true;
  }, 5000);
}
startRound();

function movePlayer(dx, dy) {
  let newX = getFirst(player).x + dx;
  let newY = getFirst(player).y + dy;
  if (!tileHasObject(newX, newY)) {
    getFirst(player).x = newX;
    getFirst(player).y = newY;
    checkPowerUp(newX, newY);
  }
}

onInput("w", () => movePlayer(0, -1));
onInput("a", () => movePlayer(-1, 0));
onInput("s", () => movePlayer(0, 1));
onInput("d", () => movePlayer(1, 0));

function tileHasObject(x, y) {
  return tilesWith(tree, boulder).some(t => t.x === x && t.y === y);
}

function checkPowerUp(x, y) {
  if (tilesWith(speedBoost).some(t => t.x === x && t.y === y)) {
    playerSpeed = 100;
    setTimeout(() => { playerSpeed = 200; }, 3000);
  }
  if (tilesWith(trap).some(t => t.x === x && t.y === y)) {
    botStunned = true;
    setTimeout(() => { botStunned = false; }, 3000);
  }
}

function botMovement() {
  if (botStunned) return;
  let botSprite = getFirst(bot);
  let playerSprite = getFirst(player);

  let dx = Math.sign(playerSprite.x - botSprite.x);
  let dy = Math.sign(playerSprite.y - botSprite.y);

  if (isTagger) {
    if (dx !== 0 && !tileHasObject(botSprite.x + dx, botSprite.y)) {
      botSprite.x += dx;
    } else if (dy !== 0 && !tileHasObject(botSprite.x, botSprite.y + dy)) {
      botSprite.y += dy;
    }
  } else {
    if (dx !== 0 && !tileHasObject(botSprite.x - dx, botSprite.y)) {
      botSprite.x -= dx;
    } else if (dy !== 0 && !tileHasObject(botSprite.x, botSprite.y - dy)) {
      botSprite.y -= dy;
    }
  }
}
setInterval(botMovement, 500);

afterInput(() => {
  if (tilesWith(player, bot).length > 0) {
    clearText();
    if (isTagger) {
      addText("Your It!", { x: 5, y: 1, color: color`3` });
    } else {
      addText("Bot is it!", { x: 5, y: 1, color: color`3` });
    }
    isTagger = !isTagger;
    setTimeout(() => { clearText(); }, 2000);
    currentRound++;
    if (currentRound > 5) {
      clearText();
      addText("GAME OVER!", { x: 5, y: 3, color: color`2` });
      currentRound = 1;
    }
  }
});

