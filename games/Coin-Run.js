// Coin Chase - scrappy little coin grab thing

const HERO = "p";
const WALL = "w";
const COIN = "c";
const ENEMY = "e";

// game state 
let score = 0;
let isGameOver = false;

//sprites
setLegend(
  [HERO, bitmap`
................
................
......0000......
.....0....0.....
....0..00..0....
....0......0....
....0..00..0....
.....0....0.....
......0000......
.......00.......
......0..0......
.....0....0.....
................
................
................
................`],

  [WALL, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LL111111111111LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],

  [COIN, bitmap`
................
................
......6666......
....66666666....
...6699999966...
...6699999966...
...6699999966...
...6699999966...
....66666666....
......6666......
................
................
................
................
................
................`],

  [ENEMY, bitmap`
................
.....444444.....
....44444444....
...4444444444...
...44.4444.44...
...4444444444...
....44444444....
.....444444.....
......4444......
.....4....4.....
....4......4....
................
................
................
................
................`]
);

setSolids([HERO, WALL, ENEMY]);

// map 
const level1 = map`
wwwwwwwwww
wp..c....w
w.wwww.w.w
w....c...w
w.w.wwww.w
w...c..e.w
w....c...w
wwwwwwwwww`;

// HUD/UI
function drawHud(extraLine) {
  clearText();

  addText("score:" + score, { x: 0, y: 0, color: color`6` });

  if (extraLine) {
    addText(extraLine, { x: 0, y: 1, color: color`3` });
  }
}

function showEnd(msg) {
  isGameOver = true;
  clearText();

  //centering by ambiance 
  addText(msg, { x: 2, y: 4, color: color`4` });
  addText("press i", { x: 2, y: 6, color: color`2` });
}

//rese/setup
function resetGame() {
  score = 0;
  isGameOver = false;

  setMap(level1);
  drawHud();
}

//enemys brain, made it simple out of lazyness 
function moveEnemyTowardPlayer() {
  const player = getFirst(HERO);
  const bad = getFirst(ENEMY);

  if (!player || !bad) return;

  //difference between them
  const dx = player.x - bad.x;
  const dy = player.y - bad.y;

  //I used to do something fancier, but this works well enough.
  // solids will block so it sometimes just crashes agaisnt the wall
  const startX = bad.x;
  const startY = bad.y;


  if (Math.abs(dx) > Math.abs(dy)) {
    bad.x = bad.x + Math.sign(dx);
  } else {
    bad.y = bad.y + Math.sign(dy);
  }

  // if we didn't move it blockes from going thru, try the other direction
  if (bad.x === startX && bad.y === startY) {
    //fallback move
    if (Math.abs(dx) > Math.abs(dy)) {
      bad.y = bad.y + Math.sign(dy);
    } else {
      bad.x = bad.x + Math.sign(dx);
    }
  }
}

//start it up
resetGame();

//controls 
// I made this helper because I got tired of repeating the same 3 lines. Not super clean, but it's less annoying.

function tryMovePlayer(dx, dy) {
  if (isGameOver) return;

  const dude = getFirst(HERO);
  if (!dude) return;

  //could do += , i just noticed too late lol
  dude.x = dude.x + dx;
  dude.y = dude.y + dy;
}

onInput("w", () => tryMovePlayer(0, -1));
onInput("s", () => tryMovePlayer(0,  1));
onInput("a", () => tryMovePlayer(-1, 0));
onInput("d", () => tryMovePlayer( 1, 0));

//restart key 
onInput("i", () => {
  // letting you restart even if you didnt win or loose just  yet
  resetGame();
});

//Their are unused keys, but i left  this here in case I want them later
//onInput("j", () => {});
//onInput("k", () => {});
//onInput("l", () => {});

//main loop
afterInput(() => {
  if (isGameOver) return;

  const hero = getFirst(HERO);
  if (!hero) return; // shouldn't happen but it did once when I was messing around

  //coin pickup
  const here = getTile(hero.x, hero.y);
  let grabbedOne = false;

  //a loop insstead of something complicated 
  for (let idx = 0; idx < here.length; idx++) {
    const thing = here[idx];

    if (thing.type === COIN) {
      thing.remove();
      grabbedOne = true;
    }
  }

  if (grabbedOne) {
    score = score + 1; 
    drawHud();
  }

  //enemy moves after you do
  moveEnemyTowardPlayer();

  //you lose if touched by the alien 
  if (tilesWith(HERO, ENEMY).length > 0) {
    showEnd("you lose!");
    return;
  }

  //win if no coins left
  if (getAll(COIN).length === 0) {
    showEnd("you win!");
    return;
  }
});
