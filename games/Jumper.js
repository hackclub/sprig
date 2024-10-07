/*
@title: Jumper
@author: TC
@tags: ['endless']
@addedOn: 2022-11-13
*/

const player = "p";
const wall = "w";
const obstacle = "o";
const selection = "s";
const backgroundBlue = "b";
const backgroundBlack = "n";
const backgroundWhite = "m";

let score;
let lives;
let screen;
let selector;
let timer1;
let timer2;
let debounced;
let highscores = [0, 0, 0];
let jumping;
let jump1;
let jump2;
let jump3;
let jump4;
let jump5;
let frame = 0;

changeSprite();

setInterval(function(){changeSprite();}, 50);

const mainScreen = map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`;
const instructionScreen = map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`;
const highscoreScreen = map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`;
const gameScreen = map`
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
w..................w
w..................w
w..................w
wwwwwwwwwwwwwwwwwwww
w..................w
w..................w
w..................w
wwwwwwwwwwwwwwwwwwww
w..................w
w..................w
wp.................w
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww`;
const loseScreen = map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`;

reset();
setMap(mainScreen);
mainText();

setSolids([ player, wall]);
// START - PLAYER MOVEMENT CONTROLS

onInput("w", () => {
  switch(screen){
    case "main":
      switch(selector){
        case "start":
          break;
        case "instruction":
          selector = "start";
          updateSelection();
          break;
        case "highscores":
          selector = "instruction";
          updateSelection();
          break;
      }
      break;
    case "instruction":
      break;
    case "highscores":
      break;
    case "game":
      if(!jumping){
        getFirst(player).y -= 4;
      }
      break;
    case "lose":
      break;
  }
});

onInput("a", () => {
  switch(screen){
    case "main":
      switch(selector){
        case "start":
          reset();
          screen = "game";
          setMap(gameScreen);
          gameText();
          timer1 = setInterval(spawnObstacle, 1000);
          timer2 = setInterval(runGame, 100);
          break;
        case "instruction":
          screen = "instruction";
          setMap(instructionScreen);
          instructionText();
          debounced = false;
          break;
        case "highscores":
          screen = "highscores";
          setMap(highscoreScreen);
          highscoreText();
          debounced = false;
      }
      break;
    case "instruction":
      break;
    case "highscores":
      break;
    case "game":
      getFirst(player).x -= 1;
      frame = 3;
      setTimeout(function(){frame = 2}, 200);
      break;
    case "lose":
      break;
  }
});

onInput("s", () => {
  switch(screen){
    case "main":
      switch(selector){
        case "start":
          selector = "instruction";
          updateSelection();
          break;
        case "instruction":
          selector = "highscores";
          updateSelection();
          break;
        case "highscores":
          break;
      }
      break;
    case "instruction":
      break;
    case "highscores":
      break;
    case "game":
      if(!jumping){
        getFirst(player).y += 4;
      }
      break;
    case "lose":
      break;
  }
});

onInput("d", () => {
  switch(screen){
    case "main":
      switch(selector){
        case "start":
          reset();
          screen = "game";
          setMap(gameScreen);
          gameText();
          timer1 = setInterval(spawnObstacle, 1000);
          timer2 = setInterval(runGame, 100);
          break;
        case "instruction":
          screen = "instruction";
          setMap(instructionScreen);
          instructionText();
          debounced = false;
          break;
        case "highscores":
          screen = "highscores";
          setMap(highscoreScreen);
          highscoreText();
          debounced = false;
      }
      break;
    case "instruction":
      break;
    case "highscores":
      break;
    case "game":
      getFirst(player).x += 1;
      frame = 1;
      setTimeout(function(){frame = 0}, 200);
      break;
    case "lose":
      break;
  }
});

