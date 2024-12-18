/*
@title: Saving Blob
@author: ARTISM30
@tags: []
@addedOn: 2024-11-12
*/

// define the sprites in our game
const player = "p";
const blob = "b";
const portal = "g";
const wall = "w";
const fake = "f";
const copy = "c";

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
................
................
...100....001...
......0..0......
....00000000....
....0......0....
....044..440....
....08....80....
....0.L..L.0....
....0..LL..0....
....00000000....
......0...0.....
....000...000...
................
................
................`],
  [ blob, bitmap`
................
................
................
...88888888888..
...88888888888..
...88222822288..
...882FF8FF288..
...882FF8FF288..
...88888888888..
...88888888888..
...888H888H888..
...8888HHH8888..
...88888888888..
...88888888888..
................
................`],
  [ portal, bitmap`
..333333333333..
.39999999999993.
3966666666666693
9644444444444469
6455555555555546
45HHHHHHHHHHHH54
5H222222222222H5
H22222222222222H
H22222222222222H
5H222222222222H5
45HHHHHHHHHHHH54
6455555555555546
9644444444444469
3966666666666693
.39999999999993.
..333333333333..`],
  [ wall, bitmap`
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
  [ fake, bitmap`
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
L00000000000000L`],
  [ copy, bitmap`
..333333333333..
.39999999999993.
3966666666666693
9644444444444469
6455555555555546
45HHHHHHHHHHHH54
5H222222222222H5
H22222222222222H
H22222222222222H
5H222222222222H5
45HHHHHHHHHHHH54
6455555555555546
9644444444444469
3966666666666693
.39999999999993.
..333333333333..`],
);
// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
.....w...
.....wg..
p..b.ww..
...ww....
...w.....
.........
.........`,
  map`
...ww....g
..bw...www
p......wg.
......ww..
...b.ww...
..........
..........`,
  map`
p..w...
.b.w...
...f.g.
wwww...
.......
.......`,
  map`
.......
fwwww..
p...w..
....fb.
....w..
g...w..`,
  map`
pw.....
fw...f.
....wgw
.w...w.
fbf....
.w.....`,
  map`
..f....
..fb...
wfwwfww
.pw....
..w....
.wwfw..
ww.g.w.`,
  map`
........wwwwwwww
........fffffffw
ffwwww..wwwffffg
..pw.f........w.
.b.f.w........w.
...f.w........w.`,
  map`
.......
pb.....
..w...f
..f.w.f
...wgf.
..f.w.w
..f...w`,
  map`
..wwffwwwwww
..ffffwwwwww
p.wwwfwwwffg
..wwffwwwffw
.bwwfffffffw
..wwwwwwwffw`,
  map`
p..f.w...
.bbw.w...
...f.fw..
wfww.ffwg
.....fw..
.....w...
fw...f...
gw...w...`,
  map`
...wf..
.p.w.w.
.bww.w.
ffw.fwf
...ff.f
wf.w.wf
.fww.w.
.fw...g`,
  map`
..ffffwwwwgfffffw
.pwfbfffffffffffw
..wwwwgwwwwffffww
.bffwwfwffffbwwff
..fffffwfwwffffff
..wfbffffgwwwwwwg`,
  map`
wwwwwwwww
w.p.p...w
wp.p..p.w
wpp..p..w
w.p.p...w
w.......w
wwwwwwwww`
];
 
// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, blob, wall ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [blob],
  [blob]: [blob]
});

// inputs for player movement control  
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});

  onInput("w", () => {
  getFirst(player).y -= 1;
});
 
onInput("a", () => {
  getFirst(player).x -= 1;

});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// these get run after every input
afterInput(() => {
  // count the number of tiles with portals
  const targetNumber = tilesWith(portal).length;
 
  // count the number of tiles with portals and blobs
  const numberCovered = tilesWith(portal, blob).length;

  // if the number of portals is the same as the number of portals covered
  // all portals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("Blob has made it back home!", { y: 4, color: color`3` });
    }
  }
});
