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
4444444444444444`]
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
.........
.........
.........
.........
.........
p........
fffffffff`
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
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {
  
})
while (1==1){
if (getFirst(player).y > 1) {
  while (i < 999999) {
    sleepbypass()
  }
  i = 0
  getFirst(player).y += 1
  jumped = 0
}}