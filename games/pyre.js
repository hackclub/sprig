/*
@title: pyre
@author: ced
@tags: ['strategy']
@addedOn: 2022-07-18

Instructions:

Burn down the blue hut.
*/

const smallFire = ['0', '1'];
const   bigFire = ['2', '3'];
const   allFire = [...smallFire, ...bigFire];
const       log = 'l';
const    player = 'p';
const      cube = 'c';
const     house = 'h';
const     grass = 'g';
const      rock = 'r';
setLegend(
  [ smallFire[0], bitmap`
................
................
.....3.3........
....3.....3.....
...3.3.3.3.3....
..3.3.3.3.3.....
...3.333.3...3..
..3.3.3.3...3...
.3.333.3.....3..
..3.333.3.3.3...
.3...3.3.3.3.3..
......3.333.3...
...3.333.3.3....
....3.333.......
.......3........
................
`],
  [ smallFire[1], bitmap`
................
................
........3.3.....
.....3.....3....
....3.3.3.3.3...
.....3.3.3.3.3..
..3...3.333.3...
...3...3.3.3.3..
..3.....3.333.3.
...3.3.3.333.3..
..3.3.3.3.3...3.
...3.333.3......
....3.3.333.3...
.......333.3....
........3.......
................`],
  [ bigFire[0], bitmap`
................
......3.3.......
.3.3.3.3........
..3.3.....3.3...
.3.3.3.3.3.3....
..3.3.3.3.3.....
.3.33333.3...3..
..3.333.3...3.3.
.3.333.3.....3..
3.3.333.3.3.3.3.
.3...333.333.3..
....3.33333.3.3.
...3.33333.3.3..
....3.333.3.3...
.......3........
................`],
  [ bigFire[1], bitmap`
................
.......3.3......
........3.3.3.3.
...3.3.....3.3..
....3.3.3.3.3.3.
.....3.3.3.3.3..
..3...3.33333.3.
.3.3...3.333.3..
..3.....3.333.3.
.3.3.3.3.333.3.3
..3.333.333...3.
.3.3.33333.3....
..3.3.33333.3...
...3.3.333.3....
........3.......
................`],
  [ log, bitmap`
................
................
..........44....
........44..4...
......44.....4..
.....4.......4..
....4........4..
...4.........4..
..4444......4...
.44..44....4....
.4....4...4.....
.4....4..4......
.4....4.4.......
..4...44........
...444..........
................`],
  [ player, bitmap`
................
................
................
......444.......
.....4...4......
.....40.04......
....44...44.....
...4.40004.4....
...4.4...4.4....
......444.......
.....4...4......
.....4...4......
....44...44.....
................
................
................`],
  [ cube, bitmap`
......4444......
....44....44....
..44........44..
.4............4.
4.44........44.4
4...44....44...4
4.4...4444...4.4
4...4...4....4.4
4.4.4.4.4.4..4.4
4.4.4...4......4
4.....4.4.4..4.4
.4..4.4.4.4...4.
..44....4...44..
....44..4.44....
......4444......
................`], 
  [ house, bitmap`
................
................
................
................
........5.......
......55.55.....
....55.....55...
...5.........5..
..5...........5.
....555555555...
.....5.....5....
....5.......5...
...5.........5..
...5.........5..
..5....555....5.
...555.555.555..`],
  [ grass, bitmap`
..4.........4...
...4.........4..
...44........4..
....4.........4.
....44........4.
.....4........4.
.....44......4..
.....44...4.....
.....444...4....
4.....44....4...
.4....44....4...
.4...444.....4..
.4...44......4..
.4...........4..
4...........4...
................`],
  [  rock, bitmap`
................
.....1111.......
....1....1......
...1......1.....
...1......1.....
...1...1..1.....
..1.....1..1....
..1......1.1....
..1........1....
..1........1....
..1........1....
..1........1....
..1........1....
..11......11....
....111111......
................`]
)

setSolids([player, log, cube, rock, house]);
setPushables({ [player]: [cube] })

const      isGrass = tile => tile.type == grass;
const     burnsBig = tile => tile.type == log || tile.type == cube;
const needsBigFire = tile => tile.type == house;

const isSmallFire = tile => smallFire.includes(tile.type);
const      isFire = tile => allFire.includes(tile.type);
const isFlammable = tile => tile.type != rock;

const fireTiles = () => allFire.flatMap(getAll);
const neighborTiles = tile => {
  return [
    getTile(tile.x+1, tile.y+0),                                 
    getTile(tile.x-1, tile.y+0),                                 
    getTile(tile.x+0, tile.y+1),                                 
    getTile(tile.x+0, tile.y-1),                                 
    getTile(tile.x,   tile.y)
  ]
  .flat();
}

const replace = (type0, type1) => {
  for (const sprite of getAll(type0)) {
    sprite.type = type1;
  }
}

