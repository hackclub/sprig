/*
@title: squarey_runs_away_from_the_fireball
@author: jack_mole_and_sam_poder
@tags: ['multiplayer']
@addedOn: 2023-01-28
*/

const player = "p";
const fire = "f";
const black = "b";
const white = "w";
const trophy = "t";
let lives = 3;
let timer = 0;
let duration = 30;

setLegend(
  [ player, bitmap`
................
................
...0000000000...
...0222002220...
...0202002020...
...0222002220...
0..0000000000..0
0000000000000000
0000000000000000
0..0050000500..0
...0055555500...
...0000000000...
...0000000000...
.....00..00.....
.....00..00.....
....000..000....`],
  [ fire, bitmap`
................
................
.........3......
......3.........
.............3..
......333333....
...3.33639333.3.
.....33336393...
.....36933333...
.....33339333...
...3.39363393..3
.....33333333...
......333933..3.
................
......3..3..3...
................`],
  [ black, bitmap`
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
  [ white, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [ trophy, bitmap`
................
................
................
...6666666666...
...6666666666...
....66666666....
.....666666.....
......6666......
......6666......
......6666......
......6666......
......6666......
....66666666....
...6666666666...
..666666666666..
.66666666666666.`]
  
);

setSolids([]);

const maintainTime = setInterval(() => {
  if(timer >= duration && lives != 0){
    setMap(levels[2]);
    setBackground(trophy);
    timer = 0;
    lives = 0;
  }
  else if(lives != 0) {
    timer += 1;
    addText(String(timer), { 
      x: 18,
      y: 1,
      color: color`5`
    });
  }
}, 500)

let level = 0;
const levels = [
  map`
..f..
.....
.....
..p..`,
  map`
bbbbb
bbbbb
bbbbb
bbbbb`,
  map`
.....
.....
.....
.....`,
];

function restartTheGame(){
  if(lives == 0 || timer >= duration){
    clearText();
    setBackground(white);
    lives = 3;
    timer = 0;
    setMap(levels[0]);
  }  
}

setMap(levels[level]);

setPushables({
  [ player ]: [],
});

onInput("s", () => {
  restartTheGame();
  getFirst(player).y += 1;
});

onInput("w", () => {
  restartTheGame();
  getFirst(player).y -= 1;
});

onInput("a", () => {
  restartTheGame();
  getFirst(player).x -= 1;
});

onInput("d", () => {
  restartTheGame();
  getFirst(player).x += 1;
});

onInput("k", () => {
  restartTheGame();
  getFirst(fire).y += 1;
});

onInput("i", () => {
  restartTheGame();
  getFirst(fire).y -= 1;
});

onInput("j", () => {
  restartTheGame();
  getFirst(fire).x -= 1;
});

onInput("l", () => {
  restartTheGame();
  getFirst(fire).x += 1;
});

afterInput(() => {
  if(getFirst(fire).x == getFirst(player).x){
    if(getFirst(fire).y == getFirst(player).y){
        lives -= 1;
        if(lives == 0){
          setMap(levels[1]);
          addText("You Are Dead!", { 
            x: 4,
            y: 6,
            color: color`3`
          });
        }
    }
  }
  addText(String(lives), { 
    x: 1,
    y: 1,
    color: color`3`
  });

});
