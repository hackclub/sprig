
/* 
@title: Civilization_Builder
@author: Ivan S
@tags: []
@addedOn: 2023-06-08
*/

    //FUNCTIONS

//get attack value
function getAttackVal(atck_val) {if (atck_val[2] == null) {return false} else {return atck_val[2]}}

//if coord is in array, also extra capability for getting an attack value
function coordIn(coord, ar, getAttack = false) {
  for (var i__ = 0; i__ < ar.length; i__++) {
    var c = ar[i__]
    if (c[0] == coord[0] && c[1] == coord[1]) {
      if (getAttack) {
        return [true, getAttackVal(c)]
      }
      return true
    }
  }
  if (getAttack) {
    return [false, false]
  }
  return false
}

//remove coord from an array
function removeCoord(coord, ar) {
  var nar = []
  for (var i__ = 0; i__ < ar.length; i__++) {
    if (ar[i__][0] != coord[0] && ar[i__][1] != coord[1]) {
      nar.push(ar[i__])
    }
  }
  return nar
}

//get the sprite of a type from a tile
function getSpriteOn(tx, ty, stype) {
  var spriteson = getTile(tx, ty)
  if (spriteson.length < 1) {return null}
  for (var i__ = 0; i__ < spriteson.length; i__++) {
    if (spriteson[i__].type == stype) {
      return spriteson[i__]
    }
  }
  return null
}

//check if sprite is in array
function spriteInArray(ar, sprit) {
  for (var i__ = 0; i__ < ar.length; i__++) {
    if (ar[i__] == sprit) {
      return true
    }
  }
  return false
}

//update the moving values
function checkCanMove() {
  if (buildingHuman != null || !playersTurn) {canMove = false}

  else {if (!gameEnded) {canMove = true}}
  
}

//rewrite all text
function reWriteText() {
  clearText()

  if (endGameTextDict != null) {
    addText(endGameTextDict[0], {
      x: endGameTextDict[1],
      y: endGameTextDict[2],
      color: endGameTextDict[3]
    })

    if (endGameTextDict[4]) {
      addText(endGameTextDict[5], {
        x: endGameTextDict[6],
        y: endGameTextDict[7],
        color: endGameTextDict[8]
      })
    }
	return
  }
  
  canNextTurn = false
  addText("Food: " + food.toString(), {
    x: 0,
    y: 15,
    color: color `4`
  })
  addText("Gold: " + gold.toString(), {
    x: 10,
    y: 15,
    color: color `6`
  })

  if (resourceTextDict != null) {
    if (resourceTextDict[2] == null) {
      resourceTextDict[2] = 3 //time before message times out
    }
    if (resourceTextDict[2] == 0) {
      resourceTextDict = null
    } else {
      if (resourceTextDict[0] > 0 && resourceTextDict[1] > 0) {
        addText("Need " + resourceTextDict[0].toString() + " food & " + resourceTextDict[1].toString() + " gold", {
          x: 0,
          y: 0,
          color: color `9`
        })
      } else if (resourceTextDict[0] > 0) {
        addText("Need " + resourceTextDict[0].toString() + " food", {
          x: 0,
          y: 0,
          color: color `9`
        })
      } else if (resourceTextDict[1] > 0) {
        addText("Need " + resourceTextDict[1].toString() + " gold", {
          x: 0,
          y: 0,
          color: color `9`
        })
      } else if (resourceTextDict[0] == 0 && resourceTextDict[1] == 0) {
        addText("Not in city bounds", {
          x: 0,
          y: 0,
          color: color `9`
        })
      }
    }
  }
  
  /*addText(DEBUG, {
    x: 5,
    y: 5,
    color: color `L`
  })

  addText("EFood: " + Efood.toString(), {
    x: 0,
    y: 0,
    color: color `4`
  })
  addText("EGold: " + Egold.toString(), {
    x: 10,
    y: 0,
    color: color `6`
  })*/

  if (!playersTurn) {
    addText("Loading...", {
      x: 4,
      y: 13,
      color: color `1`
    })
    return
  }
  
  var sel = getFirst(select)
  
  if (movingHuman != null && coordIn([sel.x, sel.y], movingHumanTiles)) {
    addText("I-Move J-Cancel", {
      x: 2,
      y: 13,
      color: color `2`
    })
    return
  } 
  else if (movingHuman != null) {
    addText("J-Cancel", {
      x: 5,
      y: 13,
      color: color `2`
    })
    return
  }

  if (movingHealer != null && coordIn([sel.x, sel.y], movingHealerTiles)) {
    addText("I-Move J-Cancel", {
      x: 2,
      y: 13,
      color: color `2`
    })
    return
  } 
  else if (movingHealer != null) {
    addText("J-Cancel", {
      x: 5,
      y: 13,
      color: color `2`
    })
    return
  }
  
  if (movingSoldier != null && coordIn([sel.x, sel.y], movingSoldierTiles)) {
    addText("I-Move J-Cancel", {
      x: 2,
      y: 13,
      color: color `2`
    })
    return
  } 
  else if (movingSoldier != null) {
    addText("J-Cancel", {
      x: 5,
      y: 13,
      color: color `2`
    })
    return
  }

  var humans = getAll(human)
  if (humans.length > 0) {
    for (var i = 0; i < humans.length; i++) {
      var h = humans[i]
      if (h.x == sel.x && h.y == sel.y) {
        if (buildingHuman != null) {
          if (buildMenuSection == 0) {
            addText("D-Next", {
              x: 9,
              y: 11,
              color: color `2`
            })
            addText("I-Farm K-City", {
              x: 2,
              y: 12,
              color: color `2`
            })
            addText("L-Mine J-Cancel", {
              x: 2,
              y: 13,
              color: color `2`
            })
          } else if (buildMenuSection == 1) {
            addText("A-Previous", {
              x: 2,
              y: 11,
              color: color `2`
            })
            addText("I-Barracks", {
              x: 2,
              y: 12,
              color: color `2`
            })
          }
        } else if (getTile(h.x, h.y).length < 4) {
          if (getMoveValue(humansMoved, h)[0][1]) {
            addText("I-Move K-Build", {
              x: 2,
              y: 13,
              color: color `2`
            })
          } else {
            addText("K-Build", {
              x: 5,
              y: 13,
              color: color `2`
            })
          }
          
        } else {
          if (getMoveValue(humansMoved, h)[0][1]) {
            addText("I-Move", {
              x: 5,
              y: 13,
              color: color `2`
            })
          }
        }
        return
      }
    }
  }

  var healers = getAll(healer)
  if (healers.length > 0) {
    for (var i = 0; i < healers.length; i++) {
      var s = healers[i]
      if (s.x == sel.x && s.y == sel.y && (getMoveValue(healersMoved, s)[0][1])) {
        addText("I-Move", {
          x: 5,
          y: 13,
          color: color `2`
        })
        return
      }
    }
  }
  
  var soldiers = getAll(soldier)
  if (soldiers.length > 0) {
    for (var i = 0; i < soldiers.length; i++) {
      var s = soldiers[i]
      if (s.x == sel.x && s.y == sel.y && (getMoveValue(soldiersMoved, s)[0][1])) {
        addText("I-Move", {
          x: 5,
          y: 13,
          color: color `2`
        })
        return
      }
    }
  }

  var objs = getAll(citycenter)
  if (objs.length > 0) {
    for (var i = 0; i < objs.length; i++) {
      var obj = objs[i]
      if (obj.x == sel.x && obj.y == sel.y) {
  
        addText("I-Human", {
          x: 5,
          y: 13,
          color: color `2`
        })
        return
      }
    }
  }

  var objs = getAll(barracks)
  if (objs.length > 0) {
    for (var i = 0; i < objs.length; i++) {
      var obj = objs[i]
      if (obj.x == sel.x && obj.y == sel.y && !spriteIn(obj.x, obj.y, soldier)) {
        addText("K-Healer", {
          x: 5,
          y: 13,
          color: color `2`
        })
        
        addText("I-Soldier", {
          x: 5,
          y: 12,
          color: color `2`
        })
        return
      }
    }
  }

  if (playersTurn) {
    canNextTurn = true
    addText("L-Next Turn", {
      x: 4,
      y: 13,
      color: color `0`
    })
  } else {
    addText("Loading...", {
      x: 4,
      y: 13,
      color: color `1`
    })
  }
}

//check if sprite is on a certain tile
function spriteIn(tx, ty, stype) {
  var sprts = getTile(tx, ty)
  for (var i = 0; i < sprts.length; i++) {
    if (sprts[i].type == stype) {
      return true;
    }
  }
  return false;
}

