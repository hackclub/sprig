  /*
@title: under_fire
@author: alex_dvc
@tags: ['strategy']
@addedOn: 2023-02-08
*/

const player = "p";
const floor = "f";
const space = "s";
const damagedFloor = "d";
const wall = "w";
const laser = "l";
const laserImp = "i";
const box = "b";
const brokenFloor = "r";
const explosion = "e";
const starNight = "t";
const gun = "g";
const blueLaser = "n";
const controlLaser = "c";
const engine = "a";

setLegend(
  [ space, bitmap`
0000000000000000
0000000000000200
0000000000000000
0000200000000000
0000000000000000
0000000000000000
0000000020000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0002000000000000
0000000000002000
0000000000000000
0000000000000000` ],
  [ explosion, bitmap`
.0...........0..
00..000.00......
...03330330.0..0
...03993993030..
..039969699330..
.039966666930...
.0396662266930..
.03996222269930.
..0396222266930.
..039662266930..
.0399966669930..
..03339699930...
..030039939930..
...0..0330330...
.0.....00.00..0.
................` ],
  [ player, bitmap`
................
.....1..........
......0000......
.....000775.....
...1.007775.....
...0.007775.LLL.
...0..0055...3..
...00036000013..
.....L030....3..
....6L000.......
.....L000.......
......000.......
......0.0.......
......0.0.......
.....11.11......
................` ],
  [ brokenFloor, bitmap`
1111111111111111
1222220222222221
1202022020222021
1220002000020221
1200000000000021
1200000020000021
1220000000000221
1200000000002201
1222000000000021
1220000000200221
1200020000000021
1200000000000021
1220200002200021
1202202022020221
1222022220222021
1111111111111111` ],
  [ damagedFloor, bitmap`
1111111111111111
1222222222222221
1002222222222021
1220002222220221
1222220222222221
1222222220222221
1222222220222221
1222222222022221
1222220222022221
1222002222222221
1200222222222221
1222220222220021
1222222022002221
1222222022222221
1222222202222221
1111111111111111` ],
  [ controlLaser, bitmap`
1111111111111111
1222222222222221
1222222222222221
1222222222222221
1222222222622221
1222222222L22221
1222222222L22221
1222222222L22221
1222222222L22221
1220LLLLLLLL0221
122L33L79L44L221
122L33L97L4DL221
122LLLLLLLLLL221
122LLLLLLLLLL221
1220LLLLLLLL0221
1111111111111111` ],
  [ floor, bitmap`
1111111111111111
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1111111111111111` ],
  [ gun, bitmap`
.......77.......
......7777......
.....177771.....
.....1.77.1.....
.....L1..1L.....
.....L1..1L.....
.....LL11LL.....
...LLLLLLLLLL...
..LL.LLLLLL.LL..
..LLL.LLLL.LLL..
..LL.L6556L.LL..
..LLL.5225.LLL..
..LL.L5225L.LL..
.LLLL.6556.LLLL.
11LL11111111LL11
11LL11111111LL11` ],
  [ wall, bitmap`
1111111111111111
11LLLLLLLLLLLL11
1LCLLLLLLLLLLCL1
1LLCLLLLLLLLCLL1
1LLLCLLLLLLCLLL1
1LLLLCLLLLCLLLL1
1LLLLLCLLCLLLLL1
1LLLLLLCCLLLLLL1
1LLLLLLCCLLLLLL1
1LLLLLCLLCLLLLL1
1LLLLCLLLLCLLLL1
1LLLCLLLLLLCLLL1
1LLCLLLLLLLLCLL1
1LCLLLLLLLLLLCL1
11LLLLLLLLLLLL11
1111111111111111` ],
  [ laser, bitmap`
...9966226699...
..69966226699.6.
...9966226699...
...99662266999..
.9.9966226699...
...9966226699...
...9966226699...
...9966226699.9.
..99966226699...
...9966226699...
...9966226699...
.6.99662266996..
...9966226699...
...9966226699...
..99966226699.9.
...9966226699...` ],
  [ laserImp, bitmap`
...9966226699.9.
.6.9966226699.9.
...9966226699...
9..9966226699..6
9..9966226699..9
...9966226699..9
.6.9966226699...
.969966226699.6.
.99996622669969.
..9996622669999.
...99662666999..
5..9966226699..5
759.99662699..57
575..996699.9575
75759.9999..5757
.75757577575757.` ],
  [ blueLaser, bitmap`
...5577227755...
..75577227755.7.
...5577227755...
...55772277555..
.5.5577227755...
...5577227755...
...5577227755...
...5577227755.5.
..55577227755...
...5577227755...
...5577227755...
.7.55772277557..
...5577227755...
...5577227755...
..55577227755.5.
...5577227755...` ],
  [ box, bitmap`
1111111111111111
1222222222222221
1222222222222221
1222222222222221
1220000000000221
1220L333333L0221
1220330000330221
1220333333330221
1220300330030221
1220333333330221
1220300330030221
1220333333330221
1220300330030221
1220333333330221
1220L333333L0221
1111111111111111` ],
  [ starNight, bitmap`
5555555555555555
5555555552556565
5556555555555655
5555255555656565
5555656552555555
5500565655555555
5500652555556555
5000065555565555
5000055556555505
0000005525565500
0000005555555000
0000005555555000
0000005000550000
0000005000000000
0000000000000000
0000000000000000` ],
  [ engine, bitmap`
................
.............LL.
.......3333.LLLL
.....33333333LLL
...33339999333LL
..3339999999933L
.33999966669993L
339996666666699L
339996666666699L
.33999966669993L
..3339999999933L
...33339999333LL
.....33333333LLL
.......3333.LLLL
.............LL.
................` ]
);


