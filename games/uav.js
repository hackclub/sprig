const player = "p"
const playerFlipped = "f"
const waterSurface = "s"
const water = "w"
const uav = "u"
const booyah = "b"

setLegend(
  [ player, bitmap`
....0...........
....00....0.....
....060...00....
....060...060...
....060...060...
....0660..060...
....0660..0660..
....0660..0660..
....000...0660..
.00.0.....000...
0CC00000..0.....
0CCCCCCC00000000
0C0C0C0CCCCCCCC0
0C0C0C0C0C0C0C0.
0CCCCCCCCCCCC0..
.000000000000...` ],
  [ playerFlipped, bitmap`
...........0....
.....0....00....
....00...060....
...060...060....
...060...060....
...060..0660....
..0660..0660....
..0660..0660....
..0660...000....
...000.....0.00.
.....0..00000CC0
00000000CCCCCCC0
0CCCCCCCC0C0C0C0
.0C0C0C0C0C0C0C0
..0CCCCCCCCCCCC0
...000000000000.` ],
  [ waterSurface, bitmap`
7777777777777777
7777777777777777
7777777777777777
7755777777577777
5555777775557775
5555577755555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555` ],
  [ water, bitmap`
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
5555555555555555` ],
  [ uav, bitmap`
......LLL.......
.......L........
....LLLLLLL.....
....L11111L.....
....L32323L.....
....L32323L.....
....L32323L.....
....L32323L.....
....L55323L.....
....L55323L.....
....L11111L.....
....L11111L.....
.....L111L......
.....L111L......
......L1L.......
.......L........` ],
  [ booyah, bitmap`
C...C.........CC
CC.....CC....CC.
.......C.....C..
..6.............
..666......33...
C.6666....33633.
....66666633663.
....699229336...
9996993233396...
.969223223399...
...693222239999.
.666932222226...
.663333223326...
CC6332223399999.
C.333299999669CC
..33.666666666.C` ]
)

setSolids([])

let level = 0
const levels = [
  map`
........
........
........
...p....
ssssssss
wwwwwwww`
]
const waterLevel = 4 // TODO: Increase sea levels as the game goes on (i.e. decrease this value)

setMap(levels[level])

setPushables({
  [ player ]: []
})

let p = getFirst(player)
let playerLeft = false
let paused = false

let freq = 2000

const fireUav = () => {
  if (paused) return
  const uavX = Math.floor(Math.random() * width())
  addSprite(uavX, 0, uav)

  setTimeout(fireUav, Math.random() * freq)
}
const spawnLoop = setTimeout(fireUav, freq)

let updateCount = 0
const updateLoop = setInterval(() => {
  console.log("update loop", paused);
  const t = tilesWith(uav)
  getAll(uav).forEach(u => {
    u.y++
    if (p.x == u.x && p.y == u.y) paused = true
  })
  freq -= updateCount++
  if (freq <= 300) freq = 300
  
  addText(`${updateCount}`, { x: 1, y: 1, color: color`0`} )
  if (paused) {
    clearInterval(updateLoop)
    clearText()
    addText(`Score was ${updateCount}\n  Obama: 1\n   You: 0`, { x: 4, y: 4, color: color`3` } )
    clearTile(p.x, p.y)
    getAll(uav).forEach(u => u.y < waterLevel && clearTile(u.x, u.y))
    addSprite(p.x, p.y, booyah)
  }
}, 300)

function move() {
  if (paused) return
  
  if (p.x >= width() - 1) {
    clearTile(p.x, p.y)
    addSprite(p.x, p.y, playerFlipped)
    p = getFirst(playerFlipped)
    playerLeft = true
  } else if (p.x <= 0) {
    clearTile(p.x, p.y)
    addSprite(p.x, p.y, player)
    p = getFirst(player)
    playerLeft = false
  }
  
  p.x += playerLeft ? -1 : 1
}

afterInput(move)
