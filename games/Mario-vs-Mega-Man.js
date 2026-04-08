/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Mario vs Mega Man
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const Megaman = "p"
const Mario = "q"
const Fireball = "f"
const Buster = "b"
const Tile = "t"
const MetalBlade = "m"
const HyperBomb = "c"
const HardKnuckle = "h"
const Barrier = "s"
const WaterShield = "w"

weapon = 1
mariodirection = 1


setLegend(
  [ Megaman, bitmap`
................
.......75.......
......5575......
.....755557.....
.....756567.....
......5060......
.......666...55.
.....77777775665
....777777775555
...7777777...55.
..557.5775......
..55..7557......
......7..7......
.....55..55.....
.....55..55.....
....555..555....` ], [ Mario, bitmap`
......333.......
......2233......
....3333333.....
.....066333.....
.....606633.....
....000063......
......66........
223337337333....
2233373373333...
.....6776..33...
.....7777..222..
....77..77...2..
....77..77......
....77..77......
....CC..CC......
...CCC..CCC.....` ], [ Tile, bitmap`
3333333333333333
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3..............3
3333333333333333` ], [ Fireball, bitmap`
................
................
..........9999..
..............9.
.......9999.....
....9999999999..
....999999999999
....999666999.99
....96666999....
....9996699.....
......99999....9
............999.
..........999...
................
................
................` ], [ Buster, bitmap`
................
................
................
................
................
......6666......
.....666666.....
....66666666....
....66666666....
.....666666.....
......6666......
................
................
................
................
................` ], [ MetalBlade, bitmap`
.......L........
..LLL..LL....L..
...LLLLLL...LL..
....LLLLLLLLLL..
....LLLLLLLLL...
....LLLLLLLL....
..LLLLL..LLLLLL.
.LLLLLL..LLLLL..
....LLLLLLLLL...
....LLLLLLLLL...
..LLLLLLLLLLL...
..LL..LLLLLLLL..
..L....LL...LL..
........L....L..
................
................` ], [ HyperBomb, bitmap`
..........99....
.........L99....
........LL......
.......LL.......
.....000000.....
....00000200....
...0000002200...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
...0000000000...
....00000000....
.....000000.....
................
................` ], [ HardKnuckle, bitmap`
................
................
................
................
...555555555....
9955555555555...
96555555555555..
99555555555555..
...55555555555..
.......5050505..
........05050...
................
................
................
................
................` ], [ Barrier, bitmap`
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
0000000000000000` ], [ WaterShield, bitmap`
................
....77777.....7.
...777777777....
..777772222777..
.77777722222777.
.77777772222277.
.77777777722277.
.77777777777777.
.77777777777777.
..7777777777777.
..777777777777..
...7777777777...
....777777777...
.......7777.....
7...............
............7...` ]
)

setSolids([Megaman, WaterShield])

let level = 0
firewait = 1
MegaHP = 20
MarioHP = 100
running = true

const levels = [
  map`
s......s
s.p..q.s
s......s`
]

setMap(levels[level])

setPushables({
  [Barrier]: [Megaman]
})





onInput("d", () => {
  if(getFirst(Megaman).x <= 4 && running){
    getFirst(Megaman).x += 1
  }
  
})
onInput("a", () => {
  if(getFirst(Megaman).x > 1 && running){
    getFirst(Megaman).x -= 1
  }
})
onInput("w", () => {
  if(running){
    getFirst(Megaman).y -= 1
  }
})
onInput("s", () => {
  if(running) {
    getFirst(Megaman).y += 1
  }
})
onInput("i", () => {
  
})
onInput("j", () => {
  if(running) {
    weapon -= 1
  }
})
onInput("k", () => {
  if(running){
    if(weapon == 1 && tilesWith(Buster).length < 3){
      addSprite(getFirst(Megaman).x, getFirst(Megaman).y, Buster)
    }
    else if(weapon == 2 && tilesWith(MetalBlade).length < 2){
      addSprite(getFirst(Megaman).x, getFirst(Megaman).y, MetalBlade)
    }
    else if(weapon == 3 && tilesWith(WaterShield).length < 4){
      addSprite(getFirst(Megaman).x + 1, getFirst(Megaman).y, WaterShield)
      addSprite(getFirst(Megaman).x, getFirst(Megaman).y + 1, WaterShield)
      addSprite(getFirst(Megaman).x - 1, getFirst(Megaman).y, WaterShield)
      addSprite(getFirst(Megaman).x, getFirst(Megaman).y - 1, WaterShield)
    }
    else if(weapon == 4 && tilesWith(HardKnuckle).length < 1){
      addSprite(getFirst(Megaman).x, getFirst(Megaman).y, HardKnuckle)
    }
  }
 
})

onInput("l", () => {
  if(running){
   weapon += 1
  }
})



