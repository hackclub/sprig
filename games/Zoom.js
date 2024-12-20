/*
Use WASD to move
Use J to restart a level
@title: Zoom
@author: Aperaine
@tags: [puzzle, quick, movement]
@addedOn: 2024-00-00
*/

const player = "p"
const wall = "w"
const wall1 = "W"
const background = "b"
const background1 = "B"
const goal = "g"
let direction = "down"
let moving = false

//Music
const levelComplete = tune`
100: C5-100,
100: G5-100,
3000`
const gameComplete = tune`
150: C4-150 + E4~150,
150: D4-150 + F4~150,
150: E4-150 + G4~150,
150: F4-150 + A4~150,
150: G4-150 + B4~150,
150: A4-150 + C5~150,
150: B4-150 + D5~150,
150: F4-150 + A4~150,
150: D4-150 + F4~150,
150: E4-150 + G4~150,
150: F4-150 + A4~150,
150: G4-150 + B4~150,
150: A4-150 + C5~150,
150: B4-150 + D5~150,
150: C5-150 + E5~150,
150: G4-150 + B4~150,
150: E4-150 + G4~150,
150: F4-150 + A4~150,
150: G4-150 + B4~150,
150: A4-150 + C5~150,
150: B4-150 + D5~150,
150: C5-150 + E5~150,
150: D5-150 + F5~150,
150: A4-150 + C5~150,
150: B4-150 + E5~150,
150: C5-150 + E5~150,
150: C5-150 + E5~150,
750`

setLegend(
  [player, bitmap`
0000000000000000
0444444444444440
0444444444444440
0440000000000440
0440222222220440
0440200000020440
0440207777020440
0440207777020440
0440207777020440
0440207777020440
0440200000020440
0440222222220440
0440000000000440
0444444444444440
0444444444444440
0000000000000000`],
  [wall, bitmap`
.00000000000000.
0D000000000000D0
00D0000000000D00
000D00000000D000
0000D000000D0000
00000D0000D00000
000000D00D000000
0000000DD0000000
0000000DD0000000
000000D00D000000
00000D0000D00000
0000D000000D0000
000D00000000D000
00D0000000000D00
0D000000000000D0
.00000000000000.`],
  [wall1, bitmap`
.00000000000000.
0C000000000000C0
00C0000000000C00
000C00000000C000
0000C000000C0000
00000C0000C00000
000000C00C000000
0000000CC0000000
0000000CC0000000
000000C00C000000
00000C0000C00000
0000C000000C0000
000C00000000C000
00C0000000000C00
0C000000000000C0
.00000000000000.`],
  [background, bitmap`
FFFFDDDDDDDDFFFF
FFFDDDDDDDDDDFFF
FFDDDDDDDDDDDDFF
FDDDDDDDDDDDDDDF
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
FDDDDDDDDDDDDDDF
FFDDDDDDDDDDDDFF
FFFDDDDDDDDDDFFF
FFFFDDDDDDDDFFFF`],
  [background1, bitmap`
HHHHCCCCCCCCHHHH
HHHCCCCCCCCCCHHH
HHCCCHHHHHHCCCHH
HCCHHHHHHHHHHCCH
CCCHHCCCCCCHHCCC
CCHHCCCCCCCCHHCC
CCHHCCHHHHCCHHCC
CCHHCCHHHHCCHHCC
CCHHCCHHHHCCHHCC
CCHHCCHHHHCCHHCC
CCHHCCCCCCCCHHCC
CCCHHCCCCCCHHCCC
HCCHHHHHHHHHHCCH
HHCCCHHHHHHCCCHH
HHHCCCCCCCCCCHHH
HHHHCCCCCCCCHHHH`],
  [goal, bitmap`
...........2....
..........222...
.........662....
.......66660....
.....6666660....
....66666660....
......666660....
........6660....
..........60....
...........0....
...........0....
...........0....
...........0....
...........0....
..........222...
.........22222..`]
)

setSolids([wall, player])

