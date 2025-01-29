/*
@title: the real football
@author: nikhil
@tags: ['sports']
@addedOn: 2024-07-08
*/

const player = "p";
const ball = "b";
const goalpost = "g";
const hurdle = "w";
const grass = "l";
const bounds = "e";

//legend
setLegend(
  [ player, bitmap`
444444CCC4444444
4444CCCCCC444444
4444CCCC2CC44444
4444C2020CC44444
4444422222CC4444
4444442224444444
4444777777444444
4444777777444444
4444277772444444
4444277772444444
4444155551444444
4444455554444444
4444424424444444
4444424424444444
44444L44L4444444
44444LL4LL444444`],
  [ ball, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444440004444444
444400L2L0044444
4440LLL222204444
4440LLL2LL204444
44022222LL220444
44022222LL2L0444
440LLL22222L0444
4440LL2222204444
4440222LLL204444
4444002LL0044444
4444440004444444
4444444444444444
4444444444444444`],
  [ goalpost, bitmap`
4000004444444444
40LLL00444444444
40000L0444444444
44440L0444444444
44440L0444444444
44440L0444444444
44440L0444444444
44440L0444444444
44440L0444444444
44440L0444444444
44440L0444444444
44440L0444444444
44440L0444444444
40000L0444444444
40LLL00444444444
4000004444444444`],
  [ hurdle, bitmap`
4444440L04444444
4444410L01444444
4444410L01444444
4444110L01144444
4444410L01444444
4444110L01144444
4444410L01444444
4444110L01144444
4444410L01444444
4444110L01144444
4444410L01444444
4444110L01144444
4444410L01444444
4444110L01144444
4444410L01444444
4444440L04444444`],
  [ grass, bitmap`
4444444444444444
44444444D44444D4
4444444444444444
4444444444444444
444D444444444444
4444444444444444
4444444444444444
4444444D44444444
D44444444444D444
4444444444444444
4444444444444444
444D444444444444
4444444444444444
444444444D4444D4
4444444444444444
4444D44444444444`],
  [ bounds, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDD4DDDDD
DDD4DDDDD4DDDDD4
DD4DDDDDDDDDDD4D
DDDDDDDDDDDDDDDD
DDDDDD4DDDDDDDDD
DDDDD4DDDDD4DDDD
4DDDDDDDDD4DDDD4
DDDDDDDDDDDDDD4D
DDD4DDDDDDDDDDDD
DD4DDDDD4DDDDDDD
DDDDDDD4DDDDDDDD
DDDDDDDDDDDD4DDD
DDDDDDDDDDD4DDDD
DDDD4DDDDDDDDDDD
DDD4DDDDDDDDDDDD`]
);


// levels
let level = 0; 
const levels = [
  map`
eeeeeeee
eeeeeeee
epblllge
eeeeeeee
eeeeeeee`,
  map`
eeeeeeeeeeeeee
elllwllwlwlwle
elllwllwlwlwle
ellllllwlllwle
epblllllllllge
elllwllllwlwle
elllwllwlwlwle
elllwllwlwllle
eeeeeeeeeeeeee`,
  map`
eeeeeeeeeeeeeeee
elllwlwlwlllwlle
elllwlwlllllwlle
elllwlllllwlwlle
elllwlwlwlllllge
epblwlwlwlllwlle
elllwlwlwlllwlle
elllllllwlllwlle
elllwlllwlllwlle
eeeeeeeeeeeeeeee`,
  map`
eeeeeeeeeeeeeeeeee
elllwlllwlwlwlwlle
elllwlwlwlwlwlwlle
elllllllwlwlllwlle
epblwlwlwlwlwlwlle
elllwlwlllllllwlle
elllllllllwlwlwlle
elllllwlwlwlllllge
elllwlwlllwlwlwlle
eeeeeeeeeeeeeeeeee`,
  map`
eeeeeeeeeeeeeeeeeee
ellllwlwlwlwlwlwlle
elpblllwlllwlllllle
ellllllllwlllllwlle
ellllwlwlwlwlwlwlle
ellllwlllllwlwlwlle
ellllwlwlwlwlwlwlle
ellllllllwlwlwlllge
ellllwlllllllllwlle
ellllwlwlwlllwlwlle
eeeeeeeeeeeeeeeeeee`,
  map`
eeeeeeeeeeeeeeeeee
elllwlllllwlllwlle
elllllwlwlllllllle
elllwlwlllllwlwlle
epblllllwlwlwlwlle
elllwlwlwlwlllllle
elllllwlwlllwlllge
elllllllllwlwlwlle
elllwlwlllwlllwlle
eeeeeeeeeeeeeeeeee`,
];

