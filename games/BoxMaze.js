
/* 
@title: BoxMaze
@author: Kalo
@tags: ["puzzle" , "maze"]
@addedOn: 2023-11-13
*/

    /*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
*/

const player = "p"
const wall = "w"
const box = "b"

const teleporter = "P"

//set1
const trap1 = "t"
const activator1 = "a"
const gate1 = "B"

//set2
const trap2 = "c"
const activator2 = "d"
const gate2 = "e"

//set3
const trap3 = "f"
const activator3 = "G"
const gate3 = "H"


var playerPosX = 0;
var playerPosY = 0;

var CPP=[];

let level = 0


const levels = [
  map`
P......
.......
wwwBwww
.......
...t...
...a...
...p...`,
  map`
......w..
.d....e.P
......w..
.....cw..
wwwwBwwww
.....tw..
....a.w..
......w..
....p.w..`,
  map`
.t...B.fw..
.....B..wP.
...w.w..wHw
...w.wd....
...w.w...G.
...w.wewwww
.a.w.......
...wwwwwwww
...........
.c...p.....`,
    map`
.bPbbc
..bebB
t.b...
...ba.
.pd...
..w...`,
  map`
Pe.H..c
ww.wf..
...wt..
.G.Bd..
...w..w
...wa.w
...w.pw`,
  map`
.......
.......
.......
...p...
.......
.......
.......`,
]

setLegend(
  [ player, bitmap`
................
................
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
................
................` ],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
  [ box, bitmap`
CCCCCCCCCCCCCCCC
C99CCCCCCCCCC99C
C999CCCCCCCC999C
CC999CCCCCC999CC
CCC999CCCC999CCC
CCCC999CC999CCCC
CCCCC999999CCCCC
CCCCCC9999CCCCCC
CCCCCC9999CCCCCC
CCCCC999999CCCCC
CCCC999CC999CCCC
CCC999CCCC999CCC
CC999CCCCCC999CC
C999CCCCCCCC999C
C99CCCCCCCCCC99C
CCCCCCCCCCCCCCCC` ],

    [ teleporter, bitmap`
....55555555....
...5555555555...
..555555555555..
.55555555555555.
5555577777755555
5555777777775555
5555777777775555
5555777777775555
5555777777775555
5555777777775555
5555777777775555
5555577777755555
.55555555555555.
..555555555555..
...5555555555...
....55555555....` ],

  //set1
  [ trap1, bitmap`
....33333333....
...3333333333...
...3333333333...
.33333333333333.
3333333333333333
3333333333333333
3333333773333333
3333337777333333
3333337777333333
3333333773333333
3333333333333333
3333333333333333
.33333333333333.
...3333333333...
...3333333333...
....33333333....` ],
  [ activator1, bitmap`
CCCCCCCCCCCCCCCC
CCC9999999999CCC
CCCC99999999CCCC
C9CCC999999CCC9C
C99CCC9999CCC99C
C999CCC99CCC999C
C9999CCCCCC9999C
C99999C77C99999C
C99999C77C99999C
C9999CCCCCC9999C
C999CCC99CCC999C
C99CCC9999CCC99C
C9CCC999999CCC9C
CCCC99999999CCCC
CCC9999999999CCC
CCCCCCCCCCCCCCCC` ],
  [ gate1, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111771111111
1111111771111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ],

  //set2
  [ trap2, bitmap`
....33333333....
...3333333333...
...3333333333...
.33333333333333.
3333333333333333
3333333333333333
3333333003333333
3333330000333333
3333330000333333
3333333003333333
3333333333333333
3333333333333333
.33333333333333.
...3333333333...
...3333333333...
....33333333....` ],
  [ activator2, bitmap`
CCCCCCCCCCCCCCCC
CCC9999999999CCC
CCCC99999999CCCC
C9CCC999999CCC9C
C99CCC9999CCC99C
C999CCC99CCC999C
C9999CCCCCC9999C
C99999C00C99999C
C99999C00C99999C
C9999CCCCCC9999C
C999CCC99CCC999C
C99CCC9999CCC99C
C9CCC999999CCC9C
CCCC99999999CCCC
CCC9999999999CCC
CCCCCCCCCCCCCCCC` ],
  [ gate2, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111001111111
1111111001111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ],

    //set2
  [ trap3, bitmap`
....33333333....
...3333333333...
...3333333333...
.33333333333333.
3333333333333333
3333333333333333
3333333DD3333333
333333DDDD333333
333333DDDD333333
3333333DD3333333
3333333333333333
3333333333333333
.33333333333333.
...3333333333...
...3333333333...
....33333333....` ],
  [ activator3, bitmap`
CCCCCCCCCCCCCCCC
CCC9999999999CCC
CCCC99999999CCCC
C9CCC999999CCC9C
C99CCC9999CCC99C
C999CCC99CCC999C
C9999CCCCCC9999C
C99999CDDC99999C
C99999CDDC99999C
C9999CCCCCC9999C
C999CCC99CCC999C
C99CCC9999CCC99C
C9CCC999999CCC9C
CCCC99999999CCCC
CCC9999999999CCC
CCCCCCCCCCCCCCCC` ],
  [ gate3, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111DD1111111
1111111DD1111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ],
)


