/*
    @title: Moth hours
    @author: Sushank Sukesh
    @description: An insect survival game where you play as a moth hunting down fireflies
    @tags: ['survival', 'arcade']
    @addedOn: 2025-11-05
*/

//you are a moth and it is a long night.
//eat the fireflies, dodge the spiders, and try to live until dawn
//controls: w a s d to fly, j to start/play again

const moth = "m";
const fly = "f";
const dimfly = "g";
const spider = "s";
const stone = "r";
const cracked = "c";
const reed = "t";
const ground = "b";

setLegend(
  [moth, bitmap`
................
......1..1......
.......CC.......
..22...CC...2...
.2222..CC..22.2.
.22122.CC.22122.
.22222.CC.22222.
.12222.CC.22221.
..1222.CC.2221..
...122.CC.221...
....12.CC.21....
.......CC.......
.......CC.......
.......CC.......
................
................`],
  [fly, bitmap`
................
................
................
................
................
......1..1......
.....11LL11.....
.......LL.......
.......66.......
......6666......
......6666......
.......66.......
................
................
................
................`],
  [dimfly, bitmap`
................
................
................
................
................
......1..1......
.....11LL11.....
.......LL.......
.......LL.......
......LLLL......
......LLLL......
.......LL.......
................
................
................
................`],
  [spider, bitmap`
................
................
................
...1........1...
....1......1....
.....1.LL.1.....
1.....LLLL.....1
.11..LL33LL..11.
...11LLLLLL11...
.....LLLLLL.....
....1.LLLL.1....
...1...LL...1...
..1..........1..
................
................
................`],
  [stone, bitmap`
................
................
................
....LLLLLL......
...L111111L.....
..L11111111L....
..L11112111L....
..L11111111LL...
..L111111111L...
..LL1111111LL...
...LLL11111L....
.....LLLLLL.....
................
................
................
................`],
  [cracked, bitmap`
................
................
................
....LLLLLL......
...L111011L.....
..L11100111L....
..L11000111L....
..L11011111LL...
..L110111111L...
..LL1111111LL...
...LLL11111L....
.....LLLLLL.....
................
................
................
................`],
  [reed, bitmap`
................
........C.......
........C.......
....C...D.....C.
....C...D.....C.
....D...D...D.D.
....D..DD...D.D.
....D..D.D..D.D.
...D...D.D..D.D.
...D...D.D..D.D.
...D..5D.D..D.D.
.5.D..D5.D..D.D5
...D..D..D..D.D.
..DD.DD..DD.DD.D
.DD.DDD..DD.DD..
................`],
  [ground, bitmap`
0000000000000000
0000000L00000000
0000000000000000
0000000000L00000
0000000000000000
00L0000000000000
0000000000000000
0000000000000L00
0000000000000000
0000L00000000000
0000000000000000
000000000L000000
0000000000000000
0L00000000000000
0000000000000000
0000000L00000000`]
);

setSolids([stone, cracked, reed]);
setBackground(ground);

const level = map`
t..r....t.
..........
.r....t...
......c..t
.t...m....
...r..t...
..........
r....t..r.`;

const pickupSound = tune`
60: E5~60,
60: B5~60`;
const ouchSound = tune`
120: C3^120,
120: G2^120,
120: C2^120`;
const dawnSound = tune`
150: C5~150,
150: E5~150,
150: G5~150,
300: C6~300`;
const sunkSound = tune`
250: E3-250,
250: D3-250,
500: C3-500`;

const NIGHT_LENGTH = 80; //seconds, give or take (see tick)
const TITLE = 0, PLAY = 1, WON = 2, DEAD = 3;
const spiderSpots = [[9, 1], [0, 6], [9, 6]];
const DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1]];

let state = TITLE;
let score = 0;
let lives = 3;
let secondsLeft = NIGHT_LENGTH;
let hurtUntil = 0;
let clockTimer = null;
let crawlTimer = null;
let driftTimer = null;

//small helpers

function inside(x, y) 
{
  return x >= 0 && y >= 0 && x < width() && y < height();
}

function freeSpot() 
{
  for (let tries = 0; tries < 40; tries++) 
  {
    const x = Math.floor(Math.random() * width());
     const y = Math.floor(Math.random() * height());
    if (getTile(x, y).length === 0) return { x: x, y: y };
  }
  return null; //board is full?? never happens but ill keep it
}

function addFly() 
{
  const spot = freeSpot();
  if (spot) addSprite(spot.x, spot.y, fly);
}


function addSpider() 
{
  const p = spiderSpots[getAll(spider).length % spiderSpots.length];
  addSprite(p[0], p[1], spider);
}

//todo: the spiders sometimes cut corners in a way that feels unfair, idk the logic behind this
//i left it and game should become harder as timer ticks
function stepSpider(s) 
{
  
  const m = getFirst(moth);
  const dx = m.x - s.x;
  const dy = m.y - s.y;
  const ox = s.x;
  const oy = s.y;
  const goX = Math.abs(dx) > Math.abs(dy) ||
    (Math.abs(dx) === Math.abs(dy) && Math.random() < 0.5);

  if (goX) 
  {
    if (dx !== 0) s.x += Math.sign(dx);
    if (s.x === ox && dy !== 0) s.y += Math.sign(dy); // blocked, try other way
  } 
  else 
  {
    if (dy !== 0) s.y += Math.sign(dy);
     if (s.y === oy && dx !== 0) s.x += Math.sign(dx);
    
  }
}

function crawl() 
{
  if (state !== PLAY) return;
  const elapsed = NIGHT_LENGTH - secondsLeft;
  //spiders stumble less as the night goes on
  const eagerness = 0.5 + 0.3 * (elapsed / NIGHT_LENGTH);
  getAll(spider).forEach((s) => 
  {
    if (Math.random() < eagerness) stepSpider(s);
   });
  checkHit();
}

