/*
@title: Escape the evil moving purple block
@author: Owski
@tags: []
@addedOn: 2024-07-29
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
***INFO***
in level one make sure to get to the yellow box to achieve,
this is also true for level 2
if the game is to hard adjust your health to 80000000

*/
var gameRunning = true;
const player = "p"
const wall = "w"
const obstacle = "o"
let health = 3
const damage = 1
const win = "n"
const winX = 0
const winY = 2
const movingObstacle = "m"
const movingEnemy = "e"
const movingDisc = "j"
const enemy = getFirst(movingEnemy)
const healy = "h"
const disc = "u"
const win2X = 15
const win2 = "f"
const win2Y = 15
let level2 = map`
wpwwwwwwwwwwwwww
w..............w
w..............w
wwwww..........w
w...w.....o.o..w
w..ow.m..mw.w..w
w.mww..oo......w
w.....wwww.....w
w.....w..wwww..w
wwwwwww..ww....w
ww............jw
ww............ww
w..o.o.o.o.oooow
w.wwwwwwwwwwwwww
w....w...w....ww
w.o..........o.f
w.w.w...w..w.w.w
wwwwwwwwwwww...w
wwwwwwwwwwwwwwww`

// Update the subsequent code referring to the level2 variable as needed

// Example - Using level2 in setMap() function


setLegend(
  [ player, bitmap`

................
................
................
.........44.....
........D.......
......99999.....
......00900.....
......99999.....
......09990.....
.......000......
........0.......
........0.......
......0.0.0.....
......00000.....
........0.......
........0.......` ],
  [ wall, bitmap`
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
  [ obstacle, bitmap `
................
................
........0.......
.......010......
...3..01110.....
....33011103....
.....331133.....
.....0111110....
....033113300...
...0011111110...
...0111111110...
..001113331110..
..0111311133100.
.00113111113110.
.01111111111110.
0011111111111100`, { damage: 10 } ],
  [ win, bitmap `
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
6666666666666666` ],
  [ movingObstacle, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHH3HH
HHH333HHHHH333HH
HHHHH333HH33HHHH
HHHHHHHHHHHHHHHH
HHHH33HHH33333HH
HHHH33HHH33333HH
HHHHHHHHH33333HH
HHHHHHHHHHHHHHHH
HHHHHH333HHHHHHH
HHHHH33HH33HHHHH
HHHH3HHHHH33HHHH
HHH33HHHHHH33HHH
HHHHHHHHHHHH3HHH
HHHHHHHHHHHHHHHH` ],
  [ movingEnemy, bitmap `
................
.........333....
.....33....3....
......33........
.....33..33.....
...003300330000.
..0000000000000.
..0000333000000.
..0003000300000.
..0000000000000.
...000000000000.
................
................
................
................
................` ],
  [ healy, bitmap `
.......00.......
......0220......
..3....00..3....
.333..0770333...
..3...0770.3....
......0770......
....00777700....
...0777770770...
...0777705070...
...0777770770...
..077707777770..
..077050777770..
..077707777770..
...0777777770...
....07777770....
.....000000.....` ],
  [movingDisc, bitmap `
.....33...33....
.......3.3......
.....3300033....
...00300000300..
...00330003300..
..0003000003000.
..0003300033000.
..0000000000000.
..0000000000000.
..0000333330000.
..0003300033000.
...03300000330..
...00000000000..
.....0000000....
................
................`],
  [ win2, bitmap `
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
6666666666666666` ]

)

setSolids([ player, wall, ])

let level = 0
const levels = [
  map`
wwwwwwwwwww
wwwwwwwwwww
nwwwwwwwwww
.........ew
h.wwwwwwwww
w...mmm...w
w.........w
wwwwwwwww.w
w.........w
w.oooooooow
w.wwwwwwwww
w.........w
woooooo..pw
wwwwwwwwwww`
]

setMap(levels[0])

setPushables({
  [ player ]: []
})

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
  
      if (tilesWith(obstacle, player).length >= 1) {
        health = 0
      }
    if (health <= 0) {
      gameRunning = false;
      clearText()
      addText("Game Over!", {
        x: 5,
        y: 6,
        color: color`3`
      });
    }
