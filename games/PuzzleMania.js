/*
@title: PuzzleMania
@author: Johamez_Wilzoney
@tags: ["puzzle"]
@addedOn: 2025-02-18
*/

const player = "p"
const coin = "c"
const brick = "b"
const switches = "s"
const obstacle = "o"
const portal = "m"
const portall = "n"
const portalll = "v"
const portallll = "z"
const portalllll = "x"
const portallllll = "q"
const portalllllll = "e"
const one = "1"
const two = "2"
const three = "3"
const four = "4"
const five = "5"
const six = "6"
const fakebrick = "y"
const secretportal = "f"
const key = "u"
const lock = "t"
let hasKey = false
let lockOpen = false
const melody = tune`
208.33333333333334: G4~208.33333333333334 + A4~208.33333333333334,
208.33333333333334: B4~208.33333333333334 + C5~208.33333333333334 + D5~208.33333333333334,
208.33333333333334: D5~208.33333333333334 + E5~208.33333333333334 + F5~208.33333333333334,
208.33333333333334: D5~208.33333333333334 + C5~208.33333333333334 + B4~208.33333333333334 + A4~208.33333333333334 + G4~208.33333333333334,
208.33333333333334: F4~208.33333333333334 + E4~208.33333333333334,
208.33333333333334: E4~208.33333333333334,
208.33333333333334: E4/208.33333333333334 + F4^208.33333333333334,
208.33333333333334: E4-208.33333333333334,
208.33333333333334: E4/208.33333333333334 + F4^208.33333333333334,
208.33333333333334: E4-208.33333333333334,
208.33333333333334,
208.33333333333334: D4~208.33333333333334 + E4~208.33333333333334,
208.33333333333334: F4~208.33333333333334 + G4~208.33333333333334 + A4~208.33333333333334,
208.33333333333334: B4~208.33333333333334 + C5~208.33333333333334,
208.33333333333334: A4~208.33333333333334 + G4~208.33333333333334 + F4~208.33333333333334 + E4~208.33333333333334,
208.33333333333334: C4~208.33333333333334 + D4~208.33333333333334,
208.33333333333334: C4~208.33333333333334,
208.33333333333334,
208.33333333333334: C4/208.33333333333334 + D4^208.33333333333334,
208.33333333333334: C4-208.33333333333334,
208.33333333333334: C4/208.33333333333334 + D4^208.33333333333334,
208.33333333333334: C4-208.33333333333334,
208.33333333333334,
208.33333333333334: D4~208.33333333333334 + E4~208.33333333333334,
208.33333333333334: F4~208.33333333333334 + G4~208.33333333333334 + A4~208.33333333333334,
208.33333333333334: B4~208.33333333333334 + C5~208.33333333333334,
208.33333333333334: A4~208.33333333333334 + G4~208.33333333333334 + F4~208.33333333333334 + E4~208.33333333333334,
208.33333333333334: D4~208.33333333333334 + C4~208.33333333333334,
208.33333333333334: C4~208.33333333333334,
208.33333333333334: C4~208.33333333333334,
208.33333333333334: C4~208.33333333333334,
208.33333333333334: C4~208.33333333333334`
const playback = playTune(melody, Infinity)
const B1 = "B"
const B2 = "C"
const B3 = "X"
const B4 = "Z"
const B5 = "V"
const lock2 = "N"
const key2 = "M"
let hasKey2 = false



