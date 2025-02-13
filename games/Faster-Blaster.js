/*
@title: Faster Blaster
@author: Michealtheratz
@tags: []
@addedOn: 2024-13-25
*/

const player = "p"
const warning = "w"
const blast = "b"
const blastDown = "d"
const coin = "x"
const powerup = "v"

const regenTune = tune`
112.35955056179775: E4~112.35955056179775,
112.35955056179775: E4~112.35955056179775,
112.35955056179775: E4~112.35955056179775,
112.35955056179775: F4^112.35955056179775,
112.35955056179775: F4^112.35955056179775,
112.35955056179775: F4^112.35955056179775,
2921.3483146067415`;
const dieTune = tune`
112.35955056179775: C4-112.35955056179775,
112.35955056179775: C4-112.35955056179775,
112.35955056179775: C4-112.35955056179775,
112.35955056179775: C4-112.35955056179775,
112.35955056179775: C4-112.35955056179775,
112.35955056179775: C4-112.35955056179775,
112.35955056179775: C4-112.35955056179775,
112.35955056179775: C4-112.35955056179775,
2696.629213483146`;

let dead = false;

let blasters=[{
  x:0, y:8, dir:0
}]

let score = 0;

let regens = 2;

setLegend(
  [ player, bitmap`
.33333....33333.
3333333..3333333
3333333..3333333
3333333..3333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
.33333333333333.
..333333333333..
...3333333333...
....33333333....
.....333333.....
......3333......
.......33.......` ],
  [ blast, bitmap`
................
................
................
.0000...........
0022000000000000
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
0022000000000000
.0000...........
................
................
................` ],
  [ blastDown, bitmap`
....02222220....
...0022222200...
...0222222220...
...0222222220...
...0022222200...
....02222220....
....02222220....
....02222220....
....02222220....
....02222220....
....02222220....
....02222220....
....02222220....
....02222220....
....02222220....
....02222220....` ],
  [ warning, bitmap`
.......00.......
.......00.......
......0660......
......0660......
.....066660.....
.....066660.....
....06600660....
....06600660....
...0666006660...
...0666006660...
..066666666660..
..066660066660..
.06666600666660.
.06666666666660.
0666666666666660
.00000000000000.` ],
  [ coin, bitmap`
....66666666....
...6666666666...
..666666666666..
.6666FFFFFF6666.
6666FFFFFFFF6666
666FFFFFFFFFF666
666FFFFFFFFFF666
666FFFFFFFFFF666
666FFFFFFFFFF666
666FFFFFFFFFF666
666FFFFFFFFFF666
6666FFFFFFFF6666
.6666FFFFFF6666.
..666666666666..
...6666666666...
....66666666....` ],
  [ powerup, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ]
)

setSolids([])

let level = 0
const levels = [
  map`
.................
.................
.................
.................
.................
.................
.................
.................
.........p.......
.................
.................
.................
.................
.................
.................
.................
.................`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})


function regen(){

      playTune(regenTune);
  
      for(var i = 0; i < getAll(powerup).length; i++){
        let p = getAll(powerup)[i]
        p.remove();
      }
  
      let abl = getAll(blast);
      let abld = getAll(blastDown);

      for(var i = 0; i < abl.length; i++){
        abl[i].remove();
      }

      for(var i = 0; i < abld.length; i++){
        abld[i].remove();
      }

      let con = getFirst(coin);

      con.x = Math.floor(Math.random() * 14)+1;
      con.y = Math.floor(Math.random() * 14)+1;

      for(var i = 0; i < blasters.length; i++){
        let nbl = {
          x:0,
          y:0,
          dir: Math.floor(Math.random() * 3)
        }
  
        switch(nbl.dir){
          case 0:
            nbl.x=0;
            nbl.y=Math.floor(Math.random() * 16);
            break;
          case 1:
            nbl.x=16;
            nbl.y=Math.floor(Math.random() * 16);
            break;
          case 2:
            nbl.y=0;
            nbl.x=Math.floor(Math.random() * 16);
            break;
          case 3:
            nbl.y=16;
            nbl.x=Math.floor(Math.random() * 16);
            break;   
        }

        blasters[i]=nbl;
        
        
      }

      let nbl = {
        x:0,
        y:0,
        dir: Math.floor(Math.random() * 3)
      }

      switch(nbl.dir){
        case 0:
          nbl.x=0;
          nbl.y=Math.floor(Math.random() * 16);
          break;
        case 1:
          nbl.x=16;
          nbl.y=Math.floor(Math.random() * 16);
          break;
        case 2:
          nbl.y=0;
          nbl.x=Math.floor(Math.random() * 16);
          break;
        case 3:
          nbl.y=16;
          nbl.x=Math.floor(Math.random() * 16);
          break;   
      }

      blasters.push(nbl);

      for(var i = 0; i < getAll(warning).length; i++){
        let w = getAll(warning)[i]
        w.remove();
      }

      for(var i = 0; i < blasters.length; i++){
          let bl = blasters[i]
          addSprite(bl.x, bl.y, "w");
      }
}

