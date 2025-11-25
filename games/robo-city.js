/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Robo_City
@author: Kyra Rein
@tags: ['platfomer']
@addedOn: 2025-11-25
@description: Use a and d keys to move left and right, and w to jump on buildings and lampposts. Finish each level to gather materials for a computer!
*/

const player = "p"
const player_back = "b"
const player_crouch = "u"
const player_clouch = "h"
const ground = "g"
const sky = "s"
const wall_l = "l"
const roof = "r"
const window = "w"
const wall_r = "i"
const wall_m = "m"
const corner_wall = "c"
const corner_loof = "n"
const corner_roof = "e"
const goal = "a"
const light = "d"
const post = "j"
const wall_bottom = "t"
const lamp_bottom = "q"
const corner_wall_wo = "k"
const wall_l_wo = "o"
const roof_wo = "v"
const corner_loof_wo = "x"
const corner_roof_wo = "y"
const wall_r_wo = "&"
const wall_m_wo = "!"
const computer = "z"
const maxJumps = 2;

let jumping = false;
let facingRight = true;
let crouching = false;
let isDied = false;
let jumpCount = 0;

const bgm = tune`
158.73015873015873: A5-158.73015873015873 + G5/158.73015873015873,
158.73015873015873: A5-158.73015873015873,
158.73015873015873: G5-158.73015873015873,
158.73015873015873: F5-158.73015873015873 + G5/158.73015873015873,
158.73015873015873: A4/158.73015873015873,
158.73015873015873: E5-158.73015873015873 + C5/158.73015873015873,
158.73015873015873: F5-158.73015873015873,
158.73015873015873: D5-158.73015873015873,
158.73015873015873: A4/158.73015873015873,
158.73015873015873: G5-158.73015873015873 + D5/158.73015873015873,
158.73015873015873: E5/158.73015873015873,
158.73015873015873: B4-158.73015873015873,
158.73015873015873: E5-158.73015873015873 + D5/158.73015873015873,
158.73015873015873: A4/158.73015873015873,
158.73015873015873: F4-158.73015873015873 + D5-158.73015873015873,
158.73015873015873: B4/158.73015873015873,
158.73015873015873: E5-158.73015873015873,
158.73015873015873: E5/158.73015873015873,
158.73015873015873: C5/158.73015873015873,
158.73015873015873: A4-158.73015873015873 + D5/158.73015873015873,
158.73015873015873: G5-158.73015873015873 + G4/158.73015873015873,
158.73015873015873: D5-158.73015873015873,
158.73015873015873: B4/158.73015873015873,
158.73015873015873: C5-158.73015873015873,
158.73015873015873: A4/158.73015873015873 + D5/158.73015873015873,
158.73015873015873: G5-158.73015873015873,
158.73015873015873: E5-158.73015873015873,
158.73015873015873: F5-158.73015873015873,
158.73015873015873: A5-158.73015873015873 + G5/158.73015873015873,
158.73015873015873: E5/158.73015873015873,
158.73015873015873: C5/158.73015873015873,
158.73015873015873: G5-158.73015873015873 + F5/158.73015873015873`

