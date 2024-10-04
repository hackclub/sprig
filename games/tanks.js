/*
@title: Tanks
@author: Om Raheja
@tags: ['action','multiplayer']
@addedOn: 2024-06-30
Shoot your projectile at the other tank before they get you!


In the color picker:
AD to move player one cursor.
JL to move player two cursor.
W and I to set READY state for players.

In the actual game:
WASD for player one to move,
IJKL for player two to move.

The game moves the players automatically every 500 ms. 
Each keypress shoots a projectile and changes direction.
Shoot the other tank to win!
*/

const player = "a";
const player2 = "b";
const wall = "w";
const projectile = "p";

// direction of the tanks
var direction1 = ">";
var direction2 = "<";

const colorTanks = [{
    "^": bitmap`
......0000......
......0000......
.......00.......
.......00.......
...0033003300...
..C0330000330C..
..C3303333033C..
..C3030303303C..
..C3033030303C..
..C3033333303C..
..C3303333033C..
..C3330000333C..
..C0333333330C..
..C0033333300C..
..C0000000000C..
..C..........C..`,
    ".": bitmap`
................
................
...0033333300...
..C0333333330C..
..C3330000333C..
..C3303333033C..
..C3030303303C..
..C3033030303C..
..C3033333303C..
..C3303333033C..
..C0330000330C..
..C0033003300C..
..C0000000000C..
..C....00....C..
......0000......
......0000......`,
    "<": bitmap`
................
................
................
......0000000...
00...033333330..
000000330330030.
00..03333333330.
.....0000000000.
.....00494949330
....000000000000
...0F03CF03CF300
..0F3F0F3F0F3F0.
...0FC30FC30F0..
....000000000...
................
................`,
    ">": bitmap`
................
................
................
...0000000......
..033333330...00
.030033033000000
.03333333330..00
.0000000000.....
03394949400.....
000000000000....
003FC30FC30F0...
.0F3F0F3F0F3F0..
..0F03CF03CF0...
...000000000....
................
................`
  },
  {
    "^": bitmap`
......0000......
......0000......
.......00.......
.......00.......
...0099009900...
..C0990000990C..
..C9909999099C..
..C9090909909C..
..C9099090909C..
..C9099999909C..
..C9909999099C..
..C9990000999C..
..C0999999990C..
..C0099999900C..
..C0000000000C..
..C..........C..`,
    ".": bitmap`
................
................
...0099999900...
..C0999999990C..
..C9990000999C..
..C9909999099C..
..C9090909909C..
..C9099090909C..
..C9099999909C..
..C9909999099C..
..C0990000990C..
..C0099009900C..
..C0000000000C..
..C....00....C..
......0000......
......0000......`,
    "<": bitmap`
................
................
................
......0000000...
00...099999990..
000000990990090.
00..09999999990.
.....0000000000.
.....00434343990
....000000000000
...0F09CF09CF900
..0F9F0F9F0F9F0.
...0FC90FC90F0..
....000000000...
................
................`,
    ">": bitmap`
................
................
................
...0000000......
..099999990...00
.090099099000000
.09999999990..00
.0000000000.....
09934343400.....
000000000000....
009FC90FC90F0...
.0F9F0F9F0F9F0..
..0F09CF09CF0...
...000000000....
................
................`
  },
  {
    "^": bitmap`
......0000......
......0000......
.......00.......
.......00.......
...0066006600...
..C0660000660C..
..C6606666066C..
..C6060606606C..
..C6066060606C..
..C6066666606C..
..C6606666066C..
..C6660000666C..
..C0666666660C..
..C0066666600C..
..C0000000000C..
..C..........C..`,
    ".": bitmap`
................
................
...0066666600...
..C0666666660C..
..C6660000666C..
..C6606666066C..
..C6060606606C..
..C6066060606C..
..C6066666606C..
..C6606666066C..
..C0660000660C..
..C0066006600C..
..C0000000000C..
..C....00....C..
......0000......
......0000......`,
    "<": bitmap`
................
................
................
......0000000...
00...066666660..
000000660660060.
00..06666666660.
.....0000000000.
.....00434343660
....000000000000
...0F06CF06CF600
..0F6F0F6F0F6F0.
...0FC60FC60F0..
....000000000...
................
................`,
    ">": bitmap`
................
................
................
...0000000......
..066666660...00
.060066066000000
.06666666660..00
.0000000000.....
06634343400.....
000000000000....
006FC60FC60F0...
.0F6F0F6F0F6F0..
..0F06CF06CF0...
...000000000....
................
................`
  },
  {
    "^": bitmap`
......0000......
......0000......
.......00.......
.......00.......
...00DD00DD00...
..C0DD0000DD0C..
..CDD0DDDD0DDC..
..CD0D0D0DD0DC..
..CD0DD0D0D0DC..
..CD0DDDDDD0DC..
..CDD0DDDD0DDC..
..CDDD0000DDDC..
..C0DDDDDDDD0C..
..C00DDDDDD00C..
..C0000000000C..
..C..........C..`,
    ".": bitmap`
................
................
...00DDDDDD00...
..C0DDDDDDDD0C..
..CDDD0000DDDC..
..CDD0DDDD0DDC..
..CD0D0D0DD0DC..
..CD0DD0D0D0DC..
..CD0DDDDDD0DC..
..CDD0DDDD0DDC..
..C0DD0000DD0C..
..C00DD00DD00C..
..C0000000000C..
..C....00....C..
......0000......
......0000......`,
    "<": bitmap`
................
................
................
......0000000...
00...0DDDDDDD0..
000000DD0DD00D0.
00..0DDDDDDDDD0.
.....0000000000.
.....00434343DD0
....000000000000
...0F0DCF0DCFD00
..0FDF0FDF0FDF0.
...0FCD0FCD0F0..
....000000000...
................
................`,
    ">": bitmap`
................
................
................
...0000000......
..0DDDDDDD0...00
.0D00DD0DD000000
.0DDDDDDDDD0..00
.0000000000.....
0DD34343400.....
000000000000....
00DFCD0FCD0F0...
.0FDF0FDF0FDF0..
..0F0DCF0DCF0...
...000000000....
................
................`
  },
  {
    "^": bitmap`
......0000......
......0000......
.......00.......
.......00.......
...0077007700...
..C0770000770C..
..C7707777077C..
..C7070707707C..
..C7077070707C..
..C7077777707C..
..C7707777077C..
..C7770000777C..
..C0777777770C..
..C0077777700C..
..C0000000000C..
..C..........C..`,
    ".": bitmap`
................
................
...0077777700...
..C0777777770C..
..C7770000777C..
..C7707777077C..
..C7070707707C..
..C7077070707C..
..C7077777707C..
..C7707777077C..
..C0770000770C..
..C0077007700C..
..C0000000000C..
..C....00....C..
......0000......
......0000......`,
    "<": bitmap`
................
................
................
......0000000...
00...077777770..
000000770770070.
00..07777777770.
.....0000000000.
.....00434343770
....000000000000
...0F07CF07CF700
..0F7F0F7F0F7F0.
...0FC70FC70F0..
....000000000...
................
................`,
    ">": bitmap`
................
................
................
...0000000......
..077777770...00
.070077077000000
.07777777770..00
.0000000000.....
07734343400.....
000000000000....
007FC70FC70F0...
.0F7F0F7F0F7F0..
..0F07CF07CF0...
...000000000....
................
................`
  },
  {
    "^": bitmap`
......0000......
......0000......
.......00.......
.......00.......
...00HH00HH00...
..C0HH0000HH0C..
..CHH0HHHH0HHC..
..CH0H0H0HH0HC..
..CH0HH0H0H0HC..
..CH0HHHHHH0HC..
..CHH0HHHH0HHC..
..CHHH0000HHHC..
..C0HHHHHHHH0C..
..C00HHHHHH00C..
..C0000000000C..
..C..........C..`,
    ".": bitmap`
................
................
...00HHHHHH00...
..C0HHHHHHHH0C..
..CHHH0000HHHC..
..CHH0HHHH0HHC..
..CH0H0H0HH0HC..
..CH0HH0H0H0HC..
..CH0HHHHHH0HC..
..CHH0HHHH0HHC..
..C0HH0000HH0C..
..C00HH00HH00C..
..C0000000000C..
..C....00....C..
......0000......
......0000......`,
    "<": bitmap`
................
................
................
......0000000...
00...0HHHHHHH0..
000000HH0HH00H0.
00..0HHHHHHHHH0.
.....0000000000.
.....00434343HH0
....000000000000
...0F0HCF0HCFH00
..0FHF0FHF0FHF0.
...0FCH0FCH0F0..
....000000000...
................
................`,
    ">": bitmap`
................
................
................
...0000000......
..0HHHHHHH0...00
.0H00HH0HH000000
.0HHHHHHHHH0..00
.0000000000.....
0HH34343400.....
000000000000....
00HFCH0FCH0F0...
.0FHF0FHF0FHF0..
..0F0HCF0HCF0...
...000000000....
................
................`
  },
  {
    "^": bitmap`
......0000......
......0000......
.......00.......
.......00.......
...0088008800...
..C0880000880C..
..C8808888088C..
..C8080808808C..
..C8088080808C..
..C8088888808C..
..C8808888088C..
..C8880000888C..
..C0888888880C..
..C0088888800C..
..C0000000000C..
..C..........C..`,
    ".": bitmap`
................
................
...0088888800...
..C0888888880C..
..C8880000888C..
..C8808888088C..
..C8080808808C..
..C8088080808C..
..C8088888808C..
..C8808888088C..
..C0880000880C..
..C0088008800C..
..C0000000000C..
..C....00....C..
......0000......
......0000......`,
    "<": bitmap`
................
................
................
......0000000...
00...088888880..
000000880880080.
00..08888888880.
.....0000000000.
.....00434343880
....000000000000
...0F08CF08CF800
..0F8F0F8F0F8F0.
...0FC80FC80F0..
....000000000...
................
................`,
    ">": bitmap`
................
................
................
...0000000......
..088888880...00
.080088088000000
.08888888880..00
.0000000000.....
08834343400.....
000000000000....
008FC80FC80F0...
.0F8F0F8F0F8F0..
..0F08CF08CF0...
...000000000....
................
................`
  },
];

