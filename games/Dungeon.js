/*
@title: Dungeon
@author: Jonas07123
@tags: []
@addedOn: 2024-05-20
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@img: ""
*/

const background = "u"

const player = "p"
const box = "b"
const Goal = "g"

const lock =  "l"
const lock2 = "o"
const lock3 = "n"
const key = "k"
const key2 = "i"
const key3 = "m"


const melody = tune`
37.5: F5^37.5,
1162.5`
const Med = tune`
250: B5~250 + G5^250 + E4/250,
250: A5~250 + F4/250,
250: A5^250 + G4/250,
250: G5^250 + A4/250,
250: A5~250 + B5-250 + G4/250,
250: B5~250 + F4/250,
250: G5-250 + E4/250,
250: G5-250 + D4/250,
250: A5~250 + E4/250,
250: G5~250 + F4/250,
250: A5~250 + G4/250,
250: A5~250 + A4/250,
250: A5~250 + A4/250,
250: G4/250,
250: G5^250 + F4/250,
250: E4/250,
250: G5/250 + D4/250,
250: G5/250 + E4/250,
250: A5/250 + F4/250,
250: G5/250 + F5/250 + G4/250,
250: F5/250 + A4/250,
250: F5/250 + G4/250,
250: F5/250 + E5/250 + F4/250,
250: E5/250 + E4/250,
250: F5/250 + D4/250,
250: E4/250,
250: F4/250,
250: G4/250,
250: A4/250 + F5^250,
250: B4/250 + G5^250,
250: B4/250 + A5^250,
250: A4/250 + G5^250 + F5^250`



