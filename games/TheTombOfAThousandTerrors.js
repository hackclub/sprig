/*
@title: The Tomb of a Thousand (T)errors
@author: Fabian
@tags: ['puzzle']
@addedOn: 2022-09-13
*/

const splash = "s";
const player = "p";
const wall = "w";
const grass = "g";

const key1 = "A";
const key2 = "B";

const door1 = "I";
const door2 = "J";

const diamond = "X";

const theVoid = 'x';
const theVoid2 = 'y';
const theVoid3 = 'z';

const movedTune = tune`
16000`;
const pickedUpKeyTune = tune`
125: c4~125,
125: e4~125,
3750`;
const pickedUpDiamondTune = tune`
125: g4~125,
125: c5~125,
125: f5~125,
3625`;
const openedDoorTune = tune`
125,
125: c4~125,
125: g4~125,
125: d5~125,
125: f5~125,
125: a5~125,
125: b5~125,
3125`;
const splashTune = tune`
1200,
300: c4~300,
300: c4~300,
1500,
300: c4~300,
300: c4~300,
1500,
300: c4~300,
300: c4~300,
1500,
300: c4~300,
300: c4~300,
1500`

// Blocks in Maze
const Type = {
  Blocked: wall,
  Free: grass,
};

const viewportX = 10;
const viewportY = 8;
const playerOffset = [-1, -1];

var bgSound = null;

const voids = [theVoid, theVoid2, theVoid3];
function getVoid(x, y) {
  var t = iAmNoHash(x,y);
  t = t % voids.length;
  return voids[t];
} 

