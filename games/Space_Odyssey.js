
/* 
@title: Space_Odyssey
@author: Devon S
@tags: ['action']
@addedOn: 2023-11-27
*/

    const player = "p";
const bottom = "b";
const top = "t";
const asteroid = "a";
const explosion = "e";
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const gameSong = tune`
333.3333333333333: D5^333.3333333333333 + F4^333.3333333333333,
333.3333333333333,
333.3333333333333: D5~333.3333333333333 + G4~333.3333333333333,
333.3333333333333: B4~333.3333333333333 + E4~333.3333333333333,
333.3333333333333: C5~333.3333333333333 + F4~333.3333333333333 + A5~333.3333333333333,
333.3333333333333,
333.3333333333333: F5^333.3333333333333 + A5/333.3333333333333 + D5/333.3333333333333,
333.3333333333333: F5/333.3333333333333,
333.3333333333333: F5-333.3333333333333 + B4-333.3333333333333,
333.3333333333333: E5-333.3333333333333 + G4-333.3333333333333,
333.3333333333333,
333.3333333333333: C5-333.3333333333333 + E4-333.3333333333333,
333.3333333333333,
333.3333333333333: A4-333.3333333333333 + C4-333.3333333333333 + E5-333.3333333333333,
333.3333333333333,
333.3333333333333: D5~333.3333333333333 + F5~333.3333333333333 + A4~333.3333333333333 + A5~333.3333333333333 + F4~333.3333333333333,
333.3333333333333: D5~333.3333333333333 + F5~333.3333333333333 + A4~333.3333333333333 + A5~333.3333333333333 + F4~333.3333333333333,
333.3333333333333,
333.3333333333333: A5-333.3333333333333 + E4-333.3333333333333 + C4~333.3333333333333,
333.3333333333333: A5-333.3333333333333 + E4-333.3333333333333 + C4~333.3333333333333,
333.3333333333333: A5-333.3333333333333 + A4-333.3333333333333 + F4~333.3333333333333,
333.3333333333333,
333.3333333333333: D5~333.3333333333333 + G4~333.3333333333333,
333.3333333333333: B4~333.3333333333333 + E4~333.3333333333333,
333.3333333333333: C5~333.3333333333333 + F4~333.3333333333333,
333.3333333333333,
333.3333333333333: A4/333.3333333333333 + E5/333.3333333333333 + C5^333.3333333333333,
333.3333333333333,
333.3333333333333: C5-333.3333333333333 + E4-333.3333333333333,
333.3333333333333: C4-333.3333333333333 + A4-333.3333333333333,
333.3333333333333: D5^333.3333333333333 + F4^333.3333333333333,
333.3333333333333: D5^333.3333333333333 + F4^333.3333333333333`
const overSong = tune`
237.15415019762847,
118.57707509881423: B5~118.57707509881423 + G5/118.57707509881423 + D5^118.57707509881423 + A4^118.57707509881423 + F4-118.57707509881423,
237.15415019762847,
118.57707509881423: E4/118.57707509881423,
118.57707509881423: D4/118.57707509881423 + A4/118.57707509881423 + C5/118.57707509881423,
118.57707509881423: G5/118.57707509881423 + C4^118.57707509881423 + E5-118.57707509881423,
118.57707509881423: G5/118.57707509881423 + D4^118.57707509881423 + B4-118.57707509881423,
118.57707509881423: G5/118.57707509881423 + E4^118.57707509881423 + C5-118.57707509881423,
118.57707509881423: G5/118.57707509881423 + F4^118.57707509881423 + D5-118.57707509881423,
118.57707509881423: G5/118.57707509881423 + E5-118.57707509881423,
237.15415019762847,
118.57707509881423: F4^118.57707509881423 + E5^118.57707509881423 + C4~118.57707509881423 + B5-118.57707509881423,
118.57707509881423: F4/118.57707509881423 + D5^118.57707509881423 + C4~118.57707509881423 + B5-118.57707509881423,
118.57707509881423: G4/118.57707509881423 + C4~118.57707509881423 + B5-118.57707509881423 + F5^118.57707509881423,
118.57707509881423: G4/118.57707509881423 + C4~118.57707509881423 + B5-118.57707509881423 + F5^118.57707509881423,
118.57707509881423: G4/118.57707509881423 + C4~118.57707509881423 + B5-118.57707509881423 + F5^118.57707509881423,
118.57707509881423: G4/118.57707509881423 + C4~118.57707509881423 + B5-118.57707509881423 + F5^118.57707509881423,
118.57707509881423: G4/118.57707509881423 + A4/118.57707509881423 + C4~118.57707509881423 + B5-118.57707509881423 + F5^118.57707509881423,
118.57707509881423: A4/118.57707509881423 + C4~118.57707509881423 + B5-118.57707509881423 + G5^118.57707509881423,
118.57707509881423: A4/118.57707509881423 + B4/118.57707509881423 + C4~118.57707509881423 + B5-118.57707509881423 + G5^118.57707509881423,
1067.193675889328`

var gameTime = 0;
var gameRunning = false;

function checkHit() {
  let asteroids = getAll(asteroid);
  let p = getFirst(player);

  for (let i = 0; i < asteroids.length; i++) {
    if (asteroids[i].x == p.x && asteroids[i].y == p.y) {
      return true;
    }
  }}
      
function topHit() {  
    let tops = getAll(top);
  let p = getFirst(player);

  for (let i = 0; i < tops.length; i++) {
    if (tops[i].x == p.x && tops[i].y == p.y) {
      return true;
    }
  }}
  
