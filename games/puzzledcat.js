/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: puzzledcat
@author: Jon G-L
@tags: []
@addedOn: 2026-03-13
@description: A puzzle game featuring a cat
*/

const player = "p"
const cubecat = "c"
const goal = "g"
const wall = "w"
const text = "t"
const portal1 = "z"
const portal2 = "x"
const button = "b"
const door = "d"
const text2 = "q"

setLegend(
  [ player, bitmap`
.0...........0..
.00.........00..
.020.......020..
.0220000000220..
.0200022999020..
.0000222999900..
.0002222299990..
.0002022209990..
.0022022209990..
.0222228222990..
.0222220222220..
.0222020202220..
.0222202022220..
..02222222220...
...022222220....
....0000000.....` ],
  [ cubecat, bitmap`
................
.......00.......
..1....00....1..
..11..0000..11..
..111111111111..
..111111111111..
..111111111111..
..111011110111..
..111011110111..
..111111111111..
..111118811111..
..111118811111..
..111111111111..
..111111111111..
..111111111111..
..111111111111..` ],
  [ goal, bitmap`
....11111111....
...1111111111...
..111LLLLLL111..
.11LLLLLLLLLL11.
111LLLLLLLLLL111
11LLLLLLLLLLLL11
11LLLLLLLLLLLL11
11LLLLLLLLLLLL11
11LLLLLLLLLLLL11
11LLLLLLLLLLLL11
11LLLLLLLLLLLL11
111LLLLLLLLLL111
.11LLLLLLLLLL11.
..111LLLLLL111..
...1111111111...
....11111111....` ],
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
0000000000000000` ],
  [ text, bitmap`
................
.00.0.0.000.....
.00.0.0..0......
.0..000..0......
................
.0..000.0.0.....
.00.0.0..0......
.00.000.0.0.....
................
.....D..........
.....D..........
.....D..........
...D.D.D........
....DDD.........
.....D..........
................` ],
  [ portal1, bitmap`
.....555555.....
....55555555....
....55555555....
...5555555555...
...5555555555...
...5555555555...
...5555555555...
...5555555555...
...5555555555...
...5555555555...
...5555555555...
...5555555555...
...5555555555...
....55555555....
....55555555....
.....555555.....` ],
  [ portal2, bitmap`
.....999999.....
....99999999....
....99999999....
...9999999999...
...9999999999...
...9999999999...
...9999999999...
...9999999999...
...9999999999...
...9999999999...
...9999999999...
...9999999999...
...9999999999...
....99999999....
....99999999....
.....999999.....` ],
  [ button, bitmap`
................
....11111111....
...1111111111...
..111333333111..
.11133333333111.
.11333333333311.
.11333333333311.
.11333333333311.
.11333333333311.
.11333333333311.
.11333333333311.
.11133333333111.
..111333333111..
...1111111111...
....11111111....
................` ],
  [ door, bitmap`
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
1111111111111111` ],
  [text2, bitmap`
................
.0.0....0.0.....
..0..00.0.0.....
..0..00.000.....
................
.0.0.0.0.000....
..0.0..0.0.0....
................
................
..0.00..........
....0.0.........
....0.0.........
..0.00..........
................
................
................` ]
);

let teleportCooldown = []
let doorPositions = []

setSolids([ player, cubecat, wall, text, door])

let level = 0
const levels = [
  map`
wwwwww
wp.wtw
w.cwgw
w....w
w....w
wwwwww`,
  map`
wwwwww
wp.wgw
w..w.w
w.c..w
ww.w.w
ww...w
wwwwww`,
  map`
wwwwwwwww
w..pw..gw
w.c.w...w
w...w.x.w
w.z.w...w
w...w...w
wwwwwwwww`,
  map`
wwwwwwwww
w.p.w..gw
wc..w...w
w..zwx.cw
w...w...w
wg..w...w
wwwwwwwww`,
  map`
wwwwwww
wp.w.gw
w..w.cw
wc.d..w
w..w..w
wb.w..w
wwwwwww`,
  map`
wwwwwwwwww
w........w
w.....z..w
wg.......w
wwwwwwwwww
w...d....w
wp..w..x.w
wc..w..c.w
wb..w....w
wwwwwwwwww`,
  map`
wwwwwwwww
w.p.wg.gw
w...w...w
w.ccd...w
wc..w...w
wb..w...w
wwwwwwwww`,
  map`
wwwwwwwwwwwww
w...wwwwwwwww
w...d......gw
w...w.......w
w.wwww.wwwwww
w.www.......w
w.www...c...w
w.www.c....cw
wgwww..p...bw
wwwwwwwwwwwww`,
  map`
wwwwwwwwww
ww..wgwwww
ww.cw.wwww
ww..w....w
www.w....w
ww..wwwdww
w..cw....w
wp.xwz...w
w...w...bw
wwwwwwwwww`,
  map`
wwwwwww
wcqqqcw
wqqqqqw
wqqpqqw
wqqqqqw
wcqqqcw
wwwwwww`


]

setMap(levels[level])

setPushables({
  [ player ]: [cubecat],
  [cubecat]: [cubecat]
})

onInput("s", () => {
  getFirst(player).y += 1; 
});

onInput("d", () => {
  getFirst(player).x += 1;
});

onInput("w", () => {
  getFirst(player).y += -1; 
});

onInput("a", () => {
  getFirst(player).x += -1;
});

// input to reset level
onInput("j", () => {
  const currentLevel = levels[level]; // get the original map of the level

  // make sure the level exists before we load it
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});


afterInput(() => {

  // --- reset teleport cooldown from last move ---
teleportCooldown.forEach(sprite => {
  sprite.justTeleported = false
})
teleportCooldown = []

const p1 = getFirst(portal1)
const p2 = getFirst(portal2)

if (p1 && p2) {

  // --- check portal1 ---
  getTile(p1.x, p1.y).forEach(sprite => {
    if (
      sprite.type !== portal1 &&
      sprite.type !== portal2 &&
      !sprite.justTeleported
    ) {
      sprite.x = p2.x
      sprite.y = p2.y
      sprite.justTeleported = true
      teleportCooldown.push(sprite)
    }
  })

  // --- check portal2 ---
  getTile(p2.x, p2.y).forEach(sprite => {
    if (
      sprite.type !== portal1 &&
      sprite.type !== portal2 &&
      !sprite.justTeleported
    ) {
      sprite.x = p1.x
      sprite.y = p1.y
      sprite.justTeleported = true
      teleportCooldown.push(sprite)
    }
  })

}
  
  const buttonPressed = tilesWith(button, cubecat).length > 0

if (buttonPressed) {

  // remove all doors
  getAll(door).forEach(d => {
    d.remove()
  })

} else {

  // restore doors if missing
  doorPositions.forEach(pos => {
    if (getTile(pos.x, pos.y).filter(s => s.type === door).length === 0) {
      addSprite(pos.x, pos.y, door)
    }
  })

}
  
  
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, cubecat).length

  if (numberCovered === targetNumber) {
   
    level = level + 1
    const currentLevel = levels[level]
   
    if (currentLevel !== undefined) {
      setMap(currentLevel); doorPositions = getAll(door).map(d => ({x: d.x, y: d.y}))
    } else {
      addText("you win :D", { y: 4, color: color`0` })
    }
  }

})
