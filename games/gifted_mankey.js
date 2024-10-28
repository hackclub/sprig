// Create canvas and add it to the document
const canvas = document.createElement('canvas');
canvas.width = 400;
canvas.height = 600;
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

const basket = {
    x: canvas.width / 2 - 25,
    y: canvas.height - 50,
    width: 50,
    height: 30,
    speed: 7
};

const fruits = [];
let score = 0;

// Bitmap array for basket and fruit
const basketBitmap = [
    "00011110000",
    "00111111000",
    "01111111100",
    "11111111110",
];

const fruitBitmap = [
    "001100",
    "011110",
    "111111",
    "011110",
    "001100",
];

// Draw a bitmap sprite on the canvas
function drawBitmap(bitmap, x, y, pixelSize, color) {
    ctx.fillStyle = color;
    for (let row = 0; row < bitmap.length; row++) {
        for (let col = 0; col < bitmap[row].length; col++) {
            if (bitmap[row][col] === "1") {
                ctx.fillRect(x + col * pixelSize, y + row * pixelSize, pixelSize, pixelSize);
            }
        }
    }
}

// Function to create a new fruit
function createFruit() {
    const fruit = {
        x: Math.random() * (canvas.width - 30),
        y: -20,
        width: 30,
        height: 30,
        speed: 3
    };
    fruits.push(fruit);
}

// Draw basket using bitmap array
function drawBasket() {
    drawBitmap(basketBitmap, basket.x, basket.y, 5, "brown"); // Adjust color and size as needed
}

// Draw all fruits using bitmap array
function drawFruits() {
    fruits.forEach(fruit => {
        drawBitmap(fruitBitmap, fruit.x, fruit.y, 5, "red"); // Adjust color and size as needed
    });
}

// Update fruit positions and check for collisions
function updateFruits() {
    fruits.forEach(fruit => {
        fruit.y += fruit.speed;

        // Check if fruit is caught by the basket
        if (
            fruit.y + fruit.height > basket.y &&
            fruit.x < basket.x + basket.width &&
            fruit.x + fruit.width > basket.x
        ) {
            fruits.splice(fruits.indexOf(fruit), 1);
            score++;
        }

        // Remove fruits that fall off the screen
        if (fruit.y > canvas.height) {
            fruits.splice(fruits.indexOf(fruit), 1);
        }
    });
}

// Display the score
function drawScore() {
    ctx.font = '20px Arial';
    ctx.fillStyle = 'black';
    ctx.fillText('Score: ' + score, 10, 20);
}

// Handle basket movement
function moveBasket(event) {
    if (event.key === 'ArrowLeft' && basket.x > 0) {
        basket.x -= basket.speed;
    } else if (event.key === 'ArrowRight' && basket.x < canvas.width - basket.width) {
        basket.x += basket.speed;
    }
}

// Main game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBasket();
    drawFruits();
    drawScore();
    updateFruits();

    // Randomly create new fruits
    if (Math.random() < 0.02) createFruit();
}

// Event listener for moving the basket
document.addEventListener('keydown', moveBasket);

// Start the game
setInterval(gameLoop, 1000 / 60); // Run the game at 60 FPS