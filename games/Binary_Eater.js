/*
@title:  Binary Eater
@author: Kumaraswamy
@tags: ['puzzle']
@addedOn: 2023-03-10

Inspired from: https://zac.cy/trashguy/

Game where the player can to give inputs using (WASD, IJKL), 
these commands are then interpreted as custom binary commands and text is displayed
accordingly.

Suppose you press (w + w + a + a + a, w + w + w + w + w,
        and w + a + w + a + w), then it'll display "hak" will which then later get eaten up
        by the eater, the goal is to type as many characters as possible before the eater finds
        it empty, without typing wrong values.

Also you cannot input more than 3 characters, 
you have to wait for the eater to grab one of the char
To restart game: Press L


w, a, s, d,   i, j, k, l

w = 0
a = 1
s = 10
d = 01

i = 00
j = 11
k = 001
l = 100

-------------------------------------------------
Character Codes
--------------------------------------------------

0: 00000 → "a"
1: 00001 → "b"
2: 00010 → "c"
3: 00011 → "d"
4: 00100 → "e"
5: 00101 → "f"
6: 00110 → "g"
7: 00111 → "h"
8: 01000 → "i"
9: 01001 → "j"
10: 01010 → "k" (w + a + w + a + w)
11: 01011 → "l"
12: 01100 → "m"
13: 01101 → "n"
14: 01110 → "o"
15: 01111 → "p"
16: 10000 → "q"
17: 10001 → "r"
18: 10010 → "s"
19: 10011 → "t"
20: 10100 → "u"
21: 10101 → "v"
22: 10110 → "w"
23: 10111 → "x"
24: 11000 → "y"
25: 11001 → "z"
*/

const can = "c";
const background = "b"
const melody = tune`
208.33333333333334: c5-208.33333333333334 + b5^208.33333333333334 + c4^208.33333333333334,
208.33333333333334: c5^208.33333333333334 + d5^208.33333333333334 + e5^208.33333333333334 + f5^208.33333333333334 + a5^208.33333333333334,
208.33333333333334: f5^208.33333333333334 + g5^208.33333333333334,
208.33333333333334: g5^208.33333333333334 + e5-208.33333333333334,
208.33333333333334: g5^208.33333333333334 + a5^208.33333333333334 + e5-208.33333333333334 + d5-208.33333333333334 + g4-208.33333333333334,
208.33333333333334: a5^208.33333333333334 + f5-208.33333333333334 + e5-208.33333333333334 + d5-208.33333333333334 + c5/208.33333333333334,
208.33333333333334: a5^208.33333333333334 + e5-208.33333333333334 + b4/208.33333333333334 + e4-208.33333333333334,
208.33333333333334: a5^208.33333333333334 + g5^208.33333333333334 + e4-208.33333333333334 + f4-208.33333333333334,
208.33333333333334: g5^208.33333333333334 + f5^208.33333333333334,
208.33333333333334: e5^208.33333333333334 + d5^208.33333333333334 + c5^208.33333333333334 + b4^208.33333333333334 + b5-208.33333333333334,
208.33333333333334: b4^208.33333333333334 + a4^208.33333333333334 + g4^208.33333333333334 + f4^208.33333333333334 + e4^208.33333333333334,
208.33333333333334: e4^208.33333333333334 + d4^208.33333333333334 + g5-208.33333333333334 + e5-208.33333333333334 + b5-208.33333333333334,
208.33333333333334: e4^208.33333333333334 + e5-208.33333333333334 + f5-208.33333333333334 + c5~208.33333333333334 + b4~208.33333333333334,
208.33333333333334: f4^208.33333333333334 + f5-208.33333333333334 + e5-208.33333333333334 + g5-208.33333333333334 + c5~208.33333333333334,
208.33333333333334: g4^208.33333333333334 + a4^208.33333333333334 + f5-208.33333333333334 + e5-208.33333333333334 + d5~208.33333333333334,
208.33333333333334: a4^208.33333333333334 + b4^208.33333333333334 + c5^208.33333333333334 + d4~208.33333333333334 + c4~208.33333333333334,
208.33333333333334: c5^208.33333333333334 + d5^208.33333333333334 + e5^208.33333333333334 + f5^208.33333333333334 + e4-208.33333333333334,
208.33333333333334: f5^208.33333333333334 + g5^208.33333333333334 + a4/208.33333333333334 + g4/208.33333333333334 + c4~208.33333333333334,
208.33333333333334: g5^208.33333333333334 + a5^208.33333333333334 + d5-208.33333333333334 + g4/208.33333333333334 + d4~208.33333333333334,
208.33333333333334: a5^208.33333333333334 + e5-208.33333333333334 + d5-208.33333333333334 + c5-208.33333333333334 + g4/208.33333333333334,
208.33333333333334: a5^208.33333333333334 + d5-208.33333333333334 + a4/208.33333333333334 + e4~208.33333333333334 + c4~208.33333333333334,
208.33333333333334: a5^208.33333333333334 + g5^208.33333333333334,
208.33333333333334: f5^208.33333333333334 + e5^208.33333333333334 + d5^208.33333333333334 + c5^208.33333333333334 + b4^208.33333333333334,
208.33333333333334: b4^208.33333333333334 + g4^208.33333333333334 + f4^208.33333333333334 + e4^208.33333333333334 + a4^208.33333333333334,
208.33333333333334: e4^208.33333333333334 + d4^208.33333333333334 + d5-208.33333333333334 + a4/208.33333333333334,
208.33333333333334: d4^208.33333333333334 + e5-208.33333333333334 + d5-208.33333333333334 + a4/208.33333333333334 + b4/208.33333333333334,
208.33333333333334: d4^208.33333333333334 + e4^208.33333333333334 + d5-208.33333333333334 + b4/208.33333333333334 + a5~208.33333333333334,
208.33333333333334: e4^208.33333333333334 + f4^208.33333333333334 + g4^208.33333333333334 + a5~208.33333333333334,
208.33333333333334: a4^208.33333333333334 + b4^208.33333333333334 + c5^208.33333333333334 + d5^208.33333333333334,
208.33333333333334: e5^208.33333333333334 + f5^208.33333333333334 + b4/208.33333333333334 + a4/208.33333333333334,
208.33333333333334: g5^208.33333333333334 + g4/208.33333333333334,
208.33333333333334: g5-208.33333333333334 + g4/208.33333333333334 + c4^208.33333333333334 + b5^208.33333333333334 + d5-208.33333333333334`


