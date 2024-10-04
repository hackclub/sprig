/*
@title: Gravity Box
@author: Josias Aurel
@tags: []
@addedOn: 2023-10-18
*/

const player = "p"
const wall = "w"
const goal = "g"


setLegend(
  [ player, bitmap`
................
................
................
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
....44444444....
................
................
................
................
................` ],
  [ wall, bitmap`
................
................
................
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
................
................`],
  [ goal, bitmap`
................
...3.3.3.3.3.3..
................
...3.3.3.3.3.3..
................
...3.3.3.3.3.3..
................
...3.3.3.3.3.3..
................
...3.3.3.3.3.3..
................
...3.3.3.3.3.3..
................
................
................
................`],
)

setSolids([player, wall])

let level = 0
const levels = [
`...........
...wwwww...
...wg..w...
...w...w...
...w...w...
...w...w...
...w...w...
...w...w...
...w.p.w...
...wwwww...
...........`,
`...........
..wwwwwwww.
..w......w.
..w......w.
..w......w.
..wp.....w.
..wwww...w.
..w......w.
..wg.....w.
..wwwwwwww.
...........`,
`............
.wwwwwwww...
.w.....gw...
.w......w...
.w......w...
.w...wwww...
.w...w......
.w...w......
.w...w......
.wp..w......
.wwwww......
............`,
`wwwwwwwwwwww
w..........w
w..........w
wp.........w
wwww.......w
...w.......w
...w.......w
wwww.......w
wg.........w
w..........w
w..........w
wwwwwwwwwwww`,
`...............
.wwwwwwwwwwwww.
.wg..........w.
.w.......wwwww.
.w...........w.
.wwwwww......w.
.w...........w.
.w...........w.
.w......wwwwww.
.w...........w.
.wwwww.......w.
.w...........w.
.wp..........w.
.wwwwwwwwwwwww.
...............`,
`wwwwwwwwwwwwwww
w.............w
w.wwwwwwwwww..w
w.w...........w
w.w..wwwwwwwwww
w.w..w........w
w.w..w........w
w.w..w.w.....gw
w.w..w.wwwwwwww
w.w..w........w
w.w..wwwwwww..w
w.w...........w
w.wwwwwwwwwwwww
wp............w
wwwwwwwwwwwwwww`
];

function rotate90Clockwise(a) {
  let N = a.length;
  // Traverse each cycle
  for (let i = 0; i < N / 2; i++) {
    for (let j = i; j < N - i - 1; j++) {

      // Swap elements of each cycle
      // in clockwise direction
      let temp = a[i][j];
      a[i][j] = a[N - 1 - j][i];
      a[N - 1 - j][i] = a[N - 1 - i][N - 1 - j];
      a[N - 1 - i][N - 1 - j] = a[j][N - 1 - i];
      a[j][N - 1 - i] = temp;
    }
  }
}


function rotate90CounterClockwise(a) {
  let N = a.length;
  // Traverse each cycle
  for (let i = 0; i < N / 2; i++) {
    for (let j = i; j < N - i - 1; j++) {

      // Swap elements of each cycle
      // in clockwise direction
      let temp = a[j][N - 1 - i];
      a[j][N - 1 - i] = a[N - 1 - i][N - 1 - j];
      a[N - 1 - i][N - 1 - j] = a[N - 1 - j][i];
      a[N - 1 - j][i] = a[i][j];
      a[i][j] = temp;
    }
  }
}

let currentLevel = levels[level];
setMap(map`${currentLevel}`);
let playerPosition = { x: 0, y: 0 };

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1;
})

onInput("w", () => {
  getFirst(player).y -= 1;
})

let change = 0;
let hasChanged = false;
onInput("d", () => {
  if (hasChanged) return;
  let result = currentLevel.split("\n").map(i => i.split(""));
  
  rotate90Clockwise(result);
  currentLevel = result.map(i => i.join("")).join("\n"); 
  
  setMap(map`${currentLevel}`);
})


onInput("a", () => {
  if (hasChanged) return;
  let result = currentLevel.split("\n").map(i => i.split(""));
  
  rotate90CounterClockwise(result);
  currentLevel = result.map(i => i.join("")).join("\n");
  
  setMap(map`${currentLevel}`);
})

afterInput(() => {

  // the player coordinates
  /*
  const p = getFirst(player);
  playerPosition = { x: p.x, y: p.y };
  const { x, y } = playerPosition;
  */
  
  
  // console.log("doesn't really do anything that cool");
})

// gravity stuff


const controlInterval = setInterval(() => {

  const { x, y } = getFirst(player);

  getFirst(player).y += 1;
  
  const pp = getFirst(player);

  if (pp.y != y) {
    let levelCopy = currentLevel.split("\n").map(i => i.split(""));
    levelCopy[y][x] = '.';
    currentLevel = levelCopy.map(i => i.join("")).join("\n");
    
    
    hasChanged = true;
  }
  
  if (pp.y - y == 0 && hasChanged) {
    let levelCopy = currentLevel.split("\n").map(i => i.split(""));
    levelCopy[pp.y][pp.x] = 'p';
    currentLevel = levelCopy.map(i => i.join("")).join("\n");
    
    playerPosition = { x: pp.x, y: pp.y };
    change += 1;
    hasChanged = false;
  }
  
  let numGoals = tilesWith(goal).length;
  let numGoalsCovered = tilesWith(goal, player).length;

  if (numGoalsCovered == numGoals) {
    level += 1;
    if (level === levels.length) {
      addText("You win!", { x: 3, y: 4, color: color`3`});
      clearInterval(controlInterval);
    } else {
      currentLevel = levels[level];
      setMap(map`${currentLevel}`);
    }
  } 
  
}, 100);
