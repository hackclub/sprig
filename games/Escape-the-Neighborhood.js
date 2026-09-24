/*
@title: Escape the Neighborhood
@description: A nobody has one night to cross the neighborhood and gather all the evidence against the gang that is hunting him. Grab the cash to bribe the thieves: they turn harmless and you can have them arrested. Take every piece of evidence and run, and the streets will be free again!
@author: Harjeet Singh (harciufff)
@tags: ['retro', 'action']
@addedOn: 2026-09-24

        ESCAPE THE NEIGHBORHOOD

        An ordinary man, an ordinary night.
        No gun in his pocket: only fear.
        The evidence lies scattered in the alleys,
        the thieves are looking for him in every corner.
        Bribe them with cash, take it all, run.
*/

// ---------------------------------------------------------------------------
// sprite keys
// ---------------------------------------------------------------------------
const player = "p"; // the civilian on the run
const thief1 = "a"; // Alfa, the boss
const thief2 = "b"; // Bravo, the one who cuts you off
const thief3 = "c"; // Charlie, the bruiser
const thief4 = "d"; // Delta, the coward
const wall = "w"; // brick walls of the neighborhood
const door = "m"; // door of the hideout (only thieves pass it)
const evidence = "e"; // evidence to pick up
const cash = "s"; // cash: it bribes the thieves
const background = "k"; // background: the street at night
const screenBar = "x"; // black bar of the hud frame (its bitmap is bmBackground)

// ---------------------------------------------------------------------------
// bitmaps
// Sprig palette: 0 black, 1 grey, 2 white, 3 red, 4 green, 5 blue,
// 6 yellow, 7 sky blue, 8 pink, 9 orange,
// L dark grey, C brown, D dark green, F dark yellow, H purple,
// . = transparent
// ---------------------------------------------------------------------------

// the civilian: brown hair, blue jacket, white shirt, dark tie and shoes
const bmPlayer = bitmap`
................
.....CCCCCC.....
....CCCCCCCC....
....CCCCCCCC....
....C222222C....
....C202202C....
....C222222C....
....C220022C....
.....C2222C.....
...5555555555...
..555222222555..
..55522LL22555..
..55552LL25555..
...5555LL5555...
.....55..55.....
.....LL..LL.....`;

// brown brick walls with dark grey mortar
const bmWall = bitmap`
LLLLLLLLLLLLLLLL
LCCCCCCCLCCCCCCC
LCCCCCCCLCCCCCCC
LCCCCCCCLCCCCCCC
LCCCCCCCLCCCCCCC
LCCCCCCCLCCCCCCC
LCCCCCCCLCCCCCCC
0000000000000000
LLLLLLLLLLLLLLLL
CCCCLCCCCCCCLCCC
CCCCLCCCCCCCLCCC
CCCCLCCCCCCCLCCC
CCCCLCCCCCCCLCCC
CCCCLCCCCCCCLCCC
CCCCLCCCCCCCLCCC
0000000000000000`;

// the hideout door: a red door with a brass handle
const bmDoor = bitmap`
3333333333333333
3333303333303333
3333303333303333
3333303333303333
3333303333303333
3333303333303333
3333303333303333
3333303333303333
3333303333303633
3333303333303333
3333303333303333
3333303333303333
3333303333303333
3333303333303333
3333303333303333
3333333333333333`;

// the evidence: a white paper with grey writing
const bmEvidence = bitmap`
................
................
................
................
.....222222.....
.....2LLLL2.....
.....222222.....
.....2LLLL2.....
.....222222.....
.....2LLLL2.....
.....222222.....
................
................
................
................
................`;

// the cash: a gold coin with a darker rim
const bmCash = bitmap`
................
................
................
................
....66666666....
...6666666666...
...66FFFFFF66...
...6FF6666FF6...
...6FF6666FF6...
...66FFFFFF66...
...6666666666...
....66666666....
................
................
................
................`;

