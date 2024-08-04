/*
@title: BlockPusher
@author: 
@tags: []
@addedOn: 2024-00-00
*/
let sprites = {
  player: {key: "p", sprite: ''},
  background: {key: "x", sprite: bitmap`
  ................
  .0..............
  .............0..
  ................
  ................
  ................
  ....0...........
  ................
  ................
  ........0.......
  ................
  ................
  ...............0
  ..0.......0.....
  ................
  ................`},
  wall: {key: "w", sprite: bitmap`
  0000000000000000
  0CCCCCCCCCCCCCC0
  0CC0CCCCCCCC0CC0
  0C0CCCCCCCCCC0C0
  0CCCCCCCCCCCCCC0
  0CCCCC0CC0CCCCC0
  0CCCC0CCCC0CCCC0
  0CCCCCCCCCCCCCC0
  0CCCCCCCCCCCCCC0
  0CCCC0CCCC0CCCC0
  0CCCCC0CC0CCCCC0
  0CCCCCCCCCCCCCC0
  0C0CCCCCCCCCC0C0
  0CC0CCCCCCCC0CC0
  0CCCCCCCCCCCCCC0
  0000000000000000`},
  block: {key: "b", sprite: bitmap`
  ................
  ................
  ................
  ................
  ................
  ................
  ......00000.....
  ......06660.....
  ......00400.....
  ......06660.....
  ......00000.....
  ................
  ................
  ................
  ................
  ................`},
  goal: {key: "g", sprite: bitmap`
................
................
..0000000000....
..0.0.0.0.00....
..00.0.0.0.0....
..0.0.0.0.00....
..00.0.0.0.0....
..0000000000....
..0.............
..0.............
..0.............
..0.............
..0.............
..0.............
.33333333333333.
..555555555555..`}
}

const computeLegend = () => Object.entries(sprites)
  .map(sprite => {
    const spriteInfo = sprite[1]
    return [spriteInfo.key, spriteInfo.sprite]
  })

const legendExcludingPlayer = computeLegend()
  .filter(sprite => sprite[1] !== sprites.player.sprite)

const playerBitmaps = {
  Bob: {sprite: bitmap`
..CC..C..CCC....
..CCCCCCCCCCC...
..CC000CC000C...
..CC0...C.C0CC..
....0.0..0.0....
....0......0....
....00055000....
.......55.......
....75555557....
......5555......
......5..5......
......5..5......
......7..7......
................
................
................`, key: "i"},
  Alice: {sprite: bitmap`
..CC..C..CCC....
..CCCCCCCCCCC...
..CC000CC000C...
..CC0...C.C0CC..
.CCC0.0..0.0....
CCCC0......0....
.CCC00044000....
.CCC...44.......
CC..D444444D....
CCC...4444......
CCC...4..4......
.CCC..4..4......
...C..D..D......
................
................
................`, key: "j"}
}

const levels = [
  map`
wwwww
wgwww
w.www
w.www
w...w
wb..w
w...w
w.p.w
w...w
wwwww`,
  map`
wwwwww
w.b.gw
w.wwww
w....w
wwww.w
w....w
w.wwww
wp...w
wwwwww`,
  map`
wwwww
wwwww
wwwww
wwgww
ww.ww
ww.ww
ww.ww
ww.ww
ww.ww
wwbww
ww.ww
ww.ww
ww.ww
w...w
w...w
w...w
w.p.w
wwwww
wwwww
wwwww`,
  map`
wwwwww...w...wwwwwww
w.p.ww.w.w.w.wwwwwww
w...ww.w.w.w..b....g
w.w.ww.w.w.ww.w.w.ww
www....w...wwwwwwwww`,
  map`
wwwwww.p.wwwwww
wwwwwww.wwwwwww
w.w........w..w
w.wwwww.ww.w.ww
w.w...........w
w.w.www.w..ww.w
w.....w.ww.ww..
w.wwwww.ww.www.
w....w...w.....
w..w.w.gww.wwww
w.w..wwwww.wwww
w.w........wwww
w.....ww.b.wwww
www........wwww
wwwwwwwwwwwwwww`,
  map`
w.w.ww.p...ww.w
ww......w...www
.ww............
.wwwww....wwww.
..w..ww..wwwww.
..w...w...ww.w.
..ww.....www...
w.ww.ww..wwwww.
wwwwwww..wwww..
w.......b...www
w.w..ww..ww....
w.ww.w..ww..www
.........w..www
..w........w..w
...wwwwwwww...w
..............w
.......ww..w..w
ww...ww...ww..w
ww.wwwwwwwwwg.w
wwwwwwwwwwwwwww`,
]

