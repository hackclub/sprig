/*
@title: Orb Dungeon
@description: Orb Dungeon is an adventure game where players navigate a dungeon using powers from collected orbs. Each orb grants a unique ability like destroying objects or becoming invisible that helps pass obstacles like rocks, lava, and enemies. There are 3 possible endings that are hinted to by the lore books.
@author: Dimitris Toulis
@tags: ['adventure']
@addedOn: 2024-08-15
*/
/*

**There are 3 possible endings: Normal, Greed and Happy**

There is also lore and hidden messages! Try to find them!

## Controls
- Move with WASD
- Restart with double K 
- Cycle through orbs with J and L  
- Use selected orb with I (if it has an active effect)

## Orbs

Passive effects are enabled when holding the orb and active effects are used by pressing I

List of orbs in order of collection:
- Destruction orb: Use it to destroy all destructible objects around you  
- Water orb: Turns lava into obsidian, allowing you to pass over it. Use it to create water
- Invisibility orb: Enemies can't see you
- Transform orb: Turns you into a plant that does not trigger traps
- Ghost orb: Pass through normal (grey) walls, crates and rocks  
- Fire orb: Turns water into smoke that disappears afterwards  
- Electric orb: Use it to activate machines adjacent you. It will also kill you instantly in water if held!
- Ultimate orb: Makes you immortal. Use it to win the game?

## Special tiles
- Lava: Kills you if you step on it
- Regenerating lava: Turns back to lava after 4 "moves" (all buttons count) if turned into obsidian
- Water: Breathing mechanic (4 points of breath). Breath is deducted for moving in water. Getting out restores your breath
- Enemy: Kills you if they see you on a neighboring tile (diagonals also)
- Trap: Kills players (but not plants)
- Smoke: Disappears after 2 moves. Produced when removing water with the fire orb and by gate machines
- Machines: Activate them using the electric orb
  - Gate machine: Destroys gates and turns into smoke
  - Water machine: Kills you by mixing water and electricity
  - Plant machine: Spawns a plant on top of you
- Arrow (black): Suggests a direction to go to
- Arrow (red): Enforces a direction to go to
- Altar: ???

*/

const player = "p"
const wall = "w"
const hard_wall = "h"
const rocks = "r"
const crate = "c"
const orb_destruction = "1"
const orb_ghost = "2"
const orb_fire = "3"
const orb_water = "4"
const orb_invisibility = "5"
const orb_electric = "6"
const orb_transform = "7"
const orb_ultimate = "8"
const orb_names = ["Destruction", "Ghost", "Fire", "Water", "Invisibility", "Electric", "Transformation", "Ultimate"]
const lava = "l"
const regen_lava = "e"
const obsidian = "o"
const enemy = "s"
const trap = "t"
const water = "a"
const smoke = "m"
const plant = "n"
const machine_water = "b"
const machine_plant = "d"
const gate = "g"
const machine_gate = "f"
const no = "j"
const arrow_right = "k"
const arrow_left = "q"
const arrow_up = "v"
const arrow_right_enforcing = "u"
const arrow_left_enforcing = "x"
const confetti1 = "A"
const confetti2 = "B"
const confetti3 = "C"
const confetti4 = "D"
const confetti5 = "E"
const confetti6 = "F"
const message_background = "G"
const book = "H"
const altar = "I"

