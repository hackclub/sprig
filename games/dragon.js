/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Hard Dragon Game
@author: VoidDevX1
@tags: []
@addedOn: 2024-09-27
*/


/* ----CONTROLS------:
  w a s d: to move the dragon
  i j k l: to move the fireballs
  
  ----ABOUT GAME-----(Please READ):
  This is a RAGE game. If the fireball is in collsion with the boxes they both
  get destroyed. If you reach the end(green box) you progress to the next level.
  Also if you mess up in a level you can't reset, you have to reset the entire game.
  To make this is even harder you can't choose what fireball you are about to control.
  One more there are intentional bugs to make it harder you have to somehow
  solve the bug in a creative way.
  This game requires MULTIPLE playthroughs to beat!
  To make this game a tad bit easier, if you die the level resets not the game.
  But if really can't beat a level just change the level through the code.
  If you somehow beat the game try SPEEDRUNNING it!
  NOTE: THIS GAME IS POSSIBLE TO BEAT just requires alot of thinking and luck :D

  ----Story------:
  Your a telepathic dragon instead of brathing flames out of your mouth
  you can control flames elsewhere.
*/


const player = "p"
const fire = "f"
const box = "b"
const wall = "w"
const end = "e"
const megaEnd = "m"

const OST = tune `
309.2783505154639: F4~309.2783505154639,
309.2783505154639: G4~309.2783505154639,
309.2783505154639: A4~309.2783505154639,
309.2783505154639: A4~309.2783505154639,
309.2783505154639: B4~309.2783505154639 + G4^309.2783505154639,
309.2783505154639: G4~309.2783505154639 + F4^309.2783505154639,
309.2783505154639: E4^309.2783505154639,
309.2783505154639: E4~309.2783505154639 + D4^309.2783505154639,
309.2783505154639: C5~309.2783505154639 + D4^309.2783505154639,
309.2783505154639: E4^309.2783505154639 + D4~309.2783505154639,
309.2783505154639: F4^309.2783505154639 + E4~309.2783505154639,
309.2783505154639: D5~309.2783505154639 + F4~309.2783505154639 + G4^309.2783505154639,
309.2783505154639: F5~309.2783505154639 + A4^309.2783505154639 + G4~309.2783505154639,
309.2783505154639: A4~309.2783505154639 + B4^309.2783505154639,
309.2783505154639: F5~309.2783505154639 + C5^309.2783505154639,
309.2783505154639: D5^309.2783505154639,
309.2783505154639: C5^309.2783505154639,
309.2783505154639: D4~309.2783505154639 + B4^309.2783505154639,
309.2783505154639: D5~309.2783505154639 + A4^309.2783505154639,
309.2783505154639: G4^309.2783505154639,
309.2783505154639: F4^309.2783505154639,
309.2783505154639: F4^309.2783505154639,
309.2783505154639: A4^309.2783505154639,
309.2783505154639: F4~309.2783505154639 + B4^309.2783505154639,
309.2783505154639: C5^309.2783505154639,
309.2783505154639: D5^309.2783505154639,
309.2783505154639,
309.2783505154639: G4~309.2783505154639 + F4^309.2783505154639,
309.2783505154639: A4~309.2783505154639 + G4^309.2783505154639,
309.2783505154639: B4~309.2783505154639 + A4^309.2783505154639,
309.2783505154639: G4~309.2783505154639,
309.2783505154639: G4~309.2783505154639`
const death = tune `
37.5: B5-37.5 + G5-37.5,
37.5: B5-37.5 + G5-37.5,
37.5: A5-37.5 + F5-37.5,
37.5: A5-37.5 + E5-37.5,
37.5: G5-37.5 + E5-37.5 + D5-37.5,
37.5: F5-37.5 + C5-37.5,
37.5: E5-37.5 + C5-37.5,
37.5: D5-37.5 + B4-37.5,
37.5: C5-37.5 + A4-37.5,
37.5: C5-37.5 + A4-37.5,
37.5: B4-37.5 + A4-37.5,
37.5: A4-37.5 + G4-37.5,
37.5: G4-37.5,
37.5: F4-37.5 + G4-37.5 + A4-37.5 + B4-37.5 + C5-37.5,
37.5: E4-37.5 + G4-37.5 + D5-37.5 + E5-37.5 + F4-37.5,
37.5: E4-37.5 + F4-37.5 + E5-37.5 + F5-37.5 + G5-37.5,
37.5: D4-37.5 + F4-37.5 + F5-37.5 + A5-37.5 + G4-37.5,
37.5: A4/37.5 + G4-37.5 + D4-37.5 + E4-37.5 + G5-37.5,
37.5: C4-37.5 + E4-37.5 + A5-37.5 + G5-37.5 + F5-37.5,
37.5: C4-37.5 + E4-37.5 + A5-37.5 + F5-37.5 + E5-37.5,
37.5: E4-37.5 + A5-37.5 + D5-37.5 + C5-37.5 + B4-37.5,
37.5: E4-37.5 + A5-37.5 + B5-37.5 + G4-37.5,
37.5: F4-37.5 + A5-37.5 + B5-37.5 + A4-37.5,
37.5: F4-37.5 + G5-37.5 + A5-37.5 + B4-37.5,
37.5: F4-37.5 + F5-37.5 + E5-37.5 + D5-37.5 + C5-37.5,
37.5: F4-37.5 + E5-37.5,
37.5: F4-37.5 + E5-37.5,
37.5: G4-37.5 + D5-37.5,
37.5: G4-37.5 + B4-37.5 + C5-37.5,
37.5: G4-37.5 + A4-37.5,
37.5: G4-37.5 + A4-37.5,
37.5`
const win = tune `
151.5151515151515: B5~151.5151515151515 + A5^151.5151515151515,
151.5151515151515: B5~151.5151515151515 + A5^151.5151515151515,
151.5151515151515: B5~151.5151515151515 + A5^151.5151515151515,
151.5151515151515: F5^151.5151515151515 + G5~151.5151515151515,
151.5151515151515: F5^151.5151515151515 + G5~151.5151515151515,
151.5151515151515: F5^151.5151515151515 + G5~151.5151515151515,
151.5151515151515: E5^151.5151515151515 + F5~151.5151515151515,
151.5151515151515: E5^151.5151515151515 + F5~151.5151515151515,
151.5151515151515: E5^151.5151515151515 + F5~151.5151515151515,
151.5151515151515: D5^151.5151515151515 + E5~151.5151515151515,
151.5151515151515: D5^151.5151515151515 + E5~151.5151515151515,
151.5151515151515: D5^151.5151515151515 + E5~151.5151515151515,
151.5151515151515: E5^151.5151515151515 + F5~151.5151515151515,
151.5151515151515: E5^151.5151515151515 + F5~151.5151515151515,
151.5151515151515: E5^151.5151515151515 + F5~151.5151515151515,
151.5151515151515: F5^151.5151515151515 + G5~151.5151515151515,
151.5151515151515: F5^151.5151515151515 + G5~151.5151515151515,
151.5151515151515: F5^151.5151515151515 + G5~151.5151515151515,
151.5151515151515: E5^151.5151515151515 + F5~151.5151515151515,
151.5151515151515: E5^151.5151515151515 + F5~151.5151515151515,
151.5151515151515: E5^151.5151515151515 + F5~151.5151515151515,
151.5151515151515: D5^151.5151515151515 + E5~151.5151515151515,
151.5151515151515: D5^151.5151515151515 + E5~151.5151515151515,
151.5151515151515: D5^151.5151515151515 + E5~151.5151515151515,
151.5151515151515: F5^151.5151515151515 + G5~151.5151515151515,
151.5151515151515: F5^151.5151515151515 + G5~151.5151515151515,
151.5151515151515: F5^151.5151515151515 + G5~151.5151515151515,
151.5151515151515: D5^151.5151515151515 + E5~151.5151515151515,
151.5151515151515: D5^151.5151515151515 + E5~151.5151515151515,
151.5151515151515: D5^151.5151515151515 + E5~151.5151515151515,
151.5151515151515: F5^151.5151515151515 + G5~151.5151515151515,
151.5151515151515: F5^151.5151515151515 + G5~151.5151515151515`

