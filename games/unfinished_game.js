/*
@title: Unfinished Game
@author: Vi Du Tran
@tags: []
@addedOn: 2024-08-06

This game is totally unfinished. There is nothing to see here.
WASD to move. L to advance text. J to reset level.
*/

const player = "p";
const textwall = "t";
const box = "b";
const goal = "g";
const talk = tune`
159.5744680851064: C4~159.5744680851064,
159.5744680851064: C5/159.5744680851064,
159.5744680851064: G4-159.5744680851064,
4627.659574468085`;
let initial = 0;
let line = -1;

setLegend(
  [player, bitmap`
................
................
....00000000....
....07777770....
....07077070....
....07777770....
....07077070....
....07000070....
....07777770....
....00000000....
......0770......
.....007700.....
....0.0770.0....
......0000......
......0..0......
................`],
  [textwall, bitmap`
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
  [box, bitmap`
1111111111111111
1111111111111111
111LLLLLLLLLL111
11L1LLLLLLLL1L11
11LL1LLLLLL1LL11
11LLL1LLLL1LLL11
11LLLL1LL1LLLL11
11LLLLL11LLLLL11
11LLLLL11LLLLL11
11LLLL1LL1LLLL11
11LLL1LLLL1LLL11
11LL1LLLLLL1LL11
11L1LLLLLLLL1L11
111LLLLLLLLLL111
1111111111111111
1111111111111111`],
  [goal, bitmap`
................
....DDDDDDDD....
...DDDDDDDDDD...
..DDD444444DDD..
.DDD44444444DDD.
.DD4444444444DD.
.DD4444444444DD.
.DD4444444444DD.
.DD4444444444DD.
.DD4444444444DD.
.DD4444444444DD.
.DDD44444444DDD.
..DDD444444DDD..
...DDDDDDDDDD...
....DDDDDDDD....
................`],
)

setSolids([player, textwall, box])

let level = 0
const levels = [
  map`
p......
.......
.......
.......
ttttttt
ttttttt`,
  map`
p......
.......
..b....
.......
ttttttt
ttttttt`,
  map`
p......
.......
..b....
......g
ttttttt
ttttttt`,
  map`
p......
.......
..b....
......g
ttttttt
ttttttt`,
  map`
p...t..
......g
..b...t
.......
ttttttt
ttttttt`,
  map`
p...t..
......g
..b...t
.......
ttttttt
ttttttt`,
  map`
p..tg..
...tt..
..b...t
.....b.
ttttttt
ttttttt`,
  map`
p...tgg
....b..
...tb..
.....t.
ttttttt
ttttttt`,
  map`
p...tgg
....b..
...tb..
.....t.
ttttttt
ttttttt`,
  map`
p...tgg
....b..
...tb..
.....t.
ttttttt
ttttttt`,
  map`
p...t.g
....t..
...bb..
....t.g
ttttttt
ttttttt`,
  map`
p...t.g
....t..
...bb..
....t.g
ttttttt
ttttttt`
]

const lines = [
  "Hi.",
  "Sorry for the \ninconvenience, but \nthis game is \nunfinished.",
  "There is nothing \nfor you to do \nhere.",
  "...",
  "Well, since you \nmade it all the \nway here...",
  "Let me \ngive you something \nto do.",
  "There! A box.",
  "Have fun! Play \naround with it a \nlittle, even.",
  "What's that?",
  "You're bored?",
  "Hm... Here. Let me \nset a little \nsomething up...",
  "There! Now push \nthe box over to \nthat green goal!",
  "Yay! You did it!",
  "Hmm. Wasn't really \na point to that, \nwas there?",
  "Maybe, we can make \nsome more levels.",
  "There we go! Now \nhere's a level \nthat's \ninteresting.",
  "Have fun with \nthis level.",
  "Nice, you beat it!",
  "I suppose that \nmeans I have to \nmake another one.",
  "Wow, you're really \ngood at this.",
  "Alright, here's \nanother one. I've \ngotta say, this \nis sort of fun.",
  "Good job! You \nfinished another \nlevel!",
  "There is one \nsmall problem...",
  "I've sort of \nrun out of ideas.",
  "Why don't you help \nme out?",
  "Give me an idea \nfor a level!",
  "Wow! Great idea.",
  "Well. I'm out of \nideas. And you're \nout of ideas.",
  "I guess this \nis it! The end \nof the game.",
  "This was really \nfun!",
  "Sorry you didn't \nget to play a... \nfinished game.",
  "Well, I guess it \nis finished now.",
  "We finished \nit together.",
  "Thanks."
]

setMap(levels[level])

setPushables({
  [player]: [box],
  [box]: [box]
})

onInput("w", () => {
  getFirst(player).y -= 1;
})

onInput("a", () => {
  getFirst(player).x -= 1;
})

onInput("s", () => {
  getFirst(player).y += 1;
})

onInput("d", () => {
  getFirst(player).x += 1;
})

// reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

// advance text
onInput("l", () => {
  if (line == 33) {
    return
  } else if (line == 5 && initial != 2) {
    if (initial == 0) {
      return
    }
    initial = 0;
    playTune(tune`
500: C4/500 + C5/500 + F4/500 + F5/500,
15500`);
    spawn(2, 2, box);
    level = 1;
    initial = 2;
  } else if (line == 7) {
    if (initial == 0) {
      return
    }
    initial = 0;
    clearText();
    setTimeout(among, 3000);
    setTimeout(among, 6000);
    setTimeout(among, 9000);
    setTimeout(initial_goal_spawn, 11000);
    setTimeout(among, 11000);
  } else if (line == 14) {
    if (initial == 0) {
      return
    }
    initial = 0;
    clearText();
    playTune(tune`
500: C4/500 + C5/500 + F4/500 + F5/500,
15500`);
    level = 4;
    setMap(levels[4]);
    setTimeout(among, 1000);
    setTimeout(among, 2000);
  } else if (line == 18) {
    if (initial == 0) {
      return
    }
    initial = 0;
    clearText();
    playTune(tune`
500: C4/500 + C5/500 + F4/500 + F5/500,
15500`);
    level = 6;
    setMap(levels[6]);
  } else if (line == 20) {
    if (initial == 0) {
      return
    }
    initial = 0;
    clearText();
    playTune(tune`
500: C4/500 + C5/500 + F4/500 + F5/500,
15500`);
    level = 8;
    setMap(levels[8]);
  } else if (line == 26) {
    if (initial == 0) {
      return
    }
    initial = 0;
    clearText();
    playTune(tune`
500: C4/500 + C5/500 + F4/500 + F5/500,
15500`);
    level = 10;
    setMap(levels[10]);
  } else if (initial == 1 || initial == 2) {
    clearText();
    line += 1;
    playTune(talk);
    addText(lines[line], { x: 1, y: 11, color: color`2` });
  }
});

function among() {
  line += 1
  clearText();
  playTune(talk);
  addText(lines[line], { x: 1, y: 11, color: color`2` });
}

function spawn(x, y, sprite) {
  let tile = getTile(x, y)
  if (tile.length == 0) {
    addSprite(x, y, sprite);
  } else {
    addSprite(x + 1, y, sprite);
  }
}

function initial_goal_spawn() {
  level = 2;
  addSprite(6, 3, goal);
  playTune(tune`
500: C4/500 + C5/500 + F4/500 + F5/500,
15500`);
}

afterInput(() => {
  // win condition taken from tutorial
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;

  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    if (level == 2) {
      among();
      initial = 1;
      level = 3;
    } else if (level == 4) {
      among();
      initial = 1;
      level = 5;
    } else if (level == 6) {
      among();
      initial = 1;
      level = 7;
    } else if (level == 8) {
      among();
      initial = 1;
      level = 9;
    } else if (level == 10) {
      among();
      initial = 1;
      level = 11;
    }
  }
});


setTimeout(among, 100);
setTimeout(() => {
  initial = 1;
}, 100);
