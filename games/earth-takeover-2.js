/*
@title: EARTH TAKEOVER (maze)
@author: @SeanK
@tags: []
@addedOn: 2024-4-20
@img: ""




INSTRUCTIONS
 1a. Use W,A,S,D keys to move player.
 2a. If needed, use "J" to reset level and/or steps.
 3a. Use "L" to skip a level. (FOR EXPERIMENTAL AND TIME CONSUMING PURPOSES)
 4a. Use "K" to turn on music for a limited time.

GAMEPLAY
 1b. Collect the Earth on each level to progress.
 2b. Rocket traps are bad so don't touch them.
 3b. Fake walls and Earth traps are in some levels, so look out!
 4b. You will have more than enough steps (40,50,85) to get through a level, but use wisely.
 5b. If "Steps remaining" is equal to "0", the level will restart.
 6b. When pass level 7 (stage 1), stage 2 will start and levels will get longer a more challenging.

*/
const player = "p"
const wall = "w"
const goal = "g"
const stars = "s"
const trap = "t"
const eTrap = "e"
const fWall = "f"
const black = "r"
const bar1 = "h"
const bar2 = "d"
const bar3 = "j"
const bar4 = "a"
const bar5 = "q"
const grey = "b"


const w = tune`
500: D5^500,
15500`;
const a = tune`
500: D5^500,
15500`;
const s = tune`
500: B4^500,
15500`;
const d = tune`
500: B4^500,
15500`;

const lw = tune`
58.02707930367505: D4/58.02707930367505,
58.02707930367505: D4/58.02707930367505,
58.02707930367505: D5/58.02707930367505,
1682.7852998065764`;
const j = tune`
37.5: B5~37.5,
37.5: A5~37.5,
37.5: G5~37.5,
37.5: F5~37.5,
37.5: E5~37.5,
37.5: D5~37.5,
37.5: C5~37.5,
37.5: B4~37.5,
37.5: A4~37.5,
37.5: G4~37.5,
37.5: F4~37.5,
37.5: E4~37.5,
37.5: D4~37.5,
37.5: C4~37.5,
675`;
const tr = tune`
37.5: C5~37.5,
37.5: C5^37.5,
37.5: C5-37.5,
37.5: C5/37.5,
1050`;
const ls = tune`
500: E4/500,
500: F4/500,
500: E4/500,
500: F4/500,
500: E4/500,
500: F4/500,
500: G4/500,
500: E4/500,
500: E4/500,
500: F4/500,
500: E4/500,
500: F4/500,
500: E4/500,
500: F4/500,
500: G4/500,
500: E4/500,
500: E4/500,
500: F4/500,
500: E4/500,
500: F4/500,
500: E4/500,
500: F4/500,
500: G4/500,
500: E4/500,
500: E4/500,
500: F4/500,
500: E4/500,
500: F4/500,
500: E4/500,
500: F4/500,
500: G4/500,
500: E4/500`;
const win = tune`
127.11864406779661: D4/127.11864406779661,
127.11864406779661: F4/127.11864406779661,
127.11864406779661,
127.11864406779661: A4/127.11864406779661,
127.11864406779661,
127.11864406779661: C5/127.11864406779661,
127.11864406779661: A4/127.11864406779661,
127.11864406779661: F4/127.11864406779661,
127.11864406779661,
127.11864406779661: D4/127.11864406779661,
127.11864406779661: F4/127.11864406779661,
127.11864406779661: A4/127.11864406779661,
127.11864406779661: C5/127.11864406779661,
127.11864406779661: A4/127.11864406779661,
127.11864406779661: F4/127.11864406779661,
127.11864406779661: D4/127.11864406779661,
127.11864406779661: F4/127.11864406779661,
127.11864406779661: A4/127.11864406779661,
127.11864406779661: C5/127.11864406779661,
127.11864406779661: A4/127.11864406779661,
127.11864406779661: F4/127.11864406779661,
127.11864406779661: D4/127.11864406779661,
127.11864406779661: F4/127.11864406779661,
127.11864406779661: A4/127.11864406779661,
127.11864406779661: C5/127.11864406779661,
127.11864406779661,
127.11864406779661: D4/127.11864406779661,
127.11864406779661: E4/127.11864406779661,
127.11864406779661: F4/127.11864406779661,
127.11864406779661: E4/127.11864406779661,
127.11864406779661: D4/127.11864406779661,
127.11864406779661: E4/127.11864406779661`;
const lose = tune`
144.92753623188406: F5/144.92753623188406,
144.92753623188406: E5/144.92753623188406,
144.92753623188406: D5/144.92753623188406,
144.92753623188406: C5/144.92753623188406,
144.92753623188406,
144.92753623188406: F5/144.92753623188406,
144.92753623188406: E5/144.92753623188406,
144.92753623188406: D5/144.92753623188406,
144.92753623188406: B4/144.92753623188406,
144.92753623188406,
144.92753623188406: F5/144.92753623188406,
144.92753623188406: E5/144.92753623188406,
144.92753623188406: D5/144.92753623188406,
144.92753623188406: C5/144.92753623188406,
144.92753623188406,
144.92753623188406: F5/144.92753623188406,
144.92753623188406: E5/144.92753623188406,
144.92753623188406: D5/144.92753623188406,
144.92753623188406: B4/144.92753623188406,
144.92753623188406,
144.92753623188406: F5/144.92753623188406,
144.92753623188406: E5/144.92753623188406,
144.92753623188406: D5/144.92753623188406,
144.92753623188406: C5/144.92753623188406,
144.92753623188406,
144.92753623188406: F5/144.92753623188406,
144.92753623188406: E5/144.92753623188406,
144.92753623188406: D5/144.92753623188406,
144.92753623188406: B4/144.92753623188406,
144.92753623188406: E5/144.92753623188406,
144.92753623188406,
144.92753623188406: E5/144.92753623188406`;
const k = tune`
245.9016393442623: A4~245.9016393442623,
245.9016393442623: F4~245.9016393442623,
245.9016393442623: A4~245.9016393442623,
245.9016393442623: F4~245.9016393442623,
245.9016393442623: A4~245.9016393442623,
245.9016393442623: F4~245.9016393442623,
245.9016393442623: A4~245.9016393442623,
245.9016393442623: F4~245.9016393442623,
245.9016393442623: G4~245.9016393442623,
245.9016393442623: E4~245.9016393442623,
245.9016393442623: G4~245.9016393442623,
245.9016393442623: E4~245.9016393442623,
245.9016393442623: G4~245.9016393442623,
245.9016393442623: E4~245.9016393442623,
245.9016393442623: G4~245.9016393442623,
245.9016393442623: E4~245.9016393442623,
245.9016393442623: A4~245.9016393442623,
245.9016393442623: F4~245.9016393442623,
245.9016393442623: A4~245.9016393442623,
245.9016393442623: F4~245.9016393442623,
245.9016393442623: A4~245.9016393442623,
245.9016393442623: F4~245.9016393442623,
245.9016393442623: A4~245.9016393442623,
245.9016393442623: F4~245.9016393442623,
245.9016393442623: G4~245.9016393442623,
245.9016393442623: E4~245.9016393442623,
245.9016393442623: G4~245.9016393442623,
245.9016393442623: E4~245.9016393442623,
245.9016393442623: G4~245.9016393442623,
245.9016393442623: E4~245.9016393442623,
245.9016393442623: G4~245.9016393442623,
245.9016393442623: E4~245.9016393442623`;


