/*
@title: Hole in Wall
@author: udu3324
@tags: []
@addedOn: 2024-00-00
*/

let timeoutIDs = []

const player = "p"
const floor = "f"
const sky = "s"

const wallT = "t"
const wallB = "b"
const wallL = "l"
const wallR = "r"

setLegend(
  [player, bitmap`
    ......000.......
    .....00200......
    ...000222000....
    .000222222200...
    0022222222222000
    000000000000000.
    ..00222222222200
    ..02222222222220
    .002000020000020
    .022222222222220
    .022220222202220
    .002220022202220
    ..02222000022220
    ..00222222222200
    ...000222222000.
    .....00000000...`],
  [wallT, bitmap`
    3333333333333333
    3......3...33..3
    33.....33...3..3
    333.....33.....3
    3.33.....33....3
    3..33.....33...3
    3...33.....33..3
    3.....33.....333
    3.33...333..3.33
    3..3........33.3
    3..333.3.....333
    33.....333.....3
    333......33....3
    3.33.......33..3
    3..333..3...33.3
    3333333333333333`],
  [wallB, bitmap`
    9999999999999999
    9......9...99..9
    99.....99...9..9
    999.....99.....9
    9.99.....99....9
    9..99.....99...9
    9...99.....99..9
    9.....99.....999
    99.99...99..9.99
    9..9........99.9
    9..999.9.....999
    99.....999.....9
    999......99....9
    9.99.......99..9
    9..999..9...99.9
    9999999999999999`],
  [wallL, bitmap`
    HHHHHHHHHHHHHHHH
    H......H...HH..H
    HH.....HH...H..H
    HHH.....HH.....H
    H.HH.....HH....H
    H..HH.....HH...H
    H...HH.....HH..H
    H.....HH.....HHH
    HH.HH...HH..H.HH
    H..H........HH.H
    H..HHH.H.....HHH
    HH.....HHH.....H
    HHH......HH....H
    H.HH.......HH..H
    H..HHH..H...HH.H
    HHHHHHHHHHHHHHHH`],
  [wallR, bitmap`
    CCCCCCCCCCCCCCCC
    C......C...CC..C
    CC.....CC...C..C
    CCC.....CC.....C
    C.CC.....CC....C
    C..CC.....CC...C
    C...CC.....CC..C
    C.....CC.....CCC
    C.CC...CCC..C.CC
    C..C........CC.C
    C..CCC.C.....CCC
    CC.....CCC.....C
    CCC......CC....C
    C.CC.......CC..C
    C..CCC..C...CC.C
    CCCCCCCCCCCCCCCC`],
  [floor, bitmap`
    4DDDDDDDDDD4DDDD
    DDD4DDDDDDDDDDD4
    DDDDDDDDDDD4DDDD
    DDDDDD4DDDDDDD4D
    DDDD4DDDDDDDDDDD
    4DDDDDDDDDDD4DDD
    DD4DDDDDDDDDDDDD
    DDDD4DDDDD4DDDDD
    DDD4DDDDDDDDDD4D
    DDDDDDDDDDDDDDDD
    DDD4DDDDD4DDDDDD
    DDDD4DDDDDDDDDDD
    DDDDDDDDDDDDDD4D
    4DDDDDDD4DDDDDDD
    DDDDD4DDDDDDDDDD
    DDDDDDDD4DDDD4DD`],
  [sky, bitmap`
    7777777777777777
    7777777777777777
    7777777777777777
    7777777777777777
    7777777777777777
    7777777777777777
    7777777777777777
    7777777777777777
    7777777777777777
    7777777777777777
    7777777777777777
    7777777777777777
    7777777777777777
    7777777777777777
    7777777777777777
    7777777777777777`],
)

setSolids([ player, wallT, wallB, wallL, wallR ])

let level = 0
const levels = [
  map`
sssssssssssssss
sssssssssssssss
sssssssssssssss
sss.........sss
sss.........sss
sss.........sss
sss.........sss
sss.........sss
sss.........sss
sssssssssssssss
sssssssssssssss
sssssssssssssss`
]

setMap(levels[level])

setPushables({
  [ player ]: [],
  [ wallT ]: [ player ],
  [ wallB ]: [ player ],
  [ wallL ]: [ player ],
  [ wallR ]: [ player ],
})

//when the game first starts
function splash() {
  addText("Hole in Wall", {x: 4, y: 2, color: color`f`})
  addText("Press any button", {x: 2, y: 13, color: color`2`})
  addText("to start!", {x: 2, y: 14, color: color`2`})
}

