/*
https://sprig.hackclub.com/gallery/getting_started

@title: JB's Pushy Blocky Portal Game
@author: Justin Burns II :)
@tags: []
@addedOn: 2024-09-03
*/
setSolids([])
const player = "p"
const box = "b";
const portal = "g";
const wall = "w";
const boundary = "j";
const border = "k";

setSolids([player, box, wall, boundary, border]);


setLegend(
          [ player, bitmap`
................
................
.....3333333....
.....3333333....
...333330000....
...333330000....
...333333333....
...333333333....
...333333333....
...333333333....
...333333333....
...333333333....
.....3333333....
.....33...33....
.....33...33....
.....33...33....` ],
    
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
        portal,
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
0L11111LL11111L0
0L11111LL11111L0
0L11111LL11111L0
0L11111LL11111L0
0L1111LLLL1111L0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0L1111LLLL1111L0
0L11111LL11111L0
0L11111LL11111L0
0L11111LL11111L0
0L11111LL11111L0
0LLLLLLLLLLLLLL0
0000000000000000`
    ]
);

let level = 0
const levels = [
    map`
kkkkkk
kp...k
k.b..k
k....k
k...gk
kkkkkk`,
      map`
kkkkkkkkkkkk
kwwww......k
kw..w......k
kw.b....w..k
kw..w..w...k
kww.pww....k
kwwwwww....k
kwww..gw...k
kwww..www..k
kww........k
kw.........k
kkkkkkkkkkkk`,
    map`
kkkkkkkkkkkkkk
k............k
k............k
k..wwwwwwww..k
k..w......w..k
k..w......w..k
k..w..ww..w..k
k..w..wg..w..k
k..w..w...w..k
kp.w..w...w..k
k.bw..wwwww..k
k..w.........k
kwww.........k
kkkkkkkkkkkkkk`,

  map`
kkkkkkkkkkkkkkkk
k..............k
k..............k
k.w.w..ww..w...k
k...p..ww..w..wk
k.....ww...w..wk
k.....wwwwwww.wk
k.......ww....wk
k.w..w..w..b..wk
k..g..w.w..ww.wk
k....ww....w..wk
k.wwwwwwwwwww.wk
k.............wk
kkkkkkkkkkkkkkkk`, 
  map`
kkkkkkkkkkkkkkk
k.............k
k.............k
k.w.....wwww..k
k..w.w.....w..k
k....w.wg.....k
k....w..w.ww..k
k....www..ww..k
k...ww.ww.....k
k..ww....ww...k
k..w.....w.w..k
kp....w..b.ww.k
k........w..w.k
k.......ww....k
kkkkkkkkkkkkkkk`,
  map`
kkkkkkkkkkkkkkkkkkkkk
k................wwwk
k.................wwk
k.....wwwwwwww.....wk
k...ww.......ww....wk
k..w..........ww..gwk
k..............wwwwwk
k.....wwwww....wwwwwk
kwwwwww..ww.....wwwwk
k........ww.........k
k..wwwww.ww...wwww..k
kw.wwwww.www.wwwww.wk
kw.wwwww.wwwww..ww.wk
kw.wwwww.ww.....ww.wk
kw.wwwww.ww..ww.ww.wk
kw.wwwww.www.ww.ww.wk
kw.wwww..www.w..ww.wk
kwbwwww......w.....wk
kwpwwwwwwww..wwww..wk
kwwwwwwwwwwwwwwwwwwwk
kkkkkkkkkkkkkkkkkkkkk`,
  map`
kkkkkkkkkkkkkkkkkkk
kwwww........wwwwwk
kwww.........wwwwwk
kww.......w.gwwwwwk
kw.....wwww..w.wwwk
k....wwwwwwwww.wwwk
k...www..ww.w....wk
k...wwww..........k
k...wwwww.........k
k.....wwww...ww...k
kw.....w....www...k
kw..........www...k
kwww.......www....k
kwwww......wwww...k
k.........www.....k
kpw.w.....wwwww...k
kwwww....wwwwww.b.k
kwwwwwwwwwwwww....k
kkkkkkkkkkkkkkkkkkk`,

  map`
kkkkkkkkkkkkkkkk
k.....w........k
k..............k
k..w......w....k
k..w..wwwwgww..k
k..w.www....w..k
k..w.w.........k
k..w.w.ww....w.k
k..w...www.....k
k..w....www..w.k
k.bw..w......w.k
k..w...w....ww.k
k..ww....w.w...k
k.pwwwwwwww....k
k..wwwwwwwwwwwwk
kkkkkkkkkkkkkkkk`,
    map`
kkkkkkkkkkkkkkkkkk
kw..gwwwwwwwwwwwwk
kw.w...........wwk
kw.w.wwwwww.....wk
kw.w......w.www.wk
kw.w.wwwwww.w.w.wk
kw.w.b.....bw.w.wk
kw.w.w.wwww.w.w.wk
kw.w.w.w.pw.w.w.wk
kw.w.w.w..w.w.w.wk
kw.w.w.w.ww.w.w.wk
kw.w.w.wb...w.w.wk
kw.b..bw.wwww.w.wk
kw.www.www......wk
kw..............wk
kwwwwwwwwwwwwww.wk
kkkkkkkkkkkkkkkkkk`,
      map`
kkkkkkkkkkkkkkkkk
kp.w........gw..k
k...w.......w...k
kw...www.www...wk
k.w...ww.ww...w.k
k..w...w.w...w..k
k..ww.......ww..k
k..www.....www..k
k.......w.......k
k..www.....www..k
k..ww.......ww..k
k..w...w.w...w..k
k.w...ww.ww...w.k
kw...www.www...wk
k...w.b.....w...k
k..w.........w..k
kkkkkkkkkkkkkkkkk`,
        map`
kkkkkkkkkkkkkkkkk
kp..wwwwwwwwwwwwk
k.b..wwwwwwwwwwwk
kw....wwwwwwwwwwk
k.w....wwwwwwwwwk
k..w....wwwwwwwwk
kg..w....wwwwwwwk
k....w....wwwwwwk
kw....w....wwwwwk
kww....w....wwwwk
kwww....w....wwwk
kwwww....w....wwk
kwwwww....w....wk
kwwwwww........wk
kwwwwwww.......wk
kwwwwwwwwwwwwwwwk
kkkkkkkkkkkkkkkkk`,
          map`
kkkkkkkkkkkkkkkkk
kwwwwwwwwwwwwwwwk
kgw.w.w.w.w.w.w.k
k...............k
k.wwwwwwwwwwww..k
k.www...........k
k..w...........wk
kw.w...wwwwwwwwwk
k..ww.wwwwwwwwwwk
k.www.........b.k
k.www...........k
k..pwwwwwwwwww..k
k.wwwwwwwwwwwww.k
k.ww...w...w....k
k....w...w...ww.k
kwwwwwwwwwwwwwwwk
kkkkkkkkkkkkkkkkk`,
          map`
kkkkkkkkkkkkkkkkk
kg....w.....w...k
kww.w..ww.......k
kw...w..ww...wwwk
k....w.....w.wwwk
k.w.ww.www.w.wwwk
k.w.w.ww...wbwwwk
k.w.w...ww...wwwk
k...........wwwwk
kww.wwww.wwwwwwwk
kw..ww...www.wwwk
kw....ww.www.wwwk
kw.ww..w.www..wwk
kw...w........wwk
kwwwpww.......wwk
kwwwwwwwwwwwwwwwk
kkkkkkkkkkkkkkkkk`,
            map`
kkkkkkkkkkkkkkkkk
kp......w.wwwwwwk
k.........wwww.wk
k.wgw.w........wk
k.www....w.....wk
k..........ww..wk
kww.w.....w...wwk
k...wwwww...w...k
k..ww.......ww..k
k.....w...w.ww..k
k.w...w..w..w.w.k
k...w...........k
k..w.w...w..ww..k
k......w...w....k
k..w....w....b..k
k........w......k
kkkkkkkkkkkkkkkkk`,
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
setSolids([ player, box, wall, boundary, border ]);

setPushables({
    [player]: [ box ]
});
afterInput(() => {
    const numberCovered = tilesWith(portal, box).length;
    const targetNumber = tilesWith(portal).length;

    if (numberCovered === targetNumber) {
        level = level + 1;
        const currentLevel = levels[level];
        if (currentLevel !== undefined) setMap(currentLevel);
    }
});
afterInput(() => {
    const numberCovered = tilesWith(portal, box).length;
    const targetNumber = tilesWith(portal).length;

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
