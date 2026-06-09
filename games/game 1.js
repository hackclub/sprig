/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: game 1
@description: 
@author: 
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
*/


function newtonhaslaws()
{ddd
if (getFirst(player).y-1 == getFirst(block).y){
}
  else{
if ( getFirst(player).y < 7) {
  getFirst(player).y += 1
}
  }
  
}
const player = "p"
const block = "b"
setLegend(

    [ block, bitmap`
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
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ]
)

setSolids([])

let level = 0
const levels = [
  map`
.........
b........
.b.......
...b..b..
.......b.
.........
....b...b
p.b...b..`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
afterInput(() => {

const newton = setInterval(newtonhaslaws, 1000);
const blockinterval = setInterval(collision, 330);
  
})