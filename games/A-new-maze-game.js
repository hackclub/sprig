/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: A new maze game
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const wall = "w"
const goal = "g"

setLegend(
  [ player, bitmap`
................
......666.......
.....66666......
....6999996.....
.....27972......
.....99999......
.....99999......
......444.......
.....04440......
....0.444.0.....
...0..777..0....
......7.7.......
......7.7.......
......0.0.......
.....00.00......
................` ],
  [ wall, bitmap `
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ goal, bitmap`
................
................
.....6666666....
....666666666...
...66666666666..
...66666666666..
...66666666666..
...66666666666..
...66666666666..
...66666666666..
...66666666666..
...66666666666..
....666666666...
.....6666666....
................
................` ]
)

setSolids([player, wall])

let level = 0
const levels = [
  map`
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww
wwwwwwwwwww
p.......gww
wwwwwwwwwww
wwwwwwwwwww`,
  map`
wwwwwww
w.....w
p.www.w
wwwww.w
wwwww.w
wwwww.w
wwwww.w
wwwwwgw
wwwwwww`,
  map`
w........ww
p.wwwwww.ww
wwwwwwww.ww
.........ww
.wwwwwwwwww
.........ww
wwwwwwww.ww
g........ww
wwwwwwwwwww`,
  map`
wwwwwwwwwwwp
w...........
w.wwwwwwwwww
w..........w
wwwwwwwwww.w
....www....w
.ww.....wwww
.wwwwwww...g
.........www`,
  map`
wwwwwwwwwwwwwwwwp
w................
w.wwwwwwwwwwwwwww
w.wwwwwwwwwwwwwww
w..w.............
ww...w.ww.wwwwwww
.ww.ww.ww.......w
.ww.ww.ww.wwwww.w
....ww.ww.w...w.w
wwwwww..w.www.w.w
wwwwwwwww.w...w.w
w.........w.w...w
w.wwwwwwwww.wwwww
w.wwwwwwwwwwwwwww
w.............gww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwww
wpwwwwwwwwwwwwwwwwwwwwww
w......................w
wwww.wwwwwwwwwwwwwwww.ww
...............wwwwww.ww
wwwwwwwwwwwwwwwww.....ww
ww.....www....www.www.ww
w..www.www.ww.www.www.ww
w.wwww.www.ww.www.www...
w.wwww.....ww.....wwwwww
w.wwwwwwwwwwwwwwwwwwg.ww
w......wwwwwwwwwwwwww.ww
wwwwww.ww.......wwwww.ww
ww.....ww.wwwww.wwwww.ww
ww.wwwwww.wwwww.......ww
ww...........ww.wwww.www
wwww.wwwwwww.ww.wwww.www
.....wwwwwww.ww.wwww....`
]

setMap(levels[level])

setPushables({
  [ player ]: []
});

onInput("s", () => {
  getFirst(player).y += 1
});
onInput("w", () => {
  getFirst(player).y -= 1
});
onInput("a", () => {
  getFirst(player).x -= 1
});
onInput("d", () => {
  getFirst(player).x += 1
});

onInput("j", () => {
  const currentLevel = levels[level];

if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {

  const targetNumber = tilesWith(goal).length;
  
 
  const numberCovered = tilesWith(goal, player).length;

 
  if (numberCovered === targetNumber) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`7` });
    }
  }
});