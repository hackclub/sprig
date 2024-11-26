/*
@title: Operation_Ocean
@author: ari-tistic
@tags: ['strategy']
@addedOn: 2023-05-23

Keys:
  - A to move left
  - D to move right
  - K to begin/move to next text slide
  - I to shoot

How to Play:
  - Shoot CO2 to gain points! (1 CO2 = 1 pt)
  - Every 20 pts, watch the background environment change as a result of reduced CO2!

Objective:
  - Reach 120 pts and save the ocean!

LEARN ABOUT OCEAN ACIDIFICATION:
https://www.noaa.gov/education/resource-collections/ocean-coasts/ocean-acidification
*/

//SETUP
const player = "p"
const ocean1 = "1"
const ocean2 = "2"
const ocean3 = "3"
const ocean4 = "4"
const coral1 = "5"
const coral2 = "6"
const coral3 = "7"
const background = "b"
const carbon = "c"
const building1 = "8"
const building2 = "9"
const roofpipe = "0"
const laser = "l"
const crash1 = "x"
const crash2 = "y"
const blank = "z"

setLegend(
  [ player, bitmap`
................
.....000........
.....020........
.....020........
.....020........
.....02000......
.....02222000...
.000.022222220..
.0220022222220..
..022222222220..
...02222222220..
...00222222220..
....0222222200..
.....00222200...
......000000....
................` ], 
  [ ocean1, bitmap`
2222222222222222
2727272727272727
7272727272727272
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
5757575757575757
7575757575757575
5757575757575757
7575757575757575
5757575757575757
7575757575757575
5757575757575757` ],
  [ ocean2, bitmap`
7575757575757575
5757575757575757
7575757575757575
5757575757575757
7575757575757575
5757575757575757
5555555555555555
7575757575757575
5555555555555555
5757575757575757
5555555555555555
7575757575757575
5555555555555555
5555555555555555
5555555555555555
5555555555555555` ], 
  [ ocean3, bitmap`
2222222222222222
2727272727272727
7272727272727272
7777777777777777
F77777777777777F
FF7F7777F7F7F7F7
FFFFF77FFF7FFFF7
FFF77FFFFFF7FFF7
FFFF77FF7FFF7FFF
5F5F5F5F5F5F5F5F
F5F5F5F5F5F5F5F5
5F5F5F5F5F5F5F5F
F5F575F5757575F5
5757575757575757
7575757575757575
5757575757575757` ],
  [ ocean4, bitmap`
7575757575757575
5757575757575757
7F757F757F7F757F
F7F75757F75757F7
7F757F757F757F7F
F7F757F7F7F757F7
F5F5FF55F55F55F5
7F757F7575757575
F555555555555F55
5757575757575757
5F5FF5F5F5FFF555
7F75757F7F757F75
5FFF5F5F5F5F5FF5
F5FFF5FFFFF5F55F
5FF5F5F5FF555FF5
5555555555555555` ], 
  [ coral1, bitmap`
5552252552522255
2555225555255522
2555525555255255
5225552252252552
2525555522552552
5522225525525525
5255525525255225
5555525525225255
2555522525522555
5255552525525555
5222552225525555
2552555225225555
5552555222555555
L5L5222225L5L5L5
5L5L5L522L5L5L5L
L5L5L5L225L5L5L5` ], 
  [ coral2, bitmap`
5556656556566655
6555665555655566
6555565555655655
5665556656656556
6565555566556556
5566625525565565
5655565565655665
5555525525665655
6555562525566555
5655552525525555
5626552225565555
6552555225225555
5552555222555555
L5L5222225L5L5L5
5L5L5L522L5L5L5L
L5L5L5L225L5L5L5` ], 
  [ coral3, bitmap`
5559959559599955
9555995555955599
9555595555955955
5995559959959559
9595555599559559
5599965565595595
5955595595955995
5555565565995955
9555596565599555
5955556565565555
5969556665595555
9556555665665555
5556555666555555
D5D5666665D5D5D5
5D5D5D566D5D5D5D
D5D5D5D665D5D5D5` ], 
  [ background, bitmap`
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
  [ building1, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL266L266L266LL
LLL666L666L666LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL266L266L266LL
LLL666L666L666LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL266L266L266LL
LLL666L666L666LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ], 
  [ building2, bitmap`
DDDLDLDLDDDLLDDD
LDLDLDLDDLLDLDLL
DDLLLLLLLLLLLLLL
DDL266L266L266LL
DLL666L666L666LL
DDLLLLLLLLLLLLLL
DDLLLLLLLLLLLLLL
DLL266L266L266LL
LDL666L666L666LL
LDLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL266L266L266LL
LLL666L666L666LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ], 
  [ roofpipe, bitmap`
77777777777CCCCC
777777777CCCCCCC
777777CCCCCCCCC7
77777CCCCCCCC777
7777CCCCCCC77777
777CCCCCCC777777
777CCC7CC7777777
777CC77CC7777777
77LLLL7CC7777777
777LL77CC7777777
777LL7LLLL777777
777LL77LL7777777
777LL77LL7777777
777LL77LL7777777
777LL77LL7777777
777LL77LL7777777` ], 
  [ laser, bitmap`
.......33.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
................
................
................
................
................
................
................
................
................`],
  [ carbon, bitmap`
...0000000000...
..000000000000..
.00000000000000.
0000000000000000
0CCCC0CCCC000000
0C00C0C00C000000
0C0000C00C000000
0C0000C00C0CCCC0
0C0000C00C0000C0
0C00C0C00C0CCCC0
0CCCC0CCCC0C0000
00000000000CCCC0
0000000000000000
.00000000000000.
..000000000000..
...0000000000...` ], 
  [ crash1, bitmap`
................
................
................
................
.....000000.....
....00000000....
....0000CC00....
....00C00C00....
....00C00000....
....00CC0000....
....00000000....
.....000000.....
................
................
................
................`],
  [ crash2, bitmap`
................
................
.......0........
................
....0......0....
.....0....0.....
................
..0....00....0..
...0...00.......
................
.....0....0.....
....0......0....
................
........0.......
................
................`],
  [ blank, bitmap`
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
................
................`],
)