function flicker() 
{
  const all = getAll(fly).concat(getAll(dimfly));
  if (all.length === 0) return;
  const f = all[Math.floor(Math.random() * all.length)];
  const next = f.type === fly ? dimfly : fly;
  const x = f.x;
  const y = f.y;
  f.remove();
  addSprite(x, y, next);
}

function drift() 
{
  if (state !== PLAY) return;
  getAll(fly).concat(getAll(dimfly)).forEach((f) => 
    {
    if (Math.random() < 0.4) 
    {
      const d = DIRS[Math.floor(Math.random() * DIRS.length)];
      const nx = f.x + d[0];
      const ny = f.y + d[1];
      if (inside(nx, ny)) 
      {
        f.x = nx;
        f.y = ny;
      }
    }
  });
  if (Math.random() < 0.3) flicker();
  collect(); //KEEP!!!!!!, just in case firefly wanders into you instead of you into it!
}

function tick() 
{
  if (state !== PLAY) return;
  //dawn is never exactly on time
  if (Math.random() < 0.08) return;
  secondsLeft--;
  const elapsed = NIGHT_LENGTH - secondsLeft;
  if (elapsed === 20 || elapsed === 45) addSpider();
  if (secondsLeft <= 0) 
  {
    endGame(true);
    return;
  }
  draw();
}

//the moth

function collect() 
{
  const m = getFirst(moth);
  getTile(m.x, m.y).forEach((s) => 
  {
    if (s.type === fly || s.type === dimfly) 
    {
      score += s.type === fly ? 2 : 1; //dim fly worth less than lit one
      s.remove();
      playTune(pickupSound);
      addFly();
    }
  });
  draw();
}

function checkHit() 
{
  if (state !== PLAY || Date.now() < hurtUntil) return;
  const m = getFirst(moth);
  const caught = getAll(spider).some((s) => s.x === m.x && s.y === m.y);
  if (!caught) return;

  
  lives--;
  playTune(ouchSound);
  if (lives <= 0) 
  {
    endGame(false);
    return;
  }

  hurtUntil = Date.now() + 2000; //two seconds of mercy until you can get hurt again, KFN

  const n = getAll(spider).length;
  getAll(spider).forEach((s) => s.remove());
  for (let i = 0; i < n; i++) 
  {
    const p = spiderSpots[i % spiderSpots.length];
    addSprite(p[0], p[1], spider);
  }
  m.remove(); //??
  addSprite(5, 4, moth);
  draw();
}

function move(dx, dy) 
{
  if (state !== PLAY) return;
  const m = getFirst(moth);
  const nx = m.x + dx;
  const ny = m.y + dy;
  if (inside(nx, ny)) 
  {
     m.x = nx;
    m.y = ny;
  }

//wind pushing logic with 7 percent chance, might be too annoying, will kfn
  if (Math.random() < 0.07) 
  {
    const side = Math.random() < 0.5 ? 1 : -1;
     const wx = m.x + (dx === 0 ? side : 0);
    const wy = m.y + (dy === 0 ? side : 0);
    if (inside(wx, wy)) 
    {
      m.x = wx;
      m.y = wy;
    }
  }

  collect();
   checkHit();
}

//scenes, maybe add more later?????

function draw() {
  clearText();

  if (state === TITLE) 
  {
    addText("moth hours", {x: 5, y: 2, color: color`6` });
    addText("live until dawn", { x: 3, y: 4, color: color`2` });
    addText("eat fireflies", { x: 3, y: 6, color: color`2` });
    addText("dodge spiders", {x: 3, y: 7, color: color`2` });
    addText("wasd to fly", {x: 4, y: 9, color: color`1` });
    addText("press j", { x: 6, y: 12, color: color`6` });
    addText("the wind is unkind", { x: 1, y: 14, color: color`L` });
    return;
  }

  if (state ===PLAY) 
  {
    addText("dawn in " + secondsLeft, { x: 1, y: 0, color: color`6` });
    addText("glow " + score, { x: 1, y: 15, color: color`2` });
    addText("wings " + "o".repeat(Math.max(lives, 0)), { x: 11, y: 15, color: color`3` });
    return;
  }

  //applies if you either won or dead
  addText(state === WON ? "dawn came" : "the night won", { x: 4, y: 3, color: color`6` });
  addText("glow " + score, { x: 6, y: 6, color: color`2` });
  addText("j to go again", { x: 3, y: 12, color: color`2` });
}

function endGame(win) 
{
  state = win ? WON : DEAD;
  clearInterval(clockTimer);
  clearInterval(crawlTimer);
  clearInterval(driftTimer);
  playTune(win ? dawnSound : sunkSound);
  draw();
}

function startNight() 
{
  clearInterval(clockTimer);
  clearInterval(crawlTimer);
  clearInterval(driftTimer);

  setMap(level);
  state = PLAY;
  score = 0;
  lives = 3;
  secondsLeft = NIGHT_LENGTH;
  hurtUntil = 0;

  for (let i = 0; i < 3; i++) addFly();
  addSpider();

  clockTimer = setInterval(tick, 1000);
  crawlTimer = setInterval(crawl, 650);
  driftTimer = setInterval(drift, 900);
  draw();
}

//input


onInput("w", () => move(0, -1));
onInput("s", () => move(0, 1));
onInput("a", () => move(-1, 0));
onInput("d", () => move(1, 0));

onInput("j", () => 
{
  if (state !== PLAY) startNight();
});

setMap(level);
draw();

//todo:
//maybe add more levels with harder enemies in the future
//better sprites lol
//more insects