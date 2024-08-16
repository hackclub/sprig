/*
@title: PuppyCafe
@author: Lenochodik
@tags: ['classic', 'tapper', 'endless']
@addedOn: 2024-08-15
*/

// = Helper functions ==============================
// From: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled) // The maximum is exclusive and the minimum is inclusive
}

function getRandomItem(arr) {
  return arr[getRandomInt(0, arr.length)]
}
// =================================================

// = Types =========================================
const player = "0"
const playerGameOver = "P"
const cup = "1"
const cupEmpty = "6"
const cupBroken = "-"
const bench = "2"
const robotMachine = "3"
const floor = "4"
const floorEnd = "*"
const floorEnd2 = "a"
const benchMiddle = "5"
const floorKitchen = "k"
const deskUnderRobot = "u"

const customer1 = "7"
const customer2 = "8"
const customer3 = "9"
const customer4 = "+"

// =================================================

// = Legend ========================================
setLegend(
  // Customers
  [customer1, bitmap`
  ...0L0.....0L0..
  ..0L1L0...0L1L0.
  ..0L81L000L18L0.
  ..0L8LLLLLLL8L0.
  ..0LLLLLLLLLLL0.
  ...0L0LLLLL0L0..
  .0.0LL20002LL0..
  0L00L2200022L0..
  0LL0002202200...
  .010LL00200LL0..
  .011LLLLLLLLL0..
  .01LLLLLLLLLL0..
  .01LLL11111LLL0.
  .0LLLL11111LLL0.
  .02LL1211121LL20
  022LL2211122LL22`],
  [customer2, bitmap`
  ...00....00.....
  ..0CC0000CC0....
  .0C2CCCCCC2C0...
  .0CC22CC22CC0...
  .0C20222202C0...
  .0C22200222C000.
  .0C20222202C0CC0
  0.0C200002C0C00C
  C00CCCCCCC60C0CC
  CCCCC222266C0C0C
  0CCC222266CC0.0C
  .0CC2222CCCC00C0
  .0CC222266CC0C0.
  .0CC2222266CC0..
  .00CC2222C600...
  0CCCCCCCCCCCC0..`],
  [customer3, bitmap`
  ................
  ...0......0.....
  ..020....020....
  .02820..02820...
  .098890098890...
  .098999999890...
  .099099990990...
  ..099900999000..
  ..0902002092290.
  ..09202202902990
  ...09999990.0090
  ..09922229900990
  .09922222299990.
  00999222999900..
  209929292999020.
  229229992292220.`],
  [customer4, bitmap`
  ................
  .00000000000....
  0CCC66666CCC0...
  0CC6666666CC0...
  .06666666660....
  .06066666060....
  .0666C0C6660....
  .06660C06660....
  ..066666660.....
  ..0FFFFFFF0..0..
  .066666666600C0.
  .06666666660C0C0
  06666666666600C0
  066666666666CCC0
  6C66C666C66C6C0.
  CC6CC666CC6CC00.`],
  // Player
  [player, bitmap`
  ................
  .....1111111....
  ....1CCCCCCC1...
  ...1CCCCCCCCC1..
  ..1CC0CCCCC0CC1.
  .1CCCCC000CCCCC1
  .1CCCC20002CCCC1
  .1CCCC22022CCCC1
  1C1CC1002001CC1.
  12211FCCCCCF11..
  .122CFCCCCCFC1..
  .12CCFFFFFFFCC1.
  .12CCFFFDFFFCC1.
  .1CCFFF999FFFCC1
  .12CF2F999F2FCC1
  122C22FFFFF22CC1`],
  [playerGameOver, bitmap`
.....111.....111
....1CCC1..11CCC
...1CCCCC11CCCCC
..1CCCCCC1CCCFF2
.1CC0CCC1FFFFF22
.1CCCC220CCFFFFF
.1CCC0020CCFF99F
.1CCC0002CCFD99F
.1CCC0020CCFF99F
.1CCCC220CCFFFFF
.1CC0CCC1FFFFF22
..1CCCCCC1CCCFF2
...1CCCCC12CCCCC
....1CCC12222C22
.....111C2111112
........11.....1`],
  // Cups
  [cup, bitmap`
  .......11..1D1..
  ......1C21.1D1..
  .....122C21D1...
  ....12C2222D1...
  ...1C222C2C21...
  ..1222C2222221..
  ..1L2222222CL1..
  ...1LCCCCDCL1...
  ...1LC99D9CL1...
  ...1L999D99L1...
  ...1L99D999L1...
  ...1L99D999L1...
  ...1L9DC999L1...
  ...1LCDC99CL1...
  ...1LCCCCCCL1...
  ....1LLLLLL1....`],
  [cupEmpty, bitmap`
  ....1...........
  ...1D1..........
  ...1D1..........
  ....1D1.........
  ....1D111111....
  ...1LLDLLLLL1...
  ..1L11D11111L1..
  ...1LLLLLLLL1...
  ...1L..D...L1...
  ...1L...D..L1...
  ...1L...D..L1...
  ...1L....D.L1...
  ...1L....D.L1...
  ...1LCC.CDCL1...
  ...1LCCCCCCL1...
  ....1LLLLLL1....`],
  [cupBroken, bitmap`
  ....1...........
  ...1D1..........
  ...1D1..........
  ....1D1.........
  ....1D111111....
  ...1LLD000LL1...
  ..1011D11111L1..
  ...10LL00L0L1...
  ...1L0.D.0.01...
  ...10.000.0L1...
  ...10.0.D.001...
  ...10000.0.01...
  ...10..0.0001...
  ...1L.0.0D.01...
  ...100CC0CCC11..
  .1CC10L0L0LCCC1.`],
  // Benches
  [bench, bitmap`
  LLLLLLLLLLLLLLLL
  1111111111111110
  11111111111111L0
  1111111111111LL0
  111111111211LLL0
  11111111211LLL0D
  1122122211LLL0DD
  111111111LLL0DDD
  LLLLLLLLLLL0DDDD
  LLLLLLLL0L0DDDDD
  LLLLLLLL00DDDDD1
  000000000DDDDDLL
  DDDDDDDDDDDDD111
  444444444DDD1111
  444444444DD11111
  444444444DLLLLLL`],
  [benchMiddle, bitmap`
  LLLLLLLLLLLLLLLL
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  1111111111111111
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL
  LLLLLLLLLLLLLLLL
  0000000000000000
  DDDDDDDDDDDDDDDD
  4444444444444444
  4444444444444444
  4444444444444444`],
  // Machine
  [robotMachine, bitmap`
  FLLLLLLLLLLLLLLF
  L11111111111111L
  FL11111L00L0101L
  F6L111L0F0L1010L
  FFF0LL0FF0L111LF
  FFFFCCFFF0L11LFF
  FFFFFCFFF011LFFF
  FDLLLLLLL01LFFFF
  DDD33333.01LFFFF
  DFLCCCC2L01LFFFF
  DFLCCCC2L01LFFFF
  DFLCCC2CL011LFFF
  FFFLLLLL.01D10FF
  F000000000DDDL0F
  0LLLLLLLLLLDLLL0
  0000000000000000`],
  // Floor
  [floor, bitmap`
  CCCCCCCCCCFCCCCC
  CCCCCCCCCCFCCCCC
  CCCCCCCCCCFCCCCC
  FFFFFFFFFFFFFFFF
  CCCCFCCCCCCCCCCC
  CCCCFCCCCCCCCCCC
  CCCCFCCCCCCCCCCC
  FFFFFFFFFFFFFFFF
  CCCCCCCCCCFCCCCC
  CCCCCCCCCCFCCCCC
  CCCCCCCCCCFCCCCC
  FFFFFFFFFFFFFFFF
  CCCCFCCCCCCCCCCC
  CCCCFCCCCCCCCCCC
  CCCCFCCCCCCCCCCC
  FFFFFFFFFFFFFFFF`],
  [floorEnd, bitmap`
  CCCCCCCCCLL11111
  CCCCCCCCLLL11111
  CCCCCCCLL1L11111
  FFFFFFLLLLLLLLLL
  CCCCFLL111111111
  CCCCLL1111111111
  CCCLL11111111111
  FFLLLLLLLLLLLLLL
  CLL1111111L11111
  CL11111111L11111
  CL11111111L11111
  LLLLLLLLLLLLLLLL
  L111L11111111111
  L111L11111111111
  L111L11111111111
  LLLLLLLLLLLLLLLL`],
  [floorEnd2, bitmap`
  CCCCCCCCCCL11111
  CCCCCCCCCCL11111
  CCCCCCCCCLL11111
  FFFFFFFFFLLLLLLL
  CCCCFCCCLL111111
  CCCCFCCCL1111111
  CCCCFCCLL1111111
  FFFFFFFLLLLLLLLL
  CCCCCCLL11L11111
  CCCCCCL111L11111
  CCCCCLL111L11111
  FFFFFLLLLLLLLLLL
  CCCCLL1111111111
  CCCCL11111111111
  CCCLL11111111111
  LLLLLLLLLLLLLLLL`],
  [floorKitchen, bitmap`
  1111111111L11111
  1111111111L11111
  1111111111L11111
  LLLLLLLLLLLLLLLL
  1111L11111111111
  1111L11111111111
  1111L11111111111
  LLLLLLLLLLLLLLLL
  1111111111L11111
  1111111111L11111
  1111111111L11111
  LLLLLLLLLLLLLLLL
  1111L11111111111
  1111L11111111111
  1111L11111111111
  LLLLLLLLLLLLLLLL`],
  [deskUnderRobot, bitmap`
  F666666666666666
  F666662266666666
  F666626666666666
  F666666666666666
  F622666666666666
  F626666666666666
  F2266666666666FF
  F26666666666FFFF
  F266666666FFFFFF
  F66666666FFFFFFF
  F666666FFFFFFFFF
  F66666FFFFFFFFFF
  F6666FFFFFFFFFFF
  F666FFFFFFFFFFFF
  F666FFFFFFFFFFFF
  F66FFFFFFFFFFFFF`],
)
// =================================================

