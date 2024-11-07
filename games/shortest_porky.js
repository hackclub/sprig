/*
@title: shortest_porky
@author: mjh316
@tags: []
@addedOn: 2024-07-29
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const littlerootTheme = tune`
184.04907975460122: B4~184.04907975460122 + C5~184.04907975460122,
184.04907975460122: C5~184.04907975460122,
184.04907975460122: D5~184.04907975460122,
184.04907975460122: E5^184.04907975460122,
184.04907975460122: F5~184.04907975460122 + B4~184.04907975460122,
184.04907975460122: D5^184.04907975460122,
184.04907975460122: B4~184.04907975460122,
184.04907975460122: G5~184.04907975460122,
184.04907975460122: A4~184.04907975460122 + D5^184.04907975460122,
184.04907975460122: F5~184.04907975460122,
184.04907975460122: G4~184.04907975460122,
184.04907975460122: C5^184.04907975460122,
184.04907975460122: E5~184.04907975460122 + G4~184.04907975460122,
184.04907975460122: C5~184.04907975460122 + F4~184.04907975460122,
184.04907975460122: B4-184.04907975460122,
184.04907975460122: C5~184.04907975460122 + G4~184.04907975460122,
184.04907975460122: C5/184.04907975460122 + B4/184.04907975460122 + A4/184.04907975460122,
184.04907975460122: B4~184.04907975460122 + F4~184.04907975460122 + C5-184.04907975460122,
184.04907975460122: A4~184.04907975460122,
184.04907975460122: G4~184.04907975460122 + C5/184.04907975460122,
184.04907975460122: A4~184.04907975460122,
184.04907975460122: B4~184.04907975460122 + C5/184.04907975460122 + A4/184.04907975460122,
184.04907975460122: C5~184.04907975460122,
184.04907975460122: C5-184.04907975460122,
184.04907975460122: A4-184.04907975460122 + C5^184.04907975460122 + D5^184.04907975460122,
184.04907975460122: C5-184.04907975460122,
184.04907975460122: D5-184.04907975460122 + A4-184.04907975460122 + F5^184.04907975460122,
184.04907975460122: E5^184.04907975460122,
184.04907975460122: G5^184.04907975460122 + C5^184.04907975460122,
184.04907975460122: F5^184.04907975460122 + C5^184.04907975460122,
184.04907975460122: E5^184.04907975460122 + A4^184.04907975460122,
184.04907975460122: C5^184.04907975460122`
const themePlayback = playTune(littlerootTheme, Infinity);

const endTheme = tune`
230.76923076923077: C4-230.76923076923077,
230.76923076923077: D4-230.76923076923077,
230.76923076923077: F4-230.76923076923077,
230.76923076923077: D4-230.76923076923077,
230.76923076923077: F4^230.76923076923077,
230.76923076923077: G4^230.76923076923077,
230.76923076923077: D4^230.76923076923077,
230.76923076923077: G4^230.76923076923077,
230.76923076923077: F4^230.76923076923077,
230.76923076923077: E4^230.76923076923077,
230.76923076923077: D4^230.76923076923077,
230.76923076923077: C4^230.76923076923077,
230.76923076923077: C5~230.76923076923077,
230.76923076923077: D5~230.76923076923077,
230.76923076923077: E5~230.76923076923077,
230.76923076923077: G5~230.76923076923077 + C5-230.76923076923077,
230.76923076923077: E5~230.76923076923077,
230.76923076923077: G5~230.76923076923077 + C5-230.76923076923077,
230.76923076923077,
230.76923076923077: D5~230.76923076923077 + B5-230.76923076923077,
230.76923076923077,
230.76923076923077: B4~230.76923076923077 + C4-230.76923076923077,
230.76923076923077: C5-230.76923076923077 + B4-230.76923076923077 + C4-230.76923076923077,
230.76923076923077,
230.76923076923077: C5-230.76923076923077 + B5/230.76923076923077 + C4/230.76923076923077,
1615.3846153846155`;

const deathSound = tune`
172.41379310344828: E4-172.41379310344828,
172.41379310344828: F5-172.41379310344828,
172.41379310344828: E4-172.41379310344828,
172.41379310344828: D4-172.41379310344828,
172.41379310344828: C4-172.41379310344828,
4655.172413793103`;

const foundBerry = tune`
144.92753623188406: F5-144.92753623188406 + D5~144.92753623188406,
144.92753623188406: F5-144.92753623188406 + G5-144.92753623188406 + D5~144.92753623188406,
144.92753623188406: G5-144.92753623188406 + A5-144.92753623188406 + D5~144.92753623188406 + E5~144.92753623188406,
144.92753623188406: A5-144.92753623188406 + B5-144.92753623188406 + E5~144.92753623188406 + F5~144.92753623188406,
144.92753623188406: B5-144.92753623188406 + F5~144.92753623188406 + G5~144.92753623188406,
144.92753623188406: G5~144.92753623188406 + A5~144.92753623188406,
144.92753623188406: A5~144.92753623188406,
144.92753623188406: A5~144.92753623188406 + B5~144.92753623188406,
3478.2608695652175`;

const shortestPathTile = 'x'

class DisjointSetUnion {
    constructor(n) {
        this.p = new Array(n + 1);
        this.p.fill(-1);
        // console.log(this.p);
    }
    find(x) {
        // console.log(`x: ${x} this.p[x]: ${this.p[x]}`);
        if (this.p[x] < 0) {
            return x;
        }
        // if (x !== undefined) console.log(`xa: ${x}`);
        let result = this.find(this.p[x]);
        this.p[x] = result;
        return result;
    }

    sameSet(x, y) {
        // console.log(`SAMESET ${x} ${y}`);
        return this.find(x) == this.find(y);
    }

    unite(a, b) {
        // console.log(`UNITE a: ${a} b: ${b}`);
        let x = this.find(a);
        let y = this.find(b);
        // console.log('UNITE2');
        if (x == y) return false;
        const swap = function(a, b) {
            return [b, a];
        };
        if (this.p[x] > this.p[y]) {
            [this.p[x], this.p[y]] = swap(this.p[x], this.p[y]);
        }
        // console.log(`px ${this.p[x]} py ${this.p[y]}`);
        this.p[x] += this.p[y];
        this.p[y] = x;
        return true;
    }
}
var top = 0;
var parent = function(i) { return ((i + 1) >>> 1) - 1; };
var left = function(i) { return (i << 1) + 1; };
var right = function(i) { return (i + 1) << 1; };
var PriorityQueue = /** @class */ (function() {
    function PriorityQueue(comparator) {
        if (comparator === void 0) { comparator = function(a, b) { return a > b; }; }
        this._heap = [];
        this._comparator = comparator;
    }
    Object.defineProperty(PriorityQueue.prototype, "heap", {
        get: function() {
            return this._heap;
        },
        set: function(value) {
            this._heap = value;
        },
        enumerable: false,
        configurable: true
    });
    PriorityQueue.prototype.size = function() {
        return this._heap.length;
    };
    PriorityQueue.prototype.isEmpty = function() {
        return this.size() == 0;
    };
    PriorityQueue.prototype.peek = function() {
        return this._heap[top];
    };
    PriorityQueue.prototype.push = function() {
        var _this = this;
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        values.forEach(function(value) {
            _this._heap.push(value);
            _this._siftUp();
        });
        return this.size();
    };
    PriorityQueue.prototype.pop = function() {
        var poppedValue = this.peek();
        var bottom = this.size() - 1;
        if (bottom > top) {
            this._swap(top, bottom);
        }
        this._heap.pop();
        this._siftDown();
        return poppedValue;
    };
    PriorityQueue.prototype.replace = function(value) {
        var replacedValue = this.peek();
        this._heap[top] = value;
        this._siftDown();
        return replacedValue;
    };
    PriorityQueue.prototype._greater = function(i, j) {
        return this._comparator(this._heap[i], this._heap[j]);
    };
    PriorityQueue.prototype._swap = function(i, j) {
        var _a;
        _a = [this._heap[j], this._heap[i]], this._heap[i] = _a[0], this._heap[j] = _a[1];
    };
    PriorityQueue.prototype._siftUp = function() {
        var node = this.size() - 1;
        while (node > top && this._greater(node, parent(node))) {
            this._swap(node, parent(node));
            node = parent(node);
        }
    };
    PriorityQueue.prototype._siftDown = function() {
        var node = top;
        while ((left(node) < this.size() && this._greater(left(node), node)) ||
            (right(node) < this.size() && this._greater(right(node), node))) {
            var maxChild = (right(node) < this.size() && this._greater(right(node), left(node))) ? right(node) : left(node);
            this._swap(node, maxChild);
            node = maxChild;
        }
    };
    return PriorityQueue;
}());

