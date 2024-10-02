/*
@title: color_patterns
@author: brian
@tags: ['puzzle']
@addedOn: 2022-07-14

Instructions:

repeat the pattern
*/

const player = "p";
const target = "t";
const red = "r";
const blue = "b";
const black = "x";

setLegend(
  [ player, bitmap`
................
................
................
................
................
................
.......77.......
......7777......
......7777......
.......77.......
................
................
................
................
................
................`],
  [ black, bitmap`
2222222222222222
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2000000000000002
2222222222222222`],
  [ red, bitmap`
2222222222222222
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2333333333333332
2222222222222222`],
  [ blue, bitmap`
2222222222222222
2555555555555552
2555555555555552
2555555555555552
2555555555555552
2555555555555552
2555555555555552
2555555555555552
2555555555555552
2555555555555552
2555555555555552
2555555555555552
2555555555555552
2555555555555552
2555555555555552
2222222222222222`]
)

let level = 0;

const levels = [
  map`
rxxxx
b...x
r.x.x
b.x.x
r.xxx`,
  map`
rxxxx
b...x
b.x.x
r.x.x
r.xxx`,
  map`
rxxxx
r...x
b.x.x
r.x.x
r.xxx`,
  map`
bxxxx
b...x
r.x.x
b.x.x
r.xxx`,
]

const results = [
  map`
rbrbr
b...b
r.r.r
b.b.b
r.rbr`,
  map`
rrbbr
b...r
b.r.b
r.b.b
r.brr`,
  map`
rbrrb
r...r
b.r.r
r.r.b
r.brr`,
  map`
brbbb
b...r
r.b.b
b.b.b
r.rbb`,
]
let ptile;
onInput("j", _ => {
  ptile = getFirst(player);
  if (getTile(ptile.x, ptile.y).length === 1) return;
  colorTile(ptile.x, ptile.y).type = blue;
});

onInput("l", _ => {
  ptile = getFirst(player);
  if (getTile(ptile.x, ptile.y).length === 1) return;
  colorTile(ptile.x, ptile.y).type = red;
});

onInput("i", _ => {
    nextLevel();
});

onInput("k", _ => {
    previousLevel();
});

afterInput(_ => {
  if(checkResult()){
      // console.log('done');
      nextLevel();
  } 
})

const colorTile = (x,y) => {
    const tiles = getTile(x, y);
    const tile = (tiles[0].type==player)?tiles[1]:tiles[0];
    return tile;
}


const checkResult = () => {
    const r = results[level];
    for(let y=0;y<5;y++){
      for(let x=0;x<5;x++){
          let res = r.charAt(y*6+x+1);
          if('rb'.indexOf(res)==-1) continue;
          let t = colorTile(x,y).type;
          if(t!=res) return false; 
      }
    }
    return true;
}

const nextLevel = () => {
  if(levels[level+1]) level++;
  setLevel(level);
}

const previousLevel = () => {
  if(level>0) level--;
  setLevel(level);
}

const setLevel = (n) => {
  setMap(levels[n]);
  addSprite(1,0,player);
}


onInput("w", _ => {getFirst(player).y -= 1;})
onInput("s", _ => {getFirst(player).y += 1;})
onInput("a", _ => {getFirst(player).x -= 1;})
onInput("d", _ => {getFirst(player).x += 1;})

setLevel(0)