splash()
addSprite(7, 7, player)

setBackground(floor)

runStartAnimation()

let ended = false
let started = false

let startAnimation = true

let finishedLevelOne = false
let finishedLevelTwo = false
let finishedLevelThree = false

function start() {
  if (started) {
    return
  }

  started = true

  if (startAnimation) {
    startAnimation = false

    restart()
    return
  }

  if (!finishedLevelOne) {
    levelOne()
  }
}

function levelOne() {
  clearText()
  addText("Level 1: The Basics", {x: 1, y: 1, color: color`2`})
  wallText(1, 10)

  // ms * 12 = total time
  addWall("top", 2, 350)
  
  let tick = 0
  for (let i = 1; i < 11; i++) {
    const timeout = setTimeout(() => {
      if (i === 10) {
        clearText()
        addText("Level 1: The Basics", {x: 1, y: 1, color: color`2`})
        addText("Completed!", {x: 5, y: 2, color: color`4`})

        addText("Press (right) down", {x: 2, y: 13, color: color`2`})
        addText("to move on!", {x: 2, y: 14, color: color`2`})

        finishedLevelOne = true
        ended = true
      } else {
        addWall("top", 2, 350)
        wallText(i + 1, 10)
      }
      
    }, (4200) * (tick + 1))

    timeoutIDs.push(timeout)
    tick++
  }
}

function levelTwo() {
  clearText()
  addText("Level 2: Bit Harder", {x: 1, y: 1, color: color`2`})
  wallText(1, 25)

  // ms * 12 = total time
  addWall("top", 2, 200)

  let tick = 0
  for (let i = 1; i < 26; i++) {
    const timeout = setTimeout(() => {
      if (i === 25) {
        clearText()
        addText("Level 2: Bit Harder", {x: 1, y: 1, color: color`2`})
        addText("Completed!", {x: 5, y: 2, color: color`4`})

        addText("Press (right) down", {x: 2, y: 13, color: color`2`})
        addText("to move on!", {x: 2, y: 14, color: color`2`})

        finishedLevelTwo = true
        ended = true
      } else {
        addWall("top", 2, 200)
        wallText(i + 1, 25)
      }
      
    }, (1200) * (tick + 1))

    timeoutIDs.push(timeout)
    tick++
  }
}

