/*
@title: Space Invasion
@author: Agent-Shu
@tags: ['endless']
@addedOn: 2022-10-18
*/

/*
Fight the approaching endless hoard of enemy Space Crafts

Controls -  A/D to move left and right ||  W to shoot ||  I to start
Holding down W without moving sparys down shower of bullets

Caution - Spawn killing enemy leads to error
*/

const bg = "b";
const border = "p";

const ship = "s";
const laser = "l";
const blast = "/";

const heart = "h";
let lives = 3;

const shield = "-";
const sbatt = "*";
let sbattery = 3;

const eship = "e";
const elaser = "r";

let col1 = 255, col2 = 255, col3 = 255, sleep1 = 120, sleep2 =600

let start_check = 0, score = 0

let bullet = 0, enemy = 0

let y_laser = 0, eship_move = 0, collision_check = 0, game =0, hud =0

setLegend(
  [bg, bitmap`
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
  [border, bitmap`
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
................`],
  [heart, bitmap`
................
................
...00.00........
..0330330.......
.032333330......
.033333330......
.033333330......
.033333330......
..0333330.......
...03330........
....030.........
.....0..........
................
................
................
................`],
  [sbatt, bitmap`
................
................
...LLL..........
..44144.........
..41114.........
..44144.........
..33333.........
..55555.........
..55555.........
..55555.........
..51115.........
..55555.........
................
................
................
................`],
  
  [ship, bitmap`
.......LL.......
......L11L......
......L11L......
.....L1111L.....
.1...L1111L...1.
.1..L111111L..1.
.1..L117711L..1.
.LLL11732711LLL.
L1.L11733711L.1L
L1.L11753711L.1L
L1LL11177111LL1L
.LLL11111111LLL.
.L1111LLLL1111L.
.L11LL3633LL11L.
L1LL.1696C1.LL1L
LL....16C1....LL`],
  [shield, bitmap`
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
....77777777....
..777....25777..
7772.........777
7.5..........2.7
.2............5.`],
  [laser,bitmap`
..............6.
.6............6.
.6............6.
.6............6.
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
................`],
 
  [eship,bitmap`
....00333300....
...0L335733L0...
.00333555533300.
0133335555333310
L30333555533303L
L31033355333013L
L31.03325333013L
LLL.03L33L30.LLL
.3.LLL3333LLL.3.
....3.0330.3....
....3.0330.3....
....3..00..3....
....3..00..3....
................
................
................`],
  [elaser, bitmap`
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
.............3..
..3..........3..
..3..........3..
..3..........3..
..3.............
..3.............`],

  [blast,bitmap`
66..............
6366.....66.....
633066...666....
636336606036....
63663L6060366...
.6001330333L66..
.6303LL663LL36..
.66001303L666...
..630L00166.....
...6366L136.....
...63L03L336....
..66LL31LL306...
.66LL3666LL306..
663L606.6666666.
66666...........
66..............`],
)

const space=[
  map`
.................
.................
.................
.................
.................
.................
.................
.................
.................
.................
.................
.................
.................
.................
.................
.................
.................`
]

const start = tune`
250: f5^250 + f4^250,
250: d4^250 + g5^250,
250: e4^250 + a5^250,
250: f4^250,
250: d4^250 + f5^250,
250: e4^250 + g5^250,
250: f4^250 + a5^250,
250: d4^250,
250: e4^250 + d5^250,
250: f4^250 + e5^250,
250: d4^250 + f5^250,
250: e4^250,
250: f4^250,
250: d4^250 + e5^250,
250: e4^250 + f5^250,
250: f4^250 + g5^250,
250: d4^250,
250: e4^250,
250: f4^250 + g5^250,
250: e4^250 + a5^250,
250: f4^250 + b5^250,
250: g4^250,
250: e4^250,
250: f4^250,
250: g4^250,
250: g5^250,
250: f4^250 + a5^250,
250: g4^250 + b5^250,
250: a4^250,
250: f4^250,
250: g4^250 + a5^250,
250: a4^250 + b5^250`
const boom = tune`
161.29032258064515,
161.29032258064515: c4/161.29032258064515 + d4~161.29032258064515 + e4^161.29032258064515,
4838.709677419354`
const death= tune`
1200,
150: e5-150 + d5-150,
150: e5^150 + d5-150,
150: d5-150 + e5^150 + c5/150,
150: c5-150 + d5-150 + b4^150,
150: c5-150 + b4-150 + a4^150 + d5/150,
150: b4-150 + a4^150,
150: a4-150 + g4^150 + b4-150,
150: g4-150 + f4^150 + e4^150 + a4-150,
150: e4^150 + d4^150 + c4^150 + g4-150 + f4-150,
150: f4-150 + e4-150 + d4~150 + c4/150,
150: e4-150 + d4-150 + c4-150,
150: c4-150,
1800`

setMap(space[0])
setBackground(bg)

const clear_screen = () =>{
  if(start_check == 0){
    let x = 0
    clearInterval(start_screen)
    addSprite(8, 15, ship)
    
    clearText()
    start_check = 1
  }
}

const update = () =>{
  const HUD_update = () =>{
    clearText()
    addText("Score:"+`${score}`,{ 
      x: 2, 
      y: 0, 
      color: color`2` 
    })
    addText("HP:",{ 
      x: 12, 
      y: 0, 
      color: color`2` 
    })
/*    addText("Pow:",{ 
      x: 11, 
      y: 1, 
      color: color`2` 
    })
*/  
    if(lives == 3){
      clearTile(14,0)
      clearTile(15,0)
      clearTile(16,0)
      addSprite(14,0,heart)
      addSprite(15,0,heart)
      addSprite(16,0,heart)
    }
    else if(lives == 2){
      clearTile(14,0)
      clearTile(15,0)
      clearTile(16,0)
      addSprite(14,0,heart)
      addSprite(15,0,heart)
      addSprite(16,0,border)
    }
    else if(lives == 1){
      clearTile(14,0)
      clearTile(15,0)
      clearTile(16,0)
      addSprite(14,0,heart)
      addSprite(15,0,border)
      addSprite(16,0,border)
    }
    else if(lives == 0){
      clearTile(14,0)
      clearTile(15,0)
      clearTile(16,0)
      addSprite(14,0,border)
      addSprite(15,0,border)
      addSprite(16,0,border)
    }
/*
    if(sbattery == 3){
      clearTile(14,1)
      clearTile(15,1)
      clearTile(16,1)
      addSprite(14,1,sbatt)
      addSprite(15,1,sbatt)
      addSprite(16,1,sbatt)
    }
    else if(sbattery == 2){
      clearTile(14,1)
      clearTile(15,1)
      clearTile(16,1)
      addSprite(14,1,sbatt)
      addSprite(15,1,sbatt)
      addSprite(16,1,border)
    }
    else if(sbattery == 1){
      clearTile(14,1)
      clearTile(15,1)
      clearTile(16,1)
      addSprite(14,1,sbatt)
      addSprite(15,1,border)
      addSprite(16,1,border)
    }
    else if(sbattery == 0){
      clearTile(14,1)
      clearTile(15,1)
      clearTile(16,1)
      addSprite(14,1,border)
      addSprite(15,1,border)
      addSprite(16,1,border)
    }
*/
  }
  hud = setInterval(HUD_update,250)
}

function removeSprite(x, y, spriteType){
  var sprite = getTile(x, y)
  sprite[sprite.map(x => x.type).indexOf(spriteType)].remove()
}

const move_ship = (dir) => {
  if(dir == 'a'){
    getFirst(ship).x -= 1 
  }
  else if(dir == 'd'){
    getFirst(ship).x += 1
  }
}

onInput("a", () => {
  if(start_check == 1){
    move_ship('a')
  }
})
  
onInput("d", () => {
  if(start_check == 1){
    move_ship('d')
  }
})
  
onInput("w", () => {
  if(start_check == 1){
    if(bullet == 0){
      bullet = 1
      addSprite(getFirst(ship).x, getFirst(ship).y, laser)

      const bullet_travel = () =>{
        if(getFirst(laser).y >= 3){
          getFirst(laser).y -=1
        }

        if(getFirst(laser).y < 3){
          removeSprite(getFirst(laser).x,  getFirst(laser).y, laser)
          bullet = 0
          clearInterval(y_laser)
        }
      }
      y_laser = setInterval(bullet_travel, 30) 
    } 
  } 
})

//onInput("s", () => {
//  if(start_check == 1){
//    sbattery -= 1
//  }
//})
  
const move_eship = () =>{
  if(enemy == 0){
    enemy = 1
    addSprite(Math.floor(Math.random() * 17), 2, eship) 
  }

  if(getFirst(eship).y<=13){
    let turn = Math.floor(Math.random() * 2)
            
    if(getFirst(eship).x >= 1){                      //Not on edge check
        if(getFirst(eship).x <= 15){
          if(turn == 0){ getFirst(eship).x -=1 }
          else { getFirst(eship).x +=1 }    
          }
        else{ getFirst(eship).x -=1 }               //Bound Check        
              
      }
      else{ getFirst(eship).x +=1 }                 //Bound Check
          
      getFirst(eship).y += 1                        //Move Down
  }
  else{
    clearTile(getFirst(eship).x, getFirst(eship).y)
    lives -=1
    enemy =0 
  }    
}

const collision = () =>{
  if(getAll(eship).length != 0){
    if(getAll(laser).length != 0){
        
    if(getAll(eship)[0].x == getAll(laser)[0].x){
      if(getAll(eship)[0].y == getAll(laser)[0].y){

        score += 1
        // console.log("boom")
        playTune(boom)

        clearInterval(y_laser)
        clearInterval(eship_move)

        let x = getAll(eship)[0].x
        let y = getAll(eship)[0].y

        clearTile(x, y)
        
        addSprite(x, y, blast)

        setTimeout(function(){clearTile(x, y)}, 500);

        bullet = 0
        enemy = 0
        sleep2 -= 2
        
        eship_move = setInterval(move_eship, sleep2)
        
      }
    }  
    }
  }   
}

const winlose = () =>{
  if(lives == 0){
    clearInterval(hud)
    clearInterval(y_laser)
    clearInterval(update)
    clearInterval(eship_move)
    clearInterval(collision_check)

    removeSprite(getFirst(ship).x, getFirst(ship).y, ship)
    start_music.end()

    start_check = 2
    clearText()
    clearTile(14,0)
    clearTile(14,1)
    clearTile(15,1)
    clearTile(16,1)
    
    addText("You Lose", {x: 6,y: 6,color: color`2`})
    addText("Score:"+`${score}`,{x: 6,y: 8,color: color`2`})

    playTune(death)
    clearInterval(game)
  } 
}

onInput("i", () => {
  if(start_check == 0){
    clear_screen()
    
    update()
    eship_move = setInterval(move_eship, sleep2)
    collision_check = setInterval(collision, 30)
    
    game = setInterval(winlose, 30)
  }
})

const start_music = playTune(start, Infinity)

const intro_screen = () => {
  sleep1 = Math.floor(Math.random() * 500)+80
  
  clearText()

  const colors = [ color`3`, color`C`, color`7`, color`5`, color`6`, color`F`, color`4`, color`D`, color`8`, color`H`, color`9` ]
  addText("Space Invasion", { 
    x: 3,
    y: 1, 
    color: colors[Math.floor(Math.random() * colors.length)]
  })

  //addText("\n\n\n    Press A,D to\n\n        move  \n\n     W to Shoot\n\n     S to Shield   \n\n\n     I to Begin", { 
  addText("\n\n\n    Press A,D to\n\n        move  \n\n     W to Shoot\n\n  \n\n     I to Begin", {  
    x: 0, 
    y: 2, 
    color: color`2` 
  })
}

let start_screen = setInterval(intro_screen, sleep1)