/*
@title: 9_puzzle
@author: brian
@tags: ['puzzle']
@addedOn: 2022-07-14


Instructions:

cover pink tiles with red
press k to pull white tiles

*/

const player = "p";
const target = "t";
const red = "r";
const blue = "b";

setLegend(
  [ player, bitmap`
................
................
................
................
................
................
.......00.......
......0000......
......0000......
.......00.......
................
................
................
................
................
................`],
  [ target, bitmap`
................
................
................
................
................
......8888......
.....888888.....
.....888888.....
.....888888.....
.....888888.....
......8888......
................
................
................
................
................`],
  [ red, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [ blue, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`]
)

let level = 0;

const levels = [
  map`
bbb
bbr
bb.`,
  map`
bbb
bbr
b.b`,
  map`
rbb
bbb
bb.`,
]

onInput("k", _ => {
  const ptile = getFirst(player);
  if(isHole(ptile.x,ptile.y+1)) moveTileTo(ptile.x,ptile.y+1);
  else if(isHole(ptile.x,ptile.y-1)) moveTileTo(ptile.x,ptile.y-1);
  else if(isHole(ptile.x-1,ptile.y)) moveTileTo(ptile.x-1,ptile.y);
  else if(isHole(ptile.x+1,ptile.y)) moveTileTo(ptile.x+1,ptile.y);
})

afterInput(_ => {
  // console.log(tilesWith(red,target));
})

const moveTileTo = (x,y) => {
    const ptile = getFirst(player);

  const ut = rbTile(ptile.x,ptile.y);
  if(ut){
    ut.x = x;
    ut.y = y;
    if(tilesWith(red,target).length!=0) nextLevel();
  }
}

const nextLevel = () => {
  if(levels[level+1]) level++;
  setLevel(level);
}

const setLevel = (n) => {
  setMap(levels[n]);
  addSprite(1,1,player);
  addSprite(2,2,target);
}

const isHole = (x,y) => {
  return (x>=0)&&(y>=0)&&(x<3)&&(y<3)&&rbTile(x,y)==undefined;
}

const rbTile = (x,y) => {
  for(const t of getTile(x, y)){
    if(t.type==red) return t; 
    else if(t.type==blue) return t; 
  }
  return undefined;
}

onInput("w", _ => {getFirst(player).y -= 1;})
onInput("s", _ => {getFirst(player).y += 1;})
onInput("a", _ => {getFirst(player).x -= 1;})
onInput("d", _ => {getFirst(player).x += 1;})

setLevel(0)
