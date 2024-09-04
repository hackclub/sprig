/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Evil space kittens
@author: Dragos Gabriel Matu
@tags: []
@addedOn: 2024-09-03
*/

//PLAYER
const player = "p"

//ENEMIES
const kitty = "k"
const cat = "c"
const tomcat = "t"

//BOSS
const bosscat1 = "1"
const bosscat2 = "2"
const bosscat3 = "3"
const bosscat4 = "4"
const bosscat5 = "5"
const bosscat6 = "6"
const paw = "7"


//BACKGROUND
const starsbackground ="a"

//PROJECTILES
const hairball = "h"
//fireball and firetrail are a combination for the level 3 tomcats and is basicaly a super hairball that spreds to the adjecent collumns
const fireball = "f"
const firetrail = "r"
//player projectile
const missile = "m";
//MeowField is basically a shield that the level 2 white cats use to protect themselves and the neighbouring cats from the player missiles
const meowField = "M"
  
setLegend(
  [ player, bitmap`
................
................
................
.......00.......
......0550......
.....005500.....
.....055550.....
....00566500....
...0505665050...
...0505665050...
...0005555000...
.....000000.....
......9969......
.....966699.....
......9996......
................` ],
  
  [kitty, bitmap`
................
.....222222.....
....2......2....
...2.1...1..2...
...2.11.11..2...
...2.11111..2...
...2.15151..2...
...2.11111..2...
....22222222..1.
.....11111....1.
.....122211..1..
.....122211111..
.....12221111...
.....1222111....
................
................`],
  [cat, bitmap`
................
.....222222.....
....2......2....
...2.2....2.2...
...2.22..22.2...
...2.222222.2...
...2.202022.2...
...2.222222.2...
....22222222....
.....222222.....
......33333...2.
......22622...2.
......22222...2.
.....2222222.22.
.....222222222..
................`],
  [tomcat, bitmap`
.....222222.....
....2......2....
...2.L....L.2...
..2..LL..LL..2..
..2..LLLLLL..2..
..2..L5L5LL..2..
..2.00LLLL00.2..
..2..LL3LLL..2..
...2.LLLLLL.2...
....22222222..LL
.....LLLLLL..L.L
.....LL11LLL...L
....LL1111LL...L
....LL1111LLL.LL
....LL1111LLLLL.
....LL1111LLLLL.`],

  [bosscat1, bitmap`
.......999999009
.......999999900
.......999999999
........99999999
........99999999
.........9999999
0000.....9999992
...00000.9999922
.000....00000022
...00000.0999922
......0.00000002
..00000000..9999
..............99
................
................
................`],
  [bosscat2, bitmap`
................
.......999......
......99999.....
....00999999....
......0033999...
......99339999..
.....000333999..
....0.993339999.
......9933339999
......9099339999
.....00999999999
.......999999999
........99999099
........99999099
........99999099
........99999909`],
  [bosscat3, bitmap`
9099999999999009
0999999999999900
9999999999999999
9999999999999999
9999999999999999
9999922222229999
2222220333022222
2222222030222222
2222222202222222
2222022202220222
2222200020002222
9992222222222999
9999999999999999
..999999999999..
................
................`],
  [bosscat4, bitmap`
9009999999......
0999999999......
9999999999......
9999999999......
9999999999......
999999999.......
29999999....0000
2299999900000...
222999000...000.
2229000.00000...
22999000.0......
999009....000...
99999...........
................
................
................`],
  [bosscat5, bitmap`
................
.......999......
......99999.0...
.....9999000....
.....9933999....
....99933999....
...9993330090...
...993333990....
..99933339990...
.99993390999....
999999999000....
99999999999.0...
99999999999.....
99099999999.....
9909999999......
9009999999......`],
  [bosscat6, bitmap`
................
................
................
................
................
................
................
................
9...............
999..........999
9999999999999999
9999999999999999
9999999999999999
9909999999990999
9909999999990999
9909999999990999`],
  [paw, bitmap`
................
................
................
......92.92.....
...99.33.33.92..
...33.33233.332.
...932232232232.
...922222222222.
...922233322229.
...923333333229.
...22333333329..
...99222222299..
....922222229...
......29999.....
................
................`],
  
  [starsbackground, bitmap`
0000000000000000
0000L00000100000
0000000000000000
0000000200000000
0100000000000000
0000000000000L00
0000000000000000
0002000000000000
0000000001000000
0000000000000000
0000002000000200
0000000000000000
0010000000000000
0000000000010000
00000L0000000000
0000000000000000`],
  
  [fireball, bitmap`
................
................
................
...9....6.9..9..
.9.3.6.9...39...
..9.3636993.....
...696366636....
..3663963639.3..
...9663966993...
..6363693969....
...966333336....
....3336333.....
.....39333......
................
................
................`],
  [firetrail, bitmap`
................
................
................
.......6.6......
.....6..6.......
......96.93.....
.......963......
......399.9.....
......63.3......
.......33.......
................
................
................
................
................
................`],
  [hairball, bitmap`
................
................
.......CC1..1...
.....CC111C11...
....C1C11C11C...
..C111CCCCC11...
...CCCC111CC11..
...C1CC1CC11CC..
...CC11CCC1CCC..
....CCC1C1CC111.
...11CCCCCC1CC1.
....CC1CC1C1....
.....11C1C.1....
........1.......
................
................`],
  [missile, bitmap`
................
................
................
.......00.......
......0330......
......0330......
......0330......
......0330......
.......00.......
.......96.......
......66.9......
.......69.......
........6.......
.......9........
................
................`],
  [meowField, bitmap`
................
................
....F......F....
....4DD..DD4....
.....4FDDF4.....
..F....44....F..
..4DDD....DDD4..
...44FDDDDF44...
.F...444444...F.
.4DF...44...FD4.
..4DDF....FDD4..
...44DDDDDD44...
.....444444.....
................
................
................`],
)
setBackground(starsbackground)

