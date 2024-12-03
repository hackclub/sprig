/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Dumb Potato
@author: Brycen Weeks
@tags: []
@addedOn: 2024-00-00
*/

const player = "p"
const brick = "b"
const flag = "f"
const lock = "l"
const key = "k"
const crate = "c"

setLegend(
    [ player, bitmap`
  ................
  ................
  ....FFFFFFF.....
  ...FFFFFFFFF....
  ....FFFFFFFF....
  ....F22FFF20F...
  ....F02FFF22F...
  ....FFFFFFFFFF00
  0000FF0FFFFFFF.0
  0....F0FFFF00F.0
  0....F000000FF..
  .....FFFFFFFF...
  .....FFFFFFFF...
  ......FFFFF.0...
  ......0.....0...
  ...0000.....0000`], [
    brick, bitmap`
  0000000000000000
  0L1LLLLLLLLLLLL0
  0L1LLLLLLLLLLLL0
  0L1LLLLLLLLLLLL0
  0111111111111110
  0LLLLLLLLLLLL1L0
  0LLLLLLLLLLLL1L0
  0LLLLLLLLLLLL1L0
  0111111111111110
  0LLLLLL1LLLLLLL0
  0LLLLLL1LLLLLLL0
  0LLLLLL1LLLLLLL0
  0111111111111110
  0LL1LLLLLLLL1LL0
  0LL1LLLLLLLL1LL0
  0000000000000000` ], [
      flag, bitmap`
  .000000.........
  .0333330000000..
  .033333333333300
  .033333333333330
  .033333333333330
  .033333333333330
  .033333333333330
  .033333333333330
  .000000033333330
  .0......00003330
  .0..........0000
  .0..............
  .0..............
  .0..............
  .0..............
  .0..............`],
    [lock, bitmap`
  ................
  ................
  ....FFFFFFFF....
  ...FFF0000FFF...
  ..FFF000000FFF..
  ..FFF000000FFF..
  ..FFFF0000FFFF..
  ..FFFFF00FFFFF..
  ..FFFF0000FFFF..
  ..FFFF0000FFFF..
  ..FFFF0000FFFF..
  ...FFFFFFFFFF...
  ....FFFFFFFF....
  ................
  ................
  ................`], [
      key, bitmap`
  ................
  ................
  ................
  ................
  ..FFF...........
  .F...FFFFFFFFF..
  .F...F.....F.F..
  .F...F..........
  ..FFF...........
  ................
  ................
  ................
  ................
  ................
  ................
  ................`
  ],[ crate, bitmap`
  CCCCCCCCCCCCCCCC
  CC999999999999CC
  C9C99CCCCCC99C9C
  C99C99CCCC99C99C
  C999C999999C999C
  C9C99C9999C99C9C
  C9CC99C99C99CC9C
  C9CC999CC999CC9C
  C9CC999CC999CC9C
  C9CC99C99C99CC9C
  C9C99C9999C99C9C
  C999C999999C999C
  C99C99CCCC99C99C
  C9C99CCCCCC99C9C
  CC999999999999CC
  CCCCCCCCCCCCCCCC`]
  
)


let level = 9
const levels = [
  map`
bbbbbbbbbb
bf...bk..b
bbblbbb.bb
b........b
b.bbbb.bbb
b....b...b
bbbb.bbb.b
bp.......b
bbbbbbbbbb`,
  map`
bbbbbbbbbbb
b...b...bkb
b.b...b...b
b.bbbbbbb.b
b.bp.b....b
b.bb.b.bbbb
b....b.b.fb
bcbbbb.b.bb
b......l.bb
bbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbbb
b..........bbbbbbbbbb
b.bb.bbb.b.bbbbbbbb.b
b.bb.bbb.b.bbbbb....b
b....lfb.b.......bb.b
b.bbbbbb.bbbbbbbbbb.b
b......b.bp.ccc...c.b
b.bbbb.b.b......c.c.b
b....b.b.b.cccccc.c.b
bbbb.....b........c.b
bbbbbbbb.b.cccccccc.b
bk.......b.c........b
bbbbbbbbbbbbbbbbbbbbb`,
  map`
bbccccccccccccccc
bfl.............c
bbccccccccccccc.c
c.c...........c.c
c.c.ccccccccc.c.c
c.c.c.....k.c.c.c
c.c.c.......c.c.c
c.c.ccccccccc.c.c
c.c...........c.c
c.ccccccccccccc.c
cp..............c
ccccccccccccccccc`,
  map`
bbbbbbbb
b..c.lfb
bc.ccc.b
b...kc.b
bp...c.b
bbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbb
b.................lf
b..................b
bccccccccccccccccccb
b.................kb
bp.................b
bbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbb
bkbkbkbkb..lb
b.b.b.b.b.blb
b.b.b.b.b.blb
b.b.b.b.b.blb
bp........bfb
bbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbb
bp....llllfb
b.bbbbbbbbbb
b........bkb
b.bbbbbb.b.b
b.....kb.b.b
b.bbbb.b.b.b
b.bbkb.b.b.b
bk.........b
bbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bp............bbbbbbbbbbbbbbbbbb
b.b.bbbbbbbbb.l..............k.b
blb.bbbbbbbbbbbbbbbbbbbbbbbbbbbb
bfbkbbbbbbbbbbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbb
b............b
b............b
b............b
b............b
b....ccc.....b
b....cpc.....b
b....ccc.....b
b............b
b............b
b............b
bbbbbbbbbbbbbb`
]

setMap(levels[level])

setPushables({
  [ player ]: [ crate]
})

setSolids([ player, brick, crate, lock ])

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
    setMap(levels[level])
})

afterInput(() => {
  if (tilesWith(player).length === tilesWith(key, player).length) {
    getFirst(key).remove()
    getFirst(lock).remove()
    console.log('key got got')
  }

  if (tilesWith(player).length === tilesWith(flag, player).length) {
    level++;
    setMap(levels[level])
  }

  if (level === 9) {
    addText("YOU WIN!", { 
        x: 10,
        y: 4,
        color: color`H`
      })
  }
})