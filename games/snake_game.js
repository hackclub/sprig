/*
@title: snake_game
@author: souvikpal2000
@tags: ['retro']
@addedOn: 2022-09-13
*/

/*
Use Key "w", "s", "a", "d" to start the Game.

Use Key "w" to change the direction of snake Upwards.
Use Key "s" to change the direction of snake Downwards.
Use Key "a" to change the direction of snake Left.
Use Key "d" to change the direction of snake Right.
Use Key "l" to Reset the Game.

Key "l" can only be used after the Message LOST.
*/

const player = "p";
const body = "h";
const background = "s";
const food = "f";
const border = "b";

setLegend(
  [ player, bitmap`
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
  [ body, bitmap`
................
....66666666....
...6666666666...
..666666666666..
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
..666666666666..
...6666666666...
....66666666....
................`],
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
  [ food, bitmap`
..444444........
444444444333....
4444444443333...
..344444333333..
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
..333333333333..
...3333333333...
....33333333....
................`],
  [ border, bitmap`
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
);

setBackground(background);

let level = 0;
const levels = [
  map`
bbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbb
b...............b
b...............b
b............f..b
b...............b
b...............b
b...............b
b...............b
b.......p.......b
b...............b
b...............b
b...............b
b...............b
b...............b
b...............b
b...............b
bbbbbbbbbbbbbbbbb`,
];

setMap(levels[level]);

setPushables({
  [ player ]: [],
});

let reset = null;
let game = null;

const lostMsg = () => {
  addText("LOST", { 
      x: 8, 
      y: 8, 
      color: color`3`
  });
}

const congratulation = () => {
  addText("CONGRATS !!", { 
      x: 5, 
      y: 8, 
      color: color`3`
  });
}

let score = 0;
let snake = [{ xPos: getFirst(player).x, yPos: getFirst(player).y }];
//console.log(getFirst(player).x+" "+getFirst(player).y)
//console.log(getFirst(food).x+" "+getFirst(food).y)

const showScore = () => {
  addText(`${score}`, { 
      x: 4, 
      y: 1, 
      color: color`2`
  });
}
showScore();

const checkFoodPlacement = () => {
  let found = 1;
  while(found === 1){
    getFirst(food).x = Math.floor(Math.random()*15) + 1;
    getFirst(food).y = Math.floor(Math.random()*15) + 3;
    found = 0;
    for(let i=0;i<snake.length;i++){
      if(snake[i].xPos === getFirst(food).x && snake[i].yPos === getFirst(food).y){
        found = 1;
        break;
      }
    }
    if(found === 0){
      break;
    }
  } 
}

const eatFoodMelody = tune`
82.64462809917356: b5~82.64462809917356,
2561.9834710743803`;
const collisionMelody = tune`
84.50704225352112: c4-84.50704225352112,
84.50704225352112: d4-84.50704225352112,
84.50704225352112: e4-84.50704225352112,
84.50704225352112: d4-84.50704225352112,
84.50704225352112: c4-84.50704225352112,
2281.6901408450703`;

let lost = 0;

const collision = () => {
  for(let i=0;i<snake.length;i++){
    if(getFirst(player).x === snake[i].xPos && getFirst(player).y === snake[i].yPos){
      playTune(collisionMelody);
      lost = 1;
      clearInterval(game);
      clearInterval(reset);
      lostMsg();
      break;
    }
  }
}

const eatFood = () => {
  let xPosHead = getFirst(player).x;
  let yPosHead = getFirst(player).y;
  if(xPosHead === getFirst(food).x && yPosHead === getFirst(food).y){
    playTune(eatFoodMelody);
    score++;
    if(score === 150){
      clearInterval(game);
      congratulation();
    }  
    showScore();
    snake.unshift({ xPos: xPosHead, yPos: yPosHead });
    checkFoodPlacement();
  }else{
    collision();
    const tail = snake.pop();
    clearTile(tail.xPos, tail.yPos);
    snake.unshift({ xPos: xPosHead, yPos: yPosHead });
  }
  bodyMovement();
}

let keyPressed = "";

const collisionWithWall = () => {
  playTune(collisionMelody);
  lost = 1;
  clearInterval(game);
  clearInterval(reset);
  lostMsg();
}

const moveForward = () => {
  if(keyPressed === "a"){
    if(getFirst(player).x === 1){
      collisionWithWall();
      return;
    }
    getFirst(player).x -= 1;
    eatFood();
  }
  if(keyPressed === "d"){
    if(getFirst(player).x === 15){
      collisionWithWall();
      return;
    }
    getFirst(player).x += 1;
    eatFood();
  }
  if(keyPressed === "w"){
    if(getFirst(player).y === 3){
      collisionWithWall();
      return;
    }
    getFirst(player).y -= 1;
    eatFood();
  }
  if(keyPressed === "s"){
    if(getFirst(player).y === 17){
      collisionWithWall();
      return;
    }
    getFirst(player).y += 1;
    eatFood();
  }
}

const bodyMovement = () => {
  for(let i=0;i<snake.length;i++){
    let xPos = snake[i].xPos;
    let yPos = snake[i].yPos;
    if(i != 0){
      addSprite(xPos, yPos, body);
    }
  }
}

onInput("a", () => {
  if(keyPressed !== "d"){
    keyPressed = "a";
  }
});

onInput("d", () => {
  if(keyPressed !== "a"){
    keyPressed = "d";
  }
});

onInput("w", () => {
  if(keyPressed !== "s"){
    keyPressed = "w";
  }
});

onInput("s", () => {
  if(keyPressed !== "w"){
    keyPressed = "s";
  }
});
// console.log(keyPressed);

const resetGame = () => {
  keyPressed = "";
  
  snake.map((body) => {
    return clearTile(body.xPos, body.yPos); // Removing Snake Body
  })
  clearTile(getFirst(food).x, getFirst(food).y); // Removing Food
  
  clearText() // Clearing all Text in playing Area
  score = 0; // Resetting Score
  showScore(); // Show Score Text in Screen Again
  
  addSprite(8, 10, player); // Add Snake Head
  snake = [{ xPos: getFirst(player).x, yPos: getFirst(player).y }];
  addSprite(13, 5, food); // Add Food

  reset = setInterval(moveForward, 120);
}

onInput("l", () => {
  if(lost === 1){
    resetGame();
    lost = 0;
  }
})

game = setInterval(moveForward, 120);