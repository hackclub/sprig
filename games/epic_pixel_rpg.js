/*
@title: Epic Pixel RPG (Complete with Game Over)
@author: None
@description: None
@tags: ['rpg', 'adventure']
@img: ""
@addedOn: 2024-01-01
*/

// ===== SPRITES ===== //
const hero = "h";
const warrior = "w";
const archer = "a";
const mage = "m";
const goblin = "g";
const orc = "o";
const dragon = "d";
const wall = "x";
const floor = "f";
const treasure = "t";
const health = "l";

setLegend(
  [hero, bitmap`
......000.......
.....0...0......
....0.....0.....
....0.0.0.0.....
....0.....0.....
....0000000.....
.....0...0......
....00...00.....
...0.......0....
..0.........0...
.0...........0..
0.............0.
................
................
................
................`],
  [warrior, bitmap`
......000.......
.....0...0......
....0.....0.....
....0.000.0.....
....0.....0.....
....0000000.....
.....0...0......
....00...00.....
...0.......0....
..0.........0...
.0...........0..
0.............0.
................
................
................
................`],
  [archer, bitmap`
......000.......
.....0...0......
....0.....0.....
....0.0.0.0.....
....0.....0.....
....0000000.....
.....0...0......
....00...00.....
...0.......0....
..0...000...0...
.0.........0.0..
0.............0.
................
................
................
................`],
  [mage, bitmap`
......000.......
.....0...0......
....0.....0.....
....0.0.0.0.....
....0.....0.....
....0000000.....
.....0...0......
....00...00.....
...0.......0....
..0...000...0...
.0...0...0...0..
0.............0.
................
................
................
................`],
  [goblin, bitmap`
......000.......
.....0...0......
....0.....0.....
....0.0.0.0.....
....0.....0.....
....0000000.....
.....0...0......
....00...00.....
...0.......0....
..0.........0...
.0...........0..
0.............0.
................
................
................
................`, color`3`],
  [orc, bitmap`
......000.......
.....0...0......
....0.....0.....
....0.000.0.....
....0.....0.....
....0000000.....
.....0...0......
....00...00.....
...0.......0....
..0.........0...
.0...........0..
0.............0.
................
................
................
................`, color`5`],
  [dragon, bitmap`
......000.......
.....0...0......
....0.....0.....
....0.0.0.0.....
....0.....0.....
....0000000.....
.....0...0......
....00...00.....
...0.......0....
..0.........0...
.0...........0..
0.............0.
................
................
................
................`, color`9`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [floor, bitmap`
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
................
................
................
................
................`],
  [treasure, bitmap`
................
.....00000......
....0.....0.....
...0.......0....
...0.......0....
...0.......0....
...0.......0....
...0.......0....
....0.....0.....
.....00000......
................
................
................
................
................
................`],
  [health, bitmap`
................
.....00000......
....0.....0.....
...0.......0....
...0.......0....
...0.......0....
...0.......0....
...0.......0....
....0.....0.....
.....00000......
................
................
................
................
................
................`]
);

// ===== GAME STATE ===== //
let level = 1;
let party = [
  { type: hero, x: 1, y: 1, health: 20, maxHealth: 20, attack: 5 },
  { type: warrior, x: 2, y: 1, health: 25, maxHealth: 25, attack: 4 },
  { type: archer, x: 1, y: 2, health: 15, maxHealth: 15, attack: 6 },
  { type: mage, x: 2, y: 2, health: 18, maxHealth: 18, attack: 7 }
];

let enemies = [];
let items = [];
let mapSize = 8 + level * 2;

// ===== DUNGEON GENERATION ===== //
function generateDungeon() {
  const dungeon = [];
  
  // Create empty dungeon
  for (let y = 0; y < mapSize; y++) {
    dungeon[y] = [];
    for (let x = 0; x < mapSize; x++) {
      dungeon[y][x] = floor;
    }
  }
  
  // Add walls around edges
  for (let x = 0; x < mapSize; x++) {
    dungeon[0][x] = wall;
    dungeon[mapSize-1][x] = wall;
  }
  for (let y = 0; y < mapSize; y++) {
    dungeon[y][0] = wall;
    dungeon[y][mapSize-1] = wall;
  }
  
  // Add random walls
  for (let i = 0; i < mapSize * 2; i++) {
    const x = Math.floor(Math.random() * (mapSize-2)) + 1;
    const y = Math.floor(Math.random() * (mapSize-2)) + 1;
    if (dungeon[y][x] === floor) {
      dungeon[y][x] = wall;
    }
  }
  
  // Place party
  party.forEach((member, i) => {
    const x = 1 + (i % 2);
    const y = 1 + Math.floor(i / 2);
    dungeon[y][x] = member.type;
    member.x = x;
    member.y = y;
  });
  
  // Place enemies
  enemies = [];
  const enemyTypes = [goblin, orc, dragon];
  for (let i = 0; i < 2 + level; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * (mapSize-2)) + 1;
      y = Math.floor(Math.random() * (mapSize-2)) + 1;
    } while (dungeon[y][x] !== floor);
    
    const type = enemyTypes[Math.min(level-1, enemyTypes.length-1)];
    dungeon[y][x] = type;
    enemies.push({
      type,
      x,
      y,
      health: 10 + level * 3,
      maxHealth: 10 + level * 3,
      attack: 2 + level
    });
  }
  
  // Place treasures
  items = [];
  for (let i = 0; i < 3; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * (mapSize-2)) + 1;
      y = Math.floor(Math.random() * (mapSize-2)) + 1;
    } while (dungeon[y][x] !== floor);
    
    dungeon[y][x] = treasure;
    items.push({ type: treasure, x, y });
  }
  
  // Place health packs
  for (let i = 0; i < 2; i++) {
    let x, y;
    do {
      x = Math.floor(Math.random() * (mapSize-2)) + 1;
      y = Math.floor(Math.random() * (mapSize-2)) + 1;
    } while (dungeon[y][x] !== floor);
    
    dungeon[y][x] = health;
    items.push({ type: health, x, y });
  }
  
  return dungeon;
}