setSolids([ player ])

const levels = [
  map`
.........
.k.k.k.k.
.........
.........
.........
.........
.........
.........
.........
....p....
.........`,
  map`
.........
.kckkkck.
.........
.........
.........
.........
.........
.........
.........
....p....
.........`,
  map`
.........
.tc...ct.
....k....
...tct...
.........
.........
.........
.........
.........
....p....
.........`,
  map`
.........
.........
...265...
..71347..
.........
.........
.........
.........
.........
....p....
.........`,
]

setMap(levels[0]);

let level = 0;
let boolean = false;
//Count of enemies killed so that I don't have to chek every time for how many enemies are left on the map
let count = 0;

function shootMissile() {
  let x = getFirst(player).x;
  let y = 9;
  addSprite(x, y, missile);
}

function moveMissile() {
  let missiles = getAll(missile);
  for( let i = 0 ; i < missiles.length ; i++)
    missiles[i].y -= 1;
}

//Level 1 kitten projectile functions
function shootHairball() {
  let kittens = getAll(kitty);
  for( let i = 0 ; i < kittens.length ; i++ ) {
    addSprite(kittens[i].x , kittens[i].y , hairball )
  }
}

function moveHairball(){
  let hairballs = getAll(hairball);
  for( let i = 0 ; i < hairballs.length ; i++ ){
    hairballs[i].y += 1;
  }
}

//Level 2 cat projectile functions
function enableMeowField(){
  let cats = getAll(cat)

  for( let i = 0 ; i < cats.length ; i++ ){
    if(cats[i].y < 7){
      addSprite(cats[i].x, cats[i].y + 1, meowField)
      addSprite(cats[i].x + 1, cats[i].y + 1, meowField)
      addSprite(cats[i].x - 1, cats[i].y + 1, meowField)
      if(cats[i].y < 6)
      addSprite(cats[i].x, cats[i].y + 2, meowField)
    }
  }
}

