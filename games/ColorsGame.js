/*

@title: Colors Game
@author: Liana24601
@tags: []
@addedOn: 2024-09-03

Description:
I tutor little kids and I had the idea of building 
a cute reto alien game to help them recognize and remember
their colors. So I created this game, about an alien named
Bob. Bob is a soldier in the war of the Aliens. The player
has to walk up to and attack Bob's alien enemies. But they 
have to choose the alien that is the color told to them by
the instructions. Be careful because picking the wrong color
alien could end Bob and make you lose the game!
There are 26 levels to this game, and Bob's movements can 
be controlled by the w, a, s, and d keys.
(Also, sorry if it's too easy, it's meant to be for tiny
children.)

Game Controls:
W - Up
S - Down
A - Left
D - Right

l - Start the game (at the beginning)
K - Restart the game

*/

const player = "p"
const red = "r"
const space = "s"
const green = "g"
const blue = "b"
const pink = "i"
const RedWordTwo = "a"
const yellow = "y"

const WrongRed = "u"
const WrongGreen = "n"
const WrongBlue = "l"
const WrongPink = "d"
const WrongGray = "q"
const WrongYellow = "m"

const choose = "o"
const pick = "v"
const RedWordOne = "x"
const GreenWordOne = "w"
const GreenWordTwo = "f"
const BlueWordOne = "t"
const BlueWordTwo = "e"
const gray = "h"
const PinkWordTwo = "c"
const YellowWordOne = "j"
const YellowWordTwo = "z"
const black = "k"

setSolids([ player, pick ])
setSolids([ player, choose ])
setSolids([ player, RedWordOne ])
setSolids([ player, RedWordTwo ])
setSolids([ player, YellowWordOne ])
setSolids([ player, YellowWordTwo ])
setSolids([ player, GreenWordOne ])
setSolids([ player, GreenWordTwo ])
setSolids([ player, BlueWordOne ])
setSolids([ player, BlueWordTwo ])
setSolids([ player, PinkWordTwo ])

