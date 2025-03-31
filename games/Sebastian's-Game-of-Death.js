/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Sebastian's Game of Death
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const cursor = "c"
const player1 = "p"
const player2 = "e"

setLegend(
  [cursor, bitmap`
0..............0
.0............0.
..0..........0..
...0........0...
....0......0....
.....0....0.....
......0..0......
.......00.......
.......00.......
......0..0......
.....0....0.....
....0......0....
...0........0...
..0..........0..
.0............0.
0..............0`],
  [player1, bitmap`
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
  [player2, bitmap`
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

setSolids([player1, player2])

let level = 0
const levels = [
  map`
...................
...................
...................
...................
...................
...................
...................
...................
...................
.........c.........
...................
...................
...................
...................
...................
...................
...................
...................
...................`
]

setMap(levels[level])

const countNeighbors = (x, y) => {
  let p1count = 0;
  let p2count = 0;
  let sum = 0;

  // Check all neighboring tiles
  for (let Y = y - 1; Y <= y + 1; Y++) {
    for (let X = x - 1; X <= x + 1; X++) {
      if (X != x || Y != y) { // Exclude the current tile
        let sprites = getTile(X, Y);
        sprites.forEach(sprite => {
          if (sprite.type === "p") {
            p1count++;
            sum++;
          } else if (sprite.type === "e") {
            p2count++;
            sum++;
          }
        });
      }
    }
  }
  return [p1count, p2count];
};
let p1placeableCells = 10
let p2placeableCells = 10
addText(p1placeableCells.toString(), { x: 5, y: 2, color: color`5` })
addText(p2placeableCells.toString(), { x: 15, y: 2, color: color`3` })


onInput("s", () => {
  getFirst(cursor).y += 1
})

onInput("w", () => {
  getFirst(cursor).y -= 1
})

onInput("a", () => {
  getFirst(cursor).x -= 1
})

onInput("d", () => {
  getFirst(cursor).x += 1
})

onInput("i", () => {
  if (p1placeableCells > 0) {
    let c = getFirst(cursor)
    clearText()
    addSprite(c.x, c.y, player1)
    p1placeableCells -= 1
    addText(p2placeableCells.toString(), { x: 15, y: 2, color: color`3` })
    addText(p1placeableCells.toString(), { x: 5, y: 2, color: color`5` })
  } else {
    if (p2placeableCells > 0) {
      let c = getFirst(cursor)
      clearText()
      addSprite(c.x, c.y, player2)
      p2placeableCells -= 1
      addText(p2placeableCells.toString(), { x: 15, y: 2, color: color`3` })
      addText(p1placeableCells.toString(), { x: 5, y: 2, color: color`5` })
    }
  }
})

onInput("k", () => {

  console.log("Game has been quit");
});

let timer;
afterInput(() => {
  let seconds = 15; // Initialize seconds inside the afterInput function
  if (p1placeableCells == 0 && p2placeableCells == 0) {
    let del = getFirst(cursor)
    if (del) {
      del.remove();
      clearText();
      addText(seconds.toString(), { x: 10, y: 2, color: color`6` });
      timer = setInterval(() => {
        updateCells(seconds);
        seconds--;
        clearText();
        addText(seconds.toString(), { x: 10, y: 2, color: color`6` });
        if (seconds === 0) {
          let player1Count = 0;
          let player2Count = 0;

          for (let y = 0; y < height(); y++) {
            for (let x = 0; x < width(); x++) {
              let sprites = getTile(x, y);
              sprites.forEach(sprite => {
                if (sprite.type === player1) {
                  player1Count++;
                } else if (sprite.type === player2) {
                  player2Count++;
                }
              });
            }
            clearText()
            if (player1Count > player2Count) {
              addText("Player 1 Wins", { x: 3, y: 2, color: color`6` });
            } else if (player1Count < player2Count) {
              addText("Player 2 Wins", { x: 3, y: 2, color: color`6` });
            } else {
              addText("Tie", { x: 10, y: 2, color: color`6` });
            }
          }
        }
      }, 1000);

      setTimeout(() => {
        clearInterval(timer);
      }, 15000);
    }
  }

});

function updateCells(seconds) {
  for (let y = 0; y < height(); y++) {
    for (let x = 0; x < width(); x++) {
      let sprites = getTile(x, y);
      let type = "";
      let neighbors = countNeighbors(x, y);
      let neighborcount = neighbors[2];

      if (neighbors[0] > neighbors[1]) {
        neighborcount = neighbors[0]
        type = "p";
      } else if (neighbors[1] >= neighbors[0]) {
        type = "e";
        neighborcount = neighbors[1]
      }

      if (sprites.length > 0) {
        sprites.forEach(sprite => {
          if (sprite.type === type) {
            if (neighborcount < 2 || neighborcount > 3) {
              sprite.remove();
            } else if (neighborcount === 2 || neighborcount === 3) {
              console.log("survived!");
            }
          }
        });
      } else {

        if (neighborcount === 3) {
          if (type === "p") {
            addSprite(x, y, player1);
          } else if (type === "e") {
            addSprite(x, y, player2);
          }
        }
      }
    }
  }
}