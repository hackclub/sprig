/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Journey to the Secret Village
@author: Abigail Loken
@tags: []
@addedOn: 2024-12-03
*/


// START INSTRUCTIONS
// HOW TO PLAY
// Press "W" - to move up
// Press "A" - to move left
// Press "D" - to move right
// Press "S" - to move down

// If you don't teleport after being on the door, move the character back and try to go on the door again

// END INSTRUCTIONS


const player = "p"

// START Level One Sprites
const boss = "b"
const backDoor = "d"


// END Level One Sprites


// START LEVEL TWO - THREE (OLD WOMAN) SPRTIES
const oldWoman = "o"


// end LEVEL TWO - THREE (OLD WOMAN) SPRTIES

// START LEVEL FOUR - ????? Sprites MAZE SPRITES
const wall = "w"
const wall3 = "x"
const wall4 = "z"
const spike = "i"
const gold = "g"
const table = "t"
const table2 = "n"
const floor = "f"
const grass = "v"


// END LEVEL FOUR - ?????  Maze sprites



setLegend(
  [player, bitmap`
.....000000.....
...0099999900...
..099999999990..
.....000000.....
....00CCCC00....
....0C0CC0C0....
....0C0CC0C0....
....0CCCCCC0....
....00C33CC0....
......000000....
....0000000000..
........0.......
.......000......
.......0.00.....
.......0..0.....
......00..0.....`],
  [boss, bitmap`
..000000000.....
..000000000.....
..000000000.....
..00CCCC000.....
.000C0C0C00.....
..00C0C0C00.....
..00CCCCC0......
...0C333C0....0.
00..000000...00.
.0...0770...00..
.0..007700.00...
..0050770500....
...05077050.....
.000507705000...
00555077055500..
00000000000000..`],
  [backDoor, bitmap`
................
................
.....CCCCC......
....CCCCCCCCC...
....CCCCCCCCCC..
...CCCCCCCCCCCC.
CCCCCCCCCCCCCCC.
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCC66CCC
CCCCCCCCCCC66CCC
CCCCCCCCCCC66CCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [wall, bitmap`
1111111111111111
1111101111111111
1011110011111001
1001111100110011
1100111111110111
1110111111100111
1110011111001111
1111011110011111
1101111100111111
0011111101110011
1111111111111001
1111111110011101
1100011110111101
0111001100111101
1001100001111111
1111111111111111`],
  [oldWoman, bitmap`
..LLLLLLLLL.....
..LLLLLLLLL.....
..L000000LL.....
..L0CCCC0LL.....
.LL0C0C0C0L.....
..L0C0C0C0L.....
..L0CCCCC0......
...0C333C0....0.
00..000000...00.
.0...0880...00..
.0..008800.00...
..00H0880H00....
...0H0880H0.....
.000H0880H000...
00HHH0880HHH00..
00000000000000..`],
  [wall3, bitmap`
1111111100000011
1111111011111101
1101110111111111
1101101111111111
1011101110000011
1001111111111001
1111110001111101
0111001110001101
1001111111101101
1111111111001111
1110011111011111
1110111011011111
1001111011101111
1011100111110011
1111001111111011
1111111111111111`],
  [wall4, bitmap`
0000000000000000
LLLLLL00111110LL
LLLLLL00111110LL
0000000000000000
11110LLLLL011110
11110LLLLL011110
0000000000000000
LLLLLL0111110LL0
LLLLLL0111110LL0
0000000000000000
111110LLLL011110
111110LLLL011110
0000000000000000
LLLL01111110LLL0
LLLL01111110LLL0
0000000000000000`],
  [spike, bitmap`
................
................
................
................
......33333.....
.....333333.....
.....333333.....
.....333333.....
.....3333333....
....33333333....
....33333333....
...3333333333...
...3333333333...
..333333333333..
.33333333333333.
3333333333333333`],
  [gold, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [table, bitmap`
CC0CC0CC0CC0CC0C
CC0CC0CC0CC0CC0C
CC0CC0CC0CC0CC0C
CC0CC0CC0CC0CC0C
CC0CC0CC0CC0CC0C
CC0CC0CC0CC0CC0C
CC0CC0CC0CC0CC0C
CC0CC0CC0CC0CC0C
CC0CC0CC0CC0CC0C
CC0CC0CC0CC0CC0C
CC0CC0CC0CC0CC0C
CC0CC0CC0CC0CC0C
CC0CC0CC0CC0CC0C
CC0CC0CC0CC0CC0C
CC0CC0CC0CC0CC0C
CC0CC0CC0CC0CC0C`],
  [table2, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
0000000000000000
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
0000000000000000
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
0000000000000000
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
0000000000000000
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
0000000000000000
CCCCCCCCCCCCCCCC`],
  [floor, bitmap`
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
  [grass, bitmap`
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



)

setSolids([player, wall, wall3, wall4, table, table2]);

// START Instructions TEXT

let test1 = 0;
// let currentLevel = 0;

if (test1 === 0) {
  addText("Go to", { x: 5, y: 2, color: color`3` });
  addText("the boss", { x: 4, y: 3, color: color`3` });
}

addText("Press L to ", { x: 4, y: 5, color: color`3` });
addText(" remove text", { x: 4, y: 6, color: color`3` });

onInput("l", () => {
  clearText();
})

// END Instructions Text

let level = 0
const levels = [
  map`
ffffffff
ffffffff
ffffffff
pfffffff
ffffffff
fffffffd
fnnfnnff
tffbfftf`, // Introduction map
  map`
vvvvvvvd
vvvvvvvv
vvvvvvwv
vvvvvvww
pvvvvvvv
vvvvvvov
vwvvvvvv
vwwvvvvv`, // meet old woman
  map`
iiiii...
.i....i.
.iii.i..
pi...i.i
...i.i..
.iii..i.
.ii..i..
i.iiii.d`, // maze 1
  map`
i.i.i..p
i.iiii.i
.i.ii..i
d.i...ii
i.i.i.i.
i.i.i..i
i.i.i.ii
i...i..i`, // maze 2
  map`
.i.iiiii
i.iii..d
i.iii.ii
p..ii..i
ii..ii..
i.i.iii.
iii.....
iiii.i.i`, // maze 3
  map `
i....iii
idii...i
iiii.i.i
piiiii..
......i.
.iiiiii.
.i.iiii.
........`, // maze 4
  map`
ii.iiii.
i.......
i.i.iii.
..i.i.i.
piiiiii.
.i....i.
.i...i.d
......ii`, // maze 5
  map`
zggggggz
zggggggz
zzzzggzz
vxvzzzvd
vxxvvvwv
wvvvvvxv
vvvvvvvv
vvvpvvxx`, // secret village
  map`
........
........
........
........
........
........
........
........`, // END Credits

]

setMap(levels[level])

setPushables({
  [player]: []
})

// START PLAYER MOVEMENT 

onInput("s", () => {
  getFirst(player).y += 1 // moves the player down
})

onInput("w", () => {
  getFirst(player).y -= 1 // moves player up
})

onInput("d", () => {
  getFirst(player).x += 1 // moves the player right
})

onInput("a", () => {
  getFirst(player).x -= 1 // moves player left
})


onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});
// START BOSS DIALOGUE FUNCTIONS
function firstBoss() {
  addText("Step Back", { x: 4, y: 2, color: color`3` })
  addText("then press ", { x: 4, y: 3, color: color`3` })
  addText("(i)", { x: 4, y: 4, color: color`3` })
  onInput("i", () => {
    clearText();
    addText("BOSS: Okay you ", { x: 3, y: 2, color: color`C` })
    addText("may have your", { x: 3, y: 3, color: color`C` })
    addText("Big Break", { x: 3, y: 4, color: color`C` })
    addText("(i) To ", { x: 3, y: 5, color: color`C` })
    addText("Continue", { x: 3, y: 6, color: color`C` })
    secondBoss();
  })
}

