/*
@title: Get_the_birdie!
@author: Sophie
@tags: ['puzzle']
@addedOn: 2022-12-23
*/


//SPRITE DEFINITIONS

const player = "p";
const wall = "w"
const bird = "b"

//MUSIC
const melody1 = tune `
30,
30: g5-30,
30: g5-30,
870`
const melody2 = tune `
165.74585635359117: e5/165.74585635359117 + c5/165.74585635359117,
165.74585635359117: e5/165.74585635359117 + c5/165.74585635359117 + g5/165.74585635359117,
165.74585635359117: d5/165.74585635359117,
165.74585635359117: c5/165.74585635359117,
165.74585635359117: f5/165.74585635359117 + d5/165.74585635359117,
165.74585635359117: e5/165.74585635359117,
165.74585635359117: f5/165.74585635359117 + d5/165.74585635359117,
165.74585635359117: d5/165.74585635359117,
165.74585635359117: b4/165.74585635359117 + d5/165.74585635359117,
165.74585635359117: e5/165.74585635359117,
165.74585635359117: f4/165.74585635359117 + a4/165.74585635359117,
165.74585635359117: e4/165.74585635359117,
165.74585635359117: c4/165.74585635359117 + g4/165.74585635359117,
165.74585635359117: d4/165.74585635359117,
165.74585635359117: f4/165.74585635359117 + a4/165.74585635359117,
165.74585635359117: d4/165.74585635359117,
165.74585635359117: e4/165.74585635359117,
165.74585635359117: f4/165.74585635359117,
165.74585635359117: a4/165.74585635359117,
165.74585635359117: g4/165.74585635359117,
165.74585635359117: c5/165.74585635359117 + e5/165.74585635359117,
165.74585635359117: b4/165.74585635359117,
165.74585635359117: e5/165.74585635359117 + g5/165.74585635359117,
165.74585635359117: a5/165.74585635359117,
165.74585635359117: g5/165.74585635359117 + e5/165.74585635359117,
165.74585635359117: f5/165.74585635359117 + a5/165.74585635359117,
165.74585635359117: c5/165.74585635359117,
165.74585635359117: d5/165.74585635359117 + f5/165.74585635359117,
165.74585635359117: b4/165.74585635359117,
165.74585635359117: d5/165.74585635359117,
165.74585635359117: b4/165.74585635359117,
165.74585635359117: d5/165.74585635359117 + f5/165.74585635359117`
const playback = playTune(melody2, Infinity)
//MUSIC^

setLegend(
  [ player, bitmap`
................
................
000.....0......0
0C0.....00....00
0900....09000090
0C90....09999990
00C0....04D99D40
.090000009933990
.09C9C9C9000000.
.09C9C9C9922290.
.09C9C9C9992290.
.09999999999990.
.09000000900090.
.09090..090.090.
.02020..020.020.
.00000..000.000.`],
  [wall, bitmap `
D444DDDDDDD444DD
DD4444DD444444DD
DD4444DD444444DD
4444DD4444444444
4444DD444DDD4444
DDDDDDD44DDD4DDD
444DDDD444444DD4
444444D4444DDDD4
DDDDDDD4444DDDD4
4DDD4444444D4DDD
4DDD4444DDDD4DDD
4DDD4444DDDD4DDD
DDDDDDDDDDDD4444
DDDDDDD4DDD44444
44444DD4DDD44DDD
44444DD4DDD44DDD`],
  [bird, bitmap `
................
................
................
................
................
.....333........
.....30333......
....633333......
......3333......
.......6........
......66........
................
................
................
................
................`]
);

setSolids([player, wall]);

addText("catch the bird!", { 
  y: 5,
  color: color`7`
})


let level = 0;
const levels = [
  map`
...
pwb`,
  map`
p.wb
w.w.
w...`,
  map`
.......w.
bwwww.ww.
w...w....
.ww..w.ww
...w.w...
.w.w....w
pw...ww..`,
  map`
w.ww.....w...
.....www..w.w
.w..w...w.w.w
www...w.w....
...www...w.w.
.w.wb..w.w.w.
.w..www..w.w.
..w....ww....
w...w.w...w.w
.ww....ww.w.w
p....w....w..`,
  map`
p....ww..w..w.
.w.ww...ww...w
w.....w.w..w..
..w..w....w..w
ww..w..w.w..wb
w..w..w..w.w..
w.w..w..w..w.w
..w....w...w..
.w.w..w..w..w.
.w...w..w..w..
w..w.w.w......
..w...w..ww.w.`,
  map`
.www.....w.w...ww.w.w.
w...ww.w.w..ww..w.w...
w.w.w..ww..w..w....ww.
w.w...w...w.w..w.ww...
w.www..w.w.....w...w.w
....ww.bw..w.w..ww.w..
.w.w..www....ww.....w.
w..w.w..w.wwww..w.w.w.
..w......w.....ww...w.
.wwww.w.ww.w..w.w..w..
..w...w.w..w.w....w...
w.w.w...w.w.w..w.w..ww
....w.ww..w.w.w.w.w...
.w.ww.....w...w...www.
..w...www..ww...w....p`,
]

setMap(levels[level]);



//PLAYER MOVEMENT


onInput("s", () => {
  getFirst(player).y += 1;
    playTune(melody1);
  clearText("catch the bird!")
  });

onInput("d", () => {
  getFirst(player).x += 1;
    playTune(melody1);
  clearText("catch the bird!")
});

onInput("a", () => {
  getFirst(player).x -= 1;
    playTune(melody1);
  clearText("catch the bird!")
});

onInput("w", () => {
  getFirst(player).y -= 1;
  playTune(melody1);
  clearText("catch the bird!")
});


//LEVEL SWITCHING 

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(bird).length;
  
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(bird, player).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;
    clearText()
       
    const currentLevel = levels[level];
  
  // make sure the level exists and set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
          } else {
      addText("you win!", { y: 7, color: color`0` });

    }
  }
  //SHOW YOU WIN AT END OF GAME

  
});
