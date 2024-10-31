/*
@title: Monster Mauler
@author: DUMBHOG
@tags: ['action', 'music']
@addedOn: 2024-10-31

With help from CragglesG

Monster Mauler is a retro shooter game where you try and get as high as a score as possible before the time runs out or you die, The game features action packed gameplay and contains an additional challenge...

How to play: Shoot as many enemies as you can before the time runs out! and make sure to not get too close to them! Once you are done, you can take on the boss challenge if you wish.

Controls:

Moving: WASD

Shooting: IJKL

Activating Boss: Press "i" after beating the first challenge

Known bugs:
1. When the timer goes below 10, one digit numbers may appear as (number)0 instead of 0(number)

Errors shown:
"TypeError: Cannot read properties of undefined (reading 'y/x')"

What's New:

1. Added a boss level to the game to make it longer and more fun.

2. You can no longer kill yourself by shooting while on the edge of the map

3. There are now more enemies and they move faster to make the game harder.

*/

let score = 0 // defining variables
let Alive = true
let BossReady = false
let RandX = 0
let RandY = 0
let TimeLeft = 39
let CanRevive = true
let BossHP = 50

const player = "p"
const enemy = "e"
const boss = "s"
const backgroundA = "a"
const backgroundB = "b"
const backgroundC = "c"
const chakramUp = "u"
const chakramDown = "d"
const chakramLeft = "l"
const chakramRight = "r"
const bullet0 = "0"
const bullet1 = "1"
const bullet2 = "2"
const bullet3 = "3"

