
/* 
@title: underground_escape
@author: Ezra York
@tags: []
@addedOn: 2024-05-20
@img: ""
*/ 

//player + enemys
    const player = "p"
    const grass = "i"
//map
    const wall = "w"
    const floor = "z"
    const Portal1 = "1"
    const Portal2 = "2"
    const fakewall = "3"
    const fakedoor = "n"
    const land = "4"
    const rock = "0"
    const sky = "x"
    const testkey = "9"
//goal
    const goal = "g"
  

//ITEMS
    const keypart = "k"
    const fakeKey = "f"
    const box = "b"
    const lock = "l"
    const board = "5"
    const funny = "6"
    const key2 = "7"
    const lock2 = "8"

setLegend(
	[ player, bitmap`
................
.......LL.......
......LL0L......
.....LL11LL.....
....LL1616LL....
....L02F2F0L....
....L022220L....
.....L0000L.....
....LLLLLLLL....
...55LLLLLL55...
..225.5555.522..
..22..5555..22..
......0..0......
......0..0......
....000..000....
................` ],
    [ goal, bitmap`
LLLLLLLLLLLLLLLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCC42CLL
LLCCCCCCCCC64CLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL` ],
    [ wall, bitmap`
LL1LLLLLLLLLL1LL
L1LLLLLLLLLLLL1L
1LLLLLLLLLLLLLL1
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
1LLLLLLLLLLLLLL1
L1LLLLLLLLLLLL1L
LL1LLLLLLLLLL1LL`],
    [ keypart, bitmap`
................
................
................
................
................
..55555.........
..5666555555....
..56.6666665....
..5666556565....
..5555.56565....
.......55555....
................
................
................
................
................`],
    [ fakeKey, bitmap`
................
................
................
................
................
..55555.........
..5666555555....
..56.6666665....
..5666556565....
..5555556565....
.......55555....
................
................
................
................
................`],
    [ box, bitmap`
.DDDDDD99DDDDDDD
DDDDDF11DDDDDDD9
FFFFF11FFFFFFF99
FFFFF11FFFFFFF99
FFFFFFFF22222F99
FFFFFFFF22222F99
FFFFFFFF22222F99
FFFFFFFFFFFFFF99
FFFFFFFFFFFFFF99
FFFFFFFFFFFFFF99
FFFFFFFFFFFFFF99
FFFFFFFFFFFFFF99
FFFFFFFFFFFFFF99
FFFFFFFFFFFFFF99
FFFFFFFFFFFFFF99
FFFFFFFFFFFFFF9.`],
    [ floor, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL
LL111111111111LL
11LLL111111LLL11
11111LLLLLL11111
11111LLLLLL11111
11LLL111111LLL11
LL111111111111LL`],
    [ lock, bitmap`
................
................
................
......7777......
.....771177.....
.....717717.....
...7771771777...
...7LLLLLLLL7...
...7LLLLLLLL7...
...7LLLL0LLL7...
...7LLLL0LLL7...
...7LLLL0LLL7...
...7LLLLLLLL7...
...7LLLLLLLL7...
...7777777777...
................`],
    [ Portal1, bitmap`
................
................
................
................
................
................
................
................
................
................
...0000000000...
..007222222700..
.00722222222700.
0072222222222700
.00772222227700.
..000000000000..`],
    [ Portal2, bitmap`
................
................
................
................
................
................
................
................
................
................
...0000000000...
..00C111111C00..
.00C11111111C00.
00C1111111111C00
.00CC111111CC00.
..000000000000..`],
    [ board, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`],
    [ fakewall, bitmap`
LL1LLLLLLLLLL1LL
L1LLLLLLLLLLLL1L
1LLLLLLLLLLLLLL1
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
1LLLLLLLLLLLLLL1
L1LLLLLLLLLLLL1L
LL1LLLLLLLLLL1LL`],
    [ fakedoor, bitmap`
LLLLLLLLLLLLLLLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCC66CLL
LLCCCCCCCCC66CLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL
LLCCCCCCCCCCCCLL`],
    [ funny, bitmap`
................
................
................
......7777......
.....771177.....
.....717717.....
....771771777...
...7LLLLLLLL7...
...7LLLLLLLL7...
...7LLLL0LLL7...
...7LLLL0LLL7...
...7LLLL0LLL7...
...7LLLLLLLL7...
...7LLLLLLLL7...
...7777777777...
................`],
    [ key2, bitmap`
................
................
................
................
................
................
..8888..........
..8666888888....
..8686666668....
..8666886868....
..8888.88888....
................
................
................
................
................`],
    [ lock2, bitmap`
................
................
................
.....66666......
....6611166.....
....6166616.....
..66616661666...
..6LLLLLLLLL6...
..6LLLLLLLLL6...
..6LLLL0LLLL6...
..6LLLL0LLLL6...
..6LLLL0LLLL6...
..6LLLLLLLLL6...
..66666666666...
................
................`],
    [ land, bitmap`
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
FFFFFFFFFFFFFFFF`],
    [ rock, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFF111FFFFF
FFFFFL1111F1FFFF
FFFFLFLF1F11FFFF
FFFLFLLLFLLLLFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],
    [ sky, bitmap`
7777777777777777
7777777777777777
7777777722777777
7777777222277777
7777777777777777
2777777777777772
2277777777777722
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7222777777777777
7772227777777777
7777777777777777
7777777777777777
7777777777777777`],
    [ testkey, bitmap`
................
................
................
................
................
................
..555555........
..566665555555..
..56..66666665..
..56..65556565..
..566665.56565..
..555555.55555..
................
................
................
................`],
    [ grass, bitmap`
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
FFFFFFFFFFFFFFFF`]
    
  )





  //note: Make sure to give the enemy a actual sprite!