//i swear the chain of timeouts was the best way to do it
function levelThree() {
  clearText()
  addText("Level 3: Good Luck", {x: 1, y: 1, color: color`2`})
  wallText(1, 30)

  // ms * 12 = total time
  addWall("bottom", 2, 200)

  timeoutIDs.push(setTimeout(() => {
    // ms * 15 = total time
    addWall("right", 1, 150)
    wallText(2, 30)
    timeoutIDs.push(setTimeout(() => {
      addWall("right", 1, 150)
      wallText(3, 30)
      timeoutIDs.push(setTimeout(() => {
        addWall("left", 1, 150)
        wallText(4, 30)
        timeoutIDs.push(setTimeout(() => {
          addWall("left", 1, 150)
          wallText(5, 30)
          timeoutIDs.push(setTimeout(() => {
            addWall("right", 1, 150)
            wallText(6, 30)
            timeoutIDs.push(setTimeout(() => {
              addWall("right", 1, 150)
              wallText(7, 30)
              timeoutIDs.push(setTimeout(() => {
                addWall("top", 1, 150)
                wallText(8, 30)
                timeoutIDs.push(setTimeout(() => {
                  addWall("bottom", 1, 150)
                  wallText(9, 30)
                  timeoutIDs.push(setTimeout(() => {
                    addWall("bottom", 1, 150)
                    wallText(10, 30)
                    timeoutIDs.push(setTimeout(() => {
                      addWall("bottom", 1, 150)
                      wallText(11, 30)
                      timeoutIDs.push(setTimeout(() => {
                        addWall("bottom", 1, 150)
                        wallText(12, 30)
                        timeoutIDs.push(setTimeout(() => {
                          addWall("bottom", 1, 150)
                          wallText(13, 30)
                          timeoutIDs.push(setTimeout(() => {
                            addWall("top", 1, 150)
                            wallText(14, 30)
                            timeoutIDs.push(setTimeout(() => {
                              addWall("top", 1, 150)
                              wallText(15, 30)
                              timeoutIDs.push(setTimeout(() => {
                                addWall("right", 1, 150)
                                wallText(16, 30)
                                timeoutIDs.push(setTimeout(() => {
                                  addWall("right", 1, 150)
                                  wallText(17, 30)
                                  timeoutIDs.push(setTimeout(() => {
                                    addWall("right", 1, 150)
                                    wallText(18, 30)
                                    timeoutIDs.push(setTimeout(() => {
                                      addWall("right", 1, 150)
                                      wallText(19, 30)
                                      timeoutIDs.push(setTimeout(() => {
                                        addWall("right", 1, 150)
                                        wallText(20, 30)
                                        timeoutIDs.push(setTimeout(() => {
                                          addWall("right", 1, 150)
                                          wallText(21, 30)
                                          timeoutIDs.push(setTimeout(() => {
                                            addWall("left", 1, 150)
                                            wallText(22, 30)
                                            timeoutIDs.push(setTimeout(() => {
                                              addWall("left", 1, 150)
                                              wallText(23, 30)
                                              timeoutIDs.push(setTimeout(() => {
                                                addWall("left", 1, 150)
                                                wallText(24, 30)
                                                timeoutIDs.push(setTimeout(() => {
                                                  addWall("left", 1, 150)
                                                  wallText(25, 30)
                                                  timeoutIDs.push(setTimeout(() => {
                                                    addWall("left", 1, 150)
                                                    wallText(26, 30)
                                                    timeoutIDs.push(setTimeout(() => {
                                                      addWall("left", 1, 150)
                                                      wallText(27, 30)
                                                      timeoutIDs.push(setTimeout(() => {
                                                        addWall("left", 1, 150)
                                                        wallText(28, 30)
                                                        timeoutIDs.push(setTimeout(() => {
                                                          addWall("left", 1, 150)
                                                          wallText(29, 30)
                                                          timeoutIDs.push(setTimeout(() => {
                                                            addWall("left", 1, 150)
                                                            wallText(30, 30)
                                                            timeoutIDs.push(setTimeout(() => {
                                                              clearText()
                                                              addText("Level 3: Good Luck", {x: 1, y: 1, color: color`2`})
                                                              addText("You did it.", {x: 5, y: 2, color: color`4`})

                                                              addText("You beat the game!", {x: 2, y: 13, color: color`2`})
                                                              addText("Challenge others!", {x: 2, y: 14, color: color`2`})

                                                              finishedLevelThree = true
                                                              ended = true
                                                            }, 2250))
                                                          }, 550))
                                                        }, 550))
                                                      }, 550))
                                                    }, 550))
                                                  }, 550))
                                                }, 550))
                                              }, 550))
                                            }, 550))
                                          }, 2250))
                                        }, 750))
                                      }, 750))
                                    }, 750))
                                  }, 750))
                                }, 750))
                              }, 2400))
                            }, 2400))
                          }, 2400))
                        }, 2400))
                      }, 1200))
                    }, 1200))
                  }, 1200))
                }, 2400))
              }, 2250))
            }, 2250))
          }, 2250))
        }, 2250))
      }, 2250))
    }, 2250))
  }, 2400))
}

//im too lazy
//function freePlay() {
//  clearText()
//  addText("Freeplay", {x: 7, y: 1, color: color`2`})
//
//  let time = []
//  let tick = 0
//  for (let i = 1; i < 200; i++) {
//    
//
//    tick++
//  }
//}

function wallText(current, total) {
  addText(`Wall (${current}/${total})`, {x: 4, y: 2, color: color`0`})
}

function runStartAnimation() {
  addWall("top", 4, 150) // ms * 12 = total time

  let tick = 0
  for (let i = 0; i < 25; i++) {
    const timeout = setTimeout(() => {
      if (!startAnimation) {
        return
      }
      getFirst(player).x = 7
      getFirst(player).y = 7

      removeAllWalls()

      addWall("right", 2, 150) // ms * 15 = total time

      const timeoutNested = setTimeout(() => {
        if (!startAnimation) {
          return
        }
        removeAllWalls()
        addWall("top", 2, 150) // ms * 12 = total time
      }, 2250)
      timeoutIDs.push(timeoutNested)
    }, (1800 + 2250) * (tick + 1))

    timeoutIDs.push(timeout)
    tick++
  }
}