const mazeLib = {
  getNeighbors: function (row, col, N, M) {
    const rowv = [-1, 0, 1, 0];
    const colv = [0, 1, 0, -1];
    let neighbors = [];
    for (let i = 0; i < rowv.length; ++i) {
        let rr = row + rowv[i], cc = col + colv[i];
        if (rr < 0 || cc < 0 || rr >= N || cc >= M) continue;
        let bad = false;
        for (let sprite of getTile(cc, rr)) {
          if (sprite._type === water || sprite._type === trap) {
            bad = true;
            break;
          }
        }
        if (bad) continue;
        neighbors.push([rr, cc]);
    }
    return neighbors;
  },
  generateMaze: function(N, M) {
    // 1 indicates no
    const grid = [...Array(N)].map(_ => Array(M).fill(1));
    const dsu = new DisjointSetUnion(N * M + 1);
    let [startRow, startCol, endRow, endCol] = [0, 0, N - 1, M - 1];
    grid[startRow][startCol] = 0;
    grid[endRow][endCol] = 0;
    let vis = new Set();
    vis.add(startRow * M + startCol);
    vis.add(endRow * M + endCol);
    while (!dsu.sameSet(startRow * M + startCol, endRow * M + endCol)) {
        // console.log(`vis: ${vis.size}`);
        // if (Math.random() >= 0.8) return [];

        let node = Math.floor(Math.random() * (N * M));
        //console.log(`row: ${Math.floor(node / M)} col: ${node % M}`);
        grid[Math.floor(node / M)][node % M] = 0;

        let neighbors = this.getNeighbors(Math.floor(node / M), node % M, N, M);
        for (let neighbor of neighbors) {
            if (!vis.has(neighbor[0] * M + neighbor[1])) {
                continue;
            }
            // console.log(`neighbor: ${neighbor}`);
            dsu.unite(neighbor[0] * M + neighbor[1], node);
        }
        vis.add(node);
        //console.log('NODE');
    }
    return grid;
  },
  distancebetweenPoints: function(srow, scol, erow, ecol) {
    // as the crow flies? or manhattan
    return Math.abs(srow - erow) + Math.abs(scol - ecol);
    // return Math.sqrt(Math.abs(srow - erow) ** 2 + Math.abs(scol - ecol) ** 2);
  }
};