const youWon = tune`
204.08163265306123: C4^204.08163265306123 + B5~204.08163265306123,
204.08163265306123: F4^204.08163265306123 + F5~204.08163265306123,
204.08163265306123: B4^204.08163265306123 + C5~204.08163265306123,
204.08163265306123: D5^204.08163265306123 + C4^204.08163265306123 + A4~204.08163265306123,
204.08163265306123: A5^204.08163265306123 + E4~204.08163265306123,
204.08163265306123: F4^204.08163265306123 + F5~204.08163265306123,
204.08163265306123: B4^204.08163265306123,
204.08163265306123: D5^204.08163265306123,
204.08163265306123: B5^204.08163265306123 + C4~204.08163265306123,
408.16326530612247,
204.08163265306123: A5^204.08163265306123 + G5^204.08163265306123 + D4~204.08163265306123 + E4~204.08163265306123,
204.08163265306123: E5^204.08163265306123 + D5^204.08163265306123 + G4~204.08163265306123 + A4~204.08163265306123,
204.08163265306123,
204.08163265306123: F4^204.08163265306123 + G4^204.08163265306123 + C5~204.08163265306123 + B4~204.08163265306123,
204.08163265306123,
204.08163265306123: E5^204.08163265306123 + D5^204.08163265306123,
204.08163265306123,
204.08163265306123: B4~204.08163265306123,
204.08163265306123: B4~204.08163265306123,
204.08163265306123,
204.08163265306123: D5~204.08163265306123,
204.08163265306123: C5~204.08163265306123,
204.08163265306123: B4~204.08163265306123,
204.08163265306123: A4~204.08163265306123,
204.08163265306123: D4~204.08163265306123,
204.08163265306123,
204.08163265306123: F5~204.08163265306123 + C4~204.08163265306123,
204.08163265306123: E5~204.08163265306123 + D4~204.08163265306123,
204.08163265306123: D5~204.08163265306123 + E4~204.08163265306123,
204.08163265306123: D5~204.08163265306123 + F4~204.08163265306123,
204.08163265306123: E5~204.08163265306123 + G4~204.08163265306123`
const steps = tune`
132.15859030837004: C4^132.15859030837004 + D4^132.15859030837004,
4096.916299559472`
const teleport = tune`
54.054054054054056: A4-54.054054054054056 + C4~54.054054054054056 + D4~54.054054054054056,
54.054054054054056: A4-54.054054054054056 + B4-54.054054054054056 + D4~54.054054054054056 + E4~54.054054054054056 + F4~54.054054054054056,
54.054054054054056: B4-54.054054054054056 + F4~54.054054054054056 + G4~54.054054054054056,
54.054054054054056: B4-54.054054054054056 + G4~54.054054054054056 + A4~54.054054054054056,
54.054054054054056: B4-54.054054054054056 + C5~54.054054054054056,
54.054054054054056: B4-54.054054054054056 + A4-54.054054054054056 + F4-54.054054054054056 + G4-54.054054054054056 + C5~54.054054054054056,
54.054054054054056: F4-54.054054054054056 + E4-54.054054054054056 + D5~54.054054054054056 + E5~54.054054054054056,
54.054054054054056: E4-54.054054054054056 + E5~54.054054054054056 + F5~54.054054054054056 + G5~54.054054054054056,
54.054054054054056: F4-54.054054054054056 + G4-54.054054054054056 + G5~54.054054054054056 + A5~54.054054054054056,
54.054054054054056: G4-54.054054054054056 + A4-54.054054054054056 + B4-54.054054054054056 + C5-54.054054054054056 + A5~54.054054054054056,
54.054054054054056: C5-54.054054054054056 + B5~54.054054054054056,
54.054054054054056: C5-54.054054054054056 + B4-54.054054054054056 + F4-54.054054054054056 + E4-54.054054054054056,
54.054054054054056: A4-54.054054054054056 + G4-54.054054054054056,
1027.027027027027`
const steps2 = tune`
127.11864406779661: F4^127.11864406779661 + G4^127.11864406779661,
3940.677966101695`
const levelComplete = tune`
144.92753623188406: A4~144.92753623188406 + B4^144.92753623188406,
144.92753623188406: F5~144.92753623188406 + G5^144.92753623188406,
4347.826086956522`
const level1 = tune`
280.3738317757009: C4-280.3738317757009,
280.3738317757009,
280.3738317757009: F5-280.3738317757009,
280.3738317757009,
280.3738317757009: A5-280.3738317757009,
280.3738317757009,
280.3738317757009: C5-280.3738317757009,
280.3738317757009: G5-280.3738317757009 + F4-280.3738317757009,
280.3738317757009,
280.3738317757009: C5-280.3738317757009,
280.3738317757009,
280.3738317757009: E5-280.3738317757009,
280.3738317757009: D4-280.3738317757009,
280.3738317757009,
280.3738317757009: B4-280.3738317757009,
280.3738317757009: D4-280.3738317757009 + G5-280.3738317757009,
280.3738317757009,
280.3738317757009: G5-280.3738317757009 + A4-280.3738317757009,
280.3738317757009,
280.3738317757009: B4-280.3738317757009,
280.3738317757009,
280.3738317757009: G4-280.3738317757009,
280.3738317757009: F5-280.3738317757009 + F4-280.3738317757009,
280.3738317757009,
280.3738317757009: F5-280.3738317757009 + B4-280.3738317757009,
280.3738317757009,
280.3738317757009: B5-280.3738317757009,
280.3738317757009: E5-280.3738317757009 + D5-280.3738317757009,
280.3738317757009: C4-280.3738317757009,
280.3738317757009: G5-280.3738317757009 + A4-280.3738317757009,
280.3738317757009: E5-280.3738317757009,
280.3738317757009: F5-280.3738317757009`
const key = tune`
130.43478260869566: G4^130.43478260869566 + F4-130.43478260869566,
130.43478260869566: A5-130.43478260869566 + B5~130.43478260869566,
3913.0434782608695`

