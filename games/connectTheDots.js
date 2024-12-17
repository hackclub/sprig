/*
@title: connect the dots
@author: Alex Howden
@tags: ['strategy']
@addedOn: 2023-02-26
Recreation of Flow Free
Maps from the original game
*/

const player = "c";
const playerToggle = "C";
const redEnd = "R";
const orangeEnd = "O";
const yellowEnd = "Y";
const greenEnd = "G";
const blueEnd = "B";
const purpleEnd = "P";
const red = "r";
const orange = "o";
const yellow = "y";
const green = "g";
const blue = "b";
const purple = "p";
const lock = "l";

const dict = {"R": red, "O": orange, "Y": yellow, "G": green, "B": blue, "P": purple,
              "r": red, "o": orange, "y": yellow, "g": green, "b": blue, "p": purple};

const dictEnd = {"R": redEnd, "O": orangeEnd, "Y": yellowEnd, "G": greenEnd, "B": blueEnd, "P": purpleEnd};

setLegend(
  [player, bitmap`
0000000000000000
0000000000000000
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
00............00
0000000000000000
0000000000000000`],
  [playerToggle, bitmap`
1111111111111111
1111111111111111
11............11
11............11
11............11
11............11
11............11
11............11
11............11
11............11
11............11
11............11
11............11
11............11
1111111111111111
1111111111111111`],
  [redEnd, bitmap`
0000000000000000
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0000000000000000`],
  [orangeEnd, bitmap`
0000000000000000
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0999999999999990
0000000000000000`],
  [yellowEnd, bitmap`
0000000000000000
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0666666666666660
0000000000000000`],
  [greenEnd, bitmap`
0000000000000000
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0444444444444440
0000000000000000`],
  [blueEnd, bitmap`
0000000000000000
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0777777777777770
0000000000000000`],
  [purpleEnd, bitmap`
0000000000000000
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0HHHHHHHHHHHHHH0
0000000000000000`],
  [red, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [orange, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  [yellow, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [green, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [blue, bitmap`
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
  [purple, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [lock, bitmap`
................
................
......LLLL......
.....LLLLLL.....
....LLL11LLL....
....LL...1LL....
....LL...1LL....
.........1LL....
....LLLLLLLL....
....LLLLLLLL....
....LLL00LLL....
....LLL00LLL....
....LLLLLLLL....
....LLLLLLLL....
................
................`]
);

const levels = [
  map`
c....
.....
.....
.....
.....`,
  map`
R.G.Y
c.B.O
.....
.G.Y.
.RBO.`,
  map`
Y.c..
.....
..G..
BGR.Y
R...B`,
  map`
cYBG.
...R.
..R..
Y..O.
B.OG.`,
  map`
c..RG
R....
..Y..
...B.
GBY..`,
  map`
c..RG
.YBG.
.....
....B
..R.Y`,
  map`
Y.BRG
c....
...G.
.B..R
....Y`,
  map`
Bc.Y.
G....
Y.GB.
.R.R.
.....`,
  map`
Bc.RO
...Y.
..Y..
.RO.G
.BG..`,
  map`
c..R.
.YBG.
..Y..
.....
BGR..`,
  map`
c....
G..R.
BRBY.
.....
Y...G`,
  map`
BYR..
c....
.BG..
.....
GY..R`,
  map`
c..RG
..BG.
R....
OB.YO
....Y`,
  map`
GY.YO
c....
R.OB.
...G.
...RB`,
  map`
c.GYB
.....
G..O.
...RB
YO..R`,
  map`
BY...
c.G..
R.B..
.....
RGY..`,
  map`
c....O
......
.YR...
...G.Y
.G.ORB
...B..`,
  map`
c..B.Y
...G.B
..RY..
......
...GR.
......`,
  map`
c....O
......
.YR...
O..G..
G..BR.
B..Y..`,
  map`
BRc...
.B..Y.
YR....
.G....
......
G.....`,
  map`
c.....
....B.
..RYOG
GB....
R...Y.
O.....`,
  map`
c.....
.Y.RG.
.O....
...R..
..YG..
BOB...`,
  map`
c.....
......
...Y..
...R..
.R.G..
.GYB.B`,
  map`
c....Y
...RBG
..B...
..G...
......
....YR`,
  map`
GcY...
R..B..
.RGO..
......
......
OBY...`,
  map`
c..RPO
.Y....
R.P.G.
Y.G...
O....B
B.....`,
  map`
c......
BY...PG
OB....R
..Y....
.....P.
...O.G.
R......`,
  map`
Pc....R
O.OPR.B
......G
.......
.G.....
.Y...B.
....Y..`,
  map`
BcPGO.R
Y......
...P...
Y.BG...
.......
.R.....
......O`,
  map`
c...YO.
.R.G.P.
.O.....
...R...
.B..G..
....P..
.YB....`,
  map`
c.....B
...G...
.....OY
...R...
.....R.
......O
.B..G.Y`,
];

let level = 0;
let toggle = 0;
let startPos = [];
let endPos = [];
let dragSprt = "";

addText("WASD: Movement", {x: 3, y: 5, color: color`0`});
addText("I: Toggle Drag", {x: 3, y: 7, color: color`0`});
addText("J: Reset Color", {x: 3, y: 9, color: color`0`});
addText("K: Reset Level", {x: 3, y: 11, color: color`0`});

setMap(levels[level]);

setSolids([player]);

setPushables({
  [player]: [blue],
});

onInput("w", () => {
  if (toggle == 0) {
    p().y -= 1;
  } else {
    if (getTile(p().x, p().y - 1) == "" || getTile(p().x, p().y- 1)[0]["type"] == dragSprt) {
      const sprt = getTile(p().x, p().y)[1]["type"];
      p().y -= 1;
      addSprt(sprt);
    }
  }
});

onInput("a", () => {
  if (toggle == 0) {
    p().x -= 1;
  } else {
    if (getTile(p().x - 1, p().y) == "" || getTile(p().x - 1, p().y)[0]["type"] == dragSprt) {
      const sprt = getTile(p().x, p().y)[1]["type"];
      p().x -= 1;
      addSprt(sprt);  
    }
  }
});

onInput("s", () => {
  if (toggle == 0) {
    p().y += 1;
  } else {
    if (getTile(p().x, p().y + 1) == "" || getTile(p().x, p().y + 1)[0]["type"] == dragSprt) {
      const sprt = getTile(p().x, p().y)[1]["type"];
      p().y += 1;
      addSprt(sprt);    
    }
  }
});

onInput("d", () => {
  if (toggle == 0) {
    p().x += 1;
  } else {
    if (getTile(p().x + 1, p().y) == "" || getTile(p().x + 1, p().y)[0]["type"] == dragSprt) {
      const sprt = getTile(p().x, p().y)[1]["type"];
      p().x += 1;
      addSprt(sprt);
    }
  }
});

onInput("i", () => {
  toggleDrag();
});

onInput("j", () => {
  try {
    const sprt = getTile(p().x, p().y)[1]["type"];
    if (["R", "O", "Y", "G", "B", "P"].includes(sprt)) {
      while (getAll(dict[sprt]).length > 0) {
        getFirst(dict[sprt]).remove();
      }
      for (var i = 0; i < tilesWith(dictEnd[sprt]).length; i++) {
        if (tilesWith(dictEnd[sprt])[i][tilesWith(dictEnd[sprt])[i].length - 1]["type"] == "l") {
          tilesWith(dictEnd[sprt])[i][tilesWith(dictEnd[sprt])[i].length - 1].remove();
        }
      }
    }
  } catch (error) {}
});

onInput("k", () => {
  changeLevel();
});

afterInput(() => {
  if (level == 0) {
    level++;
    changeLevel();
  }
  
  if (tilesWith(lock).length == tilesWith(redEnd).length + tilesWith(orangeEnd).length + tilesWith(yellowEnd).length + tilesWith(greenEnd).length + tilesWith(blueEnd).length + tilesWith(purpleEnd).length) {
    level++;
    changeLevel();
  }
});

function changeLevel() {
  toggle = 0;
  clearText("");
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    addText(level + "/30", {x: 1, y: 1, color: color`0`});
  } else {
    clearText("");
    addText("you win!", { y: 8, color: color`0` });
  }
}

function toggleDrag() {
  if (toggle == 0) {
    try {
      dragSprt = getTile(p().x, p().y)[1]["type"];
    } catch (error) {}
    if (getTile(p().x, p().y)[getTile(p().x, p().y).length - 1]["type"] != "l" && getTile(p().x, p().y).length > 1 && ["R", "O", "Y", "G", "B", "P"].includes(getTile(p().x, p().y)[1]["type"])) {
      toggle = 1;
      getFirst(player).type = playerToggle;
      startPos = [p().x, p().y];
    }
  } else {
    toggle = 0;
    getFirst(playerToggle).type = player;
    endPos = [p().x, p().y];
    if (startPos == endPos || getTile(startPos[0], startPos[1])[0]["type"] != getTile(endPos[0], endPos[1])[getTile(endPos[0], endPos[1]).length - 1]["type"] || (getTile(endPos[0], endPos[1]).length >= 3 && !["R", "O", "Y", "G", "B", "P"].includes(dragSprt))) {
      while (getAll(dict[dragSprt]).length > 0) {
        getFirst(dict[dragSprt]).remove();
      }
    } else {
      addSprite(startPos[0], startPos[1], lock);
      addSprite(endPos[0], endPos[1], lock);
    }
  }
}

function p() {
  if (toggle == 0) {
    return getFirst(player);
  } else {
    return getFirst(playerToggle);
  }
}

function addSprt(sprt) {
  if (!["R", "O", "Y", "G", "B", "P"].includes(getTile(p().x, p().y)[getTile(p().x, p().y).length - 1]["type"])) {
    addSprite(p().x, p().y, dict[sprt]);
  } 
}