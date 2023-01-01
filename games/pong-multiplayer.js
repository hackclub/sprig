/*
@title: pong-multiplayer
@author: sean
*/
// Sprites
const player1 = "1";
const player2 = "2";
const background = "g";
const borderWall = "w";
const ball = "b";
setLegend(
  [ball, bitmap`
.......00.......
......0220......
.....022220.....
....02222220....
...0222222220...
..022222222220..
.02222222222220.
0222222222222220
0222222222222220
.02222222222220.
..022222222220..
...0222222220...
....02222220....
.....022220.....
......0220......
.......00.......`],
  [player1, bitmap`
......2222......
......2002......
......2002......
......2002......
......2002......
......2002......
......2002......
......2002......
......2002......
......2002......
......2002......
......2002......
......2002......
......2002......
......2002......
......2222......`],
  [player2, bitmap`
......2222......
......2332......
......2332......
......2332......
......2332......
......2332......
......2332......
......2332......
......2332......
......2332......
......2332......
......2332......
......2332......
......2332......
......2332......
......2222......`],
  [borderWall, bitmap`
0000000000000000
0000000000000000
0077777777777700
0077777777777700
0077000000007700
0077000000007700
0077007777007700
0077007777007700
0077007777007700
0077007777007700
0077000000007700
0077000000007700
0077777777777700
0077777777777700
0000000000000000
0000000000000000`],
  [background, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
);
setBackground(background);
setSolids([player1, player2, ball]);
setPushables({
  [player1]: [ball, player1],
  [player2]: [ball, player2],
})
// Ball
var ballX = 0;
var ballY = 0;
var deleteBall = false;
setTimeout(() => {
  ballX = Math.random() < 0.5 ? -1 : 1;
  ballY = Math.random() < 0.5 ? -2 : 2;
}, 6000);
// Score
var player1Score = 0;
var player2Score = 0;
function updateScoreText(score1, score2) {
  clearText()
  addText(`${score1} - ${score2}`, {y: 2, color: color`2`})
}
function updateScore(player) {
  switch(player) {
    case 1:
      player1Score = player1Score + 1;
      updateScoreText(player1Score, player2Score)
    case 2:
      player2Score = player2Score + 1;
      updateScoreText(player1Score, player2Score)
  }
}
function computeScore(sprite) {
  if (sprite.y <= (height() / 2)) {
    updateScore(1)
  } else {
    updateScore(2)
  }
}
updateScoreText("player1", "player2")
// Map
var level = 0;
const maps = [
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwgww
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
w1gggggggggggggggggggggbggggggggggggggggggggg2w
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wgggggggggggggggggggggggggggggggggggggggggggggw
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
]
/*function switchMap() {
  deleteBall = true;
  setTimeout(2000)
  level = level + 1;
  setMap(maps[level])
  updateScoreText("player1", "player2")
  addSprite((width() / 2), (height() / 2), ball)
}*/
setMap(maps[level])
/*
  W (up) & S (down) are Player 1
  I (up) & K (down) are Player 2
*/
// Player  1 Controls
onInput("s", () => {
  getFirst(player1).y += 1;
});

onInput("w", () => {
  getFirst(player1).y -= 1;
});
// Player 2 Controls
onInput("i", () => {
  getFirst(player2).y += 1;
});

onInput("k", () => {
  getFirst(player2).y -= 1;
});
// Loops
setInterval(() => {
  try {
  const sprite = getFirst(ball);
  sprite.x += ballX;
  sprite.y += ballY;
  if (deleteBall) {
    sprite.remove()
    deleteBall = false;
  }
  if (sprite.y >= height() - 2) {
    ballY = Math.abs(ballY) * -1;
    computeScore(sprite)
  }
  else if (sprite.y <= 2) {
    ballY = Math.abs(ballY);
    computeScore(sprite)
  }
  if (sprite.x >= width() - 2) {
    ballX = Math.abs(ballX) * -1;
  }
  else if (sprite.x <= 2) {
    ballX = Math.abs(ballX);
  }
  } catch(e) {
    console.log(e)
  }
}, 60)
setInterval(() => {
  if (player1Score >= 10) {
    clearText()
    addText("Player 1 Won", {y: 2, color: color`2`})
    //switchMap()
  }
  if (player2Score >=10) {
    clearText()
    addText("Player 2 Won", {y: 2, color: color`2`})
    //switchMap()
  }
})