setBackground("z");

setSolids([player, wall, lock, lock2, fakeKey, box, fakewall])

let level = 0;

const levels = [
    map`
..............
.......b.3....
...7.8........
p........9....
..............
.........l....
........wgw...
.2.1....www...`,
	map`
......w......b...........
...k..3......b...........
..b..nw......wwwb....f...
....bww......wgl....b..f.
......w...b..www.....f...
2...b.w....w8w...b.......
wwwwwwwwwwwwpwwwwwwwwwwww
.b..w....w.....w..f......
....w..b.w.....w......bf.
..b.www.ww..7..w.b.f.....
.f..f.w..wwwwwwwwwwwwww..
.b....w..f.........b.....
.f..b.3......b...f.....b.
......w.....f............`,
    map`
......w......w........b...........
......w...k..ww......b..b.....wwww
www................b...w3www..w...
..3.....wwww........wwww...w..w...
b.w.....w..w...b....w......wwww...
..w3bwwwwb.w.b....wwwf.....w....f.
.f......w..3......w..b..........ww
....1...w..3....b.w.............lg
wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww
.........fw.pw.............w......
........www..w.............w.f.b..
..........w..w.b.b..w......w...b..
..wwwwwwwww..wwwww..w..w...wwwww..
.......w.....w...w..w..w.....2....
...b...www...w...wwwwwwwb...www...
..b..f.....b.b...........b..www...
.............b....................`,
    map`
.........ww...w...
...b....w.w...w...
..b....w..w.b.w.b.
p..1..w...w.2.w..2
wwwwww....wwwwwwww
.....w....w.......
....bw....w.b.....
.b...w....w.......
2.b..w....w...1.b.
.....w....w.......`,
    map`
.........ww.k.w.wg
...b....w7w...w.wl
..b....3..w.b.w.b.
p..1..w...w.2.w...
w3wwww..b.wwwwww8w
.....w.b..3.......
....bw....w.b.....
.b...wb.b.w.......
..b..3.b..w.....b.
.....w....w.......`,
    map`
...b..........f......
f...b...wwww.......f.
..w.....wwww.wwwwwwww
..www........w..w..b.
b.w.w..b.....w..w.b..
333....b..b...f.w..7.
k8.........b....w.1..
wbwwwwwww..wwwwwwwwww
wbf..wp....w.b.......
wb...w.f...w.b....w.f
www..w..w..w..b..bw..
bfwb.wwww......b..w..
..w.b..........b.fwww
.b...2.............lg`,
    map`
.......b..............
.b.......b........b...
...b.......wwwwwwwww..
........b.bw....w..b..
.www.bb.b..wn...w..www
...w.......wwww.w...b.
...w.....b.3....wwww..
...wwwwww.p3..b.w.....
..wnw...w..w....w..www
nw..w...w..wb...w..w.n
w...w...ww3w....w..w..
.b..w.b....wwwwww..w..
....w..........gw..b..
.b..w...........wwww..
b........b......w.....`,
    map`
w.......3.......w
gw....b...b....w.
l.w.b.f.w..f..w..
.f.3....w.b..w...
....w..pw...w..f.
wwwwwww3ww3wwwwww
.fw.....w.....wk.
..w....bwb.f..3..
..w.bf..w...b.w.b
.bw.....w.....w..
..3..fb.w..f..w..
..w.....w...b.w..`,
    map`
..........w.f........f.
.f.....p..w....f.ww....
...f......3......ww..w6
.....wwwwwww.f.....f.wg
..b........w..www33wwww
....b...wwww..w....wn..
www.....w.fwwwwb...w...
.nww3ww.w....wn..b....b
b.....w.w..f.w.........
......www....w..f.....f
.f.b.f.....b.3.b...f...
.............w.........`,
    map`
.wkw.........w..b.....
..8.b.....b.w......b..
...b.......3..b.......
..........w......1....
wwwwwwww.w..b.wwwwwwww
.......wwwwwwww......w
....b................w
p....................w
.b..........bb......lg
.......b.............w
............b........w
www3wwww...2..wwwwwwww
7......wwwwwwww.......
......................`,
    map`
xxxxxx
xxxxxx
440444
444i40`
];


