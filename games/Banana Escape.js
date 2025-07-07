/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Banana Escape
@author: mel-cruz
@tags: []
@addedOn: 2025-00-00
*/
// banana game: objective is to get the banana to the door and away to not get eaten

const banana = "p"
const items = "b";
const door = "g";
const person = "w";

setLegend(
  [ banana, bitmap`
................
................
.......FFF......
.......F6F......
......F66F......
......F666F.F...
....FFF060F.F...
....F.F666FFF...
....F.F333F.....
......F333F.....
.....F6333F.....
.....F666F......
......FFF.......
......F.F.......
.....FF.FF......
................` ],
  [ items, bitmap`
................
................
................
...FFFFFFFFFFF..
...FFFFFFFFFFF..
...F00000000FF..
...F00000000FF..
...F00000000FF..
...F00000000FF..
...F00000000FF..
...F00000000FF..
...F00000000FF..
...F00000000FF..
...FFFFFFFFFFF..
................
................`],
  [ door, bitmap`
....CCCCCCCC....
....CFFFFFFC....
....CF6666FC....
....CF6666FC....
....CFFFFFFC....
....CCCCCCCC....
....CCCCCCCC....
....CFFCCCCC....
....CFCCCCCC....
....CCCCCCCC....
....CCCCCCCC....
....CCCCCCCC....
....CCCCCCCC....
....CCCCCCCC....
....CCCCCCCC....
....CCCCCCCC....`],
  [ person, bitmap`
9999999999999999
9933330000333399
933330....033339
93330.C..C.03339
93330......03339
93330..33..03339
933330....033339
933L33000033L339
9333LL3LL33L3339
933333LLLLL33339
9333333LL3333339
9333333LL3333339
9333332332333339
9333332332333339
9933323333233399
9999999999999999`]
);

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
ww.b..
w..w.g
..wwww
pwww.w
.....w`,
  map`
.w....
b.....
bb..ww
.w.b.w
pw...g`,
  map`
www....
www..bg
wwwb..w
ww..w.w
wb..www
pbb..ww`,
  map`
pwww......
..wwwwww..
.www.wwwww
b..wwwwwww
.w...w.www
www.w..www
..w.w..www
.wwb.b...g
ww..www...`,
  map`
g...wwg...w
www.wwwww.w
...b.w...b.
.www.w.www.
....bw....b
wwwwpwwwwwp`,
  map`
ggggggg
ggggggg
ppppppp
ggggggg
ggggggg`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ banana, items, person ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [banana]: [items],
  [items]: [items]
});


// inputs for banana movement control
onInput("w", () => {
  getFirst(banana).y -= 1; // negative y is upwards?
});
onInput("a", () => {
  getFirst(banana).x -= 1;
});
onInput("s", () => {
  getFirst(banana).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(banana).x += 1;
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
  // Check if the banana has reached the door
  const bananaTile = getTile(getFirst(banana).x, getFirst(banana).y);
  
  // Check if the banana is on a tile with a door
  if (bananaTile.some(sprite => sprite.type === door)) {
    advanceToNextLevel();
  }
});

// Function to advance to the next level or end the game
function advanceToNextLevel() {
  level = level + 1;
  const currentLevel = levels[level];

  // Check if there is a next level
  if (currentLevel !== undefined) {
    setMap(currentLevel);
  } else {
    addText("you escaped!", { y: 4, color: color`4` });
  }
}
