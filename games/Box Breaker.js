/*
@title: Box Breaker
@author: chips39
@tags: []
@addedOn: 2025-01-22
*/

const player = "p"
const wall = "w"
const crackedwall = "c"
const spikebox = "s"
const box = "b"
const floor = "f"
const goal = "g"

setLegend(
  [ player, bitmap`
.LLLLLLLLLLLLLL.
3333333333333333
LLLLLLLLLLLLLLLL
0000000000000000
2200002222000022
2222222222222222
2222220000222222
2222222222222222
0001113333111000
00011123321610C3
000111233211103C
0000112332110000
0001112332111000
0001112332111000
0000112332110000
0000012332100000` ],
  [ wall, bitmap`
333333LC33333LC3
333333LC33333LC3
CCCCCCLCCCCCCLCC
LLLLLLLLLLLLLLLL
3333LC3333LC3333
3333LC3333LC3333
CCCCLCCCCCLCCCCC
LLLLLLLLLLLLLLLL
333333LC33333LC3
333333LC33333LC3
CCCCCCLCCCCCCLCC
LLLLLLLLLLLLLLLL
3333LC3333LC3333
3333LC3333LC3333
CCCCLCCCCCLCCCCC
LLLLLLLLLLLLLLLL` ],
  [ crackedwall, bitmap`
33LL33LC33333LC3
3333L3LC33333LC3
CCCCLLLCCCCCLLCC
LLL0LLLLLCLLLCLL
C3CC033LC3C3LC33
C333C03CL3CCC303
CCCCLC03L3LC3003
LLLLLLC0LLL000LL
33LL33LC0LL33LC3
LL33CC0LL0L33LC3
L33300LC33L00LCC
LLLL0LLCCCLC0CLL
3333LC3333LC30C3
33CCCC3333LC3033
CCCCLCCCCLLCCCCC
LLLLLLLLLLLLLLLL` ],
  [ spikebox, bitmap`
.....F....L....L
FL..LC...CF..FL.
LCLLLLLLLLLLLLC.
.CL1111111222L..
..L1111111112LFL
..L1111111111LC.
CFL1111111111L..
LLL1111111111L..
.FL1111111111LCL
..L1111111111LL.
..L1111111111L..
LCL1111111111LC.
FCLLLLLLLLLLLLLF
.FL.CL...FLC.CCL
.L..LFL..LC....L
L....L....L.....` ],
  [ box, bitmap`
0000000000000000
0CCC00000000CCC0
0CCCC099990CCCC0
0CCCCC0990CCCCC0
00CCCCC00CCCCC00
000CCCCCCCCCC000
0090CCCCCCCC0900
00990CCCCCC09900
00990CCCCCC09900
0090CCCCCCCC0900
000CCCCCCCCCC000
00CCCCC00CCCCC00
0CCCCC0990CCCCC0
0CCCC099990CCCC0
0CCC00000000CCC0
0000000000000000`],
  [ floor, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
0000000000000000
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
0000000000000000
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
0000000000000000
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
0000000000000000
CCCCCCCCCCCCCCCC` ],
  [ goal, bitmap`
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0000000000000000
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0000000000000000
0CCCCCCCCCCCCCC0
0000000000000000
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0000000000000000
0CCCCCCCCCCCCCC0
0000000000000000
0000000000000000` ],
)

setBackground(floor)

setSolids([wall, player, box, spikebox, crackedwall])

let level = 0
const levels = [
  map`
p
.
.
.
.
.
g`,
  map`
.p.
...
bbb
...
...
...
..g`,
  map`
p...
....
.b..
..s.
....
wccw
....
....
...g`,
  map`
...........w.......
...b.......w.......
wwww.wwww..w.wwww..
.p...w..w.swcw..w..
.....w..wccwsw..w..
wwwwww..w....w..w..
........w....w..w..
........w....w..w.g`,
  map`
pw......w....w...w.g
.w..s...c..s.c...w..
.ww.....w.b..w...w..
..w.....wcccww...w..
bbw.....w...c....w..
sswwcwwww...cs...w..
ccww.s..w....wwwww..
.bsc....w..s.....w..
...w....w........c..`,
  map`
.........
.........
....s....
..bwccwww
...w..w.g
...w..w..
...wb.w..
..sw..w..
.psc..c..`
]

setMap(levels[level])

setPushables({
  [ player ]:  [ box, player ],
  [ box ]: [ spikebox, box ],
  [ spikebox ]: [crackedwall]
})

function checkTileType(x, y, type) {
  /*
  Checks if the tile at coordinates (x, y) matches the specified type.
  x: The x-coordinate of t09dddhe tile to check.
  y: The y-coordinate of the tile to check.
  type: The expected type of the tile.
  returns: True if the tile exists and matches the type; false otherwise.
  */
  
  const tile = getTile(x, y)[0];
  return tile && tile["type"] === type;
}

function updateBox(x, y, dx, dy) {
  /*
  Attempts to update box-related tiles based on a player’s position and movement direction.

  x: The current x-coordinate of the player.
  y: The current y-coordinate of the player.
  dx: The x-direction of movement (1 for right, -1 for left, 0 for vertical movement).
  dy: The y-direction of movement (1 for down, -1 for up, 0 for horizontal movement).
  */
  
  // Calculate the theoretical coordinates for the box, spikebox, and cracked wall tiles
  const boxX = x + 1 * dx;
  const boxY = y + 1 * dy;
  const spikeboxX = x + 2 * dx;
  const spikeboxY = y + 2 * dy;
  const crackedwallX = x + 3 * dx;
  const crackedwallY = y + 3 * dy;

  // Check if the tiles match the sequence: box -> spikebox -> crackedwall
  if (checkTileType(boxX, boxY, box) &&
      checkTileType(spikeboxX, spikeboxY, spikebox) &&
      checkTileType(crackedwallX, crackedwallY, crackedwall)) {

    // Clear the cracked wall and spikebox tiles if conditions are met
    clearTile(crackedwallX, crackedwallY);
    clearTile(spikeboxX, spikeboxY);
  }
}

function movePlayer(dx, dy) { 
  /*
  Moves the player in the specified direction and updates the box tiles accordingly.
  
  dx: The x-direction of movement (1 for right, -1 for left, 0 for vertical movement).
  dy: The y-direction of movement (1 for down, -1 for up, 0 for horizontal movement).
  */
  
  const p = getFirst(player);
  updateBox(p.x, p.y, dx, dy); // Check and update tiles based on player position
  p.x += dx; // Update player's x-coordinate
  p.y += dy; // Update player's y-coordinate
}

onInput("s", () => {
  movePlayer(0, 1);
})
onInput("w", () => {
  movePlayer(0, -1);
})
onInput("d", () => {
  movePlayer(1, 0);
})
onInput("a", () => {
  movePlayer(-1, 0);
})
onInput("j", () => {
  setMap(levels[level])
})

// these get run after every input
afterInput(() => {
    const goalsCovered = tilesWith(player, goal); // tiles that both contain the player and goal

    // if at least one goal is overlapping with a player, proceed to the next level
    if (goalsCovered.length >= 1) {
        // increase the current level number
        level = level + 1;

        // check if current level number is valid
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("you win!", { y: 4, color: color`4` });
        }
    }
});
