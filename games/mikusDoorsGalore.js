/*
@title: Miku's_Doors_Galore!
@author: tqbed
@tags: ['puzzle']
@addedOn: 2024-06-22
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p";
const tutorial1 = "e"; 
const tutorial2 = "b";
const key = "k";
const door = "d"; 
const trapdoor = "t";
const magma = "m"; 
const leeks = "l"; 
const wall = "w"; 
const floor = "f";

const keysound = tune `
82.41758241758242: D4-82.41758241758242,
82.41758241758242: E4-82.41758241758242,
82.41758241758242: F4-82.41758241758242,
82.41758241758242: G4-82.41758241758242,
82.41758241758242: A4-82.41758241758242,
82.41758241758242: B4-82.41758241758242,
82.41758241758242: C5-82.41758241758242,
2060.4395604395604`;
const bgm = tune`
230.76923076923077: D4~230.76923076923077,
230.76923076923077: E4~230.76923076923077,
230.76923076923077: G4~230.76923076923077,
230.76923076923077: E5~230.76923076923077,
230.76923076923077: D5~230.76923076923077,
230.76923076923077: C5~230.76923076923077,
230.76923076923077: B4~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077: E4~230.76923076923077,
230.76923076923077: G4~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077: E4~230.76923076923077,
230.76923076923077: G4~230.76923076923077,
230.76923076923077: E5~230.76923076923077,
230.76923076923077: D5~230.76923076923077,
230.76923076923077: C5~230.76923076923077,
230.76923076923077: B4~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077: E4~230.76923076923077,
230.76923076923077: G4~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077: E4~230.76923076923077,
230.76923076923077: G4~230.76923076923077,
230.76923076923077: E5~230.76923076923077,
230.76923076923077: D5~230.76923076923077,
230.76923076923077: C5~230.76923076923077,
230.76923076923077: B4~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077: E4~230.76923076923077,
230.76923076923077: G4~230.76923076923077,
230.76923076923077: A4~230.76923076923077,
230.76923076923077: G4~230.76923076923077`; 
const winner = tune `
85.47008547008546: D4^85.47008547008546,
85.47008547008546: E4^85.47008547008546,
85.47008547008546: F4^85.47008547008546,
85.47008547008546: G4^85.47008547008546,
85.47008547008546: A4^85.47008547008546 + C4^85.47008547008546,
85.47008547008546: B4^85.47008547008546 + D4^85.47008547008546,
85.47008547008546: C5^85.47008547008546 + E4^85.47008547008546,
85.47008547008546: D5^85.47008547008546 + F4^85.47008547008546,
85.47008547008546: E5^85.47008547008546 + G4^85.47008547008546,
85.47008547008546: F5^85.47008547008546 + A4^85.47008547008546,
85.47008547008546: B4^85.47008547008546 + G5^85.47008547008546,
85.47008547008546: C5^85.47008547008546,
85.47008547008546: D5^85.47008547008546,
85.47008547008546: E5^85.47008547008546,
85.47008547008546: F5^85.47008547008546,
85.47008547008546: G5^85.47008547008546,
85.47008547008546: A5^85.47008547008546,
85.47008547008546: A5^85.47008547008546,
85.47008547008546: A5^85.47008547008546,
85.47008547008546: A5^85.47008547008546,
85.47008547008546: A5^85.47008547008546,
85.47008547008546: A5^85.47008547008546,
854.7008547008546`;
const gooddoor = tune `
78.94736842105263: C4/78.94736842105263,
78.94736842105263: D4/78.94736842105263,
78.94736842105263: E4/78.94736842105263,
78.94736842105263: F4/78.94736842105263,
78.94736842105263: G4/78.94736842105263,
78.94736842105263: A4/78.94736842105263,
78.94736842105263: B4/78.94736842105263,
78.94736842105263: C5/78.94736842105263,
1894.7368421052631`;
const baddoor = tune `
78.94736842105263,
78.94736842105263: C5/78.94736842105263,
78.94736842105263: B4/78.94736842105263,
78.94736842105263: A4/78.94736842105263,
78.94736842105263: G4/78.94736842105263,
78.94736842105263: F4/78.94736842105263,
78.94736842105263: E4/78.94736842105263,
78.94736842105263: D4/78.94736842105263,
78.94736842105263: C4/78.94736842105263,
1815.7894736842104`;
const hotmagma = tune `
67.41573033707866: C4-67.41573033707866,
67.41573033707866: C4-67.41573033707866,
67.41573033707866: C4-67.41573033707866,
1955.056179775281`;



setLegend(
  [ player, bitmap`
...78..77..87...
..788877778887..
.77787777778777.
777.77F77777.777
77..7F5FF577..77
77..FF5FF5F7..77
77...FF00FF...77
77....FFFF....77
77.....LL.....77
7....FLLLLF....7
..F.F.LLLL.F.F..
.FF0..7777..0FF.
......0000......
......7777......
......F..F......
.....00..00.....` ],
  [ key, bitmap`
................
..FFFFFF........
.F666666F.......
.F6666666F......
.F6066606F......
.F6066606F......
.F6666666F......
.F6606606F......
..F660066FF.....
...F6666666F....
....FFFFFF66F...
..........F66F..
........FF6666F.
........F666F66F
........F66F666F
.........FFF66F.` ],
  [ door, bitmap`
..000000000000..
..0CCCCCCCCCC0..
..0CCCCCCCCCC0..
..0CCCCCCCCCC0..
..0CCC4CC44CC0..
..0CCC44C4CCC0..
..0CCCC444CCC0..
..0CCCC24CCCC0..
..0CCC22CCCCC0..
..0CC22CCCLLC0..
..0CCCCCCC1LC0..
..0CCCCCCCCCC0..
..0CCCCCCCCCC0..
..0CCCCCCCCCC0..
..0CCCCCCCCCC0..
..0CCCCCCCCCC0..` ],
  [ trapdoor, bitmap`
..000000000000..
..0CCCCCCCCCC0..
..0CCCCCCCCCC0..
..0CCCCCCCCCC0..
..0CC44CC4CCC0..
..0CCC4C44CCC0..
..0CCC444CCCC0..
..0CCCC42CCCC0..
..0CCCCC22CCC0..
..0CLLCCC22CC0..
..0CL1CCCCCCC0..
..0CCCCCCCCCC0..
..0CCCCCCCCCC0..
..0CCCCCCCCCC0..
..0CCCCCCCCCC0..
..0CCCCCCCCCC0..`],
  [ wall, bitmap`
000000CCCC0CCCCC
0CCCC0CCCC0CC00C
0CCCC00000000000
0CCCC0CCCC0CCCC0
00000000000CC000
CCCCCC0CCC0000CC
CCC000000000C0CC
0000CC0CCC0CC0CC
0CC0CC0000000000
0CC00000CC0CCCC0
00000CCCCC0C0000
CCCC000000000CCC
CCCCCC0CCCCC0000
000000000CCC0CC0
CCCCCCCC00000CC0
CCCCCCCC0CCCCCC0`],
  [ floor, bitmap`
1121112111121111
1111111121111121
2112112111112112
1111111121111111
1121111111121111
1112121111111121
2111111121111111
1112111111121111
1211112111111111
1112111121112111
1111121111111112
1111111111211111
1211111111112111
1111121121111121
1112111111212111
2111111121111111`],
  [ leeks, bitmap`
.DDDD......DDDD.
.D444D....D4444D
.D4444D..D44444D
..D4444DDD44444D
...D4444444444D.
....D44444444D..
.....D444444D...
.....D24422D....
.....D22222D....
....D22222D.....
...D22222D......
..D22222D.......
.D22222D........
.D2222D.........
..D22D..........
...DD...........`],
  [ magma, bitmap`
3399999999999999
CC39933339933399
9CC33CCCC33CCC39
99CCC999CCCC9CC3
39999999999999CC
C333999999999999
CCCC393333993399
999CC3CCCC33CC39
9999CCC999CCCCC3
99999999999999CC
3999999999999999
C399333399999999
CCC3CCCC39333399
99CCC99CC3CCCC33
999999999CC99CCC
9999999999999999`],
  [ tutorial1, bitmap`
1121112111121111
1111111121111121
2112112111112112
1111111121111111
1121111111121111
1112121111111121
2111111121111111
1112111111121111
1211112111111111
1112111121112111
1111121111111112
1111111111211111
1211111111112111
1111121121111121
1112111111212111
2111111121111111`],
  [ tutorial2, bitmap`
1121112111121111
1111111121111121
2112112111112112
1111111121111111
1121111111121111
1112121111111121
2111111121111111
1112111111121111
1211112111111111
1112111121112111
1111121111111112
1111111111211111
1211111111112111
1111121121111121
1112111111212111
2111111121111111`]
);

setSolids([player, wall]);

let level = 0;
const levels = [
  map`
p...
....
....
...d`,
  map`
d..k
....
..ee
..ep`,
    map`
pb.....
bb.....
.......
...k...
.......
.......
dmmmmmt`,
  map`
p..mmt.t
..mm...m
.mm...mm
.m.km..m
...mmm..
..mmm...
.mmm....
mmmd...t`,
    map`
p.wwwwwwwwww
w.wt........
w.wwww..w...
w......ww.w.
w....w.w..w.
wwww.w.w..w.
w.kw.w.www..
w.ww.w.wd...
w....w.wwwww
w.wwww.w....
w.w.........
www....wwwwt`,
    map`
wk...wwwww......
w.ww.....mwwwwww
ww..w..wmmmmw...
www.w.wwmwww....
w...w...ww...wtw
w.ww...ww..wwwww
w.w...ww........
w.w.www..ww.www.
w.........w.w...
wwwww.w...wwwwww
w.....w.w......p
w.wwwww.w.....ww
w..w....ww.www..
w.wwtwwww.......
w.......mm......
wwwwww..dmwwwwww`,
  map`
pw......tw.wwwww...tw
.www.w..ww....tw.w.w.
...w.ww..w...www.www.
ww....w.ww..ww....w..
.w.ww.w.w..w....ww...
.w.w..w.w.w..w...w.w.
..ww.ww.w.wwww.ww..w.
.w...w..w.w.......w..
.wwwww.ww.wtw....w...
....w..w..twwwwww....
wwwwww...ww.......www
t...kw.www...www.....
www.w.......ww....ww.
....w..www.w.wt..www.
.www.....w....w.w.tw.
.w...w.w..w.w.ww..ww.
.w.w.w.ww.....w..www.
.wtw..w....w....w....
.wwwwww.wwwwwwwww.ww.
............wd....ww.`,
  map`
..l..
.....
.....
.....
..p..`
];

let hasKey = true;
setBackground(floor);
playTune(bgm, Infinity); 

addText("Find the leeks!", { y: 7, color: color`0` });

function loadLevel(levelIndex) {
  level = levelIndex;
  setMap(levels[level]);
  hasKey = false; // Reset key possession when changing levels


}

setMap(levels[level]);

setPushables({
  [ player ]: []
});

onInput("w", () => {
  getFirst(player).y -= 1;
  checkTile();
});

onInput("a", () => {
  getFirst(player).x -= 1;
  checkTile();
});

onInput("s", () => {
  getFirst(player).y += 1;
  checkTile();
});

onInput("d", () => {
  getFirst(player).x += 1;
  checkTile();
});

onInput("i", () => {
  const playerPos = getFirst(player);
  const tileAtPlayer = getTile(playerPos.x, playerPos.y);
  
  // Check if the player is on a key
  tileAtPlayer.forEach((t) => {
  if (t.type == key) {
    playTune(keysound, 1)
    console.log("has key now") 
    hasKey = true
    t.remove()
  }
  });
});

function checkTile() {
  const playerPos = getFirst(player);
  const tileAtPlayer = getTile(playerPos.x, playerPos.y);

  // Check if the player is on the door
  tileAtPlayer.forEach((t) => {
  if (t.type == door && hasKey) {
    console.log("on door now") 
    playTune(gooddoor, 1)
    loadLevel(level + 1);
    clearText();
  }
  });

  // Check if the player is on trapdoor
  tileAtPlayer.forEach((t) => {
  if (t.type == trapdoor && hasKey) {
    console.log("on trapdoor now") 
    playTune(baddoor, 1)
    loadLevel(level - 1);
    clearText();
  }
  });

  // Check if the player is on magma
  tileAtPlayer.forEach((t) => { 
  if (t.type == magma) {
    console.log("on magma now") 
    playTune(hotmagma, 1)
    if (level == 5){ 
    getFirst(player).x = 16;
    getFirst(player).y = 6;  }
    else{
      getFirst(player).x = 0;
      getFirst(player).y = 0;
    }
  }
  
    
  });

  // Check if the player got the leeks!!
  tileAtPlayer.forEach((t) => {
  if (t.type == leeks) {
    console.log("on leeks now") 
    playTune(winner, 1)
    addText("Miku is Happy :)", { y: 8, color: color`0` });
    addText("Leeks Acquired!", { y: 6, color: color`0` });
    addText("You Win!", { y: 4, color: color`0` });
  }
  });

  //display tutorial 1 text 
  tileAtPlayer.forEach((t) => {
  if (t.type == tutorial1) {
    console.log("on tutorial1 now") 
    addText("use i to get key", { y: 7, color: color`0` });
  }
  });

    //display tutorial 2 text 
  tileAtPlayer.forEach((t) => {
  if (t.type == tutorial2) {
    console.log("on tutorial2 now") 
    addText("avoid flipped", { y: 5, color: color`0` });
    addText("leek doors!", { y: 6, color: color`0`});
    addText("avoid magma!", { y: 9, color: color`0` });
  }
  });

}

afterInput(() => {
  // Any additional game logic can be placed here
});

