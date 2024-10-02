/*
@title: cool_platformer
@author: Aiden/Roizor
@tags: ['strategy']
@addedOn: 2022-11-12
*/

const player = "p";
const box = "b";
const goal = "g";
const death = "d";
const pbox = "x";
const plain = "m";
const coin = "c";
let lastBlock = "";
let stage= 0;
let score = 0;
let doubleJumpState = 0;
let getCoin = false;

setLegend(
  [player, bitmap`
................
................
................
......000.......
.....00000......
....0000000.....
...000000000....
...000000000....
...000000000....
....0000000.....
.....00000......
......000.......
................
................
................
................`],
  [box, bitmap`
................
................
................
................
................
................
................
................
................
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [goal, bitmap`
...........44444
...........44444
...........44444
...........44444
...........44444
...........44444
...........44444
...........44444
...........44444
...........44444
...........44444
...........44444
...........44444
...........44444
...........44444
...........44444`],
  [death, bitmap`
................
................
................
................
................
................
.......00.......
.......00.......
......0000......
.....000000.....
....00000000....
...0000000000...
..000000000000..
.00000000000000.
.00000000000000.
.00000000000000.`],
  [plain, bitmap`
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
  [pbox, bitmap`
................
................
................
................
................
................
................
................
................
0000000000000000
0LL0000000000LL0
0LL0000000000LL0
00LLLLLLLLLLLL00
0LL0000000000LL0
0LL0000000000LL0
0000000000000000`],
  [coin, bitmap`
................
.....666666.....
....666FF666....
...666F66F666...
..666F6666F666..
..66F660066F66..
..66F660066F66..
..66F660066F66..
..66F660066F66..
..66F660066F66..
..66F660066F66..
..666F6666F666..
...666F66F666...
....666FF666....
.....666666.....
................`],
  ['l', bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`]
)

setBackground('l');
const presetGoals = [
  0,
  1,
  3,
  1,
  4,
  1,
  5,
  0
]

const stages = [
  map`
...............g
...............g
...............g
...............g
p....bb.dd.....g`, // Starting stage,
  map`
...............g
c.x............g
mmmmm..........g
.......b.......g
p....bmmmm.....g`,
    map`
...............g
..c.....c......g
......x.....c..g
..x........mm..g
p....bb.dd.mm..g`,
    map`
...............g
..........bbb..g
.............mmm
............c..m
p....mmm...dbd.m`,
    map`
cccc...mmmmmmmm.
.............gm.
.xxd....bbbb.gm.
...m.......mmmm.
p..m.bb.ddddd...`,
    map`
g........mdcm...
mm.m.m.m........
mmmmmmmmmmmmmmm.
m...m...m...m...
p.m...m...m...m.`,
    map`
mmmm.c...cm...cg
m..mbbb.......mm
.x..........d.mm
...b.mmm..mmm.mm
p.bm..cmd..cmdmm`,
  map`
.mmmmm.m.mmmm...
.m.....m.m..m...
.mmmmm.m.m..m...
.m.....m.m..m.m.
p...............`,
];
setMap(stages[stage]);

setSolids([ player, box, plain, pbox ]);

setPushables({
  [player]: [pbox]
})

onInput("w", () => {
  if(getCoin) return;
  jumpPhysics();
  doubleJumpState = 1;
  setTimeout(function () {
    doubleJumpState = 0;
  },500)
})
onInput("a", () => {
  if(getCoin) return;
  getFirst(player).x -= 1;
})

onInput("d", () => {
  if(getCoin) return;
  let px = getFirst(player).x;
  let py = getFirst(player).y;
  getTile(px+1, py).forEach(tile => {
      if(tile._type == "b") {
        lastBlock = "b";
        getFirst(player).y -= 1;
      }
  })
  getFirst(player).x += 1;
});

afterInput(() => {
  if(getCoin) return;
  let px = getFirst(player).x;
  let py = getFirst(player).y;
  // What block are we inside
   getTile(px, py).forEach(tile => {
    let t = tile._type;
       if(t == "c") {
          score++;
         getAll("c").forEach(tt=> {
           if(tt._x == px && tt._y == py) {
             getCoin =true;
             getFirst(player).x = 4;
             getFirst(player).y = 0;
             clearTile(tt._x, tt._y);
             getFirst(player).x = tt._x;
             getFirst(player).y = tt._y;
             getCoin = false;
           }
         })
       }
  })
  // Block check
  getTile(px, py+1).forEach(tile => {
    let t = tile._type;
       if(t == "b" || t=="x") {
          lastBlock = "b";
       }
  })
  // Down
  if(py == 3) {
    if(getCoin) return;
    if(doubleJumpState == 1) return;
    if(lastBlock != "b") return;
    let amnt = 0;
  getTile(px, py+1).forEach(tile => {
       amnt++;
  })
    if(amnt == 0) {
      lastBlock = "";
      getFirst(player).y ++;
    }
  }
  
})
function jumpPhysics() {
  if(getCoin) return;
  let px = getFirst(player).x;
  let py = getFirst(player).y;
  if(getCoin) return;
  getFirst(player).y -= 1;
  setTimeout(function () {
    if(getCoin) return;
    getFirst(player).y += 1;
  },250);
  getTile(px, py+1).forEach(tile => {
   let t=tile._type
       if(t == "b" || t=="x") {
          lastBlock = "b";
       }
    if( t == "c") {
      getFirst(player).y += 1;
    }
  })
}

setInterval(function () {
  
  let px = getFirst(player).x;
  let py = getFirst(player).y;
  getTile(px, py).forEach(tile => {
    let t = tile._type;
       if(t == "c") {
          score++;
         getAll("c").forEach(tt=> {
           if(tt._x == px && tt._y == py) {
             getCoin = true;
             getFirst(player).x = 4;
             getFirst(player).y = 0;
             clearTile(tt._x, tt._y);
             getFirst(player).x = tt._x;
             getFirst(player).y = tt._y;
             getCoin = false;
           }
         })
       }
  })
  
    // Check if inside spike :(( or win :))  
  getTile(px, py).forEach(tile => {
       if(tile._type == "d") {
         setMap(stages[stage]);
         score = 0;
       }
    if(tile._type == "g") {
      // Make sure score requirement is met
      if(score != presetGoals[stage]) {
        addText("Goal not met", { 
  x: 8,
  y: 4,
  color: color`3`
})
        addText("Need "+presetGoals[stage]+" coin(s)", { 
  x: 6,
  y: 5,
  color: color`3`
})
        setTimeout(function () {clearText()},1000)

        return;
      }
      setMap(stages[stage+1]);
      stage ++;
      score = 0;
    }
  })
},250)
// Slower physics check()
setInterval(function () {
  if(getCoin) return;
  let px = getFirst(player).x;
  let py = getFirst(player).y;
  if(py <= 3) {
    if(doubleJumpState == 1) return;
    let amnt = 0;
  getTile(px, py+1).forEach(tile => {
       amnt++;
  })
    if(amnt == 0) {
      lastBlock = "";
      getFirst(player).y ++;
    }
  }
  //make sure movable blocks are not blocking coins
  getAll("x").forEach(pbox=> {
    getAll("c").forEach(coin=>{
      if(pbox._x == coin._x && pbox._y == coin._y) {
        pbox._x ++;
        pbox._y ++;
      }
    })
  })
},1000)