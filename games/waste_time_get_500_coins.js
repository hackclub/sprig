/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Get 500 Coins
@author: oliverlinux
@tags: ["time-waster"]
@addedOn: 2024-00-00
*/
let jumped = 0
const player = "p"
let point = 0
let coin = "c"
const floor = "f"
let x = 0
let y = 0
let ii = 0
let i = 0
let mathforsleepbypass = 0
setLegend(
  [ player, bitmap`
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
0000000000000000` ],
  [floor, bitmap`
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
4444444444444444`],
  [coin, bitmap`
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
6666666666666666`]
)
function sleepbypass(){

  ii = performance.now()
  while (performance.now() - ii < 999) {
    
  }
  
  ii = 0
}
setSolids([floor, player])

let level = 0
const levels = [
  map`
...........................
...........................
...........................
...........................
...........................
...........................
...........................
...........................
...........................
...........................
...........................
...........................
...........................
...........................
...........................
...........................
...........................
...........................
..c.c.c.c.c.c.c.c.c.c.c.c.c
pc.c.c.c.c.c.c.c.c.c.c.c.c.
fffffffffffffffffffffffffff`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})
onInput("w", () => {
  if (jumped == 0){
  getFirst(player).y -= 1
  jumped = 1
  }
  if (tilesWith(player,coin)[0] != null) {
  point += 1
  clearText()
  addText(String(point), {x: 1, y: 1, color: color`5`})
  }
})
onInput("a", () => {
  getFirst(player).x -= 1
  if (tilesWith(player,coin)[0] != null) {
  point += 1
  clearText()
  addText(String(point), {x: 1, y: 1, color: color`5`})
  }
})
onInput("d", () => {
  getFirst(player).x += 1
  if (tilesWith(player,coin)[0] != null) {
  point += 1
  clearText()
  addText(String(point), {x: 1, y: 1, color: color`5`})
  }
})

afterInput(() => {
  
  if (jumped == 2){
    getFirst(player).y += 1
    jumped = 0
    if (tilesWith(player,coin)[0] != null) {
  point += 1
  clearText()
  addText(String(point), {x: 1, y: 1, color: color`5`})
  }
  }
  if (jumped == 1){
    jumped = 2
  }
})