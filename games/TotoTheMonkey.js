/*
@title: TotoTheMonkey
@author: Armaan Soni
@description:A Game of monkey who lves math but needs to learn new things choose correct option to teach him rember he is monkey so dont frustrate if the process goes to infinity
@tags: ["endless","Logical"]
@addedOn: 2025-10-13
*/
const player = "p"
const rock = "r"
const bullet = "b"
const line = "l"
let correctSide = "left"
let score = 0
let streak = 0
let level = 1
let timer
let timeLimit = 4000
let wrongCount = 0
let reverseControls = false
let hyperMode = false
let lastAnswerTime = 0
let bullets = 8
let rockSpawnRate = 1700
let rockTimer
let gameActive = true
let rockMoveCounter = 1

setLegend(
  [ player, bitmap`
...H........H...
...HHH....HHH...
33333HHHHHH33333
0.....CCCC.....0
C..9CCCCCCCC9..C
C..96C2222C69..C
C..96C0220C69..C
C....C1111C....C
CC..CCL33LCC..CC
.C.CCCCLLCCCC.C.
.CCC33333333CCC.
...C33333333C...
...CC666666CC...
...CCCCCCCCCC...
....C......C....
....CC0.20CC....` ],
  [ rock, bitmap`
................
................
......6666......
....66666666....
...6666666666...
..6600066FFFF6..
.600060FFFF6FF6.
.606600FF0006F6.
.303304444330F3.
.600044FF000F06.
..6FF44FF06F00..
...66F4444400...
....66FF6666....
......6666......
................
................` ],
  [ bullet, bitmap`
................
................
................
................
.......33.......
......6336......
......0000......
......0000......
......0000......
................
................
................
................
................
................
................` ],
  [ line, bitmap`
................
................
................
................
................
HHHHHHHHHHHHH33C
CH33330CCCC0330C
0330HH33H0C33CCH
33CCCCCH3333HHHH
................
................
................
................
................
................
................` ]
)
setSolids([player, rock])
setMap(map`
.......
.......
.......
lllllll
.......
...p...`)

function moveLeft() {
  if (!gameActive) return
  const p = getFirst(player)
  if (reverseControls) {
    if (p.x < width() - 2) p.x += 1
  } else {
    if (p.x > 1) p.x -= 1
  }
}

function moveRight() {
  if (!gameActive) return
  const p = getFirst(player)
  if (reverseControls) {
    if (p.x > 1) p.x -= 1
  } else {
    if (p.x < width() - 2) p.x += 1
  }
}

onInput("a", moveLeft)
onInput("d", moveRight)

onInput("j", () => {
  if (!gameActive || bullets <= 0) return
  const p = getFirst(player)
  addSprite(p.x, p.y - 1, bullet)
  bullets--
  playTune(tune`32: C6~32`, 1)
  updateBulletDisplay()
})

onInput("s", () => {
  if (!gameActive) return
  const px = getFirst(player).x
  const choice = px < width() / 2 ? "left" : "right"
  clearText()
  clearTimeout(timer)
  const reactionTime = Date.now() - lastAnswerTime
  if (choice === correctSide) {
    playTune(tune`
      120: C5~120,
      120: E5~120,
      120: G5~120`, 1)
    score += 10 + level
    streak++
    wrongCount = 0

    if (reactionTime < 1500) {
      hyperMode = true
      addText("+Bonus", { x: 4, y: 9, color: color`9` })
      score += 10
    }
    addText("Correct!", { x: 6, y: 7, color: color`4` })
    if (streak % 5 === 0) {
      level++
      timeLimit = Math.max(2000, timeLimit - 200)
      rockSpawnRate = Math.max(1500, rockSpawnRate - 200)
      addText("Evolved!", { x: 6, y: 10, color: color`4` })
    }
    randomEvent()
  } else {
    playTune(tune`
      200: C4~200,
      200: A3~200,
      200: G3~200`, 1)
    addText(" Wrong!", { x: 7, y: 8, color: color`3` })
    streak = 0
    wrongCount++
    checkRage()
  }
  setTimeout(newQuestion, 1200)
})

function updateBulletDisplay() {
  addText(`BULLETS: ${bullets}`, { x: 10, y: 1, color: color`9` })
}

function moveBullets() {
  getAll(bullet).forEach(b => {
    b.y -= 1

    const rocks = getAll(rock)
    for (let rockObj of rocks) {
      if (rockObj.x === b.x && rockObj.y === b.y) {
        rockObj.remove()
        b.remove()
        playTune(tune`64: E5~64`, 1)
        score += 5
        return
      }
    }
    
    if (b.y < 0) {
      b.remove()
    }
  })
}

function spawnRock() {
  const x = Math.floor(Math.random() * (width() - 2)) + 1
  addSprite(x, 0, rock)
}

function moveRocks() {
  if (!gameActive) return
  
  rockMoveCounter++
  if (rockMoveCounter < 3) return
  rockMoveCounter = 0
  
  getAll(rock).forEach(r => {
    r.y += 1
    
    if (r.y >= height()) {
      r.remove()
      score -= 10
      addText("-10", { x: r.x, y: height()-1, color: color`3` })
      setTimeout(() => clearTile(r.x, height()-1), 500)
    }
  })
}

