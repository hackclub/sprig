/*
@title: Goaled
@author: Ronan Verma

In this game, you are the purple player, the ball is the gray circle, and the goal 
is the yellow rectangle. Your goal is to push the ball into the goal, the goal will
randomly teleport every 3 seconds.

Instructions:
WASD to move, "l" while touching the ball to mave it 2 tiles in your direction, "k"
to restart your position, for example, if your ball is stuck at the egde, you can 
press "k" to teleport back to the starting position, every time you teleport, your score will have
1 taken away from it. You have 30 seconds to get as many goals as possible.


*/

const player = "p";
const ball = "b";
const goal = "g";
let counter = 1;
let game_is_over = false;
const clear_space =  "c"

setLegend(
  [ player, bitmap`
................
................
................
.....444444.....
.....404404.....
....84444448....
...8828448288...
...8828888288...
...8828888288...
...8828888288...
...8222882228...
...8828888288...
...8888888888...
...4400LL0044...
...4.10LL01.4...
.....L0LL0L.....`],
  [ ball, bitmap`
................
................
................
.......000......
.....0011100....
....011101110...
....011010110...
...01101010110..
...01010101010..
...01101010110..
....011010110...
....011101110...
.....0011100....
.......000......
................
................`],
  [ goal, bitmap`
................
................
................
................
.66666666666666.
.67676767676766.
.66767676767676.
.67676767676766.
.66767676767676.
.67676767676766.
.66767676767676.
.66666666666666.
................
................
................
................`],
  [ clear_space, bitmap`
................
................
.....66666......
....6666666.....
....6666666.....
.....66666......
.....66666......
......666.......
.......6........
.......6........
.......6........
.......6........
......666.......
.....66666......
................
................`]
);

setSolids([player, ball]);


let level = 0;
const levels = [
  map`
..........
..........
........g.
..........
..p.b.....
..........
..........
..........`, // game
  map`
..........
....pb....
..........
..........
..........
..........
..........
..........`, // score
  map`
..........
....pb....
..........
..........
..........
..........
....cc....
..........`, // end
];

setMap(levels[level]);

setPushables({
  [ player ]: [ ball ]
});

onInput("s", () => {
  getFirst(player).y += 1
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("k", () => {
  if (game_is_over == false) {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
  counter -= 1;
}});

onInput("l", () => {
  const playerY = getFirst(player).y
  const playerX = getFirst(player).x
  const ballY = getFirst(ball).y
  const ballX = getFirst(ball).x

  if (playerY - ballY == -1) {
    if (playerX - ballX == 0) {
      getFirst(ball).y += 2
    }
  }
  if (playerY - ballY == 1) {
    if (playerX - ballX == 0) {
      getFirst(ball).y -= 2
    }
  }

  if (playerX - ballX == -1) {
    if (playerY - ballY == 0) {
      getFirst(ball).x += 2
    }
  }
  if (playerX - ballX == 1) {
    if (playerY - ballY == 0) {
      getFirst(ball).x -= 2
    }
  }
  
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// move goal
setInterval(() => {
  getFirst(goal).x = getRandomInt(10)
  getFirst(goal).y = getRandomInt(8)
}, 3000)

getFirst(goal).x = getRandomInt(10)
getFirst(goal).y = getRandomInt(8)

afterInput(() => {
  if (tilesWith(goal, ball).length == 1) {
    if (game_is_over == false) {
    setMap(levels[1])
   
    addText(`score: ${counter}`, {
        x: 6,
        y: 9, 
        color: [0, 0, 0]
      })
    counter += 1
    setTimeout(() => {
      clearText()
      setMap(levels[0])
    }, 1500)
  }
}});

function gameOver () {
  game_is_over = true;
  clearText();
  addText("Game over", {
      x: 6,
      y: 7,
      color: [ 0, 0, 0]
    });
  addText(`score: ${counter}`, {
        x: 6,
        y: 9, 
        color: [0, 0, 0]
      })
  counter = 1;
  setMap(levels[2])
}


setTimeout(gameOver, 30000)

  
  