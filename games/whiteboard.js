/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: whiteboard
@description: a small whiteboard where you can draw stuff
@author: 17sdheeraj
@tags: ['fun', 'tool']
@addedOn: 2026-04-25
*/

// all variables below
const player = "p"
const w = "w"
const b = "b"
const r = "r"
const y = "y"
const g = "g"
const o = "o"
let colours = [b,r,y,g,o,w]
let current = 0

// todo - add more colours obviously
//the bitmaps for colours and stuff
setLegend(
  [ player, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0000000000000000` ],

  [ w, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],

  [ b, bitmap`
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

  [ r, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],

  [ y, bitmap`
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
6666666666666666`],

  [ g, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],

  [ o, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`]
  )

setMap(map`
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
bbrryyggoowwwwww`)

addSprite(0,0,player)

onInput("w", () => getFirst(player).y = Math.max(0, getFirst(player).y - 1))
onInput("a", () => getFirst(player).x = Math.max(0, getFirst(player).x - 1))
onInput("s", () => getFirst(player).y = Math.min(15, getFirst(player).y + 1))
onInput("d", () => getFirst(player).x = Math.min(15, getFirst(player).x + 1))

onInput("i", () => {
  let p = getFirst(player)
  if (p.y === 15) return
  clearTile(p.x, p.y)
  addSprite(p.x, p.y, colours[current])
  addSprite(p.x, p.y, player)
})

onInput("k", () => {
  let p = getFirst(player)
  if (p.y === 15) return
  clearTile(p.x, p.y)
  addSprite(p.x, p.y, w)
  addSprite(p.x, p.y, player)
})

onInput("j", () => {
  let p = getFirst(player)
  if (p.y === 15) {
    let x = p.x
    if (x <=1) current = 0
    else if (x <=3) current = 1
    else if (x <=5) current = 2
    else if (x <=7) current = 3
    else if (x <=9) current = 4
    else current = 5
}
})
  
  
setPushables({
  [ player ]: []
})

afterInput(() => {
  
})