/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Pac Man Test
@author: 
@tags: []
@addedOn: 2024-00-00
*/
function startTimer(callback, interval) {
  const timer = setInterval(callback, interval);
  return {
    end: () => clearInterval(timer)
  };
}

const player = "p";
const cornerwall = "w";
const info = "i";
const background = "b";
const exit = "e";
const score = "s";
const time = "t";
const key = "k";
const true_exit = "l";
const cat = "c";

setLegend(
  [ player, bitmap`
................
................
....11....11....
...1111..1111...
..18811..11881..
..188811118881..
...1111111111...
.....101101.....
....11011011....
....11511511....
...0111001110...
.....111111.....
....0.1111.0....
................
................
................` ],
  [ cornerwall, bitmap`
3330333330333330
3330333330333330
0000000000000000
0333330333330333
0333330333330333
0000000000000000
3330333330333330
3330333330333330
0000000000000000
0333330333330333
0333330333330333
0000000000000000
3330333330333330
3330333330333330
0000000000000000
0333330333330333`],
  [info, bitmap`
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
  [background, bitmap`
FFFF666FFFFF666F
666F666F666F666F
666F666F666F666F
666F666F666F666F
666FFFFF666FFFFF
666F666F666F666F
666F666F666F666F
666F666F666F666F
FFFF666FFFFF666F
666F666F666F666F
666F666F666F666F
666F666F666F666F
666FFFFF666FFFFF
666F666F666F666F
666F666F666F666F
666F666F666F666F`],
  [exit, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  [true_exit, bitmap`
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
  [score,  bitmap`
0000000000000000
2202202220220022
2002002020202020
2202002020220022
0202002020202020
2202202220202022
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
  [time,  bitmap`
0000000000000000
0222020200020220
0020020220220200
0020020202020220
0020020200020200
0020020200020220
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
  [key,  bitmap`
....0000........
...0DDDD0.......
..0DDDDDD0......
.0DDD00DDD0.....
0DDD0..0DDD0....
0DD0....0DD0....
0DD0....0DD0....
0DDD0..0DDD0....
.0DDD00DDD0.....
..0DDDDDD0F0....
...0DDDD0FFF0.00
....0000.0FFF0F0
..........0FFFF0
...........0FFF0
............000.
................`],
  [cat, bitmap`
................
................
....00....00....
...0000..0000...
..08800..00880..
..088800008880..
...0000000000...
....00200200....
...0002002000...
...0005005000...
..000001100000..
....00000000....
.....000000.....
......0000......
................
................`],
);
setBackground(background);
setSolids([]);

let level = 0
const levels = [
  map`
...w..cwks
.w.w.w...i
kw...w.w.t
.w.w.k...i
.....www.i
.w.w...w.e
.w.www.w.i
p.k......i`,
  map`
iiiiiiiiii
iiiiiiiiii
iiiiiiiiii
iiiiiiiiii
iiiiiiiiii
iiiiiiiiii
iiiiiiiiii
iiiiiiiiii`
];

setMap(levels[level])

setPushables({
  [ player ]: []
})

setSolids([ player, info, cornerwall, exit ]);

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});


var counter = 0;
var gameOver = false;
function checkWinConditions(){
  if(!gameOver){
    // Declaring Variables
    // Is an Object with coordinates
    const playerTile = getFirst(player);
    const catTile = getFirst(cat);
    // Is an Array
    const keySprites = getAll(key);
    const remainingKeys = tilesWith(key).length;
    const blockSprite = getFirst(exit);

    // Checks for LooseGame
    if(playerTile && catTile.x === playerTile.x && catTile.y === playerTile.y){
      clearText();
      addText("You Lost!", { y: 5, color: color`H` });
      playerTile.remove();
      catTile.remove();
      gameOver = true;
      
    }
    
    // Checks for SecondPhase transition
    if (remainingKeys === 0 && counter === 0) {
      addText("You Can Escape!", { y: 5, color: color`5` });
      blockSprite.type = true_exit;
      counter += 1;
  }

  // Checks for FinalPhase
  if ( playerTile.x === 9 && playerTile.y === 5){
    clearText();
    addText("You Won!", { y: 5, color: color`H` });
    playerTile.remove();
    catTile.remove();
    gameOver = true;
  }
  }
  }


function moveCatTowardsPlayer() {
  const playerTile = getFirst(player);
  const catTile = getFirst(cat);

  if (playerTile.x < catTile.x) {
    if (!getTile(catTile.x - 1, catTile.y).some(s => s.type === cornerwall)) {
      catTile.x -= 1;
    }
  } else if (playerTile.x > catTile.x) {
    if (!getTile(catTile.x + 1, catTile.y).some(s => s.type === cornerwall)) {
      catTile.x += 1;
    }
  }

  if (playerTile.y < catTile.y) {
    if (!getTile(catTile.x, catTile.y - 1).some(s => s.type === cornerwall)) {
      catTile.y -= 1;
    }
  } else if (playerTile.y > catTile.y) {
    if (!getTile(catTile.x, catTile.y + 1).some(s => s.type === cornerwall)) {
      catTile.y += 1;
    }
  }
}

function moveCat(){
  if (!gameOver){
    moveCatTowardsPlayer();
  }
}

startTimer(checkWinConditions, 1);
startTimer(moveCat, 500);

afterInput(() => {
  
  console.log(counter);
  // Is an Object with coordinates
  const playerTile = getFirst(player);
  // Is an Array
  const keySprites = getAll(key);
  const remainingKeys = tilesWith(key).length;
  const blockSprite = getFirst(exit);
  //Exit is @ 9,5
  //console.log(getFirst(exit).x, getFirst(exit).y);
  

  
  keySprites.forEach(keySprite => {
    if (playerTile && keySprite.x === playerTile.x && keySprite.y === playerTile.y) {
      // Remove the key sprite
      keySprite.remove();
      console.log("Player picked up a key!");
    }
    });

  

});
  
