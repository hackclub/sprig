/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Kaboom
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const jackOLantern = "j"
const grass = "g"



setLegend(
  [ player, bitmap`
................
................
................
................
................
................
................
................
................
.00000000000000.
.0CCCCCCCCCCCC0.
.0CCCCCCCCCCCC0.
.00000000000000.
................
................
................` ],
  [jackOLantern, bitmap`
................
................
................
.......000......
.......040......
.....0000000....
....090090090...
....090090090...
....099999990...
....099000990...
....090000090...
.....0000000....
................
................
................
................`],
  [ grass, bitmap`
0000000000000000
4444444444444444
4444444444444444
4444444444444444
4444444444404444
4444444444044444
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDD0DDDDDDDDDDDD
DDDD0DDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDD0DDDDDD
DDDDDDDDDD0DDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ]
  )

let level = 0
const levels = [
  map`
.j......
........
........
p.......
gggggggg`
]

setMap(levels[level])

setPushables({
  [ player ]: [ jackOLantern ]
})

addText("Score:", { x: 2, y: 0, color: color`1` });
let score = 0;
let countDownTime = 60;
const interval = setInterval(function() {
    countDownTime--;
    let i = 1;
    if(countDownTime % 1 == 0){
        getFirst(jackOLantern).y += 1;
    }
    if(getFirst(player).x == getFirst(jackOLantern).x && getFirst(player).y == getFirst(jackOLantern).y){
        getFirst(jackOLantern).remove()
        const newX = Math.floor((Math.random() * 5)+1);
        const newY = 0;
        addSprite(newX, newY, jackOLantern);
        score += 1;
        i += 1
      addText(`${score}`, { x: 9, y:0, color: color`4` });
  }
    if(getFirst(jackOLantern).y > getFirst(player).y){
      addText("G", { x: 8, y: 4, color: color`3`, size: 4 });
      addText("A", { x: 9, y: 4, color: color`3`, size: 4 });
      addText("M", { x: 10, y: 4, color: color`3`, size: 4 });
      addText("E", { x: 11, y: 4, color: color`3`, size: 4 });
      addText("O", { x: 8, y: 5, color: color`3`, size: 4 });
      addText("V", { x: 9, y: 5, color: color`3`, size: 4 });
      addText("E", { x: 10, y: 5, color: color`3`, size: 4 });
      addText("R", { x: 11, y: 5, color: color`3`, size: 4 });
    }
    if (countDownTime <= 0) {
        clearInterval(interval);
    }
}, 1000);
    
onInput("a", () => {
  getFirst(player).x -=1
})

onInput("d", () => {
getFirst(player).x += 1
})

afterInput(() => {

})