setLegend(
  [splash, bitmap`
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
  [ player, bitmap`
................
......3330......
......333.0.....
......333.......
...000000000....
..00000000000...
..002L0002L000..
..0022000220000.
..0000000000000.
..000000000000..
...00000000000..
...0000000000...
.....000000.....
.....0....0.....
.....0....0.....
.....0....0.....`],
  [ wall, bitmap`
1L1111L1111L1111
1L1111L1111L1111
1L1111L1111L1111
LLLLLLLLLLLLLLLL
111L11111L1111L1
111L11111L1111L1
111L11111L1111L1
LLLLLLLLLLLLLLLL
11L1111L11111L11
11L1111L11111L11
11L1111L11111L11
LLLLLLLLLLLLLLLL
1111L1111L1111L1
1111L1111L1111L1
1111L1111L1111L1
LLLLLLLLLLLLLLLL`],
  [ grass, bitmap`
4444444444444444
4422444444444444
4444444444444444
4444444224444444
4444444444444224
4444444444444444
4444444444444444
4442244444444444
4444444444444444
4444444444444444
4444444444444444
4444444444422444
4442244444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ theVoid, bitmap`
0000000000000000
0000000000002000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0002000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000002000
0000000000000000
0000000000000000`],
  [ theVoid2, bitmap`
0000000000000000
0000002000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000020000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [ theVoid3, bitmap`
0000000000000000
0000000020000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000020
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000200000000000
0000000000000000`],
  [ key1, bitmap`
................
................
................
................
........66666661
........66666661
.666666666333661
.666666666333661
.666666666333661
.661611166666661
.66161..66666661
.11.1...11111111
................
................
................
................`],
  [ key2, bitmap`
................
................
................
................
........66666661
........66666661
.666666666555661
.666666666555661
.666666666555661
.661611166666661
.66161..66666661
.11.1...11111111
................
................
................
................`],
  [ door1, bitmap`
.....LLLLLL0....
....LLL33LLL0...
...LLLL33LLLL0..
..LLLLLLLLLLLL0.
..L1111LL1111L0.
..L1111LL1111L0.
..L1111LL1111L0.
..L1111LL1111L0.
..L111LLLL111L0.
..L111L00L111L0.
..L111LLLL111L0.
..L1111LL1111L0.
..L1111LL1111L0.
..L1111LL1111L0.
..L1111LL1111L0.
..LLLLLLLLLLLL0.`],
  [ door2, bitmap`
.....LLLLLL0....
....LL3355LL0...
...LLL3355LLL0..
..LLLLLLLLLLLL0.
..L1111LL1111L0.
..L1111LL1111L0.
..L1111LL1111L0.
..L1111LL1111L0.
..L111LLLL111L0.
..L111L00L111L0.
..L111LLLL111L0.
..L1111LL1111L0.
..L1111LL1111L0.
..L1111LL1111L0.
..L1111LL1111L0.
..LLLLLLLLLLLL0.`],
  [ diamond, bitmap`
.......2........
......272.......
.....27722......
.....27272......
....2772772.....
...277727772....
...277277772....
..27772777772...
...277277772....
...277727772....
....2772772.....
....2772772.....
.....27722......
.....2772.......
......272.......
.......2........`],
);

setSolids([player, wall, theVoid, theVoid2, theVoid3]);
setPushables({
  [ player ]: [],
});

const globalState = {
  level: 0,
  points: 0,
}

var levelState = {
  initialMove: true,
  inventory: new Set(),
  centerX: null,
  centerY: null,
  map: null,
  started: false,
  mapSizeX: 0,
  mapSizeY: 0,
  name: "Tomb of a thousand terrors",
}

const levels = [
  { size: [13,9], keys: 1, diamonds: 1 }, //1
  { size: [15,11], keys: 1, diamonds: 1 }, //2
  { size: [17,13], keys: 2, diamonds: 2 }, //3
  { size: [19,13], keys: 2, diamonds: 2 }, //4
  { size: [21,13], keys: 2, diamonds: 2 }, //5
  { size: [21,15], keys: 2, diamonds: 3 }, //6
  { size: [25, 15], keys: 2, diamonds: 3 }, //7
  { size: [28, 15], keys: 2, diamonds: 3 }, //8
  { size: [25, 21], keys: 2, diamonds: 3 }, //9
  { size: [35,35], keys: 2, diamonds: 4 }, //10
]

const maps = [
  map`
zzxxyyyyy
xyyxzzyyy
zyxzyxyyy
xyzyxxxyx
xyyxyzyyy
zzxyxzzxx
zxzzyyzyx`,
];

// START
levelSplash();


function startLevel() {
  if (bgSound) {
    bgSound.end();
    bgSound = null;
  }
    
  clearText();
  
  let lvl = Math.min(globalState.level, levels.length -1);
  let def = levels[lvl];

  levelState.mapSizeX = def.size[0];
  levelState.mapSizeY = def.size[1];
  levelState.map = getGridFunction(levelState.mapSizeX, levelState.mapSizeY);
  levelState.map = generatePrimMaze(levelState.map);

  let objects = [];
  objects.push(key1);
  if (def.keys > 1) {
    objects.push(key2); 
    objects.push(door2);
  } else {
    objects.push(door1);
  }

  for (let i = 0; i < def.diamonds; i++) {
    objects.push(diamond);
  }
  
  placeObjects(levelState.map, objects, levelState.map._start);
  
  setCurrentMapSlice();
  setBackground(grass);
  levelState.started = true;
}

function levelSplash() {
  levelState = {
    initialMove: true,
    inventory: new Set(),
    centerX: null,
    centerY: null,
    map: null,
    started: false,
    mapSizeX: 0,
    mapSizeY: 0,
    name: getRandomDungeonName(),
  };

  setMap(maps[0]);
  
  addText("Entering", { x: 6, y: 4, color: color`6`});  
  
  let names = levelState.name.match(/(.{1,16})/g);
  for(let i = 0; i < names.length; i++) {
    let name = names[i].trim();
    let offset = 2 + Math.floor((16 - name.length) / 2);
    addText(name, { x: offset, y: 7 + i * 2, color: color`6`});  
  }

  let pointsText = "Points: " + globalState.points;
  pointsText += globalState.points === 0 ? " (yet)" : "";
  let offset = 2 + Math.floor((16 - pointsText.length) / 2);
  addText(pointsText, { x: offset, y: 14, color: color`7`}); 

  // try {
  //   bgSound = playTune(splashTune, Infinity);
  // } 
  // catch(e) {
  // }
}

function nextLevel() {
  globalState.level++;
  globalState.points += globalState.level * 1000;

  levelSplash();
}

onInput("s", () => {
  move(0, 1);
});
onInput("w", () => {
  move(0, -1);
});

onInput("a", () => {
  move(-1, 0);
});
onInput("d", () => {
  move(1,0);
});

var moved = null;
function move(dx, dy) {
  
  if (levelState.initialMove) {
    startLevel();
    levelState.initialMove = false;
    return;
  }
  var p = getFirst(player);

  let oldX = p.x, oldY = p.y;
  
  p.x += dx;
  p.y += dy;

  moved = (oldX != p.x || oldY != p.y) ?  { dx, dy } : null;

  if (moved) {
    playTune(movedTune);
  }
}
  

afterInput(() => {
  if(moved) {
    setCurrentMapSlice(moved.dx, moved.dy);
  }

  var pk1 = tilesWith(player, key1);
  if (pk1.length){
    levelState.inventory.add(key1);
    playTune(pickedUpKeyTune);
    removeObjectFromCurrentTile(pk1[0]);
  }

  var pk2 = tilesWith(player, key2);
  if (pk2.length){
    levelState.inventory.add(key2);
    playTune(pickedUpKeyTune);
    removeObjectFromCurrentTile(pk2[0]);
  }

  var pdia = tilesWith(player, diamond);
  if (pdia.length){
    levelState.inventory.add(diamond);
    playTune(pickedUpDiamondTune);

    globalState.points += 500;
    removeObjectFromCurrentTile(pdia[0]);
  }

  if(tilesWith(player, door1).length && levelState.inventory.has(key1)){
    playTune(openedDoorTune);
    nextLevel();
  }

  if(tilesWith(player, door2).length && levelState.inventory.has(key1) && levelState.inventory.has(key2) ){
    playTune(openedDoorTune);
    nextLevel();
  }  
});

function setCurrentMapSlice(dx,dy) {
  if(levelState.map && levelState.centerX == null) levelState.centerX = levelState.map._start.x + 1;
  if(levelState.map && levelState.centerY == null) levelState.centerY = levelState.map._start.y + 1;

  var x, y;
  dx = dx || 0;
  dy = dy || 0;

  levelState.centerX += dx;
  levelState.centerY += dy;


  var slice = getMapSlice(levelState.centerX, levelState.centerY, false);
  setMap(slice);
  addSprite(Math.floor(viewportX / 2 -1), Math.floor(viewportY/2 -1), player);
}

function removeObjectFromCurrentTile(sprites) {
  if (levelState.centerX == null || levelState.centerY == null)
    return;

  setTile(levelState.centerX + playerOffset[0], levelState.centerY + playerOffset[1], grass);

  for (let sprite of sprites) {
    if (sprite.type !== player) {
      sprite.remove();
    }      
  }
}

function getMapSlice(centerX, centerY, setPlayerInCenter = true, sizeX = viewportX, sizeY = viewportY) {
  let sxh = Math.floor(sizeX / 2);
  let syh = Math.floor(sizeY / 2);

  var slice = '';
  for (let y = centerY - syh; y < (centerY + sizeY - syh); y++) {
    for (let x = centerX - sxh; x < (centerX + sizeX - sxh); x ++) {
      let tile;

      if (setPlayerInCenter && x == centerX + playerOffset[0] && y == centerY + playerOffset[1]) {
        //clearTile(x, y);
        tile = player;
      } else {
        tile = getMapTile(x,y);
      }
      slice += tile;
    }
    slice += '\n';
  }
  return slice;
}

function getMapTile(x,y) {
  let mapSizeX = levelState.mapSizeX;
  let mapSizeY = levelState.mapSizeY;
  
  if (((x == -1 || x == mapSizeX) && y >= -1 && y <= mapSizeY) || ((y == -1 || y == mapSizeY) && x >= -1 && x <= mapSizeX))
    return wall;
  
  if (x < 0 || y < 0 || x >= mapSizeX || y >= mapSizeY)
    return getVoid(x,y);

  let cell = levelState.map[y][x];
  return cell ? cell.type : getVoid(x,y);
}

function setTile(x,y, tile) {
  if (x < 0 || y < 0 || x >= levelState.mapSizeX || y >= levelState.mapSizeY)
    return false;

  let cell = levelState.map[y][x];
  if(!cell)
    return false;
  
  cell.type = tile;
  return true;
}

// Maze generation
function getGridFunction(width, height) {
    var grid = [];

    for (let y = 0; y < height; y++) {
        grid[y] = [];
        for (let x = 0; x < width; x++) {
            let cell = {
                type: Type.Blocked,
                x,
                y,
                neighbours: [],
                visited: false,
            };
            grid[y][x] = cell;

            if (grid[y - 1]) {
                if (grid[y - 1][x]) {
                    let up = grid[y - 1][x];
                    cell.neighbours.push(up);
                    up.neighbours.push(cell);
                }
            }
            if (grid[y][x - 1]) {
                let left = grid[y][x - 1];
                cell.neighbours.push(left);
                left.neighbours.push(cell);
            }
        }
    }

    return grid;
}

function generatePrimMaze(grid) {
    const DIRECTIONS = [[0, 2], [0, -2], [2, 0], [-2, 0]];
    let height = grid.length;
    let width = grid.length ? grid[0].length : 0;

    var frontier = new Set();

    let start = getStartPoint();
    start.type = Type.Free;
    grid._start = start;

    let firstFrontier = getCellsAround(start, Type.Blocked, false);
    for (let f of firstFrontier) {
        frontier.add(f);
    }

    while (frontier.size > 0) {
        let entries = [...frontier.values()];
        let randomIndex = Math.floor(Math.random() * entries.length);

        let frontierCell = entries[randomIndex];
        frontierCell.visited = true;

        var neighbours = getCellsAround(frontierCell, Type.Free);
        var neighbour = neighbours[Math.floor(Math.random() * neighbours.length)];
        if (neighbour) {
            connect(frontierCell, neighbour);
        }

        var frontiers = getCellsAround(frontierCell, Type.Blocked);
        for (let candidate of frontiers) {
            frontier.add(candidate);
        }

        frontier.delete(frontierCell);
    }

    return grid;

    function getStartPoint() {
        let startY = Math.floor(height / 2);
        let startX = Math.floor(width / 2);

        let cell;
        for(let dir of DIRECTIONS) {
           let y = startY + Math.sign(dir[1]);
           let x = startX + Math.sign(dir[0]);

           cell = grid[y][x];

           if(cell.type == Type.Free)
             return cell;
        }

        if (cell.type == Type.Blocked) {
          cell = getRandomPositionInGrid(grid);
        }

        return cell;
    }

    function getCellsAround(cell, typeCheck = true, visited = null) {
        let around = [];
        for (let dir of DIRECTIONS) {
            let xs = cell.x + dir[0];
            let ys = cell.y + dir[1];

            if (isValidPosition(xs, ys) && (typeCheck == null || grid[ys][xs].type === typeCheck) && (visited == null || grid[ys][xs].visited === visited)) {
                around.push(grid[ys][xs]);
            }
        }
        return around;
    }

    function isValidPosition(x, y) {
        return x >= 0 && x < width && y >= 0 && y < height;
    }

    function connect(cellA, cellB) {
        var x = Math.floor((cellA.x + cellB.x) / 2);
        var y = Math.floor((cellA.y + cellB.y) / 2);

        cellA.type = Type.Free;
        cellB.type = Type.Free;
        grid[y][x].type = Type.Free;
    }
}

function placeObjects(grid, objects, ...ignoreCells) {
  var occupiedCells = new Set();

  for (let cell of ignoreCells) {
      occupiedCells.add(cell);

  }

  for (let obj of objects) {
    let cell = getRandomPositionInGrid(grid, occupiedCells);
    cell.type = obj;
    occupiedCells.add(cell);
  }
}

function getRandomPositionInGrid(grid, ignoreCells, tries = 100) {
  var cell;
  for (let i = 0; i < tries; i++) {
      let y = Math.floor(Math.random() * grid.length);
      let x = Math.floor(Math.random() * grid[0].length);

      cell = grid[y][x];
      if (cell.type == Type.Free && (!ignoreCells || !ignoreCells.has(cell))) {
          return cell;
      }
  }

  return cell || grid[0][0];
}

function getRandomDungeonName() {
  // https://thestoryshack.com/tools/dungeon-name-generator/
  const dungeonNames = ["Catacombs of the Lost Orc","Crypt of the Ancient Occult","Grotto of the Doomed Goblin","The Living Dead Pits","Delves of the Unknown Warrior","Pits of the Ruthless Scorpion","Haunt of the Unknown Lion","Dungeon of the Ebon Morass","The Forgotten Maze","Dungeon of the Dishonored Serpent","Tombs of the Enigmatic Monk","Catacombs of the Forsaken King","The Terraced Delves","Caverns of the Lost Ogre","Burrows of the Impostor Legion","Delves of the Silver Phoenix","The Mighty Catacombs","Tunnels of the Storm Serpent","Crypt of the Vanishing Swamp","Tunnels of the Crystal Leopard","Crypt of the Vanishing Swamp","The Dreadful Haunt","Maze of the Granite Witch","Dungeon of the Forgotten Morass","Crypt of the Secret Monk","Labyrinth of the Shunned Eagle","The Earth Dungeon","Lair of the Scarlet Oracle","The Dark Crypt","Lair of the Ancient Morass","The Savage Pits","Vault of the Golden Ogre","Tunnels of the Mad Bear","Caverns of the Whispering Monk","Delves of the Frozen Army","The Scheming Caverns","Catacombs of the Perished Lion","Crypt of the Renegade Mage","The Shrieking Chambers","Dungeon of the Ebon Scorpion","The Arctic Crypt","Quarters of the Betrayed Giant","Maze of the Gentle Monk","Point of the Lost Wolf","Pits of the Scarlet Witch","Delves of the Spirit Forest","Dungeon of the Impostor Ogre","Point of the Storm Morass","Lair of the Poisoned Marsh","Burrows of the Mystic Occult","Maze of the Frozen Cult","Crypt of the Scarlet Orc","Caverns of the Lost Morass","The Black Mountain Point",];
  return dungeonNames[Math.floor(Math.random() * dungeonNames.length)];
}

function iAmNoHash(x,y = x) {
  var t = (123456 << x - 123456 >> y) | Math.abs(x*y);
  t = Math.abs(t);
  return t;
}