function moveMeowField(){
  let fields = getAll(meowField)

  for(let i = 0 ; i < fields.length ; i++ )
    fields[i].y += 1
}

//Level 3 tomcat projectile functions
function shootFireball(){
  let tomcats = getAll(tomcat);
  for( let i = 0 ; i < tomcats.length ; i++ ) {
    addSprite(tomcats[i].x , tomcats[i].y , fireball )
  }
}

function moveFireball(){
  let fireballs = getAll(fireball);
    for( let i = 0 ; i < fireballs.length ; i++ ){
      fireballs[i].y += 1;
      if(fireballs[i].y == 6){
        clearTile(fireballs[i].x, fireballs[i].y)
        addSprite(fireballs[i].x, fireballs[i].y, firetrail)
        addSprite(fireballs[i].x+1, fireballs[i].y, firetrail)
        addSprite(fireballs[i].x-1, fireballs[i].y, firetrail)
      }
    }  
}
  
function moveFiretrail(){
 let trails = getAll(firetrail)
 for( let i = 0 ; i < trails.length ; i++ ){
  trails[i].y += 1
 }
}

//function for the "removal" of enemies
function removeKittens() {
  let missiles = getAll(missile)
  for(let i = 0 ; i < missiles.length; i++ ) {
    let kittens = getAll(kitty);
    for( let j = 0 ; j < kittens.length; j++ ){
      if( missiles[i].x == kittens[j].x && missiles[i].y == kittens[j].y ){
        clearTile(kittens[j].x,kittens[j].y)
        count++;
      }
    }
    if(level == 1 || level == 2){
      let cats = getAll(cat)
      for (let j = 0 ; j < cats.length ; j++ ){
        if( missiles[i].x == cats[j].x && missiles[i].y == cats[j].y ){
        clearTile(cats[j].x,cats[j].y)
        count++;
        }
      }
    }
    if(level == 2){
      let tomcats = getAll(tomcat)
      for (let j = 0 ; j < tomcats.length ; j++ ){
        if( missiles[i].x == tomcats[j].x && missiles[i].y == tomcats[j].y ){
        clearTile(tomcats[j].x,tomcats[j].y)
        count++;
        }
      }
    }
  }
}

//Unit advancement through the map
function moveKittens() {
  let kittens = getAll(kitty);
  for( let i = 0 ; i < kittens.length; i++ ){
    kittens[i].y += 1;
  }
  if(level == 1 || level == 2 ){ 
    let cats = getAll(cat)
    for( let i = 0 ; i < cats.length ; i++ ){
      cats[i].y += 1;
    }
  }
}

function removePlayer(){
  let hairballs = getAll(hairball);
  for( let i = 0 ; i < hairballs.length ; i++ ){
    if(hairballs[i].x == getFirst(player).x && hairballs[i].y == getFirst(player).y ){
      addText("Couldnt handle ", {x: 1,
      y: 3,
      color: color`8`
      })
      addText("the fluff", {x: 1,
      y: 4,
      color: color`8`
      })
      addText("so here is " , {x: 1,
      y: 5,
      color: color`8`
      })
      addText("a hairball!" , {x: 1,
      y: 6,
      color: color`8`
      })
      addText("Press s to restart", {x: 1,
      y: 8,
      color: color`8`
      })
      level = 0;
      setMap(levels[0]);
      boolean = false
      count = 0;
    }
  }
  let trails = getAll(firetrail)
  for( let i = 0 ; i < trails.length ; i++ ){
    if(trails[i].x == getFirst(player).x && trails[i].y == getFirst(player).y ){
      addText("Too hot to handle", {x: 1,
      y: 3,
      color: color`8`
      })
      addText("Press s to restart", {x: 1,
      y: 6,
      color: color`8`
      })
      level = 0;
      setMap(levels[0]);
      boolean = false
      count = 0;

    }
  }
  
  let kittens = getAll(kitty);
  for( let i = 0 ; i < kittens.length; i++ ){
    if(kittens[i].y + 1 == 10) {
    addText("Game Moewver <3", {x: 1,
    y: 3,
    color: color`8`
    });
    addText("Press s to restart", {x: 1,
    y: 6,
    color: color`8`
    })
    level = 0;
    setMap(levels[0]);
    boolean = false
    count = 0;
    }
  }
  if(level == 1 || level == 2){
    let cats = getAll(cat);
    for( let j = 0 ; j < cats.length ; j++ ){
      console.log(getFirst(player).y)
      if(cats[j].y + 1 == 10) {
        console.log("I am here!")
        addText("Game Moewver <3", {x: 1,
        y: 3,
        color: color`8`
        });
        addText("Press s to restart", {x: 1,
        y: 6,
        color: color`8`
        })
        level = 0;
        setMap(levels[0]);
        boolean = false 
        count = 0;
      }
    }
  }
}

