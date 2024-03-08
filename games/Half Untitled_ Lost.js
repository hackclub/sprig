/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@img: ""
@addedOn: 2024-00-00
*/

const player = "p"
const hyperHostile = "H"
const hostile = "h"
const slashattackup = "A"
const slashattackdown = "a"
const slashattackleft = "<"
const slashattackright = ">"
const barrier = "b"
const battery = "B"
const capacitor = "c"

var movesleft = 26
const something1 = tune`
157.89473684210526: A4-157.89473684210526,
157.89473684210526: A4-157.89473684210526,
157.89473684210526: A4-157.89473684210526,
157.89473684210526: A4-157.89473684210526,
157.89473684210526,
157.89473684210526: C5-157.89473684210526,
157.89473684210526: B4-157.89473684210526,
157.89473684210526: A4-157.89473684210526,
157.89473684210526,
157.89473684210526: A4-157.89473684210526,
157.89473684210526: C5-157.89473684210526,
157.89473684210526: A4-157.89473684210526,
157.89473684210526: C5-157.89473684210526,
157.89473684210526: B4-157.89473684210526,
157.89473684210526: A4-157.89473684210526,
157.89473684210526,
157.89473684210526: E5-157.89473684210526,
157.89473684210526: A4-157.89473684210526,
157.89473684210526,
157.89473684210526: C5-157.89473684210526,
157.89473684210526: G4-157.89473684210526,
157.89473684210526,
157.89473684210526: B4-157.89473684210526,
157.89473684210526: F4-157.89473684210526,
157.89473684210526,
157.89473684210526: F4-157.89473684210526,
157.89473684210526: G4-157.89473684210526,
157.89473684210526: A4-157.89473684210526,
157.89473684210526,
157.89473684210526: F4-157.89473684210526,
157.89473684210526: F4-157.89473684210526,
157.89473684210526`
const something2 = tune`
157.89473684210526: E5-157.89473684210526,
157.89473684210526: A4-157.89473684210526,
157.89473684210526,
157.89473684210526: D5-157.89473684210526,
157.89473684210526: G4-157.89473684210526,
157.89473684210526,
157.89473684210526: B4-157.89473684210526,
315.7894736842105,
157.89473684210526: B4-157.89473684210526,
157.89473684210526: C5-157.89473684210526,
157.89473684210526: D5-157.89473684210526,
157.89473684210526: B4-157.89473684210526,
157.89473684210526: G4-157.89473684210526,
157.89473684210526: A4-157.89473684210526,
157.89473684210526,
157.89473684210526: A4-157.89473684210526 + E5~157.89473684210526,
157.89473684210526: A4-157.89473684210526 + E5~157.89473684210526,
157.89473684210526,
157.89473684210526: C5-157.89473684210526 + A4~157.89473684210526,
157.89473684210526: C5-157.89473684210526 + A4~157.89473684210526,
157.89473684210526,
157.89473684210526: B4-157.89473684210526 + C5~157.89473684210526,
157.89473684210526: B4-157.89473684210526 + C5~157.89473684210526,
157.89473684210526: D5~157.89473684210526,
157.89473684210526: G4-157.89473684210526 + D5~157.89473684210526 + B4~157.89473684210526,
157.89473684210526: G4-157.89473684210526 + B4~157.89473684210526,
157.89473684210526,
157.89473684210526: A4-157.89473684210526 + G4~157.89473684210526,
157.89473684210526: A4-157.89473684210526 + G4~157.89473684210526,
157.89473684210526: A4~157.89473684210526,
157.89473684210526: A4~157.89473684210526`
const something3 = tune`
157.89473684210526: F4-157.89473684210526,
157.89473684210526: F4-157.89473684210526,
157.89473684210526,
157.89473684210526: G4-157.89473684210526,
157.89473684210526: G4-157.89473684210526,
157.89473684210526,
157.89473684210526: A4-157.89473684210526,
157.89473684210526: A4-157.89473684210526,
157.89473684210526,
157.89473684210526: B4-157.89473684210526,
157.89473684210526: C5-157.89473684210526,
157.89473684210526: D5-157.89473684210526,
157.89473684210526: B4-157.89473684210526,
157.89473684210526: G4-157.89473684210526,
157.89473684210526: A4-157.89473684210526,
157.89473684210526,
157.89473684210526: E5/157.89473684210526,
157.89473684210526: E5/157.89473684210526,
157.89473684210526,
157.89473684210526: C5/157.89473684210526,
157.89473684210526: C5/157.89473684210526,
157.89473684210526,
157.89473684210526: D5/157.89473684210526,
157.89473684210526,
157.89473684210526: B4/157.89473684210526 + E5/157.89473684210526,
157.89473684210526,
157.89473684210526: D5/157.89473684210526 + F5/157.89473684210526,
157.89473684210526,
157.89473684210526: G5/157.89473684210526,
157.89473684210526: A5/157.89473684210526,
315.7894736842105`
var Encounter = false
var preventrepeat = true
var level = 0
var actuallevel = 0
var opponentstamina = 3
var opponentstamina2 = 3
var part1bool = false
var part2bool = false
let partone
let partone2
let part2
let levelchange = false
let cancelpart1timer
let cancelpart2timer
let fixluck = 1
let win = false

