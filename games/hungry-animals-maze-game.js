/*
@title: hungry animals 
@author: zaibtheteckguy2
@description: my game has infinite levels and cute animals who like bread
@tags: ['maze']
@addedOn: 2026-11-17
*/

const duck = "p"
const cat = "c"
const ghost = "g"
const bread = "b"
const wall = "w"
const troll = "t"

setLegend(
  [duck, bitmap`
..........33....
.........3333...
........000000..
.......06666660.
......0666606660
......0666606699
......0666666699
.......0666660..
..0.....00000...
..00000006660...
.0066666666660..
.0066600006660..
..066006666660..
..00660000660...
...066666660....
....0000000.....` ],
  [cat, bitmap`
................
..00........00..
..090......090..
..099000000990..
..099999999990..
..099099990990..
..099990099990..
..099999999990..
...0099999900...
...0999999990...
...0999999990...
...0990990990...
....00.00.00....
................
................
................` ],
  [ghost, bitmap`
................
.....000000.....
....02222220....
...0222222220...
...0220220220...
...0220220220...
...022222220....
...0822222280...
...0222222220...
...0222222220...
...0222222220...
...02022022020..
....0.00.00.0...
................
................
................` ],
  [bread, bitmap`
................
................
................
....00000000....
...0777777770...
..076676676670..
..077777777770..
...0666666660...
...0666666660...
...0666666660...
...0666666660...
....00000000....
................
................
................
................` ],
  [wall, bitmap`
0000000000000000
0888888888888880
0800000000000080
0808888888888080
0808000000008080
0808088888808080
0808080000808080
0808080880808080
0808080880808080
0808080000808080
0808088888808080
0808000000008080
0808888888888080
0800000000000080
0888888888888880
0000000000000000` ],
  [troll, bitmap`
3333333333333333
3000000000000003
3033000000003303
3003300000033003
3000330000330003
3000033003300003
3000003333000003
3000000330000003
3000000330000003
3000003333000003
3000033003300003
3000330000330003
3003300000033003
3033000000003303
3000000000000003
3333333333333333` ]
)

setSolids([ duck, cat, ghost, wall, troll ])

let chars = [duck, cat, ghost]
let names = ["duck", "cat", "ghost"]
let pick = 0
let screen = "menu"
let level = 1
let timer = 20
let rerolls = 3
let blocked = false
let extraBlocks = 0
let dirX = 0
let dirY = 0
let prevX = 1
let prevY = 1
let msg = ""

function drawText() {
  if (screen != "play") return
  clearText()
  addText("lv:" + level + " t:" + timer + " i:" + rerolls, { x: 0, y: 0, color: color`7` })
  if (msg != "") {
    addText(msg, { x: 0, y: 10, color: color`3` })
  }
}

function showMenu() {
  screen = "menu"
  setMap(map`
.....
.....
..p..
.....
.....`)
  getFirst(duck).type = chars[pick]
  clearText()
  addText("pick: " + names[pick], { x: 5, y: 3, color: color`7` })
  addText("w/s:char d:play", { x: 2, y: 11, color: color`3` })
  addText("i:new map (3x)", { x: 3, y: 13, color: color`6` })
}

function gameOver() {
  screen = "over"
  setMap(map`
.....
.....
..p..
.....
.....`)
  getFirst(duck).type = chars[pick]
  clearText()
  addText("time up!", { x: 6, y: 3, color: color`3` })
  addText("score: " + (level - 1), { x: 5, y: 5, color: color`7` })
  addText("d: play again", { x: 3, y: 12, color: color`6` })
}

function hasPath(sx, sy, gx, gy, bx, by) {
let w = 15
let h = 11
let seen = []
for (let y = 0; y < h; y++) {
seen[y] = []
for (let x = 0; x < w; x++) {
  seen[y][x] = false
 }
}

let q = [[sx, sy]]
seen[sy][sx] = true

while (q.length > 0) {
  let cur = q.shift()
  let cx = cur[0]
  let cy = cur[1]

  if (cx == gx && cy == gy) return true

  let dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]]
  for (let i = 0; i < 4; i++) {
    let nx = cx + dirs[i][0]
    let ny = cy + dirs[i][1]
    if (nx >= 0 && nx < w && ny >= 0 && ny < h && !seen[ny][nx]) {
      if (nx == bx && ny == by) continue
      let t = getTile(nx, ny)
      let hit = false
      for (let k = 0; k < t.length; k++) {
        if (t[k].type == wall || t[k].type == troll) {
          hit = true
        }
      }
      if (!hit) {
        seen[ny][nx] = true
         q.push([nx, ny])
      }
     }
  }
}
return false
}

function newLevel(resetTime) {
  if (resetTime) {
    timer = Math.max(8, 22 - level * 2)
}
blocked = false
extraBlocks = 0
prevX = 1
prevY = 1
msg = ""
let w = 15
let h = 11
let grid = []
for (let y = 0; y < h; y++) {
grid[y] = []
for (let x = 0; x < w; x++) {
grid[y][x] = "w"
  }
}

function carve(x, y) {
  grid[y][x] = "."
  let dirs = [[0, -2], [0, 2], [-2, 0], [2, 0]]
  for (let i = 0; i < 4; i++) {
    let r = Math.floor(Math.random() * 4)
    let temp = dirs[i]
     dirs[i] = dirs[r]
    dirs[r] = temp
  }

  for (let i = 0; i < 4; i++) {
  let nx = x + dirs[i][0]
  let ny = y + dirs[i][1]
  if (nx > 0 && nx < w - 1 && ny > 0 && ny < h - 1) {
  if (grid[ny][nx] == "w") {
  grid[y + dirs[i][1] / 2][x + dirs[i][0] / 2] = "."
  carve(nx, ny)
    }
   }
  }
}

carve(1, 1)

for (let i = 0; i < 14; i++) {
  let rx = 2 + Math.floor(Math.random() * (w - 4))
    let ry = 2 + Math.floor(Math.random() * (h - 4))
  grid[ry][rx] = "."
}

grid[h - 3][w - 2] = "."
grid[h - 2][w - 3] = "."
grid[h - 2][w - 2] = "."
grid[h - 3][w - 3] = "."
grid[h - 2][w - 4] = "."
grid[h - 4][w - 2] = "."

  let mapText = ""
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      mapText += grid[y][x]
    }
    mapText += "\n"
  }

  setMap(mapText)
  addSprite(1, 1, chars[pick])
  addSprite(w - 2, h - 2, bread)
  drawText()
}

