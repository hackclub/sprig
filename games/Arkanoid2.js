/*
@title: Arkanoid 2.0
@author: Rosario Alexandros Morabito
@description: A retro Arkanoid style game with Independent Ball Physics & 7-brick charge!
@tags: ['#Arkanoid', '#retro', '#arkanoid2']
@addedOn: 2026-09-15

## image Arkanoid2.png
*/

// Setup
const player = "p";
const wall = "w";
const ball = "b";
const brick = "r";

let currentLevel = 0; 
let isPlaying = false;
let isGameOver = false;

// Mechanic: Ball Cloning & Charge Bar State
let chargeCount = 0;
const MAX_CHARGE = 7;

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
0222222222222110
0222222222221100
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
const moveSound = tune``; 
const hitSound = tune`107.52688172043011: B4/107.52688172043011, 3333.3333333333335`;
const cloneSound = tune`100: C5^150, E5^150, G5^150, C6^250`;
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
500`;

let bgPlayback = null;

// Audio Management
function startBgMusic() {
  if (!bgPlayback) {
    bgPlayback = playTune(bgMusic, Infinity);
  }
}

function stopBgMusic() {
  if (bgPlayback) {
    bgPlayback.end();
    bgPlayback = null;
  }
}

// UI Helper: Render Charge Meter for 7 Bricks
function updateUI() {
  let meterStr = "CHG " + chargeCount + "/7";
  if (chargeCount >= MAX_CHARGE) meterStr = "READY!";

  addText(meterStr, { x: 6, y: 0, color: color`3` });
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

// Player Movement (Exact Original Controls)
onInput("a", () => {
  if (isGameOver) return;
  if (!isPlaying) {
    clearText();
    startBgMusic();
    updateUI();
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
    updateUI();
  }
  isPlaying = true;
  playTune(moveSound);
  getFirst(player).x += 1;
});

// Duplicate Ball Ability (Key W)
onInput("w", () => {
  if (!isPlaying || isGameOver || chargeCount < MAX_CHARGE) return;

  const paddle = getFirst(player);
  if (!paddle) return;

  // Consume charge
  chargeCount = 0;
  playTune(cloneSound);
  updateUI();

  // Spawn extra ball above the paddle safely
  addSprite(paddle.x + 1, paddle.y - 1, ball);
});

// Setup GameClock with Safe Independent Ball Motion
gameClock = setInterval(() => {
  if (isPlaying) {
    const balls = getAll(ball);
    if (balls.length === 0) return;

    // Safely assign individual velocities to any ball missing them
    balls.forEach(b => {
      if (b.vx === undefined) b.vx = 1;
      if (b.vy === undefined) b.vy = -1;
    });

    // Check ball-to-ball interactions to scatter them independently
    for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
        let b1 = balls[i];
        let b2 = balls[j];
        
        if (Math.abs(b1.x - b2.x) <= 1 && Math.abs(b1.y - b2.y) <= 1) {
          b1.vx *= -1;
          b1.vy *= -1;
          b2.vx *= -1;
          b2.vy *= -1;
          playTune(hitSound);
        }
      }
    }

    balls.forEach(b => {
      let nextX = b.x + b.vx;
      let nextY = b.y + b.vy;

      // Helper function to check obstacles and destroy bricks
      const handleCollisionAt = (x, y) => {
        const tile = getTile(x, y);
        const hitWall = tile.some(s => s.type === wall);
        const hitPlayer = tile.some(s => s.type === player);
        const bricks = tile.filter(s => s.type === brick);

        // Destroy bricks and update charge meter
        if (bricks.length > 0) {
          bricks.forEach(s => s.remove());
          if (chargeCount < MAX_CHARGE) {
            chargeCount++;
            updateUI();
          }
        }

        return hitWall || hitPlayer || bricks.length > 0;
      };

      // 1. Horizontal Hit
      let hitHorizontal = handleCollisionAt(nextX, b.y);
      if (hitHorizontal) {
        b.vx *= -1;
        playTune(hitSound);
      }

      // 2. Vertical Hit
      let hitVertical = handleCollisionAt(b.x, nextY);
      if (hitVertical) {
        b.vy *= -1;
        if (!hitHorizontal) playTune(hitSound);
      }

      // 3. Diagonal Hit
      if (!hitHorizontal && !hitVertical && handleCollisionAt(nextX, nextY)) {
        b.vx *= -1;
        b.vy *= -1;
        playTune(hitSound);
      }

      // Move ball safely along its own unique path
      let destX = b.x + b.vx;
      let destY = b.y + b.vy;

      if (!handleCollisionAt(destX, destY)) {
        b.x = destX;
        b.y = destY;
      }

      // Despawn ball if it hits the bottom
      if (b.y >= height() - 1) {
        b.remove();
      }
    });

    // Loss Condition: All balls dropped below the screen
    if (getAll(ball).length === 0) {
      isPlaying = false;
      isGameOver = true;
      stopBgMusic();
      clearText();
      addText("GAME OVER", { x: 6, y: 7, color: color`3` });
      addText("PRESS J", { x: 7, y: 8, color: color`3` });
      return;
    }

    // Win Condition: All bricks cleared
    if (getAll(brick).length === 0) {
      currentLevel += 1;

      if (currentLevel < levels.length) {
        setMap(levels[currentLevel]);
        chargeCount = 0;
        isPlaying = false;
        clearText();
        addText("LEVEL " + (currentLevel + 1), { x: 7, y: 7, color: color`3` });
      } else {
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
    currentLevel = 0;
    setMap(levels[currentLevel]);
    chargeCount = 0;
    isGameOver = false;
    clearText();
    isPlaying = true;
    startBgMusic();
    updateUI();
  } else if (!isPlaying) {
    clearText();
    isPlaying = true;
    startBgMusic();
    updateUI();
  }
});

// START GAME
setMap(levels[currentLevel]);
addText("PRESS J", { x: 6, y: 7, color: color`3` });
addText("TO PLAY", { x: 7, y: 8, color: color`3` });
addText("W:CLONE BALL", { x: 4, y: 9, color: color`3` });
