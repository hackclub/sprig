/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Gun Run
@author: codie
@tags: []
@addedOn: 07-02-2025
*/


//keys
const gun = "p"
const grass = "g"
const sky = "s"
const bullet
= "l"

const background = "b"
const platform = "m"
const dirtwall = "d"
const thorns = "t"

//sprites
setLegend(
  [gun, bitmap`
................
................
................
....3...........
..0000000000....
..0000000000LLLL
..0000000000LLLL
..0000000000....
..00001.0.......
..0000..0.......
..0000000.......
..0000..........
...11...........
...11...........
...11...........
...11...........`],
  [grass, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],
  [background, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [platform, bitmap`
.CCCCCCCCCCCCCC.
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
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
  [bullet, bitmap`
................
................
................
................
................
................
................
....F6666.......
...FFF666.......
..FFFFF66.......
.FFFFFFF6.......
FFFFFFFFF.......
FFFFFFFF........
FFFFFFF.........
FFFFFF..........
FFFFF...........`],
  [thorns, bitmap`
................
................
................
................
................
....7....7....7.
...77...77...77.
..777..777..777.
.7777.7777.7777.
7777777777777777
7777777777777777
7777777777777777
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
);

setSolids([grass, gun, platform, dirtwall], )

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
  [gun]: []
})
onInput("a", () => {
  getFirst(gun).x -= 1
})

onInput("s", () => {
  getFirst(gun).y += 1
})

onInput("w", () => {
  getFirst(gun).y -= 1
})

onInput("d", () => {
  getFirst(gun).x += 1
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
  if (getFirst(gun).y === 10) return;

  getFirst(gun).y++;
}, 500);

//next level leaf thingy
setInterval(() => {
  if (tilesWith(bullet, gun).length >= 1) {
    // Check if the player is on the leaf tile
    const playerTile = getTile(getFirst(gun).x, getFirst(bullet).y);
    if (playerTile.some(sprite => sprite.type === bullet)) {
      // Reset player position and move to the next level
      getFirst(gun).x = 0;
      getFirst(gun).y = 0;
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
  if (tilesWith(thorns, gun).length >= 1) {
    // Check if the player is on the thorns tile
    const playerTile = getTile(getFirst(gun).x, getFirst(gun).y);
    if (playerTile.some(sprite => sprite.type === thorns)) {
      restartLevel(); // Call a function to restart the level
    }
  }
}, 100);

function restartLevel() {
  getFirst(gun).x = 0; // Reset player position
  getFirst(gun).y = 0;
  setMap(levels[level]); // Reload the current level map
  // Additional logic to reset other game elements if needed
}