// Alfa, the boss: black hair and pants, red bandana over the mouth,
// orange jail jumpsuit (like US prison overalls) with a dark grey zipper.
// The uniform is solid orange so it can never be mistaken for the white
// papers lying on the street. Hair and pants are painted in dark grey
// instead of pure black: on the black street pure black would disappear,
// which made the sprite read as disconnected blocks.
const bmThief1 = bitmap`
................
.....LLLLLL.....
....LLLLLLLL....
....LLLLLLLL....
....L111111L....
....L101101L....
....L101101L....
....L333333L....
.....111111.....
...9999999999...
..99999LL99999..
..99999LL99999..
..99999LL99999..
..999999999999..
....LLL..LLL....
....LLL..LLL....`;

// Bravo, the one who cuts you off: sky blue bandana on the same orange suit
const bmThief2 = bitmap`
................
.....LLLLLL.....
....LLLLLLLL....
....LLLLLLLL....
....L111111L....
....L101101L....
....L101101L....
....L777777L....
.....111111.....
...9999999999...
..99999LL99999..
..99999LL99999..
..99999LL99999..
..999999999999..
....LLL..LLL....
....LLL..LLL....`;

// Charlie, the bruiser: pink bandana on the same orange suit
const bmThief3 = bitmap`
................
.....LLLLLL.....
....LLLLLLLL....
....LLLLLLLL....
....L111111L....
....L101101L....
....L101101L....
....L888888L....
.....111111.....
...9999999999...
..99999LL99999..
..99999LL99999..
..99999LL99999..
..999999999999..
....LLL..LLL....
....LLL..LLL....`;

// Delta, the coward: green bandana (never orange: that is the suit colour)
const bmThief4 = bitmap`
................
.....LLLLLL.....
....LLLLLLLL....
....LLLLLLLL....
....L111111L....
....L101101L....
....L101101L....
....L444444L....
.....111111.....
...9999999999...
..99999LL99999..
..99999LL99999..
..99999LL99999..
..999999999999..
....LLL..LLL....
....LLL..LLL....`;

// a bribed thief: same jumpsuit washed out to pale grey, wide eyed and
// shaking, so orange always means "dangerous" and pale means "harmless"
const bmThiefScared = bitmap`
................
.....111111.....
....11111111....
....11111111....
....12222221....
....10022001....
....10022001....
....55555555....
.....222222.....
...2222222222...
..22222LL22222..
..22222LL22222..
..22222LL22222..
..222222222222..
....111..111....
....111..111....`;

// the street at night
const bmBackground = bitmap`
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
0000000000000000`;

// ---------------------------------------------------------------------------
// legend: it can be swapped on the fly to show the bribed thieves
// ---------------------------------------------------------------------------
const applyLegend = (bribed) => {
  setLegend(
    // first in the legend = drawn on top of every other sprite
    [screenBar, bmBackground],
    [player, bmPlayer],
    [thief1, bribed ? bmThiefScared : bmThief1],
    [thief2, bribed ? bmThiefScared : bmThief2],
    [thief3, bribed ? bmThiefScared : bmThief3],
    [thief4, bribed ? bmThiefScared : bmThief4],
    [evidence, bmEvidence],
    [cash, bmCash],
    [door, bmDoor],
    [wall, bmWall],
    [background, bmBackground],
  );
};

