/*
@title: Protect The Surfer
@author: thinkingjet
@tags: []
@addedOn: 2023-01-03
Thanks to @Colton for his inspiration with Hectic Hockey
Instructions:
Welcome to "Protect The Surfer"! In this exciting and challenging game, you'll take control of a surfer navigating through dangerous waters, trying to reach the safety of the shore without getting attacked by sharks.
Use the WASD keys to control your surfer's movement. As you make your way through the ocean, be on the lookout for sharks lurking in the water. If you get too close to a shark, it will attack and kill you, resulting in a game over.
Your goal is to reach the right side of the screen without getting killed by a shark. If you are successful, you'll earn a point and be sent back to the start to try again. If you get killed, your score will reset and you'll have to start over. Can you survive the treacherous waters and rack up the highest score possible?
Good luck and happy surfing!
*/

const powerup = "f";
const surfer = "p";
const fish = "o";
const water = "i";
const middle_end = "r";
const middle = "b";
let score = 0;
let high_score=0;
let pos1 = 0;
let pos2 = 0;
let pos3 = 0;
const music = tune`
500: c4^500,
500: c4^500 + d4^500,
500: d4^500,
500: d4^500 + e4^500,
500: e4^500 + f4^500,
500: f4^500,
500: f4^500 + g4^500,
500: g4^500,
500: a4^500 + g4^500,
11500`
const hit = tune`
157.34265734265733,
52.44755244755245: f5~52.44755244755245,
52.44755244755245: f5~52.44755244755245,
52.44755244755245: e5~52.44755244755245,
52.44755244755245: d5~52.44755244755245,
52.44755244755245: c5~52.44755244755245,
52.44755244755245: b4~52.44755244755245,
52.44755244755245: a4~52.44755244755245,
52.44755244755245: g4~52.44755244755245,
52.44755244755245: f4~52.44755244755245,
52.44755244755245: e4~52.44755244755245,
52.44755244755245: e4~52.44755244755245,
52.44755244755245: d4~52.44755244755245,
52.44755244755245: d4~52.44755244755245 + c4~52.44755244755245,
52.44755244755245: c4~52.44755244755245,
786.7132867132867`
const goalSound = tune`
112.5703564727955,
56.28517823639775: d4~56.28517823639775,
56.28517823639775: e4~56.28517823639775,
56.28517823639775: e4~56.28517823639775,
56.28517823639775: f4~56.28517823639775,
56.28517823639775: g4~56.28517823639775,
56.28517823639775: g4~56.28517823639775,
56.28517823639775: a4~56.28517823639775,
56.28517823639775: b4~56.28517823639775,
56.28517823639775: b4~56.28517823639775,
56.28517823639775: c5~56.28517823639775,
56.28517823639775: d5~56.28517823639775,
56.28517823639775: d5~56.28517823639775,
56.28517823639775: d5~56.28517823639775,
56.28517823639775: e5~56.28517823639775,
56.28517823639775: e5~56.28517823639775,
56.28517823639775: f5~56.28517823639775,
56.28517823639775: f5~56.28517823639775,
56.28517823639775: f5~56.28517823639775,
56.28517823639775: g5~56.28517823639775,
56.28517823639775: g5~56.28517823639775,
56.28517823639775: g5~56.28517823639775,
56.28517823639775: g5~56.28517823639775,
56.28517823639775: a5~56.28517823639775,
56.28517823639775: a5~56.28517823639775,
56.28517823639775: a5~56.28517823639775,
281.42589118198873`


function updateScore() {
  clearText()
  addText(`High Score:${high_score}`, {x:1, y:3
                                      ,color:color`3`})
  addText(`Score:${score}`, {
    x: 1, 
    y: 4, 
    color: color`8`
  })
}

