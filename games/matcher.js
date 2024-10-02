/*
@title: matcher
@author: Brian
@tags: ['puzzle']
@addedOn: 2022-08-12

ijkl to move the selector
wasd to move the selected block
match lefts and rights
*/

const player = "p";
const left = "l";
const right = "r";

let ptile;

setLegend(
  [ player, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0000000000000000`],
  [left, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555666666
5555555555666666
5555555555666666
5555555555666666
5555555555666666
5555555555666666
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [right, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
6666665555555555
6666665555555555
6666665555555555
6666665555555555
6666665555555555
6666665555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  )

setSolids([left, right]);

let level = 0;
const levels = [
  map`
l.r
rl.
l.r`,
  map`
ll.
rrl
rrl`,
  map`
lll
rrr
.rl`,
  map`
rll
rrl
.rl`,
  ]

const setLevel = (n) => {
  setMap(levels[n]);
  addSprite(0,0,player);
  ptile = getFirst(player);
}

const nextLevel = () => {
  if(levels[level+1]) level++;
  setLevel(level);
}

const selectedTile = () => {
  for(const t of getTile(ptile.x, ptile.y)){
    if(t.type!=player) return t; 
  }
  return undefined;
}

const moveTile = (dx,dy) => {
  let t = selectedTile();
  if(t){
    t.x+=dx;
    t.y+=dy;
    ptile.x=t.x;
    ptile.y=t.y;
  }
}

onInput("d", _ => {moveTile(1,0);})
onInput("a", _ => {moveTile(-1,0);})
onInput("w", _ => {moveTile(0,-1);})
onInput("s", _ => {moveTile(0,1);})

onInput("i", _ => {ptile.y -= 1;})
onInput("k", _ => {ptile.y += 1;})
onInput("j", _ => {ptile.x -= 1;})
onInput("l", _ => {ptile.x += 1;})

afterInput(_ => {
  for(let y=0;y<3;y++){
    for(let x=0;x<2;x++){
      let tile0 = getTile(x,y)[0];
      let type0 = (tile0)?tile0.type:undefined;
      let tile1 = getTile(x+1,y)[0];
      let type1 = (tile1)?tile1.type:undefined;
      if((type0==left)&&(type1==right)){
        clearTile(x,y);
        clearTile(x+1,y);
      }
    }
  }
  if(getFirst(player)==undefined){
    addSprite(ptile.x,ptile.y,player);
    ptile = getFirst(player);
  }
  if(getFirst(left)==undefined) nextLevel();
})

setLevel(0)

