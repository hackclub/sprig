/*
@title: Glowy Sheep
@author: atomicra1n
@tags: [puzzle, simulation]
@addedOn: 2025-00-00
*/

// --- SPRITES ---
const player = "p"
const sheep = "s"
const radSheep = "r"
const wall = "w"
const pen = "P" 
const floor = "_" 

setLegend(
  [player, bitmap`
................
................
....22222.......
...2722222......
...22222222.....
...2222222......
...2222222......
....2...2.......
....2...2.......
................
................
................
................
................
................
................`], 
  [sheep, bitmap`
................
................
......LL........
.....LLLL.......
....LLLLLL......
...LL7LLLLL.....
...LLLLLLLL.....
...LLLLLLLL.....
....L....L......
....L....L......
................
................
................
................
................
................`],
  [radSheep, bitmap`
................
................
......66........
.....6666.......
....666666......
...66666666.....
...66066666.....
...66666666.....
....6....6......
....6....6......
................
................
................
................
................
................`],
  [wall, bitmap`
3333333333333333
3443443443443443
3443443443443443
3333333333333333
3443443443443443
3443443443443443
3333333333333333
3443443443443443
3443443443443443
3333333333333333
3443443443443443
3443443443443443
3333333333333333
3443443443443443
3443443443443443
3333333333333333`],
  [pen, bitmap`
9999999999999999
9..............9
9..............9
9..............9
9..............9
9..............9
9..............9
9..............9
9..............9
9..............9
9..............9
9..............9
9..............9
9..............9
9..............9
9999999999999999`],
  [floor, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................`]
)

setSolids([player, wall, sheep, radSheep])

let currentLevel = 0
let sheepSavedInLevel = 0
let levelActive = true 

const levels = [
  // Level 0
  map`
wPPPPwwwwwwwww
wPPPP________w
wPPPP________w
w____s__s____w
w____________w
w____s__s____w
w____________w
w______p_____w
wwwwwwwwwwwwww`,

  // Level 1
  map`
wwwwwwwwwwwwww
w__w____s____w
w_PPPP__s____w
w_PPPP__s____w
w_PPPP__s____w
w__w____s____w
w____________w
w______p_____w
wwwwwwwwwwwwww`,
  
  // Level 2
  map`
wPPPPwwwwwwwww
wPPPP________w
wPPPP________w
w____________w
w_____r__s___w
w____________w
w_____r______w
w______p_____w
wwwwwwwwwwwwww`,

  // Level 3
  map`
wwwwwwwwwwwwww
wPPPP________w
wPPPP________w
wPPPP________w
wwwwww___wwwww
w_____r______w
w_s__________w
w_s____p_____w
w_s___r______w
wwwwwwwwwwwwww`,

  // Level 4
  map`
wPPPPwwwwwwwww
wPPPP________w
wPPPP________w
w_____r_s____w
w____________w
w_____s_r____w
w____________w
w______p_____w
wwwwwwwwwwwwww`,

  // Level 5
  map`
wwwwwwwwwwwwww
wPPPP__r__s__w
wPPPP__w__w__w
wPPPP__w__w__w
wPPPP________w
wwwwwwwww_wwww
w____________w
w______p_____w
wwwwwwwwwwwwww`,

  // Level 6
  map`
wPPPPwwwwwwwww
wPPPP________w
wPPPP__r_r___w
w____________w
w___s_s_s_s__w
w____________w
w______p_____w
wwwwwwwwwwwwww`,

  // Level 7
  map`
wwwwwwwwwwwwww
wPPPP________w
wPPPP_r_r_r__w
wPPPP________w
w_____s_s____w
w_____s_s____w
w____________w
w______p_____w
wwwwwwwwwwwwww`,

  // Level 8
  map`
wPPPPwwwwwwwww
wPPPP_r____r_w
wPPPP________w
w_____s_ss___w
w_____ssss___w
w____________w
w__r_______r_w
w______p_____w
wwwwwwwwwwwwww`
]


function loadLevel(n) {
  if (n >= levels.length) {
    clearText()
    addText("YOU WIN ALL!", { x: 5, y: 7, color: color`3` })
    return
  }
  
  clearText()
  setMap(levels[n])
  setBackground(floor) 
  
  sheepSavedInLevel = 0
  levelActive = true
}

loadLevel(currentLevel)


onInput("w", () => movePlayer(0, -1))
onInput("s", () => movePlayer(0, 1))
onInput("a", () => movePlayer(-1, 0))
onInput("d", () => movePlayer(1, 0))
onInput("j", () => loadLevel(currentLevel)) 

function movePlayer(dx, dy) {
  if (!levelActive) return; 

  const p = getFirst(player)
  const targetX = p.x + dx
  const targetY = p.y + dy
  
  const targetTile = getTile(targetX, targetY)
  if (!targetTile.some(t => t.type === wall)) {
    p.x += dx
    p.y += dy
    updateWorld()
  }
}

function updateWorld() {
  const p = getFirst(player)
  const allSheep = [...getAll(sheep), ...getAll(radSheep)]
  
  allSheep.forEach(s => {
    let moved = false
    
    if (s.type === sheep) { 
      const nearestPen = getClosestPen(s)
      if (nearestPen && nearestPen.dist < 5) {
         moved = moveToTarget(s, nearestPen.tile.x, nearestPen.tile.y)
      }
    }

    if (!moved) {
      const distToPlayer = Math.abs(p.x - s.x) + Math.abs(p.y - s.y)
      
      if (distToPlayer < 4) {
        let dx = 0; let dy = 0;
        if (p.x < s.x) dx = 1; else if (p.x > s.x) dx = -1;
        if (p.y < s.y) dy = 1; else if (p.y > s.y) dy = -1;
        
        if (!tryMove(s, dx, dy)) {
          if (!tryMove(s, dx, 0)) {
            if (!tryMove(s, 0, dy)) {
              if (dx !== 0 && !tryMove(s, 0, 1)) tryMove(s, 0, -1);
              else if (dy !== 0 && !tryMove(s, 1, 0)) tryMove(s, -1, 0);
            }
          }
        }
      }
      else {
        if (Math.random() < 0.15) {
          const dirs = [[0,1], [0,-1], [1,0], [-1,0]]
          const pick = dirs[Math.floor(Math.random() * dirs.length)]
          tryMove(s, pick[0], pick[1])
        }
      }
    }
  })
  
  checkInfection()
  checkPen()
  checkWinLoss()
}

function getClosestPen(s) {
  const allPens = getAll(pen)
  let closest = null
  let minDst = 999
  
  allPens.forEach(p => {
    const d = Math.abs(p.x - s.x) + Math.abs(p.y - s.y)
    if (d < minDst) {
      minDst = d
      closest = p
    }
  })
  
  if (closest) return { tile: closest, dist: minDst }
  return null
}

function moveToTarget(s, tx, ty) {
  let dx = 0; let dy = 0;
  if (tx > s.x) dx = 1; else if (tx < s.x) dx = -1;
  if (ty > s.y) dy = 1; else if (ty < s.y) dy = -1;
  
  if (tryMove(s, dx, dy)) return true;
  if (dx !== 0 && tryMove(s, dx, 0)) return true;
  if (dy !== 0 && tryMove(s, 0, dy)) return true;
  
  return false;
}

function tryMove(s, dx, dy) {
  if (dx === 0 && dy === 0) return false;
  const destX = s.x + dx;
  const destY = s.y + dy;
  if (destX < 0 || destX > 15 || destY < 0 || destY > 15) return false;
  if (isSolid(destX, destY)) return false;

  s.x = destX;
  s.y = destY;
  return true;
}

function isSolid(x, y) {
  const t = getTile(x, y)
  const hasWall = t.some(s => s.type === wall)
  const hasSheep = t.some(s => s.type === sheep || s.type === radSheep)
  const hasPlayer = t.some(s => s.type === player)
  
  return hasWall || hasSheep || hasPlayer
}

function checkInfection() {
  if (!levelActive) return;
  const bads = getAll(radSheep)
  const goods = getAll(sheep)
  goods.forEach(g => {
    bads.forEach(b => {
      const dist = Math.abs(g.x - b.x) + Math.abs(g.y - b.y)
      if (dist <= 1) sfx_infect(g.x, g.y);
    })
  })
}

function sfx_infect(x, y) {
  const targets = getTile(x, y).filter(t => t.type === sheep)
  targets.forEach(t => t.remove())
  addSprite(x, y, radSheep)
  addText("INFECTED!", {x: 4, y: 14, color: color`5`})
  setTimeout(() => clearText(), 800)
}

function checkPen() {
  if (!levelActive) return;
  const pens = getAll(pen)
  pens.forEach(pTile => {
    const occupants = getTile(pTile.x, pTile.y)
    const badHere = occupants.find(o => o.type === radSheep)
    if (badHere) triggerLoss("CONTAMINATED!");
    
    const goodHere = occupants.find(o => o.type === sheep)
    if (goodHere) {
      goodHere.remove()
      sheepSavedInLevel++
    }
  })
}

function checkWinLoss() {
  if (!levelActive) return;
  const remainingSheep = getAll(sheep).length
  if (remainingSheep === 0) {
    if (sheepSavedInLevel > 0) triggerWin();
    else triggerLoss("ALL INFECTED");
  }
}

function triggerLoss(msg) {
  if (!levelActive) return;
  levelActive = false
  addText(msg, {x: 2, y: 7, color: color`6`})
  setTimeout(() => loadLevel(currentLevel), 2000)
}

function triggerWin() {
  if (!levelActive) return;
  levelActive = false
  currentLevel++
  addText("LEVEL CLEAR", {x: 4, y: 7, color: color`3`})
  setTimeout(() => loadLevel(currentLevel), 2000)
}