/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Can't Log In!
@author: Maarten & Caro
@tags: [#puzzle]
@addedOn: 2024-00-00
*/

/* ************************************************* */
/*         SPRITES                                   */
/* ************************************************* */
const cursor = "p";
const student = "s";
const happy_student = "z";
const origin = "o";
const happy_computer = "C";
const background = "1";
const black = "0";
const blue = "5";
/* cables */
const cable_vertical = "v";
const cable_horizontal = "h";
const cable_corner0 = "a";
const cable_corner90 = "b";
const cable_corner180 = "c";
const cable_corner270 = "d";
const cable_t0 = "e";
const cable_t90 = "f";
const cable_t180 = "g";
const cable_t270 = "i";
const cable_cross = "x";
/* instruction */
const instructions1 = "!";
const instructions2 = "@";
const instructions3 = "#";
const instructions4 = "$";
const instructions5 = "%";
const instructions6 = "^";
const instructions7 = "&";
const instructions8 = "*";
const instructions9 = "(";
/* title */
const title1 = "_";
const title2 = "2";
const title3 = "3";
const title4 = "4";
const title5 = "+";
const title6 = "6";
const title7 = "7";
const title8 = "8";
const title9 = "9";
const title10 = ")";
const title11 = "-";
const title12 = "=";

setLegend(
  [cursor, bitmap`
................
.44444....44444.
.44444....44444.
.44..........44.
.44..........44.
.44..........44.
.......44.......
......4444......
......4444......
.......44.......
.44..........44.
.44..........44.
.44..........44.
.44444....44444.
.44444....44444.
................`],
  [student, bitmap`
00..............
0...00000000....
...0000000000...
..000666666000.0
.000666666660000
.006660660666005
.006660660666005
.006666666666003
.006666666666003
.006660000666005
.006606666066005
.000666666660000
..000666666000.0
...0000000000...
0...00000000....
00..............`],
  [happy_student, bitmap`
00..............
0...00000000....
...0000000000...
..000666666000.0
.000666666660000
.006660660666005
.006660660666005
.006666666666003
.006666666666003
.006606666066005
.006660000666005
.000666666660000
..000666666000.0
...0000000000...
0...00000000....
00..............`],
  [origin, bitmap`
................
..000000000000..
..000000000000..
0.004444444400..
00004040444400..
50004044044400..
30004040444400..
33004444444400..
33004444444400..
30000000000000..
50000000000000..
00....LLLL......
0.000000000000..
..000000004040..
..000000000000..
................`],
  [happy_computer, bitmap`
................
..000000000000..
..000000000000..
0.004444444400..
00004404404400..
50004444444400..
30004044440400..
33004400004400..
33004444444400..
30000000000000..
50000000000000..
00....LLLL......
0.000000000000..
..000000004040..
..000000000000..
................`],
  [background, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [black, bitmap`
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
  [blue, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [cable_horizontal, bitmap`
................
................
................
0000000000000000
0000000000000000
5555555555555555
3333333333333333
3333333333333333
3333333333333333
3333333333333333
5555555555555555
0000000000000000
0000000000000000
................
................
................`],
  [cable_vertical, bitmap`
...0053333500...
...0053333500...
...0053333500...
...0053333500...
...0053333500...
...0053333500...
...0053333500...
...0053333500...
...0053333500...
...0053333500...
...0053333500...
...0053333500...
...0053333500...
...0053333500...
...0053333500...
...0053333500...`],
  [cable_corner0, bitmap`
...0053333500...
...0053333500...
...0053333500...
...0053333500000
...0053333550000
...0053333355555
...0053333333333
...0053333333333
...0055333333333
...0005533333333
...0000555555555
....000000000000
.....00000000000
................
................
................`],
  [cable_corner90, bitmap`
................
................
................
.....00000000000
....000000000000
...0000555555555
...0005533333333
...0055333333333
...0053333333333
...0053333333333
...0053333355555
...0053333550000
...0053333500000
...0053333500...
...0053333500...
...0053333500...`],
  [cable_corner180, bitmap`
................
................
................
00000000000.....
000000000000....
5555555550000...
3333333355000...
3333333335500...
3333333333500...
3333333333500...
5555533333500...
0000553333500...
0000053333500...
...0053333500...
...0053333500...
...0053333500...`],
  [cable_corner270, bitmap`
...0053333500...
...0053333500...
...0053333500...
0000053333500...
0000553333500...
5555533333500...
3333333333500...
3333333333500...
3333333335500...
3333333355000...
5555555550000...
000000000000....
00000000000.....
................
................
................`],
  [cable_t0, bitmap`
...0053333500...
...0053333500...
...0053333500...
...0053333500000
...0053333550000
...0053333355555
...0005333333333
....000533333333
....000533333333
...0005333333333
...0053333355555
...0053333550000
...0053333500000
...0053333500...
...0053333500...
...0053333500...`],
  [cable_t90, bitmap`
................
................
................
0000000..0000000
0000000000000000
5555550000555555
3333335005333333
3333333553333333
3333333333333333
3333333333333333
5555533333355555
0000553333550000
0000053333500000
...0053333500...
...0053333500...
...0053333500...`],
  [cable_t180, bitmap`
...0053333500...
...0053333500...
...0053333500...
0000053333500...
0000553333500...
5555533333500...
3333333335000...
333333335000....
333333335000....
3333333335000...
5555533333500...
0000553333500...
0000053333500...
...0053333500...
...0053333500...
...0053333500...`],
  [cable_t270, bitmap`
...0053333500...
...0053333500...
...0053333500...
0000053333500000
0000553333550000
5555533333355555
3333333333333333
3333333333333333
3333333553333333
3333335005333333
5555550000555555
0000000000000000
0000000..0000000
................
................
................`],
  [cable_cross, bitmap`
...0053333500...
...0053333500...
...0053333500...
0000053333500000
0000553333550000
5555533333355555
3333333553333333
3333335005333333
3333335005333333
3333333553333333
5555533333355555
0000553333550000
0000053333500000
...0053333500...
...0053333500...
...0053333500...`],
  [ instructions1, bitmap`
0000000440000000
0000004444000000
0000040440400000
0000000440000000
0000000440000000
0040000440000400
0400000440000040
4444444444444444
4444444444444444
0400000440000040
0040000440000400
0000000440000000
0000000440000000
0000040440400000
0000004444000000
0000000440000000` ],
  [ instructions2, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000400000400000
0000400000400000
0000400400400000
0000400400400000
0000400400400000
0000044044000000
0000000000000000
0000000000000000` ],
  [ instructions3, bitmap`
0000000000000000
0000004444000000
0000040000400000
0000040000000000
0000004444000000
0000000000400000
0000040000400000
0000004444000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ instructions4, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000444000
0000000004000400
0000000000000400
0000000000444400
0000000004000400
0000000004444400
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ instructions5, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000004000000000
0000004000000000
0000004000000000
0004444000000000
0040004000000000
0040004000000000
0040004000000000
0004444000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [instructions6, bitmap`
0000000000000000
0000000000000000
0000000004400000
0000000004400000
0000000000000000
0000000004400440
0000000004400440
0000000004400000
0000000004400000
0000004004400000
0000004004400000
0000004004400440
0000004444400440
0000000000000000
0000000000000000
0000000000000000`],
  [instructions7, bitmap`
0000000000000000
0000000000000000
0000004400000000
0000004400000000
0000004400000000
0000004400000000
0000004400000440
0000004400000440
0000004400000000
0000004400000000
0000004400000000
0000004400400440
0000000044000440
0000000000000000
0000000000000000
0000000000000000`],
  [instructions8, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000044444400400
0000400000040400
0004000000004400
0004000000444400
0004000000000000
0004000000000000
0004000000004000
0004000000004000
0000400000040000
0000044444400000
0000000000000000
0000000000000000
0000000000000000`],
  [instructions9, bitmap`
0000000000000000
0000000000000000
0000000000000000
0040044444400000
0040400000040000
0044000000004000
0044440000004000
0000000000004000
0000000000004000
0004000000004000
0004000000004000
0000400000040000
0000044444400000
0000000000000000
0000000000000000
0000000000000000`],
  [ title1, bitmap`
0000000000000000
0000000000333333
0000003333333333
0003333333333333
0333333333333333
3333333333333333
3300000000000000
3300444444440444
3300444444440444
3300444444440444
3300444444440444
3300444000000000
3300444066666666
3300444063333333
3300444063333333
3300444063330000` ],
  [ title2, bitmap`
0000000000000000
3333333333333333
3333333333333330
3333333333333330
3333333333333330
3333333333333330
0000000000000000
4444000044400444
4444000044400444
4444000044400444
4444000044400444
0004444044444444
6604444044444444
3304444044444444
3304444044444444
0004444044440044` ],
  [ title3, bitmap`
0000000000000000
3333333333333333
0000333333333333
0400333333333333
0400333333333330
0400300000333330
0440300000333330
0440004440333330
4000004440000330
4044444440000330
4044444444440330
4044444444440330
4044444444440330
4000004440000330
4000004440000330
4063304440666630` ],
  [ title4, bitmap`
0000000000000000
3333333333333333
3333333333333333
3333333333333333
0000033333333333
0000063333333333
0444063000000000
0444063004444444
0444063004444444
0444063004444444
0444063004444444
0444063004444444
0444063004400444
0444063004400444
0444063004400444
0444063004400444` ],
  [ title5, bitmap`
0000000000000000
3333333333333333
3333333333333333
3333333333333300
3333333333333300
3333333333333304
0033333333333304
4063333333333300
4063330000003336
4063330000006333
4000000044406300
4000000044406300
4044444444406304
4044444444406304
4044444444406304
4044444444406304` ],
  [ title6, bitmap`
0000000000000000
3333330000000000
3333333333000000
0000333333333000
0000633333333330
4400633333333333
4400633333333333
0000000000000033
6600440004444063
3300440004444063
0000440004444063
0000440004444063
4400444444444063
4400444444444063
4400444444444063
4400444400444063` ],
  [ title7, bitmap`
3300444063330000
3300444063330444
3300444000000444
3300444444440444
3300444444440444
3300444444440444
3300000000000000
3300000000000000
3336666666666666
3333333333333333
3333333333333333
0333333333333333
0003333333333333
0000003333333333
0000000000333333
0000000000000000` ],
  [ title8, bitmap`
0004444044440044
4444444044440044
4444444044440044
0004444044440044
4444444044440044
4444444044440044
0000000000000000
0000000000000000
6666666666666666
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
0000000000000000` ],
  [ title9, bitmap`
4063304440633330
4063304440633330
4063304440633330
4063304440633330
4063304440633330
4063304440633330
0063300000633330
0063300000633330
6663336666633333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
0000000000000000` ],
  [ title10, bitmap`
0444063004400444
0444063004400444
0444000004400444
0444444004444444
0444444004444444
0444444004444444
0000000000000000
0000000000000000
3666666666666660
3333333333333330
3333333333333330
3333333333333330
3333333333333330
3333333333333333
3333333333333333
0000000000000000` ],
  [ title11, bitmap`
4044400044406304
4044400044406304
4044400044406304
4044444444406304
4044444444406304
4044444444406304
0000000044406300
0000000044406300
0444444444406336
0444444444406333
0444444444406333
0000000000006333
0000000000006333
6666666666666333
3333333333333333
0000000000000000` ],
  [ title12, bitmap`
4400444400444063
4400444400444063
4400444400444063
4400444400444063
4400444400444063
4400444400444063
0000000000000063
0000000000000063
6666666666666663
3333333333333333
3333333333333333
3333333333333330
3333333333333000
3333333333000000
3333330000000000
0000000000000000` ],
)

const rotateSound = tune`
133.33333333333334: F4^133.33333333333334 + A4^133.33333333333334,
4133.333333333334`;
const completeSound = tune`
131.57894736842104: C5-131.57894736842104 + A4-131.57894736842104 + F4-131.57894736842104,
131.57894736842104,
131.57894736842104: G4-131.57894736842104 + B4-131.57894736842104 + D5-131.57894736842104,
131.57894736842104: C5-131.57894736842104 + A4-131.57894736842104 + F4-131.57894736842104,
131.57894736842104: F4-131.57894736842104,
131.57894736842104: G4-131.57894736842104,
131.57894736842104: B4-131.57894736842104,
131.57894736842104,
131.57894736842104: A4-131.57894736842104 + F4-131.57894736842104,
131.57894736842104: F4-131.57894736842104,
131.57894736842104: D4-131.57894736842104,
131.57894736842104,
131.57894736842104: A4-131.57894736842104 + C5-131.57894736842104 + E5-131.57894736842104,
2500`;
const winSound = tune`
500: A5^500,
15500`;
const moveSound = tune`
71.09004739336493: C4^71.09004739336493 + F4^71.09004739336493 + B4^71.09004739336493 + D5^71.09004739336493 + E5^71.09004739336493,
2203.791469194313`;
/* ************************************************* */
/*         MAPS                                      */
/* ************************************************* */

// map 0 is blank screen to write on
const levels = [
  map`
0000000000
0000000000
0000000000
0000000000
0000000000
0000000000
0000000000`, // info
  map`
0000000000
00_234+600
00789)-=00
0000000000
0000000000
0000000000
0000000000`, // title
  map`
..........
..........
..000000..
..000000..
..000000..
..........
..........`, // winning
  map`
0000000000
00@0000000
0$!%^(&*00
00#0000000
0shhhc0000
00000ahho0
0000000000`,
  map`
0000000000
00bc000000
0sdvfh0000
00dahfhc00
0000bdaao0
000sdahh00
0000000000`,
  map`
0000000000
00bia00000
00eiixbc00
00bhfhdao0
00ecahfc00
0sidhvad00
0000000000`,
  map`
0000000000
0vcvbhhcbo
0cevvxbed0
sgbbdhdac0
0ehdabffd0
sdidbdada0
0000000000`,
  map`
schbhcdbf0
0ahdbghhg0
shfhdehcd0
scbbhxdvd0
0ahdfacaho
0ddbhhdbb0
shhihhhha0`,
]

/* ************************************************* */
/*         CABLE UTILS                               */
/* ************************************************* */

const nextCableType = {
  [cable_horizontal]: cable_vertical,
  [cable_vertical]: cable_horizontal,
  [cable_corner0]: cable_corner90,
  [cable_corner90]: cable_corner180,
  [cable_corner180]: cable_corner270,
  [cable_corner270]: cable_corner0,
  [cable_t0]: cable_t90,
  [cable_t90]: cable_t180,
  [cable_t180]: cable_t270,
  [cable_t270]: cable_t0,
  [cable_cross]: cable_cross
};

const prevCableType = {
  [cable_horizontal]: cable_vertical,
  [cable_vertical]: cable_horizontal,
  [cable_corner0]: cable_corner270,
  [cable_corner90]: cable_corner0,
  [cable_corner180]: cable_corner90,
  [cable_corner270]: cable_corner180,
  [cable_t0]: cable_t270,
  [cable_t90]: cable_t0,
  [cable_t180]: cable_t90,
  [cable_t270]: cable_t180,
  [cable_cross]: cable_cross
};

const connectionDirections = {
  [cable_horizontal]: ["left", "right"],
  [cable_vertical]: ["up", "down"],
  [cable_corner0]: ["up", "right"],
  [cable_corner90]: ["right", "down"],
  [cable_corner180]: ["down", "left"],
  [cable_corner270]: ["up", "left"],
  [cable_t0]: ["up", "down", "right"],
  [cable_t90]: ["right", "left", "down"],
  [cable_t180]: ["up", "down", "left"],
  [cable_t270]: ["up", "right", "left"],
  [cable_cross]: ["up", "right", "left", "down"],
  [origin]: ["left"],
  [student]: ["right"],
};

/* ************************************************* */
/*         UTIL FUNCTIONS                            */
/* ************************************************* */

function load_map() {
  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      clearTile(x, y);
      addSprite(x, y, current_map[x][y]);
    }
  }
}

