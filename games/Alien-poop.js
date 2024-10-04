/*
@title: Alien poop
@author: Luis Guerrero
@tags: []
@addedOn: 2024-05-20
@img: ""

Check the tutorial in the bottom right, the run button is in the top right.
Make sure to remix this tutorial if you want to save your progress!
*/

// define the sprites in our game
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";
const lol = "l";
const iop = "i";
const secret = "s";
const oo = "o"

setBackground(lol)

// assign bitmap art to each sprite
setLegend(
  [ player, bitmap`
DDDDDDDDDDDDDDDD
DDDDD0D0DDDDDDDD
DDD0000000DDDDDD
DDDD00600DDDDDDD
DDD0026200DDDDDD
DDDDD666DDDDDDDD
DDD9977799DDDDDD
DD679979976DDDDD
D66799999766DDDD
D66D77777D66DDDD
DD669999966DDDDD
DDDD99D99DDDDDDD
DDDD99D99DDDDDDD
DDDD99D99DDDDDDD
DDDD77D77DDDDDDD
DDD777D777DDDDDD`],
  [ box, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDD0DDDDDDDD
DDDDDD000DDDDDDD
DDDDD00C00DDDDDD
DDDD00CCC00DDDDD
DDDD0C0C0C0DDDDD
DDDD0CCCCC0DDDDD
DDD00CC0CC00DDDD
DDD0CCCCCCC0DDDD
DDD000000000DDDD`],
  [ goal, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDD4DDDDDDDD
DDDDDDD4DDDDDDDD
DDDDDDD4DDDDDDDD
DDDD4444444DDDDD
DDDDDDD4DDDDDDDD
DDDDDDD4DDDDDDDD
DDDDDDD4DDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ wall, bitmap`
LLLL1LLLLLLLLLLL
L11L1L11L111LLLL
L11LLL11LL11L1LL
L11LL1111L11L11L
L11LL11LLL11L11L
L11LL1L11L11L11L
L11LL11LLL11L11L
L11LL11LL111L11L
L11LL11LL111L11L
L11LL1LLL111L11L
L11LL1L1L11L11LL
LL1LL1LLL1LL11LL
L11LLLLL11L111LL
L11LLL1LL1LL11LL
L11LLL11L111LLLL
LLLL1LLLLLLLLLLL`],
  [ lol, bitmap`
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
  [ iop, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [secret, bitmap`
DDDDDDD0DDDDDDDD
DDDDDDD2DDDDDDDD
DD0D22222DDD0DDD
DDDD222222DDDDDD
DDD2222H2HDD000D
DDDD2D2222DD0DDD
D0DDD332333D000D
DDDD3333333DD0DD
DDD220233022D0DD
D0222220222220DD
DD002222222200DD
DD0D22222222D0DD
DD0D22222222D0DD
DDDD22002222D0DD
DDDD20022202D0DD
DDDDD00DD00DDDDD`],
  [ oo, bitmap`
LLLL1LLLLLLLLLLL
L11L1L11L111LLLL
L11LLL11LL11L1LL
L11LL1111L11L11L
L11LL11LLL11L11L
L11LL1L11L11L11L
L11LL11LLL11L11L
L11LL11LL111L11L
L11LL11LL111L11L
L11LL1LLL111L11L
L11LL1L1L11L11LL
LL1LL1LLL1LL11LL
L11LLLLL11L111LL
L11LLL1LL1LL11LL
L11LLL11L111LLLL
LLLL1LLLLLLLLLLL`],
)
  

// create game levels
let level = 0; // this tracks the level we are on
const levels = [
  map`
wwwwwwwwwwwwwwwwww
wglllwwllllllblllw
wlllwwllbblllllllw
wlwwlblllllllllllw
wlwlllllllwllwlllw
wlwwllllwwlllllblw
lllwwwwllwlwllwllw
llllllllllllllllsw
llwwwwwwllllwlbllw
wwwwwwwwwllllllllw
wwwwwwllwlllllllww
llllllllwlwlwllllw
lllwwwllwlllllbllw
wllwwwllwllwlllllw
wblwllllllllllwllw
wlpwlllbllwllllllw
wllwllllllllllwllw
wwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwww
wwwlllllslllllllllllllllww
wlllllllllllllllllllllllww
wllwwwwwwwwwwwwwwwwwwwwllw
wllwwwlllllllllllllllwwllw
wllwlllllllllllllllllwwllw
wllwllwwwwwwwwwwwwwwllwllw
wllwllwgllllllllllllllwllw
wllwllwsllllllllllllwwwllw
wllwllwwwwwwwwwwwwwwwwwllw
wllwwllllllllllllllllllllw
wllwwllllllllllslllllllwww
wslwwwwwwwwwwwwwwwwwwwwwww
wwllllllllblllllllllpllllw
wwllllllllblllllllllllllww
wwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
llwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
llblwllllwlllwlllllllllwlllllwllllblwlllllw
lpllllwllllwllblwllwllblllwlllbllwlllllblgw
llwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww`,
  map`
lllbllllbllbll
lililillllllll
lilillslililll
biiililllbllll
lililililllill
lllllllliiilll
wwwwwbllllllll
plllwllblllllb
llwbwlllllllll
lwwbwllllllbll
lbbgwlbbllllll`,
  map`
wwwwwllwwwwwwwwwwww
wllllllllllllllllww
wllllllllllllllllww
wlllwwwwwwwwwwlllww
wllwwgbllllllwwllww
wllwwllllllllwwllww
wllwwsllwlwllwwlllw
wllwllllwlwllwwlllw
wllwwwwwwlwwwwwlllw
wlllllllllllllllllw
wwwwwwwlllllllllllw
wlllllllllllllllllw
wlllllllllllllllllw
wplllllllllwwwwwwll
wwwwwwwwwwwwwwwwwww`,
  map`
lllbllbllwsgwlb
llbllbllwwibwll
lllblllwwiiiwbl
lsllllwwiiiwwll
llbllwwiiiwwlll
llllwwiiiwwlllb
bllwwiiiwwlblll
llwwiiiwwllllll
lwwiiiwwllllbll
wwiiiwwlllbllll
iiiiwwllbllllbl
piiwwllllllllll`,
  map`
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
lpllllllwllllllllllllllllllllwlllllllllllw
wwwlwlwlwlwwwwwwwlwwwwwwwwwwlwlwlwwwlwwllw
wsllwlwlwlwlllllwllllllllllwlwswlwlwlwslww
wwwwwlwlwlwwwwwlwlwwwwwwwwlwlwwwlwlwlwwllw
wlllllwlwlwlllwlwllllllllwlwlllllwlwlllwlw
wlwwwwwlwlwlwlwlwwwwwwwwlwlwwwwwwwlwwwlwww
wlwlllllwlwlwswllllllllwlwlllllllllllwlllw
wlwlwwwwwlwlwwwwwwwwlwlwlwlwwwwwwwwwlwwwlw
wlwwwlllllwlwllllllwlwlwlwlwlllllllwlllwlw
wlllllwwwlwlwlwwwwlwlwwwlwlwlwwwwwlwlwlwlw
wwwwllllwlwlllwslwlllllllwlwlwlllwlwlwlwlw
wsllllwwwlwlwwwlllwwwwwwwwlwlwlwlwlwwwlwww
wwwwllwlllwlwllllllllllllwlwlwlwlwlllwlllw
wlllllwlwwwlwlwwwwwwwlwwlwwwlwlwlwwwlwwwlw
wlwwwwwlwlllwlwlllllllwllllllwlwlllwlwlllw
wlllllllwlwwwlwlwwwwwwwlwlwwwwlwwwlllllllw
wlwwwwwwwlwlllwlwlllllllwlwllllwlwwwwwlwlw
wlwlllllllwlwwwlwlwwwwwwwlwlwwwwlllllwlwlw
wlwlwlwwwwwlwlllwlwlllllllllwllllwwwlwlwlw
wlwlwlwlllllwlwwwlwlwwlwwwwwwlwwwwlwlwlwlw
wlwlwlwlwwwwwlwlllwlwlllllllllwllllwlwlwlw
wlwlwlllwlllllllwwwlwlwwwwwwwwwlwwlwlwlwww
wlwlwwwwwlwwwlwwwlwlwlwllllllllllwlwlwlllw
wlwlllllllwlwlllllwlwlwlwwlwwwwwwwlwlwwwlw
wwwwwwwwwwwlwwwwwlwlwlwlwwlwsllllwlwlllwlw
wswlllllllwllllswlwlwllllwlwwwwwlwlwwwlwlw
wlwlwwwwwwwlwwwwwlwlwwwwlwlllllllwlllwlwlw
wlwlwlllllllwlllllwllllwlwwwwwwwwwlwwwlwlw
wlwlwwwwwwwlwwwwwlwwwwlwlllllllllllllllwlw
wllllllllllllllllllllllllwwwwwwwwwwwwwwwbw
wwwwwwwwwwwwwwwwwwwwwwwwwwslllllllllllllgl`,
  map`
.wwwwwwwwwwwwwwww.w.w..w..w...w..w...w...........................l.......w........................................l.....l..................l.l.w
.ww...w...w.w.......................w.............l.........l.....l....l........l.........l......l....l.....l............................l.l.l.w
.ww...............................................................................................................................l..w.........w
.www.l...............................w...l...l....l...............................................................w............................w
.ww...l.......................................................l..................l.....................w.....................l................ww
.ww...............l...l.........l.......l......................................................l...................................l...........w
.ww.............l....l..l.........................l.......l...........l............l.............l............................................ww
.w........l......l..l...........................................................................................lw.....................l......ww
.ww...........................l......................................................l........................................................ww
.w...l.........................................................................................................................................w
.w...............................w.....www..w...www.wwww.ww...ww.www.........l.......................................l.........................w
.w................................w....w....w...w...w..w.w.w.w.w.w...............................................................l............ww
.ww...............................w...wwww..w...w...w..w.w..ww.w.www...............................................................l.....l....ww
.w.................................w.w.w....w...w...w..w.w.....w.w....................l...............................l........................w
.w..............l..................ww..www..www.www.wwww.w.....w.www...........................................................................w
.ww...l...........................................................ww.......................................l....................l..............w
.w.....l...........l...................................................l......................................................................ww
.w.............................................................................................l..............................................ww
.w...............................................................w..w.................................l........................................w
.w.................l..........................................................................................................................ww
.w.....l..........................l.............................w.......w...............................................l......................w
.w......................................l.......................wwwwww.w....................................l................l.................w
.w.........l...................................................................................................................................w
.o.....l................l..............................l........................................l..................................l......l...ww
.w...............................................................................l.........l.............l...................................www
.w........................l....................................................................................................................w
.w..................................l..........l...................l.........................................................................w.w
.ww..........................................................l..............l..................................................................w
.w.......................................................................................................................l.....................w
.ww.......l..........l..................................................l......................................................................w
.ww....l......................................................................................................................l................w
.w.........l....l.........l.............l............................................................l.......................................www
.w........l......l.............................................................................................................................w
.w..................................l....................................................l....................l......l................l.....w.ww
.w.....................l.................................................................................................................l....ww
.w..............................................l.............................l.................................l.............................ww
.ww......................................................l.........................................................................l.........www
.w...................................l........................................................................................................ww
.w.......ll........................................................................................l..........................................ww
.ww.......................................................l.....l.............................................l............................w...w
.ww...l....l..................................................................................................................................ww
.ww...........................................................................................................................................ww
.ww...............l.......l...............................................................l...................................................ww
.w...........................................l.........................l......................................................................ww
.w.....................l...................................................l...................l....................l.........................ww
.w.......l.......................l................................................l...........................................l...............ww
.w.....................................l.................l......................l..............................................................w
.w.............................................................................................................................................w
.w............................................................................................................................................ww
.w......................................................................................................................................l.....ww
.ww....l.......................................................b...............................................................................w
.ww...................................................................l..................................l...........................l........ww
.ww.............................l..............................................l...............................................................w
.w......................l...................l..........l.....................................................................................w.w
.ww..........................l......l......................................l...................................................................w
.ww..........l.l.......................................................................l......................................................ww
.ww..l..........l......................................................................................................l.......................w
.ww............................................................................................................................................w
.ww........................................................................................................................................w..ww
.w.....................................................................................................................................l.......w
.ww...l......................................................................................l.................................................w
.w.................................................l..............................................................l............................w
.w....................l....................................................................................................................w...w
.w...l.....l....................................................l...................................................................l..........w
.w.....................l...............................................................................l...........l...........................w
.w.....................l......................................l...............................................................................ww
.w...............................................................................l........................................................w....w
.w.........................................l................................................................................l........l.........w
.ww..l........................l.....l..........................................................................................................w
.ww...........................................l.......................................l...................................................w....w
.w.........l..................................................l................................................................................w
.ww.........................................................................l..................................................................w
.ww.l.l.................................l....................l............................................................................w..w.w
.w..............................................l.........l.................................................................l..................w
.w...........................................................................................................................l.................w
.w.........l.......l..............................................................................ll...........................................w
.w...........................................................................................................................................w.w
.w...........................l..l.........l.............................l......................................................................w
.w.........l...................................................................................................................................w
.w......l.l...................................................................................l.................................l..............w
.w.l..............l.............................................................l...l.......................................................w.ww
.w.....................................l.......................................................................................................w
.w.ll.......................l..........................................l........l................................l............................ww
.wl...l..................................l.........................l..........................................................................ww
.w...........................................................l................................................................................ww
.wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww.............l.....................................................................................ww
.wpllllllwllllllllllllllllllllwlllllllllllw..............l............l........................................................................w
.wwwlwlwlwlwwwwwwwlwwwwwwwwwwlwlwlwwwlwwllw....................................................................................................w
.wsllwlwlwlwlllllwllllllllllwlwswlwlwlwslww..............................................l.....................................................w
.wwwwwlwlwlwwwwwlwlwwwwwwwwlwlwwwlwlwlwwllw....................................................................................................w
.wlllllwlwlwlllwlwllllllllwlwlllllwlwlllwlw............................................................................l.......................w
.wlwwwwwlwlwlwlwlwwwwwwwwlwlwwwwwwwlwwwlwww......................................................................................l............ww
.wlwlllllwlwlwswllllllllwlwlllllllllllwlllw.......l..................................l........................................................ww
.wlwlwwwwwlwlwwwwwwwwlwlwlwlwwwwwwwwwlwwwlw...................l.......................................l.............................l.........ww
.wlwwwlllllwlwllllllwlwlwlwlwlllllllwlllwlw...............l......l.............................................................................w
.wlllllwwwlwlwlwwwwlwlwwwlwlwlwwwwwlwlwlwlw...................................................................................................ww
.wwwwllllwlwlllwslwlllllllwlwlwlllwlwlwlwlw....................................................................................................w
.wsllllwwwlwlwwwlllwwwwwwwwlwlwlwlwlwwwlwww.......l........................................................................................w..ww
.wwwwllwlllwlwllllllllllllwlwlwlwlwlllwlllw....................................................................................................w
.wlllllwlwwwlwlwwwwwwwlwwlwwwlwlwlwwwlwwwlw...............................l...............l........................................l..........ww
.wlwwwwwlwlllwlwlllllllwllllllwlwlllwlwlllw...............l.......................................................................l............w
.wlllllllwlwwwlwlwwwwwwwlwlwwwwlwwwlllllllw...........l.......................................................................................ww
.wlwwwwwwwlwlllwlwlllllllwlwllllwlwwwwwlwlw....................................................................................................w
.wlwlllllllwlwwwlwlwwwwwwwlwlwwwwlllllwlwlw....................l.............................................l...........l.....................w
.wlwlwlwwwwwlwlllwlwlllllllllwllllwwwlwlwlw......................................................................l............................ww
.wlwlwlwlllllwlwwwlwlwwlwwwwwwlwwwwlwlwlwlw......................................................................................l.............w
.wlwlwlwlwwwwwlwlllwlwlllllllllwllllwlwlwlw..................................................................................................www
.wlwlwlllwlllllllwwwlwlwwwwwwwwwlwwlwlwlwww..........................................l........................................................ww
.wlwlwwwwwlwwwlwwwlwlwlwllllllllllwlwlwlllw.............................................l...l.............................l...................ww
.wlwlllllllwlwlllllwlwlwlwwlwwwwwwwlwlwwwlw.............................l..........................l.......................................w..ww
.wwwwwwwwwwwlwwwwwlwlwlwlwwlwsllllwlwlllwlw................................................................................................w.www
.wswlllllllwllllswlwlwllllwlwwwwwlwlwwwlwlw....................................................................................................w
.olwlwwwwwwwlwwwwwlwlwwwwlwlllllllwlllwlwlw....................................................................................................w
.wlwlwlllllllwlllllwllllwlwwwwwwwwwlwwwlwlw...............w..w....w..........................................................................w.w
.wlwlwwwwwwwlwwwwwlwwwwlwlllllllllllllllwlw..........w.www..w......w...........w.w.ww.w...........................................w.......w..w.w
.wllllllllllllllllllllllllwwwwwwwwwwwwwwwbw....wwwwww..w.ww....ww.ww..w..ww.w..w.......wwww.w..w.......ww.w....ww...w..w.........w...w..ww.g..ww
.wwwwwwwwwwwwwwwwwwwwwwwwwwswwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
................................................................................................................................................
`,
  
 
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall, secret ]); // other sprites cannot go inside of these sprites

// allow certain sprites to push certain other sprites
setPushables({
  [player]: [box],
  [box]: [box]
});

// inputs for player movement control
onInput("s", () => {
  getFirst(player).y += 1; // positive y is downwards
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});


const melody = tune`
322.5806451612903,
161.29032258064515: E4^161.29032258064515,
161.29032258064515: E5-161.29032258064515,
161.29032258064515: E4^161.29032258064515 + G5/161.29032258064515,
161.29032258064515: E5-161.29032258064515,
161.29032258064515: E4^161.29032258064515,
161.29032258064515: E5-161.29032258064515,
161.29032258064515: E4^161.29032258064515,
161.29032258064515: E5-161.29032258064515,
161.29032258064515: E4^161.29032258064515,
161.29032258064515: E5-161.29032258064515,
161.29032258064515: E4^161.29032258064515 + G5/161.29032258064515,
161.29032258064515: E5-161.29032258064515,
161.29032258064515: E4^161.29032258064515,
161.29032258064515: E5-161.29032258064515,
161.29032258064515: E4^161.29032258064515,
161.29032258064515: E5-161.29032258064515,
161.29032258064515: E4^161.29032258064515,
161.29032258064515: E5-161.29032258064515,
161.29032258064515: E4^161.29032258064515 + G5/161.29032258064515,
161.29032258064515: D5/161.29032258064515,
161.29032258064515,
161.29032258064515: G4/161.29032258064515 + C5~161.29032258064515,
161.29032258064515,
161.29032258064515: E4/161.29032258064515 + A4~161.29032258064515,
161.29032258064515,
161.29032258064515: G4/161.29032258064515 + C5~161.29032258064515,
161.29032258064515,
161.29032258064515: E4/161.29032258064515 + A4~161.29032258064515,
161.29032258064515: G4/161.29032258064515 + C5~161.29032258064515,
161.29032258064515`; 
const playback = playTune(melody, Infinity)



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
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("u cleared the world", { y: 6, color: color`6` });
    }
  }
});
