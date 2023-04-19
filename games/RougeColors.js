/*
KingstimusPrime

The goal of the game is to defeat all of the enemies by walking into them with the same color.
*/

const player = "p"
const tile = "t"
const enemy = "e"
const clone = "s"
const eChanger = "a"

const rPlayer = "r"
const rEnemy = "m"
const rClone = "j"
const rChanger = "n"

const bPlayer = "b"
const bEnemy = "u"
const bClone = "d"
const bChanger = "l"

const gPlayer = "g"
const gEnemy = "v"
const gClone = "o"
const gChanger = "k"

const yPlayer = "y"
const yEnemy = "q"
const yClone = "x"
const yChanger = "z"




var pType = "p";
setLegend(
  [ player, bitmap`
.....0000000....
....000000000...
...00.......00..
...00.0000.000..
..00.000000.00..
..00.00..00.00..
..00.00..00.00..
..00.00..00.00..
..00.00..00.00..
..00.00..00.00..
..00.000000.00..
..00.00000.00...
..00..0000.00...
..000...........
...000000000....
....00000000....` ],
  [tile, bitmap`
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
  [enemy,bitmap`
0000000000000...
00000000000000..
00000000000000..
0000000000000...
000.............
000.............
0000000000000...
00000000000000..
00000000000000..
0000000000000...
000.............
000.............
0000000000000...
00000000000000..
00000000000000..
0000000000000...`],
  [ rPlayer, bitmap`
.....0000000....
....000000000...
...00.......00..
...00.3333.000..
..00.333333.00..
..00.33..33.00..
..00.33..33.00..
..00.33..33.00..
..00.33..33.00..
..00.33..33.00..
..00.333333.00..
..00.33333.00...
..00..3333.00...
..000...........
...000000000....
....00000000....` ],
  [clone, bitmap`
................
................
................
................
......0000......
.....000000.....
....00.....0....
....00.....0....
....00000000....
....00..........
....00..........
....00000000....
.....0000000....
................
................
................`],
  [rEnemy,bitmap`
0003333333333...
00033333333330..
00033333333330..
000CCCCCCCCCC...
000.............
000.............
0003333333333...
00033333333330..
00033333333330..
000CCCCCCCCCC...
000.............
000.............
0003333333333...
00033333333330..
00033333333330..
000CCCCCCCCCC...`],
  [rClone, bitmap`
................
................
................
................
......CCCC......
.....CCCCCC.....
....CC.....C....
....CC.....C....
....CCCCCCCC....
....CC..........
....CC..........
....CCCCCCCC....
.....CCCCCCC....
................
................
................`],
  [ bPlayer, bitmap`
.....0000000....
....000000000...
...00.......00..
...00.7777.000..
..00.777777.00..
..00.77..77.00..
..00.77..77.00..
..00.77..77.00..
..00.77..77.00..
..00.77..77.00..
..00.777777.00..
..00.77777.00...
..00..7777.00...
..000...........
...000000000....
....00000000....` ],
    [bClone, bitmap`
................
................
................
................
......5555......
.....555555.....
....55.....5....
....55.....5....
....55555555....
....55..........
....55..........
....55555555....
.....5555555....
................
................
................`],
  [bEnemy,bitmap`
0007777777777...
00077777777770..
00077777777770..
0005555555555...
000.............
000.............
0007777777777...
00077777777770..
00077777777770..
0005555555555...
000.............
000.............
0007777777777...
00077777777770..
00077777777770..
0005555555555...`],
  
  [ gPlayer, bitmap`
.....0000000....
....000000000...
...00.......00..
...00.4444.000..
..00.444444.00..
..00.44..44.00..
..00.44..44.00..
..00.44..44.00..
..00.44..44.00..
..00.44..44.00..
..00.444444.00..
..00.44444.00...
..00..4444.00...
..000...........
...000000000....
....00000000....` ],
  [gClone, bitmap`
................
................
................
................
......DDDD......
.....DDDDDD.....
....DD.....D....
....DD.....D....
....DDDDDDDD....
....DD..........
....DD..........
....DDDDDDDD....
.....DDDDDDD....
................
................
................`],
  [gEnemy,bitmap`
0004444444444...
00044444444440..
00044444444440..
000DDDDDDDDDD...
000.............
000.............
0004444444444...
00044444444440..
00044444444440..
000DDDDDDDDDD...
000.............
000.............
0004444444444...
00044444444440..
00044444444440..
000DDDDDDDDDD...`],
  [ yPlayer, bitmap`
.....0000000....
....000000000...
...00.......00..
...00.6666.000..
..00.666666.00..
..00.66..66.00..
..00.66..66.00..
..00.66..66.00..
..00.66..66.00..
..00.66..66.00..
..00.666666.00..
..00.66666.00...
..00..6666.00...
..000...........
...000000000....
....00000000....` ],
    [yClone, bitmap`
................
................
................
................
......FFFF......
.....FFFFFF.....
....FF.....F....
....FF.....F....
....FFFFFFFF....
....FF..........
....FF..........
....FFFFFFFF....
.....FFFFFFF....
................
................
................`],
  [yEnemy,bitmap`
0006666666666...
00066666666660..
00066666666660..
000FFFFFFFFFF...
000.............
000.............
0006666666666...
00066666666660..
00066666666660..
000FFFFFFFFFF...
000.............
000.............
0006666666666...
00066666666660..
00066666666660..
000FFFFFFFFFF...`],
  [eChanger, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [rChanger, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1CCCCCCCCCCCC1L
L1C333333333331L
L1C333333333331L
L1C333333333331L
L1C333333333331L
L1C333333333331L
L1C333333333331L
L1C333333333331L
L1C333333333331L
L1C333333333331L
L1C333333333331L
L1C333333333331L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [bChanger, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L17777777777771L
L17555555555551L
L17555555555551L
L17555555555551L
L17555555555551L
L17555555555551L
L17555555555551L
L17555555555551L
L17555555555551L
L17555555555551L
L17555555555551L
L17555555555551L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [yChanger, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1FFFFFFFFFFFF1L
L1F666666666661L
L1F666666666661L
L1F666666666661L
L1F666666666661L
L1F666666666661L
L1F666666666661L
L1F666666666661L
L1F666666666661L
L1F666666666661L
L1F666666666661L
L1F666666666661L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [gChanger, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L14444444444441L
L14DDDDDDDDDDD1L
L14DDDDDDDDDDD1L
L14DDDDDDDDDDD1L
L14DDDDDDDDDDD1L
L14DDDDDDDDDDD1L
L14DDDDDDDDDDD1L
L14DDDDDDDDDDD1L
L14DDDDDDDDDDD1L
L14DDDDDDDDDDD1L
L14DDDDDDDDDDD1L
L14DDDDDDDDDDD1L
L11111111111111L
LLLLLLLLLLLLLLLL`],
)

