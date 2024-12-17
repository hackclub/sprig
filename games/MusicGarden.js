/*
@title: Music Garden
@author: kubits
@tags: []
@addedOn: 2024-05-20
@img: ""
*/

/* 
CREDITS: 
  I made THIS entire version by myself
  However, it is a remake of the original Music Garden, which my friends and I made on Scratch
    Here it is: https://scratch.mit.edu/projects/639620001/

INSTRUCTIONS:
  Plant flowers:
    Use W (up) and S (down) to navigate the barrel (menu).
    While the flower is highlighted, use IJKL to navigate the field.
    Press D to put seeds in the highlighted spot on the field.

  Remove flowers:
    Navigate to the shovel in the barrel.
    While the shovel is highlighted, use IJKL to go to the flower you wish to remove.
    Press D to remove the flower.

  Water flowers:
    Navigate to the water drop in the barrel and press A.
    One by one, the seeds will grow into flowers and play a note.
    The first letter of each flower name corresponds to the letter note.
    e.g. bellflower -> B note

  Clear field:
    Navigate to the black cat in the barrel.
    Press A to clear all flowers.

CONTROLS:
  i - up
  k - down
  j - left
  l - right
  
  w - up menu
  s - down menu
  a - interact menu
  d - interact field

*/


const carnation = "c"
const daisy = "d"
const eglantine = "e"
const freesia = "f"
const goldenRod = "g"
const amaryllis = "a"
const bellflower = "b"

const shovel = "s"
const water = "w"

const topBarrel = "t"
const barrel = "x"
const dirt = "y"
const grass = "q"
const seed = "z"
const kat = "k"

const select = "l"
const menu = "m"

let c = tune`
750: C4^750,
23250`

let d = tune`
750: D4^750,
23250`

let e = tune`
750: E4^750,
23250`

let f = tune`
750: F4^750,
23250`

let g = tune`
750: G4^750,
23250`

let a = tune`
500: A4^500,
15500`

let b = tune`
750: B4^750,
23250`

let melody = tune`
250: C4/250 + E4-250 + C5^250 + E5^250,
250: G4/250 + C5^250 + E5^250,
250: D5/250 + E5^250 + C5^250,
250: E5/250 + C5^250,
250: C5^250 + E5^250,
250: G4/250 + E5^250 + C5^250,
250: G4-250 + E4-250 + C5^250 + E5^250,
250: E5^250 + C5^250,
250: F4/250 + D4-250 + D5^250 + F5^250,
250: A4/250 + D5^250 + F5^250,
250: E5/250 + D5^250 + F5^250,
250: D5/250 + F5^250,
250: F5^250 + D5^250,
250: F5^250 + D5^250,
250: G4/250 + E4-250 + E5^250 + G5^250,
250: F5^250 + D5^250 + D4-250 + F4-250,
250: C4-250 + E5^250 + C5^250 + E4-250,
250: G4/250 + E5^250 + C5^250,
250: D5/250 + E5^250 + C5^250,
250: E5/250 + C5^250,
250: E5^250 + C5^250,
250: G4/250 + E5^250 + C5^250,
250: G4-250 + E4-250 + E5^250 + C5^250,
250: E5^250 + C5^250,
250: D5^250 + B4^250 + F4/250 + D4-250,
250: A4/250 + D5^250 + B4^250,
250: E5/250 + D5^250 + B4^250,
250: D5/250 + B4^250,
250: D5^250 + B4^250,
250: D5^250 + B4^250,
250: G4/250 + E4-250 + D5^250 + B4^250,
250: D5^250 + B4^250`

let interact = tune`
112.35955056179775: C4/112.35955056179775,
3483.14606741573`


const notes = [c, d, e, f, g, a, b]
const flowers = [carnation, daisy, eglantine, freesia, goldenRod, amaryllis, bellflower]
const garden = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]
let curFlowerIdx = 0

