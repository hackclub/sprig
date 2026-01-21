/*
@title:Rock_Puzzle_Game
@author: Hadi Abbasi
@description: Push rocks around to make your way to the exit. Press J to reset level.
@tags: []
@addedOn: 2025-11-16
*/

const player = "p"
const rock = "r"
const picker = "i"
const goal = "g"
setLegend(
  [player, bitmap`
................
..333......333..
.33333....33333.
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
.33333333333333.
..333333333333..
...3333333333...
....33333333....
.....333333.....
......3333......
.......33.......
................`],
  [rock, bitmap`
.LLLLLLLLLLLLLL.
L11111111L11111L
L11111111L11111L
L11111111L11111L
L11111111L11111L
L1111111LLLL111L
L1111111L111LL1L
L111111LL111LL1L
L111111L11111LLL
L11111LL111111LL
L11111LL1111111L
L1111LL11111111L
L111L1111111111L
L11LL1111111111L
L1L111111111111L
.LLLLLLLLLLLLLL.`],
  [goal, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [picker, bitmap`
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
3333333333333333`]
)
setSolids([picker, player, rock])
setPushables({
  [player]: [rock] })
let level = 0

const levels = [
  map`
....................
..iiii..i..i.iiii...
...ii...i..i.i.ii...
...ii...iiii.ii.....
...ii...i..i.iiii...
....................
..iiii.iiii..ii..i..
..i....i..i.i..i.i..
..i.ii.i..i.iiii.i..
..iiii.iiii.i..i.iii
................i...
................i...
...............iii..
..p.............i...
................g...
....................`,
  map`
........r..r..r.....
.........r..r.i.....
i.......i..r.ri.r...
i.......i..r..i.r...
i..iiiiii.....ir.r.i
i..iiiiiiiiiiiii.iii
i...r..i............
iii.i..ir..r...iiii.
..i.iiii..i.iii...i.
ii...ii..ri.i.pr..i.
..r..iir..i.iii.r.i.
.i.r.i.r.ri.i.iir.i.
.i...i..r.iii.i...ii
.i...i.r..r..r.rrr.i
.i...i....rri......i
gi...i......iiiiiiii`,
  map`
iiiiiiiiii
.....r.rii
.p..r.rr.i
....r.r.gi
....r.rr.i
.....r.rii
iiiiiiiiii
iiiiiiiiii`,
  map`
......irrrrr.gi.....
......irrrrr..i.....
......irrrr...i.....
iiiiiiirrrrr..iiiiii
......irrr.rrri.....
......irrr..r.i.....
......irrr..rri.....
......i.......i.....
......i.......i.....
......i.......i.....
.....ii.......iiiii.
iiiiiii.......i...ii
......i.......i.....
......i.......i.....
......i.......i.....
......i...p...i.....`,
  map`
....r.r.ig..........
...rr..r.iiiiii.....
....r.rr......ii....
........rii....i....
...rrr..i.i..r.i....
...iiiii..irr.ri....
...i.rr...irrr.i....
...i..rr..i...ri....
...i.r.r..iiii.i....
...i..rr.......i....
...i..r........ii...
..ii..i........i....
..i...ii.......i....
..i....iiiiiiii.....
..i.......r.r.......
p.i........r........`,
  map`
....................
.i...i..ii..i..i....
..i.i..i..i.i..i....
...i...i..i.i..i....
...i....ii...ii.....
...............i..i.
.i...i...i.iii.ii.i.
..i.i.i.i...i..i.ii.
...i...i...iii.i..i.
....................
....................
....................
....................
....................
....................
....................`
]
setMap(levels[0])

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("j", () => {
  setMap(levels[level]);
});

afterInput(() => {
  if (tilesWith(player, goal).length > 0) {
    level+=1
    setMap(levels[level])
  }
})