function secondBoss() {
  onInput("i", () => {
    clearText();
    addText("BOSS: A little ", { x: 3, y: 1, color: color`C` })
    addText("bird told me", { x: 3, y: 2, color: color`C` })
    addText("that there is a", { x: 3, y: 3, color: color`C` })
    addText("Secret Village", { x: 3, y: 4, color: color`C` })
    addText("to be found", { x: 3, y: 5, color: color`C` })
    addText("(i) To ", { x: 3, y: 6, color: color`C` })
    addText("Continue", { x: 3, y: 7, color: color`C` })
    thirdBoss();
  })
}

function thirdBoss() {
  onInput("i", () => {
    clearText();
    addText("BOSS: it may  ", { x: 3, y: 1, color: color`C` })
    addText("be a flop or", { x: 3, y: 2, color: color`C` })
    addText("it may be", { x: 3, y: 3, color: color`C` })
    addText("a story", { x: 3, y: 4, color: color`C` })
    addText("(i) To ", { x: 3, y: 6, color: color`C` })
    addText("Continue", { x: 3, y: 7, color: color`C` })
    fourthBoss();
  })
}

function fourthBoss() {
  onInput("i", () => {
    clearText();
    addText("BOSS: You will  ", { x: 3, y: 1, color: color`C` })
    addText("go find the ", { x: 3, y: 2, color: color`C` })
    addText("village", { x: 3, y: 3, color: color`C` })
    addText("and figure", { x: 3, y: 4, color: color`C` })
    addText("out the truth", { x: 3, y: 5, color: color`C` })
    addText("(i) To ", { x: 3, y: 6, color: color`C` })
    addText("Continue", { x: 3, y: 7, color: color`C` })

    fifthBoss();
  })
}

