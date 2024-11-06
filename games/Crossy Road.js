/*
@title: Crossy Road
@author: Bunnzulu
@tags: ["retro" , "timed" , "puzzle"]
@addedOn: 2024-07-26
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p"
const RedCar = "c"
const GreenCar = "g"
const Bluecar = "a"
const PurpleCar = "P"
const Yellow = "y"
const White = "W"
const Black = "B"
const Wall = "w"
const Blue = "b"
const Cloud = "C"
const TitleCar = "t"
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
  [RedCar, bitmap`
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
  [GreenCar, bitmap`
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
  [Bluecar, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000550000000
0000055555500000
0000550000550000
0000550000550000
0005555555555000
0055555555555500
0055555555555500
0000LL0000LL0000
0000LL0000LL0000`],
  [PurpleCar, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000HH0000000
00000HHHHHH00000
0000HH7777HH0000
0000HH7777HH0000
000HHHHHHHHHH000
00HHHHHHHHHHHH00
00HHHHHHHHHHHH00
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
  [TitleCar, bitmap`
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
7777LL7777LL7777`],
)

setSolids([Wall])

StartScreen = map`
bCbCbby
CbCbCbC
bCbCbCb
bbtbtbb
BBBBBBB`
MainGame = map`
wyyyyyyw
wBcBBBBw
wBBBgBBw
wyyyyyyw
wBBcBBBw
wBBBBBBw
wyyyypyw
wyyyyyyw`
ExtraGame = map`
wyyyyyyw
wyyyyyyw
wBBaBBBw
wBBBBcBw
wBPBBBBw
wBBBBgBw
wBBaBBBw
wyyyyyyw
wBBBaBBw
wBPBBBBw
wyyyyyyw
wBBaBBBw
wBBBBBBw
wyyyypyw
wyyyyyyw`
StageIndex = 1

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
     getFirst(player).y -= 2
    })
    setMap(MainGame)
    StageIndex = 1
    clearText()
    Main_Loop(1000)
  }
})

function Player_Spawn(pos) {
  getFirst(player).x = pos[0]
  getFirst(player).y = pos[1]
}

function Collision() {
  if (tilesWith(RedCar, player).length > 0 || tilesWith(GreenCar, player).length > 0) {
    if (StageIndex < 2){ 
      Player_Spawn([3,6])
    } else {
      Player_Spawn([3,13])
    }
} }

function Collision2(){
  if (tilesWith(Bluecar, player).length > 0 || tilesWith(PurpleCar, player).length > 0) {
    if (StageIndex < 2){ 
      Player_Spawn([3,6])
    } else {
      Player_Spawn([3,13])
    }
    Score = 0
    Main_Loop(1000)
    clearText()
  };
}

function SpawnCars(spawnpos,cars) {
  addSprite(spawnpos[0],spawnpos[1],cars[Math.floor(Math.random() * cars.length)])
}

function RandomCars(){
  if (Math.floor(Math.random() * 3) == 2){
      SpawnCars([6,dcar.y],[GreenCar])
      } else if (Math.floor(Math.random() * 3) == 1){
        SpawnCars([1,dcar.y],[RedCar,Bluecar])
      } else {
        if (Math.floor(Math.random() * 2) == 1){
          SpawnCars([2,dcar.y],[PurpleCar])
        } else {
          SpawnCars([5,dcar.y],[PurpleCar])
        }
      }
}

function Move_RedCars(Steps) {
  for (let i = 0; i < getAll(RedCar).length; i++) {
    dcar = getAll(RedCar)[i]
    dcar.x += Steps
    Collision()
    if (dcar.x >= 6) {
      RandomCars()
      dcar.remove()
    }
  }
}

function Move_BlueCars(Steps) {
  for (let i = 0; i < getAll(Bluecar).length; i++) {
    dcar = getAll(Bluecar)[i]
    dcar.x += Steps
    Collision2()
    if (dcar.x >= 6) {
      RandomCars()
      dcar.remove()
    }
  }
}

function Move_GreenCar(Steps) {
  for (let i = 0; i < getAll(GreenCar).length; i++) {
    dcar = getAll(GreenCar)[i]
    dcar.x -= Steps
    Collision()
    if (dcar.x <= 1) {
      RandomCars()
      dcar.remove()
    }
  }
};

function Move_PurpleCars(Steps) {
  for (let i = 0; i < getAll(PurpleCar).length; i++) {
    dcar = getAll(PurpleCar)[i]
    if (Math.floor(Math.random() * 2) == 1){
      dcar.x += Steps
    } else {
      dcar.x -= Steps
    }
    Collision2()
    if (dcar.x >= 6 || dcar.x <= 1) {
      RandomCars()
      dcar.remove()
    }
  }
}


function Main_Loop(time) {
  clearInterval(gameLoop);
  gameLoop = setInterval(() => {
    Move_RedCars(1);
    Move_GreenCar(1);
    Move_BlueCars(2);
    Move_PurpleCars(Math.floor(Math.random() * 3));
    Collision();
    Collision2();
  }, time);
}

function GettingPoints() {
  if (getFirst(player).y === 0) {
    if (StageIndex < 2){ 
      Player_Spawn([3,6])
    } else {
      Player_Spawn([3,13])
    }
    Score++
    if (Score === 5) {
      Main_Loop(750)
    }
    if (Score === 10) {
      Main_Loop(500)
    }
    if (Score === 20) {
      Main_Loop(300)
    }
    if (Score === 25 && StageIndex < 2) {
      setMap(ExtraGame)
      StageIndex = 2
      Player_Spawn([3,13])
    }
    if (Score > HighScore) {
      HighScore = Score
    }
    clearText()
    if (StageIndex < 2){
      addText(`Score:${Score}`, options = { x: 1, y: 0, color: color`2` })
      addText(`HighScore:${HighScore}`, options = { x: 1, y: 12, color: color`2` })
    } else {
      addText(`Score:${Score}`, options = { x: 1, y: 0, color: color`2` })
      addText(`HighScore:${HighScore}`, options = { x: 1, y: 13, color: color`2` })
    }
  }
}

afterInput(() => {
  Collision();
  Collision2();
  GettingPoints();
})
