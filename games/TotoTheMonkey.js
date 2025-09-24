/*
@title: TotoTheMonkey
@author: Armaan Soni
@description:A Game of monkey who lves math but needs to learn new things choose correct option to teach him rember he is monkey so dont frustrate if the process goes to infinity
@tags: ["Logical","Fun","Endless"]
@addedOn: 2025-09-19
*/

const player = "p"
let correctSide = "left"
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
.....
.....
.....
.....
..p..`)

onInput("a", () => {
  const p = getFirst(player)
  if (p.x > 1) p.x -= 1
})
onInput("d", () => {
  const p = getFirst(player)
  if (p.x < width() - 2) p.x += 1
})
function newQuestion() {
  clearText()

  const a = Math.floor(Math.random() * 10) + 1
  const b = Math.floor(Math.random() * 10) + 1
  const sum = a + b
  let wrong
  do {
    const delta = Math.floor(Math.random() * 3) + 1
    wrong = Math.random() < 0.5 ? sum + delta : sum - delta
  } while (wrong === sum || wrong < 0)
  const leftIsCorrect = Math.random() < 0.5
  correctSide = leftIsCorrect ? "left" : "right"
  addText(`${a} + ${b} = ?`, { x: 5, y: 2, color: color`7` })

if (leftIsCorrect) {
  addText(`${sum}`, { x: 4, y: 6, color: color`3` })  
  addText(`${wrong}`, { x: 12, y: 6, color: color`3` })
} else {
  addText(`${wrong}`, { x: 4, y: 6, color: color`3` })
  addText(`${sum}`, { x: 12, y: 6, color: color`3` })
}

}
onInput("s", () => {
  const px = getFirst(player).x
  const choice = px < width() / 2 ? "left" : "right"

  clearText()
  if (choice === correctSide) {
    playTune(tune`
      120: C5~120,
      120: E5~120,
      120: G5~120`, 1)
    addText("Correct!", { x: 6, y: 8, color: color`4` })
  } else {
    playTune(tune`
      200: C4~200,
      200: A3~200,
      200: G3~200`, 1)
    addText("Wrong!", { x: 7, y: 8, color: color`3` })

  addText("A = Left, D = Right", { x: 1, y: 10, color: color`6` })
  addText("Press S to SELECT", { x: 1, y: 11, color: color`4` })
  }
  setTimeout(newQuestion, 800)
})

newQuestion()
