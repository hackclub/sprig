/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started
@title: Defend Your House!
@author: Gabbs
@tags: ['strategy', 'survival', 'music']
@addedOn: 2024-11-13
*/

const moving = tune`
161.29032258064515: F4^161.29032258064515 + C5^161.29032258064515,
5000`
const placed = tune`
161.29032258064515: F4^161.29032258064515 + C5^161.29032258064515,
161.29032258064515: B4^161.29032258064515 + G5^161.29032258064515,
4838.709677419354`
const start = tune`
161.29032258064515: F4^161.29032258064515 + C5^161.29032258064515,
161.29032258064515: B4^161.29032258064515 + G5^161.29032258064515,
161.29032258064515: C5^161.29032258064515 + G5^161.29032258064515 + A5^161.29032258064515 + F5~161.29032258064515 + B5/161.29032258064515,
161.29032258064515: B5/161.29032258064515,
161.29032258064515: B5/161.29032258064515,
161.29032258064515: B5/161.29032258064515,
4193.548387096774`
const gameOver = tune`
500: F5-500,
500: B4-500 + C4/500,
500: E4-500,
500: C4-500,
500: C4/500,
500: C4-500,
13000`
const collision = tune`
84.50704225352112: D5/84.50704225352112,
84.50704225352112: C5/84.50704225352112,
84.50704225352112: E5/84.50704225352112,
2450.7042253521126`
const win = tune`
178.57142857142858: F5~178.57142857142858 + E4-178.57142857142858 + F4~178.57142857142858,
178.57142857142858: F5~178.57142857142858 + E4-178.57142857142858 + F4~178.57142857142858,
178.57142857142858: G5^178.57142857142858 + E4-178.57142857142858 + F4-178.57142857142858,
178.57142857142858: G4-178.57142857142858,
178.57142857142858: G4-178.57142857142858,
178.57142857142858: G5^178.57142857142858 + F4-178.57142857142858 + E4-178.57142857142858,
178.57142857142858: E4-178.57142857142858,
178.57142857142858: C5~178.57142857142858 + D4-178.57142857142858 + C4~178.57142857142858,
178.57142857142858: C4-178.57142857142858,
178.57142857142858: C4-178.57142857142858,
178.57142857142858: C5~178.57142857142858 + D4-178.57142857142858 + E4-178.57142857142858 + C4~178.57142857142858,
178.57142857142858: D5~178.57142857142858 + E4-178.57142857142858 + D4~178.57142857142858,
178.57142857142858: E4-178.57142857142858,
178.57142857142858: E4-178.57142857142858 + D4-178.57142857142858,
178.57142857142858: D4-178.57142857142858,
178.57142857142858: D5~178.57142857142858 + E4-178.57142857142858 + D4~178.57142857142858,
178.57142857142858: E4-178.57142857142858,
178.57142857142858: G5^178.57142857142858 + E4-178.57142857142858 + F4-178.57142857142858 + G4^178.57142857142858,
178.57142857142858: G5-178.57142857142858 + G4-178.57142857142858,
178.57142857142858: G5-178.57142857142858 + G4-178.57142857142858,
178.57142857142858: G5^178.57142857142858 + F4-178.57142857142858 + E4-178.57142857142858 + G4^178.57142857142858,
178.57142857142858: E4-178.57142857142858,
178.57142857142858: D4-178.57142857142858,
178.57142857142858: C4-178.57142857142858,
178.57142857142858: C4-178.57142857142858,
178.57142857142858: D4-178.57142857142858 + E4-178.57142857142858 + C4~178.57142857142858,
178.57142857142858: E4-178.57142857142858,
178.57142857142858: D4-178.57142857142858 + E4-178.57142857142858 + C4~178.57142857142858,
178.57142857142858: C4-178.57142857142858,
178.57142857142858: C4-178.57142857142858,
178.57142857142858: C4/178.57142857142858,
178.57142857142858: C4/178.57142857142858`

var z = 1;
var pos = 4;

