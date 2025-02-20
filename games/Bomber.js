/*
First time? Check out the tutorial gamehttps://sprig.hackclub.com/gallery/getting_started

In this game you will have to move trough the map while fighting off monsters, get the dropped springs and bombs, destroy the walls that get in your way and reach the door of salvation.

Use A and D to move left and right, W to jump (when you have the spring you can jump higher), J and L to throw bomb left or right.

@title: bomber
@author: Paolo08
@tags: [#adventure, #action, #platformer]
@addedOn: 2025-02-14
*/



const melody = tune`
179.64071856287424,
179.64071856287424: D5^179.64071856287424,
179.64071856287424: A5~179.64071856287424 + D5^179.64071856287424,
179.64071856287424: E5^179.64071856287424 + A5~179.64071856287424,
179.64071856287424: A5~179.64071856287424,
179.64071856287424: A5~179.64071856287424 + F5^179.64071856287424,
179.64071856287424: C5^179.64071856287424 + G5~179.64071856287424,
179.64071856287424: C5^179.64071856287424 + G5~179.64071856287424,
179.64071856287424: C5^179.64071856287424 + F5~179.64071856287424,
179.64071856287424: A4^179.64071856287424,
179.64071856287424: A4^179.64071856287424 + F5~179.64071856287424,
179.64071856287424: A4^179.64071856287424 + F5~179.64071856287424,
179.64071856287424: B4^179.64071856287424,
179.64071856287424: C5^179.64071856287424 + D5^179.64071856287424,
179.64071856287424,
179.64071856287424: D5^179.64071856287424 + C5~179.64071856287424,
179.64071856287424: C5^179.64071856287424 + D5~179.64071856287424,
179.64071856287424,
179.64071856287424: C5^179.64071856287424,
179.64071856287424: E5^179.64071856287424,
179.64071856287424: E5^179.64071856287424,
179.64071856287424: E5^179.64071856287424,
179.64071856287424: D5^179.64071856287424 + C5^179.64071856287424 + G4^179.64071856287424,
179.64071856287424: G4^179.64071856287424,
179.64071856287424: G4^179.64071856287424,
179.64071856287424: A4^179.64071856287424 + G4^179.64071856287424,
179.64071856287424: C5^179.64071856287424 + A4^179.64071856287424 + B4~179.64071856287424,
179.64071856287424: C5^179.64071856287424 + B4~179.64071856287424,
179.64071856287424: D5^179.64071856287424 + B4^179.64071856287424,
179.64071856287424: B4^179.64071856287424 + D5~179.64071856287424,
179.64071856287424: B4^179.64071856287424 + F5^179.64071856287424 + D5~179.64071856287424,
179.64071856287424: D5^179.64071856287424 + E5~179.64071856287424`
const melody1 = tune`
208.33333333333334: E5-208.33333333333334,
6458.333333333334`
const melody2 = tune`
123.96694214876032: E5-123.96694214876032,
123.96694214876032: C5-123.96694214876032 + E5~123.96694214876032,
123.96694214876032: E5~123.96694214876032 + D5^123.96694214876032,
123.96694214876032: E5-123.96694214876032 + D5^123.96694214876032,
123.96694214876032: C5-123.96694214876032 + E5~123.96694214876032 + D5^123.96694214876032,
123.96694214876032: E5~123.96694214876032 + D5^123.96694214876032,
123.96694214876032: E5-123.96694214876032 + D5^123.96694214876032,
123.96694214876032: F5-123.96694214876032 + G5~123.96694214876032 + D5^123.96694214876032,
123.96694214876032: F5~123.96694214876032 + D5^123.96694214876032,
123.96694214876032: F5-123.96694214876032 + D5^123.96694214876032,
123.96694214876032: G5~123.96694214876032 + D5^123.96694214876032,
123.96694214876032: G5-123.96694214876032 + F5^123.96694214876032 + D5^123.96694214876032,
123.96694214876032: G5~123.96694214876032 + D5^123.96694214876032,
123.96694214876032: G5-123.96694214876032 + A5~123.96694214876032 + D5^123.96694214876032,
123.96694214876032: G5-123.96694214876032 + D5^123.96694214876032,
123.96694214876032: G5-123.96694214876032 + A5~123.96694214876032 + D5^123.96694214876032,
123.96694214876032: F5-123.96694214876032 + G5~123.96694214876032 + D5^123.96694214876032,
123.96694214876032: F5~123.96694214876032 + D5^123.96694214876032 + E5-123.96694214876032,
123.96694214876032: E5~123.96694214876032 + C5-123.96694214876032 + D5^123.96694214876032,
1611.5702479338843`
const JumpHigh = tune`
96.7741935483871: B4-96.7741935483871,
96.7741935483871: E5/96.7741935483871 + F5/96.7741935483871 + C5^96.7741935483871,
96.7741935483871: G5/96.7741935483871,
2806.451612903226`

