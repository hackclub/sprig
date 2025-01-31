/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
@title: Catch the block
@author: Ethan
@tags: []
@addedOn: 2025-01-22
*/

const player = "p";
const block = "a";
const kill = 'k';
const killOne = "b";

let score = 0;
let loose = false;

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
  [block, bitmap`
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
  [kill, bitmap`
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
3333333333333333`],
  [killOne, bitmap`
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
..b.......
......a...
..........
..........
....k.....
..........
p.........
..........`
]

setMap(levels[level])

setPushables({
  [player]: []
})

function killFunc() {
  if (!loose && (getFirst(player).x == getFirst(kill).x && getFirst(player).y == getFirst(kill).y) || (getFirst(player).x == getFirst(killOne).x && getFirst(player).y == getFirst(killOne).y)) {
    loose = true;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          clearTile(i, j);
        }
      }
      clearText();

      addText("You loose :(", {
        x: 5,
        y: 6
      })
     addText(`Score: ${score}`, {
        x: 5,
        y: 7
      })
  }
}

function moveKill() {
  if (loose) {
    return;
  }
  
  const playerPos = [getFirst(player).x, getFirst(player).y];
    const killPos = [getFirst(kill).x, getFirst(kill).y];

    if (playerPos[0] - killPos[0] > 0) {
      getFirst(kill).x = getFirst(kill).x + 1;
    } else if (playerPos[0] - killPos[0] < 0) {
      getFirst(kill).x = getFirst(kill).x - 1;
    } else if (playerPos[1] - killPos[1] > 0) {
      getFirst(kill).y = getFirst(kill).y + 1;
    } else if (playerPos[1] - killPos[1] < 0) {
      getFirst(kill).y = getFirst(kill).y - 1;
    }

  const killOnePos = [getFirst(killOne).x, getFirst(killOne).y];

    if (playerPos[0] - killOnePos[0] > 0) {
      getFirst(killOne).x = getFirst(killOne).x + 1;
    } else if (playerPos[0] - killOnePos[0] < 0) {
      getFirst(killOne).x = getFirst(killOne).x - 1;
    } else if (playerPos[1] - killOnePos[1] > 0) {
      getFirst(killOne).y = getFirst(killOne).y + 1;
    } else if (playerPos[1] - killOnePos[1] < 0) {
      getFirst(killOne).y = getFirst(killOne).y - 1;
    }

  killFunc();
}

setInterval(moveKill, 1000)

onInput("w", () => {
  if (score >= 40 || loose) return;
  getFirst(player).y -= 1
})

onInput("a", () => {
  if (score >= 40 || loose) return;
  getFirst(player).x -= 1
})

onInput("s", () => {
  if (score >= 40 || loose) return;
  getFirst(player).y += 1
})

onInput("d", () => {
  if (score >= 40 || loose) return;
  getFirst(player).x += 1
})

addText(`Score: ${score}`, {
  x: 2,
  y: 0,
});
getFirst(block).x = Math.floor(Math.random() * 10);
getFirst(block).y = Math.floor(Math.random() * 10);
getFirst(kill).x = Math.floor(Math.random() * 10);
getFirst(kill).y = Math.floor(Math.random() * 10);

afterInput(() => {
  if ((score < 40 && !loose) && (getFirst(player).x == getFirst(block).x && getFirst(player).y == getFirst(block).y)) {
    getFirst(block).x = Math.floor(Math.random() * 10);
    getFirst(block).y = Math.floor(Math.random() * 10);

    score++;

    clearText();
    addText(`Score: ${score}`, {
      x: 2,
      y: 0,
    });
  }

  if (!loose) {
    killFunc()
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

  if (score < 40 && !loose) {
    killFunc();
  }
})