onInput("w", () => {
  if(!dead){
    getFirst(player).y -= 1
  }
  
})
onInput("s", () => {
  if(!dead){
    getFirst(player).y += 1
  }
})

onInput("a", () => {
  if(!dead){
    getFirst(player).x -= 1
  }
})
onInput("d", () => {
  if(!dead){
    getFirst(player).x += 1
  }
})

//You get 2 regens per level
onInput("j", () => {
  if(regens>0){
    regen();
    regens--;
  }
})

for(var i = 0; i < blasters.length; i++){
    let bl = blasters[i]
    addSprite(bl.x, bl.y, "w");
}

addSprite(8, 10, coin);

afterInput(() => {
  for(var i = 0; i < getAll(warning).length; i++){
    let w = getAll(warning)[i]
    w.remove();
  }

  if(!dead){
    
    //addSprite(coinPos.x, coinPos.y, coin);

    for(var i = 0; i < blasters.length; i++){
      
      let bl = blasters[i];

  
      
      
      switch(bl.dir){
        case 0:
          if(bl.x >= 16){
            dead=true;
          }
          addSprite(bl.x, bl.y, "b");
          bl.x++;
          break;
        case 1:
          if(bl.x <= 0){
            dead=true;
          }
          addSprite(bl.x, bl.y, "b");
          bl.x--;
          break;
        case 2:
          if(bl.y >= 16){
            dead=true;
          }
          addSprite(bl.x, bl.y, "d");
          bl.y++;
          break;
        case 3:
          if(bl.y <= 0){
            dead=true;
          }
          addSprite(bl.x, bl.y, "d");
          bl.y--;
          break;
  
  
  
      }
    }


    if((getFirst(player).x == getFirst(coin).x)&&(getFirst(player).y == getFirst(coin).y)) {
      score++;
      regens=2;
      let ran = Math.floor(Math.random() * 1000);
      if(ran > 700 && ran < 900 && blasters.length > 2) {
        addSprite(Math.floor(Math.random() * 14)+1, Math.floor(Math.random() * 14)+1, powerup);
      }
      regen();
    }

    //Super regen (kills half of the lazers)
    for(var i = 0; i < getAll(powerup).length; i++){
      let p = getAll(powerup)[i]
      
      if((getFirst(player).x == p.x)&&(getFirst(player).y == p.y)) {
        let numtokill = Math.floor(blasters.length/2);
        //account for the extra lazer added
        numtokill--;
        if(numtokill >= 1){
          for(var i = 0; i < numtokill; i++){
            blasters.pop();
          }
        }
        regen();
      }

    }

    let abl = getAll(blast);
    let abld = getAll(blastDown);

    for(var i = 0; i < abl.length; i++){
      if((getFirst(player).x == abl[i].x)&&(getFirst(player).y == abl[i].y)){
        dead=true;
      }
    }

    for(var i = 0; i < abld.length; i++){
      if((getFirst(player).x == abld[i].x)&&(getFirst(player).y == abld[i].y)){
        dead=true;
      }
    }

    for(var i = 0; i < abl.length; i++){
      if((getFirst(coin).x == abl[i].x)&&(getFirst(coin).y == abl[i].y)){
        dead=true;
      }
    }

    for(var i = 0; i < abld.length; i++){
      if((getFirst(coin).x == abld[i].x)&&(getFirst(coin).y == abld[i].y)){
         dead=true;
      }
    }
    
    

    
  } else {
    playTune(dieTune)
    
    if(score < 20){
      addText(`Turkey!\nscore:${score}`);
    }else{
      addText(`You won!\nscore:${score}`);
    }
    if(getFirst(player)){
      getFirst(player).remove();
    }
  }
})