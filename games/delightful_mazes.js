/*
@title: delightful_mazes
@author: hephaestushex
*/

const player = "p";
const wall = "w";
const pathway = "a";
const trapdoor = "t";
var levelScored = false;

var score = 0;

setLegend(
  [ player, bitmap`
.00000000000000.
0000000000000000
0000000000000000
0006000000006000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0006000000000000
0006000000000000
0000666660000000
0000000000000000
0000000000000000
.00000000000000.`],
  [ wall, bitmap`
DDDDDD4DDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDD4DD
DD4DDDDD4DDDDDDD
DDDDDDDDDDDDDDDD
DDDDDD4DD4DDDDDD
DDDDDDDDDDDDDDDD
D4DDDDDDDD4DDD4D
DDDDDDDDDDDDDDDD
DDDDD4DDDDDDDDDD
DDDDDDDDDDDDDD4D
DDDDDDDDDDDDDDDD
DD4DDDD4DD4DDD4D
DDDD4DDDDDDDDDDD
DDDDDDDDDDDD4DDD
DDDDDDDDD4DDDDDD`],
  [ trapdoor, bitmap`
DDDDDD4DDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDD4DD
DD4DDDDD4DDDDDDD
DDDDDDDDDDDDDDDD
DDDDDD4DD4DDDDDD
DDDDDDDDDDDDDDDD
D4DDDDDDDD4DDD4D
DDDDDDDDDDDDDDDD
DDDDD4DDDDDDDDDD
DDDDDDDDDDDDDD4D
DDDDDDDDDDDDDDDD
DD4DDDD4DD4DDD4D
DDDD4DDDDDDDDDDD
DDDDDDDDDDDD4DDD
DDDDDDDDD4DDDDDD`],
  [ pathway, bitmap`
DDDDDD4DDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDD4DD
DD4DDDDD4DDDDDDD
DDDDDDDDDDDDDDDD
DDDDDD4DD4DDDDDD
DDDDDDDDDDDDDDDD
D4DDDDDDDD4DDD4D
DDDDDDDDDDDDDDDD
DDDDD4DDDDDDDDDD
DDDDDDDDDDDDDD4D
DDDDDDDDDDDDDDDD
DD4DDDD4DD4DDD4D
DDDD4DDDDDDDDDDD
DDDDDDDDDDDD4DDD
DDDDDDDDD4DDDDDD`],
);

setSolids([wall, player, trapdoor]);

const endPosX = [7,7,3,6,7,2,8]
const endPosY = [7,7,0,0,3,0,8]

let level = 0;
const levels = [
  map`
a.......
aa......
.aa.....
..aa....
...pa...
....aa..
.....aa.
......aa`,
  map`
pwataaaa
aawwwawa
aaawwaaa
awaaaawa
awwwawwa
aaaaaaaa
aawwwwww
waaaaaaa`,
  map`
wwwawwww
pawaaaww
wawwwaww
wawwaaww
wawwawww
wawwataw
waaaawww
wwwwwwww`,
  map`
wwwpwwaw
wawawwaw
waaaawaw
waatawaw
waaaawaw
wawwwaaw
waaaaaww
wwwwwwww`,
  map`
aaawwwww
awaaaaww
aaawwaww
waawwawa
wtawwaaa
aaawwwww
awaaaaaw
aaawwwpw`,
  map`
wwawwwww
wwaaaaww
wwwwwaww
paaawata
wwwawaww
wwwaaaww
wwwwwwww
wwwwwwww`,
  map`
........
........
........
........
....p...
........
........
........`,
];

setMap(levels[level]);

setPushables({
  [ player ]: [ trapdoor ],
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

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  if (getFirst(player).x == endPosX[level] && getFirst(player).y == endPosY[level]){
    level++;
    setMap(levels[level]);
    setBackground(wall);
    levelScored = false;
  }

  clearText()
  
  if (level === 0){
    addText("Go through", { 
      x: 2,
      y: 0,
      color: color`0`,
    })
    addText("mazes and", { 
      x: 2,
      y: 1,
      color: color`0`,
    })
    addText("open the", { 
      x: 2,
      y: 2,
      color: color`0`,
    })
    addText("trapdoor in each", { 
      x: 2,
      y: 3,
      color: color`0`,
    })

    addText("level to win", { 
      x: 2,
      y: 4,
      color: color`0`,
    })

    addText("Go Here", { 
      x: 11,
      y: 15,
      color: color`0`,
    })
  }

  if(tilesWith(trapdoor, pathway).length == 1 && !levelScored){
    score++;
    levelScored = true;
  }

  if (level === 6 && score === 5){
    addText("You Won!", { 
      x: 6,
      y: 0,
      color: color`0`,
    })
  }

  else if (level === 6 && score < 5){
    addText("You Lost", { 
      x: 6,
      y: 0,
      color: color`0`,
    })
  }

  addText(`${score} points`, { 
      x: 2,
      y: 15,
      color: color`6`,
  })
  
});
