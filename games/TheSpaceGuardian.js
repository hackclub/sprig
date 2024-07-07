/*
@title: TheSpaceGuardian
@author: Adrian DeGendt 
@tags: []
@addedOn: 2024-07-97

First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

const background = "d";
const background2 = "f";
const player = "p";
const ufo = "a";
const lazer = "b";
const explosion = "l";

setLegend(
  [ background, bitmap`
0000000000000000
0000000000000000
0000000600060000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0006000000000000
0000000600000060
0000000000000000
0000000000000000
0000000000000000
0060000000000000
0000000006000000
0000000000000000
0000000000000000`],
  [ background2, bitmap`
0000000000000000
0000000000060000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000060000000000
0000000000000000
0000000000000060
0000000006000000
0000000000000000
0000000000000000
0060000000000000
0000000000000600
0000000000000000
0000000000000000`],
  [ explosion, bitmap`
.....LLL........
....L666L...LLL.
...L6666LLLLL6L.
..L66366688866L.
.666688836688L8.
663663666633336L
636336633833333L
666886L666333666
688833366683666L
666633333883LL3L
636LL33838833836
6866633333336666
6666366LL3833666
L6663LL663386LL.
LLLLLLLL8668LLL.
....LLLL6.......`],
  [ player, bitmap`
................
.......22.......
.......00.......
.......00.......
.......00.......
......2002......
......2002......
..4...2002...4..
..22.200002.22..
.20220044002202.
.20000000000002.
..200000000002..
...2220000222...
......2222......
................
................` ],
  [ ufo, bitmap`
................
................
................
................
.......33.......
......3333......
.....333333.....
....L333333L....
...LLLLLLLLLL...
....L3LLLL3L....
.....LLLLLL.....
......LLLL......
.......LL.......
................
................
................`],
  [ lazer, bitmap`
................
................
....4......4....
....4......4....
....4......4....
....4......4....
................
................
................
................
....4......4....
....4......4....
....4......4....
....4......4....
................
................`]

)
setBackground(background)
setSolids([])

let level = 1
const levels = [
  map`
.....
.....
.....
.....
.....
.....
..p..`,
  
  map`
.....
.....
.....
.....
.....
.....
.....`
]
addText( "     Press j\n\n   to begin!" , {
      x: 2,
      y: 3,
      color: color`2`
    })

setMap(levels[1])
  
setPushables({
  [ player ]: []
})

let InGame = 0;
function GameOver() {
  InGame = 0;
  let list = getAll(ufo);
  for (let i = 0; i < list.length; i++) {list[i].remove();}
  list = getAll(lazer);
  for (let i = 0; i < list.length; i++) {list[i].remove();}
  getFirst(player).remove();
  setMap(levels[1]);
  addText( "    Game Over" , {
      x: 2,
      y: 3,
      color: color`2`
  })
  addText( "  Score: \n  " + Score , {
      x: 5,
      y: 5,
      color: color`2`
  })
  addText( "Press j to \nplay again!" , {
      x: 5,
      y: 8,
      color: color`2`
  })
}

function ScreenShake() {
  let i = 0;
  var SS = setInterval(() => {
    if (i % 2 == 0) {setBackground(background2);}
    else {setBackground(background);}
    i++;
    if (i == 2) {clearInterval(SS);}
  },50)
}
function Touching(First, Second) {
  if (InGame && First.x == Second.x && First.y == Second.y) {return true;}
  return false;
}

function GameTick() {
  let ufos = getAll(ufo);
  for (let i = 0; i < ufos.length; i++) {
    if (ufos[i].y == 6) {ufos[i].remove(); break;}
    ufos[i].y += 1;
    if (Touching(ufos[i], getFirst(player))) {GameOver()}
  }
}

function Explode(ufo) {
  let i = 0;
  var SS = setInterval(() => {
    if (i % 2 == 0) {ufo.type = "l"}
    else {getFirst(explosion).remove()}
    i++;
    if (i == 2) {clearInterval(SS);}
  },50) 
}



function lazerTick() {
  let lazers = getAll(lazer);
  let ufos = getAll(ufo);
  for (let i = 0; i < lazers.length; i++) {
    if (lazers[i].y == 0) {lazers[i].remove(); break;}
    lazers[i].y -= 1;
    ufos = getAll(ufo);
    for (let x = 0; x < ufos.length; x++) {
      if (Touching(ufos[x], lazers[i])) {Explode(ufos[x]); lazers[i].remove();ScreenShake();Score += 10;}
    }
  }
}

let Score = 0;
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


function Spawnufo() {
  addSprite(getRandomNumber(0,4),0,ufo);
}

function CheckCollisions() {
  let ufos = getAll(ufo);
  for (let i = 0; i < ufos.length; i++) {
    if (Touching(ufos[i], getFirst(player))) {GameOver();}
  }
}
onInput("a", () => {
  if (InGame) {
  getFirst(player).x -= 1
  CheckCollisions();
  }
})
  
onInput("d", () => {
  if (InGame) {
  getFirst(player).x += 1
  CheckCollisions();
  }
})
onInput("w", () => {
  if (InGame) {
  getFirst(player).y -= 1
  CheckCollisions();
  }
})

onInput("s", () => {
  if (InGame) {
  getFirst(player).y += 1
  CheckCollisions();
  }
})

onInput("j", () => {
  if (InGame == 0) {
  Score = 0;
  InGame = 1;
  clearText();
  setMap(levels[0])
  let Interval = 200;
  let Time = 0;
  var timeLoop = setInterval(() => {
    Interval *= 0.5;
    if (!InGame) {clearInterval(timeLoop);}
    else {
      Time++;
      Spawnufo();
      lazerTick();
      if (Time % 3 == 0) {GameTick();}
    }
  },Interval)
  

  
  
  onInput("i", () => {
  if (InGame && !getTile(getFirst(player).x, getFirst(player).y - 1).includes(lazer)) {
  addSprite(getFirst(player).x, getFirst(player).y - 1, lazer);
  let lazers = getAll(lazer);
  let ufos = getAll(ufo);
  for (let i = 0; i < lazers.length; i++) {
    ufos = getAll(ufo);
    for (let x = 0; x < ufos.length; x++) {
      if (Touching(ufos[x], lazers[i])) {Explode(ufos[x]); lazers[i].remove();ScreenShake();Score += 10}
    }
  }
  }
  })
  }

});
