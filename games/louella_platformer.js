
/*
@title: louella_platformer
@description: The wind princess Louella is search of her robin companion, Noella, who has flown away. She embarks a perilous journey to find her robin. Help her reach Noella by pushing the boulders, avoiding the spikes, and navigating the obstacles!
@author: xiaoran_y
@tags: ['platformer', 'adventure']
@addedOn: 2026-11-09
*/

const louella = "p"
const robin = "r"
const sky = "k"
const grass = "g"
const branchend = "e"
const boulder = "b"
const cloud = "c"
const spike = "x"


const maxJumps = 2;

const bgm = tune`
230.76923076923077: E5^230.76923076923077 + G4~230.76923076923077 + G5/230.76923076923077,
230.76923076923077: C5^230.76923076923077 + C4-230.76923076923077,
230.76923076923077: D5^230.76923076923077,
230.76923076923077: G4^230.76923076923077 + E4~230.76923076923077,
230.76923076923077: G5^230.76923076923077 + G4~230.76923076923077 + C5/230.76923076923077 + C4-230.76923076923077,
230.76923076923077: E5^230.76923076923077,
230.76923076923077: F5^230.76923076923077,
230.76923076923077: D5^230.76923076923077 + E4~230.76923076923077 + G5/230.76923076923077 + C4-230.76923076923077,
230.76923076923077: C5^230.76923076923077 + C4~230.76923076923077 + A5/230.76923076923077,
230.76923076923077,
230.76923076923077: C4-230.76923076923077,
230.76923076923077: E5^230.76923076923077 + E4~230.76923076923077 + F5/230.76923076923077,
230.76923076923077: G5^230.76923076923077 + G4~230.76923076923077 + E5/230.76923076923077,
230.76923076923077: C4-230.76923076923077,
230.76923076923077: D5/230.76923076923077,
230.76923076923077,
230.76923076923077: G5^230.76923076923077 + E4~230.76923076923077 + C5/230.76923076923077 + C4-230.76923076923077,
230.76923076923077,
230.76923076923077: G5^230.76923076923077 + B4/230.76923076923077,
230.76923076923077: E5^230.76923076923077 + C4~230.76923076923077 + C5/230.76923076923077,
230.76923076923077: F5/230.76923076923077 + G4~230.76923076923077,
230.76923076923077: D4~230.76923076923077,
230.76923076923077: F5^230.76923076923077 + C4~230.76923076923077 + D5/230.76923076923077,
230.76923076923077: D5^230.76923076923077 + E4~230.76923076923077 + C5/230.76923076923077,
230.76923076923077: C5^230.76923076923077 + G4~230.76923076923077,
230.76923076923077: E5^230.76923076923077 + G4~230.76923076923077 + B4/230.76923076923077 + C4-230.76923076923077,
230.76923076923077: D5^230.76923076923077 + G4~230.76923076923077,
230.76923076923077: G4^230.76923076923077 + C5/230.76923076923077,
230.76923076923077: C5^230.76923076923077 + C4-230.76923076923077,
230.76923076923077: D5/230.76923076923077,
230.76923076923077: E4~230.76923076923077 + E5/230.76923076923077,
230.76923076923077: D5^230.76923076923077 + F4~230.76923076923077 + C4-230.76923076923077`
const win = tune`
250: G5^250 + D5~250,
250: A5^250 + E5~250,
250: G5^250 + D5~250,
250: E5^250 + B4~250,
250,
250: C5^250 + G4~250,
250,
250: G4^250 + D4~250,
250: A4^250 + E4~250,
250: B4^250 + F4~250,
250: C5^250 + G4~250,
250: A4^250 + E4~250,
250: G4^250 + D4~250,
250,
250: G5^250 + D5~250,
250: G5^250 + D5~250,
250: G5^250 + D5~250,
250: A5^250 + E5~250,
250: G5^250 + D5~250,
250: E5^250 + B4~250,
250,
250: C5^250 + G4~250,
250,
250: G4^250 + D4~250,
250: A4^250 + E4~250,
250: B4^250 + F4~250,
250: C5^250 + G4~250,
250: B4^250 + F4~250,
250: C5^250 + G4~250,
250,
250: G4^250 + D4~250,
250: G4^250 + D4~250`

let jumpCount = 0;
let playback = playTune(bgm, Infinity)

