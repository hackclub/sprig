/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: SOKOBAN
@author: Diana
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const goal = "g"
const box = "b"
const wall = "w"
const breakableWall = "z"
const hint = "h"
const laser = "l"
const flower = "f"
const iceWall = "i"
const fire = "r"
const obtainFire = "o"


setLegend(
  [ player, bitmap`
................
................
................
.....6...6......
......6.6.......
.....66666......
...6.66666.6....
....6606066.....
...6.66666.6....
......333.......
....6.666.6.....
......666.......
......6.6.......
.....66.66......
................
................` ],
  [ goal, bitmap`
................
................
......7777......
....777..77.....
....7.....77....
...77......77...
...7........7...
...7........7...
...7.......77...
...77......7....
....7.....77....
.....77...7.....
......77777.....
................
................
................` ],
  [ box, bitmap`
9999999999999999
99CCCCCCCCCCC999
9C9CCCCCCCCC99C9
9CC9CCCCCCC99CC9
9CCC9CCCCC99CCC9
9CCC99CCC99CCCC9
9CCCCC9999CCCCC9
9CCCCCC99CCCCCC9
9CCCCCC999CCCCC9
9CCCC99CC99CCCC9
9CCCC9CCCC99CCC9
9CC99CCCCCC9CCC9
9CC9CCCCCCC999C9
9C99CCCCCCCCC999
99CCCCCCCCCCCC99
9999999999999999` ],
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
  [ breakableWall, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF` ],
  [ hint, bitmap`
6666666666666666
6333333223333336
6333333222333336
63333222L2233336
622222L222233336
6322L2222L223336
633222LL22223336
63332L2222223336
6333222222L23336
633332L2L2222336
6333322222222336
6333322222222336
6333222222211336
6332221111111336
6333333333333336
6666666666666666` ],
  [ laser, bitmap`
................
................
................
................
................
................
................
8888888888888888
8888888888888888
................
................
................
................
................
................
................` ],
  [ flower, bitmap`
......9..9......
.....999.99.....
.99.999.9999.99.
.9999.9999.99.9.
.9.9..9999.99.9.
.99999.99..9.99.
..99.999999999..
...9999999999...
.......DD.......
.......DD.......
...DD..DD..DD...
...DDDDDDDDDD...
....DDDDDDDD....
.......DD.......
.......DD.......
................` ],
  [ iceWall, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ],
  [ fire, bitmap`
..........9.....
.......9..9.....
....9..9.99.....
..9....9999.....
......999..99...
.....9.9.39.9.9.
..9.999.333.9...
..9.9.9333399.9.
..999393339399..
..9993.9333999..
....93333339....
....999339999...
.....9999999....
................
................
................` ],
  [ obtainFire, bitmap`
................
................
.....999999.....
...9999999999...
...9999999999...
..999933339999..
..999333333999..
..999333333999..
..999333333999..
..999333333999..
..999933339999..
...9999999999...
...9999999999...
.....999999.....
................
................` ]
)

setSolids([player,box,wall,breakableWall,iceWall])

let level = 0
const levels = [
  map`
p.w..
.bw..
..w..
..w..
....g`,
   map`
p.wg.
.bw..
..wb.
..w..
....g`,
  map`
p...h
.b...
zzzzz
.....
....g`,
     map`
......g
..wwwww
..wfw..
..wfw..
..wwwb.
.......
......p`,
   map`
.....zg
.....zz
..zzz..
..zpz..
..zzz..
.b.....
.......`,
  map`
wg...zg
w..b.zz
w.zzz..
w.zpzb.
w.zzz..
wb..g..
w......`,
   map`
ffwpwff
ffwbwff
ffwlwff
ffw.wff
ffwlwff
ffw.wff
ffwgwff`,
   map`
wwwwwwwww
.......zg
.bwwwwwww
..wffffff
w.wffffff
w.wwwwwww
..g.....w
pb......w
wwwww..ww`,
  map`
...wwww..
.....oz..
iiwwwww..
llwzzzw..
..wzgzwlw
llwzzzw.w
..wiiiwbw
..i...wlw
..i...wpw`,
   map`
ii.......
gi...o...
iiwww....
g...w....
....w....
.........
..bw.....
.......b.
.......p.`,
   map`
iiiiiiiiiii
iiiiiiiiiii
iiiiiiiiioi
iiiwwwwwzzz
iiiwwwwwzzz
iiiiigwwzzz
wwwwwwwwzzz
wwwwwwwwzzz
wwwwwwwwzzz
pb.........
wwwwwwww...`,
   map`
...w...wwii
lwlwlw.wwbi
.wlwlw.wwii
lw...w...zo
.wwwwwwwwzz
lwf.zgwff.f
.wf.wwwff.f
lwf.......f
.wfffffffff
lwfffffffff
pwfffffffff`,
    map`
www.....ww.
w.......gw.
w.pb....ww.
wwwwwwbb...
.b........g
...........
...........
.......gw..
g...b..ww..
....gwww...
....ww.....`
  
]

setMap(levels[level])

setPushables({
  [ player ]: [box]
})

//movements

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

//check if a specific type is present on a tile
const tileHasType = (x, y, type) => {
  const sprites = getTile(x, y);
  return sprites.some(sprite => sprite.type === type);
};

//laser time interval function
let laserIntervals = [];

function setupLaserBlinking() {
  // clear old timers
  laserIntervals.forEach(intervalID => clearInterval(intervalID));
  laserIntervals = [];

  getAll(laser).forEach(laserSprite => {
    const laserX = laserSprite.x;
    const laserY = laserSprite.y;

    const toggleLaserVisibility = () => {
      const tileSprites = getTile(laserX, laserY);
      const existingLaser = tileSprites.find(sprite => sprite.type === laser);

      if (existingLaser) {
        existingLaser.remove(); // remove only laser
      } else {
        addSprite(laserX, laserY, laser); // add back
      }
    };

    const intervalID = setInterval(toggleLaserVisibility, 1000);
    laserIntervals.push(intervalID);
  });
}



//press i to break breakable walls (on the 4 spaces around player)
onInput("i", ()=> {
  //left
  if(getFirst(player).x != 0 && tileHasType(getFirst(player).x - 1, getFirst(player).y, breakableWall) ){
    clearTile(getFirst(player).x - 1, getFirst(player).y);
  }
  //right
  if(getFirst(player).x != width() -1 && tileHasType(getFirst(player).x + 1, getFirst(player).y, breakableWall) ){
    clearTile(getFirst(player).x + 1, getFirst(player).y);
  }
  //up
  if(getFirst(player).y != 0 && tileHasType(getFirst(player).x, getFirst(player).y - 1, breakableWall) ){
    clearTile(getFirst(player).x, getFirst(player).y - 1);
  }
  //down
  if(getFirst(player).y != height() - 1 && tileHasType(getFirst(player).x, getFirst(player).y + 1, breakableWall) ){
    clearTile(getFirst(player).x, getFirst(player).y + 1);
  }
});

//if ya press j, you restart the current level
onInput("j", () => {
    const currentLevel = levels[level];
    if (currentLevel !== undefined){
      setMap(currentLevel);
      setupLaserBlinking();
    }
});

// press k and ya skip the current level (prolly temporary just for checking code... or not
onInput("k", () => {
  if(level != levels.length - 1){
    level++;
    const nextLevel = levels[level];
    if (nextLevel !== undefined){ 
      setMap(nextLevel);
      setupLaserBlinking();
    }
  }
});



//press l to use special abilities obtained after stepping on an ability tile
onInput("l", () => {
  if (hasFire) {
    const px = getFirst(player).x;
    const py = getFirst(player).y;

    const fireArea = [
      [px - 1, py], // left
      [px + 1, py], // right
      [px, py - 1], // up
      [px, py + 1]  // down
    ];

    fireArea.forEach(([x, y]) => {
      if (x >= 0 && x < width() && y >= 0 && y < height()) {
        // melt ice walls
        if (tileHasType(x, y, iceWall)) {
          clearTile(x, y);
        }
        // fire visuals on each direction
        addSprite(x, y, fire);
        setTimeout(() => {
          const sprites = getTile(x, y).filter(sprite => sprite.type !== fire);
          clearTile(x, y);
          sprites.forEach(s => addSprite(x, y, s.type));
        }, 500); //disappears after 0.5 second
      }
    });
  }
});


let hasFire = false;

afterInput(() => {


  // Check if the player steps on  hint tile
  const playerOnHintTile = getTile(getFirst(player).x, getFirst(player).y).some(sprite => sprite.type === hint);

  // Display breakableWallHint when the player steps on the hint tile
  if (playerOnHintTile) {
    clearText(); // Clear any existing text on the screen
    const breakableWallHint = "Some walls \ncan be broken! \nTry pressing \nthe i key.";
    addText(breakableWallHint, { x: 4, y: 5, color: color`0` }); 
  }else{
    clearText(); 
  }

  const onFireTile = getTile(getFirst(player).x, getFirst(player).y).some(sprite => sprite.type === obtainFire);
if (onFireTile && !hasFire) {
  hasFire = true;
  clearText();
  addText("You got the\nfire ability!\nPress L to use", {
    x: 1,
    y: 4,
    color: color`3`
  });

  // Show the message for 5 seconds (5000 ms)
  setTimeout(() => {
    clearText();
  }, 5000);
}




  
  //if player is on laser >:)
  const playerOnLaser = getTile(getFirst(player).x, getFirst(player).y).some(sprite => sprite.type === laser);
  if(playerOnLaser){
    //player dies so restart level
    const currentLevel = levels[level];
    if (currentLevel !== undefined) setMap(currentLevel);
  }



    const numberCovered = tilesWith(goal, box).length;
    const targetNumber = tilesWith(goal).length;

    if (numberCovered === targetNumber) {
      
        // increase the current level number
        level = level + 1;

        const currentLevel = levels[level];

        

        // make sure the level exists and if so set the map
        if (currentLevel !== undefined){
          setMap(currentLevel)
          //update laser blinking
          setupLaserBlinking();
        } else{
          addText("You win!", { y: 4, color: color`3` });
        }
    }

});