// Removing projectiles when they reach the end of the map and when they hit eachother
function removeProjectiles(){
  let hairballs = getAll(hairball)
    for( let i = 0 ; i < hairballs.length ; i++ )
      if( hairballs[i].y == 10 ) 
        clearTile( hairballs[i].x , 10)

  let missiles = getAll(missile);
    for( let i = 0 ; i < missiles.length ; i++)
      if( missiles[i].y == 1 )
        clearTile( missiles[i].x , 1)

  for( let i = 0 ; i < missiles.length ; i++ )
    for( let j = 0 ; j < hairballs.length ; j++){
      if( missiles[i].x == hairballs[j].x && missiles[i].y == hairballs[j].y ){
        clearTile( missiles[i].x, missiles[i].y )
      }
      if( missiles[i].x == hairballs[j].x && missiles[i].y + 1 == hairballs[j].y ){
        clearTile( missiles[i].x, missiles[i].y )
        clearTile( hairballs[j].x, hairballs[j].y )
      }
    }
  let fields = getAll(meowField)
  for( let i = 0 ; i < fields.length ; i++)
    if( fields[i].y == 8 ){
      clearTile( fields[i].x , 8)
    }
  for( let i = 0 ; i < missiles.length ; i++ )
    for( let j = 0 ; j < fields.length ; j++){
      if( missiles[i].x == fields[j].x && missiles[i].y == fields[j].y ){
        clearTile( missiles[i].x, missiles[i].y )
      }
      if( missiles[i].x == fields[j].x && missiles[i].y + 1 == fields[j].y ){
        clearTile( missiles[i].x, missiles[i].y )
        clearTile( fields[j].x, fields[j].y )
      }
    }
  
let firballs = getAll(fireball)
  for( let i = 0 ; i < firballs.length ; i++)
      if( firballs[i].y == 10 )
        clearTile( firballs[i].x , 10)
  for( let i = 0 ; i < missiles.length ; i++ )
    for( let j = 0 ; j < firballs.length ; j++){
      if( missiles[i].x == firballs[j].x && missiles[i].y == firballs[j].y ){
        clearTile( missiles[i].x, missiles[i].y )
      }
      if( missiles[i].x == firballs[j].x && missiles[i].y + 1 == firballs[j].y ){
        clearTile( missiles[i].x, missiles[i].y )
        clearTile( firballs[j].x, firballs[j].y )
      }
    }
  
  let trails = getAll(firetrail)
  for( let i = 0 ; i < trails.length ; i++)
      if( trails[i].y == 10 )
        clearTile( trails[i].x , 10)
  for( let i = 0 ; i < missiles.length ; i++ )
    for( let j = 0 ; j < trails.length ; j++){
      if( missiles[i].x == trails[j].x && missiles[i].y == trails[j].y ){
        clearTile( missiles[i].x, missiles[i].y )
      }
      if( missiles[i].x == trails[j].x && missiles[i].y + 1 == trails[j].y ){
        clearTile( missiles[i].x, missiles[i].y )
        clearTile( trails[j].x, trails[j].y )
      }
    }
}

//Boss level functions