//checks if the player is out of bounds and stops the game there
function checkOutOfBounds() {
  //dont get triggered by start animation
  if (!started) {
    return
  }

  if (getFirst(player).y > 8 || getFirst(player).y < 3) {
    ended = true
    clearText()
    
    addText("You lost.", {x: 5, y: 1, color: color`2`})
    addText("Don't fall off!", {x: 3, y: 2, color: color`f`})

    addText("Press (right) down", {x: 2, y: 13, color: color`2`})
    addText("to restart!", {x: 2, y: 14, color: color`2`})
  }

  if (getFirst(player).x < 3 || getFirst(player).x > 11) {
    ended = true
    clearText()
    
    addText("You lost.", {x: 5, y: 1, color: color`2`})
    addText("Don't fall off!", {x: 3, y: 2, color: color`f`})

    addText("Press (right) down", {x: 2, y: 13, color: color`2`})
    addText("to restart!", {x: 2, y: 14, color: color`2`})
  }
}

function removeAllWalls() {
  for (const id of timeoutIDs) {
    clearTimeout(id)
    timeoutIDs = []
  }

  for (const wallType of [wallT, wallB, wallL, wallR]) {
    for (const wall of getAll(wallType)) {
      wall.remove()
    }
  }
}

function restart() {
  //remove all walls left over
  removeAllWalls()

  //add player back, but they might be gone
  if (getFirst(player) === undefined) {
    addSprite(7, 7, player)
  } else {
    getFirst(player).x = 7
    getFirst(player).y = 7
  }

  //done
  clearText()
  ended = false
  started = false

  splash()
}

//1-9 holes top/bottom (3, 11)
//1-6 holes left/right (3, 8)

