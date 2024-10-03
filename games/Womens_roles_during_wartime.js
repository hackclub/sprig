
/* 
@title: Women's roles during wartime
@author: cupcakes
@tags: ['puzzle']
@addedOn: 2023-06-04
*/

    /*
Women's roles during wartime
*/

const queen = "u";

const document = "c";

const smallsprk = "s"

const bigsprk = "b"

const biggersprk = "y"

const hammer = "l"
const baseball = "p"
const tbd = "r"
const cross = "e"
const soccer = "g"


setLegend(
  [queen, bitmap`
................
................
................
.......6........
.......6........
......666.......
......686.......
...6..666..6....
..66666666666...
.66H666H666H66..
666666666666666.
................
................
................
................
................`], 
  [document, bitmap `
................
................
................
................
.....FFFFFFFFFF.
....FFFFFFFFF6F.
....FF666FFFF...
....FF6F6FFFF...
....FF666FFFF...
....FF66FFFFF...
....FF6F6FFFF...
....FF6FF6FFF...
..F6FFFFFFFFF...
..FFFFFFFFFF....
................
................`],
  [hammer, bitmap `
................
....111111111...
....111111111...
....111111111...
....111111111...
....11.66.......
....11.66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......`],
  [baseball, bitmap `
................
................
.....222222.....
....22222223....
...3322222322...
..223222223222..
.22233222322222.
.22223222322222.
.22223222322222.
.22223222332222.
.22233222233222.
..223222222332..
...3322222223...
....22222222....
.....222222.....
................`],
  [tbd, bitmap `
................
..4444....4444..
.444444..444444.
44444444D4444444
.444444.D.44444.
..444...D..444..
........D.......
.......DD.......
.......D........
.......D........
.......D........
......DD........
......D.........
......D.........
......D.........
......D.........`],
  [smallsprk, bitmap `
........6.......
.......676......
.......6776.....
.......6776.....
.......6776.....
.......6776.....
......67776.....
......67776.....
......677776....
......677776....
.....6777776....
.....6777776....
.....67777776...
.....67777776...
.....67777776...
.....67777776...`], 
  [bigsprk, bitmap `
.....67777776...
.....67777776...
.....67777776...
....667777776...
....677777776...
....6777777766..
....6777777776..
....6777777776..
...66777777776..
..677777777776..
..6777777777766.
..6777777777776.
..6777777777776.
.667777777777766
.677777777777776
.677777777777776`],
  [biggersprk, bitmap `
.677777777777776
.677777777777776
.677777777777776
.677777777777776
.677777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776
6777777777777776`],
  [cross, bitmap`
................
................
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
..333333333333..
..333333333333..
.......33.......
.......33.......
.......33.......
.......33.......
.......33.......
................
................`],
  [soccer, bitmap `
................
................
.....022200.....
....00222000....
..000022222000..
..000022222000..
.22222200222000.
.22222000022222.
.00020000002220.
.00020000002220.
.00022000022222.
..002220022000..
...22222222000..
....00002220....
.....000022.....
................`]
)


setSolids([])


let level = 0
const levels = [ map `
...........
...........
...........
...........
...........
...........
...........
...........
...........`,
  map`
...u.
e..c.
.....
lcrel`, 
  map`
...u.
e..c.
.g..g
lrrer`,
  map `
u........
..p....c.
p.....p..
lrrl.cr.c`,
  map `
u........
..p....c.
pec..cpee
lrrlecr.c`
]

setMap(levels[level])

//setPushables({
  //[ queen ]: []
//})

onInput("a", () => {
  if(getFirst(queen) !== undefined){
    getFirst(queen).x -= 1
  }
})

onInput("d", () => {
  if(getFirst(queen) !== undefined){
  getFirst(queen).x += 1
  }
})

onInput("w", () => {
  const melody = tune `
  500: C5^500,
  15500`
  playTune(melody)
  
  if(getFirst(queen) !== undefined && 
     ((getAll(document, baseball, hammer, cross)[0] !== null))
){
    var x_queen = getFirst(queen).x
    var y_queen = getFirst(queen).y
    capture(x_queen, y_queen)

  }
    


    function capture(x_val, y_first){
    if(getTile(x_val, y_first + 1)[0] !== undefined){
      addSprite(x_val, y_first+1, smallsprk)    
    setTimeout(() =>{
         clearTile(x_val, y_first+1,smallsprk)
      }, 500);
      
    }else if(getTile(x_val, y_first + 2)[0] !== undefined){
      addSprite(x_val, y_first+1, smallsprk)
      addSprite(x_val, y_first+2, bigsprk)
      setTimeout(() =>{
         clearTile(x_val, y_first+1,smallsprk)
         clearTile(x_val, y_first+2,bigsprk)  
      }, 500);
      
    }else if(getTile(x_val, y_first + 3)[0] !== undefined){
      addSprite(x_val, y_first+1, smallsprk)
    addSprite(x_val, y_first+2, bigsprk)
    addSprite(x_val, y_first+3, biggersprk)
    setTimeout(() =>{
         clearTile(x_val, y_first+1,smallsprk)
         clearTile(x_val, y_first+2,bigsprk)
         clearTile(x_val,y_first+3, biggersprk)
      }, 500);
    }
    else{
      
    addSprite(x_val, y_first+1, smallsprk)
    addSprite(x_val, y_first+2, bigsprk)
    addSprite(x_val, y_first+3, biggersprk)
    setTimeout(() =>{
         clearTile(x_val, y_first+1,smallsprk)
         clearTile(x_val, y_first+2,bigsprk)
         clearTile(x_val,y_first+3, biggersprk)
      }, 500);
  
    }
    }
  
})


afterInput(() => {
  
  if((getFirst(document) !== undefined) 
     || (getFirst(hammer) !== undefined) 
     || (getFirst(baseball) !== undefined) 
     || (getFirst(tbd) !== undefined) || (getFirst(cross) !== undefined)){
  }
  else{
    if(level === 0){
      setMap(levels[level])
    
      addText("WWI begins", { y: 2, color: color`C` });
      addText("use a,d, w keys", { y: 7, color: color`L` });

      addText("and win rights for", { x:1 ,y: 10, color: color`5` });
      addText("women!", {y:12, color: color`H`});

      setTimeout(() =>{
       clearText()
       level = 1


      const currentLevel = levels[level];
    
      setMap(currentLevel);
  }, 3000);
    }
    else if(level === 2){
      setTimeout(() =>{
        addText("WW1 ends", { x: 1, y: 4, color: color`5`})
        addText("Women lose rights.",{x:1, y:6, color: color`H`})
        addText("20 yrs later..",{x:1, y:9, color: color`H`})
        addText("WW2 begins",{x:1, y:11, color: color`C`})
        

      }, 500);
      
      
      setTimeout(() =>{
        clearText()
      }, 3000);
      setTimeout(() =>{
        level = 3
        setMap(levels[3])
      }, 3100);
      
    }
    else{

    setTimeout(() => {
      
    level = level + 1;

    const currentLevel = levels[level];
    
    if (currentLevel !== null && level <= 4) {
      setMap(currentLevel);
    } else {
      //fix this
      addText("the end.", { y: 5, color: color`F` });
      addText("women win some", { y: 7, color: color`H` });
      addText("rights!", { y: 8, color: color`H` });

      

      addText("and lose some :(", { y: 11, color: color`9` });

    }
  }, 200);
  }
  }
  
})
  
