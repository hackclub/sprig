// Define Game Objects
const player = "p";
const wall = "w";
const bullet = "b";
const enemy = "e";
const goal = "g";
const ground = "x";
const spike = "s";
const potion = "o";  // Fixed (one character)

// Set Up Graphics (Pixel Art)
setLegend([
  [player, bitmap`
  .......000.......
  ......09990......
  ......09990......
  .....0999990.....
  .....0999990.....
  .....0099000.....
  .....0099000.....
  ....009990990....
  ....009990990....
  .....0999990.....
  .....0999990.....
  ......09990......
  .......000.......
  `],
  [wall, bitmap`
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  `],
  [ground, bitmap`
  7777777777777777
  7777777777777777
  7777777777777777
  7777777777777777
  `],
  [bullet, bitmap`
  ....0000....
  ...099990...
  ...099990...
  ....0000....
  `],
  [enemy, bitmap`
  .......22.......
  ......2222......
  .....222222.....
  `],
  [goal, bitmap`
  .....GGGGG.....
  ....GGGGGGG....
  ...GGGGGGGGG...
  `],
  [spike, bitmap`
  ....^^^.....
  ...^^^^^....
  ..^^^^^^^...
  `],
  [potion, bitmap`
  .....888.....
  ....88888....
  ...8888888...
  `]
]);

// Define Levels with Spikes & Potions
const levels = [
  map`
wwwwwwwwwwwwwwww
w.............w
w.....w.......w
w...p.w...w...w
w..s..w....e..w
wx...o........w
w......g......w
wwwwwwwwwwwwwwww
  `,
  map`
wwwwwwwwwwwwwwww
w...o.........w
w.....w.......w
w...p.w...w...w
w..s..w....e..w
wx...........gw
w.............w
wwwwwwwwwwwwwwww
  `
];

let currentLevel = 0;
setMap(levels[currentLevel]);

// Solids (Walls, Enemies, Ground)
setSolids([player, wall, ground, enemy]);

// Variables for Physics and Health
let isJumping = false;
let gravity = 1;
let health = 3;

// Display Health
function updateHealth() {
  clearText();
  addText("Health: " + health, { x: 1, y: 1, color: color`3` });
}
updateHealth();

// Player Controls (Left, Right, Jump)
onInput("a", () => {
  getFirst(player).x -= 1;
});
onInput("d", () => {
  getFirst(player).x += 1;
});
onInput("w", () => {
  let p = getFirst(player);
  if (!isJumping) {
    isJumping = true;
    p.y -= 2; // Simulated Jump
    setTimeout(() => {
      isJumping = false;
    }, 500);
  }
});

// Shooting Mechanic
onInput("j", () => {
  let p = getFirst(player);
  let bulletSprite = addSprite(p.x + 1, p.y, bullet);
  
  playTune([600, 100]); // Shooting sound effect

  let bulletInterval = setInterval(() => {
    bulletSprite.x += 1;
    
    let hitEnemy = getTile(bulletSprite.x, bulletSprite.y).filter(s => s.type === enemy);
    if (hitEnemy.length > 0) {
      hitEnemy.forEach(e => e.remove());
      bulletSprite.remove();
      clearInterval(bulletInterval);
    }

    if (getTile(bulletSprite.x, bulletSprite.y).some(t => t.type === wall)) {
      bulletSprite.remove();
      clearInterval(bulletInterval);
    }
  }, 100);
});

// Gravity Simulation
setInterval(() => {
  let p = getFirst(player);
  if (!getTile(p.x, p.y + 1).some(t => t.type === ground || t.type === wall)) {
    p.y += gravity;
  }
}, 200);

// Moving Enemies
setInterval(() => {
  getAll(enemy).forEach(e => {
    if (Math.random() > 0.5) {
      e.x += Math.random() > 0.5 ? 1 : -1;
    }
  });
}, 700);

// Player Interactions
afterInput(() => {
  let p = getFirst(player);
  
  // Win Condition
  if (getTile(p.x, p.y).some(t => t.type === goal)) {
    playTune([800, 200, 900, 200, 1000, 200]); // Winning sound
    if (currentLevel < levels.length - 1) {
      currentLevel++;
      setMap(levels[currentLevel]);
    } else {
      addText("You Win!", { x: 6, y: 4, color: color`3` });
    }
  }

  // Trap Detection (Spikes)
  if (getTile(p.x, p.y).some(t => t.type === spike)) {
    health -= 1;
    updateHealth();
    playTune([300, 100]); // Damage sound
    if (health <= 0) {
      addText("Game Over!", { x: 6, y: 4, color: color`2` });
      setTimeout(() => {
        currentLevel = 0;
        health = 3;
        setMap(levels[currentLevel]);
        updateHealth();
      }, 2000);
    }
  }

  // Power-up Detection (Health Potion)
  getAll(potion).forEach(o => {
    if (p.x === o.x && p.y === o.y) {
      health = Math.min(3, health + 1); // Max health is 3
      o.remove();
      updateHealth();
      playTune([500, 100]); // Power-up sound
    }
  });
});