//Hit Detection-------------------------------------------------------------------------------|

function checkHitTele() {
  
  let tele = getFirst(teleporter);

  let p = getFirst(player);
if(tele){
      if (p.x == tele.x && p.y == tele.y) {
      return true;
      
    }
    else{
    return false
    }
}

}

function checkHitS1() {
  
  let t1 = getFirst(trap1);
  let a1 = getFirst(activator1);
  let p = getFirst(player);

  if(a1&&t1){
        if (a1.x == t1.x && a1.y == t1.y) {
      return true;
    }
    else{
    return false
    }
  }

}

function checkHitS2() {
  
  let t2 = getFirst(trap2);
  let a2 = getFirst(activator2);
  let p = getFirst(player);

  if(a2 && t2){
    if (a2.x == t2.x && a2.y == t2.y) {
      return true;
    }
    else{
    return false
    }
  }

}

function checkHitS3() {
  
  let t3 = getFirst(trap3);
  let a3 = getFirst(activator3);
  let p = getFirst(player);

  if(a3 && t3){
        if (a3.x == t3.x && a3.y == t3.y) {
      return true;
    }
    else{
    return false
    }
  }

}


//TextInfo------------------------------------------------------------------------------------|
                                                                                              
//TextInfo-------------------------------------------------------w-----------------------------^

setSolids([wall,player,box,
           activator1,gate1,
           activator2,gate2,
           activator3, gate3])


setPushables({
    [ player ]: [activator1,activator2,activator3,box]  


});
setMap(levels[level])

//input------------------------------------------------------------------------------------------|
onInput("i", () => {

    level+=1;
    setMap(levels[level])})

  onInput("j", () => {
    setMap(levels[level])
})


onInput("s", () => {
  getFirst(player).y += 1  
})

onInput("w", () =>{
  getFirst(player).y -=1
})    

onInput("d", () => {
  getFirst(player).x += 1 
})

onInput("a", () =>{
  getFirst(player).x -=1
}) 


var gameLoop = setInterval(() => {


  let tele = getFirst(teleporter)
  
  let g1 = getFirst(gate1)
  let g2 = getFirst(gate2)
  let g3 = getFirst(gate3)
  
  if(level >= 5){
    addText("You Won"), { 
  x: 10,
  y: 0,
  color: color`3`
      
  }
  }
  
  if(level == 0){
    addText(" j to restart"), { 
  x: 0,
  y: 0,
  color: color`4`
      
  }
  }

  
  if (checkHitS1()) {   
    if(g1){
      clearTile(g1.x,g1.y);
    }
  }
  
  if (checkHitS2()) {    
    if(g2){
        clearTile(g2.x,g2.y)
    }
  }
    if (checkHitS3()) {    
    if(g3){
        clearTile(g3.x,g3.y)
    }
  }

  if(checkHitTele()){

    clearText()
    level+=1;
    setMap(levels[level])
    }


  
  
},500);
//input------------------------------------------------------------------------------------------
        
