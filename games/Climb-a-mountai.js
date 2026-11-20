/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Best game
@description: 
@author: 
@tags: ['tag1', 'tag2']
@addedOn: 2025-00-00
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
  // Check if tile to the right is empty (not a solid wall) before moving
  if (p && getTile(p.x + 1, p.y).length === 0) {
    p.x += 1
  }
})

onInput("a", () => {
  const p = getFirst(player)
  // Check if tile to the left is empty before moving
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
  // count the number of tiles with goals
  const targetNumber = tilesWith(win).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(win, player).length;

  // if the number of goals is the same as the number of goals covered
  // all goals are covered and we can go to the next level
  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
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