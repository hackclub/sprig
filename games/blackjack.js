/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Blackjack
@author: Josh Baron <xriiitox>
@tags: ['endless']
@addedOn: 2024-07-02
*/

const spade = "s"
const club = "c"
const diamond = "d"
const heart = "h"
const faceDown = "f"

let credits = 20
let bet = 0;

let doubleDown = false

const backupDeck = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]

let cards = [backupDeck.slice(), backupDeck.slice(), backupDeck.slice(), backupDeck.slice()]

let dealerHand = []
let playerHand = []
let dealerHiddenCard = []

let initialDrawDone = false
let gameOver = false

setLegend(
  [spade, bitmap`
.......00.......
......0000......
.....000000.....
....00000000....
..000000000000..
.00000000000000.
0000000000000000
0000000000000000
0000000000000000
0000000000000000
.00000000000000.
.......00.......
.......00.......
......0000......
.....000000.....
....00000000....`],
  [club, bitmap`
......0000......
.....000000.....
.....000000.....
.....000000.....
.....000000.....
.0000.0000.0000.
0000000000000000
0000000000000000
0000000000000000
0000000000000000
.0000..00..0000.
.......00.......
.......00.......
......0000......
.....000000.....
....00000000....`],
  [heart, bitmap`
....3......3....
...333....333...
..33333..33333..
.33333333333333.
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
.33333333333333.
..333333333333..
...3333333333...
....33333333....
.....333333.....
......3333......
.......33.......`],
  [diamond, bitmap`
.......33.......
......3333......
.....333333.....
....33333333....
...3333333333...
..333333333333..
.33333333333333.
3333333333333333
3333333333333333
.33333333333333.
..333333333333..
...3333333333...
....33333333....
.....333333.....
......3333......
.......33.......`],
  [faceDown, bitmap`
.00000000000000.
0222222222222220
0322223333222230
0333233333323330
0223233333323220
0223333333333220
0222333333332220
0222223333222220
0332223333222330
0233333333333320
0222233333322220
0222233333322220
0222233333322220
0233333333333320
0332222222222330
.00000000000000.`]
) // suits are mostly for fun in display, could work without
// although harder to count cards without it

setSolids([])

let level = 0
const levels = [
  map`
..........
..........
..........
..........
..........
..........
..........
..........`
]

setMap(levels[level])

addText("Total bet: " + bet, { x: 0, y: 0, color: color`0` })

addText("Total credits: " + credits, { x: 0, y: 15, color: color`0` })

addText("Dealer's hand", { x: 3, y: 2, color: color`0` })

addText("Your hand", { x: 3, y: 7, color: color`0` })

function creditToBet(amount) {
  amount = credits === 0 ? 0 : amount // do nothing if player has no credits
  credits -= amount;
  bet += amount
  addText("           " + bet, { x: 0, y: 0, color: color`0` })
  addText("Total bet: " + bet, { x: 0, y: 0, color: color`0` })

  addText("               " + credits, { x: 0, y: 15, color: color`0` })
  addText("Total credits: " + credits, { x: 0, y: 15, color: color`0` })
}

function getRandomCard() {
  let suitIndex = Math.floor(Math.random() * 4)
  return [suitIndex, cards[suitIndex].splice(Math.floor(Math.random() * cards[suitIndex].length), 1)]
}

function numToSuit(num) {
  switch (num) {
    case 0:
      return spade;
    case 1:
      return club;
    case 2:
      return heart;
    case 3:
      return diamond;
    default:
      return spade;
  }
}

function displayDealerCards(end) {
  for (let i = 0; i < dealerHand.length; i++) {
    if (!end && i === dealerHand.length - 1) {
      addSprite(i * 2 + 1, 2, faceDown) // hide card
      continue
    } else if (end) clearTile(i * 2 + 1, 2)
    addSprite(i * 2 + 1, 2, numToSuit(dealerHand[i][0]))
    addText(`${dealerHand[i][1]}`, { y: 5, x: i * 4 })
  }
}

function displayPlayerCards() {
  for (let i = 0; i < playerHand.length; i++) {
    addSprite(i * 2 + 1, 4, numToSuit(playerHand[i][0]))
    addText(`${playerHand[i][1]}`, { y: 9, x: i * 4 })
  }
}

function handTotal(hand) {
  let aces = 0
  let sum = 0
  for (let i = 0; i < hand.length; i++) {
    if ((typeof hand[i][1][0] === "string") && hand[i][1][0] === "A") {
      aces++
      sum += 11
    } else if ((typeof hand[i][1][0] === "string")) { // i.e. "K" "Q" or "J"
      sum += 10;
    } else {
      sum += hand[i][1][0];
    }

  }
  if (aces > 0 && sum > 21) sum -= 10
  return sum
}