const Astar = (
    startRow,
    startCol,
    endRow,
    endCol,
    N, 
    M
) => {
  // console.log('Astar called with', startRow, startCol, endRow, endCol, N,  M);
  const getNeighbors = function (row, col, N, M) {
    const rowv = [-1, 0, 1, 0];
    const colv = [0, 1, 0, -1];
    let neighbors = [];
    for (let i = 0; i < rowv.length; ++i) {
        let rr = row + rowv[i], cc = col + colv[i];
        if (rr < 0 || cc < 0 || rr >= N || cc >= M) continue;
        let bad = false;
        // console.log(rr, cc, getTile(cc, rr));
        for (let sprite of getTile(cc, rr)) {
          // console.log(rr, cc, sprite);
          if (sprite._type === water || sprite._type === trap) {
            bad = true;
            break;
          }
        }
        // console.log('bad', bad);
        if (bad) continue;
        neighbors.push([rr, cc]);
    }
    return neighbors;
  };
  const distancebetweenPoints = function(srow, scol, erow, ecol) {
    // as the crow flies? or manhattan
    return Math.abs(srow - erow) + Math.abs(scol - ecol);
    // return Math.sqrt(Math.abs(srow - erow) ** 2 + Math.abs(scol - ecol) ** 2);
  };
  
    let q = new PriorityQueue((a, b) => {
        // a[0] = distance 
        // b[0] = distance
        let a_dist = distancebetweenPoints(a[1][0], a[1][1], endRow, endCol);
        let b_dist = distancebetweenPoints(b[1][0], b[1][1], endRow, endCol);
        // console.log(`A_DIST: ${a_dist} B_DIST: ${b_dist} A: ${a[1]} B: ${b[1]}`);
        return a_dist < b_dist;
    });
    q.push([0, [startRow, startCol]]);
    // console.log('N, M', N, M, typeof(N), typeof(M));
    let vis = new Array(N * M + 1);
    let par = new Array(N * M + 1);
    const INF = 1e9;
    vis.fill(INF);
    par.fill(-2);
    vis[startRow * M + startCol] = 0;
    par[startRow * M + startCol] = -1;
    let visList = [];
    while (q.size() > 0) {
        let [_, [row, col]] = q.pop() || [0, 0];
        if (Number.isNaN(row) || Number.isNaN(col)) return [[], []];
        visList.push([row, col]);
        // console.log(`row: ${row}, col: ${col}`);
        if (row == endRow && col == endCol) {
            break;
        }
        for (let neighbor of getNeighbors(row, col, N, M)) {
            let neighbor1 = neighbor;
            let [rr, cc] = neighbor1;
            if (vis[rr * M + cc] > vis[row * M + col] + 1) {
                vis[rr * M + cc] = vis[row * M + col] + 1;
                par[rr * M + cc] = row * M + col;
                q.push([vis[rr * M + cc], [rr, cc]]);
            }
        }
    }
    // console.log('DONE WITH BFS');

    return [par, visList];
};

