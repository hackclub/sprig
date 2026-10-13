/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Casino_Blitz
@description: Just a basic Slot Machine game with a payout table, and simple game mechanics
@author: Dionysus
@tags: ['casino', 'casino', 'endless']
@addedOn: 2025-10-12
*/
const FG = "1";

const SYM_SEVEN = "7";
const SYM_CHERRY = "c";
const SYM_DIAMOND = "d";
const SYM_BELL = "b";
const SYM_STAR = "s";
const SYM_SKULL = "k";

setLegend(
  [FG, bitmap`
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
    1111111111111111
  `],
  [SYM_SEVEN, bitmap`
    0000000000000000
    0011111111111100
    0011111111111100
    0011000000011100
    0000000000111000
    0000000001110000
    0000000011100000
    0000000111000000
    0000001110000000
    0000001100000000
    0000011100000000
    0000011100000000
    0000011100000000
    0000011100000000
    0000000000000000
    0000000000000000
  `],
  [SYM_CHERRY, bitmap`
    0000000000000000
    0000001111100000
    0000011000110000
    0000110000011000
    0000110000011000
    0000011000110000
    0000001111100000
    0000000011000000
    0000000111100000
    0000001101110000
    0000110000111000
    0001100000011000
    0001100000011000
    0000110000110000
    0000011111000000
    0000000000000000
  `],
  [SYM_DIAMOND, bitmap`
    0000000000000000
    0000000110000000
    0000001111000000
    0000011111100000
    0000111111110000
    0001111111111000
    0000111111110000
    0000011111100000
    0000001111000000
    0000000110000000
    0000000000000000
    0000000000000000
    0000000000000000
    0000000000000000
    0000000000000000
    0000000000000000
  `],
  [SYM_BELL, bitmap`
    0000000000000000
    0000000110000000
    0000001111000000
    0000011111100000
    0000111111110000
    0001111111111000
    0001111111111000
    0011111111111100
    0000001110000000
    0000011111000000
    0000000000000000
    0000000000000000
    0000000000000000
    0000000000000000
    0000000000000000
    0000000000000000
  `],
  [SYM_STAR, bitmap`
    0000000000000000
    0000000110000000
    0000001111000000
    0111111111111110
    0011111111111100
    0001111111111000
    0000111111110000
    0000011001100000
    0000110000110000
    0001100000011000
    0000000000000000
    0000000000000000
    0000000000000000
    0000000000000000
    0000000000000000
    0000000000000000
  `],
  [SYM_SKULL, bitmap`
    0000000000000000
    0000001111000000
    0000011111100000
    0000110110110000
    0000110110110000
    0000111111110000
    0000001111000000
    0000011111100000
    0000010110100000
    0000000000000000
    0000000000000000
    0000000000000000
    0000000000000000
    0000000000000000
    0000000000000000
    0000000000000000
  `]
);

const EMPTY_MAP = map`
................
................
................
................
................
................
................
................
................
................
................
................
`;

setMap(EMPTY_MAP);

const SYMBOLS = [SYM_SEVEN, SYM_CHERRY, SYM_DIAMOND, SYM_BELL, SYM_STAR, SYM_SKULL];

let balance = 100;
let bet = 5;
let screenState = "START"; // "START", "MAIN", "PAYOUT"

let reel1 = 0;
let reel2 = 1;
let reel3 = 2;

let isSpinning = false;
let spinTimer = 0;
let message = "PRESS D TO SPIN";
let lastWin = 0;

const BOARD_WIDTH = 16;
const BOARD_HEIGHT = 12;

function buildMapString(matrix) {
  let rows = [];
  for (let r = 0; r < BOARD_HEIGHT; r++) {
    let rowStr = "";
    for (let c = 0; c < BOARD_WIDTH; c++) {
      rowStr += matrix[r][c] || ".";
    }
    rows.push(rowStr);
  }
  return rows.join("\n");
}