// ---------------------------------------------------------------------------
// the neighborhood
// Not the classic pac man maze: this is a city block. Four vertical roads
// run down columns 2, 6, 16 and 20, five avenues run across rows 3, 7, 13, 17
// and 21, and the row houses fill the space between them: two of them keep a
// courtyard, two hide a garage with the cash inside, one has a driveway
// through it, and the south one is a small park with two hedges. Rows 7 and
// 13 are the tunnels that run off both sides of the screen. In the middle
// sits the hideout of the gang: the red door is theirs only, the civilian
// cannot use it. Count in every row has to stay 23, or setMap throws.
// ---------------------------------------------------------------------------
const levels = [
  map`
ww...................ww
ww...................ww
wwwwwwwwwwwwwwwwwwwwwww
wweeeeeeeeeeeeeeeeeeeww
wwewwwewwwwwwwwwewwweww
wwewwweww.s.wwwwewwweww
wwewwweww...wwwwewwweww
eeeeeeeeeeeeeeeeeeeeeee
wwewwwewww.w.wwwewwweww
wwewwwew...a...wewwweww
wwe.swew.wwmww.wews.eww
wwewwwew.wcbdw.wewwweww
wwewwwew.wwwww.wewwweww
eeeeeeeeeeeeeeeeeeeeeee
wwewwwewwwwewwwwewwweww
wwewwweweeweweewewwweww
wwewwweweeeseeewewwweww
wweeeeeeeeepeeeeeeeeeww
wwewwwewwwwewwwwewwweww
wwewwwewwwwewwwwewwweww
wwewwwewwwwewwwwewwweww
wweeeeeeeeeeeeeeeeeeeww
wwwwwwwwwwwwwwwwwwwwwww`,
];

// a black 16x16 board used by the intro and by the end screens: on a 16x16
// map one tile is exactly one 8x8 character of the font, so every line of
// text lands right on a row of tiles
const messages = map`
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
................`;

// ---------------------------------------------------------------------------
// game state
// ---------------------------------------------------------------------------
const START_LIVES = 3;
const TICK = 110; // milliseconds per tick
const THIEF_SPEED = 3; // ticks between two steps of a thief: the civilian steps
// every two ticks, so at 3 the gang is a bit slower than him and can be
// outrun. Put 2 here to make the four of them exactly as fast as the player.
const THIEF_SPEED_BRIBED = 5; // while bribed they stumble around, easy to catch
const BRIBE_TICKS = 65; // how long the thieves stay bribed
const CHASE_TICKS = 150;
const SCATTER_TICKS = 90;

let state = "intro"; // "intro" | "playing" | "won" | "lost"
let score = 0;
let lives = START_LIVES;
let tick = 0;
let evidenceTotal = 0;
let bribed = false;
let bribeTicks = 0;
let phase = "scatter"; // "scatter" | "chase"
let phaseTicks = SCATTER_TICKS;
let wallGrid = []; // wall grid used by the AI
const direction = {}; // requested direction for the civilian

const thieves = [
  // home = where it starts, corner = where it runs to, delay = ticks before moving
  { type: thief1, home: { x: 11, y: 9 }, corner: { x: 20, y: 3 }, delay: 0, phase: 0, out: false },
  { type: thief2, home: { x: 11, y: 11 }, corner: { x: 2, y: 3 }, delay: 0, phase: 1, out: true },
  { type: thief3, home: { x: 10, y: 11 }, corner: { x: 20, y: 20 }, delay: 24, phase: 0, out: true },
  { type: thief4, home: { x: 12, y: 11 }, corner: { x: 2, y: 20 }, delay: 48, phase: 1, out: true },
];
thieves.forEach((t) => {
  t.dir = "w";
  t.speed = THIEF_SPEED;
  t.stun = 0;
  t.startDelay = t.delay;
});

const DELTA = { w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] };
const OPPOSITE = { w: "s", s: "w", a: "d", d: "a" };

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------
const inside = (x, y) => x >= 0 && y >= 0 && x < width() && y < height();
const isWall = (x, y) => !inside(x, y) || wallGrid[y][x];
const isDoor = (x, y) => inside(x, y) && getTile(x, y).some((s) => s.type === door);
const blockedForPlayer = (x, y) => isWall(x, y) || isDoor(x, y);

// builds the wall grid from the walls that are really on the map
const buildWallGrid = () => {
  wallGrid = [];
  for (let y = 0; y < height(); y++) {
    const row = [];
    for (let x = 0; x < width(); x++) row.push(false);
    wallGrid.push(row);
  }
  getAll(wall).forEach((w) => {
    wallGrid[w.y][w.x] = true;
  });
};

