
/* 
@title: turtle_game_reach_the_beach
@author: Daniel Dunavetsky
@tags: ['puzzle']
@addedOn: 2023-10-25
*/

    
const player = "p"
const sand = "b"
const shadow = "S"
const seagull = "g"
const ocean = "o"
const crabx = "c"
const craby = "k"

let movement = 1
let won = true
setLegend(
  [seagull, bitmap`
................
................
........000.....
.......022200...
.......02020600.
.000...022206660
011L0..02220000.
01LLL0.02220....
0LLL22002220....
022222222220....
022222222220....
00222220000.....
..000009........
....9..9........
....9..9........
....9..9........`],
  [player, bitmap`
......0000......
.....04DD40.....
....0DDDDDD0....
....0DDDDDD0....
.....0DDDD0.....
...00FCCCCF00...
..0DDCFCCFCDD0..
.0DDFCCFFCCFDD0.
0DDDCFCFFCFCDDD0
.000CCFFFFCC000.
...0CCFFFFCC0...
...0CFCFFCFC0...
..0DFCCFFCCFD0..
..0DDCFCCFCDD0..
..0DDFCCCCFDD0..
...0D000000D0...
....0......0....`],
  [sand, bitmap`
6666666F66666666
66F666666666666F
6666666666666666
66F6666666666666
666666666F666666
6666666666666666
66666666666666F6
F66666F666666666
6666666666666666
6666666666F6666F
6666666666666666
6666666666666666
66666F6666666666
66666666666666F6
6666666666666666
F6666666666F6666`],
  [ocean, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7727777777777277
7777777777777777
7777777277777777
7772777777772777
7727727777277277
7222722272272227
2222222222222222
2222222222222222
2..221.21...212.
................
................`],
  [crabx, bitmap`
................
................
...00......00...
..030......030..
.0330......0330.
03330......03330
0330........0330
030..000000..030
.0..03333330..0.
..003303303300..
....03333330....
.....000000.....
................
................
................
................`],
  [craby, bitmap`
........000.....
.......03330....
......0.03330...
......0..03330..
.....030..0000..
....03330.......
....03030.......
....03330.......
....03330.......
....03030.......
....03330.......
.....030..0000..
......0..03330..
......0.03330...
.......03330....
........000.....`],
  [shadow, bitmap`
....FFFFFFFF....
...FFFFFFFFFF...
..FFFFFFFFFFFF..
.FFFFFFFFFFFFFF.
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
.FFFFFFFFFFFFFF.
..FFFFFFFFFFFF..
...FFFFFFFFFF...
....FFFFFFFF....`]
  

  )

setBackground(sand)
setSolids([])

let level = 0
const levels = [
  map`.`,
  map`
ooo
S..
..S
.p.`,
  map`
ooooo
.....
S.S.S
.....
S.S..
.....
pS...`,
  map`
ooooooo
....S.S
....S..
..SSS..
..S....
SSSS.SS
.......
.SSSSSS
...p...`,
  map`
oooo
....
c...
....
....
.p..`,
  map`
ooooo
.....
..c..
.....
.S...
....S
.....
S....
.....
....S
..p..`,
  map`
oooooo
..c...
......
k.....
......
.SSSSS
......
.....p`,
  map`
ooooo
.S...
k..SS
..c..
...S.
..c..
S....
..p..`,
  map`
oooooo
..kSSS
S.S...
S.S...
S...S.
ScS.Sp`,
  map`
ooooo
S...k
pS...
..Sc.
.S...
.....
.....`,
  map`
ooooooo
S.S.S.S
..S.S..
k.S.S.k
.S.c.S.
.S...S.
.SSSSS.
...p...`,
  map`
ooo
g..
...
.p.`,
  map`
oooo
....
g.Sk
....
.S..
...p`,
  map`
oooo
g...
.k..
c...
....
..pg`,
  map`
ooooo
g...S
g....
g...S
S..c.
S....
..p..`,
  map`.`

]
setMap(levels[level])

setPushables({
  [ player ]: []
})

//vertical movement
onInput("w", () => {
  getFirst(player).y -= movement
})

onInput("s", () => {
  getFirst(player).y += movement
})

//horizontal movement
onInput("a", () => {
  getFirst(player).x -= movement
})

onInput("d", () => {
  getFirst(player).x += movement
})


if(level == 0)
{
  addText("Press l to Start", {
      x: 2,
      y: 5,
      color: color`2`
      })
  addText("Make it to the sea", {
      x: 1,
      y: 6,
      color: color`2`
      })
addText("Don't get eaten", {
      x: 3,
      y: 7,
      color: color`2`
      })
  addText("by the seagulls", {
      x: 3,
      y: 8,
      color: color`2`
      })
  levelChange()
  {onInput("l", () => {
    setMap(levels[1])
    clearText()})}
    
}
  //resets level
  onInput("i", () => {
    setMap(levels[1])
    clearText()
    level = 1
    movement = 1
    })
if(level == 15)
{
  addText("Congratulations ", {
      x: 3,
      y: 5,
      color: color`2`
      })

  addText("you win ", {
      x: 6,
      y: 6,
      color: color`2`
      })

  addText("press i to restart ", {
      x: 1,
      y: 7,
      color: color`2`
      })
}

afterInput(() => {
  
  if (level >= 5)
  {crabMoveX()}
  
  if (level >= 7)
  {crabMoveY()}

  if (level >= 11)
  {seagullMove()}
  
  //check if player won
  if (tilesWith(ocean, player) != 0)
  {
    movement = 0
    
    levelChange()
  }
  
  
  //check if player lost
  if (tilesWith(shadow, player) != 0)
  {
    lose()
  }
  
//check if player lost
  if (tilesWith(seagull, player) != 0)
  {
    lose()
  }
  
    //check if player lost
  if (tilesWith(crabx, player) != 0)
  {
    lose()
  }
  
  //check if player lost
  if (tilesWith(craby, player) != 0)
  {
    lose()
  }
})

function levelChange(){
  setMap(levels[level++])
  
  movement = 1
}
//moves horizontal crabs
function crabMoveX()
  {
      //getFirst(crabx).x += getRandomNumber()  
    for(let crab of getAll(crabx))
      {
        crab.x += getRandomNumber()  
      }
  }

//moves vertical crabs
function crabMoveY()
  {
     // getFirst(craby).y += getRandomNumber()
    for(let crab of getAll(craby))
      {
        crab.y += getRandomNumber()  
      }
  }

function seagullMove()
  {
  for(let bird of getAll(seagull))
      {
        bird.x += getRandomNumber()  
        bird.y += getRandomNumber()  
      }
  }


function lose()
  {
    movement = 0

    addText("GAME OVER", {
      x: 5,
      y: 5,
      color: color`3`
    })
    addText("press i to restart", {
      x: 2,
      y: 6,
      color: color`3`
    })
  }
  
function getRandomNumber() {
  // Generate a random number between 0 and 2
  var random = Math.floor(Math.random() * 3);

  // Subtract 1 to make it random between -1 and 1
  return random - 1;
}
