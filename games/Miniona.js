/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Miniona
@description: * retro maze game! Play as a Minion-Bob hero, collect favorite bananas🍌, and avoid deadly lava & green enemies👽. Master your jumping skills through neon grey-black & orange tile puzzle blocks. Vibe to retro melody music and find your way out of the detailed maze to the main exit door🚪!.
@author: Arpit Singh
@tags: ['tag1', 'tag2']
@addedOn: 2026-08-23
*/

const player = "p"
const wall = "w"
const coin = "c"
const sky = "s"
const gate = "g"
const enemy = "e" 
const lava = "l"
const block = "b"
const trampoline = "t"
const brick = "k"

const melody = tune`
250: E4^250,
250,
250: G4^250,
250: B4^250,
250: C5^250,
250,
250: B4^250,
250: G4^250,
250: F4^250,
250,
250: A4^250,
250: C5^250,
250: G5^250,
250,
250: B4^250,
250: E4^250,
250: F4^250,
250,
250: A4^250,
250: B4^250,
250: C5^250,
250,
250: F5^250,
250: B4^250,
250: G4^250,
250,
250: F4^250,
250: A4^250,
250: B4^250,
250,
250: G4^250,
250: E4^250`;

const playback = playTune(melody, Infinity);

setLegend(
  [ player, bitmap`
......000.......
....0066600.....
...022202220....
..06202020260...
..00222022200...
..06000300060...
..06666666660...
.0706600066070..
.0070666660700..
.0600000000060..
.0607777777060..
.0007577757000..
..07777777770...
...070000070....
..011L...L110...
.0LLLL...LLLL0..` ],
  [ wall, bitmap`
0000000000000000
0666666666666660
0666666666666660
0666666666666660
06666L1L1L166660
0666612222L66660
06666L2332166660
0000012332L00000
05555L2222155550
055551L1L1L55550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0000000000000000` ],
  [ coin, bitmap`
................
........000.....
......000C0.....
.....060000.....
.....0F60.......
....0FF60.......
....0FF660......
....0FF66600....
....0F66666600..
....0FF666666600
.....0FF66666660
......0FFFFF600.
.......00FFFF0..
.........00000..
................
................` ],
  [ sky, bitmap`
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
7777777777777777` ],
  [ gate, bitmap`
3333333333333333
3LLLLLL3LLLLLLL3
3LLLLLL3LLLLLLL3
3LLLLLL3LLLLLLL3
3LLLLLL3LLLLLLL3
3LLLLLL3LLLLLLL3
311LLLL3LLLLL113
33111LL3LLL11133
311LLLL3LLLLL113
3LLLLLL3LLLLLLL3
3LLLLLL3LLLLLLL3
3LLLLLL3LLLLLLL3
3LLLLLL3LLLLLLL3
3LLLLLL3LLLLLLL3
3LLLLLL3LLLLLLL3
3333333333333333` ],
  [ enemy, bitmap`
.....000000.CCCC
....04444440..3C
...04111111403.C
...0410110140..C
...0411111140...
...0444444440...
...0440000440...
..000444444000..
..040000000040..
..040DDDDDD040..
..000DDDDDD000..
..3.0DDDDDD0....
.3..00000000....
...0L0....0L0...
..0L10....01L0..
.00000....00000.` ],
  [ lava, bitmap`
................
................
................
..9...9...9...9.
.969.969.969.969
9666966696669666
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
6666666666666666
6666666666666666` ],
  [ block, bitmap`
0000000000000000
0000000000000000
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LL11111111LL00
00LL11111111LL00
00LL11999911LL00
00LL11966911LL00
00LL11966911LL00
00LL11999911LL00
00LL11111111LL00
00LL11111111LL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
0000000000000000
0000000000000000` ],
  [ trampoline, bitmap`
................
................
................
................
...0000000000...
..033333333330..
.03333333333330.
0333333333333330
.03333333333330.
..033333333330..
...0000000000...
....0......0....
....0......0....
....0......0....
....0......0....
...LLL....LLL...` ],
  [ brick, bitmap`
8888888888888888
8888888888888888
8833333333333388
8833333333333388
8833CCCCCCCC3388
8833CCCCCCCC3388
8833CC2222CC3388
8833CC2992CC3388
8833CC2992CC3388
8833CC2222CC3388
8833CCCCCCCC3388
8833CCCCCCCC3388
8833333333333388
8833333333333388
8888888888888888
8888888888888888` ]
);

