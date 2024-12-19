/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
@title: Reach The End Multiplayer
@author: Bluelightning26
@tags: []
@addedOn: 2024-11-22
*/

//My first attempt at a Sprig Game! Fight your way to the opposing player's endzone while they push back, the twine will get shorter with more pushes.
//Each Player Gets to freeze the other player five times! Use them wisely!

//vars

//players
const player1 = "l"
const player2 = "r"

//twine
const twine = "t"

//background
const sky = "s"

//goal
const goal = "g"


//Art
setLegend(
  [player1, bitmap`
................
................
.......000......
.......090......
......0990......
......09990.0...
....0002920.0...
....0.0999000...
....0.03330.....
......09990.....
.....099990.....
.....09990......
......000.......
......0.0.......
.....00.00......
................`],
  [player2, bitmap`
................
................
.......000......
.......0H0......
......0HH0......
......0HHH0.0...
....0002H20.0...
....0.0HHH000...
....0.08880.....
......0HHH0.....
.....0HHHH0.....
.....0HHH0......
......000.......
......0.0.......
.....00.00......
................`],
  [twine, bitmap`
................
................
................
................
..D............C
CDDD.....DD...DC
CCCD....DCCCCDCC
.CCC..CCCC.CCCCC
...CCCCDCC..CCCD
....CC.DCD....D.
........D.......
................
................
................
................
................`],
  [sky, bitmap`
7777777755777777
7777777755775700
7555777777775700
0777770000075777
0555770000075777
7555777777775777
7555777555575777
7555700555575777
7777700777777775
7777777777777777
7777777755577007
7555555755577007
7777770055577777
7777770055575555
5555557777770007
5555557777770007`],
  [goal, bitmap`
CCCCC55777777CCC
CCCCC55444737CCC
CLLLC57444737CCC
CCCLL574L473CCCC
CCCCL774L477LLLC
CCCC7754L437CCLC
CCC73354L43777CC
CCC7775444377CCC
CCC7L55444777CCC
CCCCL754447LLLCC
CCCCL554447LCCCC
CCCL75544477CCCC
CCCL75544777CCCC
CCCC75544737CCCC
CCCC75337777CCCC
CCCC755577777CCC`]
)

//background
let level = 0
const levels = [map`
gsssssssssg
gsssssssssg
gsltttttrsg
gsssssssssg
rsssssssssl`]
setMap(levels[level])

//Game Text
addText("1 v 1", {
  x: 7,
  y: 1,
  color: color`3`
})

addText("Go GO GO!", {
  x: 8,
  y: 4,
  color: color`2`
})

addText("dont stop!!", {
  x: 4,
  y: 13,
  color: color`2`
})

//let the obj get pushed
setPushables({
  [player2]: [twine],
  [player1]: [twine],
  [twine]: [twine]
})

//Pausing
let lpaused = false;
let rpaused = false;
let lcount = 0;
let rcount = 0;

const maxFreezeCount = 5;

//Freezing Left
onInput("i", () => {
  if (lcount < maxFreezeCount) {
    if (!lpaused) {
      lcount += 1;
      lpaused = true;
      setTimeout(() => {
        lpaused = false;
      }, 500);
    }
  }
});

//Freezing Right
onInput("w", () => {
  if (rcount < maxFreezeCount) {
    if (!rpaused) {
      rcount += 1;
      rpaused = true;
      setTimeout(() => {
        rpaused = false;
      }, 500);
    }
  }
});

//Moving to the Left
onInput("d", () => {

  if (lpaused == false)
  {
  getAll(twine).forEach(twineSprite => {
    twineSprite.x += 1
  })
  getFirst(player1).x += 1
  getFirst(player2).x += 1
  }
  
})

//Moving to the Right
onInput("j", () => {
  
  if (rpaused == false)
  {
  getAll(twine).forEach(twineSprite => {
    twineSprite.x -= 1
  })
  getFirst(player1).x -= 1
  getFirst(player2).x -= 1
  }
  
})




//Left Won
afterInput(() => {
  if (getFirst(player1).x == 10) 
  {
    console.log("P1 (Left) Wins!")
    clearText()
    addText("P1 (Left) Wins", 
    {
      x: 0,
      y: 4,
      color: color`2`
    })
  }
})

//Right Won
afterInput(() => {
  if (getFirst(player2).x == 0) 
  {
    console.log("P2 (Right) Wins!")
    clearText()
    addText("P2 (Right) Wins!", 
    {
      x: 0,
      y: 4,
      color: color`2`
    })
  }
})
