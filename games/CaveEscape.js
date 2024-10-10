/*
@title: CaveEscape
@author: Michael Taylor
@tags: ["strategy" , "action" , "real-time"]
@addedOn: 2024-02-16
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started


use WASD to move the cursor and J to select and use an action, the enemy will automatically deal damage to you after every action you take
*/

const winLevel = 6
const playerSprite = "s"
const enemy = "e"
const enemy2 = "E"
const menudiv = "d"
const player = "p"
const button1 = "1"
const button2 = "2"
const button3 = "3"
const deathBackground = "B"
const winBackground = "b"
const grass = "G"
const graveStone = "g"
const cave = "c"

var playerHealth = 5
var playerMana = 0
var playerAction = null

var enemyHealth = 10

setLegend(
  [playerSprite, bitmap`
.....000000.....
.....003333.....
.....000000.....
................
.....000000.....
....0022220.....
....0020220.0...
....00202200....
....0020220.....
....0020220.....
....0020220.....
.....022220.....
.....022220.....
.....000000.....
.....0....0.....
.....0....0.....`],
  [enemy, bitmap`
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
.....00000......
..000444430.....
.044444444400...
.0444344444440..
0444444444444400`],
  [enemy2, bitmap`
................
................
................
................
.....000........
....00000.......
....30300.......
....00000.......
.....000........
.......0000.....
..00..000.00....
.0..000.0..0....
...00...0..0....
..0.0.0....0....
..0..0...00.0...
........0....0..`],
  [menudiv, bitmap`
0000000000000000
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
................
................
................`],
  [player, bitmap`
000..........000
0..............0
0..............0
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
0..............0
0..............0
000..........000`],
  [button1, bitmap`
..333333333333..
.33333333333333.
3333333333311333
3333333333112333
3333333331112333
3333333311112333
3333333111123333
3333331111233333
3333CC1111333333
33333CC113333333
3333CCCC33333333
333CCC3C33333333
333CC33333333333
3333333333333333
.33333333333333.
..333333333333..`],
  [button3, bitmap`
..660000000066..
.60000000000006.
6060000000000606
6000000000000006
0000000000000000
0000020000200000
0000002222000000
0000002020000000
0000002222000000
0000000202000000
0000020000200000
0000000000000000
6000000000000006
6060000000000606
.60000000000006.
..660000000066..`],
  [button2, bitmap`
..444444444444..
.44444444444444.
444CC44444444444
444334444444D444
44432444444D4444
4443344444D44444
444324444D444444
44432444D4444444
4444444D444CC444
444444D444477444
44444D4444472444
4444D44444777244
444D444444777744
4444444444477444
.44444444444444.
..444444444444..`],
  [deathBackground, bitmap`
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
  [graveStone, bitmap`
................
................
................
................
....LL111111....
....LL11LL11....
....LL111111....
....LL1LL1L1....
....LL111111....
....LL1L1LL1....
....LL111111....
....LL111114....
..4CLCC1CD14....
...4CLCCC1DC.C..
.CCCCCCCCCCCCCC.
................`],
  [grass, bitmap`
DDDDDDDDDDD4DD44
DD3DDDDDDDDDDDDD
D363DDDDDDDDDDDD
DD3DDDDDD4DDDDDD
DD4DDD4D4DDDDDDD
DD4DDDD44DDDDD4D
DDDDDDDDDDDDDDDD
DDDDD4DDDDDD3DDD
DDDD4DDDDDD363DD
DDD444DDD4D43DDD
DDDDDDDDDD44DDDD
DDDDDDDDDDD4D4DD
D4DDDDDDDD444DDD
DD4DDDDDDDDDDDDD
D44DDDD4DDDDDDDD
DDDDDDD44DDD4DDD`],
  [cave, bitmap`
.......L1111....
.....LLL1L111...
....LLLLL111LL..
....LLL111111L..
...LLL11110001L.
...LL1111000001.
...LL1100000001.
..LL1L100030301.
..LL11100000001.
..LL11100000001L
..L1110000033031
.LLL110000000001
.LLL110303000001
.LL1110000000001
LLL1100000000001
LL11100000303001`]
)

let level = 1
const levels = [
  map`
g`,
  map`
.............
.s.........e.
ddddddddddddd
1............
2.p..........
3............
.............`,
  map`
.............
..s........e.
ddddddddddddd
1............
2.p..........
3............
.............`,
  map`
.............
...s.......e.
ddddddddddddd
1............
2.p..........
3............
.............`,
  map`
..............
....s......E..
dddddddddddddd
1.............
2.p...........
3.............
..............`,
  map`
.............
.s.....E.....
ddddddddddddd
1............
2.p..........
3............
.............`,
  map`
.............
.............
.............
....c..s.....
.............
.............
.............`,
  map`
......p......
.............
.............
......g......
.............
.............
.............`
]

setMap(levels[level])

function globalUpdate() {
  if (playerHealth >= 0 & level != winLevel) {
  clearText()
  addText("mp" + playerMana, {x: 0, y: 6, color: color`5`})
  addText("hp" + playerHealth, {x: 4, y: 6, color: color`3`})
  addText("hp" + enemyHealth, {x: 16, y: 6, color: color`3`})
  addText("dmg" + level, {x: 16, y: 7, color: color`6`})
  playerAction = buttonHover(getFirst(player).x, getFirst(player).y)
  if(enemyHealth <= 0) {
    level += 1
    setMap(levels[level])
    enemyHealth = 6 + level * 2
    }
  } else if(level != winLevel) {
    level = 7
    setMap(levels[level])
    clearText()
    addText("YOU DIED", {x: 6, y: 5, color: color`3`})
    setBackground("B")
  } else {
    clearText()
    addText("YOU ESCAPED!", {x: 4, y: 5, color: color`6`})
    setBackground("G")
  }
}

function buttonHover(xPos, yPos) {
  if (xPos == 0) { 
    if (yPos == 3) {
        addText(" Stab: \n Damage enemy equal \n to health", { x: 1, y: 7, color: color`3`})
        return "stab"
    } else if (yPos == 4) {
        addText(" Gamble: \n Gain mana 25% \n Gain health 75%.", { x: 1, y: 7, color: color`4`})
        return "gamble"
    } else if (yPos == 5) {
        addText(" Hex: \n Spend 3 mana to \n erase the enemy \n from existance.", { x: 1, y: 7, color: color`0`})
        return "hex"
    } else {
    return null
    }
  } 
}

const playerStateMachine = {
  stab: function () {
    if (playerAction == "stab") {
    enemyHealth -= playerHealth
    }
  },
  gamble: function () {
    if (Math.round(Math.random(4)) == 1 & playerAction == "gamble") {
      playerMana += 1
    } else if (playerAction == "gamble"){
        playerHealth += level + 1
      }
  },
  hex: function () {
    if (playerMana >= 3 & playerAction == "hex") {
      enemyHealth = 0
      playerMana -= 3
    } else {
      playerHealth += 1
    }
  }
}

onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("j", () => {
  switch (playerAction) {
    case "stab":
      playerStateMachine.stab()
    case "gamble":
      playerStateMachine.gamble()
    case "hex":
      playerStateMachine.hex()
  }
  playerHealth -= level
})

afterInput(() => {
})

setInterval(globalUpdate, 250)