// nextTile: the tile reached by one step, wrapping around the side tunnels
const nextTile = (x, y, dx, dy) => {
  let nx = x + dx;
  const ny = y + dy;
  if (nx < 0) nx = width() - 1;
  else if (nx >= width()) nx = 0;
  if (ny < 0 || ny >= height()) return null;
  return { x: nx, y: ny };
};

// picks the direction that gets closer to the target, without turning back
const pickDirection = (x, y, tx, ty, current) => {
  let choice = null;
  let best = Infinity;
  ["w", "a", "s", "d"].forEach((name) => {
    if (name === OPPOSITE[current]) return;
    const delta = DELTA[name];
    const next = nextTile(x, y, delta[0], delta[1]);
    if (!next || isWall(next.x, next.y)) return;
    const dx = next.x - tx;
    const dy = next.y - ty;
    const distance = dx * dx + dy * dy;
    if (distance < best) {
      best = distance;
      choice = name;
    }
  });
  if (choice) return choice;
  // dead end: the only way left is turning back
  const back = OPPOSITE[current];
  if (!back) return null;
  const delta = DELTA[back];
  const next = nextTile(x, y, delta[0], delta[1]);
  if (next && !isWall(next.x, next.y)) return back;
  return null;
};

// ---------------------------------------------------------------------------
// interface
// ---------------------------------------------------------------------------
// the black frame: the three top rows (the two empty street rows plus the
// first wall row of the maze) and the last wall row at the bottom. Both are
// rows nobody can ever walk on, so they are pure black bars, and the two
// lines of the hud sit on the top one instead of on the maze.
const paintFrame = () => {
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < width(); x++) addSprite(x, y, screenBar);
  }
  for (let x = 0; x < width(); x++) addSprite(x, height() - 1, screenBar);
};

// the hud lives on the top bar, two lines only: the bar is exactly as tall as
// two rows of text, a third one would spill over the maze. The sprig font
// draws lowercase letters much smaller than capitals, and grey sits softer on
// the black bar than white, so the hud reads as a quiet caption instead of a
// label stuck onto the screen: the evidence line is centred (wide margins on
// both sides) and the lives/score line keeps a margin from the edges too.
const updateHud = () => {
  if (state !== "playing") return;
  clearText();
  // no x: the engine centres the line for us
  addText("evidence " + tilesWith(evidence).length, { y: 0, color: color`1` });
  addText("lives " + lives, { x: 1, y: 1, color: color`1` });
  // the score is right aligned, so a long number can never run off the screen
  const scoreLine = "score " + score;
  addText(scoreLine, { x: 19 - scoreLine.length, y: 1, color: color`1` });
};

// ---------------------------------------------------------------------------
// the civilian
// ---------------------------------------------------------------------------
const movePlayer = () => {
  const civilian = getFirst(player);
  const way = direction[player];
  if (!civilian || !way) return;
  const delta = DELTA[way];
  const next = nextTile(civilian.x, civilian.y, delta[0], delta[1]);
  if (!next || blockedForPlayer(next.x, next.y)) return;
  civilian.x = next.x;
  civilian.y = next.y;
};

// picks up whatever lies under the player
const collect = () => {
  const civilian = getFirst(player);
  if (!civilian) return;
  const items = getTile(civilian.x, civilian.y).filter((s) => s.type === evidence || s.type === cash);
  if (items.length === 0) return;
  items.forEach((item) => {
    if (item.type === evidence) {
      score += 10;
    } else {
      score += 50;
      bribeThieves();
    }
    item.remove();
  });
  updateHud();
};

// cash bribes the gang: for a while the thieves are harmless
const bribeThieves = () => {
  bribed = true;
  bribeTicks = BRIBE_TICKS;
  thieves.forEach((t) => {
    t.speed = THIEF_SPEED_BRIBED;
  });
  applyLegend(true);
};

const endBribe = () => {
  bribed = false;
  bribeTicks = 0;
  thieves.forEach((t) => {
    t.speed = THIEF_SPEED;
  });
  applyLegend(false);
};

