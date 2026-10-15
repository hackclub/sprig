/* @title: Most intense
@description: Fresh start with timed text and wall waves
@author: aditya
@tags: ['6', '7'] */

const player = "p"
const wall = "w"
setSolids([player])

setLegend(
  [wall, bitmap`
    ................
    ................
    ...000000000....
    ...000000000....
    ...000000000....
    ...000000000....
    ...000000000....
    ...000000000....
    ...000000000....
    ...000000000....
    ...000000000....
    ................
    ................
    ................
    ................
    ................
  `],
  [player, bitmap`
    .....00...00....
    ....0000.0000...
    ....000000000...
    ....000000000...
    .....0000000....
    ......00000.....
    .......000......
    ........0.......
    ................
    ................
    ................
    ................
    ................
    ................
    ................
    ................
  `]
)

const level = map`
  .......
  .......
  .......
  .......
  .......
  .......
  .......
`

setMap(level)

// Spawn player at a safe spot on the left
addSprite(1, 3, player)

// Movement controls (with boundary checks so player doesn't fall off screen)
onInput("w", () => { let p = getFirst(player); if (p && p.y > 0) p.y -= 1; })
onInput("a", () => { let p = getFirst(player); if (p && p.x > 0) p.x -= 1; })
onInput("s", () => { let p = getFirst(player); if (p && p.y < 6) p.y += 1; })
onInput("d", () => { let p = getFirst(player); if (p && p.x < 6) p.x += 1; })

// Initial text
addText("hello :)", {
  x: 4,
  y: 4,
  color: color`8`
})

// Function to generate a random wall wave with 2 gaps
function spawnRandomWave() {
  let gap1 = Math.floor(Math.random() * 7)
  let gap2 = Math.floor(Math.random() * 7)
  while (gap2 === gap1) {
    gap2 = Math.floor(Math.random() * 7)
  }
  
  for (let y = 0; y <= 6; y++) {
    if (y !== gap1 && y !== gap2) {
      addSprite(6, y, wall)
    }
  }
}

let gameInterval; // Interval variable to stop the loop on game over

// Change text and start automatic wall movement after 2 seconds
setTimeout(() => {
  clearText()
  addText("GOODBYE", {
    x: 4,
    y: 1,
    color: color`3`
  })
  
  spawnRandomWave()

  // Automatically move walls every 250ms
  gameInterval = setInterval(() => {
    let p = getFirst(player)
    let walls = getAll(wall)
    let hitEdge = false;

    walls.forEach(w => {
      if (w.x === 0) {
        hitEdge = true;
      } else {
        w.x -= 1;
      }
    });

    // Hit detection: Trigger GAME OVER if player touches a wall
    if (p) {
      let itemsOnPlayer = getTile(p.x, p.y);
      if (itemsOnPlayer.some(item => item.type === wall)) {
        clearInterval(gameInterval); // Stop the game loop
        p.remove();                  // Remove the player sprite
        clearText();
        addText("GAME OVER", {
          x: 1,
          y: 3,
          color: color`3`
        });
        return;
      }
    }

    // If wave reaches the edge, clear them and spawn a new random wave
    if (hitEdge) {
      walls.forEach(w => w.remove());
      spawnRandomWave();
    }
  }, 250)
}, 2000)