setLegend(
  [ player, bitmap`
................
................
................
................
...75......75...
...75.7775.75...
.....777775.....
....77777775....
...7027702775...
...7527752775...
...7777777775...
....77007775....
.....777775.....
......7775......
......7075......
.....770775.....` ],
  [ red, bitmap`
................
.....3C...3C....
......3C.3C.....
......3C.3C.....
.....333333C....
.....C333C3C....
.....333333C....
.....3CCC33C....
....33333333C...
...3C333333C3C..
...3C..33C..3C..
...3C.3C.3C.3C..
......3C.3C.....
......3C.3C.....
......3C.3C.....
................`],
  [ green, bitmap`
................
.....4D...4D....
......4D.4D.....
......4D.4D.....
.....444444D....
.....D444D4D....
.....444444D....
.....4DDD44D....
....44444444D...
...4D444444D4D..
...4D..44D..4D..
...4D.4D.4D.4D..
......4D.4D.....
......4D.4D.....
......4D.4D.....
................`],
  [ space, bitmap`
0000000000000000
0000000000020000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0002000000000000
0000000000000000
0000000000000200
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000020000000000
0000000000000000
0000000000000000`],
  [ choose, bitmap`
0000000000000000
0000000000000000
0222220002222220
0220002000022000
0220002000022000
0220002000022000
0220002000022000
0220002000022000
0222220000022000
0220000000022000
0220000000022000
0220000000022000
0220000000022000
0220000002222220
0000000000000000
0000000000000000`],
  [ pick, bitmap`
0000000000000000
0000000000000000
0002222000220002
0220000200220002
0220000200220002
0220000000220220
0220000000220200
0220000000222000
0220000000220200
0220000000220220
0220000000220002
0220000200220002
0220000200220002
0002222000220002
0000000000000000
0000000000000000`],
  [ RedWordOne, bitmap`
0000000000000000
0000000000000000
0222220002222220
0220002002200000
0220002002200000
0220002002200000
0220002002200000
0220002002222000
0222220002200000
0222000002200000
0220200002200000
0220020002200000
0220002002200000
0220002002222220
0000000000000000
0000000000000000`],
  [ black, bitmap`
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

  [ blue, bitmap`
................
.....75...75....
......75.75.....
......75.75.....
.....7777775....
.....5777575....
.....7777775....
.....7555775....
....777777775...
...75777777575..
...75..775..75..
...75.75.75.75..
......75.75.....
......75.75.....
......75.75.....
................`],
  [ pink, bitmap`
................
.....8H...8H....
......8H.8H.....
......8H.8H.....
.....888888H....
.....H888H8H....
.....888888H....
.....8HHH88H....
....88888888H...
...8H888888H8H..
...8H..88H..8H..
...8H.8H.8H.8H..
......8H.8H.....
......8H.8H.....
......8H.8H.....
................`],
  [ RedWordTwo, bitmap`
0000000000000000
0000000000000000
0222200000022000
0220020000022000
0220002000022000
0220002000022000
0220002000022000
0220002000022000
0220002000000000
0220002000000000
0220002000022000
0220002000222200
0220020000222200
0222200000022000
0000000000000000
0000000000000000`],
  [ yellow, bitmap`
................
.....6F...6F....
......6F.6F.....
......6F.6F.....
.....666666F....
.....F666F6F....
.....666666F....
.....6FFF66F....
....66666666F...
...6F666666F6F..
...6F..66F..6F..
...6F.6F.6F.6F..
......6F.6F.....
......6F.6F.....
......6F.6F.....
................`],
  
  [ WrongGreen, bitmap`
................
.....4D...4D....
......4D.4D.....
......4D.4D.....
.....444444D....
.....D444D4D....
.....444444D....
.....4DDD44D....
....44444444D...
...4D444444D4D..
...4D..44D..4D..
...4D.4D.4D.4D..
......4D.4D.....
......4D.4D.....
......4D.4D.....
................`],
  [ WrongRed, bitmap`
................
.....3C...3C....
......3C.3C.....
......3C.3C.....
.....333333C....
.....C333C3C....
.....333333C....
.....3CCC33C....
....33333333C...
...3C333333C3C..
...3C..33C..3C..
...3C.3C.3C.3C..
......3C.3C.....
......3C.3C.....
......3C.3C.....
................`],
  [ WrongBlue, bitmap`
................
.....75...75....
......75.75.....
......75.75.....
.....7777775....
.....5777575....
.....7777775....
.....7555775....
....777777775...
...75777777575..
...75..775..75..
...75.75.75.75..
......75.75.....
......75.75.....
......75.75.....
................`],
  [ WrongPink, bitmap`
................
.....8H...8H....
......8H.8H.....
......8H.8H.....
.....888888H....
.....H888H8H....
.....888888H....
.....8HHH88H....
....88888888H...
...8H888888H8H..
...8H..88H..8H..
...8H.8H.8H.8H..
......8H.8H.....
......8H.8H.....
......8H.8H.....
................`],
  [ WrongGray, bitmap`
................
.....1L...1L....
......1L.1L.....
......1L.1L.....
.....111111L....
.....L111L1L....
.....111111L....
.....1LLL11L....
....11111111L...
...1L111111L1L..
...1L..11L..1L..
...1L.1L.1L.1L..
......1L.1L.....
......1L.1L.....
......1L.1L.....
................`],
  [ WrongYellow, bitmap`
................
.....6F...6F....
......6F.6F.....
......6F.6F.....
.....666666F....
.....F666F6F....
.....666666F....
.....6FFF66F....
....66666666F...
...6F666666F6F..
...6F..66F..6F..
...6F.6F.6F.6F..
......6F.6F.....
......6F.6F.....
......6F.6F.....
................`],

  [ GreenWordOne, bitmap`
0000000000000000
0000000000000000
0222002222002222
2000202000202000
2000002000202000
2000002000202000
2000002000202000
2000002222002222
2000002200002000
2022202020002000
2000202002002000
2000202000202000
2000202000202000
0222002000202222
0000000000000000
0000000000000000`],
  [ GreenWordTwo, bitmap`
0000000000000000
0000000000000000
2202222220200002
0002000000220002
0002000000222002
0002000000202002
0002000000202002
0002222000202002
0002000000202002
0002000000202002
0002000000202202
0002000000200222
0002000000200022
2202222220200002
0000000000000000
0000000000000000`],
  [ BlueWordOne, bitmap`
0000000000000000
0000000000000000
0222222000220000
0220000200220000
0220000200220000
0220000200220000
0220000200220000
0222222000220000
0220000200220000
0220000200220000
0220000200220000
0220000200220000
0220000200220000
0222222000222222
0000000000000000
0000000000000000`],
  [ BlueWordTwo, bitmap`
0000000000000000
0000000000000000
0022000200222222
0022000200220000
0022000200220000
0022000200220000
0022000200220000
0022000200220000
0022000200222220
0022000200220000
0022000200220000
0022000200220000
0022000200220000
0000222000222222
0000000000000000
0000000000000000`],
  [ gray, bitmap`
................
.....1L...1L....
......1L.1L.....
......1L.1L.....
.....111111L....
.....L111L1L....
.....111111L....
.....1LLL11L....
....11111111L...
...1L111111L1L..
...1L..11L..1L..
...1L.1L.1L.1L..
......1L.1L.....
......1L.1L.....
......1L.1L.....
................`],
  [ PinkWordTwo, bitmap`
0000000000000000
0000000000000000
0222000200220002
0222200200220002
0220200200220002
0220200200220220
0220200200220200
0220200200222000
0220200200220200
0220200200220220
0220200200220002
0220220200220002
0220022200220002
0220002200220002
0000000000000000
0000000000000000`],
  [ YellowWordOne, bitmap`
0000000000000000
0000000000000000
2000202222020000
2000202000020000
2000202000020000
2000202000020000
2000202000020000
0202002222020000
0020002000020000
0020002000020000
0020002000020000
0020002000020000
0020002000020000
0020002222022220
0000000000000000
0000000000000000`],
  [ YellowWordTwo, bitmap`
0000000000000000
0000000000000000
2000022002000002
2000200202000002
2000200202000002
2000200202000002
2000200202000002
2000200202000002
2000200202002002
2000200202002002
2000200202002002
2000200202002002
2000200202002002
2220022000220220
0000000000000000
0000000000000000`],
)


setBackground(black);

clearText();

let level = 0

const levels = [
  map`
......
......
......
......`, //1
  map`
iuiuiu
......
.ov...
.oc.p.`, //2
  map`
udyudy
......
.ov...
.jz.p.`, //3
  map`
bnbnbn
......
.ov...
.te.p.`, //4
  map`
rlqrlq
......
.ov...
.xa.p.`, //5
  map`
ululgl
......
.ov...
.wf.p.`, //6
  map`
qdmbnu
......
.ov...
.te.p.`, //7
  map`
lrdmnq
......
.ov...
.xa.p.`, //8
  map`
uldnqy
......
.ov...
.jz.p.`, //9
  map`
iluqnm
......
.ov...
.oc.p.`, //10
  map`
bqdmnu
......
.ov...
.te.p.`, //11
  map`
dnbmqu
......
.ov...
.te.p.`, //11
  map`
mqgdlu
......
.ov...
.wf.p.`, //12
  map`
nmqrld
......
.ov...
.xa.p.`, //13
  map`
yqldnu
......
.ov...
.jz.p.`, //14
  map`
mrnqdl
......
.ov...
.xa.p.`, //15
  map`
lyuqnd
......
.ov...
.jz.p.`, //16
  map`
qmbdun
......
.ov...
.te.p.`, //17
  map`
y....u
..dn..
.ov..l
qjz.p.`, //18
  map`
p..d.m
.u....
lovql.
.wfg..`, //19
  map`
dn....
ovpte.
..q.u.
m...b.`, //20
  map`
povioc
.q..l.
...u..
m.n..i`, //21
  map`
d..mov
.q...p
...nxa
l...r.`, //22
  map`
q....d
...l..
.u..m.
ovpwfg`, //23
  map`
q..ly.
ovd...
p...u.
jzn..q`, //24
  map`
q...l.
.n...m
i..u..
ov.ocp`, //25
  map`
povmwf
.u...g
..q.d.
l.....`, //26
  map`
b.n.d.
.u.q.m
......
.....p`, //27 last level!
]

let oops = 0

setMap(levels[level])

setMap(levels[0]) //starting map

addText("Bob is a soldier in", { y: 1, color: color`7` });
addText("the war of the", { y: 3, color: color`7` });
addText("Aliens. Help him", { y: 5, color: color`7` });
addText("attack the enemies!", { y: 7, color: color`7` });
addText("But be careful!", { y: 9, color: color`7` });
addText("The wrong color", { y: 11, color: color`7` });
addText("alien can end him!", { y: 13, color: color`7` });
addText("click 'l' to start", { y: 15, color: color`6` });

onInput("k", () => { //restart
  clearText();
  let oops = 0
  setBackground(black);
  setMap(levels[0])
  let yahoo = 1
  level = 0;
  
  addText("Bob is a soldier in", { y: 1, color: color`7` });
  addText("the war of the", { y: 3, color: color`7` });
  addText("Aliens. Help him", { y: 5, color: color`7` });
  addText("attack the enemies!", { y: 7, color: color`7` });
  addText("But be careful!", { y: 9, color: color`7` });
  addText("The wrong color", { y: 11, color: color`7` });
  addText("alien can end him!", { y: 13, color: color`7` });
  addText("click 'l' to start", { y: 15, color: color`6` });
});

onInput("l", () => { //next
  setMap(levels[1]);
  level = level + 1
  clearText();
  setBackground(space);
});

onInput("d", () => {
  // Move the player one tile to the right
  getFirst(player).x += 1
})

onInput("s", () => {
  // Move the player one tile to the right
  getFirst(player).y += 1
})

onInput("w", () => {
  // Move the player one tile to the right
  getFirst(player).y -= 1
})

onInput("a", () => {
  // Move the player one tile to the right
  getFirst(player).x -= 1
})

afterInput(() => {
  const RedFound = tilesWith(player, red); 

  const WrongGreenFound = tilesWith(player, WrongGreen); 

  const WrongRedFound = tilesWith(player, WrongRed); 

  const WrongBlueFound = tilesWith(player, WrongBlue);

  const BlueFound = tilesWith(player, blue);

  const YellowFound = tilesWith(player, yellow);

  const WrongYellowFound = tilesWith(player, WrongYellow);

  const GreenFound = tilesWith(player, green);

  const PinkFound = tilesWith(player, pink);
  
  if (RedFound.length >= 1) { //go to next level
    level = level + 1;

    if (level < levels.length) { //next level
      setMap(levels[level]);
      clearText();
    } else { //win
      clearText();
      setMap(levels[0]);
      setBackground(space);
      addText("Yay! you win!", { y: 6, color: color`7` });
      addText("Click 'k'", { y: 8, color: color`7` });
      addText("to restart!", { y: 9, color: color`7` });
    }
  }

    if (BlueFound.length >= 1) { //go to next level
    level = level + 1;

    if (level < levels.length) { //next level
      setMap(levels[level]);
      clearText();
    } else { //win
      clearText();
      setMap(levels[0]);
      setBackground(space);
      addText("Yay! you win!", { y: 6, color: color`7` });
      addText("Click 'k'", { y: 8, color: color`7` });
      addText("to restart!", { y: 9, color: color`7` });
    }
  }

    if (YellowFound.length >= 1) { //go to next level
    level = level + 1;

    if (level < levels.length) { //next level
      setMap(levels[level]);
      clearText();
    } else { //win
      clearText();
      setMap(levels[0]);
      setBackground(space);
      addText("Yay! you win!", { y: 6, color: color`7` });
      addText("Click 'k'", { y: 8, color: color`7` });
      addText("to restart!", { y: 9, color: color`7` });
    }
  }
  
    if (WrongGreenFound.length >= 1) { //lose
    oops = oops + 1;
      
    if (oops = 1) { //loser haha
      setMap(levels[0]);
      setBackground(black);
      addText("Oh no!", { y: 6, color: color`7` });
      addText("Bob died!", { y: 7, color: color`7` });
      addText("Click 'k'", { y: 9, color: color`7` });
      addText("to restart!", { y: 10, color: color`7` });
    }

  }

    if (GreenFound.length >= 1) { //go to next level
    level = level + 1;

    if (level < levels.length) { //next level
      setMap(levels[level]);
      clearText();
    } else { //win
      setMap(levels[0]);
      setBackground(space);
      addText("Yay! you win!", { y: 6, color: color`7` });
      addText("Click 'k'", { y: 8, color: color`7` });
      addText("to restart!", { y: 9, color: color`7` });
    }
  }

    if (WrongYellowFound.length >= 1) { //lose
    oops = oops + 1;
      
    if (oops = 1) { //loser haha
      clearText();
      setMap(levels[0]);
      setBackground(black);
      addText("Oh no!", { y: 6, color: color`7` });
      addText("Bob died!", { y: 7, color: color`7` });
      addText("Click 'k'", { y: 9, color: color`7` });
      addText("to restart!", { y: 10, color: color`7` });
    }

  }

    if (PinkFound.length >= 1) { //go to next level
    level = level + 1;

    if (level < levels.length) { //next level
      setMap(levels[level]);
      clearText();
    } else { //win
      setMap(levels[0]);
      setBackground(space);
      addText("Yay! you win!", { y: 6, color: color`7` });
      addText("Click 'k'", { y: 8, color: color`7` });
      addText("to restart!", { y: 9, color: color`7` });
    }
  }

});

afterInput(() => {

  const WrongBlueFound = tilesWith(player, WrongBlue); 

    if (WrongBlueFound.length >= 1) { //lose
    oops = oops + 1;
      
    if (oops = 1) { //loser haha
      setMap(levels[0]);
      setBackground(black);
      addText("Oh no!", { y: 6, color: color`7` });
      addText("Bob died!", { y: 7, color: color`7` });
      addText("Click 'k'", { y: 9, color: color`7` });
      addText("to restart!", { y: 10, color: color`7` });
    }

  }

  const WrongRedFound = tilesWith(player, WrongRed); 

    if (WrongRedFound.length >= 1) { //lose
    oops = oops + 1;
      
    if (oops = 1) { //loser haha
      setMap(levels[0]);
      setBackground(black);
      addText("Oh no!", { y: 6, color: color`7` });
      addText("Bob died!", { y: 7, color: color`7` });
      addText("Click 'k'", { y: 9, color: color`7` });
      addText("to restart!", { y: 10, color: color`7` });
    }

  }

  const WrongPinkFound = tilesWith(player, WrongPink); 

    if (WrongPinkFound.length >= 1) { //lose
    oops = oops + 1;
      
    if (oops = 1) { //loser haha
      setMap(levels[0]);
      setBackground(black);
      addText("Oh no!", { y: 6, color: color`7` });
      addText("Bob died!", { y: 7, color: color`7` });
      addText("Click 'k'", { y: 9, color: color`7` });
      addText("to restart!", { y: 10, color: color`7` });
    }

  }

  const WrongGrayFound = tilesWith(player, WrongGray); 

    if (WrongGrayFound.length >= 1) { //lose
    oops = oops + 1;
      
    if (oops = 1) { //loser haha
      setMap(levels[0]);
      setBackground(black);
      addText("Oh no!", { y: 6, color: color`7` });
      addText("Bob died!", { y: 7, color: color`7` });
      addText("Click 'k'", { y: 9, color: color`7` });
      addText("to restart!", { y: 10, color: color`7` });
    }

  }

});

afterInput(() => {
  if (level == 27) {
    addText("Final challenge!", { y: 8, color: color`7` });
    addText("Pick the alien", { y: 9, color: color`7` });
    addText("that is the", { y: 10, color: color`7` });
    addText("same color as you!", { y: 11, color: color`7` });
  }

});