setLegend(
  [player, bitmap`
................
................
..........99....
...........99...
...........3333.
..........33033.
.........333333.
........333.....
.......333......
333...333.......
.3333333........
..33333.........
...333..........
................
................
................`],
  [fire, bitmap`
    ................
    ................
    ................
    ................
    ................
    .......999......
    .....9933399....
    ...999333399....
    ..9999936399....
    ..9999333399....
    ...99993339.....
    ....9933399.....
    ......3999......
    ................
    ................
    ................
  `],
  [box, bitmap `
9999999999999999
9CCCCCCCCCCCCCC9
9CCCCCCCCCC99CC9
9CCCCCCCCCCC9CC9
9CCCCC9CCCCC9CC9
9CCCCC99CCCCCC99
99CCCCC99CCCCC99
99CCCCCC9CCCCC99
99CCCCCC99CCCC99
99CCCCCCC99CCC99
9CCCCCCCCCCCCCC9
9CCCCCCCCCCCCCC9
9CC9CCCCCCCCCCC9
9CC99CCCCCCCCCC9
9CCCCCCCCCCCCCC9
9999999999999999`],
  [wall, bitmap `
1111111111111111
11111LLLLLLLLLL1
11111LLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLL1LL1
1LLLLLLLL1LL1LL1
1LLLLLLLLLLL1LL1
1LLLLLLLLLLLLLL1
11LLLL111LLLLLL1
1LLLLLLL111LLLL1
1LLLLLLLLLLLLLL1
1LLLLLLLLLLLLLL1
1LLL1LLLLLLLLLL1
1LLLL111LLLLLLL1
1LLLLLLLLL111111
1111111111111111`],
  [end, bitmap `
DDDDDDDDDDDDDDDD
D44444444444444D
D4444444DDDD444D
D444444DD44D444D
D44DD44D444DD44D
D44D4444D444DD4D
D4D44444D4444D4D
D4D4444D44444D4D
D4DD44DD44444D4D
D44D44DD4444D44D
D44D444DD444D44D
D4DD4444D44DD44D
DDD444DD4DD444DD
DDD4444DDD44DDDD
DDD444444444DDDD
DDDDDDDDDDDDDDDD`],
  [megaEnd, bitmap `
4444444444444444
4444444444444444
4444444444444444
4444444444444444
44DDD4DD44D4DDD4
44D444DD44D4D44D
44DDD4D4D4D4D44D
44D444D4D4D4D44D
44DDD4D44DD4DDD4
4444444444444444
4DDDDDDDDDDDDDDD
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`]
)

