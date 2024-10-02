
/* 
@title: Dragon-Rush
@author: Xhaiden, Aaron, and Brenden
@tags: []
@addedOn: 2023-07-18
*/

    /*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/
/*Remember to add the playground at the end where there is no green to prevent the win sound from coming too much.*/


const player = "p";
const brick = "b";
const grass = "g";
const flower = "f";
const stop = "r";
const key = "c";
const gate = "l";
const crate = "t";
const portalOne = "m"
const portalTwo = "n"
let keyCollect = false;

setLegend(
  [ player, bitmap`
................
................
................
................
.....6.DD.6.....
....44444444....
.....444444.....
.....404404.....
...4444114444...
..444444444444..
.....422224.....
.....422224.....
...44444444.....
................
................
................` ],
  [ brick, bitmap`
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
  [ flower, bitmap`
................
................
......8888......
.....888888.....
....88HHHH88....
...88HHHHHH88...
..88HH6666HH88..
..88HH6666HH88..
..88HH6666HH88..
..88HH6666HH88..
...88HHHHHH88...
....88HHHH88....
.....888888.....
......8888......
................
................`],
  [ grass, bitmap`
................
................
................
................
................
.....444444.....
.....444444.....
.....444444.....
.....444444.....
.....444444.....
.....444444.....
................
................
................
................
................`],
  [ stop, bitmap`
................
................
................
................
................
.....333333.....
.....333333.....
.....333333.....
.....333333.....
.....333333.....
.....333333.....
................
................
................
................
................`],
  [ key, bitmap`
................
................
................
................
................
................
...666..........
..6...6...6.6...
..6...6...6.6...
..6...6666666...
...666..........
................
................
................
................
................`],
  [ gate, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLL1LLL
LLLLLLLLLLLLL1LL
LLLLLLLLLLLLL1LL
LLLLLLLLLLLLL1LL
LLLLLLLLLLLL1LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ crate, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFF6666666666FF
FFFFF666666666FF
FF6FFF66666666FF
FF66FFF6666666FF
FF666FFF666666FF
FF6666FFF66666FF
FF66666FFF6666FF
FF666666FFF666FF
FF6666666FFF66FF
FF66666666FFF6FF
FF666666666FFFFF
FF6666666666FFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],
  [ portalOne, bitmap`
.................
....00000000.....
....0077777000...
..000777777770...
..0777777777770..
..0777777777700..
..0777777777700..
..0777777777770..
..0777777777770..
..0777777777770..
..0077777777770..
...077777777700..
....00077770000..
.....00000000....
.................`],
  [ portalTwo, bitmap`
.................
....00000000.....
..00009999000....
..009999999990...
..0999999999900..
..0999999999990..
..0999999999990..
..0999999999990..
..0099999999990..
..0099999999990..
..0999999999990..
...099999999000..
...0009999900....
.....00000000....
.................`],
);
setSolids([ player, brick, flower, gate, crate ]);

let level = 0;
const levels = [map`
p......
...f...
..bb...
.......
......g`, map`
......
.f..bb
bb.r..
p.....
......
...rbb
g.....`, map`
.....g
.f..bb
bb.r..
p.....
......
r..rbb
.....r`, map`
gp.l...
.bbbb..
.brrb.r
.b...f.
.b.b...
cb...rr`, map`
bbbrrrc.bg
bpb.f...b.
btb.....b.
b.rt..bbb.
b..t..b...
b.rt..l...
bbb...b...`,  map`
bbbbb...
.mplf...
bbbbb...
.t......
.rbbb...
nrgc.t.t
bbrrr.t.
bbrrrrbb`,map`
mbbbl.r.
.bpft.rg
.b.bc.r.
.b.b....
...b.b..
.b.rnbr.
rbbbbbr.
.r....r.
`, map`
bbbbbbbbbbbbbbb
bm............b
b.b.b.bbb.b.b.b
b.bbb.bfb.b.b.b
b..b..bbb.bbb.b
b......p......b
b.b.b.b.b.bbb.b
b.b.b.b.b.b.b.b
b.bbbbb.b.b.b.b
b............nb
brrrrrrrrrrrrrb
brgfgggggfgggrb
brgggfggfggggrb
brgfggggggfggrb
brgggggfggggfrb
brrrrrrrrrrrrrb
bbbbbbbbbbbbbbb`];

setMap(levels[level]);
keyCollect = false;
setPushables({
  [ player ]: [ flower, crate ],
});
const melody = tune`
250: D4^250 + D5-250,
250: E4^250 + E5-250,
250: C4^250 + C5-250,
250: F4^250 + F5-250,
250: E4^250 + E5-250,
250: D4^250 + D5-250,
500,
250: D4^250 + D5-250,
250: E4^250 + E5-250,
250: C4^250 + C5-250,
250: F4^250 + F5-250,
250: E4^250 + E5-250,
250: D4^250 + F5-250 + D5-250,
500,
250: D4^250 + D5-250,
250: E4^250 + E5-250,
250: C4^250 + C5-250 + E5-250,
250: F4^250 + F5-250,
250: E4^250 + E5-250 + C5-250,
250: D4^250 + F5-250 + D5-250,
500,
250: D4^250 + G5-250,
250: E4^250 + G5-250,
250: C4^250 + G5-250,
250: F4^250 + F5-250,
250: E4^250 + E5-250,
250: D4^250 + D5-250,
250: C5-250,
250`;

const playback = playTune(melody, Infinity);
addText("WASD to move", { 
  x: 7,
  y: 1,
  color: color`0`,
});
addText("Push the flower", { 
  x: 4,
  y: 2,
  color: color`0`,
});
addText("j to restart level", { 
  x: 1,
  y: 10,
  color: color`0`,
});
addText("green is good", { 
  x: 1,
  y: 12,
  color: color`0`,
});
addText("red is bad", { 
  x: 1,
  y: 13,
  color: color`0`,
});

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    keyCollect = false;
  }
});
onInput("i", () => {
  var ycoord = getFirst(player).y;
  var xcoord = getFirst(player).x;
  
  var coordinates = "(" + xcoord + ", " + ycoord + ") - Level " + (level + 1)
  addText(coordinates, { 
  x: 4,
  y: 1,
  color: color`3`
});
});

onInput("s", () => {
  getFirst(player).y += 1;
  clearText()
  if (getFirst(player).x === 2 && getFirst(player).y == 0 && level === 3 && keyCollect === true) {
    clearTile(3, 0);
  }
  if (getFirst(player).x === 5 && getFirst(player).y == 5 && level === 4 && keyCollect === true) {
    clearTile(6, 5);
    keyCollect = false;
  }

  if (getFirst(player).x === 4 && getFirst(player).y == 5 && level === 5) {
    getFirst(player).x = 0;
    getFirst(player).y = 1;
  }
    if (getFirst(player).x === 0 && getFirst(player).y == 4 && level === 5) {
    getFirst(player).y = 1;
    getFirst(player).x = 2;
  }
  if (getFirst(player).x === 1 && getFirst(player).y == 1 && level === 6) {
    getFirst(player).x = 0;
    getFirst(player).y = 4;
  }


});
onInput("w", () => {
  getFirst(player).y -= 1;
  clearText()
  if (getFirst(player).x === 2 && getFirst(player).y == 0 && level === 3 && keyCollect === true) {
    clearTile(3, 0);
  }
  if (getFirst(player).x === 5 && getFirst(player).y == 5 && level === 4 && keyCollect === true) {
    clearTile(6, 5);
    keyCollect = false;
  }
  if (getFirst(player).x === 0 && getFirst(player).y == 0 && level === 5) {
    getFirst(player).y = 5;
    getFirst(player).x = 4;
  }
  if (getFirst(player).x === 4 && getFirst(player).y == 4 && level === 6) {
    getFirst(player).x = 0;
    getFirst(player).y = 0;
  }
  if (getFirst(player).x === 2 && getFirst(player).y == 1 && level === 6 && keyCollect === true) {
    clearTile(3, 1);
    keyCollect = false;
  }
});
onInput("a", () => {
  getFirst(player).x -= 1;
  clearText()
  if (getFirst(player).x === 2 && getFirst(player).y == 0 && level === 3 && keyCollect === true) {
    clearTile(3, 0);
  }
  if (getFirst(player).x === 5 && getFirst(player).y == 5 && level === 4 && keyCollect === true) {
    clearTile(6, 5);
    keyCollect = false;
  }


  if (getFirst(player).x === 5 && getFirst(player).y == 0 && level === 6 && keyCollect === true) {
    clearTile(4, 0);
    keyCollect = false;
  }
});

onInput("d", () => {
  getFirst(player).x += 1;
  clearText()
  if (getFirst(player).x === 2 && getFirst(player).y == 0 && level === 3 && keyCollect === true) {
    clearTile(3, 0);
  }
  if (getFirst(player).x === 5 && getFirst(player).y == 5 && level === 4 && keyCollect === true) {
    clearTile(6, 5);
    keyCollect = false;
  }

  if (getFirst(player).x === 2 && getFirst(player).y == 1 && level === 5 && keyCollect === true) {
    clearTile(3, 1);
    keyCollect = false;
  }
  if (getFirst(player).x === 1 && getFirst(player).y == 5 && level === 7 && keyCollect === true) {
    clearTile(2, 5);
    keyCollect = false;
  }
});

afterInput(() => {
  
  const numberCoveredRed = tilesWith(stop, flower).length;

  const numberCoveredDragon = tilesWith(stop, player).length;

  if (numberCoveredRed === 1) {
    const currentLevel = levels[level];
    clearText("");
    setMap(currentLevel);
    const loss = tune`
150: G4/150,
150: F4/150,
150: E4/150,
150: D4/150,
150: C4/150,
150: B3/150,
150: C4/150,
150,
150: C3/150,
3450`;
    playTune(loss);
    keyCollect = false;
  }
  if (numberCoveredDragon === 1) {
    const currentLevel = levels[level];
    clearText("");
    setMap(currentLevel);
    const loss = tune`
150: G4/150,
150: F4/150,
150: E4/150,
150: D4/150,
150: C4/150,
150: B3/150,
150: C4/150,
150,
150: C3/150,
3450`;
    playTune(loss);
    keyCollect = false;
  }
  const targetNumber = tilesWith(grass).length; 
  
  const numberCovered = tilesWith(grass, flower).length;

  if (numberCovered === targetNumber && level <= 6) {
    level = level + 1;

    const currentLevel = levels[level];
    const win = tune`
150: C4/150,
150: D4/150,
150: E4/150,
150: D4/150,
150: E4/150,
150: F#4/150,
150: C4/150 + E4/150 + G4/150,
450,
150: C3/150,
3150`;
    playTune(win)
    if (currentLevel !== undefined) {
    setMap(currentLevel);
      keyCollect = false;
  } 
 else {
    addText("you win!", { y: 4, color: color`4` });
    }
  }
  const collectCheck = tilesWith(player, key).length;
  if (collectCheck === 1) {
    keyCollect = true;
    getFirst(key).remove();
  }
  if (getFirst(player).x == getFirst(portalOne).x && getFirst(player).y == getFirst(portalOne).y && level == 5) {
    getFirst(player).x = getFirst(portalTwo).x;
    getFirst(player).y = getFirst(portalTwo).y;
  }
  else if (getFirst(player).x == getFirst(portalTwo).x && getFirst(player).y == getFirst(portalTwo).y && level == 5) {
    getFirst(player).x = getFirst(portalOne).x;
    getFirst(player).y = getFirst(portalOne).y;
  }
  if (getFirst(player).x == getFirst(portalOne).x && getFirst(player).y == getFirst(portalOne).y && level == 6) {
    getFirst(player).y = getFirst(portalTwo).y - 1;
    getFirst(player).x = getFirst(portalTwo).x;
  }
  else if (getFirst(player).x == getFirst(portalTwo).x && getFirst(player).y == getFirst(portalTwo).y && level == 6) {
    getFirst(player).x = getFirst(portalOne).x;
    getFirst(player).y = getFirst(portalOne).y + 1;
  }
  if (getFirst(player).x == getFirst(portalOne).x && getFirst(player).y == getFirst(portalOne).y && level == 7) {
    getFirst(player).y = getFirst(portalTwo).y;
    getFirst(player).x = getFirst(portalTwo).x;
  }
  else if (getFirst(player).x == getFirst(portalTwo).x && getFirst(player).y == getFirst(portalTwo).y && level == 7) {
    getFirst(player).x = getFirst(portalOne).x;
    getFirst(player).y = getFirst(portalOne).y;
  }
});

