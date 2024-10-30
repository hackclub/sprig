/*
use w, s, a, d to control the snake

collect 250 leaves to win this game.

Also if you die you need to restart the whole game.

Whenever you collect an leave you move faster.

author: hcjk

*/
let speed = 250;
const player = "p";
const body = "h";
const background = "s";
const food = "f";
const border = "b";

setLegend(
  [ player, bitmap`
.......44444....
........444.....
.....0004440....
...0022222220...
..022222222220..
..022002200220..
.0220702207020..
.0220002200020..
.02222222222220.
.02222222222000.
.00022222222220.
0022222222222220
0222222282222220
.0022228H822220.
..000008H800000.
.......8H8......`],
  [ body, bitmap`
................
...LLLLLLLLLL...
..LL22222222LL..
.LL2222222222LL.
.L222222222222L.
.L222222222222L.
.L222222222222L.
.L222222222222L.
.L222222222222L.
.L222222222222L.
.L222222222222L.
.L222222222222L.
.LL2222222222LL.
..LL22222222LL..
...LLLLLLLLLL...
................`],
  [ background, bitmap`
1222222222222221
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
1222222222222221`],
  [ food, bitmap`
...DDDDD........
..DD...DD.......
..DD............
..DDDDD.........
..D4444DD.......
..D44444DDD.....
..DDD4DD44DDD...
....D44DD444DDD.
....DD44DD4444D.
.....D444DD444D.
.....D4444DD44D.
.....DD4444444D.
......DDD44444D.
........DDD44DD.
..........DDDD..
................`],
  [ border, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444D444444D4444
4444444444444444
44444444D4444444
4444444444444444
444D444444444444
444444D444444444
444444444444D444
4444444444444444
44444444444D4444
4444444444444444
44D4444444444444
4444444444444444`]
);

setBackground(background);

let level = 0;
const levels = [
  map`
bbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbb
bb..................bb
bb..................bb
bb..................bb
bb..................bb
bb..................bb
bb..................bb
bb....f.........p...bb
bb..................bb
bb..................bb
bb..................bb
bb..................bb
bb..................bb
bb..................bb
bb..................bb
bbbbbbbbbbbbbbbbbbbbbb`,
];

setMap(levels[level]);

setPushables({
  [ player ]: [],
});

let reset = null;
let game = null;

const lostMsg = () => {
  addText("GAME LOST", { 
      x: 6, 
      y: 8, 
      color: color`3`
  });
}

let score = 0;
let snake = [{ xPos: getFirst(player).x, yPos: getFirst(player).y }];


const showScore = () => {
  addText(`Score: ${score}`, { 
      x: 5, 
      y: 1, 
      color: color`2`
  });
}
showScore();



const checkFoodPlacement = () => {
  let found = 1;
  while (found === 1) {
    getFirst(food).x = Math.floor(Math.random() * 17) + 3;
    getFirst(food).y = Math.floor(Math.random() * 13) + 4;
    
    found = 0;
    for (let i = 0; i < snake.length; i++) {
      if (snake[i].xPos === getFirst(food).x && snake[i].yPos === getFirst(food).y) {
        found = 1;
        break;
      }
    }
  }
}


const eatFoodMelody = tune`
150: B5^150,
150: A5^150,
150: B5^150,
4350`;
const collisionMelody = tune`
175.43859649122808: E5-175.43859649122808,
175.43859649122808: D5/175.43859649122808,
175.43859649122808: C5/175.43859649122808,
175.43859649122808: B4/175.43859649122808,
175.43859649122808: A4/175.43859649122808,
175.43859649122808: G4/175.43859649122808,
175.43859649122808: F4/175.43859649122808,
4385.964912280702`;

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

const speedIncrease = 5;
const minSpeed = 50;

const eatFood = () => {
  let xPosHead = getFirst(player).x;
  let yPosHead = getFirst(player).y;
  
  if (xPosHead === getFirst(food).x && yPosHead === getFirst(food).y) {
    playTune(eatFoodMelody);
    score++;

    speed = Math.max(speed - speedIncrease, minSpeed);
    
    clearInterval(game);
    game = setInterval(moveForward, speed); 

    if (score === 150) {
      clearInterval(game);
      congratulation();
    }
    
    showScore();
    snake.unshift({ xPos: xPosHead, yPos: yPosHead });
    checkFoodPlacement();
  } else {
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
    if(getFirst(player).x === 2){
      collisionWithWall();
      return;
    }
    getFirst(player).x -= 1;
    eatFood();
  }
  if(keyPressed === "d"){
    if(getFirst(player).x === 19){
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
    if(getFirst(player).y === 16){
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

const resetGame = () => {
  keyPressed = "";
  
  snake.map((body) => {
    return clearTile(body.xPos, body.yPos);
  })
  clearTile(getFirst(food).x, getFirst(food).y);
  
  clearText() 
  score = 0;
  showScore();
  
  addSprite(8, 10, player);
  snake = [{ xPos: getFirst(player).x, yPos: getFirst(player).y }];
  addSprite(13, 5, food);

  reset = setInterval(moveForward, 120);
}

game = setInterval(moveForward, 120);