function getOpposite(dir) {
  return {
    up: 'down',
    down: 'up',
    left: 'right',
    right: 'left'
  } [dir];
}

function save_map() {
  current_map = [];
  for (let x = 0; x < width(); x++) {
    current_map[x] = [];
    for (let y = 0; y < height(); y++) {
      const tiles = getTile(x, y);
      tiles.forEach(tile => {
        if (tile.type !== cursor) {
          current_map[x][y] = tile.type;
          // console.log("pre: " + current_map[x][y] + " " + x + " " + y);
        }
      })
    }
  }
}

function rotate_random(tile) {
  let newType = nextCableType[tile.type];
  for (let i = 0; i < Math.floor(Math.random() * 4); i++) {
    newType = nextCableType[newType];
  }
  if (newType) {
    tile.type = newType;
    // console.log("type after change: " + tile.type);
  }
  clearTile(tile.x, tile.y);
  addSprite(tile.x, tile.y, newType);
}

/* trying to get stcrambling function going here */
function scramble() {
  for (let x = 1; x < width() - 1; x++) {
    for (let y = 0; y < height(); y++) {
      const tiles = getTile(x, y);

      tiles.forEach(tile => {
        if (tile.type in nextCableType) {
          rotate_random(tile);
        }
      })
    }
  }
  save_map();
}

