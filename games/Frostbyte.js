/*

@title: FROSTBYTE
@author: Srinivas
@description: You are a repair bot stuck on a frozen power station, and the floor is frictionless: every move slides you until something stops you. Gather every power cell, watch out for thin ice that cracks under your tracks, and stop on the reactor hatch to escape.
@tags: ['puzzle']
@addedOn: 2026-10-04

*/



const WALL = "#"
const ROCK = "c"
const CELL = "*"
const HATCH = ">"    
const OPEN = "@"     
const ICE = "~"      
const CRACK = "x"   
const FLOOR = "f"   


const U = "u"
const D = "p"
const L = "l"
const R = "r"

setLegend(
  [ U, bitmap`
................
....00000000....
...0222222220...
..022222222220..
..022222222220..
..020000000020..
..020000000020..
..022222222220..
..022222222220..
..022222222220..
..000000000000..
..099999999990..
..000000000000..
...0000..0000...
...0000..0000...
................` ],
  [ D, bitmap`
................
....00000000....
...0222222220...
..022222222220..
..022222222220..
..020000000020..
..027700770020..
..022222222220..
..022222222220..
..022222222220..
..000000000000..
..099999999990..
..000000000000..
...0000..0000...
...0000..0000...
................` ],
  [ L, bitmap`
................
....00000000....
...0222222220...
..022222222220..
..022222222220..
..020000000020..
..027777000020..
..022222222220..
..022222222220..
..022222222220..
..000000000000..
..099999999990..
..000000000000..
...0000..0000...
...0000..0000...
................` ],
  [ R, bitmap`
................
....00000000....
...0222222220...
..022222222220..
..022222222220..
..020000000020..
..020000777720..
..022222222220..
..022222222220..
..022222222220..
..000000000000..
..099999999990..
..000000000000..
...0000..0000...
...0000..0000...
................` ],
  [ CELL, bitmap`
................
................
.......0000.....
.......0990.....
.....000000.....
....09999990....
...0999999990...
...0996666990...
...0996666990...
...0999999990...
...0999999990...
....09999990....
.....000000.....
................
................
................` ],
  [ HATCH, bitmap`
................
..000000000000..
..033333333330..
..033333333330..
..030000000030..
..030999990030..
..030999990030..
..030999990030..
..030999990030..
..030999990030..
..030000000030..
..033333333330..
..033333333330..
..000000000000..
................
................` ],
  [ OPEN, bitmap`
................
..000000000000..
..044444444440..
..044444444440..
..040000000040..
..040666660040..
..040622260040..
..040622260040..
..040622260040..
..040666660040..
..040000000040..
..044444444440..
..044444444440..
..000000000000..
................
................` ],
  [ WALL, bitmap`
0000000000000000
0111111111111110
01LLLLLLLLLLLL10
01LLLLLLLLLLLL10
01LLLLLLLLLLLL10
01LLLLLLLLLLLL10
01LLLLLLLLLLLL10
01LLLLLLLLLLLL10
01LLLLLLLLLLLL10
01LLLLLLLLLLLL10
01LLLLLLLLLLLL10
01LLLLLLLLLLLL10
01LLLLLLLLLLLL10
01LLLLLLLLLLLL10
0111111111111110
0000000000000000` ],
  [ ROCK, bitmap`
................
......0000......
....00777700....
...0077777700...
..077227777710..
..072277777110..
..077777771110..
..077777711110..
..077771111110..
...0777111110...
....00000000....
................
................
................
................
................` ],
  [ ICE, bitmap`
2222777777777777
2222777777777777
2277777777777777
7777777777777777
7777777727777777
7777777777777777
7777777777777777
7777727777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ],
  [ CRACK, bitmap`
7777777777777777
7777777777777777
7777L7777L777777
77777L000L777777
7777000000007777
7770000000000777
7700000000000077
7000000000000007
7000000000000007
7700000000000077
7770000000000777
7777000000007777
77777L000L777777
7777L7777L777777
7777777777777777
7777777777777777` ],
  [ FLOOR, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLL1LLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLL1LL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0000000000000000` ],
)

setBackground(FLOOR)
setSolids([ WALL, ROCK ])


