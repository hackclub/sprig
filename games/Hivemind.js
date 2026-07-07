/*
@title: Hivemind
@author: Noah B
@tags: [puzzle]
@addedOn: 2026-07-07

HOW TO PLAY:
Get all the bees on a flower to advance. All bees are controlled simultaneously!

Controls:
W - up
A - left
S - down
D - right
I - go back to menu
J - select
K - skip a level
L - reset level

This game is very easy to edit! You can add/change levels,
customize controls, and even play the included music! 
(I found it to be annoying playing on loop, so you'll have to add 
your own code in order to play it - all the controls were used
so I couldn't add a way to toggle it on/off.)

This game took 2 years to publish, not because it was hard, but because I forgot about it.
*/

const player = "p"
const wall = "w"
const finish = "f"
const bg = "b"
const pinkbg = "k"
const greenbg = "g"
const selection = "s"
const stageone = "q"
const stagetwo = "e"
const stagethree = "r"
const stagefour = "t"
const stagefive = "y"
const stagesix = "u"
const stageseven = "i"
const stageeight = "o"
const stagenine = "9"
const stageten = "0"
const stageeleven = "1"
const stagetwelve = "2"
const stagethirteen = "3"
const stagefourteen = "4"
const stagefifteen = "5"
const stagesixteen = "6"
const stageseventeen = "7"
const stageeighteen = "8"
const left = "L"
const right = "R"
const melody = tune`
214.28571428571428: F5/214.28571428571428 + F4/214.28571428571428,
214.28571428571428,
214.28571428571428: F5/214.28571428571428 + F4/214.28571428571428,
214.28571428571428,
214.28571428571428: F5/214.28571428571428 + F4/214.28571428571428,
214.28571428571428,
214.28571428571428: F5/214.28571428571428 + F4/214.28571428571428,
214.28571428571428,
214.28571428571428: G5/214.28571428571428 + G4/214.28571428571428,
214.28571428571428,
214.28571428571428: A5/214.28571428571428 + A4/214.28571428571428,
214.28571428571428: G5/214.28571428571428 + G4/214.28571428571428,
214.28571428571428,
214.28571428571428: C4-214.28571428571428 + D4~214.28571428571428,
214.28571428571428: D4-214.28571428571428 + C4~214.28571428571428,
214.28571428571428,
214.28571428571428: F5/214.28571428571428 + F4/214.28571428571428,
214.28571428571428,
214.28571428571428: F5/214.28571428571428 + F4/214.28571428571428,
214.28571428571428,
214.28571428571428: F5/214.28571428571428 + F4/214.28571428571428,
214.28571428571428,
214.28571428571428: F5/214.28571428571428 + F4/214.28571428571428,
214.28571428571428,
214.28571428571428: A5/214.28571428571428 + A4/214.28571428571428,
214.28571428571428,
214.28571428571428: F5/214.28571428571428 + F4/214.28571428571428,
214.28571428571428: G5/214.28571428571428 + G4/214.28571428571428,
214.28571428571428,
214.28571428571428: D4-214.28571428571428 + C4~214.28571428571428,
214.28571428571428: C4-214.28571428571428 + D4~214.28571428571428,
214.28571428571428`
const home = "h"


