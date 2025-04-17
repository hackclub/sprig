

/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Just A Game
@author: NicTrix23(nico.scholl@loewenrot.de)
@tags: []
@addedOn: 2024-00-00
*/

const wall = "a"
const player = "p"
const earth = "e"
const stone = "s"
const gem = "g"
const sky = "h"
let score = 0
let woods = 0
let stones = 0
const wood = "w"
const win = "o"


setLegend(
  [ player, bitmap`
......000.......
.....0...0......
.....0...0......
.....0...0......
......000.......
.......0........
......000.......
.....0.0.0......
.....0.0.0......
.....0.0.0......
.......0........
......000.......
.....0...0......
.....0...0......
.....0...0......
.....0...0......` ],
  [earth, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [stone, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [gem, bitmap`
1111111111111111
1111111111111111
1171611756131111
1111111511111111
1111113111151111
1113111194171111
1119111111111111
1111117111411131
1471116111114911
1111191119111111
1111191171111651
1155191161111711
4111711111111111
1111113117111111
1111415111116111
1111111111111111`],
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
  [wood, bitmap`
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
  [wall, bitmap`
0000000000000000
LLLLLLLL0LLLLLLL
LLLLLLLL0LLLLLLL
LLLLLLLL0LLLLLLL
0000000000000000
LL0LLLLLLLLLL0LL
LL0LLLLLLLLLL0LL
LL0LLLLLLLLLL0LL
0000000000000000
LLLLLLLL0LLLLLLL
LLLLLLLL0LLLLLLL
LLLLLLLL0LLLLLLL
0000000000000000
LL0LLLLLLLLLL0LL
LL0LLLLLLLLLL0LL
LL0LLLLLLLLLL0LL`],
  [win, bitmap`
4444444444444444
4004444000444004
4004444000444004
4004444000444004
4004444000444004
4004444000444004
4004444000444004
4004444000444004
4004444000444004
4004444000444004
4004444000444004
4400440000044004
4440000444000044
4444004444400444
4444444444444444
4444444444444444`]
)

setSolids([player, earth, stone, gem, wood, wall])

let level = 0
const levels = [
  map`
hhhhhhhhhhhhhhh
hhhhhhhhhhhhhhh
hhhhhhhhhhhhhhh
hhhhhhhhhhhehhh
hhhhhhhhhheeehh
hhhhhhhhhhewehh
hhhhhhhhhhhwhhh
hhhhphhhhhhwhhh
eeeeeeeeeeeeeee
sssssgsssssssss
sgsssssssgsssss
ssssgsssssssgss`,
  map`
..............
.h.h.sss.w...w
.h.h.s.s.w...w
.h.h.s.s.w...w
..h..s.s.w...w
..h..sss..www.
..............
.g...g.g.g...g
.g...g.g.gg..g
.g...g.g.g.g.g
.g.g.g.g.g..gg
..g.g..g.g...g`,
  map`
apaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
a.a....a.aa...a....a...a...a...a....aaaa
a.a.a....a..a...aa.a.a.a.a.a.a.aa.a.a.aa
a.a.a.aaaaa..aaaaa.a.a...a...a.a..a.a..a
a.a.a....a....aaaaaaaaaaaaaaaa.a.aa.aa.a
a.a.a.aaaa.a..a....a.a..aa.....a..a.a..a
a...a......a..aa.a...a..aaaaaa.aa.a.a.aa
aaaaaaaaaaaaa.aaaaaaaaa.a..a......a.a..a
aa..aaaaaaaaa..a.aaaaa..a.aa.aaaaaa.aaaa
aa.aaaa........a.......aa.aa.a...a.....a
aa.aaa..aaaaaaaaaaaaaa.a..aa.a.a...a.aaa
aa.aaaa...aaaaaa.........aaa.aaaaaaa.a.a
aa.aaaaaa..aaaaaaaaaaa.aaaaa.a.........a
aa.a.............a...a...aaa.aaaa.aaaaaa
aa...a..aaaaaaaa.a.a.a.a.a...a....aa...a
aaaaaaa........a...a...a...aaaa.a.aa.a.a
aa..aaaaaaaaaaaaaaaaaaaaa.aaaaaaa.aa.aoo
aaa........a................aa.......aoo
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`
]

setMap(levels[level])

setBackground()

setPushables({
  [ player ]: []
})

let hasPickaxe1 = false; // Wooden pickaxe
let hasPickaxe2 = false; // Stone pickaxe

onInput("s", () => {
  const playerSprite = getFirst(player);
  const playerX = playerSprite.x;
  const playerY = playerSprite.y;

  const spritesUnderPlayer = getTile(playerX, playerY + 1);

  if (spritesUnderPlayer.some(sprite => sprite.type === wood || sprite.type === earth)) {
    clearTile(playerX, playerY + 1);
    woods += 1;
  } 
  else if (hasPickaxe1 && spritesUnderPlayer.some(sprite => sprite.type === stone)) {
    clearTile(playerX, playerY + 1);
    stones += 1;
  } 
  else if (hasPickaxe2 && spritesUnderPlayer.some(sprite => sprite.type === gem)) {
    clearTile(playerX, playerY + 1);
    score += 1;
  }

  // Always allow movement
  playerSprite.y += 1;
});

onInput("w", () => {
  const playerSprite = getFirst(player);
  const playerX = playerSprite.x;
  const playerY = playerSprite.y;

  const spritesAbovePlayer = getTile(playerX, playerY - 1);

  if (spritesAbovePlayer.some(sprite => sprite.type === wood || sprite.type === earth)) {
    clearTile(playerX, playerY - 1);
    woods += 1;
  } 
  else if (hasPickaxe1 && spritesAbovePlayer.some(sprite => sprite.type === stone)) {
    clearTile(playerX, playerY - 1);
    stones += 1;
  } 
  else if (hasPickaxe2 && spritesAbovePlayer.some(sprite => sprite.type === gem)) {
    clearTile(playerX, playerY - 1);
    score += 1;
  }

  // Always allow movement
  playerSprite.y -= 1;
});

onInput("a", () => {
  const playerSprite = getFirst(player);
  const playerX = playerSprite.x;
  const playerY = playerSprite.y;

  const spritesLeft = getTile(playerX - 1, playerY);

  if (spritesLeft.some(sprite => sprite.type === wood || sprite.type === earth)) {
    clearTile(playerX - 1, playerY);
    woods += 1;
  } 
  else if (hasPickaxe1 && spritesLeft.some(sprite => sprite.type === stone)) {
    clearTile(playerX - 1, playerY);
    stones += 1;
  } 
  else if (hasPickaxe2 && spritesLeft.some(sprite => sprite.type === gem)) {
    clearTile(playerX - 1, playerY);
    score += 1;
  }

  // Always allow movement
  playerSprite.x -= 1;
});

onInput("d", () => {
  const playerSprite = getFirst(player);
  const playerX = playerSprite.x;
  const playerY = playerSprite.y;

  const spritesRight = getTile(playerX + 1, playerY);

  if (spritesRight.some(sprite => sprite.type === wood || sprite.type === earth)) {
    clearTile(playerX + 1, playerY);
    woods += 1;
  } 
  else if (hasPickaxe1 && spritesRight.some(sprite => sprite.type === stone)) {
    clearTile(playerX + 1, playerY);
    stones += 1;
  } 
  else if (hasPickaxe2 && spritesRight.some(sprite => sprite.type === gem)) {
    clearTile(playerX + 1, playerY);
    score += 1;
  }

  // Always allow movement
  playerSprite.x += 1;
});

// Craft Pickaxe1 (Wooden) - Requires 3 wood
onInput("i", () => {
  if (woods >= 3) {
    hasPickaxe1 = true;
    woods -= 3;
  }
});

// Craft Pickaxe2 (Stone) - Requires 3 stones
onInput("k", () => {
  if (stones >= 40) {
    hasPickaxe2 = true;
    stones -= 40;
  }
});
//if (play)
onInput("j", () => {
  console.log("Works")
  if (level === 0 && score >= 5) {
    level = 2;
    setMap(levels[2]);
    console.log("Works2");
  }
});

onInput("l", () => {
    const playerSprite = getFirst(player);
  const playerX = playerSprite.x;
  const playerY = playerSprite.y;
  const spritesCurr = getTile(playerX , playerY);
  if (spritesCurr.some(sprite => sprite.type === win)) {
        level = 1;
    setMap(levels[1]);
  }
});
