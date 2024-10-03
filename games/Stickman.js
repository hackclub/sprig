/*
@title: Stickman
@author: Benjamin Faershtein
@tags: []
@addedOn: 2024-07-26
STICKMAN
Part 1

*/

const player = "p"
const enemy = "e"
const diamond1 = "1"
const diamond2 = "2"
const diamond3 = "3"
const brick = "b"
const concrete = "c"
const stone = "s"
const boulder = "r"
const portal = "l"

const newLevel = tune`
114.06844106463879: G4/114.06844106463879 + E4/114.06844106463879,
114.06844106463879: A4/114.06844106463879,
114.06844106463879,
114.06844106463879: A4/114.06844106463879,
114.06844106463879,
114.06844106463879: C5/114.06844106463879,
114.06844106463879: B4/114.06844106463879,
2851.71102661597`
const teleport = tune`
254.23728813559322: G5~254.23728813559322,
254.23728813559322: E5~254.23728813559322,
254.23728813559322: F5~254.23728813559322 + D5~254.23728813559322,
7372.881355932203`
const winner = tune`
303.030303030303: D5-303.030303030303 + C5-303.030303030303,
303.030303030303: C5-303.030303030303,
303.030303030303: D5-303.030303030303,
303.030303030303: C5-303.030303030303 + E5-303.030303030303,
303.030303030303: E5-303.030303030303,
303.030303030303: D5-303.030303030303,
303.030303030303,
303.030303030303: D5-303.030303030303 + F5-303.030303030303,
303.030303030303: E5-303.030303030303,
303.030303030303,
303.030303030303: C5-303.030303030303,
303.030303030303: E5-303.030303030303,
303.030303030303: F5-303.030303030303,
303.030303030303: C5-303.030303030303,
5454.545454545454`
const death = tune`
500: D5/500 + C5/500 + B4/500,
500: B4~500 + A4~500,
500: A4~500,
500: G4~500,
500: F4~500,
13500`


var gameEnd = false

setLegend(
  [player, bitmap`
................
......0000......
.....000000.....
.....020020.....
.....000000.....
.....002200.....
......0000......
.......00.......
.......00.......
...0000000000...
.......00.......
.......00.......
......0000......
.....00..00.....
....00....00....
....0......0....`],
  [diamond1, bitmap`
................
................
................
......LL00......
.....LLL000.....
.....L22770.....
.....L27570.....
.....L75570.....
.....075570.....
.....075570.....
.....077770.....
.....000000.....
......0000......
................
................
................`],
  [diamond2, bitmap`
................
................
................
......0000......
.....000000.....
.....077770.....
.....075570.....
.....075570.....
.....075570.....
.....075570.....
.....077770.....
.....000000.....
......0000......
................
................
................`],
  [diamond3, bitmap`
................
................
................
......L000......
.....LL0000.....
.....027770.....
.....075570.....
.....075570.....
.....075570.....
.....075570.....
.....077770.....
.....000000.....
......0000......
................
................
................`],
  [enemy, bitmap`
................
......3333......
.....333333.....
.....323323.....
.....333333.....
.....332233.....
......3333......
.......33.......
.......33.......
...3333333333...
.......33.......
.......33.......
......3333......
.....33..33.....
....33....33....
....3......3....`],
  [concrete, bitmap`
LLLLLLLL1LLLLLLL
11LLLLL1LLLLLLLL
LL11L11LLLLLLLLL
LLLL111LLLLLLLL1
LLL1LLL11LLLL11L
L11LLLLLL1111LLL
1LLLLLLLLL1L11LL
LLLLLLLL11LLLL11
LLLLLL11LLLLLLLL
1111L1LLLLLLLLLL
LLL11111111LLLLL
L11LLLLLLLL1111L
1LLLLLLLLL111LLL
LLLLLLL111LLLLLL
LLLL111LLLLLLLLL
LL11LLLLLLLLLLLL`],
  [brick, bitmap`
2222222222222222
3333233323333323
2222222222222222
3323332333233233
2222222222222222
3333233233323333
2222222222222222
3333323333233323
2222222222222222
3333233332333333
2222222222222222
3323333233332333
2222222222222222
3332333323323323
2222222222222222
3333233233233233`],
  [stone, bitmap`
................
....00000000....
...00LLLLLL00...
..0LLLLLLLLLL0..
.00LLL11LLLLL00.
.0LLLLLL1LLLLL0.
.0LLLLLLL11LLL0.
.0L11LLLLL11LL0.
.0LL111LLLL11L0.
.0LLLLL1LLLLLL0.
.0LLLLLL11LLLL0.
.00LLLLLLL1LL00.
..0LLLLLLLLLL0..
...00LLLLLL00...
....00000000....
................`],
  [portal, bitmap`
................
....77777777....
...7777777777...
..777222222777..
.77772222227777.
.77722222222777.
.77722222222777.
.77722222222777.
.77722222222777.
.77722222222777.
.77722222222777.
.77772222227777.
..777222222777..
...7777777777...
....77777777....
................`],

)



