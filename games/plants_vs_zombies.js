// Constants
const AVG_HEALTH = 5;
const ZOMBIE_HEALTH = [240, 320];
const NEW_SUN = 2000;  // Every 10 seconds
const NEW_ZOMBIE = 10000;  // Every 10 seconds
const SUN_VALUE = 25;
const MAX_SUNLIGHT = 5;  // 5 at any given time - collect them!
const BULLETS = {
  green: { letter: "y", bitmap: bitmap`
................
................
................
.....000000.....
....0DDDDDD0....
...0DDDDD4440...
...0DD2244440...
...0DD2444440...
...0DD4444440...
...0D44444440...
...0D44444440...
....04444440....
.....000000.....
................
................
................` },
  blue: { letter: "x", bitmap: bitmap`
................
................
................
.....000000.....
....05555550....
...0555557770...
...0552277770...
...0552777770...
...0557777770...
...0577777770...
...0577777770...
....07777770....
.....000000.....
................
................
................` }
};

function random(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

let borderCursor = { letter: "h", bitmap: bitmap`
6666666666666666
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6..............6
6666666666666666` };
let borderChoice = 0;

let cursor = { letter: "i", bitmap: bitmap`
8888888888888888
8..............8
8..............8
8..............8
8..............8
8..............8
8..............8
8..............8
8..............8
8..............8
8..............8
8..............8
8..............8
8..............8
8..............8
8888888888888888`, x: 1, y: 1, active: false };

// Map
const lightGreenGrass = { letter: "k", bitmap: bitmap`
4444444444444444
44D4444444444444
4444444444444444
4444443444444D44
4444444444444444
4444444444444444
444D444444424444
44DDD44444444444
444D44444D444444
4444444444444444
4444444444444444
44444444D4D43444
444D44444D444444
44444444444444D4
4444444444444444
4444444444444444` };
const darkGreenGrass = { letter: "j", bitmap: bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDD4DDD
DDDDDDDDDDD444DD
DDDDDDD2DDDD4DDD
DD4DDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDD3DDDDD
DDDDDDDDDDDDDDDD
DDDDD4D4DDDDDDDD
DDDDDD4DDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDD4DDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` };
const stone = { letter: "s", bitmap: bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL` };
const brown = { letter: "g", bitmap: bitmap`
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LCCCCCCCCCCCCCCC
LLLLLLLLLLLLLLLL` };
const grasses = {
  lightGreenGrass,
  darkGreenGrass
};
const sunlight = {letter: "z", bitmap: bitmap`
.......00.......
......0660......
.000.066660.000.
.06606666660660.
.06666000066660.
..0660FFFF0660..
.0660FFFFFF0660.
06660FFFFFF06660
06660FFFFFF06660
.0660FFFFFF0660.
..0660FFFF0660..
.06666000066660.
.06606666660660.
.000.066660.000.
......0660......
.......00.......`};

function Sun(x, y) {
  return {
    x,
    y,
    letter: "z",
    type: "sunlight"
  };
};

// Zombies
const zombie = { letter: "w", bitmap: bitmap`
................
..00000.........
.0111110........
.010101L000.....
.012121L0FF0....
.011111L0FFF0...
.0LL2100LFFFF0..
.02LL0F0LFFFF0..
..0000F0LFFFF0..
.....0F000L0L0..
....00F05505050.
....00F00550500.
..00L0111005500.
.0FFL010101100L.
.000000.0..0LFF.
................` };
function Zombie(x, y) {
  return {
    bitmap: zombie.bitmap,
    letter: zombie.letter,
    x,
    y,
    health: random(...ZOMBIE_HEALTH),
    speed: random(1000, 2500),
    speedChanged: false,
    curr: 0,
    run: function(timestamp) {
      this.curr += timestamp;
      if (this.curr > this.speed) {
        this.curr = 0;
        // Return true if game is over (i.e., this.x = 0)
        if (this.x === 0) return true;
        // If plant is in front, you've got to wait a while ("attacking") before destroying the plant and moving forward
        const sprites = getTile(this.x - 1, this.y).filter(tile => ![lightGreenGrass.letter, darkGreenGrass.letter, sunlight.letter].includes(tile.type));
        if (sprites.length && sprites[0].type !== sunlight.letter) {
          const sprite = sprites[0];
          // "Attack" the plant
        } else this.x--;
        if (this.speedChanged) this.speed = random(1500, 2500);  // Reset back to original speed
        return false;
      } else return false;
    }
  };
}

function shootBullet(x, y, type, collide) {
  return {
    x,
    y,
    letter: BULLETS[type].letter,
    bitmap: BULLETS[type].bitmap,
    collide,
    speed: 50,
    curr: 0,
    run: function(timestamp) {
      this.curr += timestamp;
      if (this.curr > this.speed) {
        this.curr = 0;
        if (this.x < width() - 1) this.x++;  // Move "forward" one
      }
    }
  };
}

// Plants
function Plant(bitmap, options={}) {
  // For some reason I can't do ...options?
  let res = { bitmap, delta: 0 };
  if (!options.letter || !options.type || !options.cost) throw new Error("Plants need to have a letter, type, cost and a recharge time, ya know?");
  for (let key of Object.keys(options)) res[key] = options[key];
  if (!res.health) res.health = AVG_HEALTH;  // I dunno?
  return res;
}

const peashooter = Plant(bitmap`
................
.....0000..000..
....04444004440.
...044424444040.
...044404444040.
...044404DD4040.
....0444D004440.
.....00D0..000..
......040.......
....0004400.....
....0D40D040....
...044440DD0....
...040D444440...
....0.000D4D0...
.........040....
..........0.....`, {
  x: 0,
  y: 0,
  letter: "a",
  type: "offensive",
  cost: 100,
  bullet: BULLETS.green,
  bulletAmount: 1,
  recharge: 1500,
  onBulletCollide: function (zombie) {
    // Peashooters can do 40 damage
    zombie.health -= 40;
    console.log(zombie);
  },
  curr: 0,
  run: function(timestamp) {
    this.curr += timestamp;
    if (this.curr > this.recharge) {
      this.curr = 0;
      return [shootBullet(this.x, this.y, "green", this.onBulletCollide)];
    }
  }
});
const snowPea = Plant(bitmap`
.00.............
.070.0000..000..
..0507777007770.
.00077727777070.
075077707777070.
.00077707557070.
.07507775007770.
.050.0050..000..
..0...070.......
....0007700.....
....05705070....
...077770770....
...0705777770...
....0.0005750...
.........050....
..........0.....`, {
  x: 0,
  y: 0,
  letter: "b",
  type: "offensive",
  cost: 175,
  speed: 5000,
  bullet: BULLETS.blue,
  bulletAmount: 1,
  recharge: 1200,
  onBulletCollide: function (zombie) {
    zombie.health -= 40;
    if (!zombie.speedChanged) {
      zombie.speed *= 2;
      zombie.speedChanged = true;
    }
  },
  curr: 0,
  run: function(timestamp) {
    this.curr += timestamp;
    if (this.curr > this.recharge) {
      this.curr = 0;
      return [shootBullet(this.x, this.y, "blue", this.onBulletCollide)];
    }
  }
});
const repeaterPea = Plant(bitmap`
..00............
.04D00000..000..
04DD04444004440.
.00044424444040.
.0D044404444040.
04D044404DD4040.
.0D00444D004440.
..0..00D0..000..
......040.......
....0004400.....
....0D40D040....
...044440DD0....
...040D444440...
....0.000D4D0...
.........040....
..........0.....`, {
  x: 0,
  y: 0,
  letter: "c",
  type: "offensive",
  cost: 200,
  speed: 3000,
  bullet: BULLETS.green,
  bulletAmount: 2,
  recharge: 750,
  onBulletCollide: function (zombie) {
    zombie.health -= 40;
    
  },
  curr: 0,
  run: function (timestamp) {
    this.curr += timestamp;
    if (this.curr > this.recharge) {
      this.curr = 0;
      return [shootBullet(this.x, this.y, "green", this.onBulletCollide)];
    }
  }
});
const sunflower = Plant(bitmap`
.....000000.....
....06666160....
...0616666610...
..0616FFFFF660..
..066FF2F2F660..
..016FF0F0F610..
..066FF0F0F660..
...016FFFFF160..
....066666660...
....00000000....
....0D40D0D40...
...044440D4440..
...040D444D0D0..
....0.00000.0...
................
................`, {
  x: 0,
  y: 0,
  letter: "d",
  type: "sunflower",
  cost: 50,
  recharge: 10000,
  speed: 24000,
  curr: 0,
  run: function(timestamp) {
    this.curr += timestamp;
    if (this.curr > this.speed) {
      this.curr = 0;
      return Sun(random(0, mapSize.x), random(0, mapSize.y));
    }
  }
});
const wallnut = Plant(bitmap`
.......0000.....
......0FFFF0....
.....0LFFFFF0...
....0LFFFFFFF0..
...0LLFFFFFFF0..
..0LLFFF2FF2FF0.
..0LLFF20F20FF0.
..0LLFF22F22FF0.
..0LLFFFFFFFFF0.
..0LLFF00FFFFF0.
...0LFFFF0FFFF0.
...0LFFFFFFFFF0.
....0LFFFFFFF0..
.....0LFFFFF0...
......000000....
................`, {
  x: 0,
  y: 0,
  letter: "e",
  type: "defensive",
  cost: 50,
  health: 40,
  onCollide: function () {
    this.health--;
    if (this.health <= 0) {
      // Oop, the wallnut dies :(
      return false;
    }
    return true;
  }
});
const potatoMine = Plant(bitmap`
................
................
......000.......
.....03C30......
.....03330......
......010.......
.....00000......
....0FFFFF0.....
...0FLF2F2F0....
..00LFF0F0F0....
.0L0FFFFFFF00...
..0000002200F0..
.0F0F0F000FF0...
..0.0.000F0F0...
.........0.0....
................`, {
  x: 0,
  y: 0,
  letter: "f",
  type: "defensive",
  cost: 25,
  onCollide: function (zombie) {
    zombie.health = 0;
    zombie.respond();
    return false;
  }
});
const plants = {
  peashooter,
  snowPea,
  repeaterPea,
  sunflower,
  wallnut,
  potatoMine
}

function PlantCard(bitmap, plant) {
  return {
    bitmap,
    letter: plant.letter.toUpperCase(),
    plant,
  }
};

const plantCards = [
  PlantCard(bitmap`
CCCCCCCCCCCCCCCC
CC000000000000CC
C022220C3022220C
C02220000002220C
C0220FF2F2F0220C
C0220FF0F0F0220C
C02201010100220C
C020L0F0F0FF020C
C00000000000000C
C01111111111110C
C01100011000110C
C01111011011110C
C01100111100110C
C01100011001110C
CC000000000000CC
CCCCCCCCCCCCCCCC`, potatoMine),  // Cost: 25
  PlantCard(bitmap`
CCCCCCCCCCCCCCCC
CC000000000000CC
C02201666660220C
C02066FFFF61020C
C0206F2FF2F6020C
C0206F0FF0F6020C
C02066FFFF66020C
C02201666610220C
C00000000000000C
C01111111111110C
C01100011000110C
C01101111010110C
C01110011000110C
C01100111111110C
CC000000000000CC
CCCCCCCCCCCCCCCC`, sunflower),  // Cost: 50
  PlantCard(bitmap`
CCCCCCCCCCCCCCCC
CC000000000000CC
C02220LLFFF0220C
C0220LLFFFF0220C
C0220LLF0F00220C
C0220LLFFFF0220C
C0220LLFFFF0220C
C02220LLFFF0220C
C00000000000000C
C01111111111110C
C01100011000110C
C01101111010110C
C01110011000110C
C01100111111110C
CC000000000000CC
CCCCCCCCCCCCCCCC`, wallnut),  // Cost: 50
  PlantCard(bitmap`
CCCCCCCCCCCCCCCC
CC000000000000CC
C02200002220220C
C02044440004020C
C02044244444020C
C02044044444020C
C02044440004020C
C02200002220220C
C00000000000000C
C01111111111110C
C01101000100010C
C01101010101010C
C01101000100010C
C01111111111110C
CC000000000000CC
CCCCCCCCCCCCCCCC`, peashooter),  // Cost: 100
  PlantCard(bitmap`
CCCCCCCCCCCCCCCC
CC000000000000CC
C02022000022020C
C00700777700700C
C02070772777700C
C00700770777700C
C02020777700700C
C02222000022020C
C00000000000000C
C01111111111110C
C01101000100010C
C01101110101110C
C01101101110010C
C01111111100110C
CC000000000000CC
CCCCCCCCCCCCCCCC`, snowPea),  // Cost: 175
  PlantCard(bitmap`
CCCCCCCCCCCCCCCC
CC000000000000CC
C02002000022020C
C00DD0444400400C
C020D0442444400C
C00D00440444400C
C00DD0444400400C
C02002000022020C
C00000000000000C
C01111111111110C
C01000100010000C
C01110101010100C
C01001100010000C
C01000111111110C
CC000000000000CC
CCCCCCCCCCCCCCCC`, repeaterPea),  // Cost: 200
];

let legend = [[ borderCursor.letter, borderCursor.bitmap ], [ cursor.letter, cursor.bitmap ], [ sunlight.letter, sunlight.bitmap ]];
for (let bullet of Object.keys(BULLETS)) {
  legend.push([ BULLETS[bullet].letter, BULLETS[bullet].bitmap ]);
}
legend.push([ zombie.letter, zombie.bitmap ]);
for (let card of plantCards) {
  legend.push([ card.letter, card.bitmap ]);
  legend.push([ card.plant.letter, card.plant.bitmap ]);
}

setLegend(...[
  ...legend, 
  [ lightGreenGrass.letter, lightGreenGrass.bitmap ],
  [ darkGreenGrass.letter, darkGreenGrass.bitmap ],
  [ stone.letter, stone.bitmap ],
  [ brown.letter, brown.bitmap ]
]);

const initGrid = map`
sFDEABCssss
sjkjkjkjkjk
skjkjkjkjkj
sjkjkjkjkjk
skjkjkjkjkj
sjkjkjkjkjk
sssssssssss`;
const mapSize = { x: 10, y: 6 };
function Grid(changes) {
  let grid = initGrid;
  if (changes) {
    for (let key of Object.key(changes)) grid[key] = changes[key];
  }
  return grid;
}

function createNewSun() {
  // Create new sun at random location
  const x = random(1, mapSize.x);
  const y = random(1, mapSize.y);
  return {
    bitmap,
    x,
    y
  };
}

function validX(x) {
  if (x > 0 && x < width()) return true;
  return false;
}

function validY(y) {
  if (y > 0 && y < height()) return true;
  return false;
}

function GameClass() {
  return {
    sprites: [],
    plantSprites: [],
    zombieSprites: [],
    sunlight: [],
    map: undefined,
    amount: 0,
    score: 0,
    over: false,
    init: function (map) {
      this.map = map;
      setMap(this.map);
      addSprite(borderChoice + 1, 0, borderCursor.letter);
      addText(String(this.amount), { x: 0, y: 0, color: color`6`});
      addText(String(this.score), { x: 19, y: 0, color: color`4` });
    },
    addSprite: function (sprite) {
      this.sprites.push(sprite);
    },
    run: function (timestamp) {
      // First, clear every sprite that isn't static or a plant 
      for (let plant of this.plantSprites) {
        // Check if plant collided with zombie, and "kill" plant based on zombie.attackingPlant, or let plant serve as defense
        const zombie = this.zombieSprites.filter(zombie => zombie.x === plant.x && zombie.y === plant.y);
        if (zombie.length) {
           if (plant.onCollide) {
             // Plant has a onCollide function
           }
        }
        if (plant.run) {
          const res = plant.run(timestamp);
          if (res && res.type === "sunlight" && this.sunlight.length < MAX_SUNLIGHT) {
            // Put on screen once
            addSprite(res.x, res.y, res.letter);
            this.sunlight.push(res);
          } else if (Array.isArray(res)) {
            for (let sprite of res) {
              // Add each sprite (most likely bullets) to the list of sprites.
              addSprite(sprite.x, sprite.y, sprite.letter);
              this.sprites.push(sprite);
            }
          }
        }
      }
      let newSprites = [];
      for (let sprite of this.sprites) {
        const past = getTile(sprite.x, sprite.y).filter(tile => tile.type === sprite.letter)[0];
        past.remove();
        sprite.run(timestamp);
        // Check if sprite is bullet, and if so, whether or not it has collided with zombie
        if (sprite.letter === BULLETS.green.letter || sprite.letter === BULLETS.blue.letter) {
          const zombie = this.zombieSprites.filter(zombie => zombie.x === sprite.x && zombie.y === sprite.y);
          if (zombie.length) {
            let zombieSprite = zombie[0];  // First zombie
            sprite.collide(zombieSprite);
            continue;
          }
        }
        if (validY(sprite.y) && sprite.x < width() - 1) {
          addSprite(sprite.x, sprite.y, sprite.letter);
          newSprites.push(sprite);
        }
      }
      this.sprites = newSprites;
      let newZombies = [];
      for (let sprite of this.zombieSprites) {
        if (sprite.x === 0) {
          // Check if zombie has reached behind plants - if so, the game is over
          addText("Oopsies! Try again?", { x: 3, y: 10, color: color`3` });
          game.over = true;
          clearInterval(gameloop);
        }
        const past = getTile(sprite.x, sprite.y).filter(tile => tile.type === sprite.letter)[0];
        past.remove();
        sprite.run(timestamp);
        if (validX(sprite.x) && validY(sprite.y) && sprite.health > 0) {
          addSprite(sprite.x, sprite.y, sprite.letter);
          newZombies.push(sprite);
        } else if (sprite.health < 0) {
          // Zombie killed
          this.score++;
        }
      }
      this.zombieSprites = newZombies;
      clearText();
      addText(String(this.amount), { x: 0, y: 0, color: color`6` });
      addText(String(this.score), { x: 19, y: 0, color: color`4` });
    }
  };
}

let game = GameClass();
game.init(initGrid);

onInput("a", () => {
  if (!game.over && borderChoice > 0 && !cursor.active) borderChoice--;
});

onInput("d", () => {
  if (!game.over && borderChoice !== plantCards.length - 1 && !cursor.active) borderChoice++;
});

onInput("s", () => {
  if (game.over) return;
  // Let user place a sprite! But only if they have the requisite amount of sunlight
  const plant = plantCards[borderChoice].plant;
  console.log(plant);
  if (plant.cost > game.amount) return;
  if (!getAll(cursor.letter).length) {
    addSprite(cursor.x, cursor.y, cursor.letter);
    cursor.active = true;
  }
});

onInput("w", () => {
  if (game.over) return;
  // Put down sprite
  for (let sprite of game.plantSprites) {
    if (sprite.x === cursor.x && sprite.y === cursor.y) return;
  }
  addSprite(cursor.x, cursor.y, plantCards[borderChoice].plant.letter);
  const tiles = getTile(cursor.x, cursor.y);
  clearTile(cursor.x, cursor.y);
  for (let tile of tiles) {
    if (tile._type !== cursor.letter) addSprite(cursor.x, cursor.y, tile._type);
  }
  const plant = plantCards[borderChoice].plant;
  plant.x = cursor.x;
  plant.y = cursor.y;
  game.plantSprites.push(plant);
  game.amount -= plant.cost;
  cursor.active = false;
  cursor.x = 1;
  cursor.y = 1;
});

onInput("i", () => {
  if (game.over || cursor.y <= 1 || !cursor.active) return;
  getFirst(cursor.letter).y--;
  cursor.y--;
});

onInput("j", () => {
  if (game.over || cursor.x <= 1 || !cursor.active) return;
  getFirst(cursor.letter).x--;
  cursor.x--;
});

onInput("l", () => {
  if (game.over || cursor.x >= mapSize.x || !cursor.active) return;
  getFirst(cursor.letter).x++;
  cursor.x++;
});

onInput("k", () => {
  if (game.over) return;
  if (!cursor.active) {
    // If cursor isn't active, this collects sunlight
    if (game.sunlight.length) {
      const collected = game.sunlight[0];
      game.sunlight = game.sunlight.slice(1);  // Remove first one
      const sprite = getTile(collected.x, collected.y).filter(tile => tile.type === sunlight.letter)[0];
      sprite.remove();
      game.amount += SUN_VALUE;
    }
  }
  else if (cursor.y >= mapSize.y - 1) return;
  else {
    getFirst(cursor.letter).y++;
    cursor.y++;
  }
});

afterInput(() => {
  if (game.over) return;
  getFirst(borderCursor.letter).x = borderChoice + 1;
  addText(String(game.amount), { x: 0, y: 0, color: color`6`});
});

let last = new Date();
let sunlightCount = 0;
let zombieCount = 0;
let gameloop = setInterval(() => {
  if (game.score === 100) {
    // Player wins!
    addText("You saved the day!", { x: 1, y: 10, color: color`3` });
    game.over = true;
    clearInterval(gameloop);
  }
  let timestamp = new Date() - last;
  sunlightCount += timestamp;
  if (sunlightCount >= NEW_SUN && game.sunlight.length < 5) {
    sunlightCount = 0;
    const newSun = Sun(random(0, mapSize.x), random(0, mapSize.y));
    addSprite(newSun.x, newSun.y, newSun.letter);
    game.sunlight.push(newSun);
  }
  zombieCount += timestamp;
  if (zombieCount >= NEW_ZOMBIE) {
    zombieCount = 0;
    const newZombie = Zombie(mapSize.x, random(1, mapSize.y - 1));
    addSprite(newZombie.x, newZombie.y, newZombie.letter);
    game.zombieSprites.push(newZombie);
  }
  game.run(timestamp);
  last = new Date();
  // We should also have bulletSprites that have collide() functions when they collide with zombies.
  // Also make sure to run collide() functions on the plants themselves (for example, wallnut).
}, 1000 / 60);
