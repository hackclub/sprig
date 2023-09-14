/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

const player = "p"
const playere = "e"
setLegend(
  [ player, bitmap`
................
....555.........
...55555555.....
..55555555555...
..555555555555..
.5550555505555..
.5555555555555..
.5555555555555..
.5555555555555..
.5555555555555..
.5555555555555..
.5555555555555..
..555555555555..
..55555555555...
...555555555....
....555555......` ],
  [ playere, bitmap`
................
....333.........
...33333333.....
..33333333333...
..333333333333..
.3330333303333..
.3333333333333..
.3333333333333..
.3333333333333..
.3333333333333..
.3333333333333..
.3333333333333..
..333333333333..
..33333333333...
...333333333....
....333333......` ],
)

setSolids([])

let level = 0
const levels = [
  map`
.......
.......
.......
.e...p.
.......
.......
.......`
]

setMap(levels[level])

setPushables({
  [player]: [playere]
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y += -1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("a", () => {
  getFirst(player).x += -1
})
onInput("k", () => {
  getFirst(playere).y += 1
})
onInput("i", () => {
  getFirst(playere).y += -1
})
onInput("l", () => {
  getFirst(playere).x += 1
})
onInput("j", () => {
  getFirst(playere).x += -1
})



afterInput(() => {
  const tileswitheandp = tilesWith(player, playere);
  if (tileswitheandp.lenght >0){
    addText("U got cought");
  }
    
  
});