/* 
@title: The maze!
@author: Eli
Hit the run button to start PLS EAT THE ICECREAM

>:)





code is down here you are  aloud to copy and paste i wont get mad
*/

const player = "p"
const wall = "w"
const Background = "b"
const icecream = "c"
const Zumbie = "z"   

setLegend(
  [ player, bitmap `
0000000000000000
0000000000000000
0000000000000000
00HHH00000HHH000
00H8H00000H8H000
00HHH00000HHH000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000800000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ Background, bitmap `
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111`],
  [ icecream, bitmap `
......8888......
....88888888....
....88888888....
....88088808....
....88888888....
....88888888....
....80888808....
....88000088....
....88888888....
....88888888....
....88888888....
.......CC.......
.......CC.......
.......CC.......
.......CC.......
.......CC.......` ],
  [ Zumbie, bitmap `
................
................
................
......DDDDDD....
......DLDDLD....
......DDDDDD....
......DLLLDD....
......D7DDDD....
......DDD55DDDD.
......DDD55DDDD.
......555555....
......555555....
......55..55....
......55..55....
......55..55....
......LL..LL....` ],
)
setSolids([ player, wall ])
const level = map`
pbbbbbbbbbwwww
bbbbbbbbbbwwww
wwwwwwwwbbwwww
wwwwwwwwbbwwww
wbcbbwwwbbwwww
wbbbbwwwbbwwww
wwbwwwwwbbwwww
wwbwwwwwbbwwww
wwbbbbbbbbbbbz
wwbbbbbbbbbbbb`
setMap(level)


onInput("d", () => {
  // Move the player one tile to the right
  getFirst(player).x += 1
})

onInput("a", () => {
  // Move the player one tile to the left
  getFirst(player).x += -1
})

onInput("w", () => {
  // Move the player one tile to the Up
  getFirst(player).y += -1
})

onInput("s", () => {
  // Move the player one tile to the down
  getFirst(player).y += 1
})
addText("The Maze!", { 
  x: 10,
  y: 15,
  color: color`3`
})
// Create a tune:
const melody = tune`
588.2352941176471,
294.11764705882354: D4/294.11764705882354,
1176.4705882352941,
294.11764705882354: C4/294.11764705882354,
294.11764705882354,
294.11764705882354: C4/294.11764705882354,
588.2352941176471,
294.11764705882354: C5/294.11764705882354,
1470.5882352941176,
294.11764705882354: E4/294.11764705882354,
294.11764705882354,
294.11764705882354: C4/294.11764705882354,
294.11764705882354,
294.11764705882354: C4/294.11764705882354,
294.11764705882354: E4/294.11764705882354,
294.11764705882354: G4/294.11764705882354,
294.11764705882354: G4/294.11764705882354,
294.11764705882354,
294.11764705882354: C5/294.11764705882354,
294.11764705882354,
294.11764705882354: D5/294.11764705882354,
294.11764705882354: B4/294.11764705882354,
294.11764705882354: C5~294.11764705882354 + B4~294.11764705882354`

// Play it:
playTune(melody)

// Play it 5 times:
playTune(melody, 5)

// Play it until the heat death of the universe:
const playback = playTune(melody, Infinity)

// Or make it shut up early:
playback.end()
const checkIfObjectWasTouched = () => {
  const { y: playerY, x: playerX } = getFirst(player);
 
  const playerTouchedCake = tilesWith(icecream, player).length;
  const playerTouchedVeg = tilesWith(Zumbie, player).length;

  if (playerTouchedCake) addText(" Ohh Yummy :)", { y: 4, color: color`9` });
  if (playerTouchedVeg) addText(" You are Die :(", { y: 4, color: color`3` });

};

afterInput(() => {
  checkIfObjectWasTouched();
});

//If you can See this THIS GAME WAS HARD TO MAKE >:(

