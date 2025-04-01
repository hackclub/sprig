/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: dawg
@author: 
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const dog = "d"
const shelter = "s"
const rock = "r"
const wall = "w"
const background = "b"
const backgroundTune = tune`
300: A4^300 + E5-300 + F4~300,
300: B4~300 + F5-300 + F4~300,
300: A4^300 + G5-300 + F4~300 + C5/300,
300: B4~300 + A5-300 + F4~300,
300: A4^300 + G5-300 + E5/300,
300: B4~300 + A5-300 + F4~300,
300: A4^300 + G5-300 + F4~300 + C5/300,
300: B4~300 + F5-300 + F4~300,
300: E5-300 + A4^300,
300: B4~300 + F5-300 + F4~300,
300: A4^300 + G5-300 + F4~300 + C5/300,
300: B4~300 + A5-300 + F4~300,
300: A4^300 + G5-300 + E5/300,
300: B4~300 + A5-300 + F4~300,
300: A4^300 + G5-300 + F4~300 + C5/300,
300: B4~300 + F4~300 + F5-300,
300: E5-300 + A4^300,
300: B4~300 + F5-300 + F4~300,
300: A4^300 + G5-300 + F4~300 + C5/300,
300: B4~300 + A5-300 + F4~300,
300: A4^300 + G5-300 + E5/300,
300: B4~300 + A5-300 + F4~300,
300: A4^300 + G5-300 + F4~300 + C5/300,
300: B4~300 + F5-300 + F4~300,
300: E5-300 + A4^300,
300: B4~300 + F5-300 + F4~300,
300: A4^300 + G5-300 + F4~300 + C5/300,
300: B4~300 + A5-300 + F4~300,
300: A4^300 + G5-300 + E5/300,
300: B4~300 + A5-300 + F4~300,
300: A4^300 + G5-300 + F4~300 + C5/300,
300: B4~300 + F5-300 + F4~300`
const bark = tune`
202.7027027027027,
101.35135135135135: C5/101.35135135135135 + A4^101.35135135135135 + F4~101.35135135135135,
101.35135135135135: A4-101.35135135135135 + F4~101.35135135135135 + D4/101.35135135135135,
2837.837837837838`
playTune(backgroundTune, Infinity)

setLegend(
  [ player, bitmap`
................
................
......55........
.....5555.......
....02025.......
.....CCC5.......
.....C8C5.......
....555555......
....555555......
....555555......
...00555500.....
.....0L0L.......
.....0L0L.......
.....0L0L.......
.....1111.......
....11111.......` ],
  [ dog, bitmap`
................
................
................
................
...............C
..............C.
....CC.CC.....C.
.....0C0C....C..
....CCCC.....C..
...0CCCCCCCCCC..
....3..CCCCCCC..
.......CCCCCCC..
.......C.C.C.C..
......C..C.C.C..
................
................` ],
  [ shelter, bitmap`
................
................
................
................
................
.......00.......
......0DD0......
.....0DDDD0.....
....0DDDDDD0....
...0DDDDDDDD0...
..0DDDDDDDDDD0..
...DDDDDDDDDD...
...DDDD22DDDD...
...DDD2222DDD...
...DDD2222DDD...
...DDD2222DDD...` ],
  [ rock, bitmap`
................
................
................
................
................
.......00.......
.....0000000....
.....0111LL0....
.....01L00L0....
....00110L10....
....01100L00....
....001LL000....
.....0000LLL....
......LLL00.....
.......L........
................` ],
  [ wall, bitmap`
000LL00LL00LL000
000LL00LL00LL000
LL000000000000LL
LL000000000000LL
0000LLLLLLLL0000
0000LLLLLLLL0000
LL00LL1111LL00LL
LL00LL1111LL00LL
0000LL1111LL0000
0000LL1111LL0000
LL00LLLLLLLL00LL
LL00LLLLLLLL00LL
0000000000000000
0000000000000000
LL0LL00LL00LL0LL
LL0LL00LL00LL0LL` ],
  [ background, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222` ],
)

setSolids([dog, player, wall, rock])

let level = 0
  const levels = [
  map`
p.w.rw.r.r
..wr.w.d.w
r.w......w
w.w.r..www
w.....rw..
.....w..rw
..r.w.r..w
s..wwrwwww`,
  map`
p.wr...w.r
..w....d..
....rw....
r....w.ww.
.w........
.rwwwr.rww
r.wrr....w
www.r..s.w`,
  map`
p.rww....r
...w.....s
w.......ww
r....rw...
r....ww..r
rww..w...r
ww.r...drw
w.r.....ww`,
  map`
p.rrw.r..w
...rww..r.
........r.
.dr..rwwww
ww......rr
rrw..r...r
r.......ww
wwwws...ww`
]

setMap(levels[level])

setPushables({
  [ player ]: [rock, dog]
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})
onInput("j", () => {
  setMap(levels[level])
})

let previousDogCoordinates = {"x": getFirst(dog).x, "y": getFirst(dog).y }

addText("Press J to reset", {x:2, y:7, color:color`9`})

afterInput(() => {
  clearText();
  
  if (tilesWith(dog, shelter).length >= 1) {
    if (level < levels.length - 1) {
      level++; // Move to the next level
      setMap(levels[level]); // Load the new level
    } else {
      addText("You won all levels!", { x: 1, y: 7, color: color`9` });
    }
  }
  
  let currentDogCoordinates = { x: getFirst(dog).x, y: getFirst(dog).y };
  if (currentDogCoordinates.x !== previousDogCoordinates.x ||
      currentDogCoordinates.y !== previousDogCoordinates.y) {
    playTune(bark, 1);
    previousDogCoordinates = currentDogCoordinates;
  }
});
