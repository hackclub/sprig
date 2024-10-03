/*
@title: Sprig Clicker
@author: xriiitox (Josh Baron)
@tags: ['endless']
@addedOn: 2024-06-29
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p"
const bg = "b"
const sprig = "s"
const calmSoil = "c"
const fert = "f"
const scythe = "y"
const mult = "m"

let clickCounter = 0
let sprigTeleportLimit = 10
let sprigsPerClick = 1
let additionalSpc = 1
let sprigs = 0
let multiplier = 1
let nextMult = 0.1
let sprigsToWin = 2e6
let wonGame = false

//upgrade levels 
let soilLv = 0
let fertLv = 0
let scytheLv = 0
let multLv = 0

// probably not balanced at all
let soilCost = 10
let fertCost = 2
let scytheCost = 100
let multCost = 200
  
setLegend(
  [ bg, bitmap`
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
  [ player, bitmap`
4444........4444
444..........444
44............44
4..............4
................
................
................
................
................
................
................
................
4..............4
44............44
444..........444
4444........4444` ],
  [ sprig, bitmap`
................
................
......DDDD......
......D..D......
DD.DD.D..D.DD.DD
D.DD.DDDDDD.DD.D
.D..DDDDDDDD..D.
..DDDDDDDDDDDD..
....DDDDDDDD....
.......DD.......
.......DD.......
.......DD.......
.......DD.......
.......DD.......
.......DD.......
.......DD.......` ],
  [ calmSoil, bitmap`
CCCC......CCCC..
CCCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
.C22C222C2CC222C
.C2CC2C2C2CC2C2C
.C2CC222C2CC2C2C
.C22C2C2C22C2C2C
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
.CCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCC.......CCCCC` ],
  [ fert, bitmap`
DDDD......DDDD..
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
D222D222D222D222
D2DDD2DDD2D2DD2D
D222D222D222DD2D
D2DDD2DDD22DDD2D
D2DDD2DDD2D2DD2D
D2DDD222D2D2DD2D
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDD.......DDDDD` ],
  [ scythe, bitmap`
................
.....1111111....
..111111111111L.
1111111111111LL.
1111111111111LL.
.1111......LLL..
..........LLL...
.........LLL....
........LLL.....
......LLLL......
.....LLLL.......
....LLL.........
...LLL..........
..LLL...........
.LLL............
LLL.............` ],
  [ mult, bitmap`
................
.222........222.
.2222......2222.
.22222....22222.
..22222..22222..
...2222222222...
....22222222....
.....222222.....
.....222222.....
....22222222....
...2222222222...
..22222..22222..
.22222....22222.
.2222......2222.
.222........222.
................` ]
)
setSolids([])

setBackground(bg)

let level = 0
const levels = [
  map`
.........
.........
....p....
....s....
.........
.........
.........
.........`, // main clicking screen
  map`
........p
.........
.........
........c
.........
........f
.........
.........`, // shop 1 (upgrades 1+2)
  map`
........p
........y
.........
.........
.........
.........
........m
.........`, // shop 2 (upgrades 3+4)
  map`
.........
.........
.........
.........
.........
.........
.........
.........`, // upgrade info screen (1+2)
  map`
.........
.........
.........
.........
.........
.........
.........
.........`, // upgrade info screen 2 (3+4)
  map`
.........
.........
.........
.........
.........
.........
....p....
.........` // win screen after 2 million sprigs
]

const music = tune`
500: A4~500 + F4~500 + C4~500,
1500,
500: E4~500 + C4~500 + A4~500,
1500,
500: A4~500 + F4~500 + C4~500,
1500,
500: A4~500 + E4~500 + C4~500,
1500,
500: A4~500 + C4~500 + F4~500 + D5^500,
500: E5^500,
500: F5^500,
500: E5^500,
500: E4~500 + C4~500 + A4~500 + E5^500,
500: D5^500,
500: E5^500,
500: D5^500,
500: F4~500 + C4~500 + A4~500,
500: C5^500,
500: E5^500,
500,
500: E4~500 + C4~500 + A4~500,
500,
500: C5^500,
500`
const musicPlaying = playTune(music, Infinity)

const clickFx = tune`
79.7872340425532: F4/79.7872340425532,
2473.404255319149`

const failClickFx = tune`
87.20930232558139: B4^87.20930232558139,
87.20930232558139: A4^87.20930232558139,
87.20930232558139: G4~87.20930232558139,
87.20930232558139: F4^87.20930232558139,
87.20930232558139: E4^87.20930232558139,
2354.6511627906975`

const winJingle = tune`
229.00763358778627: C5/229.00763358778627,
229.00763358778627: C5/229.00763358778627,
229.00763358778627: C5/229.00763358778627,
229.00763358778627: C5/229.00763358778627,
458.01526717557255,
229.00763358778627: G4/229.00763358778627,
458.01526717557255,
229.00763358778627: A4/229.00763358778627,
458.01526717557255,
229.00763358778627: C5/229.00763358778627,
229.00763358778627,
229.00763358778627: B4/229.00763358778627,
229.00763358778627: C5/229.00763358778627,
3664.1221374045804`

setMap(levels[level])

setPushables({
  [ player ]: []
})

function onTile(bmp) {
  return getFirst(player).x === getFirst(bmp).x &&
       getFirst(player).y === getFirst(bmp).y
}

addText("press i for shop", {

    x: 0,
    y: 14,
    color: color`2`
  
})

addText("press j for info", {
      x: 0,
      y: 15,
      color: color`2`})

addText("sprigs: " + sprigs, {
    x: 0,
    y: 0,
    color: color`2`
  })

// movement
onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

//functional keys

// rotate through shop screens and add text + etc
onInput("i", () => {
  //open shop if main screen, else back to main screen
  level = level === 0 ? 1 : 
          level === 1 ? 2 :
          level === 2 ? 0 : 0
  setMap(levels[level])
  clearText()
  if (level === 0) {
    addText("press i for shop", {
      x: 0,
      y: 14,
      color: color`2`})
    addText("press j for info", {
      x: 0,
      y: 15,
      color: color`2`})
  }
  if (level === 1) {

    addText("press l on upgrade\nicon to buy", {
      x: 0,
      y: 14,
      color: color`2`})
    
    // add text for upgrades
    addText("\"calning\" soil\nmore clicks before\nsprig moves: lv " + soilLv + "\ncost: " + soilCost, {
      x: 0,
      y: 3,
      color: color`2`
    })
    addText("fertilizer: lv " + fertLv + "\nmore sprigs per\nclick\ncost: " + fertCost, {
      x: 0,
      y: 8,
      color: color`2`
    })
  }

  if (level === 2) {

    addText("press l on upgrade\nicon to buy", {
      x: 0,
      y: 14,
      color: color`2`})

    addText("scythe: lv " + scytheLv + "\nautoclicker\nsprig will not move\ncost: " + scytheCost, {
      x: 0,
      y: 3,
      color: color`2`
    })

    addText("multiplier: lv " + multLv + "\nflat multiplier to\nsprig per click gain\ncost: " + multCost, {
      x: 0,
      y: 8,
      color: color`2`
    })
    
  }
})

// selection key
onInput("l", () => {
  playTune(clickFx) // intended double equals 8)
  if ( level === 0 && 
      onTile(sprig) ) {

    sprigs += Math.round(sprigsPerClick * multiplier)

    clickCounter++
    
    if (clickCounter === sprigTeleportLimit) {

      getFirst(sprig).x = Math.floor(Math.random() * 9);
      getFirst(sprig).y = Math.floor(Math.random() * 8);
      clickCounter = 0
      
    }
    
  }

  // upgrade purchase checking
  if (level === 1) {

    if (onTile(calmSoil) && sprigs >= soilCost) {

      soilLv++
      sprigs -= soilCost
      soilCost *= 1.15 // 15% more expensive after each upgrade
      soilCost = Math.floor(soilCost)

      sprigTeleportLimit += 5
      
    }
    else if (onTile(fert) && sprigs >= fertCost) {

      fertLv++
      sprigs -= fertCost
      sprigsPerClick += additionalSpc
      additionalSpc += 1
      fertCost *= 1.75 // 75% increase for balancing purposes
      fertCost = Math.ceil(fertCost)
      
      
    } else if ((onTile(calmSoil) && sprigs < soilCost) || (onTile(fert) && sprigs < fertCost) ) playTune(failClickFx)
    redrawSprigs()
    
  }

  if (level === 2) {

    if (onTile(scythe) && sprigs >= scytheCost) {

      scytheLv++
      sprigs -= scytheCost
      scytheCost *= 1.15
      scytheCost = Math.floor(scytheCost)
      
    }
    else if (onTile(mult) && sprigs >= multCost) {

      multLv++
      sprigs -= multCost
      multiplier += nextMult
      multCost *= 1.15
      multCost = Math.floor(multCost)
      
    } else if ((onTile(scythe) && sprigs < scytheCost) || (onTile(mult) && sprigs < multCost) ) playTune(failClickFx)
    
  }
  
})

// rotate through info screens
onInput("j", () => {

  level = level <= 2 ? 3 :
          level === 3 ? 4 : 0
  setMap(levels[level])

  if (level === 0) {
    clearText()
    addText("press i for shop", {
    x: 0,
    y: 14,
    color: color`2`})

    addText("press j for info", {
      x: 0,
      y: 15,
      color: color`2`})
  
  }

  if (level === 3) {

    clearText()
  
     addText("\"calning\" soil\nadds 5 clicks before\nsprig moves", {
      x: 0,
      y: 3,
      color: color`2`
    })

    addText(`fertilizer\nwill add '${additionalSpc}' to\nsprigs per click`, {
      x: 0,
      y: 8,
      color: color`2`
    })
  
  }

  if (level === 4) {
    
    clearText()
    addText("the scythe\nclicks for you\nevery second", {
      x: 0,
      y: 3,
      color: color`2`
    })

    addText(`multiplier\ncurrently multiplies\nyour sprigs by ${multiplier.toFixed(1)}\nand will increase by\n${nextMult} next level`, {
      x: 0,
      y: 8,
      color: color`2`
    })
  
  }
})

// go back to main screen
onInput("k", () => {

  level = 0
  setMap(levels[level])
  clearText()
  addText("press i for shop", {
      x: 0,
      y: 14,
      color: color`2`})
    addText("press j for info", {
      x: 0,
      y: 15,
      color: color`2`})
  
  
})

async function redrawSprigs() {

  addText("                    ", { // hacky ahh solution (overwrite text with nothing so that the old text is not shown)
    x: 0,
    y: 0,
    color: color`2`
  })

  addText("sprigs: " + sprigs, {
    x: 0,
    y: 0,
    color: color`2`
  })
  
}

async function scytheClicker() {
  sprigs += 0.5 * multiplier * scytheLv * sprigsPerClick
  sprigs = Math.ceil(sprigs)
}

async function checkForWin() {
  if (!wonGame && sprigs >= sprigsToWin) {
    wonGame = true
    playTune(winJingle)
    level = 5
    setMap(levels[level])
    clearText()
    addText("Congratuations!", {
      x: 3,
      y: 3,
      color: color`2`
    })

    addText("You got 2 million\nsprigs! (this means that\nyou win!)", {
      x: 1,
      y: 5,
      color: color`2`
    })

    addText("Press k to continue\nplaying.", {
      x: 1,
      y: 9,
      color: color`2`
    })
  }
}

setInterval( () => { scytheClicker() }, 1000)
setInterval( () => { redrawSprigs() }, 200)
setInterval( () => { checkForWin() }, 500)

afterInput(() => {
  addText("sprigs: " + sprigs, {
    x: 0,
    y: 0,
    color: color`2`
  })
  if (level === 1) {
    addText("\"calning\" soil\nmore clicks before\nsprig moves\ncost: " + soilCost, {
      x: 0,
      y: 3,
      color: color`2`
    })
    addText("fertilizer: lv " + fertLv + "\nmore sprigs per\nclick\ncost: " + fertCost, {
      x: 0,
      y: 8,
      color: color`2`
    })
  }
  if (level === 2) {
    addText("scythe: lv " + scytheLv + "\nautoclicker\nsprig will not move\ncost: " + scytheCost, {
      x: 0,
      y: 3,
      color: color`2`
    })

    addText("multiplier: lv " + multLv + "\nflat multiplier to\nsprig per click gain\ncost: " + multCost, {
      x: 0,
      y: 8,
      color: color`2`
    })
  }
})