/*
@title: ValentinesGame
@author: Markonije
@tags: ['puzzle']
@addedOn: 2023-02-13
*/

const player1 = "p";
const player2 = "q";
const mappa = "m";
const wall = "w";

setLegend(
  [ player1, bitmap`
................
.........333....
........33333...
.......3333333..
.......33333333.
.......333333333
.......333333333
.......333333333
........33333333
.........3333333
..........333333
...........33333
............3333
.............333
..............33
...............3`],
  [player2, bitmap`
................
...333..........
..33333.........
.3333333........
33333333........
33333333........
33333333........
33333333........
3333333.........
333333..........
33333...........
3333............
333.............
33..............
3...............
................`],
  [mappa, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000033003300000
0000333333330000
0000033333300000
0000003333000000
0000000330000000
0000000000000000
0000000000000000`],
  [wall, bitmap`
1L1L1L1L1L1L1L1L
L1L1L1L1L1L1L1L1
1L1L1L1L1L1L1L1L
L1L1L1L1L1L1L1L1
1L1L1L1L1L1L1L1L
L1L1L1L1L1L1L1L1
1L1L1L1L1L1L1L1L
L1L1L1L1L1L1L1L1
1L1L1L1L1L1L1L1L
L1L1L1L1L1L1L1L1
1L1L1L1L1L1L1L1L
L1L1L1L1L1L1L1L1
1L1L1L1L1L1L1L1L
L1L1L1L1L1L1L1L1
1L1L1L1L1L1L1L1L
L1L1L1L1L1L1L1L1`]
);

setSolids([player1, player2, wall]);

let level = 0;
const levels = [
  map`
...q
....
..w.
p.w.`,
];

setMap(levels[level]);


onInput("w", () => {
  if(!getFirst(player1)) return;
    getFirst(player1).y -= 1
});
onInput("a", () => {
  if(!getFirst(player1)) return; 
    getFirst(player1).x -= 1
});
onInput("s", () => {
  if(!getFirst(player1)) return;
    getFirst(player1).y += 1
});
onInput("d", () => {
  if(!getFirst(player1)) return;
    getFirst(player1).x += 1
});
onInput("i", () => {
    if(!getFirst(player2)) return;
  getFirst(player2).y -= 1
});
onInput("j", () => {
  if(!getFirst(player2)) return;
    getFirst(player2).x -= 1
});
onInput("k", () => {
  if(!getFirst(player2)) return;  
    getFirst(player2).y += 1
});
onInput("l", () => {
  if(!getFirst(player2)) return;
    getFirst(player2).x += 1
});


afterInput(() => {
  if(!getFirst(player1)) return;
  if(!getFirst(player2)) return;
  if(getFirst(player1).y === getFirst(player2).y && getFirst(player1).x === getFirst(player2).x-1){
  level = level + 1;

        const currentLevel = levels[level];

        
        if (currentLevel !== undefined) {
            setMap(currentLevel);
        } else {
            setMap(map`
m`);
            addText("YOU WON!", { y: 4, color: color`3` });
        }  
  }
});
