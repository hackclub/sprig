/*
@title: Goaled
@author: Ronan Verma
@tags: []
@addedOn: 2022-09-24

In this game, you are the purple player, the ball is the gray circle, and the goal 
is the yellow rectangle. Your goal is to push the ball into the goal, the goal will
randomly teleport every 3 seconds.

Instructions:
WASD to move, "l" while touching the ball to mave it 2 tiles in your direction, "k"
to restart your position, for example, if your ball is stuck at the egde, you can 
press "k" to teleport back to the starting position, every time you teleport, your 
score willhave 1 taken away from it. You have 30 seconds to get as many goals as
possible.


*/

const action3 = "e";
const background = "a";
const action1 = "c";
const action2 = "d";
const background1 = "f";
const player = "p";
const ball = "b";
const goal = "g";
let counter = 1;
let game_is_over = false;
const space_clearer =  "h";

setLegend(
  [ player, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000044444400000
0000040440400000
0000844444480000
0008828448288000
0008828888288000
0008828888288000
0008828888288000
0008222882228000
0008828888288000
0008888888888000
0004400LL0044000
0004010LL0104000
00000L0LL0L00000`],
  [ ball, bitmap`
0000000000000000
0000000000000000
0000000LLL000000
00000LL000LL0000
0000L0011100L000
000L011101110L00
000L011010110L00
00L01101010110L0
00L01010101010L0
00L01101010110L0
000L011010110L00
000L011101110L00
0000L0011100L000
00000LL000LL0000
0000000LLL000000
0000000000000000`],
  [ goal, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0666666666666660
0676767676767660
0667676767676760
0676767676767660
0667676767676760
0676767676767660
0667676767676760
0666666666666660
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ space_clearer, bitmap`
0000000000000000
0000000000000000
0000066666000000
0066666666666000
0060066666006000
0060066666006000
0066666666666000
0000066666000000
0000006660000000
0000006660000000
0000000600000000
0000000600000000
0000006660000000
0000066666000000
0000000000000000
0000000000000000`],
  [ background1, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000020000000000
0000000000000000
0000000000000000
0000000000000200
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ background, bitmap`
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
0000000000000000
` ],
  [ action1, bitmap`
0002020000000000
0000202000000000
0000020200000000
0000002020000000
0000000202000020
2000000022200000
0200000002000000
2020000000000000
0202000000000000
0020200000000000
0002020000000000
0000222000000000
0000020000000200
0000000000000000
0000000000000000
0000000000000000`],
  [ action2, bitmap`
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
0200000000000000
2020000000000000
0202000000000000
0020200000000000`],
  [ action3, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000020
0000000000000202
0000000000000020
0000000000000002
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
);

setSolids([player, ball]);

setBackground(background)

let level = 0;
const levels = [
  map`
aaaaaaaaaa
aadaaafaaa
aecaaaaaga
afafaaaaaa
aapabaaaaa
aaaaaaaaaa
afaaaaaafa
aaaaaaaaaa`, // game
  map`
aadaaaaaaf
aecapbaaaf
faaaaaaaaa
aaaaaaaaaa
aaaaaaaafa
aaafaadaaa
faaaaecaaa
aaaaaaaaaa`, // score
  map`
aaaaaaaaaa
aaaapbafad
aaaaaaaaec
aafaaaaaaa
aaaaaaaaaa
aaaaaaaafa
afaahhaaaa
aaaaaaaaaa`, // end
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
    getFirst(goal).x = getRandomInt(10)
    getFirst(goal).y = getRandomInt(8)
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
  try {
    getFirst(goal).x = getRandomInt(10)
    getFirst(goal).y = getRandomInt(8)
  } catch (error) {}
}, 3000)

getFirst(goal).x = getRandomInt(10)
getFirst(goal).y = getRandomInt(8)

afterInput(() => {
  if (tilesWith(goal, ball).length == 1) {
    if (game_is_over == false) {
    setMap(levels[1])
   
    addText(`score: ${counter}`, {
        x: 6,
        y: 8, 
        color: color`3`
      })
    counter += 1
    setTimeout(() => {
      clearText()
      setMap(levels[0])
      getFirst(goal).x = getRandomInt(10)
      getFirst(goal).y = getRandomInt(8)
    }, 1500)
  }
}});

function gameOver () {
  game_is_over = true;
  clearText();
  addText("Game over", {
      x: 6,
      y: 7,
      color: color`2`
    });
  addText(`score: ${counter}`, {
        x: 6,
        y: 9, 
        color: color`7`
      })
  counter = 1;
  setMap(levels[2])
}


setTimeout(gameOver, 30000)

  
  