const reinforcedWall = "V"
const FIREBALLR = "J";
const FIREBALL = "j";
const bg = "g"
const cursor = "c"
const pizzaOne = "p"
const wall = "w"
const roof = "r"
const roofl = "R"
const centerR = "C"
const center = "k"
const centerL = "O"
const white = "W"
const wood = "o";
const downLeftDoor = "d";
const downRightDoor = "D";
const upLeftDoor = "u";
const upRightDoor = "U";
const ZAP = "z";
const ROCK = "F";
const ROCKF = "f";
var numberOfWood = 15;
var roundSurvived = 0;
var events = 5;
var challenge = false;
var challengeState = false;
var youLost = false;
var randomChallenge = 0;
setLegend(
  [cursor, bitmap`
LLLLLLLLLLLLLLLL
L..............L
L.1........111.L
L..1.........1.L
L............1.L
L..............L
L..............L
L..............L
L..............L
L..............L
L..............L
L..........1.1.L
L.1.........11.L
L.11.......111.L
L..............L
LLLLLLLLLLLLLLLL`],
  [pizzaOne, bitmap `
CCCCCCCCCCCCCCCC
C33333399333999C
C33333393999333C
C33333339999333C
C99993933333399C
C33339933333999C
C33339999939333C
C99933333399333C
C99993333333999C
C33339999993339C
C33333999939339C
C99993333399339C
C93333333399993C
C93339999933339C
C39993999933339C
CCCCCCCCCCCCCCCC`],
  [wall, bitmap`
LLLLLL1LLLLLLLLL
LLLLL11LL1LL11LL
LLLLL111L1LL11LL
11111111L1L111LL
11111111L1L111LL
LL1111LLLLLLLLLL
LLLLLLLLLLLLLLLL
111LL11LL1111111
LLLLL11111111LLL
L111111111111LLL
L1111111LL111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
111111111LL11111
1111111LLLL11111
LLLLLLLLLLL111LL`],
  [roof, bitmap`
...............C
..............CC
.............CC6
............CC66
...........CC6F6
..........CC66F6
.........CC6F6F6
........CC66F6F6
.......CC6F6F6F6
......CC66F6F6F6
.....CC6F6F6F6F6
....CC66F6F6F6F6
...CC6F6F6F6F6F6
..CC66F6F6F6F6F6
.CC6F6F6F6F6F6F6
CC66F6F6F6F6F6F6`],
  [roofl, bitmap`
C...............
CC..............
6CC.............
66CC............
6F6CC...........
6F66CC..........
6F6F6CC.........
6F6F66CC........
6F6F6F6CC.......
6F6F6F66CC......
6F6F6F6F6CC.....
6F6F6F6F66CC....
6F6F6F6F6F6CC...
6F6F6F6F6F66CC..
6F6F6F6F6F6F6CC.
6F6F6F6F6F6F66CC`],
  [centerR, bitmap`
CCF6F6F6F6F6F6F6
C6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6`],
  [center, bitmap`
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6
F6F6F6F6F6F6F6F6`],
  [centerL, bitmap`
6F6F6F6F6F6F6FCC
6F6F6F6F6F6F6F6C
6F6F6F6F6F6F6F6F
6F6F6F6F6F6F6F6F
6F6F6F6F6F6F6F6F
6F6F6F6F6F6F6F6F
6F6F6F6F6F6F6F6F
6F6F6F6F6F6F6F6F
6F6F6F6F6F6F6F6F
6F6F6F6F6F6F6F6F
6F6F6F6F6F6F6F6F
6F6F6F6F6F6F6F6F
6F6F6F6F6F6F6F6F
6F6F6F6F6F6F6F6F
6F6F6F6F6F6F6F6F
6F6F6F6F6F6F6F6F`],
  [white, bitmap`
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [wood, bitmap`
CCCCCCCCCCCCCCCC
C11111111111111C
CFFFFFFFFFFFFFFC
CCCCCCCCCCCCCCCC
C11111111111111C
CFFFFFFFFFFFFFFC
CCCCCCCCCCCCCCCC
C11111111111111C
CFFFFFFFFFFFFFFC
CCCCCCCCCCCCCCCC
C11111111111111C
CFFFFFFFFFFFFFFC
CCCCCCCCCCCCCCCC
C11111111111111C
CFFFFFFFFFFFFFFC
CCCCCCCCCCCCCCCC`],
  [reinforcedWall, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
LFFFFFFFFFFFFFFL
LLLLLLLLLLLLLLLL
L11111111111111L
LFFFFFFFFFFFFFFL
LLLLLLLLLLLLLLLL
L11111111111111L
LFFFFFFFFFFFFFFL
LLLLLLLLLLLLLLLL
L11111111111111L
LFFFFFFFFFFFFFFL
LLLLLLLLLLLLLLLL
L11111111111111L
LFFFFFFFFFFFFFFL
LLLLLLLLLLLLLLLL`],
  [downLeftDoor, bitmap`
C6CCCCCCCCCCC666
C6CCCCCCCCCCCCCC
C6CCCCCCCCCCCCCC
C6CCCCCCCCCCCCCC
C6CCCCCCCCCCCCCC
C6CC66666666666C
C6CC66666666666C
C6CC66111111116C
C6CC66111111116C
C6CC66111111116C
C6CC66666666666C
C6CC66666666666C
C6CCCCCCCCCCCCCC
C6CCCCCCCCCCCCCC
C666666666666666
CCCCCCCCCCCCCCCC`],
  [downRightDoor, bitmap`
666CCCCCCCCCCC6C
CCCCCCCCCCCCCC6C
CCCCCCCCCCCCCC6C
CCCCCCCCCCCCCC6C
CCCCCCCCCCCCCC6C
C66666666666CC6C
C66666666666CC6C
C61111111166CC6C
C61111111166CC6C
C61111111166CC6C
C66666666666CC6C
C66666666666CC6C
CCCCCCCCCCCCCC6C
CCCCCCCCCCCCCC6C
666666666666666C
CCCCCCCCCCCCCCCC`],
  [upLeftDoor, bitmap`
CCCCCCCCCCCCCCCC
C666666666666666
C6CCCCCCCCCCCCCC
C6CCCCCCCCCCCCCC
C6CCCCCCCCCCCCCC
C6CCC999999999CC
C6CCC999999999CC
C6CCC999999999CC
C6CCC999999999CC
C6CCCCCCCCCCCCCC
C6CCCCCCCCCCCCCC
C6CCCCCCCCCCCCCC
C6CCCCCCCCCCCCCC
C6CCCCCCCCCCCCCC
C6CCCCCCCCCCCCCC
C6CCCCCCCCCCC661`],
  [upRightDoor, bitmap`
CCCCCCCCCCCCCCCC
666666666666666C
CCCCCCCCCCCCCC6C
CCCCCCCCCCCCCC6C
CCCCCCCCCCCCCC6C
CC999999999CCC6C
CC999999999CCC6C
CC999999999CCC6C
CC999999999CCC6C
CCCCCCCCCCCCCC6C
CCCCCCCCCCCCCC6C
CCCCCCCCCCCCCC6C
CCCCCCCCCCCCCC6C
CCCCCCCCCCCCCC6C
CCCCCCCCCCCCCC6C
166CCCCCCCCCCC6C`],
  [ROCK, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLL1111L
LL11111L1111111L
LL11111L1111111L
LL11111L1111111L
LLLLLLLL1111111L
LLLL11LL111LLLLL
L1LL11LL111LLLLL
L1LL11LLLLL111LL
L11111LLLLL111LL
LL11111111L1111L
LLLLLL1111L1111L
LL111L1111L1111L
L1111L1111L1111L
L1LLLL1111111LLL
LLLLLL1111111LLL`],
  [ROCKF, bitmap`
LLLLLLLLLLLLLLLL
L1111LLLLLLLLLLL
L1111111L11111LL
L1111111L11111LL
L1111111L11111LL
L1111111LLLLLLLL
LLLLL111LL11LLLL
LLLLL111LL11LL1L
LL111LLLLL11LL1L
LL111LLLLL11111L
L1111L11111111LL
L1111L1111LLLLLL
L1111L1111L111LL
L1111L1111L1111L
LLL1111111LLLL1L
LLL1111111LLLLLL`],
  [ZAP, bitmap`
......55555555..
.....577777775..
....576666675...
...576666675....
..576666675.....
...5766675......
....5766675.....
.....5766675....
......5766675...
.......5766675..
........5766675.
.........57675..
........57675...
.......57675....
......57675.....
.......555......`],
  [FIREBALL, bitmap`
6666666993393933
6666699699393333
6666666699939933
9666996969933933
9699699966993333
9969966699399933
6966996999939933
6699966999993333
9669996699999333
9999999933933933
9999999393393333
3933399339939333
3393939333993933
9333333333339333
3333333333333333
3333333333333333`],
  [FIREBALLR, bitmap`
3393933996666666
3333939969966666
3399399966666666
3393399696996669
3333996699969969
3399939966699699
3399399996996696
3333999996699966
3339999966999669
3393393399999999
3333933939999999
3339399339933393
3393993339393933
3339333333333339
3333333333333333
3333333333333333`],
  [bg, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`]


)

