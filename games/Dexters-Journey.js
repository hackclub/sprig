/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: dexter finds his bff
@author: aavin.soman
@description: Dexters Journey is a adventure puzzle game where you play as Dexter, a determined dog on a quest to reunite with his best friend.
@tags: [adventure, puzzle, fun, story]
@addedOn: 2025-16-10
*/

const player = "p"
const wall = "w"
const cat = "c"
const evil = "e"
const port = "o"
const invis = "i"
const box = "b"
const goal = "g"
const castle = "a"
const background = "x"
const invis_portal = "t"
const dead_evil = "r"
const tele = "y"
const key = "k"
const door = "d"
setLegend(
  [player, bitmap`
.......00....00.
.0000.0CC0..0CC0
00CC0.0C000CCC0.
0CC00.0CCCCCCC0.
0C00..0CC0CC0C0.
0C0...0CCCCCCC0.
0C00000CCCCCCC00
0CCCCC0CCCCC0CC0
0CCCCCCCCCCCC000
0CCCCCCCCCCCCCC3
0CCCCCCCCCCCCC00
0CCCCCCCCCCCCC0.
0CC0CCCCCCCCCC0.
0CC0CC000C000C0.
0CC0CC0.0C0.0C0.
.00.00..000.000.`],
  [wall, bitmap`
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
  [cat, bitmap`
................
................
................
................
..0.....00......
.090...090......
.099000990......
09999999990..00.
09999999990..090
09099909990..090
09922299990.0990
.02222299300990.
..033333399990..
..09999999990...
..09999999990...
..02020002020...`],
  [evil, bitmap`
................
................
..000......000..
.0HHH0....0HHH0.
.0H3H00..0HH3H0.
.0HH3H0..0H3HH0.
.00HHHH00HHHH00.
..0000H00H0000..
.0L2LL0LL0LL2L0.
.0LL2LLLLLL2LL0.
.00LL222222LL0..
..000LLLLLLL0...
....000LL000....
.......00.......
................
................`],
  [port, bitmap`
....5555.H...55.
..5DDHHHH55H5745
.5HHHDDDDDDDH77.
5HDDD5555DDDDH74
HHDD57777777DHH4
5DD5.DHDD.577DH4
5HD5DH555D.57DD5
5H75H55555D57HD5
.H75H55555HD7HD5
.H75D55555HD7HD5
7HH7D75555HD7HD5
74D77D77DDH74HDH
745D.5D7HH7555H4
.445D5.H55555H54
.7444DDDDDHHH544
..7.45555H55.44.`],
  [invis, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`],
  [box, bitmap`
DDDDDDDDDDDDDDDD
DD.....DD.....DD
D.D...D..D...D.D
D..D.D....D.D..D
D...D......D...D
D..D.D....D.D..D
D.D...D..D...D.D
DD.....DD.....DD
DD.....DD.....DD
D.D...D..D...D.D
D..D.D....D.D..D
D...D......D...D
D..D.D....D.D..D
D.D...D..D...D.D
DD.....DD.....DD
DDDDDDDDDDDDDDDD`],
  [goal, bitmap`
................
................
................
.....3333333....
....344444443...
...34455555443..
...34557775543..
...3457DDD7543..
...3457DDD7543..
...34557775543..
...34455555443..
....344444443...
.....3333333....
................
................
................`],
  [castle, bitmap`
0000000000000000
LL0LLL0LLL0LLL0L
CC0CCC0CCC0CCC0C
CC0CCC0CCC0CCC0C
CC0CCC0CCC0CCC0C
CC0CCC0CCC0CCC0C
CCCCCCCCCCCCCCCC
CCC0CCC0CCC0CCC0
0C000C000C000C00
CCC0CCC0CCC0CCC0
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
0000000000000000
CC0CCC0CCC0CCC0C
C0C0C0C0C0C0C0C0
0CCC0CCC0CCC0CCC`],
  [background, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [invis_portal, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`],
  [key, bitmap`
................
................
................
................
................
..6666..........
.666666.........
.66..6666666666.
.66..6666666666.
.66..66....6.6..
.666666....6.6..
..6666.....6.6..
................
................
................
................`],
  [door, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L000000000000L0
0L0LLLLLLLLLL0L0
0L0L00000000L0L0
0L0L0LLLLLL0L0L0
0L0L0L0000L0L0L0
0L0L0L0LLL0L0L0L
0L0L0L0000L0L0L0
0L0L0LLLLLL0L0L0
0L0L00000000L0L0
0L0LLLLLLLLLL0L0
0L000000000000L0
0LLLLLLLLLLLLLL0
0000000000000000
0000000000000000`],
  [dead_evil, bitmap`
................
.....00050000...
...000LL05HHH0..
..02LLLL5H52H0..
..0L2LLL0H2HH0..
...0L2LL0HH00...
...0L2L0HH00....
..00L2LL00......
..00L2LL00......
...0L2L0HH00....
...0L2LL0HHH0...
..0L2LLL0H2HH0..
..02LLLL5H52H0..
...000LL05HHH0..
......0050000...
................`]
)

setSolids([player, invis, wall, box, castle, door])
let level = 0
// Teleport cooldown prevents immediate re-teleport back and forth
let teleportCooldown = false
// Track whether a key has been collected (unlocks all doors)
let keysCollected = 0
const levels = [
  map`
..........
..........
......e...
....wcw.w.
....wwwww.
i.iiwwwww.
iiiiiwwww.
p...owwww.`,
  map`
p.......w....w
...........w..
w.............
.w.....w......
............w.
w.............
....w........w
.w..........w.
..w...........
.....w..w....w
.ww...........
.............w
..w..ww....w..
w......ww.w..o`,
  map`
......iec
......iii
.........
pwwwwwwww
.........
.........
........o`,
  map`
gw..gwg
...b..b
b...w..
.w.wgb.
..bg...
...wb.g
p.....o`,
    map`
aaaaa.......
k.aaa.aaaaa.
a...a.....a.
aaa.aaaaa.a.
....a...a.a.
.aaaapa.a.a.
..a...a...a.
a...aaaaaaa.
aaaaaaa...a.
a...a...a.a.
oda...aaa...`,
  map`
aaaaaaaaaaaaaaaaa
xxxxwwxxxwxxxwxxx
pwwxxxxwxxxwxxxwo
aaaaaaaaaaaaaaaaa`,
  map`
oaaaaaaaa
xxxxxxxxx
aaaaaaaax
xxxxxxxxx
xaaaaaaaa
xxxxxxxxx
aaaaaaaax
xxxxxxxxx
paaaaaaaa`,
  map`
aoa
axa
axa
axa
axa
axa
axa
axa
axa
axa
axa
apa`,
  map`
..ii.aeaci.....i
i..iiaaa...i.i..
ii.iii..iiii.ii.
i....ii.....i...
..ii..i.iii.i.ii
.i..i...i...i...
..i...iii.iii.ii
i.iiii....i.i...
...iii.i.i..iii.
.ii...i..ii.....
....ipii....i.i.`,
  map`
.ara.
.aaa.
iiiii
p..tc`,
  map`
aaaaaaaaaaaaaaaa
wwwwwwwwwwwwwwww
................
................
....iii.....c...
....ipp....ccc..
...ipppp..ccccc.
ii.ppppppccccccc
pc.ppppppccccccc`
]
level = 0
setMap(levels[level])

setPushables({
  [player]: [box],
  [box]: [player]
})

if (level === 0) {
  addText("your best\nfriends mine!", {
    x: 5,
    y: 2,
    color: color`0`
  })
}
if (level === 9) {
  setSolids([player, invis, wall, box, castle, cat])
}

let sorw = false;
let w = false
onInput("s", () => {
  
  getFirst(player).y += 1
  if (level === 1) {
    for (i = 1; i < 100; i++) {
      if (getTile(player.x, player.y + i) !== wall) {
        getFirst(player).y += 1
      }
    }
  }
  if (level === 2) {
    sorw = true;
  }
})

onInput("w", () => {
  getFirst(player).y -= 1
  if (level === 1) {
    for (i = 1; i < 100; i++) {
      if (getTile(player.x, player.y - i) !== wall) {
        getFirst(player).y -= 1
      }
    }
  }

  if (level === 2) {
    sorw = true;
    w = true;
  }
})

onInput("a", () => {
  getFirst(player).x -= 1
  if (level === 1) {
    for (i = 1; i < 100; i++) {
      if (getTile(player.x - i, player.y) !== wall) {
        getFirst(player).x -= 1
      }
    }
  }
})
onInput("d", () => {
  getFirst(player).x += 1
  if (level === 1) {
    for (i = 1; i < 100; i++) {
      if (getTile(player.x + i, player.y) !== wall) {
        getFirst(player).x += 1
      }
    }
  }
})
onInput("j", () => {
  if (level === 2) {
    clearTile(tilesWith(wall, player))
    clearText();
  }

  const currentLevel = levels[level]; // get the original map of the level
  if (currentLevel !== undefined) {
    clearText();
    setMap(currentLevel);
  }
});

afterInput(() => {
  // --- Key collection and door unlocking ---
  if (tilesWith(player, key).length > 0) {
    // collect the key under the player
    clearTile(tilesWith(key, player))
    keysCollected += 1
    addText("Unlocked!", { x: getFirst(player).x, y: getFirst(player).y - 1, color: color`3` })
    // remove all doors from the map (unlock)
    clearTile(tilesWith(door))
    // make doors passable by removing them from solids
    setSolids([player, invis, wall, box, castle])
  }
  // --- Key collection and door unlocking ---
  if (tilesWith(player, key).length > 0) {
    // collect the key under the player
    clearTile(tilesWith(key, player))
    keysCollected += 1
    addText("Unlocked!", { x: getFirst(player).x, y: getFirst(player).y - 1, color: color`3` })
    // remove all doors from the map (unlock)
    clearTile(tilesWith(door))
    // make doors passable by removing them from solids
    setSolids([player, invis, wall, box, castle])
  }
  if (level === 9) {
    if (tilesWith(player, invis_portal).length === tilesWith(invis_portal).length) {
      level++; // Move to the next level
      setMap(levels[level]); // Load the next level
      addText("The End! You Win!", { y: 5, color: color`3` });
    }
  } else if (level === 8) {
    if (tilesWith(player, cat).length === tilesWith(cat).length) {
      clearText()
      if (levels[level + 1] !== undefined) {
        level++; // Move to the next level
        setMap(levels[level]); // Load the next level
      }
    }
  } else if (level === 2 && sorw) {
    addSprite(0, 3, "w")
    sorw = false;
    if (w) {
      addText("HAHAHAHA", { x: 8, y: 2, color: color`3` })
      w = false;
    }
  } else if (level === 3) {
    if (tilesWith(box, goal).length === tilesWith(goal).length && tilesWith(player, port).length === tilesWith(port).length) {
      if (levels[level + 1] !== undefined) {
        level++; // Move to the next level
        setMap(levels[level]); // Load the next level
      } else {
        addText("you win!", { y: 4, color: color`3` });
      }
    }
  } else if (tilesWith(player, port).length === tilesWith(port).length && level !== 3) {
    clearText()
    if (levels[level + 1] !== undefined) {
      level++; // Move to the next level
      setMap(levels[level]); // Load the next level
      if (level === 1) { // Check for the second level
        addText("slide!!", {
          x: 6,
          y: 2,
          color: color`5`
        })
      }

      if (level === 2) {
        addText("Your choice!", {
          x: 3,
          y: 5,
          color: color`1`
        })
      }
      if (level === 8) {
        addText("Finally, you're\nhere, now find\nyour way to her", { x: 2, y: 3, color: color`0` })
      }
    } else {
      addText("The End! You Win!", { y: 5, color: color`3` });
    }
  }
});