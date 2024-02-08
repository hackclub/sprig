const player = "p";
const traffic1blue = "b";
const traffic2green = "g";
const traffic3yellow = "y";
const whiteLine1 = "w";
const whiteLine2 = "d";
const clock0 = "A";
const clock1 = "B";
const clock2 = "C";
const clock3 = "D";
const clock4 = "E";
const clock5 = "F";
const clock6 = "G";
const clock7 = "H";
const clock8 = "I";
const clock9 = "J";
const bush1 = "u";
const bush2 = "k";
const road = map`
kkkkzzdzzdzzuuuuuukkuu
kkkkzzdzzdzzuzzXzzXzzu
kkkkzzdzzdzzkuukukukku
ukukzzdzzdzzuuuuuuuuku
kkukzzdzzdzzuuuuuuuuuk
ukuuzzdzzdzzkuuuuuuukk
uuukzzdzzdzzuukuuukukk
kuuuzzdzzdzzuuuuuuuuuk
uukuzzdzzdzzuukuuukukk
ukuuzzdzzdzzuuuukuukkk
uuuuzzdzzdzzukuuuukukk
uukuzzdzzdzzuuuuuuukkk
kuukzzdzzdzzuuuukuuuuk
kuuuzzdzzdzzkuuuuuukkk
uukuzzdzzdzzuuukuukkkk
uuukzzdzzdzzukuuuuukuk
ukuuzzdzzdzzuuukuukkkk
uuuuzzdzpdzzkuuuuukkkk`;
const youLose = map `
.v...
.nr..
.mxq.
.c...
.....`;
const bigDub = map `
ZZZZZ
ZCEZZ
ZQRSZ
ZZTUZ
ZZZZZ`;
var intID1;
var intID2;
var intID3;
var intID4;
var intID5;
var intID6;
var intID7;
var DigSec;
var DigMin;
var DigHou;
const clockObj = {
  seconds: 0,
  minutes: 0,
  hours: 0,
  secondTick: function () {
  clockObj.seconds += 1
  if (clockObj.seconds<10) {
    DigSec = String(clockObj.seconds).charAt(0)
  } else { DigSec = String(clockObj.seconds).charAt(1)
         }
    if (DigSec == 1) {
      clearTile(20,1)
      addSprite(20,1,"B")
    } else if (DigSec == 2) {
      clearTile(20,1)
      addSprite(20,1,"C")
    } else if (DigSec == 3) {
      clearTile(20,1)
      addSprite(20,1,"D")
    } else if (DigSec == 4) {
      clearTile(20,1)
      addSprite(20,1,"E")
    } else if (DigSec == 5) {
      clearTile(20,1)
      addSprite(20,1,"F")
    } else if (DigSec == 6) {
      clearTile(20,1)
      addSprite(20,1,"G")
    } else if (DigSec == 7) {
      clearTile(20,1)
      addSprite(20,1,"H")
    } else if (DigSec == 8) {
      clearTile(20,1)
      addSprite(20,1,"I")
    } else if (DigSec == 9) {
      clearTile(20,1)
      addSprite(20,1,"J")
    } else {
      clearTile(20,1)
      addSprite(20,1,"A")
    }
    
    if (clockObj.seconds == 10) {
    clearTile(19,1)
    addSprite(19,1,"B")
    clearTile(20,1)
    addSprite(20,1,"A")
  } else if (clockObj.seconds == 20) {
    clearTile(19,1)
    addSprite(19,1,"C")    
  } else if (clockObj.seconds == 30) {
        clearTile(19,1)
    addSprite(19,1,"D")
  } else if (clockObj.seconds == 40) {
        clearTile(19,1)
    addSprite(19,1,"E")
  } else if (clockObj.seconds == 50) {
    clearTile(19,1)
    addSprite(19,1,"F")
  } else if (clockObj.seconds == 60) {
    clockObj.seconds = 0
    clearTile(19,1)
    addSprite(19,1,"A")
    clearTile(20,1)
    addSprite(20,1,"A")
  } 
  },
  minuteTick: function() {
  clockObj.minutes +=1
    if (clockObj.minutes == 60) {
    clockObj.minutes = 0
    }
      if (clockObj.minutes<10) {
    DigMin = String(clockObj.minutes).charAt(0)
  } else { DigSec = String(clockObj.minutes).charAt(1)
         }
        if (DigMin == 1) {
      clearTile(17,1)
      addSprite(17,1,"B")
    } else if (DigMin == 2) {
      clearTile(17,1)
      addSprite(17,1,"C")
    } else if (DigMin == 3) {
      clearTile(17,1)
      addSprite(17,1,"D")
    } else if (DigMin == 4) {
      clearTile(17,1)
      addSprite(17,1,"E")
    } else if (DigMin == 5) {
      clearTile(17,1)
      addSprite(17,1,"F")
    } else if (DigMin == 6) {
      clearTile(17,1)
      addSprite(17,1,"G")
    } else if (DigMin == 7) {
      clearTile(17,1)
      addSprite(17,1,"H")
    } else if (DigMin == 8) {
      clearTile(17,1)
      addSprite(17,1,"I")
    } else if (DigMin == 9) {
      clearTile(17,1)
      addSprite(17,1,"J")
    } else {
      clearTile(17,1)
      addSprite(17,1,"A")
    }
if (clockObj.minutes == 10) {
    clearTile(16,1)
    addSprite(16,1,"B")
    clearTile(17,1)
    addSprite(17,1,"A")
  } else if (clockObj.minutes == 20) {
    clearTile(16,1)
    addSprite(16,1,"C")    
  } else if (clockObj.minutes == 30) {
        clearTile(16,1)
    addSprite(16,1,"D")
  } else if (clockObj.minutes == 40) {
        clearTile(16,1)
    addSprite(16,1,"E")
  } else if (clockObj.minutes == 50) {
    clearTile(16,1)
    addSprite(16,1,"F")
  } else if (clockObj.minutes == 60) {
    clockObj.minutes = 0
  }  
  },
  hourTick: function () {
  clockObj.hours +=1
      if (clockObj.hours<10) {
    DigHou = String(clockObj.hours).charAt(0)
  } else { DigHou = String(clockObj.hours).charAt(1)
         }
        if (DigHou == 1) {
      clearTile(14,1)
      addSprite(14,1,"B")
    } else if (DigHou == 2) {
      clearTile(14,1)
      addSprite(14,1,"C")
    } else if (DigHou == 3) {
      clearTile(14,1)
      addSprite(14,1,"D")
    } else if (DigHou == 4) {
      clearTile(14,1)
      addSprite(14,1,"E")
    } else if (DigHou == 5) {
      clearTile(14,1)
      addSprite(14,1,"F")
    } else if (DigHou == 6) {
      clearTile(14,1)
      addSprite(14,1,"G")
    } else if (DigHou == 7) {
      clearTile(14,1)
      addSprite(14,1,"H")
    } else if (DigHou == 8) {
      clearTile(14,1)
      addSprite(14,1,"I")
    } else if (DigHou == 9) {
      clearTile(14,1)
      addSprite(14,1,"J")
    } else {
      clearTile(14,1)
      addSprite(14,1,"A")
    }
if (clockObj.hours == 10) {
    clearTile(13,1)
    addSprite(13,1,"B")
    clearTile(14,1)
    addSprite(14,1,"A")
  } else if (clockObj.hours == 20) {
    clearTile(13,1)
    addSprite(13,1,"C")    
  } else if (clockObj.hours == 24) {
  winEnd()
  }
  },
  
};
setSolids([player, bush1, bush2])
setLegend(
  [ player, bitmap`
................
................
................
................
.....13331......
......333.......
......303.......
......333.......
.....13331......
................
................
................
................
................
................
................` ],
  [ traffic1blue, bitmap `
................
................
................
................
......15551.....
.......555......
.......505......
.......555......
......15551.....
................
................
................
................
................
................
................`],
  [ traffic2green, bitmap `
................
................
................
................
.....1DDD1......
......DDD.......
......D0D.......
......DDD.......
.....1DDD1......
................
................
................
................
................
................
................`],
  [ traffic3yellow, bitmap `
................
................
................
.....16661......
......666.......
......606.......
......666.......
.....16661......
................
................
................
................
................
................
................
................`],
  [ whiteLine1, bitmap `
0000002200000000
0000002200000000
0000002200000000
0000002200000000
0000002200000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000002200000000
0000002200000000
0000002200000000
0000002200000000
0000002200000000
0000002200000000`],
  [ whiteLine2, bitmap `
0000000022000000
0000000022000000
0000000022000000
0000000022000000
0000000022000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000022000000
0000000022000000
0000000022000000
0000000022000000
0000000022000000
0000000022000000`],
  [clock0, bitmap `
0000003330000000
0000033033300000
0000330000300000
0003300000030000
0003000000033000
0003000000003000
0030000000003000
0030000000003000
0030000000003000
0030000000000300
0030000000000300
0030000000000300
0003000000000300
0000330000003000
0000033000003000
0000003333330000`],
  [clock1, bitmap `
0000033000000000
0000333000000000
0000303000000000
0003003000000000
0003003000000000
0000003000000000
0000003000000000
0000003000000000
0000003000000000
0000003000000000
0000003000000000
0000003000000000
0000003000000000
0000003000000000
0000033333330000
0033333300030000`],
  [clock2, bitmap `
0000000000000000
0033333333000000
0030000003000000
0030000000300000
0030000000300000
0003000000300000
0003300000300000
0000300000300000
0000000000300000
0000000000300000
0000000000300000
0000000003000000
0000000330000000
0000000300000000
0000033000000000
0000033333333333`],
  [clock3, bitmap `
0000000000000000
0000333330000000
0030300003000000
0033000003000000
0030000000300000
0000000003300000
0000000033000000
0000000330000000
0000033333000000
0000000003300000
0000000000330000
0000000000030000
0000000000030000
0033000000330000
0003000033300000
0003333330000000`],
  [clock4, bitmap `
0000003003000000
0000033003000000
0000030003000000
0003300003000000
0333000003000000
0300000003000000
0333333333000000
0000000003000000
0000000003000000
0000000003000000
0000000003000000
0000000003000000
0000000003000000
0000000003000000
0000003333000000
0000033333333333`],
  [clock5, bitmap `
0000333333330000
0000330000030000
0000300000000000
0000300000000000
0000300000000000
0000300000000000
0003300000000000
0003033333000000
0003330003300000
0000000000030000
0000000000030000
0000000000003000
0000000000003000
0003000000033000
0003300000330000
0000333333300000`],
  [clock6, bitmap `
0000000000000000
0000000333330000
0000033300000000
0000030000000000
0000300000000000
0000300000000000
0003300000000000
0003000000000000
0003300000000000
0000303333330000
0000303000033000
0000333000003000
0000330000033000
0000033000330000
0000000333300000
0000000000000000`],
  [clock7, bitmap `
0000000003330000
0000003333330000
0003333300030000
0000000000030000
0000000000300000
0000000000300000
0000000003300000
0000000003300000
0000333333333000
0000000033000000
0000000030000000
0000000330000000
0000000330000000
0000000330000000
0000000330000000
0000003330000000`],
  [clock8, bitmap `
0000033333330000
0000330000333000
0003300000003000
0003000000003000
0003300000003000
0000300000003000
0000333300003000
0000000333003000
0000003333333000
0000033000003300
0000330000000330
0000300000000030
0000300000000030
0000330000000030
0000033300003330
0000000333333000`],
  [clock9, bitmap `
0000033333300000
0000330000300000
0000300000300000
0000300000300000
0000300000300000
0000300000300000
0000330000300000
0000033333300000
0000000003300000
0000000003000000
0000000003000000
0000000003000000
0000000003000000
0000000003300000
0000000003300000
0000000003300000`],
  [ 'z', bitmap `
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
  [ 'Z', bitmap`
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
  [ 'X', bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000330000000
0000000330000000
0000000000000000
0000000000000000
0000000000000000
0000000330000000
0000000330000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ 'n', bitmap `
0...0...........
0...0...........
00.00...........
.000............
..0..0000..0...0
..0.00..00.0...0
..0.0....0.0...0
....0....0.0...0
....0....0.0...0
....0....0.0...0
....0....0.0...0
....0....0.0...0
....00..00.00.00
.....0000...000.
................
................`],
  [ 'r', bitmap `
................
................
................
................
.........00000..
.........0....0.
.........0....0.
.........0....0.
.........00000..
.........000....
.........0.00...
.........0..00..
.........0...00.
.........0....0.
................
................`],
  [ 'v', bitmap `
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
................
................
0...0...........
0...0...........`],
  [ 'l', bitmap `
................
................
................
................
..........00000.
..........0....0
..........0....0
..........0....0
..........00000.
..........000...
..........0.00..
..........0..00.
..........0...00
..........0....0
................
................`],
  [ 'm', bitmap `
................
......000.......
.....0..00......
.....0...0......
.....0..00......
..0000000.......
.....0..........
.....0..........
.....0..........
.....0...000.000
.....0...0...0..
.....0...000.000
.....0...0.....0
.....0...000.000
.....0..........
.....0..........`],
  [ 'c', bitmap `
.....0..........
.....0..........
.....0..........
.00000..........
.0...00.........
.0...000........
.0...0.00.......
.00000..00......
................
................
................
................
................
................
................
................`],
  [ 'x', bitmap `
................
................
................
................
................
................
................
................
................
...0...00...00..
..000.0..0.0..0.
...0..0..0.0..0.
...0..0..0.0..0.
...0...00...00..
................
................`],
  [ 'q', bitmap `
................
................
................
................
..............0.
.0000.........0.
.0...0..0.....0.
.0...0........0.
.0...0..0.....0.
.0...0..0..0000.
.0000...0..0..0.
.0......0..0..0.
.0......0..0000.
.0..............
................
................`],
  [ 'Q', bitmap `
0......0........
0......0........
.0.....0........
.0.....0........
.00....0........
..0....0........
..0...00........
..0..000........
..0000.0........
..00...0....000.
..0....0...00.00
..0.....0.00...0
..0.....0.0....0
..0.....0.0....0
.00.....0.00..00
.0......0..0000.`],
  [ 'R', bitmap `
................
............00..
.........000.0..
........0.....0.
........0.....0.
........0.0...0.
......0.000..0..
..0...0..00..0..
..0...00.00..0..
000...00.00000..
..0...00.000....
..0...0..0.00...
..0...0..0.000..
..00.00..0..000.
...0.0...0...00.
...000...0...000`],
  [ 'S', bitmap `
................
............0000
.000000000000000
.0000000000000..
000.............
0...............
0...............
00000....0000...
000000000000000.
....000000..0000
.............000
..............00
..............00
000000........00
000000000...000.
......00000000..`],
  [ 'T', bitmap `
..........00....
0.........0.....
.0.......00.....
.00......0......
..0......0.0...0
..0......0.0...0
..0.....00.0...0
...0....0..0...0
...0....0..0...0
...0..0.0..0...0
...0..000.000000
...000000.0...0.
....00.00.0...0.
....00.00.0...0.
....00.00.0...0.
.....0..0.0...0.`],
  [ 'U', bitmap `
................
................
........00000...
............0...
............0...
00....0.....0...
.00...0.....0...
..0..0.....0....
..0..0.....0....
..0..0....0.....
...0.0....0.....
....00....0.....
....00....0.....
.....0....0.....
.....0..........
.....0....0.....`],
  [ bush1, bitmap `
DD44DD44FD44FFDD
D4D44DDFF4DF4FFD
D4DFF4DDF4DDD4FF
4D4DFF44FF4FDDF4
4DD44DF44D44FFDF
44DD44FF4DD44DDD
D4FFD44DF4DF444F
DD4FFD44DD4D4444
4D44FDD44DD4FDD4
44F444DDD4DFF4FD
DD44DFFFDD44FF44
4DD44FF4FDD44DFF
F44D4FDFFFFDD4DF
DDF4DDDDF444DDDD
4DDF44FFDDDF4DDD
444DF4DDF4FF44DD`],
  [ bush2, bitmap `
DD443D44FD44FFDD
D4D34DDFF43F4FF3
D4DFF4DDF43DD4FF
4D4DFF44FF4FDDF4
4DD44DF44D44FFDF
44D344FF43D44DDD
D4FF344DF43F444F
3D4FFD44DD4D4444
4D44FDD44DD4FDD4
44F444DDD4DFF4FD
DD44D33FDD44FF44
4DD443F4FDD44DFF
F44D4FDFFFF344DF
D3F4DDDDF4443DD3
4D3F44FFDDDF4DDD
444DF4DDF4FF44DD`]
);

setMap(road);

onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})

