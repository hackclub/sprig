/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

const player = "p"
const wall = "c"
const goal = "e"
const background = "b"
const melody = tune`
112.78195488721805: E4-112.78195488721805 + G4-112.78195488721805,
112.78195488721805,
112.78195488721805: C5-112.78195488721805 + E5-112.78195488721805,
112.78195488721805: G4-112.78195488721805 + B4-112.78195488721805,
112.78195488721805: C5-112.78195488721805 + E5-112.78195488721805,
112.78195488721805: E5-112.78195488721805 + G5-112.78195488721805,
112.78195488721805,
112.78195488721805: C5-112.78195488721805 + E5-112.78195488721805,
112.78195488721805,
112.78195488721805: G4-112.78195488721805 + B4-112.78195488721805,
112.78195488721805,
112.78195488721805: E5-112.78195488721805 + G5-112.78195488721805,
112.78195488721805: B4-112.78195488721805 + D5-112.78195488721805,
112.78195488721805: E5-112.78195488721805 + G5-112.78195488721805,
112.78195488721805: G5-112.78195488721805 + B5-112.78195488721805,
112.78195488721805,
112.78195488721805: E5-112.78195488721805 + G5-112.78195488721805,
112.78195488721805,
112.78195488721805: C4-112.78195488721805 + E4-112.78195488721805,
112.78195488721805,
112.78195488721805: A4-112.78195488721805 + C5-112.78195488721805,
112.78195488721805: G4-112.78195488721805 + E4-112.78195488721805,
112.78195488721805: A4-112.78195488721805 + C5-112.78195488721805,
112.78195488721805: C5-112.78195488721805 + E5-112.78195488721805,
112.78195488721805: B4-112.78195488721805 + D5-112.78195488721805 + G5-112.78195488721805 + B5-112.78195488721805,
112.78195488721805: A4-112.78195488721805 + C5-112.78195488721805 + F5-112.78195488721805 + A5-112.78195488721805,
112.78195488721805: G5-112.78195488721805 + E5-112.78195488721805 + B4-112.78195488721805 + G4-112.78195488721805 + B5-112.78195488721805,
112.78195488721805: F5-112.78195488721805 + D5-112.78195488721805 + A4-112.78195488721805 + F4-112.78195488721805 + A5-112.78195488721805,
112.78195488721805: E5-112.78195488721805 + C5-112.78195488721805 + G4-112.78195488721805 + E4-112.78195488721805 + G5-112.78195488721805,
112.78195488721805: D5-112.78195488721805 + B4-112.78195488721805 + F4-112.78195488721805 + D4-112.78195488721805 + F5-112.78195488721805,
112.78195488721805: C5-112.78195488721805 + A4-112.78195488721805 + E4-112.78195488721805 + C4-112.78195488721805 + E5-112.78195488721805,
112.78195488721805: D5-112.78195488721805 + B4-112.78195488721805 + G4-112.78195488721805 + D4-112.78195488721805`
const move = tune`
37.5: B4-37.5,
37.5: D5-37.5,
37.5: G4-37.5,
1087.5`


setLegend([ player, bitmap`
..000000000000..
..000000000000..
0066666666666600
0066006666006600
0066006666006600
0066006666006600
0066006666006600
0066666666666600
0066666666666600
0066666666666600
0060666666660600
0060066666600600
0066000000006600
0066666666666600
..000000000000..
..000000000000..` ], [ wall, bitmap`
3333303333303333
3333303333303333
0000000000000000
3303333303333303
3303333303333303
0000000000000000
3333303333303333
3333303333303333
0000000000000000
3303333303333303
3303333303333303
0000000000000000
3333303333303333
3333303333303333
0000000000000000
3303333333303333` ], [ goal, bitmap`
CC000222000222..
CC000222000222..
CC000222000222..
CC222000222000..
CC222000222000..
CC222000222000..
CC000222000222..
CC000222000222..
CC000222000222..
CC..............
CC..............
CC..............
CC..............
CC..............
CC..............
CC..............` ], [ background,  bitmap`
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
1111111111111111`])


setSolids([player, wall])

let level = 0
const levels = [
  map`
cpcccccccc
c....c...c
c.cccc.c.c
c......c.c
c.c.cccc.c
c.c.ccc..c
c.c...c.cc
c.ccc.c..c
c...c.cc.c
ccccccccec`,
  map`
cccccccpccccccc
c.....c.......c
c.ccc.ccccccc.c
c.c.c.c.....c.c
c.c.c.c.ccc.c.c
c.c.c.c.c.....c
c.c.ccc.ccccccc
c.c...........c
c.ccc.ccccccc.c
c.....c.....c.c
c.ccccc.c.c.c.c
c.c.....c.c.c.c
c.ccc.ccccc.c.c
c...c...c.....c
ccccccceccccccc`,
  map`
ccccccccccpccccccccc
c...c....c.........c
c.c.c.cc.ccccccccc.c
c.c.c.c.....c....c.c
c.c.c.c.c.c.c.cccc.c
c.c.c.c.c.c.c......c
c.c...c.c.c.c.cccccc
c.ccccc.c.c...c....c
c.....c.c.ccc.cccc.c
c.ccc.c.c...c......c
c.c...c.ccc.cccccc.c
c.c.c.c...c......c.c
c.c.ccccc.cc.c.c.c.c
c.c.c...c..c.c.c.c.c
c.c...c.cccccc.c.c.c
c.ccc.c.c....c.c.c.c
c.....c.cccc.c.c.c.c
ccccccc.cccc.c.c.c.c
c..........c.c.c...c
cccccccccceccccccccc`,
  map`
cccccccccccccccccccc
c........c.........c
c.cccc.cccccc.cccc.c
c.c....c......cccc.c
c.c.cc.ccccccccccc.c
c.c.c...c.ccc.cccc.c
c.c.c.c.c.....cccc.c
c.c.c.ccccccc.cccc.c
c.c.c.........cccc.c
c.c.ccccccccc.cccc.c
c.c...c.......cccc.c
c.ccccccccccc.cccc.c
c.c.........c.cccc.c
c.c.ccc.c.c.c.cccc.c
c.c...c.c.c.c......c
e.c.c.c.c.c.cccccc.c
c.c.c.c.c.c........c
c.c.ccc.c.cccccccc.c
c.c.....c..........p
cccccccccccccccccccc`,
  map`
cccccccccccccccccccc
c...c....c.........c
c.c.c.cc.ccccccccc.c
c.c.c.c.....c....c.c
c.c.c.c.c.c.c.cccc.c
c.c.c.c.c.c.c......p
c.c...c.c.c.c.cccccc
c.ccccc.c.c...c....c
c.....c.c.ccc.cccc.c
c.ccc.c.c...c......c
c.c...c.ccc.cccccc.c
c.c.c.c...c......c.c
c.c.ccccc.cc.c.c.c.c
c.c.c...c..c.c.c.c.c
c.c...c.cc.ccc.c.c.c
c.ccc.c.c....c.c.c.c
c.....c.cccc.c.c.c.c
ccccccc.cccc.c.c.c.c
c........c...c.c...c
cccccccccceccccccccc`,
]
setBackground(background)
setMap(levels[level])


setPushables({
  [ player ]: []
})

onInput("w", () => {
  getFirst(player).y += -1
  playTune(move)
})
onInput("a", () => {
  getFirst(player).x += -1
  playTune(move)
})
onInput("s", () => {
  getFirst(player).y += 1
  playTune(move)
})
onInput("d", () => {
  getFirst(player).x += 1
  playTune(move)
})

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, player).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`2` });
      playTune(melody, 3)
    }
  }
});

  
