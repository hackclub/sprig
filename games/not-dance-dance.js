/*
@title: not dance dance revolution
@author: Victor Lee
@tags: ['music']
@addedOn: 2024-02-22
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

class Note {
  constructor({lane, y, input, width = 5, height = 5}) {
    this.lane = lane;
    this.pixel = pixels[lane]; // Color is based on lane
    this.width = width;
    this.height = height;
    this.position = {
      x: this.width * this.lane,
      y: y
    }
    this.hit = false;
    this.miss = false;
  }

  draw() {
    // Create the sprite objects representing one note
    // Draw each of them relative to the position of the note object (bottom left corner?)
    const arrowLeft = [
      0, 0, 1, 0, 0,
      0, 1, 1, 0, 0,
      1, 1, 1, 1, 1,
      0, 1, 1, 0, 0,
      0, 0, 1, 0, 0,
    ]
    const arrowDown = [
      0, 0, 1, 0, 0,
      0, 0, 1, 0, 0,
      1, 1, 1, 1, 1,
      0, 1, 1, 1, 0,
      0, 0, 1, 0, 0,
    ]
    const arrowUp = [
      0, 0, 1, 0, 0,
      0, 1, 1, 1, 0,
      1, 1, 1, 1, 1,
      0, 0, 1, 0, 0,
      0, 0, 1, 0, 0,
    ]
    const arrowRight = [
      0, 0, 1, 0, 0,
      0, 0, 1, 1, 0,
      1, 1, 1, 1, 1,
      0, 0, 1, 1, 0,
      0, 0, 1, 0, 0,
    ]

    const arrows = [arrowLeft, arrowDown, arrowUp, arrowRight];
    let arrow = arrows[this.lane];
    
    if (this.hit) { return; } // Don't render hit notes
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        if (this.position.y + y< 0) { continue; } // Dont draw pixels above the screen
        if (this.position.y + y + 1 > gridHeight) { continue; } // Dont draw pixels below the screen

        if (arrow[x + y * this.width]) {
          addSprite(this.position.x + x, this.position.y + y, this.pixel);
        }
      }
    }
    
  }

  update() {
    // Move each note (which is comprised of several sprites) downward
    // If note's Y has reached a certain level, remove it
    // If user input is sensed at a certain position, affect the score accordingly
    if (this.position.y > gridHeight) { // If the note is far enough, stop moving or rendering it
      if (!this.hit && !this.miss) {
        combo = 0;
        MISS++;
        tuneIndex++;
        this.miss = true;
        lastNote = "MISS";
      }
      return; 
    }

    this.draw();
    this.position.y++;
  }

  checkHit() {
    // GOOD range: 25 - 27
    // OK range: 21 - 24 & 28 - 31
    if (this.hit) { return; } // Hit notes shouldn't be registered again
    
    var inOK = 21 <= this.position.y && this.position.y <= 24 || 28 <= this.position.y && this.position.y <= 30;
    var inGOOD = 25 <= this.position.y && this.position.y <= 27;
    
    if (inOK) {
      playTune(currentMap.tunes[tuneIndex]);
      tuneIndex++;
      OK++;
      combo++;
      this.hit = true;
      lastNote = "OK";
    } else if (inGOOD) {
      playTune(currentMap.tunes[tuneIndex]);
      tuneIndex++;
      GOOD++;
      combo++;
      this.hit = true;
      lastNote = "GOOD";
    }
  }

  
}

// Canvas boundaries
const gridWidth = 20;
const gridHeight = 35;

function clearGrid() {
  for (let x = 0; x < gridWidth; x++) {
    for (let y = 0; y < gridHeight; y++) {
      clearTile(x,y);
    }
  }
}

// Musical notes
// t2, t6, t10, t14, t18, t22, t24, t26, t28, t30, t31, t32 are rest notes
const t1 = tune`
214.28571428571428: E5-214.28571428571428,
6642.857142857142`;
const t3 = tune`
214.28571428571428: B4-214.28571428571428,
6642.857142857142`;
const t4 = tune`
214.28571428571428: C5-214.28571428571428,
6642.857142857142`;
const t5 = tune`
214.28571428571428: D5-214.28571428571428,
6642.857142857142`;
const t7 = tune`
214.28571428571428: C5-214.28571428571428,
6642.857142857142`;
const t8 = tune`
214.28571428571428: B4-214.28571428571428,
6642.857142857142`;
const t9 = tune`
214.28571428571428: A4-214.28571428571428,
6642.857142857142`;
const t11 = tune`
214.28571428571428: A4-214.28571428571428,
6642.857142857142`;
const t12 = tune`
214.28571428571428: C5-214.28571428571428,
6642.857142857142`;
const t13 = tune`
214.28571428571428: E5-214.28571428571428,
6642.857142857142`;
const t15 = tune`
214.28571428571428: D5-214.28571428571428,
6642.857142857142`;
const t16 = tune`
214.28571428571428: C5-214.28571428571428,
6642.857142857142`;
const t17 = tune`
214.28571428571428: B4-214.28571428571428,
6642.857142857142`;
const t19 = tune`
214.28571428571428: B4-214.28571428571428,
6642.857142857142`;
const t20 = tune`
214.28571428571428: C5-214.28571428571428,
6642.857142857142`;
const t21 = tune`
214.28571428571428: D5-214.28571428571428,
6642.857142857142`;
const t23 = tune`
214.28571428571428: E5-214.28571428571428,
6642.857142857142`;
const t25 = tune`
214.28571428571428: C5-214.28571428571428,
6642.857142857142`;
const t27 = tune`
214.28571428571428: A4-214.28571428571428,
6642.857142857142`;
const t29 = tune`
214.28571428571428: A4-214.28571428571428,
6642.857142857142`;
const t29long = tune`
1000: A4-1000,
31000`;


// BeatMaps & Songs
const beatMaps = [
  {
    name: "Korobeiniki",
    speed: 41,
    lane0: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0],
    lane1: [0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    lane2: [0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    lane3: [0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
    tunes: [t1, t3, t4, t5, t7, t8, t9, t11, t12, t13, t15, t16, t17, t19, t20, t21, t23, t25, t27, t29, t1, t3, t4, t5, t7, t8, t9, t11, t12, t13, t15, t16, t17, t19, t20, t21, t23, t25, t27, t29long]
  },
]

// Score
var GOOD = 0;
var OK = 0;
var MISS = 0;
var TOTAL = 0;

var accuracy = 100;
var combo = 0;

// Pixel management
const redPixel = "0";
const bluePixel = "1";
const greenPixel = "2";
const orangePixel = "3";
const blankPixel = "4";
const grayPixel = "5";
const whitePixel = "6";

  const pixelSprites = [
  [ redPixel, bitmap`
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
3333333333333333` ],
  [ bluePixel, bitmap`
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
  [ greenPixel, bitmap`
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
  [ orangePixel, bitmap`
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
  [ blankPixel, bitmap`
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
  [ grayPixel, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [ whitePixel, bitmap`
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
]

const pixels = [redPixel, bluePixel, greenPixel, orangePixel, blankPixel, grayPixel, whitePixel]

setLegend(
  pixelSprites[0],
  pixelSprites[1],
  pixelSprites[2],
  pixelSprites[3],
  pixelSprites[4],
  pixelSprites[5],
  pixelSprites[6],
)

// Creating the backgrounds
const levels = [
  map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
..0....1....2....3..
.000..111..222..333.
..0....1....2....3..
....................
....................
....................
....................
....................
....................`,
  map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
..5....5....5....5..
.555..555..555..555.
..5....5....5....5..
....................
....................
....................
....................
....................
....................`
]

// Intialize game objects
var currentMap = beatMaps[0];

const lane0Notes = [];
const lane1Notes = [];
const lane2Notes = [];
const lane3Notes = [];

function generateNotes({laneMap, laneNotes, laneNum}) {
  for (let i = 0; i < laneMap.length; i++) {
    if (laneMap[i] == 1) {
      laneNotes.push(new Note({lane: laneNum, y: i * -5}));
    }
  }
}

generateNotes({laneMap: currentMap.lane0, laneNotes: lane0Notes, laneNum: 0});
generateNotes({laneMap: currentMap.lane1, laneNotes: lane1Notes, laneNum: 1});
generateNotes({laneMap: currentMap.lane2, laneNotes: lane2Notes, laneNum: 2});
generateNotes({laneMap: currentMap.lane3, laneNotes: lane3Notes, laneNum: 3});

const testNote = new Note({lane: 0, y: 15})

var lastNote;


// Handling user input
var tuneIndex = 0;

onInput("a", ()=> {
  lane0Notes.forEach((note) => note.checkHit());

});

onInput("d", ()=> {
  lane1Notes.forEach((note) => note.checkHit());
});

onInput("j", ()=> {
  lane2Notes.forEach((note) => note.checkHit());
});

onInput("l", ()=> {
  lane3Notes.forEach((note) => note.checkHit());
});

function game() {
  const gameLoop = setInterval(() => {
    clearGrid(); // This must happen before rendering any note
    clearText(); // This must happen before rendering any text
    setMap(levels[1])

    lane0Notes.forEach((note) => note.update());
    lane1Notes.forEach((note) => note.update());
    lane2Notes.forEach((note) => note.update());
    lane3Notes.forEach((note) => note.update());
    
    TOTAL = GOOD + OK + MISS;
    accuracy = (GOOD + OK) / TOTAL * 100
    
    addText(parseInt(accuracy) + "%", {x:1 , y:2, color:color`2`});
    addText(combo + "x", {x:1, y:4, color:color`2`});
    
    addText(GOOD + "", {x:16, y:2, color:color`4`});
    addText(OK + "", {x:16, y:4, color:color`6`});
    addText(MISS + "", {x:16, y:6, color:color`3`});

    switch (lastNote) {
      case "OK":
        addText("OK", {x:9, y:1, color:color`1`})
        break;
      case "GOOD":
        addText("GOOD", {x:8, y:1, color:color`1`})
        break;
      case "MISS":
        addText("MISS", {x:8, y:1, color:color`1`})
        break;
    }

    if (TOTAL === 40) { clearInterval(gameLoop); } // End game once all notes are gone
    
  }, currentMap.speed)
}

function getReady() {
  addText("GET", {x: 8, y: 3, color:color`0`});
  addText("READY!", {x: 7, y: 4, color:color`0`});
  const getReadyTune = tune`
333.3333333333333: G4-333.3333333333333 + E4-333.3333333333333,
333.3333333333333: B4-333.3333333333333 + D5-333.3333333333333,
10000`;
  playTune(getReadyTune);
}

function go() {
  clearText();
  addText("GO!!", {x: 8, y: 3, color:color`0`})
  const goTune = tune`
1000: F5-1000 + C5-1000 + G4-1000,
31000`;
  playTune(goTune);
}

function displayInstructions() {
  setMap(levels[0])
  getReady();
  setTimeout(go, 3000);
  
  addText("a", {x: 6, y: 10, color:color`0`})
  addText("d", {x: 8, y: 10, color:color`0`})
  addText("j", {x: 11, y: 10, color:color`0`})
  addText("l", {x: 13, y: 10, color:color`0`})
}

function endScreen() {
  clearGrid();
  clearText();
  
  addText("Final", {x: 7, y: 2, color:color`0`})
  addText("Score", {x: 7, y: 3, color:color`0`})

  const textTune = tune`
500: G4-500,
15500`;
  const goodTune = tune`
1000: B4~1000 + G4~1000 + E4~1000,
1000: A5~1000 + F5~1000 + D5~1000,
1000: G5~1000 + E5~1000 + C5~1000,
29000`;
  const okTune = tune`
600: B4^600 + F4^600 + F5^600,
600: A4^600 + E4^600 + E5^600,
600: B4^600 + F4^600 + D5^600,
17400`;
  const badTune = tune`
500: B4/500 + E5/500,
500: F4/500 + B4/500,
500: C4/500 + F4/500 + D4/500 + E4/500,
14500`;

  setTimeout((e) => {
    addText("GOOD: " + GOOD, {x: 6, y: 5, color:color`4`});
    playTune(textTune);
  }, 1000)
  setTimeout((e) => {
    addText("OKAY: " + OK, {x: 6, y: 6, color:color`6`});
    playTune(textTune);
  }, 2000)
  setTimeout((e) => {
    addText("MISS: " + MISS, {x: 6, y: 7, color:color`3`});
    playTune(textTune);
  }, 3000)
  setTimeout((e) => {
    addText(combo + "x " + parseInt(accuracy) + "%", {x: 6, y: 9, color:color`L`});
    playTune(textTune);
  }, 4000)

  setTimeout((e) => {
    if (accuracy >= 90) {
      playTune(goodTune);
      addText("NICE", {x: 8, y: 12, color:color`0`});
      addText("JOB!", {x: 8, y: 13, color:color`0`});
    } else if (accuracy >= 80) {
      playTune(okTune);
      addText("NOT", {x: 8, y: 12, color:color`0`});
      addText("BAD", {x: 8, y: 13, color:color`0`});
    } else if (accuracy < 80) {
      playTune(badTune);
      addText("TRY", {x: 8, y: 12, color:color`0`});
      addText("AGAIN", {x: 7, y: 13, color:color`0`});
    }
  }, 5000)
}

displayInstructions()
setTimeout(game, 3500);
setTimeout(endScreen, 18500);
