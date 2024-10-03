/*
@title: Super_Platformer
@author: KinjalPriya000
@tags: []
@addedOn: 2024-04-11
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p";
const wall = "w";
const background = "b";
const floor = "f";
const goal = "g";
const box = "x";


setLegend(
  [ player, bitmap`
................
.......000......
......00000.....
......00000.....
.....0000000....
......22222.....
......20202.....
......22222.....
......22222.....
.......000......
.....0000000....
.......000......
.......000......
.......000......
......00000.....
................` ],
  [ box, bitmap `
0000000000000000
0000000330000000
LLLL00033000LLLL
LLLL00033000LLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLL000LLLLLLLL
LLLL0LLL0LLLLLLL
LLLL0LLL0LLLLLLL
LLLL0LLL0LLLLLLL
LLLL0LLL0LLLLLLL
LLLL0000LLLLLLLL
LLLL0LLL0LLLLLLL
LLLL0LLL0LLLLLLL
LLLL0LLL0LLLLLLL
LLLL0000LLLLLLLL`],
  [ goal, bitmap`
7777777777777777
7777777777777777
7770000777777777
7770330000077777
7770333333007777
7770333333300777
7770333333330077
7770333333300777
7770333000007777
7770300007777777
7770077777777777
7770777777777777
7770777777777777
7770777777777777
7770777777777777
7770777777777777`],
  [ wall, bitmap`
0000000000000000
0999999099999990
0999999099999990
0000000000000000
0999099999909990
0999099999909990
0000000000000000
0999999099999990
0999999099999990
0000000000000000
0999909999909990
0999909999909990
0000000000000000
0999999909999990
0999999909999990
0000000000000000` ], 
  [ background, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ],
  [ floor, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
CDDCDDDCDCDDCDDD
CDCDCCCCDDCCDDCD
CCCDCCCCCDCCDCCD
CCCCCCCCCCCCDCCD
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
)

setSolids([player, wall, floor, box]);

setPushables({
  [player]: [ box ],
  [ box ]: [ box ]
});

let level = 0

const levels = [
  map`
bbbbbbbbbbbb
bbbbbbbbbbbb
bbbbbbbbbbbb
bbbbbbbbbbbb
bbbbbbbbbbbb
bgbbbbwwwbbb
bwwwwbbbbbbb
bbbbbbbbbwww
bbbbbbbbbbbb
wwwwbbwwwwbb
bbbbbbbbbbbb
ffffffffffff`,
  map `
bbbbbbbbbbbb
bbbbbbbbbbbb
bbbbbbbbbbbb
bbbbbbbbbbbb
bbbgwwwbbbbb
bbwwwwwwbbbb
bbbbbbbbbbbb
bwbwbbwwwwbb
bbbbbbbbbbbb
bwwwbbbbbbbb
bbbbbbbbbbbb
ffffffffffff`,
  map`
bbbbbbbbbbbb
bbbbbbbbbbbb
bbbbbbbbbbbb
bbbbbbbbbbbb
bbbbbbbbbbbb
bbbbbbbbbbbb
bbbbbbbbbbbb
bbwbwgwbbbbb
bbbbwwbbbwbb
bbbwbbbbwbbb
bbbbbbbfffff
ffffffffffff`,
  map`
bbbbbbbbbbbb
bbbbbbbwwwbb
bbbbwbwbbbbb
bgbbbbbbbbwb
bwbwbbbbbwbb
bbbbbbwbwbbb
bbbbbbbbbbbb
bbbbbwbbbbbb
bbbbbbbfffbb
bbbbffffffbb
bbfffffffffb
ffffffffffff` ,
  map`
bbbbbbbbbbbb
bbbbbbbbbbbb
bbbbbwbbbbbb
bbbbbwbgbwbb
bbwbbbbwbwbb
bwbwbbwbbwbb
bbbbbbbbwbbf
fbbbbbbwbbbf
fbbbwwwwbbff
ffbbbbbbbfff
fffbbbbbffff
ffffffffffff`
]

const levelMovables = [
  map `
............
............
............
............
........x...
...x........
............
............
x.......x...
............
p...........
............`,
  map`
............
............
............
............
............
............
............
............
..x....xx...
............
.p........x.
............`,
  map`
............
............
............
............
............
............
............
............
............
..........p.
....x.......
............`,
  map`
............
............
..x...x.....
............
............
............
.........x..
............
............
............
px.........x
............`,
  map`
............
.....x......
.......x....
............
....x.......
............
....x.......
............
............
............
.....p......
............`
]

setMap(levels[level]);

function setMovables(str){
  let strings = str.split("\n");
  for(let y = 0; y < strings.length - 1; y++) {
    for(let x = 0; x < strings[y].length - 1; x++) {
      if(strings[y][x] !== ".") {
        addSprite(x, y - 1, strings[y][x]);
      }
    }
  }
}

function playerAboveBox(x, y) {
  const tiles = getTile(x, y);
  const tileValues = tiles.map(tile => tile._type);
  return tileValues.some(value => ["p"].includes(value));
}
function isGround(x, y) {
  const tiles = getTile(x, y);
  const tileValues = tiles.map(tile => tile._type);
  return tileValues.some(value => ["w", "f", "x"].includes(value));
}

setMovables(levelMovables[level]);

onInput("d", () => {
  getFirst(player).x += 1;
});
onInput("a", () => {
  getFirst(player).x -= 1;
});
onInput("w", async () => {
  if (isGround(getFirst(player).x, getFirst(player).y + 1)) {
    for (let i = 0; i<2; i++)
      getFirst(player).y -= 1;
  }
});

const playerGravityPromise = (async () => {
  while (true) {
    if (!isGround(getFirst(player).x, getFirst(player).y + 1)) {
      await new Promise(resolve => setTimeout(resolve, 250));
      getFirst(player).y += 1;
      onUpdatePosition();
    }
    await new Promise(resolve => setTimeout(resolve, 250));
  }
})();
function onUpdatePosition() {
  if (getFirst(goal).x == getFirst(player).x && getFirst(goal).y == getFirst(player).y) {
    if(levels[level+1]!==undefined){
      level+=1;
      setMap(levels[level]);
      setMovables(levelMovables[level]);
    }
    else{
      addText("You Win!", { y: 2, color: color`0` });
    }
  }
}
afterInput(async () => {
  onUpdatePosition();
  let isBoxPromiseRunning;
  let isPlayerPromiseRunning;
  if (!isBoxPromiseRunning) {
    isBoxPromiseRunning = true;
    const boxGravityPromise = (async () => {
      while (!isGround(getFirst(box).x, getFirst(box).y + 1)) {
        await new Promise(resolve => setTimeout(resolve, 250));
        getFirst(box).y += 1;
      }
      isBoxPromiseRunning = false;
    })();
  }
  if (!isPlayerPromiseRunning) {
    isPlayerPromiseRunning = true;
    playerGravityPromise.catch(() => {}).finally(() => {
      isPlayerPromiseRunning = false;
    });
  }
  await Promise.all([playerGravityPromise, /*boxGravityPromise*/]);
});
