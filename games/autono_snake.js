/*
@title: Autono Snake
@description: A real-time snake game where you compete against several AI-controlled snakes to eat food and grow the longest.
@author: Dhruv Suthar (@0xdhrv)
@tags: ['endless', 'real-time']
@addedOn: 2025-06-11
*/

// --- Sprite Definitions ---
const player = "p";
const food = "f";
const ai_red = "0";
const ai_blue = "1";
const ai_green = "2";
const ai_yellow = "3";
const ai_orange = "4";
const dead_snake = "d";

// --- Sprite Art ---
setLegend(
    [player, bitmap`
....33333333....
...3333333333...
..333333333333..
.33333333333333.
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
.33333333333333.
..333333333333..
...3333333333...
....33333333....`],
    [food, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
    [dead_snake, bitmap`
................
................
................
................
................
................
...88....88.....
..8..8..8..8....
..8..8..8..8....
...88....88.....
................
...8........8...
....88888888....
................
................
................`],
    [ai_red, bitmap`
................
................
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
..333333333333..
................
................`],
    [ai_blue, bitmap`
................
................
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
..LLLLLLLLLLLL..
................
................`],
    [ai_green, bitmap`
................
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
.DDDDDDDDDDDDDD.
................`],
    [ai_yellow, bitmap`
................
66666666666666..
66666666666666..
66666666666666..
66666666666666..
66666666666666..
66666666666666..
66666666666666..
66666666666666..
66666666666666..
66666666666666..
66666666666666..
66666666666666..
66666666666666..
66666666666666..
................`],
    [ai_orange, bitmap`
................
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
.99999999999999.
................`]
);

// --- Game Configuration ---
const GRID_WIDTH = 35;
const GRID_HEIGHT = 35;
const NUM_AI_SNAKES = 2;
const INITIAL_SNAKE_LENGTH = 4;
const RESPAWN_DELAY_MS = 2000;
const GAME_SPEED_MS = 150;
const MAX_SNAKES = 7;
const ASTAR_PENALTY_FACTOR = 5;

// Map snake styles to sprites and text colors
const playerTextColor = color`2`;
const aiSnakeStyles = [
    { sprite: ai_red,    textColor: color`3` },
    { sprite: ai_blue,   textColor: color`L` },
    { sprite: ai_green,  textColor: color`G` },
    { sprite: ai_yellow, textColor: color`Y` },
    { sprite: ai_orange, textColor: color`O` },
];

// --- Game State Variables ---
let snakes = [];
let foodLocation = { x: 0, y: 0 };
let nextColorIndex = 0;
let snakeIDCounter = 0;
let playerSnakeID = -1;
let gameOver = false;

// --- Game Map Setup ---
setMap(createGrid(GRID_WIDTH, GRID_HEIGHT));
setSolids([]); // Collision is handled by custom logic

// --- Game Logic: Snake Class ---
class Snake {
    constructor(id, isPlayer, textColor, spriteChar) {
        this.id = id;
        this.body = [];
        this.direction = { x: 1, y: 0 };
        this.isPlayer = isPlayer;
        this.isDead = false;
        this.respawnTimer = null;
        this.growing = INITIAL_SNAKE_LENGTH - 1;
        this.score = 0;
        this.textColor = textColor;
        this.spriteChar = spriteChar;
    }

    move() {
        if (this.isDead || this.body.length === 0) return;
        const head = this.body[0];
        const newHead = { x: head.x + this.direction.x, y: head.y + this.direction.y };
        this.body.unshift(newHead);

        if (this.growing > 0) {
            this.growing--;
        } else {
            this.body.pop();
        }
    }
   
    checkCollision(allSnakes) {
        if (this.body.length === 0) return true;
        const head = this.body[0];

        if (head.x < 0 || head.x >= GRID_WIDTH || head.y < 0 || head.y >= GRID_HEIGHT) return true;
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) return true;
        }
        for (const other of allSnakes) {
            if (this.id !== other.id && !other.isDead) {
                for (const part of other.body) {
                    if (head.x === part.x && head.y === part.y) return true;
                }
            }
        }
        return false;
    }

    die() {
        if (this.isDead) return;
        this.isDead = true;
        this.respawnTimer = setTimeout(() => this.respawn(snakes), RESPAWN_DELAY_MS);
    }
   
    respawn(allSnakes) {
        this.isDead = false;
        this.growing = INITIAL_SNAKE_LENGTH - 1;
        if (!this.isPlayer) this.score = 0;

        let startPos;
        let attempts = 0;
        while (attempts < 100) {
            startPos = {
                x: Math.floor(Math.random() * (GRID_WIDTH / 2)) + Math.floor(GRID_WIDTH / 4),
                y: Math.floor(Math.random() * (GRID_HEIGHT / 2)) + Math.floor(GRID_HEIGHT / 4)
            };
            if (!isTooCloseToOtherSnakes(startPos, allSnakes, this.id)) break;
            attempts++;
        }
        this.body = [startPos || { x: 1, y: 1 }]; // Fallback position
        
        const dirs = [{x: 0, y: 1}, {x: 0, y: -1}, {x: 1, y: 0}, {x: -1, y: 0}];
        this.direction = dirs[Math.floor(Math.random() * dirs.length)];
    }

    updateDirection(target, allSnakes) {
        if (this.isDead || this.body.length === 0) return;
        const head = this.body[0];
        const obstacleGrid = createObstacleGrid(allSnakes, this.id, head);

        let path = aStar(obstacleGrid, head, target);
        if (!path && this.body.length > 1) {
            path = aStar(obstacleGrid, head, this.body[this.body.length - 1]);
        }

        if (path && path.length > 0) {
            this.direction = { x: path[0].x - head.x, y: path[0].y - head.y };
        } else {
            this.direction = findMostOpenDirection(obstacleGrid, head, this.direction);
        }
    }
}

