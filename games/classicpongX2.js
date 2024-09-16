/*
@title: Classic Pong
@author: AVSC2-ops
@tags: []
@addedOn: 2024-09-16
*/

var DIRECTION = {
  IDLE: 0,
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4
};

var rounds = [5, 5, 3, 3, 2];
var colors = ['#1abc9c', '#2ecc71', '#3498db', '#e74c3c', '#9b59b6'];
var powerUpColors = ['#ff6347', '#ffeb3b', '#4caf50', '#2196f3']; // Colors for different power-ups

// The ball object (The cube that bounces back and forth)
var Ball = {
  new: function(incrementedSpeed) {
    return {
      width: 20,
      height: 20,
      x: (this.canvas.width / 2) - 10,
      y: (this.canvas.height / 2) - 10,
      moveX: DIRECTION.IDLE,
      moveY: DIRECTION.IDLE,
      speed: incrementedSpeed || 4.5, // Initial speed is now half (4.5)
      multiplyCount: 0, // Count for ball multiplying
      isSticky: false, // Flag for sticky ball
      stickyDuration: 1 // Timer for sticky ball effect
    };
  }
};

// The paddle object (The two lines that move up and down)
var Paddle = {
  new: function(side) {
    return {
      width: 15,
      height: 80,
      x: side === 'left' ? 100 : this.canvas.width - 100,
      y: (this.canvas.height / 2) - 40,
      score: 0,
      move: DIRECTION.IDLE,
      speed: 12,
      originalSpeed: 12, // Save the original speed to reset after power-up
      isGhost: false, // Flag for ghost paddle
      ghostDuration: 1 // Timer for ghost paddle effect
    };
  }
};

// Power-up object
var PowerUp = {
  new: function() {
    return {
      x: Math.random() * (this.canvas.width - 20),
      y: Math.random() * (this.canvas.height - 20),
      width: 20,
      height: 20,
      type: ['speed', 'size', 'slow', 'multiply', 'sticky', 'ghost'][Math.floor(Math.random() * 6)], // Random type
      color: powerUpColors[Math.floor(Math.random() * powerUpColors.length)]
    };
  }
};

