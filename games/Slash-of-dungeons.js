/*
@title: Slash of dungeons
@author: Jammy Jiang
@tags: ['action']
@addedOn: 2025-02-05
@description: A game about fighting monsters. Kill as many monsters as you can while trying to get the highest score! Use WASD keys to move and K to attack in the direction of movement. Pickup golden star in the player zone to prolong your survival.*/

class InputHandler {
  constructor() {
    this.keys = [];

    this.addListeners();
  }
  addListeners() {
    window.addEventListener("keydown", ({ code }) => {
      if (
        (code === "KeyW" ||
          code === "KeyS" ||
          code === "KeyA" ||
          code === "KeyD") &&
        !this.keys.includes(code)
      )
        this.keys.push(code);
    });

    window.addEventListener("keyup", ({ code }) => {
      if (this.keys.includes(code))
        this.keys.splice(this.keys.indexOf(code), 1);
    });
  }
}

class Player {
  constructor({ game = null }) {
    this.game = game;

    this.sprites = this.createSprites();
    this.direction = "right";
    this.attackDirection = this.direction;

    this.health = 500;

    this.addListeners();
  }
  createSprites() {
    return {
      left: "l",
      right: "r",
    };
  }
  addListeners() {
    onInput("k", () => this.attack());
  }
  handleInput() {
    const keys = this.game.inputHandler.keys;
    const sprite = getFirst(this.sprites[this.direction]);

    if (keys.includes("KeyW")) {
      sprite.y -= 1;
      this.attackDirection = "up";
    } else if (keys.includes("KeyS")) {
      sprite.y += 1;
      this.attackDirection = "down";
    }

    if (keys.includes("KeyA")) {
      sprite.x -= 1;
      this.direction = "left";
      this.attackDirection = this.direction;
    } else if (keys.includes("KeyD")) {
      sprite.x += 1;
      this.direction = "right";
      this.attackDirection = this.direction;
    }

    sprite.type = this.sprites[this.direction];
  }
  attack() {
    const sprite = getFirst(this.sprites[this.direction]);

    this.createSlash(sprite);

    this.game.enemyManager.enemies.forEach((enemy) => {
      const enemySprite = getFirst(enemy.sprites[enemy.direction]);

      const isAbovePlayer =
        enemySprite.x === sprite.x && enemySprite.y === sprite.y - 1;
      const isBelowPlayer =
        enemySprite.x === sprite.x && enemySprite.y === sprite.y + 1;

      const isLeftOfPlayer =
        enemySprite.y === sprite.y && enemySprite.x === sprite.x - 1;
      const isRightOfPlayer =
        enemySprite.y === sprite.y && enemySprite.x === sprite.x + 1;

      switch (this.attackDirection) {
        case "up":
          if (isAbovePlayer) this.enemyKillSequence(enemy, enemySprite);
          break;
        case "down":
          if (isBelowPlayer) this.enemyKillSequence(enemy, enemySprite);
          break;
        case "left":
          if (isLeftOfPlayer) this.enemyKillSequence(enemy, enemySprite);
          break;
        case "right":
          if (isRightOfPlayer) this.enemyKillSequence(enemy, enemySprite);
          break;
      }
    });
  }
  createSlash(sprite) {
    let position;
    let type;
    switch (this.attackDirection) {
      case "up":
        type = "u";
        position = { x: sprite.x, y: sprite.y - 1 };
        break;
      case "down":
        type = "i";
        position = { x: sprite.x, y: sprite.y + 1 };
        break;
      case "left":
        type = "o";
        position = { x: sprite.x - 1, y: sprite.y };
        break;
      case "right":
        type = "p";
        position = { x: sprite.x + 1, y: sprite.y };
        break;
    }

    this.game.effectManager.createEffect(position, "slash", type);
  }
  enemyKillSequence(enemy, enemySprite) {
    this.game.enemyManager.removeEnemy(enemy);
    this.game.effectManager.createEffect({
      x: enemySprite.x,
      y: enemySprite.y,
    });

    this.game.score += Math.floor(Math.random() * 5 + 5);
  }
  checkOnDrop() {
    const sprite = getFirst(this.sprites[this.direction]);

    this.game.dropManager.drops.forEach((drop) => {
      const dropSprite = getFirst(drop.sprite);
      if (sprite.x === dropSprite.x && sprite.y === dropSprite.y) {
        switch (drop.type) {
          case "health":
            this.health += drop.health;
            this.game.dropManager.remove(drop);

            if (this.health >= 100) this.health = 500;
            break;
        }
      }
    });
  }
  checkDeath() {
    if (this.health <= 0) this.game.gameOver = true;
  }
  update() {
    this.handleInput();
    this.checkOnDrop();
    this.checkDeath();
  }
  restart() {
    this.direction = "right";
    this.attackDirection = this.direction;

    this.health = 100;

    const sprite = getFirst(this.sprites[this.direction]);
    sprite.x = 5;
    sprite.y = 5;
  }
}

