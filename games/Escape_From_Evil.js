/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: escape from evil
@author: noobieyuh
@tags: ['puzzle', 'music']
@addedOn: 2024-11-10
*/

const player = "p"
const monster = "m"
const border = "b"
const escape = "e"
const bgmusic = tune`
1500,
500: D4/500,
500: D4/500,
500: D4/500,
1000,
500: D4/500,
500: D4/500,
500: D4/500,
1000,
500: D4/500,
500: D4/500,
500: D4/500,
1000,
500: D4/500,
500: D4/500,
500: D4/500,
1000,
500: D4/500,
500: D4/500,
500: D4/500,
1000,
500: D4/500,
500: D4/500,
500: D4/500,
500`
const caught = tune`
500,
500: F4~500,
500: E4~500,
500: D4~500,
500: C4~500,
13500`
const portalSound = tune`
200,
100: D4^100,
100: E4^100,
100: F4^100,
100: G4^100,
2600`
const victorySound = tune`
150: C4^150,
150: D4^150 + C4^150,
150: E4^150 + D4^150,
150: F4^150 + E4^150,
150: G4^150 + F4^150,
150: A4^150 + G4^150,
150: B4^150 + A4^150,
150: C5^150 + B4^150,
150: D5^150 + C5^150,
150: E5^150 + D5^150,
150: F5^150 + E5^150,
150: G5^150 + F5^150,
150: A5^150 + G5^150,
150: B5^150 + A5^150,
150: B5^150,
2550`
const playback = playTune(bgmusic, Infinity)
const money = "z"

setLegend(
  [ player, bitmap`
....00000000....
...0222222220...
...0220220220...
...0222222220...
...0220220220...
...0222002220...
....02222220....
.0...000000...0.
.0...066660...0.
.00000600600000.
.....066660.....
.....000000.....
.....0....0.....
.....0....0.....
.....0....0.....
...000....000...`],
  [ monster, bitmap`
................
.00000000000000.
.03333333333330.
.03033333333030.
.03303333330330.
.03330333303330.
.03333333333330.
.03003333330030.
.03003333330030.
.03333333333330.
.03333333333330.
.03333300333330.
.03333033033330.
.03333333333330.
.00000000000000.
................`],
  [ border, bitmap`
3..............3
.3............3.
..3..........3..
...3........3...
....3......3....
.....3....3.....
......3..3......
.......33.......
.......33.......
......3..3......
.....3....3.....
....3......3....
...3........3...
..3..........3..
.3............3.
3..............3`],
  [ escape, bitmap`
..000000000000..
.0HHHHHHHHHHHH0.
.0HHHHHHHHHHHH0.
.0HHHHHHHHHHHH0.
.0HHHHHHHHHHHH0.
.0HHHHHHHHHHHH0.
.0HHHHHHHHHHHH0.
.0HHHHHHHHHHHH0.
.0HHHHHHHHHHHH0.
.0HHHHHHHHHHHH0.
.0HHHHHHHHHHHH0.
.0HHHHHHHHHHHH0.
.0HHHHHHHHHHHH0.
.0HHHHHHHHHHHH0.
.0HHHHHHHHHHHH0.
..000000000000..`],
  [ money, bitmap`
................
................
................
................
..444444444444..
..440400040004..
..440404040404..
..440404040404..
..440404040404..
..440400040004..
..444444444444..
................
................
................
................
................`]
)

setSolids([player, border])

let level = 0
const levels = [
  map`
m...m
.b...
...m.
....b
p.m.e`,
  map`
e....mmm
.mmm....
bbbbbbb.
m...m...
..m...mb
...m....
.bbbbb.b
p......m`,
  map`
.m.mem
...b..
.m.mb.
.b....
.m.bmm
pb....`,
  map`
..m..m..e.
m....b..m.
..mb.m.m..
b..m..m..m
.m.......b
...m..m.m.
..m..m..b.
m..b.m.m..
....m.b.m.
p....b....`,
  map`
.me
.m.
p..`,
  map`
mb.me
mb..m
.....
..bm.
p.b.e`,
  map`
  
.mbme....
m.bmbmb..
.mbm.mb.m
...b.b...
m..b.b.m.
.m......m
mm.m..m.m
...m.m...
p..m.m.m.`,
  map`
em.....e
bb....bb
mmm..m..
...m..mm
.m..m..m
.......m
.mm.mbbb
p....b.e`,
  map`
...mm
.b...
.bbb.
.me..
pbmmm`,
  map`
........e
.bmbmbmbb
.........
bmbmbmbb.
.........
.bmbmbmbb
.........
bmbmbmbb.
p........`,
  map`
.m.....e
.m.m.mmm
b.mm.mmb
.mm....b
..bm.mbb
m.m..bmb
pmbm.mbb
......bb`,
  map`
...m..e
m.mmmm.
....b..
bm.pb.b
.......
mmmm..b
eb....b`,
  map`
...ebe...
.mmmmmmm.
..b...b..
..m...m..
bbm.p.mbb
mmm...m..
......b..
.mmmmmmmb
........e`,
  map`
.bmm.....e
.mb.m.m.m.
..m.....bm
m..m.m.mm.
.m.mm....m
m.m...m.mb
bm..m...bm
..m..m....
mbbmmmbbm.
p.........`,
  map`
....m....m....e
.mb.bm.m...b.mm
m..bmbm..m.bmmm
..m.mb.........
m..m.b.mbb..bm.
.m..b...m.m...b
..bm..m..mb.m.b
..m.mbbm...mbb.
..m..mmb..m..m.
.b.m.....m.bm..
...m.bmmb......
...m.....m.mmm.
........m..m...
..mm.m.m...m.m.
p.m...m...m....`,
  map`
.....b..b.m...e
.bbb.bm.m.bbm..
...b.b..bm.mmm.
b..m...bbm.m.m.
m.bmbb.m.....b.
.....m.mb.bbmb.
mbbm.b.bb...mm.
.....m..mbm.m..
mbbm.b.bb.bb...
.....m.b..mb...
..m..b..m....b.
.m..mb.m...mmm.
m..m...b..bm.m.
..mm..mmm..m.m.
pm........m.b..`,
  map`
zzzzzzz
zzzzzzz
zz...zz
zz.p.zz
zz...zz
zzzzzzz
zzzzzzz`
  
]

setMap(levels[level])

setPushables({
  [ player ]: []
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

afterInput(() => {
  if(tilesWith(player, escape).length >= 1)
  { 
    playTune(portalSound)
    level++
    setMap(levels[level])
    if(level == 16)
    {
      playback.end()
      playTune(victorySound)
      addText("You won!", {
        x: 6,
        y: 5,
      color: color`6`
      })
    }
  }
  if(tilesWith(player, monster).length >= 1)
  {
    playTune(caught)
    setMap(levels[0])
    level = 0
  }
})
