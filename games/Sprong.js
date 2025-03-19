/*
@title: Sprong
@author: Licnex
@tags: ['retro', 'endless', 'multiplayer']
@addedOn: 2024-11-12
*/

let singlePlayer = false;

const player1 = "1";
const player2 = "2";
let player1Score = 0;
let player2Score = 0;
const background = "b"

const playerSpeed = 4;
let aiSpeed = 3;

let aiMoving = false;

const ball = "o";
let ballDx = 0;
let ballDy = 0;
const hitSound1 = tune`
133.92857142857142: g4~133.92857142857142,
4151.785714285714`
const hitSound2 = tune`
500: a4-500 + f4-500,
15500`
let soundOne = true;
const pointSound = tune`
416.6666666666667: c5-416.6666666666667 + e5-416.6666666666667 + g5-416.6666666666667,
416.6666666666667: c5-416.6666666666667 + e5-416.6666666666667 + g5-416.6666666666667,
416.6666666666667: a5-416.6666666666667 + d5-416.6666666666667 + f5-416.6666666666667,
12083.333333333334`
const loseSound = tune`
211.26760563380282: a4-211.26760563380282,
211.26760563380282: f4-211.26760563380282,
211.26760563380282: c4-211.26760563380282,
6126.760563380281`

setLegend(
  [player1, bitmap`
...222222.......
...222222.......
...222222.......
...222222.......
...222222.......
...222222.......
...222222.......
...222222.......
...222222.......
...222222.......
...222222.......
...222222.......
...222222.......
...222222.......
...222222.......
...222222.......`],
  [player2, bitmap`
.......222222...
.......222222...
.......222222...
.......222222...
.......222222...
.......222222...
.......222222...
.......222222...
.......222222...
.......222222...
.......222222...
.......222222...
.......222222...
.......222222...
.......222222...
.......222222...`],
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
  [ball, bitmap`
................
....22222222....
...2222222222...
..222222222222..
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
.22222222222222.
..222222222222..
...2222222222...
....22222222....
................`]
);

setBackground(background);

setSolids([player1, player2]);

let level = 0;
const levels = [
  map`
.....
.....
.....`,
  map`
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
.1.......................................................2.
.1.......................................................2.
.1...........................o...........................2.
.1.......................................................2.
.1.......................................................2.
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................
...........................................................`,
];

function menu() {
  setMap(levels[level])
  clearText();
  addText("Select Game Mode:", { y: 5, color: color`2` });
  addText("A. Single Player", { y: 8, color: color`2` });
  addText("L. Multiplayer", { y: 10, color: color`2` });

  onInput("a", () => {
      if (level === 0) {
        singlePlayer = true;
        aiMoving = true
        level += 1
        setMap(levels[level]);
        clearText();
    }
  });

  onInput("l", () => {
    if (level === 0) {
    singlePlayer = false;
    aiMoving = false
    level += 1
    setMap(levels[level]);
    clearText();
    }
  });
}

menu();
setTimeout(() => {
  ballDx = Math.random() < 0.5 ? -1 : 1;
  ballDy = Math.random() < 0.5 ? -2 : 2;
}, 1000);


onInput("w", () => {
  getAll(player1).forEach(p => {
    p.y -= playerSpeed;
  })
});

onInput("s", () => {
  getAll(player1).reverse().forEach(p => {
    p.y += playerSpeed;
  })
});
onInput("i", () => {
  getAll(player2).forEach(p => {
    if (singlePlayer === false) {
      p.y -= playerSpeed;
    }
  })
});

onInput("k", () => {
  getAll(player2).reverse().forEach(p => {
    if (singlePlayer === false) {
      p.y += playerSpeed;
    }
  })
});

setPushables({
  [player1]: [player1],
  [player2]: [player2]
});

function dist(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy)
}

function writeScore() {
  clearText()
  addText(`${player1Score} - ${player2Score}`, {
    y: 1,
    color: color`2`
  });
}

function restart(sprite) {
  if (level > 0) {
    writeScore()
    ballDx = 0;
    ballDy = 0;
    sprite.x = Math.round(width() / 2);
    sprite.y = Math.round(height() / 2);
    setTimeout(() => {
      ballDx = Math.random() < 0.5 ? -1 : 1;
      ballDy = Math.random() < 0.5 ? -2 : 2;
    }, 1000);
  }
}

function makeSound() {
  if (soundOne) {
    playTune(hitSound1);
  } else {
    playTune(hitSound1);
  }
  soundOne = !soundOne
}
setInterval(() => {
  if (level > 0) {
    const sprite = getFirst(ball);
    sprite.x += ballDx;
    sprite.y += ballDy;

    if (sprite.y >= height() - 2) {
      ballDy = Math.abs(ballDy) * -1;
      makeSound()
    } else if (sprite.y <= 2) {
      ballDy = Math.abs(ballDy);
      makeSound()
    }
    const isPast = (s) => {
      const d = dist(sprite.x, sprite.y, s.x, s.y);
      return d >= 1 && d <= 2;
    }
    if (getAll(player2).some(isPast) && ballDx > 0) {
      ballDx = ballDx * -1;
      makeSound()
    } else if (sprite.x >= width() - 1) {
      player1Score += 1;
      playTune(pointSound);
      restart(sprite)
    }
    if (getAll(player1).some(isPast) && ballDx < 0) {
      ballDx = ballDx * -1;
      makeSound()
    } else if (sprite.x <= 1 & singlePlayer === true) {
      player2Score += 1;
      playTune(loseSound);
      restart(sprite)
    } else if (sprite.x <= 1 & singlePlayer === false) {
      player2Score += 1;
      playTune(pointSound);
      restart(sprite)
    }
  }
}, 60)

let aiYValues;
setInterval(() => {
  if (level > 0 && singlePlayer === true) {
    const sprite = getFirst(ball);
    if (ballDx < 0) {
      aiSpeed = 1;
    } else {
      aiSpeed = 2;
    }

    if (aiMoving) {
      if ((Math.random() * 100) < 40) {
        aiMoving = false;
        setTimeout(() => {
          aiMoving = true;
        }, 40);
      };
    }
    if (!aiMoving) return;

    aiYValues = getAll(player2).map(e => e.y);
    if (Math.min(...aiYValues) > sprite.y) {
      getAll(player2).forEach(p => {
        p.y -= 2;
      })
    } else if (Math.max(...aiYValues) < sprite.y) {
      getAll(player2).reverse().forEach((p, i) => {
        p.y += 2;
      })
    }
  }
}, 10)