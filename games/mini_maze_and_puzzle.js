/*
@title: mini_maze_and_puzzle
@author: muhammad tsaqif mukhayyar
@tags: ['strategy']
@addedOn: 2022-09-16

Instructions:

Welcome to Find Home and Avoid Trap!!!

Here's the mission:
1. Find the door
2. Move block to its medium

How to play:
1. Beware of trap and lava
2. Use WASD to moving

*/
const createArray = (size) => [...Array(size).keys()];
const wait = (time) => new Promise((resolve) => setTimeout(resolve, time));

const player = "p";
const trap = "t";
const lava = "l";
const goal = "g";
const fake_goal = "f";
const wall = "w";
const barrier = "r";
const medium = "m";
const box = "b";
const decoration = "d";
const background = "a";
const button = "n";

const killables = [lava,trap];

let button_status = "unpressed";
let status = "play";
let jumps = 0;
let uBarrierY = 0;
let uBarrierX = 0;
let barrierY = 0;
let barrierX = 0;

const playerDead = [
  player,
  bitmap`
................
................
................
................
................
................
................
....00.0..0.....
.....000000.....
..44000000044...
...4003333040...
...0000000000...
...0........0...
................
................
................`,
];

const playerAlive = [
  player,
  bitmap`
................
................
................
....44...44.....
....0400040.....
....0000000.....
....0033330.....
....40000004....
....40000004....
....40000004....
....0000000.....
....0000000.....
....0.....0.....
....0.....0.....
................
................`,
];

const playerAliveLeft = [
  player,
  bitmap`
................
................
................
....44...44.....
....0400040.....
....0000000.....
....0333300.....
...40000004.....
...40000004.....
...40000004.....
....0000000.....
....0000000.....
....0.....0.....
....0.....0.....
................
................`,
];

const objects = [
  [ trap, bitmap`
2222222222222222
2222222222222222
2442222222244422
2244888884448822
2224222444244442
2228444444422822
2228222282424442
2228444284242844
2444888884884822
2428224242224422
2428224242222422
2228222444222442
2228222482442842
2224444888844822
4442222222224222
2222222222222222`],
  [ goal, bitmap`
2222222222222222
2264444444444422
2264444444444422
2264444222444422
2264442222244422
2264422222224422
2264422222224422
2264422222224422
2264422222224422
2264442222244422
2264442222244422
2264444444444422
2264444444444422
2266666666666622
2266666666666622
2222222222222222`],
  [ fake_goal, bitmap`
2222222222222222
2264444444444422
2264444444444422
2264444222444422
2264422222224422
2264422222224422
2264422222224422
2264422222224422
2264422222224422
2264422222224422
2264442222244422
2264444444444422
2264444444444422
2266666666666622
2266666666666622
2222222222222222`],
  [ wall, bitmap`
1111111111111111
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
11111LLLLLL11111
LLLLL111111LLLLL
L11111111111111L
L11111111111111L
L11111111111111L
LLLLL111111LLLLL
11111LLLLLL11111
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1111111111111111`],
  [ lava, bitmap`
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
3333333333333333
3333333333333333`],
  [ box, bitmap`
2222222222222222
2222222222222222
2222222222222222
2255555555555522
2255555555555522
2257777555555522
2257777555555522
2257777557777522
2255555557777522
2255555557777522
2255555555555522
2255555555555522
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [ medium, bitmap`
2222222222222222
2222222222222222
0006666666666662
0026222222222062
0026222222222062
0026222222222062
0026222222222062
0226222222222062
0226222222222062
0226222222222062
0026222222222062
0026222222222062
0026222222222062
0026222222222062
0006666666666662
2222222222222222`],
  [ button, bitmap`
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
...3333333333...
..LLLLLLLLLLLL..`],
  [ barrier, bitmap`
LLLL333333333LLL
LLLL111111111LLL
LLLL111000011LLL
LLLL111000011LLL
LLLL111000011LLL
LLLL111000011LLL
LLLL111000011LLL
LLLL111000011LLL
LLLL111000011LLL
LLLL111000011LLL
LLLL111111111LLL
LLLL111111111LLL
LLLL111111111LLL
LLLL111111111LLL
LLLL333333333LLL
LLLLLLLLLLLLLLLL`],
  [ decoration, bitmap`
2222562222222222
2444465222222222
22L664L222225442
22LLLL422226L452
22222222222L4L22
2222222222264L22
2422222222226422
244L222222222222
2L6L222222222222
2LL6522222222222
2225222222222222
222222222LLL4222
222222225L64L222
222222444446L222
22222222256LL222
2222222222222222`],
  [ background, bitmap`
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
]

setLegend(
  playerAlive,
  ...objects
);

let level = 0;
const levels = [
  map`
aaaaaaaaaaaaaad
aawwwwwwwwwwwag
taaaaaaaaaadwww
wwwwwwwwwwaddaa
dddddaaaaaaaaaa
dddaaaaaaawwwww
ddaaaaaawwwwwww
daaawwaaddwwwww
paaaaaaaadwwwww
wwwwllllllwwwww`,
  map`
ddddaaapaaadddd
dddaaddaddaaddd
ddaadddadddaadd
daawwwdadwwwaad
wawwaaaaaaawwaw
wawwtttttttwwaw
wawtttttttttwaw
wawtttwwwtttwaw
wawwwwwgwwwwwaw
waaaaaaaaaaaaaw`,
  map`
dddddaataaaaddd
dddttaabaaaaadd
ddtttaaaaaaaaad
wwtmaaawwwwwwaa
wwwwwwwwwmwwaaw
dddaaaadtbaaaww
ddaaaaaddaaawww
pawwwaaaaabaaam
wwwwwllwwwwwwww
wwwwwwwwwwwwwww`,
  map`
ttwwwwtwwwwwwww
dddaaaaaaaaaagw
wdaawwwwtwwwwww
wwaaaaaaaaaaafw
wwwaawwwwwwwwww
taaaadddaaaaafw
wwwwaaddwwwwwww
aaaaaaadaaaaafw
aaawwaawwwwwwww
pwwwlllllllllll`,
  map`
tttdaawmwaadttt
tdddabwawbadddt
ddaatmwbwmtaadd
waawwwwbwwwwaaw
wwaaadwbwdaaaww
mwwwaawbwaawwwm
bttwwawbwawwttb
aaaaaaaaaaaaaaa
wwwwwwwawwwwwww
maaaaabpbaaaaam`,
  map`
gffffffffffffff
gffffffffffffff
gffffffffffffff
...............
wwwwww...w.....
....w.t...w....
.....nttttwwww.
.ww.bwtttt...a.
p.........r....
wwwwwwwwwwwwwww`,
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player,  wall, box, barrier ]);

