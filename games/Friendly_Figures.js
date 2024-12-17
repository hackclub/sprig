/*
@title: Friendly Figures
@author: Ali A. Saleh | January 2023
@tags: ['puzzle','multiplayer']
@addedOn: 2022-12-28


---

Thank you, 
- Hack Club for allowing me an opportunity to be creative with code through Sprig!
- Hack Club's Leo & Holly for inspiring me to make this Sprig game!
- DieselFalcon for inspirating me through your Apple Skedaddle Sprig Game!
- Sam Liu and Lucas Honda Tonini for helping ensure my game's compatibility with Hack Club's Sprig Console.

---

This program (work), created by Ali A. Saleh, is licensed under a Creative Commons 
Attribution-NonCommercial-ShareAlike 4.0 International License
(https://creativecommons.org/licenses/by-nc-sa/4.0/)

In simple terms, 
Please feel free to take inspiration, kindly credit me if you remix my game.

*/

const melody = tune`
416.6666666666667: c5~416.6666666666667,
416.6666666666667: g5~416.6666666666667,
416.6666666666667: e5~416.6666666666667,
416.6666666666667: e5~416.6666666666667,
416.6666666666667: c5~416.6666666666667,
416.6666666666667: e5~416.6666666666667,
416.6666666666667: f5~416.6666666666667,
416.6666666666667: f5~416.6666666666667,
416.6666666666667: b4~416.6666666666667,
416.6666666666667: f5~416.6666666666667,
416.6666666666667: d5~416.6666666666667,
416.6666666666667: d5~416.6666666666667,
416.6666666666667: b4~416.6666666666667,
416.6666666666667: c5~416.6666666666667,
416.6666666666667: d5~416.6666666666667,
416.6666666666667: e5~416.6666666666667,
416.6666666666667: c5~416.6666666666667,
416.6666666666667: g5~416.6666666666667,
416.6666666666667: e5~416.6666666666667,
416.6666666666667: e5~416.6666666666667,
416.6666666666667: c5~416.6666666666667,
416.6666666666667: e5~416.6666666666667,
416.6666666666667: f5~416.6666666666667,
416.6666666666667: f5~416.6666666666667,
416.6666666666667: d5~416.6666666666667,
416.6666666666667: d5~416.6666666666667,
416.6666666666667: e5~416.6666666666667,
416.6666666666667: f5~416.6666666666667,
416.6666666666667: d5~416.6666666666667,
416.6666666666667: b4~416.6666666666667,
416.6666666666667: d5~416.6666666666667,
416.6666666666667: c5~416.6666666666667`;
playTune(melody, Infinity);
const player = "p";
const player2 = "b";
const playerend = "q";
const player2end = "m";
const teleport = "g";
const teleport2 = "t";
const teleportend = "z";
const teleport2end = "x";
const wall = "w";
const background = "n";
const ffend = "y";
const end1 = "e";
const end2 = "f";

