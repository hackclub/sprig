/*
@title: Desi-Pong
@author: Arnob Das
@tags: ['retro']
@addedOn: 2022-09-14
*/

const player1 = "1";
const player2 = "2";
let player1Score = 0;
let player2Score = 0;
const background = "b"
let i;
let isPaused = false;
const playerSpeed = 5;

const ball = "o";
let ballDx = 0;
let ballDy = 0;
setTimeout(() => {
  ballDx = Math.random() < 0.5 ? -1 : 1;
  ballDy = Math.random() < 0.5 ? -2 : 2;
}, 1000);

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
  [ player1, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [ player2, bitmap`
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
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ background, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ ball, bitmap`
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
...........................................................`
];


setMap(levels[level]);

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
    p.y -= playerSpeed;
  })
});

onInput("k", () => {
  getAll(player2).reverse().forEach(p => {
    p.y += playerSpeed;
    
  })
});

onInput("j", () => {
  isPaused = false;
});

onInput("l", () => {
  isPaused = true;
});

onInput("d", () => {
  player1Score=0
  player2Score=0
  ballDx = 0;
  ballDy = 0;
  setTimeout(() => {
    ballDx = Math.random() < 0.5 ? -1 : 1;
    ballDy = Math.random() < 0.5 ? -2 : 2;
  }, 1000);
  // console.log("Game Restarted");
});

setPushables({
  [player1]: [player1],
  [player2]: [player2]
})


addText(`P1- ${player1Score} - ${player2Score} -P2`, {
  y: 1,
  color: color`8`
});

function dist(x1, y1, x2, y2) {
  const dx = x1 - x2;
  const dy = y1 - y2;
  return Math.sqrt(dx * dx + dy * dy)
}

function writeScore() {
  clearText()
  addText(`P1- ${player1Score} - ${player2Score} -P2`, {
    y: 1,
    color: color`8`
  });
}

function restart(sprite) {
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


function makeSound() {
  if (soundOne) {
    playTune(hitSound1);
  }
  else {
    playTune(hitSound1);
  }
  soundOne = !soundOne
}


function control(){
  const sprite = getFirst(ball);
  sprite.x += ballDx;
  sprite.y += ballDy;
  
  if (sprite.y >= height() - 2) {
    ballDy = Math.abs(ballDy) * -1;
    makeSound()
  }
  else if (sprite.y <= 2) {
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
  }
  else if (sprite.x >= width() - 1) {
    player1Score += 1;
    playTune(pointSound);
    restart(sprite)
  }
  if (getAll(player1).some(isPast) && ballDx < 0) {
    ballDx = ballDx * -1;
    makeSound()
  }
  else if (sprite.x <= 1){
    player2Score += 1;
    playTune(loseSound);
    restart(sprite)
  }
}

i=setInterval(() => {
  if(!isPaused) {
    control(); 
  }
}, 60)

let scoreCheck = 10;

// stop game when player1 or player2 score is equal or greater that 10.
setInterval(()=>{
  if(player1Score>=scoreCheck || player2Score>=scoreCheck){
      addText("Game Over !!!", {
        y: 7,
        color: color`8`
      });
      clearInterval(i);
  }
  if(player1Score>=scoreCheck){
    addText("Player 1 is win !", {
        y: 5,
        color: color`8`
      });
  }
  if(player2Score>=scoreCheck){
    addText("Player 2 is win !", {
        y: 5,
        color: color`8`
      });
  }
},0)
