/*
@title: portal_game
@author: DanPlayz (danplayz0)
@tags: ['puzzle']
@addedOn: 2023-05-05
@remixed: getting_started by leo

Instructions:
Hit "run" to execute the code and start the game.
The objective is to move a box to the flag using portals. 

Controls: 
W = Up
A = Left
S = Down 
D = Right

J = Reset Level
L = Restart

*/

let isPlaying = true;

const player = "p";
const box = "b";
const goal = "f";
const goalclaimed = "c";
const wall = "w";

const portalblue = "l";
const portalred = "r";
const portalbox = "c";

setLegend(
  [ player, bitmap`
................
................
................
.......7........
.....77.777.....
....7.....77....
....7.0.0..7....
....7......7....
....7..00..7....
....77....7.....
......77777.....
......7...7.....
....777...777...
................
................
................`],
  [ box, bitmap`
................
................
................
...CCCCCCCCCCC..
...C....C....C..
...C....C....C..
...C....C....C..
...C....C....C..
...CCCCCCCCCCC..
...C....C....C..
...C....C....C..
...C....C....C..
...C....C....C..
...CCCCCCCCCCC..
................
................`],
  [ goal, bitmap`
................
....LL11001100..
....LL11001100..
....LL00110011..
....LL00110011..
....LL11001100..
....LL11001100..
....LL..........
....LL..........
....LL..........
....LL..........
....LL..........
....LL..........
.LLLLLLLLL......
.LLLLLLLLL......
................`],
  [ goalclaimed, bitmap`
................
....LL44DD44DD..
....LL44DD44DD..
....LLDD44DD44..
....LLDD44DD44..
....LL44DD44DD..
....LL44DD44DD..
....LL..........
....LL..........
....LL..........
....LL..........
....LL..........
....LL..........
.LLLLLLLLL......
.LLLLLLLLL......
................`],
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
  [ portalblue, bitmap`
................
................
......5555......
.....557755.....
....55777755....
....577777755...
...5577777775...
...5577777775...
...5577777775...
...5777777775...
...5577777755...
....55777755....
......55555.....
........55......
................
................`],
  [ portalred, bitmap`
................
................
......3333......
.....339933.....
....33999933....
....399999933...
...3399999993...
...3399999993...
...3399999993...
...3999999993...
...3399999933...
....33999933....
......33333.....
........33......
................
................`]
);

let level = 0;
const levels = [
  map`
r..f
wwww
p.bl`,
  map`
p.wf
.bw.
.rw.
..wl`,
  map`
.r.b.
.....
pbwww
..wl.
www..
ff...`,
  map`
.fw..
p.wb.
..w..
.rwl.`,
  map`
pww..
.b...
wwwwl
wr.fw`,
  map`
.rwf..f
.bwww..
.......
w..p...
l....b.`,
  map`
w.r..w.f
w......f
w..www.f
wwwwpw.f
w....www
w.lbbbb.
w.......`,
  map`
wwwwww....
w.rw......
.w..w..w..
.l.....w..
..bww..w..
..bwfwww..
.w.wf.....
p..w......`,
];

const setLevel = (lvl) => {
  level = lvl;
  clearText("");
  addText(`Level ${lvl+1}/${levels.length}`, { y: 1, color: color`L` });
  setMap(levels[lvl]);
  isPlaying = true;
}

setLevel(level);

setSolids([ player, box, wall ]);

setPushables({
  [player]: [box],
  [box]: [box]
});

// START - PLAYER MOVEMENT CONTROLS

onInput("s", () => { if(isPlaying) getFirst(player).y += 1; });
onInput("w", () => { if(isPlaying) getFirst(player).y -= 1; });
onInput("d", () => { if(isPlaying) getFirst(player).x += 1; });
onInput("a", () => { if(isPlaying) getFirst(player).x -= 1; });

// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  if(!isPlaying && (levels.length-1) == level) setLevel(0);
  else setLevel(level);
});
onInput("l", () => {
  setLevel(0);
})

const checkWin = () => {
  const flags = tilesWith(goal).length, claimedFlags = tilesWith(goal, box).length;
  if (flags != 0) return false;
  if ((levels.length-1) == level) {
    isPlaying = false;
    addText("YOU WIN!", { y: 6, color: color`4` });
    return true;
  }

  isPlaying = false;
  addText("LEVEL COMPLETED", { y: 5, color: color`4` });  
  setTimeout(() => setLevel(level+1), 700);
  return false;
};

const claimFlag = () => {
  for(let tile of tilesWith(goal, box)) {
    clearTile(tile[0].x, tile[0].y)
    addSprite(tile[0].x, tile[0].y, goalclaimed)
  }
}

const checkBoxTeleport = () => {
  const bluePortal = getFirst(portalblue), redPortal = getFirst(portalred);
  if(!bluePortal || !redPortal) return;
  
  for (let tile of tilesWith(box)) {
    if (tile.length == 1) continue;
    const tileBox = tile.find(x=>x.type==box);
    
    if (tile.find(x=>x.type==portalblue)) {
      tileBox._x = redPortal.x;
      tileBox._y = redPortal.y;
    } else if (tile.find(x=>x.type==portalred)) {
      tileBox._x = bluePortal.x;
      tileBox._y = bluePortal.y;
    }
    
    const [axis,move] = findOpenTile(tileBox.x, tileBox.y);
    tileBox[axis] += move;
  }
}

const findOpenTile = (x,y) => {
  if((y-1) >= 0 && !getTile(x, y-1).some(x=>x.type == wall)) return ["y",-1];
  if((y+1) < height() && !getTile(x, y+1).some(x=>x.type == wall)) return ["y",1];
  if((x-1) >= 0 && !getTile(x-1, y).some(x=>x.type == wall)) return ["x",-1];
  if((x+1) < width() && !getTile(x+1, y).some(x=>x.type == wall)) return ["x",1];
  return ["y",0]
}

let playerTped = false;
const checkPlayerTeleport = () => {
  const bluePortal = getFirst(portalblue), redPortal = getFirst(portalred);
  if(!bluePortal || !redPortal) return;
  if(playerTped) {
    playerTped = false;
    return;
  }

  const daPlayer = getFirst(player);
  if(bluePortal.y == daPlayer.y && bluePortal.x == daPlayer.x) {
    daPlayer._y = redPortal.y;
    daPlayer._x = redPortal.x;
    playerTped = true;
  } else if (redPortal.y == daPlayer.y && redPortal.x == daPlayer.x) {
    daPlayer._y = bluePortal.y;
    daPlayer._x = bluePortal.x;
    playerTped = true;
  }
}

afterInput(() => {
  if (!isPlaying) return;
  claimFlag();
  checkBoxTeleport();
  checkPlayerTeleport();
  checkWin();
});
