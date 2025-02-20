/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: The Hidden Cheese
@author: Jayden Chun
@tags: ['puzzle', 'memory']
@addedOn: 2024-12-12

A simple mind-stretching single player game to warm-up your mind!
Consume as many pieces of cheese as you can!
Dodge enemies!
Memorize patterns!

W - Move Up
A - Move Left
S - Move Down
D - Move Right
*/


const ground = "g"
const poison = "n"
const player = "p"
const upPlayer = "1"
const downPlayer = "2"
const leftPlayer = "3"
const mimicPlayer = "P"
const upPlayerM = "4"
const downPlayerM = "5"
const leftPlayerM = "6"
const enemy = "e"
const mimicEnemy = "E"
const enemy3 = "8"
const enemy4 = "9"
const door = "d"
const key = "k"
const glasses = "l"
const cheese = "c"
const wall = "w"
const box = "b"
const mimicBox = "B"
const inverser = "i"
const mimicInverser = "I"
const text = "t"

let positionTimer = 10
//decrement as the levels progress
let mimicMovement = 1
let playerMovement = 1
let enemyMovement = 1

//music
const backgroundMusic = new Audio('Downloads/mouseGame.mp3')
//const playback = playTune(backgroundMusic, Infinity)
backgroundMusic.loop = true; // Loop the music
backgroundMusic.volume = 1.0
backgroundMusic.play();

