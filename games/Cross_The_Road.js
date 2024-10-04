/*
@title: Cross_The_Road
@author: Haneesh Pediredla
@tags: ['endless']
@addedOn: 2022-12-27

Play:-
WASD to move. Dodge the vehicles and reach the finish line.
If you stand longer dodging the vehicles then the score will be high.
Press I to restart the game.
*/

const vehicle = 'v';
const player = 'p';
const finishLine = 'f';

let gameRunning;

let time = 0;
let score = 0;

setLegend(
  [player, bitmap`
................
................
................
................
................
.....00.........
....0000........
....0..0........
.....00.........
....0000........
...0.00.0.......
..0..00..0......
.....00.........
.....00.........
....0..0........
...0....0.......`],
  [vehicle, bitmap`
................
................
................
................
................
333333333333....
3333333333333...
37737737737733..
377377377377733.
3773773773777733
3333333333333333
3333333333333333
................
................
................
................`],
  [finishLine, bitmap`
000222000222000L
000222000222000L
000222000222000L
222000222000222L
222000222000222L
222000222000222L
000222000222000L
000222000222000L
000222000222000L
222000222000222L
222000222000222L
222000222000222L
000222000222000L
000222000222000L
000222000222000L
................`],
);

setMap(map`
ffffffff
......v.
...v....
.....v..
.v......
......v.
....v...
.......p`);

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
ffffffff
......v.
...v....
.....v..
.v......
......v.
....v...
.......p`);
    
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

function spawnVehicle() {
  let x = 0;
  let y = Math.floor(Math.random() * 7) + 1;
  addSprite(x, y, vehicle);
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

function checkHit() {
  let vehicles = getAll(vehicle);
  let p = getFirst(player);
 
  for (let i = 0; i < vehicles.length; i++) {
    if (vehicles[i].x == p.x && vehicles[i].y == p.y) {
      return true;
    }
  }
 
  return false;
}

addText("Score: "+score, {
    x: 3,
    y: 15,
    color: color`0`
});

function checkWin() {
  let finishLines = getAll(finishLine);
  let p = getFirst(player);

  for (let i = 0; i < finishLines.length; i++) {
    if(finishLines[i].y == p.y) {
        return true;
    }
  }
  
  return false;
}

function runGame() {
  gameRunning = true;
  
  let gameLoop = setInterval(() => {
    ++score;
    addText("Score: "+score, {
      x: 3,
      y: 15,
      color: color`0`
    });
    ++time;
    
    despawnVehicles();
    moveVehicles();
    spawnVehicle();
    spawnVehicle();
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
      
      addText("Score: "+score, {
        x: 5,
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
      
      addText("Score: "+score, {
        x: 5,
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
