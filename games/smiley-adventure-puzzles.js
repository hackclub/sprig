/*
@title: smiley adventure puzzles
@description: a puzzle game where you must complete multiple puzzles in order to get the gem, controlling a smiley character!
@author: `awesomesauce4646`
@tags: ['puzzle', 'shortgame']
@addedOn: 2026-09-16

Instructions: beat the puzzle of each level!
*/

const player = "p"
const wall = "w"
const gem = "g"
const button = "b"
const crate = "c"
const door = "d"
const shutDoor = "s"
const lever = "l"

const melody = tune`
229.00763358778627,
229.00763358778627: C4~229.00763358778627,
229.00763358778627,
229.00763358778627: C4~229.00763358778627,
229.00763358778627,
229.00763358778627: C4~229.00763358778627,
229.00763358778627,
229.00763358778627: C4~229.00763358778627,
229.00763358778627,
229.00763358778627: D4~229.00763358778627,
229.00763358778627,
229.00763358778627: D4~229.00763358778627,
229.00763358778627,
229.00763358778627: D4~229.00763358778627,
229.00763358778627,
229.00763358778627: D4~229.00763358778627,
229.00763358778627,
229.00763358778627: F4~229.00763358778627,
229.00763358778627,
229.00763358778627: F4~229.00763358778627,
229.00763358778627: E4~229.00763358778627,
229.00763358778627: F4~229.00763358778627,
229.00763358778627,
229.00763358778627: F4~229.00763358778627,
229.00763358778627,
229.00763358778627: D4~229.00763358778627,
229.00763358778627,
229.00763358778627: D4~229.00763358778627,
229.00763358778627: C4~229.00763358778627,
229.00763358778627: D4~229.00763358778627,
229.00763358778627,
229.00763358778627: D4~229.00763358778627`

const sound = tune`
38.86010362694301: C5-38.86010362694301 + D5/38.86010362694301 + E5/38.86010362694301,
38.86010362694301: D5-38.86010362694301 + E5-38.86010362694301 + F5/38.86010362694301,
38.86010362694301: F5-38.86010362694301 + G5/38.86010362694301,
38.86010362694301: F5-38.86010362694301 + G5/38.86010362694301,
38.86010362694301: G5-38.86010362694301 + A5/38.86010362694301,
1049.2227979274612`

const gemSound = tune`
39.735099337748345: G5~39.735099337748345 + F5^39.735099337748345,
39.735099337748345: G5^39.735099337748345 + A5~39.735099337748345,
39.735099337748345: B5~39.735099337748345 + A5^39.735099337748345,
39.735099337748345: B5^39.735099337748345,
1112.5827814569536`

const leverSound = tune`
39.11342894393742: B4/39.11342894393742,
39.11342894393742: A4/39.11342894393742,
39.11342894393742: G4/39.11342894393742,
39.11342894393742: F4/39.11342894393742,
39.11342894393742: E4/39.11342894393742,
1056.0625814863104`

// const playback = playTune(melody, Infinity)

