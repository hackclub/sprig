
/* 
@title: wham
@author: Aaman Patnaik
@tags: ['retro']
@addedOn: 2023-09-18
*/

    // entities

const tunnel = "p";
const defeated_monster = "d";
const monster = "m";
const selected_tunnel = "s";
const selected_monster = "l";
const brown = "b";

// music

const capture_sound = tune`
121.95121951219512: C4-121.95121951219512,
121.95121951219512: D4-121.95121951219512,
121.95121951219512: A5^121.95121951219512,
3536.5853658536585`
const progress_sound = tune`
230.76923076923077: D5^230.76923076923077 + G4~230.76923076923077,
230.76923076923077: A5^230.76923076923077 + B4~230.76923076923077,
230.76923076923077: B5^230.76923076923077 + E4^230.76923076923077,
6692.307692307692`
const example_sound = tune`
500: B4^500,
500: C5^500,
500: D5^500,
500,
500: B4^500,
500: C5^500,
500: D5^500,
12500`

// game_loop
var current_screen = [[`p`, `p`, `p\n`], [`p`, `p`, `p\n`], [`p`, `p`, `p`]];

// variables for future use
var wham_count = 0;
var vertical_cursor = 0
var horizontal_cursor = 0



setLegend(
  [ tunnel, bitmap`
................
...4444444444...
..444444444444..
.44440000004444.
.44400000000444.
.44000000000044.
.44000000000044.
.44000000000044.
.44000000000044.
.44000000000044.
.44000000000044.
.44400000000444.
.44440000004444.
..444444444444..
...4444444444...
................`],
  [ selected_tunnel, bitmap`
................
...3333333333...
..344444444443..
.34440000004443.
.34400000000443.
.34000000000043.
.34000000000043.
.34000000000043.
.34000000000043.
.34000000000043.
.34000000000043.
.34400000000443.
.34440000004443.
..344444444443..
...3333333333...
................`],
  [defeated_monster, bitmap`
................
...4444444444...
..444444444444..
.44440000004444.
.44400033000444.
.44000033000044.
.44000033000044.
.44000033000044.
.44000033000044.
.44000000000044.
.44000033000044.
.44400033000444.
.44440000004444.
..444444444444..
...4444444444...
................`],
  [ monster, bitmap`
................
...4444444444...
..444444444444..
.44449999334444.
.44439399999444.
.44392039029944.
.44392099023944.
.44993399933944.
.44999999999944.
.44390020209344.
.44393000039344.
.44439939999444.
.44443399334444.
..444444444444..
...4444444444...
................`],
  [ selected_monster, bitmap`
................
...3333333333...
..344444444443..
.34449999334443.
.34439399999443.
.34392039029943.
.34392099023943.
.34993399933943.
.34999999999943.
.34390020209343.
.34393000039343.
.34439939999443.
.34443399334443.
..344444444443..
...3333333333...
................`],
  [ brown, bitmap`
7777777777777777
7777722777777227
7777222277772222
7777777777777777
7777777777777777
7777777777777777
7777777772277777
7777777722227777
7777777777777777
7772277777777777
7722227777777777
7777777777777777
7777777772227777
7777777722222777
7222777777777777
2222277777777777`]);

let level = 0;
let stage = 1;

const levels = [map`
ppp
ppp
ppp`,
map`
bbb
bbb
bbb`]

