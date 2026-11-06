/*
 * Name: A Little Birthday Adventure
 * Author: Rupak Jena
 * Description: A cozy fairytale adventure where players explore a magical meadow, meet friendly characters, collect flowers and stars, and uncover a little birthday surprise.
 * Controls: W, A, S, D to move. I to interact. J to restart.
 */


const player = "p";
const grass = "g";
const path = "d";
const water = "w";
const tree = "t";
const bush = "b";
const flower = "f";
const star = "s";
const friend = "n";
const gate = "e";

// SPRITES
setLegend(
  [player, bitmap`
................
......8888......
.....888888.....
.....889988.....
.....888888.....
......8888......
......8888......
.....888888.....
....88888888....
....88.88.88....
......88.88.....
......88.88.....
......88.88.....
.....88..88.....
................`],

  [star, bitmap`
.......6........
......666.......
.....66666......
..6.6666666.6...
...666666666....
....6666666.....
.....66666......
....6666666.....
...666666666....
..6.6666666.6...
.....66666......
......666.......
.......6........
................
................
................`],

  [grass, bitmap`
4444444444444444
4444444444444444
4444D44444444444
4444444444444444
4444444444444444
444444444D444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
444444444444D444
4444444444444444
4444444444444444
444D444444444444
4444444444444444
4444444444444444`],

  [path, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],

  [water, bitmap`
7777777777777777
7555555555555557
7555555555555557
7555755555555557
7555555555555557
7555555555555557
7555555575555557
7555555555555557
7555555555555557
7555555555555557
7555755555555557
7555555555555557
7555555555555557
7555555555555557
7555555555555557
7777777777777777`],

  [tree, bitmap`
.......DD.......
......DDDDD.....
.....DDDDDDD....
....DDDDDDDDD...
...DDDDDDDDDDD..
..DDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
..DDDDDDDDDDDDD.
...DDDDDDDDDDD..
....DDDDDDDDD...
.....DDDDDDD....
.......999......
.......999......
.......999......
......99999.....`],

  [bush, bitmap`
................
................
.....DDDD.......
...DDDDDDDD.....
..DDDDDDDDDD....
.DDDDDDDDDDDD...
.DDDDDDDDDDDD...
..DDDDDDDDDD....
...DDDDDDDD.....
.....DDDD.......
................
................
................
................
................
................`],

  [flower, bitmap`
................
................
......8..8......
.....888888.....
......8888......
.......88.......
........D.......
.......DDD......
.......DDD......
........D.......
........D.......
.......DDD......
................
................
................
................`],

  [friend, bitmap`
................
......8888......
.....888888.....
.....889988.....
.....888888.....
......8888......
.....666666.....
....66666666....
....66.66.66....
......66.66.....
......66.66.....
......66.66.....
.....66..66.....
................
................
................`],

  [gate, bitmap`
6666666666666666
6..............6
6.666666666666.6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6.6..........6.6
6.666666666666.6
6..............6
6666666666666666`]
);

setBackground(grass);

// COLLISION
setSolids([player, tree, bush, water, friend, gate]);

// GAME STATE
let flowers = 0;
let stars = 0;
let questStarted = false;
let starQuestStarted = false;
let gateUnlocked = false;
let level = 1;
let messageVersion = 0;

// UI
function updateUI() {
  clearText();

  if (level === 1) {
    if (questStarted) {
      addText("FLOWERS " + flowers + "/4", {
        x: 1,
        y: 0,
        color: color`6`
      });
    } else {
      addText("TALK TO THE GUIDE", {
        x: 1,
        y: 0,
        color: color`6`
      });
    }
  }

  if (level === 2) {
    if (starQuestStarted) {
      addText("STARS " + stars + "/2", {
        x: 1,
        y: 0,
        color: color`6`
      });
    } else {
      addText("TALK TO SPIRIT", {
        x: 1,
        y: 0,
        color: color`6`
      });
    }
  }
}

// DIALOGUE
function say(message) {
  messageVersion++;
  const currentMessage = messageVersion;

  updateUI();

  addText(message, {
    x: 1,
    y: 7,
    color: color`3`
  });

  setTimeout(() => {
    if (currentMessage === messageVersion) {
      updateUI();
    }
  }, 2000);
}