class Enemy {
  constructor(params) {
    this.game = params.game;
    this.position = params.position;

    this.sprites = this.createSprites();
    this.direction = "left";

    this.timeToNewFrame = 0;

    this.angle = null;
    this.velocity = { x: 0, y: 0 };

    this.init();
  }
  init() {
    addSprite(this.position.x, this.position.y, this.sprites[this.direction]);
  }
  updateDirection(playerSprite, enemySprite) {
    if (enemySprite.x > playerSprite.x) this.direction = "left";
    else if (enemySprite.x < playerSprite.x) this.direction = "right";

    enemySprite.type = this.sprites[this.direction];
  }
  attack(playerSprite, enemySprite) {
    if (!this.getShouldAttack(playerSprite, enemySprite)) return;

    this.game.player.health -= this.getDamage();
  }
  update() {
    if (this.timeToNewFrame >= this.frameInterval) {
      const sprite = getFirst(this.sprites[this.direction]);
      const player = getFirst(
        this.game.player.sprites[this.game.player.direction],
      );

      this.angle = Math.atan2(player.y - sprite.y, player.x - sprite.x);
      this.velocity = {
        x: Math.round(Math.cos(this.angle) * this.speed),
        y: Math.round(Math.sin(this.angle) * this.speed),
      };

      sprite.x += this.velocity.x;
      sprite.y += this.velocity.y;

      this.updateDirection(player, sprite);

      this.attack(player, sprite);

      this.timeToNewFrame = 0;
    } else this.timeToNewFrame += this.game.delta;
  }
  getDamage() {
    return Math.ceil(
      Math.random() * (this.damage.max - this.damage.min) + this.damage.min,
    );
  }
  getShouldAttack(playerSprite, enemySprite) {
    return (
      (enemySprite.x === playerSprite.x &&
        (enemySprite.y === playerSprite.y + 1 ||
          enemySprite.y === playerSprite.y - 1)) ||
      (enemySprite.y === playerSprite.y &&
        (enemySprite.x === playerSprite.x + 1 ||
          enemySprite.x === playerSprite.x - 1))
    );
  }
  remove() {
    const sprite = getFirst(this.sprites[this.direction]);
    sprite.remove();
  }
}

class Runner extends Enemy {
  constructor({ game = null, position = { x: 8, y: 8 } }) {
    super({ game, position });

    this.speed = 1;
    this.damage = { min: 1, max: 3 };
    this.frameInterval = Math.random() * 200 + 150;
  }
  createSprites() {
    return {
      left: "q",
      right: "e",
    };
  }
}

class Brute extends Enemy {
  constructor({ game = null, position = { x: 8, y: 8 } }) {
    super({ game, position });

    this.speed = 1;
    this.damage = { min: 3, max: 5 };
    this.frameInterval = Math.random() * 100 + 500;
  }
  createSprites() {
    return {
      left: "a",
      right: "d",
    };
  }
}

