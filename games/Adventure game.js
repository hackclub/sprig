/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Adventure game
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const slime = "s"
const bat = "b"
const ghost = "g"
const shop = "h"
const floor1 = "f" 
const floor2 = "v"
const playerwithSword = "o"
const playerwithPistol = "i"

setLegend(
  [ player, bitmap`
....00000000....
...0CCCCCCCC0...
..0CCCCCCCCCC0..
..0C000000000...
..0C0......0....
..0C0.0..0.0....
..0C0.0..0.0....
...00......0....
....00....0.....
..000700007000..
.0.7777777777.0.
0..0077777700..0
000.07777770.000
....00000000....
....050..050....
....0000.0000...`],
  [ slime, bitmap`
................
......0000......
....00666600....
...0666666660...
..066666666660..
..066666666660..
.06660666606660.
.06666666666660.
.06666666666660.
.06666000066660.
.06466666666660.
0464466446644640
0440044004400440
.00..00..00..00.
................
................` ],
  [ bat, bitmap`
................
....00....00....
....000..000....
....00000000....
....00000000....
....00C00C00....
00..00000000..00
000..000000..000
.000..0000..000.
.0000000000000..
..000000000000..
..000000000000..
...0..0000..0...
......0..0......
.....00..00.....
................` ],
  [ ghost, bitmap`
................
.....777777.....
....72222227....
...7222222227...
..722222222227..
..722722227227..
..727472274727..
..727472274727..
..722722227227..
..722222222227..
..722722222227..
..722722722227..
.7222727.722227.
7.777727..772227
7.7.72277.7.7227
777.777..77..777` ],
  [ shop, bitmap`
................
................
......0000......
....00....00....
...00......00...
.000........000.
00............00
.0............0.
.0............0.
.0......0000..0.
.0......0..0..0.
.0......0..0..0.
.0......0.00..0.
.0......0..0..0.
.00000000000000.
................`],
  [floor1, bitmap`
................
................
................
................
................
................
................
0000000000000000
0000000000000000
................
................
................
................
................
................
................`],
  [floor2, bitmap`
................
................
................
................
................
................
................
0000000000000000
0000000000000000
................
................
................
................
................
................
................`],
  [playerwithSword, bitmap`
..00000000......
.0CCCCCCCC0.....
0CCCCCCCCCC0....
0C000000000.....
0C0......0......
0C0.0..0.0....00
0C0.0..0.0...000
.00......0..000.
..00....0.1000..
..07000070010...
..07777770101...
..077777700.....
..07777770......
..00000000......
..050..050......
..0000.0000.....`],
  [playerwithPistol, bitmap`
..00000000......
.0CCCCCCCC0.....
0CCCCCCCCCC0....
0C000000000.....
0C0......0......
0C0.0..0.0......
0C0.0..0.0......
.00......0......
..00....0.......
..070000700.LLLL
..0777777000L0..
..07777770.0L...
..07777770......
..00000000......
..050..050......
..0000.0000.....`]
)


setSolids([ player, playerwithSword, playerwithPistol, shop, slime, bat, ghost, floor1, floor2]) 
let money = 100 
let level = 6 
let currentPlayerTile = player; 
let hasSword = false;
let hasPistol = false;
let isJumping = false; 
let slimeHitCount = 0; 
let batHitCount = 0; 
let ghostHitCount = 0; 

const JUMP_DELAY_MS = 700; 
const SLIME_MOVE_INTERVAL_MS = 1000;
const BAT_MOVE_FAST_MS = 500;
const BAT_MOVE_SLOW_MS = 3000;
const GHOST_MOVE_FAST_MS = 250;
const GHOST_MOVE_SLOW_MS = 1500;


const levels = [
  map`
.h.....
f.fffff
p......
....s..
vvvvvvv`, 
  map`
.......
.......
.......
.......
p.....s`, 
  map`
.......
.......
.......
.......
.......`, 
  map`
.......
fffffff
pb.....
......g
vvvvvvv`, 
  map`
.......
.......
.......
.......
b.....p` ,
  map`
.......
.......
.......
.......
g.....p`, 
  map`
.......
.......
.......
.......
.......` 
]

