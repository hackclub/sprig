/*
@title: Call 911
@author: Rohit
@tags: ["strategy" , "puzzle" , "maze"]
@addedOn: 2022-10-18
*/
//credits: Nathan Pease

//Sprites

const firetruck = "p";
const shortcut1 = "b";
const shortcut = "r";
const fire = "w";
const blueWater = "m";
const ui = "u";
const selectLeft = "z";
const selectRight = "x";
const selectMiddle = "c";
const house1 = "e";
const house2 = "f";
const pine = "h";
const coconut = "i";
const bushes = "k";
//const bg = "g";

//Tunes 
const music = tune`
68.4931506849315: a4~68.4931506849315 + g4~68.4931506849315 + b4~68.4931506849315,
68.4931506849315: a4~68.4931506849315 + g4~68.4931506849315 + f4~68.4931506849315,
68.4931506849315: g4~68.4931506849315 + f4~68.4931506849315 + e4~68.4931506849315,
68.4931506849315: f4~68.4931506849315 + e4~68.4931506849315 + d4~68.4931506849315,
68.4931506849315: e4~68.4931506849315 + d4~68.4931506849315 + c4~68.4931506849315,
68.4931506849315: d4~68.4931506849315 + c4~68.4931506849315,
68.4931506849315: c4~68.4931506849315,
68.4931506849315: c4~68.4931506849315 + d4~68.4931506849315,
68.4931506849315: c4~68.4931506849315 + d4~68.4931506849315 + e4~68.4931506849315,
68.4931506849315: d4~68.4931506849315 + e4~68.4931506849315 + f4~68.4931506849315,
68.4931506849315: e4~68.4931506849315 + f4~68.4931506849315 + g4~68.4931506849315,
68.4931506849315: f4~68.4931506849315 + g4~68.4931506849315 + a4~68.4931506849315,
68.4931506849315: g4~68.4931506849315 + a4~68.4931506849315 + b4~68.4931506849315,
68.4931506849315: a4~68.4931506849315 + b4~68.4931506849315 + c5~68.4931506849315,
68.4931506849315: b4~68.4931506849315 + c5~68.4931506849315 + d5~68.4931506849315,
68.4931506849315: c5~68.4931506849315 + d5~68.4931506849315 + e5~68.4931506849315,
68.4931506849315: d5~68.4931506849315 + e5~68.4931506849315 + f5~68.4931506849315,
68.4931506849315: e5~68.4931506849315 + f5~68.4931506849315 + g5~68.4931506849315,
68.4931506849315: f5~68.4931506849315 + g5~68.4931506849315 + a5~68.4931506849315,
68.4931506849315: a5~68.4931506849315 + b5~68.4931506849315 + g5~68.4931506849315,
68.4931506849315: b5~68.4931506849315 + a5~68.4931506849315,
68.4931506849315: b5~68.4931506849315,
68.4931506849315: a5~68.4931506849315 + b5~68.4931506849315,
68.4931506849315: a5~68.4931506849315 + b5~68.4931506849315 + g5~68.4931506849315,
68.4931506849315: a5~68.4931506849315 + g5~68.4931506849315 + f5~68.4931506849315,
68.4931506849315: g5~68.4931506849315 + f5~68.4931506849315 + e5~68.4931506849315,
68.4931506849315: f5~68.4931506849315 + e5~68.4931506849315 + d5~68.4931506849315,
68.4931506849315: e5~68.4931506849315 + d5~68.4931506849315 + c5~68.4931506849315,
68.4931506849315: d5~68.4931506849315 + c5~68.4931506849315 + b4~68.4931506849315,
68.4931506849315: c5~68.4931506849315 + b4~68.4931506849315 + a4~68.4931506849315,
68.4931506849315: b4~68.4931506849315 + a4~68.4931506849315 + g4~68.4931506849315,
68.4931506849315: a4~68.4931506849315 + g4~68.4931506849315 + f4~68.4931506849315`;
const extinguish = tune `
940.1709401709401,
85.47008547008546: c5~85.47008547008546 + b4~85.47008547008546 + a4~85.47008547008546 + d5~85.47008547008546,
85.47008547008546: a4~85.47008547008546 + d5~85.47008547008546 + c5~85.47008547008546 + b4~85.47008547008546,
85.47008547008546: a4~85.47008547008546 + d5~85.47008547008546 + c5-85.47008547008546 + b4-85.47008547008546,
85.47008547008546: a4~85.47008547008546 + c5~85.47008547008546 + d5~85.47008547008546 + b4~85.47008547008546,
85.47008547008546: a4~85.47008547008546 + d5~85.47008547008546 + c5~85.47008547008546 + b4~85.47008547008546,
1367.5213675213674`;

