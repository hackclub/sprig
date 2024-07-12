const levels = [
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
        [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
        [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    // Add more levels here
];

let currentLevel = 0;
let playerPosition = { x: 1, y: 1 };

function startGame() {
    currentLevel = 0;
    playerPosition = { x: 1, y: 1 };
    drawMaze();
    document.addEventListener('keydown', movePlayer);
}

function drawMaze() {
    const mazeContainer = document.getElementById('maze-container');
    mazeContainer.innerHTML = '';
    const level = levels[currentLevel];

    level.forEach((row, y) => {
        row.forEach((cell, x) => {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');
            if (cell === 1) {
                cellDiv.classList.add('wall');
            } else if (x === playerPosition.x && y === playerPosition.y) {
                cellDiv.classList.add('start');
            } else if (x === 8 && y === 8) { // End position for this level
                cellDiv.classList.add('end');
            } else {
                cellDiv.classList.add('path');
            }
            mazeContainer.appendChild(cellDiv);
        });
    });
}
function movePlayer(event) {
    const level = levels[currentLevel];
    let newX = playerPosition.x;
    let newY = playerPosition.y;

    if (event.key === 'ArrowUp') {
        newY -= 1;
    } else if (event.key === 'ArrowDown') {
        newY += 1;
    } else if (event.key === 'ArrowLeft') {
        newX -= 1;
    } else if (event.key === 'ArrowRight') {
        newX += 1;
    }

    if (level[newY] && level[newY][newX] === 0) {
        playerPosition.x = newX;
        playerPosition.y = newY;
    }

drawMaze();

    if (playerPosition.x === 8 && playerPosition.y === 8) {
        alert('Level Complete!');
        currentLevel++;
        if (currentLevel < levels.length) {
            playerPosition = { x: 1, y: 1 };
            drawMaze();
        } else {
            alert('You completed all levels!');
            document.removeEventListener('keydown', movePlayer);
        }
    }
}