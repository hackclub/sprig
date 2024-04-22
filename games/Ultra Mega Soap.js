/*
@title: Ultra Mega Soap
@author: Joser1109
*/



const player = "p"
const soap = "s"
const dingle = "d"
const scrub = tune `
140.18691588785046: F4-140.18691588785046,
140.18691588785046,
140.18691588785046: B4-140.18691588785046,
140.18691588785046: G4-140.18691588785046,
3925.233644859813`


setLegend(
  [player, bitmap`
................
.....000000.....
....00000000....
...0023002300...
...003C003C00...
...0000000000...
...0022002200...
....00022000....
.....000000.....
....00000000....
...0000000000...
...0000000000...
...0000000000...
....00000000....
.....00..00.....
.....00..00.....`],
  [soap, bitmap `
................
................
................
................
.....888888.....
....88888888....
....88888888....
....38888888....
....38888888....
....33888888....
.....333888.....
................
................
................
................
................`],
  [dingle, bitmap`
.......C........
......CC........
.....CCC........
.....CCCCC......
....C0CCC0C.....
....C0CCC0CC....
...CC0CCC0CCC...
...CCCCCCCCCCC..
..CCCCCCCCCCCCCC
..C000CCCC0CCCCC
.CCCC60000CCCCCC
CCCCC6666CCCCCCC
CCCCCCCCCCCCC...
...CCCCCCCCC....
.......CC.......
................`],
)

setSolids([player])

let level = 0
const levels = [
  map`
.d........
..........
.........d
..........
.....d....
..........
..........
.p........`,
  map`
..........
..........
..........
..........
..........
..........
..........
..........`

]


setMap(levels[level])

setPushables({
  [player]: []
})

onInput("d", () => {
  getFirst(player).x += 1
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("i", () => {
  addSprite(getFirst(player).x, getFirst(player).y - 1, soap)
})
onInput("j", () => {
  addSprite(getFirst(player).x - 1, getFirst(player).y, soap)
})
onInput("k", () => {
  addSprite(getFirst(player).x, getFirst(player).y + 1, soap)
})
onInput("l", () => {
  addSprite(getFirst(player).x + 1, getFirst(player).y, soap)
})



const currentLevel = levels[level];
setMap(currentLevel);

var gameLoop = setInterval(() => {

  dingleattack();
  spawndingle();

}, 1000)

afterInput(() => {

  const numberCovered = tilesWith(player).length;
  const targetNumber = tilesWith(player, dingle).length;

  // count the number of tiles with goals and boxes

  if (numberCovered === targetNumber) {
    for (const pop of tilesWith(player)) {
      for (const pop1 of pop) {
        clearTile(pop1.x, pop1.y)
      }
    }
  }
  if (getAll(soap).length > 1) {
    for (const pop of tilesWith(soap)) {
      for (const pop1 of pop) {
        clearTile(pop1.x, pop1.y)
        playTune(scrub)
      }
    }
  }
  if (getAll(dingle).length > 35) {
    for (const pop of tilesWith(player)) {
      for (const pop1 of pop) {
        clearTile(pop1.x, pop1.y)
      }
    }
  }
})

function dingleattack() {


  let obstacles = getAll(dingle);

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].y += 1;

  }
}

function spawndingle() {
  let x = Math.floor(Math.random() * 10);
  let y = 0;
  addSprite(x, y, dingle);
}