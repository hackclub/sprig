/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: 
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const enemytank = "e"
const background = "b"
const bomb = "z"
const bombcooldownfull = "0"
const bombcooldownempty = "8"
const explosion  = "x"
const heart = "h"
const hearthalf = "/"
const heartempty = "3"
const enemyplane = "d"
const backgroundmusic = tune`
157.89473684210526: C5~157.89473684210526,
157.89473684210526: B4~157.89473684210526,
157.89473684210526: F4^157.89473684210526,
157.89473684210526: C5~157.89473684210526,
157.89473684210526: B4~157.89473684210526,
157.89473684210526: F4^157.89473684210526,
157.89473684210526: C5~157.89473684210526,
157.89473684210526: B4~157.89473684210526,
157.89473684210526: F4^157.89473684210526,
157.89473684210526: E5/157.89473684210526,
157.89473684210526: D5/157.89473684210526 + F4^157.89473684210526,
157.89473684210526: C5/157.89473684210526,
157.89473684210526: B4/157.89473684210526,
157.89473684210526: E4^157.89473684210526,
157.89473684210526: D5/157.89473684210526 + F4^157.89473684210526,
157.89473684210526: C5/157.89473684210526,
157.89473684210526: B4/157.89473684210526 + E4^157.89473684210526,
157.89473684210526: A4/157.89473684210526 + F4^157.89473684210526,
157.89473684210526,
157.89473684210526: A4/157.89473684210526 + E4^157.89473684210526,
157.89473684210526: F4^157.89473684210526,
157.89473684210526: C5/157.89473684210526,
157.89473684210526: E4^157.89473684210526,
157.89473684210526: F4^157.89473684210526 + B4~157.89473684210526,
157.89473684210526: A4~157.89473684210526,
157.89473684210526: C5/157.89473684210526 + E4^157.89473684210526,
157.89473684210526: F4^157.89473684210526 + B4~157.89473684210526,
157.89473684210526: A4~157.89473684210526 + D5/157.89473684210526,
157.89473684210526: C5~157.89473684210526 + E4^157.89473684210526,
157.89473684210526: F4^157.89473684210526 + B4~157.89473684210526 + E5/157.89473684210526,
157.89473684210526: D5~157.89473684210526,
157.89473684210526: C5~157.89473684210526`

setLegend(
  [heartempty, bitmap`
................
................
..00000..00000..
.0LLLLL00LLLLL0.
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
.0LLLLLLLLLLLL0.
..0LLLLLLLLLL0..
...0LLLLLLLL0...
....00LLLL00....
......0LL0......
.......00.......` ],
  [hearthalf, bitmap`
................
................
..00000..00000..
.0LLLLL00LLLLL0.
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0333333333333330
0333333333333330
.03333333333330.
..033333333330..
...0333333330...
....00333300....
......0330......
.......00.......` ],
  [heart, bitmap`
................
................
..00000..00000..
.03333300333330.
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
.03333333333330.
..033333333330..
...0333333330...
....00333300....
......0330......
.......00.......` ],


  [ player, bitmap`
................
................
................
.......00.......
.....00LL00.....
...00LL111100...
..0LLLL1111110..
.0LLL1111111120.
0LLL011111102220
.0L0.010010.020.
..0...0220...0..
.......2........
.......22.......
........2.......
.......2........
................` ],
  [ enemytank, bitmap`
...0000000000...
.000LLLL1111000.
.000L0000001000.
.0000LLL1110000.
.000LLL11111000.
.000LL111111000.
.000L1111111000.
.00011111112000.
.00001111120000.
.000L0111201000.
.000L1012011000.
.000L1012012000.
.00011012022000.
.00000011000000.
.000..0110..000.
......0110......` ],
  [ enemyplane, bitmap`
................
.......22.......
........2.......
.......2........
........2.......
..0...0220...0..
.020.010010.0L0.
022201111110LLL0
.0211111111LLL0.
..0111111LLLL0..
...001111LL00...
.....00LL00.....
.......00.......
................
................
................`],
  [ explosion, bitmap`
..6..6........66
...6.6......66..
...6666666666...
6..6699666666...
.6.66999996666..
.666993333996666
.6669333333966..
..669333333996..
..669333333396..
..669333333396..
..669933339996..
...6699999966...
...6996666666...
...66666666.....
..66.......66...
..6.........6...` ],
  [bomb, bitmap`
.......00.......
......0330......
......0330......
......0220......
......0220......
......0220......
......0220......
.....002200.....
....03022030....
...0330220330...
....00022000....
......0000......
......6936......
......6996......
.......696......
........6.......` ],
    [bombcooldownempty, bitmap`
.......00.......
......0000......
......0000......
......0000......
......0000......
......0000......
......0000......
.....000000.....
....00000000....
...0000000000...
....00000000....
......0000......
......0000......
......0000......
.......000......
........0.......` ],
    [bombcooldownfull, bitmap`
.......00.......
......0330......
......0330......
......0220......
......0220......
......0220......
......0220......
.....002200.....
....03022030....
...0330220330...
....00022000....
......0000......
......6936......
......6996......
.......696......
........6.......` ],
  
  
  [ background, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],


)

