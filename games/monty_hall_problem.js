/*
@title: Monty Hall Game
@author: NOT-Bugha
@tags: ['puzzle']
@addedOn: 2024-01-01
*/

const door = "d"
const openDoor = "o"
const prizeDoor = "p"
const goatDoor = "g"

setLegend(
  [ door, bitmap`
0000000000000000
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0000000000000000`],
  [ openDoor, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0111111111111110
0000000000000000`],
  [ prizeDoor, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111100CC1111110
0111100CC1111110
0111100CC1111110
0111133CC1111110
0111133CC1111110
0111133CC1111110
0111133CC1111110
0111133CC1111110
0111133CC1111110
0111111111111110
0111111111111110
0111111111111110
0000000000000000`],
  [ goatDoor, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111155551111110
0111155551111110
0111155551111110
0111155551111110
0111155551111110
0111155551111110
0111155551111110
0111155551111110
0111155551111110
0111111111111110
0111111111111110
0111111111111110
0000000000000000`]
)

const levels = [
  map`
ddd`
]

let message = ""
let canSwitch = false

setMap(levels[0])

let selectedDoor = -1
let revealedDoor = -1
let prizeDoorIndex = Math.floor(Math.random() * 3)
let gameState = "selection" // states: selection, reveal, final, result

onInput("a", () => {
  if (gameState === "selection" && selectedDoor > 0) {
    selectedDoor--
  }
})

onInput("d", () => {
  if (gameState === "selection" && selectedDoor < 2) {
    selectedDoor++
  }
})

function wrapText(text, maxWidth) {
  const words = text.split(' ')
  const lines = []
  let currentLine = words[0]

  for (let i = 1; i < words.length; i++) {
    if (currentLine.length + words[i].length + 1 <= maxWidth) {
      currentLine += ' ' + words[i]
    } else {
      lines.push(currentLine)
      currentLine = words[i]
    }
  }
  lines.push(currentLine)
  return lines
}

onInput("k", () => {
  if (gameState === "selection") {
    if (selectedDoor === -1) {
      selectedDoor = 0  // Start with first door selected
    } else {
      // Confirm door selection and reveal goat
      let revealedDoorIndex = -1
      for (let i = 0; i < 3; i++) {
        if (i !== selectedDoor && i !== prizeDoorIndex) {
          revealedDoorIndex = i
          revealedDoor = i  // Store revealed door
          break
        }
      }
      clearTile(revealedDoorIndex, 0)
      addSprite(revealedDoorIndex, 0, goatDoor)
      message = `Door ${revealedDoorIndex + 1} has a GOAT!!\n\n\nPress K to stick\nPress J to switch`
      gameState = "reveal"
      canSwitch = true
    }
  } else if (gameState === "reveal" && canSwitch) {
    // Stay with current door
    message = "Staying with original choice..."
    showFinalResult(selectedDoor)
  }
})

onInput("j", () => {
  if (gameState === "reveal" && canSwitch) {
    // Switch to the other unopened door
    const newDoor = 3 - selectedDoor - revealedDoor
    message = "Switching..."
    selectedDoor = newDoor
    showFinalResult(selectedDoor)
  } else if (gameState === "result") {
    // Reset game
    selectedDoor = -1
    revealedDoor = -1
    prizeDoorIndex = Math.floor(Math.random() * 3)
    gameState = "selection"
    canSwitch = false
    message = "Pick door (Press K)"
    
    // Reset doors
    setMap(levels[0])
  }
})

function showFinalResult(finalChoice) {
  // Clear screen and add black background
  for (let i = 0; i < 3; i++) {
    clearTile(i, 0)
  }
  
  // Add extra newlines and credits
  message = finalChoice === prizeDoorIndex ? 
    "YOUU WON!!\n\n\n\nA game by\nTechnoblade_SM\n\n\n\nPress J to try again" : 
    "YOU LOST, TRY AGAIN\n\n\n\nA game by\nTechnoblade_SM\n\n\n\nPress J to try again"
  gameState = "result"
  canSwitch = false
}

afterInput(() => {
  if (gameState === "selection") {
    for (let i = 0; i < 3; i++) {
      clearTile(i, 0)
      addSprite(i, 0, i === selectedDoor ? openDoor : door)
    }
    message = selectedDoor === -1 ? 
      "Pick door (Press K)" : 
      `Door ${selectedDoor + 1} selected.\nPress K to confirm.`
  }
  
  clearText()
  if (gameState === "reveal") {
    // Special formatting for reveal state
    const [announcement, ...instructions] = message.split('\n\n\n')
    addText(announcement, { y: 2, color: color`3` })
    instructions[0].split('\n').forEach((line, index) => {
      addText(line, { y: 6 + index, color: color`3` })
    })
  } else if (gameState === "result") {
    // Split message into result, credits, and replay
    const parts = message.split('\n\n\n\n')
    
    // Revert win/lose message to original position
    addText(parts[0], { y: 2, color: color`3` })
    
    // Keep centered credits
    const creditLines = parts[1].split('\n')
    addText(creditLines[0], { y: 7, color: color`9`, x: 5 })  // "A game by"
    addText(creditLines[1], { y: 8, color: color`9`, x: 2 })  // "Technoblade_SM"
    
    // Revert replay prompt to original position
    addText(parts[2], { y: 12, color: color`3` })
  } else {
    // Normal text wrapping for other states
    const wrapped = wrapText(message, 20)
    wrapped.forEach((line, index) => {
      addText(line, { y: 4 + index, color: color`3` })
    })
  }
})
