
/* 
@title: Solstice_game
@author: Stephanie Zhou
@tags: ['puzzle']
@addedOn: 2024-07-022
*/

    const player = "p"
    const obstacle = "o"
    const background = "b"
    const goal = "g"
    const box = "x"
    const enemy = "e"
    let treasures = 0;

setLegend(
	[ player, bitmap`
................
................
.......66.......
......6666......
....6......6....
......6666......
...6.666666.6...
..66.666666.66..
..66.666666.66..
...6.666666.6...
......6666......
....6......6....
......6666......
.......66.......
................
................` ],
  [obstacle, bitmap`
................
................
................
................
................
.......22.......
......2222......
.....222222.....
.....LL22L2.....
.....LLLLLL.....
....LLLLLLLL....
...LLLLL111LL...
...LL111LLLLLL..
..LLLLLLLLLL1L..
.LLLLLLLLLLLLLL.
................`],
  [background,bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [goal, bitmap`
................
................
.....66666666...
....66......666.
..666.66666...6.
.....6.666.66...
..666.66666.66..
...6..66666.666.
....66.666.66...
.....666666.....
.........66.....
..6....66.666...
.66...66..66....
.6..666...66....
..66......6.....
................`],
  [box, bitmap`
................
................
....D000000D....
....DD6DDFD.....
.....D6DDFD.....
.....D6DDFD.....
......D6DFD.....
......D6DFD.....
......D6DFD.....
.....DD6DFDD....
.....DD6DDFDD...
....DD66DDFDD...
...DDD66DDFFDD..
...DDDD66DFFDD..
.....DDDDDDDD...
.....FFFFFFF....`],
  [enemy, bitmap`
................
................
....400000044...
....44644F44....
....00644F000...
.....000400.....
......32423.....
......33433.....
..0000460F40000.
.....4404044....
.....44644F44...
....446644F44...
....446644FF4...
.....DDDDDDD....
......0..0......
................`]
  
)
setBackground(background)

setSolids([player, obstacle,box])

let level = 0
const levels = [
  
	map`
.o......
.....o.o
..o.o..o
..o.o..o
.o.oo...
poo.....
.o.g.ooo`,
  map`
..............
...oo..ooooo..
...oo.oo....o.
p..oo.o...g.o.
...oo.o..o..o.
o.ooooo..oooo.
ooo..oo.......`,
  map`
......
poo.oo
oo.xgo
ooo.oo
oo....`,
  map`
......
po.xx.
oo.xgo
oo.xxo
oooooo`,
  map`
..o..oo
oo...oo
px..xgo
oo.....
oooooo.`,
  map`
oooooooooo
....oo...o
.....x..g.
p....x....
.....x.o..
.....x.o..
.....x.o..
oooooooooo`,
  map`
.......o....o
.......o.oogo
.......ooo.x.
ooo....o..o..
..po...x..o..
..oo...o.x...
.....o.oo.x..
.......o.....
.o.o...oooooo`
  
  
]

setMap(levels[level])

setPushables({
	[ player ]: [box],
    [box]:[box]
})
const myTune = tune`
144.92753623188406,
144.92753623188406: B4^144.92753623188406,
1014.4927536231885,
144.92753623188406: G4^144.92753623188406,
144.92753623188406: B4^144.92753623188406,
144.92753623188406: B4^144.92753623188406,
289.8550724637681,
144.92753623188406: G4^144.92753623188406,
579.7101449275362,
144.92753623188406: E4-144.92753623188406,
289.8550724637681,
144.92753623188406: D5-144.92753623188406,
434.7826086956522,
144.92753623188406: F4^144.92753623188406,
724.6376811594203`;

onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
  //playTune(myTune);
});

onInput("d", () => {
  getFirst(player).x += 1;
  //playTune(myTune);
});

onInput("w", () => {
  getFirst(player).y -= 1; // positive y is downwards
  //playTune(myTune);
});

onInput("a", () => {
  getFirst(player).x -= 1;
  //playTune(myTune);
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});


// these get run after every input
afterInput(() => {
function checkForPlayer(x,y) { 
  let result = false
  getTile(x,y).map((tile) => {
    if (tile.type == player)
      result = true
  })
  return result 
}

let up = false

setInterval(() => {
    if (level == 5) {
        if (up) { 
            if (!(checkForPlayer(2,3) || checkForPlayer(3,3))) { 
                clearTile(2,3)
                clearTile(3,2)
                addSprite(2,6, enemy)
                addSprite(3,3,enemy)
                up = false 
            }
        } else {
            if (!(checkForPlayer(2,0) || checkForPlayer(3,2))) {
                clearTile(2,6)
                clearTile(3,3)
                addSprite(2,3,enemy)
                addSprite(3,2,enemy)
                up = true
            }
        }
    } else if (level == 6) {
        if (up) { 
            if (!(checkForPlayer(1,1) || checkForPlayer(3,3) || checkForPlayer(5,4) || checkForPlayer(1,7))) { 
                clearTile(1,2)
                clearTile(3,2)
                clearTile(5,5)
                clearTile(1,7)
                addSprite(1,1, enemy)
                addSprite(3,3,enemy)
                addSprite(5,4, enemy)
                addSprite(3,7,enemy)
                up = false 
            }
        } else {
            if (!(checkForPlayer(1,2) || checkForPlayer(3,2) || checkForPlayer(5,5) || checkForPlayer(3,7))) {
                clearTile(1,1)
                clearTile(3,3)
                clearTile(5,4)
                clearTile(3,7)
                addSprite(1,2,enemy)
                addSprite(3,2,enemy)
                addSprite(5,5,enemy)
                addSprite(1,7,enemy)
                up = true
            }
        }
    }
}, 500)



  const enemyTouch = tilesWith(player, enemy); 
    
    if (enemyTouch.length > 0) {
        setMap(levels[level]);
        treasures = treasures - 1;
    }

  if(level === 0) {
    addText("find treasure!", { y: 4, color: color`3` })
  }
  
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and player
  const numberCovered = tilesWith(goal, player).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;
    treasures = treasures + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      clearText();
      setMap(currentLevel);
    } else {
      addText(treasures + " treasures found!", { y: 4, color: color`3` });
    }
  }
});
