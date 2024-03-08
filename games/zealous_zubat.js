/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@img: ""
@addedOn: 2024-00-00
*/

const player = "p"
const hamburger = "h";
const wall = "w";
const myTune = tune`
123.20328542094455,
61.60164271047228: C5^61.60164271047228,
1786.447638603696`
setLegend(
  [ player, bitmap`
..111......111..
..181......181..
.11111111111111.
.11111111111111.
.11111111111111.
.11101111110111.
.11111111111111.
.11111111111111.
2221111011112222
.11111111111111.
2221010001012222
..1100010001111.
2221111111112222
.11111111111111.
................
................` ],
  [hamburger, bitmap`
................
....FFFFFFFF....
...FF2FFFF2FF...
..FFFFF2FFFFFF..
..FF2FFFFF2F2F..
..333333333333..
..444444444444..
..666666666666..
..666666666666..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..FFFFFFFFFFFF..
..FFFFFFFFFFFF..
................
................`],
  [wall, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHH22222222HHH
HHHHH2HHHHHH2HHH
HHHHH2HHHHHH2HHH
HHHHH2HHHHHH2HHH
HHHHH2HHHHHH2HHH
HHHHH22222222HHH
HHHHH2HHHHHHHHHH
HHHHH2HHHHHHHHHH
HHHHH2HHHHHHHHHH
HHHHH2HHHHHHHHHH
HHHHH2HHHHHHHHHH
HHHHH2HHHHHHHHHH
HHHHH2HHHHHHHHHH
HHHHH2HHHHHHHHHH`]
)

setSolids([ player, wall ]);

let level = 0
const levels = [
  map`
wwwwwwwwwwwww
w...........w
w.wwwwwwwww.w
w...........w
w.w.w.www.www
www.w.w.w...w
p...w.w.www.w
www.w.w.....w
w.w.w.wwwww.w
w.w.w.....w.w
w.www.www.w.w
wh......w.w.w
wwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwww
w........w.....w..w
wwwwwwww.wwwww.ww.w
w.....hw.....w....w
w.wwwwww.wwwww.ww.w
w.w......w......w.w
w.w.w.w..wwwwww.w.w
w.w.w.w.......w.w.w
w.w.w.w.www.www.w.w
w.w.w.w.w.w.....wpw
w.www.w.w.w.wwwwwww
w...w.w.w.w.w.....w
www.www.w.w.w.www.w
w.w.....w.w.w.w.w.w
w.w.wwwww.w.w...w.w
w.w.w.......wwwww.w
w.w.wwwwwww.......w
w.........w.......w
wwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwww
wp...w...w....w......w
w....w.w.w....w......w
w....www.w.w..w.www..w
w........w.w..w.w.w..w
w..w.wwwww.w.w..w.ww.w
w..w...w...w.w.ww..w.w
w..w...w.w.w.w..w..w.w
w..w...w.w.w..whw..w.w
w..w...w.w.w..www..w.w
w..w...w.www.......w.w
w..w...............w.w
w..wwww.wwwwwwwww..w.w
w.....w..............w
www...wwwwwww........w
w.w.......www..wwwww.w
w.w.w....ww...ww...w.w
w.w.w.ww.w....w..w.w.w
w.www.ww.www.ww.w..w.w
w.....ww...www..w.ww.w
w.................w..w
wwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwww
w.............w.....w
w.w.w.........wwww..w
w.w..w.wwww.........w
w.w..w.wh..ww..ww...w
w.w..w.ww...w..w..w.w
w.w..w..w...w..w..w.w
w.w..w..w..ww..ww.w.w
w.w..w..w..ww...w.w.w
w.w..w..w...w...w.w.w
w.w..w..w...w...w.w.w
w.w.www.w...ww.ww.w.w
w.w.w.w.www..www....w
w.w.w.w...w.........w
w.w.w.w.www...wwww..w
w.wpw.w.w...www..w..w
w.www.www...w...ww..w
w...........w.......w
wwwwwwwwwwwwwwwwwwwww`
]
 
const currentLevel = levels[level];
setMap(currentLevel);




onInput("s", () => {
  getFirst(player).y += 1;
  playTune(myTune);
  // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(myTune);
});
onInput("w", () => {
  getFirst(player).y -= 1;
  playTune(myTune);
});
onInput("a", () => {
  getFirst(player).x -= 1;
  playTune(myTune);
});
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// these get run after every input
afterInput(() => {
  // count the number of tiles with hamburgers
  const targetNumber = tilesWith(hamburger).length;
  
  // count the number of tiles with hamburger
  const numberCovered = tilesWith(hamburger, player).length;

  // if the number of hamburger is the same as the number of goals covered
  // all hamburger are covered and we can go to the next level
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
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});