const level = map`
WWWWWWWWWWWWWWWWWWWW
WWWWWWWWWWWWWWWWWWWW
WWWWWWWWWWWWWWWWWWWW
WWWWWWWWWWWWWWWWWWWW
WWW..............WWW
WWW......c.......WWW
WWW..............WWW
WWW..............WWW
WWW..............WWW
WWW......rR......WWW
WWW.....rCOR.....WWW
WWW....rCkkOR....WWW
WWW....pppppp....WWW
WWW....ppuUpp....WWW
WWW....ppdDpp....WWW
wwwwwwwwwwwwwwwwwwww`
setMap(level)
setBackground("g")
setSolids([ cursor, wall, white ])

onInput("k", () => {
  // Move the player one tile to the right
  if(youLost == false)
  {
  playTune(moving);
  updateWoodCount();
  }
})

onInput("d", () => {
  // Move the player one tile to the right
  playTune(moving);
  getFirst(cursor).x += 1
})

onInput("s", () => {
  // Move the player one tile down
  playTune(moving);
  getFirst(cursor).y += 1
})

onInput("a", () => {
  // Move the player one tile to the left
  playTune(moving);
  getFirst(cursor).x -= 1
})

onInput("w", () => {
  // Move the player one tile up
  playTune(moving);
  getFirst(cursor).y -= 1
})

