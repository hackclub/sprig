/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: dungeon adventure
@author: CTEBennett
@tags: []
@addedOn: 2026-00-00
*/

const player = "p"
const wall= "w"
const goal ="g"
const key = "k"
const door = "d"
const invis = "i"
const chest = "c"
let score = 0;
let count;

setLegend(
  [ player, bitmap`
......LLLL...0..
.999..L33L..010.
.969..L33L..010.
.969..LLLL..010.
..C..LLLLLL.000.
..CLLLLLLLLL.C..
..C..LLLLL.LLC..
..C..LLLLL...C..
.....LLLLL......
.....LLLLL......
.....LLLLL......
.....LLLLL......
....LLLLLL......
....L....L......
....L....L......
....L....L......` ],
  [wall, bitmap`
1LL1011111101100
11LL0111L1101LL0
001L0111L1101LL0
1000011L111011LL
1110001111101111
1L11100111001111
1LL110L0000L0000
1L1L110LL0000LL1
11LLL110001LLL11
11L1L11001111111
11LLLL1101111100
111LL11000000001
111110000001LL11
1000000011011L11
01LLL101L1001LL1
1LL11101LL101111`],
  [goal, bitmap`
................
...6666666666...
..665356653566..
.6.6666666666.6.
.6.6666666666.6.
.6.6666666666.6.
..666666666666..
....66666666....
.....666666.....
......6666......
.......66.......
.......66.......
.......66.......
.......66.......
......6666......
.....666666.....`],
  [key, bitmap`
................
................
................
................
................
................
................
..........66666.
..........65.36.
.6666666666...6.
..6.6.....63.56.
..6.6.....66666.
................
................
................
................`],
  [door, bitmap`
................
....000000000...
...00CCCCCCC00..
..00CCCCCCCCC00.
..0CCLLLLLLLCC0.
..0CCLCLCLCLCC0.
..0CCLCLCLCLCC0.
..0CCLCLCLCLCC0.
..0CCLLLLLLLCC0.
..0CCCCCCCCCCC0.
..0CCCCCCCCLLC0.
..0CCCCCCCCLLC0.
..0CCCCCCCCCCC0.
..0CCCCCCCCCCC0.
..0CCCCCCCCCCC0.
..0CCCCCCCCCCC0.`],
  [invis, bitmap`
2222222222222222
2111111111111112
2122222222222212
2122222222222212
2122222222222212
2122222222222212
2122222222222212
2122222222222212
2122222222222212
2122222222222212
2122222222222212
2122222222222212
2122222222222212
2122222222222212
2111111111111112
2222222222222222`],
  [chest, bitmap`
................
................
................
..0000000000000.
..0CCCCCCCCCCC0.
..0CCCCCCC666C0.
..0666666666660.
.66666666666666.
6600000000000066
..0CCCCCCCCCCC06
..0CCCC000CCCC06
..0CCCC0C0CCCC0.
..0CCCC0C0CCCC0.
..0CCCC000CCCC0.
..0CCCCCCCCCCC0.
..0CCCCCCCCCCC0.`]
)
setBackground(invis);
setSolids([player, wall, door])

let level = 0;
const levels = [
  map`
.w.....w...w.
.w.w.w...w.w.
...w.w.www.w.
.www.w.w.....
.wcw.w.w.www.
.w.w.w.w.w.w.
...w.wcw...w.
.www.wwwww.w.
..kw...dgw.ww
wwwwwwwwww.wc
.............
.w.wwwwwww.ww
pw....cw.....`,
  map`
.w....wc.w.wc
...w.www.w.w.
.w.w.....w...
ww.wwwww...ww
...w.....w.w.
.wcw.www.w.w.
.www...w.w...
...www.w.www.
wwdwgw.w.w.w.
...w...w.....
.wwwwwwww.ww.
.w.kw.....w..
p..ww.wwwwwcw`,
  map`
w.....wwwwwww
w.w.w..ww...w
w.w.ww..w.w.w
w.w..ww.w.w.w
w.ww..w.w.w.w
...ww.w.w.w.w
.w..w.w.www.w
.ww.wgw.....w
.wc.wwwwwwwww
.ww.........c
..w..w.wwwwww
wwwwdwww....w
p........ww.k`,
  map`
w..........ww
..wwwwwwww...
.ww......www.
.w...www.....
.w.w.w....cw.
.wcw.w.wwwww.
.w...w.......
.www.wwwwwwww
...w.........
wwdwww.w.ww.w
....kw.w.w..w
.wwwww.w.w.ww
pwg....wcw...`,
  map`
.....d....k.p
.wwwwwwwwwwww
.............
wwwwwwwwwwwwc
.............
.wwwwwwwwwwww
.............
wwwwwwwwwwww.
............c
cwwwwwwwwwwww
.............
wwwwwwwwwwww.
g...........c`,
  map`
w....w
......
......
......
......
wp...w`,
]

setMap(levels[level])

setPushables({
  [ player ]: []
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
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    count = 0;
    setMap(currentLevel);
  }
});

afterInput(() => {
  let keyes = getFirst(key);
  let doors = getFirst(door);
  const num = tilesWith(player, key).length;
  const fixed = tilesWith(key).length;
  if(fixed !== 0){
    if(num === fixed){
    keyes.remove();
    doors.remove();
    }
  }
  if(level == 1){
    if(fixed == 0 && count == 0){
      addSprite(4, 1, door);
      addSprite(0, 0, key);
      count+=1;
    }else if(fixed == 0 && count == 1){
      addSprite(5, 9, door);
      addSprite(5, 12, key);
      count+=1;
    }
  }
  if(level == 2){
    if(fixed == 0 && count == 0){
      addSprite(1, 4, door);
      addSprite(1, 10, key);
      count+=1;
    }else if(fixed == 0 && count == 1){
      addSprite(5, 5, door);
      addSprite(9, 5, key);
      count+=1;
    }
  }
  if(level == 3){
    if(fixed == 0 && count == 0){
      addSprite(5, 2, door);
      addSprite(6, 6, key);
      count+=1;
    }else if(fixed == 0 && count == 1){
      addSprite(5, 12, door);
      addSprite(12, 12, key);
      count+=1;
    }
  }
  if(level == 4){
    if(fixed == 0 && count == 0){
      addSprite(11, 2, door);
      addSprite(1, 2, key);
      count+=1;
    }else if(fixed == 0 && count == 1){
      addSprite(1, 4, door);
      addSprite(11, 4, key);
      count+=1;
    }
  }
})
afterInput(() => {
  const locat = tilesWith(player, goal).length;
  const intial = tilesWith(goal).length;
  if(intial !== 0 || level !== 5){
    if(locat == intial){
        setMap(levels[level+=1]);
        count = 0;
        score += 1000;
    }
  }
  if(level === 5){
    addText("You win", {
      x: 6,
      y: 6,
      color: color`3`
    })
    addText("Score: " + score, {
      x: 6,
      y: 7,
      color: color`3`
    })
  }
})
afterInput(() => {
  let character = getFirst(player);
  let chests = getAll(chest);
  let contact = tilesWith(player, chest);
  if(contact.length === 1){
    for(let i = 0; i < chests.length; i++){
      if(character.x === chests[i].x && character.y === chests[i].y){
        chests[i].remove()
        score += 500;
      }
    }
  }
})
