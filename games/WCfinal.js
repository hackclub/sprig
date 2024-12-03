/*
@title: WCfinal
@author: pulvis16
@tags: []
@addedOn: 2024-12-04
*/

const melody = tune`
188.67924528301887: E4^188.67924528301887,
188.67924528301887,
188.67924528301887: B4^188.67924528301887 + B5~188.67924528301887,
188.67924528301887,
188.67924528301887: B4^188.67924528301887 + B5~188.67924528301887,
188.67924528301887: A4^188.67924528301887 + A5-188.67924528301887 + C4^188.67924528301887,
188.67924528301887: B4^188.67924528301887 + B5-188.67924528301887 + D4^188.67924528301887,
188.67924528301887,
188.67924528301887: A4^188.67924528301887 + C4/188.67924528301887,
188.67924528301887: G4^188.67924528301887 + G5-188.67924528301887 + C4/188.67924528301887,
188.67924528301887: A4^188.67924528301887 + A5-188.67924528301887 + C4/188.67924528301887,
188.67924528301887: C4/188.67924528301887,
188.67924528301887: A4^188.67924528301887,
188.67924528301887: G4^188.67924528301887,
188.67924528301887: E4^188.67924528301887,
188.67924528301887: G4^188.67924528301887 + G5/188.67924528301887,
188.67924528301887: E4^188.67924528301887,
188.67924528301887,
188.67924528301887: B4^188.67924528301887 + B5~188.67924528301887,
188.67924528301887: C4/188.67924528301887,
188.67924528301887: B4^188.67924528301887 + B5~188.67924528301887 + C4/188.67924528301887,
188.67924528301887: A4^188.67924528301887 + A5-188.67924528301887 + C4/188.67924528301887,
188.67924528301887: B4^188.67924528301887 + B5-188.67924528301887 + C4/188.67924528301887,
188.67924528301887,
188.67924528301887: A4^188.67924528301887 + C4^188.67924528301887,
188.67924528301887: G4^188.67924528301887 + G5-188.67924528301887 + D4^188.67924528301887,
188.67924528301887: A4^188.67924528301887 + A5-188.67924528301887,
188.67924528301887,
188.67924528301887: A4^188.67924528301887,
188.67924528301887: G4^188.67924528301887,
188.67924528301887: E4^188.67924528301887,
188.67924528301887: G4^188.67924528301887 + G5/188.67924528301887`


const background= "h"
const player = "p"
const car = "c"
const spring = "s"
const spring2= "S"
const spring3= "r"
const spring4= "R"
const ball= "b"
const player2 ="P"
const goal ="g"
const goal2 ="G"
var isGoal = false;
var stopGoal = false;
let i = 3;
let goalP1 = 0;
let goalP2 = 0;

