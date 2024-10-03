/*
@title: platform_rogue
@author: @farreltobias
@tags: []
@addedOn: 2022-08-22
*/

const createArray = (size) => [...Array(size).keys()];
const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

const player = "p";
const wall = "w";
const coin = "c";
const spike = "s";

// playing, win, loss
let status = "playing";

let didMoveRight = false;
let jumps = 0;
let size = 0;
let hasCoin = false;
let obstacle;
let counter = 0;
let spacesToAppearSpike = 10;
let finalY = 0;

const killables = [coin, spike];

const playerDead = [
  player,
  bitmap`
................
................
................
................
................
................
................
................
................
.........33.....
.......33333....
......3333333...
...33333333333..
..3333333333333.
.33333333333333.
................`,
];

const playerAlive = [
  player,
  bitmap`
................
................
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
................
................`,
];

const objects = [
  [
    wall,
    bitmap`
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
0000000000000000`,
  ],
  [
    coin,
    bitmap`
......0000......
....00222200....
...0226666660...
...0266226660...
..026626606660..
..026626606660..
..026626606660..
..026626606660..
..026626606660..
..026626606660..
..026626606660..
...0666006660...
...0666666660...
....00666600....
......0000......
................`,
  ],
  [
    spike,
    bitmap`
.....021111L0...
.....02111LL0...
.....0021LL0....
......021L0.....
......021L0.....
......022L0.....
......002L0.....
.......020......
.......020......
.......020......
........00......
........0.......
........0.......
................
................
................`,
  ],
];

setLegend(playerAlive, ...objects);

setSolids([player, wall]);

let level = 0;
const levels = [
  map`
...............
...............
...............
...............
...............
...............
.......c.......
......ww...c...
..ww..ww..www..
p.ww..ww..www..`,
  map`
...............
...............
...........wwww
.........c..www
........ww...ww
........ww....w
.....ww.......w
.....ww..cc...w
..ww.....cc..ww
..ww........www`,
];

const finalSection = 
map`...............
...............
...........wwww
.........c..www
........ww...ww
........ww....w
.....ww.......w
.....ww..cc...w
..ww.....cc..ww
..ww........www`
  .split(/\n+/)

const obstacles = [
  {
    width: 4,
    height: 1,
    border: 1,
    y: 6,
  },
  {
    width: 2,
    height: 2,
    border: 1,
    y: 9,
  },
  {
    width: 2,
    height: 3,
    border: 1,
    y: 9,
  },
  {
    width: 2,
    height: 2,
    border: 1,
    y: 5,
    doesFall: true,
  },
  {
    width: 3,
    height: 1,
    border: 1,
    y: 8,
  },
  {
    width: 2,
    height: 2,
    border: 1,
    y: 6,
  },
];

setMap(levels[level]);

onInput("d", () => {
  if (status === "loss") return;

  didMoveRight = true;

  if (getFirst(player).x >= 10 && finalY != 15) return;

  getFirst(player).x++;
});

onInput("a", () => {
  if (status === "loss") return;

  getFirst(player).x--;
});

onInput("w", () => {
  if (status === "loss") return;

  if (jumps) return;

  jumps++;
  jump().then(async () => {
    jumps--;
  });
});

const jump = async () => {
  await createArray(3).reduce(async (promise) => {
    await promise;

    getFirst(player).y--;

    checkIfKillablesWereTouched();

    await wait(100);
  }, Promise.resolve());

  await resetGravity();
};

const resetGravity = async () => {
  await createArray(3).reduce(async (promise) => {
    await promise;

    getFirst(player).y++;

    await wait(100);
  }, Promise.resolve());
};

const shake = () => {
  if (typeof document === "undefined") return;
  const gameCanvasContainer = document.querySelector(".game-canvas-container");

  gameCanvasContainer.classList.add("shake");

  setTimeout(() => {
    gameCanvasContainer.classList.remove("shake");
  }, 200);
};

// gravity
setInterval(() => {
  checkIfKillablesWereTouched();

  if (jumps || getFirst(player).y === 10) return;

  getFirst(player).y++;
}, 100);

const killPlayer = () => {
  counter = 0;
  finalY = 0;

  if (status === 'loss') return; 

  status = "loss";

  addText("You lost!", {
    x: 10,
    y: 4,
    color: color`3`,
  });

  shake();

  setLegend(playerDead, ...objects);

  setTimeout(() => {
    setLegend(playerAlive, ...objects);

    setMap(levels[level]);

    getFirst(player).y = 10;
    getFirst(player).x = 0;

    clearText();

    status = "playing";

  }, 400);
};

const checkIfKillablesWereTouched = () => {
  const { y: playerY, x: playerX } = getFirst(player);

  const playerTochedKillable = getTile(playerX, playerY).some(({ type }) =>
    killables.includes(type)
  );

  if (playerTochedKillable) killPlayer();
};

const fallBlock = (spike) => {
  // const wallsWithSpike = tilesWith(wall).filter((w) => w.x === spike.x);

  createArray(10 - spike.y).reduce(async (promise) => {
    await promise;

    // wallsWithSpike.forEach((b) => {
    //   b.y++;
    // })

    if (spike.y === 9) spike.remove();
    spike.y++;

    await wait(100);
  }, Promise.resolve());
};

afterInput(() => {
  checkIfKillablesWereTouched();

  if (getFirst(player).x === 14) {
    addText("You Win!", {
      x: 5,
      y: 4,
      color: color`5`,
    });

    status = "win";

    return;
  }

  if (finalY === 15) {
    return;
  }

  const { y: playerY, x: playerX } = getFirst(player);

  const playerIsBlocked = tilesWith(wall).some(
    ([{ y, x }]) => y === playerY && x === playerX + 1
  );
  const playerIsInScrollPosition =
    getFirst(player).x === 10 && getFirst(player).dx === 0;

  if (
    !playerIsInScrollPosition ||
    !didMoveRight ||
    playerIsBlocked ||
    status === "loss"
  )
    return;

  didMoveRight = false;

  objects.forEach(([letter]) => {
    getAll(letter).forEach((l) => {
      if (!l.x) l.remove();
      l.x--;
    });
  });

  if (spacesToAppearSpike < 0) {
    const showTrap = Math.floor(Math.random() * 2);

    if (showTrap) {
      addSprite(11, 9, coin);
      spacesToAppearSpike = 10;
    }
  }

  spacesToAppearSpike--;

  const spikeFound = getAll(spike).find((s) => s.x === getFirst(player).x);

  if (spikeFound) fallBlock(spikeFound);

  // check if player has passed more than 10 obstacles
  if (counter === 10 && !size) {
    finalSection.map((line, y) => {
      if (line[finalY] === ".") return;

      addSprite(14, y, line[finalY]);
    });

    finalY++;

    return;
  }

  if (!size) {
    counter++;

    const index = Math.floor(Math.random() * obstacles.length);
    obstacle = obstacles[index];

    size = obstacle.width + obstacle.border * 2;

    hasCoin = false;
  }

  const { width, border, height, y, doesFall } = obstacle;

  size -= 1;

  if (size <= width + border && size > border) {
    createArray(height).forEach((_, index, self) => {
      addSprite(14, y - index, wall);

      if (!index && doesFall) {
        addSprite(14, y - index + 1, spike);
      }

      if (self.length - 1 === index && !hasCoin) {
        const showCoin = Math.floor(Math.random() * 2);

        if (showCoin) {
          addSprite(14, y - index - 1, coin);
          hasCoin = true;
        }
      }
    });
  }
});