// Déclaration des sprites
const player = "p"
const enemy = "e"
const bullet = "b"
const enemyBullet = "x"
const empty = " "

// Définition des bitmaps pour chaque type
setLegend(
  [ player, bitmap`
....22..........
....22..........
...2222.........
..222222........
..222222........
...2222.........
....22..........
....22..........
................
................
................
................
................
................
................
................` ],

  [ enemy, bitmap`
....3.....
...333....
..33333...
..3...3...
..33333...
...333....
....3.....
..........
` ],

  [ bullet, bitmap`
....5.....
....5.....
....5.....
..........
..........
..........
..........
..........
` ],

  [ enemyBullet, bitmap`
....7.....
....7.....
....7.....
..........
..........
..........
..........
..........
` ],

  [ empty, bitmap`
..........
..........
..........
..........
..........
..........
..........
..........
` ]
)

// Définition des sons (petits bouts de tune)
const shootSound = tune`C4:4`
const enemyShootSound = tune`E4:4`
const explosionSound = tune`G4:4`
const winSound = tune`C5:4`
const loseSound = tune`C3:4`

// Arrière-plan et niveau initial
setBackground(empty)
const level = map`
................
................
................
................
................
................
................
.......p........
`
setMap(level)
setSolids([])

// Variables globales
let score = 0
let turnCounter = 0
let gameOver = false
const SCORE_TO_WIN = 50  // seuil pour gagner

// Affichage initial du score
clearText()
addText("Score: " + score, { x: 1, y: 1, color: color`3` })

// Création d'une première ligne d'ennemis
for (let x = 2; x <= 13; x += 2) {
  addSprite(x, 0, enemy)
}

// Déplacements du joueur et tir
onInput("a", () => {
  if (gameOver) return
  let p = getFirst(player)
  if (p.x > 0) p.x -= 1
})
onInput("d", () => {
  if (gameOver) return
  let p = getFirst(player)
  if (p.x < width() - 1) p.x += 1
})
onInput("w", () => {
  if (gameOver) return
  const p = getFirst(player)
  addSprite(p.x, p.y - 1, bullet)
  playTune(shootSound)
})

// Fonction pour gérer la fin du jeu
function endGame(victoire) {
  gameOver = true
  clearText()
  if (victoire) {
    addText("VICTOIRE!", { x: 4, y: 4, color: color`6` })
    playTune(winSound)
  } else {
    addText("DEFAITE!", { x: 4, y: 4, color: color`5` })
    playTune(loseSound)
  }
}

// Mise à jour globale après chaque input
afterInput(() => {
  if (gameOver) return

  turnCounter++

  // Mise à jour des tirs du joueur
  for (const b of getAll(bullet)) {
    b.y -= 1
    if (b.y < 0) b.remove()
    // Collision bullet / enemy
    let targets = getTile(b.x, b.y).filter(t => t.type === enemy)
    if (targets.length > 0) {
      b.remove()
      targets[0].remove()
      playTune(explosionSound)
      score += 10
      clearText()
      addText("Score: " + score, { x: 1, y: 1, color: color`3` })
    }
  }

  // Mise à jour des tirs ennemis
  for (const eb of getAll(enemyBullet)) {
    eb.y += 1
    if (eb.y >= height()) {
      eb.remove()
    }
    // Collision enemyBullet / joueur
    let playerHits = getTile(eb.x, eb.y).filter(t => t.type === player)
    if (playerHits.length > 0) {
      endGame(false)
    }
  }

  // Tous les 5 tours, les ennemis descendent d'une ligne
  if (turnCounter % 5 === 0) {
    for (const en of getAll(enemy)) {
      en.y += 1
      // Si un ennemi dépasse une certaine ligne (proche du joueur)
      if (en.y >= getFirst(player).y) {
        endGame(false)
        return
      }
      // Chaque ennemi a une chance de tirer après avoir descendu
      if (Math.random() < 0.3) {
        // Vérifier que la case en dessous est dans la carte
        if (en.y + 1 < height()) {
          addSprite(en.x, en.y + 1, enemyBullet)
          playTune(enemyShootSound)
        }
      }
    }
  }

  // Vérifier la victoire : aucun ennemi restant ou score seuil atteint
  if (getAll(enemy).length === 0 || score >= SCORE_TO_WIN) {
    endGame(true)
  }
})