const playback = playTune(melody, Infinity)

const player = "p"
const enemy1= "e"
const background= "b"
const floor= "f"
const wallr= "r"
const door= "d"
const spring= "s"
const blackholeR= "h"
const blackholeL= "q"
const enemy2= "a"
const bomb= "o"
const unbreakable = "u"
const explosion = "x"
const cloud = "c"
const ground = "g"
const player1 ="y"
const bombIcon = "j"
let exist = false;
let spawnedL = false;
let spawnedR = false;
let hit = false;
let canJump = true;
let explosioncount = false;
var text = 0;
var text1 = 0;
var enemy2c = 0;
var enemy1c = 0;
var jumpcount = 0;
var bombcount = 0;

setLegend(
  [ player, bitmap`
......LLLL......
.....LLLLLL.....
.....L8888L.....
.....L7887L.....
......8888......
...LLLLLLLLLL...
...11LLLLLL11...
...11LLLLLL11...
...1100000011...
...1100000011...
...1100000011...
...1100000011...
...1100000011...
....LL....LL....
....LL....LL....
...LLL....LLL...` ],
  [ enemy1, bitmap`
................
....DDDDDDDD....
....DDDDDDDD....
....DDDDDDDD....
....DDDDDDDD....
....DD3DD3DD....
....DDDDDDDD....
...CCCCCCCCCC...
...CCCCCCCCCC...
.....L1L1.......
.....1L1L.......
........1LL.....
.....L11L11.....
.....1L11.......
........LL1.....
.....1L1L1L.....` ],
  [ background, bitmap`
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
7777777777777777` ],
  [ floor, bitmap`
0000000000000000
0444444444444440
0C4CC4C44C4CC4C0
0C4CC4CCCCCC4CC0
0CCCCCFCCFCCCCF0
0FFCCCCCCCCFCCC0
0CCCFCFCCCCCFCC0
0CFCCCCFFCCCCCF0
0CCCCCCCCCCFCCC0
0000000000000000
................
................
................
................
................
................` ],
  [ wallr, bitmap`
1000000000000001
0CCCCCCCFCCCCCC0
0FCCCFCFCCCCCFC0
0CCCFCCFFCCFCFC0
0FCFFCCFCCCCCFC0
0CCCCFCCCCCCCCF0
0CFCFFCCCCCFCCC0
0CFCCCCCFFCFFCC0
0CCCCFFCCCCFCFC0
0CCCCCCCCCFFCCC0
0CFCCFFCCCCCCCC0
0CFCCCFCCFFCFCC0
0CCCFCCCCFCFCCF0
0CFCFCCCCCCCCCF0
0FCCCFCCFFCCCFC0
1000000000000001` ],
  [ door, bitmap`
...05CCCCCC50...
...55CCCCCC55...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCCCC...
...CCCCCCCC6C...
...CCCCCCCCCC...
.3.CCCCCCCCCC.3.
363CCCCCCCCCC363
.F.55CCCCCC55.F.
.F.05CCCCCC50.F.
D4DDDD4DDD4DD4DD
DD4D4DD4D4D4DDD4
CCCCCCCCCCCCCCCC` ],
  [ spring, bitmap`
................
.........1L1111L
.........L11L...
............LLL1
.........1111111
.........L11L...
............LLL1
.........1L11111
.........L111...
............111L
.........L11L111
.........11L1...
............LL1L
.........1L1L1L1
................
................` ],
  [ blackholeR, bitmap`
.............000
............0088
...........0HHH8
..........00H8H0
.........00HHH00
.........08H8000
.........0HH8000
.........08HH000
.........088H000
.........0H8H000
.........0HH8000
.........08H8000
.........08HH800
.........00H88H0
..........0000HH
...........0000H` ],
  [ blackholeL, bitmap`
0...............
000.............
H000............
8HH000..........
0H8800..........
00H8H0..........
0008800.........
0008800.........
000H800.........
0008H00.........
0008H00.........
008H00..........
08HH00..........
88000...........
H0000...........
0000............` ],
  [ enemy2, bitmap`
................
......93........
......3L........
........L.......
........L.......
......0000......
......0000......
......0000......
....L.0000.L....
.....LLLLLL.....
....99999999....
....69699696....
....96566569....
....99699699....
....99999999....
....99999999....` ],
  [ bomb, bitmap`
................
................
................
................
......93........
......3L........
........L.......
........L.......
......00000.....
......00000.....
......00000.....
......00000.....
......00000.....
................
................
................` ],
  [ unbreakable, bitmap`
1000000000000001
0LLLLLLLLLLLLLL0
0LL12LLLLLLLLLL0
0L211LLLLLLLLLL0
0L11LLLLLLLLLLL0
0LLLLLLLLLLLLLL0
0LLLLLLLLLL2L2L0
0LLLLLLLLL1L1LL0
0LLLLLLLLLL2LLL0
0LLLLLLLLL1LL1L0
0LLLLLLLL1LL21L0
0LLLLLLL12L12L10
0LLLLL212LLLL120
0LLLLL1LLL121LL0
0LLLLLLLLLLLLLL0
1000000000000001` ],
  [ explosion, bitmap`
................
..99.9..9.9.99..
.96.9999996939..
...993339399399.
..3936696666339.
.3999696669963..
.33696696669339.
.336666999993...
.333369966693.9.
.393996999993...
..33933669339.3.
..9993369993933.
...39..9336.33..
...99..3933.....
................
................` ],
  [ cloud, bitmap`
................
................
................
................
................
................
................
.......0000.....
......022220....
..000.022220.00.
.022202222220220
0222222222222220
0222222222222220
.00000000000000.
................
................` ],
  [ ground, bitmap`
0000000000000000
0444444444444440
0D44DD44DD44DD40
0DDDDDDDDDDDDDD0
0CDCDCDCDCDCDCD0
0CCCCCCCCCCCCCC0
0CCFCCCCCCCCFCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCFCCCCC0
0CCC11CCCCCCCCC0
0CC1121CCCCCCCC0
0CC1111CCCCCCCC0
0CCC11CCCCCCFFC0
0CCCCCCCFCCCCCC0
0CCCCCCCCCCCCCC0
0000000000000000` ],
  [ player1, bitmap`
.....LLLL....1L3
....LLLLLL..1.39
....L8888L.000..
....L7887L.0001.
.....8888..0001.
..LLLLLLLL11111.
..11LLLLLL11111.
..11LLLLLL......
..11000000......
..11000000......
..11000000......
..11000000......
..11000000......
...LL...LL......
...LL...LL......
..LLL...LLL.....` ],
  [ bombIcon, bitmap`
......93........
......3L........
........L.......
........L.......
......00000.....
......00000.....
......00000.....
......00000.....
......00000.....
................
................
................
................
................
................
................` ],
)

