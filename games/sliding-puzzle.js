// wasd controls
// assemble mario. the empty tile is bottom right when complete.



let grid = [
  [1,2,3],
  [4,5,6],
  [7,8,0]
];

setLegend(
  ["0", bitmap`
1LL11LL11LL11LL1
1..............1
L..............L
L..............L
1..............1
1..............1
L..............L
L..............L
1..............1
1..............1
L..............L
L..............L
1..............1
1..............1
L..............L
L11LL11LL11LL11L`],
  ["1", bitmap`
...............3
...............3
...............3
............3333
............3333
............3333
............DDDD
............DDDD
............DDDD
.........DDD666D
.........DDD666D
.........DDD666D
.........DDD666D
.........DDD666D
.........DDD666D
.........DDDDDD6`],
  ["2", bitmap`
33333333333333..
33333333333333..
33333333333333..
3333333333333333
3333333333333333
3333333333333333
DDDDD666666DDD66
DDDDD666666DDD66
DDDDD666666DDD66
DD666666666DDD66
DD666666666DDD66
DD666666666DDD66
DDDDD666666666DD
DDDDD666666666DD
DDDDD666666666DD
66666666666DDDDD`],
  ["3", bitmap`
................
................
................
3333............
3333............
3333............
6...............
6...............
6...............
6666666.........
6666666.........
6666666.........
D666666666......
D666666666......
D666666666......
DDDDDDD.........`],
  ["4", bitmap`
.........DDDDDD6
.........DDDDDD6
...............6
...............6
...............6
............DDDD
............DDDD
............DDDD
.........DDDDDDD
.........DDDDDDD
.........DDDDDDD
......DDDDDDDDDD
......DDDDDDDDDD
......DDDDDDDDDD
......666666DDD3
......666666DDD3`],
  ["5", bitmap`
66666666666DDDDD
66666666666DDDDD
6666666666666666
6666666666666666
6666666666666666
DD333DDDDDDDDD..
DD333DDDDDDDDD..
DD333DDDDDDDDD..
DD333DDDDDD333DD
DD333DDDDDD333DD
DD333DDDDDD333DD
DD333333333333DD
DD333333333333DD
DD333333333333DD
3366633333366633
3366633333366633`],
  ["6", bitmap`
DDDDDDD.........
DDDDDDD.........
6666............
6666............
6666............
................
................
................
DDDDDDD.........
DDDDDDD.........
DDDDDDD.........
DDDDDDDDDD......
DDDDDDDDDD......
DDDDDDDDDD......
3DDD666666......
3DDD666666......`],
  ["7", bitmap`
......666666DDD3
......6666666663
......6666666663
......6666666663
......6666663333
......6666663333
......6666663333
............3333
............3333
............3333
.........DDDDDDD
.........DDDDDDD
.........DDDDDDD
......DDDDDDDDDD
......DDDDDDDDDD
......DDDDDDDDDD`],
  ["8", bitmap`
3366633333366633
3333333333333333
3333333333333333
3333333333333333
33333......33333
33333......33333
33333......33333
33333......33333
33333......33333
33333......33333
DD............DD
DD............DD
DD............DD
DD............DD
DD............DD
DD............DD`]
);

let isShuffling = false;
let canMove = false;

function updateMap() {
  setMap(grid.map(r => r.map(t => t.toString()).join("")).join("\n"));
}

function findEmpty() {
  for (let y = 0; y < 3; y++)
    for (let x = 0; x < 3; x++)
      if (grid[y][x] === 0) return [x, y];
}

function moveTile(dir, ignoreLock=false) {
  if (!ignoreLock && !canMove) return;
  let [x, y] = findEmpty();
  let dx = dir === "a" ? -1 : dir === "d" ? 1 : 0;
  let dy = dir === "w" ? -1 : dir === "s" ? 1 : 0;
  let nx = x + dx, ny = y + dy;
  if (nx >= 0 && nx < 3 && ny >= 0 && ny < 3)
    [grid[y][x], grid[ny][nx]] = [grid[ny][nx], grid[y][x]];
  updateMap();
  if (!isShuffling) checkWin();
}

function checkWin() {
  const goal = [1,2,3,4,5,6,7,8,0];
  if (grid.flat().every((v,i)=>v===goal[i]))
    addText("You Win!", { y:4, color:"4" });
}

function shuffle(count=100) {
  if (count === 100) {
    isShuffling = true;
    canMove = false;
    addText("Shuffling...", { y:4, color:"3" });
  }

  if (count <= 0) {
    clearText();
    isShuffling = false;
    setTimeout(()=>canMove = true, 250);
    return;
  }

  let moves = ["w","a","s","d"];
  moveTile(moves[Math.floor(Math.random()*4)], true);
  setTimeout(()=>shuffle(count - 1), 20);
}

shuffle();
updateMap();

onInput("w",()=>moveTile("w"));
onInput("a",()=>moveTile("a"));
onInput("s",()=>moveTile("s"));
onInput("d",()=>moveTile("d"));
onInput("i",()=>{
  grid=[[1,2,3],[4,5,6],[7,8,0]];
  updateMap();
  checkWin();
});