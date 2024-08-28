/*
https://sprig.hackclub.com/gallery/getting_started

@title: JB's Pushy Box Portal Game
@author: Justin Burns II :)
@tags: []
@addedOn: 2024-00-00
*/
setSolids([])
const player = "p"
const box = "b";
const goal = "g";
const wall = "w";
const boundary = "j";
const border = "k";

setSolids([player, box, wall, boundary, border]);


setLegend( [ player, bitmap`
................
................
......333.......
.....3300.......
.....3333.......
.....3333.......
......333.......
......3.3.......
................
................
................
................
................
................
................
................` ],
    
    [
        box,
        bitmap`
................
................
................
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
...CCCCCCCCC....
................
................
................
................`
    ],
    [
        goal,
        bitmap`
...6666666666...
..666666666666..
.66699999999666.
6669666666669666
6696666666666966
6966666999666696
6966699669996666
6966696666669666
6966696996666966
6966696669666966
6696699996666966
6669666666669966
6669666666699666
.66696669996666.
..666999966666..
...6666666666...`
    ],
    [
        wall,
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
           [
        boundary,
        bitmap`
5555555555555555
5777777777777775
5755555555555575
5757777777777575
5757555555557575
5757577777757575
5757575555757575
5757575775757575
5757575775757575
5757575555757575
5757577777757575
5757555555557575
5757777777777575
5755555555555575
5777777777777775
5555555555555555`
    ],
           [
        border,
        bitmap`
0000000000000000
0LLLLLLLLLLLLLL0
0L111111111111L0
0L133333333331L0
0L133333333331L0
0L133333333331L0
0L133333333331L0
0L133333333331L0
0L133333333331L0
0L133333333331L0
0L133333333331L0
0L133333333331L0
0L133333333331L0
0L111111111111L0
0LLLLLLLLLLLLLL0
0000000000000000`
    ]
);

let level = 0
const levels = [
    map`
p...
....
....
.b.g`,
    map`
............
............
..wwwwwwww..
..w......w..
..w......w..
..w..ww..w..
..w..wg..w..
..w..w...w..
p.w..w...w..
.bw..wwwww..
..w.........
www.........`,

  map`
..............
..............
.w.w..ww..w...
...p..ww..w...
.....ww...w...
.....wwwwwww..
.......ww....w
.w..w..w..b..w
..g..w.w..ww.w
....ww....w..w
.wwwwwwwwwww.w
.............w`, 
  map`
.............
.............
.w.....wwww..
..w.w.....w..
....w.wg.....
....w..w.ww..
....www..ww..
...ww.ww.....
..ww....ww...
..w.....w.w..
p....w..b.ww.
........w..w.
.......ww....`,
  map`
wwww........wwwww
www.........wwwww
ww.......w.gwwwww
w.....wwww..w.www
....wwwwwwwww.www
...www..ww.w....w
...wwww..........
...wwwww.........
.....wwww...ww...
w.....w....www...
w..........www...
www.......www....
wwww......wwww...
.........www.....
pw.w.....wwwww...
wwww....wwwwww.b.
wwwwwwwwwwwww....`,

  map`
..............
..............
..w......w....
..w..wwwwgww..
..w.www....w..
..w.w.........
..w.w.......w.
..w...........
..w.........w.
.bw..w......w.
..w...w....ww.
..w.....w.w...
.pw...........
..w...........`,
    map`
w..gwwwwwwwwwww.
w.w...........ww
w.w.wwwwww.....w
w.w......w.www.w
w.w.wwwwww.w.w.w
w.w.b.....bw.w.w
w.w.w.wwww.w.w.w
w.w.w.w.pw.w.w.w
w.w.w.w..w.w.w.w
w.w.w.w.ww.w.w.w
w.w.w.wb...w.w.w
w.b..bw.wwww.w.w
w.www.www......w
w..............w
wwwwwwwwwwwwww.w`,
      map`
p.w........gw..
...w.......w...
w...www.www...w
.w...ww.ww...w.
..w...w.w...w..
..ww.......ww..
..www.....www..
.......w.......
..www.....www..
..ww.......ww..
..w...w.w...w..
.w...ww.ww...w.
w...www.www...w
...w.b.....w...
..w.........w..`,
        map`
p..wwwwwwwwwwww
.b..wwwwwwwwwww
w....wwwwwwwwww
.w....wwwwwwwww
..w....wwwwwwww
g..w....wwwwwww
....w....wwwwww
w....w....wwwww
ww....w....wwww
www....w....www
wwww....w....ww
wwwww....w....w
wwwwww........w
wwwwwww.......w
wwwwwwwwwwwwwww`,
          map`
p..wwwwwwwwwwww
.b..wwwwwwwwwww
.....wwwwwwwwww
.w....wwwwwwwww
..w....wwwwwwww
...w....wwwwwww
....w....wwwwww
.....w....wwwww
.w....w....wwww
.ww....w....www
.www....w....ww
.wwww....w....w
..wwww........w
..wwwww.......w
wwwwwwwwwwwwwww`,
          map`
jjjjjjjjjjjjjjjjjjjjjjjjj
j.......................j
j.wwww.b............w...j
j.www....www..www...w...j
j.w....w.w.w.wwww...w...j
j.www..w.w.w.w.ww...w...j
j.w....w.w.w.wwww...w...j
j.w....w.w......w...w...j
j.w.................w...j
j.......................j
jw...ww.....w.wwww...w..j
jw..w..w.w..w.w..ww..w..j
jw..wwww.wwww.wwwww..w..j
jw..ww....ww..wwp....w..j
jwww.www..ww...wwww..wwwj
j.......................j
j.......................j
j......w................j
j...w...w...............j
j.......w...............j
j.......gw..............j
j...w...ww..............j
j......ww...............j
j.....ww................j
jjjjjjjjjjjjjjjjjjjjjjjjj`,
];

const currentLevel = levels[level];
setMap(currentLevel);

const melody = tune`
500: C4/500,
500: C4/500,
500: C4/500,
500: C4/500 + E4^500,
500: C4/500 + E4^500,
500: C4/500 + E4^500,
500: C4/500 + E4^500 + G4~500,
500: C4/500 + E4^500 + G4~500,
500: C4/500 + E4^500 + G4~500,
500: C4/500 + E4^500 + G4~500 + C5-500,
500: C4/500 + E4^500 + G4~500 + C5-500,
500: C4/500 + E4^500 + G4~500 + C5-500,
500: C4/500 + D5-500 + A4~500 + F4^500,
500: C4/500 + D5-500 + A4~500 + F4^500,
500: C4/500 + D5-500 + A4~500 + F4^500,
500: D4/500 + G4^500 + B4~500 + E5-500,
500: D4/500 + G4^500 + B4~500 + E5-500,
500: D4/500 + G4^500 + B4~500 + E5-500,
500: E4/500 + A4^500 + C5~500 + F5-500,
500: F4/500 + B4^500 + D5~500 + G5-500,
500: E4/500 + A4^500 + C5~500 + F5-500,
500: E4/500 + A4^500 + C5~500 + F5-500,
500: D4/500 + G4^500 + B4~500 + E5-500,
500: D4/500 + G4^500 + B4~500 + E5-500,
500: D4/500 + G4^500 + B4~500 + E5-500,
500: A4~500 + D5-500 + F4^500 + C4/500,
500: G4~500 + C5-500 + E4^500 + C4/500,
500: G4~500 + C5-500 + E4^500 + C4/500,
500: G4~500 + C5-500 + E4^500 + C4/500,
500: G4~500 + C5-500 + E4^500 + C4/500,
500: G4~500 + C5-500 + E4^500 + C4/500,
500: G4~500 + C5-500 + E4^500 + C4/500`

playTune(melody)



const playback = playTune(melody, Infinity)


onInput("w", () => {
  getFirst(player).y += -1
})


onInput("s", () => {
    getFirst(player).y += 1;
});

onInput("a", () => {
    getFirst(player).x -= 1;
});

onInput("d", () => {
    getFirst(player).x += 1;
});
setPushables({
  [ player ]: []
})
onInput("j", () => {
    const currentLevel = levels[level];
    if (currentLevel !== undefined) setMap(currentLevel);
});
afterInput(() => {
  
})
setSolids([ player, box, wall, boundary ]);

setPushables({
    [player]: [ box ]
});
afterInput(() => {
    const numberCovered = tilesWith(goal, box).length;
    const targetNumber = tilesWith(goal).length;

    if (numberCovered === targetNumber) {
        level = level + 1;
        const currentLevel = levels[level];
        if (currentLevel !== undefined) setMap(currentLevel);
    }
});
afterInput(() => {
    const numberCovered = tilesWith(goal, box).length;
    const targetNumber = tilesWith(goal).length;

    if (numberCovered === targetNumber) {
        level = level + 1;

        const currentLevel = levels[level];

        if (currentLevel !== undefined) {
            setMap(currentLevel);
        } else {
            addText("you win!", { y: 4, color: color`3` });
        }
    }
});
