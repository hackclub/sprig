/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: toto
@author: marsisus 
@tags: []
@addedOn: 2024-08-18
*/

const player = "p"
const brick = "b"
const platform = "l"
const box = "a"
const cloud_r = "c"
const background = "f"
const cloud_l = "d"
const water = 'w'
const flag = 'e'
const flag_pole = "g"
const background_sand = "s"


let is_jumping = false
let input_allowed = true
let gravity_applying = false

const start = tune`
170.45454545454547: C4^170.45454545454547 + F4^170.45454545454547 + B4^170.45454545454547 + E5^170.45454545454547 + A5^170.45454545454547,
170.45454545454547: E4^170.45454545454547 + A4^170.45454545454547 + D5^170.45454545454547 + G5^170.45454545454547,
170.45454545454547: G4^170.45454545454547 + C5^170.45454545454547 + F5^170.45454545454547 + B5^170.45454545454547 + D4^170.45454545454547,
170.45454545454547: A5^170.45454545454547 + E5^170.45454545454547 + B4^170.45454545454547 + F4^170.45454545454547 + C4^170.45454545454547,
4772.727272727273`
const jump_song = tune`
123.96694214876032: G5~123.96694214876032 + B5~123.96694214876032,
3842.9752066115702`
const end_song = tune`
240: C5^240 + E4^240 + C4~240,
240: C5^240 + E4^240 + C4~240,
240: C5^240 + E4^240 + C4~240,
240: F4^240 + C4~240 + D5^240,
240: C4~240 + G4^240 + E4^240 + C5~240 + E5^240,
240: C4~240 + F4^240 + A4^240 + D5~240 + F5^240,
240: C4~240 + B4^240 + E5~240 + G5^240 + G4^240,
6000`

playTune(start)