function botHit() {  
    let bots = getAll(bottom);
  let p = getFirst(player);

  for (let i = 0; i < bots.length; i++) {
    if (bots[i].x == p.x && bots[i].y == p.y) {
      return true;
    }
  }}
  


function spawnAsteroid() {
  
    let x = 6;
    let y =  getRandomNumber(1,4);
  
    addSprite(x, y, asteroid);
  }
  


function moveObstacles() {
  let obstacles = getAll(asteroid);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= 1;
  }
}

function despawnObstacles() {
  let obstacles = getAll(asteroid);

  for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].x == 0) {
     obstacles[i].remove();
   }
  }}

function despawnAll() {
  let obstacles = getAll(asteroid);
    
  for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].x == 1) {
     obstacles[i].remove();
   }}

  for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].x == 2) {
     obstacles[i].remove();
   }}

    for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].x == 3) {
     obstacles[i].remove();
   }}

    for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].x == 4) {
     obstacles[i].remove();
   }}

    for (let i = 0; i < obstacles.length; i++) {
   if (obstacles[i].x == 5) {
     obstacles[i].remove();
   }}

  
   }
  
setLegend(
  [ player, bitmap`
................
................
................
..LLLLLLL.......
..L11111LLL.....
..L1111111LL....
..LLLLL1111LL...
...L777LLLLLLLL.
...L777L........
...L777LLLLLLLL.
..LLLLL1111LL...
..L1111111LL....
..L11111LLL.....
..LLLLLLL.......
................
................` ],
  [ bottom, bitmap`
................
................
................
.......11.......
.......11.......
.......1L11.....
..11...1LL1.....
..1111.1LL11....
.11LL111LLL11...
111LLLLLLLLL1111
LLLLLLLLLLLLLLL1
LLLLLLLLLLLLLLLL
LLLLLLL000LLLLLL
LL00000000000000
0000000000000000
0000000000000000` ],
  [ top, bitmap`
0000000000000000
0000000000000000
LL00000000000000
LLLLLLL000LLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLL1
111LLLLLLLLL1111
.11LL111LLL11...
..1111.1LL11....
..11...1LL1.....
.......1L11.....
.......11.......
.......11.......
................
................
................` ],
  [ asteroid, bitmap`
................
................
................
................
......LL........
...LLLLLL99999..
...LLLLLLLLC9...
..LL1L0LLLLCC999
...LLLL00LLCC999
...LLLLLLLL999..
....LLLLLL......
................
................
................
................
................` ]
  )


 
setSolids([player])

let level = 0
const levels = [
  map`
ttttttt
.......
p......
.......
.......
bbbbbbb`
]

setMap(levels[level]);



addText( "Press j to start" , {
      x: 2,
      y: 3,
      color: color`7`
    })




onInput("j", () => {
  gameTime = 0
  clearText();
  gameRunning = true;

var timeLoop = setInterval(() => {
  gameTime += 1
  despawnObstacles();
  moveObstacles();
  spawnAsteroid();

 if (checkHit()) {

    gameRunning = false;
    playTune(overSong);
    despawnAll();
    clearInterval(timeLoop);
    getFirst(player).x = 0
    getFirst(player).y = 2
    addText("Womp Womp", {
      x: 5,
      y: 6,
      color: color`7`
    });
    addText("Time: "+ String(gameTime), {
      x: 5,
      y: 7,
      color: color`3`
    });
   addText( "J To Start Over" , {
      x: 2,
      y: 3,
      color: color`0`
    });
  }

   if (botHit()) {

    gameRunning = false;
    playTune(overSong);
    despawnAll();
    clearInterval(timeLoop);
    getFirst(player).x = 0
    getFirst(player).y = 2
    addText("Womp Womp", {
      x: 5,
      y: 6,
      color: color`7`
    });
     addText("Time: "+ String(gameTime), {
      x: 5,
      y: 7,
      color: color`3`
    });
     addText( "J To Start Over" , {
      x: 2,
      y: 3,
      color: color`0`
    });
  }
  

  if (topHit()) {

    gameRunning = false;
    playTune(overSong);
    despawnAll();
    clearInterval(timeLoop);
    getFirst(player).x = 0
    getFirst(player).y = 2
    addText("Womp Womp", {
      x: 5,
      y: 6,
      color: color`7`
    });
    addText("Time: "+ String(gameTime), {
      x: 5,
      y: 7,
      color: color`3`
    });
    addText( "J To Start Over" , {
      x: 2,
      y: 3,
      color: color`0`
    });
  }

afterInput(() => {
  const playerPosition = getFirst(player);


  

  if (checkHit()) {

    gameRunning = false;
    playTune(overSong);
    despawnAll();
    clearInterval(timeLoop);
    getFirst(player).x = 0
    getFirst(player).y = 2
    addText("Womp Womp", {
      x: 5,
      y: 6,
      color: color`7`
    });
    addText("Time: "+ String(gameTime), {
      x: 5,
      y: 7,
      color: color`3`
    });
    addText( "J To Start Over" , {
      x: 2,
      y: 3,
      color: color`0`
    });
  }


})

  
},800)

  
  
});



const playback = playTune(gameSong, Infinity)




        
onInput("s", () => {
  if (gameRunning) {
  getFirst(player).y += 1;
  }
});

onInput("w", () => {
  if (gameRunning) {
  getFirst(player).y -= 1;
  }
});

onInput("a", () => {
  if (gameRunning) {
  getFirst(player).x -= 1;
  }
});

onInput("d", () => {
  if (gameRunning) {
  getFirst(player).x += 1;
  }
});

