/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Climb-a-thing?
@author: chahatesh
@description: So essentially you have a few platforms, you gotta jump onto them and make it to the end of the game.
@tags: ['platformer', 'puzzle']
@addedOn: 2026-11-20
*/

const player = "p"
const blocks = "b"
const win = "w"

setLegend(
  [ player, bitmap`
.......00.......
......0..0......
.....0....0.....
.....0....0.....
.....0....0.....
......0..0......
.......00.......
.......00.......
.....000000.....
....00.00.00....
....0..00..0....
....0..00..0....
......0..0......
.....0....0.....
.....0....0.....
.....0....0.....` ],
  [ blocks, bitmap`
7777777777777777
7577777777775777
7777577777777777
7777777577757577
5755757557577575
5777777757757555
7757557575757755
5555575555755555
5575557557555575
5755755755555755
5555555755755555
5555555555555555
5557555557555555
5555555555555555
5555555555555555
5555555555555555` ],
  [ win, bitmap`
4444444444444444
................
4444444444444444
................
4444444444444444
................
4444444444444444
................
4444444444444444
................
4444444444444444
................
4444444444444444
................
4444444444444444
................` ],
)

setSolids([player, blocks])


let level = 0
const levels = [
  map`
..........
.w........
.b........
.bbb..bb..
..........
.bbbb.....
..........
.....bbbb.
.p........
bbbbbbbbbb`,
  map`
..........
..........
....bw....
...bbbb...
.....b....
bbb..bbbb.
.....b....
...bbb...b
.p...b....
bbbbbbbbbb`,
  map`
..........
..p...bb..
bbbb...b..
...b...b..
...b...b..
...b...b..
...b...b..
...b...b..
...b...bww
...b...bbb`
]

onInput("d", () => {
  const p = getFirst(player)

  if (p && getTile(p.x + 1, p.y).length === 0) {
    p.x += 1
  }
})

onInput("a", () => {
  const p = getFirst(player)

  if (p && getTile(p.x - 1, p.y).length === 0) {
    p.x -= 1
  }
})

onInput("w", () => {
  const p = getFirst(player)
  const isGrounded = p && (p.y + 1 >= height() || getTile(p.x, p.y + 1).length > 0)
  
  if (p && isGrounded) {
    let jumpHeight = 3
    if (p.y - 1 < 0 || getTile(p.x, p.y - 1).length > 0) jumpHeight = 0
    else if (p.y - 2 < 0 || getTile(p.x, p.y - 2).length > 0) jumpHeight = 1
    else if (p.y - 3 < 0 || getTile(p.x, p.y - 3).length > 0) jumpHeight = 2
    
    if (jumpHeight > 0) {
      p.y -= jumpHeight
    }
  }
})

afterInput(() => {

  const targetNumber = tilesWith(win).length;
  
  const numberCovered = tilesWith(win, player).length;

  if (numberCovered === targetNumber) {

    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});

setInterval(() => {
  const p = getFirst(player)
  if (p && getTile(p.x, p.y + 1).length === 0) {
    p.y += 1
  }
}, 300)

setMap(levels[level])

onInput("s", () => {
  getFirst(player).y += 1
})