let level = 0;
const levels = [
map`
bbbbbbbbbbbbbbbbbbbbbb
bbsccsssssbsbbbbssbbbb
bsbcssssssbcbssssssccb
bpssbbbbbbbsssbbcsbbbb
bwssssssssssbsbsssscbb
bbbbbbbbbbbbbbbssbbbbb
bsssssssssssssscsbsssb
bsssbbbbbbbbbbsbssscsb
bcbssssssssccbsbsssscb
bbbbssssbbbbsssbbsbbsb
bsbssssssssssssbssssbb
bsssbbbbbcbcbbsbsbsssb
bcbsssccbsbbsbcbcbbbsb
bbbbbbbbbsbbbbbbbbccsb
bbbbbbbbbgbbbbbbbbbbbb`,

map`
bbbbbbbbbbbbbbbbbbbbbb
bbbbccc............bbb
b..bbbbbbbbbbbc....cbb
bc.b..ccc...e.b....b.b
bb...bbbbbbbb..b.....b
b..b......ccc....cbb.b
b.bbbbbbbbbbbb..bbb.cb
bc............b.bb..bb
bbc........bb..c...e.b
bbb.....bbb..bbbb.bb..
b.....bb.c.....b.g..b.
b..b.....b.....b.b...c
bcbb.b..b.cb.b.....b.b
bp.b..cb..b.c.cbc.c.cc
bbbbblblblblblblblblbb`,

map`
bbbbbbbbbbbbbbbbbbbbbb
bc......ccc.........eb
bbbb....bbbb...bbbb..b
bbbbb..b....bcb....c.b
b......c....eb.....b.b
bcc...bbbcbbbcc.....cb
bbbbb....b.c.bb.b..bbb
b...ctbb..cb....bbccbb
b...bb....b....tbbbbbb
b...b..e.bb..p.b....cb
b..........c.b.c...bbb
b..t..b.t..b...b...ccb
b..bbb..bbb.b.b.b.bbbb
bllllllllllllllllgbssb
bbbbbbbbbbbbbbbbbbbbbb`,

map`
eksssssssssssssssssske
kksssssssssssssssssskk
ssssssssssssssssssssss
bsssssbssk.ksbsssssssb
.sssss.sss.ss..ssssss.
.sssss.sss.ss.s.sssss.
.sssss.sss.ss.ss.ssss.
.sssss.sss.ss.sss.sss.
.sssss.sss.ss.ssss.ss.
.ssbss.sss.ss.sssss.s.
.s.s.s.sss.ss.ssssss..
..sss..sss.ss.sssssss.
bsssssbssk.ksbsssssssb
ssssssssssssssssssssss
sssssssssspgssssssssss`
];

let isJumping = false;
let enemyMoveTimer = 0;
const solids = ["w", "b", "t", "k"];

function isSolid(x, y) {
  return getTile(x, y).some(t => solids.includes(t.type));
}

// ORIGINAL JUMP & GRAVITY RESTORED: Jump height wapas normal 2 blocks aur natural speed par hai
onInput("w", () => {
  const p = getFirst(player);
  if (!p || isJumping) return;

  if (isSolid(p.x, p.y + 1)) {
    isJumping = true;
    playTune("100 . 200 . 300");

    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
      if (jumpHeight < 2 && !isSolid(p.x, p.y - 1)) {
        p.y -= 1;
        jumpHeight++;
      } else {
        clearInterval(jumpInterval);
        isJumping = false; // Turant jump khatam, koi artificial hold nahi
      }
    }, 60); 
  }
});

onInput("s", () => {
  if (level === 3) return;
  const p = getFirst(player);
  if (!p) return;
  if (!isSolid(p.x, p.y + 1)) {
    p.y += 1;
    playTune("150"); 
  }
});