const monstersound = tune`
303.030303030303: C4-303.030303030303,
9393.939393939392` 
const wwntune = tune`
208.33333333333334: E4~208.33333333333334 + G5/208.33333333333334 + C4^208.33333333333334 + B5-208.33333333333334,
208.33333333333334: F4~208.33333333333334 + F5/208.33333333333334 + D4^208.33333333333334 + A5-208.33333333333334,
208.33333333333334: G4~208.33333333333334 + E5/208.33333333333334 + E4^208.33333333333334 + G5-208.33333333333334,
208.33333333333334: A4~208.33333333333334 + D5/208.33333333333334 + F4^208.33333333333334 + F5-208.33333333333334,
208.33333333333334: G4~208.33333333333334 + A4^208.33333333333334,
208.33333333333334: B4~208.33333333333334 + E4^208.33333333333334,
208.33333333333334: C5-208.33333333333334 + F4^208.33333333333334,
208.33333333333334: D5~208.33333333333334 + G4^208.33333333333334,
208.33333333333334: B4/208.33333333333334,
208.33333333333334: A5^208.33333333333334 + G5/208.33333333333334 + F5-208.33333333333334 + B5~208.33333333333334,
4583.333333333334`
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
const bossmusic =  tune `
112.35955056179775: C4~112.35955056179775,
112.35955056179775: E4~112.35955056179775 + G5-112.35955056179775,
112.35955056179775: A4^112.35955056179775 + E5^112.35955056179775,
112.35955056179775: G5-112.35955056179775,
112.35955056179775: C4~112.35955056179775 + C5/112.35955056179775 + E5^112.35955056179775,
112.35955056179775: E4~112.35955056179775 + G5-112.35955056179775,
112.35955056179775: A4^112.35955056179775 + E5^112.35955056179775,
112.35955056179775: C5/112.35955056179775 + G5-112.35955056179775,
112.35955056179775: C4~112.35955056179775 + E5^112.35955056179775,
112.35955056179775: E4~112.35955056179775 + G5-112.35955056179775,
112.35955056179775: A4^112.35955056179775 + C5/112.35955056179775 + E5^112.35955056179775,
112.35955056179775: C4-112.35955056179775 + G5-112.35955056179775,
112.35955056179775: B4/112.35955056179775 + E5^112.35955056179775,
112.35955056179775: G4^112.35955056179775 + E4-112.35955056179775 + G5-112.35955056179775,
112.35955056179775: A4/112.35955056179775 + E5^112.35955056179775,
112.35955056179775: G5-112.35955056179775,
112.35955056179775: F4/112.35955056179775 + A5-112.35955056179775,
112.35955056179775: B5-112.35955056179775,
112.35955056179775: A5-112.35955056179775 + G4^112.35955056179775,
112.35955056179775: C5/112.35955056179775 + G5-112.35955056179775,
112.35955056179775: A5-112.35955056179775 + A4^112.35955056179775,
112.35955056179775: B5-112.35955056179775,
112.35955056179775: A5-112.35955056179775 + F4^112.35955056179775,
112.35955056179775: G4/112.35955056179775 + G5-112.35955056179775,
112.35955056179775: A5-112.35955056179775 + E4^112.35955056179775,
112.35955056179775: B5-112.35955056179775,
112.35955056179775: E4^112.35955056179775 + A5-112.35955056179775,
112.35955056179775: C5/112.35955056179775 + G5-112.35955056179775,
112.35955056179775: G4^112.35955056179775 + A5-112.35955056179775,
112.35955056179775: B5-112.35955056179775,
112.35955056179775: F5/112.35955056179775 + C5^112.35955056179775 + B5~112.35955056179775 + G5~112.35955056179775,
112.35955056179775: A5-112.35955056179775`
const deathtune = tune `
500,
500: G4~500 + E4/500,
500: F4~500 + D4/500,
500: E4~500 + C4/500,
500: C4~500 + D4-500 + E4-500 + F4-500,
13500`
const credits = tune `
428.57142857142856: F5/428.57142857142856 + C5~428.57142857142856 + E4-428.57142857142856 + C4^428.57142857142856,
428.57142857142856: E5/428.57142857142856 + B4~428.57142857142856 + F4-428.57142857142856 + D4^428.57142857142856,
428.57142857142856: D5/428.57142857142856 + A4~428.57142857142856 + G4-428.57142857142856 + E4^428.57142857142856,
428.57142857142856: E4^428.57142857142856 + G4-428.57142857142856 + A4~428.57142857142856 + D5/428.57142857142856,
428.57142857142856: D4^428.57142857142856 + F4-428.57142857142856 + B4~428.57142857142856 + E5/428.57142857142856,
428.57142857142856: C4^428.57142857142856 + E4-428.57142857142856 + C5~428.57142857142856 + F5/428.57142857142856,
428.57142857142856: E5/428.57142857142856 + B4~428.57142857142856 + F4-428.57142857142856 + D4^428.57142857142856,
428.57142857142856: D5/428.57142857142856 + A4~428.57142857142856 + G4-428.57142857142856 + E4^428.57142857142856,
428.57142857142856: B4~428.57142857142856 + F4-428.57142857142856 + D4^428.57142857142856 + E5/428.57142857142856,
428.57142857142856: C5~428.57142857142856 + G4-428.57142857142856 + E4^428.57142857142856 + F5/428.57142857142856,
428.57142857142856: D5~428.57142857142856 + A4-428.57142857142856 + F4^428.57142857142856 + G5/428.57142857142856,
428.57142857142856: A5/428.57142857142856 + E5~428.57142857142856 + B4-428.57142857142856 + G4^428.57142857142856,
428.57142857142856: B5/428.57142857142856 + F5~428.57142857142856 + C5-428.57142857142856 + A4^428.57142857142856,
428.57142857142856: B5/428.57142857142856 + F5~428.57142857142856 + C5-428.57142857142856 + A4^428.57142857142856,
428.57142857142856: E5~428.57142857142856,
428.57142857142856: C5~428.57142857142856,
428.57142857142856: D4^428.57142857142856 + C4-428.57142857142856 + G5/428.57142857142856,
428.57142857142856: C4-428.57142857142856 + D4^428.57142857142856 + G5/428.57142857142856,
428.57142857142856: C4-428.57142857142856 + D4^428.57142857142856 + G5/428.57142857142856,
5571.428571428572`

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
  [backgroundA, bitmap`
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
  [backgroundB, bitmap`
9999999999999999
911111L111L11119
99111111111111L9
991L111111111119
91111111LL111119
9111111111111119
9111111111111199
9111111111111199
9LL11111L1111119
9111111111111119
9111111111111119
9111111111111199
91111L1111L11119
9111111111111119
9L11111119L11119
9999999999999999`],
  [backgroundC, bitmap`
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
  [chakramUp, bitmap`
................
................
................
................
......LLLL......
.....LHHHHL.....
....LH...FHL....
....LH..FFHL....
....LHFF..HL....
....LHF...HL....
.....LHHHHL.....
......LLLL......
................
........2.......
.......2........
................`],
  [chakramDown, bitmap`
................
........2.......
.......2........
................
......LLLL......
.....LHHHHL.....
....LH...FHL....
....LH..FFHL....
....LHFF..HL....
....LHF...HL....
.....LHHHHL.....
......LLLL......
................
................
................
................`],
  [chakramLeft, bitmap`
................
................
................
................
......LLLL......
.....LHHHHL.....
....LH...FHL....
....LH..FFHL.2..
....LHFF..HL..2.
....LHF...HL....
.....LHHHHL.....
......LLLL......
................
................
................
................`],
  [chakramRight, bitmap`
................
................
................
................
......LLLL......
.....LHHHHL.....
....LH...FHL....
.2..LH..FFHL....
..2.LHFF..HL....
....LHF...HL....
.....LHHHHL.....
......LLLL......
................
................
................
................`],
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
  [boss, bitmap`
.....0HHHH0.....
.H..HH0HH0H8..8.
.H.HHHHHHHHH8.8.
.HHHHH3HH3HHHH8.
..HHHHHHHHHHH8..
...HHH0000HHH...
...HH000000HH...
HH..HHHHHHHH..88
.HHH..0FF0..HH8.
.HHHH.HHHH.HHH8.
HHH.HHHHHHHH.HH8
HH..HHHHHHHH..H8
.HH.00033000.H8.
....HHHHHHHH....
...HH......H8...
..HH........H8..`],
  [enemy, bitmap`
.....033330.....
....33033038....
...3333333338...
...3330330338...
..333333333338..
...3330000338...
...3303333038...
....33333338....
..3...9999...8..
.3333.3333.3338.
333.33333333.338
33..33333333..38
.33.99966999.38.
....33333333....
...33......38...
..33........38..`]
  
)