setSolids([enemytank]);

let level = 0
const levels = [
  map`
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbb
bbbbbbbbbpbbbbbbbbb
bbbbbbbbbbbbbbbbbbb`
]
const firecooldown = 500


setMap(levels[level])

setPushables({
  [ player ]: [],
  [ bomb ]: []
})


const playback = playTune(backgroundmusic, Infinity)
let alive = true
onInput("d", () => {
  if (alive) {
  addSprite(getFirst(player).x,getFirst(player).y, background);
  getFirst(player).x += 1
}})
onInput("a", () => {
  if (alive) {
  addSprite(getFirst(player).x,getFirst(player).y, background);
  getFirst(player).x -= 1
  }
  })
onInput("j", () => {
  game_running = false
  setMap(levels[level])
})
let abletofire = true
onInput("i", () => {
  if(abletofire) {
    addSprite(getFirst(player).x, getFirst(player).y - 1, bomb);
    abletofire = false; // Prevent firing immediately
    setTimeout(() => {
      abletofire = true; // Allow firing again after the cooldown
    }, firecooldown);
  }
});


let score = 0;
const tickDelay = 750; // Set the delay in millisecondsd
let health = 6

function gameLoop() {
  if (alive) {
    // Update all bombs and base checks
    healthCheck();
    explosionCheck();
    tankCheck();
    bombCheck();



    // Update score displaydaaddui
    clearText();
    addText("Score: " + score, { x: 11, y: 0, color: color`0` });
    if (health <= 0) {
       // This line clears the previous text but it is not present in the code
      clearText();
      addText("Game Over Score: " + score, { x: 1, y: 6, color: color`3` });
      addText("Press J to Restart", { x: 1, y: 7, color: color`3` });// Displays the "hello" message when health is zero or below
      alive = false;
    }
    // Set a timeout for the next iteration
    setTimeout(gameLoop, tickDelay);
  }
}

function explosionCheck() {
  // Remove explosions
  getAll(explosion).forEach(e => {
    addSprite(e.x, e.y, background);
    e.remove();
  });
}


function tankCheck() {
  // Move existing tanks downward
  getAll(enemytank).forEach(tank => {
    if (tank.y === 15) {
      addSprite(tank.x, tank.y, explosion);
      health -= 1;
      tank.remove();
    } else {
      tank.y += 1; // Move tank downward
    }
  });

  // Generate new tanks with controlled randomness
  const maxTanksPerTick = 3; // Limit the number of tanks that can spawn in one tick
  const maxTanks = 10; // Maximum total tanks allowed on the screen
  const currentTanks = getAll(enemytank).length;

  // Only spawn if the total number of tanks is under the limit
  if (currentTanks < maxTanks) {
    let tanksSpawned = 0;

    for (let i = 0; i < 19; i++) {
      // Ensure tanks only spawn in empty columns and respect the spawn rate
      if (Math.random() < 0.05 && !getTile(i, 0).some(sprite => sprite.type === enemytank)) {
        addSprite(i, 0, enemytank);
        tanksSpawned++;
      }

      // Stop spawning if we reach the per-tick limit
      if (tanksSpawned >= maxTanksPerTick) break;
    }
  }
}



function bombCheck() {


  // Process bombs
  getAll(bomb).forEach(m => {
    // Check the tile above the bomb
    const tilesup = getTile(m.x, m.y - 1);
    const tilescur = getTile(m.x, m.y);

    // Check if any tile above matches the enemy base
    let exploded = false; // Track if the bomb explodes
    if (m.y === 0 ) {addSprite(m.x, m.y, explosion); m.remove();}
    tilesup.forEach(sprite => {
      if (sprite.type === enemytank) {
        // Add explosion and remove the bomb
        addSprite(m.x, m.y - 1, explosion);

        m.remove();
        sprite.remove();
        score += 1;
        exploded = true; // Mark as exploded
      }
    });
        tilescur.forEach(sprite => {
      if (sprite.type === enemytank) {
        // Add explosion and remove the bomb
        addSprite(m.x, m.y - 1, explosion);
        m.remove();
        sprite.remove();
        score += 1;
        exploded = true; // Mark as exploded
      }
    });

    // Move the bomb upwards only if it didn't explode and there's no solid above
    if (!exploded) {
      m.y -= 1; // Ensure the game engine properly tracks bomb movement
    }
  });
}
function healthCheck() {
  // Clear previous hearts


  // Display hearts based on health
  let maxHealth = 6; // Maximum health points
  for (let i = 0; i < Math.ceil(maxHealth / 2); i++) {
    if (health > i * 2 + 1) {
      addSprite(i, 15, heart); // Full hearts
    } else if (health === i * 2 + 1) {
      addSprite(i, 15, hearthalf); // Half heart
    } else {
      addSprite(i, 15, heartempty); // Empty heart
    }
  }
}



// Start the game loop
gameLoop();

afterInput(() => {
  // Add any logic to handle user input here
});

