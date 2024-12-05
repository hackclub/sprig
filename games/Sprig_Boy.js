/*
@title: SprigBoy
@author: NA
@tags: []
@addedOn: 2023-06-19
*/
const createArray = (size) => [...Array(size).keys()];
const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));
const player = "p";
const box = "b";
const wall = "w";
const flag = "m";

const boxLimit = 1;
let inAir = 0;
setLegend(
  [player, bitmap`
................
................
................
...0000000000...
...0222222220...
...0222202020...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0000000000...
...0........0...
...0........0...
...0........0...
...00.......00..`],
  [box, bitmap`
................
................
..000000000000..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..022222222220..
..000000000000..
................
................`],
  [wall, bitmap`
................
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
................`],
  [flag, bitmap`
................
................
................
................
................
................
................
................
.......6........
......666.......
.....66666......
.......6........
.......6........
.......6........
.......6........
......000.......`]
)

setSolids([player, wall, box])

let level = 0
const levels = [
  map`
.........
.........
.........
.........
......w..
p.w...w.m
wwwwwwwww`,
  map`
.........
.........
.........
......w..
....w.w..
p.w.w.w.m
wwwwwwwww`,
  map`
....wwwwww
.....wwwww
...w.wwwww
...w.w..mw
..ww....ww
p.wwwww.ww
wwwwwwwwww`,
  map`
..m
..w
..w
..w
..w
..w
..w
..w
p.w`,
  map`
..........
..........
..........
.........m
..ww..ww.w
..ww..ww.w
..ww..ww.w
..ww..ww.w
p.ww..ww.w
wwwwwwwwww`,
  map`
...wwwwwwwwwwwwwwww
.w.................
mw.................
wwwwwwwwwwwwwwwww..
...................
..wwwwwwwwwwwwwwww.
...................
wwwwwwwwwwwwwwww...
p..................
wwwwwwwwwwwwwwwwwww`,
  map`
.......................................
p......................................
w.w..ww...w.w...w.......w.www.w...w.w..
.w..w..w..w.w...w...w...w..w..ww..w.w..
.w..w..w..w.w...ww.www.ww..w..w.w.w....
.w...ww...www....ww...ww..www.w..ww.w..
.......................................`]

setMap(levels[level])

setPushables({
  [player]: [box]
})

onInput("w", () => {
  checkFlag()
  if (inAir) return;

  inAir++;
  jump().then(async () => {
    inAir--;
  });
});

onInput("i", () => {
  setMap(levels[level])
})

const jump = async () => {
  await createArray(1).reduce(async (promise) => {
    await promise;

    getFirst(player).y -= 1;
    await wait(300);
  }, Promise.resolve());

  await resetGravity();
};

const resetGravity = async () => {
  await createArray(1).reduce(async (promise) => {
    await promise;
    getFirst(player).y += 1;

    await wait(500);
  }, Promise.resolve());
};

setInterval(() => {
  if (inAir || getFirst(player).y === 5) return;

  getFirst(player).y++;
}, 100);

onInput("d", () => {
  checkFlag()
  getFirst(player).x += 1
})

onInput("a", () => {
  checkFlag()
  getFirst(player).x -= 1
})

let boxExists = false
let isWall = false

onInput("l", () => {
  makeBox(1)
})

onInput("j", () => {
  makeBox(-1)
})

function makeBox(huh) {

  if (getTile(getFirst(player).x + huh, getFirst(player).y)[0] != undefined) {
    isWall = true
  }
  else {
    isWall = false
  }
  if (!boxExists && !isWall) {
    addSprite(getFirst(player).x + huh, getFirst(player).y, box)
    boxExists = true
  }
  else if (boxExists) {
    // clearTile(getFirst(box).x, getFirst(box).y)
    boxExists = false
  }
}

function checkFlag() {
  let px = getFirst(player).x;
  let py = getFirst(player).y;
  getTile(px, py).forEach(tile => {
    if (tile._type == "m") {
      level++;
      boxExists = false
      setMap(levels[level]);
    }
  })
}
