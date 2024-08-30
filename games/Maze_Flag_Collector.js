/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Maze Flag Collector Game
@author: Ravin
@tags: ["maze", "game"]
@addedOn: 2024-08-28
*/

const player = "p";
const flag = "f";
const wall = "w";
const coin = "c";

let playersprite = bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`;

let flagsprite = bitmap`
...0000.........
...0440.........
...0440.........
...0000.........
...0440000000000
...0440444444440
...0440444444400
...044044444000.
...0440444400...
...044000000....
...0440.........
..004400........
..044440........
0000000000......
0444444440......
0000000000......`;

let wallsprite = bitmap`
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
1111111111111111`;

let coinsprite = bitmap`
................
....66666666....
...6666666666...
..666666666666..
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
.66666666666666.
..666666666666..
...6666666666...
....66666666....
................`;

setLegend(
  [player, playersprite],
  [flag, flagsprite],
  [wall, wallsprite],
  [coin, coinsprite],
);

setSolids([player, wall]);

let level = 0;

// Map levels with coins
const levels = [
  map`
wwwwwwwwww
wp.....f.w
ww.wwww.ww
w....w...w
w..wwwww.w
w.....c.ww
ww.wwwwww.
w...c....w
wwwwwwwwww`,
  map`
wwwwwwwwww
w.c....cfw
w.wwwwww.w
w.w....pw.
w.w.w.w.w.
w.w.wcw.w.
w.w.w.w.w.
wc......w.
wwwwwwwwww`,
  map`
wwwwwwwwww
w........f
w.wwwwww.w
w.w.....cw
w.w.wwww.w
w.w....pww
w.cwwwwwww
w.....c..w
wwwwwwwwww`,
  map`
..........
wwwwwwwww.
wc....c.w.
w.wwwww.w.
w.w..pwcw.
w.w.www.w.
wcw..c..w.
w.wwwwwww.
wf........`
];

function loadLevel(levelIndex) {
  setMap(levels[levelIndex]);
}

loadLevel(level);

// Movement
setPushables({
  [player]: []
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

afterInput(() => {
  const playerSprite = getFirst(player);
  const flagSprite = getFirst(flag);
  const coins = getAll(coin);

  // Collect coins
  coins.forEach((coinSprite) => {
    if (playerSprite.x === coinSprite.x && playerSprite.y === coinSprite.y) {
      clearTile(coinSprite.x, coinSprite.y); // Clear the coin from the tile
      addSprite(playerSprite.x, playerSprite.y, player); // Re-add the player sprite to the tile
    }
  });

  // Check if player has collected all coins
  const allCoinsCollected = coins.length === 0;

  // Check if player has reached the flag
  if (playerSprite && flagSprite && playerSprite.x === flagSprite.x && playerSprite.y === flagSprite.y) {
    if (allCoinsCollected) {
      console.log("You collected all coins and the flag! You win!");

      // Move to the next level
      level += 1;
      if (level >= levels.length) {
        console.log("You have completed all levels!");
        level = 0; // Reset to the first level to play again
      }
      loadLevel(level);
    } else {
      console.log("You should collect all the coins before reaching the flag. Try again!");
    }
  } else {
    console.log("Player, flag, or coins not found!");
  }
});

