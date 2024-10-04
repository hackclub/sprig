/*
@title: bloxorz
@author: itona
@tags: ['puzzle']
@addedOn: 2023-02-20
*/

const player = "p";
const wall = "w";
const field = "f";
const goal = "g"

const wallSound = tune`
68.80733944954129: c4-68.80733944954129 + d4-68.80733944954129,
68.80733944954129: c4-68.80733944954129 + d4-68.80733944954129,
2064.2201834862385`
const winSound = tune`
139.53488372093022,
139.53488372093022: g5-139.53488372093022,
139.53488372093022: a5-139.53488372093022 + g5-139.53488372093022,
139.53488372093022: g5-139.53488372093022,
3906.9767441860463`

setLegend(
  [ player, bitmap`
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
  [wall, bitmap`
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
  [field, bitmap`
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
5555555555555555`],
  [goal, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
);

setSolids([]);

let level = 0;
const levels = [
  {
    startPos: [{x: 1, y: 1}],
    world: map`
fffwwwwwww
ffffffwwww
fffffffffw
wfffffffff
wwwwwffgff
wwwwwwfffw`,
  },
  {
    startPos: [{x: 1, y: 4}],
    world: map`
wwwwwwffffwfff
ffffwwffffwfgf
ffffwwffffwfff
ffffwwffffwfff
ffffffffffffff
ffffwwffffwwww`
  },
  {
    startPos: [{x: 1, y: 3}],
    world: map`
wwwwwwfffffffww
ffffwwfffwwffww
fffffffffwwffff
ffffwwwwwwwffgf
ffffwwwwwwwffff
wwwwwwwwwwwwfff`
  },
  {
    startPos: [{x: 13, y: 1}],
    world: map`
wwwwwwwwwwwffff
wffffffffffffff
wffffwwwwwwwfff
wffffwwwwwwwwww
wffffwwwwwwwwww
wwwffffffffffww
wwwwwwwwwwfffff
fffwwwwwwwfffff
fgfffffffffffww
ffffwwwwwwwwwww`
  },
];

const p = {
  positions: levels[level].startPos
}

const renderMap= () => {
  setMap(levels[level].world);
  for(const position of p.positions) {
    addSprite(position.x, position.y, player)
  }
}


renderMap()


const isValid = (pos) => {
  const inBounds = pos.x>=0 && pos.y>=0 && pos.x<width() && pos.y<height();  
  const iswall = getTile(pos.x, pos.y).length>0 && getTile(pos.x, pos.y)[0].type==wall
  return inBounds && !iswall
}

const applyPositionsIfValid = (positions) => {
  for(const position of positions) {
    
    if(!isValid(position)) {
      playTune(wallSound)
      return
    }
  }
  p.positions = positions
}

const up = () => {
  const length = p.positions.length
  let newPositions
  if(length==1) {
    const pos = p.positions[0]
    newPositions = [
      {x: pos.x, y: pos.y-1},
      {x: pos.x, y: pos.y-2}]
  }else if(length==2) {
    const pos1 = p.positions[0]
    const pos2 = p.positions[1]
    if(pos1.y == pos2.y) {
      newPositions = [
        {x:pos1.x, y:pos1.y-1},
        {x: pos2.x, y:pos2.y-1}
      ]
    }else {
      newPositions = [
        {x:pos1.x, y:Math.min(pos1.y, pos2.y)-1},
      ]
    }
  }
  return newPositions
}

const down = () => {
  const length = p.positions.length
  let newPositions
  if(length==1) {
    const pos = p.positions[0]
    newPositions = [
      {x: pos.x, y: pos.y+1},
      {x: pos.x, y: pos.y+2}]
  }else if(length==2) {
    const pos1 = p.positions[0]
    const pos2 = p.positions[1]
    if(pos1.y == pos2.y) {
      newPositions = [
        {x:pos1.x, y:pos1.y+1},
        {x: pos2.x, y:pos2.y+1}
      ]
    }else {
      newPositions = [
        {x:pos1.x, y:Math.max(pos1.y, pos2.y)+1},
      ]
    }
  }
  return newPositions
}

const left = () => {
  const length = p.positions.length
  let newPositions
  if(length==1) {
    const pos = p.positions[0]
    newPositions = [
      {x: pos.x-1, y: pos.y},
      {x: pos.x-2, y: pos.y}]
  }else if(length==2) {
    const pos1 = p.positions[0]
    const pos2 = p.positions[1]
    if(pos1.x == pos2.x) {
      newPositions = [
        {x:pos1.x-1, y:pos1.y},
        {x: pos2.x-1, y:pos2.y}
      ]
    }else {
      newPositions = [
        {x:Math.min(pos1.x, pos2.x) -1, y:pos1.y},
      ]
    }
  }
  return newPositions
}

const right = () => {
  const length = p.positions.length
  let newPositions
  if(length==1) {
    const pos = p.positions[0]
    newPositions = [
      {x: pos.x+1, y: pos.y},
      {x: pos.x+2, y: pos.y}]
  }else if(length==2) {
    const pos1 = p.positions[0]
    const pos2 = p.positions[1]
    if(pos1.x == pos2.x) {
      newPositions = [
        {x:pos1.x+1, y:pos1.y},
        {x: pos2.x+1, y:pos2.y}
      ]
    }else {
      newPositions = [
        {x:Math.max(pos1.x, pos2.x)+1, y:pos1.y}
        ]
    }
  }
  return newPositions
}

onInput("w", () => {
  applyPositionsIfValid(up())
})

onInput("a", () => {
  applyPositionsIfValid(left())
})

onInput("s", () => {
  applyPositionsIfValid(down())
})

onInput("d", () => {
  applyPositionsIfValid(right())
})

onInput("j", () => {
  p.positions = levels[level].startPos
})

afterInput(() => {
  if(p.positions.length==1 && getTile(p.positions[0].x, p.positions[0].y).length!=0 &&  getTile(p.positions[0].x, p.positions[0].y)[0].type==goal) {
    if(level>=levels.length-1) {
      addText("You Win", { 
        x: 5,
        y: 5,
        color: color`H`
      })
    }else {
      playTune(winSound)
      level++
      p.positions = levels[level].startPos
    }
  }
  renderMap()
})