setLegend(
  [ player, bitmap`
...66666666666..
...66666666666..
...66666666666..
...66633333666..
...66330303366..
...66330303366..
...66333333366..
....633333336...
....630000036...
.....3000003....
.....3000003....
.....3300033....
....333333333...
.....3.3..33....
.......3..3.....
.......3..3.....` ],
  [ Goal, bitmap`
HHHHHHHHHHHHHHHH
H33336666663333H
H33336666663333H
H33336666663333H
H33336666663333H
H66644444444666H
H66644466644666H
H55546444444555H
H55546444664555H
H55544464444555H
H66644666644666H
H66644444444666H
H33333333333333H
H33333333333333H
H33333333333333H
HHHHHHHHHHHHHHHH`],
  [ box, bitmap`
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
  [ lock, bitmap`
......LLL.......
.....LL.LL......
....LL...L......
....L....LL.....
..LL......LL....
..L........LL...
.LL.........LL..
.L...........LL.
.66666666666666.
.66666666666666.
.66666FFF666666.
.66666FFF666666.
.66666FFF666666.
.66666FFF666666.
.66666666666666.
.66666666666666.`],
  [ key, bitmap`
................
................
................
666666..........
666666..........
666666..........
6....66666666666
6....66666666666
6....6.......6.6
666666.........6
666666..........
666666..........
................
................
................
................`],
  [ key2, bitmap`
................
................
................
................
.3333...........
333333..........
333333..........
33..333333333333
33..333333333333
33..33.......3.3
333333.........3
333333..........
.3333...........
................
................
................`],
  [ lock2, bitmap`
......LLLL......
......L..L......
.....LL..LL.....
....LL....L.....
....L.....LL....
...LL......LL...
..LL........LL..
.LL..........LL.
.00000000000000.
.00000000000000.
.00000333300000.
.00000333300000.
.00000333300000.
.00000333300000.
.00000000000000.
.00000000000000.`],
  [ key3, bitmap`
................
................
................
.5555...........
555555..........
555555..........
5555555555555555
55..555555555555
55..55.......5.5
555555.........5
555555..........
555555..........
.5555...........
................
................
................`],
  [ lock3, bitmap`
......LLLL......
......L..L......
.....LL..LL.....
....LL....LL....
....L......L....
...LL......LL...
..LLL......LLL..
.LL..........LL.
.55555555555555.
.55555555555555.
.55555FFFF55555.
.55555FFFF55555.
.55555FFFF55555.
.55555FFFF55555.
.55555555555555.
.55555555555555.`],
  [ background, bitmap`
0000000000000000
CCCCCCCCCCCCCCCC
0000000000000000
CCCCCCCCCCCCCCCC
0000000000000000
CCCCCCCCCCCCCCCC
0000000000000000
CCCCCCCCCCCCCCCC
0000000000000000
CCCCCCCCCCCCCCCC
0000000000000000
CCCCCCCCCCCCCCCC
0000000000000000
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
0000000000000000`]
)

setSolids([player,box, lock, lock2])

const playback = playTune(Med, Infinity)

let level = 0
const levels = [
  map`
....bbbbbbbbbbbbbb..g
k...b......b.....b.bb
....b......b.....bobi
bbb.b......b.......b.
bbb.b......b.......b.
....b......b.......b.
.b..b......b.......b.
.b..b..............b.
.b..blbbbbbb.b.bbbbb.
.b..b.b......b.......
.b..b.b......b....bb.
.b....b......b.......
pb....b......b.......`,
  map`
pb..............i
.b..blbbbbbbbbbbb
.b..b....b.......
.b..b....b..bbbb.
.b..b....b..b....
.b..bbbbo...b.bbb
....bbbb....b....
bbb.bbbbbbbbbbbb.
k.b....bm........
..b.b.b.bbbbb....
..b.b.b.....nbbb.
..b.b.b..bbb...b.
..b.b.b..bbg...b.
..b.b.bb..bbbbbb.
....b.bb.........`,
  map`
..........................
.bbbbbbbbbbb.....bbbbbbbbl
.b.........bbbbb.b.kb.....
.b.b.b.....b...b.b..b.bbbb
.b.bbbbb...b...b.b..b.b...
.b.b.b.b...b...b.b..b.b.b.
.b.b....b......b....b...b.
.b.b...gbbbbbb.b....bbbbb.
.b.bnbbbb....b.bbbbbb.....
.b.b.bb...bb.b.bm...b.bbbb
.b.b......b....b....b....b
.b..bbbbbbbbbbbbbbb.bbb..b
.bb.................bbbb.b
.bbbbbbbbbbbbbbbbobbbbib.b
.b................bbbb.b.b
.b.bbbbbbbbbbbbbbbb....b.b
pb.......................b`,
  map`
pb...bbbbbbbbbbbbbbbb...................
.b.b.bbm.....bbbbbbbb.bbbbbbbbbbbbbbbbb.
.b.b.bb........b...bb.bbbbbbbgbbbbbbbbb.
.b.b.bb......b.b.b.bb.......b.........b.
.b.b.bb......b...b.bbbbbbbb.bbbbbbbbb.b.
.b.b.bbbbbbbbbbbbblbb.......b.........b.
.b.b................bbbbbb.bb.bbbbbbbbb.
.b.bbbbbbbbbbbbbbbb.b.......b.........b.
.b.b..............b.b.bbbbbbbbbbbbbbb.b.
.b.b..............b.b.......b.........b.
.b.bbbbbbbbbbb....b.bbbbbbb.b.b.......b.
.b...........b....b.b.......b.bbbbbbbbb.
.bbbbbbbbbbb.b....b.b.bbbbbbb.........b.
.b...........b....b.b.......bbbbbbbbb.b.
.b.bbbbbbbbbbb....b.bb....b.b.........b.
.b.bk........b....b.bb....b.b.bbbbbbbbb.
.b.b.........b....b.bbbbbbb.b.........b.
.b.bb........b....b.........bbbbbbbbb.b.
.b..bbbbbbbbob....b.bbbbbbbbb.........b.
.b...........b..............b.bbbbbbbbb.
.b...........b..............b.........b.
.b.bbbbbbbbbbbbbbbb.bb......bbbbbbbbb.b.
.b.bi........b.......b......b.........b.
.b.b.................bbbbb.bb.bbbbbbbbb.
.b.bbbbbbbbbbbbbbbbbbb......b.........b.
.b...........b..............bbbbbbbbb.b.
.bbbbbbbbbbb.b..............b.........b.
.b...........b..............bnbbbbbbbbb.
...bbbbbbbbbbb..............b...........`,
  map`
..............................b
.bbbbbbb.b.bbbbbb....bbbbbbbbbb
.bb......b.b....b...bbbbb...n..
.bb.bbbbbb.b....b...b.......b..
.bb.b....b.b....b..bbbb.b...b..
.bb...bb.b.bb...bb.b....bbbbbb.
.bbbbbbb.b..bbbbbbbb....b...mb.
.b.....b.b....b.........b....b.
pb.....b.b....b.b..bb...b....b.
bb.....b.b....b.bbbibb..b....b.
....b.bb.b....b...b.b.b.o....b.
.b..bbb..b....bbb.b.b.b.bb...b.
.bb...............b.b.bb.b...b.
.b.bbbb...bbbblbbbb.b.bb.b...b.
.b....b...bb....bbb.b....b...b.
.b........bb......b......b...b.
.b.....b..b........bbbbb.b...b.
kb.....b..b..............bbbbbg`,
  map`
bbbbi......
...bbbbbbk.
.b.........
.blbbbbbbbb
.b.b......b
.b.b.bbbbob
.b.b....b.b
.b.bbbb.b.b
pb......bgb`,
  map`
.......
.......
.......
.......
.......
.......
ppppppp`
]

setBackground(background)

const CL = levels[level]

setMap(CL)

setPushables({
  [player]: []
});

onInput("s", () => {
  getFirst(player).y += 1;
  playTune(melody)
})

onInput("d", () => {
  getFirst(player).x += 1
  playTune(melody)
})

onInput("w", () => {
  getFirst(player).y -= 1
  playTune(melody)
})

onInput("a", () => {
  getFirst(player).x -= 1
  playTune(melody)
})




afterInput(() => {

  
  const Target = tilesWith(Goal).length;

  const PlayerTarget = tilesWith(player, Goal).length
  
  if( PlayerTarget === Target) {

    level = level + 1

    const CL = levels[level]

    if( CL!== undefined) {
      setMap(CL)
    }else {
      addText("you win!", { y: 4, color: color`4` });
    }
  }
  if ( tilesWith(player, key).length === 1){
    clearTile(getFirst(lock).x, getFirst(lock).y)
  }

  if ( tilesWith(player, key2).length === 1){
    clearTile(getFirst(lock2).x, getFirst(lock2).y)
  }

  if ( tilesWith(player, key3).length === 1){
    clearTile(getFirst(lock3).x, getFirst(lock3).y)
  }


  
})