/* since the sprites for colored tanks are 0,1,2... respectively */
const colorCode = [
  color`3`, color`9`, color`6`,
  color`D`, color`7`, color`H`,
  color`8`
];

const colorString = [
  "RED", "ORANGE", "YELLOW", "GREEN", "BLUE", "PURPLE", "PINK"
];

const wallBitmap = bitmap`
10LLLLLLLLLLLL01
010LLLLLLLLLL010
L010LLLLLLLL010L
LL010LLLLLL010LL
LLL010LLLL010LLL
LLLL01022010LLLL
LLLLL010010LLLLL
LLLLL201102LLLLL
LLLLL201102LLLLL
LLLLL010010LLLLL
LLLL01022010LLLL
LLL010LLLL010LLL
LL010LLLLLL010LL
L010LLLLLLLL010L
010LLLLLLLLLL010
10LLLLLLLLLLLL01`;
const projectileBitmap = bitmap`
................
................
................
................
................
................
......LLLL......
......LL0L......
......L0LL......
......LLLL......
................
................
................
................
................
................`;

var musicPlaying = null;

// scores
var score1 = 0;
var score2 = 0;

// sprite type
var player1Type = 3;
var player2Type = 3;

// color ready
var player1Ready = false;
var player2Ready = false;

// time of last win
var lastWin = 0;

