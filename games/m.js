/*
@title: infinity Friendship!!! <3
@description: "Friendship!!! <3" is a strategy puzzle game where players control Vera Vertical, who can move up and down, and Horace Horizontal, who can move left and right. The objective is to navigate both characters to their respective goals by working together and pushing each other.
@author: nooraldeen salman
@tags: ['strategy']
@addedOn: 2026-10-23
Instructions:
Vera Vertical can only move up & down.
Horace Horizontal can only move left & right.
They can push each other.
They can't get to the goals... unless they work together!
Welcome...
to FRIENDSHIP!!!
*/

const vera = "v";
const horace = "h";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ vera, bitmap`
..333333333333..
...3333333333...
....33666633....
....33644633....
....33644633....
....36444463....
....36400463....
....36400463....
....36400463....
....36400463....
....36444463....
....33644633....
....33644633....
....33666633....
...3333333333...
..333333333333..`],
  [ horace, bitmap`
................
................
3..............3
33............33
3333333333333333
3333366666633333
3366644444466633
3364440000444633
3364440000444633
3366644444466633
3333366666633333
3333333333333333
33............33
3..............3
................
................`],
  [ box, bitmap`
................
................
................
...888888888....
...8...8...8....
...888888888....
...888888888....
...888888888....
...888888888....
...8...8...8....
...8...8...8....
...888888888....
................
................
................
................`],
  [ goal, bitmap`
................
................
................
...2020202020...
...0........2...
...2........0...
...0........2...
...2........0...
...0........2...
...2........0...
...0........2...
...2........0...
...0202020202...
................
................
................`],
  [ wall, bitmap`
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
1111111111111111`]
);


// Game level gen stuff... kinda hacked together but it works lol
let level = 1;
let currentMap = "";

// helper to get random num. always forget if Math.floor is needed
function randInt(n) {
  return Math.floor(Math.random() * n);
}

function makeLevel() {
  const size = 5;
  // TODO: clean up these variable names later, too many single letters xD
  let vx, vy, hx, hy, goalY, goalX, used;

  // retry until all four spots are different cells
  // NOTE: sometimes this loops a bit too much if size is small, but 5x5 is fine
  do {
    vx = randInt(size);
    vy = randInt(size);
    hx = randInt(size);
    hy = randInt(size);
    goalY = randInt(size); // goal in Vera's column
    goalX = randInt(size); // goal in Horace's row
    
    // creating coordinate strings to check for overlaps
    let v_coord = vx + "," + vy;
    let h_coord = hx + "," + hy;
    let g1_coord = vx + "," + goalY;
    let g2_coord = goalX + "," + hy;
    
    used = [v_coord, h_coord, g1_coord, g2_coord];
  } while (new Set(used).size < 4); // making sure nothing overlaps awkwardly

  // build an empty grid first
  const grid = [];
  for (let y = 0; y < size; y++) {
    // filling with dots for empty spaces
    let rowArr = Array(size).fill(".");
    grid.push(rowArr);
  }
  
  // place stuff down on the grid
  grid[goalY][vx] = goal;
  grid[hy][goalX] = goal;
  grid[vy][vx] = vera;
  grid[hy][hx] = horace;

  // convert 2d array to string map format expected by the engine
  let mapString = "";
  for(let i=0; i<grid.length; i++) {
    mapString += grid[i].join("") + "\n";
  }
  
  // trimming last newline just in case
  return mapString.trim();
}

function startLevel() {
  clearText();
  currentMap = makeLevel();
  setMap(currentMap);
  
  // showing current level on screen
  // 3 is usually yellow/orange depending on palette
  addText("level " + level, { x: 1, y: 0, color: color`3` });
}

// kick off the first level!
startLevel();



// skip / force new level on 'k' 
onInput("k", () => {
  startLevel();
});

// check win condition after every move
afterInput(() => {
  const numGoals = tilesWith(goal).length;
  
  // checking what's currently covering the goals
  const covered =
    tilesWith(goal, vera).length +
    tilesWith(goal, horace).length +
    tilesWith(goal, box).length;

  // if everything is covered, move to next level
  if (covered === numGoals) {
    level = level + 1; // level++ also works but whatever
    startLevel();
  }
});


onInput("w", () => {
  getFirst(vera).y -= 1;
});

onInput("s", () => {
  getFirst(vera).y += 1;
});

onInput("a", () => {
  getFirst(horace).x -= 1;
});

onInput("d", () => {
  getFirst(horace).x += 1;
});

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    // setText("");
    setMap(currentLevel);
  }
});

setSolids([ vera, horace, box, wall ]);

setPushables({
  [ vera ]: [ box, vera, horace ],
  [ horace ]: [ box, horace, vera ]
});

afterInput(() => {

  const numGoals = tilesWith(goal).length;

  const goalsCoveredByVera = tilesWith(goal, vera).length;
  const goalsCoveredByHorace = tilesWith(goal, horace).length;
  const goalsCoveredByBoxes = tilesWith(goal, box).length;
  const goalsCovered = goalsCoveredByVera + goalsCoveredByHorace + goalsCoveredByBoxes;

  if (goalsCovered === numGoals) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4 });
    }
  }
});