var Game = {
  initialize: function() {
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');

    this.canvas.width = 1200;
    this.canvas.height = 800;
    this.canvas.style.width = (this.canvas.width / 2) + 'px';
    this.canvas.style.height = (this.canvas.height / 2) + 'px';

    this.player = Paddle.new.call(this, 'left');
    this.paddle = Paddle.new.call(this, 'right');
    this.balls = [Ball.new.call(this)]; // Start with a single ball

    this.paddle.speed = 10;
    this.running = this.over = false;
    this.turn = this.paddle;
    this.timer = this.round = 0;
    this.color = '#000000'; // Black background

    this.powerUps = [];
    this.spawnPowerUpInterval = setInterval(this.spawnPowerUp.bind(this), 3000); // Spawn power-ups every 3 seconds

    this.menu();
    this.listen();
  },

  endGameMenu: function(text) {
    this.context.font = '50px Courier New';
    this.context.fillStyle = this.color;
    this.context.fillRect(
      this.canvas.width / 2 - 350,
      this.canvas.height / 2 - 48,
      700,
      100
    );
    this.context.fillStyle = '#ffffff';
    this.context.fillText(text,
      this.canvas.width / 2,
      this.canvas.height / 2 + 15
    );
    setTimeout(function() {
      Pong = Object.assign({}, Game);
      Pong.initialize();
    }, 3000);
  },

  menu: function() {
    this.draw();
    this.context.font = '50px Courier New';
    this.context.fillStyle = this.color;
    this.context.fillRect(
      this.canvas.width / 2 - 350,
      this.canvas.height / 2 - 48,
      700,
      100
    );
    this.context.fillStyle = '#ffffff';
    this.context.fillText('Press any key to begin ~ AVSC',
      this.canvas.width / 2,
      this.canvas.height / 2 + 15
    );
  },

  update: function() {
    if (!this.over) {
      // Ball movement and collisions
      for (let i = this.balls.length - 1; i >= 0; i--) {
        let ball = this.balls[i];
        if (ball.x <= 0) this._resetTurn.call(this, this.paddle, this.player);
        if (ball.x >= this.canvas.width - ball.width) this._resetTurn.call(this, this.player, this.paddle);
        if (ball.y <= 0) ball.moveY = DIRECTION.DOWN;
        if (ball.y >= this.canvas.height - ball.height) ball.moveY = DIRECTION.UP;

        if (ball.moveY === DIRECTION.UP) ball.y -= (ball.speed / 1.5);
        else if (ball.moveY === DIRECTION.DOWN) ball.y += (ball.speed / 1.5);
        if (ball.moveX === DIRECTION.LEFT) ball.x -= ball.speed;
        else if (ball.moveX === DIRECTION.RIGHT) ball.x += ball.speed;

        // Paddle collisions
        if (ball.x - ball.width <= this.player.x && ball.x >= this.player.x - this.player.width) {
          if (ball.y <= this.player.y + this.player.height && ball.y + ball.height >= this.player.y) {
            ball.x = (this.player.x + ball.width);
            ball.moveX = DIRECTION.RIGHT;

            // Apply sticky ball effect
            if (ball.isSticky) {
              this.player.x = ball.x - ball.width; // Stick to paddle
              this.player.speed = 0; // Stop paddle movement
            }
          }
        }

        if (ball.x - ball.width <= this.paddle.x && ball.x >= this.paddle.x - this.paddle.width) {
          if (ball.y <= this.paddle.y + this.paddle.height && ball.y + ball.height >= this.paddle.y) {
            ball.x = (this.paddle.x - ball.width);
            ball.moveX = DIRECTION.LEFT;

            // Apply sticky ball effect
            if (ball.isSticky) {
              this.paddle.x = ball.x + ball.width; // Stick to paddle
              this.paddle.speed = 0; // Stop paddle movement
            }
          }
        }

        // Power-up collisions
        for (var j = this.powerUps.length - 1; j >= 0; j--) {
          let powerUp = this.powerUps[j];
          if (ball.x <= powerUp.x + powerUp.width &&
            ball.x + ball.width >= powerUp.x &&
            ball.y <= powerUp.y + powerUp.height &&
            ball.y + ball.height >= powerUp.y) {
            this._applyPowerUp(powerUp, ball);
            this.powerUps.splice(j, 1); // Remove the power-up after applying it
          }
        }
      }

      // Paddle movement
      if (this.player.move === DIRECTION.UP) this.player.y -= this.player.speed;
      else if (this.player.move === DIRECTION.DOWN) this.player.y += this.player.speed;

      if (this.paddle.move === DIRECTION.UP) this.paddle.y -= this.paddle.speed;
      else if (this.paddle.move === DIRECTION.DOWN) this.paddle.y += this.paddle.speed;

      if (this.player.y <= 0) this.player.y = 0;
      else if (this.player.y >= (this.canvas.height - this.player.height)) this.player.y = (this.canvas.height - this.player.height);

      if (this.paddle.y <= 0) this.paddle.y = 0;
      else if (this.paddle.y >= (this.canvas.height - this.paddle.height)) this.paddle.y = (this.canvas.height - this.paddle.height);

      // Ball direction change after delay
      if (this._turnDelayIsOver.call(this) && this.turn) {
        this.balls[0].moveX = this.turn === this.player ? DIRECTION.LEFT : DIRECTION.RIGHT;
        this.balls[0].moveY = [DIRECTION.UP, DIRECTION.DOWN][Math.round(Math.random())];
        this.balls[0].y = Math.floor(Math.random() * this.canvas.height - 200) + 200;
        this.turn = null;
      }

      // Paddle AI (Move toward ball)
      if (this.paddle.y > this.balls[0].y - (this.paddle.height / 2)) {
        if (this.balls[0].moveX === DIRECTION.RIGHT) this.paddle.y -= this.paddle.speed / 1.5;
        else this.paddle.y -= this.paddle.speed / 4;
      }
      if (this.paddle.y < this.balls[0].y - (this.paddle.height / 2)) {
        if (this.balls[0].moveX === DIRECTION.RIGHT) this.paddle.y += this.paddle.speed / 1.5;
        else this.paddle.y += this.paddle.speed / 4;
      }

      // Update sticky ball duration
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i];
        if (ball.isSticky) {
          ball.stickyDuration++;
          if (ball.stickyDuration > 100) { // Sticky effect lasts 100 frames (approx. 2 seconds)
            ball.isSticky = false;
            this.player.speed = this.player.originalSpeed; // Restore paddle speed
            this.paddle.speed = this.paddle.originalSpeed; // Restore paddle speed
          }
        }
      }

      // Update ghost paddle duration
      if (this.player.isGhost) {
        this.player.ghostDuration++;
        if (this.player.ghostDuration > 100) {
          this.player.isGhost = false;
        }
      }
      if (this.paddle.isGhost) {
        this.paddle.ghostDuration++;
        if (this.paddle.ghostDuration > 100) {
          this.paddle.isGhost = false;
        }
      }

      // Check for win conditions
      if (this.player.score === rounds[this.round]) {
        if (!rounds[this.round + 1]) {
          this.over = true;
          setTimeout(function() { Pong.endGameMenu('Winner!'); }, 1000);
        } else {
          this.color = this._generateRoundColor();
          this.player.score = this.paddle.score = 0;
          this.player.speed = this.player.originalSpeed; // Reset to original speed
          this.paddle.speed = this.paddle.originalSpeed; // Reset to original speed
          this.balls = [Ball.new.call(this, this.balls[0].speed)]; // Reset ball to single
          this.round += 1;
          this.spawnPowerUp(); // Spawn a new power-up each round
        }
      } else if (this.paddle.score === rounds[this.round]) {
        this.over = true;
        setTimeout(function() { Pong.endGameMenu('Game Over!'); }, 1000);
      }
    }
  },

  draw: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Black background
    this.context.fillStyle = this.color; 
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw elements in white
    this.context.fillStyle = '#ffffff'; 
    this.context.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    this.context.fillRect(this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
    for (let i = 0; i < this.balls.length; i++) {
      let ball = this.balls[i];
      this.context.fillRect(ball.x, ball.y, ball.width, ball.height);
    }

    // Draw net (white on black background)
    this.context.beginPath();
    this.context.setLineDash([7, 15]);
    this.context.moveTo((this.canvas.width / 2), this.canvas.height - 140);
    this.context.lineTo((this.canvas.width / 2), 140);
    this.context.lineWidth = 10;
    this.context.strokeStyle = '#ffffff';
    this.context.stroke();

    // Draw scores
    this.context.font = '100px Courier New';
    this.context.textAlign = 'center';
    this.context.fillText(this.player.score.toString(), (this.canvas.width / 2) - 300, 200);
    this.context.fillText(this.paddle.score.toString(), (this.canvas.width / 2) + 300, 200);

    // Draw round info
    this.context.font = '30px Courier New';
    this.context.fillText('Round ' + (this.round + 1), (this.canvas.width / 2), 35);

    this.context.font = '40px Courier';
    this.context.fillText(rounds[this.round] ? rounds[this.round] : rounds[this.round - 1], (this.canvas.width / 2), 100);

    // Draw power-ups (with their original colors)
    for (var i = 0; i < this.powerUps.length; i++) {
      var powerUp = this.powerUps[i];
      this.context.fillStyle = powerUp.color;
      this.context.fillRect(powerUp.x, powerUp.y, powerUp.width, powerUp.height);
    }
  },

  loop: function() {
    Pong.update();
    Pong.draw();
    if (!Pong.over) requestAnimationFrame(Pong.loop);
  },

  listen: function() {
    document.addEventListener('keydown', function(key) {
      if (Pong.running === false) {
        Pong.running = true;
        window.requestAnimationFrame(Pong.loop);
      }
      if (key.keyCode === 38) Pong.paddle.move = DIRECTION.UP; // ArrowUp for right paddle
      if (key.keyCode === 40) Pong.paddle.move = DIRECTION.DOWN; // ArrowDown for right paddle
      if (key.keyCode === 87) Pong.player.move = DIRECTION.UP; // W for left paddle
      if (key.keyCode === 83) Pong.player.move = DIRECTION.DOWN; // S for left paddle
    });
    document.addEventListener('keyup', function(key) {
      if (key.keyCode === 38 || key.keyCode === 40) Pong.paddle.move = DIRECTION.IDLE; // ArrowUp/Down
      if (key.keyCode === 87 || key.keyCode === 83) Pong.player.move = DIRECTION.IDLE; // W/S
    });
  },

  _resetTurn: function(victor, loser) {
    this.balls = [Ball.new.call(this, this.balls[0].speed)]; // Reset ball to single
    this.turn = loser;
    this.timer = (new Date()).getTime();
    victor.score++;
  },

  _turnDelayIsOver: function() {
    return ((new Date()).getTime() - this.timer >= 1000);
  },

  _generateRoundColor: function() {
    var newColor = colors[Math.floor(Math.random() * colors.length)];
    if (newColor === this.color) return this._generateRoundColor();
    return newColor;
  },

  _applyPowerUp: function(powerUp, ball) {
    switch (powerUp.type) {
      case 'speed':
        ball.speed += 3;
        break;
      case 'size':
        if (Math.random() > 0.5) {
          this.player.height += 20; // Increase player paddle size
        } else {
          this.paddle.height += 20; // Increase opponent paddle size
        }
        break;
      case 'slow':
        this.paddle.speed = Math.max(this.paddle.originalSpeed / 2, 1); // Slow down opponent paddle
        setTimeout(() => {
          this.paddle.speed = this.paddle.originalSpeed; // Reset paddle speed after 5 seconds
        }, 5000);
        break;
      case 'multiply':
        if (ball.multiplyCount < 3) { // Multiply only up to 3 times
          this.balls.push(Ball.new.call(this, ball.speed));
          ball.multiplyCount++;
        }
        break;
      case 'sticky':
        ball.isSticky = true;
        ball.stickyDuration = 0; // Reset sticky duration
        break;
      case 'ghost':
        if (Math.random() > 0.5) {
          this.player.isGhost = true;
          this.player.ghostDuration = 0; // Reset ghost duration
        } else {
          this.paddle.isGhost = true;
          this.paddle.ghostDuration = 0; // Reset ghost duration
        }
        break;
    }
  },

  spawnPowerUp: function() {
    this.powerUps.push(PowerUp.new.call(this));
  }
};

var Pong = Object.assign({}, Game);
Pong.initialize();
