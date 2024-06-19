/*
@title: Snake against a friend
@author: Hidden
@tags: []
@addedOn: 2024-06-19
*/

class snake {
  x
  y

  constructor(x, y) {
    this.x = x
    this.y = y
  }

}

const _apple = "a"
const _head_green_up = "b"
const _head_green_right = "c"
const _head_green_down = "d"
const _head_green_left = "e"
const _head_blue_up = "f"
const _head_blue_right = "g"
const _head_blue_down = "h"
const _head_blue_left = "i"
const _body_green = "j"
const _body_blue = "k"
const _background = "l"


const Direction = {
  Up: 'UP',
  Down: 'DOWN',
  Left: 'LEFT',
  Right: 'RIGHT'
}

let direction_green = Direction.Down
let old_direction_green = Direction.Down
let direction_blue = Direction.Up
let old_direction_blue = Direction.Up

let snake_green = []
let snake_blue = []

let game_started = false
let interval

let blue_wins = 0
let green_wins = 0

let blue_did_win = false
let green_did_win = false

let round = 0

setLegend(
  [_apple, bitmap`
.....00...444...
..444000.4444...
44444.000444....
444....00.......
...000.00.000...
..033300003330..
.03333333333330.
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
0333333333333330
.03333333333330.
..033330033330..
...0000..0000...`],
  [_head_green_up, bitmap`
.....444444.....
...4444444444...
..444444444444..
.44444444444444.
.44444444444444.
4444444444444444
44DDDD4444DDDD44
44DDDD4444DDDD44
44DDDD4444DDDD44
44DDDD4444DDDD44
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [_head_green_right, bitmap`
44444444444.....
4444444444444...
444444DDDD4444..
444444DDDD44444.
444444DDDD44444.
444444DDDD444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
444444DDDD444444
444444DDDD44444.
444444DDDD44444.
444444DDDD4444..
4444444444444...
44444444444.....`],
  [_head_green_down, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
44DDDD4444DDDD44
44DDDD4444DDDD44
44DDDD4444DDDD44
44DDDD4444DDDD44
4444444444444444
.44444444444444.
.44444444444444.
..444444444444..
...4444444444...
.....444444.....`],
  [_head_green_left, bitmap`
.....44444444444
...4444444444444
..4444DDDD444444
.44444DDDD444444
.44444DDDD444444
444444DDDD444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
444444DDDD444444
.44444DDDD444444
.44444DDDD444444
..4444DDDD444444
...4444444444444
.....44444444444`],
  [_head_blue_up, bitmap`
.....777777.....
...7777777777...
..777777777777..
.77777777777777.
.77777777777777.
7777777777777777
7755557777555577
7755557777555577
7755557777555577
7755557777555577
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [_head_blue_right, bitmap`
77777777777.....
7777777777777...
77777755557777..
777777555577777.
777777555577777.
7777775555777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777775555777777
777777555577777.
777777555577777.
77777755557777..
7777777777777...
77777777777.....`],
  [_head_blue_down, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7755557777555577
7755557777555577
7755557777555577
7755557777555577
7777777777777777
.77777777777777.
.77777777777777.
..777777777777..
...7777777777...
.....777777.....`],
  [_head_blue_left, bitmap`
.....77777777777
...7777777777777
..77775555777777
.777775555777777
.777775555777777
7777775555777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777775555777777
.777775555777777
.777775555777777
..77775555777777
...7777777777777
.....77777777777`],
  [_body_green, bitmap`
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
  [_body_blue, bitmap`
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
  [_background, bitmap`
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
0000000000000000`]

)

setBackground(_background)

setSolids([_body_green, _body_blue])

let level = 0
const levels = [
  map`
...............
.j.............
.d.............
...............
...............
...............
...............
...............
...............
.............f.
.............k.
...............`
]

clamp = (value, min = 50, max = 400) => Math.max(min, Math.min(max, value))

onInput("w", () => {
  if (direction_green == Direction.Down && getAll(_body_green).length > 0) {
    return
  }
  direction_green = Direction.Up
})
onInput("d", () => {
  if (direction_green == Direction.Left && getAll(_body_green).length > 0) {
    return
  }
  direction_green = Direction.Right
})
onInput("s", () => {
  if (direction_green == Direction.Up && getAll(_body_green).length > 0) {
    return
  }
  direction_green = Direction.Down
})
onInput("a", () => {
  if (direction_green == Direction.Right && getAll(_body_green).length > 0) {
    return
  }
  direction_green = Direction.Left
})

onInput("i", () => {
  if (direction_blue == Direction.Down) {
    return
  }
  direction_blue = Direction.Up
})
onInput("l", () => {
  if (direction_blue == Direction.Left) {
    return
  }
  direction_blue = Direction.Right
})
onInput("k", () => {
  if (direction_blue == Direction.Up) {
    return
  }
  direction_blue = Direction.Down
})
onInput("j", () => {
  if (direction_blue == Direction.Right) {
    return
  }
  direction_blue = Direction.Left
})



afterInput(() => {
  if (!game_started) {
    game_started = true
    interval = setInterval(update, clamp(450 - round * 50))
    direction_blue = old_direction_blue
    direction_green = old_direction_green
    clearText()
    addText("Green:", {
      x: 0,
      y: 0,
      color: color`2`
    })
    addText(green_wins.toString(), {
      x: 6,
      y: 0,
      color: color`2`
    })
    addText("Blue:", {
      x: 10,
      y: 0,
      color: color`2`
    })
    addText(blue_wins.toString(), {
      x: 15,
      y: 0,
      color: color`2`
    })
  }
  // update()
})
reset()



var green_head
var green_body
var last_green
var blue_head
var blue_body
var last_blue
var apple

clamp = (value, min = 50, max = 400) => Math.max(min, Math.min(max, value))

function reset() {
  round += 1
  setMap(levels[level])
  direction_green = Direction.Down
  old_direction_green = Direction.Down
  direction_blue = Direction.Up
  old_direction_blue = Direction.Up

  snake_green = []
  snake_blue = []

  game_started = false
  blue_did_win = false
  green_did_win = false
  addText("Green:", {
    x: 0,
    y: 0,
    color: color`2`
  })
  addText(green_wins.toString(), {
    x: 6,
    y: 0,
    color: color`2`
  })
  addText("Blue:", {
    x: 10,
    y: 0,
    color: color`2`
  })
  addText(blue_wins.toString(), {
    x: 15,
    y: 0,
    color: color`2`
  })
  let green_body_sprite = getFirst(_body_green)
  snake_green.push(new snake(green_body_sprite.x, green_body_sprite.y))

  let blue_body_sprite = getFirst(_body_blue)
  snake_blue.push(new snake(blue_body_sprite.x, blue_body_sprite.y))

  addSprite(Math.floor(Math.random() * width()), Math.floor(Math.random() * height()), _apple)
}

function update() {
  apple = getFirst(_apple)
  green_body = getAll(_body_green)
  blue_body = getAll(_body_blue)
  green_body.forEach(sprite => {
    sprite.remove()
  });
  blue_body.forEach(sprite => {
    sprite.remove()
  });
  switch (old_direction_green) {
    case Direction.Up:
      green_head = getFirst(_head_green_up)
      break
    case Direction.Right:
      green_head = getFirst(_head_green_right)
      break
    case Direction.Down:
      green_head = getFirst(_head_green_down)
      break
    case Direction.Left:
      green_head = getFirst(_head_green_left)
      break
  }
  if (direction_green != old_direction_green) {
    let x = green_head.x
    let y = green_head.y
    green_head.remove()
    switch (direction_green) {
      case Direction.Up:
        addSprite(x, y, _head_green_up)
        green_head = getFirst(_head_green_up)
        break
      case Direction.Right:
        addSprite(x, y, _head_green_right)
        green_head = getFirst(_head_green_right)
        break
      case Direction.Down:
        addSprite(x, y, _head_green_down)
        green_head = getFirst(_head_green_down)
        break
      case Direction.Left:
        addSprite(x, y, _head_green_left)
        green_head = getFirst(_head_green_left)
        break
    }
  }
  snake_green.push(new snake(green_head.x, green_head.y))

  switch (direction_green) {
    case Direction.Up:
      green_head.y -= 1
      break
    case Direction.Right:
      green_head.x += 1
      break
    case Direction.Down:
      green_head.y += 1
      break
    case Direction.Left:
      green_head.x -= 1
      break
  }

  if (green_head.x == apple.x && green_head.y == apple.y) {
    apple.remove()
    addSprite(Math.floor(Math.random() * width()), Math.floor(Math.random() * height()), _apple)
  } else {
    snake_green.shift()
    console.log(snake_green.length)
  }

  snake_green.forEach((snake) => {
    addSprite(snake.x, snake.y, _body_green)
  })

  old_direction_green = direction_green

  switch (old_direction_blue) {
    case Direction.Up:
      blue_head = getFirst(_head_blue_up)
      break
    case Direction.Right:
      blue_head = getFirst(_head_blue_right)
      break
    case Direction.Down:
      blue_head = getFirst(_head_blue_down)
      break
    case Direction.Left:
      blue_head = getFirst(_head_blue_left)
      break
  }
  if (direction_blue != old_direction_blue) {
    let x = blue_head.x
    let y = blue_head.y
    blue_head.remove()
    switch (direction_blue) {
      case Direction.Up:
        addSprite(x, y, _head_blue_up)
        blue_head = getFirst(_head_blue_up)
        break
      case Direction.Right:
        addSprite(x, y, _head_blue_right)
        blue_head = getFirst(_head_blue_right)
        break
      case Direction.Down:
        addSprite(x, y, _head_blue_down)
        blue_head = getFirst(_head_blue_down)
        break
      case Direction.Left:
        addSprite(x, y, _head_blue_left)
        blue_head = getFirst(_head_blue_left)
        break
    }
  }
  snake_blue.push(new snake(blue_head.x, blue_head.y))

  switch (direction_blue) {
    case Direction.Up:
      blue_head.y -= 1
      break
    case Direction.Right:
      blue_head.x += 1
      break
    case Direction.Down:
      blue_head.y += 1
      break
    case Direction.Left:
      blue_head.x -= 1
      break
  }

  if (blue_head.x == apple.x && blue_head.y == apple.y) {
    apple.remove()
    addSprite(Math.floor(Math.random() * width()), Math.floor(Math.random() * height()), _apple)
  } else {
    snake_blue.shift()
  }

  snake_blue.forEach((snake) => {
    addSprite(snake.x, snake.y, _body_blue)
  })

  old_direction_blue = direction_blue
  //win logic
  if (green_head.x == blue_head.x && green_head.y == blue_head.y) {
    console.log("Tie")
    blue_did_win = true
    green_did_win = true
    clearInterval(interval)
  }
  snake_blue.forEach((snake) => {
    if (snake.x == green_head.x && snake.y == green_head.y) {
      console.log("Blue wins")
      blue_did_win = true
      clearInterval(interval)
    }
    if (snake.x == blue_head.x && snake.y == blue_head.y) {
      console.log("Green wins")
      green_did_win = true
      clearInterval(interval)
    }
  })
  snake_green.forEach((snake) => {
    if (snake.x == blue_head.x && snake.y == blue_head.y) {
      console.log("Green wins")
      green_did_win = true
      clearInterval(interval)
    }
    if (snake.x == green_head.x && snake.y == green_head.y) {
      console.log("Blue wins")
      blue_did_win = true
      clearInterval(interval)
    }
  })
  if (blue_did_win && green_did_win) {
    if (snake_green.length > snake_blue.length) {
      green_wins++
      addText("Green wins", {
        x: 5,
        y: 7,
        color: color`2`
      })
      reset()
    } else if (snake_blue.length > snake_green.length) {
      blue_wins++
      addText("Blue wins", {
        x: 5,
        y: 7,
        color: color`2`
      })
      reset()
    } else {
      console.log("Tie")
      addText("Tie", {
        x: 8,
        y: 7,
        color: color`2`
      })
      reset()
    }
  } else if (blue_did_win) {
    blue_wins++
    addText("Blue wins", {
      x: 5,
      y: 7,
      color: color`2`
    })
    reset()
  } else if (green_did_win) {
    green_wins++
    addText("Green wins", {
      x: 5,
      y: 7,
      color: color`2`
    })
    reset()
  }
}