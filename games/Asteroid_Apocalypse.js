/*
@title: asteroid apocalypse
@author: zcsop1206
@tags: ['endless']
@addedOn: 2022-12-31
Move the lazer with "a" and "d" for left and right, "w" and "s" for up and down
Try to destroy the asteroid before it hits the bas
The game ends if the asteroid hits the base. 

You gain a point when you hit an asteroid. 

*/
//adds music if alien is hit and background music.
const zap = tune `
41.666666666666664: b5~41.666666666666664 + a5-41.666666666666664 + g5/41.666666666666664 + f5^41.666666666666664,
41.666666666666664: b5-41.666666666666664 + a5/41.666666666666664 + g5^41.666666666666664,
41.666666666666664: b5/41.666666666666664 + a5^41.666666666666664,
41.666666666666664: b5^41.666666666666664,
1166.6666666666665`

const boom = tune`
30: c4~30 + d4-30 + e4/30 + f4^30 + g4~30,
30: c4-30 + d4/30 + e4^30 + f4~30,
30: c4/30 + d4^30 + e4~30,
30: c4^30 + d4~30,
30: c4~30,
810`

const background = tune `
166.66666666666666: c5~166.66666666666666,
166.66666666666666: c5~166.66666666666666,
166.66666666666666: d5~166.66666666666666,
166.66666666666666: f5~166.66666666666666,
166.66666666666666: g5~166.66666666666666,
166.66666666666666: f5~166.66666666666666,
166.66666666666666: e5~166.66666666666666,
166.66666666666666: d5~166.66666666666666,
166.66666666666666: b4~166.66666666666666,
166.66666666666666: b4~166.66666666666666,
166.66666666666666: c5~166.66666666666666,
166.66666666666666: e5~166.66666666666666,
166.66666666666666: d5~166.66666666666666,
166.66666666666666: e5~166.66666666666666,
166.66666666666666: d5~166.66666666666666,
166.66666666666666: c5~166.66666666666666,
166.66666666666666: b4~166.66666666666666,
166.66666666666666: a4~166.66666666666666,
166.66666666666666: g4~166.66666666666666,
166.66666666666666: a4~166.66666666666666,
166.66666666666666: b4~166.66666666666666,
166.66666666666666: c5~166.66666666666666,
166.66666666666666: e5~166.66666666666666,
166.66666666666666: f5~166.66666666666666,
166.66666666666666: e5~166.66666666666666,
166.66666666666666: d5~166.66666666666666,
166.66666666666666: d5~166.66666666666666,
166.66666666666666: a4~166.66666666666666,
166.66666666666666: g4~166.66666666666666,
166.66666666666666: f4~166.66666666666666,
166.66666666666666: f4~166.66666666666666,
166.66666666666666: d4~166.66666666666666`

const playback = playTune(background, Infinity);
const asteroid="a";
const lazer="l";
const base="b";
const space="s";
let score = 0;

setLegend(
  [ asteroid, bitmap`
................
.....8..........
.....866666.....
...688CCCC686...
...C8CCCCC888...
..68888CCC838888
.888CCC888C3333.
..388CCC88C3333.
..3CCCCC8888833.
..33CCC88883888.
8888883838333388
8.33338838833338
..3333883838333.
...33386683883..
......8..8..88..
................`],
  [ lazer, bitmap`
................
................
................
................
................
................
......4444......
......4444......
......4444......
................
................
................
................
................
................
................`],
  [ base,  bitmap`
77L7777L77777L77
77L7777L7777L777
7LL17711117L1777
77711L1L11LL1777
7777111L1L171777
LL771111111177LL
71LL111111L17LL7
711L1L111LL1L777
771111L1111L7777
77771LL111117777
7771111111111LL7
7LL1111111LL17LL
11111LL17117L777
L77177LL7777L777
7771777L77777777
7777777LL7777777`],
  [ space, bitmap`
0000000000000000
0000000000000000
0000000200000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0020000000000000
0000000000020000
0000000000000000
0000000000000000`]
);
setBackground(space);
setSolids([ base, lazer ])

//lazer movement

onInput("w", () => {
  const l = getFirst(lazer);
  if (!l) return;
  l.y -= 1;
});

onInput("a", () => {
  const l = getFirst(lazer);
  if (!l) return;
  l.x -= 1;
});

onInput("s", () => {
  const l = getFirst(lazer);
  if (!l) return;
  l.y += 1;
});
onInput("d", () => {
  const l = getFirst(lazer);
  if (!l) return;
  l.x += 1;
});

    var downloadTimer = setInterval(function(){
      const a = getFirst(asteroid);
      const b = getFirst(base);
  
      if (a.x>b.x) {
        a.x -= 1
      }
      else if (a.x<b.x) {
        a.x += 1
      }
      if (a.y>b.y) {
        a.y -= 1
      }
      else if (a.y<b.y) {
        a.y += 1
      }
      
   },750);


//map location
setMap( map`
..........
.......a..
..........
.b........
..........
..........
..........
.......l..
..........
..........`);


afterInput(() => {
   //Ends the game if the base is hit by asteroid
  const baseHit = tilesWith(asteroid, base).length;
  const numBase = tilesWith(base).length;
  if (baseHit === numBase) {
    clearTile(getFirst(lazer).x,getFirst(lazer).y);
    clearTile(getFirst(asteroid).x,getFirst(asteroid).y);
        clearText()
        addText("You Lost", {y:4, color: color`3` });
        addText("Final Score: "+score, {y:5, color: color`3`});
        playTune(boom)
        if (playback) playback.end();
        
  }
  
  // count the number of tiles with lazer
  const targetNumber = tilesWith(lazer).length;
  
  // count the number of tiles with lazers and asteroid
  const numberCovered = tilesWith(lazer, asteroid).length;

  //checking if the lazer has hit the asteroid
  if (numberCovered === targetNumber) {

    playTune(zap)

    const l = getFirst(lazer);
    const a = getFirst(asteroid);
    const b = getFirst(base);

    if (!l || !a || !b) return;
    
    clearTile(l.x, a.y);
    clearTile(b.x, b.y);

    addSprite(Math.floor(Math.random() * 8)+1, Math.floor(Math.random() * 3)+6, lazer);
    
    addSprite(Math.floor(Math.random() * 4)+5, Math.floor(Math.random() * 2)+1, asteroid);
    
    addSprite(Math.floor(Math.random() * 4)+1, Math.floor(Math.random() * 3)+5, base);

    score++;
    //Displays the score. 

    addText("score: "+score, { y: 1 , color: color`3`} );

  }
});