// --- Game Logic: Helper Functions ---
function createGrid(width, height, fill = ".") {
    return Array(height).fill(0).map(() => Array(width).fill(fill).join("")).join("\n");
}

function addAISnake() {
    if (snakes.length >= MAX_SNAKES) return;
    const style = aiSnakeStyles[nextColorIndex % aiSnakeStyles.length];
    const newSnake = new Snake(snakeIDCounter++, false, style.textColor, style.sprite);
    snakes.push(newSnake);
    newSnake.respawn(snakes);
    nextColorIndex++;
}

function addPlayerSnake() {
    if (playerSnakeID !== -1 || snakes.length >= MAX_SNAKES) return;
    const newSnake = new Snake(snakeIDCounter++, true, playerTextColor, player);
    playerSnakeID = newSnake.id;
    snakes.push(newSnake);
    newSnake.respawn(snakes);
}

function placeFood() {
    const occupied = new Set();
    snakes.forEach(s => !s.isDead && s.body.forEach(p => occupied.add(`${p.x},${p.y}`)));

    let newFood;
    while (true) {
        newFood = {
            x: Math.floor(Math.random() * GRID_WIDTH),
            y: Math.floor(Math.random() * GRID_HEIGHT)
        };
        if (!occupied.has(`${newFood.x},${newFood.y}`)) {
            foodLocation = newFood;
            return;
        }
    }
}

// --- Drawing Functions ---
function drawGame() {
    clearText();
    getAll().forEach(s => s.remove());
   
    const isInBounds = (p) => p.x >= 0 && p.x < GRID_WIDTH && p.y >= 0 && p.y < GRID_HEIGHT;

    snakes.forEach(snake => {
        if (snake.isDead) {
            if (snake.body.length > 0 && isInBounds(snake.body[0])) {
                addSprite(snake.body[0].x, snake.body[0].y, dead_snake);
            }
        } else {
            snake.body.forEach(part => {
                if (isInBounds(part)) {
                    addSprite(part.x, part.y, snake.spriteChar);
                }
            });
        }
    });

    if (isInBounds(foodLocation)) {
        addSprite(foodLocation.x, foodLocation.y, food);
    }
    
    // drawScores(); // UI rendering is disabled as per request.
}

