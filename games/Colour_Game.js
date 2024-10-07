/*
@title: Colour_Game
@author: Thuvaragan
@tags: ['endless']
@addedOn: 2022-12-26

Instructions:
Press J if you see BLUE 
Press L if you see GREEN 
Press A if you see BLACK 

The colour of the square is in random order. 
Each time you press the correct button for the corresponding colour, you receive a point.
Game over if you click the wrong button.
Try to get as many points as you can!

Press Run again to restart
*/

// setup
const blue = "b";
const green = "g";
const black = "r";

setLegend(
  [ blue, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [ green, bitmap`
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
0000000000000000`]
);
setMap(map`
.`);

let gameOver = false;
let currentColour = -1;

function changeColour(colour) {
  currentColour = colour;
  clearTile(0, 0);
  if(colour == 0) {
    addSprite(0, 0, blue);
  } 
  if(colour == 1) {
    addSprite(0, 0, green);
  }
  if(colour == 2) {
    addSprite(0, 0, black);
  }
}

let timer = 60;

changeColour(Math.floor(Math.random() * 3));

let score = 0;

function endGame() {
  gameOver = true;
  addText("Game Over", {
    x: 5,
    y: 5,
    color: color`2`
  });
}

function gameLoop() {
  if(!gameOver) {
    // timer
    addText(timer.toString(), {
      x: 3, 
      y: 1,
      color: color`2`
    });
    
    timer -= 1;

    //score 
    addText("Score: " + score.toString(), {
      x: 8, 
      y: 14,
      color: color`2`
    });
    
    
    if(timer < 0) {
      endGame();
    }
  }
  
}

setInterval(gameLoop, 1000);

// User Input

onInput("j", () => {
    // blue
  if(currentColour == 0) {
    score += 1;
  } else {
    endGame();
  }
  changeColour(Math.floor(Math.random() * 3));
});

onInput("l", () => {
  // green
  if(currentColour == 1) {
    score += 1;
  } else {
    endGame();
  }
  changeColour(Math.floor(Math.random() * 3));
});

onInput("a", () => {
  // black
  if(currentColour == 2) {
    score += 1;
  } else {
    endGame();
  }
  changeColour(Math.floor(Math.random() * 3));
});