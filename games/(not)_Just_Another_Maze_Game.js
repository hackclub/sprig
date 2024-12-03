/*
@title: (not) Just Another Maze Game
@author: a-meriac
@tags: []
@addedOn: 2024-12-04
*/
const player = "p";
const wall = "w";
const goal = "g";

// Define the player sprite
const playerSprite = `
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
`;

// Define the wall sprite (green blocks)
const wallSprite = `
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
`;

// Define the goal sprite (red dot)
const goalSprite = `
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
`;

setLegend(
  [player, playerSprite],
  [wall, wallSprite],
  [goal, goalSprite]
);

// Define the levels
const levels = [
  `
  wwwwwwwwwwww
  w..........w
  w.ww.wwwww.w
  w.w..w.w.w.w
  w.w.ww.w.w.w
  w.w....w.w.w
  w.wwwwww.w.w
  w........w.w
  wwwwwwwwwg.w
  w..........w
  wwwwwwwwwwww
  `,
  `
  wwwwwwwwwwww
  w..........w
  w.wwwwww.w.w
  w.w......w.w
  w.w.wwwww..w
  w.w.w......w
  w.w.w.wwwwww
  w.w........w
  w.wwwwwwww.w
  w.....g....w
  wwwwwwwwwwww
  `,
  `
  wwwwwwwwwwww
  w..........w
  w.ww.wwwww.w
  w.w..w.....w
  w.w.ww.wwwww
  w.w........w
  w.wwwwww.w.w
  w........w.w
  wwwwwwwwww.w
  w.g........w
  wwwwwwwwwwww
  `,
  `
  wwwwwwwwwwww
  w....w.....w
  w.ww.w.wwwww
  w.w..w..w..w
  w.w..ww.w..w
  w.ww...ww..w
  w..wwwww...w
  w....w...w.w
  w.ww.w.www.w
  w..g.w.....w
  wwwwwwwwwwww
  `,
  `
  wwwwwwwwwwww
  w........w.w
  w.wwwwww.w.w
  w.w......w.w
  w.w.wwwwww.w
  w.w.w......w
  w.w.w.wwwwww
  w.w........w
  w.wwwwwwww.w
  w......g...w
  wwwwwwwwwwww
  `,
  `
  wwwwwwwwwwww
  w....w.....w
  w.ww.w.wwwww
  w.w..w..w..w
  w.w..ww.w..w
  w.ww...ww..w
  w..wwwww...w
  w......g.w.w
  w.ww.w.www.w
  w....w.....w
  wwwwwwwwwwww
  `,
  `
  wwwwwwwwwwww
  w......w...w
  w.wwww.w.w.w
  w.w....w.w.w
  w.w.wwww.w.w
  w.w.w......w
  w.w.w.wwwwww
  w.w........w
  w.wwwwwwww.w
  w.g........w
  wwwwwwwwwwww
  `,
  `
  wwwwwwwwwwww
  w........w.w
  w.wwwwww.w.w
  w.w......w.w
  w.w.wwwwww.w
  w.w.w......w
  w.w.w.wwwwww
  w.w...g....w
  w.wwwwwwww.w
  w..........w
  wwwwwwwwwwww
  `,
  `
  wwwwwwwwwwww
  w..........w
  w.wwwwwwww.w
  w.w........w
  w.w.wwwwwwww
  w.w.w......w
  w.w.w.wwwwww
  w.w...w....w
  w.wwwwwwww.w
  w......g...w
  wwwwwwwwwwww
  `,
  `
  wwwwwwwwwwww
  w..........w
  w.wwwwwwww.w
  w........w.w
  w.wwwwww.w.w
  w....g...w.w
  w.wwwwww.w.w
  w........w.w
  wwwwwwww..ww
  w..........w
  wwwwwwwwwwww
  `
];

let currentLevel = 0;

const loadLevel = () => {
  setMap(levels[currentLevel]);
  addSprite(1, 1, player); // Place the player at the start
};

setSolids([player, wall]);

// Movement controls
onInput("w", () => {
  const playerObj = getFirst(player);
  if (!getTile(playerObj.x, playerObj.y - 1).some(t => t.isSolid)) {
    playerObj.y -= 1;
  }
});

onInput("a", () => {
  const playerObj = getFirst(player);
  if (!getTile(playerObj.x - 1, playerObj.y).some(t => t.isSolid)) {
    playerObj.x -= 1;
  }
});

onInput("s", () => {
  const playerObj = getFirst(player);
  if (!getTile(playerObj.x, playerObj.y + 1).some(t => t.isSolid)) {
    playerObj.y += 1;
  }
});

onInput("d", () => {
  const playerObj = getFirst(player);
  if (!getTile(playerObj.x + 1, playerObj.y).some(t => t.isSolid)) {
    playerObj.x += 1;
  }
});

// Check for level completion
afterInput(() => {
  if (tilesWith(player, goal).length > 0) {
    currentLevel++;
    if (currentLevel < levels.length) {
      loadLevel();
    } else {
      addText("You Win!", { x: 5, y: 6, color: color`3` });
    }
  }
});

// Load the first level
loadLevel();
