/*
@title: Neon Racer
@author: CycloneAddons
@description: A fast paced 2D racing game in Sprig with smooth downward scrolling.
@tags: ['racing', 'smooth']
@addedOn: 2026-06-15

Use "J" To Start or Restart Game
Use "A" To move Left
Use "D" To move Right
*/



const BOMB_F1 = "x", BOMB_F2 = "y", BOMB_F3 = "z", BOMB_F4 = "v"
const NORMAL_CAR = "e", FUEL = "f", SWERVER_CAR = "s", PLAYER_CAR = "p"
const ROCK = "o", MARKER = "m", TREE = "t"
const GRASS = "g", ROAD = "r", CURB_L = "q", CURB_R = "w"

setLegend(
    [BOMB_F1, bitmap`
................
................
................
................
.......99.......
......9669......
.....966669.....
.....966669.....
......9669......
.......99.......
................
................
................
................
................
................` ],

    [BOMB_F2, bitmap`
................
................
.......99.......
......9669......
.....969969.....
....96966969....
....96966969....
.....969969.....
......9669......
.......99.......
................
................
................
................
................
................` ],

    [BOMB_F3, bitmap`
................
......9999......
.....966669.....
....96999969....
...9696666969...
...9696996969...
...9696996969...
...9696666969...
....96999969....
.....966669.....
......9999......
................
................
................
................
................` ],

    [BOMB_F4, bitmap`
......9..9......
....99....99....
...9..6..6..9...
.....6.99.6.....
..9.6.9..9.6.9..
...6.9....9.6...
...6.9....9.6...
..9.6.9..9.6.9..
..9..6.99.6..9..
...9..6..6..9...
....9......9....
......99.9......
................
................
................
................` ],

    [NORMAL_CAR, bitmap`
....H66HH66H....
....HHHHHHHH....
....LHHHHHHL....
....LH7777HL....
....HH7777HH....
....HHHHHHHH....
....HLLLLLLH....
....HL5555LH....
....HL5555LH....
....HLLLLLLH....
....HHHHHHHH....
....HH7777HH....
....HH7777HH....
....LH7777HL....
....LHHHHHHL....
....H33HH33H....` ],

    [FUEL, bitmap`
................
......000.......
......0..0......
....00000000....
....07777770....
....07333370....
....07777770....
....07777770....
....07333370....
....07777770....
....00000000....
................
................
................
................
................` ],

    [SWERVER_CAR, bitmap`
....60066006....
....66666666....
....L666666L....
....L677776L....
....66777766....
....66666666....
....6LLLLLL6....
....6L5555L6....
....6L5555L6....
....6LLLLLL6....
....66666666....
....66777766....
....66777766....
....L677776L....
....L666666L....
....63366336....` ],

    [PLAYER_CAR, bitmap`
....26622662....
....22222222....
....L222222L....
....L277772L....
....22777722....
....22222222....
....2LLLLLL2....
....2L5555L2....
....2L5555L2....
....2LLLLLL2....
....22222222....
....22777722....
....22777722....
....L277772L....
....L222222L....
....23399332....` ],

    [ROCK, bitmap`
................
................
................
......22222.....
....222L222.....
...22LLL2222....
...22L1111112...
..22LLL1111122..
.22LLLLLL111022.
2LLLLLLLL1110022
2LLLLLLL11110002
2LLLLLL111100022
20LLL11111000222
2200011000002222
.22200000002222.
...2222222222...` ],

    [MARKER, bitmap`
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......
.......66.......` ],

    [TREE, bitmap`
.......DD.......
......DDDD......
.....DDD4DD.....
....DDD4DDDD....
...DDD4DD4DDD...
..DDD4DD44D4DD..
..DD4D4444D4DD..
..DD44444444DD..
.DD4444DDD44DDD.
DDD444444DDDDDDD
DDDDDDDDDDDDDDDD
.......CC.......
.......CC.......
.......CC.......
.......CC.......
.......CC.......` ],

    [GRASS, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444DD4444444
44444DDD44444444
44444D4444444444
4444444444444444
4444444444444444
4444444444444444
4444444DD4444444
4444444D44444444
444444DD44444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ],

    [ROAD, bitmap`
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
LLLLLLLLLLLLLLLL` ],

    [CURB_L, bitmap`
222222222222LL22
222222222222LL11
222222222222LL11
222222222222LL22
222222222222LL22
222222222222LL11
222222222222LL11
222222222222LL22
222222222222LL22
222222222222LL11
222222222222LL11
222222222222LL22
222222222222LL22
222222222222LL11
222222222222LL11
222222222222LL22` ],

    [CURB_R, bitmap`
22LL222222222222
11LL222222222222
11LL222222222222
22LL222222222222
11LL222222222222
11LL222222222222
22LL222222222222
11LL222222222222
11LL222222222222
22LL222222222222
11LL222222222222
11LL222222222222
22LL222222222222
11LL222222222222
11LL222222222222
22LL222222222222` ]

)

