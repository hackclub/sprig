/*
@title: conveyors
@description: A sandbox game where you use conveyors. The "$" (dollar sign symbol) brings you back to the starting point. The "eraser" (pink rectangle) erases tiles. The arrows with symbols behind them are trampolines that jump 2 spaces ahead.
@author: koa
@tags: ['sandbox', 'factory']
@addedOn: 2025-7-11
*/
const add = tune`
178.57142857142858: E4/178.57142857142858,
5535.714285714286`
const toon = tune`
333.3333333333333: A4/333.3333333333333,
333.3333333333333: G4/333.3333333333333,
333.3333333333333: A4/333.3333333333333,
333.3333333333333: G4/333.3333333333333,
333.3333333333333: A4/333.3333333333333,
333.3333333333333: B4/333.3333333333333,
333.3333333333333: B4/333.3333333333333,
333.3333333333333: A4/333.3333333333333,
333.3333333333333: A4/333.3333333333333,
333.3333333333333: G4/333.3333333333333,
333.3333333333333: A4/333.3333333333333,
333.3333333333333: G4/333.3333333333333,
333.3333333333333: A4/333.3333333333333,
333.3333333333333: C4/333.3333333333333,
333.3333333333333,
333.3333333333333: C4/333.3333333333333,
333.3333333333333: A4/333.3333333333333,
333.3333333333333: G4/333.3333333333333,
333.3333333333333: A4/333.3333333333333,
333.3333333333333: G4/333.3333333333333,
333.3333333333333: A4/333.3333333333333,
333.3333333333333: B4/333.3333333333333,
333.3333333333333: B4/333.3333333333333,
333.3333333333333: A4/333.3333333333333,
333.3333333333333: A4/333.3333333333333,
333.3333333333333: G4/333.3333333333333,
333.3333333333333: A4/333.3333333333333,
333.3333333333333: G4/333.3333333333333,
333.3333333333333: A4/333.3333333333333,
333.3333333333333: C4/333.3333333333333,
333.3333333333333,
333.3333333333333: C4/333.3333333333333`
const item = "q"
const player = "w"
const colore = "k"
const lbor = "l"
const cbor1 = "c"
const bbor = "z"
const cbor2 = "d"
const rbor = "x"
const red = "r"
const blue = "b"
const green = "g"
const yellow = "y"
const pink = "p"
const purple = "u"
const orange = "o"
const black = "i"
const grey = "n"
const p = "1"
const i = "2"
const x = "3"
const e = "4"
const l = "5"
const t = "6"
const r = "7"
const o = "8"
const n = "9"
const eraser = "e"