let batteryposition1
let batteryposition2
let playerposition


setLegend(
[ player, bitmap`
...0000000000...
...00......00...
....0......0....
....00....00....
.....000200.....
......0020......
......0020......
......0020......
......0020......
......0000......
......0000......
......0..0......
......0..0......
......0..0......
......0..0......
.....00..00.....` ],
[ hostile, bitmap`
....333033033037
...0330330330375
..330........353
.003...00000000.
.33...0000000000
.3....00.0000000
......0..3000000
......0.73300000
......0337.00000
.....7003..0000.
....33700000000.
...733.0.0700...
...37.0..5000...
......0..3000...
.......0.0300...
.........0000...`],
[ hyperHostile, bitmap`
....4D44D4474747
...D44D44D447475
..44D........455
.DD4...00000000.
.45...0000000000
.5....00.0000000
......0..D000000
.5....0.LDD00000
......04LL.00000
.....D004..0000.
.5..LDD00000000.
...4LL.0.0700...
...44.0..5000...
......0..4000...
.5.....0.0400...
.........0000...`],
[ barrier, bitmap`
0000000000000000
0000000000000000
0000000000000L00
0000000L00000L00
0000000L0000LL00
0000000L0000L000
00000000L000L000
00000000LL0L0000
00LLLLL00LLL0000
00L000L0LLLL0000
00L000LLL00L0000
00LLLLL0000LLL00
00L000L0000L00L0
00L000L0000L00L0
000000L0000L00L0
00000000000LLL00`],
[ battery, bitmap`
..LLLL444LLLLL..
..LLL4444LLLLL..
..LLL444LLLLLL..
..LL444LLL44LL..
..LL444L4444LL..
..LL444444444L..
..L444444L444L..
..L4444LL444LL..
..L44LLL4444LL..
..LLLLLL444LLL..
..LLLLL444LLLL..
..LLLLL444LLLL..
..LLLL444LLLLL..
..LLLL44LLLLLL..
..LLLL4LLLLLLL..
..LLL4LLLLLLLL..`],
[ capacitor, bitmap`
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
.L............L.
.L............L.
.L............L.
.L............L.
.LLLLLLLLLLLLLL.`],
[ slashattackup, bitmap`
................
................
................
................
444.........4444
LLL444..4444LLLL
...LLL44LLLL....
....LLLLL.......
..LL.....LLL....
.L.4.....4..LL..
L..4.....4..4.L.
L..4........4..L
4...........4..4
4...........4..4
4..............4
4..............4`],
[ slashattackdown, bitmap`
4..............4
4..............4
4..4...........4
4..4...........4
L..4........4..L
.L.4..4.....4..L
..LL..4.....4.L.
....LLL.....LL..
.......LLLLL....
....LLLL44LLL...
LLLL4444..444LLL
4444.........444
................
................
................
................`],
[ slashattackleft, bitmap`
....4L.....L4444
....4L....L.....
....4L...L......
....4L...L4444..
.....4L.L.......
.....4L.L.......
.....4L.L44.....
.....4LL........
......4L........
......4L........
.....4LL........
.....4LL........
.....4L.L444....
....4L..L.......
....4L...L......
....4L....LL4444`],
[ slashattackright, bitmap`
4444LL....L4....
......L...L4....
.......L..L4....
....444L.L4.....
........LL4.....
........LL4.....
........L4......
........L4......
........LL4.....
.....44L.L4.....
.......L.L4.....
.......L.L4.....
..4444L...L4....
......L...L4....
.....L....L4....
4444L.....L4....` ]
);

