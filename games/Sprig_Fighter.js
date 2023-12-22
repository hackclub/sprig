
/*

Player 1
A,D for movement
W for attack

Player 2
J,L for movement
I for attack
*/


const player1Default = "f"; 
const player2Default = "s"; 
const boundary = "b"; 



let healthBarP1 = 100;
let healthBarP2 = 100;
let isPlayer1Blocking = false;
let isPlayer2Blocking = false;


const player1Attack = "A";
const player2Attack = "B";


const xBoundary = 20;
const yBoundary = 10;


var player1Current = player1Default;
var player2Current = player2Default;


setLegend(
  [player1Default,bitmap`
....00000000....
....0.....0.....
....0.0.0.0.....
....0.....0.....
....0.000.0.....
....0.....0.....
....0000000.....
.......0........
..000..0........
....00000000....
.......0........
.......0........
.......0........
......0000......
.....00...000...
....00......0...`],
  [player1Attack,bitmap`
....00000000....
....0.....0.....
....0.0.0.0.....
....0.....0.....
....0.000.0.....
....0.....0.....
....0000000.....
.......0........
.......0....00..
.......0000000..
.......0........
.......0000000..
.......0....00..
......0000......
.....00...000...
....00......0...`],
  [player2Default,bitmap`
................
................
.........33333..
........33...3..
........3.33.3..
........3....3..
........3333.3..
.........3...3..
.........33333..
..........3.....
.....33333333333
.........33.....
.........33.....
.........333....
.........3.333..
........33......`],
  [player2Attack, bitmap`
................
................
.........33333..
........33...3..
........3.33.3..
........3....3..
........3333.3..
.........3...3..
...33....33333..
...333....3.....
...33333333.....
.........33.....
...333...33.....
...333333333....
...333...3.333..
........33......`],
  [boundary, bitmap`
0000000000000000
000...........00
0.0..........0.0
0..0.......00..0
0...0......0...0
0....00...0....0
0.....00.0.....0
0......00......0
0......000.....0
0.....0..00....0
0....0....000..0
0...0.......0..0
0..0.........0.0
0.0...........00
00............00
0000000000000000`],
)
setPushables({ 
  [player1Default]: [ player2Default ] ,
   [player2Default]: [ player1Default ] 
});
const gameMap = map`
bbbbbbbbbbbbbbbbbbbb
b..................b
b..................b
b..................b
b..................b
b..................b
b..................b
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb`;


setMap(gameMap);


setSolids([ player1Default,player2Default,player1Attack,player2Attack,boundary]);


addSprite(2, yBoundary-4, player1Current);
addSprite(xBoundary-3, yBoundary-4, player2Current);


function DisplayHealth(){
  addText(`${healthBarP1} HP`, { x: 0, y: 1, color: color`1` });
addText(`${healthBarP2} HP`, { x: xBoundary-8, y: 1, color: color`3` });
}

DisplayHealth()



onInput("a", () => {
 
  movePlayerLeft(player1Current);
  
});

onInput("d", () => {

  movePlayerRight(player1Current);
});

onInput("j", () => {
  
  movePlayerLeft(player2Current);
});

onInput("l", () => {

  movePlayerRight(player2Current);
});


function movePlayerLeft(player) {
  const playerSprite = getFirst(player);
   if(undefined_checker([playerSprite]))return;
  if (playerSprite.x > 1 && playerSprite.x - 1 < xBoundary && !isBlocked(playerSprite.x - 1, playerSprite.y)) {
    playerSprite.x -= 1;
  }
}


function movePlayerRight(player) {
 
  const playerSprite = getFirst(player);
   if(undefined_checker([playerSprite]))return;
  if (playerSprite.x < xBoundary - 2 && playerSprite.x + 1 >= 1 && !isBlocked(playerSprite.x + 1, playerSprite.y)) {
    playerSprite.x += 1;
  }
  
}


function isBlocked(x, y) {
  return getTile(x, y).some(sprite => sprite.type === boundary);
}




onInput("w", () => {
  // Player 1 attacks
  attack(player1Current, player2Current, player1Attack);
});

onInput("i", () => {

  attack(player2Current, player1Current, player2Attack);
});
function undefined_checker(arr){
   var returner = false;
  arr.forEach((v)=>{if(v==undefined)returner=true;})
  return returner;
}

function attack(attacker, target, attackSprite) {
 
  const attackerSprite = getFirst(attacker);
  const targetSprite = getFirst(target);
   

  
  if(undefined_checker([attackerSprite,targetSprite,player1Attack,player2Attack]))return;

    attackerSprite.type = attackSprite;

    
   
   setTimeout(() => {
       clearTile(attackerSprite.x, attackerSprite.y)
      attackerSprite.type = playerDefault(attacker);
     
    }, 200);
  if (Math.abs(attackerSprite.x-targetSprite.x)<=2) {

    const damage = isBlocking(target) ? 2 : 10; 
    healthBarReduce(target,damage);
    clearText();
    DisplayHealth();
  }
}



function healthBarReduce(player,damage) {
  return player === player1Current ? healthBarP1 = Math.max(healthBarP1-damage,0) : healthBarP2=Math.max(healthBarP2-damage,0);
}


function playerDefault(player) {
  return player === player1Current ? player1Default : player2Default;
}


function isBlocking(target) {
  return target === player1Current ? isPlayer1Blocking : isPlayer2Blocking;
}


afterInput(() => {

  checkGameOver();
});


function checkGameOver() {
  if (healthBarP1 <= 0 || healthBarP2 <= 0) {
    const winnerText = healthBarP1 <= 0 ? "Player 2 wins!" : "Player 1 wins!";
    addText(winnerText, { x: xBoundary / 2 - 6, y: yBoundary / 2, color: healthBarP1 <= 0 ? color`3` : color`1` });
    
    setTimeout(() => {
      resetGame();
    }, 2000);
  }
}

function resetGame() {

  healthBarP1 = 100;
  healthBarP2 = 100;

  isPlayer1Blocking = false;
  isPlayer2Blocking = false;


  setMap(gameMap);


  setSolids([player1Default, player2Default, boundary]);


  addSprite(2, yBoundary - 4, player1Default);
  addSprite(xBoundary - 3, yBoundary - 4, player2Default);
  clearText();
 DisplayHealth()
}

