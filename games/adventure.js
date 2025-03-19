/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: adventure
@author: Loshua1
@tags: []
@addedOn: 2025-03-07
*/

const bandit = "a"
const blankInventory = "b"
const rock = "c"
const knight = "d"
const grass = "f"
const hat = "g"
const slash = "i"
const upFireball = "n"
const leftFireball = "o"
const downFireball = "p"
const rightFireball = "q"
const player = "r"
const sword = "s"
const wizard = "w"


setLegend(
  [ player, bitmap`
................
................
...0000000000...
..070777777070..
..077077770770..
..077707707770..
..077777777770..
..070007700070..
..077077770770..
..077777777770..
..077077770770..
..077700007770..
..077777777770..
...0000000000...
................
................` ],
  [ wizard, bitmap`
...000000.......
..0LLLLLL0......
.060LLLLL0......
..0.0LLLLL0.....
...0LLLLLLL0....
..0LLLLLLLLL0...
00LLLLLLLLLLL00.
0000000000000000
..077077770770..
..077777777770..
..077077770770..
..077700007770..
..077777777770..
...0000000000...
................
................` ],
  [ hat, bitmap`
................
................
................
................
...000000.......
..0LLLLLL0......
.060LLLLL0......
..0.0LLLLL0.....
...0LLLLLLL0....
..0LLLLLLLLL0...
00LLLLLLLLLLL00.
0000000000000000
................
................
................
................` ],
  [ upFireball, bitmap`
................
................
................
.....666666.....
....69999996....
...6993333996...
...6933333396...
...6933333396...
...6933333396...
...6933333396...
...6993333996...
....69933996....
.....699996.....
......6996......
.......66.......
................`],
  [ leftFireball, bitmap`
................
................
................
.....666666.....
....69999996....
...6993333996...
..69933333396...
.699333333396...
.699333333396...
..69933333396...
...6993333996...
....69999996....
.....666666.....
................
................
................`],
  [ downFireball, bitmap`
................
.......66.......
......6996......
.....699996.....
....69933996....
...6993333996...
...6933333396...
...6933333396...
...6933333396...
...6933333396...
...6993333996...
....69999996....
.....666666.....
................
................
................`],
  [ rightFireball, bitmap`
................
................
................
.....666666.....
....69999996....
...6993333996...
...69333333996..
...693333333996.
...693333333996.
...69333333996..
...6993333996...
....69999996....
.....666666.....
................
................
................`],
  [ grass, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ bandit, bitmap`
................
................
................
...00000000.....
..02L2222L20....
..022L22L220..1.
..0222222220.L12
..022L22L220.L12
..022L22L220.L12
..0222222220.000
..02L2222L20..0.
..022LLLL220....
...00000000.....
................
................
................`],
  [ rock, bitmap`
................
................
......00........
.....0L10.......
.....0L110......
....0LL1110.....
...0LL111220....
...0LL111220....
...0LL1112220...
..0LL11122220...
..0LL111222220..
..0LL1112222220.
..0LL1112222220.
.0LL11122222220.
.00000000000000.
................`],
  [ sword, bitmap`
.......0........
......020.......
......020.......
.....0L120......
.....0L120......
.....0L120......
.....0L120......
.....0L120......
.....0L120......
....0000000.....
...0CCCCCCC0....
....0000000.....
......0F0.......
......0F0.......
.......0........
................`],
  [ knight, bitmap`
................
......0000......
....00111100....
...011LLLL110...
...01LLLLLL10...
..01LLL00LLL10..
..0L77011077L0..
..0LL01LL10LL0..
..0L01L00L10L0..
..001LL00LL100..
..01L0L00L0L10..
..0LL0L00L0LL0..
...00LL00LL00...
.....00LL00.....
.......00.......
................` ],
  [ slash, bitmap`
...0000000......
.....0222200....
......0002220...
....LLLLL00220..
......L1111020..
.......LL110220.
.........L11020.
..........L1020.
.....0...L10220.
....0C0..00220..
..000C0002220...
.0FF0C022200....
..000C0000......
....0C0.........
.....0..........
................` ],
)

setSolids([player,rock,wizard, knight, bandit])

