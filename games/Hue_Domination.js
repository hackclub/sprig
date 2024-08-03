/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Hue Domination
@author: Gus Ruben
@tags: [2-Player, Multiplayer, PVP]
@addedOn: 2024-00-00
*/

const player1 = "1"
const player2 = "2"
const paintBlue = "b"
const paintRed = "r"
const background = "g"

setLegend(
  [ player1, bitmap`
......0000......
......0660......
......0630......
......0330......
......0330......
......0000......
.......0........
.......000000000
...............0
..000000000000.0
..066663666360.0
..06333333333000
..063333333330..
..033333333330..
..000000000000..
................` ],
  [ player2, bitmap`
......0000......
......0770......
......0750......
......0550......
......0550......
......0000......
.......0........
.......000000000
...............0
..000000000000.0
..077775777570.0
..07555555555000
..075555555550..
..055555555550..
..000000000000..
................` ],
  [ background, bitmap`
2121212122222222
1212121222222222
2121212122222222
1212121222222222
2121212122222222
1212121222222222
2121212122222222
1212121222222222
2222222212121212
2222222221212121
2222222212121212
2222222221212121
2222222212121212
2222222221212121
2222222212121212
2222222221212121` ]
)

setSolids([])

let level = 0
const levels = [
  map`
.........2
..........
..........
..........
..........
..........
..........
1.........`
]

setBackground(background)
setMap(levels[level])

const controls = {
  "1": {
    "s": p => p.y += 1,
    "w": p => p.y -= 1,
    "d": p => p.x += 1,
    "a": p => p.x -= 1,
  },
  "2": {
    "k": p => p.y += 1,
    "i": p => p.y -= 1,
    "l": p => p.x += 1,
    "j": p => p.x -= 1,
  }
}

Object.keys(controls).forEach(player => {
  Object.keys(controls[player]).forEach(key => {
    onInput(key, () => {
      const p = getFirst(player);
      controls[player][key](p)
    })
  })
})

afterInput(() => {
  
})