/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: lader climber 1
@author: judeprivett2012@gmail.com 
@tags: [retro]
@addedOn: 2025-00-00
just added a fix to the level this is just a retro ladder game with the goal of doing every bird ad you go up to the top of the letter attempting to get to the Golden hammer and beat every level without having to reset!!

*/

let isFrozen = false; // Define isFrozen variable at the beginning

const player = "p"
const lader = "l"
const background = "b"
const ghammer = "g"
const bird = "i"
setLegend(
    [ player, bitmap`
................
................
......LL........
.....L66L.......
....L6666L......
...LLLLLLLL.....
..L.L5225L.L....
..L.L5225L.L....
..LLL2L52LLL....
....LL22LL......
.....LLLL.......
.....L..L.......
....LL..LL......
................
................
................`],
    [ lader, bitmap`
...C0000000C....
...CCCCCCCCC....
...C0000000C....
...C0000000C....
...C0000000C....
...CCCCCCCCC....
...C0000000C....
...C0000000C....
...C0000000C....
...CCCCCCCCC....
...C0000000C....
...C0000000C....
...C0000000C....
...CCCCCCCCC....
...C0000000C....
...C0000000C....`],
    [ background, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
    [ ghammer, bitmap`
................
................
................
......6.........
....6666........
....66666.......
......6.........
......6.........
......6.........
................
................
................
................
................
................
................`],
    [ bird, bitmap`
................
................
............F...
...........F2F..
..........F2F...
....FFF..FFFF...
...FF22FF2222FF.
....FFF..F2FFF..
..........F2F...
..........F2F...
...........F....
................
................
................
................
................`]
)
let level = 0
const levels = [
    map`
blglbb
blilbb
blllbb
bllibb
bbllbb
bbllbb
bllllb
blillb
bllilb
bllllb
bllllb
bbilbb
bbllbb
bbllbb
bbplbb`,
    map`
blgb
bilb
bllb
bllb
blib
bllb
bllb
bilb
bllb
bllb
bpib`,
    map`
bblgbb
bbilbb
bbllbb
bblllb
bblilb
bllllb
blillb
bllllb
bbllbb
blilbb
blillb
bllilb
bllllb
bllllb
bbplbb`,
    map`
bbgib
bbllb
bbllb
bblib
bbilb
bbllb
blllb
bllib
billb
blllb
blllb
blilb
blllb
blllb
blplb`,
    map`
bigib
blllb
bllib
bliib
blllb
bllib
billb
blllb
blllb
bilib
blllb
blllb
blilb
blllb
blllb
bilib
blllb
blllb
blplb`,
    map`
bbigbb
billbb
blllbb
blllbb
blilbb
bllibb
blllbb
bllilb
blillb
bllilb
bllllb
bblllb
bbillb
bblllb
bbplbb`,
    map`
blglb
blilb
bllib
blllb
billb
blilb
blilb
blllb
blllb
bilib
blllb
blllb
blilb
bllib
blllb
billb
blilb
blllb
billb
bllib
blplb`,
    map`
bigib
blllb
bilib
blllb
blllb
bliib
blllb
blllb
billb
blllb
blllb
blilb
bllib
blllb
bilib
blllb
billb
blilb
blllb
blllb
bilib
blllb
billb
blplb`,
    map`
biilgib
blllllb
blilllb
bililib
blllllb
blllllb
blililb
blllllb
bilillb
blllllb
blllilb
blilllb
bllllib
bilillb
blllllb
blllilb
bliillb
billllb
blllllb
bllillb
blllllb
billlib
blilllb
bllpllb`,
    map`
biigiiib
biiliilb
bllliilb
billllib
bllllllb
bllllllb
bliliilb
bllilllb
bllilllb
billlllb
blllilib
bllilllb
bllllllb
bilililb
blllillb
blllillb
billlllb
blilillb
blllllib
billlllb
bllililb
blllillb
bllllllb
blllpllb`,
    map`
blllglllb
bliiliilb
billllllb
bllilillb
blilllllb
bllllllib
bllilillb
billllllb
blllllilb
blllilllb
blilllllb
bllllilib
blllllllb
billilllb
bllillllb
bllillilb
billlllib
bllilillb
bllllllib
blilllllb
blllllllb
bililliib
blllllllb
blllplllb`,
    map`
bbgibb
bbllbb
bbllbb
blillb
bllilb
bllllb
bllllb
bbillb
bblllb
bbllbb
bblibb
blllbb
blilbb
blllbb
blplbb`,
    map`
bblglb
bbiilb
bblllb
bbillb
bbllbb
blllbb
bllibb
blilbb
blllbb
blllbb
bllibb
blllbb
bllllb
bliilb
bllllb
bllplb`,
    map`
bllllglllb
biillllllb
bllllillib
bllilllllb
bllllllllb
blliliillb
bllllllllb
blllillllb
blillllilb
blllllllib
bllililllb
billlllllb
bllilililb
bllllllllb
blilliillb
bllillllib
bllllllllb
blilllillb
billillilb
bllllllllb
bllililllb
bllllllilb
billillllb
bllllplllb`,
    map`
blillllllgb
bllllillllb
billlllillb
bllililllib
blillllillb
blllilllllb
blllllllllb
billilllilb
bllllllillb
bllilllillb
bliiilillib
blllliillib
blilllllilb
blliliilllb
blllllllilb
billllllllb
bllilllillb
billllilllb
blllillillb
bllllillllb
bllllillllb
bilillliilb
blllllllllb
bllllpllllb`,
    map`
biiigiiiiiib
bllllllllllb
bllllllilllb
blillilllllb
bililllilllb
bllllllllllb
bllllllllilb
blililillllb
bllllllilllb
bllllillillb
bllllllllllb
billllillllb
blllillllilb
blllllllillb
bllllilllllb
blllillilllb
blllillllllb
blilllilllib
blllllllillb
bllllllllllb
bllliilililb
blililllillb
blllllpllllb`,
    map`
bbigbb
bbilbb
bbllbb
bbllbb
bbilbb
bblllb
bblilb
bblllb
bblllb
bbilbb
bbllbb
bbllbb
bllilb
blillb
bllllb
bllpbb`,
    map`
bbglbb
bbilbb
bbilbb
bbllbb
blillb
bllilb
bllllb
bllllb
bbilbb
bbllbb
bbilbb
bblllb
bliilb
blillb
bllllb
bllpbb`,
    map`
bblgbb
bbllbb
bblibb
bbllbb
bbllbb
bbilbb
bbllbb
bbllbb
bblibb
blllbb
blillb
bllilb
bllllb
blillb
bllllb
bllplb`,
    map`
bblgbb
bblibb
bblilb
bllllb
blilbb
bllibb
blllbb
blllbb
bbillb
bblllb
bblilb
bblllb
bbillb
blilbb
blllbb
bllpbb`,
    map`
bbigbb
bbllbb
bbllbb
blillb
bliilb
bllllb
bblllb
bbillb
bllllb
bllilb
bllllb
bllllb
bblilb
bbillb
bblllb
bblpbb`,
    map`
bligbb
blllbb
bbillb
bblilb
bblllb
bblllb
bblibb
blllbb
blilbb
blllbb
bllibb
bblllb
bblilb
bblllb
bbilbb
bblpbb`,
]
setMap(levels[level])

setBackground(background)

setSolids([ player, bird, background ])

setPushables({
    [ player ]: []
})
let isGameActive = true; // Define a variable to track game activity

// Define key stroke handlers for movement
const keyHandlers = () => {
    let isMovementStopped = false; // Variable to track if the movement should be stopped

    onInput("a", () => {
        if (!isGameActive || isMovementStopped) return; // Check if the game is active and movement is allowed
        const playerSprite = getFirst(player);
        if (playerSprite) playerSprite.x -= 1; // Move left by decreasing x-coordinate
    });

    onInput("d", () => {
        if (!isGameActive || isMovementStopped) return; // Check if the game is active and movement is allowed
        const playerSprite = getFirst(player);
        if (playerSprite) playerSprite.x += 1; // Move right by increasing x-coordinate
    });
    onInput("l", () => {
    // Increment the level by 1
      level += 1;

    // Check if the new level is within the bounds of the levels array
    if (level >= levels.length) {
        // Reset to the first level if the end is reached
        level = 0;
    }

    // Set the new level
    setMap(levels[level]);
    });

    let moveUpInterval = null;

    onInput("w", () => {
        if (!isGameActive || isMovementStopped) return; // Check if the game is active and movement is allowed
        moveUpInterval = setInterval(() => {
            const playerSprite = getFirst(player);
            if (playerSprite) {
                playerSprite.y -= 1; // Move up by decreasing y-coordinate
                // Check for collisions with the bird sprite
                const tilesInFront = getTile(playerSprite.x, playerSprite.y - 1);
                for (const tile of tilesInFront) {
                    if (tile.type === bird) {
                        clearInterval(moveUpInterval); // Stop the vertical movement on collision with the bird
                        isMovementStopped = true; // Set the flag to stop all p
                      clearText(); // Clear existing text on the screen
                      addText("Reset Game", { x: 5, y: 8, color: color`3` }); // Display reset message
                      break;
                    }
                }
            }
        }, 127); // Adjust the interval time (100ms) as needed for desired speed
    });
};

keyHandlers(); // Call the function to define initial key stroke handlers

afterInput(() => {
    let playerSprite = getFirst(player);
    // Additional game logic after handling player movement
});            