afterInput(() => {
  const redPortalsCovered = tilesWith(player, Portal2);
  const bluePortalsCovered = tilesWith(player, Portal1);
  if (redPortalsCovered.length >= 1) {
    const bp = getFirst(Portal1);
    const pl = getFirst(player);

playTune(teleport);
    pl.x = bp.x;
    pl.y = bp.y;
  }
  if (bluePortalsCovered.length >= 1) {
    const rp = getFirst(Portal2);
    const pl = getFirst(player);
    playTune(teleport);
    pl.x = rp.x;
    pl.y = rp.y;
  }

    
});

afterInput(() => {
  const goalsCovered = tilesWith(player, goal);
  const keysTaken = tilesWith(player, keypart);
if (goalsCovered.length >= 1) {

level = level + 1;

    const currentLevel = levels[level];


    if (currentLevel !== undefined) {
      clearText();
      setMap(currentLevel);
    } 
}





if (keysTaken.length >= 1) {
getFirst(lock).remove();
playTune(key);
getFirst(keypart).remove();
}})

afterInput(() => {
  const goalsCovered = tilesWith(player, goal);
  const keysTaken = tilesWith(player, key2);
if (goalsCovered.length >= 1) {

}

if (keysTaken.length >= 1) {
getFirst(lock2).remove();
playTune(key);
getFirst(key2).remove()
}})


afterInput(() => {
  const goalsCovered = tilesWith(player, goal);
  const keysTaken = tilesWith(player, testkey);
if (goalsCovered.length >= 1) {

}

if (keysTaken.length >= 1) {
getFirst(lock).remove();
playTune(key);
      addText("W, A, S, D to move", { y: 1, color: color`6` });
      addText("find the right key", { y: 13, color: color`4` });
      addText("good luck finding it", { y: 14, color: color`4` });
getFirst(testkey).remove()
}})


const playback = playTune(level1, Infinity)

setMap(levels[level])

setPushables({
	[ player ]: [keypart, fakeKey, box, fakewall],
    [box]: [box, fakeKey, fakewall],
    [fakeKey]: [box],
    [fakewall]: [box]
})

onInput("s", () => {
	getFirst(player).y += 1
  playTune(steps);
})

onInput("w", () => {
    getFirst(player).y -= 1
  playTune(steps2);
})

onInput("a", () => {
    getFirst(player).x -= 1
  playTune(steps);
})

onInput("d", () => {
    getFirst(player).x += 1
  playTune(steps2);
})


afterInput(() => {

const targetNumber = tilesWith(goal).length;

const numberCovered = tilesWith(goal, player).length;

if (numberCovered === targetNumber) {

    level = level + 1;

const currentLevel = levels[level];

if (currentLevel !== undefined) {

setMap(currentLevel);

playTune(levelComplete);
}
if(currentLevel !== undefined) {
setMap(currentLevel); 
} else {
      playback.end();
      
      addText("you got out!", { y: 4, color: color`5` });
      playTune(youWon);
    }
  }
});

//enjoy the game that doesn't mean much to me...
