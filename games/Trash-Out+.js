/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Trash out+
@author: sapbot
@tags: []
@addedOn: 2025-00-00
*/

/*
Features above classic sokoban:
1. Alt boxes
2. Coins
3. Moving obstacles
4. Spike
*/

const player = "p"
const box = "b"
const trash = "t"
const brick = "r"
const altbox = "a"
const alttrash = "z"
const collectible = "c";
const movingObstacle = "m";
const spike = "s"
const dot = "w"

setLegend(
  [ player, bitmap`
................
......00000.....
....002222200...
...02222222220..
...02222222220..
..0222022202220.
..0222022202220.
..0222222222220.
..0222222222220.
..0222022202220.
...02220002220..
...02222222220..
....002222200...
......00000.....
................
................` ],
  [ box, bitmap`
9999999999999999
99CCCCCCCCCCCCC9
9C9CCCCCCCCCCCC9
9CC9CCCCCCCCCCC9
9CCC9CCCCCCCCCC9
9CCCC9CCCCCCCCC9
9CCCCC9CCCCCCCC9
9CCCCCC9CCCCCCC9
9CCCCCCC9CCCCCC9
9CCCCCCCC9CCCCC9
9CCCCCCCCC9CCCC9
9CCCCCCCCCC9CCC9
9CCCCCCCCCCC9CC9
9CCCCCCCCCCCC9C9
9CCCCCCCCCCCCC99
9999999999999999`],
  [ trash, bitmap`
................
....000.........
...01110........
...01010........
.000000000......
022121L1LL0.....
.000000000......
.01L1L1L10......
.01L1L1L10......
.01L1L1L10......
.01L1L1L10......
.01L1L1L10......
.01L1L1L10......
.01L1L1L10......
.01L1L1L10......
..0000000.......`],
  [ brick, bitmap`
3333333333333333
3999C999C999C999
3999C999C999C999
3CCCCCCCCCCCCCCC
39C999C999C999C9
39C999C999C999C9
3CCCCCCCCCCCCCCC
3999C999C999C999
3999C999C999C999
3CCCCCCCCCCCCCCC
39C999C999C999C9
39C999C999C999C9
3CCCCCCCCCCCCCCC
3999C999C999C999
3999C999C999C999
3CCCCCCCCCCCCCCC`],
  [ altbox, bitmap`
7777777777777777
7755555555555557
7575555555555557
7557555555555557
7555755555555557
7555575555555557
7555557555555557
7555555755555557
7555555575555557
7555555557555557
7555555555755557
7555555555575557
7555555555557557
7555555555555757
7555555555555577
7777777777777777`],
  [ alttrash, bitmap`
................
....555.........
...57775........
...57575........
.555555555......
57777777775.....
.555555555......
.577777775......
.577777775......
.577777775......
.577777775......
.577777775......
.577777775......
.577777775......
.577777775......
..5555555.......`],
  [ collectible, bitmap`
................
.....666666.....
....66666666....
....66699666....
....66699666....
....66699666....
....66699666....
....66699666....
....66699666....
....66699666....
....66699666....
....66699666....
....66699666....
....66666666....
.....666666.....
................`],
  [ movingObstacle, bitmap`
..333333333333..
.3............3.
3..............3
3..............3
3..............3
3..............3
3..333....333..3
3..333....333..3
3..333....333..3
3..............3
3..............3
3..............3
3..............3
3..............3
.3............3.
..333333333333..`],
  [ spike, bitmap`
.......0........
.......0........
......0L0.......
......0L0.......
.....0L1L0......
.....0L1L0......
....0L121L0.....
....0L121L0.....
...0L12221L0....
...0L12221L0....
..0L1222221L0...
..0L1222221L0...
.0L122222221L0..
.0L111111111L0..
0LLLLLLLLLLLLL0.
000000000000000.`],
  [ dot, bitmap`
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
0000000000000000`]
)

setSolids([player, box, brick, alttrash, movingObstacle])