setSolids([player, bullet0, bullet1, bullet2, bullet3])

let level = 0
const levels = [
  map`
..............
..............
.e.....e...e..
...e..........
..............
......p..e....
.e............
..............
..e..e.....e..
........e.....
..............`,
  map`
..............
..............
..............
..............
......s.......
..............
..............
..............
......p.......
..............
..............`,
  map`
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............
..............`,
]

setMap(levels[level])

setPushables({
  [ boss ]: []
})

setBackground(backgroundA)

playTune(music)

setInterval ( () => {
  if (Alive === true && BossReady === false) {
    playTune(music)
  }
}, 7000)


let interval = setInterval(TimeFunction, 1000) // This block is code is responsible for the in-game timer
function TimeFunction() {
  if (TimeLeft > 0 && Alive === true && BossReady === false) {
    TimeLeft--
    addText(`${TimeLeft}`, {
      x: 18,
      y: 0,
      color: color`6`
    })
  }
  else if (TimeLeft == 0) {
    clearInterval(interval)
  } 
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
        break;
    default:
      break;
        
    }
  });
}

 function BossMoving() { // Function that makes the boss moves
  getAll(boss).forEach(bossSprite => {
    let RandInt = Math.floor(Math.random() * (4 - 1 + 1)) + 1; // the number chosen will be between 1 & 4

    switch(RandInt) {

      case 1:
        bossSprite.y -= 1; // Moves the boss upwards 
        break;
      case 2:
        bossSprite.y += 1; // Moves the boss downwards 
        break;
      case 3:
        bossSprite.x += 1; // Moves the boss to the right 
        break;
      case 4:
        bossSprite.x -= 1; // Moves the boss to the left 
        break;
    default:
      break;
        
    }
  });
}

