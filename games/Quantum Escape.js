/*
In "Quantum Escape," players control a scientist who accidentally gets trapped in a quantum computer 
simulation. The game combines puzzle-solving with platforming elements, set in a visually abstract and 
ever-changing digital environment.

Key Features:
@title: Quantum Escape
@author: Harshita
@tags: []
@addedOn: 2024-00-00
*/


const player = "p"
const box = "b"
const entangled_box_red_a = "e"
const entangled_box_red_b = "f"
const black_hole = "t" 
const wall = "w"

setLegend(
  [ player, bitmap`
................
................
................
HH...LH..HL.....
HHH..LL..LL.....
.HHH.000000HHH..
..HHH0....0HCH..
...HL07..70HHH..
.....0.LL.0HCH..
.....0.33.0HCH..
.....000000HHH..
.....LL..LL.....
.....L....L.....
................
................
................` ],
  [ box, bitmap`
................
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
.00000000000000.
................` ],
  [ entangled_box_red_a, bitmap`
................
.03030303030303.
.30303030303030.
.03030303030300.
.30303030303000.
.03030303030000.
.30303030300000.
.03030303000000.
.30303030000000.
.03030300000000.
.30303000000000.
.03030000000000.
.30300000000000.
.03000000000000.
.30000000000000.
................` ],
  [ entangled_box_red_b, bitmap`
................
.00000000000003.
.00000000000030.
.00000000000303.
.00000000003030.
.00000000030303.
.00000000303030.
.00000003030303.
.00000030303030.
.00000303030303.
.00003030303030.
.00030303030303.
.00303030303030.
.03030303030303.
.30303030303030.
................` ],
  [ black_hole, bitmap`
....00000000000.
...000.....00000
.0000LLLLL..0000
000..L...LLL..00
00.LLL.11..LLL.0
00.L..111111.L.0
0.LL.1222.11.L.0
0.L.112.2..1.L.0
0.L.1.2.22.1.L.0
0.L.11222211.L.0
0.LL.11..11.LL.0
00.LL.1111.LL.00
000.LL.....L..00
.00..LLLLLLL.00.
..000000...0000.
...0000000000...` ],
  [ wall, bitmap`
3333333333333333
3CLLLLLLLLLLLLC3
3LCLLLLLLLLLLCL3
3LLC22222222CLL3
3LL2C111111C2LL3
3LL21C1111C12LL3
3LL211C11C112LL3
3LL2111CC1112LL3
3LL2111CC1112LL3
3LL211C11C112LL3
3LL21C1111C12LL3
3LL2C111111C2LL3
3LLC22222222CLL3
3LCLLLLLLLLLLCL3
3CLLLLLLLLLLLLC3
3333333333333333` ]
)

setSolids([ player, box, wall, entangled_box_red_b, entangled_box_red_a ]); 
let level = 0
const levels = [
  map`
p.....
..b...
..t...
..w...`,
  map`
..p.........
.....b..t...
..e...f.....
............
....w.......`,
  map`
wwwwwwwwwww
w.......w.w
w...p.b...w
w..w..t..ww
w...e..f..w
w........ww
wwwwwwwwwww`,
  map`
wwwwwwwwwww
w..p......w
w..b.w....w
w..t..e...w
w...w..f..w
w.........w
wwwwwwwwwww`,
  map`
wwwwwwwwwww
w....t....w
w..p.b....w
w..w...e..w
w....w.f..w
w.........w
wwwwwwwwwww`,
  map`
wwwwwwwwwww
w...e.....w
w..p..b..w
w..w..t...w
w....w..f.w
w.........w
wwwwwwwwwww`,
  map`
wwwwwwwwwww
w..t....e.w
w..p..b...w
w..w....f.w
w....w....w
w.........w
wwwwwwwwwww`,
  map`
wwwwwwwwwww
w....t....w
w..p..b..w
w..w..e...w
w....w.f..w
w.........w
wwwwwwwwwww`,
  map`
wwwwwwwwwww
w....t....w
w..p..b...w
w..w..e.f.w
w....w....w
w.........w
wwwwwwwwwww`
];

setMap(levels[level]);