class Slime extends Enemy {
  constructor({ game = null, position = { x: 8, y: 8 } }) {
    super({ game, position });

    this.speed = 1;
    this.damage = { min: 1, max: 2 };
    this.frameInterval = Math.random() * 200 + 250;
  }
  createSprites() {
    return {
      left: "z",
      right: "x",
    };
  }
}

class Bat extends Enemy {
  constructor({ game = null, position = { x: 8 ,y: 8 } }) {
    super({ game, position });

    this.speed = 1;

    this.damage = { min: 0.25, max: 1 };
    this.frameInterval = Math.random() * 175 + 125;
  }
  createSprites() {
    return {
      left: "c",
      right: "v",
    };
  }
}

class EnemyManager {
  constructor({ game = null }) {
    this.game = game;

    this.enemies = [];
    this.enemyTypes = ["runner", "brute", "slime", "bat"];

    this.maxEnemies = 4;
    this.timeToNewEnemy = 0;
    this.enemyInterval = 2500;

    this.canSpawn = false;
    this.initialDelay = 2500;

    this.init();
  }
  init() {
    setTimeout(() => (this.canSpawn = true), this.initialDelay);
  }
  update() {
    this.enemies.forEach((enemy) => enemy.update());
    this.spawnEnemies();
  }
  getPosition() {
    const map = { width: width(), height: height() };

    let x;
    let y;
    if (Math.random() > 0.5) {
      x = Math.random() > 0.5 ? 0 : map.width - 1;
      y = Math.floor(Math.random() * map.height);
    } else {
      x = Math.floor(Math.random() * map.width);
      y = Math.random() > 0.5 ? 0 : map.height - 1;
    }

    return { x, y };
  }
  spawnEnemies() {
    if (this.enemies.length >= this.maxEnemies || !this.canSpawn) return;

    if (this.timeToNewEnemy >= this.enemyInterval) {
      const params = { game: this.game, position: this.getPosition() };
      const spawnType =
        this.enemyTypes[Math.floor(Math.random() * this.enemyTypes.length)];

      if (spawnType === "runner") this.enemies.push(new Runner(params));
      else if (spawnType === "brute") this.enemies.push(new Brute(params));
      else if (spawnType === "slime") this.enemies.push(new Slime(params));
      else if (spawnType === "bat") this.enemies.push(new Bat(params));

      this.timeToNewEnemy = 0;
    } else this.timeToNewEnemy += this.game.delta;
  }
  removeEnemy(enemy) {
    enemy.remove();
    this.enemies.splice(this.enemies.indexOf(enemy), 1);
  }
  restart() {
    this.enemies.forEach((enemy) => enemy.remove());
    this.enemies = [];

    this.timeToNewEnemy = 0;
    this.canSpawn = false;

    this.init();
  }
}

class Drop {
  constructor(params) {
    this.sprite = params.sprite;
    this.manager = params.manager;
    this.position = params.position;

    this.timeToRemoval = 0;

    this.init();
  }
  init() {
    addSprite(this.position.x, this.position.y, this.sprite);
  }
  update(delta) {
    if (this.timeToRemoval >= this.removeTime) this.manager.remove(this);
    else this.timeToRemoval += delta;
  }
  remove() {
    const sprite = getFirst(this.sprite);
    sprite.remove();
  }
}

class Health extends Drop {
  constructor({ position, manager }) {
    const sprite = "h";
    super({ position, manager, sprite });

    this.type = "health";
    this.removeTime = 5000;
    this.health = Math.floor(Math.random() * 35 + 15);
  }
}

