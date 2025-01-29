/*
@title: trap_it
@author: PRairigh
@tags: ['strategy']
@addedOn: 2024-07-31
*/

// Create a tune:
const melody = tune`
109.0909090909091: C4-109.0909090909091,
109.0909090909091: E4^109.0909090909091 + F4^109.0909090909091 + G4^109.0909090909091 + C4-109.0909090909091,
109.0909090909091: E4^109.0909090909091 + G4^109.0909090909091 + A4^109.0909090909091 + B4^109.0909090909091 + C5^109.0909090909091,
109.0909090909091: F4~109.0909090909091 + G4~109.0909090909091 + A4~109.0909090909091 + D4^109.0909090909091 + E4^109.0909090909091,
109.0909090909091: G5~109.0909090909091 + F5~109.0909090909091 + E5~109.0909090909091 + D5~109.0909090909091 + C5~109.0909090909091,
109.0909090909091: A4~109.0909090909091 + F4~109.0909090909091 + D4^109.0909090909091 + C4-109.0909090909091,
109.0909090909091: A4~109.0909090909091 + G4~109.0909090909091 + E4~109.0909090909091 + D4^109.0909090909091 + C4-109.0909090909091,
109.0909090909091: C5~109.0909090909091 + A4~109.0909090909091 + B4~109.0909090909091 + D5~109.0909090909091 + G4~109.0909090909091,
109.0909090909091: C5~109.0909090909091 + A4~109.0909090909091 + E4^109.0909090909091 + C4-109.0909090909091,
109.0909090909091: G4~109.0909090909091 + A4~109.0909090909091 + B4~109.0909090909091 + E5~109.0909090909091 + D5~109.0909090909091,
109.0909090909091: G4~109.0909090909091 + C4~109.0909090909091 + F5~109.0909090909091 + E5~109.0909090909091 + D5~109.0909090909091,
109.0909090909091: G4~109.0909090909091 + D5~109.0909090909091 + B4~109.0909090909091 + F4^109.0909090909091 + C4-109.0909090909091,
109.0909090909091: B4~109.0909090909091 + E4~109.0909090909091 + F4~109.0909090909091 + G4~109.0909090909091 + D5~109.0909090909091,
109.0909090909091: C5~109.0909090909091 + B4~109.0909090909091 + D4~109.0909090909091 + E4~109.0909090909091 + G5~109.0909090909091,
109.0909090909091: A4~109.0909090909091 + B4~109.0909090909091 + E5~109.0909090909091 + C4~109.0909090909091 + E4~109.0909090909091,
109.0909090909091: G4~109.0909090909091 + F4~109.0909090909091 + B4~109.0909090909091 + E5~109.0909090909091 + C4~109.0909090909091,
109.0909090909091: F4~109.0909090909091 + C5~109.0909090909091 + E5~109.0909090909091 + C4~109.0909090909091 + D4~109.0909090909091,
109.0909090909091: F4~109.0909090909091 + C5~109.0909090909091 + E5~109.0909090909091 + C4~109.0909090909091 + D4~109.0909090909091,
109.0909090909091: F4~109.0909090909091 + G4~109.0909090909091 + E5~109.0909090909091 + D5~109.0909090909091 + C4~109.0909090909091,
109.0909090909091: G4~109.0909090909091 + A4~109.0909090909091 + B4~109.0909090909091 + C5~109.0909090909091 + D5~109.0909090909091,
109.0909090909091: D5~109.0909090909091 + D4~109.0909090909091 + A5~109.0909090909091 + G5~109.0909090909091 + F5~109.0909090909091,
109.0909090909091: C5~109.0909090909091 + F4~109.0909090909091 + E4~109.0909090909091 + F5^109.0909090909091 + C4-109.0909090909091,
109.0909090909091: C5~109.0909090909091 + B4~109.0909090909091 + A4~109.0909090909091 + G4~109.0909090909091 + G5~109.0909090909091,
109.0909090909091: B4~109.0909090909091 + C5~109.0909090909091 + D5~109.0909090909091 + E5~109.0909090909091 + F5~109.0909090909091,
109.0909090909091: D5~109.0909090909091 + A5~109.0909090909091 + G5~109.0909090909091 + F5~109.0909090909091 + E4~109.0909090909091,
109.0909090909091: F5~109.0909090909091 + E5~109.0909090909091 + D5~109.0909090909091 + C5~109.0909090909091 + E4~109.0909090909091,
109.0909090909091: C5~109.0909090909091 + B4~109.0909090909091 + F4~109.0909090909091 + D4^109.0909090909091 + G4^109.0909090909091,
109.0909090909091: B4~109.0909090909091 + G4^109.0909090909091 + D4^109.0909090909091 + F4^109.0909090909091 + D5^109.0909090909091,
109.0909090909091: B4~109.0909090909091 + A4~109.0909090909091 + D4^109.0909090909091 + G4^109.0909090909091 + D5^109.0909090909091,
109.0909090909091: E5^109.0909090909091 + C4-109.0909090909091,
109.0909090909091: C4-109.0909090909091,
109.0909090909091: C4-109.0909090909091`

// Play it:
playTune(melody)
const playback = playTune(melody, Infinity)

let monster_health = new Array(1)
monster_health[0]=60

const player = "p"
const wall = "j"
 const enemy = "e"

