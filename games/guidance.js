/*
@title: guidance
@author: danush_ramanan
@tags: ['strategy']
@addedOn: 2022-12-27
*/

/*
Goal: Get to the green goal with as little time as possible
Controlls: Use WASD to change the selected tile, and use IJKL to place down arrow blocks that when the player steps on them, changes their direction
You cannot place down blocks on barriers, or goals. However, you CAN overwrite another arrow block.
Have fun!
*/

class User {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  move(dir) {
    switch(dir) {
      case "w":
        if (this.y <= 0) return;
        this.y--;
        break;
      case "s":
        if (this.y >= height() - 1) return;
        this.y++;
        break;
      case "a":
        if (this.x <= 0) return;
        this.x--;
        break;
      case "d":
        if (this.x >= width() - 1) return;
        this.x++;
        break;
        
      default:
        break;
    }
  }

  place(dir) {
    const sprites = getTile(this.x, this.y);
    let toSpawn = true;
    sprites.forEach((sprite) => {
      if (sprite.type === barrierKey || sprite.type === goalKey) toSpawn = false;
      if (sprite.type === upKey) sprite.remove();
      if (sprite.type === downKey) sprite.remove();
      if (sprite.type === leftKey) sprite.remove();
      if (sprite.type === rightKey) sprite.remove();
    });
    
    if (toSpawn) addSprite(this.x, this.y, dir);
  }

  update() {
    getFirst(userKey).x = this.x;
    getFirst(userKey).y = this.y;
  }
}

class Player {
  constructor(x, y, dir) {
    this.x = x;
    this.y = y;
    this.dir = dir;
  }

  move() {
    if (tilesWith(upKey, playerKey).length === 1)  this.dir = "w";
    if (tilesWith(downKey, playerKey).length === 1) this.dir = "s";
    if (tilesWith(leftKey, playerKey).length === 1) this.dir = "a";
    if (tilesWith(rightKey, playerKey).length === 1) this.dir = "d";

    const barriers = getAll(barrierKey);
    
    switch(this.dir) {
      case "w":
        this.y--;
        if (this.y <= -1) {
          this.dir = "s";
          this.y += 2; // bouncing back
          barriers.forEach((barrier) => { // for if a barrier is behind as well
            if (this.y === barrier.y && this.x === barrier.x) {
              this.dir = "w";
              this.y--;
            }
          });
        }
        barriers.forEach((barrier) => {
          if (this.y === barrier.y && this.x === barrier.x) {
            this.dir = "s";
            this.y += 2; // bouncing back
            barriers.forEach((barrier) => { // for if a barrier is behind as well
              if (this.y === barrier.y && this.x === barrier.x) {
                this.dir = "w";
                this.y--;
              }
            });
          }
        });
        break;
      case "s":
        this.y++;
        if (this.y >= height()) {
          this.dir = "w";
          this.y -= 2;
          barriers.forEach((barrier) => {
            if (this.y === barrier.y && this.x === barrier.x) {
              this.dir = "s";
              this.y++;
            }
          });
        }
        barriers.forEach((barrier) => {
          if (this.y === barrier.y && this.x === barrier.x) {
            this.dir = "w";
            this.y -= 2;
            barriers.forEach((barrier) => {
              if (this.y === barrier.y && this.x === barrier.x) {
                this.dir = "s";
                this.y++;
              }
            });
          }
        });
        break;
      case "a":
        this.x--;
        if (this.x <= -1) {
          this.dir = "d";
          this.x += 2;
          barriers.forEach((barrier) => {
            if (this.y === barrier.y && this.x === barrier.x) {
              this.dir = "a";
              this.x--;
            }
          });
        }
        barriers.forEach((barrier) => {
          if (this.y === barrier.y && this.x === barrier.x) {
            this.dir = "d";
            this.x += 2;
            barriers.forEach((barrier) => {
              if (this.y === barrier.y && this.x === barrier.x) {
                this.dir = "a";
                this.x--;
              }
            });
          }
        });
        break;
      case "d":
        this.x++;
        if (this.x >= width()) {
          this.dir = "a";
          this.x -= 2;
          barriers.forEach((barrier) => {
            if (this.y === barrier.y && this.x === barrier.x) {
              this.dir = "d";
              this.x++;
            }
          });
        }
        barriers.forEach((barrier) => {
          if (this.y === barrier.y && this.x === barrier.x) {
            this.dir = "a";
            this.x -= 2;
            barriers.forEach((barrier) => {
              if (this.y === barrier.y && this.x === barrier.x) {
                this.dir = "d";
                this.x++;
              }
            });
          }
        });
        break;

      default:
        break;
    }
  }

