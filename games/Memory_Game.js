/*
@title: Memory game
@author: TitanStar73
@tags: []
@addedOn: 2024-08-18
*/
/*
A shown in the instructions:
Try to replecate the shown pattern
Move selector - WASD
Place tile - j
Remove tile - l
Submit guess - i

It will automatically increase/decrease difficulty when you get a puzzle correct or wrong!
Play goes on forever
*/

const player = "p"
const box = "b"
const sizeOfPattern = [3,4,5,6,7]

setLegend(
  [ player, bitmap`
3333333333333333
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3333333333333333` ],
  [ box , bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333` ]
)

setSolids([])

let level = 0
const levels = [
  map`
...
...
...`,
  map`
....
....
....
....`,
  map`
.....
.....
.....
.....
.....`,
  map`
......
......
......
......
......
......`,
  map`
.......
.......
.......
.......
.......
.......
.......`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

let allowInput = false

addText("Welcome!", { 
  x: 1,
  y: 1,
  color: color`3`
})
addText("Match the patterns!", { 
  x: 1,
  y: 3,
  color: color`3`
})
setTimeout(function() {
  clearText()
  addText("WASD to move", { 
    x: 1,
    y: 1,
    color: color`3`
  })
}, 1500);
setTimeout(function() {
  clearText()
  addText("j to add a tile", { 
    x: 1,
    y: 1,
    color: color`3`
  })
  addText("l to remove a tile", { 
    x: 1,
    y: 3,
    color: color`3`
  })
}, 3000);
setTimeout(function() {
  clearText()
  addText("i to submit", { 
    x: 1,
    y: 1,
    color: color`3`
  })
}, 4500);


function getPattern(){
    let array = [];
    for (let i = 0; i < sizeOfPattern[level]; i++) {
        array[i] = [];
        for (let j = 0; j < sizeOfPattern[level]; j++) {
            if (Math.floor(Math.random() * 3) == 0){
              array[i][j] = 1;
            }else{
             array[i][j] = 0;
            }
        }
    }
    return array; 
}

let pattern = [[0,0,0],[0,1,0],[0,0,0]]

function showPattern(for_seconds){
    for (let i = 0; i < sizeOfPattern[level]; i++) {
          for (let j = 0; j < sizeOfPattern[level]; j++) {
              clearTile(i,j)
          }
      }

  
  for (let i = 0; i < sizeOfPattern[level]; i++) {
          for (let j = 0; j < sizeOfPattern[level]; j++) {
              if (pattern[i][j] == 1){
                addSprite(i,j, box)
              }
          }
  }
  
  setTimeout(function() {
    for (let i = 0; i < sizeOfPattern[level]; i++) {
          for (let j = 0; j < sizeOfPattern[level]; j++) {
              clearTile(i,j)
          }
      }
  }, for_seconds*1000)

  setTimeout(function() {
      addSprite(0,0,player)
    allowInput = true
  }, (for_seconds*1000) + 100)
}

function hasIn (array, item){
  for (let i = 0; i < array.length; i ++){
    if (array[i]["type"] == item){
      return true
    }
  }
  return false
}

function checkPattern(){
    for (let i = 0; i < sizeOfPattern[level]; i++) {
          for (let j = 0; j < sizeOfPattern[level]; j++) {
              if (pattern[i][j] == 0 && hasIn(getTile(i,j), box)){
                return false
              }
              if (pattern[i][j] == 1 && !hasIn(getTile(i,j), box)){
                return false
              }
          }
    }
  return true
}

setTimeout(function() {
  clearText()
  showPattern(3)
}, 6000);

onInput("s", () => {
  if (allowInput){
    getFirst(player).y += 1
  }
})
onInput("w", () => {
  if (allowInput){
    getFirst(player).y -= 1
  }
})
onInput("a", () => {
  if (allowInput){
    getFirst(player).x -= 1
  }
})
onInput("d", () => {
  if (allowInput){
    getFirst(player).x += 1
  }
})
onInput("j", () => {
  if (allowInput){
    addSprite(getFirst(player).x, getFirst(player).y, box)
  }
})
onInput("l", () => {
  if (allowInput){
    let myX = getFirst(player).x
    let myY = getFirst(player).y
    clearTile(myX, myY)
    addSprite(myX, myY, player)
  }
})
onInput("i", () => {
  if (allowInput){
    let isCorrect = checkPattern()
    if (isCorrect){
        addText("Correct", { 
          x: 1,
          y: 1,
          color: color`5`
        })
    }else{
      addText("Wrong" , { 
          x: 1,
          y: 1,
          color: color`5`
        })
      showPattern(1)
    }
    allowInput = false
    setTimeout(function() {
      if (level != 0 && !isCorrect){
        level -=1
      }
      if (level != 4 && isCorrect){
        level += 1
      }
      clearText()
      setMap(levels[level])
      addText("Next Puzzle!" , { 
          x: 1,
          y: 1,
          color: color`5`

      })
      pattern = getPattern()
    }, 2000);
    setTimeout(function() {
      clearText()
      showPattern(3)
    }, 4000);    
  }
})



afterInput(() => {
  
})
