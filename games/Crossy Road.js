/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Crossy Road
@author: Bunnzulu
@tags: []
@addedOn: 2024-07-26
*/

const player = "p"
const car = "c"
const Ocar = "o"
const Yellow = "y"
const White = "W"
const Black = "B"
const Wall = "w"
const Blue = "b"
const Cloud = "C"
const Bluecar = "a"
var GameStarted = false
var Score = 0
var HighScore = 0
var gameLoop;
var playback;
const Theme = tune`
187.5: B5^187.5,
187.5: C4~187.5,
187.5: A5~187.5,
187.5: D5~187.5,
187.5: G5^187.5,
187.5: G5/187.5 + B4/187.5,
187.5: G5/187.5 + F5/187.5,
187.5: F5/187.5 + G5/187.5 + B4/187.5,
187.5: E5-187.5,
187.5: B4~187.5,
187.5: B4~187.5 + D5~187.5 + E5~187.5 + A5~187.5,
187.5: A4-187.5,
187.5: A4-187.5,
187.5: A4-187.5,
187.5: G5/187.5 + D5^187.5,
187.5: A5/187.5 + C5^187.5,
187.5: B5/187.5 + B4^187.5,
187.5: A5/187.5 + C5^187.5,
187.5: G5/187.5 + D5^187.5 + F4~187.5,
187.5: F4~187.5,
187.5: E4-187.5 + D4-187.5 + C4-187.5 + F4~187.5,
187.5: G4~187.5,
187.5: G5-187.5,
187.5: G5-187.5,
187.5: F5-187.5,
187.5: E5^187.5,
187.5: F5-187.5,
187.5: G5-187.5,
187.5: G5-187.5,
187.5: G5-187.5 + A5-187.5,
187.5: F5^187.5,
187.5: G5~187.5 + C4/187.5`

setLegend(
  [player, bitmap`
................
................
................
................
................
................
......222.......
.....202022.....
....22222333....
...222222222....
..22222222222...
..22222222222...
.....6....6.....
.....6....6.....
.....6....6.....
.....6....6.....`],
  [car, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000330000000
0000033333300000
0000337777330000
0000337777330000
0003333333333000
0033333333333300
0033333333333300
0000LL0000LL0000
0000LL0000LL0000`],
  [Ocar, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000440000000
0000044444400000
0000447777440000
0000447777440000
0004444444444000
0044444444444400
0044444444444400
0000LL0000LL0000
0000LL0000LL0000`],
  [Black, bitmap`
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
  [Yellow, bitmap`
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
  [White, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [Wall, bitmap`
3333333333333333
3333333333333333
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
3333333333333333
3333333333333333
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
3333333333333333
3333333333333333
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
3333333333333333
3333333333333333
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [Blue, bitmap`
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
  [Cloud, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777772222777777
7777222222227777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [Bluecar, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777337777777
7777733333377777
7777337777337777
7777337777337777
7773333333333777
7733333333333377
7733333333333377
7777LL7777LL7777
7777LL7777LL7777`]
)

setSolids([Wall, car])

StartScreen = map`
bCbCbby
CbCbCbC
bCbCbCb
bbababb
BBBBBBB`
MainGame = map`
wyyyyyyw
wBcBBBBw
wBBBoBBw
wyyyyyyw
wBBcBBBw
wBBBBBBw
wyyyypyw`

setMap(StartScreen)

setBackground(Black)

addText("Press i to Play", options = { x: 1, y: 5, color: color`3` })
onInput("i", () => {
  if (!GameStarted) {
    GameStarted = true
    onInput("s", () => {
      getFirst(player).y += 1
    })
    onInput("w", () => {
      getFirst(player).y -= 1
    })
    onInput("a", () => {
      getFirst(player).x -= 1
    })
    onInput("d", () => {
      getFirst(player).x += 1
    })
    onInput("j", () => {
      playback = playTune(Theme, Infinity)
    })
    onInput("l", () => {
      playback.end()
    })
    setMap(MainGame)
    clearText()
    Main_Loop(1000)
  }
})

function Player_Spawn() {
  getFirst(player).x = 3
  getFirst(player).y = 6
}

function Collision() {
  if (tilesWith(car, player).length > 0 || tilesWith(Ocar, player).length > 0) {
    Player_Spawn()
    Score = 0
    Main_Loop(1000)
    clearText()
  };
}


function Move_RedCars(Steps) {
  for (let i = 0; i < getAll(car).length; i++) {
    dcar = getAll(car)[i]
    dcar.x += Steps
    Collision()
    if (dcar.x >= 6) {
      dcar.x = 1
    }
  }
}

function Move_GreenCar(Steps) {
  getFirst(Ocar).x -= Steps
  Collision()
  if (getFirst(Ocar).x === 1) {
    getFirst(Ocar).x = 6
  };
};


function Main_Loop(time) {
  clearInterval(gameLoop);
  gameLoop = setInterval(() => {
    Move_RedCars(1);
    Move_GreenCar(1);
    Collision();
  }, time);
}

function GettingPoints() {
  if (getFirst(player).y === 0) {
    Player_Spawn()
    Score++
    if (Score === 5) {
      Main_Loop(500)
    }
    if (Score === 10) {
      Main_Loop(250)
    }
    if (Score === 20) {
      Main_Loop(100)
    }
    if (Score > HighScore) {
      HighScore = Score
    }
    clearText()
    addText(`Score:${Score}`, options = { x: 1, y: 0, color: color`2` })
    addText(`HighScore:${HighScore}`, options = { x: 1, y: 12, color: color`2` })

  }
}

afterInput(() => {
  Collision();
  GettingPoints();
})
