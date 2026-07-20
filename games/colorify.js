/*
@title: Colorify
@author: Nikolaos Samaras
@description: A basic maze game where you can change color to pass throught walls
@tags: ['maze', 'color']
@addedOn: 2026-05-02
*/

// ── sprite keys (must all be single characters) ────────
const player_blue    = "b"
const player_red     = "r"
const player_yellow  = "y"
const wall_blue      = "B"
const wall_red       = "R"
const wall_yellow    = "Y"
const goal           = "g"
const wall           = "w"
const pickaxe        = "p"
const pickaxe_blue ="u"
const pickaxe_red ="d"
const pickaxe_yellow ="l"
const coin ="c"
const breakable_wall = "k" 
const breakable_wall_blue = "U"  
const breakable_wall_red = "D"  
const breakable_wall_yellow = "L"  

const melody = tune`
163.04347826086956: G4~163.04347826086956 + A4~163.04347826086956 + B4~163.04347826086956 + C5~163.04347826086956 + D5~163.04347826086956,
163.04347826086956,
163.04347826086956: D5~163.04347826086956 + C5~163.04347826086956 + B4~163.04347826086956 + A4~163.04347826086956 + G4~163.04347826086956,
163.04347826086956: F4~163.04347826086956 + E4~163.04347826086956 + D4~163.04347826086956 + C4~163.04347826086956,
163.04347826086956: G4~163.04347826086956 + A4~163.04347826086956 + B4~163.04347826086956 + C5~163.04347826086956 + D5~163.04347826086956,
163.04347826086956,
163.04347826086956: F4~163.04347826086956 + E4~163.04347826086956 + D4~163.04347826086956 + C4~163.04347826086956,
163.04347826086956: D5~163.04347826086956 + C5~163.04347826086956 + B4~163.04347826086956 + A4~163.04347826086956 + G4~163.04347826086956,
163.04347826086956,
163.04347826086956: D5~163.04347826086956 + C5~163.04347826086956 + B4~163.04347826086956 + A4~163.04347826086956 + G4~163.04347826086956,
163.04347826086956: F4~163.04347826086956 + E4~163.04347826086956 + D4~163.04347826086956 + C4~163.04347826086956,
163.04347826086956: G4~163.04347826086956 + A4~163.04347826086956 + B4~163.04347826086956 + C5~163.04347826086956 + D5~163.04347826086956,
163.04347826086956,
163.04347826086956: F4~163.04347826086956 + E4~163.04347826086956 + D4~163.04347826086956 + C4~163.04347826086956,
163.04347826086956: D5~163.04347826086956 + C5~163.04347826086956 + B4~163.04347826086956 + A4~163.04347826086956 + G4~163.04347826086956,
163.04347826086956,
163.04347826086956: D5~163.04347826086956 + C5~163.04347826086956 + B4~163.04347826086956 + A4~163.04347826086956 + G4~163.04347826086956,
163.04347826086956: F4~163.04347826086956 + E4~163.04347826086956 + D4~163.04347826086956 + C4~163.04347826086956,
163.04347826086956: D5~163.04347826086956 + C5~163.04347826086956 + B4~163.04347826086956 + A4~163.04347826086956 + G4~163.04347826086956,
163.04347826086956,
163.04347826086956: F4~163.04347826086956 + E4~163.04347826086956 + D4~163.04347826086956 + C4~163.04347826086956,
163.04347826086956: D5~163.04347826086956 + C5~163.04347826086956 + B4~163.04347826086956 + A4~163.04347826086956 + G4~163.04347826086956,
163.04347826086956,
163.04347826086956: D5~163.04347826086956 + C5~163.04347826086956 + B4~163.04347826086956 + A4~163.04347826086956 + G4~163.04347826086956,
163.04347826086956: F4~163.04347826086956 + E4~163.04347826086956 + D4~163.04347826086956 + C4~163.04347826086956,
163.04347826086956: D5~163.04347826086956 + C5~163.04347826086956 + B4~163.04347826086956 + A4~163.04347826086956 + G4~163.04347826086956,
163.04347826086956,
163.04347826086956: F4~163.04347826086956 + E4~163.04347826086956 + D4~163.04347826086956 + C4~163.04347826086956,
163.04347826086956: D5~163.04347826086956 + C5~163.04347826086956 + B4~163.04347826086956 + A4~163.04347826086956 + G4~163.04347826086956,
163.04347826086956,
163.04347826086956: D5~163.04347826086956 + C5~163.04347826086956 + B4~163.04347826086956 + A4~163.04347826086956 + G4~163.04347826086956,
163.04347826086956: F4~163.04347826086956 + E4~163.04347826086956 + D4~163.04347826086956 + C4~163.04347826086956`