//get list of tiles in certain range to a center tile
function tilesInRange(tx, ty, range){
  var tiles = [];
  for(var row = 0; row < height(); row++){
    for(var col = 0; col < width(); col++){
      if((Math.abs(row - ty) + Math.abs(col - tx)) <= range)
        tiles.push([col,row]);
    }
  }
  return tiles;
}

//show your available city land
function showCityLand() {
  for (var ti = 0; ti < cityland.length; ti++) {
    addSprite(cityland[ti][0], cityland[ti][1], selectGreen)
  }
}

//add more city land to player or enemy
function addCityLand(cx, cy, fromPlayer = true) {
  var newLand = tilesInRange(cx, cy, cityLandRange)
  for (var ti = 0; ti < newLand.length; ti++) {
    var t = newLand[ti]
    if (fromPlayer) {
      if (!coordIn([t[0], t[1]], cityland)) {
        cityland.push([t[0], t[1]])
      }
    } else {
      if (!coordIn([t[0], t[1]], Ecityland)) {
        Ecityland.push([t[0], t[1]])
      }
    }
  }
}

//get list of sprites that isnt the background (grass/water)
function notBackSprites(tx, ty) {
  var outputs = []
  var sprts = getTile(tx, ty)
  for (var i__ = 0; i__ < sprts.length; i__++) {
    if (sprts[i__].type != grass && sprts[i__].type != water && sprts[i__].type != select && sprts[i__].type != selectGreen && sprts[i__].type != selectRed) {
      outputs.push(sprts[i__])
    }
  }
  return outputs
}

//get sprite type, null if sprite is null
function getType(sprt) {if (sprt != null) {return sprt.type} else {return null}}

//calculate and potentially draw the possible movements by characters
function drawOptions(tx, ty, range, type) {
  var waters = getAll(water)
  var waterTiles = []
  for (var i = 0; i < waters.length; i++) {
    waterTiles.push([waters[i].x, waters[i].y])
  }  

  var lavas = getAll(lava)
  var lavaTiles = []
  for (var i = 0; i < lavas.length; i++) {
    lavaTiles.push([lavas[i].x, lavas[i].y])
  }  
  
  var opts = []
  for (var row = 0; row < height(); row++){
    for (var col = 0; col < width(); col++){
      if ((Math.abs(row - ty) + Math.abs(col - tx)) <= range) {
        if (type == soldier) {
          if (!coordIn([col, row], waterTiles) && !coordIn([col, row], lavaTiles)) {
            var buildingIndex = 0
            if (spriteIn(col, row, cracks)) {buildingIndex = 1}
            var soldierIndex = 0
            if (spriteIn(col, row, damage)) {soldierIndex = 1}
            if (enemyBuildings.includes(getType(notBackSprites(col, row)[buildingIndex])) || (getType(notBackSprites(col, row)[0]) == Ehuman) || (getType(notBackSprites(col, row)[soldierIndex]) == Esoldier || (getType(notBackSprites(col, row)[0]) == Ehealer))) {
              opts.push([col,row,true]) //true for CAN BE ATTACKED
            } else if (getTile(col, row).length < 2) {
              opts.push([col,row])
            }
          }
        } else if (type == Esoldier) {
          if (!coordIn([col, row], waterTiles) && !coordIn([col, row], lavaTiles)) {
            var buildingIndex = 0
            if (spriteIn(col, row, cracks)) {buildingIndex = 1}
            var soldierIndex = 0
            if (spriteIn(col, row, damage)) {soldierIndex = 1}
            if (playerBuildings.includes(getType(notBackSprites(col, row)[buildingIndex])) || (getType(notBackSprites(col, row)[0]) == human) || (getType(notBackSprites(col, row)[soldierIndex]) == soldier || (getType(notBackSprites(col, row)[0]) == healer))) {
              opts.push([col,row,true]) //true for CAN BE ATTACKED
            } else if (getTile(col, row).length < 2) {
              opts.push([col,row])
            }
          }
        } else if (type == healer) {
          if (!coordIn([col, row], waterTiles) && !coordIn([col, row], lavaTiles)) {
            var soldierIndex = 0
            if (spriteIn(col, row, damage)) {soldierIndex = 1}
            if (soldierIndex == 1 && getType(notBackSprites(col, row)[soldierIndex]) == soldier) {
              opts.push([col,row,true]) //true for CAN BE HEALED
            } else if (getTile(col, row).length < 2) {
              opts.push([col,row])
            }
          }
        } else if (type == Ehealer) {
          if (!coordIn([col, row], waterTiles) && !coordIn([col, row], lavaTiles)) {
            var soldierIndex = 0
            if (spriteIn(col, row, damage)) {soldierIndex = 1}
            if (soldierIndex == 1 && getType(notBackSprites(col, row)[soldierIndex]) == Esoldier) {
              opts.push([col,row,true]) //true for CAN BE HEALED
            } else if (getTile(col, row).length < 2) {
              opts.push([col,row])
            }
          }
        } else {
          if ((type == human || type == Ehuman) && (getType(notBackSprites(col, row)[0]) == wildfruit || getType(notBackSprites(col, row)[0]) == wildgold)) {
            opts.push([col,row])
            continue
          }
          if (getTile(col, row).length < 2 && !coordIn([col, row], waterTiles) && !coordIn([col, row], lavaTiles)) {
            opts.push([col,row])
          }
        }
      }
    }
  }
  
  if (type == human) {
    movingHumanTiles = opts
  } else if (type == healer) {
    movingHealerTiles = opts
  } else if (type == Ehealer) {
    EmovingHealerTiles = opts
  } else if (type == soldier) {
    movingSoldierTiles = opts
  } else if (type == Ehuman) {
    EmovingHumanTiles = opts
  } else if (type == Esoldier) {
    EmovingSoldierTiles = opts
  }
  if (type != Ehuman && type != Esoldier && type != Ehealer) {
    for (var ti = 0; ti < opts.length; ti++) {
      var drawAttackSelect = opts[ti][2]
      if (drawAttackSelect == null) {drawAttackSelect = false}

      if (drawAttackSelect) {
        if (type == healer) {
          addSprite(opts[ti][0], opts[ti][1], selectPink)
        } else {
          addSprite(opts[ti][0], opts[ti][1], selectRed)
        }
      } else {
        addSprite(opts[ti][0], opts[ti][1], selectGreen)
      }
    }
  }
}

//clear possible movements
function clearOptions() {
  var greens = getAll(selectGreen)
  for (var g = 0; g < greens.length; g++) {
    greens[g].remove()
  }

  var reds = getAll(selectRed)
  for (var g = 0; g < reds.length; g++) {
    reds[g].remove()
  }

  var pinks = getAll(selectPink)
  for (var g = 0; g < pinks.length; g++) {
    pinks[g].remove()
  }
}

//build building, for player
function buildBuilding(tx, ty, building, foodP, goldP, builder) {
  if (!coordIn([tx, ty], cityland)) {resourceTextDict = [0, 0]; return}
  
  if (food > (foodP - 1) && gold > (goldP - 1)) {
    addSprite(tx, ty, building)
    gold -= goldP
    food -= foodP
    finishBuild()
    if (building == citycenter) {addCityLand(tx, ty)}
    humansMoved.splice(getMoveValue(humansMoved, builder)[1], 1)
    builder.remove()
    return true
  } else {
    resourceTextDict = [foodP, goldP]
  }
  return false
}

//basic build finishing code
function finishBuild() {
  buildingHuman = null
  clearOptions()
}

//get move value for sprite form move value array
function getMoveValue(movear, sprit) {
  for (var i__ = 0; i__ < movear.length; i__++) {
    if (sprit.x == movear[i__][0][0] && sprit.y == movear[i__][0][1]) {
      return [movear[i__], i__]
    }
  }
  return null
}

//function for next turn
function nextTurn() {
  function endGame(winning, gameFinished) {
    clearText()
    reWriteText()
    gameEnded = true
    canMove = false
    canNextMap = winning
  }
  
  food -= getAll(citycenter).length
  food -= getAll(human).length
  food += getAll(farm).length
  gold += getAll(mine).length
  gold -= getAll(soldier).length
  
  for (var i = 0; i < humansMoved.length; i++) {
    humansMoved[i][1] = true;
  }

  for (var i = 0; i < healersMoved.length; i++) {
    healersMoved[i][1] = true;
  }

  for (var i = 0; i < soldiersMoved.length; i++) {
    soldiersMoved[i][1] = true;
  }

  if (getAll(citycenter).length < 1) {
    endGameTextDict = ["YOU LOST YOUR CITIES", 2, 6, color `3`]
    endGame(false)
  }
  
  if (food < 0) {
    endGameTextDict = ["YOU STARVED", 4, 6, color `3`]
    endGame(false)
  }

  if (gold < 0) {
    endGameTextDict = ["YOU'RE BANKRUPT", 3, 6, color `3`]
    endGame(false)
  }

  if (getAll(Ecitycenter).length < 1) {
    if (level != levels.length - 1) {
      endGameTextDict = ["You Won!", 2, 4, color `0`, true, "L for next level", 2, 5, color `0`]
      endGame(true)
    } else {
      endGameTextDict = ["You Beat The Game!!", 2, 4, color `0`]
      endGame(false)
    }
  }
  
  naturalDisasters()
  playersTurn = false
  reWriteText()
  enemyTurn()
}