registerSprites();
setSolids([player, player2, wall, projectile]);

const Maps = {
  End: 0,
  ColorPicker: 1,
  FirstLevel: 2
};

const Music = {
  End: tune`
283.0188679245283: B4~283.0188679245283,
283.0188679245283: C5~283.0188679245283,
283.0188679245283: D5~283.0188679245283,
283.0188679245283: D5~283.0188679245283,
283.0188679245283: C5~283.0188679245283,
283.0188679245283: B4~283.0188679245283,
283.0188679245283: A4~283.0188679245283,
283.0188679245283: G4~283.0188679245283 + E4-283.0188679245283,
283.0188679245283: G4~283.0188679245283 + E4-283.0188679245283,
283.0188679245283: A4~283.0188679245283,
283.0188679245283: B4~283.0188679245283,
283.0188679245283: B4~283.0188679245283,
283.0188679245283: A4~283.0188679245283 + E4-283.0188679245283,
283.0188679245283: A4~283.0188679245283 + E4-283.0188679245283,
283.0188679245283: B4~283.0188679245283,
283.0188679245283: C5~283.0188679245283,
283.0188679245283: D5~283.0188679245283,
283.0188679245283: D5~283.0188679245283,
283.0188679245283: C5~283.0188679245283,
283.0188679245283: B4~283.0188679245283,
283.0188679245283: A4~283.0188679245283,
283.0188679245283: G4~283.0188679245283 + E4-283.0188679245283 + C4/283.0188679245283,
283.0188679245283: G4~283.0188679245283 + E4-283.0188679245283 + C4/283.0188679245283,
283.0188679245283: A4~283.0188679245283,
283.0188679245283: B4~283.0188679245283,
283.0188679245283: B4~283.0188679245283,
283.0188679245283: A4~283.0188679245283 + E4^283.0188679245283,
283.0188679245283: G4~283.0188679245283 + D4^283.0188679245283,
1132.0754716981132`,
  ColorPickCheck: tune`
230.76923076923077,
230.76923076923077: B5-230.76923076923077,
230.76923076923077: B5-230.76923076923077,
6692.307692307692`,
  ColorPickFail: tune`
153.0612244897959: E4/153.0612244897959,
153.0612244897959: D4/153.0612244897959,
153.0612244897959: C4/153.0612244897959,
4438.775510204081`,
};

