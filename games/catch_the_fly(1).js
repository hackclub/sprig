/*
@title: catch_the_fly
@author: 
@tags: []
@addedOn: 2025-00-00
*/
const moveEnemyRandomly = () => {
  const enemySprite = getFirst(enemy)
  
  const directions = ["up", "down", "left", "right"]
  const randomDirection = directions[Math.floor(Math.random() * directions.length)]
   
  switch (randomDirection) {
    case "up":
      if (enemySprite.y > 0) enemySprite.y -= 1
      break
    case "down":
      if (enemySprite.y < height() - 1) enemySprite.y += 1
      break
    case "left":
      if (enemySprite.x > 0) enemySprite.x -= 1
      break
    case "right":
      if (enemySprite.x < width() - 1) enemySprite.x += 1
      break
  }  

}

let intervalId = setInterval(() => {  
  moveEnemyRandomly()
}, 150)

const player = "p"
const enemy = "e"
const box = "b"
const hole = "h"

setLegend(
  [ player, bitmap`
................
................
................
................
.......CC.......
......C11C......
......0101......
......1111......
.....L7277L.....
.....L7777L.....
.....L7777L.....
......LLLL......
......L..L......
......L..L......
................
................` ],
  [ enemy, bitmap`
................
................
................
................
................
................
......303.......
......000.......
.....10001......
....1100011.....
....11...11.....
................
................
................
................
................` ],
  [ box, bitmap`
.CCCCCCCCCCCCCC.
CC000000000000CC
C0CCCCCCCCCCCC0C
C0CCCCCCCCCCCC0C
C0CCCCCCCCCCCC0C
C0CCCCCCCCCCCC0C
C0CCCCCCCCCCCC0C
C0C1CCCCCCCCCC0C
C0C1CCCCCCCCCC0C
C0C1CCCCCCCCCC0C
C0C1C1CCCCCCCC0C
C0CCCCCCCCCCCC0C
C0CCCCCCCCCCCC0C
C0CCCCCCCCCCCC0C
CC000000000000CC
.CCCCCCCCCCCCCC.` ],
  [ hole, bitmap`
................
...6666666666...
..611111111166..
.61LLLLLLLLL166.
.61LL000000LL16.
.61L00000000L16.
.61L00000000L16.
.61L00000000L16.
.61L00000000L16.
.61L00000000L16.
.61L00000000L16.
.61LL000000LL16.
.661LLLLLLLL166.
..661111111166..
...6666666666...
................` ]
)

setSolids([player, enemy, box])

let level = 0
const levels = [
  map`
p...h
..b..
.b.b.
.beb.
.....`,
  map`
p.....
..b...
.b....
.beb..
...b.h
..b...`,
  map`
p......
..b....
.bb..b.
..e....
....bh.
....b..
.......`,
  map`
p..b...
...b.h.
...b...
..e.bb.
.......
...b..b
.......`,
  map`
p..bb..
..b..b.
bbb.b..
..e.bh.
....b..
.....b.
.......`
]

setMap(levels[level])

setPushables({
  [ player ]: [box]
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1

})
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {

  const targetNumber = tilesWith(hole).length;  
  const numberCovered = tilesWith(hole, enemy).length;
  
  
  if (numberCovered === targetNumber) {
  
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("YOU WIN!", { y: 4, color: color`3` });
    }
  }
  });