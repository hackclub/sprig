/*
@title: soap jump
@author: Nathan Yanchus
@description: Traverse your way through various obstacles as a soap with limited jumps!
@tags: ['soap', 'jump', 'maze']
@addedOn: 2025-02-23
*/

const player = "p"
const goal = "g"
const wall = "w"
const falsewall = "f"
const jumpboost = "j"
const danger = "d"
const danger2 = "b"
const danger3 = "e"
const enemy = "c"
const enemydefeated = "o"
const playerhappy = "h"

setLegend(
  [ player, bitmap`
................
................
................
...0000000000...
..008888888800..
.0H800088000880.
.0H802088020880.
.0H802088020880.
.0HH02088020880.
.0HH00088000880.
.0HHH8888888880.
..00HHH8888800..
...0000000000...
................
................
................` ],
  [ goal, bitmap`
00FFFFFFFFFFFF00
0F06F600006F60F0
F06F60....06F60F
F6F60..HH..06F6F
FF60..H88H..06FF
F60..H8HH8H..06F
F0..H8H88H8H..0F
F..H8H8888H8H..F
F..H8H8888H8H..F
F0..H8H88H8H..0F
F60..H8HH8H..06F
FF60..H88H..06FF
F6F60..HH..06F6F
F06F60....06F60F
0F06F600006F60F0
00FFFFFFFFFFFF00`],
  [ wall, bitmap`
3333033333303333
3333033333303333
9999L999999L9933
LLLLLLLLLLLLLL00
99999999L9999933
99999999L9999933
99999999L9999933
LLLLLLLLLLLLLL00
9999L999999L9933
9999L999999L9933
9999L999999L9933
LLLLLLLLLLLLLL00
99999999L9999933
99999999L9999933
99999999L9999933
LLLLLLLLLLLLLL00`],
  [ falsewall, bitmap`
3333L333333L3333
3333L333333L3333
9999199999919933
11111111111111LL
9999999919999933
9999999919999933
9999999919999933
11111111111111LL
9999199999919933
9999199999919933
9999199999919933
11111111111111LL
9999999919999933
9999999919999933
9999999919999933
11111111111111LL`],
  [ jumpboost, bitmap`
................
.......55.......
......5775......
.....577775.....
....57777775....
...5777777775...
...5775775775...
...5755775575...
....5.5775.5....
......5775......
......5775......
......5775......
......5775......
......5775......
.......55.......
................`],
  [ danger, bitmap`
D44444444444444D
44DDDDDDDDDDDD44
4DD4444444444DD4
4D44DDDDDDDD44D4
4D4DD444444DD4D4
4D4D44DDDD44D4D4
4D4D4DD44DD4D4D4
4D4D4D4444D4D4D4
4D4D4D4444D4D4D4
4D4D4DD44DD4D4D4
4D4D44DDDD44D4D4
4D4DD444444DD4D4
4D44DDDDDDDD44D4
4DD4444444444DD4
44DDDDDDDDDDDD44
D44444444444444D`],
  [danger2, bitmap`
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
  [danger3, bitmap`
................
....55555555....
...5572277755...
..577777277775..
.55772222227755.
.57722222222775.
.57722222222725.
.57222222222725.
.52722222222275.
.57722222222775.
.57722222222775.
.55772222227755.
..577777277775..
...5577772755...
....55555555....
................`],
  [enemy, bitmap`
................
................
................
...0000000000...
..008888111100..
.0H800881032120.
.0H802001030120.
.0HH02201303110.
.0HH02201030110.
.0HH00001030110.
.0HHH8811111110.
..00HHLL111100..
...0000000000...
................
................
................` ],
  [enemydefeated, bitmap`
....6...6....6..
..6...6..6.6....
6.............6.
...0000000000...
..008888111100..
.0H888881002120.
.0H888001033120.
.0HH02201300110.
.0HH00001000110.
.0HH88881003110.
.0HHH8811111110.
..00HHLL111100..
...0000000000...
................
................
................` ],
  [playerhappy, bitmap`
................
................
................
...0000000000...
..008888888800..
.0H888888888880.
.0H800088000880.
.0H808088080880.
.0HH88888888880.
.0HH88888888880.
.0HHH8888888880.
..00HHH8888800..
...0000000000...
................
................
................` ],
)

setSolids(
  [player, wall]
         
)

let level = 0
const levels = [
  map`
wwwwww
......
.p..g.
......
wwwwww`,
  map`
....g
.....
p....
.....
wwwww`,
  map`
fwwwwww
..w...w
..w.w.w
p.w.w.w
..w.w.w
....w.g
wwwwwww`,
  map`
..w.........
..w.........
..w.wwwwwww.
..w.w.......
p...w.wwwww.
..w...w.....
..w.w.w.w.w.
..w.www.w.w.
..w.......wg`,
  map`
wwwddd...dwww
...ddd.d.dwww
...ddd.d.dwww
...ddd.d.dwww
.p.....d....g
...dddddddwww
...dddddddwww
...dddddddwww
wwwdddddddwww`,
  map`
.www....wwwwwd
......wwd....d
..wwwww...ww.d
.wd.....wwwddd
.w....www...gd
p...wwww....dd
...wdddw.wdw.d
...w.....w.w.d
.wwd.w...w.w.d
.....ww.ww.w.d
wwwwwwd......d`,
  map`
.....
..g..
.....
.....
.....
.....
..j..
.....
.....
.....
.....
.....
.....
.....
.....
.....
..p..
.....`,
  map`
..wwwwwwwwwwwwwww.w
..w...w...w...w...w
..w.w.w.w.w.w.w.w.w
..w.w.w.w.w.w.w.w.w
..w.w.w.w.w.w...w..
....w...w...w..www.
..www..ww.wwwww....
.pjjjw........w.w..
..wwwww.www.wwwgw..
..w...w...w...wwww.
..w...w...w...w....
..w.w.w.w.w.w.w.www
..w.w...w...w.....w
....w...w...w.....w`,
  map`
.wwwwwwwwd.w.........
.......dww.w.wwwwww..
.wwwwwwwww.w.w.......
.........w.wdwdwwww..
.wwwwwww.w.wwwww.dw..
...wwwww.w.......ww..
.w.....w...wwwwwwww..
.wwwww...www.........
pjjjjww..w.w.wwwww.w.
.wwwwwww...w.wg.ww.w.
.www...www.w.ww.ww.w.
.....w...w.w..w..wdw.
.wwwww.w.w.ww.ww.www.
.......w...dw..w.....
.wwwwwwwwwwww.wwwwwww
.......w............d
.wwwww...wwwwwwwwwwww`,
  map`
dddwww
..dw..
.p.f.g
..dw..
dddwww`,
  map`
wwwwwwwwwwww
w.w...w...ww
w...w...w..w
w..wwwwwww.w
w.www....w.w
w.wjw.ww.w.w
p...w.gw.w.w
wfwwwwww.w.w
w.w...w..w.w
w...w...ww.w
www.wwwwww.w
www........w
wwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwww
d......w.......w...
d..w...w.....w.w...
d..w...w..w.w..w...
d..w......ww..w....
d..w......w..wwwww.
d.wwwww..w.......w.
dpjjjjwww..wwwwwdw.
d.wwwwww..w....wg..
d....dw......w..ww.
d....f..wwwwwwwwww.
d...wd.w...w...w...
d..wdd...w...w....w
ddwddddddwdddwddddw
wwwwwwwwwwwwwwwwwww`,
  map`
..b...bb...b
..b.b.bg.b.b
p.b.b.bbbb.b
..b.b......b
..jjb.bbbbbb
wwwwwwwwwwww
..d...dd...d
..d.d.d..d.d
..d.d.dddd.d
..d.d......d
....d.dddddd`,
  map`
dd.......w.w....wbb
dd.......w.w..w.wbb
dd.......w....w.wbb
dd.......w.wwww..bb
d..d.....w.....b..b
.........w.www.ww..
....d....wpjjwbgf..
...d....dwbw.wwbw..
dd......dwbw.wwfwbb
d.......dwbw.wwfw.b
d.......dwbw.wwfw.b
d.......dwbw.w....b
dddd....dwbw...bbbb`,
  map `
............ee....e
ee.eeedee.e.b.eee.e
.e.e....e.e.e...e..
.e.e....e.e..e...e.
.e.eee..e.ee.e.e.e.
.e...e..e.e..e...e.
.e.e.e..e.e.eee.e..
.e.e.e..e.e..ee...e
.e.e.e.ee.ee....e..
.e.e.e.e...ee.e..e.
.e.e.ede.c.eb.ee.e.
.e.e.ede...eb.e..e.
.e.eeeeeeeee..e.ee.
.e.e...e.e...e...e.
.e.e.e.e...e.e.e.e.
.e...e....ee....e..
.eeeeeeee.eeeee...e
.........pjjjjee..e
wwwwwwwww.wwwwwwwww`,
  map `
.....
.h.o.
.....`,
]

setMap(levels[level])

const sound = tune`
37.5: D5-37.5,
1162.5`

const jumpsound = tune`
129.87012987012986: G5/129.87012987012986,
4025.9740259740256`

const levelclear = tune`
107.14285714285714: C5-107.14285714285714 + C4^107.14285714285714,
107.14285714285714: E5-107.14285714285714 + E4^107.14285714285714,
107.14285714285714: C5-107.14285714285714 + C4^107.14285714285714,
107.14285714285714: D5-107.14285714285714 + D4^107.14285714285714,
107.14285714285714: F5-107.14285714285714 + F4^107.14285714285714,
107.14285714285714: E5-107.14285714285714 + E4^107.14285714285714,
107.14285714285714: C5-107.14285714285714 + C4^107.14285714285714,
2678.5714285714284`

const finlevelclear = tune`
107.14285714285714: C5-107.14285714285714 + C4^107.14285714285714 + B5~107.14285714285714 + B4/107.14285714285714,
107.14285714285714: E5-107.14285714285714 + E4^107.14285714285714,
107.14285714285714: C5-107.14285714285714 + C4^107.14285714285714 + B5~107.14285714285714 + B4/107.14285714285714,
107.14285714285714: D5-107.14285714285714 + D4^107.14285714285714,
107.14285714285714: F5-107.14285714285714 + F4^107.14285714285714,
107.14285714285714: E5-107.14285714285714 + E4^107.14285714285714 + C5~107.14285714285714,
107.14285714285714: C5-107.14285714285714 + C4^107.14285714285714,
2678.5714285714284`

const death = tune`
63.1578947368421,
63.1578947368421: C5-63.1578947368421 + B5~63.1578947368421,
63.1578947368421: B4-63.1578947368421 + A5~63.1578947368421,
63.1578947368421: A4-63.1578947368421 + G5~63.1578947368421,
63.1578947368421: G4-63.1578947368421 + F5~63.1578947368421,
63.1578947368421: F4-63.1578947368421 + E5~63.1578947368421,
63.1578947368421: E4-63.1578947368421 + D5~63.1578947368421,
63.1578947368421: D4-63.1578947368421 + C5~63.1578947368421,
63.1578947368421: C4-63.1578947368421 + B4~63.1578947368421,
1452.6315789473683`

const boost = tune`
50.93378607809847: C4/50.93378607809847 + C5~50.93378607809847,
50.93378607809847: D4/50.93378607809847 + D5~50.93378607809847,
50.93378607809847: E4/50.93378607809847 + E5~50.93378607809847,
50.93378607809847: F4/50.93378607809847 + F5~50.93378607809847,
50.93378607809847: G4/50.93378607809847 + G5~50.93378607809847,
50.93378607809847: A4/50.93378607809847 + A5~50.93378607809847,
50.93378607809847: B4/50.93378607809847 + B5~50.93378607809847,
50.93378607809847: C4~50.93378607809847,
1222.4108658743633`

let jumps = 10


function textit() {
  clearText()
  addText("jumps left:" + (jumps), {
          x:4,
          y:4,
          color: color`5`
  })
}

textit()

setPushables({
  [ player ]: []
})

onInput("d", () => {
  if (level < 15) {
    getFirst(player).x += 1
    playTune(sound)
  }

})

onInput("a", () => {
  if (level < 15) {
      getFirst(player).x -= 1
      playTune(sound)
  }
})

onInput("w", () => {
  if (level < 15) {
    if (jumps >= 1) {
      getFirst(player).y -= 1
      playTune(jumpsound)
      jumps -= 1
    } else {
      setMap(levels[level]) 
      jumps = 10

    }
    textit();
  }

})

onInput("s", () => {
  if (level < 15) {
    if (jumps >= 1) {
      getFirst(player).y += 1
      playTune(jumpsound)
      jumps -= 1
    } else {
      setMap(levels[level]) 
      jumps = 10

    }
    textit();
  }
})

afterInput(() => {
  const goaltouched = tilesWith(goal, player)
  const goaltouched2 = tilesWith(enemy, player)
  const dangertouched = tilesWith(danger, player)
  const danger2touched = tilesWith(danger2, player)
  const danger3touched = tilesWith(danger3, player)
  const jumpboosttouched = tilesWith(jumpboost, player)

  if (goaltouched.length > 0) {
    level += 1 
    setMap(levels[level])
    playTune(levelclear)
    jumps = 10
    textit();

  
  }

  if (goaltouched2.length > 0) {
    level += 1 
    setMap(levels[level])
    playTune(levelclear)
    jumps = 10
    clearText()
    addText("THE END!", {
          x:6,
          y:4,
          color: color`8`
  })

  
  }

  if (dangertouched.length > 0) {
    setMap(levels[level])
    playTune(death)
    jumps = 10
    textit();
  }

  if (danger2touched.length > 0) {
    setMap(levels[level])
    playTune(death)
    jumps = 10
    textit();
  }

  if (danger3touched.length > 0) {
    setMap(levels[level])
    playTune(death)
    jumps = 10
    textit();
  }

  if (jumpboosttouched.length > 0) {
    getFirst(jumpboost).remove();
    jumps += 5
    playTune(boost)
    textit();
  }
  
})