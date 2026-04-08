/*
@title: anime-sokoban-10levels
*/

// Characters
const player = "p"
const box = "b"
const goal = "g"
const wall = "#"

// Sprites (anime style)
setLegend(
  [player, bitmap`
................
................
......00000.....
.....0333330....
....033333000...
....0333305770..
...00333305550..
..03033333000...
..03033333330...
..03033333330...
...0033333330...
....033303330...
....0330.0330...
....0330.0330...
.....00...00....
................`],
  [box, bitmap`
3300L00000000003
33LLLLLLLLLLLL30
0L31111111111330
01L32222022231L3
0112000000002LL0
01120DDDDDD02LL0
01100DD444D02LL0
LL100D446DD022L0
0L120D464DD002L0
0L120DD44DD002L0
0L120DD00DD021L0
0L120000000021L0
0L132211122231L0
0L311111111113L0
03LLLLLLLLLLLL33
330000LL00000003`],
  [goal, bitmap`
HHHHHHHHHHHHHHHH
HLL12L1112LLL11H
HLL112LLLLL1L21H
H1LL112LLL111L2H
HL1L110000111LLH
H1120033330011LH
H12033333333011H
H20333333333301H
H03333300333330H
H10333333333302H
H2L0333333330LLH
HL1100333300221H
HL11LL0000LL211H
H112L21112LLLL1H
H12LL1112LL11L1H
HHHHHHHHHHHHHHHH`],
  [wall, bitmap`
1111011101110111
1111011101110111
1122011110110111
1200111220110111
0000000000120111
1111110100200211
1111100110000022
0111101111011000
1011201112011111
1102000220011111
1110010000011111
1120111111000221
1220111111110002
0000011110000100
1111011120110122
1122011220120111`]
)

setSolids([player, box, wall])

// 10 Solvable Levels
const levels = [
  // Level 1
  map`
.....
#####
#p###
#.bg#
#####`,

  // Level 2
  map`
#######
#p....#
#..b..#
#..g..#
#######`,

   // Level 3
  map`
#######
#p.#g.#
#.b#..#
#.....#
###..##`,

  // Level 4
  map`
########
#p.b..g#
#..#...#
#..b..g#
########`,

  // Level 5
  map`
##..#####
#p..b...#
#..#..b.#
#..g..g.#
#########`,

  // Level 6
  map`
....#####..............
....#...#..............
....#b..#..............
..###..b###............
..#..b..b.#............
###.#.###.#......######
#...#.###.########..gg#
#.b..b..............gg#
#####.####.#p#####..gg#
....#......###..#######
....########...........`,

  // Level 7
  map`
############..
#gg..#.....###
#gg..#.b..b..#
#gg..#b####..#
#gg....p.##..#
#gg..#.#..b.##
######.##b.b.#
..#.b..b.b.b.#
..#....#.....#
..############`,

  // Level 8
  map`
........########.
........#......#.
........#.b#b.##.
........#.b..b#..
........##b.b.#..
#########.b.#.###
#gggg..##.b..b..#
##ggg....b..b...#
#gggg..##########
#######..........`,

  // Level 9
  map`
.#########....
.#gggg...##...
.#g#g#..b.##..
##gggg#.#.p##.
#.gggg#..#..##
#.....#b.##b.#
##.###..b....#
.#b..b.b.b#..#
.#.#..b.b.##.#
.#..###..##..#
.#....##.##.##
.#..b.#..b..#.
.###b.b...###.
...#..#####...
...####.......`,

   // Level 10
  map`
############..
#gg..#.....###
#gg..#.b..b..#
#gg..#b####..#
#gg....p.##..#
#gg..#.#..b.##
######.##b.b.#
..#.b..b.b.b.#
..#....#.....#
..############`,
  
]

let level = 0

function loadLevel(n) {
  setMap(levels[n])
  setPushables({
    [player]: [box]
  })
  clearText()
}

loadLevel(level)

// Movement
onInput("w", () => getFirst(player).y -= 1)
onInput("a", () => getFirst(player).x -= 1)
onInput("s", () => getFirst(player).y += 1)
onInput("d", () => getFirst(player).x += 1)

// Win check
afterInput(() => {
  const boxes = getAll(box)
  const goals = getAll(goal)
  const won = goals.every(g => boxes.some(b => b.x === g.x && b.y === g.y))
  
  if (won) {
    level++
    if (level >= levels.length) {
      addText("YOU WIN ALL LEVELS!", { y: 4, color: [255, 105, 180] })
    } else {
      loadLevel(level)
    }
  }
})

// Restart current level
onInput("i", () => {
  loadLevel(level)   // reload the current level
})


addText("I= restart", { y: 0, color: color`3` })
