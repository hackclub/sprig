/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Donkey Kong
@author: Pratyush Verma
@tags: ['retro', 'action']
@addedOn: 2024-11-12
*/

const player = "p"
const player2 = "w"
const fill = "f"
const fire1 = "g"
const fire2 = "z"
const firebarrel = "b"
const beams = "e"
const pipe = "0"
const beams2 = "q"
const ladderbeam = "k"
const princess = "P"
const kong1 = "a"
const kong2 = "c"
const kong3 = "d"
const kong4 = "x"
const barrel1 = "r"
const barrel2 = "s"
const barrel3 = "t"
const barrel4 = "u"
const ladder = 'l'
const titleFont = 'h'
const I = '1'
const t = '2'
const o = '3'
const r = '4'
const e = '5'
const s = '6'
const a = '7'

const Main = map`
................................
................................
................................
...hhh..hhh.h..h.h..h.hhh.h.h...
...hh.h.h.h.hh.h.hhh..h...h.h...
...hh.h.h.h.hhhh.hh...hhh.hhh...
...hh.h.h.h.h.hh.h.h..h....h....
...hhh..hhh.h..h.h..h.hhh..h....
................................
.......h..h.hhh.h..h.hhhh.......
.......hhh..h.h.hh.h.h..........
.......hh...h.h.hhhh.h.hh.......
.......h.h..h.h.h.hh.h..h.......
.......h..h.hhh.h..h.hhhh.......
................................
................................
................................
................................
..........1..23..62742..........
................................
................................
................................
................................
................................
................................
................................
................................`;
const GameOver = map`
.........................
.........................
..hhhh..hhhhh.h...h.hhh..
..h.....h...h.hh.hh.h....
..h.....h...h.h.h.h.hhh..
..h..hh.hhhhh.h.h.h.h....
..h...h.h...h.h...h.h....
..hhhhh.h...h.h...h.hhh..
.........................
.........................
..hhhhh.h...h.hhh.hhhhh..
..h...h.h...h.h...h...h..
..h...h.h...h.hhh.hhhhh..
..h...h.h...h.h...h.h....
..h...h..h.h..h...h..h...
..hhhhh...h...hhh.h...h..
.........................
.........................
.........................
.......1.23.4562742......
.........................
.........................
.........................
.........................`;
const win = map`
.........................
.P...h...h.hhhh.h..h...P.
.....h...h.h..h.h..h.....
.P...h...h.h..h.h..h...P.
......h.h..h..h.h..h.....
.P.....h...h..h.h..h...P.
.......h...h..h.h..h.....
.P.....h...hhhh.hhhh...P.
.........................
.P...h.h.h.hhhh.h..h...P.
.....h.h.h..hh..hh.h.....
.P...h.h.h..hh..h.hh...P.
.....h.h.h..hh..h..h.....
.P...h.h.h..hh..h..h...P.
.....hhhhh.hhhh.h..h.....
.P.....................P.
.........................
.P.....................P.
.........................
.P.....1.23.4562742....P.
.........................
.P.....................P.
.........................
.P.....................P.`;

var gameOver = false;
var hasWon = false;
var MainTrue = true;