setLegend(
  [player, bitmap`
000..........000
0..............0
0..............0
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
0..............0
0..............0
000..........000`],
  [colore, bitmap`
0.00..00..00..00
0...............
...............0
...............0
0...............
0...............
...............0
...............0
0...............
0...............
...............0
...............0
0...............
0...............
...............0
00..00..00..00.0`],
  [item, bitmap`
................
................
................
................
.......FFF......
......F666F.....
.....F64646F....
.....F64466F....
.....F64446F....
......F666F.....
.......FFF......
................
................
................
................
................`],
  [lbor, bitmap`
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00`],
  [cbor1, bitmap`
0000000000000000
0000000000000000
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL`],
  [bbor, bitmap`
0000000000000000
0000000000000000
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
  [cbor2, bitmap`
0000000000000000
0000000000000000
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00
LLLLLLLLLLLLLL00`],
  [rbor, bitmap`
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL
00LLLLLLLLLLLLLL`],
  [red, bitmap`
LLLLLLL66LLLLLLL
LLLLLL6666LLLLLL
LLLLLL6666LLLLLL
LLLLLLL66LLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLL66666666LLLL
LLLLL666666LLLLL
LLLLLL6666LLLLLL
LLLLLLL66LLLLLLL
LLLLLLLLLLLLLLLL`],
  [green, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLL66666666LLLL
LLLLL666666LLLLL
LLLLLL6666LLLLLL
LLLLLLL66LLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [blue, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLL66LLLLLLL
LLLLLL6666LLLLLL
LLLLL666666LLLLL
LLLL66666666LLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [yellow, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLL6LLLLLLLLL
LLLLL66LLLLLLLLL
LLLL666LLLLLLLLL
LLL6666666666LLL
LLL6666666666LLL
LLLL666LLLLLLLLL
LLLLL66LLLLLLLLL
LLLLLL6LLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [orange, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLL6LLLLLL
LLLLLLLLL66LLLLL
LLLLLLLLL666LLLL
LLL6666666666LLL
LLL6666666666LLL
LLLLLLLLL666LLLL
LLLLLLLLL66LLLLL
LLLLLLLLL6LLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [purple, bitmap`
4444444444444444
4444444444444444
4444444D44444444
4444444D44444444
44444DDDDD444444
4444D44D44444444
4444D44D44444444
44444DDDDD444444
4444444D44D44444
4444444D44D44444
44444DDDDD444444
4444444D44444444
4444444D44444444
4444444444444444
4444444444444444
4444444444444444`],
  [pink, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [black, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLL66LLLLLLL
LLLLLL6666LLLLLL
LLLLL666666LLLLL
LLLL66666666LLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLLLLLLLLLLL
LLLLLL6666LLLLLL
LLLLLL6LL6LLLLLL
LLLLLLL66LLLLLLL
LLLLLL6LL6LLLLLL`],
  [grey, bitmap`
LLLLLL6666LLLLLL
LLLLLL6LL6LLLLLL
LLLLLLL66LLLLLLL
LLLLLL6LL6LLLLLL
LLLLLLLLLLLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
LLLL66666666LLLL
LLLLL666666LLLLL
LLLLLL6666LLLLLL
LLLLLLL66LLLLLLL
LLLLLLLLLLLLLLLL`],
  [p, bitmap`
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
  [t, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLL6LLLL
LLLLLLLLLLL66LLL
6666LLLLLLL666LL
6LL6L6666666666L
L66LL6666666666L
6LL6LLLLLLL666LL
LLLLLLLLLLL66LLL
LLLLLLLLLLL6LLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [i, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLL6LLLLLLLLLLL
LLL66LLLLLLLLLLL
LL666LLLLLLL6666
L6666666666L6LL6
L6666666666LL66L
LL666LLLLLLL6LL6
LLL66LLLLLLLLLLL
LLLL6LLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [e, bitmap`
HHHHHHHH00000000
HHHHHHHH00000000
HHHHHHHH00000000
HHHHHHHH00000000
HHHHHHHH00000000
HHHHHHHH00000000
HHHHHHHH00000000
HHHHHHHH00000000
00000000HHHHHHHH
00000000HHHHHHHH
00000000HHHHHHHH
00000000HHHHHHHH
00000000HHHHHHHH
00000000HHHHHHHH
00000000HHHHHHHH
00000000HHHHHHHH`],
  [x, bitmap`
HHHHHHHH00000000
HHHHHHHH00000000
HHHHHHHH00000000
HHHHHHHH00000000
HHHHHHHH00000000
HHHHHHHH00000000
HHHHHHHH00000000
HHHHHHHH00000000
00000000HHHHHHHH
00000000HHHHHHHH
00000000HHHHHHHH
00000000HHHHHHHH
00000000HHHHHHHH
00000000HHHHHHHH
00000000HHHHHHHH
00000000HHHHHHHH`],
  [eraser, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111188888811111
1111188888811111
1111188888811111
1111188888811111
1111122222211111
1111122222211111
1111122222211111
1111122222211111
1111122222211111
1111122222211111
1111111111111111
1111111111111111
1111111111111111`],

)

setSolids([player, colore, red, lbor, cbor1, bbor, cbor2, rbor, p])
let level = 0
const levels = [
  map`
r...........
............
............
............
.....w......
............
............
............
zzzzzzzzzzdd
oygbuein62lq`,
]

const playback = playTune(toon, Infinity)

setMap(levels[level])

