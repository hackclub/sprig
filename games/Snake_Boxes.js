/*
@title: Snake_Boxes
@author: Aryavrat Mishra
@tags: ['retro']
@addedOn: 2024-01-30
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

Goal: push the box adjacent to the goal to score points, push the goal if necessary, press l if you lose

*/

const body = "b"
const head = "h"
const green1 = "g"
const green2 = "G"
const black = "B"
const trophy = "T"
const box = "q"
const goal = "r"
setLegend(
  [ box, bitmap`
0000000000000000
00CCCCCCCCCCCC00
0C0CCCCCCCCCC0C0
0CC0000000000CC0
0CC00CCCCCC00CC0
0CC0C0CCCC0C0CC0
0CC0CC0CC0CC0CC0
0CC0CCC00CCC0CC0
0CC0CCC00CCC0CC0
0CC0CC0CC0CC0CC0
0CC0C0CCCC0C0CC0
0CC00CCCCCC00CC0
0CC0000000000CC0
0C0CCCCCCCCCC0C0
00CCCCCCCCCCCC00
0000000000000000`],
  [ goal, bitmap`
3..............3
33............33
.33..........33.
..33........33..
...33......33...
....33....33....
.....33..33.....
......3333......
.......33.......
......3333......
.....33..33.....
....33....33....
...33......33...
..33........33..
.33..........33.
33............33`],
  [ body, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ],
  [ head, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777077777707777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777770777
7770777777700777
7777077777007777
7777707770077777
7777770007777777
7777777777777777
7777777777777777`],
  [ green1, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ green2, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ black, bitmap`
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
0000000000000000`],
  [ trophy, bitmap`
0000000000000000
0000066666600000
0066666666666600
0060066666600600
0060066666600600
0060066666600600
0060066666600600
0060066666600600
0066666666666600
0000066666600000
0000000660000000
0000000660000000
0000000660000000
0000000660000000
0000066666600000
0000066666600000`]
)

setSolids([head,body,box,goal])

const levels = [
  map`
BBBTBBBBBB
GgGgGgGgGg
gGgGgGgGgG
GgGgGgGgGg
gGgGgGgGgG
GgGgGgGgGg
gGgGgGgGgG
GgGgGgGgGg
gGgGgGgGgG
GgGgGgGgGg`
]

// setMap(levels[0])
// addSprite(0, 0, box)
setMap(levels[0])
  addSprite(5, 3, head)
  // addSprite(8, 5, box)
setPushables({
  [head]:[box,goal]
})

let reset = null;
let game = null;
let highscore = 0;
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
const setHighScore = () => {
  if (score > highscore){
    highscore = score;
  }
  addText(highscore.toString(), { 
      x: 9, 
      y: 0, 
      color: color`3`
  });
}
let score = 0;
let snake = [{ xPos: getFirst(head).x, yPos: getFirst(head).y },{ xPos: 2, yPos: 5 },{ xPos: 1, yPos: 5 }];

const showScore = () => {
  addText(`${score}`, { 
      x: 4, 
      y: 0, 
      color: color`2`
  });
  setHighScore();
}
showScore();
setHighScore();
function arePointsAdjacent(pointA, pointB) {
    const offsets = [
        { dx: 0, dy: -1 },  // Top
        { dx: -1, dy: 0 },  // Left
        { dx: 1, dy: 0 },   // Right
        { dx: 0, dy: 1 }    // Bottom
    ];
    for (const offset of offsets) {
        if (pointA.x + offset.dx === pointB.x && pointA.y + offset.dy === pointB.y) {
            return true;
        }
    }

    return false;
}
const checkboxPlacement = () => {
  let found = 1;
  while(found === 1){
    getFirst(box).x = Math.floor(Math.random()*9);
    getFirst(box).y = Math.floor(Math.random()*8) + 1;
    found = 0;
    for(let i=0;i<snake.length;i++){
      if(snake[i].xPos === getFirst(box).x && snake[i].yPos === getFirst(box).y){
        found = 1;
        break;
      }
    }
    if(found === 0){
      break;
    }
  } 
}

const eatboxMelody = tune`
82.64462809917356: B5~82.64462809917356,
2561.9834710743803`;
const collisionMelody = tune`
84.50704225352112: C4-84.50704225352112,
84.50704225352112: D4-84.50704225352112,
84.50704225352112: E4-84.50704225352112,
84.50704225352112: D4-84.50704225352112,
84.50704225352112: C4-84.50704225352112,
2281.6901408450703`;

let lost = 0;

const collision = () => {
  for(let i=0;i<snake.length;i++){
    if(getFirst(head).x === snake[i].xPos && getFirst(head).y === snake[i].yPos){
      playTune(collisionMelody);
      lost = 1;
      clearInterval(game);
      clearInterval(reset);
      lostMsg();
      break;
    }
  }
}

const eatbox = () => {
  let xPosHead = getFirst(head).x;
  let yPosHead = getFirst(head).y;
  let xGoal = getFirst(goal).x;
  let yGoal = getFirst(goal).y;
  const pointA = getFirst(box);
  const pointB = { x: xGoal, y: yGoal };
  if(arePointsAdjacent(pointA, pointB)){
    score++;
    if(score === 150){
      clearInterval(game);
      congratulation();
    }  
    showScore();
    snake.unshift({ xPos: xPosHead, yPos: yPosHead });
    checkboxPlacement();
  }else{
    collision();
    const tail = snake.pop();
    clearTile(tail.xPos, tail.yPos);
    if((tail.xPos%2==0 && tail.yPos%2==1)||(tail.xPos%2==1 && tail.yPos%2==0)){
        addSprite(tail.xPos, tail.yPos, green2);
    }
    else{
      addSprite(tail.xPos, tail.yPos, green1);
    }
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
    if(getFirst(head).x === 0){
      collisionWithWall();
      return;
    }
    getFirst(head).x -= 1;
    eatbox();
  }
  if(keyPressed === "d"){
    if(getFirst(head).x === 11){
      collisionWithWall();
      return;
    }
    getFirst(head).x += 1;
    eatbox();
  }
  if(keyPressed === "w"){
    if(getFirst(head).y === 1){
      collisionWithWall();
      return;
    }
    getFirst(head).y -= 1;
    eatbox();
  }
  if(keyPressed === "s"){
    if(getFirst(head).y === 10){
      collisionWithWall();
      return;
    }
    getFirst(head).y += 1;
    eatbox();
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
  setMap(levels[0])

  snake.map((body) => {
        clearTile(body.xPos, body.yPos);
    if((body.xPos%2==0 && body.yPos%2==1)||(body.xPos%2==1 && body.yPos%2==0)){
        addSprite(body.xPos, body.yPos, green2);
    }
    else{
      addSprite(body.xPos, body.yPos, green1);
    }
    return true // Removing Snake Body
  })
  try{
  clearTile(getFirst(box).x, getFirst(box).y); // Removing box
  if((getFirst(box).x%2==0 && getFirst(box).y%2==1)||(getFirst(box).x%2==1 && getFirst(box).y%2==0)){
        addSprite(tail.xPos, tail.yPos, green2);
    }
    else{
      addSprite(tail.xPos, tail.yPos, green1);
    }
  }catch(error){
    // console.log(error)
  }
  clearText() // Clearing all Text in playing Area
  score = 0; // Resetting Score
  showScore(); // Show Score Text in Screen Again
  setHighScore();
    setMap(levels[0])
  addSprite(2, 5, head); // Add Snake Head
  snake = [{ xPos: getFirst(head).x, yPos: getFirst(head).y },{ xPos: 1, yPos: 5 },{ xPos: 0, yPos: 5 }];
  addSprite(6, 5, box); // Add box
  addSprite(8, 5, goal);
  addSprite(0, 0, box)
  bodyMovement();
  reset = setInterval(moveForward, 120);
}

onInput("l", () => {
  if(lost === 1){
    resetGame();
    lost = 0;
  }
})
resetGame();
// game = setInterval(moveForward, 120);