function updateDisplay() {
  let matrix = [];
  for (let r = 0; r < BOARD_HEIGHT; r++) {
    let row = [];
    for (let c = 0; c < BOARD_WIDTH; c++) {
      if (r === 0 || r === BOARD_HEIGHT - 1 || c === 0 || c === BOARD_WIDTH - 1) {
        row.push(FG);
      } else {
        row.push(".");
      }
    }
    matrix.push(row);
  }

  if (screenState === "START") {
    setMap(map`${buildMapString(matrix)}`);
    clearText();
    addText("CASINO BLITZ", { x: 2, y: 3, color: "1" });
    addText("PRESS D TO START", { x: 1, y: 7, color: "1" });
    addText("BY DIONYSUS", { x: 2, y: 10, color: "1" });
  } else if (screenState === "MAIN") {
    matrix[4][6] = SYMBOLS[reel1];
    matrix[4][7] = SYMBOLS[reel2];
    matrix[4][8] = SYMBOLS[reel3];

    setMap(map`${buildMapString(matrix)}`);

    clearText();
    addText("CASINO BLITZ", { x: 2, y: 2, color: "1" });

    addText("BAL:" + balance + " BET:" + bet, { x: 2, y: 7, color: "1" });
    addText(message, { x: 1, y: 8, color: "1" });
    addText("D:SPN A:BET W:PAY", { x: 1, y: 10, color: "1" });

  } else if (screenState === "PAYOUT") {
    setMap(map`${buildMapString(matrix)}`);

    clearText();
    addText("PAYTABLE", { x: 4, y: 1, color: "1" });
    addText("3 7S: 20X", { x: 2, y: 3, color: "1" });
    addText("3 DIAMOND: 10X", { x: 2, y: 4, color: "1" });
    addText("3 STAR: 8X", { x: 2, y: 5, color: "1" });
    addText("3 BELL: 6X", { x: 2, y: 6, color: "1" });
    addText("3 CHERRY: 5X", { x: 2, y: 7, color: "1" });
    addText("3 SKULL: 3X", { x: 2, y: 8, color: "1" });
    addText("ANY 2: 2X", { x: 2, y: 9, color: "1" });
    addText("S: BACK TO GAME", { x: 1, y: 10, color: "1" });
  }
}

function evaluateWin() {
  let s1 = reel1;
  let s2 = reel2;
  let s3 = reel3;

  let multiplier = 0;

  if (s1 === s2 && s2 === s3) {
    if (s1 === 0) multiplier = 20;
    else if (s1 === 2) multiplier = 10;
    else if (s1 === 4) multiplier = 8;
    else if (s1 === 3) multiplier = 6;
    else if (s1 === 1) multiplier = 5;
    else if (s1 === 5) multiplier = 3;
  } else if (s1 === s2 || s2 === s3 || s1 === s3) {
    multiplier = 2;
  }

  if (multiplier > 0) {
    lastWin = bet * multiplier;
    balance += lastWin;
    message = "WIN! +" + lastWin + " COINS";
    playTune(tune`c4 e4 g4 c5`);
  } else {
    lastWin = 0;
    message = "NO WIN. TRY AGAIN";
    playTune(tune`c3 g2 c2`);
  }
}

setInterval(() => {
  if (isSpinning) {
    spinTimer++;
    reel1 = Math.floor(Math.random() * SYMBOLS.length);
    reel2 = Math.floor(Math.random() * SYMBOLS.length);
    reel3 = Math.floor(Math.random() * SYMBOLS.length);

    if (spinTimer === 15) {
      reel1 = Math.floor(Math.random() * SYMBOLS.length);
      playTune(tune`e3`);
    } else if (spinTimer === 25) {
      reel2 = Math.floor(Math.random() * SYMBOLS.length);
      playTune(tune`g3`);
    } else if (spinTimer >= 35) {
      reel3 = Math.floor(Math.random() * SYMBOLS.length);
      playTune(tune`b3`);
      isSpinning = false;
      evaluateWin();
    }
  }
  updateDisplay();
}, 100);

// W: Show Payout Table
onInput("w", () => {
  if (screenState === "MAIN") {
    screenState = "PAYOUT";
    updateDisplay();
  }
});

// S: Return to main game from payout
onInput("s", () => {
  if (screenState === "PAYOUT") {
    screenState = "MAIN";
    updateDisplay();
  }
});

// A: Increase Bet / Cycle bet
onInput("a", () => {
  if (screenState === "START") {
    screenState = "MAIN";
    updateDisplay();
    playTune(tune`c4 e4 g4 c5`);
    return;
  }
  if (screenState === "MAIN" && !isSpinning) {
    if (bet === 5) bet = 10;
    else if (bet === 10) bet = 20;
    else bet = 5;
    message = "BET SET TO " + bet;
    playTune(tune`g4`);
  }
});

// D: Spin / Start
onInput("d", () => {
  if (screenState === "START") {
    screenState = "MAIN";
    updateDisplay();
    playTune(tune`c4 e4 g4 c5`);
    return;
  }
  if (screenState === "MAIN" && !isSpinning) {
    if (balance < bet) {
      message = "NOT ENOUGH COINS!";
      playTune(tune`c2`);
      return;
    }
    balance -= bet;
    isSpinning = true;
    spinTimer = 0;
    message = "SPINNING...";
    playTune(tune`c4 g4 c5`);
  }
});

updateDisplay();
