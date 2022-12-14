/*
  @title: my_game
  @author: Akash
*/
const changeSpeed = 300;

const person = "p";
const object = "o";

let gameOver = false;

let lives = 3;
let timer = 0;
const hitSound = tune`
120,
30: b4~30,
30: b4~30,
30: b4~30,
750`;
const endGameTune = tune`
186.33540372670808: b4-186.33540372670808,
186.33540372670808: a4-186.33540372670808,
186.33540372670808: g4-186.33540372670808,
186.33540372670808: f4-186.33540372670808,
186.33540372670808: e4-186.33540372670808,
186.33540372670808: d4-186.33540372670808,
186.33540372670808: d4-186.33540372670808,
186.33540372670808: c4-186.33540372670808,
4472.0496894409935`;

setLegend(
  [ person, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [ object, bitmap`
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
4444444444444444`]
);

const layout = map`
............
............
............
............
............
............
............
............
............
............
............
......p.....`;

let objects = [];

setMap(layout);

const insertObject = setInterval(() => {
  let x = Math.floor(Math.random() * 12);
  let found = false;
  for(let i = 0; i < objects.length; ++i) {
    if(objects[i][0] == x && objects[i][1] == 0 || objects[i][0] == x && objects[i][1] == 1) {
      found = true;
    }
  }
  if(!found) {
    addSprite(x, 0, object);
    objects.push([x, 0]);
  }
}, changeSpeed);

const updateObject = setInterval(() => {
  for(let i = 0; i < objects.length; ++i) {
    let pos = objects[i];
    let tile = getTile(...pos);
    if(tile.length > 0) {
      tile[0].y += 1;
      objects[i][1] += 1;
    }
  }
  
  let toRemove = [];
  
  for(let i = 0; i < objects.length; ++i) {
    let personPos = getFirst(person);
    let personX = personPos.x;
    let personY = personPos.y;
    if(objects[i][0] == personX && objects[i][1] >= personY - 1) {
      playTune(hitSound);
      lives -= 1;
      toRemove.push(i);
      
    }
  }
  for(let i = 0; i < objects.length; ++i) {
    if(objects[i][1] == getFirst(person).y) {
      toRemove.push(i);
    }
  }
  for(let i = 0; i < toRemove.length; ++i) {
    getTile(...objects[toRemove[i]]).forEach(item => {
      if(item != null && item.type != "p") {
        item.y = getFirst(person).y;
        setTimeout(() => {
          item.remove();
          objects.splice(toRemove[i], 1);
        }, 100);
      }
    });
  }

  clearText();
  addText(`Lives: ${lives}`, { x : 5, y : 0});
  
  if(lives <= 0) {
    clearInterval(updateObject);
    clearInterval(insertObject);
    addText("Game Over", { x : 5, y : 0});
    addText(`Score: ${timer}`, { x : 5, y : 1});
    playTune(endGameTune);
    gameOver = true;
  }
  timer++;
}, changeSpeed);

onInput("a", () => {
  if(!gameOver) {
    getFirst(person).x -= 1;
  }
});

onInput("d", () => {
  if(!gameOver) {
    getFirst(person).x += 1;
  }
});
