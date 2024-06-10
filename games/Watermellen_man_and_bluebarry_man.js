
/* 
@title: Watermellen_man_and_bluebarry_man
@author: Joel Robbins
@tags: []
@addedOn: 2023-06-05
*/

    /*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

const playera = "a"
const playerb = "b"
const wall = "w"
const bgoal = "c"
const agoal = "d"
setLegend(
  [ playerb, bitmap`
................
................
................
................
................
................
......00000.....
.....0555550....
....055050550...
....055555550...
....050555050...
....055000550...
.....0555550....
......00000.....
.......0.0......
......00.00.....` ],
  [ playera, bitmap`
................
................
.......3........
......333.......
......333.......
.....33333......
.....30303......
....3333333.....
....3033303.....
...333000333....
...333333333....
...444444444....
...DDDDDDDDD....
......0.0.......
.....00.00......
................`],
  [ wall,  bitmap`
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
0000000000000000` ],
[ agoal , bitmap`
................
................
...4444444444...
..4..........4..
.4.4444444444.4.
.4.4444444444.4.
.4.4444444444.4.
.4.4444444444.4.
.4.4444444444.4.
.4.4444444444.4.
.4.4444444444.4.
.4.4444444444.4.
.4.4444444444.4.
..4..........4..
...4444444444...
................`],
  [ bgoal,  bitmap`
................
................
................
.....5555555....
....5.......5...
...5.5555555.5..
...5.5555555.5..
...5.5555555.5..
...5.5555555.5..
...5.5555555.5..
...5.5555555.5..
...5.5555555.5..
....5.......5...
.....5555555....
................
................`]
)

setSolids([ playera,wall, playerb ])

let level = 0;
const levels = [
  map`
d....c
wwwww.
......
wwwww.
b....a`,
  map`
d.....c
www.www
..w.w..
..w.w..
..w.w..
b.....a`, 
  map`
d.....c
.......
..waw..
ww.w.w.
.......
...b...`, 
  map`
....cd.....
w.wwwwwww.w
...........
...........
w.wwwwwww.w
...........
....ab.....`, 
  map`
dw..........
.ww.wwwwww.w
.ww.wwwwww.a
.ww.wwwwwwww
....wwwwwwww
wwwwwwwwwwww
wwwwwwwwww.b
wwwwwwwwww.w
c...........`,
  map`
...w...........w...
.w.w.w.wwwww.w.w.w.
.w.w.w.wa.bw.w.w.w.
.w.w.w.w.w.w.w.w.w.
.w.w.w.......w.w.w.
.w.w.w.......w.w.w.
dw...w.......w...wc`,   map`
d....c
w.wwww
......
ww.www
b....a`,
  map`
dwwwwwc
...w...
.ww.ww.
.ww.ww.
.w...w.
b..w..a`, 
  map`
dwwwwwc
....ww.
wwwaww.
wwwwww.
wwwwww.
wwwb...`, 
  map`
....cd.....
w.wwwwwwwww
...........
...........
wwwwwwwww.w
...........
....ab.....`, 
  map`
dw..........
.ww.wwwwww.w
.ww.www....a
.ww.ww..wwww
....w..wwwww
www...wwwwww
wwwwwwwwww.b
wwwwwwwwww.w
c...........`,  
];

setMap(levels[level])

setPushables({
  [ playera ]: []
})

onInput("s", () => {
  getFirst(playera).y += 1
})

onInput("w", () => {
  getFirst(playera).y += -1
})

onInput("d", () => {
  getFirst(playera).x += 1
})

onInput("a", () => {
  getFirst(playera).x += -1
})

onInput("k", () => {
  getFirst(playerb).y += 1
})

onInput("i", () => {
  getFirst(playerb).y += -1
})

onInput("l", () => {
  getFirst(playerb).x += 1
})

onInput("j", () => {
  getFirst(playerb).x += -1
})

afterInput(() => {
  
})



//teleport players 
afterInput(() => {
  const targetNumber = tilesWith(agoal).length; 
  const targetNumber2 = tilesWith(bgoal).length; 

  const targetNumberboth = targetNumber + targetNumber2; 
  
const numberCovered = tilesWith(agoal, playera).length;
  const numberCovered2 = tilesWith(bgoal, playerb).length; 

  const bothCovered = numberCovered + numberCovered2; 

  if (bothCovered === targetNumberboth) {
    // increase the current level number
    level = level + 1;
    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
      clearInterval(tempodescendo);
    }
  }
});