// LEVEL 1: THE LITTLE LEA
function buildLea() {
  level = 1;

  setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........`);

  // Main path
  for (let x = 1; x <= 8; x++) {
    addSprite(x, 6, path);
  }

  for (let y = 2; y <= 5; y++) {
    addSprite(8, y, path);
  }

  // Pond
  addSprite(4, 1, water);
  addSprite(5, 1, water);
  addSprite(4, 2, water);
  addSprite(5, 2, water);
  addSprite(4, 3, water);
  addSprite(5, 3, water);

  // Trees
  addSprite(1, 1, tree);
  addSprite(3, 1, tree);
  addSprite(7, 1, tree);
  addSprite(1, 4, tree);
  addSprite(9, 7, tree);

  // Bushes
  addSprite(2, 3, bush);
  addSprite(6, 3, bush);
  addSprite(3, 5, bush);
  addSprite(6, 7, bush);

  // NPC and gate
  addSprite(2, 5, friend);
  addSprite(8, 1, gate);

  // Player
  addSprite(1, 6, player);

  // Flowers appear only after NPC conversation
  if (questStarted) {
    if (flowers < 1) addSprite(2, 1, flower);
    if (flowers < 2) addSprite(2, 4, flower);
    if (flowers < 3) addSprite(5, 5, flower);
    if (flowers < 4) addSprite(7, 4, flower);
  }

  updateUI();
}

// LEVEL 2: WHISPERING WOODS
function buildWoods() {
  level = 2;

  setMap(map`
..........
..........
..........
..........
..........
..........
..........
..........`);

  // Main passage
  for (let x = 0; x <= 5; x++) {
    addSprite(x, 6, path);
  }

  for (let y = 2; y <= 6; y++) {
    addSprite(5, y, path);
  }

  for (let x = 0; x <= 9; x++) {
    addSprite(x, 2, path);
  }

  addSprite(8, 3, path);

  // Forest trees
  addSprite(0, 0, tree);
  addSprite(2, 0, tree);
  addSprite(4, 0, tree);
  addSprite(7, 0, tree);
  addSprite(9, 0, tree);

  addSprite(1, 3, tree);
  addSprite(3, 4, tree);
  addSprite(7, 5, tree);
  addSprite(9, 6, tree);

  // Bushes
  addSprite(0, 4, bush);
  addSprite(6, 4, bush);
  addSprite(9, 4, bush);
  addSprite(2, 7, bush);

  // Stars appear only after talking to spirit
  if (starQuestStarted) {
    if (stars < 1) addSprite(3, 2, star);
    if (stars < 2) addSprite(8, 3, star);
  }

  // Forest spirit
  addSprite(8, 6, friend);

  // Exit gate
  addSprite(8, 7, gate);

  // Player entrance
  addSprite(0, 6, player);

  updateUI();
}

// PLAYER MOVEMENT
function moveHero(dx, dy) {
  const hero = getFirst(player);
  if (!hero) return;

  const nx = hero.x + dx;
  const ny = hero.y + dy;

  if (nx < 0 || nx >= width() ||
      ny < 0 || ny >= height()) {
    return;
  }

  hero.x = nx;
  hero.y = ny;
}

onInput("w", () => moveHero(0, -1));
onInput("s", () => moveHero(0, 1));
onInput("a", () => moveHero(-1, 0));
onInput("d", () => moveHero(1, 0));

// NEARBY OBJECT CHECK
function near(type) {
  const hero = getFirst(player);
  if (!hero) return null;

  for (const item of getAll(type)) {
    const distance =
      Math.abs(hero.x - item.x) +
      Math.abs(hero.y - item.y);

    if (distance <= 1) {
      return item;
    }
  }

  return null;
}

// COLLECT FLOWERS AND STARS
afterInput(() => {
  const hero = getFirst(player);
  if (!hero) return;

  // Level 1 flowers
  if (level === 1 && questStarted) {
    for (const item of getAll(flower)) {
      if (hero.x === item.x && hero.y === item.y) {
        item.remove();
        flowers++;

        if (flowers === 4) {
          say("ALL 4 FOUND!");
        } else {
          say("FLOWER FOUND!");
        }
      }
    }
  }

  // Level 2 stars
  if (level === 2 && starQuestStarted) {
    for (const item of getAll(star)) {
      if (hero.x === item.x && hero.y === item.y) {
        item.remove();
        stars++;

        if (stars === 2) {
          say("ALL STARS FOUND!");
        } else {
          say("STAR FOUND!");
        }
      }
    }
  }
});

// INTERACTION
onInput("i", () => {

  // LEVEL 1: GUIDE
  if (level === 1 && near(friend)) {
    if (!questStarted) {
      questStarted = true;
      flowers = 0;

      addSprite(2, 1, flower);
      addSprite(2, 4, flower);
      addSprite(5, 5, flower);
      addSprite(7, 4, flower);

      say("FIND 4 FLOWERS!");
    } else if (flowers < 4) {
      say("KEEP LOOKING!");
    } else {
      say("WELL DONE!");
    }

    return;
  }

  // LEVEL 1: GOLDEN GATE
  if (level === 1 && near(gate)) {
    if (!questStarted) {
      say("TALK TO THE GUIDE!");
      return;
    }

    if (flowers < 4) {
      say("FIND ALL 4 FLOWERS!");
      return;
    }

    gateUnlocked = true;
    messageVersion++;

    starQuestStarted = false;
    stars = 0;

    buildWoods();
    say("WELCOME TO THE WOODS!");

    return;
  }

  // LEVEL 2: FOREST SPIRIT
  if (level === 2 && near(friend)) {
    if (!starQuestStarted) {
      starQuestStarted = true;
      stars = 0;

      addSprite(3, 2, star);
      addSprite(8, 3, star);

      say("FIND 2 STARS!");
    } else if (stars < 2) {
      say("KEEP LOOKING!");
    } else {
      say("THE WOODS THANK YOU!");
    }

    return;
  }

  // LEVEL 2: EXIT GATE
  if (level === 2 && near(gate)) {
    if (!starQuestStarted) {
      say("TALK TO THE SPIRIT!");
    } else if (stars < 2) {
      say("FIND BOTH STARS!");
    } else {
      say("LEVEL 2 COMPLETE!");
    }

    return;
  }
});

// RESTART
onInput("j", () => {
  flowers = 0;
  stars = 0;
  questStarted = false;
  starQuestStarted = false;
  gateUnlocked = false;
  messageVersion++;

  buildLea();
  say("TALK TO THE GUIDE!");
});

// START GAME
buildLea();
say("TALK TO THE GUIDE!");
