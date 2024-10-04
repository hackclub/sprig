/*
@title: whack_a_mole
@author: Sameer Murthy
@tags: ['endless']
@addedOn: 2023-03-01

How to Play:
- Whack the mole to start by pressing any key.
- When playing, match the map to the keys to whack the mole in the corresponding hole.
- For example, the W key is used for whacking the top-left hole.
- AVOID the bombs, whacking them will result in a loss.
- The game gets harder as you play, and increase the chances of bombs showing up.
- Enjoy! Play as much as you can!
*/

let highScore = 0;
const music = {
  whack: tune`
120.48192771084338: F4/120.48192771084338,
120.48192771084338: C5/120.48192771084338,
3614.4578313253014`,
  lose: tune`
147.7832512315271: F5-147.7832512315271,
147.7832512315271: E5-147.7832512315271,
147.7832512315271: D5-147.7832512315271,
147.7832512315271: B4-147.7832512315271,
147.7832512315271: F4-147.7832512315271,
3990.1477832512314`
}
// keyboard to letter mapping
const letterMap = ["w", "i", "a", "d", "j", "l", "s", "k"];
const tileMap = [
  [2, 2], //w
  [6, 2], //i
  [1, 3], //a
  [3, 3], //d
  [5, 3], //j
  [7, 3], //l
  [2, 4], //s
  [6, 4], //k
]
// Set the Interface Maps
const maps = [
  map`
sssssssss
.........
..h...h..
.h.h.h.h.
..h...h..
.........
.........`,
  map`
sssss
sssss
ssmss
sssss`,
];

// Initialize sprites
const mole = "m";
const hole = "h";
const ground = "g";
const bround = "e";
const sky = "s";
const bomb = "b";
const deadmole = "d";

setLegend(
  [ sky, bitmap`
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
7777777777777777`],
  [ ground, bitmap`
4DDDDDD44DDDDDDD
44DD4D4DD4DDDDD4
4DD44DD44DD4444D
DDDD4D44DD4D4DDD
DDD4444DDDDDDDDD
44DD4D4D444D444D
D44D4DDDDD4DDDD4
44D4D4D44D4DDDDD
DDDDD44444D44D4D
D4D444DDDDD4DD44
D44DD4DD4D4DDD4D
D4444D4DDDDD4444
D4DD444DDDD44D4D
4DDDD4DDDDD4DD4D
DD44DDDDD4DD444D
DDD44D44D44DDD44`],
  [ bround, bitmap`
4DDDD444444DDDDD
44DD4F4DDFDDDDDF
4FDFFDD4FDDFF44F
44FDFDF4DDFDF444
F4DF4F4FDDDDDDDD
F4DD4DFF44FDFFFD
DFFF4DDDDDFDDDD4
44FFDFDFFDFDD4FD
4FDDDF444FD4FFFD
DFDF444DFDD4FF44
D4FDDFFDF4F444FD
DFFF4DFF44FFFFF4
DFDD4DF4FDDF4D44
44FDDFDDFDDFDDFF
4FF4DDDDDFDDF44D
DDD44D4FFFF444FF`],
  [ mole, bitmap`
................
.......33.......
......0000......
.....0CCCC0.....
....0CFFFFC0....
...0CF2FF2FC0...
...0CF0FF0FC0...
...0CFFFFFFC0...
..0CC100001CC0..
..011110011110..
..0L112L1211L0..
.0CCC112211CCC0.
000CCCCLLCCCC000
0000CCCCCCCC0000
.00000000000000.
..000000000000..`],
  [ deadmole, bitmap`
..63...3...36.66
...63..6...6..3.
6..66.0000....3.
36...0CCCC0..66.
.3..0CFFFFC0....
...0C303303C0..3
...0C030030C0.63
36.0C303303C0...
..0CC100001CC0..
..01111001111063
..0L112L1211L0..
.0CCC112211CCC0.
000CCCCLLCCCC000
0000CCCCCCCC0000
.00000000000000.
..000000000000..`],
  [ bomb, bitmap`
................
.............6..
............CC..
....0000000CC...
...00CHHHC00....
..00CCCCCCC00...
..0CCCCCCCCC0...
..0C33C3H3CC0...
..0CH3H33H3C0...
..0CCCCCCCCC0...
..00CCCCCCC00...
0CC00CHHHC00CC0.
00CC0000000CC000
000CCCCCCCCC0000
.00000000000000.
..000000000000..`],
  [ hole, bitmap`
................
................
................
................
................
................
................
................
................
................
..000000000000..
.00000000000000.
0000000000000000
0000000000000000
.00000000000000.
..000000000000..`],
);

