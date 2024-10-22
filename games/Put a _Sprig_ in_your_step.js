/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Put a Sprig in your step
@author: grhu
@tags: []
@addedOn: 2024-10-22
*/


//keys
const player = "p"
const grass = "g"
const sky = "s"
const leaf = "l"

const background = "b"
const platform = "m"
const dirtwall = "d"
const thorns = "t"

//sprites
setLegend(
  [player, bitmap`
.....4D.44......
.......D........
.....224222.....
....22222222....
...2200220022...
...2220222022...
...2222222222...
...2222002222...
...2220220222...
....22200222....
.....222222.....
......2..2......
......4..4......
......4D.F4.....
......CC.CC.....
......CC.CC.....`],
  [grass, bitmap`
4444444444444444
DD44DD44DD44DD44
DDDDDDDDDDDDDDDD
FFFFFFFFFFFFFFFF
FFCCFFCCFFCCFFCC
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
  [background, bitmap`
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
  [platform, bitmap`
.DDDDDDDDDDDDDD.
DD444444444444DD
D44CCCCCCCCCC44D
D4CCCCCCCCCCCC4D
CCCCCCCCCCCCCCCC
.CCCCCCCCCCCCCC.
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
  [dirtwall, bitmap`
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
  [leaf, bitmap`
................
................
................
................
................
................
................
................
................
...........DDD..
..........D44D..
.........D4D4D..
.........DD4D...
........D4DD....
...D....DD......
....DDDD........`],
  [thorns, bitmap`
................
....1.....1.....
...11.....11....
...1L.....L1....
...1L.....L1....
...1L.....LL1...
...LL.....FL1...
...LF....1FLL1..
..1LF....1FFL1..
..LFF1..1LFFF1..
..LF41..1LF4FF..
..F441..LF444F..
.1F44L..FF44DF..
.LFD4FFF.F4DD4..
FF4DD44F.44DD4F.
444DDDDD.DDDDD4.`],
);

setSolids([grass, player, platform, dirtwall], )

//levels of the game
let level = 0
const levels = [
  map`
d....dd
d..g.dd
..md...
pm.d..l
ggtdtmg`,
  map`
dddd...
d.....l
....mmg
..m.ttd
m...mmd
.mm...d
....m.d
pt.m..d
ggggggd`,
  map`
dddddddddd
dddddddddd
..........
m.g..m..m.
..d......l
pmdttttttt
gggggggggg`,
  map`
p.d...dtd.
g...g....l
dtgtdtgtgt`,
  map`
pd.....
.d..mdl
.dm..d.
....mdt
tmmttdm`,
  map`
p....d
gggg..
ddd...
l.....
tmttmm`,
  map`
l..d..l
tm...tg
t...mtd
t..ggtd
gm...td
p....td
ggggggd`,
  map`
.....
.....
.....
..p..
ggggg`,
  
]

setMap(levels[level]);

//backgroung? can't remember tbh.
const checkLevelTransition = () => {
  console.log("Checking level transition. Player X:", getFirst(player).x, "Width:", width() - 1);

  if (getFirst(player).x === width() - 1) {
    console.log("Transitioning to next level.");

    nextLevel();
    if (level < levels.length) {
      setMap(levels[level]);
      setBackground(background);
    } else {
      // Handle game completion or any other logic here
    }
  }
};

function nextLevel() {
  level++
}

//background
setBackground("b");

//player input and controls
setPushables({
  [player]: []
})
onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {

})

//falling code
let jumps = 1000;

const jump = async () => {
  await createArray(3).reduce(async (promise) => {
    await promise;

    getFirst(player).y--;


    await wait(100);
  }, Promise.resolve());

  await resetGravity();
};
setInterval(() => {
  if (getFirst(player).y === 10) return;

  getFirst(player).y++;
}, 500);

//next level leaf thingy
setInterval(() => {
  if (tilesWith(leaf, player).length >= 1) {
    // Check if the player is on the leaf tile
    const playerTile = getTile(getFirst(player).x, getFirst(player).y);
    if (playerTile.some(sprite => sprite.type === leaf)) {
      // Reset player position and move to the next level
      getFirst(player).x = 0;
      getFirst(player).y = 0;
      level++;
      if (level < levels.length) {
        setMap(levels[level]);
        setBackground(background);
      } else {
        // Handle game completion or any other logic here
      }
    }
  }
}, 100);

//thorn kills and resets player
setInterval(() => {
  if (tilesWith(thorns, player).length >= 1) {
    // Check if the player is on the thorns tile
    const playerTile = getTile(getFirst(player).x, getFirst(player).y);
    if (playerTile.some(sprite => sprite.type === thorns)) {
      restartLevel(); // Call a function to restart the level
    }
  }
}, 100);

function restartLevel() {
  getFirst(player).x = 0; // Reset player position
  getFirst(player).y = 0;
  setMap(levels[level]); // Reload the current level map
  // Additional logic to reset other game elements if needed
}