// = Sounds ========================================
const soundWalkingPlayer = tune`
80.42895442359249: F5~80.42895442359249,
80.42895442359249: G5~80.42895442359249,
2412.8686327077744`
const soundWalkingCustomer = tune`
170.45454545454547: G5/170.45454545454547,
5284.09090909091`
const soundMovingCup = tune`
96.7741935483871: F5^96.7741935483871,
96.7741935483871: G5^96.7741935483871,
96.7741935483871: F5^96.7741935483871,
2806.451612903226`
const soundBreakingCup = tune`
71.59904534606206: C5-71.59904534606206 + B4~71.59904534606206,
71.59904534606206: B4-71.59904534606206 + A4~71.59904534606206,
71.59904534606206: A4-71.59904534606206 + G4~71.59904534606206,
71.59904534606206: G4-71.59904534606206 + F4~71.59904534606206,
71.59904534606206: F4-71.59904534606206 + E4~71.59904534606206,
71.59904534606206: E4-71.59904534606206 + D4~71.59904534606206,
71.59904534606206: F4~71.59904534606206,
71.59904534606206: E4-71.59904534606206 + C4/71.59904534606206,
71.59904534606206: D4/71.59904534606206 + F4~71.59904534606206,
1646.7780429594272`
const soundCatchingCup = tune`
100: B4~100,
100: C5~100,
100: D5~100,
100: E5~100,
2800`
const soundWalkingAway = tune`
100: B4^100,
100: C5^100,
100: D5^100,
100: G5-100,
2800`
const soundGameOver = tune`
122.95081967213115: C5/122.95081967213115 + E5/122.95081967213115,
122.95081967213115: B4/122.95081967213115 + D5/122.95081967213115,
122.95081967213115: A4/122.95081967213115 + C5/122.95081967213115,
122.95081967213115: G4/122.95081967213115 + B4/122.95081967213115,
122.95081967213115: A4/122.95081967213115,
122.95081967213115: G4/122.95081967213115 + B4/122.95081967213115,
122.95081967213115: A4/122.95081967213115,
122.95081967213115: G4/122.95081967213115 + B4/122.95081967213115,
122.95081967213115: F4/122.95081967213115 + A4/122.95081967213115,
122.95081967213115: E4/122.95081967213115 + G4/122.95081967213115,
122.95081967213115: D4/122.95081967213115 + F4/122.95081967213115,
122.95081967213115: C4/122.95081967213115 + E4/122.95081967213115,
122.95081967213115: D4/122.95081967213115,
122.95081967213115: C4/122.95081967213115,
2213.1147540983607`
const soundGameOn = tune`
150: B4^150,
150: D5^150,
150: C5^150,
150: E5^150,
150: D5^150,
150: G5^150,
150: E5^150,
150: G5^150,
150: B5^150,
150: B5^150,
3300`
const soundAngryCustomer = tune`
155.44041450777203: B4/155.44041450777203,
155.44041450777203: D5/155.44041450777203 + B4^155.44041450777203,
155.44041450777203: F5/155.44041450777203 + D5^155.44041450777203,
155.44041450777203: G5/155.44041450777203 + F5^155.44041450777203,
155.44041450777203: A5/155.44041450777203 + G5^155.44041450777203,
155.44041450777203: B5/155.44041450777203 + A5^155.44041450777203,
4041.450777202073`
const soundLevelUp = tune`
100: B4/100 + D5-100,
100: D5/100 + F5-100,
100: G5/100 + B5-100,
100: E5/100 + D5/100,
100: G5/100 + B5-100,
2700`
// =================================================