let barrage = false;
let dialogue = false;
function numberOfLives(){
  if(dialogue == false){
    if(bossLives == 5){
      addText("Damn you", {x: 6,
          y: 5,
          color: color`8`
          })
      addText("ball of nonfur", {x: 5,
          y: 6,
          color: color`8`
          })
      barrage = true
      boolean = false
      setTimeout(() => {
        boolean = true;
      },1000)
      dialogue = true;
    }
  }
}

let bossLives = 9;

function bossField(){
  for( let i = 1 ; i <= 7 ; i++ ){
    clearTile( i, 5 )
    addSprite( i, 5, meowField  )
  }
}

let way = true
function bossProjectiles(){
  way = !way
  if(barrage){
    addSprite(2 , 4 , fireball)
    addSprite(6 , 4 , fireball)
    setTimeout(() => {
    addSprite(4 , 4 , fireball)
    }, 500)
    setTimeout(() => {
    addSprite(2 , 4 , fireball)
    addSprite(6 , 4 , fireball)
    }, 1500)
  }
  else{
    if(way){
      addSprite(1, 4, hairball)
      addSprite(3, 4, hairball)
      addSprite(5, 4, hairball)
      addSprite(7, 4, hairball)
    }
    else{
      addSprite(2, 4, hairball)
      addSprite(4, 4, hairball)
      addSprite(6, 4, hairball)
    }
  }
}

function damageBoss(){
  let missiles = getAll(missile);
  for( let i = 0 ; i < missiles.length ; i++){
    if(missiles[i].x == 3 && missiles[i].y == 3){
      bossLives--
     
    }
    if(missiles[i].x == 4 && missiles[i].y == 3){
      bossLives--
      
    }
    if(missiles[i].x == 5 && missiles[i].y == 3){
      bossLives--
    }
  }
  console.log(bossLives)
}

setInterval(() => {
  if( boolean === true ){
  shootHairball();
  shootFireball();
    if(level == 3){
       bossProjectiles()
    }
  }
},7000)

setInterval(() => {
  if( boolean === true ){
      moveHairball();
      moveFireball();
       moveFiretrail();
      moveMissile();
      removeKittens();
      removePlayer();
      removeProjectiles();
      if( level == 3){
         damageBoss();
         numberOfLives()
      }

      if( level == 0 && count == 4){
        addText("You're not a cat", {x: 2,
        y: 5,
        color: color`8`
        })
        addText("person are you?", {x: 2,
        y: 6,
        color: color`8`
        })
        addText("Press s to go ", {x: 4,
        y: 8,
        color: color`8`
        })
        addText("to the next level ", {x: 2,
        y: 9,
        color: color`8`
        })
        boolean = false
        level++;
          count = 0;
      }
      else if (level == 1 && count == 7 ) {
        addText("Stop! You're ruining", {x: 0,
        y: 3,
        color: color`8`
        })
        addText("my evil...", {x: 0,
        y: 4,
        color: color`8`
        })
        addText("I mean, cute ", {x: 0,
        y: 5,
        color: color`8`
        })
        addText("cat empire", {x: 0,
        y: 6,
        color: color`8`
        })
        addText("Press s to go ", {x: 4,
        y: 8,
        color: color`8`
        })
        addText("to the next level ", {x: 2,
        y: 9,
        color: color`8`
        })
        boolean = false
        level++;
          count = 0;
        }
        else if (level == 2 && count == 8 ) {
          addText("NOOO000000 ", {x: 6,
          y: 2,
          color: color`8`
          })
          addText("Stop it you dog!", {x: 3,
          y: 3,
          color: color`8`
          })
          addText("Press s to go ", {x: 4,
          y: 8,
          color: color`8`
          })
          addText("to the next level ", {x: 2,
          y: 9,
          color: color`8`
          })
          boolean = false
          level++;
          count = 0;
        }
        else if (level == 3 && bossLives == 0 ) {
          addText("Victory!", {x: 6,
          y: 2,
          color: color`8`
          })
          addText("You managed to ", {x: 3,
          y: 3,
          color: color`8`
          })
          addText("defeat the evil", {x: 3,
          y: 4,
          color: color`8`
          })
          addText("kittens!", {x: 3,
          y: 5,
          color: color`8`
          })
          addText("want to play", {x:3,
          y: 9,
          color: color`8`
          })
          addText("again?", {x:3,
          y: 10,
          color: color`8`
          })
          addText("Press s to ", {x: 3,
          y: 11,
          color: color`8`
          })
          addText("restart", {x: 3,
          y: 12,
          color: color`8`
          })
          boolean = false
          count = 0;
        }
      }
},500)
  
