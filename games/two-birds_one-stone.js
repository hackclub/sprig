
/* 
@title: two-birds_one-stone
@author: t3mp0r4ry
@tags: ['action']
@addedOn: 2023-06-06
*/

    const player = "p"

const grass = "g"

const sky = "s"

const rock = "r"

var gameRunning = false;

var titlescreen = true;

var score = 0;

setLegend(
  [ player, bitmap`
................
............2...
...........202..
...........2299.
...........22999
...........22...
...........22...
22.......2212...
2222221222122...
..22212221222...
..2221221L22....
...2L111LL2.....
......9..9......
....99.99.......
................
................` ],
  [ grass, bitmap`
444D444444444444
44D4D44444D444DD
44D444444D444444
44444444444D4D44
44D4DD4D4DDCDCD4
4DCDCCDCDCCCCCCD
DCCC1CCCDCCCCCCC
CCCCCCCCCCCC1CCC
CCCCCCCCCCCCCCCC
CC1CC1CCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCC1CCC1CC
CCCCCCCCCCCCCCCC
CCC1CCCCCCCCCCCC
CCCCC1CCCCCC1CCC
CCCCCCCCCCCCCCCC`],
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
  [ rock, bitmap`
...0000000000...
..011111111110..
.01111111L11110.
0111111LL1111110
011LLLLL11111L10
01LL1111111LL110
01L111111LL11110
0111LLL11L111110
011111LLL1111110
0LL11111L1111110
01LL1111111LLL10
011LL111111L1110
0111LL11LLL11110
.01111111111110.
..011111111110..
...0000000000...`]
)

setSolids([])

let level = 1
const levels = [
  map`
..........
..........
.p........
.........r
.p........
..........
..........
gggggggggg`,
  map`
..........
..........
..........
..........
..........
..........
..........
gggggggggg`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

setBackground(sky)

function hitCheck(somePlayer) {
  if (somePlayer.y >= 7) {
    somePlayer.remove();
  } else if (somePlayer.y == getFirst(rock).y && somePlayer.x == getFirst(rock).x) {
    somePlayer.remove();
  } else {
    //do nothing
  }
}

onInput("k", () => {
  if (gameRunning) {
    getAll(player).forEach(thisPlayer => thisPlayer.y -= 1);
  } else if (titlescreen) {
    titlescreen = false;
    setMap(levels[0]);
    gameRunning = true;
  }
})

afterInput(() => {
  
})

onInput("j", () => {
  if (gameRunning != true && titlescreen != true) {
    setMap(levels[1]);
    titlescreen = true;
  }
})

afterInput(() => {
  
})

function rockUpdate(someRock) {
  if (someRock != null) {
    if (gameRunning == true) {
      someRock.x -= 1;
      if (someRock.x == 0) {
        score += 1;
        someRock.x = Math.floor(Math.random() * 3) + 7;
        someRock.y = Math.floor(Math.random() * 7);
      }
    } else {
      someRock.remove();
    }
  }
}

var gameLoop = setInterval(() => {
  if (titlescreen) {
    clearText();
    score=0;
    addText("two birds", {
      x: 5,
      y: 6,
      color: color`2`
    });
    addText("ONE STONE", {
      x: 5,
      y: 7,
      color: color`0`
    });
    addText("Press K to begin!", {
      x: 2,
      y: 12,
      color: color`3`
    });
  } else if (getAll(player).length < 2) {
    gameRunning = false;
    if (getFirst(player) != null) {
      getFirst(player).remove();
    }
    clearText();
    addText("Game Over!\nScore: " + score, {
      x: 5,
      y: 6,
      color: color`3`
    });
    addText("Press J to\nrestart!", {
      x: 5,
      y: 10,
      color: color`0`
    });
  } else if (gameRunning) {
    getAll(player).forEach(aPlayer => hitCheck(aPlayer));
    clearText();
    getAll(player).forEach(thisPlayer => thisPlayer.y += 1);
    addText("Score: "+score, {
      x: 0,
      y: 0,
      color: color`0`
    });
  }
  rockUpdate(getFirst(rock));
}, 500);
