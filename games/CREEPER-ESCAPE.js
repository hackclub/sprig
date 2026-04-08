
const player = "p"
const enemy = "e"
const coin = "c"
const goal = "g"
const wall = "w"

let level = 0
let lives = 3
let coins = 0

const levels = [

map`
wwwwwwwwww
wp..c....w
w........w
w....e...w
w....c...w
w........w
w.....g..w
wwwwwwwwww`,

map`
wwwwwwwwww
wp..c...gw
w........w
w..e.....w
w....c...w
w........w
w.c..e..cw
wwwwwwwwww`,

map`
wwwwwwwwww
wp..c.c.gw
w..e.....w
w......c.w
w.c..c...w
w..c.e...w
wc...c..cw
wwwwwwwwww`

]

setLegend(

[player, bitmap`
................
......33........
.....3333.......
....333333......
.....3333.......
......33........
.....3333.......
....3....3......
....3....3......
....333333......
.....3..3.......
.....3..3.......
................
................
................
................`],

[enemy, bitmap`
................
....444444......
...40044004.....
...400..004.....
...44.00.44.....
...44000044.....
....40..04......
...44....44.....
...44....44.....
...44....44.....
................
................
................
................
................
................`],

[coin, bitmap`
................
.....4444.......
....4....4......
....4....4......
.....4444.......
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
................`],

[goal, bitmap`
................
......7777......
.....7....7.....
....7......7....
....7......7....
....7......7....
....7......7....
.....7....7.....
......7777......
................
................
................
................
................
................
................`],

[wall, bitmap`
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
1111111111111111`]

)

setSolids([player, wall])

function startLevel(){
clearText()
setMap(levels[level])
coins = tilesWith(coin).length

addText("Lives:"+lives,{x:1,y:1,color:color`3`})
addText("Coins:"+coins,{x:1,y:2,color:color`3`})
}

startLevel()

onInput("w",()=>getFirst(player).y--)

onInput("s",()=>getFirst(player).y++)
onInput("a",()=>getFirst(player).x--)
onInput("d",()=>getFirst(player).x++)

afterInput(()=>{

let p = getFirst(player)


let collected = tilesWith(player,coin)

if(collected.length){
clearTile(p.x,p.y)
addSprite(p.x,p.y,player)
coins--
}


if(tilesWith(player,enemy).length){

lives--

if(lives<=0){
addText("GAME OVER",{y:5,color:color`3`})
}else{
startLevel()
}

}


if(tilesWith(player,goal).length && coins===0){

level++

if(level>=levels.length){
addText("YOU WIN!",{y:5,color:color`3`})
}else{
startLevel()
}

}

})


setInterval(()=>{

let p = getFirst(player)

getAll(enemy).forEach(e=>{

if(e.x < p.x) e.x++
else if(e.x > p.x) e.x--

if(e.y < p.y) e.y++
else if(e.y > p.y) e.y--


if(e.x == p.x && e.y == p.y){

lives--

if(lives <= 0){
addText("GAME OVER",{y:5,color:color`3`})
}else{
startLevel()
}

}

})

},3500)