onInput("j", () => {
  // Start the event
  clearText();
  if (youLost == false) {
    if (challenge == false) {
      challenge = true;

    }
    if (challenge == true && challengeState == false) {
      EventSystem();

    } else if (challenge == true && challengeState == true) {
      addText(`Wait until`, {
        x: 1,
        y: 1,
        color: color`4`
      });
      addText(`the event finishes!`, {
        x: 1,
        y: 2,
        color: color`4`
      });
    }
  } else {
    addText(`Restarted! press K`, {
      x: 1,
      y: 1,
      color: color`4`
    });
    numberOfWood = 15;
    roundSurvived = 0;
    z = 1;
    events = 5;
    challenge = false;
    challengeState = false;
    setMap(level); // Ricarica il livello
    youLost = false;
  }



})

// Funzione per visualizzare il numero di blocchi rimanenti
function updateWoodCount() {
  clearText(); // Cancella il conteggio precedente
  addText(`Wood Remaining: ${numberOfWood}`, {
    x: 1,
    y: 1,
    color: color`3`
  });
  addText(`Round survived: ${roundSurvived}`, {
    x: 1,
    y: 2,
    color: color`9`
  });
}

// Aggiornamento iniziale del conteggio dei blocchi rimanenti
updateWoodCount();
onInput("l", () => {

  if (challenge == false) {
    PlaceWood();
    playTune(placed);
  }
});

// Definisci una funzione per eseguire il codice in loop
function gameLoop() {
  console.log(randomChallenge);
  if (challenge && youLost == false) {
    if (randomChallenge == 1) {
      ZapEvent();
      
    } else if (randomChallenge == 2) {
      RockLEvent();
      
    } else if (randomChallenge == 3) {
      RockREvent();
      
    }else if (randomChallenge == 4)
    {
      FireBallLEvent();
    }else if(randomChallenge == 5)
    {
      FireBallREvent();
    }
  }
}

// Imposta l'intervallo per eseguire la funzione gameLoop ogni tot millisecondi
const interval = setInterval(gameLoop, 300); // Esegui ogni secondo (1000 millisecondi)

