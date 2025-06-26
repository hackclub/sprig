

    const player = "p"
    const goal = "g"
    const wall = "w"
    const key = "k"
    const lockedGoal = "l"
    const downBarrier = "d"
    const upBarrier = "m"
    const rightBarrier = "r"
    const leftBarrier = "j"
    const water = "o"
    const boat = "b"
    const pPlate = "n"
    const weight = "q"
    const brokenRaft = "u"
    const raftState = ["0", "1", "2", "3", "4", "5"]

setLegend([player, bitmap`
.........44.....
........4444....
........4.4.....
.......000......
.....009990.....
...0099999900...
0.099999999990.0
0.099999999990.0
0009099999099000
..099999999990..
..009999999990..
...0999999900...
....0000000.....
......0.0.......
.....00.00......
................`], 
  [wall, bitmap`
LL11L2LLL1111L.1
00LL1L22222220LL
111111L1222221LL
111L11121111LL10
LL0111L22L1L00LL
LLLL111122LLL111
1LLLLLL11122LL01
LL1LLLL11LLL22LL
01L1L1111L1L11L1
1222LL11LL10LLLL
1L122L11122111LL
LLLL211112LLL111
1222L11112222111
122222LL1111211L
0LLLLL222LL111LL
0L01LL1122111LLL`], 
  [key, bitmap`
................
.........3......
.........3......
......3.33......
......3333......
......3333......
.....33933......
.....33993......
....3399633.....
....33996633....
....39966693....
....39666663....
....39666663....
....3996669.....
.....399993.....
......3993......`], 
  [goal, bitmap`
................
...0000000000...
...0HHHHHHHH0...
...0HH88H88H0...
...088888HH80...
...0H8HHH88H0...
...0H88HH8HH0...
...0HH88H8HH0...
...0H888HH8H0...
...0H8H8HH8H0...
...0HHHHHHH80...
...0HHH8H8HH0...
...0H8HH8H8H0...
...0H8HHHHHH0...
...0HHHHHHHH0...
...0000000000...`],
  [downBarrier, bitmap`
................
................
................
...CCCCCCCCCC...
...CCCCCCCCCC...
....CCCCCCCC....
....CCCCCCCC....
.....CCCCCC.....
.....CCCCCC.....
......CCCC......
......CCCC......
.......CC.......
.......CC.......
................
................
................`],
  [upBarrier, bitmap`
................
................
................
.......CC.......
.......CC.......
......CCCC......
......CCCC......
.....CCCCCC.....
.....CCCCCC.....
....CCCCCCCC....
....CCCCCCCC....
...CCCCCCCCCC...
...CCCCCCCCCC...
................
................
................`], 
  [rightBarrier, bitmap`
................
................
................
...CC...........
...CCCC.........
...CCCCCC.......
...CCCCCCCC.....
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCC.....
...CCCCCC.......
...CCCC.........
...CC...........
................
................
................`],
  [leftBarrier, bitmap`
................
................
................
...........CC...
.........CCCC...
.......CCCCCC...
.....CCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
.....CCCCCCCC...
.......CCCCCC...
.........CCCC...
...........CC...
................
................
................`], 
  [lockedGoal, bitmap`
................
...0000000000...
...0111111110...
...0111111110...
...0111111110...
...0111111110...
...0111111110...
...0111111110...
...0111111110...
...0111111110...
...0111111110...
...0111111110...
...0111111110...
...0111111110...
...0111111110...
...0000000000...`],
  [raftState[0], bitmap`
................
................
................
.CCC.CCC.CCC.CC.
.CCC9CCC9CCC9CC.
.CCC9CCC9CCC9CC.
.CCC9CCC9CCC9CC.
.CCC9CCC9CCC9CC.
.CCC.CCC.CCC.CC.
.CCC.CCC.CCC.CC.
.CCC9CCC9CCC9CC.
.CCC9CCC9CCC9CC.
.CCC9CCC9CCC9CC.
.CCC9CCC9CCC9CC.
.CCC.CCC.CCC.CC.
................`],
  [raftState[1],  bitmap`
................
................
................
.CCC.CCC.CCC.CC.
.CCC9CCC9CCC9CC.
.CCC9CCC9CCC9C..
.CCC9CCC9CCC9CC.
..CC9CCC9CCC9CC.
..CC.CCC.CCC.CC.
.CCC.CCC.CCC.CC.
.CCC9CCC9CCC9CC.
.CCC9CCC9CCC9CC.
.CCC9CCC9CCC9CC.
.CCC9CCC9CCC9CC.
.CCC.CCC.CCC.CC.
................`],
  [raftState[2], bitmap`
................
................
................
.CCC.CCC.CCC.CC.
.CCC9CCC9CCC9CC.
..CC9CCC9CCC9C..
...C9CCC9CCC9CC.
...C9CCC9CCC9CC.
..CC.CCC.CCC.CC.
.CCC.CCC.CC..CC.
.CCC9CCC9CCC9CC.
.CCC9CCC9CCC9CC.
.CCC9CCC9CCC9C..
.CCC9CCC9CCC9C..
.CCC.CCC.CCC.CC.
................`],
  [raftState[3],  bitmap`
................
................
................
.CCC.CCC.CCC.CC.
.CCC9CCC9CCC9CC.
..CC9CCC9CCC9C..
...C9CCC9CCC9CC.
...C9CCC9CCC9CC.
..CC.CCC.CCC.CC.
..CC.CCC.CC..CC.
..CC9CCC9CCC9CC.
.CCC9CCC9CCC9C..
.CCC9CCC9CCC9C..
.CCC9CCC9CCC9C..
.CCC.CCC.CCC.C..
................`], 
  [raftState[4], bitmap`
................
................
................
.CCC.CCC.CCC.CC.
.CCC9CCC9CCC9C..
..CC9CCC9CCC....
...C9CCC9CCC9CC.
...C9CCC9CCC9CC.
...C.CCC...C.CC.
..CC.CCC.C...CC.
..CC9CCC9CC..CC.
..CC9CCC9CCC9C..
..CC9CCC9CCC9C..
.CCC9CCC9CCC9C..
.CCC.CCC.CCC.C..
................`], 
  [raftState[5], bitmap`
................
................
................
.CCC.CCC.CCC.CC.
.CCC9CCC9CCC9C..
..CC9CCC9CCC....
...C9CCC9CCC.CC.
...C9CCC9CCC9CC.
.....CCC...C.CC.
..CC.CCC.C...CC.
..CC9CCC9CC..CC.
..CC9CCC9CCC....
..CC9CCC9CCC9...
.CCC9CCC9CCC9...
.CCC.CCC.CCC....
................`],
  [boat, bitmap`
................
................
.......C9.......
.......C999999..
.......999999...
.......999999...
.......C........
.......C........
.......C........
.......C........
.......C......CC
.CCCCC.C.....CC.
..CCCCCCCC..CC..
...CCCCCCCCCCC..
.....CCCCCCCC...
................`],
  [pPlate, bitmap`
................
......333333....
....3333333333..
...03333333333..
...333333333333.
..0333333333333.
..0333333333333.
..0333333333333.
..0333333333333.
..0333333333333.
..003333333333..
...03333333333..
...0003333330...
.....000000.....
................
................`],
  [weight, bitmap`
................
................
................
................
................
......LLLL......
.....LLLLLL.....
.....LLLLLL.....
.....LLLLLL.....
.....LLLLLL.....
......LLLL......
................
................
................
................
................`],
  [brokenRaft, bitmap`
................
................
CCC.CCC.CCC...CC
CCC9CCC9CCC..9C.
.CC9CCC9CCC.....
..C9CCC9CCC.....
..C9CCC9CCC.....
....CC....C...CC
.......C.....9CC
..CC.CCC.C....CC
..CC9CCC9CC...CC
..CC9CCC9CCC..CC
..CC9CCC9CCC9...
.CCC9CCC9CCC9...
.CCC.CCC.CCC....
................`],
  [water, bitmap`
7557777777755557
7575555555777555
7575575555777777
7777777777775777
5777777777777555
7777775577557757
7755575557777555
5555777777777777
7777757755557777
5577777777775555
7755555555775557
5557777777777775
7755555557555575
7777777777775575
5577775555777777
7777777777777777`])