function fifthBoss() {
  onInput("i", () => {
    clearText();
    addText("BOSS: leave ", { x: 3, y: 1, color: color`C` })
    addText("out the ", { x: 3, y: 2, color: color`C` })
    addText("back door", { x: 3, y: 3, color: color`C` })
    sixthBoss();
  })

  function sixthBoss() {
    onInput("i", () => {
      clearText();
    })

  }

}


// END BOSS DIALOGUE FUNCTIONS

// START OLDWOMAN DIALOGUE FUNCTIONS

// START INTRODUCTION
function firstOldWoman() {
  addText("Step Back", { x: 4, y: 2, color: color`3` })
  addText("then press ", { x: 4, y: 3, color: color`3` })
  addText("(i)", { x: 4, y: 4, color: color`3` })
  onInput("i", () => {
    clearText();
    addText("OldWoman:Hello", { x: 3, y: 2, color: color`H` })
    addText("in order to ", { x: 3, y: 3, color: color`H` })
    addText("find the ", { x: 3, y: 4, color: color`H` })
    addText("secret Village ", { x: 3, y: 5, color: color`H` })
    addText(" you must solve ", { x: 3, y: 6, color: color`H` })
    addText(" 5 mazes ", { x: 3, y: 7, color: color`H` })

    addText("(i) To ", { x: 3, y: 9, color: color`H` })
    addText("Continue", { x: 3, y: 10, color: color`H` })
    secondOldWoman();
  })
}

function secondOldWoman() {
  onInput("i", () => {
    clearText();
    addText("be careful", { x: 3, y: 2, color: color`H` })
    addText("of those", { x: 3, y: 3, color: color`H` })
    addText("spikes", { x: 3, y: 4, color: color`H` })

    addText("(i) To ", { x: 3, y: 6, color: color`H` })
    addText("Continue", { x: 3, y: 7, color: color`H` })
    thirdOldWoman();
  })
}

function thirdOldWoman() {
  onInput("i", () => {
    clearText();
    addText("Go through", { x: 3, y: 2, color: color`H` })
    addText("the door", { x: 3, y: 3, color: color`H` })
    addText("to accept", { x: 3, y: 4, color: color`H` })
    addText("the challenge ", { x: 3, y: 5, color: color`H` })

    addText("(i) To ", { x: 3, y: 7, color: color`H` })
    addText("Continue", { x: 3, y: 8, color: color`H` })
    fourthOldWoman();
  })
}

