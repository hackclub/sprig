/*
@title: chooseyourcolor
@author: manikanta
*/
const player = "p";
const box = "l";
const goal = "g";
const wall = "w";
const black = "k";
const gary = "y";
const ligray = "i";
const boxb = "o";
const boxg = "r";


setLegend(
    [
        player,
        bitmap`
.........00.....
.......000......
.......0........
.....00000......
.....00000......
.....02220......
.....00000......
....0002000.....
...0.00000.0....
..0...000...0...
.......00.......
........0.......
.........0......
..........0.....
................
................`
    ],
    [
        box,
        bitmap`
................
................
.00000000000000.
.02222222222220.
.02222333332220.
.02222322232220.
.02222322232220.
.02222333332220.
.02222332222220.
.02222323222220.
.02222322322220.
.02222322232220.
.02222222222220.
.00000000000000.
................
................`
    ],[
        boxb,
        bitmap`
................
................
.00000000000000.
.02222222222220.
.02227777772220.
.02227222272220.
.02227222722220.
.02227777222220.
.02227222722220.
.02227222272220.
.02227777772220.
.02222222222220.
.02222222222220.
.00000000000000.
................
................`
    ],[
        boxg,
        bitmap`
................
................
.00000000000000.
.02244444422220.
.02242224422220.
.02242222222220.
.02242222222220.
.02242224444220.
.02244444224220.
.02222222224220.
.02222222224220.
.02222222222220.
.02222222222220.
.00000000000000.
................
................`
    ],
    [
        goal,
        bitmap`
0000000000000000
0000000000000000
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LL11111111LL00
00LL11111111LL00
00LL11222211LL00
00LL11222211LL00
00LL11222211LL00
00LL11222211LL00
00LL11111111LL00
00LL11111111LL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
0000000000000000
0000000000000000`
    ],
    [
        wall,
        bitmap`
0000LLLLL1111222
0000LLLLL1111222
0000LLLLL1111222
0000LLLLL1111222
0000LLLLL1111222
0000LLLLL1111222
0000LLLLL1111222
0000LLLLL1111222
0000LLLLL1111222
0000LLLLL1111222
0000LLLLL1111222
0000LLLLL1111222
0000LLLLL1111222
0000LLLLL1111222
0000LLLLL1111222
0000LLLLL1111222`
    ],

  [gary,
    bitmap`
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
LLLLLLLLLLLLLLLL`
  ],
  [black,
    bitmap`
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
0000000000000000`
  ],
  [ligray,
    bitmap`
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
1111111111111111`
  ]);

let level = 0;

const levels = [
    map`
kkkkkkkkkk
kkkkkkkkkk
kkyyyyyykk
kkyiiiiykk
kkyigpiykk
kkyiiiiykk
kkyyyyyykk
kkkkkkkkkk
kkkkkkkkkk`,
    map`
pkkkkkk...........r
.kkkkkk.kkkk.kkkk..
..k.....k..k....kkk
..k..kkkk..k......o
..k.kk.....kkk.kkkk
....k..kkk.kk..k..l
......k............`,
   map`
.......l..........
.w.wwwww.w..wwwww.
.wp....w.w.......o
rw.w...w....wwwww.
.w.w...www..w.....
.w.www....www.....
..................`
];

const currentLevel = levels[level];
setMap(currentLevel);

onInput("w", () => {
    getFirst(player).y -= 1;
});

onInput("s", () => {
    getFirst(player).y += 1;
});

onInput("a", () => {
    getFirst(player).x -= 1;
});

onInput("d", () => {
    getFirst(player).x += 1;
});

setSolids([player, black]);

setPushables({
    [player]: [box]
});




onInput("j", () => {
    const currentLevel = levels[level];
    if (currentLevel !== undefined) setMap(currentLevel);
});
afterInput(() => {
    const numberCovered = tilesWith(player, goal).length;
    const targetNumber = tilesWith(player).length;

    if (numberCovered === targetNumber) {
        // increase the current level number
        level = level + 1;

        const currentLevel = levels[level];

        // make sure the level exists and if so set the map
        if (currentLevel !== undefined) {
            setMap(currentLevel);
        } else {
            addText("you win Match!", { y: 4, color: color`4` });
        }
    }
});




















