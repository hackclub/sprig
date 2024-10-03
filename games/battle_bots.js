/*
@title: battle bots
@author: kyle
@tags: ['multiplayer']
@addedOn: 2022-10-20
*/


/*
Controls: 
WASD for Player1 whose score count is top left.
IJKL for Player2 whose score count is bottom right.

Game: The objective is to push each other into the red squares 
whilst avoiding them in order to get the highest score, in an infinite duel.

First Sprig Game and first time using JS in any capacity. Credit to Sahib 
for helping me. 

You cannot diagonally move through the gaps. 

*/
const player1 = "p";
const player2= "l";
const background = "b";
const lose = "o";


let gameOver = false;
let p1Win = 0;
let p2Win = 0;



setLegend(
    [ player1, bitmap`
................
................
....66.....6....
......66.66.6...
...6660066666...
..660000666666..
..600660666666..
..666660666666..
..666660666666..
..666660666666..
..660000000666..
...6666666666...
...6666666666...
.....6666666....
................
................` ],
    [ player2, bitmap`
................
................
.....33.3.......
.......33333....
...3300000333...
..333333303333..
..333330003333..
..333300333333..
..333303333333..
..333000000033..
..333033333333..
...3333333333...
...3333333333...
.....333333.....
................
................` ],
    [ background, bitmap`
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
................
................
................
................` ],
    [ lose, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333` ]
);

setBackground(background);
/* Some level setting nonsense*/
const level = map`
...
...
...`;
setMap(level[0]);

let currentLevel = 0;
const levels = [
    map`
pb.b..o
b....o.
..o....
...o...
....o..
.ob...b
o..b.bl`,
];
setMap(levels[currentLevel]);
/* Some level setting nonsense*/

/* Making players be able to push each other*/
setSolids([player1, player2]);

setPushables({
    [player1]: [ player2 ],
    [player2]: [ player1 ]
});
/* Making players be able to push each other*/

/* User input and movement*/
onInput("s", () => {
  getFirst(player1).y += 1;
});

onInput("d", () => {
  getFirst(player1).x += 1;
});

onInput("a", () => {
  getFirst(player1).x -= 1;
});

onInput("w", () => {
  getFirst(player1).y-= 1;
});
/* 2nd player input*/
onInput("k", () => {
  getFirst(player2).y += 1;
});

onInput("l", () => {
  getFirst(player2).x += 1;
});

onInput("j", () => {
  getFirst(player2).x -= 1;
});

onInput("i", () => {
  getFirst(player2).y-= 1;
});

addText("Duel", {
    color: color`6`,
    x: 8,
    y: 3,
    
});
addText(p1Win +"", {
    x: 3,
    y: 1,
    color: color`3`
});
addText(p2Win +"", {
    x: 16,
    y: 14,
    color: color`3`
});

/* add collisons for the rest of the blocks*/
afterInput(() => {
    let player1Sprite = getFirst(player1);
    let player2Sprite = getFirst(player2);
      if (player1Sprite.x == 0 && player1Sprite.y == 6) {
        p2Win ++; 
        gameOver = true;
      }
      if (player1Sprite.x == 6 && player1Sprite.y == 0 ) {
        p2Win ++;
        gameOver = true;
      }
      if (player2Sprite.x == 0 && player2Sprite.y == 6) {
        p1Win ++;
        gameOver = true;
      }
      if (player2Sprite.x == 6 && player2Sprite.y == 0 ) {
        p1Win++;
        gameOver = true;
      }
  /*new stuff need to program the other */
      if (player2Sprite.x == 1 && player2Sprite.y == 5 ) {
        p1Win++;
        gameOver = true;
      }
      if (player1Sprite.x == 1 && player1Sprite.y == 5 ) {
        p2Win++;
        gameOver = true;
      }
      if (player1Sprite.x == 2 && player1Sprite.y == 2 ) {
        p2Win++;
        gameOver = true;
      }
      if (player2Sprite.x == 2 && player2Sprite.y == 2 ) {
        p1Win++;
        gameOver = true;
      }
      if (player1Sprite.x == 3 && player1Sprite.y == 3 ) {
        p2Win++;
        gameOver = true;
      }
      if (player2Sprite.x == 3 && player2Sprite.y == 3 ) {
        p1Win++;
        gameOver = true;
      }
      if (player1Sprite.x == 4 && player1Sprite.y == 4 ) {
        p2Win++;
        gameOver = true;
      }
      if (player2Sprite.x == 4 && player2Sprite.y == 4 ) {
        p1Win++;
        gameOver = true;
      }
      if (player1Sprite.x == 4 && player1Sprite.y == 4 ) {
        p2Win++;
        gameOver = true;
      }
      if (player2Sprite.x == 4 && player2Sprite.y == 4 ) {
        p1Win++;
        gameOver = true;
      }
      if (player1Sprite.x == 6 && player1Sprite.y == 0 ) {
        p2Win++;
        gameOver = true;
      }
      if (player2Sprite.x == 6 && player2Sprite.y == 0 ) {
        p1Win++;
        gameOver = true;
      }
      if (player1Sprite.x == 5 && player1Sprite.y == 1 ) {
        p2Win++;
        gameOver = true;
      }
      if (player2Sprite.x == 5 && player2Sprite.y == 1 ) {
        p1Win++;
        gameOver = true;
      }
    if (gameOver) {
      levels[0] = map `
pb.b..o
b....o.
..o....
...o...
....o..
.ob...b
o..b.bl`
      setMap(levels[currentLevel]);
      gameOver = false

      
    }
  addText(p1Win +"", {
    x: 3,
    y: 1,
    color: color`3`
});
  addText(p2Win +"", {
    x: 16,
    y: 14,
    color: color`3`
});
  
});






