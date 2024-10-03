/*
@title: Worldcraft
@author: adadyer
@tags: ['adventure']
@addedOn: 2022-12-09

Instructions:
Explore the world using the portals, gather supplies, and build structures.
WASD to move
L to pick up (in front)
J to set down (behind)

Basically a peaceful 2d minecraft knockoff.
*/

// INCLUDE
var px = 1;
var py = 1;
var mapNat = [];
// LIB
function getMapV2(){
  var map = [];
  for(var i = 0; i < height(); i++){
    map.push([]);
    for(var j = 0; j < width(); j++){
      map[i].push([]);
      var tile = getTile(j, i);
      for(var k = 0; k < tile.length; k++){
        map[i][j].push(tile[k].type);
      }
    }
  }
  return map;
}
function setMapV2(map){
  var tempMap = "";
  for(var i = 0; i < map.length; i++){
    for(var j = 0; j < map[i].length; j++){
      tempMap += ".";
    }
    tempMap += "\n";
  }
  setMap(tempMap);
  for(var i = 0; i < map.length; i++){
    for(var j = 0; j < map[i].length; j++){
      for(var k = 0; k < map[i][j].length; k++){
        addSprite(j, i, map[i][j][k]);
      }
    }
  }
}
function trimMapV2(x, y, w, h, map){
  var map2 = [];
  var mapWidth = map[0].length;
  var mapHeight = map.length;
  x = Math.max(Math.min(mapWidth-w, x), 0);
  y = Math.max(Math.min(mapHeight-h, y), 0);
  for(var i = 0; i < h; i++){
    map2.push([]);
    for(var j = 0; j < w; j++){
      map2[i].push([]);
      for(var k = 0; k < map[i+y][j+x].length; k++){
        map2[i][j].push(map[i+y][j+x][k]);
      }
    }
  }
  return map2;
}

// sprites

const bloxxer = "b";
const stone = "s";
const tree = "t";
const plank = "p";
const grass = "g";
const water = "w";
const portal = "x";
const torch = "f";
const coal = "c";
const cow = "o";
const darkstone = "d";
const pear = "a";
const meat = "m";