setLegend(


  [shovel, bitmap`
................
............000.
...........0LLL0
...........0L0L0
..........0C0LL0
.........0CCC00.
........0CC00...
...000.0CC0.....
..001000C0......
.0011LL00.......
.011LLLLL0......
0011LL1110......
0111111000......
01111000........
000000..........
................`],
  [water, bitmap`
................
.......555......
......5575......
......5775......
.....577775.....
....55777755....
....57777775....
...5577777755...
...5777777775...
..577777772775..
..577777772775..
..557777727755..
...5777777775...
...5577777755...
....55555555....
................`],
  [dirt, bitmap`
4444444444444444
444C444444444444
44CC444444444444
44444444444444C4
44444CCCCCC44444
4444CCCCCCCC4444
4444CCCCCCCC4444
4444CCCCCCCC4CC4
4444CCCCCCCC4CC4
4444CCCCCCCC4C44
4444CCCCCCCC4444
44444CCCCCC44444
44C4444444444444
4444444444C44444
4444444444444444
4444444444444444`],
  [seed, bitmap`
................
................
................
................
................
.......F.F......
.....F..........
......F...F.....
........F.......
.....F....F.....
........F.......
................
................
................
................
................`],
  [kat, bitmap`
................
................
..00........00..
..000......000..
..0800....0080..
..088000000880..
..000000000000..
.00000000000000.
.00002000020000.
.00000088000000.
.00002022020000.
.00000200200000.
.00000000000000.
..000000000000..
....00000000....
................`],

  [carnation, bitmap`
................
.........33.....
.....333383.....
...3383388833...
...3883888833...
.3333333333383..
.3888838883883..
..388383383333..
..3333833338883.
.33883338388833.
.3888833338883..
..33883883883...
...3383888333...
.....333833.....
.......333......
................`],
  [daisy, bitmap`
................
.......22.......
..222.2222.222..
..222122221222..
..222212212222..
...2221221222...
..211226922112..
.22221666912222.
.22222996622222.
..222126921122..
....12212122....
...22212221222..
..222212221222..
..222.2222.222..
.......22.......
................`],
  [eglantine, bitmap`
................
......H..H......
..HHHH8HH8HHHH..
..H8HH8888HH8H..
.HH88HH89HH88HH.
H88H88H86H88H88H
H88898H6HH89888H
.HH8662622668HH.
...H82666688H...
....HH6262HH....
...H86222668H...
..H8968HH8668H..
.H8888H..H8988H.
.H8888H..H8888H.
.H88H8H..H8H88H.
..HH.H....H.HH..`],
  [freesia, bitmap`
.......99.......
......9999......
999...9669...999
9699996226999969
9666699669966669
9622669999662269
9662266996622669
9966626666266699
.99966699666999.
..999996699999..
.99699622699699.
.96269622696269.
9962696226962699
9626999669996269
99699.9999.99699
.999...99...999.`],
  [goldenRod, bitmap`
................
....66666666....
....66..D.66....
...66..66..66...
...6..6.D6..6...
........D.......
...6666666666...
.6666..D...6666.
......6666......
....666D.666....
..6666.DD.6666..
..66...66...66..
.....666666.....
..66666..66666..
.666........666.
................`],
  [amaryllis, bitmap`
.......88.......
......8888......
.....883388.....
.....833338.....
8888.833338.8888
8333883223883338
8323333223333238
8332233223322338
.8333224D223338.
.888832D4238888.
8833323223233388
8322238228322238
8323383223833238
8338883333888338
.88..883388..88.
......8888......`],
  [bellflower, bitmap`
.......4........
.....DD444DD....
....DD5DD55DD...
...DD577D75.D...
....57777775....
....57777775....
....57777775....
....57777775....
...5777777775...
55.5775775775.55
.55577577577555.
.55777577577755.
.55577577577555.
...555.55.555...
.......22.......
......2..2......`],

  [select, bitmap`
66666......66666
6..............6
6..............6
6..............6
6..............6
................
................
................
................
................
................
6..............6
6..............6
6..............6
6..............6
66666......66666`],
  [menu, bitmap`
LLLLL......LLLLL
L..............L
L..............L
L..............L
L..............L
................
................
................
................
................
................
L..............L
L..............L
L..............L
L..............L
LLLLL......LLLLL`],
  [barrel, bitmap `
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [topBarrel, bitmap`
10L0FFFFFFFF4444
10L0FFFFFFFFF444
10L0FFFFFFFFF444
10L0FFFFFFFFF444
10L0FFFFFFFFF444
10L0FFFFFFFFF444
10L0FFFFFFFF4444
10L0FFFFFFFF4444
10L0FFFFFFFF4444
10L0FFFFFFF44444
10L0FFFFFF444444
10L0FFFFFF444444
10L0FFFFFF444444
10L0FFFFFF444444
10L0FFFFFFF44444
10L0FFFFFFFF4444`],
  [grass, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`]

)

const levels = [
  map`
xt....
xt....
xt....
xt....`
]

setMap(levels[0])
setBackground("y")

addSprite(0, 0, carnation)
addSprite(0, 1, shovel)
addSprite(0, 2, water)
addSprite(0, 3, kat)

addSprite(0, 0, menu)
addSprite(2, 0, select)



const playback = playTune(melody, Infinity)

onInput("i", () => {
  getFirst(select).y -= 1

})

onInput("k", () => {
  getFirst(select).y += 1
})

onInput("j", () => {
  if (getFirst(select).x >= 3) {
    getFirst(select).x -= 1
  }
})

onInput("l", () => {
  getFirst(select).x += 1

})

onInput("w", () => {
  getFirst(menu).y -= 1
})

onInput("s", () => {
  getFirst(menu).y += 1
})

//menu interaction
onInput("a", () => {
  switch (getFirst(menu).y) {
    case 0:
      curFlowerIdx++
      if (curFlowerIdx == 7) {
        curFlowerIdx = 0
      }
      getTile(0, 0)[0].type = flowers[curFlowerIdx]
      break;

    case 2:
      grow()
      break;
    case 3:
      clear()
      break;
  }
})

//field interactions
onInput("d", () => {
  playTune(interact)
  if (getFirst(menu).y == 0) {
    if (getTile(getFirst(select).x, getFirst(select).y).length == 1) {
      addSprite(getFirst(select).x, getFirst(select).y, seed)
      garden[getFirst(select).x - 2][getFirst(select).y] = flowers[curFlowerIdx]
    }

  } else if (getFirst(menu).y == 1) {
    let x = getFirst(select).x
    let y = getFirst(select).y
    clearTile(x, y)
    addSprite(x, y, select)
    garden[getFirst(select).x - 2][getFirst(select).y] = 0
  }
})

async function grow() {
  playback.end();
  for (let i = 2; i <= 5; i++) {
    for (let j = 0; j <= 3; j++) {
      if (garden[i - 2][j] != 0) {
        clearTile(i, j)
        addSprite(i, j, grass)
        addSprite(i, j, garden[i - 2][j])
        playTune(notes[flowers.indexOf(garden[i - 2][j])])

      }
      await sleep(500)
    }
  }
  if (getAll(select).length == 0) {
    addSprite(2, 0, select)
  }
  playback = playTune(melody, Infinity)
}

function clear() {
  for (let i = 2; i <= 5; i++) {
    for (let j = 0; j <= 3; j++) {
      clearTile(i, j)
      garden[i - 2][j] = 0;
    }
  }
  addSprite(2, 0, select)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
