/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Janky banana
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const cookielt = "p"
const cookiert = "l"
const cookielb = "m"
const cookierb = "n"
const player = "z"

setLegend(
  [cookielt, bitmap`
      ................
      ................
      ................
      ...............6
      ..............66
      ..............66
      .............666
      ............6666
      ...........66666
      ..........666666
      .........6666666
      ........66666666
      .....66666666666
      ....666666666666
      .C66666666666666
      CC66666666666666`],
  [cookiert, bitmap`
      ................
      .............C..
      ...........6CCC.
      6.........66CC..
      6.......666666..
      66666666666666..
      66666666666666..
      66666CC666666...
      666666CC66666...
      6666666666666...
      6666666666666...
      6666666666666...
      666666666666....
      66666666666.....
      666666666.......
      66666666........`],
  [cookielb, bitmap`
      CC66666666666666
      6C66666666666666
      6666666666666666
      .6666666CCC66666
      ..66666666CCCC66
      ..66666666666CC6
      ...6666666666666
      .....66666666666
      .........6666666
      .............666
      ................
      ................
      ................
      ................
      ................
      ................`],
  [cookierb, bitmap`
      66666666........
      66666666........
      66666666........
      66666C66........
      6666CC6.........
      666CC66.........
      666666..........
      666666..........
      66666...........
      666.............
      ................
      ................
      ................
      ................
      ................
      ................`],
)


setSolids([])

let level = 0
const levels = [
  map`
................
................
................
................
................
......pl........
......mn........
................
................
................
................`
]

setMap(levels[level])

let count = 0; // Initialize counter variable
let timeLeft = 30; // Initial time left in seconds
const targetCount = 100; // Define the target count to display the message
const targetCount2 = 150; // Define the second target count
const message2 = "failed!"; // Message for the second goal
const messageCount3 = 160;
const message3 = "haha u gullible af";


addText(`Time: ${timeLeft}`, { x: 10, y: 20, color: color`7` });

const updateTime = () => {
  if (timeLeft > 0) {
    timeLeft--;
    addText(`Time: ${timeLeft}`, { x: 10, y: 5, color: color`7` });
  } else {
    console.log("Time's up!");
    // Add your logic for when the time runs out here
  }
};

const timer = setInterval(updateTime, 1000); // Update timer every second


onInput("a", () => {
  count++; // Increment the counter each time the "a" key is pressed
  console.log("count:", count);
  addText(`Count: ${count}`, { x: 5, y: 10, color: color`3` });

  // Check if the count reaches the targetCount
  if (count === targetCount) {
    addText("You-(150=next word)", { x: 1, y: 15, color: color`5` });
  }

  // Check if the count reaches the second targetCount
  if (count === targetCount2) {
    addText(message2, { x: 1, y: 15, color: color`4` });
  }

  // Check if the count reaches the targetCount
  if (count === messageCount3) {
    addText(message3, { x: 1, y: 15, color: color`H` });
  }
});


addText("press 'a' button", {
  x: 4,
  y: 4,
  color: color`0`
})