setLegend(
  [player, bitmap`
...........3....
...........L....
....LL1111111...
....LL1993391...
...33L18039013..
....LL1903901...
....LL1333381...
....LL1333881...
....LL1111111...
.....0LLLLLL....
....3L1911119...
....3L10L111L1..
....3L110L11.LL.
.....L11L111.L..
......0L..0L....
......L1..L1....`, "player"],
  [player_back, bitmap`
....3...........
....L...........
...1111111LL....
...1933991LL....
..31093081L33...
...1093091LL....
...1833331LL....
...1883331LL....
...1111111LL....
....LLLLLL0.....
...9111191L3....
..1L111L01L3....
.LL.11L011L3....
..L.111L11L.....
....L0..L0......
....1L..1L......`, "player"],
  [player_clouch, bitmap`
................
....6...........
....L...........
...1111111LL....
...1933991LL....
..61093081L66...
...1093091LL....
...1833331LL....
...1883331LL....
...1111111LL....
....LLLLLL0.....
...9111191L3....
..1L111L01L3....
.LL.11L011L3....
..L.111L11L.....
....L0L.L00.....`, "player"],
  [player_crouch, bitmap`
................
...........6....
...........L....
....LL1111111...
....LL1993391...
...66L18039016..
....LL1903901...
....LL1333381...
....LL1333881...
....LL1111111...
.....0LLLLLL....
....3L1911119...
....3L10L111L1..
....3L110L11.LL.
.....L11L111.L..
.....00L.L0L....`, "player"],
  [ground, bitmap`
1111111111111111
1111111111111111
2222222222222222
0000000000000000
0000000000000000
0000000000000000
0066666600666666
0000000000000000
0000000000000000
0000000000000000
0000000000000000
LLLLLLLLLLLLLLLL
LLLLLLLLLLLHHHHH
HLLLLLLLLLLHLHHL
HHHLLLHHHLHHHHLL
LLHHHHHHHHHHLLLL`],
  [sky, bitmap`
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
  [wall_l, bitmap`
...8888LLLLLLL33
...8888LLLLLLLL3
...8888LLLLL3L33
...8888LLLLLLL33
...8888LLLLLLL33
...8888LLLLLLL33
...8888LLLLL3LL3
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLL33
...8888LLLLLLLL3
...8888LLLLLLLL3
...8888LLLLLLLLL
...8888LLLLLL3L3
...8888LLLLLLLL3
...8888LLLLLLLL3`],
  [wall_r, bitmap`
33LLLLLLLLL.....
3LLLLLLLLLL.....
33L3LLLLLLL.....
33LLLLLLLLL.....
33LLLLLLLLL.....
33LLLLLLLLL.....
3LL3LLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....
33LLLLLLLLL.....
3LLLLLLLLLL.....
3LLLLLLLLLL.....
LLLLLLLLLLL.....
3L3LLLLLLLL.....
3LLLLLLLLLL.....
3LLLLLLLLLL.....`],
  [wall_r_wo, bitmap`
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....`],
  [wall_l_wo, bitmap`
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL`],
  [roof, bitmap`
LLLLLLLLLLLLLLLL
1111111111111111
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
3LLLLLLLLLLLLLLL
LLLLLL3LLL3LLLLL
L3LL3LL3LLLLLL3L
LLLLLL3333333LLL
3333333333333333`],
  [roof_wo, bitmap`
LLLLLLLLLLLLLLLL
1111111111111111
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
3LLLLLLLLLLLLLLL
LL3LLLLLLLLLLLL3
L3LLLLLLLLLL3LL3`],
  [corner_wall, bitmap`
3LLLLLLLLLLLLL3L
LLLLLLLLLLLLLLLL
3LLLLLLLLLLLL3L3
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
L3LLLLLLLLLLLLL3
3LLLLLLLLLLLLLLL
LLLLLLLLLLLLLL3L
L3LLLLLLLLLLLLLL`],
  [corner_wall_wo, bitmap`
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
  [corner_loof, bitmap`
LLLLLLLLLLLLLLLL
H111111111111111
HH11111111111111
HHH1111111111111
HHHLLLLLLLLLLLLL
HHHL111111111111
.HHL118LLLLLLLLL
...1188LLLLLLLLL
...1188LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLL3LLL
...8888LLLLLLLL3
...8888LLLLLLL3L`],
  [corner_loof_wo, bitmap`
LLLLLLLLLLLLLLLL
H111111111111111
HH11111111111111
HHH1111111111111
HHHLLLLLLLLLLLLL
HHHL111111111111
.HHL118LLLLLLLLL
...1188LLLLLLLLL
...1188LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL
...8888LLLLLLLLL`],
  [corner_roof, bitmap`
LLLLLLLLLLLLLL..
11111111111111..
11111111111111..
11111111111111..
LLLLLLLLLLLLL1..
111111111111L...
LLLLLLLLLL11L...
LLLLLLLLLLL11...
LLLLLLLLLLL11...
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....
3LLLLLLLLLL.....
LLLLLLLLLLL.....
L3LLLLLLLLL.....
LL3LLLLLLLL.....`],
  [corner_roof_wo, bitmap`
LLLLLLLLLLLLLL..
11111111111111..
11111111111111..
11111111111111..
LLLLLLLLLLLLL1..
111111111111L...
LLLLLLLLLL11L...
LLLLLLLLLLL11...
LLLLLLLLLLL11...
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....
LLLLLLLLLLL.....`],
  [window, bitmap`
3333333333333323
3223332238888332
3233882238222233
3338822238222223
3382222338222223
3382222382222223
3382222382222233
3833332382222333
3888833383333388
3822888338888883
3822222238222223
3822222238222283
3882222238222283
2382222838222883
2382222838228833
3382333338883332`],
  [wall_m, bitmap`
3333333333333333
L33333LL333LL33L
LLLLLLL3LL3333LL
L3LLLLLLLLLLLLL3
LLLLLLLLL3LLLLLL
LLLLL3LLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLL3L
LLLLLLLLLLLLLLLL
LL3LLLLLLL3LL3LL
LLL3LLL333333LLL
333333333333333L`],
  [wall_m_wo, bitmap`
3LLLLLLLLLLLLLL3
3LLLLLLLLLLLL3L3
3L3LLLLLLLLLLL33
3LLLLLLLLLLLLL33
33LLLLLLLLLLLL33
33L3LLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLLLLL33
33LLLLLLLLL3LL33
33LLLLLLLLLLLLL3
3LLLLLLLLLLLLLL3
3LLL3LLLLLLLLLL3
3L3LLLLLLLLLL3L3
3LLLLLLLLLLLLLL3
3LLLLLLLLLLLLL3L`],
  [goal, bitmap`
........6.....6.
..6.....6.......
...6......D2D...
......DLDLDD2...
...D21DLDLDDD...
...D21DDDDDDD...
...D214DDDCCC...
...DDD4DDDC1C...
...4DD4DDDCCC...
.6.4DD4DDD000.6.
6..4DD4111DDD..6
...40D477D......
...444..........
........6.......
........6.......
................`],
  [light, bitmap`
..66...LL.......
..6..88LL88.6...
.66.8H....H8.6..
.6.HH......H8.6.
...H........8...
...H........8...
...H...66...8...
...H...66...8...
...H8..86..88.6.
..6.HH.86.88..6.
..66.HHHH88..66.
...66LLLLLL.66..
......LLLL......
....11111111....
...LLLLLLLLLL...
...LLLLLLLLLL...`],
  [post, bitmap`
......7717......
......1717......
......1717......
......1711......
......1711......
......1711......
......1711......
......1771......
......1171......
......1171......
......1171......
......1171......
......1771......
......1711......
......7117......
......7117......`],
  [lamp_bottom, bitmap`
.....171171.....
.....171771.....
.....171711.....
.....171771.....
.....177111.....
.....117171.....
.....117171.....
.....117171.....
.....117171.....
.....177171.....
.....171171.....
.111L171171L111.
.1L1LLLLLLLL1L1.
.1L1111111111L1.
.1LLL11111LLLL1.
..111111111111..`],
  [wall_bottom, bitmap`
333333333333333L
33333LLL333LLLLL
LLLLL3LLLLLLLLL3
LL3LLLLLLLLL3LLL
LLLLLLLLLLLLLLLL
LLLLLL3LLLLLLLLL
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
  [computer, bitmap`
................
................
...2222222222...
..12000000002...
.1120000000L2...
.1120000000L2...
.112000000LL2...
.11200000LLL2...
.1120000LLLL2...
.11200LLLLLL2...
...2222222222...
..11..1111......
.1...221111.....
.1..1222221122..
.11211111222212.
...122222211111.`],
)

const solidTypes = [
  ground,
  roof,
  corner_loof,
  corner_roof,
  wall_l,
  wall_r,
  wall_m,
  wall_bottom,
  light,
  corner_loof_wo,
  corner_roof_wo,
  roof_wo,
  wall_l_wo, 
  wall_r_wo,
  wall_m_wo,
];

setSolids(solidTypes);
let playback = playTune(bgm, Infinity)

let level = 0
const levels = [
  map`
.p............
.nre..........
.lwi...d.xre..
.om&nrej.lwi.a
.lwilwij.om&.x
.om&om&j.lwi.l
.lwilwij.om&.o
.ot&ot&q.lwi.l
gggggggggggggg`,
  map`
...............a
.......d.....nre
...nre.j.....lwi
p..lwi.j....dom&
re.om&.j....jlwi
wi.lwi.j.xrreom&
m&.om&.j.lwwilwi
wi.lwi.q.lwwiot&
gggggggggggggggg`,
  map`
.............a
p...xry......d
d...lwi......j
j.xvvry.....dj
j.lw!wi..nrejj
j.omcmi..lwijj
j.lw!wi..om&jj
q.otkt&..lwiqq
gggggggggggggg`,
  map`
.............a
............xy
.........d..o&
.p.......j..o&
.nre.d..dj..o&
.lwi.j..jj..o&
.lwi.j..jj..o&
.ot&.q..qq..o&
gggggggggggggg`,
  map`
.............a
...........nre
.........xrlwi
.........lwom&
........domlwi
...nre..jlwom&
p..lwi..jomlwi
nrrot&..qlwot&
gggggggggggggg`,
  map`
..............
..............
.p.....nrre..a
.d..nrvrewi..n
.j..lw!wimid.l
.j..omcm&wij.o
.j..lw!wimij.l
.j..omcm&wij.o
.q..lw!witiq.l
gggggggggggggg`,
  map`
p..............
nre.nre....xre.
lwi.lwi..d.lwi.
om&dom&..j.om&a
lwijlwi..j.lwid
om&jom&..j.om&j
lwijlwi..j.lwij
ot&qot&..q.ot&q
ggggggggggggggg`,
  map`
.............a
.nre.........n
plwi......d..l
dom&......j..o
jlwi..nre.j..l
jom&..lwi.j..o
jlwi..lwi.j..l
qot&..ot&.q..o
gggggggggggggg`,
  map`
.p...........a
.nre.........d
.lwi.........j
.om&..xrre..dj
.lwid.lwwi..jj
.om&j.omm&..jj
.lwij.lwwi..jj
.ot&q.ott&..qq
gggggggggggggg`,
  map`
..z...........
..d..d..d..d..
..j..j..j..j..
..j..j..j..jnr
.pj..j..j..jlw
.dj.dj.dj.djom
.jj.jj.jj.jjlw
.qq.qq.qq.qqot
gggggggggggggg`,
]
setMap(levels[level])
setBackground(sky)

let gravity = 1;
let gravityInterval = null;


setPushables({
  [ player ]: []
})

function isSolidAt(x, y) {
  const tiles = getTile(x, y);
  return tiles.some(t => solidTypes.includes(t.type));
}

function isGroundBelow(x, y) {
  return isSolidAt(x, y + 1);
}

function getPlayer() {
  return getFirst(player) || getFirst(player_back) || getFirst(player_crouch) || getFirst(player_clouch);
}

function nextLevel() {
  level++;

  if (level >= levels.length) {
    return;
  }

  setMap(levels[level]);
  isDied = false;
}

function restartLevel() {
  clearText();
  isDied = false;
  setMap(levels[level]);
}

function killPlayer() {
  isDied = true;
  addText("You Died", { x: 1, y: 1, color: color`6` });

  clearInterval(gravityInterval);
  gravityInterval = null;

  setTimeout(() => {
    restartLevel();
  }, 500);
}

function isTouchingComp(x, y) {
  const p = getPlayer();
  const frontTile = getTile(p.x, p.y);
  return frontTile.some(sprite => sprite.type === computer);
}

function applyGravity() {
  if (gravityInterval !== null) return;

  gravityInterval = setInterval(() => {

    if (isDied) {
      clearInterval(gravityInterval);
      gravityInterval = null;
      return;
    }

    const p = getPlayer();
    if (!p) {
      clearInterval(gravityInterval);
      gravityInterval = null;
      return;
    }

    if (!isGroundBelow(p.x, p.y)) {
      p.y += 1;

      const tiles = getTile(p.x, p.y);
      if (tiles.some(t => t.type === ground)) {
        killPlayer();
        return;
      }

      if (p.y >= 16) {
        killPlayer();
        return;
      }

    } else {
      const tilesBelow = getTile(p.x, p.y + 1);

      if (tilesBelow.some(t => t.type === ground)) {
        killPlayer();
        return;
      }

      clearInterval(gravityInterval);
      gravityInterval = null;
      jumping = false;
      jumpCount = 0;

      if (!crouching) p.type = facingRight ? player : player_back;
    }

  }, 100);
}

function movePlayer(dx) {
  const p = getPlayer();
  if (!p) return;

  const targetX = p.x + dx;

  if (!isSolidAt(targetX, p.y)) {
    p.x = targetX;
  }

  if (!crouching) p.type = dx > 0 ? player : player_back;
}

onInput("a", () => {
  facingRight = false;
  movePlayer(-1);
  if (!jumping) applyGravity();
});

onInput("d", () => {
  facingRight = true;
  movePlayer(1);
  if (!jumping) applyGravity();
});

onInput("w", () => {
  const p = getPlayer();
  if (!p || crouching) return;

  if (isSolidAt(p.x, p.y - 1)) return;

  if (jumpCount < maxJumps) {
    jumping = true;
    jumpCount++;

    p.y -= 1;
    p.type = facingRight ? player_crouch : player_clouch;

    setTimeout(() => {
      jumping = false;
      applyGravity();
    }, 250);
  }
});

onInput("s", () => {
  const p = getPlayer();
  if (!p || crouching) return;
  crouching = true;

  p.type = facingRight ? player_crouch : player_clouch;

  setTimeout(() => {
    const p2 = getPlayer();
    if (p2) {
      p2.type = facingRight ? player : player_back;
    }
    crouching = false;
  }, 400);
});

afterInput(() => {
  const p = getPlayer();
  if (!p) return;
  const tiles = getTile(p.x, p.y);
  if (tiles.some(t => t.type === goal)) {
    nextLevel();
    return;
  }
  if (!jumping) {
    applyGravity(p);
  }
  if (isTouchingComp(p.x, p.y)){
    addText("You win!", {
      x: 1,
      y: 1,
      color: color`6`
    })
  }
});