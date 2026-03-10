/*
@title: None
@author: None
@description: None
@tags: []
@addedOn: 2025-06-03
*/

const player = "p";
const zombie = "z";
const bulletR = "r";
const bulletL = "l";
const wall = "w";
const background = "g";
const dashboard_background = "d"
const bullet_icon = "i"
const lift_icon = "m"
const nuclear_fuel = "n"

function isSolid(x, y) {
  return getTile(x, y).some(s => s.solid);
}

setLegend(
  [lift_icon, bitmap`
111111LL2LL11111
111111L222L11111
111111LL2LL11111
111111LL2LL11111
111111L000L11111
111111L0CCL11111
111111LCCCL11111
111111LL7LL11111
1111117777711111
111111LL7LL11111
111111L555L11111
111111L5L5L11111
1111115525511111
111111LL2LL11111
111111L222L11111
111111LL2LL11111`],
  [player, bitmap`
................
......CCC.......
.....CCCCC......
.....C0C0C......
.....CCCCC......
......CCC.......
.......7........
.....CC7CC......
....CC.7.CC.....
....C..7..C.....
.......5........
......555.......
.....55.55......
....55...55.....
................
................`],
  [zombie, bitmap`
................
................
................
......DDD.......
.....DDD4D......
.....DDDDD......
.....4DDDD......
......DDD.......
.......7........
.....DD7DD......
....DD.7.4D.....
....4..7..D.....
.......C........
......CCC.......
.....4C.CD......
....DD...D4.....`],
  [bulletR, bitmap`
................
................
................
................
................
................
..6..66999......
....6.699999....
6....66999999...
...6..6999999...
....6.699999....
.6...66999......
................
................
................
................`],
  [bulletL, bitmap`
................
................
................
................
......99966...6.
....999996.6....
...9999996..6...
...99999966....6
....999996.6....
......99966..6..
................
................
................
................
................
................`],
  [wall, bitmap`
LLLLLLLLLLLLLLLL
LLL1LLLLLLLLLLLL
LLLLLLLLLLL1LLLL
LLLLLLLLLLLL1LLL
L1111111LLLL11LL
LLLLLLLL1LLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLL11L
LLLLLLLLLLL111LL
LLLLLL11111LLLLL
LLLL111LLLLLLLLL
LLL11LLLLLLLLLLL
LLL1LLL1LLLLLLLL
LLL1LLL111111LLL
LLLLLLLLLLLL11LL
LLLLLLLLLLLLLLLL`],
  [dashboard_background, bitmap`
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
  [background, bitmap`
LLLLLLLLLLLLLLLL
L00000000000000L
L0LL000L0000000L
L0L000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L00000000000000L
L0L000000000000L
L00000000000000L
L000000000000L0L
L00000000000000L
L000000000000L0L
L00000000L00LL0L
L00000000000000L
LLLLLLLLLLLLLLLL`],
  [bullet_icon, bitmap`
1111111111111111
1111111991111111
1111119999111111
1111119999111111
1111199999911111
1111199999911111
1111199999911111
1111666666661111
1111666666661111
1111666666661111
1111666666661111
1111666666661111
1111666666661111
1111666666661111
1111666666661111
1111111111111111`],
  [nuclear_fuel, bitmap`
................
....464644644...
....664464646...
....664600646...
....664000646...
....666606666...
....666666666...
....666606666...
....660666066...
....600060006...
....600666006...
....666666666...
...F666666666F..
...FF6666666FF..
....FFFFFFFFF...
................`]
)

setSolids([player, wall, dashboard_background , zombie , nuclear_fuel])
setPushables({
  [player] : [nuclear_fuel]
})

setBackground(background)

let current_level = 0
let bullets_remaining = 3
const levels = [
  map`
............
..........m.
....wwwww...
....w...w...
....w.n.w...
....wz......
p...wwwww...
diiidddddddd`, //level 0
  map`
wwwwwwwwwww
......w.z.w
....z.w.n.w
.www......w
.wmww..wwww
.w..w..w...
pw..wz.w...
.w.....w...
iiidddddddd`
]

setMap(levels[current_level])

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})
onInput("s", () => {
  getFirst(player).y += 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("j", () => {
  if (bullets_remaining > 0) {
    let bx = getFirst(player).x - 1;
    let by = getFirst(player).y;
    addSprite(bx, by, bulletL);
  } else {
    addText("No bullets left!", { y: 4, color: color`3` }); // <-- added missing closing parenthesis here
    setTimeout(() => {
        setMap(levels[current_level]);
        clearText();
      }, 3000);
  }
  clearTile(bullets_remaining, (height()-1))
  addSprite(bullets_remaining, (height()-1), dashboard_background)
  bullets_remaining -= 1;
}); 


onInput("l", () => {
  if (bullets_remaining > 0) {
    let bx = getFirst(player).x + 1;
    let by = getFirst(player).y;
    addSprite(bx, by, bulletR);
  } else {
    addText("No bullets left!", { y: 4, color: color`3` }); // <-- added missing closing parenthesis here
    setTimeout(() => {
        clearText();
      }, 3000);
  }
  clearTile(bullets_remaining, (height()-1))
  addSprite(bullets_remaining, (height()-1), dashboard_background)
  bullets_remaining -= 1;
}); 

setInterval(() => {
  const p = getFirst(player);
  const zombies = getAll(zombie);

  for (let z of zombies) {
    let dx = p.x - z.x;
    let dy = p.y - z.y;

    // Attack if adjacent
    if ((Math.abs(dx) == 1 && dy == 0) || (dx == 0 && Math.abs(dy) == 1)) {
      addText("Ouch! Zombie!", { y: 4, color: color`2` });
      setTimeout(() => {
        setMap(levels[current_level]);
        let bullets_remaining = 3
        clearText();
      }, 3000);
      continue;
    }

    // Function to check if move is possible and apply it
    function tryMove(xStep, yStep) {
      if (!isSolid(z.x + xStep, z.y + yStep)) {
        z.x += xStep;
        z.y += yStep;
        return true;
      }
      return false;
    }

    // Decide which direction to try first (the larger distance)
    if (Math.abs(dx) > Math.abs(dy)) {
      // Try horizontal first
      if (dx > 0) {
        if (!tryMove(1, 0)) {
          if (dy > 0) tryMove(0, 1);
          else if (dy < 0) tryMove(0, -1);
        }
      } else if (dx < 0) {
        if (!tryMove(-1, 0)) {
          if (dy > 0) tryMove(0, 1);
          else if (dy < 0) tryMove(0, -1);
        }
      }
    } else {
      // Try vertical first
      if (dy > 0) {
        if (!tryMove(0, 1)) {
          if (dx > 0) tryMove(1, 0);
          else if (dx < 0) tryMove(-1, 0);
        }
      } else if (dy < 0) {
        if (!tryMove(0, -1)) {
          if (dx > 0) tryMove(1, 0);
          else if (dx < 0) tryMove(-1, 0);
        }
      }
    }
  }
}, 500);

setInterval(() => {
  // Move bullets going right
  const bulletsRight = getAll(bulletR);
  for (const b of bulletsRight) {
    b.x += 1;

    if (getTile(b.x, b.y).some(s => s.type === zombie))  {
      clearTile(b.x,b.y)
    }

    // Remove if out of bounds or hits wall
    if (b.x >= width() || getTile(b.x, b.y).some(sprite => sprite.type === wall)) {
      b.remove();
    }
  }

  // Move bullets going left
  const bulletsLeft = getAll(bulletL);
  for (const b of bulletsLeft) {
    b.x -= 1;

    if (getTile(b.x, b.y).some(s => s.type === "z")) {
      clearTile(b.x,b.y)
    }
    
    // Remove if out of bounds or hits wall
    if (b.x < 0 || getTile(b.x, b.y).some(sprite => sprite.type === wall)) {
      b.remove();
    }
  }
}, 100);

afterInput(() => {
  let nuclear = getFirst(nuclear_fuel);
  let lift = getFirst(lift_icon);
  let dx = lift.x - nuclear.x;
  let dy = lift.y - nuclear.y;

  if (dx === 0 && dy === 0) {
    current_level += 1;

    if (current_level >= levels.length) {
      // No more levels, end the game
      addText("You Win! Game Over!", { y: 4, color: color`3` });
      // Optionally, disable further input or stop game loops here
    } else {
      setMap(levels[current_level]);
      let bullets_remaining = 3
    }
  }
});

