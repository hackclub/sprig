let score = 0
let stamina = 10

const player = "p"
const ladder = "l"
const bg = "b"
const grass = "g"
const dirt = "d"
const save = "s"
const nl = "n"



setLegend(
  [ player, bitmap`
................
................
................
...........4444.
......DDD..4422.
....DD44DDD4440.
...DDD444DDDFFF.
..D44DDDDDDDD...
..DD4D44DDDDD...
.D4DDDD4DD4DDD..
.D4D44DDD44D4D..
..DD44DDD44D44..
...DDDD..DDDD...
....FF....FF....
....FC....FC....
................` ],
  [bg, bitmap`
7777777711776771
7766717777777777
1717617777767711
7777777771717717
7717777677777776
1766711116617777
7717777717711777
7711677777617177
7161771767177777
1771717777776717
7177767777771717
7777177761777671
7677776777677777
7717177717771717
7717777777671777
1776677717717771`],
  [grass, bitmap`
4D4D4DDD4DDDD4DD
DDDDDD4DDDD4DD4D
D4DCC4DCD4DCDCCD
DDCDCDDCDCDCCDD4
DCDCCDLCCC4DCCDC
1LCLCCCCLCCCCDCC
C1CC1CCCC1LLCCCL
CC1CCLC1CC1CL1C1
CCCCCCCC1CCCCCCC
CLCCC1CLCCC1CCCC
C1CCCCCCCLCLCCLC
C1CCCCCCCCCLCLCC
CCLCCC1CLCCCCC1C
CCL11LC1LL1CCCLC
CCLC1CCCCL1CCLCC
CCCCLCCCCCCC1CCC`],
  [dirt, bitmap`
1CLCLCCCLC1CCLCC
CCCC1CLCCCCLCCLC
CLCCC1CCC1CCCC1C
1CC1C1CC1CCC1CCL
CCCCCCLCCCLC1CCC
1LCLCCCCLCCCC1CC
C1CC1CCCC1LLCCCL
CC1CCLC1CC1CL1C1
CCCCCCCC1CCCCCCC
CLCCC1CLCCC1CCCC
C1C1CCCCCLCLCCLC
C1CCCCCCCCCLCLCC
CCLCCC1CLCCCCC1C
CCL11LC1LL1CCCLC
CCLC1CCCCL1CCLCC
CCCCLCCCCCCC1CCC`],
    [ ladder, bitmap`
...FCCCCCCCFC...
...FFFFFFFFFC...
...FC......FC...
...FC......FC...
...FCCCCCCCFC...
...FFFFFFFFFC...
...FC......FC...
...FC......FC...
...FCCCCCCCFC...
...FFFFFFFFFC...
...FC......FC...
...FC......FC...
...FCCCCCCCFC...
...FFFFFFFFFC...
...FC......FC...
...FC......FC...` ],
  [ save, bitmap`
........6.......
.....F.6.F.6....
......6FF666....
......FFF6......
....66FFF6......
....6FF6666.6...
..F666FFFF6666..
.66FF6F6666FF66.
.FFCFFF6FF66FF6.
..F6FCF6FCF6FCF.
..FCFCFCFCFCFC..
..FCFCLLLCFCFC..
..FCFLCCCLFCFC..
..FCFLCC1LFCFC..
..FCFLCCCLFCFC..
................`],
  [nl, bitmap`
...25555552.....
..2557777552....
..2577777752....
.257777777752...
.257777777752...
.257777757752...
.257777557752222
.257775557777777
.257755555555555
.257775557777777
.257777557752222
.257777757752...
.257777777752...
..2577777752....
..2557777552....
...25555552.....`]
)
setBackground(bg)

 setSolids([player, grass])