let level = 0
const levels = [
  map`
..t.
....
.pb.
.c..`, // Level 1: Introduction to classic sokoban
  map`
.cccc.
.bbbb.
..t...
......
r.p..r
rrrrrr`, // Level 2: More boxes
  map`
rrrrrrrr
rc..r.tr
r...r..r
r..br..r
r...r..r
r...r..r
rp.br..r
r......r
rrrr...r`, // Level 3: A small gap
  map`
..a.
....
.pz.
c...`, // Level 4: Wait, blue boxes?
  map`
rrrrrrrrrrrrrrrr
rc.....rr.....cr
r.t..b.rr.z..a.r
r....b.rr....a.r
r......rr......r
r......rr......r
r....p.........r
rrrrrrrrrrrrrrrr`, // Level 5: Absolute alternative
  map`
rrrrrrrrrrrrrrrrr
rc......rc......r
r..p...zr......tr
r.......r.......r
r.......r.......r
r......br......ar
r.......r.......r
r.......r.......r
r......br......ar
r.......r.......r
r.......r.......r
r......br......ar
r.......r.......r
r.......r.......r
r......br......ar
r...............r
rrrrrrrrrr...rrrr
.........rrrrr...`, // Level 6: Sisyphus
  map`
....
.m..
p.bt
.m..`, // Level 7: Who is that???
  map`
...
pbt
s..`, // Level 8: Looks like a perfect triangle
  map`
ssssssss
s....zas
s.ssssss
s.......
ssssss.s
.......s
.sssssss
.......p`, // Level 9: A maze
  map`
rrrrrrrrrrrrrrrr
r...c..rr......r
r......rr......r
r.a..b.rr.t..z.r
r......rr......r
r.b..a.rr......r
r......rr......r
r.a..b.rr......r
r......rr......r
r.b..a.rr......r
r......rr......r
r.a..b.rr......r
r......rr......r
r......rr......r
r.p.........sssr
rrrr..srrs..rrrr`, // Level 10: Sisyphus 2
  map`
rrrrrrrrrrrrrrrr
r..c.....m.....r
r..t.....b.....r
r..p.....m.....r
rrrrrrrrrrrrrrrr`, // Level 11: Secret moves
  map`
rrrrrrrr
r...r.tr
r.r.r.br
r.r.r..r
rpr.r..r
r.r.r..r
rmr....r
rrrrrrrr`, // Level 12: Easier than it looks.
  map`
pbt`, // Level 13: Let me do nothing...
  map`
..............................
.b..b..b..b..b..b..b..b..b..b.
..............................
..............................
.b..b..b..b..b..b..b..b..b..b.
..............................
..............................
.b..b..b..b..b..b..b..b..b..b.
..............................
..............................
.b..b..b..b..b..b..b..b..b..b.
..............................
..............................
.b..b..b..b..b..b..b..b..b..b.
..............................
.p..........................t.`, // Level 14: ...or everything
  map`
................................................................
...www..w...w..www...ww..w......................................
...w....w...w..w..w..ww...w.....................................
..w....ww..w..w...w.......w.....................................
..www..w.w.w..w..w........w.....................................
.w....w...w..w...w...ww...w.....................................
.www..w...w..wwww....ww..w......................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
................................................................
p..............................................................t` // END
];

// REMOVE THIS PART AFTER TESTING --------------- [
const konamiCode = ["w", "w", "s", "s", "a", "d", "a", "d", "l", "d"]; // Up, Up, Down, Down, Left, Right, Left, Right, B, A
let konamiIndex = 0; // Current index in the Konami Code

// Function to check the Konami Code
const checkKonamiCode = (input) => {
  if (input === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      // Code entered correctly, skip to the next level
      level = levels.length - 1
      setMap(levels[level])
      konamiIndex = 0; // Reset the index
    }
  } else {
    // Reset the index if the input is incorrect
    konamiIndex = 0;
  }
};

