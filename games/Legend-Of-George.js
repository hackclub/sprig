/*
@title: Legend of george
@author: Fred
@tags: ["adventure", "dungeon", "zelda"]
@addedOn: 2025-07-19
*/

// --- SPRITE DEFINITIONS ---
const player = "p";
const wall = "w";
const enemy = "e";
const door = "d";
const sword = "s";
const floor = "f";

// --- ART ASSETS (LEGEND) ---
setLegend(
  [ player, bitmap`
................
................
.......6........
......666.......
.....6.6.6......
......666.......
.....5.5.5......
....5..5..5.....
.......5........
......5.5.......
.....5...5......
....5.....5.....
................
................
................
................` ],
  [ enemy, bitmap`
................
................
...33.3.33......
..3.33333.3.....
.3..33333..3....
.3..33333..3....
..3.33333.3.....
...3333333......
....33333.......
...3.3.3.3......
..3..3.3..3.....
.3...3.3...3....
3....3.3....3...
................
................
................` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
LLLLLLLLLLLLLLLL` ],
  [ door, bitmap`
DDDDDDDDDDDDDDDD
D4D4D4D4D4D4D4DD
D4D4D4D4D4D4D4DD
D4D4D4D4D4D4D4DD
D4D4D4D4D4D4D4DD
D4D4D4D4D4D4D4DD
D4D4D4D4D4D4D4DD
D4D4D4D4D4D4D4DD
D4D4D4D4D4D4D4DD
D4D4D4D4D4D4D4DD
D4D4D4D4D4D4D4DD
D4D4D4D4D4D4D4DD
D4D4D4D4D4D4D4DD
D4D4D4D4D4D4D4DD
D4D4D4D4D4D4D4DD
DDDDDDDDDDDDDDDD` ],
  [ sword, bitmap`
................
................
................
.......7........
......77........
.....7.7........
....7..7........
...7...7........
..7....7........
.7.....7........
7......7........
.......7........
................
................
................
................` ],
  [ floor, bitmap`
................
.2..............
..2.............
...2............
....2...........
.....2..........
......2.........
.......2........
........2.......
.........2......
..........2.....
...........2....
............2...
.............2..
..............2.
................` ]
);

// --- GAME CONFIGURATION ---
setBackground(floor);
// Player can't walk through walls. Enemies are not solid, so they can overlap with the player.
setSolids([ player, wall ]);

// --- GAME STATE ---
let level = 0;
let isAttacking = false;
let gameState = "playing"; // "playing", "gameOver", "win"

// --- SOUNDS ---
const attackSound = tune`
16000`;
const enemyHitSound = tune`
250,
125`;
const winSound = tune`
500,
750,
1000`;

// --- LEVEL DESIGN ---
const levels = [
  map`
wwwwwwwwww
w.p.e....w
w........w
w........w
w........w
w........w
w........w
w........w
w.e......d
wwwwwwwwww`,
  map`
wwwwwwwwww
w.p......w
w.w.w.w..w
w.e.w.w..w
w...w.w..w
w.w.w.w.ew
w.w...w..w
w.w.w.w..w
w.e......d
wwwwwwwwww`,
  map`
wwwwwwwwww
w.p.w....w
w...w.e..w
w.w.w.w..w
w...w.w..w
w.e.w.w..w
w...w....w
w.w.w.w..w
w...e....d
wwwwwwwwww`,
  map`
wwwwwwwwww
wp.w..e..w
w..w.w.w.w
w.ew.w.w.w
w..w.w.w.w
w.w..w.w.d
w.w.ww.w.w
w.w....w.w
w.e.ww.e.w
wwwwwwwwww`,
  map`
wwwwwwwwww
w.p.w....d
w.e.w.e..w
w...w....w
w.w.w.w.ww
w.w.e.w..w
w.w...w..w
w.w.w.w.ew
w.e.w....w
wwwwwwwwww`,
  map`
wwwwwwwwww
w.p....e.w
w.wwwdww.w
w...e....w
w........w
w......www
w.ww.w...w
w.ww.w...w
we...w.eew
wwwwwwwwww`,
  map`
wwwwdwwwww
w.pw.....w
w..we....w
w.ewww...w
w...ewe..w
w....www.w
w...ewe..w
w.wwww...w
w..e.....w
wwwwwwwwww`,
  map`
wwwwwwwwww
w.p.....ew
w.w....w.w
w..weew..w
w..ewwe..w
w...ww...w
w..weew..w
w.w....w.w
we......ew
wwwwwwwwww`
  
];

setMap(levels[level]);

// --- GAME FUNCTIONS ---
function restartGame() {
  level = 0;
  isAttacking = false;
  gameState = "playing";
  setMap(levels[0]);
  clearText();
}

function attack(dx, dy) {
  if (!isAttacking && gameState === "playing") {
    const p = getFirst(player);
    if (!p) return; // Don't attack if player is dead
    isAttacking = true;
    
    const sx = p.x + dx;
    const sy = p.y + dy;

    addSprite(sx, sy, sword);
    playTune(attackSound);
    
    setTimeout(() => {
      getAll(sword).forEach(s => s.remove());
      isAttacking = false;
    }, 150);
  }
}

// --- PLAYER CONTROLS ---
// Movement controls
onInput("w", () => { if (gameState === "playing") getFirst(player).y -= 1; });
onInput("s", () => { if (gameState === "playing") getFirst(player).y += 1; });
onInput("a", () => { if (gameState === "playing") getFirst(player).x -= 1; });
onInput("d", () => { if (gameState === "playing") getFirst(player).x += 1; });

// Attack controls
onInput("i", () => attack(0, -1)); // Attack Up
onInput("k", () => attack(0, 1));  // Attack Down
onInput("j", () => attack(-1, 0)); // Attack Left
onInput("l", () => attack(1, 0));  // Attack Right

// --- GAME LOGIC ---
afterInput(() => {
  // If the game is over, any input restarts the game.
  if (gameState === "gameOver") {
    restartGame();
    return;
  }
  
  // If the game is won, do nothing.
  if (gameState === "win") {
    return;
  }

  const playerSprite = getFirst(player);
  if (!playerSprite) return;

  // Check for sword hits first
  const swordSprite = getFirst(sword);
  if (swordSprite) {
    const spritesOnSwordTile = getTile(swordSprite.x, swordSprite.y);

    // Hit regular enemies
    spritesOnSwordTile
      .filter(s => s.type === enemy)
      .forEach(enemySprite => {
        enemySprite.remove();
        playTune(enemyHitSound);
      });
  }

  // Then, move the enemies
  getAll(enemy).forEach(e => {
    const dx = playerSprite.x - e.x;
    const dy = playerSprite.y - e.y;

    // Prioritize axis with greater distance
    if (Math.abs(dx) > Math.abs(dy)) {
      const nextX = e.x + Math.sign(dx);
      if (!getTile(nextX, e.y).some(s => s.type === wall)) {
        e.x = nextX;
      } else if (dy !== 0) {
        const nextY = e.y + Math.sign(dy);
        if (!getTile(e.x, nextY).some(s => s.type === wall)) {
          e.y = nextY;
        }
      }
    } else {
      const nextY = e.y + Math.sign(dy);
      if (!getTile(e.x, nextY).some(s => s.type === wall)) {
        e.y = nextY;
      } else if (dx !== 0) {
        const nextX = e.x + Math.sign(dx);
        if (!getTile(nextX, e.y).some(s => s.type === wall)) {
          e.x = nextX;
        }
      }
    }
  });

  // Check for game over
  if (tilesWith(player, enemy).length > 0) {
    playerSprite.remove();
    gameState = "gameOver";
    clearText();
    addText("GAME OVER", { x: 4, y: 6, color: color`3`});
    addText("Press any key to restart", { x: 1, y: 8, color: color`L`});
  }

  // Level progression and Win Condition
  if (getAll(enemy).length === 0) {
    if (level < levels.length - 1) {
      const doorTile = getFirst(door);
      if (doorTile && tilesWith(player, door).length > 0) {
        level++;
        setMap(levels[level]);
      }
    } else {
      // Last level cleared, player wins
      gameState = "win";
      clearText();
      addText("YOU WIN!", { x: 4, y: 6, color: color`5`});
      playTune(winSound);
    }
  }
});
