/*


@title: Ultimate Showdown: Dog Vs. Shark
@author:  Elyse and Edlyn To
@tags: []
@addedOn:
*/

const player_1 = "p";
const player_2 = "q";
const missile = "m";
const missile_2 = "n"
const melody = tune `
500: C5-500,
15500`
const melody2 = tune `
500: C5/500,
15500`

p1_wins = 0
p2_wins = 0
setLegend(
  [ player_1, bitmap`
................
................
......55........
......555.......
55...55555......
55.5555555......
5555555555555...
55555555555555..
555555555555055.
555555.5.555555.
555555....53355.
5555555555555...
55..555.........
55..............
................
................` ],
  [player_2, bitmap `
................
................
................
.9...9..........
939.939.........
CCCCCCC.........
02CC02C.......2.
22CC22CCCCCC....
CC0CCCCCCCCCC...
CCCCCCCCCCCCC9..
...CCCCCCCCCC.9.
....CCCCCCCC...9
.....C....C.....
....CC...CC.....
................
................`],
  [missile, bitmap `
................
................
................
................
................
................
......33333.....
.....39999933...
.....3333333....
........33......
................
................
................
................
................
................`],
  [missile_2, bitmap `
................
................
................
................
................
......HHHHH.....
....HH99999H....
.....HHHHHHH....
.......HH.......
................
................
................
................
................
................
................`]
);

setMap(map`
........
........
........
p......q
........
........
........`);


  
  onInput("s", () => {
    getFirst(player_1).y += 1
  })
  onInput("w",() =>{
    getFirst(player_1).y -=1
  })
  
  onInput("k", () => {
    getFirst(player_2).y += 1
  })
  onInput("i",() =>{
    getFirst(player_2).y -=1
  })

  function moveMissile() {
    const missileSprite = getFirst(missile);
    if(!missileSprite) return;
    try{if (getFirst(missile).x ==width()-1){
      getFirst(missile).remove();
    }
    else{
        getFirst(missile).x += 1; // Move the missile to the right
    }
       }
    catch(err){
     //  pass
    }

    if(missileSprite.x === getFirst(player_2).x && missileSprite.y === getFirst(player_2).y){
//      addText("shork wins yaur",{
  //          color: color `3`
     //});
      p1_wins+=1
      addText("shark points:" +p1_wins, {
        y: 2
      });
    }
    if(p1_wins==6){
      addText("game over",{
        y:5,
        color: color `5`
      });
      addText("shark wins",{
        y:6,
        color: color `5`
      });
      
        p2_wins = 0;
        p1_wins = 0;
      setTimeout(() => {
          clearText();
}, 3000)
      
    }
  }
    

  // onInput("d",()=>{
  //   addSprite(1, getFirst(player_1).y, missile)
  //   setInterval(moveMissile,500)
  //   playTune(melody2)
  // });

  let missileInterval;
  let missileSpeed = 150;
  onInput("d",()=>{
    addSprite(1, getFirst(player_1).y, missile)
    missileSpeed = Math.max(20, missileSpeed - 10);
    if (missileInterval) clearInterval(missileInterval);
    missileInterval = setInterval(moveMissile,missileSpeed);
    playTune(melody2)
  });

function moveMissile2() {
    const missileSprite2 = getFirst(missile_2);
    if(!missileSprite2) return;
    try{if (getFirst(missile_2).x == 0){
      getFirst(missile_2).remove();
    }
    else{
        getFirst(missile_2).x -= 1; // Move the missile to the right
    }
       }
    catch(err){
     //  pass
    }
      if(missileSprite2.x === getFirst(player_1).x && missileSprite2.y === getFirst(player_1).y){
      // addText("doggo wins naur",{
      //       color: color `3`,
      // });
        p2_wins +=1
        addText("dog points:"+p2_wins,{
          y:3
        } );
    }
      if(p2_wins ==6){
        addText("game over dog wins",{
          y:4,
          color:color`C`
        });
        p2_wins = 0;
        p1_wins = 0;
        setTimeout(() => {
          clearText();
}, 3000)
      }
    
}
  // onInput("j",()=>{
  //   addSprite(width()-2, getFirst(player_2).y, missile_2)
  //   setInterval(moveMissile2,500)
  //   playTune(melody)
  // });
  let missileIntervalDOG;
  let missileSpeedDOG = 150;

  onInput("j",()=>{
    addSprite(width()-2, getFirst(player_2).y, missile_2)
    missileSpeedDOG = Math.max(20, missileSpeedDOG - 10);
    if (missileIntervalDOG) clearInterval(missileIntervalDOG);
    missileIntervalDOG = setInterval(moveMissile2,missileSpeedDOG);
    playTune(melody2)
  });