// Modify the input handling to include the Konami Code check
onInput("s", () => {
  getFirst(player).y += 1;
  checkKonamiCode("s");
});
onInput("w", () => {
  getFirst(player).y -= 1;
  checkKonamiCode("w");
});
onInput("a", () => {
  getFirst(player).x -= 1;
  checkKonamiCode("a");
});
onInput("d", () => {
  getFirst(player).x += 1;
  checkKonamiCode("d");
});
onInput("l", () => {
  setMap(levels[level])
  checkKonamiCode("l");
});
// REMOVE THIS PART AFTER TESTING ]



setMap(levels[level])

afterInput(() => {
  const boxSprites = getAll(box)
  const trashSprite = getFirst(trash)

  if (trashSprite) {
    for (const box of boxSprites) {
      if (box.x === trashSprite.x && box.y === trashSprite.y) {
        box.remove()
        break; // Remove only the first box encountered
      }
    }
  }
})

setPushables({
  [player]: [box, alttrash],
})

// UNCOMMENT AFTER TESTING
/*onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("l", () => {
  setMap(levels[level])
})*/

let obstacleDirection = 1; // 1 for right, -1 for left
const initialObstacleX = 0; // Starting position of the obstacle
const obstacleMoveDistance = 1; // Move 1 block

const moveObstacle = () => {
  const obstacle = getFirst(movingObstacle);
  if (obstacle) {
    // Move the obstacle
    obstacle.x += obstacleDirection;

    // Check if the obstacle needs to change direction
    if (obstacle.x >= initialObstacleX + obstacleMoveDistance) {
      obstacleDirection = -1; // Change direction to left
    } else if (obstacle.x <= initialObstacleX - obstacleMoveDistance) {
      obstacleDirection = 1; // Change direction to right
    }
  }
};

// Call moveObstacle in the afterInput function
afterInput(() => {
  const boxSprites = getAll(box);
  const trashSprite = getFirst(trash);
  const playerSprite = getFirst(player);
  const obstacle = getFirst(movingObstacle);
  const altBoxSprites = getAll(altbox)
  const altTrashSprite = getFirst(alttrash)

  // Move the obstacle towards the player
  if (obstacle) {
    if (obstacle.x < playerSprite.x) {
      obstacle.x += 1; // Move right
    } else if (obstacle.x > playerSprite.x) {
      obstacle.x -= 1; // Move left
    }

    if (obstacle.y < playerSprite.y) {
      obstacle.y += 1; // Move down
    } else if (obstacle.y > playerSprite.y) {
      obstacle.y -= 1; // Move up
    }
  }

  // Remove altbox if it is on alttrash
  if (altTrashSprite) {
    for (const altBox of altBoxSprites) {
      if (altBox.x === altTrashSprite.x && altBox.y === altTrashSprite.y) {
        altBox.remove()
        break; // Remove only the first altbox encountered
      }
    }
  }
  
  // Remove box if it is on trash
  if (trashSprite) {
    for (const box of boxSprites) {
      if (box.x === trashSprite.x && box.y === trashSprite.y) {
        box.remove();
        break; // Remove only the first box encountered
      }
    }
  }
  const spikeSprites = getAll(spike)
  for (const box of spikeSprites) {
    if (box.x === playerSprite.x && box.y === playerSprite.y) {
      setMap(levels[level])
      break; // Remove only the first box encountered
    }
  }

  // Check if there are no boxes left
  const allBoxes = getAll(box).concat(getAll(altbox));
  if (allBoxes.length === 0) {
    // Proceed to the next level
    level++;
    if (level < levels.length) {
      setMap(levels[level]);
    }
  }

  // Collectibles logic
  const collectibleSprites = getAll(collectible);
  
  for (const collectible of collectibleSprites) {
    if (collectible.x === playerSprite.x && collectible.y === playerSprite.y) {
      collectible.remove();
      // Increase score or perform other actions
      break;
    }
  }
});