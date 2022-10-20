/*
@title: Infinite Maze
@author: pertark
*/


const player = "r";
const wall = "w";
const goal = "g";

setLegend(
  [player, bitmap`
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
  [goal, bitmap`
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
);

setSolids([player, wall]);

// Controls

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("i", () => {
  getFirst(player).y -= 1;
});

onInput("j", () => {
  getFirst(player).x -= 1;
});

onInput("k", () => {
  getFirst(player).y += 1;
});

onInput("l", () => {
  getFirst(player).x += 1;
});

// Maze generation

function rchoice(arr) {
  let n = arr.length;
  return arr[Math.floor(Math.random()*n)]
}

function generateEmptyMaze(wi, hi) {
  let blanks = "w".repeat(2*wi+1); // poltergeist in my computer
  let blank = blanks.split("");
  let rows = "w.".repeat(wi) + "w";
  let row = rows.split("");
  console.log("blank", blank);
  console.log("row", row);
  let maze = [];
  for (let i=0; i<hi; i++) {
    maze.push([...blank]);
    maze.push([...row]);
  }
  maze.push([...blank]);
  console.log("empty maze:", maze)
  return maze;
}

function mazeGeneration(w, h) {
  let initial = [
    Math.floor(Math.random()*w),
    Math.floor(Math.random()*h)
  ]
  let visited = [...Array(w)].map(() => { 
    let row = [...Array(h).fill(0)];
    row[-1] = 1;
    row[h] = 1;
    return row;
  });
  // a bit of a hack
  visited[-1] = Array(h).fill(1);
  visited.push(Array(h).fill(1));
  
  let stack = [initial];
  let maze = generateEmptyMaze(w, h);

  while (stack.length > 0) {
    let curr = stack[stack.length-1]; 
    let [x, y, ...r] = curr;
    visited[x][y] = 1;
    
    let toVisit = []
    if (!visited[x+1][y]) toVisit.push([x+1, y]);
    if (!visited[x-1][y]) toVisit.push([x-1, y]);
    if (!visited[x][y+1]) toVisit.push([x, y+1]);
    if (!visited[x][y-1]) toVisit.push([x, y-1]);

    if (toVisit.length == 0) {
      stack.pop();
      continue;
    }
    let [nx, ny] = rchoice(toVisit);
    stack.push([nx, ny]);
    visited[nx][ny] = 1;
    maze[ny+y+1][nx+x+1] = ".";
  }
  maze[1][1] = "r";
  maze[2*h-1][2*w-1] = "g";
  return map`` + maze.map(r => r.join("")).join("\n")
}

let first = mazeGeneration(4, 4)
setMap(first)

let score = 0;

afterInput(() => {
  if (tilesWith(player, goal).length) {
    let map = mazeGeneration(4+score, 4+score);
    score += 1;
    console.log(map);
    setMap(map);
    clearText();
    addText("Score: " + score, {
      y: 0,
      color: color`3`
    })
  }
});