setLegend(
  [player, bitmap`
................
................
................
......00.00.....
.....0220220....
......020220....
.......00000....
......0060660...
.....060606660..
...00060606060..
.....060606660..
.....000606660..
........00000...
................
................
................`],
  [wall, bitmap`
6060909060909060
0666099909990666
0666099909990666
0666099909990666
9060609060906060
9906660666066609
9906660666066609
9906660666066609
9060609060906060
0666099909990666
0666099909990666
0666099909990666
6060909060909060
6609990666099906
6609990666099906
6609990666099906`],
  [finish, bitmap`
................
.......CC.......
...CC.C33C.CC...
..C33CC33CC33C..
..C333C33C333C..
...C33399333C...
..CCC396693CCC..
.C333966669333C.
.C333966669333C.
..CCC396693CCC..
...C33399333C...
..C333C33C333C..
..C33CC33CC33C..
...CC.C33C.CC...
.......CC.......
................`],
  [bg, bitmap`
9666696966666696
6696669666666669
6969666669666666
6696666696966666
6666666669669666
6666666966696966
6666669696969696
6669696669696966
6696969696669666
6669666966966666
6666696669696666
6666969696669669
9669696969696696
6666969666966669
6666696666666666
6666669666666669`],
  [pinkbg, bitmap`
9HHHH9H9HHHHHH9H
HH9HHH9HHHHHHHH9
H9H9HHHHH9HHHHHH
HH9HHHHH9H9HHHHH
HHHHHHHHH9HH9HHH
HHHHHHH9HHH9H9HH
HHHHHH9H9H9H9H9H
HHH9H9HHH9H9H9HH
HH9H9H9H9HHH9HHH
HHH9HHH9HH9HHHHH
HHHHH9HHH9H9HHHH
HHHH9H9H9HHH9HH9
9HH9H9H9H9H9HH9H
HHHH9H9HHH9HHHH9
HHHHH9HHHHHHHHHH
HHHHHH9HHHHHHHH9`],
  [greenbg, bitmap`
F4444F4F444444F4
44F444F44444444F
4F4F44444F444444
44F44444F4F44444
444444444F44F444
4444444F444F4F44
444444F4F4F4F4F4
444F4F444F4F4F44
44F4F4F4F444F444
444F444F44F44444
44444F444F4F4444
4444F4F4F444F44F
F44F4F4F4F4F44F4
4444F4F444F4444F
44444F4444444444
444444F44444444F`],
  [selection, bitmap`
2227772227772227
7..............7
7..............7
7..............2
2..............2
2..............2
2..............7
7..............7
7..............7
7..............2
2..............2
2..............2
2..............7
7..............7
7..............7
7222777222777222`],
  [left, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0666666666666660
0666666666006660
0666666600006660
0666660000006660
0666000000006660
0666000000006660
0666660000006660
0666666600006660
0666666666006660
0666666666666660
.06666666666660.
..066666666660..
...0000000000...`],
  [right, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0666666666666660
0666006666666660
0666000066666660
0666000000666660
0666000000006660
0666000000006660
0666000000666660
0666000066666660
0666006666666660
0666666666666660
.06666666666660.
..066666666660..
...0000000000...`],
  [stageone, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0666666006666660
0666666006666660
0666666006666660
0666666006666660
0666666006666660
0666666006666660
0666666006666660
0666666006666660
0666666006666660
0666666006666660
.06666666666660.
..066666666660..
...0000000000...`],
  [stagetwo, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0666660000666660
0666600000066660
0666600660066660
0666666660066660
0666666600066660
0666666000666660
0666660006666660
0666600066666660
0666600000066660
0666600000066660
.06666666666660.
..066666666660..
...0000000000...`],
  [stagethree, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0666600000066660
0666600000066660
0666666660066660
0666666660066660
0666660000066660
0666660000066660
0666666660066660
0666666660066660
0666600000066660
0666600000066660
.06666666666660.
..066666666660..
...0000000000...`],
  [stagefour, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0666600660066660
0666600660066660
0666600660066660
0666600660066660
0666600000066660
0666600000066660
0666666660066660
0666666660066660
0666666660066660
0666666660066660
.06666666666660.
..066666666660..
...0000000000...`],
  [stagefive, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0666600000066660
0666600000066660
0666600666666660
0666600666666660
0666600000066660
0666600000066660
0666666660066660
0666666660066660
0666600000066660
0666600000066660
.06666666666660.
..066666666660..
...0000000000...`],
  [stagesix, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0666600000066660
0666600000066660
0666600666666660
0666600666666660
0666600000066660
0666600000066660
0666600660066660
0666600660066660
0666600000066660
0666600000066660
.06666666666660.
..066666666660..
...0000000000...`],
  [stageseven, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0666600000066660
0666600000066660
0666666660066660
0666666600066660
0666666600666660
0666666000666660
0666666006666660
0666666006666660
0666666006666660
0666666006666660
.06666666666660.
..066666666660..
...0000000000...`],
  [stageeight, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0666600000066660
0666600000066660
0666600660066660
0666600660066660
0666600000066660
0666600000066660
0666600660066660
0666600660066660
0666600000066660
0666600000066660
.06666666666660.
..066666666660..
...0000000000...`],
  [stagenine, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0666600000066660
0666600000066660
0666600660066660
0666600660066660
0666600000066660
0666600000066660
0666666660066660
0666666660066660
0666600000066660
0666600000066660
.06666666666660.
..066666666660..
...0000000000...`],
  [stageten, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0660066000000660
0660066000000660
0660066006600660
0660066006600660
0660066006600660
0660066006600660
0660066006600660
0660066006600660
0660066000000660
0660066000000660
.06666666666660.
..066666666660..
...0000000000...`],
  [stageeleven, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0666600660066660
0666600660066660
0666600660066660
0666600660066660
0666600660066660
0666600660066660
0666600660066660
0666600660066660
0666600660066660
0666600660066660
.06666666666660.
..066666666660..
...0000000000...`],
  [stagetwelve, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0660066600006660
0660066000000660
0660066006600660
0660066666600660
0660066666000660
0660066660006660
0660066600066660
0660066000666660
0660066000000660
0660066000000660
.06666666666660.
..066666666660..
...0000000000...`],
  [stagethirteen, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0660066000000660
0660066000000660
0660066666600660
0660066666600660
0660066000000660
0660066000000660
0660066666600660
0660066666600660
0660066000000660
0660066000000660
.06666666666660.
..066666666660..
...0000000000...`],
  [stagefourteen, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0660066006600660
0660066006600660
0660066006600660
0660066006600660
0660066000000660
0660066000000660
0660066666600660
0660066666600660
0660066666600660
0660066666600660
.06666666666660.
..066666666660..
...0000000000...`],
  [stagefifteen, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0660066000000660
0660066000000660
0660066006666660
0660066006666660
0660066000000660
0660066000000660
0660066666600660
0660066666600660
0660066000000660
0660066000000660
.06666666666660.
..066666666660..
...0000000000...`],
  [stagesixteen, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0660066000000660
0660066000000660
0660066006666660
0660066006666660
0660066000000660
0660066000000660
0660066006600660
0660066006600660
0660066000000660
0660066000000660
.06666666666660.
..066666666660..
...0000000000...`],
  [stageseventeen, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0660066000000660
0660066000000660
0660066666600660
0660066666000660
0660066666006660
0660066660006660
0660066660066660
0660066660066660
0660066660066660
0660066660066660
.06666666666660.
..066666666660..
...0000000000...`],
  [stageeighteen, bitmap`
...0000000000...
..066666666660..
.06666666666660.
0660066000000660
0660066000000660
0660066006600660
0660066006600660
0660066000000660
0660066000000660
0660066006600660
0660066006600660
0660066000000660
0660066000000660
.06666666666660.
..066666666660..
...0000000000...`],
  [home, bitmap`
...0000000000...
..066666666660..
.06666600666660.
0666660000666660
0666600000066660
0666000000006660
0660000000000660
0600000000000060
0660000000000660
0660000660000660
0660000660000660
0660000660000660
0660000660000660
.06666666666660.
..066666666660..
...0000000000...`]
)

setBackground("b")
let level = 0
const levels = [
  map `
bbbbb
bqerb
btyub
b.sRb`,
  map `
kkkkk
kio9k
k012k
kLsRk`,
  map `
ggggg
g345g
g678g
gLs.g`,
  map`
fwf
.p.
.p.`,
  map `
wwwwwf.
wp..ww.
w.f.w..
w...w.w
wwwww.p`,
  map `
w.fww
ww.pw
w..ww
ww.pw
w.fww`,
  map `
p..f
w.w.
f..p`,
  map `
pfff.
pfffw
pfffp
ppppp`,
  map `
....f
fwww.
.ppp.
.wwwf
.....`,
  map `
f.wp.p
w..w..
pw.w..
f..f..
`,
  map `
pw.w.
.f...
.w.w.
...f.
.w.wp`,
  map `
w....w.p
f.w...fw
..p.w...
w......w
p.w.f...
w....w..`,
  map `
f.f.f.f.
..w.....
....w...
pppp..w.`,
  map `
p..w..p
.w.w.w.
fw.f.wf
.w.w.w.
...w..p`,
  map `
f....
www..
pwp..
...wf`,
  map `
.f.p.
.w.w.
.p.f.`,
  map `
p.wwww
w.w.p.
f.w.w.
w.w..f`,
  map`
w...w...w
..w.w..w.
f...w...f
p.w.wp.w.`,
  map`
pwwf.w.p
.fw.www.
w.w..wf.
..wp.w.w`,
  map`
..w..
p..wp
..wf.
fw...`,
  map`
p.w..w..w.p
.....w....w
.w...w.wwwf
f..w.w.....
wwwwwwwwwww
w....w.wf..
.wwf.w..w..
....ww...w.
p.w..w.w..p`,
  map`
w...w
wwwww
w.s.w
w.h.w`

]

setMap(levels[level])

setSolids([player, wall, selection, bg, pinkbg, greenbg])
setPushables({
  [player]: [],


})


/*First "for" loop for each WASD onInput command changes bee (players) movement. */

onInput("w", () => {
    for (let i = 0; i < tilesWith(player).length; i++) {
      tilesWith(player)[i][0].y -= 1
    }
    if (level <= 2) {
      getFirst(selection).y -= 1;
    }
    if (level === 21) {
      getFirst(selection).y -= 1;
    }
  }

)
onInput("a", () => {
  for (let i = 0; i < tilesWith(player).length; i++) {
    tilesWith(player)[i][0].x -= 1
  }
  if (level <= 2) {
    getFirst(selection).x -= 1;
  }
  if (level === 21) {
    getFirst(selection).x -= 1;
  }
})
onInput("s", () => {
  for (let i = tilesWith(player).length - 1; i >= 0; i--) {
    tilesWith(player)[i][0].y += 1
  }
  if (level <= 2) {
    getFirst(selection).y += 1;
  }
  if (level === 21) {
    getFirst(selection).y += 1;
  }
})
onInput("d", () => {
  for (let i = tilesWith(player).length - 1; i >= 0; i--) {
    tilesWith(player)[i][0].x += 1
  }
  if (level <= 2) {
    getFirst(selection).x += 1;
  }
  if (level === 21) {
    getFirst(selection).x += 1;
  }
})
onInput("j", () => {
  if (tilesWith(selection, right).length === 1) {
    level = level + 1
    setMap(levels[level])
  }

  if (tilesWith(selection, left).length === 1) {
    if (level != 0) {
      level = level - 1
      setMap(levels[level])
    }
  }

  if (tilesWith(selection, stageone).length === 1) {
    level = 3
    setMap(levels[level])
  }

  if (tilesWith(selection, stagetwo).length === 1) {
    level = 4
    setMap(levels[level])
  }

  if (tilesWith(selection, stagethree).length === 1) {
    level = 5
    setMap(levels[level])
  }

  if (tilesWith(selection, stagefour).length === 1) {
    level = 6
    setMap(levels[level])
  }

  if (tilesWith(selection, stagefive).length === 1) {
    level = 7
    setMap(levels[level])
  }

  if (tilesWith(selection, stagesix).length === 1) {
    level = 8
    setMap(levels[level])
  }

  if (tilesWith(selection, stageseven).length === 1) {
    level = 9
    setMap(levels[level])
  }

  if (tilesWith(selection, stageeight).length === 1) {
    level = 10
    setMap(levels[level])
  }

  if (tilesWith(selection, stagenine).length === 1) {
    level = 11
    setMap(levels[level])
  }

  if (tilesWith(selection, stageten).length === 1) {
    level = 12
    setMap(levels[level])
  }

  if (tilesWith(selection, stageeleven).length === 1) {
    level = 13
    setMap(levels[level])
  }

  if (tilesWith(selection, stagetwelve).length === 1) {
    level = 14
    setMap(levels[level])
  }

  if (tilesWith(selection, stagethirteen).length === 1) {
    level = 15
    setMap(levels[level])
  }

  if (tilesWith(selection, stagefourteen).length === 1) {
    level = 16
    setMap(levels[level])
  }

  if (tilesWith(selection, stagefifteen).length === 1) {
    level = 17
    setMap(levels[level])
  }

  if (tilesWith(selection, stagesixteen).length === 1) {
    level = 18
    setMap(levels[level])
  }

  if (tilesWith(selection, stageseventeen).length === 1) {
    level = 19
    setMap(levels[level])
  }

  if (tilesWith(selection, stageeighteen).length === 1) {
    level = 20
    setMap(levels[level])
  }
  if (tilesWith(selection, home).length === 1) {
    level = 0
    setMap(levels[level])
  }

})
onInput("l", () => {
  {
    setMap(levels[level])
  }
})
onInput("i", () => {
  { level = 0 } {
    setMap(levels[0])
  }
})
onInput("k", () => {
  {
    setMap(levels[level + 1])
  } { level = level + 1 }
})

afterInput(() => {

  if (tilesWith(player, finish).length === tilesWith(finish).length) {
    if (tilesWith(player).length !== 0) {
      level = level + 1
      setMap(levels[level])
    }
  }

  if (level == 21) {
    addText("you win!", { y: 2, x: 6, color: color`2` });
  }

  if (level != 21) {
    clearText()
  }
  if (level === 1) { setBackground("k") } else if (level === 2) { setBackground("g") } else if (level >= 15) {
    setBackground("g")
  } else if (level >= 9) {
    setBackground("k")
  } else
    setBackground("b")






})