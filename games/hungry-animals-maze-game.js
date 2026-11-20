/*
@title: hungry animals 
@author: zaibtheteckguy2
@description: my game has infinite levels and a cute animals who like bread
@tags: ['maze']
@addedOn: 2026-11-17
*/

const duck = "p"
const cat = "c"
const ghost = "g"
const apple = "a"
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
...0222222220...
...0822222280...
...0222222220...
...0222222220...
...0222222220...
...02022022020..
....0.00.00.0...
................
................
................` ],
  [apple, bitmap`
................
................
................
................
................
.........000....
........00990...
........0C990...
......0099C90...
......0C99990...
....0099C990....
...09C999900....
...099C9900.....
...099990.......
....0000........
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
let inMenu = true
let level = 1
let blocked = false

function showMenu() {
inMenu = true
setMap(map`
.....
.....
..p..
.....
.....`)
getFirst(duck).type = chars[pick]
clearText()
addText("pick: " + names[pick], { x: 5, y: 4, color: color`7` })
addText("w/s: change  d: play", { x: 0, y: 12, color: color`3` })
}

function newLevel() {
blocked = false
clearText()
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

for (let i = 0; i < 10; i++) {
let rx = 2 + Math.floor(Math.random() * (w - 4))
let ry = 2 + Math.floor(Math.random() * (h - 4))
grid[ry][rx] = "."
}

grid[h - 3][w - 2] = "."
grid[h - 2][w - 3] = "."
grid[h - 2][w - 2] = "."

let mapText = ""
for (let y = 0; y < h; y++) {
for (let x = 0; x < w; x++) {
mapText += grid[y][x]
}
mapText += "\n"
}

setMap(mapText)
addSprite(1, 1, chars[pick])
addSprite(w - 2, h - 2, apple)
addText("lvl " + level, { x: 1, y: 0, color: color`7` })
}

onInput("d", () => {
if (inMenu) {
inMenu = false
newLevel()
} else {
getFirst(chars[pick]).x += 1
}
})

onInput("a", () => {
if (!inMenu) {
getFirst(chars[pick]).x -= 1
}
})

onInput("w", () => {
if (inMenu) {
pick -= 1
if (pick < 0) pick = 2
showMenu()
} else {
getFirst(chars[pick]).y -= 1
}
})

onInput("s", () => {
if (inMenu) {
pick += 1
if (pick > 2) pick = 0
showMenu()
} else {
getFirst(chars[pick]).y += 1
}
})

afterInput(() => {
if (inMenu) return

let p = getFirst(chars[pick])
let a = getFirst(apple)
if (!p || !a) return

let dx = a.x - p.x
let dy = a.y - p.y

if (Math.abs(dx) + Math.abs(dy) == 2 && !blocked) {
let bx = p.x
let by = p.y
if (dx > 0) bx += 1
if (dx < 0) bx -= 1
if (dy > 0) by += 1
if (dy < 0) by -= 1

let open = 0
if (getTile(a.x + 1, a.y).length == 0) open += 1
if (getTile(a.x - 1, a.y).length == 0) open += 1
if (getTile(a.x, a.y + 1).length == 0) open += 1
if (getTile(a.x, a.y - 1).length == 0) open += 1

if (getTile(bx, by).length == 0 && open >= 2) {
addSprite(bx, by, troll)
blocked = true
clearText()
addText("haha go around", { x: 1, y: 0, color: color`3` })
}
}

if (tilesWith(chars[pick], apple).length > 0) {
level += 1
newLevel()
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