setSolids([player, wall])

let level = 0
const levels = [map`
......g
...ooo.
..po.o.
.r0ooo.
...boo.
.......`,
	map`
..lwk
.www.
pw...
...w.`, map`
...wl
.wkw.
.www.
..p..`, map`
...wl
.w...
pwwww
....k`, map`
w......www.
..w.ww.w...
ww...p.w.w.
.w.w.w.....
...w.wwww..
wwww..w...w
....www.ww.
gww...w....
w.w.w.w.www
....w......`,map`
wwwwwwwwwww..w..
..........ww.w..
www.ww.wwwp...w.
....w.w....ww.w.
.w.w..ww.ww.w.w.
.w.w.ww...w.w.w.
.w.w....www.w...
.w.gw.w.....www.
..www..w.wwww...
.w...w...w....w.
.w.w.wwww..ww.ww
...w......w.....`, map`
.ww...w
....w..
.wwwww.
..pwl..
ww.wwww
w....k.`, map`
......wl.
.www.www.
.ww......
..pwww.w.
.www.wwww
.w...w..k
.w.w.w.ww
...w.....`]

setMap(levels[level])
let timesOnRaft = 0
const raftTypes = [raftState[0], raftState[1], raftState[2], raftState[3], raftState[4], raftState[5]]
setPushables({
	[ player ]: [weight]
})
let boatSprite = getFirst(boat);
let playerSprite = getFirst(player);
let previousX = playerSprite.x;
let previousY = playerSprite.y;
let previousCoordinates = getTile(playerSprite.x, playerSprite.y);
let raftSprite = getFirst(raftState[timesOnRaft]);
setSolids([raftState[0], raftState[1], raftState[2], raftState[3], raftState[4], raftState[5], boat, wall])
const raft = getAll(raftState[0], raftState[1], raftState[2], raftState[3], raftState[4], raftState[5])
function isCapsLockOn(event) {
  return event.getModifierState('CapsLock');
} 