setLegend(
  [ player, bitmap`
................
.....000000.....
....06666660....
...0666666660...
..066606606660..
.06666066066660.
.06666066066660.
.06666666666660.
.06066666666060.
.06606666660660.
.06660666606660.
..066600006660..
...0666666660...
....06666660....
.....000000.....
................` ],
    [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ lever, bitmap`
................
.......33.......
......3333......
......3333......
.......33.......
.......LL.......
.......LL.......
.......LL.......
.......LL.......
.......LL.......
.......LL.......
......LLLL......
......LLLL......
......LLLL......
...0000000000...
..000000000000..` ],
  [ button, bitmap`
................
....11111111....
...1133333311...
..113333333311..
.11332333333311.
1133233333333311
1332333333333331
1332333333333331
1333333333333331
1333333333333331
1333333333333331
1133233333333311
.11333333333311.
..113333333311..
...1133333311...
....11111111....` ],
  [ crate, bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0C0CCCCCCCCCC0C0
0CC0CCCCCCCC0CC0
0CCC0CCCCCC0CCC0
0CCCC0CCCC0CCCC0
0CCCCC0CC0CCCCC0
0CCCCCC00CCCCCC0
0CCCCCC00CCCCCC0
0CCCCC0CC0CCCCC0
0CCCC0CCCC0CCCC0
0CCC0CCCCCC0CCC0
0CC0CCCCCCCC0CC0
0C0CCCCCCCCCC0C0
0CCCCCCCCCCCCCC0
0000000000000000` ],
  [ shutDoor, bitmap`
................
3333333333333333
3333333333333333
................
3333333333333333
3333333333333333
................
3333333333333333
3333333333333333
................
3333333333333333
3333333333333333
................
3333333333333333
3333333333333333
................` ],
  [ door, bitmap`
................
4444444444444444
4444444444444444
................
4444444444444444
4444444444444444
................
4444444444444444
4444444444444444
................
4444444444444444
4444444444444444
................
4444444444444444
4444444444444444
................` ],
  [ gem, bitmap`
................
................
....77777777....
...7722222227...
..727777777777..
.72777777777775.
.72777777777755.
.72777777777755.
.77777777777755.
..727777777755..
...7777777755...
....57777755....
.....577755.....
......5555......
.......55.......
................` ],
)

setSolids([player, wall, crate, shutDoor])

let level = 0
const levels = [
  map`
pwwwwg
..ww..
w.ww.w
w..w.w
......`,
  map`
.b.www
...wgw
...www
ww...w
p....w`,
  map`
.....p
......
.c....
w.w...
wgw...`,
  map`
....wg
....ww
......
cccc..
.b.w.p`,
  map`
.wwwwww
...w...
cw.w..c
pwc..cg
ww....c
.......`,
  map`
.wgw...
.wdw...
.......
..www..
.wwwww.
...p...`,
  map`
...g...
wwwwwww
.......
ww..wdw
.dc.w.w
bw..wpw`,
  map`
gs....p
ss.....
.......
....ccc
ww.w.b.
lw.w...`,
  map`
sssssss
wwwwwww
p.c..g.
wwwwwww
sssssss`,
  map`
gs....
ss....
.wwwww
.wwwww
p.c.l.`,
  map`
pwls.c.g
.w.s.c..
.w.s.ccc
.w.s....
bw.s....`,
  map`
pwgw...l
.wsw....
.w.w....
.w.wsss.
.w.s..s.
.w.c..s.
.w.w....
...w....`,
  map`
.........bwww
.........w..s
wwwww...w..s.
w...w...w..s.
p..c....w..sg
w...w...w..s.
wwwww...w..s.
ccccc....w..s
.l..s.....www`,
  map`
p.......wsb
wwwwww..wss
.ww.ww..wss
.w.c....wss
l..c.......
.w.c.......
www.ww.....
gwwwww.....`,
  map`
w..csdd.l
wbccscddd
w.ccspc..
wcccsssss
w........
wwwwwwwww
........g`
]

addText("collect the gems!", { y: 14, color: "7"})
addText("j to restart", { y: 1, color: "2"})

setMap(levels[level])

setPushables({
  [ player ]: [ crate ]
})

onInput("s", () => { getFirst(player).y += 1 })
onInput("w", () => { getFirst(player).y += -1 })
onInput("a", () => { getFirst(player).x += -1 })
onInput("d", () => { getFirst(player).x += 1 })
onInput("j", () => {
  setMap(levels[level])
})

afterInput(() => {
  clearText()

  const p = getFirst(player)
  if (!p) return

  const currentTile = getTile(p.x, p.y)
  const touchedGem = currentTile.some(sprite => sprite.type === gem)
  const touchedButton = currentTile.some(sprite => sprite.type === button)
  const touchedLever = currentTile.some(sprite => sprite.type === lever)
  

  if (touchedGem) {
    level += 1
    playTune(gemSound)
    if (level < levels.length) {
      setMap(levels[level])
    } else {
      addText("You Win!", { y: 7 })
    }
  }

  if (touchedButton) {
    playTune(sound)
    getAll(wall).forEach(w => w.remove())

  }

  if (touchedLever) {
    playTune(leverSound)
    getAll(shutDoor).forEach(s => {
    addSprite(s.x, s.y, door)
    s.remove()
    })

  }
})