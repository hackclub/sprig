/* 
@title: gobermaze
@description: silly lil maze game about a creature who loves eating nachos! use j to reset level, use l to eat the nachos you're standing next to, eat all the nachos to go to the next level!    
@author: gober
@tags: [puzzle, maze, food]
@addedOn: 2026-10-16
*/

const player = "p";
const nachos = "n";
const block = "b";
const target = "t";
const wall = "w";
const moveBlip = tune`
77.92207792207792: G4/77.92207792207792,
2415.5844155844156`
const killBlip = tune`
56.60377358490566: D4/56.60377358490566,
56.60377358490566: E4/56.60377358490566,
56.60377358490566: D5/56.60377358490566,
1641.5094339622642`
const resetBlip = tune`
46.875: A4/46.875,
46.875: E4/46.875,
46.875: C4/46.875,
1359.375`
const winTune = tune`
114.50381679389314: F4/114.50381679389314,
114.50381679389314: C5/114.50381679389314,
114.50381679389314: A4/114.50381679389314,
114.50381679389314,
114.50381679389314: C5/114.50381679389314,
114.50381679389314: E5/114.50381679389314,
114.50381679389314: D5/114.50381679389314,
114.50381679389314: C5/114.50381679389314,
114.50381679389314: D5/114.50381679389314,
114.50381679389314: C5/114.50381679389314,
2519.083969465649`
const nextLevelBlip = tune`
47.543581616481774: D4/47.543581616481774,
47.543581616481774: D5/47.543581616481774,
47.543581616481774: A4/47.543581616481774,
1378.7638668779714`
setLegend(
  [player, bitmap`
................
................
................
................
......888.88....
.....888888.8...
....888888888...
...888888888....
...8880888088...
....8888888880..
.....8080808000.
.....880808.000.
.....888888..0..
.....888888000..
.....88..88.....
................`],
  [wall, bitmap`
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
  [nachos, bitmap`
................
................
................
................
................
................
................
................
....99.99.99....
..996696696699..
1196969669696911
12116CCCCCC61121
1122111111112211
.11222222222211.
..111222222111..
....11111111....`],
  [block, bitmap`
................
................
................
................
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
...7777777777...
................
................`],
  [target, bitmap`
................
................
................
..44........44..
..444......444..
....44....44....
.....44..44.....
......44444.....
.......444......
......44444.....
.....44..444....
....44....444...
...44......44...
...44...........
................
................`],
)

setSolids([player, wall, nachos]);

let level = 0
const levels = [
  map`
pwwww.tw
.www...w
.ww..www
....wwww
www.wwwn
www.....
ww..ww..
ww.wwww.`,

  map`
wwtwww
wwn.ww
www..w
p.....
ww..ww
wn.www`,

  map`
wwwwwwwww
wpwn.w..w
w.ww.w..w
w....wn.w
www.www.w
wnw.n...w
w...ww..w
www..w.tw
wwwwwwwww`,

  map`
wwwwwwwwww
p.w......w
w.w.wwww.w
w.w..nwn.w
w.wwwww..w
w.....wt.w
wwwww.ww.w
wn.......w
wwwwwwwwww`,

  map`
wwwwwwwwwwwww
p...wn..w...w
www.w.w.w.w.w
wnw...w.wnw.w
w.wwwww.www.w
w.w..nw.wn..w
w.w.w.wnw.www
w.w.w.w.w...w
w.w.w.w.www.w
w.n.w.w.wn..w
w.www.w.w.w.w
w..nw..t..w.w
wwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwww
p.......wn....w
wwwwwww.www.w.w
wn....wn....w.w
www.wwwwwwwww.w
w...wn.....nw.w
w.www.w.www.w.w
w...w.wt.nw.w.w
w.w.w.www.www.w
w.wn....w.w..nw
w.wwwwwww.w.www
w.wn..wn..w...w
w.www.w.wwwww.w
w.....w.......w
wwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwwwwww
p.....wt.........nw
wwwww.w.wwwwwww.www
wnw...w......nw...w
w.w.wwwwwwwww.www.w
w.w.wn..w...w.w...w
w.w.w.w.w.w.w.w.w.w
w.w.w.w..nw.w.w.wnw
w.w.w.wwwwwww.w.www
w...w.w.....w.wn..w
w.www.w.www.w.www.w
w...wn...nw.w..nw.w
www.wwwww.w.w.www.w
wnw...w...w...w..nw
w.www.wwwww.www.www
w.....w...w..nwn..w
w.wwwww.w.wwwwwww.w
w.......wn........w
wwwwwwwwwwwwwwwwwww`,

  map`
wwwwwwwwwwwwwwwwwwww
p.w..nw...........ww
w.w.www.w.wwwwwww.ww
w.w.....w.wn....w.ww
w.www.www.www.www.ww
w...w.w...w...wn..ww
www.w.w.www.w.w.wwww
wnw.w.w..nw.wnw...nw
w.w.w.www.w.wwwwww.w
w.w.w.wnw.w.....nw.w
w.w.w.w.w.w.www..w.w
w...w...w.w..nw..w.w
w.wwwwwww.w.www.ww.w
wn......w.wnw...w..w
wwwwwww.w.www.w.w..w
w.....w.w...w.wnwn.w
w.w.www.www.w.wwww.w
wnw.........w.....tw
wwwwwwwwwwwwwwwwwwww`,
]

setMap(levels[level])

setPushables({
  [player]: [block],
  [block]: [block]
})

onInput("w", () => {
  playTune(moveBlip);
  getFirst(player).y += -1
})

onInput("a", () => {
  playTune(moveBlip);
  getFirst(player).x += -1
})

onInput("s", () => {
  playTune(moveBlip);
  getFirst(player).y += 1
})

onInput("d", () => {
  playTune(moveBlip);
  getFirst(player).x += 1
})

onInput("i", () => {
  playTune(moveBlip);
})

onInput("j", () => {
  playTune(resetBlip);
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
})

onInput("k", () => {
  playTune(moveBlip);
})

onInput("l", () => {
  playTune(killBlip);

  const pSprite = getFirst(player);
  if (!pSprite) return;

  const nearbyEnemies = getAll(nachos).filter(eSprite => {
    const dx = Math.abs(pSprite.x - eSprite.x);
    const dy = Math.abs(pSprite.y - eSprite.y);
    return dx <= 1 && dy <= 1;
  });

  if (nearbyEnemies.length > 0) {
    nearbyEnemies[0].remove();
  }
})

afterInput(() => {
  const numberOfGoalsCovered = tilesWith(player, target).length;
  const enemiesLeft = getAll(nachos).length;

  // must be standing on the target and all level enemies must be totally gone :P
  if (numberOfGoalsCovered > 0 && enemiesLeft === 0) {
    level = level + 1;
    if (level < levels.length) {
      playTune(nextLevelBlip);
      setMap(levels[level]);
    } else {
      playTune(winTune);
      addText("you win!", { y: 4, color: color`3` })
    }
  }
})