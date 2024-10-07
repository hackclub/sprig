/*
@title: Exodus
@author: Jarsa
@tags: []
@addedOn: 2024-06-07
@img: ""
*/

const player = "p"
const ogre = "o"
const gate = "g"
const wall = "w"
const background = "b";
const heart = "t";
let reset = 3;
const x = "x";





let m = 1;
const death = tune`
120: G5-120,
120: F5-120,
120: C4-120,
3480`;
const revive =  tune`
100: A4-100 + G4~100 + F4/100,
100: B4-100 + A4~100 + G4/100,
100: C5-100 + B4~100 + A4/100,
100: C5/100 + D5^100 + E5^100,
2800`;

setLegend(
  [ background, bitmap`
LLLLL1L1L1111110
LLLLLLLLLLLLLL10
LLLLLLLLLLLLLL10
LLLLLLLLLLLLLL10
LLLLLLLLLLLLLL10
LLLLLLLLLLLLLL10
LLLLLLLLLLLLLLL0
LLLLLLLLLLLLLL10
LLLLLLLLLLLLLL10
LLLLLLLLLLLLLLL0
LLLLLLLLLLLLLL10
LLLLLLLLLLLLLLL0
LLLLLLLLLLLLLLL0
LLLLLLLLLLLLLLL0
LLLLLLLLLLLLLLL0
0000000000000000`],
  [player, bitmap`
....0000000.....
...0LLLLLLL0....
..0L11111110....
..0L11111110....
..0110000000....
..0111100010....
..0111110110....
...001110110....
....00110110....
....00000000000.
.00000000222220.
0L002222111000..
0L011111000.....
.0000000110.....
...010.010......
...00..00.......`],
  [ ogre, bitmap`
.00..........00.
00.333....333.00
0003333..3333000
.03000333300030.
.33333033033333.
.33322333322333.
.33222233222233.
3332202332022333
3333223333223333
3333333333333333
.33300000000333.
..330828828033..
...3308888033...
.....300003.....
......3333......
................` ],
  [ gate, bitmap`
...0000000000...
..0LLL11L111L0..
.01111111LLL1L0.
011LL100001L11L0
111L100000011L1L
L1110000000011L1
L110000000000111
11L00000000001L1
L1L00000000001L1
1110000000000111
1L10000000000L1L
1L10000000000L1L
1110000000000111
11L0000000000111
L1L00000000001L1
L1100000000001L1` ],
  [ wall, bitmap`
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
0000000000000000` ],  
  [ heart,  bitmap`
0000000000000000
0000000000000000
0003300000033000
0033330000333300
0333333003333330
0333333333333330
0333333333333330
0333333333333330
0033333333333300
0003333333333000
0000333333330000
0000033333300000
0000003333000000
0000000330000000
0000000000000000
0000000000000000`],
  [ x ,  bitmap`
0000000000000000
0300000000000030
0330000000000330
0033000000003300
0003300000033000
0000330000330000
0000033003300000
0000003333000000
0000000330000000
0000003333000000
0000033003300000
0000330000330000
0003300000033000
0033000000003300
0330000000000330
0000000000000000`],
);

setBackground(background);
setSolids([ player, wall,heart,x ]);

let level = 0;
const levels = [
  
   map`
.......
.......
.......
.......
.......
...g...
..wpw..
...w...`,
   map`
tttwwww
g......
wwwowww
www...w
pww.w.w
.ww...w
.ww.www
....www`,
  map`
tttwwww
.w.o...
.ww.ww.
.w...w.
pww.wwg
.w...w.
.ww.ww.
......w`,
 
   map`
tttwwww
..wo...
..w....
..w....
p.w.w.g
..w.w..
....w..
....w..`,
  
    map`
tttwwww
......o
.wwww..
.w...w.
.w.w.w.
.w.w.w.
.w.w.w.
pwgw...`,
   map`
tttwwww
gw...ow
......w
wwwww.w
p...w.w
www.w.w
..w.w.w
..w...w`,
    map`
.......
.......
.......
.......
.......
.......
.......
.......`,
  
 
  
  
 
];
  addText("Exodus", { 
  x: 7,
  y: 1,
  color: color`3`
})
addText("Press W ", { 
  x: 6,
  y: 5,
  color: color`0`
})
addText(" To Play ", { 
  x: 5,
  y: 7,
  color: color`0`
})




function startLevel() {
  const currentLevel = levels[level];
  setMap(currentLevel);
}
function resetLevel() {
  level = 0;
  reset = 3;
  startLevel();
}

startLevel();

setPushables({
  [ player ]: []
})

onInput("w", () => getFirst(player).y -= 1);
onInput("s", () => getFirst(player).y += 1);
onInput("a", () => getFirst(player).x -= 1);
onInput("d", () => getFirst(player).x += 1);

function moveOgre() {
  const ogreEntity = getFirst(ogre);
  if (ogreEntity) {
    clearText()
    if (ogreEntity.y === 1) m = 1;
    if (ogreEntity.y === 7) m = -1;
    ogreEntity.y += m;
  }
}
setInterval(moveOgre, 200);
function health(){
if (reset===2){
  clearTile(reset,0)
  addSprite(reset,0, x)
}
if (reset===1){
  clearTile(reset,0)
  clearTile(2,0)
  addSprite(reset,0, x)
  addSprite(2,0, x)

}
}

setInterval(health, 1);

function checkCollision() {
  const playerEntity = getFirst(player);
  const ogreEntity = getFirst(ogre);
  if (playerEntity && ogreEntity && playerEntity.x === ogreEntity.x && playerEntity.y === ogreEntity.y) {
    playTune (death)
    reset -= 1;
    clearTile(reset,0)
    addSprite(reset,0, x)
    if (reset === 0){
      
      setTimeout(() => {
        resetLevel();
        addText("Exodus", { 
  x: 7,
  y: 1,
  color: color`3`
})
addText("Press W ", { 
  x: 6,
  y: 5,
  color: color`0`
})
addText(" To Play ", { 
  x: 5,
  y: 7,
  color: color`0`
})
      }, 1000); 
  
      
    }
    getFirst(player).x = 0;
    getFirst(player).y = 4;
    

  }
}
setInterval(checkCollision, 50);



afterInput(() => {
  const playerEntity = getFirst(player);
  const gateEntity = getFirst(gate);

  if (playerEntity.x === gateEntity.x && playerEntity.y === gateEntity.y && level != 6) {
    playTune(revive);
    level += 1;
    startLevel();
  }

  if (level === 6) {
  addText("Thanks", { 
    x: 4,
    y: 4,
    color: color`0`
  });
  addText("for Playing!", { 
    x: 4,
    y: 6,
    color: color`0`
  });
  
  if (playerEntity.x === gateEntity.x && playerEntity.y === gateEntity.y) {
    resetLevel();
  }
}

});