setSolids([enemy1, player, enemy2, wallr, unbreakable, floor, ground, player1])
setBackground(background)
let level = 0
const levels = [
  map`
j.c...c.s.
....c....c
d.....c...
fffff.....
..........
......ffff
....p.....
gggggggggg`,//1 level
  map`
j.....ucs.
c...d.u..c
q.fffff...
ff........
.........h
.......fff
..p.......
gggggggggg`,//2 level
  map`
j.c...c.s.
rr...c....
dr.......h
ffffffffff
....rq....
.....f....
..p.......
gggggggggg`,//3 level
  map`
j....c..s.
..c..uhuc.
...ff.ff.c
..f....uuu
.......uqd
.f.....uuu
....p.....
gggggggggg`,//4 level
  map`
j.c...u.s.
u...u.r...
d.ff.fff.h
ff....c.ff
..........
q.........
f...p.....
gggggggggg`,//5 level
  map`
jhuc.r.cs.
.uu..r...d
.....rffff
...ff.c...
fff.......
.r........
q...p.....
gggggggggg`,//6 level
  map`
j...r..us.
p...rq.r.d
ff..cfffff
c.f....c..
...f.....h
....f...ff
..........
gggggggggg`,//7 level 
  map`
j.rc..crs.
q.r.c..r.c
ff.....r.d
..fff..rff
.....ff..h
........ff
..p.......
gggggggggg`,//8 level 
  map`
j..c..c.s.
q........c
fff....c..
.r.r.f....
dr.r......
f.f......h
.....p...f
gggggggggg`,//9 level
  map`
j...c..cs.
..c...c..h
c......uuu
....u..r.d
..u....uuu
q.u.......
ffu..p....
gggggggggg`,//10 level
  map`
j.c...c.s.
p..uuuu...
f..u..u.c.
...u.du...
...rruu...
f.........
..........
gggggggggg`,//11 level 
  map`
jcrrrrr.s.
r.rauarcr.
r.euuue.r.
rrrupurrrc
c..uuu....
...u.u....
..uuduu...
gggggggggg`,//Finish level
]

