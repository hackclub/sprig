/*
@title: Deep Dig
@author: Zeyad Bekhet
@tags: ['puzzle', 'retro', 'logic']
@addedOn: 2026-02-23
@description: Dig deep through layers of dirt and rock in this retro puzzle game
*/

const player = "p";
const dirt = "d";
const rock = "r";
const gem = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
................
.......77777....
.......777777...
.........77777..
..........77777.
.........C77777.
........CCC.777.
.......CCC...77.
......CCC....77.
.....CCC..2..77.
....CCC...2.....
...CCC.....22...
..CCC......22...
..CC............
................
................` ], 
  [ dirt, bitmap`
5555555555555555
5055555551555555
5555055555555555
5555555555550555
5505555055555555
5555555555555555
5555515555505555
5555555555555555
5055555515555555
5555155555555550
5555555555515555
5550555505555555
5555555555555555
5555515555505555
5555555555555555
5555555555555555` ],
  [ rock, bitmap`
...............0
.....111111.....
...1111111111...
..111777111111..
..117711111111..
..111111100111..
..111111110011..
..111111111011..
..111001111011..
..111000110011..
...1110000011...
.....111111.....
................
................
................
................` ],
  [ gem, bitmap`
................
....DDDDDDDD....
...D44444444D...
..D4444444444D..
.D444444444444D.
.D4444DDDD4444D.
.D444D4444D444D.
.D444D4444D444D.
.D444D4444D444D.
.D444D4444D444D.
.D4444DDDD4444D.
.D444444444444D.
..D4444444444D..
...D44444444D...
....DDDDDDDD....
................` ],
  [ wall, bitmap`
2222222222222221
222222222222221L
22111111111111LL
22111111111111LL
22111111111111LL
22111111111111LL
22111111111111LL
22111111111111LL
22111111111111LL
22111111111111LL
22111111111111LL
22111111111111LL
22111111111111LL
22111111111111LL
21LLLLLLLLLLLLLL
1LLLLLLLLLLLLLLL` ]
);

setSolids([player, wall, rock]);

let currentLevel = 0;
let gemsTotal = 0;
let gemsCollected = 0;
let locked = false;

const levels = [
  map`
wwwwwwwwww
wpdddddddw
wddrddgddw
wddddddddw
wdrdddrddw
wddddddddw
wdgdddgddw
wwwwwwwwww`,
  map`
wwwwwwwwww
wpdddrdddw
wddddgdddw
wdrdrddrdw
wddddddddw
wddrdgdrdw
wddddddgdw
wwwwwwwwww`,
  map`
wwwwwwwwww
wddgddddpw
wdrrrdrrdw
wdgggddgdw
wrrrrdrrrw
wddddddddw
wddgdddgdw
wwwwwwwwww`,
  map`
wwwwwwwwww
wpdrdrdrdw
wddddddddw
wdrdrdrdrw
wddgddgddw
wddddddddw
wddddgdddw
wwwwwwwwww`,
  map`
wwwwwwwwww
wpddrddddw
wrddrddrdw
wgddddddgw
wrddrddrdw
wddddddddw
wgddrddgdw
wwwwwwwwww`,
  map`
wwwwwwwwww
wpdrrrrrgw
wddddddddw
wgrrrrrddw
wddddddddw
wddrrrrrgw
wddddddddw
wwwwwwwwww`,
  map`
wwwwwwwwww
wpdgdgdgdw
wdrdrdrdrw
wddddddddw
wdrdrdrdrw
wddddddddw
wgdgdgdgdw
wwwwwwwwww`,
  map`
wwwwwwwwww
wprddddrdw
wdrdrrddgw
wddgdddrdw
wdrddgdddw
wdrrrdrrrw
wdgggddgdw
wwwwwwwwww`
];

function loadLevel(index) {
  if (index >= levels.length) {
    addText("YOU ESCAPED!", { y: 4, color: color`6` });
    locked = true;
    return;
  }
  setMap(levels[index]);
  gemsTotal = getAll(gem).length;
  gemsCollected = 0;
  locked = false;
  clearText();
}

function move(dx, dy) {
  if (locked) return;
  const p = getFirst(player);
  const target = getTile(p.x + dx, p.y + dy);
  
  if (target.some(t => t.type === wall || t.type === rock)) return;
  
  p.x += dx;
  p.y += dy;
}

onInput("w", () => move(0, -1));
onInput("s", () => move(0, 1));
onInput("a", () => move(-1, 0));
onInput("d", () => move(1, 0));

afterInput(() => {
  if (locked) return;
  
  const p = getFirst(player);
  let died = false;

  getTile(p.x, p.y).forEach(t => {
    if (t.type === dirt) t.remove();
    if (t.type === gem) {
      t.remove();
      gemsCollected++;
    }
  });

  let rocks = getAll(rock).sort((a, b) => b.y - a.y);
  
  rocks.forEach(r => {
    let below = getTile(r.x, r.y + 1);
    
    if (below.length === 0) {
      r.y += 1;
      r.falling = true;
    } else if (below.some(t => t.type === player)) {
      if (r.falling) {
        r.y += 1; 
        died = true;
      } else {
        r.falling = false;
      }
    } else {
      r.falling = false;
    }
  });

  if (died) {
    locked = true;
    addText("CRUSHED!", { y: 4, color: color`C` });
    setTimeout(() => { loadLevel(currentLevel); }, 1000);
    return;
  }

  if (gemsCollected === gemsTotal) {
    locked = true;
    currentLevel++;
    if (currentLevel < levels.length) {
      addText("LEVEL CLEARED!", { y: 4, color: color`H` });
      setTimeout(() => { loadLevel(currentLevel); }, 1000);
    } else {
      addText("GAME CLEARED!", { y: 4, color: color`9` });
    }
  }
});

loadLevel(0);