setLegend(
  [ player, bitmap`
.....7777777....
...77777777777..
..777407774077..
..7777777777777.
7777788888877777
7777777887777777
77..77777777..77
77..33333333...7
77..33.33.33...7
7...33.33.33....
....L3....L3....
....1L....1L....
....1L....1L....
....11....11....
....100...100...
....000...000...` ],
  [ player2, bitmap`
.....HHHHHHH....
...HHHHHHHHHHH..
..HHH50HHH50HH..
..HHHHHHHHHHHHH.
HHHHH888888HHHHH
HHHHHHH88HHHHHHH
HH..HHHHHHHH..HH
HH..99999999...H
HH..99.99.99...H
H...99.99.99....
....69....69....
....F6....F6....
....F6....F6....
....FF....FF....
....F00...F00...
....000...000...` ],
  [ ball, bitmap`
................
................
................
................
......00000.....
.....0000000....
....022000220...
....022000220...
....000200000...
....000000000...
....022002000...
.....0200220....
......00000.....
................
................
................` ],
  [ car, bitmap`
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
1111111111111111` ],
  [ spring, bitmap`
9933CC11C1110000
99331CCCCCCCCC0C
99331CCCC1CCLC0C
9333111CCCCCCC0C
9333C111CCCCCCCC
3333C111CCCL0CCC
3333CC11CCCL0LCC
3333CC11CCCCCC0C
9333CC11CCCCCCLC
9333CC1LL0CC0CLC
9933CCLLLCCC0CLC
9933CLLLLCCCLC0C
9933LLLCFFCLLCFC
9933L0CCCCCLCFFC
9993CCCCCCCCCFFF
9993CCCCCCFCFCFF` ],
  [ spring2, bitmap`
0CCCCCCCCCCCCCFF
0000CCC0LLL0FFFF
0CCCCCLCCCCCCFFC
0CLCC00CC00LLCCF
1CCCCLLCCCCCLLCC
1CCCCCCCCCCCCCCF
1C1CCCCCC0CCFCCC
CCCCCCCCCLLLFCCC
1CCC11111LLLCCCC
1CC1111111LLLCCC
CCC111CCCCCLL0CC
C111CCCCCCCCLLCC
3333333333333333
3333333333333399
9993333333999999
9999933399999999` ],
  [ spring3, bitmap`
0000111C11CC3399
C0CCCCCCCCC13399
C0CLCC1CCCC13399
C0CCCCCCC1113339
CCCCCCCC111C3339
CCC0LCCC111C3333
CCL0LCCC11CC3333
C0CCCCCC11CC3333
CLCCCCCC11CC3339
CLC0CC0LL1CC3339
CLC0CCCLLLCC3399
C0CLCCCLLLLC3399
CFCLLCFFCLLL3399
CFFCLCCCCC0L3399
FFFCCCCCCCCC3999
FFCFCFCCCCCC3999` ],
  [ spring4, bitmap`
9999933399999999
9993333333999999
3333333333333399
3333333333333333
C111CCCCCCCCLLCC
CCC111CCCCCLL0CC
1CC1111111LLLCCC
1CCC11111LLLCCCC
CCCCCCCCCLLLFCCC
1C1CCCCCC0CCFCCC
1CCCCCCCCCCCCCCF
1CCCCLLCCCCCLLCC
0CLCC00CC00LLCCF
0CCCCCLCCCCCCFFC
0000CCC0LLL0FFFF
0CCCCCCCCCCCCCFF` ],
  [ background, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD` ],
  [ goal, bitmap`
2.2.2.2..2..2..2
.2.2.2.2..2..22.
..2.2.2.2..2.22.
2..2.2.2.2..2..2
.2..2.2.2.22.2..
..2..2.2.222..2.
2..2..2.222.2..2
.2..2..222.2.2..
..2..2.22.2.2.2.
2..2..2..2.2.2.2
.2..22.2..2.2.2.
..2.22..2..2.2.2
2..22.2..2..2.2.
.22..2.2..2..2.2
.22..22.2..2..2.
2..22..2.2..2..2`],
  [ goal2, bitmap`
2.2.2.2..2..2..2
.2.2.2.2..2..22.
..2.2.2.2..2.22.
2..2.2.2.2..2..2
.2..2.2.2.22.2..
..2..2.2.222..2.
2..2..2.222.2..2
.2..2..022.2.2..
..2..2022.2.2.2.
2..2..2..2.2.2.2
.2..22.2..2.2.2.
..2.22..2..2.2.2
2..22.2..2..2.2.
.22..2.2..2..2.2
.22..22.2..2..2.
2..22..2.2..2..2`]
)

setSolids([ball, player, player2])
setBackground("h")
let level = 0
const levels = [
  map`
cSSSSSScggggcSSSSSSc
rhhhhhhcccccchhhhhhs
rh................hs
rh................hs
rh.......P........hs
rh................hs
rh................hs
rh................hs
rh.......b........hs
rh................hs
rh................hs
rh........p.......hs
rh................hs
rh................hs
rhhhhhhcccccchhhhhhs
cRRRRRRcGGGGcRRRRRRc`
]

setMap(levels[level])
const playback = playTune(melody, Infinity)
setPushables({ 
  [player]: [ ball, player ],
   [player2]: [ ball, player2 ] 
})
onInput("s", () => {
  getFirst(player).y += 1
})
onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("w", () => {
  getFirst(player).y -= 1
})
onInput("d", () => {
  getFirst(player).x += 1
})

onInput("k", () => {
  getFirst(player2).y += 1
})
onInput("j", () => {
  getFirst(player2).x -= 1
})
onInput("i", () => {
  getFirst(player2).y -= 1
})
onInput("l", () => {
  getFirst(player2).x += 1
})

afterInput(() => {
  
})
function gameLoop() {
    SpringBehaviour();
  NetBehaviour();
   DisplayScore();
  
}
function gameTimer()
{
  
  
  if(isGoal)
  {
    clearText();
    if(i > 0)
    {
      
      addText(`Starting in: ${i}`, {
      x: 3,
      y: 6,
      color: color`9`
      });
      i--;
      
    }
    else
    {
      i = 3;
      isGoal = false;
      setMap(levels[level]);
      stopGoal = false;
    }
    
  }

  
}
const interval = setInterval(gameLoop, 200);
const intervals = setInterval(gameTimer, 1000);
function SpringBehaviour()
{
  const ballSprite = getFirst(ball);
  const spritesAtSprings = getTile(ballSprite.x, ballSprite.y);

  spritesAtSprings.forEach(sprite => {
    if (sprite.type === spring)
    {
      ballSprite.x -= 2


      
    }else if(sprite.type === spring2)
    {
      ballSprite.y += 2
      
    }
    else if(sprite.type === spring3)
    {
      ballSprite.x += 2
    }
    else if(sprite.type === spring4)
    {
      ballSprite.y -= 2
    }
  });
  


  


  
}
function NetBehaviour()
{
  const ballSprite = getFirst(ball);
  const spritesAtSprings = getTile(ballSprite.x, ballSprite.y);

  spritesAtSprings.forEach(sprite => {
    if (sprite.type === goal)
    {
          addText("Gooooooooooal!!!!", { 
      x: 2,
      y: 4,
      color: color`2`
      })
      
      isGoal = true;
      if(stopGoal === false)
      {
      goalP1++;
        stopGoal = true;
      }
     
    } else if(sprite.type === goal2)
    {
      addText("Gooooooooooal!!!!", { 
      x: 2,
      y: 4,
      color: color`2`
    })

      isGoal = true;
      if(stopGoal === false)
      {
      goalP2++;
        stopGoal = true;
      }
      
  }});
  

}
function DisplayScore()
{
  
  addText(`${goalP1}`, {
    x: 0,
    y: 0,
    color: color`5`
  })
  addText(`${goalP2}`, {
    x: 19,
    y:  0,
    color: color`3`
  })
  
}
