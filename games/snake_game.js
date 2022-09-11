/*
@title: snake_game
@author: souvikpal2000
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

const lostMsg = () => {
  addText("LOST", { 
      x: 8, 
      y: 8, 
      color: [ 255, 0, 0 ]
  });
}

let score = 0;
let snake = [{ xPos: getFirst(player).x, yPos: getFirst(player).y }];

const showScore = () => {
  addText(`${score}`, { 
      x: 4, 
      y: 1, 
      color: [ 255, 255, 255 ]
  });
}
showScore();

const foodPlacement = () => {
  getFirst(food).x = Math.floor(Math.random()*15) + 1;
  getFirst(food).y = Math.floor(Math.random()*15) + 3;
}

const collision = () => {
  for(let i=0;i<snake.length;i++){
    if(getFirst(player).x === snake[i].xPos && getFirst(player).y === snake[i].yPos){
      clearInterval(game);
      lostMsg();
      break;
    }
  }
}

const eatFood = () => {
  let xPosHead = getFirst(player).x;
  let yPosHead = getFirst(player).y;
  
  if(xPosHead === getFirst(food).x && yPosHead === getFirst(food).y){
    score++;
    foodPlacement();
    showScore();
  }else{
    collision();
    const tail = snake.pop(); 
    for(let i=0;i<snake.length;i++){
      if(snake[i].xPos === getFirst(food).x && snake[i].yPos === getFirst(food).y){
        foodPlacement();
      }
    }
    clearTile(tail.xPos, tail.yPos);
  }
  snake.unshift({ xPos: xPosHead, yPos: yPosHead });
  bodyMovement();
}

let keyPressed = "";

const moveForward = () => {
  if(keyPressed === "a"){
    if(getFirst(player).x === 1){
        clearInterval(game);
        lostMsg();
        return;
    }
    getFirst(player).x -= 1;
    eatFood();
  }
  if(keyPressed === "d"){
    if(getFirst(player).x === 15){
      clearInterval(game);
      lostMsg();
      return;
    }
    getFirst(player).x += 1;
    eatFood();
  }
  if(keyPressed === "w"){
    if(getFirst(player).y === 3){
      clearInterval(game);
      lostMsg();
      return;
    }
    getFirst(player).y -= 1;
    eatFood();
  }
  if(keyPressed === "s"){
    if(getFirst(player).y === 17){
      clearInterval(game);
      lostMsg();
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

let game = setInterval(moveForward, 130);