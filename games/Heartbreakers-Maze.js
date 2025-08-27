>     /*
	>     @title:Heartbreakers Maze
	>     @author:Ethan
	>     @description:Collect the gems
	>     @tags: [Maze, Gems, Monster]
	>     @addedOn: 2025-08-26
	>     */
/*
  GEM COLLECTOR
  An original game by Kai (ethan)

  Collect all gems before the monsters get you!!!! 
  Push blocks to trap the monsters and clear your path.
   :D
  Controls:
  w a s d - Move your character
*/

/*
  GEM COLLECTOR
  An original game by Kai (ethan)

  Collect all gems before the monsters get you!!!! 
  Push blocks to trap the monsters and clear your path.
   :D
  Controls:
  w a s d - Move your character
*/

// Define the sprites for our game
const player = "p";
const monster = "m";
const gem = "g";
const block = "b";
const wall = "w";

// Assign bitmap art to each sprite
// The order here determines the drawing layer (z-order).
// Player is first, so it's drawn on top of everything else.
setLegend(
  [player, bitmap`
................
................
.......0........
......000.......
.....05550......
....0577750.....
...05766750.....
..057636750.....
...0577750......
....05550.......
.....000........
......0.........
.....0.0........
....0..0........
................
................`],
  [monster, bitmap`
................
................
................
...88...88......
..8888.8888.....
.88888388088....
.88083388888....
..888000088.....
...8803808......
....00388.......
.....838........
....88.88.......
...88...88......
................
................
................`],
  [gem, bitmap`
................
................
................
.......D........
......D4D.......
.....D444D......
....D44444D.....
...D4444444D....
...7444444D.....
...7DD444D......
......D4D.......
.......D........
................
................
................
................`],
  [block, bitmap`
0000000000000000
0222222222222220
0200022222200020
0202022222202020
0200022222200020
0222222222222220
0222200000022220
0222022222202220
0222022222202220
0222200000022220
0222222222222220
0200022222200020
0202022222202020
0200022222200020
0222222222222220
0000000000000000`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
L00000000000000L
L0LLLLLLLLLLLL0L
L0L0000000000L0L
L0L0LLLLLLLL0L0L
L0L0L000000L0L0L
L0L0L0LLLL0L0L0L
L0L0L0L00L0L0L0L
L0L0L0L00L0L0L0L
L0L0L0LLLL0L0L0L
L0L0L000000L0L0L
L0L0LLLLLLLL0L0L
L0L0000000000L0L
L0LLLLLLLLLLLL0L
L00000000000000L
LLLLLLLLLLLLLLLL`]
);

// Set the background tile
setBackground(wall);

// Define the game map
const level = map`
wwwwwwwwww
w.g.b.g.gw
w.b.b.b.b.
w.g.b.g.g.
w.b.b.b.b.
w.g.b.g.g.
w.b.b.b.b.
w.g.b.g.g.
w..p.m....
wwwwwwwwww`;

// Load the map into the game ( BORINGGG STUF RIGHT HERE)
setMap(level);

// Define which sprites are solid (cannot overlap)
setSolids([player, monster, block, wall]);

// Define which sprites can push other sprites
setPushables({
  [player]: [block] // The player can push blocks ( Ik crazy dicovery!!)
});

// Player movement controls
onInput("w", () => {
  getFirst(player).y -= 1;
});
onInput("s", () => {
  getFirst(player).y += 1;
});
onInput("a", () => {
  getFirst(player).x -= 1;
});
onInput("d", () => {
  getFirst(player).x += 1;
});

// This function runs after every player input >:D
afterInput(() => {
  // Simple monster: move towards the player 
  const playerSprite = getFirst(player);
  const monsters = getAll(monster);

  monsters.forEach(m => {
    // A simple chase algorithm
    if (m.x < playerSprite.x) m.x += 1;
    else if (m.x > playerSprite.x) m.x -= 1;
    else if (m.y < playerSprite.y) m.y += 1;
    else if (m.y > playerSprite.y) m.y -= 1;
  });

  // Check for collisions between player and gemss
  const playerTile = getTile(playerSprite.x, playerSprite.y);
  playerTile.forEach(sprite => {
    if (sprite.type === gem) {
      sprite.remove(); // Collect the gems
    }
  });

  // Check for collisions between player and monsters
  const playerAgain = getFirst(player); // Re-get player in case of movement
  const monstersAgain = getAll(monster);
  monstersAgain.forEach(m => {
    if (m.x === playerAgain.x && m.y === playerAgain.y) {
      clearText();
      addText("you shattered his heart..", { y: 7, color: color`8` });
      setTimeout(() => setMap(level), 1000); // Reset after 1 second
    }
  });


  // Check for winner cond
  if (getAll(gem).length === 0) {
    clearText();
    addText("You win!", { y: 7, color: color`4` });
    // might do a new level or wtv
  }
});