function info_text() {
  level = 0;
  setMap(levels[0]);
  addText("w, a, s, d: move", { x: 1, y: 3, color: color`3` });
  addText("j, l: rotate", { x: 1, y: 5, color: color`3` });
  addText("k: reset", { x: 1, y: 7, color: color`3` });
  addText("i: info", { x: 1, y: 9, color: color`3` });
  addText("i ->", { x: 1, y: 14, color: color`5` });
}

function title_screen() {
  setMap(levels[1]);
  addText("42 Berlin students", { x: 1, y: 1, color: color`4` });
  addText("  As the IT team,", { x: 1, y: 8, color: color`3` });
  addText("your job is mainly", { x: 1, y: 9, color: color`3` });
  addText("  to (re)connect", { x: 1, y: 10, color: color`3` });
  addText(" ethernet cables.", { x: 1, y: 11, color: color`3` });
  addText(" Press K to start!", { x: 1, y: 13, color: color`6` });
}

function winning_screen() {
  playTune(winSound);
  save_map();
  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      // console.log(x + " " + y);
      if (x > 1 && x < width() - 2 && y > 1 && y < height() - 2)
      {
        clearTile(x, y);
        addSprite(x, y, blue);
      }
      else if (current_map[x][y] === student){
        clearTile(x, y);
        addSprite(x, y, happy_student);}
      else if (current_map[x][y] === origin){
        clearTile(x, y);
        addSprite(x, y, happy_computer);
      }
    }
  }
  addText(" success!!", { x: 5, y: 6, color: color`2` });
  addText("k ->", { x: 8, y: 9, color: color`2` });
}

