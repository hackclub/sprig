/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: cappybara maze
@author: hamza :3
@tags: [puzzle, cappybara, animal, cute animal, maze]
@addedOn: 2025-05-27
*/
let collectedCoins = 0;
const player = "p"
const wall = "w"
const pushwall = "m"
const coin = "c"
const bg = "b"
const itwontfuckingworkwithoutgconst = "g"
const fireassbeat = tune`
209.7902097902098: C4~209.7902097902098 + B4^209.7902097902098 + A4^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + G4^209.7902097902098 + F4^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + E4^209.7902097902098 + D4^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + D4^209.7902097902098 + E4^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + D4^209.7902097902098 + E4^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + E4^209.7902097902098 + F4^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + F4^209.7902097902098 + G4^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + A4^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + A4^209.7902097902098,
209.7902097902098: C4~209.7902097902098,
209.7902097902098: C4~209.7902097902098 + A4^209.7902097902098,
209.7902097902098: C4~209.7902097902098,
209.7902097902098: C4~209.7902097902098 + A4^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + A4^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + A4^209.7902097902098,
209.7902097902098: C4~209.7902097902098,
209.7902097902098: C4~209.7902097902098 + A4^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + A4^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + A4^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + A4^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + F4^209.7902097902098,
209.7902097902098: C4~209.7902097902098,
209.7902097902098: C4~209.7902097902098 + E5^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + E5^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + G4^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + G4^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + G5^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + G5^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + F4^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + F4^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + D4^209.7902097902098,
209.7902097902098: C4~209.7902097902098 + C5^209.7902097902098 + B4^209.7902097902098`
const growl = tune`
37.5,
37.5: C4~37.5 + D4~37.5,
37.5: C4~37.5 + D4~37.5,
1087.5`

setLegend(
  [ player, bitmap`
................
................
................
.....00000000000
.....0C0CCCCCC00
.....000C0CCCCC0
.......0CCCCCCC0
..000000CCCCCCC0
...0CCCCCCCC0000
...0CCCCCCCC0...
...0CCCCCCCC0...
...0CCCCCCCC0...
...0CCCCCCCC0...
...0000000000...
...000....000...
...000....000...` ],
  [ wall, bitmap`
LLLLLLLLLDDLLLLL
111L111111DD11L1
111L11D1111111L1
111LD111111111L1
LLLLLLLLLLLLLDLL
111111L11111DD11
111D11DD11111111
1111D1L1D11111D1
LLLLLLLLLLLLLLLL
1LD1111111111111
1DD1111111L11111
1D11111111L11111
LLLLLLLLLLLLLLLL
1L11111111111DL1
1D11111D111111L1
1L111111111111L1`],
  [ pushwall, bitmap `
LLLLLLLLLDDLLLLL
LL1L111L11DD11LL
1L1L11DL111111L1
11LLD11L11111LL1
LLLLLLLLLLLLLLLL
111L1LLLLLLLLD11
111LLLLLLLLLL111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1LDLLLLLLLLLL111
1DDLLLLLLLLLL111
1D1LLLLLLLLLL111
LLLLLLLLLLLLLLLL
1LLL111L11111LL1
1L11111L11111LL1
LL11111L111111LL`],
  [coin, bitmap `
................
.....FFFFFF.....
....F666666F....
...F666FF666F...
..F666F66F666F..
..F666F66F666F..
..F666F66F666F..
..F666F66F666F..
..F666F66F666F..
..F666F66F666F..
..F666F66F666F..
...F666FF666F...
....F666666F....
.....FFFFFF.....
................
................`],
  [ itwontfuckingworkwithoutgconst, bitmap `
................
................
................
................
................
....0...........
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
  [ bg, bitmap `
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
  
)

setSolids([player, wall])
playTune(fireassbeat, Infinity)
setBackground(bg)

let level = 0
const levels = [
  map`
.........
.........
.........
.........
.........
.........
.........`,
  map`
p.cccccc
........`,
  map`
.cc
p..
...
ccc`,
  map`
pwcwcwww
mwmmmmcw
mcmmcwww`,
  map`
p..w..www
..ww...ww
.www.....
.........
...wwwwmm
ww.www..c
cc.w...cc`,
  map`
pwc
.wc
.wc
.wc
.wc
.w.
.m.
wmw
w..
w..`,
  map`
.......cw..
..wwwwwww..
.......cw.g
..wwwwwww..
p......cw..
..wwwwwww..
.......cw..
..wwwwwww..
.......cw..
..wwwwwww..`,
  map`
..w......w.....
.pm......w.....
www......w.....
.cw......w.ww..
.ww......wwww..
.w..........ww.
.............w.
wwwwwwwwwww..w.
.............w.
......ww....ww.
cc.www.....ww..
wwww...w..w...c
.......w.ww....
......ww.w.....
....www..w.....
.wwww....w.....
ww.......w.....
.........ww....
..........w....
..........mw...
......c...mmww.
wwwwmmmmmmmmww.
...wwwwmm......
......ww.......`,
  map`
cmwwwwwwmw
wmmwwcmmmc
wwmmmmwwww
wwwmmmwwww
wcmmwmmwww
mmwwwmmmww
mwwmmmwmww
cmmmwwwmmp`,
  map`
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................
wwwwwwwwwwwwwwwwwwwwwwwww
wwwwmmcwmmcmmmmwwwcmmmmm.
pmmmmwmmmwwwcmmmcmmwmmwww
wwwwwwwwwwwwwwwwwwwwwwwww
.........................
.........................
.........................
.........................
.........................
.........................
.........................
.........................`,

]
setMap(levels[0])

addText("some blocks look\n different than\n others...\n \n \nto begin\npress l", { 
  x: 3,
  y: 3,
  color: color`0`
})

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("w", () => {
  getFirst(player).y += -1
})

onInput("k", () => {
  playTune(growl)
})

onInput("l", () => {
  clearText();  
  
  
  level++;
  
  
  if (levels[level]) {
    
    setMap(levels[level]);
    
    
  } else {
    
    addText("done :3", { x: 2, y: 1, color: color`0` });
  }
});

onInput("a", () => {
  getFirst(player).x += -1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

afterInput(() => {
  const playerSprite = getFirst(player);
  const coinSprite = getTile(playerSprite.x, playerSprite.y).find(sprite => sprite.type === coin);

if (coinSprite && coinSprite.type === coin) {
    coinSprite.remove();
    collectedCoins++;

    if (collectedCoins === 5) {
        level++;

        if (levels[level]) {
            setMap(levels[level]);
            collectedCoins = 0; // Reset collected coins for the next level
        } else {
            addText("You have completed all levels!", { x: 2, y: 3, color: color`0` });
        }
    }
} else {
    // Handle the case where the coin sprite type is not recognized
    console.log("Unknown sprite type encountered");
}})