onInput("s", () => {
  previousX = playerSprite.x;
  previousY = playerSprite.y;
  previousCoordinates = getTile(playerSprite.x, playerSprite.y);
  if (getTile(playerSprite.x, playerSprite.y).some(sprite => raftTypes.includes(sprite.type))) {
    playerOnRaft = true;
  } else {
    playerOnRaft = false;
  }

  const tileAbove = getTile(playerSprite.x, playerSprite.y - 1)
  const tileBelow = getTile(playerSprite.x, playerSprite.y + 1)
  
  if(!tileBelow.some(sprite => sprite.type === upBarrier)  && !tileAbove.some(sprite => sprite.type === upBarrier)) {
    if(tileBelow.some(sprite => sprite.type === water)) {
      if(getTile(playerSprite.x, playerSprite.y).some(sprite => sprite.type === boat)) {
        playerSprite.y +=1;
        boatSprite.y += 1;
      } else {
        if(getTile(playerSprite.x, playerSprite.y).some(sprite => raftTypes.includes(sprite.type))) {
          playerSprite.y += 1;
          raftSprite.y += 1;
        } else {
          if(tileBelow.some(sprite => raftTypes.includes(sprite.type))) {
            playerSprite.y +=1;
          } else {
             if(tileBelow.some(sprite => sprite.type === boat)) {
              playerSprite.y +=1;
             }
          }
        }
      }
    } else {
      if(isCapsLockOn(event)) {
        if(tileBelow.some(sprite => raftTypes.includes(sprite.type))) {
          raftSprite.y += 1;
          playerSprite.y +=1;
        } else { 
          if(tileBelow.some(sprite => sprite.type === boat)) {
            boatSprite.y +=1;
            playerSprite.y +=1;
          } else {
            playerSprite.y +=1;
          }
        }
      } else {
        playerSprite.y +=1;
      }
    }
  }
  if(!playerOnRaft) {
    if(getTile(playerSprite.x, playerSprite.y).some(sprite => raftTypes.includes(sprite.type))) {
        timesOnRaft += 1
      }
  }
})

