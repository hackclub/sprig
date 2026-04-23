/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: crazy
@description: random generator i made
@author: 
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/

const block_1 = "b"
const block_2 = "e"
const block_3 = "f"
const block_4 = "h"

setLegend(
  [ block_1, bitmap`
FFFF666666555555
FF66666665555577
F666666655555777
6666665555577777
6666555555777777
66555555577777C9
6555555577777C99
55555557777CC999
555555777CCC9999
55555777CCCC9999
555577CCCCC99999
55777CCCCC999993
5777CCCCCC999390
7777CCCCC9999930
777CCCCC99999300
77CCCCC999390000` ],
  [ block_2, bitmap`
CCCCC44444DDHHHH
CC4444444DDDHHHH
CC444444DDDHHHHH
CC4444DDDDHHHHHH
CC444DDDDHHHHHHH
CC44DDDDDHHHHHHH
CC44DDDDDHHHHHHC
CC44DDDDDHHHH44C
CC444DDDHHHH44CC
CC444DDDHHH444CC
CC444DDHHHC444CC
CC444HDHHHC444CC
CC444HHHHH444444
CC44HHHHH4444444
CC44HHHH44444444
CC44HHHH44444444` ],
  [ block_3, bitmap`
6666666333333333
6666666633333333
6666666333333333
6633333333333333
6666333333333333
6666333333333333
6666363333333333
6666663333333333
6666666666333333
6666999999333333
9999999999333333
9999999999993333
9999999999999993
9999999999999333
9999999999999999
9999999999999999` ],
  [ block_4, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHH8
HH88888888888888
H888888888888888
8888888888888888
88888HHHHHHHHHHH
8HHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHH8
HHHH888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888` ]
)

setSolids([])

let level = 0
const levels = [
  map`
be
fh`
]

setMap(levels[level])

setPushables({
  [ block_1 ]: []
})

onInput("s", () => {
  getFirst(block_1).y += 1
  getFirst(block_2).y += 1
  getFirst(block_3).y -= 1
  getFirst(block_4).y -= 1
})

onInput("w", () => {
  getFirst(block_1).y -= 1
  getFirst(block_2).y -= 1
  getFirst(block_3).y += 1
  getFirst(block_4).y += 1
})

onInput("a", () => {
  getFirst(block_1).x += 1
  getFirst(block_2).x -= 1
  getFirst(block_3).x += 1
  getFirst(block_4).x -= 1
})

onInput("d", () => {
  getFirst(block_1).x -= 1
  getFirst(block_2).x += 1
  getFirst(block_3).x -= 1
  getFirst(block_4).x += 1
})

onInput("i", () => {
  const wario = getFirst(block_3).x
  const bario = getFirst(block_3).y
  
  getFirst(block_3).x = getFirst(block_1).x
  getFirst(block_3).y = getFirst(block_1).y

  getFirst(block_1).x = wario
  getFirst(block_1).y = bario
})

onInput("k", () => {
  const wario = getFirst(block_4).x
  const bario = getFirst(block_4).y
  
  getFirst(block_4).x = getFirst(block_2).x
  getFirst(block_4).y = getFirst(block_2).y

  getFirst(block_2).x = wario
  getFirst(block_2).y = bario
})

afterInput(() => {
  
})