setLegend(
  [player, bitmap`
......0000......
.....0FFFF0.....
.....000000.....
......0130......
......0110......
......000.......
.....0880.......
.....080C0......
.....0880C0.....
.....07770C0....
.....0888000....
.....00000......
.....0F0F0......
.....0F0F0......
....0F0.0F0.....
...0F0..0F0.....`],
  [brick, bitmap`
0000000000000000
0CCC0CCC0CCC0CCC
0CCC0CCC0CCC0CCC
0CCC0CCC0CCC0CCC
0000000000000000
CC0CCC0CCC0CCC0C
CC0CCC0CCC0CCC0C
CC0CCC0CCC0CCC0C
0000000000000000
C0CCC0CCC0CCC0CC
C0CCC0CCC0CCC0CC
C0CCC0CCC0CCC0CC
0000000000000000
0CCC0CCC0CCC0CCC
0CCC0CCC0CCC0CCC
0CCC0CCC0CCC0CCC`],
  [platform, bitmap`
0000000000000000
0666666666666660
0666666666666660
.06666666666660.
..000000000000..
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
  [box, bitmap`
0000000000000000
000CCCCCCCCCC000
00CCCCCCCCCCCC00
0CC0000000000CC0
0CC0CCCCCC000CC0
0CC0CCCCC0000CC0
0CC0CCCC000C0CC0
0CC0CCC000CC0CC0
0CC0CC000CCC0CC0
0CC0C000CCCC0CC0
0CC0000CCCCC0CC0
0CC000CCCCCC0CC0
0CC0000000000CC0
00CCCCCCCCCCCC00
000CCCCCCCCCC000
0000000000000000`],
  [cloud_r, bitmap`
................
................
................
................
................
................
..0000..........
.022220.........
.0222220........
022222220.000...
22222222202220..
222222220222220.
2222222222222220
2222222222222220
2222222222222220
0000000000000000`],
  [cloud_l, bitmap`
................
................
................
................
................
................
................
................
..........000...
.........02220.0
........02222202
........02222222
........02222222
........02222222
........02222222
.........0000000`],
  [background, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [water, bitmap`
................
................
................
................
2.2.2.2.2.2.2.2.
5252525252525252
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [flag, bitmap`
................
...........000..
...........000..
...........000..
..........330...
........33330...
......3333CC0...
....3333CCCC0...
..3333CCCCCC0...
..3333CCCCCC0...
....3333CCCC0...
.....33333330...
........33330...
............0...
............0...
............0...`],
  [flag_pole, bitmap`
............0...
............0...
............0...
............0...
............0...
............0...
............0...
............0...
............0...
............0...
............0...
............0...
............0...
............0...
............0...
............0...`],
  [background_sand, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`]
)

setSolids([player, brick, platform, box])

let level = 0
let world = 0
const levels = [
  [
    map`
..........
...dc.....
dc......ll
.......l..
.....l....
....l.....
.p.....a..
bbbbbbbbbb`,
    map`
..........
..a....dc.
llll......
.....l....
..........
..........
p.....a...
bbb.bbb..b`,
    map`
..........
.dc.......
........ll
..........
.....b....
....bb....
p..bbb.l.l
bbbbbb....`,
    map`
..........
.......dc.
.dc.......
..........
.......bll
p.....bb..
l.l..bbbdc
....bbbbww`,
    map`
.dc.......
..........
..........
p.a.......
lll.l.....
..........
..........
wwb.b.b.b.`,
    map`
..........
....dc....
..........
..........
..........
.l.l....e.
p.......g.
b...bbbbbb`
  ],
  [
    map`
.dc.......
......dc..
..........
..........
..........
.........b
p....bbb.b
bbb..bbb.b`,
    map`
....dc....
..........
..........
..........
p.........
b.b.b.b.b.
b.b.b.b.b.
b.b.b.b.b.`,
    map`
..........
..........
..........
........e.
p.......g.
b.....blll
bl...bb...
b...bbb...`
  ]
]

setBackground(background)

setMap(levels[world][level])

function wait(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


async function gravity() {
  if (!is_jumping) {
    gravity_applying = true
    for (let i = 0; i < 5; i++) {
      var tile_under_player = getTile(getFirst(player).x, getFirst(player).y + 1)
      if (tile_under_player.length == 0) {
        await wait(50)
        getFirst(player).y += 1
        if (getFirst(player).y == 7) {
          level = 0
          for (let i = 0; i < width(); i++) {
            clearTile(i, 1)
            clearTile(i, 2)
            clearTile(i, 3)
          }
          clearTile(getFirst(player).x, getFirst(player).y)

          addText("Game Over", {
            x: 6,
            y: 4,
            color: color`3`
          })
          input_allowed = false
          await wait(1500)
          clearText()
          input_allowed = true
          setMap(levels[world][level])
          playTune(start)
        }
      }
    }
  }
  gravity_applying = false
}

async function jump() {
  if (!is_jumping && !gravity_applying) {
    playTune(jump_song)
    is_jumping = true
    getFirst(player).y -= 1
    await wait(50)
    getFirst(player).y -= 1
    await wait(200)
    is_jumping = false
    gravity()
  }
}

async function testWin() {
  var sprites = getTile(getFirst(player).x, getFirst(player).y)
  for (var i = 0; i < sprites.length; i++) {
    if (sprites[i].type == flag_pole || sprites[i].type == flag) {
      playTune(end_song)
      input_allowed = false
      addText("Congratulations", {
        x: 3,
        y: 4,
        color: color`D`
      })

      world += 1
      if (world > 1) {
        addText("THE END", {
          x: 7,
          y: 6,
          color: color`7`
        })
        return;
      }
      await wait(3000)
      clearText()
      level = 0
      input_allowed = true
      setMap(levels[1][level])
      playTune(start)
      if (world == 1) {
        setBackground(background_sand)
      }


    }
  }
}

async function blockfall() {
  var boxes = getAll(box)
  for (let i = 0; i < boxes.length; i++) {
    for (let j = 0; j < 6; j++) {
      var tile_under_box = getTile(boxes[i].x, boxes[i].y + 1)
      if (tile_under_box.length == 0) {
        boxes[i].y += 1
        await wait(50)
      }
    }
  }

}

async function playerfall() {
  gravity()
}


setPushables({
  [player]: [box]
})

onInput("d", () => {
  if (getFirst(player).x == 9) {
    var old_y = getFirst(player).y;
    level++;
    setMap(levels[world][level])
    getFirst(player).x = 0
    getFirst(player).y = old_y
  } else {
    getFirst(player).x += 1

  }

  testWin()



})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("l", () => {
  if (input_allowed) {
    jump()
  }
})



afterInput(() => {

  playerfall()
  blockfall()
})