setLegend(
  [ can, bitmap`
................
................
.....111117C....
....111122C21...
...22222222211..
...21222C22211..
...21222CC2211..
...21222CCC211..
...12222CC2211..
...12222222211..
...1122222C211..
....1122C2211...
.....1122211....
................
................
................`],
  [ background, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
);

setBackground(background);

let playback = playTune(melody, Infinity)
setSolids([can]);


const level =
  map`
...........
...........
c..........
...........`;

setMap(level);


addText("(> ^_^)>", { 
  x: 2,
  y: 8,
  color: color`L`
})

const UPDATE_COUNT = 700;

const LEFT_CARRIER = '(> ^_^)>';
const RIGHT_CARRIER = '<(^_^ <)';

let current_carrier = LEFT_CARRIER;

let game_running = true;

let letters = '';
let count = 2;
let message = "";

let current_let_eat = '';

let score = 0;

let bin = "";

function loop() {
  count = 2;

  update(); // call now once
  const intervalId = setInterval(update, UPDATE_COUNT);

  setTimeout(() => {
    clearInterval(intervalId);
    eatNextChar();
  }, UPDATE_COUNT * 7);
}

function update() {
  update_animation(count);
  count++;
}

function update_animation(count) {
  if (!game_running) {
    return;
  }
  clearText();
  addText(current_carrier, { 
    x: count,
    y: 8,
    color: color`2`
  })

  // the letters variable can have max 3 chars, other empty chars are rep by _
  let format = letters.padEnd(3, "_");
  
  addText(format, { x: 16, y: 8, color: color`2` });
  addText(message, { x: 4,  y: 5, color: color`D`});
  
  addText("(" + score + ")", { x: 15,  y: 10, color: color`7`});

  addText("(" + bin + ")", { x: 0,  y: 10, color: color`9`});
}

loop(); // start trash guy animation

function eatNextChar() {
  // when the eater has reached the destination to
  // kidnap the character
  // a__
  if (letters.length == 0) {
    // here the game ends!
    message = "Noo! Score: " + score;
    update_animation(count - 1);
    game_running = false;

    playback.end();
  } else {
    current_let_eat = letters.charAt(0);
    letters = letters.substring(1);

    count--;

    current_carrier = current_let_eat + RIGHT_CARRIER;
    reverse_animate();
    const intervalId = setInterval(reverse_animate, UPDATE_COUNT);

    setTimeout(() => {
       clearInterval(intervalId);

       current_carrier = LEFT_CARRIER;
       update_animation(count + 1);
       loop();
       // from here we have to start again
    }, UPDATE_COUNT * 7);

    score++;
  }
}

function reverse_animate() {
  update_animation(count);
  count--;
}


// generats a custom binary mapping from 'a' to 'z'

function generateBinaryMap() {
  let binaryMap = new Map();
  for (let c = 97; c <= 122; c++) {
    let binaryValue = (c - 97).toString(2).padStart(5, "0");
    binaryMap.set(binaryValue, String.fromCharCode(c));
  }
  return binaryMap;
}



let binaryMap = generateBinaryMap();
// console.log(binaryMap);

onInput("w", () => { code(0);  });
onInput("a", () => { code(1);  });
onInput("s", () => { code(1); code(0);  });
onInput("d", () => { code(0); code(1);  });

onInput("i", () => { code(0); code(0);  });
onInput("j", () => { code(1); code(1);  });
onInput("k", () => { code(0); code(0); code(1);  });

function restart_game() {
    game_running = true;
    letters = '';
    count = 2;
    message = '';
    score = 0;
    current_let_eat = '';

    update_animation(count);
    loop();

    playback = playTune(melody, Infinity)
}

// l is also used to reset
onInput("l", () => {
    // console.log("yep");
    if (!game_running) {
        restart_game();
        return;
    }
    code(1); code(0); code(0);
  });


function code(digit) {
  if (letters.length == 3) {
    message = "Let Em' Eat!";

    setTimeout(() => {
        message = "";
     }, 2000);
    return;
  }
  
  bin += digit.toString();
  if (bin.length === 5) {
    let ch = binaryMap.get(bin);
    if (ch == undefined) {
        // they entered a wrong binary code!
        // here the game ends!

        message = "Invalid: " + bin;
        addText(message, { x: 4,  y: 5, color: color`3`});

        game_running = false;
        playback.end();   

        return;
    }
    // console.log("Binary value: " + ch);

    letters += ch;
    bin = "";

    addText(bin, { x: 0,  y: 10, color: color`C`});
  }
}

