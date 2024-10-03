
/* 
@title: cat_in_rain
@author: alxndriab
@tags: ['action']
@addedOn: 2023-11-17
*/

    /*
@title cat_in_rain
inspration from dodge_the_fireball by sam liu
*/

const cat = "p";
const droplet = "d";
const shield = "s";
const wall = "w";
const portal = "t";

// tutorial, running, pause, off
var status = "tutorial";

let level = 1;
let shieldTotal = 1;
let shieldCount = shieldTotal;
let dropTotal = 5;
let dropCount = dropTotal;
let wallTotal = 1;
let wallCount = wallTotal;
let key = false;

const catRight = [
  cat,
  bitmap`
................
................
................
................
................
................
................
.L........L..L..
..L.......LLLL..
..L.......0LL0..
...LLLLLL0L2020.
....LLLLLLL222..
....LLLLLLL.....
....L.....L.....
....L.....L.....
....LL....LL....`,
];

const catLeft = [
  cat,
  bitmap`
................
................
................
................
................
................
................
..L..L........L.
..LLLL.......L..
..0LL0.......L..
.0202L0LLLLLL...
..222LLLLLLL....
.....LLLLLLL....
.....L.....L....
.....L.....L....
....LL....LL....`
];

const objects = [
  [droplet, bitmap`
................
........7.......
.......7........
.......77.......
......7777......
......7777......
.....777777.....
.....7777777....
....77777777....
....77777777....
....77777777....
.....777777.....
.....777777.....
......7777......
................
................`],
  [shield, bitmap`
................
................
................
......0000......
....00000000....
...0000000000...
.00000000000000.
.0.0.0.0..0.0.0.
.......0........
.......0........
.......0........
.......0........
.......0.0......
........0.......
................
................`],
  [wall, bitmap`
................
................
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..
..000000000000..`],
  [portal, bitmap`
................
................
......44444.....
.....44DDD44....
....44D...D44...
....4D.....D4...
...44D.....D44..
...4D.......D4..
...4D.......D4..
...4D.......D4..
...4D.......D4..
...44D......44..
....44D...D44...
.....44DDD44....
......44444.....
................`],
];

const levels = [
  map`
......
......
......
......
......
......
......
t....p`,
  map`
......
......
......
......
......
......
......
..p...`,
]

setLegend(catRight, ...objects);
setSolids([cat, wall]);
setMap(levels[0]);

onInput("a", () => {  
  if (status == "off") return;
  setLegend(catLeft, ...objects);
  getFirst(cat).x -= 1;
});

onInput("d", () => {  
  if (status == "off") return;
  setLegend(catRight, ...objects);
  getFirst(cat).x += 1;
});

onInput("i", () => {
  if (status == "off" || shieldCount < 1) return;
  
  let p = getFirst(cat);
  addSprite(p.x, p.y - 1, shield);
  shieldCount--;
  
  let s = getFirst(shield);
  let promise = new Promise(() => {
    setTimeout(() => {
      s.remove();
    }, 2500);
  });
});

onInput("k", () => {  
  status = "off";
});

onInput("j", () => {  
  status = "running";
  setMap(levels[1]);
  clearText();
});

function spawndroplet() {
  if (dropCount < 1) return;

  let x = Math.floor(Math.random() * 6);
  let y = 1; 
  addSprite(x, y, droplet);
  dropCount--;
};

function movedroplets() {
  let droplets = getAll(droplet);

  for (let i = 0; i < droplets.length; i++) {
    droplets[i].y += 1;
  }
};

function despawndroplets() {
  let droplets = getAll(droplet);
  let s = getFirst(shield);

  for (let i = 0; i < droplets.length; i++) {
   if (droplets[i].y == 7) droplets[i].remove();
   else if (getAll(shield).length > 0) {
     if (droplets[i].x == s.x && droplets[i].y == s.y) {
       droplets[i].remove();
       s.remove();
     }
   }
  }
};

function wallSpawn() {
  let x = Math.floor(Math.random() * 6);
  let y = 7;
  let p = getFirst(cat);
  let walls = getAll(wall);
  let randomWall = Math.floor(Math.random() * walls.length);
  
  let promise = new Promise(() => {
      setTimeout(() => {
        walls[randomWall].remove();
      }, 1000)
    });
    
  if (p.x == x || wallCount < 1) return;
  else if (walls.length > 0) {
    for (let i = 0; i < walls.length; i++) {
      if (walls[i].x == x) return;
    };
  };
  
  addSprite(x, y, wall);
  wallCount--;
};
  
function checkHit() {
  let droplets = getAll(droplet);
  let p = getFirst(cat);

  for (let i = 0; i < droplets.length; i++) {
    if (droplets[i].x == p.x && droplets[i].y == p.y) {
      return true;
    }
  }

  return false;
};

function clearObjects() {
  let shields = getAll(shield);
  for (let i = 0; i < shields.length; i++) {shields[i].remove()};
  let walls = getAll(wall);
  for (let i = 0; i < walls.length; i++) {walls[i].remove()};
  let droplets = getAll(droplet);
  for (let i = 0; i < droplets.length; i++) {droplets[i].remove()};
};

function keyUpdate(bool) {
  if (key === true || bool === true) {
    clearText();
    key = false;
  };
  
  addText(`Droplets: ${dropCount}\nShields: ${shieldCount}`, { 
  x: 0,
  y: 0,
  color: color`L`
  });
  
  key = true;
};

function levelCheck() {
  let droplets = getAll(droplet);
  if (droplets.length > 0) return;
  
  status = "pause";
  level += 1;
  clearText();
  clearObjects();
  
  addText(`Level ${level}!`, {
    x: 6,
    y: 6,
    color: color`3`
  });

  if (level % 2 == 0) shieldTotal += 1;
  dropTotal += 5;
  wallTotal += 2;

  shieldCount = shieldTotal;
  dropCount = dropTotal;
  wallCount = wallTotal;

  let promise = new Promise(() => {
  setTimeout(() => {
    status = "running";
    keyUpdate(true);
  }, 4000);
  });
};

var gameLoop = setInterval(() => {
  if (status == "pause") return;
  else if (status == "tutorial") {
    addText(`Hello there cat!\nHere the rules:\ncat no like water \nor walls \n"a" & "d" move you\n"i" uses umbrella\n"k" stops game\nEnter the portal!`, {
      x: 1,
      y: 0,
      color: color`3`
    });
    if (tilesWith(cat, portal).length > 0) {
      status = "running";
      clearText();
      setMap(levels[1]);
    }
  }
  else {
    despawndroplets();
    movedroplets();
    spawndroplet();
    wallSpawn();
    keyUpdate();
    levelCheck();
  
    if (checkHit() || status == "off") {
      clearInterval(gameLoop);
      status = "off";
      clearObjects();
      clearText();
      addText("Game Over!", {
        x: 5,
        y: 7,
        color: color`3`
      });
    }
  }
}, 300);
