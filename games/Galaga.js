/*
@title: Galaga
@author: wormmeatapple
@tags: []
@addedOn: 2024-08-15


Written by wormmeatapple
Inspired by arcade game Galaga
Ai was used for syntax, errors in code, and clarification, but no ai written code was used
Shoutout to the game Exodus and Half-fry for having some code that inspired my own (collision detection, life system)
Thank you to Hack Club for creating Sprig!

W A S D to move
I to shoot
*/

//sprite storage
const player = "p"
const background = "o"
const alien = "a"
const bullet = "b"
const x = "x"
const playerfake = "f"
const blue = "l"

//variable storage
let difficulty = 900
let score = 0
let canShoot = true
let lives = 3
let canMove = true
let maxLife = 10
let mainMenuOn = false
let moveAlienInterval
let gameOverOn = false

  

//sound storage
const step = tune `
66.66666666666667: C4^66.66666666666667 + D4-66.66666666666667 + C5-66.66666666666667 + B4^66.66666666666667,
66.66666666666667: D4^66.66666666666667 + E4-66.66666666666667 + D5-66.66666666666667 + C5^66.66666666666667,
66.66666666666667: E4^66.66666666666667 + F4-66.66666666666667 + E5-66.66666666666667 + D5^66.66666666666667,
1933.3333333333335`
const death = tune`
119.5219123505976: G4/119.5219123505976,
119.5219123505976,
119.5219123505976: B4/119.5219123505976,
119.5219123505976,
119.5219123505976: C4/119.5219123505976 + D4-119.5219123505976 + E4-119.5219123505976,
3227.091633466135`
setLegend(
  [player, bitmap`
................
................
................
.......332......
.......332......
.......332222...
....333333332...
....3663366322..
...33663366332..
...33333333332..
...33333333332..
...33......332..
...33......332..
................
................
................`],
  [background, bitmap`
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
  [alien, bitmap`
................
.........2......
..7...77772..72.
..7..777777..72.
..7777777777772.
..7777777777772.
....77777777....
.7..77777777..72
.7..77777777..72
.777733773377772
.777733773377772
....777777772...
.....7777772....
......77772.....
................
................`],
  [bullet, bitmap`
................
................
................
................
................
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
.......99.......
................
................
................
................
................`],
  [x, bitmap `
................
.33..........33.
.333........333.
..333......333..
...333....333...
....333..333....
.....333333.....
......3333......
......3333......
.....333333.....
....333..333....
...333....333...
..333......333..
.333........333.
.33..........33.
................`],
  [playerfake, bitmap `................
................
................
.......332......
.......332......
.......332222...
....333333332...
....3663366322..
...33663366332..
...33333333332..
...33333333332..
...33......332..
...33......332..
................
................
................`],
  [blue, bitmap `
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
)

setBackground(background)

setSolids([])

let level = 0
const levels = [
  map`
a.aa.a.aaa.
aa......aaa
.a.......aa
a..........
a.........a
.a...p....a
a.........a
a.........a
a.......aa.
.aa.a.aa.aa
a.aa.aaaa.a`,
  map`
...........
.....a.....
...........
...........
...........
...........
...........
...........
...........
.....p.....
...........`,
]



//game contents i guess
mainMenu()


//player input
// shortened this cause otherwise it looks way too big for just one line of stuff
onInput("w", () => { if (canMove) { getFirst(player).y -= 1; } });
onInput("s", () => { if (canMove) { getFirst(player).y += 1; } });
onInput("a", () => { if (canMove) { getFirst(player).x -= 1; } });
onInput("d", () => { if (canMove) { getFirst(player).x += 1; } });
onInput("i", () => { if (canMove) { shootBullet() } });




//constant loop storage

setInterval(bulletMove, 120)
setInterval(bulletHit, 30)
setInterval(playerHit, 30)
//alien move interval in startGame()




//function storage
function startGame() {
  clearText()
  setMap(levels[1])
  difficulty = 900
  score = 0
  canShoot = true
  lives = 3
  canMove = true
  maxLife = 10
  mainMenuOn = false
  gameOverOn = false
  displayLives()
  displayScore()
  moveAlienInterval = setInterval(moveAlien, difficulty);
}

function pauseGame() {
  clearInterval(moveAlienInterval)
  clearText()
  clearTile(8, 0)
  clearTile(9, 0)
  clearTile(10, 0)
  canMove = false
}

function mainMenu() {
  mainMenuOn = true
  setMap(levels[0])
  pauseGame()
  addText("Galaga-ish", {x:5, y:3, color: color`3`})
  addText("K to start", {x:5, y:6, color: color`3`})
  onInput("k", () => {if (mainMenuOn) {startGame()}})
}

function gameOver() {
  pauseGame()
  gameOverOn = true
  getAll(alien).forEach(alien => {
    alien.remove();
  });
  getFirst(player).remove()
  addText("Game over!", {x:5, y: 3, color: color`3`})
  addText(`Score: ${score}`, {x: 5, y: 4, color: color`3`})
  addText("L to go", {x:6, y: 8, color: color`3`})
  addText("to main menu", {x:4, y: 9, color: color`3`})
  onInput("l", () => {if (gameOverOn) {mainMenu()}})
}
    
  
  
function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function moveAlien() {
  playTune(step)
  getAll(alien).forEach(alien => {
    const move = randomNum(1, 3);
    if (move == 1) {
      alien.x += 1;
    } else if (move == 2) {
      alien.x -= 1;
    } else {
      alien.y += 1;
    }
  });
}

function shootBullet() {
  if (canShoot) {
    let playerPos = getFirst(player)
    addSprite(playerPos.x, playerPos.y - 1, bullet)
    canShoot = false
    setTimeout(() => {
      canShoot = true
    }, 420); //blaze it
  }
}

function bulletMove() {
  getAll(bullet).forEach(bullet => {
    bullet.y -= 1
    if (bullet.y == 0) {
      bullet.remove()
    }
  });
}

function bulletHit() {
  getAll(bullet).forEach(bullet => {
    getAll(alien).forEach(alien => {
      if (alien.x == bullet.x && alien.y == bullet.y) {
        alien.remove()
        bullet.remove()
        score += 100
        displayScore()
        resetLevel()
      }
    });
  });
}

function playerHit() {
  let playerPos = getFirst(player)
  getAll(alien).forEach(alienPos => {
    if (playerPos.y == alienPos.y && playerPos.x == alienPos.x) {
      if (maxLife == 8) {
        gameOver()
      }
      resetPlayer()
      clearTile(maxLife, 0)
      addSprite(maxLife, 0, x)
      maxLife -= 1
      resetEnemies()
        playTune(death)
    }
  });
}



function displayLives() {
  maxLife = 10
  clearTile(8, 0)
  clearTile(9, 0)
  clearTile(10, 0)
  addSprite(8, 0, playerfake)
  addSprite(9, 0, playerfake)
  addSprite(10, 0, playerfake)
  addText("Lives", {
    x: 8,
    y: 0,
    color: color`3`
  })
}

function displayScore() {
  addText(String(score), {
    x: 0,
    y: 0,
    color: color`2`
  })
}

function flashBack() {
  setTimeout(() => {
    setBackground(blue)
  }, 50);
  setTimeout(() => {
    setBackground(background)
  }, 100);
  setTimeout(() => {
    setBackground(blue)
  }, 150);
  setTimeout(() => {
    setBackground(background)
  }, 200);
  setTimeout(() => {
    setBackground(blue)
  }, 250);
  setTimeout(() => {
    setBackground(background)
  }, 300);
}

function resetPlayer() {
  canMove = false
  getFirst(player).remove()
  flashBack()
  addSprite(5, 10, player)
  setTimeout(() => {
        canMove = true
      }, 1500);
}
  
function resetLevel() {
  if (getAll(alien).length == 0) {
    resetPlayer()
    spawnEnemies()
    difficulty -= 40
  }
}

function spawnEnemies() {
  let difficultyBig = 1000 - difficulty
  for (let i = 0; i < Math.floor(difficultyBig / 25); i++) {
    addSprite(randomNum(1, 9), randomNum(1, 2), alien)
  }
} 

function resetEnemies() {
  let alienCount = 0
  getAll(alien).forEach(alien => {
    alienCount++
    alien.remove();
  });
  for (let i = 0; i < alienCount; i++) {
    addSprite(randomNum(1, 9), randomNum(1, 2), alien)
  }
}
                   