// = Levels ========================================
let level = 0
const levels = [
  map`
  .......aku
  55555552k3
  .......aku
  55555552k3
  .......aku
  55555552k3
  .......aku
  55555552k3`
]
// =================================================

// = Constants =====================================
const playerMaxX = 8
const playerStartY = 1

const benchesCount = 4

const cupMovingLeftSpeed = 100
const cupMovingRightSpeed = 1250 / 2
const customerMovingSpeed = 1250

const levelUpIntervalDuration = 30 * 1000

const customerHasEnoughProbability = 0.6

const customerTypes = [customer1, customer2, customer3, customer4]

const cupScore = 50
// =================================================

// = Variables, game state =========================
let gameState = {
  isRunning: true,
  tick: 0,
  score: 0,
  lastCupSpawnedAt: 0,
  cupMovingLeftSpeed: cupMovingLeftSpeed,
  cupMovingRightSpeed: cupMovingRightSpeed,
  customerMovingSpeed: customerMovingSpeed,
}
// =================================================

// = Prepare the game ==============================
let playerObject = getFirst(player)

let cupsInterval = null
let cupsEmptyInterval = null
let customersInterval = null
let levelUpInterval = null

function newGame() {
  setMap(levels[level])
  setBackground(floor)

  addSprite(playerMaxX, playerStartY, player)
  playerObject = getFirst(player)

  gameState = {
    isRunning: true,
    tick: 0,
    score: 0,
    lastCupSpawnedAt: 0,
    cupMovingLeftSpeed: cupMovingLeftSpeed,
    cupMovingRightSpeed: cupMovingRightSpeed,
    customerMovingSpeed: customerMovingSpeed,
  }

  printScore()

  playTune(soundGameOn)

  cupsInterval = createCupsInterval()
  cupsEmptyInterval = createCupsEmptyInterval()
  customersInterval = createCustomersInterval()
  levelUpInterval = createLevelUpInterval()
}