setLegend(
  [player, bitmap`
................
................
................
................
.....88888......
....8888888.....
....8888888.....
...880888888....
...888888088....
..88888888888...
..88888888888...
..88088888088...
..H8800000888...
.HHHH880088888..
HHHHHH888888888.
HHHHHHHH88888888`],
  [coin, bitmap`
................
....00000000....
...0066666220...
..066666666220..
.00666602666220.
.06666602666620.
.06666600666620.
.06666600666660.
.06666600666660.
.0F666600666660.
.0FF66600666660.
.00F66600666600.
..0FFF66666660..
...00F6666600...
....00000000....
................`],
  [brick, bitmap`
LLLLLLLLLLLLLLLL
111111L111111111
111111L111111111
111111L111111111
LLLLLLLLLLLLLLLL
1L111111111L1111
1L111111111L1111
1L111111111L1111
LLLLLLLLLLLLLLLL
11111L11111111L1
11111L11111111L1
11111L11111111L1
LLLLLLLLLLLLLLLL
1L11111111L11111
1L11111111L11111
1L11111111L11111`],
  [fakebrick, bitmap`
LLLLLLLLLLLL02LL
111111L11111111L
111211L11111111L
111111L11111111L
LLL20LLLLL2L0LLL
1L111111111L1111
1L111111111L1111
1L111111111L1111
LLLL2LLLLLLLLL20
11111011111111L1
11111L11111111L1
10111L11111111L1
LLLLLLLLLLLLLLLL
1L11102111L11211
1L11111111L11111
1L11111111L11111`],
  [switches, bitmap`
................
......3333......
......3333......
......3333......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
3330000000001444
333LLLLLLLLLL444
000LLLLLLLLLLLL1
0000000000000000`],
  [obstacle, bitmap`
................
......0000......
.....0LLL10.....
....0LLLL110....
....0LLLLL10....
...0LLLLLLL10...
..0LLLLLLLL110..
..0LLLLLLLLLL0..
..0LLLLLLLLLL0..
.0LLLLLLLLLLLL0.
.0LLLLLLLLLLLL0.
.00LLLLLLLLLLL0.
.00LLLLLLLLLLL0.
00000LLLLLLLLLL0
00000LLLLLLLLLL0
0000000000000000`],
  [portal, bitmap`
................
.....577777.....
....55777775....
....57722277....
...5572222275...
...5572222275...
...5572222275...
...5572222275...
...5572222275...
...5572222275...
...5572222275...
...5572222275...
....55722275....
....55777775....
.....555555.....
................`],
  [portall, bitmap`
................
.....C99999.....
....CC99999C....
....C9922299....
...CC9222229C...
...CC9222229C...
...CC9222229C...
...CC9222229C...
...CC9222229C...
...CC9222229C...
...CC9222229C...
...CC9222229C...
....CC92229C....
....CC99999C....
.....CCCCCC.....
................`],
  [portalll, bitmap`
................
.....D44444.....
....DD44444D....
....D4422244....
...DD4222224D...
...DD4222224D...
...DD4222224D...
...DD4222224D...
...DD4222224D...
...DD4222224D...
...DD4222224D...
...DD4222224D...
....DD42224D....
....DD44444D....
.....DDDDDD.....
................`],
  [portallll, bitmap`
................
.....H88888.....
....HH88888H....
....H8822288....
...HH8222228H...
...HH8222228H...
...HH8222228H...
...HH8222228H...
...HH8222228H...
...HH8222228H...
...HH8222228H...
...HH8222228H...
....HH82228H....
....HH88888H....
.....HHHHHH.....
................`],
  [portalllll, bitmap`
................
.....F66666.....
....FF66666F....
....F6622266....
...FF6222226F...
...FF6222226F...
...FF6222226F...
...FF6222226F...
...FF6222226F...
...FF6222226F...
...FF6222226F...
....F6222226F...
....FF62226F....
....FF66666F....
.....FFFFFF.....
................`],
  [portallllll, bitmap`
................
.....0LLLLL.....
....00L111L0....
....0L122211....
...00L2222210...
...00L2222210...
...00L2222210...
...00L2222210...
...00L2222210...
...00L2222210...
...00L2222210...
....0L2222210...
....00122210....
....00111110....
.....000000.....
................`],
  [portalllllll, bitmap`
................
.....566888.....
....55611189....
....56622288....
...5562222289...
...5562222289...
...5562222249...
...5562222249...
...5562222249...
...5562222249...
...5562222249...
....562222249...
....59422249....
....55944449....
.....599999.....
................`],
  [secretportal, bitmap`
LLLLLLLLLLLLLLLL
15511HH111111111
111111L1115551H1
111111L113311H11
55LL33LL55LLLLLL
1L11HH11113L1111
1L11111H111LHH11
1L1133H1111L1111
L3L55LLLLLLLLLLL
11H11L11HH1551L1
1111HL33111111L1
11111L11111331L1
L33LLLLLLLLLLLHH
1L11155511L11111
1HHHH11111L11351
1L11131111L11311`],
  [one, bitmap`
................
................
......0000......
......0LL0......
......0LL0......
......0LL0......
......0LL0......
......0LL0......
......0LL0......
......0LL0......
......0LL0......
......0LL0......
......0LL0......
......0000......
................
................`],
  [two, bitmap`
................
..000000000000..
..0LLLLLLLLLL0..
..0000000000L0..
.........00LL0..
........00LL00..
.......00LL0....
......00LL0.....
.....00LL0......
....00LL0.......
...00LL0........
...0LL0.........
...0L00000000...
...0LLLLLLLL0...
...0000000000...
................`],
  [three, bitmap`
................
...000000000000.
...0LLLLLLLLLL0.
...0000000000L0.
............0L0.
............0L0.
...0000000000L0.
...0LLLLLLLLLL0.
...0000000000L0.
............0L0.
............0L0.
...0000000000L0.
...0LLLLLLLLLL0.
...000000000000.
................
................`],
  [four, bitmap`
................
................
..000....000....
..0L0....0L0....
..0L0....0L0....
..0L0....0L0....
..0L000000L0....
..0LLLLLLLL0....
..00000000L0....
.........0L0....
.........0L0....
.........0L0....
.........0L0....
.........000....
................
................`],
  [five, bitmap`
................
..000000000000..
..0LLLLLLLLLL0..
..0L0000000000..
..0L0...........
..0L0...........
..0L0000000000..
..0LLLLLLLLLL0..
..0000000000L0..
...........0L0..
...........0L0..
...........0L0..
..0000000000L0..
..0LLLLLLLLLL0..
..000000000000..
................`],
  [six, bitmap`
................
..000000000000..
..0LLLLLLLLLL0..
..0L0000000000..
..0L0...........
..0L0...........
..0L0...........
..0L0000000000..
..0LLLLLLLLLL0..
..0L00000000L0..
..0L0......0L0..
..0L0......0L0..
..0L00000000L0..
..0LLLLLLLLLL0..
..000000000000..
................`],
  [key, bitmap`
................
................
................
................
................
.000000.........
.06666000000000.
.06..6666666660.
.06..6666666660.
.06666000606060.
.000000.0606060.
........0000000.
................
................
................
................`],
  [lock, bitmap`
....00000000....
....06666660....
....06000060....
....060..060....
....060..060....
.00000000000000.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.01111111111110.
.00000000000000.`],
  [B1, bitmap`
....00000000....
...0056688800...
...0556111890...
..005662228800..
..055622222890..
..055622222890..
..055622222490..
..055622222490..
..055622222490..
..055622222490..
..055622222490..
..005622222490..
...05942224900..
...0559444490...
...0059999900...
....00000000....`],
  [B2, bitmap`
....00000000....
...00F6666600...
...0FF66666F0...
..00F662226600..
..0FF6222226F0..
..0FF6222226F0..
..0FF6222226F0..
..0FF6222226F0..
..0FF6222226F0..
..0FF6222226F0..
..0FF6222226F0..
..00F6222226F0..
...0FF62226F00..
...0FF66666F0...
...00FFFFFF00...
....00000000....`],
  [B3, bitmap`
....00000000....
...00H8888800...
...0HH88888H0...
..00H882228800..
..0HH8222228H0..
..0HH8222228H0..
..0HH8222228H0..
..0HH8222228H0..
..0HH8222228H0..
..0HH8222228H0..
..0HH8222228H0..
..0HH8222228H0..
..00HH82228H00..
...0HH88888H0...
...00HHHHHH00...
....00000000....`],
  [B4, bitmap`
....00000000....
...00C9999900...
...0CC99999C0...
..00C992229900..
..0CC9222229C0..
..0CC9222229C0..
..0CC9222229C0..
..0CC9222229C0..
..0CC9222229C0..
..0CC9222229C0..
..0CC9222229C0..
..0CC9222229C0..
..00CC92229C00..
...0CC99999C0...
...00CCCCCC00...
....00000000....`],
  [B5, bitmap`
....00000000....
...0057777700...
...0557777750...
..005772227700..
..055722222750..
..055722222750..
..055722222750..
..055722222750..
..055722222750..
..055722222750..
..055722222750..
..055722222750..
..005572227500..
...0557777750...
...0055555500...
....00000000....`],
  [key2, bitmap`
................
................
................
................
................
.000000.........
.05555000000000.
.05..5555555550.
.05..5555555550.
.05555000505050.
.000000.0505050.
........0000000.
................
................
................
................`],
  [lock2, bitmap`
....00000000....
....05555550....
....05000050....
....050..050....
....050..050....
.00000000000000.
.01111111111110.
.01111555551110.
.01111111151110.
.01111111151110.
.01111555551110.
.01111511111110.
.01111511111110.
.01111555551110.
.01111111111110.
.00000000000000.`],
)

