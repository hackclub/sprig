/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const wall = "w"
const finish = "f"

setLegend(
  [ player, bitmap`
................
......00000.....
.....00...00....
.....0.....0....
.....0.....0....
.....00...00....
......00000.....
........00......
.....0000000....
........0.......
........0.......
........00......
.......0.0......
.......0..0.....
.....00...00....
................`],
  [wall, bitmap`
................
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
0000000000000000`],
  [finish, bitmap`
44444DDDDDD44444
44444DDDDDD44444
44444DDDDDD44444
44444DDDDDD44444
DDDDD444444DDDDD
DDDDD444444DDDDD
DDDDD444444DDDDD
DDDDD444444DDDDD
DDDDD444444DDDDD
44444DDDDDD44444
44444DDDDDD44444
44444DDDDDD44444
44444DDDDDD44444
DDDDD444444DDDDD
DDDDD444444DDDDD
DDDDD444444DDDDD`]
)

setSolids([wall,player])

let level = 0
const levels = [
  map`
pw...w.f
.w.w.w..
.w.w.w..
.w.w.w..
.w.w.w..
.w.w.w..
...w....`
  
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})

afterInput(() => {
  const numberCovered = tilesWith(finish, player).length;
  if (numberCovered === 1) {
        level = level + 1;
        const currentLevel = levels[level];
        if (currentLevel !== undefined) {
            setMap(currentLevel);
        } else {
            addText("you win!", { y: 4, color: color`D` });
        }
})