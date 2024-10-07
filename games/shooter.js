/*
@title: Shooter
@author: Tyler Sousa
@tags: ['strategy']
@addedOn: 2023-10-24

WASD to move
K to shoot
L to reload
*/
let px = 1;
let py = 1;
let mapNat = [];

let dir = 0;
let frames = 0;

let moveTurn = true;
let shoot = false;
let dead = false;
let ammo = 10;
let score = 0;
let reloadFrame = -8;
//lib
function addMap(mapa) {
  mapa = mapa.split("\n");
  for (var i = 0; i < mapa.length; i++) {
    for (var j = 0; j < mapa[i].length; j++) {
      if (mapa[i].charAt(j) !== ".") {
        addSprite(j, i - 1, mapa[i].charAt(j));
      }
    }
  }
}
function getMapV2() {
  var map = [];
  for (var i = 0; i < height(); i++) {
    map.push([]);
    for (var j = 0; j < width(); j++) {
      map[i].push([]);
      var tile = getTile(j, i);
      for (var k = 0; k < tile.length; k++) {
        map[i][j].push(tile[k].type);
      }
    }
  }
  return map;
}
function setMapV2(map) {
  var tempMap = "";
  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[i].length; j++) {
      tempMap += ".";
    }
    tempMap += "\n";
  }
  setMap(tempMap);
  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map[i].length; j++) {
      for (var k = 0; k < map[i][j].length; k++) {
        addSprite(j, i, map[i][j][k]);
      }
    }
  }
}
function trimMapV2(x, y, w, h, map) {
  var map2 = [];
  var mapWidth = map[0].length;
  var mapHeight = map.length;
  x = Math.max(Math.min(mapWidth - w, x), 0);
  y = Math.max(Math.min(mapHeight - h, y), 0);
  w = Math.min(mapWidth, w);
  h = Math.min(mapHeight, h);
  for (var i = 0; i < h; i++) {
    map2.push([]);
    for (var j = 0; j < w; j++) {
      map2[i].push([]);
      for (var k = 0; k < map[i + y][j + x].length; k++) {
        map2[i][j].push(map[i + y][j + x][k]);
      }
    }
  }
  return map2;
}

const player = "abcd".split("");
const enemy = "efgh".split("");
const bullet = "ijkl".split("");
const wall = "mno".split("");
const floor = "pqr".split("");
const grass = "stu".split("");

