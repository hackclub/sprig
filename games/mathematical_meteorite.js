/*
@title: mathematical_meteorite
@author: Arash
@tags: ['puzzle']
@addedOn: 2023-02-23

There's a special meteorite falling that only seems to care about 
special mathematical campfires! Guide the meteorite to the right 
campfire and save the world from this peculiar meteorite.

Use "a" and "d" to guide the meteorite left and right, or "i" to 
start a new round.
*/

const meteorite = "m";
const campfire = "f";
const grass = "g";
const grassEnd = "e";
const sky1 = "a";
const sky2 = "b";
const sky3 = "c";
const sky4 = "d";
let losses = 0,
  wins = 0,
  limit = 3;
let interval;

setLegend(
  [
    meteorite,
    bitmap`
..6666666666....
.699933333396...
.9333111111396..
.31111LLLL11396.
.11LLLLLLLL1339.
.1LLLLLLLLL1113.
.1LLLLLLLLLLL11.
.1LLLLLLLLLLLL1.
.1LLLLLLLLLLLL1.
.1LLLLLLLLLLLL1.
.1LLLLLLLLLLLL1.
.1LLLLLLLLLLLL1.
.1LLLLLLLLLLL11.
.1LLLLLLLLLLL1..
.11LLLLLLLLLL1..
..111111111111..`,
  ],
  [
    campfire,
    bitmap`
4444444444444444
4444444449944444
44D4444449994444
4D4D444496694444
44444499966999D4
444449966666699D
4444996663666694
4444966633366694
4449966336366994
4449666366366944
4449666366366944
44D9666366399944
4D4D999999994D44
4CCCCCCCCCCCCCC4
4CCCCCCCCCCCCCC4
4444444444444444`,
  ],
  [
    grass,
    bitmap`
4444444444444444
44D444444444D444
4D4D4444444D4D44
4444444444444444
444444D444444444
44444D4D44444444
4444444444444444
4444444444444444
44444444444D4444
4444444444D4D444
4444444444444444
4444444444444444
44D4444444444444
4D4D44444444D444
44444444444D4D44
4444444444444444`,
  ],
  [
    grassEnd,
    bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
LLLLLLLLLLLLLLLL
1111111111111111
DDDDDDDDDDDDDDDD
44444444444D4444
4444444444D4D444
4444444444444444
4444444444444444
44D4444444444444
4D4D44444444D444
44444444444D4D44
4444444444444444`,
  ],
  [
    sky1,
    bitmap`
0000000000000000
0000000000000000
0002000000000000
0000000000000000
0000000000000000
000000000000L000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0001000000000000
0000000000000000
0000000000000200
0000000000000000
0000000000000000`,
  ],
  [
    sky2,
    bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000002000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0002000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`,
  ],
  [
    sky3,
    bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
00000L0000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000020000000000
0000000000000000
0000000000000000
0000000000010000
0000000000000000
0000000000000000
0000000000000000`,
  ],
  [
    sky4,
    bitmap`
0000000000000000
0000000000000000
0000000000002000
0000000000000000
0000000020000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000L00000000000
0000000000000000
0000000100000000
0000000000000000
0000000000000000`,
  ]
);

const level = map`
cacabcc
dacabab
adcabca
bbacdaa
acabaac
ccaaadd
eeeeeee
gfgfgfg
ggggggg`;
setMap(level);
setBackground(sky2);

// Concludes an iteration of a game by displaying the player's performance and prompting them 
// to start the game again
const endGame = (condition) => {
  clearText();

  let message;
  switch (condition) {
    case "win":
      message = "You win!";
      break;
    case "loss":
      message = "You lose!";
      break;
  }

  addText(message, { x: 5, y: 1, color: color`2` });
  addText(`Wins:   ${wins}`, { x: 5, y: 3, color: color`1` });
  addText(`Losses: ${losses}`, { x: 5, y: 4, color: color`1` });
  addText("Press i to replay", { x: 1, y: 6, color: `1` });
};

// Resets the number of wins and losses and destroys any meteorites, effectively 
// restoring the map to its pre-loaded form
const resetRound = () => {
  wins = 0;
  losses = 0;
  getAll(meteorite);
}

// Concludes a round of a game based on the given condition (should be "win" or "loss")
const endRound = (condition) => {
  clearText();

  let message;
  switch (condition) {
    case "win":
      wins += 1;
      // Checks if there are enough wins to warrant a win for the entire game
      if (wins === limit) {
        endGame("win");
        return;
      }

      message = "Good job!";
      break;
    case "loss":
      losses += 1;
      // Checks if there are enough losses to warrant a loss for the entire game
      if (losses === limit) {
        endGame("loss");
        return;
      }

      message = "Try again!";
      break;
  }

  addText(message, { x: 5, y: 1, color: color`2` });
  setTimeout(() => {
    beginRound();
  }, 3000);
};

// Checks if (a) a meteorite has fallen into a campfire, and if so, then (b) whether the 
// campfire is the right one
const check = (answer, answers) => {
  const overlappingTiles = tilesWith(meteorite, campfire);
  if (getFirst(meteorite) === undefined) {
    return;
  }

  // Checks if the meteorite has reached the bottom of the screen, in which an automatic loss 
  // is warranted. Otherwise, checks if there exists a tile where both the meteorite and 
  // campfire exist together (i.e., a collision)
  if (getFirst(meteorite).y === 8) {
    getFirst(meteorite).remove();
    endRound("loss");
  } else if (overlappingTiles.length === 1) {
    getFirst(meteorite).remove();

    // Gets the x positions of all the campfires and the index of the selected campfire relative 
    // to the order of the campfires. The index can be used to determine the user-selected answer 
    // as the index of the answer in the answers array corresponds to the index of the campfire
    const campfiresIndexes = tilesWith(campfire).map((cf) => cf[0].x);
    const selectedCampfireIndex = campfiresIndexes.indexOf(
      overlappingTiles[0][1].x
    );
    const selectedAnswer = answers[selectedCampfireIndex];
    if (selectedAnswer === answer) {
      endRound("win");
    } else {
      endRound("loss");
    }
  }
};

// Starts a new round by clearing the screen's text, adding a meteorite, and generating a new
// mathematical equation
const beginRound = () => {
  clearText();
  clearInterval(interval);
  addSprite(Math.round(Math.random() * 6), 0, meteorite);

  // Generates the mathematical equation to compute and the right answer
  // If the operator is multiplication, then the numbers are limited to 10 to keep things simple
  const operator = ["+", "-", "*"][Math.round(Math.random() * 2)],
    n1 = Math.round(Math.random() * (operator == "*" ? 10 : 20)),
    n2 = Math.round(Math.random() * (operator == "*" ? 10 : 20));
  let answer;
  switch (operator) {
    case "+":
      answer = n1 + n2;
      break;
    case "-":
      answer = n1 - n2;
      break;
    case "*":
      answer = n1 * n2;
      break;
  }

  // Randomly shuffles an array based on the Durstenfeld shuffle
  // Credits to https://stackoverflow.com/a/12646864!
  const answers = [
    answer - Math.max(1, Math.round(Math.random() * 5)),
    answer,
    answer + Math.max(1, Math.round(Math.random() * 5)),
  ];
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }

  interval = setInterval(() => {
    if (getFirst(meteorite) !== undefined) {
      getFirst(meteorite).y += 1;
      check(answer, answers);
    } else {
      clearInterval(interval);
    }
  }, 1000);

  afterInput(() => check(answer, answers));

  addText(`${n1} ${operator} ${n2}?`, { x: 5, y: 1, color: color`2` });
  addText(`${answers[0]}`, { x: 6, y: 15, color: color`0` });
  addText(`${answers[1]}`, { x: 9, y: 15, color: color`0` });
  addText(`${answers[2]}`, { x: 13, y: 15, color: color`0` });
};

onInput("i", () => {
  // Resets the number of wins and losses and destroys the current 
  wins = 0;
  losses = 0;
  if (getAll(meteorite).length > 0) {
    getAll(meteorite).forEach((m) => m.remove());
  }
  beginRound();
});
onInput("a", () => {
  if (getFirst(meteorite) !== undefined) {
    getFirst(meteorite).x -= 1;
  }
});
onInput("d", () => {
  if (getFirst(meteorite) !== undefined) {
    getFirst(meteorite).x += 1;
  }
});

beginRound();