let level = 0
const levels = [
  map`
..........
..........
...1......
..........
..........
..........
........p.
..........`,
  map`
...s......
..1s......
ssss......
..........
..........
..........
........p.
..........`,
  map`
.........b
..bbbb...b
..b..b...b
..b..bbb.b
.bbs..1bsb
.b..bbbb.b
.b..b....b
....b.b.pb`,
  map`
..........
.e........
..........
....p.....
..........
..........
..........
....1.....`,
  map`
.....b.beb
.bbb.b.b.b
.b.b.b1b.b
.b.b.b.b.b
pb.b.bsb.b
.b.b.bsb.b
.b.......b
eb.bbbbbbb`,
  map`
bbbbbbb1bbbbbbbbbbb
b..b.b..b.........b
b..b.b.b..........b
b....b.b.......bbbb
bbsbbb.bbbbb...b..b
b..b...bb..b....b.b
b.b........bbbbbb.b
b.b....bbb......b.b
b.bbb..b.b....b.b.b
b...b..b.b..b.b.bsb
b.b.bbb..bb.b.b.b.b
b.b.......b.b.bbb.b
b.b.bbbbb.bbb.bb..b
b.b....b........e.b
bbbbbbpbbbbbbbbbbbb`,
  map`
...................
.e...............e.
...................
.....bb.....bbb....
.....b........b....
.....b.............
...................
bbb.......p.....bbb
1.s.............b.1
bbb.............b.b
.....b........b..s.
.....b........b....
.....bb.....bbb....
.e...............e.
...................`,
  map`
..........
..bbbbb...
..b..1b...
..bl..b...
..bbbbb...
..........
.p......l.
..........`,
  map`
bbbbbbbbbbbbbbbbbbb
b.................b
b.e.....p.....b.b.b
b...b..b..b.....b.b
b...b.....b...e.b.b
b...b.....b.....b.b
b.b.b.....b.....b.b
b............b....b
b.................b
b...bbbbbbbbbbb...b
b.e.b.lb...b..b.e.b
b...b..b...b.lb...b
b...b..b.1.b..b...b
b...s..sssss..b...b
bbbbbbbbbbbbbbbbbbb`,
  map`
..bbbbbbbbbbbbbb.b1
..b..lb........b.b.
..b.bbbbbbbb...bbb.
..b.bs.......b.....
....b.bbbbb.bbb.bbb
..bbb.b.....b......
......bbbbbbb.bbbb.
..b..e......b....b.
..bbbbbbb.bbbbbb.b.
..b.....b.b....b.b.
..bbbbb.b.bbbb.b.b.
......b.b....b.b.b.
.bbbb.b.b..b.b.blb.
.b..bbb.bbbb.b.bbb.
pb...........b.....`,

]
setMap(levels[level])

setSolids([stone, brick, player])

setPushables({
  [player]: [stone],
  [stone]: [stone]
})

setBackground(concrete)