const currentLevel = levels[level];
setMap(currentLevel);
game()
function game () {
setInterval(function() {
      for (let index = 0; index < current_screen.length; index++) {
      for (let i = 0; i < 3; i++) {
        if (current_screen[index][i].includes(`m`) || current_screen[index][i].includes(`l`)  || current_screen[index][i].includes(`d`)) {
          if (i == 2) {
            if (current_screen[index][i].includes(`l`)) {current_screen[index][i] = `s\n`}
            else {current_screen[index][i] = `p\n`}
          }
          else {if (current_screen[index][i].includes(`l`)) {current_screen[index][i] = `s`} else {current_screen[index][i] = `p`}}
          break;
        }
        }
      }
      var random_horizontal = Math.floor(Math.random() * 3)
      var random_vertical = Math.floor(Math.random() * 3)
      if (current_screen[random_vertical][random_horizontal].includes(`\n`)) {
        if (current_screen[random_vertical][random_horizontal].includes(`s`)) {current_screen[random_vertical][random_horizontal] = `l\n`}
        else {current_screen[random_vertical][random_horizontal] = `m\n`}
      }
      else {
        if (current_screen[random_vertical][random_horizontal].includes(`s`)) {current_screen[random_vertical][random_horizontal] = `l`} else {current_screen[random_vertical][random_horizontal] = `m`}
      }
      const levels = [current_screen.flat().join("")];
      const currentLevel = levels[level];
      stage += 1000;
      setMap(currentLevel);}, 900/stage);

onInput("d", () => {
  for (let index = 0; index < current_screen.length; index++) {
  for (let i = 0; i < 3; i++) {
        if (current_screen[index][i].includes(`s`) || current_screen[index][i].includes(`l`)) {
          if (i == 2) {
            if (current_screen[index][i].includes(`l`)) {current_screen[index][i] = `m\n`}
            else (current_screen[index][i] = `p\n`)
          }
          else {
            if (current_screen[index][i].includes(`l`)) {current_screen[index][i] = `m`}
            else (current_screen[index][i] = `p`)
          break;
        }
        }}
  }
  horizontal_cursor += 1
  if (horizontal_cursor == 3) {horizontal_cursor = 2}
  
  if (horizontal_cursor == 2) {
    if (current_screen[vertical_cursor][horizontal_cursor] == `m\n`) {current_screen[vertical_cursor][horizontal_cursor] = `l\n`;}
    else (
      current_screen[vertical_cursor][horizontal_cursor] = `s\n`)
    }
  else {
    if (current_screen[vertical_cursor][horizontal_cursor] == `m`) {
    current_screen[vertical_cursor][horizontal_cursor] = `l`}
  else {current_screen[vertical_cursor][horizontal_cursor] = `s`}
  }
  
  const levels = [current_screen.flat().join("")];
  const currentLevel = levels[level];
  setMap(currentLevel);}
  
);

onInput("a", () => {
  for (let index = 0; index < current_screen.length; index++) {
  for (let i = 0; i < 3; i++) {
        if (current_screen[index][i].includes(`s`) || current_screen[index][i].includes(`l`) || current_screen[index][i].includes(`d`)) {
          if (i == 2) {
            if (current_screen[index][i].includes(`l`)) {current_screen[index][i] = `m\n`}
            else (current_screen[index][i] = `p\n`)
          }
          else {
            if (current_screen[index][i].includes(`l`)) {current_screen[index][i] = `m`}
            else (current_screen[index][i] = `p`)
          break;
        }
        }}
  }
  horizontal_cursor -= 1
  if (horizontal_cursor <= -1) {horizontal_cursor = 0}
  
  if (horizontal_cursor == 2) {
    if (current_screen[vertical_cursor][horizontal_cursor] == `m\n`) {current_screen[vertical_cursor][horizontal_cursor] = `l\n`;}
    else (
      current_screen[vertical_cursor][horizontal_cursor] = `s\n`)
    }
  else {
    if (current_screen[vertical_cursor][horizontal_cursor] == `m`) {
    current_screen[vertical_cursor][horizontal_cursor] = `l`}
  else {current_screen[vertical_cursor][horizontal_cursor] = `s`}
  }
  addText(horizontal_cursor.toString(), {x: 10, y: 4, color: color`3`})
  const levels = [current_screen.flat().join("")];
  const currentLevel = levels[level];
  setMap(currentLevel);}
  
);

onInput("s", () => {
  for (let index = 0; index < current_screen.length; index++) {
  for (let i = 0; i < 3; i++) {
        if (current_screen[index][i].includes(`s`) || current_screen[index][i].includes(`l`) || current_screen[index][i].includes(`d`)) {
          if (i == 2) {
            if (current_screen[index][i].includes(`l`)) {current_screen[index][i] = `m\n`}
            else (current_screen[index][i] = `p\n`)
          }
          else {
            if (current_screen[index][i].includes(`l`)) {current_screen[index][i] = `m`}
            else (current_screen[index][i] = `p`)
          break;
        }
        }}
  }
  vertical_cursor += 1
  if (vertical_cursor == 3) {vertical_cursor = 2}
    
  if (horizontal_cursor == 2) {
    if (current_screen[vertical_cursor][horizontal_cursor] == `m\n`) {current_screen[vertical_cursor][horizontal_cursor] = `l\n`;}
    else (
      current_screen[vertical_cursor][horizontal_cursor] = `s\n`)
    }
  else {
    if (current_screen[vertical_cursor][horizontal_cursor] == `m`) {
    current_screen[vertical_cursor][horizontal_cursor] = `l`}
  else {current_screen[vertical_cursor][horizontal_cursor] = `s`}
  }

  addText(vertical_cursor.toString(), {x: 15, y: 4, color: color`3`})
  // console.log(current_screen.flat().join(""))
  const levels = [current_screen.flat().join("")];
  const currentLevel = levels[level];
  setMap(currentLevel);}
        
  
);

onInput("w", () => {
  for (let index = 0; index < current_screen.length; index++) {
  for (let i = 0; i < 3; i++) {
        if (current_screen[index][i].includes(`s`) || current_screen[index][i].includes(`l`) || current_screen[index][i].includes(`d`)) {
          if (i == 2) {
            if (current_screen[index][i].includes(`l`)) {current_screen[index][i] = `m\n`}
            else (current_screen[index][i] = `p\n`)
          }
          else {
            if (current_screen[index][i].includes(`l`)) {current_screen[index][i] = `m`}
            else (current_screen[index][i] = `p`)
          break;
        }
        }}
  }
  vertical_cursor -= 1
  if (vertical_cursor == -1) {vertical_cursor = 0}
    
  if (horizontal_cursor == 2) {
    if (current_screen[vertical_cursor][horizontal_cursor] == `m\n`) {current_screen[vertical_cursor][horizontal_cursor] = `l\n`;}
    else (
      current_screen[vertical_cursor][horizontal_cursor] = `s\n`)
    }
  else {
    if (current_screen[vertical_cursor][horizontal_cursor] == `m`) {
    current_screen[vertical_cursor][horizontal_cursor] = `l`}
  else {current_screen[vertical_cursor][horizontal_cursor] = `s`}
  }

  addText(vertical_cursor.toString(), {x: 15, y: 4, color: color`3`})
  const levels = [current_screen.flat().join("")];
  const currentLevel = levels[level];
  setMap(currentLevel);}
        
  
);

onInput("j", () => {
  for (let index = 0; index < current_screen.length; index++) {
  for (let i = 0; i < 3; i++) {
        if (current_screen[index][i].includes(`l`)) {
          playTune(capture_sound);
          if (i == 2) {current_screen[index][i] = `d\n`;}
          else (current_screen[index][i] = `d`)
          wham_count++;
          if (wham_count % 10 == 0) {
            playTune(progress_sound);
          }
        }
        }}
  addText(wham_count.toString(), {x: 5, y: 4, color: color`3`})
  const levels = [current_screen.flat().join("")];
  const currentLevel = levels[level];
  setMap(currentLevel);
  });};
