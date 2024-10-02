/*
@title: PushBattle
@author: MatrixMongoose
@tags: ['multiplayer']
@addedOn: 2022-11-05
*/

let round = 0
let redWin = 0
let blueWin = 0

//define players
const player1 = "a";
const player2 = "b";
const deathBlock = "c";
const obstacle = "o";

setLegend(
  [ player1, bitmap`
................
................
.....333333.....
...3333333333...
...3322222233...
..332222222233..
..332233332233..
..332233332233..
..332233332233..
..332233332233..
..332222222233..
...3322222233...
...3333333333...
.....333333.....
................
................`],
  [ player2, bitmap`
................
................
.....555555.....
...5555555555...
...5522222255...
..552222222255..
..552255552255..
..552255552255..
..552255552255..
..552255552255..
..552222222255..
...5522222255...
...5555555555...
.....555555.....
................
................`],
  [ deathBlock, bitmap`
6666666666666666
6666666666666666
6666666006666666
6666666006666666
6666666006666666
6666666006666666
6666666006666666
6666666006666666
6666666006666666
6666666006666666
6666666006666666
6666666666666666
6666666006666666
6666666006666666
6666666666666666
6666666666666666`],
  [ obstacle, bitmap`
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
0000000000000000`]
)

//level
const level = map`
oooooooooooooooo
oooooooooooooooo
oooooooooooooooo
oooooooooooooooo
o...o.o.c....c.o
o.a......o.c...o
o....c..o...c.co
oc....c........o
o..o.....c...o.o
oc..o.....c.o..o
o.....o.....c..o
o.o..o...o...o.o
o..o...c..o...oo
oo......c...c..o
o..c..o........o
o.c....o..c..b.o
o...o....o.....o
oooooooooooooooo`;
setMap(level);

//set push rules
setSolids([player1, player2, obstacle]);

setPushables({
  [player1]: [player2],
  [player2]: [player1],
});

//movement

onInput("w", () => {
  getFirst(player1).y += -1
});
onInput("s", () => {
  getFirst(player1).y += 1
});
onInput("a", () => {
  getFirst(player1).x += -1
});
onInput("d", () => {
  getFirst(player1).x += 1
});

onInput("i", () => {
    getFirst(player2).y += -1
  });
onInput("k", () => {
    getFirst(player2).y += 1
  });
onInput("j", () => {
    getFirst(player2).x += -1
  });
onInput("l", () => {
    getFirst(player2).x += 1
  });

  
afterInput(() => {
  //lose game
  const lost1 = tilesWith(player1, deathBlock).length;
  const lost2 = tilesWith(player2, deathBlock).length;
  if (lost1 > 0){
    round++
    blueWin++
    addText("  Round: " + round + "\n\nRed:" + redWin + "  Blue:" + blueWin, {x:4, y:0, color: `2`});
    setMap(level);
  }
  if (lost2 > 0){
    round ++
    redWin++
    addText("  Round: " + round + "\n\nRed:" + redWin + "  Blue:" + blueWin, {x:4, y:0, color: `2`});
    setMap(level);
  }
});