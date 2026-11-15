/*
@title:Portal Quest
@author: Luke Bruce-Poliquin
@description: Get the boxes into the portals to get to the next level and collect the keys to get to the next level.
@tags: ['teleporter']
@addedOn: 2026-11-11
*/

const player = "p";
const block = "b";
const goal = "g";
const wall = "w";
const key = "k";
const fakeKey = "f"; 
const closedPortal = "c";
const openPortal = "x";
const teleporterA = "t"; 
const teleporterB = "u"; 
const hazard = "r"; 
const fireballD = "z"; 
const fireballU = "v"; 

setLegend(
  [ player, bitmap`
................
.......77.......
......7777......
.....770707.....
.....777777.....
......7777......
.......77.......
......7777......
.....777777.....
....77.77.77....
....7..77..7....
.......77.......
.......77.......
......7777......
................
................` ],
  [ block, bitmap`
LLLLLLLLLLLLLLLL
L01111111111110L
L1LLLLLLLLLLLL1L
L1L0111111110L1L
L1L1LLLLLLLL1L1L
L1L1L011110L1L1L
L1L1L1LLLL1L1L1L
L1L1L1L11L1L1L1L
L1L1L1L11L1L1L1L
L1L1L1LLLL1L1L1L
L1L1L011110L1L1L
L1L1LLLLLLLL1L1L
L1L0111111110L1L
L1LLLLLLLLLLLL1L
L01111111111110L
LLLLLLLLLLLLLLLL` ],
  [ goal, bitmap`
..44444444444...
.4400000000044..
440000000000044.
400000000000004.
400000000000004.
400000000000004.
400000000000004.
400000000000004.
400000000000004.
400000000000004.
400000000000004.
400000000000004.
400000000000004.
440000000000044.
44400000000044..
.444444444444...` ],
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
  [ key, bitmap`
.......FFFFFF...
.......FF.F.F...
.......FF.......
.......FFFFFF...
.......FF.F.F...
.......FF.......
.......FF.......
.......FF.......
......FFFF......
.....FFFFFF.....
....FFFFFFFF....
....FFF..FFF....
....FFF..FFF....
....FFFFFFFF....
.....FFFFFF.....
......FFFF......` ],
  [ fakeKey, bitmap`
.......FFFFFF...
.......FF.F.F...
.......FF.......
.......FFFFFF...
.......FF.F.F...
.......FF.......
.......FF.......
.......FF.......
......FFFF......
.....FFFFFF.....
....FFFFFFFF....
....FFF..FFF....
....FFF..FFF....
....FFFFFFFF....
.....FFFFFF.....
......FFFF......` ],
  [ hazard, bitmap`
LLLLLLLLLLLLLLLL
L31111111111113L
L13333333333331L
L13311111111331L
L13133333333131L
L13133111133131L
L13131333313131L
L13131311313131L
L13131311313131L
L13131333313131L
L13133111133131L
L13133333333131L
L13311111111331L
L13333333333331L
L31111111111113L
LLLLLLLLLLLLLLLL` ],
  [ fireballD, bitmap`
................
.......333......
......33933.....
.....3399933....
....33996993....
...3399666933...
...3996666993...
...3996666993...
...3396666933...
....39966993....
....33999933....
.....339933.....
......3333......
.......33.......
................
................` ],
  [ fireballU, bitmap`
................
.......333......
......33933.....
.....3399933....
....33996993....
...3399666933...
...3996666993...
...3996666993...
...3396666933...
....39966993....
....33999933....
.....339933.....
......3333......
.......33.......
................
................` ],
  [ closedPortal, bitmap`
................
..CCCCCCCCCCC...
..CC666C666CC...
..CC666C666CC...
..CC666C666CC...
..CC666C666CC...
..CC666C666CC...
..CCCCCCCCCFC...
..CC666C666CC...
..CC666C666CC...
..CC666C666CC...
..CC666C666CC...
..CCCCCCCCCCC...
................
................
................` ],
  [ openPortal, bitmap`
................
CCCCCCCC00000000
C66CC66C00000000
C66CC66C00000000
C66CC66C00000000
C66CC66C00000000
C66CC66C00000000
FCCCCCCC00000000
C66CC66C00000000
C66CC66C00000000
C66CC66C00000000
C66CC66C00000000
CCCCCCCC00000000
................
................
................` ],
  [ teleporterA, bitmap`
...9999999999...
..990000000099..
.99000000000099.
.90000000000009.
.90000000000009.
.90000000000009.
.90000000000009.
.90000000000009.
.90000000000009.
.90000000000009.
.90000000000009.
.90000000000009.
.90000000000009.
.99000000000099.
..990000000099..
...9999999999...` ],
  [ teleporterB, bitmap`
...5555555555...
..550000000055..
.55000000000055.
.50000000000005.
.50000000000005.
.50000000000005.
.50000000000005.
.50000000000005.
.50000000000005.
.50000000000005.
.50000000000005.
.50000000000005.
.50000000000005.
.55000000000055.
..550000000055..
...5555555555...` ]
);