const sprites = [
  [wall, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [hard_wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0L000000000000L0
0LLLLLLLLLLLLLL0
0000000000000000`],
  [rocks, bitmap`
................
...000..........
...000.....LLLL.
...000000..LLLLL
...000000..LLLLL
...000000...LLL.
..00000000......
..00000000......
............111.
...........1111.
..........11111.
..LLLLL...11111.
..LLLLL..111111.
..LLLLL..111111.
..LLLL......1111
..LLL...........`],
  [crate, bitmap`
0CCCCCCCCCCCCCC0
C00000000000000C
C0C0C0C00C0C0C0C
C0C0C0C00C0C0C0C
C0C0C0C00C0C0C0C
C0C0C0C00C0C0C0C
C0C0C0C00C0C0C0C
C0C0C0C00C0C0C0C
C0C0C0C00C0C0C0C
C0C0C0C00C0C0C0C
C0C0C0C00C0C0C0C
C0C0C0C00C0C0C0C
C0C0C0C00C0C0C0C
C0C0C0C00C0C0C0C
C00000000000000C
0CCCCCCCCCCCCCC0`],
  [orb_destruction, bitmap`
................
....99999999....
...9999999999...
..999CCCCCC999..
.9993CCCCCC3999.
.99CC3CCCC3CC99.
.99CCC3CC3CCC99.
.99CCCC99CCCC99.
.99CCCC99CCCC99.
.99CCC3CC3CCC99.
.99CC3CCCC3CC99.
.9993CCCCCC3999.
..999CCCCCC999..
...9999999999...
....99999999....
................`],
  [orb_ghost, bitmap`
................
....88888888....
...8888888888...
..888LLLLLL888..
.8889LLLLLL9888.
.88LL9LLLL9LL88.
.88LLL9LL9LLL88.
.88LLLLHHLLLL88.
.88LLLLHHLLLL88.
.88LLL9LL9LLL88.
.88LL9LLLL9LL88.
.8889LLLLLL9888.
..888LLLLLL888..
...8888888888...
....88888888....
................`],
  [orb_fire, bitmap`
................
....33333333....
...3333333333...
..333999999333..
.33369999996333.
.33996999969933.
.33999699699933.
.339999FF999933.
.339999FF999933.
.33999699699933.
.33996999969933.
.33369999996333.
..333999999333..
...3333333333...
....33333333....
................`],
  [orb_water, bitmap`
................
....77777777....
...7777777777...
..777555555777..
.77745555554777.
.77554555545577.
.77555455455577.
.77555577555577.
.77555577555577.
.77555455455577.
.77554555545577.
.77745555554777.
..777555555777..
...7777777777...
....77777777....
................`],
  [orb_invisibility, bitmap`
................
....11111111....
...1111111111...
..111......111..
.111L......L111.
.11..L....L..11.
.11...L..L...11.
.11....88....11.
.11....88....11.
.11...L..L...11.
.11..L....L..11.
.111L......L111.
..111......111..
...1111111111...
....11111111....
................`],
  [orb_electric, bitmap`
.6.6........6.6.
..6.77777777.6..
.6.7777777777.6.
..777666666777..
.77726666662777.
.77662666626677.
.77666266266677.
.77666633666677.
.77666633666677.
.77666266266677.
.77662666626677.
.77726666662777.
..777666666777..
.6.7777777777.6.
..6.77777777.6..
.6.6........6.6.`],
  [orb_transform, bitmap`
................
....HHHHHHHH....
...HHHHHHHHHH...
..HHH333333HHH..
.HHH83333338HHH.
.HH3383333833HH.
.HH3338338333HH.
.HH3333HH3333HH.
.HH3333HH3333HH.
.HH3338338333HH.
.HH3383333833HH.
.HHH83333338HHH.
..HHH333333HHH..
...HHHHHHHHHH...
....HHHHHHHH....
................`],
  [orb_ultimate, bitmap`
................
....LLLLLLLL....
...LL97365DLL...
..LL197365DHLL..
.LL7197365DH4LL.
.LC7197365DH48L.
.LC7197365DH48L.
.LC7197365DH48L.
.LC7197365DH48L.
.LC7197365DH48L.
.LC7197365DH48L.
.LL7197365DH4LL.
..LL197365DHLL..
...LL97365DLL...
....LLLLLLLL....
................`],
  [lava, bitmap`
9999999999999999
9933339933999999
9333333933933333
9333333999933333
9333333999939999
9333333999999999
9933339993333339
9999999993333339
9999999999999999
9999999333399999
9999993333339999
9339993333339999
3339993333339999
3339993333339999
3333999333399999
9999999999999999`],
  [regen_lava, bitmap`
9999999999999999
9933339933999999
9339333933933333
9339333999933333
9339993999939999
9333333999999999
9933339993333339
9999999993333339
9999999999999999
9999999333399999
9999993339339999
9339993339339999
3339993999339999
3339993333339999
3333999333399999
9999999999999999`],
  [obsidian, bitmap`
0000000000000000
0000000000000000
000H00000H000000
00H00000H0000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000H0000000H000
000H0000000H0000
0000000000000000
0000000000000000
0000000000000000
000000H000000H00
00000H000000H000
0000000000000000`],
  [enemy, bitmap`
......99..33.99.
.......99.33.9..
.....LL00000LLL.
LL...L3.....3.L.
LHL..L........L.
LH6L.L..444...L.
.L6L.LLLLLLLLLL.
..LL...99...99..
....L..9...999..
.....L999..9.9..
.....99.99.9.99.
.....9...9....9.
................
................
................
................` ],
  [trap, bitmap`
6......1.......6
.6......1.....6.
.......1........
........1.......
.......1........
........1.......
.......1........
.......33.......
.......33.......
........1.......
.......1........
........1.......
.......1........
........1.......
.6.....1......6.
6.......1......6` ],
  [water, bitmap`
7777777777777777
7777777777777777
7775577777777777
7557777777777777
7777777777777777
7777777777777557
7777775577755777
7777557777777777
7777777777777777
7777777777777777
7777777777777777
7777755777777777
7775577777777777
7777777777775577
7777777777557777
7777777777777777`],
  [smoke, bitmap`
................
................
.........LL.....
....11...LL.....
....11..........
................
.........11.....
.........11.....
....LL..........
....LL..........
............11..
............11..
.11......LL.....
.11......LL.....
................
................`],
  [plant, bitmap`
................
................
.............33.
.........3...33.
......3..344.4..
.HH...4.....4...
..4..4......4...
..4..4......4...
...44......4....
...4.......4....
...4.......D....
...D......DD....
...DD....D..D...
....D...........
................
................` ],
  [machine_water, bitmap`
0..............0
.00000000000000.
.03333333333330.
.0............0.
.0..77..77..770.
.077..77..77..0.
.0............0.
.0..77..77..770.
.077..77..77..0.
.0............0.
.0..77..77..770.
.077..77..77..0.
.0............0.
.03333333333330.
.00000000000000.
0..............0`],
  [machine_plant, bitmap`
0..............0
.00000000000000.
.04444444444440.
.0............0.
.0......3..3..0.
.0......4.4...0.
.0.3..3.44....0.
.0.4.4...4....0.
.04.44...44...0.
.0.44.....D...0.
.0..D....D....0.
.0..D...D.....0.
.0............0.
.04444444444440.
.00000000000000.
0..............0`],
  [machine_gate, bitmap`
0000000000000000
0777777777777770
0..............0
0.L.L.L..L.L.L.0
0.L.L.L..L.L.L.0
0.L.L.L..L.L.L.0
0.L.L.L..L.L.L.0
0.L.L.L..L.L.L.0
0.L.L.L..L.L.L.0
0.L.L.L..L.L.L.0
0.L.L.L..L.L.L.0
0.L.L.L..L.L.L.0
0.L.L.L..L.L.L.0
0..............0
0777777777777770
0000000000000000`],
  [gate, bitmap`
L.L.L.L..L.L.L.L
L.L.L.L..L.L.L.L
L.L.L.L..L.L.L.L
L.L.L.L..L.L.L.L
L.L.L.L..L.L.L.L
L.L.L.L..L.L.L.L
L.L.L.L..L.L.L.L
L.L.L.L..L.L.L.L
L.L.L.L..L.L.L.L
L.L.L.L..L.L.L.L
L.L.L.L..L.L.L.L
L.L.L.L..L.L.L.L
L.L.L.L..L.L.L.L
L.L.L.L..L.L.L.L
L.L.L.L..L.L.L.L
L.L.L.L..L.L.L.L`],
  [no, bitmap`
................
................
................
................
................
.0....0...0000..
.00...0..00..00.
.0.0..0..0....0.
.0..0.0..0....0.
.0...00..00..00.
.0....0...0000..
................
................
................
................
................` ],
  [arrow_right, bitmap`
................
................
................
..........00....
..........000...
..........0000..
..........00000.
0000000000000000
0000000000000000
..........00000.
..........0000..
..........000...
..........00....
................
................
................` ],
  [arrow_left, bitmap`
................
................
................
....00..........
...000..........
..0000..........
.00000..........
0000000000000000
0000000000000000
.00000..........
..0000..........
...000..........
....00..........
................
................
................`],
  [arrow_up, bitmap`
.......00.......
......0000......
.....000000.....
....00000000....
...0000000000...
...0000000000...
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......`],
  [arrow_right_enforcing, bitmap`
................
................
................
..........33....
..........333...
..........3333..
..........33333.
3333333333333333
3333333333333333
..........33333.
..........3333..
..........333...
..........33....
................
................
................` ],
  [arrow_left_enforcing, bitmap`
................
................
................
....33..........
...333..........
..3333..........
.33333..........
3333333333333333
3333333333333333
.33333..........
..3333..........
...333..........
....33..........
................
................
................`],
  [confetti1, bitmap`
..6.............
......3....7....
4..7..........4.
.......9..4.....
..6.3........H..
................
........7..6..3.
.C.4..3..6......
.............4..
......8...H.....
..7...........6.
......6.3...9...
6...3..........C
..4....8........
....7....4.6....
.3...........7..`],
  [confetti2, bitmap`
.3...........7..
....7....4.6....
..4....8........
6...3..........C
......6.3...9...
..7...........6.
......8...H.....
.............4..
.C.4..3..6......
........7..6..3.
................
..6.3........H..
.......9..4.....
4..7..........4.
......3....7....
..6.............`],
  [confetti3, bitmap`
..4.........6...
.......C.......3
6...6.....7..4..
..7....4........
....3.......3.7.
................
.3.....3.8.6....
...9.........8..
......7....3....
.......6......4.
...4.....H......
.7....6.......6.
...........9....
....H...4......7
..4...3...6.....
............C...`],
  [confetti4, bitmap`
..6.............
......3....7....
4..7..........4.
.......9..4.....
..6.3........H..
................
........7..6..3.
.C.4..3..6......
.............4..
......8...H.....
..7...........6.
......6.3...9...
6...3..........C
..4....8........
....7....4.6....
.3...........7..`],
  [confetti5, bitmap`
.3...........7..
....7....4.4....
..6....6........
7...3..........C
......4.3...9...
..7...........7.
......7...H.....
.............4..
.C.7..3..4......
........6..6..3.
................
..6.3........H..
.......9..4.....
4..7..........4.
......3....6....
..7.............`],
  [confetti6, bitmap`
............7...
..4...3...3.....
....H...4......7
...........9....
.6....6.......4.
...4.....H......
.......4......4.
......6....3....
...9.........6..
.7.....8.3.4....
................
....8.......3.8.
..3....3........
8...6.....7..6..
.......C.......3
..4.........3...`],
  [message_background, bitmap`
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
3333333333333333`],
  [book, bitmap`
................
...CCCCCCCCCC...
...C1111CCCCC...
...CCCC11111C...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...C1111CCCCC...
...CCCC11111C...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...C1111CCCCC...
...CCCC11111C...
...CCCCCCCCCC...
................`],
  [altar, bitmap`
00............00
0LLLLLLLLLLLLLL0
.L222222222222L.
.L232222222232L.
.L223222222322L.
.L222322223222L.
.L222232232222L.
.L222226622222L.
.L222226622222L.
.L222232232222L.
.L222322223222L.
.L223222222322L.
.L232222222232L.
.L222222222222L.
0LLLLLLLLLLLLLL0
00............00`]
]
const playerBitmap = bitmap`
................
................
..000000000000..
..011111111110..
..015111111510..
..011155551110..
..011111111110..
..000000000000..
.......00.......
.....5.00.5.....
......5005......
.......00.......
......D00D......
.....DD..DD.....
.....D....D.....
................`
const playerBitmaps = {
  1: bitmap`
................
.C11........11C.
.10000000000001.
.10111111111101.
..015111111510..
..011155551110..
..011111111110..
..000000000000..
.......00.......
.....C.00.C.....
......C00C......
.......00.......
......D00D......
.....DD..DD.....
.....D....D.....
................`,
  2: bitmap`
................
....11111111....
..111......111..
..1..........1..
.11..........11.
.1..LL....LL..1.
.1..LL....LL..1.
.1............1.
.1............1.
.1............1.
.1............1.
.1............1.
.1............1.
.1............1.
.1............1.
................`,
  3: bitmap`
................
.399........993.
.93333333333339.
.93111111111139.
..015111111510..
..011155551110..
..011111111110..
..000000000000..
.......00.......
.....9.00.9.....
......9009......
.......00.......
......3003......
.....33..33.....
.....3....3.....
................`,
  4: bitmap`
................
.577........775.
.70000000000007.
.70111111111107.
..015111111510..
..011155551110..
..011111111110..
..000000000000..
.......00.......
.....7.00.7.....
......7007......
.......00.......
......7007......
.....77..77.....
.....7....7.....
................`,
  5: bitmap`
................
................
..111111111111..
..1..........1..
..1.7......7.1..
..1...7777...1..
..1..........1..
..111111111111..
.......11.......
.....7.11.7.....
......7117......
.......11.......
......1111......
.....11..11.....
.....1....1.....
................`,
  6: bitmap`
................
.166........661.
.60000000000006.
.60111111111106.
..016111111610..
..011166661110..
..011111111110..
..000000000000..
.......00.......
.....5.00.5.....
......5005......
.......00.......
......6006......
.....66..66.....
.....6....6.....
................`,
  7: bitmap`
................
................
.............55.
.........5...55.
......5..544.4..
.88...4.....4...
..4..4......4...
..4..4......4...
...44......4....
...4.......4....
...4.......D....
...D......DD....
...DD....D..D...
....D...........
................
................`,
  8: bitmap`
...6666666666...
..63547DH98C16..
..666666666666..
..011111111110..
..015111111510..
..011155551110..
..011111111110..
..000000000000..
.......00.......
.....5.00.5.....
......5005......
.......00.......
......D00D......
.....DD..DD.....
.....D....D.....
................`,
  9: bitmap`
................
................
..000000000000..
..011111111110..
..015111111510..
..011151151110..
..011115511110..
..000000000000..
.......00.......
.....5.00.5.....
......5005......
.......00.......
......D00D......
.....DD..DD.....
.....D....D.....
................`
}
setLegend(
  [player, playerBitmap],
  ...sprites
)

// Map and movement
const destructibles = [rocks, crate, plant]

const start_map = map`
.......................................................................
.......................................................................
....hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh...
....h........w.......wwwwwwwwww....t.eeee.t.eeeeeeee.t...w.........h...
....h........wwwwwwwwwr......nw.w..wwwwwwwwwwwwwwwwwwwww.w.hhhhhhh.h...
....h................rr.........wwweeer..t.....waaaaaaaw.w..aaaaah.h...
....h........wwww.wwwwr.......w....oeerr.t..s.2wanaaanaw.w.haaaaah.h...
....h........w..w.w..wwwcwrw.www.ww.eerr.t.....waaaaaaaw.w.haaaaah.h...
....h........w.ww.ww...w.wcw.w.w.w.wwwwwwwwwwwwwwwwwwnawnw.haaaaah.h...
....hwwwwwwwww.w...w...w.w.w.w.w.c.........w..ll....waaw.w.haaaaah.h...
....h..........w.1.w...w.w.w.w.w.w..wwwwww.w...ll...wwww.w.haaaaah.h...
....hhhhhhhhhh.w...w...wlw.w.www.w..ww...w.w.c..ls.se..w.w.haaaaah.h...
....haaaaaaaah.wwwww.wwwlw.w.w3w.wn.w.ww.w.w.s..ls.se..t.w.hhh.hhh.h...
....haaaaaaaah.......wlllw.w.wwwwwwww.ww.w.ww.rsls..e.7w.w...h.h...h...
....hahhhaaaah.......wllww.ww........nw..w...e..ll.reo.www...hch...h...
....hah8haaaah.......wllw...ww.wwwwwwwwccw.s.ewcsl..wwww..hhhh6h...h...
....hah.....sh......wwllw......w.....Hw..w....w..l..w...hhh.g..h...h...
....hahnhghh.h..wwwww...w..nwwww..w...w..wwwwwwwwwwww.hhh...f.jh...h...
....hahjhf.h.h..w.......wn..........wwn..r4r..w......hh.....g.ah...h...
....hahlh..h.h..w...rr..w...wwwwwwrw.wwwwwww..w......hwwwwwwwhhh...h...
....hahlh..h.h..w...5r..w.....rw..w..w.....w..w......heeeeeeeh.....h...
....hahlh..h.h..w.......w...wr......w......w..w.......heeeeeh......h...
....hahlh..h.h..wwwwwwwwwwwwwwwwwww.wwwwwwwwccwhhhhhhhheeeeehhhhhhhh...
....hahlh..h.h....................w..oooooo..cw.......hh...hh......h...
....hahlhaah.h....................wwwwwwwwwwwww........hrrrh.......h...
....hahlhashhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh...h.......h...
....hahlhash........g..b....j...kk.....s..eeee...g...t.....h.....H.h...
....hahlhaah........f.ewhhhhhhhhhhhhhhhhhhhhhhh..f..btd..s.h.......h...
....hahlhaah.....n.ng.ew........xnaaaaaaaaa.c....g...t.....h.......h...
....hahlh..h.ccc.n.nf.ew.hhhhhhhhhhhhhhwhhhbhahhhwhhhhhhhhhh.....v.h...
....hahlh..h.csc.n.ng.ew.h.g...x.lll..hlhlhhh..lh.h........u....aaah...
....hahlh..h.ccc.n.nf.ew...f...x.l8l..h.hl...s.lhjh....I..jj....a8ah...
....hahlh..h........g.ew.h.g...x.lll..h.hlllllllh.h........u....aaah...
....hahlh..h.....n.nf.ew.hhhhhhhhhhhhhh.hhhhhhhhh.hhhhhhhhhhhhhhoooh...
....hahlh..h........g.ew..aaaa.......g..dgeeek...nhhh.h.h.h.g.t.lllh...
....hahlh..hwhhhhhhhhhhhhhhhhh....s..f...feeehhhhhhhhshshsh.f.t.lslh...
....hahlhh...u...c...........q.......g.b.geees.....k......H.g.t.lllh...
....hahlshhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh.hhhhhhhhhhhhhhhhhh...
....hanluaaaaaaaaaaaaa...H..t..eeeeeeeeeeeeeee....raaaaaaaaaaaq.h......
....hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh......
.......................................................................
.......................................................................
.......................................................................`
let rowMap = start_map.trim().split("\n")

const playerPos = { x: 8, y: 5 }
const localPlayerPos = { x: 4, y: 3 }
let move = { x: 0, y: 0 }

function redrawMap() {
  const { x, y } = playerPos
  const currentMap = rowMap.slice(y - 3, y + 5).map(row => row.slice(x - 4, x + 6))
  setMap(currentMap.join("\n"))
  addSprite(localPlayerPos.x, localPlayerPos.y, player)
}
function editMap(x, y, sprite) {
  rowMap[y] = rowMap[y].substring(0, x) + sprite + rowMap[y].substring(x + 1)
}
function tileIs(tile, sprite) {
  return tile.some(s => s.type == sprite)
}

const ghostSolids = [hard_wall, enemy, machine_water, machine_plant, machine_gate, gate]
const solids = [...ghostSolids, wall, rocks, crate]
function moveOrCollide(movementX, movementY) {
  const nextTile = getTile(localPlayerPos.x + movementX, localPlayerPos.y + movementY)
  if (
    nextTile.some((sprite) => (collectedOrbs[selectedOrb] == 2 ? ghostSolids : solids).includes(sprite.type))
  ) return
  
  // Enforcing arrow functionality
  if (tileIs(nextTile, arrow_right_enforcing) && movementX == -1) {
    return
  }
  if (tileIs(nextTile, arrow_left_enforcing) && movementY == +1) {
    return
  }
    
  else {
    playerPos.x += movementX
    playerPos.y += movementY
    move = { x: movementX, y: movementY }
  }
}

// Orbs
const orbMessages = [
  [" The earth trembles", "", "  with your power!"],
  ["    Ghostly power", "  has been granted", "       to you"],
  ["     You feel...", "", "        Fiery"],
  ["       Splash", "", "       Sploosh"],
  ["   Where are you?"],
  [" Electricity flows", "", "    through you!"],
  ["        WHAT?", "", "    I'm a plant?"],
  ["", "Is this true POWER??", "", "      Gwc apitt", "    jm kwzzcxbml!"],
  ["", "", "   So much POWER!!", "", "", "     Erfvfg gur", "     pbeehcgvba!"]
]
let collectedOrbs = []
let selectedOrb = null;
function selectOrb(orb) {
  selectedOrb = orb
  statusText()
  setLegend([player, playerBitmaps[collectedOrbs[orb]]], ...sprites)
}

const machines = [{
  name: machine_water, action: (x, y) => {
    editMap(playerPos.x, playerPos.y, water)
    die("Electricity")
  }
}, {
  name: machine_plant, action: (x, y) => {
    editMap(playerPos.x, playerPos.y, plant)
  }
}, {
  name: machine_gate, action: (x, y) => {
    editMap(x, y, smoke)
    editMap(x, y + 1, ".")
    editMap(x, y - 1, ".")
    timers.push({ x, y, remaining: 3, after: "." })
  }
}]
function useOrb(orb) {
  switch (orb) {
    case 1:
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          const sprites = getTile(localPlayerPos.x + x, localPlayerPos.y + y)
          if (sprites.length == 1 && destructibles.includes(sprites[0]._type)) {
            editMap(playerPos.x + x, playerPos.y + y, ".")
          }
        }
      }
      break;
    case 4:
      editMap(playerPos.x, playerPos.y, water)
      break;
    case 6:
      const offsets = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }]
      offsets.forEach(({ x, y }) => {
        const tile = getTile(localPlayerPos.x + x, localPlayerPos.y + y)
        const machine = machines.find((m) => (m.name == (tile.at(0) ?? {})._type))
        if (machine) machine.action(playerPos.x + x, playerPos.y + y)
      })
      break;
    case 8:
      win(false)
      break;
  }
}

// Books
const books = [
  { x: 37, y: 16, message: ["   Why do you seek", "        power?"], time: 2000 },
  { x: 25, y: 38, message: ["   What brings you", "   to these depths?"], time: 2000 },
  { x: 58, y: 36, message: [" Have you come here", "     for POWER?", "", " Are you sure this", " is your true goal?", "  Do not let greed", "    consume you", "", "Cbjre pbeehcgf.", "", "Or pnershy"], time: 7000 },
  { x: 65, y: 26, message: ["    Have you been", "    corrupted by", "      the ORB?", "", "    Or were you", " corrupted anyways?", "", "      Aikzqnqkm", "     gwcz xwemz!"], time: 7000 }
]


function statusText() {
  clearText()
  if (selectedOrb != null) addText(orb_names[collectedOrbs[selectedOrb] - 1] + " Orb", {
    x: 0,
    y: 0,
    color: color`3`
  })
  if (breath < 5 && collectedOrbs[selectedOrb] != 8) addText("Breath: " + "O".repeat(breath), { x: 0, y: 2, color: color`5` })
}
function message(text, time) {
  clearText()
  freezed = true
  setMap(map`
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG`)
  text.forEach((t, i) => addText(t, { x: 0, color: color`5`, y: 5 - Math.floor(text.length / 2) + i + 1 }))
  setTimeout(() => {
    redrawMap()
    statusText()
    freezed = false
  }, time)
}


function die(cause) {
  redrawMap()
  if (collectedOrbs[selectedOrb] == 8) return
  addText("You died", { y: 4, x: 8, color: color`3` })
  addText("From: " + cause, { y: 5, x: 0, color: color`5` })
  freezed = true
}
let winInterval = null
function win(real) {
  if (collectedOrbs.length == 9) {
    clearText()
    freezed = true
    setMap(map`
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG
GGGGGGGGGG`)
    addText("You died", { y: 5, x: 6, color: color`5` })
    addText("From: Greed", { y: 8, x: 5, color: color`5` })
    return
  }
  const winMap = map`
..p..
.....
BCADE
DFBFA`
  const winMaps = [winMap]
  let mapI = 0
  for (let i = 1; i < 6; i++) {
    winMaps[i] = winMaps[i - 1].replace(/[ABCDEF]/g, m => {
      let nextC = m.charCodeAt(0) + 1
      if (nextC == 71) nextC = 65
      return String.fromCharCode(nextC)
    })
  }
  clearText()
  setMap(winMaps[0])
  freezed = true
  if (!real) {
    addText("You won?", { x: 0, y: 1, color: color`6` })
    addText("You won?", { x: 12, y: 1, color: color`6` })
    addText("Is this what ", { x: 5, y: 5, color: color`5` })
    addText("you wanted?", { x: 5, y: 6, color: color`5` })
  } else {
    addText("You won!", { x: 0, y: 1, color: color`6` })
    addText("You won!", { x: 12, y: 1, color: color`6` })
    addText("Thank you for", { x: 4, y: 5, color: color`5` })
    addText("playing!", { x: 7, y: 6, color: color`5` })
  }
  winInterval = setInterval(() => {
    setMap(winMaps[mapI])
    mapI = (mapI + 1) % 6;
  }, 100)
}
function restartGame() {
  rowMap = start_map.trim().split("\n")
  collectedOrbs = []
  selectedOrb = null;
  playerPos.x = 8; playerPos.y = 5;
  clearText()
  freezed = false
  kcount = 0
  timers = []
  breath = 5
  clearInterval(winInterval)
  setLegend([player, playerBitmap], ...sprites)
  setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........`)
  redrawMap()
}

// Input
let freezed = false, kcount = 0
onInput("s", () => {
  if (freezed) return;
  moveOrCollide(0, 1)
})
onInput("w", () => {
  if (freezed) return;
  moveOrCollide(0, -1)
})
onInput("a", () => {
  if (freezed) return;
  moveOrCollide(-1, 0)
})
onInput("d", () => {
  if (freezed) return;
  moveOrCollide(1, 0)
})
onInput("k", () => {
  if (kcount == 1 || freezed) restartGame()
  kcount = 2
})
onInput("i", () => {
  if (freezed || collectedOrbs.length == 0) return;
  useOrb(collectedOrbs[selectedOrb])
})
onInput("l", () => {
  if (freezed || collectedOrbs.length == 0) return;
  selectOrb((selectedOrb + 1) % collectedOrbs.length)
})
onInput("j", () => {
  if (freezed || collectedOrbs.length == 0) return;
  selectOrb((selectedOrb - 1 + collectedOrbs.length) % collectedOrbs.length)
})

let timers = []
let breath = 5
afterInput(() => {
  if (freezed) return;
  if (kcount > 0) kcount--;
  let nextTile = getTile(localPlayerPos.x + move.x, localPlayerPos.y + move.y)
  let nextPos = {x: localPlayerPos.x + move.x, y: localPlayerPos.y + move.y}
  move = {x: 0, y: 0}

  //Proccess timers
  timers = timers.filter(timer => {
    timer.remaining--;
    if (timer.remaining == 0) {
      editMap(timer.x, timer.y, timer.after)
      if(playerPos.x == timer.x && playerPos.y == timer.y) nextTile = [{type: timer.after, x: nextTile.x, y: nextTile.y}]
      return false
    }
    return true
  })

  //Collect orb
  const orb = nextTile.find(sprite => parseInt(sprite.type) <= 8)
  if (orb) {
    collectedOrbs.push(parseInt(orb.type))
    editMap(playerPos.x, playerPos.y, ".")

    selectOrb(collectedOrbs.length - 1)
    if (collectedOrbs.length == 9) {
      message(orbMessages[8], 2000)
    } else {
      message(orbMessages[orb.type - 1], 1700)
    }
    return
  }

  //Display book
  const isBook = tileIs(nextTile, book)
  if (isBook) {
    const book = books.find(({ x, y }) => x == playerPos.x && y == playerPos.y)
    message(book.message, book.time)
    return;
  }

  // Lava functionality
  let isRegenLava = tileIs(nextTile, regen_lava);
  let isLava = tileIs(nextTile, lava) || isRegenLava;

  if (isLava && collectedOrbs[selectedOrb] == 4) {
    editMap(playerPos.x, playerPos.y, obsidian)
    if (isRegenLava) timers.push({ x: playerPos.x, y: playerPos.y, remaining: 4, after: regen_lava })
  }
  else if (isLava) {
    die("Lava")
    return
  }

  // Die from enemies
  if (collectedOrbs[selectedOrb] != 5) {
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        const tile = getTile(nextPos.x + x, nextPos.y + y)
        if (tileIs(tile, enemy)) {
          die("Enemy")
          return
        }
      }
    }
  }

  // Die from traps
  const isTrap = tileIs(nextTile, trap)
  if (isTrap && collectedOrbs[selectedOrb] != 7) {
    die("Player trap")
    return
  }

  // Burn plants
  const isPlant = tileIs(nextTile, plant);
  if (isPlant && collectedOrbs[selectedOrb] == 3) {
    editMap(playerPos.x, playerPos.y, smoke)
    timers.push({ x: playerPos.x, y: playerPos.y, remaining: 2, after: "." })
  }

  // Water and breathing functionality
  let inWater = tileIs(nextTile, water);
  if (inWater && collectedOrbs[selectedOrb] == 3) {
    editMap(playerPos.x, playerPos.y, smoke)
    timers.push({ x: playerPos.x, y: playerPos.y, remaining: 2, after: "." })
  }
  else if (inWater && collectedOrbs[selectedOrb] == 6) {
    die("Electricity")
    return
  }
  else if (inWater && collectedOrbs[selectedOrb] != 8) {
    breath--;
    statusText()
  }
  else if (breath < 5) {
    breath = 5
    statusText()
  }
  if (breath == 0) {
    die("Suffocation")
    return
  }

  // Altar
  if (tileIs(nextTile, altar)) {
    message(["      The altar", "", "      destroys", "", "      all power"], 2000)
    editMap(playerPos.x, playerPos.y, ".")
    collectedOrbs = []
    selectedOrb = null
    setLegend([player, playerBitmaps[9]], ...sprites)
    setTimeout(() => {
      win(true)
    }, 3000)
    return
  }

  redrawMap()
})


restartGame()
