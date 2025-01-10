/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: shoot and kill
@author: vexxdarkz11
@tags: []
@addedOn: 2024-01-10
*/
const melody = tune`
250: E5~250,
250: C5~250,
250: D5~250,
250: G4~250,
250: E5~250,
250: C5~250,
250: D5~250,
250: G4~250,
250: E5~250,
250: C5~250,
250: D5~250,
250: G4~250,
250: E5~250,
250: C5~250,
250: D5~250,
250: G4~250,
250: F5~250,
250: G5~250,
250: E5~250,
250: C5~250,
250: D5~250,
250: G4~250,
250: B4~250,
250: C5~250,
250: E5~250,
250: undefined~250,
250: F5~250,
250: G5~250,
250: E5~250,
250: C5~250,
250: D5~250,
250: G4~250`



// Play it:
let move= false;
let moveDirection = null;
let moveLeft = false;  
let moveRight = false; 
const speed= 1
const playback = playTune(melody, Infinity)
const player = "p"
const playerr = "r"
const ene = "e"
const solid = "s"
const node = "n"
const gun = "g"
const bullet="b"
const bg ="v"
let current = "p"
let dir = "right"
setLegend(
  [player, bitmap`
.....0000.......
.....0000.......
.....0000.......
.00000000000....
.0..000000.0....
.0..000000.0....
.0..000000.0....
.0..000000.0....
.0..000000.0....
.0..000000.0....
.0...0..0..0....
.0...0..0..0....
.....0..0.......
.....0..0.......
...000..000.....
...000..000.....`],
  [ene, bitmap`
................
....00000000....
..000000000000..
.00000000000000.
.00000000000000.
0000000000000000
0022220220222200
0000000220000000
0000002222000000
0000000000000000
0000002222200000
0000022000220000
.00022000002000.
.00000000000000.
..000000000000..
....00000000....`],
  [solid, bitmap`
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
  [gun, bitmap`
................
................
................
................
................
..00000000000000
..0.........0..0
..0.........0000
..0...0000000...
..0...00.0......
..0...0000......
..0...0.........
..00000.........
................
................
................`],
  [playerr, bitmap`
................
.000..0000000000
.000..0......0.0
.000..0......000
0000000..00000..
0000..0..00.0...
0000..0..0..0...
0000..0..0000...
0000..0000......
00.0............
00.0............
.0.0............
.0.0............
.0.0............
00.00...........
................`],
   [bullet, bitmap`
................
................
................
....66666666....
...6666666666...
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
..666666666666..
...6666666666...
....66666666....
................
................`],
  [bg, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`]
)
setBackground(bg)
setSolids([solid, current, playerr,ene])

let level = 0
const levels = [
  map`
...............
...............
p...gssss..e...
.....ssss......
.....sssssss...
s...sss..s.....
s...ss...s.....
s........s.....
s..sssssss.....
s.ssssssss.....
........s......
...............
.e.............
............e..`,
    map`
p...g........
.............
....ss.......
....s........
....s........
....s........
....s.......e
....ssss.....
.......s.....
.......s.....
.......s.....
............e`
]

setMap(levels[level])

setPushables({
  [solid]: [playerr,player, ene]
})


document.addEventListener('keydown', function(event) {
  if (event.key === 'j') {
    const playerTile = getFirst("r");  // Get player's current position

    // Calculate spawn position based on direction
    let spawnX = playerTile.x;
    let spawnY = playerTile.y;

    addSprite(spawnX, spawnY, bullet);  // Spawn gun at calculated position
    moveDirection = 'left';  // Set the movement direction to left
  }
  else if (event.key === 'l') {
    const playerTile = getFirst("r");  // Get player's current position

    // Calculate spawn position based on direction
    let spawnX = playerTile.x;
    let spawnY = playerTile.y;

    addSprite(spawnX, spawnY, bullet);  // Spawn gun at calculated position
    moveDirection = 'right';  // Set the movement direction to right
  }
  else if (event.key === 'k') {
    const playerTile = getFirst("r");  // Get player's current position

    // Calculate spawn position based on direction
    let spawnX = playerTile.x;
    let spawnY = playerTile.y;

    addSprite(spawnX, spawnY, bullet);  // Spawn gun at calculated position
    moveDirection = 'down';  // Set the movement direction to right
  }
  else if (event.key === 'i') {
    const playerTile = getFirst("r");  // Get player's current position

    // Calculate spawn position based on direction
    let spawnX = playerTile.x;
    let spawnY = playerTile.y;

    addSprite(spawnX, spawnY, bullet);  // Spawn gun at calculated position
    moveDirection = 'up';  // Set the movement direction to right
  }
});
afterInput(() => {

if (getFirst(player).x == getFirst(gun).x && getFirst(player).y == getFirst(gun).y) {
   const gunX = getFirst(gun).x;
  const gunY = getFirst(gun).y;
  clearTile(getFirst(gun).x, getFirst(gun).y);
  addSprite(gunX,gunY,playerr)
play()
  
}

})