setLegend(
  [player[0], bitmap`
..........000...
.......0000L0...
......0044FF0...
.....00444FL0...
....0044000L0...
....044DD00F00..
...00DDDDDDF400.
...0DDDDDDDD440.
...0DDDDDDDD440.
...0DDDDDDDD400.
...0DDDDDDDD00..
...00DDDDDD00...
....000DD000....
......0000......
................
................`],
  [player[1], bitmap`
................
................
................
....000000......
...00DDDD000....
...0DDDDDD400...
..00DDDDDD4400..
..0DDDDDDDD4400.
..0DDDDDDDD0440.
..00DDDDDD00440.
...0DDDDDD00FF00
...00DDDDFFLLFL0
....004444000000
.....004400.....
......0000......
................`],
  [player[2], bitmap`
................
................
......0000......
....000DD000....
...00DDDDDD00...
..00DDDDDDDD0...
.004DDDDDDDD0...
.044DDDDDDDD0...
.044DDDDDDDD0...
.004FDDDDDD00...
..00F00DD440....
...0L0004400....
...0LF44400.....
...0FF4400......
...0L0000.......
...000..........`],
  [player[3], bitmap`
................
......0000......
.....004400.....
000000444400....
0LFLLFFDDDD00...
00FF00DDDDDD0...
.04400DDDDDD00..
.0440DDDDDDDD0..
.0044DDDDDDDD0..
..0044DDDDDD00..
...004DDDDDD0...
....000DDDD00...
......000000....
................
................
................`],
  [enemy[0], bitmap`
...0000..0000...
...0DD0..0DD0...
...0DD0..0DD0...
...0FF0000FF0...
...0FF0440FF0...
...0F444444F0...
...0444443440...
...0334443C40...
...03C4444440...
...04444C3C40...
...0044433300...
....000CC000....
......0000......
................
................
................`],
  [enemy[1], bitmap`
................
................
................
.....00000000000
....004334FFFDD0
....044C344FFDD0
...0044444400000
...0C44444440...
...0C3C444440...
...0033433400000
....03C4C44FFDD0
....004444FFFDD0
.....00000000000
................
................
................`],
  [enemy[2], bitmap`
................
................
................
......0000......
....000CC000....
...0033344400...
...04C3C44440...
...0444444C30...
...04C3444330...
...0443444440...
...0F444444F0...
...0FF0440FF0...
...0FF0000FF0...
...0DD0..0DD0...
...0DD0..0DD0...
...0000..0000...`],
  [enemy[3], bitmap`
................
................
................
00000000000.....
0DDFFF444400....
0DDFF44C4C30....
0000043343300...
...044444C3C0...
...04444444C0...
0000044444400...
0DDFF443C440....
0DDFFF433400....
00000000000.....
................
................
................`],
  [bullet[0], bitmap`
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
...........6....
...........6....
...........6....`],
  [bullet[1], bitmap`
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
666.............
................
................
................
................`],
  [bullet[2], bitmap`
....6...........
....6...........
....6...........
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
................`],
  [bullet[3], bitmap`
................
................
................
................
.............666
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
................`],
  [wall[0], bitmap`
LLLLLL1LLLLLLLLL
LLLLLL1LLLLLL1LL
11LLLL1LLLLLL1LL
LL1LLL1LLLLL11LL
LL11LL1L1LLLL1LL
LLLL1111LLLL111L
LLLLLL11LLL11L11
LLLLLL1LLL11LLLL
LLLL11LLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLL11LLL
1111111L111LLLLL
LLLLL1111LLLLLLL
LLLLL1LLL1LLLLLL
LLLLL1LLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [wall[1], bitmap`
LLLLLLLLLLLL1LLL
LLLLLLLL1LLL1LLL
LLLLLLLL11LL1LLL
LLL1LLLLL1L11LLL
LLL1111LL1L1LLLL
LLLLLLL11111LLLL
LLLLLLL111LLLLLL
LLLLL111LLLLLLLL
LLLL1LLLLLL1LLLL
LLLLLLLLLLL1LLLL
LLLLLLLLL11LLL11
11LLLL1L111L11LL
L11L111L1111LLLL
LL1111LLL111LLLL
LLL11LLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [wall[2], bitmap`
LLL11LLLLLLLLLLL
LLL11LLLLLLLLLLL
LL11LLLLL1LLLLLL
LL1LLLLL11LLLLL1
LL11111L1LLLLL1L
1LLLLLLL1LLLL1LL
11LLLLL11LL111LL
L1LLLLL1111LLLLL
LL11LLLLLL1LLLLL
LLL1LLLLLLL1LLLL
LLLL1LLL1LL111LL
LLLL11111LLLL1LL
LLLL11LLLLLLLLLL
LLL11LLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [floor[0], bitmap`
FCCCCCCCCCCCCFF0
FFCCCCCCCCCCCCC0
CCCCCCCCCCCCCCF0
0000000000000000
CCCCCCC0FCCCCCCC
CCCCCCF0CCCCCCCC
CCCCCFF0FFCCCCCC
0000000000000000
CCCCCCCCCCCCCCF0
FCCCCCCCCCCCCFF0
FFCCCCCCCCCCCCC0
0000000000000000
CCCCCFF0FFCCCCCC
CCCCCCC0FCCCCCCC
CCCCCCF0CCCCCCCC
0000000000000000`],
  [floor[1], bitmap`
CCCCCCCCCCCCCCF0
CCCCCCCCCCCCCCC0
FCCCCCCCCCCCCCF0
0000000000000000
CCCCCCF0CCCCCCCC
CCCCCCC0CCCCCCCC
CCCCCCC0FCCCCCCC
0000000000000000
FCCCCCCCCCCCCCC0
CCCCCCCCCCCCCFF0
CCCCCCCCCCCCCCC0
0000000000000000
CCCCCCC0CCCCCCCC
CCCCCCF0CCCCCCCC
CCCCCCC0FCCCCCCC
0000000000000000`],
  [floor[2], bitmap`
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
0000000000000000
CCCCCCC0CCCCCCCC
CCCCCCC0CCCCCCCC
CCCCCCC0CCCCCCCC
0000000000000000
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
CCCCCCCCCCCCCCC0
0000000000000000
CCCCCCC0CCCCCCCC
CCCCCCC0CCCCCCCC
CCCCCCC0CCCCCCCC
0000000000000000`],
  [grass[0], bitmap`
4444444444444444
4D4444444D444444
4D444D444D4444D4
44444D44444444D4
4444444444444444
444444444444D444
44D444444444D444
44D4444D44444444
44D4444D44444444
4444444444444444
4444444444D44444
4444444444D44D44
44D44D4444444D44
44D44D4444444444
44444444D4444444
44444444D4444444`],
  [grass[1], bitmap`
4444444444444444
4D44444444444444
4D44444444444D44
444444444D444D44
4444D4444D444444
4444D44444444444
4444444444444444
4D44444D4444D444
4D44444D4444D444
4444444444444444
444D444444444444
444D44444D444D44
444444444D444D44
4444444444444444
4D44444D44444444
4D44444D44444444`],
  [grass[2], bitmap`
44444444444D4444
44444444444D4444
444444D4444D44D4
44D444D4444444D4
44D44444D4444444
44444D44D4444D44
44444D4444444D44
4444444444444444
44D4444D44444444
44D4444D4444D444
444444444444D444
D4444D4444444444
D4444D4444444444
44444444444D4444
44D4444D444D44D4
44D4444D444444D4`]
);

const music = tune`
250: e4/250,
250,
250: e4/250,
250,
250: f4/250,
250: e4/250,
250: f4/250,
250,
250: d4/250,
250,
250: d4/250,
250,
250: g4/250,
500,
250: g4/250,
250,
250: f4/250,
250,
250: e4/250,
250: e4/250,
250,
250: e4/250,
250,
250: f4/250,
250: e4/250,
250: f4/250,
250,
250: d4/250,
250,
250: d4/250,
250,
250: g4/250,
250,
250: f4/250`;
const shootSound = tune`
75: b5/75 + f5/75 + c5/75 + g4/75 + d4/75,
75: c4-75 + e4-75 + a4-75 + d5-75 + g5-75,
2250`;

playTune(music, Infinity);

const backgrounds = [
  map`
ttuuuttttuuuuussssss
usuusssussstttssutus
ttstttttuttsuttustss
tsuuussuusssuussssus
ustuppppppppppppssts
ustupprpqqppqqppsuss
tstupqpprpppqpqpusus
tsuupppqpqrqqpppssus
ttttprppqqqqprppsstt
ttttpqqqppppqpqpssss
suttpprqqrpqprppssus
tttuppppppppppppssus
ttttttttttttttssssut
usttttttttttttssssts
usssssstttstttsststs
ttttttttuuutttstssss`,
  map`
ssssssssuuuuuuusssss
uusttttuuttttuutssss
suttttssssssssstutts
suuttttspqppsstttutt
stusttsspprpsssttutt
stussssspqppsssssstt
ssusspppprpppppsssss
ssusspqpqpqqprptssss
stusspprprprqpqsssus
stssspppppppprpsstus
tssssssspqrpssssssus
ttsssttsprqpststsuus
sttssttspppptsssuuts
ssuuuuusssstssuustss
sssttsuussstuuusssss
sssstuusssuussssssss`,
  map`
uuuuuuussuuuuuuuuuuu
uutssuuuutsusututstt
uututtuuuttuuuuutttt
stutsttttttstttstttt
ttsutttssststtststss
stuutssttuttusssssst
usuuuutttuutsssuusut
sttsuutussssuuuuusuu
stssstsususussustsss
ssttuttusssusssuutts
tusuttutusustttsstts
usuttutusuusttsuusss
utstttttsuuutuuuusss
sttsssttsttsutttttts
ttttttttttttttuttuts
ttttttttttstttttttss`
];

const mainMaps = [
  map`
....................
....................
....................
....................
....omnom..mnomm....
....m..........n....
....o..........m....
....................
..........a.........
....o..........n....
....n..........m....
....mnoom..mnomn....
....................
....................
....................
....................`,
  map`
....................
....................
....................
........o..m........
........n..o........
........o..n........
.....omnm..mnon.....
....................
..........a.........
.....momn..momo.....
........o..n........
........m..o........
........o..m........
....................
....................
....................`,
  map`
....................
....................
....................
....................
....................
....................
....................
..........a.........
....................
....................
....................
....................
....................
....................
....................`
];

const deathMap = map`
ommnn
mnmom
nmonn
omnmo`;

const level = Math.floor(Math.random()*mainMaps.length);

setMap(backgrounds[level]);
addMap(mainMaps[level]);

px = getAll(player[0]).concat(getAll(player[1])).concat(getAll(player[2])).concat(getAll(player[3]))[0].x;
py = getAll(player[0]).concat(getAll(player[1])).concat(getAll(player[2])).concat(getAll(player[3]))[0].y;

mapNat = getMapV2();
setMapV2(trimMapV2(px - 5, py - 4, 10, 8, mapNat));

setSolids(wall.concat(player).concat(enemy));

addText(ammo > 0 ? "Ammo: " + ammo : "RELOAD", {x: 0, color: color`7`});

onInput("w", () => {
  dir = 0;
});

onInput("a", () => {
  dir = 3;
});

onInput("s", () => {
  dir = 2;
});

onInput("d", () => {
  dir = 1;
});

onInput("k", () => {
  moveTurn = false;
  shoot = true;
});

onInput("l", () => {
  ammo = 10;
  reloadFrame = frames;
  moveTurn = false;
});

onInput("i", () => {
  moveTurn = false;
});

onInput("j", () => {
  moveTurn = false;
});

let interval = setInterval(() => {
  let enemies = getAll(enemy[0]).concat(getAll(enemy[1])).concat(getAll(enemy[2])).concat(getAll(enemy[3]));
  let players = getAll(player[0]).concat(getAll(player[1])).concat(getAll(player[2])).concat(getAll(player[3]));
  //die
  for (var i = 0; i < players.length; i++) {
    for (var j = 0; j < enemies.length; j++) {      
      if (Math.abs(players[i].x - enemies[j].x) + Math.abs(players[i].y - enemies[j].y) === 1) {
        clearInterval(interval);
        dead = true;
        clearText();
        addText("You died.", {
          color: color`3`
        });
        setMap(deathMap);
      }
    }
  }
  if(!dead){
    frames++;
    setMapV2(mapNat);
    //bullets
    let bullets = getAll(bullet[0]).concat(getAll(bullet[1])).concat(getAll(bullet[2])).concat(getAll(bullet[3]));
    for (var i = 0; i < bullets.length; i++) {
      if (bullet.indexOf(bullets[i].type) === 0) {
        let prevy = bullets[i].y;
        bullets[i].y--;
        if (bullets[i].y === prevy) {
          bullets[i].remove();
        }
      } else if (bullet.indexOf(bullets[i].type) === 1) {
        let prevx = bullets[i].x;
        bullets[i].x++;
        if (bullets[i].x === prevx) {
          bullets[i].remove();
        }
      } else if (bullet.indexOf(bullets[i].type) === 2) {
        let prevy = bullets[i].y;
        bullets[i].y++;
        if (bullets[i].y === prevy) {
          bullets[i].remove();
        }
      } else if (bullet.indexOf(bullets[i].type) === 3) {
        let prevx = bullets[i].x;
        bullets[i].x--;
        if (bullets[i].x === prevx) {
          bullets[i].remove();
        }
      }
      let bulletTile = getTile(bullets[i].x, bullets[i].y);
      for (var j = 0; j < bulletTile.length; j++) {
        if (enemy.includes(bulletTile[j].type)) {
          bullets[i].remove();
          bulletTile[j].remove();
          score++;
        } else if (wall.includes(bulletTile[j].type)) {
          if (!bullets[i]) break;
          bullets[i].remove();
        }
      }
    }
    //enemies
    enemies = getAll(enemy[0]).concat(getAll(enemy[1])).concat(getAll(enemy[2])).concat(getAll(enemy[3]));
    players = getAll(player[0]).concat(getAll(player[1])).concat(getAll(player[2])).concat(getAll(player[3]));
    if (frames % 4 === 0) {
      for (var i = 0; i < enemies.length; i++) {
        if (enemy.indexOf(enemies[i].type) === 0) {
          enemies[i].y--;
        } else if (enemy.indexOf(enemies[i].type) === 1) {
          enemies[i].x++;
        } else if (enemy.indexOf(enemies[i].type) === 2) {
          enemies[i].y++;
        } else if (enemy.indexOf(enemies[i].type) === 3) {
          enemies[i].x--;
        }
        if (players[0].y < enemies[i].y) {
          enemies[i].type = enemy[0];
        } else if (players[0].x > enemies[i].x) {
          enemies[i].type = enemy[1];
        } else if (players[0].y > enemies[i].y) {
          enemies[i].type = enemy[2];
        } else if (players[0].x < enemies[i].x) {
          enemies[i].type = enemy[3];
        }
      }
    }
    if (frames % 10 === 0) {
      let grasses = getAll(grass[0]).concat(getAll(grass[1])).concat(getAll(grass[2]));
      let spawn = grasses[Math.round(Math.random() * grasses.length - 1)];
      addSprite(spawn.x, spawn.y, enemy[0]);
    }
    mapNat = getMapV2();
    setMapV2(trimMapV2(px - 5, py - 4, 10, 8, mapNat));
    addText(ammo > 0 ? reloadFrame < frames-8 ? "Ammo: " + ammo : "RELOADING" : "RELOAD", {x: 0, color: color`7`});
    addText("Score: " + score, {x: 0, y: Math.round(height()*1.9), color: color`7`});
  }
}, 250);

afterInput(() => {
  if(!dead){
    clearText();
    addText(ammo > 0 ? reloadFrame < frames-8 ? "Ammo: " + ammo : "RELOADING" : "RELOAD", {x: 0, color: color`7`});
    addText("Score: " + score, {x: 0, y: Math.round(height()*1.9), color: color`7`});
    setMapV2(mapNat);
    let players = getAll(player[0]).concat(getAll(player[1])).concat(getAll(player[2])).concat(getAll(player[3]));
    if (moveTurn) {
      for (var i = 0; i < players.length; i++) {
        if (dir === 0) {
          players[i].y--;
        } else if (dir === 1) {
          players[i].x++;
        } else if (dir === 2) {
          players[i].y++;
        } else if (dir === 3) {
          players[i].x--;
        }
        players[i].type = player[dir];
      }
    }
    if (shoot && ammo > 0 && reloadFrame < frames-8) {
      for (var i = 0; i < players.length; i++) {
        addSprite(players[i].x, players[i].y, bullet[dir]);
        ammo--;
      }
    }
    px = players[0].x;
    py = players[0].y;
    mapNat = getMapV2();
    setMapV2(trimMapV2(px - 5, py - 4, 10, 8, mapNat));
    moveTurn = true;
    shoot = false;
  }
});
