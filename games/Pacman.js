/*
    @title: Pacman
    @author: Pradyumn Tandon AKA Gamecooler19
    @tags: [classic, retro, arcade]
    @addedOn: 2025-02-05
*/

    // Game sprites
    const SPRITES = {
    PLAYER: "p",
    WALL: "w",
    DOT: "d",
    POWER: "o",
    GHOST: {
        CHASER: "g",
        FLANKER: "h",
        RANDOM: "i",
        AMBUSHER: "j"
    },
    BUTTON: {
        EXIT: "x",
        RESTART: "r"
    }
    }

    // Sound effects and music
    const MUSIC_THEME = tune`
    200: e4^4 + c4^4,
    200: d4^4 + b3^4,
    200: c4^4 + a3^4,
    200: b3^4 + g3^4,
    200: a3^4 + f3^4,
    200: g3^4 + e3^4,
    200: f3^4 + d3^4,
    200: e3^4 + c3^4,
    200: d3^4 + b2^4,
    200: c3^4 + a2^4,
    400: b2-2 + g2-2`

    const POWER_SOUND = tune`
    200: e5/4,
    200: g5/4,
    200: b5/4,
    200: d6/4`

    const DOT_SOUND = tune`500: c5/8`
    const DEATH_SOUND = tune`
    150: c4-8,
    150: b3-8,
    150: a3-8,
    150: g3-8`

    // Game state
    let score = 0
    let powerMode = 0
    const ghostRespawnTime = 100 // 10 seconds equivalent
    // Adjust spawn points to be within map bounds
    const ghostSpawnPoints = [
    {x: 7, y: 8},
    {x: 8, y: 8},
    {x: 7, y: 9},
    {x: 8, y: 9}
    ]
    let ghostRespawnQueue = []

    // Performance management with consistent naming
    const PERF = {
    frameTime: 1000 / 60,
    ghostUpdateDelay: 150,
    getTime: () => Date.now(),
    timing: {
        last: Date.now(),
        ghostUpdate: Date.now()
    },
    counters: {
        frame: 0,
        ghost: 0
    }
    }

    // Direction vectors for movement
    const DIRECTIONS = {
    UP: { dx: 0, dy: -1 },
    DOWN: { dx: 0, dy: 1 },
    LEFT: { dx: -1, dy: 0 },
    RIGHT: { dx: 1, dy: 0 }
    }

    // Game state management
    let gameState = "playing" // playing, paused, over
    let restartRequested = false

    // Helper to check if position is within bounds
    const isInBounds = (x, y) => {
    return x >= 0 && x < width() && y >= 0 && y < height()
    }

    // Initialize ghost state tracking
    const ghostStates = new Map()

    // Helper to spawn ghosts with different types
    const spawnGhost = (position, type) => {
    if (isInBounds(position.x, position.y)) {
        const ghost = addSprite(position.x, position.y, type)
        // Initialize ghost state
        ghostStates.set(ghost, {
        lastDx: 0,
        lastDy: 0,
        lastUpdate: 0
        })
        return ghost
    }
    }

    // Initial ghost spawn with different types
    ghostSpawnPoints.forEach((pos, index) => {
    const ghostTypes = Object.values(SPRITES.GHOST)
    spawnGhost(pos, ghostTypes[index % ghostTypes.length])
    })

    // Add player state tracking
    const playerState = {
    lastX: null,
    lastY: null,
    lastMoveTime: 0,
    movementHistory: []
    }

    setLegend(
    [ SPRITES.PLAYER, bitmap`
    ................
    ......6666......
    ....66666666....
    ...6666666666...
    ..666666666666..
    ..666666666666..
    .66666666666666.
    .66666666666666.
    .66666666666666.
    .66666666666666.
    ..666666666666..
    ..666666666666..
    ...6666666666...
    ....66666666....
    ......6666......
    ................`],
    [ SPRITES.WALL, bitmap`
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
    [ SPRITES.DOT, bitmap`
    ................
    ................
    ................
    ................
    ................
    .......33.......
    ......3333......
    ......3333......
    ......3333......
    .......33.......
    ................
    ................
    ................
    ................
    ................
    ................`],
    [ SPRITES.POWER, bitmap`
    ................
    ......7777......
    ....77777777....
    ...7777777777...
    ..777777777777..
    ..777777777777..
    .77777777777777.
    .77777777777777.
    .77777777777777.
    .77777777777777.
    ..777777777777..
    ..777777777777..
    ...7777777777...
    ....77777777....
    ......7777......
    ................`],
    [ SPRITES.GHOST.CHASER, bitmap`
    ................
    ......4444......
    ....44444444....
    ...4444444444...
    ..444444444444..
    ..444444444444..
    .44444444444444.
    .44444444444444.
    .44444444444444.
    .44444444444444.
    .44444444444444.
    .44444444444444.
    .4444..4444..44.
    .444....444....4
    .44......44.....
    ................`],
    [ SPRITES.GHOST.FLANKER, bitmap`
    ................
    ......5555......
    ....55555555....
    ...5555555555...
    ..555555555555..
    ..555555555555..
    .55555555555555.
    .55555555555555.
    .55555555555555.
    .55555555555555.
    .55555555555555.
    .55555555555555.
    .5555..5555..55.
    .555....555....5
    .55......55.....
    ................`],
    [ SPRITES.GHOST.RANDOM, bitmap`
    ................
    ......3333......
    ....33333333....
    ...3333333333...
    ..333333333333..
    ..333333333333..
    .33333333333333.
    .33333333333333.
    .33333333333333.
    .33333333333333.
    .33333333333333.
    .33333333333333.
    .3333..3333..33.
    .333....333....3
    .33......33.....
    ................`],
    [ SPRITES.GHOST.AMBUSHER, bitmap`
    ................
    ......7777......
    ....77777777....
    ...7777777777...
    ..777777777777..
    ..777777777777..
    .77777777777777.
    .77777777777777.
    .77777777777777.
    .77777777777777.
    .77777777777777.
    .77777777777777.
    .7777..7777..77.
    .777....777....7
    .77......77.....
    ................`],
    [ SPRITES.BUTTON.EXIT, bitmap`
    ................
    .999999999999999
    .9..............
    .9.999..999.999.
    .9.9.9..9.9.9.9.
    .9.999..9.9.9.9.
    .9.9....9.9.9.9.
    .9.9....999.999.
    .9..............
    .999999999999999
    ................
    ................
    ................
    ................
    ................
    ................`],
    [ SPRITES.BUTTON.RESTART, bitmap`
    ................
    .666666666666666
    .6..............
    .6.666.666.666..
    .6.6.6.6...6....
    .6.666.666.666..
    .6.6.6...6.6....
    .6.6.6.666.666..
    .6..............
    .666666666666666
    ................
    ................
    ................
    ................
    ................
    ................`]
    )

    const level = map`
    wwwwwwwwwwwwwwww
    w..d.d.ww.d.d..w
    w.ww.w.ww.w.ww.w
    wodw.w.ww.w.wdo.
    w.ww.w.ww.w.ww.w
    w.d..d..d..d..dw
    w.ww.wwwwww.ww.w
    w.d..d.ww.d..d.w
    wwww.w.ww.w.wwww
    w..d...pg...d..w
    w.ww.w.ww.w.ww.w
    w.dw.w.ww.w.wd.w
    w.ww.w.ww.w.ww.w
    w..d.d..d..d..dw
    w.ww.wwwwww.ww.w
    wwwwwwwwwwxrwwww`

    setMap(level)
    setSolids([SPRITES.WALL])

    // Sound management
    let musicLoop = null
    const SOUND = {
    music: {
        isPlaying: false,
        volume: 0.5,
        lastPlayTime: 0
    }
    }

    // Improved music handling
    const startMusic = () => {
    try {
        if (musicLoop) {
        musicLoop.end()
        musicLoop = null
        }
        
        SOUND.music.lastPlayTime = Date.now()
        SOUND.music.isPlaying = true
        musicLoop = playTune(MUSIC_THEME, Infinity)
        
        if (musicLoop && typeof musicLoop.setVolume === 'function') {
        musicLoop.setVolume(SOUND.music.volume)
        }
    } catch (error) {
        console.error('Music playback error:', error)
        musicLoop = null
        SOUND.music.isPlaying = false
    }
    }

    const stopMusic = () => {
    if (musicLoop) {
        musicLoop.end()
        musicLoop = null
    }
    SOUND.music.isPlaying = false
    }

    // Optimized movement function
    const movePlayer = (dx, dy) => {
    const player = getFirst(SPRITES.PLAYER)
    const newX = player.x + dx
    const newY = player.y + dy
    
    if (!isInBounds(newX, newY)) return
    
    const tile = getTile(newX, newY)
    if (!tile.some(sprite => sprite.type === SPRITES.WALL)) {
        // Store previous position
        playerState.lastX = player.x
        playerState.lastY = player.y
        playerState.lastMoveTime = performance.now()
        
        // Update movement history
        playerState.movementHistory.unshift({ x: player.x, y: player.y, time: performance.now() })
        if (playerState.movementHistory.length > 5) playerState.movementHistory.pop()
        
        player.x = newX
        player.y = newY
        
        // Collect items with sound
        const dot = tile.find(sprite => sprite.type === SPRITES.DOT)
        if (dot) {
        dot.remove()
        score += 10
        playTune(DOT_SOUND)
        }
        
        const power = tile.find(sprite => sprite.type === SPRITES.POWER)
        if (power) {
        power.remove()
        powerMode = 50
        score += 50
        playTune(POWER_SOUND)
        }
    }
    }

    // Controls
    onInput("w", () => movePlayer(0, -1))
    onInput("s", () => movePlayer(0, 1))
    onInput("a", () => movePlayer(-1, 0))
    onInput("d", () => movePlayer(1, 0))

    // Calculate Manhattan distance between two points
    const getDistance = (x1, y1, x2, y2) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }

    // Get best direction to chase target with boundary checking
    const getChaseDirection = (ghost, target) => {
    const dirs = [
        { dx: 0, dy: -1 }, // up
        { dx: 0, dy: 1 },  // down
        { dx: -1, dy: 0 }, // left
        { dx: 1, dy: 0 }   // right
    ];
    
    let bestDir = dirs[0];
    let minDistance = Infinity;
    
    // Find direction that gets us closest to target
    dirs.forEach(dir => {
        const newX = ghost.x + dir.dx;
        const newY = ghost.y + dir.dy;
        
        if (isInBounds(newX, newY)) {
        // Check if move is valid (not into wall)
        const tile = getTile(newX, newY);
        if (!tile.some(sprite => sprite.type === SPRITES.WALL)) {
            const distance = getDistance(newX, newY, target.x, target.y);
            if (distance < minDistance) {
            minDistance = distance;
            bestDir = dir;
            }
        }
        }
    });
    
    return bestDir;
    }

    // Get best direction to escape from ghosts with boundary checking
    const getBestEscapeDirection = (player) => {
    const dirs = [
        { dx: 0, dy: -1 }, // up
        { dx: 0, dy: 1 },  // down
        { dx: -1, dy: 0 }, // left
        { dx: 1, dy: 0 }   // right
    ]
    
    let bestDir = null
    let maxDistance = -Infinity
    
    dirs.forEach(dir => {
        const newX = player.x + dir.dx
        const newY = player.y + dir.dy
        
        if (isInBounds(newX, newY)) {
        const tile = getTile(newX, newY)
        if (!tile.some(sprite => sprite.type === SPRITES.WALL)) {
            let minGhostDistance = Infinity
            
            // Find closest ghost distance for this direction
            getAll(SPRITES.GHOST.CHASER).forEach(ghost => {
            const distance = getDistance(newX, newY, ghost.x, ghost.y)
            minGhostDistance = Math.min(minGhostDistance, distance)
            })
            
            if (minGhostDistance > maxDistance) {
            maxDistance = minGhostDistance
            bestDir = dir
            }
        }
        }
    })
    
    return bestDir || dirs[0]
    }

    // Optimized ghost movement with reduced calculations
    const getGhostDirection = (ghost, player) => {
    const ghostState = ghostStates.get(ghost)
    if (!ghostState) return { dx: 0, dy: 0 }
    
    switch(ghost.type) {
        case SPRITES.GHOST.CHASER:
        return findBestDirection(ghost, player, 'chase')
        case SPRITES.GHOST.FLANKER:
        return findBestDirection(ghost, player, 'flank')
        case SPRITES.GHOST.RANDOM:
        return findBestDirection(ghost, player, 'random')
        case SPRITES.GHOST.AMBUSHER:
        return findBestDirection(ghost, player, 'ambush')
        default:
        return findBestDirection(ghost, player, 'chase')
    }
    }

    // Helper function to check if movement is possible
    const canMove = (x, y) => {
    if (!isInBounds(x, y)) return false
    const tile = getTile(x, y)
    return !tile.some(sprite => sprite.type === SPRITES.WALL)
    }

    // Improved ghost movement logic with better pathfinding
    const findAlternativeDirection = (ghost, player) => {
    const dirs = [
        { dx: 0, dy: -1, priority: 0 },
        { dx: 0, dy: 1, priority: 0 },
        { dx: -1, dy: 0, priority: 0 },
        { dx: 1, dy: 0, priority: 0 }
    ]
    
    const ghostState = ghostStates.get(ghost) || { lastDx: 0, lastDy: 0 }
    
    dirs.forEach(dir => {
        const newX = ghost.x + dir.dx
        const newY = ghost.y + dir.dy
        
        if (canMove(newX, newY)) {
        const dist = getDistance(newX, newY, player.x, player.y)
        dir.priority = 1000 - dist
        
        if (dist < getDistance(ghost.x, ghost.y, player.x, player.y)) {
            dir.priority += 500
        }
        
        if (dir.dx === -ghostState.lastDx && dir.dy === -ghostState.lastDy) {
            dir.priority -= 750
        }
        } else {
        dir.priority = -1000
        }
    })
    
    const bestDir = dirs.reduce((a, b) => b.priority > a.priority ? b : a)
    ghostState.lastDx = bestDir.dx
    ghostState.lastDy = bestDir.dy
    ghostStates.set(ghost, ghostState)
    return bestDir
    }

    const findFlankingDirection = (ghost, player) => {
    const ahead = 4 // Look further ahead for flanking
    let targetX = player.x
    let targetY = player.y
    
    // Predict player movement based on current position
    const playerDx = player.x - ghost.x
    const playerDy = player.y - ghost.y
    
    // Try to intercept player
    if (Math.abs(playerDx) > Math.abs(playerDy)) {
        targetX += Math.sign(playerDx) * ahead
        targetY += Math.sign(playerDy) * 2
    } else {
        targetX += Math.sign(playerDx) * 2
        targetY += Math.sign(playerDy) * ahead
    }
    
    const dirs = [
        { dx: 0, dy: -1, priority: 0 },
        { dx: 0, dy: 1, priority: 0 },
        { dx: -1, dy: 0, priority: 0 },
        { dx: 1, dy: 0, priority: 0 }
    ]
    
    dirs.forEach(dir => {
        const newX = ghost.x + dir.dx
        const newY = ghost.y + dir.dy
        
        if (canMove(newX, newY)) {
        const dist = getDistance(newX, newY, targetX, targetY)
        dir.priority = 1000 - dist
        
        // Add bonus for maintaining movement direction
        if (dir.dx === ghost.lastDx && dir.dy === ghost.lastDy) {
            dir.priority += 250
        }
        } else {
        dir.priority = -1000
        }
    })
    
    const bestDir = dirs.reduce((a, b) => b.priority > a.priority ? b : a)
    ghost.lastDx = bestDir.dx
    ghost.lastDy = bestDir.dy
    return bestDir
    }

    const getRandomValidDirection = (ghost) => {
    const dirs = [
        { dx: 0, dy: -1 },
        { dx: 0, dy: 1 },
        { dx: -1, dy: 0 },
        { dx: 1, dy: 0 }
    ]
    
    const validDirs = dirs.filter(dir => 
        canMove(ghost.x + dir.dx, ghost.y + dir.dy)
    )
    
    return validDirs.length > 0 ? 
        validDirs[Math.floor(Math.random() * validDirs.length)] : 
        dirs[0]
    }

    const findAmbushDirection = (ghost, player) => {
    const predictionSteps = 5
    let targetX = player.x
    let targetY = player.y
    
    // Predict based on player's movement pattern
    if (player.lastX && player.lastY) {
        const dx = player.x - player.lastX
        const dy = player.y - player.lastY
        targetX += dx * predictionSteps
        targetY += dy * predictionSteps
    }
    
    const dirs = [
        { dx: 0, dy: -1, priority: 0 },
        { dx: 0, dy: 1, priority: 0 },
        { dx: -1, dy: 0, priority: 0 },
        { dx: 1, dy: 0, priority: 0 }
    ]
    
    dirs.forEach(dir => {
        const newX = ghost.x + dir.dx
        const newY = ghost.y + dir.dy
        
        if (canMove(newX, newY)) {
        const dist = getDistance(newX, newY, targetX, targetY)
        dir.priority = 1000 - dist
        
        // Add bonus for positions that block player's path
        const blocksPath = isBlockingPath(newX, newY, player.x, player.y, targetX, targetY)
        if (blocksPath) dir.priority += 500
        } else {
        dir.priority = -1000
        }
    })
    
    const bestDir = dirs.reduce((a, b) => b.priority > a.priority ? b : a)
    ghost.lastDx = bestDir.dx
    ghost.lastDy = bestDir.dy
    return bestDir
    }

    // Helper function to check if position blocks path
    const isBlockingPath = (x, y, fromX, fromY, toX, toY) => {
    const pathDist = getDistance(fromX, fromY, toX, toY)
    const distSum = getDistance(fromX, fromY, x, y) + getDistance(x, y, toX, toY)
    return Math.abs(pathDist - distSum) < 2
    }

    // Unified direction finding system
    const findBestDirection = (ghost, player, strategy) => {
    const dirs = [
        { dx: 0, dy: -1, priority: 0 },
        { dx: 0, dy: 1, priority: 0 },
        { dx: -1, dy: 0, priority: 0 },
        { dx: 1, dy: 0, priority: 0 }
    ]
    
    const ghostState = ghostStates.get(ghost) || { lastDx: 0, lastDy: 0 }
    
    dirs.forEach(dir => {
        const newX = ghost.x + dir.dx
        const newY = ghost.y + dir.dy
        
        if (canMove(newX, newY)) {
        switch(strategy) {
            case 'chase':
            dir.priority = calculateChasePriority(newX, newY, player, ghost)
            break
            case 'flank':
            dir.priority = calculateFlankPriority(newX, newY, player, ghost)
            break
            case 'random':
            dir.priority = Math.random() * 1000
            break
            case 'ambush':
            dir.priority = calculateAmbushPriority(newX, newY, player, ghost)
            break
        }
        } else {
        dir.priority = -Infinity
        }
    })
    
    const bestDir = dirs.reduce((a, b) => b.priority > a.priority ? b : a)
    ghostState.lastDx = bestDir.dx
    ghostState.lastDy = bestDir.dy
    ghostStates.set(ghost, ghostState)
    return bestDir
    }

    // Priority calculation functions
    const calculateChasePriority = (x, y, player, ghost) => {
    const dist = getDistance(x, y, player.x, player.y)
    const currentDist = getDistance(ghost.x, ghost.y, player.x, player.y)
    return 1000 - dist + (dist < currentDist ? 500 : 0)
    }

    const calculateFlankPriority = (x, y, player, ghost) => {
    const FLANK_DISTANCE = 4
    const predictedX = player.x + (player.x - ghost.x) * 2
    const predictedY = player.y + (player.y - ghost.y) * 2
    return 1000 - getDistance(x, y, predictedX, predictedY)
    }

    const calculateAmbushPriority = (x, y, player, ghost) => {
    const PREDICTION_STEPS = 5
    if (!player.lastX || !player.lastY) return 0
    
    const predictedX = player.x + (player.x - player.lastX) * PREDICTION_STEPS
    const predictedY = player.y + (player.y - player.lastY) * PREDICTION_STEPS
    
    const dist = getDistance(x, y, predictedX, predictedY)
    const blocksPath = checkPathIntersection(x, y, player.x, player.y, predictedX, predictedY)
    return 1000 - dist + (blocksPath ? 500 : 0)
    }

    // Improved path intersection check
    const checkPathIntersection = (x, y, fromX, fromY, toX, toY) => {
    const pathDist = getDistance(fromX, fromY, toX, toY)
    const throughDist = getDistance(fromX, fromY, x, y) + getDistance(x, y, toX, toY)
    return Math.abs(pathDist - throughDist) < 1.5
    }

    // Improved collision detection
    const checkCollision = (sprite1, sprite2) => {
    return sprite1 && sprite2 && 
            sprite1.x === sprite2.x && 
            sprite1.y === sprite2.y
    }

    // Improved collision handling
    const handleCollision = (ghost, player) => {
    if (!ghost || !player) return
    
    if (checkCollision(ghost, player)) {
        if (powerMode > 0) {
        handleGhostCapture(ghost)
        } else {
        handlePlayerDeath()
        }
    }
    }

    const handleGhostCapture = (ghost) => {
    ghostStates.delete(ghost)
    ghost.remove()
    ghostRespawnQueue.push({
        timer: ghostRespawnTime,
        type: ghost.type,
        originalX: ghost.x,
        originalY: ghost.y
    })
    score += 200
    }

    const handlePlayerDeath = () => {
    handleGameOver()
    }

    // Button handling
    const handleButtons = () => {
    const player = getFirst(SPRITES.PLAYER)
    if (!player) return false
    
    const playerTile = getTile(player.x, player.y)
    if (!playerTile) return false
    
    if (playerTile.some(sprite => sprite.type === SPRITES.BUTTON.EXIT)) {
        handleExit()
        return true
    }
    
    if (playerTile.some(sprite => sprite.type === SPRITES.BUTTON.RESTART)) {
        handleRestart()
        return true
    }
    
    return false
    }

    const handleExit = () => {
    clearText()
    addText("Thanks for playing!", { y: 8, color: color`3` })
    setTimeout(() => window.location.reload(), 1000)
    }

    const handleRestart = () => {
    restartRequested = true
    }

    // Game reset function
    const resetGame = () => {
    score = 0
    powerMode = 0
    gameState = "playing"
    restartRequested = false
    ghostStates.clear()
    
    // Remove all existing sprites
    getAll().forEach(sprite => sprite.remove())
    
    // Reset map and spawn entities
    setMap(level)
    ghostSpawnPoints.forEach((pos, index) => {
        const ghostTypes = Object.values(SPRITES.GHOST)
        spawnGhost(pos, ghostTypes[index % ghostTypes.length])
    })
    
    // Reset timing
    const now = PERF.getTime()
    PERF.timing.last = now
    PERF.timing.ghostUpdate = now
    PERF.counters.frame = 0
    PERF.counters.ghost = 0
    
    stopMusic()
    startMusic()
    }

    // Performance optimized game loop
    afterInput(() => {
    if (gameState === "over") return
    
    if (!updateTiming()) return
    
    // Check button interactions
    if (handleButtons()) {
        if (restartRequested) {
        resetGame()
        return
        }
    }
    
    // Use PERF counter for ghost updates
    const currentTime = PERF.getTime()
    if (currentTime - PERF.timing.ghostUpdate >= PERF.ghostUpdateDelay) {
        PERF.timing.ghostUpdate = currentTime
        
        const player = getFirst(SPRITES.PLAYER)
        if (!player) return
        
        // Process ghosts with spatial partitioning
        const sectors = new Map()
        const sectorSize = 4
        
        getAll(sprite => 
        Object.values(SPRITES.GHOST).includes(sprite.type)
        ).forEach(ghost => {
        const sectorX = Math.floor(ghost.x / sectorSize)
        const sectorY = Math.floor(ghost.y / sectorSize)
        const key = `${sectorX},${sectorY}`
        
        if (!sectors.has(key)) sectors.set(key, [])
        sectors.get(key).push(ghost)
        })
        
        // Process ghosts by sector
        sectors.forEach(sectorGhosts => {
        sectorGhosts.forEach(ghost => {
            const dir = getGhostDirection(ghost, player)
            const newX = ghost.x + dir.dx
            const newY = ghost.y + dir.dy
            
            if (canMove(newX, newY)) {
            ghost.x = newX
            ghost.y = newY
            
            if (ghost.x === player.x && ghost.y === player.y) {
                handleCollision(ghost, player)
            }
            }
        })
        })
    }
    
    // Update displays
    if (powerMode > 0) powerMode--
    clearText()
    addText(`Score: ${score}`, { y: 0, color: color`3` })
    
    // Check win condition with optimization
    if (getAll(SPRITES.DOT).length === 0 && getAll(SPRITES.POWER).length === 0) {
        gameState = "over"
        clearText()
        addText("YOU WIN!", { y: 8, color: color`3` })
    }
    })

    // Update game over handling
    const handleGameOver = () => {
    gameState = "over"
    stopMusic()
    playTune(DEATH_SOUND)
    clearText()
    addText("GAME OVER!", { y: 8, color: color`3` })
    setTimeout(() => {
        resetGame()
        startMusic()
    }, 2000)
    }

    // Start music when game begins
    startMusic()

    // Simple controls without auto-movement
    onInput("w", () => movePlayer(0, -1))
    onInput("s", () => movePlayer(0, 1))
    onInput("a", () => movePlayer(-1, 0))
    onInput("d", () => movePlayer(1, 0))

    // Update timing function
    const updateTiming = () => {
    const currentTime = PERF.getTime()
    const deltaTime = currentTime - PERF.timing.last
    
    if (deltaTime >= PERF.frameTime) {
        PERF.timing.last = currentTime
        PERF.counters.frame++
        
        // Update ghost counter
        PERF.counters.ghost = (PERF.counters.ghost + 1) % PERF.ghostUpdateDelay
        return true
    }
    
    return false
    }