setSolids([player, wall]);

setBackground(space);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let level = 0;
const levels = [
  map`
................
..............d.
................
................
..............b.
................
................
.............c..
................
................
................
................
................
................
................
.......t........`,
  map`
................
................
................
................
...wwwww........
....aww.........
....wfwwwww.....
...wwfffwffww...
..wffwwfffwffw..
.awfffffffwbffw.
..wffwwffffffw..
...wwfffwffww...
....wfwwwww.....
....aww.........
...wwwww........
................`
];

// tunes
const melody = tune`
179.64071856287424,
179.64071856287424: g4~179.64071856287424,
179.64071856287424: c4^179.64071856287424 + g4/179.64071856287424,
179.64071856287424: g5~179.64071856287424,
179.64071856287424: d4^179.64071856287424 + g5/179.64071856287424,
179.64071856287424: g4~179.64071856287424,
179.64071856287424: c4^179.64071856287424 + g4/179.64071856287424,
179.64071856287424: e5~179.64071856287424,
179.64071856287424: e4^179.64071856287424 + e5/179.64071856287424,
179.64071856287424: g4~179.64071856287424,
179.64071856287424: d4^179.64071856287424 + g4/179.64071856287424,
179.64071856287424: c5/179.64071856287424,
179.64071856287424: b4/179.64071856287424 + c4^179.64071856287424,
179.64071856287424: a4/179.64071856287424 + c4^179.64071856287424,
179.64071856287424: g4/179.64071856287424 + d4^179.64071856287424,
179.64071856287424: g4/179.64071856287424 + e4^179.64071856287424,
179.64071856287424,
179.64071856287424: g5~179.64071856287424 + d4^179.64071856287424,
179.64071856287424: f4^179.64071856287424 + g5/179.64071856287424,
179.64071856287424: e5~179.64071856287424 + f4^179.64071856287424,
179.64071856287424: e4^179.64071856287424 + e5/179.64071856287424,
179.64071856287424: d5~179.64071856287424 + e4^179.64071856287424,
179.64071856287424: d4^179.64071856287424 + d5/179.64071856287424,
179.64071856287424: c5~179.64071856287424 + d4^179.64071856287424,
179.64071856287424: c4^179.64071856287424 + c5/179.64071856287424,
179.64071856287424: a4~179.64071856287424 + c4^179.64071856287424,
179.64071856287424: c4^179.64071856287424 + a4/179.64071856287424,
179.64071856287424: g4~179.64071856287424 + c4^179.64071856287424,
179.64071856287424: d4^179.64071856287424 + g4/179.64071856287424,
179.64071856287424: g4~179.64071856287424 + d4^179.64071856287424,
179.64071856287424: d4-179.64071856287424 + g4-179.64071856287424,
179.64071856287424: d4-179.64071856287424 + g4-179.64071856287424`;
const gameOver = tune`
535.7142857142857: b4/535.7142857142857 + c5/535.7142857142857 + f4-535.7142857142857,
535.7142857142857: b4/535.7142857142857 + a4/535.7142857142857 + e4-535.7142857142857,
535.7142857142857: a4/535.7142857142857 + g4/535.7142857142857 + d4-535.7142857142857,
535.7142857142857: g4/535.7142857142857 + f4/535.7142857142857 + c4-535.7142857142857,
14999.999999999998`;
const replenish = tune`
97.0873786407767: c5^97.0873786407767,
97.0873786407767: e5^97.0873786407767,
97.0873786407767: g5^97.0873786407767,
2815.5339805825242`;
const repair = tune`
90.6344410876133: e4^90.6344410876133,
90.6344410876133,
90.6344410876133: e4^90.6344410876133,
2628.3987915407856`;
const win = tune`
201.34228187919464: g4^201.34228187919464 + c5/201.34228187919464 + d4~201.34228187919464,
402.6845637583893,
201.34228187919464: g4^201.34228187919464 + c5/201.34228187919464 + d4~201.34228187919464,
201.34228187919464: g4^201.34228187919464 + c5/201.34228187919464 + d4~201.34228187919464,
201.34228187919464,
201.34228187919464: b4^201.34228187919464 + e5/201.34228187919464 + f4~201.34228187919464,
201.34228187919464,
201.34228187919464: b4^201.34228187919464 + e5/201.34228187919464 + f4~201.34228187919464,
201.34228187919464,
201.34228187919464: g4~201.34228187919464 + c5^201.34228187919464 + g5/201.34228187919464,
4228.187919463087`;
const melody2 = tune`
176.47058823529412: c5~176.47058823529412,
176.47058823529412: a4~176.47058823529412,
176.47058823529412: f4~176.47058823529412,
176.47058823529412: d4~176.47058823529412,
176.47058823529412: f4~176.47058823529412,
176.47058823529412: a4~176.47058823529412,
176.47058823529412: c5~176.47058823529412,
176.47058823529412: b4~176.47058823529412,
176.47058823529412: g4~176.47058823529412,
176.47058823529412: e4~176.47058823529412,
176.47058823529412: c4~176.47058823529412,
176.47058823529412: e4~176.47058823529412,
176.47058823529412: b4~176.47058823529412,
176.47058823529412: a4~176.47058823529412,
176.47058823529412: f4~176.47058823529412,
176.47058823529412: d4~176.47058823529412,
176.47058823529412: b4~176.47058823529412,
176.47058823529412: a4~176.47058823529412,
176.47058823529412: f4~176.47058823529412,
176.47058823529412: d4~176.47058823529412,
176.47058823529412: f4~176.47058823529412,
176.47058823529412: a4~176.47058823529412,
176.47058823529412: d5~176.47058823529412,
176.47058823529412: b4~176.47058823529412,
176.47058823529412: g4~176.47058823529412,
176.47058823529412: e4~176.47058823529412,
176.47058823529412: g4~176.47058823529412,
176.47058823529412: b4~176.47058823529412,
176.47058823529412: a4~176.47058823529412,
176.47058823529412: f4~176.47058823529412,
176.47058823529412: d4~176.47058823529412,
176.47058823529412: c4~176.47058823529412`;
const laserShot = tune`
153.84615384615384: e4/153.84615384615384 + d4/153.84615384615384,
4769.230769230769`;