addText( "Use 'wasd' to move.\nThe goal is to trap\nthe robot with\nwalls \n(using 'jkli'). \ngo down to look at \nrobot health ", {
        x:1,
        y:4,        
        size: 1
})

setLegend(
  [ player, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0..............0
0000000000000000` ],
  [ wall, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ], 
[ enemy, bitmap`
LLLLLL0LLLLLLLLL
LLLLLLL0LLLLLLLL
LLLLLLLL0LLLLLLL
LL333LLLL0000LLL
LL333LLLL0000LLL
LL333LLLL0000LLL
LLLLLLLLLLLLL0LL
LLLLLLLLLLLLLL0L
LL5555555555LLL0
LL5555555555LLLL
LL5555555555LLLL
LL5555555555LLLL
LL5555555555LLLL
LL5555555555LLLL
LL5555555555LLLL
LLLLLLLLLLLLLLLL` ], 
)

setSolids([wall,player,enemy])

let level = 1
const levels = [
  map`
j.................................
..................................
..................................
p.................................
..................................
......................e...........
..................................
..................................
..................................
..................................
..................................
..................................
..................................
..................................
..................................
..................................`,
]

setMap(levels[0])

setPushables({
  [ player ]: []
})

// Function to generate random x and y within a specified range
function generateRandomCoordinates(minX, maxX, minY, maxY) {
  const randomX = Math.floor(Math.random() * (maxX - minX + 1) + minX);
  const randomY = Math.floor(Math.random() * (maxY - minY + 1) + minY);
  return { x: randomX, y: randomY };
}

// Usage example
function makeLevel() {
  //Remove all old robots
  getAll(enemy).forEach((enemySprite) => {
    enemySprite.remove();
         });
  getAll(wall).forEach((wallSprite) => {
    wallSprite.remove();
         });

  monster_health[idx] = new Array(length)

  // Add new robots
  const minX = 0; // Minimum x value
  const maxX = 33; // Maximum x value
  const minY = 0; // Minimum y value
  const maxY = 13; // Maximum y value
  for (i=0; i <level; i+= 1) {
    const randomCoordinates = generateRandomCoordinates(minX, maxX, minY, maxY);
    addSprite(randomCoordinates.x, randomCoordinates.y, enemy);
    monster_health[i] = 60
  }
  const randomCoordinates = generateRandomCoordinates(minX, maxX, minY, maxY);
  addSprite(randomCoordinates.x, randomCoordinates.y, wall);
}

onInput("s", () => {
  getFirst(player).y += 2
  moveMonsters()
})

onInput("w", () => {
  getFirst(player).y += -2
  moveMonsters()
  clearText()
})

onInput("d", () => {
  getFirst(player).x += 2
  moveMonsters()
  clearText()
})

onInput("a", () => {
  getFirst(player).x += -2
  moveMonsters()
  clearText()
})

//afterInput(postInput)

onInput("l", () => {
  moveMonsters()
  const wallSprite = getFirst(wall)
  const curPlayer = getFirst(player)
  if (wallSprite) {
    addSprite(curPlayer.x+1, curPlayer.y+0, wall)
  }
  clearText()
})

onInput("i", () => {
  moveMonsters()
  const wallSprite = getFirst(wall)
  const curPlayer = getFirst(player)
  if (wallSprite) {
    addSprite(curPlayer.x+0, curPlayer.y+-1, wall)
  }
  clearText()
})

onInput("k", () => {
  moveMonsters()
  const wallSprite = getFirst(wall)
  const curPlayer = getFirst(player)
  if (wallSprite) {
    addSprite(curPlayer.x+0, curPlayer.y+1, wall)
  }
  clearText()
})

let random_move_2 = 0
function moveMonsters() {
  let monster_expected_x = 0
  let monster_expected_y = 0
  firstPlayer = getFirst(player)
  monsterList = getAll(enemy)
  random_move_2 += 1
  dead_monsters = 0
  for (idx=0; idx < monsterList.length; idx += 1) {

    monster_expected_x = monsterList[idx].x
    monster_expected_y = monsterList[idx].y

    deltaX = firstPlayer.x - monsterList[idx].x
    deltaY = firstPlayer.y - monsterList[idx].y
    if (random_move_2 == 3) {
      deltaX = Math.ceil(Math.random() * 10 -5);
      deltaY = Math.ceil(Math.random() * 10 -5);
      random_move_2 = 0
    }
    monsterList[idx].x += Math.sign(deltaX)
    monsterList[idx].y += Math.sign(deltaY)
   
    if (monster_expected_x == monsterList[idx].x && monster_expected_y == monsterList[idx].y) {
      monster_health[idx] = Math.max(0, monster_health[idx]-1);
    } else {
      monster_health[idx] = Math.min(monster_health[idx]+1, 60)
    }
    if (monster_health[idx] < 1) {
      dead_monsters += 1
    }
  }
  if (dead_monsters == monsterList.length) { 
    addText( "YOU WIN this level", {
        x:1,
        y:4,        
    })
    level += 1;
    makeLevel();
  } else {
  }

  addText( monster_health.join(", "), {
        x:0,
        y:0,        
  })
}


    

onInput("j", () => {
  moveMonsters()
  const wallSprite = getFirst(wall)
  const curPlayer = getFirst(player)
  if (wallSprite) {
    addSprite(curPlayer.x+-1, curPlayer.y+0, wall)
  }
  clearText()
})
