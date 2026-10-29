const spaceship = "p"
const wall = "w"
const trash = "k"

setSolids([ spaceship, wall ])

setLegend(
  [ spaceship, bitmap`
.......00.......
......0LL0......
.....0L77L0.....
....0L7777L0....
...0L777777L0...
...0LL1111LL0...
..00L111111L00..
.0L0L1L11L1L0L0.
.0L0L1L11L1L0L0.
.0L0L1L11L1L0L0.
.000L111111L000.
.030LL1111LL030.
.69.0LLLLLL0.96.
.66..000000..66.
..6..693396..6..
......6666......` ],
  [ wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0000000000000000` ],
  [ trash, bitmap`
...C.....C...C..
..0.C..0..C0..C.
...C......C..C..
....C.0000.C..C.
..000000000000.0
0..0FFDFFFFD0...
...0CCFCCDCD0...
...0C0DCCC0D0...
...0C0FCCC0F0...
...0C0CCCC0F0...
...0C0CCCC0C0...
...0C0CCCC0C0...
...0C0CCCC0C0...
...0CCDFCCCC0...
...0DFFDFFCC0...
....00000000....` ]
)

const level = map`
wwwwwwwwwwwwwwwwwwwwwwwww
w......w...w..w.........w
w.k..ww....w.....kkkkk..w
w....w....w...w.........w
wwww.....k...ww.........w
w.......w.....w.........w
w.......w.....w.........w
w..w......w....wwww...www
wk.w...w.....k..wk.w.w..w
w..ww..ww.......w..w.w.kw
wwwww..w...w.w..w....w..w
w.kw...w..w...w.ww......w
w..w.k....w.p.w.......www
w..w......w...w..k......w
w....wwwwwwwww.....w....w
w....w....w......www....w
w.wwww..k.w....www...k..w
w.........w.k.ww........w
w.......www....w.....wwww
w.....w.............w..kw
w.w...ww...www.w...ww...w
w.www.kww...wk.www....www
w..wkw..w....www....w...w
w....w..w.....wk....w..kw
wwwwwwwwwwwwwwwwwwwwwwwww`
setMap(level)

onInput("d", () => {
  // Move the spaceship one tile to the right
  getFirst(spaceship).x += 1
})
onInput("a", () => {
  // Move the spaceship one tile to the left
  getFirst(spaceship).x -= 1
})
onInput("w", () => {
  // Move the spaceship one tile up
  getFirst(spaceship).y -= 1
})
onInput("s", () => {
  // Move the spaceship one tile down
  getFirst(spaceship).y += 1
})
afterInput(() => {
  const ship = getFirst(spaceship);
  const objectsOnTile = getTile(ship.x, ship.y);
  const targetTrash = objectsOnTile.find(s => s.type === trash);
  
  // 1. If the ship lands on trash, remove it
  if (targetTrash) {
    targetTrash.remove();
    playTune(collect)} w
  

  // 2. Count how many trash pieces ("k") are left on the board
  const trashRemaining = tilesWith(trash).length;

  // 3. If there is no more trash left, you win!
  if (trashRemaining === 0) {
    addText("you win!", { y: 4, color: color`6` });
  }
});

const collect = tune `
272.72727272727275: B4/272.72727272727275 + A4/272.72727272727275 + F5^272.72727272727275 + E5^272.72727272727275 + D5^272.72727272727275,
8454.545454545456`
const background = tune`
252.10084033613447: B4~252.10084033613447 + D5-252.10084033613447,
252.10084033613447,
252.10084033613447: B4~252.10084033613447 + D5^252.10084033613447,
252.10084033613447: D5^252.10084033613447,
252.10084033613447: B4~252.10084033613447,
252.10084033613447: D5-252.10084033613447,
252.10084033613447: B4~252.10084033613447 + D5-252.10084033613447,
252.10084033613447,
252.10084033613447: B4~252.10084033613447 + D5^252.10084033613447,
252.10084033613447: D5^252.10084033613447,
252.10084033613447: B4~252.10084033613447,
252.10084033613447: D5-252.10084033613447,
252.10084033613447: B4~252.10084033613447 + D5-252.10084033613447,
252.10084033613447,
252.10084033613447: B4~252.10084033613447,
252.10084033613447: D5^252.10084033613447,
252.10084033613447: B4~252.10084033613447 + D5^252.10084033613447,
252.10084033613447,
252.10084033613447: B4~252.10084033613447,
252.10084033613447: D5-252.10084033613447,
252.10084033613447: B4~252.10084033613447 + D5-252.10084033613447,
252.10084033613447,
252.10084033613447: B4~252.10084033613447 + D5^252.10084033613447,
252.10084033613447: D5^252.10084033613447,
252.10084033613447: B4~252.10084033613447,
252.10084033613447: D5-252.10084033613447,
252.10084033613447: B4~252.10084033613447 + D5-252.10084033613447,
252.10084033613447,
252.10084033613447: B4~252.10084033613447 + D5^252.10084033613447,
252.10084033613447: D5^252.10084033613447,
252.10084033613447: B4~252.10084033613447,
252.10084033613447: D5-252.10084033613447`
const playback = playTune(background, Infinity)
