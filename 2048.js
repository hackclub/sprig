/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 2048- new
@author: Waleed Ajmal
@tags: [puzzle,logic]
@addedOn: 2025-08-04
*/

const player = "p"
const two = "b"
const four = "c"
const eight = "d"
const sixteen = "f"
const thirtytwo = "g"
const sixtyfour = "h"
const onetwentyEight = "i"
const twofiftysix = "j"
const fivetwelve = "k"
const onezerotwofour= "l"
const twozerofoureight = "m"
const fourzeroninesix = "n"
const eightoneninetwo = "o"
const empty = "e"

setLegend(
  [ player, bitmap`
LLLL4444LLLLLLLL
LLL4LLLL4LLLLLLL
LL4LLLLLL4LLLLLL
LL4LLLLLL4LLLLLL
LL4LLLLLL4LLLLLL
LL4LLLLLL4LLLLLL
LL4LLLLLL4LLLLLL
LL4LLLLLL4LLLLLL
LL4LLLLLL4LLLLLL
LL4LLLLLL4LLLLLL
LLL4LLLL4LLLLLLL
LLLL4444LLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ two, bitmap`
1111111111111111
1110000000000111
1110111111110111
1110111111110111
1110111111110111
1110111111110111
1111111111110111
1111111111110111
1111111111110111
1110000000000111
1110111111111111
1110111111111111
1110111111111111
1110111111111111
1110000000000111
1111111111111111` ],
  [ four, bitmap`
2222222222222222
2220222222220222
2220222222220222
2220222222220222
2220222222220222
2220222222220222
2220222222220222
2220000000000222
2222222222220222
2222222222220222
2222222222220222
2222222222220222
2222222222220222
2222222222220222
2222222222222222
2222222222222222` ],
  [ eight, bitmap`
3333333333333333
3333000000003333
3333033333303333
3333033333303333
3333033333303333
3333033333303333
3333033333303333
3333033333303333
3333000000003333
3333033333303333
3333033333303333
3333033333303333
3333033333303333
3333033333303333
3333000000003333
3333333333333333` ],
  [ sixteen,bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCC0CC0000000CCC
CCC0CC0CCCCCCCCC
CCC0CC0CCCCCCCCC
CCC0CC0CCCCCCCCC
CCC0CC0CCCCCCCCC
CCC0CC0CCCCCCCCC
CCC0CC0000000CCC
CCC0CC0CCCCC0CCC
CCC0CC0CCCCC0CCC
CCC0CC0CCCCC0CCC
CCC0CC0CCCCC0CCC
CCC0CC0000000CCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [ thirtytwo, bitmap`
7777777777777777
7777777777777777
7770000070000077
7777777070777077
7777777070777077
7777777070777077
7777777070777077
7770000077777077
7770000077777077
7777777070000077
7777777070777777
7777777070777777
7777777070777777
7770000070000077
7777777777777777
7777777777777777`],
  [ sixtyfour, bitmap`
5555555555555555
5555555555555555
5550005550555055
5550555550555055
5550555550555055
5550555550555055
5550555550555055
5550555550555055
5550000050000055
5550555055555055
5550555055555055
5550555055555055
5550555055555055
5550000055555055
5555555555555555
5555555555555555`],
  [ onetwentyEight, bitmap`
6666666666666666
6666666666666666
6606000006000006
6606066606066606
6606066606066606
6606066606066606
6606666606066606
6606666606066606
6606000006000006
6606066666066606
6606066666066606
6606066666066606
6606066666066606
6606000006000006
6666666666666666
6666666666666666`],
  [ twofiftysix, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
F0000F0000F0000F
F0FF0F0FFFF0FFFF
F0FF0F0FFFF0FFFF
FFFF0F0FFFF0FFFF
FFFF0F0FFFF0FFFF
FFFF0F0FFFF0FFFF
F0000F0000F0000F
F0FFFFFFF0F0FF0F
F0FFFFFFF0F0FF0F
F0FFFFFFF0F0FF0F
F0FFFFFFF0F0FF0F
F0000F0000F0000F
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],
  [ fivetwelve, bitmap`
4444444444444444
4444444444444444
4400004040000044
4404444040444044
4404444040444044
4404444040444044
4404444044444044
4404444044444044
4400004040000044
4444404040444444
4444404040444444
4444404040444444
4444404040444444
4400004040000044
4444444444444444
4444444444444444`],
  [ onezerotwofour, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
D0D000D0000D0D0D
D0D0D0D0DD0D0D0D
D0D0D0D0DD0D0D0D
D0D0D0DDDD0D0D0D
D0D0D0DDDD0D0D0D
D0D0D0DDDD0D0D0D
D0D0D0D0000D000D
D0D0D0D0DDDDDD0D
D0D0D0D0DDDDDD0D
D0D0D0D0DDDDDD0D
D0D0D0D0DDDDDD0D
D0D000D0000DDD0D
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ twozerofoureight, bitmap`
8888888888888888
8888888888888888
8000800080808000
8880808080808080
8880808080808080
8880808080808080
8880808080808080
8880808080808000
8000808080008080
8088808088808080
8088808088808080
8088808088808080
8088808088808080
8000800088808000
8888888888888888
8888888888888888` ],
  [ fourzeroninesix, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
H0H0H000H000H000
H0H0H0H0H0H0H0HH
H0H0H0H0H0H0H0HH
H0H0H0H0H0H0H0HH
H0H0H0H0H0H0H0HH
H0H0H0H0H0H0H0HH
H000H0H0H000H000
HHH0H0H0HHH0H0H0
HHH0H0H0HHH0H0H0
HHH0H0H0HHH0H0H0
HHH0H0H0HHH0H0H0
HHH0H000HHH0H000
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH` ],
  [ eightoneninetwo, bitmap`
9999999999999999
9999999999999999
9000909000900009
9090909090909909
9090909090999909
9090909090999909
9090909090999909
9000909000900009
9090909990909999
9090909990909999
9090909990909999
9090909990909999
9090909990909999
9000909990900009
9999999999999999
9999999999999999` ],
  [ empty, bitmap`
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
................` ]
)

