/*
@title: The Maze Runner
@description: "The Maze Runner" is a grid-based maze adventure where players explore complex layouts, collect coins, and search for the exit while avoiding roaming enemies. Each level introduces tighter paths and smarter enemy placement, encouraging careful movement and planning.
@author: AymenD
@tags: ['maze', 'puzzle', 'strategy']
@addedOn: 2025-12-14
*/

const player = "s";
const wall = "w";
const coin = "c";
const enemy = "e";
const exit = "x";
const melody = tune`
476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4^476.1904761904762,
476.1904761904762: D5/476.1904761904762,
476.1904761904762: G4~476.1904761904762 + C5/476.1904761904762,
476.1904761904762: A4~476.1904761904762 + G4^476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4-476.1904761904762,
476.1904761904762: D5/476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4~476.1904761904762,
476.1904761904762: A4~476.1904761904762 + G4^476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4-476.1904761904762,
476.1904761904762: D5/476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4~476.1904761904762,
476.1904761904762: A4~476.1904761904762 + G4^476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4-476.1904761904762,
476.1904761904762: D5/476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4~476.1904761904762,
476.1904761904762: A4~476.1904761904762 + G4^476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4-476.1904761904762,
476.1904761904762: D5/476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4~476.1904761904762,
476.1904761904762: A4~476.1904761904762 + G4^476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4-476.1904761904762,
476.1904761904762: D5/476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4~476.1904761904762,
476.1904761904762: A4~476.1904761904762 + G4^476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4-476.1904761904762,
476.1904761904762: D5/476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4~476.1904761904762,
476.1904761904762: A4~476.1904761904762 + G4^476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4-476.1904761904762,
476.1904761904762: D5/476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4~476.1904761904762`; 

setLegend(
  [ player, bitmap`
................
................
.....000000.....
....02222220....
...0......220...
...0...0..0.0...
...0...0..0.0...
...01......10...
....01111110....
.....000000.....
.....0....0.....
.....0....0.....
.....0....0.....
.....0..010.....
.....0..010.....
.....000000.....`],
  [ wall, bitmap`
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
0000000000000000`],
  [ coin, bitmap`
................
................
................
................
.....00000......
....0660660.....
...066000660....
...066066660....
...066000660....
...066660660....
...066000660....
....0660660.....
.....00000......
................
................
................`],
  [ enemy, bitmap`
.......1........
.......L........
...1..LLL..1....
...1.LLLLL.1....
...LLL000LLL....
.....L303L...LL.
.....L000L..L.H.
.....LLLLL.L..H.
......L0L.....H.
......1L1LLLLLH.
......L0L.....H.
......1L1.....H.
......L0L.....H.
......L.L.....L.
................
................`],
  [ exit, bitmap`
................
................
................
.....444444.....
....47777774....
...477DDDD774...
...47D5555D74...
...47D5HH5D74...
...47D5HH5D74...
...47D5555D74...
...477DDDD774...
....47777774....
.....444444.....
................
................
................`]
);

playTune(melody, 3);

const levels = [
  map`
wwwwwwwwwwwwwwww
ws....c........w
w.wwww..www.ww.w
w....w...cw..w.w
www.ww..wwww.w.w
w..e.w.e..ww.w.w
w..w.w....ww.w.w
wc.w...cc.ww...w
wcwwwww.wwwwww.w
w...........e..w
ww.wwww.wwwww.cw
w..cc........c.w
wewwwwww.www.www
w.......e.....xw
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
ws.....c..e.wccw
w.www.......wccw
w...w.w.....we.w
www.w....w..w..w
w...w..c.w.....w
w.www.wwwwwww..w
wc.......cw....w
w..ww.e.c.wwww.w
w.........w.e..w
w..c...w.cw....w
w...w..wwwww...w
we..w......w...w
w...w.c..c....xw
wwwwwwwwwwwwwwww`,
 map`
wwwwwwwwwwwwwwww
ws..........ec.w
w.www.w...wwww.w
w.c...w...w....w
www.wwwww.w.ww.w
w....ec........w
w.www.ww.wwwww.w
w...w....c.....w
w.w.w.wwwwwwww.w
w.w...w......e.w
w.ww.ww.wwwwww.w
w.....ce....c..w
w.wwwwwww.wwww.w
we............xw
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
ws..cw...ccwcwcw
wwww.....cc..w.w
w.w..w.wwwwwww.w
w.w..w.......w.w
w.w..www.www.w.w
w.w...e..w...w.w
w.w...ww.w.....w
wcwww.ww.wwwweww
w........w.....w
w.wwewww...w...w
w....c.w...w...w
w...ww.www.www.w
wc.........c..xw
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w........w.....w
ws..........e..w
wwwwww...w.....w
w..e....wwwwww.w
wcc.......cccw.w
w...w.....wwww.w
w.wwwww...w....w
w.........w...xw
w....e.w..w....w
w......w....e..w
w.wwwwwww.w....w
w....w....w....w
w.e............w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
ws..w..we.....xw
w...w..w...w...w
w...w.cwww.wwwww
w.....cw..c.e.cw
www.wccw.....cew
w...w..w...wwwww
w...weew...w...w
w..ww......w...w
w.........www.ew
w..e.......w...w
wwwww.cc.c.....w
wc....e.cc.....w
wc.e...........w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
ws..ecccccccw.xw
w.wwwwwwwwwww..w
w...........e..w
w.www.w..wwww..w
w.w...w..w..w.ww
w.www.w..wwcw..w
w.w.c.w...wcw..w
w.w.wwwww.wcww.w
w.w.w...w.wew..w
w.w...w.w...w..w
w.wwwww.w.....ww
wc.w.w..wwww...w
w..w..c........w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
ws..c.c.w.c.cwxw
wcwwwww.w....w.w
w.w.....w.ewww.w
w.wcwwwww.w....w
wcw.wc...ew.c..w
w.w.w...c.wwwe.w
w.w.wwwww.wc...w
wcwe....w.c.we.w
w.w.w.w.w...w..w
w.w.w.w.wwwww..w
w.wcwcwc.ccw..ew
w.www.wwww.e...w
w.c...c..w.....w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
ws......w........c.w
w.......w..e..c.c.cw
w..c.c..w..ww......w
w..wwww.wc.ww.we...w
w..wwwwe......w..e.w
w.e......c.e..wc...w
www.www.ww.wwww..cew
wwwewww..e.wwww.c..w
ww....wwwwwwwww.wwww
ww.wwc.c........wwww
wwe...wwwwwwwc.cwwww
ww.wwwwwwwwww.w.wwww
ww.ww.c.c....cw.wwww
ww.wwcwwwwewwww.wwww
ww.........wwwwcwwww
wwcww.wwwwcwwww.wcww
wwc..ewwww.wwww.w.ww
wwwwwwwwww...c..c.xw
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwww
wswcccccccccccccccw
wcwcwwwwwwwwwwwwwcw
wcwcwcccccccccccwcw
wcwcwcwwwwwwwwwcwcw
wcwcwcwcccccccwcwcw
wcwcwcwcwwwwwcwcwcw
wcwcwcwcwcccwcwcwcw
wcwcwcwcwcwcwcwcwcw
wcwcwcwcwxwcwcwcwcw
wcwcwcwcwwwcwcwcwcw
wcwcwcwcccccwcwcwcw
wcwcwcwwwwwwwcwcwcw
wcwcwcccccccccwcwcw
wcwcwwwwwwwwwwwcwcw
wcwcccccccccccccwcw
wcwwwwwwwwwwwwwwwcw
wcccccccccccccccccw
wwwwwwwwwwwwwwwwwww`
];
let currentLevel = 0;
setMap(map`
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww`);
addText("The Maze Runner", { x: 2, y: 4, color: color`3` });
addText("Press 'i' to start", { x: 1, y: 8, color: color`1` });
onInput("i", () => {
  clearText();
  setMap(levels[currentLevel]);
});
onInput("j", () => {
  clearText();
  restartGame();
});