setSolids([player, brick, obstacle])


let level = 9
const levels = [
  map`
pbbsbvnzxqbbbb
.bb.bfebbbb..m
.bb.bbub.bb.bb
.bb.bbbb.bb...
.bb.bbbb.bbbb.
.bb.....obbbb.
.bbbbbbb...bb.
.......o...bbb`, //level 1
  map`
pbbbbb.bbb.bem
.bbbfb..s..bbv
.yyyyb.bbb.buz
.bbbbb.bbb.bbx
.bbbbb.bbb.bbq
.b.bbbobbbobbb
..o..o.....bbn
b..bbbbbbb.bbb`, // level 2
  map`
pb.bbb.bbbbbbm
.b.s.b...bbbbn
.b.b.bob.bbbfz
.b.b.b.b.bbbux
.b.b.b.b.bbbqe
.bobob.b.bbbbb
........o..bbv
bbbb.bbb.bbbbb`, // level 3
  map`
po...b......be
bbb.bb..bbb.bm
xbb.bb.b..o.bn
qb..bb.b..o.bv
fb.bbb.b.boobu
bbo..b.b.bbbbb
bb.bo.obo..bbz
bbbb...b.sbbbb`, // level 4
  map`
bbbb.........b
m..o.bbbbb.o.s
bobbbfuxezbb.b
b.bpbbbbbbbbob
b.b.o........n
b.bbbbbbbbbbbb
b..........bbq
bvbbbbbbbbbbbb`, // level 5
  map`
po..bbbbbbbbbf
bbobbbbbbbbbbm
...bb....bbbbn
ob.bb.bb.bbbbv
.bbbb.bb.bbbbz
.bbbb.oo.bbbbu
..bbb.oxobbbbq
......oo.bbbbe`, // level 6
  map`
p..........1eb
bbbbbbbb...2mb
bbbbbbbb...3vb
bbbbbbbb...4nb
bbbbbbbb...5zb
bbbbbbbt...6qb
bbbbbbbbbbbbbb
bbbbbbbbbsfuxb`, // level select (no bonus)
  map`
...........1eb
bbbbbbbb...2mb
bB1....b...3vb
bC2....b...4nb
bX3....b...5zb
bZ4....p...6qb
bV5....bbbbbbb
bbbbbbbbbbusfx`, // level select (with bonus)
  map`
p.oooooooooooo
o.o..........o
ooooooooooo.oo
oooooooooooooo
ooooooooooo.oo
ooooooooooo..o
ooooooooooo..o
feqxmnvzsoo..u`, // secret level
  map`
p.............
..............
......s.......
..............
..............
...........bbb
bbbbbbbbb..bbe
mnvzxqfub..bbb`, // tutorial
  map`
p.o..........s
bbbbbbb.bbb.b.
..o.....bbb...
b.bbbbbbbbbbbb
..bbb...bbbbbb
.o........bbbb
bbbbbbbb..o.bx
mnvzqebbbbbbbb`, // Bonus level 1
  map`
po.......b.Nbs
bbbbbbb.bb.bbb
Myyyyyy....bbb
bbbbbbbbbbobbb
bbbbbbbbbb.bbb
ubbbbbbbbb..bb
bbbbbbbbbb.bbb
mnvzqefbbbb..x`, // Bonus level 2
  map`
po...........x
bbybbbbbbbbb.b
bb.o..........
bbbbbbbbbbbbbb
bbbbbbbbbbbbbb
bbbbbbbbbbbbbb
bbbbbbbbbbbbbb
mnvzuqefsbbbbb`, // Bonus level 3
  map`
pso...........
bbbbbbbbbobbbb
bbbbbbbbb.bbbb
bbbbbbbbb.bbbb
bbbbbbbbb.bbbb
bbbbbbbbb.yyyb
xbbbbbbbb.bbxb
mnvzuqefbbbbbb`, // Bonus level 4
  map`
p.............
bbbbbbbbbbbbb.
..............
sbbbbbbbbbbbbb
..............
ybbbbbbbbbbbb.
ybbbbbbbbbVbb.
xbmnvzqefubbbb`, // Bonus level 5

]