// const generateMaze = (N, M) => {
//   const newMaze = mazeLib.generateMaze(N, M);
//   for (let i = 0; i < newMaze.length; ++i) {
//     for (let j = 0; j < newMaze[i].length; ++j) {
//       if (newMaze[i][j] == 1) {
//         addSprite(i, j, water);
//       }
//     }
//   }
// }

const player = "p"
const water = "w"
const endSquare = "e"
const trap = "t"
const bruh = performance.now() // can't use startTime, is defined implicitly by sprig engine

setSolids([player, water])

const pbitMap = `................
................
.....CCCCC......
....CCCCCCCC....
...CCC889CCCC...
...CC8889CCCCC..
...C99899CCCCC..
...90999CCCCCC..
..09099CCCCCC9..
..9998999CC999..
...99999999999..
.....99999999...
.....999..99....
................
................
................`.split('\n')

let reversedPBitMap = ''
for (let i = 0; i < pbitMap.length; ++i) {
  reversedPBitMap += pbitMap[i].split("").reverse().join("") + "\n"
}

let legend = [];
const updateLegend = (...updateArrays) => {
  for (let arr of updateArrays) {
    let found = false;
    for (let i = 0; i < legend.length; ++i) {
      if (arr[0] == legend[i][0]) {
        found = true;
        legend[i][1] = arr[1];
      }
    }
    if (!found) {
      legend.push(arr);
    }
  }
};

