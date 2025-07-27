/*
@title: Battery Blitz
@description TODO
@author Cybdo

*/

const player = "p";
const battery = "b";
const wall = "w";
const gray = "g"; 
const door = "d";
const hazard = "h";
const star = "s";

setLegend(
  [ player, bitmap`
................
................
.....5555555....
....555555555...
...55575557555..
...55575557555..
...55555555555..
...55555555555..
...57555555575..
...57755555775..
...55777777755..
....555555555...
.....5555555....
................
................
................` ],
  [ battery, bitmap`
................
.......1L.......
.....666666.....
.....666666.....
.....1L0000.....
.....L00000.....
.....1L0000.....
.....L00000.....
.....1L0000.....
.....L00000.....
.....1L0000.....
.....L00000.....
.....1L0000.....
.....L00000.....
................
................` ],
  [ wall, bitmap`
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
0000000000000000` ],
  [ gray, bitmap`
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
1111111111111111`],
  [ hazard, bitmap`
................
................
................
...0000000000...
...0666666660...
...0666006660...
...0666006660...
...0666006660...
...0666006660...
...0666666660...
...0666006660...
...0666666660...
...0000000000...
................
................
................` ],
  [ star, bitmap`
................
................
.......66.......
......6666......
......6666......
...6666666666...
...6666666666...
....66666666....
.....666666.....
......6666......
.....666666.....
....66666666....
...6666..6666...
...666....666...
................
................` ],
  [ door, bitmap`
................
....00000000....
....02222220....
....02222220....
....02222220....
....02222220....
....02222220....
....02222100....
....02222220....
....02222220....
....02222220....
....02222220....
....02222220....
....00000000....
................
................` ]
);

setBackground(gray);
setSolids([player, wall, door, hazard]);
setPushables({ [player]: [hazard] });

let energy = 30; // seconds
let score = 0;
let gameOver = false;
let gameWon = false;

const levels = [
  map`
wwwwwwwwww
wp..b....w
wwwwwwwwbw
w....s...w
wbwwwwwwww
w....b..dw
wwwwwwwwww`,
  map`
wwwwwwwwww
ww...b..sw
wb.wwwwbww
w.wbph...w
wh.wwwwwww
w..b...bdw
wwwwwwwwww`,
];
const levelEnergy = [
  5,
  3
]

let level = 0;

function loadLevel() {
  if (level < levels.length) {
    energy = levelEnergy[level];
    setMap(levels[level]);
    gameOver = 0;
  } else {
    // Set win flag instead of drawing text directly
    gameWon = true;
    setMap(map`
gggg
gggg
gggg`);
  }
}

loadLevel();

addText(`Energy: ${energy}`, { x: 0, y: 0, color: color`5` });
addText(`Score : ${score}`, { x: 0, y: 1, color: color`6` });

// Input controls
onInput("w", () => move(0, -1));
onInput("s", () => move(0, 1));
onInput("a", () => move(-1, 0));
onInput("d", () => move(1, 0));
onInput("j", () => loadLevel());
onInput("k", () => interact());

function interact () {
  let me = getFirst(player);
  let adjacent = [
    { x: me.x + 1, y: me.y },
    { x: me.x - 1, y: me.y },
    { x: me.x, y: me.y + 1 },
    { x: me.x, y: me.y - 1 }
  ];

  for (let spot of adjacent) {
    let tile = getTile(spot.x, spot.y);
    tile.forEach(obj => {
      if (obj.type === door && energy >= 5) {
        energy -= 5;
        clearTile(spot.x, spot.y);
        score += 10;
        level += 1;
        loadLevel();

      }
    });
  }


}

function move(dx, dy) {
  if (!gameOver){
    let me = getFirst(player);
    const nx = me.x + dx;
    const ny = me.y + dy;
    const target = getTile(nx, ny);
    if (!target.some(s => [wall, door].includes(s.type))) {
      me.x = nx;
      me.y = ny;
      energy -= 1;
      // battery pickup
      getTile(nx, ny).forEach(s => {
        if (s.type === battery) {
          energy += 5;
          s.remove();
        }
        if (getTile(nx+dx,ny+dy) === hazard) {
          energy -= 1;
        }
        if (s.type === star) {
          energy += 5;
          score += 3
          s.remove();
        }
      });
    }
  }
}

// Run after each action
afterInput(() => {
  clearText();

    if (gameWon) {
    addText("You Win!", { x: 3, y: 5, color: color`5` });
    addText(`Score : ${score}`, { x: 3, y: 7, color: color`6`});
    return; // Stop any further processing
  }

  addText(`Energy: ${energy}`, { x: 0, y: 0, color: color`5` });
  addText(`Score : ${score}`, { x: 0, y: 1, color: color`6`});
  if (energy <= 0) {
    clearText();
    setMap(map`
gggg
gggg
gggg`); 
    addText("GAME OVER", { x: 3, y: 5, color: color`3` });
    addText(`Energy: ${energy}`, { x: 3, y: 7, color: color`5` });
    addText(`Score : ${score}`, { x: 3, y: 9, color: color`6`});
    gameOver = true;
    
  }
});
