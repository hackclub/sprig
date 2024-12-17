/*
@title: restocker simulater
@author: omegakitty
@tags: ['puzzle']
@addedOn: 2022-11-23
*/

//wasd for banana player
//ijkl for other player
//a+l for level reset

const player = "p";
const player2 = "n";
const box = "b";
const goal = "g";
const wall = "w";
const obst = "z";
const squeek = tune`
64.1025641025641: c4/64.1025641025641,
64.1025641025641: g4/64.1025641025641 + g5/64.1025641025641,
64.1025641025641: g4/64.1025641025641 + g5/64.1025641025641 + a5/64.1025641025641,
1858.974358974359`
var val1 = false
var val2 = false
setLegend(
  [ player, bitmap`
................
................
................
...000..........
...0.0..........
..0..0..........
..0...0.........
0003.30.........
0.0...000.......
0.05550..01.....
..0...0...111111
.0....0...1.1..1
.0...0....1..1.1
..000.....111111
..0.0.....1...1.
.00.00....L...L.`],
  [ player2, bitmap`
................
................
................
.666666.........
.666666.........
.666666.........
.666666.........
0LLLLLL.........
0LLLLLL00.......
0LLLLLL..01.....
0LLLLLL...111111
.LLLLLL...1.1..1
.000000...1..1.1
.000000...111111
.00..00...1...1.
.00..00...L...L.`],
  [ box, bitmap`
................
................
................
...888888888....
...8...8...8....
...8...8...8....
...8...8...8....
...888888888....
...8...8...8....
...8...8...8....
...8...8...8....
...888888888....
................
................
................
................`],
  [ goal, bitmap`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4.......4....
...4.......4....
...44......4....
....4......4....
....44....44....
.....444444.....
................
................
................`],
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
  [ obst, bitmap`
.666666.........
.666666.........
.666666.........
.666666.........
.666666.........
.LL33LL.........
.LL33LL.........
.LL33LL....666..
.LL33LL....666..
.LLLLLL....666..
.000000....L3L..
.000000....L3L..
.00..00....LLL..
.00..00....000..
.00..00....0.0..
.00..00....0.0..`]
);
setSolids([player, player2, box, wall, obst]);
let level = 0;
const levels = [
  map`
ww....g
ww.bbww
nww....
wwg...p`,
  map`
wwwnwww
p.www.g
.bwgwzb
.......
z...wz.
z.bggb.`,
  map`
pbggb.wgb.wgb.
..ww..ww.bgw..
.bgw.bgw..ww..
........z...z.
z.z..z....b...
..ww..ww..ggb.
.bgwz.wgb.ww..
..ww..wgb.wnw.`,
  map`
w..ww
z..wn
zgbgz
w.b.z
z.w.z
wbw.w
wg.pw`,
  map`
p...wn.bg
..b.w....
..ggw.b..
.bw.z....
....z....
....w.b..
.b..w...g
...gw.g..`,
   map`
.n..wg
www..b
.pww..
.wbgww
....ww`,
];
const currentLevel = levels[level];
setMap(currentLevel);
setPushables({
  [ player ]: [box],
  [ player2 ]: [box],
});
//player movment
onInput("s", () => {
  getFirst(player).y += 1,
  playTune(squeek)
});
onInput("w", () => {
  getFirst(player).y -= 1,
  playTune(squeek)
});
onInput("d", () => {
  getFirst(player).x += 1,
  playTune(squeek)
});
onInput("a", () => {
  val1 = true;
  getFirst(player).x -= 1,
  playTune(squeek)
  setTimeout(() => {val1 = false}, "500")
})
//player2 movement
onInput("k", () => {
  getFirst(player2).y += 1,
  playTune(squeek)
});
onInput("i", () => {
  getFirst(player2).y -= 1,
  playTune(squeek)
});
onInput("l", () => {
  val2 = true;
  getFirst(player2).x += 1
   playTune(squeek)
  setTimeout(() => {val2 = false}, "500")
});
onInput("j", () => {
  getFirst(player2).x -= 1,
  playTune(squeek)
});
//testing
if(val1 == true){
addText("you win!", {
        //x: 3,
        y: 7,
        color: color`3` });
}
// level reset
function resetcheck() {
if(val1 == true && val2 == true) {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText();
    setMap(currentLevel);
  }
     //addText("both vals are true!") 
 }
}//function close

//level finish or next level
afterInput(() => {
  //clearText() 
  //addText(`${val1}${val2}`) 
  resetcheck()
  const numberCovered = tilesWith(goal, box).length;
  const targetNumber = tilesWith(goal).length;
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;
    const currentLevel = levels[level];
    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", {
        x: 3,
        y: 7,
        color: color`3` });
    }
  }
});
