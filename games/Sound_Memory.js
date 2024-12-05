/*
@title: Sound Memory
@author: meronemo
@tags: ["memory" , "timed" , "music"]
@addedOn: 2024-07-28
Sound Memory
Listen and memorize the order of the sound playing.
After the tunes are all played, press the key in the same order.
Red-W, Yellow-A, Green-S, Blue-D

*/

const boxa = "a";
const boxb = "b";
const boxc = "c";
const boxd = "d";
const sela = "q";
const selb = "w";
const selc = "e";
const seld = "r";

setLegend(
  [boxa, bitmap`
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
  [boxb, bitmap`
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
  [boxc, bitmap`
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
  [boxd, bitmap`
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
  [sela, bitmap`
3333333333333333
3333333333333333
3333333333333333
3303333333333033
3330333333330333
3330333333330333
3333033333303333
3333033333303333
3333303333033333
3333303333033333
3333330330333333
3333330330333333
3333333003333333
3333333333333333
3333333333333333
3333333333333333`],
  [selb, bitmap`
6666666666666666
6666666666666666
6666666666666666
6606666666666066
6660666666660666
6660666666660666
6666066666606666
6666066666606666
6666606666066666
6666606666066666
6666660660666666
6666660660666666
6666666006666666
6666666666666666
6666666666666666
6666666666666666`],
  [selc, bitmap`
4444444444444444
4444444444444444
4444444444444444
4404444444444044
4440444444440444
4440444444440444
4444044444404444
4444044444404444
4444404444044444
4444404444044444
4444440440444444
4444440440444444
4444444004444444
4444444444444444
4444444444444444
4444444444444444`],
  [seld, bitmap`
7777777777777777
7777777777777777
7777777777777777
7707777777777077
7770777777770777
7770777777770777
7777077777707777
7777077777707777
7777707777077777
7777707777077777
7777770770777777
7777770770777777
7777777007777777
7777777777777777
7777777777777777
7777777777777777`],
);

const level = map`
.a.
b.d
.c.`;
setMap(level);

let sound = [];
let round = 0;
let getKey = 0;
let pressed = 0;
let count = 0;
let gameover = 0;

const sounda = tune`
500: B5-500,
15500`;
const soundb = tune`
500: E5-500,
15500`;
const soundc = tune`
500: G4-500,
15500`;
const soundd = tune`
500: C4-500,
15500`;
const over = tune`
76.92307692307692: B5-76.92307692307692,
76.92307692307692: G5-76.92307692307692,
76.92307692307692: F5-76.92307692307692,
76.92307692307692: D5-76.92307692307692,
76.92307692307692: C5-76.92307692307692,
76.92307692307692: A4-76.92307692307692,
76.92307692307692: G4-76.92307692307692,
76.92307692307692: E4-76.92307692307692,
76.92307692307692: D4-76.92307692307692,
76.92307692307692: C4-76.92307692307692,
76.92307692307692: C4-76.92307692307692,
76.92307692307692: C4-76.92307692307692,
76.92307692307692: C4-76.92307692307692,
1461.5384615384614`;

onInput("w", () => {
  pressed = 1;
});

onInput("a", () => {
  pressed = 2;
});

onInput("s", () => {
  pressed = 3;
});

onInput("d", () => {
  pressed = 4;
});

async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, ms);
  });
}

function clear() {
  if (getFirst(sela)) getFirst(sela).type = boxa;
  if (getFirst(selb)) getFirst(selb).type = boxb;
  if (getFirst(selc)) getFirst(selc).type = boxc;
  if (getFirst(seld)) getFirst(seld).type = boxd;
}

async function nextRound() {
  round += 1;
  getKey = 0;
  
  const random = Math.floor(Math.random() * 4) + 1;
  sound.push(random);
  console.log(sound);
  
  clearText();
  addText("R" + String(round), { y: 7, color: color`0` });
  addText("Listen", { y: 8, color: color`0` });
  
  for (let i=0; i<sound.length; i++) {
    await sleep(300);
    if (sound[i] === 1) {
      playTune(sounda);
      getFirst(boxa).type = sela;
    } else if (sound[i] === 2) {
      playTune(soundb);
      getFirst(boxb).type = selb;
    } else if (sound[i] === 3) {
      playTune(soundc);
      getFirst(boxc).type = selc;
    } else if (sound[i] === 4) {
      playTune(soundd);
      getFirst(boxd).type = seld;
    }
    await sleep(300);
    clear();
  }
  
  await sleep(100);

  clearText();
  addText("R" + String(round), { y: 7, color: color`0` });
  addText("Repeat", { y: 8, color: color`0` });
  clear();
  getKey = 1;
}

async function gameOver() {
  getKey = 0;
  playTune(over);
  for (let i=0; i<=2; i++) {
    for (let j=0; j<=2; j++) {
      clearTile(i, j);
    }
  }
  clearText();
  addText("GAME OVER", { y: 6, color: color`3` });
  addText("Round: " + String(round), { y: 7, color: color`0` });
  addText("Press any key", { y: 9, color: color`0` });
  addText("to play again", { y: 10, color: color`0` });
  await sleep(500);
  gameover = 1;
}

async function checkKey() {
  if (gameover) {
    round = 0;
    count = 0;
    gameover = 0;
    sound = [];
    setMap(level);
    nextRound();
  }
  if (!getKey) return;

  if (pressed === 1) {
    playTune(sounda);
    getFirst(boxa).type = sela;
    await sleep(100);
    getFirst(sela).type = boxa;
  } else if (pressed === 2) {
    playTune(soundb);
    getFirst(boxb).type = selb;
    await sleep(100);
    getFirst(selb).type = boxb;
  } else if (pressed === 3) {
    playTune(soundc);
    getFirst(boxc).type = selc;
    await sleep(100);
    getFirst(selc).type = boxc;
  } else if (pressed === 4) {
    playTune(soundd);
    getFirst(boxd).type = seld;
    await sleep(100);
    getFirst(seld).type = boxd;
  }
  
  if (sound[count] !== pressed) {
    gameOver();
  } else if (count === sound.length - 1) {
    getKey = 0;
    clearText();
    addText("R" + String(round), { y: 7, color: color`0` });
    addText("Great!", { y: 8, color: color`4` });
    await sleep(1000);
    count = 0;
    nextRound();
  } else {
    count += 1;
  }
}

afterInput(() => checkKey());

nextRound();
