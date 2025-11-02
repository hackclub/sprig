/*
@title: Split Personality
@author: Ashmit Jeevan
@tags: []
@addedOn: 2025-11-02
*/

const light = 'a'
const dark = 'b'
const wall = 'c'
const lever_off = 'd'
const lever_on = 'e'
const button_blue_on = 'f'
const button_blue_off = 'g'
const button_red_on = 'h'
const button_red_off = 'i'
const lever_y_on = 'j'
const lever_y_off = 'k'
const button_green_off = 'l'
const button_green_on = 'm'
const button_yellow_off = 'n'
const button_yellow_on = 'o'
const red_wall = 'p'
const blue_wall = 'q'
const yellow_wall = 'r'
const green_wall = 's'
const player_sel = 't'
const door = 'u'
const light_pass = 'v'
const dark_pass = 'w'
const spike_wall = 'x'
const dark_door = 'y'
const door_uni = 'z'
let half_done = false
let last_light = {x: 0, y: 0}
let last_dark = {x: 0, y: 0}
let player_select = dark
let alive = true

setSolids([ dark, light, red_wall, blue_wall, green_wall, yellow_wall, wall ])

let level = 0
const levels = [
  map`
b.........
ccccccccc.
atc...c.c.
..c.c.c.c.
.cc.c.c.c.
....c.c...
ccccc.ccc.
c...c.....
c.c.c.ccc.
z.c...c...`,
  map`
bt.......i
.ccccccccc
.cssssssss
.csccccccs
.c.pppppcs
.c.ccccpcs
.slsszcpcs
.ccccccpcp
.xxxxxxpc.
........ca`,
  map`
bpaclcncgq
pp.c.c.c.q
i..p.c.c.q
cccc.c.c.q
.....c.c.q
cscccc.c.q
......tc.q
rccccccc.q
.........q
qqqqqqqqqz`,
  map`
i.....atb.
.pppppppp.
.pqqqqqqp.
.pqrrrrqp.
.pqr..rqp.
.pqr.zrqp.
.pqrrrrqp.
.pqqqqqqp.
.pppppppp.
g........n`,
  map`
b........d
.qqqqqqqq.
.q...rrrq.
.q.t.rirq.
.q...rrrq.
.qppp...q.
.qpzp...q.
.qpppa..q.
.qqqqqqqq.
k.........`,
  map`
bs.......k
ssqqqqqqq.
..q.....q.
..q.rrr.q.
d.q.rzr.q.
..q.rrr.q.
..q....lq.
..qqqqqqq.
......t...
........a.`,
  map`
bt........
ccccccccc.
........c.
ccccccccc.
uvvvvvvvv.
ywwwwwwww.
ccccccccc.
........c.
ccccccccc.
a.........`,
  map`
b......vvv
.......vdv
crrrrc.vvv
cr..rc.qqq
crrrrc.qsu
cccccc.qsy
c...nc.qqq
cwwwwc.www
...t...wlw
a......www`,
  map`
bx.......x
.x.xxxxx.x
.x.x...x.x
.x.x.xix.x
.x.x.xxxrr
.xxx.xlxra
t....xpprr
s........s
ccsssssscc
ypr.n..rpu`,
  map`
z...r.p.xx
xxxxx.x.pv
x...x.x.xv
x.x.x.x.xv
xnx.x.x.xv
xxx.x.x.xv
x...x.x.xv
xvvxx.x.xv
xqqxxrxdxv
b.t....ixa`
]

const hidden_buttons = [
  [],
  [],
  [],
  [],
  [{x: 9, y: 9, c: button_blue_off}, {x: 4, y: 0, c: button_yellow_off}],
  [{x: 2, y: 0, c: button_blue_off}, {x: 0, y: 2, c: button_yellow_off}],
  [],
  [{x: 3, y: 3, c: button_blue_off}],
  [],
  [{x: 5, y: 7, c: button_blue_off}]
]

