/*
@title: find_the_suspect
@author: jonas
@tags: []
@addedOn: 2023-02-02
*/

const left = "v";
const right = "w";
const candidate1 = "a";
const candidate2 = "b";
const candidate3 = "c";
const candidate4 = "d";
const candidate5 = "e";
const candidate6 = "f";
const candidate7 = "g";
const candidate8 = "h";
const candidate9 = "i";
const candidate10 = "j";
const candidate11 = "k";
const candidate12 = "l";
const background = "u";
const titleSTART = "x";
const titleMIDDLE = "y";
const titleEND = "z";

const welcomeSound = tune`
291.2621359223301: g4/291.2621359223301 + d4~291.2621359223301,
291.2621359223301: b4^291.2621359223301 + e4~291.2621359223301,
291.2621359223301: g4/291.2621359223301 + b4^291.2621359223301,
291.2621359223301: f4/291.2621359223301 + d4~291.2621359223301,
291.2621359223301: g4/291.2621359223301,
7864.077669902913`;
const backgroundSound = tune`
405.4054054054054: d4^405.4054054054054,
405.4054054054054: d4~405.4054054054054,
405.4054054054054: d4^405.4054054054054,
405.4054054054054,
405.4054054054054: c4~405.4054054054054,
405.4054054054054,
405.4054054054054: c4~405.4054054054054,
405.4054054054054,
405.4054054054054: c4~405.4054054054054,
405.4054054054054,
405.4054054054054: d4^405.4054054054054 + g4^405.4054054054054,
405.4054054054054: d4~405.4054054054054,
405.4054054054054: d4^405.4054054054054 + g4^405.4054054054054,
405.4054054054054,
405.4054054054054: c4~405.4054054054054,
405.4054054054054,
405.4054054054054: c4~405.4054054054054,
405.4054054054054,
405.4054054054054: c4~405.4054054054054,
405.4054054054054,
405.4054054054054: d4^405.4054054054054 + b4^405.4054054054054,
405.4054054054054: d4~405.4054054054054,
405.4054054054054: d4^405.4054054054054 + b4^405.4054054054054,
405.4054054054054,
405.4054054054054: c4~405.4054054054054,
405.4054054054054,
405.4054054054054: c4~405.4054054054054,
405.4054054054054,
405.4054054054054: c4~405.4054054054054,
405.4054054054054,
405.4054054054054: c4~405.4054054054054,
405.4054054054054`;
const winSound = tune`
283.0188679245283: a4^283.0188679245283 + f5~283.0188679245283 + a5/283.0188679245283,
283.0188679245283,
283.0188679245283: a4^283.0188679245283 + f5~283.0188679245283,
283.0188679245283: c5~283.0188679245283,
283.0188679245283: b4^283.0188679245283 + e5~283.0188679245283 + g5/283.0188679245283,
283.0188679245283: c5^283.0188679245283 + f5~283.0188679245283 + a5/283.0188679245283,
7358.490566037736`;
const looseSound = tune`
283.0188679245283: f4~283.0188679245283 + g4^283.0188679245283,
283.0188679245283: c5~283.0188679245283,
283.0188679245283: g5^283.0188679245283 + a5/283.0188679245283,
283.0188679245283: c5~283.0188679245283 + f5^283.0188679245283,
283.0188679245283: c5~283.0188679245283 + e5^283.0188679245283 + f5/283.0188679245283,
283.0188679245283: b4~283.0188679245283 + d5^283.0188679245283,
283.0188679245283: a4~283.0188679245283,
283.0188679245283: c5^283.0188679245283 + b4/283.0188679245283 + g4~283.0188679245283,
283.0188679245283: c5/283.0188679245283,
6509.433962264151`;


var parsedCharacter = 0;
var generatedCharacter = 0;
var checkedCharacters = [];
var finished = false;
var backgroundMusic;

