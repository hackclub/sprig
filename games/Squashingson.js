/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Goopingson
@author: 
@tags: []
@addedOn: 2025-00-00
*/
let ispause = false;
const player = "p"
const block = "b"
setLegend(
  [ block, bitmap`
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
  [ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ]
)



setSolids([player])

let level = 0
const levels = [
  map`
.....
.....
.....
.....
.....
.....
.....
.b.p.
.....`
]

setMap(levels[level])

setPushables({
  [ player ]: [block]
})



function newtonhaslaws() {
  if (ispause == false) {
  if (getFirst(player).y != 4) {

    getFirst(player).y += 1
  }
  const blockspr = getAll(block);
  blockspr.forEach(block => {
   if (block.y >= 8) {
    block.remove()
  }   
  block.y += 1
    console.log(tilesWith(block,player).length)
  if (getFirst(player).x == block.x && block.y == 8) {
  console.log('hello')
    addText("you got squashed", { x: 1,y: 4,color: color`3`})
    ispause = true
    console.log(ispause)
  } 

   });

  

}}
function blocksummon() {
  if (ispause == false) {
  xrand = Math.floor(Math.random() * 5);
  addSprite(xrand,0,block) }
}
if (ispause == false) {
onInput("s", () => {
  if (ispause == false) {
  getFirst(player).y += 1 }
})
onInput("w", () => {
  if (ispause == false) {
  getFirst(player).y -= 2 }
})
onInput("a", () => {
  if (ispause == false) {
  getFirst(player).x -= 1 }
})
onInput("d", () => {
  if (ispause == false) {
  getFirst(player).x += 1 }
})
const newton = setInterval(newtonhaslaws, 300);
const blockinterval = setInterval(blocksummon, 1300);
}

afterInput(() => {
  console.log(getFirst(player).y)

})