setMap(levels[level])

setPushables({
  [player]: [obstacle]
})

onInput("w", () => {
  getFirst(player).y -= 1;
})

onInput("s", () => {
  getFirst(player).y += 1;
})

onInput("a", () => {
  getFirst(player).x -= 1;
})

onInput("d", () => {
  getFirst(player).x += 1;
})


onInput("j", () => {
  if (getFirst(player).x === getFirst(switches).x && getFirst(player).y === getFirst(switches).y) {
    clearTile(11, 6),
      clearTile(12, 6)
  } else if (getFirst(player).x === getFirst(key).x && getFirst(player).y === getFirst(key).y) {
    hasKey = true
    setMap(levels[2])
  }
  if (level === 6) {
    if (getFirst(player).x === getFirst(lock).x && getFirst(player).y === getFirst(lock).y && hasKey === true) {
      level = 7
      lockOpen = true
      setMap(levels[level])
    }
  }
  if (level === 11) {
    if (getFirst(player).x === getFirst(lock2).x && getFirst(player).y === getFirst(lock2).y && hasKey2 === true) {
      clearTile(12, 0)
    }
  }
  if (level === 11) {
    if (getFirst(player).x === getFirst(key2).x && getFirst(player).y === getFirst(key2).y) {
      hasKey2 = true
    }
  }
})

