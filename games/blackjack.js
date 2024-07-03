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

let credits = 0

const backupDeck = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]

let cards = [ backupDeck.slice(), backupDeck.slice(), backupDeck.slice(), backupDeck.slice() ]

let dealerHand = []
let playerHand = []

let initialDrawDone = false

setLegend(
  [ spade, bitmap`
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
....00000000....` ],
  [ club, bitmap`
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
....00000000....` ],
  [ heart, bitmap`
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
.......33.......` ],
  [ diamond, bitmap`
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
.......33.......` ],
  [ faceDown, bitmap`
.00000000000000.
0222222222222220
0322223333222230
0333233333323330
0223233333323220
0223333333333220
0222333333332220
0222223223222220
0332223223222330
0233333333333320
0222233333322220
0222233333322220
0222233333322220
0233333333333320
0332222222222330
.00000000000000.` ]
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

addText("Total bet: " + credits, {x:0, y:0, color: color`0`} )

addText("Dealer's hand", {x:3, y:2, color: color`0`} )

function updateCreditCount(amount) {
  credits += amount;
  clearText();
  addText("Total bet: " + credits, {x:0, y:0, color: color`0`} )
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

function displayDealerCards() {
  for (let i = 0; i < (dealerHand.length - 1)*2; i += 2) {
    addSprite(i+1, 2, numToSuit(dealerHand[i / 2][0]))
    addText(`${dealerHand[i / 2][1]}`, {y:5, x: i*2})
  }
}

function drawPlayerCards() {
  
}

// add credits to current bet
onInput("j", () => {
  updateCreditCount(1);
})

// draw cards to dealer and player
onInput("i", () => {
  if (!initialDrawDone) {
    initialDrawDone = true
    playerHand.push(getRandomCard())
    dealerHand.push(getRandomCard())
    playerHand.push(getRandomCard())
    dealerHand.push(getRandomCard())
  
    displayDealerCards()
  }
})

onInput("l", () => {
  
})

afterInput(() => {
  
})