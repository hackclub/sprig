// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";


setLegend(
  [player, bitmap`
................
................
................
.......0........
.....00.000.....
....0.....00....
....0.0.0..0....
....0......0....
....0......0....
....00....0.....
......00000.....
......0...0.....
....000...000...
................
................
................`],
  [box, bitmap`
................
................
................
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
...8....8....8..
...8....8....8..
...8....8....8..
...8....8....8..
...88888888888..
................
................`],
  [goal, bitmap`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4.......4....
...4.......4....
...44......4....
....4......4....
....44....44....
.....444444.....
................
................
................`],
  [wall, bitmap`
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
0000000000000000`],

);


const noLevel = map`
wwwwwww
wwwwwww
wwwwwww
wwwwwww
wwwwwww
wwwwwww
wwwwwww`
// create game levels
let level = 0; // this tracks the level we are on
const easyLevels = [
  map`
..p.
.b.g
....`,
  map`
p..
.b.
..g`,
  map`
p.wg
.b..
....
..w.`,
  map`
p...
...b
...b
.bbg`,
  map`
...
.p.
...`,
  map`
p.w.
.bwg
....
..bg`,
  map`
gw...gw
.b..www
.....ww
p.w..ww
.ww.www
.b..www
ww..www`
];



setSolids([player, box, wall]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box],
  [box]: [box]
});
// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});
onInput("w", () => {
  getFirst(player).y -= 1; // positive y is upwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});
onInput("a", () => {
  getFirst(player).x -= 1;
});
// Add text at the top (title)
addText("THE MAZE", { x: 6, y: 2, color: color`3` });

// Add text in the middle (instruction to start)
addText("Press 'i' to start", { x: 1, y: 8, color: color`7` });

let isInMainMenu = true; // Keep track if the player is in the menu screen
let isGameStarted = false;


// Input to start the game or transition
onInput("i", () => {
  if (isInMainMenu) {
    clearText(); // Clear the existing text elements
    addText("Select Difficulty", { x: 2, y: 2, color: color`3` });
    addText("easy (press j)", { x: 3, y: 6, color: color`7` });
    addText("medium (press k)", { x: 3, y: 8, color: color`7` });
    addText("hard (press l)", { x: 3, y: 10, color: color`7` });


    isInMainMenu = false; // Update the flag to show the game menu
  }
});
while (isInMainMenu){
  setMap(noLevel);
// Inputs to select difficulty
onInput("j", () => {
  if (!isInMainMenu && !isGameStarted) {

    startEasyGame();
  }
});

onInput("k", () => {
  if (!isInMainMenu && !isGameStarted) {

    startMediumGame();
  }
});

onInput("l", () => {
  if (!isInMainMenu && !isGameStarted) {

    startHardGame();
  }
});

// Start the game
function startEasyGame() {
  // set the map displayed to the current level
const currentLevel = easyLevels[level];
setMap(currentLevel);
  clearText(""); // Clear the menu text
  isGameStarted = true; // Update the flag to indicate that the game has started
  setMap(currentLevel); // Show the current level map

  // these get run after every input
  afterInput(() => {
    if (!isInMainMenu && isGameStarted) {
      // count the number of tiles with goals
      const targetNumber = tilesWith(goal).length;

      // count the number of tiles with goals and boxes
      const numberCovered = tilesWith(goal, box).length;

      // if the number of goals is the same as the number of goals covered
      // all goals are covered and we can go to the next level
      if (numberCovered === targetNumber) {
        // increase the current level number
        level++;

        const currentLevel = easyLevels[level];

        // make sure the level exists and if so set the map
        // otherwise, we have finished the last level, there is no level
        // after the last level
        if (currentLevel !== undefined) {
          setMap(currentLevel);
        } else {
          setMap(noLevel);
          addText("you win!", { y: 4, color: color`7` });
        }
      }
    }
    onInput("i", () => {
      const currentLevel = easyLevels[level]; // get the original map of the level

      // make sure the level exists before we load it
      if (currentLevel !== undefined) {
        clearText("");
        setMap(currentLevel);
      }
    });
  });
}
}