//SETUP
let level = 0
let points = 0;
let numPress = 0;
let gameInterval; //set global variable
const framesPerSecond = 8; // Define the desired frames per second
const levels = [
  map`
bbbbbbbbbbb
bbbbbbbbbbb
b0b0bbbbbb0
b8b8bbbbbb8
88b8bbbbb88
8888bpb8888
33333333333
44444444444
55555555555`];

setBackground(background);
setMap(levels[level]);

//SOUND EFFECTS
const shuffle = tune`
124.48132780082987: C4~124.48132780082987,
3858.921161825726`;
const shuffle2 = tune`
99.33774834437087: C4~99.33774834437087,
99.33774834437087: C4~99.33774834437087,
2980.132450331126`;
const explosion = tune`
50: F5^50 + D5^50 + B4~50 + G4~50,
50: B5^50 + G5^50 + C5^50 + E5^50,
50: G5^50 + B5~50 + E5^50 + C5~50,
50: G5~50 + B5~50 + E5~50,
50: G5~50 + B5~50,
1350`;
const bling = tune`
87.97653958944281: D5^87.97653958944281 + F5^87.97653958944281,
87.97653958944281: B5^87.97653958944281 + G5^87.97653958944281,
2639.296187683284`;
const laserFire = tune`
45.94180704441041: G5^45.94180704441041 + F5^45.94180704441041 + A5^45.94180704441041,
45.94180704441041: B5^45.94180704441041 + A5^45.94180704441041,
45.94180704441041: A5^45.94180704441041 + F5^45.94180704441041 + G5^45.94180704441041 + B5^45.94180704441041,
1332.312404287902`;
const celebration = tune`
172.41379310344828: G4-172.41379310344828,
172.41379310344828: D5-172.41379310344828,
172.41379310344828: G5-172.41379310344828,
172.41379310344828: E5-172.41379310344828,
172.41379310344828: A5-172.41379310344828,
172.41379310344828: B5-172.41379310344828,
172.41379310344828: C4-172.41379310344828 + E4-172.41379310344828,
344.82758620689657,
172.41379310344828: C4-172.41379310344828,
172.41379310344828: C4-172.41379310344828,
3620.689655172414`;

