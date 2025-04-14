
/* 
@title: Minigame-Mania
@description: Minigame-Mania is a strategic platform game where players navigate a player character through levels filled with obstacles and lava. The game features a side-scrolling environment where precise timing and movement are essential to progress and avoid hazards. As you advance through increasingly challenging levels, your goal is to reach the end without falling into the lava.
@author: FlubbedAlpaca, ManushPatell, AiyuuGames, MatiasSharofi
@tags: ['strategy']
@addedOn: 2023-05-27
*/

    var cnt = 1;
var cnt2 = 0
const player = "p";
const obstacle = "o";
const lava = "l";
const level = [map`
..........
..........
..........
..........
....oooo..
....o.....
..ooo.....
p.lllllll.`,map`
..........
..........
..........
..........
.oooooooo.
.o......o.
.o.oooo.o.
p..llll...`,map`
..........
..........
.........o
........o.
......oo..
....o.....
..o.......
p.llllllll`]
setLegend(
  [obstacle, bitmap`
D00DDD0DDDDDDDDD
DD0DDD0DDDDDDDDD
DD4DDD40DD4D04DD
DD04DDD00DD00DDD
DDD0DDDDDD00D4DD
DDD404DD440D4DDD
00D4DDDDDDD4DD4D
DD40004D4DD00000
DD4DDD4D0D4DDD4D
DDDD4DDD40DD4DDD
DD4DDD4DD40DDDDD
D4DDD00DDDD4D4DD
DDD400DD4DDD00DD
D4D0DD4D44DD40DD
DDDD4D0DDD4DDD00
DDDDDD0DDDDDDDDD`],
  [player, bitmap`
................
................
.....77777......
.....70707......
.....77777......
.....77777......
.......7........
.....77777......
....77.7.77.....
....6..7..6.....
.......7........
.......7........
......777.......
......7.7.......
.....77.77......
    ................`], [lava, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
9999999999999999`]
)
setSolids([player, obstacle])
setMap(level[0])

onInput("d", () => {
  var p = getFirst(player)
  p.x ++
  down()
  lavaCheck()
})
onInput("a", () => {
  var p = getFirst(player)
  p.x --
  down()
  lavaCheck()
})
onInput("w", () => {
  var p = getFirst(player)
  var check = p.y
  p.y++
  if(check == p.y){
  jump()
  }
})
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function down(){
  var p = getFirst(player)
    var check = -1
    while(check!=p.y){
    check = p.y
    p.y++
    await sleep(100)
  }
}

async function jump(){
  var p = getFirst(player)
  p.y--
  await sleep(100)
  p.y--
  await sleep(100)
  p.y--
  await sleep(100)
  var check = -1
  while(check!=p.y){
    check = p.y
    p.y++
    await sleep(100)
  }
}

async function lavaCheck(){
  var l = getAll(lava)
  var p = getFirst(player)
  for(var i = 0;i<l.length;i++){
    var lava2 = l[i]
    if(p.x == lava2.x){
      if(p.y == lava2.y){
      setMap(level[cnt2])
      addText("try again",{color: color`3`})
      await sleep(2000)
      clearText()
    }
    }
}
}

var gameLoop  = setInterval(() => {
  lavaCheck()
  var p = getFirst(player)
  if(p.x == 9){
    if(cnt<=2){
    setMap(level[cnt])
    }
    cnt++
    cnt2++
    if (cnt>3){
      clearInterval(gameLoop)
      addText("You Win",{color: color`5`})
      playback.end()
      var winsound = tune`
181.8181818181818,
181.8181818181818: C4/181.8181818181818,
181.8181818181818: F4/181.8181818181818,
181.8181818181818: B4/181.8181818181818,
181.8181818181818: E5/181.8181818181818,
181.8181818181818,
181.8181818181818: G5/181.8181818181818 + C5~181.8181818181818,
181.8181818181818,
181.8181818181818: E5/181.8181818181818 + A4~181.8181818181818,
181.8181818181818: C5/181.8181818181818,
181.8181818181818: A4~181.8181818181818,
181.8181818181818: A4~181.8181818181818,
181.8181818181818: B4~181.8181818181818,
181.8181818181818: C5~181.8181818181818,
3272.7272727272725`
      playTune(winsound)
    }
  }
}, 150)

const melody = tune`
222.22222222222223,
222.22222222222223: C5~222.22222222222223 + E4~222.22222222222223 + G5~222.22222222222223,
222.22222222222223,
222.22222222222223: D5~222.22222222222223,
222.22222222222223,
222.22222222222223: C5~222.22222222222223,
222.22222222222223: C5~222.22222222222223 + D5^222.22222222222223,
222.22222222222223: B4~222.22222222222223,
222.22222222222223: A4~222.22222222222223,
222.22222222222223,
222.22222222222223: C5~222.22222222222223 + F5^222.22222222222223,
222.22222222222223,
222.22222222222223: D5~222.22222222222223 + B5^222.22222222222223,
222.22222222222223,
222.22222222222223: F5~222.22222222222223,
222.22222222222223: D5~222.22222222222223,
222.22222222222223: C5~222.22222222222223,
222.22222222222223: C5~222.22222222222223 + E5^222.22222222222223,
222.22222222222223: C5~222.22222222222223,
222.22222222222223: B4~222.22222222222223,
222.22222222222223,
222.22222222222223: C5~222.22222222222223,
222.22222222222223: B4~222.22222222222223 + E5^222.22222222222223,
222.22222222222223,
222.22222222222223: B4~222.22222222222223,
222.22222222222223: F5^222.22222222222223,
222.22222222222223: A4~222.22222222222223 + C5^222.22222222222223,
222.22222222222223,
222.22222222222223: D5~222.22222222222223,
222.22222222222223: C5~222.22222222222223,
222.22222222222223,
222.22222222222223: G4/222.22222222222223 + C4/222.22222222222223 + B5^222.22222222222223 + E5^222.22222222222223`
var playback = playTune(melody, Infinity)

