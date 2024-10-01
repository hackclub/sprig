/*
@title: Crossy_Sprig
@author: hatanuk
@tags: ['endless']
@addedOn: 2024-03-21


j
CONTROLS:
w - Up
a - Left
d- Right
Can't go down!

i - begin game
j - reset back to beginning

*/



const playerLeft = "q"
const playerRight = "w"
const playerLeftFlap = "e"
const playerRightFlap = "r"
const death = "t"
const roadOne = "u"
const roadTwo = "i"
const grassOne = "o"
const grassTwo = "p"
const grassThree = "a"
const chickenHouse = "d"
const seaOne = "f"
const seaTwo = "g"
const sand = "h"
const carPurpleRight = "s"
const carPurpleLeft = "j"
const carGreenRight = "y"
const carGreenLeft = "k"
const bam = "l"
const gui = "z"
const guiTopLeft = "1"
const guiTopRight = "2"
const guiBottomLeft = "3"
const guiBottomRight = "4"
const guiTop = "5"
const guiBottom = "6"
const guiLeft = "7"
const guiRight = "8"
const truckLeft = "x"
const truckRight = "c"
const asphalt = "v"
const tree1 = "b"
const tree2 = "n"
const box = "m"

const leftCarSprites = [carPurpleLeft, carGreenLeft, truckLeft]
const rightCarSprites = [carPurpleRight, carGreenRight, truckRight]
const carSprites = [...leftCarSprites, ...rightCarSprites]

const playerSprites = [playerLeft, playerRight, playerLeftFlap, playerRightFlap]

const grassSprites = [grassOne, grassTwo, grassThree]
const seaSprites = [seaOne, seaTwo]
const asphaltSprites = [asphalt]
const solidObjects = [tree1, tree2, box]
const worldObjects = [roadOne, roadTwo, sand, chickenHouse, ...seaSprites, ...grassSprites, ...carSprites, ...asphaltSprites, ...solidObjects];
const guiElements = [guiTopLeft,guiTopRight,guiBottomLeft,guiBottomRight,guiTop,guiBottom,guiLeft,guiRight, gui]


const MOVECOOLDOWN = 100
const TICKMS = 100;

let premoveUp
let premoveLeft
let premoveRight


let gameStart = false
let canStart = true
let cooldown = false
let gameTickCounter = 0
let cooldownTickCounter = 0
let playerDirection = "left"
let currentScore = 0
let highScore = 0

let counterDict = {"road": 0, 
                    "grass": 0,
                    "asphalt": 0}

let activeRoads = []

setSolids([...playerSprites, ...solidObjects])

