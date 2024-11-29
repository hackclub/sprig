function startGame() {
    const endings = [
        "You find a hidden treasure! Ending 1: Rich Beyond Dreams.",
        "You defeat the beast but get injured. Ending 2: Brave Survivor.",
        "You escape safely but remain lost. Ending 3: Forever Lost.",
        "Friendly travelers rescue you. Ending 4: Rescued.",
        "You are never found. Ending 5: Forgotten.",
        "You become the ruler of a hidden kingdom. Ending 6: The Hidden Monarch.",
        "You accidentally unleash an ancient curse. Ending 7: The Cursed Wanderer.",
        "Secret Ending: You find a mysterious laptop, and the developer congratulates you! 'Welcome, fellow coder!'",
    ];

    let isPlaying = true;

    while (isPlaying) {
        console.clear();
        console.log("Welcome to the untitled Game Ultra Paradox(W.I.P)!");
        console.log(
            "Make choices, solve puzzles, and uncover secrets to determine your fate.\n"
        );

        let choice1 = prompt(
            "You wake up in a mysterious forest. Do you:\n1. Explore\n2. Stay put\n3. Solve the riddle on a nearby tree trunk (Hint: Easter egg?)"
        );

        if (choice1 === "1") {
            let choice2 = prompt(
                "You come across a fork in the road. Do you:\n1. Go left\n2. Go right\n3. Follow the faint sound of water"
            );

            if (choice2 === "1") {
                let puzzleAnswer = prompt(
                    "You find a locked door with a puzzle: 'What has keys but can't open doors?'\n(Type your answer)"
                );
                if (puzzleAnswer.toLowerCase() === "piano") {
                    alert(
                        "The door opens, revealing a grand throne room. " +
                            endings[5]
                    ); 
                    isPlaying = false;
                } else {
                    alert(
                        "The door remains locked. A trap is triggered, and you're trapped. " +
                            endings[4]
                    ); 
                    isPlaying = false;
                }
            } else if (choice2 === "2") {
                let choice3 = prompt(
                    "You encounter a wild animal. Do you:\n1. Fight\n2. Run\n3. Solve a math puzzle to distract it"
                );
                if (choice3 === "1") {
                    alert(endings[1]);
                    isPlaying = false;
                } else if (choice3 === "2") {
                    alert(endings[2]); 
                    isPlaying = false;
                } else if (choice3 === "3") {
                    let mathPuzzle = prompt(
                        "Solve this to distract the animal: 12 + 24 / (6 * 2)"
                    );
                    if (parseInt(mathPuzzle) === 14) {
                        alert(
                            "The animal is distracted by your brilliance and leaves. " +
                                endings[0]
                        ); 
                        isPlaying = false;
                    } else {
                        alert(
                            "You failed the puzzle, and the animal chases you away. " +
                                endings[3]
                        ); 
                        isPlaying = false;
                    }
                }
            } else if (choice2 === "3") {
                alert(endings[0]); 
                isPlaying = false;
            }
        } else if (choice1 === "2") {
            let choice2 = prompt(
                "You hear voices approaching. Do you:\n1. Call for help\n2. Hide\n3. Climb a tree"
            );

            if (choice2 === "1") {
                alert(endings[3]); 
                isPlaying = false;
            } else if (choice2 === "2") {
                alert(endings[4]); 
                isPlaying = false;
            } else if (choice2 === "3") {
                let choice3 = prompt(
                    "From the tree, you spot a mysterious box. Do you:\n1. Climb down and open it\n2. Ignore it"
                );
                if (choice3 === "1") {
                    let boxPuzzle = prompt(
                        "The box has a combination lock. Solve this: 'I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?'"
                    );
                    if (boxPuzzle.toLowerCase() === "echo") {
                        alert(
                            "The box opens, revealing a crown. " + endings[5]
                        ); 
                        isPlaying = false;
                    } else {
                        alert(
                            "The box doesn't open, and you miss your chance. " +
                                endings[3]
                        ); 
                        isPlaying = false;
                    }
                } else {
                    alert(endings[2]);
                    isPlaying = false;
                }
            }
        } else if (choice1 === "3") 
            alert(
                "You find a mysterious laptop hidden under some leaves. The screen turns on, and you see this message:\n\n" +
                    endings[7]
            );
            isPlaying = false;
        } else {
            alert("Invalid choice. Try again!");
        }

        if (!isPlaying) {
            const playAgain = confirm("Do you want to play again?");
            if (playAgain) {
                isPlaying = true;
            } else {
                alert("Thanks for playing!");
            }
        }
    }
}

startGame();