setLegend(
  [louella, bitmap`
....9...........
...939CCCCC.....
...330CCCCC.....
....C0CC262.....
....C0C6767.....
....CCC6666.....
....C9CLLLC.....
....93111139....
....C611116.....
.....677776.....
.....6L11L6.....
.....LLLLLL.....
.....LL00LL.....
......6..6......
......C..C......
......C..C......`],
  [robin, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
.......LLL......
......6L0LLL....
.......999LLLL..
........9999....`],
  [sky, bitmap`
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
  [grass, bitmap`
4444444D44444444
4D444444D4444444
44D444444444D444
4444444D44444D44
44444444D4444444
4DD44DD44D444444
DDDDDFFD4DDDDDD4
DFFFFFFFDFFFFFFD
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
CCCCCCCCCCCCCCCC`],
  [branchend, bitmap`
CCCCCCCCCCC.....
....CCCCCCCCCCCC
........CCCCCCCC
.............CCC
................
................
................
................
................
................
................
................
................
................
................
................`],
  [boulder, bitmap`
....LLLLLLLL....
...L11111111L...
...L111111111L..
..L11111111111L.
.L111111111111L.
.L111111111111L.
L11111111111111L
L11111111111111L
L1LLLL111111111L
LL1111L11111111L
L111111LLL11111L
L111111111L1111L
L1111111111LL11L
L111111111111L1L
L111111111111L1L
LLLLLLLLLLLLLLLL`],
  [cloud, bitmap`
...2222222222...
..222222222222..
222222222222222.
2222222222222222
1222222222222222
1222222222222222
1222222222222222
112222222222222.
..11111111111...
................
................
................
................
................
................
................`],
  [spike, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
..3...3...3...3.
.F3F.F3F.F3F.F3F
3F3F3F3F3F3F3F3F
3F3F3F3F3F3F3F3F`]
)

setBackground(sky)

setSolids([louella, boulder, cloud, branchend, grass])
setPushables({
  [louella]:[boulder]
})


let level = 0
const levels = [
  map`
............
............
............
...........r
.........c.e
p..b.b......
gggggggggggg`,
  map`
............
............
............
.....c......
...c...c....
p...bxx.bbbr
gggggggggggg`,
  map`
............
p..........r
c.....c..c.e
...c........
............
xxxxxxxxxxxx
gggggggggggg`,
  map`
............
...........r
......c..c.e
...c........
............
p.b.b.......
gggggggggggg`,
  map`
............
.......x....
....cc.ccccc
..c.c.......
....ccccc.cx
..cc....c.ce
pb.....bb..r
gggggggggggg`,
  map`
kkkkkkkkkkkr
kkkkkkkxkkkc
kkkkkkkckckk
kkkkckckk.kk
kkkcxxxxxxkk
pkbbbbbbbbxx
gggggggggggg`,
  map`
.........c.r
.cccc.cc.c.c
....cxc..c.c
ccc.ccc.cc.c
......c...xc
pccccccccccc
gggggggggggg`
]

setMap(levels[level])

function findSprite(targetX, targetY) {
  const assets = getTile(targetX, targetY);
  let blocked = false;
  for(let i = 0; i < assets.length; i++) {
    const tile = assets[i];
    if (tile.type === "g") blocked = true;
    if (tile.type === "e") blocked = true;
    if (tile.type === "c") blocked = true;
    if (tile.type === "b") blocked = true;
  }
  return blocked;
}

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) setMap(currentLevel);
});

onInput("w", () => {
  const player = getFirst(louella);
  if (!player) return;

  if (jumpCount < maxJumps) {
    if (!findSprite(player.x, player.y - 1)) {
      player.y -= 2;     
      jumpCount += 1;    
    }
  }
})

onInput("a", () => {
  const player = getFirst(louella).x += -1
  if (!player) return;
    player.x -= 1;
})

onInput("d", () => {
  const player = getFirst(louella).x += 1
  if (!player) return;
    player.x += 1;
})

setInterval(()=> {
  applyGravity();
}, 150);

function applyGravity() {
  const player = getFirst(louella);
  if (!player) return;

  
  const spikeKill = tilesWith(spike, louella);
    if (spikeKill.length > 0) {
      const currentLevel = levels[level];
      setMap(currentLevel);
    }

  const elementBelow = getTile(player.x, player.y + 1);
  let isGround = false;
  for (let i = 0; i < elementBelow.length; i++) {
    const sprite = elementBelow[i];
    if (sprite.type === "g") { isGround = true; }
    if (sprite.type === "b") { isGround = true; }
    if (sprite.type === "c") { isGround = true; }
    if (sprite.type === "e") { isGround = true; }
  }
   if (!isGround) {
    player.y += 1;
  } else {
    jumpCount = 0;
  }
}


afterInput(() => {
  const spikeKill = tilesWith(spike, louella);
  if (spikeKill.length > 0) {
      const currentLevel = levels[level];
      setMap(currentLevel);
    }
  const getRobin = tilesWith(robin, louella);
  if (getRobin.length > 0) {
    level = level + 1;
    const currentLevel = levels[level];



    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`0` });
      playback.end();
      playback = playTune(win, Infinity);
    }
  }
})
