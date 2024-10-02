/*
@title: Chase Escape
@author: Edward Hsing
@tags: ['action']
@addedOn: 2024-04-15
*/
const player = "p";
const eat = "e";
const sky = "s";
const welcomesound = tune`
120,
120: C4^120,
120: D4^120,
120: E4^120,
120: F4^120,
120: G4^120,
120: G4^120,
120: G4^120,
120: G4^120,
120: A4^120,
120: A4^120,
120: A4^120,
120: G4^120,
120: G4^120,
120: F4^120,
120: F4^120,
120: F4^120,
120: F4^120,
120: E4^120,
120: E4^120,
120: E4^120,
120: E4^120,
120: D4^120,
120: D4^120,
120: D4^120,
120: D4^120,
120: C4^120,
120: C4^120,
120: C4^120,
120: C4^120,
240`
const startsound = tune`
56.28517823639775: C4-56.28517823639775,
56.28517823639775: D4-56.28517823639775,
56.28517823639775: C4-56.28517823639775,
56.28517823639775: D4-56.28517823639775,
56.28517823639775: E4-56.28517823639775,
56.28517823639775: D4-56.28517823639775 + F4-56.28517823639775,
1463.4146341463415` 
const oversound = tune`
65.78947368421052: F5^65.78947368421052 + E5/65.78947368421052,
65.78947368421052: E5^65.78947368421052 + D5/65.78947368421052,
65.78947368421052: D5^65.78947368421052 + C5/65.78947368421052,
65.78947368421052: C5^65.78947368421052 + B4/65.78947368421052,
65.78947368421052: B4^65.78947368421052 + A4/65.78947368421052,
65.78947368421052: A4^65.78947368421052 + G4/65.78947368421052,
65.78947368421052: G4^65.78947368421052 + F4/65.78947368421052,
65.78947368421052: F4^65.78947368421052 + E4/65.78947368421052,
65.78947368421052: E4^65.78947368421052 + D4/65.78947368421052,
65.78947368421052: D4^65.78947368421052 + C4/65.78947368421052,
1447.3684210526314`
const click = tune`
56.074766355140184: E5/56.074766355140184 + D5-56.074766355140184,
1738.3177570093458`
setBackground('s');


setLegend(
  [ player, bitmap`
................
................
....0L0L0L0.....
....0000000.....
....0111110.....
....0171170.....
....0111110.....
....0116610.....
....0000000.....
.....04640......
.....03930......
.....03930......
.....04640......
.....00000......
......0.0.......
......0.0.......` ],
  [ eat, bitmap`
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
................
................
................
................` ],
  [ sky, bitmap`
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
7777777777777777`]
);
setSolids([]);

let level = 0;
const levels = [
  map`
.p.`
];

setMap(levels[level]);

setPushables({
  [ player ]: [],
  [ eat ]: []
});

let difficultySelected = false;
let playwelcomesound = true;
const welcomesoundplay = playTune(welcomesound, Infinity);

const texts = [
  "Press J: Easy Mode",
  "Press I: Medium",
  "Press K: difficulty"
];

function showText(index) {
  addText(texts[index]);
  if (index < texts.length - 1) {
    setTimeout(() => {
      clearText();
      showText((index + 1) % texts.length);
    }, 2000);
  } else {
    setTimeout(() => {
      clearText();
    }, 3000); //wait 5
  }
}

showText(0);
// difficultySelected
onInput("j", () => { // easy
  clearText()
  if (!difficultySelected) {
    welcomesoundplay.end()
    clearInterval(timer);
    interval = 700;
    difficultySelected = true;
    startGame();
  }
});

onInput("i", () => { // medium
  clearText()
  if (!difficultySelected) {
    welcomesoundplay.end()
    clearInterval(timer);
    interval = 500;
    difficultySelected = true;
    startGame();
  }
});

onInput("k", () => { // difficulty
  clearText()
  if (!difficultySelected) {
    welcomesoundplay.end()
    clearInterval(timer);
    interval = 200;
    difficultySelected = true;
    startGame();
  }
});


let timer;

function startGame() {
  playTune(startsound);
  clearText();
  addText("Game Started", {color: color`3`});

  // create
  const player = "p";
  const eat = "e";

  setLegend(
    [ player, bitmap`
  ................
  ................
  ....0L0L0L0.....
  ....0000000.....
  ....0111110.....
  ....0171170.....
  ....0111110.....
  ....0116610.....
  ....0000000.....
  .....04640......
  .....03930......
  .....03930......
  .....04640......
  .....00000......
  ......0.0.......
  ......0.0.......` ],
    [ eat, bitmap`
................
....99999999....
..999999999999..
.99999999999999.
.99DDD999DDD999.
999D0D999D0D9999
999DDD999DDD9999
9999999999999999
9999999999999999
9999922222999999
9999929992999999
99999299C2999999
.99992222299999.
.9999999C999999.
..999999C99999..
....9999C999....` ]
  );

  setSolids([]);

  let level = 0;
  const levels = [
    map`
...........
...........
...........
.....e.....
...........
...........
..........p`
  ];

  setMap(levels[level]);

  setPushables({
    [ player ]: [],
    [ eat ]: []
  });

  // start timer
  timer = setInterval(() => {
    const playerSprite = getFirst(player);
    const eatSprite = getFirst(eat);
    
    let dx = playerSprite.x - eatSprite.x;
    let dy = playerSprite.y - eatSprite.y;
    
    if (dx !== 0) {
      dx = dx > 0 ? 1 : -1;
    }
    if (dy !== 0) {
      dy = dy > 0 ? 1 : -1;
    }
    
    eatSprite.x += dx;
    eatSprite.y += dy;
    
    if (playerSprite.x === eatSprite.x && playerSprite.y === eatSprite.y) {
      clearText();
      playTune(oversound);
      addText("Game Over");
      clearInterval(timer);
      afterInput(() => {});
    }
  }, interval);

  onInput("s", () => {
    playTune(click);
    getFirst(player).y += 1; //down
  });

  onInput("w", () => {
    playTune(click);
    getFirst(player).y -= 1; //up
  });

  onInput("a", () => {
    playTune(click);
    getFirst(player).x -= 1; //left
  });

  onInput("d", () => {
    playTune(click);
    getFirst(player).x += 1; //right
  });
}
