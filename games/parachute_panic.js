/*
@title: parachute panic(in sprig)
@author: Riston Rodrigues
tried to make a copy of an old java game parachute panic for sprig

Play:-
-use WASD to move. 
-Dodge the clouds, ufos and land on the boats.
-the longer u dodge the obstacles the more score u get. 
-collect the crane to recieve a score boost.
-landing in water ensures u still win the game but with imposed penalty 
where total score will be halved
-Press I to restart the game.
*/

const vehicle = 'v';
const player = 'p';
const finishLine = 'f';
const water = 'w';
const swan= 's';
const ufo= 'u'


let gameRunning;


let time = 0;
let score = 0;



setLegend(
  [ player, bitmap`
.......5........
....3222222.....
..2272252272....
.322522222522...
.333333333333...
..L...0.....L...
..L...L....0....
..0L..L...L.....
....L.00.L......
....0.00.0......
.....0LL0.......
......00........
......00........
......00........
......L0........
......L0........` ],
  [ vehicle, bitmap`
................
................
................
......L.........
....L00L0.......
...0011LL00.....
..00111L1LL0....
.L0LL1L11LLL01..
.0L1L11L11LLL01.
0LL011L10.1L110.
..010L00.L010...
.....66..0.011..
......666.......
.....66.........
......66........
.......66.......`],
   [ ufo, bitmap`
................
................
................
................
................
.......LL.......
......LLLL......
.00000000000000.
..00L00LL00L00..
...0000000000...
.....0....0.....
................
................
................
................
................`],
  [ swan, bitmap`
..............00
..........000000
.........022220.
........022220..
........022200..
.....00..0220...
...00L200222200.
..0.0220.0222200
.00..00...022220
.000......000000
.0.00..........0
00..0...........
0....0..........
0.....0.........
00..000.........
.0000...........`],
  
  [finishLine, bitmap`
................
................
................
................
................
................
.....00.........
....0220........
0000000000000000
022L222L222L2220
L02220222022220L
5L0000000000000L
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
   [water, bitmap`
................
................
................
................
................
................
...77.......7...
..72.......72...
.777......757...
7277777777777777
5577755577777757
5555555555555555
5555555555555555
5555555555555555
44555555F5555555
45545555855855LL`],
);

   setMap(map`
u......p
.u....v.
...v....
..u..v..
.v...u..
......v.
.u..v...
wfwwwfww`);
onInput('w', () => {
  if(gameRunning) {
    let vehicles = getAll(vehicle);
    let p = getFirst(player);

    let isCollision;
    
    vehicles.forEach(vehicle => {
      if(vehicle.x == p.x && vehicle.y == p.y)
        isCollision = true;
      else
        isCollision = false;
    });

    if(isCollision == false) {
      getFirst(player).y -= 1; 
    }
  }
});

onInput('s', () => {
    if(gameRunning) {
    let vehicles = getAll(vehicle);
    let p = getFirst(player);

    let isCollision;
    
    vehicles.forEach(vehicle => {
      if(vehicle.x == p.x && vehicle.y == p.y)
        isCollision = true;
      else
        isCollision = false;
    });

    if(isCollision == false) {
      getFirst(player).y += 1; 
    }
  }
});

onInput('a', () => {
    if(gameRunning) {
    let vehicles = getAll(vehicle);
    let p = getFirst(player);

    let isCollision;
    
    vehicles.forEach(vehicle => {
      if(vehicle.x == p.x && vehicle.y == p.y)
        isCollision = true;
      else
        isCollision = false;
    });

    if(isCollision == false) {
      getFirst(player).x -= 1; 
    }
  }
});

onInput('d', () => {
  if(gameRunning) {
    let vehicles = getAll(vehicle);
    let p = getFirst(player);

    let isCollision;
    
    vehicles.forEach(vehicle => {
      if(vehicle.x == p.x && vehicle.y == p.y)
        isCollision = true;
      else
        isCollision = false;
    });

    if(isCollision == false) {
      getFirst(player).x += 1; 
    }
  }
});

onInput("i", () => {
  if(gameRunning == false) {
    let p = getFirst("p");

    score = 0;
    
    p.x = 7;
    p.y = 7;

    setMap(map`
u......p
.u....v.
...v....
..u..v..
.v...u..
......v.
.u..v...
wfwwwfww`);
    
    addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`2`
    });
    
    addText("Score: "+score, {
      x: 5,
      y: 8,
      color: color`2`
    });

    addText("Won Game!", {
      x: 5,
      y: 6,
      color: color`2`
    });
    
    addText("Score: "+score, {
      x: 5,
      y: 8,
      color: color`2`
    });
    runGame();
  }
});
//#########################################


//################################will be used to increse/decrease the no of obstacles#################################
function spawnVehicle() {
  if (Math.random() < 0.8) {
    addSprite(0, Math.floor(Math.random() * 7) , vehicle);
  }
}


function moveVehicles() {
  let vehicles = getAll(vehicle);
 
  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].x += 1;
  }
}

function despawnVehicles() {
  let vehicles = getAll(vehicle);
 
  for (let i = 0; i < vehicles.length; i++) {
    if (vehicles[i].x == 7) {
      vehicles[i].remove();
    }
  }
}

function despawnAllVehicles() {
  let vehicles = getAll(vehicle);
 
  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].remove();
  }
}
//
function despawnufo() {
  let ufos = getAll(ufo);
 
  for (let i = 0; i < ufos.length; i++) {
    if (ufos[i].x == 7) {
      ufos[i].remove();
    }
  }
}

function moveufo() {
  let ufos = getAll(ufo);
 
  for (let i = 0; i < ufos.length; i++) {
    ufos[i].x += 1;
  }
}
//###########################used to increase decrease the no of obstacles (ufo)######################################
function spawnufo() {
  if (Math.random() < 0.2) {
    addSprite(0, Math.floor(Math.random() * 7) , ufo);
  }
}

//
//######################################swan######################
function spawnSwan() {
  if (Math.random() < 0.1) {
    let x = 7;
    addSprite(x, Math.floor(Math.random() * 7) , swan);
  }
}

function despawnSwan() {
  let swans = getAll(swan);

  for (let i = 0; i < swans.length; i++) {
    if (swans[i].x == 0) {
      swans[i].remove();
    }
  }
}


function moveswan() {
  let swans = getAll(swan);
 
  for (let i = 0; i < swans.length; i++) {
    swans[i].x -= 1;
  }
}
//#################################################################






//##############################################################
function checkHit() {
  let vehicles = getAll(vehicle);
  let ufos = getAll(ufo);
  let p = getFirst(player);
 
  for (let i = 0; i < vehicles.length; i++) {
    if (vehicles[i].x == p.x && vehicles[i].y == p.y) {
      return true;
    }
  }
 
  for (let i = 0; i < ufos.length; i++) {
    if (ufos[i].x == p.x && ufos[i].y == p.y) {
      return true;
    }
  
  }
 
  if (p.y == 8) {
    return true;
   }

   let waters = getAll(water);
  for (let i = 0; i < waters.length; i++) {
    if (waters[i].x == p.x && waters[i].y == p.y) {
      score = score / 2;
      return true;
    }
  }
  //  for (let i = 0; i < water.length; i++) {
  //   if (water[i].x == p.x && water[i].y == p.y) {
  //     score = score / 2;
  //     return true;
  //   }
  // }
  
 let swans = getAll(swan);
  for (let i = 0; i < swans.length; i++) {
    if (swans[i].x == p.x && swans[i].y == p.y) {
      swans[i].remove();
      score += 50;
      return false;
    }
  }
 
  return false;
}


addText("Score: "+score, {
    x: 3,
    y: 1,
    color: color`0`
});


//################################winning conditions ####################################
function checkWin() {
let finishLines = getAll(finishLine);
let p = getFirst(player);

for (let i = 0; i < finishLines.length; i++) {
if(finishLines[i].y == p.y) {
return true;
}
}

// The player only wins the game if they touch a finish line sprite or reach the bottom of the screen.
if (p.y == 8 && !finishLines.some(x => x.y == p.y)) {
return false;
}

return false;
}

function runGame() {
  gameRunning = true;

  let gameLoop = setInterval(() => {
    ++score;
    addText("Score: "+score, {
      x: 3,
      y: 1,
      color: color`0`
    });
    ++time;

    despawnVehicles();
    moveVehicles();
    spawnVehicle();
    spawnVehicle();
    despawnufo();
    moveufo();
    spawnufo();
    spawnufo();
 despawnSwan();
    moveswan();
    spawnSwan();

   
  }, 1000);

  let checksLoop = setInterval(() => {
    if (checkHit()) {
      gameRunning = false;
      clearInterval(gameLoop);
      clearInterval(checksLoop);
      addText("Game Over!", {
        x: 5,
        y: 6,
        color: color`3`
      });

      addText("Final Score: "+score, {
        x: 3,
        y: 8,
        color: color`3`
      });

      despawnAllVehicles();
    }

    if(checkWin()) {
      gameRunning = false;
      clearInterval(checksLoop);
      addText("Won Game! ", {
        x: 5,
        y: 6,
        color: color`4`
      });

      addText("Final Score: "+score, {
        x: 3,
        y: 8,
        color: color`4`
      });

      despawnAllVehicles();
    }

    if(checkHit() || checkWin()) {
      clearInterval(gameLoop);
      clearInterval(checksLoop);
    }
  }, 1);
}

runGame();
