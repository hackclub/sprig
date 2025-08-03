/*
@title: Red Cube
@author: AxelMontlahuc
@tags: [platformer, cube, jump]
@addedOn: 2025-06-08
*/

const gravity = 1;
let jumping = false;
let moving = false;

const player = "p";
const background = "b";
const platform1 = "1";

setLegend(
  [ player, bitmap`
..333333333333..
.33333333333333.
3333333333333333
3333333333333333
3333223333223333
3333233333323333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333223333223333
3333322222233333
3333332222333333
3333333333333333
.33333333333333.
..333333333333..` ],
  [ platform1, bitmap`
D4D4D444D4D44D44
444444D4444D44D4
D44D4D444D444D4D
4D4444D4444D44D4
44C4F44C44CF44C4
CFC4CCCC4CCCC4CC
FCCCCCFCCCFCCCCF
CCCCFCCCCCCCCCCC
CCCCCCCCCCCCCFCC
CC9CCCCCC9CCCCCC
CCCCCC9CCCCCC9CC
CCCCCCCCCCCCCC9C
C9CCCCCCCC9CCCCC
CCCC9CCCC9CCCCCC
.CCCCCCCCCCCCCC.
..CCCC9CCCCC9C..` ],
  [ background, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ]
)

setBackground(background);
setSolids([ player, platform1 ]);

const levels = [
  map`
............
............
............
............
............
............
............
p...........
111111111111`,

  map`
............
............
............
............
............
............
....11......
p...........
111....11111`,

  map`
............
............
............
............
............
............
p..111......
1.......1...
11.....11111`,

  map`
............
............
............
............
............
.....1......
p..1........
1...........
111....11111`,

  map`
............
............
............
............
.....1......
....1.......
..1.........
p......1....
1.......1111`,

  map`
............
............
............
........1...
......1.....
............
....1.......
p...........
11.....11111`,

  map`
............
............
......1.....
............
....1.......
............
..1.........
p...........
1.......1111`,

  map`
............
............
............
......1.....
...1........
......11....
...11.......
p...........
11........11`,

  map`
............
............
........1...
.11.....1...
.1..........
........11..
.11.........
p...111.....
1.........11`,

  map`
............
............
..1..1..1...
............
............
..11.11.11..
............
p1..........
11........11` 
];

let currentLevel = 0;
setMap(levels[currentLevel]);

setPushables({ [ player ]: [] });

function getPlayer() {
  return getFirst(player);
}

function isOnGround() {
  const p = getPlayer();
  const below = getTile(p.x, p.y + 1);
  return below.some(t => t.type === platform1);
}

function canJump() {
  const p = getPlayer();
  const top1 = getTile(p.x, p.y - 1);
  const top2 = getTile(p.x, p.y - 2);
  const top3 = getTile(p.x, p.y - 3);
  const bool1 = top1.some(t => t.type === platform1);
  const bool2 = top2.some(t => t.type === platform1);
  const bool3 = top3.some(t => t.type === platform1);

  if (bool1 || bool2 || bool3) {
    return false;
  } else {
    return true;
  }
}

function smoothJump(player, totalHeight) {
  let jumpCount = 0;
  
  const jumpInterval = setInterval(() => {
    if (jumpCount < totalHeight) {
      player.y -= 1;
      jumpCount++;
    } else {
      clearInterval(jumpInterval);
      jumping = false;
    }
  }, 150);
}

function respawn() {
  setMap(levels[currentLevel]);
  velocityY = 0;
  jumping = false;
}

onInput("a", () => {
  if (!moving) {
    getPlayer().x -= 1;
    moving = true;
  }
});
onInput("d", () => {
  if (!moving) {
    getPlayer().x += 1;
    moving = true;
  }
});
onInput("w", () => {
  if (isOnGround() && canJump() && !jumping) {
    jumping = true;
    smoothJump(getPlayer(), 3);
  }
});

setInterval(() => {
  if (!isOnGround() && !jumping) {
    getPlayer().y += 1;
  }
}, 150);

setInterval(() => {
  moving = false;
}, 100);

setInterval(() => {
  if (getPlayer().y >= height() - 1) {
    respawn();
  }
}, 1000);

afterInput(() => {
  const p = getPlayer();

  if (p.x >= width() - 1) {
    currentLevel++;
    if (currentLevel < levels.length) {
      setMap(levels[currentLevel]);
    } else {
      clearText();
      addText("You win!", { x: 4, y: 6, color: color`3` });
    }
  }
});