const levelMap = `
gggqrrrrrrrrwggg
gggqrrrrrrrrwggg
gggqrrrrrrrrwggg
gggqrrrrrrrrwggg
gggqrrrrrrrrwggg
gggqrrrrrrrrwggg
gggqrrrrrrrrwggg
gggqrrrrrrrrwggg
gggqrrrrrrrrwggg
gggqrrrrrrrrwggg
gggqrrrrrrrrwggg
gggqrrrrrrrrwggg
gggqrrrrrrrrwggg
gggqrrrrrrrrwggg
`.trim()

let gameState = 0
let score = 0
let distance = 0
let fuel = 100
let loopTimer = null
let bgmPlayback = null
let lastSpeedLevel = 0

const bgmTune = tune`
476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4^476.1904761904762,
476.1904761904762: D5/476.1904761904762,
476.1904761904762: G4~476.1904761904762 + C5/476.1904761904762,
476.1904761904762: A4~476.1904761904762 + G4^476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4-476.1904761904762,
476.1904761904762: D5/476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4~476.1904761904762,
476.1904761904762: A4~476.1904761904762 + G4^476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4-476.1904761904762,
476.1904761904762: D5/476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4~476.1904761904762,
476.1904761904762: A4~476.1904761904762 + G4^476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4-476.1904761904762,
476.1904761904762: D5/476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4~476.1904761904762,
476.1904761904762: A4~476.1904761904762 + G4^476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4-476.1904761904762,
476.1904761904762: D5/476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4~476.1904761904762,
476.1904761904762: A4~476.1904761904762 + G4^476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4-476.1904761904762,
476.1904761904762: D5/476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4~476.1904761904762,
476.1904761904762: A4~476.1904761904762 + G4^476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4-476.1904761904762,
476.1904761904762: D5/476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4~476.1904761904762,
476.1904761904762: A4~476.1904761904762 + G4^476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4-476.1904761904762,
476.1904761904762: D5/476.1904761904762,
476.1904761904762: C5/476.1904761904762 + G4~476.1904761904762
`

const steerTune = tune`
30,
30: G4-30
`

const speedUpTune = tune`
80,
80: C5/80,
80: E5/80,
80: G5/80,
80: C6/80
`

const fuelPickupTune = tune`
100,
100: C5/100,
100: E5/100,
100: G5/100,
100: C6/150
`

const crashTune = tune`
50,
50: G4-50,
50: F4-50,
50: D4-50,
50: C3-50,
50: A2-50,
50: G2-100,
50: C2-200
`

const startTune = tune`
100,
100: C4/100,
100: E4/100,
100: G4/100,
100: C5/200
`

function showTitle() {
    gameState = 0
    setMap(levelMap)
    clearSprites()
    clearText()

    addText("NEON RACER", { x: 3, y: 3, color: color`5` })
    addText("PRESS 'J'", { x: 4, y: 7, color: color`7` })
    addText("TO START", { x: 4, y: 8, color: color`7` })

    addSprite(6, 11, PLAYER_CAR)
    addSprite(9, 5, NORMAL_CAR)
}

