/*
@title: Cyan
@author: Boyce Dyson
@tags: ['puzzle']
@addedOn: 2024-12-16
*/

let blocky = 0
let blockx = 0

const background = "b"
const cyanblock = "i"
const button = "B"
const leftside = "l"
const rightside = "r"
const top = "t"
const floor = "f"
const topleftcorner = "T"
const toprightcorner = "R"
const bottomleftcorner = "L"
const bottomrightcorner = "F"
const character = "c"
const onbutton = "o"
const cursor = "C"

setLegend(
  [cursor, bitmap`
3333333333333333
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3333333333333333`],
  [character, bitmap`
5555555555555555
5777777777777775
5777777777777775
5775577777777775
5775577777755775
5777777777755775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5775777777777575
5777577777555575
5777755555777775
5777777777777775
5555555555555555`],
  [leftside, bitmap`
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............`],
  [rightside, bitmap`
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7`],
  [top, bitmap`
7777777777777777
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
  [floor, bitmap`
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
7777777777777777`],
  [topleftcorner, bitmap`
7777777777777777
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............`],
  [toprightcorner, bitmap`
7777777777777777
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7`],
  [bottomleftcorner, bitmap`
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7...............
7777777777777777`],
  [bottomrightcorner, bitmap`
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
...............7
7777777777777777`],
  [background, bitmap`
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
  [cyanblock, bitmap`
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
  [button, bitmap`
5555555555555555
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5000000000000005
5555555555555555`],
  [onbutton, bitmap`
5555555555555555
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5777777777777775
5555555555555555`]
)

setSolids([])

const WinJingle = tune`
252.10084033613447,
252.10084033613447: G4-252.10084033613447,
252.10084033613447: A4-252.10084033613447,
252.10084033613447: B4-252.10084033613447,
252.10084033613447: C5-252.10084033613447,
252.10084033613447,
252.10084033613447: C5-252.10084033613447 + G4-252.10084033613447,
252.10084033613447: C5-252.10084033613447 + G4-252.10084033613447,
6050.420168067227`

let LevelFinished = false

let level = 0
const levels = [
  map`
TtttR
l...r
l...r
LfffF`,
  map`
TtttR
l.B.r
lB.Br
l.B.r
LfffF`,
  map`
TttttttttR
l........r
l........r
l........r
l........r
l........r
l........r
LffffffffF`,
  map`
iiiiiiiiiiiiiii
iiBBBiiBBBBBiii
iBiiBBBBiBBBiii
iBiiiiiiiBBBBii
iBiBBBiiiBBiBii
iBiBiBBBBBBiBii
iBiBiiiiiiBBBii
iBiBiiiiBBBBiii
iBiBBBBBBiiBiii
iBiiBBBBBBBBiii
iBBBBiiiiiiiiii
iiiiiiiiiiiiiii`,
  map`
iiiiiiiiii
iiBBBBBBii
iiBBBBBBii
iiBBBBBBii
iiBBBBBBii
iiBBBBBBii
iiBBBBBBii
iiiiiiiiii`,
  map`
iiiiiiiiii
iiiBiiBiii
iiBBBBBBii
iiBBBBBBii
iiBBBBBBii
iiiBBBBiii
iiiiBBiiii
iiiiiiiiii`,
  map`
iiiiiiiiii
iiiiiiiiii
iiiiiiiiii
iiiiiiiiii
iiiiiiiiii
iiiiiiiiii
iiiiiiiiii
iiiiiiiiii`,
]

setBackground(background)

setMap(levels[level])

function Win(Level, BackgroundSprite) {



  LevelFinished = true

  setBackground(cyanblock)

  while (getFirst(onbutton)) {
    OnButtonToDelete = getFirst(onbutton)
    clearTile(OnButtonToDelete.x, OnButtonToDelete.y)
  }

  addText("Cyan", {
    x: 8,
    y: 8,
    color: color`5`

  })

  playTune(WinJingle)

  setTimeout(() => {
    level++
    setBackground(BackgroundSprite)
    clearText()

    if (level != levels.length) {
      setMap(levels[level])
    }

    if (level == 1) {

      addText(String(Level), {
        x: width() + 12,
        y: height() - 4,
        color: color`5`
      })

    } else {

      addText(String(Level), {
        x: width() + 7,
        y: height() - 7,
        color: color`5`
      })

    }

    if (level == 3) {
      addSprite(1, 1, character)

      addText("i to reset", {
        x: width() - 7,
        y: height() + 3,
        color: color`5`
      })
    }

    if (level == 4) {
      addSprite(2, 1, cursor)

      addText("i to reset", {
        x: width() - 7,
        y: height() + 6,
        color: color`5`
      })
    }
    if (level == 5) {
      addSprite(3, 1, cursor)

      buffer = 0

      addText("i to reset", {
        x: width() - 7,
        y: height() + 6,
        color: color`5`
      })
    }

    if (level == 6) {
      addText("Thanks For Playing", {
      x: 1,
      y: 7,
      color: color`5`
      })
    
      addText("Cyan!", {
      x: 8,
      y: 8,
      color: color`5`

      })
    }
    
    LevelFinished = false


  }, 3000)
}

function Level2(n) {

  if (level == 2 && LevelFinished != true) {
    if (buffer == n) {
      for (let i = 0; i < width(); i++) {
        addSprite(i, n, cyanblock)
      }
      buffer++

      if (buffer == 8) {
        Win(4, background)
      }
    } else if (buffer != n) {
      setMap(levels[2])
      buffer = 0
    }
  }
}

function Level3(key) {
  if (level == 3 && LevelFinished != true) {
    if (key == "w") {
      blocky = getFirst(character).y
      blockx = getFirst(character).x
      block = getTile(blockx, blocky - 1)
      while (block[0].type != "i") {
        getFirst(character).y -= 1
        blocky = getFirst(character).y
        blockx = getFirst(character).x
        block = getTile(blockx, blocky - 1)
        addSprite(blockx, blocky, cyanblock)
      }
    }
    if (key == "s") {
      blocky = getFirst(character).y
      blockx = getFirst(character).x
      block = getTile(blockx, blocky + 1)
      while (block[0].type != "i") {
        getFirst(character).y += 1
        blocky = getFirst(character).y
        blockx = getFirst(character).x
        block = getTile(blockx, blocky + 1)
        addSprite(blockx, blocky, cyanblock)
      }
    }
    if (key == "a") {
      blocky = getFirst(character).y
      blockx = getFirst(character).x
      block = getTile(blockx - 1, blocky)
      while (block[0].type != "i") {
        getFirst(character).x -= 1
        blocky = getFirst(character).y
        blockx = getFirst(character).x
        block = getTile(blockx - 1, blocky)
        addSprite(blockx, blocky, cyanblock)
      }
    }
    if (key == "d") {
      blocky = getFirst(character).y
      blockx = getFirst(character).x
      block = getTile(blockx + 1, blocky)
      while (block[0].type != "i") {
        getFirst(character).x += 1
        blocky = getFirst(character).y
        blockx = getFirst(character).x
        block = getTile(blockx + 1, blocky)
        addSprite(blockx, blocky, cyanblock)
      }
    }
  }
}

function Level4(key) {
  if (level === 4 && LevelFinished != true) {
    const Cursor = getFirst(cursor)
    const x = Cursor.x
    const y = Cursor.y


    const middle = getTile(x, y)[1]
    const right = getTile(x + 1, y)[0]
    const left = getTile(x - 1, y)[0]
    const top = getTile(x, y - 1)[0]
    const bottom = getTile(x, y + 1)[0]

    if (key === "j") {
      if (middle && middle.type === button) {
        middle.type = onbutton
      }
      if (right && right.type === button) {
        right.type = onbutton
      }
      if (left && left.type === button) {
        left.type = onbutton
      }
      if (top && top.type === button) {
        top.type = onbutton
      }
      if (bottom && bottom.type === button) {
        bottom.type = onbutton
      }
      if (middle && middle.type === onbutton) {
        middle.type = button
      }
      if (right && right.type === onbutton) {
        right.type = button
      }
      if (left && left.type === onbutton) {
        left.type = button
      }
      if (top && top.type === onbutton) {
        top.type = button
      }
      if (bottom && bottom.type === onbutton) {
        bottom.type = button
      }
    }

    if (key === "w") {
      if (top && top.type !== cyanblock) {
        Cursor.y -= 1
      }
    } else if (key === "a") {
      if (left && left.type !== cyanblock) {
        Cursor.x -= 1
      }
    } else if (key === "s") {
      if (bottom && bottom.type !== cyanblock) {
        Cursor.y += 1
      }
    } else if (key === "d") {
      if (right && right.type !== cyanblock) {
        Cursor.x += 1
      }
    } else if (key === "i") {
      setMap(levels[4])
      addSprite(x, y, cursor)
    }
  }
}

function Level5(key) {
  if (level === 5 && LevelFinished != true) {
    const Cursor = getFirst(cursor)
    const x = Cursor.x
    const y = Cursor.y


    const middle = getTile(x, y)[1]
    const right = getTile(x + 1, y)[0]
    const left = getTile(x - 1, y)[0]
    const top = getTile(x, y - 1)[0]
    const bottom = getTile(x, y + 1)[0]

    if (key === "j") {
      if (buffer == 0){
        if (right && right.type === button) {
          right.type = onbutton
        }
        if (left && left.type === button) {
          left.type = onbutton
        }
        if (right && right.type === onbutton) {
          right.type = button
        }
        if (left && left.type === onbutton) {
          left.type = button
        }
        buffer = 1
      }

      else if (buffer == 1) {
      
        if (top && top.type === button) {
          top.type = onbutton
        }
        if (bottom && bottom.type === button) {
          bottom.type = onbutton
        }
        if (top && top.type === onbutton) {
          top.type = button
        }
        if (bottom && bottom.type === onbutton) {
          bottom.type = button
        }
        buffer = 0
      }
      if (middle && middle.type === button) {
        middle.type = onbutton
      }
      if (middle && middle.type === onbutton) {
        middle.type = button
      }
    }

    if (key === "w") {
      if (top && top.type !== cyanblock) {
        Cursor.y -= 1
      }
    } else if (key === "a") {
      if (left && left.type !== cyanblock) {
        Cursor.x -= 1
      }
    } else if (key === "s") {
      if (bottom && bottom.type !== cyanblock) {
        Cursor.y += 1
      }
    } else if (key === "d") {
      if (right && right.type !== cyanblock) {
        Cursor.x += 1
      }
    } else if (key === "i") {
      setMap(levels[4])
      addSprite(x, y, cursor)
      buffer = 0 
  
    }
  }
}

buffer = 0

onInput("w", () => {
  Level2(0)
  Level3("w")
  Level4("w")
  Level5("w")
})

onInput("s", () => {
  Level3("s")
  Level2(7)
  Level4("s")
  Level5("s")
})

onInput("a", () => {
  Level2(6)
  Level3("a")
  Level4("a")
  Level5("a")
})

onInput("d", () => {
  Level2(3)
  Level3("d")
  Level4("d")
  Level5("d")
})

onInput("i", () => {
  if (level == 1) {
    clearTile(2, 1)
    addSprite(2, 1, cyanblock)
  }

  if (level == 3) {
    setMap(levels[3])
    addSprite(1, 1, character)
  }

  Level2(4)
  Level4("i")
  Level5("i")
})

onInput("l", () => {
  if (level == 1) {
    clearTile(3, 2)
    addSprite(3, 2, cyanblock)
  }

  Level2(1)
})

onInput("j", () => {
  if (level == 1) {
    clearTile(1, 2)
    addSprite(1, 2, cyanblock)
  }

  Level2(5)
  Level4("j")
  Level5("j")
})

onInput("k", () => {
  if (level == 1) {
    clearTile(2, 3)
    addSprite(2, 3, cyanblock)
  }

  Level2(2)
})



if (level == 0) {
  addText("1", {
    x: 17,
    y: 1,
    color: color`5`
  })
}

afterInput(() => {

  if (level == 3 && LevelFinished == false) {
    if (getAll(cyanblock).length >= 180) {
      Win(5, cyanblock)
    }
  }

  if (level == 0 && LevelFinished == false) {
    Win(2, cyanblock)
  }

  if (level == 1 && LevelFinished == false) {
    if (!getFirst(button)) {
      Win(3, background)
    }
  }
  if (level == 4 && LevelFinished == false) {
    if (getAll(cyanblock).length + getAll(onbutton).length >= 80) {
      getAll(onbutton)
      Win(6, cyanblock)
    }
  }
  if (level == 5 && LevelFinished == false) {
    if (getAll(cyanblock).length + getAll(onbutton).length >= 80) {
      getAll(onbutton)
      Win(7, cyanblock)
  
    }
  }
})
