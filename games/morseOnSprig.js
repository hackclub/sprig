/*
@title: morse on sprig
@author: mrdarip
@tags: ['keyboard', 'tool']
@addedOn: 2024-07-28
*/

var msPerSignal = 1000;

const bibip = tune`
75: E4/75,
75: F4/75,
2250`;
const bop = tune`
75: C4/75,
2325`;
const pip = tune`
50: B5/50,
1550`;
const pipi = tune`
50: B5/50,
50,
50: B5/50,
1450`;

var tickQueue = "";
var currentInput = "";
var inputText = "";

var readingLine = 0
var autoSend = true;

const dot = "x";
const dash = "-";
const del = "d";
const ret = "r";
const view = "v";
const up = "U";
const down = "D";
const sendIcon = "s";
const autosend = "a";

// assign bitmap art to each sprite
setLegend(
  [dot, bitmap`
................
................
................
................
................
................
......0000......
......0000......
......0000......
......0000......
................
................
................
................
................
................`],
  [dash, bitmap`
................
................
................
................
................
................
..000000000000..
..000000000000..
..000000000000..
..000000000000..
................
................
................
................
................
................`],
  [del, bitmap`
....00000000....
....0......0....
0000000000000000
..011111111110..
..0L1101101110..
..0L1101101110..
..0L1101101110..
..0L1101101110..
..0L1101101110..
..0L1101101110..
...0L10110110...
...0L10110110...
...0L10110110...
...0L10110110...
...0L11111110...
...0000000000...`],
  [ret, bitmap`
................
................
................
....0...........
...00...........
..0000000000....
...00.......0...
....0.......0...
............0...
..0.........0...
..0.........0...
...0........0...
....00000000....
................
................
................`],
  [view, bitmap`
................
................
................
................
................
......00000.....
....002222200...
...02227552220..
..0222250522220.
...02225552220..
....002222200...
......00000.....
................
................
................
................`],
  [up, bitmap`
.......00.......
......0000......
......0000......
.....000000.....
.....000000.....
....00000000....
....00000000....
...0000000000...
...0000000000...
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......`],
  [down, bitmap`
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
...0000000000...
...0000000000...
....00000000....
....00000000....
.....000000.....
.....000000.....
......0000......
......0000......
.......00.......`],
  [sendIcon, bitmap`
000.00.0..0.00..
0...0..00.0.0.0.
000.00.0.00.0.0.
..0.0..0..0.0.0.
000.00.0..0.00..
................
................
................
.........0......
.........00.....
..0000000000....
..0000000000....
.........00.....
.........0......
................
................`],
  [autosend, bitmap`
000.0.0.000.000.
0.0.0.0..0..0.0.
000.0.0..0..0.0.
0.0.0.0..0..0.0.
0.0.0.0..0..0.0.
0.0.000..0..000.
............1...
0...0...L...11..
.0.0.L.0.0LL111.
..L...0.....11..
............1...
000.00.0..0.00..
0...0..00.0.0.0.
000.00.0.00.0.0.
..0.0..0..0.0.0.
000.00.0..0.00..`],

)

let level = 0;
const levels = [
  map`
..........
..........
..........
..........
..........
..U....a..
.x.v..r.-.
..D....s..`,
  map`
..........
..........
..........
..........
..........
..........
..........
..........`,
];

setMap(levels[level]);

chars = {
  ".-": "a",
  "-...": "b",
  "-.-.": "c",
  "-..": "d",
  ".": "e",
  "..-.": "f",
  "--.": "g",
  "....": "h",
  "..": "i",
  ".---": "j",
  "-.-": "k",
  ".-..": "l",
  "--": "m",
  "-.": "n",
  "---": "o",
  ".--.": "p",
  "--.-": "q",
  ".-.": "r",
  "...": "s",
  "-": "t",
  "..-": "u",
  "...-": "v",
  ".--": "w",
  "-..-": "x",
  "-.--": "y",
  "--..": "z",
  ".----": "1",
  "..---": "2",
  "...--": "3",
  "....-": "4",
  ".....": "5",
  "-....": "6",
  "--...": "7",
  "---..": "8",
  "----.": "9",
  "-----": "0",
};

onInput("a", () => {
  //dot
  playTune(pip);
  currentInput = ".";
  enqueueInput()

  resetTickLoop()
  updateUI();
});

onInput("l", () => {
  //dash
  playTune(pipi);
  currentInput = "-";
  enqueueInput()

  resetTickLoop()
  updateUI();
});

onInput("k", () => {
  if (chars[tickQueue]) {
    dequeueInput()
  }
});
onInput("i", () => {
  autoSend = !autosend
});

onInput("j", () => {
  inputText = inputText.substring(0, inputText.length - 1);
  playTune(bop);
  updateUI()
});

var tick;
var tickLoop
resetTickLoop()

function resetTickLoop() {
  clearInterval(tickLoop)

  tick = false;
  tickLoop = setInterval(() => {
    tick = !tick;
    if (tick && autoSend) {
      playTune(bop);

      //if tickQueue is empty, and last character isn't a space, send a space
      if (tickQueue == "" && inputText[inputText.length - 1] != " ") {
        playTune(bibip);
        inputText += " ";
        updateUI();
      }

      if (chars[tickQueue]) {
        playTune(bibip);
        dequeueInput()
      }

      // if tickQueue length is biggest than the  lengthiest key in characters, clear it
      console.log(Math.max(...Object.keys(chars).map(k => k.length)))
      console.log(tickQueue.length)
      if (tickQueue.length > Math.max(...Object.keys(chars).map(k => k.length))) {
        playTune(bop);
        tickQueue = "";
        updateUI()
      }
    }
  }, msPerSignal / 2);

}

function enqueueInput() {
  tickQueue += currentInput;
  currentInput = "";
  updateUI();
}

function dequeueInput() {
  inputText += chars[tickQueue]
  tickQueue = "";
  currentInput = "";

  updateUI();
}

function displayCurrentInput() {
  addText(tickQueue + currentInput, {
    x: 0,
    y: 0,
    color: color`0`,
  });
}

function displayInputtedText() {
  addText(inputText + "_", {
    x: 0,
    y: 1,
    color: color`0`,
  });
}

function updateUI() {
  clearText();
  displayCurrentInput();
  displayInputtedText();
  //displayAllCharacters();
}


onInput('d', () => {
  level = 1
  setMap(levels[level]);
  clearInterval(tickLoop)


  updateReadingUI()
})


onInput('w', () => {
  if (level == 1) {

    readingLine--
    updateReadingUI()
  } else {
    msPerSignal -= 50
    resetTickLoop()
  }
})

onInput('s', () => {
  if (level == 1) {
    readingLine++
    updateReadingUI()
  } else {
    msPerSignal += 50
    resetTickLoop()
  }
})


function updateReadingUI() {
  clearText()
  let allText = inputText

  for (let i = 0; i < height() * 2; i++) {
    addText(allText.substring((i + readingLine) * (width() * 2), (i + readingLine + 1) * width() * 2), {
      x: 0,
      y: i,
      color: '0'
    })
  }
}

function displayAllCharacters() {
  let i = 0
  for (let key in chars) {
    addText(chars[key] + " " + key, {
      x: 0,
      y: i * 2 + 3,
      color: '0'
    })
    i++
  }
}