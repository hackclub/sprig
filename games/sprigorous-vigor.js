/*
@title: Sprigorous Vigor
@author: boston2029
@tags: []
@addedOn: 2024-07-27
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p"
const wall = "w"
const portal = "n"
const pushable = "b"
const altchoice = "c"

setLegend(
  [wall, bitmap`
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
  [ player, bitmap`
................
...CCCCCCC......
...CC66666......
...CC66660......
...CC66660......
...CC66666......
...CC66633......
...CC66666......
......66........
....777777......
....776677......
....776677......
....776677......
....444444......
....44..44......
....44..44......` ],
  [pushable, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999777777779999
9999777777779999
9999777777779999
9999777777779999
9999777777779999
9999777777779999
9999777777779999
9999777777779999
9999777777779999
9999777777779999
9999999999999999
9999999999999999
9999999999999999`],
  [portal, bitmap`
................
...4444444444...
...4777777774...
..477744447774..
..477444444774..
..477447744774..
..477447744774..
..477447744774..
..477447744774..
..477444444774..
..477444444774..
..447477774744..
...4744774474...
...4774444774...
...4444444444...
................`],
  [altchoice, bitmap`
................
...HHHHHHHHHH...
...H99999999H...
..H999HHHH999H..
..H99HHHHHH99H..
..H99HH99HH99H..
..H99HH99HH99H..
..H99HH99HH99H..
..H99HH99HH99H..
..H99HHHHHH99H..
..H99HHHHHH99H..
..HH9H9999H9HH..
...H9HH99HH9H...
...H99HHHH99H...
...HHHHHHHHHH...
................`],
  ['x', bitmap`
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
5555555555555555`]
)

setSolids([player, wall, pushable])

let level = 0
const levels = [
  map`
wwwwnw...ww
wwww...w...
wwwwwww.ww.
w..........
w.wwwwwwwww
w........ww
wwwwwwww.ww
wp.......ww`, // begin
  map`
nww...w...w
..w.w...w..
w...wwwwww.
wwww...www.
ww...w.....
ww.wwwwwwww
ww....wwwww
wwwwwpwwwww`, // need to get out
  map`
w.........p
w.wwwwwwwww
wbwxwwwwxww
wbwwwwwwwww
w.wwxwwxwww
w..wwxxw...
w..wwww..w.
w.......wwn`, // i can push these
  map`
wwwwwwwwwwp
wwwwwwwwwwb
www......bb
wwwwbwwwwwb
ww...wwwww.
ww.n.wwwww.
ww...wwwwww
wwwwwwwwwww`, // no text pushables
  map`
n..........
.bbbbbbbbbb
.bbbbbbbbbb
.bbbbbbbbbb
.bbbbbbbbbb
.bbbbbbbbbb
.bbbbbbbbbb
.bbbbbbbbbp`, // nononono
  map`
....wnw....
wwwww.wwwww
wwwww.wwwww
wwwww.wwwww
wwwww.wwwww
wwwww.wwwww
wwwww.wwwww
wwwwwpwwwww`, // "trust me bro"
  map`
.wwwwnwwww.
.wwww.wwww.
.wwww.wwww.
.wwww.wwww.
.wwww.wwww.
.wwww.wwww.
.wwww.wwww.
.wwwwpwwww.`, //
  map`
..wwwnwww..
..www.www..
..www.www..
..www.www..
..www.www..
..www.www..
..www.www..
..wwwpwww..`, //
  map`
....wnw....
....w.w....
....w.w....
....w.w....
....w.w....
....w.w....
....w.w....
....wpw....`, //
  map`
.w.w......w
w.w.w.w.w.w
.w.w...ww.w
w.w.w.w.wnw
.w.w...w.w.
w.w.w.w.w.w
.w.w...w.w.
w.w.wpw.w.w`, // checkerboard
  map`
n..........
wwwwww.wwww
wwwwww.wwww
wwwww..wwww
wwwww.wwwww
wwwww..wwww
wwwwww.wwww
wwwwww....p`, // time it right
  map`
wwwwwwwwwwwwwwwwwww
w.......wwwwwwwwwww
w.wwwww.wwwwwwwww.w
w.wwwww.wwwwwwwww.w
w..wn...........w.w
w.wwww.www......w.w
www.wwwwww......w.w
p...wwwwww......w.w
ww..www....w.w.ww.w
www..wwwwwwwww.ww.w
w.w...wwwwwwww.ww.w
w.ww..ww..........w
w..w..............w
w..w..w...........w
w..w..wwwwwwwwwwwww
w..w..wwwwwwwwwwwww
w.....wwwwwwwwwwwww
wwwwwwwwwwwwwwwwwww`, // surprise
  map`
w.w..............w
.w.w............w.
w.w.w..........w..
.w.w.w......www...
w.w.w...bbbbbb....
.b.w.w.w....w.....
b.b.w.w....w......
.b.b.wwwwww.....p.
b.b.b...ww........
.b.b.b.www........
b.b.b.w...w.......
.www.b.w...w......
bw.wb.w.....w.....
.bnbwbww.....b....
b...b.........w...
.b.b.b.........w..
b.b.b.w.........w.
.b.b.w.w.........w`, // surprise
  map`
bb.wwwwwwww
bnbw.....cw
.bbw..wwwww
ww....wwwww
wwwww.wwwww
wwwww.wwwww
wwwww.wwwww
w....p....w`,
  map`
...b..b....
b.....b.b.b
..b.b......
.b........b
..bb..b....
....b......
p......b..b
....b......
b.b...b....`
]

setMap(map`
www
wpw
www`)

addText("SPRIGOROUS VIGOR", {
  y:2,
  color:color`2`
})

addText("Press L to start", {
  y:13,
  color:color`2`
})

setPushables({
  [ player ]: [player, pushable],
  [pushable]: [pushable, pushable]
})

playTune(tune`
312.5: B5-312.5,
312.5: A5-312.5,
312.5: G5-312.5,
312.5: F5-312.5,
312.5: G4-312.5,
312.5: A4-312.5,
312.5: B4-312.5,
312.5: C5-312.5,
312.5: B5^312.5,
312.5: B5-312.5,
312.5: B5~312.5,
312.5,
312.5: E5-312.5,
312.5: D5-312.5,
312.5: C5-312.5,
312.5: B4-312.5,
312.5: G4/312.5,
312.5: G4/312.5,
312.5: G4/312.5,
312.5,
312.5: B5/312.5,
312.5: A5/312.5,
312.5: G5/312.5,
312.5: F5/312.5,
312.5: C4~312.5 + E4~312.5 + G4~312.5 + F4^312.5 + D4^312.5,
312.5: A5/312.5,
312.5: B5/312.5,
312.5: B5/312.5,
312.5: E4-312.5,
312.5: D4~312.5 + C4^312.5,
312.5: A4-312.5,
312.5: B5-312.5`, Infinity)

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
onInput("l", () => {
  level=0
  playTune(tune`
312.5: B5-312.5,
312.5: A5-312.5,
312.5: G5-312.5,
312.5: F5-312.5,
312.5: G4-312.5,
312.5: A4-312.5,
312.5: B4-312.5,
312.5: C5-312.5,
312.5: B5^312.5,
312.5: B5-312.5,
312.5: B5~312.5,
312.5,
312.5: E5-312.5,
312.5: D5-312.5,
312.5: C5-312.5,
312.5: B4-312.5,
312.5: G4/312.5,
312.5: G4/312.5,
312.5: G4/312.5,
312.5,
312.5: B5/312.5,
312.5: A5/312.5,
312.5: G5/312.5,
312.5: F5/312.5,
312.5: C4~312.5 + E4~312.5 + G4~312.5 + F4^312.5 + D4^312.5,
312.5: A5/312.5,
312.5: B5/312.5,
312.5: B5/312.5,
312.5: E4-312.5,
312.5: D4~312.5 + C4^312.5,
312.5: A4-312.5,
312.5: B5-312.5`, Infinity)
  clearText()
  addText("where am i?", {
    x: 4,
    y: 14
  })
  setMap(levels[level])
})

let moverInterval
afterInput(() => {
  const playerTile = getTile(getFirst(player).x, getFirst(player).y)
  const hasReachedPortal = playerTile.some(sprite => sprite.type === portal)
  const hasReachedAlt = playerTile.some(sprite => sprite.type === altchoice)
  if (hasReachedAlt) {
    setMap(map`
bbb
bpb
bbb`)
    clearText()
    addText("you lost", {color: color`2`, y:0})
    addText("evil guy got you", {color: color`2`, y:2})
    addText("press l to replay!", {color: color`2`, y:13})
    return
  }
  if (hasReachedPortal) {
    clearText()
    level++
    setMap(levels[level])
    switch (level + 1) {
      case 2:
        addText("need to get out", {
          x: 5,
          y: 3,
          color:color`1`
        })
        break
      case 3:
        addText("i can push these", {
          x: 3,
          y: 1
        })
        break
      case 5:
        addText("NONONONO TURN BACK", {
          x: 1,
          y: 1
        })
        break
      case 6:
        addText("THISWAY", {
          x: 0,
          y: 1
        })
        addText("TRUST", {
          x: 15,
          y: 1
        })
        break
      case 11:
        addText("time it right", {
          y: 7,
          color:color`1`
        })
        let directionRight = true
        moverInterval = setInterval(function(){
          if (getFirst(portal).x==10) {
            directionRight=false
          }
          if (getFirst(portal).x==0) {
            directionRight=true
          }
          directionRight?getFirst(portal).x+=1:getFirst(portal).x-=1
        }, 100)
        break
      case 12:
        clearInterval(moverInterval)
        addText("surprise lol", {x:7,y:14, color: color`2`})
        break
      case 14:
        addText("who do you choose", {y:12, color: color`1`})
        break
      case 15:
        addText("you won!", {color: color`0`, y:1})
        addText("press l to replay!", {color: color`0`, y:3})
        addText("or mess with", {color: color`0`, y:13})
        addText("these pushables!", {color: color`0`, y:14})
        break
    }
  }
})
