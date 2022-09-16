/*
@title: mini_maze_and_puzzle
@author: muhammad tsaqif mukhayyar

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
const medium = "m";
const box = "b";
const decoration = "d";
const background = "a";

const killables = [lava,trap];

let jumps = 0;

const playerDead = [
  player,
  bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLL00L0LL0LLLLL
LLLLL000000LLLLL
LL44000000044LLL
LLL4003333040LLL
LLL0000000000LLL
LLL0LLLLLLLL0LLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`,
];

const playerAlive = [
  player,
  bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLL44LLL44LLLLL
LLLL0400040LLLLL
LLLL0000000LLLLL
LLLL0033330LLLLL
LLLL40000004LLLL
LLLL40000004LLLL
LLLL40000004LLLL
LLLL0000000LLLLL
LLLL0000000LLLLL
LLLL0LLLLL0LLLLL
LLLL0LLLLL0LLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`,
];

const playerAliveLeft = [
  player,
  bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLL44LLL44LLLLL
LLLL0400040LLLLL
LLLL0000000LLLLL
LLLL0333300LLLLL
LLL40000004LLLLL
LLL40000004LLLLL
LLL40000004LLLLL
LLLL0000000LLLLL
LLLL0000000LLLLL
LLLL0LLLLL0LLLLL
LLLL0LLLLL0LLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`,
];

const objects = [
  [ trap, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
L44LLLLLLLL444LL
LL448888844488LL
LLL4LLL444L4444L
LLL84444444LL8LL
LLL8LLLL8L4L444L
LLL8444L84L4L844
L4448888848848LL
L4L8LL4L4LLL44LL
L4L8LL4L4LLLL4LL
LLL8LLL444LLL44L
LLL8LLL48L44L84L
LLL44448888448LL
444LLLLLLLLL4LLL
LLLLLLLLLLLLLLLL`],
  [ goal, bitmap`
LLLLLLLLLLLLLLLL
LL644444444444LL
LL644444444444LL
LL64444LLL4444LL
LL6444LLLLL444LL
LL644LLLLLLL44LL
LL644LLLLLLL44LL
LL644LLLLLLL44LL
LL644LLLLLLL44LL
LL6444LLLLL444LL
LL6444LLLLL444LL
LL644444444444LL
LL644444444444LL
LL666666666666LL
LL666666666666LL
LLLLLLLLLLLLLLLL`],
  [ fake_goal, bitmap`
LLLLLLLLLLLLLLLL
LL644444444444LL
LL644444444444LL
LL64444LLL4444LL
LL644LLLLLLL44LL
LL644LLLLLLL44LL
LL644LLLLLLL44LL
LL644LLLLLLL44LL
LL644LLLLLLL44LL
LL644LLLLLLL44LL
LL6444LLLLL444LL
LL644444444444LL
LL644444444444LL
LL666666666666LL
LL666666666666LL
LLLLLLLLLLLLLLLL`],
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
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL555555555555LL
LL555555555555LL
LL577775555555LL
LL577775555555LL
LL577775577775LL
LL555555577775LL
LL555555577775LL
LL555555555555LL
LL555555555555LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [ medium, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
000666666666666L
00L6LLLLLLLLL06L
00L6LLLLLLLLL06L
00L6LLLLLLLLL06L
00L6LLLLLLLLL06L
0LL6LLLLLLLLL06L
0LL6LLLLLLLLL06L
0LL6LLLLLLLLL06L
00L6LLLLLLLLL06L
00L6LLLLLLLLL06L
00L6LLLLLLLLL06L
00L6LLLLLLLLL06L
000666666666666L
LLLLLLLLLLLLLLLL`],
  [ decoration, bitmap`
LLLLL6LLLLLLLLLL
L44446LLLLLLLLLL
LLL664LLLLLLL44L
LLLLLL4LLLL6L4LL
LLLLLLLLLLLL4LLL
LLLLLLLLLLL64LLL
L4LLLLLLLLLL64LL
L44LLLLLLLLLLLLL
LL6LLLLLLLLLLLLL
LLL6LLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLL4LLL
LLLLLLLLLL64LLLL
LLLLLL444446LLLL
LLLLLLLLLL6LLLLL
LLLLLLLLLLLLLLLL`],
  [ background, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
]

setLegend(
  playerAlive,
  ...objects
);

let level = 4;
const levels = [
  map`
aaaaaaaaaaaaaad
aawwwwwwwwwwwag
taaaaaaaaaadwww
wwwwwwwwwwaddaa
dddddaaaaaaaaaa
dddaaaaaaawwwww
ddaaaaaawwwwwww
daaawwawddwwwww
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
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player,  wall, box ]);

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
  getFirst(player).y++;
});

onInput("d", () => {
  playTune(walk);
  setLegend(playerAlive, ...objects);
  getFirst(player).x++;
});

onInput("w", () => {
  playTune(walk);

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
    

    await wait(100);
  }, Promise.resolve());

  await resetGravity();
};

const resetGravity = async () => {
  await createArray(3).reduce(async (promise) => {
    await promise;

    getFirst(player).y++;

    await wait(100);
  }, Promise.resolve());
};

// gravity
setInterval(() => {
  checkIfKillablesWereTouched()
  
  if (jumps || getFirst(player).y === 10) return;

  getFirst(player).y++;
  
}, 100);

const shake = () => {
  const gameCanvasContainer = document.querySelector(".game-canvas-container");

  gameCanvasContainer.classList.add("shake");

  setTimeout(() => {
    gameCanvasContainer.classList.remove("shake");
  }, 200);
};
                    
const killPlayer = () => {
  addText("Oops!", {
    y: 4,
    color: [255, 0, 0],
  });
  addText("killed yourself :(", {
    y: 6,
    color: [255, 0, 0],
  });

  shake();

  setLegend(playerDead, ...objects);

  setTimeout(() => {
    setLegend(playerAlive, ...objects);

    console.log(level)
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

// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
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

  if(playerArrivedFake)
  {
    playTune(fake);
    addText("Wrong Door!", { y: 4, color: [0, 0, 255] });
    setTimeout(() => {
  
      clearText();
    }, 700);
    
  }
  console.log(getFirst(player));
  if (playerArrived || (targetNumber == numberCovered && targetNumber != 0 && numberCovered !=0)) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      playTune(win);
      addText("you win!", { y: 4, color: [250, 252, 0] });
      setTimeout(() => {
    
        clearText();
        addText("press j to", { y: 4, color: [0, 0, 0] });
        addText("restart the game!", { y: 6, color: [0, 0, 0] });
        
      }, 800);
    }
  }
});
