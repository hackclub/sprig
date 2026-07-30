/*
@title: Maze01
@author: Shivam Hegadi
@description: Navigate through 10 mazes
@tags: ["maze01"]
@addedOn: 2026-07-25
*/

const hero = "p";
const wall = "w";
const finish = "g";
let currentLevel = 0;
let moves = 0;

setLegend(
  [hero, bitmap`
0000000000000000
0000000000000000
0000011111000000
0000010001000000
0000100001000000
0000100001000000
0001110110000000
0001001001000000
0001011110000000
0000100001000000
0000100001000000
0000100001000000
0000011110000000
0000010001000000
0000100001000000
0000000000000000`],
  [wall, bitmap`
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
  [finish, bitmap`
1010101010101010
0101010101010101
1010101010101010
0101010101010101
1010101010101010
0101010101010101
1010101010101010
0101010101010101
1010101010101010
0101010101010101
1010101010101010
0101010101010101
1010101010101010
0101010101010101
1010101010101010
0101010101010101`]
);

const levels = [
  map`
wwwwwwwwwwwwwwww
w.......w.....ww
w.wwwww.w.www.ww
w.....w.......ww
w.www.w.wwwwwwww
w...w..........w
w.w.w.wwwww.wwww
w.w.......w...ww
w.www.w.w.w.w.ww
w.w..g..w.....ww
w.w.wwwww.w.wwww
w.......w.w...ww
w.w.w.w.w.w.w.ww
wp..w.w.w.....ww
wwwww...wwwwwwww
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w.....w.w...w..w
w.www.w.w.w.w.ww
w.......w...w.ww
w.wwwwwww.www.ww
w.........w...ww
w.www.wwwww.w.ww
w.w....g......ww
w.w.wwwww.www.ww
w.w...........ww
w.w.w.www.w.wwww
w...w...w.....ww
www.w.w.w.w.w.ww
wp..w...w.w.w..w
wwwwwwww..www..w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w.............ww
www.wwwwwwwww.ww
w.......w.....ww
w.w.w.w.w.w.w.ww
w.w.w.....w.w.ww
wwwgwww.www.w.ww
w.....w.....w.ww
w.w.wwwww.www.ww
w.w.....w.....ww
w.wwwww.w.www.ww
w.......w.....ww
wwwwwww.wwwww.ww
wp..........w..w
wwwwwwwwwww..www
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w.....w.......ww
w.w.www.www.w.ww
w.w...........ww
www.wwwwwwwwwwww
w.......w.....ww
w.w.www.w.www.ww
w.w...w..gw...ww
w.w.www.w.wwwwww
w.w.....w.....ww
w.www.w.w.w.w.ww
w...w.w.w.w.w.ww
www.w.w.w.w.w.ww
wp..w.w.w...w.ww
w..wwwwwwwwwwwww
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w.............ww
www.w.www.www.ww
w...w.....w...ww
w.w.w.w.w.w.wwww
w.w.w.w.w.....ww
w.www.www.w.w.ww
wgw.w...w...w.ww
w.w.w.w.wwwww.ww
w.w...w.....w.ww
w.w.w.www.w.w.ww
w.w.w...w.w.w.ww
www.wwwww.w.wwww
wp............ww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w.............ww
www.wwwww.w.w.ww
w.......w.w...ww
wwwww.w.w.www.ww
w.....w...w.g.ww
www.w.www.w.w.ww
w...w...w.w.w.ww
w.w.www.www.w.ww
w.w.......w.w.ww
w.wwwwwww.w.wwww
w.......w.....ww
www.w.wwwww.w.ww
wp..w...w...w.ww
w.wwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w.....w...w...ww
w.www.w.w.w.wwww
w...w......g..ww
www.wwwwwwwww.ww
w.........w.w.ww
w.wwwww.www.wwww
w.w...w.w.....ww
w.www.w.w.wwwwww
w.w.........w.ww
w.w.w.w.w.w.w.ww
w.w...w.w.w...ww
wwwww.w.w.w.wwww
wp....w.w.w...ww
w.wwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w.....w.....w.ww
w.w.w.w.www.w.ww
w.w.w...w.w.w.ww
www.www.w.w.w.ww
w.....w...w...ww
w.wwwww.wwwww.ww
w...w.w.....w.ww
w.www.w.w.w.wwww
w...w...w.w.w.ww
w.wwwwwww.w.w.ww
w..gw.....w...ww
wwwwwwwww.w.wwww
wp........w...ww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w.............ww
w.wwwwwwwww.w.ww
w.........w.w.ww
w.w.www.www.wwww
w.w...w...w.w.ww
w.wwwww.www.w.ww
w...w.w...w...ww
w.w.w.wwwww.wwww
w.w.....w.w...ww
w.www.www.w.w.ww
w...w...w.w.w.ww
wwwww.wwwgw.wwww
wp....w.......ww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w...........w.ww
w.wwwww.w.www.ww
w...w...w...w.ww
www.wwwwwww.w.ww
w.........w.w.ww
wwwww.wwwww.w.ww
w...w.w.......ww
www.w.wwwww.w.ww
w.w.......w.w.ww
w.www.wwwwwww.ww
w...w.w...w...ww
w.w.w.w.w.www.ww
wpw.....w.wg..ww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww`
];

const MAP_WIDTH = 16;
const MAP_HEIGHT = 16;

setMap(levels[currentLevel]);
drawHUD();

function moveHero(dx, dy) {
  const p = getFirst(hero);
  if (!p) return;

  const targetX = p.x + dx;
  const targetY = p.y + dy;

  // dont go off the map
  if (targetX < 0 || targetX >= MAP_WIDTH || targetY < 0 || targetY >= MAP_HEIGHT) {
    return;
  }

  const tile = getTile(targetX, targetY);
  const blocked = tile.find(sprite => sprite.type === wall);

  if (blocked) return;

  p.x = targetX;
  p.y = targetY;

  moves = moves + 1;
  drawHUD();
}

function centerX(text) {
  return Math.floor((20 - text.length) / 2);
}

function drawHUD() {
  clearText();
  const levelText = "lvl " + (currentLevel + 1).toString().padStart(2, "0");
  const movesText = "moves " + moves.toString().padStart(3, "0");
  addText(levelText, { x: centerX(levelText), y: 0 });
  addText(movesText, { x: centerX(movesText), y: 15 });
}

onInput("w", () => moveHero(0, -1));
onInput("a", () => moveHero(-1, 0));
onInput("s", () => moveHero(0, 1));
onInput("d", () => moveHero(1, 0));

// j resets the level
onInput("j", () => {
  moves = 0;
  setMap(levels[currentLevel]);
  drawHUD();
});

afterInput(() => {
  let heroSprite = getFirst(hero);
  if (!heroSprite) return;

  let tile = getTile(heroSprite.x, heroSprite.y);

  let onFinish = false;
  for (const sprite of tile) {
    if (sprite.type === finish) {
      onFinish = true;
    }
  }

  if (onFinish) {
    if (currentLevel < levels.length - 1) {
      currentLevel = currentLevel + 1;
      moves = 0;
      setMap(levels[currentLevel]);
      drawHUD();
    } else {
      clearText();
      addText("You Win! moves: " + moves);
    }
  }
});