newGame()
// =================================================

// = Functions =====================================
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function addSpriteWithReturn(x, y, spriteType) {
  addSprite(x, y, spriteType)
  return getAll(spriteType).at(-1) // Little bit hacky, but should work
}

function printScore() {
  clearText()
  addText(`Score: ${gameState.score}`, {
    x: 0,
    y: 2 * height() - 1,
    color: color`2`
  })
}

async function gameOver(wasAngryCustomer = false, angryCustomerY = null) {
  // Stop the game
  gameState.isRunning = false

  // Add text
  printScore()
  addText("Game Over!", {
    x: width() / 2,
    y: height(),
    color: color`6`
  })

  // Clear all intervals
  clearInterval(customersInterval)
  clearInterval(cupsInterval)
  clearInterval(cupsEmptyInterval)
  clearInterval(levelUpInterval)

  // Player gets out animation (for angry customer) -------------
  if (wasAngryCustomer) {
    addSprite(playerObject.x, angryCustomerY, playerGameOver)
    playerObject.remove()

    const playerGameOverObject = getFirst(playerGameOver)
    for (let i = 0; i <= playerObject.x; i++) {
      await delay(150)
      if (playerGameOverObject.x === 0) {
        playerGameOverObject.remove()
        break
      }
      playerGameOverObject.x--
    }
  }
  // -------------------------------------------------------------

  await delay(1000)
  playTune(soundGameOver)
}
// =================================================

