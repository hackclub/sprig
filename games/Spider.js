/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Spider
@author: AlexGaloy
@tags: []
@addedOn: 2024-08-15
*/

const spider = "p"
const web = "w"
const pit = "s"
const back = "b"
const fly = "f"
const mosquito = "m"

setLegend(
  [ spider, bitmap`
................
................
................
.000.......000..
00.00.000000.00.
....0000000.....
....00000000000.
...0003003000000
0000000000000..0
0..0000000000...
....0000000.00..
..000.0000...00.
.00...........0.
.0............0.
................
................` ],
  [ web, bitmap`
2.......2.......
.2......2.....22
..2..2222222.22.
...22...2..222..
...222..2..222..
...2..222222.2..
..22.22.2.22.22.
2222.2.222.2..2.
..22222.22222222
..2..222222...2.
..2.22..2.22.2..
...22...2...2...
.22222222..2.2..
.22....2222...2.
22......2.....2.
........2......2` ],
  [ fly, bitmap`
................
................
................
....222...222...
...22222.22222..
...22222.22222..
...22222222222..
....220000222...
.....0000000....
.....0L00000....
.....0000000....
......00000.....
................
................
................
................` ],
  [ mosquito, bitmap`
................
................
................
................
................
....222.222.....
....2222222.....
.....22222......
......000L......
.....00000000...
.....0000.......
................
................
................
................
................` ],
  [ pit, bitmap`
1111111111111111
11001L001000L001
1000000000000001
1L00000000000001
1L00000000000011
1000000000000011
10000000000000L1
1000000000000001
1L00000000000001
1L000000000000L1
11000000000000L1
1000000000000011
1000000000000001
10LL000000000001
111L00L01L011001
1111111111111111` ],
  [ back, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ]

)

setBackground(back)

setSolids([ spider, pit ])

let level = 0
const levels = [
  map`
.....
.....
..p..
.....`,
  map`
..s...
..s...
.s....
s..p..
......
......`,
  map`
....s..
.....s.
..s...s
.sps..s
.s..s..
..ss...
.......`,
  map`
..ss..
s.ss..
.ss...
....ss
sp.s..
...s.s`,
  map`
.s..
..s.
s...
.ss.
...s
..p.
.s..`,
  map`
....s..
...ss..
..s.ss.
sss..ps
.....ss
s...s..
ss..s..`
]

setMap(levels[level])

setPushables({
  [ spider ]: []
})

const step = tune`
145.63106796116506: F4^145.63106796116506,
4514.563106796117`
const point = tune`
117.1875: B4~117.1875,
117.1875: F5-117.1875,
3515.625`
const buzzM = tune`
500: D5/500,
15500`
const buzzF = tune`
500: E4/500,
15500`
const melody = tune`
816.3265306122449,
204.08163265306123: F5~204.08163265306123,
612.2448979591837,
204.08163265306123: E5~204.08163265306123,
612.2448979591837,
204.08163265306123: F5~204.08163265306123,
204.08163265306123,
204.08163265306123: D4^204.08163265306123,
1020.4081632653061,
204.08163265306123: E5~204.08163265306123,
612.2448979591837,
204.08163265306123: D5~204.08163265306123,
612.2448979591837,
204.08163265306123: E5~204.08163265306123,
408.16326530612247,
204.08163265306123: C4^204.08163265306123`
const playback = playTune(melody, Infinity)

addText("WASD to move and\nIJKL to place webs\n \nwebs catch bugs\n \neat bugs stuck on\nwebs for points\n \n \n \ngo on webs to jump\nover a tile\n \npress w to start", { 
  x: 1,
  y: 1,
  color: color`H`
})
tut = false
onInput("w", () => {
  spiders = getAll(spider).length;
    getFirst(spider).y -= 1
    jumpX = 0
    jumpY = -1 
    if (tut === false) {
      clearText()
      tut = true
    }})
const SpiderX = getFirst(spider).x
const SpiderY = getFirst(spider).y
const pitWeb = tilesWith(web, pit).length;
score = 0
screenHeight = height();
screenWidth = width();
lastX = "" + getFirst(spider).x
lastY = "" + getFirst(spider).y

onInput("a", () => {
  getFirst(spider).x -= 1
  jumpX = -1
  jumpY = 0
})
onInput("s", () => {
  getFirst(spider).y += 1
  jumpX = 0
  jumpY = 1
})
onInput("d", () => {
  getFirst(spider).x += 1
  jumpX = 1
  jumpY = 0
})
onInput("i", () => {
  const spiderSprite = getFirst(spider)
  if (spiderSprite) {
    addSprite(spiderSprite.x, spiderSprite.y - 1, web)
}
const pitWeb = tilesWith(web, pit).length;
  if (pitWeb === 1) {
    clearTile(spiderSprite.x, spiderSprite.y - 1)
    addSprite(spiderSprite.x, spiderSprite.y - 1, pit)
}})
onInput("j", () => {
  const spiderSprite = getFirst(spider)
  if (spiderSprite) {
    addSprite(spiderSprite.x - 1, spiderSprite.y, web)
}
const pitWeb = tilesWith(web, pit).length;
  if (pitWeb === 1) {
    clearTile(spiderSprite.x - 1, spiderSprite.y)
    addSprite(spiderSprite.x - 1, spiderSprite.y, pit)
}})
onInput("k", () => {
  const spiderSprite = getFirst(spider)
  if (spiderSprite) {
    addSprite(spiderSprite.x, spiderSprite.y + 1, web)
}
const pitWeb = tilesWith(web, pit).length;
  if (pitWeb === 1) {
    clearTile(spiderSprite.x, spiderSprite.y + 1)
    addSprite(spiderSprite.x, spiderSprite.y + 1, pit)
}})
onInput("l", () => {
  const spiderSprite = getFirst(spider)
  if (spiderSprite) {
    addSprite(spiderSprite.x + 1, spiderSprite.y, web)
}
const pitWeb = tilesWith(web, pit).length;
  if (pitWeb === 1) {
    clearTile(spiderSprite.x + 1, spiderSprite.y)
    addSprite(spiderSprite.x + 1, spiderSprite.y, pit)
  }})
