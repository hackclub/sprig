/*
@title: Sword Move in Heaven
@author: Adapted by Grok from DaInfLoop's Generic Platformer
@tags: ['platformer']
@addedOn: 2025-03-05

Guide the holy sword through 4 heavenly levels. Avoid fire (D) and fallen angels (F) which reset you.
Collect blessings (*) for points. Reach the golden gate to advance!
Controls: W (hover up), A (left), S (dive down), D (right).
*/

// Define sprites (unchanged from previous)
const sword = "p"; const cloud = "c"; const sky = "s"; const fire = "D";
const gateTL = "["; const gateTR = "]"; const gateBL = "{"; const gateBR = "}";
const halo = "h"; const blessing = "*"; const fallen = "F";

setLegend(
  [sword, bitmap`....77777777....\n...7777777777...\n..777CCCCCC777..\n.77CCCCCCCCCC77.\n777CCC07707CCC77\n77CCCC07707CCCC7\n77CCCC07707CCCC7\n77CCCC07707CCCC7\n77CCCCCCCCCCCC77\n77CC07CCCC70CC77\n77CC70CCCC07CC77\n777CC0000CCCC777\n.77CCCCCCCCCC77.\n..777CCCCCC777..\n...7777777777...\n....77777777....`],
  [cloud, bitmap`1111111111111111\n1FFFFFFFFFFFFF11\n1FFFFFFFFFFFFF11\n1FFFFFFFFFFFFF11\n11FFFFFFFFFFFF11\n11FFFFFFFFFFFF11\n11FFFFFFFFFFFF11\n11FFFFFFFFFFFF11\n11FFFFFFFFFFFF11\n11FFFFFFFFFFFF11\n11FFFFFFFFFFFF11\n11FFFFFFFFFFFF11\n1FFFFFFFFFFFFF11\n1FFFFFFFFFFFFF11\n1FFFFFFFFFFFFF11\n1111111111111111`],
  [sky, bitmap`DDDDDDDDDDDDDDDD\nDDDDDDDDDDDDDDDD\nDDDDDDDDDDDDDDDD\nDDDDDDDDDDDDDDDD\nDDDDDDDDDDDDDDDD\nDDDDDDDDDDDDDDDD\nDDDDDDDDDDDDDDDD\nDDDDDDDDDDDDDDDD\nDDDDDDDDDDDDDDDD\nDDDDDDDDDDDDDDDD\nDDDDDDDDDDDDDDDD\nDDDDDDDDDDDDDDDD\nDDDDDDDDDDDDDDDD\nDDDDDDDDDDDDDDDD\nDDDDDDDDDDDDDDDD\nDDDDDDDDDDDDDDDD`],
  [fire, bitmap`................\n.......33.......\n......3223......\n.....321123.....\n.....321123.....\n....32211123....\n....32211123....\n...3322211123...\n...3322211123...\n..332222211123..\n..332222211123..\n.33332222211123.\n.33332222211123.\n3333333333333333\n6666666666666666\n0000000000000000`],
  [gateTL, bitmap`............4422\n...........44222\n..........442222\n.........4422222\n........44222222\n.......442222222\n......4422222222\n.....44222222222\n....442222222222\n...4422222222222\n..44222222222222\n.442222222222222\n4422222222222222\n4222222222222222\n2222222222222222\n2222222222222222`],
  [gateTR, bitmap`2244............\n22244...........\n222244..........\n2222244.........\n22222244........\n222222244.......\n2222222244......\n22222222244.....\n222222222244....\n2222222222244...\n22222222222244..\n222222222222244.\n2222222222222244\n2222222222222224\n2222222222222222\n2222222222222222`],
  [gateBL, bitmap`2222222222222222\n4222222222222222\n4422222222222222\n.442222222222222\n..44222222222222\n...4422222222222\n....442222222222\n.....44222222222\n......4422222222\n.......442222222\n........44222222\n.........4422222\n..........442222\n...........44222\n............4422\n............4422`],
  [gateBR, bitmap`2222222222222222\n2222222222222224\n2222222222222244\n222222222222244.\n22222222222244..\n2222222222244...\n222222222244....\n22222222244.....\n2222222244......\n222222244.......\n22222244........\n2222244.........\n222244..........\n22244...........\n2244............\n2244............`],
  [halo, bitmap`................\n.....FFFFF......\n....F11111F.....\n...F111111F.....\n..F11FFFF11F....\n..F1F1111F1F....\n.F1F1FFFF1F1F...\n.F1F111111F1F...\n.F1F111111F1F...\n.F1F1FFFF1F1F...\n..F1F1111F1F....\n..F11FFFF11F....\n...F111111F.....\n....F11111F.....\n.....FFFFF......\n................`],
  [blessing, bitmap`................\n................\n.....444444.....\n....44444444....\n...444FFFF444...\n...44F4444F44...\n..44F44444F44...\n..44F44444F44...\n..44F44444F44...\n..44F44444F44...\n...44F4444F44...\n...444FFFF444...\n....44444444....\n.....444444.....\n................\n................`],
  [fallen, bitmap`................\n.....666666.....\n....66666666....\n...6660000666...\n..666066606666..\n..660666660666..\n..660666660666..\n..660666660666..\n..660666660666..\n..660666660666..\n..666066606666..\n...6660000666...\n....66666666....\n.....666666.....\n................\n................`]
);

