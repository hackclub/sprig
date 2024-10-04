/*
@title: kill pigs
@author: luiç
@tags: ['puzzle']
@addedOn: 2022-09-13

Instructions:
  You are a storm god and you want some pigs to make your dinner...

  So you need to choose and kill the rigth pig into each of 4 levels
  Which level the number of pigs increase
  With "a" you move left
  With "d" you move rigth
  With "j" you throw the ray

  Enjoy and good dinner :)
*/

const player = "p"
const ray = "r"
const cloud1 = "1"
const cloud2 = "2"
const pig = "g"
const star = "s"

setLegend(
  [ player, bitmap`
.........6......
....0...06......
....0000066.....
.....000.666....
..0..000.666....
..00..0...666...
..000000000666..
..0000000000666.
.....000....666.
.....000.....66.
.....000.....66.
....00000.....6.
....00.00.....6.
....00.00.....6.
....00.00.......
....00.00.......`],
  [ ray, bitmap`
................
................
................
......6.........
......6.........
......66........
......666.......
.......66.......
.......66.......
........66......
.........6......
.........6......
................
................
................
................`],
  [ cloud1, bitmap`
....77.77.777...
7777777777777777
7777777777777777
77777777777777..
.7777777777777..
...7777777777...
....7777777.....
......77........
................
................
................
................
................
................
................
................`],
  [ cloud2, bitmap`
..77............
..777777.....77.
7777777.....7777
7777777777.77777
7777777777777777
.77777777777777.
.77777777777777.
....77.7777.....
................
................
................
................
................
................
................
................`],
  [ pig, bitmap`
................
...000.....000..
..0888.000.8880.
..0880088800880.
...00888888800..
...08028882080..
..0880088800880.
..0888800088880.
..0888088808880.
..0888008008880.
...08808880880..
...08880008880..
....088888880...
....080888080...
....088000880...
....000...000...`],
  [ star, bitmap`
5525555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555552555
5555555555522255
5555555555222225
5555555555522255
5525555555552555
5222555555555555
2222255555555555
5222555555555555`],
);

let level = 0;
const levels = [
  map`
...p...
2121212
.......
.......
.......
..g.g..`,
  map`
...p...
2121212
.......
.......
.......
..ggg..`,
  map`
...p...
2121212
.......
.......
.......
g.ggg.g`,
  map`
...p...
2121212
.......
.......
.......
ggggggg`,
];

setBackground(star)
setMap(levels[level])
setSolids([ player, pig ]);
setPushables({
  [player]: []
});

let isThrowingRay = false
const timeout = (t) => new Promise((res) => setTimeout(() => res(), t))
const getRandomValueFromSize = (s) => Math.floor(Math.random()*s)
const setKeyMap = () => {
  const charMap = {
    a: (p) => () => p.x--,
    d: (p) => () => p.x++,
  }
  
  Object.keys(charMap).forEach((c) => 
    onInput(c, charMap[c](getFirst(player)))
  )
}
const startLevel = (level) => {
  setKeyMap()
  addText("" + (level + 1), { x: 1, y: 0, color: color`3` })
  
}
startLevel(level)

const throwRay = async (x, y) => {
  isThrowingRay = true

  addSprite(x, y, ray)
  const thisRay = getFirst(ray)
  
  for (let i = 0; i < 5; i++) {
    await timeout(500)  
    thisRay.y++
  }
  isThrowingRay = false
  return thisRay.x
}

onInput("j", async () => {
  if (isThrowingRay) return

  const pigs = getAll(pig)
  const anyPig = pigs[getRandomValueFromSize(pigs.length)]
  pigs.forEach(({x, y}) => x !== anyPig.x ? clearTile(x, y) : false)
  
  const thisPlayer = getFirst(player)
  const rayPosition = await throwRay(thisPlayer.x, thisPlayer.y)

  const isWin = getAll(pig).some(({ x }) => x === rayPosition )
  const message = isWin ? "You Win" : "You Lose"
  
  addText(message, { x: 6, y: 8, color: color`3` })
  await timeout(1000)
  clearText()
  
  if (isWin) {
    ++level
    
    if (!levels[level]) {
      level = 0
    }
    
    setMap(levels[level])
    startLevel(level)
    return
  }

  setMap(levels[level])
  startLevel(level)
});