// ---------------------------------------------------------------------------
// the thieves
// ---------------------------------------------------------------------------
const targetFor = (t, sprite) => {
  const civilian = getFirst(player);
  if (!civilian || t.out) return { x: 11, y: 9 }; // first they have to leave the hideout
  if (bribed) {
    // they run to the corner farthest from the civilian
    return { x: civilian.x < 11 ? width() - 2 : 1, y: civilian.y < 11 ? height() - 2 : 1 };
  }
  if (phase === "scatter") return t.corner;
  // in chase mode each thief has his own style
  if (t.type === thief2) {
    const delta = DELTA[direction[player] || "w"];
    return { x: civilian.x + delta[0] * 2, y: civilian.y + delta[1] * 2 };
  }
  if (t.type === thief4) {
    const dx = sprite.x - civilian.x;
    const dy = sprite.y - civilian.y;
    if (dx * dx + dy * dy < 36) return t.corner; // too close: he backs off
  }
  return { x: civilian.x, y: civilian.y };
};

const moveThief = (t) => {
  const sprite = getFirst(t.type);
  if (!sprite) return;
  if (t.stun > 0) {
    t.stun -= 1; // in jail: standing still in the hideout
    return;
  }
  if (t.delay > 0) {
    t.delay -= 1; // still has to come out of the hideout
    return;
  }
  if ((tick + t.phase) % t.speed !== 0) return;
  const goal = targetFor(t, sprite);
  const chosen = pickDirection(sprite.x, sprite.y, goal.x, goal.y, t.dir);
  if (chosen) t.dir = chosen;
  const delta = DELTA[t.dir];
  const next = nextTile(sprite.x, sprite.y, delta[0], delta[1]);
  if (!next || isWall(next.x, next.y)) return;
  sprite.x = next.x;
  sprite.y = next.y;
  if (t.out && sprite.y <= 9) t.out = false;
};

// a bribed thief gets "arrested": points and a trip back to the hideout
const arrest = (type) => {
  const t = thieves.find((x) => x.type === type);
  const sprite = getFirst(type);
  score += 200;
  if (t) {
    t.stun = 45;
    t.dir = "w";
    t.out = false;
  }
  if (sprite && t) {
    sprite.x = t.home.x;
    sprite.y = t.home.y;
  }
  updateHud();
};

// ---------------------------------------------------------------------------
// collisions, lives, end of the game
// ---------------------------------------------------------------------------
const checkCollision = () => {
  const civilian = getFirst(player);
  if (!civilian) return;
  const caught = getTile(civilian.x, civilian.y).filter((s) => thieves.some((t) => t.type === s.type));
  if (caught.length === 0) return;
  if (bribed) {
    caught.forEach((s) => arrest(s.type));
  } else {
    loseLife();
  }
};

const resetPositions = () => {
  // the civilian goes back to the start: he is recreated as a new sprite,
  // because a hand made teleport can be cancelled by the solids
  const civilian = getFirst(player);
  if (civilian) {
    civilian.remove();
    addSprite(11, 17, player);
  }
  thieves.forEach((t) => {
    const sprite = getFirst(t.type);
    if (sprite) {
      sprite.x = t.home.x;
      sprite.y = t.home.y;
    }
    t.dir = "w";
    t.stun = 0;
    t.delay = t.startDelay;
    t.out = t.home.y >= 10;
  });
  direction[player] = "";
  phase = "scatter";
  phaseTicks = SCATTER_TICKS;
  if (bribed) endBribe();
};

const loseLife = () => {
  lives -= 1;
  if (lives <= 0) {
    finish("lost");
    return;
  }
  resetPositions();
  updateHud();
};

