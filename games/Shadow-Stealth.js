/*
  @title: Shadow Stealth
  @author: shreyancat
  @description: A tile-based stealth puzzle game where you dodge patrolling guard sightlines, gather keys, and escape the museum.
  @tags: ['stealth', 'puzzle', 'action']
  @addedOn: 2026-10-06
*/

const player = "p";
const wall = "w";
const guard = "g";
const light = "l";
const key = "k";
const door = "d";

setLegend(
  [ player, bitmap`
................
...000000000....
..0.........0...
..0..50005..0...
..0..0...0..0...
...000...000....
......000.......
....00...00.....
...0..000..0....
...0..000..0....
...0..000..0....
....00...00.....
...0.......0....
...0.......0....
................
................` ],
  [ wall, bitmap`
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
  [ guard, bitmap`
................
...3333333333...
..3..........3..
..3..00..00..3..
..3..00..00..3..
..3..........3..
...3333333333...
......333.......
....33...33.....
...3..333..3....
...3..333..3....
...3..333..3....
....33...33.....
...3.......3....
...3.......3....
................` ],
  [ light, bitmap`
................
.33333333333333.
.3............3.
.3.3333333333.3.
.3.3........3.3.
.3.3.333333.3.3.
.3.3.3....3.3.3.
.3.3.3....3.3.3.
.3.3.3....3.3.3.
.3.3.333333.3.3.
.3.3........3.3.
.3.3333333333.3.
.3............3.
.33333333333333.
................
................` ],
  [ key, bitmap`
................
.....5555.......
....5....5......
....5....5......
.....5555.......
.......5........
.......555......
.......5........
.......55.......
.......5........
................
................
................
................
................
................` ],
  [ door, bitmap`
................
...8888888888...
...8........8...
...8.888888.8...
...8.8....8.8...
...8.8.00.8.8...
...8.8.00.8.8...
...8.8....8.8...
...8.888888.8...
...8........8...
...8888888888...
................
................
................
................
................` ]
);

setMap(map`
wwwwwwwwwwwwwwww
wp...w.....k...w
w.ww.w.wwwwwww.w
w.ww...w.....w.w
w.wwww.w.www.w.w
w..g.w...w.g.w.w
wwww.wwwww.www.w
wk...w.......k.w
w.wwwwww.wwwww.w
w......w.....d.w
wwwwwwwwwwwwwwww
`);

setSolids([ player, wall, guard, door ]);

let guards = [
  { x: 3, y: 5, dir: 1, minX: 1, maxX: 5 },
  { x: 11, y: 5, dir: -1, minX: 9, maxX: 13 }
];

function updateVision() {
  const existingLights = tilesWith(light);
  existingLights.forEach(t => clearTile(t.x, t.y));

  guards.forEach(g => {
    let visionX = g.x + g.dir;
    let visionY = g.y;
    
    for (let i = 0; i < 2; i++) {
      const tileSprites = getTile(visionX, visionY);
      const isBlocked = tileSprites.some(s => s.type === wall);
      if (!isBlocked) {
        addSprite(visionX, visionY, light);
        visionX += g.dir;
      } else {
        break;
      }
    }
  });
}

function moveGuards() {
  guards.forEach(g => {
    let nextX = g.x + g.dir;
    if (nextX > g.maxX || nextX < g.minX) {
      g.dir *= -1;
      nextX = g.x + g.dir;
    }
    
    clearTile(g.x, g.y);
    g.x = nextX;
    addSprite(g.x, g.y, guard);
  });
  
  updateVision();
}

onInput("w", () => { getFirst(player).y -= 1; });
onInput("s", () => { getFirst(player).y += 1; });
onInput("a", () => { getFirst(player).x -= 1; });
onInput("d", () => { getFirst(player).x += 1; });

afterInput(() => {
  moveGuards();
  
  const p = getFirst(player);
  const pTile = getTile(p.x, p.y);
  
  const isDetected = pTile.some(s => s.type === light || s.type === guard);
  if (isDetected) {
    addText("SPOTTED! GAME OVER", { y: 5, color: color`3` });
    p.x = 1;
    p.y = 1;
    return;
  }
  
  const keysLeft = tilesWith(key).length;
  if (keysLeft === 0) {
    const doorTiles = tilesWith(door);
    if (doorTiles.length > 0) {
      clearTile(doorTiles[0].x, doorTiles[0].y);
    }
  }

  if (keysLeft === 0 && pTile.some(s => s.type === door)) {
    addText("ESCAPED! YOU WIN", { y: 5, color: color`1` });
  }
});

updateVision();
