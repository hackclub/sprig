/*
@title: black_jack
@author: xevaly
@tags: ['retro']
@addedOn: 2022-12-21

Before the game starts, the player can adjust their bet size by pressing the "I" key to increase the bet size and the "K" key to decrease it.

When the player is ready to start the game, they can press the "J" key to begin.

The player and the dealer will be dealt one card.

The player can then choose to hit by pressing the "H" key, stand by pressing the "S" key, or double down by pressing the "D" key.

If the player chooses to hit, they will receive an additional card and their hand value will be recalculated. The player can continue to hit until they choose to stand, or until their hand exceeds a value of 21, at which point they lose the game (this is called "busting").

If the player chooses to stand, their turn is over and the dealer will start their turn.

The dealer's turn is automated according to the rules of the game (hit if their hand value is less than 17, stand if their hand value is 17 or higher).

If the dealer busts, the player wins the game. If the dealer does not bust, then the player's hand is compared to the dealer's hand, and whoever has the hand closest to a value of 21 without going over wins. If the player and dealer have the same hand value, the game is a tie, or "push."

To play another Round with the same bet size simply press "A" or get back to the main menu by pressing "L".

*/
const heart = "a";
const diamond = "b";
const spades = "c";
const clubs = "d";

const cardTL = "e";
const cardTR = "f";
const cardTM = "g";
const cardBL = "h";
const cardBR = "i";
const cardBM = "j";
const cardLS = "k";
const cardRS = "l";
const empty = "m";

const two = "2";
const three = "3";
const four = "4";
const five = "5";
const six = "6";
const seven = "7";
const eight = "8";
const nine = "9";
const ten = "0";
const jack = "J";
const queen = "Q";
const king = "K";
const ace = "A";

const lookup = {
    "2": two,
    "3": three,
    "4": four,
    "5": five,
    "6": six,
    "7": seven,
    "8": eight,
    "9": nine,
    "10": ten,
    "j": jack,
    "q": queen,
    "k": king,
    "a": ace,
    "h": heart,
    "s": spades,
    "c": clubs,
    "d": diamond
}

const cardValue = {
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "10": 10,
    "j": 10,
    "q": 10,
    "k": 10,
    "a": 11
}


setMap(map`
.................
.................
.................
.................
.................
.................
.................
.................
.................`);
setBackground(empty);

const cardSet = ["h2", "h3", "h4", "h5", "h6", "h7", "h8", "h9", "h10", "hj",
    "hq", "hk", "ha", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9", "s10",
    "sj", "sq", "sk", "sa", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9",
    "c10", "cj", "cq", "ck", "ca", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9",
    "d10", "dj", "dq", "dk", "da"
]

for (let i = 0; i <= 6; i++) {
    cardSet.push(...cardSet);
}