class DropManager {
  constructor({ game = null }) {
    this.game = game;

    this.drops = [];

    this.canSpawn = false;

    this.initialDelay = 1000;
    this.intervals = { health: 20000 };
    this.timeToNewDrops = { health: 0 };

    this.init();
  }
  init() {
    setTimeout(() => (this.canSpawn = true), this.initialDelay);
  }
  getPosition() {
    return {
      x: Math.floor(Math.random() * width()),
      y: Math.floor(Math.random() * height()),
    };
  }
  spawnDrops() {
    if (!this.canSpawn) return;

    const params = { position: this.getPosition(), manager: this };

    if (this.timeToNewDrops.health >= this.intervals.health) {
      this.drops.push(new Health(params));
      this.timeToNewDrops.health = 0;
    } else this.timeToNewDrops.health += this.game.delta;
  }
  update() {
    this.spawnDrops();

    this.drops.forEach((drop) => {
      drop.update(this.game.delta);
    });
  }
  remove(drop) {
    drop.remove();
    this.drops.splice(this.drops.indexOf(drop), 1);
  }
  restart() {
    this.drops.forEach((drop) => drop.remove());
    this.drops = [];
    this.timeToNewDrops = { health: 0 };
    this.canSpawn = false;

    this.init();
  }
}

class Effect {
  constructor(params) {
    this.sprite = params.sprite;
    this.position = params.position;
    this.manager = params.manager;

    this.timeToRemoval = 0;

    this.init();
  }
  init() {
    addSprite(this.position.x, this.position.y, this.sprite);
  }
  update(delta) {
    if (this.timeToRemoval >= this.removeTime) this.manager.remove(this);
    else this.timeToRemoval += delta;
  }
  remove() {
    const sprite = getFirst(this.sprite);
    sprite.remove();
  }
}

class BloodSplatter extends Effect {
  constructor({ position, manager }) {
    const sprite = "b";
    super({ position, sprite, manager });

    this.removeTime = 2000;
  }
}

class Slash extends Effect {
  constructor({ position, manager, slashType }) {
    const sprite = slashType;
    super({ position, sprite, manager });

    this.removeTime = 150;
  }
}

class EffectManager {
  constructor({ game = null }) {
    this.game = game;

    this.effects = [];
    this.effectTypes = ["bloodsplatter", "slash"];
  }
  createEffect(position, type = "bloodsplatter", slashType = "u") {
    const params = { position, manager: this, slashType };

    if (
      params.position.x < 0 ||
      params.position.x >= width() ||
      params.position.y < 0 ||
      params.position.y >= height()
    )
      return;

    if (type === "bloodsplatter") this.effects.push(new BloodSplatter(params));
    else if (type === "slash") this.effects.push(new Slash(params));
  }
  update() {
    this.effects.forEach((effect) => {
      effect.update(this.game.delta);
    });
  }
  remove(effect) {
    effect.remove();
    this.effects.splice(this.effects.indexOf(effect), 1);
  }
}

class InterfaceManager {
  constructor({ game = null }) {
    this.game = game;

    this.update();
  }
  displayDeathText() {
    clearText();
    addText(`You Died!`, { x: 6, y: 6, color: color`3` });
    addText(`Score ${this.game.score}`, { x: 6, y: 8, color: color`D` });
    addText(`J To Restart!`, { x: 4, y: 14, color: color`C` });
  }
  update() {
    if (this.game.player.health <= 0) this.game.player.health = 0;

    clearText();
    addText(`HP ${this.game.player.health}`, { x: 3, y: 14, color: color`4` });
    addText(`Score ${this.game.score}`, { x: 3, y: 1, color: color`D` });
  }
}