setInterval(() => {
  if (screen == "play") {
    timer -= 1
    if (timer <= 0) {
      gameOver()
    } else {
      drawText()
    }
  }
}, 1000)

onInput("d", () => {
  if (screen == "menu") {
    screen = "play"
    level = 1
    rerolls = 3
    newLevel(true)
  } else if (screen == "over") {
    showMenu()
  } else {
    let p = getFirst(chars[pick])
    prevX = p.x
    prevY = p.y
    dirX = 1
    dirY = 0
    p.x += 1
  }
})

onInput("a", () => {
  if (screen == "play") {
    let p = getFirst(chars[pick])
    prevX = p.x
    prevY = p.y
    dirX = -1
    dirY = 0
    p.x -= 1
  }
})

onInput("w", () => {
  if (screen == "menu") {
    pick -= 1
    if (pick < 0) pick = 2
    showMenu()
  } else if (screen == "play") {
    let p = getFirst(chars[pick])
    prevX = p.x
    prevY = p.y
    dirX = 0
    dirY = -1
    p.y -= 1
  }
})

onInput("s", () => {
  if (screen == "menu") {
    pick += 1
    if (pick > 2) pick = 0
    showMenu()
  } else if (screen == "play") {
    let p = getFirst(chars[pick])
    prevX = p.x
    prevY = p.y
    dirX = 0
    dirY = 1
    p.y += 1
  }
})

onInput("i", () => {
  if (screen == "play" && rerolls > 0) {
    rerolls -= 1
    newLevel(false)
    msg = "new maze (" + rerolls + " left)"
    drawText()
  }
})

afterInput(() => {
  if (screen != "play") return

  let p = getFirst(chars[pick])
  let b = getFirst(bread)
  if (!p || !b) return

  let moved = (p.x != prevX || p.y != prevY)
  if (!moved) return

  let dx = b.x - p.x
  let dy = b.y - p.y

  if (Math.abs(dx) + Math.abs(dy) == 2 && (dx == 0 || dy == 0) && !blocked) {
    let bx = p.x + Math.sign(dx)
    let by = p.y + Math.sign(dy)

    if (getTile(bx, by).length == 0 && hasPath(p.x, p.y, b.x, b.y, bx, by)) {
      addSprite(bx, by, troll)
      blocked = true
      msg = "sorry, go around"
      drawText()
  }
} else if (extraBlocks < 2 && Math.random() < 0.25) {
  let tx = p.x + dirX
  let ty = p.y + dirY
    if (tx > 0 && tx < 14 && ty > 0 && ty < 10) {
      if (getTile(tx, ty).length == 0 && hasPath(p.x, p.y, b.x, b.y, tx, ty)) {
        addSprite(tx, ty, troll)
        extraBlocks += 1
        msg = "sorry!"
        drawText()
    }
  }
}

  if (tilesWith(chars[pick], bread).length > 0) {
    level += 1
    newLevel(true)
  }
})

showMenu()

const melody = tune`
500: B5~500 + E5/500,
500: B5~500 + C4-500 + D4^500,
500: B5~500 + E5/500 + D5-500,
500: B5~500 + C4-500 + D4^500,
500: B5~500 + E5-500 + B4^500,
500: B5~500 + C4-500 + D4^500 + D5-500 + G4-500,
500: B5~500 + E5/500,
500: B5~500 + C4-500 + D4^500,
500: B5~500 + B4^500,
500: B5~500 + C4-500 + D4^500,
500: B5~500 + G4^500,
500: B5~500 + C4-500 + D4^500 + G5/500,
500: B5~500 + G5/500 + F5-500 + A4~500,
500: B5~500 + C4-500 + D4^500 + E5-500,
500: B5~500 + D5-500 + F4~500,
500: B5~500 + C4-500 + D4^500,
500: B5~500 + E5/500 + A4~500,
500: B5~500 + C4-500 + D4^500,
500: B5~500 + E5/500 + D5-500,
500: B5~500 + C4-500 + D4^500,
500: B5~500 + B4^500 + E5-500,
500: B5~500 + C4-500 + D4^500 + D5-500 + A4-500,
500: B5~500 + E5/500,
500: B5~500 + C4-500 + D4^500,
500: B5~500 + F4/500,
500: B5~500 + C4-500 + D4^500 + F4/500,
500: B5~500 + G4-500 + F4^500,
500: B5~500 + C4-500 + D4^500 + A4-500 + F4~500,
500: B5~500 + B4-500 + G4~500 + A4^500,
500: B5~500 + C4-500 + D4^500 + C5-500 + A4~500,
500: B5~500 + D5-500 + B4~500 + C5^500,
500: B5~500 + C4-500 + D4^500 + C5~500`

playTune(melody, Infinity)