const allBoxTypes = [box, entangled_box_red_a, entangled_box_red_b]; 
setPushables({
  [player]: allBoxTypes
});

function moveEntangledBoxes(playerSprite, dx, dy) {
  const entangledBoxA = getFirst(entangled_box_red_a);
  const entangledBoxB = getFirst(entangled_box_red_b);

  if (entangledBoxA && entangledBoxB) {
    const newPosX = playerSprite.x + dx;
    const newPosY = playerSprite.y + dy;

    const playerOffsetX = dx - (entangledBoxA.x - playerSprite.x);
    const playerOffsetY = dy - (entangledBoxA.y - playerSprite.y);

    entangledBoxA.x += playerOffsetX;
    entangledBoxA.y += playerOffsetY;

    entangledBoxB.x += playerOffsetX;
    entangledBoxB.y += playerOffsetY;
  }
}



// Function to check if the player is in the black hole area
function isPlayerInBlackHole(playerX, playerY) {
  const blackHoleX = getFirst(black_hole).x;
  const blackHoleY = getFirst(black_hole).y;

  return playerX === blackHoleX && playerY === blackHoleY;
}

// Inputs for player movement control
onInput("s", () => {
  const playerSprite = getFirst(player);
  const playerX = playerSprite.x;
  const playerY = playerSprite.y;

  playerSprite.y += 1;
  moveEntangledBoxes(playerSprite, 0, 1);

  if (isPlayerInBlackHole(playerX, playerY)) {
    playerSprite.remove();
    clearText();
    addText("Game Over", { x: (width() - 10) / 2, y: height() / 2, color: color`c` });
    gameCompleted = true;
  }
});

onInput("w", () => {
  const playerSprite = getFirst(player);
  const playerX = playerSprite.x;
  const playerY = playerSprite.y;

  playerSprite.y -= 1;
  moveEntangledBoxes(playerSprite, 0, -1);

  if (isPlayerInBlackHole(playerX, playerY)) {
    playerSprite.remove();
    clearText();
    addText("Game Over", { x: (width() - 10) / 2, y: height() / 2, color: color`c` });
    gameCompleted = true;
  }
});

onInput("a", () => {
  const playerSprite = getFirst(player);
  const playerX = playerSprite.x;
  const playerY = playerSprite.y;

  playerSprite.x -= 1;
  moveEntangledBoxes(playerSprite, -1, 0);

  if (isPlayerInBlackHole(playerX, playerY)) {
    playerSprite.remove();
    clearText();
    addText("Game Over", { x: (width() - 10) / 2, y: height() / 2, color: color`c` });
    gameCompleted = true;
  }
});

onInput("d", () => {
  const playerSprite = getFirst(player);
  const playerX = playerSprite.x;
  const playerY = playerSprite.y;

  playerSprite.x += 1;
  moveEntangledBoxes(playerSprite, 1, 0);

  if (isPlayerInBlackHole(playerX, playerY)) {
    playerSprite.remove();
    clearText();
    addText("Game Over", { x: (width() - 10) / 2, y: height() / 2, color: color`c` });
    gameCompleted = true;
  }
});



let gameCompleted = false;

afterInput(() => {
  if (!gameCompleted) {
    const remainingBoxTypes = allBoxTypes.filter(type => getAll(type).length > 0);

    if (remainingBoxTypes.length === 0) {
      level++;
      if (level < levels.length) {
        setMap(levels[level]);
      } else {
        clearText(); 
        addText("Game End", { x: (width() - 8) / 2, y: height() / 2, color: color`c` }); 
        gameCompleted = true; 
      }
    }

    allBoxTypes.forEach(type => {
      const boxSprites = getAll(type);
      const black_holeTileSprites = getTile(getFirst(black_hole).x, getFirst(black_hole).y);
      
      boxSprites.forEach(boxSprite => {
        if (black_holeTileSprites.includes(boxSprite)) {
          boxSprite.remove(); 
        }
      });
    });

    if (!gameCompleted) {
      clearText(); 
      addText(`Level: ${level + 1}`, { x: width() - 2, y: 2, color: color`9` }); 
    }
  }
});