const levels = [
  map`
......
....B.
......
p.....
......
c.....`,
  map`
....
...h
....
.p..`,
  map`
....H
.....
.....
.....
p....`,
  map`
h....
.....
.....
.....
p...h`,
  map`
cb..b....
.b.B.....
.bBbbbb..
.b.......
.b.....b.
.......b.
.......b.
p......bc`,
  map`
bc.....b...
bb.....B...
cbb....b...
..bb...bbbb
...bb......
....bb.....
.....B.....
.....b.....
.....b.....
.....b.....
p....b.....`,
  map`
c...b....
....b....
....B....
....b....
....b....
....b....
....B....
....b....
p...b...c`,
  map`
...
...
p..`
]

setMap(levels[level]);

setSolids([player, barrier, battery]);

setPushables({
  [ player ]: [ battery ],
  [ battery ]: [ battery ]
});



function opponentregainstamina() 
{
  opponentstamina = 3
}

function opponentregainstamina2() 
{
  opponentstamina2 = 3
}

function hyperregainstamina() 
{
  opponentstamina = 6
}

function movetoPart1() 
{
  if (Encounter == true) 
  {
  partone = playTune(something1, 1)
  partone2 = playTune(something2, 1)
  part1bool = true
  part2bool = false 
  cancelpart1timer = setTimeout(function() {movetoPart2()}, 5050)
  }
}

function movetoPart2() 
{
  if (Encounter == true) 
  {
  partone2 = playTune(something2, 1)
  part2 = playTune(something3, 1)
  part2bool = true
  part1bool = false
  cancelpart2timer = setTimeout(function() {movetoPart1()}, 5050)
  }
}

function hmoveopponentup(numSprite) 
{
  getAll(hostile)[numSprite].y += 1
}

function hmoveopponentdown(numSprite) 
{
  getAll(hostile)[numSprite].y -= 1
}

function hmoveopponentright(numSprite) 
{
  getAll(hostile)[numSprite].x += 1
}

function hmoveopponentleft(numSprite) 
{
  getAll(hostile)[numSprite].x -= 1
}


function Hmoveopponentup(numSprite) 
{
  getAll(hyperHostile)[numSprite].y += 1
}

function Hmoveopponentdown(numSprite) 
{
  getAll(hyperHostile)[numSprite].y -= 1
}

function Hmoveopponentright(numSprite) 
{
  getAll(hyperHostile)[numSprite].x += 1
}

function Hmoveopponentleft(numSprite) 
{
  getAll(hyperHostile)[numSprite].x -= 1
}

function removezetext() 
  {
    clearText()
  }

