/*
@title: PixelGladiators
@author: Abdur Rehman
@tags: [ fighting, top down, action ]
@addedOn: 2025-02-05

A game about fighting monsters.

GOAL:
- Kill as many monsters as you can, while trying to get the highest score!

Controls:
- WASD keys to move.
- K to attack (the direction of movement determines where you attack).
  
TIP:
- Pickup health drops to prolong your survival.
*/

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

    this.health = 100;

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

            if (this.health >= 100) this.health = 100;
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
  constructor({ game = null, position = { x: 8, y: 8 } }) {
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
    addText(`You Died!`, { x: 6, y: 6, color: color`0` });
    addText(`Score ${this.game.score}`, { x: 6, y: 8, color: color`0` });
    addText(`J To Restart!`, { x: 4, y: 14, color: color`0` });
  }
  update() {
    if (this.game.player.health <= 0) this.game.player.health = 0;

    clearText();
    addText(`HP ${this.game.player.health}`, { x: 3, y: 14, color: color`0` });
    addText(`Score ${this.game.score}`, { x: 3, y: 1, color: color`0` });
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
FFLLL...........
FFFF0...........
3F3F00L.........
FFFFF000FFF.....
00FF0CC0FFFF....
00FFFCFFFFFFF...
FF..FFFFFFFFFF..
..FFFFFFFFFFCC..
.F...FF.CFFFCC..
.F.FFF.CCCCCCC..
..F....CCCCCCC..
..F....CC...CC..
.......C.....C..
........C.....C.
.........C.....C
........CC....CC`,
      ],
      [
        "e",
        bitmap`
...........LLLFF
...........0FFFF
.........L00F3F3
.....FFF000FFFFF
....FFFF0CC0FF00
...FFFFFFFCFFF00
..FFFFFFFFFF..FF
..CCFFFFFFFFFF..
..CCFFFC.FF...F.
..CCCCCCC.FFF.F.
..CCCCCCC....F..
..CC...CC....F..
..C.....C.......
.C.....C........
C.....C.........
CC....CC........`,
      ],
      [
        "a",
        bitmap`
....000..000....
...0FFF00FFF0...
..0FFFFCFFFFF0..
..03F3FF3F3FF0..
..0FFF2CFFF2CF0.
.0F2002C2002CFF0
.0FCFFCFCFFCFFF0
.0FFCCFFFCCFFFF0
.0FFFFFFFFFFFFF0
.0F0FFFFFFFFFFF0
.0FF0CFFFFFC0FF0
.0FF0CCLLLCC0FF0
..000CCCCCCC000.
...0FLCCCCCLF0..
...0FFL000LFF0..
..0FFFF0.0FFF0..`,
      ],
      [
        "d",
        bitmap`
....000..000....
...0FFF00FFF0...
..0FFFFFCFFFF0..
..0FF3F3FF3F30..
.0FC2FFFC2FFF0..
0FFC2002C2002F0.
0FFFCFFCFCFFCF0.
0FFFFCCFFFCCFF0.
0FFFFFFFFFFFFF0.
0FFFFFFFFFFF0F0.
0FF0CFFFFFC0FF0.
0FF0CCLLLCC0FF0.
.000CCCCCCC000..
..0FLCCCCCLF0...
..0FFL000LFF0...
..0FFF0.0FFFF0..`,
      ],
      [
        "z",
        bitmap`
................
................
................
................
................
....4444........
...334334.......
...444444.......
...4D4D444......
....DDDD44......
....DDDD44......
....444D444.....
...444444444....
..444DDDDD4444..
.44DDDDDDDDD444.
..44444444444...`,
      ],
      [
        "x",
        bitmap`
................
................
................
................
................
........4444....
.......433433...
.......444444...
......444D4D4...
......44DDDD....
......44DDDD....
.....444D444....
....444444444...
..4444DDDDD444..
.444DDDDDDDDD44.
...44444444444..`,
      ],
      [
        "c",
        bitmap`
....0......0....
...00..000.00...
..0000.303.000..
..000000000000..
..000000000000..
..00...0.0..00..
...0........0...
................
................
................
................
................
................
................
.......000......
....00000000....`,
      ],
      [
        "v",
        bitmap`
....0......0....
...00.000..00...
..000.303.0000..
..000000000000..
..000000000000..
..00..0.0...00..
...0........0...
................
................
................
................
................
................
................
......000.......
....00000000....`,
      ],
      [
        this.player.sprites.left,
        bitmap`
....000000.300..
...0L11LL10020..
..0L22111L0210..
.0L12211LL0210..
.0L1111L1L0210..
.0111111110210..
.0LLL11LLL0210..
.0L02LL02L0210..
.0L02CC02L0210..
..0CCCCCL10210..
...0CCCCL0LLLL0.
..003333300CC00.
.0C03333330CC0..
.0C0000000000...
..000000000.....
...000..000.....`,
      ],
      [
        this.player.sprites.right,
        bitmap`
..003.000000....
..02001LL11L0...
..0120L11122L0..
..0120LL11221L0.
..0120L1L1111L0.
..0120111111110.
..0120LLL11LLL0.
..0120L20LL20L0.
..0120L20CC20L0.
..01201LCCCCC0..
.0LLLL0LCCCC0...
.00CC003333300..
..0CC03333330C0.
...0000000000C0.
.....000000000..
.....000..000...`,
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
...11111111.....
..1111111111....
.1.1LLLLLL111...
..1LL......111..
..1L........11..
.1L..........11.
.1...........11.
.1............1.
.1............1.
..............1.
................
.............1..
................
................`,
      ],
      [
        "i",
        bitmap`
................
................
..1.............
................
.1..............
.1............1.
.1............1.
.11...........1.
.11..........L1.
..11........L1..
..111......LL1..
...111LLLLLL1.1.
....1111111111..
.....11111111...
................
................`,
      ],
      [
        "o",
        bitmap`
................
.......11111....
.....1111....1..
....111.........
...111..........
..111...........
..11L...........
..11L...........
..11L...........
..11L...........
..11L...........
..11LL..........
..111LL.........
...1.11L........
....1..1111.....
................`,
      ],
      [
        "p",
        bitmap`
................
.....1111..1....
........L11.1...
.........LL111..
..........LL11..
...........L11..
...........L11..
...........L11..
...........L11..
...........L11..
...........111..
..........111...
.........111....
..1....1111.....
....11111.......
................`,
      ],
      [
        "h",
        bitmap`
................
.....000000.....
....0CCCCCC0....
...0C000000C0...
...0C0....0C0...
..000000000000..
.03333333333330.
.03333322333330.
.03333322333330.
.03332222223330.
.03332222223330.
.03333322333330.
.03333322333330.
..033333333330..
...0000000000...
................`,
      ],
    );
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
      this.player.sprites.right,
      this.player.sprites.left,
    ]);
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
...........
...........
...........
...........
...........
.....r.....
...........
...........
...........
...........
...........`,
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