/*
@title: Femto
@author: Siddharthan pradeep
@tags: ['platformer']
@addedOn: 2024-01-01
*/

const player = "p"
const ground = "g"
const brick = "b"
const stone = "z"
const coin = "c"
const collectedCoin = "x"
const diamond = "d"
const goomba = "e"
const hen = "h"
const pipe = "t"
const sky = "s"
const sky1 = "1"
const sky2 = "2"
const lava = "3"

setLegend(
  [ player, bitmap`
7777777700007777
7777777703330777
7777777770033077
7777777701222107
7007777702202207
0110077702202330
0122100012222207
0122221122222207
7011222122222210
0111001122222220
0111022222222220
7011100002222210
7701111122221107
7770010111110077
777770C000007777
777770C660607777` ],
  [ ground, bitmap`
CCCCCCCCCCCCCCCC
C6DC4C44CDCCDCDC
D4CCDCCCDCCDCDCD
4D4D6D4DD4DCD444
DD4DDCD4CD4DC6CD
C4C4CDDC4D4CDDC4
DCD46C4DC4D4DC4C
4C4DCDDC4CD44D6D
C4D4D4C4444D44D4
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ],
  [ brick, bitmap`
CCCCCCCCCCCCCCCC
C66666C00C66666C
C6CFC6C00C6CFC6C
C6FCF6C00C6FCF6C
C6CFC6CCCC6CFC6C
C66666666666666C
CCCCC6FCCF6CCCCC
C000C6C00C6C000C
C000C6C00C6C000C
CCCCC6FCCF6CCCCC
C66666666666666C
C6CFC6CCCC6CFC6C
C6FCF6C00C6FCF6C
C6CFC6C00C6CFC6C
C66666C00C66666C
CCCCCCCCCCCCCCCC` ],
  [ stone, bitmap`
CCC3CCC3CCC3CCC3
CCC3CCC3CCC3CCC3
3333333333333333
C3CCC3CCC3CCC3CC
C3CCC3CCC3CCC3CC
3333333333333333
3CCC3CCC3CCC3CCC
3CCC3CCC3CCC3CCC
3333333333333333
CC3CCC3CCC3CCC3C
CC3CCC3CCC3CCC3C
3333333333333333
C3CCC3CCC3CCC3CC
C3CCC3CCC3CCC3CC
3333333333333333
CCC3CCC3CCC3CCC3` ],
  [ coin, bitmap`
7777777777777777
7777777777777777
7777766666777777
7777666666677777
77766FFFFF667777
77766F6666667777
77766F6FFF667777
77766F6F6F667777
77766F6FFF667777
77766F6666667777
77766FFFFF667777
7777666666677777
7777766666777777
7777777777777777
7777777777777777
7777777777777777` ],
  [ diamond, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777700000077777
7777022222207777
7770222227220777
7702222272722077
7702222227222077
7770222222220777
7777022222207777
7777702222077777
7777770220777777
7777777007777777
7777777777777777
7777777777777777
7777777777777777` ],
  [ collectedCoin, bitmap`
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
7777777777777777` ],
  [ sky1, bitmap`
7777777777777777
7777777777777777
7777777722277777
7777772222227777
7777722222222777
7777222222227777
7777722222277777
7777772222777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ],
  [ sky2, bitmap`
7777777777777777
7777777777777777
7777772222277777
7777222222227777
7772222222222777
7722222222222277
7222222222222277
7722222222222277
7772222222222777
7777222222227777
7777772222277777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ],
  [ lava, bitmap`
7777777767773777
7777077077377707
7707737776777673
7779769777377977
7677307737773707
7779777333777777
7777773393377777
7777733999377777
7777339969337777
7777399669937777
7773399666933777
7733996666993777
7739966666693777
3339966666693333
3399666666693333
3339966669999333` ],
  [ goomba, bitmap`
7777777777777777
7777700000007777
77770C3396440777
7770C3399647H077
7770C3996647H077
770C30296027H807
770C30096007H807
770C39996647H807
770C339966447807
7770C33009447077
770CCC3399447077
70C0003399647807
7007033396477807
777033396647H077
700333996447HH07
0000000000000000` ],
  [ hen, bitmap`
7777777700007777
7777777703330777
7777777770033077
7777777766999607
7007777709909907
0660077709909660
0699600069999907
0699996699999907
7066999699999990
0666006699999990
0666099999999990
7066600009999960
7706666699996667
7770060666660077
777770C000007777
777770C660607777` ],
  [ pipe, bitmap`
6333636666633333
6633636333333333
6363636666633333
6336636333333333
6333636666633333
3333333333333333
6333636666633333
3636333363333333
3363333363333333
3636333363333333
6333633363333333
3333333333363333
3333333333366333
6666666666666633
3333333333366333
3333333333363333` ],
  [ sky, bitmap`
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
7777777777777777` ]
)

