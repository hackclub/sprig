/*
@title: Fighting Hard
@description: Survive waves of monsters in the arena!
@tags: ['action']
@author: Ruhaan Anand
@addedOn: 2026-11-24
*/

const player = "p"
const enemy = "e"
const boss = "b"
const wall = "w"
const attack = "a"
const floor = "f"

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
  [boss, bitmap`
00............00
030..........030
0330........0330
0333000000003330
.03333999933330.
0333996666993330
0333320330233330
0333320330233330
0333333333333330
0393300000033930
0393022222203930
0333000000033330
.03333333333330.
.03330....03330.
033330....033330
000000....000000`],
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
setSolids([player,enemy,boss,wall]);

const attackSound = tune`
50: C5-50,
50: G4-50,
50: C4-50`;

const enemySound = tune`
70: E5~70,
70: G5~70,
100: C6~100`;

const hurtSound = tune`
100: G3-100,
150: C3-150`;

const winSound = tune`
100: C5~100,
100: E5~100,
100: G5~100,
300: C6~300`;

const music = tune`
150: A3~120,
150: C4~120,
150: E4~120,
150: A4~120,
150: G4~120,
150: E4~120,
150: F4~120,
150: G4~120,
150: A3~120,
150: C4~120,
150: E4~120,
150: C5~120,
150: G4~120,
150: E4~120,
150: C4~120,
150: G3~120`;

const levels=[
  map`
wwwwwwwwww
w........w
w.e....e.w
w........w
w....p...w
w........w
w.e....e.w
w........w`,
   map`
wwwwwwwwww
w.e....e.w
w........w
w..w..w..w
we...p..ew
w..w..w..w
w........w
w.e....e.w
wwwwwwwwww`,
  map`
wwwwwwwwww
w........w
w....b...w
w........w
w..w..w..w
w........w
w....p...w
w........w
wwwwwwwwww`
];

let level = 0;
let health = 5;
let score = 0;
let bossHealth = 10;
let playing = false;
let musicPlayer;
let cooldown = 0;

setMap(levels[0]);

addText("FIGHTING HARD", {
  x: 3,
  y: 3,
  color: color`6`
});

addText("K TO START", {
  x: 5,
  y: 13,
  color: color`7`
});

function startGame(){
  level = 0
  health = 5
  score = 0;
  bossHealth = 10;
  cooldown = 0;
  playing = true;

  setMap(levels[level]);

  if(musicPlayer) {
    musicPlayer.end();
  }

  musicPlayer = playTune(music, Infinity);

  updateText();
}

onInput("k", () => {
  startGame();
});

onInput("w", () => {
  if (playing) {
    getFirst(player).y -= 1;
  }
});

onInput("s", () => {
  if (playing) {
    getFirst(player).y += 1;
  }
});

onInput("a", () => {
  if (playing) {
    getFirst(player).x -= 1;
  }
});

onInput("d", () => {
  if (playing) {
    getFirst(player).x += 1;
  }
});

onInput("j", () => {
  if(!playing||cooldown>0){
    return;
  }

  cooldown = 3;

  let p = getFirst(player);

  playTune(attackSound);

   addSprite(p.x, p.y, attack);

  for (let e of getAll(enemy)) {
    let distance = Math.abs(p.x - e.x)
                 + Math.abs(p.y - e.y);

    if (distance <= 2) {
      e.remove();
      score += 10;
      playTune(enemySound);
    }
  }
  
   for (let b of getAll(boss)) {
    let distance = Math.abs(p.x - b.x)
                 + Math.abs(p.y - b.y);

    if (distance <= 2) {
      bossHealth -= 1;

      playTune(enemySound);

      if (bossHealth <= 0) {
        b.remove();
        score += 100;
      }
    }
  }
  
  checkLevel();
});

function moveEnemy(e) {
  let p = getFirst(player);

  let dx = p.x - e.x;
  let dy = p.y - e.y;

  let distance = Math.abs(dx) + Math.abs(dy);

  if (distance === 1) {
    health -= 1;
    playTune(hurtSound);

    if (e.type === enemy) {
      e.remove();
    }
  } else {
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) {
        e.x += 1;
      } else {
        e.x -= 1;
      }
    } else {
      if (dy > 0) {
        e.y += 1;
      } else {
        e.y -= 1;
      }
    }
  }
}

function checkLevel() {
  if (health <= 0) {
    gameOver();
    return;
  }

  if (getAll(enemy).length === 0 &&
      getAll(boss).length === 0) {

    level += 1;

    if (level === 3) {
      winGame();
      return;
    }

    health += 1;

    if (health > 5) {
      health = 5;
    }

    setMap(levels[level]);
    playTune(winSound);
  }

  updateText();
}

function updateText() {
  clearText();

  addText("HP:" + health, {
    x: 0,
    y: 0,
    color: color`3`
  });

  addText("SCORE:" + score, {
    x: 10,
    y: 0,
    color: color`6`
  });

  if (level === 2) {
    addText("BOSS HP:" + bossHealth, {
      x: 4,
      y: 15,
      color: color`3`
    });
  } else {
    addText("LEVEL " + (level + 1), {
      x: 6,
      y: 15,
      color: color`7`
    });
  }
}

function gameOver() {
  playing = false;
  musicPlayer.end();

  clearText();

  addText("GAME OVER", {
    x: 5,
    y: 5,
    color: color`3`
  });

   addText("SCORE:" + score, {
    x: 5,
    y: 8,
    color: color`6`
  });

  addText("K TO RESTART", {
    x: 4,
    y: 12,
    color: color`2`
  });
}

function winGame() {
  playing = false;
  musicPlayer.end();

  clearText();
  playTune(winSound);

  addText("YOU WIN!", {
    x: 6,
    y: 5,
    color: color`6`
  });

  addText("SCORE:" + score, {
    x: 5,
    y: 8,
    color: color`7`
  });

  addText("K TO RESTART", {
    x: 4,
    y: 12,
    color: color`2`
  });
}

setInterval(() => {
  if (!playing) {
    return;
  }

  for (let e of getAll(enemy)) {
    moveEnemy(e);
  }

  for (let b of getAll(boss)) {
    moveEnemy(b);
  }

  checkLevel();
}, 700);

setInterval(() => {
  if (cooldown > 0) {
    cooldown -= 1;
  }

  for (let a of getAll(attack)) {
    a.remove();
  }
}, 100);