updateLegend(
  [ player, bitmap`
................
................
.....CCCCC......
....CCCCCCCC....
...CCC889CCCC...
...CC8889CCCCC..
...C99899CCCCC..
...90999CCCCCC..
..09099CCCCCC9..
..9998999CC999..
...99999999999..
.....99999999...
.....999..99....
................
................
................`],
  [ water, bitmap`
................
................
................
................
................
................
.......222222...
......2277772...
......2777772222
.222227777222222
2222777777227777
7777777777777777
7755777777557777
5555555555555555
5555555555555555
5555555555555555`],
  [ endSquare, bitmap`
....00000000....
...04444004D0...
...0D44D444D0...
....0D111D00....
...03D1D1130....
..03333333330...
..03323332330...
..03323332330...
..03333333330...
..03333333330...
...0333333330...
...0333333300...
....03333330....
....0033300.....
.....00330......
.......00.......`],
  [ trap, bitmap`
....66666666....
0000000000000000
0333336666333330
0333336666333330
0333336666333330
0333336666333330
0333336666333330
0000000000000000
.33333666633333.
.33333666633333.
.33333666633333.
.33333666633333.
.33333666633333.
.33333666633333.
.33333333333333.
.33333333333333.`],
  [shortestPathTile, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`]
)

setLegend(...legend)

let deaths = 0

let level = 0
let levels = [
  map`
pwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww
wwwwwwwwwwwwwwww`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

let settingUp = true;
// setup game
const curGrid = levels[level].split("\n");
setTimeout(() => {
  const levelSizes = [4, 8, 8, 8, 10, 12, 16, 16, 32];
  const all = [];
  for (let i = 0; i < levelSizes.length; ++i) {
    const N = levelSizes[i];
    let curMaze = mazeLib.generateMaze(N, N);
    // add some traps by removing some of the walls to be traps
    // up to numWalls / 2 traps (statistically?)
    let numWalls = 0;
    let curGrid = []
    for (let row = 0; row < N; ++row) {
      curGrid.push([])
      for (let col = 0; col < N; ++col) {
        let chr = curMaze[row][col] === 1 ? water : '.';
        if (chr == water && Math.random() < 0.5) {
          chr = trap;
        }
        curGrid[curGrid.length - 1].push(chr);
      }
    }
    curGrid[0][0] = player
    curGrid[N - 1][N - 1] = endSquare
    all.push(curGrid.map(x => x.join("")).join("\n"))
  }
  levels = all

  addText("Welcome!", {
    x: 4, y: 4, color: color`H`
  })
  addText("to Porky's Maze!", {
    x: 2, y: 10, color: color`8`
  });
  setTimeout(() => {
    clearText()
    setMap(levels[level])
    settingUp = false;
    // startTime = performance.now()
  }, 2000);
}, (curGrid.length + 1) * 200);
for (let i = 0; i < curGrid.length; ++i) {
  setTimeout(() => {
    curGrid[i] = curGrid[i].replaceAll('w', '.')
    setMap(curGrid.join("\n"))
  }, i * 200);
}

onInput("s", () => {
  if (settingUp) return;
  if (!getFirst(player)) return;
  getFirst(player).y += 1
})

onInput("w", () => {
  if (settingUp) return;
  if (!getFirst(player)) return;
  getFirst(player).y -= 1
})

onInput("d", () => {
  if (settingUp) return;
  if (!getFirst(player)) return;
  getFirst(player).x += 1
  updateLegend([player, reversedPBitMap]);
  setLegend(...legend);
})

onInput("a", () => {
  if (settingUp) return;
  if (!getFirst(player)) return;
  getFirst(player).x -= 1
  updateLegend([player, pbitMap.join("\n")])
  setLegend(...legend)
})

const convNumberToPos = (number, N) => {
	return [Math.floor(number / N), number % N];
};
onInput("i", () => {
  if (settingUp) return;
  if (!getFirst(player)) return;
  const N = levels[level].split("\n").length;
  // console.log('N - 1', N - 1);
  let [parentArray, visList] = Astar(getFirst(player).y, getFirst(player).x, N - 1, N - 1, N, N);
  // console.log(parentArray, visList);
  const grid = levels[level].split("\n").map(row => row.split(""));
  let [endRow, endCol] = [N - 1, N - 1];
  const path = [];
  while (parentArray[endRow * N + endCol] != -1) {
    if (Number.isNaN(endRow) || Number.isNaN(endCol)) break;
    path.push([endRow, endCol]);
    //console.log(parentArray.length, parentArray);
    //console.log('HELP', [endRow, endCol]);
    //console.log(parentArray[endRow * N + endCol]);
    [endRow, endCol] = convNumberToPos(parentArray[endRow * N + endCol], N);
  }
  for (let [row, col] of path) {
    addSprite(col, row, shortestPathTile)
  }
});

onInput("j", () => {
  if (settingUp) return;
  if (!getFirst(player)) return;
  setMap(levels[level]);
});

afterInput(() => {
  const N = levels[level].split("\n").length;

  // check for if on trap
  const sprites = getTile(getFirst(player).x, getFirst(player).y);
  let hasTrap = false;
  for (let sprite of sprites) {
    if (sprite._type == trap) {
      hasTrap = true;
      break;
    }
  }

  if (hasTrap) {
    ++deaths
    playTune(deathSound)
    setMap(levels[level])
  }
  // console.log('sprites', sprites);

  
  const endTileSprites = getTile(N - 1, N - 1);
  
  let reachedEnd = false;
  for (let sprite of endTileSprites) {
    if (sprite._type === player) {
      reachedEnd = true;
    }
  }
  if (reachedEnd && level != levels.length - 1) {
    
    playTune(foundBerry);
    // level += 1
    // console.log(levels[level], '\n')
    // console.log(legend)
    // setLegend(...legend)
    // console.log(levels[level + 1])
    setMap(levels[++level])
  } else if (reachedEnd) {
    // finished game
    themePlayback.end();
    for (let i = 0; i < N; ++i) {
      for (let j = 0; j < N; ++j) {
        clearTile(i, j)
      }
    }
    playTune(endTheme);
    let seconds = Math.floor((performance.now() - bruh) / 1000 * 100) / 100;
    addText("Game over", {x: 2, y: 4, color: color`4`})
    addText(`${deaths} deaths!`, {x: 2, y: 6, color: color`3`})
    addText(`${seconds} seconds!`, {x: 2, y: 8, color: color`5`})
  }
  // if reached end
  // if (reachedEnd && level != levels.length - 1) {
  //   setMap(levels[++level])
  // }
})
