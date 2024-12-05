/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Apple_Drop
@author: wvminecraftkid
@tags: []
@addedOn: 2024-10-30
*/

const player = "p"
const apple = "a"
const background = "b"
const song = tune`
297.029702970297: G4/297.029702970297,
297.029702970297,
297.029702970297: C5/297.029702970297,
297.029702970297,
297.029702970297: C5/297.029702970297,
297.029702970297: D5/297.029702970297,
297.029702970297: E5/297.029702970297,
297.029702970297: D5/297.029702970297,
297.029702970297: C5/297.029702970297,
297.029702970297: A4/297.029702970297,
297.029702970297: G4/297.029702970297,
297.029702970297,
297.029702970297: C5/297.029702970297,
297.029702970297: B4/297.029702970297,
297.029702970297: C5/297.029702970297,
594.059405940594,
297.029702970297: G4/297.029702970297,
297.029702970297: C5/297.029702970297,
297.029702970297,
297.029702970297: C5/297.029702970297,
297.029702970297: D5/297.029702970297,
297.029702970297: E5/297.029702970297,
297.029702970297: D5/297.029702970297,
297.029702970297: C5/297.029702970297,
297.029702970297: A5/297.029702970297,
297.029702970297: G5/297.029702970297,
1485.148514851485`
const ding = tune`
150,
150: B4-150,
150: G5-150,
4350`
const death = tune`
333.3333333333333,
333.3333333333333: E4/333.3333333333333 + C5/333.3333333333333,
333.3333333333333,
333.3333333333333: G4/333.3333333333333 + C4/333.3333333333333,
333.3333333333333,
333.3333333333333: G4/333.3333333333333 + E4/333.3333333333333,
333.3333333333333,
333.3333333333333: F4/333.3333333333333 + A4/333.3333333333333,
333.3333333333333: F4/333.3333333333333 + B4/333.3333333333333,
333.3333333333333: F4/333.3333333333333 + A4/333.3333333333333,
333.3333333333333: F4/333.3333333333333 + G4/333.3333333333333,
333.3333333333333: F4/333.3333333333333 + A4/333.3333333333333,
333.3333333333333: G4/333.3333333333333 + F4/333.3333333333333,
333.3333333333333: E4/333.3333333333333 + G4/333.3333333333333,
333.3333333333333: E4/333.3333333333333 + G4/333.3333333333333,
333.3333333333333: E4/333.3333333333333 + G4/333.3333333333333,
333.3333333333333: G4/333.3333333333333 + E4/333.3333333333333,
5000`


const playback = playTune(song, Infinity)
const black = "d"

let gameOver = false;


function setup(callback) {
  callback()
}

function forever(callback) {
  setInterval(callback, 10000 / 65); 
}

