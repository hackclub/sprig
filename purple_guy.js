/* Setting constants for sprites */
const player = "p"
const duck = "d"
const bg_street = "s"
const bg_op = "o"
const building = "b"
const bg_sky = "x"

/* Tune for background music */
const melody = tune`
500: F4/500 + B4/500,
500: D4~500,
500: D4~500 + F4^500,
500: D4~500,
500: E4^500,
500: E4^500,
500: D4~500,
500: D4~500 + F4^500,
500: D4~500,
500: E4^500,
500: E4^500,
500: D4~500,
500: D4~500 + F4^500,
500: D4~500,
500: D4/500,
500: D4/500,
500: D4~500 + F4~500,
500: D4~500 + F4~500 + G4^500 + E4^500,
500: D4~500 + F4~500,
500: E4^500 + G4^500,
500: E4^500 + G4^500,
500: F4~500 + D4~500,
500: F4~500 + D4~500 + G4^500 + E4^500,
500: F4~500 + D4~500,
500: G4^500 + E4^500,
500: G4^500 + E4^500,
500: D4~500 + F4~500,
500: D4~500 + F4~500 + G4^500 + E4^500,
500: D4~500 + F4~500,
500,
500: F4~500 + D4~500 + A4~500 + C5~500 + E5~500,
500`

playTune(melody, Infinity)

/* Assigning sprites */
setLegend(
  [player, bitmap`
................
......HHHHH.....
......H2H2H.....
......HHHHH.....
......HHHHH.....
....888HHH888...
....H88HHH888...
....HH8HHH8H8...
....HH88H88H8...
....HH88888HH...
....2.88888.....
......88.8H.....
......88.8H.....
......H8.8H.....
......HH.HH.....
................`],
  [duck, bitmap`
1111111111111111
1000000000000001
1020200LL0020201
1000000000000001
1000LLLLLLLL0001
1020L111111L0201
1000L111111L0001
10L0L111111L0L01
10L0L111111L0L01
1000L111111L0001
1020L111111L0201
1000LLLLLLLL0001
1000000000000001
1020200LL0020201
1000000000000001
1111111111111111`],
  [bg_street, bitmap`
7777777777777777
7777777777722277
7777777772222227
7222277772222222
2222222277112227
1222222277777777
7112221777777777
7777777777777777
7777777777777777
7777777777777777
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
1111111111111111
LLLLLLLLLLLLLLLL
L66LLL66LL66LL66
LLLLLLLLLLLLLLLL`],
  [bg_op, bitmap`
................
................
................
................
.............2..
.....00000...2..
....00LLL00.....
....0221220.....
....0321320.....
.00LLL111LLL00..
.0LLLLL1LLLLL0..
.0L000LLL000L0..
.0L0.00000.0L0..
.000.00.00.000..
.....11.11......
....000.000.....`],
  [building, bitmap`
22227772222277DD
22277777227777DD
2227L0LLLL0L77DD
77771L1717L1777C
77771L1515L17D7C
77771L1717L1DDDC
77771L1515L1DDDC
7L771L1717L1DDDC
11171L1515L17C7C
70771L1717L17C7C
CCCCCCCCCCCCDDDD
CCCCCCCCCCCCCCDD
4444444444444444
0000000000000000
0606060606060606
0000000000000000`],
  [bg_sky, bitmap`
7777777777777777
7777777777722277
7777777772222227
7222277772222222
2222222277112227
1222222277777777
7112221777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777772222277777
7777222222222777
7777122222222777
7777711122217777
7777777777777777`]
)

/* Set solid objects */
setSolids([player, bg_op, duck])

/* Setting maps */
let level = 0;

const levels = [
  map`
pxxxxxxx
xoxoxoxo
sdsdsdsd
dsdsdsds
sdsdsdsd
dsdsdsds
sssssssb`,

  map`
bsssssxss
ddddddxdd
ddxdssssd
dsxsddddd
ddxddddxd
dsdssssxd
dddddddxd
xsssssdxd
xdddddddd
sossssssp`,

  map`
ddddddddd
dpdsxsdod
ddddxdddd
dsssxsssd
ddddxdddd
dxxdxdxxd
dosdddsod
ddddxdddd
doodssxbd
ddddddsdd`,

  map`
ddddddddd
dddddddxd
dxsssssxd
dsdddddxd
ddsssbdxd
dxdddddxd
doooooddd
dddddddsp`,

  map`
dpddodxdd
dxddxdxbd
dxddxdxdd
dxddxdxsd
dxddxdddd
dxddxdxod
dxddddddd
dxdxxdxxd
dxdssdood
ddddddddd`,

  map`
posososox
ddddddddx
xsoxsxoss
xddsdxddd
sxsdxsoss
dxddxdddd
sssssssss
ddddddddd
sxsxxxxxx
dsdsssssb`,

  map`
sssssssss
ddddddddd
ddxxxxxdd
dxxxxoxxd
doxdbdxod
ddxdddxdd
ddddxdddd
dsssxsssd
ddddddddd
sssspssss`,
];

/* Set the background and load the first level */
setBackground(bg_sky)
setMap(levels[level])

/* Set pushable objects */
setPushables({
  [player]: [bg_op, duck]
})

/* Control player movement */
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})

/* Reset level */
onInput("j", () => {
  setMap(levels[level])
})

/* Text for reset button */
addText("Press J to reset", { x: 1, y: 1, color: color`8` })

/* Check for win condition */
afterInput(() => {
  if (tilesWith(player, building).length > 0) {
    if (level < levels.length - 1) {
      level++;
      setMap(levels[level]);
      addText("Level Complete!", { x: 2, y: 7, color: color`9` });
    } else {
      addText("GAME WON!!!!!!!!!!!!!!", { x: 2, y: 7, color: color`4` });
    }
  }
})