setSolids([ player, tile ,  rPlayer, gPlayer, bPlayer, yPlayer] )

let level = 9
const levels = [
  map`
ttttttttttttttttttttttttt
tllllllllll...nnnnnnnnntt
tllllllllll...nnnnnnnnntt
tllllllllll...nnnnnnnnntt
tllllllllll...nnnnnnnnntt
tllllllllll...nnnnnnnnntt
tllllllllll...nnnnnnnnntt
tllllllllll.p.nnnnnnnnntt
tllllllllll...nnnnnnnnntt
tllllllllll...nnnnnnnnntt
tllllllllll...nnnnnnnnntt
tllllllllll...nnnnnnnnntt
tllllllllll...nnnnnnnnntt
tllllllllll...nnnnnnnnntt
tllllllllll...nnnnnnnnntt
ttttttttttttttttttttttttt`,
  map `
ttttttttttttttttttttttttt
tlllllllllltl.........ntt
tllllllllllll..........tt
tllllp.................tt
tllllllllllll.........mtt
tlllllllllltl..........tt
ttttttttttttttttttttttttt`,
 map `
tttttttttttttttttttttttttttttt
tn.........................ult
tv...........................t
t...........zzzz......zz.....t
t...zz......zzz.....zzzzz....t
tzzzzz...........zz.zzzzzz...t
tzzzzz.......p...zz.zzzzzzz..t
tzzzzz...........zz.zzzzzzz..t
t...................zzzzzzz..t
t..........zz................t
tm........zzzzzzz............t
tk........zzzzzzz............t
tttttttttttttttttttttttttttttt`,
   map `
tttttttttttttttttttttttttttttt
tzm........................qzt
tmm........................qqt
t............................t
t............l...............t
t............................t
t..........n.p.z.............t
t............................t
t............k...............t
t............................t
tvv........................uut
tzv........................uzt
tttttttttttttttttttttttttttttt`,
  map`
.........................
ttttttttttttttttttttttttt
tnnnnnnnnnnqmzzzzzzzzzzzt
tnnnnnnnnnn..zzzzzzzzzzzt
tnnnnnnnnnn..zzzzzzzzzzzt
tnnnnnnnnnn..zzzzzzzzzzzt
tnnnnnnnnnn..zzzzzzzzzzzt
tnnnnnnnnnn..zzzzzzzzzzzt
tu..........p..........vt
tm.....................qt
tllllllllll..kkkkkkkkkkkt
tllllllllll..kkkkkkkkkkkt
tllllllllll..kkkkkkkkkkkt
tllllllllll..kkkkkkkkkkkt
tllllllllll..kkkkkkkkkkkt
tllllllllllvukkkkkkkkkkkt
ttttttttttttttttttttttttt`,
    map`
ttttttttttttttttttt
tp.n.........n.n.st
ttttttttttttttttttt`,
      map`
ttttttttttttttttttt
td...............dt
t.................t
t.................t
t..nn...nn........t
t..nn.............t
t.................t
tpl......d.....d..t
ttttttttttttttttttt`,
      map`
ttttttttttttttttttt
td.....lpz.......jt
t.......n.........t
t.................t
t.......k.........t
t.................t
t.................t
to...............xt
ttttttttttttttttttt`,
      map`
ttttttttttttttttttt
t.n.........kkkkllt
tsn.........kkkkllt
t.................t
t........p........t
t.................t
tsn.........kkkkllt
t...........kkkkllt
ttttttttttttttttttt`,
        map`
ttttttttttttttttttt
tzz...ulllllu...zzt
tzz....lllll....zzt
tq...............qt
tnn.............nnt
tnn..m........m.nnt
tnn.............nnt
tnn.............nnt
tnn......p......nnt
tq...............qt
tzz....llllll...zzt
tzz...ullllllu..zzt
ttttttttttttttttttt`,
          map`
......................................
.nnnnn.l..l..kkkk..z....z..n.n...ll...
...n...l..l..k..k..zz...z..n.n..l.....
...n...llll.kk..kk.z.z..z..nn...ll....
...n...l..l.kkkkkk.z..z.z..n.nn...l...
...n...l..l.k....k.z...zz..n..n...l...
...n...l..l.k....k.z....z..n..n.lll...
......................................
.........pnn..lll..zzz................
..........n...l.l..z.z................
..........nn..l.l..zz.................
..........n...lll..z.z................
............................kkk.......
..nnn.z...kk..l.l.nnn.zzz..k..........
..n.n.z..k..k.lll..n..z..z.k.kk.......
..nnn.z..kkkk..l...n..z..z.k...k......
..n...zz.k..k..l..nnn.z..z..kkkk......`,
]



