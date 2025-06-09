
/* 
@title: Infinite maze
@description: A game where you try to collect as much cherry as posible without falling behind
@author: Thai Bao Anh (tab1540)
@tags: []
@addedOn: 2025-06-09
*/

const player = "p";
const wall = "w";
const wallBroken = "b";
const wolf = "d";
const cherry = "c";
const tomb = "t";
const sky = "s";

setLegend(
	[ player, bitmap`
................
........555...1.
.......5..5...1.
.......5..5...1.
.......5.55...1.
.......555....1.
.......333....1.
..33333..555..1.
33.......5.55LLL
.........5....C.
.........5....C.
........55......
........55......
.......5..55....
......5.....5...
.....55......5..` ],
	[ wall, bitmap`
LLLL1LLLLL11LLLL
LLLL1LLLL11LLLLL
LLLL111L11L0LLLL
LL0L1L111LLLLLL1
11LL1LLL11LLLL11
LL11LLLLL11LL1LL
LLLL1LL0LL111LLL
LLLL1LLLL11LL10L
L0LL111111LLLL1L
LLL1LLLLL1L0LLL1
LL11L0LL11LLLLL1
111LLL1111LLL11L
1L11L11LL1LL1111
LLL111LLL1111LLL
L0LLL1L0LL11LLLL
LLLLL1LLLLL1L0LL` ],
	[ wallBroken, bitmap`
................
................
L...1.1.........
LL...L......LL.1
11.L.L...1LLLL11
LL11L..LL11LL1LL
LLLL1L.0LL111LLL
LLLL1L.LL11LL10L
L0LL111111LLLL1L
LLL1LLLLL1L0LLL1
LL11L0LL11LLLLL1
111LLL1111LLL11L
1L11L11LL1LL1111
LLL111LLL1111LLL
L0LLL1L0LL11LLLL
LLLLL1LLLLL1L0LL` ],
	[ wolf, bitmap`
................
................
................
................
................
.........0000...
0.......00..0...
00......0..300..
..0000000..3333.
.00.....0003300.
0........00003..
000000000000.3..
.000.....0......
.0.0.....00.....
00..0....0.0....
0....0..0..0....` ],
	[ cherry, bitmap`
................
............0...
...........00...
...........0....
..........00....
..........0.....
........000.....
.......00.0.....
......00..0.....
.....0....3333..
.3333....33333..
.333333..333333.
3333333.3333333.
3333333..33333..
3333333....33...
..333...........` ],
	[ tomb, bitmap`
................
................
................
................
..........11....
..........L1....
..........L1....
........1111111.
.........111111.
..........L1....
..........L1....
..........L1....
........1.L1....
.......1L.L1....
.CCCFCCCCFFCCCC.
CFCFFFFFCCCCFFFC` ],
	[ sky, bitmap`
................
7...............
..7.............
.....7..........
................
.......7........
..........7.....
..........7.....
............77..
.............777
...............7
................
................
................
................
................` ],
)

let level = 0;
const levels = [
	map`
....................
....................
....................
....................
....................
.....d..............
....www.............
....w.w.............
....w.w.............
....w.w.............
....w.w.............
...wwwww............
wwww...wwww.........
w..w...w..w.........
w..w...w..w.........
w..w...w..wp........`,
	map`
....................
....................
....................
....................
....................
....................
....................
.....bb.............
....bww.............
....w.w.............
....w.w.............
...wwwwb............
bwww...w............
w..w...wb...........
w..w...wwbb.........
w..w...w..wp...dt...`
];

let maze = [];
let mazeWeight = [];

setMap(levels[level]);

let wid = width() - 7, hei = height();

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

let lastY = 7;

function dfs(x, y) {
    mazeWeight[x][y] = 100001;

    if (x == wid - 1) lastY = y;

    // top
    if (y > 0) mazeWeight[x][y - 1]++;
    // right
    if (x + 1 < wid) mazeWeight[x + 1][y]++;
    // bottom
    if (y + 1 < hei) mazeWeight[x][y + 1]++;
    // left
    if (x > 0) mazeWeight[x - 1][y]++;

    let moves = [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0]
    ];

    shuffleArray(moves);

    for (let i = 0; i < 4; i++) {
        let xx = x + moves[i][0];
        let yy = y + moves[i][1];

        if (xx > 0 && xx < wid && yy > -1 && yy < hei && mazeWeight[xx][yy] < 2) {
            dfs(xx, yy);
            console.log({xx, yy});
        }
    }
}

function genNewMaze(y) {
    maze = [];
    mazeWeight = []; 

    for (let i = 0; i < wid; i++) {
        maze.push(new Array(hei));
        mazeWeight.push(new Array(hei));
        maze[i].fill("w");
        mazeWeight[i].fill(0);
    }

    dfs(0, y);

    for (let xx = 0; xx < wid; xx++) {
        for (let yy = 0; yy < hei; yy++) {
            if (mazeWeight[xx][yy] > 100000) maze[xx][yy] = ".";
        }
    }

    let xx = Math.floor(Math.random() * 1000000000);
    let yy = Math.floor(Math.random() * 2000000000);

    xx %= wid;
    yy %= hei;

    console.log({xx, yy});

    if (maze[xx][yy] == ".") maze[xx][yy] = cherry; 

    console.log(maze);
    console.log(mazeWeight);
}

genNewMaze(lastY);


let line = 0;
function moveLeft() {
    for (let i = 0; i < hei; i++) clearTile(0, i);
    let allTits = getAll();

    for (let i = 0; i < allTits.length; i++) {
        allTits[i].x--;
    }

    for (let i = 0; i < hei; i++) addSprite(width() - 1, i, maze[line][i]);

    line++;

    if (line == wid) {
        line = 0;
        genNewMaze(lastY);
    }
}