//side - choose what side the wall is spawned in at
//holes - how many holes there are in the wall
//ms - how fast the wall moves per tile
function addWall(side, holes, ms) {
  let wallCluster = []
  let coordinates = []
  
  switch (side) {
    case "top": {
      wallCluster = ["t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t"]
      coordinates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
      
      //randomly remove holes
      for (let i = 0; i < holes; i++) {
        wallCluster[randomRangeInt(3, 11)] = ""
      }

      //add it to the map
      for (let i = 0; i < wallCluster.length; i++) {
        //ignore holes in array
        if (wallCluster[i] !== "") {
          addSprite(coordinates[i], 0, wallT)
          //addText(`add: ${coordinates[i]}, ${wallCluster[i]}`, {x: 2, y: 14, color: color`2`})
        }
      }
      
      //animate going down
      let tick = 0
      for (let y = 0; y < 12; y++) {
        //for every ms, move the cluster one tile
        const timeout = setTimeout(() => {
          //the cluster moved fully to the end. delete it
          if (y === 11) {
            for (let i = 0; i < wallCluster.length; i++) {
              //only remove specific type of tile
              const tileList = getTile(coordinates[i], 11)
              for (const tile of tileList) {
                if (tile.type === wallT) {
                  tile.remove()
                }
              }
            }
          } else {
            //for each tile in cluster
            for (let i = 0; i < wallCluster.length; i++) {
              if (wallCluster[i] !== "") {
                //only move specific type of tile
                const tileList = getTile(coordinates[i], y)
                for (const tile of tileList) {
                  if (tile.type === wallT) {
                    tileList[0].y += 1
                  }
                }
              }
            }
            checkOutOfBounds()
          }
        }, ms * (tick + 1))

        timeoutIDs.push(timeout)
        tick++
      }

      break
    }
    case "bottom": {
      wallCluster = ["t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t"]
      coordinates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]

      //randomly remove holes
      for (let i = 0; i < holes; i++) {
        wallCluster[randomRangeInt(3, 11)] = ""
      }

      //add it to the map
      for (let i = 0; i < wallCluster.length; i++) {
        //ignore holes in array
        if (wallCluster[i] !== "") {
          addSprite(coordinates[i], 11, wallB)
        }
      }

      //animate going up
      let tick = 0
      for (let y = 12; y > 0; y--) {
        //for every ms, move the cluster one tile
        const timeout = setTimeout(() => {
          //the cluster moved fully to the end. delete it
          if (y === 1) {
            for (let i = 0; i < wallCluster.length; i++) {
              //only remove specific type of tile
              const tileList = getTile(coordinates[i], 0)
              for (const tile of tileList) {
                if (tile.type === wallB) {
                  tile.remove()
                }
              }
            }
          } else {
            //for each tile in cluster
            for (let i = 0; i < wallCluster.length; i++) {
              if (wallCluster[i] !== "") {
                //only move specific type of tile
                const tileList = getTile(coordinates[i], (y - 1))
                for (const tile of tileList) {
                  if (tile.type === wallB) {
                    tileList[0].y -= 1
                  }
                }
              }
            }
            checkOutOfBounds()
          }
        }, ms * (tick + 1))

        timeoutIDs.push(timeout)
        tick++
      }

      break
    }
    case "left": {
      wallCluster = ["t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t"]
      coordinates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

      //random remove holes
      for (let i = 0; i < holes; i++) {
        wallCluster[randomRangeInt(3, 8)] = ""
      }

      //add it to map
      for (let i = 0; i < wallCluster.length; i++) {
        //ignore holes in array
        if (wallCluster[i] !== "") {
          addSprite(0, coordinates[i], wallL)
        }
      }

      //animate it going right
      let tick = 0
      for (let x = 0; x < 15; x++) {
        const timeout = setTimeout(() => {
          //the cluster moved fully to the end
          if (x === 14) {
            for (let i = 0; i < wallCluster.length; i++) {
              //only remove specific type of tile
              const tileList = getTile(14, coordinates[i])
              for (const tile of tileList) {
                if (tile.type === wallL) {
                  tile.remove()
                }
              }
            }
          } else {
            for (let i = 0; i < wallCluster.length; i++) {
              if (wallCluster[i] !== "") {
                //only move specific type of tile
                const tileList = getTile(x, coordinates[i])
                for (const tile of tileList) {
                  if (tile.type === wallL) {
                    tileList[0].x += 1
                  }
                }
              }
            }
            checkOutOfBounds()
          }

        }, ms * (tick + 1))

        timeoutIDs.push(timeout)
        tick++
      }

      break
    }
    case "right": {
      wallCluster = ["t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t", "t"]
      coordinates = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]

      //random remove holes
      for (let i = 0; i < holes; i++) {
        wallCluster[randomRangeInt(3, 8)] = ""
      }

      //add it to map
      for (let i = 0; i < wallCluster.length; i++) {
        //ignore holes in array
        if (wallCluster[i] !== "") {
          addSprite(14, coordinates[i], wallR)
        }
      }

      let tick = 0
      for (let x = 15; x > 0; x--) {
        const timeout = setTimeout(() => {
          //the cluster moved fully to the end
          if (x === 1) {
            for (let i = 0; i < wallCluster.length; i++) {
              //only remove specific type of tile
              const tileList = getTile(0, coordinates[i])
              for (const tile of tileList) {
                if (tile.type === wallR) {
                  tile.remove()
                }
              }
            }
          } else {
            for (let i = 0; i < wallCluster.length; i++) {
              if (wallCluster[i] !== "") {
                //only move specific type of tile
                const tileList = getTile((x - 1), coordinates[i])
                for (const tile of tileList) {
                  if (tile.type === wallR) {
                    tileList[0].x -= 1
                  }
                }
              }
            }
            checkOutOfBounds()
          }

        }, ms * (tick + 1))

        timeoutIDs.push(timeout)
        tick++
      }

      break
    }
  }
}

//generates a whole number between min-max
function randomRangeInt(min, max) {
  return Math.round(Math.random() * (max - min) + min)
}

//display coordinates to zone things
function debug() {
  addText(`(${getFirst(player).x}, ${getFirst(player).y})`, {x: 0, y: 0, color: color`0`})
}

//left side buttons for movement
onInput("w", () => {
  start()
  if (ended) {
    return
  }
  getFirst(player).y -= 1
})

onInput("a", () => {
  start()
  if (ended) {
    return
  }
  getFirst(player).x -= 1
})

onInput("s", () => {
  start()
  if (ended) {
    return
  }
  getFirst(player).y += 1
})

onInput("d", () => {
  start()
  if (ended) {
    return
  }
  getFirst(player).x += 1
})

//right side buttons for game functions
onInput("i", () => {
  //addWall("right", 5, 250)
})

onInput("j", () => {

})

onInput("k", () => {
  if (finishedLevelOne && ended && !finishedLevelTwo && !finishedLevelThree) {
    restart()
    levelTwo()
  } else if (finishedLevelTwo && ended && !finishedLevelThree) {
    restart()
    levelThree()
  } else if (finishedLevelThree && ended) {
    restart()
    //freePlay()
  }
})

onInput("l", () => {
})

afterInput(() => {
  //debug()
  if (ended) {
    return
  }
  checkOutOfBounds()
})