// Levels (unchanged from previous)
const levels = [
  map`ssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nsssssssssssssssFssssssss\nssssssssshssssssssssssss\nssssssssshssssssssssssss\n.......sssssssssssssssss\ns...hhhsssssssssssssssss\n....cccsssssssssssssssss\np.DcccccD.*.ccc.....[]ss\ncccccccccccccccchhhh{}cc`,
  map`ssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nsssssssFssssssssssssssss\nsssssssssssssssssssssss[\nsssssssssssssssssssssss{\nsssssssscccccsssssDsssss\np..hhhhhsss...hccccc...c\ncccccccccccccccccccccccc`,
  map`ssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nsssssssssssssssssssssss[\nsssssssssssssssssssssss{\nsssDssssssssFsssssssssss\nsss.cccsssssssssssssssss\nsss.cccc.*..hhhhhh.....c\np..cccccDccccccccccccccc\ncccccccccccccccccccccccc`,
  map`shssssssssssssssssssssss\nsssssssssssssssFssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nsssssssssssssssssssssss[\nsssssssssssssssssssssss{\nsssssssssssDssssss*sssss\np..hhhhhh..ccccc.....h.c\ncccccccccccccccccccccccc`
];

// Sound effects (unchanged)
function generateLevelCompleteSound(levelId) {
  const e = `37.5: D5^37.5,\n37.5: E5^37.5 + D5-37.5,\n37.5: F5^37.5 + E5-37.5,\n37.5: G5^37.5 + F5-37.5,\n37.5: A5^37.5 + G5-37.5,\n37.5: B5^37.5 + A5-37.5,\n37.5: B5-37.5,`.split('\n');
  return tune`37.5: C5-37.5,\n37.5,\n${e.slice(0, levelId + 1)}\n862.5`;
}
const blessingSound = tune`150: G4^150,\n150: A4^150,\n150: B4^150,\n150: C5^150`;
const resetSound = tune`100: C4-100,\n100: G3-100,\n100: E3-100`;

setSolids([sword, cloud]);

let curId = -1;
let updateIntv = -1;
let score = 0;
let isHovering = false;
let isDiving = false;

function onEnd() {
  setMap(map`ssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss\nssssssssssssssssssssssss`);
  addText(`You Ascended!\n\nScore: ${score}`, { y: 4, color: `4` });
}

function onStart(levelId = 0) {
  if (updateIntv != -1) clearInterval(updateIntv);
  if (levels[levelId] == undefined) return onEnd();
  curId = levelId;
  setMap(levels[levelId]);
  updateIntv = setInterval(onUpdate, 100); // Faster update for smoother control
  clearText();
  addText(`Score: ${score}`, { y: 0, color: `4` });
}

// Control inputs
onInput("w", () => {
  isHovering = true;
});

onInput("a", () => {
  if (!getFirst(sword)) return;
  getFirst(sword).x -= 1;
});

onInput("s", () => {
  isDiving = true;
});

onInput("d", () => {
  if (!getFirst(sword)) return;
  getFirst(sword).x += 1;
});

afterInput(() => {
  if (!getFirst(sword)) return;
  const plr = getFirst(sword);
  
  // Hover and dive logic
  if (isHovering) {
    plr.y -= 1;
    isHovering = false;
  }
  if (isDiving) {
    plr.y += 2; // Faster descent
    isDiving = false;
  }
});

// Check for goal
setInterval(() => {
  const inGoal = isCollidingAny(sword, [gateTL, gateTR, gateBL, gateBR]);
  if (inGoal) {
    playTune(generateLevelCompleteSound(curId));
    onStart(curId + 1);
  }
}, 10);

// Enemy movement
function moveFallen() {
  getAll(fallen).forEach(f => {
    const direction = Math.random() < 0.5 ? -1 : 1;
    const newX = f.x + direction;
    const tilesAtNewPos = getTile(newX, f.y);
    if (!tilesAtNewPos.some(t => t.type === cloud)) {
      f.x = newX;
    }
  });
}

function onUpdate() {
  const plr = getFirst(sword);
  if (!plr) return;

  // Halo boost
  if (isColliding(sword, halo)) {
    plr.y -= 1;
  }
  
  // Blessing collection
  if (isColliding(sword, blessing)) {
    score += 10;
    playTune(blessingSound);
    getFirst(blessing).remove();
    clearText();
    addText(`Score: ${score}`, { y: 0, color: `4` });
  }

  // Soft gravity (slower fall)
  let tilesBelow = getTile(plr.x, plr.y + 1);
  if (tilesBelow.length === 0 && !isHovering) {
    setTimeout(() => {
      plr.y += 1;
    }, 300); // Delayed fall for floaty feel
  }

  // Hazard collision
  if (isCollidingAny(sword, [fire, fallen])) {
    playTune(resetSound);
    score = Math.max(0, score - 5);
    onStart(curId);
  }

  moveFallen();
}

// Helper functions
function isColliding(tag1, tag2) {
  const obj1 = getFirst(tag1);
  if (!obj1) return false;
  let tiles = getTile(obj1.x, obj1.y);
  return tiles.some(tile => tile.type === tag2);
}

function isCollidingAny(tag, tags) {
  const obj1 = getFirst(tag);
  if (!obj1) return false;
  let tiles = getTile(obj1.x, obj1.y);
  return tiles.some(tile => tags.includes(tile.type));
}

// Start the game
onStart(0);