let level = 1
const levels = [
  //loss
  map`
.......
.......
.......
.......
.......`,
  //choose class
  map`
cccccccccc
c...ccccc.
c.....g...
c...ccccc.
c...ccccc.
c...ccccc.
c.....s...
c...ccccc.
cccccccccc`,
  //fight
  map`
............
cccccccccccc
c..........c
c..........c
c..........c
c..........c
c..........c
cccccccccccc
............`,
]

setMap(levels[level])

setBackground(grass)

let currentPlayer = player;
let turnNumber = 0;

function getCurrentPlayer() {
  return getFirst(currentPlayer);
}

const playerSprite = getCurrentPlayer();
let playerHP = 10;
let enemyHP = 10;
let attackX = -99999;
let attackY = -99999;
let attackDuration = 0;
addSprite(2, 4, currentPlayer);
let playerXNow = getCurrentPlayer().x;
let playerYNow = getCurrentPlayer().y;
let direction = "right";
let fireballExists = false;
let fireballDirection = "up";
let fireballRecentlySpawned = false;

setPushables({
  [ player ]: []
})

onInput("w", () => {
  if(attackX == getCurrentPlayer().x && attackY == getCurrentPlayer().y - 1)
  {}
  else
  {
    getCurrentPlayer().y -= 1
    direction = "up";
  }
})

onInput("a", () => {
  if(attackX == getCurrentPlayer().x - 1 && attackY == getCurrentPlayer().y)
  {}
  else
  {
    getCurrentPlayer().x -= 1
    direction = "left";
  }
})

onInput("s", () => {
  if(attackX == getCurrentPlayer().x && attackY == getCurrentPlayer().y + 1)
  {}
  else
  {
    getCurrentPlayer().y += 1
    direction = "down";
  }
})

onInput("d", () => {
  if(attackX == getCurrentPlayer().x + 1 && attackY == getCurrentPlayer().y)
  {}
  else
  {
    getCurrentPlayer().x += 1
    direction = "right";
  }
})

onInput("j", () => {
  if(level == 0)
  {
    clearText();
    attackX = -99999;
    attackY = -99999;
    attackDuration = 0;
    direction = "right";
    fireballExists = false;
    fireballDirection = "up";
    fireballRecentlySpawned = false;
    playerHP = 10;
    enemyHP = 10;
    level = 1;
    setMap(levels[level]);
    currentPlayer = player;
    addSprite(2, 4, currentPlayer);
    playerXNow = getCurrentPlayer().x;
    playerYNow = getCurrentPlayer().y;
  }
})