// tunes
const tunes = {
  start: tune`
156.25,
156.25: G5^156.25 + F5^156.25 + E5^156.25 + D5^156.25 + C5^156.25,
156.25: C5^156.25 + D5^156.25 + E5^156.25 + F5^156.25 + G5^156.25,
156.25,
156.25: D5^156.25 + C5^156.25 + B4^156.25 + A4^156.25 + G4^156.25,
156.25: G4^156.25 + A4^156.25 + B4^156.25 + C5^156.25 + D5^156.25,
156.25,
156.25: F5^156.25 + E5^156.25,
156.25: E5^156.25 + F5^156.25,
156.25: E5^156.25 + F5^156.25 + G5/156.25,
156.25: G5/156.25 + A5/156.25,
156.25: A5/156.25 + G5/156.25 + F5/156.25 + E5/156.25 + D5/156.25,
156.25: E5/156.25 + D5/156.25,
156.25: D5/156.25 + C5/156.25,
2812.5`,
  reset: tune`
149.2537313432836,
149.2537313432836: F5^149.2537313432836 + E5^149.2537313432836 + D5^149.2537313432836 + C5^149.2537313432836 + B4^149.2537313432836,
149.2537313432836,
149.2537313432836: G4^149.2537313432836 + F4^149.2537313432836 + E4^149.2537313432836 + D4^149.2537313432836,
149.2537313432836: G4/149.2537313432836 + F4/149.2537313432836 + E4/149.2537313432836 + D4/149.2537313432836,
4029.850746268657`,
  background: tune`
218.97810218978103: B4-218.97810218978103 + A4-218.97810218978103 + G4-218.97810218978103 + F4-218.97810218978103 + A5-218.97810218978103,
218.97810218978103: B4-218.97810218978103 + C5~218.97810218978103 + A5~218.97810218978103 + G5~218.97810218978103 + F5~218.97810218978103,
218.97810218978103: D4-218.97810218978103 + E4-218.97810218978103 + F4-218.97810218978103 + G4-218.97810218978103 + A4-218.97810218978103,
218.97810218978103: C4-218.97810218978103 + G5^218.97810218978103 + G4-218.97810218978103,
218.97810218978103: A5-218.97810218978103 + G5-218.97810218978103 + F5-218.97810218978103 + C5~218.97810218978103 + G4-218.97810218978103,
218.97810218978103: B5-218.97810218978103 + F5~218.97810218978103 + G5~218.97810218978103 + C4^218.97810218978103,
218.97810218978103: A5~218.97810218978103 + C4^218.97810218978103,
218.97810218978103: D4-218.97810218978103 + E4-218.97810218978103 + F4-218.97810218978103 + G4-218.97810218978103 + A4-218.97810218978103,
218.97810218978103: B4-218.97810218978103 + C4^218.97810218978103 + G4-218.97810218978103,
218.97810218978103: E5-218.97810218978103 + C5~218.97810218978103 + G4-218.97810218978103,
218.97810218978103: A5-218.97810218978103 + G5-218.97810218978103 + F5-218.97810218978103,
218.97810218978103: G5~218.97810218978103 + F5~218.97810218978103,
218.97810218978103: D4-218.97810218978103 + C5~218.97810218978103 + A5~218.97810218978103,
218.97810218978103: E4-218.97810218978103 + F4-218.97810218978103 + G4-218.97810218978103 + A4-218.97810218978103 + B4-218.97810218978103,
218.97810218978103: D4^218.97810218978103 + G4-218.97810218978103,
218.97810218978103: G5-218.97810218978103 + F5-218.97810218978103 + E5-218.97810218978103 + D5-218.97810218978103 + C4^218.97810218978103,
218.97810218978103: A5-218.97810218978103 + C5~218.97810218978103 + G5~218.97810218978103 + F5~218.97810218978103,
218.97810218978103: A5~218.97810218978103,
218.97810218978103: E4-218.97810218978103,
218.97810218978103: E4-218.97810218978103 + F4-218.97810218978103 + G4-218.97810218978103 + A4-218.97810218978103 + B4-218.97810218978103,
218.97810218978103: E5-218.97810218978103 + F5-218.97810218978103 + G5-218.97810218978103 + C5~218.97810218978103 + D4^218.97810218978103,
218.97810218978103: A5-218.97810218978103 + B5-218.97810218978103 + G5-218.97810218978103 + F5-218.97810218978103 + C4^218.97810218978103,
218.97810218978103: F5~218.97810218978103 + G5~218.97810218978103 + D4^218.97810218978103,
218.97810218978103: F5-218.97810218978103 + A5~218.97810218978103,
218.97810218978103: C5~218.97810218978103 + D4^218.97810218978103,
218.97810218978103: E4-218.97810218978103 + F4-218.97810218978103 + G4-218.97810218978103 + A4-218.97810218978103 + B4-218.97810218978103,
218.97810218978103: E5-218.97810218978103 + C4^218.97810218978103 + G4-218.97810218978103,
218.97810218978103: B5-218.97810218978103 + A5-218.97810218978103 + G5-218.97810218978103 + F5-218.97810218978103 + E5-218.97810218978103,
218.97810218978103: F5~218.97810218978103 + G5~218.97810218978103,
218.97810218978103: C5~218.97810218978103 + A5~218.97810218978103 + D4^218.97810218978103,
218.97810218978103: E4-218.97810218978103 + F4-218.97810218978103 + G4-218.97810218978103 + A4-218.97810218978103 + B4-218.97810218978103,
218.97810218978103: C5-218.97810218978103 + G4-218.97810218978103`,
};