setMap(levels[level])
//let Player = getFirst("p");


onInput("w", () => {
  if(canJump)
  {
    getFirst(player).y  -= 1
    canJump = false;
  }
  if(jumpcount>0)
  {
    jumpHigh();
  }
})

onInput("a", () => {
 getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})


onInput("i", () => {
 const bomb = getFirst("o");
  // Clear all enemies, reset jump count, bomb count and texts
  getAll(enemy1).forEach(enemy => enemy.remove());
  getAll(enemy2).forEach(enemy => enemy.remove());
  enemy1c=0;
  enemy2c=0;
  jumpcount = 0;
  bombcount = 0;
  text = 0;
  text1 = 0;
  writeTopRightText(text);
  writeTopLeftText(text1);
  spawnedL = false;
  spawnedR = false;
  // Reset player's position to the starting point of the current level
  setMap(levels[level]);
  if(bomb)
  {
     bomb.remove(); 
  }
});

onInput("l", () => {
        

// Esegui la funzione spawnBomb una sola volta per far spawnare una bomba
spawnBombR();
});


onInput("j", () => {
        

// Esegui la funzione spawnBomb una sola volta per far spawnare una bomba
spawnBombL();

});

afterInput(() => {
  
})

function writeTopRightText(text) {
  addText(` ${text}`, {
    x: 18, // Posizione sull'asse x per l'angolo in alto a destra
    y: 0, // Posizione sull'asse y per l'angolo in alto a destra
    color: color`0` // Colore del testo (nel documento di sprig si può impostare)
  });
}

function writeTopLeftText(text1) {
  addText(` ${text1}`, {
    x: 1, // Posizione sull'asse x per l'angolo in alto a destra
    y: 0, // Posizione sull'asse y per l'angolo in alto a destra
    color: color`0` // Colore del testo (nel documento di sprig si può impostare)
  });
}


function gameLoop() {
const player = getFirst("p");
  
  KillEnemy(text);
  Gravity(player); // Pass the player variable to the Gravity function
  checkDoor();
  teleportPlayerIfBlackhole();
  teleportPlayerIfBlackhole1();
  moveBombL();
  moveBombR();
}

function Gravity(player) {
  // Check if there is a solid block below the player
  if (getTile(player.x, player.y + 1).some(sprite => sprite.type === floor || sprite.type === wallr || sprite.type === unbreakable || sprite.type === ground|| player.y === 6)) {
   canJump = true;
  } else {
    canJump = false;
    player.y += 1;
  }
  const tileAbovePlayer = getTile(player.x, player.y - 1);
  
  // Check if there is a solid block above the player
  if (tileAbovePlayer.some(sprite => sprite.type === floor || sprite.type === wallr || sprite.type === unbreakable)) {
    player.y += 1; // Prevent jumping if there is a solid block above
    canJump = false;
  }
}


function jumpHigh()
  {
    const player = getFirst("p");
    const tileAbovePlayer = getTile(player.x, player.y - 1);

     if (tileAbovePlayer.some(sprite => sprite.type === floor || sprite.type === wallr || sprite.type === unbreakable)) 
     {
        
    }
    else
     {
       playTune(JumpHigh);
       player.y -= 1;
        jumpcount--;
        text = jumpcount;
        writeTopRightText(text)
       const tileAbovePlayer1 = getTile(player.x, player.y - 1);
       if (!tileAbovePlayer.some(sprite => sprite.type === floor || sprite.type === wallr || sprite.type === unbreakable))
       {
         player.y -= 1;
        
       }
     }
    
  }


const interval = setInterval(gameLoop, 400);

function KillEnemy(text) {
  // Controlla se c'è un nemico sotto il giocatore
  const player = getFirst("p"); 
  const tilesBelowPlayer = getTile(player.x, player.y + 1);
  const enemyBelow = tilesBelowPlayer.find(sprite => sprite.type === "e");
  const enemyBelow2 = tilesBelowPlayer.find(sprite => sprite.type === "a");

  if (enemyBelow) {
    // Rimuovi il nemico se c'è un nemico sotto il giocatore
    enemyBelow.remove();
    enemy1c--;
    let random = Math.floor(Math.random() * 3) + 1;
    if(random === 1 && jumpcount < 2)
    {
      text = text + 2;
      writeTopRightText(text)
      jumpcount = jumpcount + 2;

    }
  }

  if (enemyBelow2) {
    // Rimuovi il nemico se c'è un nemico sotto il giocatore
    enemyBelow2.remove();
    enemy2c--;
    if(bombcount===0)
    {
      text1 = text1 + 1;
      writeTopLeftText(text1); 
      bombcount++;
    }
  }
}

