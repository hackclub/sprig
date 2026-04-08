/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: goated game
@author: 
@tags: []
@addedOn: 2025-00-00
*/
const player = "p"
const apple = "a"
const boardco1 = "c"
const boardco2 ="b"
const boarder = "k"
const chooser ="l"
const teleport1 = "t"
const teleport2 = "d"
const player2 = "P"

setLegend(
  [player, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333003333003333
3333003333003333
3333333333333333
3333333333333333
3333333333333333
3333330000333333
3333300000033333
3333000000003333
3333000000003333
3333300000033333
3333330000333333
3333333333333333` ],
  [player2,bitmap`
5555555555555555
5555555555555555
5555555555555555
5555LLL555LLL555
5555LLL555LLL555
5555555555555555
5555555555555555
5555555555555555
555LLLLLLLLLLL55
5555LLLLLLLLL555
55555LLLLLLL5555
555555LLLLL55555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [apple, bitmap`
................
................
........0.......
.......0.0......
...00..0...00...
..0D00000000D0..
.0DDDDDDDDDDDD0.
.0DDDDDDDDDDDD0.
.0DDDDDDDDDDDD0.
.0DDDDDDDDDDDD0.
.0DDDDDDDDDDDD0.
.0DDDDDDDDDDDD0.
.00DDDDDDDDDD00.
..00DDDDDDDD00..
...00DDDDDD00...
....00000000....`],
  [boardco1,bitmap`
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
LLLLLLLLLLLLLLLL`],
  [boardco2,bitmap`
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
1111111111111111`],
  [boarder,bitmap`
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
  [chooser,bitmap`
.75555....55557.
7557........7557
557..........755
57............75
5..............5
5..............5
................
................
................
................
5..............5
5..............5
57............75
557..........755
7557........7557
.75555....55557.`],
  [teleport1,bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222555222222
2222225552222222
2222255252222222
2222552252222222
2222222252222222
2222222252222222
2222222252222222
2222222252222222
2222222252222222
2222555555552222
2222222222222222
2222222222222222
2222222222222222`],
  [teleport2,bitmap`
2222222222222222
2222222222222222
2222222222222222
2222225552222222
2222255225222222
2222252225222222
2222222255222222
2222222552222222
2222225522222222
2222225222222222
2222225555552222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
)

setSolids([])

let level = 0
const levels = [
  map`
............
............
............
............
............
............
............
..t......d..
............`,
  map`
kkkkkkkkkkkk
kcbcbcbcbcbk
kbcbcbcbcbck
kcbcbcbcbcbk
kbcbcbcbcbck
kcbcbcbcbcbk
kbcbcbcbcbck
kcbcbcbcbcbk
kbcbcbcbcbck
kkkkkkkkkkkk`,
  map`
kkkkkkkkkkkkkk
kcbcbcbcbcbcbk
kbcbcbcbcbcbck
kcbcbcbcbcbcbk
kbcbcbcbcbcbck
kcbcbcbcbcbcbk
kbcbcbcbcbcbck
kkkkkkkkkkkkkk`,
  map`
.......
.......
.......
.......
.......`,
]


setMap(levels[level])

setPushables({
  [ player ]: []
})

addSprite(2,2,chooser);

if (level === 0) {
  addText("Tims GOATED GAME", { y: 2, color: "3" }); 
  addText("1 Player: Touch 1", { y: 6, color: "L" });
  addText("1v1 Mode: Touch 2", { y: 8, color: "L" });
}

let score = 0
let direction = "";
let score2 = 0;
let direction2 = "";
let is1v1 = false;

//movement

onInput("w", () => {
  if (level === 0) {
    const c = getFirst(chooser);
    if (c) c.y -= 1;
  } else {
    direction = "up";
  }
});

onInput("s", () => {
  if (level === 0) {
    const c = getFirst(chooser);
    if (c) c.y += 1;
  } else {
    direction = "down";
  }
});

onInput("a", () => {
  if (level === 0) {
    const c = getFirst(chooser);
    if (c) c.x -= 1;
  } else {
    direction = "left";
  }
});

onInput("d", () => {
  if (level === 0) {
    const c = getFirst(chooser);
    if (c) c.x += 1;
  } else {
    direction = "right";
  }
});

onInput("i", () => { if (is1v1) direction2 = "up"; });
onInput("k", () => { if (is1v1) direction2 = "down"; });
onInput("j", () => { if (is1v1) direction2 = "left"; });
onInput("l", () => { if (is1v1) direction2 = "right"; });

function gameLoop(){
  
  // --- LOBBY LOGIC ---
  if (level === 0) {
    const c = getFirst(chooser);
    if (!c) return;

    const tilesUnderChooser = getTile(c.x, c.y);
    
    // If chooser touches t
    if (tilesUnderChooser.some(tile => tile.type === teleport1)) {
      level = 1;
      setMap(levels[level]);
      clearText();
      c.remove();
      addSprite(4, 5, player); 
      addSprite(6, 7, apple);
      spawnApple();
      moveLoopP1();
    }

    // if chooser touches d
    else if (tilesUnderChooser.some(tile => tile.type === teleport2)) {
      level = 2; 
      is1v1 = true;
      setMap(levels[level]);
      clearText();
      c.remove();
      addSprite(2, 3, player);  
      addSprite(11, 3, player2); 
      addSprite(7, 3, apple); 
      spawnApple();
      moveLoopP1();
      moveLoopP2();
    }

    setTimeout(gameLoop, 100); 
    return; 
  }
  


//end of gameloop
}gameLoop()

function getRandomInt(min, max) {
  min = Math.ceil(min);  
  max = Math.floor(max);  
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function resetP1() {
  const p = getFirst(player);
  if (p) {
    direction = "";
    addText("Score: " + score,{y: 6, color: "3"});
    score = 0;
    p.x = 4;         
    p.y = 5;  
    setTimeout(() => {
      clearText();
    }, 3000);
  }
}

function endGame(msg) {
  level = 3;
  setMap(levels[level]);
  getAll(player).forEach(p => p.remove());
  getAll(player2).forEach(p => p.remove());
  getAll(apple).forEach(a => a.remove());
  
  clearText(); 
  
  addText(msg, { y: 4, color: "3" }); 
  
  addText("Score: " + score + " - " + score2, { y: 6, color: "L" });

  
}

function spawnApple() {
  const a = getFirst(apple);
  if (!a) return; 

  let maxX, maxY;

  if (level === 2) {
    maxX = 12; 
    maxY = 6;  
  } else {
    maxX = 10; 
    maxY = 8;  
  }

  a.x = getRandomInt(1, maxX);
  a.y = getRandomInt(1, maxY);
}

// MOVEMENT 

function movePlayer(sprite, dir) {
  if (!sprite || dir === "") return "ok";
  let nX = sprite.x;
  let nY = sprite.y;
  if (dir === "up") nY -= 1;
  if (dir === "down") nY += 1;
  if (dir === "left") nX -= 1;
  if (dir === "right") nX += 1;

  // Check for walls
  const hit = getTile(nX, nY).some(t => t.type === boarder);
  if (hit) return "wall";

  sprite.x = nX;
  sprite.y = nY;

  // check for apple
  const a = getFirst(apple);
  if (a && sprite.x === a.x && sprite.y === a.y) return "apple";
  return "ok";
}

// PLAYER 1 
function moveLoopP1() {
  if (level === 0 || level === 3) return;
  const p = getFirst(player);
  if (!p) return;

  const res = movePlayer(p, direction);
  
  if (res === "wall") {
    if (is1v1) endGame("PLAYER 2 WINS!"); else resetP1();
    return; 
  } else if (res === "apple") {
    score++;
    spawnApple();
  }

  if (is1v1 && score>= 10) { 
    endGame("PLAYER 1 WINS!"); 
    return; 
  }

  let speed = 1000 / (score + 1);
  setTimeout(moveLoopP1, speed);
}

// PLAYER 2 
function moveLoopP2() {
  if (!is1v1 || level === 0 || level === 3) return;
  const p2 = getFirst(player2);
  if (!p2) return;

  const res = movePlayer(p2, direction2);
  
  if (res === "wall") {
    endGame("PLAYER 1 WINS!");
    return; 
  } else if (res === "apple") {
    score2++;
    spawnApple();
  }

  if (score2 >= 10) { endGame("PLAYER 2 WINS!"); return; }

  let speed = 1000 / (score2 + 1);
  setTimeout(moveLoopP2, speed);
}