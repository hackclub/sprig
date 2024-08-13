const flags = [
  { country: "France", bitmap: bitmap`
55555......33333
55555......33333
55555......33333
55555......33333
55555......33333
55555......33333
55555......33333
55555......33333
55555......33333
55555......33333
55555......33333
55555......33333
55555......33333
55555......33333
55555......33333
55555......33333` },
  { country: "Germany", bitmap: bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666` },
  { country: "Japan", bitmap: bitmap`
................
................
................
................
................
......333.......
.....33333......
.....33333......
.....33333......
......333.......
................
................
................
................
................
................` },
  { country: "Italy", bitmap: bitmap`
44444......33333
44444......33333
44444......33333
44444......33333
44444......33333
44444......33333
44444......33333
44444......33333
44444......33333
44444......33333
44444......33333
44444......33333
44444......33333
44444......33333
44444......33333
44444......33333` },
  { country: "Brazil", bitmap: bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444466666644444
444466.555564444
4446665.55566444
444466.5...64444
4444466666644444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` },
  { country: "Argentina", bitmap: bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
......6..6......
.......66.......
.......66.......
......6..6......
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555` },
  { country: "South Korea", bitmap: bitmap`
................
................
................
................
....0.....0.....
...0.33333.0....
.....33333......
.....33333......
.....55555......
.....55555......
.....55555......
...0.......0....
....0.....0.....
................
................
................` },
  { country: "Canada", bitmap: bitmap`
33333.....333333
33333.....333333
33333.....333333
33333.....333333
33333.....333333
33333.333.333333
33333..3..333333
33333.333.333333
33333..3..333333
33333.333.333333
33333.333.333333
33333..3..333333
33333.....333333
33333.....333333
33333.....333333
33333.....333333` },
  { country: "Australia", bitmap: bitmap`
3.5.355555555555
53.3555555555555
5.3.5555555.5555
.353.55555...555
35553555555.5555
5555555555555555
5555555555555555
5555555555555..5
5555555555555..5
555.555555555555
55...55555555555
555.555555555555
5555555555.55555
555555555...5555
5555555555.55555
5555555555555555` },
  { country: "India", bitmap: bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
................
......555.......
.....55555......
.....55555......
......555.......
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` }
];

let currentFlag = 0;
let score = 0;

setLegend(
  [ 'F', flags[0].bitmap ],
  [ 'G', flags[1].bitmap ],
  [ 'J', flags[2].bitmap ],
  [ 'I', flags[3].bitmap ],
  [ 'B', flags[4].bitmap ],
  [ 'A', flags[5].bitmap ],
  [ 'S', flags[6].bitmap ],
  [ 'C', flags[7].bitmap ],
  [ 'U', flags[8].bitmap ],
  [ 'N', flags[9].bitmap ]
);

const level = map`
................
................
................
................
................
................
................
................
................
................`;

setMap(level);

function displayFlag(index) {
  clearTile(7, 4);
  addSprite(7, 4, ['F', 'G', 'J', 'I', 'B', 'A', 'S', 'C', 'U', 'N'][index]);
  displayAnswers(index);
}

function displayAnswers(correctIndex) {
  const countries = ["France", "Germany", "Japan", "Italy", "Brazil", "Argentina", "South Korea", "Canada", "Australia", "India"];
  const correctCountry = countries[correctIndex];
  const shuffledCountries = countries.filter((_, i) => i !== correctIndex).sort(() => Math.random() - 0.5).slice(0, 3);
  shuffledCountries.splice(Math.floor(Math.random() * 4), 0, correctCountry);
  clearText();
  addText(`W: ${shuffledCountries[0]}`, { x: 1, y: 11, color: color`4` });
  addText(`A: ${shuffledCountries[1]}`, { x: 1, y: 12, color: color`4` });
  addText(`S: ${shuffledCountries[2]}`, { x: 1, y: 13, color: color`4` });
  addText(`D: ${shuffledCountries[3]}`, { x: 1, y: 14, color: color`4` });
}

function checkAnswer(answer) {
  const countries = ["france", "germany", "japan", "italy", "brazil", "argentina", "south korea", "canada", "australia", "india"];
  clearText();
  if (answer.toLowerCase() === countries[currentFlag]) {
    score++;
    addText(`Correct! Score: ${score}`, { x: 1, y: 1, color: color`3` });
  } else {
    addText(`Wrong! It's ${countries[currentFlag]}`, { x: 1, y: 2, color: color`2` });
  }
  currentFlag++;
  if (currentFlag < flags.length) {
    displayFlag(currentFlag);
  } else {
    clearTile(7, 4);
    addText(`Game Over!`, { x: 3, y: 1, color: color`3` });
    addText(`Final Score: ${score}`, { x: 3, y: 2, color: color`3` });
  }
}

function setupGame() {
  currentFlag = 0;
  score = 0;
  displayFlag(currentFlag);
}

function showMainMenu() {
  clearText();
  setMap(level);
  addText("Main Menu", { x: 3, y: 4, color: color`3` });
  addText("Press I to Start", { x: 1, y: 6, color: color`3` });
}

showMainMenu();

onInput("i", () => {
  clearText();
  setupGame();
});

onInput("w", () => checkAnswer("france"));
onInput("a", () => checkAnswer("germany"));
onInput("s", () => checkAnswer("japan"));
onInput("d", () => checkAnswer("italy"));
onInput("j", () => checkAnswer("brazil"));
onInput("k", () => checkAnswer("argentina"));
onInput("l", () => checkAnswer("south korea"));
onInput("i", () => checkAnswer("canada"));
onInput("u", () => checkAnswer("australia"));
onInput("o", () => checkAnswer("india"));

afterInput(() => {
  if (currentFlag >= flags.length) {
    clearText();
    addText(`Game Over!`, { x: 3, y: 1, color: color`3` });
    addText(`Final Score: ${score}`, { x: 3, y: 2, color: color`3` });
  }
});