function FireBallLEvent() {
  console.log("The value of z is: " + z);

  // Move the ROCK sprite down
  if (z == 1) {
    z = 1;

    pos = 2;
    var randomY = Math.floor(Math.random() * (14 - 4 + 1)) + 4;
    challengeState = true;
    addSprite(pos, 3, FIREBALL);
    z = 2;
  } else if(z === 2 ){
    const fireballSprite = getFirst(FIREBALL);
    fireballSprite.x += 1; // Move the ROCK sprite down
    fireballSprite.y += 1;

    // Check if the ROCK sprite hits a wood block
    const spritesAtFireball = getTile(fireballSprite.x, fireballSprite.y);

    spritesAtFireball.forEach(sprite => {
      if (sprite.type === wood) {
        z = 3;
        // If the ROCK hits a wood block, remove both sprites
        sprite.remove(); // Remove the wood block
        fireballSprite.remove(); // Remove the ROCK sprite
        playTune(collision);

        
      } 
        //ATTENTO
      else if(sprite.type === reinforcedWall)
      {
        z = 3;
        sprite.remove(); // Remove the wood block
        addSprite(fireballSprite.x, fireballSprite.y, wood);
        fireballSprite.remove(); // Remove the ROCK sprite
        playTune(collision);
        
      }
      else if (sprite.type === roof || sprite.type === roofl || sprite.type === pizzaOne || sprite.type === center || sprite.type === centerL || sprite.type === centerR) {
        z = 4;
        // If the ZAP hits a wood block, remove both sprites
        sprite.remove(); // Remove the wood block
        fireballSprite.remove(); // Remove the ZAP sprite

        
      }

    });

    if (fireballSprite.x == 18) {
      fireballSprite.remove();
      challengeState = false;
      challenge = false;
      z = 1;
      pos = 4;
      addText("press J", {
        x: 7,
        y: 5,
        color: color`4`
      })
    }else if (z == 3)
    {
      challengeState = false;
      challenge = false;
      z = 1;
      pos = 4;
      addText("press J", {
        x: 7,
        y: 5,
        color: color`4`
      })
    } else if (z == 4) {
      challengeState = false;
      GameOver();
    }
  }


}

function FireBallREvent() {
  console.log("The value of z is: " + z);

  // Move the ROCK sprite down
  if (z == 1) {
    z = 1;

    pos = 17;
    
    challengeState = true;
    addSprite(pos, 3, FIREBALLR);
    z = 2;
  } else if(z === 2 ) {
    const fireballSprite = getFirst(FIREBALLR);
    fireballSprite.x -= 1; // Move the ROCK sprite down
    fireballSprite.y += 1;

    // Check if the ROCK sprite hits a wood block
    const spritesAtFireball = getTile(fireballSprite.x, fireballSprite.y);

    spritesAtFireball.forEach(sprite => {
      if (sprite.type === wood) {
        z = 3;
        // If the ROCK hits a wood block, remove both sprites
        sprite.remove(); // Remove the wood block
        fireballSprite.remove(); // Remove the ROCK sprite
        playTune(collision);

        
      } 
        //ATTENTO
      else if(sprite.type === reinforcedWall)
      {
        z = 3;
        sprite.remove(); // Remove the wood block
        addSprite(fireballSprite.x, fireballSprite.y, wood);
        fireballSprite.remove(); // Remove the ROCK sprite
        playTune(collision);
        
      }
      else if (sprite.type === roof || sprite.type === roofl || sprite.type === pizzaOne || sprite.type === center || sprite.type === centerL || sprite.type === centerR) {
        z = 4;
        // If the ZAP hits a wood block, remove both sprites
        sprite.remove(); // Remove the wood block
        fireballSprite.remove(); // Remove the ZAP sprite

        
      }

    });

    if (fireballSprite.x == 2) {
      fireballSprite.remove();
      challengeState = false;
      challenge = false;
      z = 1;
      pos = 4;
      addText("press J", {
        x: 7,
        y: 5,
        color: color`4`
      })
    } else if (z == 3)
    {
      challengeState = false;
      challenge = false;
      z = 1;
      pos = 4;
      addText("press J", {
        x: 7,
        y: 5,
        color: color`4`
      })
    }else if (z == 4) {
      challengeState = false;
      GameOver();
    }
  }


}