setInterval(() => {
  if( boolean === true ){
  enableMeowField()
  moveKittens();
  if(level != 3)  
    moveMeowField()
    if( level == 3 ){
       bossField()
    }
  }
}, 10000)

setPushables({
  [ player ]: []
})

addText("You wouldn't  ", {x: 4,
  y: 1,
  color: color`8`
})
  addText("hurt an innocent", {x: 2,
  y: 2,
  color: color`8`
})
addText("kitten...would you? ", {x: 1,
  y: 3,
  color: color`8`
})
addText("Press s to start ", {x: 1,
  y: 6,
  color: color`8`
})

//Player input
onInput("a", () => {
  if(boolean == true)
  getFirst(player).x -= 1
})

onInput("d", () => {
  if(boolean == true)
  getFirst(player).x += 1
})

let loaded = true
onInput("w", () => {
  if(boolean == true){
    if(loaded == true){
      loaded = false
      shootMissile();
      clearText()
      addText("L", {x: 0,
        y: 1,
        color: color`3`
        })
        addText("o", {x: 0,
        y: 2,
        color: color`3`
        })
        addText("a", {x: 0,
        y: 3,
        color: color`3`
        })
        addText("d", {x: 0,
        y: 4,
        color: color`3`
        })
        addText("i", {x: 0,
        y: 5,
        color: color`3`
        })
        addText("n", {x: 0,
        y: 6,
        color: color`3`
        })
        addText("g", {x: 0,
        y: 7,
        color: color`3`
        })
      
        //Stops the player from spamming the projectiles and adds a bit of a more challanging perspective because now you have to deal with the loading mechanic
        setTimeout(() => {
          loaded = true
          clearText()
          addText("L", {x: 0,
          y: 1,
          color: color`4`
          })
          addText("o", {x: 0,
          y: 2,
          color: color`4`
          })
          addText("a", {x: 0,
          y: 3,
          color: color`4`
          })
          addText("d", {x: 0,
          y: 4,
          color: color`4`
          })
          addText("e", {x: 0,
          y: 5,
          color: color`4`
          })
          addText("d", {x: 0,
          y: 6,
          color: color`4`
          })
        }, 1000);
    }

  }
  
}) 

onInput("i", () => {
  if(level == 3){
     level = 0;
     setMap(levels[0]);
     boolean = false
    bossLives = 9;
  }
  
})

onInput("s", () => {
  if(boolean == false){
    if( level == 0 ){
      clearText()
      boolean = true;
    }
    if( level == 1 ){
      setMap(levels[1]);
      clearText();
      boolean = true;
    }
    if( level == 2 ){
      setMap(levels[2]);
      clearText();
      boolean = true;
    }
    if( level == 3 ){
      setMap(levels[3]);
      clearText();
      boolean = true;
      if(bossLives == 0){
        level = 0;
        setMap(levels[0]);
        boolean = false
        bossLives = 9;
        barrage = false
        dialogue = false
        addText("You wouldn't  ", {x: 4,
          y: 1,
          color: color`8`
        })
          addText("hurt an innocent", {x: 2,
          y: 2,
          color: color`8`
        })
        addText("kitten...would you? ", {x: 1,
          y: 3,
          color: color`8`
        })
        addText("Press s to start ", {x: 1,
          y: 6,
          color: color`8`
        })
      }
    }
  }
})

afterInput(() => {
})