const melody = tune`
252.10084033613447,
252.10084033613447: D4~252.10084033613447 + A5^252.10084033613447,
252.10084033613447: D5^252.10084033613447 + B4^252.10084033613447 + A4^252.10084033613447 + F4^252.10084033613447 + G5^252.10084033613447,
252.10084033613447: D4~252.10084033613447 + G5^252.10084033613447,
252.10084033613447: A5^252.10084033613447,
252.10084033613447: D4~252.10084033613447 + F5^252.10084033613447,
252.10084033613447: D4~252.10084033613447 + A5^252.10084033613447,
252.10084033613447: D4~252.10084033613447 + F5^252.10084033613447,
252.10084033613447: F4^252.10084033613447 + A4^252.10084033613447 + C5^252.10084033613447 + A5^252.10084033613447,
252.10084033613447: D4~252.10084033613447,
252.10084033613447: G5^252.10084033613447,
252.10084033613447: D4~252.10084033613447 + F5^252.10084033613447,
252.10084033613447: D4~252.10084033613447 + G5^252.10084033613447,
252.10084033613447: D4~252.10084033613447,
252.10084033613447: D4~252.10084033613447 + D5^252.10084033613447 + B4^252.10084033613447 + A4^252.10084033613447,
252.10084033613447,
252.10084033613447: A5^252.10084033613447,
252.10084033613447: D4~252.10084033613447 + G5^252.10084033613447 + D5^252.10084033613447 + B4^252.10084033613447 + A4^252.10084033613447,
252.10084033613447: D4~252.10084033613447 + G5^252.10084033613447,
252.10084033613447: D4~252.10084033613447 + A5^252.10084033613447,
252.10084033613447: F5^252.10084033613447,
252.10084033613447: D4~252.10084033613447 + A5^252.10084033613447,
252.10084033613447: D4~252.10084033613447 + F5^252.10084033613447,
252.10084033613447: A5^252.10084033613447,
252.10084033613447: D4~252.10084033613447 + C5^252.10084033613447 + A4^252.10084033613447 + F4^252.10084033613447,
252.10084033613447: G5^252.10084033613447,
252.10084033613447: D4~252.10084033613447 + F5^252.10084033613447,
252.10084033613447: G5^252.10084033613447 + C5^252.10084033613447 + A4^252.10084033613447 + F4^252.10084033613447,
252.10084033613447: D4~252.10084033613447,
252.10084033613447: D4~252.10084033613447,
252.10084033613447: D4~252.10084033613447,
252.10084033613447`


playTune(melody)

const playback = playTune(melody, Infinity)

setSolids([player, block, wall, closedPortal]);

setPushables({
  [player]: [block],
  [block]: [block] 
});

const levels = [
  // Level 1
  map`
f.....wf..
.w.wwf..w.
.....wwww.
ww.w.pwfw.
f.wcwww...
w...wf..ww
k.w.w.w...
wfwf..wwwf`,
  // Level 2
  map`
u.rrrf.ffr
crf...r.rr
r..rr.rf.f
krr..frrr.
.rf.rrrrtf
...r.fb.rr
.r.fr.rprr
f.r..frrrr`,
  // Level 3
  map`
gww.urt..g
..w.r...b.
.b..r.b..g
...wwwwwww
ww.wwwwwww
.b..w..b.w
.www..bw..
.....w..wp`,
  // Level 4
  map`
wrwrf.frtk
rp.w.rf.wc
urfrf.wf.r
.w.wr.fwrw
frbfwrf.wr
fw.f.fw.rw
.f.fwf.fwr
rwrwrwrwrw`,
  // Level 5
  map`
p..fw.ffkw
wwf.wf..ww
w.fww.fwww
wfwwww.fww
f..fw.w.ww
ff..wt..ww
uf.cwf.fww
wwwwwwwwww`,
  // Level 6
  map`
.....w..w.
g..b.w..b.
ww....g...
...b.....g
.....g....
..wpw..wbw
.bwwwb.w..
g........g`,
  // Level 7
  map`
wwwwwwwwww
wp.z..fz.w
w...k...fw
w........w
w.f..f...w
w...f....w
wf.fz...cw
wwwwwwwwww`,
  // Level 8 
  map`
wwwwwwwwwwwww
wp.zwfz.zwzcw
w...w..z.w..w
w...w..w.w..w
w...w.fw.w..w
w...w..w.w..w
w...f..w.f..w
w.z..z.k..f.w
wwwwwwwwwwwww`,
  // Level 9
  map`
rrrrrrrrrr
r...frfrrr
rptbfffrcr
rrrrfffffr
rfffffrrrr
rffrfffurr
rffkrff.rr
rrrrrrrrrr`,
  // Level 10
  map`
wwwwwwwwww
w......w.w
wp....ww.w
wwwww....w
wg.....www
w..bww...w
ww.......w
wwwwwwwwww`,

];

