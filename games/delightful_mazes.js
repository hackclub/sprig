/*
@title: delightful_mazes
@author: hephaestushex
@tags: ['puzzle']
@addedOn: 2022-11-15
*/

const player = "p";
const wall = "w";
const pathway = "a";
const trapdoor = "t";
var levelScored = false;
var playList = []

const partA = tune`
250: c4/250 + g4^250 + e4^250 + c5-250,
250: g4/250 + e4~250 + c5-250,
250: e4/250 + g4~250 + e5-250,
250: g4/250 + e4~250 + d5-250,
250: c4/250 + g4^250 + e4^250 + c5-250,
250: g4/250 + e4~250 + c5-250,
250: e4/250 + g4~250 + f5-250,
250: g4/250 + e4~250 + e5-250,
250: c4/250 + a4^250 + f4^250 + e5-250,
250: a4/250 + f4~250 + f5-250,
250: f4/250 + a4~250 + g5-250,
250: a4/250 + f4~250 + f5-250,
250: c4/250 + a4^250 + f4^250 + f5-250,
250: a4/250 + f4~250 + f5-250,
250: f4/250 + a4~250 + a5-250,
250: a4/250 + f4~250 + f5-250,
250: c4/250 + g4^250 + e4^250 + e5-250,
250: g4/250 + e4~250 + e5-250,
250: e4/250 + g4~250 + c5-250,
250: g4/250 + e4~250 + c5-250,
250: c4/250 + g4^250 + e4^250 + d5-250,
250: g4/250 + e4~250 + d5-250,
250: e4/250 + g4~250 + c5-250,
250: g4/250 + e4~250 + c5-250,
250: d4/250 + g4^250 + f4^250 + e5-250,
250: g4/250 + f4~250 + d5-250,
250: f4/250 + g4~250 + c5-250,
250: g4/250 + f4~250 + b4-250,
250: c4/250 + g4^250 + e4^250 + b4-250,
250: g4/250 + e4~250 + g5-250,
250: e4/250 + g4~250 + e5-250,
250: g4/250 + e4~250 + c5-250`;
const partB = tune`
375: c4/375 + g4^375 + e4^375 + c5-375,
375: g4/375 + e4~375,
375: e4/375 + g4~375 + g5-375,
375: g4/375 + e4~375 + g5-375,
375: c4/375 + g4^375 + e4^375 + c5-375,
375: g4/375 + e4~375,
375: e4/375 + g4~375 + e5-375,
375: g4/375 + e4~375 + e5-375,
375: c4/375 + a4^375 + f4^375 + c5-375,
375: a4/375 + f4~375,
375: f4/375 + a4~375 + f5-375,
375: a4/375 + f4~375 + f5-375,
375: c4/375 + a4^375 + f4^375 + c5-375,
375: a4/375 + f4~375,
375: f4/375 + a4~375 + g5-375,
375: a4/375 + f4~375 + g5-375,
375: c4/375 + g4^375 + e4^375 + c5-375,
375: g4/375 + e4~375 + e5-375,
375: e4/375 + g4~375 + f5-375,
375: g4/375 + e4~375 + e5-375,
375: c4/375 + g4^375 + e4^375 + c5-375,
375: g4/375 + e4~375 + e5-375,
375: e4/375 + g4~375 + f5-375,
375: g4/375 + e4~375 + g5-375,
375: d4/375 + g4^375 + f4^375 + d5-375,
375: g4/375 + f4~375 + g5-375,
375: f4/375 + g4~375 + f5-375,
375: g4/375 + f4~375 + e5-375,
375: c4/375 + g4^375 + e4^375 + c5-375,
375: g4/375 + e4~375,
375: e4/375 + g4~375 + e5-375 + g5-375,
375: g4/375 + e4~375 + g5-375`;
const partC = tune`
166.66666666666666: c4/166.66666666666666 + g4^166.66666666666666 + e4^166.66666666666666 + c5-166.66666666666666,
166.66666666666666: g4/166.66666666666666 + e4~166.66666666666666 + d5-166.66666666666666,
166.66666666666666: e4/166.66666666666666 + g4~166.66666666666666 + e5-166.66666666666666,
166.66666666666666: g4/166.66666666666666 + e4~166.66666666666666 + f5-166.66666666666666,
166.66666666666666: c4/166.66666666666666 + g4^166.66666666666666 + e4^166.66666666666666 + g5-166.66666666666666,
166.66666666666666: g4/166.66666666666666 + e4~166.66666666666666 + a5-166.66666666666666,
166.66666666666666: e4/166.66666666666666 + g4~166.66666666666666 + b5-166.66666666666666,
166.66666666666666: g4/166.66666666666666 + e4~166.66666666666666 + a5-166.66666666666666,
166.66666666666666: c4/166.66666666666666 + a4^166.66666666666666 + f4^166.66666666666666 + g5-166.66666666666666,
166.66666666666666: a4/166.66666666666666 + f4~166.66666666666666 + f5-166.66666666666666,
166.66666666666666: f4/166.66666666666666 + a4~166.66666666666666 + e5-166.66666666666666,
166.66666666666666: a4/166.66666666666666 + f4~166.66666666666666 + d5-166.66666666666666,
166.66666666666666: c4/166.66666666666666 + a4^166.66666666666666 + f4^166.66666666666666 + c5-166.66666666666666,
166.66666666666666: a4/166.66666666666666 + f4~166.66666666666666 + f5-166.66666666666666,
166.66666666666666: f4/166.66666666666666 + a4~166.66666666666666 + f5-166.66666666666666,
166.66666666666666: a4/166.66666666666666 + f4~166.66666666666666 + f5-166.66666666666666,
166.66666666666666: c4/166.66666666666666 + g4^166.66666666666666 + e4^166.66666666666666 + e5-166.66666666666666,
166.66666666666666: g4/166.66666666666666 + e4~166.66666666666666 + e5-166.66666666666666,
166.66666666666666: e4/166.66666666666666 + g4~166.66666666666666 + d5-166.66666666666666,
166.66666666666666: g4/166.66666666666666 + e4~166.66666666666666 + d5-166.66666666666666,
166.66666666666666: c4/166.66666666666666 + g4^166.66666666666666 + e4^166.66666666666666 + c5-166.66666666666666,
166.66666666666666: g4/166.66666666666666 + e4~166.66666666666666 + c5-166.66666666666666,
166.66666666666666: e4/166.66666666666666 + g4~166.66666666666666 + b4-166.66666666666666,
166.66666666666666: g4/166.66666666666666 + e4~166.66666666666666 + c5-166.66666666666666,
166.66666666666666: d4/166.66666666666666 + g4^166.66666666666666 + f4^166.66666666666666 + a4-166.66666666666666,
166.66666666666666: g4/166.66666666666666 + f4~166.66666666666666 + c5-166.66666666666666,
166.66666666666666: f4/166.66666666666666 + g4~166.66666666666666 + a4-166.66666666666666,
166.66666666666666: g4/166.66666666666666 + f4~166.66666666666666 + b4-166.66666666666666,
166.66666666666666: c4/166.66666666666666 + g4^166.66666666666666 + e4^166.66666666666666 + c5-166.66666666666666,
166.66666666666666: g4/166.66666666666666 + e4~166.66666666666666 + c5-166.66666666666666,
166.66666666666666: e4/166.66666666666666 + g4~166.66666666666666 + e5-166.66666666666666,
166.66666666666666: g4/166.66666666666666 + e4~166.66666666666666 + c5-166.66666666666666`;