addText("WASD to move", {
  x: 4,
  y: 1
})

addText("J L to change\ntile", {
  x: 4,
  y: 3
})

addText("I to place \ntile", {
  x: 4,
  y: 6
})

addText("K to start \nsimulation", {
  x: 4,
  y: 9
})
setBackground(pink)
colors = [orange, yellow, green, blue, purple, pink, black, grey, t, i]

onInput("i", () => {
  playTune(add)
  let x = getFirst(player).x
  let y = getFirst(player).y
  clearTile(getFirst(player).x, getFirst(player).y)
  addSprite(x, y, player)
  addSprite(getFirst(player).x, getFirst(player).y, colors[getFirst(colore).x])
})
onInput("k", () => {
  let x2 = getFirst(red).x
  let y2 = getFirst(red).y
  getFirst(item).y = [y2]
  getFirst(item).x = [x2]
})

onInput("j", () => {
  getFirst(colore).x -= 1
})
onInput("l", () => {
  getFirst(colore).x += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {
  clearText()

})

var gameLoop = setInterval(() => {

  // Check if there is a tile with both a conveyor and the item
  const tileWithBlockAndPlayer = tilesWith("q", "g")

  // Check if the list is not empty
  if (tileWithBlockAndPlayer.length > 0) {
    getFirst(item).y += 1
  } else {
    const tileWithBlockAndPlayer = tilesWith("q", "b")

    // Check if the list is not empty
    if (tileWithBlockAndPlayer.length > 0) {
      getFirst(item).y -= 1
    } else {
      const tileWithBlockAndPlayer = tilesWith("q", "o")

      // Check if the list is not empty
      if (tileWithBlockAndPlayer.length > 0) {
        getFirst(item).x += 1
      } else {
        const tileWithBlockAndPlayer = tilesWith("q", "y")

        // Check if the list is not empty
        if (tileWithBlockAndPlayer.length > 0) {
          getFirst(item).x -= 1
        } else {
          const tileWithBlockAndPlayer = tilesWith("q", "u")

          // Check if the list is not empty
          if (tileWithBlockAndPlayer.length > 0) {
            let x2 = getFirst(red).x
            let y2 = getFirst(red).y
            getFirst(item).y = [y2]
            getFirst(item).x = [x2]
          } else {
            const tileWithBlockAndPlayer = tilesWith("q", "r")

            // Check if the list is not empty
            if (tileWithBlockAndPlayer.length > 0) {
              getFirst(item).y += 1
            } else {
              const tileWithBlockAndPlayer = tilesWith("q", )

              // Check if the list is not empty
              if (tileWithBlockAndPlayer.length > 0) {
                const tileWithBlockAndPlayer = tilesWith("q", "n")

                // Check if the list is not empty
                if (tileWithBlockAndPlayer.length > 0) {
                  getFirst(item).y += 2
                } else {
                  const tileWithBlockAndPlayer = tilesWith("q", "2")

                  // Check if the list is not empty
                  if (tileWithBlockAndPlayer.length > 0) {
                    getFirst(item).x -= 2
                  } else {
                    const tileWithBlockAndPlayer = tilesWith("q", "6")

                    // Check if the list is not empty
                    if (tileWithBlockAndPlayer.length > 0) {
                      getFirst(item).x += 2
                    } else {
                      const tileWithBlockAndPlayer = tilesWith("q", "i")

                      // Check if the list is not empty
                      if (tileWithBlockAndPlayer.length > 0) {
                        getFirst(item).y -= 2
                      } else {
                        const tileWithBlockAndPlayer = tilesWith("k")

                        // Check if the list is not empty
                        if (tileWithBlockAndPlayer.length > 0) {

                        } else {
                          addSprite(0, 9, "k")
                        }
                      }
                    }
                  }
                }
              } else {
                addSprite(11, 9, "q")
                let x2 = getFirst(red).x
                let y2 = getFirst(red).y
                getFirst(item).y = [9]
                getFirst(item).x = [11]
              }
            }
          }
        }
      }
    }
  }

}, 300);