let tick = 0, state = 'menuUntilInput';
setInterval(() => {
  
  tick++;
  if (!states[state].fireSpreads) return;

  /* fire flicker */
  if (tick % 2) {
    replace(smallFire[0], smallFire[1]);
    replace(  bigFire[0],   bigFire[1]);
  } else {
    replace(smallFire[1], smallFire[0]);
    replace(  bigFire[1],   bigFire[0]);
  }

  /* fire spread */
  if (tick % 4 == 0) {        
    // changing the map while iterating over can create bugs,
    // so we'll store the tiles we want to replace with fire here
    const replacements = new Map();
    
    for (const fire of fireTiles()) {            
      for (const tile of neighborTiles(fire)) {
        if (isFire(tile) || !isFlammable(tile)) continue;
        if (isSmallFire(fire) && needsBigFire(tile)) continue;
        
        replacements.set(
          tile,
          burnsBig(tile) ? bigFire[0] : smallFire[0]
        );
      }
      
      fire.remove();
    }

    // apply all of the replacements we stored
    for (const [tile, type] of replacements) {
      playTune(tune`
30.165912518853695: g4~30.165912518853695 + f4/30.165912518853695 + e4~30.165912518853695 + d4~30.165912518853695 + c4^30.165912518853695,
30.165912518853695: d4~30.165912518853695 + c4^30.165912518853695 + e4~30.165912518853695 + f4~30.165912518853695,
30.165912518853695: d4^30.165912518853695 + e4~30.165912518853695,
30.165912518853695: c4^30.165912518853695,
844.6455505279034`);
      tile.type = type;
    }
  }

  /* win condition */
  if (getAll(house).length == 0 && fireTiles().length == 0)
    if (states[state].levelClear)
      states[state].levelClear();
}, 200);

afterInput(() => {
  /* crate kill grass */
  for (const { x, y } of getAll('c')) {
    for (const g of getTile(x, y).filter(isGrass)) {
      g.remove();
    }
  }
})

let level = 0;
const levels = [
  { map: map`
0.gl
rplh
grgg` },
  { map: map`
0g.gl
grcrh
grpr.
grrr.`, text: ['push cube', 'j to restart'] },
  { map: map`
0gggg
g..pg
g.crg
gg.lh`, text: ['need big fire', 'for revenge'] },
  { map: map`
..lllg
..c..g
.....g
..h..g
.....g
..p..g
....3g`, text: ['need big fire', 'for revenge'] },
  { map: map`
gg.gg
g.c.h
gp.rr
0rr..`, text: ['need big fire', 'for revenge'] },
  { map: map`
.........
...g.g.p.
..gg.gg..
.gg...g..
..1...gl.
......ll.
..lllll..
..hl.....
.........`, text: ['smol been', 'big rage' ] },

]
// .reverse();

const pushPlayer = (dx, dy) => {
  if (getFirst(player)) {
    getFirst(player).x += dx;
    getFirst(player).y += dy;
  }
}

addText("press up to begin!", { y:  1 });
addText(              "PYRE", { y: 14, color: color`3` });

const states = {
  playing: {
    fireSpreads: true,
    a: () => pushPlayer(-1,  0),
    d: () => pushPlayer( 1,  0),
    w: () => pushPlayer( 0, -1),
    s: () => pushPlayer( 0,  1),
    j: () => {
      state = 'wait';
      setMap(levels[level].map);
      setTimeout(() => state = 'playing', 750);
    },
    levelClear: () => {
      state = 'wait';
      setTimeout(() => {
        if (levels[1+level]) {
          const { map, text } = levels[++level];
          playTune(tune`
    159.3625498007968,
    79.6812749003984: f4^79.6812749003984 + e4~79.6812749003984,
    79.6812749003984: a4^79.6812749003984 + g4^79.6812749003984 + f4~79.6812749003984,
    79.6812749003984,
    79.6812749003984: d5^79.6812749003984,
    79.6812749003984: f5^79.6812749003984 + e5^79.6812749003984 + d5~79.6812749003984,
    79.6812749003984: g5^79.6812749003984 + f5~79.6812749003984,
    159.3625498007968,
    79.6812749003984: a5~79.6812749003984 + d5~79.6812749003984 + f4~79.6812749003984,
    79.6812749003984: a5^79.6812749003984 + d5^79.6812749003984 + f4^79.6812749003984,
    1593.6254980079682`);
          setMap(map);
          clearText();
          addText(text[0], { y: 0, color: color`3`});
          addText(text[1], { y: 15, color: color`3`});
        }
        setTimeout(() => state = 'playing', 500);
      }, 500);
    }
  },
  wait: { fireSpreads: false },
  menuUntilInput: {
    fireSpreads: false,
    w: () => {
      clearText();
      state = 'lockedUntilClear';
      states.playing.w();
    }
  },
  lockedUntilClear: {
    fireSpreads: true,
    levelClear: () => states.playing.levelClear(),
  }
}
for (const dir of "wasdj".split(''))
  onInput(dir, () => {
    if (states[state][dir])
      states[state][dir]()
  });

setMap(levels[level].map);