onInput("a", () => {
  if (level === 3) return;
  const p = getFirst(player);
  if (!p) return;
  if (!isSolid(p.x - 1, p.y)) {
    p.x -= 1;
    playTune("150"); 
  }
});

onInput("d", () => {
  if (level === 3) return;
  const p = getFirst(player);
  if (!p) return;
  if (!isSolid(p.x + 1, p.y)) {
    p.x += 1;
    playTune("150"); 
  }
});

setMap(levels[level]);
setSolids(solids);

function clearScreenText() {
  getAll("text").forEach(t => t.remove());
}

function resetToLevelOne() {
  level = 0;
  clearScreenText();
  setMap(levels[level]);
  addText("YOU DIED!", { x: 35, y: 50, color: "red" });
  setTimeout(clearScreenText, 2000);
}

function respawnLevelTwo() {
  level = 1;
  clearScreenText();
  setMap(levels[level]);
  addText("LAVA BURNT! RESET LEVEL 2", { x: 5, y: 50, color: "orange" });
  setTimeout(clearScreenText, 2000);
}

function goToNextLevel() {
  level += 1;
  if (level < levels.length) {
    clearScreenText();
    setMap(levels[level]);
    
    if (level === 1) {
      addText("REACHED LEVEL 2", { x: 18, y: 50, color: "blue" });
      setTimeout(clearScreenText, 2000);
    } else if (level === 2) {
      addText("REACHED LEVEL 3", { x: 18, y: 50, color: "blue" });
      setTimeout(clearScreenText, 2000);
    } else if (level === 3) {
      addText("YOU WIN THE GAME!", { x: 20, y: 50, color: "green" });
    }
  }
}

function checkGridTriggers() {
  const p = getFirst(player);
  if (!p) return;

  const items = getTile(p.x, p.y);

  items.forEach(item => {
    if (item.type === coin) {
      item.remove();
      playTune("400 . 600 . 800");
    }
    if (item.type === enemy) {
      playTune("300 200 100");
      resetToLevelOne();
    }
    if (item.type === lava) {
      playTune("200 100 50");
      respawnLevelTwo();
    }
    if (item.type === gate) {
      const remainingCoins = getAll(coin);
      if (remainingCoins.length === 0) {
        playTune("500 600 700 800 1000");
        goToNextLevel();
      }
    }
  });
}

setInterval(() => {
  const p = getFirst(player);
  if (level === 3 || !p) return;

  // ORIGINAL GRAVITY RESTORED: Har frame engine normal gravity apply karega bina kisi delay ke
  if (!isJumping) {
    if (isSolid(p.x, p.y + 1)) {
      if (getTile(p.x, p.y + 1).some(t => t.type === trampoline)) {
        isJumping = true;
        playTune("400 . 600 . 900");
        
        let bounceHeight = 0;
        const bounceInterval = setInterval(() => {
          if (bounceHeight < 5 && !isSolid(p.x, p.y - 1)) {
            p.y -= 1;
            bounceHeight++;
          } else {
            clearInterval(bounceInterval);
            isJumping = false;
          }
        }, 50);
      }
    } else {
      p.y += 1; // Direct standard fall engine speed
    }
  }

  // Enemy AI Patrol System
  if (level === 1 || level === 2) {
    const allEnemies = getAll(enemy);
    if (allEnemies.length > 0) {
      enemyMoveTimer++;
      if (enemyMoveTimer >= 2) {
        enemyMoveTimer = 0;

        allEnemies.forEach(e => {
          const directions = [{x:0, y:-1}, {x:0, y:1}, {x:-1, y:0}, {x:1, y:0}];
          const validMoves = directions.filter(m => !isSolid(e.x + m.x, e.y + m.y));

          if (validMoves.length > 0) {
            const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
            e.x += randomMove.x;
            e.y += randomMove.y;
          }

          if (e.x === p.x && e.y === p.y) {
            playTune("300 200 100");
            resetToLevelOne();
          }
        });
      }
    }
  }

  checkGridTriggers();
}, 150); // Engine cycle set back to 150ms baseline

afterInput(() => {
  checkGridTriggers();
});
