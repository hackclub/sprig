 /*
@FunGame:
@author: Rosario Alexandros Morabito
@description: A retro Arkanoid style game
@tags: ['#Arkanoid', '#retro']
@addedOn: 2025-08-18
*/


// Setup

const player = "p";
const wall = "w";
const ball = "b";
const brick = "r";

let currentLevel = 0; 
let ballDirX = 1;
let ballDirY = -1;
let isPlaying = false;
let isGameOver = false;

// Game Clock
let gameClock;

setLegend(
  [ player, bitmap`
................
................
................
................
................
................
................
................
0000000000000000
0333333333333330
0000000000000000
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0000000000000000
................
................` ],
  [ wall, bitmap`
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
0000000000000000` ],
  [ ball, bitmap`
....00000000....
...0222222220...
..022222222220..
.02222222222220.
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222210
0222222222222110
02222222222211L0
.022222222211L0.
..0222222211L0..
...02222211L0...
....00000000....` ],
  [ brick, bitmap`
0000000000000000
0333303333033330
0333303333033330
0000000000000000
0330333303333030
0330333303333030
0000000000000000
0333303333033330
0333303333033330
0000000000000000
0330333303333030
0330333303333030
0000000000000000
0333303333033330
0333303333033330
0000000000000000` ],
);

// Sounds
const moveSound = tune``; // Paddle movement sound
const hitSound = tune`107.52688172043011: B4/107.52688172043011,
3333.3333333333335`;  // Ball bounce sound (wall, brick, paddle)
const bgMusic = tune`
500: E4~500 + C5^500,
500: E4~500,
500: E4~500,
500: B5~500 + A5-500,
500: B5~500,
500: B5~500,
500: B5~500 + A5/500,
500: E4~500 + C5^500,
500: E4~500,
500: E4~500,
500: B5~500 + A5-500,
500: B5~500,
500: B5~500,
500: B5~500 + A5/500,
500: E4~500 + C5^500,
500: E4~500,
500: E4~500,
500: B5~500 + A5-500,
500: B5~500,
500: B5~500,
500: B5~500 + A5/500,
500: E4~500 + C5^500,
500: E4~500,
500: E4~500,
500: B5~500 + A5-500,
500: B5~500,
500: B5~500,
500: B5~500 + A5/500,
500: E4~500 + C5^500,
500: E4~500,
500: E4~500,
500`;  // Background music loop

let bgPlayback = null;

// Helper function to manage background audio playback
function startBgMusic() {
  if (!bgPlayback) {
    bgPlayback = playTune(bgMusic, Infinity); // Endless playback using Sprig API
  }
}

function stopBgMusic() {
  if (bgPlayback) {
    bgPlayback.end();
    bgPlayback = null;
  }
}

// Levels
const levels = [
  // Level 1
  map`
  wwwwwwwwwwwww
  w...........w
  w..rrrrrrr..w
  w..rrrrrrr..w
  w..rrrrrrr..w
  w...........w
  w...........w
  w...........w
  w...........w
  w...........w
  w.....b.....w
  w....ppp....w
  w...........w
  `,
  
  // Level 2
  map`
  wwwwwwwwwwwww
  w...........w
  w.r.r.r.r.r.w
  w..r.r.r.r..w
  w.r.r.r.r.r.w
  w..r.r.r.r..w
  w...........w
  w...........w
  w...........w
  w...........w
  w.....b.....w
  w....ppp....w
  w...........w
  `,

  // Level 3
  map`
  wwwwwwwwwwwww
  w...........w
  w.....r.....w
  w....rrr....w
  w...rrrrr...w
  w..rrrrrrr..w
  w...........w
  w...........w
  w...........w
  w...........w
  w.....b.....w
  w....ppp....w
  w...........w
  `,

  // Level 4
  map`
  wwwwwwwwwwwww
  w...........w
  w..rrr.rrr..w
  w..r.....r..w
  w..r.....r..w
  w..r.....r..w
  w..r.....r..w
  w...........w
  w...........w
  w...........w
  w.....b.....w
  w....ppp....w
  w...........w
  `,

  // Level 5
  map`
  wwwwwwwwwwwww
  w...r...r...w
  w....r.r....w
  w..rrrrrrr..w
  w..rr.r.rr..w
  w..rrrrrrr..w
  w...........w
  w...........w
  w...........w
  w...........w
  w.....b.....w
  w....ppp....w
  w...........w
  `,

  // Level 6
  map`
  wwwwwwwwwwwww
  w...........w
  w.....r.....w
  w....r.r....w
  w...r...r...w
  w....r.r....w
  w.....r.....w
  w...........w
  w...........w
  w...........w
  w.....b.....w
  w....ppp....w
  w...........w
  `,

  // Level 7
  map`
  wwwwwwwwwwwww
  w.rrrrrrrrr.w
  w...........w
  w.rrrrrrrrr.w
  w...........w
  w.rrrrrrrrr.w
  w...........w
  w...........w
  w...........w
  w...........w
  w.....b.....w
  w....ppp....w
  w...........w
  `,

  // Level 8
  map`
  wwwwwwwwwwwww
  w.rr.....rr.w
  w.rr.....rr.w
  w.rr.....rr.w
  w.rrrrrrrrr.w
  w.rrrrrrrrr.w
  w...........w
  w...........w
  w...........w
  w...........w
  w.....b.....w
  w....ppp....w
  w...........w
  `,

  // Level 9
  map`
  wwwwwwwwwwwww
  w.r...r...r.w
  w...r...r...w
  w.r...r...r.w
  w...r...r...w
  w.r...r...r.w
  w...........w
  w...........w
  w...........w
  w...........w
  w.....b.....w
  w....ppp....w
  w...........w
  `,

  // Level 10
  map`
  wwwwwwwwwwwww
  wrrrrrrrrrrrw
  wrrrrrrrrrrrw
  wr.........rw
  wr..rrrrr..rw
  wr..rrrrr..rw
  wr.........rw
  w...........w
  w...........w
  w...........w
  w.....b.....w
  w....ppp....w
  w...........w
  `
];

