/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: super awesome platformer
@author: anayal8er
@tags: []
@addedOn: 2024-07-26
*/

const player = "p"
const wall = "w"
const win = "u"


setLegend(
  [ player, bitmap`
................
................
....555555......
....505505......
....555555......
....505505......
....550055......
......55........
...55555555.....
......55........
......55........
......55........
....55..55......
....55..55......
....55..55......
....55..55......` ],
  [wall, bitmap`
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
  [win, bitmap`
................
........66......
........66......
........66......
.......666......
...66666666666..
....666666666...
.....6666666....
.....666666.....
....66666666....
...6666..6666...
..........666...
................
................
................
................`]
  
)

setSolids([player, wall])

let level = 0
const levels = [map `
wwwwwww
ww...uw
ww.wwww
ww.wwww
wp.wwww
wwwwwww`,
               map`
wwwwwwwwwwwww
www.www....ww
ww...w..ww..w
ww.w.ww.wwwuw
ww.w.ww...www
ww.w.ww.w.www
ww.w.ww.w...w
wp.w....wwwww
wwwwwwwwwwwww`,
               map`
wwwwwwwwwwwwwwwwww
wwww.......wwwwuww
wwww.wwwww.ww...ww
w....wwwwwwww.wwww
w.wwwwwwwww...wwww
w.wwwwwwwww.wwwwww
w...........wwwwww
w.wwwwww.w..wwwwww
w.wwwwwww.ww...www
wpwwwwwww....wwwww
wwwwwwwwwwwwwwwwww`,
               map`
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wwwwwwwwwwwwwwwwwwww
wuuuuwuuuwuuuuuwuuuw
wuwwwwuwuwuwuwuwuwww
wuwuuwuuuwuwuwuwuuww
wuwwuwuwuwuwwwuwuwww
wuuuuwuwuwuwwwuwuuuw
wwwwwwwwwwwwwwwwwwww
wuuuuwuwwuwuuuwuuuww
wuwwuwuwwuwuwwwuwuww
wuwwuwuwwuwuuwwuwwww
wuwwuwuwwuwuwwwuwwww
wuuuuwwuuwwuuuwuwwww
wwwwwwwwwwwwwwwwwwww`]
  
setMap(levels[level])



onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})


afterInput(() => {
  const playerSprite = getFirst(player)
  const winSprites = getAll(win)

  // Check if player overlaps with any win sprite
  winSprites.forEach(winSprite => {
    if (playerSprite.x === winSprite.x && playerSprite.y === winSprite.y) {
      // Player has touched the win sprite, move to the next level
      level++
      if (level < levels.length) {
        setMap(levels[level])
      } else {
        // All levels completed, add your logic here
        console.log("You have completed all levels.")
      }
    }
  })
})