setLegend(
    [cardTL, bitmap`
................
................
................
.............000
..........000444
........00444444
......0044444444
......0444444444
.....04444444444
.....04444444444
....044444444444
....044444444444
....044444444444
...0444444444444
...0444444444444
...0444444444444`],
    [cardTR, bitmap`
................
................
................
000.............
666000..........
44466600........
4444666600......
4444446660......
44444446660.....
44444444660.....
444444444660....
444444444460....
444444444460....
4444444444460...
4444444444460...
4444444444460...`],
    [cardTM, bitmap`
................
................
................
0000000000000000
4444444444464466
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
    [cardBL, bitmap`
...0DD4444444444
...0DD4444444444
...0DD4444444444
....0DD444444444
....0DD444444444
....0DDD44444444
.....0DDD4444444
.....0DDDD444444
......0DDDD44444
......00DDDDD444
........00DDDDDD
..........000DDD
.............000
................
................
................`],
    [cardBR, bitmap`
4444444444440...
4444444444440...
4444444444440...
444444444440....
444444444440....
444444444440....
44444444440.....
44444444440.....
4444444440......
4444444400......
44444400........
444000..........
000.............
................
................
................`],
    [cardBM, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
DDDDD4DDD4D4D444
0000000000000000
................
................
................`],
    [cardLS, bitmap`
...0444444444444
...0444444444444
...0444444444444
...0444444444444
...0D44444444444
...0444444444444
...0D44444444444
...0D44444444444
...0D44444444444
...0444444444444
...0D44444444444
...0D44444444444
...0D44444444444
...0D44444444444
...0D44444444444
...0D44444444444`],
    [cardRS, bitmap`
4444444444460...
4444444444460...
4444444444460...
4444444444460...
4444444444440...
4444444444460...
4444444444440...
4444444444440...
4444444444440...
4444444444440...
4444444444440...
4444444444440...
4444444444440...
4444444444440...
4444444444440...
4444444444440...`],
    [empty, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
    [diamond, bitmap`
4444444444444444
4444444404444444
4444444030444444
4444440333044444
4444403333304444
4444033333330444
4440333333333044
4403333333333304
4403333333333304
4440333333333044
4444033333330444
4444403333304444
4444440333044444
4444444030444444
4444444404444444
4444444444444444`],
    [spades, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444000444444
4444440000044444
4444440000044444
4444440000044444
4440004000400044
4400000404000004
4400000000000004
4400000404000004
4440004404400044
4444444000444444
4444444000444444
4444440000044444
4444444444444444`],
    [heart, bitmap`
4444444444444444
4444000444000444
4440333040333044
4403333303333304
4033333333333330
4033333333333330
4033333333333330
4033333333333330
4403333333333304
4440333333333044
4444033333330444
4444403333304444
4444440333044444
4444444030444444
4444444404444444
4444444444444444`],
    [clubs, bitmap`
4444444444444444
4444444404444444
4444444000444444
4444444000444444
4444440000044444
4444440000044444
4444000000000444
4440000000000044
4440000000000044
4440000000000044
4444000404000444
4444444404444444
4444444000444444
4444444000444444
4444440000044444
4444444444444444`],
    [two, bitmap`
4444444444444444
4444444444444444
4444440000044444
4444400000004444
4444000440004444
4444004444004444
4444444440004444
4444444400044444
4444444000444444
4444440004444444
4444400044444444
4444000000004444
4444000000004444
4444444444444444
4444444444444444
4444444444444444`],
    [three, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444000000004444
4444000000004444
4444444440004444
4444444000044444
4444444000044444
4444444440004444
4444444444004444
4444004440004444
4444000000044444
4444400000444444
4444444444444444
4444444444444444
4444444444444444`],
    [four, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444440000044444
4444400000044444
4444000440044444
4440004440044444
4440044440044444
4440000000000444
4440000000000444
4444444440044444
4444444440044444
4444444440044444
4444444444444444
4444444444444444
4444444444444444`],
    [five, bitmap`
4444444444444444
4444444444444444
4444000000004444
4444000000004444
4444004444444444
4444004444444444
4444000000444444
4444400000044444
4444444440004444
4444444444004444
4444444440004444
4444000000004444
4444000000044444
4444444444444444
4444444444444444
4444444444444444`],
    [six, bitmap`
4444444444444444
4444444444444444
4444444400044444
4444444000044444
4444400004444444
4444000044444444
4444004444444444
4444004000044444
4444000000004444
4444000444000444
4444004444400444
4444004444400444
4444000444000444
4444400000004444
4444440000044444
4444444444444444`],
    [seven, bitmap`
4444444444444444
4444444444444444
4444000000000444
4444000000000444
4444004444400444
4444444444400444
4444444444000444
4444444440004444
4444444400044444
4444444000444444
4444444004444444
4444444004444444
4444444004444444
4444444004444444
4444444444444444
4444444444444444`],
    [eight, bitmap`
4444444444444444
4444440000444444
4444400000044444
4444004444004444
4444004444004444
4444004444004444
4444400000044444
4444000000004444
4440044444400444
4440044444400444
4440044444400444
4440044444400444
4444000000004444
4444400000044444
4444444444444444
4444444444444444`],
    [nine, bitmap`
4444444444444444
4444444444444444
4444400000444444
4444000000044444
4444004440044444
4444004440044444
4444000000044444
4444400000044444
4444444440044444
4444444440044444
4444444400444444
4444444400444444
4444444000444444
4444444004444444
4444444444444444
4444444444444444`],
    [ten, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444004440000444
4440004400000044
4400004400440044
4400004400440044
4400004400440044
4444004400440044
4444004400440044
4444004400440044
4444004400000044
4444004440000444
4444444444444444
4444444444444444
4444444444444444`],
    [jack, bitmap`
4444444444444444
4444444444444444
4444000000000444
4444000000000444
4444444444400444
4444444444400444
4444444444400444
4444444444400444
4444444444400444
4444444444400444
4444004444400444
4444000444000444
4444400000000444
4444440000044444
4444444444444444
4444444444444444`],
    [queen, bitmap`
4444444444444444
4444444444444444
4444000000044444
4440000000044444
4440044444004444
4440044444004444
4440044444004444
4440044444004444
4440044444004444
4440044400004444
4440004400004444
4444000000004444
4444000000000444
4444444444400444
4444444444444444
4444444444444444`],
    [king, bitmap`
4444444444444444
4444444444444444
4444400444004444
4444400444004444
4444400440004444
4444400400044444
4444400000444444
4444400004444444
4444400004444444
4444400000444444
4444400400044444
4444400440004444
4444400444000444
4444400444400444
4444444444444444
4444444444444444`],
    [ace, bitmap`
4444444444444444
4444444444444444
4444400000044444
4444000000004444
4444004444004444
4444004444004444
4444004444004444
4444004444004444
4444000000004444
4444000000004444
4444004444004444
4444004444004444
4444004444004444
4444444444444444
4444444444444444
4444444444444444`]
)


function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

function drawCard(val, num, x, y) {
    addSprite(x, y, cardTL);
    addSprite(x, y + 1, cardLS);
    addSprite(x, y + 2, cardLS);
    addSprite(x + 1, y, cardTM);
    addSprite(x + 2, y + 1, cardRS);
    addSprite(x + 2, y + 2, cardRS);
    addSprite(x + 1, y + 3, cardBM);
    addSprite(x, y + 3, cardBL);
    addSprite(x + 2, y, cardTR);
    addSprite(x + 2, y + 3, cardBR);
    addSprite(x + 1, y + 1, val);
    addSprite(x + 1, y + 2, lookup[num.toString()]);
}

function showHand(cards, is_dealer) {
    let i = 0;
    cards.forEach(card => {
        // console.log(card);
        drawCard(lookup[card[0]], card.slice(1), 4 * !is_dealer + i * 2, 1 + 3 * !is_dealer);
        i++;
    })
}

function updateGUI() {
    clearText();
    addText("You:", {
        x: 1,
        y: 9,
        color: color`0`
    })

    addText(`D: ${calculateHandValue(dealerHand)} - P: ${calculateHandValue(playerHand)}`, {
        x: 1,
        y: 3,
        color: color`0`
    });

    addText(`Bet: ${betSize}   Bal: ${cash}`, {
        x: 1,
        y: 12,
        color: color`0`
    });

}

function calculateHandValue(cards) {
    let sumCards = 0;
    let amountOfAce = 0;
    cards.forEach(card => {
        if (card.slice(1) == "a") {
            amountOfAce++;
        }

        sumCards += cardValue[card.slice(1)];

        if (sumCards > 21 && amountOfAce > 0) {
            amountOfAce--;
            sumCards -= 10;
        }
    })

    return sumCards;
}

function fillDealerCards() {
    while (calculateHandValue(dealerHand) < 17) {
        let newCard = deck.pop();
        dealerHand.push(newCard);

        updateGUI();

        showHand(dealerHand, true);
    }
}

function roundStart() {
    setMap(map`
.................
.................
.................
.................
.................
.................
.................
.................
.................`);
    setBackground(empty);
    clearText();
    addText("BlackJack", {
        x: 6,
        y: 3,
        color: color`0`
    });
    addText("Press J to start", {
        x: 2,
        y: 5,
        color: color`0`
    });
    addText(`Bal: ${cash} Bet: ${betSize}`, {
        x: 2,
        y: 8,
        color: color`0`
    });
    addText("> K +10 / I -10", {
        x: 2,
        y: 10,
        color: color`0`
    });
}



let deck = shuffle([...cardSet]);
let playerHand = [deck.pop()];
let dealerHand = [deck.pop()];
let gameOver = false;
let beforeRound = true;
let cash = 500;
let betSize = 10;
let doubleDown = false;
let cashedOut = false;

roundStart()


// w = Hit
onInput("w", () => {
    if (gameOver || beforeRound) return;
    playerHand.push(deck.pop());
    showHand(playerHand, false);
});

// d = Double Down
onInput("d", () => {
    if (gameOver || beforeRound) return;
    playerHand.push(deck.pop());
    showHand(playerHand, false);
    cash -= betSize;
    updateGUI();
    doubleDown = true;
    gameOver = true;
});

// s = Stand
onInput("s", () => {
    if (gameOver || beforeRound) return;
    gameOver = true;
    fillDealerCards();
});

// a = restart
onInput("a", () => {
    if (!gameOver || beforeRound) return
    setMap(map`
.................
.................
.................
.................
.................
.................
.................
.................
.................`)
    setBackground(empty)

    deck = shuffle([...cardSet]);
    cash -= betSize;
    playerHand = [deck.pop()];
    dealerHand = [deck.pop()];
    gameOver = false;
    doubleDown = false;

    updateGUI();
    showHand(dealerHand, true);
    showHand(playerHand, false);
});

// i = upper bet
onInput("i", () => {
    if (!beforeRound || (cash < betSize + 10)) return
    betSize += 10;
    roundStart();
})

// k = lower bet
onInput("k", () => {
    if (betSize == 10 || !beforeRound) return
    betSize -= 10;
    roundStart();
})


// j = start round
onInput("j", () => {
    if (!beforeRound) return
    beforeRound = false;
    cash -= betSize;
    showHand(dealerHand, true);
    showHand(playerHand, false);
})

// l = back to beforeRound
onInput("l", () => {
    if (!gameOver) return
    beforeRound = true;
    roundStart();
})

afterInput(() => {
    if (beforeRound) return

    updateGUI();
    if (calculateHandValue(playerHand) > 21) {
        gameOver = true;
    } else if (calculateHandValue(playerHand) == 21) {
        gameOver = true;
    }

    if (gameOver) {
        fillDealerCards();
        updateGUI();

        let playerVal = calculateHandValue(playerHand);
        let dealerVal = calculateHandValue(dealerHand);


        if (playerVal > 21) {
            addText("Busted!", {
                x: 10,
                y: 5,
                color: color`0`
            });
        } else if (playerVal == 21 && dealerVal != 21) {
            addText("Black Jack!", {
                x: 9,
                y: 5,
                color: color`0`
            });
            if (!cashedOut) {
                cash += 2.5 * betSize + 2.5 * betSize * doubleDown;
                cashedOut = true;
            }

        } else if (dealerVal > 21 || dealerVal < playerVal) {
            addText("You won!", {
                x: 10,
                y: 5,
                color: color`0`
            });
            if (!cashedOut) {
                cash += 2 * betSize + 2 * betSize * doubleDown;
                cashedOut = true;
            }
        } else if (dealerVal > playerVal || (dealerVal == 21 && playerVal < 21)) {
            addText("You lost!", {
                x: 10,
                y: 5,
                color: color`0`
            });

        } else if (dealerVal == playerVal) {
            addText("Push!", {
                x: 10,
                y: 5,
                color: color`0`
            });
            if (!cashedOut) {
                cash += betSize + betSize * doubleDown;
                cashedOut = true;
            }

        }
    }
});
