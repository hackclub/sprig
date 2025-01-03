/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: heartgame
@author: Anmol Kumar Singh
@tags: []
@addedOn: 2025-01-03
*/

const player = "p";
const back = "b";
const opponent = "o";
let score = 0;

setLegend(
  [player, bitmap`
................
................
................
................
................
................
................
................
......33.33.....
.....3..3..3....
....3.......3...
.....3.....3....
......3...3.....
.......3.3......
........3.......
................`],
  [back, bitmap`
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
0000000000000000`],
  [opponent, bitmap`
................
................
................
................
................
................
................
................
................
................
................
...C3FFF3C......
....C3F3C.......
.....C3C........
.....CCC........
......C.........`],
  )

setSolids([player, opponent]);

let level = 0;
const levels = [
  map`
......
......
......
......
......
p.....`,
  map`
bbbbbb
bbbbbb
bbbbbb
bbbbbb
bbbbbb
bbbbbb`
  ]
setMap(levels[level]);




function spwn() {
  let x = Math.floor(Math.random() * 6);
  let y = 0; 
  addSprite(x, y, opponent);

}

function moveopp() {
  let opps = getAll(opponent);

  for (let i = 0; i < opps.length;i++) {
    opps[i].y += 1;
  }
}

function opprm() {
  let opps = getAll(opponent);

  for (let i = 0; i < opps.length;i++) {
   if (opps[i].y == 5) {
     opps[i].remove();
     score += 1;
     clearText();
   }
  }
}

function checkHit() {
  let opps = getAll(opponent);
  let p = getFirst(player);

  if (!p) return;
  
  for (let i = 0; i < opps.length; i++) {
    if (opps[i].x == p.x && opps[i].y + 1 == p.y) {
      setMap(levels[1]);
      addText("Game Over!", {
      x: 5,
      y: 6,
      color: color`3`
    });
      
    for (let interval of gameIntervals) {
       clearInterval(interval);
      }

    } else {
      addText("" + score, {
        x: 2,
        y: 0,
        color: color`7`,
      });
    }
  }
  
}

onInput("d", () => { 
  let p = getFirst(player); 
  if (p) p.x += 1; 
});

onInput("a", () => { 
  let p = getFirst(player); 
  if (p) p.x -= 1; }
);

afterInput(() =>{
}) 


let gameIntervals = []; 


gameIntervals.push(setInterval(spwn, 500));
gameIntervals.push(setInterval(moveopp, 500));
gameIntervals.push(setInterval(checkHit, 100));
gameIntervals.push(setInterval(opprm, 40));


setBackground(back);

