/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
@title: bannana run
@author: filiwal
@tags: []
@addedOn: 2025-00-00
*/
let timer = 0;
const player = "p";
const gravity = 1;
const player2 = "o";
const wall = "v";
const Fwall = "m";
const finish = "F";


setLegend(
  [player, bitmap`
................
................
.......000......
.......060......
......0660......
......06660.0...
....0007670.0...
....0.0666000...
....0.03330.....
......06660.....
.....066660.....
.....06660......
......000.......
......0.0.......
.....00.00......
................`],
  [player2, bitmap`
................
................
.......555......
.......5.5......
......55.5......
......5...5.5...
....5554.45.5...
....5.5...555...
....5.53335.....
......5...5.....
.....5....5.....
.....5...5......
......555.......
......5.5.......
.....55.55......
................`],
  [finish, bitmap`
................
................
.......111......
.......161......
......1161......
......16061.1...
....111H601.1...
....1.1666011...
....1.13331.....
......13631.....
.....166661.....
.....16661......
......111.......
......1.1.......
.....11.11......
................`],
  [wall, bitmap`
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
  [Fwall, bitmap`
00LL000000000000
000000000L000000
L000000000L0L000
0000L00000000L00
00L00000L0000000
000000000L0000L0
00000L0000000L00
L0L0L00000000000
00000000LL000000
0000000000000L00
00L000000L00L000
00L0LL0000000000
00000L000L000000
00L0000LL0000L00
000L000000000L00
0000000000000000`],
)

let level = 0
const levels = [
  map`
.........
...v.vvmv
.........
...v.....
....vv...
.........
.....v...
o..v.v...
pv.......`,
  map`
po.v.....
vmmv.....
v........
v..v.v..v
v..vv..v.
vv.v.v..v
.vvvv..v.
.....v..v
.........`,
  map`
.o..v....
vv..v....
.v.vvmv..
v...v...v
.vv.v....
v...v...v
.v.v....v
v......v.
pvv..v...`,
  map`
.....p.....
...........
...........
...........
.....m.....
....v.v....
...vv.vv...
..vv...vv..
.vv..o..vv.
vv...F...vv`,

]

const currentLevel = levels[level];
setMap(currentLevel);

setPushables({
  [player]: [player2],
  [player2]: [player],
  [player]: [Fwall],
  [player2]: [Fwall]
})

setSolids([wall, Fwall, player]);

let playerSprite;
let lastWInputTime = -Infinity; // Initialize last input time as negative infinity
const inputCooldown = 1000; // Set the cooldown time in milliseconds (e.g., 500ms)

onInput("w", () => {
  const currentTime = Date.now(); // Get the current time

  // Check if enough time has passed since the last "w" input
  if (currentTime - lastWInputTime >= inputCooldown) {
    lastWInputTime = currentTime; // Update the last input time

    // Your logic for handling the "w" input with cooldown
    getFirst(player).y -= 2;
  }
});
onInput("d", () => {
  getFirst(player).x += 1
});

onInput("a", () => {
  getFirst(player).x -= 1
});

afterInput(() => {
  const player1 = getFirst(player);
  const otherPlayer2 = getFirst(player2);
  const finish1 = getFirst(finish);

  if (player1 && otherPlayer2 && player1.x === otherPlayer2.x && player1.y === otherPlayer2.y) {
    level = (level + 1) % levels.length; // Cycle through levels
    setMap(levels[level]);
  }

  if (player1 && finish1 && player1.x === finish1.x && player1.y === finish1.y) {
    timerend = timer
    addText(`Time: ${timerend}s`, { x: 7, y: 2, color: color`7` }); // Display the timer
  }
});

setInterval(
  () => {
    Gravity(getFirst(player));
  }, 400
); // Apply gravity to the player sprite


function Gravity(player) {
  // Check if there is a solid block below the player
  if (getTile(player.x, player.y + 0.01).some(sprite => sprite.type === wall === 1)) {
    canJump = true;
  } else {
    player.y += 1;
  }
  const tileAbovePlayer = getTile(player.x, player.y - 1);

  // Check if there is a solid block above the player
  if (tileAbovePlayer.some(sprite =>  sprite.type === wall )) {
    player.y += 1; // Prevent jumping if there is a solid block above
  }
}

function timer_text(){
  addText(`Time: ${timer}s`, { x: 9, y: 0, color: color`0` }); // Display the timer text at position (5, 2)
}


setInterval(() => {
    timer++; // Increment the timer value every second
    timer_text(); // Display the updated timer text
}, 1000); // Run the timer update every 1000 milliseconds (1 second)
