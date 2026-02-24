/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Chase Game
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const enemy = "e" 
const wall = "w" 
const floor = "f" 
setLegend(
  [ player, bitmap`
1111111111111111
1111111111111111
1111L111111L1111
11111L1111L11111
1111144444411111
1111444444441111
1111442222441111
1111442002441111
1144442002444411
1411444444441141
1111444444441111
1111444444441111
1111144444411111
1111114114111111
1111114114111111
1111144114411111`],
  [ enemy, bitmap`
111111111H111111
111111H111H11111
1111111H1HHHH111
11111111HHH00H11
11111111HHHHHH11
1111111HHHHHHH11
1111111HHHH11111
111111HHHHH11111
111111HHHHHHHH11
111111HHHHH11111
11111HHHHHH11111
11111HHHHHH11111
1111HHHHHHH11111
HHHHHHHHHHH11111
HHHHHHHHHH111111
1HHHHHHHHH111111`],
  [ wall, bitmap`
1111111111111111
111LLLLLLLLLLL11
111LLLLLLLLLLL11
111LLLLLLLLLLL11
111LLLLLLLLLLL11
111LLLLLLLLLLL11
111LLLLLLLLLLL11
111LLLLLLLLLLL11
111LLLLLLLLLLL11
111LLLLLLLLLLL11
111LLLLLLLLLLL11
111LLLLLLLLLLL11
111LLLLLLLLLLL11
111LLLLLLLLLLL11
111LLLLLLLLLLL11
111LLLLLLLLLLL11`],
  [ floor,bitmap`
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
1111111111111111`])

setSolids([player, enemy, wall ])
let level = map
  map`
........
...ww...
wwww....
e...p...
w.......`

setMap( map`
ffffffff
fffwwwff
wwwwffff
efffpfff
ffffffff`)
setPushables({
  [ player ]: []
})
onInput("w",() => getFirst(player) .y -=1)
onInput("s",() => getFirst(player) .y +=1)  
onInput("a", () => getFirst(player) .x -=1)  
onInput("d", () => getFirst(player) .x +=1)    

function chase() {
  let p = getFirst(player)
  let e = getFirst(enemy)
  if (!p || !e) return 
  if (e.x < p.x) e.x += 1     
  else if (e.x > p.x) e.x -= 1
  else if (e.y < p.y) e.y += 1
  else if (e.y > p.y) e.y -= 1
}
setInterval(chase,500)

let score = 0 
addText(`Score: ${score} `, {x:0, y:0, color: color `3` }) 
setInterval(() => {
  score += 1
  clearText()
  addText ( `Score: ${score}`, {x: 0, y:0, color: color `3` }) 
}, 1000)

afterInput(() => { 
  if (tilesWith(player,enemy).length >0 ) { 
    clearText()
    addText()
    addText("GAME OVER", {x: 4, y: 6, color :color `3`}) 
} 
}) 
