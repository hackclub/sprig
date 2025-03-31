/*
@title: BananaMaze
@author: Joshua Abernathy
@tags: ['adventure']
@addedOn: 2025-01-19
*/
const invisf = "u";
const player = "p";
const spike = "s";
const wall = "w";
const breakw = "b";
const pickaxe ="a";
const key = "k";
const door = "d";
const invis = "I";
const B = "B";
const A = "A";
const N = "N";
const a = "f";
const m = "m";
const z = "z";
const e = "e";


setLegend(
   [ player, bitmap`
................
................
......000.......
.....06660......
....066660......
....06660.......
....06660.......
..0.05650.......
..000666000.....
....0FFF0.0.....
....06660.......
....066660......
.....06660......
......000.......
......0.0.......
.....00.00......`],
   [ spike, bitmap`
.......00.......
......0110......
......0110......
.....011110.....
.....011110.....
...0011111100...
.00111100111100.
0111110..0111110
0111110..0111110
.00111100111100.
...0011111100...
.....0111110....
.....011110.....
......0110......
......0110......
.......00.......`],
   [ breakw, bitmap`
01L111L111011111
101L1L11001L11L1
L101011011L11111
1L10L010L1111100
11011101111L10L1
10L1111010010L11
1L01111101011111
1110L11L011010L1
11110110L11L0101
11L010010111L101
L10L11110L111110
0011111001001111
1L111L01L01L0011
111110111111L101
1111L0L111111110
1111011111111111`],
   [ wall, bitmap`
1011110111110111
1011110111110111
1011110111110111
0000000000000000
1101111011111011
1101111011111011
1101111011111011
0000000000000000
1011110111110111
1011110111110111
1011110111110111
0000000000000000
1101111011111011
1101111011111011
1101111011111011
0000000000000000`],
   [ pickaxe, bitmap`
................
........00......
......00770.....
....007700......
....0700........
...070C0........
...0700C0.......
..070..0C0......
..070...0C0.....
...0.....0C0....
..........070...
...........00...
................
................
................
................`],
   [ key, bitmap`
................
................
......000.......
.....06660......
.....06060......
.....06660......
......060.......
......060.......
......060.......
.....0660.......
......060.......
.....0660.......
......00........
................
................
................`],
   [ door, bitmap`
1011110111110111
1011110CC1110111
10111CC00CC10111
0000C000000C0000
110C00000000C011
110C00000000C011
11C0000000000C11
00C0000000000C00
10C0000000000C11
10C0000000000C11
10C0000000000C11
00C0000000000C00
11C0000000000C01
11C0000000000C01
11C0000000000C01
00C0000000000C00`],
   [ invis, bitmap`
4110111101111400
44D0111101111401
144D111100141401
0400000000044400
04400111101DD440
0D11011110111140
0D11001110011110
0000000000000000
1110111101111001
1110111101111101
1110011101111101
0000000000000000
1441011110011110
1D44011110111110
1440011110114100
4400000000004000`],
   [ B, bitmap`
0111111011111011
011LLLLL66111011
011LLLLLL6611011
000LL660LL660000
101LL6610LL66101
101LL6610LL66101
101LL661LL661101
000LLLLLL6600000
011LLLLLLLL66011
011LL66011LL6611
011LL660111LL661
000LL660000LL660
101LL66101LL6601
101LLLLLLLLL6601
101LLLLLLLL66101
0000000000000000`],
   [ A, bitmap`
0111111L66111011
011111LLL6611011
011111LLL6611011
00000LL6LL660000
10111LL6LL661101
10111LL6LL661101
1011LL660LL66101
0000LL660LL66000
0111LLLLLLL66011
011LLLLLLLLL6611
011LL66011LL6611
000LL66000LL6600
10LL6611011LL661
10LL6611011LL661
10LL6611011LL661
0000000000000000`],
   [ N, bitmap`
0111111011111011
01LL6610111LL661
01LLLL66111LL661
00LLLL66000LL660
10LL6LL6611LL661
10LL6LL6611LL661
10LL66LL661LL661
00LL66LL660LL660
01LL661LL66LL661
01LL661LL66LL661
01LL6610LL6LL661
00LL6600LL6LL660
10LL66110LLLL661
10LL66110LLLL661
10LL6611011LL661
0000000000000000`],
   [ a, bitmap`
0111111L33111011
011111LLL3311011
011111LLL3311011
00000LL3LL330000
10111LL3LL331101
10111LL3LL331101
1011LL330LL33101
0000LL330LL33000
0111LLLLLLL33011
011LLLLLLLLL3311
011LL33011LL3311
000LL33000LL3300
10LL3311011LL331
10LL3311011LL331
10LL3311011LL331
0000000000000000`],
   [ m, bitmap`
0111111011111011
0LL331101111LL33
0LLLL33011LLLL33
0LLLL33000LLLL33
1LL3LL330LL3LL33
1LL3LL330LL3LL33
1LL33LL3LL33LL33
0LL33LL3LL33LL33
0LL331LLL331LL33
0LL331LLL331LL33
0LL331101111LL33
0LL330000000LL33
1LL331110111LL33
1LL331110111LL33
1LL331110111LL33
0000000000000000`],
   [ z, bitmap`
0111111011111011
0LLLLLLLLLLLLL33
0LLLLLLLLLLLLL33
00000000000LL330
10111111011LL331
101111110LL33101
101111110LL33101
0000000LL3300000
0111111LL3311011
01111LL331111011
01111LL331111011
000LL33000000000
101LL33101111101
1LLLLLLLLLLLLL33
1LLLLLLLLLLLLL33
0000000000000000`],
   [ e, bitmap`
0111111011111011
01LLLLLLLLLLL331
01LLLLLLLLLLL331
00LL330000000000
10LL331101111101
10LL331101111101
10LL331101111101
00LLLLLLLLLLL330
01LLLLLLLLLLL331
01LL331011111011
01LL331011111011
00LL330000000000
10LL331101111101
10LLLLLLLLLLL331
10LLLLLLLLLLL331
0000000000000000`],
   [ invisf, bitmap`
4110111101111400
44D0111101111401
144D111100141401
0400000000044400
04400111101DD440
0D11011110111140
0D11001110011110
0000000000000000
1110111101111001
1110111101111101
1110011101111101
0000000000000000
1441011110011110
1D44011110111110
1440011110114100
4400000000004000`]
  
   
);
let level = 0;
const levels = [
  map`
BANANA
wmfzew
wwwwww
wp.k.d
wwwwww
wwwwww`,
  map`
wwwwwwwdw
w.k.....w
wpwwww..w
wwwwwwwww`,
  map`
wwwwwwwww
d.......w
wwwwww..w
wp....kww
wwwww..ww
wwwwwwwww`,
  map`
wwwwwwww
wwww...w
www..wkw
ww..ww.w
ww.www.w
wp.....d
wwwwwwww`,
  map`
wwwwwwwww
wwwwww..w
ww......w
ww.kww..w
wp..ww..d
wwwwwwwww`,
  map`
wwwwwwwdw
wwww..w.w
w.....w.w
w.kw....w
wp.www..w
wwwwwwwww`,
  map`
wwwwdwwww
w.pw....w
w.ww....w
w.wwwwkww
w.......w
wwwwwwwww`,
  map`
wwwwwwwwwwwdw
wpwwww..w...w
w.w.....w...w
w.k..ww.ww.ww
ww.w.w..ww.ww
ww...w.....ww
wwwwwwwww..ww
wwwwwwwwwwwww`,
  map`
wwwwwwwwww
ww.......d
wp.wwwkwww
wwIII..www
wwwwwwwwww`,
  map`
wwwwwIIwwww
wIkI...w..w
wIwww..I..w
wIwwwwww..w
wpwwwwww..d
wwwwwwwwwww`,
  map`
wwwIIIwwwwI
w...wk....d
wIww...wwww
w....w.wIII
wp.wIwIwIwI
wwwwIIIwwww`,
  map`
IIwwwwwIIIw
Iw...I.wwII
Iw.ww.k.wwI
w....w...ww
w.wwIwIw.ww
wp..I.....d
Iwwwwwwwwww`,
  map`
wwwwwwwwwwww
w..w.....wIw
w.w..wwIwIIw
w.w..k..Iwww
wIwIwwI....d
wp....wwwwww
wwwwwwwwwwww`,
  map`
wwwwuuuwwwww
w....I.w...w
w.wwww.w.u.w
w.u....I...w
wIwwuwwwIwww
wp.....u.k.d
wwwwwwwwwwww`,
  map`
wwwwwwwwwwwwww
w.u...u.....kd
w.uuuuuuuuIuuw
w.I.I...u..u.w
w.u.uuuI..u..w
wu..u.u.uu...w
wu.I.I..u....w
wp.uuuuu.....w
wwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwww
w...u.I.u.u..w
w.uu..u.u..u.w
w.I..u.uuIuuuw
w.uu.Iuu.....d
wp..uIk......w
wwwwwwwwuIIwww`,
 
];

