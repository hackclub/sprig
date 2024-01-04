
/* 
@title: Pet_the_Cat
@author: Nathan Jereb
@tags: []
@img: ""
@addedOn: 2023-05-08
*/

    //I have 5 cats and 2 dogs//

const player = "p"
const exstend = "e"
const pat = "s"
const cat = "c"
const pattedcat= "a"
const background = "b"
var pats = 0
setBackground(background)

setLegend(
  [ player, bitmap`
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0000000000...
..00CCCCCCCC00..
.00CCCCCCCCCC0..
.0CCCCCCCCCCC0..
.0C0CCCCCCCCC0..
.0C0CCCCCCCCC0..
..00C0CC0CC0C0..
...0C0CC0CC0C0..
...00000000000..` ],
  [ exstend, bitmap`
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...` ],
  [ pat, bitmap`
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
...0222222220...
..00000000000...
.0CCCCCCCCCC00..
0CCCCCCCCCCCC000
0CC0000CCCCCCCC0` ],
  [ cat, bitmap`
...0........0...
..0L0......0L0..
.0L8L0....0L8L0.
0L888L0000L888L0
0LLLLLLLLLLLLLL0
0LL00LLLLLL00LL0
0L04D0LLLL0D40L0
0L04D0LLLL0D40L0
0L04D0LLLL0D40L0
0L0440LLLL0440L0
0LL00LLLLLL00LL0
0LLLLL8888LLLLL0
0L0000L88L0000L0
0LLL0LLLLLL0LLL0
0LL0LLLLLLLL0LL0
0LLLLLLLLLLLLLL0` ],
  [ pattedcat, bitmap`
.0CCCCCCCCCCCC0.
..00CCCCCCCC00..
.0080CCCCCC0800.
0888000000008880
0LLLLLLLLLLLLLL0
0LL00LLLLLL00LL0
0L0LL0LLLL0LL0L0
00LLLL0LL0LLLL00
0LLLLL0LL0LLLLL0
0LLLLLLLLLLLLLL0
0LLLLL8888LLLLL0
0L0000L88L0000L0
0LL0LL0000LL0LL0
0L0LL022220LL0L0
0LLLL023320LLLL0
0LLLL038830LLLL0` ],
  [ background, bitmap`
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
7777777777777777`]
)

setSolids([])

let level = 0
const levels = [
  map`
p
.
c`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  petting()
})
onInput("w", () => {
  reset()
})
onInput("i", () => {
  reset()
})
onInput("k", () => {
  petting()
})

setInterval(function() {
  addText("Pats: " + pats, { 
    color: color`4`
  })
})
function petting(){
  getFirst(player).remove()
  addSprite(0, 0, "e")
  addSprite(0, 1, "s")
  getFirst(cat).remove()
  addSprite(0, 2, "a")
  pats++
}
function reset(){
  getFirst(pattedcat).remove()
  getFirst(exstend).remove()
  getFirst(pat).remove()
  addSprite(0, 0, "p")
  addSprite(0,2, "c")
}