//PLAYER CONTROLS
onInput("a", () => {
  getFirst(player).x -= 1; //move left
  playTune(shuffle)
});

onInput("d", () => {
  getFirst(player).x += 1; //move right
  playTune(shuffle)
});

onInput("k", () => {
  playTune(shuffle2);
  numPress+=1;
  updateText();
  if (numPress==13){
    clearText();
    gameInterval = setInterval(gameLoop, 1000 / framesPerSecond);
  }
});

onInput("i", () => {
  playTune(laserFire);
  destroyObstacle();
  });

//TEXT
addText("Press K to Begin", { 
    x: 2,
    y: 2,
    color: color`3`,
  });
function updateText(){
  if (numPress==1){
    clearText();
    addText("Oh, dear...", { 
    x: 5,
    y: 2,
    color: color`2`,
  });
  }
  else if (numPress==2){
    clearText();
    addText("The ocean", { 
    x: 5,
    y: 2,
    color: color`2`,
  });
addText("looks terrible!", { 
    x: 3,
    y: 3,
    color: color`2`,
  });
  }
   else if (numPress==3){
    clearText();
   addText("There's so", { 
    x: 5,
    y: 2,
    color: color`2`,
  });
  addText("much pollution...", { 
    x: 2,
    y: 3,
    color: color`2`,
  });
  }
   else if (numPress==4){
    clearText();
   addText("and the coral", { 
    x: 4,
    y: 2,
    color: color`2`,
  });
  addText("is bleached!", { 
    x: 4,
    y: 3,
    color: color`2`,
  });
  }
  else if (numPress==5){
    clearText();
  addText("See the factories", { 
    x: 2,
    y: 2,
    color: color`2`,
  });
  addText("in the distance?", { 
    x: 2,
    y: 3,
    color: color`2`,
  });
  }
  else if (numPress==6){
    clearText();
  addText("They make CO2,", { 
    x: 4,
    y: 2,
    color: color`2`,
  });
addText("a gas that", { 
    x: 5,
    y: 3,
    color: color`2`,
  });
addText("hurts coral", { 
    x: 5,
    y: 4,
    color: color`2`,
  });
  }
  else if (numPress==7){
    clearText();
  addText("just like soda", { 
    x: 3,
    y: 2,
    color: color`2`,
  });
addText("hurts your teeth.", { 
    x: 2,
    y: 3,
    color: color`2`,
  });
  }
  else if (numPress==8){
    clearText();
  addText("This is called ocean", { 
    x: 0,
    y: 2,
    color: color`2`,
  });
addText("acidification.", { 
    x: 3,
    y: 3,
    color: color`2`,
  });
  }
  else if (numPress==9){
    clearText();
  addText("To save the ocean", { 
    x: 1,
    y: 2,
    color: color`2`,
  });
addText("we must reduce CO2.", { 
    x: 1,
    y: 3,
    color: color`2`,
  });
  }
  else if (numPress==10){
    clearText();
  addText("You have the", { 
    x: 4,
    y: 2,
    color: color`2`,
  });
addText("power to pop CO2", { 
    x: 2,
    y: 3,
    color: color`2`,
  });
  }
  else if (numPress==11){
    clearText();
  addText("when you press i.", { 
    x: 2,
    y: 2,
    color: color`2`,
  });
  }
  else if (numPress==12){
    clearText();
  addText("Reach 120 points", { 
    x: 2,
    y: 2,
    color: color`2`,
  });
addText("and save the ocean.", { 
    x: 1,
    y: 3,
    color: color`2`,
  });
addText("Let's go!", { 
    x: 6,
    y: 4,
    color: color`2`,
  });
}
}


