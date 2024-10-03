/*
@title: BRICK DODGER
@author: Logan Fick
@tags: ['endless']
@addedOn: 2022-11-06
Instructions:
  Move left or right using A/D keys,
  dodge the bricks coming down,
  feel free to edit the game :) 
*/
const brickBreak = "f", dead = "d", plr = "p", plr2="l",brick = "i", bg = "b",bg2="m";
const breakMusic=tune`
36.809815950920246: a4/36.809815950920246 + g4/36.809815950920246,
36.809815950920246: a4/36.809815950920246 + g4/36.809815950920246,
36.809815950920246: a4/36.809815950920246 + g4/36.809815950920246 + f4/36.809815950920246,
36.809815950920246: g4/36.809815950920246 + a4/36.809815950920246 + f4/36.809815950920246,
36.809815950920246: g4/36.809815950920246 + f4/36.809815950920246,
36.809815950920246: g4/36.809815950920246 + f4/36.809815950920246,
36.809815950920246: g4/36.809815950920246 + f4/36.809815950920246,
36.809815950920246: g4/36.809815950920246 + f4/36.809815950920246,
883.435582822086`, endMusic=tune`
500: f4^500,
500: e4^500,
500: d4^500,
500: c4^500,
14000`, dodge=tune`
60.851926977687626,
60.851926977687626: e4^60.851926977687626 + f4^60.851926977687626,
60.851926977687626: f4^60.851926977687626 + g4^60.851926977687626,
1764.7058823529412`; 
let score, isGameOver, delay, plrX, anim, maxY,playerSprite,brickSprite,isPlaying;

setLegend(
  [plr, bitmap`
................
................
................
................
................
.....777777.....
....77777777....
...7727777277...
...7707777077...
...7777777777...
...7777777777...
....77700077....
.....777777.....
......7..7......
......7..7......
.....77..77.....`],
  [plr2, bitmap`
................
................
................
.....777777.....
....77777777....
...7727777277...
...7707777077...
...7777777777...
...7777777777...
....77000077....
.....777777.....
......7..7......
......7..7......
......7..7......
......7..7......
.....77..77.....`],
  [dead, bitmap`
................
................
................
................
................
.....00000......
....0CCCCCC0....
....07CCCCCCC...
....7777777CC0..
...707077070CC..
..0770777707CC..
..C7070770707...
.0C7777777777...
.CC.77700077..00
0C7..707770..7CC
CC77777..77777CC`],
  [brick, bitmap`
................
................
................
................
................
................
................
................
......0000......
......0CC0......
......0CC0......
......0CC0......
......0CC0......
......0CC0......
......0CC0......
......0000......`],
  [brickBreak, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
........000.....
......00CCC0....
.00.00CCCCC0.00.
0CC0CCCCCCCC0CC0`],
  [bg, bitmap`
2222222222222222
1111121111111211
1111121111111211
1111121111111211
2222222222222222
1211111112111111
1211111112111111
1211111112111111
2222222222222222
1111121111111211
1111121111111211
1111121111111211
2222222222222222
1211111112111111
1211111112111111
1211111112111111`],
  [bg2,bitmap`
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
const level = [
  map`
....
....
....
....`,
  map`
.......
.......
.......
.......
.......
...d...`
];
function reset(){
  score = 1, isGameOver = false, delay = 150, plrX = 2, anim = false, maxY = 3, isPlaying = false;
  clearText();
  setMap(level[0]);
  setBackground(bg);
  addSprite(0,0,brick);
  addSprite(plrX,maxY,plr);
  playerSprite = getFirst(plr);
  brickSprite = getFirst(brick);
}

onInput("a", () => {
  if (plrX != 0 && isGameOver == false){
    plrX -= 1;
    const dodgePlayback = playTune(dodge)
  }
});
onInput("d", () => {
  if (plrX != 3 && isGameOver == false){
    plrX += 1;
    const dodgePlayback = playTune(dodge)
  }
});
onInput("k", () => {
  if (isGameOver == true){
    isGameOver = false; 
    reset(); 
    loop();
  }
});

function loop(){
  if (isGameOver==false){
    playerSprite.x = plrX;
    playerSprite.y = maxY;
    brickSprite = getFirst(brick);
      
    if (brickSprite.y == height()-1){
      if(Math.floor(Math.random() * 3) == 2){
        addSprite(Math.floor(Math.random() * width()),0,brick);
      }else{
        addSprite(plrX,0,brick);
      }
      score++;
      if (delay > 40){
        delay - 1
      }
      addSprite(brickSprite.x,brickSprite.y,brickBreak);
      brickSprite.remove()
      //const brickBreakPlayback = playTune(breakMusic)
    }else{
      brickSprite.y += 1
      if (brickSprite.y == height()-2 && score > 1){
        getFirst(brickBreak).remove()
      }
    }
    if (!isGameOver) {
      setTimeout(loop, delay);
    }
    if(plrX == brickSprite.x){
      if(brickSprite.y == maxY){
        gameOver();
      }
    }
  }
}
function gameOver(){
  //bgMusic.end()
  playerSprite.remove()
  setBackground(bg2);
  const endPlayBack = playTune(endMusic);
  isGameOver = true; 
  setMap(level[1]);
  addText(`BRICK DODGER`, { x: 2, y: 2, color: color`0` });
  addText(`Score:${score}`, { x: 2, y: 4, color: color`0` });
  addText(`Thanks for playing`, { x: 1, y: 7, color: color`6` });
  addText(`-LMF`, { x: 2, y: 9, color: color`6` });
  addText(`Press K to play`, { x: 2, y: 11, color: color`D` });
}

afterInput(() => {
  if(isGameOver==false){
      playerSprite.remove()
    if (anim == false){
      addSprite(plrX,maxY,plr2)
      playerSprite = getFirst(plr2);
    }else if(anim==true){
      addSprite(plrX,maxY,plr)
      playerSprite = getFirst(plr);
    }
    anim = !anim;
  }
})

reset();
loop();