  update() {
    getFirst(playerKey).x = this.x;
    getFirst(playerKey).y = this.y;
  }
}

const playerKey = "p";
const userKey = "u";
const goalKey = "g";
const barrierKey = "b";
const upKey = "w";
const downKey = "s";
const leftKey = "a";
const rightKey = "d";

setLegend(
  [ playerKey, bitmap`
................
................
................
..333333333333..
..333333333333..
..333333333333..
..333003300333..
..333003300333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
....33....33....
....33....33....
....33....33....
..3333....3333..`],
  [ userKey, bitmap`
3333333333333333
3333333333333333
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
33............33
3333333333333333
3333333333333333` ],
  [ goalKey, bitmap`
................
....44444444....
...4444444444...
..444333333444..
.44433333333444.
.44333333333344.
.44333333333344.
.44333333333344.
.44333333333344.
.44333333333344.
.44333333333344.
.44433333333444.
..444333333444..
...4444444444...
....44444444....
................`],
  [ barrierKey, bitmap`
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
  [ upKey, bitmap`
1111111111111111
1111111331111111
1111113333111111
1111133333311111
1111333333331111
1111111331111111
1111111331111111
1111111331111111
1111111331111111
1111111331111111
1111111331111111
1111111331111111
1111111331111111
1111111331111111
1111111111111111
1111111111111111` ],
  [ downKey, bitmap`
1111111111111111
1111111111111111
1111111331111111
1111111331111111
1111111331111111
1111111331111111
1111111331111111
1111111331111111
1111111331111111
1111111331111111
1111111331111111
1111333333331111
1111133333311111
1111113333111111
1111111331111111
1111111111111111` ],
  [ leftKey, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111311111111111
1113311111111111
1133311111111111
1333333333333311
1333333333333311
1133311111111111
1113311111111111
1111311111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ],
  [ rightKey, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111131111
1111111111133111
1111111111133311
1133333333333331
1133333333333331
1111111111133311
1111111111133111
1111111111131111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ]
);

let levelIndex = 0;
const levels = [
  map`
u.....
p..b..
bbbbb.
......
..bbbb
.....g`,
  map`
u......
p..b...
bb..b..
.......
..bbbb.
.....g.`,
  map`
u......
p.bbbb.
.....b.
.b.....
..bbb.b
.....gb`,
  map`
........u
.b.b....p
...b..bbb
.bbbbbbbb
.......bb
..b.....g`,
  map`
u.bg
p.b.
.b..
.b..
.b..
....`,
  map`
...............
u.........bb...
pbbb...bbb..bbg
...bbbbb.......
...............`,
  map`
ub.b..
pbg.b.
.bb.b.
....b.
..bbb.
......`,
  map`
b..g.ub
b.bbbbp
.......`,
  map`
bbbbbbbbbbb.......b
bbbbbbbbbbb.bbbbb.b
bbbbbbbbbb...bbbb..
b...bbbb.......b...
b.b.bbbb.bbbbbbb...
b.b....b.bb..g.....
u.b..b.b.bb..b.....
p.bbbb...bb..bbb...
bbbbbbbbbb.....b...
..bbbbbb...bbbbb...
b........bbbbbbbbbb
bbbbbbbbbbbbbbbbbbb`,
  map`
......
......
....bg
.bbbb.
.bbb..
.bbb.b
.bbb.b
.bbb..
.bbbb.
.bbbb.
.bbbb.
.bbbb.
.bbbb.
.bbbb.
.bbbb.
ubbbb.
p.....`,
  map`
.....
.b.b.
.bgb.
ubbb.
p....`,
  map`
bbbbbbbb..............g
ubbbbbbb.bbbbbbbbbbbb..
p......................`,
  map`
...g.
.bb..
..b..
ubbb.
p....`,
  map`
bbbbb
bbbbb
bbbbb
ubbbb
p..ag`,
  map`
......ag
...bbbbs
..bbbb..
s.bbb...
..bbb..a
u.bbb...
p.......`,
  map`
bbbbbb.....gb
bbbbbb.bbbbsb
b...bb.bbbadb
b.bb...baaddb
b.bbbbbbaaddb
b.bbbbbb....b
b.bbbbbb....b
u............
p............`,
  map`
wddddddg
w.....bw
w......w
w......w
w......w
wu.....w
pddddddd`,
  map`
....d
wu...
wbb..
wbb..
wbbb.
wabb.
pwbb.
wg...`,
  map`
....w
.b...
.b...
.b.a.
.b...
.b...
.bw..
.b...
.b...
.bd..
.b...
ubb..
pbg.a`,
  map`
...aaa.ss......g
.bbbbbbbbbbbwbbu
d....d.........p`,
  map`
.......................
..........bbbb.........
......bbbbbbbbbbbb.....
.....bb.....bs...bbbbb.
.....b...b.gb.bb..d....
u...bbs.bbbbbb...bbbbbb
w...b..bbbbb.a.bbbbbbbb
ds..b.bbbbb..bbbbbbbbbb
pa..b..d....bbbbbbbbbbb`,
  map`
wgw
www
www
uww
paw`,
  map`
.........b...d.d.......b....
..b.bd..sbbb.dbdb.bbb..b.b..
..b.b.bbsb..b.bgb.b....bb.s.
u..b.....bbb..bbb.bbb..b.b..
p...w...a...................`,
  map`
da...a..
........
..sbbbbg
..bbbbbb
..bwddsb
..bwaasb
..bbbbbb
w.bbbbbb
u.bb..bb
p.bb..bb`,
  map`
.....
.....
.....
u....
p....`,
];
const nextLevelSound = tune`
240: c4~240 + e4-240,
240: c5~240 + e5-240,
7200`;
const winSound = tune`
250: c4~250 + e4^250,
250: d4~250 + f4^250,
250: e4~250 + g4^250,
250: g4~250 + b4^250,
250: b4~250 + d5^250,
250: c5~250 + e5^250,
250,
250: c5/250,
6000`;

function changeLevel(level) {
  setMap(levels[level]);
}

// on game start
let time = 0;
changeLevel(levelIndex);
clearText();
addText(`Time: ${time}`, {
  x: 1,
  y: 1,
  color: color`D`
});

let user = new User(getFirst(userKey).x, getFirst(userKey).y);
let player = new Player(getFirst(playerKey).x, getFirst(playerKey).y, "d");

onInput("w", () => {
  user.move("w");
});
onInput("s", () => {
  user.move("s");
});
onInput("a", () => {
  user.move("a");
});
onInput("d", () => {
  user.move("d");
});
onInput("i", () => {
  user.place("w");
});
onInput("k", () => {
  user.place("s");
});
onInput("j", () => {
  user.place("a");
});
onInput("l", () => {
  user.place("d");
});
afterInput(() => {
  user.update();
});

// console.log(levels.length);

setInterval(() => {
  if (levelIndex === levels.length - 1) {
    clearText();
    addText(`You Win!`, {x: 6, y: 6, color: color`3`});
  } else {
    player.move();
    player.update();
    
    time++;
    clearText();
    addText(`Time: ${time}`, {x: 1, y: 1, color: color`D`});
  
    if (tilesWith(goalKey, playerKey).length === 1) {
      levelIndex++;
      changeLevel(levelIndex);
      player.x = getFirst(playerKey).x;
      player.y = getFirst(playerKey).y;
      user.x = getFirst(userKey).x;
      user.y = getFirst(userKey).y;
      player.dir = "d";
      player.update();
      time = 0;
      if (levelIndex !== levels.length - 1) playTune(nextLevelSound);
      else playTune(winSound);
    }
  }
}, 500);