setLegend(
  [player, bitmap`
DCDCCCDDDDDDDDDD
CDDDDCDCCDDDDDDD
CCD444DDCCDDD444
DDDDDDCCCCCCCCD4
DDDDDDDDDDDDDDDD
8DDDDD1DD1DDDDDD
88DLL1L11LDDDDDD
D88L111010DDDDCC
DDDL11L1118DD4CD
DDDLLLLLLLDDD4CD
DDDD1DDD1DDDD4DD
D4DDDDDDDDDDD4DD
DD4DDDDDDDDDDCDD
DD44CC4CCC4CCDDD
DDCCDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [upPlayer, bitmap`
DCDCCCDDDDDDDDDD
CDDDDCDCCDDDDDDD
CCD444DDCCDDD444
DDDD11111CCCCCD4
DDDD11111DDDDDDD
4DDDLL11LDDDDDDD
DDDDL111LDDD44DD
D4DD1L11LDDD4DCC
DDDD11111DD4D4CD
DDDD11111DD4D4CD
DDDDDD84DDDDD4DD
D4DDDDD84DDDD4DD
DD4DDDDD8DDDDCDD
DD44CC48CC4CCDDD
DDCCDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [downPlayer, bitmap`
DCDCCCDDDDDDDDDD
CDDDDCDCCDDDDDDD
CCD444DDCCDDD444
DDDDDDD88CCCCCD4
DDDDDD88DDDDDDDD
4DDDDD8DDDDDDDDD
DDDDDD8DDDDD44DD
D4DD11111DDD4DCC
DDDD1111LDD4D4CD
DDDDL11LLDD4D4CD
DDDDL11L1DDDD4DD
D4DDL11L1DDDD4DD
DD4D11111DDDDCDD
DD4411111C4CCDDD
DDCCDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [leftPlayer, bitmap`
DCDCCCDDDDDDDDDD
CDDDDCDCCDDDDDDD
CCD444DDCCDDD444
DDDDDDCCCCCCCCD4
DDDDDDDDDDDDDDDD
DDD1DD1DDDDD8DDD
DDDL11L1LLD88DDD
DDD010111L88DDCC
DD8111111LDDD4CD
DDDLLLLLLLDDD4CD
DDDD1DDD1DDDD4DD
D4DDDDDDDCCDDD44
DD4DDDDDDCCDDDDD
DD44CC4CDDDC44CD
DDCCDDDDCD44DCCD
DDDDDDDDDDDDDDDD`],
  [upPlayerM, bitmap`
DCDCCCDDDDDDDDDD
CDDDDCDCCDDDDDDD
CCD444DDCCDDD444
DDDD11111CCCCCD4
DDDD11111DDDDDDD
4DDDLL11LDDDDDDD
DDDDL111LDDD44DD
D4DD1L11LDDD4DCC
DDDD11111DD4D4CD
DDDD11111DD4D4CD
DDDDDD84DDDDD4DD
D4DDDDD84DDDD4DD
DD4DDDDD8DDDDCDD
DD44CC48CC4CCDDD
DDCCDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [downPlayerM, bitmap`
DCDCCCDDDDDDDDDD
CDDDDCDCCDDDDDDD
CCD444DDCCDDD444
DDDDDDD88CCCCCD4
DDDDDD88DDDDDDDD
4DDDDD8DDDDDDDDD
DDDDDD8DDDDD44DD
D4DD11111DDD4DCC
DDDD1111LDD4D4CD
DDDDL11LLDD4D4CD
DDDDL11L1DDDD4DD
D4DDL11L1DDDD4DD
DD4D11111DDDDCDD
DD4411111C4CCDDD
DDCCDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [leftPlayerM, bitmap`
DCDCCCDDDDDDDDDD
CDDDDCDCCDDDDDDD
CCD444DDCCDDD444
DDDDDDCCCCCCCCD4
DDDDDDDDDDDDDDDD
DDD1DD1DDDDD8DDD
DDDL11L1LLD88DDD
DDD010111L88DDCC
DD8111111LDDD4CD
DDDLLLLLLLDDD4CD
DDDD1DDD1DDDD4DD
D4DDDDDDDCCDDD44
DD4DDDDDDCCDDDDD
DD44CC4CDDDC44CD
DDCCDDDDCD44DCCD
DDDDDDDDDDDDDDDD`],
  [text, bitmap`
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
  [mimicPlayer, bitmap`
DCDCCCDDDDDDDDDD
CDDDDCDCCDDDDDDD
CCD444DDCCDDD444
DDDDDDCCCCCCCCD4
DDDDDDDDDDDDDDDD
8DDDDD1DD1DDDDDD
88DLL1L11LDDDDDD
D88L111010DDDDCC
DDDL11L1118DD4CD
DDDLLLLLLLDDD4CD
DDDD1DDD1DDDD4DD
D4DDDDDDDDDDD4DD
DD4DDDDDDDDDDCDD
DD44CC4CCC4CCDDD
DDCCDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [enemy, bitmap`
DDDDDDDDDD3333DD
33DDDDDDDDDDD33D
33DD11111111DD3D
3DD1L000000L1DDD
3D1L00000000L1DD
3D100300003001DD
DD100030030001DD
DD100000000001DD
3D100000000001DD
DD100033330001DD
DD1L03000030L1DD
DDD1L000000L1DDD
33DD11111111DD3D
33DDDDDDDDDDD33D
D33DDDDDDDDDD33D
DD33DDDDDDDDD3DD`],
  [mimicEnemy, bitmap`
................
................
....11111111....
...1L000000L1...
..1L00000000L1..
..100300003001..
..100030030001..
..100000000001..
..100000000001..
..100033330001..
..1L03000030L1..
...1L000000L1...
....11111111....
................
................
................`],
  [enemy3, bitmap`
................
................
....11111111....
...1L000000L1...
..1L00000000L1..
..100300003001..
..100030030001..
..100000000001..
..100000000001..
..100033330001..
..1L03000030L1..
...1L000000L1...
....11111111....
................
................
................`],
  [enemy4, bitmap`
................
................
....11111111....
...1L000000L1...
..1L00000000L1..
..100300003001..
..100030030001..
..100000000001..
..100000000001..
..100033330001..
..1L03000030L1..
...1L000000L1...
....11111111....
................
................
................`],
  [glasses, bitmap`
................
................
................
................
..111...........
.117111.........
11777711........
1777777711111111
1777777711111111
17777771........
17777771........
11777711........
.111111.........
................
................
................`],
  [key, bitmap`
................
................
................
................
................
...6............
..6.666666......
...6...6.6......
................
................
................
................
................
................
................
................`],
  [cheese, bitmap`
................
................
................
........00000...
....0000666600..
..000666666600..
.00666666F6600..
.00F6F66F6660...
..066666666660..
..0666F6666F60..
..066666666660..
..06FF6F66660...
..06666666000...
..00000000......
................
................`],
  [door, bitmap`
DDCCCCCCCCCCCDDD
DDCCCCCCCCCCCDDD
DDCCCCCCCCCCCDDD
DDCCCCCCCCCCCDDD
DDCCCCCCCCCCCDDD
DDCCCCCCCCCCCDDD
DDCCCCCCCCCCCDDD
DDCCCCCCCCCCCDDD
DDCCCCCCCC66CDDD
DDCCCCCCCC66CDDD
DDCCCCCCCCCCCDDD
DDCCCCCCCCCCCDDD
DDCCCCCCCCCCCDDD
DDCCCCCCCCCCCDDD
DDCCCCCCCCCCCDDD
DDCCCCCCCCCCCDDD`],
  [wall, bitmap`
DDDDD11111DDDDDD
DDDDD11111DDDDDD
DDCDD11111DDDDDD
DDCDD11111HDDD8D
DDDDD11111DDDDDD
DDDDD11111DCDDDD
DDDCD11111DDDDDD
DDDCD11111HDDCDD
DDDDD11111DDDCDD
CCCCD11111DDDCDD
DCCDD11111DDDDDD
DDCDC11111DDCDDD
DDDDC11111DDCDDD
DDDDD11111CCCDDD
DDDDD11111DDDDDD
DDDDD11111DDDDDD`],
  [box, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC999999999999CC
CC9CCCFFFCCC99CC
CC9CFFCFCCC999CC
CC9CCCCFC99C9FCC
C99999FFF9CC9FCC
C9FCFC96FCFC9FCC
C9FCCFF69FCC9FCC
C9FCFCFFF9CCC9CC
C99CFCCFCC9CC9CC
CC9CFCCCCC99C9CC
CC9CCCCFFFCCC9CC
CC999999999999CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [mimicBox, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CC333333333333CC
CC3333FFFCCC33CC
CC33FF3FCCC333CC
CC33333FC99C3FCC
C33333FFF9CC3FCC
C3FCFC96FCFC3FCC
C3FCCFF69FCC3FCC
C3FCFCFFF9CCC3CC
C33CFCCFCC9CC3CC
CC3CFCCCCC99C3CC
CC3CCCCFFFCCC3CC
CC333333333333CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [inverser, bitmap`
5555555555555555
5555555555555555
5555555555355555
5555555555535555
5555555555553555
5555555555555355
5555555555555535
5333333333333333
5555555555555535
5555555555555355
5555555555553555
5555555555535555
5555555555355555
5555555555555555
5555555555555555
5555555555555555`],
  [mimicInverser, bitmap`
5555555555555555
5555555555555555
5555565555555555
5555655555555555
5556555555555555
5565555555555555
5655555555555555
6666666666666665
5655555555555555
5565555555555555
5556555555555555
5555655555555555
5555565555555555
5555555555555555
5555555555555555
5555555555555555`],
  [ground, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDD8DDD44D
DDCCDCCCCCDD4D4D
DDD48DDDDD4DCDD4
DD4DD444DDDDD8DD
DCCDDDD4D4DDDCDD
DCDCDDD444DDDDDD
CDDDDDD44CDDDDD8
C44DDDDDDD8DDDDD
CDDCDDDDDDDDDD44
DDDC8DDCDDCDDDC4
DD8DDCDDDDC4DDDC
DDDDDD4DDDD4DDDD
D444D4DDDD44444D
DDDD44D4DD4DDDDD
DDDDDDDDDDDDDDD8`]
)


let level = 0
const levels = [
  map`
ttttttttttttt
ggggggwgggggg
ggggggwgggggg
ggggggwgggggg
ggggggwgggggg
ggggggwgggggg
ggggggwgggggg
ggggggwgggggg`,
  map`
ttttttttttttt
ggwgggwggwggw
ggwgggwggwggw
ggwgggwggwggg
ggwggggggwgwg
ggwgggwggggwg
ggwgggwgwggwg
ggggggwgwggwg`,
  map``
]
let scoreIncrement = 1;


setMap(levels[level])
setSolids([text, player, upPlayer, downPlayer, leftPlayer, mimicPlayer, upPlayerM, downPlayerM, leftPlayerM, wall, box, mimicBox])
setPushables({
  [player]: [box, mimicBox],
  [mimicPlayer]: [box, mimicBox],
  [enemy]: []
})


let score = 0;
let timer = 0;
let gameOver = false;
let completeCurrLevel = false;
const gameHeight = height();
const gameWidth = width();
const wallPos = Math.floor(gameWidth / 2);


const sprites = []

let enemyX1 = Math.floor(Math.random() * wallPos)
let enemyY1 = Math.floor(Math.random() * (gameHeight - 1)) + 1
while (enemyY1 === 1) {
  enemyY1 = Math.floor(Math.random() * (gameHeight - 1)) + 1
}
let enemyUp1 = true
//enemy2 only mimic
let enemyXM = Math.floor(Math.random() * wallPos) + 7



//enemy3 only main
let enemyX3 = Math.floor(Math.random() * wallPos)
let enemyY3 = Math.floor(Math.random() * (gameHeight - 1)) + 1
while (enemyY3 === 1) {
  enemyY3 = Math.floor(Math.random() * (gameHeight - 1)) + 1
}
let enemyUp3 = true
//enemy4 only mimic
let enemyX4 = Math.floor(Math.random() * wallPos)
let enemyY4 = Math.floor(Math.random() * (gameHeight - 1)) + 1
while (enemyY4 === 1) {
  enemyY4 = Math.floor(Math.random() * (gameHeight - 1)) + 1
}
let enemyUp4 = true


let cheeseX = Math.floor(Math.random() * (gameWidth - wallPos)) + wallPos;
let cheeseY = Math.floor(Math.random() * (gameHeight - 1)) + 1;

//glasses positioning works
let glassesX = Math.floor(Math.random() * (wallPos - 1));
let glassesY = Math.floor(Math.random() * (gameHeight - 1)) + 1;



let doorsX = Math.floor(Math.random() * (wallPos - 1));
let doorsY = Math.floor(Math.random() * (gameHeight - 1)) + 1;
//so that the door and the glasses don't overlap each other
while (doorsX === glassesX) {
  doorsX = Math.floor(Math.random() * (wallPos - 1));
}

//makes sure these objects don't spawn in the wall
while (cheeseX === 6) {
  cheeseX = Math.floor(Math.random() * (gameWidth - wallPos)) + wallPos;
}



addSprite(5, 1, player)
addSprite(7, 1, mimicPlayer)
addSprite(glassesX, glassesY, glasses)


let playerX = getFirst(player).x
let playerY = getFirst(player).y

let mimicX = getFirst(mimicPlayer).x
let mimicY = getFirst(mimicPlayer).y





//checks the collision of two objects, doesn't have to be just the player and enemy
//returns true or false
function checkCollision(player, enemy) {
  const playerPosition = getFirst(player)
  const enemyPosition = getFirst(enemy)
  if (playerPosition && enemyPosition) {
    return (playerPosition.x === enemyPosition.x && playerPosition.y === enemyPosition.y)
  }
}

function checkCollisionPosition(player, objectX, objectY) {
  const playerPosition = getFirst(player)
  if (playerPosition) {
    return (playerPosition.x === objectX && playerPosition.y === objectY)
  }
}

//inverses the controls of both player and mimicPlayer when colliding with the inverser sprite
function inverse(player, mimicPlayer, inverser, mimicInverser) {
  if (checkCollision(player, inverser) || checkCollision(mimicPlayer, )) {
    mimicMovement *= -1
    playerMovement *= -1
  }
}
//increments the score if either players touch the cheese
function incrementScore(player, mimicPlayer, cheese) {
  if (checkCollisionPosition(mimicPlayer, cheeseX, cheeseY) || checkCollisionPosition(downPlayerM, cheeseX, cheeseY) || checkCollisionPosition(leftPlayerM, cheeseX, cheeseY) || checkCollisionPosition(upPlayerM, cheeseX, cheeseY)) {
    score += scoreIncrement;
    cheeseX = Math.floor(Math.random() * (gameWidth - wallPos - 1)) + wallPos + 1;
    cheeseY = Math.floor(Math.random() * (gameHeight - 1)) + 1;
    if (score === 15) {
      scoreIncrement++;
    }
    else if (score >= 40) {
      scoreIncrement++;
    }
    if (score >= 75) {
      scoreIncrement++;
    }
    if (score >= 100) {
      scoreIncrement++;
    }
  }
}

function deleteAllSprites() {
  for (let x = 0; x < gameWidth; x++) {
    for (let y = 1; y < gameHeight; y++) {
      addSprite(x, y, text);
    }
  }
}

function setPositions(level) {
  if (level === 1) {
    addSprite(0, 3, player);
    playerX = 0, playerY = 3;
    enemyX1 = Math.floor(Math.random() * 3) + 3
    enemyY1 = Math.floor(Math.random() * (gameHeight - 1)) + 1
    while (enemyY1 === 1) {
      enemyY1 = Math.floor(Math.random() * (gameHeight - 1)) + 1
    }
    enemyUp1 = true
    addSprite(enemyX1, enemyY1, enemy);
  }
}


function endGame() {
  clearInterval(updateEverything)
  clearText()
  deleteAllSprites();
  addText("You lost.....", { x: 3, y: 5, color: color`2` })
  addText("Score: " + score, { x: 5, y: 7, color: color`2` })
  addText("Time Elapsed: " + timer, { x: 3, y: 9, color: color`2` })
  deleteAllSprites();
}

function wonGame() {
  clearInterval(updateEverything)
  clearText()
  deleteAllSprites();
  addText("YOU WON IDK HOW", { x: 3, y: 5, color: color`2` })
  addText("Score: " + score, { x: 5, y: 7, color: color`2` })
  addText("Time Elapsed: " + timer, { x: 3, y: 9, color: color`2` })
  deleteAllSprites();
}
onInput("s", () => {
  if (!gameOver) {
    playerY += playerMovement;
    if (playerY > gameHeight - 1) playerY = gameHeight - 1
    if (!getFirst(downPlayer)) {
      if (getFirst(player)) {
        getFirst(player).remove();
      } else if (getFirst(upPlayer)) {
        getFirst(upPlayer).remove();
      } else if (getFirst(leftPlayer)) {
        getFirst(leftPlayer).remove();
      }
      addSprite(playerX, playerY, downPlayer);
    } else if (getFirst(downPlayer)) {
      getFirst(downPlayer).y += playerMovement
    }
    mimicY += mimicMovement;
    if (mimicY > gameHeight - 1) mimicY = gameHeight - 1
    if (!getFirst(downPlayerM) && level != 1) {
      if (getFirst(mimicPlayer)) {
        getFirst(mimicPlayer).remove();
      } else if (getFirst(upPlayerM)) {
        getFirst(upPlayerM).remove();
      } else if (getFirst(leftPlayerM)) {
        getFirst(leftPlayerM).remove();
      }
      addSprite(mimicX, mimicY, downPlayerM);
    } else if (getFirst(downPlayerM)) {
      getFirst(downPlayerM).y += playerMovement
    }
    if (level != 1) {
      mimicY = getFirst(downPlayerM).y
    }
  }
})

onInput("w", () => {
  if (!gameOver) {
    playerY -= playerMovement;
    if (playerY < 1) playerY = 1
    if (!getFirst(upPlayer)) {
      addSprite(playerX, playerY, upPlayer)
      if (getFirst(player)) {
        getFirst(player).remove();
      } else if (getFirst(downPlayer)) {
        getFirst(downPlayer).remove();
      } else if (getFirst(leftPlayer)) {
        getFirst(leftPlayer).remove();
      }
    } else if (getFirst(upPlayer)) {
      getFirst(upPlayer).y -= playerMovement
    }
    playerY = getFirst(upPlayer).y
    mimicY -= mimicMovement;
    if (mimicY < 1) mimicY = 1
    if (!getFirst(upPlayerM) && level != 1) {
      addSprite(mimicX, mimicY, upPlayerM)
      if (getFirst(mimicPlayer)) {
        getFirst(mimicPlayer).remove();
      } else if (getFirst(downPlayerM)) {
        getFirst(downPlayerM).remove();
      } else if (getFirst(leftPlayerM)) {
        getFirst(leftPlayerM).remove();
      }
    } else if (getFirst(upPlayerM)) {
      getFirst(upPlayerM).y -= mimicMovement
    }
    if (level != 1) {
      mimicY = getFirst(upPlayerM).y
    }
  }
})

onInput("d", () => {
  if (!gameOver) {
    if (!getFirst(player)) {
      addSprite(playerX, playerY, player)
      getFirst(player).x += playerMovement
      if (getFirst(upPlayer)) {
        getFirst(upPlayer).remove();
      } else if (getFirst(downPlayer)) {
        getFirst(downPlayer).remove();
      } else if (getFirst(leftPlayer)) {
        getFirst(leftPlayer).remove();
      }
    } else if (getFirst(player)) {
      getFirst(player).x += playerMovement
    }
    playerX = getFirst(player).x

    mimicX += mimicMovement;
    if (mimicX === gameWidth) mimicX = gameWidth - 1
    if (!getFirst(mimicPlayer) && level != 1) {
      addSprite(mimicX, mimicY, mimicPlayer)
      if (getFirst(upPlayerM)) {
        getFirst(upPlayerM).remove();
      } else if (getFirst(downPlayerM)) {
        getFirst(downPlayerM).remove();
      } else if (getFirst(leftPlayerM)) {
        getFirst(leftPlayerM).remove();
      }
    } else if (getFirst(mimicPlayer)) {
      getFirst(mimicPlayer).x += mimicMovement
    }
    if (level != 1) {
      mimicX = getFirst(mimicPlayer).x;
    }
  }
})

onInput("a", () => {
  if (!gameOver) {
    if (playerX < 0) playerX = 0
    if (!getFirst(leftPlayer)) {
      addSprite(playerX, playerY, leftPlayer)
      getFirst(leftPlayer).x -= playerMovement
      if (getFirst(upPlayer)) {
        getFirst(upPlayer).remove();
      } else if (getFirst(downPlayer)) {
        getFirst(downPlayer).remove();
      } else if (getFirst(player)) {
        getFirst(player).remove();
      }
    } else {
      getFirst(leftPlayer).x -= playerMovement
    }
    playerX = getFirst(leftPlayer).x

    if (!getFirst(leftPlayerM) && level != 1) {
      addSprite(mimicX, mimicY, leftPlayerM)
      getFirst(leftPlayerM).x -= playerMovement
      if (getFirst(upPlayerM)) {
        getFirst(upPlayerM).remove();
      } else if (getFirst(downPlayerM)) {
        getFirst(downPlayerM).remove();
      } else if (getFirst(mimicPlayer)) {
        getFirst(mimicPlayer).remove();
      }
    } else if (getFirst(leftPlayerM)) {
      getFirst(leftPlayerM).x -= playerMovement
    }
    if (level != 1) {
      mimicX = getFirst(leftPlayerM).x;
    }
  }
  //console.log(playerX, playerY)
})


afterInput(() => {
  let playersExist = (player || downPlayer || upPlayer || leftPlayer) && (mimicPlayer || upPlayerM || downPlayerM || leftPlayerM);
  let mainPlayerExists = player || downPlayer || upPlayer || leftPlayer;
  let mimicPlayerExists = mimicPlayer || upPlayerM || downPlayerM || leftPlayerM;
  const cheeseSprite = getFirst(cheese);
  const enemySprite = getFirst(enemy);
  const enemySprite2 = getFirst(mimicEnemy);
  const enemySprite3 = getFirst(enemy3);
  const enemySprite4 = getFirst(enemy4);
  if (mainPlayerExists && (checkCollision(glasses, player) || checkCollision(glasses, downPlayer) || checkCollision(glasses, upPlayer) ||
      checkCollision(glasses, leftPlayer))) {
    if (!enemySprite) {
      addSprite(enemyX1, enemyY1, enemy);
      if (score >= 10 && level === 0) {
        addSprite(enemyXM, enemyY1, mimicEnemy);
      }
      if (score >= 30 && level === 0) {
        addSprite(enemyX3, enemyY3, enemy3);
      }
      if (score >= 100 && level === 0) {
        addSprite(enemyX4, enemyY4, enemy4);
      }
    }
  } else if (mainPlayerExists && !(checkCollision(glasses, player) || checkCollision(glasses, downPlayer) || checkCollision(glasses, upPlayer) ||
      checkCollision(glasses, leftPlayer))) {
    if (enemySprite) {
      enemySprite.remove();
    }
    if (enemySprite2) {
      enemySprite2.remove();
    }
    if (enemySprite3) {
      enemySprite3.remove();
    }
    if (enemySprite4) {
      enemySprite4.remove();
    }
  }
  if (playersExist) {
    if (checkCollision(glasses, player) || checkCollision(glasses, downPlayer) ||
      checkCollision(glasses, upPlayer) || checkCollision(glasses, leftPlayer) &&
      !cheeseSprite && !completeCurrLevel) {
      addSprite(cheeseX, cheeseY, cheese); //if hits glasses: show Cheese
    } else if (!(checkCollision(glasses, player) || checkCollision(glasses, downPlayer) ||
        checkCollision(glasses, upPlayer) || checkCollision(glasses, leftPlayer)) &&
      cheeseSprite) {
      cheeseSprite.remove();
    }
  }
  incrementScore(player, mimicPlayer, cheese)
  if (gameOver) {
    deleteAllSprites();
  }
  if (checkCollision(door, player) || checkCollision(door, downPlayer) ||
    checkCollision(door, upPlayer) || checkCollision(door, leftPlayer)) {
    level = level + 1;
    setMap(levels[level]);
    setPositions(level);
  }
})



//adds the score and timer at the top
let index = 0
let enemyIncrement = 1;
const updateEverything = setInterval(() => { //timer is set to seconds
  const enemySprite = getFirst(enemy)
  const enemySprite2 = getFirst(mimicEnemy)
  const enemySprite3 = getFirst(enemy3)
  const enemySprite4 = getFirst(enemy4)
  clearText()
  addText("Time Elapsed: " + timer, { x: 0, y: 0, color: color`2` })
  addText("Score: " + score, { x: 0, y: 1, color: color`2` })
  index++;
  if (index % 100 === 0) {
    timer++;
    index = 0;
  }

  if (index % 100 === 0) {
    if (enemyY1 > gameHeight - 2 || enemyY1 <= 1) {
      enemyUp1 = !enemyUp1;
    }
    if (enemyUp1) {
      enemyY1 += enemyMovement;
      if (enemySprite) {
        enemySprite.y += enemyMovement;
      }
      if (enemySprite2) {
        enemySprite2.y += enemyMovement;
      }
    } else {
      enemyY1 -= enemyMovement;
      if (enemySprite) {
        enemySprite.y -= enemyMovement;
      }
      if (enemySprite2) {
        enemySprite2.y -= enemyMovement;
      }
    }
    if (enemyY3 > gameHeight - 2 || enemyY3 <= 1) {
      enemyUp3 = !enemyUp3;
    }
    if (enemyUp3) {
      enemyY3 += enemyMovement;
      if (enemySprite3) {
        enemySprite3.y += enemyMovement;
      }
    } else {
      enemyY3 -= enemyMovement;
      if (enemySprite3) {
        enemySprite3.y -= enemyMovement;
      }
    }
    if (enemyY4 > gameHeight - 2 || enemyY4 <= 1) {
      enemyUp4 = !enemyUp4;
    }
    if (enemyUp4) {
      enemyY4 += enemyMovement;
      if (enemySprite4) {
        enemySprite4.y += enemyMovement;
      }
    } else {
      enemyY4 -= enemyMovement;
      if (enemySprite4) {
        enemySprite4.y -= enemyMovement;
      }
    }
  } //why is there a removal delay; edit: fixed it
  if (checkCollisionPosition(player, enemyX1, enemyY1) || checkCollisionPosition(upPlayer, enemyX1, enemyY1) ||
    checkCollisionPosition(downPlayer, enemyX1, enemyY1) || checkCollisionPosition(leftPlayer, enemyX1, enemyY1) ||
    checkCollisionPosition(mimicPlayer, enemyX1, enemyY1) || checkCollisionPosition(upPlayerM, enemyX1, enemyY1) ||
    checkCollisionPosition(downPlayerM, enemyX1, enemyY1) || checkCollisionPosition(leftPlayerM, enemyX1, enemyY1)) {
    endGame();
    gameOver = true;
  }
  if (score >= 10 && (checkCollisionPosition(player, enemyXM, enemyY1) || checkCollisionPosition(upPlayer, enemyXM, enemyY1) ||
      checkCollisionPosition(downPlayer, enemyXM, enemyY1) || checkCollisionPosition(leftPlayer, enemyXM, enemyY1) ||
      checkCollisionPosition(mimicPlayer, enemyXM, enemyY1) || checkCollisionPosition(upPlayerM, enemyXM, enemyY1) ||
      checkCollisionPosition(downPlayerM, enemyXM, enemyY1) || checkCollisionPosition(leftPlayerM, enemyXM, enemyY1))) {
      endGame();
      gameOver = true;
  }
  if (score >= 30 && (checkCollisionPosition(player, enemyX3, enemyY3) || checkCollisionPosition(upPlayer, enemyX3, enemyY3) ||
      checkCollisionPosition(downPlayer, enemyX3, enemyY3) || checkCollisionPosition(leftPlayer, enemyX3, enemyY3) ||
      checkCollisionPosition(mimicPlayer, enemyX3, enemyY3) || checkCollisionPosition(upPlayerM, enemyX3, enemyY3) ||
      checkCollisionPosition(downPlayerM, enemyX3, enemyY3) || checkCollisionPosition(leftPlayerM, enemyX3, enemyY3)))
  {
    endGame();
    gameOver = true;
  }
    if (score >= 100 && (checkCollisionPosition(player, enemyX4, enemyY4) || checkCollisionPosition(upPlayer, enemyX4, enemyY4) ||
        checkCollisionPosition(downPlayer, enemyX4, enemyY4) || checkCollisionPosition(leftPlayer, enemyX4, enemyY4) ||
        checkCollisionPosition(mimicPlayer, enemyX4, enemyY4) || checkCollisionPosition(upPlayerM, enemyX4, enemyY4) ||
        checkCollisionPosition(downPlayerM, enemyX4, enemyY4) || checkCollisionPosition(leftPlayerM, enemyX4, enemyY4)))
    {
      endGame();
      gameOver = true;
    }
      
  if (score >= 350) {
    wonGame()
  }

}, 1);
