/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 9 Tiles
@author: Arrow07
@tags: []
@addedOn: 2024-08-28
*/
const melody = tune`
428.57142857142856: B5-428.57142857142856 + A5^428.57142857142856,
428.57142857142856: A5-428.57142857142856 + B5^428.57142857142856,
428.57142857142856: B5-428.57142857142856 + A5^428.57142857142856,
428.57142857142856: A5-428.57142857142856 + B5^428.57142857142856,
428.57142857142856: D5-428.57142857142856 + C5~428.57142857142856,
428.57142857142856: C5-428.57142857142856 + D5~428.57142857142856,
428.57142857142856: D5-428.57142857142856 + C5~428.57142857142856,
428.57142857142856: C5-428.57142857142856 + D5~428.57142857142856,
428.57142857142856: E5-428.57142857142856,
428.57142857142856: D5-428.57142857142856,
428.57142857142856: E5-428.57142857142856,
428.57142857142856: F5-428.57142857142856,
428.57142857142856: D5-428.57142857142856,
428.57142857142856: C5-428.57142857142856,
7714.285714285714`
const move = tune `
500: F5-500,
15500`
const winning = tune `
375: B5-375 + A5^375,
375: A5-375 + B5^375,
375: B5-375 + A5^375,
375: A5-375 + B5^375,
375: D5-375 + C5~375,
375: C5-375 + D5~375,
375: D5-375 + C5~375,
375: C5-375 + D5~375,
375: E5-375,
375: D5-375,
375: E5-375,
375: F5-375,
375: D5-375,
375: C5-375,
6750`
const player = "p"
const casella1 = "1"
const casella2 = "2"
const casella3 = "3"
const casella4 = "4"
const casella5 = "5"
const casella6 = "6"
const casella7 = "7"
const casella8 = "8"
const win = "w"
setLegend(
  [player, bitmap`
................
...3333333333...
..3..........3..
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
..3..........3..
...3333333333...
................`],
  [casella1, bitmap`
000..........000
00............00
0......LLL.....0
......L221L.....
.....L2221L.....
....L22221L.....
....L22221L.....
.....LL221L.....
......L221L.....
......L221L.....
.....0022100....
....022222210...
....022222210...
0....0000000...0
00............00
000..........000`],
  [casella2, bitmap`
000..........000
00............00
0....LLLLLL....0
....L222221L....
...L22222221L...
...L221LL221L...
...L221LL221L...
....LLLL2221L...
......L2221L....
.....L2221L.....
....02221000....
...0222222210...
...0222222210...
0...00000000...0
00............00
000..........000`],
  [casella3, bitmap`
000..........000
00............00
0....LLLLLL....0
....L222221L....
...L22222221L...
...L221LL221L...
...L221LL221L...
....LLL2221L....
....LLL2221L....
...L221LL221L...
...0221002210...
...0222222210...
....02222210....
0....000000....0
00............00
000..........000`],
  [casella4, bitmap`
000..........000
00............00
0.....LLLLL....0
.....L22221L....
....L222221L....
....L221221L....
...L2221221L....
...L221L221L....
...L221L221L....
..L222222221L...
..02222222210...
...000002210....
.......02210....
0.......000....0
00............00
000..........000`],
  [casella5, bitmap`
000..........000
00............00
0...LLLLLLLL...0
...L22222221L...
...L22222221L...
...L221LLLL.....
...L2222221L....
...L22222221L...
....LLLLL221L...
....LLL.0221L...
...0221002210...
...0222222210...
....02222210....
0....000000....0
00............00
000..........000`],
  [casella6, bitmap`
000..........000
00............00
0....LLLLLL....0
....L222221L....
...L22222221L...
...L221LL221L...
...L221LLLLL....
...L2222221L....
...L22222221L...
...L221LL221L...
...0221002210...
...0222222210...
....02222210....
0....000000....0
00............00
000..........000`],
  [casella7, bitmap`
000..........000
00............00
0..LLLLLLLLL...0
..L222222221L...
..L222222221L...
..L221LL2221L...
...LLL.L2221L...
......LL2221L...
.....L22221L....
.....L22221L....
....0222100.....
....022210......
....022210......
0....0000......0
00............00
000..........000`],
  [casella8, bitmap`
000..........000
00............00
0....LLLLLL....0
....L222221L....
...L22222221L...
...L221LL221L...
...L221LL221L...
...L22222221L...
....L222221L....
...L221LL221L...
...0221002210...
...0222222210...
....02222210....
0....000000....0
00............00
000..........000`],
  [win, bitmap`
................
..00........00..
.0..00000000..0.
.0..0F666620..0.
.0..0F666620..0.
.0..0F666660..0.
..0.0F666620.0..
...00F6666600...
.....0F6660.....
......0660......
......0660......
......0660......
.....0F6660.....
....0F666660....
....00000000....
................`]
)