let level = 0
const levels = [
  map`
.p..s
gglgg
..l..
..l..
..l..
..l..
..l..
..l..
..l..
..l..
..l..`,
  map`
.p.....s
gggglggg
....l...
....l...
....l...
.lgggl..
.l...l..
.l...lgl
.....l.l
.....l..
...lgg..
...l....`,
  map`
.p........
gggg.sgggg
l.g.lg.ggg
l...lggg.g
lg..lg.lgg
l...l..lg.
l...l.glgg
..lgl.gggg
.gl.l.gg.g
..l.l..lgn
l.l...l.l.
lgggggl.gg`,
  map`
..........s.ssg
p.....s.slggggg`
]

setMap(levels[level])

for (let i = 2; i < height(); i++) {
  for (let j = 0; j < width(); j++) {
    addSprite(j, i, dirt)
  }
}

addText("Score: 0", {
  x: 0,
  y: 0,
  color: color`2`
})
addText("Stamina: 10", {
  x: 0,
  y: 1,
  color: color`2`
})

onInput("w", () => {
  if ((getTile(getFirst(player).x, getFirst(player).y-1).some(e => e.type == dirt)&&stamina==0)){
    let a = 0
  } else if (getTile(getFirst(player).x, getFirst(player).y).some(e => e.type == ladder)){
    getFirst(player).y -= 1
  }
})
onInput("a", () => {
  if ((getTile(getFirst(player).x-1, getFirst(player).y).some(e => e.type == dirt)&&stamina==0)){
    let a = 0
  } else {
    getFirst(player).x -= 1
  }
})
onInput("s", () => {
  if ((getTile(getFirst(player).x, getFirst(player).y+1).some(e => e.type == dirt)&&stamina==0)){
    let a = 0
  } else {
    getFirst(player).y += 1
  }
})
onInput("d", () => {
  if ((getTile(getFirst(player).x+1, getFirst(player).y).some(e => e.type == dirt)&&stamina==0)){
    let a = 0
  } else {
    getFirst(player).x += 1
  }
})

onInput("i", () => {
  getFirst(player).x = 1
  getFirst(player).y = 0
})


afterInput(() => {
  let p = getFirst(player);
  if (!p) return;

  let belowY = p.y + 1;
  let isSupported = getTile(p.x, belowY).some(e => e.type == grass || e.type == dirt || e.type == ladder);
  let isClimbing = getTile(p.x, p.y).some(e => e.type == ladder);

  if (getTile(p.x, p.y).some(e => e.type == dirt)&&stamina>0){
    getTile(p.x, p.y).forEach(sprite => {
      if (sprite.type === dirt) {
        sprite.remove();
        score++;
        stamina-=1;
      }
    });
  }
  
  while (!isSupported && !isClimbing && belowY < height()) {
    p.y += 1;
    
    belowY = p.y + 1;
    isSupported = getTile(p.x, belowY).some(e => e.type == grass || e.type == dirt);
    isClimbing = getTile(p.x, p.y).some(e => e.type == ladder);
  }

  if (getTile(p.x, p.y).some(e => e.type == save)){
    if (stamina < 45){
      stamina = parseInt(10 + (score / 10))
    } else if (stamina > 45){
      stamina = 45
    }
  
  getAll(dirt).forEach(s => s.remove())
    
  for (let i = 2; i < height(); i++) {
    for (let j = 0; j < width(); j++) {
      addSprite(j, i, dirt)
    }
  }
    
    return; // Stops the rest of the tick from running
  }

  if (score >= 200){
    addSprite(0, 0, nl)
  }

  if (getTile(p.x, p.y).some(e => e.type == nl)){
    level++
    score = 0
    stamina =10
    setMap(levels[level])
    for (let i = 2; i < height(); i++) {
      for (let j = 0; j < width(); j++) {
        addSprite(j, i, dirt)
      }
    }
  }

  clearText();
  if (level < levels.length - 2){
  addText("Sc:" + score, {
    x: 0,
    y: 0,
    color: color`2`
  });  
  addText("St:" + stamina, {
    x: 0,
    y: 1,
    color: color`2`
  })} else {
    
  }
});