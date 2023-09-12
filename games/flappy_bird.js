const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');
canvas.width = 160;
canvas.height = 128;
document.body.appendChild(canvas);


const melody = tune`
500: F5~500 + E5~500 + C5~500 + D5~500 + A4~500,
500: B4~500 + C5~500 + D5^500 + E5^500,
500: D5~500 + E5~500,
500: E5~500,
500: F5~500,
500: F5~500,
500: E5~500 + C5~500 + B4~500 + D5~500 + F5~500,
500: A4^500 + B4~500 + C5^500,
500: B4~500 + A4^500 + C5^500,
500: B4~500 + C5~500 + D5~500 + E5~500 + F5~500,
500: F5~500,
500: F5~500,
500: F5~500 + E5~500 + D5~500 + C5~500 + B4~500,
500: B4~500 + C5^500,
500: B4~500 + C5^500,
500: B4~500 + C5~500,
500: D5~500 + E5~500 + F5~500 + C5^500,
500: F5~500,
500: F5~500,
500: F5~500 + E5~500 + D5~500 + C5~500 + B4~500,
500: B4~500 + C5^500,
500: B4~500 + C5^500,
500: B4~500 + C5~500 + D5~500 + E5~500,
500: F5~500 + E5^500,
500: F5~500 + E5^500,
500: F5~500 + E5~500 + D5~500 + C5~500 + B4~500,
500: A4~500,
500: A4~500,
500: A4~500 + B4~500 + E5~500 + D5~500 + C5~500,
500: E5~500 + A4~500 + B4^500,
500: E5~500 + A4~500 + B4^500,
500: E5~500 + D5~500 + B4~500 + A4~500 + C5~500`


playTune(melody)


playTune(melody, 1)



let birdX = 40;
let birdY = canvas.height / 2;
let gravity = 0.5;
let jump = -8;
let score = 0;
let isGameOver = false;

let pipes = [];
pipes[0] = {
  x: canvas.width,
  y: 0,
  width: 20,
  height: Math.floor(Math.random() * 50) + 30,
};

let gameInterval = setInterval(gameLoop, 16);

document.addEventListener('keydown', (event) => {
  if (event.keyCode === 32 && !isGameOver) {
    birdY += jump;
  } else if (event.keyCode === 32 && isGameOver) {
    resetGame();
  }
});

function gameLoop() {

  if (!isGameOver) {
   
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.fillStyle = '#FF0000';
    context.fillRect(birdX, birdY, 10, 10);

 
    birdY += gravity;

   
    for (let i = 0; i < pipes.length; i++) {
      context.fillStyle = '#008000';
      context.fillRect(pipes[i].x, pipes[i].y, pipes[i].width, pipes[i].height);
      pipes[i].x--;

   
      if (
        (birdX + 10 >= pipes[i].x && birdX <= pipes[i].x + pipes[i].width) &&
        (birdY <= pipes[i].y + pipes[i].height || birdY + 10 >= pipes[i].y + pipes[i].height + 20)
      ) {
        isGameOver = true;
      }

 
      if (pipes[i].x + pipes[i].width === birdX) {
        score++;
      }

   
      if (pipes[i].x + pipes[i].width <= 0) {
        pipes.shift();
      }
    }


    if (canvas.width - pipes[pipes.length - 1].x >= 50) {
      pipes.push({
        x: canvas.width,
        y: 0,
        width: 20,
        height: Math.floor(Math.random() * 50) + 30,
      });              
    }

   
    context.fillStyle = '#000000';
    context.font = '10px Arial';
    context.fillText('Score: ' + score, 10, 10);
  } else {
    
    context.fillStyle = '#000000';
    context.font = '16px Arial';
    context.fillText('Game Over! Score: ' + score, 40, canvas.height / 2);
    context.fillText('Press SPACE to restart', 30, canvas.height / 2 + 20);
  }
}

function resetGame() {
 
  birdY = canvas.height / 2;
  score = 0;
  isGameOver = false;
  pipes = [];
  pipes[0] = {
    x: canvas.width,
    y: 0,
    width: 20,
    height: Math.floor(Math.random() * 50) + 30,
  };
}