// main menu screen
addText(`k to repair ->`, {
  x: 2,
  y: 1,
  color: color`6`
})
addText(`i to refill ->`, {
  x: 2,
  y: 4,
  color: color`9`
})
addText(`l to fire ->`, {
  x: 2,
  y: 7,
  color: color`6`
})
addText(`Play to the End!`, {
  x: 2,
  y: 10,
  color: color`9`
})
addText(`j to start game!`, {
  x: 2,
  y: 13,
  color: color`6`
})
const playback = playTune(melody2, Infinity);


setMap(levels[level]);


// changeable variables
let phase1 = false;
let phase2 = false;
let gameStart = false;
let mats = 5;
let health = 100;
let enemyHealth = 100;
let gameStop = false;
let dmgCount = 0;
let score = 0;
let fireLaser = true;
let postMisfire = false;



// CONTROLS
onInput("s", () => {
  if (gameStop == false && level != 0) {
    getFirst(player).y += 1
  }
});

onInput("w", () => {
  if (gameStop == false && level != 0) {
    getFirst(player).y -= 1
  }
});

onInput("a", () => {
  if (gameStop == false && level != 0) {
    getFirst(player).x -= 1
  }
});

onInput("d", () => {
  if (gameStop == false && level != 0) {
    getFirst(player).x += 1
  }
});

