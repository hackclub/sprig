/*
@title: explorer
@author: akshur
@tags: []
@addedOn: 2023-01-22

Instructions:

"w" is up, "s" is down, "a" is left, "d" is right".

Move to the sword, and press "i" to grab your sword.

Without the sword, you're immune to monsters and can push stumps,
but that on its own won't get you far.

With the sword, you're able to kill monsters and walk through walls,
but you're able to be killed.

Swap between having a sword and not having a sword by hitting "i". That button is also how 
you attack in a one block radius, so every time you attack, you are disarmed and need to hit "i"
again to rearm. 

INTENDED ORDER
The intended order is to do: yellow => green => purple => orange => red,
but I've given it a more non-linear layout for player freedom purposes.

Beat all enemies in the red room to win the game.

Hit "run" to execute the code and
start the game (you can also press shift+enter).
*/

const music = tune`
337.07865168539325: a4~337.07865168539325 + c5~337.07865168539325 + e4~337.07865168539325 + e5~337.07865168539325,
337.07865168539325: c5~337.07865168539325 + a4~337.07865168539325 + e5~337.07865168539325 + e4~337.07865168539325,
337.07865168539325: c5~337.07865168539325 + a4~337.07865168539325 + e4~337.07865168539325 + f5~337.07865168539325,
337.07865168539325: f5~337.07865168539325 + c5~337.07865168539325 + a4~337.07865168539325 + e4~337.07865168539325,
337.07865168539325: c5~337.07865168539325 + a4~337.07865168539325 + e4~337.07865168539325 + e5~337.07865168539325,
337.07865168539325: e5~337.07865168539325 + c5~337.07865168539325 + a4~337.07865168539325 + e4~337.07865168539325,
337.07865168539325: e4~337.07865168539325,
337.07865168539325: e4~337.07865168539325,
337.07865168539325: e4~337.07865168539325,
337.07865168539325: e4~337.07865168539325,
337.07865168539325: e4~337.07865168539325,
337.07865168539325: e4~337.07865168539325 + e5~337.07865168539325 + b4~337.07865168539325,
337.07865168539325: e4~337.07865168539325 + e5~337.07865168539325 + b4~337.07865168539325,
337.07865168539325: e4~337.07865168539325 + d5~337.07865168539325 + a4~337.07865168539325,
337.07865168539325: e4~337.07865168539325 + c5~337.07865168539325 + g4~337.07865168539325,
337.07865168539325: e4~337.07865168539325 + b4~337.07865168539325 + f4~337.07865168539325,
337.07865168539325: a4~337.07865168539325 + f4~337.07865168539325 + d4~337.07865168539325,
337.07865168539325: a4~337.07865168539325 + f4~337.07865168539325 + d4~337.07865168539325,
337.07865168539325: d5~337.07865168539325 + f4~337.07865168539325 + d4~337.07865168539325,
337.07865168539325: d5~337.07865168539325 + f4~337.07865168539325 + d4~337.07865168539325,
337.07865168539325: d5~337.07865168539325 + f4~337.07865168539325 + d4~337.07865168539325,
337.07865168539325: d5~337.07865168539325 + f4~337.07865168539325 + d4~337.07865168539325,
337.07865168539325: f4~337.07865168539325 + d4~337.07865168539325,
337.07865168539325: f4~337.07865168539325 + d4~337.07865168539325,
337.07865168539325: f4~337.07865168539325 + d4~337.07865168539325,
337.07865168539325: f4~337.07865168539325 + d4~337.07865168539325,
337.07865168539325: f4~337.07865168539325 + d4~337.07865168539325,
337.07865168539325: f4~337.07865168539325 + d4~337.07865168539325,
337.07865168539325: f4~337.07865168539325 + d4~337.07865168539325,
337.07865168539325: f4~337.07865168539325 + d4~337.07865168539325,
337.07865168539325: f4~337.07865168539325 + d4~337.07865168539325,
337.07865168539325: f4~337.07865168539325 + d4~337.07865168539325`;
const playback = playTune(music, Infinity);

const player = "p";
const playerWithSword = "s";
const sword = "S";

const monster = "m";

const background1 = "1";
const background2 = "2";
const background3 = "3";
const background4 = "4";
const background5 = "5";
const background6 = "6";

const end = "e";
const finish = "f";

const wall = "w";
const stump = "r";

