/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: snake
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");
canvas.width = 600;
canvas.height = 600;

document.addEventListener("keydown", changeDirection);

const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let food = {
    x: Math.floor(Math.random() * 29) * box,
    y: Math.floor(Math.random() * 29) * box,
};
let direction = "STOP";
let nextDirection = "STOP";
let score = 0;
let highScore = 0;
let delay = 100;

function draw() {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
    
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "black" : "gray";
        ctx.fillRect(segment.x, segment.y, box, box);
    });
    
    ctx.fillStyle = "white";
    ctx.font = "24px Courier";
    ctx.fillText(`Score: ${score}  High Score: ${highScore}`, 10, 30);
}

function update() {
    if (nextDirection) direction = nextDirection;
    let head = { ...snake[0] };
    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;
    
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        if (score > highScore) highScore = score;
        food.x = Math.floor(Math.random() * 29) * box;
        food.y = Math.floor(Math.random() * 29) * box;
    } else {
        snake.pop();
    }
    
    if (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height ||
        snake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        resetGame();
        return;
    }
    
    snake.unshift(head);
    draw();
}

function changeDirection(event) {
    if (event.key === "w" && direction !== "DOWN") nextDirection = "UP";
    if (event.key === "s" && direction !== "UP") nextDirection = "DOWN";
    if (event.key === "a" && direction !== "RIGHT") nextDirection = "LEFT";
    if (event.key === "d" && direction !== "LEFT") nextDirection = "RIGHT";
}

function resetGame() {
    alert("Game Over!");
    snake = [{ x: 10 * box, y: 10 * box }];
    direction = "STOP";
    nextDirection = "STOP";
    score = 0;
}

setInterval(update, delay);
