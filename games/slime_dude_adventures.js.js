/*
@title: slime dude adventures
@author: koa d
@tags: ['puzzle, maze']
@addedOn: 2025-04-10


*/
const theme = tune`
223.88059701492537: F4~223.88059701492537 + B4^223.88059701492537 + C4~223.88059701492537,
223.88059701492537: G4~223.88059701492537 + A4^223.88059701492537,
223.88059701492537: F5~223.88059701492537 + B4^223.88059701492537 + C4~223.88059701492537,
223.88059701492537: F4~223.88059701492537 + C5^223.88059701492537,
223.88059701492537: G4~223.88059701492537 + B4^223.88059701492537 + C4~223.88059701492537,
223.88059701492537: F4~223.88059701492537 + A4^223.88059701492537,
223.88059701492537: D4~223.88059701492537 + B4^223.88059701492537 + C4~223.88059701492537,
223.88059701492537: E4~223.88059701492537 + C5^223.88059701492537,
223.88059701492537: F4~223.88059701492537 + B4^223.88059701492537 + C4~223.88059701492537,
223.88059701492537: G4~223.88059701492537 + A4^223.88059701492537,
223.88059701492537: E5~223.88059701492537 + B4^223.88059701492537 + C4~223.88059701492537,
223.88059701492537: F4~223.88059701492537 + C5^223.88059701492537,
223.88059701492537: G4~223.88059701492537 + C4~223.88059701492537,
223.88059701492537: F4~223.88059701492537,
223.88059701492537: C4~223.88059701492537,
223.88059701492537: D4~223.88059701492537,
223.88059701492537: F4~223.88059701492537 + A4^223.88059701492537 + C4~223.88059701492537,
223.88059701492537: G4~223.88059701492537 + B4^223.88059701492537,
223.88059701492537: F5~223.88059701492537 + A4^223.88059701492537,
223.88059701492537: F4~223.88059701492537 + B4^223.88059701492537,
223.88059701492537: G4~223.88059701492537 + C5^223.88059701492537,
223.88059701492537: F4~223.88059701492537,
223.88059701492537: D4~223.88059701492537,
223.88059701492537: E4~223.88059701492537,
223.88059701492537: F4~223.88059701492537 + A4^223.88059701492537 + C4~223.88059701492537,
223.88059701492537: G4~223.88059701492537 + B4^223.88059701492537,
223.88059701492537: E5~223.88059701492537 + A4^223.88059701492537 + C4~223.88059701492537,
223.88059701492537: F4~223.88059701492537 + B4^223.88059701492537,
223.88059701492537: G4~223.88059701492537 + C5^223.88059701492537,
223.88059701492537: F4~223.88059701492537,
223.88059701492537: C4~223.88059701492537,
223.88059701492537: D4~223.88059701492537`
const player = "p";
const box = "b";
const box2 = "c";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
................
................
................
........DD......
......DD44D.....
.....D44444D....
.....D4D4D4D....
.....D44444D....
......DDDDD.....
.......D.D......
.......D.D......
......DD.DD.....
................
................
................
................`],
  [ box, bitmap`
CCCCCCCCCCCCCCCC
CCCFFFFFFFFFFCCC
CCCCFFFFFFFFCCCC
CFCCCFFFFFFCCCFC
CFFCCCFFFFCCCFFC
CFFFCCCFFCCCFFFC
CFFFFCCCCCCFFFFC
CFFFFFCCCCFFFFFC
CFFFFFCCCCFFFFFC
CFFFFCCCCCCFFFFC
CFFFCCCFFCCCFFFC
CFFCCCFFFFCCCFFC
CFCCCFFFFFFCCCFC
CCCCFFFFFFFFCCCC
CCCFFFFFFFFFFCCC
CCCCCCCCCCCCCCCC`],
  [ box2, bitmap`
CCCCCCCCCCCCCCCC
CFFFFFCCCCFFFFFC
CFFFFCFCCFCFFFFC
CFFFCFFCCFFCFFFC
CFFCFFFCCFFFCFFC
CFCFFFFCCFFFFCFC
CCFFFFFCCFFFFFCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCFFFFFCCFFFFFCC
CFCFFFFCCFFFFCFC
CFFCFFFCCFFFCFFC
CFFFCFFCCFFCFFFC
CFFFFCFCCFCFFFFC
CFFFFFCCCCFFFFFC
CCCCCCCCCCCCCCCC`],
  [ goal, bitmap`
.....777777.....
....75555557....
...755HHHH557...
..755H5555H557..
.755H55HH55H557.
.75H55H55H55H57.
.75H5H5555H5H57.
.75H5H55H5H5H57.
.75H5H55H5H5H57.
.75H5H5H55H5H57.
.75H55H55H55H57.
.755H555H55H557.
..755HHH55H557..
...755555H557...
....755HH557....
.....777777.....`],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
1L1111L1111L1111
1L1111L1111L1111
LLLLLLLLLLLLLLLL
1111L1111L1111L1
1111L1111L1111L1
LLLLLLLLLLLLLLLL
1L1111L1111L1111
1L1111L1111L1111
LLLLLLLLLLLLLLLL
1111L1111L1111L1
1111L1111L1111L1
LLLLLLLLLLLLLLLL
1L1111L1111L1111
1L1111L1111L1111
LLLLLLLLLLLLLLLL`]
);

let level = 0;
const levels = [
  map`
pw...
.w.w.
...wg`,
  map`
pw.w.w....
.w.b...ww.
.w.w.w.w..
b..w.w.w.w
.www.w.w..
.www...wwg`,
  map`
.gwwwwb
.w...b.
.w.ww.w
.w.pw.w
..www.w
w....bw
bwwww.b`,
  map`
ppppppppp
ppppppppp
ppppppppp
ppppppppp
ppppppppp
ppppppppp
ppppppppp
ppppppppp
ppppppppp`,
  map`
p.......
wwwwwww.
...w....
.w.w.www
.w...w..
..www...
w.....w.
.wwwww..
.....w.w
.www.w..
...w..w.
ww.gw...`,
  map`
pw....w.......
.w..www.wwwww.
.wbw....w.....
.....w..b.wwww
wwwww...ww....
....c...wg.ww.
ww.w.wwwwww...
...w.ww...w.ww
.www..w.w.w...
....w.w.w.www.
www.w.w.w.....
....w...w.wwww`,
  map`
p............b...................................................g.`,
  map`
p.b..www
wbw...ww
..wb.www
...c..ww
www.wwww
w.b.w..g
ww..c...`,
  map`
p....
wwww.
.....
.wwww
.....
wwww.
.....
.wwww
....g`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
ww............b..........c...........................................g..
ww.wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
w......................................................b..............ww
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww.ww
wp.........................b...........................................w
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
p`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, box2, wall ]);

setPushables({
  [player]: [box],
  [box]: [box2]
});
const playback = playTune(theme, Infinity)
onInput("w", () => {
    getFirst(player).y -= 1;
});

onInput("a", () => {
    getFirst(player).x -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("j", () => {
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, player).length;

  if (numberCovered === targetNumber) {

    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 1, color: color`D` });
    }
  }
});