const openDoor = tune`
150: e5^150 + c5-150 + g5-150,
150: f5^150 + a5-150 + d5-150,
4500`;

const nextLevel = tune`
150: e5^150 + c5-150,
150: d5-150 + f5^150,
150: g5^150 + e5-150,
150: a5^150 + f5-150,
150: a5^150 + f5-150,
150: a5^150 + f5-150,
3900`;

function genMusic(len){
  playList = []
  let songNumber = 0;
  for (let index = 0; index < len; index++){
    songNumber = Math.floor(Math.random() * 3);
    switch(songNumber) {
      case 0:
        playList[index] = partA;
        break;
      case 1:
        playList[index] = partB;
        break;
      case 2:
        playList[index] = partC;
        break;
      default:
        playList[index] = partA;
    }
  }
}

genMusic(7);

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

var playback = playTune(playList[level], Infinity);

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

onInput("i", () => {
  genMusic(7);
  if(playback) playback.end();
  playback = playTune(playList[level], Infinity);
});

afterInput(() => {
  if (getFirst(player).x == endPosX[level] && getFirst(player).y == endPosY[level]){
    level++;
    setMap(levels[level]);
    setBackground(wall);
    levelScored = false;
    if(playback) playback.end();
    playTune(nextLevel);
    playback = playTune(playList[level], Infinity);
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
    if(playback) playback.end();
    playTune(openDoor);
    playback = playTune(playList[level], Infinity);
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

  addText(`Level ${level}`, { 
      x: 2,
      y: 14,
      color: color`6`,
  })
  
});
