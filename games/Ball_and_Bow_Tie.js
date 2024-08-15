/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Ball & Bow Tie
@author: Mihir Kaushal
@tags: []
@addedOn: 2024-08-15
*/

// define the sprites in our game
const player = "b";
const goal = "t";
const spike_down = "d";
const spike_up = "u";
const wall = "w";

// define sounds
const yay = tune`
37.5: C5-37.5,
37.5: D5-37.5,
37.5: E5-37.5,
37.5: F5-37.5,
37.5: G5-37.5,
37.5: A5-37.5,
37.5: B5-37.5,
937.5`
const pop = tune`
1000: E4/1000 + A4-1000 + D5^1000 + G5~1000,
1000: D4/1000 + G4-1000 + C5^1000 + F5~1000,
1000: E4/1000 + A4-1000 + D5^1000 + G5~1000,
1000: C4/1000 + F4-1000 + B4^1000 + E5~1000,
28000`

setLegend(
  [ player, bitmap`
....44444444....
...4444444444...
..444444444444..
.44444444444444.
4444444444444444
4444444444444444
4444444444444444
4444444444444444
D444444444444444
D444444444444444
DD44444444444444
DDD4444444444444
.DDDD44444444DD.
..DDDDD444DDDD..
...DDDDDDDDDD...
....DDDDDDDD....` ],
  [ goal, bitmap`
................
................
................
4..............4
44............44
444..........444
44444.4444.44444
4444444444444444
4444444444444444
44444.4444.44444
4444.........444
44............44
4..............4
................
................
................` ],
  [ spike_down, bitmap`
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
.HHHHHHHHHHHHHH.
.HHHHHHHHHHHHHH.
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
...HHHHHHHHHH...
...HHHHHHHHHH...
....HHHHHHHH....
....HHHHHHHH....
.....HHHHHH.....
.....HHHHHH.....
......HHHH......
......HHHH......
.......HH.......
.......HH.......` ],
  [ spike_up, bitmap`
.......HH.......
.......HH.......
......HHHH......
......HHHH......
.....HHHHHH.....
.....HHHHHH.....
....HHHHHHHH....
....HHHHHHHH....
...HHHHHHHHHH...
...HHHHHHHHHH...
..HHHHHHHHHHHH..
..HHHHHHHHHHHH..
.HHHHHHHHHHHHHH.
.HHHHHHHHHHHHHH.
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH` ],
  [ wall, bitmap`
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
HHHHHHHHHHHHHHHH` ]
);

setSolids([player, wall]);


// create game levels
let level = 1
const levels = [
  map`
..u...uu..uuu..u...u
..w...ww..www..w...w
..w...ww..w.ww.ww..w
..w...w..w...w..w..w
..w...w..w..ww..w..w
...wwww.w...w...wwww
.....w..wwww.......w
..www...dddd.......d
..ddd...............
....................
.u.....uu....uu..uu.
.w.....ww....ww..ww.
.w....ww.ww.w...w...
.w....w...w.w...w...
ww...ww...w.ww..w.ww
w....w....w..w..ww..
w....w..ww...w..w...
wwww.wwww..www..w...
dddd.dddd..ddd..wwww
................dddd`,
  map`
bddddddddd
..........
wwwwwwwww.
wddddddww.
w.....tww.
w.uuuuuww.
w.wwwwwww.
w.ddddddd.
w.........
wuuuuuuuuu`,
  map`
dddddddddd
b.........
uuuuuuuuu.
wwwwwwwww.
ddddddddd.
..........
.uuuuuuuuu
.wwwwwwwww
.ddddddddd
.........t`,
  map`
dddddddddd
b.........
uuu.......
...uu.....
.u.uuuuuu.
.d.dddddd.
.u........
.duuuuuuuu
........tu
uuuuuuuuuu`,
  map`
dwdddwdddd
bd...d....
...u...uu.
uuuwuuuww.
.......d..
..uu.ud..u
u.dd.d..d.
d..u.d....
td.d..dd..
...uu.....`,
  map`
b.........
uuuuuuuuu.
........d.
.uuuuuu.u.
.d....u.d.
.u.uutd.u.
.d.dddd.d.
.u......u.
.dddddddd.
..........`,
  map`
dwwwwwwwdwwwwwwwdwww
bdwwwwwd.dwwwwwd.dww
..dwwwd...dwwwd...dw
u..dwd..u..dwd..u..d
wu..d..uwu..d..uwu..
wwu...uwwwu...uwwwu.
wwwuuuwwwwwuuuwwwww.
wwwwwwwwwwwwwwwwwwd.
wwwwwwwwwwwwwwwwwd..
wwwwwwwwwdddddddd...
wwwwwuddd...........
wwwwwd..............
wwddd.........uuuuuu
u........uuuuuwwwwww
w...uuuuwwwwwwwwwwww
d...wwwwwwwwwwwwwddw
....ddddddddddddd..d
uu.................t
wwuu.uuuuuuuuu.uuuuu
wwwwuwwwwwwwwwuwwwww`,
  map`
....................
.....u.........u....
...u.w...wwww..w...u
...w.w...w..w..ww..w
...w.w..w...wu..w..w
...wwww.w...ww..w..w
.....w..w...w...w..w
.....w..ww.ww...w.ww
...www...www....www.
....w....ddd....ddd.
....d...............
uu....u.u...u.......
ww.u..w.w...w.......
.w.w..w..w...wwww...
.w.w..w..w...w..ww..
.w.w..w..w...w...w..
.ww.www..w...w...w..
.dd..w...d...d...d..
.....d..............
....................`
]

setMap(levels[level]);

setPushables({
  [ player ]: []
});

// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; 
});

onInput("w", () => {
  getFirst(player).y -= 1; 
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("a", () => {
  getFirst(player).x -= 1; 
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

const playerSprite = getFirst(player);
const goalSprite = getFirst(goal);
  
const spikeTile = getTile(playerSprite.x, playerSprite.y);

// Check if a spike sprite is in the same tile as the player
const touchingSpikeDown = spikeTile.some(sprite => sprite.type === spike_down);
const touchingSpikeUp = spikeTile.some(sprite => sprite.type === spike_up);


  
  if (playerSprite.x === goalSprite.x && playerSprite.y === goalSprite.y) {
    playTune(yay);
    // increase the current level number
    level += 1;
    const currentLevel = levels[level];
    setMap(currentLevel);
  } else if (touchingSpikeDown || touchingSpikeUp) {
  // Player is touching a spike
  playTune(pop);
  level = 0;
    const currentLevel = levels[level];
    setMap(currentLevel);
} 

});