// plays start tune
playTune(tunes.start)

// default background
setBackground(grass)

const currentLevel = levels[level];

// text
setMap(currentLevel);
addText("The Real Football", { y: 2, color: color`2` })
addText("Dodge the hurdles", { y: 4, color: color`8` });
addText("And score goals", { y: 5, color: color`8` });
addText("use w a s d to move", { y: 10, color: color`9` });
addText("Press j to reset", { y: 11, color: color`9` });
afterInput(() => {
  clearText();
  const numberCovered = tilesWith(player, ball).length;
})

// mech 1 - timer
let timer = 500;

// Timer display
let timerText = addText("", { x: 1, y: 1, color: color`1` });

// timer updater
setInterval(() => {
    if (timerText) {
        timerText.remove();
    }
    timerText = addText(`Time: ${timer}`, { x: 5, y: 0, color: color`9` });
    
    if (timer <= 0) {
        addText("Time's up! You lose", { y: 4, color: color`3` });
        playTune(tunes.reset);
    }
    
    timer--;
}, 1000); 

// goalpost modifier
afterInput(() => {
    const targetNumber = tilesWith(goalpost).length;
    const numberCovered = tilesWith(goalpost, ball).length;
  
    // goalpost checker
    if (numberCovered === targetNumber && timer > 0) {
        level = level + 1;
        const currentLevel = levels[level];
  
        // Game completion check
        if (currentLevel !== undefined) {
            setMap(currentLevel);
        }
    }
});

// makes sprite solid
setSolids([ player, ball, hurdle, bounds]); 

// movement of player
onInput("s", () => {
  getFirst(player).y += 1; 
  });

onInput("d", () => {
  getFirst(player).x += 1;
  });

onInput("w", () => {
    getFirst(player).y -= 1;
    });

onInput("a", () => {
    getFirst(player).x -= 1;
    });

onInput("s", () => {
    getFirst(player).y += 1;
    });



// reset button
onInput("j", () => {
  const currentLevel = levels[level];
  playTune(tunes.reset)
if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
 }
});

// for ball
setPushables({
  [player]: [ ball ],
});

// goal func.
afterInput(() => {
  const targetNumber = tilesWith(goalpost).length;
  const numberCovered = tilesWith(goalpost, ball).length;

  // goal text
  if (numberCovered === targetNumber) {
   addText("Goal!", { y: 4, color: color`2` });
   playTune(tunes.reset)
    level = level + 1;
    const currentLevel = levels[level];

    // game end text
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("Game Over!", { y: 4, color: color`3` });
      addText("Thanks for playing", { y: 6, color: color`3` });
      playTune(tunes.background, Infinity)
    }
  }
});