setSolids([])

let level = map`
eeee
eeee
eeee
eeee`

setMap(level)

function randomEmptyTile() {
  let empties = tilesWith(empty)
  if (empties.length == 0) return
  let i = Math.floor(Math.random() * empties.length)
  let choice = empties[i][0]
  addSprite(choice.x, choice.y, two)
}

// Add two random 2s to start
randomEmptyTile()
randomEmptyTile()

function getNextTile(current) {
  const order = [two, four, eight, sixteen, thirtytwo, sixtyfour, onetwentyEight, twofiftysix, fivetwelve, onezerotwofour, twozerofoureight, fourzeroninesix, eightoneninetwo]
  let idx = order.indexOf(current)
  return idx >= 0 && idx < order.length - 1 ? order[idx + 1] : current
}

function slideRow(row) {
  let newRow = row.filter(tile => tile !== empty)
  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i+1]) {
      newRow[i] = getNextTile(newRow[i])
      newRow[i+1] = empty
    }
  }
  newRow = newRow.filter(tile => tile !== empty)
  while (newRow.length < 4) newRow.push(empty)
  return newRow
}

function slideLeft() {
  for (let y = 0; y < 4; y++) {
    let row = []
    for (let x = 0; x < 4; x++) {
      let t = getTile(x, y)
      row.push(t.length > 0 ? t[0].type : empty)
    }
    let newRow = slideRow(row)
    for (let x = 0; x < 4; x++) {
      clearTile(x, y)
      addSprite(x, y, newRow[x])
    }
  }
  checkGameOver()
  randomEmptyTile()
}

function slideRight() {
  for (let y = 0; y < 4; y++) {
    let row = []
    for (let x = 3; x >= 0; x--) {
      let t = getTile(x, y)
      row.push(t.length > 0 ? t[0].type : empty)
    }
    let newRow = slideRow(row)
    for (let x = 3; x >= 0; x--) {
      clearTile(x, y)
      addSprite(x, y, newRow[3 - x])
    }
  }
  checkGameOver()
  randomEmptyTile()
}

function slideUp() {
  for (let x = 0; x < 4; x++) {
    let col = []
    for (let y = 0; y < 4; y++) {
      let t = getTile(x, y)
      col.push(t.length > 0 ? t[0].type : empty)
    }
    let newCol = slideRow(col)
    for (let y = 0; y < 4; y++) {
      clearTile(x, y)
      addSprite(x, y, newCol[y])
    }
  }
  checkGameOver()
  randomEmptyTile()
}

function slideDown() {
  for (let x = 0; x < 4; x++) {
    let col = []
    for (let y = 3; y >= 0; y--) {
      let t = getTile(x, y)
      col.push(t.length > 0 ? t[0].type : empty)
    }
    let newCol = slideRow(col)
    for (let y = 3; y >= 0; y--) {
      clearTile(x, y)
      addSprite(x, y, newCol[3 - y])
    }
  }
  checkGameOver()
  randomEmptyTile()
}

onInput("a", () => slideLeft())
onInput("d", () => slideRight())
onInput("w", () => slideUp())
onInput("s", () => slideDown())

function checkGameOver() {
  let tiles = tilesWith(empty)
  if (tiles.length > 0) return
  for (let y = 0; y < 4; y++) {
    for (let x = 0; x < 4; x++) {
      let here = getTile(x, y)[0]?.type
      if (x < 3 && getTile(x + 1, y)[0]?.type === here) return
      if (y < 3 && getTile(x, y + 1)[0]?.type === here) return
    }
  }
  addText("Game Over!", { y: 7, color: color`0` })
}