let score = 0;
let gameStarted = false;

const addScore = () => {
  clearText();
  score++;
  addText(`Score: ${score.toString()}`,  {x:1, y:1, color: color`2`});
}

const home = (lost) => {
  gameStarted = false;
  clearText();
  setBackground(sky);
  setMap(maps[1]);
  if (lost === true) {
    addText("You Lost!",  {x:6, y:2, color: color`3`});
  } else {
    addText("Whack-A-Mole!",  {x:4, y:2, color: color`2`});
  }
  addText(`Score:${(score === -1) ? score + 1 : score}`,  {x:6, y:4, color: color`6`});
  addText(`Best:${highScore}`,  {x:6, y:6, color: color`6`});
  addText("Whack to start!",  {x:3, y:13, color: color`5`});
  score = -1;
}

const whack = number => {
  if (getTile(tileMap[number][0], tileMap[number][1])[0].type == mole) {
    addScore();
    playTune(music.whack);
    getTile(tileMap[number][0], tileMap[number][1])[0].type = deadmole;
    return true;
  } else  if (getTile(tileMap[number][0], tileMap[number][1])[0].type == bomb) {
    playTune(music.lose);
    home(true);
    return false;
  } else {
    return false;
  }
}

setSolids([]);
home();

const randomTime = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

const randomNumber = max => {
  return Math.floor(Math.random() * max)
}

let chance = [mole, mole, mole, mole, mole, mole, mole, bomb];
let iter = 0

const peek = () =>  {
  iter++;
  if (iter > 25) {
    chance.push(bomb);
    iter = 0;
  }
  let number = randomNumber(8);
  let time = randomTime(500, 1000);
  getTile(tileMap[number][0], tileMap[number][1])[0].type = chance[randomNumber(chance.length)];
  setTimeout(() => {
    if (gameStarted) {
      getTile(tileMap[number][0], tileMap[number][1])[0].type = hole;
      peek();
    }
  }, time);
}
    

const startGame = () => {
  playTune(music.whack);
  setBackground(ground);
  setMap(maps[0]);
  addScore();
  gameStarted = true;
  peek();
}


onInput("w", () => {
  if (gameStarted) {
    whack(letterMap.indexOf("w"));
  } else {
    startGame();
  }
});

onInput("i", () => {
  if (gameStarted) {
    whack(letterMap.indexOf("i"));
  } else {
    startGame();
  }
});

// TODO: Make it so that letters A - L SHOULD NOT START GAME
onInput("a", () => {
  if (gameStarted) {
    whack(letterMap.indexOf("a"));
  } else {
    startGame();
  }
});

onInput("d", () => {
  if (gameStarted) {
    whack(letterMap.indexOf("d"));
  } else {
    startGame();
  }
});

onInput("j", () => {
  if (gameStarted) {
    whack(letterMap.indexOf("j"));
  } else {
    startGame();
  }
});

onInput("l", () => {
  if (gameStarted) {
    whack(letterMap.indexOf("l"));
  } else {
    startGame();
  }
});

onInput("s", () => {
  if (gameStarted) {
    whack(letterMap.indexOf("s"));
  } else {
    startGame();
  }
});

onInput("k", () => {
  if (gameStarted) {
    whack(letterMap.indexOf("k"));
  } else {
    startGame();
  }
});

afterInput(() => {
  if (score > highScore) {
    highScore = score;
  }
});