onInput("w", () => {
  previousX = playerSprite.x;
  previousY = playerSprite.y;
  previousCoordinates = getTile(playerSprite.x, playerSprite.y);
  if (getTile(playerSprite.x, playerSprite.y).some(sprite => raftTypes.includes(sprite.type))) {
    playerOnRaft = true;
  } else {
    playerOnRaft = false;
  }

  const tileAbove = getTile(playerSprite.x, playerSprite.y - 1)
  const tileBelow = getTile(playerSprite.x, playerSprite.y + 1)
  
  if(!tileBelow.some(sprite => sprite.type === downBarrier)  && !tileAbove.some(sprite => sprite.type === downBarrier)) {
    if(tileAbove.some(sprite => sprite.type === water)) {
      if(getTile(playerSprite.x, playerSprite.y).some(sprite => sprite.type === boat)) {
        playerSprite.y -=1;
        boatSprite.y -=1;
      } else {
        if(getTile(playerSprite.x, playerSprite.y).some(sprite => raftTypes.includes(sprite.type))) {
          playerSprite.y -= 1;
          raftSprite.y -= 1;
        } else {
          if(tileAbove.some(sprite => sprite.type === boat)) {
            playerSprite.y -=1;
          } else {
            if(tileAbove.some(sprite => raftTypes.includes(sprite.type))) {
              playerSprite.y -=1;
            }
          }
        }
      }
    } else {
      if(isCapsLockOn(event)) {
        if(tileAbove.some(sprite => raftTypes.includes(sprite.type))) {
          raftSprite.y -= 1;
          playerSprite.y -=1;
        } else { 
          if(tileAbove.some(sprite => sprite.type === boat)) {
            boatSprite.y -=1;
            playerSprite.y -=1;
          } else {
            playerSprite.y -=1;
          }
        }
      } else {
        playerSprite.y -=1;
      }
    }
  }
  if(!playerOnRaft) {
    if(getTile(playerSprite.x, playerSprite.y).some(sprite => raftTypes.includes(sprite.type))) {
        timesOnRaft += 1
      }
  }
})


onInput("d", () => {
  previousX = playerSprite.x;
  previousY = playerSprite.y;
  previousCoordinates = getTile(playerSprite.x, playerSprite.y);
  if (getTile(playerSprite.x, playerSprite.y).some(sprite => raftTypes.includes(sprite.type))) {
    playerOnRaft = true;
  } else {
    playerOnRaft = false;
  }


  const tileRight = getTile(playerSprite.x +1, playerSprite.y)
  const tileLeft = getTile(playerSprite.x - 1, playerSprite.y)
  
  if(!tileLeft.some(sprite => sprite.type === leftBarrier)  && !tileRight.some(sprite => sprite.type === leftBarrier)) {
    if(tileRight.some(sprite => sprite.type === water)) {
      if(getTile(playerSprite.x, playerSprite.y).some(sprite => sprite.type === boat)) {
        playerSprite.x +=1;
        boatSprite.x += 1;
      } else {
        if(getTile(playerSprite.x, playerSprite.y).some(sprite => raftTypes.includes(sprite.type))) {
          playerSprite.x += 1;
          raftSprite.x += 1;
        } else {
          if(tileRight.some(sprite => sprite.type === boat)) {
            playerSprite.x +=1;
          } else {
            if(tileRight.some(sprite => raftTypes.includes(sprite.type))) {
              playerSprite.x +=1;
            }
          }
        }
      }
    } else {
      if(isCapsLockOn(event)) {
        if(tileRight.some(sprite => raftTypes.includes(sprite.type))) {
          raftSprite.x += 1;
          playerSprite.x +=1;
        } else { 
          if(tileRight.some(sprite => sprite.type === boat)) {
            boatSprite.x +=1;
            playerSprite.x +=1;
          } else {
            playerSprite.x +=1;
          }
        }
      } else {
        playerSprite.x +=1;
      }
    }
  }
  if(!playerOnRaft) {
    if(getTile(playerSprite.x, playerSprite.y).some(sprite => raftTypes.includes(sprite.type))) {
        timesOnRaft += 1
      }
  }
})


