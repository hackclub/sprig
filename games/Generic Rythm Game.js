/*

@title: Generic Rythm Game
@author: ThePangel
@tags: [music, rythm]
@addedOn: 2024-07-18
*/

const right_note_still = "h";
const left_note_still = "f";
const up_note_still = "t";
const down_note_still = "g";
const right_note = "r";
const left_note = "l";
const up_note = "u";
const down_note = "d";
const cursor = "c";
const start_button = "s";


const song = tune`
250: C4-250,
250: C4-250,
250: D4-250,
250: C4-250,
250: E4-250,
250: F4/250,
250: D4/250,
250: E4-250,
250,
250: D4/250,
250: D4-250,
250: C4-250,
250,
250: D4/250,
250: E4-250,
250: F4/250,
250,
250: F4-250,
250: F4-250,
250,
250: G4/250,
250,
250: C4-250,
250: D4-250,
250: E4/250,
250: F4-250,
250: E4-250,
250: D4/250,
250: F4-250,
250: G4/250,
250: D4/250,
250: F4-250`;

setLegend([right_note, bitmap`
................
................
................
................
........3.......
........33......
.....333333.....
.....3333333....
.....333333.....
........33......
........3.......
................
................
................
................
................`],
  [left_note, bitmap`
................
................
................
................
.......5........
......55........
.....555555.....
....5555555.....
.....555555.....
......55........
.......5........
................
................
................
................
................`],
  [up_note, bitmap`
................
................
................
................
................
.......4........
......444.......
.....44444......
....4444444.....
......444.......
......444.......
......444.......
................
................
................
................`],
  [down_note, bitmap`
................
................
................
................
................
.......HHH......
.......HHH......
.......HHH......
.....HHHHHHH....
......HHHHH.....
.......HHH......
........H.......
................
................
................
................`],
  [right_note_still, bitmap`
................
................
................
.......000......
.......0.00.....
....0000..00....
....0......00...
....0.......0...
....0......00...
....0000..00....
.......0.00.....
.......000......
................
................
................
................`],
  [left_note_still, bitmap`
................
................
................
......000.......
.....00.0.......
....00..0000....
...00......0....
...0.......0....
...00......0....
....00..0000....
.....00.0.......
......000.......
................
................
................
................`],
  [up_note_still, bitmap`
................
................
................
................
......000.......
.....00.00......
....00...00.....
...00.....00....
...0.......0....
...000...000....
.....0...0......
.....0...0......
.....00000......
................
................
................`],
  [down_note_still, bitmap`
................
................
................
................
......00000.....
......0...0.....
......0...0.....
....000...000...
....0.......0...
....00.....00...
.....00...00....
......00.00.....
.......000......
................
................
................`],
  [cursor, bitmap`
................
.1111111111.....
.1111111111.....
.111111111......
.11111111.......
.1111111........
.11111111.......
.111111111......
.1111.11111.....
.111...11111....
.11.....11111...
.........1111...
..........111...
................
................
................`],
  [start_button, bitmap`
................
................
................
................
0000000000000000
0222222222222220
0200020002000020
0202222022022020
0200022022000020
0222022022020220
0200022022022020
0222222222222220
0000000000000000
................
................
................`],
);


async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, ms);
  });
}

let level = 0
const levels = [

  map`
.....
..s..
...c.
.....`,
  map`
ftgh
....
....
....
....
....
....`,
  map`
.....
.....
.....
.....`
]
let score = 0;
let combo = 0;

setMap(levels[level])
split_song = song.split(',');
sprites = [right_note, left_note, up_note, down_note]
tempo = split_song[0].split(':');
tempo = parseInt(tempo[0]);

let isPressed = false
let highest_combo = 0;


onInput("w", () => {
  if (getTile(1, 0).length == 2 && !isPressed) {
    score += 150;
    combo++;

    if (combo >= highest_combo) highest_combo = combo;
    isPressed = true
    clearText();
    textScore = addText(`${score}`, {
      x: 0,
      y: 2,
      color: color`5`
    })
    textCombo = addText(`x${combo}`, {
      x: 0,
      y: 4,
      color: color`5`
    })
  } else if (getTile(1, 0).length == 1 && !isPressed) {
    isPressed = true
    score -= 100;
    combo = 0;
    clearText();
    textScore = addText(`${score}`, {
      x: 0,
      y: 2,
      color: color`5`
    })
    textCombo = addText(`x${combo}`, {
      x: 0,
      y: 4,
      color: color`5`
    })

  }
  if (level == 0) getFirst(cursor).y -= 1; 
  else if (level == 2) start();
  

});

onInput("a", () => {
  if (getTile(0, 0).length == 2 && !isPressed) {
    score += 150;
    combo++;
    if (combo >= highest_combo) highest_combo = combo;
    isPressed = true
    clearText();
    textScore = addText(`${score}`, {
      x: 0,
      y: 2,
      color: color`5`
    })
    textCombo = addText(`x${combo}`, {
      x: 0,
      y: 4,
      color: color`5`
    })
  } else if (getTile(0, 0).length == 1 && !isPressed) {
    isPressed = true
    score -= 100;
    combo = 0;
    clearText();
    textScore = addText(`${score}`, {
      x: 0,
      y: 2,
      color: color`5`
    })
    textCombo = addText(`x${combo}`, {
      x: 0,
      y: 4,
      color: color`5`
    })

  }
  if (level == 0) getFirst(cursor).x -= 1;
  else if (level == 2) start();
});

