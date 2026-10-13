/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Devil's Blackjack
@description: It's Blackjack but even more chaotic
@author: dionysus
@tags: ['endless']
@addedOn: 2025-10-13
*/
const spade = "s"
const club = "c"
const diamond = "d"
const heart = "h"
const faceDown = "f"
const felt = "-"
const pentagram = "p"

let souls = 13
let bet = 1
let cursedRound = false
let devilMsg = ""
let gameStarted = false

const backupDeck = [2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K", "A"]
let cards = [backupDeck.slice(), backupDeck.slice(), backupDeck.slice(), backupDeck.slice()]
let dealerHand = []
let playerHand = []
let initialDrawDone = false
let gameOver = false

// Tense, atmospheric casino background loop
const casinoBgm = tune`
130.81: C3~100, 164.81: E3~100, 196.00: G3~100, 246.94: B3~200,
196.00: G3~100, 164.81: E3~100, 123.47: B2~200,
110.00: A2~100, 130.81: C3~100, 164.81: E3~100, 220.00: A3~300
`
const drawSfx = tune`
83.10249307479225: A4/83.10249307479225,
83.10249307479225: C5/83.10249307479225,
83.10249307479225: A4/83.10249307479225,
83.10249307479225: C5/83.10249307479225,
83.10249307479225: A4/83.10249307479225,
2243.7673130193907`
const hitSfx = tune`
54.844606946983546: B4~54.844606946983546,
54.844606946983546: C5~54.844606946983546,
54.844606946983546: E5~54.844606946983546,
54.844606946983546: B5~54.844606946983546,
1535.6489945155392`
const loseSfx = tune`
111.11111111111111: B4~111.11111111111111,
111.11111111111111: A4~111.11111111111111,
111.11111111111111: E4~111.11111111111111,
111.11111111111111: C4~111.11111111111111,
3111.1111111111113`
const creditSfx = tune`
101.35135135135135: B5-101.35135135135135,
3141.891891891892`
const winSfx = tune`
112.35955056179775: A4^112.35955056179775 + C5^112.35955056179775 + F5^112.35955056179775,
224.7191011235955,
112.35955056179775: C5^112.35955056179775,
112.35955056179775: D5^112.35955056179775,
112.35955056179775: E5^112.35955056179775,
112.35955056179775: F5^112.35955056179775,
224.7191011235955,
112.35955056179775: F5^112.35955056179775,
2471.9101123595506`
const pushSfx = tune`
135.74660633484163: E4^135.74660633484163,
271.49321266968326,
135.74660633484163: E4^135.74660633484163,
3800.9049773755655`

setLegend(
  [felt, bitmap`22222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222`],
  [spade, bitmap`.00000000000000.066666666666666006666..00..666600666..0000..6660066..000000..66006..00000000..6006000000000000000600000000000000006.0000000000.6006...000000...6006....0000....6006...000000...60066666666666666006666666666666600666666666666660.00000000000000.`],
  [club, bitmap`.00000000000000.06666666666666600666..0000..6660066..000000..660066..000000..66006.000.00.000.6006000000000000000600000000000000006.000..00..0000066...0000...660066..000000..660066.00000000.660066666666666666006666666666666600666666666666660.00000000000000.`],
  [heart, bitmap`.00000000000000.0666666666666660066.333..333.66006.33333.33333.6006333333333333330063333333333333300633333333333333006.33333333333.6006..333333333..6006...3333333...6006....3333....6006.....333.....600666666666666666006666666666666600666666666666660.00000000000000.`],
  [diamond, bitmap`.00000000000000.066666666666666006666...33...6600666...3333...60066...333333..6006...33333333..6006..3333333333.6006.333333333333006.333333333333006..3333333333.6006...33333333..60066...333333..600666666666666666006666666666666600666666666666660.00000000000000.`],
  [faceDown, bitmap`.11111111111111.166666666666666116111111111111611611.11..11.11611611..1111..116116111..11..11161161111....11116116111..11..111611611..1111..11611611.11..11.116116111111111111611611111111111161166666666666666116666666666666611666666666666661.11111111111111.`],
  [pentagram, bitmap`...................333..................3333333........33333333333.....333333333333333..3333333...3333333..33333.......33333..333...........333.........................................................................................`]
)

setMap(map`
----------------
----------------
----------------
----------------
----------------
----------------
----------------
----------------
----------------
----------------`)

playTune(casinoBgm, true);
showTitleScreen();

function showTitleScreen() {
  clearText();
  for (let x = 2; x < 14; x += 3) {
    addSprite(x, 1, pentagram);
    addSprite(x, 8, pentagram);
  }
  // Centered using proper coordinate offsets (each letter takes ~1 character width space)
  addText("=== * ===", { x: 3, y: 3, color: color`3` });
  addText("DEVILS", { x: 5, y: 4, color: color`3` });
  addText("BLACKJACK", { x: 3, y: 5, color: color`3` });
  addText("=== * ===", { x: 3, y: 6, color: color`3` });
  addText("PRESS J TO WAGER", { x: 1, y: 9, color: color`0` });
}

function updateHUD() {
  if (!gameStarted) return;
  addText("                ", { x: 0, y: 0, color: color`0` })
  addText("Souls:" + souls + "/13 I:START", { x: 0, y: 0, color: color`0` })

  addText("                ", { x: 0, y: 1, color: color`0` })
  if (devilMsg !== "") {
    addText(devilMsg, { x: 0, y: 1, color: color`3` })
  }

  addText("Dealer's hand", { x: 3, y: 2, color: color`0` })
  addText("Your hand", { x: 3, y: 7, color: color`0` })
}

function getRandomCard() {
  let suitIndex = Math.floor(Math.random() * 4)
  return [suitIndex, cards[suitIndex].splice(Math.floor(Math.random() * cards[suitIndex].length), 1)]
}

function numToSuit(num) {
  switch (num) {
    case 0: return spade;
    case 1: return club;
    case 2: return heart;
    case 3: return diamond;
    default: return spade;
  }
}

function displayDealerCards(end) {
  for (let i = 0; i < dealerHand.length; i++) {
    let posX = i * 2 + 1;
    if (posX > 14) posX = 14;
    if (!end && i === dealerHand.length - 1) {
      addSprite(posX, 2, faceDown)
      continue
    } else if (end) clearTile(posX, 2)
    addSprite(posX, 2, numToSuit(dealerHand[i][0]))
    addText(`${dealerHand[i][1]}`, { y: 5, x: posX * 2 })
  }
}

function displayPlayerCards() {
  for (let i = 0; i < playerHand.length; i++) {
    let posX = i * 2 + 1;
    if (posX > 14) posX = 14;
    addSprite(posX, 4, numToSuit(playerHand[i][0]))
    addText(`${playerHand[i][1]}`, { y: 9, x: posX * 2 })
  }
}

function handTotal(hand) {
  let aces = 0
  let sum = 0
  for (let i = 0; i < hand.length; i++) {
    let val = hand[i][1][0];
    if (val === "A") {
      if (cursedRound) {
        sum += 10;
      } else {
        aces++
        sum += 11
      }
    } else if (["K", "Q", "J"].includes(val)) {
      sum += 10;
    } else {
      sum += val;
    }
  }
  if (!cursedRound) {
    while (aces > 0 && sum > 21) {
      sum -= 10
      aces--
    }
  }
  return sum
}

function playerWin(blackjack) {
  playTune(winSfx)
  addText("                ", { x: 0, y: 9, color: color`0` })
  addText("You Win! +Souls", { x: 0, y: 9, color: color`0` })
  if (blackjack) { souls += Math.floor(bet * 2.5) } else { souls += bet * 2 } 
  bet = 1
  gameOver = true
  initialDrawDone = false
  updateHUD()
}

function dealerWin() {
  playTune(loseSfx)
  addText("                ", { x: 0, y: 9, color: color`0` })
  addText("Devil Wins!     ", { x: 0, y: 9, color: color`0` })
  souls -= bet;
  bet = 1
  if (souls <= 0) {
    gameOver = true;
    addText("                ", { x: 0, y: 9, color: color`0` })
    addText("GAME OVER!      ", { x: 0, y: 9, color: color`3` })
  } else {
    gameOver = true
  }
  initialDrawDone = false
  updateHUD()
}

function pushGame() {
  playTune(pushSfx)
  addText("                ", { x: 0, y: 9, color: color`0` })
  addText("Push! Safe.     ", { x: 0, y: 9, color: color`0` })
  bet = 1
  gameOver = true
  initialDrawDone = false
  updateHUD()
}

function resetGame() {
  if (souls <= 0) {
    souls = 13;
  }
  gameOver = false
  clearText()
  cards = [backupDeck.slice(), backupDeck.slice(), backupDeck.slice(), backupDeck.slice()]
  playerHand = []
  dealerHand = []
  devilMsg = ""
  cursedRound = false
  for (let y = 2; y <= 5; y++) {
    for (let x = 0; x < width(); x++) {
      clearTile(x, y);
    }
  }
  updateHUD()
}

function dealerTurn() {
  let playerTotal = handTotal(playerHand)
  displayDealerCards(true)
  while (handTotal(dealerHand) <= 16 && dealerHand.length < 5) {
    dealerHand.push(getRandomCard())
    displayDealerCards(true)
  }
  let dealerTotal = handTotal(dealerHand);
  if (dealerTotal > 21) {
    playerWin()
  } else if (dealerTotal > playerTotal) {
    dealerWin()
  } else if (dealerTotal === playerTotal) {
    pushGame()
  } else {
    playerWin()
  }
}

// Controls Logic
onInput("i", () => {
  if (gameStarted && !initialDrawDone && !gameOver && souls > 0) {
    let eventRoll = Math.random();
    if (eventRoll < 0.25) {
      cursedRound = true;
      devilMsg = "CURSED: ACE = 10";
    } else if (eventRoll < 0.45) {
      devilMsg = "DEVIL'S SNATCH!";
    }

    playerHand.push(getRandomCard())
    dealerHand.push(getRandomCard())
    playerHand.push(getRandomCard())
    dealerHand.push(getRandomCard())

    if (devilMsg === "DEVIL'S SNATCH!") {
      let idx = Math.floor(Math.random() * playerHand.length);
      playerHand[idx] = getRandomCard();
    }

    playTune(drawSfx)
    displayDealerCards(false)
    displayPlayerCards()
    initialDrawDone = true
    updateHUD()

    if (handTotal(playerHand) === 21) {
      displayDealerCards(true)
      playerWin(true)
    }
  }
})

// W: Hit
onInput("w", () => {
  if (gameStarted && initialDrawDone && !gameOver) {
    playerHand.push(getRandomCard())
    displayPlayerCards()
    playTune(hitSfx)

    if (playerHand.length === 5 && handTotal(playerHand) <= 21) {
      displayDealerCards(true)
      playerWin()
      return;
    }

    let pTotal = handTotal(playerHand);
    if (pTotal > 21) {
      displayDealerCards(true)
      dealerWin()
    } else if (pTotal === 21) {
      dealerTurn()
    }
  }
})

// A: Stay / Stand
onInput("a", () => {
  if (gameStarted && initialDrawDone && !gameOver) {
    dealerTurn()
  }
})

// J: New Match / Reset / Title Start
onInput("j", () => {
  if (!gameStarted) {
    gameStarted = true;
    resetGame();
    playTune(creditSfx);
    updateHUD();
  } else if (gameOver || !initialDrawDone) {
    resetGame();
    playTune(creditSfx);
    updateHUD();
  }
})