let inMenu = true;
let selectedLevel = 0;
let currentLevel = 0;

const blankMap = map`
............
............
............
............
............
............
............
............`;

function drawMenu() {
  setMap(blankMap);
  clearText();
  addText("PORTAL QUEST", { y: 2, color: color`3` });
  addText(`Level: ${selectedLevel + 1}`, { y: 6, color: color`9` });
  addText("< A | D >", { y: 8, color: color`5` });
  addText("Press J to Play", { y: 12, color: color`L` });
}

function bringPlayerToFront() {
  const p = getFirst(player);
  if (p) {
    const px = p.x;
    const py = p.y;
    p.remove();
    addSprite(px, py, player);
  }
}


function checkHazards() {
  const p = getFirst(player);
  if (!p) return false;
  
  const hazards = [...getAll(hazard), ...getAll(fireballD), ...getAll(fireballU)];
  for (const h of hazards) {
    if (p.x === h.x && p.y === h.y) {
      setMap(levels[currentLevel]);
      bringPlayerToFront();
      return true;
    }
  }
  return false;
}

drawMenu();

onInput("a", () => {
  if (inMenu) {
    if (selectedLevel > 0) selectedLevel--;
    drawMenu();
  } else {
    getFirst(player).x -= 1;
  }
});

onInput("d", () => {
  if (inMenu) {
    if (selectedLevel < levels.length - 1) selectedLevel++;
    drawMenu();
  } else {
    getFirst(player).x += 1;
  }
});

onInput("w", () => {
  if (!inMenu) {
    getFirst(player).y -= 1;
  }
});

onInput("s", () => {
  if (!inMenu) {
    getFirst(player).y += 1;
  }
});

onInput("j", () => {
  if (inMenu) {
    inMenu = false;
    currentLevel = selectedLevel;
    clearText();
    setMap(levels[currentLevel]);
    bringPlayerToFront();
  }
});


setInterval(() => {
  if (inMenu) return;
  const p = getFirst(player);
  if (!p) return;

  const solids = [...getAll(wall), ...getAll(closedPortal)];
  const movingDown = getAll(fireballD);
  const movingUp = getAll(fireballU);

 
  for (const f of movingDown) {
    if (solids.some(s => s.x === f.x && s.y === f.y + 1)) {
      addSprite(f.x, f.y, fireballU); 
      f.remove(); 
    } else {
      f.y += 1;
    }
  }

 
  for (const f of movingUp) {
    if (solids.some(s => s.x === f.x && s.y === f.y - 1)) {
      addSprite(f.x, f.y, fireballD); 
      f.remove(); 
    } else {
      f.y -= 1;
    }
  }

  
  checkHazards();
}, 400); 


afterInput(() => {
  if (inMenu) return; 

  const p = getFirst(player);
  if (!p) return; 

  
  if (checkHazards()) return;

 
  const tA = getFirst(teleporterA);
  const tB = getFirst(teleporterB);

  const onA = tA && p.x === tA.x && p.y === tA.y;
  const onB = tB && p.x === tB.x && p.y === tB.y;

  if (onA && tB) {
    p.x = tB.x;
    p.y = tB.y;
  } else if (onB && tA) {
    p.x = tA.x;
    p.y = tA.y;
  } 

  
  const fakeKeys = getAll(fakeKey);
  for (const fk of fakeKeys) {
    if (p.x === fk.x && p.y === fk.y) {
      fk.remove(); 
    }
  }

  
  const keys = getAll(key);
  const cPortals = getAll(closedPortal);
  
  for (const k of keys) {
    if (p.x === k.x && p.y === k.y) {
      k.remove();
      for (const cp of cPortals) {
        const px = cp.x;
        const py = cp.y;
        cp.remove();
        addSprite(px, py, openPortal);
      }
    }
  }

  const oPortals = getAll(openPortal);
  for (const op of oPortals) {
    if (p.x === op.x && p.y === op.y) {
      loadNextLevel();
      return; 
    }
  }

  
  const goals = getAll(goal);
  if (goals.length > 0) {
    const blocks = getAll(block);
    let allGoalsFilled = true;

    for (const g of goals) {
      const hasBlock = blocks.some(b => b.x === g.x && b.y === g.y);
      if (!hasBlock) {
        allGoalsFilled = false;
        break;
      }
    }

    if (allGoalsFilled) {
      loadNextLevel();
    }
  }
});

function loadNextLevel() {
  currentLevel++;
  if (currentLevel < levels.length) {
    setMap(levels[currentLevel]);
    bringPlayerToFront();
  } else {
    clearText();
    addText("YOU WIN!", { y: 4, color: color`4` });
    addText("Press J for Menu", { y: 10, color: color`L` });
    getFirst(player).remove();
    
    onInput("j", () => {
      inMenu = true;
      selectedLevel = 0;
      drawMenu();
    });
  }
}