setLegend(
  [
    player,
    bitmap`
0000000000000000
0000000000000000
0000000000000000
0000033333300000
0000333333330000
0003333333333000
0003322332233000
0003323332333000
0003333333333000
0003323333233000
0003322222233000
0000333333330000
0000033333300000
0000000000000000
0000000000000000
0000000000000000`,
  ],
  [
    player2,
    bitmap`
0000000000000000
0000000000000000
0000000000000000
0007777777777000
0007777777777000
0007772772777000
0007772772777000
0007777777777000
0007777777777000
0007727777277000
0007722222277000
0007777777777000
0007777777777000
0000000000000000
0000000000000000
0000000000000000`,
  ],
  [
    ffend,
    bitmap`
0000000000000000
0003333300000000
0033333330000000
0332232233000000
0332332333000000
0333333333000000
0323333323000000
0322222223777777
0033333337777777
0003333377277277
0000000077277277
0000000077777777
0000000072777727
0000000072222227
0000000077777777
0000000000000000`,
  ],
  [
    playerend,
    bitmap`
0000000000000000
0000000000000000
0000000000000000
0000033333300000
0000333333330000
0003333333333000
0003322332233000
0003323332333000
0003333333333000
0003323333233000
0003322222233000
0000333333330000
0000033333300000
0000000000000000
0000000000000000
0000000000000000`,
  ],
  [
    player2end,
    bitmap`
0000000000000000
0000000000000000
0000000000000000
0007777777777000
0007777777777000
0007772772777000
0007772772777000
0007777777777000
0007777777777000
0007727777277000
0007722222277000
0007777777777000
0007777777777000
0000000000000000
0000000000000000
0000000000000000`,
  ],
  [
    teleport,
    bitmap`
0002222222222000
0002333333332000
0002322222232000
0002323333232000
0002323333232000
0002323333232000
0002323333232000
0002322222232000
0002333333332000
0002333333232000
0002333333232000
0002333333332000
0002333333332000
0002333333332000
0002333333332000
0002222222222000`,
  ],
  [
    teleport2,
    bitmap`
0002222222222000
0002777777772000
0002722222272000
0002727777272000
0002727777272000
0002727777272000
0002727777272000
0002722222272000
0002777777772000
0002777777272000
0002777777272000
0002777777772000
0002777777772000
0002777777772000
0002777777772000
0002222222222000`,
  ],
  [
    teleportend,
    bitmap`
0002222222222000
0002333333332000
0002322222232000
0002323333232000
0002323223232000
0002323233232000
0002323333232000
0002322222232000
0002333333332000
0002333333232000
0002333333232000
0002333333332000
0002333333332000
0002333333332000
0002333333332000
0002222222222000`,
  ],
  [
    teleport2end,
    bitmap`
0002222222222000
0002777777772000
0002722222272000
0002727777272000
0002727227272000
0002727227272000
0002727777272000
0002722222272000
0002777777772000
0002777777272000
0002777777272000
0002777777772000
0002777777772000
0002777777772000
0002777777772000
0002222222222000`,
  ],
  [
    wall,
    bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`,
  ],
  [
    background,
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
0000000000000000`,
  ],
  [
    end1,
    bitmap`
0000000000000000
0000000000000000
0222022232322202
0200323233323002
0223323332322302
0203323332323302
0203323332322202
0003333333333300
0222323222332302
0203333233332302
0223323233332302
0200323232232002
0200023222332222
0000000000000000
0000000000000000
0000000000000000`,
  ],
  [
    end2,
    bitmap`
0000000000000000
0000000000000000
2202200200202000
0202020200202000
0202727277222000
0202727277720000
0202277222720000
0007777777700000
0222722272220200
0202727772700200
0207722772220200
0207727777720000
0200022202220200
0000000000000000
0000000000000000
0000000000000000`,
  ]
);

setBackground(background);