var gameLoop = setInterval(() => {
  
  let fireball = getAll(Fireball);
  let metalblade = getAll(MetalBlade);
  let watershield = getAll(WaterShield);
  let hardknuckle = getAll(HardKnuckle);
  let buster = getAll(Buster);
  if(running) {
    if(fireball.length < 2 && firewait == 2){
       addSprite(getFirst(Mario).x, getFirst(Mario).y, Fireball)
      firewait = 0
    }
    else{
      firewait += 1
    }
    for(let j = 0; j < buster.length; j++) {
      if(buster[j].x == getFirst(Mario).x && buster[j].y == getFirst(Mario).y) {
        MarioHP -= 3
      }
    }
    for(let j = 0; j < metalblade.length; j++) {
      if(metalblade[j].x == getFirst(Mario).x && metalblade[j].y == getFirst(Mario).y) {
        MarioHP -= 5
      }
    }
    for(let j = 0; j < hardknuckle.length; j++) {
      if(hardknuckle[j].x == getFirst(Mario).x && hardknuckle[j].y == getFirst(Mario).y) {
        MarioHP -= 10
      }
    }
   
    for (let i = 0; i < fireball.length; i++) {
      fireball[i].x -= 1;
      if(fireball[i].x == 0) {
        clearTile(fireball[i].x, fireball[i].y)
        x = fireball[i].x
        y = fireball[i].y
        addSprite(x, y, Barrier)
      }
      if(fireball[i].x == getFirst(Megaman).x && fireball[i].y == getFirst(Megaman).y) {
        MegaHP -= 1
      }
      for (let j = 0; j < watershield.length; j++) {
        if(fireball[i].x == watershield[j].x && fireball[i].y == watershield[j].y){
          clearTile(fireball[i].x, fireball[i].y)
        }
      }
    }
    for (let i = 0; i < buster.length; i++) {
      buster[i].x += 1;
      if(buster[i].x == 7) {
        clearTile(buster[i].x, buster[i].y)
        x = buster[i].x
        y = buster[i].y
        addSprite(x, y, Barrier)
      }
    }
    for (let i = 0; i < metalblade.length; i++) {
      metalblade[i].x += 1;
      if(metalblade[i].x == 7) {
        clearTile(metalblade[i].x, metalblade[i].y)
        x = metalblade[i].x
        y = metalblade[i].y
        addSprite(x, y, Barrier)
      }
    }
    for (let i = 0; i < hardknuckle.length; i++) {
      hardknuckle[i].x += 1;
      if(hardknuckle[i].x == 7) {
        clearTile(hardknuckle[i].x, hardknuckle[i].y)
        x = hardknuckle[i].x
        y = hardknuckle[i].y
        addSprite(x, y, Barrier)
      }
    }
    if(mariodirection == 1){
      getFirst(Mario).y += 1
      if(getFirst(Mario).y >= 2){
        mariodirection = -1
      }
    }
    else if(mariodirection == -1){
      getFirst(Mario).y -= 1
      if(getFirst(Mario).y <= 0){
        mariodirection = 1
      }
    }
    clearText()
    megaHP = MegaHP.toString()
    marioHP = MarioHP.toString()
    addText("Mega Man:", options = { x:0, y:0, color: color`5` })
    addText(megaHP, options = { x:10, y:0, color: color`5` })
    addText("Mario:", options = { x:0, y:1, color: color`3` })
    addText(marioHP, options = { x:10, y:1, color: color`3` })
    addText("Weapon:", options = { x:0, y:13, color: color`7` })
    
    addText("Mega Man:", options = { x:0, y:0, color: color`5` })
    addText(megaHP, options = { x:10, y:0, color: color`5` })
    addText("Mario:", options = { x:0, y:1, color: color`3` })
    addText(marioHP, options = { x:10, y:1, color: color`3` })
    addText("Weapon:", options = { x:0, y:13, color: color`7` })
    
    if(weapon == 1){
    addText("Mega Buster", options = { x:7, y:13, color: color`6` })
  }
    else if(weapon == 2){
      addText("Metal Blade", options = { x:7, y:13, color: color`L` })
    }
    
    else if(weapon == 3){
      addText("Water Shield", options = { x:7, y:13, color: color`7` })
    }
    else if(weapon == 4){
      addText("Hard Knuckle", options = { x:7, y:13, color: color`5` })
    }
    if(megaHP <= 0) {
      addText("Mario Wins!", options = { x:5, y:7, color: color`3` })
      running = false
    }
    if(marioHP <= 0) {
      addText("You Win!", options = { x:5, y:7, color: color`7` })
      running = false
    }
}
 
}, 200);


afterInput(() => {
 
  
 if(tilesWith(Buster).length == 1){
   if(getFirst(Mario).x == getFirst(Buster).x && getFirst(Mario).y == getFirst(Buster)) {
    getFirst(Buster).remove()
  }
   
  
 }
  
  
  
  
})