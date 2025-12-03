// controls: w->up,a->left,s->down,d->right.j->Reset level
const P = "p";
const WALL = "w";
const KEY = "k";
const LOCKED = "l";
const EXIT = "e";
const FOG = "f";

setLegend(
  [WALL, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  
  [KEY, bitmap`
................
................
......DCDCDC....
.....DCDCDCDC...
.....CD....CD...
.....DC....DC...
.....CDCDCDCD...
......CDCDCD....
........DC......
........CD......
........DC......
.....DCDCD......
.....C..DC......
.....DCDC.......
................
................`],
  
  [LOCKED, bitmap`
................
................
.......666......
......6...6.....
......6...6.....
.....6666666....
.....6666666....
.....6666666....
.....666.666....
.....666.666....
.....6666666....
................
................
................
................
................`],
  
  [EXIT, bitmap`
................
................
................
................
...7.........7..
...77777777777..
...77.77777.77..
..777.......777.
...77.77777.77..
...77777777777..
...7.........7..
................
................
................
................
................`],
  
  [P, bitmap`
................
................
....HHHHHHH.....
....H00000H.....
....H03330H.....
....H00000H.....
....H00000H.....
....HHHHHHH.....
.......H........
....H..H........
....HHHHHHH.....
.......H..H.....
.......H........
.....HHHHH......
.....H...H......
.....H...H......`],
  
  [FOG, bitmap`
DCDCDCDCDCDCDCDC
CDCDCDCDCDCDCDCD
DCDCDCDCDCDCDCDC
CDCDCDCDCDCDCDCD
DCDCDCDCDCDCDCDC
CDCDCDCDCDCDCDCD
DCDCDCDCDCDCDCDC
CDCDCDCDCDCDCDCD
DCDCDCDCDCDCDCDC
CDCDCDCDCDCDCDCD
DCDCDCDCDCDCDCDC
CDCDCDCDCDCDCDCD
DCDCDCDCDCDCDCDC
CDCDCDCDCDCDCDCD
DCDCDCDCDCDCDCDC
CDCDCDCDCDCDCDCD`]
);

setSolids([WALL]);

const levels = [
map`
wwwwwwwwwwww
wp....w.l..w
w.ww..w.w..w
w..w..wew..w
w.kw..ww...w
w..........w
wwwwwwwwwwww`,
map`
wwwwwwwwwwww
wp..w.....ew
w.wwkw.ww..w
w....w.....w
w.....ww...w
w.....l....w
wwwwwwwwwwww`,
map`
wwwwwwwwwwww
wp.....w..ew
w.wwww.ww.ww
w......w...w
w.wwww.w.www
w.......l..w
ww........kw`,
map`
wwwwwwwwwwww
wp........ww
w.w.wwwwwl.w
w.w.....ww.w
w.wwwww.ww.w
w.....wkw.ew
wwwwwwwwwwww`,
map`
wwwwwwwwwwww
wp......l..w
w.www.w.w..w
w.....w.w..w
w.wwwww.w.ww
w...k...w.ew
wwwwwwwwwwww`,
map`
wwwwwwwwwwww
wp..w...kwew
w.w.w.ww.w.w
w.w.w....w.w
w.w.w.wwww.w
w.......l..w
wwwwwwwwwwww`,
map`
wwwwwwwwwwww
wp....k....w
w.wwwwwwww.w
w.........lw
w.wwwwwwww.w
w.......le.w
wwwwwwwwwwww`,
map`
wwwwwwwwwwww
wp.....k...w
wwwwwwwwww.w
w.w.l......w
w.w.wwwwwwww
w........e.w
wwwwwwwwwwww`
];

let levelIndex = 0;
let hasKey = false;

function clearAllSprites() {
  getAll().forEach(s=>{if(s.remove)s.remove();});
}

function placeFogOverlay() {
  getAll(FOG).forEach(s=>s.remove());
  for(let x=0;x<width();x++){
    for(let y=0;y<height();y++){
      addSprite(x,y,FOG);
    }
  }
}

function revealAroundPlayer() {
  const p=getFirst(P);
  if(!p) return;
  for(let dx=-1;dx<=1;dx++){
    for(let dy=-1;dy<=1;dy++){
      const tx=p.x+dx, ty=p.y+dy;
      if(tx<0||ty<0||tx>=width()||ty>=height()) continue;
      getTile(tx,ty).forEach(s=>{if(s.type===FOG)s.remove();});
    }
  }
}

function loadLevel(n){
  clearAllSprites();
  setMap(levels[n]);
  placeFogOverlay();
  hasKey=false;
  revealAroundPlayer();
  clearText();
  addText(`Level ${levelIndex+1}/${levels.length}`,{x:0,y:0,color:color`3`});
}

function canMoveTo(x,y){
  const t=getTile(x,y);
  if(t.some(s=>s.type===WALL)) return false;
  if(t.some(s=>s.type===LOCKED)&&!hasKey) return false;
  return true;
}

function playerMove(dx,dy){
  const p=getFirst(P);
  if(!p) return;
  const tx=p.x+dx, ty=p.y+dy;
  if(!canMoveTo(tx,ty)) return;
  p.x=tx; p.y=ty;
  placeFogOverlay();
  revealAroundPlayer();
  const t=getTile(tx,ty);
  if(t.some(s=>s.type===KEY)){
    t.forEach(s=>{if(s.type===KEY)s.remove();});
    hasKey=true;
    t.forEach(s=>{if(s.type===LOCKED){addSprite(s.x,s.y,EXIT);s.remove();}});
  }
  if(t.some(s=>s.type===EXIT)){
    levelIndex++;
    if(levelIndex>=levels.length){
      clearText();
      addText("YOU WIN!",{x:4,y:2,color:color`4`});
      return;
    }
    loadLevel(levelIndex);
  }
}

// Controls
onInput("w",()=>playerMove(0,-1));
onInput("s",()=>playerMove(0,1));
onInput("a",()=>playerMove(-1,0));
onInput("d",()=>playerMove(1,0));
onInput("j",()=>loadLevel(levelIndex));

// Start
loadLevel(levelIndex);