setLegend(
      [bam, bitmap`
...33........3..
...33333...333..
....3399333393..
.....399933993..
..3333969996933.
333999666666993.
3399966666669933
.33396666666933.
..339666666693..
...39666666693..
..3399666699933.
.339939969933333
..333339993333..
..33.3339333....
..3...33333.....
.......33.......` ],
    [death, bitmap`
................
................
....111LL111....
...1LLLLLLLL1...
...1LLLL00LL1...
...LLLL0000LL...
...LLLL0000LL...
...LLLL100LLL...
...LLL1LLLLLL...
...L11LLLLLLL...
...LL1LLLLLLL...
...LLLLLLLLL1...
11LLLLLLLLLLLL1.
.11111LLL1LL11..
...1111111111...
................` ],
    [gui, bitmap`
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
  [guiTopLeft, bitmap`
....777777777777
..77222222222222
.722222222222222
.722777777777777
7227711111111111
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777` ],
    [guiTopRight, bitmap`
777777777777....
22222222222277..
222222222222227.
777777777777227.
1111111111177227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227` ],
    [guiBottomLeft, bitmap`
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227711111111111
.722777777777777
.722222222222222
..77222222222222
....777777777777` ],
    [guiBottomRight, bitmap`
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
1111111111177227
777777777777227.
222222222222227.
22222222222277..
777777777777....` ],
      [guiTop, bitmap`
7777777777777777
2222222222222222
2222222222222222
7777777777777777
1111111111111111
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
   [guiBottom, bitmap`
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
1111111111111111
7777777777777777
2222222222222222
2222222222222222
7777777777777777` ],
   [guiLeft, bitmap`
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777
7227177777777777` ],
  [guiRight, bitmap`
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227
7777777777717227` ],
    [chickenHouse, bitmap`
DDDDDDDDDDDDDDDD
DDD4DDDDDDDDDDD1
D44DDDDD333DDDDD
DDDDDD33333CCDDD
DDDD3333333CCCCD
DD333333333CCCCC
DDDD2222333CC11D
DDDD22222221111D
4DDD226F6221111D
D4DD26FFF621111D
D4DD2FFFFF21111D
DDDD2FFCCC2111DD
DDDD2CCCCC211DDD
DDDDDDCCCC21DDDD
DDDDDDDDDDDDDDDD
DDD1DDDDDDDDDDDD` ],
    [truckRight, bitmap
`
.2222222222.....
200000000002....
20LLLLLLLL02....
20L111111102....
2000000000022...
20122222220662..
20123353320FF62.
2012353532000F6.
20122222220000F2
20000000000FFFF2
2FFFFFFFFFFFFFF2
.2L0L222222L0L2.
.2LLL2....2LLL2.
..222......222..
................
................` ],
   [truckLeft, bitmap
`
.....2222222222.
....200000000002
....20LLLLLLLL02
....201111111L02
...2200000000002
..26602222222102
.26FF02335332102
.6F0002353532102
2F00002222222102
2FFFF00000000002
2FFFFFFFFFFFFFF2
.2L0L222222L0L2.
.2LLL2....2LLL2.
..222......222..
................
................` ],
  [carPurpleRight, bitmap`
................
................
...22222222.....
.22HHH888HH2222.
2H8H0888880HHHH2
2H8H0888880H88H2
2H8H0888880H8882
2H8H0888880H8882
2H88H00000HH88H2
2HHHHHHHHHHHHHH2
.2HLLLHHHHLLLH2.
..2L1L2222L1L2..
..2LLL2..2LLL2..
...222....222...
................
................` ],
  [carPurpleLeft, bitmap`
................
................
.....22222222...
.2222HH888HHH22.
2HHHH0888880H8H2
2H88H0888880H8H2
2888H0888880H8H2
2888H0888880H8H2
2H88HH00000H88H2
2HHHHHHHHHHHHHH2
.2HLLLHHHHLLLH2.
..2L1L2222L1L2..
..2LLL2..2LLL2..
...222....222...
................
................` ],
    [carGreenRight, bitmap`
................
........2.......
....2222L22.....
..22DD4LLDD222..
.24D404L440DDD2.
.24D4044440D44D2
.24D4044440D4442
.24D4044440D4442
.244D00000DD44D2
.2DDDDDDDDDDDD2.
.2DDLLLDDDLLLD2.
..22L1L222L1L2..
...2LLL2.2LLL2..
....222...222...
................
................` ],
    [carGreenLeft, bitmap`
................
.......2........
.....22L2222....
..222DDLL4DD22..
.2DDD044L404D42.
2D44D0444404D42.
2444D0444404D42.
2444D0444404D42.
2D44DD00000D442.
.2DDDDDDDDDDDD2.
.2DLLLDDDLLLDD2.
..2L1L222L1L22..
..2LLL2.2LLL2...
...222...222....
................
................` ],
  [playerLeft, bitmap`
......2222......
....22333322....
...2LLLL11112...
...2LLLL11112...
..26699L10012...
..26699L10012...
...2L33L11112...
...2L33L11112...
...2LLLL111122..
..21LLLL1111L12.
.21LLLLL11111L2.
.21LLLLL11111L12
..21LLLL1111L112
...222692269222.
....269926992...
.....2222222....` ],
  [playerLeftFlap, bitmap`
......2222......
....22333322....
...2LLLL11112...
..26699L11112...
..22L33L10012...
..26699L10012...
...2L33L1111222.
..22L33L11112LL2
.21LLLLL1111L1L2
21LLLLLL111111L2
21LLLLLL111111L2
.2222LLL1111LL12
....2LLL11111112
....22692269222.
...269926992....
....2222222.....` ],
    [playerRight, bitmap`
......2222......
....22333322....
...21111LLLL2...
...21111LLLL2...
...21001L99662..
...21001L99662..
...21111L33L2...
...21111L33L2...
..221111LLLL2...
.21L1111LLLL12..
.2L11111LLLLL12.
21L11111LLLLL12.
211L1111LLLL12..
.222962296222...
...299629962....
....2222222.....` ],
  [playerRightFlap, bitmap`
......2222......
....22333322....
...21111LLLL2...
...21111L99662..
...21001L33L22..
...21001L99662..
.2221111L33L2...
2LL21111L33L22..
2L1L1111LLLLL12.
2L111111LLLLLL12
2L111111LLLLLL12
21LL1111LLL2222.
21111111LLL2....
.22296229622....
....299629962...
.....2222222....` ],
      [tree1, bitmap`
......4444......
....44444444....
...4434444444...
...4444443444...
....4C4444C4.LL.
......CC4C..LLLL
.......CC....LL.
.......CCC..LLL.
.......CC..LLL..
.......CC.LLLL..
....444CC444LL..
...4DDCCCCDD4L..
..4DCCCCCCCCD4..
...4CDDCDDDC4...
....44444444....
................` ],
        [tree2, bitmap`
................
....44494444....
...4444444444...
..4444C44C4494..
..444.C4CC.444..
.......CC..LLLL.
........C....LLL
........C....L..
........C...LL..
.......CC..LLL..
....444CC444LL..
...4DDCCCCDD4L..
..4DCCCCCCCCD4..
...4CDDCDDDC4...
....44444444....
................` ],
    [box, bitmap`
................
................
................
......CCCCCCCC..
....CCCCCCCCCC..
....C999999CCC..
....CC9999C9CC..
....C9C99C99CC..
....C99CC999CC..
...CCCCCC999CCL.
..CCCCCC9C99CCL.
..C999CC99C9CLL.
..C9C9CC999CLLL.
..C999CCLLLLLL..
..CCCCCLLLLLL...
..LLLLLLLLL.....` ],
   [roadOne, bitmap`
2222222222222222
1111111111111111
LLLLLLLLLLLLLLLL
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000666666
0000000000666666
0000000000000000
0000000000000000
0000000000000000
0000000000000000
LLLLLLLLLLLLLLLL
1111111111111111
2222222222222222` ],
  [roadTwo, bitmap`
2222222222222222
1111111111111111
LLLLLLLLLLLLLLLL
0000000000000000
0000000000000000
0000000000000000
0000000000000000
6666660000000000
6666660000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
LLLLLLLLLLLLLLLL
1111111111111111
2222222222222222` ],
  [grassOne, bitmap`
DDDDDDDDDDDDD4DD
DDDDDDDDDDDDDD4D
DDDDDDD4DDDDDD4D
DDD4DDD4DDDDDDDD
DDD4DD4DDDDDDDDD
DDDD4D4DDDD44DDD
DDDD4DDDDD434DDD
DDDDDDDDDD44DDDD
DDDDDDDDDDDDDDDD
DD6DDDDD4DDDDDDD
D696DDDD4DDDDDDD
DD6DDDD4DDDDDDDD
DD4DDDD4DDDDDDDD
DDD4DDDDDDDDDDDD
DDDDDDDDDDDDDDD4
DDDDDDDDDDDDDD4D` ],
  [grassTwo, bitmap`
DDDDDDDDDDDDDDDD
DDDDDD4DDDDDD1DD
DDDDDD4DDDD4DDDD
DDDDD4DDDDD4DDDD
DDDDD4DDDDDD4DDD
DDDDDDDDDDDD4DDD
DDDDDDDDDDDDDDDD
DDD4DDDDDDDDDDDD
DD484DDD4DDDDDDD
DDD4DDD4H4DDDDDD
DDDDDDDD4DDDDDDD
DDDDD4DDDDDDD4DD
DDDDDD4DDDDDD4DD
D4DDDDDDDDDD4DDD
D4DDDDDDDDDDDDDD
DD4DDDDDDDDDDDDD` ],
  [grassThree, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDD4DDDDDD
DD4DDDDD4DDDDDDD
DD4DDDDD4DDDDDDD
DDD4DDDDDDDDDDDD
DDD4DDDDDDDDDDDD
DDDDDDDDDD4DDDDD
DDDDDDDDD4DDDDDD
DDDDDDDD4DDDDDDD
DDDDD4DDDDDDDDDD
DDDDD4DDDDDDDDDD
DDDDDD4DDDDDDDDD
DDDDDDDDDDDDD4DD
DDD4DDDDDDDDDD4D
DD4DDDDDDDDDDD4D
DD4DDDDDDDDDDDDD` ],
  [seaOne, bitmap`
6F666666F66666F6
6666F66666666666
6666666666666F66
F6FFFF666FFF666F
FFFFFFFFFFFFFFFF
2FFF222FFF22FFF2
7222777222772227
2777227772227772
7777777777777777
7772777777772777
7777777777777777
7777777777777777
7777777777777777
5555577777777755
5555555555555555
5555555555555555` ],
  [seaTwo, bitmap`
6F666666F66666F6
6666F66666666666
6666666666666F66
F6FFFF666FFF666F
FFFFFFFFFFFFFFFF
2FFF222FFF22FFF2
2222777222772222
7777227772227777
7777277777727777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
5555577777777755
5555555577755555
5555555555555555` ],
  [sand, bitmap`
DDDDDDDDDDDDDDDD
DD4DDDD4DDDDDDDD
444444444444DDDD
46466646646644DD
66666666646F6644
666F666666666664
666666F666666F66
6666666666666666
6666666666666666
F66666666F666666
6666666666666666
666F666666666666
6666666666666666
666666666666666F
6666666F66666666
6666666666666666` ], 
  [asphalt, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
111L111111111111
11L1111111111111
1111111111111111
1111111111111111
1111111111111111
11111111111L1111
1111111111L11111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ],
  

 
)


let level = 0
const levels = [
  map`
oapapaappo
ppooapoaop
oappoapapp
aoapaoaaoa
pappdppppp
oaooaoaoao
hhhhhhhhhh
fgfgfgfgfg`
]


function mainLoop() {
  counterDict = {"road": 0, 
                    "grass": 2,
                    "asphalt": 2}
  setMap(levels[0])
  addSprite(5, 4, playerLeft)
  bringUpGUI()
  addText("PRESS", {
    x: 6,
    y: parseInt(height()) / 2,
    color:color`2`
  })

  addText("-> i <-", {
    x: 6,
    y: parseInt(height()) / 2 + 1,
    color:color`0`
  })

  addText("TO BEGIN", {
    x: 6,
    y: parseInt(height()) / 2 + 2,
    color:color`2`
  })
}

function bringUpGUI() {
  let coords
  const max_x = width() - 1
  const max_y  = parseInt(height()) / 2
  for (let x=1; x < max_x; x++) {
    for (let y = 1; y < max_y; y++) {
      switch (true) {
        case x == 1 && y == 1:
          addSprite(x, y, guiTopLeft)
          break;
        case x == max_x - 1 && y == 1:
          addSprite(x, y, guiTopRight)
          break;

        case x == 1 && y == max_y - 1:
          addSprite(x, y, guiBottomLeft)
          break;
          
        case x == max_x - 1 && y == max_y - 1:
          addSprite(x, y, guiBottomRight)
          break;

        case x == 1:
          addSprite(x, y, guiLeft)
          break;

        case x == max_x - 1:
          addSprite(x, y, guiRight)
          break;

        case y == 1:
          addSprite(x, y, guiTop)
          break;

        case y == max_y - 1:
          addSprite(x, y, guiBottom)
          break;

        default:
          addSprite(x, y, gui)
      }
      
    }
  }
}

function bringUpScore() {
  let max_x = width() - 4
  let min_x = width() - max_x - 1
  for (let x=min_x; x <= max_x; x++) {
    switch (true){
      case (x == min_x):
        addSprite(x, height() - 1, guiTopLeft)
        break;
      case (x == max_x):
        addSprite(x, height() - 1, guiTopRight)
        break;
      default:
         addSprite(x, height() - 1, guiTop)
    }
  }
}
  

function hideGUI() {
  let guiSprites
  guiElements.forEach((guiElement) => {
    guiSprites = getAll(guiElement)
    guiSprites.forEach((guiSprite) => {
      guiSprite.remove()
  })
  })

}

// Scroll system

function getObjects() {
  let assets = getAll();
  let objects = [];
  for (let i = 0; i < assets.length; i++) {

    if (worldObjects.includes(assets[i].type)) {
      
      objects.push(assets[i]);
    }
  }
  return objects
}

function changeObject(from, to) {
  addSprite(from.x, from.y, to)
  
}

function moveView(x, y) {
  let objects = getObjects();
  for (let i = 0; i < objects.length; i++)  {

      // Move object y upwards
      objects[i].y -= y;
       
      // Move object x to the right
      objects[i].x -= x;
        
  }
}


function clearLastRow() {
  let row = height() - 1

  for (let col = 0; col < width(); col++) {
    clearTile(col, row)
  }
  bringUpScore()
}

function updateRoadYCoordinate() {
    activeRoads.forEach((road) => {
      road["yCoordinate"] += 1
    })
}

function checkRoadClear() {
  // checks the oldest generated road to see whether it's time to remove it
  if (activeRoads.length > 0) {
    let road = activeRoads[0]
    if (road["yCoordinate"] >= height() - 1) {
      activeRoads.shift()
    }
  }
}

// checks if there is no object blocking the path upward
function isAboveClear() {
  let player = getFirst(getPlayer())
  let spritesAbove = getTile(player.x, player.y-1)
  let isClear = true


  spritesAbove.forEach((sprite) => {
    if (solidObjects.includes(sprite.type)) {
      isClear = false
    }

  })
  
  return isClear ? true : false
}

function onUpMove() {
  updateSprite(playerDirection)
  if (isAboveClear()) {
    clearLastRow()
    checkRoadClear()
    moveView(0, -1);
    updateRoadYCoordinate()
    generateNewRow()
    currentScore += 1
  }
}

// Probability-based helper functions

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min); 
}

function chooseRandomElement(array) {
  return array[getRandomInt(0, array.length - 1)]
}


function getNewRowType() {
  const probability = getRandomInt(1, 100);

  if (counterDict["road"] > 2) {
    // Prevent more than 3 roads stacking
    return (probability < 50) ? "grass" : "asphalt"
  } 
  if (counterDict["grass"] > 1 || counterDict["asphalt"] > 1) {
    // Prevent more than 2 grass/asphalt stacking
    return "road"
  }
  if (probability <= 30) {
    // 30 percent chance to generate road, otherwise grass/asphalt
    return "road"
  } else {
    if (counterDict["grass"] > 0) {
      return "grass"
    } else if (counterDict["asphalt"] > 0){
      return "asphalt"
    } else {
      return (probability <= 65) ? "asphalt" : "grass"
    }
  }
}

function addObject(objectArray) {
  let amount = getRandomInt(1, 3)
  let avaliableTiles = shuffleArray(Array.from(Array(width()).keys()))
  for (let i = 0; i < amount; i++) {
    addSprite(avaliableTiles[i], 0, chooseRandomElement(objectArray))
  }
}


function buildRow(rowFactory) {
  for (let x = 0; x < width(); x++) {
      addSprite(x, 0, rowFactory(x))
    }
}

function resetCounters(exception) {
  
  Object.keys(counterDict).forEach( (counter) => {
    if (counter != exception) {
      counterDict[counter] = 0
    }
  })
    
}

function generateRoad() {
  // roads have 2 distinct features: direction, speed and traffic density of vehicles
  // these are chosen randomly
  
  // speed is measured in ticks: how many milliseconds for a vehicle to change position
    const SPEEDS = [800, 500]
  // which direction the vehicles come from
    const DIRECTIONS = ["left", "right"]
  // probability that a new vehicle will spawn every time the positions change
    const TRAFFIC = [10, 20, 20, 20, 30]

  
  // ramp up difficulty the higher the score
  for (let i = 20; i <= currentScore; i += 20) {
    SPEEDS.push(200)
    TRAFFIC.push(30)
  }

  const chosenSpeed = SPEEDS[getRandomInt(0, SPEEDS.length - 1)]
  const chosenDirection = DIRECTIONS[getRandomInt(0, DIRECTIONS.length - 1)]
  const chosenTraffic = TRAFFIC[getRandomInt(0, TRAFFIC.length - 1)]

  let road = {"direction": chosenDirection,
                    "spawnRate" : chosenSpeed,
                    "spawnFrequency" : chosenTraffic,
                   "yCoordinate" : 0}
  activeRoads.push({"direction": chosenDirection,
                    "spawnRate" : chosenSpeed,
                    "spawnFrequency" : chosenTraffic,
                   "yCoordinate" : 0})

  // Add some car sprites randomly to make the road appear pre-populated
  let numCars = parseInt(chosenTraffic / 10)
  let carSprite
  let possibleTiles =  shuffleArray(Array.from(Array(width()).keys()))
  while (numCars != 0) {
    carSprite = (road["direction"] == "left") ? chooseRandomElement(rightCarSprites) : chooseRandomElement(leftCarSprites)
    addSprite(possibleTiles.pop(), 0, carSprite)
    numCars -= 1
  }
  
}

function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
  return array
}


function generateNewRow() {
  const rowType = getNewRowType()
  if (rowType == "road") {
    counterDict["road"]++
    buildRow((x) => x % 2 == 0 ? roadOne : roadTwo)
    // Reset all counters except road
    resetCounters("road")
    generateRoad()
    
  } else if (rowType == "grass") {
    counterDict["grass"]++
    buildRow((x) => chooseRandomElement(grassSprites))
     // Reset all counters except grass
    resetCounters("grass")
    // if it comes right after a road, add objects
    if (counterDict["grass"] == 1) {
      addObject(solidObjects)
    }
  } else if (rowType == "asphalt") {
      counterDict["asphalt"]++
     buildRow((x) => chooseRandomElement(asphaltSprites))
     // Reset all counters except asphalt
      resetCounters("asphalt")
      if (counterDict["asphalt"] == 1) {
        addObject(solidObjects)
    }
  }
  
}
// this function returns the correct player sprite depending on the direction of the player and movement cooldown
function getPlayer() {
  if (playerDirection == "left" && cooldown) {
    return playerLeftFlap
  }
  else if (playerDirection == "right" && cooldown) {
    return playerRightFlap
  }
  else if (playerDirection == "left") {
    return playerLeft
  }
  else if (playerDirection == "right") {
    return playerRight
  }
}

// replaces the sprite of the player given their old one with a new one
function replacePlayer(oldSprite, newSprite) {

  const oldPlayer = getFirst(oldSprite)
  let x = oldPlayer.x
  let y = oldPlayer.y
  oldPlayer.remove()
  addSprite(x, y, newSprite)
  
}


// updates the sprite whenever the player moves with the correct direction and animation
function updateSprite(direction) {
  let oldSprite = getPlayer()
  cooldown = true
  playerDirection = direction
  let newSprite = getPlayer()
  replacePlayer(oldSprite, newSprite)
}

function onSideMove(direction) {
  updateSprite(direction)
  getFirst(getPlayer()).x += (direction == "right") ? 1 : -1
}

onInput("w", () => {
  if (gameStart == true && cooldown == false) {
    onUpMove()
  } else if (gameStart == true && cooldown == true) {
    // premove
    premoveUp = true
    
  }
  
})


onInput("a", () => {
  if (gameStart == true && cooldown == false) {
    onSideMove("left")
  } else if (gameStart == true && cooldown == true) {
    // premove
    premoveLeft = true
  }
})

onInput("d", () => {
  if (gameStart == true && cooldown == false) {
    onSideMove("right")
  } else if (gameStart == true && cooldown == true) {
    // premove
    premoveRight = true
  }
})


onInput("i", () => {
  if (gameStart == false && canStart == true) {
    clearText()
    hideGUI()
    currentScore = 0
    bringUpScore()
    gameStart = true
  }
}
)


onInput("j", () => {
  if (gameStart == false) {
    clearText()
    mainLoop()
    canStart = true
  }
}
)



function spawnVehicle(road) {
    let x = (road["direction"] == "left") ? 0 : width() - 1
    // this is a probability check; we generate a number between 1-100
    // and check if its below or equal to the spawn chance (somewhere between 15-30)
    let chance = getRandomInt(1, 100)
    if (chance <= road["spawnFrequency"]) {
      addSprite(x, road["yCoordinate"], (road["direction"] == "left") ? chooseRandomElement(rightCarSprites) : chooseRandomElement(leftCarSprites))
    }
}

function getVehiclesOnRoad(road) {
  let y = road["yCoordinate"]
  let vehicles = []
  
  for (let x = 0; x < width(); x++) {
    getTile(x, y).forEach((sprite) => {
      if (carSprites.includes(sprite.type)) {
        vehicles.push(sprite)
      }
    })
  }
  return vehicles
}

function moveVehicles(road) {
  let vehicles = getVehiclesOnRoad(road)


  vehicles.forEach((vehicle) => {
  if (road["direction"] == "left") {
    if (vehicle.x < width() - 1) {
      vehicle.x += 1
  } else {
      vehicle.remove()
    }
  } 
    
  if (road["direction"] == "right") {
    if (vehicle.x > 0) {
        vehicle.x -= 1
    } else {
        vehicle.remove()
      }
    }
  })
}

function delayDelete(sprite, time) {
  setTimeout(() => {
    sprite.remove()}, time)
}

function onDeath(player, collidedVehicle) {
    player.type = death
    collidedVehicle.type = bam
    clearText()
    addText("BACK:j", 
            {x:7,
             y:15,
             color:color`0`})
    addSprite(2, 2, death)
    addSprite(width() - 3, 2, death)

    if (currentScore > highScore) {highScore = currentScore}
  
    addText("-MORTIS-",
            {x:6,
             y:4,
             color:"2"})
    addText("NOW:" + String(currentScore),
            {x:7,
             y:5,
             color:color`6`})
     addText("BEST:" + String(highScore),
            {x:7,
             y:6,
             color:color`6`})

  activeRoads = []
  cooldown = false
  playerDirection = "left"
  canStart = false

}
                  


// BUILT IN FUNCTION THAT RUNS EVERY X MILLISECONDS
// I use it here to increment TickCounter variables in order to implement cooldowns and enemy movements
setInterval(() => {


  if (!gameStart) {
    bringUpGUI()
  }

  if (gameStart) {
    let isDead = false
    let player = getFirst(getPlayer())
    let collidedVehicle
    // checks if there are any tiles where the player and a vehicle has collided - ie death has occurred
    // -> for all vehicle sprites
    carSprites.forEach( (carType) => {
      let sprites = tilesWith(player.type, carType)

      if (sprites.length > 0) {
        // if there is a tile with a player + vehicle 
        isDead = true
        gameStart = false
        sprites[0].forEach ( (sprite) => {
          if (sprite.type == carType) {
            collidedVehicle = sprite
          }
      })
      }
    })
    if (isDead) {
      onDeath(player, collidedVehicle)
      return
    
    }
    // Current score Display
    addText(
        String(currentScore),
        {x:9, 
         y: 15, 
          color:color`2`})
  
  
  
    // set gameTickCounter to += TICKMS if it's less than 1500ms - otherwise reset it back to 0
    // This is so that it won't become infinitely large
    if (gameTickCounter < 1400) {
      gameTickCounter += TICKMS
  } else {
      gameTickCounter = 0
    }
     
    
  
    // remember - setInterval is called every X milliseconds (ms)
    // here I specified it to run every 10 miliseconds
    let counter = 0
    
    activeRoads.forEach((road) => {

  
      
      if (gameTickCounter % road["spawnRate"] == 0) {
            counter += 1 
        moveVehicles(road)
        spawnVehicle(road)
        
      }
    })
  
  
    if (cooldown) {
      // count up the cooldownTickCounter if a cooldown is activated
      cooldownTickCounter += 50
    }
    // then when the cooldownTickCounter >= MOVECOOLDOWN, set the cooldown to false and change animation back
    if (cooldownTickCounter >= MOVECOOLDOWN) {
      let oldSprite = getPlayer()
      cooldown = false
      let newSprite = getPlayer()
      replacePlayer(oldSprite, newSprite)
      cooldownTickCounter = 0

      // also perform any premoves
      if (premoveUp) {
        premoveUp = false
        onUpMove()
      }
      if (premoveLeft) {
        premoveLeft = false
        onSideMove("left")
      }
      if (premoveRight) {
        premoveRight= false
        onSideMove("right")
      }
    }
  }
  }, TICKMS)
  // Notice how the TICKMS here is another parameter - I defined this constant earlier,
  // The setInterval function runs every TICKMS milliseconds
  
  // Call the mainLoop() function to begin the game when you run the program
mainLoop()