onInput("i" , () => {
  switch(screen){
    case "main":
      switch(selector){
        case "start":
          reset();
          screen = "game";
          setMap(gameScreen);
          gameText();
          timer1 = setInterval(spawnObstacle, 1000);
          timer2 = setInterval(runGame, 100);
          break;
        case "instruction":
          screen = "instruction";
          setMap(instructionScreen);
          instructionText();
          debounced = false;
          break;
        case "highscores":
          screen = "highscores";
          setMap(highscoreScreen);
          highscoreText();
          debounced = false;
      }
      break;
    case "instruction":
      break;
    case "highscores":
      break;
    case "game":
      if(!jumping){
        jumping = true;
        jump();
      }
      break;
    case "lose":
      break;
  }
});

onInput("j" , () => {
  switch(screen){
    case "main":
      switch(selector){
        case "start":
          reset();
          screen = "game";
          setMap(gameScreen);
          gameText();
          timer1 = setInterval(spawnObstacle, 1000);
          timer2 = setInterval(runGame, 100);
          break;
        case "instruction":
          screen = "instruction";
          setMap(instructionScreen);
          instructionText();
          debounced = false;
          break;
        case "highscores":
          screen = "highscores";
          setMap(highscoreScreen);
          highscoreText();
          debounced = false;
      }
      break;
    case "instruction":
      break;
    case "highscores":
      break;
    case "game":
      if(!jumping){
        jumping = true;
        jump();
      }
      break;
    case "lose":
      break;
  }
});

onInput("k" , () => {
  switch(screen){
    case "main":
      switch(selector){
        case "start":
          reset();
          screen = "game";
          setMap(gameScreen);
          gameText();
          timer1 = setInterval(spawnObstacle, 1000);
          timer2 = setInterval(runGame, 100);
          break;
        case "instruction":
          screen = "instruction";
          setMap(instructionScreen);
          instructionText();
          debounced = false;
          break;
        case "highscores":
          screen = "highscores";
          setMap(highscoreScreen);
          highscoreText();
          debounced = false;
      }
      break;
    case "instruction":
      break;
    case "highscores":
      break;
    case "game":
      if(!jumping){
        jumping = true;
        jump();
      }
      break;
    case "lose":
      break;
  }
});

onInput("l" , () => {
  switch(screen){
    case "main":
      switch(selector){
        case "start":
          reset();
          screen = "game";
          setMap(gameScreen);
          gameText();
          timer1 = setInterval(spawnObstacle, 1000);
          timer2 = setInterval(runGame, 100);
          break;
        case "instruction":
          screen = "instruction";
          setMap(instructionScreen);
          instructionText();
          debounced = false;
          break;
        case "highscores":
          screen = "highscores";
          setMap(highscoreScreen);
          highscoreText();
          debounced = false;
      }
      break;
    case "instruction":
      break;
    case "highscores":
      break;
    case "game":
      if(!jumping){
        jumping = true;
        jump();
      }
      break;
    case "lose":
      break;
  }
});

afterInput(() => {
  switch(screen){
    case "main":
      break;
    case "instruction":
      if(debounced){
        screen = "main";
        setMap(mainScreen);
        mainText();
      }
      debounced = true;
      break;
    case "highscores":
      if(debounced){
        screen = "main";
        setMap(mainScreen);
        mainText();
      }
      debounced = true;
      break;
    case "game":
      changeSprite();
      break;
    case "lose":
      screen = "main";
      setMap(mainScreen);
      mainText();
      break;
  }
})

// END - PLAYER MOVEMENT CONTROLS

function spawnObstacle(){
  let sizeOfObstacle = Math.floor(Math.random() * 3);
  let laneOfObstacle = Math.floor(Math.random() * 3);
  let x = width()-1;
  let y = (laneOfObstacle * 4) + 3;
  if(sizeOfObstacle == 0){
    addSprite(x, y, obstacle);
  }
  if(sizeOfObstacle == 1){
    y += 2;
    addSprite(x, y, obstacle);
  }
  if(sizeOfObstacle == 2){
    addSprite(x, y, obstacle);
    y++;
    addSprite(x, y, obstacle);
    y++;
    addSprite(x, y, obstacle);
  }
}

