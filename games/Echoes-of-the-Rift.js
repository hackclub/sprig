                                                                              /*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Echoes of the Rift
@author: None
@description: None
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const missingTexture = "P"
const metalFloorLarge_Future = "F"
const pillar = "G"
const path = "@"
const metalFloor = "m"
const metalFloorLarge ="M"
const teleporter = "t"
const transporter = "T"
const bricksUp = "<"
const bricksDown = ">"
const vinePast = "z"
const vineFuture = "x"
const black = "B"
const brickBroken = "b"
const brokenFloor = "f"
const cube = "C"
const button = "U"
const doorDown = "D"
const doorUp = "d"
const doorDownOpen = "O"
const doorUpOpen = "o"
const wall = "X"
const teleporterBroken = "h"


const melody = tune`
333.3333333333333: B4^333.3333333333333,
333.3333333333333: D5^333.3333333333333,
333.3333333333333: F5^333.3333333333333,
333.3333333333333: D5^333.3333333333333 + A4~333.3333333333333,
333.3333333333333: A4^333.3333333333333,
333.3333333333333: C5^333.3333333333333,
333.3333333333333: E5^333.3333333333333,
333.3333333333333: C5^333.3333333333333 + G4~333.3333333333333,
333.3333333333333: G4^333.3333333333333,
333.3333333333333: B4^333.3333333333333,
333.3333333333333: D5^333.3333333333333,
333.3333333333333: B4^333.3333333333333 + F4~333.3333333333333,
333.3333333333333: F4^333.3333333333333,
333.3333333333333: A4^333.3333333333333,
333.3333333333333: C5^333.3333333333333,
333.3333333333333: A4^333.3333333333333 + F4~333.3333333333333,
333.3333333333333: F4^333.3333333333333,
333.3333333333333: F4^333.3333333333333 + C4~333.3333333333333,
333.3333333333333,
333.3333333333333: F4^333.3333333333333,
333.3333333333333: F4^333.3333333333333 + C4~333.3333333333333,
1333.3333333333333,
333.3333333333333: F4^333.3333333333333,
333.3333333333333: F4^333.3333333333333 + C4~333.3333333333333,
333.3333333333333,
333.3333333333333: F4^333.3333333333333,
333.3333333333333: F4^333.3333333333333 + C4~333.3333333333333,
333.3333333333333: A4^333.3333333333333,
333.3333333333333: C5^333.3333333333333 + G4~333.3333333333333`
const playback = playTune(melody, Infinity)

const blockMove = tune`
500: D4^500,
15500`

present = true;

setLegend(
  [ doorDown, bitmap`
................
................
................
0000000000000000
011L3L1111L3L110
0111L3L11L3L1110
01111L3LL3L11110
011111L33L111110
011111L33L111110
01111L3LL3L11110
0111L3L11L3L1110
011L3L1111L3L110
0000000000000000
................
................
................` ],
  [ doorUp, bitmap`
...0000000000...
...0111111110...
...0111111110...
...0L111111L0...
...03L1111L30...
...0L3L11L3L0...
...01L3LL3L10...
...011L33L110...
...011L33L110...
...01L3LL3L10...
...0L3L11L3L0...
...03L1111L30...
...0L111111L0...
...0111111110...
...0111111110...
...0000000000...` ],
  [ doorDownOpen, bitmap`
................
................
................
0000000000000000
01111111111L4L10
0111111111L4L110
011111111L4L1110
01111111L4L11110
011L111L4L111110
01L4L1L4L1111110
011L4L4L11111110
0111L4L111111110
0000000000000000
................
................
................` ],
  [ doorUpOpen, bitmap`
...0000000000...
...0111111110...
...0L11111110...
...04L1111110...
...0L4L111110...
...01L4L11110...
...011L4L1110...
...0111L4L110...
...01111L4L10...
...011111L4L0...
...0111111L40...
...011111L4L0...
...01111L4L10...
...011111L110...
...0111111110...
...0000000000...` ],
  [ player, bitmap`
................
......00CC......
....0022C200....
...02223322C0...
..022223322C20..
.022CC222222220.
.0222222C222220.
.00022222C22000.
.07700222200770.
..077700007770..
..055777777550..
..077555555770..
..077777777770..
..055777777550..
...0055555500...
.....000000.....` ],
  [ cube, bitmap`
..000000000000..
.01111111111110.
011LLL2222LLL110
01LLL222222LLL10
01LL2HH22HH2LL10
01L2H88HH88H2L10
012H88888888H210
012H88888888H210
0122H888888H2210
01222H8888H22210
01L222H88H222L10
01LL222HH222LL10
01LLL222222LLL10
011LLL2222LLL110
.01111111111110.
..000000000000..` ],
  [ missingTexture, bitmap`
00000000HHHHHHHH
00000000HHHHHHHH
00000000HHHHHHHH
00000000HHHHHHHH
00000000HHHHHHHH
00000000HHHHHHHH
00000000HHHHHHHH
00000000HHHHHHHH
HHHHHHHH00000000
HHHHHHHH00000000
HHHHHHHH00000000
HHHHHHHH00000000
HHHHHHHH00000000
HHHHHHHH00000000
HHHHHHHH00000000
HHHHHHHH00000000` ],
  [ metalFloorLarge_Future, bitmap`
LLLLLLLL11L11111
1LLLLLLL111LL111
L111LL11L111L11L
LLLL11LL1LLLLLL1
LL111LLL11111L11
L11LL1LL11111L11
1LLLL1LL1LLLL111
LLLLLL1LL111L111
111111L1LLLL1LLL
LL11LL11LLL1LLLL
11LL1111LLL1LL11
1111LLL1LL1L11LL
1111L11L11LLL1LL
L11L1L11LLLL1L1L
1LL11L11LL11LLL1
1111L111LL1LLLLL` ],
  [ pillar, bitmap`
LLLL777777771111
LLL7777777777111
LL77777777777711
L777777777777771
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
177777777777777L
11777777777777LL
1117777777777LLL
111177777777LLLL` ],
  [ metalFloor, bitmap`
LLLL1111LLLL1111
LLLL1111LLLL1111
LLLL1111LLLL1111
LLLL1111LLLL1111
1111LLLL1111LLLL
1111LLLL1111LLLL
1111LLLL1111LLLL
1111LLLL1111LLLL
LLLL1111LLLL1111
LLLL1111LLLL1111
LLLL1111LLLL1111
LLLL1111LLLL1111
1111LLLL1111LLLL
1111LLLL1111LLLL
1111LLLL1111LLLL
1111LLLL1111LLLL` ],
  [ teleporter, bitmap`
L11111111111111L
133LLLLLLLLLL331
131LL444444LL131
1LL4444444444LL1
1LL44DDDDDD44LL1
1L44DD4444DD44L1
1L44D444444D44L1
1L44D44DD44D44L1
1L44D44DD44D44L1
1L44D444444D44L1
1L44DD4444DD44L1
1LL44DDDDDD44LL1
1LL4444444444LL1
131LL444444LL131
133LLLLLLLLLL331
L11111111111111L` ],
  [ teleporterBroken, bitmap`
L11111111111111L
133LLLLLLLLLL331
131LL333333LL131
1LL3333333333LL1
1LL3399999933LL1
1L339933339933L1
1L339333333933L1
1L339339933933L1
1L339339933933L1
1L339333333933L1
1L339933339933L1
1LL3399999933LL1
1LL3333333333LL1
131LL333333LL131
133LLLLLLLLLL331
L11111111111111L` ],
  [ transporter, bitmap`
L11111111111111L
133LLLLLLLLLL331
131LL777777LL131
1LL7777777777LL1
1LL7755555577LL1
1L775577775577L1
1L775777777577L1
1L775775577577L1
1L775775577577L1
1L775777777577L1
1L775577775577L1
1LL7755555577LL1
1LL7777777777LL1
131LL777777LL131
133LLLLLLLLLL331
L11111111111111L` ],
  [ metalFloorLarge, bitmap`
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL` ],
  [ bricksUp, bitmap`
LLLLLL33C3111111
LLLLLL33C3111111
LLLLLL33C3111111
LLLLLLCCCC111111
LLLLLL3C33111111
LLLLLL3C33111111
LLLLLL3C33111111
LLLLLLCCCC111111
11111133C3LLLLLL
11111133C3LLLLLL
11111133C3LLLLLL
111111CCCCLLLLLL
1111113C33LLLLLL
1111113C33LLLLLL
1111113C33LLLLLL
111111CCCCLLLLLL` ],
  [ bricksDown, bitmap`
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
333C333C333C333C
CCCC333CCCCC333C
333CCCCC333CCCCC
333C333C333C333C
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL` ],
  [ brickBroken, bitmap`
LLLLLLL1L1111111
LLLLL11L11111111
11LLLLLL11L111LL
LLLLLLLL11L111L1
LLLLLLLL111L11L1
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
11111111LLLLLLLL
11111111LLLLLLLL
111111LL1LLLLLLL
11111111LLLLLLLL
111LL111LLLLLLLL
11111111LLLLLLL1
L1111111LLLLLL1L
L1111111LLLLLL1L` ],
  [ brokenFloor, bitmap`
LLLLLLL1L1111111
LLLLL11L11111111
11LL33CL13L113LL
LL3133CL1C311CL1
LLCC33CL111L1CL1
1LCL33CL111CC111
LLLLL11L11333111
LLLLLLLL11111111
11111111LL333LLL
11111331LL333LLL
1L31133L111CCLLL
13311331LLLLL33L
1CCLL331LLLLL33C
11111111L33LL33C
L1111111LC3CL1CC
L11L111L1LLLLL1L` ],
  [ vinePast, bitmap`
LLLLLLLL11111111
LLLLLLL311111111
LLLLLL3631111111
LLLD4CC3CC3D1111
LLLC3F4DF363C111
LLL363D4F43FC111
LLLL344FDFFC1111
LLLLCDCCC4CC1111
1111C4CCCD4CLLLL
1111CCCCCCCCLLLL
1111CCCCCCCCLLLL
1111CCCCCCCCLLLL
11111CCCCCCLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL` ],
  [ vineFuture, bitmap`
LLLD4LLL11111111
LLD4L44L11311141
LLD3LL4413634411
LD363LDD14311441
LDL3DLDD444D1141
DDLDDLD3144DD414
DDLDLD3634111D44
D4DLLD434444DDD4
14D1D4444DD3D4D4
1DD3D4DD4C36344L
DD363CCCCCC3LLLL
D44314C4CC4LL4LL
1D1D44444DDDDD4L
DDDD1CCDL44LLDD4
1D1D11CD44LLLLL4
111D11144LLLLLLL` ],
  [ path, bitmap`
4DLLLLLLLLLLLLD4
4L111111111111LD
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
DL111111111111L4
44LLLLLLLLLLLLD4` ],
  [ button, bitmap`
H3LLLLLLLLLLLL3H
3LL1111111111LL3
LL111111111111LL
L111HHHHHHHH111L
L11H88888888H11L
L11H88888888H11L
L11H88888888H11L
L11H88888888H11L
L11H88888888H11L
L11H88888888H11L
L11H88888888H11L
L11H88888888H11L
L111HHHHHHHH111L
LL111111111111LL
3LL1111111111LL3
H3LLLLLLLLLLLL3H` ],
  [ wall, bitmap`
1LLLLLLLLLLLLLL1
L11111111111111L
L11LLLLLLLLLL11L
L1L1LLLLLLLL1L1L
L1LL1LLLLLL1LL1L
L1LLL1LLLL1LLL1L
L1LLLL1LL1LLLL1L
L1LLLLL11LLLLL1L
L1LLLLL11LLLLL1L
L1LLLL1LL1LLLL1L
L1LLL1LLLL1LLL1L
L1LL1LLLLLL1LL1L
L1L1LLLLLLLL1L1L
L11LLLLLLLLLL11L
L11111111111111L
1LLLLLLLLLLLLLL1` ],
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
0000000000000000` ]
  
)

setSolids([player, missingTexture, bricksDown, bricksUp, vineFuture, cube, doorDown, doorUp, wall])

levelIndecator = 0
let level = 0
const levels = [
  map`
mmmmmmmmmmm
mmtmtmtmtmm
mmmmmmmmmmm
mmmmmmmmmmm
XXXXmmmXXXX
mmmmmmmmmmm
mmmmmTmmmmm
mmmmmmmmmmm`,
  map`
MMMMMMMMM
MMMMMXXXX
MMMMM<MMM
TMMMM<MMt
MMMMM<MMM
MMMMMXXXX
MMMMMMMMM`,
  map`
bbbbbbbbb
bbbbbXXXX
bbbbbfbbb
hbbbbfbbh
bbbbbfbbb
bbbbbXXXX
bbbbbbbbb`,
  map`
...XMMMMM
...XMtMMM
...XMMMMM
XXXXXXzzz
MMM<MMMMM
MTM<MMMMM
MMM<MMMMM`,
  map`
...Xbbbbb
...Xbhbbb
...Xbbbbb
XXXXXXxxx
bbbfbbbbb
bhbfbbbbb
bbbfbbbbb`,
  map`
MMMMMMMMM
MMMMMMMUM
MMMMMMMMM
MTMMMXXXX
MMMMMXMMM
MMMMMMMtM
MMMMMXMMM`,
  map`
bbbbbbbbb
bbbbbbbUb
bbbbbbbbb
bhbbbXXXX
bbbbbXbbb
bbbbbbbhb
bbbbbXbbb`,
  map`
MMM<MMMMM
MMM<MMMUM
MMMXMMMMM
MMMXXXXMX
MMMXMMzMM
MTMXtMzMM
MMMXMMzMM`,
  map`
bbbfbbbbb
bbbfbbbUb
bbbXbbbbb
bbbXXXXbX
bbbXbbxbb
bhbXhbxbb
bbbXbbxbb`
]

setMap(levels[level])

playerX = 0
playerY = 0

isPulling = false;

doorOpen = false

doorX = 0
doorY = 0

doorState = 0

cubeX = 4
cubeY = 1

cubePos = ""
addSprite(5, 6, player)

setPushables({
  [ player ]: [cube]
})


onInput("k", () => {
  clearText();
  if (isPulling === false){
    isPulling = true;
  } else {
    isPulling = false;
  }
  console.log("Is Pulling: ", isPulling)
});


//movement and pulling of the cubes
onInput("s", () => {
  if (isPulling && getFirst(player).y - 1 === getFirst(cube).y && getFirst(player).x === getFirst(cube).x) {
    getFirst(player).y += 1;
    getFirst(cube).y += 1;
  } else {
    getFirst(player).y += 1;
  }
});

onInput("w", () => {
  if (isPulling && getFirst(player).y + 1 === getFirst(cube).y && getFirst(player).x === getFirst(cube).x) {
    getFirst(player).y -= 1;
    getFirst(cube).y -= 1;
  } else {
    getFirst(player).y -= 1;
  }
});

onInput("a", () => {
  if (isPulling && getFirst(player).x + 1 === getFirst(cube).x && getFirst(player).y === getFirst(cube).y) {
    getFirst(player).x -= 1;
    getFirst(cube).x -= 1;
  } else {
    getFirst(player).x -= 1;
  }
});

onInput("d", () => {
  if (isPulling && getFirst(player).x - 1 === getFirst(cube).x && getFirst(player).y === getFirst(cube).y) {
    getFirst(player).x += 1;
    getFirst(cube).x += 1;
  } else {
    getFirst(player).x += 1;
  }
});

//time travel
onInput("j", () => {
  clearText();
  if (present === true && level != 0){ 
    present = false;
    playerX = getFirst(player).x;
    playerY = getFirst(player).y;

    //cube levels code for saving position of the cube / door
    if (level === 5 || level === 7){
      cubeX = getFirst(cube).x;
      cubeY = getFirst(cube).y;

      if (getAll(doorDown).length > 0){
        doorX = getFirst(doorDown).x;
        doorY = getFirst(doorDown).y;
        doorState = "doorDown";
        
      } else if (getAll(doorDownOpen).length > 0){
        doorX = getFirst(doorDownOpen).x;
        doorY = getFirst(doorDownOpen).y;
        doorState = "doorDownOpen";
        
      } else if (getAll(doorUp).length > 0){
        doorX = getFirst(doorUp).x;
        doorY = getFirst(doorUp).y;
        doorState = "doorUp";
        
      } else if (getAll(doorUpOpen).length > 0){
        doorX = getFirst(doorUpOpen).x;
        doorY = getFirst(doorUpOpen).y;
        doorState = "doorUpOpen";
      }
      console.log("door: ", doorX, doorY)
    }
    
    setMap(levels[level + 1]);
    addSprite(playerX, playerY, player);

    if (doorState === "doorDown"){
        addSprite(doorX, doorY, doorDown);
        
      } else if (doorState === "doorDownOpen"){
        addSprite(doorX, doorY, doorDownOpen);
        
      } else if (doorState === "doorUp"){
        addSprite(doorX, doorY, doorUp);
        
      } else if (doorState === "doorUpOpen"){
        addSprite(doorX, doorY, doorUpOpen);
      }
    doorState = ""

    //cube levels code for loding the position of the cube
    if (level === 5 || level === 7){
      addSprite(cubeX, cubeY, cube);
      console.log("cube:", cubeX, cubeY);
    }
    level += 1;
    
  } else if (present === false){
    present = true;
    playerX = getFirst(player).x;
    playerY = getFirst(player).y;

    if (level === 6 || level === 8){
      if (getAll(doorDown).length > 0){
        doorX = getFirst(doorDown).x;
        doorY = getFirst(doorDown).y;
        doorState = "doorDown";
        
      } else if (getAll(doorDownOpen).length > 0){
        doorX = getFirst(doorDownOpen).x;
        doorY = getFirst(doorDownOpen).y;
        doorState = "doorDownOpen";
        
      } else if (getAll(doorUp).length > 0){
        doorX = getFirst(doorUp).x;
        doorY = getFirst(doorUp).y;
        doorState = "doorUp";
        
      } else if (getAll(doorUpOpen).length > 0){
        doorX = getFirst(doorUpOpen).x;
        doorY = getFirst(doorUpOpen).y;
        doorState = "doorUpOpen";
      }
    }
    
    setMap(levels[level - 1])
    level -= 1;
    addSprite(playerX, playerY, player);

    //cube levels code for loding the position of the cube
    if (level === 5 || level === 7){
      addSprite(cubeX, cubeY, cube);
      console.log("cube:", cubeX, cubeY);

      if (doorState === "doorDown"){
        addSprite(doorX, doorY, doorDown);
        
      } else if (doorState === "doorDownOpen"){
        addSprite(doorX, doorY, doorDownOpen);
        
      } else if (doorState === "doorUp"){
        addSprite(doorX, doorY, doorUp);
         
      } else if (doorState === "doorUpOpen"){
        addSprite(doorX, doorY, doorUpOpen);
     }
        doorState = ""
      
    }
  }
  console.log(present);
})

//menu button
onInput("i", () => {
  //code here
})


afterInput(() => {
  //loads next level
  //loads level 1
  console.log(getFirst(player).x, getFirst(player).y)
  if ((present === true) && (level === 0) && (getFirst(player).x === 2) && (getFirst(player).y === 1)){
    setMap(levels[1]);
    level = 1;
    console.log("level");
    addText("Press 'j' to", {x: 1, y: 1, color: color`4`})
    addText("traverse time", {x: 1, y: 2, color: color`4`})
    addSprite(0, 3, player);

    //loads level 2
  } else if ((present === true) && (level === 0) && (getFirst(player).x === 4) && (getFirst(player).y === 1)){
    setMap(levels[3]);
    level = 3;
    console.log("level");
    addSprite(1, 5, player);
    
  } else if ((present === true) && (level === 1) && (getFirst(player).x === 8) && (getFirst(player).y === 3)){
    setMap(levels[3]);
    level = 3;
    console.log("level");
    addSprite(1, 5, player);

    //level 3
  }else if ((present === true) && (level === 3) && (getFirst(player).x === 5) && (getFirst(player).y === 1)){
    setMap(levels[5]);
    level = 5;
    console.log("level");
    addText("Press 'k' to pull", {x: 1, y: 1, color: color`4`})
    addText("the cube", {x: 1, y: 2, color: color`4`})
    addSprite(1, 3, player);
    addSprite(4, 1, cube);
    addSprite(5, 5, doorUp);

  }else if ((present === true) && (level === 0) && (getFirst(player).x === 6) && (getFirst(player).y === 1)){
    setMap(levels[5]);
    level = 5;
    console.log("level");
    addText("Press 'k' to pull", {x: 1, y: 1, color: color`4`})
    addText("the cube", {x: 1, y: 2, color: color`4`})
    addSprite(1, 3, player);
    addSprite(4, 1, cube);
    addSprite(5, 5, doorUp);

    //level 4
    } else if ((present === true) && (level === 5) && (getFirst(player).x === 7) && (getFirst(player).y === 5)){
    setMap(levels[7]);
    level = 7;
    console.log("level");
    addSprite(1, 3, player);
    addSprite(1, 1, cube);
    addSprite(7, 3, doorDown);
    
  } else if ((present === true) && (level === 0) && (getFirst(player).x === 8) && (getFirst(player).y === 1)){
    setMap(levels[7]);
    level = 7;
    console.log("level");
    addSprite(1, 3, player);
    addSprite(1, 1, cube);
    addSprite(7, 3, doorDown);

    // home
  } else if ((present === true) && (level === 7) && (getFirst(player).x === 4) && (getFirst(player).y === 5)){
    setMap(levels[0]);
    level = 0;
    console.log("level");
    addSprite(5, 6, player);
  }

  
  if ((level === 5 || level === 6) && getFirst(cube).x === 7 && getFirst(cube).y === 1){
    var deleteDoor = getAll(doorUp);
    if (deleteDoor.length > 0){
      console.log(deleteDoor[0])
      deleteDoor[0].remove();
      addSprite(5, 5, doorUpOpen)
      doorOpen = true
    } 
    }else if (level > 4 && level < 7) {
    var deleteDoor = getAll(doorUpOpen);
      if (deleteDoor.length > 0){
        console.log(deleteDoor[0])
        deleteDoor[0].remove();
        addSprite(5, 5, doorUp)
      }
  }

  //cube and door stuff
  if ((level === 7 || level === 8) && getFirst(cube).x === 7 && getFirst(cube).y === 1){
    var deleteDoor = getAll(doorDown);
    if (deleteDoor.length > 0){
      console.log(deleteDoor[0])
      deleteDoor[0].remove();
      addSprite(7, 3, doorDownOpen)
      doorOpen = true
    } 
    }else if (level > 6 && level < 9) {
    var deleteDoor = getAll(doorDownOpen);
      if (deleteDoor.length > 0){
        console.log(deleteDoor[0])
        deleteDoor[0].remove();
        addSprite(7, 3, doorDown)
      }
  }

  if (level > 4 && level < 9){
    
    if (getFirst(cube).x + getFirst(cube).y != cubePos){
      playTune(blockMove)
    }
    cubePos = getFirst(cube).x + getFirst(cube).y
  }

  if (level < 5){ isPulling = false }

  if (isPulling === true) {addText("Pulling: True", {x: 7, y: 1, color: color`H`})}
})














