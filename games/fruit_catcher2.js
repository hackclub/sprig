/*
@title: Fruit Catcher Deluxe
@author: Prathyush Yeturi
@tags: []
@addedOn: 2022-06-4
@img: ""
*/

var isRunning = true;
var gameTimer = 60;
var score = 0;

// game text
addText(gameTimer + "", { y: 0, color:color`0` });
addText("Score: " + score, { y: 1, color:color`0` });

// define and assign the bitmap art to the sprites in our game
const player = "p";
const apple = "a";
const banana = "b";
const strawberry = "s";

setLegend(
  [player, bitmap`
................
................
................
................
................
................
................
................
................
CCCCCCCCCCCCCCCC
C..............C
CC............CC
.CC..........CC.
.CCC........CCC.
..CCCCCCCCCCCC..
...CCCCCCCCCC...`],
  [apple, bitmap`
................
.....444........
.......4........
.......4........
.....333333.....
...3333333333...
...3333333333...
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
...3333333333...
.....333333.....`],
  [banana, bitmap`
................
.........C......
.........C......
........666.....
........6666....
.......66666....
.......66666....
.......66666....
......66666.....
......66666.....
.....666666.....
....666666......
...6666666......
..666666........
..666...........
................`],
  [strawberry, bitmap`
................
................
................
.......44.......
.......44.......
........4.......
.......333......
......3333......
.....3333333....
.....3333333....
....333333333...
....333333333...
.....3333333....
......33333.....
........3.......
................`],
)

// setting up the map
const gameMap = map`
.......
.......
.......
.......
.......
...p...`
setMap(gameMap);

// input movements for player control using "a" and "d"
onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

// storing all intervals
let gameIntervals = [];

// spawn new fruit every 1100 milliseconds
gameIntervals.push(
  setInterval(() => {
    const fruits = [apple, banana, strawberry];
    const randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
    const randomX = Math.floor(Math.random() * width());
    addSprite(randomX, 0, randomFruit);
  }, 1100)
);

// change position of fruit every 1000 milliseconds (move them down the screen)
gameIntervals.push(
  setInterval(() => {
    const fruits = [apple, banana, strawberry];
    for (const fruitType of fruits) {
      const fruitSprites = getAll(fruitType);
      for (const fruit of fruitSprites) {
        fruit.y += 1;
      }
    }
  
    // check if a fruit is caught in the basket or touches the ground
    const playerSprite = getFirst(player);
    const fruitsInGame = getAll(apple).concat(getAll(banana)).concat(getAll(strawberry));
    for (const fruit of fruitsInGame) {
      if (fruit.x === playerSprite.x && fruit.y === playerSprite.y) {
        fruit.remove();
        score++;
        addText("Score: " + score, { y: 1, color:color`0` });
      } else if (fruit.y === playerSprite.y) {
        fruit.remove();
      }
    }
  }, 1000)
);

// game loop
gameIntervals.push(
  setInterval(() => {
    // Update the game timer
    gameTimer -= 1;
    addText(gameTimer + "", { y: 0, color:color`0` });
    if (gameTimer <= 0) {
      stopGame();
      // Display the final score
      clearText();
      addText("Time's Up!", { y: 1, color:color`0` });
      addText("Final score: " + score, { y: 2, color:color`0` });

      // clear all of the tiles on the map
      for (let y = 0; y < height(); y++) {
        for (let x = 0; x < width(); x++) {
          clearTile(x, y);
        }
      }
    }
  }, 1000)
);

// function to stop the whole game
function stopGame() {
  gameIntervals.forEach(intervalId => clearInterval(intervalId));
  isRunning = false;
}
