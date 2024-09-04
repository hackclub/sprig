/*
@title: Cat Cafe
@author: Nunu(greatplansahead)
@tags: ["portal", "maze", "cute", "cafe", "bubble tea"]
@addedOn: 2024-08-28

arcade project.
Controls: 
player 1
right:D
left: A
up: W
down: S

Player 2
right: L
left: J
up: I
down: K

special thanks to Portia for the inspo <3
*/


let player = "p"
const player2 = "f"
const boba = "b"
const cup = "c"
const tea = "t"
const wall = "q"
const water = "h"
const mop = "k"
const door = "d"
const spriteKey = "o"
const fire = "y"
const ice = "i"
const sugar = "e"
const straw = "a"
const fragile = "g"
const broken = "j"
const enter = "l"
const outside = "m"
const changeLevel = "n"
const nature = "r"
const bubbletea = "s"

setLegend(
  [player, bitmap`
................
................
................
....0....0......
....000000......
....0LLLL0......
....0L0L00......
....0L2020......
....0L1210......
....000000......
................
................
................
................
................
................`],
  [player2, bitmap`
................
................
................
....0....0......
....000000......
....0CCCC0......
....0C1C10......
....0C2020......
....0CC2C0......
....000000......
................
................
................
................
................
................`],
  [boba, bitmap`
................
................
................
......2222......
.....220022.....
...2220000222...
...2C000000C2...
...2CC0000CC2...
...22CCCCCC22...
....22222222....
................
................
................
................
................
................`],
  [cup, bitmap`
................
................
................
................
................
......3..3......
......3..3......
......3..3......
......3..3......
......3..3......
......3..3......
......3333......
................
................
................
................`],
  [tea, bitmap`
................
................
.....000000.....
....00444400....
...0044444400...
...0104444010...
...0120000L10...
...012211L110...
...01121LL110...
...001LLL1100...
....01111110....
....00111100....
.....000000.....
................
................
................`],
  [wall, bitmap`
0CC0CL0L10CC01L0
0CC0L10LC0CC0LL0
0C00C00C00C00L00
1C0CC0CC0CC0CL0C
0C00C00C00C00C00
0LC0LL0LL0LC0LC0
0CC0CL0CL0CC0CL0
0L00C00C00C00LL0
1L0CL0CL0CC0CL0C
LC0LL00L00C00L00
0C00CC01C0CC0CC0
0CC0LC0LC0LC0CL0
0C00100L00C00C00
CC0CL0CL0CC0CL0C
0L00C00C00C00C00
0CC0CC0CL0CC0CC0`],
  [water, bitmap`
................
.....000........
....005500......
...05555500.000.
...055555550050.
..0055555555550.
.05555555555570.
.00555555555710.
..0055555557100.
...05555555700..
...0005555710...
.....05557100...
.....0557100....
......00000.....
................
................`],
  [mop, bitmap`
................
.......222......
.......2C2......
.......2C2......
.......2C2......
.......2C2......
.......2C2......
.......2C2......
.......2C2222...
....2222CLLL22..
....2LLLL111L22.
...22L1LLLL11L2.
...2L1LLL11L1L2.
...222L2L21L2L2.
.....2222222222.
................`],
  [door, bitmap`
................
................
................
....0000000.....
....0CCCCC0.....
....0C6C6C0.....
....0CCCCC0.....
....0C6C6C0.....
....0C0CCC0.....
....0C6C6C0.....
....0CCCCC0.....
....0C6C6C0.....
....0000000.....
................
................
................`],
  [spriteKey, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [fire, bitmap`
........00......
.....0..000.00..
...000.0020.020.
...020.03200020.
..0022003900320.
..0332003903290.
..0399003993390.
.00399333933990.
.03393339333990.
.00393399399990.
..0399993399900.
..099999999990..
..009999999990..
...00099009000..
.....000000.....
................`],
  [ice, bitmap`
................
................
................
......0000......
.....022550.....
.....057750.....
.....057570.....
...0000550000...
..052250022550..
..077750057750..
..057550055570..
..055770055770..
...0000..0000...
................
................
................`],
  [sugar, bitmap`
................
00...000000.....
0...00222200....
00..02222220.000
.0..03222220.0.0
00..03333030.000
....00300300.0.0
0.0.03033330....
0.0.05555550.00.
000.05555550.0.0
....02222220.00.
000.02222220.0.0
0...00000000.0.0
0.0.............
000.............
................`],
  [straw, bitmap`
................
...000..........
...0300.........
...02200........
...003300.......
....002200......
.....00330......
......0020......
.......030......
.......020......
.......030......
.......020......
.......030......
.......020......
.......030......
.......000......`],
  [fragile, bitmap`
6666111116666666
6161166661666166
6661666661666166
6666666661116166
6116616666666616
6166661166666616
6666166616666616
6111666611666666
11HHHHHHHH1HH1HH
H1HHHHHHHH1HH1HH
H1HH111HHHH1H1HH
HHHHHHH11HH1H11H
HHH11111H1HHHH1H
H1HHHHH1HHHHHH1H
HHHHHHHHHHHHHH1H
HHHHHHHHHHHHHHHH`],
  [broken, bitmap`
6666666666666666
6666111111116666
6661111111111666
6611111111111166
6111111111111116
6111111111111116
6111111111111116
6111111111111116
H11111111111111H
H11111111111111H
H11111111111111H
H11111111111111H
HH111111111111HH
HHH1111111111HHH
HHHH11111111HHHH
HHHHHHHHHHHHHHHH`],
  [enter, bitmap`
................
....33333333....
...3333333333...
..333333333333..
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
..333333333333..
...3333333333...
....33333333....
................`],
  [outside, bitmap`
................
....55555555....
...5555555555...
..555555555555..
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
..555555555555..
...5555555555...
....55555555....
................`],
  [nature, bitmap`
44D44433344D44DD
4444D4363DD4444D
D44444333447774D
D44DD44D44476744
D488844DDD477744
D4868444DD4D444D
448884D44DD44D4D
44DD44D444D444DD
444DD4433344D44D
4D4444D3634DDD44
4D4444D333D4HHH4
4DDHHH44D44DH6HD
DDDH6HDDD444HHHD
D44HHH4DDD44444D
DD444444444444DD
DDDD44444DDD4DDD`],
  [bubbletea, bitmap`
.....3..........
......2.........
......32........
.......3255.....
.....3553573....
.....3572443....
.....3443443....
.....3442443....
.....3443443....
.....3444443....
.....3400403....
.....3004043....
.....3333333....
................
................
................`],
)

setBackground(spriteKey);
setSolids([player, player2, water, wall]);


let level = 0
const levels = [
  map`
rrrrrrrrrrr
rrrrrrrrrrr
poooooooood
rrrrrrrrrrr
rrrrrrrrrrr
rrrrrrrrrrr`,
  map`
pqqqqqqqqq
.qqqqqqqqq
.......qqq
qqqqqq.qqq
qqqqqq...q
qqqqqqqq..
qqqqqqqqqd`,
  map`
qqqqqqqqqq
qqqqqqqqqq
p.qqq....c
q.qqq.qqqq
q.....qqqq
qqqqqqqqqq
qqqqqqqqqq`,
  map`
qqqqqqqqqq
qqqqqqqqqq
p.q....qqb
q.q.qq.qq.
q.q.qq.qq.
q...qq....
qqqqqqqqqq`,
  map`
qqqqqqqqqq
qqqqqqqqqq
p........e
qqqqqqqqqq
qqqqqqqqqq
qqqqqqqqqq`,
  map`
qqqqqqqqqq
qqqqqqqqqq
qqqqqqqq.t
qqq......q
q...qqqqqq
p.qqqqqqqq`,
  map`
qqqqqqqqqq
qqqqqqqqqq
pyyym....i
.lyyyqqqqq
qqqqqqqqqq
qqqqqqqqqq`, /* level 6 that includes portal*/
  map`
qqaq......kq
qqhq.qqqqqqq
p..q.qqqaqqq
qq.q.qqq.qqq
qq.........f
qqqqqqqqqqqq
qqqqqqqqqqqq
qqqqqqqqqqqq
qqqqqqqqqqqq
qqqqqqqqqqqq`,
  map`
qqqqqqqqqqqq
gggggggggqqq
gpqqgqqqgydg
ggqqgggyqqqg
qggqqqqgqygg
qqgggggggggq
qqqqqqqqqqqq
qqqqqqqqqqqq
qqqqqqqqqqqq
qqqqqqqqqqqq`,
  map`
qqqqqqqq
qqqqqqqq
p......d
qqqqqqqq
qqqqqqqq
qqqqqqqq`,
  map`
pq.c
.q.q
.q.q
.q.q
...q`,
  map`
pqyq.....q.q
.qyqqq.q.q.q
.q.....q.q.q
.q..qqq....q
.q.qb.q.qq.q
.q..q.q..qqq
.q.q..qq..qq
.q.qq.q...qq
...q....qqqq`,
  map`
pqkqm....q.
.q.qqq.q.q.
.q.....q.q.
.q..qqq....
lq.qt.qhqq.
.q..q.q..qq
.q.q..qq..q
...qq.....q`,
  map`
qqqqq.......q
qgggggq..q.q.
qkqqqgqq.q.q.
qggggpq..q.q.
q..yqqq.q....
qqq....q.q...
q.qq.qqq...q.
...qgq...qqq.
.qqq.q.qqeq..
.q....q.q.q..
...qq.....h..`,
  map`
pq.yymyqq.
.q.qq.qyy.
.q..q.....
.qqqq.qqq.
.y....qiq.
.qqqqqq.h.
...q...yq.
qqlg..qqq.
yq.q.yq...
...qqqqqqk`,
  map`
pq.....q
.qq..q..
..qq..qa
q..qq..q
aq..qq..
..q..qq.
q..q..q.
.q....qf`,
  map`
pq.....q..
.q.....q..
.q.....q.t
.q.....q..
.q.....q..
.q.....g..
.q.....q..
.q....mq..
lq.....q..
.q.....q..`,
  map`
pq.gl.....
.qq.....q.
..q.q.q.q.
q...q.q.q.
qqqgqq..qg
.eqqqmq.g.
qh..ggqq..
q.qqg.kq..
...qqyqq.g
......y.g.`,
  map`
l.g..kq.q.m
..qq..q.q..
...qq.q..h.
...yggg..qq
.qqqgpg..qs
.q.ygggqqq.
.q.yyyy.qq.
.qqqqqqqqq.
...........`,
]

setMap(levels[level])

for (let y = 0; y < levels[6].length; y++) {
  for (let x = 0; x < levels[6][y].length; x++) {
    if (levels[6][y][x] === 'm') {
      outside.x = x;
      outside.y = y;
      break;
    }
  }
}

setPushables({
  [player]: [],
  [player2]: []
})
/* music*/
const traptune = tune`
187.5: D5~187.5,
187.5: B4~187.5,
187.5: D5~187.5,
187.5: B4~187.5,
187.5: C5~187.5,
187.5: C5~187.5,
187.5: C5~187.5,
4687.5`;
const starttune = tune`
200: G5^200,
200: D5^200,
200: G5^200,
200: D5^200,
200: G5^200,
200: E5^200,
200: G5^200,
200: A5^200,
200: B5^200,
200,
200: B5^200,
200: F5^200,
200: B5^200,
200: F5^200,
200: B5^200,
200: F5^200,
200: B5^200,
200: G5^200,
200: E5^200,
200: D5^200,
200: G4^200,
200,
200: B4^200,
200: B4^200,
200: D5^200,
200: D5^200,
200: E5^200,
200: D5^200,
200: D5^200,
200: B4^200,
200: B4^200,
200: G4^200`;
const boom = tune`
500: F5^500 + E5^500 + D5^500 + C5^500 + B4^500,
15500`;
const fragiletune = tune`
85.71428571428571: C5-85.71428571428571,
85.71428571428571: D5-85.71428571428571,
85.71428571428571: G5-85.71428571428571 + E5-85.71428571428571,
85.71428571428571: C5-85.71428571428571 + E5-85.71428571428571,
85.71428571428571: A4-85.71428571428571,
2314.285714285714`;

/*text*/




onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

/* Player 2 */

onInput("k", () => {
  getFirst(player2).y += 1
})

onInput("i", () => {
  getFirst(player2).y -= 1
})

onInput("l", () => {
  getFirst(player2).x += 1
})

onInput("j", () => {
  getFirst(player2).x -= 1
})

let previousX = getFirst(player).x
let previousY = getFirst(player).y

/*   const outx = getFirst(outside).x;
   const outy = getFirst(outside).y;  */
let catx = getFirst(player).x;
let caty = getFirst(player).y;

let outx;
let outy;

let entx;
let enty;

const playback = playTune(starttune, Infinity);
let boomPlayed = false;

afterInput(() => {

  const numberOfGoalsCoveredCup = tilesWith(player, cup);
  const numberOfGoalsCoveredBoba = tilesWith(player, boba);
  const numberOfGoalsCoveredSugar = tilesWith(player, sugar);
  const numberOfGoalsCoveredStraw = tilesWith(player, straw).concat(tilesWith(player2, straw));
  const numberOfGoalsCoveredIce = tilesWith(player, ice);
  const numberOfGoalsCoveredTea = tilesWith(player, tea);
  const numberOfGoalsCoveredBubbleTea = tilesWith(player, bubbletea);
  const movekey = tilesWith(player, mop);
  const trapandplayer = tilesWith(player, fire);
  const brokenCovered = tilesWith(player, broken);
  const enterCovered = tilesWith(player, enter);
  const outsideCovered = tilesWith(player, outside);
  const doorCovered = tilesWith(player, door);

  if (numberOfGoalsCoveredCup.length >= 1) {
    level = level + 1;

    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("You've just made\na cup of bubble\ntea!", {
        x: 3,
        y: 4,
        color: color`0`
      })
    }
  }

  if (numberOfGoalsCoveredBoba.length >= 1) {
    level = level + 1;
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("You've just made\na cup of bubble\ntea!", {
        x: 3,
        y: 4,
        color: color`0`
      })
    }
  }

  if (numberOfGoalsCoveredSugar.length >= 1) {
    level = level + 1;

    if (level < levels.length >= 1) {
      setMap(levels[level]);
    } else {
      addText("You've just made\na cup of bubble\ntea!", {
        x: 3,
        y: 4,
        color: color`0`
      })
    }
  }

  if (numberOfGoalsCoveredIce.length >= 1) {
    level = level + 1;

    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("You've just made\na cup of bubble\ntea!", {
        x: 3,
        y: 4,
        color: color`0`
      })
    }
  }

  if (numberOfGoalsCoveredStraw.length >= 2) {
    level = level + 1;

    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("You've just made\na cup of bubble\ntea!", {
        x: 3,
        y: 4,
        color: color`0`
      })
    }
  }

  if (numberOfGoalsCoveredTea.length >= 1) {
    level = level + 1;

    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("You've just made\na cup of bubble\ntea!", {
        x: 3,
        y: 4,
        color: color`0`
      })
    }
  }

  if (numberOfGoalsCoveredBubbleTea.length >= 1) {
    level = level + 1;

    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("You've just made\na cup of bubble\ntea!", {
        x: 3,
        y: 4,
        color: color`7`
      })
    }
  }

  if (doorCovered.length >= 1) {
    level = level + 1;
    clearText();

    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("You've just made\na cup of bubble\ntea!", {
        x: 3,
        y: 4,
        color: color`0`
      })
    }
  }


  /*story narration*/


  if (level === 0) {

    clearText();
    addText("Welcome to\nthe Cat Cafe!", {
      x: 3,
      y: 4,
      color: color`2`,
    });
    addText("Move to the door", {
      x: 3,
      y: 8,
      color: color`2`,
    });
  }

  if (level === 1) {
    clearText();
    addText("My name is Marv\n and I need help\nfulfilling orders", {
      x: 3,
      y: 1,
      color: color`2`,
    });

    addText("Help me\ncollect:\n*boba\n*ice\n*sugar\n*tea", {
      x: 1,
      y: 8,
      color: color`2`,
    });


  }

  if (level === 2) {
    clearText();
    addText(" This is a cup.\n\n\n\n\n\n\n\n\n\n  reusable ofc!", {
      x: 1,
      y: 2,
      color: color`2`,
    });
  }

  if (level === 3) {
    clearText();
    addText("This is boba.\nMarv loves it!", {
      x: 2,
      y: 2,
      color: color`2`,
    });
  }

  if (level === 4) {
    clearText();
    addText("This sugar. Some \ncustomers want more\n so be prepared to\n\n\n\n\n\n collect more bags!", {
      x: 1,
      y: 2,
      color: color`2`,
    });
  }

  if (level === 5) {
    clearText();
    addText("This is fruit tea. \nBut Marv's favorite\ntea is peach tea.", {
      x: 1,
      y: 3,
      color: color`2`,
    });
  }

  if (level === 6) {
    clearText();
    addText("Be careful of fire!\nDodge it by entering\nthe two-way portal\n\n\n\n\n\n\n After, collect the\n        ice.", {
      x: 0,
      y: 2,
      color: color`2`,
    });
  }

  if (level === 7) {
    clearText();
    addText("Marv's friend May \nsometimes helps\ncollecting  straws. They\nboth hate water!\n but Marv is brave\n(hint hint)", {
      x: 1,
      y: 9,
      color: color`2`,
    });
  }

  if (level === 9) {
    clearText();
    addText("You've got an order\n\n\n\n\n\n\n Let's go complete\n        it!", {
      x: 1,
      y: 2,
      color: color`2`,
    });
  }

  if (level === 8) {
    clearText();
    addText("Beware of fragile\n      tiles!", {
      x: 2,
      y: 11,
      color: color`2`,
    });
  }


  if (level === 10) {
    playback.end(starttune);
    if (!boomPlayed && level === 10) {
      playTune(boom);
      boomPlayed = true;
    }
  }


  /* mop and water*/

  if (movekey.length >= 1) {
    getFirst(mop).remove()
    getFirst(water).remove()
  }

  /*fire*/
  const sprite = getTile(previousX, previousY)[0];
  if (trapandplayer.length > 0) {
    playTune(boom);
    setMap(levels[level]);
    if (sprite && sprite.type === broken) {
      sprite.type = fragile;
    }
  }

  /* fragile tiles */

  if (sprite && sprite.type === fragile) {
    sprite.type = broken;
    playTune(fragiletune);
  }

  if (brokenCovered.length >= 1) {
    clearText();
    setMap(levels[0]),
      level = 0; /*sets level to 0*/
    playback.end(starttune);
    playTune(traptune);
    if (level === 0) {
      playTune(starttune, Inifity);
    }
  }

  previousX = getFirst(player).x;
  previousY = getFirst(player).y;


  /* portals */


  if (enterCovered.length >= 1) {

    let cat = getFirst(player);
    let outx = getFirst(outside).x;
    let outy = getFirst(outside).y;

    cat.x = outx;
    cat.y = outy;

    player.x = cat.x;
    player.y = cat.y;

    console.log(outx);
    console.log(outy);
    console.log(player.x);
    console.log(player.y);
    console.log(getFirst(player).x);
    console.log(cat.x);
    console.log(cat.y);
    console.log("cat on enter");
  }


  if (outsideCovered.length >= 1) {
    entx = getFirst(enter).x;
    enty = getFirst(enter).y;
    let cat = getFirst(player);

    if (enter) {
      console.log(entx);
      console.log(enty);

    }

    cat.x = entx;
    cat.y = enty;
    console.log("cat on oustide")
  }


})