function toplayer() {
  const playerpos = getFirst("p");
  const enemypos = getAll(ene);
  enemypos.forEach(enemy => {
  if (enemy.x < playerpos.x) {
    enemypos.x += 1;
  } else if (enemy.x > playerpos.x) {

    enemy.x -= 1;
  }



  if (enemy.y < playerpos.y) {
    enemy.y += 1;
  } else if (enemy.y > playerpos.y) {

    enemy.y -= 1;
  }


  });
}

function toplayerr() {
  const playerrpos = getFirst("r");
  const enemypos = getAll(ene);
  enemypos.forEach(enemy => {
  if (enemy.x < playerrpos.x) {
    enemypos.x += 1;
  } else if (enemy.x > playerrpos.x) {

    enemy.x -= 1;
  }



  if (enemy.y < playerrpos.y) {
    enemy.y += 1;
  } else if (enemy.y > playerrpos.y) {

    enemy.y -= 1;
  }


  });
}
setMap(levels[level]);
movement();
setInterval(moveBullet, 100);
setInterval(toplayer,1000);
setInterval(toplayerr,1000);
setInterval( kill,500);
setInterval( get,100);

function play() {

current = "r"
  


}


function moveBullet() {
  const bulletSprite = getFirst(bullet); // Get the current position of the bullet

  if (bulletSprite) {
    // Move the bullet in the specified direction
    if (moveDirection === 'left') {
      bulletSprite.x -= speed;  // Move the bullet to the left
    }
    else if (moveDirection === 'right') {
      bulletSprite.x += speed;  // Move the bullet to the right
    }
    else if (moveDirection === 'down') {
      bulletSprite.y += speed;  // Move the bullet down
    }
    else if (moveDirection === 'up') {
      bulletSprite.y -= speed;  // Move the bullet up
    }

    // Check if the bullet collides with any solid block
    const solidBlocks = getAll(solid);  // Get all solid blocks
    for (let i = 0; i < solidBlocks.length; i++) {
      const solidBlock = solidBlocks[i];
      if (bulletSprite.x === solidBlock.x && bulletSprite.y === solidBlock.y) {
        clearTile(bulletSprite.x, bulletSprite.y);  // Remove the bullet if it collides with a solid block
        return;  // Stop the bullet's movement
      }
    }

    // Remove the bullet if it goes off the screen
    if (bulletSprite.x < 1 || bulletSprite.x > 10 || bulletSprite.y > 10 || bulletSprite.y < 1) {
      clearTile(bulletSprite.x, bulletSprite.y);  // Remove the bullet from the screen
    }
  }
}



function kill() {
  const bullets = getAll(bullet);
  const enemies = getAll(ene);

  bullets.forEach((bulletSprite) => {
    enemies.forEach((enemySprite) => {
      if (bulletSprite.x === enemySprite.x && bulletSprite.y === enemySprite.y) {
        clearTile(enemySprite.x, enemySprite.y); // Remove enemy
        clearTile(bulletSprite.x, bulletSprite.y); // Remove bullet
        console.log("Enemy killed at", enemySprite.x, enemySprite.y);
      }
    });
  });

  const remainingEnemies = getAll(ene); // Get updated list of remaining enemies
  if (remainingEnemies.length === 0) {
    addText("YOU WIN!", { 
      x: 4,
      y: 4,
      color: color`2`
    });

   
}
}
function get() {
  const player = getFirst(current);
  const enemypos = getAll(ene);
 
const threshold = 1;  
   enemypos.forEach(enemy => {
  let distance = Math.abs(player.x - enemy.x) + Math.abs(player.y - enemy.y);
if (distance <= threshold) {
    clearTile(player.x, player.y);
   
    addText("GAME OVER", { x: 4, y: 5, color: color`2` });
    console.log('Player killed!');
  }
   });
console.log('Player position:', player.x, player.y);
  console.log('Enemy position:', enemy.x, enemy.y);
  console.log('Distance:', distance);

}

function movement () {
onInput("s", () => {
  getFirst(current).y += 1
  dir="down"
  
   
})

onInput("w", () => {
  getFirst(current).y -= 1
  dir= "up"
})
onInput("a", () => {
  getFirst(current).x -= 1
  dir="left"
   
})
onInput("d", () => {
  getFirst(current).x += 1
  dir="right"
    
})
}
