/*
@title: frog_at_the_fungi_maze
@author: Javier Zaleta Martínez 

◕ ◡ ◕ っ
---------------------------------------------------------------------
* Instructions:                                       
Help the frog in reaching the destination!
Use WASD to move around and j to restart the level. 
* Help:
You can push the fungi to clear the path.
Check out the false walls (you can go through those).
----------------------------------------------------------------------
          \ 
           \ 
           (')-=-(')
         __(   "   )__
        / _/'-----'\_ \
     ___\\ \\     // //___
     >____)/_\---/_\(____<     
*/

//Game code below!

const player = "p";
const fungi = "f";
const goal = "g";
const wall = "w";
const fake = "q";
const bg = "b"

const frogSound = tune`
30: E4^30 + D4-30,
30: D4-30 + E4-30 + F4^30,
30: F4^30 + E4-30,
30: G4/30 + F4/30,
840`;

setLegend(
  [ player, bitmap`
................
................
....000..000....
....060..060....
...0000000000...
...0FFFFFFFF0...
..0FF000000FF0..
..0FFFFFFFFFF0..
...0000000000...
...0DDDDDDDD0...
...0D0DDDD0D0...
.000DD0DD0DD000.
.0DD0D0DD0D0DD0.
.00000000000000.
.....00..00.....
................`],
  [ fungi, bitmap`
................
................
.....666333.....
.....663333.....
..666333333333..
..663333333333..
66333333333333..
3333333333333333
3333333333333333
333333333CCCCCCC
33333333CCCCCCCC
......33CC......
......33CC......
......33CC......
......33CC......
......33CC......`],
  [ goal, bitmap`
................
....55555555....
...5577555555...
..557755777755..
.55775577757755.
.55755755555775.
.55775755775575.
.55775577557555.
.55575577557755.
.57557755757755.
.57755555755755.
.55775777557755.
..557777557755..
...5555557755...
....55555555....
................`],
  [ wall, bitmap`
LL111LLLLLLLL1LL
1LLL11L22222L1LL
111L11L11111LLLL
L11LLLL11111LL1L
L11111LLLLLLL111
11LL111L11L2LL11
1LLLLLLL11122L11
LL21222L11112LL1
L211111LL11112L1
L111111LLLLLLLLL
L11111LL22L1122L
L111LLL111L111LL
LLLLL1L1LLL1111L
LL1111LL11LLLLLL
L1L111LL1LLL1L1L
LLLLLLL1LL1LLLLL`],
  [ fake, bitmap`
LL111LLLLLLLL1LL
1LLL11L22222L1LL
111L11L11111LLLL
L11LLLL11111LL1L
L11111LLLLLLL111
11LL111L11L2LL11
1LLLLLLL11122L11
LL21222L11112LL1
L211111LL11112L1
L111111LLLLLLLLL
L11111LL22L1122L
L111LLL111L111LL
LLLLL1L1LLL1111L
LL1111LL11LLLLLL
L1L111LL1LLL6L6L
LLLLLLL1LL1LLLLL`],
  [ bg, bitmap`
4444D4444D4444D4
444D44C44D444DD4
4F4D44444444D444
44444C44D444444F
4444444D44C44D44
44D444444444DD44
C4444D4444444444
44444DD44F4C44D4
444F44D4444444D4
4D44444444444444
D4444D444D4C4444
4444444F4D444D44
44F4D44444444DD4
4444DD4444DD4444
4444444C44DD4C44
C4444F444444444F`]
);

setBackground(bg)

let level = 0;
const levels = [
  map`
gbbbbbbb
wwqwwwwb
bbbbbbbb
bwwwwwww
bbbbbbbb
wwwwwwwb
bbbbbbbb
pbbbwwww`, //1
  map`
....w...
...wgw..
wwww.www
....fbww
...bbqbb
...wwbbb
....wwww
.......p`, //2
  map`
gbbbbwww
bwwwbbww
bbbbbbww
wwwwwfww
wwwbbbbw
bbbfbwww
bbbwwbbb
bbbpqbbb`, //3
  map`
qqwgbwww
qqwbbwww
qwwwbwwp
bbbwfbbb
bbbwbwwb
wfbbbbwb
wbwwwwwb
bbbfbbbb`, //4
  map`
bbbbbqbb
bbbbbfww
wbbwwbbb
gfwbbbbb
wqwfbbbb
pwwbwbbb
bbwbwbbb
bbbfbwbb`, //5
  map`
bbbbbbwg
wwbwbfwb
bbfqqbwb
bqwqqfwb
qfbwwbwb
wwbwwbwb
wbfqwbqb
pbwwbbqb`, //6
  map`
bbbbbbwb
bwwqwbfq
wqfbqwbb
wqwwwbqb
qfqbwwwq
wbqbfqfq
wqwwwwqw
pfqwwbqg`, //7
  map`
qqwwqbfp
qfbbwqww
bwwbwqww
bbwbqqqw
qfqqqwfb
qwwwfwqq
qfbbbfqq
gqwqqqww`, //8
];

setSolids([player, fungi, wall]);

setPushables({
    [player]: [fungi]
});

const currentLevel = levels[level];
setMap(currentLevel);

onInput("w", () => {
    getFirst(player).y -= 1;
    playTune(frogSound)
});

onInput("s", () => {
    getFirst(player).y += 1;
    playTune(frogSound)
});

onInput("a", () => {
    getFirst(player).x -= 1;
    playTune(frogSound)
});

onInput("d", () => {
    getFirst(player).x += 1;
    playTune(frogSound)
});

onInput("j", () => {
    const currentLevel = levels[level];
    if (currentLevel !== undefined) setMap(currentLevel);
});

setSolids([player, fungi, wall]);

setPushables({
    [player]: [fungi]
});

afterInput(() => {
    const numberCovered = tilesWith(goal, player).length;
    const targetNumber = tilesWith(goal).length;

    if (numberCovered === targetNumber) {
        
        level = level + 1;

        const currentLevel = levels[level];

        if (currentLevel !== undefined) {
            setMap(currentLevel);
        } else {
            addText("you win!", { y: 4, color: color`6` });
        }
    }
});