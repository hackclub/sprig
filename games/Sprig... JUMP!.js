/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Sprig... JUMP!
@author: Yanella FT
@tags: ['game']
@addedOn: 2025-10-13
*/

const player = "p"
const cactus = "c"
const bird = "b"
const ground = "g"
const house = "h"

setLegend(
  [ player, bitmap`
.......444......
.......4D4......
.......4C4......
........C.......
......LLLLL.....
.....LL1111LL...
.....L111011LL..
.....L1111111L..
.....L1111011L..
.....L1111000L..
.....L111LLLL...
.....LL11L......
.....LLL1L......
.....L111LL.....
.....L111L......
.....LL11LL.....`],
  [ cactus, bitmap`
................
................
................
................
.......D9.FD....
...9D..DD.DD....
...DDF.9DDD9....
...DDD.DDDDF....
...FDDDDD....D..
....DDDDD...DD..
.......9DDDF9D..
..F....DDDDDDD..
..DDD..DD.......
..DDDDDFD.......
...D9DDDD.......
.......D9.......`],
  [ bird, bitmap`
................
................
................
................
................
.0000.....0000..
....000..00.....
......0000......
.......00.......
................
................
................
................
................
................
................`],
  [ ground, bitmap`
4444444444444444
DDDDDDDD4DDDDDD4
D4DDDD4DDDDDDDDD
DDDDD4DDDDDDD4DD
CCCCCCFCCCCCCCCF
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCFCCCCCCCCCCCCC
CCCCCCCCCCCCFCCC
CCCCCCFCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCFCCCCFCCCCCCCF
CCCCCCCCCCCCFCCC
CCCCCCCCCCCCCCCC
CCCFCCCCFCCCCCCC`],
  [ house, bitmap`
.......FFF......
......FFCFF.....
.....FFCCCFF....
....FFCC7CCFF...
...FFCC777CCFF..
..FFCCCCCCCCCFF.
.FFCCCCCCCCCCCFF
.FFFFFFFFFFFFFFF
.FCCCCCCCCCCCCCF
.FCCCC8888CC77CF
.FCCCC8888CC77CF
.FCCCC8888CCCCCF
.FCCCC888HCCC3CF
.FCCCC8888CC333F
.FCCCC8888CCCDCF
.444444444444444`]
)

setSolids([ player, ground ])
//setBackground(color`7`);

let level = 0
const levels = [
  map`
......
p.c..h`,
  map`
.b......
...b....
pc...c.h`,
  map`
.b...h
...gcg
pggggg`,
  map`
..b...
.....h
b..gbg
.b...g
p..c.g
gcgggg`
]

setMap(levels[level])

//setPushables({
//  [ player ]: []
//})

onInput("d", () => {
  getFirst(player).x += 1; //moves player to right
});
onInput("a", () => {
  getFirst(player).x -= 1; //moves player to left
});
onInput("w", () => {
  getFirst(player).y -= 1; //moves player up
});
onInput("s", () => {
  getFirst(player).y += 1; //moves player down
});
onInput("j", () => { //resets player back to beginning of level
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    setMap(currentLevel);
  }
});

afterInput(() => {
  const end = tilesWith(player, house).length;
  const hit1 = tilesWith(player, cactus).length;
  const hit2 = tilesWith(player, bird).length;
  const winTune = tune`
107.52688172043011: B4^107.52688172043011,
107.52688172043011: C5-107.52688172043011 + C4/107.52688172043011,
107.52688172043011: B4-107.52688172043011 + C4/107.52688172043011,
107.52688172043011: B4^107.52688172043011,
107.52688172043011: C5-107.52688172043011 + C4/107.52688172043011,
107.52688172043011: D5-107.52688172043011 + C4/107.52688172043011,
107.52688172043011: E5^107.52688172043011,
107.52688172043011: D5-107.52688172043011 + C4/107.52688172043011,
107.52688172043011: E5-107.52688172043011 + C4/107.52688172043011,
107.52688172043011: F5^107.52688172043011,
107.52688172043011: G5-107.52688172043011 + C4/107.52688172043011,
107.52688172043011: G5-107.52688172043011 + C4/107.52688172043011,
2150.537634408602`;
  const looseTune = tune`
75.37688442211055: B4^75.37688442211055 + C4~75.37688442211055,
75.37688442211055,
75.37688442211055: C4~75.37688442211055 + A4^75.37688442211055,
75.37688442211055,
75.37688442211055: F4^75.37688442211055 + C4~75.37688442211055,
75.37688442211055,
75.37688442211055: E4^75.37688442211055 + C4~75.37688442211055,
1884.4221105527638`;  
  const finalTune = tune`
211.26760563380282: G4-211.26760563380282 + C5/211.26760563380282,
211.26760563380282: G4^211.26760563380282 + A4^211.26760563380282 + C5/211.26760563380282 + D5/211.26760563380282,
211.26760563380282: F4^211.26760563380282 + E4^211.26760563380282 + D4^211.26760563380282 + E5/211.26760563380282,
211.26760563380282: A4-211.26760563380282 + B4^211.26760563380282 + D4^211.26760563380282 + E5/211.26760563380282,
211.26760563380282: C5-211.26760563380282 + E4-211.26760563380282 + D4^211.26760563380282 + E5/211.26760563380282,
211.26760563380282: B4^211.26760563380282 + F4^211.26760563380282 + D4^211.26760563380282 + D5/211.26760563380282 + C5/211.26760563380282,
211.26760563380282: C5/211.26760563380282 + G4-211.26760563380282 + F4-211.26760563380282 + D4^211.26760563380282 + D5/211.26760563380282,
211.26760563380282: D4^211.26760563380282 + E4^211.26760563380282 + E5/211.26760563380282 + F5/211.26760563380282 + G5/211.26760563380282,
211.26760563380282: B4^211.26760563380282 + G5/211.26760563380282 + F5/211.26760563380282 + E5/211.26760563380282,
211.26760563380282: G4-211.26760563380282 + B4^211.26760563380282 + E5/211.26760563380282 + D5/211.26760563380282,
211.26760563380282: D5~211.26760563380282,
211.26760563380282: D5~211.26760563380282 + G4-211.26760563380282,
4225.352112676056`;

  
  if (end === 1) {
    const currentLevel = level;
    if (currentLevel == 3) {
      playTune(finalTune);
      addText("You Win!", { x: 5, y: 3, color: color`7` });
    } else {
      playTune(winTune);
      level = level + 1;
      setMap(levels[level]);
    }
  }

  if (hit1 === 1 || hit2 === 1) {
    const currentLevel = level;
    if (currentLevel == 3) {
      playTune(looseTune); //doesn't work??
      setMap(levels[level]);
    } else {
      playTune(looseTune);
      setMap(levels[level]);
    }
  }
  
});