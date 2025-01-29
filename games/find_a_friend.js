/*
@title: Find a Friend
@author: Doodle Studio
@tags: []
@addedOn: 2024-07-22
[!]TUTORIAL[!] move with W and S. Don't hit the enemies and try to
hit the friends.

*/

const player = "p"
const friend = "f"
const enemy = "e"
const background = "b"
const allFriends = getAll(friend);
const soundtrack1 = tune`
234.375: B5~234.375 + A5~234.375 + C4~234.375,
234.375: A5~234.375 + G5~234.375 + C4~234.375,
234.375: G5~234.375 + F5~234.375 + E5~234.375 + C4~234.375,
234.375: E5~234.375 + D5~234.375 + C4~234.375,
234.375: D5~234.375 + C5~234.375 + C4~234.375,
234.375: C5~234.375 + B4~234.375 + C4~234.375,
234.375: B4~234.375 + A4~234.375 + C4~234.375,
234.375: A4~234.375 + G4~234.375 + C4~234.375,
234.375: C4~234.375 + A4~234.375 + G4~234.375,
234.375: C4~234.375 + G4~234.375 + F4~234.375 + E4^234.375,
234.375: C4~234.375 + F4~234.375 + E4^234.375,
234.375: C4~234.375 + F4~234.375 + E4^234.375,
234.375: C4~234.375 + F4~234.375 + E4^234.375,
234.375: C4~234.375 + F4~234.375 + G4~234.375 + E4^234.375,
234.375: C4~234.375 + G4~234.375 + A4~234.375 + F4^234.375,
234.375: C4~234.375 + B4~234.375 + A4~234.375 + G4^234.375,
234.375: C4~234.375 + C5^234.375 + B4~234.375 + A4^234.375 + D5-234.375,
234.375: C4~234.375 + C5^234.375 + D5^234.375 + B4^234.375 + E5-234.375,
234.375: C4~234.375 + D5^234.375 + E5^234.375 + F5-234.375,
234.375: C4~234.375 + E5^234.375 + F5^234.375 + G5-234.375,
234.375: C4~234.375 + F5^234.375 + G5-234.375,
234.375: C4~234.375 + F5^234.375 + G5^234.375 + A5-234.375,
234.375: C4~234.375 + G5^234.375 + A5^234.375 + B5-234.375,
234.375: C4~234.375 + A5^234.375 + B5^234.375,
234.375: C4~234.375 + B5^234.375,
234.375: C4~234.375 + B5/234.375 + A5/234.375,
234.375: C4~234.375 + A5/234.375 + G5/234.375,
234.375: C4~234.375 + F5/234.375 + G5/234.375,
234.375: C4~234.375 + F5/234.375 + G5/234.375,
234.375: C4~234.375 + F5/234.375 + E5/234.375,
234.375: C4~234.375 + E5/234.375 + D5/234.375,
234.375: C4~234.375 + D5/234.375 + C5/234.375`
const soundtrack2 = tune`
234.375: B4~234.375 + G4-234.375 + A4~234.375,
234.375,
234.375: B4~234.375 + G4-234.375 + A4~234.375,
234.375,
234.375: B4~234.375 + G4-234.375 + A4~234.375,
234.375,
234.375: B4~234.375 + A4^234.375,
234.375: A4~234.375 + G4^234.375,
234.375: A4~234.375 + G4~234.375 + F4^234.375,
234.375: G4~234.375 + F4^234.375,
234.375: G4~234.375 + F4~234.375 + E4^234.375,
234.375: F4~234.375 + E4~234.375 + D4^234.375,
234.375: E4~234.375 + D4~234.375 + C4^234.375,
234.375: D4~234.375 + C4^234.375,
234.375: D4~234.375 + C4~234.375,
234.375: C4~234.375,
234.375: C4~234.375,
234.375,
234.375: C4~234.375 + E4-234.375 + D4~234.375,
234.375,
234.375: C4~234.375 + E4-234.375 + D4~234.375,
234.375,
234.375: C4~234.375 + E4-234.375 + D4~234.375,
234.375,
234.375: C4~234.375,
234.375: C4~234.375,
234.375: D4~234.375 + C4~234.375,
234.375: D4~234.375 + E4~234.375 + C4^234.375,
234.375: E4~234.375 + F4~234.375 + G4~234.375 + D4^234.375,
234.375: G4~234.375 + A4~234.375 + F4^234.375,
234.375: A4~234.375 + B4~234.375 + G4^234.375,
234.375`
const soundtrack3 = tune`
234.375: E4^234.375 + E5^234.375,
234.375: D4^234.375 + E5^234.375,
234.375: C4^234.375 + E5^234.375,
234.375: C4^234.375 + F5^234.375,
234.375: C4^234.375 + F5^234.375,
234.375: B4^234.375 + F5^234.375,
234.375: A4^234.375 + G5^234.375,
234.375: G4^234.375 + G5^234.375,
234.375: F4^234.375 + G5^234.375,
234.375: E4^234.375 + G5^234.375,
234.375: D4^234.375 + A5^234.375,
234.375: C4^234.375 + A5^234.375,
234.375: B5^234.375 + C4^234.375,
234.375: B5^234.375 + C4^234.375,
234.375: A5^234.375,
234.375: A5^234.375 + B4^234.375,
234.375: G5^234.375 + A4^234.375,
234.375: G5^234.375 + G4^234.375,
234.375: F4^234.375 + F5^234.375,
234.375: E4^234.375 + F5^234.375,
234.375: D4^234.375 + G5^234.375,
234.375: C4^234.375 + G5^234.375,
234.375: C4^234.375 + A5^234.375,
234.375: C4^234.375 + A5^234.375,
234.375: B5^234.375,
234.375: B5^234.375,
234.375: A5^234.375,
234.375: A5^234.375,
234.375: B4^234.375 + G5^234.375,
234.375: A4^234.375 + G5^234.375,
234.375: G4^234.375 + F5^234.375,
234.375: F4^234.375 + F5^234.375`
const soundtrack4 = tune`
234.375: C5^234.375,
234.375: D5^234.375,
234.375: E5^234.375,
234.375: F5^234.375,
234.375: G5^234.375,
234.375: A5^234.375,
234.375: A5^234.375,
234.375: G5^234.375,
234.375: F5^234.375,
234.375: E5^234.375,
234.375: D5^234.375,
234.375: C5^234.375,
234.375: B4^234.375,
234.375: A4^234.375,
234.375: G4^234.375,
234.375: F4^234.375,
234.375: E4^234.375,
234.375: D4^234.375,
234.375: C4^234.375,
234.375: C4^234.375,
234.375: D4^234.375,
234.375: D4^234.375,
234.375: E4^234.375,
234.375: E4^234.375,
234.375: F4^234.375,
234.375: F4^234.375,
234.375: G4^234.375,
234.375: G4^234.375,
234.375: A4^234.375,
234.375: A4^234.375,
234.375: B4^234.375,
234.375: B4^234.375`
const soundtrack5 = tune`
234.375: C5^234.375 + F4~234.375,
234.375: D5^234.375 + B4^234.375,
234.375: E5^234.375 + A4^234.375 + C5-234.375 + E4~234.375,
234.375: B4^234.375 + D5^234.375,
234.375: C5^234.375 + D4~234.375,
234.375: G5^234.375,
234.375: E4~234.375 + G5^234.375,
234.375: G5^234.375,
234.375: C5^234.375 + F4~234.375,
234.375: D5^234.375 + B4^234.375,
234.375: A4^234.375 + E5^234.375 + C5-234.375 + E4~234.375,
234.375: B4^234.375 + D5^234.375,
234.375: C5^234.375 + D4~234.375,
234.375: G5^234.375,
234.375: E4~234.375 + G5^234.375,
234.375: G5^234.375,
234.375: C5^234.375 + F4~234.375,
234.375: B4^234.375 + D5^234.375,
234.375: A4^234.375 + E5^234.375 + C5-234.375 + E4~234.375,
234.375: B4^234.375 + D5^234.375,
234.375: C5^234.375 + D4~234.375,
234.375: G5^234.375,
234.375: E4~234.375 + G5^234.375,
234.375: G5^234.375,
234.375: C5^234.375 + F4~234.375,
234.375: B4^234.375 + D5^234.375,
234.375: A4^234.375 + E5^234.375 + C5-234.375 + E4~234.375,
234.375: B4^234.375 + D5^234.375,
234.375: C5^234.375 + D4~234.375,
234.375: G5^234.375,
234.375: E4~234.375 + G5^234.375,
234.375: G5^234.375`
const steps = tune`
234.375: G4^234.375,
7265.625`