setPushables({
  [player]: [box],
  [box]: [box]
});

const walk = tune`
500: a5~500,
15500`;
const win = tune`
96.7741935483871,
96.7741935483871: c4~96.7741935483871 + d4~96.7741935483871,
96.7741935483871: d4~96.7741935483871,
96.7741935483871: f4~96.7741935483871 + e4~96.7741935483871,
96.7741935483871: f4~96.7741935483871,
96.7741935483871: g4~96.7741935483871 + f4~96.7741935483871,
96.7741935483871: a4~96.7741935483871 + b4~96.7741935483871 + c5~96.7741935483871 + d5~96.7741935483871,
96.7741935483871: d5~96.7741935483871 + c5~96.7741935483871,
96.7741935483871: e5~96.7741935483871,
96.7741935483871: e5~96.7741935483871 + f5~96.7741935483871,
2129.032258064516`;
const fake = tune`
250: b5~250 + a5~250 + g5~250 + f5~250 + e5~250,
250: b5~250 + a5~250 + g5~250 + f5~250 + e5~250,
250: e5~250 + d5~250,
250: e5~250 + d5~250 + c5~250,
250: e5~250 + d5~250 + c5~250 + b4~250,
250: e5~250 + d5~250 + c5~250 + b4~250,
250: d5~250 + c5~250 + b4~250 + a4~250,
250: c5~250 + b4~250 + a4~250,
6000`;

// START - PLAYER MOVEMENT CONTROLS

onInput("s", () => {
  playTune(walk);

  if(jumps) jumps=0;
  getFirst(player).y++;
});

onInput("d", () => {
  playTune(walk);

  setLegend(playerAlive, ...objects);
  getFirst(player).x++;
});

onInput("w", () => {
  playTune(walk);
  if(jumps<0) {jumps=0; getFirst(player).y--;}
  if(jumps) return;
  
  jumps++;
  jump().then(async () => {
    jumps--;
  });
});

onInput("a", () => {
  playTune(walk);
  setLegend(playerAliveLeft, ...objects);
  getFirst(player).x--;
});

const jump = async () => {
  await createArray(3).reduce(async (promise) => {
    await promise;

    getFirst(player).y--;
    checkIfKillablesWereTouched()
    checkDoorArrived()

    await wait(100);
  }, Promise.resolve());

  await resetGravity();
};