onInput("l", () => {
  const knightSprite = getFirst(knight);
  const wizardSprite = getFirst(wizard);
  
  if(knightSprite)
  {
    if(direction == "up")
    {
      const tileContents = getTile(knightSprite.x, knightSprite.y - 1);
      if (tileContents.length == 0)
      {
        addSprite(knightSprite.x, knightSprite.y - 1, slash);
        attackX = knightSprite.x;
        attackY = knightSprite.y-1;
        attackDuration = 0;
        console.log(enemyHP);
      }
      else
      {
        tileContents.forEach(sprite => {
          console.log(sprite.type); 
          if(sprite.type == "a")
          {
            enemyHP--;
            clearText();
            addText("HP: " + playerHP, {
              x:7,
              y:1,
              color: color`0`
            });
            addText("Enemy HP: " + enemyHP, {
              x:5,
              y:14,
              color: color`0`
            })
          }
        });
      }
    }
    else if(direction == "left")
    {
      const tileContents = getTile(knightSprite.x - 1, knightSprite.y);
      if (tileContents.length == 0)
      {
        addSprite(knightSprite.x - 1, knightSprite.y, slash);
        attackX = knightSprite.x - 1;
        attackY = knightSprite.y;
        attackDuration = 0;
        console.log(enemyHP);
      }
      else
      {
        tileContents.forEach(sprite => {
          console.log(sprite.type); 
          if(sprite.type == "a")
          {
            enemyHP--;
            clearText();
            addText("HP: " + playerHP, {
              x:7,
              y:1,
              color: color`0`
            });
            addText("Enemy HP: " + enemyHP, {
              x:5,
              y:14,
              color: color`0`
            })
          }
        });
      }
    }
    else if(direction == "down")
    {
      const tileContents = getTile(knightSprite.x, knightSprite.y + 1);
      if (tileContents.length == 0)
      {
        addSprite(knightSprite.x, knightSprite.y + 1, slash);
        attackX = knightSprite.x;
        attackY = knightSprite.y + 1;
        attackDuration = 0;
        console.log(enemyHP);
      }
      else
      {
        tileContents.forEach(sprite => {
          console.log(sprite.type); 
          if(sprite.type == "a")
          {
            enemyHP--;
            clearText();
            addText("HP: " + playerHP, {
              x:7,
              y:1,
              color: color`0`
            });
            addText("Enemy HP: " + enemyHP, {
              x:5,
              y:14,
              color: color`0`
            })
          }
        });
      }
    }
    else if(direction == "right")
    {
      const tileContents = getTile(knightSprite.x + 1, knightSprite.y);
      if (tileContents.length == 0)
      {
        addSprite(knightSprite.x + 1, knightSprite.y, slash);
        attackX = knightSprite.x + 1;
        attackY = knightSprite.y;
        attackDuration = 0;
        console.log(enemyHP);
      }
      else
      {
        tileContents.forEach(sprite => {
          console.log(sprite.type); 
          if(sprite.type == "a")
          {
            enemyHP--;
            clearText();
            addText("HP: " + playerHP, {
              x:7,
              y:1,
              color: color`0`
            });
            addText("Enemy HP: " + enemyHP, {
              x:5,
              y:14,
              color: color`0`
            })
          }
        });
      }
    }
  }
  else if(wizardSprite)
  {
    // console.log("wizard exists");
    if(direction == "up")
    {
      if(!fireballExists)
      {
        // console.log("no fireball exists");
        const tileContents = getTile(wizardSprite.x, wizardSprite.y - 1);
        if (tileContents.length == 0)
        {
          // console.log("x: " + wizardSprite.x + "   y: " + wizardSprite.y);
          addSprite(wizardSprite.x, wizardSprite.y - 1, upFireball);
          attackX = wizardSprite.x;
          attackY = wizardSprite.y-1;
          fireballDirection = "up";
          fireballExists = true;
          fireballRecentlySpawned = true;
          // console.log(enemyHP);
        }
        else
        {
          tileContents.forEach(sprite => {
            // console.log(sprite.type); 
            if(sprite.type == "a")
            {
              enemyHP=enemyHP - 2;
              clearText();
              addText("HP: " + playerHP, {
                x:7,
                y:1,
                color: color`0`
              });
              addText("Enemy HP: " + enemyHP, {
                x:5,
                y:14,
                color: color`0`
              })
            }
          });
        }
      }
    }
    else if(direction == "left")
    {
      if(!fireballExists)
      {
        // console.log("no fireball exists");
        const tileContents = getTile(wizardSprite.x - 1, wizardSprite.y);
        if (tileContents.length == 0)
        {
          addSprite(wizardSprite.x - 1, wizardSprite.y, rightFireball);
          attackX = wizardSprite.x - 1;
          attackY = wizardSprite.y;
          fireballDirection = "right";
          fireballExists = true;
          fireballRecentlySpawned = true;
          // console.log(enemyHP);
        }
        else
        {
          tileContents.forEach(sprite => {
            // console.log(sprite.type); 
            if(sprite.type == "a")
            {
              enemyHP=enemyHP - 2;
              clearText();
              addText("HP: " + playerHP, {
                x:7,
                y:1,
                color: color`0`
              });
              addText("Enemy HP: " + enemyHP, {
                x:5,
                y:14,
                color: color`0`
              })
            }
          });
        }
      }
    }
    else if(direction == "down")
    {
      if(!fireballExists)
      {
        // console.log("no fireball exists");
        const tileContents = getTile(wizardSprite.x, wizardSprite.y + 1);
        if (tileContents.length == 0)
        {
          addSprite(wizardSprite.x, wizardSprite.y + 1, downFireball);
          attackX = wizardSprite.x;
          attackY = wizardSprite.y + 1;
          fireballDirection = "down";
          fireballExists = true;
          fireballRecentlySpawned = true;
          // console.log(enemyHP);
        }
        else
        {
          tileContents.forEach(sprite => {
            // console.log(sprite.type); 
            if(sprite.type == "a")
            {
              enemyHP=enemyHP - 2;
              clearText();
              addText("HP: " + playerHP, {
                x:7,
                y:1,
                color: color`0`
              });
              addText("Enemy HP: " + enemyHP, {
                x:5,
                y:14,
                color: color`0`
              })
            }
          });
        }
      }
    }
    else if(direction == "right")
    {
      if(!fireballExists)
      {
        // console.log("no fireball exists");
        const tileContents = getTile(wizardSprite.x + 1, wizardSprite.y);
        if (tileContents.length == 0)
        {
          addSprite(wizardSprite.x + 1, wizardSprite.y, leftFireball);
          attackX = wizardSprite.x + 1;
          attackY = wizardSprite.y;
          fireballDirection = "left";
          fireballExists = true;
          fireballRecentlySpawned = true;
          // console.log(enemyHP);
        }
        else
        {
          tileContents.forEach(sprite => {
            // console.log(sprite.type); 
            if(sprite.type == "a")
            {
              enemyHP=enemyHP - 2;
              clearText();
              addText("HP: " + playerHP, {
                x:7,
                y:1,
                color: color`0`
              });
              addText("Enemy HP: " + enemyHP, {
                x:5,
                y:14,
                color: color`0`
              })
            }
          });
        }
      }
    }
  }
})


