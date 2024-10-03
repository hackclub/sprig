/*
@title: love-bug
@author: b3arora
@tags: []
@addedOn: 2024-08-13
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

*/

//too many bombs
//weird scoring system
let gameOver = false
let newChar = ""
let score = 0
let inputCount = 0


const player = "p"
const heart = "h"
const bomb = "b"
const explosion = "e"
const gameover = "s"
const backgroundtiles = "t"

const music = tune`
500: C5~500,
500: E5~500,
500: G5~500,
500,
500: A5~500,
500,
500: G5~500,
500,
500: E5~500,
500,
500: D5~500,
500,
500: C5~500,
500,
500: B4~500,
500,
500: A4~500,
500,
500: B4~500,
500,
500: C5~500,
500: E5~500,
500: G5~500,
500,
500: A5~500,
500,
500: G5~500,
500: E5~500,
500: C5~500,
500,
500: B4~500,
500: D5~500`
const dead = tune`
300: D5^300,
300: C5^300,
300: B4^300,
300: A4^300,
300: G4^300,
300: C4^300,
7800`
const playback = playTune(music, Infinity)

setLegend(
  [player, bitmap`
................
...0000000......
..003333300.....
.00333333300....
.03330330330....
.03333333330....
.03333333330000.
.03333333333330.
.03333333330000.
.03333333333330.
.03333333330000.
.03000000030....
.030.....030....
.030.....030....
.000.....000....
................` ],
  [bomb, bitmap`
................
................
................
....CC...CC.....
...CCCC.CCCC....
...CCCC..CCC....
...CCC..CCCC....
...CCCC.CCCC....
....CCC..CC.....
.....CC.CC......
......C.C.......
.......C........
................
................
................
................` ],
  [heart, bitmap`
................
................
................
................
................
................
.....33.33......
.....33333......
......333.......
.......3........
................
................
................
................
................
................` ],
  [explosion, bitmap `
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
  [gameover, bitmap`
................
......2222......
.....222222.....
.....202202.....
.....222222.....
....2.2222.2....
...22..22..22...
.....2....2.....
......2..2......
.......21.......
.......12.......
......2..2......
....22....22....
.....2....2.....
................
................`],
  [backgroundtiles, bitmap`
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
0000000000000000`]
);

setSolids([bomb]);


let level = 0
const levels = [
  map`
............
.....hhh...h
.h..........
h....h......
........b...
.h..........
.....hh...h.
..........h.
.h....h.....
............`
]

setMap(levels[level]);

setPushables({
  [ player ]: []
})

onInput("s", () => {
  getFirst(player).y += 1
  inputCount = inputCount + 1
})

onInput("w", () => {
  getFirst(player).y -= 1
  inputCount = inputCount + 1
})


onInput("d", () => {
  getFirst(player).x += 1
  inputCount = inputCount + 1
})

onInput("a", () => {
  getFirst(player).x -= 1
  inputCount = inputCount + 1
})


setBackground(backgroundtiles)

const heartBomb = (x, y) => {
  hearts = getAll(heart);
}
heartPosition = getAll(heart);
heartX = heart.x
heartY = heart.y


addText("collect hearts", {x: 3, y: 6, size: 1, color: color`2`});
setTimeout(() => {
  clearText();
  addText("remove", {x: 7, y: 6, size: 1, color: color`2`}); 
  addText("broken hearts", {x: 4, y: 7, size: 1, color: color`2`});
  setTimeout(() => {
    clearText();
    addText("collide them", {x: 4, y: 6, size: 1, color: color`2`});
    addText("with hearts", {x: 5, y: 7, size: 1, color: color`2`});
    //addText("hearts", {x: 8, y: 8, size: 1, color: color`2`});
    setTimeout(() => {
      clearText();
      addText("don't get hit", {x: 4, y: 7, size: 1, color: color`2`});
      setTimeout(() => {
        clearText();
        addText("good luck!", {x: 5, y: 7, size: 1, color: color`2`});
        setTimeout(() => {
          clearText();
          addSprite(0, 1, "p");
        }, 2000)
      }, 2000)
    }, 2000)
  }, 2000)
}, 2000)


newcharactergen = () => {
  if (gameOver) {
    getAll(heart).forEach(sprite => {
        sprite.remove();
      });
    getAll(bomb).forEach(bombs => {
      bombs.remove()
    });
  } else { 
    randomCharacter = Math.floor(Math.random() * 4) + 1
      switch (randomCharacter) {
        case 1:
          newChar = "h";
          break;
        case 2:
          newChar = "h";
          break;
        case 3:
          newChar = "h";
          break;
        case 4:
          newChar = "b";
          break;
        }

    let bombNumber = getAll(bomb)
    if (bombNumber.length > 0) {
      newChar = "h"
    }
      
        
    let xCo = Math.floor(Math.random() * 11) + 1
    let yCo = Math.floor(Math.random() * 9) + 1
    let playerCo = getFirst(player)
    //let intervalId = intervalId + 2000

    addSprite(xCo, yCo, newChar)
        
  }
}
  
afterInput(() => {
  const playerSprite = getFirst(player);
  const heartSprites = getAll(heart);
  const bombSprite = getFirst(bomb);

  addText(score.toString(), {x: 17, y: 1, size: 1, color: color`1`});
  
  if (bombSprite) {
    heartSprites.forEach(heartSprite => {
      if (playerSprite.x === heartSprite.x && playerSprite.y === heartSprite.y) {
        score += 1;
        console.log('number one:',score)
        heartSprite.remove();
      }
      
  
    //diffusing bombs if collide with hearts                    
      if (bombSprite.x === heartSprite.x && bombSprite.y === heartSprite.y) {
        bombSprite.remove();
        heartSprite.remove();     
      }
    });
      if (bombSprite) {
        const xposition = playerSprite.x - bombSprite.x;
        const yposition = playerSprite.y - bombSprite.y;
      
        if (Math.abs(xposition) > Math.abs(yposition)) {
          bombSprite.x += Math.sign(xposition);
        } else {
          bombSprite.y += Math.sign(yposition);
        }
      }
    
  //checking if any bombs remain
  } else if (!bombSprite) {
    heartSprites.forEach(heartSprite => {
      if (playerSprite.x === heartSprite.x && playerSprite.y === heartSprite.y) {
        score += 1;
        console.log('number two:',score)
        heartSprite.remove();
      }
    });
  }

   //game over code, player collides with bomb 
    if ((bombSprite && playerSprite.x === bombSprite.x && playerSprite.y === bombSprite.y) || gameOver === true) { 
      getAll(heart).forEach(sprite => {
        sprite.remove();
      });
      getAll(bomb).forEach(bombs => {
        bombs.remove()
      });
      playback.end(music);
      playTune(dead);
      addText("game over", {x: 5, y: 6, color: color`2`});
      addSprite(5, 5, "s");
      gameOver = true;
    //generation of a new character, bomb or heart
    } else if (gameOver === false && inputCount === 3) {
      newcharactergen()
      inputCount = 0
    }
  });
