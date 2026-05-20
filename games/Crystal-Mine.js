// Crystal Miner - A Sprig Puzzle Game

// Set up the graphics (Legend with 1-character identifiers)
setLegend(
  [ "p", bitmap`
    ....000000....
    ..0011111100..
    ..0111111110..
    00110011001100
    01110011001110
    01111111111110
    01111111111110
    .011100001110.
    ..0111111110..
    ....00..00....
  `],
  [ "w", bitmap`
CCCCCCCCCCCC9991
CCCC99CCCCCCCC91
C9CCCCCCCCCCCCCC
91CCC9CCCCCCCCCC
1CCCDDDDDDDDDC9C
99DDDD4DDDDDDDCC
DDDDDD4FDDDDDDCC
DD4DDDDDDDDDDDDD
D44DDDDDDDD4DDDD
D4DDDDDDDDD4DDDD
D4DDDDDDDDD444DD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
F4444DDDDDD4FDDD
DDDD4DDDDDD44DDD
DDDDDDDDDDDDDDDD`],
  [ "b", bitmap`
    ..............
    ....000000....
    ..0022222200..
    ..0223333220..
    ..0233553320..
    ..0233553320..
    ..0223333220..
    ..0022222200..
    ....000000....
    ..............
  `],
  [ "g", bitmap`
.....CCCCCC.....
...CCC4444CCCC..
.CCC444444444C..
C444444444444CC.
C4444444444444CC
CDDD4DDD4DDD4D4C
CD444D4D4D4D4D4C
CD4D4D4D4DDD4D4C
CDDD4DDD4D4D4DDC
C44444444444444C
C4444444444444CC
CC444444444444C.
.CC4444444444CC.
..CCC4444444CC..
....CCCCCCCCC...
................`],
  [ "v", bitmap`
......77........
....777777......
..7777777777....
..7777777777....
77777777777777..
77777777777777..
..7777777777....
..7777777777....
....777777......
......77........
................
................
................
................
................
................`]
);

//  Map Layouts 
var maps = [
  map`
wwwwwwwwwwww
w.p.......vw
w..b.......w
w......v...w
w...vg.....w
wwwwwwwwwwww`,
  map`
wwwwwwwwwwww
wp.........w
w..v..b....w
w.....v..v.w
w..b....g..w
wv......g..w
wwwwwwwwwwww`

 ,map`
wwwwwwwww
wp......w
w..v....w
w.b.....w
w......vw
wv.....gw
wwwwwwwww`
];

var currentLevel = 0;
setMap(maps[currentLevel]);
setSolids(["p", "w", "b", "v"]);

//  Movement
function tryMove(playerSprite, dx, dy) {
  var nextX = playerSprite.x + dx;
  var nextY = playerSprite.y + dy;
  
  var targets = getTile(nextX, nextY);
  
  // Check if walking into a wall or rift
  if (targets.some(s => s.type === "w" || s.type === "v")) {
    return; // Stop movement
  }
  
  // Check if pushing a battery block
  var battery = targets.find(s => s.type === "b");
  if (battery) {
    var blockNextX = battery.x + dx;
    var blockNextY = battery.y + dy;
    var blockTargets = getTile(blockNextX, blockNextY);
    
    // Can't push block into a wall or another block
    if (blockTargets.some(s => s.type === "w" || s.type === "b")) {
      return;
    }
    
    // If pushed into a void rift, the battery breaks!
    if (blockTargets.some(s => s.type === "v")) {
      battery.remove();
      return;
    }
    
    // Move the battery
    battery.x = blockNextX;
    battery.y = blockNextY;
  }
  
  // Move the player
  playerSprite.x = nextX;
  playerSprite.y = nextY;
}

// Bind Inputs
onInput("w", () => { var p = getFirst("p"); if(p) tryMove(p, 0, -1); });
onInput("s", () => { var p = getFirst("p"); if(p) tryMove(p, 0, 1); });
onInput("a", () => { var p = getFirst("p"); if(p) tryMove(p, -1, 0); });
onInput("d", () => { var p = getFirst("p"); if(p) tryMove(p, 1, 0); });

// Restart level if stuck
onInput("i", () => {
  setMap(maps[currentLevel]);
});

//  Win Condition Check
afterInput(() => {
  var allGoals = getAll("g");
  var allBlocks = getAll("b");
  
  var goalsSatisfied = 0;
  
  allGoals.forEach(g => {
    // Check if a battery is on this goal tile
    var objectsOnGoal = getTile(g.x, g.y);
    if (objectsOnGoal.some(s => s.type === "b")) {
      goalsSatisfied++;
    }
  });
  
  // If all goals on the map have a battery, win!
  if (goalsSatisfied === allGoals.length && allGoals.length > 0) {
    if (currentLevel < maps.length - 1) {
      currentLevel++;
      setMap(maps[currentLevel]);
    } else {
      // 
      addText("YOU WIN!", { y: 4, color: "green" });
    }
  }
});