let score = 0;
let isMoving = false;
let moveDirection = {x: 0, y: 0};

onInput("w", () => {
  moveDirection = {x: 0, y: -1};
  isMoving = true;
});

onInput("a", () => {
  moveDirection = {x: -1, y: 0};
  isMoving = true;
});

onInput("s", () => {
  moveDirection = {x: 0, y: 1};
  isMoving = true;
});

onInput("d", () => {
  moveDirection = {x: 1, y: 0};
  isMoving = true;
});

function restartGame() {
  currentLevel = 0;
  score = 0;
  setMap(levels[currentLevel]);
}


function movePlayer() {
  if (isMoving) {
    const playerSprite = getFirst(player);
    if (playerSprite) {
      const newX = playerSprite.x + moveDirection.x;
      const newY = playerSprite.y + moveDirection.y;

      if (!getTile(newX, newY).some(t => t.type === wall)) {
        playerSprite.x = newX;
        playerSprite.y = newY;

        const coins = getTile(newX, newY).filter(t => t.type === coin);
        if (coins.length > 0) {
          coins.forEach(coinSprite => {
            coinSprite.remove();
          });
          score += 1;
        }

        if (tilesWith(player, exit).length > 0) {
          currentLevel++;
          if (currentLevel < levels.length) {
            setMap(levels[currentLevel]);
          } else {
            setMap(map`
ccccccccccccccccc
cwxxxwxwwwwxwxxwc
cxwwwxxwxxwxwxxwc
cxxwxxxwxxwxwxxwc
cxxwxxxwxxwxwxxwc
cxxwxxxwwwwxwwwwc
cxxxxxxxxxxxxxxxc
ccccccccccccccccc
cxxxxxxxxwxxxcxxc
cwxxxxxwxxxwxxxwc
cwxxxxxwxwxwwxxwc
cwxxxxxwxwxwxwxwc
cxwxwxwxxwxwxxwwc
cxxwxwxxxwxwxxxwc
cxxxxxxxxxxxxxxxc
ccccccccccccccccc`);

            isMoving = false;

          }
        }

        if (tilesWith(player, enemy).length > 0) {
          addText("Game Over",{ x: 5, y: 1, color: `3` });
          addText("Score: " + score,{ x: 5, y: 3, color: `1` });
          addText("Press'j'To Restart",{ x: 1, y: 13, color: `1` });
          isMoving = false;
          setMap(map`
....................
....................
....................
....................
....................
....w...wwww.w......
....w...w..w.w......
....w...w..w.w......
....w...w..w.w......
....w...w..w.w......
....www.wwww.www....
....................
....................
....................
....................
....................`);
        }
      }

      isMoving = false
    }
  }
}

setInterval(movePlayer, 100);

setInterval(() => {
  const allEnemies = getAll(enemy);

  allEnemies.forEach((e) => {
    let dx = 0;
    let dy = 0;

    const direction = Math.floor(Math.random() * 4);

    if (direction === 0) dy = -1; 
    if (direction === 1) dy = 1;  
    if (direction === 2) dx = -1; 
    if (direction === 3) dx = 1;

    const newX = e.x + dx;
    const newY = e.y + dy;

    if (
      newX >= 0 &&
      newX < width() &&
      newY >= 0 &&
      newY < height() &&
      !getTile(newX, newY).some(t => t.type === wall)
    ) {
      e.x = newX;
      e.y = newY;
    }
  });
}, 1000);
