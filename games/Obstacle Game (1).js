/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Obstacle Game
@author: endless
@tags: []
@addedOn: 2025-9-15
*/

const player = "p"
const wallV = "v";
const wallH = "h";
const wallVSolid = "i";
const wallHSolid = "j";
const goal = "g";

let currentLevel = 0;
setLegend(
  [ player, bitmap`
7777777777777777
7777777777777777
7700000000000077
7700000000000077
7700000000000077
7700000000000077
7700000000000077
7700000000000077
7700000000000077
7700000000000077
7700000000000077
7700000000000077
7700000000000077
7700000000000077
7777777777777777
7777777777777777` ],
   [ wallV, bitmap`
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......
......1111......` ],
    [ wallH, bitmap`
................
................
................
................
................
................
1111111111111111
1111111111111111
1111111111111111
1111111111111111
................
................
................
................
................
................` ],
    [ wallVSolid, bitmap`
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......` ],
    [ wallHSolid, bitmap`
................
................
................
................
................
................
0000000000000000
0000000000000000
0000000000000000
0000000000000000
................
................
................
................
................
................` ],
     [ goal, bitmap`
4444444444444444
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4DDDDDDDDDDDDDD4
4444444444444444` ]
)

setSolids([player,wallV,wallH,wallVSolid,wallHSolid])

let level = 0
const levels = [
  map`
pvh..g
.vh.vv
.vh.vv
.vh.vv
.vh.vv
.v...h`,
   map`
pi.....
.ihjji.
.i.iii.
.i.gii.
.i..ii.
.jjjjj.
.......`,
     map`
pv.v.v.
v.v.v.v
.v.v.v.
v.v.v.v
.v.v.v.
v.v.v.v
.v.v..g`,
       map`
pv.i.....
jhv.i....
i.hv.i...
.i.hv.i..
..i.hv.i.
...i.hv.i
....i.hv.
.....i..v
......i.g`,
         map`
pi.....ig
.i.hi.i..
h.j.i.i..
....i.i..
ji.ji.i..
..h...i..
..jjjji..
.i.v.....
..v......`,
]

setMap(levels[level])

setPushables({
  [ player ]: [wallV,wallH]
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {
  if (getFirst(player).x==getFirst(goal).x && getFirst(player).y==getFirst(goal).y){
    currentLevel+=1
     if (levels[currentLevel] !== undefined) {
      setMap(levels[currentLevel]);
    } else {
      addText("You win!", { y: 4, color: color`5` });
    }
   

  }
})