function ZapEvent() {
  console.log("The value of z is: " + z);

  // Move the ZAP sprite down
  if (z == 1) {
    z = 1;
    pos = 3;
    var randomX = Math.floor(Math.random() * (16 - 3 + 1)) + 3;
    challengeState = true;
    addSprite(randomX, pos, ZAP);
    z = 2;
  } else if(z === 2 ){
    const zapSprite = getFirst(ZAP);
    zapSprite.y += 1; // Move the ZAP sprite down


    // Check if the ZAP sprite hits a wood block
    const spritesAtZap = getTile(zapSprite.x, zapSprite.y);

    spritesAtZap.forEach(sprite => {
      if (sprite.type === wood) {
        z = 3;
        // If the ZAP hits a wood block, remove both sprites
        sprite.remove(); // Remove the wood block
        zapSprite.remove(); // Remove the ZAP sprite
        playTune(collision);


      }
        //ATTENTO
      else if(sprite.type === reinforcedWall)
      {
        z = 3;
        sprite.remove(); // Remove the wood block
        addSprite(zapSprite.x, zapSprite.y, wood);
        zapSprite.remove(); // Remove the ROCK sprite
        playTune(collision);
        
        
      }
      else if (sprite.type === roof || sprite.type === roofl || sprite.type === pizzaOne) {
        z = 4;
        // If the ZAP hits a wood block, remove both sprites
        sprite.remove(); // Remove the wood block
        zapSprite.remove(); // Remove the ZAP sprite

        
      }

    });

    if (zapSprite.y == 15) {
      zapSprite.remove();
      challengeState = false;
      challenge = false;
      z = 1;
      pos = 4;
      addText("press J", {
        x: 7,
        y: 5,
        color: color`4`
      })
    }else if (z == 3)
    {
      challengeState = false;
      challenge = false;
      z = 1;
      pos = 4;
      addText("press J", {
        x: 7,
        y: 5,
        color: color`4`
      })
    } else if (z == 4) {
      challengeState = false;
      GameOver();
    }
  }


}

function RockLEvent() {
  console.log("The value of z is: " + z);

  // Move the ROCK sprite down
  if (z == 1) {
    z = 1;

    pos = 2;
    var randomY = Math.floor(Math.random() * (14 - 4 + 1)) + 4;
    challengeState = true;
    addSprite(pos, randomY, ROCK);
    z = 2;
  } else if(z===2){
    const rockSprite = getFirst(ROCK);
    rockSprite.x += 1; // Move the ROCK sprite down


    // Check if the ROCK sprite hits a wood block
    const spritesAtRock = getTile(rockSprite.x, rockSprite.y);

    spritesAtRock.forEach(sprite => {
      if (sprite.type === wood) {
        z = 3;
        // If the ROCK hits a wood block, remove both sprites
        sprite.remove(); // Remove the wood block
        rockSprite.remove(); // Remove the ROCK sprite
        playTune(collision);

        
      }
        //ATTENTO
      else if(sprite.type === reinforcedWall)
      {
        z = 3;
        sprite.remove(); // Remove the wood block
        addSprite(rockSprite.x, rockSprite.y, wood);
        rockSprite.remove(); // Remove the ROCK sprite
        playTune(collision);
        
      }
      else if (sprite.type === roof || sprite.type === roofl || sprite.type === pizzaOne) {
        z = 4;
        // If the ZAP hits a wood block, remove both sprites
        sprite.remove(); // Remove the wood block
        rockSprite.remove(); // Remove the ZAP sprite

        
      }

    });

    if (rockSprite.x == 18) {
      rockSprite.remove();
      challengeState = false;
      challenge = false;
      z = 1;
      pos = 4;
      addText("press J", {
        x: 7,
        y: 5,
        color: color`4`
      })
    } else if (z == 3)
    {
      challengeState = false;
      challenge = false;
      z = 1;
      pos = 4;
      addText("press J", {
        x: 7,
        y: 5,
        color: color`4`
      })
    }else if (z == 4) {
      challengeState = false;
      GameOver();
    }
  }


}