function playerWin(blackjack) {
  doubleDown = false
  addText("You Win!", { x: 0, y: 14, color: color`0` })
  if (blackjack) { credits += 2.5 * bet } 
  else { credits += bet * 2 } // if double down, will become *4
  bet = 0
  gameOver = true
  initialDrawDone = false
  addText("           " + bet, { x: 0, y: 0, color: color`0` })
  addText("Total bet: " + bet, { x: 0, y: 0, color: color`0` })

  addText("               " + credits, { x: 0, y: 15, color: color`0` })
  addText("Total credits: " + credits, { x: 0, y: 15, color: color`0` })
}

function dealerWin() {
  doubleDown = false
  addText("You Lose!", { x: 0, y: 14, color: color`0` })
  bet = 0
  gameOver = true
  initialDrawDone = false
  addText("           " + bet, { x: 0, y: 0, color: color`0` })
  addText("Total bet: " + bet, { x: 0, y: 0, color: color`0` })

  addText("               " + credits, { x: 0, y: 15, color: color`0` })
  addText("Total credits: " + credits, { x: 0, y: 15, color: color`0` })
}

function pushGame() {
  doubleDown = false
  addText("Push!", { x: 0, y: 14, color: color`0` })
  credits += bet // player gets bet back
  gameOver = true
  initialDrawDone = false
  addText("           " + bet, { x: 0, y: 0, color: color`0` })
  addText("Total bet: " + bet, { x: 0, y: 0, color: color`0` })

  addText("               " + credits, { x: 0, y: 15, color: color`0` })
  addText("Total credits: " + credits, { x: 0, y: 15, color: color`0` })
}

function resetGame() {
  gameOver = false
  clearText()
  cards = [backupDeck.slice(), backupDeck.slice(), backupDeck.slice(), backupDeck.slice()]
  playerHand = []
  dealerHand = []
  for (let i = 0; i < width(); i++) {
    clearTile(i, 2)
    clearTile(i, 4)
  }
  addText("Dealer's hand", { x: 3, y: 2, color: color`0` })
  addText("Your hand", { x: 3, y: 7, color: color`0` })
  addText("Total bet: " + bet, { x: 0, y: 0, color: color`0` })
  addText("Total credits: " + credits, { x: 0, y: 15, color: color`0` })
}

function dealerTurn() {
  let playerTotal = handTotal(playerHand)
  displayDealerCards(true)
  while (handTotal(dealerHand) <= 16 || dealerHand.length === 5) {
    dealerHand.push(getRandomCard())
    displayDealerCards(true)
  }
  if (handTotal(dealerHand) > 21) {
    playerWin()
  } else if (handTotal(dealerHand) > playerTotal) {
    dealerWin()
  } else if (handTotal(dealerHand) === playerTotal) {
    pushGame()
  } else if (handTotal(dealerHand) < playerTotal) {
    playerWin()
  }
}

// add credits to current bet
onInput("j", () => {
  if (!initialDrawDone) {
    resetGame()
    creditToBet(1)
  }
})

// draw cards to dealer and player
onInput("l", () => {
  if (gameOver) {
    resetGame()
  } else if (!initialDrawDone) {
    playerHand.push(getRandomCard())
    dealerHand.push(getRandomCard())
    playerHand.push(getRandomCard())
    dealerHand.push(getRandomCard())

    displayDealerCards(false)
    displayPlayerCards()
    initialDrawDone = true
    if (handTotal(playerHand) === 21) {
      displayDealerCards(true)
      playerWin()
    }
  } else if (!gameOver) {
    playerHand.push(getRandomCard())
    displayPlayerCards()

    // Five card charlie rule (also so that i can fit the cards on screen)
    if (playerHand.length === 5 && handTotal(playerHand) < 21) {
      displayDealerCards(true)
      playerWin()
    }

    if (handTotal(playerHand) === 21 && handTotal(dealerHand) === 21) {
      displayDealerCards(true)
      pushGame()
    } else if (handTotal(playerHand) === 21) {
      displayDealerCards(true)
      playerWin(true)
    } else if (handTotal(playerHand) > 21) {
      displayDealerCards(true)
      dealerWin()
    }

  }
})

// stay/stand when player does not have 21
onInput("k", () => {
  if (initialDrawDone) {
    dealerTurn()
  }
})

// double down
onInput("d", () => {
  if (initialDrawDone && playerHand.length === 2) {
    creditToBet(bet) // double bet
    playerHand.push(getRandomCard())
    dealerTurn()
  }
})

afterInput(() => {

})