/*
@title: Crazy Maze
@author: BennyGaming635
@tags: []
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@img: ""

*/

const player = "p"
const playerwky = "w"
const wall = "b"
const portal = "g"
const lock = "l"
const pokeball = "k"

setLegend(
  [player, bitmap`
.....666666.....
...6666666666...
..666666666666..
.66622626666666.
.66222666666666.
6662266666666666
6666666666666666
6660066666600666
6606606666066066
6666666666666666
6666666666666666
.66622222222666.
.66602222220666.
..666000000666..
...6660330666...
.....666666.....`],
  [playerwky, bitmap`
................
................
................
................
................
................
...66666........
..6666666..000..
.66066606603330.
.60606060602020.
.66666666602220.
.666666666.000..
.660666066......
..6600066.......
...66666........
................`],
  [wall, bitmap`
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
  [portal, bitmap`
................
.44444....DDDDD.
.4............D.
.4.DD......44.D.
.4.D........4.D.
.4.D.4....D.4.D.
.4.D.4....D.4.D.
.4.D.4....D.4.D.
.4.D.4....D.4.D.
.4.D.4....D.4.D.
.4.D.44..DD.4.D.
.4.D........4.D.
.4.DDD....444.D.
.4............D.
.444........DDD.
................`],
  [lock, bitmap `
LLLLLL9999LLLLLL
LLLLLL9999LLLLLL
LLLL00333300LLLL
LLL0333993330LLL
LL033399993330LL
LL033399993330LL
L03333399333330L
L03333333333330L
L00333300333300L
L02000022000020L
LL022202202220LL
LL022220022220LL
LLL0222222220LLL
LLLL00222200LLLL
LLLLLL0000LLLLLL
LLLLLLLLLLLLLLLL`],
  [pokeball, bitmap`
LLLLLLLLLLLLLLLL
LLLLLL0000LLLLLL
LLLL00333300LLLL
LLL0333333330LLL
LL033333333330LL
LL033333333330LL
L03333333333330L
L03333333333330L
L00333300333300L
L02000022000020L
LL022202202220LL
LL022220022220LL
LLL0222222220LLL
LLLL00222200LLLL
LLLLLL0000LLLLLL
LLLLLLLLLLLLLLLL`],
)

let haspokeball = false;

setSolids([lock, player, playerwky])

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
  [player]: [],
  [playerwky]: []
})

onInput("d", () => {
  const playerEntity = getFirst(player) || getFirst(playerwky);
  const targetTile = getTile(playerEntity.x + 1, playerEntity.y);
  if (!targetTile[0] || (targetTile[0]._type != "l") || (targetTile[0]._type == "l" && haspokeball)) {
    playerEntity.x += 1;
  }
})

onInput("a", () => {
  const playerEntity = getFirst(player) || getFirst(playerwky);
  const targetTile = getTile(playerEntity.x - 1, playerEntity.y);
  if (!targetTile[0] || (targetTile[0]._type != "l") || (targetTile[0]._type == "l" && haspokeball)) {
    playerEntity.x -= 1;
  }
})

onInput("s", () => {
  const playerEntity = getFirst(player) || getFirst(playerwky);
  const targetTile = getTile(playerEntity.x, playerEntity.y + 1);
  if (!targetTile[0] || (targetTile[0]._type != "l") || (targetTile[0]._type == "l" && haspokeball)) {
    playerEntity.y += 1;
  }
})

onInput("w", () => {
  const playerEntity = getFirst(player) || getFirst(playerwky);
  const targetTile = getTile(playerEntity.x, playerEntity.y - 1);
  if (!targetTile[0] || (targetTile[0]._type != "l") || (targetTile[0]._type == "l" && haspokeball)) {
    playerEntity.y -= 1;
  }
})

afterInput(() => {
  const won = tilesWith(portal, player).length + tilesWith(portal, playerwky).length;

  if (won) {
    level++;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
      haspokeball = false;
    } else {
      level = 0;
      setMap(levels[level]);
      haspokeball = false;
    }
  }

  const collectedpokeball = tilesWith(pokeball, player).length;
  if (collectedpokeball) {
    haspokeball = true;

    const playerEntity = getFirst(player);
    const pokeballTile = getFirst(pokeball);
    if (pokeballTile) {
      clearTile(pokeballTile.x, pokeballTile.y);
      addSprite(playerEntity.x, playerEntity.y, playerwky);
    }
  }
});