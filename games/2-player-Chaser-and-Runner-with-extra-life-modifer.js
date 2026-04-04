/*
@title: 2-player-Chaser-and-Runner-with-extra-life-modifer
@author: e
@description:Two play tag with one person chasing and one person running. An extra modifier, extra life can be picked up by player one or destroyed by player two. Press WASD to move for player 1 the chaser and IJKL for Player 2 the runner.
@tags: ["2p", "tag"]
@addedOn: 2026-03-08
*/

const p1 = "p"; 
const p2 = "q"; 
const bst = "b"; 
const wall = "w";


var p2Lives = 0;
var gameEnd = false;

setLegend(
  [ p1, bitmap`
6666666666666666
6666666666666666
6666666666600006
6600066666600006
6600066666600006
6600066666600006
6666666656666666
6666666556666666
6666666666666666
6666666666666366
6663666666666366
6663666666666366
6663333366333366
6666666333366666
6666666666666666
6666666666666666` ],
  [ p2, bitmap`
4444444444444444
4444494449444444
4444999499944444
4444999499944444
4444929492944444
4444999999944444
4444999999444444
4444909099444444
4444909099444444
4444999999444449
4444977799444499
4444999999444494
4444999999999994
444449CC99999994
444449CC99999994
444449.9.999.9.4` ],
  [ bst, bitmap`
HHHHHHH433333333
HHHHHHH444334443
H444444433344664
HHHHHH4444446664
HHHH444466446664
4HHH443466446664
4H4H443466446664
4444443466446664
4554444666646642
4554444444444642
4334444H40004442
4554444H40000442
6444444H44444442
6664434HHHHHH422
6664433444HHH422
6666433333444222` ],
  [ wall, bitmap`
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
0000000000000000` ]
);

setSolids([wall]);

const levels = [
  map`
wwwwwwwwwwwwwwww
w....q.........w
w..............w
w.......b......w
w..............w
w.........p....w
wwwwwwwwwwwwwwww`
];

setMap(levels[0]);

function move(type, dx, dy) {
  if (gameEnd) return;
  
  const s = getFirst(type);
  if (!s) return;

  const nextX = s.x + dx;
  const nextY = s.y + dy;

  // Collision check for walls
  if (getTile(nextX, nextY).some(t => t.type === wall)) return;

  s.x = nextX;
  s.y = nextY;

  // Check for the extra life
  const lifeItem = getTile(s.x, s.y).find(t => t.type === bst);
  if (lifeItem) {
    if (type === p2) { 
       p2Lives += 1;
       addText("LIFE UP!", { y: 2, color: color`2`, time: 1000 });
    }
    lifeItem.remove(); 
  }
}

// Player 1 movement
onInput("w", () => move(p1, 0, -1));
onInput("s", () => move(p1, 0, 1));
onInput("a", () => move(p1, -1, 0));
onInput("d", () => move(p1, 1, 0));

// Player 2 movement
onInput("i", () => move(p2, 0, -1));
onInput("k", () => move(p2, 0, 1));
onInput("j", () => move(p2, -1, 0));
onInput("l", () => move(p2, 1, 0));

// Tag mechanism 
afterInput(() => {
  const sprite1 = getFirst(p1);
  const sprite2 = getFirst(p2);
  
  if (!sprite1 || !sprite2) return;

  if (sprite1.x === sprite2.x && sprite1.y === sprite2.y) {
    if (p2Lives > 0) {
      // Extra life mechanic
      p2Lives -= 1;
      
      // Teleport to safe location
      sprite2.x = 1;
      sprite2.y = 1;
      
      addText("CAUTION LIFE USED!", { y: 2, color: color`3`, time: 1000 });
    } else {
      // Game Over 
      gameEnd = true;
      addText("P1 TAGGED P2!", { y: 5, color: color`4` });
    }
  }
});