function spawnBombR() {
 if(bombcount>0)
  { const player = getFirst("p"); // Ottieni il giocatore

  // Calcola le posizioni x e y per spawnare la bomba vicino al giocatore
  const x = player.x;
  const y = player.y;

  // Crea una nuova bomba alla posizione calcolata
  addSprite(x, y, bomb);
  bombcount--;
  spawnedR = true;
  text1--;
  writeTopLeftText(text1); 
  moveBombR();
  } 
}

function spawnBombL() {
 if(bombcount>0)
  { const player = getFirst("p"); // Ottieni il giocatore

  // Calcola le posizioni x e y per spawnare la bomba vicino al giocatore
  const x = player.x;
  const y = player.y;

  // Crea una nuova bomba alla posizione calcolata
  addSprite(x, y, bomb);
  bombcount--;
  spawnedL = true;
  text1--;
  writeTopLeftText(text1); 
  moveBombL();
  } 
}


function moveBombR()
  {
    if(spawnedR === true)
    {
      const bomb = getFirst("o");
      const tilesNextToBomb = getTile(bomb.x + 1, bomb.y);
      const wallr =  tilesNextToBomb.find(sprite => sprite.type === "r" || sprite.type === "f" || sprite.type === "u");
      if(!wallr)
        {
          bomb.x += 1;
        }
        else
        {
          
          const x = bomb.x;
          const y = bomb.y;
          addSprite (x, y, explosion);
          bomb.remove()
          playTune(melody1);
          const sprite = tilesNextToBomb.find(sprite => sprite.type === "r");
          if(sprite)
          {
            sprite.remove();
          }
          //rimozione esplosione
          setTimeout(() => {
        getFirst(explosion).remove();
      }, 700);
          spawnedR = false;
        }
      
      if(bomb.x === 9)
      {
        const x = bomb.x;
          const y = bomb.y;
          addSprite (x, y, explosion);
          bomb.remove()
          //rimozione esplosione
          setTimeout(() => {
        getFirst(explosion).remove();
      }, 700);
          spawnedR = false;
        }
    }
  }



function moveBombL()
  {
    if(spawnedL === true)
    {
      const bomb = getFirst("o");
      const tilesNextToBomb = getTile(bomb.x - 1, bomb.y);
      const wallr =  tilesNextToBomb.find(sprite => sprite.type === "r" || sprite.type === "f" || sprite.type === "u");
      if(!wallr)
        {
          bomb.x -= 1;
        }
        else
        {
          const x = bomb.x;
          const y = bomb.y;
          addSprite (x, y, explosion);
          bomb.remove()
          const sprite = tilesNextToBomb.find(sprite => sprite.type === "r");
          if(sprite)
          {
            sprite.remove();
          }
          //rimozione esplosione
          setTimeout(() => {
        getFirst(explosion).remove();
      }, 700);
          spawnedL = false;
        }

      if(bomb.x === 0)
      {
        const x = bomb.x;
          const y = bomb.y;
          addSprite (x, y, explosion);
          bomb.remove()
          //rimozione esplosione
          setTimeout(() => {
        getFirst(explosion).remove();
      }, 700);
          spawnedL = false;
        }
      }
    
  }


function spawnEnemy() {
  if(enemy1c<4){
    enemy1c++;
  const sides = ['left', 'right']; // Array dei lati dai quali appariranno i mostri
  const randomSide = sides[Math.floor(Math.random() * sides.length)]; // Scegli casualmente un lato

  let x, y;

  // Calcola le coordinate di spawn in base al lato scelto
  if (randomSide === 'left') {
    x = 0; // Sinistra dello schermo
    y = 6; // Altezza casuale
  } else {
    x = width() - 1; // Destra dello schermo
    y = 6; // Altezza casuale
  }

  // Crea un nuovo mostro alla posizione calcolata
  addSprite(x, y, enemy1);
  }
  moveEnemies();
}

// Esegui la funzione spawnEnemy ogni 3 secondi
const enemySpawnInterval = setInterval(spawnEnemy, 2500);


