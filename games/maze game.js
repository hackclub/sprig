/*
@title: ducky maze game
@author: kayla wong
@tags: []
@addedOn: 2024-07-22
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p"
const block = "b"
const lilypad = "l"
const food = "f"
const s = "s"
const t = "t"
const a = "a"
const r = "r"
const avoider = "k"
const avoider2 = "w"
const avoider3 = "n"
const avoider4 = "v"
const teleport1 = "u"
const teleport2 = "o"
const backgroundMusic = tune`
260.8695652173913,
260.8695652173913: B4~260.8695652173913 + G4-260.8695652173913,
260.8695652173913,
260.8695652173913: B4-260.8695652173913,
260.8695652173913: D5-260.8695652173913,
260.8695652173913: C5-260.8695652173913 + A4^260.8695652173913,
260.8695652173913: B4-260.8695652173913,
260.8695652173913: A4-260.8695652173913,
260.8695652173913: B4-260.8695652173913 + G4~260.8695652173913,
260.8695652173913: D5~260.8695652173913 + B4~260.8695652173913 + G4~260.8695652173913,
260.8695652173913,
260.8695652173913: D5~260.8695652173913 + B4~260.8695652173913 + G4~260.8695652173913,
260.8695652173913,
260.8695652173913: D5~260.8695652173913 + B4~260.8695652173913 + G4~260.8695652173913,
260.8695652173913,
260.8695652173913: D5-260.8695652173913,
260.8695652173913: C5-260.8695652173913,
260.8695652173913: B4-260.8695652173913,
260.8695652173913: C5-260.8695652173913,
260.8695652173913: B4-260.8695652173913,
260.8695652173913: A4-260.8695652173913,
260.8695652173913: A4-260.8695652173913,
260.8695652173913: A4^260.8695652173913 + C5-260.8695652173913,
260.8695652173913: B4-260.8695652173913,
260.8695652173913: A4-260.8695652173913,
260.8695652173913: G4-260.8695652173913,
260.8695652173913: G4-260.8695652173913,
260.8695652173913: G4-260.8695652173913,
1043.4782608695652`
const avoiderSound = tune`
500: G4~500,
15500`
const youWinMusic = tune`
131.00436681222706,
131.00436681222706: G4-131.00436681222706,
131.00436681222706: B4-131.00436681222706,
131.00436681222706: D5-131.00436681222706,
131.00436681222706,
131.00436681222706: E5~131.00436681222706 + C5~131.00436681222706 + A4~131.00436681222706,
131.00436681222706: A4~131.00436681222706 + E5~131.00436681222706 + C5~131.00436681222706,
131.00436681222706: A4~131.00436681222706 + E5~131.00436681222706 + C5~131.00436681222706,
131.00436681222706: D5~131.00436681222706 + B4~131.00436681222706 + G4~131.00436681222706,
131.00436681222706: D5~131.00436681222706 + B4~131.00436681222706 + G4~131.00436681222706,
131.00436681222706: D5~131.00436681222706 + B4~131.00436681222706 + G4~131.00436681222706,
2751.0917030567684`
const teleportSound = tune`
500: G5~500 + E5~500 + C5~500 + A4~500 + F4~500,
15500`

setLegend(
  [player, bitmap`
........6666666.
.......666666666
.......666666666
.......660666606
.......660699999
.......666699999
66......66666666
666666666666666.
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
.666666666666666
..6666666666666.
....99999999....`],
  [block, bitmap`
DDDDDDDD4DD4444D
D444444444444444
D42224444444444D
D42444444444444D
D4D44444444444DD
D4244444444244DD
D44444444244424D
D44444444444424D
D4444442444D424D
444444444D44424D
D44442444444424D
D4444444D44D4D4D
4444444444444D4D
444444DD22222D4D
4444DD444444444D
D4DDDDDDDDDDDDDD`],
  [lilypad, bitmap`
...DD....DD.....
..DDD....DDDD...
..DDDD..DDDDDDD.
.DD2DD..DDDDDDDD
.D22DDD.DDDDDDDD
DD2DDDDDDDDDDDD4
DD2DDDDDDDDDDDD4
DD2DDDDDDDDDDDD4
DDDDDDDDDDDDDDD4
DD2DDDDDDDDDDDD4
DDDDDDDDDDDDDDD4
DDDDDDDDDDDDDD44
.DDDDDDDDDDDDD4.
.DDDDDDDDDDDD44.
...DDDDDDDD444..
.....DDDDDD4....`],
  [food, bitmap`
5555555555555555
5555555555555555
7777777777777777
7777777777777777
7777779666777777
7799979666777766
7666999996667966
7666966696667999
7777766697777777
7777777777777777
7227222722272277
7277272727272727
7227272727272727
7277222722272277
5555555555555555
5555555555555555`],
  [s, bitmap`
...DDDDDDDDDD...
..DDDDDDDDDDD...
..DDD.......D...
..DD............
..DD............
..DDD...........
..DDDDDDDDDD....
...DDDDDDDDDD...
..........DDD...
...........DD...
...........DD...
...........DD...
...........DD...
...D......DDD...
...DDDDDDDDDD...
...DDDDDDDDD....`],
  [a, bitmap`
....DDDDDDD.....
...DDDDDDDDD....
...DDD...DDD....
...DD.....DD....
...DD.....DD....
...DD.....DD....
...DD.....DD....
...DDDDDDDDD....
...DDDDDDDDD....
...DD.....DD....
...DD.....DD....
...DD.....DD....
...DD.....DD....
...DD.....DD....
...DD.....DD....
...DD.....DD....`],
  [t, bitmap`
......DD........
......DD........
......DD........
......DD........
..D...DD....D...
..DDDDDDDDDDD...
..DDDDDDDDDDD...
..D...DD....D...
..D...DD....D...
......DD........
......DD........
......DD........
......DD........
......DD...D....
......DDDDDD....
......DDDDDD....`],
  [r, bitmap`
...DDDDDDDD.....
...DDDDDDDDD....
...DD....DDD....
...DD.....DD....
...DD.....DD....
...DD....DDD....
...DD...DDDD....
...DDDDDDDD.....
...DDDDDDD......
...DDDDD........
...DDDDDD.......
...DD..DDDD.....
...DD....DDD....
...DD.....DDDD..
...DD.......DDD.
...DD........DD.`],
  [avoider, bitmap`
.......4D.......
.......4D.......
......44D.......
......44D.......
......D4DD......
.....4244D......
.....4444DD.....
....444444D.....
...44244D4DD....
...44444444D....
..444D42444DD...
..444444444DD...
.4444444444DDD..
.4444444444DDDD.
4444444444DDDDD.
DDDDDDDDDDDDDDDD`],
  [avoider2, bitmap`
D444444444444444
DD4444444444D44.
.D4424442444444.
.DD444444444444.
..D4444444D444..
..DD444D444444..
...D424444444...
...D44444444D...
...D444444DD4...
...DD444444D....
....DD4444DD....
.....D4444D.....
.....DD44DD.....
......DD4D......
.......DD.......
.......DD.......`],
  [avoider3, bitmap`
D4..............
D444............
D44444..........
D4D44444........
D444444444......
D44444444444....
D444D24444444...
D24444444442444.
D444444444444444
D4444444D444444D
D44444D444442DDD
D4444D44444DDD..
D4444444DDDD....
D4DDDDDDDD......
DDDDDD..........
DD..............`],
  [avoider4, bitmap`
..............4D
............444D
..........44444D
........44444D4D
......444444444D
....44424444444D
...4444444DD444D
.44424444444442D
444444444444444D
DDDDD44D4444444D
...2D4444D44444D
....DDDDD4D4444D
.......DDDDDD44D
..........DDDD4D
.............DDD
...............D`],
  [teleport1, bitmap`
....66666666....
...6666666666...
..666999999666..
.66996666669966.
6669699999969666
6696996666996966
6696969999696966
6696969669696966
6696969669696966
6696969999696966
6696996666996966
6669699999969666
.66996666669966.
..666999999666..
...6666666666...
....66666666....`],
  [teleport2, bitmap`
....77777777....
...7777777777...
..777555555777..
.77557777775577.
7775755555575777
7757557777557577
7757575555757577
7757575775757577
7757575775757577
7757575555757577
7757557777557577
7775755555575777
.77557777775577.
..777555555777..
...7777777777...
....77777777....`]
);

setSolids([player, block, lilypad, s, t, a, r])

let level = 0;
const levels = [
  map`
bbbbbbbbbb
b........b
b........b
b.lstart.b
b........b
b........b
bp......fb
bbbbbbbbbb`,
  map`
bb.bbb..bbb
bb.bbbb....
.....bbb.b.
bb.b...w.b.
...b.k...bf
.bbbbbbbbbb
....w...w..
......k...p`,
  map`
pbbb...bf..
.b.bbb.bbb.
.b.....b...
.bbb.bbb.bb
.b...bbb.o.
.b.b.bbbbb.
.b.b..bbbb.
..ubb......`,
  map`
pllllllll...
llllllllllll
llllllllllll
llllllllll..
lll.llllll..
lll.llllll..
lll.l.l.l..u
bbbbbbbbbbbb
...w...w...w
fk...k...k.o`,
  map`
.....w...w...w.
...k...k...k...
n.bbbbbbbbbbb.v
..b..k.w....b..
.vb.bbbbbbn.bn.
..bo....fb..b..
n.bbbbbbbb.vb.v
...w...w....b..
.....k...k.ubn.
bbbbbbbbbbbbb..
....w...w...w..
p.k...k...k...k`,
  map`
bbpbf.bbbbbb...
bb.b.ob....b.b.
bb.bbbbbbb.b.b.
bbl...w......b.
bbl.k...k....b.
bblbbbbbbbb.bb.
bb.w.w.b....bw.
.u....bbbbbbb..
bbbb.b.w...w...
w..w.b...k...k.
.....b..bbbbbbb
.k.k...........`
];

const playback = playTune(backgroundMusic, Infinity);

let currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [player]: [lilypad],
  [lilypad]: [lilypad]
});

onInput("w", () => {
  getFirst(player).y -= 1
});
onInput("a", () => {
  getFirst(player).x -= 1
});
onInput("s", () => {
  getFirst(player).y += 1
});
onInput("d", () => {
  getFirst(player).x += 1
});

onInput("j", () => {
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  const goalCount = tilesWith(food).length;
  const actualCount = tilesWith(food, player).length;
  if (goalCount === actualCount) {
    level += 1
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 12, color: color`5` });
      playback.end();
      playTune(youWinMusic);
    }
  }
  const avoiderWithPlayer = tilesWith(avoider, player).length;
  const avoider2WithPlayer = tilesWith(avoider2, player).length;
  const avoider3WithPlayer = tilesWith(avoider3, player).length;
  const avoider4WithPlayer = tilesWith(avoider4, player).length;
  if (avoiderWithPlayer >= 1) {
    const currentLevel = levels[level];
    setMap(currentLevel);
    playTune(avoiderSound);
  }
  if (avoider2WithPlayer >= 1) {
    const currentLevel = levels[level];
    setMap(currentLevel);
    playTune(avoiderSound);
  }
  if (avoider3WithPlayer >= 1) {
    const currentLevel = levels[level];
    setMap(currentLevel);
    playTune(avoiderSound);
  }
  if (avoider4WithPlayer >= 1) {
    const currentLevel = levels[level];
    setMap(currentLevel);
    playTune(avoiderSound);
  }
  const teleportEnter = tilesWith(teleport1, player).length;
  if (teleportEnter == 1) {
    playTune(teleportSound);
    getFirst(player).x = getFirst(teleport2).x;
    getFirst(player).y = getFirst(teleport2).y;
  }
});