setMap(levels[level])
if(level == 0){
  addSprite(4, 3, rEnemy)
addSprite(4, 6, rEnemy)
addSprite(4, 9, rEnemy)
addSprite(15, 6, bEnemy)
addSprite(15, 3, bEnemy)
addSprite(15, 9, bEnemy)
}


setPushables({
  [ player ]: []
})

onInput("s", () => {
    getFirst(pType).y += 1
  updateEnemies()

})

onInput("w", () => {
  getFirst(pType).y -= 1
  updateEnemies()
})

onInput("a", () => {
  getFirst(pType).x -= 1
    updateEnemies()
})


onInput("d", () => {

  getFirst(pType).x += 1
  updateEnemies()
})

afterInput(() => {
  if(tilesWith(rChanger, pType).length > 0 && pType != "r"){
     getTile(getFirst(pType).x , getFirst(pType).y)[1].type = eChanger
     getFirst(pType).type = "r"
     pType = "r"
  }else if(tilesWith(bChanger, pType).length > 0 && pType != "b"){
    
     getTile(getFirst(pType).x , getFirst(pType).y)[1].type = eChanger
     getFirst(pType).type = "b"
     pType = "b"
  }else if(tilesWith(gChanger, pType).length > 0 && pType != "g"){
    
     getTile(getFirst(pType).x , getFirst(pType).y)[1].type = eChanger
     getFirst(pType).type = "g"
     pType = "g"
  }else if(tilesWith(yChanger, pType).length > 0 && pType != "y"){
    
     getTile(getFirst(pType).x , getFirst(pType).y)[1].type = eChanger
     getFirst(pType).type = "y"
     pType = "y"
  }
  
})