function updatechange() 
{

    if (level == 1) 
  {
    if (tilesWith(hostile).length > 0 && getAll(player).length > 0) 
    {
    if (getFirst(player).y - getFirst(hostile).y > 0 && opponentstamina > 0) 
    {
      opponentstamina -= 1
      hmoveopponentup(0)
    }
        
    if (getFirst(player).y - getFirst(hostile).y < 0 && opponentstamina > 0) 
    {
      opponentstamina -= 1
      hmoveopponentdown(0)
    }
        
    if (getFirst(player).x - getFirst(hostile).x > 0 && opponentstamina > 0) 
    {
      opponentstamina -= 1
      hmoveopponentright(0)
    }
        
    if (getFirst(player).x - getFirst(hostile).x < 0 && opponentstamina > 0) 
    {
      opponentstamina -= 1
      hmoveopponentleft(0)
    }
        
    if (opponentstamina < 1) 
    {
       setTimeout(function() {opponentregainstamina()}, 1500)
    }
    }
  }
    
  
    if (level == 3) 
  {  
    
    if (tilesWith(hostile).length > 0 && getAll(player).length > 0) 
    {
    if (getFirst(player).y - getFirst(hostile).y > 0 && opponentstamina > 0) 
    {
      opponentstamina -= 1
      hmoveopponentup(0)
    }
        
    if (getFirst(player).y - getFirst(hostile).y < 0 && opponentstamina > 0) 
    {
      opponentstamina -= 1
      hmoveopponentdown(0)
    }
        
    if (getFirst(player).x - getFirst(hostile).x > 0 && opponentstamina > 0) 
    {
      opponentstamina -= 1
      hmoveopponentright(0)
    }
        
    if (getFirst(player).x - getFirst(hostile).x < 0 && opponentstamina > 0) 
    {
      opponentstamina -= 1
      hmoveopponentleft(0)
    }
    }

//seperate from the first enemy (i also didnt feel like doing lists for stamina lmao)
    if (tilesWith(hostile).length > 0 && getAll(player).length > 0)
    {
    if (getFirst(player).y - getAll(hostile)[1].y > 0 && opponentstamina2 > 0) 
    {
      opponentstamina2 -= 1
      hmoveopponentup(1)
    }
        
    if (getFirst(player).y - getAll(hostile)[1].y < 0 && opponentstamina2 > 0) 
    {
      opponentstamina2 -= 1
      hmoveopponentdown(1)
    }
        
    if (getFirst(player).x - getAll(hostile)[1].x > 0 && opponentstamina2 > 0) 
    {
      opponentstamina2 -= 1
      hmoveopponentright(1)
    }
        
    if (getFirst(player).x - getAll(hostile)[1].x < 0 && opponentstamina2 > 0) 
    {
      opponentstamina2 -= 1
      hmoveopponentleft(1)
    }
    }

    
        
    if (opponentstamina < 1) 
    {
       setTimeout(function() {opponentregainstamina()}, 1500)
    }

    if (opponentstamina2 < 1 && Encounter == true) 
    {
       setTimeout(function() {opponentregainstamina2()}, 1500)
    }
  }

}

function updatechange2() 
{
    if (level == 2) 
  {
    if (tilesWith(hyperHostile).length > 0 && getAll(player).length > 0) 
    {
    if (getFirst(player).y - getFirst(hyperHostile).y > 0 && opponentstamina > 0) 
    {
      opponentstamina -= 1
      Hmoveopponentup(0)
    }
        
    if (getFirst(player).y - getFirst(hyperHostile).y < 0 && opponentstamina > 0) 
    {
      opponentstamina -= 1
      Hmoveopponentdown(0)
    }
        
    if (getFirst(player).x - getFirst(hyperHostile).x > 0 && opponentstamina > 0) 
    {
      opponentstamina -= 1
      Hmoveopponentright(0)
    }
        
    if (getFirst(player).x - getFirst(hyperHostile).x < 0 && opponentstamina > 0) 
    {
      opponentstamina -= 1
      Hmoveopponentleft(0)
    }
        
    if (opponentstamina < 1) 
    {
       setTimeout(function() {hyperregainstamina()}, 750)
    }
    }
  }
  
}