const LEVELS = [
  { name: "BOOT UP", par: 2, map: map`
########
#.....>#
#......#
#......#
#......#
#.p.*..#
#......#
########` },
  { name: "FIRST HIT", par: 3, map: map`
########
#.....>#
#.....*#
#......#
#......#
#.pc...#
#......#
########` },
  { name: "BRAKE PAD", par: 3, map: map`
########
#....c.#
#......#
#.*.>..#
#...c..#
#.p....#
#......#
########` },
  { name: "CROSSOVER", par: 5, map: map`
########
#...#..#
#..*~..#
#..##..#
#...#..#
#...~..#
#p..#c>#
########` },
  { name: "THIN ICE", par: 6, map: map`
########
#...#..#
#...#..#
#.*.~..#
#..##..#
#...#..#
#p..#.>#
########` },
  { name: "TWIN CELLS", par: 8, map: map`
########
#...#..#
#..*~..#
#..##..#
#...#..#
#..*~..#
#p..#c>#
########` },
  { name: "CORE WALK", par: 9, map: map`
########
#c..#*.#
#..*~..#
#..##..#
#...#..#
#..*~..#
#p..#c>#
########` },
  { name: "THE LONG WAY", par: 12, map: map`
########
#>..#*.#
#...~..#
#..##..#
#...##.#
#...~..#
#p..#..#
########` },
]

const sfxSlide = tune`35: C3^35`
const sfxRock = tune`60: C2/30 + G2/60`
const sfxCell = tune`60: E5^60, 90: A5^90`
const sfxOpen = tune`70: C5^70, 70: E5^70, 140: G5^140`
const sfxFall = tune`70: G4^70, 70: E4^70, 160: C3^160`
const sfxClear = tune`90: C5^90, 90: E5^90, 90: G5^90, 180: C6^180`
const sfxWin = tune`140: C5^140, 140: E5^140, 140: G5^140, 140: C6^140, 280: E6^280`

let rows = []        
let level = 0        
let px = 0            
let py = 0
let facing = D       
let cellsLeft = 0     
let moves = 0         
let phase = "title"   
let note = ""        
let history = []      
let blink = false    

const at = (x, y) => rows[y][x]

const setAt = (x, y, ch) => {
  rows[y] = rows[y].slice(0, x) + ch + rows[y].slice(x + 1)
}

const inBounds = (x, y) => x >= 0 && y >= 0 && x < rows[0].length && y < rows.length

const screen = () => {
  let out = ""
  for (let y = 0; y < rows.length; y++) {
    if (y === py && phase !== "gone") out += rows[y].slice(0, px) + facing + rows[y].slice(px + 1)
    else out += rows[y]
    out += "\n"
  }
  return out
}

const snapshot = () => ({ rows: rows.slice(), px: px, py: py, facing: facing, cellsLeft: cellsLeft, moves: moves })

const restore = (snap) => {
  rows = snap.rows.slice()
  px = snap.px
  py = snap.py
  facing = snap.facing
  cellsLeft = snap.cellsLeft
  moves = snap.moves
}

const openHatches = () => {
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      if (at(x, y) === HATCH) setAt(x, y, OPEN)
    }
  }
}

const fall = () => {
  phase = "gone"
  note = "CRACKED! UNDOING..."
  playTune(sfxFall)
  setMap(screen())
  draw()
  setTimeout(() => {
    if (phase !== "gone") return
    restore(history[history.length - 1])
    history.pop()
    phase = "play"
    note = "TRY ANOTHER WAY"
    setMap(screen())
    draw()
  }, 700)
}

const slide = (dx, dy) => {
  const before = snapshot()
  let x = px
  let y = py
  let hitRock = false
  let picked = 0

  while (true) {
    const nx = x + dx
    const ny = y + dy
    if (!inBounds(nx, ny)) break
    if (at(nx, ny) === WALL) break
    if (at(nx, ny) === ROCK) {
      setAt(nx, ny, ".")
      hitRock = true
      break
    }

    x = nx
    y = ny
    const here = at(x, y)

    if (here === CRACK) {
      px = x
      py = y
      moves++
      history.push(before)
      fall()
      return
    }
    if (here === ICE) {
      setAt(x, y, CRACK)
    } else if (here === CELL) {
      setAt(x, y, ".")
      cellsLeft--
      picked++
      if (cellsLeft === 0) openHatches()
    }
  }

  if (!hitRock && x === px && y === py) return

  px = x
  py = y
  facing = dx < 0 ? L : dx > 0 ? R : dy < 0 ? U : D
  moves++
  history.push(before)

  if (hitRock) playTune(sfxRock)
  else if (picked > 0) playTune(sfxCell)
  else playTune(sfxSlide)

  note = ""
  if (picked > 0) note = cellsLeft === 0 ? "HATCH UNLOCKED!" : cellsLeft + " CELLS LEFT"
  if (at(px, py) === HATCH) note = "HATCH LOCKED - " + cellsLeft + " CELLS LEFT"

  setMap(screen())

  if (at(px, py) === OPEN) {
    phase = "clear"
    note = ""
    playTune(sfxClear)
  }
  draw()
}