function  updateEnemies(){
  var enemies = getAll(enemy)
  enemies = enemies.concat(getAll(rEnemy))
  enemies = enemies.concat(getAll(bEnemy))
  enemies = enemies.concat(getAll(gEnemy))
  enemies = enemies.concat(getAll(yEnemy))
  enemies = enemies.concat(getAll(rClone))
  enemies = enemies.concat(getAll(bClone))
  enemies = enemies.concat(getAll(gClone))
  enemies = enemies.concat(getAll(yClone))
    enemies = enemies.concat(getAll(clone))
  let playerRef = getFirst(pType)
  for(let i = 0; i < enemies.length ; i += 1){
    let currE = enemies[i]
    let up = Math.random() > 0.5
    if(!up){
        if(playerRef.x < currE.x){
          currE.x -= 1;
        }else if(playerRef.x > currE.x){
                currE.x += 1;
        }
    }else{
          if(playerRef.y < currE.y){
              currE.y -= 1;
          }else if(playerRef.y > currE.y){
              currE.y += 1;
          }
    }
    if( ["o", "x", "d", "j", "s" ].includes(currE.type)  ){
      if(tilesWith(rChanger, currE.type).length > 0 && currE.type != "r"){
         getTile(getFirst(currE.type).x , getFirst(currE.type).y)[1].type = eChanger
         getFirst(currE.type).type = rClone
      }else if(tilesWith(bChanger, currE.type).length > 0 && currE.type != "b"){
        
         getTile(getFirst(currE.type).x , getFirst(currE.type).y)[1].type = eChanger
         getFirst(currE.type).type = bClone
      }else if(tilesWith(gChanger, currE.type).length > 0 && currE.type != "g"){
        
         getTile(getFirst(currE.type).x , getFirst(currE.type).y)[1].type = eChanger
         getFirst(currE.type).type = gClone
      }else if(tilesWith(yChanger, currE.type).length > 0 && currE.type != "y"){
        
         getTile(getFirst(currE.type).x , getFirst(currE.type).y)[1].type = eChanger
         getFirst(currE.type).type = yClone
      }
    }

    
    if(currE.x == playerRef.x && currE.y == playerRef.y){
      if(currE.type == "m" && pType == "r" || currE.type == "j" && pType == "r"){
          currE.remove()
          if(enemies.length - 1 <= 0){
                addText("Victory!", { 
                x: 6,
                y: 4,
                color: color`0`
              })
          }
      }else if(currE.type == "u" && pType == "b" || currE.type == "d" && pType == "b"){
          currE.remove()
          if(enemies.length - 1 <= 0){
                addText("Victory!", { 
                x: 6,
                y: 4,
                color: color`0`
              })
          }
      }else if(currE.type == "v" && pType == "g" || currE.type == "o" && pType == "g"){
          currE.remove()
          if(enemies.length - 1 <= 0){
                addText("Victory!", { 
                x: 6,
                y: 4,
                color: color`0`
              })
          }
      }else if(currE.type == "q" && pType == "y" || currE.type == "x" && pType == "y"){
          currE.remove()
          if(enemies.length - 1 <= 0){
                addText("Victory!", { 
                x: 6,
                y: 4,
                color: color`0`
              })
          }
      }else{
        setMap(levels[level])
        if(level == 0){
          addSprite(4, 3, rEnemy)
          addSprite(4, 6, rEnemy)
          addSprite(4, 9, rEnemy)
          addSprite(15, 6, bEnemy)
          addSprite(15, 3, bEnemy)
          addSprite(15, 9, bEnemy)
        }

        pType = "p"
        playerRef.remove();
      }
    }
  }

  if(enemies.length == 0){
    clearText()
    level += 1;
    pType = "p"
    setMap(levels[level])
    
  }
}
