/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Sprigorous Vigor
@author: boston2029
@tags: []
@addedOn: 2024-07-26
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
................`]
)

setSolids([player, wall, pushable])

let level = 0
const levels = [
  map`
wwwwnwwwwww
...........
wwwwwwwwww.
...........
.wwwwwwwwww
...........
wwwwwwwwww.
p..........`,
  map`
nwwwwwwwwww
...........
wwwwwwwwww.
www....www.
ww..ww.....
ww.wwwwwwww
ww....wwwww
wwwwwpwwwww`,
  map`
..........p
w.wwwwwwwww
wbwwwwwwwww
wbwwwwwwwww
..wwwwwwwww
...wwwww...
...wwwww...
..........n`,
  map`
wwwwwwwwwwp
wwwwwwwwwwb
www......bb
wwwwbwwwwwb
ww...wwwww.
ww.n.wwwww.
ww...wwwwww
wwwwwwwwwww`,
  map`
n..........
.bbbbbbbbbb
.bbbbbbbbbb
.bbbbbbbbbb
.bbbbbbbbbb
.bbbbbbbbbb
.bbbbbbbbbb
.bbbbbbbbbp`,
  map`
....wnw....
wwwww.wwwww
wwwww.wwwww
wwwww.wwwww
wwwww.wwwww
wwwww.wwwww
wwwww.wwwww
wwwwwpwwwww`,
  map`
.wwwwnwwww.
.wwww.wwww.
.wwww.wwww.
.wwww.wwww.
.wwww.wwww.
.wwww.wwww.
.wwww.wwww.
.wwwwpwwww.`,
  map`
..wwwnwww..
..www.www..
..www.www..
..www.www..
..www.www..
..www.www..
..www.www..
..wwwpwww..`,
  map`
....wnw....
....w.w....
....w.w....
....w.w....
....w.w....
....w.w....
....w.w....
....wpw....`,
  map`
....wn.....
......w....
....w......
......w....
....w......
......w....
....w......
.....pw....`,
  map`
n..........
...........
...........
...........
...........
...........
...........
..........p`,
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

setMap(levels[level])

setPushables({
  [ player ]: [player, pushable],
  [pushable]: [pushable, pushable]
})

addText("where am i?", {
  x: 4,
  y: 14
})

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
  clearText()
  addText("where am i?", {
    x: 4,
    y: 14
  })
  setMap(levels[level])
})

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
          y: 3
        })
        break
      case 3:
        addText("i can push these", {
          x: 1,
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
        addText("run quick", {
          x: 3,
          y: 7
        })
        break
      case 12:
        addText("who do you choose", {y:12, color: color`1`})
        break
      case 13:
        addText("you won!", {color: color`0`, y:0})
        addText("press l to replay!", {color: color`0`, y:2})
        addText("or mess with", {color: color`0`, y:6})
        addText("these pushables!", {color: color`0`, y:7})
        break
    }
  }
})
