/* 
@title: ultimate maze :D 
@description: a simple maze game following the maze_game_starter tutorial 
@author: liyah shang, tutorial by cheru berhanu 

info for liyah's reference: 
  width board: 0 - 14 
  height board: 0 - 17 
*/ 

//SPRITES 
const player = "p"; 
const wall = "w"; 
const goal = "g"; 
const box = "b"; 
const lock = "l"; 
const key = "k"; 
const trap = "t"; 
const pone = "x"; 
const ptwo = "y"; 
const fragile = "f"; 
const hole = "h"; 
const playertwo = "q"; 
const goaltwo = "r"; 
const moving = "m"; 

//LEGEND 
setLegend(
  [ player, bitmap`
................
................
................
................
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
....33333333....
................
................
................
................` ],
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
0000000000000000` ], 
  [ goal, bitmap`
................
................
................
................
.....666666.....
.....666666.....
...6666336666...
...6.663366.6...
...6666666666...
......6666......
.......66.......
.......66.......
......6666......
................
................
................` ], 
  [ box, bitmap`
99CCCCCCCCCCCC99
999CCCCCCCCCC999
C999CCCCCCCC999C
CC999CCCCCC999CC
CCC999CCCC999CCC
CCCC999CC999CCCC
CCCCC999999CCCCC
CCCCCC9999CCCCCC
CCCCCC9999CCCCCC
CCCCC999999CCCCC
CCCC999CC999CCCC
CCC999CCCC999CCC
CC999CCCCCC999CC
C999CCCCCCCC999C
999CCCCCCCCCC999
99CCCCCCCCCCCC99` ], 
  [ lock, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
666666CCCC666666
666666C66C666666
666666C66C666666
6666CCCCCCCC6666
6666C666666C6666
6666C666666C6666
6666C666666C6666
6666CCCCCCCC6666
6666666666666666
6666666666666666
6666666666666666
6666666666666666` ], 
  [ key, bitmap`
................
................
................
.....66666......
.....6...6......
.....6.6.6......
.....6...6......
.....66666......
.......6........
.......66.......
.......66.......
.......6........
.......66.......
.......6........
................
................` ], 
  [ trap, bitmap`
6336339399996699
9666699963669699
6633699333696699
6933633336669669
9663369993963699
6666666699993669
9996939963663369
3999333966993996
3993636999963639
3699339336963369
3333333699996639
3363636966969399
3363966699666393
9933996396999933
6933396336969966
6999333396999999` ], 
  [ pone, bitmap`
................
................
................
.....555555.....
....55777755....
...5577777755...
...5777777775...
...5777777775...
...5777777775...
...5777777775...
...5777777775...
...5577777755...
....55777755....
.....555555.....
................
................` ], 
  [ ptwo, bitmap`
................
................
................
.....333333.....
....33888833....
...3388888833...
...3888888883...
...3888888883...
...3888888883...
...3888888883...
...3888888883...
...3388888833...
....33888833....
.....333333.....
................
................` ], 
  [ fragile, bitmap`
.......1........
.111.11.....L111
.....1...1......
..LL.....11111..
1...LLLL.....1..
1111.....111.111
...11.1.........
....1111...LL...
L...L.....L.....
.....LL....111.1
1111....1111.111
...11...1.......
....11.....1.1..
.1...1.L.111..1.
1.1...1........1
....LLL.....LL..` ], 
  [ hole, bitmap`
................
................
................
.....LLLLLL.....
....LL1111LL....
...LL111111LL...
...L11111111L...
...L11111111L...
...L11111111L...
...L11111111L...
...L11111111L...
...LL111111LL...
....LL1111LL....
.....LLLLLL.....
................
................` ], 
  [ playertwo, bitmap`
................
................
................
................
....77777777....
....77777777....
....77777777....
....77777777....
....77777777....
....77777777....
....77777777....
....77777777....
................
................
................
................` ], 
  [ goaltwo, bitmap`
................
................
................
................
.....666666.....
.....666666.....
...6666776666...
...6.667766.6...
...6666666666...
......6666......
.......66.......
.......66.......
......6666......
................
................
................` ], 
  [ moving, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH` ], 
);

//VARIABLES 
const levels = [
  map`
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
pw.............
.w.w.wwwwwwwww.
.www.w.......w.
.....w.wwwwwww.
wwww.w....w....
...w.w.w..w.www
.www.w.w.wwww..
.w...w.w.......
.w.www.wwwwwww.
.w.w.....w.....
...wwwww.w.wwww
.w...w...w.....
.w.w.w.wwwwwww.
.wwwww...w.w...
.......w...w.wg
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww`, //normal 
  map`
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
p.w..ww........
w..w..w..wwwww.
ww..w.ww.w...w.
.ww..w.www.www.
..ww..wwww.....
w..w.b.......w.
ww.wwwwwwwwbwww
.ww.w..........
.......wwww.ww.
wwww.wbw.......
.....w.wwwwww.w
wwww.w.........
.....w...wwwww.
wwww.w.www.....
.....wg..w..www
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww`, //boxes 
  map`
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
p.......w..ww..
wwwwww..w....ww
.....w..b.....w
.www...ww.ww..w
.....ww.w..ww..
wwwwbw..ww...w.
.........w.w.w.
..w...ww.w.w.ww
..w......w.w.w.
.wwwww...w.w...
.......www.wwww
ww.w.w.w.......
.....w.wwwwwwwl
.wwwww.ww......
....kw.w...w.wg
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww`, //keys, boxes 
  map`
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
p......b.......
www....b.......
k.wwwwwwwwwww..
.ww.........ww.
..wwwwwwwwwwww.
..b..........w.
www.wwwwwwww.w.
..w........www.
..w.wwwwww..ww.
.ww..w.w.w.....
.....www...w..w
lwww.......ww.w
...w.wwwwww.w.w
ww.www..w.www.w
.wg.....w.....w
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww`, //keys, boxes, step limit 
  map`
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
p...........t..
wwwwwwbwwww.www
k..t.w....w..tw
ww.w.w.wwwww...
.w.www....tw.w.
........w..w.w.
.wwbwtbbw..www.
.wbbwwbbww.....
.wwbbwbbw..twww
..wwwwwww.www..
..........tw...
wwwwwwwww.ww.ww
..........wwtwg
.wwwwwwww....w.
bbbbbbbbw.ww.l.
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww`, //keys, boxes, step limit, traps 
  map`
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
p....b.........
....twwwwwww...
www.tw....t....
....twwwwwt.www
www......ww.w..
w....ww..tw.w..
w.wwwwwwwww.ww.
w...w..b..l.t..
www.w..wwwwwwww
wk..wx.w......y
wwwwwwww.wwwwww
tttttttw.w.....
.......w...www.
.wwwww.wwwwwtt.
....gw.........
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww`, //keys, boxes, step limit, traps, portals 
  map`
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
p.....bbw...ttt
ww.ww.bbw.w.ttt
.w.wwwwww.w.www
.w.w......w.wwx
.w.w.wwwwww.w..
.w.w.w......w.w
.w.w.wwwwwwfw..
.t...tw..yw.ww.
wwww.tw.www.w..
tttwktw...w.w.w
..twwtwww.w.w..
........b.wlww.
..wwwwwwwww....
.........twwwww
wwwwwwww......g
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww`, //keys, boxes, step limit, traps, portals, fragile 
  map`
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
p.w.bbbbwtttt.q
w.w.wwwwwwwww.w
w.w.ww......w.w
w.w..w.wwwwww.w
w.tw.wwwwwttt..
w.tw.w...wtwwwl
..twww.wxwww.w.
ktw....wtttt.w.
.ww.wttwwww..w.
..w.wwwwbbw..w.
w.w....wbbww.w.
t.wwww.ww....b.
t....b.....w.b.
wwww.w.wwwww..w
gytw.w..kw....r
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww`, //keys, boxes, step limit, traps, portals, fragile ** , player two 
  map`
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
....m....m.....
p..........www.
wwwwwwwwwwwwtt.
q......b...www.
wwwwwwww.www.m.
.wx......ttwk..
.wwwwwww.ttwww.
.........ttwtt.
wwwwwwwwwwwwwt.
............wt.
.wwwwwwwwww.wt.
.m..wtttttw.wt.
....wwwwwww.wt.
www.w.y.l...wt.
r...wwwwwwwwwtg
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww`, //keys, boxes, step limit, traps, portals, fragile ** , player two, moving   
  map`
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
......m......wk
p.......ww...w.
wwwwwwwwww...w.
........tt...w.
........tt.....
wwwwwwwwwwwwww.
.......g.....t.
lwwwwwwwwwwwww.
..........w....
.......r..w....
..twwwwwwww....
..tw......m....
..twq..........
.wwwwwwwwwwwww.
...............
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww`, //keys, boxes **, step limit, traps, portals ** , fragile ** , player two, moving, sliding movement 
];

const COUNTER_MAX = 300; 
const LEVELS_MAX = levels.length-1; 

let counter = COUNTER_MAX; 
let level = LEVELS_MAX - LEVELS_MAX;
let fstate = false; 
let mstate = false; 

//FUNCTIONS 
function setNewMap(flevel) {
  setMap(levels[flevel]); 
  counter = COUNTER_MAX; 
  text(flevel);
}
function checkWinL() {
  if (level >= 7) {
    if (tilesWith(player,goal).length >= 1 && tilesWith(playertwo,goaltwo).length >= 1) {
      if (level < LEVELS_MAX) { //less than last level  
        level += 1; 
        setNewMap(level); 
      } else if (level == LEVELS_MAX) { //last level 
        text(LEVELS_MAX+1);
      }
    } else {
      return false; 
    }
  } else {
    if (tilesWith(player,goal).length >= 1) {
      if (level < LEVELS_MAX) { //less than last level  
        level += 1; 
        setNewMap(level); 
      } else if (level == LEVELS_MAX) { //last level 
        text(LEVELS_MAX+1);
      }
    } else {
      return false; 
    }
  }
}
function checkCounter() {
  if (counter == 0) {
    setMap(levels[level]); 
    counter = COUNTER_MAX; 
  }
}
function checkKey() {
  if (tilesWith(player,key).length > 0 || tilesWith(playertwo,key).length > 0) {
    getFirst(lock).remove();
    getFirst(key).remove();
  }
}
function checkTrapMoving() {
if (tilesWith(player,trap).length > 0 || tilesWith(playertwo,trap).length > 0) {
    setNewMap(level); 
  } else if (tilesWith(player,moving).length > 0 || tilesWith(playertwo,moving).length > 0) {
    setNewMap(level); 
  }
}
function checkPortal() {
  pl = getFirst(player); 
  p2 = getFirst(playertwo); 
  port1 = getFirst(pone); 
  port2 = getFirst(ptwo); 
  if (tilesWith(player,pone).length > 0) {
    pl.x = port2.x; 
    pl.y = port2.y; 
  } else if (tilesWith(player,ptwo).length > 0) {
    pl.x = port1.x; 
    pl.y = port1.y; 
  } 
  if (tilesWith(playertwo,pone).length > 0) {
    p2.x = port2.x; 
    p2.y = port2.y; 
  } else if (tilesWith(playertwo,ptwo).length > 0) {
    p2.x = port1.x; 
    p2.y = port1.y; 
  }
}
function checkFragile() {
  pl = getFirst(player); 
  p2 = getFirst(playertwo); 
  frag = getFirst(fragile); 
  if (tilesWith(player,hole).length > 0) {
    fstate = false; 
    setNewMap(level); 
  } else if (fstate == false && tilesWith(player,fragile).length > 0) {
    fstate = true; 
  } else if (fstate == true) {
    addSprite(getFirst(fragile).x, getFirst(fragile).y, hole); 
    getFirst(fragile).remove(); 
    fstate = false; 
  }
}
function onStep() {
  counter -= 1; 
  clearText() 
  text();
  if (counter == 0) {
    setMap(levels[level]); 
  }
}
function text(flevel) {
  clearText(); 
  if (flevel == 0 || flevel == 1 || flevel == 2) {
    addText("level: " + String(flevel), { x: 1, y: 14, color: color`2`}); 
  } else if (flevel == 3 || flevel == 4 || flevel == 5 || flevel == 6) {
    addText("level: " + String(flevel), { x: 0, y: 14, color: color`2`}); 
    addText("steps: " + (counter), { x: 10, y: 14, color: color`2`}); 
  } else if (flevel == 7 || flevel == 8) {
    addText("level: " + String(flevel), { x: 0, y: 14, color: color`2`}); 
    addText("steps: " + (counter), { x: 10, y: 14, color: color`2`}); 
  } else if (flevel == LEVELS_MAX) { //9 
    addText("level: " + String(flevel), { x: 1, y: 14, color: color`2`}); 
    addText("steps: " + (counter), { x: 1, y: 1, color: color`2`}); 
  } else if (flevel == LEVELS_MAX+1) { //win 
    addText("level: " + String(flevel-1), { x: 1, y: 14, color: color`2`}); 
    addText("you win!", { y: 1, color: color`2`});
  }
  if (flevel == 0) {
    addText("welcome!!", { x: 1, y: 1, color: color`2`}); 
  } else if (flevel == 1) {
    addText("blocking ur path", { x: 1, y: 1, color: color`2`}); 
  } else if (flevel == 2) {
    addText("unlock the lock..", { x: 1, y: 1, color: color`2`}); 
  } else if (flevel == 3) {
    addText("srsly, a limit?", { x: 1, y: 1, color: color`2`}); 
  } else if (flevel == 4) {
    addText("that's fire..", { x: 1, y: 1, color: color`2`}); 
  } else if (flevel == 5) {
    addText("teleportation :)", { x: 1, y: 1, color: color`2`}); 
  } else if (flevel == 6) {
    addText("r those safe?", { x: 1, y: 1, color: color`2`}); 
  } else if (flevel == 7) {
    addText("new guy who dis?", { x: 1, y: 1, color: color`2`}); 
  } else if (flevel == 8) {
    addText("woah they move!", { x: 1, y: 1, color: color`2`}); 
  } else if (flevel == 9) {
    addText("sliding...", { x: 1, y: 1, color: color`2`}); 
  }
}

// INTERACTIONS 
setSolids([player, wall, lock, box, playertwo]);
setPushables({
  [ player ]: [ box] , 
  [ playertwo ]: [ box ], 
});

//INPUT 
onInput("w", () => {
  if (level == 9) {
    while (getTile(getFirst(player).x, getFirst(player).y-1).length == 0 && getFirst(player).y != 0) {
      getFirst(player).y -= 1; 
    } 
    const list = getTile(getFirst(player).x, getFirst(player).y-1); 
    const nextTile = list[0] 
    if (nextTile != undefined) {
      if (nextTile.type == goal || nextTile.type == key) {
        getFirst(player).y -= 1; 
      } else if (nextTile.type == trap || nextTile.type == moving) {
        setNewMap(level); 
      }
    }
    onStep(); 
  } else {
    getFirst(player).y -= 1; 
    onStep(); 
  }
}); 
onInput("a", () => {
  if (level == 9) {
    while (getTile(getFirst(player).x-1, getFirst(player).y).length == 0 && getFirst(player).x != 0) {
      getFirst(player).x -= 1; 
    } 
    const list = getTile(getFirst(player).x-1, getFirst(player).y); 
    const nextTile = list[0] 
    if (nextTile != undefined) {
      if (nextTile.type == goal || nextTile.type == key) {
        getFirst(player).x -= 1; 
      } else if (nextTile.type == trap || nextTile.type == moving) {
        setNewMap(level); 
      }
    }
    onStep(); 
  } else {
    getFirst(player).x -= 1; 
    onStep(); 
  }
}); 
onInput("s", () => {
  if (level == 9) {
    while (getTile(getFirst(player).x, getFirst(player).y+1).length == 0 && getFirst(player).y != 17) {
      getFirst(player).y += 1; 
    } 
    const list = getTile(getFirst(player).x, getFirst(player).y+1); 
    const nextTile = list[0] 
    if (nextTile != undefined) {
      if (nextTile.type == goal || nextTile.type == key) {
        getFirst(player).y -= 1; 
      } else if (nextTile.type == trap || nextTile.type == moving) {
        setNewMap(level); 
      }
    }
    onStep(); 
  } else {
    getFirst(player).y += 1; 
    onStep(); 
  }
}); 
onInput("d", () => {
  if (level == 9) {
    while (getTile(getFirst(player).x+1, getFirst(player).y).length == 0 && getFirst(player).x != 14) {
      getFirst(player).x += 1; 
    } 
    const list = getTile(getFirst(player).x+1, getFirst(player).y); 
    const nextTile = list[0] 
    if (nextTile != undefined) {
      if (nextTile.type == goal || nextTile.type == key) {
        getFirst(player).x += 1; 
      } else if (nextTile.type == trap || nextTile.type == moving) {
        setNewMap(level); 
      }
    }
    onStep(); 
  } else {
    getFirst(player).x += 1; 
    onStep(); 
  }
}); 
onInput("i", () => {
  if (level == 9) {
    while (getTile(getFirst(playertwo).x, getFirst(playertwo).y-1).length == 0 && getFirst(playertwo).y != 0) {
      getFirst(playertwo).y -= 1; 
    } 
    const list = getTile(getFirst(playertwo).x, getFirst(playertwo).y-1); 
    const nextTile = list[0] 
    if (nextTile != undefined) {
      if (nextTile.type == goaltwo || nextTile.type == key) {
        getFirst(playertwo).y -= 1; 
      } else if (nextTile.type == trap || nextTile.type == moving) {
        setNewMap(level); 
      }
    }
    onStep(); 
  } else if (level >= 7) {
    getFirst(playertwo).y -= 1; 
    onStep(); 
  }
});
onInput("j", () => {
  if (level == 9) {
    while (getTile(getFirst(playertwo).x-1, getFirst(playertwo).y).length == 0 && getFirst(playertwo).x != 0) {
      getFirst(playertwo).x -= 1; 
    } 
    const list = getTile(getFirst(playertwo).x-1, getFirst(playertwo).y); 
    const nextTile = list[0] 
    if (nextTile != undefined) {
      if (nextTile.type == goaltwo || nextTile.type == key) {
        getFirst(playertwo).x -= 1; 
      } else if (nextTile.type == trap || nextTile.type == moving) {
        setNewMap(level); 
      }
    }
    onStep(); 
  } else if (level >= 7) {
    getFirst(playertwo).x -= 1; 
    onStep(); 
  } else {
    setNewMap(level); 
  }
});
onInput("k", () => {
  if (level == 9) {
    while (getTile(getFirst(playertwo).x, getFirst(playertwo).y+1).length == 0 && getFirst(playertwo).y != 17) {
      getFirst(playertwo).y += 1; 
    } 
    const list = getTile(getFirst(playertwo).x, getFirst(playertwo).y+1); 
    const nextTile = list[0] 
    if (nextTile != undefined) {
      if (nextTile.type == goaltwo || nextTile.type == key) {
        getFirst(playertwo).y -= 1; 
      } else if (nextTile.type == trap || nextTile.type == moving) {
        setNewMap(level); 
      }
    }
    onStep(); 
  } else if (level >= 7) {
    getFirst(playertwo).y += 1; 
    onStep(); 
  }
});
onInput("l", () => {
  if (level == 9) {
    while (getTile(getFirst(playertwo).x+1, getFirst(playertwo).y).length == 0 && getFirst(playertwo).x != 14) {
      getFirst(playertwo).x += 1; 
    } 
    const list = getTile(getFirst(playertwo).x+1, getFirst(playertwo).y); 
    const nextTile = list[0] 
    if (nextTile != undefined) {
      if (nextTile.type == goaltwo || nextTile.type == key) {
        getFirst(playertwo).x += 1; 
      } else if (nextTile.type == trap || nextTile.type == moving) {
        setNewMap(level); 
      }
    }
    onStep(); 
  } else if (level >= 7) {
    getFirst(playertwo).x += 1; 
    onStep(); 
  }
});

//AFTER INPUT / CHECKING FUNCTIONS 
afterInput(() => {
  text(level); 
  checkWinL();
  checkCounter(); 
  checkKey(); 
  checkTrapMoving(); 
  checkPortal(); 
  checkFragile(); 
}); 

//INTERVAL (MOVING TILE) 
setInterval(() => {
  if (level == 8) { 
    if (mstate == false) {
      let t1 = getTile(1,15); 
      let t2 = getTile(4,4); 
      let t3 = getTile(9,4); 
      let t4 = getTile(13,8); 
      if (t1.length > 0 || t2.length > 0 || t3.length > 0 || t4.length > 0) {
        setNewMap(level); 
      } else { 
        addSprite(1,15,moving); 
        addSprite(4,4,moving); 
        addSprite(9,4,moving); 
        addSprite(13,8,moving); 
        mstate = true; 
      }
    } else if (mstate == true) {
      clearTile(1,15); 
      clearTile(4,4); 
      clearTile(9,4); 
      clearTile(13,8); 
      mstate = false; 
    }
  } else if (level == 9) {
    if (mstate == false) {
      let t1 = getTile(6,4); 
      let t2 = getTile(10,15); 
      if (t1.length > 0 || t2.length > 0) {
        setNewMap(level); 
      } else { 
        addSprite(6,4,moving); 
        addSprite(10,15,moving); 
        mstate = true; 
      }
    } else if (mstate == true) {
      clearTile(6,4); 
      clearTile(10,15); 
      mstate = false; 
    }
  }
}, 500); 

//GAME CODE :D 
setNewMap(level); 