const min = 0;
const max = 4;
const divisor = 10;
var score = 0;
var isGameOver = 0;
var speed = 500

const diffrentSoundtracks = Math.floor(Math.random() * (5 - 1 + 1)) + 1

if (diffrentSoundtracks === 1) {
  playTune(soundtrack1, Infinity)
}

if (diffrentSoundtracks === 2) {
  playTune(soundtrack2, Infinity)
}

if (diffrentSoundtracks === 3) {
  playTune(soundtrack3, Infinity)
}

if (diffrentSoundtracks === 4) {
  playTune(soundtrack4, Infinity)
}

if (diffrentSoundtracks === 5) {
  playTune(soundtrack5, Infinity)
}

setLegend(
  [ player, bitmap`
2255555555555522
2522222222222252
5222222222222225
5220022222200225
5202202222022025
5222222222222225
5222222222222225
5222222222222225
5202222222222025
5220222222220225
5222000000002225
5222222222222225
5222222222222225
2522222222222252
2255555555555522
2222222222222222` ],
  [ enemy, bitmap`
2233333333333322
2322222222222232
3222222222222223
3202202222022023
3220022222200223
3222222222222223
3222222222222223
3222222222222223
3222222222222223
3222000000002223
3220222222220223
3202222222222023
3222222222222223
2322222222222232
2233333333333322
2222222222222222` ],
  [ friend, bitmap`
22DDDDDDDDDDDD22
2D222222222222D2
D22222222222222D
D22002222220022D
D20220222202202D
D22222222222222D
D22222222222222D
D22222222222222D
D20222222222202D
D22022222222022D
D22200000000222D
D22222222222222D
D22222222222222D
2D222222222222D2
22DDDDDDDDDDDD22
2222222222222222` ],
  [ background, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`]
)

setSolids([])

let level = 0
const levels = [
  map`
bbbbbbbbb
bbbbbbbbb
bbbbbbbbb
bbbbbbbbb
bbbbbbbbb`
]

setMap(levels[level])

addSprite(1, 2, player)

setPushables({
  [ player ]: []
})



//this is very basic movement. The game checks everytime the player moves if
//the enemy is colliding with it.
onInput("s", () => {
  if (isGameOver === 0) {
    getFirst(player).y += 1
    playTune(steps, 1)
  }

allFriends.forEach((friendSprite) => {
  if (friendSprite.x === getFirst(player).x && friendSprite.y === getFirst(player).y) {
    getAll(enemy).forEach((enemySprite) => {
  enemySprite.remove();
});
    getAll(friend).forEach((friendSprite) => {
      friendSprite.remove();
    })
  }
  });
  
  // Check player and enemy collision
getAll(enemy).forEach((enemySprite) => {
    if (getFirst(player) && getFirst(player).x === enemySprite.x && getFirst(player).y === enemySprite.y) {
        getFirst(player).remove(); // Remove player sprite
        enemySprite.remove(); // Remove enemy sprite
        isGameOver = 1; // Update game over state

        addText("Game Over", { 
            x: 5, 
            y: 6, 
            color: color`3` 
        }); 
        clearInterval(intervalId); // Stop game loop
    }
});
})

onInput("j", () => {
 

  // Clear all sprites on the screen (except the player)
  getAll(friend).forEach(friendSprite => friendSprite.remove());
  getAll(enemy).forEach(enemySprite => enemySprite.remove());

  // Clear any displayed text
  clearText();

  // Reset game variables (if needed)
  score = 0;
  isGameOver = 0;

  // Set the initial level map
  setMap(levels[level]);

   // Reset the player position
  addSprite(1, 2, player)
});


onInput("w", () => {
  if (isGameOver === 0) {
    getFirst(player).y += -1
  playTune(steps, 1)
  }
  allFriends.forEach((friendSprite) => {
  if (friendSprite.x === getFirst(player).x && friendSprite.y === getFirst(player).y) {
    getAll(enemy).forEach((enemySprite) => {
  enemySprite.remove();
});
    getAll(friend).forEach((friendSprite) => {
      friendSprite.remove();
    })
  }
  });
  // Check player and enemy collision
getAll(enemy).forEach((enemySprite) => {
    if (getFirst(player) && getFirst(player).x === enemySprite.x && getFirst(player).y === enemySprite.y) {
        getFirst(player).remove(); // Remove player sprite
        enemySprite.remove(); // Remove enemy sprite
        isGameOver = 1; // Update game over state

        addText("Game Over", { 
            x: 5, 
            y: 6, 
            color: color`3` 
        }); 
        clearInterval(intervalId); // Stop game loop
    }
});
})

//this is the main game loop. It repetes everything in here every 0.7 seconds
var intervalId =setInterval(() =>
{
  
  addText("Score: " + score, 
            { 
              x: 0, 
              y: 0, 
              color: color`2` 
            }); 
  
  //this code is making the enemies and freinds spawn at a random location every 0.7 seconds
  const randomEnemySpawn = Math.floor(Math.random() * (max - min + 1)) + min
  const randomFriendSpawn = Math.floor(Math.random() * (max - min + 1)) + min
  const allEnemies = getAll(enemy)
  const allFriends = getAll(friend)

  addSprite(8, randomEnemySpawn, enemy)

  allFriends.forEach((friendSprite) => {
    friendSprite.x -= 1
  })

  //this uses the mod function, or %, to check if the score is divisable by 9
  //if it is, then it will add the friend at a random location
  if(score % divisor === 9)
    {
      addSprite(8, randomFriendSpawn, friend)
    }
  
  //this code makes the bad influences get deleted when they touch the end of the screen.
  //I made it look more natural by adding a 0.7 second timer before it gets deleted
  if(getAll(enemy).length > 0)
  {
    getAll(enemy).forEach((enemySprite) => {
      if(enemySprite.x === 1) {
          setTimeout(() => {
          enemySprite.remove()
          score = score + 1
      }, 700)
      }
    })
}

//this deletes the friend as soon as it touches the end of the screen.
if (getAll(friend).length === 1) {
    const firstFriend = getFirst(friend);
    if (firstFriend && firstFriend.x === 0) {
        setTimeout(() => {
            firstFriend.remove();
        }, 700);
    }
}


//this code checks every time the friend moves if it is overlapping with the player.
  allFriends.forEach((friendSprite) => {
  if (friendSprite.x === getFirst(player).x && friendSprite.y === getFirst(player).y) {
    getAll(enemy).forEach((enemySprite) => {
  enemySprite.remove();
});
    getAll(friend).forEach((friendSprite) => {
      friendSprite.remove();
    })
  }
  });
  
}, speed);

//this handles the enemy movement and collision.
if(isGameOver === 1) {
    clearInterval(movement);
  }
  else {
    let movement = setInterval(() => {

  //this make the enemy move left
  if (isGameOver === 0) {
  getAll(enemy).forEach((enemySprite) => {
    enemySprite.x -= 1
  })
  }

  

  //this is the collision detection between the player and the enemy
if (isGameOver === 0) {
  // Check player and enemy collision
getAll(enemy).forEach((enemySprite) => {
    if (getFirst(player) && getFirst(player).x === enemySprite.x && getFirst(player).y === enemySprite.y) {
        getFirst(player).remove(); // Remove player sprite
        enemySprite.remove(); // Remove enemy sprite
        isGameOver = 1; // Update game over state

        addText("Game Over", { 
            x: 5, 
            y: 6, 
            color: color`3` 
        }); 
        clearInterval(intervalId); // Stop game loop
    }
});
}
  
}, speed);
  }