setSolids([ground, brick, pipe])

let level = 0
const levels = [
   map`
ssssssssss2sss
2sss1sssssssss
sssssssssss1ss
ssssssssssssss
ssssssssssssss
ssscccssssssss
psssssssssesdt
gggggggggggggg`,
   map`
sss1ssssss1ssx
sscccssss2sssx
psssscsssss1sx
bcbbsscssssssx
ssssssscsssssx
ssssssssssssxe
eeeebbssssesdt
gggggggggggggg`,
   map`
sss1ssssss1sss
2s1s2ssss2ssss
ssscsssssss1ss
sscscsssssssss
scsbscssssssss
csbbbscsssssse
pbbbbbesssssdt
gggggggggggggg`,
   map`
psssss1sssss2s
sssessses1sess
ssbbs1bbssbbss
ssssssssssssss
sssssssssccsse
sccssssbsssedt
ebbesssbgggggg
gggggggggggggg`,
   map`
sss1ssssss1sss
2sss1sssssssss
sssssssssss1ss
ssssssssssssss
ssssssssssssss
sbcbcbcbcbcbds
pbebebebebebst
gggggggggggggg`,
   map`
x1sssss1ssssss
pxsssessssssss
xsssebsssssss1
cbbbbbssssssss
xsssssssssssss
xsssssccccccse
exssbsssesssdt
gggggggggggggg`,
   map`
pcssssssssscsb
bscssssssscsbb
bbscssssscsbbb
bbbscssscsbbbb
bbbbscscsbbbbb
bbbbbsssbbbbbb
bbbbbdtdbbbbbb
gggggggggggggg`,
   map`
2ss2sssss1ssss
s2ssss1ssss2ss
ssccccccssssss
scsssssscsssss
ssbssbssbbssss
pbbssssssbbsse
bbbeeeeeebbsdt
gggggggggggggg`,
   map`
2ssssssssss2sx
sssss1ssssssss
ssssesssss1sss
pssebscsssssss
bccbbcssssssdt
ssssssbsccccsb
esssbbbessssbb
gggggggggggggg`,
   map`
2ssss1ssss1sss
ss2sssss1ssss1
ssscsscccsssss
sscssssessssss
scsbbsbbbcbsss
ssbbbsssssssse
pbbbbebessssdt
gggggggggggggg`,
   map`
2sssssssssssdt
sssss1sssssscs
ssssssssssssbe
psssssssssscsb
bbcccbbssssbse
sssssbbbsscsbb
eeeeebbbbbbsse
gggggggggggggg`,
   map`
2ssssssss1sssss2ss
bs1bbsbsbsbbsbssbb
bssbssb2bsbs1bsssb
bssbbsbsbsbbsbssbb
bssbssbsbsbssbssbs
bbsbbssbssbbsbbsbb
ssssssssssssssssss
ssssssssssssssssss
psccccccccccccccst
gggggggggggggggggg`,
   map`
ss1ssss1sss2sx
ssssssssssssss
ssss1sssssssss
ssssssssssssss
psssssssssssss
zzcczzccccccss
zz33zzsssessdt
zzzzzzzzzzzzzz`,
   map`
ss1ssss1sss2sx
ssssssssssssdt
ssssz33zsssssz
psszzzzz3sszzz
zzscccccsszz3z
zzssesssszzzzz
z3zzzzzzzzzzzz
zzzzzzzzzzzzzz`,
   map`
pcczs1ssssss1x
zzczssssssssss
scczsssss2ssss
szzzssssssssdt
sssssssssssssz
sssssscccssszz
3333zsesseszzz
gggggggggggggg`,
   map`
pcccszzzzzzzzz
zsszszsccsssss
z33zszscb3s3s3
zzzzszccbzszsz
ssssszcbbsssss
sssssccbbzzdzz
esssebbbbsssst
gggggggggggggg`,
   map`
pxzzzzzzzzzzzz
zccszzzzzzzzzz
z3zccxzzzzzzzz
zzz3zccxzzzzzz
zzzzz3zccxzzzz
zzzzzzz3zccxzz
zzzzzzzzz3zsdt
zzzzzzzzzzzzzz`,
   map`
sc1ssss1sss2s1
szccssss2sssss
ss33ccsssss1ss
pszzssssssssss
zcccccccssssss
zssssszzcsssdt
zexxxezzz33ssz
zzzzzzzzzzzzzz`,
   map`
ss1xssss2ssssx
sssxxxxsxxx1xs
esssxsssssssss
zzssesssssssbs
pzzzzssssszxes
sssszsssz3zbbs
ssssssz3zzzbds
3333zzzzzzzbst`,
   map`
sssssssssssssx
ssssssssssssss
ssssssssssssss
psssssssssssdt
zssssszzsssssz
zssssssssssssz
zeeeeeeeeeeeez
zzzzzzzzzzzzzz`,
   map`
scccccccccccccccccs
szzzzzxzxxxzxzzzzzs
sxxzxxxzxxezxzdssss
ssszxxxzzzzzszzzzzs
ssszssszssszszdssss
sxszssszssszszzzzzs
scccccccccccccccccs
szzzzzszssszszzzzss
szdsssszzsszszssszs
szzzzzszszszszssszs
szdsssszsszzszpdtzs
szzzzzszssszszzzzss
scccccccccccccccccs`,
  
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

// Game variables
let coins = 0
let diamonds = 0
let jumpPower = 0
let isJumping = false
let gravity = 299 // milliseconds between gravity pulls
let lastGravity = Date.now()

// Enemy directions (1 = right, -1 = left)
let enemyDirections = new Map()

// Display coins
function updatecoins() {
  clearText()
  addText("coin:" + coins, { x: 11, y: 1, color: color`2` })
  addText("pearl:" + diamonds, { x: 1, y: 1, color: color`2` })
}

updatecoins()

function updatediamonds() {
  clearText()
  addText("coin:" + coins, { x: 11, y: 1, color: color`2` })
  addText("pearl:" + diamonds, { x: 1, y: 1, color: color`2` })
}

updatediamonds()

function playSound(frequency, duration) {
  // This is very basic and may not work in all Sprig environments
  console.beep && console.beep(frequency, duration)
}

// Player controls with collision detection
onInput("a", () => {
  const p = getFirst(player)
  if (p && p.x > 0) {
    // Check for solid objects to the left
    const leftTile = getTile(p.x - 1, p.y)
    const hasSolid = leftTile.some(sprite => 
      sprite.type === ground || sprite.type === brick || sprite.type === stone
    )
    if (!hasSolid) {
      p.x -= 1
    }
  }
})

onInput("d", () => {
  const p = getFirst(player)
  if (p && p.x < width() - 1) {
    // Check for solid objects to the right
    const rightTile = getTile(p.x + 1, p.y)
    const hasSolid = rightTile.some(sprite => 
      sprite.type === ground || sprite.type === brick || sprite.type === stone
    )
    if (!hasSolid) {
      p.x += 1
    }
  }
})

onInput("w", () => {
  const p = getFirst(player)
  if (p && !isJumping) {
    // Check for solid objects above before jumping
    if (p.y > 0) {
      const aboveTile = getTile(p.x, p.y - 1)
      const hasSolid = aboveTile.some(sprite => 
        sprite.type === ground || sprite.type === brick || sprite.type === pipe || sprite.type === stone
      )
      if (!hasSolid) {
        jumpPower = 3
        isJumping = true
      }
    }
  }
})

// Game loop for physics
setInterval(() => {
  const p = getFirst(player)
  if (!p) return
  

  // Handle jumping
if (isJumping && jumpPower > 0) {
  // Try to move up - check for collision first
  if (p.y > 0) {
    const aboveTile = getTile(p.x, p.y - 1)
    const hasSolid = aboveTile.some(sprite => 
      sprite.type === ground || sprite.type === brick || sprite.type === stone
    )
    if (!hasSolid) {
      p.y -= 1
      jumpPower -= 1
    } else {
      // Hit something above, stop jumping
      jumpPower = 0
    }
  } else {
    jumpPower = 0
  }
  
  if (jumpPower <= 0) {
    jumpPower = 0
  }
}
  
  // Handle gravity
  if (Date.now() - lastGravity > gravity) {
    const canFall = p.y < height() - 1
    const groundBelow = getTile(p.x, p.y + 1).some(sprite => 
      sprite.type === ground || sprite.type === brick || sprite.type === pipe || sprite.type === stone
    )
    
    if (canFall && !groundBelow) {
      p.y += 1
      lastGravity = Date.now()
    } else {
      isJumping = false
      jumpPower = 0
    }
  }

const coinsHere = getTile(p.x, p.y).filter(sprite => sprite.type === coin)
  coinsHere.forEach(coinSprite => {
    // Change coin to light blue instead of removing it
    coinSprite.type = collectedCoin
    coins += 20
    playSound(800, 200)
    updatecoins()
  })

const diamondsHere = getTile(p.x, p.y).filter(sprite => sprite.type === diamond)
  diamondsHere.forEach(diamondSprite => {
    // Change diamonds to light blue instead of removing it
    diamondSprite.type = collectedCoin
    diamonds += 1
    playSound(400, 200)
    updatediamonds()
  })  
  
  // Check for enemies
  const enemiesHere = getTile(p.x, p.y).filter(sprite => sprite.type === goomba)
  if (enemiesHere.length > 0) {
    // Simple enemy collision - restart level
    //addText("OUT", { x: 1, y: 7, color: color`3` })
    setMap(levels[level])
    coins = Math.max(0, coins - 10)
    updatecoins()
  }
  const lavaHere = getTile(p.x, p.y).filter(sprite => sprite.type === lava)
  if (lavaHere.length > 0) {
    // Simple enemy collision - restart level
    //addText("OUT", { x: 1, y: 7, color: color`3` })
    setMap(levels[level])
    coins = Math.max(0, coins - 30)
    updatecoins()
  }
  
  // Check for pipes (level completion)
  // const pipesHere = getTile(p.x, p.y).filter(sprite => sprite.type === pipe)
  // if (pipesHere.length > 0) {
  //   level = (level + 1) % levels.length
  //   setMap(levels[level])
  //   coins += 500
  //   updatecoins()
  // }
  const pipesHere = getTile(p.x, p.y).filter(sprite => sprite.type === pipe)
     if (pipesHere.length > 0) {
       level = (level + 1) % levels.length
        setMap(levels[level])
  
  // Reset player to starting position (find 'p' in the new level)
  const newPlayer = getFirst(player)
  if (newPlayer) {
    // Player is already placed by setMap at the correct starting position
    // No need to move them
  }
  // Reset game state
  isJumping = false
  jumpPower = 0
  enemyDirections.clear() // Clear enemy directions for new level
}
  
  // Prevent going off screen
  if (p.x < 0) p.x = 0
  if (p.x >= width()) p.x = width() - 1
  
  // Death by falling
  if (p.y >= height() - 1) {
    const groundHere = getTile(p.x, p.y).some(sprite => sprite.type === ground)
    if (!groundHere) {
      setMap(levels[level])
      coins = Math.max(0, coins - 100)
      updatecoins()
    }
  }
  
}, 100)



  // Simple enemy AI
setInterval(() => {
  getAll(goomba).forEach(enemy => {
    // Initialize direction if not set
    if (!enemyDirections.has(enemy)) {
      enemyDirections.set(enemy, 1) // Start moving right
    }
    
    let direction = enemyDirections.get(enemy)
    const newX = enemy.x + direction
    
    // Check if hitting edge or obstacle
    let shouldChangeDirection = false
    
    // Check screen boundaries
    if (newX < 0 || newX >= width()) {
      shouldChangeDirection = true
    }
    
    // Check for obstacles (walls)
    if (newX >= 0 && newX < width()) {
      const obstacleAhead = getTile(newX, enemy.y).some(sprite => 
        sprite.type === brick || sprite.type === pipe || sprite.type === stone
      )
      if (obstacleAhead) {
        shouldChangeDirection = true
      }
      
      // Check if there's no ground ahead (would fall off platform)
      if (enemy.y < height() - 1) {
        const groundBelow = getTile(newX, enemy.y + 1).some(sprite => 
          sprite.type === ground || sprite.type === brick || sprite.type === stone
        )
        if (!groundBelow) {
          shouldChangeDirection = true
        }
      }
    }
    
    // Change direction if needed
    if (shouldChangeDirection) {
      direction = -direction
      enemyDirections.set(enemy, direction)
    } else {
      // Store old position
      const oldX = enemy.x
      const oldY = enemy.y
      
      // Move enemy to new position
      enemy.x = newX
      
      // Clear old position by adding sky sprite if no other sprites are there
      const oldTile = getTile(oldX, oldY)
      const hasOtherSprites = oldTile.some(sprite => 
        sprite.type !== goomba && sprite.type !== sky
      )
      if (!hasOtherSprites) {
        addSprite(oldX, oldY, sky)
      }
    }
  })
}, 300)

 // // Instructions
 // addText("WASD to move", { x: 1, y: 14, color: color`2` })
 // addText("Get coins, avoid enemies!", { x: 1, y: 15, color: color`5` })