function RockREvent() {
  console.log("The value of z is: " + z);

  // Move the ROCKF sprite down
  if (z == 1) {
    z = 1;

    pos = 18;
    var randomY = Math.floor(Math.random() * (14 - 4 + 1)) + 4;
    challengeState = true;
    addSprite(pos, randomY, ROCKF);
    z = 2;
  } else if(z === 2 ) {
    const rockfSprite = getFirst(ROCKF);
    rockfSprite.x -= 1; // Move the ROCK sprite down


    // Check if the ROCK sprite hits a wood block
    const spritesAtRockf = getTile(rockfSprite.x, rockfSprite.y);

    spritesAtRockf.forEach(sprite => {
      if (sprite.type === wood) {
        z = 3;
        // If the ROCKF hits a wood block, remove both sprites
        sprite.remove(); // Remove the wood block
        rockfSprite.remove(); // Remove the ROCKF sprite
        playTune(collision);

        
      }
      //ATTENTO
      else if(sprite.type === reinforcedWall)
      {
        z = 3;
        sprite.remove(); // Remove the wood block
        addSprite(rockfSprite.x, rockfSprite.y, wood);
        rockfSprite.remove(); // Remove the ROCK sprite
        playTune(collision);
        
      }
      else if (sprite.type === roof || sprite.type === roofl || sprite.type === pizzaOne) {
        z = 4;
        // If the ZAP hits a wood block, remove both sprites
        sprite.remove(); // Remove the wood block
        rockfSprite.remove(); // Remove the ZAP sprite

        
      }

    });

    if (rockfSprite.x == 2) {
      rockfSprite.remove();
      challengeState = false;
      challenge = false;
      z = 1;
      pos = 4;
      addText("press J", {
        x: 7,
        y: 5,
        color: color`4`
      })
    }else if (z == 3)
    {
      challengeState = false;
      challenge = false;
      z = 1;
      pos = 4;
      addText("press J", {
        x: 7,
        y: 5,
        color: color`4`
      })
    } else if (z == 4) {

      challengeState = false;
      GameOver();
    }

  }


}

function PlaceWood() {
  const cursorSprite = getFirst(cursor);
  const cursorX = cursorSprite.x;
  const cursorY = cursorSprite.y;

  // Verifica se il posto nella mappa è vuoto
  const spritesAtCursor = getTile(cursorX, cursorY);
  const isEmpty = spritesAtCursor.every(sprite => sprite.type === cursor);
  const isWood = spritesAtCursor.every(sprite => sprite.type === wood);
  
  
  if (isEmpty && numberOfWood > 0) {
    // Aggiungi lo sprite alla posizione del cursore sulla mappa solo se è vuoto
    addSprite(cursorX, cursorY, wood); // Sostituisci "wood" con lo sprite desiderato
    numberOfWood--;
    updateWoodCount();
  } 
    
  
  else if (numberOfWood == 0) {
    addText(`Press j to continue!`, {
      x: 0,
      y: 2,
      color: color`3`
    });
  }
  //ATTENTO
spritesAtCursor.forEach(sprite => {
 if(sprite.type === wood && numberOfWood > 0)
  {
    sprite.remove();
    addSprite(cursorX, cursorY, reinforcedWall); // Sostituisci "wood" con lo sprite desiderato 
    numberOfWood--;
    updateWoodCount();
    
  }
});
}

function EventSystem() {
  if (events == 5) {
    playTune(start);
    randomChallenge = Math.floor(Math.random() * 5) + 1;
    addText("Event started", {
      x: 4,
      y: 4,
      color: color`4`
    })
    addText("press J", {
      x: 7,
      y: 5,
      color: color`4`
    })

    events--;
  } else if (events > 0) {
    randomChallenge = Math.floor(Math.random() * 3) + 1;
    clearText();

    events--;
  } else {
    playTune(win)
    challenge = false;
    roundSurvived++;
    numberOfWood = 3;
    updateWoodCount();
    events = 5;
  }



}

function GameOver() {
  playTune(gameOver);
  clearText();
  youLost = true;

  addText("Game Over!", {
    x: 5,
    y: 5,
    color: color`3`
  })
  addText(`you survived`, {
    x: 1,
    y: 6,
    color: color`3`
  })
  addText(`for: ${roundSurvived} round!`, {
    x: 6,
    y: 7,
    color: color`3`
  })

}