setLegend([ dark, bitmap`
.....000000.....
.....000000.....
.....070070.....
.....000000.....
.....000000.....
.....000000.....
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......
.......00.......` ],
      [ light, bitmap`
.....LLLLLL.....
.....LLLLLL.....
.....L9LL9L.....
.....LLLLLL.....
.....LLLLLL.....
.....LLLLLL.....
.......LL.......
.......LL.......
.......LL.......
.......LL.......
.......LL.......
.......LL.......
.......LL.......
.......LL.......
.......LL.......
.......LL.......`],
      [ wall, bitmap`
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
      [ lever_off, bitmap`
................
................
................
................
................
77..............
777.............
.777............
..777...........
...777..........
....777.........
.....777........
......733.......
..000003300000..
.00000000000000.
0000000000000000`],
      [ lever_on, bitmap`
................
................
................
................
................
..............77
.............777
............777.
...........777..
..........777...
.........777....
........777.....
.......447......
..000004400000..
.00000000000000.
0000000000000000`],
      [ button_blue_off, bitmap`
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
......7777......
....77777777....
...7777777777...
.00000000000000.
.00000000000000.
0000000000000000`],
      [ button_blue_on, bitmap`
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
...7777777777...
.00000000000000.
.00000000000000.
0000000000000000`],
      [ button_red_off, bitmap`
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
.....333333.....
...3333333333...
..333333333333..
.00000000000000.
.00000000000000.
0000000000000000`],
      [ button_red_on, bitmap`
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
..333333333333..
.00000000000000.
.00000000000000.
0000000000000000`],
      [ lever_y_off, bitmap`
................
................
................
................
................
66..............
666.............
.666............
..666...........
...666..........
....666.........
.....666........
......633.......
..000003300000..
.00000000000000.
0000000000000000`],
      [ lever_y_on, bitmap`
................
................
................
................
................
..............66
.............666
............666.
...........666..
..........666...
.........666....
........666.....
.......446......
..000004400000..
.00000000000000.
0000000000000000`],
      [ button_green_off, bitmap`
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
.....444444.....
...4444444444...
..444444444444..
.00000000000000.
.00000000000000.
0000000000000000`],
      [ button_green_on, bitmap`
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
..444444444444..
.00000000000000.
.00000000000000.
0000000000000000`],
      [ button_yellow_off, bitmap`
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
.....666666.....
...6666666666...
..666666666666..
.00000000000000.
.00000000000000.
0000000000000000`],
      [ button_yellow_on, bitmap`
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
..666666666666..
.00000000000000.
.00000000000000.
0000000000000000`],
      [ player_sel, bitmap`
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
............000.
............000.
............000.
................`],
      [ red_wall, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
      [ blue_wall, bitmap`
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
      [ yellow_wall, bitmap`
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
6666666666666666`],
      [ green_wall, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
      [ door, bitmap`
................
...LLLLLLLLLL...
..LL666LL444LL..
.LL66LLLLLL44LL.
.L66LL....LL44L.
.L6LL......LL4L.
.L6L........L4L.
.L6L........L4L.
.L6L........L4L.
.LLL........LLL.
.LLL........LLL.
.L3L........L7L.
.L3L........L7L.
.L3L........L7L.
.L3L........L7L.
.L3L........L7L.`],
      [ light_pass, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LL000000000000LL
LL000000000000LL
LL000000000000LL
LL000000000000LL
LL000000000000LL
LL000000000000LL
LL000000000000LL
LL000000000000LL
LL000000000000LL
LL000000000000LL
LL000000000000LL
LL000000000000LL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
      [ dark_pass, bitmap`
0000000000000000
0000000000000000
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
00LLLLLLLLLLLL00
0000000000000000
0000000000000000`],
      [ spike_wall, bitmap`
.......11.......
......1111......
.....111111.....
...1111111111...
...1000000001...
..110000000011..
.11100000000111.
1111000000001111
1111000000001111
.11100000000111.
..110000000011..
...1000000001...
...1111111111...
.....111111.....
......1111......
.......11.......`],
      [ dark_door, bitmap`
................
...0000000000...
..00FFF00DDD00..
.00FF000000DD00.
.0FF00....00DD0.
.0F00......00D0.
.0F0........0D0.
.0F0........0D0.
.0F0........0D0.
.000........000.
.000........000.
.0C0........050.
.0C0........050.
.0C0........050.
.0C0........050.
.0C0........050.`],
      [ door_uni, bitmap`
................
...0000000000...
..006660044400..
.00660000004400.
.06600....00440.
.0600......0040.
.060........040.
.060........040.
.060........040.
.000........000.
.000........000.
.030........070.
.030........070.
.030........070.
.030........070.
.030........070.`]
)

function delete_wall(type) {
  let walls = getAll(type)
  for (let w of walls) {
    clearTile(w.x, w.y)
  }
}
function toggle_select() {
  if (!half_done) {
    if (player_select == dark) {
      player_select = light
    } else {
      player_select = dark
    }
  }
}
function door_script(x, y, doo) {
  clearTile(x, y)
      toggle_select()
      addSprite(x, y, doo)
      if (getFirst(player_select)) {
        half_done = true
        x = getFirst(player_select).x
        y = getFirst(player_select).y
        addSprite(x, y, player_sel)
      } else {
        if (level < 9) {
          addText("Next level", {x: 5, y: 5, color: color`5`})
          setTimeout(() => {
            level++
            setMap(levels[level])
            clearText()
            half_done = false
            getFirst(player_sel).x = getFirst(player_select).x
            getFirst(player_sel).y = getFirst(player_select).y
          }, 2000)
        } else {
          alive = false
          addText("You win!", {x: 5, y: 5, color: color`5`})
          addText("Press k to go again", {x: 0, y: 6, color: color`5`})
        }
      }
}

setMap(levels[level])
getFirst(player_sel).x = getFirst(player_select).x
getFirst(player_sel).y = getFirst(player_select).y

setPushables({
})

onInput("w", () => {
  if (alive) { 
    getFirst(player_select).y -= 1
  }
})
onInput("s", () => {
  if (alive) {
    getFirst(player_select).y += 1
  }
})
onInput("d", () => {
  if (alive) {
    getFirst(player_select).x += 1
  }
})
onInput("a", () => {
  if (alive) {
    getFirst(player_select).x -= 1
  }
})
onInput("l", () => {
  toggle_select()
})
onInput("j", () => {
  toggle_select()
})
onInput("k", () => {
  if (!alive) {
    clearText()
    level = 0
    alive = true
    setMap(levels[level])
  } else {
    setMap(levels[level])
  }
})

afterInput(() => {
  let x = getFirst(player_select).x
  let y = getFirst(player_select).y
  getFirst(player_sel).x = x
  getFirst(player_sel).y = y
  let tile = getTile(x, y)
  for (let t of tile) {
    let type = t.type
    if (type === button_red_off) {
      clearTile(x, y)
      addSprite(x, y, button_red_on)
      addSprite(x, y, player_select)
      addSprite(x, y, player_sel)
      delete_wall(red_wall)
    } else if (type === button_green_off) {
      clearTile(x, y)
      addSprite(x, y, button_green_on)
      addSprite(x, y, player_select)
      addSprite(x, y, player_sel)
      delete_wall(green_wall)
    } else if (type === button_yellow_off) {
      clearTile(x, y)
      addSprite(x, y, button_yellow_on)
      addSprite(x, y, player_select)
      addSprite(x, y, player_sel)
      delete_wall(yellow_wall)
    } else if (type === button_blue_off) {
      clearTile(x, y)
      addSprite(x, y, button_blue_on)
      addSprite(x, y, player_select)
      addSprite(x, y, player_sel)
      delete_wall(blue_wall)
    } else if (type === door) {
      if (player_select === light) {
        door_script(x, y, door)
      }
    } else if (type === lever_off) {
      for (let hb of hidden_buttons[level]) {
        if (hb.c === button_blue_off) {
          addSprite(hb.x, hb.y, hb.c)
          clearTile(x, y)
          addSprite(x, y, player_select)
          addSprite(x, y, player_sel)
          addSprite(x, y, lever_on)
        }
      }
    } else if (type === lever_y_off) {
      for (let hb of hidden_buttons[level]) {
        if (hb.c === button_yellow_off) {
          addSprite(hb.x, hb.y, hb.c)
          clearTile(x, y)
          addSprite(x, y, player_select)
          addSprite(x, y, player_sel)
          addSprite(x, y, lever_on)
        }
      }
    } else if (type === spike_wall) {
      alive = false
      addText("You died", {x: 5, y: 5, color: color`5`})
      addText("Press k to try again", {x: 0, y: 6, color: color`5`})
    } else if (type === dark_pass) {
      if (player_select === light) {
        getFirst(light).x = last_light.x
        getFirst(light).y = last_light.y
        getFirst(player_sel).x = last_light.x
        getFirst(player_sel).y = last_light.y
      }
    } else if (type === light_pass) {
      if (player_select === dark) {
        getFirst(dark).x = last_dark.x
        getFirst(dark).y = last_dark.y
        getFirst(player_sel).x = last_dark.x
        getFirst(player_sel).y = last_dark.y
      }
    } else if (type === dark_door) {
      if (player_select === dark) {
        door_script(x, y, dark_door)
      }
    } else if (type === door_uni) {
      door_script(x, y, door_uni)
    }
  }
  if (getFirst(dark)) {
    last_dark.x = getFirst(dark).x
    last_dark.y = getFirst(dark).y
  }
  if (getFirst(light)) {
    last_light.x = getFirst(light).x
    last_light.y = getFirst(light).y
  }
})
  