setMap(levels[6]) 
addText("Press L to start", { x: 2, y: 8, color: color`8` });
addText("*Press L", { x: 0, y: 12, color: color`8` });
addText("to interact/fight", { x: 0, y: 13, color: color`8` });

setPushables({
  [ player ]: []
})

const updateScoreText = () => {
    clearText("scoreText");
    addText("Money: " + money, { x: 10, y: 2, color: color`8`, tag: "scoreText"});
}

function gameOverHandler() {
    if (level === -1) return; 
    level = -1; 
    
    clearText();
    addText("GAME OVER", { x: 3, y: 4, color: color`3`, tag: "winScreen" }); 
    addText("Monster Got You!", { x: 2, y: 5, color: color`3`, tag: "winScreen" }); 
    
    addText("Press A to restart", { x: 0, y: 14, color: color`3`, tag: "restartText"});
    
    clearInterval(slimeInterval);
    clearTimeout(batTimeout); 
    clearTimeout(ghostTimeout);
    
    const playerSprite = getFirst(currentPlayerTile);
    if (playerSprite) {
        playerSprite.remove();
    }
}

function gameWinHandler() {
    if (level === -2) return; 
    
    level = -2; 
    
    clearInterval(slimeInterval);
    clearTimeout(batTimeout); 
    clearTimeout(ghostTimeout);

    clearText();
    addText("YOU WIN!", { x: 4, y: 4, color: color`f`, tag: "winScreen" });
    addText("Reward: Ghost Defeated", { x: 1, y: 5, color: color`f`, tag: "winScreen" });
    
    const playerSprite = getFirst(currentPlayerTile);
    if (playerSprite) {
        playerSprite.remove();
    }
}


function checkCollisionAndMove(dx, dy) {
    const playerSprite = getFirst(currentPlayerTile);
    if (!playerSprite || level === -1 || level === -2) return;

    const nextX = playerSprite.x + dx;
    const nextY = playerSprite.y + dy;

    if (level === 1) {
        const slimeSprite = getFirst(slime);
        if (slimeSprite && nextX === slimeSprite.x && nextY === slimeSprite.y) {
            gameOverHandler();
            return; 
        }
    }
    if (level === 4) {
        const batSprite = getFirst(bat);
        if (batSprite && nextX === batSprite.x && nextY === batSprite.y) {
            gameOverHandler();
            return; 
        }
    }
    if (level === 5) {
        const ghostSprite = getFirst(ghost);
        if (ghostSprite && nextX === ghostSprite.x && nextY === ghostSprite.y) {
            gameOverHandler();
            return;
        }
    }


    playerSprite.x = nextX;
    playerSprite.y = nextY;
}


onInput("w", () => {
    if (level === 6 || level === -1 || level === -2) return;

  const playerSprite = getFirst(currentPlayerTile); 
  
  if(level === 0 || level === 3){
    if (level === 0 && getFirst(slime) && playerSprite.x === getFirst(slime).x && playerSprite.y - 1 === getFirst(slime).y) {
        gameOverHandler();
    } 
    else if (level === 3 && getFirst(bat) && playerSprite.x === getFirst(bat).x && playerSprite.y - 1 === getFirst(bat).y) {
        gameOverHandler();
    }
    else if (level === 3 && getFirst(ghost) && playerSprite.x === getFirst(ghost).x && playerSprite.y - 1 === getFirst(ghost).y) {
        gameOverHandler();
    }
    else {
      checkCollisionAndMove(0, -1); 
    }
  }
  else if (level === 1 || level === 4 || level === 5) {
      if (!isJumping) { 
          isJumping = true; 
          
          let monsterSprite = null;
          let monsterType = null;

          if (level === 1) {
              monsterSprite = getFirst(slime);
              monsterType = slime;
          } else if (level === 4) {
              monsterSprite = getFirst(bat);
              monsterType = bat;
          } else if (level === 5) {
                monsterSprite = getFirst(ghost);
                monsterType = ghost;
            }
          
          if (monsterSprite && playerSprite.x === monsterSprite.x && playerSprite.y - 1 === monsterSprite.y) {
              gameOverHandler();
              isJumping = false; 
              return;
          }

          playerSprite.y -= 1;        

            setTimeout(() => {
                if (level === 1 || level === 4 || level === 5) {
                    
                    let landingMonster = getFirst(monsterType);

                    if (landingMonster && playerSprite.x === landingMonster.x && playerSprite.y + 1 === landingMonster.y) {
                        gameOverHandler();
                    } else {
                        playerSprite.y += 1; 
                    }
                }
                isJumping = false;   
            }, JUMP_DELAY_MS); 
      }
  }
  else if (level === 2) { 
      if (money >= 10 && !hasSword) { 
        money -= 10 ; 
        hasSword = true; 
        hasPistol = false; 
        
        currentPlayerTile = playerwithSword; 
        
        updateScoreText();
        clearText("errorText", "menu", "swordText", "pistolText", "backText");
        addText("Sword Purchased!", { x: 3, y: 6, color: color`3`});
        addText("Press A to go back", { x: 0,y: 12, color: color`8`});

      } else if (hasSword) { 
        addText("Sword Already owned!", { x: 3, y: 6, color: color`3`, tag: "errorText"});
      } else if (money < 10) { 
        addText("Not enough Money", { x: 3, y: 6, color: color`3`, tag: "errorText"});
      }
  }
});

