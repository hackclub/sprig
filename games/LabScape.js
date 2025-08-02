/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: LabScape
@author: 
@tags: []
@addedOn: 2025-00-00
*/
const player = "p"
const wall = "w"
const exit = "e"
const box = "b"

setLegend(
  [ player, bitmap`
................
................
..........0000..
..........08C00.
.....000000C0C08
....00CCCCCCCCC0
..000CCCCCCCC000
0.0CCCCCCCCCC00.
00000000000000..
....00.00.00.00.
....000...000...
................
................
................
................
................` ],
  [ wall, bitmap`
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
3333333333333333` ],
  [ exit, bitmap`
................
..444444........
..444444........
..44444444444...
..44444444444...
..44444444444...
..44444444444...
..CC444444444...
..CC...444444...
..CC............
..CC............
..CC............
..CC............
..CC............
..CC............
.CCCC...........`],
  [ box, bitmap`
5555555555555555
5557777777777555
5755777777755575
5775557777557775
5777755775577775
5777775555777775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5777777557777775
5555555555555555`]
)

setSolids([player, wall, box])

let level = 0
const levels = [
    map`
wwwwww
p....e
wwwwww`,
  map`
................
................
.......w..w.www.
..www..w.wwww.w.
.wwwww.w.w.wwww.
.w.w.w.w.wwww.w.
.w.w.w.www.wwww.
.w.w.wwp.......e
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwweww
...w.......w
.w.wwww.ww.w
.w....w.w..w
.w.ww.www.ww
.w..w.w...w.
pw..w...w.w.
wwwwwwwwwwww`,
  map`
wwwwwww...ww
....w.w.w.ww
.w.w....w..e
pw..w.w..w.w
.w..w.wwwwww
.wwww....w.w
......ww...w
wwwwwwwwwwww`,
  map`
wwwwwwwwwww
....b.....e
.www.www.ww
.w.w.....ww
.w....ww.ww
.w..ww..www
pw.wwwwwwww`,
  map`
wwwwwwwwwwwwwww
..............w
.wwwwwwwwwwww.w
.w..........w.w
.w.wwwwwwww.w.w
.w.w....b.w.w.w
.w.we.ww..b.w.w
.w.wwwwwwwwww.w
.w............w
pwwwwwwwwwwwwww`,
  map`
pw..w.ww.www.w.
.w..b..w...www.
.w..w.w..wb..b.
.w..w.b..w..w..
.w..w.wwww.ww..
.w..w.ww...wwb.
.b..wwww.wwe...`,  
  map`
wwwwwwwwwwwwwwwwwwwwwww
w.........w............
..w..w.ww.w...wwwwwww..
p.ww.www..w...w.....w.w
www..w....w.www..w..w.w
w....wwwwb..w....w.wwww
w....w......w...wwww..w
w.w..w.wwwwwwww.......w
w.w..w.w......w.wwwww.w
w.wwww.w.w..w.www...w.w
w........w..w.........w
wwwwwwwwwwwwwwwwwwwewww`, 
  map`
.wwwwwwwwwwwww
.w.......b.w.w
.w..w.wwww...w
.w.ww.w.wwwwew
.b....w....b.w
pw.b..w.ww.b.w
ww.w.wwb.w.b.w
w..w.....w.b..
w..ww....wwww.
wwwwwwwwww..w.`
]

setMap(levels[level])

setPushables({
  [ player ]: [ box ]
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
    // count the number of tiles with goals
  const targetNumber = tilesWith(exit).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(exit, player).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 5, color: color`5` });
    }
  }
})