//calculate natural disasters and wild food/gold
function naturalDisasters() {
  for (var i = 0; i < disasterTimeOut.length; i++) {
    disasterTimeOut[i][1] = disasterTimeOut[i][1] - 1
    if (disasterTimeOut[i][1] < 1) {
      var sprts = getTile(disasterTimeOut[i][0][0], disasterTimeOut[i][0][1])
      for (var i_ = 0; i_ < sprts.length; i_++) {
        if (sprts[i].type != select) {
          if (sprts[i].type == human) {
            humansMoved.splice(getMoveValue(humansMoved, sprts[i])[1], 1)
          } else if (sprts[i].type == soldier) {
            soldiersMoved.splice(getMoveValue(soldiersMoved, sprts[i])[1], 1)
          } else if (sprts[i].type == Ehuman) {
            EhumansMoved.splice(getMoveValue(EhumansMoved, sprts[i])[1], 1)
          } else if (sprts[i].type == Esoldier) {
            EsoldiersMoved.splice(getMoveValue(EsoldiersMoved, sprts[i])[1], 1)
          }
          sprts[i].remove()
        }
      }
      addSprite(disasterTimeOut[i][0][0], disasterTimeOut[i][0][1], grass)
      disasterTimeOut.splice(i, 1)
      i -= 1
    }
  }
  
  if (Math.random() < spawnGoodsChance) {
    var waters = getAll(water)
    var waterTiles = []
    for (var i = 0; i < waters.length; i++) {
      waterTiles.push([waters[i].x, waters[i].y])
    }
    
    var tx = Math.floor(Math.random() * width())
    var ty = Math.floor(Math.random() * height())

    if (((tx == (width() - 1) && ty == (height() - 1))) || (tx == 1 && ty == 1) || coordIn([tx, ty], waterTiles) || (getTile(tx, ty).length > 1)) {return}

    addSprite(tx, ty, [wildfruit, wildgold][Math.floor(Math.random() * 2)])
  }
  
  if (Math.random() < disasterChance) {
    var waters = getAll(water)
    var waterTiles = []
    for (var i = 0; i < waters.length; i++) {
      waterTiles.push([waters[i].x, waters[i].y])
    }
    
    var tx = Math.floor(Math.random() * width())
    var ty = Math.floor(Math.random() * height())

    if ((tx == (width() - 1) && ty == (height() - 1)) || (tx == 1 && ty == 1) || coordIn([tx, ty], waterTiles)) {return}
    
    var sprts = getTile(tx, ty)
    for (var i = 0; i < sprts.length; i++) {
      if (sprts[i].type != select) {
        sprts[i].remove()
      }
    }

    addSprite(tx, ty, lava)
    disasterTimeOut.push([[tx, ty], Math.floor(Math.random() * 3) + disasterExpiration - 1])
  }
}


//enemy spawns human
function enemyBuyHuman(tCoord) {
  var tx = tCoord[0]
  var ty = tCoord[1]

  var gettileout = getTile(tx, ty)
  if (spriteIn(tx, ty, cracks)) {gettileout.splice(gettileout.indexOf(getSpriteOn(tx, ty, cracks)), 1)}
  
  if (Efood < 1 || !(gettileout.length < 3)) {return}

  addSprite(tx, ty, Ehuman)
  EhumansMoved.push([[tx, ty], true])
  Efood -= 1
}

//enemy buys soldiers
function enemyBuySoldier(tCoord) {
  var tx = tCoord[0]
  var ty = tCoord[1]

  var gettileout = getTile(tx, ty)
  if (spriteIn(tx, ty, cracks)) {gettileout.splice(gettileout.indexOf(getSpriteOn(tx, ty, cracks)), 1)}
  
  if (Egold < 1 || Efood < 1 || !(gettileout.length < 3)) {return}

  addSprite(tx, ty, Esoldier)
  EsoldiersMoved.push([[tx, ty], false])
  Efood -= 1
  Egold -= 1
}

//enemy buys healer
function enemyBuyHealer(tCoord) {
  var tx = tCoord[0]
  var ty = tCoord[1]

  var gettileout = getTile(tx, ty)
  if (spriteIn(tx, ty, cracks)) {gettileout.splice(gettileout.indexOf(getSpriteOn(tx, ty, cracks)), 1)}
  
  if (Egold < 1 || Efood < 1 || !(gettileout.length < 3)) {return}

  addSprite(tx, ty, Ehealer)
  EhealersMoved.push([[tx, ty], false])
  Efood -= 1
  Egold -= 1
}

//enemy builds
function enemyBuild(EbuildingHuman) {
  var tx = EbuildingHuman.x
  var ty = EbuildingHuman.y
  
  if ((!coordIn([tx, ty], Ecityland)) || (getTile(tx, ty).length > 2)) {return}
  
  var EpossibleBuildings = [
    [Ecitycenter, 3, 3],
    [Efarm, 1, 1],
    [Emine, 0, 2],
    [Ebarracks, 2, 3]
  ]

  if (enemyStartQueue.length == 0) {
    var EchosenBuilding = EpossibleBuildings[Math.floor(Math.random() * EpossibleBuildings.length)]
  } else {
    var EchosenBuilding = enemyStartQueue[0]

    for (var i = 0; i < EpossibleBuildings.length; i++) {
      if (EpossibleBuildings[i][0] == EchosenBuilding) {
        EchosenBuilding = EpossibleBuildings[i]
        break
      }
    }
    
    enemyStartQueue.splice(0, 1)
  }

  if (Efood > (EchosenBuilding[1] - 1) && Egold > (EchosenBuilding[2] - 1)) {
    addSprite(tx, ty, EchosenBuilding[0])
    Egold -= EchosenBuilding[1]
    Efood -= EchosenBuilding[2]
    if (EchosenBuilding[0] == Ecitycenter) {addCityLand(tx, ty, false)}
    EhumansMoved.splice(getMoveValue(EhumansMoved, EbuildingHuman)[1], 1)
    EbuildingHuman.remove()
  }
}

//enemy finishing turn
function enemyEndTurn() {
  clearInterval(enemyTurn);

  Efood -= getAll(Ecitycenter).length
  Efood -= getAll(Ehuman).length
  Efood += getAll(Efarm).length
  Egold += getAll(Emine).length
  Egold -= getAll(Esoldier).length
  Efood -= getAll(Esoldier).length

  for (var i = 0; i < EhumansMoved.length; i++) {
    EhumansMoved[i][1] = true;
  }

  for (var i = 0; i < EsoldiersMoved.length; i++) {
    EsoldiersMoved[i][1] = true;
  }

  for (var i = 0; i < EhealersMoved.length; i++) {
    EhealersMoved[i][1] = true;
  }
  
  playersTurn = true
  reWriteText()
}

//enemy moves a human
function enemyMoveHuman(EmovingHuman) {
  drawOptions(EmovingHuman.x, EmovingHuman.y, humanMovingRange, Ehuman)

  var destination = null
  var possiblePickups = []
  for (var pai = 0; pai < EmovingHumanTiles.length; pai++) {
    if (getType(notBackSprites(EmovingHumanTiles[pai][0], EmovingHumanTiles[pai][1])[0]) == wildfruit || getType(notBackSprites(EmovingHumanTiles[pai][0], EmovingHumanTiles[pai][1])[0]) == wildgold) {
      possiblePickups.push(pai)
    }
  }
  
  if (possiblePickups.length > 0) {
    destination = EmovingHumanTiles[possiblePickups[Math.floor(Math.random() * possiblePickups.length)]]
  } else {
    destination = EmovingHumanTiles[Math.floor(Math.random() * EmovingHumanTiles.length)]
  }
  
  var raw_moveval = getMoveValue(EhumansMoved, EmovingHuman)
  if (coordIn(destination, EmovingHumanTiles) && raw_moveval[0][1]) {
    if (getType(notBackSprites(destination[0], destination[1])[0]) == wildfruit) {
      Efood += Math.floor(Math.random() * 5) + 1
      getSpriteOn(destination[0], destination[1], wildfruit).remove()
    } else if (getType(notBackSprites(destination[0], destination[1])[0]) == wildgold) {
      Egold += Math.floor(Math.random() * 5) + 1
      getSpriteOn(destination[0], destination[1], wildgold).remove()
    }
    
    EhumansMoved[raw_moveval[1]][0] = destination
    EhumansMoved[raw_moveval[1]][1] = false
    addSprite(destination[0], destination[1], Ehuman)
    EmovingHuman.remove()
    EmovingHumanTiles = null
  }
}