function detectplayer() 
{
    if (tilesWith(player).length < 1) 
      {
        setMap(levels[level])
      }
    if (level == 1 && Encounter == true) 
  {
    if (tilesWith(hostile).length > 0) 
    {
    if ((getFirst(player).x == getAll(hostile)[0].x && getFirst(player).y == getAll(hostile)[0].y)) 
    {
    Encounter = false
    preventrepeat = true
    level = 0
    actuallevel = 0
    removezetext()
    setMap(levels[level])
    partone2.end()
    if (part1bool == true) 
    {
      partone.end()
      clearTimeout(cancelpart1timer)
    }
    else if (part2bool == true)
    {
      part2.end()
      clearTimeout(cancelpart2timer)
    }
    addText("You died! " + movesleft, {x: 5, y: 10, color: color`9`})
    setTimeout(function() {removezetext()}, 1000)
      
    }
    }
    else 
    {
    Encounter = false
    preventrepeat = true
    level = 0
    removezetext()
    setMap(levels[actuallevel])
    partone2.end()
    if (part1bool == true) 
    {
      partone.end()
      clearTimeout(cancelpart1timer)
    }
    else if (part2bool == true)
    {
      part2.end()
      clearTimeout(cancelpart2timer)
    }
    addText("You survived! " + movesleft, {x: 2, y: 10, color: color`4`})
    setTimeout(function() {removezetext()}, 1000)

    getFirst(player).x = playerposition[0]
    getFirst(player).y = playerposition[1]
  
      
    }
    
  }
    
  else if (level == 2 && Encounter == true) 
  {
    if (tilesWith(hyperHostile).length > 0) 
    {
    if ((getFirst(player).x == getAll(hyperHostile)[0].x && getFirst(player).y == getAll(hyperHostile)[0].y)) 
    {
    Encounter = false
    preventrepeat = true
    level = 0
    actuallevel = 0
    removezetext()
    setMap(levels[level])
    partone2.end()
    if (part1bool == true) 
    {
      partone.end()
      clearTimeout(cancelpart1timer)
    }
    else if (part2bool == true)
    {
      part2.end()
      clearTimeout(cancelpart2timer)
    }
    addText("You died! " + movesleft, {x: 5, y: 10, color: color`9`})
    setTimeout(function() {removezetext()}, 1000)
      
    }
    }
    else 
    {
    Encounter = false
    preventrepeat = true
    level = 0
    removezetext()
    setMap(levels[actuallevel])
    partone2.end()
    if (part1bool == true) 
    {
      partone.end()
      clearTimeout(cancelpart1timer)
    }
    else if (part2bool == true)
    {
      part2.end()
      clearTimeout(cancelpart2timer)
    }
    addText("You survived! " + movesleft, {x: 2, y: 10, color: color`4`})
    setTimeout(function() {removezetext()}, 1000)

    getFirst(player).x = playerposition[0]
    getFirst(player).y = playerposition[1]
      
      
    }
  }
    
  else if (level == 3 && Encounter == true) 
  {
    if (tilesWith(hostile).length > 0)
    {
    if ((getFirst(player).x == getAll(hostile)[0].x && getFirst(player).y == getAll(hostile)[0].y) || (getFirst(player).x == getAll(hostile)[1].x && getFirst(player).y == getAll(hostile)[1].y)) 
    {
    Encounter = false
    preventrepeat = true
    level = 0
    actuallevel = 0
    removezetext()
    setMap(levels[level])
    partone2.end()
    if (part1bool == true) 
    {
      partone.end()
      clearTimeout(cancelpart1timer)
    }
    else if (part2bool == true)
    {
      part2.end()
      clearTimeout(cancelpart2timer)
    }
    addText("You died! " + movesleft, {x: 5, y: 10, color: color`9`})
    setTimeout(function() {removezetext()}, 1000)
    }
      
    }
    else 
    {
    Encounter = false
    preventrepeat = true
    level = 0
    removezetext()
    setMap(levels[actuallevel])
    partone2.end()
    if (part1bool == true) 
    {
      partone.end()
      clearTimeout(cancelpart1timer)
    }
    else if (part2bool == true)
    {
      part2.end()
      clearTimeout(cancelpart2timer)
    }
    addText("You survived! " + movesleft, {x: 2, y: 10, color: color`4`})
    setTimeout(function() {removezetext()}, 1000)

    getFirst(player).x = playerposition[0]
    getFirst(player).y = playerposition[1]
      
    }
    
    }
}

function levelchangestatus() 
{
  levelchange = false
}

function slashattackdeleteup() 
{
  if (tilesWith(slashattackup).length > 0) 
  {
  clearTile(getFirst(slashattackup).x, getFirst(slashattackup).y)
  }
}

function slashattackdeletedown() 
{
  if (tilesWith(slashattackdown).length > 0)
  {
  clearTile(getFirst(slashattackdown).x, getFirst(slashattackdown).y)
  }
}

function slashattackdeleteleft() 
{
  if (tilesWith(slashattackleft).length > 0)
  {
  clearTile(getFirst(slashattackleft).x, getFirst(slashattackleft).y)
  }
}

function slashattackdeleteright() 
{
  if (tilesWith(slashattackright).length > 0) 
  {
  clearTile(getFirst(slashattackright).x, getFirst(slashattackright).y)
  }
}





 
onInput("s", () => {
  if (Encounter == false || movesleft > 0) {
getFirst(player).y += 1
    if (Encounter == true) 
    {
        movesleft -= 1
    }
  }
})
  
