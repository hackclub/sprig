// Zap by Samvid Konchada (theamazing0)

// 2 Players compete to get to a white "goal" box in multiple rounds.
// When a player wins 3 rounds, they win the game

// Blue player moves like this:
// w  -  moves forward in direction of arrow
// s  -  turns the player clockwise

// Green player moves like this:
// k  -  moves forward in direction of arrow
// i  -  turns the player clockwise

const player10l = "q";
const player11l = "w";
const player12l = "e";
const player13l = "r";
const player20l = "t";
const player21l = "y";
const player22l = "u";
const player23l = "i";
const player10s = "o";
const player11s = "p";
const player12s = "a";
const player13s = "d";
const player20s = "f";
const player21s = "h";
const player22s = "j";
const player23s = "k";
const solid = "s";
const background = "b";
const goal = "g";

const spriteNameToType = {
  player10l: "q",
  player11l: "w",
  player12l: "e",
  player13l: "r",
  player20l: "t",
  player21l: "y",
  player22l: "u",
  player23l: "i",
  player10s: "o",
  player11s: "p",
  player12s: "a",
  player13s: "d",
  player20s: "f",
  player21s: "h",
  player22s: "j",
  player23s: "k",
};

setLegend(
  [
    player10l,
    bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLL77LLLLL1L
L1LLLL7777LLLL1L
L1LLL77LL77LLL1L
L1LL77LLLL77LL1L
L1L77LLLLLL77L1L
L1L7LLLLLLLL7L1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L11111111111111L
LLLLLLLLLLLLLLLL`,
  ],
  [
    player11l,
    bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1LLLLLLLLLLLL1L
L1LLL77LLLLLLL1L
L1LLLL77LLLLLL1L
L1LLLLL77LLLLL1L
L1LLLLLL77LLLL1L
L1LLLLLLL77LLL1L
L1LLLLLLL77LLL1L
L1LLLLLL77LLLL1L
L1LLLLL77LLLLL1L
L1LLLL77LLLLLL1L
L1LLL77LLLLLLL1L
L1LLLLLLLLLLLL1L
L11111111111111L
LLLLLLLLLLLLLLLL`,
  ],
  [
    player12l,
    bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1L7LLLLLLLL7L1L
L1L77LLLLLL77L1L
L1LL77LLLL77LL1L
L1LLL77LL77LLL1L
L1LLLL7777LLLL1L
L1LLLLL77LLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L11111111111111L
LLLLLLLLLLLLLLLL`,
  ],
  [
    player13l,
    bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1LLLLLLLLLLLL1L
L1LLLLLLL77LLL1L
L1LLLLLL77LLLL1L
L1LLLLL77LLLLL1L
L1LLLL77LLLLLL1L
L1LLL77LLLLLLL1L
L1LLL77LLLLLLL1L
L1LLLL77LLLLLL1L
L1LLLLL77LLLLL1L
L1LLLLLL77LLLL1L
L1LLLLLLL77LLL1L
L1LLLLLLLLLLLL1L
L11111111111111L
LLLLLLLLLLLLLLLL`,
  ],
  [
    player20l,
    bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLL44LLLLL1L
L1LLLL4444LLLL1L
L1LLL44LL44LLL1L
L1LL44LLLL44LL1L
L1L44LLLLLL44L1L
L1L4LLLLLLLL4L1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L11111111111111L
LLLLLLLLLLLLLLLL`,
  ],
  [
    player21l,
    bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1LLLLLLLLLLLL1L
L1LLL44LLLLLLL1L
L1LLLL44LLLLLL1L
L1LLLLL44LLLLL1L
L1LLLLLL44LLLL1L
L1LLLLLLL44LLL1L
L1LLLLLLL44LLL1L
L1LLLLLL44LLLL1L
L1LLLLL44LLLLL1L
L1LLLL44LLLLLL1L
L1LLL44LLLLLLL1L
L1LLLLLLLLLLLL1L
L11111111111111L
LLLLLLLLLLLLLLLL`,
  ],
  [
    player22l,
    bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1L4LLLLLLLL4L1L
L1L44LLLLLL44L1L
L1LL44LLLL44LL1L
L1LLL44LL44LLL1L
L1LLLL4444LLLL1L
L1LLLLL44LLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L1LLLLLLLLLLLL1L
L11111111111111L
LLLLLLLLLLLLLLLL`,
  ],
  [
    player23l,
    bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1LLLLLLLLLLLL1L
L1LLLLLLL44LLL1L
L1LLLLLL44LLLL1L
L1LLLLL44LLLLL1L
L1LLLL44LLLLLL1L
L1LLL44LLLLLLL1L
L1LLL44LLLLLLL1L
L1LLLL44LLLLLL1L
L1LLLLL44LLLLL1L
L1LLLLLL44LLLL1L
L1LLLLLLL44LLL1L
L1LLLLLLLLLLLL1L
L11111111111111L
LLLLLLLLLLLLLLLL`,
  ],
  [
    player10s,
    bitmap`
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLL77LLL........
LL7777LL........
L77LL77L........
L7LLLL7L........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........`,
  ],
  [
    player11s,
    bitmap`
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LL77LLLL........
LLL77LLL........
LLLL77LL........
LLLL77LL........
LLL77LLL........
LL77LLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........`,
  ],
  [
    player12s,
    bitmap`
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
L7LLLL7L........
L77LL77L........
LL7777LL........
LLL77LLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........`,
  ],
  [
    player13s,
    bitmap`
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLL77LL........
LLL77LLL........
LL77LLLL........
LL77LLLL........
LLL77LLL........
LLLL77LL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........
LLLLLLLL........`,
  ],
  [
    player20s,
    bitmap`
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLL44LLL
........LL4444LL
........L44LL44L
........L4LLLL4L
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL`,
  ],
  [
    player21s,
    bitmap`
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LL44LLLL
........LLL44LLL
........LLLL44LL
........LLLL44LL
........LLL44LLL
........LL44LLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL`,
  ],
  [
    player22s,
    bitmap`
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........L4LLLL4L
........L44LL44L
........LL4444LL
........LLL44LLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL`,
  ],
  [
    player23s,
    bitmap`
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLL44LL
........LLL44LLL
........LL44LLLL
........LL44LLLL
........LLL44LLL
........LLLL44LL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL
........LLLLLLLL`,
  ],
  [
    solid,
    bitmap`
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
LLLLLLLLLLLLLLLL`,
  ],
  [
    background,
    bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`,
  ],
  [
    goal,
    bitmap`
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
2222222222222222`,
  ],
);

setSolids([solid]);

const emptyScreen = map`
s`;
const levels = [
  {
    map: map`
ssssssssssssssss
ssss........ssss
sss...sssss..sss
sss...sssss...ss
sss......sss..ss
ssssss...sss...s
sssssss..sssss.s
ssss......sss..s
ss....s...sss..s
ss....s..ssss..s
ss....ssssg....s
ss...sssssg...ss
ssqt.sssssg...ss
ssssssssssssssss`,
    player1direction: 0,
    player2direction: 0,
  },
  {
    map: map`
ssssssssssssssss
seussssssssg..ss
s....ssssssss..s
sss..sssssssss.s
ssss..sssssss..s
s..ss..sssss..ss
s...ss..sss..sss
s.s..ss..s..ssss
s.ss.....s..s..s
s..ssssssss....s
ss.ss.....ss...s
ss.ss.....ssss.s
ss....sss......s
ssssssssssssssss`,
    player1direction: 2,
    player2direction: 2,
  },
  {
    map: map`
ssssssssssssssss
s..........s...s
s.ssssss.s.s.s.s
s........s...s.s
sss.ss.sssssss.s
ss..s..ss...s..s
s..s..ss..s...ss
s.ss.sss.sssssss
s..s..ss..ssssss
ss.ss.ss...sssss
ss.ss.ssss..s.gs
s..s..sssss...ss
sqsstsssssssssss
ssssssssssssssss`,
    player1direction: 0,
    player2direction: 0,
  },
  {
    map: map`
ssssssssssssssss
seusssss...sssss
s...ss...s.....s
sss..s.sssssss.s
ss..s..s...s...s
s..ss.ss.s.s.sss
s.sss......s.sss
s..sssss.sss..ss
ss..sss..ssss..s
sss..ss.ssssss.s
ssss..s..ssss..s
sssss.ss.sss..ss
sssss....sssggss
ssssssssssssssss`,
    player1direction: 2,
    player2direction: 2,
  },
  {
    map: map`
ssssssssssssssss
ssssss.rssssssss
ssss...ss...ssss
sss..sss..s..sss
ss..ss...sss..ss
s..sss.ssssss..s
s.ssssggggssss.s
s..ssssss.sss..s
ss..sss...ss..ss
sss..s..sss..sss
ssss...ss...ssss
ssssssssy.ssssss
ssssssssssssssss
ssssssssssssssss`,
    player1direction: 3,
    player2direction: 1,
  },
  {
    map: map`
ssssssssssssssss
sssss.rssy.sssss
ssss..ssss..ssss
sss..s....s..sss
ss..s..ss..s..ss
ss.s...ss...s.ss
ss...s....s...ss
ssssss.ss.ssssss
ss...s.ss.sgssss
ss.s......s....s
s..sssssssssss.s
s.s....s.....s.s
s...ss...sss...s
ssssssssssssssss`,
    player1direction: 3,
    player2direction: 1,
  },
  {
    map: map`
ssssssssssssssss
ss............ss
ss.s.ssssss.s.ss
s..s........s..s
s.ssss.ss.ssss.s
s..sss....sss..s
ss.ssss..ssss.ss
s..ssssqtssss..s
s.s...ssss...s.s
s...s.ssss.s...s
sssss..ss..sssss
ssssss.ss.ssssss
sssssg....gsssss
ssssssssssssssss`,
    player1direction: 0,
    player2direction: 0,
  },
  {
    map: map`
ssssssssssssssss
ssses.......ssss
sssus.sssss.ssss
s.......s......s
s.s.s.s.s.s.ss.s
s...s...s...ss.s
ssssssssssssss.s
ss...ssssssss..s
s..s.....s....ss
s.ssssss.s.sssss
s.ssss.......sss
s.s.gs.s.s.s.sss
s...ss...s...sss
ssssssssssssssss`,
    player1direction: 2,
    player2direction: 2,
  },
  {
    map: map`
ssssssssssssssss
s........sss...s
s.ssssss..ss.s.s
s......ss..s.s.s
ssssss..ss.....s
s....ss..sss.sss
s.s..sss..ss.sss
s.s...sss..s..ss
s.sss.ssss.ss..s
s.s...sss..sss.s
s.sqtsss..sss..s
s.sssss..sss..ss
s.......ssg..sss
ssssssssssssssss`,
    player1direction: 0,
    player2direction: 0,
  },
  {
    map: map`
ssssssssssssssss
sssssss...ssssss
ssssss..s..sssss
sssss..sss.s..rs
ssss..sss..s..is
sss..ssss.ss.sss
s...s...s....sss
s.sss.s.ssssssss
s.......ssss..gs
sssss.ssssss..gs
ss......sss..sss
ss.ss.s..s..ssss
ss....ss...sssss
ssssssssssssssss`,
    player1direction: 3,
    player2direction: 3,
  },
  {
    map: map`
ssssssssssssssss
sssss....sssssss
ssss..ss...sssss
sss..ss..s...sss
ss..ss..ssss..ss
s..ss..ssssss..s
s.sss.ssssssss.s
s..ss..s.s..s..s
ss.sss........ss
ss.ssgss..s.ssss
ss.s..ss....s.rs
ss.s.ssssss.s.is
ss...ssssss...ss
ssssssssssssssss`,
    player1direction: 3,
    player2direction: 3,
  },
  {
    map: map`
ssssssssssssssss
sssseusss...ssss
ssss..ss..s.ssss
sss...s..s..ssss
sss.sss.ss.sssss
sss.s......s...s
sss.....ssss.s.s
sss..s...sss.s.s
sgss...s..ss.s.s
s.sssssss..s.s.s
s..sssssss...s.s
ss...s...sssss.s
ssss...s.......s
ssssssssssssssss`,
    player1direction: 2,
    player2direction: 2,
  },
  {
    map: map`
ssssssssssssssss
s...s....s...sss
s.s...ss.s.s.sgs
s.ss..s......s.s
s.ss..s..s.ss..s
s.ss.sss.stss.ss
s.ss.sss.sess..s
s.ss..s..s.sss.s
s.ss..s......s.s
s.s...ss.s.s.s.s
s...s....s...s.s
s.ssssssssssss.s
s..............s
ssssssssssssssss`,
    player1direction: 2,
    player2direction: 0,
  },
  {
    map: map`
ssssssssssssssss
ss....sssss.rsss
s..ss..sss..isss
s.ssss..s..sssss
s..ssss...ssssss
ss..ssssssss...s
sss..ssssss..s.s
ssss..ssss..ss.s
sssss.sss..ss..s
ssss..ss..ss..ss
ss...ss..sgs.sss
ss.sss..ss.s.sss
ss.....sss...sss
ssssssssssssssss`,
    player1direction: 3,
    player2direction: 3,
  },
  {
    map: map`
ssssssssssssssss
ssss...........s
sss..ssss.ssss.s
s....ss....sss.s
s.ss.ss..s..ss.s
s.s...ss.ss..s.s
s.s.s.s..ss....s
s.s.s.s..s...s.s
s.s......stsss.s
s.....s.ssqsss.s
sssssss.sss....s
ssg.s....s..ssss
ssg...ss...sssss
ssssssssssssssss`,
    player1direction: 0,
    player2direction: 0,
  },
];

let player1score = 0;
let player2score = 0;
let player1direction;
let player2direction;
let playerSizes;

setBackground(background);

function showGame() {
  clearText();
  const selectedMap = levels[Math.floor(Math.random() * levels.length)];
  setMap(selectedMap.map);
  player1direction = selectedMap.player1direction;
  player2direction = selectedMap.player2direction;
  playerSizes = "l";
  inGame = true;
}

function showScore() {
  clearText();
  setMap(emptyScreen);
  addText(String(player1score), { x: 7, y: 8, color: color`7` });
  addText("-", { x: 9, y: 8, color: color`2` });
  addText(String(player2score), { x: 11, y: 8, color: color`4` });
  if (player1score == 3) {
    addText("Blue Wins!", { x: 5, y: 4, color: color`7` });
    addText("Press A", { x: 6, y: 10, color: color`2` });
    addText("to Play", { x: 6, y: 11, color: color`2` });
    addText("Again", { x: 7, y: 12, color: color`2` });
  } else if (player2score == 3) {
    addText("Green Wins!", { x: 5, y: 4, color: color`4` });
    addText("Press A", { x: 6, y: 10, color: color`2` });
    addText("to Play", { x: 6, y: 11, color: color`2` });
    addText("Again", { x: 7, y: 12, color: color`2` });
  } else if (player1score == 0 && player2score == 0) {
    addText("New Game", { x: 6, y: 4, color: color`2` })
    setTimeout(showGame, 3000);
  } else {
    addText("SCORE", { x: 7, y: 4, color: color`2` })
    setTimeout(showGame, 3000);
  }
}

function changeDirection(player) {
  const currentDirection = eval(player + "direction");
  if (currentDirection < 3) {
    eval(player + "direction" + "=" + eval(currentDirection + 1));
  } else if (currentDirection >= 3) {
    eval(player + "direction" + "=" + 0);
  }
  const oldSprite = getFirst(eval(player + currentDirection + playerSizes));
  addSprite(
    oldSprite.x,
    oldSprite.y,
    spriteNameToType[String(player + eval(player + "direction") + playerSizes)],
  );
  oldSprite.remove();
}

function movePlayer(player) {
  var direction = eval(player + "direction");
  var activePlayer = getFirst(eval(player + String(direction) + playerSizes));
  let potentialBarriers = [];
  const allSolids = getAll(solid);
  for (const potentialSolid of allSolids) {
    if (direction == 0 || direction == 2) {
      if (potentialSolid.x == activePlayer.x) {
        if (direction == 0) {
          if (potentialSolid.y < activePlayer.y) {
            potentialBarriers.push(potentialSolid);
          }
        } else if (direction == 2) {
          if (potentialSolid.y > activePlayer.y) {
            potentialBarriers.push(potentialSolid);
          }
        }
      }
    }
    if (direction == 3 || direction == 1) {
      if (potentialSolid.y == activePlayer.y) {
        if (direction == 3) {
          if (potentialSolid.x < activePlayer.x) {
            potentialBarriers.push(potentialSolid);
          }
        } else if (direction == 1) {
          if (potentialSolid.x > activePlayer.x) {
            potentialBarriers.push(potentialSolid);
          }
        }
      }
    }
  }
  if (direction == 0) {
    let closestBarrierY = 0;
    for (const potentialBarrier of potentialBarriers) {
      if (potentialBarrier.y > closestBarrierY) {
        closestBarrierY = potentialBarrier.y;
      }
    }
    activePlayer.y -= Math.abs(closestBarrierY - activePlayer.y) - 1;
  } else if (direction == 2) {
    let closestBarrierY = 20;
    for (const potentialBarrier of potentialBarriers) {
      if (potentialBarrier.y < closestBarrierY) {
        closestBarrierY = potentialBarrier.y;
      }
    }
    activePlayer.y += Math.abs(closestBarrierY - activePlayer.y) - 1;
  } else if (direction == 3) {
    let closestBarrierX = 0;
    for (const potentialBarrier of potentialBarriers) {
      if (potentialBarrier.x > closestBarrierX) {
        closestBarrierX = potentialBarrier.x;
      }
    }
    activePlayer.x -= Math.abs(closestBarrierX - activePlayer.x) - 1;
  } else if (direction == 1) {
    let closestBarrierX = 20;
    for (const potentialBarrier of potentialBarriers) {
      if (potentialBarrier.x < closestBarrierX) {
        closestBarrierX = potentialBarrier.x;
      }
    }
    activePlayer.x += Math.abs(closestBarrierX - activePlayer.x) - 1;
  }
}

onInput("w", () => {
  if (inGame) {
    movePlayer("player1");
  }
});

onInput("s", () => {
  if (inGame) {
    changeDirection("player1");
  }
});

onInput("i", () => {
  if (inGame) {
    changeDirection("player2");
  }
});

onInput("k", () => {
  if (inGame) {
    movePlayer("player2");
    
  }
});

onInput("a", () => {
  if (!inGame) {
    player1score = 0
    player2score = 0
    showScore()
  }
});

afterInput(() => {
  if (inGame) {
    const player1 = getFirst(eval("player1" + player1direction + playerSizes));
    const player2 = getFirst(eval("player2" + player2direction + playerSizes));

    if (playerSizes == "l") {
      if (player1.x == player2.x && player1.y == player2.y) {
        playerSizes = "s";
        addSprite(
          player1.x,
          player1.y,
          spriteNameToType[String("player1" + player1direction + playerSizes)],
        );
        addSprite(
          player2.x,
          player2.y,
          spriteNameToType[String("player2" + player2direction + playerSizes)],
        );
        player1.remove();
        player2.remove();
      }
    } else if (playerSizes == "s") {
      if (player1.x != player2.x || player1.y != player2.y) {
        playerSizes = "l";
        addSprite(
          player1.x,
          player1.y,
          spriteNameToType[String("player1" + player1direction + playerSizes)],
        );
        addSprite(
          player2.x,
          player2.y,
          spriteNameToType[String("player2" + player2direction + playerSizes)],
        );
        player1.remove();
        player2.remove();
      }
    }
    for (const occupiedByPlayer1 of tilesWith(
      goal,
      eval("player1" + player1direction + playerSizes),
    )) {
      player1score += 1;
      setTimeout(showScore, 1000);
    }
    for (const occupiedByPlayer2 of tilesWith(
      goal,
      eval("player2" + player2direction + playerSizes),
    )) {
      player2score += 1;
      inGame = false
      setTimeout(showScore, 500);
    }
  }
});

setMap(emptyScreen);
addText("ZAP!", { x: 8, y: 4, color: color`6` });
addText("Press A", { x: 6, y: 9, color: color`2` });
addText("to Play", { x: 6, y: 10, color: color`2` });
let inGame = false;

playTune(tune`
202.7027027027027: D4~202.7027027027027 + D5~202.7027027027027,
202.7027027027027: D4~202.7027027027027 + A4~202.7027027027027,
202.7027027027027: D4~202.7027027027027 + D5~202.7027027027027,
202.7027027027027: D4~202.7027027027027 + A4~202.7027027027027,
202.7027027027027: D4~202.7027027027027 + D5~202.7027027027027,
202.7027027027027: D4~202.7027027027027 + A4~202.7027027027027,
202.7027027027027: D4~202.7027027027027 + D5~202.7027027027027,
202.7027027027027: D4~202.7027027027027 + A4~202.7027027027027,
202.7027027027027: D4^202.7027027027027 + C5^202.7027027027027,
202.7027027027027: D4^202.7027027027027 + G4^202.7027027027027,
202.7027027027027: D4^202.7027027027027 + C5^202.7027027027027,
202.7027027027027: D4^202.7027027027027 + G4^202.7027027027027,
202.7027027027027: D4^202.7027027027027 + C5^202.7027027027027,
202.7027027027027: D4^202.7027027027027 + G4^202.7027027027027,
202.7027027027027: D4^202.7027027027027 + C5^202.7027027027027,
202.7027027027027: D4^202.7027027027027 + G4^202.7027027027027,
202.7027027027027: D5~202.7027027027027 + D4~202.7027027027027,
202.7027027027027: A4~202.7027027027027 + D4~202.7027027027027,
202.7027027027027: D5~202.7027027027027 + D4~202.7027027027027,
202.7027027027027: A4~202.7027027027027 + D4~202.7027027027027,
202.7027027027027: D5~202.7027027027027 + D4~202.7027027027027,
202.7027027027027: A4~202.7027027027027 + D4~202.7027027027027,
202.7027027027027: D5~202.7027027027027 + D4~202.7027027027027,
202.7027027027027: A4~202.7027027027027 + D4~202.7027027027027,
202.7027027027027: C5^202.7027027027027 + D4^202.7027027027027,
202.7027027027027: D4^202.7027027027027 + G4^202.7027027027027,
202.7027027027027: C5^202.7027027027027 + D4^202.7027027027027,
202.7027027027027: D4^202.7027027027027 + G4^202.7027027027027,
202.7027027027027: C5^202.7027027027027 + D4^202.7027027027027,
202.7027027027027: D4^202.7027027027027 + G4^202.7027027027027,
202.7027027027027: C5^202.7027027027027 + D4^202.7027027027027,
202.7027027027027: D4^202.7027027027027 + G4^202.7027027027027`, Infinity)