afterInput(() => {
  goal = ((level)+2)
  if (level === 7) {
    goal = 100
  } else if (level === 8) {
    goal = 1000
  }
  const onWeb = tilesWith(web, spider).length;
  if (onWeb === 1) {
    const mosquitoEat = tilesWith(web, mosquito, spider).length;
    const flyEat = tilesWith(web, fly, spider).length;
    if (mosquitoEat === 0 && flyEat === 0) {
      getFirst(spider).x += 2*jumpX
      getFirst(spider).y += 2*jumpY
      const onWeb = tilesWith(web, spider).length;
      if (onWeb === 1) {
      getFirst(spider).x += jumpX
      getFirst(spider).y += jumpY
      }}}
  webs = getAll(web).length;
  if (webs === 3) {
    firstWebX = getFirst(web).x
    firstWebY = getFirst(web).y
    const onWeb = tilesWith(web, spider).length;
    clearTile(firstWebX, firstWebY)
    if (onWeb === 1) {
      addSprite(firstWebX, firstWebY, spider)
    }}
  spiders = getAll(spider).length;
  if (spiders > 1) {
      clearTile(getFirst(spider).x, getFirst(spider).y)
  }
  const mosquitos = getAll(mosquito).length
  const flies = getAll(fly).length
  const ranNum = Math.floor(Math.random() * 6) + 1;
  if (mosquitos === 0 && flies == 0) {
    const spawnHeight = Math.floor(Math.random() * (screenHeight));
    if (ranNum === 1) {
    addSprite(0, spawnHeight, mosquito)
      playTune(buzzM)
    } else if (ranNum === 2) {
      addSprite(screenWidth-1, spawnHeight, fly)
      playTune(buzzF)
    }}
  mosquitoWeb = tilesWith(web, mosquito).length;
  if (mosquitos > 0) {
    mosquitoPosX = getFirst(mosquito).x
    mosquitoPosY = getFirst(mosquito).y
    mosquitoWeb = tilesWith(mosquito, web).length;
    nowX = "" + getFirst(spider).x
    nowY = "" + getFirst(spider).y
    if (mosquitoWeb === 1) {
      mosquitoEat = tilesWith(web, mosquito, spider).length;
      if (mosquitoEat === 1) {
        mosquitoPosX = getFirst(mosquito).x
        mosquitoPosY = getFirst(mosquito).y
        clearTile(mosquitoPosX, mosquitoPosY)
        addSprite(mosquitoPosX, mosquitoPosY, spider)
        score += 1
        playTune(point)
        const scoreText = "" + score
        const Text = scoreText + "/" + goal
        if (level === 7) {
        const Text = scoreText
        }
        addText(Text, {
          x: 0,
          y: 0,
          color: color`3`
        })}} else if (lastX !== nowX || lastY !== nowY) {
    getFirst(mosquito).x += 1
    playTune(step)
    if (mosquitoPosX === screenWidth-1) {
      getFirst(mosquito).remove()
  }}}
  if (flies > 0) {
    flyPosX = getFirst(fly).x
    flyPosY = getFirst(fly).y
    flyWeb = tilesWith(fly, web).length;
    nowX = "" + getFirst(spider).x
    nowY = "" + getFirst(spider).y
    if (flyWeb === 1) {
      flyEat = tilesWith(web, fly, spider).length;
      if (flyEat === 1) {
        flyPosX = getFirst(fly).x
        flyPosY = getFirst(fly).y
        clearTile(flyPosX, flyPosY)
        addSprite(flyPosX, flyPosY, spider)
        score += 1
        playTune(point)
        const scoreText = "" + score
        const Text = scoreText + "/" + goal
        if (level === 7) {
        const Text = scoreText
        }
        addText(Text, {
          x: 0,
          y: 0,
          color: color`3`
        })}} else if (lastX !== nowX || lastY !== nowY) {
    getFirst(fly).x -= 1
    playTune(step)
    if (flyPosX === 0) {
      getFirst(fly).remove()
  }}}
  if (score === goal) {
    if (level === 5) {
      addText("you win!!!\n \nyou can keep\nplaying and try\nto get to 100\n \nw to hide text", { x: 1, y: 3, color: color`4` });
      score = 0
      tut = false
      level += 2
    } else if (level === 7) {
      addText("wow you actually\n got 100\n \ncongrats!\n \nnext goal is 1000,\n if you're up for\n the challenge\n \nw to hide text", { x: 1, y: 3, color: color`7` });
      score = 0
      tut = false
      level += 1
  }else {
      level += 1
      setMap(levels[level])
      score = 0
      screenHeight = height();
      screenWidth = width();
    }}
  lastX = "" + getFirst(spider).x
  lastY = "" + getFirst(spider).y
})

