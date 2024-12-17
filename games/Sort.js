/*
@title: Sort
@author: Mohan
@tags: []
@addedOn: 2022-12-26
*/

const right = 'r';
const wrong = 'w';
let clicked = false;
let lives = 3;
let timer = 60;
let gameRunning = true;

setLegend(
  [right, bitmap`
................
.....00000......
.....00000......
.....0..20......
.....00000......
.......0........
....0000000.....
....0.000.0.....
....0.000.0.....
....0.000.0.....
....0.000.0.....
......0.0.......
......0.0.......
......0.0.......
......0.0.......
......0.0.......`],
  [wrong, bitmap`
................
.....00000......
.....02020......
.....00000......
.....00000......
.......0........
....0000000.....
...00.000.00....
..00..000..00...
.00..00000..00..
.00.0000000.00..
......0.0.......
......0.0.......
......0.0.......
......0.0.......
.....00.00......`],
);

setMap(map`
........
.r....w.
........
........
........
...${getNew()}....
........
........`);

 let score = 0
onInput("a", () => {
if(gameRunning)
  {
  if(whichSprite(getAll(right), getAll(wrong)) == 'r')
     score++;
   else
     lives--;
  clicked = true;
  }
});

onInput('i', () => {
  runLoop();
  gameRunning = true;
  lives = 3;
  score = 0;
  timer = 60;
  clearText();
});

onInput("d", () => {
if(gameRunning)
  {
  if(whichSprite(getAll(right), getAll(wrong)) == 'w')
     score++;
  else
    lives--;
  clicked = true;
  }
});

function getNew() {
  const random = Math.floor(Math.random() * 2);
  if(random == 0) {
    return 'r';
  } else {
    return 'w';
  }
}

function runLoop() {
  var gameLoop = setInterval(() => {
  
  if (lives == 0) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
  }
  
  let rights = getAll(right);
  // console.log(rights);
  
  let wrongs = getAll(wrong);
  // console.log(wrongs);
  
  if(clicked == true){
    if(rights[1] != undefined){
      for (let i = 1; i < rights.length ; i++) {
         rights[i].remove();
         // console.log(rights);
       }
      clicked = false;
  }
    else if (wrongs[1] != undefined) {
      for (let i = 1; i < wrongs.length ; i++) {
         wrongs[i].remove();
         // console.log(wrongs);
       }
      clicked = false;
    }
  }
  addText("Score : " + score, {
    y : 15
  });

  addText("Lives : " + lives);

  if(rights.length == 1 && wrongs.length == 1)
  {
    addSprite(3, 5, getNew() == 'r' ? right : wrong);
  }
    
  }, 1);
}

var gameLoop = setInterval(() => {
  timer--;
  addText("Time left : " + timer, {
    y : 5
  });
  if (timer == 0) {
    clearInterval(gameLoop);
    gameRunning = false;
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
  }  
}, 1000);

function whichSprite(right, wrong)
  { 
      if(right.length == 2 && wrong.length == 1)
        {
          return 'r';
        }
      else
        {
          return 'w';
        }
  }

runLoop();