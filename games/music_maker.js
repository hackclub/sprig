/*
@title: music maker
@description: A game where you can create your own music.
@author: Yarne Meuris
@tags: []
@addedOn: 2025-08-05
*/

const tile = "t"
const player = "p"
const sine = "s"
const triangle = "r"
const square = "q"
const saw = "a"

setLegend(
  [tile, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0000000000000000`],
  [sine, bitmap`
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
3333333333333333`],
  [triangle, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [square, bitmap`
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
  [saw, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  [player, bitmap`
5555555555555555
5555555555555555
55............55
55............55
55............55
55............55
55............55
55............55
55............55
55............55
55............55
55............55
55............55
55............55
5555555555555555
5555555555555555`]
)

const level = map`
p...................
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

const notes = ["C3", "D3", "E3", "F3", "G3", "A4", "B4", "C4", "D4", "E4", "F4", "G4", "A5", "B5", "C5", "D5"]
const instruments = ["", "~", "^", "-", "/", ""]
const sprites = [tile, sine, triangle, square, saw, tile]

setMap(level)
setBackground(tile)

var song = []
for (i = 0; i < 20; i++) {
  song.push(["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""])
}

playTune("250: D5~250 + C5~250 + D3~250 + C3~250, 250: D5^250 + C5^250 + D3^250 + C3^250, 250: D5-250 + C5-250 + D3-250 + C3-250, 250: D5/250 + C5/250 + D3/250 + C3/250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 250, 3000")

function changeNote(position, value) {
  const index = instruments.indexOf(song[position.x][position.y].substr(2))+ value
  var newNote = instruments[index]

  if (newNote != "") {
    newNote = notes[15 - position.y] + newNote
  }

  song[position.x][position.y] = newNote

  clearTile(position.x, position.y)
  addSprite(position.x, position.y, sprites[index])
  addSprite(position.x, position.y, player)
}

onInput("l", () => {
  const position = getFirst(player);

  if (song[position.x][position.y] == "") {
    clearTile(position.x, position.y)
    addSprite(position.x, position.y, sine)
    addSprite(position.x, position.y, player)
    song[position.x][position.y] = notes[15 - position.y] + instruments[1]
    return
  }

  changeNote(position, 1)
})

onInput("j", () => {
  const position = getFirst(player);

  if (song[position.x][position.y] == "") {
    clearTile(position.x, position.y)
    addSprite(position.x, position.y, saw)
    addSprite(position.x, position.y, player)
    song[position.x][position.y] = notes[15 - position.y] + instruments[4]
    return
  }

  changeNote(position, -1)
})

onInput("k", () => {
  var sound = ""
  for (var section of song) {
    sound += "250"
    if (section.every((value) => { return value == ""; })) {
      sound += ", "
      continue;
    }

    sound += ": "
    var firstNote = true
    for (var n in section) {
      var note = section[n]
      if (note == "") continue

      sound += firstNote ? "" : " + "
      firstNote = false

      sound += note
      sound += "250"
    }
    sound += ", "
  }

  sound += "3000"

  console.log(sound)
  playTune(sound, 1)
})

onInput("s", () => {
  getFirst(player).y++
})

onInput("w", () => {
  getFirst(player).y--
})

onInput("d", () => {
  getFirst(player).x++
})

onInput("a", () => {
  getFirst(player).x--
})

afterInput(() => {

})