onInput("a", () => {
    if (level === -1) {
        money = 100; 
        currentPlayerTile = player;
        hasSword = false;
        hasPistol = false;
        slimeHitCount = 0;
        batHitCount = 0;
        ghostHitCount = 0;
        isJumping = false;
        
        clearInterval(slimeInterval);
        clearTimeout(batTimeout);
        clearTimeout(ghostTimeout);
        
        clearText("winScreen", "restartText"); 
        
        setMap(levels[6]);
        level = 6;
        
        addText("Press L to start", { x: 2, y: 8, color: color`8` });
        addText("*Press L", { x: 0, y: 12, color: color`8` });
        addText("to interact/fight", { x: 0, y: 13, color: color`8` });
        
        return; 
    }
    
    if (level === 6 || level === -2) return;
    
    if (level === 2) {
        setMap(levels[0]);
        level = 0;
        
        slimeHitCount = 0; 
        batHitCount = 0;
        ghostHitCount = 0;

        const newPlayerSprite = getFirst(player);

        if (newPlayerSprite) {
            if (hasPistol) {
                newPlayerSprite.type = playerwithPistol;
                currentPlayerTile = playerwithPistol;
            } else if (hasSword) {
                newPlayerSprite.type = playerwithSword; 
                currentPlayerTile = playerwithSword;
            } else {
                currentPlayerTile = player; 
            }
        }
        
        getFirst(currentPlayerTile).x = 1;
        getFirst(currentPlayerTile).y = 1;
        
        clearText("menu", "swordText", "pistolText", "backText");
        updateScoreText();
        
        return; 
    }
    
    const playerSprite = getFirst(currentPlayerTile); 

    if (playerSprite) {
        if (playerSprite.x === 0 && level === 3) {
            setMap(levels[0]);
            level = 0; 
            
            slimeHitCount = 0;
            batHitCount = 0;
            ghostHitCount = 0;

            const newPlayerTile = getFirst(player);
            if (newPlayerTile && currentPlayerTile !== player) {
                newPlayerTile.type = currentPlayerTile;
            }
            
            getFirst(currentPlayerTile).x = 6;
            getFirst(currentPlayerTile).y = playerSprite.y;
        }
        else {
            checkCollisionAndMove(-1, 0); 
        }
    }
});