// Set Solids
setSolids([ player, wall ]);

// Set Pushables
setPushables({ [player]: [player] });

// Player Movement
onInput("a", () => {
  if (isGameOver) return;
  if (!isPlaying) {
    clearText();
    startBgMusic();
  }
  isPlaying = true;
  playTune(moveSound);
  getAll(player).forEach((p, index, array) => {
    if (index === array.length - 1) {
      p.x -= 1;
    }
  });
});

onInput("d", () => {
  if (isGameOver) return;
  if (!isPlaying) {
    clearText();
    startBgMusic();
  }
  isPlaying = true;
  playTune(moveSound);
  getFirst(player).x += 1;
});

// Setup GameClock
gameClock = setInterval(() => {
  if (isPlaying) {
    const b = getFirst(ball);
    if (!b) return;

    let nextX = b.x + ballDirX;
    let nextY = b.y + ballDirY;

    // Helper function to check for obstacles and destroy hit bricks
    const handleCollisionAt = (x, y) => {
      const tile = getTile(x, y);
      const hitWall = tile.some(s => s.type === wall);
      const hitPlayer = tile.some(s => s.type === player);
      const bricks = tile.filter(s => s.type === brick);

      // Destroy any brick hit by the ball
      if (bricks.length > 0) {
        bricks.forEach(s => s.remove());
      }

      return hitWall || hitPlayer || bricks.length > 0;
    };

    // 1. Check Horizontal Hit
    let hitHorizontal = handleCollisionAt(nextX, b.y);
    if (hitHorizontal) {
      ballDirX *= -1;
      playTune(hitSound);
    }

    // 2. Check Vertical Hit
    let hitVertical = handleCollisionAt(b.x, nextY);
    if (hitVertical) {
      ballDirY *= -1;
      if (!hitHorizontal) playTune(hitSound);
    }

    // 3. Check Diagonal (Corner) Hit
    if (!hitHorizontal && !hitVertical && handleCollisionAt(nextX, nextY)) {
      ballDirX *= -1;
      ballDirY *= -1;
      playTune(hitSound);
    }

    // Move ball safely (check new destination after direction bounces)
    let destX = b.x + ballDirX;
    let destY = b.y + ballDirY;

    if (!handleCollisionAt(destX, destY)) {
      b.x = destX;
      b.y = destY;
    }

    // 4. Loss Condition: Hit bottom row
    if (b.y >= height() - 1) {
      isPlaying = false;
      isGameOver = true;
      stopBgMusic();
      clearText();
      addText("GAME OVER", { x: 6, y: 7, color: color`3` });
      addText("PRESS J", { x: 7, y: 8, color: color`3` });
      return;
    }

    // 5. Check Win Condition (All bricks cleared)
    if (getAll(brick).length === 0) {
      currentLevel += 1;

      if (currentLevel < levels.length) {
        // Load next level and reset ball state
        setMap(levels[currentLevel]);
        ballDirX = 1;
        ballDirY = -1;
        isPlaying = false;
        clearText();
        addText("LEVEL " + (currentLevel + 1), { x: 7, y: 7, color: color`3` });
      } else {
        // Beat all 10 levels
        isPlaying = false;
        stopBgMusic();
        clearText();
        addText("YOU WIN!", { x: 7, y: 7, color: color`3` });
        clearInterval(gameClock);
      }
    }
  }
}, 150);

// Input to start/restart game
onInput("j", () => {
  if (isGameOver) {
    // Reset to Level 1 on game over
    currentLevel = 0;
    setMap(levels[currentLevel]);
    ballDirX = 1;
    ballDirY = -1;
    isGameOver = false;
    clearText();
    isPlaying = true;
    startBgMusic();
  } else if (!isPlaying) {
    // Unpause and wipe on-screen level text
    clearText();
    isPlaying = true;
    startBgMusic();
  }
});

// START GAME
setMap(levels[currentLevel]);
addText("PRESS J", { x: 6, y: 7, color: color`3` });
addText("TO PLAY", { x: 7, y: 8, color: color`3` });