setLegend(
  [player, bitmap`
......333.......
.....3333333....
.....55522......
....52522522....
....525522522...
...555222555....
.....222222.....
....555555......
...55553355.....
...55533633.....
...555333333....
...352223333....
...332233333....
...33333333.....
...55....55.....
...555...555....`],
  [player2, bitmap`
.......333......
....3333333.....
......22555.....
....22522525....
...225225525....
....555222555...
.....222222.....
......555555....
.....55335555...
.....33633555...
....333333555...
....333322253...
....333332233...
.....33333333...
.....55....55...
....555...555...`],
  [fill, bitmap`
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
  [fire1, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000900000000
0000090009000000
0092009002000000
0009000039000900
0000099090900200
0029993093999000
0099399900099000
0093999399923900`],
  [fire2, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000900
0000000000009300
0000000209092900
0000000009393900
0000000909009000
0000099302930000
0000990039000900
0009929090999200
0029993093999000
0099399900099000
0093999399923900`],
  [firebarrel, bitmap`
0039900390000900
0009309929003900
0039929399239300
0525555555555550
0052555555555500
0072777777777700
0052555555555500
0052777577575500
0052757577575500
0052777577577500
0052555555555500
0052555555555500
0072777777777700
0052555555555500
0052522522525500
0525555555555550`],
  [beams, bitmap`
3333333333333333
3333333333333333
0000000330000000
0000003333000000
0000003003000000
0000033003300000
0000330000330000
0000330000330000
0003300000033000
0003000000003000
0033000000003300
0330000000000330
0330000000000330
3300000000000033
3333333333333333
3333333333333333`],
  [pipe, bitmap`
4444444444444444
DDDD44DDDDDD4DDD
4DDD44DDDDD4DDDD
4DDD44DDDDDD4DDD
4DDD44DDDDD4DDDD
4DDD44DDDDDD4DDD
4DDD44DDDDD4DDDD
444DD44DDDDD4DDD
004DD44DDDD4DD00
004DD44DDDDD4D00
004DD44DDDD4DD00
004DD44DDDDD4D00
004DD44DDDD4DD00
004DD44DDDDD4D00
004DD44DDDD4DD00
004DD44DDDDD4D00`],
  [beams2, bitmap`
3330000000000333
3333000000003333
3303000000003033
3303300000033033
3300330000330033
3300033333300033
3300003333000033
3300000330000033
3300000330000033
3300003333000033
3300003333000033
3300033003300033
3300330000330033
3303300000033033
3303300000033033
3333000000003333`],
  [princess, bitmap`
0000099999900000
0000992222999900
0000022022999990
0000002222999900
0000088228899000
0000008888800000
0022888888000000
0002888880000000
0000088800000000
0000888888000000
0022888888280000
0028888882288800
0008222222882200
0002888888829900
0002222222299000
0099909000990000`],
  [kong1, bitmap`
09CCC999999C9999
009CCCCCCCC99999
0009CCCCCCC99C99
00009999CCC99999
0000009C999C9999
0000009CCCCCC999
000009CCCCCCCC99
00009CCCCCCCCCC9
0009CCCCCCCC9999
009CCCCCCCC90000
009CCCCCCC900000
009CCCCCC9000000
009CCCCC90000000
09CCCCCC90000000
9C9C9CC900000000
9999999000000000`],
  [kong2, bitmap`
9999C999999CCC90
99999CCCCCCCC900
99C99CCCCCCC9000
99999CCC99990000
9999C999C9000000
999CCCCCC9000000
99CCCCCCCC900000
9CCCCCCCCCC90000
9999CCCCCCCC9000
00009CCCCCCCC900
000009CCCCCCC900
0000009CCCCCC900
00000009CCCCC900
00000009CCCCCC90
000000009CC9C9C9
0000000009999999`],
  [kong3, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000999
00000000000999C9
000000000099922C
0000000000999209
0000000099CC999C
00000999CCC99999
00099CCCCCC999CC
009CCCCCCCCC9CCC
09CCCCCCCCCCCC99
09CCCCCCCCCCCCCC
099CC9CCCCCCCCCC`],
  [kong4, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
9990000000000000
9C99900000000000
C229990000000000
9029990000000000
C999CC9900000000
99999CCC99900000
CC999CCCCCC99000
CCC9CCCCCCCCC900
99CCCCCCCCCCCC90
CCCCCCCCCCCCCC90
CCCCCCCCCC9CC990`],
  [barrel1, bitmap`
....CCCCCCCC....
...C99999999C...
..C5C99999999C..
.C9C5C99999999C.
C999C5C99999999C
C999C5C99999999C
C9999C5C9999999C
C99999C5C999999C
C999999C5C99999C
C9999999C5C9999C
C9999999C5C9999C
C99999999C5C999C
.C99999999C5C9C.
..C99999999CCC..
...C99999999C...
....CCCCCCCC....`],
  [barrel2, bitmap`
....CCCCCCCC....
...C99999999C...
..C5C99999999C..
.C9C5C99999999C.
C999C5C99999999C
C999C5C99999999C
C9999C5C9999999C
C99999C5C999999C
C999999C5C99999C
C9999999C5C9999C
C9999999C5C9999C
C99999999C5C999C
.C99999999C5C9C.
..C99999999C5C..
...C99999999C...
....CCCCCCCC....`],
  [barrel3, bitmap`
....CCCCCCCC....
...C99999999C...
..C5C99999999C..
.C9C5C99999999C.
C999C5C99999999C
C999C5C99999999C
C9999C5C9999999C
C99999C5C999999C
C999999C5C99999C
C9999999C5C9999C
C9999999C5C9999C
C99999999C5C999C
.C99999999C5C9C.
..C99999999CCC..
...C99999999C...
....CCCCCCCC....`],
  [barrel4, bitmap`
....CCCCCCCC....
...C99999999C...
..C5C99999999C..
.C9C5C99999999C.
C999C5C99999999C
C999C5C99999999C
C9999C5C9999999C
C99999C5C999999C
C999999C5C99999C
C9999999C5C9999C
C9999999C5C9999C
C99999999C5C999C
.C99999999C5C9C.
..C99999999CCC..
...C99999999C...
....CCCCCCCC....`],
  [ladder, bitmap`
.77..........77.
.77777777777777.
.77777777777777.
.77..........77.
.77..........77.
.77777777777777.
.77777777777777.
.77..........77.
.77..........77.
.77777777777777.
.77777777777777.
.77..........77.
.77..........77.
.77777777777777.
.77777777777777.
.77..........77.`],
  [ladderbeam, bitmap`
3733333333333373
3777777777777773
0777777777777770
0700003333000070
0700003003000070
0777777777777770
0777777777777770
0700330000330070
0703300000033070
0777777777777770
0777777777777770
0730000000000370
0730000000000370
3777777777777773
3777777777777773
3733333333333373`],
  [titleFont, bitmap`
7777777777777777
7777777777777777
5555555555555555
5555555555555555
5555000000005555
5550000000000555
5500000000000055
5500000000000055
5500000000000055
5500000000000055
5550000000000555
5555000000005555
5555555555555555
5555555555555555
7777777777777777
7777777777777777`],
  [I, bitmap`
9999999999999999
9999999999999999
9999999999999999
......9999......
......9999......
......9999......
......9999......
......9999......
......9999......
......9999......
......9999......
......9999......
......9999......
9999999999999999
9999999999999999
9999999999999999`],
  [t, bitmap`
.99999999999999.
.99999999999999.
.99999999999999.
......9999......
......9999......
......9999......
......9999......
......9999......
......9999......
......9999......
......9999......
......9999......
......9999......
......9999......
......9999......
......9999......`],
  [o, bitmap`
..999999999999..
..999999999999..
..999999999999..
..999......999..
..999......999..
..999......999..
..999......999..
..999......999..
..999......999..
..999......999..
..999......999..
..999......999..
..999......999..
..999999999999..
..999999999999..
..999999999999..`],
  [r, bitmap`
..999999999999..
..999999999999..
..999999999999..
..999......999..
..999......999..
..999999999999..
..999999999999..
..999999999999..
..999..999......
..999..999......
..999....999....
..999....999....
..999......999..
..999......999..
..999......999..
..999......999..`],
  [e, bitmap`
..999999999999..
..999999999999..
..999999999999..
..999...........
..999...........
..999...........
..9999999999....
..9999999999....
..9999999999....
..999...........
..999...........
..999...........
..999...........
..999999999999..
..999999999999..
..999999999999..`],
  [s, bitmap`
..999999999999..
..999999999999..
..999999999999..
..999...........
..999...........
..999...........
..999999999999..
..999999999999..
..999999999999..
...........999..
...........999..
...........999..
...........999..
..999999999999..
..999999999999..
..999999999999..`],
  [a, bitmap`
..999999999999..
..999999999999..
..999999999999..
..999......999..
..999......999..
..999......999..
..999......999..
..999999999999..
..999999999999..
..999999999999..
..999......999..
..999......999..
..999......999..
..999......999..
..999......999..
..999......999..`],

)



setBackground(fill)
setSolids([firebarrel, player, player2, beams, pipe, beams2, fire1, kong1, kong2, kong3, kong4])




let level = 0
const levels = [
  map`
...q.............
...q...........P.
dx.eeekeeeeeeeeee
ac....l..........
eer...l..........
eeeeeeeeeeeeeeeek
................l
...............sl
keeeeeeeeeeeeeeee
l................
lt...............
eeeeeeeeeeeeeeeek
gp..............l
b0.............ul`
]
setMap(levels[level])


levels.push(GameOver);
levels.push(win);
levels.push(Main);


function switchToLevel(newLevelIndex) {
  setMap(levels[newLevelIndex]);
}

let playerDirection = player

function getPlayerDirection() {
  return getFirst(playerDirection);
}

const speed = 50

function moveBarrel1() {
  const Barrel1 = getFirst(barrel1);
  
  
  const moveRight = () => {
    const intervalId = setInterval(() => {
      if (Barrel1.x < width() - 1) {
        Barrel1.x += 1;
      } else {
        clearInterval(intervalId);
        moveLeft();
      }
    }, speed); // Move every half second
  };

  const moveLeft = () => {
    const intervalId = setInterval(() => {
      if (Barrel1.x > 0) {
        Barrel1.x -= 1;
      } else {
        clearInterval(intervalId);
        moveRight();
      }
    }, speed); // Move every half second
  };

  moveRight(); // Start moving to the right initially
}

function moveBarrel2() {
  const Barrel2 = getFirst(barrel2);

  const moveLeft = () => {
    const intervalId = setInterval(() => {
      if (Barrel2.x > 0) {
        Barrel2.x -= 1;
      } else {
        clearInterval(intervalId);
        moveRight();
      }
    }, speed); // Move every half second
  };

  const moveRight = () => {
    const intervalId = setInterval(() => {
      if (Barrel2.x < width() - 1) {
        Barrel2.x += 1;
      } else {
        clearInterval(intervalId);
        moveLeft();
      }
    }, speed); // Move every half second
  };

  moveLeft(); // Start moving to the left initially
}

function moveBarrel3() {
  const Barrel3 = getFirst(barrel3);
  
  const moveRight = () => {
    const intervalId = setInterval(() => {
      if (Barrel3.x < width() - 1) {
        Barrel3.x += 1;
      } else {
        clearInterval(intervalId);
        moveLeft();
      }
    }, speed); // Move every half second
  };

  const moveLeft = () => {
    const intervalId = setInterval(() => {
      if (Barrel3.x > 0) {
        Barrel3.x -= 1;
      } else {
        clearInterval(intervalId);
        moveRight();
      }
    }, speed); // Move every half second
  };

  moveRight(); // Start moving to the right initially
}

function moveBarrel4() {
  const Barrel4 = getFirst(barrel4);

  const moveLeft = () => {
    const intervalId = setInterval(() => {
      if (Barrel4.x > 0) {
        Barrel4.x -= 1;
      } else {
        clearInterval(intervalId);
        moveRight();
      }
    }, speed); // Move every half second
  };

  const moveRight = () => {
    const intervalId = setInterval(() => {
      if (Barrel4.x < width() - 1) {
        Barrel4.x += 1;
      } else {
        clearInterval(intervalId);
        moveLeft();
      }
    }, speed); // Move every half second
  };

  moveLeft(); // Start moving to the left initially
}

const startMovingBarrels = () => {
  moveBarrel1();
  moveBarrel2();
  moveBarrel3();
  moveBarrel4();
}

switchToLevel(3);

function handlePlayerBarrelCollisions() {
  const playerSprite = getFirst(player);
  const barrelSprites = getAll(barrel1).concat(getAll(barrel2), getAll(barrel3), getAll(barrel4));




  // Check for collisions with each barrel sprite
  barrelSprites.forEach(barrelSprite => {
    if (playerSprite.x === barrelSprite.x && playerSprite.y === barrelSprite.y) {
      switchToLevel(1);
      gameOver = true;

    }});
}

function checkWinCondition() {
  const playerSprite = getFirst(player);
  const princessSprite = getFirst(princess);

  if (playerSprite.x === princessSprite.x && playerSprite.y === princessSprite.y) {
    hasWon = true;
    switchToLevel(2); // Change to level two if player reaches princess
  }
}

onInput("k", () => {
  getPlayerDirection().y -= 1

  setTimeout(() => {
    getPlayerDirection().y += 1
  }, 500);

});

onInput("i", () => {
  if(gameOver) {
    switchToLevel(0);
    startMovingBarrels();
    gameOver = false;
  }
  if(hasWon) {
    switchToLevel(0);
    startMovingBarrels(); 
    hasWon = false;
  }
  if(MainTrue) {
    switchToLevel(0);
    startMovingBarrels();
    MainTrue = false;
  }


});

onInput("s", () => {
  getPlayerDirection().y += 1;

});

onInput("w", () => {
  const playerSprite = getFirst(player);
  const ladderSprite = tilesWith(ladder).flat();
  const ladderBeamSprites = tilesWith(ladderbeam).flat(); // Get all ladderbeam sprites

  ladderSprite.concat(ladderBeamSprites).forEach(ladderSprite => {
    if (playerSprite.x === ladderSprite.x && playerSprite.y === ladderSprite.y) {
      // Player is touching a ladder or ladderbeam tile
      getPlayerDirection().y -= 1; // Move the player up
    }
  });

});

onInput("a", () => {
  const currentPlayer = getPlayerDirection();
  const playerx = getPlayerDirection().x;
  const playery = getPlayerDirection().y;
  currentPlayer.scale = -5
  currentPlayer.x -= 1;



});

onInput("d", () => {
  const currentPlayer = getPlayerDirection();
  currentPlayer.x += 1;


});

function gameLoop() {
  // Check for collisions between player and barrels
  handlePlayerBarrelCollisions();

  // Check for winning condition


  // Additional game logic can be added here

  // Request the next animation frame to continue the game loop
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();

function winLoop() {
  const currentPlayer = getPlayerDirection();

  if (currentPlayer) {
    checkWinCondition();
  }

  requestAnimationFrame(winLoop);
}

winLoop();

afterInput(() => {
  const currentPlayer = getPlayerDirection();
  const targetXCoordinate = 2; // Specify the target x coordinate
  const targetYCoordinate = 12; // Specify the target y coordinate

  // Check if the player is at the exact specified coordinates
  if (currentPlayer.x === targetXCoordinate && currentPlayer.y === targetYCoordinate) {
    currentPlayer.y += 1; // Adjust the y position by adding 1
  }
});