setSolids([player, box, wall])

let level = 0
const levels = [
  map`
wwwwwwww
w......w
w.wp...w
wwwww..w
web...fw
wwwwwwww`,
  map `
wwwwwwww
w.fb...w
w.fb...e
w.fb...w
wpfb...w
wwwwwwww`,
  map `
ewf...bf
.wf...b.
.w....w.
.wpw.ww.
.wwwww..
.b.....f`,
  map `
........
f.www.f.
..wfb...
bbwpwbbb
f.www...
f..e.fff`,
  map `
w.b..wpf
ww.w..wb
fw..w.ff
..w..www
bbfffffw
mbffwwww`
]

playTune(OST, Infinity);

setMap(levels[level]);

setPushables({
  [player]: []
})


onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("j", () => {
  getFirst(fire).x -= 1
})

onInput("l", () => {
  getFirst(fire).x += 1
})

onInput("i", () => {
  getFirst(fire).y -= 1
})

onInput("k", () => {
  getFirst(fire).y += 1
})

onInput("l", () => {
  getFirst(fire).x += 1
})

function collisionFor1(sprite1, sprite2) {
  if (tilesWith(sprite1, sprite2).length > 0) {
    const sprite = getFirst(sprite1)
    sprite.remove()

    if (sprite1 == player && sprite2 == end) {
      level++
      setMap(levels[level]);
    }

    if (sprite1 == player && sprite2 == fire) {
      playTune(death);
      setMap(levels[level]);
    }

    if (sprite1 == player && sprite2 == megaEnd) {
      playTune(win, Infinity)
      addText("You Win", {
        x: 4,
        y: 6,
        color: color `4`
      })
    }
  }
}

function collisionFor2(sprite1, sprite2) {
  if (tilesWith(sprite1, sprite2).length > 0) {
    const overlap = tilesWith(sprite1, sprite2).flatMap(tile => tile);
    overlap.forEach(sprite => sprite.remove())
  }
}

afterInput(() => {
  collisionFor2(box, fire);
  collisionFor1(fire, wall);
  collisionFor1(player, fire);
  collisionFor2(end, fire);
  if (level < levels.length - 1) {
    collisionFor1(player, end);
  }
  collisionFor1(player, megaEnd);
})