const coins_sfx = tune`
201.34228187919464,
67.11409395973155: G4-67.11409395973155,
402.6845637583893,
67.11409395973155: B4^67.11409395973155,
67.11409395973155: B4^67.11409395973155 + C5^67.11409395973155,
67.11409395973155: C5^67.11409395973155,
67.11409395973155: C5^67.11409395973155,
67.11409395973155: D5^67.11409395973155,
67.11409395973155: D5^67.11409395973155,
67.11409395973155: D5^67.11409395973155,
67.11409395973155: E5^67.11409395973155,
67.11409395973155: F5^67.11409395973155,
67.11409395973155: F5^67.11409395973155,
67.11409395973155: F5^67.11409395973155,
67.11409395973155: F5^67.11409395973155,
67.11409395973155: G5^67.11409395973155,
67.11409395973155: G5^67.11409395973155,
67.11409395973155: G5^67.11409395973155,
67.11409395973155: A5^67.11409395973155,
67.11409395973155: A5^67.11409395973155,
67.11409395973155: B5/67.11409395973155,
268.4563758389262`





// ── bitmaps ────────────────────────────────────────────
setLegend(

  [player_blue, bitmap`
.00000000000000.
0555577777777770
0555777777777770
0500007777000070
050LL077770LL070
070L10777701L070
0770077007700770
0777777007777770
0777777777777770
0770077777700770
0777007777007770
0777700000077770
0077777777777700
0507770000777050
0507705555077050
.00000000000000.`],

  [player_red, bitmap`
.00000000000000.
0888833333333330
0888333333333330
0800003333000030
080LL033330LL030
030L10333301L030
0330033003300330
0333333003333330
0333333333333330
0330033333300330
0333003333003330
0333300000033330
0033333333333300
0803330000333080
0803308888033080
.00000000000000.`],

  [player_yellow, bitmap`
.00000000000000.
0FFFF66666666660
0FFF666666666660
0F00006666000060
0F0LL066660LL060
060L10666601L060
0660066006600660
0666666006666660
0666666666666660
0660066666600660
0666006666006660
0666600000066660
0066666666666600
0F066600006660F0
0F0660FFFF0660F0
.00000000000000.`],

  [wall_blue, bitmap`
5555555555555555
5777777777777775
5777777777777775
5775555555555775
5775555555555775
5775555555555775
5775555555555775
5775555555555775
5775555555555775
5775555555555775
5775555555555775
5775555555555775
5775555555555775
5777777777777775
5777777777777775
5555555555555555`],

  [wall_red, bitmap`
3333333333333333
3888888888888883
3888888888888883
3883333333333883
3883333333333883
3883333333333883
3883333333333883
3883333333333883
3883333333333883
3883333333333883
3883333333333883
3883333333333883
3883333333333883
3888888888888883
3888888888888883
3333333333333333`],

  [wall_yellow, bitmap`
FFFFFFFFFFFFFFFF
F66666666666666F
F66666666666666F
F66FFFFFFFFFF66F
F66FFFFFFFFFF66F
F66FFFFFFFFFF66F
F66FFFFFFFFFF66F
F66FFFFFFFFFF66F
F66FFFFFFFFFF66F
F66FFFFFFFFFF66F
F66FFFFFFFFFF66F
F66FFFFFFFFFF66F
F66FFFFFFFFFF66F
F66666666666666F
F66666666666666F
FFFFFFFFFFFFFFFF`],

  [goal, bitmap`
................
................
.....000000.....
....06666660....
...0666666660...
..06666FF66660..
..06666FF66660..
..06666FF66660..
..06666FF66660..
..06666FF66660..
..06666FF66660..
...0666666660...
....06666660....
.....000000.....
................
................`],
  
  [coin, bitmap`
................
................
.....000000.....
....06666660....
...0666666660...
..06666FF66660..
..06666FF66660..
..06666FF66660..
..06666FF66660..
..06666FF66660..
..06666FF66660..
...0666666660...
....06666660....
.....000000.....
................
................`],
  [wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LL0000000000LL0
0LL0000000000LL0
0LL0000000000LL0
0LL0000000000LL0
0LL0000000000LL0
0LL0000000000LL0
0LL0000000000LL0
0LL0000000000LL0
0LL0000000000LL0
0LL0000000000LL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0000000000000000`],

  [pickaxe, bitmap`
................
................
................
..00000000......
.0LLLLL11100....
..0000001110....
........00110...
.......0C0110...
......0C0.010...
.....0C0..0L0...
....0C0...0L0...
...0C0....0L0...
..0C0.....0L0...
.0C0.......0....
0C0.............
00..............`],
    [pickaxe_blue, bitmap`
................
................
................
..00000000......
.05555577700....
..0000007770....
........00770...
.......0C0770...
......0C0.070...
.....0C0..050...
....0C0...050...
...0C0....050...
..0C0.....050...
.0C0.......0....
0C0.............
00..............`],
      [pickaxe_red, bitmap`
................
................
................
..00000000......
.03333388800....
..0000008880....
........00880...
.......0C0880...
......0C0.080...
.....0C0..030...
....0C0...030...
...0C0....030...
..0C0.....030...
.0C0.......0....
0C0.............
00..............`],
        [pickaxe_yellow, bitmap`
................
................
................
..00000000......
.0FFFFF66600....
..0000006660....
........00660...
.......0C0660...
......0C0.060...
.....0C0..0F0...
....0C0...0F0...
...0C0....0F0...
..0C0.....0F0...
.0C0.......0....
0C0.............
00..............`],
  
  [breakable_wall_blue, bitmap`
5575555555555575
577LLLLLLL7LLL77
57LL77LLLL77LLL7
7LL7755557557LL7
7LL7555557757LL5
7LL77555557557L5
7LL57555557557L5
77L5575555755L75
57L5575557755L77
5L75575557555LL7
5775775557555LL7
57L5755557555LL7
5LL7555557555LL7
5L77LLLLL77LLLL5
577LLLLLLL77LLL5
7555555555577555`],
    [breakable_wall_red, bitmap`
3383333333333383
388LLLLLLL8LLL88
38LL88LLLL88LLL8
8LL8833338338LL8
8LL8333338838LL3
8LL88333338338L3
8LL38333338338L3
88L3383333833L83
38L3383338833L88
3L83383338333LL8
3883883338333LL8
38L3833338333LL8
3LL8333338333LL8
3L88LLLLL88LLLL3
388LLLLLLL88LLL3
8333333333388333`],
    [breakable_wall_yellow, bitmap`
FF6FFFFFFFFFFF6F
F66LLLLLLL6LLL66
F6LL66LLLL66LLL6
6LL66FFFF6FF6LL6
6LL6FFFFF66F6LLF
6LL66FFFFF6FF6LF
6LLF6FFFFF6FF6LF
66LFF6FFFF6FFL6F
F6LFF6FFF66FFL66
FL6FF6FFF6FFFLL6
F66F66FFF6FFFLL6
F6LF6FFFF6FFFLL6
FLL6FFFFF6FFFLL6
FL66LLLLL66LLLLF
F66LLLLLLL66LLLF
6FFFFFFFFFF66FFF`],
  [breakable_wall, bitmap`
0010000000000010
011LLLLLLL1LLL11
01LL11LLLL11LLL1
1LL1100001001LL1
1LL1000001101LL0
1LL11000001001L0
1LL01000001001L0
11L0010000100L10
01L0010001100L11
0L10010001000LL1
0110110001000LL1
01L0100001000LL1
0LL1000001000LL1
0L11LLLLL11LLLL0
011LLLLLLL11LLL0
1000000000011000`]

)

// ── nothing is solid — movement handled manually ───────
setSolids([])
// ── levels ─────────────────────────────────────────────
let level = 0
const levels = [
  map`
wwwwwwwwwwww
wb..R...Y..w
wR.www.YYY.w
w..w.R...Y.w
wYYw.wwwR..w
w...w....R.w
w.RRR.ww...w
w.....w..YYw
w.YYY.w....w
w.....wwwR.w
w..ww......w
wwwwwwwwwgww`,

  map`
....R....Y..
wbw.wwwwBww.
wwwYw.....w.
....w.www.w.
Rwwwwww.w.R.
.B......www.
.wwwwww...w.
.wg...www.w.
.ww...Y.w.B.
Ywwww.w.www.
.w..www..w..
.B.......www`,
    map`
.....w.R.B......
.ww.w..wYw...ww.
..www.ww.wwwRw..
w.....w.w.w..ww.
....wwwg.ww...w.
.ww.w.w.ww....w.
..B.w.w..w.w.www
www.w.ww.Y.www..
....w....w...w..
Bwwwwwwwwwwwwww.
..Y..wwww....w..
..ww...ww..www.w
wwwwwwRwwBww.w.w
....ww.....w.w.w
w.w..Y..ww...Y.w
..ww.wwbw..w.www`,
    map`
wwkRkww.B.cccccc
...w....w.wwwwww
kwwwwwwwwRcccccc
........B.wwwwww
wwwRwwwkwkcccccc
........w.wwwwww
kwwYwwwwwYcccccg
........w.wwwwww
wwwBwwwkwRcccccc
........w.wwwwww
kwwRwwwwwBcccccc
........w.wwwwww
wwwYwwwkwkcccccc
........wwwwwwww
kwwBwwwww....kb.
........k....w.p`,     
map`
UUUUUUUUUUUUUUUU
UUUUUUUUUUUUUUUU
UUUUUUUUUUUUUUUU
UUUUUUUUUUUUUUUU
UUUUUUUgUUUUUUUU
UUUUUUUUUUUUUUUU
UUUUUUUUUUUUUUUU
UUUUUUUUUUUUUUUU
UUUUUUUUUUUUUUUU
UUUUwwwwwwwwwwww
UUUUk...D...L...
UUUUk...D...L...
UUUUk...D...L...
wwwwwwwwwwwwwUUU
..k.uU.lL.dD....
pbk..U..L..D....`,
map`
..........R.....
.wwww..wwwwYwwbw
.w....ww..w..www
Bwwww.wg..w....w
....w.wwUww.ww.w
www.w..w.....w.w
....w..w..w..w.w
..wwR..w..wwwwRw
Yww..wwD.....Rpw
.w...ww.wwwwwwww
.www.w.....B..wY
.kdw.wwww..w..Lu
wwwwwww.w..wYwwU
..w...w.wwww....
..w.w.w....wwww.
l...w.D....R....`,
]
setMap(levels[level])

// ── state ──────────────────────────────────────────────
let colorState = 0
const states       = [player_blue, player_red, player_yellow]
const matchingWall = [wall_blue,   wall_red,   wall_yellow]

let hasPickaxe = false
let hasPickaxe_blue =false
let hasPickaxe_yellow=false
let hasPickaxe_red=false

let victory = false 
// ── movement ───────────────────────────────────────────
function tryMove(dx, dy) {
  const p = getFirst(states[colorState])
  if (!p) return
  const nx = p.x + dx
  const ny = p.y + dy

  if (nx < 0 || ny < 0 || nx >= width() || ny >= height()) return

  const there = getTile(nx, ny)

  // always blocked by normal solid walls
  if (there.some(t => t.type === wall)) return

  // blocked by wrong-color walls
  const wrongWalls = matchingWall.filter((_, i) => i !== colorState)
  if (there.some(t => wrongWalls.includes(t.type))) return

  // breakable wall — passable only with pickaxe, destroys on entry
  if (there.some(t => t.type === breakable_wall)) {
    if (hasPickaxe) {
      there.filter(t => t.type === breakable_wall).forEach(t => t.remove())
    } else {
      return
    }
  }
    if (there.some(t => t.type === breakable_wall_red)) {
    if (hasPickaxe_red) {
      there.filter(t => t.type === breakable_wall_red).forEach(t => t.remove())
    } else {
      return
    }
  }
  if (there.some(t => t.type === breakable_wall_yellow)) {
    if (hasPickaxe_yellow) {
      there.filter(t => t.type === breakable_wall_yellow).forEach(t => t.remove())
    } else {
      return
    }
  }
  if (there.some(t => t.type === breakable_wall_blue)) {
    if (hasPickaxe_blue) {
      there.filter(t => t.type === breakable_wall_blue).forEach(t => t.remove())
    } else {
      return
    }
  }

  p.x = nx
  p.y = ny
}

// ── inputs ─────────────────────────────────────────────
onInput("w", () => tryMove( 0, -1))
onInput("s", () => tryMove( 0,  1))
onInput("a", () => tryMove(-1,  0))
onInput("d", () => tryMove( 1,  0))

onInput("j", () => {
  const p = getFirst(states[colorState])
  if (!p) return
  const x = p.x, y = p.y
  colorState = (colorState + 1) % states.length
  clearTile(x, y)
  addSprite(x, y, states[colorState])
})

// ── after each input ───────────────────────────────────
afterInput(() => {
  const p = getFirst(states[colorState])
  if (!p) return
  if (victory !=true){
    clearText()
  }
  

  // pick up pickaxe if standing on it
  const onPickaxe = getTile(p.x, p.y).find(t => t.type === pickaxe)
  if (onPickaxe) {
    clearText()
    hasPickaxe = true
    getTile(p.x, p.y)
      .filter(t => t.type === pickaxe)
      .forEach(t => t.remove())
    addText("got pickaxe!", { x: 1, y: 1, color: color`1` })
  }
  const onPickaxe_blue = getTile(p.x, p.y).find(t => t.type === pickaxe_blue)
  if (onPickaxe_blue) {
    clearText()
    hasPickaxe_blue = true
    getTile(p.x, p.y)
      .filter(t => t.type === pickaxe_blue)
      .forEach(t => t.remove())
    addText("got blue pickaxe!", { x: 1, y: 1, color: color`7` })
  }
  const onPickaxe_yellow = getTile(p.x, p.y).find(t => t.type === pickaxe_yellow)
  if (onPickaxe_yellow) {
    clearText()
    hasPickaxe_yellow = true
    getTile(p.x, p.y)
      .filter(t => t.type === pickaxe_yellow)
      .forEach(t => t.remove())
    addText("got yellow pickaxe!", { x: 1, y: 1, color: color`6` })
  }
  const onPickaxe_red = getTile(p.x, p.y).find(t => t.type === pickaxe_red)
  if (onPickaxe_red) {
    clearText()
    hasPickaxe_red = true
    getTile(p.x, p.y)
      .filter(t => t.type === pickaxe_red)
      .forEach(t => t.remove())
    addText("got red pickaxe!", { x: 1, y: 1, color: color`3` })
  }

  // reach goal — advance to next level
  if (getTile(p.x, p.y).find(t => t.type === goal)) {
    playTune(coins_sfx)
    level++
    hasPickaxe=false
    hasPickax_red=false
    hasPickaxe_blue=false
    hasPickaxe_yellow=false
    clearText()
    if (level >= levels.length) {
      victory=true
      addText("you win!", { x: 2, y: 4, color: color`9` })
    } else {
      colorState = 0
      hasPickaxe = false
      setMap(levels[level])
      
    }
  }
})
const playback = playTune(melody, Infinity)
