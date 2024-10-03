/*
@title: SquidsInTheStarts
@author: Lucas4680
@tags: []
@addedOn: 2024-02-11

First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

const background = "d";
const background2 = "f";
const player = "p";
const enemy = "a";
const bullet = "b";
const explosion = "l";

setLegend(
  [ background, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000020000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000200
0000000000000000
0002000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ background2, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000002000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000020
0000000000000000
0000200000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ explosion, bitmap`
.....LLL........
....LLL3L...LLL.
...L6...LLLLL.L.
..L663666HHH66L.
.6666HHH3H.HHLH.
663663666.33336L
.3.336633H33333L
LL6HH6L666333666
.HHH333666H3666L
.66633333HH3LL3L
.36LL33H3HH33H3.
.H6663333333.666
LLLL366LL3H33666
....3LL6633H6LL.
....3LLLH66HLLL.
.....LLL6.......`],
  [ player, bitmap`
................
.......22.......
.......02.......
.......02.......
.......02.......
......2002......
......2002......
..3...2002...3..
..22.200002.22..
.202200LL002202.
.20000000000002.
..200000000002..
...2220000222...
......2222......
................
................` ],
  [ enemy, bitmap`
................
................
................
.......33.......
......3003......
.....30HH03.....
.....30HH03.....
.....30HH03.....
...330HHHH033...
..3030H66H0303..
.30H00HHHH00H03.
.30HHHHHHHHHH03.
.300HHHHHHHH003.
..3300HHHH0033..
....33000033....
......3333......
................`],
  [ bullet, bitmap`
................
................
....3......3....
....3......3....
....3......3....
....3......3....
................
................
................
................
....3......3....
....3......3....
....3......3....
....3......3....
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
addText( "     Press j\n\n   to start!" , {
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
  let list = getAll(enemy);
  for (let i = 0; i < list.length; i++) {list[i].remove();}
  list = getAll(bullet);
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
  let enemies = getAll(enemy);
  for (let i = 0; i < enemies.length; i++) {
    if (enemies[i].y == 6) {enemies[i].remove(); break;}
    enemies[i].y += 1;
    if (Touching(enemies[i], getFirst(player))) {GameOver()}
  }
}

function Explode(enemy) {
  let i = 0;
  var SS = setInterval(() => {
    if (i % 2 == 0) {enemy.type = "l"}
    else {getFirst(explosion).remove()}
    i++;
    if (i == 2) {clearInterval(SS);}
  },50) 
}



function BulletTick() {
  let bullets = getAll(bullet);
  let enemies = getAll(enemy);
  for (let i = 0; i < bullets.length; i++) {
    if (bullets[i].y == 0) {bullets[i].remove(); break;}
    bullets[i].y -= 1;
    enemies = getAll(enemy);
    for (let x = 0; x < enemies.length; x++) {
      if (Touching(enemies[x], bullets[i])) {Explode(enemies[x]); bullets[i].remove();ScreenShake();Score += 10;}
    }
  }
}

let Score = 0;
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};


function SpawnEnemy() {
  addSprite(getRandomNumber(0,4),0,enemy);
}

function CheckCollisions() {
  let enemies = getAll(enemy);
  for (let i = 0; i < enemies.length; i++) {
    if (Touching(enemies[i], getFirst(player))) {GameOver();}
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
      SpawnEnemy();
      BulletTick();
      if (Time % 3 == 0) {GameTick();}
    }
  },Interval)
  

  
  
  onInput("i", () => {
  if (InGame && !getTile(getFirst(player).x, getFirst(player).y - 1).includes(bullet)) {
  addSprite(getFirst(player).x, getFirst(player).y - 1, bullet);
  let bullets = getAll(bullet);
  let enemies = getAll(enemy);
  for (let i = 0; i < bullets.length; i++) {
    enemies = getAll(enemy);
    for (let x = 0; x < enemies.length; x++) {
      if (Touching(enemies[x], bullets[i])) {Explode(enemies[x]); bullets[i].remove();ScreenShake();Score += 10}
    }
  }
  }
  })
  }

});