afterInput(() => {
  let currentPlayer = getFirst(player); // Rename the variable to avoid conflicts 
  if (tilesWith(obstacle, player).length >= 1) {
        health = 0
      }
    clearText()
    addText(`Health: \n ${health}`, {
    x: 10,
    y: 1,
    color: color`3`
  });
  if (health <= 0) {
      gameRunning = false;
      clearText()
      addText("Game Over!", {
        x: 5,
        y: 6,
        color: color`3`
      });
    }
  addText(`X:${currentPlayer.x},Y ${currentPlayer.y}`, {
  x: 0,
  y: 1,
  color: color`3`
});
  // Create a tune:
const melody = tune`
500: E4~500,
500: G4~500,
500: B4~500,
500: A4~500,
500: F4~500,
500: G4~500,
500: B4~500,
500: A4~500,
500: F4~500,
500: E4~500,
11000`
const melody2 = tune `
1500,
500: G4~500,
500,
500: A4~500,
500,
500: B4~500,
500: B4~500,
500,
500: B4~500,
500: A4~500,
500: A4~500 + C5^500,
500,
500: G4~500,
500: B4^500,
8000`
// Play it:
  if (health <= 0) {
      gameRunning = false;
    playTune(melody)
    }


afterInput(() => {
  let currentPlayer = getFirst(player);

  // Check if the player reaches the Healy object
  if (currentPlayer.x === 0 && currentPlayer.y === 4) {
    let tilehealy = getTile(0, 4);
    
    // Check if the Healy object exists in the tile
    let healySprite = tilehealy.find(sprite => sprite.type === healy);
    
    if (healySprite) {
      healySprite.remove(); // Remove the Healy object
      health += 1; // Increase player's health by 1
    }
  }
});







// Check if the player reaches the win condition point
afterInput(() => {
  let currentPlayer = getFirst(player);
  if (currentPlayer.x === winX && currentPlayer.y === winY) {
    gameRunning = true;
    playTune(melody2);
    clearText();
    let level = 1;
    addText("You Win!", {
      x: 5,
      y: 6,
      color: color`3`
    });
    setMap(level2);
    // Add any additional win condition logic here
  }
});
  // Check if the player reaches the win condition point
afterInput(() => {
  let currentPlayer = getFirst(player);
  if (currentPlayer.x === win2X && currentPlayer.y === win2Y) {
    gameRunning = false;
    playTune(melody2);
    clearText();
    addText("You Win!", {
      x: 5,
      y: 6,
      color: color`3`
    });
    // Add any additional win condition logic here
  }
});

setSolids([ player, wall,])

// Define a generic moveObstacle function for all moving obstacles
function moveObstacle(obstacleSprite) {
    if (obstacleSprite.dy === 0) {
        obstacleSprite.dy = 1; // Set the initial direction to move down
    } else {
        if (obstacleSprite.y <= 5 && obstacleSprite.dy === -1) {
            obstacleSprite.dy = 1; // Change the direction to move down when at the top boundary
        } else if (obstacleSprite.y >= 6 && obstacleSprite.dy === 1) {
            obstacleSprite.dy = -1; // Change the direction to move up when at the bottom boundary
        }
    }
    obstacleSprite.y += obstacleSprite.dy;
}

// Apply the moveObstacle function to all moving obstacle sprites
getAll(movingObstacle).forEach(obstacle => {
    setInterval(() => {
        moveObstacle(obstacle);
    }, 2000); // Adjust the interval timing as needed
  });

  // Handle collision between player and moving obstacle
  if (tilesWith(player, movingObstacle).length >= 1) {
    health -= damage;
  }
  
  // Check if player's health reaches 0
  if (health <= 0) {
    gameRunning = false;
    clearText();
    addText("Game Over!", { x: 5, y: 6, color: color`3` });
  }

  // Define the initial position and movement direction of the enemy
  if (level === 0) {
addSprite(9, 3, movingEnemy);

    const enemy = getFirst(movingEnemy);

    if (enemy) {
        if (enemy.x > 0) { 
            enemy.x -= 1; 
        } else {
            enemy.remove(); 
            setTimeout(() => {
                addSprite(9, 3, movingEnemy); 
            }, 2000); 
        }

        // Handle collision between player and moving enemy
        if (tilesWith(player, movingEnemy).length >= 1) {
            health -= damage; 
            if (health <= 0) {
                gameRunning = false;
                clearText();
                addText("Game Over!", { x: 5, y: 6, color: color`3` });
            }
        }
    }
  }

  if (level === 1) {
addSprite(14, 11, movingDisc);
  }
    const disc = getFirst(movingDisc);

    if (disc) {
        if (disc.x > 2) { 
          setInterval(() => {
            disc.x -= 1; 
            }, 300);
        } else {
            disc.remove(); 
            setTimeout(() => {
                addSprite(14, 11, movingDisc); 
            }, 2000); 
        }

        // Handle collision between player and moving enemy
        if (tilesWith(player, movingDisc).length >= 1) {
            health -= damage; 
            if (health <= 0) {
                gameRunning = false;
                clearText();
                addText("Game Over!", { x: 5, y: 6, color: color`3` });
            }
        }
    }
  

// Define start positions for each disc
//const discStartPositions = {
  //  disc1: { x: 14, y: 14 },
  //  disc2: { x: 14, y: 11 },
 //   disc3: { x: 14, y: 10 }
//};

// Reset disc position based on its type
//function resetDiscPosition(discSprite) {
  // const discStartPosition = discStartPositions[discSprite.type];
 //   if (discStartPosition) {
  //      discSprite.x = discStartPosition.x;
   //     discSprite.y = discStartPosition.y;
        // Ensure the disc sprite's bitmap correspond to its type (if needed)
   //     discSprite.bitmap = bitmap` 
// Use the correct bitmap for the disc type
  //  }
//}


// Add disc movement logic
//function moveDiscs() {
  //  getAll(disc).forEach(discSprite => {
  //      setInterval(() => {
 //           if (!gameRunning) return; // Stop disc movement when the game is not running

//            let nextX = discSprite.x - 1; // Calculate the next position to the left of the disc
//            let nextTile = getTile(nextX, discSprite.y);

//            if (nextTile.some(tileSprite => tileSprite.type === wall)) {
                // If there is a wall to the left, handle disc removal and reset
 //               discSprite.remove();
//                setTimeout(() => {
//                    resetDiscPosition(discSprite);
//                    addSprite(discSprite.x, discSprite.y, discSprite.type);
 //              }, 2000); // Reset after 2 seconds
//            } else {
//                discSprite.x -= 1; // Move the disc left
 //           }
 //       }, 300); // Move the disc left every 0.3 seconds
//    });
//}

//moveDiscs();








})
      