let currentLevel = -1
const nextLevel = () => {
  if (levels[currentLevel + 1]) {
    currentLevel += 1
    setMap(levels[currentLevel])
  } else {
    currentLevel = -1
    setMap(map`
wwwww
w...w
wwwww
wwwww
wwwww`)
    addText("You Win!", { x: 6, y: 4, color: color`3` });

    setTimeout(() => gameWelcome(), 5000)
  }
}

const setGameLegend = selectedPlayer => {
  sprites.player.sprite = selectedPlayer.sprite
  setLegend(...computeLegend())
  
  setSolids([sprites.player.key, sprites.wall.key, sprites.block.key])
  setPushables({
    [sprites.player.key]: [sprites.player.key, sprites.block.key]
  })

  nextLevel()
}

const chooseCharacter = () => {
  setLegend(...legendExcludingPlayer)
  
  setMap(map`
wwwwwwwwww
w........w
w........w
w........w
wwwwwwwwww`)
  addText("Choose character", {
    x: 2,
    y: 6,
    color: color`0`,
  })

  let characterChosen = false

  Object.keys(playerBitmaps).forEach((plrName, index) => {
    const x = (index + 1) * 5
    const plr = playerBitmaps[plrName]

    addText(plrName, {
      x,
      y: 8
    })

    addText(`(${plr.key})`, {
      x,
      y: 10,
      color: color`3`
    })

    onInput(plr.key, () => {
      if (characterChosen) {
        return
      }

      characterChosen = true
      clearText()
      setGameLegend(plr)
    })
  })
}

// We have to redraw text every time because only
// clearText() method exists
const welcomeText = () => {
  clearText()
  addText("Welcome to\nBlockPusher", {
    x: 4,
    y: 3,
    color: color`0`,
  })
  addText("(L to reset\n   level)", {
    x: 4,
    y: 6,
    color: color`0`
  })
}

const gameWelcome = () => {
  setLegend(...legendExcludingPlayer)
  setMap(map`
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
w.............w
w.............w
w.............w
w.............w
w.............w
w.............w
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwwwwwwwwwwww
wwwwww..wwwwwww
wwwwww..wwwwwww
wwwwwwwwwwwwwww`)

  welcomeText()

  let timeout = 5
  let i = timeout + 1

  let interval
  interval = setInterval(() => {
    i--
    welcomeText()
    addText(`${i}`, {
      x: 9,
      y: 13,
      color: color`0`
    })

    if (i === 0) {
      clearInterval(interval)
      clearText()
      chooseCharacter()
    }
  }, 1000)
}

const getPlayerSprite = () => getFirst(sprites.player.key)

onInput("w", () => {
  const playerSprite = getPlayerSprite()
  if (playerSprite.y > 0) {
    playerSprite.y -= 1
  }
});
onInput("s", () => {
  const playerSprite = getPlayerSprite()
  if (playerSprite.y < height() - 1) {
    playerSprite.y += 1
  }
});
onInput("a", () => {
  const playerSprite = getPlayerSprite()
  if (playerSprite.x > 0) {
    playerSprite.x -= 1
  }
});
onInput("d", () => {
  const playerSprite = getPlayerSprite()
  if (playerSprite.x < width() - 1) {
    playerSprite.x += 1
  }
});

onInput("l", () => {
  if (currentLevel !== -1) {
    currentLevel -= 1
    nextLevel()
  }
});

afterInput(() => {
  const block = getFirst(sprites.block.key)
  const goal = getFirst(sprites.goal.key)

  if (block.x === goal.x && block.y === goal.y) {
    nextLevel()
  }
});

gameWelcome()