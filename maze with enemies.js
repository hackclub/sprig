const player = "p";
const enemy = "e";
const enemy2 = "r";
const enemy3 = "k";
const finish = "g";
const wall = "w";
const ground = "f";

let gameInterval;
let gameIsOver = false;

setLegend(
    [player,bitmap`
................
................
....CCCCCCCC....
...CCCCCCCCCC...
..CC66666666CC..
..666666666666..
..66756FF65766..
..66666FF66666..
..6666FFFF6666..
..666666666666..
..663222222366..
...6633333366...
...6663333666...
.....666666.....
................
................`],
    [enemy,bitmap`
................
................
33............33
333.33333333.333
3333303333033333
3333330330333333
..333533335333..
....33333333....
....33300333....
....33033033....
....33333333....
....3......3....
....0......0....
...0.0....0.0...
................
................`],
    [enemy2,bitmap`
................
................
99............99
999.99999999.999
9999909999099999
9999990990999999
..999599995999..
....99999999....
....99900999....
....99099099....
....99999999....
....9......9....
....0......0....
...0.0....0.0...
................
................`],
    [enemy3,bitmap`
................
................
44............44
444.44444444.444
4444404444044444
4444440440444444
..444544445444..
....44444444....
....44400444....
....44044044....
....44444444....
....4......4....
....0......0....
...0.0....0.0...
................
................`],
    [finish,bitmap`
................
................
......333.......
......C3333.....
......C333333...
......C3333.....
......333.......
......C.........
......C.........
......C.........
......C.........
......C.........
......C.........
.....444........
....44444.......
................`],
    [wall,bitmap`
LLLLLL0LLLLLLLLL
LLLLLL0LLLLLLLLL
LLLLLL0LLLLLLLLL
0000000000000000
LLLLLLLLLL0LLLLL
LLLLLLLLLL0LLLLL
LLLLLLLLLL0LLLLL
LLLLLLLLLL0LLLLL
0000000000000000
LLLLL0LLLLLLLLLL
LLLLL0LLLLLLLLLL
LLLLL0LLLLLLLLLL
0000000000000000
LLLLLLLLLL0LLLLL
LLLLLLLLLL0LLLLL
LLLLLLLLLL0LLLLL`]
);


let enemyDirection = -1;
const enemySpeed = 1;
let enemyDirection2 = -1;
const enemySpeed2 = 1;
let enemyDirection3 = -1;
const enemySpeed3 = 1;

let level = 0;
const levels = [
    map`
pw...w....
.w.w.wwww.
.www...w..
.....w...w
ww.w.wwwww
...w....wg
.wwwwww.w.
......w...`,
    map`
p.e.......
.wwwwwwww.
.w...w..w.
.w.w.gw.w.
.w.wwww.w.
.w......w.
.wwww.www.
....w.....`,
    map`
p.e....w..
...w.....w
.w.....w..
.....k....
..w..w....
........w.
.w...w....
...r...w.g`,
    map`
pwe..w....
.w.w.w.ww.
.w.w.w.w..
...w.wkwgw
.w.w.w.w.w
.w.w...w..
.w.wrw.ww.
.w...w....`,
    map`
pw.......g
.wewwwwwww
.w....k...
.wwwwwwww.
.w........
.w.wwwwwww
.w..r.....
.wwwwwwww.
..........`,
    map`
p..we..w....
.w.w.w.wwww.
.w...w......
.wwwww.wwwww
...w..rwg...
ww.w.wwwwww.
...w.w......
.www...wwwww
.w.w.www...k
...w.....ww.`
];

const currentLevel = levels[level];
setMap(currentLevel);

onInput("w", () => {
    if (!gameIsOver) getFirst(player).y -= 1;
});

onInput("s", () => {
    if (!gameIsOver) getFirst(player).y += 1;
});

onInput("a", () => {
    if (!gameIsOver) getFirst(player).x -= 1;
});

onInput("d", () => {
    if (!gameIsOver) getFirst(player).x += 1;
});

setSolids([player, wall]);





gameInterval = setInterval(() => {
  moveEnemyVertically();
  moveEnemyVertically2();
  moveEnemyVertically3();
}, 1000);


function moveEnemyVertically() {
    const enemySprite = getFirst(enemy);
  
    if (!enemySprite) return;
  
    enemySprite.y += enemyDirection * enemySpeed;
  
    if(enemySprite.y === 0){
      while(!enemySprite.y === 7){
        enemyDirection = -1;      
      }
      enemyDirection = 1;         
    } else if (enemySprite.y === 7){
      while(!enemySprite.y === 1){
        enemyDirection = 1;      
      }
      enemyDirection = -1;  
    }
  
    const playerSprite = getFirst(player);
    if (enemySprite.x === playerSprite.x && enemySprite.y === playerSprite.y) {
      gameOver();
    }
}


function moveEnemyVertically2() {
    const enemySprite2 = getFirst(enemy2);
  
    if (!enemySprite2) return;
  
    enemySprite2.y += enemyDirection2 * enemySpeed2;
  
    if(enemySprite2.y === 0){
      while(!enemySprite2.y === 7){
        enemyDirection2 = -1;      
      }
      enemyDirection2 = 1;         
    } else if (enemySprite2.y === 7){
      while(!enemySprite2.y === 1){
        enemyDirection2 = 1;      
      }
      enemyDirection2 = -1;  
    }
  
    const playerSprite = getFirst(player);
    if (enemySprite2.x === playerSprite.x && enemySprite2.y === playerSprite.y) {
      gameOver();
    }
}


function moveEnemyVertically3() {
    const enemySprite3 = getFirst(enemy3);
  
    if (!enemySprite3) return;
  
    enemySprite3.y += enemyDirection3 * enemySpeed3;
  
    if(enemySprite3.y === 0){
      while(!enemySprite3.y === 7){
        enemyDirection3 = -1;      
      }
      enemyDirection3 = 1;         
    } else if (enemySprite3.y === 7){
      while(!enemySprite3.y === 1){
        enemyDirection3 = 1;      
      }
      enemyDirection3 = -1;  
    }
  
    const playerSprite = getFirst(player);
    if (enemySprite3.x === playerSprite.x && enemySprite3.y === playerSprite.y) {
      gameOver();
    }
}

afterInput(() => {
    const numberCovered = tilesWith(finish, player).length;
    const targetNumber = tilesWith(finish).length;
    const playerSprite = getFirst(player);     
  
    if (numberCovered === targetNumber) {
        level = level + 1;

        const currentLevel = levels[level];

        if (currentLevel !== undefined) {
            setMap(currentLevel);
        } else {
            addText("you win!", { y: 4, color: color`3` });
            clearInterval(gameInterval);
            gameIsOver = true;
        }
    }
});



function gameOver() {
  addText("Game Over!", { x: 5, y: 7, color: color`3` });
  clearInterval(gameInterval);
  gameIsOver = true;
}