setLegend(
  [surfer,bitmap`
................
................
...6666666......
...6666666......
...66666........
...07770........
...07770........
...07770........
...00000........
...C.C.CCC......
...C...C........
...CCCCCCC......
...CC.CC........
..CC..C.........
933999339993....
933999339993....`],
  [fish,bitmap`
................
................
................
...........55...
..........55....
.........55.....
.....555555.....
....55.....5.5..
...35.0....555..
...35.....5555..
....1111555..5..
.....1115.......
.......55.......
.......5........
................
................`],
  [water,bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [middle,bitmap`
7777779999777777
7777779999777777
7777779999777777
7777779999777777
7777779999777777
7777779999777777
7777779999777777
7777779999777777
7777779999777777
7777779999777777
7777779999777777
7777779999777777
7777779999777777
7777779999777777
7777779999777777
7777779999777777`],
  [middle_end,bitmap`
7777776666777777
7777776666777777
7777776666777777
7777776666777777
7777776666777777
7777776666777777
7777776666777777
7777776666777777
7777776666777777
7777776666777777
7777776666777777
7777776666777777
7777776666777777
7777776666777777
7777776666777777
7777776666777777`],
  [powerup,bitmap`
................
................
................
..CC............
..CC000.........
..C66660........
..0666660.......
...066666000....
....066666660...
.....066666660..
......0066660...
........0000....
................
................
................
................`]
);

setBackground(water)
const level = map`
....b...r...b....
....b...r...b....
p...b...r...b....
....b...r...b....
....b...r...b....`
setMap(level)

setSolids([ surfer, ]);

setPushables({
  [surfer]: []
});

updateScore()

playTune(music, Infinity)


onInput("s", () => {
  getFirst(surfer).y += 1;
});

onInput("d", () => {
  getFirst(surfer).x += 1;
});

onInput("w", () => {
  getFirst(surfer).y -= 1;
});

onInput("a", () => {
  getFirst(surfer).x -= 1;
});

setInterval(() => {
  if (tilesWith(surfer, fish).length > 0) {
    playTune(hit)
    setMap(level)
 if (high_score < score) {
  high_score=score;
}
    score = 0
  
    updateScore()
  }
  getAll(fish).forEach((fishObj) => {
    if (fishObj.x === 0) {
      fishObj.remove()
    }
    })
 
  getAll(surfer).forEach((surferObj) => {
    if (surferObj.x === 16) {
      playTune(goalSound)
      score = score + 1
      updateScore()
      setMap(level)
    }
  })
})


afterInput(() => {
  if (tilesWith(surfer, powerup).length > 0) {
        playTune(goalSound);
        score++;
        updateScore();
        // console.log(tilesWith(surfer,powerup));
        getAll(powerup).forEach((powerupObj) => {
        powerupObj.remove();
  })
  }
  tilesWith(surfer, powerup).forEach(tile => {
    tile.forEach(sprite => {
      if (sprite.type === "powerup") {
        playTune(goalSound);
        sprite.remove();
        score++;
      } 
    })
  });
});

setInterval(() => {
  getAll(fish).forEach((fishObj) => {
    fishObj.x -= 1
  })
}, 200)


setInterval(() => {
  let spawn1 = Math.random();
  let spawn2 = Math.random();
  let spawn3 = Math.random();

  // addSprite(Math.floor(Math.random()*10),Math.floor(Math.random()*5),powerup)

  
  if (spawn1 < 0.2) {
    pos1 = 0;
  }
  else if (spawn1 < 0.4) {
    pos1 = 1;
  }
  else if (spawn1 < 0.6) {
    pos1 = 2;
  }
  else if (spawn1 < 0.8) {
    pos1 = 3;
  }
  else {
    pos1 = 4;
  }
  
  if (spawn2 < 0.2) {
    pos2 = 0;
    addSprite(Math.floor(Math.random()*10),Math.floor(Math.random()*5),powerup)
  }
  else if (spawn2 < 0.4) {
    pos2 = 1;
  }
  else if (spawn2 < 0.6) {
    pos2 = 2;
  }
  else if (spawn2 < 0.8) {
    pos2 = 3;
  }
  else {
    pos2 = 4;
  }

    if (spawn3 < 0.2) {
    pos3 = 0;
  }
  else if (spawn3 < 0.4) {
    pos3 = 1;
  }
  else if (spawn3 < 0.6) {
    pos3 = 2;
  }
  else if (spawn3 < 0.8) {
    pos3 = 3;
  }
  else {
    pos3 = 4;
  }
  
  addSprite(16, pos1, fish);
  addSprite(16, pos2, fish);
  addSprite(16, pos3, fish);
}, 800)
