/*
@title: pong-multiplayer
@author: sean
@tags: ['multiplayer']
@addedOn: 2023-01-01
*/
// Sprites
const player1 = "1";
const player2 = "2";
const background = "g";
const yBorderWall = "y";
const cornerWall = "c";
const ball = "b";
const split = "s";
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
  [yBorderWall, bitmap`
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
  [cornerWall, bitmap`
0000000000000000
0000000000000000
0033333333333300
0033333333333300
0033000000003300
0033000000003300
0033003333003300
0033003333003300
0033003333003300
0033003333003300
0033000000003300
0033000000003300
0033333333333300
0033333333333300
0000000000000000
0000000000000000`],
  [split, bitmap`
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......`],
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
// Map
var level = 0;
const maps = [
  map`
ycggggggggggggggggggggggsgggggggggggggggggggcy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
y1gggggggggggggggggggggbsggggggggggggggggggg2y
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ygggggggggggggggggggggggsggggggggggggggggggggy
ycggggggggggggggggggggggsgggggggggggggggggggcy`,
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
  }
  if (sprite.y >= height() - 2) {
    ballY = Math.abs(ballY) * -1;
  }
  else if (sprite.y <= 2) {
    ballY = Math.abs(ballY);
  }
  if (sprite.x >= width() - 1) {
    ballX = Math.abs(ballX) * -1;
  }
  else if (sprite.x <= 1) {
    ballX = Math.abs(ballX);
  }
  } catch(e) {
    // console.log(e)
  }
}, 60)
// Scoring
var player1Score = 0;
var player2Score = 0;
const cornerCoords = []
getAll(cornerWall).forEach((val) => {
  cornerCoords.push({x: val.x, y: val.y})
})
function updateScore(sc1, sc2) {
  clearText()
  addText(`${sc1} - ${sc2}`)
}
function checkForCorners(sprite) {
  cornerCoords.forEach((val) => {
    if (val.x == sprite.x && val.y == sprite.y) {
      return true
    } else {
      return false
    }
  })
}
setInterval(() => {
  const ballSprite = getFirst(ball);
  const halfMap = width() / 2;
  if (deleteBall == false) {
  if (ballSprite.x == 2 || ballSprite.x == 45) {
    if (ballSprite.x <= halfMap) {
      player1Score = player1Score + 1;
      if (checkForCorners(ballSprite)) {
        player1Score = player1Score - 1;
      }
      updateScore(player1Score, player2Score)
    } else {
      player2Score = player2Score + 1;
      if (checkForCorners(ballSprite)) {
        player2Score = player2Score - 1;
      }
      updateScore(player1Score, player2Score)
    }
  }
  }
}, 60)
setInterval(() => {
  if (player1Score >= 10) {
    clearText()
    addText("Player 1 Won", {y: 2, color: color`2`})
    //switchMap()
    deleteBall = true;
  }
  if (player2Score >=10) {
    clearText()
    addText("Player 2 Won", {y: 2, color: color`2`})
    //switchMap()
    deleteBall = true;
  }
})
addText(`${height()}`)