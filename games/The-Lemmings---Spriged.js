/*
--------------------------------------------------------------------
IF YOU ENJOY THIS GAME FEEL FREE TO REMIX IT AND ADD YOUR OWN LEVEL!
--------------------------------------------------------------------

@title: The Lemmings - Proof of Concept (Multi-Level + Abilities)
@author: mtthsschrbr
@description: A sprig remake of the iconic 1991 Lemmings for the Amiga featuring 10 levels and mainly is about the fun of Lemmings rather than being super hard to beat. It is demonstrating the mechanic and it's integration for the sprig.
@tags: ["retro", "remake", "strategy", "difficult", "puzzle", "physics", "90s", "realt-time", "timed"]
@addedOn: 2025-11-12
*/

const lemming_1 = "1"
const lemming_2 = "2"
const lemming_l_1 = "7"
const lemming_l_2 = "8"
const lemming_block_1 = "3"
const lemming_block_2 = "4"
const lemming_dig_1 = "5"
const lemming_dig_2 = "6"
const lemming_build_1 = "9"
const lemming_build_2 = "0"
const spawn_l = "<"
const spawn_r = ">"
const exit = "e"
const exit2 = "h"
const wall = "#"
const wall_grass = "%"
const selection_marker_block = "?"
const selection_marker_dig = "q"
const selection_marker_build = "r"
const selector_reset = "n"
const selection_marker_reset = "m"
const selector_block = "!"
const selector_dig = "d"
const selector_build = "u"
const bg = "'"
const red_b = "b"
const lava = "l"

// decorative
const plants = "*"
const dirt = "§"

let selection_loc = [1, 1]
let editing = false;
let lemmingsSpawned = 0;
let lemmingsSaved = 0;
let gameStarted = false;

// Lemming state tracking
let lemmings = [];

// Interaction mode
let placedSelectors = [];

// Ability selection system
let selectedAbility = 0;
const abilityNames = ["Blocker", "Digger", "Builder", "Reset"];
const abilitySelectors = [selector_block, selector_dig, selector_build, selector_reset];

// MULTI-LEVEL SYSTEM
let currentLevel = 0;
let spawnInterval = null;
let movementInterval = null;
let abilityActionInterval = null; // Separate interval for digger/builder actions

// Level configurations
const levelConfigs = [
  {
    maxLemmings: Infinity,
    targetSaved: 2,
    spawnDelay: 1500,
    moveSpeed: 400
  },
  {
    maxLemmings: 20,
    targetSaved: 15,
    spawnDelay: 1500,
    moveSpeed: 400
  },
  {
    maxLemmings: 30,
    targetSaved: 20,
    spawnDelay: 1200,
    moveSpeed: 350
  },
  {
    maxLemmings: 30,
    targetSaved: 25,
    spawnDelay: 1000,
    moveSpeed: 300
  }, 
  {
    maxLemmings: 10,
    targetSaved: 5,
    spawnDelay: 7500,
    moveSpeed: 250
  },
  {
    maxLemmings: 40,
    targetSaved: 20,
    spawnDelay: 500,
    moveSpeed: 450
  },
  {
    maxLemmings: 1,
    targetSaved: 1,
    spawnDelay: 0,
    moveSpeed: 300
  },
  {
    maxLemmings: 1,
    targetSaved: 1,
    spawnDelay: 0,
    moveSpeed: 75
  },
  {
    maxLemmings: 6,
    targetSaved: 3,
    spawnDelay: 1500,
    moveSpeed: 250
  },
  {
    maxLemmings: 40,
    targetSaved: 30,
    spawnDelay: 2500,
    moveSpeed: 300
  }
];

const melody1 = tune`
186.33540372670808: C5~186.33540372670808,
186.33540372670808,
186.33540372670808: C5~186.33540372670808,
186.33540372670808: C5~186.33540372670808,
372.67080745341616,
186.33540372670808: B4~186.33540372670808,
186.33540372670808,
186.33540372670808: A4~186.33540372670808,
186.33540372670808: G4~186.33540372670808,
372.67080745341616,
186.33540372670808: A4~186.33540372670808,
186.33540372670808,
186.33540372670808: A4~186.33540372670808,
186.33540372670808: A4~186.33540372670808,
372.67080745341616,
186.33540372670808: G4~186.33540372670808,
186.33540372670808,
186.33540372670808: F4~186.33540372670808,
186.33540372670808: E4~186.33540372670808,
372.67080745341616,
186.33540372670808: F4~186.33540372670808,
186.33540372670808,
186.33540372670808: F4~186.33540372670808,
186.33540372670808: F4~186.33540372670808,
186.33540372670808,
186.33540372670808: G4~186.33540372670808,
186.33540372670808: A4~186.33540372670808,
186.33540372670808: B4~186.33540372670808`

const melody2 = tune`
186.33540372670808: C5~186.33540372670808 + G4/186.33540372670808 + E4^186.33540372670808,
186.33540372670808,
186.33540372670808: C5~186.33540372670808 + G4/186.33540372670808 + E4^186.33540372670808,
186.33540372670808: C5~186.33540372670808 + G4/186.33540372670808 + E4^186.33540372670808,
372.67080745341616,
186.33540372670808: B4~186.33540372670808 + E4/186.33540372670808,
186.33540372670808,
186.33540372670808: A4~186.33540372670808 + D4/186.33540372670808,
186.33540372670808: G4~186.33540372670808 + C4/186.33540372670808,
372.67080745341616,
186.33540372670808: A4~186.33540372670808 + E4/186.33540372670808 + C4^186.33540372670808,
186.33540372670808,
186.33540372670808: A4~186.33540372670808 + E4/186.33540372670808 + C4^186.33540372670808,
186.33540372670808: A4~186.33540372670808 + E4/186.33540372670808 + C4^186.33540372670808,
372.67080745341616,
186.33540372670808: G4~186.33540372670808 + D4/186.33540372670808,
186.33540372670808,
186.33540372670808: F4~186.33540372670808 + C4/186.33540372670808,
186.33540372670808: E4~186.33540372670808 + C4/186.33540372670808,
372.67080745341616,
186.33540372670808: F4~186.33540372670808 + D4/186.33540372670808,
186.33540372670808,
186.33540372670808: F4~186.33540372670808 + D4/186.33540372670808,
186.33540372670808: F4~186.33540372670808 + D4/186.33540372670808,
186.33540372670808,
186.33540372670808: G4~186.33540372670808,
186.33540372670808: F4~186.33540372670808,
186.33540372670808: E4~186.33540372670808`