let level = 0
const levels = [
  map`
wwwwwwwww
w......gw
w......ww
w.......w
ww......w
wp......w
wwwwwwwww`,
  map`
wwwwwwwwwwwwww
wpw.....w....w
w...w........w
w............w
w......g.....w
w......w.....w
w............w
w............w
w............w
ww...........w
wwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwww
wp...........w
ww........ww.w
wg.........w.w
ww.........w.w
w..........w.w
w.ww.........w
w.w..........w
w.w.wwwwwwwwww
w...wwwwwwwwww
wwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwww
wp...........w
ww...........w
w..........w.w
w..w.........w
w........w...w
w.w..........w
w.........w..w
w............w
wwwwwwwwgwwwww
wwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwww
ww..........gw
ww.w........ww
w............w
w..........w.w
w.w..........w
w............w
w.........w..w
w..w...w....ww
w......p.....w
wwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwww
wpwg.........w
w.ww.........w
w............w
wwww.........w
wwwwwwwwwwwwww
wwww.........w
w............w
w.ww.........w
wpwg.........w
wwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwww
wpwpw........w
w............w
w............w
w............w
w............w
w............w
w...........gw
w...........ww
ww..........gw
wwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwww
wpwgw....wgwpw
w............w
w....w.......w
w.w..........w
w............w
w..w.........w
w.....w......w
w............w
w...w....w...w
wwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwww
wpw........wgw
w.........ww.w
w..w.........w
w......w.....w
wwwwwwwwwwwwww
wpw...w....wgw
w............w
w.....w......w
ww.......w...w
wwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwww
wpwpw.......gw
w...ww......ww
w...w........w
w............w
www..........w
wgw..........w
w.ww.........w
w......w.....w
w......w.....w
wwwwwwwwwwwwww`,
  map`
WWWWWWWWWWWWWW
W.........gggW
W.........WWWW
W............W
W............W
W............W
W............W
Wp...........W
Wp...........W
Wp...........W
WWWWWWWWWWWWWW`,
  map`
WWWWWWWWWWWWWW
WWWW......pWWW
WWWg......gWWW
WpgW......WgWW
W...W....W...W
W....WWWW....W
W...W....W...W
WWgW......WgpW
WWWg......gWWW
WWWp......WWWW
WWWWWWWWWWWWWW`,
  map`
WWWWWWWWWWWWWW
WW..........WW
W............W
W.WWWWgWWgW..W
W.gWgWWWgWg..W
W.gWgWgWWgW..W
Wp...........W
Wp...W.......W
WW...........W
WW..........WW
WWWWWWWWWWWWWW`
]


setMap(levels[level])
setBackground(background)
addText("WASD to move\nJ to reset", { x: 3, y: 4, color: color`2` });

onInput("s", () => {
  direction = "down"
  movePlayer();
})
onInput("w", () => {
  direction = "up"
  movePlayer();
})
onInput("a", () => {
  direction = "left"
  movePlayer();
})
onInput("d", () => {
  direction = "right"
  movePlayer();
})
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
})

const movePlayer = () => {
  let playerMoved = true;

  while (playerMoved) {
    playerMoved = false;

    const playerChars = getAll(player);
    let canMove = playerChars.length;

    for (const playerChar of playerChars) {
      const nextX = playerChar.x + (direction === "left" ? -1 : direction === "right" ? 1 : 0);
      const nextY = playerChar.y + (direction === "up" ? -1 : direction === "down" ? 1 : 0);

      if (!getTile(nextX, nextY).some(tile => tile.type == wall) && !getTile(nextX, nextY).some(tile => tile.type == wall1) && !getTile(nextX, nextY).some(tile => tile.type == player)) {
        playerChar.x = nextX;
        playerChar.y = nextY;

        playerMoved = true;
      } else {
        canMove -= 1;
      }
    }

    if (canMove == 0) {
      break;
    }

  }

  const goalCovered = tilesWith(goal, player).length;

  if (goalCovered === tilesWith(player).length) {
    level += 1;
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      clearText();
      setMap(currentLevel);
      playTune(levelComplete);
      if (level > 9){
        setBackground(background1)
      }
    } else {
      addText("you win!", { y: 4, color: color`2` });
      playTune(gameComplete);
    }
  }
  
}