//enemy moves a healer
function enemyMoveHealer(EmovingHealer) {
  drawOptions(EmovingHealer.x, EmovingHealer.y, humanMovingRange, Ehealer)

  var destination = null
  var possibleHeals = []
  for (var pai = 0; pai < EmovingHealerTiles.length; pai++) {
    if (EmovingHealerTiles[pai][2]) {
      possibleHeals.push(pai)
    }
  }
  
  if (possibleHeals.length > 0) {
    destination = EmovingHealerTiles[possibleHeals[Math.floor(Math.random() * possibleHeals.length)]]
  } else {
    destination = EmovingHealerTiles[Math.floor(Math.random() * EmovingHealerTiles.length)]
  }
  
  var raw_moveval = getMoveValue(EhealersMoved, EmovingHealer)
  var coordInOut = coordIn(destination, EmovingHealerTiles, true)
  if (coordInOut[0] && raw_moveval[0][1]) {
    if (coordInOut[1]) {
      EhealersMoved[raw_moveval[1]][1] = false
      var myDamageIndx = getMoveValue(EdamageSoldiers, getSpriteOn(destination[0], destination[1]))[1]
      EdamageSoldiers.splice(myDamageIndx, 1)
      getSpriteOn(destination[0], destination[1], damage).remove()
      EmovingHealer = null
      EmovingHealerTiles = null
      return
    }
    
    EhealersMoved[raw_moveval[1]][0] = destination
    EhealersMoved[raw_moveval[1]][1] = false
    addSprite(destination[0], destination[1], Ehealer)
    EmovingHealer.remove()
    EmovingHealerTiles = null
  }
}

//enemy moves a soldier
function enemyMoveSoldier(EmovingSoldier) {
  drawOptions(EmovingSoldier.x, EmovingSoldier.y, humanMovingRange, Esoldier)
  
  var destination = null
  var possibleAttacks = []
  for (var pai = 0; pai < EmovingSoldierTiles.length; pai++) {
    if (EmovingSoldierTiles[pai][2]) {
      possibleAttacks.push(pai)
    }
  }
  
  if (possibleAttacks.length > 0) {
    destination = EmovingSoldierTiles[possibleAttacks[Math.floor(Math.random() * possibleAttacks.length)]]
  } else {
    destination = EmovingSoldierTiles[Math.floor(Math.random() * EmovingSoldierTiles.length)]
  }

  var raw_moveval = getMoveValue(EsoldiersMoved, EmovingSoldier)
  var coordInOut = coordIn(destination, EmovingSoldierTiles, true)
  if (coordInOut[0] && raw_moveval[0][1]) {
    if (coordInOut[1]) {
      EsoldiersMoved[raw_moveval[1]][1] = false
      if ((getType(notBackSprites(destination[0], destination[1])[0]) == human) || (getType(notBackSprites(destination[0], destination[1])[0]) == healer)) {
        var dyingHuman = notBackSprites(destination[0], destination[1])[0]
        if (getType(notBackSprites(destination[0], destination[1])[0]) == human) {
          humansMoved.splice(getMoveValue(humansMoved, dyingHuman)[1], 1)
        } else if (getType(notBackSprites(destination[0], destination[1])[0]) == healer) {
          healersMoved.splice(getMoveValue(healersMoved, dyingHuman)[1], 1)
        }
        dyingHuman.remove()

        if (spriteIn(EmovingSoldier.x, EmovingSoldier.y, damage)) {
          var myDamageValue = getMoveValue(EdamageSoldiers, EmovingSoldier)
          var myDamageIndx = myDamageValue[1]
          myDamageValue = myDamageValue[0]
          EdamageSoldiers[myDamageIndx][0] = [destination[0], destination[1]]
          EdamageSoldiers[myDamageIndx][1].x = destination[0]
          EdamageSoldiers[myDamageIndx][1].y = destination[1]
        }

        EsoldiersMoved[raw_moveval[1]][0] = [destination[0], destination[1]]
        addSprite(destination[0], destination[1], Esoldier)
        EmovingSoldier.remove()
        EmovingSoldier = null
        EmovingSoldierTiles = null
        return
    } else if (getType(notBackSprites(destination[0], destination[1])[(spriteIn(destination[0], destination[1], damage)) ? 1 : 0]) == soldier) {
      if (spriteIn(destination[0], destination[1], damage)) {
        var sprts = getTile(destination[0], destination[1])
        for (var i = 0; i < sprts.length; i++) {
          if (sprts[i].type != select) {
            sprts[i].remove()
          }
        }

        if (spriteIn(EmovingSoldier.x, EmovingSoldier.y, damage)) {
          var myDamageValue = getMoveValue(EdamageSoldiers, EmovingSoldier)
          var myDamageIndx = myDamageValue[1]
          myDamageValue = myDamageValue[0]
          EdamageSoldiers[myDamageIndx][0] = [destination[0], destination[1]]
          EdamageSoldiers[myDamageIndx][1].x = destination[0]
          EdamageSoldiers[myDamageIndx][1].y = destination[1]
        }
        
        addSprite(destination[0], destination[1], grass)
        EsoldiersMoved[raw_moveval[1]][0] = [destination[0], destination[1]]
        addSprite(destination[0], destination[1], Esoldier)
        EmovingSoldier.remove()
        EmovingSoldier = null
        EmovingSoldierTiles = null
        return
      } else {
        addSprite(destination[0], destination[1], damage)
        damageSoldiers.push([[destination[0], destination[1]], getSpriteOn(destination[0], destination[1], damage)])
      }
    } else {
      if (spriteIn(destination[0], destination[1], cracks)) {
        var sprts = getTile(destination[0], destination[1])
        for (var i = 0; i < sprts.length; i++) {
          if (sprts[i].type != select) {
            sprts[i].remove()
          }
        }

        if (spriteIn(EmovingSoldier.x, EmovingSoldier.y, damage)) {
          var myDamageValue = getMoveValue(EdamageSoldiers, EmovingSoldier)
          var myDamageIndx = myDamageValue[1]
          myDamageValue = myDamageValue[0]
          EdamageSoldiers[myDamageIndx][0] = [destination[0], destination[1]]
          EdamageSoldiers[myDamageIndx][1].x = destination[0]
          EdamageSoldiers[myDamageIndx][1].y = destination[1]
        }
        
        addSprite(destination[0], destination[1], grass)
        EsoldiersMoved[raw_moveval[1]][0] = [destination[0], destination[1]]
        addSprite(destination[0], destination[1], Esoldier)
        EmovingSoldier.remove()
        EmovingSoldier = null
        EmovingSoldierTiles = null
        return
      } else {
        addSprite(destination[0], destination[1], cracks)
      }
    }
    EmovingSoldier = null
    EmovingSoldierTiles = null
    return
  }
    if (spriteIn(EmovingSoldier.x, EmovingSoldier.y, damage)) {
      var myDamageValue = getMoveValue(EdamageSoldiers, EmovingSoldier)
      var myDamageIndx = myDamageValue[1]
      myDamageValue = myDamageValue[0]
      EdamageSoldiers[myDamageIndx][0] = [destination[0], destination[1]]
      EdamageSoldiers[myDamageIndx][1].x = destination[0]
      EdamageSoldiers[myDamageIndx][1].y = destination[1]
    }
  
    EsoldiersMoved[raw_moveval[1]][0] = destination
    EsoldiersMoved[raw_moveval[1]][1] = false
    addSprite(destination[0], destination[1], Esoldier)
    EmovingSoldier.remove()
    EmovingSoldierTiles = null
  }
  return
}