function runGame(){
  for(let obst of getAll(obstacle)){
    if(obst.x == 0){
      obst.remove();
      score++;
      updateScore();
    }
    if(getTile(obst.x, obst.y).includes(getFirst(player))){
      lives--;
      updateLives();
    }
    obst.x--;
  }
}

function updateScore(){
  addText(`Score:${score.toString()}`, {x: 1,y: 1, color: color`2`});
}

function updateLives(){
  if(lives == 0){
    clearInterval(timer1);
    clearInterval(timer2);
    clearInterval(jump1);
    clearInterval(jump2);
    clearInterval(jump3);
    clearInterval(jump4);
    clearInterval(jump5);
    screen = "lose";
    setMap(loseScreen);
    loseText();
  }else{
    addText(`Lives:${lives.toString()}`, {x: 12,y: 1, color: color`3`});
  }
}

function updateSelection(){
  if(!getFirst(selection)){
    addSprite(1, 5, selection);
  }
  if(selector == "start"){
    getFirst(selection).y = 5;
  }else
  if(selector == "instruction"){
    getFirst(selection).y = 7;
  }else
  if(selector == "highscores"){
    getFirst(selection).y = 9;
  }
}

function reset(){
  score = 0;
  lives = 3;
  screen = "main";
  selector = "start";
  timer1;
  timer2;
  debounced = false;
  jumping = false;
}

function jump(){
  getFirst(player).y -= 1;
  jump1 = setTimeout(function(){getFirst(player).y -= 1}, 100);
  jump2 = setTimeout(function(){getFirst(player).y -= 1}, 200);
  jump3 = setTimeout(function(){getFirst(player).y += 1}, 300);
  jump4 = setTimeout(function(){getFirst(player).y += 1}, 400);
  jump5 = setTimeout(function(){jumping = false}, 600);
}