function startGame() {
    gameState = 1
    score = 0
    distance = 0
    fuel = 100
    lastSpeedLevel = 0

    setMap(levelMap)
    clearSprites()
    clearText()

    addSprite(10, 11, PLAYER_CAR)
    updateHUD()

    if (bgmPlayback) {
        bgmPlayback.end()
    }
    playTune(startTune)
    bgmPlayback = playTune(bgmTune, Infinity)

    if (loopTimer) clearTimeout(loopTimer)
    loopTimer = setTimeout(gameTick, 150)
}

function gameOver(crashX, crashY) {
    gameState = 2
    clearTimeout(loopTimer)

    if (bgmPlayback) {
        bgmPlayback.end()
        bgmPlayback = null
    }
    playTune(crashTune)

    getAll(PLAYER_CAR).forEach(s => s.remove())
    getAll(NORMAL_CAR).forEach(s => { if (s.x === crashX && s.y === crashY) s.remove() })
    getAll(ROCK).forEach(s => { if (s.x === crashX && s.y === crashY) s.remove() })
    getAll(SWERVER_CAR).forEach(s => { if (s.x === crashX && s.y === crashY) s.remove() })

    addSprite(crashX, crashY, BOMB_F1)

    setTimeout(() => {
        getAll(BOMB_F1).forEach(s => s.remove())
        addSprite(crashX, crashY, BOMB_F2)
    }, 200)

    setTimeout(() => {
        getAll(BOMB_F2).forEach(s => s.remove())
        addSprite(crashX, crashY, BOMB_F3)
    }, 400)

    setTimeout(() => {
        getAll(BOMB_F3).forEach(s => s.remove())
        addSprite(crashX, crashY, BOMB_F4)
    }, 600)

    setTimeout(() => {
        getAll(BOMB_F4).forEach(s => s.remove())
    }, 800)

    setTimeout(() => {
        addText("CRASHED!", { x: 4, y: 5, color: color`1` })
        addText(`SCORE:${score}`, { x: 4, y: 7, color: color`4` })
        addText("PRESS 'J'", { x: 4, y: 9, color: color`7` })
        addText("TO RESTART", { x: 3, y: 10, color: color`7` })

        gameState = 3
    }, 2000)
}

function clearSprites() {
    getAll(FUEL).forEach(s => s.remove())
    getAll(PLAYER_CAR).forEach(s => s.remove())
    getAll(NORMAL_CAR).forEach(s => s.remove())
    getAll(ROCK).forEach(s => s.remove())
    getAll(TREE).forEach(s => s.remove())
    getAll(MARKER).forEach(s => s.remove())
    getAll(BOMB_F1).forEach(s => s.remove())
    getAll(BOMB_F2).forEach(s => s.remove())
    getAll(BOMB_F3).forEach(s => s.remove())
    getAll(BOMB_F4).forEach(s => s.remove())
    getAll(SWERVER_CAR).forEach(s => s.remove())
}

function updateHUD() {
    clearText()
    addText(`S:${score} F:${Math.floor(fuel)}`, { x: 1, y: 0, color: color`0` })
}