let moved = 0;

const cherrySound = tune`
294.11764705882354,
147.05882352941177: D4/147.05882352941177,
147.05882352941177,
147.05882352941177: E4/147.05882352941177 + G4/147.05882352941177,
147.05882352941177,
147.05882352941177: F4/147.05882352941177,
147.05882352941177,
147.05882352941177: G4/147.05882352941177,
147.05882352941177: A4/147.05882352941177,
147.05882352941177,
147.05882352941177: B4/147.05882352941177 + G4/147.05882352941177,
147.05882352941177: G4/147.05882352941177,
147.05882352941177: G4/147.05882352941177,
147.05882352941177: F4/147.05882352941177,
147.05882352941177: C5/147.05882352941177,
147.05882352941177: B4/147.05882352941177,
147.05882352941177: A4/147.05882352941177,
147.05882352941177: B4/147.05882352941177 + G4/147.05882352941177,
1911.764705882353`;
const deadSound = tune`
117.1875: C4-117.1875,
117.1875: C4-117.1875,
117.1875: C4-117.1875,
117.1875: C4-117.1875,
117.1875: C4-117.1875 + D4-117.1875,
117.1875: C4~117.1875 + E4-117.1875,
117.1875,
117.1875: C4~117.1875 + E4-117.1875,
117.1875: D4^117.1875 + E4-117.1875,
117.1875: D4^117.1875,
117.1875: F4-117.1875,
117.1875: C4~117.1875,
117.1875,
117.1875: C4~117.1875 + D4^117.1875 + F4-117.1875,
117.1875: F4-117.1875,
117.1875: C4^117.1875,
117.1875: F4-117.1875,
117.1875: C4^117.1875,
117.1875: E4-117.1875,
117.1875: E4-117.1875,
117.1875: C4^117.1875 + D4-117.1875 + E4-117.1875,
117.1875: C4~117.1875,
117.1875: E4^117.1875 + F4/117.1875,
117.1875: E4^117.1875 + F4/117.1875 + A4/117.1875,
117.1875: A4/117.1875,
117.1875: C4~117.1875 + D4/117.1875,
117.1875: E4^117.1875 + D4/117.1875 + F4/117.1875 + B4/117.1875,
117.1875: E4^117.1875 + D4/117.1875 + F4/117.1875 + B4/117.1875,
117.1875: C4~117.1875 + E4^117.1875 + D4/117.1875,
117.1875: D4/117.1875 + F4/117.1875 + G4/117.1875,
117.1875: D4/117.1875 + F4/117.1875,
117.1875: F4/117.1875`;

let point = 0;

const countDown = 3;

let untilMove = 3;

let playerAlive = true;

setBackground(sky);

afterInput(() => {
    untilMove--;

    if (untilMove == 0) {
        untilMove = countDown;

        moveLeft();
    }

    if (getAll(player).length == 0) {
        clearText()
        playTune(deadSound, 1);
        playerAlive = false;

        setMap(levels[1]);

        addText("WASTED", { 
            x: 7,
            y: 3,
            color: color`3`
        });
        addText("total scores: " + point, { 
            x: 2,
            y: 5,
            color: color`3`
        });
        addText("total turns: " + moved, { 
            x: 2,
            y: 6,
            color: color`3`
        });

        addText("K to reset", { 
            x: 5,
            y: 10,
            color: color`D`
        });

      return;
    }

    if (!playerAlive) return;

    moved++;
  
    clearText()

    if (getAll(player).length) if (getTile(getFirst(player).x, getFirst(player).y).find(({type}) => type == cherry)) {
        point++;
        let x = getFirst(player).x, y = getFirst(player).y;
        clearTile(getFirst(player).x, getFirst(player).y);
        addSprite(x, y, player);
        playTune(cherrySound, 1);

        setBackground(cherry);
        setTimeout(() => {setBackground(sky)}, 300);
        setTimeout(() => {setBackground(cherry)}, 600);
        setTimeout(() => {setBackground(sky)}, 900);
        setTimeout(() => {setBackground(cherry)}, 1200);
        setTimeout(() => {setBackground(sky)}, 1500);
        setTimeout(() => {setBackground(cherry)}, 1800);
        setTimeout(() => {setBackground(sky)}, 2100);
        setTimeout(() => {setBackground(cherry)}, 2400);
        setTimeout(() => {setBackground(sky)}, 2700);
    }

    
    addText("move in " + untilMove + " turn!", { 
        x: 3,
        y: 2,
        color: color`3`
    });
    addText("score: " + point + "", { 
        x: 6,
        y: 3,
        color: color`F`
    });
})

onInput("s", () => { 
	if (getAll(player).length) if (getTile(getFirst(player).x, getFirst(player).y + 1).find(({type}) => type == wall)) {} else getFirst(player).y += 1;
});
onInput("w", () => {
	if (getAll(player).length) if (getTile(getFirst(player).x, getFirst(player).y - 1).find(({type}) => type == wall)) {} else getFirst(player).y -= 1;
});
onInput("d", () => {
	if (getAll(player).length) if (getTile(getFirst(player).x + 1, getFirst(player).y).find(({type}) => type == wall)) {} else getFirst(player).x += 1;
});
onInput("a", () => {
	if (getAll(player).length) if (getTile(getFirst(player).x - 1, getFirst(player).y).find(({type}) => type == wall)) {} else getFirst(player).x -= 1;
});


onInput("k", () => {
    playerAlive = true;
    setMap(levels[0]);
    point = 0;
    moved = 0;
    untilMove = 3;
});