/* UI rendering is disabled as per request.
function drawScores() {
    const playerSnake = snakes.find(s => s.isPlayer);
    if (playerSnake) {
        const playerStatus = playerSnake.isDead ? "Dead" : `L:${playerSnake.body.length}`;
        addText(`You - Score: ${playerSnake.score} (${playerStatus})`, { 
            x: 1, y: 0, color: playerSnake.textColor 
        });
    }

    const aiSnakes = snakes.filter(s => !s.isPlayer);
    if (aiSnakes.length > 0) {
        const aiScores = aiSnakes.map(s => `AI${s.id}:${s.score}`).join(" | ");
        addText(aiScores, { x: 1, y: 1, color: color`L`});
    }

    addText("Controls: (j) add AI", { x: 1, y: 2, color: color`7` });
}
*/

// --- Player Controls ---
onInput("w", () => { const p = snakes.find(s => s.id === playerSnakeID); if (p && !p.isDead && p.direction.y === 0) p.direction = { x: 0, y: -1 }; });
onInput("s", () => { const p = snakes.find(s => s.id === playerSnakeID); if (p && !p.isDead && p.direction.y === 0) p.direction = { x: 0, y: 1 }; });
onInput("a", () => { const p = snakes.find(s => s.id === playerSnakeID); if (p && !p.isDead && p.direction.x === 0) p.direction = { x: -1, y: 0 }; });
onInput("d", () => { const p = snakes.find(s => s.id === playerSnakeID); if (p && !p.isDead && p.direction.x === 0) p.direction = { x: 1, y: 0 }; });
onInput("j", addAISnake);

// --- Main Game Loop ---
function gameTick() {
    if (gameOver) return;

    for (const snake of snakes) {
        if (snake.isDead) continue;
        if (!snake.isPlayer) snake.updateDirection(foodLocation, snakes);
        snake.move();
    }

    let foodWasEaten = false;
    for (const snake of snakes) {
        if (!snake.isDead && snake.body.length > 0 && snake.body[0].x === foodLocation.x && snake.body[0].y === foodLocation.y) {
            snake.score++;
            snake.growing = 1;
            foodWasEaten = true;
        }
    }
    if (foodWasEaten) placeFood();

    for (const snake of snakes) {
        if (!snake.isDead && snake.checkCollision(snakes)) {
            snake.die();
        }
    }
   
    const totalAISnakeLength = snakes.filter(s => !s.isPlayer).reduce((sum, s) => sum + (s.isDead ? 0 : s.body.length), 0);
    const numAISnakes = snakes.filter(s => !s.isPlayer).length;
    if (numAISnakes > 0 && totalAISnakeLength >= (GRID_WIDTH * GRID_HEIGHT) - 20) {
        gameOver = true;
        // Since UI is off, this message might not be seen, but we'll keep the logic.
        addText("AI has conquered the arena!", { x: 5, y: 15, color: color`Y` });
    }

    drawGame();
}

// --- A* Pathfinding Implementation ---
function aStar(grid, start, end) {
    const openSet = [];
    const nodes = new Map();
    const startNode = { pos: start, g: 0, h: heuristic(start, end, grid), parent: null };
    startNode.f = startNode.g + startNode.h;
    openSet.push(startNode);
    nodes.set(`${start.x},${start.y}`, startNode);

    while (openSet.length > 0) {
        openSet.sort((a, b) => a.f - b.f);
        const current = openSet.shift();
        if (current.pos.x === end.x && current.pos.y === end.y) {
            const path = [];
            let temp = current;
            while (temp.parent) {
                path.push(temp.pos);
                temp = temp.parent;
            }
            return path.reverse();
        }
        for (const dir of [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }]) {
            const neighborPos = { x: current.pos.x + dir.x, y: current.pos.y + dir.y };
            if (neighborPos.x < 0 || neighborPos.x >= GRID_WIDTH || neighborPos.y < 0 || neighborPos.y >= GRID_HEIGHT || grid[neighborPos.y][neighborPos.x] === 1) {
                continue;
            }
            const tentativeG = current.g + 1;
            let neighborNode = nodes.get(`${neighborPos.x},${neighborPos.y}`);
            if (!neighborNode || tentativeG < neighborNode.g) {
                if (!neighborNode) {
                    neighborNode = { pos: neighborPos };
                    nodes.set(`${neighborPos.x},${neighborPos.y}`, neighborNode);
                }
                neighborNode.parent = current;
                neighborNode.g = tentativeG;
                neighborNode.h = heuristic(neighborPos, end, grid);
                neighborNode.f = neighborNode.g + neighborNode.h;
                if (!openSet.some(n => n.pos.x === neighborPos.x && n.pos.y === neighborPos.y)) {
                    openSet.push(neighborNode);
                }
            }
        }
    }
    return null;
}

