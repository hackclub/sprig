/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Trip in the forest
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const house="w"
const tree= "a"
const mountain= "y"
const raft= "s"
const myTune = tune`
370.3703703703704,
185.1851851851852: F4~185.1851851851852,
185.1851851851852: G4~185.1851851851852,
185.1851851851852: A4~185.1851851851852,
185.1851851851852: B4~185.1851851851852,
4814.814814814815`;
const myTune2 = tune`
579.7101449275362,
144.92753623188406: B4~144.92753623188406,
144.92753623188406: A4~144.92753623188406,
144.92753623188406: G4~144.92753623188406,
144.92753623188406: F4~144.92753623188406,
3478.2608695652175`;
const myTune3 = tune`
267.85714285714283,
133.92857142857142: A4^133.92857142857142,
133.92857142857142: A4^133.92857142857142,
3749.9999999999995`;

setLegend(
  [ player, bitmap`
................
.......000......
.......0000.....
.......880000...
.....00000000...
....0666666000..
....0066660000..
....0676676000..
....0666666000..
....06000060.00.
....06666660..0.
.....000000.....
................
................
................
................` ],
  [ house, bitmap`
................
................
................
....99CCCCCC....
...99CCCCCCCC...
..99CCCCCCCCCC..
.99CCCCCCCCCCCC.
99CCCCCCCCCCCCCC
9CCCCCCCCCCCCCCC
.66666666666666.
.66666666666666.
.66666667777776.
.66CCC667777776.
.66CC9667777776.
.66CCC666666666.
.66CCC666666666.` ],
  [ tree, bitmap`
................
................
................
................
......4DDDD.....
.....4DDDDDD....
.....4DDDDDD....
.....4DDDDDD....
.....DDDDDDD....
.....DDDDDDD....
......DDDDD.....
........C.......
........C.......
........C.......
........C.......
........C.......` ],
  [ mountain, bitmap`
................
................
................
................
........1L......
.......1LLL.....
......1LLLL.....
......1LLLLL....
.....11LLLLL....
.....1LLLLLLL...
....11LLLLLLL...
....1LLLLLLLLL..
....1LLLLLLLLL..
....1LLLLLLLLLL.
...11LLLLLLLLLL.
...1LLLLLLLLLLL.` ],
  [ raft, bitmap`
................
................
................
................
................
................
...99CCCCCCC99..
..9999CCCCC9999.
..9999CCCCC9999.
...99CCCCCCC99..
................
................
................
................
................
................` ]
)

setSolids([player, tree, mountain, raft])

let level = 0
const levels = [
  map`
aaaaaa
a...pa
aysyya
a....a
a....a
awaaaa`,
  map`
aaaaaaa
ap...ya
a...yya
a.s...a
ay....a
ay...wa
aaaaaaa`,
]

const currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [ player ]: [raft]
})

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
  playTune(myTune2);
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(myTune3);
});
onInput("w", () => {
   getFirst(player).y -= 1;
  playTune(myTune);
});
onInput("a", () => {
   getFirst(player).x -= 1;
  playTune(myTune3);
});

onInput("j", () => {
  const currentLevel = levels[level]; 
  playTune(myTune);


  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});


afterInput(() => {
  const targetNumber = tilesWith(house).length;
  const numberCovered = tilesWith(house, raft).length;

  if (numberCovered === targetNumber) {
    level = level + 1;

    const currentLevel = levels[level];


    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
})