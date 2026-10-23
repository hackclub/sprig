/*
@title: Starship Catch Game
@description: Land the starship at the tower:)
@author: Ventengo
@tags: ['spacex', 'starship', 'mechazilla', 'arcade']
@addedOn: 2026-10-23
*/

const ship = "s";
const tower = "t";
const arm = "a";
const ground = "g"; // this is the version that works, building from here

setLegend(
  [ship, bitmap`
.......888......
......88888.....
......88888.....
......88888.....
.....8888888....
.....8888888....
.....8888888....
.....8888888....
.....8888888....
.....8888888....
.....8888888....
.....8888888....
.....8888888....
....888888888...
....888888888...
...88888888888..`],

  [tower, bitmap`
......3333......
......3333......
......3333......
......3333......
......3333......
..333333333333..
..333333333333..
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......`],

  [arm, bitmap`
................
................
................
................
................
................
................
................
2222222222222222
2222222222222222
......3333......
......3333......
......3333......
......3333......
......3333......
......3333......`],

  [ground, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`]
);

// map layout - the gap between the arms is where the ship needs to land
const level = map`
.................
..............t..
..............t..
..............t..
..............t..
..............t..
..............t..
..............t..
..............t..
..............t..
.................
.........aa.aa...
.................
.................
ggggggggggggggggg`;

let shipX = 4;
let shipY = 3;

// ship movement + physics stuff
let vx = 0;
let vy = 0;
let remainderX = 0;
let remainderY = 0;

// starting fuel and throttle
let fuel = 100;
let throttle = 0;
let gameOver = false;
let landed = false;
let ticks = 0;

// these control how fast the ship falls and how much the engine helps
const gravity = 0.009;
const enginePower = 0.035;
const maxFallSpeed = 0.30;
const maxSideSpeed = 0.18;

// reset everything so you can try landing again
function resetGame() {
  setMap(level);

  shipX = 4;
  shipY = 3;

  vx = 0;
  vy = 0;
  remainderX = 0;
  remainderY = 0;

  fuel = 100;
  throttle = 0;
  gameOver = false;
  landed = false;
  ticks = 0;

  clearText();
  addSprite(shipX, shipY, ship);
  showStatus();
}

// update the fuel, speed and landing target text
function showStatus() {
  clearText();

  addText("STARSHIP CATCH", {
    x: 1,
    y: 0,
    color: color`3`
  });

  addText("FUEL: " + Math.ceil(fuel) + "%", {
    x: 1,
    y: 1,
    color: color`6`
  });

  addText("THRUST: " + Math.round(throttle * 100) + "%", {
    x: 1,
    y: 2,
    color: throttle > 0 ? color`3` : color`6`
  });

  addText("V SPEED: " + vy.toFixed(2), {
    x: 1,
    y: 3,
    color: color`3`
  });

  addText("A/D steer  W engine", {
    x: 1,
    y: 14,
    color: color`3`
  });

  addText("S cut engine  J retry", {
    x: 1,
    y: 15,
    color: color`6`
  });

  // landing marker points to the catch gap
  addText("LAND HERE!", {
    x: 8,
    y: 8,
    color: color`6`
  });

  addText("   v", {
    x: 10,
    y: 9,
    color: color`6`
  });
}

// called when the ship hits something or misses the catch
function crash(reason) {
  gameOver = true;
  throttle = 0;

  clearText();

  addText("MISSION FAILED", {
    x: 3,
    y: 5,
    color: color`3`
  });

  addText(reason, {
    x: 2,
    y: 7,
    color: color`2`
  });

  addText("Press J to retry", {
    x: 2,
    y: 10,
    color: color`6`
  });
}

// the landing worked!
function win() {
  gameOver = true;
  landed = true;
  throttle = 0;

  clearText();

  addText("CATCH SUCCESSFUL!", {
    x: 1,
    y: 5,
    color: color`3`
  });

  addText("STARSHIP SECURED", {
    x: 1,
    y: 7,
    color: color`6`
  });

  addText("Press J to fly again", {
    x: 1,
    y: 10,
    color: color`3`
  });
}

// checks if a tile is blocked by the tower, arms or ground
function isBlocked(x, y) {
  // main tower column
  if (x === 14 && y >= 1 && y <= 10) {
    return true;
  }

  // arms leave a gap in the middle for the ship
  if (y === 11 && [9, 10, 12, 13].includes(x)) {
    return true;
  }

  // ground and screen edges
  if (y >= 13 || x < 0 || x > 16 || y < 0) {
    return true;
  }

  return false;
}

// move the ship one tile and check whether it landed correctly
function moveShip(dx, dy) {
  if (gameOver) return;

  const nextX = shipX + dx;
  const nextY = shipY + dy;

  // check the catch gap between the chopsticks
  if (dy === 1 && shipY === 10 && nextX === 11) {
    if (Math.abs(vx) <= 0.18 && vy >= 0 && vy <= 0.30) {
      shipX = nextX;
      shipY = nextY;

      const sprite = getFirst(ship);
      if (sprite) {
        sprite.x = shipX;
        sprite.y = shipY;
      }

      win();
    } else {
      crash("Too fast to catch!");
    }
    return;
  }

  if (isBlocked(nextX, nextY)) {
    crash("Tower or ground impact!");
    return;
  }

  shipX = nextX;
  shipY = nextY;

  const sprite = getFirst(ship);
  if (sprite) {
    sprite.x = shipX;
    sprite.y = shipY;
  }
}

// runs every 100ms to update gravity, thrust and movement
function physicsTick() {
  if (gameOver) return;

  ticks++;

  // gravity keeps pulling the ship down
  vy = Math.min(maxFallSpeed, vy + gravity);

  // engine thrust depends on the throttle setting
  if (throttle > 0 && fuel > 0) {
    vy = Math.max(-0.15, vy - enginePower * throttle);
    fuel = Math.max(0, fuel - 0.04 * throttle);
  }

  if (fuel <= 0) {
    throttle = 0;
  }

  // the ship keeps some momentum when moving sideways
  vx *= 0.985;
  vx = Math.max(-maxSideSpeed, Math.min(maxSideSpeed, vx));

  remainderX += vx;
  remainderY += vy;

  // only move a full tile after enough movement builds up
  while (remainderX >= 1 && !gameOver) {
    remainderX -= 1;
    moveShip(1, 0);
  }

  while (remainderX <= -1 && !gameOver) {
    remainderX += 1;
    moveShip(-1, 0);
  }

  while (remainderY >= 1 && !gameOver) {
    remainderY -= 1;
    moveShip(0, 1);
  }

  while (remainderY <= -1 && !gameOver) {
    remainderY += 1;
    moveShip(0, -1);
  }

  // update the numbers every few ticks so they stay readable
  if (ticks % 5 === 0 && !gameOver) {
    showStatus();
  }
}



// A and D steer left/right. Gravity still works when no key is pressed.
onInput("a", () => {
  if (!gameOver) {
    vx = Math.max(-maxSideSpeed, vx - 0.06);
  }
});

onInput("d", () => {
  if (!gameOver) {
    vx = Math.min(maxSideSpeed, vx + 0.06);
  }
});


//HELLO REVIEWER, WHAT u thinkin of my project --> You Like Starship?




// W adds 10% throttle each press
onInput("w", () => {
  if (!gameOver && fuel > 0) {
    throttle = Math.min(1, throttle + 0.1);
    showStatus();
  }
});



// S reduces throttle by 10% each press
onInput("s", () => {
  if (!gameOver) {
    throttle = Math.max(0, throttle - 0.1);
    showStatus();
  }
});

// press J to start over
onInput("j", () => {
  resetGame();
});

resetGame();

// keep the game running even when no key is being pressed
setInterval(physicsTick, 100);