/*
@title: Amazing
@author: Dilon
@tags: []
@addedOn: 2024-06-07
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@img: ""

Mechanics inspired by Maze_Runner3 by Charlie
*/

const player = "p"
const pwk = "w"
const box = "b"
const coin = "g"
const block = "l"
const key = "k"

setLegend(
  [ player, bitmap`
................
................
................
................
...66666666.....
...66666666.....
...60066006.....
...66666666.....
...60666606.....
...60066006.....
...66000066.....
...66666666.....
................
................
................
................` ],
  [ pwk, bitmap`
................
................
.........999....
........9...9...
...66666969.9...
...66666966.9...
...600660999....
...66666669.....
...6066660999...
...60066009.....
...66000069999..
...66666669.....
..........99....
................
................
................` ],
  [ box, bitmap`
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
  [coin, bitmap`
....00000000....
...0222222660...
..026666666660..
.0266622FF666F0.
026662266FF666F0
0266626666F666F0
0266626666F666F0
0266626666F666F0
0266626666F666F0
0266626666F666F0
0266626666F666F0
026662266FF666F0
.0266622FF666F0.
..0666666666F0..
...066FFFFFF0...
....00000000....`],
  [ block, bitmap `
9999999999999999
9999999999999999
99999LLLLLL99999
99999L9999L99999
99999L9999L99999
99999L9999L99999
999LLLLLLLLLL999
999L99999999L999
999L999LL999L999
999L999L9999L999
999L999LLL99L999
999L999L9999L999
999L99999999L999
999LLLLLLLLLL999
9999999999999999
9999999999999999`],
    [key, bitmap`
................
................
......999.......
.....9...9......
.....9.9.9......
.....9...9......
......999.......
.......9........
.......999......
.......9........
.......9999.....
.......9........
.......99.......
................
................
................`],
)

let hasKey = false;

setSolids([ box, player, pwk])

let level = 0
const levels = [
  map`
pbbb
...k
blbb
b..g`,
  map `
p.bbb.k
.bb.b.b
.b....b
.bb.b..
.b..blb
...bb..
bbb.b.g`, 
  map `
p......b.
bbbbbb.b.
.b.......
....bbbbb
..b......
bbb.b.bbb
..b.b..b.
..b.blbb.
..bkb...g`, 
  map `
p...bb
.bb..b
..bb..
b..bbl
bb..b.
bbbkbg`, 
  map `
pb.b.b..b...b............
.bbb.b..bb..b.bbbbbbbbbbb
.........bb.b..bk........
bbb.bbb........b..bbbbbb.
.........b.bbb.b.bb....b.
.bbbbb..bb.....b..bbb..b.
.....b.bbb.b...b.......b.
.bbb.b.b.....b.b...bbbbb.
.....b.b..bbbb.b..bb...b.
..bbbb...bbb.b....b......
...b.b.b..b...b.b.b.bbb..
.b.b...b..b...b...b.b.b..
.b.b...b..b..bbbbbb.b.b..
.b.bbb.bb.bb......b.b.b..
...b.b..b.....b.....b.b..
bbb..b..bb.bb.b.bbbbbbb..
b.b.bbb.b...bbbbb.b...b..
bbb.........b.b...b.bbbb.
..b.b.bbbbb...b.b.b......
..b.bbb......bb...b..bbbb
..b...bbb.bbbbb......b...
bbb.b.b.b..b....bbbbbb.b.
..b.b...b..b...bb......b.
....b...b..b..bbb..bbbbbb
bbbbbb.b..bbb.l.........g` 
]

setMap(levels[level])

setPushables({
  [ player ]: [],
  [ pwk ]: []
})

onInput("d", () => {
  const playerEntity = getFirst(player) || getFirst(pwk);
  const targetTile = getTile(playerEntity.x + 1, playerEntity.y);
  if (!targetTile[0] || (targetTile[0]._type != "l") || (targetTile[0]._type == "l" && hasKey)) {
    playerEntity.x += 1;
  }
})

onInput("a", () => {
  const playerEntity = getFirst(player) || getFirst(pwk);
  const targetTile = getTile(playerEntity.x - 1, playerEntity.y);
  if (!targetTile[0] || (targetTile[0]._type != "l") || (targetTile[0]._type == "l" && hasKey)) {
    playerEntity.x -= 1;
  }
})

onInput("s", () => {
  const playerEntity = getFirst(player) || getFirst(pwk);
  const targetTile = getTile(playerEntity.x, playerEntity.y + 1);
  if (!targetTile[0] || (targetTile[0]._type != "l") || (targetTile[0]._type == "l" && hasKey)) {
    playerEntity.y += 1;
  }
})

onInput("w", () => {
  const playerEntity = getFirst(player) || getFirst(pwk);
  const targetTile = getTile(playerEntity.x, playerEntity.y - 1);
  if (!targetTile[0] || (targetTile[0]._type != "l") || (targetTile[0]._type == "l" && hasKey)) {
    playerEntity.y -= 1;
  }
})

afterInput(() => {
  const won = tilesWith(coin, player).length + tilesWith(coin, pwk).length;
  
  if (won) {
    level++;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
      hasKey = false;
    } else {
      level = 0;
      setMap(levels[level]);
      hasKey = false;
    }
  }

  const collectedKey = tilesWith(key, player).length;
  if (collectedKey) {
    hasKey = true;
    
    const playerEntity = getFirst(player);
    const keyTile = getFirst(key);
    if (keyTile) {
      clearTile(keyTile.x, keyTile.y);
      addSprite(playerEntity.x, playerEntity.y, pwk);
    }
  }
});