function gameOver() {
  gameActive = false
  playTune(tune`
    200: C4~200,
    200: A3~200,
    200: F3~200,
    200: D3~200,
    200: C3~200`, 1)
  
  clearText()
  clearTimeout(timer)
  clearInterval(rockTimer)
  
  addText("GAME OVER!", { x: 5, y: 4, color: color`3` })
  addText(`Score: ${score}`, { x: 6, y: 6, color: color`7` })
  addText(`Level: ${level}`, { x: 6, y: 7, color: color`7` })
  addText("Press K to restart", { x: 3, y: 9, color: color`9` })
}

onInput("k", () => {
  if (!gameActive) {
    score = 0
    streak = 0
    level = 1
    timeLimit = 4000
    wrongCount = 0
    reverseControls = false
    bullets = 5
    rockSpawnRate = 1500
    gameActive = true
    rockMoveCounter = 0
    
    getAll(rock).forEach(r => r.remove())
    getAll(bullet).forEach(b => b.remove())
    
    const p = getFirst(player)
    p.x = 3
    p.y = 5
    
    newQuestion()
  }
})

function randomThought() {
  const thoughts = [
    "Math hard. Banana easy ",
    "Brain overheating ",
    "Banana > Numbers ",
    "Watch out for rocks!",
    "Use J to shoot!",
    "Don't get squished!",
    "Rocks falling!",
    "Quick! Solve it!"
  ]
  const msg = thoughts[Math.floor(Math.random() * thoughts.length)]
  addText(msg, { x: 1, y: 12, color: color`6` })
}

function newQuestion() {
  if (!gameActive) return
  
  clearText()
  clearTimeout(rockTimer)
  getAll(rock).forEach(r => r.remove())
  getAll(bullet).forEach(b => b.remove())
  
  hyperMode = false
  const range = 10 + level * 6
  const a = Math.floor(Math.random() * range) + 1
  const b = Math.floor(Math.random() * range) + 1
  const ops = ["+", "-", "*", "/"]
  let opIndex = Math.min(Math.floor(level / 3), 3)
  if (level > 10 && Math.random() < 0.5) opIndex = Math.floor(Math.random() * 4)
  const op = ops[opIndex]

  let answer
  switch (op) {
    case "+": answer = a + b; break
    case "-": answer = a - b; break
    case "*": answer = a * b; break
    case "/": answer = Math.floor(a / b); break
  }
  let wrong
  do {
    const delta = Math.floor(Math.random() * 5) + 1
    wrong = Math.random() < 0.5 ? answer + delta : answer - delta
  } while (wrong === answer || wrong < 0)
  const leftIsCorrect = Math.random() < 0.5
  correctSide = leftIsCorrect ? "left" : "right"
  addText(`Q: ${a} ${op} ${b} = ?`, { x: 3, y: 2, color: color`7` })
  addText(`SCORE: ${score}`, { x: 1, y: 0, color: color`4` })
  addText(`LVL ${level}`, { x: 15, y: 0, color: color`3` })
  addText(`STREAK ${streak}`, { x: 1, y: 1, color: color`9` })
  updateBulletDisplay()

  if (leftIsCorrect) {
    addText(`${answer}`, { x: 4, y: 6, color: color`7` })  
    addText(`${wrong}`, { x: 12, y: 6, color: color`7` })
  } else {
    addText(`${wrong}`, { x: 4, y: 6, color: color`7` })
    addText(`${answer}`, { x: 12, y: 6, color: color`7` })
  }
  if (Math.random() < 0.2) randomThought()
  clearTimeout(timer)
  timer = setTimeout(() => {
    playTune(tune`
      200: C4~200,
      200: G3~200`, 1)
    streak = 0
    wrongCount++
    checkRage()
    setTimeout(newQuestion, 1000)
  }, timeLimit)
  lastAnswerTime = Date.now()
  
  rockTimer = setInterval(() => {
    if (Math.random() < 0.7) spawnRock()
  }, rockSpawnRate)
}

function checkRage() {
  if (wrongCount >= 3) {
    reverseControls = true
    addText("RAGE MODE! Controls Reversed!", { x: 1, y: 11, color: color`3` })
    playTune(tune`
      120: G4~120,
      120: F4~120,
      120: D4~120`, 1)
    setTimeout(() => {
      reverseControls = false
      wrongCount = 0
    }, 5000)
  }
}

function randomEvent() {
  const rand = Math.random()
  if (rand < 0.1) {
    addText("Bonus+20pts", { x: 3, y: 10, color: color`9` })
    score += 20
  } else if (rand < 0.15) {
    addText("-Time!", { x: 3, y: 10, color: color`3` })
    timeLimit = Math.max(1500, timeLimit - 500)
  } else if (rand < 0.2 && bullets < 10) {
    addText("+2 Bullets!", { x: 3, y: 10, color: color`9` })
    bullets += 2
    updateBulletDisplay()
  }
}

setInterval(() => {
  moveRocks()
  moveBullets()
}, 200)

newQuestion()