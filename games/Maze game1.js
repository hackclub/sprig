/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Maze game1
@author: 
@tags: []
@addedOn: 2025-00-00
*/
const player = "p"
const wall = "w"
const pushWall = "b"
const trophy = "t"
const pushable = "l"

setLegend(
  [ player, bitmap`
.....000........
.....0D0........
....0660........
..0.06660.......
..0006660.0.....
....0666000.....
....00600.......
....06660.......
....03360.......
...066660.......
...066660.......
...06660........
...0000.........
....0.0.........
...55.55........
................` ],

  [ wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ],

  [ pushWall, bitmap`
3333333333333333
3000000000000003
3033333333333303
3030000000000303
3030333333330303
3030300000030303
3030303333030303
3030303033030303
3030303033030303
3030303333030303
3030300000030303
3030333333330303
3030000000000303
3033333333333303
3000000000000003
3333333333333333` ],

  [ trophy, bitmap`
0000000660000000
0000006666000000
0000066666660000
0000666666666000
0000666000066000
0000666000066000
0000666666666000
0000066666660000
0000006666000000
0000000660000000
0000000600000000
0000000600000000
0000000600000000
0000006666000000
0000066666660000
0000666666666000` ],

  [pushable, bitmap`
7..............7
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
7..............7`]
)

setSolids([player, wall, pushWall, pushable])

// === PUSH LOGIC ===
setPushables({
  [player]: [pushable],
  [pushable]: [pushable]
})

// === FIXED LEVELS ===
const levels = [
  map`
wwwwwwwwww
wp.......w
wbbbbbbb.w
w......b.w
w.bbbb.b.w
w.bt...b.w
w.bbbbbb.w
w........w
wwwwwwwwww`,

  map`
wwwwwwwwww
w.pb.....w
w..b.....w
w..b.....w
w..b.t...w
w..b.....w
w..b.....w
w..l.....w
wwwwwwwwww`,

  map`
wwwwwwwwww
w........w
w..p.....w
w..bbb...w
w.....t..w
w........w
w........w
w........w
wwwwwwwwww`,
   map`
p...b........
bbb....bbbb..
..bbbbbb..b..
..........b..
bbbb.t.......
pb.bbbbbbbbb.
.............
bbbbbbbbbbbbb
............t
p............`,
   map`
wwwwwwwwwwwww
w...........w
w.bllllb....w
w.blpll....lw
w.bllllb....w
w.bbbbbbb...w
w..b...b....w
w..b.b.b....w
w.t..b......w
wwwwwwwwwwwww`,
]

// === LEVEL CONTROL ===
let level = 0

function loadLevel() {
  if (level >= levels.length) {
    addText("YOU WIN!", { x: 2, y: 4, color: color`4` })
    return
  }
  setMap(levels[level])
  clearText()
  addText("LEVEL " + (level + 1), { x: 1, y: 1, color: color`2` })
}

loadLevel()

// === MOVEMENT ===
onInput("w", () => getFirst(player).y--)
onInput("s", () => getFirst(player).y++)
onInput("a", () => getFirst(player).x--)
onInput("d", () => getFirst(player).x++)

// === WIN CHECK ===
afterInput(() => {
  const p = getFirst(player)
  const trophies = getTile(p.x, p.y).filter(t => t.type === trophy)

  if (trophies.length > 0) {
    level++
    loadLevel()
  }
})
