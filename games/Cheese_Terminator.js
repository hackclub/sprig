/*
@title: Cheese_Terminator
@author: Colin
@tags: ['puzzle']
@addedOn: 2024-06-22

This is a port of Microsoft Cheese Terminator, a game that was given to you if you mailed in surveys for microsoft in poland.
The game gained a cult following and microsoft contracted someone to make Cheese Terminator: Reloaded in 2015 for Windows Phone.
The game is now available to play on their blog for free: https://www.chroscielski.pl/cheese-terminator-reloaded/

I was looking through the Sprig gallery and realized no one had made a port yet, so I decided to make one.

W, A, S, D - movement
J - reset level
*/


const player = "p";
const cheese = "c";
const goal = "g";
const wall = "w";
const bg = "z"

const moveSFX = tune`
72.63922518159806: B4^72.63922518159806,
2251.81598062954`
const winSFX = tune`
120: F4~120,
120: G4~120,
120: B4~120,
3480`

let numMoves = 0

setLegend(
  [ player, bitmap`
................
................
................
......00........
....002200......
...022222200....
..022222232200..
.802222222222200
8.02222222222200
..022222232200..
...022222200....
....002200......
......00........
................
................
................`],
  [ cheese, bitmap`
....00000000....
...0666666660...
..066666606660..
.06606666666660.
0660606006666660
0666060..0666660
0666660..0600660
0666660..0066060
0666066006066060
0066666666600600
0F066666666660F0
0FF0666666660FF0
.0FF00000000FF0.
..0FFFFFFFFFF0..
...0FFFFFFFF0...
....00000000....`],
  [ goal, bitmap`
................
................
................
................
................
......3333......
.....333333.....
.....333333.....
.....333333.....
.....333333.....
......3333......
................
................
................
................
................`],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ bg, bitmap`
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
1111111111111111`]
);

let level = 0;
const levels = [
  map`
wwwwwwwwww
wwwwgwwwww
wwww.wwwww
wwwwc.cgww
wg..cpwwww
wwwwwcwwww
wwwwwgwwww
wwwwwwwwww`,
  map`
wp..wwwwww
w.ccwwwwww
w.c.wwwwww
www.wwwgww
www.wwwgww
www....gww
ww...w..ww
ww...wwwww`,
  map`
wwwwwwwwww
ww.....www
wwcwww...w
w.p.c..c.w
w.ggw.c.ww
wwggw...ww
wwwwwwwwww
wwwwwwwwww`,
  map`
wwwwwwwwww
wwwwwwwwww
wwwww..gww
ww...c.gww
ww.cc.cgww
wwwpwwggww
wwwwwwwwww
wwwwwwwwww`,
  map`
wwwwwwwwww
wwwp.wwwww
www.c..www
wwww.w.www
wwgw.w..ww
wwgc..w.ww
wwg...c.ww
wwwwwwwwww`,
  map`
wwwwwwwwww
wwww..w.pw
www...w..w
wwwc.c.c.w
www.cww..w
www.c.w.ww
wggggg..ww
wwwwwwwwww`,
  map`
wwwwwwwwww
wwww....ww
wwg.cww.ww
wggc.c..pw
wgg.c.c.ww
wwwwww..ww
wwwwwwwwww
wwwwwwwwww`,
  map`
wwwwwwwwww
wwww....ww
wwwwccc.ww
wwp.cgg.ww
ww.cgggwww
wwwww..www
wwwwwwwwww
wwwwwwwwww`,
  map`
wwwwwwwwww
wwwwggwwww
wwww.gwwww
www..cgwww
www.c..www
ww..wcc.ww
ww..p...ww
wwwwwwwwww`,
  map`
wwwwwwwwww
wwww..pwww
ww..cg.www
ww..gcg.ww
wwww.gc.ww
wwww...www
wwwwwwwwww
wwwwwwwwww`,
  map`
wwwww
w...w
wp.cw
wwwww`
];

const currentLevel = levels[level];
setBackground("z")
setMap(currentLevel);

  addText(numMoves.toString(), {
    x: 1,
    y: 14,
    color: color`3`
  })

setSolids([ player, cheese, wall ]);

setPushables({
  [player]: [cheese]
});

onInput("w", () => {
  getFirst(player).y -= 1;
  playTune(moveSFX);
  numMoves++;
});

onInput("a", () => {
  getFirst(player).x -= 1;
  playTune(moveSFX);
  numMoves++;
});

onInput("s", () => {
  getFirst(player).y += 1; 
  playTune(moveSFX);
  numMoves++;
});

onInput("d", () => {
  getFirst(player).x += 1;
  playTune(moveSFX);
  numMoves++;
});

onInput("j", () => {
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    // Fun hack to start the level with a cheese already on a goal
    if (level == 3) {
      addSprite(7, 3, "c")
    }
    if (level == 9) {
      addSprite(5, 4, "c")
    }
  }
});


afterInput(() => {
  const targetNumber = tilesWith(goal).length;
  
  const numberCovered = tilesWith(goal, cheese).length;

  addText(numMoves.toString(), {
    x: 1,
    y: 14,
    color: color`3`
  })

  if (numberCovered === targetNumber) {
    playTune(winSFX);
    level++;
    numMoves = 0;
    clearText();
    
    addText(numMoves.toString(), {
      x: 1,
      y: 14,
      color: color`3`
    })
    
    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
      // Fun hack to start the level with a cheese already on a goal
      if (level == 3) { 
        addSprite(7, 3, "c")
      }
      if (level == 9) {
        addSprite(5, 4, "c")
      }
      if (level == 10) {
        clearText();
      }
    } else {
      clearText();
      addText("you win!", { y: 5, color: color`6` });
    }
  }
});