const winJingle = tune`
250: C4/250 + D4^250 + D5~250,
250: D4-250,
250: D4/250 + E4^250 + E5~250,
250: E4-250,
250: E4/250 + F4^250,
250: F4-250 + F5~250 + G4^250,
250,
250: F4-250 + A4^250,
250,
250: G5/250,
250: G5/250,
250: A5^250 + D5-250,
250: A5^250,
4750`

const allWinJingle = tune`
375,
375: E5~375 + A4-375,
375,
375: C5~375 + F4-375,
375,
375: A4~375 + D4-375,
375: F4/375,
375: F4/375,
375: F4/375,
375: F4/375,
375: E4-375 + G4^375 + B4^375 + C4~375,
375,
375: G4-375 + E4~375,
375,
375: A4-375 + F4~375,
375: C5-375,
375: C5-375,
375: C5-375,
375: D5^375 + B4~375,
375: D5^375 + B4~375,
375: B4/375,
375: B4/375,
375: C5/375 + E5-375,
3375`

let playback = playTune(melody1, Infinity)

setTimeout(() => {
  playback.end()

  playback = playTune(melody2, Infinity)
}, 6000)

let havePlayedWinJingle = false;

setLegend(
  [ lemming_1, bitmap`
......444444......
......444444......
......664444......
......664444......
....66666644......
....66666644......
......5566........
......5566........
......6655........
......6655........
......5566........
......5566........
......5555........
......5555........
......555566......
......555566......
......6666........
......6666........` ],
  [ lemming_2, bitmap`
......444444......
......444444......
......664444......
......664444......
....66666644......
....66666644......
......5566........
......5566........
......555566......
......555566......
..66..555566......
..66..555566......
..66..5555........
..66..5555........
....66..5555......
....66..5555......
........6666......
........6666......` ],
  [ lemming_l_1, bitmap`
......444444......
......444444......
......444466......
......444466......
......44666666....
......44666666....
........6655......
........6655......
........5566......
........5566......
........6655......
........6655......
........5555......
........5555......
......665555......
......665555......
........6666......
........6666......` ],
  [ lemming_l_2, bitmap`
......444444......
......444444......
......444466......
......444466......
......44666666....
......44666666....
........6655......
........6655......
......665555......
......665555......
......665555..66..
......665555..66..
........5555..66..
........5555..66..
......5555..66....
......5555..66....
......6666........
......6666........` ],
  [ lemming_block_1, bitmap`
......444444......
......444444......
......444466......
......444466......
......44666666....
......44666666....
........6655......
66......6655....66
666666665555666666
666666665555666666
........5555......
........5555......
........5555......
........5555......
........6555......
........6556......
........6566......
........6666......` ],
  [ lemming_block_2, bitmap`
......444444......
......444444......
......664444......
......664444......
....66666644......
....66666644......
......5566........
66....5566......66
666666555566666666
666666555566666666
......5555........
......5555........
......5555........
......5555........
......5556........
......6556........
......6656........
......6666........` ],
  // PLACEHOLDER: Digger sprites (recolor of lemming - you'll replace these)
  [ lemming_dig_1, bitmap`
......444444......
......444444......
......664444......
......664444......
....66666644......
....66666644......
......7766........
......7766........
......6677........
......6677........
......7766........
......7766........
......7777........
......7777........
......777766......
......777766......
......6666........
......6666........` ],
  [ lemming_dig_2, bitmap`
......444444......
......444444......
......664444......
......664444......
....66666644......
....66666644......
......7766........
......7766........
......777766......
......777766......
..66..777766......
..66..777766......
..66..7777........
..66..7777........
....66..7777......
....66..7777......
........6666......
........6666......` ],
  // PLACEHOLDER: Builder sprites (recolor of lemming - you'll replace these)
  [ lemming_build_1, bitmap`
......444444......
......444444......
......664444......
......664444......
....66666644......
....66666644......
.....CCC66........
.....CCC66........
......1688........
......1688........
......1866........
......8866........
......8888........
......8888........
CC....8888......CC
CCCCCCCCCCCCCCCCCC
CC..CC6666..CC..CC
CCCCCCCCCCCCCCCCCC` ],
  [ lemming_build_2, bitmap`
......444444......
......444444......
......664444......
......664444......
....66666644......
....66666644......
....CC8866........
...CC18866........
...C..188866......
......818866......
......888866......
......888866......
......8888........
.......888........
CC......8888....CC
CCCCCCCCCCCCCCCCCC
CC..CC..6666CC..CC
CCCCCCCCCCCCCCCCCC` ],
  [ wall, bitmap`
CCCCCCCCCCCCCCCC
CCFCCCCCCCCCCCCC
CFFCCCCCCCCCCCCC
CFCCCCCCCCCCCCCC
FFCCCCCCCCCCCCCF
FCCCCFFCCCCCCCFF
CCCCFFCCCCCCCFFC
CCCCFCCCFFCCFFCC
CCCFFCCFFCCFFCCC
CCFFCCFFCCCCCCCC
CFFCCCFCCCCCCCCC
CFCCCCCCCCCCCCCC
FFCCCCCCCCCCCFFF
FCCCCCCCCCCCCFFF
CCCCCCCCCCCCFFFC
CCCCCCCCCCCCCCCC`],
  [ wall_grass, bitmap`
DDDDDDD4DDD4DDDD
DDDDDD4D4DD4CDDC
DD44DCD4CDCDDDDD
D4DDDD4DDD4CDDCD
4DCDCDC4D4CDD4D4
44D4D4F4CCDD44D4
C44CFFCCCCCC444C
CCCCFCCCFFCCFFCC
CCCFFCCFFCCFFCCC
CCFFCCFFCCCCCCCC
CFFCCCFCCCCCCCCC
CFCCCCCCCCCCCCCC
FFCCCCCCCCCCCFFF
FCCCCCCCCCCCCFFF
CCCCCCCCCCCCFFFC
CCCCCCCCCCCCCCCC`],
  // Selection marker - Blocker (blue border + faded blocker icon)
  [ selection_marker_block, bitmap`
.33333333333333.
3399999999999933
399..........993
39..22222222..93
39.22.......2.93
39.2.2......2.93
39.2..2.....2.93
39.2...2....2.93
39.2....2...2.93
39.2.....2..2.93
39.2......2.2.93
39.2.......22.93
39..22222222..93
399..........993
3399999999999933
.33333333333333.`],
  // Selection marker - Digger (brown border + faded digger icon)
  [ selection_marker_dig, bitmap`
.CCCCCCCCCCCCCC.
CCFFFFFFFFFFFCC.
CFF..........FFC
CF............FC
CF........2...FC
CFDDDD....DDDDFC
CFCCFC.444CCCCFC
CFCCCC4664CCFCFC
CFCCCC7777CCCCFC
CFCFCC6776CCCCFC
CFCCCC.66.FCCCFC
CFCCCCCCCCCCCCFC
CFCFCCCFCCFCCCFC
CFFCCCCCCCCCCFFC
CCFFFFFFFFFFFCC.
.CCCCCCCCCCCCCC.`],
  // Selection marker - Builder (gray border + faded builder icon)
  [ selection_marker_build, bitmap`
.11111111111111.
1177777777777711
177..........771
17......444...71
17......664...71
17......58....71
17......68....71
17.....266....71
17DDDDDDDD....71
17CCCCCCCC....71
17CCCCCCCC....71
17CCCCCCCC....71
17............71
177..........771
1177777777777711
.11111111111111.`],
  // Selection marker - Reset (green border + faded reset icon)
  [ selection_marker_reset, bitmap`
.44444444444444.
4466666666666644
466..........664
46...1.1111...64
46...11..211..64
46...11122211.64
46..22....221.64
46..1......21.64
46..12.....11.64
46..11....21..64
46...1112111..64
46....2111....64
46............64
466..........664
4466666666666644
.44444444444444.`],
  // Blocker selector (original)
  [selector_block, bitmap`
.33333333333333.
33............33
3.333333333333.3
3.33........33.3
3.3.33333333.3.3
3.3.33....33.3.3
3.3.3.3..3.3.3.3
3.3.3..33..3.3.3
3.3.3..33..3.3.3
3.3.3.3..3.3.3.3
3.3.33....33.3.3
3.3.33333333.3.3
3.33........33.3
3.333333333333.3
33............33
.33333333333333.`],
  // PLACEHOLDER: Digger selector (different color - you'll replace)
  [selector_dig, bitmap`
.77777777777777.
77............77
7.777777777777.7
7.77........77.7
7.7.77777777.7.7
7.7.77....77.7.7
7.7.7.7..7.7.7.7
7.7.7..77..7.7.7
7.7.7..77..7.7.7
7.7.7.7..7.7.7.7
7.7.77....77.7.7
7.7.77777777.7.7
7.77........77.7
7.777777777777.7
77............77
.77777777777777.`],
  // PLACEHOLDER: Builder selector (different color - you'll replace)
  [selector_build, bitmap`
.88888888888888.
88............88
8.888888888888.8
8.88........88.8
8.8.88888888.8.8
8.8.88....88.8.8
8.8.8.8..8.8.8.8
8.8.8..88..8.8.8
8.8.8..88..8.8.8
8.8.8.8..8.8.8.8
8.8.88....88.8.8
8.8.88888888.8.8
8.88........88.8
8.888888888888.8
88............88
.88888888888888.`],
  // Reset selector (green)
  [selector_reset, bitmap`
.44444444444444.
44............44
4.444444444444.4
4.44........44.4
4.4.44444444.4.4
4.4.44....44.4.4
4.4.4.4..4.4.4.4
4.4.4..44..4.4.4
4.4.4..44..4.4.4
4.4.4.4..4.4.4.4
4.4.44....44.4.4
4.4.44444444.4.4
4.44........44.4
4.444444444444.4
44............44
.44444444444444.`],
  [spawn_l, bitmap`
CCCCCCCCCCCCCCCC
CCCCDD4477777777
CCCCCDD477777777
CCCCCCDD47777775
CCCCCCCDDD777755
CCCCCCCCDD555555
CCCCCCCCCCCCCCCC
CCCCCCCCC.......
CCCCCCCC........
CCCCCCC.........
CCCCCCC.........
CCCCCC..........
CCCCC...........
CCCC............
CCC.............
CC..............`],
  [spawn_r, bitmap`
CCCCCCCCCCCCCCCC
777755555555CCCC
77555555555CCCCC
5555555555CCCCCC
555555555CCCCCCC
55555555CCCCCCCC
CCCCCCCCCCCCCCCC
.......CCCCCCCCC
........CCCCCCCC
.........CCCCCCC
.........CCCCCCC
..........CCCCCC
...........CCCCC
............CCCC
.............CCC
..............CC`],
  [exit, bitmap`
.............3..
.............391
...........LL63L
.........L1LLCCL
.......1LLLLLLCC
......11L1LL11CC
......1L11LLLLLC
....LLLL1LLLLL1L
....LL1LLLLLL1LL
....L111LLLL111L
..11L1LLLLL1LLLL
..1LL1LLLLL1LLLL
..1LLLL11LL1LLLL
..LL1111LLL1LLLL
..LL1L11L11LLL1L
.L1LLL1LLLLLLLLL`],
  [exit2, bitmap`
..3.............
193.............
L36LL...........
LCCLL1L.........
CCLLLLLL1.......
CC11LL1L11......
CLLLLL11L1......
L1LLLLL1LLLL....
LL1LLLLLL1LL....
L111LLLL111L....
LLLL1LLLLL1L11..
LLLL1LLLLL1LL1..
LLLL1LL11LLLL1..
LLLL1LLL1111LL..
L1LLL11L11L1LL..
LLLLLLLLL1LLL1L.
`],
  [bg, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [red_b, bitmap`
  3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333

`],

  [plants, bitmap`
CCCCCCCCCCCCCCCC
DCCD4C4044CD40CD
0D4040D000DD4D4D
0044D00D0DD440D0
000DDDDD00D4D040
00040D4D0004D000
00040DDDD004D000
0004DD4400040D40
000DD04400040000
000040D0000DD000
0000DDD00004D000
00000D000004D400
00004D000004D000
0000000000004000
0000000000000000
0000000000000000`],
  [dirt, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCC0CFCCC0CC
0FF0C0C000CCCCCC
00FCC00CCDFCCCFF
000CCDCC00FFCCF0
000CCC4C000CF000
000C0DCCF00CD0F0
000FFFCF000C0CC0
000DC0CF000F0000
00004CC0000CD000
0000DFF00004F000
00000D00000CC400
00004D00000CD000
0000000000004000
0000000000000000
0000000000000000`],

  [lava, bitmap`
6669966933333633
9966333666699633
3996699933666966
3339666933396696
6339936693993699
6933399669933663
6693333966999963
3966993333633966
3966699993363996
9333366399996339
6633336639366339
6663333669966333
3969933363996663
3366399966333366
6336699999663339
6333666393966666`]
)

setBackground(bg)

function draw_base() {
  let rows = [];
  for (let y = 0; y < 20; y++) {
  let row = "";
  for (let x = 0; x < 25; x++) {
    if (x === 0 || y === 0 || x === 24 || y === 19) {
      row += "#";     // wall
    } else {
      row += ".";     // floor
    }
  }
  rows.push(row)
}
  return rows;
}

// LEVEL DESIGN FUNCTION - CUSTOMIZE YOUR LEVELS HERE!
function draw_level(base, levelNum) {
  // Reset base to empty
  for (let i = 1; i < 19; i++) {
    base[i] = "#.......................#";
  }


  // Title
  if (levelNum === 0) {
    base[1] = "#************lllllllllll#"
    base[2] = "#............lllllllllll#"
    base[3] = "#..<>........lllllllllll#"
    base[4] = "#............lllllllllll#"
    base[5] = "#.%%%%%......ll..lll.lll#"
    base[6] = "#...#.#......l....l...ll#"
    base[7] = "#...#.#%%###...........l#"
    base[8] = "#...#.#.##%#............#"
    base[9] = "#...#.#.##%%............#"
    base[10] = "#.%.....................#"
    base[11] = "#.#......%..............#"
    base[12] = "#.#.###..#%%............#"
    base[13] = "#.#.#%#..###%...........#"
    base[14] = "#.#.#%%.%§§§*.%..##.%%%.#"
    base[15] = "#.#.§§§.#%%.%.#%.%%.#%%.#"
    base[16] = "#.#%%%..###.#.##.§#.%%#.#"
    base[17] = "#.§§§§..§§§.§.§§.%#.§§§.#"
    base[18] = "#................§§....e#"
  }
  
  // LEVEL 1
  else if (levelNum === 1) {
    base[1] = "#***********************#"
    base[3] = "#..<>...................#"
    base[7] = "#%%%%%%%%%%.............#"
    base[8] = "##########*.............#"
    base[9] = "#§§§§§§§§*..............#"

    base[12] = "#......%%%%%%%%%%lllllll#"
    base[13] = "#......*##########llllll#"
    base[14] = "#.......*################"
    base[15] = "#........*§§§§§§§§§§§§§§#"

    base[16] = "#%%.....................#"
    base[17] = "###%%%..................#"
    base[18] = "######%................e#"
  }

    // LEVEL 2
  else if (levelNum === 2) {
    base[1] = "#***********************#"
    base[3] = "#..<>...................#"
    base[6] = "#%%%%%%%................#"
    base[7] = "#########llllll#####....#"   
    base[8] = "####################....#" 
    base[9] = "#§§§§§§§§§§§§§§§§§§§....#" 
    base[11] = "#......%%%%%%%%%%%%%%%%%#"
    base[12] = "#......##################"
    base[13] = "#......*****************#"

    base[15] = "#%%%%%%%..............e%#"
    base[16] = "#########......%%%%%%%%##"
    base[17] = "#********......##########"
    base[17] = "#..............§§§§§§§§§#"
    base[18] = "#lllllllllllllllllllllll#"
  }
  
  // LEVEL 3
  else if (levelNum === 3) {
    base[1] = "#********################"
    base[2] = "#.......%################"
    base[3] = "#<>....%#################"
    base[4] = "#......##################"
    base[5] = "#%%%%%%##################"
    base[6] = "#########################"
    base[7] = "#########################"
    base[8] = "#########################"
    base[9] = "#########################"
    base[10] = "#########################"
    base[11] = "#########################"
    
    base[12] = "#########################"
    base[13] = "#########################"
    base[14] = "#########################"
    base[15] = "###.................#####"
    base[17] = "##########.............e#"
    base[18] = "###########ll############"
  }

  else if (levelNum === 4) {
    base[1] = "#<>*********************#"
    base[2] = "#.......................#"
    base[3] = "#.......................#"
    base[4] = "#%%%.................%..#"
    base[5] = "#####................#..#"
    base[6] = "######################..#"
    base[7] = "#llllllllllllllllllll#..#"
    base[8] = "######################..#"
    base[9] = "#§§§§§§§§§§§§§§§§§§§§§..#"
    base[10] = "#.......................#"
    base[11] = "#########################"
    base[12] = "###.................#####"
    base[16] = "#......................e#"
    base[17] = "##########............###"
    base[18] = "#########################"
  } else if (levelNum === 5) {
    base[1] = "#**********<>***********#"
    
    base[5] = "#....%%%%%%%%%%%%%%%....#"
    base[7] = "#%%%.......%%.......%%%%#"
    base[8] = "#####......##......######"
    base[9] = "#llllllll..ll..lllllllll#"
    base[10] = "#########..##..##########"
    base[11] = "#§§§§§§§§..§§..§§§§§§§§§#"
    base[12] = "###.................#####"
    base[17] = "#.........e%%h..........#"
    base[18] = "#%%%%%%%%%%##%%%%%%%%%%%#"
  } else if (levelNum === 6) {
    base[1] = "#llll*****************<>#"
    base[2] = "#llll...................#"
    base[3] = "#llll...................#"
    
    base[4] = "#llll%%%%%%%%%%%%%%%%%%%#"
    base[5] = "#llll################lll#"
    base[6] = "#llll####################"
    base[7] = "#llll#..................#"
    base[8] = "#llll#%%%%...........####"
    base[9] = "#llllllllllllllllllll#..#"
    base[10] = "#l####ll##############..#"
    base[11] = "##l####ll#############..#"
    base[12] = "#lllllllllllllllllll#####"
    base[13] = "####ll###################"
    base[14] = "#§§§ll§§§§§§§§§§§§§§§§§§#"
    base[15] = "#.lllll.................#"
    base[16] = "#llllll.................#"
    base[17] = "#llllllllll%%h..........#"
    base[18] = "#%%%%%%%%%%##%%%%%%%%%%%#"
  } else if (levelNum === 7) {
    base[1] = "#llll*****************<>#"
    base[2] = "#llll...................#"
    base[3] = "#llll...................#"
    base[4] = "#llll%%%%%%%%%%%%%%%%%%%#"
    base[5] = "#llllllll###llllllllllll#"
    base[6] = "####################llll#"
    base[7] = "#§§§§§§§§§§§§§§§§§§§llll#"
    base[8] = "#...................llll#"
    base[9] = "#...................llll#"
    base[10] = "#%%%%%%%%%%%%%%%%%%%llll#"
    base[11] = "#llllll####lllllllllllll#"
    base[12] = "#llll####################"
    base[13] = "#llll§§§§§§§§§§§§§§§§§§§#"
    base[14] = "#llll...................#"
    base[15] = "#llllll.................#"
    base[16] = "#llllll##################"
    base[17] = "#lllllllllllllllll#h....#"
    base[18] = "#########################"
  } else if (levelNum === 8) {
    base[1] = "#llll*****************<>#"
    base[2] = "#llll...................#"
    base[3] = "#llll...................#"
    base[4] = "#llll%%%%%%%%%%%%%%%%%%%#"
    base[5] = "#llllllll###llllllllllll#"
    base[6] = "####################llll#"
    base[7] = "#§§§§§§§§§§§§§§§§§§§llll#"
    base[8] = "#...................llll#"
    base[9] = "#...................llll#"
    base[10] = "#%%%%%%%%%%%%%%%%%%%llll#"
    base[11] = "#llllll####lllllllllllll#"
    base[12] = "#llll####################"
    base[13] = "#llll§§§§§§§§§§§§§§§§§§§#"
    base[14] = "#llll...................#"
    base[15] = "#llllll.................#"
    base[16] = "#llllll##################"
    base[17] = "#lllllllllllllllll#h....#"
    base[18] = "#########################"
  } else if (levelNum === 9) {
    base[1] = "#**********<>***********#"
    
    base[5] = "#..%%%%%%%%%%%%%%%%%%%..#"
    base[6] = "#..........lll..........#"
    base[7] = "#%%%.......##l%%%%%%%%%%#"
    base[8] = "#####......##l###########"
    base[9] = "#llllllll..##############"
    base[10] = "#########..##..##########"
    base[11] = "#§§§§§§§§..§§..§§§§§§§#ll"
    base[12] = "#.....................#ll"
    base[13] = "#....................#ll#"
    base[14] = "#.......%%%%%%%%%%%%%%ll#"
    base[15] = "#......#############llll#"
    base[16] = "#.llllllllllllllllllllll#"
    base[17] = "#.........e#llllllllllll#"
    base[18] = "#%%%%%%%%%%##############"
  }
  
  return base
}

// Initialize first level
function initLevel(levelNum) {

  havePlayedWinJingle = false;
  
  // Clear existing sprites
  clearTile(0, 0);
  
  // Reset game state
  lemmingsSpawned = 0;
  lemmingsSaved = 0;
  gameStarted = false;
  lemmings = [];
  placedSelectors = [];
  selectedAbility = 0;
  
  // Clear intervals if they exist
  if (spawnInterval) clearInterval(spawnInterval);
  if (movementInterval) clearInterval(movementInterval);
  if (abilityActionInterval) clearInterval(abilityActionInterval);
  
  // Load level map
  const level = map`${draw_level(draw_base(), currentLevel).join("\n")}`;
  setMap(level);
  
  // Add selection marker (blocker by default)
  addSprite(selection_loc[0], selection_loc[1], selection_marker_block);

  if (!gameStarted && levelNum === 0) {
    startLevel();
  } 

  if (currentLevel === 0) {
    addText("L: Start", { 
    x: 6,
    y: 15,
    color: color`7`
  });
  }
  
  // Display level info and controls
  displayUI();
}

// UI display function
function displayUI() {
  clearText();
  
  // Show tutorial controls only on level 1
  if (currentLevel === 1) {
    addText("WASD: Move", { 
      x: 9,
      y: 2,
      color: color`7`
    });
    addText("K: Ability", { 
      x: 9,
      y: 4,
      color: color`7`
    });
    addText("J: Place", { 
      x: 9,
      y: 6,
      color: color`7`
    });
    addText("L: Start", { 
      x: 9,
      y: 8,
      color: color`7`
    });
  } else if (currentLevel === 0) {
    // Title screen - show L: Start
    addText("L: Start", { 
      x: 6,
      y: 15,
      color: color`7`
    });
  } else {
    // Other levels - just show L: Start
    addText("L: Start", { 
      x: 6,
      y: 15,
      color: color`7`
    });
  }

  // Show level number (except on title screen)
  if (currentLevel !== 0) {
    addText(`Level ${currentLevel}`, { 
      x: 8,
      y: 0,
      color: color`7`
    });
  } 
  
  addText("0/0", { 
    x: 2,
    y: 0,
    color: color`2`
  });
}

// Load first level
initLevel(currentLevel);

let costumes = [
  [lemming_1, lemming_2],
  [lemming_l_1, lemming_l_2],
  [lemming_block_1, lemming_block_2],
  [lemming_dig_1, lemming_dig_2],
  [lemming_build_1, lemming_build_2],
];
let costumeState = 1;

setInterval(() => {
  if (costumeState === 1) {
  costumes.forEach((item) => {getAll(item[0]).forEach(e => e.type = item[1])});
    costumeState = 0;
  } else {
    costumes.forEach((item) => {getAll(item[1]).forEach(e => e.type = item[0])});
    costumeState = 1;
  }
}, 500)

// LEMMING AI FUNCTIONS

function isBlocked(x, y) {
  // Check if solid
  const tile = getTile(x, y);
  for (let sprite of tile) {
    if (sprite.type === wall || sprite.type === wall_grass || 
        sprite.type === lemming_block_1 || sprite.type === lemming_block_2) {
      return true;
    }
  }
  return false;
}

function isDiggable(x, y) {
  // Check if tile can be dug through
  const tile = getTile(x, y);
  for (let sprite of tile) {
    // Can dig through normal walls and grass, but NOT lava or border walls
    if (sprite.type === wall || sprite.type === wall_grass) {
      // Check if it's a border wall
      if (x === 0 || y === 0 || x === width() - 1 || y === height() - 1) {
        return false;
      }
      return true;
    }
    if (sprite.type === lava) {
      return false;
    }
  }
  return false;
}

function isLava(x, y) {
  const tile = getTile(x, y);
  for (let sprite of tile) {
    if (sprite.type === lava) {
      return true;
    }
  }
  return false;
}

function hasFloor(x, y) {
  // Oh, nooo.... some weird gravity?
  return isBlocked(x, y);
}

function removeTile(x, y) {
  // Remove wall/grass tiles at position
  const tiles = getTile(x, y);
  for (let sprite of tiles) {
    if (sprite.type === wall || sprite.type === wall_grass) {
      sprite.remove();
    }
  }
}

function spawnLemming() {
  const config = levelConfigs[currentLevel];
  if (lemmingsSpawned >= config.maxLemmings) return;
  
  // where to spawn
  const leftSpawns = getAll(spawn_l);
  const rightSpawns = getAll(spawn_r);
  
  if (leftSpawns.length === 0 && rightSpawns.length === 0) return;
  
  let spawnPoint;
  let direction;
  let spriteType;
  
  if (lemmingsSpawned % 2 === 0 && leftSpawns.length > 0) {
    spawnPoint = leftSpawns[0];
    direction = 1; // face right
    spriteType = lemming_l_1;
  } else if (rightSpawns.length > 0) {
    spawnPoint = rightSpawns[0];
    direction = -1; // face left
    spriteType = lemming_1;
  } else if (leftSpawns.length > 0) {
    spawnPoint = leftSpawns[0];
    direction = 1;
    spriteType = lemming_l_1;
  } else {
    return;
  }
  
  // Spawn below Spawn point
  const spawnY = spawnPoint.y + 1;
  addSprite(spawnPoint.x, spawnY, spriteType);
  
  // Track every lemming
  const lemmingId = lemmingsSpawned;
  lemmings.push({
    id: lemmingId,
    x: spawnPoint.x,
    y: spawnY,
    direction: direction, // 1 = right, -1 = left
    falling: false,
    alive: true,
    ability: null, // null, "blocker", "digger", "builder"
    actionCounter: 0 // For diggers and builders (max 12)
  });
  
  lemmingsSpawned++;
  updateCounter();
}

function checkForSelectors() {
  for (let i = placedSelectors.length - 1; i >= 0; i--) {
    const selectorData = placedSelectors[i];
    const selectorPos = selectorData.pos;
    const selectorType = selectorData.type;
    
    // Check for lemming
    for (let lemming of lemmings) {
      if (!lemming.alive) continue;

      if (selectorType === selector_reset) {
        if (lemming.ability === null) continue;
      } else {
        if (lemming.ability !== null) continue;
      }
      
      if (lemming.x === selectorPos.x && lemming.y === selectorPos.y && hasFloor(lemming.x, lemming.y + 1)) {
        // Assign ability based on selector type
        if (selectorType === selector_block) {
          lemming.ability = "blocker";
          
          // Change sprite to blocker
          const tilesAtPos = getTile(lemming.x, lemming.y);
          for (let s of tilesAtPos) {
            if (s.type === lemming_1 || s.type === lemming_2 || 
                s.type === lemming_l_1 || s.type === lemming_l_2) {
              s.type = lemming_block_1;
              break;
            }
          }
        } else if (selectorType === selector_dig) {
          lemming.ability = "digger";
          lemming.actionCounter = 0;
          
          // Change sprite to digger
          const tilesAtPos = getTile(lemming.x, lemming.y);
          for (let s of tilesAtPos) {
            if (s.type === lemming_1 || s.type === lemming_2 || 
                s.type === lemming_l_1 || s.type === lemming_l_2) {
              s.type = lemming_dig_1;
              break;
            }
          }
        } else if (selectorType === selector_build) {
          lemming.ability = "builder";
          lemming.actionCounter = 0;
          
          // Change sprite to builder
          const tilesAtPos = getTile(lemming.x, lemming.y);
          for (let s of tilesAtPos) {
            if (s.type === lemming_1 || s.type === lemming_2 || 
                s.type === lemming_l_1 || s.type === lemming_l_2) {
              s.type = lemming_build_1;
              break;
            }
          }
        } else if (selectorType === selector_reset) {
          // If reset selector, check if lemming already has an ability to reset
        // If reset selector, check if lemming already has an ability to reset
        if (selectorType === selector_reset) {
          const oldAbility = lemming.ability;
          lemming.ability = null;
          lemming.actionCounter = 0;
          
          // Convert sprite back to normal lemming based on direction
          const tilesAtPos = getTile(lemming.x, lemming.y);
          for (let s of tilesAtPos) {
            if (s.type === lemming_block_1 || s.type === lemming_block_2 ||
                s.type === lemming_dig_1 || s.type === lemming_dig_2 ||
                s.type === lemming_build_1 || s.type === lemming_build_2) {
              // Restore to normal based on direction
              if (lemming.direction === 1) {
                s.type = lemming_l_1;
              } else {
                s.type = lemming_1;
              }
              break;
            }
          }
          
          // Remove selector sprite AFTER resetting
          const selectorTiles = getTile(selectorPos.x, selectorPos.y);
          for (let s of selectorTiles) {
            if (s.type === selector_reset) {
              s.remove();
              break;
            }
          }
          
          // Remove selector from list
          placedSelectors.splice(i, 1);
          break;
        }
        
        // Remove selector sprite (for non-reset selectors)
        const selectorTiles = getTile(selectorPos.x, selectorPos.y);
        }
        
        // Remove selector sprite
        const selectorTiles = getTile(selectorPos.x, selectorPos.y);
        for (let s of selectorTiles) {
          if (s.type === selector_block || s.type === selector_dig || s.type === selector_build) {
            s.remove();
            break;
          }
        }
        
        // Remove selector from list
        placedSelectors.splice(i, 1);
        break;
      }
    }
  }
}

function updateCounter() {
  clearText();
  addText(`${lemmingsSaved}/${lemmingsSpawned}`, { 
    x: 2,
    y: 0,
    color: color`2`
  });
  
  // Re-add "L: Start" on title screen
  if (currentLevel === 0 && gameStarted) {
    addText("L: Start", { 
      x: 6,
      y: 15,
      color: color`7`
    });
  }
}

function moveLemmings() {
  // First: check for any selector interactions
  checkForSelectors();
  
  const config = levelConfigs[currentLevel];
  
  // Process each tracked lemming
  for (let i = lemmings.length - 1; i >= 0; i--) {
    const lemmingState = lemmings[i];
    if (!lemmingState.alive) continue;
    
    // Find the sprite at this lemming's position
    const tilesAtPos = getTile(lemmingState.x, lemmingState.y);
    let sprite = null;
    
    for (let s of tilesAtPos) {
      if (s.type === lemming_1 || s.type === lemming_2 || 
          s.type === lemming_l_1 || s.type === lemming_l_2 ||
          s.type === lemming_block_1 || s.type === lemming_block_2 ||
          s.type === lemming_dig_1 || s.type === lemming_dig_2 ||
          s.type === lemming_build_1 || s.type === lemming_build_2 || s.type === exit) {
        sprite = s;
        break;
      }
    }
    
    // If sprite doesn't exist, lemming is dead :(
    if (!sprite) {
      lemmingState.alive = false;
      lemmings.splice(i, 1);
      continue;
    }
    
    // Check for lava
    if (isLava(sprite.x, sprite.y)) {
      sprite.remove();
      lemmingState.alive = false;
      lemmings.splice(i, 1);
      continue;
    }
    
    // BLOCKER BEHAVIOR - just stand still
    if (lemmingState.ability === "blocker") {
      continue;
    }
    
    // DIGGER AND BUILDER skip normal movement (handled in separate interval)
    if (lemmingState.ability === "digger" || lemmingState.ability === "builder") {
      continue;
    }
    
    // NORMAL LEMMING BEHAVIOR (no special ability)
    
    // GRAVITY
    const groundBelow = sprite.y + 1;
    if (groundBelow < height() && !hasFloor(sprite.x, groundBelow)) {
      // Fall down one tile
      sprite.y = groundBelow;
      lemmingState.y = groundBelow;
      lemmingState.falling = true;
      continue; // Skip horizontal movement (while falling)
    } else {
      lemmingState.falling = false;
    }
    
    // HORIZONTAL MOVEMENT
    const nextX = sprite.x + lemmingState.direction;
    
    // boundaries
    if (nextX <= 0 || nextX >= width() - 1) {
      // Turn at edges
      lemmingState.direction *= -1;
      // Flip sprite
      if (lemmingState.direction === 1) {
        // Now moving right, use right-facing sprite
        if (sprite.type === lemming_1) sprite.type = lemming_l_1;
        else if (sprite.type === lemming_2) sprite.type = lemming_l_2;
      } else {
        // Now moving left, use left-facing sprite
        if (sprite.type === lemming_l_1) sprite.type = lemming_1;
        else if (sprite.type === lemming_l_2) sprite.type = lemming_2;
      }
      continue;
    }
    
    // Check if blocked ahead at same level (including blocker lemmings)
    if (isBlocked(nextX, sprite.y)) {
      // Turn around when hitting wall or blocker
      lemmingState.direction *= -1;
      // Flip sprite direction
      if (lemmingState.direction === 1) {
        // Now moving right, use right-facing sprite
        if (sprite.type === lemming_1) sprite.type = lemming_l_1;
        else if (sprite.type === lemming_2) sprite.type = lemming_l_2;
      } else {
        // Now moving left, use left-facing sprite
        if (sprite.type === lemming_l_1) sprite.type = lemming_1;
        else if (sprite.type === lemming_l_2) sprite.type = lemming_2;
      }
      continue;
    }
    
    // Check if there's ground below the next position
    if (!hasFloor(nextX, sprite.y + 1)) {
      // There's a cliff - walk forward and will fall next frame
      sprite.x = nextX;
      lemmingState.x = nextX;
    } else {
      // Normal walk forward
      sprite.x = nextX;
      lemmingState.x = nextX;
    }
    
    // Check if reached the goal
    const tilesAtExit = getTile(sprite.x, sprite.y);
    let reachedExit = false;
    for (let s of tilesAtExit) {
      if (s.type === exit || s.type === exit2) {
        reachedExit = true;
        break;
      }
    }

    if (reachedExit) {
      sprite.remove();
      lemmingState.alive = false;
      lemmings.splice(i, 1);
      lemmingsSaved++;
      updateCounter();
      
      // Check win condition
      if (lemmingsSpawned >= config.maxLemmings && lemmingsSaved >= config.targetSaved) {
        // Level complete!

        //temp removed: blackscreen on target met
        /*
        const blackScreen = [];
        for (let y = 0; y < 20; y++) {
          blackScreen.push("'''''''''''''''''''''''''"); // 25 bg characters
        }
        setMap(blackScreen.join("\n"));
        */
        clearText();
        addText("Stage Clear!", { 
          x: 5,
          y: 4,
          color: color`7`
        });
        addText(`${lemmingsSaved}/${lemmingsSpawned}`, { 
          x: 8,
          y: 6,
          color: color`5`
        });
        
        // Check if there are more levels
        if (currentLevel < levelConfigs.length - 1) {
          addText("Press L for next", { 
            x: 2,
            y: 10,
            color: color`6`
          });

          if (!havePlayedWinJingle) {

            havePlayedWinJingle = true;

            playback.end()
            playTune(winJingle, 1)

            setTimeout(() => {
              playback = playTune(melody2, Infinity)
            }, 4000)
          }
        } else {
          addText("All levels done!", { 
            x: 3,
            y: 12,
            color: color`6`
          });
          addText("Thanks for playing!", { 
            x: 1,
            y: 10,
            color: color`9`
          });

          if (!havePlayedWinJingle) {

            havePlayedWinJingle = true;

            playback.end()
            playTune(allWinJingle, 1)

            setTimeout(() => {
              playback = playTune(melody1, Infinity)
            }, 9000)
          }
        }
      }
    }
  }
}

// Separate function for digger and builder actions (runs slower)
function updateAbilityActions() {
  const config = levelConfigs[currentLevel];
  
  for (let i = lemmings.length - 1; i >= 0; i--) {
    const lemmingState = lemmings[i];
    if (!lemmingState.alive) continue;
    
    // Find the sprite
    const tilesAtPos = getTile(lemmingState.x, lemmingState.y);
    let sprite = null;
    
    for (let s of tilesAtPos) {
      if (s.type === lemming_dig_1 || s.type === lemming_dig_2 ||
          s.type === lemming_build_1 || s.type === lemming_build_2) {
        sprite = s;
        break;
      }
    }
    
    if (!sprite) continue;
    
    // DIGGER BEHAVIOR
    if (lemmingState.ability === "digger") {
      // Check if reached dig limit
      if (lemmingState.actionCounter >= 12) {
        // Stop digging, become normal lemming
        lemmingState.ability = null;
        if (sprite.type === lemming_dig_1) sprite.type = lemming_1;
        else if (sprite.type === lemming_dig_2) sprite.type = lemming_2;
        continue;
      }
      
      const belowY = sprite.y + 1;
      
      // Check if can dig below
      if (belowY < height() && isDiggable(sprite.x, belowY)) {
        // Dig the tile below
        removeTile(sprite.x, belowY);
        lemmingState.actionCounter++;
        
        // Move down
        sprite.y = belowY;
        lemmingState.y = belowY;
      } else {
        // Can't dig anymore (hit bedrock or lava), revert to normal
        lemmingState.ability = null;
        if (sprite.type === lemming_dig_1) sprite.type = lemming_1;
        else if (sprite.type === lemming_dig_2) sprite.type = lemming_2;
      }
      continue;
    }
    
    // BUILDER BEHAVIOR
    if (lemmingState.ability === "builder") {
      // Check if reached build limit
      if (lemmingState.actionCounter >= 12) {
        // Stop building, become normal lemming
        lemmingState.ability = null;
        if (lemmingState.direction === 1) {
          sprite.type = lemming_l_1;
        } else {
          sprite.type = lemming_1;
        }
        continue;
      }
      
      const nextX = sprite.x + lemmingState.direction;
      const currentY = sprite.y;
      
      // Check if next position is valid and not blocked
      if (nextX > 0 && nextX < width() - 1 && !isBlocked(nextX, currentY)) {
        // Place a grass block at current position
        addSprite(sprite.x, sprite.y, wall_grass);
        lemmingState.actionCounter++;
        
        // Move forward and up
        sprite.x = nextX;
        sprite.y = currentY;
        lemmingState.x = nextX;
        lemmingState.y = currentY;
      } else {
        // Can't build (blocked or edge), revert to normal
        lemmingState.ability = null;
        if (lemmingState.direction === 1) {
          sprite.type = lemming_l_1;
        } else {
          sprite.type = lemming_1;
        }
      }
      continue;
    }
  }
}

// Start game
function startLevel() {
  if (gameStarted) return;
  
  const config = levelConfigs[currentLevel];
  gameStarted = true;
  
  clearText();
  addText("Game Started!", { 
    x: 5,
    y: 8,
    color: color`4`
  });
  
  setTimeout(() => {
    clearText();
    updateCounter();
  }, 1000);
  
  // Start spawning lemmings
  spawnInterval = setInterval(() => {
    if (!gameStarted) return;
    spawnLemming();
    if (lemmingsSpawned >= config.maxLemmings) {
      clearInterval(spawnInterval);
    }
  }, config.spawnDelay);
  
  // Update lemming movement (normal lemmings)
  movementInterval = setInterval(() => {
    if (!gameStarted) return;
    moveLemmings();
  }, config.moveSpeed);
  
  // Update ability actions (diggers and builders - slower)
  abilityActionInterval = setInterval(() => {
    if (!gameStarted) return;
    updateAbilityActions();
  }, 800); // Slower than normal movement (800ms vs 400ms)
}

onInput("d", () => {
  //one tile to the right
  const markers = [
    ...getAll(selection_marker_block),
    ...getAll(selection_marker_dig),
    ...getAll(selection_marker_build),
    ...getAll(selection_marker_reset)
  ];
  if (markers.length > 0) markers[0].x += 1;
})
onInput("a", () => {
  //one tile to the left
  const markers = [
    ...getAll(selection_marker_block),
    ...getAll(selection_marker_dig),
    ...getAll(selection_marker_build),
    ...getAll(selection_marker_reset)
  ];
  if (markers.length > 0) markers[0].x -= 1;
})
onInput("w", () => {
  //one tile up
  if (!editing) {
    const markers = [
      ...getAll(selection_marker_block),
      ...getAll(selection_marker_dig),
      ...getAll(selection_marker_build),
      ...getAll(selection_marker_reset)
    ];
    if (markers.length > 0) markers[0].y -= 1;
  }
})
onInput("s", () => {
  //one tile down
  if (!editing) {
    const markers = [
      ...getAll(selection_marker_block),
      ...getAll(selection_marker_dig),
      ...getAll(selection_marker_build),
      ...getAll(selection_marker_reset)
    ];
    if (markers.length > 0) markers[0].y += 1;
  }
})

//interaction (not needed in this implementation, will still leave it, why not)
onInput("i", () => {
  editing = !editing;
})

// Cycle through abilities
onInput("k", () => {
  selectedAbility = (selectedAbility + 1) % 4;
  
  // Update the selection marker sprite to match selected ability
const markerSprites = [selection_marker_block, selection_marker_dig, selection_marker_build, selection_marker_reset];
const allMarkers = [
  ...getAll(selection_marker_block),
  ...getAll(selection_marker_dig),
  ...getAll(selection_marker_build),
  ...getAll(selection_marker_reset)
];
  
  if (allMarkers.length > 0) {
    const currentMarker = allMarkers[0];
    const markerX = currentMarker.x;
    const markerY = currentMarker.y;
    
    // Remove old marker
    currentMarker.remove();
    
    // Add new marker with correct style
    addSprite(markerX, markerY, markerSprites[selectedAbility]);
  }
  
  // Update UI to show selected ability
  if (!gameStarted) {
    displayUI();
  } else {
    // During game, just update the ability text
    clearText();
    addText(`${abilityNames[selectedAbility]}`, { 
      x: 1,
      y: 11,
      color: color`6`
    });
    updateCounter();
  }
})

// Place selector
onInput("j", () => {
  if (!gameStarted) return;
  
  const markers = [
    ...getAll(selection_marker_block),
    ...getAll(selection_marker_dig),
    ...getAll(selection_marker_build),
    ...getAll(selection_marker_reset)
  ];
  const marker = markers.length > 0 ? markers[0] : null;
  if (!marker) return;
  
  // Check if there's already a selector here
  const tilesHere = getTile(marker.x, marker.y);
  let hasSelector = false;
  for (let s of tilesHere) {
    if (s.type === selector_block || s.type === selector_dig || s.type === selector_build || s.type === selector_reset) {
      hasSelector = true;
      break;
    }
  }
  
  if (!hasSelector) {
    // Place the selected ability selector
    const selectorType = abilitySelectors[selectedAbility];
    addSprite(marker.x, marker.y, selectorType);
    placedSelectors.push({
      pos: {x: marker.x, y: marker.y},
      type: selectorType
    });
  }
})

// Start game / Next level
onInput("l", () => {
  const config = levelConfigs[currentLevel];
  
  // On title screen, go to level 1
  if (currentLevel === 0) {
    currentLevel++;
    initLevel(currentLevel);
    return;
  }
  
  // If game not started, start it
  if (!gameStarted) {
    startLevel();
  } 
  // If level is complete, go to next level
  else if (lemmingsSpawned >= config.maxLemmings && lemmingsSaved >= config.targetSaved) {
    if (currentLevel < levelConfigs.length - 1) {
      currentLevel++;
      initLevel(currentLevel);
    }
  } else {
    // Restart current level
    initLevel(currentLevel);
  }
})