const undo = () => {
  if (history.length === 0) return
  restore(history[history.length - 1])
  history.pop()
  note = "UNDONE"
  setMap(screen())
  draw()
}

const buildLevel = (i) => {
  level = i
  rows = LEVELS[i].map.trim().split("\n")
  cellsLeft = 0
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      if (at(x, y) === "p") {
        px = x
        py = y
        facing = D
        setAt(x, y, ".")
      }
      if (at(x, y) === CELL) cellsLeft++
    }
  }
  moves = 0
  history = []
}

const startLevel = (i) => {
  buildLevel(i)
  phase = "play"
  note = "SLIDE WITH WASD"
  setMap(screen())
  draw()
}

const showTitle = (i) => {
  buildLevel(i)
  phase = "title"
  note = ""
  setMap(screen())
  draw()
}

const draw = () => {
  clearText()

  if (phase === "title") {
    addText("FROSTBYTE", { x: 5, y: 0, color: color`7` })
    addText("THE FLOOR IS ICE.", { x: 2, y: 4, color: color`1` })
    addText("YOU CANNOT STOP", { x: 2, y: 5, color: color`1` })
    addText("WHERE YOU WANT.", { x: 2, y: 6, color: color`1` })
    addText("WASD SLIDE  J START", { x: 1, y: 9, color: color`6` })
    addText("A/D PICK   K/I REDO", { x: 1, y: 11, color: color`L` })
    addText(blink ? "LEVEL " + (level + 1) + ": " + LEVELS[level].name : "", { x: 1, y: 13, color: color`6` })
    return
  }

  addText("L" + (level + 1) + "/" + LEVELS.length + " " + LEVELS[level].name, { x: 0, y: 0, color: color`6` })
  addText("CELLS*" + cellsLeft + " MOV " + moves, { x: 0, y: 1, color: color`7` })

  if (phase === "clear") {
    addText("MODULE CLEARED", { x: 3, y: 4, color: color`4` })
    addText("MOVES " + moves + "  PAR " + LEVELS[level].par, { x: 1, y: 6, color: color`2` })
    addText(moves <= LEVELS[level].par ? "PERFECT!" : "BEAT PAR: " + LEVELS[level].par, { x: 2, y: 7, color: color`6` })
    addText(blink ? "J NEXT MODULE" : "", { x: 2, y: 9, color: color`2` })
  } else if (phase === "win") {
    addText("CORE RESTORED", { x: 3, y: 3, color: color`4` })
    addText("THE STATION HUMS", { x: 1, y: 5, color: color`2` })
    addText("BACK TO LIFE.", { x: 3, y: 6, color: color`2` })
    addText(blink ? "J PLAY AGAIN" : "", { x: 3, y: 9, color: color`6` })
  } else if (note !== "") {
    addText(note, { x: 19 - note.length, y: 14, color: color`6` })
  }
}

const act = (key) => {
  if (key === "k") return startLevel(level)   

  if (phase === "title") {
    if (key === "a") showTitle((level + LEVELS.length - 1) % LEVELS.length)
    if (key === "d") showTitle((level + 1) % LEVELS.length)
    if (key === "j" || key === "s" || key === "w") startLevel(level)
    return
  }
  if (phase === "clear") {
    if (key === "j" || key === "d" || key === "s") {
      if (level + 1 < LEVELS.length) startLevel(level + 1)
      else {
        phase = "win"
        note = ""
        playTune(sfxWin)
        draw()
      }
    }
    if (key === "a") startLevel(level)
    return
  }
  if (phase === "win") {
    if (key === "j" || key === "d" || key === "s") startLevel(0)
    return
  }
  if (phase === "gone") return                  
  if (key === "i") return undo()
  if (key === "j" || key === "l") return

  const dx = key === "a" ? -1 : key === "d" ? 1 : 0
  const dy = key === "w" ? -1 : key === "s" ? 1 : 0
  slide(dx, dy)
}

onInput("w", () => act("w"))
onInput("a", () => act("a"))
onInput("s", () => act("s"))
onInput("d", () => act("d"))
onInput("i", () => act("i"))
onInput("j", () => act("j"))
onInput("k", () => act("k"))
onInput("l", () => act("l"))

setInterval(() => {
  blink = !blink
  if (phase !== "gone") draw()
}, 450)

showTitle(0)
