/*
@title: Ghosbly: Turn Based Combat
@author: SlimeBind
@tags: []
@addedOn: 2024-06-24
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/
let inputEnabled = true;
const player = "p"
const enemy = "1"
const enemy1 = "2"
const enemy2 = "3"
const enemy3 = "4"
const enemy4 = "5"
const fishe1 = "8"
const fishe2 = "9"
const fishe3 = "0"
const bare = "c"
const pbar = "z"
const ebar = "x"
const floor= "f"
const floor1= "g"
const floor2= "h"
const pillar1= "q"
const pillar2= "w"
const pillar3= "e"
let phealth = 5
let ehealth = 5
let shouldGlow = false;
let levelcontinue = false;
let damage = 1
let fight = 0
let glow = 8
let name = "Monster"
let gamecontinue = false
const intro = tune`
66.66666666666667: E4~66.66666666666667 + F4^66.66666666666667,
66.66666666666667: E4~66.66666666666667,
66.66666666666667: G5~66.66666666666667 + A5^66.66666666666667,
66.66666666666667: G5~66.66666666666667,
66.66666666666667: E4~66.66666666666667 + F4^66.66666666666667,
66.66666666666667: E4~66.66666666666667,
66.66666666666667: G5~66.66666666666667 + A5^66.66666666666667,
66.66666666666667: G5~66.66666666666667,
66.66666666666667: E4~66.66666666666667 + F4^66.66666666666667,
66.66666666666667: E4~66.66666666666667,
66.66666666666667: G5~66.66666666666667 + A5^66.66666666666667,
66.66666666666667: G5~66.66666666666667,
66.66666666666667: E4~66.66666666666667 + F4^66.66666666666667,
66.66666666666667: E4~66.66666666666667,
66.66666666666667: G5~66.66666666666667 + A5^66.66666666666667,
66.66666666666667: G5~66.66666666666667,
66.66666666666667: C4~66.66666666666667 + D4^66.66666666666667,
66.66666666666667: C4~66.66666666666667,
66.66666666666667: E5~66.66666666666667 + F5^66.66666666666667,
66.66666666666667: E5~66.66666666666667,
66.66666666666667: C4~66.66666666666667 + D4^66.66666666666667,
66.66666666666667: C4~66.66666666666667,
66.66666666666667: E5~66.66666666666667 + F5^66.66666666666667,
66.66666666666667: E5~66.66666666666667,
66.66666666666667: C4~66.66666666666667 + D4^66.66666666666667,
66.66666666666667: C4~66.66666666666667,
66.66666666666667: E5~66.66666666666667 + F5^66.66666666666667,
66.66666666666667: E5~66.66666666666667,
66.66666666666667: C4~66.66666666666667 + D4^66.66666666666667,
66.66666666666667: C4~66.66666666666667,
66.66666666666667: E5~66.66666666666667 + F5^66.66666666666667,
66.66666666666667: E5~66.66666666666667`
const background1 = tune`
500: D5^500 + C4~500,
500: E4~500 + G4~500,
500: E5^500 + C4~500,
500: C5^500 + E4~500 + G4~500,
500: C4~500,
500: D5^500 + E4~500 + G4~500,
1000,
500: D5^500 + C4~500,
500: E4~500 + G4~500,
500: E5^500 + C4~500,
500: C5^500 + E4~500 + G4~500,
500: C4~500,
500: B4^500 + E4~500 + G4~500,
1000,
500: D5^500 + C4~500,
500: E4~500 + G4~500,
500: E5^500 + C4~500,
500: E4~500 + G4~500 + G5^500,
500: D5^500 + C4~500,
500: E4~500 + G4~500,
500: E5^500,
500: C5^500,
500: D5^500 + C4~500,
500: C5^500 + E4~500 + G4~500,
500: C4~500,
500: B4^500 + E4~500 + G4~500,
500: C4~500,
500: E4~500 + G4~500 + A4^500,
1000`
const hit1 = tune`
500: B4/500,
15500`
const hit2 = tune`
500: A4/500,
15500`
const glowsfx = tune`
109.0909090909091: A4/109.0909090909091,
109.0909090909091: G5/109.0909090909091,
3272.727272727273`
const healsfx = tune`
147.05882352941177: F4-147.05882352941177,
147.05882352941177: G4-147.05882352941177,
4411.764705882353`
const dodgesfx = tune`
137.61467889908258: C4-137.61467889908258,
137.61467889908258: C4-137.61467889908258,
4128.440366972477`
const winsfx = tune`
69.28406466512702: A4-69.28406466512702,
69.28406466512702,
69.28406466512702: F4-69.28406466512702,
69.28406466512702,
69.28406466512702: B4-69.28406466512702,
69.28406466512702: C5-69.28406466512702,
69.28406466512702: E5-69.28406466512702,
1732.1016166281754`
const losesfx = tune`
69.28406466512702: A4-69.28406466512702,
69.28406466512702,
69.28406466512702: F4-69.28406466512702,
69.28406466512702,
69.28406466512702: B4-69.28406466512702,
69.28406466512702: C5-69.28406466512702,
69.28406466512702: F4-69.28406466512702,
1732.1016166281754`
const wonsfx = tune`
69.28406466512702: A4-69.28406466512702,
69.28406466512702,
69.28406466512702: F4-69.28406466512702,
69.28406466512702,
69.28406466512702: B4-69.28406466512702,
69.28406466512702: C5-69.28406466512702,
69.28406466512702: E5-69.28406466512702,
69.28406466512702,
69.28406466512702: C5-69.28406466512702,
138.56812933025404,
69.28406466512702: A4-69.28406466512702,
138.56812933025404,
69.28406466512702: A4-69.28406466512702,
69.28406466512702: A4-69.28406466512702,
69.28406466512702,
69.28406466512702: F4-69.28406466512702,
69.28406466512702,
69.28406466512702: B4-69.28406466512702,
69.28406466512702: C5-69.28406466512702,
69.28406466512702: E5-69.28406466512702,
69.28406466512702,
69.28406466512702: F5-69.28406466512702,
69.28406466512702,
69.28406466512702: D5-69.28406466512702,
138.56812933025404,
69.28406466512702: G5-69.28406466512702,
207.85219399538107`
  
playTune(intro, 2)

setLegend(
  [ player, bitmap`
................
................
................
.......000......
......02220.....
.....0222220....
....002222200...
...0022020220...
..0C022020220...
..0C022222220...
..0C022222220...
..00020202020...
.....0.0.0.0....
.....0.....0....
....00.....00...
................`],
  [ enemy, bitmap`
................
................
................
.......000......
......03330.....
.....0333330....
..0.003333300...
..0.033030330...
...00300300300..
....033333330.0.
....033333330.0.
....030303030...
.....0.0.0.0....
.....0.....0....
....00.....00...
................` ],
  [ enemy1, bitmap`
................
................
......0000......
.....033330.....
....03333330....
...0033333300...
.00030333303000.
0..0300330030..0
0..0333333330..0
0..0333333330..0
0..0300330030..0
....0..00..0....
....0......0....
....0......0....
...00......00...
................` ],
  [ enemy2, bitmap`
...0..0000..0...
....00000000....
.0.0000000000.0.
..000000000000..
.00000000000000.
.0220000..000000
0222200.....0000
02222000.....000
00220000....0000
000...00....000.
00...000....000.
000....0....00.0
0000..00...00...
000....0..00..0.
..0......0......
................` ],
  [ enemy3, bitmap`
.00000.000......
0LLLLL00........
0LL0000000......
0002220.........
023230000.......
00000L0L0000....
.00000LLL00L00..
.0LLLLLLLLLLLL0.
0LLL0LLLLL000L0.
0LLL0LL00L0.202.
00LL0L000L00222.
.0000L0..0L022..
...0L0...0L022..
...0L0...0L0.2..
....00...000.2..
................` ],
  [ enemy4, bitmap`
................
.......0........
......070.......
.....0770.......
.....0770.......
...00777700.....
..0977777990....
..099777999000..
.09990709999220.
..0992229992220.
..0902222792220.
...007227777220.
...07727777720..
...0770770770...
....00.00.00....
................` ],
  [ fishe1, bitmap`
................
.......000000000
.....00044444444
....004444444444
...0040004444444
...0444444444444
..04420022444444
.004420024444444
.044444444044404
.044444444040400
.0444444400404D0
.004444440404DDD
..0000044444DDDD
..00444444440000
...0000044444444
.......000000000`],
  [ fishe2, bitmap`
...00000000.....
000DDDDDDDD000..
4440DDDDDDD04400
44440DDDDDD00444
444400DDDDDD0444
4444400DDDDD0444
4444440000000444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
0444444444444444
0444444444444444
4444444000004400
4444400DDDDD00..
000000000000....`],
  [ fishe3, bitmap`
......000000000.
000.000DDDDDDDD0
44400DDDDDDDDDD0
44444DDDDDDDDDD0
444444DDDDDDDDD0
4444440DDDDDD000
4444440DDDDD0...
4444440DDD00....
4444440DDDD00...
4444400DDDDDD0..
444440DDDDDDDD0.
44440DDDDDDDDD00
00444DDDDDDDDDD0
..00000DDDDDDDD0
......00DDDDDDD0
........00000000`],
  [ pbar, bitmap`
0000000000000000
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
0000000000000000`],
  [ ebar, bitmap`
0000000000000000
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
0000000000000000`],
  [ floor, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ],
  [ floor1, bitmap`
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
LLLLLLLLLLLLLLLL` ],
  [ floor2, bitmap`
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
7777777777777777` ],
  [ pillar1, bitmap`
0111L111111L1110
0111L111111L1110
0111L111111L1110
0111L111111L1110
0111L111111L1110
0111L111111L1110
0111L111111L1110
0111L111111L1110
0111L111111L1110
0111L111111L1110
0111L111111L1110
0111L111111L1110
0111L111111L1110
0111L111111L1110
0111L111111L1110
0111L111111L1110` ],
  [ pillar2, bitmap`
0777577777757770
0777577777757770
0777577777757770
0777577777757770
0777577777757770
0777577777757770
0777577777757770
0777577777757770
0777577777757770
0777577777757770
0777577777757770
0777577777757770
0777577777757770
0777577777757770
0777577777757770
0777577777757770` ],
  [ pillar3, bitmap`
0444D444444D4440
0444D444444D4440
0444D444444D4440
0444D444444D4440
0444D444444D4440
0444D444444D4440
0444D444444D4440
0444D444444D4440
0444D444444D4440
0444D444444D4440
0444D444444D4440
0444D444444D4440
0444D444444D4440
0444D444444D4440
0444D444444D4440
0444D444444D4440` ]
)

function fights() {
  fight += 1
  if (fight == 1) {
 name = "Evolved"
 ehealth = 6
 damage = 1
 glow = 5
  } if (fight == 2) {
 name = "Nightmare"
 ehealth = 10
 damage = 1
 glow = 3
setBackground(floor1)
  } if (fight == 3) {
 name = "Ninja"
 ehealth = 6
 damage = 2
 glow = 2
setBackground(floor)
  } if (fight == 4) {
 name = "Mudkip"
 ehealth = 8
 damage = 2
 glow = 2
  } if (fight == 5) {
  name = "Fishe"
 ehealth = 3
 damage = 0
 glow = 10
setBackground(floor2)
} }

function enemyfw() {
 if (fight == 0) {
  getFirst(enemy).y += 1;
    } else if ( fight == 1) {
  getFirst(enemy1).y += 1;
    } else if ( fight == 2) {
  getFirst(enemy2).y += 1;
    } else if ( fight == 3) {
  getFirst(enemy3).y += 1;
    } else if ( fight == 4) {
  getFirst(enemy4).y += 1;
    } else if ( fight == 5) {
  getFirst(fishe1).y += 1;
  getFirst(fishe2).y += 1;
  getFirst(fishe3).y += 1;
   }
}

function enemybw() {
if (fight == 0) {
  getFirst(enemy).y -= 1;
    } else if ( fight == 1) {
  getFirst(enemy1).y -= 1;
    } else if ( fight == 2) {
  getFirst(enemy2).y -= 1;
    } else if ( fight == 3) {
  getFirst(enemy3).y -= 1;
    } else if ( fight == 4) {
  getFirst(enemy4).y -= 1;
    } else if ( fight == 5) {
  getFirst(fishe1).y -= 1;
  getFirst(fishe2).y -= 1;
  getFirst(fishe3).y -= 1;
   }
}

function checkGameEnd() {
  if (phealth <= 0 || ehealth <= 0) {
    if (phealth <= 0) {
      clearText();
      addText(`${name} Wins`, { y: 7, color: color`2` });
      getFirst(player).y += 1;
      playTune(losesfx)
    } else if (ehealth <= 0) {
      clearText();
      addText("Ghosbly Wins", { y: 7, color: color`2` });
      addText("Press to continue", { y: 8, color: color`2` });
      playTune(winsfx)
      enemybw()
      gamecontinue = true
    }
    inputEnabled = false;
  }
}

function displayhealth() {
  addText(`Hp:${ehealth}`, { y: 2, color: color`2` });
  addText(`Hp:${phealth}`, { y: 13, color: color`2` });
}

function enemyturn() {
        if (ehealth >=1) {
  setTimeout(() => {
  clearText();
  displayhealth();
  enemyfw()
  playTune(hit2)
  phealth -= damage;
  addText(`Hp:${phealth}(-${damage})`, { y: 13, color: color`2` });
}, 1000);
       
  setTimeout(() => {
  clearText();
  displayhealth()
  checkGameEnd();
  enemybw()
  if (phealth >= 1) {
  inputEnabled = true;
  randomizeGlow();
  }
}, 1500);
    }
}

function heal() {
  phealth += 5;
  playTune(healsfx)
  addText("+", { x: 11, y: 10, color: color`4` });
  if (phealth >= 6) {
    phealth = 6
  }
}

function randomizeGlow() {
  shouldGlow = Math.floor(Math.random() * glow) === 0;
  if (shouldGlow) {
  addText("!", {x: 11, y: 4, color: color`6` });
  playTune(glowsfx)
  }
}

function attackGlow() {
  clearText();
  displayhealth()
  enemyfw()
  playTune(hit2)
  phealth -= damage;
  addText(`Hp:${phealth}(-${damage})`, { y: 13, color: color`2` });
       
  setTimeout(() => {
  clearText();
  displayhealth()
  enemybw()
}, 500);
   setTimeout(() => {
  clearText();
  displayhealth()
  enemyfw()
  playTune(hit2)
  phealth -= damage;
  addText(`Hp:${phealth}(-${damage})`, { y: 13, color: color`2` });
}, 1000);     
  setTimeout(() => {
  clearText();
  displayhealth()
  checkGameEnd();
  enemybw()
  if (phealth >= 1) {
  inputEnabled = true;
  randomizeGlow();
  }
}, 1500);
}

onInput("j", () => {
  if (inputEnabled) {
    inputEnabled = false;
      if (shouldGlow) {
       attackGlow()
    } else {
  getFirst(player).y -= 1;
  ehealth -= 1;
  playTune(hit1)
  addText(`Hp:${ehealth}(-1)`, { y: 2, color: color`2` });
       
    setTimeout(() => {
  clearText();
  displayhealth()
  checkGameEnd();
  getFirst(player).y += 1;
}, 500);
  enemyturn()
    }
 }})



onInput("k", () => {
  if (inputEnabled) {
      inputEnabled = false;
      if (shouldGlow) {
       attackGlow()
    } else {
  heal()
  addText(`Hp:${phealth}(+)`, { y: 13, color: color`2` });
       
    setTimeout(() => {
  clearText();
  displayhealth()
  checkGameEnd();
}, 500);
  enemyturn()
  }
}})

onInput("l", () => {
  if (inputEnabled) {
    playTune(dodgesfx)
      clearText();
      displayhealth()
    if (shouldGlow == true) { 
      phealth += 1;
      addText(`Hp:${phealth}(+1)`, { y: 13, color: color`2` });
    }
  inputEnabled = false;
  shouldGlow = false;
  enemyfw()
  const randomDirection = Math.floor(Math.random() * 2) === 0 ? -1 : 1;
  getFirst(player).x += randomDirection;
       
    setTimeout(() => {
  enemybw()
  getFirst(player).x += randomDirection/-1;
  inputEnabled = true;
  clearText();
  displayhealth()
  randomizeGlow();
}, 500);
 }
})

inputEnabled = false;
addText("J to attack", { y: 7, color: color`3` });
addText("K to heal", { y: 8, color: color`4` });
addText("L to Dodge", { y: 9, color: color`6` });
setTimeout(() => {
  clearText();
  addText('When you see " "', { y: 7, color: color`0` });
  addText("!", { x: 16 ,y: 7, color: color`6` });
  addText("Dodge!", { y: 8, color: color`0` });
}, 2500);
setTimeout(() => {
  clearText();
  displayhealth()
  inputEnabled = true;
  playTune(background1, Infinity)
}, 5000);



let level = 0
const levels = [
  map`
qxxxxxq
q..1..q
q.....q
q..p..q
qzzzzzq`,
  map`
qxxxxxq
q..2..q
q.....q
q..p..q
qzzzzzq`,
  map`
qxxxxxq
q..3..q
q.....q
q..p..q
qzzzzzq`,
  map`
qxxxxxq
q..4..q
q.....q
q..p..q
qzzzzzq`,
  map`
wxxxxxw
w..5..w
w.....w
w..p..w
wzzzzzw`,
  map`
exxxxxe
e.890.e
e.....e
e..p..e
ezzzzze`
]

const currentLevel = levels[level];
setMap(currentLevel);

setBackground(floor)

afterInput(() => {

    if (gamecontinue == true) {
    gamecontinue = false
    inputEnabled = true;
    fights()
    clearText()
    displayhealth()
    level = level + 1;
    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      inputEnabled = false;
      playTune(wonsfx)
      clearText()
      addText("GOOD JOB GHOSBLY!", { y: 5, color: color`6` });
      addText("YOU WON!", { y: 6, color: color`6` });
    }
  }});
