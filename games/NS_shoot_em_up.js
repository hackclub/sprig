/*
	>     @title: NS Shoot em up
	>     @author: Muhammad Uzzam Butt
	>     @description its a shooting game
	>     @tags: ['shooting', 'arcade']
	>     @addedOn: 2026-01-04
	>     */

const player = "p";
const bullet = "b";
const enemy = "e";
const heart = "h";
const sky = "0";

let lives = 3;
let score = 0;
let secondsPassed = 0;
let spawnRate = 0.2;
let gameActive = true;

// 1. icons
setLegend(
  [player, bitmap`
................
................
................
........2.......
........0.......
........0.......
.....7770777....
........7.......
........7.......
........0.......
.......707......
................
................
................
................
................`],
  [bullet, bitmap`
.......0........
......050.......
......050.......
......050.......
.......0........
................`],
  [enemy, bitmap`
......3333......
.....333333.....
..333322223333..
...3332222333...
....33333333....
.....333333.....
......3333......
.......33.......
......3333......
................`],
  [heart, bitmap`
................
..333....333....
.33333..33333...
.333333333333...
..3333333333....
...33333333.....
....333333......
.....3333.......
......33........
................`],
  [sky, bitmap`
7777777777777777
7777777777777777
7722777777777777
7772777777777277
7777777777772777
7777777277777277
7777777727777777
7777777777777777
7777777777777777
7772277777777777
7777777777777777
7777777777727727
7777777777227727
7727777777727777
7722777777777777
7777777777777777`]
);

setMap(map`
00000000
00000000
00000000
00000000
00000000
00000000
00000000
00000000`);

// 2. music
const bgMusic = tune`200,200: C5~200,200,200: E5~200 + A4^200,200: B4~200,200: C5~200 + A4^200,200: C5~200 + A4^200,200,200: F4^200,200,200: C5~200,200,200: E5~200 + A4^200,200: B4~200,200: C5~200 + A4^200,200: C5~200 + A4^200,1000,200: A4~200,200: B4~200,200,200: D5~200,200: E5~200,200: F5~200,200,200: D5~200,200: D5~200,400`;
const shootSound = tune`150: D5^150, 150: E5^150`;
const explosionSound = tune`
100: undefined-100,
200,
100: A4/100,
100: B4/100,
100: C4/100,
2600`;

playTune(bgMusic, Infinity);
addSprite(4, 6, player);

// Hearts
function updateUI() {
  getAll(heart).forEach(h => h.remove());
  if (!gameActive) return;
  for (let i = 0; i < lives; i++) {
    addSprite(i, 7, heart);
  }
}
updateUI();

// controls
onInput("w", () => {
  const p = getFirst(player);
  if (gameActive && p && p.y > 0) p.y -= 1;
});
onInput("s", () => {
  const p = getFirst(player);
  if (gameActive && p && p.y < 6) p.y += 1;
});
onInput("a", () => {
  const p = getFirst(player);
  if (gameActive && p && p.x > 0) p.x -= 1;
});
onInput("d", () => {
  const p = getFirst(player);
  if (gameActive && p && p.x < 7) p.x += 1;
});

onInput("j", () => {
  const p = getFirst(player);
  if (gameActive && p) {
    addSprite(p.x, p.y - 1, bullet);
    playTune(shootSound);
  }
});

// main loop
setInterval(() => {
  if (!gameActive) return;
  const p = getFirst(player);

  // bullet physics
  getAll(bullet).forEach(b => {
    b.y -= 1;
    if (b.y < 0) {
      b.remove();
    } else {
      // Collision check
      const targets = getTile(b.x, b.y).filter(s => s.type === enemy);
      if (targets.length > 0) {
        targets.forEach(t => t.remove());
        b.remove();
        score += 10;
        playTune(explosionSound);
      }
    }
  });

  // movement mechanics and stuck cleanup
  getAll(enemy).forEach(e => {
    e.y += 1;
    if (e.y > 6) {
      e.remove();
    } else if (p && e.x === p.x && e.y === p.y) {
      lives -= 1;
      playTune(explosionSound);
      e.remove();
      updateUI();
      if (lives <= 0) {
        gameActive = false;
        p.remove();
        addText("you died :(", { y: 4, color: color`3` });
      }
    }
  });

  // enemy spawning
  if (Math.random() < spawnRate) {
    let rx = Math.floor(Math.random() * 8);
    const enemiesAtSpawn = getTile(rx, 0).filter(s => s.type === enemy);
    if (enemiesAtSpawn.length === 0) {
      addSprite(rx, 0, enemy);
    }
  }
}, 150);

// timer
setInterval(() => {
  if (gameActive) {
    secondsPassed++;
    if (secondsPassed % 10 === 0) spawnRate += 0.04;
    if (secondsPassed === 60) {
      addText("you good brochacho!", { y: 3, color: color`4` });
    }
  }
}, 1000);
