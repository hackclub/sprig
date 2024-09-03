/*
@title: Treasure Maze
@author: AiyuuHacks
@addedOn: 2024-09-03
@tags: []
*/

const player = "p"
const obstacle1 = "1"
const obstacle2 = "2"
const obstacle3 = "3"
const obstacle4 = "4"
const obstacle5 = "5"
const obstacle6 = "6"
const obstacle7 = "7"
const wall = "w"
const chest = "c"
const o1Path = [1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
const o2Path = [1,1,1,1,1,-1,-1,-1,-1,-1]
const o3Path = [1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1]
const o4Path = [1,1,1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
const o5Path = [1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1]
const o6Path = [1,1,1,1,1,1,-1,-1,-1,-1,-1,-1]
const o7Path = [1,1,1,1,1,1,1,1,1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
setLegend(
  [player, bitmap`
.......0000.....
......0LLLL00...
.....033333330..
....030000000...
.....0L252520...
....0LLLLLLL0...
...030LLLLLL0...
....0.0000000...
.....0LLLLL0....
....0LL0LLL01...
....0110LLL11...
....011LLLL0....
.....00000000...
....0660..0990..
....0000..0000..
................`],
  [obstacle1, bitmap`
................
......000000....
....00055550....
...0055566500...
...0555666650...
...00000000000..
...0222222220...
...0223222320...
...0222CCC220...
...000C222C00...
.....0000000....
.....0555550.006
...0005555500066
..00.0777550.006
.....0777770....
.....0777770....`],
  [obstacle2, bitmap`
................
......000000....
....00055550....
...0055566500...
...0555666650...
...00000000000..
...0222222220...
...0223222320...
...0222CCC220...
...000C222C00...
.....0000000....
.....0555550.006
...0005555500066
..00.0777550.006
.....0777770....
.....0777770....`],
  [obstacle3, bitmap`
................
......000000....
....00055550....
...0055566500...
...0555666650...
...00000000000..
...0222222220...
...0223222320...
...0222CCC220...
...000C222C00...
.....0000000....
.....0555550.006
...0005555500066
..00.0777550.006
.....0777770....
.....0777770....`],
  [obstacle4, bitmap`
................
......000000....
....00055550....
...0055566500...
...0555666650...
...00000000000..
...0222222220...
...0223222320...
...0222CCC220...
...000C222C00...
.....0000000....
.....0555550.006
...0005555500066
..00.0777550.006
.....0777770....
.....0777770....`],
  [obstacle5, bitmap`
................
......000000....
....00055550....
...0055566500...
...0555666650...
...00000000000..
...0222222220...
...0223222320...
...0222CCC220...
...000C222C00...
.....0000000....
.....0555550.006
...0005555500066
..00.0777550.006
.....0777770....
.....0777770....`],
  [obstacle6, bitmap`
................
......000000....
....00055550....
...0055566500...
...0555666650...
...00000000000..
...0222222220...
...0223222320...
...0222CCC220...
...000C222C00...
.....0000000....
.....0555550.006
...0005555500066
..00.0777550.006
.....0777770....
.....0777770....`],
  [obstacle7, bitmap`
................
......000000....
....00055550....
...0055566500...
...0555666650...
...00000000000..
...0222222220...
...0223222320...
...0222CCC220...
...000C222C00...
.....0000000....
.....0555550.006
...0005555500066
..00.0777550.006
.....0777770....
.....0777770....`],
  [wall, bitmap`
0003000030000033
0000300030000030
0000300330000030
0003300033000330
0003000003003300
0003000033003000
0000000000033000
0000000000030000
0000333000000000
0003300000000000
3330000000033000
0000033000003300
0000003000000300
0030000330003300
0330000030000330
3300000030000030`],
  [chest, bitmap`
................
................
................
................
................
....00000000....
...00CCCCCC00...
..00CCCCCCCC00..
.00CCCCCCCCCC00.
.0CCCC6666CCCC0.
.00000600600000.
.0CCCC6666CCCC0.
.0CCCCCCCCCCCC0.
.00000000000000.
................
................`],
  )


setSolids([wall, player])

setMap(map`
c....w7.........
wwww.w.www.w..w.
4...........ww6.
.ww.www.w.w....w
.w...w5.w..www.w
ww.w.w..ww.w.w.w
3w...w.......w.w
...www.w.ww..w..
.ww....w..w..w..
.w..ww.w2.....w.
..w.w..wwww.www.
.w..ww....w.....
.ww.........ww..
.....www..w..w..
wwww.w.w.w.www..
p....w1.........`)
       
onInput("d", () => {
  var p = getFirst(player)
  p.x += 1
})

onInput("a", () => {
  var p = getFirst(player)
  p.x -= 1
})

onInput("w", () => {
  var p = getFirst(player)
  p.y -= 1
})

onInput("s", () => {
  var p = getFirst(player)
  p.y += 1
})

function playerWin(){
  var chests = getAll(chest)
  var p = getFirst(player)

  for (var i = 0; i<chests.length; i++){
    var c = chests [i]
    if (c.x == p.x && c.y == p.y){
      return true
    }
  }
  return false
}

function playerHit1(){
  var obstacles1 = getAll(obstacle1)
  var p = getFirst(player)

  for (var i = 0; i<obstacles1.length; i++){
    var o = obstacles1 [i]
    if (o.x == p.x && o.y == p.y){
      return true
    }
  }
  return false
}

function playerHit2(){
  var obstacles2 = getAll(obstacle2)
  var p = getFirst(player)

  for (var i = 0; i<obstacles2.length; i++){
    var o = obstacles2 [i]
    if (o.x == p.x && o.y == p.y){
      return true
    }
  }
  return false
}

function playerHit3(){
  var obstacles3 = getAll(obstacle3)
  var p = getFirst(player)

  for (var i = 0; i<obstacles3.length; i++){
    var o = obstacles3 [i]
    if (o.x == p.x && o.y == p.y){
      return true
    }
  }
  return false
}

function playerHit4(){
  var obstacles4 = getAll(obstacle4)
  var p = getFirst(player)

  for (var i = 0; i<obstacles4.length; i++){
    var o = obstacles4 [i]
    if (o.x == p.x && o.y == p.y){
      return true
    }
  }
  return false
}

function playerHit5(){
  var obstacles5 = getAll(obstacle5)
  var p = getFirst(player)

  for (var i = 0; i<obstacles5.length; i++){
    var o = obstacles5 [i]
    if (o.x == p.x && o.y == p.y){
      return true
    }
  }
  return false
}

function playerHit6(){
  var obstacles6 = getAll(obstacle6)
  var p = getFirst(player)

  for (var i = 0; i<obstacles6.length; i++){
    var o = obstacles6 [i]
    if (o.x == p.x && o.y == p.y){
      return true
    }
  }
  return false
}

function playerHit7(){
  var obstacles7 = getAll(obstacle7)
  var p = getFirst(player)

  for (var i = 0; i<obstacles7.length; i++){
    var o = obstacles7 [i]
    if (o.x == p.x && o.y == p.y){
      return true
    }
  }
  return false
}
var cnt = 0
var cnt2 = 0
var cnt3 = 0
var cnt4 = 0
var cnt5 = 0
var cnt6 = 0
var cnt7 = 0
var gameLoop = setInterval(() => {
  
  var o1 = getFirst(obstacle1)
  o1.x += o1Path[cnt]
  cnt++
  if(cnt>18){cnt=0}

  var o2 = getFirst(obstacle2)
  o2.x += o2Path[cnt2]
  cnt2++
  if(cnt2>9){cnt2=0}

  var o3 = getFirst(obstacle3)
  o3.y += o3Path[cnt3]
  cnt3++
  if(cnt3>13){cnt3=0}

  var o4 = getFirst(obstacle4)
  o4.x += o4Path[cnt4]
  cnt4++
  if(cnt4>21){cnt4=0}
  
  var o5 = getFirst(obstacle5)
  o5.y += o5Path[cnt5]
  cnt5++
  if(cnt5>15){cnt5=0}

    var o6 = getFirst(obstacle6)
  o6.y += o6Path[cnt6]
  cnt6++
  if(cnt6>11){cnt6=0}

  var o7 = getFirst(obstacle7)
  o7.x += o7Path[cnt7]
  cnt7++
  if(cnt7>17){cnt7=0}
  
  if (playerWin() == true){
    clearInterval(gameLoop)

    addText("You Win!",{
      
    color: color`3`
    })
  }
  
  if (playerHit1() == true){
    clearInterval(gameLoop)

    addText("You Lose!",{
      
    color: color`3`
    })
  }
  
  if (playerHit2() == true){
    clearInterval(gameLoop)

    addText("You Lose!",{
      
    color: color`3`
    })
  }

    if (playerHit3() == true){
    clearInterval(gameLoop)

    addText("You Lose!",{
      
    color: color`3`
    })
  }

    if (playerHit4() == true){
    clearInterval(gameLoop)

    addText("You Lose!",{
      
    color: color`3`
    })
  }

    if (playerHit5() == true){
    clearInterval(gameLoop)

    addText("You Lose!",{
      
    color: color`3`
    })
  }

    if (playerHit6() == true){
    clearInterval(gameLoop)

    addText("You Lose!",{
      
    color: color`3`
    })
  }

    if (playerHit7() == true){
    clearInterval(gameLoop)

    addText("You Lose!",{
      
    color: color`3`
    })
  }


  
}, 150)