setLegend(
  [ player, bitmap`
.0............0.
.000........000.
..L0000000000L..
..L..........L..
..L..LLLLLL..L..
..L..L0LL0L..L..
..L.1L0LL0L1.L..
..L.1LLLLLL1.L..
..L..LL00LL..L..
..LLLLLLLLLLLL..
...LLLLLLLLLL...
.....LLLLLL.....
.....LLLLLL.....
.....LLLLLL.....
.....L....L.....
....LLL..LLL....` ],
  [ background, bitmap `
CL666666666666LC
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
C66666666666666C
CL666666666666LC`],
  [ apple, bitmap`
........DD......
........D.......
.....33FD33.....
...333FDD3333...
...333FD33933...
..33333D333933..
..333333333933..
..333333333333..
..333333333333..
..3C3333333333..
..3C3333333333..
...3C33333333...
...33CC333333...
.....333333.....
................
................`
  ],
  [ black, bitmap`
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

)

setSolids([])

setBackground("b")
let level = 0
const levels = [
  map`
d..a..d
d.....d
d.....d
d.....d
d.....d
d..p..d`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})
setSolids([ player, black ])

setup(() => {
  let playerPoints = 0;
  let appleExists = true;

  addText("A", {x:2, y:3, color: color`3`});
  addText("P", {x:2, y:4, color: color`4`});
  addText("P", {x:2, y:5, color: color`3`});
  addText("L", {x:2, y:6, color: color`4`});
  addText("E", {x:2, y:7, color: color`3`});

  addText("D", {x:2, y:9, color: color`4`});
  addText("R", {x:2, y:10, color: color`3`});
  addText("O", {x:2, y:11, color: color`4`});
  addText("P", {x:2, y:12, color: color`3`});
  
  addText("P", {x:17, y:1, color: color`2`});
  addText("o", {x:17, y:2, color: color`2`});
  addText("i", {x:17, y:3, color: color`2`});
  addText("n", {x:17, y:4, color: color`2`});
  addText("t", {x:17, y:5, color: color`2`});
  addText("s", {x:17, y:6, color: color`2`});

  addText("0", {x:17, y:8, color: color`H`});
  
  forever(() => {
    const playerSprite = getFirst(player);
    const appleSprite = getFirst(apple);

    if (!appleExists && !appleSprite) {
      const newX = Math.floor((Math.random() * 5)+1);
      const newY = 0;
      addSprite(newX, newY, apple);
      appleExists = true;
    }

    if (playerSprite && appleSprite) {
      if (appleSprite.y === playerSprite.y - 1 && appleSprite.x === playerSprite.x) {
        playerPoints++;
        playTune(ding)
        clearText();
        addText("A", {x:2, y:3, color: color`3`});
        addText("P", {x:2, y:4, color: color`4`});
        addText("P", {x:2, y:5, color: color`3`});
        addText("L", {x:2, y:6, color: color`4`});
        addText("E", {x:2, y:7, color: color`3`});

        addText("D", {x:2, y:9, color: color`4`});
        addText("R", {x:2, y:10, color: color`3`});
        addText("O", {x:2, y:11, color: color`4`});
        addText("P", {x:2, y:12, color: color`3`});
        
        addText("P", {x:17, y:1, color: color`2`});
        addText("o", {x:17, y:2, color: color`2`});
        addText("i", {x:17, y:3, color: color`2`});
        addText("n", {x:17, y:4, color: color`2`});
        addText("t", {x:17, y:5, color: color`2`});
        addText("s", {x:17, y:6, color: color`2`});
        
        addText(`${playerPoints}`, { x: 17, y: 8, color: color`H` });
        appleSprite.remove();
        appleExists = false;
      }
    }

    if (appleExists && appleSprite) {
      if (appleSprite.y < height() - 1) {
        clearTile(appleSprite.x, appleSprite.y);
        appleSprite.y++;
        addSprite(appleSprite.x, appleSprite.y, apple);
      } else {
        // Game over when apple reaches the bottom
        if (!gameOver) {
        playback.end()
        playTune(death)
        clearText();
         addText("P", {x:17, y:1, color: color`2`});
        addText("o", {x:17, y:2, color: color`2`});
        addText("i", {x:17, y:3, color: color`2`});
        addText("n", {x:17, y:4, color: color`2`});
        addText("t", {x:17, y:5, color: color`2`});
        addText("s", {x:17, y:6, color: color`2`});
        
        addText(`${playerPoints}`, { x: 17, y: 8, color: color`H` });
        
        addText("G", { x: 2, y: 3, color: color`3`, size: 4 });
        addText("A", { x: 2, y: 4, color: color`3`, size: 4 });
        addText("M", { x: 2, y: 5, color: color`3`, size: 4 });
        addText("E", { x: 2, y: 6, color: color`3`, size: 4 });
        addText("O", { x: 2, y: 8, color: color`3`, size: 4 });
        addText("V", { x: 2, y: 9, color: color`3`, size: 4 });
        addText("E", { x: 2, y: 10, color: color`3`, size: 4 });
        addText("R", { x: 2, y: 11, color: color`3`, size: 4 });

        gameOver = true;
        // Additional game over logic can be added here
      }}
    }
  });
});

onInput("a", () => {
  const playerSprite = getFirst(player);
  playerSprite.x -= 1;
  playerSprite.bitmap = bitmap`
   .00..........00.
   ..0..........0..
   ..00........00..
   ...0000000000...
   ....L......L....
   ....L.0L0L.L....
   ....L.0L0L.L....
   ....L.LLLL.L....
   .....LL0LLL.....
   ......LLLL......
   ......LLLL......
   ......LLLL......
   ......LLLL......
   ......L..L......
   ......L..L......
   .....LL.LL......`;
});


onInput("d", () => {
  const playerSprite = getFirst(player);
  playerSprite.x += 1;
});
