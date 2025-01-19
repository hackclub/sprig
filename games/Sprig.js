/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Sprig
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p";
const apple = "a";

let score = 0;

setLegend(
  [player, bitmap`
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
................`],
  [apple, bitmap`
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

setSolids([])

let level = 0
const levels = [
  map`
..........
..........
..........
......a...
..........
..........
..........
..........
p.........
..........`
]

setMap(levels[level])

setPushables({
  [player]: []
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {
  if (getFirst(player).x === getFirst(apple).x && getFirst(player).y === getFirst(apple).y) {
    getFirst(apple).x = Math.floor(Math.random() * 10);
    getFirst(apple).y = Math.floor(Math.random() * 10);
    score++;
  }

  if (score > 15) {
    console.log("YOU WIN!");
  }
})