afterInput(() => {
  
  const slashSprite = getFirst(slash);
  const wizardSprite = getFirst(wizard);
  
  if(slashSprite)
  {
    console.log("passing through")
    if(attackDuration == 0)
    {
      console.log("adding duration")
      attackDuration++;
    }
    else
    {
      console.log("removing attack")
      clearTile(attackX, attackY)
    }
  }

  if(fireballExists)
  {
    if(!fireballRecentlySpawned)
    {
      if(fireballDirection == "up")
      {
        // console.log("1");
        const tileContents = getTile(attackX, attackY - 1);
        if(tileContents.length == 0)
        {
          console.log("moving fireball");
          clearTile(attackX, attackY);
          attackY--;
          addSprite(attackX, attackY, upFireball);
        }
        else
        {
          tileContents.forEach(sprite => {
            console.log(sprite.type); 
            if(sprite.type == "a")
            {
              enemyHP=enemyHP - 2;
              clearText();
              addText("HP: " + playerHP, {
                x:7,
                y:1,
                color: color`0`
              });
              addText("Enemy HP: " + enemyHP, {
                x:5,
                y:14,
                color: color`0`
              })
              clearTile(attackX, attackY);
              fireballExists = false;
            }
            else if(sprite.type == "c")
              clearTile(attackX, attackY);
              fireballExists = false;
          })
        }
      }
      else if(fireballDirection == "left")
      {
        // console.log("1");
        const tileContents = getTile(attackX + 1, attackY);
        if(tileContents.length == 0)
        {
          console.log("moving fireball");
          clearTile(attackX, attackY);
          attackX++;
          addSprite(attackX, attackY, leftFireball);
        }
        else
        {
          tileContents.forEach(sprite => {
            console.log(sprite.type); 
            if(sprite.type == "a")
            {
              enemyHP=enemyHP - 2;
              clearText();
              addText("HP: " + playerHP, {
                x:7,
                y:1,
                color: color`0`
              });
              addText("Enemy HP: " + enemyHP, {
                x:5,
                y:14,
                color: color`0`
              })
              clearTile(attackX, attackY);
              fireballExists = false;
            }
            else if(sprite.type == "c")
              clearTile(attackX, attackY);
              fireballExists = false;
          })
        }
      }
      else if(fireballDirection == "down")
      {
        // console.log("1");
        const tileContents = getTile(attackX, attackY + 1);
        if(tileContents.length == 0)
        {
          console.log("moving fireball");
          clearTile(attackX, attackY);
          attackY++;
          addSprite(attackX, attackY, downFireball);
        }
        else
        {
          tileContents.forEach(sprite => {
            console.log(sprite.type); 
            if(sprite.type == "a")
            {
              enemyHP=enemyHP - 2;
              clearText();
              addText("HP: " + playerHP, {
                x:7,
                y:1,
                color: color`0`
              });
              addText("Enemy HP: " + enemyHP, {
                x:5,
                y:14,
                color: color`0`
              })
              clearTile(attackX, attackY);
              fireballExists = false;
            }
            else if(sprite.type == "c")
              clearTile(attackX, attackY);
              fireballExists = false;
          })
        }
      }
      else if(fireballDirection == "right")
      {
        // console.log("1");
        const tileContents = getTile(attackX - 1, attackY);
        if(tileContents.length == 0)
        {
          console.log("moving fireball");
          clearTile(attackX, attackY);
          attackX--;
          addSprite(attackX, attackY, rightFireball);
        }
        else
        {
          tileContents.forEach(sprite => {
            console.log(sprite.type); 
            if(sprite.type == "a")
            {
              enemyHP=enemyHP - 2;
              clearText();
              addText("HP: " + playerHP, {
                x:7,
                y:1,
                color: color`0`
              });
              addText("Enemy HP: " + enemyHP, {
                x:5,
                y:14,
                color: color`0`
              })
              clearTile(attackX, attackY);
              fireballExists = false;
            }
            else if(sprite.type == "c")
              clearTile(attackX, attackY);
              fireballExists = false;
          })
        }
      }
    }
    else
    {
      fireballRecentlySpawned = false;
    }
  }
  const hatSprite = getFirst(hat);
  const playerSprite = getCurrentPlayer();

  if (hatSprite && getCurrentPlayer())
  {
    if(getCurrentPlayer().x == hatSprite.x && getCurrentPlayer().y == hatSprite.y)
    {
      const playerX = playerSprite.x;
      const playerY = playerSprite.y;
      clearTile(playerX, playerY);
      addSprite(playerX, playerY, wizard);
      currentPlayer = wizard;

      addSprite(playerX-2,playerY, rock);
      addSprite(playerX-2,playerY+2, rock);
      addSprite(playerX-2,playerY+4, rock);
      addSprite(playerX+2,playerY+2, rock);
      addSprite(playerX+2,playerY+4, rock);
    }
  }
  
  const swordSprite = getFirst(sword);

  if (swordSprite && getCurrentPlayer())
  {
    if(getCurrentPlayer().x == swordSprite.x && getCurrentPlayer().y == swordSprite.y)
    {
      const playerX = playerSprite.x;
      const playerY = playerSprite.y;
      clearTile(playerX, playerY);
      addSprite(playerX, playerY, knight);
      currentPlayer = knight;

      addSprite(playerX-2,playerY, rock);
      addSprite(playerX-2,playerY-2, rock);
      addSprite(playerX-2,playerY-4, rock);
      addSprite(playerX+2,playerY-4, rock);
      addSprite(playerX+2,playerY-2, rock);
    }
  }

  if(getCurrentPlayer())
  {
    if(getCurrentPlayer().x == 9 && level != 3)
    {
      level++;
      setMap(levels[level]);
      addSprite(3, 4, currentPlayer);
      addSprite(9, 4, bandit);
      addText("HP: " + playerHP, {
        x:7,
        y:1,
        color: color`0`
      })
      addText("Enemy HP: " + enemyHP, {
        x:5,
        y:14,
        color: color`0`
      })
    }
  }
  

  //enemy moves/attacks
  const enemySprite = getFirst(bandit);

  if (enemySprite)
  {
    if(turnNumber == 0)
    {
      let differenceX = enemySprite.x - getCurrentPlayer().x
      let differenceY = enemySprite.y - getCurrentPlayer().y

      if(differenceX == 0 && Math.abs(differenceY) == 1)
      {
        playerHP-=1;
        clearText();
        addText("HP: " + playerHP, {
          x:7,
          y:1,
          color: color`0`
        });
        addText("Enemy HP: " + enemyHP, {
          x:5,
          y:14,
          color: color`0`
        })
        turnNumber = 1;
      }
      else if(Math.abs(differenceX) == 1 && differenceY == 0)
      {
        playerHP-=1;
        clearText();
        addText("HP: " + playerHP, {
          x:7,
          y:1,
          color: color`0`
        });
        addText("Enemy HP: " + enemyHP, {
          x:5,
          y:14,
          color: color`0`
        })
        turnNumber = 1;
      }
      else
      {
        if(differenceX >= 1)
        {
          const tileContents = getTile(enemySprite.x - 1, enemySprite.y);
          tileContents.forEach(sprite => {
            console.log(sprite.type); 
            if(sprite.type == "n" || sprite.type == "o" || sprite.type == "p" || sprite.type == "q")
            {
              clearTile(enemySprite.x - 1, enemySprite.y);
              fireballExists = false;
              enemyHP = enemyHP - 2;
              clearText();
              addText("HP: " + playerHP, {
                x:7,
                y:1,
                color: color`0`
              });
              addText("Enemy HP: " + enemyHP, {
                x:5,
                y:14,
                color: color`0`
              })
            }
          })
          enemySprite.x -= 1;
          turnNumber = 1;
        }
        else if(differenceX <= -1)
        {
          const tileContents = getTile(enemySprite.x + 1, enemySprite.y);
          tileContents.forEach(sprite => {
            console.log(sprite.type); 
            if(sprite.type == "n" || sprite.type == "o" || sprite.type == "p" || sprite.type == "q")
            {
              clearTile(enemySprite.x + 1, enemySprite.y);
              fireballExists = false;
              enemyHP = enemyHP - 2;
              clearText();
              addText("HP: " + playerHP, {
                x:7,
                y:1,
                color: color`0`
              });
              addText("Enemy HP: " + enemyHP, {
                x:5,
                y:14,
                color: color`0`
              })
            }
          })
          enemySprite.x += 1;
          turnNumber = 1;
        }
        if(differenceY > 1)
        {
          const tileContents = getTile(enemySprite.x, enemySprite.y - 1);
          tileContents.forEach(sprite => {
            console.log(sprite.type); 
            if(sprite.type == "n" || sprite.type == "o" || sprite.type == "p" || sprite.type == "q")
            {
              clearTile(enemySprite.x, enemySprite.y - 1);
              fireballExists = false;
              enemyHP = enemyHP - 2;
              clearText();
              addText("HP: " + playerHP, {
                x:7,
                y:1,
                color: color`0`
              });
              addText("Enemy HP: " + enemyHP, {
                x:5,
                y:14,
                color: color`0`
              })
            }
          })
          enemySprite.y-=1;
          turnNumber = 1;
        }
        else if(differenceY < -1)
        {
          const tileContents = getTile(enemySprite.x, enemySprite.y + 1);
          tileContents.forEach(sprite => {
            console.log(sprite.type); 
            if(sprite.type == "n" || sprite.type == "o" || sprite.type == "p" || sprite.type == "q")
            {
              clearTile(enemySprite.x, enemySprite.y + 1);
              fireballExists = false;
              enemyHP = enemyHP - 2;
              clearText();
              addText("HP: " + playerHP, {
                x:7,
                y:1,
                color: color`0`
              });
              addText("Enemy HP: " + enemyHP, {
                x:5,
                y:14,
                color: color`0`
              })
            }
          })
          enemySprite.y+=1;
          turnNumber = 1;
        }
      }
    }
    else
    {
      turnNumber = 0;
    }
  }

  if (playerHP <= 0)
  {
    level = 0;
    setMap(levels[level]);
    clearText();
    addText("YOU LOST!", {
      x:6,
      y:3,
      color: color`0`
    });
    addText("PRESS J TO PLAY", {
      x:3,
      y:7,
      color: color`0`
    });
    addText("AGAIN", {
      x:8,
      y:8,
      color: color`0`
    });
  }
  if (enemyHP <= 0)
  {
    level = 0;
    setMap(levels[level]);
    clearText();
    addText("YOU WIN!", {
      x:6,
      y:3,
      color: color`0`
    });
    addText("PRESS J TO PLAY", {
      x:3,
      y:7,
      color: color`0`
    });
    addText("AGAIN", {
      x:8,
      y:8,
      color: color`0`
    });
  }
  
  
})

