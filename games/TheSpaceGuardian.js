/*
@title: TheSpaceGuardian
@author: Adrian DeGendt
@tags: []
@addedOn: 2024-07-22

First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

const background = "d";
const background2 = "f";
const player = "p";
const ufo = "a";
const ufoFast = "c";
const ufoShooter = "e";
const bossUfo = "g";
const lazer = "b";
const enemyLazer = "n";
const explosion = "l";
const powerUp = "x";
const specialLazer = "y";
const shield = "s";

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
  [ ufoFast, bitmap`
................
................
.....44..44.....
....4444444.....
...444444444....
..L444444444L...
.LLLLLLLLLLLLL..
...L4LLLL4L.....
....LLLLLLLL....
.....LLLLLL.....
......LLLL......
.......LL.......
................
................
................`],
  [ ufoShooter, bitmap`
................
................
................
................
.......55.......
......5555......
.....555555.....
....L555555L....
...LLLLLLLLLL...
....L5LLLL5L....
.....LLLLLL.....
......LLLL......
.......LL.......
................
................
................`],
  [ bossUfo, bitmap`
................
................
......777777....
.....77777777...
....7777777777..
...777777777777.
..L777777777777L
.LLLLLLLLLLLLLLL
...L7LLLLLLLLL..
....LLLLLLLLLL..
.....LLLLLLLL...
......LLLLLL....
.......LLLL.....
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
................`],
  [ specialLazer, bitmap`
................
................
....2......2....
....2......2....
....2......2....
....2......2....
................
................
................
................
....2......2....
....2......2....
....2......2....
....2......2....
................
................`],
  [ enemyLazer, bitmap`
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
................`],
  [ powerUp, bitmap`
................
.......99.......
......9999......
.....999999.....
.....999999.....
.....999999.....
.....999999.....
......9999......
.......99.......
................
................
................
................
................
................
................`],
  [ shield, bitmap`
................
.....333333.....
....33333333....
...3333333333...
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
...3333333333...
....33333333....
.....333333.....
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
addText( "     Press k\n\n   to begin!" , {
      x: 2,
      y: 3,
      color: color`2`
    })

setMap(levels[1])
  
setPushables({
  [ player ]: []
})

let InGame = 0;
let lives = 3;
let hasShield = false;
let fireRate = 1;
let specialAmmo = 3;
let scoreMultiplier = 1;
let bossAppeared = false;
let highScore = 0;

function GameOver() {
  InGame = 0;
  let list = getAll(ufo).concat(getAll(ufoFast)).concat(getAll(ufoShooter)).concat(getAll(bossUfo));
  for (let i = 0; i < list.length; i++) {list[i].remove();}
  list = getAll(lazer).concat(getAll(enemyLazer)).concat(getAll(specialLazer));
  for (let i = 0; i < list.length; i++) {list[i].remove();}
  getFirst(player).remove();
  setMap(levels[1]);
  if (Score > highScore) {
    highScore = Score;
    addText( "New High Score!" , {
        x: 2,
        y: 2,
        color: color`2`
    })
  }
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
  addText( "High Score: \n  " + highScore , {
      x: 5,
      y: 7,
      color: color`2`
  })
  addText( "Press k to \nplay again!" , {
      x: 5,
      y: 10,
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
  let ufos = getAll(ufo).concat(getAll(ufoFast)).concat(getAll(ufoShooter)).concat(getAll(bossUfo));
  for (let i = 0; i < ufos.length; i++) {
    if (ufos[i].y == 6) {GameOver(); return;}  // Lose if a ufo reaches the bottom
    ufos[i].y += ufos[i].type === "c" ? 2 : 1;
    if (Touching(ufos[i], getFirst(player))) {LoseLife()}
  }
  // UFOs shoot back
  let shooters = getAll(ufoShooter).concat(getAll(bossUfo));
  for (let i = 0; i < shooters.length; i++) {
    if (Math.random() < 0.1) {
      addSprite(shooters[i].x, shooters[i].y + 1, enemyLazer);
    }
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
  let lazers = getAll(lazer).concat(getAll(specialLazer));
  let ufos = getAll(ufo).concat(getAll(ufoFast)).concat(getAll(ufoShooter)).concat(getAll(bossUfo));
  for (let i = 0; i < lazers.length; i++) {
    if (lazers[i].y == 0) {lazers[i].remove(); break;}
    lazers[i].y -= 1;
    ufos = getAll(ufo).concat(getAll(ufoFast)).concat(getAll(ufoShooter)).concat(getAll(bossUfo));
    for (let x = 0; x < ufos.length; x++) {
      if (Touching(ufos[x], lazers[i])) {Explode(ufos[x]); lazers[i].remove();ScreenShake();Score += 10 * scoreMultiplier;}
    }
  }
  // Enemy lazer movement
  let enemyLazers = getAll(enemyLazer);
  for (let i = 0; i < enemyLazers.length; i++) {
    if (enemyLazers[i].y == 6) {enemyLazers[i].remove(); break;}
    enemyLazers[i].y += 1;
    if (Touching(enemyLazers[i], getFirst(player))) {LoseLife(); enemyLazers[i].remove();}
  }
}

function PowerUpTick() {
  let powerUps = getAll(powerUp);
  for (let i = 0; i < powerUps.length; i++) {
    if (Touching(powerUps[i], getFirst(player))) {
      powerUps[i].remove();
      applyPowerUp();
    }
  }
}

function applyPowerUp() {
  const powerUpType = getRandomNumber(1, 3);
  switch (powerUpType) {
    case 1:
      hasShield = true;
      addSprite(getFirst(player).x, getFirst(player).y, shield);
      setTimeout(() => {
        hasShield = false;
        getFirst(shield).remove();
      }, 10000);
      break;
    case 2:
      fireRate = 2;
      setTimeout(() => {
        fireRate = 1;
      }, 10000);
      break;
    case 3:
      specialAmmo += 3;
      break;
  }
}

let Score = 0;
const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function Spawnufo() {
  const ufoType = Math.random();
  if (ufoType < 0.5) {
    addSprite(getRandomNumber(0,4),0,ufo);
  } else if (ufoType < 0.75) {
    addSprite(getRandomNumber(0,4),0,ufoFast);
  } else {
    addSprite(getRandomNumber(0,4),0,ufoShooter);
  }
  // Spawn power-ups
  if (Math.random() < 0.1) {
    addSprite(getRandomNumber(0, 4), 0, powerUp);
  }
  // Boss UFO appears at score 100
  if (!bossAppeared && Score >= 100) {
    addSprite(getRandomNumber(0, 4), 0, bossUfo);
    bossAppeared = true;
  }
}

function CheckCollisions() {
  let ufos = getAll(ufo).concat(getAll(ufoFast)).concat(getAll(ufoShooter)).concat(getAll(bossUfo));
  for (let i = 0; i < ufos.length; i++) {
    if (Touching(ufos[i], getFirst(player))) {LoseLife();}
  }
}

function LoseLife() {
  if (hasShield) {
    hasShield = false;
    getFirst(shield).remove();
  } else {
    lives -= 1;
    if (lives <= 0) {
      GameOver();
    } else {
      ScreenShake();
    }
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

onInput("k", () => {
  if (InGame == 0) {
    Score = 0;
    lives = 3;
    specialAmmo = 3;
    scoreMultiplier = 1;
    bossAppeared = false;
    InGame = 1;
    clearText();
    setMap(levels[0])
    let Interval = 200;
    let Time = 0;
    var timeLoop = setInterval(() => {
      Interval *= 0.99;
      if (!InGame) {clearInterval(timeLoop);}
      else {
        Time++;
        Spawnufo();
        lazerTick();
        PowerUpTick();
        if (Time % 3 == 0) {GameTick();}
      }
    },Interval)
    
    onInput("i", () => {
      if (InGame && !getTile(getFirst(player).x, getFirst(player).y - 1).includes(lazer)) {
        for (let j = 0; j < fireRate; j++) {
          addSprite(getFirst(player).x, getFirst(player).y - 1, lazer);
        }
        let lazers = getAll(lazer).concat(getAll(specialLazer));
        let ufos = getAll(ufo).concat(getAll(ufoFast)).concat(getAll(ufoShooter)).concat(getAll(bossUfo));
        for (let i = 0; i < lazers.length; i++) {
          ufos = getAll(ufo).concat(getAll(ufoFast)).concat(getAll(ufoShooter)).concat(getAll(bossUfo));
          for (let x = 0; x < ufos.length; x++) {
            if (Touching(ufos[x], lazers[i])) {Explode(ufos[x]); lazers[i].remove();ScreenShake();Score += 10 * scoreMultiplier}
          }
        }
      }
    })

    onInput("o", () => {
      if (InGame && specialAmmo > 0 && !getTile(getFirst(player).x, getFirst(player).y - 1).includes(specialLazer)) {
        addSprite(getFirst(player).x, getFirst(player).y - 1, specialLazer);
        specialAmmo -= 1;
        let lazers = getAll(lazer).concat(getAll(specialLazer));
        let ufos = getAll(ufo).concat(getAll(ufoFast)).concat(getAll(ufoShooter)).concat(getAll(bossUfo));
        for (let i = 0; i < lazers.length; i++) {
          ufos = getAll(ufo).concat(getAll(ufoFast)).concat(getAll(ufoShooter)).concat(getAll(bossUfo));
          for (let x = 0; x < ufos.length; x++) {
            if (Touching(ufos[x], lazers[i])) {Explode(ufos[x]); lazers[i].remove();ScreenShake();Score += 20 * scoreMultiplier}
          }
        }
      }
    })
  }
});