class Game {
  constructor() {
    this.inputHandler = new InputHandler();
    this.player = new Player({ game: this });
    this.enemyManager = new EnemyManager({ game: this });
    this.dropManager = new DropManager({ game: this });
    this.effectManager = new EffectManager({ game: this });
    this.uiManager = new InterfaceManager({ game: this });

    this.gameOver = false;
    this.deathSequenceInitiated = false;

    this.score = 0;

    this.level = 0;
    this.levels = this.createLevels();

    this.delta = 0;
    this.lastTime = 0;
    this.timeToNewFrame = 0;
    this.frameInterval = 125;

    this.init();
  }
  init() {
    this.setLegend();
    this.setSolids();
    this.setMap();
    this.setPushables();
    this.addInput();

    this.animate();
  }
  addInput() {
    onInput("j", () => this.restart());
  }
  setLegend() {
    setLegend(
      [
        "q",
        bitmap`
................
................
......3..3......
..33..3.3.33333.
...33.3.3.3...3.
...333333.3...3.
..3444443333.33.
..3444443393....
..30040033333...
..3044403393....
..3000403333....
..300040333..33.
..344444333...3.
...333333.3...3.
.333..3.3.33333.
......3.33......`,
      ],
      [
        "e",
        bitmap`
................
................
....DDDDDDDDDDD.
....DD333D333DD.
....DD333D333DD.
....DDD3DDD3DDD.
....DDD3D3D3DDD.
....DDD3DDD3DDD.
....DDDDDDDDDDD.
.....DDD..D..D..
.....DDDD.D..D..
.....D..D.DD.DD.
....DD..D..D..DD
..DDD...DD.DD..D
..3......3..3..D
...............3`,
      ],
      [
        "a",
        bitmap`
.33........33...
.333333.....33..
......3333333...
.4DDDDDDDDDDDD..
34D333DDD333DD..
.44333DDD333DD33
3DD333DDD333DD3.
3DD333D3D333DD33
3DD333DD4333DD33
.DD33344D333DD.3
..3DDD4DDDDDD...
.33.33.3..3.33..
.3...3.33.3..33.
.3..33.33.33..33
.3.33..3...33..3
33.33..33...3...`,
      ],
      [
        "d",
        bitmap`
................
................
.44444D4444444..
.44444DD444444..
.443334D433344..
.D433344433344..
.D4434444434D4..
.D4434434434D4..
.DD444444444D4..
..DD444444444...
...44.44.44.....
..4.44.4..44....
..4..4.4...44...
.44..4.4....44..
34...4.44....44.
.....3..3.....43`,
      ],
      [
        "z",
        bitmap`
................
................
33..0000.....3..
3399600000.333..
39996603303333..
9999666000003...
399966600000....
333966000000....
33..000000000...
3.....0000000...
.......0000000..
........000000..
........0000000.
........00000000
.........0000000
........000.0000`,
      ],
      [
        "x",
        bitmap`
................
................
..3.....0000..33
..333.0000069933
..33330330669993
...3000006669999
....000006669993
....000000669333
...000000000..33
...0000000.....3
..0000000.......
..000000........
.0000000........
00000000........
0000000.........
0000.000........`,
      ],
      [
        "c",
        bitmap`
................
................
........3333....
.......33.......
...000000000....
...000033000....
...000033300....
...000000000....
...000003.3.....
...0000.3.3.....
....000..3......
4...0000.3......
44..00000000....
.4440000000.....
................
................`,
      ],
      [
        "v",
        bitmap`
................
................
.333............
...3............
..000000........
.00330000.......
.033300000......
0000000000......
33...000000.....
3.....00000.....
3..00000000.....
...00000000.....
0000000000......
.0000000044.....
..000000..44444.
................`,
      ],
      [
        this.player.sprites.left,
        bitmap`
....000000..00..
...0L11LL10090..
..0L22311L0930..
.0L12231LL0930..
.0L113111L0930..
.01113111L0930..
.0LLL31LLL0930..
.0L32LL32L0930..
.0L320032L0930..
..010000L10930..
...00000L0LLLL0.
..00FFFFF000000.
.000FFFFFF0000..
.000000000000...
..000000000.....
...000..000.....`,
      ],
      [
        this.player.sprites.right,
        bitmap`
....000000..00..
...0L11LL10090..
..0L22311L0930..
.0L12231LL0930..
.0L113111L0930..
.01113111L0930..
.0LLL31LLL0930..
.0L32LL32L0930..
.0L320032L0930..
..010000L10930..
...00000L0LLLL0.
..00FFFFF000000.
.000FFFFFF0000..
.000000000000...
..000000000.....
...000..000.....`,
      ],
      [
        "b",
        bitmap`
........3.......
..3..3........3.
....3....3..3...
.3..3..3...33.33
....33.333....3.
..3333333.3.333.
3..33333333333..
....333333333...
.333333333333.3.
3.333333333333..
...333333333.3..
...333333333..3.
.3..333333.3....
333...333.3..3..
..3..........33.
.....3....3.....`,
      ],
      [
        "u",
        bitmap`
................
................
................
................
..9999999999....
.9999993333999..
999333322223339.
33322222..22239.
3222........229.
22............9.
................
................
................
................
................
................`,
      ],
      [
        "i",
        bitmap`
................
................
..9.............
................
.9..............
.9............9.
.9............9.
.99...........9.
.99..........39.
..99........39..
..999......339..
...9993333339.9.
....9999999999..
.....99999999...
................
................`,
      ],
      [
        "o",
        bitmap`
................
.......99999....
.....9999....9..
....999.........
...999..........
..999...........
..993...........
..993...........
..993...........
..993...........
..993...........
..9933..........
..99933.........
...9.993........
....9..9999.....
................`,
      ],
      [
        "p",
        bitmap`
................
.....9999..9....
........399.9...
.........33999..
..........3399..
...........399..
...........399..
...........399..
...........399..
...........399..
...........999..
..........999...
.........999....
..9....9999.....
....99999.......
................`,
      ],
      [
        "h",
        bitmap`
................
.......6........
......666.......
......666.......
.....66666......
666666626666666.
.6666622266666..
.6622202022266..
..66222222266...
...662020266....
...622000226....
..66226662266...
..6266...6626...
.6666.....6666..
.66.........66..
................`,
      ],
      [
        "f",
        bitmap`
................
................
................
.CC.CC.CC.CC.CC.
C..C..C..C..C..C
C..C..C..C..C..C
C..C..C..C..C..C
CCCCCCCCCCCCCCCC
C..C..C..C..C..C
C..C..C..C..C..C
C..C..C..C..C..C
CCCCCCCCCCCCCCCC
C..C..C..C..C..C
C..C..C..C..C..C
C..C..C..C..C..C
4444444444444444`,
      ],
    )
  }
  setSolids() {
    setSolids([
      "e",
      "q",
      "a",
      "d",
      "z",
      "x",
      "c",
      "v",
      "f",
      this.player.sprites.right,
      this.player.sprites.left,
      
    ],);
  }
  setMap() {
    setMap(this.levels[this.level]);
  }
  setPushables() {
    setPushables({
      [this.player.sprites.right]: [],
    });
  }
  createLevels() {
    return [
      map`
.........................
.f.f.f.f.f.f.f.f.f.f.f.f.
.........................
.f.....................f.
....f.f.f.f.f.f.f.f.f....
.f.....................f.
....f...............f....
.f.....f.f.f.f.f.f.....f.
....f...............f....
.f.....f....r....f.....f.
....f...............f....
.f.....f.f.f.f.f.f.....f.
....f...............f....
.f.....................f.
....f.f.f.f.f.f.f.f.f....
.f.....................f.
.........................
.f.f.f.f.f.f.f.f.f.f.f.f.
.........................`,
    ];
  }
  animate(timestamp = 0) {
    if (this.gameOver) {
      if (!this.deathSequenceInitiated) this.startDeathSequence();
      return;
    }

    this.delta = timestamp - this.lastTime;
    this.lastTime = timestamp;

    if (this.timeToNewFrame >= this.frameInterval) {
      this.player.update();
      this.timeToNewFrame = 0;
    } else this.timeToNewFrame += this.delta;

    this.enemyManager.update();
    this.dropManager.update();
    this.effectManager.update();
    this.uiManager.update();

    window.requestAnimationFrame((timestamp) => this.animate(timestamp));
  }
  startDeathSequence() {
    this.deathSequenceInitiated = true;
    this.uiManager.displayDeathText();
  }
  restart() {
    if (!this.gameOver) return;

    this.score = 0;
    this.gameOver = false;
    this.deathSequenceInitiated = false;

    this.player.restart();
    this.enemyManager.restart();
    this.dropManager.restart();

    this.animate();
  }
}

const game = new Game();