function winEnd() {
clearInterval(intID1);
clearInterval(intID2);
clearInterval(intID3);
clearInterval(intID4);
setMap(bigDub)
};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
};

function spriteRemove() {
 var blueCarArray = getAll(traffic1blue);
 var greenCarArray = getAll(traffic2green);
 var yellowCarArray = getAll(traffic3yellow);
 blueCarArray.forEach((car) => {
   if (car.y == 17){
   car.remove();
   }  
 });
 greenCarArray.forEach(car => {
   if (car.y == 17){
   car.remove();
   }
 });
 yellowCarArray.forEach(car => {
   if (car.y == 17){
   car.remove();
   }
 }); 
}

function spriteSpawn() {
  var trafficXCord = getRandomInt(8);
  var trafficGen = getRandomInt(3);
  if (trafficGen === 2) {
    var trafficType = traffic1blue
  } else if (trafficGen === 1) {
    var trafficType = traffic2green
  } else {
    var trafficType = traffic3yellow
  } 
  var trafficXCord2 = trafficXCord+4
  console.log(trafficXCord2);
  addSprite(trafficXCord2,0,trafficType);
};

function spriteMove() {
 var blueTraffic = getAll(traffic1blue);
 var greenTraffic = getAll(traffic2green);
 var yellowTraffic = getAll(traffic3yellow);
 blueTraffic.forEach((car)=> car.y += 1);
 greenTraffic.forEach((car)=> car.y += 1);
 yellowTraffic.forEach((car)=> car.y += 1);
};

