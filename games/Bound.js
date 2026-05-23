/*
@title: Bound
@description: Stealth chase game
@author: Ishan
*/

const player = "p";
const enemy = "e";
const road = "r";
const boundary = "R";
const junction = "j";
const busRoute = "v";
const trainTrack = "t";
const metro = "m";
const hotdog = "h";
const menuBg = "z";

const b_glass = "1"; 
const b_brick = "2";
const b_park = "3";


setLegend(
  [player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0005.50.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`],
  [enemy, bitmap`
................
.....77777......
....7111117.....
....71...17.....
....71...17.....
....7111117.....
.....77777......
.......7........
....7777777.....
.......7........
.......7........
......7.7.......
.....7...7......
....7.....7.....
................
................`],
  [b_glass, bitmap`
6666666666666666
6116116116116116
6666666666666666
6116116116116116
6666666666666666
6116116116116116
6666666666666666
6116116116116116
6666666666666666
6116116116116116
6666666666666666
6116116116116116
6666666666666666
6116116116116116
6666666666666666
6666666666666666`],
  [b_brick, bitmap`
9999999999999999
9229229992292299
9999999999999999
9229229992292299
9999999999999999
9229229992292299
9999999999999999
9229229992292299
9999999999999999
9229229992292299
9999999999999999
9229229992292299
9999999999999999
9229229992292299
9999999999999999
9999999999999999`],
  [b_park, bitmap`
5555555555555555
5555555555055555
5505555555055555
5505555555555555
5555555555500555
5550009955555550
5550099995555550
5550099995555555
5555009955555550
5555555555500555
5555055555555555
5550055555550555
5555555555550555
5555555555555555
5555555555555555
5555555555555555`],
  [road, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
LLLLLLLLLLLLLLLL
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [boundary, bitmap`
2442224422244222
4422244222442224
4222442224422244
2224422244222442
2244222442224422
2442224422244222
4422244222442224
4222442224422244
2224422244222442
2244222442224422
2442224422244222
4422244222442224
4222442224422244
2224422244222442
2244222442224422
2442224422244222`],
  [busRoute, bitmap`
2222222222222222
2222222222222222
2266666666666622
2266666666666622
2222222222222222
2222222222222222
2222222222222222
LLLLLLLLLLLLLLLL
2222222222222222
2222222222222222
2222222222222222
2266666666666622
2266666666666622
2222222222222222
2222222222222222
2222222222222222`],
  [trainTrack, bitmap`
9999999999999999
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
9999999999999999
9999999999999999
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
9999999999999999
9999999999999999
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
9999999999999999
9999999999999999
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
9999999999999999`],
  [junction, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222LLLLLLLL2222
2222LLLLLLLL2222
2222LL2222LL2222
2222LL2222LL2222
2222LL2222LL2222
2222LL2222LL2222
2222LLLLLLLL2222
2222LLLLLLLL2222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [metro, bitmap`
1111111111111111
1666666666666661
16............61
16.3333333333.61
16.3........3.61
16.3...11...3.61
16.3..1111..3.61
16.3.11..11.3.61
16.3.11..11.3.61
16.3.111111.3.61
16.3.11..11.3.61
16.3.11..11.3.61
16.3........3.61
16.3333333333.61
16............61
1666666666666661`],
  [hotdog, bitmap`
................
................
................
......4444......
.....433334.....
....43333334....
....11111111....
....11111111....
....43333334....
.....433334.....
......4444......
................
................
................
................
................`],
  [menuBg, bitmap`
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


const WORLD_SIZE = 40;
const bTypes = [b_glass, b_brick, b_park];
let worldData = [];
let pPos = { x: 5, y: 5 };
let ePos = { x: 30, y: 30 };
let camX = 0, camY = 0;
let freeCamX = 5, freeCamY = 5;
let state = "PLAY"; 

function initWorld() {
  worldData = [];
  for (let y = 0; y < WORLD_SIZE; y++) {
    let row = [];
    for (let x = 0; x < WORLD_SIZE; x++) {

      if (y === 0 || y === WORLD_SIZE - 1 || x === 0 || x === WORLD_SIZE - 1) {
        row.push(boundary);
      } 
      
      else if (y === 24) {
        row.push(x % 8 === 0 ? metro : trainTrack);
      }
      
      else if (x === 12) {
        row.push(busRoute);
      }
     
      else if (y % 6 === 0 || x % 6 === 0) {
        row.push(y % 6 === 0 && x % 6 === 0 ? junction : road);
      } 
      // Randomized Buildings
      else {
        row.push(bTypes[Math.floor(Math.random() * bTypes.length)]);
      }
    }
    worldData.push(row);
  }

  // Hotdogs for speed
  for(let i=0; i<15; i++) {
    let rx = Math.floor(Math.random() * WORLD_SIZE);
    let ry = Math.floor(Math.random() * WORLD_SIZE);
    if (worldData[ry][rx] === road) worldData[ry][rx] = hotdog;
  }
}


function render() {
  clearText();

  if (state === "MENU" || state === "SETTINGS") {
    let bgRows = [];
    for(let i=0; i<16; i++) bgRows.push(menuBg.repeat(16));
    setMap(bgRows.join("\n"));
    
    getAll(player).forEach(s => s.remove());
    getAll(enemy).forEach(s => s.remove());
    
    if (state === "MENU") {
      addText("SCOTLAND YARD", {x: 1, y: 2});
      addText("I: RESUME", {x: 1, y: 5});
      addText("J: CONFIG", {x: 1, y: 7});
      addText("K: CAMERA", {x: 1, y: 9});
    } else {
      addText("CONFIG", {x: 1, y: 2});
      addText("DIFFICULTY: 11", {x: 1, y: 5});
      addText("J: BACK", {x: 1, y: 8});
    }
    return;
  }

  let tx = (state === "CAMERA") ? freeCamX : pPos.x;
  let ty = (state === "CAMERA") ? freeCamY : pPos.y;

  camX = Math.floor(Math.max(0, Math.min(WORLD_SIZE - 16, tx - 8)));
  camY = Math.floor(Math.max(0, Math.min(WORLD_SIZE - 16, ty - 8)));

  let view = [];
  for (let y = 0; y < 16; y++) {
    let line = "";
    for (let x = 0; x < 16; x++) {
      line += worldData[y + camY][x + camX];
    }
    view.push(line);
  }
  setMap(view.join("\n"));

  getAll(player).forEach(s => s.remove());
  getAll(enemy).forEach(s => s.remove());

  if (state === "CAMERA") addText("CAM MODE", {x:0, y:0});

  let sx = pPos.x - camX, sy = pPos.y - camY;
  let ex = ePos.x - camX, ey = ePos.y - camY;
  
  if (sx >= 0 && sx < 16 && sy >= 0 && sy < 16) addSprite(sx, sy, player);
  if (ex >= 0 && ex < 16 && ey >= 0 && ey < 16) addSprite(ex, ey, enemy);
}


function move(dx, dy) {
  if (state === "CAMERA") {
    freeCamX = Math.max(0, Math.min(WORLD_SIZE-1, freeCamX + dx));
    freeCamY = Math.max(0, Math.min(WORLD_SIZE-1, freeCamY + dy));
    render();
    return;
  }
  if (state !== "PLAY") return;

  let nx = pPos.x + dx, ny = pPos.y + dy;
  if (nx >= 0 && nx < WORLD_SIZE && ny >= 0 && ny < WORLD_SIZE) {
    let t = worldData[ny][nx];
    if (!bTypes.includes(t)) {
      pPos.x = nx; pPos.y = ny;
      if (t === hotdog) worldData[ny][nx] = road;
      if (t === metro) pPos.x = (pPos.x + 8) % WORLD_SIZE;
      
      
      let ex = ePos.x, ey = ePos.y;
      if (ex < pPos.x) ex++; else if (ex > pPos.x) ex--;
      if (ey < pPos.y) ey++; else if (ey > pPos.y) ey--;
      if (!bTypes.includes(worldData[ey][ex])) ePos = {x: ex, y: ey};
    }
  }
  render();
}

onInput("w", () => move(0, -1));
onInput("s", () => move(0, 1));
onInput("a", () => move(-1, 0));
onInput("d", () => move(1, 0));

onInput("i", () => { state = (state === "MENU" ? "PLAY" : "MENU"); render(); });
onInput("j", () => { state = (state === "SETTINGS" ? "MENU" : "SETTINGS"); render(); });
onInput("k", () => { 
  if (state === "PLAY") { state = "CAMERA"; freeCamX = pPos.x; freeCamY = pPos.y; }
  else { state = "PLAY"; }
  render(); 
});

initWorld();
render();