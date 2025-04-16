/*
@title: Journey of the Yeti
@description: "Journey of the Yeti" is a puzzle adventure game where you guide a yeti on its quest to reach a portal. Navigate through icy terrains by pushing stones, sliding on ice, and overcoming obstacles to progress through levels.
@author: Andrew Zhu
@tags: []
@addedOn: 2024-09-03
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

const player = "p"
const ice = "i"
const rock = "r"
const goal = "g"
const wall = "w"
const floor = "f"
const block = "b"
const melody = tune`
340.90909090909093,
340.90909090909093: D4/340.90909090909093,
340.90909090909093: B4~340.90909090909093,
340.90909090909093: D5^340.90909090909093,
340.90909090909093: G4^340.90909090909093 + G5-340.90909090909093,
340.90909090909093: D5/340.90909090909093,
340.90909090909093: B4~340.90909090909093 + D5^340.90909090909093 + F4^340.90909090909093,
340.90909090909093: B5/340.90909090909093,
340.90909090909093: C5~340.90909090909093 + B4/340.90909090909093,
340.90909090909093: E5-340.90909090909093 + A5/340.90909090909093,
340.90909090909093: G5/340.90909090909093,
340.90909090909093: F4^340.90909090909093 + C5-340.90909090909093 + F5/340.90909090909093,
340.90909090909093: G4-340.90909090909093,
340.90909090909093: B4~340.90909090909093,
340.90909090909093: G4^340.90909090909093 + G5/340.90909090909093,
340.90909090909093: D5~340.90909090909093,
340.90909090909093: C5-340.90909090909093 + G5/340.90909090909093,
340.90909090909093: D5^340.90909090909093 + E5/340.90909090909093,
340.90909090909093,
340.90909090909093: A5-340.90909090909093 + C5/340.90909090909093,
340.90909090909093: E5~340.90909090909093 + G4^340.90909090909093,
340.90909090909093: A5-340.90909090909093 + G4/340.90909090909093,
340.90909090909093: C5^340.90909090909093,
340.90909090909093: G5^340.90909090909093 + F4/340.90909090909093,
340.90909090909093: D5-340.90909090909093,
340.90909090909093: E5~340.90909090909093 + G4-340.90909090909093,
340.90909090909093: B4~340.90909090909093 + A4/340.90909090909093,
340.90909090909093: F4^340.90909090909093 + G4/340.90909090909093,
340.90909090909093: C5-340.90909090909093,
340.90909090909093: F5~340.90909090909093 + A4^340.90909090909093 + G4/340.90909090909093,
340.90909090909093: C5~340.90909090909093 + B4/340.90909090909093,
340.90909090909093: E5/340.90909090909093`

setLegend(
  [ player, bitmap`
........0.......
......00200.....
....00221220....
....022777120...
.....07070720...
.....07777720...
.....0222220....
......02220.....
...0002222200...
..0721222222100.
...012222222170.
....0022222200..
.....02202220...
.....010.0210...
.....0L0..0L0...
......00..00....` ],
  [rock,bitmap`
................
................
.....LLLL.......
....L1111L1L....
...L1111111LL...
..L11L1111111L..
..L111111111L1L.
..L1111111L111L.
..L111111111L1L.
..L111L11L1111L.
..L11111111111..
..LLL11111111L..
..LLLL11111LLL..
...LLLLLLLLLLL..
....LLLLLLLLLL..
................`],
  [ice, bitmap`
7727772277772777
7277727777777777
2777277777227777
7772777772777772
7727777772777772
7277777277777727
2777777777777277
7777227777227777
7772777777777772
7777777727777727
7777777777777277
7277727777777777
2777277777277777
7772777772777772
7727777777777727
7227777277777277`],
  [goal, bitmap`
0000000000000000
0000000660000000
0000006666000000
0000066776600000
0000667777660000
0000677777760000
000067HHHH760000
0006677777H66000
000677HH77H76000
00067H77H7H76000
00667H77H7H76600
00667H7HH7H76600
00667H7777H76660
066777HHHH777660
0667777777777660
6667777777777666`],
  [wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`], 
  [floor, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLCLLL
LLLLLCCLLLLLLLLL
LLLCCLLLLLLLLLCL
LLLLLLLLLLLLLLLC
LLLLLLLLLCLLLLLC
LLLLLLLLLCLLLLCC
LLLLLLLLCLLLCCCL
LLLCLLLLCLLLLLLL
LLLLLLCLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLCCCCLLLLLLLLL
LLLCLLLLLCLLCLLL
LLLCCLLLLLLLCCLL
LLCLLLLLLCLLLLCL`],
  [block, bitmap`
7727772277772777
7277727777777777
2777200007227772
7777022220007277
7220222222200777
2202212222222077
7702222222221207
7702222222122207
7202222222221207
2702221221222207
7702222222222202
7705522222222077
7200552222255077
2770055555555077
7727000000000027
2777727277772777`]
  
)


let level = 0
const levels = [
 map`
wwwwwwwwwwwwwwww
wiiiiibiiiiiiiww
wiiiiiiiiiiiiiww
wiiiiiiiiiiiiiww
wiiiiiiiiibiiiww
wbiiiiiiiiiiibww
wiiiiiiiiiiiiiww
wiiiiiiiiiiiiifg
wiiiiiiiibiiiifg
wiibiiiiiiiiiiww
wiiiibiiiiiiibww
wiiiiiibiiiiiiww
wiiiiiiiiiiiiiww
wwwwwwwwwwwwwpww
wwwwwwwwwwwwwwww`,map`
wwwwwwwww
wwwwwgffw
wwwfwwffw
wfffwwffw
wrfrfrffw
wfrfrfwww
wffrfrwww
wfffrfffw
wwrfffffw
wpfwwwwww
wwwwwwwww`, map`
wwwgwww
ww...ww
wrr.rrw
w.rrr.w
wr...rw
w.rrr.w
w..p..w
wwwwwww`,map`
wwwww
wiiiw
wiiiw
wiipw
wwwww`, 
]

setMap(levels[level])
setSolids([player,rock,wall])
setPushables({
  [ player ]: [rock]
})
function get(x,y){
  const tile = getTile(x,y)
  let r = false
  for (let s of tile){
    let g = (s.type ===ice)
    r = (r || g)
  }
  return r

  
}
onInput("s", () => {
    getFirst(player).y += 1
  
    while(get(getFirst(player).x, getFirst(player).y) && get(getFirst(player).x, getFirst(player).y+1)){
      getFirst(player).y += 1
  }  
})
onInput("w", () => {
  getFirst(player).y -= 1
  
 while(get(getFirst(player).x, getFirst(player).y) && get(getFirst(player).x, getFirst(player).y-1)){
    getFirst(player).y -= 1
  }  
})
onInput("a", () => {
  getFirst(player).x -= 1
  while(get(getFirst(player).x, getFirst(player).y) && get(getFirst(player).x-1, getFirst(player).y)){
    getFirst(player).x -= 1
  }  
})
onInput("d", () => {
  getFirst(player).x += 1
  while(get(getFirst(player).x, getFirst(player).y) && get(getFirst(player).x+1, getFirst(player).y)){
    getFirst(player).x += 1
  }  
})
onInput("j", () => {
  clearText();
  setMap(levels[level]);
  
});

const playback = playTune(melody, Infinity)
afterInput(() => {
  let r = false
  for (let s of getTile(getFirst(player).x, getFirst(player).y)){
    let g = (s.type ===goal)
    r = (r || g)
  }
  if(r){
    clearText();
    level=level+1
    
    setMap(levels[level]);
  }
})

