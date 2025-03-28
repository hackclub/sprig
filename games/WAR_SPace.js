/*
@title: WAR_SPace
@author: Elkammar
@tags: ['action', 'zombie', 'shooter']
*/

// Use single-character identifiers
const hero = "h";
const laser = "l";
const zombie = "z";
const healthPack = "p";
const explosion = "e";
const background = "b";
const zombieLaser = "f";

// Audio
const bgMusic = tune`
200: C5^200 + E5/200 + G5~200,
200: A5^200 + C6/200 + E6~200,
200`;
const laserSound = tune`50: D5^50 + F5^50`;
const explosionSound = tune`75: C4-75 + E4-75 + G4/75`;

setLegend(
  [hero, bitmap`
    .666666666666.
    66666666666666
    66666666666666
    66666666666666
    66666666666666
    66666666666666
    66666666666666
    66666666666666
    66666666666666
    66666666666666
    66666666666666
    66666666666666
    66666666666666
    66666666666666
    66666666666666
    66666666666666`],
  [laser, bitmap`
    .......33.......
    ......3333......
    .....333333.....
    ....33333333....
    ...3333333333...
    ..333333333333..
    .33333333333333.
    3333333333333333
    3333333333333333
    .33333333333333.
    ..333333333333..
    ...3333333333...
    ....33333333....
    .....333333.....
    ......3333......
    .......33.......`],
  [zombie, bitmap`
    ....44444444....
    ...4444444444...
    ..444444444444..
    .44444444444444.
    4444444444444444
    4444444444444444
    4444444444444444
    4444444444444444
    4444444444444444
    4444444444444444
    4444444444444444
    4444444444444444
    4444444444444444
    4444444444444444
    4444444444444444
    4444444444444444`],
  [healthPack, bitmap`
    ....00000000....
    ...0000000000...
    ..000000000000..
    .00000000000000.
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
  [explosion, bitmap`
    ..3333333333....
    .344444444433...
    34444444444443..
    344444444444443.
    344444444444443.
    344444444444443.
    .344444444443...
    ..3333333333....`],
  [background, bitmap`
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
  [zombieLaser, bitmap`
    .......44.......
    ......4444......
    .....444444.....
    ....44444444....
    ...4444444444...
    ..444444444444..
    .44444444444444.
    4444444444444444
    4444444444444444
    .44444444444444.
    ..444444444444..
    ...4444444444...
    ....44444444....
    .....444444.....
    ......4444......
    .......44.......`]
);

setBackground(background);
playTune(bgMusic, Infinity);

setSolids([hero]);
let level = 0;
const levels = [
  map`
  ...........
  ...........
  ...........
  ...........
  ...........
  ...........
  ...........
  ...........
  .....h.....`
];
setMap(levels[level]);

let score = 0;
let gameOver = false;
let canShoot = true;

function resetGame() {
  setMap(levels[0]);
  score = 0;
  gameOver = false;
  canShoot = true;
}

onInput("a", () => {
  if (!gameOver) getFirst(hero).x -= 1;
});

onInput("d", () => {
  if (!gameOver) getFirst(hero).x += 1;
});

onInput("w", () => {
  if (canShoot && !gameOver) {
    canShoot = false;
    playTune(laserSound);
    addSprite(getFirst(hero).x, 7, laser);
    setTimeout(() => canShoot = true, 200);
  }
});

function handleCollisions() {
  // Laser hits zombie
  tilesWith(zombie, laser).forEach(tile => {
    if (!gameOver) {
      score += 10;
      const [x, y] = [tile[0].x, tile[0].y];
      clearTile(x, y);
      const exp = addSprite(x, y, explosion);
      playTune(explosionSound);
      setTimeout(() => exp.remove(), 1000); // Remove explosion after 1 second
    }
  });

  // Hero lasers hit hero
  tilesWith(hero, laser).forEach(() => {
    if (!gameOver) {
      gameOver = true;
      playTune(explosionSound);
      addText("Game Over!\nScore: " + score, { x: 5, y: 6, color: color`3` });
      setTimeout(resetGame, 3000);
    }
  });

  // Zombie lasers hit hero
  tilesWith(hero, zombieLaser).forEach(() => {
    if (!gameOver) {
      gameOver = true;
      playTune(explosionSound);
      addText("Game Over!\nScore: " + score, { x: 5, y: 6, color: color`3` });
      setTimeout(resetGame, 3000);
    }
  });

  // Hero touches zombie
  tilesWith(hero, zombie).forEach(() => {
    if (!gameOver) {
      gameOver = true;
      playTune(explosionSound);
      addText("Game Over!\nScore: " + score, { x: 5, y: 6, color: color`3` });
      setTimeout(resetGame, 3000);
    }
  });

  // Health pack collection
  tilesWith(hero, healthPack).forEach(tile => {
    if (!gameOver) {
      score += 50;
      clearTile(tile[0].x, tile[0].y);
    }
  });
}

setInterval(() => {
  if (gameOver) return;

  // Spawn zombies
  if (Math.random() < 0.02) {
    addSprite(Math.floor(Math.random() * 11), 0, zombie);
  }

  // Spawn health packs
  if (Math.random() < 0.01) {
    addSprite(Math.floor(Math.random() * 11), 0, healthPack);
  }

  // Zombies shoot
  getAll(zombie).forEach(z => {
    if (Math.random() < 0.01) {
      addSprite(z.x, z.y, zombieLaser);
      playTune(laserSound);
    }
  });

  // Move zombies
  getAll(zombie).forEach(z => {
    z.y += 1;
    if (z.y > 8) z.remove();
  });

  // Move hero lasers
  getAll(laser).forEach(l => {
    l.y -= 1;
    if (l.y < 0) l.remove();
  });

  // Move zombie lasers
  getAll(zombieLaser).forEach(f => {
    f.y += 1;
    if (f.y > 8) f.remove();
  });

  // Update score
  clearText();
  addText(`Score: ${score}`, { x: 1, y: 0, color: color`2` });

  handleCollisions();
}, 100);
