/*
@title: Get 500 Coins
@author: oliverlinux
@tags: ['timed']
@addedOn: 2024-06-19
*/
let jumped = 0
const player = "p"
let fakecoin = "e"
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
6666666666666666`],
  [fakecoin, bitmap`
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
3333333333333333`]
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
..e.c...c.e...c.c.c.e.c.c.c
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
  if (tilesWith(player,fakecoin)[0] != null) {
  point -= 99999
  clearText()
  addText("You Lose!", {x: 1, y: 1, color: color`3`})
    getFirst(player).remove()
  }
  if (tilesWith(player,coin)[0] != null) {
  point += 1
  clearText()
  addText(String(point), {x: 1, y: 1, color: color`5`})
  }
})
onInput("a", () => {
  getFirst(player).x -= 1
  if (tilesWith(player,fakecoin)[0] != null) {
  point -= 99999
  clearText()
  addText("You Lose!", {x: 1, y: 1, color: color`3`})
    getFirst(player).remove()
  }
  if (tilesWith(player,coin)[0] != null) {
  point += 1
  clearText()
  addText(String(point), {x: 1, y: 1, color: color`5`})
  }
})
onInput("d", () => {
  getFirst(player).x += 1
  if (tilesWith(player,fakecoin)[0] != null) {
  point -= 99999
  clearText()
  addText("You Lose!", {x: 1, y: 1, color: color`3`})
    getFirst(player).remove()
  }
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
  if (point >=500) {
      clearText()
  addText("You Win!", {x: 1, y: 1, color: color`6`})
    getFirst(player).remove()
    }
  if (jumped == 1){
    jumped = 2
  }
})
