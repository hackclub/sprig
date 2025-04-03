<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Obstacle Dodging Game</title>
    <style>
        /* Styling for the game */
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: skyblue;
            margin: 0;
            font-family: Arial, sans-serif;
        }
        .game-board {
            position: relative;
            width: 400px;
            height: 300px;
            background-color: green;
            overflow: hidden;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .duck {
            position: absolute;
            width: 40px;
            height: 40px;
            background-color: yellow;
            border-radius: 50%;
            bottom: 20px;
            left: 50px;
            transition: bottom 0.2s;
        }
        .obstacle {
            position: absolute;
            width: 20px;
            height: 60px;
            background-color: brown;
            bottom: 20px;
            right: 0;
        }
        .game-over {
            position: absolute;
            color: white;
            font-size: 24px;
            display: none;
        }
    </style>
</head>
<body>
    <!-- Game Board -->
    <div class="game-board" onclick="jump()">
        <div id="duck" class="duck"></div>
        <div id="obstacle" class="obstacle"></div>
        <div id="gameOverText" class="game-over">Game Over! Click to restart.</div>
    </div>

    <!-- JavaScript Logic -->
    <script>
        // Variables
        let duck = document.getElementById("duck");
        let obstacle = document.getElementById("obstacle");
        let gameOverText = document.getElementById("gameOverText");
        let isJumping = false;
        let gameOver = false;
        let obstaclePosition = 400;

        // Jump Functionality
        function jump() {
            if (!isJumping && !gameOver) {
                isJumping = true;
                duck.style.bottom = "100px";
                setTimeout(() => {
                    duck.style.bottom = "20px";
                    isJumping = false;
                }, 500);
            } else if (gameOver) {
                restartGame();
            }
        }

        // Obstacle Movement
        function moveObstacle() {
            let interval = setInterval(() => {
                if (gameOver) {
                    clearInterval(interval);
                    return;
                }
                if (obstaclePosition < -20) {
                    obstaclePosition = 400;
                } else {
                    obstaclePosition -= 5;
                }
                obstacle.style.right = `${400 - obstaclePosition}px`;
                checkCollision();
            }, 50);
        }

        // Collision Detection
        function checkCollision() {
            let duckBottom = parseInt(window.getComputedStyle(duck).bottom);
            let obstacleLeft = parseInt(window.getComputedStyle(obstacle).right);

            if (obstacleLeft > 330 && obstacleLeft < 370 && duckBottom < 60) {
                gameOver = true;
                gameOverText.style.display = "block";
            }
        }

        // Restart Game
        function restartGame() {
            gameOver = false;
            gameOverText.style.display = "none";
            obstaclePosition = 400;
            moveObstacle();
        }

        // Start Moving the Obstacle
        moveObstacle();
    </script>
</body>
</html>