//enemy turn
function enemyTurn() {
  var funcList = []
  var paramList = []
  
  function recompileFunctions() {
    funcList = []
    paramList = []
    
    funcList.push(enemyEndTurn)
    paramList.push(null)
    
    var Ecities = getAll(Ecitycenter)
    for (var i = 0; i < Ecities.length; i++) {
      funcList.push(enemyBuyHuman)
      paramList.push([Ecities[i].x, Ecities[i].y])
    }

    var Ebarrackss = getAll(Ebarracks)
    for (var i = 0; i < Ebarrackss.length; i++) {
      funcList.push(enemyBuySoldier)
      paramList.push([Ebarrackss[i].x, Ebarrackss[i].y])

      funcList.push(enemyBuyHealer)
      paramList.push([Ebarrackss[i].x, Ebarrackss[i].y])
    }

    var Ehumans = getAll(Ehuman)
    for (var i = 0; i < Ehumans.length; i++) {
      if (getMoveValue(EhumansMoved, Ehumans[i])[0][1]) {
        funcList.push(enemyMoveHuman)
        paramList.push(Ehumans[i])
  
        funcList.push(enemyBuild)
        paramList.push(Ehumans[i])
      }
    }

    var Esoldiers = getAll(Esoldier)
    for (var i = 0; i < Esoldiers.length; i++) {
      if (getMoveValue(EsoldiersMoved, Esoldiers[i])[0][1]) {
        funcList.push(enemyMoveSoldier)
        paramList.push(Esoldiers[i])
      }
    }

    var Ehealers = getAll(Ehealer)
    for (var i = 0; i < Ehealers.length; i++) {
      if (getMoveValue(EhealersMoved, Ehealers[i])[0][1]) {
        funcList.push(enemyMoveHealer)
        paramList.push(Ehealers[i])
      }
    }
  }

  recompileFunctions()

  var ranIndx = Math.floor(Math.random() * funcList.length)

  if (paramList[ranIndx] == null) {
    funcList[ranIndx]()
  } else {
    funcList[ranIndx](paramList[ranIndx])
  }
  if (playersTurn) {return}
  recompileFunctions()
  setTimeout(enemyTurn, enemyTurnSpeed);
}

//function that runs every second, for timing out popups
function everyTick() {
  if (resourceTextDict != null) {
    resourceTextDict[2] = resourceTextDict[2] - 1
  }
  if (!inMenu) {reWriteText()}
  setTimeout(everyTick, 1000)
}

//switch to next map
function nextMap() {
  level += 1
  
  setMap(levels[level])
  
  gameEnded = false
  playersTurn = true
  canMove = true

  food = [20, 15, 10, 5][level-1]
  gold = [20, 15, 10, 5][level-1]
  Efood = [10, 30, 99, 999][level-1]
  Egold = [10, 30, 99, 999][level-1]
  
  endGameTextDict = null
  movingHuman = null
  movingHumanTiles = null
  movingHealer = null
  movingHealerTiles = null
  EmovingHumanTiles = null
  EmovingSoldierTiles = null
  EmovingHealerTiles = null
  humansMoved = []
  soldiersMoved = []
  healersMoved = []
  damageSoldiers = []
  EhumansMoved = []
  EsoldiersMoved = []
  EhealersMoved = []
  EdamageSoldiers = []
  cityland = []
  Ecityland = []
  disasterTimeOut = []
  
  
  enemyStartQueue = [Efarm, Efarm, Emine]

  addSprite(0, 0, select)
  addSprite(1, 1, citycenter)
  
  addCityLand(1, 1)
  addSprite(width() - 2, height() - 2, Ecitycenter)
  addCityLand(width() - 2, height() - 2, false)

  reWriteText()
}

//start menu input code
function menuInput() {
  if (menuPos > 4) {inMenu = false; nextMap(); everyTick(); return}

  if (menuPos == 0) {
    for (var y__ = 0; y__ < height(); y__++) {
      for (var x__ = 0; x__ < width(); x__++) {
        clearTile(x__, y__)
      }
    }
  }
  
  clearText()
  menuPos++

  var menuDArrays = [
    [
      "In civilization",
      "builder, you will",
      "expand your food and",
      "gold economy. Make",
      "humans to build,",
      "soldiers to conquer",
      "and medics to heal."
    ],
    [
      "All your buildings",
      "have to be within 3",
      "tiles of a city.",
      "Humans and cities",
      "take food per turn",
      "while soldiers and",
      "medics take gold."
    ],
    [
      "Farms need 1 gold",
      "and 1 food but makes",
      "a food per turn.",
      "Mines take 2 gold",
      "but make 1 gold.",
      "Barracks make war",
      "units while...",
    ],
    [
      "cities expand land",
      "and spawn humans. To",
      "win, break all the",
      "enemy's cities and",
      "don't lose too much",
      "food or gold. Nature",
      "will help you with"
    ],
    [
      "wild food and gold",
      "but hurt you with",
      "meteorite strikes.",
      " ",
      "Have fun and good",
      "luck!"
    ]
  ]
  
  if ([1, 2, 3, 4, 5].includes(menuPos)) {
    for (var i = 0; i < menuDArrays[menuPos-1].length; i++) {
      addText(menuDArrays[menuPos-1][i], {
        x: 0,
        y: 2*i+1,
        color: color `0`
      })
    }
    if (menuPos != 5) {
      addText("I to continue", {
        x: 7,
        y: 2*i+1,
        color: color `5`
      })
    } else {
      addText("I to start", {
        x: 7,
        y: 2*i+1,
        color: color `5`
      })
    }
  }
}

//variables: GWLcfmbhsCFMBHeSgrxdwoapAq --25/52 //all used sprite keys

//DEFINE VARIABLES
const grass = "G"
const water = "W"
const lava = "L"

const citycenter = "c"
const farm = "f"
const mine = "m"
const barracks = "b"

const human = "h"
const soldier = "s"
const healer = "a"

const Ecitycenter = "C"
const Efarm = "F"
const Emine = "M"
const Ebarracks = "B"

const Ehuman = "H"
const Esoldier = "e"
const Ehealer = "A"

const select = "S"
const selectGreen = "g"
const selectRed = "r"
const selectPink = "p"

const cracks = "x"
const damage = "d"

const wildfruit = "w"
const wildgold = "o"

const backgroundTile = "q"

var food = 5
var gold = 5

var Efood = 99
var Egold = 99

var DEBUG = ""
var endGameTextDict = null
var resourceTextDict = null

var canMove = true

const humanMovingRange = 2

var movingHuman = null
var movingHumanTiles = null

var movingHealer = null
var movingHealerTiles = null

var EmovingHumanTiles = null
var EmovingSoldierTiles = null
var EmovingHealerTiles = null

var humansMoved = [] //the second value is a bool for if character can move
var soldiersMoved = [] //the second value is a bool for if character can move
var healersMoved = []

var damageSoldiers = []

var EhumansMoved = []
var EsoldiersMoved = [] //the second value is a bool for if character can move
var EhealersMoved = []

var EdamageSoldiers = []

var movingSoldier = null
var movingSoldierTiles = null
const soldierMovingRange = 2

const cityLandRange = 3
var cityland = []

var Ecityland = []

var buildingHuman = null
var buildMenuSection = 0

const disasterChance = 0.1
const spawnGoodsChance = 0.5
const disasterExpiration = 5
var disasterTimeOut = [] //in format: [[x, y], timeUntilItBreak]

var canNextMap = false

var canNextTurn = false
var gameEnded = false
var playersTurn = true
const enemyTurnSpeed = 250

var inMenu = true
var menuPos = 0