// = Controls ======================================
onInput("s", () => {
  if (!gameState.isRunning) return

  playerObject.y += 2
  playTune(soundWalkingPlayer)
})

onInput("w", () => {
  if (!gameState.isRunning) return

  playerObject.y -= 2
  playTune(soundWalkingPlayer)
})

onInput("k", () => {
  if (!gameState.isRunning) return

  // Limit how fast can cups be send
  if (performance.now() - gameState.lastCupSpawnedAt <= 2 * cupMovingLeftSpeed)
    return

  addSpriteWithReturn(playerObject.x - 1, playerObject.y - 1, cup)
  gameState.lastCupSpawnedAt = performance.now()
  playTune(soundMovingCup)
})

onInput("l", () => {
  // Restart only after game ends
  if (gameState.isRunning) return

  newGame()
})
// =================================================

// = Game loops ====================================
// - Moving cups -----------------------------------
function createCupsInterval() {
  return setInterval(async () => {
    const cups = getAll(cup)

    for (let cupObject of cups) {
      cupObject.x--

      // Check for customers on tile before
      const tileBefore = [...getTile(cupObject.x, cupObject.y), ...getTile(cupObject.x - 1, cupObject.y)]
      const customer = tileBefore.find(sprite => customerTypes.includes(sprite.type))
      if (customer) {
        gameState.score += cupScore
        printScore()

        // Either customer has enough => remove
        if (Math.random() < customerHasEnoughProbability) {
          playTune(soundWalkingAway)
          customer.remove()
          cupObject.remove()
        }
        // Or push him away with need for one more drink (at least)
        else {
          playTune(soundCatchingCup)
          if (customer.x > 0) {
            customer.x--
            cupObject.x--
          }
          cupObject.type = cupEmpty
        }
      }

      // All the way to the end without a customer = broken glass
      else if (cupObject.x === 0) {
        cupObject.type = cupBroken
        playTune(soundBreakingCup)
        gameOver()
      }
    }
  }, gameState.cupMovingLeftSpeed)
}

// - Moving empty cups -----------------------------
function createCupsEmptyInterval() {
  return setInterval(() => {
    const cups = getAll(cupEmpty)

    for (let cupObject of cups) {
      cupObject.x++

      // Empty cup went all the way back
      if (cupObject.x >= playerObject.x) {
        // there is no player = broken glass
        if (cupObject.y + 1 !== playerObject.y) {
          cupObject.y++
          cupObject.type = cupBroken
          playTune(soundBreakingCup)
          gameOver()
        } else {
          playTune(soundCatchingCup)
          cupObject.remove()
        }
      }
    }
  }, gameState.cupMovingRightSpeed)
}

// - Moving and spawning customers -----------------
function createCustomersInterval() {
  return setInterval(() => {
    // Move existing customers
    let customers = []
    for (let customerType of customerTypes)
      customers = [...customers, ...getAll(customerType)]

    for (let customerObject of customers) {
      customerObject.x++

      if (customerObject.x >= playerObject.x - 1) {
        playTune(soundAngryCustomer)
        gameOver(true, customerObject.y)
      }
    }

    // Spawn new random customer
    gameState.tick++
    if (gameState.tick % 3 !== 0) return // Spawn new one only every 3rd tick

    const benchIndex = getRandomInt(0, benchesCount)
    const customerType = getRandomItem(customerTypes)

    playTune(soundWalkingCustomer)
    addSprite(0, benchIndex * 2, customerType)
  }, gameState.customerMovingSpeed)
}

// - Level up --------------------------------------
function createLevelUpInterval() {
  return setInterval(() => {
    playTune(soundLevelUp)
    gameState.cupMovingLeftSpeed *= 0.8
    gameState.cupMovingRightSpeed *= 0.8
    gameState.customerMovingSpeed *= 0.8

    clearInterval(cupsInterval)
    cupsInterval = createCupsInterval()

    clearInterval(cupsEmptyInterval)
    cupsEmptyInterval = createCupsEmptyInterval()

    clearInterval(customersInterval)
    customersInterval = createCustomersInterval()
  }, levelUpIntervalDuration)
}
// =================================================