//mappe
let menu = 0
let game = 1
const levels = [
  map `
...
...
.p.`,
]

//LOGIC AND PREP
const tiles = ["1", "2", "3", "4", "5", "6", "7", "8", "p"]

//randomize the map
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array
}

let puzzle;
let solvable = false;
//check if is solvable
const isSolvable = (arr) => {
  let inversions = 0;
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        inversions++;
      }
    }
  }
  return inversions % 2 == 0;
}

for (let i = 0; i < 100; i++) {
  puzzle = shuffleArray(Array.from({ length: 8 }, (_, i) => i + 1))
  if (isSolvable(puzzle)) {
    solvable = true;
    break;
  }
}
if (!solvable) {
  throw new Error("Something went wrong :(")
}

//push the randomize label
puzzle.push(9);
console.log(puzzle)

let puzzleIdx = 0;
let mapStr = ""
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    mapStr += tiles[puzzle[puzzleIdx] - 1]
    puzzleIdx++;
  }
  mapStr += "\n";
}
console.log(mapStr);

//menu
setMap(levels[menu])
const playback = playTune(melody, Infinity)

addText("9-TILE PUZZLE", {
  y: 4,
  color: color`0`
})
addText("-By Arrow-", {
  y: 6,
  color: color`3`
})
addText("Click to start", {
  y: 8,
  color: color`7`
})
let menuopened = false;
afterInput(async () => {
  if (menuopened == false) {
    clearText();
    setMap(map`${mapStr}`);
    playback.end()
    menuopened = true
  } else {

    playTune(move)
    if (done) return;
    let tileIdx = 0;
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        const t = getTile(x, y);
        if (t.length && t[0].type != tiles[tileIdx]) {
          console.log("got type", t[0].type)
          console.log('expected', tiles[tileIdx])
          return
        }
        tileIdx++;
      }
    }
    done = true;
    await sleep(500);
    addText("YOU WIN!", {
      y: 4,
      color: color`3`
    })
    setMap(map`
...
.w.`);
    playTune(winning, Infinity)
  }

})

//livello game
let done = false;



onInput("a", () => {
  if (!menuopened) return;
  if (done) return;
  if (getFirst(player).x === 0) return;
  // get tile to left of getFirst(player)
  const t = getTile(getFirst(player).x - 1, getFirst(player).y)[0];
  t.x += 1;
  getFirst(player).x -= 1;
})

onInput("d", () => {
  if (!menuopened) return;
  if (done) return;
  if (getFirst(player).x === 2) return;
  // get tile to right of getFirst(player)
  const t = getTile(getFirst(player).x + 1, getFirst(player).y)[0];
  t.x -= 1;
  getFirst(player).x += 1;
})

onInput("s", () => {
  if (!menuopened) return;
  if (done) return;
  if (getFirst(player).y === 2) return;
  // get tile to bottom of getFirst(player)
  const t = getTile(getFirst(player).x, getFirst(player).y + 1)[0];
  t.y -= 1;
  getFirst(player).y += 1;
})

onInput("w", () => {
  if (!menuopened) return;
  if (done) return;
  if (getFirst(player).y === 0) return;
  // get tile to top of getFirst(player)
  const t = getTile(getFirst(player).x, getFirst(player).y - 1)[0];
  t.y += 1;
  getFirst(player).y -= 1;
})

const sleep = ms => new Promise(r => setTimeout(r, ms));