onInput("i", () => {
  if (gameStop == false && level != 0) {
    if (getFirst(player).x == getFirst(box).x && getFirst(player).y == getFirst(box).y) {
      mats = 5;
      playTune(replenish);
    }
  }
});

onInput("k", () => {
  if (gameStop == false && level != 0) {
    if ((tilesWith(player, damagedFloor) || tilesWith(player, brokenFloor)) && mats > 0) {
      let dmg = getAll(damagedFloor);
      if (tilesWith(player, brokenFloor)) {
        let brokenList = getAll(brokenFloor);
        for (let h=0; h<brokenList.length; h++)
          dmg.push(brokenList[h]);
      }
      for (let i=0; i<dmg.length; i++) {
        if (dmg[i].x == getFirst(player).x && dmg[i].y == getFirst(player).y){
          dmg[i].remove();
          mats--;
          playTune(repair);
          score++;
        }
      }
    }
  }
});

onInput("l", () => {
  if (gameStop == false && fireLaser && score >= 50) {
    if (getFirst(player).x == getFirst(controlLaser).x && getFirst(player).y == getFirst(controlLaser).y) {
      firingMaBlue();
    }
  }
});

onInput("j", () => {
  if (level == 0 ){
    gameStart = true;
    level++;
    setMap(levels[level]);
    addSprite(9, 9, player);
    phase1 = true;
  }
});
// CONTROLS

// FUNCTIONS

async function firingMaBlue() {
  fireLaser = false;
  let ranB = Math.floor(Math.random() * 4);
  if (ranB == 1) {
    playTune(laserShot);
    for (let i=0; i<6; i++)
      addSprite(12, i, blueLaser);
    enemyHealth -= 10;
    let allLasersB = getAll(blueLaser);
    await sleep(500);
    for (let i = 0; i<allLasersB.length; i++)
      allLasersB[i].remove();
  }
  else {
    postMisfire = true;
    await sleep(700);
    postMisfire = false;
  }
  await sleep(2000);
  fireLaser = true;
}

function addDmg(floorType) {
  let floors = getAll(floor);
  let ranD = Math.floor(Math.random() * floors.length);
  addSprite(floors[ranD].x, floors[ranD].y, floorType);
}