const finish = (result) => {
  // counted before the map is swapped: setMap() takes the sprites away
  const found = evidenceTotal - tilesWith(evidence).length;
  state = result;
  direction[player] = "";
  clearText();
  setMap(messages); // black screen: it says what happened and what to do
  if (result === "won") {
    addText("YOU ESCAPED!", { y: 2, color: color`6` });
    addText("THE GANG IS IN JAIL", { y: 4, color: color`6` });
    addText("EVIDENCE FOUND:", { y: 7, color: color`2` });
    addText(String(found), { y: 8, color: color`2` });
  } else {
    addText("THEY GOT YOU!", { y: 2, color: color`3` });
    addText("THE NIGHT IS OVER", { y: 4, color: color`3` });
    addText("EVIDENCE FOUND:", { y: 7, color: color`2` });
    addText(String(found), { y: 8, color: color`2` });
  }
  addText("SCORE:" + score, { y: 10, color: color`2` });
  addText("PRESS J TO RESTART", { y: 14, color: color`6` });
};

// the game does not start by itself: first a black screen tells the story
// and what to do, and only J gets the civilian on the street
const showIntro = () => {
  state = "intro";
  direction[player] = "";
  applyLegend(false);
  setBackground(background);
  setMap(messages);
  clearText();
  addText("ESCAPE THE", { y: 0, color: color`6` });
  addText("NEIGHBORHOOD", { y: 1, color: color`6` });
  addText("YOU ARE ONE MAN,", { y: 4, color: color`2` });
  addText("NOT A HERO.", { y: 5, color: color`2` });
  addText("COLLECT EVIDENCE", { y: 7, color: color`2` });
  addText("USE THE CASH TO", { y: 8, color: color`2` });
  addText("BRIBE THE THIEVES", { y: 9, color: color`2` });
  addText("AND STAY ALIVE.", { y: 10, color: color`2` });
  addText("WASD TO MOVE", { y: 12, color: color`2` });
  addText("PRESS J TO START", { y: 14, color: color`6` });
};

// ---------------------------------------------------------------------------
// game loop
// ---------------------------------------------------------------------------
const gameTick = () => {
  if (state !== "playing") return;
  tick += 1;

  if (bribed) {
    bribeTicks -= 1;
    if (bribeTicks <= 0) endBribe();
  } else {
    phaseTicks -= 1;
    if (phaseTicks <= 0) {
      if (phase === "scatter") {
        phase = "chase";
        phaseTicks = CHASE_TICKS;
      } else {
        phase = "scatter";
        phaseTicks = SCATTER_TICKS;
      }
    }
  }

  if (tick % 2 === 0) {
    movePlayer();
    if (state === "playing") {
      collect();
      checkCollision();
    }
  }

  if (state !== "playing") return;
  thieves.forEach(moveThief);
  checkCollision();
  if (state === "playing" && tilesWith(evidence).length === 0) finish("won");
};

// ---------------------------------------------------------------------------
// controls
// ---------------------------------------------------------------------------
["w", "a", "s", "d"].forEach((key) => {
  onInput(key, () => {
    if (state !== "playing") return;
    const civilian = getFirst(player);
    if (!civilian) return;
    const delta = DELTA[key];
    const next = nextTile(civilian.x, civilian.y, delta[0], delta[1]);
    if (next && !blockedForPlayer(next.x, next.y)) direction[player] = key;
  });
});

onInput("j", () => {
  if (state !== "playing") startGame();
});

// ---------------------------------------------------------------------------
// startup
// ---------------------------------------------------------------------------
const startGame = () => {
  state = "playing";
  score = 0;
  lives = START_LIVES;
  tick = 0;
  bribed = false;
  bribeTicks = 0;
  phase = "scatter";
  phaseTicks = SCATTER_TICKS;
  direction[player] = "";
  thieves.forEach((t) => {
    t.dir = "w";
    t.stun = 0;
    t.delay = t.startDelay;
    t.out = t.home.y >= 10;
    t.speed = THIEF_SPEED;
  });
  applyLegend(false);
  setBackground(background);
  setMap(levels[0]);
  buildWallGrid();
  paintFrame();
  evidenceTotal = tilesWith(evidence).length;
  clearText();
  updateHud();
};

// walls and the civilian are solid. The hideout door is NOT solid: it is the
// thieves' way in and out, and it is the civilian only that is kept out of it
// by blockedForPlayer().
setSolids([player, wall]);
showIntro();
setInterval(gameTick, TICK);