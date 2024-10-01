/*
@title: Pixelated Medieval Times
@author: TabishAhmad
@tags: ['role-playing']
@addedOn: 2024-05-31
@img: ""
*/

const player = "p";
const boss = "b";
const goal = "g";
const wall = "w";
const sword = "s";
const key = "k";
const specialwall = "j";

setLegend(
    [player, bitmap`
................
................
......666.......
......111.......
......LLL.......
......1L1.......
.......1..0.....
....1111111.....
....0.111.......
.......1........
.....11111......
.....1...1......
....00...00.....
................
................
................`],
    [boss, bitmap`
................
................
................
................
....000..000....
.....3....3.....
.....3....3.....
....DDDDDDDDD...
....D0002000D...
....D2022202D...
....D2223222D...
....000000000...
....000300000...
....000000000...
................
................`],
    [goal, bitmap`
................
................
...66666666.....
...68888886.....
...68222286.....
...68202086.....
...68220286.....
...68888886.....
...6..88..6.....
.8.88888888.....
.888HHHHHH888...
...8HHHHHH8.8...
...8HHHHHH8.....
...88888888.....
.....8..8.......
.....8..8.......`],
    [wall, bitmap`
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
    [sword, bitmap`
................
................
................
................
................
........963.....
.......1113.....
....6.91169.....
....611311......
....61116.......
....6319........
...056666.......
..000...........
.000............
.00.............
................`],
    [key, bitmap`
................
................
................
................
.22222222222222.
.22FFFF62222222.
.22F66F62222222.
.22F66FFFFFFF62.
.22FFFF666F6F62.
.222222222F6F62.
................
................
................
................
................
................`],
    [specialwall, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`]
);

let solids = [player, wall];

setSolids(solids);

let hasSword = false;
let hasKey = false;

let level = 0;
const levels = [
    map`
pwwwgw
.wwwbw
.www.w
s.....
wwwwww`,
    map`
p.w....b
..w.www.
.sw.www.
.ww.www.
.wg.www.
.wwwwww.
...k....`,
    map`
pw.........
.w.w.www.w.
.w.w.wsw.w.
.wgw.w.w.wb
.www.w.w.w.
.www.w...ww
.w...wwwwww
.w.wwwwwwww
.w.ww......
....w......`,
    map`
pwwww......
.wwww......
.kwww......
jwwww..ww..
..www..ww..
..jsw..ww..
..www..ww..
..j.w.www..
.ww..jbgw..
.wwwwwwww..`,
    map`
wwww.......
g..w.......
..jwwwwwww.
ww...w...w.
sw...w...w.
.w...w...w.
.w...w...w.
.www.w...w.
...j.....ww
b..w......w
wwww.w....w
w....w....w
wk...w....w
wwwwww...pw`,
    
];

setMap(levels[level]);

setPushables({
    [player]: []
});

function displayText(message, duration = 1000) {
    addText(message, { x: 1, y: 0, color: color`3` });
    setTimeout(() => {
        clearText();
    }, duration);
}


function isSolid(x, y) {
   
    if (x < 0 || y < 0 || x >= width() || y >= height()) {
        return true;
    }

    return getTile(x, y).some(obj => solids.includes(obj.type));
}

onInput("w", () => {
    movePlayer(0, -1);
});

onInput("a", () => {
    movePlayer(-1, 0);
});

onInput("s", () => {
    movePlayer(0, 1);
});

onInput("d", () => {
    movePlayer(1, 0);
});

onInput("j", () => {
    setMap(levels[level]);
    hasSword = false;
    hasKey = false;
    clearText();
});

function movePlayer(dx, dy) {
    const playerTile = getFirst(player);
    const newX = playerTile.x + dx;
    const newY = playerTile.y + dy;

    const targetTile = getTile(newX, newY);

    if (targetTile.some(obj => obj.type === specialwall) && hasKey) {
        playerTile.x = newX;
        playerTile.y = newY;
    } else if (!isSolid(newX, newY)) {
        playerTile.x = newX;
        playerTile.y = newY;
    }
}

afterInput(() => {
    const playerTile = getFirst(player);
    const playerX = playerTile.x;
    const playerY = playerTile.y;


    if (getTile(playerX, playerY).some(obj => obj.type === sword)) {
        hasSword = true;
        // Remove only the sword from the tile, keep the player
        const newTile = getTile(playerX, playerY).filter(obj => obj.type !== sword);
        clearTile(playerX, playerY);
        newTile.forEach(obj => addSprite(playerX, playerY, obj.type));
        displayText("Sword acquired!");
    }


    if (getTile(playerX, playerY).some(obj => obj.type === key)) {
        hasKey = true;
   
        const newTile = getTile(playerX, playerY).filter(obj => obj.type !== key);
        clearTile(playerX, playerY);
        newTile.forEach(obj => addSprite(playerX, playerY, obj.type));
        displayText("Key acquired!");
    }


    if (getTile(playerX, playerY).some(obj => obj.type === boss)) {
        if (hasSword) {

            clearTile(playerX, playerY);
            addSprite(playerX, playerY, player); 
            displayText("Boss defeated!");
        } else {
            displayText("Need the sword!", 500);
        }
    }


    if (getTile(playerX, playerY).some(obj => obj.type === goal)) {
   
        if (!getFirst(boss)) {
            
            displayText("You saved the princess!");

         
            level++;
            if (level < levels.length) {
                setTimeout(() => {
                    setMap(levels[level]);
                    hasSword = false;
                    hasKey = false;
                    clearText();
                }, 1000);
            } else {
                displayText("You completed all levels!");
            }
        } else {
            displayText("Defeat the boss first!", 500);
        }
    }
});
