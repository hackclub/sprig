/*
@title: Rythym-Mania
@author: sosenteam
@tags: ['action','music']
@addedOn: 2024-7-18

GOAL: HIT THE CORRECT KEY WHEN THE NOTES FALL ONTO THE BLOCKS
KEYS:
ASD JKL - KEYS TO ACTIVATE BLOCKS 


GOALS:
[✔]LOWER HITBOX
[✔]ADD MENU
[✔]MAKE NOTES DISAPPEAR WHEN HIT
[✔]ADD SCORE
[✔]ALLOW WRITING CUSTOM SONGS  (pass array of ints 0-5/1-6 to var)
[✔]ALLOW MULTIPLE NOTES AT ONCE
[✔]CHANGE GAMELOOP TO 50 OR 25 MS BUT KEEP FALL SPEED (or allow it to change)

MAYBES:
[]ADD DIFFICULTY/SPEED
[]ALLOW SONGS TO END AND RETURN TO MENU
[✔]MAKE MENU OF SONGS TO CHOOSE FROM
[]ALLOW CUSTOM SONGS TO PLAY CUSTOM MEDLEYS


*/
let gameModeDEV = "song"; //random, song 
const themeLevels = {
  scales: [0, 1, 2, 3, 4, 5, 4, 3, 2, 1, 0, 1, 2, 3, 4, 5, [0, 2],
    [1, 3],
    [2, 4],
    [3, 5],
    [4, 2],
    [3, 1],
    [2, 0],
    [1, 3]
  ],
  chords: [
    [0, 2, 4], 1, [1, 3, 5], 2, [0, 3, 5], 3, [1, 4, 2], 4, [0, 2, 5],
    [1, 3, 5],
    [0, 3, 5],
    [2, 4, 1],
    [0, 2, 4], 1, [1, 3, 5], 2
  ],
  jumps: [0, 5, 1, 4, 2, 5, 0, 3, [0, 5], 2, [1, 4], 3, [2, 5], 1, [0, 4], 5, 0, 5, [1, 4], 2, 5, [0, 3], 1, [2, 5]],
  zigs: [0, 5, 1, 4, 2, 5, 0, 3, [0, 5],
    [1, 4],
    [2, 5],
    [0, 3], 0, 5, 1, 4, 2, 3, 1, 5, [0, 5],
    [1, 4],
    [2, 3],
    [0, 5]
  ],
  egg: [2, 1, [0, 3],
    [0, 3], 2, 1, [0, 4],
    [0, 4], 2, 1, [0, 5],
    [0, 5],
    [1, 2],
    [0, 3],
    [0, 3],
    [1, 2], 2, 1, [0, 4],
    [0, 4], 2, 1
  ],
  jam: [
    [0, 2], 3, [1, 4], 2, [0, 3], 1, [2, 5], 3, [0, 2, 4], 1, 3, [1, 3], 2, [0, 4], 1, [2, 3], 0, [1, 3], 2, [0, 4],
    [1, 5], 2, [0, 2, 4], 1, [0, 3],
    [1, 4],
    [0, 2], 5, [1, 3],
    [0, 4],
    [2, 5],
    [0, 1, 4]
  ]
};

let song = {
  list: themeLevels.scales,
  delay: 400,
}
//DONT CHANGE
let screen = 0; // 0 = Menu
let score = 0;
let isDefaultColor = true;
let songPosition = 0;
let gameMode = "startScreen";
let fallTick = 0;
const note = "n"
//
// Constructor function for Person objects
function createKey(letter, melody, key) {
  this.s = letter;
  this.melody = melody;
  this.key = key;
  this.keyDown = false;

}
let key = [];
key.push(new createKey("a", tune`
300: C4~300,
9300`, "a"));
key.push(new createKey("b", tune`
300: D4~300,
9300`, "s"));
key.push(new createKey("c", tune`
300: E4~300,
9300`, "d"));
key.push(new createKey("d", tune`
300: G4~300,
9300`, "j"));
key.push(new createKey("e", tune`
300: A4~300,
9300`, "k"));
key.push(new createKey("f", tune`
300: C5~300,
9300`, "l"));