function moveEnemies() {
  
  const player = getFirst("p");
  const enemySprites = getAll(enemy1);

  enemySprites.forEach(enemy => {
    
    if (enemy.x < player.x) {
      enemy.x += 1; // Move enemy right towards the player
    } else if (enemy.x > player.x) {
      enemy.x -= 1; // Move enemy left towards the player
    }

    if (enemy.y < player.y) {
      enemy.y += 1; // Move enemy down towards the player
    } else if (enemy.y > player.y) {
      enemy.y -= 1; // Move enemy up towards the player
      if(enemy.y === 0)
      {
        enemy.y += 1;
      }
    }
  });
}
const enemyMoveInterval = setInterval(moveEnemies, 1500);


function spawnEnemy2() {
  const randomG = Math.floor(Math.random() * 4) + 1;
  // Verifica se il numero casuale è inferiore a 0.5 (50% di probabilità)
if (randomG === 1) {
   if(enemy2c<1){
    enemy2c++;
  const sides = ['left', 'right']; // Array dei lati dai quali appariranno i mostri
  const randomSide = sides[Math.floor(Math.random() * sides.length)]; // Scegli casualmente un lato

  let x, y;

  // Calcola le coordinate di spawn in base al lato scelto
  if (randomSide === 'left') {
    x = 0; // Sinistra dello schermo
    y = 6; // Altezza casuale
  } else {
    x = width() - 1; // Destra dello schermo
    y = 6; // Altezza casuale
  }

  // Crea un nuovo mostro alla posizione calcolata
  addSprite(x, y, enemy2);
  }

}
  moveEnemies();
}

// Esegui la funzione spawnEnemy ogni 3 secondi
const enemySpawnInterval2 = setInterval(spawnEnemy2, 2000);


function moveEnemies2() {
  
  const player = getFirst("p");
  const enemySprites = getAll(enemy2);

  enemySprites.forEach(enemy => {
    
    if (enemy.x < player.x) {
      enemy.x += 1; // Move enemy right towards the player
    } else if (enemy.x > player.x) {
      enemy.x -= 1; // Move enemy left towards the player
    }

/*    if (enemy.y < player.y) {
      enemy.y += 1; // Move enemy down towards the player
    } else if (enemy.y > player.y) {
      enemy.y -= 1; // Move enemy up towards the player
    }*/
  });
}
const enemyMoveInterval2 = setInterval(moveEnemies2, 1500);


function checkDoor() {
  const player = getFirst("p");
  const door = getFirst("d");

  if (player.x === door.x && player.y === door.y) {
    // Player position matches door position
    level++; // Move to the next level
    if (level < levels.length-1) {
      setMap(levels[level]); // Load the next level
      const player = getFirst("p");
      //Player = getFirst("p");
      enemy1c = 0;
      enemy2c = 0;
      jumpcount = 0;
      bombcount = 0;
      text = 0;
      text1 = 0;
      writeTopRightText(text);
      writeTopLeftText(text1);
      playTune(melody2);
    } else{
      setMap(levels[level]);
      // All levels completed, game over or restart
      clearInterval(interval); // Stop the game loop
      addText("Congratulations!", {
      x: 3, // Posizione sull'asse x per centrare il messaggio orizzontalmente
      y: 8, // Posizione sull'asse y per centrare il messaggio verticalmente
      color: color`6`
      });  
      addText("You have completed", {
      x: 1, // Posizione sull'asse x per centrare il messaggio orizzontalmente
      y: 9, // Posizione sull'asse y per centrare il messaggio verticalmente
      color: color`6`
      });  
      addText("All levels!", {
      x: 5, // Posizione sull'asse x per centrare il messaggio orizzontalmente
      y: 10, // Posizione sull'asse y per centrare il messaggio verticalmente
      color: color`6`
      });  
        playTune(melody2);  
    }
  }
}

function teleportPlayerIfBlackhole() {
  const player = getFirst("p");
  const blackholeR = getTile(player.x, player.y).some(sprite => sprite.type === "h");

  if (blackholeR) {
    const blackholeL = getFirst("q");
    player.x = blackholeL.x+1;
    player.y = blackholeL.y;
  }
}

function teleportPlayerIfBlackhole1() {
  const player = getFirst("p");
  const blackholeL = getTile(player.x, player.y).some(sprite => sprite.type === "q");

  if (blackholeL) {
    const blackholeR = getFirst("h");
    player.x = blackholeR.x-1;
    player.y = blackholeR.y;
  }
}