let level = Maps.ColorPicker;
const levels = [
  map`
wwwww
wwwww
wwwww
wwwww
wwwww`,
  map`
...........
...........
...........
..0123456..
.....x.....
..0123456..
.....y.....
...........
...........`,
  map`a.........
..........
..w..ww...
..w.......
..w.......
.....b....
...www....
..........`
];

loadColorPicker();

function registerSprites() {
  setLegend(
    [player, player1Bitmap()],
    [player2, player2Bitmap()],
    [wall, wallBitmap],
    [projectile, projectileBitmap]
  );
}

function registerColorSprites() {
  const chooser1 = "x";
  const chooser2 = "y";

  setLegend(
    ["0", colorTanks[0][">"]],
    ["1", colorTanks[1][">"]],
    ["2", colorTanks[2][">"]],
    ["3", colorTanks[3][">"]],
    ["4", colorTanks[4][">"]],
    ["5", colorTanks[5][">"]],
    ["6", colorTanks[6][">"]],
    [chooser1, bitmap`
4444444444444444
4444444444444444
4444444444444444
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
................
................
................`],
    [chooser2, bitmap`
4444444444444444
4444444444444444
4444444444444444
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
................
................
................`]
  );
}

function loadLevel() {
  clearText();
  direction1 = ">";
  direction2 = "<";
  registerSprites();
  level = Maps.FirstLevel;
  setMap(levels[level]);
}

function loadColorPicker() {
  level = 1;
  registerColorSprites();
  setMap(levels[level]);
  addText("L/R MOVE,UP SELECT", { y: 1 });
}

// holds all the flying bullets
var projEntities = [];

function addProjectile(x, y, direction) {
  if (level >= Maps.FirstLevel) {
    setLegend([projectile, projectileBitmap]);

    if (x >= 0 && x < width() && y >= 0 && y < height() && getTile(x, y).length <= 0) {
      projEntities.push([x, y, direction]);
      addSprite(x, y, projectile);
    }

    checkWinLose(x, y);
  }
}

function player1Bitmap() {
  return colorTanks[player1Type][direction1];
}

function player2Bitmap() {
  return colorTanks[player2Type][direction2];
}

function oneMusic(tune) {
  if (musicPlaying) {
    musicPlaying.end();
  }
  musicPlaying = playTune(tune);
}

function checkWinLose(x, y) {
  if (level >= Maps.FirstLevel) {
    registerSprites();

    if (getFirst(player).x == x && getFirst(player).y == y) {
      level = 0;
      oneMusic(Music.End);

      setMap(levels[level]);
      clearText();
      addText(colorString[player2Type] + " WIN", { x: 0, y: 0, color: colorCode[player2Type] });
      addText("ANY KEY TO CONT", { x: 0, y: 2, color: color`2` });

      score2++;
      lastWin = new Date().getTime();
    } else if (getFirst(player2).x == x && getFirst(player2).y == y) {
      level = 0;
      oneMusic(Music.End);

      setMap(levels[level]);
      clearText();
      addText(colorString[player1Type] + " WIN", { x: 0, y: 0, color: colorCode[player1Type] });
      addText("ANY KEY TO CONT", { x: 0, y: 2, color: color`2` });

      score1++;
      lastWin = new Date().getTime();
    }
  }
}

/* change direction */

onInput("w", () => {
  if (level >= Maps.FirstLevel) {
    direction1 = "^";
    registerSprites();

    addProjectile(getFirst(player).x, getFirst(player).y - 1, "^");

  } else if (level == Maps.ColorPicker) {
    const chooser1 = "x";
    const chooser2 = "y";
    player1Ready = true;

    player1Type = getFirst(chooser1).x - 2;
    player2Type = getFirst(chooser2).x - 2;

    if (player1Type == player2Type) {
      oneMusic(Music.ColorPickFail);
    } else if (player2Ready) {
      oneMusic(Music.ColorPickCheck);
      loadLevel();
    } else {
      oneMusic(Music.ColorPickCheck);
    }
  }
})

onInput("s", () => {
  if (level >= Maps.FirstLevel) {
    direction1 = ".";
    registerSprites();

    addProjectile(getFirst(player).x, getFirst(player).y + 1, ".");
  }
})

