/*
@title: Cookie_Click!
@author: briyandyju09
@tags: []
@addedOn: 2023-01-17

Use W key to earn and J key to purchase a cookie upgrade

First Cookie Upgrade (Diamond) = 10000 Cash
Second Cookie Upgrade (Emerald) = 1000000 Cash
Third and Final Cookie Upgrade (Legend) = 100000000 Cash
-- Plot twist - You keep the money you use to purchase --
Keep Grinding and try to reach Legend Cookie and Ping me in slack if you do!
ID - @Briyan Dyju

*/

const cookie = "c"
const wall = "w"
const click = "k"
const eme = "e"
const legend = "l"
let point = 0
setLegend(
  [ cookie, bitmap`
.....000000.....
...00FFFFFF00...
..0FFFCCCCCCC0..
.0FFCC1CCCCCCC0.
.0F0CCCCCCC1CC0.
0FCCCCCCCCCCCCC0
0CCCC10CCCCCCCC0
0CCCC00CC001CCC0
0CCCCCCCC000CC10
0CCCCCCCC000CCC0
0CCCCCCCCCCCCCC0
0CC1CCC0CCCCCCC0
.0CC0CCCCCC1CC0.
.0CCCCCCC0CCCC0.
..0CCCCCCCCCC0..
...0000000000...` ],
  [ wall, bitmap`
................
....33333333....
...3333333333...
..333333333333..
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
.33333333333333.
..333333333333..
...3333333333...
....33333333....
................` ],
  [ click, bitmap`
.....000000.....
...0055555500...
..055577777770..
.05577177777770.
.05077777771770.
0577777777777770
0777710777777770
0777700770017770
0777777770007710
0777777770007770
0777777777777770
0771777077777770
.07707777771770.
.07777777077770.
..077777777770..
...0000000000...` ],
  [ eme, bitmap`
.....000000.....
...00DDDDDD00...
..0DDD44444440..
.0DD44144444440.
.0D044444441440.
0D44444444444440
0444410444444440
0444400440014440
0444444440004410
0444444440004440
0444444444444440
0441444044444440
.04404444441440.
.04444444044440.
..044444444440..
...0000000000...` ],
  [ legend, bitmap`
.....000000.....
...0066666600...
..066699999990..
.06699199999990.
.06099999991990.
0699999999999990
0999910999999990
0999900990019990
0999999990009910
0999999990009990
0999999999999990
0991999099999990
.09909999991990.
.09999999099990.
..099999999990..
...0000000000...` ],
)

const level = map`
...
.c.
...`
setMap(level)

onInput("w", () => {
  // Move the player one tile to the right
  point = point+1;
  addText("Cash:"+point, { 
  x: 3,
  y: 1,
  color: color`3`
})
})

onInput("j", () => {
  if (point >= 10000) {
    clearTile(1, 1)
    addSprite(1, 1, click)
}
})

onInput("j", () => {
  if (point >= 1000000) {
    clearTile(1, 1)
    addSprite(1, 1, eme)
}
})

onInput("j", () => {
  if (point >= 100000000) {
    clearTile(1, 1)
    addSprite(1, 1, legend)
}
})