onInput("a", () => {
  previousX = playerSprite.x;
  previousY = playerSprite.y;
  previousCoordinates = getTile(playerSprite.x, playerSprite.y);
  if (getTile(playerSprite.x, playerSprite.y).some(sprite => raftTypes.includes(sprite.type))) {
    playerOnRaft = true;
  } else {
    playerOnRaft = false;
  }


  const tileRight = getTile(playerSprite.x +1, playerSprite.y)
  const tileLeft = getTile(playerSprite.x - 1, playerSprite.y)
  
  if(!tileLeft.some(sprite => sprite.type === rightBarrier)  && !tileRight.some(sprite => sprite.type === rightBarrier)) {
    if(tileLeft.some(sprite => sprite.type === water)) {
      if(getTile(playerSprite.x, playerSprite.y).some(sprite => sprite.type === boat)) {
        playerSprite.x -=1;
        boatSprite.x -= 1;
      } else {
        if(getTile(playerSprite.x, playerSprite.y).some(sprite => raftTypes.includes(sprite.type))) {
          playerSprite.x -= 1;
          raftSprite.x -= 1;
        } else {
          if(tileLeft.some(sprite => sprite.type === boat)) {
            playerSprite.x -=1;
          } else {
            if(tileLeft.some(sprite => raftTypes.includes(sprite.type))) {
              playerSprite.x -=1;
            }
          }
        }
      }
    } else {
      if(isCapsLockOn(event)) {
        if(tileLeft.some(sprite => raftTypes.includes(sprite.type))) {
          raftSprite.x -= 1;
          playerSprite.x -=1;
        } else { 
          if(tileLeft.some(sprite => sprite.type === boat)) {
            boatSprite.x -=1;
            playerSprite.x -=1;
          } else {
            playerSprite.x -=1;
          }
        }
      } else {
        playerSprite.x -=1;
      }
    }
  }
  if(!playerOnRaft) {
    if(getTile(playerSprite.x, playerSprite.y).some(sprite => raftTypes.includes(sprite.type))) {
        timesOnRaft += 1
      }
  }
})


afterInput(() => {
  const numberOfGoalsCovered = tilesWith(player, goal);
  const numberOfPPlatesActive = tilesWith(pPlate).filter(tile => getTile(tile.x, tile.y).length > 1).length;
  if(numberOfGoalsCovered.length >= 1 && numberOfPPlatesActive.length >= tilesWith(pPlate).length) {
    level += 1;
    if(level < levels.length) {
      setMap(levels[level])
      playerSprite = getFirst(player)
    } else {
      addText("you win!", {x: 2, y: 4, color: color`7`
      });
    }
  }
  const numberOfPlayersOnKeys = tilesWith(player, key)
  if(numberOfPlayersOnKeys.length >= 1) {
    const keyWithPlayer = getTile(playerSprite.x, playerSprite.y).filter(sprite => sprite.type === key);
    keyWithPlayer.forEach(keySprite => {
      keySprite.remove();
    });
  }
  const allKeySprites = getAll(key)
  if(allKeySprites.length == 0) { 
    const goalSprites = getAll(lockedGoal); 
    if(goalSprites.length > 0 ) {
      goalSprites.forEach(goalSprite => {
        goalSprite.type = goal;
      });
    }
  }
  spritesnotupdated = 0
  function updateRaftState(raftSprite) {
    if(timesOnRaft < 1) {
      addSprite(raftSprite.x, raftSprite.y, raftState[0])
      raft.forEach(sprite => {
        let spriteTile = getTile(sprite)
        sprite.remove();
      });
      raft.type = raftState[0]
    } else if (timesOnRaft === 1) {
      addSprite(raftSprite.x, raftSprite.y, raftState[1])
      raft.forEach(sprite => {
        let spriteTile = getTile(sprite)
        sprite.remove();
      });
      raft.type = raftState[1]
    } else if (timesOnRaft === 2) {
      raft.forEach(sprite => {
      let spriteTile = getTile(sprite)
        sprite.remove();
      });
      addSprite(spriteTile.x, spriteTile.y, raftState[2])
      raft.type = raftState[2]
    } else if (timesOnRaft === 3) {
      raft.forEach(sprite => {
        let spriteTile = getTile(sprite)
        sprite.remove();
      });
      addSprite(spriteTile.x, spriteTile.y, raftState[3])
      raft.type = raftState[3]
    } else if (timesOnRaft === 4) {
      raft.forEach(sprite => {
        let spriteTile = getTile(sprite)
        sprite.remove();
      });
      addSprite(spriteTile.x, spriteTile.y, raftState[4])
      raft.type = raftState[4]
    } else if (timesOnRaft === 5) {
      raft.forEach(sprite => {
        sprite.remove();
        addSprite(spriteTile.x, spriteTile.y, raftState[5])
        raft.type = raftState[5]
      });
    } else if (timesOnRaft > 5) {
      raft.forEach(sprite => {
        sprite.remove();
        addSprite(spriteTile.x, spriteTile.y, brokenRaft);
      });
    }
  }
  updateRaftState(raft);
  console.log(timesOnRaft);
  console.log(playerOnRaft);
  console.log(getTile(playerSprite.x, playerSprite.y).length);
  console.log(raft.type);
  console.log(spritesnotupdated);
  console.log(getAll(raftState[0], raftState[1], raftState[2], raftState[3], raftState[4], raftState[5]).length)
})