onInput("s", () => {
    if (level === 6 || level === -1 || level === -2) return;
    
  const playerSprite = getFirst(currentPlayerTile); 

  if (level === 0 || level === 1 || level === 3 || level === 4 || level === 5){ 
    checkCollisionAndMove(0, 1); 
  }
  else if (level === 2) { 
      if (money >= 100 && !hasPistol) {  
        money -= 100 ; 
        
        hasPistol = true; 
        hasSword = false; 
        
        currentPlayerTile = playerwithPistol;

        updateScoreText();
        clearText("errorText", "menu", "swordText", "pistolText", "backText");
        addText("Pistol Purchased!", { x: 3, y: 7, color: color`3`});
        addText("Press A to go back", { x: 0,y: 12, color: color`8`});

      } else if (hasPistol) { 
        addText("Pistol Already owned!", { x: 3, y: 7, color: color`3`, tag: "errorText"});
      } else {
        addText("Not enough Money", { x: 3, y: 7, color: color`3`, tag: "errorText"});
      }
  };
})

onInput("d", () => {
    if (level === 6 || level === -1 || level === -2) return;
    
  const playerSprite = getFirst(currentPlayerTile); 

  if (playerSprite.x === 6 && level === 0 ){
    let playerY = playerSprite.y;
    setMap(levels[3]);
    level = 3;
    
    const newPlayerTile = getFirst(player);
    if (newPlayerTile && currentPlayerTile !== player) {
        newPlayerTile.type = currentPlayerTile;
    }
    
    getFirst(currentPlayerTile).x = 0;
    getFirst(currentPlayerTile).y = playerY;
  }
  else {
    checkCollisionAndMove(1, 0); 
  }
})

