const symbols = ["C", "L", "B", "S", "D"]

let reels = [0, 0, 0]
let credits = 20
let spinning = false
let spinTimer = null
let step = 0
let message = "PRESS A TO SPIN"

const SPIN_COST = 2

// BLACK BACKGROUND
setLegend(
  ["b", bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
)

setMap(map`
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbb
`)

// Rarer symbols have lower chances
function randomSymbol() {
  let r = Math.random()

  if (r < 0.35)
    return 0       // Cherry

  if (r < 0.65)
    return 1       // Lemon

  if (r < 0.85)
    return 2       // Bell

  if (r < 0.97)
    return 3       // Star

  return 4         // Diamond
}

function draw() {
  clearText()

  // TITLE
  addText("S L O T S", {
    x: 5,
    y: 1,
    color: color`3`
  })

  addText("***************", {
    x: 1,
    y: 2,
    color: color`3`
  })

  // CREDITS
  addText("CREDITS: " + credits, {
    x: 3,
    y: 4,
    color: color`3`
  })

  // REELS
  addText("+---+ +---+ +---+", {
    x: 1,
    y: 6,
    color: color`3`
  })

  addText(
    "| " + symbols[reels[0]] +
    " | | " + symbols[reels[1]] +
    " | | " + symbols[reels[2]] + " |",
    {
      x: 1,
      y: 8,
      color: color`3`
    }
  )

  addText("+---+ +---+ +---+", {
    x: 1,
    y: 10,
    color: color`3`
  })

  // MESSAGE
  addText(message, {
    x: Math.max(0, Math.floor((28 - message.length) / 2)),
    y: 12,
    color: color`3`
  })

  // CONTROLS
  addText("A SPIN", {
    x: 2,
    y: 14,
    color: color`3`
  })

  addText("D RESET", {
    x: 10,
    y: 14,
    color: color`3`
  })
}

function checkWin() {
  let a = reels[0]
  let b = reels[1]
  let c = reels[2]

  // JACKPOT
  if (a === 4 && b === 4 && c === 4) {
    credits += 100
    message = "JACKPOT! +100"

    playTune(tune`
      400:8,
      500:8,
      600:8,
      800:16
    `)

    return
  }

  // THREE STARS
  if (a === 3 && b === 3 && c === 3) {
    credits += 50
    message = "STAR WIN! +50"

    playTune(tune`
      400:8,
      500:8,
      600:12
    `)

    return
  }

  // THREE BELLS
  if (a === 2 && b === 2 && c === 2) {
    credits += 30
    message = "BELL WIN! +30"

    playTune(tune`
      300:10,
      450:10,
      600:15
    `)

    return
  }

  // THREE LEMONS
  if (a === 1 && b === 1 && c === 1) {
    credits += 20
    message = "LEMON WIN! +20"
    return
  }

  // THREE CHERRIES
  if (a === 0 && b === 0 && c === 0) {
    credits += 15
    message = "CHERRY WIN! +15"
    return
  }

  // ANY PAIR
  if (a === b || b === c || a === c) {
    credits += 1
    message = "PAIR! +1"
    return
  }

  message = "NO LUCK"
}

function spin() {
  if (spinning)
    return

  if (credits < SPIN_COST) {
    message = "NOT ENOUGH CREDITS"
    draw()
    return
  }

  credits -= SPIN_COST

  spinning = true
  step = 0
  message = "SPINNING..."

  spinTimer = setInterval(() => {

    // REEL 1
    if (step < 10) {
      reels[0] = randomSymbol()
    }

    // REEL 2
    if (step < 15) {
      reels[1] = randomSymbol()
    }

    // REEL 3
    if (step < 20) {
      reels[2] = randomSymbol()
    }

    step++

    draw()

    // FINISHED
    if (step >= 20) {
      clearInterval(spinTimer)

      spinTimer = null
      spinning = false

      checkWin()
      draw()
    }

  }, 100)
}

function reset() {
  if (spinTimer !== null) {
    clearInterval(spinTimer)
    spinTimer = null
  }

  spinning = false
  credits = 20
  message = "PRESS A TO SPIN"

  reels[0] = randomSymbol()
  reels[1] = randomSymbol()
  reels[2] = randomSymbol()

  draw()
}

onInput("a", () => {
  spin()
})

onInput("d", () => {
  if (!spinning) {
    reset()
  }
})

draw()