async function firingMaLaser() {
  let ranF = Math.floor(Math.random() * 3);
  playTune(laserShot);
  if (ranF == 0) {
    for (let i=0; i<3; i++) {
      addSprite(5, i, laser);
    }
    addSprite(5, 3, laserImp);
  }
  else if (ranF == 1) {
    for (let i=0; i<5; i++) {
      addSprite(9, i, laser);
    }
    addSprite(9, 5, laserImp);
  }
  else {
    for (let i=0; i<6; i++) {
      addSprite(11, i, laser);
    }
    addSprite(11, 6, laserImp);
  }
  addDmg(damagedFloor);
  let allLasers = getAll(laser);
  await sleep(500);
  for (let i = 0; i<allLasers.length; i++)
    allLasers[i].remove();
  getFirst(laserImp).remove();
}

async function endGameBoom() {
  let x = 6;
  addSprite(6, 6, explosion);
  await sleep(600);
  addSprite(7, 8, explosion);
  await sleep(600);
  addSprite(9, 10, explosion);
  await sleep(600);
  addSprite(10, 12, explosion);
  await sleep(1000);
  for (let i=6; i<=12; i++) {
    if(i % 2 != 0)
      x+=1;
    addSprite(x, i, space);
  }
  let h = 7;
  for (let i=6; i<=12; i++) {
    if(i % 2 != 0)
      h+=1;
    addSprite(h, i, space);
  }
  await sleep(3000);
  clearText();
  addText(`Game Over`, {
    x: 3,
    y: 1,
    color: color`3`
  })
  addText(`Score: ${score}`, {
    x: 3,
    y: 3,
    color: color`3`
  })
  playTune(gameOver);
}
// FUNCTIONS


// fire laser and add broken floors
setInterval(() => {
  if (gameStop)
    return;
  if(phase1) {
    firingMaLaser();
    if(getAll(damagedFloor).length >= 5) {
      addDmg(brokenFloor);
      health -= 20;
    }
  }
}, 2200)

setInterval(() => {
  if (gameStop)
    return;
  if(phase2) {
    firingMaLaser();
    if(getAll(damagedFloor).length >= 5) {
      addDmg(brokenFloor);
      health -= 20;
    }
  }
}, 1100)



// post stats
setInterval(() => {
  if (gameStop)
    return;
  if (gameStart) {
    clearText();
    addText(`Material: ${mats}`, {
      x: 3, 
      y: 1, 
      color: color`7`
    })
    addText(`HP: ${health}`, {
      x: 3,
      y: 3,
      color: color`4`
    })
    if (score >= 50) {
      addText(`Enemy HP: ${enemyHealth}`, {
        x: 3,
        y: 14,
        color: color`3`
      })
    }
    if (postMisfire) {
      addText(`Misfire!`, {
        x: 10,
        y: 3,
        color: color`6`
      })
    }
  }
}, 30)


// game condition check
setInterval(() => {
  if(gameStop)
    return;
  if (health == 0) {
    playback.end()
    endGameBoom();
    gameStop = true;
  }
  if (score == 30) {
    phase1 = false;
    phase2 = true;
    addText(`Attacks Incoming!`, {
      x: 3,
      y: 7,
      color: color`6`
    })
  }
  if (score == 50) {
    phase1 = true;
    phase2 = false;
    level++;
    addText(`Laser Added!`, {
      x: 4,
      y: 7,
      color: color`5`
    })
    clearTile(5, 12);
    addSprite(5, 12, controlLaser);
    clearTile(12, 6);
    addSprite(12, 6, gun);
  }
  if (enemyHealth == 0) {
    gameStop = true;
    clearText();
    addText(`You Win!`, {
      x: 3,
      y: 1,
      color: color`7`
    })
    addText(`Score: ${score}`, {
      x: 3,
      y: 3,
      color: color`7`
    })
    playback.end()
    playTune(win);
  }
}, 30);
