/*
@title: Monster Mauler
@author: DUMBHOG
@tags: [shooter, fps]
@addedOn: 2024-00-00s
With help from CragglesG

How to play: Shoot as many enemies as you can before the time runs out! and make sure to not get too close to them!

Controls:

Moving: WASD
Shooting: IJKL

Shooting a bullet at a wall while beside it may end up badly!

Known bugs:
1. The wall bug mentioned 
2. When the timer goes below 10, one digit numbers may appear as (number)0 instead of 0(number)

*/

let score = 0 // defining variables
let Alive = true
let RandX = 0
let RandY = 0
let TimeLeft = 59

const player = "p"
const enemy = "e"
const background = "b"
const bullet0 = "0"
const bullet1 = "1"
const bullet2 = "2"
const bullet3 = "3"


const monstersound = tune`
73.17073170731707: F5/73.17073170731707 + G4~73.17073170731707 + B5-73.17073170731707,
73.17073170731707: E5/73.17073170731707 + A4~73.17073170731707 + A5-73.17073170731707,
73.17073170731707: D5/73.17073170731707 + B4~73.17073170731707 + G5-73.17073170731707,
2121.951219512195` 
const wintune = tune`
157.89473684210526: G4~157.89473684210526 + G5-157.89473684210526 + C4/157.89473684210526,
157.89473684210526: A4~157.89473684210526 + F5^157.89473684210526,
157.89473684210526: B4~157.89473684210526 + E5-157.89473684210526 + E4/157.89473684210526,
157.89473684210526: F5^157.89473684210526,
157.89473684210526: G5-157.89473684210526 + C4/157.89473684210526 + G4~157.89473684210526,
157.89473684210526: F5^157.89473684210526 + A4~157.89473684210526,
157.89473684210526: E5-157.89473684210526 + B4~157.89473684210526,
157.89473684210526: F5^157.89473684210526,
157.89473684210526: G5-157.89473684210526 + E4/157.89473684210526 + G4~157.89473684210526,
157.89473684210526: F5^157.89473684210526 + C4/157.89473684210526 + A4~157.89473684210526,
157.89473684210526: E5-157.89473684210526 + B4~157.89473684210526,
157.89473684210526: F5^157.89473684210526,
157.89473684210526: G5-157.89473684210526 + G4~157.89473684210526 + E4/157.89473684210526,
157.89473684210526: F5^157.89473684210526 + A4~157.89473684210526 + C4/157.89473684210526,
157.89473684210526: E5-157.89473684210526 + B4~157.89473684210526,
157.89473684210526: F5^157.89473684210526,
157.89473684210526: G5-157.89473684210526 + G4~157.89473684210526 + E4/157.89473684210526,
157.89473684210526: F5^157.89473684210526 + A4~157.89473684210526 + C4/157.89473684210526,
157.89473684210526: B4~157.89473684210526,
157.89473684210526,
157.89473684210526: C5-157.89473684210526 + E4/157.89473684210526 + G4~157.89473684210526,
157.89473684210526: F4-157.89473684210526 + C4/157.89473684210526 + A4~157.89473684210526,
157.89473684210526: B4~157.89473684210526,
157.89473684210526: D5-157.89473684210526,
157.89473684210526: E4/157.89473684210526 + G4~157.89473684210526,
157.89473684210526: F5-157.89473684210526 + C4/157.89473684210526 + A4~157.89473684210526,
157.89473684210526: C5/157.89473684210526 + B4~157.89473684210526,
157.89473684210526: D5/157.89473684210526,
157.89473684210526: G4~157.89473684210526,
157.89473684210526: F5/157.89473684210526 + A4~157.89473684210526,
157.89473684210526,
157.89473684210526: E5/157.89473684210526 + G5^157.89473684210526 + B5/157.89473684210526 + F5/157.89473684210526 + A5^157.89473684210526`
const shootsound = tune `
303.030303030303: C4-303.030303030303,
9393.939393939392`
const music = tune `
365.8536585365854,
365.8536585365854: D5/365.8536585365854,
365.8536585365854: G4/365.8536585365854,
365.8536585365854: D5/365.8536585365854,
365.8536585365854: A4-365.8536585365854,
365.8536585365854,
365.8536585365854: A4^365.8536585365854,
365.8536585365854: C5^365.8536585365854,
365.8536585365854: E5^365.8536585365854,
365.8536585365854: D5/365.8536585365854,
365.8536585365854: B4/365.8536585365854,
365.8536585365854: C5/365.8536585365854,
365.8536585365854,
365.8536585365854: C5~365.8536585365854,
365.8536585365854: E5~365.8536585365854,
6219.512195121952`
const deathtune = tune `
500,
500: G4~500 + E4/500,
500: F4~500 + D4/500,
500: E4~500 + C4/500,
500: C4~500 + D4-500 + E4-500 + F4-500,
13500`
  