const shimmer = () => {
  if (!gameEnd) {
    if (tilesWith(diamond3).length == 0 && tilesWith(diamond2).length == 0) {
      // Change all diamond1 to diamond2
      getAll(diamond1).forEach(diamond => diamond.type = diamond2);
    } else if (tilesWith(diamond2).length == 0) {
      // Change all diamond3 to diamond1
      getAll(diamond3).forEach(diamond => diamond.type = diamond1);
    } else {
      // Change all diamond2 to diamond3
      getAll(diamond2).forEach(diamond => diamond.type = diamond3);
    }
  }
}
const teleportPlayer = () => {
  const portals = getAll(portal);
  const playerSprite = getFirst(player);

  if (portals.length === 2) {
    const portal1 = portals[0];
    const portal2 = portals[1];

    // Check if the player is on the first portal
    if (playerSprite.x === portal1.x && playerSprite.y === portal1.y) {
      playerSprite.x = portal2.x;
      playerSprite.y = portal2.y;
    }
    // Check if the player is on the second portal
    else if (playerSprite.x === portal2.x && playerSprite.y === portal2.y) {
      playerSprite.x = portal1.x;
      playerSprite.y = portal1.y;
    }
  }
};

const moveAllEnemies = () => {
  if (!gameEnd) {
    const playerSprite = getFirst(player);

    getAll(enemy).forEach(enemy => {
      const dx = Math.sign(playerSprite.x - enemy.x);
      const dy = Math.sign(playerSprite.y - enemy.y);

      // Check if the next position is a wall
      const nextTileSprites = getTile(enemy.x + dx, enemy.y + dy);
      const isNextPosWall = nextTileSprites.some(sprite => sprite.type === brick);

      if (!isNextPosWall) {
        enemy.x += dx;
        enemy.y += dy;
      } else {
        // Try to move around the wall
        const altMoves = [
          { dx: dx, dy: 0 }, // Move horizontally
          { dx: 0, dy: dy }, // Move vertically
          { dx: dx, dy: dy } // Move diagonally
        ];

        let moved = false;

        for (let move of altMoves) {
          const altTileSprites = getTile(enemy.x + move.dx, enemy.y + move.dy);
          const isAltPosWall = altTileSprites.some(sprite => sprite.type === brick || sprite.type === stone);
          if (!isAltPosWall) {
            enemy.x += move.dx;
            enemy.y += move.dy;
            moved = true;
            break;
          }
        }

        // If still blocked, try opposite diagonal moves
        if (!moved) {
          const diagonalMoves = [
            { dx: -dx, dy: dy }, // Opposite horizontal
            { dx: dx, dy: -dy }, // Opposite vertical
            { dx: -dx, dy: -dy } // Opposite diagonal
          ];

          for (let move of diagonalMoves) {
            const diagTileSprites = getTile(enemy.x + move.dx, enemy.y + move.dy);
            const isDiagPosWall = diagTileSprites.some(sprite => sprite.type === brick || sprite.type === stone);
            if (!isDiagPosWall) {
              enemy.x += move.dx;
              enemy.y += move.dy;
              break;
            }
          }
        }
      }
    });

    // Check if any enemy overlaps with the player
    const enemies = getAll(enemy);
    const playerPosition = { x: playerSprite.x, y: playerSprite.y };

    if (enemies.some(enemy => enemy.x === playerPosition.x && enemy.y === playerPosition.y)) {
      gameEnd = true;

      addText("You Died", {
        x: 4,
        y: 4,
        color: color`3`
      });
      addText("J to restart", {
        x: 4,
        y: 7,
        color: color`0`
      });
      playTune(death, 1)
    }
  }
};







setInterval(shimmer, 500)
setInterval(moveAllEnemies, 1000)



onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("j", () => {
  if (gameEnd) {
    level = 0
    gameEnd = false
    clearText()
  }
  setMap(levels[level])
})



afterInput(() => {
  if (!gameEnd) {
    if (tilesWith(diamond1, player).length == 1 || tilesWith(diamond2, player).length == 1 || tilesWith(diamond3, player).length == 1) {
      if (levels.length - 1 == level) {
        addText("You Won", {
          x: 10,
          y: 4,
          color: color`0`
        })
        playTune(winner, 1)
        gameEnd = true
      } else {
        playTune(newLevel, 1)
        level += 1
        setMap(levels[level])
      }
    }
    if (tilesWith(portal, player).length == 1) {
      teleportPlayer()
      playTune(teleport, 1)
    }
  }
})
