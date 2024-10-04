/* 
@title: TheCombine
@author: Sidharth B
@tags: []
@addedOn: 2024-05-16
@img: ""
*/

/*
IMPORTANT: 
Use the WASD keys to move around
- Based of One Flew Over the Cooko's Nest
- First Module: 
  - you are McMurphy and must escape the ward 
  - use your strength to push the grey pushblocks
  - break into the nurses glass and steal a key 
  - bring the key to the check point
- Second Module:
  - Congrats your free to go fishing!
  - Use WASD to move your pole around
  - Click J to start fishing (afterward you can't move the pole around)
  - You have 60 seconds to collect 3 out the 4 fish 
*/



/*
First row of code is for the first level, second is for the second, etc
Below is basic setup
*/

const McMurphy = "m"
const goal = "g"
const key = "e"
const wall = "t"
const pushboxes = "p"
const crossTable = "c"
const glass = "l"
const brokenGlass = "b"
const table = "x"


const waterDark = "d"
const pole = "f"
const fish = "z"



setLegend(
  [McMurphy, bitmap`
.....CCCCCC.....
...CCCCCCCCC....
..CC9999999C....
..C99779779C....
..C9977977955...
..599999999559..
..5599LLL955999.
.955599119759999
.99555999950.999
999955555550..99
999.05557550..99
999.05555550.999
999.05755550.999
999.05557550..9.
999.05555750....
.9..05755550....`],
  [key, bitmap`
................
................
................
................
.......FF.......
......F11F......
.....F1LL1F.....
....F1L00L1F....
....F1L00L1F....
.....F1LL1F.....
......F11F......
.......FF.......
................
................
................
................`],
  [goal, bitmap`
3333333333333333
3999999999999993
3966666666666693
3964444444444693
3964777777774693
3964755555574693
396475HHHH574693
396475H22H574693
396475H22H574693
396475HHHH574693
3964755555574693
3964777777774693
3964444444444693
3966666666666693
3999999999999993
3333333333333333`],
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
  [pushboxes, bitmap`
0000000000000000
011LLLLLLLLLLL10
0L11LLLLLLLLL110
0LL11LLLLLLL11L0
0LLL11LLLLL11LL0
0LLLL1122211LLL0
0LLLL2112112LLL0
0LLLL2211122LLL0
0LLLL2211122LLL0
0LLLL2112112LLL0
0LLLL1122211LLL0
0LLL11LLLLL11LL0
0LL11LLLLLLL11L0
0L11LLLLLLLLL110
011LLLLLLLLLLL10
0000000000000000`],
  [crossTable, bitmap`
.....LLLLLL.....
.....LFFFFL.....
.....LFFFFL.....
LLLLLLFFFFLLLLLL
LFF33FFFFFF00FFL
LFF3333FF0000FFL
LFF33FFFFFF00FFL
LLLLLLFFFFLLLLLL
.....LFFFFL.....
.....LFFFFL.....
.....LFFFFL.....
.....LFFFFL.....
.....LFFFFL.....
.....LFFFFL.....
.....LFFFFL.....
.....LLLLLL.....`],
  [glass, bitmap`
111.111111111111
1......1...1....
1..1..1.......11
1.1..........1.1
11.......1......
........1......1
1......1.......1
1.2............1
11...1.....1...1
1...1.....1.....
................
1...........1..1
.1...1...1.1...1
1...1...1......1
1..1...........1
111..11..11.1111`],
  [brokenGlass, bitmap`
................
................
................
................
................
................
................
................
3...............
1...............
13..............
33..............
31.............3
133...........31
133133..333..331
1113311331131111`],
  [table, bitmap`
................
.11111111111111.
.1FFFFFFFFFFFF1.
.1FFFFFFFFFFFF1.
.1FFFFFFFFFFFF1.
.1FFFFFFFFFFFF1.
.1FFFFFFFFFFFF1.
.1FFFFFFFFFFFF1.
.1FFFFFFFFFFFF1.
.1FFFFFFFFFFFF1.
.1FFFFFFFFFFFF1.
.1FFFFFFFFFFFF1.
.1FFFFFFFFFFFF1.
.1FFFFFFFFFFFF1.
.11111111111111.
................`],

  [waterDark, bitmap`
5277777555777255
7277777255777755
7777777777777727
5277777777772777
5577727777775555
5577555777275555
5577555775577277
7777777775577777
7777527727777727
7777555777255555
7777257775555555
2777777775557777
5577277777777777
5577555777775555
5772555777725555
7775555777725555`],
  [pole, bitmap`
.2...........2..
................
......1111......
.....111111.....
....1LLLLLL1....
...1L333333L1...
..1L31111113L1..
..1L31111113L1..
..1L31111113L1..
..1L31111113L1..
...1L333333L1...
....1LLLLLL1....
.....111111.....
......1111......
................
...........2....`],
  [fish, bitmap`
................
........000.....
.......02290....
.0....0922990...
090..099229920..
09900999229920..
099229992201290.
0992299922002990
0992299922992990
099229992299290.
09900999229920..
090..099229920..
.0....0922990...
.......02290....
........000.....
................`],
)