class Location {
  constructor(content, background, up, right, down, left) {
    this.content = content;
    this.finalLevel = this.content == levels[5];
    this.background = background;
    if (up) {
      this.up = up;
      up.down = this;
    }
    if (right) {
      this.right = right;
      right.left = this;
    }
    if (down) {
      this.down = down;
      down.up = this;
    }
    if (left) {
      this.left = left;
      left.right = this;
    }
  }
}

setLegend(
  [background1, bitmap`
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
LLLLLLL77LLLLLLL
LLLLLLL77LLLLLLL
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111`],
  [background2, bitmap`
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
LLLLLLL66LLLLLLL
LLLLLLL66LLLLLLL
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111`], [background3, bitmap`
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
LLLLLLL99LLLLLLL
LLLLLLL99LLLLLLL
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111`],
  [background4, bitmap`
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
LLLLLLLHHLLLLLLL
LLLLLLLHHLLLLLLL
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111`],[background5, bitmap`
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
LLLLLLL44LLLLLLL
LLLLLLL44LLLLLLL
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111
1111111LL1111111`],
  [background6, bitmap`
111111LLLL111111
111111LLLL111111
111111LLLL111111
111111LLLL111111
111111LLLL111111
111113LLLL311111
11111L3333LLLLLL
LLLLLL3333LLLLLL
LLLLLL3333LLLLLL
LLLLLL3333LLLLLL
111113LLLL311111
111111LLLL111111
111111LLLL111111
111111LLLL111111
111111LLLL111111
111111LLLL111111`],
  [player, bitmap`
................
......00000.....
......02020.....
......00000.....
......00000.....
........0.......
........0.......
........0.......
......00000.....
......0.0.0.....
......0.0.0.....
........0.......
.......000......
.......0.0......
.......0.0......
.......0.0......`],
  [playerWithSword, bitmap`
................
......00000.....
......02020.....
......00000.....
......00000.....
........0.......
........1.......
........1.......
......00100.....
......01110.....
.......0C0......
........C.......
.......000......
.......0.0......
.......0.0......
.......0.0......`],
  [sword, bitmap`
....66666666....
....6..LL..6....
....6..LL..6....
....6..LL..6....
....6..LL..6....
....6..LL..6....
....6..LL..6....
....6..LL..6....
....6..LL..6....
....6..LL..6....
....6LLLLLL6....
....6..CC..6....
....6..CC..6....
....6..CC..6....
....6..CC..6....
....66666666....`],
  [monster, bitmap`
..............1.
...000000000..1.
...000000000..1.
...003000300..1.
...300000003..1.
...300000003..1.
...030000030.FFF
.0000300030000F.
00000033300000F.
00.000000000.0F.
...000000000....
...000000000....
...000000000....
...000000000....
...000000000....
...000000000....`],
  [end, bitmap`
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
  [finish, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777222222227777
7772222112222777
7772222112222777
7772222112222777
7772222112222777
7772222112222777
7772222112222777
777222CCCC222777
7772222CC2222777
7777222222227777
7777777777777777
7777777777777777
7777777777777777`],
  [wall, bitmap`
1111111111111111
1LLLLLLLLLLLLLL1
1L111111111111L1
1L1LLLLLLLLLL1L1
1L1L11111111L1L1
1L1L1LLLLLL1L1L1
1L1L1L1111L1L1L1
1L1L1L1LL1L1L1L1
1L1L1L1LL1L1L1L1
1L1L1L1111L1L1L1
1L1L1LLLLLL1L1L1
1L1L11111111L1L1
1L1LLLLLLLLLL1L1
1L111111111111L1
1LLLLLLLLLLLLLL1
1111111111111111`],
  [stump, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCDDDDDDDDDDCCC
CCCDDDDDDDDDDCCC
CCCDDDDDDDDDDCCC
CCCDDD4444DDDCCC
CCCDDD4444DDDCCC
CCCDDD4444DDDCCC
CCCDDD4444DDDCCC
CCCDDDDDDDDDDCCC
CCCDDDDDDDDDDCCC
CCCDDDDDDDDDDCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`]
);

const levels = [map`
......
......
......
......
......
......`, map`
..wmw.
..w.w.
..w.w.
..w.w.
wwwSww
......`, map`
.....m
......
.r..m.
......
.r...m
......`, map`
......
.r.r..
......
m...r.
......
m..m..`, map`
...w..
...w..
m..w..
...w..
...w..
...w..`, map`
....wm
..r.m.
....wm
..r.m.
....wm
..r.m.`]

setSolids([player, wall, stump, monster])

setPushables(
  {
    [player]: [stump],
    [stump]: [monster],
    [monster]: [monster]
  }
);

var location1 = new Location(levels[0], background1, new Location(levels[1], background2), new Location(levels[2], background3, undefined, new Location(levels[5], background6)), new Location(levels[3], background4), new Location(levels[4], background5));

var closeWarningMessage = true;
var currentPlayer = player;

function monsterBehavior(enemy)
{
  var target = getFirst(currentPlayer);
  if (target) {
    var x = target.x;
    var y = target.y;
  
    var currentX = enemy.x;
    var currentY = enemy.y;
  
    if (currentX == x && currentY == y) {
      failure();
    }
    else {
      var dX = x - currentX;
      var dY = y - currentY;
    
      var movementVector = dY;
      var direction = "y";
      if (Math.abs(dX) > Math.abs(dY)) {
        var movementVector = dX;
        var direction = "x";
      }
      
      var movement = 1;
      if (movementVector < 0) {
        var movement = -1;
      }
    
      if (direction == "x") {
        enemy.x += movement
      }
      else {
        enemy.y += movement;
      }
      
      if (enemy.x == x && enemy.y == y) {
        return true;
      }
    }
  }
}

var hasSword = false;
var collectedSword = false;
onInput("i", () => {
  var thePlayer = getFirst(currentPlayer);
  if (thePlayer) {
    var x = thePlayer.x;
    var y = thePlayer.y;
    if (hasSword) {
      var enemies = getAll(monster);
      for (var a = 0; a < enemies.length; a++) {
        var enemy = enemies[a];
        if (enemy.x == x) {
          if (Math.abs(enemy.y - y) == 1) {
            clearTile(enemy.x, enemy.y);
          }
        }
        else if (enemy.y == y) {
          if (Math.abs(enemy.x - x) == 1) {
            clearTile(enemy.x, enemy.y);
          }
        }
      }
      currentPlayer = player;
      clearTile(x, y);
      addSprite(x, y, player);
      hasSword = false;
    }
    else {
      var getSword = getFirst(sword);
      if (getSword) {
        if (!collectedSword && getFirst(sword).x == x && getFirst(sword).y == y) {
          hasSword = true;
          collectedSword = true;
          clearTile(x, y);
          addSprite(x, y, playerWithSword);
          currentPlayer = playerWithSword;
        }
        else if (collectedSword) {
          currentPlayer = playerWithSword;
          clearTile(x, y);
          addSprite(x, y, playerWithSword);
          hasSword = true;
        }
      }
    }
  }
});

// Movement
// Up
onInput("w", () => {
  closeWarningMessage = true;
  if (getFirst(currentPlayer)) {
    if (getFirst(currentPlayer).y == 0) {
      if (currentLocation.up) {
        var number = getFirst(currentPlayer).x;
        currentLocation = currentLocation.up;
        setMap(currentLocation.content);
        setBackground(currentLocation.background);
        addSprite(number, 5, currentPlayer);
      }
      else
      {
        addText("You cannot\ngo further.", { x: 3, y: (getFirst(currentPlayer).y + 4) % 6, color: color`3` });
        closeWarningMessage = false;
      }
    }
    else {
      getFirst(currentPlayer).y -= 1;
    }
  }
});

// Down
onInput("s", () => {
  closeWarningMessage = true;
  if (getFirst(currentPlayer)) {
    if (getFirst(currentPlayer).y == 5) {
      if (currentLocation.down) {
        var number = getFirst(currentPlayer).x;
        currentLocation = currentLocation.down;
        setMap(currentLocation.content);
        setBackground(currentLocation.background);
        addSprite(number, 0, currentPlayer);
      }
      else
      {
        addText("You cannot\ngo further.", { x: 3, y: (getFirst(currentPlayer).y + 4) % 6, color: color`3` });
        closeWarningMessage = false;
      }
    }
    else {
      getFirst(currentPlayer).y += 1;
    }
  }
});

// Left
onInput("a", () => {
  closeWarningMessage = true;
  if (getFirst(currentPlayer)) {
    if (getFirst(currentPlayer).x == 0) {
      if (currentLocation.left) {
        var number = getFirst(currentPlayer).y;
        currentLocation = currentLocation.left;
        setMap(currentLocation.content);
        setBackground(currentLocation.background);
        addSprite(5, number, currentPlayer);
      }
      else
      {
        addText("You cannot\ngo further.", { x: 3, y: (getFirst(currentPlayer).y + 4) % 6, color: color`3` });
        closeWarningMessage = false;
      }
    }
    else {
      getFirst(currentPlayer).x -= 1;
    }
  }
});

// Right
onInput("d", () => {
  closeWarningMessage = true;
  if (getFirst(currentPlayer)) {
    if (getFirst(currentPlayer).x == 5) {
      if (currentLocation.right) {
        var number = getFirst(currentPlayer).y;
        currentLocation = currentLocation.right;
        setMap(currentLocation.content);
        setBackground(currentLocation.background);
        addSprite(0, number, currentPlayer);
      }
      else
      {
        addText("You cannot\ngo further.", { x: 3, y: (getFirst(currentPlayer).y + 4) % 6, color: color`3` });
        closeWarningMessage = false;
      } 
    }
    else {
      getFirst(currentPlayer).x += 1;
    }
  }
});

afterInput(() => {
  var ending = false;
  if (closeWarningMessage) {
    clearText();
  }
  var enemies = getAll(monster);
  for (var i = 0; i < enemies.length; i++) {
    if (monsterBehavior(enemies[i])) {
      ending = true;
      failure();
    }
  }
  if (!ending && currentLocation.finalLevel && enemies.length == 0) {
    success();
  }
});

function failure() {
  if (playback) playback.end();
  const failMusic = tune`
375: f5~375 + c5~375 + a4~375 + f4~375,
375: f4~375 + a4~375 + c5~375 + e5~375,
375: c5~375 + a4~375 + f4~375 + d5~375,
375: e5~375 + b4~375 + g4~375 + e4~375,
375: d5~375 + b4~375 + g4~375 + e4~375,
375: c5~375 + b4~375 + g4~375 + e4~375,
375: b4~375 + g4~375 + f4~375 + d4~375,
375: b4~375 + g4~375 + f4~375 + d4~375,
375: b4~375 + g4~375 + f4~375 + d4~375,
375: g4~375 + f4~375 + d4~375,
375: g4~375 + f4~375 + d4~375,
375: g4~375 + f4~375 + d4~375,
375: a4~375 + e4~375 + c4~375,
375: a4~375 + e4~375 + c4~375,
375: a4~375 + e4~375 + c4~375,
375: a4~375 + e4~375 + c4~375,
375: a4~375 + e4~375 + c4~375,
375: a4~375 + e4~375 + c4~375,
375: a4~375 + e4~375 + c4~375,
375: a4~375 + e4~375 + c4~375,
375: a4~375 + e4~375 + c4~375,
375: a4~375 + c4~375 + e4~375,
375: a4~375 + c4~375 + e4~375,
375: a4~375 + c4~375 + e4~375,
375: a4~375 + c4~375 + e4~375,
2625`;
  playTune(failMusic);
  setBackground(end);
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      clearTile(i, j);
    }
  }
  clearText();
  addText("Your journey\nhas ended.", { x: 3, y: 4, color: color`3` });
}

function success() {
  if (playback) playback.end();
  const successMusic = tune`
300: g4~300 + e4~300 + c4~300,
300: c4~300 + e4~300 + a4~300,
300: e4~300 + c4~300 + b4~300,
300: c4~300 + e4~300 + c5~300,
300: a4~300 + f4~300 + d4~300,
300: f4~300 + d4~300 + b4~300,
300: f4~300 + d4~300 + c5~300,
300: f4~300 + d4~300 + d5~300,
300: c5~300 + g4~300 + c4~300 + e4~300,
300: e4~300 + c4~300 + g4~300 + c5~300,
300: e4~300 + c4~300 + g4~300 + c5~300,
300: e4~300 + c4~300 + g4~300 + c5~300,
300: e4~300 + c4~300 + g4~300 + c5~300,
5700`;
  playTune(successMusic);
  setBackground(finish);
  for (var i = 0; i < 6; i++) {
    for (var j = 0; j < 6; j++) {
      clearTile(i, j);
    }
  }
  clearText();
  addText("SUCCESS!", { x: 7, y: 8, color: color`9` });
}

var currentLocation = location1;
setMap(currentLocation.content);
setBackground(background1);
addSprite(2, 3, currentPlayer);