function complete_screen() {
  for (let x = 0; x < width(); x++) {
    for (let y = 0; y < height(); y++) {
      // console.log(x + " " + y);
      if (x > 1 && x < width() - 2 && y > 1 && y < height() - 2)
      {
        clearTile(x, y);
        addSprite(x, y, blue);
      }
      else if (current_map[x][y] === student){
        clearTile(x, y);
        addSprite(x, y, happy_student);
      }
    }
  }
  addText("Everyone's", { x: 5, y: 6, color: color`2` });
  addText("logged in!", { x: 5, y: 7, color: color`2` });
  addText("Restart?", { x: 5, y: 8, color: color`2` });
  addText("    -> k", { x: 5, y: 9, color: color`2` });
}
  

/* ************************************************* */
/*         WIN CONDITION                             */
/* ************************************************* */

function checkComplete() {
  const originTile = getFirst(origin);
  const allStudents = getAll(student);

  if (!originTile || allStudents.length === 0) return false;

  const visited = new Set();
  const queue = [{ x: originTile.x, y: originTile.y }];
  const reachedStudents = new Set();

  while (queue.length > 0) {
    const current = queue.shift();
    const currentKey = `${current.x},${current.y}`;

    if (visited.has(currentKey)) continue;
    visited.add(currentKey);

    // Überprüfe alle Kacheln an der Position
    const currentTiles = getTile(current.x, current.y);

    // Studenten-Check verbessert
    const studentsHere = currentTiles.filter(t => t.type === student);
    studentsHere.forEach(s => reachedStudents.add(s));

    for (const tile of currentTiles) {
      if (!connectionDirections[tile.type]) continue;

      for (const dir of connectionDirections[tile.type]) {
        const nextPos = {
          x: current.x + (dir === 'left' ? -1 : dir === 'right' ? 1 : 0),
          y: current.y + (dir === 'up' ? -1 : dir === 'down' ? 1 : 0)
        };

        // Erweiterte Verbindungsprüfung
        const nextTiles = getTile(nextPos.x, nextPos.y);
        const isValid = nextTiles.some(nextTile => {
          // Studenten immer akzeptieren
          if (nextTile.type === student) return true;
          // Kabel-zu-Kabel Verbindung
          const oppositeDir = getOpposite(dir);
          // return (connectionDirections[nextTile.type]?.includes(oppositeDir));
          return (connectionDirections[nextTile.type] && connectionDirections[nextTile.type].includes(oppositeDir));
        });

        if (isValid && !visited.has(`${nextPos.x},${nextPos.y}`)) {
          queue.push(nextPos);
        }
      }
    }
  }

  // Debug-Ausgabe hinzufügen
  //console.log(`Erreichte Studenten: ${reachedStudents.size}/${allStudents.length}`);
  return reachedStudents.size === allStudents.length;
}

