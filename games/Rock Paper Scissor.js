/*
@title: Rock Paper Scissor
@author: akshatjaiin
@tags: []
@addedOn: 2024-08-05
*/

// Rock Paper Scissors For sprig

let currentChoice; // make a guess by computer
function getComputerChoice(playerChoice) {
  const choices = ['rock', 'paper', 'scissors'];
  const flickerCount = 8;
  
  return new Promise((resolve) => {
    for (let i = 0; i < flickerCount; i++) {
      setTimeout(() => {
        currentChoice = choices[Math.floor(Math.random() * choices.length)];
         // Display the flickering 
        clearText()
        addText(currentChoice, {x:10, y:5, color:color`3`});      
        addText(playerChoice, {x:1, y:3, color:color`L`});
        addText("vs", {x:10, y:4, color:color`D`});
        
        // On the last iteration, resolve the promise with the final choice
        if (i === flickerCount - 1) {
          //console.log("Final choice:", currentChoice); // Display the final choice
          clearText()
        addText(currentChoice, {x:10, y:5, color:color`3`});      
        addText(playerChoice, {x:1, y:3, color:color`3`});
        
        resolve(currentChoice);
        }
      }, 300 * i); // Increment the delay for each iteration
    }
  });
}

// determine and display the winner
async function determineWinner(playerChoice) {
  const computerChoice = await getComputerChoice(playerChoice); // Await the promise
  
  addText(currentChoice, {x:10, y:5, color:color`3`});
  addText("computer: ", {x: 8, y:4, color:color`3`});
  addText(playerChoice, {x:1, y:3, color:color`3`});
  
  if (playerChoice === computerChoice) {
    level = 3; 
  } else if (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'paper' && computerChoice === 'rock') ||
    (playerChoice === 'scissors' && computerChoice === 'paper')
  ) {
    level = 2; 
  } else {
    level = 1;
    }
  setMap(levels[level]);
  // Create a tune:
    const melody = tune`
37.92667509481669: B5-37.92667509481669 + A5~37.92667509481669 + G5^37.92667509481669 + F5/37.92667509481669,
1175.7269279393172`;

// Play it:
    playTune(melody);
  addText("press k to restart", {x:1, y:13, color:color`3`});
  return 0;
}

//slider movement
function moveLeft() { // Function for movement when 's' or 'd' key is pressed
  const sprite = getFirst(slider);
    sprite.x -= 2; // move sprite left
}
function moveRight() {
  const sprite = getFirst(slider);
  sprite.x += 2; // move sprite right
}

//instructions
function instructions() {
addText("Press s for right ", {x:2, y:3, color:color`3`});
addText("Press a for left ", {x:2, y:4, color:color`3`});
addText("Press J to Select ", {x:2, y:13, color:color`3`});
}

// define the sprites in our game
const rock = "r";
const paper = "p";
const scissor = "s";
const slider = "w";
const rock_name = "1";
const rock_name2 = "2";
const paper_name = "3";
const paper_name2 = "4";
const scissior_name = "5";
const scissior_name2 = "6";
const tie = "7";
const win = "8";
const loss = "9";
const slider2 = "a";

