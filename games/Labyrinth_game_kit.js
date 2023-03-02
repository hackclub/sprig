/*
@title: Labyrinth_game_kit
@author: DorukSarpAlwaysStrikesBack!
*/

/*W for up, A for left, S for down, D for right and J for reset, you cannot push the block to the end. */

const player = "p";
const labywall = "w";
const end = "e";
const block = "b";
const melody = tune`
500: B5^500,
500: F5^500,
500: C5^500,
500: A5^500,
500: D5^500,
500: C5^500,
500: G5^500,
500: A5^500,
500: D5^500,
500: F5^500,
500: G5^500,
500: F5^500,
500: A5^500,
500: E5^500,
500: D5^500,
500: G5^500,
500: E5^500,
500: G5^500,
500: F5^500,
500: D5^500,
500: A5^500,
500: D5^500,
500: G5^500,
500: E5^500,
500: F5^500,
500: D5^500,
500: F5^500,
500: E5^500,
500: G5^500,
500: F5^500,
500: D5^500,
500: G5^500`
const playback = playTune(melody, Infinity)

setSolids([ player, block, labywall ])

setLegend(
  [ player, bitmap`
................
............000.
........0000040.
.......00440440.
.......04444440.
.......00044400.
.......0.00000..
..000000........
.0022220000000..
.0222222022220..
..022222202020..
..022222222220..
..002222222200..
...000222000....
.....00000......
................`],
  [ labywall, bitmap`
L0L0L0L0L0L0L0L0
0000000000000000
L0L0L0L0L0L0L0L0
0000000000000000
L0L0L0L0L0L0L0L0
0000000000000000
L0L0L0L0L0L0L0L0
0000000000000000
L0L0L0L0L0L0L0L0
0000000000000000
L0L0L0L0L0L0L0L0
0000000000000000
L0L0L0L0L0L0L0L0
0000000000000000
L0L0L0L0L0L0L0L0
0000000000000000`],
  [ end, bitmap`
....00000000....
...0777777770...
..077777777770..
.07776666666770.
0777767777777770
0777767777777770
0777767777777770
0777766666667770
0777767777777770
0777767777777770
0777767777777770
0777767777777770
.00776666666770.
..007777777770..
...0777777770...
....00000000....`],
    [ block, bitmap`
1L1L1L1L1L1L1L1L
LLLLLLLLLLLLLLLL
1L1L1L1L1L1L1L1L
LLLLLLLLLLLLLLLL
1L1L1L1L1L1L1L1L
LLLLLLLLLLLLLLLL
1L1L1L1L1L1L1L1L
LLLLLLLLLLLLLLLL
1L1L1L1L1L1L1L1L
LLLLLLLLLLLLLLLL
1L1L1L1L1L1L1L1L
LLLLLLLLLLLLLLLL
1L1L1L1L1L1L1L1L
LLLLLLLLLLLLLLLL
1L1L1L1L1L1L1L1L
LLLLLLLLLLLLLLLL`],

);


let level = 0;
const levels = [
  map`
...w.....
...w.....
.p.w...e.
...w.....
...b.....
...w.....
...w.....`,
   map`
pw..........
.w..........
.w....wwww..
.w....w.ew..
.w....w..w..
.w....w..w..
.wwwwww..w..
.b.......w..
.w.......w..
.w.......w..
.wwwwwwwwwww
............`,
  ]
const currentLevel = levels[level];
setMap(currentLevel);

  const cl = levels[level];
setMap(cl);

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
     }
});
afterInput(() => {
  
const targetNumber = tilesWith(end).length;
const numberCovered = tilesWith(end, player, ).length;
  if (numberCovered === targetNumber) {
     level = level + 1;

    const currentLevel = levels[level];
  
  if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 10, color: color`4` });
    }
  }
});

setPushables({ 
  [player]: [ block, player ] 
})

onInput("s", () => {
  getFirst(player).y += 1
})

afterInput(() => {
  
})
