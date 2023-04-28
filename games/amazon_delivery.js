const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
    [
        player,
        bitmap`
....99999999....
...99CCCCCC99...
..99CCCCCCCC99..
..CCC0CCCC0CCC..
..CCC0CCCC0CCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
...CCCCCCCCCC...
....CCCCCCCC....
..LL11111111LL..
..LL10LL0001LL..
..LL1L0LL001LL..
..LL11100111LL..
....LLL..LLL....
....LLL..LLL....
....LLL..LLL....`
    ],
    [
        box,
        bitmap`
2225222522252222
2525252525555225
2225252522255225
2555222555255225
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCC000
C0CCCCCCCCCCCC00
CC0CCCCCCCCCC0C0
CCC0CCCCCCCC0CCC
CCCC00000000CCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`
    ],
    [
        goal,
        bitmap`
.CCCCCCCCCCCCCC.
CCCCCCCCCCCCCCCC
C33333333333333C
C33333333333333C
.37777733777773.
.37727733772773.
.37277733727773.
.37777733777773.
.37777733777773.
.33333333333333.
.33333333333333.
.33333CCCC33333.
.33333CCCC33333.
.33333CCC033333.
.33333CCCC33333.
.33333CCCC33333.`
    ],
    [
        wall,
        bitmap`
111L1111L11111L1
111L1111L11111L1
111L1111L11111L1
LLLLLLLLLLLLLLLL
11111L1111L11111
11111L1111L11111
11111L1111L11111
LLLLLLLLLLLLLLLL
11L111L1111L1111
11L111L1111L1111
LLLLLLLLLLLLLLLL
11111L111L111111
11111L111L111111
LLLLLLLLLLLLLLLL
1L1111L1111L1111
1L1111L1111L1111`
    ]
);

let level = 0;

const levels = [
  map`
p.w..
.b.g.
.....
.....`,
    map`
..w.
...g
.bw.
p.w.`,
   map`
p.ww..g
...w...
.......
......b
...ww..
....w..`,
map`
wgww...
w.wwwww
......w
....b.w
......w
...p..w`,map`
...w...wg
.ww......
.ww......
.ww...www
w..b...ww
........w
w..p..www
wwwwwwwww`, map`
wwwwwwwww
wwwwwwwww
wwwwwwwww
wwwpbgwww
wwwwwwwww
wwwwwwwww
wwwwwwwww
wwwwwwwww`, map`
wwwwww...g
wwwwww....
ww.....b..
ww......ww
wwp.....ww
ww......ww
wwwwwwwwww
wwwwwwwwww`, 
];
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([player, box, wall]);
setPushables({
    [player]: [box]
});

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

afterInput(() => {
    const numberCovered = tilesWith(goal, box).length;
    const targetNumber = tilesWith(goal).length;

    if (numberCovered === targetNumber) {
        // increase the current level number
        level = level + 1;

        const currentLevel = levels[level];

        // make sure the level exists and if so set the map
        if (currentLevel !== undefined) setMap(currentLevel);
    }
});

onInput("j", () => {
    const currentLevel = levels[level];
    if (currentLevel !== undefined) setMap(currentLevel);
});