onInput("s", () => {
  if (getTile(2, 0).length == 2 && !isPressed) {
    score += 150;
    combo++;
    if (combo >= highest_combo) highest_combo = combo;
    isPressed = true
    clearText();
    textScore = addText(`${score}`, {
      x: 0,
      y: 2,
      color: color`5`
    })
    textCombo = addText(`x${combo}`, {
      x: 0,
      y: 4,
      color: color`5`
    })
  } else if (getTile(2, 0).length == 1 && !isPressed) {
    isPressed = true
    score -= 100;
    combo = 0;
    clearText();
    textScore = addText(`${score}`, {
      x: 0,
      y: 2,
      color: color`5`
    })
    textCombo = addText(`x${combo}`, {
      x: 0,
      y: 4,
      color: color`5`
    })

  }
  if (level == 0) getFirst(cursor).y += 1;
  else if (level == 2) start();
});

onInput("d", () => {
  if (getTile(3, 0).length == 2 && !isPressed) {
    score += 150;
    combo++;
    if (combo >= highest_combo) highest_combo = combo;
    isPressed = true
    clearText();
    textScore = addText(`${score}`, {
      x: 0,
      y: 2,
      color: color`5`
    })
    textCombo = addText(`x${combo}`, {
      x: 0,
      y: 4,
      color: color`5`
    })
  } else if (getTile(3, 0).length == 1 && !isPressed) {
    isPressed = true
    score -= 100;
    combo = 0;
    clearText();
    textScore = addText(`${score}`, {
      x: 0,
      y: 2,
      color: color`5`
    })
    textCombo = addText(`x${combo}`, {
      x: 0,
      y: 4,
      color: color`5`
    })

  }
  if (level == 0) getFirst(cursor).x += 1;
  else if (level == 2) start();
});


async function spawnNote() {

  const randomSprite = sprites[Math.floor(Math.random() * sprites.length)];

  if (randomSprite === left_note) {
    addSprite(0, 6, left_note)
  }
  if (randomSprite === right_note) {
    addSprite(3, 6, right_note)
  }
  if (randomSprite === up_note) {
    addSprite(1, 6, up_note)
  }
  if (randomSprite === down_note) {
    addSprite(2, 6, down_note)
  }


}



async function start() {
  clearText();
  level = 0
  setMap(levels[level])
  addText("Rythm Game", { x: 5, y: 3, color: color`0` });
  while (level == 0) {
    
    if (getTile(2, 1).length >= 2) {
      level = 1;
      setMap(levels[level]);
      level1();
    }
    await sleep(1000);
  }

}

async function end() {
  level = 2;
  setMap(levels[level])
  getAll().forEach(sprite => sprite.remove())
  clearText();
  addText(`You scored`, { x: 5, y: 5, color: color`0` })
  addText(`${score} points!`, { x: 5, y: 6, color: color`0` })
  addText(`Highest combo x${highest_combo}`, { x: 2, y: 8, color: color`0` })
  addText(`Press any button`, { x: 2, y: 10, color: color`0` })
  addText(`to try again`, { x: 3, y: 11, color: color`0` })
}

async function level1() {

  clearText();

  setTimeout(() => {
    playTune(song);
  }, 5.5 * tempo);
  for (i = 0; i < split_song.length; i++) {
    isPressed = false;
    for (j = 0; j < 4; j++) {
      getTile(j, 0).forEach(sprite => {
        if (sprite.type === 'r' || sprite.type === 'l' || sprite.type === 'u' || sprite.type === 'd') {
          sprite.remove();
        }
      });

    }

    if (/^\d+$/.test(split_song[i].replace("\n", ""))) {

      getAll().forEach(sprite => {
        sprite.y -= 1;
      });

      await sleep(tempo);

    } else {
      spawnNote();
      getAll().forEach(sprite => {
        sprite.y -= 1;
      });

      await sleep(tempo);

    }
    if (!isPressed && (getTile(0, 0).length == 2 || getTile(1, 0).length == 2 || getTile(2, 0).length == 2 || getTile(3, 0).length == 2)) {
      score -= 150;

      combo = 0;

      clearText();

      textScore = addText(`${score}`, {
        x: 0,
        y: 2,
        color: color`5`
      })
      textCombo = addText(`x${combo}`, {
        x: 0,
        y: 4,
        color: color`5`
      })
    }



  }
  time = 0
  while (time <= 7.5 * tempo) {
    isPressed = false;
    for (j = 0; j < 4; j++) {
      getTile(j, 0).forEach(sprite => {
        if (sprite.type === 'r' || sprite.type === 'l' || sprite.type === 'u' || sprite.type === 'd') {
          sprite.remove();
        }
      });

    }
    getAll().forEach(sprite => {
      sprite.y -= 1;
    });

    await sleep(tempo);
    time += tempo;
    if (!isPressed && (getTile(0, 0).length == 2 || getTile(1, 0).length == 2 || getTile(2, 0).length == 2 || getTile(3, 0).length == 2)) {
      score -= 150;
      combo = 0;
      clearText();
      textScore = addText(`${score}`, {
        x: 0,
        y: 2,
        color: color`5`
      })
      textCombo = addText(`x${combo}`, {
        x: 0,
        y: 4,
        color: color`5`
      })
    }

  }



  end();
}

start();