onInput("k", () => {
  setMap(levels[level])
})

onInput("l", () => {
  if (lockOpen === true) {
    level = 7;
    setMap(levels[level]);
  } else if (lockOpen === false) {
    level = 6;
    setMap(levels[level]);
  }
});

onInput("i", () => {
  playback.end()
})



afterInput(() => {
  if (level === 0 || 6 || 7) {
    if (getFirst(player).x === getFirst(portal).x && getFirst(player).y === getFirst(portal).y) {
      level = 1
      setMap(levels[level])
    }
  }
  if (level === 1 || 6 || 7) {
    if (getFirst(player).x === getFirst(portall).x && getFirst(player).y === getFirst(portall).y) {
      level = 2
      setMap(levels[level])
    }
  }
  if (level === 2 || 6 || 7) {
    if (getFirst(player).x === getFirst(portalll).x && getFirst(player).y === getFirst(portalll).y) {
      level = 3
      setMap(levels[level])
    }
  }

  if (level === 3 || 6 || 7) {
    if (getFirst(player).x === getFirst(portallll).x && getFirst(player).y === getFirst(portallll).y) {
      level = 4
      setMap(levels[level])
    }
  }

  if (level === 4 || 6 || 7) {
    if (getFirst(player).x === getFirst(portallllll).x && getFirst(player).y === getFirst(portallllll).y) {
      level = 5
      setMap(levels[level])
    }
  }

  if (level === 5 || 6 || 7 || 10 || 11 || 12 || 13 || 14) {
    if (getFirst(player).x === getFirst(portalllll).x && getFirst(player).y === getFirst(portalllll).y && lockOpen === false) {
      level = 6
      setMap(levels[level])
    }

    if (getFirst(player).x === getFirst(portalllll).x && getFirst(player).y === getFirst(portalllll).y && lockOpen === true) {
      level = 7
      setMap(levels[level])
    }
  }

  if (level === 7 || 6 || 9) {
    if (getFirst(player).x === getFirst(portalllllll).x && getFirst(player).y === getFirst(portalllllll).y) {
      level = 0
      setMap(levels[level])
    }
  }

  if (level === 1) {
    if (getFirst(player).x === getFirst(secretportal).x && getFirst(player).y === getFirst(secretportal).y) {
      level = 8
      setMap(levels[level])
    }
  }

  if (level === 7) {
    if (getFirst(player).x === getFirst(B1).x && getFirst(player).y === getFirst(B1).y) {
      level = 10
      setMap(levels[level])
    }
  }

  if (level === 7) {
    if (getFirst(player).x === getFirst(B2).x && getFirst(player).y === getFirst(B2).y) {
      level = 11
      setMap(levels[level])
    }
  }
  if (level === 7) {
    if (getFirst(player).x === getFirst(B3).x && getFirst(player).y === getFirst(B3).y) {
      level = 12
      setMap(levels[level])
    }
  }

  if (level === 7) {
    if (getFirst(player).x === getFirst(B4).x && getFirst(player).y === getFirst(B4).y) {
      level = 13
      setMap(levels[level])
    }
  }

  if (level === 7) {
    if (getFirst(player).x === getFirst(B5).x && getFirst(player).y === getFirst(B5).y) {
      level = 14
      setMap(levels[level])
    }
  }


})
