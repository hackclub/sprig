/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Catch the block
@author: Ethan
@tags: []
@addedOn: 2025-01-22
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
  if (score >= 40) return;
  getFirst(player).y -= 1
})

onInput("a", () => {
  if (score >= 40) return;
  getFirst(player).x -= 1
})

onInput("s", () => {
  if (score >= 40) return;
  getFirst(player).y += 1
})

onInput("d", () => {
  if (score >= 40) return;
  getFirst(player).x += 1
})

addText(`Score: ${score}`, {
    x: 2,
    y: 0,
  });

afterInput(() => {
  if (score < 40 && (getFirst(player).x === getFirst(apple).x && getFirst(player).y === getFirst(apple).y)) {
    getFirst(apple).x = Math.floor(Math.random() * 10);
    getFirst(apple).y = Math.floor(Math.random() * 10);
    score++;

    clearText();
    addText(`Score: ${score}`, {
      x: 2,
      y: 0,
    });
  }
  if (score >= 40) {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          clearTile(i, j);
        }
      }
      clearText();

      addText("YOU WIN!", {
        x: 6,
        y: 6
      })
    }
})
