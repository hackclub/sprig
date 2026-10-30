/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: fly-by
@description: 
@author: 
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/

const player = "p"
const cloud = "c"
const cloud2 = "e"
const cloud3 = "f"
const sky = "s"
const planect = "t"
const laser = "l"
const target = "a"

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ planect, bitmap`
.......CC.......
......CCCC......
.....C8778C.....
.....C7777C.....
.....C7777C.....
CCCCC877778CCCCC
C88888888888888C
C88888888888888C
.CC8888888888CC.
...C88888888C...
....CC8888CC....
......C88C......
......C88C......
....CC8888CC....
...CCC8888CCC...
......CCCC......`],
  [ laser, bitmap`
.......39.......
.......39.......
.......93.......
.......93.......
.......39.......
.......39.......
.......93.......
.......93.......
.......39.......
.......39.......
.......93.......
.......93.......
.......39.......
.......39.......
.......93.......
.......93.......`],
  [ target, bitmap`
................
................
....88888888....
...8333333338...
..833888888338..
.83883333338838.
.83838888883838.
.83838333383838.
.83838333383838.
.83838888883838.
.83883333338838.
..833888888338..
...8333333338...
....88888888....
................
................`],
  [ cloud, bitmap`
2222222222222222
2211222222222222
2222222222222222
2222222112222222
2222222222222222
2222222222221122
2222222222222222
2222112222222222
2222222221122222
2222222222222222
2222222222222222
2222222222222222
2222221122222222
2222222222222222
2222222222211222
2222222222222222`],
    [ cloud2, bitmap`
2222122221111222
1111111112222111
2222112221111222
1111221111122111
2111112222211222
1222111111122111
1111212222211112
2211111111112221
1122222112221111
2211111221111122
1122222111222211
1111111111111122
2222111122221111
1111222211112222
2221111112211111
1111222211112222`],
  [ cloud3, bitmap`
1111111111111111
1111111221111111
11LL111111111111
1111111111LL1111
1111111111111111
11111LL111112211
1111111111111111
111111111LL11111
1122111111111111
1111111LL1111111
1111LL111111LL11
1111111111111111
1111111111111111
1111111LL1122111
1111221111111111
1111111111111111`],
  [ sky, bitmap`
7777777777777777
7777772775777727
7727777275757277
7752775772775777
7777277772777777
7577777777277577
7777577777775577
2777775772772757
7277777777572775
5727777777775277
7777777772777727
7777227577777772
7772777775777777
7772772777777777
7777777757777557
7277777757777777`]
)


setSolids([])

let level = 1
const levels = [
  map`
.....
.....
.....
.....`,
  map`
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
ssssssssssssssssssssssssssssss
`
]

setMap(levels[level])



setPushables({
  [ player ]: []
})

addText("welcome!", options = {y: 1, color: color`0`})
addText("shoot targets...", options = {y: 3, color: color`2`})
addText("to win, get 20...", options = {y: 4, color: color`2`})
addText("w,a,s,d to move", options = {y: 6, color: color`8`})
addText("i to shoot", options = {y: 8, color: color`3`})
addText("j to begin", options = {y: 10, color: color`5`})
startCondition = 0
onInput("j", () => {
  if (startCondition == 0)
  {
    clearText()
    starting()
    startCondition += 1
  }
})


afterInput(() => {
  
})