setMap(levels[0]);

setSolids([ player, wall, breakw, key, B, A, N, a, m, z, e, "u"]);

setPushables({
  [ player ]: [key]
});

onInput("s", () => {
  getFirst(player).y += 1
});

onInput("w", () => {
  getFirst(player).y -= 1
});

onInput("d", () => {
  getFirst(player).x += 1
});

onInput("a", () => {
  getFirst(player).x -= 1
});

onInput("j", () => {
  const currentlevel = levels[level];

    if (currentlevel !== undefined) {
    clearText("");
    setMap(currentlevel);
  }
});
//Spikes kill player and reset map
// afterInput(() => {
  //const targetspikey = tilesWith(spike).length;
  //  const numberplayer = tilesWith(spike, player).length;
  //const currentlevel = levels[level];
  // if (numberplayer === targetspikey) {
  // if (currentlevel !== undefined) {
   //  level = level;
  // setMap(levels[level]);
 // }
 // }
//});

afterInput(() => {
 const targetdoor = tilesWith(door).length;
  
  const numberKey = tilesWith(door, key).length;
  
  if (numberKey === targetdoor) {
    level = level + 1;
  
    const currentlevel = levels[level];
    
    if (currentlevel !== undefined) {
      setMap(currentlevel);
    } else {
    level = 0;
      setMap(levels[0]);
    }
  }
});