setInterval(()  => {
  if (Alive === true) {
    MonsterMoving()
    BossMoving()
  }
}, 300)

function RandomiseCoords() {
    RandX = Math.floor(Math.random() * (13 - 0 + 1)) + 0; // the number for the coords will be between 0 & 13
    RandY = Math.floor(Math.random() * (10 - 0 + 1)) + 0; // the number for the coords will be between 0 & 10
}

setInterval(() => {
  if (Alive === true && BossReady === true) {

  const wallsY = ["0", "10"]
  const wallsX = ["0", "13"]
    
    let chakramsUp = getAll(chakramUp);
    for (let i = 0; i < chakramsUp.length; i++) {
      chakramsUp[i].y--;
      if (chakramsUp[i].y === 0) {
        chakramsUp[i].remove() 
      }
    }
    let chakramsDown = getAll(chakramDown);
    for (let i = 0; i < chakramsDown.length; i++) {
      chakramsDown[i].y++; 
      if (chakramsDown[i].y === 10) {
        chakramsDown[i].remove() 
      }
    }
    
    let chakramsLeft = getAll(chakramLeft);
    for (let i = 0; i < chakramsLeft.length; i++) {
      chakramsLeft[i].x--;
      if (chakramsLeft[i].x === 0) {
        chakramsLeft[i].remove() 
      }
    }
    
    let chakramsRight = getAll(chakramRight);
    for (let i = 0; i < chakramsRight.length; i++) {
      chakramsRight[i].x++;
      if (chakramsRight[i].x === 13) {
        chakramsRight[i].remove() 
      }
    }
    
  }
}, 50)

setInterval(() => {

  if (Alive === true && BossReady === true) {
    
    let RandInt = Math.floor(Math.random() * (4 - 1 + 1)) + 1; // the number chosen will be between 1 & 4
  
    if (RandInt == 1) {
      addSprite(getFirst(boss).x, getFirst(boss).y, chakramUp) // This line create chakrams
    } else if (RandInt == 2) {
      addSprite(getFirst(boss).x, getFirst(boss).y, chakramDown) // This line create chakrams
    } else if (RandInt == 3) {
      addSprite(getFirst(boss).x, getFirst(boss).y, chakramLeft) // This line create chakrams
    } else if (RandInt == 4) {
      addSprite(getFirst(boss).x, getFirst(boss).y, chakramRight) // This line create chakrams
    } 
  }
}, 600) 

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
  
  addText(`Score: ${score}`, {
  x: 0,
  y: 0,
  color: color`6`
  })
  
  if (Alive === true) {
    let bullets0 = getAll(bullet0);
    for (let i = 0; i < bullets0.length; i++) {
      if (bullets0[i].y === 0) {
        bullets0[i].remove()
        RandomiseCoords()
      }
      playTune(shootsound)
      bullets0[i].y--;
    }
    let bullets1 = getAll(bullet1);
    for (let i = 0; i < bullets1.length; i++) {
      if (bullets1[i].y === 10) {
        bullets1[i].remove()
        RandomiseCoords()
      }
      playTune(shootsound)
      bullets1[i].y++;
    }
    let bullets2 = getAll(bullet2);
    for (let i = 0; i < bullets2.length; i++) {
      if (bullets2[i].x === 0) {
        bullets2[i].remove()
        RandomiseCoords()
      }
      playTune(shootsound)
      bullets2[i].x--;
    }
    let bullets3 = getAll(bullet3);
    for (let i = 0; i < bullets3.length; i++) {
      if (bullets3[i].x === 13) {
        bullets3[i].remove()
        RandomiseCoords()
      }
      playTune(shootsound)
      bullets3[i].x++;
    }
    
  }
}, 25)