//SETUP
setLegend(
  [ select, bitmap`
2222222222222222
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2..............2
2222222222222222` ],
  [ selectGreen, bitmap`
................
.44444444444444.
.4............4.
.4............4.
.4............4.
.4............4.
.4............4.
.4............4.
.4............4.
.4............4.
.4............4.
.4............4.
.4............4.
.4............4.
.44444444444444.
................` ],
  [ selectRed, bitmap`
................
.33333333333333.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.3............3.
.33333333333333.
................` ],
  [ selectPink, bitmap`
................
.88888888888888.
.8............8.
.8............8.
.8............8.
.8............8.
.8............8.
.8............8.
.8............8.
.8............8.
.8............8.
.8............8.
.8............8.
.8............8.
.88888888888888.
................` ],
  [ damage, bitmap `
................
......3....0....
..........0.....
.........0......
.....0..0.......
....0....3......
......3...3.....
.......3.0......
.......3..0.....
................
.........3......
.........3......
.......3........
.......3........
......3.........
................` ],
  [ soldier, bitmap`
.....LLLLLLL....
.....L12121L....
.....L11011L....
......L111L.....
....LLLLLLLLL...
....L1111111L...
....L1111111L...
....LLL111LLL...
....00L111L00...
......LLLLL.....
......L1L1L.....
......1L.L1.....
......L1.1L.....
......1L.L1.....
......CC.CC.....
................` ],
  [ Esoldier, bitmap`
.....CCCCCCC....
.....C32323C....
.....C33033C....
......C333C.....
....CCCCCCCCC...
....C3333333C...
....C3333333C...
....CCC333CCC...
....00C333C00...
......CCCCC.....
......C3C3C.....
......3C.C3.....
......C3.3C.....
......3C.C3.....
......LL.LL.....
................` ],
  [ human, bitmap`
......00000.....
......F2F2F.....
......FF0FF.....
.......FFF......
....444444444...
....444444444...
....444444444...
....444444444...
....DD44444DD...
......00000.....
......55555.....
......55.55.....
......55.55.....
......55.55.....
......CC.CC.....
................` ],
  [ Ehuman, bitmap`
......00000.....
......F2F2F.....
......FF0FF.....
.......FFF......
....333333333...
....333333333...
....333333333...
....333333333...
....DD33333DD...
......00000.....
......77777.....
......77.77.....
......77.77.....
......77.77.....
......CC.CC.....
................` ],
  [ healer, bitmap`
......00000.....
......02F20.....
......0F0F0.....
......0FFF0.....
....666626666...
....622232226...
....622333226...
....662232266...
....FF22222FF...
......00000.....
......62226.....
......62.26.....
......62.26.....
......66.66.....
......CC.CC.....
................` ],
  [ Ehealer, bitmap`
......LLLLL.....
......L2F2L.....
......LF0FL.....
......LFFFL.....
....333323333...
....322232223...
....322333223...
....332232233...
....FF22222FF...
......00000.....
......32223.....
......32.23.....
......32.23.....
......33.33.....
......CC.CC.....
................` ],
  [ cracks, bitmap `
................
................
.....0....0.....
....00....0.....
..00.....0......
..0.....000000..
...0..0000......
...0000.........
.00.0000....00..
..000.0.00.0....
..00..0..00.....
..0...00..00....
..0....0...00...
.0..........0...
................
................` ],
  [ citycenter, bitmap`
................
...FF....F..F...
..FFFF..FF.FFFF.
.FFCCFFFFFFFCCF.
.FCL666FCCFF6CFF
FFC66666CLC666FF
FF6666666L66666.
.666CCC66666C666
66CCC11C6C6C1C66
.C11C11CC1C111C6
.C11C11C11C111C.
.C1LC1LC1LC11LC.
.C1LC1LC1LC11LC.
.CCCCCCCCCCCCCC.
................
................` ],
  [ Ecitycenter, bitmap`
................
...CC....C..C...
..CCCC..CC.CCCC.
.CC00CCCCCCC00C.
.C0L333C00CC30CC
CC0333330L0333CC
CC3333333L33333.
.333000333330333
3300011030301033
.011011001011103
.01101101101110.
.01L01L01L011L0.
.01L01L01L011L0.
.00000000000000.
................
................` ],
  [ farm, bitmap`
................
...........66...
.........66666..
........6666666.
.......66FFFFF66
.........F111F..
.........F111F..
.........F11LF..
C4CCDCC4CFFFLF4D
7777777777777777
CCCCC4DC4CC4C4CC
C4C4DCCCCD4DCCC4
7777777777777777
CDC4CCDCC4CDCC4C
................
................` ],
  [ Efarm, bitmap`
................
...........33...
.........33333..
........3333333.
.......330000033
.........01110..
.........01110..
.........011L0..
C4CCDCC4C000L04D
7777777777777777
CCCCC4DC4CC4C4CC
C4C4DCCCCD4DCCC4
7777777777777777
CDC4CCDCC4CDCC4C
................
................` ],
  [ barracks, bitmap`
................
................
.......66.......
......6666......
2.2.66666666.2.2
.26666666666662.
2666666666666662
.CCCCCCCCCCCCCC.
.CFLLFFFFFFLLFC.
.C177111F1177FC.
.CF77F1LLFF77FC.
.C177F1LL1F771C.
.CF1FFFLLFFF1FC.
.CCCCCCCCCCCCCC.
................
................` ],
  [ Ebarracks, bitmap`
................
................
.......33.......
......3333......
2.2.33333333.2.2
.23333333333332.
2333333333333332
.CCCCCCCCCCCCCC.
.CFLLFFFFFFLLFC.
.C133111F1133FC.
.CF33F1LLFF33FC.
.C133F1LL1F331C.
.CF1FFFLLFFF1FC.
.CCCCCCCCCCCCCC.
................
................` ],
  [ mine, bitmap`
................
.......LLL......
......LL11LL....
.....L11111L....
....LL111111L...
...LL1111111LL..
..LL111111111L..
..L1111111111L..
.L11111000111L..
.L111110010111L.
.L111110L6L111L.
.L1CCCCCLCCC11L.
.CCLCC1CCCC1CCC.
C1CCCCCCCLCCCCLC
................
................` ],
  [ Emine, bitmap`
................
.......LLL......
......LL11LL....
.....311111L....
....3331111333..
...LL33333333L..
..LL113333331L..
..L1111111111L..
.L11111000111L..
.L111110010111L.
.L111110L6L111L.
.L1CCCCCLCCC11L.
.CCLCC1CCCC1CCC.
C1CCCCCCCLCCCCLC
................
................` ],
  [ wildfruit, bitmap`
...DDDDDDD......
.DDD444434DD....
DD444344444DD...
D4444444434DDD..
D434443444DD4DDD
D444344344D4443D
DDD444444DD4344D
..DDDDDDDD.DDDDD
...LCCCL...LCCL.
...LCCCL...LCCL.
..LCCCCL..LLCCL.
..LCCCC8..LCCCL.
.HCCCH4L..LCCCCL
48CHCC48.H8C8CHL
4C4C8C4L4.L4C48L
4C4CC44C4.L4C4C4` ],
  [ wildgold, bitmap`
................
................
................
......LLLLLL....
...LLLL216FL....
..LL16111LLLLLL.
..L211F6L16F126L
.LLLLLLLLLLLL1FL
.L61LLL12111FL1L
.LFLL16116611LLL
.LLL111F11F12L..
.LL216611111LL..
..LL1F116F2LL...
...LLLLLLLL.....
................
................` ],
  [ grass, bitmap`
DDDDDDDDDDDDDDDD
DDDDDD4DDDDDDDDD
DDDDDDDDDDDDDDD4
DDD4DDDDDDD4DDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
4DDDDDDDDDDDDDDD
DDDDDDDDDDDDD4DD
DDDDDD4DDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
D4DDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDD4DDDDDDDDD
DDDDDDDDDDDD4DDD` ],
  [ lava, bitmap`
CCCCCCCCCCC1CCCC
C00C000C0C00000C
C0CC1CCCCCCCCCCC
CCC3339333333C0C
C0C3CCC33CCC3C0C
1CC3C33333339C0C
C0C3C399993C3C0C
C0C3C396L93C3CC1
C0C9339LL9333CCC
CCC33399993C3C0C
C0C33333333C3C0C
C0C3CCCC3CCC3C0C
10C3333399333CCC
C0C1CCCCCCCC1C0C
C00C0000C00000CC
CCCCCCC1CCCCCCC1` ],
  [ water, bitmap`
5555555555555555
5555555555575555
5557555555755555
5575555555555555
5555555555555555
5555557555555575
5555575555555575
5555755555555755
5557555555557555
5555555555575555
5555555555755555
5555555557555555
5555555575555555
5555555755555555
5575555555555555
5555555555555755` ],
  [ backgroundTile, bitmap`
4444444444414444
4444444444414444
4444444444414444
1111111111111111
7777177777777777
7777177777777777
7777177777777777
1111111111111111
DDDDDDDDDDD1DDDD
DDDDDDDDDDD1DDDD
DDDDDDDDDDD1DDDD
1111111111111111
2222122222222222
2222122222222222
2222122222222222
1111111111111111` ],
)

var playerBuildings = [citycenter, farm, barracks, mine]
var enemyBuildings = [Ecitycenter, Efarm, Ebarracks, Emine]

var enemyStartQueue = [Efarm, Efarm, Emine]