function fourthOldWoman() {
  onInput("i", () => {
    clearText();
    addText("The door ", { x: 3, y: 2, color: color`H` })
    addText("may need a", { x: 3, y: 3, color: color`H` })
    addText("little nudge", { x: 3, y: 4, color: color`H` })
    addText("to open ", { x: 3, y: 5, color: color`H` })

    addText("(i) To ", { x: 3, y: 7, color: color`H` })
    addText("Continue", { x: 3, y: 8, color: color`H` })
    fifthOldWoman();
  })
}

function fifthOldWoman() {
  onInput("i", () => {
    clearText();
    addText("step back ", { x: 3, y: 2, color: color`H` })
    addText("and try again", { x: 3, y: 3, color: color`H` })
    addText("if the door", { x: 3, y: 4, color: color`H` })
    addText("won't work ", { x: 3, y: 5, color: color`H` })

    addText("(i) To ", { x: 3, y: 7, color: color`H` })
    addText("Continue", { x: 3, y: 8, color: color`H` })
    sixthOldWoman();
  })

}

function sixthOldWoman() {

  onInput("i", () => {
    clearText();
  })

}


// END OLDWOMAN DIALOGUE FUNCTIONS






// END PLAYER MOEVEMENT
afterInput(() => {


  // START INTERACT WITH BOSS
  //count the number of tiles with BOSS SPRITE
  const bossNumber = tilesWith(boss).length;
  // count the number of tile with BOSS SPRITE and player SPRITE
  const bossPlayer = tilesWith(boss, player).length;
  if ((bossNumber === bossPlayer) && test1 === 0) {
    clearText();
    firstBoss();
  }

  // END INTERACT WITH BOSS

  // START Interact with Back Door
  //count the number of tiles with BACK DOOR
  const backDoorNumber = tilesWith(backDoor).length;
  // count the number of tile with Back door and player SPRITE
  const backDoorPlayer = tilesWith(backDoor, player).length;
  if (backDoorNumber === backDoorPlayer) {

    level = level + 1;

    const currentLevel = levels[level]
    if (currentLevel !== undefined) {
      setMap(currentLevel);
      test1 += 1;
      clearText();

      if (test1 === 1) {
        addText("Go to", { x: 5, y: 2, color: color`3` });
        addText("the oldlady", { x: 4, y: 3, color: color`3` });
        addText("Press L to ", { x: 4, y: 5, color: color`3` });
        addText(" remove text", { x: 4, y: 6, color: color`3` });

      }


    }

  }

  // END INteract with back door

  // START INTERACT WITH OLDWOMAN
  //count the number of tiles with OLDWOMAN SPRITE
  const oldWomanNumber = tilesWith(oldWoman).length;
  // count the number of tile with OLDWOMAN SPRITE and player SPRITE
  const oldWomanPlayer = tilesWith(oldWoman, player).length;

  if (test1 === 1) {
    if ((oldWomanNumber === oldWomanPlayer)) {
      clearText();
      firstOldWoman();


    }
  }

  // END INTERACT WTH OLDWOMAN


  if (tilesWith(player, spike).length >= 1) {
    // playTune(caught)
    setMap(levels[level])

  }
  if (level === 8) {
    addText("Congratulations ", { x: 3, y: 3, color: color`3` })
    addText("You have ", { x: 3, y: 2, color: color`3` })
    addText("discovered ", { x: 3, y: 4, color: color`3` })
    addText("The secret ", { x: 3, y: 5, color: color`3` })
    addText("village ", { x: 3, y: 6, color: color`3` })

    addText("Thank you ", { x: 5, y: 9, color: color`3` })
    addText("for  ", { x: 5, y: 10, color: color`3` })
    addText("playing ", { x: 5, y: 11, color: color`3` })
  }


})
