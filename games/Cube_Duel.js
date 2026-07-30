  /*
     @title: Cube Duel
 @author: Ritvik
 @description: A red cube chasing you down as you use attacks, vaults, movement, and waiting to take them down across different maps.
 @tags: 
@addedOn: 2026-07-29

 CONTROLS:
  'w', 'a', 's', 'd' : Move (Restores 1 Energy)
  'j'                : Strike (Costs 1 Energy. 1 DMG in open, 3 DMG against walls!)
  'k'                : Brace (Restores ALL Energy, Heals 1 HP, skips turn)
  'i'                : Vault (Costs 1 HP. Jump over the enemy and Stun them!)
*/

const player = "p";
const enemy = "e";
const wall = "w";

setLegend(
  [player, bitmap`
0000000000000000
0000000000000000
0000000000000000
0005555555555000
0005555555555000
0005500550055000
0005500550055000
0005555555555000
0005555005555000
0005555555555000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`], 
  [enemy, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333003333003333
3333003333003333
3333333333333333
3333330000333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`], 
  [wall, bitmap`
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
1111111111111111`]
);

setSolids([player, enemy, wall]);

let currentLevel = 0;
let playerHP = 12;
let playerEnergy = 3;
let enemyHP = 5;
let gameOver = false;
let enemyStunned = false;
let enemyCornered = false; // New mechanic!
let actionMessage = "FIGHT!";

const levels = [
  map`
wwwwwwwwwwwwwwww
w..............w
w..............w
w...p..........w
w..............w
w...........e..w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w..............w
w..w...ww......w
w..p.......e...w
w......ww......w
w..............w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w.......w......w
w..p....w...e..w
w.......w......w
w..............w
w.......w......w
wwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwww
w..............w
w...w..p...w...w
w...w......w...w
w...w..e...w...w
w..............w
wwwwwwwwwwwwwwww`
];

function loadLevel() {
  if (currentLevel >= levels.length) {
    clearText();
    addText("CHAMPION!", { x: 4, y: 5, color: color`7` });
    gameOver = true;
    return;
  }
  setMap(levels[currentLevel]);
  playerHP = 12; 
  playerEnergy = 3;
  enemyHP = 5 + (currentLevel * 3); 
  enemyStunned = false;
  enemyCornered = false;
  actionMessage = `ROUND ${currentLevel + 1}`;
  updateUI();
}

function updateUI() {
  if (gameOver) return;
  clearText();
  addText(`HP:${playerHP} ENG:${playerEnergy}`, { x: 1, y: 0, color: color`5` });
  addText(`CPU:${enemyHP}`, { x: 11, y: 0, color: color`3` });
  addText(actionMessage, { x: 1, y: 13, color: color`7` });
}

function canMoveTo(x, y) {
  const tiles = getTile(x, y);
  return tiles.every(t => t.type !== wall && t.type !== enemy && t.type !== player);
}

function getDistance(p, e) {
  return Math.abs(p.x - e.x) + Math.abs(p.y - e.y);
}

function attemptMove(dx, dy) {
  if (gameOver) return;
  const p = getFirst(player);
  if (p && canMoveTo(p.x + dx, p.y + dy)) {
    p.x += dx;
    p.y += dy;
    if (playerEnergy < 3) playerEnergy++; // Moving restores energy
    actionMessage = "MOVED";
    advanceTurn();
  }
}

onInput("w", () => attemptMove(0, -1));
onInput("s", () => attemptMove(0, 1));
onInput("a", () => attemptMove(-1, 0));
onInput("d", () => attemptMove(1, 0));

onInput("j", () => {
  if (gameOver) return;
  const p = getFirst(player);
  const e = getFirst(enemy);
  if (!p || !e) return;
  
  if (getDistance(p, e) === 1) {
    if (playerEnergy <= 0) {
      actionMessage = "OUT OF ENERGY!";
      advanceTurn();
      return;
    }
    
    playerEnergy--; // Hitting costs energy
    const dx = e.x - p.x;
    const dy = e.y - p.y;
    
    if (canMoveTo(e.x + dx, e.y + dy)) {
      e.x += dx;
      e.y += dy;
      enemyHP -= 1;
      actionMessage = "PUSHED! (-1)";
    } else {
      enemyHP -= 3;
      enemyCornered = true; // Triggers double damage on AI turn!
      actionMessage = "WALL SLAM! (-3)";
    }
    advanceTurn();
  } else {
    actionMessage = "SWUNG WIDE!";
    advanceTurn();
  }
});

onInput("i", () => {
  if (gameOver) return;
  const p = getFirst(player);
  const e = getFirst(enemy);
  if (!p || !e) return;

  if (getDistance(p, e) === 1) {
    if (playerHP > 1) {
      const dx = e.x - p.x;
      const dy = e.y - p.y;
      
      if (canMoveTo(e.x + dx, e.y + dy)) {
        p.x = e.x + dx;
        p.y = e.y + dy;
        playerHP -= 1;
        enemyStunned = true; 
        actionMessage = "VAULT (-1) | STUNNED!";
        advanceTurn();
      } else {
        actionMessage = "VAULT PATH BLOCKED!";
        updateUI();
      }
    } else {
      actionMessage = "TOO WEAK TO VAULT!";
      updateUI();
    }
  } else {
    actionMessage = "MUST BE ADJACENT!";
    updateUI();
  }
});

onInput("k", () => {
  if (gameOver) return;
  playerEnergy = 3; // Fully restores energy
  if (playerHP < 12) {
    playerHP += 1;
    actionMessage = "BRACED (+1 HP, MAX ENG)";
  } else {
    actionMessage = "WAITED (MAX ENG)";
  }
  advanceTurn();
});

function advanceTurn() {
  if (enemyHP <= 0) {
    currentLevel++;
    loadLevel();
    return;
  }

  if (enemyStunned) {
    enemyStunned = false;
    updateUI();
    return;
  }

  const p = getFirst(player);
  const e = getFirst(enemy);
  const dist = getDistance(p, e);
  
  if (dist === 1) {
    let damage = 1 + currentLevel;
    
    if (enemyCornered) {
      damage *= 2; 
      actionMessage = actionMessage.split(' | ')[0] + ` | CRIT HIT(-${damage})`;
      enemyCornered = false;
    } else {
      actionMessage = actionMessage.split(' | ')[0] + ` | CPU(-${damage})`;
    }
    
    playerHP -= damage;
  } else {
    // Enemy is no longer cornered if they have to move
    enemyCornered = false; 
    
    // Pathfind toward player
    let moved = false;
    if (e.x < p.x && canMoveTo(e.x + 1, e.y)) {
      e.x += 1; moved = true;
    } else if (e.x > p.x && canMoveTo(e.x - 1, e.y)) {
      e.x -= 1; moved = true;
    }
    
    if (!moved) {
      if (e.y < p.y && canMoveTo(e.x, e.y + 1)) {
        e.y += 1;
      } else if (e.y > p.y && canMoveTo(e.x, e.y - 1)) {
        e.y -= 1;
      }
    }
  }

  if (playerHP <= 0) {
    clearText();
    addText("YOU DIED", { x: 5, y: 5, color: color`3` });
    gameOver = true;
    return;
  }
  
  updateUI();
}

loadLevel();