function gameEnd() {
clearInterval(intID1);
clearInterval(intID2);
clearInterval(intID3);
clearInterval(intID4);
clearInterval(intID5);
clearInterval(intID6);
setMap(youLose);
};

function spriteCollision() {

var playerBlueCollision = tilesWith(player,traffic1blue).length
var playerGreenCollision = tilesWith(player,traffic2green).length
var playerYellowCollision = tilesWith(player,traffic3yellow).length
  if(playerBlueCollision>0){
    gameEnd()
   
  }
  if(playerGreenCollision>0){
    gameEnd()
 
  }
  if(playerYellowCollision>0){
    gameEnd()
 
  }
  
};

function gameStart(){
intID1 = setInterval(spriteSpawn,2500);
intID2 = setInterval(spriteMove,833);
intID3 = setInterval(spriteRemove,2500);
intID4 = setInterval(spriteCollision,100);
intID5 = setInterval(clockObj.secondTick,1000);
intID6 = setInterval(clockObj.minuteTick,60000);
intID7 = setInterval(clockObj.hourTick,36000000);
addSprite(8,17,'z')
addSprite(13,1,"A")
addSprite(14,1,"A")
addSprite(16,1,"A")
addSprite(17,1,"A")
addSprite(19,1,"A")
}

gameStart()