const resetGravity = async () => {
  await createArray(3).reduce(async (promise) => {
    await promise;

    getFirst(player).y++;

    await wait(130);
  }, Promise.resolve());
};

// gravity
setInterval(() => {
  checkIfKillablesWereTouched()
  checkDoorArrived()
  if (jumps || getFirst(player).y === 10) return;

  getFirst(player).y++;
  
}, 130);

const shake = () => {
  if (typeof document === "undefined") return;
  const gameCanvasContainer = document.querySelector(".game-canvas-container");

  gameCanvasContainer.classList.add("shake");

  setTimeout(() => {
    gameCanvasContainer.classList.remove("shake");
  }, 200);
};
                    
const killPlayer = () => {
  addText("Oops!", {
    y: 4,
    color: color`3`,
  });
  addText("killed yourself :(", {
    y: 6,
    color: color`3`,
  });

  shake();

  setLegend(playerDead, ...objects);

  setTimeout(() => {
    setLegend(playerAlive, ...objects);

    setMap(levels[level]);
    switch(level){
      case 0: 
        getFirst(player).y = 10;
        getFirst(player).x = 0;
        break;
      case 1:
        getFirst(player).y = 0;
        getFirst(player).x = 7;
        break;
      case 2:
        getFirst(player).y = 10;
        getFirst(player).x = 0;
        break;
      case 3:
        getFirst(player).y = 10;
        getFirst(player).x = 0;
        break;
      case 4:
        getFirst(player).y = 10;
        getFirst(player).x = 7;
        break;
      case 5:
        getFirst(player).y = 10;
        getFirst(player).x = 0;
        break;
        
    }
    clearText();

  }, 400);
}

const checkIfKillablesWereTouched = () => {
  const { y: playerY, x: playerX } = getFirst(player);
  
  const playerTouchedKillable = getTile(playerX, playerY).some(({ type }) =>
    killables.includes(type)
  );

  if (playerTouchedKillable) killPlayer();
}

const checkDoorArrived = () => {
  const playerArrived = tilesWith(player,goal).length;

  const playerArrivedFake = tilesWith(player,fake_goal).length;

  if(playerArrivedFake)
  {
    playTune(fake);
    addText("Wrong Door!", { y: 4, color: color`5` });
    setTimeout(() => {
  
      clearText();
    }, 500);
    
  }
  
  if (playerArrived) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      if(status=="win") return;
      playTune(win);
      addText("you win!", { y: 4, color: color`6` });
      setTimeout(() => {
    
        clearText();
        addText("press k to", { y: 4, color: color`0` });
        addText("restart the game!", { y: 6, color: color`0` });
        
      }, 800);
      status="win"
    }
  }
}

// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
    clearText("");
  }
});

onInput("k", () => {
  const currentLevel = levels[0];
  // console.log(levels[level]);
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  checkIfKillablesWereTouched();
  // count the number of tiles with goals
  const targetNumber = tilesWith(medium).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(medium, box).length;

  const playerArrived = tilesWith(player,goal).length;

  const playerArrivedFake = tilesWith(player,fake_goal).length;

  const buttonPressed = tilesWith(button, box).length;

  if(getFirst(barrier)){ 
    barrierX = getFirst(barrier).x;
    barrierY = getFirst(barrier).y;
  }

  if(barrierY) {
    uBarrierY=barrierY;
    uBarrierX=barrierX;
  }
           
  if(buttonPressed)
  {
    if(button_status == "pressed") return;
    clearTile(barrierX, barrierY);
    button_status="pressed";
  } else {
    const currentLevelCheck = levels[level];
    if(currentLevelCheck == levels[5]){
      // console.log("test")
      addSprite(uBarrierX, uBarrierY, barrier);
      button_status="unpressed";
    }
  }

  if(playerArrivedFake)
  {
    playTune(fake);
    addText("Wrong Door!", { y: 4, color: color`5` });
    setTimeout(() => {
  
      clearText();
    }, 700);
    
  }
  if (playerArrived || (targetNumber == numberCovered && targetNumber != 0 && numberCovered !=0)) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      if(status=="win") return;
      playTune(win);
      addText("you win!", { y: 4, color: color`6` });
      setTimeout(() => {
    
        clearText();
        addText("press k to", { y: 4, color: color`0` });
        addText("restart the game!", { y: 6, color: color`0` });
        
      }, 800);
      status = "win";
    }
  }
});
