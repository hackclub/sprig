/*
@title: Space Race v1
@author: Ler
@tags: ['action','multiplayer']
@addedOn: 2024-06-28
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

// -- Space Race --
// A (very buggy) multiplayer game where the two players collect powerups and try to stay alive!
//
// Tutorial:
// When you open the game, you will be met with a starting screen, just click W to start!
// W,A,S,D controls the spaceship, while I,J,K,L controls the UFO.
// Each player starts with five lives, but more can be collected as powerups.
// Gates will start falling down the screen, make sure to fly through every gate or you will lose a life!
// Powerups will also occasionally fall, they can be health, or a fusion cell that stuns your opponent. Don't ask me how, but it does!
// Asteroids can also fall, so be careful.
// I hope you enjoy!!
//
// Random Notes:
// If (for some reason) anyone ever wants to copy my (dubious) code, please give me credit! I won't be enforcing this or anything, but it would be very nice if you would! :D
// On the topic of code, please forgive me for this, I coded it in like three hours and I'm too lazy to optimize, clean, or improve variable names.
// There are also definitely some prominent bugs, but I dont know if they are code or computer issues, so if they are still present when I recieve my Sprig console I'll try to fix them.
// The most prominent one is disappearing sprites, forgive me for that lol! :D
// In the future I might release a much better part two!
// Thank you for playing my kinda silly game, and I hope you enjoy! :D


//
// Defining all my sprites
//

// All of my sprite codes
const background = "a"
const player1 = "b"
const player2 = "c"
const ring1 = "d"
const ring2 = "e"
const ring3 = "f"
const ring4 = "g"
const black = "h"
const displayShip1 = "i"
const displayShip2 = "j"
const health = "k"
const displayRing1 = "l"
const displayRing2 = "m"
const displayRing3 = "n"
const displayRing4 = "o"
const spaceVariation1 = "p"
const spaceVariation2 = "q"
const spaceVariation3 = "r"
const spaceVariation4 = "s"
const shootingStar = "t"
const alien = "u"
const fusionCell = "v"
const asteroid = "w"
const checkmark = "x"
const checkmark2 = "y"

// All of my sprite bitmaps
setLegend(
  [ background, bitmap`
0000000000000000
0000000000000000
0000000020000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000200000000000
0000000000002000
0000000000000000
0000000000000000
0000000000000000` ],
  [ player1, bitmap`
.......22.......
.......22.......
.......22.......
......2222......
......2772......
......7777......
..3..277772..3..
..2..277772..2..
..2.22LLLL22.2..
..2.22LLLL22.2..
..2222L77L2222..
..22L2LLLL2L22..
.22LL2L77L2LL22.
.22LL2LLLL2LL22.
.22LL22LL22LL22.
..222222222222..` ],
  [ player2, bitmap`
................
................
................
......4444......
.....444444.....
....44444444....
....44444444....
...444D444444...
...444DD444D4...
.LL44DDDDDDDDLL.
L3L4DDDDDDDDDL3L
LLLLLLDDDDLLLLLL
.L3LLLLLLLLLL3L.
...LL3LLLL3LL...
................
................` ],
  [ ring1, bitmap`
........22222222
....222222222222
..2222222.......
.2222...........
.22.............
222.............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............
22..............` ],
  [ ring2, bitmap`
2222222222222222
2222777777772222
...2222222222...
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
  [ ring3, bitmap`
2222222222222222
2222333333332222
...2222222222...
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
  [ ring4, bitmap`
22222222........
222222222222....
.......2222222..
...........2222.
.............22.
.............222
..............22
..............22
..............22
..............22
..............22
..............22
..............22
..............22
..............22
..............22` ],
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
0000000000000000` ],
  [ displayShip1, bitmap`
0000000220000000
0000000220000000
0000000220000000
0000002222000000
0000002772000000
0000007777000000
0030027777200300
0020027777200200
002022LLLL220200
002022LLLL220200
002222L77L222200
0022L2LLLL2L2200
022LL2L77L2LL220
022LL2LLLL2LL220
022LL22LL22LL220
0022222222222200` ],
  [ displayShip2, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000004444000000
0000044444400000
0000444444440000
0000444444440000
000444D444444000
000444DD444D4000
0LL44DDDDDDDDLL0
L3L4DDDDDDDDDL3L
LLLLLLDDDDLLLLLL
0L3LLLLLLLLLL3L0
000LL3LLLL3LL000
0000000000000000
0000000000000000` ],
  [ health, bitmap`
66............66
6.333......333.6
.33333....33333.
3333333..3333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
.33333333333333.
.33333333333333.
..333333333333..
...3333333333...
....33333333....
.....333333.....
6.....3333.....6
66.....33.....66` ],
  [ displayRing1, bitmap`
0000000022222222
0000222222222222
0022222220000000
0222200000000000
0220000000000000
2220000000000000
2200000000000000
2200000000000000
2200000000000000
2200000000000000
2200000000000000
2200000000000000
2200000000000000
2200000000000000
2200000000000000
2200000000000000` ],
  [ displayRing2, bitmap`
2222222222222222
2222777777772222
0002222222222000
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
0000000000000000` ],
  [ displayRing3, bitmap`
2222222222222222
2222333333332222
0002222222222000
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
0000000000000000` ],
  [ displayRing4, bitmap`
2222222200000000
2222222222220000
0000000222222200
0000000000022220
0000000000000220
0000000000000222
0000000000000022
0000000000000022
0000000000000022
0000000000000022
0000000000000022
0000000000000022
0000000000000022
0000000000000022
0000000000000022
0000000000000022` ],
  [ spaceVariation1, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000020000
0000200000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000200000000
0200000000000000
0000000000000200
0000000000000000
0000000000000000` ],
  [ spaceVariation2, bitmap`
0000000000000000
0000000000000000
0000002000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000200000000000
0000000000000000
0000000000000000
0000000000000000
0000000002000000
0000000000000000
0000000000000000` ],
  [ spaceVariation3, bitmap`
0000000000000000
0000000020000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0002000000000000
0000000000000200
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000200000000
0000000000000000` ],
  [ spaceVariation4, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000200000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ shootingStar, bitmap`
.......2........
.......2........
.......2........
.......2........
.......2........
.......2........
.......2........
.......2........
.......2........
.......2........
.......2........
.......2........
.......2........
.......2........
.......2........
.......2........` ],
  [ alien, bitmap`
................
................
................
......4444......
.....444444.....
....44444444....
....44444444....
...444D444444...
...444DD444D4...
.LL44DDDDDDDDLL.
L3L4DDDDDDDDDL3L
LLLLLLDDDDLLLLLL
.L3LLLLLLLLLL3L.
...LL3LLLL3LL...
................
................` ],
  [ fusionCell, bitmap`
66.3000330003.66
6..0D444D44D0..6
...0D444D44D0...
...0DDD4D44D0...
...04404DDDD0...
...0D444D4440...
...0777777770...
...3555555553...
...3555555553...
...0777777770...
...04D44D4440...
...0DD44DDDD0...
...04444D4440...
...0DDDDD4D40...
6..0444444D40..6
66.3000330003.66` ],
  [ asteroid, bitmap`
................
................
.....0LLLLL.....
...00LL11LL1....
...0LLL1LLL111..
..0LLLL1LLLL11..
..LL111111LL111.
..LL11LL11111L1.
..L11LLLL1L1111.
..L1L1LLL11LL11.
..L1111111LLL1..
..L1L1L111LLL...
...LL1111111....
....L1LLL1L1....
.......LL11.....
................` ],
  [ checkmark, bitmap`
................
................
.............77.
............777.
...........777..
...........77...
..........777...
..........77....
.........77.....
.77.....777.....
.777....77......
..777..777......
...777777.......
....7777........
.....777........
................` ],
  [ checkmark2, bitmap`
................
................
.............33.
............333.
...........333..
...........33...
..........333...
..........33....
.........33.....
.33.....333.....
.333....33......
..333..333......
...333333.......
....3333........
.....333........
................` ],
)

// Setting the background, and making the ships collidable
setBackground("a")
setSolids([player1, player2])

//
// This is a gigantic wall of variables
//

// How long it takes the rings to fall
let ringTime = 500;

// Keeps track of whether or not the ships have passed the gates
let redSafe = false;
let blueSafe = false;

// The lives that each player has
let blueLives = 5;
let redLives = 5;

// If the game systems should be waiting
let waiting = true;

// 0 is the menu, 1 is the game
let currentScreen = 0;

// I needed something other than waiting, so this tracks when the game is over
let gameOver = true;

// This makes the sign flash
let signColor = 3

// How many gates the players have passed
let level = 0;

// Power-up storage
let activePowerUps = [];
let resettingPowerUps = [];

// I tried to make engines, but the bug that's plaguing me ruined it, so I'll leave this here as a future reminder.
let blueEngineActive = false;
let redEngineActive = false;

// Ship speed
let player1Speed = 1;
let player2Speed = 1;

// Defines the menu level and the game level, and sets them. Too add background variation, I put a lot of star sprites in there
const levels = [
  map`
hhhhhhhhhh
hihhhhhhjh
hhhhhhhhhh
hhhlmnohhh
hhhhhhhhhh
hhhhhhhhhh
hhhhhhhhhh
hhhhhhhhhh`,
  map`
p.qdefgp.s
..q.r.r..q
rs.q.q.sq.
.qs.rs.s.r
q.r..pq.p.
.q.r.s.r.q
b.q.s.q..c
rqsr.r.sp.`,
]
setMap(levels[0])

// This handles all the inputs, its pretty straightforward. W also has the ability to reset the game
onInput("s", () => {
  if(currentScreen == 1) {
    getFirst(player1).y += player1Speed
  }
})

onInput("w", () => {
  if(currentScreen == 1) {
    getFirst(player1).y -= player1Speed
  } else if(currentScreen === 0) {
    
    gameOver = false;
    clearText()
    setMap(levels[1])
    currentScreen = 1;
    setTimeout(() => {
      waiting = false;
    }, 2000);
    
  }
})

onInput("d", () => {
  if(currentScreen == 1) {
    getFirst(player1).x += player1Speed
  }
})

onInput("a", () => {
  if(currentScreen == 1) {
    getFirst(player1).x -= player1Speed
  }
})



onInput("k", () => {
  if(currentScreen == 1) {
    getFirst(player2).y += player2Speed
  }
})

onInput("i", () => {
  if(currentScreen == 1) {
    getFirst(player2).y -= player2Speed
  }
})

onInput("l", () => {
  if(currentScreen == 1) {
    getFirst(player2).x += player2Speed
  }
})

onInput("j", () => {
  if(currentScreen == 1) {
    getFirst(player2).x -= player2Speed
  }
})

// This moves the gate, it used to be a ring lol!
function moveRing(x, y) {
  getFirst(ring1).y += y
  getFirst(ring2).y += y
  getFirst(ring3).y += y
  getFirst(ring4).y += y

  getFirst(ring1).x += x
  getFirst(ring2).x += x
  getFirst(ring3).x += x
  getFirst(ring4).x += x
}

// This manages a bunch of things, none of them drawing the screen
function drawScreen() {
  // Making sure the game is active
  if(currentScreen == 1 && gameOver != true) {
    // Gate movement, resetting the gate when needed
    if(waiting != true) {
      let redPlayer = getFirst(player2);
      let bluePlayer = getFirst(player1);
    
      let ring1Ref = getFirst(ring1);
      let ring2Ref = getFirst(ring2);
      let ring3Ref = getFirst(ring3);
      let ring4Ref = getFirst(ring4);
      
      if(ring1Ref.y === 7) {
        resetRing();
      } else {
        moveRing(0, 1);
      }
    }

    // Clearing the screen's text because why not
    clearText();

    //Drawing the lives and level to the screen
    addText(blueLives.toString(), {x:1, y:1, color: color`7`});
    addText(redLives.toString(), {x:18, y:1, color: color`3`});

    addText(level.toString(), {x:1, y:14, color: color`2`});

  } else if (currentScreen === 0) {
    // This flips the title text from blue to red on the title screen!
    if (signColor === 3) {
      signColor = 7;
    } else if(signColor === 7) {
      signColor = 3;
    }
  }

  // And this is the function calling itself, it speeds up with the rings. That might cause issues butttttt I wont worry about it!
  setTimeout(() => {
    drawScreen();
  }, ringTime);
}

// This function resets the gate
function resetRing() {
  // good coding practice? hopefully? praise me
  if(gameOver) {
    return;
  }

  // Makes sure the gate doesn't get tooo fast.
  if(ringTime > 50) {
    ringTime -= 10;
  }

  // If a player didn't pass a gate, take away a life. This works because it only runs when the gate is at the bottom of the screen.
  if(blueSafe === false) {
    blueLives -= 1;
  }
  if(redSafe === false) {
    redLives -= 1;
  }

  // Makes the code wait, removes the gate, removes the confirmation checkmarks, and increases the level!!1
  waiting = true
  getFirst(ring1).remove();
  getFirst(ring2).remove();
  getFirst(ring3).remove();
  getFirst(ring4).remove();
  getAll(checkmark).forEach((sprite) => {sprite.remove()});
  getAll(checkmark2).forEach((sprite) => {sprite.remove()});
  level++;

  // Move the gate to a random place at the top of the screen, and give it a delay for the player to notice.
  // Also resets the redSafe and blueSafe, and some other variables
  setTimeout(() => {
      let newX = Math.floor(Math.random() * 6);
      if(gameOver != true) {
        addSprite(newX, 0, ring1);
        addSprite(newX + 1, 0, ring2);
        addSprite(newX + 2, 0, ring3);
        addSprite(newX + 3, 0, ring4);
      }
      setTimeout(() => {
        waiting = false;
      }, 200);
      redSafe = false;
      blueSafe = false;
  }, ringTime + 200);
}

// This function runs veryyyyy fast, so I'm using it to check a lot of things
function constantChecker() {
  // blah blah blah make sure the game isnt over or anything
  if(waiting != true && currentScreen == 1 && gameOver != true) {
    // simpler variable names
    let redPlayer = getFirst(player2);
    let bluePlayer = getFirst(player1);
  
    let ring1Ref = getFirst(ring1);
    let ring2Ref = getFirst(ring2);
    let ring3Ref = getFirst(ring3);
    let ring4Ref = getFirst(ring4);

    // This feels inefficient, but it checks each of the four gate sprites individually to see if a player is in the gate
    if(redPlayer.x == ring1Ref.x && redPlayer.y == ring1Ref.y ||
      redPlayer.x == ring2Ref.x && redPlayer.y == ring2Ref.y ||
      redPlayer.x == ring3Ref.x && redPlayer.y == ring3Ref.y ||
      redPlayer.x == ring4Ref.x && redPlayer.y == ring4Ref.y) {
      redSafe = true;
      addSprite(0, 6, checkmark2);
    }

    if(bluePlayer.x == ring1Ref.x && bluePlayer.y == ring1Ref.y ||
      bluePlayer.x == ring2Ref.x && bluePlayer.y == ring2Ref.y ||
      bluePlayer.x == ring3Ref.x && bluePlayer.y == ring3Ref.y ||
      bluePlayer.x == ring4Ref.x && bluePlayer.y == ring4Ref.y) {
      blueSafe = true;
      addSprite(0, 5, checkmark);
    }

    // This code checks if a player is touching each powerup, and deals out the effects.
    for(let i in activePowerUps) {
      powerUp = getFirst(activePowerUps[i]);
      powerupType = activePowerUps[i];
      // Health
      if(powerupType === "k") {
        if(powerUp.y === bluePlayer.y && powerUp.x === bluePlayer.x && blueLives < 9) {
          blueLives += 1;
          powerUp.remove();
          activePowerUps.splice(activePowerUps.indexOf(activePowerUps[i]), 1);
          resettingPowerUps.splice(resettingPowerUps.indexOf(activePowerUps[i]), 1);
        } else if(powerUp.y === redPlayer.y && powerUp.x === redPlayer.x && redLives < 9) {
          redLives += 1;
          powerUp.remove();
          activePowerUps.splice(activePowerUps.indexOf(activePowerUps[i]), 1);
          resettingPowerUps.splice(resettingPowerUps.indexOf(activePowerUps[i]), 1);
        }
      }
      // Stun
      if(powerupType === "v") {
        if(powerUp.y === bluePlayer.y && powerUp.x === bluePlayer.x) {
          player2Speed = 0;
          powerUp.remove();
          activePowerUps.splice(activePowerUps.indexOf(activePowerUps[i]), 1);
          resettingPowerUps.splice(resettingPowerUps.indexOf(activePowerUps[i]), 1);
          setTimeout(() => {
            player2Speed = 1;
          }, 2000);
        } else if(powerUp.y === redPlayer.y && powerUp.x === redPlayer.x) {
          player1Speed = 0;
          powerUp.remove();
          activePowerUps.splice(activePowerUps.indexOf(activePowerUps[i]), 1);
          resettingPowerUps.splice(resettingPowerUps.indexOf(activePowerUps[i]), 1);
          setTimeout(() => {
            player1Speed = 1;
          }, 2000);
        }
      }
      // Asteroid (considered a powerup)
      if(powerupType === "w") {
        if(powerUp.y === bluePlayer.y && powerUp.x === bluePlayer.x) {
          blueLives -= 1
          powerUp.remove();
          activePowerUps.splice(activePowerUps.indexOf(activePowerUps[i]), 1);
          resettingPowerUps.splice(resettingPowerUps.indexOf(activePowerUps[i]), 1);
        } else if(powerUp.y === redPlayer.y && powerUp.x === redPlayer.x) {
          redLives -= 1
          powerUp.remove();
          activePowerUps.splice(activePowerUps.indexOf(activePowerUps[i]), 1);
          resettingPowerUps.splice(resettingPowerUps.indexOf(activePowerUps[i]), 1);
        }
      }
    }

    
  // Then this adds the home screen text
  } else if (currentScreen === 0) {
    addText("Space Race", {x:5, y:1, color: `${signColor}`});
    addText("By Ler", {x:7, y:3, color: color`2`});
    addText("Press W to start", {x:2, y:11, color: color`2`});
    addText("(2 player)", {x:2, y:13, color: color`2`});
  }

  // This manages what happens when the game ends, such as the Player wins! text!!
  if(currentScreen === 1 && gameOver != true) {
    let winner = 0;
    if(blueLives === 0) {
      winner = 2;
    }
    if(redLives === 0) {
      winner = 1;
    }
    if(winner != 0) {
      waiting = true;
      //currentScreen = 0;
      if(winner === 1) {
        addText("Player " + winner.toString() + " wins!", {x:3, y:13, color: color`7`});
      } else {
        addText("Player " + winner.toString() + " wins!", {x:3, y:13, color: color`3`});
      }
      gameOver = true;
      winner = 0;
      blueLives = 3;
      redLives = 3;
      ringTime = 500;
      level = 0;
      getAll(checkmark).forEach((sprite) => {sprite.remove()});
      getAll(checkmark2).forEach((sprite) => {sprite.remove()});
      activePowerUps = [];
      resettingPowerUps = [];

      // Small timer before home screen
      setTimeout(() => {
         clearText()
         setMap(levels[0])
         currentScreen = 0;
      }, 3000);
    }
  }
}

setInterval(() => {constantChecker()}, 25);

// This moves the powerups!
function movePowerUp() {
  if(gameOver === false && currentScreen === 1) {
    // This moves them, and resets them when they reach the bottom of the screen
    for(let i in activePowerUps) {
      let powerUp = activePowerUps[i];
      getFirst(powerUp).y += 1;
      if(getFirst(powerUp).y === 7) {
        if(!resettingPowerUps.includes(powerUp)) {
          resetPowerUp(powerUp);
        }
      }
    }
    
    // This randomizes the powerup dropped
    let chance = Math.floor(Math.random() * 150);
  
    if(chance === 1) {
      if(!(resettingPowerUps.includes("k")) && !(activePowerUps.includes("k"))) {
        addSprite(Math.floor(Math.random() * 10), 0, "k");
        activePowerUps.push("k");
      }
    }

    if(chance === 2) {
      if(!(resettingPowerUps.includes("v")) && !(activePowerUps.includes("v"))) {
        addSprite(Math.floor(Math.random() * 10), 0, "v");
        activePowerUps.push("v");
      }
    }

    if(chance === 3) {
      if(!(resettingPowerUps.includes("w")) && !(activePowerUps.includes("w"))) {
        addSprite(Math.floor(Math.random() * 10), 0, "w");
        activePowerUps.push("w");
      }
    }

    // And this drops shooting stars!!
    if(chance < 5) {
      addSprite(Math.floor(Math.random() * 10), 0, "t");
    }
  }
}

// This resets the powerups, it took me way too long for some reason, I dont wanna think about it anymore.
function resetPowerUp(powerUp) {
  if(gameOver === false && currentScreen === 1 && !resettingPowerUps.includes(powerUp)) {
    resettingPowerUps.push(powerUp);
    setTimeout(() => {
      try {
        getFirst(powerUp).remove();
        activePowerUps.splice(activePowerUps.indexOf(powerUp), 1);
        resettingPowerUps.splice(resettingPowerUps.indexOf(powerUp), 1);
      } catch {
        //uuh.. i hope its gone
      }
      // Random timeout before the powerup drops again
      setTimeout(() => {
          if(gameOver != true) {
            activePowerUps.push(powerUp);
            addSprite(Math.floor(Math.random() * 10), 0, powerUp);
          }
      }, (Math.random() * 50) * ringTime);
    }, 250);
  }
     
}

setInterval(() => {movePowerUp()}, 200);

// This moves the shooting stars that you see sometimes
function moveShootingStars() {
  let shootingStars = getAll("t");

  shootingStars.forEach((star) => {
    star.y += 1;
    if(star.y === 7) {
      setTimeout(() => {
        star.remove();
      }, 50);
    }
  });
}

setInterval(() => {moveShootingStars()}, 50);

drawScreen();

// CONGRATULATIONS!!! YOU REACHED THE ENDD! You're cool! Thank you for reading :D
// I hope my code was alright, it's not my best work!
// And I hope you enjoy the gamee!