let level = 0;
const levels = [
  map`
g..p
t..b`,
  map`
p..t
b..g`,
  map`
b..g
p..t`,
  map`
.wg
pt.
bw.`,
  map`
p.....
.w..w.
.wwww.
......
ww.ww.
t..wgb`,
  map`
wwww.g
..bw.w
.www.w
.w...w
...w.w
pwwwtw`,
  map`
wpwbwwwwwww
w.w.......w
w.www.www.w
w.www.wg..w
w.....www.w
wwwwwwwt..w
wwwwwwwwwww`,
  map`
wwpww.....
....w.www.
.w......w.
.w..ww....
www.ww.www
w.w..w...w
t.ww.www.w
w....w...w
w.wwww.www
.....wg..b`,
  map`
pwww
...w
wtww
wg.b`,
  map`
wwwwwwwwwwwww
wp.w...w..bww
ww.w.www.wwww
w..w.....w..w
w.ww.w...w..w
w....wwwww..w
wwww........w
w....www.ww.w
w.tw.....wg.w
wwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwww
wgw.....w.......tw
w.wwwww.w.wwwwwwww
wb..............pw
wwwwwwwwwwwwwwwwww`,
  map`
........www.......
wwwwwww.....www.w.
.w....w.w.www...w.
.w.ww...w......ww.
...w..www.wwww.w..
wwww.wwgw.bwww.ww.
p....w..w.ww....w.
www.ww.wwww..ww.ww
....ww.......ww..t`,
  map`
....gww
..www..
w......
wwwwww.
.....w.
.ww.ww.
.ww.tw.
..pwww.
wwb....`,
  map`
w.w....wwww
w.w.ww.w.w.
w.w.gw..w.w
w.w..bw....
w.wwww..w.w
....w..w...
.www..w..w.
.....ww.ww.
pwww.w..w.t`,
  map`
www...wg......ww...wb
p.w.w.wwwwwww..w.w...
w...w.w......w...www.
wwwww.w.wwww..w....w.
......w.....w...ww.w.
.wwwwwwwwww.wwwwww..w
..w...w...w.w.......w
w...w...w.w.w.w..w.w.
wwwwwwwwt......ww....`,
  map`
g..p
wwww
b..t`,
  map`
p..g
wwww
t..b`,
  map`
gwb
.w.
.w.
pwt`,
  map`
pwt
.w.
.w.
gwb`,
  map`
wwwwwwwwwwwwwwwwwwwwww
w.ww.w...gw...tw.ww.pw
w.ww.w.ww.w.wwww.w..ww
w.ww.w.ww.w.wwww...www
w.........w.wwww.w.www
w.ww.w.ww.w.wwww.w..ww
w.ww.w.wwbw....w.ww..w
w.wwwwwwwwwww.wwwwww.w
w.wwwwwwwwwww.wwwwww.w
w....................w
wwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwww.........www....w
wwwwww..wwwwwww..ww.ww..
w..bgw.wwwwww.ww.w...ww.
w.wwww.wwww...ww.w.ww.w.
w.wwww.wwww.w.ww.w.ww.w.
w.wwww.wwww.w.ww.w...ww.
w.wwww.wwww.w.ww.w.wwpw.
w.wwww.wwww.w.ww.w.ww...
w....w....w.w....w..tww.
www.wwwww.w.wwwwwwwwwww.
www.......w.............`,
  map`
wwwwwwwwwwwwwwwwwwwwww
w..gw........w.w...pww
w.www.w.w.ww.www.wwwww
w...w.b.w.wwww...wwwww
www.w.www.wwww.w.ww.tw
w...w.www.wwww.w.ww.ww
w.....www......w....ww
wwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwww
www......ww..........wwwwww
www.wwww.ww.wwwwwwww.wwwwww
w....w.w.w.....wwww.....www
w.ww.w...www.wwwwww.www.www
w.ww.w.wwwww.wwwwww.www.www
w....w.wwwww.wwwwww..g..www
w.ww.w.wwwww.wwwwww.www.www
w.ww.w.wwwww.wwwwww.www.www
w.ww.w.wwwww.wwwwww.www.www
wpwwtw...w.....wwwwbwww.w.w
wwwwwwww.wwww.wwwwwwwww.www
wwwwwwww......wwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
ww...pwwww......wwwwwwwwwwwwww
ww.wwwwwww.wwww.wwwwwwwwwwwwww
ww.wwww.....w.w.ww...bwgww.www
ww....w.www.w...ww.wwww.ww.www
wwwww.w.www.w.wwww...ww......w
wwwww.w..t..w.wwww.wwww.ww.w.w
w.....w.www.w....w....w.ww.w.w
w.wwwww.www.ww.wwww.w.wwwwww.w
w.......www..w......w........w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w..pw...w.w...w.ww.w..ww.wwgwbw
w.www.wtwww.www.ww.w.w.w.ww.w.w
w..ww.www.w..ww..w.w.w.w.ww...w
w.www.www.w.www.w..w.w.w.www.ww
w.www.www.w...w.ww.w..ww...w.ww
w.............................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w..bw.w...ww.ww.w....w...w..tw
w.wwwww.wwww.ww.w.wwpw.www.www
w.gww.w.wwww.ww.w.wwww..ww...w
w.www.w.w..w.ww.w.wwww.wwwww.w
w.www.w...ww....w.wwww...w...w
w............................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w...w.w.w...w...w.ww.w...ww...w....w....w
ww.ww.w.w.w.w.w.w.w..w.wwww.www.ww.w.ww.w
ww.ww...w...w.w.w...ww.wwww.www.ww.w....w
ww.ww.w.w.w.w.w.w.w.wwww.ww...w.ww.w.w.ww
ww.ww.w.w.w.w.w.w.w..www.ww.www.ww.w.w..w
ww.ww.w.w.w.w.w.w.ww.w...ww.www....w.ww.w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
ww....w.www....w.w.w.w....w...wwwyzwwefww
ww.ww.w.www.ww.w.w.www.ww.w.wwwwwxwwwqmww
ww....w.www....w...w.w.ww.w.wwwwwwwwwwwww
ww.wwww.www.ww.ww.ww.w.ww.w.w..wpwwwwwwbw
ww.wwww...w.ww.ww.ww.w.ww.w...ww...gt...w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
ef`,
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([
  player,
  player2,
  wall,
  ffend,
  playerend,
  player2end,
  teleportend,
  teleport2end,
]);

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("k", () => {
  getFirst(player2).y += 1;
});

onInput("l", () => {
  getFirst(player2).x += 1;
});

onInput("j", () => {
  getFirst(player2).x -= 1;
});

onInput("i", () => {
  getFirst(player2).y -= 1;
});

afterInput(() => {
  const targetNumber = tilesWith(teleport).length + tilesWith(teleport2).length;
  const numberCovered =
    tilesWith(teleport, player).length + tilesWith(teleport2, player2).length;

  if (numberCovered === targetNumber) {
    level = level + 1;
    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    }
  }
});
