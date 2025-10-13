/*
@title: TotoTheMonkey
@author: Armaan Soni
@description:A Game of monkey who lves math but needs to learn new things choose correct option to teach him rember he is monkey so dont frustrate if the process goes to infinity
@tags: ["endless","Logical"]
@addedOn: 2025-10-13
*/

const player = "p"
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
)
setSolids([player])
setMap(map`
.......
.......
.......
.......
.......
...p...`)
function moveLeft() {
  const p = getFirst(player)
  if (reverseControls) {
    if (p.x < width() - 2) p.x += 1
  } else {
    if (p.x > 1) p.x -= 1
  }
}
function moveRight() {
  const p = getFirst(player)
  if (reverseControls) {
    if (p.x > 1) p.x -= 1
  } else {
    if (p.x < width() - 2) p.x += 1
  }
}
onInput("a", moveLeft)
onInput("d", moveRight)
function randomThought() {
  const thoughts = [
    "Math hard. Banana easy ",
    "Brain overheating ",
    "Banana > Numbers "
  ]
  const msg = thoughts[Math.floor(Math.random() * thoughts.length)]
  addText(msg, { x: 1, y: 12, color: color`6` })
}
function newQuestion() {
  clearText()
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
    addText("Too Slow!", { x: 5, y: 8, color: color`3` })
    streak = 0
    wrongCount++
    checkRage()
    setTimeout(newQuestion, 1000)
  }, timeLimit)
  lastAnswerTime = Date.now()
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
  } else if (rand < 0.2) {
    addText("-Time!", { x: 3, y: 10, color: color`3` })
    timeLimit = Math.max(1500, timeLimit - 500)
  }
}
onInput("s", () => {
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
newQuestion()