let level = 0
const levels = [
  map `
..............
..............
..............
..............
..............
h.....cC.....H
h............H
h............H
h............H
h............H
hhhhhhhHHHHHHH`,
  map `
GGGGGG
GGGGGG
GGGGGG
GGGGGG
GGGGGG
GGGGGG`,
  map`
GGGGGGGWWWGGGG
GGGGGGGWWWGGGG
GGGGGGGWWWGGGG
GGGGGGWWWGGGGG
GGGGGGGWWGGGGG
GGGGGWGGGGGGGG
GGGGGWWWGGGGGG
GGGGWWWGGGGGGG
GGGGWWWGGGGGGG
GGGGWWWGGGGGGG`,
  map `
GGGGGGGGGGGGGGGGGGGG
GGGGGGGGGGGGGGGGGGGG
GGGGGGGGGGGGGGGGGGGG
GGGGGGGGGGGGGGGGGGGG
GGGGGGGGGGGGGGGGGGGG
WWWWWWWWGGGGGGGGGGGG
WWWWWWWWWWWWWWWWGGGG
GGWWWWWWWWWWWWWWGGGG
GGGGGGGGGGGGWWWWGGGG
GGGGGGGGGGGGGGGGGGGG
GGGGGGGGGGGGGGGGGGGG
GGGGGGGGWWWWGGGGGGGG
GGGGGWWWWWWWWWWWWWWW
GGGGGWWWWWWWWWWWWWWW
GGGGGGGGGGGGGWWWWWWW
GGGGGGGGGGGGGGGGGGGG
GGGGGGGGGGGGGGGGGGGG
GGGGGGGGGGGGGGGGGGGG
GGGGGGGGGGGGGGGGGGGG
GGGGGGGGGGGGGGGGGGGG`,
  map `
GGGGGGGGGGGGGGGWWWWWWWWWWWWWGG
GGGGGGGGGGGGGGGGWWWWWWWWWWWGGG
GGGGGGGGGGGGGGGGGGWWWWWWWGGGGG
GGGGGGGGGGGGGGGGGGGGWWWGGGGGGG
GGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
GGGGGGGGGWWWWGGGGGGGGGGGGGGGGG
GGGGGGGGWWWWWWGGGGGGGGGWWWWGGG
GGGGGGGGWWWWWWGGGGGGGGWWWWWWGG
GWWWGGGGWWWWWWWGGGGGGGWWWWWWWG
WWWWGGGGWWWWWWWGGGGGGWWWWWWWWG
WWWWGGGGWWWWWWWWGGGGGWWWWWWWWG
WWWGGGGWWWWWWWWWGGGGGWWWWWWWGG
WWGGGGGWWWWWWWWGGGGGGWWWWGGGGG
WGGGGGGWWWWWWGGGGGGGGWWWWGGGGG
GGGGGGGGWWWWGGGGGGGGGWWWGGGGGG
GGGGGGGGGGGGGGGGGGGGGGWGGGGGGG
GGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
GGGGGGGGGGGGGGGGGGGGGGGGGGGGGG
GGGWWGGGGGGGGGGGGGGGGGGGGGGGGG
GWWWWWGGGGGGGGGGGGGGGGGGGGGGGG
GWWWWWWGGGGGGGGGGGGGGGGGGGGGGG
GWWWWWWWWGGGGGGGGGGGGGGGGGGGGG
GGWWWWWWWWGGGGGGWWWWWGGGGGGGGG
GGGGGWWWWWGGGGWWWWWWWWGGGGGGGG
GGGGGGGGGGGGGGWWWWWWWWGGGGGGGG`
]

setMap(levels[level])
//addSprite(0, 0, select)
//addSprite(1, 1, citycenter)

setBackground(backgroundTile)

//start menu text
addText("Civ Builder", {
  x: 4,
  y: 1,
  color: color `5`
})
addText("The game to build", {
  x: 1,
  y: 3,
  color: color `0`
})
addText("your civilization", {
  x: 2,
  y: 4,
  color: color `0`
})
addText("I to continue", {
  x: 3,
  y: 12,
  color: color `5`
})

//INPUTS
onInput("w", () => {
  if (inMenu) {return}
  if (canMove) {
  getFirst(select).y -= 1}
})
onInput("s", () => {
  if (inMenu) {return}
  if (canMove) {
  getFirst(select).y += 1}
})
onInput("a", () => {
  if (inMenu) {return}
  if (canMove) {
  getFirst(select).x -= 1
  } else if (buildingHuman != null && buildMenuSection == 1) {
    buildMenuSection -= 1
  }
})
onInput("d", () => {
  if (inMenu) {return}
  if (canMove) {
    getFirst(select).x += 1
  } else if (buildingHuman != null && buildMenuSection == 0) {
    buildMenuSection += 1
  }
})


