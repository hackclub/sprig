/*
@title: TINYGRID
@author: Noamismach
@description: Thirty turns to grow a tiny city. Made for the Sprig handheld.
@tags: ["strategy", "simulation"]
@addedOn: 2026-09-21
*/

// 16 x 16 sprites. Earlier legend entries draw above later entries.
setLegend(
  ["c", bitmap`
66666......66666
6..............6
6..............6
6..............6
6..............6
................
................
................
................
................
................
6..............6
6..............6
6..............6
6..............6
66666......66666`],
  ["!", bitmap`
............3333
............3233
............3233
............3233
............3333
............3233
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
  ["n", bitmap`
.......66.......
.......66.......
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
................`],
  ["u", bitmap`
................
................
................
................
................
................
................
................
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......`],
  ["x", bitmap`
................
................
................
................
................
................
................
........66666666
........66666666
................
................
................
................
................
................
................`],
  ["z", bitmap`
................
................
................
................
................
................
................
66666666........
66666666........
................
................
................
................
................
................
................`],
  ["h", bitmap`
................
................
......3333......
......3333......
....33333333....
....33333333....
..333333333333..
..333333333333..
...2222222222...
...2277222772...
...2277222772...
...2222299222...
...2222299222...
...2222299222...
................
................`],
  ["t", bitmap`
................
...3333333333...
...3333333333...
.33333333333333.
.33333333333333.
..222222222222..
..227722227722..
..227722227722..
..222222222222..
..222222222222..
..227722227722..
..227722227722..
..222229922222..
..222229922222..
..222229922222..
................`],
  ["a", bitmap`
..111111111111..
..111111111111..
...2222222222...
...2277227722...
...2277227722...
...2222222222...
...2222222222...
...2277227722...
...2277227722...
...2222222222...
...2222222222...
...2277227722...
...2277227722...
...2222992222...
...2222992222...
................`],
  ["s", bitmap`
................
................
................
................
.66336633663366.
.66336633663366.
.66336633663366.
.66336633663366.
..222222222222..
..222222222222..
..277777729992..
..277777729992..
..277777729992..
..222222229992..
..222222229992..
................`],
  ["p", bitmap`
................
.....DDDDDD.....
....4DDDDDD4....
....44444444....
..444444444444..
..444444444444..
..444444444444..
....44444444....
....44444444....
.......99.......
.......99.......
.......99.......
.......99..9999.
.66....99..9999.
................
................`],
  ["f", bitmap`
.........11111..
.........11111..
..........999...
..........999...
..........999...
..........999...
..99999...999...
..99999999999...
..999999999991..
..111111119991..
..117771177711..
..117771177711..
..117771177711..
..111111111111..
..111111111111..
................`],
  ["e", bitmap`
................
................
....LLLLLLLL....
....LLLLLLLL....
....LLLLLLLL....
..111111111111..
..111166661111..
..111166661111..
..111166661111..
..111666666111..
..111666666111..
..111116611111..
..111116611111..
..111116611111..
..111111111111..
................`],
  ["v", bitmap`
................
.....555555.....
.....555555.....
...5555555555...
...5555555555...
.55555555555555.
.55555555555555.
..222222222222..
..221122221122..
..221129921122..
..221129921122..
..221129921122..
..221129921122..
..221129921122..
................
................`],
  ["r", bitmap`
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
  ["g", bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD44DDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDD44DDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  ["w", bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7722222777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777772222277
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  ["o", bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDD111111DDDDD
DDDDD111111DDDDD
DDD1LLLLL1111DDD
DDD1LLLLL1111DDD
DDD1111111111DDD
DDD1111111111DDD
DDD1111111111DDD
DDD1111111111DDD
DDD1111111111DDD
DDD1111111111DDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  ["b", bitmap`
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
0000000000000000`]
);

// --- Rules and content --------------------------------------------------------
const WIDTH = 10, HEIGHT = 8, LAST_TURN = 30, ENTRANCE = 40;
const TYPES = ['h', 's', 'p', 'f', 'e', 'v'];
const RULES = {
  r: { name: 'ROAD', cost: 1, power: 0, jobs: 0, traffic: 0 },
  h: { name: 'HOME', cost: 3, power: 1, jobs: 0, traffic: 1 },
  s: { name: 'SHOP', cost: 5, power: 1, jobs: 3, traffic: 2 },
  p: { name: 'PARK', cost: 4, power: 0, jobs: 0, traffic: 0 },
  f: { name: 'WORKSHOP', cost: 6, power: 2, jobs: 5, traffic: 2 },
  e: { name: 'POWER STATION', cost: 8, power: 0, jobs: 0, traffic: 0 },
  v: { name: 'COMMUNITY HALL', cost: 7, power: 2, jobs: 2, traffic: 1 }
};
const TIPS = {
  h: '2 residents. Parks and shops next door help homes grow.',
  s: '3 jobs. Earns more with residents and a park next door.',
  p: 'Raises nearby home quality and land value. Needs a road.',
  f: '5 jobs and strong income. Pollutes within two tiles.',
  e: '10 power. Costs 2 credits per turn. Keep away from homes.',
  v: '2 jobs. Improves nearby homes. Costs 1 credit per turn.'
};
const MAPS = [
  { name: 'GREENBANK', note: 'OPEN LAND / EASY', rows: [
    '.........~', '.........~', '..........', '..........',
    '..........', '.........~', '........~~', '.......~~~'] },
  { name: 'RIVERBEND', note: 'RIVER / MEDIUM', rows: [
    '......~~~~', '.......~~~', '........~~', '.........~',
    '.........~', '........~~', '.......~~~', '......~~~~'] },
  { name: 'TWIN PEAKS', note: 'ROCKS / MEDIUM', rows: [
    '.....##...', '.....#....', '..........', '.....##...',
    '.....##...', '..........', '..........', '....#.....'] },
  { name: 'THE NARROWS', note: 'WETLANDS / HARD', rows: [
    '~~~....###', '~~......##', '~........#', '.........~',
    '.........~', '.....#..~~', '....##.~~~', '...###~~~~'] }
];
const EVENTS = [
  ['HEAT WAVE', 'Power demand rises by 25 percent.', 2],
  ['HOUSING BOOM', 'Homes need one less quality point to grow.', 3],
  ['QUIET HIGH STREET', 'Shop income is halved.', 2],
  ['LOCAL FESTIVAL', 'Each connected park adds extra happiness.', 2],
  ['FUEL SHORTAGE', 'Each power station costs 2 more credits per turn.', 2],
  ['MADE IN TOWN', 'Each active workshop earns 2 extra credits.', 2],
  ['HEAVY RAIN', 'Road capacity falls from 6 to 4.', 2],
  ['GENERATOR REPAIR', 'One connected station supplies half power.', 2],
  ['GREEN WEEK', 'Local pollution is halved.', 3],
  ['TOURISM SURGE', 'Shops beside parks earn 2 extra credits.', 2],
  ['BUILDING GRANT', 'Your next card costs 3 credits less.', 3],
  ['NEW NEIGHBORS', 'Residential demand and happiness rise.', 3]
];
const SYNERGIES = ['GARDEN HOMES', 'PARKSIDE CAFE', 'POWER COUPLE',
  'THE GOOD LIFE', 'LOCAL FAVORITE', 'VILLAGE GREEN'];
const MILESTONES = [10, 25, 40, 60];
const POPULATION = [0, 2, 4, 7];
const BUILD_SOUND = tune`90: C5~90, 90: E5~90, 90: G5~90`;
const ERROR_SOUND = tune`80: C3~80, 80: B2~80`;
const GROW_SOUND = tune`110: E5~110, 110: G5~110, 150: C6~150`;
const END_SOUND = tune`140: C5~140, 140: E5~140, 140: G5~140, 280: C6~280`;

// Arrays keep tile state small. Derived data is reused between turns.
const adjacent = [], depth = [], connected = [], active = [], load = [];
const pollution = [], value = [], quality = [], district = [], synergy = [];
for (let i = 0; i < 80; i++) {
  const x = i % WIDTH, y = Math.floor(i / WIDTH), around = [];
  if (x > 0) around.push(i - 1);
  if (x < WIDTH - 1) around.push(i + 1);
  if (y > 0) around.push(i - WIDTH);
  if (y < HEIGHT - 1) around.push(i + WIDTH);
  adjacent.push(around);
}
let city, stats, undo = null;
let screen = 'title', selectedMap = 0, cursor = 32, choice = 0, tool = 0;
let selected = 'h', guidePage = 0, ledgerPage = 0, returnScreen = 'title';
let notices = [], noticeIndex = 0, sound = true;

function clamp(number, min, max) { return Math.max(min, Math.min(max, number)); }
function filled(value) { return Array(80).fill(value); }
function has(list, value) { return list.indexOf(value) !== -1; }
function bitCount(mask) {
  let count = 0;
  for (let bit = 0; bit < 6; bit++) if (mask & (1 << bit)) count++;
  return count;
}
function nearby(index, type) {
  return adjacent[index].some(function (other) { return city.tiles[other] === type && active[other]; });
}
function play(melody) { if (sound) playTune(melody); }
function random() {
  city.rng = (Math.imul(city.rng, 1664525) + 1013904223) >>> 0;
  return city.rng / 4294967296;
}
function newCity(mapIndex, seed) {
  city = { tiles: MAPS[mapIndex].rows.join('').split(''), levels: filled(1),
    growth: filled(0), decline: filled(0), turn: 1, funds: 28, roads: 3,
    deck: ['h', 'p', 's'], rng: seed >>> 0, event: -1, eventLeft: 0,
    milestones: 0, happinessTotal: 0, blackouts: 0, turnsPlayed: 0, done: false };
  [40, 41, 42, 43, 33, 23].forEach(function (i) { city.tiles[i] = 'r'; });
  city.tiles[32] = 'h'; city.tiles[31] = 'p';
  city.tiles[51] = 'e'; city.tiles[53] = 's';
  undo = null; notices = []; cursor = 32; choice = 0; selected = 'h';
  calculateCity();
}
function remember() {
  undo = {};
  Object.keys(city).forEach(function (key) {
    undo[key] = Array.isArray(city[key]) ? city[key].slice() : city[key];
  });
}
function powerNeed(index) {
  const type = city.tiles[index];
  let demand = RULES[type] ? RULES[type].power : 0;
  if (type === 'h' && city.levels[index] === 3) demand = 2;
  return city.event === 0 ? demand * 1.25 : demand;
}

// --- City simulation: run after a change, never after cursor movement ---------
function calculateCity() {
  const roads = [ENTRANCE];
  stats = { population: 0, jobs: 0, parks: 0, capacity: 0, demand: 0, used: 0,
    offline: 0, blackouts: 0, congestion: 0, districts: 0, synergyMask: 0,
    housing: 0, shops: 0, industry: 0, upkeep: 0, homeCount: 0, averageValue: 0 };
  for (let i = 0; i < 80; i++) {
    depth[i] = -1; connected[i] = false; active[i] = false;
    load[i] = 0; pollution[i] = 0; value[i] = 0; quality[i] = 0;
    district[i] = false; synergy[i] = 0;
  }
  depth[ENTRANCE] = 0;
  for (let next = 0; next < roads.length; next++) {
    const i = roads[next];
    adjacent[i].forEach(function (other) {
      if (city.tiles[other] === 'r' && depth[other] < 0) {
        depth[other] = depth[i] + 1;
        roads.push(other);
      }
    });
  }
  let repairedStation = false;
  for (let i = 0; i < 80; i++) {
    const type = city.tiles[i];
    if (!RULES[type]) continue;
    connected[i] = type === 'r' ? depth[i] >= 0 : adjacent[i].some(function (n) { return depth[n] >= 0; });
    if (!connected[i]) { if (type !== 'r') stats.offline++; continue; }
    if (type === 'e') {
      stats.capacity += city.event === 7 && !repairedStation ? 5 : 10;
      repairedStation = true;
    }
    if (!powerNeed(i)) active[i] = true;
    stats.demand += powerNeed(i);
  }
  ['v', 'h', 's', 'f'].forEach(function (type) {
    for (let i = 0; i < 80; i++) {
      if (city.tiles[i] !== type || !connected[i]) continue;
      const needed = powerNeed(i);
      if (stats.used + needed <= stats.capacity) { active[i] = true; stats.used += needed; }
      else stats.blackouts++;
    }
  });
  let shopCount = 0;
  for (let i = 0; i < 80; i++) {
    if (!active[i]) continue;
    const type = city.tiles[i];
    if (type === 'h') stats.population += POPULATION[city.levels[i]];
    if (type === 'p') stats.parks++;
    if (type === 's') shopCount++;
    stats.jobs += RULES[type].jobs;
    const traffic = type === 'h' && city.levels[i] === 3 ? 2 : RULES[type].traffic;
    const links = adjacent[i].filter(function (n) { return depth[n] >= 0; });
    if (traffic) links.forEach(function (n) { load[n] += traffic / links.length; });
  }
  // A breadth-first list reversed gives downstream roads before upstream roads.
  for (let next = roads.length - 1; next > 0; next--) {
    const i = roads[next];
    const upstream = adjacent[i].filter(function (n) { return depth[n] >= 0 && depth[n] === depth[i] - 1; });
    upstream.forEach(function (n) { load[n] += load[i] / upstream.length; });
  }
  stats.roadCapacity = city.event === 6 ? 4 : 6;
  let busy = 0;
  roads.forEach(function (i) { if (i !== ENTRANCE && load[i] > stats.roadCapacity) busy++; });
  stats.congestion = Math.round(100 * busy / Math.max(1, roads.length - 1));
  findDistricts();
  for (let source = 0; source < 80; source++) {
    const type = city.tiles[source];
    if (!active[source] || (type !== 'e' && type !== 'f')) continue;
    const strength = (type === 'e' ? 3 : 2) + (district[source] ? 1 : 0);
    for (let i = 0; i < 80; i++) {
      const range = Math.abs(i % 10 - source % 10) + Math.abs(Math.floor(i / 10) - Math.floor(source / 10));
      if (range <= 2) pollution[i] += strength * (range === 2 ? 0.5 : 1) * (city.event === 8 ? 0.5 : 1);
    }
  }
  const staffing = stats.jobs ? clamp(stats.population / stats.jobs, 0.35, 1) : 1;
  stats.shopDemand = clamp(45 + stats.population * 9 - shopCount * 28, 10, 100);
  let qualitySum = 0, valueSum = 0, residentialDistricts = 0;
  for (let i = 0; i < 80; i++) {
    const type = city.tiles[i], park = nearby(i, 'p'), shop = nearby(i, 's'), civic = nearby(i, 'v');
    const congested = adjacent[i].some(function (n) { return n !== ENTRANCE && depth[n] >= 0 && load[n] > stats.roadCapacity; });
    pollution[i] = Math.max(0, pollution[i] - (park ? 1 : 0));
    value[i] = clamp(1 + (connected[i] ? 1 : 0) + (park ? 2 : 0) + (civic ? 2 : 0)
      + (shop ? 1 : 0) - Math.ceil(pollution[i]) - (congested ? 1 : 0), 0, 5);
    if (type === 'h') {
      quality[i] = (connected[i] ? 1 : -1) + (active[i] ? 1 : -2) + (park ? 1 : 0)
        + (shop ? 1 : 0) + (civic ? 1 : 0) + (value[i] >= 4 ? 1 : 0)
        - (congested ? 1 : 0) - (nearby(i, 'f') ? 2 : 0) - (pollution[i] > 1 ? 1 : 0);
      stats.homeCount++; qualitySum += quality[i]; valueSum += value[i];
    }
    if (!active[i]) continue;
    const homes = adjacent[i].filter(function (n) { return city.tiles[n] === 'h' && active[n]; }).length;
    if (type === 'h' && park) synergy[i] |= 1;
    if (type === 's' && park) synergy[i] |= 2;
    if (type === 'f' && nearby(i, 'e')) synergy[i] |= 4;
    if (type === 'h' && park && civic) synergy[i] |= 8;
    if (type === 's' && homes >= 2) synergy[i] |= 16;
    if (type === 'h' && park && district[i]) synergy[i] |= 32;
    stats.synergyMask |= synergy[i];
    if (type === 'h') {
      stats.housing += POPULATION[city.levels[i]] * 0.55 + value[i] * 0.15;
      if (district[i]) residentialDistricts++;
    }
    if (type === 's') {
      let income = 4 * staffing * (0.5 + stats.shopDemand / 200) * (congested ? 0.75 : 1)
        + (park ? 1 : 0) + (homes >= 2 ? 1 : 0) + (district[i] ? 1 : 0);
      if (city.event === 2) income *= 0.5;
      if (city.event === 9 && park) income += 2;
      stats.shops += income;
    }
    if (type === 'f') stats.industry += 6 * staffing + (nearby(i, 'e') ? 1 : 0)
      + (district[i] ? 1 : 0) + (city.event === 5 ? 2 : 0);
    if (type === 'e') stats.upkeep += city.event === 4 ? 4 : 2;
    if (type === 'v') stats.upkeep++;
  }
  const employment = stats.population ? Math.min(1, stats.jobs / stats.population) : 1;
  const averageQuality = stats.homeCount ? qualitySum / stats.homeCount : 2;
  stats.happiness = clamp(Math.round(58 + averageQuality * 6 + Math.min(stats.parks, 5) * 2
    - (1 - employment) * 16 - stats.blackouts * 5 - stats.offline * 2 - stats.congestion * 0.15
    + Math.min(9, residentialDistricts) + (city.event === 3 ? stats.parks * 3 : 0)
    + (city.event === 11 ? 5 : 0)), 0, 100);
  stats.averageValue = stats.homeCount ? valueSum / stats.homeCount : 0;
  stats.pollution = pollution.reduce(function (sum, n) { return sum + n; }, 0) / 80;
  stats.homeDemand = clamp(Math.round(45 + (stats.jobs - stats.population) * 7
    + (stats.happiness - 70) * 0.6 + (city.event === 11 ? 25 : 0)), 10, 100);
  stats.jobDemand = clamp(40 + (stats.population - stats.jobs) * 8, 10, 100);
  stats.housing = Math.round(stats.housing); stats.shops = Math.round(stats.shops);
  stats.industry = Math.round(stats.industry);
  stats.income = 3 + stats.housing + stats.shops + stats.industry - stats.upkeep;
}

function findDistricts() {
  const visited = filled(false);
  for (let i = 0; i < 80; i++) {
    const type = city.tiles[i];
    if (visited[i] || !active[i] || !has(['h', 's', 'f'], type)) continue;
    const group = [i]; visited[i] = true;
    for (let next = 0; next < group.length; next++) {
      adjacent[group[next]].forEach(function (n) {
        if (!visited[n] && active[n] && city.tiles[n] === type) { visited[n] = true; group.push(n); }
      });
    }
    if (group.length < 3) continue;
    stats.districts++;
    group.forEach(function (n) { district[n] = true; });
  }
}

// --- Turns, the card deck, and the one-action undo -----------------------------
function cardCost(type) { return Math.max(0, RULES[type].cost - (city.event === 10 && type !== 'r' ? 3 : 0)); }
function placementIssue(type, index) {
  if (city.done) return 'CITY COMPLETE';
  if (index < 0 || index >= 80 || index !== Math.floor(index)) return 'OUTSIDE THE MAP';
  if (type === 'clear') {
    if (index === ENTRANCE) return 'KEEP THE ENTRANCE';
    if (!RULES[city.tiles[index]]) return 'NOTHING TO CLEAR';
    if (!city.roads) return 'NO ROAD ACTIONS';
    return city.funds < 2 ? 'NEED 2 CREDITS' : '';
  }
  if (!RULES[type]) return 'CHOOSE A CARD';
  if (type !== 'r' && !has(city.deck, type)) return 'CARD NOT IN HAND';
  if (city.tiles[index] !== '.') return RULES[city.tiles[index]] ? 'TILE OCCUPIED' : 'PROTECTED TERRAIN';
  if (type === 'r' && !city.roads) return 'NO ROAD ACTIONS';
  return city.funds < cardCost(type) ? 'NOT ENOUGH CREDITS' : '';
}
function dealCards() {
  const pool = TYPES.slice(0, city.milestones ? 6 : 5);
  const weights = { h: 4 + stats.homeDemand / 20, s: 3 + stats.shopDemand / 25,
    p: stats.happiness < 70 ? 6 : 4, f: 2 + stats.jobDemand / 25,
    e: stats.capacity - stats.demand < 3 ? 12 : 2, v: 4 };
  city.deck = [];
  while (city.deck.length < 3) {
    let roll = random() * pool.reduce(function (sum, type) { return sum + weights[type]; }, 0);
    for (let i = 0; i < pool.length; i++) {
      roll -= weights[pool[i]];
      if (roll <= 0 || i === pool.length - 1) { city.deck.push(pool[i]); pool.splice(i, 1); break; }
    }
  }
}
function finishTurn() {
  let upgrades = 0, declines = 0;
  calculateCity();
  for (let i = 0; i < 80; i++) {
    if (city.tiles[i] !== 'h') continue;
    const threshold = (city.levels[i] === 1 ? 3 : 5) - (city.event === 1 ? 1 : 0);
    const canGrow = city.levels[i] < 3 && (city.levels[i] === 1 || city.milestones >= 2);
    city.growth[i] = active[i] && quality[i] >= threshold && canGrow ? city.growth[i] + 1 : 0;
    city.decline[i] = !active[i] || quality[i] < 1 ? city.decline[i] + 1 : 0;
    if (city.growth[i] >= 2) { city.levels[i]++; city.growth[i] = 0; upgrades++; }
    else if (city.decline[i] >= 2 && city.levels[i] > 1) { city.levels[i]--; city.decline[i] = 0; declines++; }
  }
  calculateCity();
  city.funds += stats.income; city.happinessTotal += stats.happiness; city.turnsPlayed++;
  if (stats.blackouts) city.blackouts++;
  if (upgrades) notices.push(upgrades + ' homes grew. Good neighbors make room for more people.');
  if (declines) notices.push(declines + ' homes declined. Check road access, power and local quality.');
  while (city.milestones < 4 && stats.population >= MILESTONES[city.milestones]) {
    const reward = [5, 8, 10, 15][city.milestones];
    city.funds += reward; city.milestones++;
    notices.push('Population ' + MILESTONES[city.milestones - 1] + '! C' + reward + ' awarded. '
      + ['Community halls unlocked.', 'Apartments unlocked.', 'Your town is thriving.', 'A tiny metropolis!'][city.milestones - 1]);
  }
  if (city.event >= 0 && --city.eventLeft <= 0) city.event = -1;
  if (city.turn === LAST_TURN) { city.done = true; city.event = -1; calculateCity(); return; }
  city.turn++; city.roads = 3;
  if (city.event < 0 && city.turn >= 5 && random() < 0.23) {
    city.event = Math.floor(random() * EVENTS.length); city.eventLeft = EVENTS[city.event][2];
    notices.push(EVENTS[city.event][0] + '. ' + EVENTS[city.event][1] + ' Lasts ' + city.eventLeft + ' turns.');
  }
  calculateCity(); dealCards();
}
function perform(type, index) {
  if (type === 'pass' ? city.done : placementIssue(type, index)) { play(ERROR_SOUND); return false; }
  remember(); notices = []; noticeIndex = 0;
  if (type === 'pass') finishTurn();
  else {
    city.funds -= type === 'clear' ? 2 : cardCost(type);
    city.tiles[index] = type === 'clear' ? '.' : type;
    city.levels[index] = 1; city.growth[index] = 0; city.decline[index] = 0;
    if (type === 'r' || type === 'clear') { city.roads--; calculateCity(); }
    else { if (city.event === 10) city.event = -1; finishTurn(); }
  }
  choice = 0;
  if (city.done) { screen = 'results'; play(END_SOUND); }
  else if (type === 'r' || type === 'clear') { screen = city.roads ? 'place' : 'city'; play(BUILD_SOUND); }
  else { screen = notices.length ? 'news' : 'cards'; play(notices.length ? GROW_SOUND : BUILD_SOUND); }
  return true;
}
function finalScore() {
  const happy = Math.round(city.happinessTotal / Math.max(1, city.turnsPlayed));
  const parts = [stats.population * 30, happy * 10, clamp(city.funds, 0, 150) * 2,
    Math.round(stats.averageValue * 60), stats.districts * 100 + bitCount(stats.synergyMask) * 40,
    -Math.round(stats.pollution * 35 + stats.congestion * 2 + city.blackouts * 10)];
  return { parts: parts, happiness: happy, total: Math.max(0, parts.reduce(function (a, b) { return a + b; }, 0)) };
}

// --- A 160 x 128 interface: 20 text columns, 16 rows ----------------------------
function text(label, row, shade, column) {
  const x = column === undefined ? 1 : column;
  addText(String(label).slice(0, 20 - x), { x: x, y: row, color: shade || '2' });
}
function compact(number) { return Math.abs(number) < 1000 ? String(number) : (number / 1000).toFixed(1) + 'k'; }
function wrapped(message, firstRow, lastRow) {
  const words = message.split(' '); let line = '', row = firstRow;
  words.forEach(function (word) {
    if ((line + word).length > 18) { if (row <= lastRow) text(line.trim(), row++); line = ''; }
    line += word + ' ';
  });
  if (line && row <= lastRow) text(line.trim(), row);
}
function blank() { clearText(); setMap(Array(8).fill('bbbbbbbbbb').join('\n')); }
function coordinate() { return String.fromCharCode(65 + cursor % 10) + (Math.floor(cursor / 10) + 1); }
function tileName(index) {
  const type = city.tiles[index];
  if (index === ENTRANCE) return 'CITY ENTRANCE';
  if (type === 'h') return ['', 'HOME', 'TOWNHOUSE', 'APARTMENTS'][city.levels[index]];
  return RULES[type] ? RULES[type].name : type === '.' ? 'OPEN LAND' : type === '~' ? 'WATER' : 'ROCK';
}
function spriteKey(index) { return city.tiles[index] === 'h' ? ['', 'h', 't', 'a'][city.levels[index]] : city.tiles[index]; }
function drawCity() {
  blank();
  const top = clamp(Math.floor(cursor / 10) - 3, 0, 2);
  for (let y = 0; y < 6; y++) {
    for (let x = 0; x < 10; x++) {
      const i = (y + top) * 10 + x, type = city.tiles[i];
      clearTile(x, y + 1);
      addSprite(x, y + 1, type === '~' ? 'w' : type === '#' ? 'o' : 'g');
      if (RULES[type]) {
        addSprite(x, y + 1, spriteKey(i));
        if (type === 'r') drawRoadLines(i, x, y + 1);
        else if (!active[i]) addSprite(x, y + 1, '!');
      }
    }
  }
  const cursorY = Math.floor(cursor / 10) - top + 1;
  if (screen === 'place' && selected !== 'clear' && !placementIssue(selected, cursor)) addSprite(cursor % 10, cursorY, selected);
  addSprite(cursor % 10, cursorY, 'c');
  text('C' + compact(city.funds) + ' P' + stats.population + ' T' + city.turn + '/30', 0, '2', 0);
  const status = stats.blackouts ? ' POWER LOW' : stats.offline ? ' OFFLINE ' + stats.offline : ' H' + stats.happiness;
  text('E' + Math.ceil(stats.demand) + '/' + stats.capacity + status, 1, stats.blackouts || stats.offline ? '6' : '4', 0);
  if (screen === 'place') {
    const issue = placementIssue(selected, cursor);
    text(issue || (selected === 'clear' ? 'CLEAR C2' : RULES[selected].name + ' C' + cardCost(selected)), 14, issue ? '6' : '4', 0);
    text('J PLAN K BACK ' + coordinate(), 15, '2', 0);
  } else {
    text('J CARDS I INSPECT', 14, '4', 0);
    text('L TOOLS K GUIDE ' + coordinate(), 15, '2', 0);
  }
}
function drawRoadLines(index, x, y) {
  if (index === ENTRANCE || (index % 10 > 0 && city.tiles[index - 1] === 'r')) addSprite(x, y, 'z');
  if (index % 10 < 9 && city.tiles[index + 1] === 'r') addSprite(x, y, 'x');
  if (index >= 10 && city.tiles[index - 10] === 'r') addSprite(x, y, 'n');
  if (index < 70 && city.tiles[index + 10] === 'r') addSprite(x, y, 'u');
}
function drawCards() {
  text('TURN ' + city.turn + '   C' + compact(city.funds), 0, '4');
  city.deck.forEach(function (type, i) {
    addSprite(1, i + 1, type);
    text((i === choice ? '>' : ' ') + RULES[type].name, 3 + i * 2, i === choice ? '6' : '2', 5);
    text('C' + cardCost(type), 4 + i * 2, city.funds >= cardCost(type) ? '4' : '3', 6);
  });
  wrapped(TIPS[city.deck[choice]], 9, 12);
  text('I/L CHOOSE J PLAN', 14, '4'); text('K CITY / WASD PICK', 15);
}
function drawConfirmation() {
  text(coordinate() + '  CHECK YOUR PLAN', 0, '4');
  text(selected === 'clear' ? 'CLEAR TILE' : RULES[selected].name, 2, '6');
  text('COST C' + (selected === 'clear' ? 2 : cardCost(selected)), 4);
  const road = adjacent[cursor].some(function (i) { return depth[i] >= 0; });
  if (selected === 'clear') wrapped('Clearing a road can disconnect its neighbors.', 6, 9);
  else {
    text(road ? 'ROAD CONNECTED' : 'NO ROAD: OFFLINE', 6, road ? '4' : '3');
    const needed = RULES[selected].power * (city.event === 0 ? 1.25 : 1);
    text(stats.demand + needed <= stats.capacity || !needed ? 'POWER AVAILABLE' : 'POWER SHORTAGE', 8, stats.demand + needed <= stats.capacity || !needed ? '4' : '6');
    if (selected === 'e') text('10 POWER C2 UPKEEP', 10, '4');
    else text('LOCAL VALUE ' + value[cursor] + '/5', 10);
  }
  text(selected === 'r' || selected === 'clear' ? 'USES 1 ROAD ACTION' : 'ENDS TURN + INCOME', 12, '6');
  text('J BUILD   K BACK', 14, '4');
}
function drawInspect() {
  const type = city.tiles[cursor];
  text(tileName(cursor), 0, '4'); text(coordinate(), 2, '6');
  text(!RULES[type] ? 'NATURAL TERRAIN' : !connected[cursor] ? 'NEEDS A ROAD' : !active[cursor] ? 'NEEDS POWER' : 'CONNECTED + ACTIVE', 3, active[cursor] ? '4' : '6');
  if (type === 'r') {
    text('LOAD ' + Math.round(load[cursor]) + '/' + (cursor === ENTRANCE ? 'INF' : stats.roadCapacity), 5);
    wrapped('Parallel routes share traffic. The west entrance is unlimited.', 8, 12);
  } else {
    text('POWER ' + powerNeed(cursor) + ' JOBS ' + (active[cursor] ? RULES[type].jobs : 0), 5);
    text('LAND VALUE ' + value[cursor] + '/5', 6);
    text('POLLUTION ' + pollution[cursor].toFixed(1), 7);
    if (type === 'h') {
      text('POP ' + (active[cursor] ? POPULATION[city.levels[cursor]] : 0) + ' QUALITY ' + quality[cursor], 9);
      text(city.levels[cursor] === 3 ? 'FULLY GROWN' : city.levels[cursor] === 2 && city.milestones < 2 ? '25 POP FOR UPGRADES' : 'GROWTH ' + city.growth[cursor] + '/2 TURNS', 10, '6');
    }
    for (let bit = 0; bit < 6; bit++) if (synergy[cursor] & (1 << bit)) { text(SYNERGIES[bit], 12, '4'); break; }
  }
  text('J/K BACK', 14, '4');
}
function drawLedger() {
  text('CITY LEDGER ' + (ledgerPage + 1) + '/3', 0, '4');
  const pages = [
    ['POP ' + stats.population + ' JOBS ' + stats.jobs, 'HAPPINESS ' + stats.happiness + '%',
      'POWER ' + Math.ceil(stats.demand) + '/' + stats.capacity, 'BUSY ROADS ' + stats.congestion + '%',
      'OFFLINE ' + (stats.offline + stats.blackouts), 'DISTRICTS ' + stats.districts],
    ['MUNICIPAL GRANT +3', 'HOME TAX +' + stats.housing, 'SHOPS +' + stats.shops,
      'INDUSTRY +' + stats.industry, 'UPKEEP -' + stats.upkeep, 'NET ' + (stats.income >= 0 ? '+' : '') + stats.income],
    ['HOME DEMAND ' + stats.homeDemand, 'SHOP DEMAND ' + stats.shopDemand, 'JOB DEMAND ' + stats.jobDemand,
      'LAND VALUE ' + stats.averageValue.toFixed(1), 'SYNERGIES ' + bitCount(stats.synergyMask) + '/6', 'SCORE ' + finalScore().total]
  ];
  pages[ledgerPage].forEach(function (line, i) { text(line, 3 + i); });
  if (city.event >= 0) { text(EVENTS[city.event][0], 10, '6'); text(city.eventLeft + ' TURNS LEFT', 11, '6'); }
  text('I/L PAGE  K BACK', 14, '4');
}
const GUIDE = [
  'Choose one of three cards. WASD moves on the map. J previews, then J builds. K goes back. A card ends the turn.',
  'Buildings need a road linked to the west entrance. L opens tools. Build 3 roads per turn. Roads keep your cards.',
  'C means credits. E is power. P is population. H is happiness. Each turn pays 3 credits plus income minus upkeep.',
  'Homes grow after 2 good turns. Quality 3 gives townhouses. Quality 5 gives apartments after 25 population.',
  'Parks, shops and halls help homes next door. No diagonals. Keep power stations and workshops away from homes.',
  'Three active homes, shops or workshops form districts. Roads carry 6 traffic. More routes spread the load.',
  'At 10 people, civic halls unlock. At 25, apartments unlock. Try different maps. Your score arrives after 30 turns.'
];
function draw() {
  if (screen === 'city' || screen === 'place') { drawCity(); return; }
  blank();
  if (screen === 'title') {
    text('T I N Y G R I D', 2, '4', 2); text('BUILD SMALL.', 4, '2', 4); text('THINK BIG.', 5, '2', 4);
    addSprite(3, 4, 'h'); addSprite(4, 4, 'p'); addSprite(5, 4, 'a'); addSprite(6, 4, 's');
    text(MAPS[selectedMap].name, 10, '6'); text(MAPS[selectedMap].note, 11);
    text('I/L MAP   J START', 13, '4'); text('K FIELD GUIDE', 15);
  } else if (screen === 'cards') drawCards();
  else if (screen === 'confirm') drawConfirmation();
  else if (screen === 'inspect') drawInspect();
  else if (screen === 'ledger') drawLedger();
  else if (screen === 'tools') {
    text('THE TOOL SHED', 0, '4'); text(city.roads + '/3 ROAD ACTIONS', 2, '6');
    ['ROAD C1', 'CLEAR TILE C2', 'PASS + INCOME', 'CITY LEDGER', 'UNDO ACTION', 'FIELD GUIDE',
      sound ? 'SOUND ON' : 'SOUND OFF', 'NEW CITY'].forEach(function (label, i) {
      text((tool === i ? '> ' : '  ') + label, 4 + i, tool === i ? '6' : '2');
    });
    text('I/L CHOOSE J DO', 14, '4'); text('K BACK', 15);
  } else if (screen === 'guide') {
    text('FIELD GUIDE ' + (guidePage + 1) + '/7', 1, '4'); wrapped(GUIDE[guidePage], 4, 12);
    text('I/L PAGE K BACK', 14, '6');
  } else if (screen === 'news') {
    text('NEIGHBORHOOD NEWS', 1, '4'); wrapped(notices[noticeIndex], 4, 12);
    text('J/K CONTINUE', 14, '6');
  } else if (screen === 'restart') {
    text('A FRESH BEGINNING?', 2, '6'); wrapped('Start over? This city will be lost. K returns to your city.', 6, 11);
    text('J NEW CITY  K BACK', 14, '4');
  } else if (screen === 'results') {
    const score = finalScore();
    text('CITY COMPLETE', 1, '4'); text('SCORE ' + score.total, 3, '6');
    text('PEOPLE ' + stats.population, 6); text('AVG HAPPINESS ' + score.happiness, 7);
    text('DISTRICTS ' + stats.districts, 8); text('DISCOVERIES ' + bitCount(stats.synergyMask), 9);
    text(score.total >= 3000 ? 'TINY METROPOLIS' : score.total >= 2000 ? 'A THRIVING TOWN' : 'A TOWN WITH HEART', 11, '4');
    text('J NEW  K VIEW CITY', 14, '6');
  }
}

// --- Eight buttons, with the same confirm/back pair on every screen -----------
function input(key) {
  const direction = key === 'i' || key === 'a' || key === 'w' ? -1 : key === 'l' || key === 'd' || key === 's' ? 1 : 0;
  if ((screen === 'place' || screen === 'city') && has(['w', 'a', 's', 'd'], key)) {
    const dx = key === 'a' ? -1 : key === 'd' ? 1 : 0;
    const dy = key === 'w' ? -1 : key === 's' ? 1 : 0;
    cursor = clamp(cursor % 10 + dx, 0, 9) + clamp(Math.floor(cursor / 10) + dy, 0, 7) * 10;
    return;
  }
  if (screen === 'title') {
    selectedMap = (selectedMap + direction + 4) % 4;
    if (key === 'j') { newCity(selectedMap, Math.floor(Math.random() * 4294967296)); screen = 'cards'; }
    if (key === 'k') { returnScreen = 'title'; screen = 'guide'; }
  } else if (screen === 'cards') {
    choice = (choice + direction + 3) % 3;
    if (key === 'j') { selected = city.deck[choice]; screen = 'place'; }
    if (key === 'k') screen = 'city';
  } else if (screen === 'place') {
    if (key === 'j') { if (placementIssue(selected, cursor)) play(ERROR_SOUND); else screen = 'confirm'; }
    if (key === 'k') screen = 'cards';
    if (key === 'i') { returnScreen = 'place'; screen = 'inspect'; }
  } else if (screen === 'confirm') {
    if (key === 'j') perform(selected, cursor);
    if (key === 'k') screen = 'place';
  } else if (screen === 'city') {
    if (key === 'j') screen = city.done ? 'results' : 'cards';
    if (key === 'i') { returnScreen = 'city'; screen = 'inspect'; }
    if (key === 'l') screen = city.done ? 'ledger' : 'tools';
    if (key === 'k') { returnScreen = 'city'; screen = 'guide'; }
  } else if (screen === 'tools') {
    tool = (tool + direction + 8) % 8;
    if (key === 'k') screen = 'city';
    if (key === 'j') {
      if (tool < 2) { selected = tool ? 'clear' : 'r'; screen = 'place'; }
      if (tool === 2) perform('pass', 0);
      if (tool === 3) screen = 'ledger';
      if (tool === 4) { if (undo) { city = undo; undo = null; calculateCity(); screen = 'city'; } else play(ERROR_SOUND); }
      if (tool === 5) { returnScreen = 'tools'; screen = 'guide'; }
      if (tool === 6) sound = !sound;
      if (tool === 7) screen = 'restart';
    }
  } else if (screen === 'guide') {
    guidePage = (guidePage + direction + GUIDE.length) % GUIDE.length;
    if (key === 'k' || key === 'j') screen = returnScreen;
  } else if (screen === 'ledger') {
    ledgerPage = (ledgerPage + direction + 3) % 3;
    if (key === 'k' || key === 'j') screen = 'city';
  } else if (screen === 'inspect') {
    if (key === 'j' || key === 'k') screen = returnScreen;
  } else if (screen === 'news') {
    if (key === 'j' || key === 'k') { noticeIndex++; if (noticeIndex >= notices.length) screen = 'cards'; }
  } else if (screen === 'restart' || screen === 'results') {
    if (key === 'j') screen = 'title';
    if (key === 'k') screen = 'city';
  }
}
['w', 'a', 's', 'd', 'i', 'j', 'k', 'l'].forEach(function (key) { onInput(key, function () { input(key); }); });
afterInput(draw);
draw();
