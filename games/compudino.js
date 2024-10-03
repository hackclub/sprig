
/* 
@title: compudino
@author: rcyaon
@tags: []
@addedOn: 2023-12-08
*/

    /* Credit: Cookie Click! by briyandyju09 (https://sprig.hackclub.com/gallery/Cookie_Click!) */

const next ="d";
const player = "p";
const candy = "s";
const ball = "a";
const melody = tune`
500: G5-500,
500: G5-500,
500: B5~500,
500: A5^500,
14000`;
const levelup = tune`;
500: E5~500,
500: E5~500,
500: F5-500 + A5^500,
500: G5-500,
500: F5/500 + A5^500,
500: E5/500 + G5^500,
13000`
const evolved = "z";
const medicine = "i";

let play = 0;
let feed = 0;
let health = 0;

setLegend (
  [ player, bitmap`
....000000......
...00....000....
...0.......0....
..00.0..0..0....
000.........0...
0000........0...
.000......0.0...
00.....0.00.0...
00.00..000..0...
.0000...00..00..
....0.......000.
....0.........0.
....0.........0.
....0.000.0000..
....0.0.0.0.....
....000..00.....` ],
  [ candy, bitmap`
................
................
............3...
...........33...
...........33...
......999.33....
.....3993333333.
.3333399333333C.
333333399333CC..
.33.333993CC....
...33C399C......
..333.CCC.......
..33C...........
..CC............
................
................` ],
  [ ball, bitmap`
................
......000.......
....0020200.....
...002202220....
..00022022200...
.0002220220020..
.0200220220220..
.0220000002220..
.0222000002220..
.0222000002220..
.0222000002220..
.0020022200200..
.1002222220001..
..10222222001...
...100000001....
....11111111....` ],
  [ evolved, bitmap`
....000000......
...004DD4000....
...044444440....
..0040440440....
0004444444440...
0000444444440...
.0004444DD040...
00444440D0040...
00400440004D0...
.0000444004400..
....044444DD000.
....04444444DD0.
....04444444DD0.
....0D000D0000..
....0D0.0D0.....
....000..00.....` ],
  [ medicine, bitmap`
................
................
..........333...
.........3333C..
........33333C..
.......33333C...
......63333CC...
.....666333C....
...666663CC.....
..6666663C......
..66666FF.......
.66666FF........
.666FFF.........
..6FF...........
................
................`]
);

const levels = [
  map`
...
.p.
...`,
  map`
...
.p.
s.a`,
   map`
...
.z.
s.a`,
  map`
...
.z.
sia`,
]
setMap(levels[0])

addText("w to continue", {
  x: 3,
  y: 1,
  color: color`0`
}) 

 
onInput("w", () => {
  clearText()
  addText("play with a", {
    x: 3,
    y: 1,
    color: color`0`
  }) 
  onInput("w", () => {
    clearText()
    setMap(levels[1])
    addText("feed with s", {
    x: 3,
    y: 1,
    color: color`0`,
  }) 
    });
});

onInput("a", () => {
    clearText()
    playTune(melody)
/* play */
  play = play+1;
  addText("played: "+ play, { 
  x: 3,
  y: 1,
  color: color`7`
}) 
});

onInput("s", () => {
    playTune(melody)
  /* feed */
  feed = feed+1;
   addText("fullness: "+ feed, { 
  x: 3,
  y: 3,
  color: color`5`
}) 
});

/* evolve */


onInput("s", () => {
  if (feed = 3) {
    playTune(levelup)
  setMap(levels[2])
    clearText()
      addText("new features!", {
    x: 3,
    y: 1,
    color: color`0`
      })
          addText("press i", {
    x: 3,
    y: 3,
    color: color`0`
      })
    }
});

onInput("i", () => {
  playTune(levelup)
    clearText()
  setMap(levels[3])
  /* health */
  health = 1;
   addText("health: "+ health, { 
  x: 3,
  y: 3,
  color: color`5`
}) 
});


setPushables({
  [ player ]: []
})


afterInput(() => {
  
})