onInput("l", () => {
    if (level === 6) {
        setMap(levels[0]);
        level = 0;
        const newPlayerSprite = getFirst(player);
        if (newPlayerSprite) {
            newPlayerSprite.x = 1;
            newPlayerSprite.y = 2;
        }

        clearText(); 
        updateScoreText(); 
        return;
    }
    if (level === -1 || level === -2) return;
    
  const playerSprite = getFirst(currentPlayerTile); 
  const slimeSprite = getFirst(slime);
  const batSprite = getFirst(bat); 
  const ghostSprite = getFirst(ghost); 


    if (level === 3 && ghostSprite) {
        
        const adjacentGhost = (playerSprite.x === ghostSprite.x - 1 && playerSprite.y === ghostSprite.y) || 
                            (playerSprite.x === ghostSprite.x + 1 && playerSprite.y === ghostSprite.y) || 
                            (playerSprite.x === ghostSprite.x && playerSprite.y === ghostSprite.y - 1) || 
                            (playerSprite.x === ghostSprite.x && playerSprite.y === ghostSprite.y + 1); 

        if (adjacentGhost) {
            setMap(levels[5]);
            level = 5;
            startMonsterMovement(); 

            const newPlayerTile = getFirst(player);
            if (newPlayerTile) {
                newPlayerTile.type = currentPlayerTile;
            }

            getFirst(currentPlayerTile).x = 6;
            getFirst(currentPlayerTile).y = 4;
            
            return;
        }
    }

    if (level === 3 && batSprite) {
        
        const adjacentBat = (playerSprite.x === batSprite.x - 1 && playerSprite.y === batSprite.y) || 
                            (playerSprite.x === batSprite.x + 1 && playerSprite.y === batSprite.y) || 
                            (playerSprite.x === batSprite.x && playerSprite.y === batSprite.y + 1);    

        if (adjacentBat) {
            setMap(levels[4]);
            level = 4;
            startMonsterMovement(); 
            
            const newPlayerTile = getFirst(player);
            if (newPlayerTile) {
                newPlayerTile.type = currentPlayerTile;
            }

            getFirst(currentPlayerTile).x = 6;
            getFirst(currentPlayerTile).y = 4;
            
            return;
        }
    }


    if (level === 1 || level === 4 || level === 5) { 
        
      let targetSprite = null;
      let targetType = null;
      let requiredSwordHits = 0;
      let requiredPistolHits = 0;
      let requiredNoWeaponHits = 0;
      let isBoss = false;
      let reward = 0; 

      
      if (level === 1) { 
          targetSprite = slimeSprite;
          targetType = slime;
          requiredSwordHits = 1; 
          requiredNoWeaponHits = 4; 
          reward = 3; 
      } else if (level === 4) { 
          targetType = bat;
          targetSprite = getFirst(bat); 
          requiredSwordHits = 3; 
          requiredPistolHits = 3; 
          requiredNoWeaponHits = 100; 
          reward = 40; 
      } else if (level === 5) { 
             targetType = ghost;
             targetSprite = getFirst(ghost);
             requiredSwordHits = 100; 
             requiredPistolHits = 5; 
             requiredNoWeaponHits = 200; 
             isBoss = true; 
             reward = 0; 
        }
      
      if (targetSprite) {
        
        let killedMonster = false;
        
        const isAdjacent = (playerSprite.y === targetSprite.y && Math.abs(playerSprite.x - targetSprite.x) === 1) || 
                           (playerSprite.x === targetSprite.x && Math.abs(playerSprite.y - targetSprite.y) === 1);


        if (currentPlayerTile === playerwithSword) {
            
            if (isAdjacent) {
                
                if (targetType === slime) {
                    slimeHitCount++;
                } else if (targetType === bat) {
                    batHitCount++;
                } else if (targetType === ghost) { 
                    ghostHitCount++;
                }
                
                let currentHits = (targetType === slime) ? slimeHitCount : (targetType === bat) ? batHitCount : ghostHitCount;
                let requiredHits = requiredSwordHits;
                
                clearText("hitCount");
                if (currentHits < requiredHits) {
                    let monsterName = (targetType === slime) ? "Slime" : (targetType === bat) ? "Bat" : "Ghost";
                    addText(`Sword Hits: ${currentHits}/${requiredHits} on ${monsterName}`, { x: 0, y: 0, color: color`4`, tag: "hitCount"});
                }
                setTimeout(() => { clearText("hitCount"); }, 500);

                if (currentHits >= requiredHits) {
                    targetSprite.remove();
                    if (isBoss) { 
                        gameWinHandler();
                        return; 
                    }
                    money += reward; 
                    
                    let monsterName = (targetType === slime) ? "Slime" : (targetType === bat) ? "Bat" : "Ghost";
                    addText(`${monsterName} DEFEATED!`, { x: 2, y: 0, color: color`4`, tag: "winText"});
                    killedMonster = true;

                    updateScoreText(); 
                }
            }
        }
        
        if (currentPlayerTile === playerwithPistol && !killedMonster) {

            if (playerSprite.x < targetSprite.x && playerSprite.y === targetSprite.y) {
                
                if (targetType === bat) {
                    
                    batHitCount++;
                    
                    let requiredHits = requiredPistolHits;

                    clearText("hitCount"); 
                    addText(`Pistol Hits: ${batHitCount}/${requiredHits}`, { x: 2, y: 0, color: color`7`, tag: "hitCount"});
                    setTimeout(() => { clearText("hitCount"); }, 500);

                    if (batHitCount >= requiredHits) {
                        targetSprite.remove();
                        money += reward; 
                        addText(`Bat SHOT!`, { x: 2, y: 0, color: color`7`, tag: "winText"});
                        killedMonster = true;
                        updateScoreText(); 
                    }
                } else if (targetType === ghost) { 
                    ghostHitCount++;
                    let requiredHits = requiredPistolHits;

                    clearText("hitCount");
                    addText(`Pistol Hits: ${ghostHitCount}/${requiredHits} on Ghost`, { x: 0, y: 0, color: color`7`, tag: "hitCount"});
                    setTimeout(() => { clearText("hitCount"); }, 500);

                    if (ghostHitCount >= requiredHits) {
                        targetSprite.remove();
                        if (isBoss) { 
                            gameWinHandler();
                            return; 
                        }
                        addText(`Ghost SHOT!`, { x: 2, y: 0, color: color`7`, tag: "winText"});
                        killedMonster = true;
                        updateScoreText();
                    }
                }
                 else if (targetType === slime) { 
                     targetSprite.remove();
                     money += reward; 
                     addText(`Slime SHOT!`, { x: 2, y: 0, color: color`7`, tag: "winText"});
                     killedMonster = true;
                       updateScoreText(); 
                }
            }
        }
        
        if (currentPlayerTile === player && (level === 1 || level === 4 || level === 5) && isAdjacent) {

            let currentHits;
            if (targetType === slime) {
                slimeHitCount++;
                currentHits = slimeHitCount;
            } else if (targetType === bat) {
                batHitCount++;
                currentHits = batHitCount;
            } else {
                ghostHitCount++;
                currentHits = ghostHitCount;
            }

            let requiredHits = requiredNoWeaponHits; 
                 
            clearText("hitCount"); 
            let monsterName = (targetType === slime) ? "Slime" : (targetType === bat) ? "Bat" : "Ghost";
            addText(`Hits: ${currentHits}/${requiredHits} on ${monsterName}`, { x: 0, y: 0, color: color`4`, tag: "hitCount"});
            setTimeout(() => { clearText("hitCount"); }, 500);

            if (currentHits >= requiredHits) {
                targetSprite.remove();
                if (isBoss) { 
                    gameWinHandler();
                    return; 
                }
                money += reward; 
                addText(`${monsterName} DEFEATED!`, { x: 2, y: 0, color: color`4`, tag: "winText"});
                killedMonster = true;
                updateScoreText(); 
            }
        }


        if (killedMonster) {
            if (!isBoss) {
                handleCombatWinTransition();
                return;
            }
        }
      }
  }


  if ((level === 1 || level === 4 || level === 5) && (currentPlayerTile === playerwithSword || currentPlayerTile === playerwithPistol)) {
    if (level === 4 && currentPlayerTile === playerwithPistol) {
        let target = getFirst(bat);
        if (target && playerSprite.x > target.x) {
            addText("Attack missed!", { x: 2, y: 0, color: color`3`, tag: "missText"});
            setTimeout(() => {clearText("missText");}, 500);
        } else if (target && playerSprite.y !== target.y) {
             addText("Attack missed!", { x: 2, y: 0, color: color`3`, tag: "missText"});
            setTimeout(() => {clearText("missText");}, 500);
        }
    } else {
        addText("Attack missed!", { x: 2, y: 0, color: color`3`, tag: "missText"});
        setTimeout(() => {clearText("missText");}, 500);
    }
  }
  
  if (playerSprite.x === 1 && playerSprite.y === 1 && level === 0) {
    setMap(levels[2]);
    level = 2; 
    addText("Menu:", { x: 1, y: 5, color: color`8` , tag: "menu"});
    addText("W. 10 Sword", { x: 1, y: 6, color: color`8`, tag: "swordText" });
    addText("S. 100 Pistol", { x: 1, y: 7, color: color`8`, tag: "pistolText" });
    addText("A. Back", { x: 1, y: 8, color: color`8`, tag: "backText" });
    
  }

  if (playerSprite.x === 4 && playerSprite.y === 2 && level === 0 || playerSprite.x === 3 && playerSprite.y === 3 && level === 0 || playerSprite.x === 5 && playerSprite.y === 3 && level === 0 ) {
    setMap(levels[1]);
    level = 1; 
    startMonsterMovement(); 
    
    slimeHitCount = 0;
    batHitCount = 0;
    ghostHitCount = 0;

    const newPlayerTile = getFirst(player);
    if (newPlayerTile) {
        if (hasPistol) {
            newPlayerTile.type = playerwithPistol;
            currentPlayerTile = playerwithPistol;
        } else if (hasSword) {
            newPlayerTile.type = playerwithSword;
            currentPlayerTile = playerwithSword;
        }
    }
  } 
});