onInput("i", () => {
  if (inMenu) {menuInput(); return}
  
  if (gameEnded || !playersTurn) {return}

  var buyHumanCity = null
  var buySoliderBarrack = null
  var moveHuman = null
  var moveSoldier = null
  var moveHealer = null
  
  var sel = getFirst(select)
  
  var humans = getAll(human)
  for (var i = 0; i < humans.length; i++) {
    var h = humans[i]
    if (h.x == sel.x && h.y == sel.y) {
      moveHuman = h
    }
  }
  
  if (buildingHuman != null) {
    if (buildMenuSection == 0) {
      if (buildBuilding(buildingHuman.x, buildingHuman.y, farm, 1, 1, buildingHuman)) {return}
    } else if (buildMenuSection == 1) {
      if (buildBuilding(buildingHuman.x, buildingHuman.y, barracks, 2, 3, buildingHuman)) {return}
    }
  }
  
  if (movingHuman != null) {
    var raw_moveval = getMoveValue(humansMoved, movingHuman)
    if (coordIn([sel.x, sel.y], movingHumanTiles) && raw_moveval[0][1]) {
      if (getType(notBackSprites(sel.x, sel.y)[0]) == wildfruit) {
        food += Math.floor(Math.random() * 5) + 1
        getSpriteOn(sel.x, sel.y, wildfruit).remove()
      } else if (getType(notBackSprites(sel.x, sel.y)[0]) == wildgold) {
        gold += Math.floor(Math.random() * 5) + 1
        getSpriteOn(sel.x, sel.y, wildgold).remove()
      }
      
      humansMoved[raw_moveval[1]][0] = [sel.x, sel.y]
      humansMoved[raw_moveval[1]][1] = false
      addSprite(sel.x, sel.y, human)
      movingHuman.remove()
      movingHuman = null
      movingHumanTiles = null
      clearOptions()
    }
    return
  }
  
  if (movingHealer != null) {
    var raw_moveval = getMoveValue(healersMoved, movingHealer)
    var coordInOut = coordIn([sel.x, sel.y], movingHealerTiles, true)
    if (coordInOut[0] && raw_moveval[0][1]) {
      if (coordInOut[1]) {
        healersMoved[raw_moveval[1]][1] = false
        var myDamageIndx = getMoveValue(damageSoldiers, getSpriteOn(sel.x, sel.y, soldier))[1]
        damageSoldiers.splice(myDamageIndx, 1)
        getSpriteOn(sel.x, sel.y, damage).remove()
        movingHealer = null
        movingHealerTiles = null
        clearOptions()
        return
      }
      
      healersMoved[raw_moveval[1]][0] = [sel.x, sel.y]
      healersMoved[raw_moveval[1]][1] = false
      addSprite(sel.x, sel.y, healer)
      movingHealer.remove()
      movingHealer = null
      movingHealerTiles = null
      clearOptions()
    }
    return
  }
  
  if (movingSoldier != null) {
    var raw_moveval = getMoveValue(soldiersMoved, movingSoldier)
    var coordInOut = coordIn([sel.x, sel.y], movingSoldierTiles, true)
    if (coordInOut[0] && raw_moveval[0][1]) {
      if (coordInOut[1]) {
        soldiersMoved[raw_moveval[1]][1] = false
        if ((getType(notBackSprites(sel.x, sel.y)[0]) == Ehuman) || (getType(notBackSprites(sel.x, sel.y)[0]) == Ehealer)) {
          var EdyingHuman = notBackSprites(sel.x, sel.y)[0]
          if (getType(notBackSprites(sel.x, sel.y)[0]) == Ehuman) {
            EhumansMoved.splice(getMoveValue(EhumansMoved, EdyingHuman)[1], 1)
          } else if (getType(notBackSprites(sel.x, sel.y)[0]) == Ehealer) {
            EhealersMoved.splice(getMoveValue(EhealersMoved, EdyingHuman)[1], 1)
          }
          EdyingHuman.remove()

          if (spriteIn(movingSoldier.x, movingSoldier.y, damage)) {
            var myDamageValue = getMoveValue(damageSoldiers, movingSoldier)
            var myDamageIndx = myDamageValue[1]
            myDamageValue = myDamageValue[0]
            damageSoldiers[myDamageIndx][0] = [sel.x, sel.y]
            damageSoldiers[myDamageIndx][1].x = sel.x
            damageSoldiers[myDamageIndx][1].y = sel.y
          }
          
          soldiersMoved[raw_moveval[1]][0] = [sel.x, sel.y]
          addSprite(sel.x, sel.y, soldier)
          movingSoldier.remove()
          movingSoldier = null
          movingSoldierTiles = null
          clearOptions()
          return
        } else if (getType(notBackSprites(sel.x, sel.y)[(spriteIn(sel.x, sel.y, damage)) ? 1 : 0]) == Esoldier) {
          if (spriteIn(sel.x, sel.y, damage)) {
            var sprts = getTile(sel.x, sel.y)
            for (var i = 0; i < sprts.length; i++) {
              if (sprts[i].type != select) {
                sprts[i].remove()
              }
            }

            if (spriteIn(movingSoldier.x, movingSoldier.y, damage)) {
              var myDamageValue = getMoveValue(damageSoldiers, movingSoldier)
              var myDamageIndx = myDamageValue[1]
              myDamageValue = myDamageValue[0]
              damageSoldiers[myDamageIndx][0] = [sel.x, sel.y]
              damageSoldiers[myDamageIndx][1].x = sel.x
              damageSoldiers[myDamageIndx][1].y = sel.y
            }
            
            addSprite(sel.x, sel.y, grass)
            soldiersMoved[raw_moveval[1]][0] = [sel.x, sel.y]
            addSprite(sel.x, sel.y, soldier)
            movingSoldier.remove()
            movingSoldier = null
            movingSoldierTiles = null
            clearOptions()
            return
          } else {
            addSprite(sel.x, sel.y, damage)
            EdamageSoldiers.push([[sel.x, sel.y], getSpriteOn(sel.x, sel.y, damage)])
          }
        } else {
          var brokenLastECity = false
            
          if (spriteIn(sel.x, sel.y, cracks)) {
            var sprts = getTile(sel.x, sel.y)
            for (var i = 0; i < sprts.length; i++) {
              if (sprts[i].type != select) {
                sprts[i].remove()
                if (sprts[i].type == Ecitycenter && (getAll(Ecitycenter).length < 1)) {
                  nextTurn()
                }
              }
            }

            if (spriteIn(movingSoldier.x, movingSoldier.y, damage)) {
              var myDamageValue = getMoveValue(damageSoldiers, movingSoldier)
              var myDamageIndx = myDamageValue[1]
              myDamageValue = myDamageValue[0]
              damageSoldiers[myDamageIndx][0] = [sel.x, sel.y]
              damageSoldiers[myDamageIndx][1].x = sel.x
              damageSoldiers[myDamageIndx][1].y = sel.y
            }
            
            addSprite(sel.x, sel.y, grass)
            soldiersMoved[raw_moveval[1]][0] = [sel.x, sel.y]
            addSprite(sel.x, sel.y, soldier)
            movingSoldier.remove()
            movingSoldier = null
            movingSoldierTiles = null
            clearOptions()
            return
          } else {
            addSprite(sel.x, sel.y, cracks)
          }
        }
        movingSoldier = null
        movingSoldierTiles = null
        clearOptions()
        return
      }

      if (spriteIn(movingSoldier.x, movingSoldier.y, damage)) {
        var myDamageValue = getMoveValue(damageSoldiers, movingSoldier)
        var myDamageIndx = myDamageValue[1]
        myDamageValue = myDamageValue[0]
        damageSoldiers[myDamageIndx][0] = [sel.x, sel.y]
        damageSoldiers[myDamageIndx][1].x = sel.x
        damageSoldiers[myDamageIndx][1].y = sel.y
      }
      
      soldiersMoved[raw_moveval[1]][0] = [sel.x, sel.y]
      soldiersMoved[raw_moveval[1]][1] = false
      addSprite(sel.x, sel.y, soldier)
      movingSoldier.remove()
      movingSoldier = null
      movingSoldierTiles = null
      clearOptions()
    }
    return
  }
  
  var objs = getAll(citycenter)
  for (var i = 0; i < objs.length; i++) {
    var obj = objs[i]
    if (obj.x == sel.x && obj.y == sel.y && moveHuman == null) {
      if (food > 0) {
        buyHumanCity = obj
      } else {
        resourceTextDict = [1, 0]
      }
    }
  }

  var healers = getAll(healer)
  for (var i = 0; i < healers.length; i++) {
    var h = healers[i]
    if (h.x == sel.x && h.y == sel.y) {
      moveHealer = h
    }
  }

  var soldiers = getAll(soldier)
  for (var i = 0; i < soldiers.length; i++) {
    var s = soldiers[i]
    if (s.x == sel.x && s.y == sel.y) {
      moveSoldier = s
    }
  }
  
  var objs = getAll(barracks)
  for (var i = 0; i < objs.length; i++) {
    var obj = objs[i]
    if (obj.x == sel.x && obj.y == sel.y && moveHealer == null && moveSoldier == null) {
      if (food > 0 && gold > 0) {
        buySoliderBarrack = obj
      } else {
        resourceTextDict = [1, 1]
      }
    }
  }
  
  if (moveHuman != null) {
    if (buildingHuman == null && getMoveValue(humansMoved, moveHuman)[0][1]) {
      movingHuman = moveHuman
      drawOptions(sel.x, sel.y, humanMovingRange, human)
    }
  } else if (moveHealer != null) {
    if (getMoveValue(healersMoved, moveHealer)[0][1]) {
      movingHealer = moveHealer
      drawOptions(sel.x, sel.y, humanMovingRange, healer)
    }
  } else if (moveSoldier != null) {
    if (getMoveValue(soldiersMoved, moveSoldier)[0][1]) {
      movingSoldier = moveSoldier
      drawOptions(sel.x, sel.y, soldierMovingRange, soldier)
    }
  } else if (buyHumanCity != null) {
    if (getTile(buyHumanCity.x, buyHumanCity.y).length < 4) {
      addSprite(buyHumanCity.x, buyHumanCity.y, human)
      humansMoved.push([[buyHumanCity.x, buyHumanCity.y], true])
      food -= 1
    }
  } else if (buySoliderBarrack != null) {
    addSprite(buySoliderBarrack.x, buySoliderBarrack.y, soldier)
    soldiersMoved.push([[buySoliderBarrack.x, buySoliderBarrack.y], false])
    food -= 1
    gold -= 1
  }
})

onInput("j", () => {
  if (inMenu) {return}
  if (gameEnded || !playersTurn) {return}
  
  if (buildingHuman != null && buildMenuSection == 0) {
    finishBuild()
  } else if (movingHuman != null) {
    movingHuman = null
    movingHumanTiles = null
    clearOptions()
  } else if (movingHealer != null) {
    movingHealer = null
    movingHealerTiles = null
    clearOptions()
  } else if (movingSoldier != null) {
    movingSoldier = null
    movingSoldierTiles = null
    clearOptions()
  }
})

onInput("k", () => {
  if (inMenu) {return}
  if (gameEnded || !playersTurn) {return}

  var buyHealerBarrack = null
  
  if (buildingHuman != null) {
    if (buildMenuSection == 0) {
      if (buildBuilding(buildingHuman.x, buildingHuman.y, citycenter, 3, 3, buildingHuman)) {return}
    }
  }
  
  var buildmenu = null

  var sel = getFirst(select)

  var humans = getAll(human)
  for (var i = 0; i < humans.length; i++) {
    var h = humans[i]
    if (h.x == sel.x && h.y == sel.y && movingHuman == null && getTile(h.x, h.y).length < 4) {
      buildMenuSection = 0
      buildingHuman = h
      showCityLand()
    }
  }

  var objs = getAll(barracks)
  for (var i = 0; i < objs.length; i++) {
    var obj = objs[i]
    if (obj.x == sel.x && obj.y == sel.y && getTile(sel.x, sel.y).length < 4) {
      if (food > 0 && gold > 0) {
        buyHealerBarrack = obj
      } else {
        resourceTextDict = [1, 1]
      }
    }
  }

  if (buyHealerBarrack != null) {
    addSprite(buyHealerBarrack.x, buyHealerBarrack.y, healer)
    healersMoved.push([[buyHealerBarrack.x, buyHealerBarrack.y], true])
    food -= 1
    gold -= 1
  }
})

onInput("l", () => {
  if (inMenu) {return}
  if (!playersTurn) {return} else if (canNextMap) {canNextMap = false; nextMap(); return} else if (gameEnded) {return}
  
  if (buildingHuman != null) {
    if (buildMenuSection == 0) {
      if (buildBuilding(buildingHuman.x, buildingHuman.y, mine, 0, 2, buildingHuman)) {return}
    }
  }

  if (canNextTurn) {
    nextTurn()
  }
})

//AFTER INPUT
afterInput(() => {
  if (inMenu) {return}
  reWriteText()
  checkCanMove()
})