function gameTick() {
    if (gameState !== 1) return

    distance++
    score += 1
    fuel -= 0.4

    let p = getFirst(PLAYER_CAR)
    if (fuel <= 0 && p) {
        gameOver(p.x, p.y)
        return
    }

    getAll(MARKER).forEach(sprite => {
        sprite.y += 1
        if (sprite.y > 13) sprite.remove()
    });

    [...getAll(NORMAL_CAR), ...getAll(ROCK), ...getAll(TREE), ...getAll(FUEL)].forEach(sprite => {
        sprite.y += 1
        if (p && sprite.y > p.y) {
            sprite.remove()
        } else if (sprite.y > 13) {
            sprite.remove()
        }
    })

    getAll(SWERVER_CAR).forEach(sprite => {
        sprite.y += 1
        if (Math.random() < 0.5) {
            let swerve = Math.random() < 0.5 ? -1 : 1
            let nx = sprite.x + swerve
            if (nx >= 4 && nx <= 11) {
                sprite.x = nx
            }
        }
        if (p && sprite.y > p.y) {
            sprite.remove()
        } else if (sprite.y > 13) {
            sprite.remove()
        }
    })

    if (distance % 3 === 0) {
        addSprite(6, 0, MARKER)
        addSprite(9, 0, MARKER)
    }

    if (Math.random() < 0.3) {
        let tx = Math.random() < 0.5 ? Math.floor(Math.random() * 3) : 13 + Math.floor(Math.random() * 3)
        addSprite(tx, 0, TREE)
    }

    let enemySpawnChance = 0.05 + (distance * 0.0001)
    if (enemySpawnChance > 0.15) enemySpawnChance = 0.15

    if (Math.random() < enemySpawnChance) {
        let ex = 4 + Math.floor(Math.random() * 8)
        let safeToSpawn = true

        getAll(NORMAL_CAR).forEach(e => { if (e.y <= 1 && e.x === ex) safeToSpawn = false })
        getAll(ROCK).forEach(o => { if (o.y <= 1 && o.x === ex) safeToSpawn = false })
        getAll(FUEL).forEach(f => { if (f.y <= 1 && f.x === ex) safeToSpawn = false })
        getAll(SWERVER_CAR).forEach(s => { if (s.y <= 1 && s.x === ex) safeToSpawn = false })

        if (safeToSpawn) {
            let roll = Math.random()
            let type = roll < 0.4 ? NORMAL_CAR : (roll < 0.75 ? ROCK : SWERVER_CAR)
            addSprite(ex, 0, type)
        }
    }

    if (Math.random() < 0.04) {
        let fx = 4 + Math.floor(Math.random() * 8)
        let safeToSpawn = true
        getAll(NORMAL_CAR).forEach(e => { if (e.y <= 1 && e.x === fx) safeToSpawn = false })
        getAll(ROCK).forEach(o => { if (o.y <= 1 && o.x === fx) safeToSpawn = false })
        getAll(FUEL).forEach(f => { if (f.y <= 1 && f.x === fx) safeToSpawn = false })
        getAll(SWERVER_CAR).forEach(s => { if (s.y <= 1 && s.x === fx) safeToSpawn = false })

        if (safeToSpawn) {
            addSprite(fx, 0, FUEL)
        }
    }

    checkCollisions()
    if (gameState !== 1) return

    let speedLevel = Math.floor(score / 100)
    if (speedLevel > lastSpeedLevel) {
        playTune(speedUpTune)
        lastSpeedLevel = speedLevel
    }
    let newSpeed = Math.max(40, 150 - (speedLevel * 15))

    updateHUD()
    loopTimer = setTimeout(gameTick, newSpeed)
}

function checkCollisions() {
    let p = getFirst(PLAYER_CAR)
    if (!p) return

    getAll(FUEL).forEach(f => {
        if (f.x === p.x && f.y === p.y) {
            fuel = Math.min(100, fuel + 40)
            f.remove()
            playTune(fuelPickupTune)
        }
    })

    let hit = false
    getAll(NORMAL_CAR).forEach(e => { if (e.x === p.x && e.y === p.y) hit = true })
    getAll(ROCK).forEach(o => { if (o.x === p.x && o.y === p.y) hit = true })
    getAll(SWERVER_CAR).forEach(s => { if (s.x === p.x && s.y === p.y) hit = true })

    if (hit) {
        gameOver(p.x, p.y)
    }
}

function movePlayer_CAR(dx) {
    if (gameState !== 1) return
    let p = getFirst(PLAYER_CAR)
    if (!p) return

    let newX = p.x + dx
    if (newX >= 4 && newX <= 11) {
        p.x = newX
        playTune(steerTune)
        checkCollisions()
    }
}

onInput("a", () => movePlayer_CAR(-1))
onInput("d", () => movePlayer_CAR(1))

onInput("j", () => {
    if (gameState === 0 || gameState === 3) {
        startGame()
    }
})

showTitle()