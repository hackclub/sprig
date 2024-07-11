

// Made for the arcade session
// is a remix of the maze game start by Cher Berhanu

// Finished on July 9th, 2024 



const player = "p" // key
const goal = "g" // lock
const wall = "w" // concrete wall
let number = 0;

const melody = tune `
500: A5-500 + C4~500,
500: C4^500,
500: D5-500 + C4^500,
500: C4^500,
500: G5-500 + C4~500,
500: C4^500,
500: C5-500 + C4^500,
500: C4^500,
500: F5-500 + C4~500,
500: C4^500,
500: A5-500 + C4^500,
500: C4^500,
500: G5-500 + C4~500,
500: C4^500,
500: C5-500 + C4^500,
500: A5-500 + C4~500,
500: C4^500,
500: C4^500 + D5-500,
500: C4^500,
500: C4~500 + G5-500,
500: C4^500,
500: C4^500 + C5-500,
500: C4^500,
500: C4~500 + F5-500,
500: C4^500,
500: C4^500 + A5-500,
500: C4^500,
500: C4~500 + G5-500,
500: C4^500,
500: C4^500 + C5-500,
500: C4~500,
500: C4^500`;

playTune(melody, Infinity);

setLegend(
  [player, bitmap`
................
................
................
................
.66666..........
6666666.........
6622266666666666
662226666.6.6.66
66222666.6.6.6..
6666666.........
.66666..........
................
................
................
................
................`], // key
  [goal, bitmap`
................
................
................
......6666......
.....666666.....
....66....66....
....6......6....
....6......6....
....6......6....
....66666666....
....66666666....
....66111166....
....66111166....
....66611666....
....66611666....
....66666666....`], // lock
  [wall, bitmap`
0000000000000000
LLLLLL00111110LL
LLLLLL00111110LL
0000000000000000
11110LLLLL011110
11110LLLLL011110
0000000000000000
LLLLLL0111110LL0
LLLLLL0111110LL0
0000000000000000
111110LLLL011110
111110LLLL011110
0000000000000000
LLLL01111110LLL0
LLLL01111110LLL0
0000000000000000`], // concrete wall

)

setSolids([player, wall])

let level = 0
const levels = [
  map`
....
p..g`, // level 1
  map `
...w...
.w.w.w.
.w.w.wg
pw...ww`, // level 2
  map `
....pw...
..w..www.
www......
...www...
.w.....ww
ww...w...
...www.ww
.ww.w....
...gw.ww.`, // level 3
  map `
....p....
.wwwwwww.
...w...w.
wwww.w...
.....w...
..wwwwww.
.w.....w.
.w.ww..w.
...w.g.w.`, // level 4
  map `
.w.....ww..
.ww.www..w.
.......w.w.
www......ww
..www.www.w
p.....w....
.wwwwww...g
..w....ww..
.......w..w
w.wwww.w..w
w...w..w.w.
w...w..w.w.
www..ww..ww
...w.......`, // level 5
  map `
......p.....w
..w...w.ww...
..ww..w.w..ww
...wwwwwww...
ww..w.w......
..w...w..wwww
wwwww.w......
....w.ww.w.w.
.w.....www...
wwwwww.w.w..w
.w.....w.w.w.
....wwww...w.
w.....w..w.w.
.w.w..wwww...
..www.gw.....`, // level 6
  map `
.w.p.www..w..w.
.w.....wwww.ww.
.......w.......
.wwww..w.wwww..
.w.....w.w.....
.w..wwww.w.w.w.
.w.......w...w.
.wwwwwwwwwww.w.
..w..........w.
..w.w....www.w.
..w.wwww...w.w.
.......ww..www.
wwww....ww.....
...www...www...
........g..w...`, // level 7 
  map `
wp................
w.wwwwwwwwwwwwwww.
w.w.....w.........
....wwwwwwwwwww.w.
..........w.....w.
wwwwwwwww.w.wwwww.
..........w.w.....
..wwwwwww.w.w.wwww
..w...w.w.w...w...
..ww..w.www...w.w.
...w....w....ww.w.
.www..w.w.w.....ww
...w.w..w.www.....
.....w..w...wwww..
..wwww..wwwww..w..
..w.........w..g..`, // level 8 
  map `
w...............
wwwwww..wwwwwww.
p...........w.ww
...www......w...
ww...wwwww..w...
w..w.w...w.ww..g
w..www.www...w..
w...w..w.....w.w
w.w.w....w...w..
www.w..w.ww....w
.w..w..w...ww.w.
.w..wwwwww....w.
.ww.....w.ww.ww.
..ww..www.....w.
....w.w.w..www..
....w.......w...`, // level 9 not done
  map `
.www......w......
.w.www....w....w.
..ww..ww....www.w
p..w...w...w..w.w
.....w.w......w..
wwww.w..w...wwww.
..........ww.....
.www.wwww..w..w..
.w......ww..w.w..
.w..w.w..wwww.w..
.wwww.w...ww...ww
.w...........w...
.w.....www...w...
..wwwwww.w..ww..w
............ww.ww
.ww.wwww....ww.w.
www......wwwwwgw.`, // level 10 not done



]

setMap(levels[level])


setPushables({
  [player]: []
})

onInput("s", () => {
  getFirst(player).y += 1 // move down
});

onInput("w", () => {
  getFirst(player).y -= 1 // move up
});

onInput("d", () => {
  getFirst(player).x += 1 // move right
});

onInput("a", () => {
  getFirst(player).x -= 1 // move left
});

onInput("j", () => {
  setMap(levels[level])
});





// these get run after every input
afterInput(() => {
  const numberOfGoalsCovered = tilesWith(player, goal); // tiles that both contain the player and goal

  // if at least one goal is overlapping with a player, proceed to the next level
  if (numberOfGoalsCovered.length >= 1) {
    // increase the current level number

    level = level + 1;

    // check if current level number is valid
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("you win!", {
        y: 6,
        color: color`6`
      });
    }
  }
});