setLegend(
  [ right, bitmap`
................
................
................
................
...000000000....
..02222222220...
..02222222220...
..02222222220...
..02222222220...
..02222222220...
..02222222220...
..02222222220...
..02222222220...
...000000000....
................
................` ],
  [ left, bitmap`
................
................
................
................
....000000000...
...02222222220..
...02222222220..
...02222222220..
...02222222220..
...02222222220..
...02222222220..
...02222222220..
...02222222220..
....000000000...
................
................` ],
  [ titleSTART, bitmap`
................
................
..00000000000000
.022222222222222
.022222222222222
.022222222222222
.022222222222222
.022222222222222
.022222222222222
.022222222222222
.022222222222222
.022222222222222
.022222222222222
.022222222222222
.022222222222222
..00000000000000` ],
  [ titleMIDDLE, bitmap`
................
................
0000000000000000
2000000000000002
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
0000000000000000` ],
  [ titleEND, bitmap`
................
................
00000000000000..
222222222222220.
222222222222220.
222222222222220.
222222222222220.
222222222222220.
222222222222220.
222222222222220.
222222222222220.
222222222222220.
222222222222220.
222222222222220.
222222222222220.
00000000000000..` ],
  [ background, bitmap`
LLLLLLLLLLLLLLLL
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL` ],
  [ candidate1, bitmap`
................
................
.....00000C.....
...C0C0C0000C...
...CC0C0CC0CC...
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCC0CCCC0CCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCC000CCCCC..
...CC0CCC0CCC...
...CCCCCCCCCC...
.....CCCCCC.....
.77777CCCC77777.
7777777777777777`],
  [ candidate2, bitmap`
................
................
.....00000C.....
...90C0C00009...
...9909099099...
..999999999999..
..999999999999..
..999099990999..
..999999999999..
..999999999999..
..999900099999..
...9909990999...
...9999999999...
.....999999.....
.FFFFF9999FFFFF.
FFFFFFFFFFFFFFFF`],
  [ candidate3, bitmap`
................
................
.....CCCCCCC....
...CCCCCCCCCC...
...CCCCCCCCCCC..
..CCCCC9999CCC..
..CCC9999999CC..
.CCCC0999909CCC.
.CCC999999999CC.
.CCC999999999CC.
.CCC909990999CC.
.CCC990009999CC.
.CCC999999999C..
.CCC.999999..C..
.CC333999933333.
3C33333333333333`],
  [ candidate4, bitmap`
................
................
.....3333333....
...3333333333...
...33333333333..
..333339999333..
..333999999933..
.33330999909333.
.33399999999933.
.33399999999933.
.33399900999933.
.33399900999933.
.3339999999993..
.333..9999...3..
.33LLLL99LLLLL..
.3LLLLLLLLLLLLL.`],
  [ candidate5, bitmap`
................
................
.....00000C.....
...90C0C00009...
...9909099099...
..9LLLL9LLLL99..
..LL77L9L77L9L..
..9L77LLL77LL9..
..9LLLL9LLLL99..
..999999999999..
..999900099999..
...9909990999...
...9999999999...
.....999999.....
.66666999966666.
6666666666666666`],
  [ candidate6, bitmap`
................
................
.....999999.....
...9999999999...
...9999999999...
..999999999999..
..L9909999099L..
..L9999999999L..
..999999999999..
..999CCCCCC999..
..CCCC000CCCCC..
...CC0CCC0CCC...
...CCCCCCCCCC...
.....999999.....
.77777999977777.
7777777777777777`],
  [ candidate7, bitmap`
................
................
.....000000.....
...0000000000...
...0000100000...
..000111000000..
..011011100000..
..L11111100000..
..111111110000..
..111111111000..
..111100011100..
...1101110111...
...1111111111...
.....111111.....
.LLLLL1111LLLLL.
LLLLLLLLLLLLLLLL`],
  [ candidate8, bitmap`
......C..C......
......C.C.......
.....99C999.....
...9999999999...
...9999999999...
..999999999999..
..999099990999..
..999799997999..
..999999999999..
..999020200999..
..999000000999..
...9900330099...
...9999999999...
.....999999.....
.CCCCC9999CCCCC.
CCCCCCCCCCCCCCCC`],
  [ candidate9, bitmap`
................
....CCCCCC......
....C999999.....
...9999999999...
...9000990009...
..999999999999..
..999099990999..
..999999999999..
..999999999999..
..999CCCCCC999..
..CCCC0CC0CCCC..
...CCCC00CCCC...
...CCCCCCCCCC...
.....999999.....
.22222999922222.
2222222222222222`],
  [ candidate10, bitmap`
.....00000......
....0000000.....
....00000000....
...9900000099...
...9999999999...
..993939939399..
..993339933399..
..999399993999..
..999999999999..
..999999999999..
..999909909999..
...9999009999...
...9999999999...
.....999999.....
.D4D4D99994D4D4.
4D4D4D4D4D4D4D4D`],
  [ candidate11, bitmap`
.....CCCCC......
....CCCCCCC.....
....CCCCCCCC....
...99CCCCCC99...
...9999999999...
..990009900099..
..990009900099..
..990029900299..
..999999999999..
..999999999999..
..999990099999..
...9990009999...
...9999999999...
.....999999.....
.H8H8H99998H8H8.
H8H8H8H8H8H8H8H8`],
  [ candidate12, bitmap`
................
......CCCCC.....
....CCCCCCCC....
...9CCCCCCCC9...
..99CCCCCCCC9...
..99C02CC20C99..
.999CCCCCCCC999.
.999CCC00CCC999.
.999CCCCCCCC999.
.999CCCCCCCC999.
.99CCC0000CCC9..
...CCC0330CCC...
....CCC33CCC....
.....CCCCCC.....
...CCCCCCCCC....
..CCC99999CCC...`]
);

