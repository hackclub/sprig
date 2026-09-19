/*
@title: Azlan Khan
@author: Xr9 
@description: i am a maze
@tags: ["maze"]
@addedOn: 2026-05-15
*/

const player = "p";
const wall = "w";
const one = "o";
const two = "t";
const three = "3";
const fakegoal = "f";
const goal = "g";
let count = 0;

setLegend(
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
  [ wall, bitmap`
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
  [ one, bitmap`
2222222222222222
2222222222222222
2222220022222222
2222220022222222
2222202022222222
2222022022222222
2220222022222222
2220222022222222
2222222022222222
2222222022222222
2222220022222222
2222220222222222
2222220222222222
2000000000000222
2222222222222222
2222222222222222`],
  [ two, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222000000022222
2222022222022222
2222022222022222
2222222222022222
2222222220022222
2222222200222222
2222220002222222
2222200222222222
2220002222222222
2220000000000222
2222222222222222
2222222222222222
2222222222222222`],
  [ three, bitmap`
2222222222222222
2222222222222222
2222200000222222
2222222222022222
2222222220022222
2222222002222222
2222222200002222
2222222222202222
2222222222202222
2222222220002222
2222200000222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [ fakegoal, bitmap`
2222220002222222
2222220002222222
2222000000022222
2222020002022222
2222020002022222
2222020002022222
2222020002022222
0000000000000000
0000000000000000
2222020002022222
2222020002022222
2222020002022222
2222020002022222
2222000000022222
2222220002222222
2222220002222222`],
  [ goal, bitmap`
2222220002222222
2222220002222222
2222000000022222
2222020002022222
2222020002022222
2222020002022222
2222020002022222
0000000000000000
0000000000000000
2222020002022222
2222020002022222
2222020002022222
2222020002022222
2222000000022222
2222220002222222
2222220002222222`]
);

const levels = [
  map`
wwwwwwwwwwwwwwwwwwwwwww
wgw.........fw......wfw
w.w..www.....w..w...w.w
w.w.ww.w.....w..wwwww.w
w.www..www..www...wfw.w
w.....wwfw..w.ww..w.w.w
w..wwww..w.....ww.w.w.w
w..w........w.....w.w.w
w..w...www..w.wwwww.w.w
w.ww...w.wwww.......w.w
w.w..w.w.......ww...w.w
w.w.ww.w.w.pw...wwwww.w
w.w.w..w.wwww.www.....w
w.w.w..w...........ww.w
w.w.w..w..wwww...w.w..w
w.w.w....ww.fw..ww.w..w
w.w.www...w..w.ww..w..w
w.w...www......w...ww.w
w.w.....wwwwww...www..w
w.w.www..........w.w..w
w.www.wwwwwwwwwwww.ww.w
wf...................fw
wwwwwwwwwwwwwwwwwwwwwww`,
  map`
................w.f..f
.w.............fw..ww.
.wwwwwwwwwwwwwwww..w..
.wg............fw..w..
.w.....wwwww....w..w..
.wwww..w...w.w..w..w..
.....w.ww..w.w..w..w..
.....w..w..w.w..w..w..
....ww..ww.w.w..w..w..
...........w.w..w..w..
wwwwwwwwwwww.wwww..w..
f...wf.........fw..w..
.w.wwwww....wwwww..w..
.w.w...www.wwf.ww..w..
.wwww.ww.w.ww...w..w..
....wp...w..w.....www.
.w..wwww....w....wwww.
.wwww..w.w..w....ww...
..w.w..w.w..w....w....
f...........wwwwww....
wwwwwwwwwww..........f`,

  map`
...wwwwwwwwwwwwwwwwf
.w................w.
.ww.wwwwwwwwwwwww.w.
.fw.wp..........w.w.
..w.wwwwwwwwwww.w.w.
..w...........w.w.w.
..w.wwwwwwwwwfw.w.w.
..w...........w.w.w.
..w.wwwwwwwwwww.w.w.
..w.............w.w.
..w.wwwwwwwwwwwww.w.
.ww...............w.
.w....wwwwww..fwwww.
.w...wwf....www.....
.w...www............
.w.....www....www...
.w.......wwwww..ww..
.w...............wf.
.w....wwwww......w..
.wwwwwwg..fwwwwwww..
f...................`,

  map`
wwwwwwwwwwwww..........
wfffffffffffw..........
wfffffffffffw..........
wfffffffffffw..........
wfffffffffffw..........
wfffffffffffw..........
wfffffffffffw..........
wfffffffffffw..........
wfffffffffffwwwwwwwwwww
wffffffffffffffffffffff
wffffffffffffffffffffff
wffffffffffffffffffgfff
wffffffffffffffffffffff
wffffffffffffffffpfffff
wffffffffffffffffffffff
wffffffffffffffffffffff
wffffffffffffffffffffff
wffffffffffffffffffffff
wwwwwwwwwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwww
w.......w....w
w..f....w....w
w......ww....w
w...wwww.....w
w..w.......f.w
w..ww......f.w
w...wwww.....w
w......ww....w
w.......ww...w
w.......gw...w
w.....www....w
w.....w......w
w....ww......w
w...ww.......w
w...w......f.w
w...w........w
w............w
w...w........w
w...w.wwww...w
w....ww..ww..w
w...ww....w..w
w...w.....ww.w
w...w......w.w
w..........w.w
w.....ww..ww.w
w.........w..w
w..www...w...w
w.......ww...w
wf..wwww.....w
w...w........w
w..w.........w
w..ww........w
w...www......w
w.w...ww.....w
w..w...ww....w
w..w....w...fw
w...ww.w....fw
w..wwwww.....w
w.ww.....ww..w
w.w.......ww.w
w.ww.......w.w
w..ww.w....w.w
w...www..www.w
w.....w.ww...w
w.ff..w.w.f..w
w.....wpw....w
wwwwwwwwwwwwww`
]

setMap(levels[count]);
setSolids([ player, wall ]);

onInput("s", () => { getFirst(player).y += 1 })
onInput("d", () => { getFirst(player).x += 1 })
onInput("a", () => { getFirst(player).x -= 1 })
onInput("w", () => { getFirst(player).y -= 1 })

afterInput(() => {
  // Check if player is on the same tile as a goal
  const playerTile = getFirst(player);
  const goalsAtPlayer = getTile(playerTile.x, playerTile.y).filter(t => t.type === goal);

  if (goalsAtPlayer.length > 0) {
    count++; // Move to next level index

    if (count < levels.length) {
      setMap(levels[count]);
    } else {
      // No more levels left!
      addText("You Win!");
    }
  }
});
