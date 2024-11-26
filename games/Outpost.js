/*
@title: Outpost
@author: muwahhid2006
@tags: []
@addedOn: 2024-11-26
*/
// Define sprites
const player = "p";
const enemy = "e";
const wal = "w";
const floor = "f";
const trap = "l";

// Add sprites
setLegend(
  [player, bitmap`
................
.....00000......
....0223220.....
....0233320.....
....0333330.....
.....00300......
.....03330......
....0000000.....
...002030200....
..00220302200...
..02220302220...
..02220302220...
..02230303220...
..00330303300...
...000000000....
................`],
  [enemy, bitmap`
................
.....FFFFF......
....FFD4DFF.....
....F44D44F.....
....F44DD4F.....
.....F4DF.......
.....FD4F.......
.....F4DF.......
....FFFFFFF.....
...FFDFDF4FF....
..FFD4F4F4FF....
..FD4DF4FD4DF...
..F4D4FDFD44F...
..F44FFFFFD4F...
..FFDF...FFF....
...FFF...FFF....`],
  [wal, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [floor, bitmap`
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
7777777777777777`],
  [trap, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2002222222222002
0010022222200100
0101022222201010
2010100220010102
2201010220101022
2220100220010222
2222010000102222
2222200LL0022222
2222220LL0222222
2222222002222222`]
);

// Set the map
setMap(`
wwwwwwwwwwwwwwwww
w...............w
w...............w
w....p....e.....w
w...............w
w...............w
wwwwwwwwwwwwwwwww
`);

// Variables
let playerHealth = 6;
let enemyHealth = 6;

// Movement controls
onInput("w", () => { getFirst(player).y -= 1; });
onInput("s", () => { getFirst(player).y += 1; });
onInput("a", () => { getFirst(player).x -= 1; });
onInput("d", () => { getFirst(player).x += 1; });

// Enemy Zombie AI
setInterval(() => {
  const p = getFirst(player);
  const e = getFirst("e");
if (e && p){
  // Simple Zombie: Chase player
  if (e.x < p.x) e.x++;
  if (e.x > p.x) e.x--;
  if (e.y < p.y) e.y++;
  if (e.y > p.y) e.y--;
}
}, 500);

// Traps
onInput("l", () => {
  const p = getFirst(player); // Use player variable for trap placement
  addSprite(p.x, p.y, trap);
});                    
function clearTitle(x, y){
  // clear all sprites at the given tile coord
  clearTile(x, y);
}
// Collisions
var cId = setInterval(() => {
  const e = getFirst(enemy);
  const traps = getAll(trap);
if (enemyHealth <= 0) {
        addText("You Win!!!", { x: 4, y: 4 }).stop();
        clearInterval(cIdewd)
}
  traps.forEach(t => {
    if (!t || !e) return;
    if (t.x === e.x && t.y === e.y) {
      enemyHealth--;
      clearTitle(t.x, t.y);
      
    }
  });
}, 500);
