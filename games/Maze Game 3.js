const player = "p"
const wall = "w"

const trophy = "t"

setLegend(
  [ player, bitmap`
................
................
.......000......
.......060......
......0660......
......06660.0...
....0007650.0...
....0.0666000...
....0.0FF60.....
......06660.....
.....066660.....
.....06660......
......000.......
......0.0.......
.....00.00......
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

[trophy, bitmap`
0000066666600000
0000666666666000
0006666666666600
0066666666666660
0066600066006660
0066600066006660
0066666666666660
0006666666666600
0000666666666000
0000066666600000
0000000666000000
0000000666000000
0000000666000000
0000006666660000
0000066666666000
0000666666666600`]
)

setSolids([player, wall])

let level = 0
const levels = [
  map`
pw.wt....w
.w.wwwww.w
.w.w...w.w
.w.w.w.w.w
.w.w.w.w.w
...w.w.w.w
.w.w.w.w.w
.w.w.w....
.www.wwwww
..........`,

  map`pw....w..w
.w.ww.www.
.w....w..w
.www.w.w.w
.w...w.w.w
.w.w.w.w..
.w.w.w.www
...w.w....
.www.wwww.
..........
`,

  map`
pw.w.....t
.w.w.wwww.
.w.w....w.
.w.www.w.w
...w...w.w
.www.w.w.w
.w...w.w..
.w.w.www.w
.w.w.wwww.
..........`,
  
  map`
pwt..w....
.www.w.www
.w...w...w
.w.w.www.w
.w.w...w.w
.w.www.w.w
.w.....w..
.www.w.www
.....w....
..........`, 

  map`
pw.w......
.w.w.wwww.
.w.w...w..
.w.www.w.w
...w.w.w.w
.www.w.w.w
.w...w.w..
.w.w.www.w
.w.w.wwwwt
..........`
  
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

function loadLevel() {
  if (level >= levels.length) {
    addText("YOU WIN!")
    return
  }
  setMap(levels[level])
}

loadLevel()

afterInput(() => {
 const p = getFirst(player)
  const trophies = getTile(p.x, p.y).filter(t => t.type === trophy)

  if (trophies.length > 0) {
    level++
    loadLevel()
  }
})