const levels = [
  map`
xyz
vaw`,
  map`
xyz
vbw`,
  map`
xyz
vcw`,
  map`
xyz
vdw`,
  map`
xyz
vew`,
  map`
xyz
vfw`,
  map`
xyz
vgw`,
  map`
xyz
vhw`,
  map`
xyz
viw`,
  map`
xyz
vjw`,
  map`
xyz
vkw`,
  map`
xyz
vlw`
];
const finishScreen = map`
xyz
...`;

setBackground(background);
generate();
generateCharacter();

initializeText();

startGameSound();

onInput("a", () => {
  if(!finished) wasCorrect(false);
});

onInput("d", () => {
  if(!finished) wasCorrect(true);
});

onInput("w", () => {
  restart();
});

function generate() {
  const descriptions = [ "- Dark hair\n- Sad face\n- Blue Pullover#0", 
                        "- Sad\n- Dark green#1", 
                        "- Female\n- Happy\n- red clothes <3#2",
                        "- Suprised\n- Girl\n- RED FTW#3",
                        "- Glasses\n- Sad#4",
                        "- Beard\n- Old\n- No hairs#5",
                        "- Dark hair\n- Colors!?#6",
                        "- Still young\n- CRYING#7",
                        "- Beard\n- Happy\n- White ... ?#8",
                        "- In Loveee\n- With stripes!?#9",
                        "- Pleading\n- Pink and purple!!#10",
                        "- *WOOF*\n- *WOOF*#11"]
  const description = descriptions[Math.floor(Math.random() * descriptions.length)];
  const character = description.split("#")[1];
  parsedCharacter = (character != null ? parseInt(character) : 0)

  addText (description.split("#")[0], { 
  x: 2,
  y: 4,
  color: color`0`
});
}

function restart() {
  if(!finished) return;
  finished = false;
  checkedCharacters = [];
  var parsedCharacter = 0;
  var generatedCharacter = 0;
  clearText();
  initializeText();
  generate();
  generateCharacter();
  startGameSound();
}

function generateCharacter() {
  var number = Math.floor(Math.random() * 12);
  while(checkedCharacters.includes(number)) {
    number = Math.floor(Math.random() * 12);
  }
  generatedCharacter = number;
  checkedCharacters.push(number);
  setMap(levels[number]);
}

function wasCorrect(shouldBeCorrect) {
  if(generatedCharacter == parsedCharacter) {
    if(shouldBeCorrect) {
      endGameSound(true);
      clearText();
      setMap(finishScreen);
      addText (" SUSPECT CAUGHT!\nCongratulations", { 
        x: 2,
        y: 4,
        color: color`4`
      });
      addText ("Restart? Press W", { 
        x: 2,
        y: 13,
        color: color`2`
      });
      finished = true;
      return;
    }
    endGameSound();
    clearText();
    setMap(finishScreen);
    addText ("SUSPECT ESCAPED!\n  Inacceptable!", { 
      x: 2,
      y: 4,
      color: color`3`
    });
    addText ("Retry? Press W", { 
        x: 3,
        y: 13,
        color: color`2`
    });
    finished = true;
    return;
  }

  if(shouldBeCorrect) {
    endGameSound();
    clearText();
    setMap(finishScreen);
    addText ("NOT THE SUSPECT!\n   Scandalous!", { 
      x: 2,
      y: 4,
      color: color`3`
    });
    addText ("Retry? Press W", { 
        x: 3,
        y: 13,
        color: color`2`
    });
    finished = true;
    return;
  }
  generateCharacter();
}

function initializeText() {
  addText("YES", { 
  x: 15,
  y: 11,
  color: color`4`
})

addText("D", { 
  x: 16,
  y: 12,
  color: color`1`
})

addText("NOO", { 
  x: 2,
  y: 11,
  color: color`3`
})

addText("A", { 
  x: 3,
  y: 12,
  color: color`1`
})
}

function startBackground() {
  backgroundMusic = playTune(backgroundSound, Infinity);
}

function startGameSound() {
  if(backgroundMusic != null) backgroundMusic.end();
  playTune(welcomeSound);
  setTimeout(function(){
    startBackground();
  }, 2500);
}

function endGameSound(won) {
  if(backgroundMusic != null) backgroundMusic.end();
  playTune((won ? winSound : looseSound));
}
