/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: PinPon
@author: pmm-inf
@tags: []
@addedOn: 2025-01-03
*/

const player1 = "1"
const player2 = "2"
const ball = "b"
const ground = "g"

setLegend(
  [ player1, bitmap`
.......22.......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
.......22.......` ],
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
................`],
  [ player2, bitmap`
.......22.......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
......2222......
.......22.......`],
  [ ground, bitmap`
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
0000000000000000`]
)

setBackground(ground)

setSolids([])

addText("Welcome to the", {
  x: 3,
  y: 5,
  color: color`2`
})

addText("most boring game.", {
  x: 2,
  y: 7,
  color: color`2`
})

addText(":)", {
  x: 9,
  y: 9,
  color: color`2`
})
    
let level = 0
const levels = [
  map`
ggggggggg
ggggggggg
ggggggggg
ggggggggg
ggggggggg
ggggggggg
ggggggggg
ggggggggg
ggggggggg`,
  map`
.........
1........
.........
.........
....b....
.........
.........
.........
........2`
]

setMap(levels[level])

setPushables({
  [ player1 ]: []
})

onInput("w", () => {
  getFirst(player1).y += -1
})

onInput("s", () => {
  getFirst(player1).y += 1
})

onInput("i", () => {
  getFirst(player2).y += -1
})

onInput("k", () => {
  getFirst(player2).y += 1
})

onInput("a", () => {
  if (level == 0) {
    clearText()
    level += 1
    setMap(levels[level])
  } else {
  }
})

const interval = setInterval(gameLoop, 200);

let ball_vx = 1;
let ball_vy = 1;

score1 = 0;
score2 = 0;

function showScore() {
  clearText();
  addText(score1.toString().padStart(2, "0"), {
  x: 0,
  y: 1,
  color: color`2`
  });
  addText(score2.toString().padStart(2, "0"), {
  x: 18,
  y: 1,
  color: color`2`
  });
}

function gameLoop() {
  if (level == 1) {
    const b = getFirst(ball);
    const p1 = getFirst(player1);
    const p2 = getFirst(player2);
    b.x += ball_vx;
    b.y += ball_vy;
    if (b.x == 8) {
      ball_vx = -1;
      score1 += 1;
      showScore();
    }
    if (b.x == 0) {
      ball_vx = 1;
      score2 += 1;
      showScore();
    }
    if (b.y == 8) {
      ball_vy = -1;
    }
    if (b.y == 0) {
      ball_vy = 1;
    }
    if (b.x == 7) {
      if (p2.y == b.y) {
        ball_vx = -1
      }
      if (ball_vy != 0 && b.y+ball_vy == p2.y) {
        ball_vx = -1 
        ball_vy = -ball_vy
      }  
    }
    if (b.x == 1) {
      if (p1.y == b.y) {
        ball_vx = 1
      }
      if (ball_vy != 0 && b.y+ball_vy == p1.y) {
        ball_vx = 1 
        ball_vy = -ball_vy
      }  
    }
  }
}
  
afterInput(() => {
  
})