setLegend(
  [ bloxxer, bitmap`
................
................
..333333333333..
..333333333333..
.33333333333333.
.33302333302333.
.33300333300333.
.33333333333333.
.33333333333333.
.33333333333333.
.33000000000033.
.33333333333333.
.33333333333333.
.33333333333333.
................
................`],
  [ stone, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLL1LLLLL
LL1LLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLL1LLLL1LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLL1LLLLLLLLLL
LLLLLLLLLL1LLLLL
LL1LLLLLLLLLLLLL
LLLLLL1LLLLLLLLL
LLLLLLLLLLLLLL1L
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ tree, bitmap`
.........DDD.D..
..D...D.DDDDD.D.
...DDDDDDDDDD...
.DDDDDDDDDDDDD..
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDDD
..DDDDDDDDDDDDDD
.D.DDDDDDDDDDDDD
...DDDDDDDDDD...
...DDDDDDDDD.D..
....D.CCCCD.....
......CCCCC.....
......CCCCC.....
......CCCCC.....
......CCCCC.....
................`],
  [ plank, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [ torch, bitmap`
.......6........
......6666......
....66666666....
...6666996666...
..66699999666...
..69999999666...
..99999999996...
...9993399999...
...9993339999CC.
.CCCC33333999CC.
.CCCC3333399C...
....CC3333C.....
...CCCCCCC......
.CCCCCCCCCCCCC..
.CCCC...CCCCCC..
................`],
  [ coal, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLL000LLL
L000LLLLLL000LLL
L000LLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLL000LLL
LLLLLLLLLL000LLL
LLLL00000LLLLLLL
LLLL00000LLLLLLL
LLLL00000LLLLLLL
LLLLLLLLLLLLLLLL
LL000LLLLLLL00LL
LL000LLLLLLL00LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ grass, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ water, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [ portal, bitmap`
3333333333333333
3999999999999993
3966666666666693
396DDDDDDDDDD693
396D55555555D693
396D5HHHHHH5D693
396D5HHHHHH5D693
396D5HHHHHH5D693
396D5HHHHHH5D693
396D5HHHHHH5D693
396D5HHHHHH5D693
396D55555555D693
396DDDDDDDDDD693
3966666666666693
3999999999999993
3333333333333333`] ,
  [ cow, bitmap`
...0........0...
...00......00...
....0......0....
....00000000....
....00CCCC00....
.....00CC00.....
.....0CCCC0.....
...000C88C000...
...0C0CCCC0C0...
...0C000000C0...
...0CCCCCCCC0...
...0CCCCCCCC0...
...0000000000...
....00....00....
....00....00....
....00....00....`],
  [ darkstone, bitmap`
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
  [ pear, bitmap`
................
.........C.4....
.........C4.....
.........C......
.....666666.....
.....666666.....
.....666666.....
....6666666.....
...666666666....
..6666666666....
..6666666666....
..66666666666...
..66666666666...
...666666666....
.....66666......
................`],
  [ meat, bitmap`
................
................
.......CCCCC....
......CC333CC...
.....C333333C...
....C3333333CC..
...CC33333333C..
..CC333333333C..
..C3333333333C..
..C3332233333C..
..C333223333CC..
..C333333333C...
..C33333333CC...
...CCC333CC.....
.....CCCC.......
................`]
);


setSolids([ bloxxer, stone, tree, water, cow, coal, torch, pear, meat ]);

setPushables({
  [bloxxer]: []
});

// moosic

// the map, the map, the map

let level = 0;
const levels = [
  map`
xb.........ss..........................t......
.......s..csc...o.....t...t..tttttt....ttt..t.
.....c..scsss...............ttttt..........s..
........ssccs......t........tt..tttttt..o.....
.........s..........o.......tt..t..t.ttt..t.t.
...............t.t......tttttt..t..t...t..t...
.....s.................t......t.t..tct.t..t.t.
...s............t..t...t.t..tttttttt...t.tt...
.......s...s...........tttttt..t..tttttt..t...
...t......t...t.t.ttttt....tt..ttttt.tt.sstt..
..................t.tt.sc..tt..t.cct.tttss....
..................t..t....ttttttt.ct..ttss..ww
.........o..t.t...t..ttttt.t.tt.toccc.tt..www.
...t..............t.....tt......t.ttttt...w...
.......c.......tttttttttt.ttt.tt.ttttt.t..w...
.......s......t.....t.t.stttttt.tt.tt.....w...
wwww..........t..tt...t.ss....tttttt..t.t.w...
...........t..t..t.ttttt.ss..tt......s....w...
.....w.......st..t..ott.ttt..t...t......ww....
.....wwww.....tt.ttttttttttt.t...t.t..www.....
........ww....ttttttttt.t.ttt........w....t...
....t....ww..tt.tt...t..t..tt.tttt..w.........
...........w.t....t.t...t.tttt...t..w...t.t.t.
........t..w.t..ttt.t...t..t.....t..w.........
...........w.tttt.tt.ttttttt..ott...w.........
...........w..tt...t..t.t..tttt.....w....t....
.......s...w..s..o..tttt.t......wwwwww.....t..
.....sscs..w....s.............wwwwwwwwwww.....
....ssscc..w....s.......t.....wwwwwwwwwwww....
......sscc..w.......s.........wwwwwwwwwwww....
.......sss...ww.......s......wwwwwwwwwwwww..t.
...t...ssssssswwww.........www...wwwwwwwww....
...........sccs..wwwwwwwwwww........wwww......
............scs...........t....t........t..tt.
......t......ss....s......t.......t...........
..............................t..t....t.......`,
  map`
xb.................o....sss.............
ssss...sssssss...ssssssss.ss..ssss..ssss
....s.....s............c...s..s...ss....
....ss...s..s..ssssss..ccc.s..s....s....
.s...ss..s..s.....c.ss..cc..s.s....s....
.ss...ssss..s.....c..cc.....s......ss...
..ss...ss...s..ssss...cs.s..s...s..s.s..
...ss.......s..s..ss...s.s..s.c.s.s..s..
............s..ss.....ss.s..s.c.s..o.s..
.sssssss..c.s........ss..s..s.ccs....s..
..........c.s...sssss.......s.c.s..f.s..
.....f....s.....s......f....s.c.ss...s..
ccc.......s.....s...........s.c..sssss..
ccc.ssss.....s..s..sssssss..s....s...s..
....s..sssssss..s........ss.s..sss.c.s..
..s.s......s....s.....f.......ss..cc.s..
..s.sscc.........s...........ss..cc..s..
..sss...sss..f....sss........s..cc..ss..
...s.......s...s.....ssssss..s..cc..s...
cc.ss.......s...s.........s..ss...ss....
cc...sssssffc....s.c...f.ss...s....ss...
cc.........cc....s.cc.s.......ss....ss..
c..ssss....c..o..s..c.s........ss....s..
c.ss..sssssss....s....ssss......s.......
c.ss.f......s...s.....s..ssss....s......
c......ssssss.ss....sss.....s.....s..sss
c..o..ss....ss...sss...ccc..s...........
c.sssss...s......s.....ccc..s......f...x
....s..c..s......s..ss.....ss...........
....s.cc..s.......sssss.ssss....ssssssss
....s....sssssss..ss....ssss..........s.
ss..ssssss........s.....s..........cc.s.
..s......ss.............ss......ss.cc.s.
...s......ssss...f...f...sss..o.s.....s.
................................ss...ss.`,
  map`
xb.....wwwwwwwwwwwww.o......a...t.a.wwww
....t...wwwwwwwwwwww................wwww
.........................o...o......wwww
.........wwwwwwwwwww............ss..ww.w
.....t....wwww..wwww.....t.a....cs..ww..
..........wwwww..wwww.........o.sc..ww.w
...sss...wwwww...wwww.....wwww.wwsswwwww
.t..ssswwwwwwww..www..wwwwwwww.wwwwwwwww
.....wwwwwwwwww.wwww.wwwwwwwww.wwwwwwwww
.....wwwwwwwwwwwwwww.wwwww.www.wwwwwwwww
..ww...wwwwwwwwwwwww.wwww.wwww.wwwwwwwww
wwwwww..wwwwwwwwwww..wwwwwwwww.ww..c..ww
wwwww.w.wwwwcssssww............www..c.ww
wwwww.w.wwwwsscsssswwwww.wwwwwwwwwwww.ww
wwwwwww.wwwwsc.............wwwwwwwwww.ww
wwwwwww.wwwwss.t........a....wwwwww...ww
wwwwwww.wwwwss.......o....t.........wwww
wwwwwww.wwwws....t..cc........wwwww.wwww
wwwwwww.........a...csc..o.......wwwwwww
....www...wwww...............ww.wwwwwwww
.a...ww...wwwww..wwwwwww....www.wwwwwwcs
..........wwwww.wwwwwwwwwwwwwww..wwwwsss
.....wwwwwwwwww.wwwwwwwwwwwwwwww.www....
..o..wwwwwww.....wwwwww................a
...t.wwwww...wwwww.wwww.wwwwwwwwwwwwo...
.....wwwww.ww.wwwwwwwww.wwwwwwwwww......
......wwww.wwww..........wwwwwwww.......
.t.....www.www...........ww...www.......
...o..wwww.ww......t.....ww...www..t..o.
................t..t...a.ww...wwww......
.....wwwwwwww............wwwwwwwww......`,
  map``,
  map``
];

setMap(levels[level]);
setBackground(grass);

mapNat = getMapV2();
setMapV2(trimMapV2(px-5, py-4, 10, 8, mapNat));

setPushables({
  [ bloxxer ]: [ cow ],
});

// bloxxer's inventory

let myStuff = {"p": 0, "s": 10, "f": 0, "c": 0, "a": 0, "m": 0}
let arrStuff = ["p", "s", "f", "c", "a", "m"]
let thingIndex = 0 
let textShowing = false

// movement

onInput("w", () => {
  setMapV2(mapNat);
  getFirst(bloxxer).y -= 1;
  py = getFirst(bloxxer).y;
});

onInput("a", () => {
  setMapV2(mapNat);
  getFirst(bloxxer).x -= 1;
  px = getFirst(bloxxer).x;
});

onInput("s", () => {
  setMapV2(mapNat);
  getFirst(bloxxer).y += 1;
  py = getFirst(bloxxer).y;
});

onInput("d", () => {
  setMapV2(mapNat);
  getFirst(bloxxer).x += 1;
  px = getFirst(bloxxer).x;
});

// interaction, inventory

function showStats() {
  let thingNames = {"s": "Stone", "p": "Planks", "f": "Fires", "c": "Coal", "a": "Pears", "m": "Meat"}

  clearText()
  let i = 0
  for (let thing in myStuff) {
    if (arrStuff[thingIndex] == thing) {
      addText("*" + thingNames[thing] + ": " + myStuff[thing], {
        x: 0,
        y: 15 - i,
        color: color`2`
      });
    } else {
      addText(thingNames[thing] + ": " + myStuff[thing], {
        x: 0,
        y: 15 - i,
        color: color`2`
      });
    }
    i += 1
  }
}

onInput("l", () => {
  setMapV2(mapNat);
  
  let thingToPickUp = getTile(getFirst(bloxxer).x + 1, getFirst(bloxxer).y)[0]
  
  if (thingToPickUp) {
    if (["p", "s", "f", "c", "a", "t", "o", "m"].includes(thingToPickUp._type)) {
      clearTile(thingToPickUp.x, thingToPickUp.y)
      if (thingToPickUp._type == "t") {
        let rand = Math.random()
        if (rand > 0.5) {
          myStuff["a"] += 1
        }
        myStuff["p"] += 1
      } else if (thingToPickUp._type == "o"){
        myStuff["m"] += 1
      } else {
        myStuff[thingToPickUp._type] += 1
      }
    }
  }
});

onInput("j", () => {
  setMapV2(mapNat);

  let thingBehindYou = getTile(getFirst(bloxxer).x - 1, getFirst(bloxxer).y)[0]
  if (!thingBehindYou || thingBehindYou._type == "w") {
    clearTile(getFirst(bloxxer).x - 1, getFirst(bloxxer).y)
    if (myStuff[arrStuff[thingIndex]] > 0) {
      myStuff[arrStuff[thingIndex]] -= 1
      addSprite(getFirst(bloxxer).x - 1, getFirst(bloxxer).y, arrStuff[thingIndex])
    }
  } else if (thingBehindYou._type == "p") {
    if (thingIndex == 3) {
      if (myStuff[arrStuff[thingIndex]] > 0) {
        myStuff[arrStuff[thingIndex]] -= 1
        clearTile(getFirst(bloxxer).x - 1, getFirst(bloxxer).y)
        addSprite(getFirst(bloxxer).x - 1, getFirst(bloxxer).y, "f")
      }
    }
  }
  
});

onInput("i", () => {
  setMapV2(mapNat);
  
  if (thingIndex == (arrStuff.length - 1)) {
    thingIndex = 0
  } else {
    thingIndex += 1
  }
});

onInput("k", () => {
  setMapV2(mapNat);
})

afterInput(() => {
  // scroll map
  mapNat = getMapV2();
  setMapV2(trimMapV2(px-5, py-4, 10, 8, mapNat));

  showStats()

  let playerAndTunnel = tilesWith(bloxxer, portal)
  if (playerAndTunnel.length > 0) {
    if (level == 0) {
      level = 1
      setMap(levels[level]);
      setBackground(darkstone);
      mapNat = getMapV2();
      setMapV2(trimMapV2(px-5, py-4, 10, 8, mapNat));
    } else if (level == 1) {
      level = 2
      setMap(levels[level]);
      setBackground(grass);
      mapNat = getMapV2();
      setMapV2(trimMapV2(px-5, py-4, 10, 8, mapNat));
    } else if (level == 2) {
      level = 0
      setMap(levels[level]);
      setBackground(grass);
      mapNat = getMapV2();
      setMapV2(trimMapV2(px-5, py-4, 10, 8, mapNat));
    }
  }

  
  
});

