/*
@title: find_the_clone
@author: TheGoldenBlock
@tags: ['puzzle']
@addedOn: 2024-01-21
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p"
const clone = "c"
const real = "r"
const wall = "w"
const fakewall = "f"
const fakebox = "z"
const movesound = tune `
92.3076923076923: E5/92.3076923076923,
2861.5384615384614`
const levelclearsound = tune `
52.63157894736842: E5/52.63157894736842 + D5-52.63157894736842,
52.63157894736842: C5-52.63157894736842,
52.63157894736842: C5/52.63157894736842 + D5-52.63157894736842,
52.63157894736842: E5-52.63157894736842,
52.63157894736842: E5/52.63157894736842,
1421.0526315789473`
const playerdiesound = tune `
77.51937984496124: D5-77.51937984496124 + E5-77.51937984496124 + C5-77.51937984496124,
77.51937984496124: C5-77.51937984496124 + D5-77.51937984496124 + E5-77.51937984496124,
2325.581395348837`
const gamecompletesound = tune `
229.00763358778627: C5-229.00763358778627,
229.00763358778627: B4-229.00763358778627,
458.01526717557255,
229.00763358778627: B4-229.00763358778627,
229.00763358778627,
229.00763358778627: E5-229.00763358778627,
229.00763358778627: C5-229.00763358778627,
229.00763358778627: A4-229.00763358778627,
229.00763358778627: A4-229.00763358778627,
229.00763358778627: C5-229.00763358778627,
687.0229007633588,
229.00763358778627: B4-229.00763358778627,
229.00763358778627,
229.00763358778627: A4-229.00763358778627,
229.00763358778627,
229.00763358778627: C5-229.00763358778627,
229.00763358778627,
229.00763358778627: C5-229.00763358778627,
229.00763358778627: B4-229.00763358778627,
229.00763358778627,
229.00763358778627: G4-229.00763358778627,
229.00763358778627: B4-229.00763358778627,
229.00763358778627,
229.00763358778627: G4-229.00763358778627,
229.00763358778627: G4-229.00763358778627,
229.00763358778627,
229.00763358778627: G4-229.00763358778627,
229.00763358778627: B4-229.00763358778627,
229.00763358778627`
const box = "d"
setLegend(
  [ player, bitmap`
................
................
..666666666666..
..666666666666..
..660666666066..
..660666666066..
..660666666066..
..660666666066..
..666666666666..
..666666666666..
..666600006666..
..666666666666..
..666666666666..
..666666666666..
................
................` ],
  [clone, bitmap`
................
................
..777777777777..
..777777777777..
..707777777707..
..707777777707..
..707777777707..
..707777777707..
..777777777777..
..777777777777..
..770000000077..
..777777777777..
..777777777777..
..777777777777..
................
................`],
  [real, bitmap`
................
................
..777777777777..
..777777777777..
..770777777077..
..770777777077..
..770777777077..
..770777777077..
..777777777777..
..777777777777..
..777000007777..
..777777777777..
..777777777777..
..777777777777..
................
................`],
  [box, bitmap `
CCCCCCCCCCCCCCCC
CC111111111111CC
C1C1111111111C1C
C11C11111111C11C
C111C111111C111C
C1111C1111C1111C
C11111C11C11111C
C111111CC111111C
C111111CC111111C
C11111C11C11111C
C1111C1111C1111C
C111C111111C111C
C11C11111111C11C
C1C1111111111C1C
CC111111111111CC
CCCCCCCCCCCCCCCC`],
[wall, bitmap `
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
[fakewall, bitmap `
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
[fakebox, bitmap`
CCCCCCCCCCCCCCCC
CC111111111111CC
C1C1111111111C1C
C11C11111111C11C
C111C111111C111C
C1111C1111C1111C
C11111C11C11111C
C111111CC111111C
C111111CC111111C
C11111C11C11111C
C1111C1111C1111C
C111C111111C111C
C11C11111111C11C
C1C1111111111C1C
CC11111111111CCC
CCCCCCCCCCCCCCCC`]
  
)
setSolids([player, clone, real, wall])

let level = 0
let deaths = 0
const levels = [
  map `
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........`,
  map`
p.........
..........
..........
..........
..........
.ccc..ccr.
..........
..........
....d.....
..........`,
  map `
..........
.p........
..c.c.c.c.
...r...c..
..c.c.c.c.
...c...c..
..c.c.c.c.
..........
..........
....d.....`,
  map `
...........
...c...c...
..c.c.c.c..
.ccccrccccc
.c.c..c.c.c
.c.c..c.c.c
...........
.p.........
...........
.....d.....
...........`,
  map `
p..........d
......c.....
.....c.c....
....c...c...
...c.....c..
...ccrcccc..
...c.....c..
...c.....c..
...ccccccc..
............
............
............`,
  map `
..p.w.......www
....w.......www
....w..d....www
..c.w.......www
....w........ww
....w..........
.c.cwwwwwww....
....w..c.......
....wc...c.....
....w..c.c.....
....w..........
.c..w..........
...............
...r..c........
...............`,

map`
....c.......c......w
.pc.....r.......c.cw
..c........c.......w
.c...c...c....c....w
wwwwwwwwwwwwwwwww..w
................w..w
................w..w
................w..w
.......wwwwwwwwww..w
.......w...........w
.......w...........w
.......w..wwwwwwwwww
.......w..w.........
.......w..w.........
.......w..w.........
.......w..w.........
.......w..w.........
.......w..wwwwwwwwww
.......w...........d
.......wwwwwwwwwwwww`,
map `
wwwwwwwwwwwwwwww
w.....w........w
w..p..w........w
w.....f........w
wwwwwww........w
...w...........w
...w....c...r..w
...w...........w
...w...........w
...w.c...c.....w
...w...........w
...ww..c.......w
...wwffffffffffw
................
.d..............
................`,

map `
w................fww
w.p.......c...c.cfww
w.....c..........fww
w....c......c....fww
w..c...r.......c.fww
w................fww
w.....c......c...fww
wwwwwwwwwwwwwwwwffww
d..............wffww
w..............wffww
w..............wfffw
w......wwwwwwwwwfffw
w......f......zwfffw
w......wwwwwwwwwfffw
w..............wfffw
w..................w
w..................w
w..................w
w..................w
wwwwwwwwwwwwwwwwwwww`,

map `
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`

]
setMap(levels[level])

addText("Push the box", {
    x: 2,
    y: 0,
    color: color`3`
  })
addText("that is", {
    x: 2,
    y: 1,
    color: color`3`
  })
addText("different than ", {
    x: 2,
    y: 2,
    color: color`3`
  })
addText("the others into", {
    x: 2,
    y: 3,
    color: color`3`
  })
addText("the gray box", {
    x: 2,
    y: 4,
    color: color`3`
  })
addText("with your", {
    x: 2,
    y: 5,
    color: color`3`
  })
addText("character", {
    x: 2,
    y: 6,
    color: color`3`
  })
addText("Use WASD to move", {
    x: 2,
    y: 9,
    color: color`3`
  })
addText("your character.", {
    x: 2,
    y: 10,
    color: color`3`
  })
addText("Press j to reset", {
    x: 2,
    y: 12,
    color: color`3`
  })
addText("Press i to", {
    x: 2,
    y: 14,
    color: color`3`
  })
addText("continue", {
    x: 2,
    y: 15,
    color: color`3`
  })



setPushables({
  [ player ]: [clone, player, real],
  [clone] : [clone, real],
  [real] : [clone]
})

onInput("s", () => {
  getFirst(player).y += 1
  playTune(movesound)
})
onInput("w", () => {
  getFirst(player).y -= 1
  playTune(movesound)
})
onInput("a", () => {
  getFirst(player).x -= 1
  playTune(movesound)
})
onInput("d", () => {
  getFirst(player).x += 1
  playTune(movesound)
})
onInput("j", () => {
  setMap(levels[level])
});
onInput("i", () => {
  if (levels === 0){ 
    setMap(levels[level])
    clearText()
  }
});

afterInput(() => {
  const targetCovered1 = tilesWith(real, box).length
  const targetCovered2 = tilesWith(clone, box).length
  const targetCovered3 = tilesWith(clone, fakebox, real).length
  const target1 = tilesWith(real).length

  if (targetCovered1 === target1) {
    level++;
    setMap(levels[level])
    clearText()
    playTune(levelclearsound)
  };
  if (targetCovered3 >= 2) {
    setMap(levels[level])
    clearText()
    playTune(playerdiesound)
  };
  if (level === 9) {
    playTune(gamecompletesound)
    addText("Congratulations!", {
      x: 2,
      y: 0,
      color: color`3`
      })
    addText("You won!", {
      x: 2,
      y: 3,
      color: color`3`
      })
  
  }
  if (targetCovered2 === target1) {
    setMap(levels[level])
    playTune(playerdiesound)
    deaths++;
    if (deaths != 1 ) {
      addText("Try again.", {
      x: 2,
      y: 0,
      color: color`3`
      })
    }
  };
})
