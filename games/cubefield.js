/*
@title: cubefield
@author: jai
@tags: ['endless']
@addedOn: 2023-01-10
*/

// A + D to move. Dodge the cubes :)

const player = "p";

setLegend(
  [ player, bitmap`
.......00.......
.......00.......
......0110......
......0110......
.....011110.....
.....011110.....
....01111110....
....01111110....
...0111111110...
...0111111110...
..011110011110..
..01100..00110..
.0110......0110.
.010........010.
000..........000
0..............0`],
  [ '0', bitmap`
0000000000000000
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0000000000000000`],
  [ '1', bitmap`
0000000000000000
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0000000000000000`],
  [ '2', bitmap`
0000000000000000
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0000000000000000`],
  [ '3', bitmap`
0000000000000000
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0888888888888880
0000000000000000`],
  [ '4', bitmap`
0000000000000000
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0000000000000000`],
  [ '5', bitmap`
0000000000000000
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0000000000000000`],
  [ '6', bitmap`
0000000000000000
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0000000000000000`],
  [ '7', bitmap`
0000000000000000
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0FFFFFFFFFFFFFF0
0000000000000000`],
  [ '8', bitmap`
0000000000000000
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0000000000000000`],
  [ '9', bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0000000000000000`],
);

const level = map`
..................
..................
..................
..................
..................
..................
..................
..................
........p.........
..................`
setMap(level);

let score = 0;
let highScore = 0;
let gameOver = false;
let scoreInterval = setInterval(incrementScore, 200);
setTimeout(tick, 400);

onInput("a", () => {
  if (gameOver) return;

  getFirst(player).x -= 1
});

onInput("d", () => {
  if (gameOver) return;
  
  getFirst(player).x += 1
});

onInput("i", () => {
  if (gameOver) {
    scoreInterval = setInterval(incrementScore, 200);
    setTimeout(tick, 400);
    gameOver = false;
    setMap(level);
    clearText();
  }
});

function incrementScore() {
    clearText();
    score += 10;
    addText(`${score}`, { 
      y: 4,
      color: color`7`
    });
}

function tick() {
  if (gameOver) {
    return;
  }

  // console.log(getAll());
  
  for (let currentEnemy of getAll()) {
    if (isNaN(currentEnemy._type)) continue;
    
    // console.log(currentEnemy);
    
    if ((currentEnemy.y + 1) === height()) {
      clearTile(currentEnemy.x, currentEnemy.y);
    }
    
    currentEnemy.y += 1;

    const currentPlayer = getFirst(player);
    
    if (currentEnemy.y === currentPlayer.y && currentEnemy.x === currentPlayer.x) {
      if (score > highScore) {
        highScore = score;
      }

      clearInterval(scoreInterval);
      clearText();
      setMap(map`
...............
...............
...............
...............
...............
...............
...............
...............
...............`);
      
      addText("game over!", { 
        y: 4,
        color: color`5`
      });
      addText("press i to restart!", { 
        y: 6,
        color: color`4`
      });
      addText(`score: ${score}`, { 
        y: 7,
        color: color`7`
      });
      addText(`highscore: ${highScore}`, { 
        y: 8,
        color: color`7`
      });

      gameOver = true;
      score = 0;
      return;
    }
  }

  const level = Math.floor(score / 250);

  const cubes = Math.floor((level / 3) + 2);
  
  for (let i = 0; i < (cubes > 5 ? 5 : cubes); i++) {
    addSprite(Math.floor(Math.random() * width()), 0, level > 9 ? 9 : level); 
  }

  let factor = level * 20;

  setTimeout(tick, 300 - (factor > 100 ? 100 : factor));
}