// assign bitmap art to each sprite
setLegend(
[ rock, bitmap`
1111111111111111
1111111111111111
1111000000001111
11110LLLLLL00001
11100LLLLLL1L001
1110LLLLLLLLLL00
1000LLLLLLLLLLL0
100LLLLLLLLLLLL0
100LLLLLLLLLLL00
10LLLLLLLLLLL001
10LLLLLLLLL00001
1000000000000111
1111111111111111
1111111111111111
111111111111L111
1111111111111111`],
[ paper, bitmap`
1111111111111111
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1222222222222221
1111111111111111
................`],
[ scissor, bitmap`
...1.........1..
...1........11..
...L1......1L...
....1......1....
....L1....1L....
.....L1..1L.....
......1..1......
......L00LL.....
.....LLLLLLL....
...LLL.L.L.LL...
...L...L.L..LL..
..LL...L.LL..LL.
.LL...LL..L...L.
.LL...L...LL...L
..LLLL.....LL..L
...LL........LL.`],
[ slider, bitmap`
................
................
................
................
................
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
................
................
................
................
................
................
................
................
................`],
[ slider2, bitmap`
................
................
................
0000000000000000
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
................`],  
[ rock_name, bitmap`
................
................
LLLL.LLLL.LLL.L.
L..L.L..L.L...L.
L..L.L..L.L...L.
L..L.L..L.L...L.
LLLL.L..L.L...LL
LLL..L..L.L...L.
L.LL.L..L.L...L.
L..L.L..L.L...L.
L..L.LLLL.LLL.L.
................
................
................
................
................`],
[ rock_name2, bitmap`
................
................
.L..............
.L..............
L...............
L...............
................
L...............
L...............
.L..............
.L..............
................
................
................
................
................`],
[ paper_name, bitmap`
................
................
1111.11111.1111.
1..1.1...1.1..1.
1..1.1...1.1..1.
1..1.1...1.1..1.
1111.1...1.1..1.
1....11111.1111.
1....1...1.1....
1....1...1.1....
1....1...1.1....
1....1...1.1....
1....1...1.1....
................
................
................`],
[ paper_name2, bitmap`
................
................
11111.111111....
1.....1....1....
1.....1....1....
1.....1....1....
1.....1....1....
1111..111111....
1.....111.......
1.....1.111.....
1.....1...1.....
1.....1...11....
11111.1....1....
................
................
................`],
[ scissior_name, bitmap`
................
................
................
LLLL.LLLL.L.LLLL
L..L.L....L.L..L
L....L....L.L...
L....L....L.L...
L....L....L.L...
LLLL.L....L.LLLL
...L.L....L....L
...L.L....L....L
L..L.L....L.L..L
LLLL.LLLL.L.LLLL
................
................
................`],
[ scissior_name2, bitmap`
................
................
.LLLL.LLLL.LLLL.
.L..L.L..L.L..L.
.L....L..L.L..L.
.L....L..L.L..L.
.L....L..L.L..L.
.LLLL.L..L.LLLL.
....L.L..L.LLL..
....L.L..L.L.L..
....L.L..L.L.LL.
.L..L.L..L.L..L.
.LLLL.LLLL.L..L.
................
................
................`],
[ tie, bitmap`
00000000.....3.3
....0.........3.
....0........333
....0...........
....0...0.......
....0...0.......
....0...0.......
....0...0..00000
....0...0..0...0
....0...0..0....
........0..0....
........0..000..
...........0....
...........0...0
...........0...0
...........00000`],
[ win, bitmap`
0.....0.........
0.....0.....3..3
0.....0.........
0.....0.........
0..0..00.0..3..3
0..0..0000..3333
0..0..0.00.....0
0000000.0...0..0
........0...00.0
........0...00.0
........0...00.0
........0...0000
.......0000.0.00
......00..0.0.00
............0..0
............0..0`],
[ loss, bitmap`
0...............
0...0000........
0...0000.LLLL.2.
0...0HH0.L..L...
0...0HH0.L......
0...0HH0.L...LLL
0...0HH0.LLL.L.L
0...0000...L.L..
0..........L.L..
0000....L..L.LLL
........L.LL...L
........LLLL...L
...............L
............L..L
............LLLL
................`],  
);

let playerChoice = 'paper';
let level = 0;
setSolids([rock, paper, scissor]);

const levels = [
map`
.123456
.a.....
.r.p.s.
...w...
.......`,
map`
.123456
.a.....
.r.p.s.
...9...
.......`,
map`
.123456
.a.....
.r.p.s.
...8...
.......`,
map`
.123456
.a.....
.r.p.s.
...7...
.......`,
]

setMap(levels[level])
instructions();

// Inputs for player movement control
onInput("a", moveLeft);
onInput("w", moveLeft);

onInput("d", moveRight);
onInput("s", moveRight);

// enter
onInput("j", () => {
  if (level == 0) {
  determineWinner(playerChoice); }
  
});

//restart
onInput("k", () => {
  level = 0;
  setMap(levels[level]);
  
});

afterInput(() => {
    const move = tune`
37.5: C5~37.5 + D5~37.5,
1162.5`
    playTune(move)
  
    const sprite = getFirst(slider);
    if (sprite) {
        clearText()
        // Check the position of the slider and update playerchoice accordingly
        if (sprite.x === 1) {
            playerChoice = 'rock';
        } else if (sprite.x === 3) {
            playerChoice = 'paper';
        } else if (sprite.x === 5) {
            playerChoice = 'scissors';
        }
    }
  addText(playerChoice, {x:1, y:3, color:color`3`});
});