setLegend(

  [player, bitmap`
.......LL.......
.....666666.....
....66666066....
....66606666....
....66600666....
....66660000....
.....666666.....
......6666......
.......0........
LLLLL..0..LLLLLL
....L00000LCCCC.
....L..0..L.....
.......0........
.......0........
.....00000......
....00LLL00.....`],
  [background, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [bullet0, bitmap`
................
................
................
................
........6.......
........6.......
........6.......
........6.......
................
........2.......
........2.......
.......22.......
.......2........
................
................
................`],
  [bullet1, bitmap`
................
................
................
........2.......
.......22.......
.......2........
.......2........
................
.......6........
.......6........
.......6........
.......6........
................
................
................
................`],
  [bullet2, bitmap`
................
................
................
................
................
................
................
...........22...
....6666.222....
................
................
................
................
................
................
................`],
  [bullet3, bitmap`
................
................
................
................
................
................
................
...22...........
....222.6666....
................
................
................
................
................
................
................`],
  [enemy, bitmap`
.....033330.....
....33033033....
...3333333333...
...3330330333...
..333333333333..
...3330000333...
...3303333033...
....33333333....
..3...9999...3..
.3333.3333.3333.
333.33333333.333
33..33333333..33
.33.99966999.33.
....33333333....
...33......33...
..33........33..`]
  
)

setSolids([player, bullet0, bullet1, bullet2, bullet3])

let level = 0
const levels = [
  map`
..............
..............
.e............
...e......e...
..............
..............
........e.....
.....p........
..e...........
..........e...
..............`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

setBackground(background)

playTune(music)

setInterval ( () => {
  if (Alive === true) {
    playTune(music)
  }
}, 6000)


let interval = setInterval(TimeFunction, 1000) // This block is code is responsible for the in-game timer
function TimeFunction() {
  if (TimeLeft > 0 && Alive === true) {
    TimeLeft-- }
  else if (TimeLeft == 10) {
    clearInterval(interval)
  }
  addText(`${TimeLeft}`, {
    x: 18,
    y: 0,
    color: color`6`
  })
} 

addText(`Time:`, {
  x: 12,
  y: 0,
  color: color`6`
})

onInput("w", () => {
   getFirst(player).y -= 1
})

onInput("s", () => {
   getFirst(player).y += 1
})

onInput("d", () => {
   getFirst(player).x += 1
})

onInput("a", () => {
   getFirst(player).x -= 1 
})


function MonsterMoving() { // Function that makes the monsters move, the breaking and such make it so all the monsters move
  getAll(enemy).forEach(enemySprite => {
    let RandInt = Math.floor(Math.random() * (4 - 1 + 1)) + 1; // the number chosen will be between 1 & 4

    switch(RandInt) {

      case 1:
        enemySprite.y -= 1; // Moves the enemy upwards 
        break;
      case 2:
        enemySprite.y += 1; // Moves the enemy downwards 
        break;
      case 3:
        enemySprite.x += 1; // Moves the enemy to the right 
        break;
      case 4:
        enemySprite.x -= 1; // Moves the enemy to the left 
        break;w
    default:
      break;
        
    }
  });
}

setInterval( ()  => {
  if (Alive === true) {
    MonsterMoving()
  }
}, 500)

function RandomiseCoords() {
    RandX = Math.floor(Math.random() * (13 - 0 + 1)) + 0; // the number chosen will be between 1 & 4
    RandY = Math.floor(Math.random() * (10 - 0 + 1)) + 0; // the number chosen will be between 1 & 4
}

onInput("i", () => { 
  if (Alive) {
    addSprite(getFirst(player).x, getFirst(player).y, bullet0) // These inputs create bullets
  } 
});

onInput("k", () => { 
  if (Alive) {
    addSprite(getFirst(player).x, getFirst(player).y, bullet1)
  } 
});

onInput("j", () => { 
  if (Alive) {
    addSprite(getFirst(player).x, getFirst(player).y, bullet2)
  } 
}); 

onInput("l", () => { 
  if (Alive) {
    addSprite(getFirst(player).x, getFirst(player).y, bullet3)
  } 
});

setInterval(() => { // This block is code is responsible for allowing bullets to move and disappear, it also randomises the coordinates for the next enemy spawn
  if (Alive === true) {
    let bullets0 = getAll(bullet0);
    for (let i = 0; i < bullets0.length; i++) {
      if (bullets0[i].y === 0) {
        clearTile(bullets0[i].x, bullets0[i].y)
        RandomiseCoords()
      }
      playTune(shootsound)
      bullets0[i].y--;
    }
    let bullets1 = getAll(bullet1);
    for (let i = 0; i < bullets1.length; i++) {
      if (bullets1[i].y === 10) {
        clearTile(bullets1[i].x, bullets1[i].y)
        RandomiseCoords()
      }
      playTune(shootsound)
      bullets1[i].y++;
    }
    let bullets2 = getAll(bullet2);
    for (let i = 0; i < bullets2.length; i++) {
      if (bullets2[i].x === 0) {
        clearTile(bullets2[i].x, bullets2[i].y)
        RandomiseCoords()
      }
      playTune(shootsound)
      bullets2[i].x--;
    }
    let bullets3 = getAll(bullet3);
    for (let i = 0; i < bullets3.length; i++) {
      if (bullets3[i].x === 13) {
        clearTile(bullets3[i].x, bullets3[i].y)
        RandomiseCoords()
      }
      playTune(shootsound)
      bullets3[i].x++;
    }
  }
}, 25)

setInterval(() => { // Score counter
  addText(`Score: ${score}`, {
    x: 0,
    y: 0,
    color: color`6`
  })

  if (Alive === true) { // This block is code is responsible for making enemies die
    let tiles = tilesWith(bullet0, enemy)
    for (let i = 0; i < tiles.length; i++) {
      playTune(monstersound)
      score++
      clearTile(tiles[i][0].x, tiles[i][0].y)
      addSprite(RandX, RandY, enemy)
      }
    tiles = tilesWith(bullet1, enemy)
    for (let i = 0; i < tiles.length; i++) {
      playTune(monstersound)
      score++
      clearTile(tiles[i][0].x, tiles[i][0].y)
      addSprite(RandX, RandY, enemy)
      }
    tiles = tilesWith(bullet2, enemy)
    for (let i = 0; i < tiles.length; i++) {
      playTune(monstersound)
      score++
      clearTile(tiles[i][0].x, tiles[i][0].y)
      addSprite(RandX, RandY, enemy)
      }
    tiles = tilesWith(bullet3, enemy)
    for (let i = 0; i < tiles.length; i++) {
      playTune(monstersound)
      score++
      clearTile(tiles[i][0].x, tiles[i][0].y)
      addSprite(RandX, RandY, enemy)
      }

    let killtiles = tilesWith(player, enemy) // This block is code is responsible for making the player die
      for (let i = 0; i < killtiles.length; i++) {
        playTune(monstersound)
        clearTile(killtiles[i][0].x, killtiles[i][0].y)
        Alive = false
        playTune(deathtune)
        addText(`GAME OVER!`, {
          x: 5,
          y: 8,
          color: color`6`
        })  
      }
  
    if (TimeLeft === 0) {
      Alive = false
      addText(`YOU WIN!`, {
        x: 6,
        y: 8,
        color: color`6`
      }) 
      addText(`Score: ${score}`, {
        x: 6,
        y: 11,
        color: color`6`
      })
      playTune(wintune)
    }
  }
}, 25)