/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Bombs
@author: a-potted-plant
@tags: ['beginner']
@addedOn: 2024-09-18
*/

const player = "p"
const enemy = "e"
const background = "g"
const floor = "f"
const bomb = "b"
const wood = "w"
const wood2 = "v"
const wood3 = "u"

const explosion = "x"



setLegend(
  [player, bitmap`
................
................
................
...DDDDDDDDD....
..DDDDDDDDDDD...
..DDDDDDDDDDD...
..DDDDDDDDDDD...
..C777777777C...
..C770777077C...
.C77707770777C..
..77777777777...
..77777777777...
..77777777777...
...777777777....
....7777777.....
................`],
  [explosion, bitmap`
................
.3333..33..333..
33333333333333..
333933333333333.
.33933339333993.
.33999999999933.
..3999999693333.
.33399666999333.
.39999666699333.
33999996699993..
33333996999933..
.33399999999333.
.33999999999333.
.33999333399333.
.3333933333933..
...33333.3333...`],

  [bomb, bitmap`
................
................
................
........3.33....
.........663....
........0063....
........0.3.....
.......00.......
.......0........
......333.......
......333.......
......333.......
......333.......
......333.......
......333.......
......333.......`],

  [enemy, bitmap`
................
................
................
...DDDDDDDDD....
..DDDDDDDDDDD...
..DDDDDDDDDDD...
..DDDDDDDDDDD...
..C333333333C...
..C330333033C...
.C33303330333C..
..33333333333...
..33333333333...
..33333333333...
...333333333....
....3333333.....
................`],
  [background, bitmap`
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
  [floor, bitmap`
LLLLL1LLLLLL1LLL
LLLLL1LLLLLL1LLL
LLLLL1LLLLLL1LLL
1111111111111111
LL1LLLLL1LLLLL1L
LL1LLLLL1LLLLL1L
LL1LLLLL1LLLLL1L
1111111111111111
LLLLL1LLLLLL1LLL
LLLLL1LLLLLL1LLL
LLLLL1LLLLLL1LLL
1111111111111111
LL1LLLLL1LLLLL1L
LL1LLLLL1LLLLL1L
LL1LLLLL1LLLLL1L
1111111111111111`],
  [wood, bitmap`
CCCCCCCCCCC00CCC
CCCCCCCCCC00CCCC
CCCCCCCCCCCCCCCC
00000000CCCCCCCC
CCCCCCCC00000000
CC0CCCCCCCCCCCCC
CCC00CCCCCCCCCCC
................
................
................
................
................
................
................
................
................`],
  [wood2, bitmap`
LLLL1LLLLL1LLLLL
LLLL1LLLLL1LLLLL
LLLL1LLLLL1LLLLL
1111111111111111
LL1LLLL1LLLLL1LL
LL1LLLL1LLLLL1LL
LL1LLLL1LLLLL1LL
................
................
................
................
................
................
................
................
................`],
  [wood3, bitmap`
LLLL1LLLLL1LLLLL
LLLL1LLLLL1LLLLL
LLLL1LLLLL1LLLLL
1111111111111111
LL1LLLL1LLLLL1LL
LL1LLLL1LLLLL1LL
LL1LLLL1LLLLL1LL
................
................
................
................
................
................
................
................
................`]



)
setBackground(background)

setSolids([floor, bomb, wood2, wood3])


let level = 0
const levels = [
  map`
...
.p.
www
...
...
...
...
.e.
fff`,
  map`
.....
p....
wwwww
.....
.....
.....
.....
....e
fffff`,
  map`
......
.p....
wwwwww
......
vv.vv.
......
......
.....e
ffffff`,
  map`
..........
.....p....
wwwwwwwwww
..........
vvv.vv.vvv
..........
..........
.........e
ffffffffff`,
  map`
...............
..........p....
wwwwwwwwwwwwwww
...............
vv.vvvvvvvv.vvv
...............
...............
..............e
fffffffffffffff`,
  map`
.....................
................p....
wwwwwwwwwwwwwwwwwwwww
.....................
vvvvvvvv.vvvvvvvvvvvv
.....................
.....................
....................e
fffffffffffffffffffff`,
  map`
..............
p.............
wwwwwwwwwwwwww
..............
vvvv.vvvv.vvvv
......u.......
..............
.............e
ffffffffffffff`,
  map`
.................
p................
wwwwwwwwwwwwwwwww
.................
vvvvvvvv.vvvvvvvv
.u...............
.................
.............e...
fffffffffffffffff`,
  map`
.....................
.p...................
wwwwwwwwwwwwwwwwwwwww
.....................
vvvvvvvvvv.vvvvvvvvvv
..........u..........
.....................
.....................
...............e.....
fffffffffffffffffffff`,

  map`
...............
...............
...............
...............
vvvvvvvvvvvvvvv
...............
...............
p.............e
fffffffffffffff`


]

setMap(levels[level])

setPushables({
  [wood3]: [player]
})
const hit = tune`
119.04761904761905: F4^119.04761904761905,
119.04761904761905: E4^119.04761904761905,
119.04761904761905: F4^119.04761904761905,
119.04761904761905: G4^119.04761904761905,
3333.3333333333335`
const winner = tune`
145.63106796116506: D4~145.63106796116506 + F4~145.63106796116506 + A4~145.63106796116506,
145.63106796116506: E4~145.63106796116506 + G4~145.63106796116506 + B4~145.63106796116506,
145.63106796116506: F4~145.63106796116506 + A4~145.63106796116506 + C5~145.63106796116506,
145.63106796116506: G4~145.63106796116506 + E4~145.63106796116506 + B4~145.63106796116506,
145.63106796116506: F4~145.63106796116506 + A4~145.63106796116506 + C5~145.63106796116506,
145.63106796116506: G4~145.63106796116506 + B4~145.63106796116506 + D5~145.63106796116506,
145.63106796116506: A4~145.63106796116506 + F4~145.63106796116506 + C5~145.63106796116506,
145.63106796116506: G4~145.63106796116506 + B4~145.63106796116506 + D5~145.63106796116506,
145.63106796116506: E5~145.63106796116506 + G5~145.63106796116506,
145.63106796116506: F5~145.63106796116506 + A5~145.63106796116506,
3203.883495145631`

const melody = tune`
179.64071856287424: E4^179.64071856287424,
179.64071856287424: D4^179.64071856287424,
179.64071856287424: E4^179.64071856287424,
179.64071856287424: F4^179.64071856287424,
179.64071856287424: E4^179.64071856287424,
179.64071856287424: D4^179.64071856287424,
179.64071856287424: E4^179.64071856287424,
179.64071856287424: F4^179.64071856287424,
179.64071856287424: G4^179.64071856287424,
179.64071856287424: F4^179.64071856287424,
179.64071856287424: E4^179.64071856287424,
179.64071856287424: F4^179.64071856287424,
179.64071856287424: G4^179.64071856287424,
179.64071856287424: A4^179.64071856287424,
179.64071856287424: F4^179.64071856287424,
179.64071856287424: G4^179.64071856287424,
179.64071856287424: A4^179.64071856287424,
179.64071856287424: F4^179.64071856287424,
179.64071856287424: G4^179.64071856287424,
179.64071856287424: A4^179.64071856287424,
179.64071856287424: G4^179.64071856287424,
179.64071856287424: F4^179.64071856287424,
179.64071856287424: G4^179.64071856287424,
179.64071856287424: A4^179.64071856287424,
179.64071856287424: B4^179.64071856287424,
179.64071856287424: C5^179.64071856287424,
179.64071856287424: A4^179.64071856287424,
179.64071856287424: G4^179.64071856287424,
179.64071856287424: A4^179.64071856287424,
179.64071856287424: B4^179.64071856287424,
179.64071856287424: G4^179.64071856287424,
179.64071856287424: E4^179.64071856287424`
const playback = playTune(melody, Infinity)

addText(" AD = move S = bombs", {
  x: 0,
  y: 1,
  color: color`6`
})
addText("Any button = bomb", {
  x: 1,
  y: 5,
  color: color`6`
})

function fallBombs() {
  const bombs = getAll(bomb)

  bombs.forEach(bomb => {
    bomb.y += 1
  })
}

function moveEnemy() {
  const enemySprite = getFirst(enemy);

  const direction = Math.random() < 0.5 ? -1 : 1;
  const speed = Math.floor(Math.random() * 4) + 1;

  enemySprite.x += direction * speed;
}

function moveWood3() {
  const wood3Sprite = getFirst(wood3);

  if (wood3Sprite) {
    const direction = Math.random() < 0.5 ? -1 : 1;
    const speed = Math.floor(Math.random() * 4) + 1;

    wood3Sprite.x += direction * speed;
  }
}

function checkHit() {
  let bombs = getAll(bomb);
  let p = getFirst("e");

  for (let i = 0; i < bombs.length; i++) {
    if (bombs[i].x === p.x && bombs[i].y === p.y) {
      return true;
    }
  }

  return false;
}

function clearBombs() {
  const bombs = getAll(bomb);

  bombs.forEach(bomb => {
    bomb.remove();
  });
}


const intervalTime = 250
const intervalId = setInterval(fallBombs, intervalTime)
const enemyIntervalTime = 500;
const enemyIntervalId = setInterval(moveEnemy, enemyIntervalTime);
const woodIntervalTime = 500;
const woodIntervalId = setInterval(moveWood3, woodIntervalTime);
const bombIntervalTime = 7000;
const bombIntervalId = setInterval(clearBombs, bombIntervalTime);


onInput("d", () => {
  getFirst(player).x += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("s", () => {
  const playerSprite = getFirst(player)
  addSprite(playerSprite.x, playerSprite.y, bomb)
})
afterInput(() => {
  if (checkHit()) {
    const enemySprite = getFirst(enemy);
    addSprite(enemySprite.x, enemySprite.y, explosion);
    level++;

    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      playTune(winner);
      clearText();
      addText("You Won!", {
        x: 6,
        y: 4,
        color: color`6`
      });
    }
  }
})

