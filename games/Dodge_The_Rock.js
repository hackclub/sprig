/*
@title: Dodge_The_Rock
@author: dutamot
@tags: []
@addedOn: 2023-03-09
*/

const player = "p"
const wall = "w"
const background = "n"
const background2 = "b"

setLegend(
  [player, bitmap`
................
................
......00000.....
......00000.....
......0.0.0.....
......0...0.....
.......000......
......00000.....
.....0000000....
.....0000000....
....00.000.00...
....00.000.00...
.......000......
......00.00.....
......0...0.....
.....00...00....`],
  [wall, bitmap`
................
................
................
......00000.....
.....00...0.....
.....00...000...
....00000..00...
....0..000000...
....0.0...000...
....00000.000...
....0....0000...
....000.00000...
.....0000000....
......00000.....
................
................`],
  [background, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [background2, bitmap`
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
)

setMap(map`
........
.p......
........
........`)
setBackground(background);

var speed = 100;
var isGameOver = false;
var r = 0;
var score = 0;

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

function genWall() {
  r = Math.floor(Math.random() * 4);
  addSprite(7, r, wall);
}

function gameLoop() {
  
  getAll(wall).forEach((w) => {
    if (w.x == 0) {
      w.remove();
      score++;
    } else {
      w.x -= 1;
    };
  });

  if (getAll(wall).length == 0) {
    genWall();
  }
  addText(`Score: ${score}`, {x: 9, y: 14,color: color`0`})
  
  const targetNumber = tilesWith(wall).length;
  const numberCovered = tilesWith(wall, player).length;
  if (numberCovered === targetNumber) {
    lost();
  } 
  if(score<10){
    speed -= (100-speed);
    if (!isGameOver) {
    setTimeout(gameLoop, speed);
  }
  }
    else if(score<20){
    speed = 85
    speed -= (85-speed);
    if (!isGameOver) {
    setTimeout(gameLoop, speed);
    }
    addText("medium", {x: 7, y: 1, color: color`3`})
  }
    else if(score<30){
    speed = 75
    speed -= (75-speed);
    if (!isGameOver) {
    setTimeout(gameLoop, speed);
    }
    addText("hard  ", {x: 7, y: 1, color: color`3`})
  }
  else{
    speed = 60
    speed -= (60-speed);
    if (!isGameOver) {
    setTimeout(gameLoop, speed);
    }
    addText("extreme", {x: 7, y: 1, color: color`3`})
  }
}
function lost() {
  isGameOver = true;
  // console.log("You lost");
  setMap(map`
........
........
........
........
........
........
........
........`);
  clearText();
  addText("Game over!", {x: 5, y: 7, color: color`0`})
  addText(`Score: ${score}`, {x: 5, y: 9, color: color`0`})
}
gameLoop()
