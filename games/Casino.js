/*
@title: Casino
@description: gambling yeahhh (slot machine and high low like game)
@author: SSoggyTacoMan
*/

const bg = "x";

const chip = "h";
const skull = "z";
const spark = "g";

const cherry = "c";
const lemon = "l";
const bell = "e";
const bar = "b";
const seven = "s";

const num1 = "1";
const num2 = "2";
const num3 = "3";
const num4 = "4";
const num5 = "5";
const num6 = "6";
const num7 = "7";
const num8 = "8";
const num9 = "9";

let stakes = [5, 10, 25, 50, 75, "ALL"];
let stakeIndex = 1;

const cards = [num1, num2, num3, num4, num5, num6, num7, num8, num9];

const tickSfx = tune`
60: C5-60,
`;

const betSfx = tune`
60: E4-60,
60: G4-60,
`;

const spinSfx = tune`
50: C4-50,
50: E4-50,
50: G4-50,
`;

const loseSfx = tune`
90: C4-90,
100: B3-100,
180: A3-180,
`;

const winSfx = tune`
60: C5-60,
60: E5-60,
110: G5-110,
`;

const bigWinSfx = tune`
50: C5-50,
50: E5-50,
50: G5-50,
50: C6-50,
140: E6-140,
`;

const bustSfx = tune`
120: C4-120,
120: G3-120,
200: C3-200,
`;