function handleCombatWinTransition() {
    clearInterval(slimeInterval);
    clearTimeout(batTimeout); 
    clearTimeout(ghostTimeout); 
    
    slimeHitCount = 0;
    batHitCount = 0;
    ghostHitCount = 0;

    setTimeout(() => {
        clearText("winText");
        setMap(levels[0]);
        level = 0;
        
        const newPlayerSprite = getFirst(player); 
        if (newPlayerSprite) {
            newPlayerSprite.type = currentPlayerTile; 
        }
        
        const finalPlayerSprite = getFirst(currentPlayerTile); 
        if (finalPlayerSprite) {
            finalPlayerSprite.x = 4;
            finalPlayerSprite.y = 3;
        }

        updateScoreText(); 
    }, 800);
}


let slimeInterval;
let batTimeout; 
let ghostTimeout; 

function startMonsterMovement() {
    if (slimeInterval) clearInterval(slimeInterval);
    if (batTimeout) clearTimeout(batTimeout);
    if (ghostTimeout) clearTimeout(ghostTimeout); 
    
    slimeInterval = setInterval(() => {
        if (level === 1) {
            
            if (isJumping) {
                return;
            }

            const slimeSprite = getFirst(slime);
            const playerSprite = getFirst(currentPlayerTile);

            if (slimeSprite && playerSprite && level !== -1 && level !== -2) { 
                
                const dx = playerSprite.x - slimeSprite.x;
                
                let direction = 0;
                
                if (dx > 0) {
                    direction = 1;
                } else if (dx < 0) {
                    direction = -1;
                }
                
                const nextX = slimeSprite.x + direction;

                if (nextX >= 0 && nextX <= 6) {
                    if (nextX === playerSprite.x && slimeSprite.y === playerSprite.y) {
                            gameOverHandler();
                            return;
                    }
                    
                    slimeSprite.x = nextX;
                }
            }
        }
    }, SLIME_MOVE_INTERVAL_MS);

    function moveBat() {
        if (level === 4) {
            
            const batSprite = getFirst(bat);
            const playerSprite = getFirst(currentPlayerTile);

            if (batSprite && playerSprite && level !== -1 && level !== -2) { 
                
                const dx = playerSprite.x - batSprite.x;
                let direction = 0;
                
                if (dx > 0) {
                    direction = 1;
                } else if (dx < 0) {
                    direction = -1;
                }
                
                const nextX = batSprite.x + direction;
                
                const targetY = playerSprite.y; 

                if (nextX >= 0 && nextX <= 6 && targetY >= 0 && targetY <= 4) {
                    if (nextX === playerSprite.x && targetY === playerSprite.y) {
                            gameOverHandler();
                            return;
                    }
                    
                    batSprite.x = nextX;
                    batSprite.y = targetY; 
                }
            }
            
            let speed = BAT_MOVE_FAST_MS;
            if (isJumping) {
                speed = BAT_MOVE_SLOW_MS;
            }
            
            batTimeout = setTimeout(moveBat, speed);

        } else {
            clearTimeout(batTimeout);
        }
    }

    function moveGhost() {
        if (level === 5) {
            
            const ghostSprite = getFirst(ghost);
            const playerSprite = getFirst(currentPlayerTile);

            if (ghostSprite && playerSprite && level !== -1 && level !== -2) { 
                
                const dx = playerSprite.x - ghostSprite.x;
                const dy = playerSprite.y - ghostSprite.y;

                let nextX = ghostSprite.x;
                let nextY = ghostSprite.y;
                let moved = false;
                
                if (Math.abs(dx) >= Math.abs(dy)) {
                    if (dx !== 0) {
                        nextX += (dx > 0 ? 1 : -1);
                        moved = true;
                    } else if (dy !== 0) {
                        nextY += (dy > 0 ? 1 : -1);
                        moved = true;
                    }
                } 
                else {
                    if (dy !== 0) {
                        nextY += (dy > 0 ? 1 : -1);
                        moved = true;
                    } else if (dx !== 0) {
                        nextX += (dx > 0 ? 1 : -1);
                        moved = true;
                    }
                }
                
                if (moved && nextX >= 0 && nextX <= 6 && nextY >= 0 && nextY <= 4) {
                    
                    if (nextX === playerSprite.x && nextY === playerSprite.y) {
                            gameOverHandler();
                            return;
                    }
                    
                    ghostSprite.x = nextX;
                    ghostSprite.y = nextY;
                }
            }
            
            let speed = GHOST_MOVE_FAST_MS;
            if (isJumping) {
                speed = GHOST_MOVE_SLOW_MS;
            }
            
            ghostTimeout = setTimeout(moveGhost, speed);

        } else {
            clearTimeout(ghostTimeout);
        }
    }

    if (level === 4) {
        moveBat();
    }
    if (level === 5) { 
        moveGhost();
    }
}

startMonsterMovement();


afterInput(() => {
});