function heuristic(p1, p2, grid) {
    const dist = Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
    let penalty = 0;
    for (const dir of [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }]) {
        const n = { x: p1.x + dir.x, y: p1.y + dir.y };
        if (n.x < 0 || n.x >= GRID_WIDTH || n.y < 0 || n.y >= GRID_HEIGHT || grid[n.y][n.x] === 1) {
            penalty++;
        }
    }
    return dist + penalty * ASTAR_PENALTY_FACTOR;
}

function createObstacleGrid(allSnakes, selfId, selfHead) {
    const grid = Array.from({ length: GRID_HEIGHT }, () => Array(GRID_WIDTH).fill(0));
    for (const snake of allSnakes) {
        if (snake.isDead) continue;
        const isOwnTail = p => snake.id === selfId && snake.body.length > 1 && p.x === snake.body[snake.body.length - 1].x && p.y === snake.body[snake.body.length - 1].y;
        for (const p of snake.body) {
            if ((p.x === selfHead.x && p.y === selfHead.y) || isOwnTail(p)) continue;
            if (p.y >= 0 && p.y < GRID_HEIGHT && p.x >= 0 && p.x < GRID_WIDTH) {
                grid[p.y][p.x] = 1;
            }
        }
    }
    return grid;
}

function findMostOpenDirection(grid, head, currentDir) {
    let bestMove = currentDir;
    let maxSpace = -1;
    const potentialDirs = [currentDir, { x: currentDir.y, y: -currentDir.x }, { x: -currentDir.y, y: currentDir.x }];
    for (const dir of potentialDirs) {
        const nextPos = { x: head.x + dir.x, y: head.y + dir.y };
        if (nextPos.x < 0 || nextPos.x >= GRID_WIDTH || nextPos.y < 0 || nextPos.y >= GRID_HEIGHT || grid[nextPos.y][nextPos.x] === 1) {
            continue;
        }
        const space = countAdjacentEmpty(nextPos, grid);
        if (space > maxSpace) {
            maxSpace = space;
            bestMove = dir;
        }
    }
    return bestMove;
}

function countAdjacentEmpty(p, grid) {
    let count = 0;
    for (const dir of [{ x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }]) {
        const n = { x: p.x + dir.x, y: p.y + dir.y };
        if (n.x >= 0 && n.x < GRID_WIDTH && n.y >= 0 && n.y < GRID_HEIGHT && grid[n.y][n.x] === 0) {
            count++;
        }
    }
    return count;
}

function isTooCloseToOtherSnakes(pos, allSnakes, selfId) {
    for (const snake of allSnakes) {
        if (snake.id === selfId || snake.isDead) continue;
        for (const part of snake.body) {
            if (Math.abs(pos.x - part.x) + Math.abs(pos.y - part.y) < INITIAL_SNAKE_LENGTH + 2) {
                return true;
            }
        }
    }
    return false;
}

// --- Initialize and Start Game ---
addPlayerSnake();
for (let i = 0; i < NUM_AI_SNAKES; i++) {
    addAISnake();
}
placeFood();
drawGame();
setInterval(gameTick, GAME_SPEED_MS);
