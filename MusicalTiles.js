/*
@title: MusicalTiles
@author: Shreeya Rani
*/

const pink = "a";
const pinkpurple = "b"
const pinknopurple = "c"
const nopinkpurple = "d"
const purple = "e";
const purpleBlue = "f"
const purplenoBlue = "g"
const nopurpleBlue = "h"
const blue = "i";
const blueYellow = "j"
const bluenoYellow = "k"
const noblueYellow = "l"
const yellow = "m";
const yellowpink = "n"
const yellownopink = "o"
const noyellowpink = "p"
const center = "q"
const centerpink = "r"
const centerpurple = "s"
const centerBlue = "t"
const centerYellow = "u"
const black = "v"


setLegend(
  [ pink, bitmap`
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`],
  
  [ pinkpurple, bitmap`
8888888888888888
888888888888888H
88888888888888HH
8888888888888HHH
888888888888HHHH
88888888888HHHHH
8888888888HHHHHH
888888888HHHHHHH
88888888HHHHHHHH
8888888HHHHHHHHH
888888HHHHHHHHHH
88888HHHHHHHHHHH
8888HHHHHHHHHHHH
888HHHHHHHHHHHHH
88HHHHHHHHHHHHHH
8HHHHHHHHHHHHHHH`],
  [ pinknopurple, bitmap`
8888888888888888
888888888888888.
88888888888888..
8888888888888...
888888888888....
88888888888.....
8888888888......
888888888.......
88888888........
8888888.........
888888..........
88888...........
8888............
888.............
88..............
8...............`],
  [ nopinkpurple, bitmap`
................
...............H
..............HH
.............HHH
............HHHH
...........HHHHH
..........HHHHHH
.........HHHHHHH
........HHHHHHHH
.......HHHHHHHHH
......HHHHHHHHHH
.....HHHHHHHHHHH
....HHHHHHHHHHHH
...HHHHHHHHHHHHH
..HHHHHHHHHHHHHH
.HHHHHHHHHHHHHHH`],

  [ purple, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [ purpleBlue, bitmap`
HHHHHHHHHHHHHHHH
5HHHHHHHHHHHHHHH
55HHHHHHHHHHHHHH
555HHHHHHHHHHHHH
5555HHHHHHHHHHHH
55555HHHHHHHHHHH
555555HHHHHHHHHH
5555555HHHHHHHHH
55555555HHHHHHHH
555555555HHHHHHH
5555555555HHHHHH
55555555555HHHHH
555555555555HHHH
5555555555555HHH
55555555555555HH
555555555555555H`],
  [ purplenoBlue, bitmap`
HHHHHHHHHHHHHHHH
.HHHHHHHHHHHHHHH
..HHHHHHHHHHHHHH
...HHHHHHHHHHHHH
....HHHHHHHHHHHH
.....HHHHHHHHHHH
......HHHHHHHHHH
.......HHHHHHHHH
........HHHHHHHH
.........HHHHHHH
..........HHHHHH
...........HHHHH
............HHHH
.............HHH
..............HH
...............H`],
  [ nopurpleBlue, bitmap`
................
5...............
55..............
555.............
5555............
55555...........
555555..........
5555555.........
55555555........
555555555.......
5555555555......
55555555555.....
555555555555....
5555555555555...
55555555555555..
555555555555555.`],

  [ blue, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [ blueYellow, bitmap`
6666666666666665
6666666666666655
6666666666666555
6666666666665555
6666666666655555
6666666666555555
6666666665555555
6666666655555555
6666666555555555
6666665555555555
6666655555555555
6666555555555555
6665555555555555
6655555555555555
6555555555555555
5555555555555555`],
  [ bluenoYellow, bitmap`
...............5
..............55
.............555
............5555
...........55555
..........555555
.........5555555
........55555555
.......555555555
......5555555555
.....55555555555
....555555555555
...5555555555555
..55555555555555
.555555555555555
5555555555555555`],
  [ noblueYellow, bitmap`
666666666666666.
66666666666666..
6666666666666...
666666666666....
66666666666.....
6666666666......
666666666.......
66666666........
6666666.........
666666..........
66666...........
6666............
666.............
66..............
6...............
................`],

  [ yellow, bitmap`
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
  [ yellowpink, bitmap`
6888888888888888
6688888888888888
6668888888888888
6666888888888888
6666688888888888
6666668888888888
6666666888888888
6666666688888888
6666666668888888
6666666666888888
6666666666688888
6666666666668888
6666666666666888
6666666666666688
6666666666666668
6666666666666666`],
  [ yellownopink, bitmap`
6...............
66..............
666.............
6666............
66666...........
666666..........
6666666.........
66666666........
666666666.......
6666666666......
66666666666.....
666666666666....
6666666666666...
66666666666666..
666666666666666.
6666666666666666`],
  [ noyellowpink, bitmap`
.888888888888888
..88888888888888
...8888888888888
....888888888888
.....88888888888
......8888888888
.......888888888
........88888888
.........8888888
..........888888
...........88888
............8888
.............888
..............88
...............8
................`],

  [ center, bitmap`
6888888888888888
668888888888888H
66688888888888HH
6666888888888HHH
666668888888HHHH
66666688888HHHHH
6666666888HHHHHH
666666668HHHHHHH
66666665HHHHHHHH
666666555HHHHHHH
6666655555HHHHHH
66665555555HHHHH
666555555555HHHH
6655555555555HHH
65555555555555HH
555555555555555H`],
  [ centerpink, bitmap`
6...............
66.............H
666...........HH
6666.........HHH
66666.......HHHH
666666.....HHHHH
6666666...HHHHHH
66666666.HHHHHHH
66666665HHHHHHHH
666666555HHHHHHH
6666655555HHHHHH
66665555555HHHHH
666555555555HHHH
6655555555555HHH
65555555555555HH
555555555555555H`],
  [ centerpurple, bitmap`
6888888888888888
668888888888888.
66688888888888..
6666888888888...
666668888888....
66666688888.....
6666666888......
666666668.......
66666665........
666666555.......
6666655555......
66665555555.....
666555555555....
6655555555555...
65555555555555..
555555555555555.`],
  [ centerBlue, bitmap`
6888888888888888
668888888888888H
66688888888888HH
6666888888888HHH
666668888888HHHH
66666688888HHHHH
6666666888HHHHHH
666666668HHHHHHH
6666666.HHHHHHHH
666666...HHHHHHH
66666.....HHHHHH
6666.......HHHHH
666.........HHHH
66...........HHH
6.............HH
...............H`],
  [ centerYellow, bitmap`
.888888888888888
..8888888888888H
...88888888888HH
....888888888HHH
.....8888888HHHH
......88888HHHHH
.......888HHHHHH
........8HHHHHHH
.......5HHHHHHHH
......555HHHHHHH
.....55555HHHHHH
....5555555HHHHH
...555555555HHHH
..55555555555HHH
.5555555555555HH
555555555555555H`],
  
  [ black, bitmap`
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
0000000000000000`]
);

let maps = {
  default: map`
nab
mqe
jif`,
  purple: map`
nac
ms.
jih`,
  blue: map`
nab
mte
l.g`,
  yellow: map`
pab
.ue
kif`,
  pink: map`
o.d
mre
jif`,
  blank: map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........`
}

setMap(maps.default);

const colors = ["purple", "blue", "yellow", "pink"]

const pinkTune = tune`
500: d5^500 + f5~500 + b4~500,
15500`
const purpleTune = tune`
500: c5^500 + a4~500 + e5~500 + f4~500 + g5~500,
15500`
const blueTune = tune`
500: c5~500 + e5~500 + f4~500 + g5~500 + a4^500,
15500`
const yellowTune = tune`
500: a4^500 + g4~500 + b4~500 + c5~500 + d5^500,
15500`

const setColor = (val) => {
  switch (val) {
    case "purple":
      playTune(purpleTune)
      break
    case "blue":
      playTune(blueTune)
      break
    case "yellow":
      playTune(yellowTune)
      break
    case "pink":
      playTune(pinkTune)
      break
  }
  setMap(maps[val])
}

let sequence = []
let current = 0
let gameOver = false
let animating = false

const hitEnd = () => {
  current = 0
  sequence.push(colors[Math.floor(Math.random()*colors.length)])
  animating = true
  sequenceAnimation(0)
}

const sequenceAnimation = (i) => {
  if (i == sequence.length) return animating = false

  setColor(sequence[i])
  setTimeout(() => {
    setColor("default")
    setTimeout(() => sequenceAnimation(i + 1), 200)
  }, 500)
}

const check = val => {

  if (gameOver || animating) return
  
  if (sequence[current] == val) {
    animating = true
    setColor(val)
      setTimeout(() => {
        setColor("default")
        animating = false
      }, 200)
    current++
    if (current == sequence.length) setTimeout(() => {
        hitEnd()
      }, 500)
  } else {
    setColor("blank")
    addText("Game Over!", { y: 4 })
    addText(`Score: ${sequence.length - 1}`, {y: 6})
    gameOver = true
  }
}

onInput("w", () => {
  check("pink")
});

onInput("a", () => {
  check("yellow")
});

onInput("s", () => {
  check("blue")
});

onInput("d", () => {
  check("purple")
});

hitEnd()