//Primitive types 
let moves = 20;
let selected = 0;
const menu = true;

setLegend(
  [firetruck, bitmap`
....L..6..6..6..
...LLL..66.66...
..LLLLL...6.....
.LLLLLLL..0.....
..3333333333....
.333333333333...
.3CCCCCCC3773...
.33C3C3C337733..
.33C3C3C337773..
.3CCCCCCC37773..
.33333333333333.
.33333333333333.
111111166111333.
1100011110001111
..0L0....0L0....
..000....000....`],
  [shortcut1, bitmap`................
.....LLLLLL.....
...LL666666LL...
..L6666666666L..
..L6666666666L..
.L666666666636L.
.L666666666663L.
.L666666666636L.
.L666666666663L.
.L666666666636L.
.L666666666363L.
..L6666666363L..
..L6666663636L..
...LL666363LL...
.....LLLLLL.....
................ `],
  [shortcut, bitmap`
....00000000....
...0000000000...
..00FFFFFFFF00..
.000FFFFFFFF000.
000FFFFFFFFF0000
00FFFFFFFFFFFF00
00FFFFFFFFFFFF00
00FFFFFFFFFFFF00
00FFFFFFFFFF3F00
00FFFFFFFFFF3F00
00FFFFFFFFFF3F00
00FFFFFFFFF3FF00
000FFFFFFF33F000
.000FFFFFF3F000.
..000000000000..
...0000000000...`],
  [fire, bitmap`
...3............
....3...........
.....33...3.....
.....993........
.....399........
.....39933......
.....39933......
.....3999333....
....39999933....
...339999933....
...339999933....
...399666993....
...396666693....
...366666693....
....366.663.....
.....3...3......`],
  [blueWater, bitmap`
......LLL.......
.....L...L......
....L.....L.....
...L.......L....
...L1111111L....
...117777711....
...177777771....
...117777711....
...111111111....
...111111111....
...111111111....
....1111111.....
....1111111.....
....1111111.....
....1111111.....
.....11111......`],
  [ui, bitmap`
................
................
................
................
................
................
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
  [house1, bitmap`
.......11.1.....
.........1.1....
........C.......
.......CCC......
....0000000.....
...00H0LLLL0....
..00HHH0LLLL0...
.00HHHH00LLLL0..
00HHHHHH00LLLL0.
.0HHHHHHH0000000
.0HHHHHHH066660.
.0HHHHHHH060060.
.0H000HHH060060.
.0H0L0HHH066660.
.0H0L0HHH066660.
.00000000000000.`],
  [house2, bitmap`
.......11.1.....
.........1.1....
........C.......
.......CCC......
....0000000.....
...007033330....
..00777033330...
.0077770033330..
007777770033330.
.077777770000000
.07777777077770.
.07777777070070.
.07000777070070.
.070L0777077770.
.070L0777077770.
.00000000000000.`],
  [bushes, bitmap `
................
................
................
................
.......D........
.......D........
.4D...4.....4D..
..4D..4D....4...
..4...4DD..4D...
...DD.DDDDDDD...
...D4DDDDDD.....
D...4DDDDDDD..4D
4D.44DDDDDDDD.4D
4DDDDDDDDDDDDDD.
4DDDDD44DDDDDDD.
.DDDD444444DDDD.`],
  [pine, bitmap `
................
.......DD.......
......DDD4......
.....DDDDDD.....
....DDDDDD4D....
...DDDDDD444D...
.....DDDDDD.....
....DDDDDDDD....
...DDDDDDDD4D...
..DDDDDDD4444D..
....DDDDDDDD....
...DDDDDDDDDD...
..DDDDDDDDDD4D..
.DDDDDDDD44444D.
DDDDDDDDDDDDDDDD
.......CC.......`],
  [coconut, bitmap `
....DD..D..DD...
...DD.D.D.D.DD..
..DD...DDD...DD.
DDD...DDDDD...DD
D....DD.C.DD....
....DD..C..DD...
..DDD...C...DDD.
..D.....C.....D.
........C.......
........C.......
........C.......
........C.......
........C.......
........C.......
........C.......
........C.......`],
  [selectLeft, bitmap`
................
................
................
................
................
................
1111111111111111
1000000000000000
1000000000000000
1000000000000000
1000000000000000
1000000000000000
1000000000000000
1000000000000000
1000000000000000
1111111111111111`],
  [selectRight, bitmap`
................
................
................
................
................
................
1111111111111111
0000000000000001
0000000000000001
0000000000000001
0000000000000001
0000000000000001
0000000000000001
0000000000000001
0000000000000001
1111111111111111`],
  [selectMiddle, bitmap`
................
................
................
................
................
................
1111111111111111
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
1111111111111111`],
  /*[bg, bitmap`
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
0000000000000000`]*/
);

setSolids([firetruck,house1,house2,pine,coconut,bushes]);

let level = 0;
const levels = [
  map`
.........
.........
.........
.........
.........`, // main menu
  map`
p.........
.e.fkfeif.
.k.h.i.f..
.e.e.f...h
.fif.e.e..
..h....kf.
f...ie.f..
ekfkhk...f
.fhe.f.e..
.......k.w`,
  map`
.....p....
eifkehfhe.
..........
bekifhehie
..........
eifkehhfh.
..........
.ehfiehfke
......r...
fiefkehifw`,
  map`
p.........
efhfehfeh.
hkhkhfkkf.
heiiiiiih.
eiififhie.
hiiihiiih.
wkhkekfhe.
.effhkkfk.
.fekkkeef.
.......m..`,
  map`
p.........
eke.kfi.fe
f.k.e.e.h.
e.fmk.k...
f.kei.fhf.
b.........
.fhhefkeif
.eiewr....
.kfekfhe..
..........`,
  map`
p.........
k.k.k.k.k.
kbkbkbkbkb
kkkkkkkkkk
ifefeffefh
ifehfeffeh
iffefehefh
iefhefefeh
ieeeffhhhh
hhhhhhhr.w`,
  map`
rh........
.fe.h.ehfk
.hi.fe....
.fh.khfkm.
..........
ehf.iekfe.
....hf....
.heif..k..
......ifeh
ihkfwhkp.b`,
  map`
..........
.b..b...b.
......b...
..........
...b...b..
b.........
.....p..b.
..........
.b.....hhh
.....bmhrw`,
  map`
pi.......w
.er....h..
.hikheif.h
...e...e..
.i.h.f...b
.e...h.e..
...e.k.fif
ih.h.i....
he.fhfhki.
kim.......`,
  map`
h..ib...fh
e.kfhef...
h.e...i.k.
f...kke.fi
h...fpf.hm
..h.f.i.e.
.ef.....i.
..h..f....
k.kiehfeh.
r......wf.`,
  map`
ph...f....
.f.e..mk.f
.h.h.hei.h
...k.fwh.e
hkhf.h.hfi
b....e....
f.hehf.h.f
h......e.e
i.fhe.fi..
m...ir...e`,
  map`
.........
.........
.........
.........
.........`, // Win screen
  map`
......
......
......
......
......`,
];

setMap(levels[level]);

setPushables({
  [ firetruck ]: [],
});

playTune(music, Infinity);
addText("Play", {y: 6, color: color`4`});
addText("Level Select", {y: 9, color: color`3`});
//setBackground(bg);

//addText(moves.toString(), { x: 1, y: 1, color: color`3` });

onInput("w", () => {
  if (moves >= 1 && getFirst(firetruck)) {
    getFirst(firetruck).y -= 1
    moves -= 1;
  } 
});
  
onInput("a", () => {
  if (moves >= 1 && getFirst(firetruck)) {
    getFirst(firetruck).x -= 1
    moves -= 1;
  }
});
  
onInput("d", () => {
  if (moves >= 1 && getFirst(firetruck)) {
    getFirst(firetruck).x += 1
    moves -= 1;
  }
});
  
onInput("s", () => {
  if (level == 0 && selected == 0) {
    level += 1;
    setMap(levels[level]);
  }
  else if (level == 0 && selected == 1) {
    selected = 0;
    level = 12;
    setMap(levels[level]);
  }
  else if (level == 11) {
    level = 0;
    setMap(levels[level]);
    clearText();
    addText("Play", {y: 6, color: color`4`});
    addText("Level Select", {y: 9, color: color`3`});
  }
  else if (level == 12) {
    level = selected + 1;
    setMap(levels[selected + 1]);
  }
  else if (moves >= 1) {
    getFirst(firetruck).y += 1
    moves -= 1;
  }
});

onInput("j", () => {
  if (level != 0 && level != 11 && level != 12) {
    setMap(levels[level]);
    moves = 20;
  }
  else if (level == 12) {
    selected -= 1;
    if (selected < 0) {
      selected  = 0;
    }
  }
});

onInput("k", () => {
  if (level == 0) {
    selected = 1;
  }
  else if (level == 12) {
    if (selected < 5) {
      selected  += 5;
    }
    if (selected > 9) {
      selected = 9;
    }
  }
});

onInput("i", () => {
  if (level == 0) {
    selected = 0;
  }
  else if (level == 12) {
    if (selected > 4) {
      selected -= 5; 
    }
    if (selected < 0) {
      selected = 0;
    }
  }
});

onInput("l", () => {
  if (level == 12) {
    selected += 1;
    if (selected > 9) {
      selected = 9;
    }
  }
});

afterInput(() => {
  

  if (getFirst(firetruck) && getFirst(shortcut1) && getFirst(firetruck).x == getFirst(shortcut1).x) {
    if (getFirst(firetruck).y == getFirst(shortcut1).y) {
      setSolids([house1,house2,pine,coconut,bushes]);
      getFirst(firetruck).x = getFirst(shortcut).x;
      getFirst(firetruck).y = getFirst(shortcut).y;
      setSolids([firetruck,house1,house2,pine,coconut,bushes]);
    }
  }
  else if (getFirst(firetruck) && getFirst(shortcut) && getFirst(firetruck).x == getFirst(shortcut).x) {
    if (getFirst(firetruck).y == getFirst(shortcut).y) {
      setSolids([house1,house2,pine,coconut,bushes]);
      getFirst(firetruck).x = getFirst(shortcut1).x;
      getFirst(firetruck).y = getFirst(shortcut1).y;
      setSolids([firetruck,house1,house2,pine,coconut,bushes]);
    }
  }


  if (getFirst(firetruck) && getFirst(blueWater) && getFirst(firetruck).x == getFirst(blueWater).x) {
    if (getFirst(firetruck).y == getFirst(blueWater).y) {
      moves += 10;
      let x = getFirst(firetruck).x;
      let y = getFirst(firetruck).y;
      playTune(extinguish);
      clearTile(x, y);
      addSprite(x, y, firetruck);
    }
  }



  if (getFirst(firetruck) && getFirst(fire) && getFirst(firetruck).x == getFirst(fire).x) {
    if (getFirst(firetruck).y == getFirst(fire).y) {
      level += 1;
      setMap(levels[level]);
      moves = 20;
    }
  }


  if (level != 0 && level != 12) {
    clearText();
    addText(moves.toString(), { x: 1, y: 1, color: color`3` });    
  }
  if (level == 11) {
    addText("You Win!", {y: 8, color: color`0`});  
  } 
  else if (level == 12) {
    clearText();
    addText("1", {x: 2, y: 6, color: color`0`});
    addText("2", {x: 5, y: 6, color: color`0`});
    addText("3", {x: 9, y: 6, color: color`0`});
    addText("4", {x: 13, y: 6, color: color`0`});
    addText("5", {x: 17, y: 6, color: color`0`});
    
    addText("6", {x: 2, y: 11, color: color`0`});
    addText("7", {x: 5, y: 11, color: color`0`});
    addText("8", {x: 9, y: 11, color: color`0`});
    addText("9", {x: 13, y: 11, color: color`0`});
    addText("10", {x: 17, y: 11, color: color`0`});
  }

  if (level == 0) {
    if (selected == 0) {
      clearText();
      addText("Play", {y: 6, color: color`4`});
      addText("Level Select", {y: 9, color: color`3`});
    } else if (selected == 1) {
      clearText();
      addText("Play", {y: 6, color: color`0`});
      addText("Level Select", {y: 9, color: color`3`});
    }
  }
  else if (level == 12) {
    switch(selected) {
      case 0:
        addText("1", {x: 2, y: 6, color: color`4`});
        break;
      case 1:
        addText("2", {x: 5, y: 6, color: color`4`});
        break;
      case 2:
        addText("3", {x: 9, y: 6, color: color`4`});
        break;
      case 3:
        addText("4", {x: 13, y: 6, color: color`4`});
        break;
      case 4:
        addText("5", {x: 17, y: 6, color: color`4`});
        break;
      case 5:
        addText("6", {x: 2, y: 11, color: color`4`});
        break;
      case 6:
        addText("7", {x: 5, y: 11, color: color`4`});
        break;
      case 7:
        addText("8", {x: 9, y: 11, color: color`4`});
        break;
      case 8:
        addText("9", {x: 13, y: 11, color: color`4`});
        break;
      case 9:
        addText("10", {x: 17, y: 11, color: color`4`});
        break;
    }
  }
});