setSolids([wall, McMurphy, pushboxes, fish])

let level = 0
const levels = [map`
tttttttttttttttttt
t...p.....p......t
t..tttt.ttt.tt...t
t.tx..tttet.t.t..t
t.ttt.t.tlt.tx...t
t.t...t.....t..t.t
ttt.t.t.....t.tt.t
t...t.tp....t.tx.t
t.ttt.t.ttttt.tt.t
t.t...t.txt....t.t
t.t.tt..t.t.t....t
t.t.....t.t.t.ttpt
t.tt.tctt.t.t..t.t
t..tttttx.tttttt.t
t.gtm............t
tttttttttttttttttt`, map`
z........
.f....z..
.........
.z.......
.........
.......z.
.........
.........`]

setMap(levels[level])

setPushables({
  [McMurphy]: [fish],
  [McMurphy]: [pushboxes]
})

/*
imputs
*/
let fishing = true;
onInput("w", () => {
  if (level == 0) {
    getFirst(McMurphy).y -= 1
  } else if (fishing) {
    getFirst(pole).y -= 1
  }
})
onInput("a", () => {
  if (level == 0) {
    getFirst(McMurphy).x -= 1
  } else if (fishing) {
    getFirst(pole).x -= 1
  }
})
onInput("s", () => {
  if (level == 0) {
    getFirst(McMurphy).y += 1
  } else if (fishing) {
    getFirst(pole).y += 1
  }
})
onInput("d", () => {
  if (level == 0) {
    getFirst(McMurphy).x += 1

  } else if (fishing) {
    getFirst(pole).x += 1
  }
})

onInput("j", () => {
  if (level == 1) {
    fishing = false;
    clearText();
  }
})



let count = 0;
let steps = 99;
let moveInterval;
let score = 0;
let playerOnGoal = tilesWith(McMurphy, goal).length > 0;
afterInput(() => {
  playerOnGoal = tilesWith(McMurphy, goal).length > 0;
  const playerOnGlass = tilesWith(McMurphy, glass).length > 0;
  const playerOnKey = tilesWith(McMurphy, key).length > 0;

  if (level == 0) {
    addText("Steps remaining " + steps, { y: 5, color: color`3` });

    if (steps == 0) {
      setMap(levels[level]);
      steps = 99;
    }
    steps--;


    if (playerOnKey) {
      getFirst(key).remove();
      count = count + 1;
    }
    if (playerOnGlass) {
      getFirst(glass).type = "b";

    }
  }
  if (playerOnGoal && count >= 1) {
    level = level + 1;
    if (level < levels.length) {
      setMap(levels[level]);
      clearText();
      if (level === 1) {
        setBackground(waterDark);
        addText("Start Fishing: J", { y: 1, color: color`3` });
        moveInterval = setInterval(randomMove, 1000); // Call randomMove every second
        playerOnGoal = false;

      }

    } else {
      addText("you win!", { y: 4, color: color`7` });
      clearInterval(moveInterval); // Clear interval when the game is won
    }
  }

})

/*
Function for fishing
*/
let counter = 0;

function randomMove() {
  if (score == 3) {
    addText("you win!", { y: 5, color: color`3` });
    clearInterval(moveInterval);

  }

  /* displays time remaining and score*/
  const poleOnFish = tilesWith(pole, fish).length > 0;
  addText("Time left: " + (60 - counter), { y: 14, color: color`3` });
  addText("Score: " + score + "/" + 4, { y: 15, color: color`3` });
  /*
   Checks if any of fish cross the pole. Removes the first fish. 
  */
  counter = counter + 1;
  if (poleOnFish && !fishing) {
    getFirst(fish).remove();
    score++;
  }

  if (60 - counter <= 0) {
    setMap(levels[level]);
    counter = 0;
    score = 0;
  }
  


  /*randomly moves each individual fish around every second 1 tile in any direction */
  let list = getAll(fish);
  for (let i = 0; i < list.length; i++) {
    let num = Math.floor(Math.random() * 4);

    if (num == 0) {
      list[i].x += 1
    } else if (num == 1) {
      list[i].x -= 1;
    } else if (num == 2) {
      list[i].y -= 1;
    } else if (num == 3) {
      list[i].y += 1;
    }

  }
}