function changeSprite(){
  let playerBitmap = bitmap`
.....55555......
....555555555...
....CCC66F6.....
...C6C666F666...
...C6CC6666666..
...CC66666666...
.....6666666....
....555555......
...5555555555...
..555555555555..
..665555555566..
..666555555666..
..665555555566..
....555..555....
...LLL....LLL...
..LLLL....LLLL..`;
  switch(frame){
    case 0:
      if(jumping){
        playerBitmap = bitmap`
......55555..666
.....55555555566
.....CCC66F6.555
....C6C666F66655
....C6CC66666665
....CC666666666.
......66666665..
..55555555555...
.555555555555...
6655555555555..L
666..555555555LL
.6.L.555555555LL
..LLL555555555LL
.LLL5555555.....
.L..5555........
................`;
      }else{
        playerBitmap = bitmap`
.....55555......
....555555555...
....CCC66F6.....
...C6C666F666...
...C6CC6666666..
...CC66666666...
.....6666666....
....555555......
...5555555555...
..555555555555..
..665555555566..
..666555555666..
..665555555566..
....555..555....
...LLL....LLL...
..LLLL....LLLL..`;
      }
      break;
    case 1:
      if(jumping){
        playerBitmap =  bitmap`
......55555..666
.....55555555566
.....CCC66F6.555
....C6C666F66655
....C6CC66666665
....CC666666666.
......66666665..
..55555555555...
.555555555555...
6655555555555..L
666..555555555LL
.6.L.555555555LL
..LLL555555555LL
.LLL5555555.....
.L..5555........
................`;
      }else{
        playerBitmap = bitmap`
................
.......55555....
......555555555.
......CCC66F6...
.....C6C666F666.
.....C6CC6666666
.....CC66666666.
.......6666666..
......555555....
.....55555555...
.....55555555...
.....55555555...
.....55566555...
......556655....
.......555LLL...
.......LLLL.....`;
      }
      break;
    case 2:
      if(jumping){
        playerBitmap = bitmap`
666..55555......
66555555555.....
555.6F66CCC.....
55666F666C6C....
56666666CC6C....
.666666666CC....
..56666666......
...55555555555..
...555555555555.
L..5555555555566
LL555555555..666
LL555555555.L.6.
LL555555555LLL..
.....5555555LLL.
........5555..L.
................`;
      }else{
        playerBitmap = bitmap`
......55555.....
...555555555....
.....6F66CCC....
...666F666C6C...
..6666666CC6C...
...66666666CC...
....6666666.....
......555555....
...5555555555...
..555555555555..
..665555555566..
..666555555666..
..665555555566..
....555..555....
...LLL....LLL...
..LLLL....LLLL..`;
      }
      break;
    case 3:
      if(jumping){
        playerBitmap = bitmap`
666..55555......
66555555555.....
555.6F66CCC.....
55666F666C6C....
56666666CC6C....
.666666666CC....
..56666666......
...55555555555..
...555555555555.
L..5555555555566
LL555555555..666
LL555555555.L.6.
LL555555555LLL..
.....5555555LLL.
........5555..L.
................`;
      }else{
        playerBitmap = bitmap`
................
....55555.......
.555555555......
...6F66CCC......
.666F666C6C.....
6666666CC6C.....
.66666666CC.....
..6666666.......
....555555......
...55555555.....
...55555555.....
...55555555.....
...55566555.....
....556655......
...LLL555.......
.....LLLL.......`;
      }
      break;
  }
  setLegend(
    [ player, playerBitmap],
    [ wall, bitmap`
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
    [ obstacle, bitmap`
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
    [ selection, bitmap`
  .....222222.....
  ...2222222222...
  ..222222222222..
  .22222222222222.
  .22222222222222.
  2222222222222222
  2222222222222222
  2222222222222222
  2222222222222222
  2222222222222222
  2222222222222222
  .22222222222222.
  .22222222222222.
  ..222222222222..
  ...2222222222...
  .....222222.....`],
    [ backgroundBlue, bitmap`
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
  7777777777777777`],
    [ backgroundBlack, bitmap`
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
    [ backgroundWhite, bitmap`
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
  2222222222222222`]
  );
}

function mainText(){
  clearText();
  setBackground(backgroundBlue);
  addText(`Start`, {x: 3, y: 5, color: color`2`});
  addText(`Instructions`, {x: 3, y: 7, color: color`2`});
  addText(`Highscores`, {x: 3, y: 9, color: color`2`});
  updateSelection();
}

function instructionText(){
  clearText();
  setBackground(backgroundBlue);
  addText(`Use the left`, {x: 3, y: 2, color: color`2`});
  addText(`D-Pad to move`, {x: 3, y: 4, color: color`2`});   
  addText(`Use the Right `, {x: 3, y: 7, color: color`2`});
  addText(`D-Pad to jump`, {x: 3, y: 9, color: color`2`});
  addText(`Press any button`, {x: 2, y: 12, color: color`2`});
  addText(`to return to`, {x: 4, y: 13, color: color`2`});
  addText(`the main menu`, {x: 3, y: 14, color: color`2`}); 
}

function highscoreText(){
  clearText();
  setBackground(backgroundBlue);
  addText(`1: ${highscores[0]}`, {x: 1, y: 1, color: color`2`});
  addText(`2: ${highscores[1]}`, {x: 1, y: 3, color: color`2`});
  addText(`3: ${highscores[2]}`, {x: 1, y: 5, color: color`2`});
  addText(`Press any button`, {x: 2, y: 12, color: color`2`});
  addText(`to return to`, {x: 4, y: 13, color: color`2`});
  addText(`the main menu`, {x: 3, y: 14, color: color`2`}); 
}

function gameText(){
  clearText();
  setBackground(backgroundWhite);
  updateScore();
  updateLives();
}

function loseText(){
  clearText();
  setBackground(backgroundBlack);
  addText(`Game Over`, {x: 5, y: 7, color: color`3`});
  addText(`Score:${score.toString()}`, {x: 6,y: 9, color: color`2`});
  highscores.push(score);
  highscores.sort(function(a, b){return b-a});
  if(highscores[0] == score){
    addText(`New Highscore!`, {x: 3,y: 11, color: color`2`});
  }
}