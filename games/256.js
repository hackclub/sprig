/*
@title: 256
@author: jzhao
@tags: ['retro']
@addedOn: 2022-08-22
*/

const b2 = "1";
const b4 = "2";
const b8 = "3";
const b16 = "4";
const b32 = "5";
const b64 = "6";
const b128 = "7";
const b256 = "8";
const w = "w";

const pts = (str) => Math.pow(2, parseInt(str))
let blocks = [b2, b4, b8, b16, b32, b64, b128, b256];

setLegend(
  [ b2, bitmap`
................
..111111111111..
.11111111111111.
.11111111111111.
.11111111111111.
.11111111111111.
.11111111111111.
.11111111111111.
.11111111111111.
.11111111111111.
.11111111111111.
.11111111111111.
.11111111111111.
.11111111111111.
..111111111111..
................`],
  [ b4, bitmap`
................
..LLLLLLLLLLLL..
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
.LLLLLLLLLLLLLL.
..LLLLLLLLLLLL..
................`],
  [ b8, bitmap`
................
..333333333333..
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
..333333333333..
................`],
  [ b16, bitmap`
................
..444444444444..
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
.44444444444444.
..444444444444..
................`],
  [ b32, bitmap`
................
..555555555555..
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
.55555555555555.
..555555555555..
................`],
  [ b64, bitmap`
................
..666666666666..
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
..666666666666..
................`],
  [ b128, bitmap`
................
..777777777777..
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
.77777777777777.
..777777777777..
................`],
  [ b256, bitmap`
................
..888888888888..
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
.88888888888888.
..888888888888..
................`],
  [ w, bitmap`
1111111111LLLLLL
1LLLLLLLLLLLLLL0
1LLLLLLLLLLLLLL0
1LLLLLLLLLLLLLL0
1LLLLLLLLLLLLLL0
1LLLLLLLLLLLLLL0
1LLLLLLLLLLLLLL0
1LLLLLLLLLLLLLL0
1LLLLLLLLLLLLLL0
1LLLLLLLLLLLLLL0
LLLLLLLLLLLLLLL0
LLLLLLLLLLLLLLL0
LLLLLLLLLLLLLLL0
LLLLLLLLLLLLLLL0
LLLLLLLLLLLLLLL0
LL00000000000000`]
);

setMap(map`
wwwwww
w....w
w....w
w....w
w....w
wwwwww`);

setSolids([w]);

function getRandomInt(min, max) {
  return Math.floor(Math.random());
}

function getEmptyTiles() {
  const tiles = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (getTile(i + 1, j + 1).length === 0) {
        tiles.push([i + 1, j + 1]);
      }
    }
  }
  return tiles;
}

const addNewTile = () => {
  const empty = getEmptyTiles()
  const [x, y] = empty[Math.floor(Math.random() * empty.length)]
  const sprite = Math.random() < 0.5 ? b2 : b4;
  addSprite(x, y, sprite);
}

const drawScore = (score) => {
  clearText();
  addText(`${score}pts`, {x: 3, y: 1, color: color`2`});
}

let score = 0;
let gameOver = false;
const checkGameOver = () => getEmptyTiles().length === 0;

function step() {
  if (gameOver) return;
  addNewTile();
  drawScore(score);
  blocks
    .forEach(block => getAll(block)
      .forEach(sprite => addText(
        `${pts(block)}`,
        {
          x: (sprite.x) * 3 + 2,
          y: (sprite.y) * 2 + 2,
          color: color`0`
        }
      ))
    )
}

step();

function serializeBoardState() {
  return getAll().reduce((s, cur) => s + cur.x + cur.y, "")
}

function moveAll(dx, dy) {
  if (!gameOver) {
    let bs = "";
    while (serializeBoardState() !== bs) {
      bs = serializeBoardState()
      blocks.forEach(block => getAll(block).forEach(sprite => {
        // check if neighbour is of same type
        const neighbourTiles = getTile(sprite.x + dx, sprite.y + dy).map(t => t.type);
        // console.log(neighbourTiles);
        if (neighbourTiles.includes(block) || neighbourTiles.length === 0) {
          sprite.x += dx;
          sprite.y += dy;
        }
      }))
    }
  }
}

onInput("w", () => moveAll(0, -1));
onInput("a", () => moveAll(-1, 0));
onInput("s", () => moveAll(0, 1));
onInput("d", () => moveAll(1, 0));

afterInput(() => {
  // collapse all tiles
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      const sprites = getTile(i + 1, j + 1);
      if (sprites.length > 1) {
        const total = sprites.reduce((res, sprite) => res + pts(sprite.type), 0);
        score += total;
        clearTile(i + 1, j + 1);
        const newSpriteType = `${parseInt(sprites[0].type) + 1}`;
        addSprite(i + 1, j + 1, newSpriteType);
      }
    }
  }

  step();
  
  // check if win
  if (getAll(b256).length > 0) {
    gameOver = true;
    addText(`You win!`, {x: 6, y: 13, color: color`4`});
  }

  if (checkGameOver()) {
    gameOver = true;
    addText(`You lose!`, {x: 6, y: 13, color: color`3`});
  }
});