setInterval(() => {
  if (Alive === true && BossReady === false) { // This block is code is responsible for making enemies die
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
  }
    if (Alive === true && TimeLeft === 0 && BossReady === false) {
      Alive = false
      BossReady = true
      addText(`YOU WIN!`, {
        x: 6,
        y: 5,
        color: color`6`
      }) 
      addText(`Bonus Challenge: i`, {
        x: 1,
        y: 11,
        color: color`0`
      }) 
      addText(`Score: ${score}`, {
        x: 6,
        y: 8,
        color: color`6`
      })
      playTune(wintune)
  }
}, 25)

setInterval(() => {
  if (Alive === true && BossReady === true) { // This block is code is responsible for making the boss lose health
  let tiles = tilesWith(bullet0, boss)
  for (let i = 0; i < tiles.length; i++) {
    playTune(monstersound)
    score++
    BossHP--
    }
  tiles = tilesWith(bullet1, boss)
  for (let i = 0; i < tiles.length; i++) {
    playTune(monstersound)
    score++
    BossHP--
    }
  tiles = tilesWith(bullet2, boss)
  for (let i = 0; i < tiles.length; i++) {
    playTune(monstersound)
    score++
    BossHP--
    }
  tiles = tilesWith(bullet3, boss)
  for (let i = 0; i < tiles.length; i++) {
    playTune(monstersound)
    score++
    BossHP--
    }
    
  addText(`BOSS: ${BossHP}`, {
    x: 5,
    y: 1,
    color: color`5`
  })
          
  // This block is code is responsible for making the player die from the boss
  const killtiles = tilesWith(player, boss) 
  const killtiles1 = tilesWith(player, chakramUp) 
  const killtiles2 = tilesWith(player, chakramDown)
  const killtiles3 = tilesWith(player, chakramLeft) 
  const killtiles4 = tilesWith(player, chakramRight) 
  
      for (let i = 0; i < killtiles1.length; i++) {
        playTune(monstersound)
        clearTile(killtiles1[i][0].x, killtiles1[i][0].y)
        Alive = false
        CanRevive = false
        playTune(deathtune)
        addText(`GAME OVER!`, {
          x: 5,
          y: 8,
          color: color`6`
        })
      }
      for (let i = 0; i < killtiles2.length; i++) {
        playTune(monstersound)
        clearTile(killtiles2[i][0].x, killtiles2[i][0].y)
        Alive = false
        CanRevive = false
        playTune(deathtune)
        addText(`GAME OVER!`, {
          x: 5,
          y: 8,
          color: color`6`
        })
      }
      for (let i = 0; i < killtiles3.length; i++) {
        playTune(monstersound)
        clearTile(killtiles3[i][0].x, killtiles3[i][0].y)
        Alive = false
        CanRevive = false
        playTune(deathtune)
        addText(`GAME OVER!`, {
          x: 5,
          y: 8,
          color: color`6`
        })
      }
      for (let i = 0; i < killtiles4.length; i++) {
        playTune(monstersound)
        clearTile(killtiles4[i][0].x, killtiles4[i][0].y)
        Alive = false
        CanRevive = false
        playTune(deathtune)
        addText(`GAME OVER!`, {
          x: 5,
          y: 8,
          color: color`6`
        })
      }
      if (Alive === true && BossHP === 0) { 
        Alive = false
        setMap(levels[2])
        setBackground(backgroundC)
        clearText()
        playTune(credits)
        addText(`YOU BEAT THE GAME!`, {
         x: 1,
         y: 5,
         color: color`3`
        })
        addText(`BY DUMBHOG`, {
         x: 5,
         y: 10,
         color: color`6`
        }) 
      }
  }
}, 25)


onInput("i", () => { 
  if (BossReady === true && Alive === false && CanRevive === true) {
    setBackground(backgroundB)
    clearText()
    Alive = true
    setMap(levels[1])
  }
})
    
setInterval( () => {
  if (BossReady === true && Alive === true) {
    playTune(bossmusic)
  }
}, 5000)

afterInput(() => {
  
})
