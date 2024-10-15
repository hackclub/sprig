function roll() {
    const minValue = 1;
    const maxValue = 6;
    return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
}

let players;
while (true) {
    players = prompt('Enter the number of players (2-4):');
    if (players !== null && !isNaN(players)) {
        players = parseInt(players);
        if (players >= 2 && players <= 4) {
            break;
        } else {
            console.log("Must be between 2 - 4 Players");
        }
    } else {
        console.log("Invalid input, please try again :(");
    }
}

const maxScore = 50;
const playerScore = Array(players).fill(0);

while (Math.max(...playerScore) < maxScore) {
    for (let playerIndex = 0; playerIndex < players; playerIndex++) {
        console.log(`Player number ${playerIndex + 1} turn has just started!\n`);
        console.log(`Your total score is: ${playerScore[playerIndex]}\n`);
        let currentScore = 0;

        while (true) {
            const shouldRoll = prompt("Would you like to roll (y)?");
            if (shouldRoll === null || shouldRoll.toLowerCase() !== "y") {
                break;
            }
            const value = roll();
            if (value === 1) {
                console.log("You rolled 1! Turn done!");
                currentScore = 0;
                break; // End the turn if the player rolls a 1
            } else {
                currentScore += value;
                console.log(`You rolled: ${value}`);
            }
        }

        playerScore[playerIndex] += currentScore;
        console.log(`Your total score: ${playerScore[playerIndex]}`);
    }
}

// Determine the winner
const maxPlayerScore = Math.max(...playerScore);
const winningIndex = playerScore.indexOf(maxPlayerScore);
console.log(`Player number ${winningIndex + 1} is the winner with the score of: ${maxPlayerScore}`);