function starting() {

onInput("s", test)

onInput("w", () => {
  getFirst(planect).y -= 1
  if (getFirst(planect).y < 15)
  {
    getFirst(planect).y = 15
  }
})

onInput("a", () => {
  getFirst(planect).x -= 1
})

onInput("d", () => {
  getFirst(planect).x += 1
})

onInput("i", () => {
  addSprite(getFirst(planect).x, getFirst(planect).y-1, laser)
})

function test() {
  getFirst(planect).y += 1
  if (getFirst(planect).y > 22)
  {
    getFirst(planect).y = 22
  }
  
}

let count = 0
let modulus = Math.floor(Math.random() * 4) + 4
let center = Math.floor(Math.random() * width()) - 3
addSprite(center, 20, planect)
function cloudMove1() {
  
  let length = Math.floor(Math.random() * 5) + 4
  let offset = Math.floor(Math.random() * 4)
  for (let i = 0; i < length; i++)
  {
    if (center + i - offset < width() && center + i - offset >= 0)
    {
      addSprite(center + i - offset, 0, cloud)
    }
  }
  for (let i = 0; i < getAll(cloud).length; i++)
  {
    getAll(cloud)[i].y += 1;
  }
  for (let i = 0; i < width(); i++)
  {
    clearTile(i, height() - 1)
  }
  count++
  if (count % modulus == 0)
  {
    count = 0
    modulus = Math.floor(Math.random() * 4) + 4
    center = Math.floor(Math.random() * width()) - 3
  }
}

let count2 = 0
let modulus2 = Math.floor(Math.random() * 4) + 4
let center2 = Math.floor(Math.random() * width()) - 3
function cloudMove2() {
  
  let length = Math.floor(Math.random() * 5) + 4
  let offset = Math.floor(Math.random() * 4)
  for (let i = 0; i < length; i++)
  {
    if (center2 + i - offset < width() && center2 + i - offset >= 0)
    {
      addSprite(center2 + i - offset, 0, cloud2)
    }
  }
  for (let i = 0; i < getAll(cloud2).length; i++)
  {
    getAll(cloud2)[i].y += 1;
  }
  for (let i = 0; i < width(); i++)
  {
    clearTile(i, height() - 1)
  }
  count2++
  if (count2 % modulus2 == 0)
  {
    count2 = 0
    modulus2 = Math.floor(Math.random() * 4) + 4
    center2 = Math.floor(Math.random() * width()) - 3
  }
}

let count3 = 0
let modulus3 = Math.floor(Math.random() * 4) + 4
let center3 = Math.floor(Math.random() * width()) - 3
function cloudMove3() {
  
  let length = Math.floor(Math.random() * 5) + 4
  let offset = Math.floor(Math.random() * 4)
  for (let i = 0; i < length; i++)
  {
    if (center3 + i - offset < width() && center3 + i - offset >= 0)
    {
      addSprite(center3 + i - offset, 0, cloud3)
    }
  }
  for (let i = 0; i < getAll(cloud3).length; i++)
  {
    getAll(cloud3)[i].y += 1;
  }
  for (let i = 0; i < width(); i++)
  {
    clearTile(i, height() - 1)
  }
  count3++
  if (count3 % modulus3 == 0)
  {
    count3 = 0
    modulus3 = Math.floor(Math.random() * 4) + 4
    center3 = Math.floor(Math.random() * width()) - 3
  }
}

function laserMove() {
  for (let i = 0; i < getAll(laser).length; i++)
  {
    getAll(laser)[i].y -= 1
  }
  for (let i = 0; i < width(); i++)
  {
    clearTile(i, 0)
  }
}
score = 0
function targetMove() {
  targetCondition = Math.floor(Math.random() * 6)
  if (tilesWith(target).length == 0)
  {
    addSprite(Math.floor(Math.random() * width()), 1, target)
  }
  for (let i = 0; i < getAll(target).length; i++)
  {
    getAll(target)[i].y += 1
  }
  for (let i = 0; i < tilesWith(laser, target).length; i++)
  {
    clearText()
    getFirst(target).remove()
    score += 1
    addText("score:" + score,
    {y: 1, color: color`0`})
    if (score >= 20)
    {
      clearInterval(timer)
      clearInterval(timer2)
      clearInterval(timer3)
      clearInterval(timer4)
      clearInterval(timer5)
      clearText()
      addText("you win!", options = {y: 7, color: color`0`})
    }
  }
}





const timer = setInterval(cloudMove1, 100)
const timer2 = setInterval(cloudMove2, 400)
const timer3 = setInterval(cloudMove3, 1000)
const timer4 = setInterval(laserMove, 113)
const timer5 = setInterval(targetMove, 300)


}