onInput("w", () => {
    if (Encounter == false || movesleft > 0) {
getFirst(player).y -= 1
    if (Encounter == true) 
    {
        movesleft -= 1
    }
  }
})
  
onInput("d", () => {
      if (Encounter == false || movesleft > 0) {
getFirst(player).x += 1
    if (Encounter == true) 
    {
        movesleft -= 1
    }
  }
})
  
onInput("a", () => {
        if (Encounter == false || movesleft > 0) {
getFirst(player).x -= 1
    if (Encounter == true) 
    {
        movesleft -= 1
    }    
  }
})


onInput("i", () => {
  if (Encounter == false || movesleft > 0) {
  if (Encounter == true) 
    {
        addSprite(getFirst(player).x, getFirst(player).y -1, slashattackup)
        setTimeout(function() {slashattackdeleteup()}, 100)
        movesleft -= 1
    }
  }
})
  
onInput("j", () => {
    if (Encounter == false || movesleft > 0) {
      
    if (Encounter == true) 
    {
        addSprite(getFirst(player).x -1, getFirst(player).y, slashattackleft)
        setTimeout(function() {slashattackdeleteleft()}, 100)
        movesleft -= 1
    }
  }
})
  
onInput("k", () => {
      if (Encounter == false || movesleft > 0) {
    if (Encounter == true) 
    {
        addSprite(getFirst(player).x, getFirst(player).y +1, slashattackdown)
        setTimeout(function() {slashattackdeletedown()}, 100)
        movesleft -= 1
    }
  }
})
  
onInput("l", () => {
        if (Encounter == false || movesleft > 0) {
    if (Encounter == true) 
    {
        addSprite(getFirst(player).x +1, getFirst(player).y, slashattackright)
        setTimeout(function() {slashattackdeleteright()}, 100)
        movesleft -= 1
    }    
  }
})


  
  setInterval(function() {detectplayer()}, 250)
  setInterval(function() {updatechange()}, 500)
  setInterval(function() {updatechange2()}, 250)


afterInput(() => {
  if (actuallevel == 6 || actuallevel == 5 || actuallevel == 4) 
  {
    fixluck = 3
  }
  else 
  {
    fixluck = 1
  }

  if (Encounter == false && win == false) {
  var encchance = Math.floor(Math.random() * (15 * fixluck))
  if (encchance < 1) 
  {
    Encounter = true
  }
  }
  
  if (Encounter == true && preventrepeat == true) 
  {

    playerposition = [getFirst(player).x, getFirst(player).y]
    
    if (level == 2) 
    {
    movesleft = 26
    hyperregainstamina()
    addText("Enenmy encountered!", {x: 1, y: 2, color: color`3`})
    setTimeout(function() {removezetext()}, 1000)
    movetoPart1()
    level = Math.floor((Math.random() * 3) + 1 )
    setMap(levels[level])
    preventrepeat = false
    }
      
    else 
    {
    movesleft = 26
    opponentregainstamina()
    opponentregainstamina2()
    addText("Enenmy encountered!", {x: 1, y: 2, color: color`3`})
    setTimeout(function() {removezetext()}, 1000)
    movetoPart1()
    level = Math.floor((Math.random() * 3) + 1 )
    setMap(levels[level])
    preventrepeat = false
    }
    
  }

  if (Encounter == true) 
  {
    addText("Moves left: " + movesleft, {x: 1, y: 14, color: color`D`})
  }


  
  // count the number of tiles with goals
  const targetNumber = tilesWith(capacitor).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(capacitor, battery).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered == targetNumber && Encounter == false && actuallevel < 7) {
    // increase the current level number
    actuallevel = actuallevel + 1;
    levelchange = true
    setInterval(function() {levelchangestatus()}, 250)
    if (actuallevel == 1) 
    {
      actuallevel = 4
    }
    
    setMap(levels[actuallevel])
  }

  else if (actuallevel == 7) 
  {
    addText("You Win! " + movesleft, {x: 5, y: 10, color: color`D`})
    win = true
  }

  
})