setLegend(
  [spark, bitmap`
................
................
.......6........
.......6........
....6..6..6.....
.....66666......
......666.......
.....66666......
....6..6..6.....
.......6........
.......6........
................
................
................
................
................`],

  [chip, bitmap`
................
................
.....333333.....
....33111133....
...3313331333...
...3131111133...
...3131111133...
...3313331333...
....33111133....
.....333333.....
................
................
................
................
................
................`],

  [skull, bitmap`
................
................
.....333333.....
....33333333....
...3300330033...
...3300330033...
...3333333333...
...3330003333...
...3333333333...
....33003333....
.....333333.....
................
................
................
................
................`],

  [cherry, bitmap`
0000000000000000
0111111111111110
0111111411111110
0111114411111110
0111144111111110
0111333311111110
0113333331111110
0113333331111110
0111333311111110
0111133111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0000000000000000
0000000000000000`],

  [lemon, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111116661111110
0111166666111110
0111666666611110
0116666666661110
0116666666661110
0116666666661110
0111666666611110
0111166666111110
0111116661111110
0111111111111110
0111111111111110
0000000000000000
0000000000000000`],

  [bell, bitmap`
0000000000000000
0111111111111110
0111116666111110
0111166666611110
0111666666661110
0111666666661110
0116666666666110
0110000000000110
0111110000111110
0111111001111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0000000000000000
0000000000000000`],

  [bar, bitmap`
0000000000000000
0111111111111110
0111111111111110
0110000000000110
0110222222220110
0110200200200110
0110222222220110
0110000000000110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0000000000000000
0000000000000000`],

  [seven, bitmap`
0000000000000000
0111111111111110
0113333333331110
0113333333331110
0111111113311110
0111111133111110
0111111331111110
0111113311111110
0111133111111110
0111331111111110
0111331111111110
0111111111111110
0111111111111110
0111111111111110
0000000000000000
0000000000000000`],

  [num1, bitmap`
0666666666666660
0611111111111160
0611111111111160
0611111131111160
0611111331111160
0611111131111160
0611111131111160
0611111131111160
0611111131111160
0611113333311160
0611111111111160
0611131111311160
0611111111111160
0611111111111160
0666666666666660
0000000000000000`],

  [num2, bitmap`
0666666666666660
0611111111111160
0611111111111160
0611113333311160
0611131111131160
0611111111131160
0611111113311160
0611111331111160
0611133111111160
0611133333331160
0611111111111160
0611131111311160
0611111111111160
0611111111111160
0666666666666660
0000000000000000`],

  [num3, bitmap`
0666666666666660
0611111111111160
0611111111111160
0611133333311160
0611111111131160
0611111111131160
0611113333311160
0611111111131160
0611111111131160
0611133333311160
0611111111111160
0611131111311160
0611111111111160
0611111111111160
0666666666666660
0000000000000000`],

  [num4, bitmap`
0666666666666660
0611111111111160
0611111111111160
0611133113311160
0611133113311160
0611133113311160
0611133333331160
0611111113311160
0611111113311160
0611111113311160
0611111111111160
0611131111311160
0611111111111160
0611111111111160
0666666666666660
0000000000000000`],

  [num5, bitmap`
0666666666666660
0611111111111160
0611111111111160
0611133333331160
0611133111111160
0611133111111160
0611133333311160
0611111111131160
0611111111131160
0611133333311160
0611111111111160
0611131111311160
0611111111111160
0611111111111160
0666666666666660
0000000000000000`],

  [num6, bitmap`
0666666666666660
0611111111111160
0611111111111160
0611113333311160
0611133111111160
0611133111111160
0611133333311160
0611133111131160
0611133111131160
0611113333311160
0611111111111160
0611131111311160
0611111111111160
0611111111111160
0666666666666660
0000000000000000`],

  [num7, bitmap`
0666666666666660
0611111111111160
0611111111111160
0611133333331160
0611111111131160
0611111113311160
0611111133111160
0611111331111160
0611111331111160
0611111331111160
0611111111111160
0611131111311160
0611111111111160
0611111111111160
0666666666666660
0000000000000000`],

  [num8, bitmap`
0666666666666660
0611111111111160
0611111111111160
0611113333311160
0611133111131160
0611133111131160
0611113333311160
0611133111131160
0611133111131160
0611113333311160
0611111111111160
0611131111311160
0611111111111160
0611111111111160
0666666666666660
0000000000000000`],

  [num9, bitmap`
0666666666666660
0611111111111160
0611111111111160
0611113333311160
0611133111131160
0611133111131160
0611113333331160
0611111111131160
0611111111131160
0611113333311160
0611111111111160
0611131111311160
0611111111111160
0611111111111160
0666666666666660
0000000000000000`],

  [bg, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
);

setSolids([]);
setBackground(bg);

const blankMap = map`
..........
..........
..........
..........
..........
..........
..........
..........`;

setMap(blankMap);

let bank = 150;

let state = "lobby";
// lobby, slotSpin, card, cardRoll, result, loss, bust

let reels = [cherry, lemon, seven];
let finalReels = [cherry, lemon, seven];

let currentCard = 5;
let nextCard = 5;
let guess = "";

let spinTimer = null;
let fxTimer = null;
let transitionTimer = null;

let tick = 0;
let lastStake = 0;
let lastStakeAllIn = false;
let heat = 0;
let fx = 0;

let resultText = "";
let resultGood = false;
let resultIcon = chip;
let resultCard = 0;

function updateStakes() {
  const oldStake = stakes[stakeIndex];

  if (bank < 5) {
    stakes = [1, "ALL"];
  } else if (bank < 10) {
    stakes = [1, 2, 5, "ALL"];
  } else if (bank < 25) {
    stakes = [1, 2, 5, 10, "ALL"];
  } else if (bank < 75) {
    stakes = [1, 5, 10, 25, "ALL"];
  } else if (bank < 300) {
    stakes = [5, 10, 25, 50, 75, "ALL"];
  } else if (bank < 750) {
    stakes = [5, 10, 25, 50, 75, 100, "ALL"];
  } else if (bank < 1500) {
    stakes = [10, 25, 50, 75, 100, 250, "ALL"];
  } else if (bank < 3000) {
    stakes = [25, 50, 75, 100, 250, 500, "ALL"];
  } else {
    stakes = [50, 75, 100, 250, 500, 1000, "ALL"];
  }

  if (oldStake === "ALL") {
    stakeIndex = stakes.length - 1;
    return;
  }

  for (let i = 0; i < stakes.length; i++) {
    if (stakes[i] === oldStake) {
      stakeIndex = i;
      return;
    }
  }

  let best = 0;

  for (let i = 0; i < stakes.length; i++) {
    if (stakes[i] !== "ALL" && stakes[i] <= oldStake) {
      best = i;
    }
  }

  stakeIndex = best;
}

function fmt(n) {
  if (n >= 10000) return Math.floor(n / 1000) + "K";
  return "" + n;
}

function center(text) {
  return Math.max(0, Math.floor((20 - text.length) / 2));
}

function clampHeat() {
  if (heat < 0) heat = 0;
  if (heat > 8) heat = 8;
}

function stakeLabel() {
  updateStakes();

  const s = stakes[stakeIndex];
  return s === "ALL" ? "ALL" : "" + s;
}

function stakeValue() {
  updateStakes();

  const s = stakes[stakeIndex];
  return s === "ALL" ? bank : s;
}

function cardSprite(n) {
  return cards[n - 1];
}

function clearType(type) {
  for (const spr of getAll(type)) {
    spr.remove();
  }
}

function clearSprites() {
  const types = [
    spark, chip, skull,
    cherry, lemon, bell, bar, seven,
    num1, num2, num3, num4, num5, num6, num7, num8, num9
  ];

  for (const t of types) {
    clearType(t);
  }
}

function clearTransition() {
  if (transitionTimer !== null) {
    clearTimeout(transitionTimer);
    transitionTimer = null;
  }
}

function stopFx() {
  if (fxTimer !== null) {
    clearInterval(fxTimer);
    fxTimer = null;
  }

  fx = 0;
}

function startFx() {
  stopFx();
  fx = 1;

  fxTimer = setInterval(() => {
    fx++;

    if (fx > 12) {
      stopFx();
    }

    render();
  }, 100);
}

function drawFx() {
  if (fx <= 0) return;

  if (fx % 2 === 0) {
    addSprite(1, 2, spark);
    addSprite(7, 2, spark);
    addSprite(1, 5, spark);
    addSprite(7, 5, spark);
  } else {
    addSprite(2, 2, spark);
    addSprite(6, 2, spark);
    addSprite(2, 5, spark);
    addSprite(6, 5, spark);
  }
}

function drawHud() {
  addText("BANK " + fmt(bank), {
    x: 1,
    y: 1,
    color: color`4`
  });

  addText("BET " + stakeLabel(), {
    x: 13,
    y: 1,
    color: color`3`
  });
}

function drawLobby() {
  clearText();
  clearSprites();

  drawHud();

  addSprite(2, 3, cherry);
  addSprite(3, 3, bar);
  addSprite(4, 3, seven);

  addSprite(7, 3, cardSprite(5));

  addText("A/D BET", {
    x: center("A/D BET"),
    y: 11,
    color: color`6`
  });

  addText("J SLOT", {
    x: 2,
    y: 14,
    color: color`2`
  });

  addText("I CARD", {
    x: 12,
    y: 14,
    color: color`2`
  });
}

function drawSlotSpin() {
  clearText();
  clearSprites();

  drawHud();

  addSprite(3, 3, reels[0]);
  addSprite(4, 3, reels[1]);
  addSprite(5, 3, reels[2]);

  addText("SPIN", {
    x: center("SPIN"),
    y: 12,
    color: color`2`
  });
}

function drawCard() {
  clearText();
  clearSprites();

  drawHud();

  addSprite(4, 3, cardSprite(currentCard));

  addText("NEXT?", {
    x: center("NEXT?"),
    y: 10,
    color: color`2`
  });

  addText("K BACK", {
    x: center("K BACK"),
    y: 12,
    color: color`2`
  });

  addText("A LOW", {
    x: 1,
    y: 14,
    color: color`3`
  });

  addText("D HIGH", {
    x: 13,
    y: 14,
    color: color`3`
  });
}

function drawCardRoll() {
  clearText();
  clearSprites();

  drawHud();

  addSprite(3, 3, cardSprite(currentCard));
  addSprite(6, 3, cardSprite(nextCard));

  addText(guess === "high" ? "HIGH?" : "LOW?", {
    x: center(guess === "high" ? "HIGH?" : "LOW?"),
    y: 10,
    color: color`2`
  });
}

function drawResult() {
  clearText();
  clearSprites();

  drawHud();

  if (resultGood) {
    drawFx();
  }

  if (resultCard > 0) {
    addSprite(4, 3, cardSprite(resultCard));
  } else {
    addSprite(4, 3, resultIcon);
  }

  addText(resultText, {
    x: center(resultText),
    y: 10,
    color: resultGood ? color`6` : color`2`
  });
}

function drawLoss() {
  clearText();
  clearSprites();

  drawHud();

  addSprite(4, 3, skull);

  addText(resultText, {
    x: center(resultText),
    y: 10,
    color: color`3`
  });

  addText("...", {
    x: center("..."),
    y: 12,
    color: color`3`
  });
}

function drawBust() {
  clearText();
  clearSprites();

  addSprite(4, 3, skull);

  addText("BUST", {
    x: center("BUST"),
    y: 10,
    color: color`3`
  });

  addText("K NEW", {
    x: center("K NEW"),
    y: 13,
    color: color`2`
  });
}

function render() {
  if (state === "lobby") drawLobby();
  if (state === "slotSpin") drawSlotSpin();
  if (state === "card") drawCard();
  if (state === "cardRoll") drawCardRoll();
  if (state === "result") drawResult();
  if (state === "loss") drawLoss();
  if (state === "bust") drawBust();
}

function weightedPick(weights) {
  let total = 0;

  for (const w of weights) {
    total += w[1];
  }

  let roll = Math.floor(Math.random() * total);

  for (const w of weights) {
    if (roll < w[1]) return w[0];
    roll -= w[1];
  }

  return weights[0][0];
}

function pressure() {
  const before = bank + lastStake;
  if (before <= 0) return 1;
  return lastStake / before;
}

function spendStake() {
  const stake = stakeValue();
  lastStakeAllIn = stakes[stakeIndex] === "ALL";

  if (stake <= 0 || bank <= 0) {
    state = "bust";
    playTune(bustSfx);
    render();
    return 0;
  }

  if (bank < stake) {
    showLoss("LOW BANK", 1700);
    playTune(loseSfx);
    return 0;
  }

  bank -= stake;
  lastStake = stake;

  return stake;
}

function slotSymbol() {
  const p = pressure();

  if (lastStakeAllIn || p >= 0.65 || heat >= 6 || bank >= 700) {
    return weightedPick([
      [cherry, 43],
      [lemon, 29],
      [bell, 18],
      [bar, 8],
      [seven, 2]
    ]);
  }

  if (p >= 0.3 || heat >= 3 || bank >= 450) {
    return weightedPick([
      [cherry, 37],
      [lemon, 28],
      [bell, 21],
      [bar, 10],
      [seven, 4]
    ]);
  }

  return weightedPick([
    [cherry, 31],
    [lemon, 26],
    [bell, 22],
    [bar, 14],
    [seven, 7]
  ]);
}

function weightedNot(symbol) {
  let s = slotSymbol();
  let tries = 0;

  while (s === symbol && tries < 20) {
    s = slotSymbol();
    tries++;
  }

  return s;
}

function makePairResult(symbol) {
  const out = [symbol, symbol, symbol];
  const position = Math.floor(Math.random() * 3);

  out[position] = weightedNot(symbol);

  return out;
}

function makeSlotResult() {
  const p = pressure();

  let lose = 56;
  let pair = 21;
  let smallTriple = 14;
  let bigTriple = 8;
  let jackpot = 1;

  if (lastStakeAllIn || p >= 0.65 || heat >= 6 || bank >= 700) {
    lose = 65;
    pair = 19;
    smallTriple = 10;
    bigTriple = 5;
    jackpot = 1;
  } else if (p >= 0.3 || heat >= 3 || bank >= 450) {
    lose = 61;
    pair = 20;
    smallTriple = 12;
    bigTriple = 6;
    jackpot = 1;
  }

  const outcome = weightedPick([
    ["lose", lose],
    ["pair", pair],
    ["small", smallTriple],
    ["big", bigTriple],
    ["jackpot", jackpot]
  ]);

  if (outcome === "jackpot") return [seven, seven, seven];

  if (outcome === "big") {
    return Math.random() < 0.55
      ? [bar, bar, bar]
      : [bell, bell, bell];
  }

  if (outcome === "small") {
    return Math.random() < 0.55
      ? [lemon, lemon, lemon]
      : [cherry, cherry, cherry];
  }

  if (outcome === "pair") {
    const symbol = weightedPick([
      [cherry, 48],
      [lemon, 30],
      [bell, 15],
      [bar, 6],
      [seven, 1]
    ]);

    return makePairResult(symbol);
  }

  let a = slotSymbol();
  let b = weightedNot(a);
  let c = weightedNot(b);

  let tries = 0;

  while ((a === b || b === c || a === c) && tries < 20) {
    a = slotSymbol();
    b = weightedNot(a);
    c = weightedNot(b);
    tries++;
  }

  return [a, b, c];
}

function startSlot() {
  if (state !== "lobby") return;

  stopFx();
  clearTransition();

  const stake = spendStake();
  if (stake === 0) return;

  state = "slotSpin";
  tick = 0;

  finalReels = makeSlotResult();

  playTune(spinSfx);
  render();

  spinTimer = setInterval(() => {
    tick++;

    if (tick % 4 === 0) {
      playTune(tickSfx);
    }

    reels[0] = tick < 10 ? slotSymbol() : finalReels[0];
    reels[1] = tick < 20 ? slotSymbol() : finalReels[1];
    reels[2] = tick < 30 ? slotSymbol() : finalReels[2];

    render();

    if (tick >= 30) {
      finishSlot();
    }
  }, 65);
}

function finishSlot() {
  clearInterval(spinTimer);
  spinTimer = null;

  reels = finalReels;
  scoreSlot();
  render();
}

function scoreSlot() {
  const a = reels[0];
  const b = reels[1];
  const c = reels[2];

  if (a === seven && b === seven && c === seven) {
    payWin(lastStake * 40, "777 +" + fmt(lastStake * 40), seven, 0, true);
    heat += 3;
    clampHeat();
    playTune(bigWinSfx);
    return;
  }

  if (a === bar && b === bar && c === bar) {
    payWin(lastStake * 15, "BAR +" + fmt(lastStake * 15), bar, 0, true);
    heat += 2;
    clampHeat();
    playTune(bigWinSfx);
    return;
  }

  if (a === bell && b === bell && c === bell) {
    payWin(lastStake * 8, "BELL +" + fmt(lastStake * 8), bell, 0, true);
    heat += 2;
    clampHeat();
    playTune(winSfx);
    return;
  }

  if (a === lemon && b === lemon && c === lemon) {
    payWin(lastStake * 4, "WIN +" + fmt(lastStake * 4), lemon, 0, false);
    heat += 1;
    clampHeat();
    playTune(winSfx);
    return;
  }

  if (a === cherry && b === cherry && c === cherry) {
    payWin(lastStake * 2, "WIN +" + fmt(lastStake * 2), cherry, 0, false);
    heat += 1;
    clampHeat();
    playTune(winSfx);
    return;
  }

  if (a === b || b === c || a === c) {
    const refund = Math.floor(lastStake * 0.5);
    bank += refund;
    resultIcon = chip;
    resultCard = 0;
    showResult("PAIR +" + refund, false, 1100);
    playTune(tickSfx);
    return;
  }

  heat -= 1;
  clampHeat();

  if (bank <= 0) {
    state = "bust";
    playTune(bustSfx);
    return;
  }

  showLoss("LOSS", 1900);
  playTune(loseSfx);
}

function startCard() {
  if (state !== "lobby") return;

  stopFx();
  clearTransition();

  currentCard = 3 + Math.floor(Math.random() * 5);
  state = "card";

  playTune(betSfx);
  render();
}

function cardPayoutMultiplier(choice) {
  let winningNumbers = 0;

  if (choice === "high") {
    winningNumbers = 9 - currentCard;
  } else {
    winningNumbers = currentCard - 1;
  }

  let mult = 8 / winningNumbers * 0.78;

  if (mult < 1.08) mult = 1.08;
  if (mult > 4.75) mult = 4.75;

  mult -= heat * 0.035;

  if (lastStakeAllIn) {
    mult -= 0.2;
  }

  if (mult < 1.02) mult = 1.02;

  return mult;
}

function guessCard(choice) {
  if (state !== "card") return;

  const stake = spendStake();
  if (stake === 0) return;

  guess = choice;
  nextCard = 1 + Math.floor(Math.random() * 9);

  state = "cardRoll";
  playTune(spinSfx);
  render();

  transitionTimer = setTimeout(() => {
    const won =
      choice === "high"
        ? nextCard > currentCard
        : nextCard < currentCard;

    if (won) {
      const payout = Math.floor(stake * cardPayoutMultiplier(choice));
      bank += payout;
      heat += 1;
      clampHeat();

      payWin(0, "WIN +" + payout, chip, nextCard, false);
      playTune(winSfx);
    } else {
      heat -= 1;
      clampHeat();

      if (bank <= 0) {
        state = "bust";
        playTune(bustSfx);
        render();
      } else if (nextCard === currentCard) {
        showLoss("TIE LOSS", 2100);
        playTune(loseSfx);
      } else {
        showLoss("LOSS", 1900);
        playTune(loseSfx);
      }
    }
  }, 900);
}

function payWin(amount, text, icon, cardValue, big) {
  bank += amount;
  resultIcon = icon;
  resultCard = cardValue;

  showResult(text, true, big ? 1500 : 1200);
}

function showResult(text, good, delay) {
  clearTransition();

  state = "result";
  resultText = text;
  resultGood = good;

  if (good) {
    startFx();
  } else {
    stopFx();
  }

  render();

  transitionTimer = setTimeout(() => {
    stopFx();

    if (state === "result") {
      state = bank <= 0 ? "bust" : "lobby";
      render();
    }
  }, delay);
}

function showLoss(text, delay) {
  clearTransition();
  stopFx();

  state = "loss";
  resultText = text;
  resultGood = false;
  resultCard = 0;

  render();

  transitionTimer = setTimeout(() => {
    if (state === "loss") {
      state = bank <= 0 ? "bust" : "lobby";
      render();
    }
  }, delay);
}

function nextStake() {
  if (state !== "lobby") return;

  updateStakes();

  stakeIndex++;

  if (stakeIndex >= stakes.length) {
    stakeIndex = 0;
  }

  playTune(tickSfx);
  render();
}

function prevStake() {
  if (state !== "lobby") return;

  updateStakes();

  stakeIndex--;

  if (stakeIndex < 0) {
    stakeIndex = stakes.length - 1;
  }

  playTune(tickSfx);
  render();
}

function newGame() {
  if (spinTimer !== null) {
    clearInterval(spinTimer);
    spinTimer = null;
  }

  clearTransition();
  stopFx();

  bank = 150;
  stakeIndex = 1;
  updateStakes();

  state = "lobby";

  reels = [cherry, lemon, seven];
  finalReels = [cherry, lemon, seven];

  currentCard = 5;
  nextCard = 5;
  guess = "";

  tick = 0;
  lastStake = 0;
  lastStakeAllIn = false;
  heat = 0;
  fx = 0;
  resultText = "";
  resultGood = false;
  resultIcon = chip;
  resultCard = 0;

  setMap(blankMap);
  playTune(betSfx);
  render();
}

onInput("a", () => {
  if (state === "card") {
    guessCard("low");
  } else {
    prevStake();
  }
});

onInput("d", () => {
  if (state === "card") {
    guessCard("high");
  } else {
    nextStake();
  }
});

onInput("j", () => {
  if (state === "lobby") {
    startSlot();
  }
});

onInput("i", () => {
  if (state === "lobby") {
    startCard();
  }
});

onInput("k", () => {
  if (state === "card") {
    state = "lobby";
    playTune(betSfx);
    render();
  } else if (state === "bust") {
    newGame();
  }
});

updateStakes();
render();