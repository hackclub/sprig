/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Trash out
@author: sapbot
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const box = "b"
const trash = "t"
const brick = "r"
const altbox = "a"
const alttrash = "z"

setLegend(
  [ player, bitmap`
................
......00000.....
....002222200...
...02222222220..
...02222222220..
..0222022202220.
..0222022202220.
..0222222222220.
..0222222222220.
..0222022202220.
...02220002220..
...02222222220..
....002222200...
......00000.....
................
................` ],
  [ box, bitmap`
9999999999999999
99CCCCCCCCCCCCC9
9C9CCCCCCCCCCCC9
9CC9CCCCCCCCCCC9
9CCC9CCCCCCCCCC9
9CCCC9CCCCCCCCC9
9CCCCC9CCCCCCCC9
9CCCCCC9CCCCCCC9
9CCCCCCC9CCCCCC9
9CCCCCCCC9CCCCC9
9CCCCCCCCC9CCCC9
9CCCCCCCCCC9CCC9
9CCCCCCCCCCC9CC9
9CCCCCCCCCCCC9C9
9CCCCCCCCCCCCC99
9999999999999999`],
  [ trash, bitmap`
................
....000.........
...01110........
...01010........
.000000000......
022121L1LL0.....
.000000000......
.01L1L1L10......
.01L1L1L10......
.01L1L1L10......
.01L1L1L10......
.01L1L1L10......
.01L1L1L10......
.01L1L1L10......
.01L1L1L10......
..0000000.......`],
  [ brick, bitmap`
3333333333333333
3999C999C999C999
3999C999C999C999
3CCCCCCCCCCCCCCC
39C999C999C999C9
39C999C999C999C9
3CCCCCCCCCCCCCCC
3999C999C999C999
3999C999C999C999
3CCCCCCCCCCCCCCC
39C999C999C999C9
39C999C999C999C9
3CCCCCCCCCCCCCCC
3999C999C999C999
3999C999C999C999
3CCCCCCCCCCCCCCC`],
  [ altbox, bitmap`
7777777777777777
7755555555555557
7575555555555557
7557555555555557
7555755555555557
7555575555555557
7555557555555557
7555555755555557
7555555575555557
7555555557555557
7555555555755557
7555555555575557
7555555555557557
7555555555555757
7555555555555577
7777777777777777`],
  [ alttrash, bitmap`
................
....555.........
...57775........
...57575........
.555555555......
57777777775.....
.555555555......
.577777775......
.577777775......
.577777775......
.577777775......
.577777775......
.577777775......
.577777775......
.577777775......
..5555555.......`],
)

setSolids([player, box, brick, alttrash])

let level = 0
const levels = [
  map`
..t.
....
.pb.
....`,
  map`
......
.bbbb.
..t...
......
r.p..r
rrrrrr`,
  map`
rrrrrrrr
r...r.tr
r...r..r
r..br..r
r...r..r
r...r..r
rp.br..r
r......r
rrrr...r`,
  map`
..a.
....
.pz.
....`,
  map`
rrrrrrrrrrrrrrrr
r......rr......r
r.t..b.rr.z..a.r
r....b.rr....a.r
r......rr......r
r......rr......r
r....p.........r
rrrrrrrrrrrrrrrr`,
  map`
rrrrrrrrrrrrrrrrr
r.......r.......r
r..p...zr......tr
r.......r.......r
r.......r.......r
r......br......ar
r.......r.......r
r.......r.......r
r......br......ar
r.......r.......r
r.......r.......r
r......br......ar
r.......r.......r
r.......r.......r
r......br......ar
r...............r
rrrrrrrrrr...rrrr
.........rrrrr...`
]

setMap(levels[level])

afterInput(() => {
  const boxSprites = getAll(box)
  const trashSprite = getFirst(trash)

  if (trashSprite) {
    for (const box of boxSprites) {
      if (box.x === trashSprite.x && box.y === trashSprite.y) {
        box.remove()
        break; // Remove only the first box encountered
      }
    }
  }
})

setPushables({
  [player]: [box, alttrash],
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("l", () => {
  setMap(levels[level])
})

afterInput(() => {
  const boxSprites = getAll(box)
  const altBoxSprites = getAll(altbox)
  const trashSprite = getFirst(trash)
  const altTrashSprite = getFirst(alttrash)

  // Remove box if it is on trash
  if (trashSprite) {
    for (const box of boxSprites) {
      if (box.x === trashSprite.x && box.y === trashSprite.y) {
        box.remove()
        break; // Remove only the first box encountered
      }
    }
  }

  // Remove altbox if it is on alttrash
  if (altTrashSprite) {
    for (const altBox of altBoxSprites) {
      if (altBox.x === altTrashSprite.x && altBox.y === altTrashSprite.y) {
        altBox.remove()
        break; // Remove only the first altbox encountered
      }
    }
  }

  // Check if there are no boxes left
  const allBoxes = getAll(box).concat(getAll(altbox))
  if (allBoxes.length === 0) {
    // Proceed to the next level
    level++
    if (level < levels.length) {
      setMap(levels[level])
    }
  }
})