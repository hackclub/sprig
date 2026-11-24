/*
@title: Fighting Hard
@description: Survive waves of monsters in the arena!
@tags: ['action']
@author: Ruhaan Anand
*/

const player = "p";
const enemy = "e";
const wall = "w";
const floor = "f";
const attack = "a";

setLegend(
  [attack, bitmap`
................
.......63.......
..3....36....6..
...6........3...
....6......6....
................
.66..........36.
366..........666
663..........666
.66..........63.
................
....6......6....
...3........3...
..6....36....6..
.......63.......
................`],
  [player, bitmap`
................
.....000000.....
....07777770....
...0777777770...
...0711111170...
...0102002010...
...0111111110...
....07777770....
.....000000.....
...0555555550...
..055577775550..
..055577775550..
...0555555550...
....05500550....
....000..000....
................`],
  [enemy, bitmap`
.....0....0.....
..33.00..00.33..
..333.0000.333..
...3333333333...
..333999933333..
.33333333333333.
.33203333203333.
.33203333203333.
.33333333333333.
.33302000033333.
..330000203333..
..333333333333..
...3333333333...
...333....333...
...000....000...
................`],
  [wall, bitmap`
0000000000000000
0111111011111110
0122221012222110
0121111012111110
0111111011111110
0111111011111110
0000000000000000
1110111111101111
1210122222101221
1110111111101111
1110111111101111
1110111111101111
0000000000000000
0111111011111110
0122221012222110
0000000000000000`],
  [floor, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111111111111110
0111110111110110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111011111111110
0111111111101110
0111111111111110
0111111111111110
0111111111111110
0000000000000000`]
);

setBackground(floor);
setSolids([player, enemy, wall]);

const slashSound = tune`
45.0112528132033: C5-45.0112528132033,
45.0112528132033: G4-45.0112528132033 + E4~45.0112528132033 + F4~45.0112528132033 + D5~45.0112528132033 + E5~45.0112528132033,
45.0112528132033: C4-45.0112528132033 + E4~45.0112528132033 + A5~45.0112528132033 + F5~45.0112528132033 + C5~45.0112528132033,
45.0112528132033: B4~45.0112528132033 + E4~45.0112528132033 + G5~45.0112528132033 + F5^45.0112528132033 + D5^45.0112528132033,
45.0112528132033: A4~45.0112528132033 + F4~45.0112528132033 + D4^45.0112528132033 + E5^45.0112528132033 + D5^45.0112528132033,
45.0112528132033: B4^45.0112528132033 + A4^45.0112528132033 + B5^45.0112528132033 + A5^45.0112528132033 + D4/45.0112528132033,
45.0112528132033: E4/45.0112528132033 + F4/45.0112528132033 + C5/45.0112528132033 + D5/45.0112528132033,
45.0112528132033: G4~45.0112528132033,
1080.2700675168792`;

const defeatSound = tune`
70: C5~70,
70: E5~70,
100: G5~100`;

const hurtSound = tune`
120: G3-120,
160: C3-160`;

const startSound = tune`
100: C4~100,
100: E4~100,
100: G4~100,
150: C5~150`;

const winSound = tune`
120: C5~120,
120: E5~120,
120: G5~120,
120: C6~120,
300: C6~300`;

const loseSound = tune`
200: G4~200,
200: E4~200,
200: C4~200,
400: C3~400`;

const music = tune`
180: A3~150,
180: C4~150,
180: E4~150,
180: C4~150,
180: A3~150,
180: C4~150,
180: G4~150,
180: E4~150,
180: F3~150,
180: A3~150,
180: C4~150,
180: A3~150,
180: G3~150,
180: B3~150,
180: E4~150,
180: G4~150`;

const arena = map`
wwwwwwwwww
w........w
w.e......w
w........w
w....p...w
w........w
w......e.w
w........w
wwwwwwwwww`;

let health = 5;
let score = 0;
let state = "title";
let musicPlayer = null;
let cooldown = 0;
let ticks = 0;
let invincible = 0;

setMap(map`
wwwwwwwwww
w........w
w........w
w........w
w..p..e..w
w........w
w........w
w........w
wwwwwwwwww`);

addText("FIGHTING", {
  x: 6, y: 2,
  color: color`6`
});

addText("HARD", {
  x: 8, y: 4,
  color: color`3`
});

addText("SURVIVE THE ARENA", {
  x: 1, y: 11,
  color: color`2`
});

addText("K TO START", {
  x: 5, y: 13,
  color: color`7`
});

function startGame() {
  if (musicPlayer) musicPlayer.end();

  health = 5;
  score = 0;
  cooldown = 0;
  invincible = 0;
  ticks = 0;
  state = "playing";

  setMap(arena);
  playTune(startSound);
  musicPlayer = playTune(music, Infinity);

  hud();
}

onInput("k", startGame);

function hud() {
  clearText();

  addText("HP:" + health, {
    x: 0, y: 0,
    color: color`3`
  });

  addText("KO:" + score + "/15", {
    x: 10, y: 0,
    color: color`6`
  });

  if (score >= 10) {
    addText("DANGER!", {
      x: 6, y: 15,
      color: color`3`
    });
  } else if (score >= 5) {
    addText("LEVEL 2", {
      x: 6, y: 15,
      color: color`6`
    });
  } else {
    addText("LEVEL 1", {
      x: 6, y: 15,
      color: color`7`
    });
  }
}

onInput("w", () => {
  if (state === "playing")
    getFirst(player).y--;
});

onInput("s", () => {
  if (state === "playing")
    getFirst(player).y++;
});

onInput("a", () => {
  if (state === "playing")
    getFirst(player).x--;
});

onInput("d", () => {
  if (state === "playing")
    getFirst(player).x++;
});

onInput("j", () => {
  if (state !== "playing") return;
  if (cooldown > 0) return;

  cooldown = 2;

  playTune(slashSound);

  const p = getFirst(player);

  const directions = [
    [0, 0],
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1]
  ];

  for (const dir of directions) {
    const x = p.x + dir[0];
    const y = p.y + dir[1];

    if (x > 0 && x < width() - 1 &&
        y > 0 && y < height() - 1) {
      addSprite(x, y, attack);
    }
  }

  let defeated = 0;

  for (const e of getAll(enemy)) {
    const distance =
      Math.abs(p.x - e.x) +
      Math.abs(p.y - e.y);

    if (distance <= 1) {
      e.remove();
      score++;
      defeated++;
    }
  }

  if (defeated > 0) {
    playTune(defeatSound);
  }

  if (score >= 15) {
    endGame(true);
    return;
  }

  for (let i = 0; i < defeated; i++) {
    spawnEnemy();
  }

  hud();
});

function spawnEnemy() {
  const p = getFirst(player);
  const spaces = [];

  for (let x = 1; x < width() - 1; x++) {
    for (let y = 1; y < height() - 1; y++) {
      const distance =
        Math.abs(x - p.x) +
        Math.abs(y - p.y);

      if (distance >= 4 &&
          getTile(x, y).length === 0) {
        spaces.push([x, y]);
      }
    }
  }

  if (spaces.length > 0) {
    const spot = spaces[
      Math.floor(Math.random() * spaces.length)
    ];

    addSprite(spot[0], spot[1], enemy);
  }
}

function moveEnemies() {
  const p = getFirst(player);

  for (const e of getAll(enemy)) {
    const dx = p.x - e.x;
    const dy = p.y - e.y;

    const distance =
      Math.abs(dx) + Math.abs(dy);

    if (distance === 1) {
      if (invincible === 0) {
        health--;
        invincible = 8;

        playTune(hurtSound);

        e.remove();
        spawnEnemy();

        if (health <= 0) {
          endGame(false);
          return;
        }

        hud();
      }
    } else {
      if (Math.abs(dx) > Math.abs(dy)) {
        e.x += Math.sign(dx);
      } else {
        e.y += Math.sign(dy);
      }
    }
  }
}

setInterval(() => {
  if (state !== "playing") return;

  ticks++;

  if (cooldown > 0) {
    cooldown--;
  }

  if (cooldown === 0) {
    for (const a of getAll(attack)) {
      a.remove();
    }
  }

  if (invincible > 0) {
    invincible--;
  }

  let speed = 7;

  if (score >= 5) speed = 5;
  if (score >= 10) speed = 3;

  if (ticks % speed === 0) {
    moveEnemies();
  }

}, 100);

function endGame(won) {
  state = "ended";

  if (musicPlayer) {
    musicPlayer.end();
    musicPlayer = null;
  }

  clearText();

  setMap(map`
wwwwwwwwww
w........w
w........w
w........w
w........w
w........w
w........w
w........w
wwwwwwwwww`);

  if (won) {
    playTune(winSound);

    addText("VICTORY!", {
      x: 6, y: 3,
      color: color`6`
    });

    addText("ARENA CLEARED", {
      x: 3, y: 6,
      color: color`4`
    });
  } else {
    playTune(loseSound);

    addText("GAME OVER", {
      x: 5, y: 3,
      color: color`3`
    });
  }

  addText("SCORE: " + score, {
    x: 4, y: 9,
    color: color`7`
  });

  addText("K TO RESTART", {
    x: 4, y: 13,
    color: color`2`
  });
}