onInput('a', () => {
  if (level >= Maps.FirstLevel) {
    direction1 = "<";
    registerSprites();


    addProjectile(getFirst(player).x - 1, getFirst(player).y, "<");

  } else if (level == Maps.ColorPicker) {
    const chooser1 = "x";
    registerColorSprites();

    if (getFirst(chooser1).x > 2) {
      getFirst(chooser1).x -= 1;
    }
  }
})

onInput('d', () => {
  if (level >= Maps.FirstLevel) {
    direction1 = ">";
    registerSprites();


    addProjectile(getFirst(player).x + 1, getFirst(player).y, ">");

  } else if (level == Maps.ColorPicker) {
    const chooser1 = "x";
    registerColorSprites();

    if (getFirst(chooser1).x < 8) {
      getFirst(chooser1).x += 1;
    }
  }
})

onInput("i", () => {
  if (level >= Maps.FirstLevel) {
    direction2 = "^";
    registerSprites();

    addProjectile(getFirst(player2).x, getFirst(player2).y - 1, "^");
  } else if (level == Maps.ColorPicker) {
    const chooser1 = "x";
    const chooser2 = "y";
    player2Ready = true;

    player1Type = getFirst(chooser1).x - 2;
    player2Type = getFirst(chooser2).x - 2;

    if (player1Type == player2Type) {
      oneMusic(Music.ColorPickFail);
    } else if (player1Ready) {
      oneMusic(Music.ColorPickCheck);
      loadLevel();
    } else {
      oneMusic(Music.ColorPickCheck);
    }
  }
})

onInput('k', () => {
  if (level >= Maps.FirstLevel) {
    direction2 = ".";
    registerSprites();

    addProjectile(getFirst(player2).x, getFirst(player2).y + 1, ".");
  }
})

onInput('j', () => {
  if (level >= Maps.FirstLevel) {
    direction2 = "<";
    registerSprites();

    addProjectile(getFirst(player2).x - 1, getFirst(player2).y, "<");
  } else if (level == Maps.ColorPicker) {
    const chooser2 = "y";
    registerColorSprites();

    if (getFirst(chooser2).x > 2) {
      getFirst(chooser2).x -= 1;
    }
  }
});

onInput("l", () => {
  if (level >= Maps.FirstLevel) {
    direction2 = ">";
    registerSprites();

    addProjectile(getFirst(player2).x + 1, getFirst(player2).y, ">");
  } else if (level == Maps.ColorPicker) {
    const chooser2 = "y";
    registerColorSprites();

    if (getFirst(chooser2).x < 8) {
      getFirst(chooser2).x += 1;
    }
  }
})

// restart the game if the level is different
afterInput(() => {
  if (new Date().getTime() - lastWin >= 250 && level == Maps.End) {
    loadLevel();
    addText(score1 + ":" + score2, { color: color`4` });
  }
});

// actually move the sprite in a forever loop
function run() {
  if (level >= Maps.FirstLevel) {
    // projectiles go first
    registerSprites();
    for (var i = 0; i < projEntities.length;) {
      clearTile(projEntities[i][0], projEntities[i][1]);
      switch (projEntities[i][2]) {
        case "^":
          projEntities[i][1] -= 1;
          break;
        case "<":
          projEntities[i][0] -= 1;
          break;
        case ">":
          projEntities[i][0] += 1;
          break;
        case ".":
          projEntities[i][1] += 1;
          break;
        default:
          break;
      }

      const x = projEntities[i][0];
      const y = projEntities[i][1];

      var items = getTile(x, y);

      checkWinLose(x, y);

      if (x < 0 || x >= width() || y < 0 || y >= height() || items.length > 0) {
        projEntities.splice(i, 1);

      } else {
        i++;
        addSprite(x, y, projectile);
      }
    }

    // process tank movement
    if (level >= Maps.FirstLevel) {
      switch (direction1) {
        case "^":
          getFirst(player).y -= 1;
          break;
        case "<":
          getFirst(player).x -= 1;
          break;
        case ">":
          getFirst(player).x += 1;
          break;
        case ".":
          getFirst(player).y += 1;
          break;
        default:
          break;
      }
      switch (direction2) {
        case "^":
          getFirst(player2).y -= 1;
          break;
        case "<":
          getFirst(player2).x -= 1;
          break;
        case ">":
          getFirst(player2).x += 1;
          break;
        case ".":
          getFirst(player2).y += 1;
          break;
        default:
          break;
      }
    }
  }
}

setInterval(run, 500);