//SPRITE EFFECTS
function spawnObstacle() {
  let check = Math.floor(Math.random()*3);
  if(check == 2){
    addSprite(0, 0, carbon);
  }
}

function moveObstacle() {
  let obstacles = getAll(carbon);
  for (let i = 0; i < obstacles.length; i++) {
    if (obstacles[i].x == 10){
      obstacles[i].remove();
    }
    else{
    clearTile(obstacles[i].x+1, obstacles[i].y);
    obstacles[i].x += 1;
    }
  }
}

function destroyObstacle(){
  let obstacles = getAll(carbon);
  for (let i = 0; i < obstacles.length; i++) {
    if (getFirst(player).x == obstacles[i].x){
      playTune(explosion);
      points += 1;
      obstacles[i].type = "x"
      for (let j = 0; j < getAll(crash1).length; j++) {
        getAll(crash1)[j].type = "y";
         for (let k = 0; k < getAll(crash2).length; k++) {
        getAll(crash2)[k].type = "z";
      }
    }
  }
}
}

//GAME
function stopGame(){
  clearInterval(gameInterval);
}

function updatePoints(){
  if (points < 0){
    points = 0;
  }
   addText("Points:" + points, { 
    x: 0,
    y: 0,
    color: color`3`,
  });
}

let firstLevelUp=true
let secondLevelUp=true
let thirdLevelUp=true
let fourthLevelUp=true
let fifthLevelUp=true
let sixthLevelUp=true

function updateScreen(){
  if (points == 20 && firstLevelUp) {
    clearTile(1, 2);
    clearTile(10, 2);
    clearTile(1, 3);
    addSprite(1, 3, building2);
    clearTile(10, 3);
    addSprite(10, 3, building2);
    playTune(bling);
    firstLevelUp = false;
  }
  else if (points == 40 && secondLevelUp){
    for (let i=0; i<5; i++){
      clearTile(2*i+1, 7);
      addSprite(2*i+1, 7, ocean2)
    }
    for (let i=0; i<6; i++){
      clearTile(2*i, 6);
      addSprite(2*i, 6, ocean1)
    }
    playTune(bling);
    secondLevelUp = false;
  }
  else if (points == 60 && thirdLevelUp){
    for (let i=0; i<11; i++){
      clearTile(i, 8);
      addSprite(i, 8, coral2);
    }
    playTune(bling);
    thirdLevelUp = false;
  }
  else if (points == 80 && fourthLevelUp){
    clearTile(3, 2);
    clearTile(3, 3);
    addSprite(3, 3, building2);
    clearTile(0, 4);
    addSprite(0, 4, building2);
    clearTile(1, 4);
    addSprite(1, 4, building2);
    clearTile(3, 4);
    addSprite(3, 4, building2);
    clearTile(9, 4);
    addSprite(9, 4, building2);
    clearTile(10, 4);
    addSprite(10, 4, building2);
    playTune(bling);
    fourthLevelUp = false;
  }
  else if (points == 100 && fifthLevelUp){
    for (let i=0; i<6; i++){
      clearTile(2*i, 7);
      addSprite(2*i, 7, ocean2)
    }
    for (let i=0; i<5; i++){
      clearTile(2*i+1, 6);
      addSprite(2*i+1, 6, ocean1)
    }
    playTune(bling);
    fifthLevelUp = false;
  }
  else if (points == 120 && sixthLevelUp){
    for (let i=0; i<11; i++){
      clearTile(i, 8);
      addSprite(i, 8, coral3);
    }
    stopGame();
    playTune(celebration);
    sixthLevelUp = false;
    addText("You Saved the Ocean!", { 
    x: 0,
    y: 2,
    color: color`3`,
  });
  }
}

//GAME LOOP
function gameLoop() {
  moveObstacle();
  spawnObstacle();
  updateScreen();
  updatePoints();
}