setLegend(
  [note, bitmap`
................
................
.....000000.....
...0000000000...
...00LLLLLL00...
..00LL1111LL00..
..00L111111L00..
..00L111111L00..
..00L111111L00..
..00L111111L00..
..00LL1111LL00..
...00LLLLLL00...
...0000000000...
.....000000.....
................
................`],
  [key[0].s, bitmap`
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`],
  [key[1].s, bitmap`
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
  [key[2].s, bitmap`
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
4444444444444444`],
  [key[3].s, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [key[4].s, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  [key[5].s, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  ["y", bitmap`
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000
..00000000000000`],
  ["z", bitmap`
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...
0000000000000...`]
)

setSolids([])

const levels = [
  map`
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy
zaaaaabbbbbcccccdddddeeeeefffffy`,
  map`
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aa............................aa
aa............................aa
aabbbbbbbbbbbbbbbbbbbbbbbbbbbbaa
aab.............b............baa
aab.............b............baa
aab.............b............baa
aab.............b............baa
aab.............b............baa
aabbbbbbbbbbbbbbbbbbbbbbbbbbbbaa
aabbbbbbbbbbbbbbbbbbbbbbbbbbbbaa
aab.............b............baa
aab.............b............baa
aab.............b............baa
aab.............b............baa
aab.............b............baa
aabbbbbbbbbbbbbbbbbbbbbbbbbbbbaa
aabbbbbbbbbbbbbbbbbbbbbbbbbbbbaa
aab.............b............baa
aab.............b............baa
aab.............b............baa
aab.............b............baa
aab.............b............baa
aabbbbbbbbbbbbbbbbbbbbbbbbbbbbaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
  map`
z......y
z......y
z......y
z......y
z......y
z......y
z......y
z......y
z......y
z......y
z......y
zabcdefy
z......y`
]
setMap(levels[screen]);
//KEYBINDINGS
for (let i = 0; i < key.length; i++) {
  const currentKey = key[i];

  onInput(currentKey.key, () => {
    currentKey.keyDown = true;
    //console.log("KEY " + currentKey.key + " IS DOWN");
    setTimeout(() => {
      currentKey.keyDown = false;
    }, 100);
  });
}

//MENU
if (screen == 0) {
  addText("Rythym", {
    x: 4,
    y: 4,
    color: color`0`
  })
  addText("Mania", {
    x: 11,
    y: 4,
    color: color`0`
  })
  let textFlash = setInterval(() => {
    if (screen == 0) {
      const currentColor = isDefaultColor ? color`0` : color`L`;
      addText("Press J for Level", {
        x: 2,
        y: 10,
        color: currentColor
      })
      addText("Press   to Start", {
        x: 2,
        y: 12,
        color: currentColor
      })
      addText("A", {
        x: 8,
        y: 12,
        color: currentColor
      })
      isDefaultColor = !isDefaultColor;
    }
  }, 500);
  let menuTimer = setInterval(() => {
    if (key[0].keyDown) {
      screen = 2;
      clearText();
      clearInterval(menuTimer);
      clearInterval(textFlash);
      startGameloop();

      setMap(levels[screen]);
      gameMode = "random";
      setGamemodeRandom();
    }
    if (key[3].keyDown) {
      screen = 1;
      clearText();
      clearInterval(menuTimer);
      clearInterval(textFlash);
      setMap(levels[screen]);
      levelSelect();
    }
  }, 100)
}


function levelSelect() {
  addText("Level Select", {
    x: 4,
    y: 1,
    color: color`0`
  })

  addText("A.Scales", {
    x: 2,
    y: 3
  })
  addText("S.Chords", {
    x: 2,
    y: 8
  })
  addText("D.Jumps", {
    x: 2,
    y: 12
  })
  addText("J.Zigs", {
    x: 11,
    y: 3
  })
  addText("K.Egg", {
    x: 11,
    y: 8
  })
  addText("L.Jam", {
    x: 11,
    y: 12
  })
  let levelTimer = setInterval(() => {
    if(key[0].keyDown)song.list = themeLevels.scales;
    if(key[1].keyDown)song.list = themeLevels.chords;
    if(key[2].keyDown)song.list = themeLevels.jumps;
    if(key[3].keyDown)song.list = themeLevels.zigs;
    if(key[4].keyDown)song.list = themeLevels.egg;
    if(key[5].keyDown)song.list = themeLevels.jam;
    
    if (key.some(keys => keys.keyDown)) {
      screen = 2;
      clearText();
      clearInterval(levelTimer);
      startGameloop();
      setMap(levels[screen]);
      gameMode = song;
      if (gameModeDEV == "song") startSong();
    }
  }, 100);
}

function setGamemodeRandom() {
  if (gameMode == "random") {
    setInterval(() => {
      addSprite(getRandomInt(1, width() - 1), 0, note);
    }, 500);
  }
}

function startSong() {
  setInterval(() => {
    if (songPosition >= song.list.length) songPosition = 0;
    if (Array.isArray(song.list[songPosition])) {
      song.list[songPosition].forEach((item) => {
        addSprite(item + 1, 0, note);

      });
    } else {
      addSprite(song.list[songPosition] + 1, 0, note);
    }
    songPosition++;
  }, song.delay);
}

function startGameloop() {
  //console.log("Game loop started");
  // Game loop
  let gameLoop = setInterval(() => {
    //START FALL TICK
    fallTick++;
    if (fallTick >= 10) {
      fallTick = 0;
    }
    //SCORE
    clearText();
    addText(score.toString(), {
      x: 9,
      y: 0,
      color: color`0`
    })
    //
    let currentNotes = getAll(note);
    currentNotes.forEach((item) => {
      if (item.y >= height() - 1) {
        item.remove();
        score = 0;
      }
      if (fallTick == 0) {
        item.y += 1;
      }
    });
    for (let i = 0; i < key.length; i++) {
      let currentKeys = getAll(key[i].s);
      if (key[i].keyDown) {
        currentKeys.forEach((keyItem) => {
          let checkTile = (x, y) => {
            return getTile(x, y).some(obj => obj._type === "n") || getTile(x, y - 1).some(obj => obj._type === "n")
          };
          if (checkTile(keyItem.x, keyItem.y)) {
            //
            playTune(key[i].melody);
            score++;
            currentNotes.forEach((item) => {
              if (item.y >= keyItem.y - 2 && item.x == keyItem.x) {
                item.remove();
              }
            });
          }
        });
      }
    }
  }, 10);
}


//

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
