
/* 
@title: ocean-maze-escape
@author: michael barrera
@tags: ['puzzle']
@addedOn: 2023-10-13
*/

    /*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

//goal: get both players to their goals
// player 1, squid controles: wasd
// player2 , shark controles:ijkl


const player2 = "c"
const player = "p"
const backround = "b"
const wall = "w"
const boat = "g"
const backround2 = "a"
const submarine = "s"

const ocean = tune`
333.3333333333333: A4^333.3333333333333,
333.3333333333333: A4^333.3333333333333,
333.3333333333333: B4^333.3333333333333,
333.3333333333333: B4~333.3333333333333,
333.3333333333333: B4~333.3333333333333,
333.3333333333333: C5^333.3333333333333,
333.3333333333333: C5~333.3333333333333,
333.3333333333333: D5~333.3333333333333,
333.3333333333333: D5~333.3333333333333,
333.3333333333333: E5^333.3333333333333,
333.3333333333333: E5~333.3333333333333,
333.3333333333333: E5~333.3333333333333,
333.3333333333333: F5^333.3333333333333,
333.3333333333333: F5~333.3333333333333,
333.3333333333333: G5^333.3333333333333,
333.3333333333333: G5^333.3333333333333,
333.3333333333333: G5^333.3333333333333,
333.3333333333333: F5~333.3333333333333,
333.3333333333333: F5^333.3333333333333,
333.3333333333333: E5~333.3333333333333,
333.3333333333333: E5~333.3333333333333,
333.3333333333333: E5^333.3333333333333,
333.3333333333333: D5~333.3333333333333,
333.3333333333333: D5~333.3333333333333,
333.3333333333333: C5~333.3333333333333,
333.3333333333333: C5^333.3333333333333,
333.3333333333333: B4~333.3333333333333,
333.3333333333333: B4~333.3333333333333,
333.3333333333333: B4^333.3333333333333,
333.3333333333333: A4^333.3333333333333,
333.3333333333333: A4^333.3333333333333,
333.3333333333333: A4~333.3333333333333`

setLegend(
   [ player2, bitmap`
5555555555555555
5555555555555555
5555555555555555
5155555551555555
5115555551155555
5511555551115555
5511111111111055
5511111111111115
5512222222222225
5511555511155555
5115555511555555
5155555515555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555` ],

 [ player, bitmap`
3555555555555555
3355555555555555
5333555555555555
555335CCCCCCC555
5555333333333335
355333333330L033
33335533333L2L33
533333333330L033
3353333333333335
333333CCCCCCC555
3553355555555555
5533555555555555
3355555555555555
5555555555555555
5555555555555555
5555555555555555` ],
 [ backround, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555` ],
  [ wall, bitmap`
1111111111111111
1111111111111111
1L1111L1111L1111
11111111L1111L11
1111111111111111
11111111L1111111
11L1111111111L11
1111111111111111
11111111L1111111
1111L11111L11111
1111111111111111
1111111111111111
1111L1111111L111
1111111L11111111
1111111111111111
1111111111111111` ],
  [ boat, bitmap`
7777722772277777
7777711771177777
77777LL77LL77777
7777CCCCCCCC7777
7777LLLLLLLL7777
7777LLLLLLLL7777
5555333333335555
5555333333335555
5555533333355555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555` ],
  [ backround2, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [ submarine, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555L55LLL555555
5555L55LLL555555
5555LLLLLLLL5555
5L5LLLLLLLLLL555
501L0LLLLLLLL555
5L5LLLLLLLLLL555
5555LLLLLLLL5555
5555L55555555555
5555L55555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
)

setSolids([ player, wall, player2 ])



let level = 0
const levels = [
  map`
aaaaagaaaaaa
wwwwwwwwwwwb
wbbbbcbbwwwb
wbwwwwwwwwws
wbwwwwwwwwwb
wbwbbbbbbwwb
wbwwwwwwbwbb
wbwbbbbbbwbw
wbwbwwwwwwbw
wbbbwwwwwwbw
wwbwwwwwwwbw
wpbbbbbbbbbb`,
  map`
gaaaaaaaaaaaaaaaaa
wwbbbwwwbbbbbbwwww
bwbwbbbwwbbbbwwwcw
bwbwwwbwwbbwwwbwbb
bwbbbwbwwbbbbbbwbb
bwbbbwbwbwbbbbbwbb
bwwwwwbwwwwwbbbwbb
bbbbbbbwwbbwbwbwbb
bwwwwwwwwbbbbwbwbb
bwwwwbbbbwwbbwwwbb
bbbbwbbbbwwwbwbbbb
bwbbwbbbbbbbbbbbbw
bwbbwwwwwbbwbbbbbw
bwbbbbbbbbbwwwwwww
bwbbwwwbbwbbbbwwww
bwbbbbbwbwwbbbwsbw
bwbbbbbwbwwwwwwwbw
pwbbbbbbbbbbbbbbbw`,
  map`
gaaaaaaaaaaaaaaaaaaa
bbbbbbbbbbbbbbbbbbbp
wwwwwwwwwwwwwwbwwwbw
wbbbbbbbbbbwwwbwwwbw
wbwwwwwwwwbwbwbwwwbw
wbwbbbbbwwbwbbbwwwbw
wbwbbbwbwwbwbwbwwwbw
wbwbwwwbwwwwbwwwwwbw
bbbbbbbbbbbbbbbbbwbw
bwwwwwwwwwwwwwwwwwww
bwbbbbbbbbbbbbbbbbbw
bwbwwwwbwwwwwwwwwwww
bwbwbbwbwbbbbbbbbbbw
bwbwwbwbwbwwwwwwwwbw
bwbwwbwbwbwwwwwwwwbw
bwbbbbbbbbbbbbbbbbbw
bwbwwbwwwbwwwwwwwwww
bbbwwbwwwbbbbbbbbbww
bwwwwbwwwwwwwwwwwbww
swbbbbbbbbbbbbbbwbcw`,
  map`
gaaaaaa
wwwwwwp
bbbbbbb
bwwwwww
bbbbbbb
wwwwwwb
bbbbbbb
bwwwwww
bbbbbbb
wwwwwwb
bbbbbbb
bwwwwww
bbbbbbb
wwwwwwb
bbbbbbb
bwwwwww
bbwwwww
scwwwww`,
  map`
gaaa
bbbp
bwww
bbcs`,
  map`
aaaagaaaaa
wbwwwwwwbw
wbwbbbpwbw
wbwbwwbwbw
wbwbbbbwbw
wbwbbbbwbw
wbwbwwbwbw
wbwbwwbwbw
wbbbbbbbbw
scwwwwwwww`,
  map`
cwbbbwbbbwbbbwbbbwbbbwbbbwbbbwag
pwbwbwbwbwbwbwbwbwbwbwbwbwbwbwbb
bwbwbwbwbwbwbwbwbwbwbwbwbwbwbwbb
bwbwbwbwbwbwbwbwbwbwbwbwbwbwbwbb
bwbwbwbwbwbwbwbwbwbwbwbwbwbwbwbb
bwbwbwbwbwbwbwbwbwbwbwbwbwbwbwbb
bwbwbwbwbwbwbwbwbwbwbwbwbwbwbwbb
bwbwbwbwbwbwbwbwbwbwbwbwbwbwbwbb
bwbwbwbwbwbwbwbwbwbwbwbwbwbwbwbb
bwbwbwbwbwbwbwbwbwbwbwbwbwbwbwbb
bbbbbbbwbbbwbbbwbbbwbbbwbbbwbbbs`,
  map`
gaaaaaaaaaaaaaaaaaaa
wwwwwwwwwwwwwwwwwwbw
pbbbbbbbbbbbbbbbbbbw
wwwwbwwwbwwwwwwwwwww
wbbwbwbwbwbbbbbbbbww
wbwwbwbwbwbwwwwwwwww
wbwwbwbwbwbbbbbbbbbw
wbwwbwbwbwbwwwwbwwbw
wbwwbwbwbwbwwbwbwwbw
wbwwbwbwbwbbbbwbwwbw
wbwwbwbwbwwwwwwbwwbw
wbwwbwbwbbbbbbbbwwbw
wbbbbwbwwwwwwwwbwwbw
wbwwwwbbbbbbbbbbwwbw
wbwwwwwwwwwwwwwbwwbw
wbwbbbbbbbbbbbbbwwbw
wbwswbwwbwbwwbwwbbbw
wbwwwwwwwwwwwbwwbwww
wbbbbbbbbbbbbbbbbbcw
wwwwwwwwwwwwwwwwwwww`,
]




setMap(levels[level])

setPushables({
  [ player ]: []
})
//set player movement controles

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})
//set player2 movement controles

onInput("j", () => {
  getFirst(player2).x -= 1
})

onInput("l", () => {
  getFirst(player2).x += 1
})

onInput("i", () => {
  getFirst(player2).y -= 1
})

onInput("k", () => {
  getFirst(player2).y += 1
})


afterInput(() => {
  const targetNumber = tilesWith(boat).length; 
  const targetNumber2 = tilesWith(submarine).length; 

  const targetNumberboth = targetNumber + targetNumber2; 
  
  const numberCovered = tilesWith(boat, player2).length;
  const numberCovered2 = tilesWith(submarine, player).length; 

  const bothCovered = numberCovered + numberCovered2; 

  if (bothCovered === targetNumberboth) {
    // increase the current level number
    level = level + 1;
    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("hooray you did it!", { y: 4, color: color`4` });
      clearInterval();
    }
  }
});

playTune(ocean)

playTune(ocean, 20)

 