// ===== GAME OVER FUNCTION ===== //
function showGameOver() {
  // Clear everything
  clearText();
  clearTile(0, 0, width(), height());
  
  // Create blank floor map
  const blankMap = Array(height()).fill().map(() => Array(width()).fill(floor));
  setMap(map`${blankMap.map(row => row.join("")).join("\n")}`);
  
  // Show game over text
  addText("GAME OVER", {
    x: 5,
    y: 6,
    color: color`7`
  });
  
  // Restart instructions (using 'i' key)
  addText("Press I to restart", {
    x: 3,
    y: 8,
    color: color`7`
  });
  
  // Reset handler
  onInput("i", () => {
    level = 1;
    party = [
      { type: hero, x: 1, y: 1, health: 20, maxHealth: 20, attack: 5 },
      { type: warrior, x: 2, y: 1, health: 25, maxHealth: 25, attack: 4 },
      { type: archer, x: 1, y: 2, health: 15, maxHealth: 15, attack: 6 },
      { type: mage, x: 2, y: 2, health: 18, maxHealth: 18, attack: 7 }
    ];
    dungeonMap = generateDungeon();
    setMap(map`${dungeonMap.map(row => row.join("")).join("\n")}`);
    clearInput("i");
  });
}

// ===== GAME INIT ===== //
let dungeonMap = generateDungeon();
setMap(map`${dungeonMap.map(row => row.join("")).join("\n")}`);

// ===== GAME FUNCTIONS ===== //
function moveCharacter(char, dx, dy) {
  const newX = char.x + dx;
  const newY = char.y + dy;
  
  // Check boundaries
  if (newX < 0 || newY < 0 || newX >= width() || newY >= height()) {
    return false;
  }
  
  // Check walls
  const tile = getTile(newX, newY)[0];
  if (tile === wall) {
    return false;
  }
  
  // Check for enemies
  const enemyIndex = enemies.findIndex(e => e.x === newX && e.y === newY);
  if (enemyIndex >= 0) {
    combat(char, enemies[enemyIndex]);
    return false;
  }
  
  // Check for items
  const itemIndex = items.findIndex(i => i.x === newX && i.y === newY);
  if (itemIndex >= 0) {
    collectItem(char, items[itemIndex]);
    items.splice(itemIndex, 1);
    clearTile(newX, newY);
    addSprite(newX, newY, floor);
  }
  
  // Move character
  clearTile(char.x, char.y);
  addSprite(char.x, char.y, floor);
  char.x = newX;
  char.y = newY;
  addSprite(newX, newY, char.type);
  
  return true;
}

function combat(attacker, defender) {
  // Attacker hits defender
  defender.health = Math.max(0, defender.health - attacker.attack);
  
  if (defender.health <= 0) {
    clearTile(defender.x, defender.y);
    addSprite(defender.x, defender.y, floor);
    
    if (enemies.includes(defender)) {
      // Enemy defeated
      enemies = enemies.filter(e => e !== defender);
      
      if (enemies.length === 0) {
        level++;
        setTimeout(() => {
          mapSize = 8 + level * 2;
          dungeonMap = generateDungeon();
          setMap(map`${dungeonMap.map(row => row.join("")).join("\n")}`);
        }, 500);
      }
    } else {
      // Party member defeated
      party = party.filter(m => m !== defender);
      if (party.length === 0) showGameOver();
    }
  } else {
    // Defender counterattacks
    attacker.health = Math.max(0, attacker.health - defender.attack);
    if (attacker.health <= 0 && party.includes(attacker)) {
      clearTile(attacker.x, attacker.y);
      addSprite(attacker.x, attacker.y, floor);
      party = party.filter(m => m !== attacker);
      if (party.length === 0) showGameOver();
    }
  }
}

function collectItem(char, item) {
  if (item.type === treasure) {
    char.attack += 1;
  } else if (item.type === health) {
    char.health = Math.min(char.maxHealth, char.health + 5);
  }
}

// ===== CONTROLS ===== //
onInput("w", () => {
  party.forEach(member => {
    moveCharacter(member, 0, -1);
  });
});

onInput("a", () => {
  party.forEach(member => {
    moveCharacter(member, -1, 0);
  });
});

onInput("s", () => {
  party.forEach(member => {
    moveCharacter(member, 0, 1);
  });
});

onInput("d", () => {
  party.forEach(member => {
    moveCharacter(member, 1, 0);
  });
});

// ===== UI ===== //
afterInput(() => {
  clearText();
  
  if (party.length > 0) {
    // Bottom-left: Health bars
    party.forEach((member, i) => {
      const healthPercent = Math.max(0, member.health / member.maxHealth);
      const bar = "(" + "=".repeat(Math.floor(healthPercent * 6)) + " ".repeat(6 - Math.floor(healthPercent * 6)) + ")";
      addText(`${member.type}${bar}`, { 
        x: 1, 
        y: i + 10, 
        color: color`3` 
      });
    });
    
    // Top-center: Enemies remaining
    addText(`Enemies: ${enemies.length}`, { 
      x: 6, 
      y: 1, 
      color: color`3` 
    });
    
    // Top-right: Level
    addText(`Lvl ${level}`, { 
      x: 14, 
      y: 1, 
      color: color`3` 
    });
  }
});