setBackground(stars);

setLegend(
  [player, bitmap`
................
................
.....222222.....
....2......2....
...2..DDDD..2...
..2...4DD4...2..
..2...DDDD...2..
.21111111111112.
..211111111112..
...2111111112...
....22222222....
................
................
................
................
................`],
  [wall, bitmap`
1111111111111111
1111111111111111
11LLL11111LL1111
11LLL11111111111
111LL11111111111
1111111111LLLL11
1111111111LLLL11
1111LLL111LLLL11
1111LLL111LLLL11
1111111111LLLL11
1111111111111111
1111111111111111
111LLL1111111111
111LLL1111111111
111111111111LL11
1111111111111111`],
  [goal, bitmap`
5522222555555555
5DDDD55555555555
5DDD5555555DDD55
55555222225DDDD5
5522225555555555
55DDDDDDD5555555
55DDDDDDD22222DD
55DDD2222555DDDD
55DDDDDDD555DDDD
55DDDDDDD522DDDD
55DDDDDDD225DDDD
555222222555DDDD
55555555D55522DD
5555555522222DDD
55DDDDDDDDD55DDD
55DDDDDDDDD55DDD`],
  [stars, bitmap`
0000000000000000
0200000000000000
0000000000000020
0000002000020000
0000000000000000
0020000000000000
0000000000000000
0000000020000000
0000000000000000
0000000000000000
0000000000002000
0000000000000000
0000000000000000
0000000000000002
0002000020000000
0000000000000000`],
  [trap, bitmap`
................
................
................
................
....22222222L39.
...299999992L.63
..2997999992....
...299999992L39.
....22222222L6.9
................
................
................
................
................
................
................`],
  [eTrap, bitmap`
DD55555555555555
DDD5555555222222
55222222225DDD55
55DDDDDDD5555555
55DDDDDDD5555555
55DDDDDDD5555555
55DD222225555555
55DDDDDDD225DDDD
55DDDDDDD55DDDDD
55DDDDDDD55DDDDD
55DDDD2222222222
522222555555DDDD
555555555555DDDD
5555555555555DDD
5DDDDDD22222555D
5DDDDDDDDDD5555D`],
  [fWall, bitmap`
1111111111111111
1111111111111111
11LLL11111LLL111
11LLL11111111111
111LL11111111111
1111111111111111
1111111111111111
1111LLL111111111
1111LLL111111111
1111111111111111
1111111111111111
1111111111111111
111LLL1111111111
111LLL1111111111
111111111111LL11
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
  [bar1, bitmap`
4444444444444444
DDDDDDDDDDDDDDDD
4444444444444444
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
  [bar2, bitmap`
4444444444444444
DDDDDDDDDDDDDDDD
4444444444444444
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000`],
  [bar3, bitmap`
4444444444444444
DDDDDDDDDDDDDDD4
4444444444444444
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004`],
  [bar4, bitmap`
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000
4000000000000000`],
  [bar5, bitmap`
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004
0000000000000004`],
  [grey, bitmap`
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
LLLLLLLLLLLLLLLL`],



)
setSolids([player, wall, bar1, bar2, bar3, bar4, grey]);


setPushables({


});
//let W = width();
//let H = height();

//for(let i = 0; i < W; i++){
//for(let j = 0; j < H; j++){
// let ranStars = Math.floor(Math.random() * 5);
// if(ranStars == 3){
//  addSprite(i,j,3);
//}
//else if(ranStars == 4){
// addSprite(i,j,4);


addText("EARTH TAKEOVER", { x: 3, y: 3, color: color`4` });
addText("Select An Input", { x: 3, y: 13, color: color`4` });



let level = 0
const levels = [
  map`
wwwwwwwwwww
...........
...........
....www....
....wpw....
....www....
...........
...........
...........
wwwwwwwwwww`, //homescreen
  map`
rrrrrrrrrrrrr
rrrrrrrrrrrrr
rrrrrrrrrrrrr
rrrrrrrrrrrrr
rrrrrrrrrrrrr
rrrrrrrrrrrrr
rrrrrrrrrrrrr
rrrrrrrrrrrrr
rrrrrrrrrrrrr
rrrrrrrrrrrrr`,
  map`
rrrrrrrrrr
rrrrrrrrrr
rrrrrrrrrr
rrrrrrrrrf
rrrrrrrrrr
rrrrrrrrrr
rrrrrrrrrr
rrrrrrrrre
rrrrrrrrrr
rrrrrrrrrr`,
  map`
rrrrrrrrrrr
rrrrrrrrrrr
rrrrrrrrrrr
rrrrrrrrrrr
rrrrrrrrrrr
rrrrrrrrrrr
rrrrrrrrrrr
rrrrrrrrrrr
rrrrrrrrrrr
rrrrrrrrrrr
rrrrrrrrrrr`,
  map`
pswssswsws
sswswswsws
wswswswsws
sswswsssws
swwswsssws
sswswwwsws
wswswswsws
sswswswsww
sssswswssw
sssswswssg
dhhhhhhhhj`, // level 1
  map`
pwswsssssg
swswswwwww
swwwstttws
stswssssws
swwwtswsws
swsssswsws
swwwwwwsws
swssssssws
swwswwwwws
sssswsssss
dhhhhhhhhj`, // level 2
  map`
pwg...wwww
.wwww.wwww
.wttw.wttt
...ew.w..e
.wttw.w.ww
.wwww.w.w.
.w....w.w.
.wffffw.ww
..t.....t.
t....t....
dhhhhhhhhj`, // level 3
  map`
www.wwwwww
wew.t...t.
wfw...t..e
e...wwwwww
www.f...t.
ttw.f.t..g
e.w.wwwwww
t.w..wwwww
...w..ww..
.t..f..f.p
dhhhhhhhhj`, // level 4
  map`
pwt..f....
.wg..f....
.wwwwwww..
.f..t.....
.ft...t..e
.wwwwwwwww
.f.......e
.wwwwwwwww
...t...t..
.t...t...e
dhhhhhhhhj`, // level 5
  map`
..........
wwwwwwwwww
p........g
..t.tt.t..
wwwwwwwwww
..........
dhhhhhhhhj`, // level 6
  map`
et.....f.g
.t.twwwwww
....w.ew.t
wwwfw..w..
ttw.wffwt.
ptw.fttw..
fww.f.tw.t
..wwwffwff
...tt.....
wwffffwwww
dhhhhhhhhj`, // level 7
  map`
p.w....w.t...
t.f.t..f.t.t.
..f..t.f...te
.tw.t..wwwwww
..w..tewttttt
t.wwwwwwt...g
..wwwwwwwffww
.tf.....t..tt
..f.t.e...ett
t.wwwwwwwwwww
..wwwwwwwwwww
....ttttt...e
wwwfffffffwww
dhhhhhhhhhhhj
arrrrrrrrrrrq`, // level 8 (Stage 2 Begins)
  map`
p.w..........
..w..wwwwwtt.
..w..w...w...
..ww.www.w.tt
..w...tw.w...
..wt.t.f.wtt.
..w....f.w...
..w..t.f.w..e
..wet.ew.w.tt
..wwwwww.w...
.....t...wtt.
...t...t.w.ff
wwwwwwwwww.fg
dhhhhhhhhhhhj
arrrrrrrrrrrq`, // level 9
  map`
p.t...t...t..w
....t...t....w
wwwwwwwwwww.tw
wt...t...t...w
w......t...t.w
wfffwwwwwwwwww
w.....t...t.ew
w..t....t...tw
wwwwffffwwwwww
wgt.f...f..tew
w...f...f....w
wet.fe.ef..tew
wwwwwwwwwwwwww
dhhhhhhhhhhhhj
arrrrrrrrrrrrq`, // level 10
  map`
p....t....t...w
..t....t......w
wwwwwwwwwwwwt.w
..t...t....t..w
t...t...t....tw
..wwwwwwwwwwwww
..t...t...t....
....t...t...t..
wwwwwwwwwwwww.t
...t...t...t...
.t...t...t...t.
..wwwwwwwwwwwww
t...t...t...ttt
..t...t...t...g
wwwwwwwwwwwwwww
dhhhhhhhhhhhhhj
arrrrrrrrrrrrrq`, //level 11
  map`
p...t...t.....w
t.t...t...tt..w
wwwwwwwwwwww.tw
......t...t...w
tt.t....t...t.w
....wwwwwwwwwww
t.ttwwwwwwwwwww
....f...t...t..
tt.tf.t...t...e
wwffwwwwwwwwwww
t....t...t...tt
t..t...t...t.tg
wwwwwwwwwwwwfff
dhhhhhhhhhhhhhj
arrrrrrrrrrrrrq`, // level 12
  map`
e......fff......e
wwwwwwwwpwwwwwwww
t...t.....t...t..
..t...t.....t...t
.twwwwwwfwwwwwwww
..f....wewe...f.t
t.wwwwwwwfffwww..
..t...twg.tttttt.
....t..wwwtttttt.
ffwwwwwwwwwwwww..
..............w.t
.twwwwwwwwwwwwwff
..f...t...t...t..
t.f.t...t...t...e
..wwwwwffffwwwwww
.........ttttttte
wwwwwwwwfffffffff
dhhhhhhhhhhhhhhhj
arrrrrrrrrrrrrrrq`, // level 13(14)
  map`
wwwwwwwwwwwwwwwww
wwt..f..t...w..tw
wwtg.ft....twt.ew
wwwwwwwwww..wffww
wwt...t.....t..ww
ww..t...t.t...tww
wwwwww..wwwwwwwww
ww.t....t...f..ww
wwe..t....t.f.eww
wwwwwwwwwwwwwffww
ww...t...t...t.ww
wwet...t...t...ww
wwww...wwwwwwwwww
wwt..tt...t....ww
ww......t...t..ww
wwwwwwwwwwwww.tww
ww.t...t...t...ww
wwp..t...t...t.ww
dhhhhhhhhhhhhhhhj
arrrrrrrrrrrrrrrq`, // L14
  map`
wwp..t..f...t...ww
ww.t...tw.t...teww
wwwwwwwwwwwwwfffww
ww......wt.t....ww
ww......we...t..ww
wwwwwwwwwwwwwwffww
wwt...t.f...t...ww
wwe.t...f.t...teww
wwwffwwwwwwwwwwwww
ww.t.t.ew.......ww
wwt....ew.......ww
wwwffwwwwwwwwwwwww
wwt.ttttf...t..eww
wwt....ef.t...t.ww
wwwffwwwwwwwwwffww
wwtt.t..f.t...ttww
wwt....tf...t..gww
wwwwwwwwwwwwwwwwww
dhhhhhhhhhhhhhhhhj
arrrrrrrrrrrrrrrrq`,
  map`
wp..wg..wt..wt..w
w...w...f...f...w
w...w...f..tf..tw
wwffwwwwwwwwwwffw
w..twt..wt..w..tw
w...w...w...w...w
wt..w..tw..twt..w
wwffwwffwwffwwffw
wt..f..tw..tw..tw
w...f...w...w...w
w..twt..wt..wt..w
wwffwwffwwwwwwffw
w..twt..wt..wt..w
w...w...f...f...w
wt..w..tf..tf..tw
wwffwwffwwffwwffw
wtttwtttwtttwtttw
wtttwtttwtttwtttw
dhhhhhhhhhhhhhhhj
arrrrrrrrrrrrrrrq`,
  map`
wp..w...w...w..ew
w...w...w...w...w
w...w...f...wtt.w
wtt.wtt.ftt.w...w
w...w...f...w.ttw
w...w.ttf.ttw...w
w.ttw...f...wtt.w
w...w...f...w...w
w...wtt.wtt.w.ttw
wtt.f...w...f...w
w...f...w...f...w
w...f.ttw.ttftt.w
w.ttf...w...f...w
w...f...w...f...w
w...ftt.wtt.ftt.w
w...w...w...w...w
w...w...w...w.ttw
w...w...w...w..gw
dhhhhhhhhhhhhhhhh
arrrrrrrrrrrrrrrr`,
  map`
......w.p.w......
......w...w......
wwwwwwwfffwwwwwww
.t....t...t.t.t.t
..tt...t.t....tt.
e.t.t.........t.e
wwwwwwwfffwwwwwww
tt....t...t...t.t
tt..t..t.t.....t.
gtt..........t.te
fwwwwwwfffwwwwwww
.t....t...t......
...t...t.t....ttt
ettt..........t.e
wwwwwwwfffwwwwwww
.................
eeeeeeeeeeeeeeeee
wwwwwwwwwwwwwwwww
dhhhhhhhhhhhhhhhj
arrrrrrrrrrrrrrrq`,
]



const playback = playTune(ls, Infinity);


const currentLevel = levels[level];
setMap(currentLevel);
setMap(levels[level]);

let steps = 40;


onInput("w", () => {

  playback.end();
  clearText("");
  if (level <= 21 && level > 3) {

    getFirst(player).y -= 1
  }

  playTune(w);
  steps--;

  if (level == 0) {
    setBackground(black);
    addText("YOUR ALIEN FRIENDS", { x: 1, y: 1, color: color`4` });
    addText("HAVE BEEN CAPTURED!", { x: 1, y: 3, color: color`4` });
    addText("CONSERVE GAS", { x: 1, y: 5, color: color`4` });
    addText("SAVE THE ALIENS", { x: 1, y: 7, color: color`4` });
    addText("AND...", { x: 1, y: 9, color: color`4` });
    addText("TAKE OVER EARTH!", { x: 1, y: 11, color: color`4` });

    addText("Press an Input", { x: 1, y: 14, color: color`4` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  } else { setBackground(stars); }



  if (level == 0 + 1) {
    addText("Don't Waste Steps!", { x: 1, y: 1, color: color`H` });
    addText("Gather Earths", { x: 1, y: 3, color: color`H` });
    addText("You can walk", { x: 1, y: 5, color: color`8` });
    addText("through fake walls", { x: 1, y: 7, color: color`8` });
    addText("Fake Earths", { x: 1, y: 9, color: color`H` });
    addText("work like traps", { x: 1, y: 11, color: color`H` });

    addText("Press an Input", { x: 1, y: 14, color: color`8` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  }





  if (level == 1 + 1) {
    addText("W = UP", { x: 1, y: 1, color: color`4` });
    addText("A = LEFT", { x: 1, y: 3, color: color`4` });
    addText("S = DOWN", { x: 1, y: 5, color: color`4` });
    addText("D = RIGHT", { x: 1, y: 7, color: color`4` });
    addText("J = RESTART LEVEL", { x: 1, y: 9, color: color`D` });
    addText("K = TOGGLE MUSIC", { x: 1, y: 11, color: color`D` });
    addText("I = DISPLAY SCORE", { x: 1, y: 13, color: color`D` });

    addText("Press an Input", { x: 1, y: 15, color: color`4` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  }

})

onInput("a", () => {
  playback.end();
  if (level <= 21 && level > 3) {
    getFirst(player).x -= 1
  }
  clearText("");
  playTune(a);
  steps--;

  if (level == 0 + 1) {
    addText("Don't Waste Steps!", { x: 1, y: 1, color: color`H` });
    addText("Gather Earths", { x: 1, y: 3, color: color`H` });
    addText("You can walk", { x: 1, y: 5, color: color`8` });
    addText("through fake walls", { x: 1, y: 7, color: color`8` });
    addText("Fake Earths", { x: 1, y: 9, color: color`H` });
    addText("work like traps", { x: 1, y: 11, color: color`H` });

    addText("Press an Input", { x: 1, y: 14, color: color`8` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  } else { setBackground(stars); }

  if (level == 1 + 1) {
    addText("W = UP", { x: 1, y: 1, color: color`4` });
    addText("A = LEFT", { x: 1, y: 3, color: color`4` });
    addText("S = DOWN", { x: 1, y: 5, color: color`4` });
    addText("D = RIGHT", { x: 1, y: 7, color: color`4` });
    addText("J = RESTART LEVEL", { x: 1, y: 9, color: color`D` });
    addText("K = TOGGLE MUSIC", { x: 1, y: 11, color: color`D` });
    addText("I = DISPLAY SCORE", { x: 1, y: 13, color: color`D` });

    addText("Press an Input", { x: 1, y: 15, color: color`4` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  }

  if (level == 0) {
    setBackground(black);
    addText("YOUR ALIEN FRIENDS", { x: 1, y: 1, color: color`4` });
    addText("HAVE BEEN CAPTURED!", { x: 1, y: 3, color: color`4` });
    addText("CONSERVE GAS", { x: 1, y: 5, color: color`4` });
    addText("SAVE THE ALIENS", { x: 1, y: 7, color: color`4` });
    addText("AND...", { x: 1, y: 9, color: color`4` });
    addText("TAKE OVER EARTH!", { x: 1, y: 11, color: color`4` });

    addText("Press an Input", { x: 1, y: 14, color: color`4` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  } else { setBackground(stars); }

})

onInput("s", () => {
  playback.end();
  if (level <= 21 && level > 3) {

    getFirst(player).y += 1
  }

  clearText("");
  playTune(s);
  steps--;

  if (level == 0 + 1) {
    addText("Don't Waste Steps!", { x: 1, y: 1, color: color`H` });
    addText("Gather Earths", { x: 1, y: 3, color: color`H` });
    addText("You can walk", { x: 1, y: 5, color: color`8` });
    addText("through fake walls", { x: 1, y: 7, color: color`8` });
    addText("Fake Earths", { x: 1, y: 9, color: color`H` });
    addText("work like traps", { x: 1, y: 11, color: color`H` });

    addText("Press an Input", { x: 1, y: 14, color: color`8` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);

  }

  if (level == 1 + 1) {
    addText("W = UP", { x: 1, y: 1, color: color`4` });
    addText("A = LEFT", { x: 1, y: 3, color: color`4` });
    addText("S = DOWN", { x: 1, y: 5, color: color`4` });
    addText("D = RIGHT", { x: 1, y: 7, color: color`4` });
    addText("J = RESTART LEVEL", { x: 1, y: 9, color: color`D` });
    addText("K = TOGGLE MUSIC", { x: 1, y: 11, color: color`D` });
    addText("I = DISPLAY SCORE", { x: 1, y: 13, color: color`D` });

    addText("Press an Input", { x: 1, y: 15, color: color`4` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  }

  if (level == 0) {
    setBackground(black);
    addText("YOUR ALIEN FRIENDS", { x: 1, y: 1, color: color`4` });
    addText("HAVE BEEN CAPTURED!", { x: 1, y: 3, color: color`4` });
    addText("CONSERVE GAS", { x: 1, y: 5, color: color`4` });
    addText("SAVE THE ALIENS", { x: 1, y: 7, color: color`4` });
    addText("AND...", { x: 1, y: 9, color: color`4` });
    addText("TAKE OVER EARTH!", { x: 1, y: 11, color: color`4` });

    addText("Press an Input", { x: 1, y: 14, color: color`4` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  } else { setBackground(stars); }


})

onInput("d", () => {
  playback.end();
  clearText("");
  playTune(d);
  steps--;
  if (level <= 21 && level > 3) {

    getFirst(player).x += 1;
  }
  if (level == 0 + 1) {
    addText("Don't Waste Steps!", { x: 1, y: 1, color: color`H` });
    addText("Gather Earths", { x: 1, y: 3, color: color`H` });
    addText("You can walk", { x: 1, y: 5, color: color`8` });
    addText("through fake walls", { x: 1, y: 7, color: color`8` });
    addText("Fake Earths", { x: 1, y: 9, color: color`H` });
    addText("work like traps", { x: 1, y: 11, color: color`H` });

    addText("Press an Input", { x: 1, y: 14, color: color`8` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);

  }

  if (level == 1 + 1) {
    addText("W = UP", { x: 1, y: 1, color: color`4` });
    addText("A = LEFT", { x: 1, y: 3, color: color`4` });
    addText("S = DOWN", { x: 1, y: 5, color: color`4` });
    addText("D = RIGHT", { x: 1, y: 7, color: color`4` });
    addText("J = RESTART LEVEL", { x: 1, y: 9, color: color`D` });
    addText("K = TOGGLE MUSIC", { x: 1, y: 11, color: color`D` });
    addText("I = DISPLAY SCORE", { x: 1, y: 13, color: color`D` });

    addText("Press an Input", { x: 1, y: 15, color: color`4` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  }

  if (level == 0) {
    setBackground(black);
    addText("YOUR ALIEN FRIENDS", { x: 1, y: 1, color: color`4` });
    addText("HAVE BEEN CAPTURED!", { x: 1, y: 3, color: color`4` });
    addText("CONSERVE GAS", { x: 1, y: 5, color: color`4` });
    addText("SAVE THE ALIENS", { x: 1, y: 7, color: color`4` });
    addText("AND...", { x: 1, y: 9, color: color`4` });
    addText("TAKE OVER EARTH!", { x: 1, y: 11, color: color`4` });

    addText("Press an Input", { x: 1, y: 14, color: color`4` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  } else { setBackground(stars); }
})

onInput("j", () => {
  if (level > 2 + 1 && level <= 21) {
    playTune(j);
    score -= 2;
  }


  playback.end();
  clearText("");
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }

  if (level > 2 + 1 && level <= 9 + 1) {
    steps = 40;
  }

  if (level == 8 + 3 || level == 10 + 3) {
    steps = 50;

  }

  if (level == 9 + 3) {
    steps = 85;

  }

  if (level == 11 + 3) {
    steps = 100;
  }

  if (level == 13 + 2) {
    steps = 65;
  }

  if (level == 14 + 2) {
    steps = 115;
  }

  if (level >= 17) {
    steps = 95;
  }

  if (level == 0 + 1) {
    addText("Don't Waste Steps!", { x: 1, y: 1, color: color`H` });
    addText("Gather Earths", { x: 1, y: 3, color: color`H` });
    addText("You can walk", { x: 1, y: 5, color: color`8` });
    addText("through fake walls", { x: 1, y: 7, color: color`8` });
    addText("Fake Earths", { x: 1, y: 9, color: color`H` });
    addText("work like traps", { x: 1, y: 11, color: color`H` });

    addText("Press an Input", { x: 1, y: 14, color: color`8` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);


  }

  if (level == 1 + 1) {
    addText("W = UP", { x: 1, y: 1, color: color`4` });
    addText("A = LEFT", { x: 1, y: 3, color: color`4` });
    addText("S = DOWN", { x: 1, y: 5, color: color`4` });
    addText("D = RIGHT", { x: 1, y: 7, color: color`4` });
    addText("J = RESTART LEVEL", { x: 1, y: 9, color: color`D` });
    addText("K = TOGGLE MUSIC", { x: 1, y: 11, color: color`D` });
    addText("I = DISPLAY SCORE", { x: 1, y: 13, color: color`D` });

    addText("Press an Input", { x: 1, y: 15, color: color`4` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  }

  if (level == 0) {
    setBackground(black);
    addText("YOUR ALIEN FRIENDS", { x: 1, y: 1, color: color`4` });
    addText("HAVE BEEN CAPTURED!", { x: 1, y: 3, color: color`4` });
    addText("CONSERVE GAS", { x: 1, y: 5, color: color`4` });
    addText("SAVE THE ALIENS", { x: 1, y: 7, color: color`4` });
    addText("AND...", { x: 1, y: 9, color: color`4` });
    addText("TAKE OVER EARTH!", { x: 1, y: 11, color: color`4` });

    addText("Press an Input", { x: 1, y: 14, color: color`4` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  } else { setBackground(stars); }

});

onInput("k", () => {
  playback.end();
  clearText("");
  if (level > 3 && level <= 20) {
    playTune(k, 5);
    score += 5;
  }
  if (level == 0 + 1) {
    addText("Don't Waste Steps!", { x: 1, y: 1, color: color`H` });
    addText("Gather Earths", { x: 1, y: 3, color: color`H` });
    addText("You can walk", { x: 1, y: 5, color: color`8` });
    addText("through fake walls", { x: 1, y: 7, color: color`8` });
    addText("Fake Earths", { x: 1, y: 9, color: color`H` });
    addText("work like traps", { x: 1, y: 11, color: color`H` });

    addText("Press an Input", { x: 1, y: 14, color: color`8` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  }

  if (level == 1 + 1) {
    addText("W = UP", { x: 1, y: 1, color: color`4` });
    addText("A = LEFT", { x: 1, y: 3, color: color`4` });
    addText("S = DOWN", { x: 1, y: 5, color: color`4` });
    addText("D = RIGHT", { x: 1, y: 7, color: color`4` });
    addText("J = RESTART LEVEL", { x: 1, y: 9, color: color`D` });
    addText("K = TOGGLE MUSIC", { x: 1, y: 11, color: color`D` });
    addText("I = DISPLAY SCORE", { x: 1, y: 13, color: color`D` });

    addText("Press an Input", { x: 1, y: 15, color: color`4` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  }

  if (level == 0) {
    setBackground(black);
    addText("YOUR ALIEN FRIENDS", { x: 1, y: 1, color: color`4` });
    addText("HAVE BEEN CAPTURED!", { x: 1, y: 3, color: color`4` });
    addText("CONSERVE GAS", { x: 1, y: 5, color: color`4` });
    addText("SAVE THE ALIENS", { x: 1, y: 7, color: color`4` });
    addText("AND...", { x: 1, y: 9, color: color`4` });
    addText("TAKE OVER EARTH!", { x: 1, y: 11, color: color`4` });

    addText("Press an Input", { x: 1, y: 14, color: color`4` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  } else { setBackground(stars); }

});

onInput("i", () => {
  playback.end();
  clearText("");
  if (level == 0 + 1) {
    addText("Don't Waste Steps!", { x: 1, y: 1, color: color`H` });
    addText("Gather Earths", { x: 1, y: 3, color: color`H` });
    addText("You can walk", { x: 1, y: 5, color: color`8` });
    addText("through fake walls", { x: 1, y: 7, color: color`8` });
    addText("Fake Earths", { x: 1, y: 9, color: color`H` });
    addText("work like traps", { x: 1, y: 11, color: color`H` });

    addText("Press an Input", { x: 1, y: 14, color: color`8` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);

  }

  if (level == 1 + 1) {
    addText("W = UP", { x: 1, y: 1, color: color`4` });
    addText("A = LEFT", { x: 1, y: 3, color: color`4` });
    addText("S = DOWN", { x: 1, y: 5, color: color`4` });
    addText("D = RIGHT", { x: 1, y: 7, color: color`4` });
    addText("J = RESTART LEVEL", { x: 1, y: 9, color: color`D` });
    addText("K = TOGGLE MUSIC", { x: 1, y: 11, color: color`D` });
    addText("I = DISPLAY SCORE", { x: 1, y: 13, color: color`D` });

    addText("Press an Input", { x: 1, y: 15, color: color`4` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  }
  if (level > 3) {
    addText("Score:" + score, { y: 7, color: color`4` });
  }


  if (level == 0) {
    setBackground(black);
    addText("YOUR ALIEN FRIENDS", { x: 1, y: 1, color: color`4` });
    addText("HAVE BEEN CAPTURED!", { x: 1, y: 3, color: color`4` });
    addText("CONSERVE GAS", { x: 1, y: 5, color: color`4` });
    addText("SAVE THE ALIENS", { x: 1, y: 7, color: color`4` });
    addText("AND...", { x: 1, y: 9, color: color`4` });
    addText("TAKE OVER EARTH!", { x: 1, y: 11, color: color`4` });

    addText("Press an Input", { x: 1, y: 14, color: color`4` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  } else { setBackground(stars); }


});

onInput("l", () => {
  if (level > 2 + 1 && level < 21) {
    playTune(lw);
    score -= 15;
  }

  playback.end();
  clearText("");

  const nextLevel = currentLevel + currentLevel;

  if (currentLevel !== undefined && level > 1 + 1 && level < 21) {
    clearText("");
    setMap(nextLevel);
  }

  if (level == 0 + 1) {
    addText("Don't Waste Steps!", { x: 1, y: 1, color: color`H` });
    addText("Gather Earths", { x: 1, y: 3, color: color`H` });
    addText("You can walk", { x: 1, y: 5, color: color`8` });
    addText("through fake walls", { x: 1, y: 7, color: color`8` });
    addText("Fake Earths", { x: 1, y: 9, color: color`H` });
    addText("work like traps", { x: 1, y: 11, color: color`H` });

    addText("Press an Input", { x: 1, y: 14, color: color`8` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  }

  if (level == 1 + 1) {
    addText("W = UP", { x: 1, y: 1, color: color`4` });
    addText("A = LEFT", { x: 1, y: 3, color: color`4` });
    addText("S = DOWN", { x: 1, y: 5, color: color`4` });
    addText("D = RIGHT", { x: 1, y: 7, color: color`4` });
    addText("J = RESTART LEVEL", { x: 1, y: 9, color: color`D` });
    addText("K = TOGGLE MUSIC", { x: 1, y: 11, color: color`D` });
    addText("I = DISPLAY SCORE", { x: 1, y: 13, color: color`D` });

    addText("Press an Input", { x: 1, y: 15, color: color`4` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  }


  if (level <= 7 + 3) {
    steps = 40;
  }

  if (level == 8 + 3 || level == 10 + 3) {
    steps = 50;
  }

  if (level == 9 + 3) {
    steps = 85;
  }

  if (level == 11 + 3) {
    steps = 100;
  }

  if (level == 13 + 2) {
    steps == 65

  }

  if (level > 13 + 2) {
    steps == 115

  }

  if (level >= 17) {
    steps == 95;

  }

  if (level == 0) {
    setBackground(black);
    addText("YOUR ALIEN FRIENDS", { x: 1, y: 1, color: color`4` });
    addText("HAVE BEEN CAPTURED!", { x: 1, y: 3, color: color`4` });
    addText("CONSERVE GAS", { x: 1, y: 5, color: color`4` });
    addText("SAVE THE ALIENS", { x: 1, y: 7, color: color`4` });
    addText("AND...", { x: 1, y: 9, color: color`4` });
    addText("TAKE OVER EARTH!", { x: 1, y: 11, color: color`4` });

    addText("Press an Input", { x: 1, y: 14, color: color`4` });
    const nextLevel = currentLevel + currentLevel;
    setMap(nextLevel);
  } else { setBackground(stars); }


});


let score = 0
let onLevel = 1;
let stage = 1;


afterInput(() => {



  let winText = ["GOOD JOB!", "GREAT WORK!", "CONGRATS!", "KEEP IT UP!", "AMAZING!", "TOO EASY!"]
  let ranText = Math.floor(Math.random() * 6);

  let stageText = ["You ready?", "Let's begin!", "Get started!", "Get ready!", "Oh yeah!", "%#%@^!@"]
  let ranStageText = Math.floor(Math.random() * 6);

  if (level >= 3 && level !== 13) {
    addText("Lvl:" + onLevel + "-" + stage, { x: 3, y: 15, color: color`D` });
    addText("S:" + score, { x: 13, y: 15, color: color`2` });
  }

  if (level == 13) {
    clearText("")

    addText("Lvl:" + onLevel + "-" + stage, { x: 3, y: 15, color: color`D` });
    addText("S:" + score, { x: 12, y: 15, color: color`2` });
  }

  if (level == 9) {
    clearText("")
    addText("Lvl:" + onLevel + "-" + stage, { x: 3, y: 14, color: color`D` });
    addText("S:" + score, { x: 13, y: 14, color: color`2` });
  }

  if (level > 2 + 1) {
    addText("Steps remaining:" + steps, { y: 1, color: color`4` });

  }
  if (level == 13 + 2) {
    clearText("")
    addText("SR:" + steps, { x: 15, y: 1, color: color`6` });
    addText("Lvl:" + onLevel + "-" + stage, { x: 3, y: 15, color: color`6` });
    addText("S:" + score, { x: 12, y: 15, color: color`2` });

  }

  if (level == 10 + 1 || level == 11 + 1 || level == 13 + 1 || level == 15 + 1) {
    clearText("")
    addText("SR:" + steps, { y: 1, color: color`6` });
    addText("Lvl:" + onLevel + "-" + stage, { x: 4, y: 15, color: color`6` });
    addText("S:" + score, { x: 12, y: 15, color: color`2` });

  }

  if (level == 10 + 3) {
    clearText("")
    addText("SR:" + steps, { x: 14, y: 1, color: color`6` });
    addText("Lvl:" + onLevel + "-" + stage, { x: 3, y: 15, color: color`6` });
    addText("S:" + score, { x: 12, y: 15, color: color`2` });

  }

  if (level == 18) {
    clearText("")
    addText("SR:" + steps, { x: 15, y: 1, color: color`9` });
    addText("Lvl:" + onLevel + "-" + stage, { x: 4, y: 15, color: color`9` });
    addText("S:" + score, { x: 12, y: 15, color: color`2` });
  }

  if (level >= 16 + 1) {
    clearText("")
    addText("Steps remaining:" + steps, { y: 1, color: color`9` });
    addText("Lvl:" + onLevel + "-" + stage, { x: 4, y: 15, color: color`9` });
    addText("S:" + score, { x: 12, y: 15, color: color`2` });
  }

  if (steps < 0) {
    clearText("")
    addText("DON'T WASTE STEPS!", { y: 7, color: color`2` });
    addText("SCORE (-5)", { y: 15, color: color`4` });

    if (level > 2 + 1) {
      score -= 5;
    }
  }



  if (steps < 0 && level <= 7 + 3) {
    setMap(levels[level])
    steps = 40;
    playTune(j);

  }

  if (steps < 0 && level == 8 + 3) {
    setMap(levels[level])
    steps = 50;
    playTune(j);

  }

  if (steps < 0 && level == 9 + 3) {
    steps = 85;
    playTune(j);
    setMap(levels[level])

  }


  if (steps < 0 && level == 10 + 3) {
    steps = 50;
    playTune(j);
    setMap(levels[level])

  }

  if (steps < 0 && level == 11 + 3) {
    steps = 100;
    playTune(j);
    setMap(levels[level])

  }

  if (steps < 0 && level == 14 + 2) {
    steps = 115;
    playTune(j);
    setMap(levels[level])

  }

  if (steps < 0 && level == 13 + 2) {
    steps = 65;
    playTune(j);
    setMap(levels[level])

  }


  if (steps < 0 && level >= 17) {
    steps = 95;
    playTune(j);
    setMap(levels[level])

  }
  const trapsCovered = tilesWith(player, trap).length


  if (trapsCovered == 1) {
    setMap(levels[level])
    clearText("");
    playTune(tr);
    addText("WATCH OUT!", { y: 7, color: color`9` });
    addText("SCORE (-10)", { y: 15, color: color`4` });
    if (level > 2 + 1) {
      score -= 10;
    }
  }


  const eTrapsCovered = tilesWith(player, eTrap).length


  if (eTrapsCovered == 1) {
    setMap(levels[level])
    clearText("");
    playTune(tr);
    addText("LOOK AROUND!", { y: 7, color: color`5` });
    if (level > 2 + 1) {
      addText("SCORE (-5)", { y: 15, color: color`4` });
      score -= 5;
    }
  }


  const targetNumber = tilesWith(goal).length;
  const numberCovered = tilesWith(goal, player).length;


  if (numberCovered === targetNumber && currentLevel !== undefined) {
    playTune(lw);
    if (level > 2 + 1 && level <= 21) {
      score += 15;
      onLevel += 1;

    }
    if (level > 1 + 1) {
      clearText("");
    }
    steps = 40;
    level = level + 1;
    if (level > 4) {
      addText(winText[ranText], { y: 15, color: color`4` });
    }
    const currentLevel = levels[level];

    if (level >= 16 + 1) {
      steps = 95;
    }


    if (level == 8 + 3 || level == 10 + 3) {
      steps = 50;
    }

    if (level == 8 + 3) {
      clearText("")
      addText("Stage 2 Begins", { y: 7, color: color`6` });
      addText(stageText[ranStageText], { y: 15, color: color`6` });
      onLevel = 1;
      stage++;
    }
    if (level == 3 + 1) {
      clearText("")
      addText("Stage 1 Begins", { y: 7, color: color`4` });
      addText(stageText[ranStageText], { y: 15, color: color`4` });
    }

    if (level == 16 + 1) {
      clearText("")
      addText("Stage 3 Begins", { y: 7, color: color`9` });
      addText(stageText[ranStageText], { y: 15, color: color`9` });
      stage++;
      steps = 95;
      onLevel = 1;
    }

    if (level == 9 + 3 || level == 13 + 2) {
      steps = 85;

    }

    if (level == 11 + 3) {
      steps = 100;
    }


    if (level == 13 + 2) {
      steps = 65;
    }

    if (level == 14 + 2) {
      steps = 115;
    }

    if (level == 16 + 1) {
      steps = 95;
    }

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {


      clearText("");
      setMap(black);
      score = score;
      const playback = playTune(win, Infinity);
      addText("YOU WIN!", { y: 1, color: color`4` });
      addText("SAVE ALL THE ALIENS", { y: 4, color: color`4` });
      addText("AND TAKEOVER EARTH!", { y: 7, color: color`4` });
      addText("TOTAL SCORE: " + score + " pts", { y: 10, color: color`2` });
      addText("====================", { x: 1, y: 11, color: color`1` });

      if (score == 270) {
        addText("PERFECT RUN!", { y: 13, color: color`H` });
        addText("GRADE: A+", { y: 15, color: color`H` });
      }

      if (score > 270 && score < 300) {
        addText("YOU LIKE THE MUSIC?", { y: 13, color: color`5` });
        addText("S TIER!", { y: 15, color: color`5` });
      }


      if (score < 270 && score >= 215) {
        addText("ALMOST PERFECT!", { y: 13, color: color`H` });
        addText("GRADE: A-", { y: 15, color: color`H` });
      }


      if (score < 215 && score >= 115) {
        addText("GOOD JOB, TRY AGAIN?", { y: 13, color: color`H` });
        addText("GRADE: B+", { y: 15, color: color`H` });
      }

      if (score < 115 && score > 95) {
        addText("Uhh...", { y: 13, color: color`H` });
        addText("GRADE: D-", { y: 15, color: color`H` });
      }


      if (score <= 95) {
        clearText("")
        playback.end();
        playTune(lose,Infinity)
        addText("YOU LOSE!", { y: 3, color: color`3` });
        addText("YOU DID NOT", { y: 5, color: color`3` });
        addText("SAVE THE ALIENS!", { y: 7, color: color`3` });
        addText("TOTAL SCORE: " + score + " pts", { y: 10, color: color`2` });
        addText("====================", { x: 1, y: 11, color: color`1` });
        addText("HOW?!", { y: 13, color: color`3` });
        addText("GRADE: F", { y: 15, color: color`3` });
      }
      if (score > 295 && score < 1000) {
        playback.end();
        playTune(lose,Infinity)
        clearText("")
        addText("YOU LOSE!", { y: 3, color: color`3` });
        addText("TOO MUCH MUSIC", { y: 5, color: color`3` });
        addText("DISTRACTED YOU!", { y: 7, color: color`3` });
        addText("TOTAL SCORE: " + score + " pts", { y: 10, color: color`2` });
        addText("====================", { x: 1, y: 11, color: color`1` });
        addText("WHY?!", { y: 13, color: color`3` });
        addText("GRADE: F", { y: 15, color: color`3` });
      }

      if (score > 1000) {
        addText("O_o", { y: 13, color: color`H` });
      }
      steps = "NaN";

    }
  }




  function checkForPlayer(x, y) {
    let result = false
    getTile(x, y).map((tile) => {
      if (tile.type == player)
        result = true
    })
    return result
  }

  let up = false

  setInterval(() => {
    if (level == 9) {
      if (up) {
        if (!(checkForPlayer(1, 2) || checkForPlayer(2, 2) || checkForPlayer(3, 2) || checkForPlayer(4, 2) || checkForPlayer(5, 2) || checkForPlayer(6, 2) || checkForPlayer(7, 2) || checkForPlayer(8, 2) || checkForPlayer(9, 2) || checkForPlayer(10, 2))) {
          clearTile(4, 2)
          clearTile(2, 2)
          clearTile(5, 2)
          clearTile(7, 2)

          addSprite(4, 3, trap)
          addSprite(2, 3, trap)
          addSprite(5, 3, trap)
          addSprite(7, 3, trap)
          up = false
        }
      } else {
        if (!(checkForPlayer(1, 3) || checkForPlayer(2, 3) || checkForPlayer(3, 3) || checkForPlayer(4, 3) || checkForPlayer(5, 3) || checkForPlayer(6, 3) || checkForPlayer(7, 3) || checkForPlayer(8, 3) || checkForPlayer(9, 3) || checkForPlayer(10, 3))) {
          clearTile(4, 3)
          clearTile(2, 3)
          clearTile(5, 3)
          clearTile(7, 3)

          addSprite(4, 2, trap)
          addSprite(2, 2, trap)
          addSprite(5, 2, trap)
          addSprite(7, 2, trap)
          up = true
        }
      }
    } else if (level == 12) {

      if (up) {
        if (!(checkForPlayer(0, 1) || checkForPlayer(0, 2) || checkForPlayer(0, 5) || checkForPlayer(0, 6) || checkForPlayer(0, 7) || checkForPlayer(0, 9) || checkForPlayer(0, 10) ||
            checkForPlayer(1, 3) || checkForPlayer(1, 2) || checkForPlayer(1, 5) || checkForPlayer(1, 6) || checkForPlayer(1, 7) || checkForPlayer(1, 9) || checkForPlayer(1, 10) || checkForPlayer(0, 12) || checkForPlayer(1, 12) || checkForPlayer(0, 13) || checkForPlayer(1, 13))) {
          clearTile(0, 2)
          addSprite(1, 2, trap)

          clearTile(0, 5)
          addSprite(1, 5, trap)

          addSprite(1, 9, trap)
          clearTile(0, 9)
          up = false
        }
      } else {
        if (!(checkForPlayer(0, 2) || checkForPlayer(0, 5) || checkForPlayer(0, 6) || checkForPlayer(0, 7) || checkForPlayer(0, 9) || checkForPlayer(0, 10) || checkForPlayer(0, 11) || checkForPlayer(1, 11) || checkForPlayer(0, 10) ||
            checkForPlayer(1, 3) || checkForPlayer(1, 2) || checkForPlayer(1, 5) || checkForPlayer(1, 6) || checkForPlayer(1, 7) || checkForPlayer(1, 10) || checkForPlayer(1, 9) ||
            checkForPlayer(0, 12) || checkForPlayer(1, 12) || checkForPlayer(0, 13) || checkForPlayer(1, 13))) {
          addSprite(0, 2, trap)
          clearTile(1, 2, )

          addSprite(0, 5, trap)
          clearTile(1, 5)

          addSprite(0, 9, trap)
          clearTile(1, 9)
          up = true
        }
      }

    }

  }, 1000)




});
