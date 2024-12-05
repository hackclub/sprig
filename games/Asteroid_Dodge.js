/*
@title: Asteroid_Dodge!
@author: V205
@tags: ['action']
@addedOn: 2023-08-09
*/
// Thanks to Hackclub and tutorials!
// Setup stuff!

//Sprites!
const player = "p"; // Define Player
const coin = "c";// Define Coin
const obstacle = "o";// Define obstacle(asteroids)
const background = "b";// Define background. Only used to create space.
const wall = "w";// Used to create space for text.

//Tunes!
const gamePlayTune = tune`
75,
37.5: D5^37.5,
37.5: D5^37.5,
37.5: C5^37.5,
37.5: C5^37.5,
37.5: C5^37.5,
37.5: G4^37.5,
37.5: G4^37.5,
37.5: G4^37.5,
37.5,
37.5: A5^37.5,
75,
37.5: B4^37.5,
150,
37.5: A5^37.5,
37.5: A5^37.5,
37.5,
37.5: C4^37.5,
37.5,
37.5: A5^37.5,
37.5: A5^37.5,
37.5,
37.5: A5^37.5,
37.5: A5^37.5,
112.5`// Game tune.
const gameEndTune = tune`
133.92857142857142,
133.92857142857142: B5^133.92857142857142,
133.92857142857142: A5^133.92857142857142,
133.92857142857142: G5^133.92857142857142,
133.92857142857142: F5^133.92857142857142,
133.92857142857142: E5^133.92857142857142,
133.92857142857142: D5^133.92857142857142,
133.92857142857142: C5^133.92857142857142,
133.92857142857142: B4^133.92857142857142,
133.92857142857142: A4^133.92857142857142,
133.92857142857142: G4^133.92857142857142,
133.92857142857142: F4^133.92857142857142,
133.92857142857142: E4^133.92857142857142,
133.92857142857142,
133.92857142857142: E4^133.92857142857142,
133.92857142857142: E4^133.92857142857142,
133.92857142857142,
133.92857142857142: E4^133.92857142857142,
133.92857142857142: E4^133.92857142857142,
133.92857142857142,
133.92857142857142: E4^133.92857142857142,
133.92857142857142: E4^133.92857142857142,
133.92857142857142,
133.92857142857142: D4^133.92857142857142,
133.92857142857142: D4^133.92857142857142,
133.92857142857142,
133.92857142857142: C4^133.92857142857142,
133.92857142857142: C4^133.92857142857142,
535.7142857142857`// Wa wa wa wa. You lost!

//Variables!
var gameTime = 0;// How long have you been playing?
var coinsCollected = 0; // How many coins?
var difficulty = 1; // Difficulty increases every hundred. Might become impossible at 300 or less.
var changeDifficulty = false; //Change to true if you want the difficulty to increase by one every hundred seconds.
//Set bitmaps.
setLegend(
  [obstacle, bitmap`
0000000000000000
0000000000000000
0000000LLL000000
00000LLL11LL0000
0000LLL11LLLL000
000LLL11LLL0L000
000LL11LLL11LL00
000LL1LLL111L100
00LLLLLLL100L100
000LLLLLL111LL00
000LLL11111LL000
000LLL1111LLL000
0000LLLLLLLL0000
00000LLLL1100000
0000000LL1000000
0000000000000000`], // Obstacles(asteroids)
  [player, bitmap`
................
................
..999...........
..9999..........
..99999.........
.99999999.......
.999229999......
39922229999.....
399222299999....
3992222999999...
999922999999....
99999999999.....
.9999999........
.9999...........
.99.............
................`],// Spaceship
  [background, bitmap`
0000000000000000
0000000000000000
0000000000000000
0002000000000000
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
0000000000000200
0000000000000000`],// Background
  [coin, bitmap`
0000000000000000
0000066666000000
0000666666600000
0006699996600000
0066996666660000
0066966666660000
0666966666666000
0669966666666600
0669966666666660
0066996666666660
0066699666666600
0006669999666000
0006666666660000
0000666666600000
0000066660000000
0000000000000000`],// coin. Very ugly.
  [wall, bitmap`
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
0000000000000000`],// Black square.
  
)

setMap(map`
wwwwwwww
........
........
........
........
p.......
........
........
........
........`);// set map.
setSolids([wall, player]);// Don't allow other things to go inside these things.
setBackground(background);// Set background.


var gameRunning = true; //This will go to false if you crash into a asteroid.


// End Setup stuff
// Controlls.
onInput("w", () => {
  if (gameRunning) {
    getFirst(player).y -= 1;
  }
});

onInput("s", () => {
  if (gameRunning) {
    getFirst(player).y += 1;
  }
});
// Obstacle management.w
function increaseDifficulty() {
  
  if(gameTime >=101 && changeDifficulty == true){
    
    difficulty = Math.floor(gameTime/100 +1 );
  }
}


function spawnObstacle() {

  for (let i = 0; i < difficulty; i++) { 
    let x = 7;
    let y =  getRandomNumber(1,9);//old way: Math.floor(Math.random() * 8.5);
  
    addSprite(x, y, obstacle);
  }
  
}

function moveObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 1;
  }
}

function despawnObstacles() {
  let obstacles = getAll(obstacle);

  for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].x == 0) {
     obstacles[i].remove();
   }
  }
}

function checkHit() {
  let obstacles = getAll(obstacle);
  let p = getFirst(player);

  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == p.x && obstacles[i].y == p.y) {
      return true;
    }
  }

  return false;
}

// End Obstacle management.

// Coin management.

function spawnCoins() {

  if ( getRandomNumber(1,3)== 1) {
    let x = 7;
    let y =  getRandomNumber(1,9);//old way: Math.floor(Math.random() * 8.5);
  
    addSprite(x, y, coin);
  }
  
}

function moveCoins() {
  let coins = getAll(coin);

  for (let i = 0; i < coins.length; i++) {
    coins[i].x -= 1;
  }
}

function despawnCoins() {
  let coins = getAll(coin);

  for (let i = 0; i < coins.length; i++) {
   if (coins[i].x == 0) {
     coins[i].remove();
   }
  }
}


function checkCoinHit() {
  let coins = getAll(coin);
  let p = getFirst(player);

  for (let i = 0; i < coins.length; i++) {
    if (coins[i].x == p.x && coins[i].y == p.y) {
      return true;
    }
  }

  return false;
}




// Function to make random numbers easier. 
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


var gameLoop = setInterval(() => {
  increaseDifficulty();
  despawnObstacles();
  moveObstacles();
  spawnObstacle();

  despawnCoins();
  moveCoins();
  spawnCoins();
  
  playTune(gamePlayTune);
  gameTime += 1;
  
 
  addText( String(gameTime) , {
      x: 0,
      y: 0,
      color: color`3`
    });

  if(checkCoinHit()){

    coinsCollected+=1;
    addText("C: "+ String(coinsCollected), {
      x: 5,
      y: 0,
      color: color`6`
    });
  }
  if (checkHit()) {
    clearInterval(gameLoop);
    gameRunning = false;
    clearText();
    playTune(gameEndTune);
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
    addText("Time: "+ String(gameTime), {
      x: 5,
      y: 7,
      color: color`3`
    });

    addText("Coins: "+ String(coinsCollected), {
      x: 5,
      y: 8,
      color: color`6`
    });
  }
  
  

}, 1000)

