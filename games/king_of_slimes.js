
/* 
@title: king of slimes
@author: Laslu1
@tags: []
@addedOn: 2025-02-19
*/

    const player = "p"
    const box = "b"
    const podloga = "w"
    const dors = "d"
    const klucz = "k"
    const dorsLocked = "l"
    const monster = "m"
    const win = tune`
122.95081967213115: C5/122.95081967213115 + B4/122.95081967213115,
122.95081967213115: B4/122.95081967213115,
122.95081967213115: F5/122.95081967213115,
3565.5737704918033`
    const keY = tune`
78.74015748031496: G5^78.74015748031496,
78.74015748031496: E5^78.74015748031496,
78.74015748031496: A4~78.74015748031496,
78.74015748031496: B4-78.74015748031496,
2204.7244094488187`
    const music = tune`
211.26760563380282: E4^211.26760563380282 + F4-211.26760563380282 + D4/211.26760563380282,
211.26760563380282: B4^211.26760563380282 + A5-211.26760563380282 + C5/211.26760563380282 + G4~211.26760563380282,
211.26760563380282: F4^211.26760563380282 + D4-211.26760563380282 + E4/211.26760563380282 + F5~211.26760563380282,
211.26760563380282: G4~211.26760563380282,
211.26760563380282: D5^211.26760563380282 + A5-211.26760563380282 + E5~211.26760563380282,
211.26760563380282: F5^211.26760563380282 + B4-211.26760563380282 + C5/211.26760563380282 + E4~211.26760563380282,
211.26760563380282: G4^211.26760563380282,
211.26760563380282: F5-211.26760563380282 + E4~211.26760563380282 + A4^211.26760563380282,
211.26760563380282: E4/211.26760563380282 + D5~211.26760563380282,
211.26760563380282: A5^211.26760563380282 + E4^211.26760563380282,
211.26760563380282: E5/211.26760563380282 + A4~211.26760563380282 + D5^211.26760563380282,
211.26760563380282: D4/211.26760563380282 + F4~211.26760563380282 + C4^211.26760563380282,
211.26760563380282: B4/211.26760563380282 + C5/211.26760563380282 + F5~211.26760563380282 + A5^211.26760563380282,
211.26760563380282: F4/211.26760563380282 + A4~211.26760563380282 + D5^211.26760563380282 + E5-211.26760563380282,
211.26760563380282: A4/211.26760563380282 + G5^211.26760563380282 + D5-211.26760563380282,
211.26760563380282: D5/211.26760563380282 + A4/211.26760563380282 + B4~211.26760563380282 + D4-211.26760563380282,
211.26760563380282: B4~211.26760563380282 + F5^211.26760563380282 + D4-211.26760563380282,
211.26760563380282: D5~211.26760563380282 + F5^211.26760563380282 + A5-211.26760563380282,
211.26760563380282: G5^211.26760563380282,
211.26760563380282: F4~211.26760563380282 + D5~211.26760563380282 + G5^211.26760563380282 + C5-211.26760563380282 + E5-211.26760563380282,
211.26760563380282: G5^211.26760563380282,
211.26760563380282: A4~211.26760563380282 + C5~211.26760563380282 + G5^211.26760563380282 + D5-211.26760563380282 + E5/211.26760563380282,
211.26760563380282: F4^211.26760563380282,
211.26760563380282: C5~211.26760563380282 + A4-211.26760563380282 + F5^211.26760563380282,
211.26760563380282: F4~211.26760563380282 + D5-211.26760563380282,
211.26760563380282: E5^211.26760563380282 + B4^211.26760563380282,
211.26760563380282: F4~211.26760563380282 + F5-211.26760563380282 + A4-211.26760563380282,
211.26760563380282: C5~211.26760563380282 + E5~211.26760563380282,
211.26760563380282: E4^211.26760563380282 + D5^211.26760563380282,
211.26760563380282: B4~211.26760563380282 + F5-211.26760563380282 + A5^211.26760563380282,
211.26760563380282: F4~211.26760563380282 + C5~211.26760563380282 + D5-211.26760563380282 + E5^211.26760563380282,
211.26760563380282: E5~211.26760563380282 + A4^211.26760563380282`
setLegend(
	[ player, bitmap`
.000.000000.....
055001L1L1L0....
050011L1L1L0.0..
000001111110010.
0.01L0000000010.
..0L1FFFFF0.010.
..0L1FCFFC0.010.
..01LFCFFC0.010.
...0LFFFFF0.010.
.00000LLL000010.
0L120111L1005550
.0500LL101050F0.
0000000010.0550.
07700111110.00..
07700550050.....
.00.0LL00LL0....` ],

    [ box, bitmap`
L11LLLLLLL1LL0LL
LL100LLLLL11L0LL
LLLL0LLLLLL11LLL
LLLL11LLLLLL1LLL
LLL2LLLL2LLLLLL2
LL2L0LL22LLLLLLL
LLLLL0LLLLL1LLLL
LLL11LLLLL11LLLL
LL1111LLL110LLLL
LLLLL1LLL1LL00LL
LLLLL1LL11LLLLLL
LLLL11LLLLLLLLLL
LLLL1LLLLLL101LL
LLLL10001LLLL111
22LL00111LLLLLLL
L2LLLLLLLLLLLLLL` ],
    [ podloga, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCFC9CCCC
99999C9999999999
999C9999999F9999
CCCCCCCC9CCCCCCC
CCCCCCCCCCCCCCCC
999999999999C999
9999C99999999999
CCCCCCCCCCCCCCCC
CCCCCCCFC9FCCCCC
999F9999C9999999
9999999999999999
CCCCCCF9CCCCCCCC
CCCCC9CCCCCC9CCC
999C99999999C999
9999999999999999` ],
    [ dors, bitmap`
................
................
................
....FFFFFFFF....
...FFFFFFFFFF...
...FFCCCCCCFF...
..FFCCCCCCCCFF..
..FFCCCCCCCCFF..
..FFCCCCCCCCFF..
..FFCCCCCCCCFF..
..FFC0CCCCCCFF..
..FFCCCCCCCCFF..
..FFCCCCCCCCFF..
..FFCCCCCCCCFF..
..FFCCCCCCCCFF..
..FFCCCCCCCCFF..` ],
    [ klucz, bitmap`
................
................
......6666......
.....66..66.....
.....6....6.....
.....6....6.....
.....66..66.....
......6666......
.......6........
.......66.......
.......6........
.......66.......
.......6........
.......66.......
................
................`],
    [ dorsLocked, bitmap`
................
................
................
....66666666....
...6666666666...
...66FFFFFF66...
..66FFFFFFFF66..
..66FFFFFFFF66..
..66FFFFFFFF66..
..66FFFFFFFF66..
..66F0FFFFFF66..
..66FFFFFFFF66..
..66FFFFFFFF66..
..66FFFFFFFF66..
..66FFFFFFFF66..
..66FFFFFFFF66..`],
    [monster, bitmap`
................
................
................
................
................
................
....DDDDDDDD....
...DD444444DD...
..DD40044004DD..
.DD4403440344DD.
DD444444444444DD
D44444444444444D
D44440444444444D
D44440000044444D
D44444444444444D
DDDDDDDDDDDDDDDD`]
)
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
let level = 0 
const levels = [
  map`
p...b.bbbb
bbb....bbb
......bb.b
..bbbb...b
.bb.......
.b..bbbbb.
....bb....
...bbd.bbb`,
  map`
pbd.....l.
.bbbbbbbb.
...b..b...
.b.bb...b.
..m..bb.bb
.bb.....bk
....b.b...
bb.bb.....`,
  map`
bd..bb.bk.
.bb..b.bb.
....b..mb.
bb.l..b...
.bbb.bbb..
..b..b...b
b......b..
p.b.bb.bbb`
]
setMap(levels[level])
setSolids([ player, box, dorsLocked ])
setBackground(podloga);
setPushables({
	[ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y += -1
})
onInput("a", () => {
  getFirst(player).x += -1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("j", () => {
  if (level + 1 < levels.length) { // Sprawdza, czy istnieje kolejny poziom
    level = level + 1;
    setMap(levels[level]);
  } else {
    clearText();
    addText("It is last lvl", { y: 4, color: color`3` });
  }
});
onInput("k", () => {
  level = 0;
  setMap(levels[level]);
  clearText();
});

function checkForPlayer(x, y) {
  let result = false;
  getTile(x, y).map((tile) => {
    if (tile.type == player)
      result = true;
  });
  return result;
}

let monsterDirection = 1;

let movePattern = [
  [-1, 0], [-1, 0], // lewo, lewo
  [0, 1], [0, 1],   // dół, dół
  [1, 0], [1, 0], [1, 0], // prawo, prawo, prawo
  [0, -1], [0, -1], // góra, góra
  [-1, 0]           // lewo
];
let movePatternLevel2 = [
  [-1, 0], [-1, 0], // lewo2
  [0, 1], // dol
  [-1, 0], // lewo
  [0, 1], [0, 1], [0, 1],  // dół3
  [1, 0], [1, 0],   // prawo2
  [0, -1],  //gora
  [1, 0], [1, 0], //prawo3
  [0, -1], [0, -1], //gora3
  [-1, 0],
  [0, -1],
];
const playback = playTune(music, Infinity)
let moveIndex = 0;
let moveIndexLevel2 = 0;

setInterval(() => {
  if (level == 1) {
    let monsterSprite = getFirst(monster);
    
    if (monsterSprite) {
      let [dx, dy] = movePattern[moveIndex];
      let newX = monsterSprite.x + dx;
      let newY = monsterSprite.y + dy;

      
      if (!checkForPlayer(newX, newY)) {
        clearTile(monsterSprite.x, monsterSprite.y);
        addSprite(newX, newY, monster);
      }

      
      if (checkForPlayer(monsterSprite.x + dx, monsterSprite.y + dy)) {
        
        addText("you are dead", { y: 4, color: color`3` });
      }



      moveIndex = (moveIndex + 1) % movePattern.length;
    }
  }
  else if (level == 2) { // Poziom 3 (liczone od 0)
    let monsterSprite = getFirst(monster);

    if (monsterSprite) {
      let [dx, dy] = movePatternLevel2[moveIndexLevel2];
      let newX = monsterSprite.x + dx;
      let newY = monsterSprite.y + dy;

      if (!checkForPlayer(newX, newY)) {
        clearTile(monsterSprite.x, monsterSprite.y);
        addSprite(newX, newY, monster);
      }

      if (checkForPlayer(newX, newY)) {
        addText("you are dead", { y: 4, color: color`3` });
      }

      moveIndexLevel2 = (moveIndexLevel2 + 1) % movePatternLevel2.length;
    }
  }
}, 200);

//clear text
setInterval(() => {
  clearText()
}, 2000);
  

afterInput(() => {
    const goalsCovered = tilesWith(player, dors); // tiles that both contain the player and goal
    const getKey = tilesWith(player, klucz);
    const noKey = tilesWith(player, dorsLocked);
    // if at least one goal is overlapping with a player, proceed to the next level
    if (goalsCovered.length >= 1) {
        // increase the current level number
        level = level + 1;
        playTune(win);
        clearText();

        // check if current level number is valid
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            clearText();
            addText("u won!!!", { y: 4, color: color`2` });
        }
    }
    if (getKey.length >= 1) {
      getFirst(klucz).remove();
      getFirst(dorsLocked).remove();
      addText("you got key", { y: 4, color: color`6` });
      playTune(keY);
    }
});
  