/* ************************************************* */
/*         INPUT HANDLING                            */
/* ************************************************* */

onInput("s", () => {
  if (level > 2){
    playTune(moveSound);
    getFirst(cursor).y += 1;}
})
onInput("w", () => {
  if (level > 2){
    playTune(moveSound);
    getFirst(cursor).y -= 1;}
})
onInput("d", () => {
  if (level > 2){
    playTune(moveSound);
    getFirst(cursor).x += 1;}
})
onInput("a", () => {
  if (level > 2) {
    playTune(moveSound);
    getFirst(cursor).x -= 1;}
})

/* K resets */
onInput("k", () => {
  if (level === 2) {
    won = false;
    clearText();
    if (last_level === 7) {
      playTune(completeSound);
      complete_screen();
      level = 10;
      return ;
    }
    level = last_level + 1;
    last_level = level;
  }
  else if (level === 10) {
    clearText();
    last_level = 3;
    level = 1;
    title_screen();
    return ;
  }
  else if (level === 1) {
    level = 3;
    clearText();
  }
  console.log(level);
  setMap(levels[level]);
  scramble();
  addSprite(width() - 1, height() - 2, cursor);
});

/* L and J rotate */
onInput("l", () => {
  if (level < 3) {return;}
  const cur = getFirst(cursor);
  const tiles = getTile(cur.x, cur.y);

  // this is the rotation
  for (const tile of tiles) {
    if (tile.type in nextCableType) {
      playTune(rotateSound);
      clearTile(cur.x, cur.y);
      addSprite(cur.x, cur.y, nextCableType[tile.type]);
      addSprite(cur.x, cur.y, cursor);
      break;
    }
  }
  if (checkComplete()) { won = true; }
});

onInput("j", () => {
  if (level < 3) return;
  playTune(rotateSound);
  const cur = getFirst(cursor);
  const tiles = getTile(cur.x, cur.y);

  // this is the rotation
  for (const tile of tiles) {
    if (tile.type in nextCableType) {
      playTune(rotateSound);
      clearTile(cur.x, cur.y);
      addSprite(cur.x, cur.y, prevCableType[tile.type]);
      addSprite(cur.x, cur.y, cursor);
      break;
    }
  }
  if (checkComplete()) { won = true; }
});

onInput("i", () => {
  if (level > 2) {
    info_text();
  } else if (level === 1 || level === 2) return;
  else {
    level = last_level;
    clearText();
    load_map();
    addSprite(width() - 1, height() - 2, cursor);
  }
});

/* ************************************************* */
/*         INITIAL SETUP                             */
/* ************************************************* */

let level = 1
let last_level = level + 2;
let won = false;
let current_map;
setBackground(background);
title_screen();

afterInput(() => {
  if (won == true) {
    level = 2;
    winning_screen();
  }
});