const adventurer = "A";
const lion = "L";
const snake = "S";
const treasure = "T";

var score = 0;
var timeLeft = 60;
var gameOver = false;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

setLegend(
  [adventurer, bitmap`
......00000.....
......09990.....
......09990.....
......00000.....
....0...0...0...
.....0..0..0....
......0.0.0.....
.......000......
........0.......
........0.......
.......0.0......
......0...0.....
.....0.....0....
....0.......0...
................
................`],
  [lion, bitmap`
......0000......
....00999900....
..00999999990...
.09999999999900.
099920999209990.
099900999009990.
.0999999999990..
.0999900099990..
.09999909999990.
099990090099990.
09999999999990..
.099999999990...
..0999999990....
...00000000.....
................
................`],
  [snake, bitmap`
....00000000....
...0444444440...
..044444444440..
.04004444440040.
0440044444400440
0440044444400440
0444444LL4444440
0444444LL4444440
0444444444444440
04444LLLLLL44440
044444LLLL444440
0444444LL4444440
.04444444444440.
..048844448840..
...0884444880...
....00000000....`],
  [treasure, bitmap`
.....000000.....
....06666660....
...0666666660...
..066666666660..
.0666FFFFFF6660.
06666F6666F66660
06666F6666F66660
06666F6666F66660
06666F6666F66660
06666F6666F66660
06666F6666F66660
.0666F6666F6660.
..066FFFFFF660..
...0666666660...
....06666660....
.....000000.....`]
);

const baseLevels = [
  map`
..L..........
.S...........
.S.A.........
.............
..L..........
.S...........
.............
...........L.
..S..........
S............`,
  map`
.............
.S...S.......
.S.L.........
.............
...S.........
..L..........
.............
...........S.
...L.........
A............`
];



let level = 0;

function randomizeTreasures(mapData, treasureCount) {
  const width = mapData[0].length;
  const height = mapData.length;
  let treasuresPlaced = 0;

  while (treasuresPlaced < treasureCount) {
    const x = getRandomInt(0, width - 1);
    const y = getRandomInt(0, height - 1);

    if (mapData[y][x] === ".") {
      mapData[y] = mapData[y].substring(0, x) + treasure + mapData[y].substring(x + 1);
      treasuresPlaced++;
    }
  }

  return mapData;
}

function initializeMap(levelIndex) {
  const baseMap = baseLevels[levelIndex].split("\n").filter(row => row.trim() !== "");
  const treasureCount = 10; 
  const randomizedMap = randomizeTreasures(baseMap, treasureCount);
  return randomizedMap.join("\n");
}

setMap(initializeMap(level));

onInput("w", () => {
  if (!gameOver) {
    const adv = getFirst(adventurer);
    adv.y = Math.max(0, adv.y - 1);
  }
});

onInput("s", () => {
  if (!gameOver) {
    const adv = getFirst(adventurer);
    adv.y = Math.min(height() - 1, adv.y + 1);
  }
});

onInput("a", () => {
  if (!gameOver) {
    const adv = getFirst(adventurer);
    adv.x = Math.max(0, adv.x - 1);
  }
});

onInput("d", () => {
  if (!gameOver) {
    const adv = getFirst(adventurer);
    adv.x = Math.min(width() - 1, adv.x + 1);
  }
});

onInput("i", () => {
  if (gameOver) {
    gameOver = false;
    score = 0;
    timeLeft = 60;
    setMap(initializeMap(level));
    update();
  }
});

function checkCollisions() {
  const adventurerPos = getFirst(adventurer);

  getAll(treasure).forEach((treasureItem) => {
    if (adventurerPos.x === treasureItem.x && adventurerPos.y === treasureItem.y) {
      score += 10;
      treasureItem.remove();
    }
  });

  getAll(lion).forEach((lionItem) => {
    if (adventurerPos.x === lionItem.x && adventurerPos.y === lionItem.y) {
      endGame("Lion 8 u!");
    }
  });

  getAll(snake).forEach((snakeItem) => {
    if (adventurerPos.x === snakeItem.x && adventurerPos.y === snakeItem.y) {
      endGame("Snake 8 u!");
    }
  });
}

function moveAnimals() {
  getAll(lion).forEach((lionItem) => {
    const direction = getRandomInt(0, 3);
    if (direction === 0 && lionItem.x > 0) lionItem.x -= 1;
    else if (direction === 1 && lionItem.x < width() - 1) lionItem.x += 1;
    else if (direction === 2 && lionItem.y > 0) lionItem.y -= 1;
    else if (direction === 3 && lionItem.y < height() - 1) lionItem.y += 1;
  });

  getAll(snake).forEach((snakeItem) => {
    const direction = getRandomInt(0, 3);
    if (direction === 0 && snakeItem.x > 0) snakeItem.x -= 1;
    else if (direction === 1 && snakeItem.x < width() - 1) snakeItem.x += 1;
    else if (direction === 2 && snakeItem.y > 0) snakeItem.y -= 1;
    else if (direction === 3 && snakeItem.y < height() - 1) snakeItem.y += 1;
  });
}

function spawnDynamicEntities() {
  if (getRandomInt(0, 10) > 7) {
    const x = getRandomInt(0, width() - 1);
    const y = getRandomInt(0, height() - 1);
    if (getTile(x, y) === ".") {
      addSprite(x, y, treasure);
    }
  }

  if (getRandomInt(0, 10) > 8) {
    const x = getRandomInt(0, width() - 1);
    const y = getRandomInt(0, height() - 1);
    if (getTile(x, y) === ".") {
      addSprite(x, y, getRandomInt(0, 1) === 0 ? lion : snake);
    }
  }
}

function update() {
  if (gameOver) return;

  timeLeft -= 1;
  clearText();
  addText(`Time: ${timeLeft}`, { x: 1, y: 0, color: color`3` });
  addText(`Score: ${score}`, { x: 10, y: 0, color: color`3` });

  if (timeLeft <= 0) {
    endGame("Time's up!");
    return;
  }

  moveAnimals();
  spawnDynamicEntities();
  checkCollisions();

  if (getAll(treasure).length === 0) {
    endGame("Congratulations!");
  }

  setTimeout(update, 500);
}

function endGame(message) {
  gameOver = true;
  clearText();
  addText(message, { x: 2, y: 5, color: color`4` });
  addText("Restart: I", { x: 3, y: 7, color: color`4` });
}

update();