/* 
@title: Capture The Base
@author: LeoLevd
@description: A 2-player capture the flag style game for sprig. Controls: Player1: WASD to move, to win move to P2 base. Player2: IJKL to move, reach P1 base to win. Obstacles: pushy bots and smily glue traps.
@tags: [2P, BaseCapture, 2-Player]
@addedOn: 2025-00-00
*/

const player = "1"
const player2 = "2"
const p1base = "f"
const p2base = "w"
const back = "b"
const botF = "F"
const botW = "W"
const glueTrap = "g"



setLegend(
  [ player, bitmap`
................
..33..33..3.....
.333..393.3.....
.393..393.33....
.393.33933333...
3393339999993...
399999999999333.
399902999029993.
999900999009993.
999999999999999.
999999999999999.
999999999999999.
.66999999999996.
.66666666666666.
...6666666666...
................`], [player2, bitmap`
.......55.......
......5775......
.....557755.....
....55777755....
...5577777755...
..557777777755..
..577777777775..
..577027702775..
.55770077007755.
.57777777777775.
5777777777777775
5777777777777775
5777777777777775
5577777777777755
.55555555555555.
...5555555555...`], [p1base, bitmap`
9696969696969696
6969696969696969
9699999999999996
6999999299999969
9699992329999996
6999923329999969
9699232329999996
6999922329999969
9699992329999996
6999992329999969
9699992329999996
6999999299999969
9699999999999996
6999999999999969
9696969696969696
6969696969696969`], [p2base, bitmap`
7777777777777777
7775555555555777
7755555555555577
7575550000555757
7755507777055577
7575070007055757
7755070007055577
7575555070555757
7755550705555577
7575507000555757
7755077777055577
7575500000555757
7755555555555577
7755555555555577
7775555555555777
7777777777777777`], [back, bitmap`
4444444444444444
4442224444444424
4442444444444444
2244444224444444
4444444424444444
4244444444442444
4444444444444444
4444422444244444
4444442444444444
4444444444444444
4244444444442444
4444444424444444
2244424224244444
4442444444444444
4442224444244424
4444424444244444`], [botF, bitmap`
.D..H.H..H.H..D.
DDDH.H.HH.H.HDDD
.D..H.H..H.H..D.
0D000000000000D0
0333333333333330
0332333333332330
0329233333329230
0329223333229230
0329992332999230
0332292332922330
0333323333233330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0000000000000000`], [botW, bitmap`
.3..6.6..6.6..3.
3336.6.66.6.6333
.3..6.6..6.6..3.
0300000000000030
0555555555555550
0552555555552550
0527255555527250
0527225555227250
0527772552777250
0552272552722550
0555525555255550
0555555555555550
0555555555555550
0555555555555550
0555555555555550
0000000000000000`], [glueTrap, bitmap`
...2222222222...
...22222222222..
..2221112222222.
..22211111122222
2222111111111222
2222111111111122
2222111H11H11122
2222111111111122
222111HHHHHH1122
222111HHHHHH1222
2221111HHHH11222
.221111111111222
.222111111122222
.22222222222222.
...22222222222..
...22222222.....`]
)

setSolids([player, player2, botF, botW])

let level = 0
let scoreW = 0
let scoreF = 0
let finished = 0
const levels = [
  map`
............
..........W.
..1........w
f....g...2..
.F..........
............`
]

function touching(sprite1, sprite2) {
  return sprite1.x === sprite2.x && sprite1.y === sprite2.y;
}


setMap(levels[level])
setBackground(back)

setPushables({
  [player]: [player2],
  [player2]: [player],
  [botF]: [player2],
  [botW]: [player]
})

function botMove() {
  if (finished) return;
  if (getFirst(botF).y != getFirst(player2).y) {
    if (getFirst(botF).y > getFirst(player2).y) {
      getFirst(botF).y -= 1
    } else {
      getFirst(botF).y += 1
    }
  }
  if (getFirst(botF).x != getFirst(player2).x) {
    if (getFirst(botF).x > getFirst(player2).x) {
      getFirst(botF).x -= 1
    } else {
      getFirst(botF).x += 1
    }
  }


  if (getFirst(botW).y != getFirst(player).y) {
    if (getFirst(botW).y > getFirst(player).y) {
      getFirst(botW).y -= 1
    } else {
      getFirst(botW).y += 1
    }
  }
  if (getFirst(botW).x != getFirst(player).x) {
    if (getFirst(botW).x > getFirst(player).x) {
      getFirst(botW).x -= 1
    } else {
      getFirst(botW).x += 1
    }
  }
}

function move(p, d) {
  if (touchingGlueTrap(p)) return
  if (finished) return;
  if (p == "1") {
    
    switch (d) {
      case "l":
        getFirst(player).x -= 1
        break;
      case "r":
        getFirst(player).x += 1
        break;
      case "u":
        getFirst(player).y -= 1
        break;
      case "d":
        getFirst(player).y += 1
    }
  } else if (p == "2") {
    switch (d) {
      case "l":
        getFirst(player2).x -= 1
        break;
      case "r":
        getFirst(player2).x += 1
        break;
      case "u":
        getFirst(player2).y -= 1
        break;
      case "d":
        getFirst(player2).y += 1
        break;
    }
  }

}

function createGlueTrap() {
  if (getAll(glueTrap).length >= 1) {
    getAll(glueTrap)[getAll(glueTrap).length-1].remove()
  }
  addSprite(Math.floor(Math.random() * width()), Math.floor(Math.random() * height()), glueTrap)
  setTimeout(function() {
    getAll(glueTrap)[getAll(glueTrap).length-1].remove()
    createGlueTrap()
  }, 5000)
} createGlueTrap()

function drawScore() {
  addText("Water: " + scoreW, {x: 10, y: 0, color: color`5`})
  addText("Fire: " + scoreF, {x: 10, y: 2, color: color`3`})
}

function clear() {
  setMap(levels[level])
  clearText()
  finished = 0
  drawScore()
}
function touchingGlueTrap(playerWhich) {

  if (getAll(glueTrap).length === 0) return false
  if (playerWhich == "1") {
    for (let element of getAll(glueTrap)) {
      if (touching(getFirst(player), element)) return true
    }
  } else {
    for (let element of getAll(glueTrap)) {
      if (touching(getFirst(player2), element)) return true
    }
  }
  return false
}
function check() {
  if (finished) return;
  if (touching(getFirst(player), getFirst(p2base))) {
    scoreF += 1
    addText("Fire won!", {x: 0, y: 2, color: color`3`})
    drawScore()
    setTimeout(clear, 5000)
    finished = 1
    return
  } else if (touching(getFirst(player2), getFirst(p1base))) {
    scoreW += 1
    addText("Water won!", {x: 0, y: 2, color: color`5`})
    drawScore()
    setTimeout(clear, 5000)
    finished = 1
    return
  }
}

onInput("s", () => {
  move("1", "d")
})
onInput("k", () => {
  move("2", "d")
})
onInput("w", () => {
  move("1", "u")
})
onInput("i", () => {
  move("2", "u")
})
onInput("a", () => {
  move("1", "l")
})
onInput("j", () => {
  move("2", "l")
})
onInput("d", () => {
  move("1", "r")
})
onInput("l", () => {
  move("2", "r")
})
afterInput(() => {
    check()
})
setInterval(botMove, 1000)
drawScore()
