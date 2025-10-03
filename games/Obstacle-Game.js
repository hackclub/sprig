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

const pushButton = "k";
const gate = "l";
const lava = "e";

const moveTune = tune`
500: E4~500 + E5~500,
15500`;
const winTune = tune`
218.97810218978103: C4~218.97810218978103,
218.97810218978103: E4~218.97810218978103,
218.97810218978103: F4~218.97810218978103,
6350.36496350365`;
const loseTune = tune`
500: E5/500,
15500`;

setLegend(
  [player, bitmap`
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
7777777777777777`],
  [wallV, bitmap`
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
......1111......`],
  [wallH, bitmap`
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
................`],
  [wallVSolid, bitmap`
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
......0000......`],
  [wallHSolid, bitmap`
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
................`],
  [pushButton, bitmap`
555555555555555.
577777777777775.
576666666666675.
576777777777675.
576777777777675.
576777777777675.
576777777777675.
576777777777675.
576777777777675.
576777777777675.
576777777777675.
576777777777675.
576666666666675.
577777777777775.
555555555555555.
................`],
  [gate, bitmap`
0000000000000000
0033333333333300
0033333333333300
0033333333333300
0033333333333300
0033333363333300
0033333636333300
0033333363333300
0033333663333300
0033333363333300
0033333663333300
0033333363333300
0033333663333300
0033333333333300
0033333333333300
0000000000000000`],
  [lava, bitmap`
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
3333333333333333`],
  [goal, bitmap`
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
4444444444444444`]
)

setSolids([player, wallV, wallH, wallVSolid, wallHSolid,gate])
let currentLevel = 0;
const levelNames = [

  "Starting out",
  "Spiral",
  "Checker",
  "Diagonal",
  "Puzzle #1?",
  "getting real",
  "Easy?",
  "Double :o",
   "Hard",
   "Quad",
]
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
  map`
.ik....i....g
..vv...i..i..
.i..ii.i.i...
.i.ii..i.i...
.i.ij..vv.i..
.i...i.i.ii..
p.vvji.i..i..
.ii..i.jj.i..
.ijj.i..i.i..
.i....i.i.i..
.i.jh.i.i.i..
.ijj.jili.i..
......i.h..i.`,
  map`
p..v...i...v....h.i.v
.i..ii..i.j..i..iii.i
..v...i..i..j..i..i.i
..i..i..v..ii..i..i..
i..j..i..i..i..v..ii.
..i..ii..i.j..i..i..i
v..i..i..v..i..i..i..
..i..j..i..ii..i..i..
..v..i..i..i..v..i...
.i..ii..i..i..ii..i..
..i..i..v..i..i..i...
..i..i..i..i..v..i..g
..v..i..i..j..i..i...
..i..i..v..i..ii..i..
..k...v..i..i..l.....`,
  map`
p....i.....
..e..i..e..
..e..i..e..
..e..i..e..
..e.gi..e.g
..e..i..e..
..e..i..e..
..e..i..e..
..e..i..e..
.....ip....`,
    map`
pi...iii..g
.e...ii.ljj
.e...ihh...
.e...i.h.i.
.e...i.e.i.
.e...i.e.i.
.hk..i.e.i.
.ili.i.e.i.
.i.i.i.e.i.
.igi.ipe.i.`,
     map`
p....ipi..k
..e..i.i...
e....i.i...
...lli...ll
..ilgi...lg
jjjjjijjjjj
pe.i.ip....
...i.ijj...
.....i.....
...lli...ll
...lgi...lg`,

]

setPushables({
  [player]: [wallV, wallH]
})

resetLevel();

function playMoveSound() {
  // playTune(moveTune);
}
function resetLevel() {
  setMap(levels[currentLevel]);
  
  clearText(); // removes all text
  addText("lvl "+(currentLevel+1) +":"+levelNames[currentLevel],{ x: 2, y: 0, color: color`5` });

}

function checkAllCollision(item1, item2, funcToDo) {
  getAll(item1).forEach((player) => {
    getAll(item2).forEach((lava) => {
      if (lava && player.x == lava.x && player.y == lava.y) {
        funcToDo()
      }
    })
  })
}

function lose() {
  playTune(loseTune);
  resetLevel();
}
function removeGate() {
  getAll(gate).forEach(g => g.remove());
}

function nextLevel() {
  currentLevel += 1
  playTune(winTune);
  if (levels[currentLevel] !== undefined) {
     resetLevel() 
  } else {
    addText("You win!", { y: 2, color: color`4` });
  }
}

function allPlayersOnGoal() {
  const players = getAll(player);
  return players.every(p => {
    return getAll(goal).some(g => g.x === p.x && g.y === p.y);
  });
}

afterInput(() => {
  checkAllCollision(player, lava, lose)
  checkAllCollision(player, pushButton, removeGate)

  if (allPlayersOnGoal()) {
    nextLevel();
  }
})
onInput("s", () => {
  getAll(player).forEach((player) => {
    player.y += 1
    playMoveSound()
  })
})

onInput("w", () => {
  getAll(player).forEach((player) => {
    player.y -= 1
    playMoveSound()
  })
})

onInput("a", () => {
  getAll(player).forEach((player) => {
    player.x -= 1
    playMoveSound()
  })
})

onInput("d", () => {
  getAll(player).forEach((player) => {
    player.x += 1
    playMoveSound()
  })
})
onInput("i", resetLevel)
