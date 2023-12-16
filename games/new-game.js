

setLegend(
	[ player, bitmap`
  ......66666.....
  ....666666666...
  ...66666666666..
  ..666666666666..
  ..666666666666..
  .66666666666....
  .66666666.......
  .666666.........
  .66666666.......
  .66666666666....
  ..666666666666..
  ..666666666666..
  ...66666666666..
  ....666666666...
  ......66666.....
  ................`],
	[ blinky, bitmap `
  ................
  .....33333......
  ....33333333....
  ...3333333333...
  ..33322333322...
  ..332222332222..
  ..332255332255..
  .33322553322553.
  .33332233332233.
  .33333333333333.
  .33333333333333.
  .33333333333333.
  .33333333333333.
  .33333333333333.
  .33.333..333.33.
  .3...33..33...3.`],
	[ inky, bitmap `
  ................
  .....77777......
  ....77777777....
  ...7777777777...
  ..77722777722...
  ..772222772222..
  ..775522775522..
  .77755227755227.
  .77772277772277.
  .77777777777777.
  .77777777777777.
  .77777777777777.
  .77777777777777.
  .77777777777777.
  .77.777..777.77.
  .7...77..77...7.`],
	[ pinky, bitmap `
  ................
  .....88888......
  ....88888888....
  ...8888888888...
  ..88822888822...
  ..882222882222..
  ..882222882222..
  .88825528825528.
  .88885588885588.
  .88888888888888.
  .88888888888888.
  .88888888888888.
  .88888888888888.
  .88888888888888.
  .88.888..888.88.
  .8...88..88...8.`],
	[ clyde, bitmap `
  ................
  .....99999......
  ....99999999....
  ...9999999999...
  ..99955999955...
  ..992552992552..
  ..992222992222..
  .99922229922229.
  .99992299992299.
  .99999999999999.
  .99999999999999.
  .99999999999999.
  .99999999999999.
  .99999999999999.
  .99.999..999.99.
  .9...99..99...9.`],
	[ blinkyeyes, bitmap `
  ................
  ................
  ................
  ................
  .....22....22...
  ....2222..2222..
  ....2255..2255..
  ....2255..2255..
  .....22....22...
  ................
  ................
  ................
  ................
  ................
  ................
  ................`],
	[ inkyeyes, bitmap `
  ................
  ................
  ................
  ................
  .....22....22...
  ....2222..2222..
  ....5522..5522..
  ....5522..5522..
  .....22....22...
  ................
  ................
  ................
  ................
  ................
  ................
  ................`],
	[ pinkyeyes, bitmap `
  ................
  ................
  ................
  ................
  .....22....22...
  ....2222..2222..
  ....2222..2222..
  ....2552..2552..
  .....55....55...
  ................
  ................
  ................
  ................
  ................
  ................
  ................`],
	[ clydeeyes, bitmap `
  ................
  ................
  ................
  ................
  .....55....55...
  ....2552..2552..
  ....2222..2222..
  ....2222..2222..
  .....22....22...
  ................
  ................
  ................
  ................
  ................
  ................
  ................`],
	[ power, bitmap`
  ................
  ....2222222.....
  ...222222222....
  ..22222222222...
  .2222222222222..
  .2222222222222..
  .2222222222222..
  .2222222222222..
  .2222222222222..
  .2222222222222..
  .2222222222222..
  .2222222222222..
  ..22222222222...
  ...222222222....
  ....2222222.....
  ................`],
	[ wall, bitmap`
  5555555555555555
  5555555555555555
  5555555555555555
  5555555555555555
  5555555555555555
  5555555555555555
  5555555555555555
  5555555555555555
  5555555555555555
  5555555555555555
  5555555555555555
  5555555555555555
  5555555555555555
  5555555555555555
  5555555555555555
  5555555555555555`],
	[ dot, bitmap`
  ................
  ................
  ................
  ................
  ................
  ......2222......
  .....222222.....
  .....222222.....
  .....222222.....
  .....222222.....
  ......2222......
  ................
  ................
  ................
  ................
  ................`],
	[ background, bitmap`
  0000000000000000
  0000000000000000
  0000000000000000
  0000000000000000
  0000000000000000
  0000000000000000
  0000000000000000
  0000000000000000
  0000000000000000
  0000000000000000
  0000000000000000
  0000000000000000
  0000000000000000
  0000000000000000
  0000000000000000
  0000000000000000`],
	[ ghostwall, bitmap `
  ................
  ................
  ................
  ................
  ................
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  ................
  ................
  ................
  ................
  ................`],
  );
  setBackground(background);
  setSolids([player,wall]);
  let lives = 3;
  let score = 0;
  const levels = [
	map`
  .......................
  .......................
  ..wwwwwwwwwwwwwwwwwww..
  ..wttttttttwttttttttw..
  ..wbwwtwwwtwtwwwtwwbw..
  ..wtttttttttttttttttw..
  ..wtwwtwtwwwwwtwtwwtw..
  ..wttttwtttwtttwttttw..
  ..wwwwtwww.w.wwwtwwww..
  .....wtw...l...wtw.....
  .wwwwwtw.wwmww.wtwwwww.
  ......t..wiycw..t......
  .wwwwwtw.wwwww.wtwwwww.
  .....wtw.......wtw.....
  ..wwwwtw.wwwww.wtwwww..
  ..wttttttttwttttttttw..
  ..wtwwtwwwtwtwwwtwwtw..
  ..wbtwtttttptttttwtbw..
  ..wwtwtwtwwwwwtwtwtww..
  ..wttttwtttwtttwttttw..
  ..wtwwwwwwtwtwwwwwwtw..
  ..wtttttttttttttttttw..
  ..wwwwwwwwwwwwwwwwwww..`,
	map`
  .......................
  .......................
  ..wwwwwwwwwwwwwwwwwww..
  ..w........w........w..
  ..w.ww.www.w.www.ww.w..
  ..w.................w..
  ..w.ww.w.wwwww.w.ww.w..
  ..w....w...w...w....w..
  ..wwww.www.w.www.wwww..
  .....w.w.......w.w.....
  .wwwww.w.wwmww.w.wwwww.
  .........w.t.w.........
  .wwwww.w.wwwww.w.wwwww.
  .....w.w.......w.w.....
  ..wwww.w.wwwww.w.wwww..
  ..w........w........w..
  ..w.ww.www.w.www.ww.w..
  ..w..w...........w..w..
  ..ww.w.w.wwwww.w.w.ww..
  ..w....w...w...w....w..
  ..w.wwwwww.w.wwwwww.w..
  ..w.................w..
  ..wwwwwwwwwwwwwwwwwww..`,
  ];
  addText("SCORE: ", {
	x: 0,
	y: 0,
	color: color`2`
  })
  
  const FPS = 24;
var tileXCount = 0;
var tileYCount = 0;
const RES_LEVELS = [
    [1, 1],
    [2, 2],
    [3, 2],
    [3, 3],
    [4, 3],
    [4, 4],
    [5, 4],
    [6, 6],
    [8, 8],
    [10, 8],
    [20, 16],
];
var selectedResLevel = 6;
var fb;
recreateFramebuffer();
// -- Bullet Globals --
const BULLET_DAMAGE = 40;
const BULLET_COOLDOWN_THRESHOLD = 0.12;
const BULLET_MAX_DISTANCE = 40;
const BULLET_SPEED = 2.5;
var bullets = [];
// -- Player Globals --
const PLAYER_MAX_HEALTH = 50;
const PLAYER_POISON_TICK = 0.01;
const PLAYER_MAX_VELOCITY = 0.65;
const PLAYER_FRICTION_SCALAR = 0.006;
const PLAYER_WALL_BOUNCE_SCALAR = 0.8;
const PLAYER_ACCELERATION = 0.13;
var player;
var playerDead = false;
const MEDKIT_HEAL_AMOUNT = 18;
const MEDKIT_PLAYER_SPAWN_MIN_RADIUS = 40;
const MEDKIT_PLAYER_SPAWN_MAX_RADIUS = 200;
const MEDKIT_PICKUP_RANGE = 5;
const MEDKIT_POPUP_RISE_SPEED = 0.3;
const MEDKIT_POPUP_MAX_HEIGHT = 4;
var medkit = null;
var medkitHealPopups = [];
// -- Enemy Globals --
const ENEMY_DAMAGE = 0.2;
const ENEMY_MAX_DODGE = 0.3;
const ENEMY_REACH = 1.8;
const ENEMY_SPEED_INCREMENT_SCALAR = 0.0006;
const ENEMY_PLAYER_SPAWN_MIN_RADIUS = 60;
const ENEMY_PLAYER_SPAWN_MAX_RADIUS = 350;
var enemies = [];
// -- Stage Globals --
const ENEMY_CAP_STAGES = [3, 5, 8, 20, 30, 40, 9999];
const ENEMY_SPAWN_FREQUENCY_STAGES = [0.03, 0.1, 0.15, 0.3, 0.4, 0.5, 10];
const KILL_SCREEN_STAGE = 6;
function getStageNumber() {
    if (startTime <= 20) {
        return 0;
    }
    else if (startTime <= 100) {
        return 1;
    }
    else if (startTime <= 200) {
        return 2;
    }
    else if (startTime <= 300) {
        return 3;
    }
    else if (startTime <= 400) {
        return 4;
    }
    else if (startTime <= 999) {
        return 5;
    }
    else {
        return KILL_SCREEN_STAGE;
    }
}
// -- Explosion Globals --
const EXPLOSION_MAX_SIZE = 2.0;
const EXPLOSION_GROWTH_INCREMENT = 0.3;
var explosions = [];
const MAP_SETTINGS = [
    {
        name: "SS ",
        bound: 60,
        wallCount: 12,
        wallMaxScale: 4,
    },
    {
        name: " S ",
        bound: 75,
        wallCount: 24,
        wallMaxScale: 4,
    },
    {
        name: " M ",
        bound: 85,
        wallCount: 30,
        wallMaxScale: 5,
    },
    {
        name: " L ",
        bound: 100,
        wallCount: 40,
        wallMaxScale: 7,
    },
    {
        name: "XL ",
        bound: 150,
        wallCount: 110,
        wallMaxScale: 8,
    },
    {
        name: "XXL",
        bound: 500,
        wallCount: 1300,
        wallMaxScale: 12,
    },
    {
        name: "XXX",
        bound: 800,
        wallCount: 2500,
        wallMaxScale: 12,
    },
];
var selectedMapSetting = 2;
const MAP_WALL_Y = 6;
const MAP_WALL_TO_WALL_MIN_DISTANCE = 20;
var walls = [];
function incMapSetting() {
    playTune((0, soundSettingChange)());
    selectedMapSetting += 1;
    if (selectedMapSetting >= MAP_SETTINGS.length)
        selectedMapSetting = MAP_SETTINGS.length - 1;
}
function decMapSetting() {
    playTune((0, soundSettingChange)());
    selectedMapSetting -= 1;
    if (selectedMapSetting < 0)
        selectedMapSetting = 0;
}
// -- Game State --
var GameState;
(function (GameState) {
    GameState[GameState["MENU"] = 0] = "MENU";
    GameState[GameState["PLAY"] = 1] = "PLAY";
})(GameState || (GameState = {}));
var gameState = GameState.MENU;
let startTime = 0;
// -- Spawn Functions --
function spawnWalls() {
    let settings = MAP_SETTINGS[selectedMapSetting];
    let north = {
        scale: [1, MAP_WALL_Y, settings.bound],
        position: [settings.bound, 0, 0],
        color: "1",
    };
    let south = {
        scale: [1, MAP_WALL_Y, settings.bound],
        position: [-settings.bound, 0, 0],
        color: "1",
    };
    let west = {
        scale: [settings.bound, MAP_WALL_Y, 1],
        position: [0, 0, settings.bound],
        color: "1",
    };
    let east = {
        scale: [settings.bound, MAP_WALL_Y, 1],
        position: [0, 0, -settings.bound],
        color: "1",
    };
    walls.push(north);
    walls.push(south);
    walls.push(west);
    walls.push(east);
    for (let i = 0; i < settings.wallCount; i++) {
        let scaleX = Math.random() * settings.wallMaxScale + 3;
        let scaleZ = Math.random() * settings.wallMaxScale + 3;
        let positionX = Math.random() * (settings.bound - 2) * 2 - settings.bound;
        let positionZ = Math.random() * (settings.bound - 2) * 2 - settings.bound;
        let failedWall = false;
        for (let wi in walls) {
            let other = walls[wi];
            if ((0, vecDistance)([other.position[0], 0, other.position[2]], [positionX, 0, positionZ]) < MAP_WALL_TO_WALL_MIN_DISTANCE) {
                failedWall = true;
                break;
            }
        }
        if (Math.abs(positionX) < settings.wallMaxScale + 4 ||
            Math.abs(positionZ) < settings.wallMaxScale + 4) {
            failedWall = true;
        }
        if (settings.bound - Math.abs(positionX) < 18 ||
            settings.bound - Math.abs(positionZ) < 18) {
            failedWall = true;
        }
        if (failedWall) {
            i--;
            continue;
        }
        let wall = {
            scale: [scaleX, MAP_WALL_Y, scaleZ],
            position: [positionX, 0, positionZ],
            color: "1",
        };
        walls.push(wall);
    }
}
function spawnMedkit(argPositionX, argPositionZ) {
    let finalPositionX = argPositionX;
    let finalPositionZ = argPositionZ;
    if (argPositionX == null && argPositionZ == null) {
        let mapSetting = MAP_SETTINGS[selectedMapSetting];
        while (true) {
            let positionX = Math.random() * mapSetting.bound * 2 - mapSetting.bound;
            let positionZ = Math.random() * mapSetting.bound * 2 - mapSetting.bound;
            let distToPlayer = (0, vecDistance)(player.position, [
                positionX,
                0,
                positionZ,
            ]);
            if (getCollisionWall([positionX, 0, positionZ]) == null &&
                distToPlayer <= MEDKIT_PLAYER_SPAWN_MAX_RADIUS &&
                distToPlayer >= MEDKIT_PLAYER_SPAWN_MIN_RADIUS) {
                if (finalPositionX == null) {
                    finalPositionX = positionX;
                }
                if (finalPositionZ == null) {
                    finalPositionZ = positionZ;
                }
                break;
            }
        }
    }
    medkit = {
        position: [finalPositionX, 3, finalPositionZ],
    };
}
function spawnMedkitHealPopup() {
    let popup = {
        y: 0,
    };
    medkitHealPopups.push(popup);
}
function spawnEnemy() {
    let stage = getStageNumber();
    if (enemies.length >= ENEMY_CAP_STAGES[stage])
        return;
    let mapSetting = MAP_SETTINGS[selectedMapSetting];
    let position;
    while (true) {
        let positionX = Math.random() * mapSetting.bound * 2 - mapSetting.bound;
        let positionY = Math.random() * mapSetting.bound * 2 - mapSetting.bound;
        position = [positionX, 0, positionY];
        let distToPlayer = (0, vecDistance)(player.position, position);
        if (distToPlayer >= ENEMY_PLAYER_SPAWN_MIN_RADIUS &&
            distToPlayer <= ENEMY_PLAYER_SPAWN_MAX_RADIUS) {
            break;
        }
    }
    let randomSpeed = Math.random() * 0.4 + 0.1;
    let randomHealth = Math.random() * 100 + 40;
    let numColors = [0, 3, 5, 7, 4, 6, 8, 9];
    let randomColor = Math.floor(Math.random() * 8);
    let randomDodge;
    if (Math.random() >= 0.8) {
        randomDodge = 0;
    }
    else {
        randomDodge = Math.random() * ENEMY_MAX_DODGE;
    }
    let enemy = {
        speed: randomSpeed,
        health: randomHealth,
        color: numColors[randomColor],
        dodgeEntropy: randomDodge,
        position,
    };
    enemies.push(enemy);
}
function spawnBullet(origin, direction) {
    playTune((0, soundPew)());
    let bullet = {
        origin,
        direction,
        position: origin,
    };
    bullets.push(bullet);
}
function spawnExplosion(position) {
    playTune((0, soundExplosion)());
    let explosion = {
        position,
        sizeScalar: 0.2,
    };
    explosions.push(explosion);
}
// -- Game Start --
function initInput() {
    onInput("w", inputLeftUp);
    onInput("s", inputLeftDown);
    onInput("a", inputLeftLeft);
    onInput("d", inputLeftRight);
    onInput("i", inputRightUp);
    onInput("j", inputRightLeft);
    onInput("l", inputRightRight);
    onInput("k", inputRightDown);
}
function initGame() {
    player = {
        position: [0, 0, 0],
        velocity: [0, 0, 0],
        direction: [1, 0, 0],
        health: PLAYER_MAX_HEALTH - MEDKIT_HEAL_AMOUNT,
        bobTick: 0,
        yaw: 0,
        lastBulletTime: 0,
    };
    playerDead = false;
    enemies = [];
    bullets = [];
    explosions = [];
    medkit = null;
    medkitHealPopups = [];
    walls = [];
    startTime = 0;
    spawnWalls();
    spawnMedkit(6, 0);
}
// -- Tick Functions --
function tickPlayer() {
    // Look in the direction you should be looking.
    player.direction[0] = Math.cos(player.yaw);
    player.direction[2] = Math.sin(player.yaw);
    player.direction = (0, vecNormalize)(player.direction);
    // Cap the speed.
    if ((0, vecLength)(player.velocity) > PLAYER_MAX_VELOCITY) {
        player.velocity = (0, vecMulScalar)((0, vecNormalize)(player.velocity), PLAYER_MAX_VELOCITY);
    }
    // Friction.
    player.velocity = (0, vecAddVec)(player.velocity, (0, vecMulScalar)((0, vecNormalize)(player.velocity), -PLAYER_FRICTION_SCALAR));
    // Move forward unless if there's a wall (then you should bounce!).
    let next_position = (0, vecAddVec)(player.position, player.velocity);
    let collisionWall = getCollisionWall(next_position);
    if (collisionWall == null) {
        player.position = next_position;
    }
    else {
        playTune((0, soundPew)());
        // Over-engineered bouncing.
        let wallToPlayer = (0, vecNormalize)((0, vecSubVec)(collisionWall.position, player.position));
        // Well, our walls are never rotated anyway ¯\_ (ツ)_/¯.
        let possibleNormals = [
            [-1, 0, 0],
            [1, 0, 0],
            [0, -1, 0],
            [0, 1, 0],
            [0, 0, -1],
            [0, 0, 1],
        ];
        let normal = possibleNormals[0];
        let minDist = (0, vecDistance)(possibleNormals[0], wallToPlayer);
        for (let i in possibleNormals) {
            let n = possibleNormals[i];
            let dist = (0, vecDistance)(n, wallToPlayer);
            if (dist < minDist) {
                minDist = dist;
                normal = n;
            }
        }
        let reflected = (0, vecAddVec)((0, vecMulScalar)(normal, -2 * (0, vecDot)(normal, player.velocity)), player.velocity);
        player.velocity = (0, vecMulScalar)(reflected, PLAYER_WALL_BOUNCE_SCALAR);
    }
}
function tickBullets() {
    // Bullet go forward.
    for (let i in bullets) {
        let bullet = bullets[i];
        bullet.position = (0, vecAddVec)(bullet.position, (0, vecMulScalar)(bullet.direction, BULLET_SPEED));
    }
    // Remove bullets that have gone too far.
    bullets = bullets.filter((bullet) => (0, vecDistance)(bullet.position, bullet.origin) <= BULLET_MAX_DISTANCE);
}
function tickEnemies() {
    let enemySpeedIncrement = ENEMY_SPEED_INCREMENT_SCALAR;
    for (let i in enemies) {
        let enemy = enemies[i];
        // Add speed. They will always outrun you. (Not really.)
        enemy.speed += enemySpeedIncrement;
        // Get closer if enemy isn't already too close.
        if ((0, vecDistance)(player.position, enemy.position) >= ENEMY_REACH) {
            let direction = (0, vecNormalize)((0, vecSubVec)(player.position, enemy.position));
            // Adding dodge makes things more interesting.
            let dodgeDirection = (0, vecMulScalar)((0, vec3CrossProduct)(direction, [0, 1, 0]), Math.sin(startTime * 6 * enemy.dodgeEntropy) * enemy.dodgeEntropy);
            let next_position = (0, vecAddVec)(enemy.position, (0, vecMulScalar)(direction, enemy.speed));
            next_position = (0, vecAddVec)(next_position, dodgeDirection);
            // Don't go through walls. Go around instead. (Or try to anyway.)
            if (getCollisionWall(enemy.position) == null) {
                enemy.position = next_position;
            }
            else {
                // Pretty scuffed solution, but hey.
                enemy.position = (0, vecAddVec)(enemy.position, (0, vecMulScalar)((0, vec3CrossProduct)([0, 1, 0], player.direction), enemy.speed));
            }
        }
        else {
            // BAM. Attack the player.
            playTune((0, soundEnemyAttack)());
            player.health -= ENEMY_DAMAGE;
        }
        // BAM. Attacked by player.
        if (hitByBullet(enemy.position)) {
            enemy.health -= BULLET_DAMAGE;
            if (enemy.health <= 0) {
                spawnExplosion(enemy.position);
            }
        }
    }
    // Remove the deceased.
    enemies = enemies.filter((enemy) => enemy.health > 0);
}
// Check if hit by bullet.
// Destroy the bullet if so.
function hitByBullet(agent) {
    const HITBOX_RADIUS = 2.5;
    let newBullets = bullets.filter((bullet) => {
        return (0, vecDistance)(agent, bullet.position) >= HITBOX_RADIUS;
    });
    let ret = newBullets.length != bullets.length;
    bullets = newBullets;
    return ret;
}
function tickExplosions() {
    // BOOM!
    for (let i in explosions) {
        let explosion = explosions[i];
        explosion.sizeScalar += EXPLOSION_GROWTH_INCREMENT;
    }
    // If too big, remove.
    explosions = explosions.filter((explosion) => explosion.sizeScalar <= EXPLOSION_MAX_SIZE);
}
function tickMedkit() {
    if (medkit) {
        // Pick up the medkit if it's close enough.
        if ((0, vecDistance)(player.position, medkit.position) <= MEDKIT_PICKUP_RANGE) {
            playTune((0, soundPickUp)());
            medkit = null;
            spawnMedkitHealPopup();
            player.health += MEDKIT_HEAL_AMOUNT;
            if (player.health > PLAYER_MAX_HEALTH) {
                player.health = PLAYER_MAX_HEALTH;
            }
        }
    }
    else {
        // Spawn medkit if there isn't aleady one.
        spawnMedkit(null, null);
    }
}
function tickPoison() {
    player.health -= PLAYER_POISON_TICK * (getStageNumber() + 1);
}
function tickMedkitHealPopup() {
    // Popup go up.
    for (let i in medkitHealPopups) {
        let popup = medkitHealPopups[i];
        popup.y += MEDKIT_POPUP_RISE_SPEED;
    }
    // Popup go away.
    medkitHealPopups = medkitHealPopups.filter((popup) => popup.y <= MEDKIT_POPUP_MAX_HEIGHT);
}
function tickEnemySpawn() {
    // Spawn enemies based on stage #.
    let spawnParam = ENEMY_SPAWN_FREQUENCY_STAGES[getStageNumber()];
    if (Math.abs(startTime % 8) < spawnParam) {
        spawnEnemy();
    }
}
var lastStageNumber = getStageNumber();
function tickGame() {
    // Game over.
    if (player.health <= 0) {
        playTune((0, soundDeath)());
        playerDead = true;
        setTimeout(() => {
            gameState = GameState.MENU;
        }, 3000);
    }
    if (!playerDead) {
        startTime += 1 / FPS;
        if (lastStageNumber != getStageNumber()) {
            playTune((0, soundStageUp)());
        }
        lastStageNumber = getStageNumber();
        tickPlayer();
        tickEnemies();
        tickBullets();
        tickMedkit();
        tickExplosions();
        tickPoison();
        tickEnemySpawn();
        tickMedkitHealPopup();
    }
    else {
        // Look up when you die.
        if (player.direction[1] >= -Math.PI / 2) {
            player.direction[1] -= 0.2;
        }
    }
}
function tickMenu() {
    startTime += 1 / FPS;
}
// -- Collision Detection --
function getCollisionWall(d) {
    for (let i in walls) {
        let wall = walls[i];
        let boxMinX = Math.min(wall.position[0] - wall.scale[0], wall.position[0] + wall.scale[0]);
        let boxMaxX = Math.max(wall.position[0] - wall.scale[0], wall.position[0] + wall.scale[0]);
        let boxMinZ = Math.min(wall.position[2] - wall.scale[2], wall.position[2] + wall.scale[2]);
        let boxMaxZ = Math.max(wall.position[2] - wall.scale[2], wall.position[2] + wall.scale[2]);
        if (d[0] >= boxMinX &&
            d[0] <= boxMaxX &&
            d[2] >= boxMinZ &&
            d[2] <= boxMaxZ) {
            return wall;
        }
    }
    return null;
}
// -- Input --
function playerBob() {
    player.bobTick += 1;
    player.position[1] = Math.sin(player.bobTick * 0.8) * 0.2 + 0.1;
}
function inputLeftUp() {
    switch (gameState) {
        case GameState.MENU:
            gameState = GameState.PLAY;
            initGame();
            break;
        case GameState.PLAY:
            playerBob();
            player.velocity = (0, vecAddVec)(player.velocity, (0, vecMulScalar)(player.direction, PLAYER_ACCELERATION));
            break;
    }
}
function inputLeftDown() {
    switch (gameState) {
        case GameState.MENU:
            break;
        case GameState.PLAY:
            playerBob();
            player.velocity = (0, vecAddVec)(player.velocity, (0, vecMulScalar)(player.direction, -PLAYER_ACCELERATION));
            break;
    }
}
function inputLeftLeft() {
    switch (gameState) {
        case GameState.MENU:
            break;
        case GameState.PLAY:
            playerBob();
            player.velocity = (0, vecAddVec)(player.velocity, (0, vecMulScalar)((0, vecNormalize)((0, vec3CrossProduct)(player.direction, [0, 1, 0])), PLAYER_ACCELERATION));
            break;
    }
}
function inputLeftRight() {
    switch (gameState) {
        case GameState.MENU:
            break;
        case GameState.PLAY:
            playerBob();
            player.velocity = (0, vecAddVec)(player.velocity, (0, vecMulScalar)((0, vecNormalize)((0, vec3CrossProduct)(player.direction, [0, 1, 0])), -PLAYER_ACCELERATION));
            break;
    }
}
function inputRightUp() {
    switch (gameState) {
        case GameState.MENU:
            incrementRes();
            break;
        case GameState.PLAY:
            if (startTime - player.lastBulletTime >= BULLET_COOLDOWN_THRESHOLD) {
                spawnBullet((0, vecAddVec)(player.position, [0, 2, 0]), player.direction);
                player.lastBulletTime = startTime;
            }
            break;
    }
}
function inputRightDown() {
    switch (gameState) {
        case GameState.MENU:
            decrementRes();
            break;
        case GameState.PLAY:
            player.yaw -= Math.PI;
            break;
    }
}
function inputRightLeft() {
    switch (gameState) {
        case GameState.MENU:
            decMapSetting();
            break;
        case GameState.PLAY:
            player.yaw += Math.PI / 30;
            break;
    }
}
function inputRightRight() {
    switch (gameState) {
        case GameState.MENU:
            incMapSetting();
            break;
        case GameState.PLAY:
            player.yaw -= Math.PI / 30;
            break;
    }
}
// -- Renderer --
function incrementRes() {
    playTune((0, soundSettingChange)());
    selectedResLevel += 1;
    if (selectedResLevel >= RES_LEVELS.length)
        selectedResLevel = RES_LEVELS.length - 1;
    recreateFramebuffer();
}
function decrementRes() {
    playTune((0, soundSettingChange)());
    selectedResLevel -= 1;
    if (selectedResLevel < 0)
        selectedResLevel = 0;
    recreateFramebuffer();
}
function recreateFramebuffer() {
    let res = RES_LEVELS[selectedResLevel];
    tileXCount = res[0];
    tileYCount = res[1];
    fb = (0, fbNew)(tileXCount, tileYCount);
}
function renderGame() {
    (0, fbClearColor)(fb, 2);
    (0, fbClearDepth)(fb, 1000);
    let cameraPosition = player.position;
    let cameraFront = (0, vecNormalize)(player.direction);
    let baseRenderPass = {
        cameraPosition,
        cameraFront,
        projection: {
            fov_rad: Math.PI / 2.0,
            near: 0.1,
            far: 100.0,
        },
        enableDepth: true,
        cullScalar: 1,
        modelMatrix: (0, mat4Identity)(),
        colors: "0",
        borderColor: "0",
        triangles: [],
    };
    for (let i in walls) {
        let wall = walls[i];
        let mv = (0, mat4Identity)();
        mv = (0, mat4Scale)(mv, wall.scale);
        mv = (0, mat4Translate)(mv, wall.position);
        baseRenderPass.modelMatrix = mv;
        baseRenderPass.colors = "1";
        baseRenderPass.borderColor = "0";
        baseRenderPass.triangles = (0, verticesCube)();
        (0, fbRender)(fb, baseRenderPass);
    }
    for (let i in enemies) {
        let enemy = enemies[i];
        let mv = (0, mat4Identity)();
        mv = (0, mat4Scale)(mv, [0.015, -0.015, 0.01]);
        mv = (0, mat4Rotate)(mv, startTime * 2 * enemy.color, [0, 1, 0]);
        mv = (0, mat4Translate)(mv, (0, vecSubVec)(enemy.position, [0, -2, 0]));
        baseRenderPass.modelMatrix = mv;
        baseRenderPass.colors = enemy.color;
        baseRenderPass.borderColor = enemy.color;
        baseRenderPass.triangles = (0, verticesBobPerson)();
        (0, fbRender)(fb, baseRenderPass);
    }
    for (let i in bullets) {
        let bullet = bullets[i];
        let mv = (0, mat4Identity)();
        mv = (0, mat4Translate)(mv, bullet.position);
        mv = (0, mat4Scale)(mv, [0.3, 0.3, 0.3]);
        baseRenderPass.modelMatrix = mv;
        baseRenderPass.colors = "6";
        baseRenderPass.borderColor = "6";
        baseRenderPass.triangles = (0, verticesCube)();
        (0, fbRender)(fb, baseRenderPass);
    }
    for (let i in explosions) {
        let explosion = explosions[i];
        let mv = (0, mat4Identity)();
        mv = (0, mat4Translate)(mv, explosion.position);
        mv = (0, mat4Scale)(mv, (0, vecMulScalar)([1, 1, 1], explosion.sizeScalar));
        baseRenderPass.modelMatrix = mv;
        baseRenderPass.colors = "9";
        baseRenderPass.borderColor = "9";
        baseRenderPass.triangles = (0, verticesCube)();
        (0, fbRender)(fb, baseRenderPass);
    }
    if (medkit) {
        let mv = (0, mat4Identity)();
        mv = (0, mat4Scale)(mv, [1.2, 0.3, 1.2]);
        mv = (0, mat4Rotate)(mv, startTime, [0, 1, 0]);
        mv = (0, mat4Translate)(mv, medkit.position);
        baseRenderPass.modelMatrix = mv;
        baseRenderPass.colors = "3";
        baseRenderPass.borderColor = "3";
        baseRenderPass.triangles = (0, verticesCube)();
        baseRenderPass.enableDepth = false;
        (0, fbRender)(fb, baseRenderPass);
    }
}
function renderMenu() {
    (0, fbClearColor)(fb, 0);
    let mv = (0, mat4Identity)();
    mv = (0, mat4Scale)(mv, [0.005, -0.008, 0.005]);
    mv = (0, mat4Rotate)(mv, startTime, [0, 1, 0]);
    mv = (0, mat4Translate)(mv, [1.5, 0.9, 0.8]);
    let renderPass = {
        cameraPosition: [0, 0, 0],
        cameraFront: [1, 0, 0],
        projection: {
            fov_rad: Math.PI / 2.0,
            near: 0.1,
            far: 100.0,
        },
        colors: "2",
        borderColor: "2",
        triangles: (0, verticesBobPerson)(),
        modelMatrix: mv,
        enableDepth: false,
        cullScalar: 1,
    };
    (0, fbRender)(fb, renderPass);
}
function renderGameText() {
    let healthColor;
    if (player.health < PLAYER_MAX_HEALTH / 2) {
        healthColor = "3";
    }
    else {
        healthColor = "D";
    }
    let stage = getStageNumber();
    let stageStr;
    if (stage == KILL_SCREEN_STAGE) {
        stageStr = "Kill Screen";
    }
    else {
        stageStr = `Stage: ${getStageNumber()}`;
    }
    let stageColor;
    if (stage == 0 || stage == 1) {
        stageColor = "D";
    }
    else if (stage == 2 || stage == 3) {
        stageColor = "3";
    }
    else {
        stageColor = "H";
    }
    clearText();
    addText(`Score: ${Math.floor(startTime)} ${stageStr}`, {
        x: 1,
        y: 0,
        color: stageColor,
    });
    addText(`Health: ${Math.floor(player.health)}/${PLAYER_MAX_HEALTH}`, {
        x: 2,
        y: 15,
        color: healthColor,
    });
    for (let i in medkitHealPopups) {
        let popup = medkitHealPopups[i];
        addText(`+${MEDKIT_HEAL_AMOUNT}`, {
            x: 8,
            y: 8 - Math.floor(popup.y),
            color: "4",
        });
    }
}
function renderMenuText() {
    clearText();
    addText("ROOM", {
        x: 3,
        y: 1,
        color: "2",
    });
    addText("i & k:", {
        x: 10,
        y: 2,
        color: "2",
    });
    addText("resolution", {
        x: 8,
        y: 3,
        color: "2",
    });
    addText("j & l:", {
        x: 10,
        y: 5,
        color: "2",
    });
    addText("map", {
        x: 11,
        y: 6,
        color: "2",
    });
    addText("W to Begin", {
        x: 8,
        y: 13,
        color: "2",
    });
    let res = RES_LEVELS[selectedResLevel];
    addText(`(${res[0]}:${res[1]})`, {
        x: 10,
        y: 9,
        color: "2",
    });
    let mapSetting = MAP_SETTINGS[selectedMapSetting];
    addText(`(${mapSetting.name})`, {
        x: 10,
        y: 10,
        color: "2",
    });
}
function initEngine() {
    setMap(`.`);
    // So that I don't get jumpscared by vite.
    setTimeout(() => {
        playTune((0, soundMenuMusic)(), Infinity);
    }, 1000);
    initInput();
    setInterval(() => {
        switch (gameState) {
            case GameState.MENU:
                tickMenu();
                renderMenu();
                break;
            case GameState.PLAY:
                tickGame();
                renderGame();
                break;
        }
        let legends = (0, fbGetRender)(fb, tileXCount, tileYCount);
        setLegend(...legends);
        setMap(fb.map);
        switch (gameState) {
            case GameState.MENU:
                renderMenuText();
                break;
            case GameState.PLAY:
                renderGameText();
                break;
        }
    }, 1000 / FPS);
}


initEngine();

//
// graphics.ts
//

"use strict";
// This is ROOM's software rasterizer.
// There are some things you should be aware of.
//
// 1:
// This works by rendering out to sprites called "tiles".
// These tiles are then laid out on the map.
// (The map is created ahead of time.)
//
// 2:
// Depth testing is backwards.
// Referencing ROOM's code, the depth is checked like so:
// `z != null && z < fb.fbDepth[idx]`
// This means that you should do this to clear the depth buffer:
// fbClearDepth(fb, 1000);
//
// 3:
// Depth values are not interpolated.
// This results in strange bugs but is good enough for ROOM.
//
// 4:
// Matrices are row major, NOT column major.
//
// 5.
// Angles are ALWAYS specified in radians.
//
// ---
//
// Have fun playing around with this :)
//
// -- Framebuffer Functions --
// We need a unique character to represent each tile.
function fbGetLegendIdent(tilesXCount, tileX, tileY) {
    return String.fromCharCode(tileX + tilesXCount * tileY + 48);
}
// Render into legends.
// From ROOM's code:
// ```
// let legends = fbGetRender(fb, tileXCount, tileYCount);
// setLegend(...legends);
// ```
function fbGetRender(fb, tilesXCount, tilesYCount) {
    let legends = [];
    for (let yi = 0; yi < tilesYCount; yi++) {
        for (let xi = 0; xi < tilesXCount; xi++) {
            let tileSprite = "\n";
            let offsetX = xi * 16;
            let offsetY = yi * 16;
            for (let y = 0; y < 16; y++) {
                for (let x = 0; x < 16; x++) {
                    let color = fbGetColor(fb, x + offsetX, y + offsetY);
                    tileSprite += color;
                }
                tileSprite += "\n";
            }
            let ident = fbGetLegendIdent(tilesXCount, xi, yi);
            legends.push([ident, tileSprite]);
        }
    }
    return legends;
}

function fbNew(tilesXCount, tilesYCount) {
    let width = tilesXCount * 16;
    let height = tilesYCount * 16;
    let fbColor = [];
    for (let i = 0; i < width * height; i++) {
        fbColor.push(0);
    }
    let fbDepth = [];
    for (let i = 0; i < width * height; i++) {
        fbColor.push(0);
    }
    let map = "\n";
    for (let yi = 0; yi < tilesYCount; yi++) {
        for (let xi = 0; xi < tilesXCount; xi++) {
            let ident = fbGetLegendIdent(tilesXCount, xi, yi);
            map += ident;
        }
        map += "\n";
    }
    return {
        width,
        height,
        map,
        fbColor,
        fbDepth,
    };
}

function fbPut(fb, x, y, z, color) {
    if (x < fb.width && x >= 0 && y < fb.height && y >= 0) {
        let idx = fb.width * Math.floor(y) + Math.floor(x);
        if (z != null && z < fb.fbDepth[idx]) {
            fb.fbDepth[idx] = z;
            fb.fbColor[idx] = color;
        }
        else if (z == null) {
            fb.fbColor[idx] = color;
        }
    }
}
function fbGetColor(fb, x, y) {
    return fb.fbColor[y * fb.width + x];
}
function fbClearColor(fb, color) {
    for (let y = 0; y < fb.height; y++) {
        for (let x = 0; x < fb.width; x++) {
            fb.fbColor[y * fb.width + x] = color;
        }
    }
}

// Read my note about depth at the top of the file.
function fbClearDepth(fb, depth) {
    for (let y = 0; y < fb.height; y++) {
        for (let x = 0; x < fb.width; x++) {
            fb.fbDepth[y * fb.width + x] = depth;
        }
    }
}

function fbRender(fb, pass) {
    for (let i = 0; i < pass.triangles.length; i += 9) {
        let vertexA = [
            pass.triangles[i + 0 + 0],
            pass.triangles[i + 1 + 0],
            pass.triangles[i + 2 + 0],
        ];
        let vertexB = [
            pass.triangles[i + 0 + 3],
            pass.triangles[i + 1 + 3],
            pass.triangles[i + 2 + 3],
        ];
        let vertexC = [
            pass.triangles[i + 0 + 6],
            pass.triangles[i + 1 + 6],
            pass.triangles[i + 2 + 6],
        ];
        // Local Space => World Space
        let worldVertexA = vec4IntoVec3(mat4MulVec4(pass.modelMatrix, [...vertexA, 1]));
        let worldVertexB = vec4IntoVec3(mat4MulVec4(pass.modelMatrix, [...vertexB, 1]));
        let worldVertexC = vec4IntoVec3(mat4MulVec4(pass.modelMatrix, [...vertexC, 1]));
        let normal = vecNormalize(vec3CrossProduct(vecSubVec(worldVertexB, worldVertexA), vecSubVec(worldVertexC, worldVertexA)));
        // Cull out faces that are away from the camera.
        let cullScalar = pass.cullScalar != null ? pass.cullScalar : 1;
        if (vecDot(normal, vecSubVec(worldVertexA, pass.cameraPosition)) *
            cullScalar <
            0) {
            let view = mat4GetLookAt(pass.cameraPosition, vecAddVec(pass.cameraPosition, pass.cameraFront), [0, 1, 0]);
            // World Space => View Space
            let viewVertexA = vec4IntoVec3(mat4MulVec4(view, [...worldVertexA, 1]));
            let viewVertexB = vec4IntoVec3(mat4MulVec4(view, [...worldVertexB, 1]));
            let viewVertexC = vec4IntoVec3(mat4MulVec4(view, [...worldVertexC, 1]));
            // Depth clipping: remove triangles behind the camera.
            let clippedTriangles;
            if (pass.projection != null) {
                clippedTriangles = triangleClipPlane([0, 0, pass.projection.near], [0, 0, 1], [viewVertexA, viewVertexB, viewVertexC]);
            }
            else {
                clippedTriangles = [[viewVertexA, viewVertexB, viewVertexC]];
            }
            for (let cti in clippedTriangles) {
                let triangle = clippedTriangles[cti];
                if (pass.projection != null) {
                    let projectionData = pass.projection;
                    let projection = mat4GetProjection(1.0, projectionData.fov_rad, projectionData.near, projectionData.far);
                    // View Space => Clip Space
                    let projectedVertexA = mat4MulVec4(projection, [...triangle[0], 1]);
                    let projectedVertexB = mat4MulVec4(projection, [...triangle[1], 1]);
                    let projectedVertexC = mat4MulVec4(projection, [...triangle[2], 1]);
                    vertexA = vec4IntoVec3(vec4ScaleWithW(projectedVertexA));
                    vertexB = vec4IntoVec3(vec4ScaleWithW(projectedVertexB));
                    vertexC = vec4IntoVec3(vec4ScaleWithW(projectedVertexC));
                }
                // Clip Space => Screen Space
                vertexA = vecAddScalar(vertexA, 1.0);
                vertexB = vecAddScalar(vertexB, 1.0);
                vertexC = vecAddScalar(vertexC, 1.0);
                vertexA[0] *= fb.width * 0.5;
                vertexB[0] *= fb.width * 0.5;
                vertexC[0] *= fb.width * 0.5;
                vertexA[1] *= fb.height * 0.5;
                vertexB[1] *= fb.height * 0.5;
                vertexC[1] *= fb.height * 0.5;
                vertexA[2] *= fb.width * 0.5;
                vertexB[2] *= fb.width * 0.5;
                vertexC[2] *= fb.width * 0.5;
                // Clip out vertices outside the view frustum.
                // New triangles may be formed here.
                let finalTriangles = [];
                finalTriangles.push([vertexA, vertexB, vertexC]);
                let testPlanes = [
                    [
                        [0, 0, 0],
                        [0, 1, 0],
                    ],
                    [
                        [0, fb.height - 1, 0],
                        [0, -1, 0],
                    ],
                    [
                        [0, 0, 0],
                        [1, 0, 0],
                    ],
                    [
                        [fb.width - 1, 0, 0],
                        [-1, 0, 0],
                    ],
                ];
                for (let p in testPlanes) {
                    let nextTests = [];
                    for (let t in finalTriangles) {
                        nextTests.push(...triangleClipPlane(testPlanes[p][0], testPlanes[p][1], finalTriangles[t]));
                    }
                    finalTriangles = nextTests;
                }
                // Draw the triangles left.
                for (let t in finalTriangles) {
                    let finalTriangle = finalTriangles[t];
                    let vertexA = finalTriangle[0];
                    let vertexB = finalTriangle[1];
                    let vertexC = finalTriangle[2];
                    if (pass.borderColor != null) {
                        fbDrawTriangle(fb, vertexA, vertexB, vertexC, pass.borderColor, pass.enableDepth);
                    }
                    if (pass.colors != null) {
                        let color;
                        if (typeof pass.colors != "string" &&
                            typeof pass.colors != "number") {
                            color = pass.colors[Math.floor(i / 9)];
                        }
                        else {
                            color = pass.colors;
                        }
                        color != null &&
                            fbFillTriangle(fb, vertexA, vertexB, vertexC, color, pass.enableDepth);
                    }
                }
            }
        }
    }
}

function fbDrawTriangle(fb, a, b, c, borderColor, enableDepth) {
    fbDrawLine(fb, a, b, borderColor, enableDepth);
    fbDrawLine(fb, b, c, borderColor, enableDepth);
    fbDrawLine(fb, a, c, borderColor, enableDepth);
}
function interpolate(i0, d0, i1, d1) {
    if (i0 == i1) {
        return [d0];
    }
    var values = [];
    var a = (d1 - d0) / (i1 - i0);
    var d = d0;
    for (var i = i0; i <= i1; i++) {
        values.push(d);
        d += a;
    }
    return values;
}
function fbDrawLine(fb, a, b, color, enableDepth) {
    var dx = b[0] - a[0];
    var dy = b[1] - a[1];
    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) {
            var swap = a;
            a = b;
            b = swap;
        }
        var ys = interpolate(a[0], a[1], b[0], b[1]);
        for (var x = a[0]; x <= b[0]; x += 1) {
            // Crude estimation of depth.
            fbPut(fb, x, ys[Math.floor(x - a[0])], enableDepth ? a[2] : null, color);
        }
    }
    else {
        if (dy < 0) {
            var swap = a;
            a = b;
            b = swap;
        }
        var xs = interpolate(a[1], a[0], b[1], b[0]);
        for (var y = a[1]; y <= b[1]; y += 1) {
            // Crude estimation of depth.
            fbPut(fb, xs[Math.floor(y - a[1])], y, enableDepth ? a[2] : null, color);
        }
    }
}

function fbFillTriangle(fb, a, b, c, color, enableDepth) {
    if (b[1] < a[1]) {
        var swap = a;
        a = b;
        b = swap;
    }
    if (c[1] < a[1]) {
        var swap = a;
        a = c;
        c = swap;
    }
    if (c[1] < b[1]) {
        var swap = b;
        b = c;
        c = swap;
    }
    var x01 = interpolate(a[1], a[0], b[1], b[0]);
    var x12 = interpolate(b[1], b[0], c[1], c[0]);
    var x02 = interpolate(a[1], a[0], c[1], c[0]);
    x01.pop();
    x12.pop();
    x02.pop();
    var x012 = x01.concat(x12);
    var x_left, x_right;
    var m = Math.floor(x02.length / 2);
    if (x02[m] < x012[m]) {
        x_left = x02;
        x_right = x012;
    }
    else {
        x_left = x012;
        x_right = x02;
    }
    for (var y = a[1]; y <= c[1]; y += 1) {
        for (var x = x_left[Math.floor(y - a[1])]; x <= x_right[Math.floor(y - a[1])]; x += 1) {
            // Crude estimation of depth.
            fbPut(fb, x, y, enableDepth ? a[2] : null, color);
        }
    }
}
// -- Matrix 4 Functions --
function mat4Identity() {
    return [
        [1.0, 0.0, 0.0, 0.0],
        [0.0, 1.0, 0.0, 0.0],
        [0.0, 0.0, 1.0, 0.0],
        [0.0, 0.0, 0.0, 1.0],
    ];
}

function mat4Translate(mat, translation) {
    let result = Array.from(mat);
    result[3][0] += translation[0];
    result[3][1] += translation[1];
    result[3][2] += translation[2];
    return result;
}

function mat4Scale(mat, scale) {
    let result = Array.from(mat);
    result[0][0] *= scale[0];
    result[1][1] *= scale[1];
    result[2][2] *= scale[2];
    return result;
}

function mat4Rotate(mat, angle, rot) {
    let c = Math.cos(angle);
    let s = Math.sin(angle);
    let axis = vecNormalize(rot);
    let rot_mat = [
        [
            c + axis[0] * axis[0] * (1 - c),
            axis[0] * axis[1] * (1 - c) - axis[2] * s,
            axis[0] * axis[2] * (1 - c) + axis[1] * s,
            0.0,
        ],
        [
            axis[1] * axis[0] * (1 - c) + axis[2] * s,
            c + axis[1] * axis[1] * (1 - c),
            axis[1] * axis[2] * (1 - c) - axis[0] * s,
            0.0,
        ],
        [
            axis[2] * axis[0] * (1 - c) - axis[1] * s,
            axis[2] * axis[1] * (1 - c) + axis[0] * s,
            c + axis[2] * axis[2] * (1 - c),
            0.0,
        ],
        [0.0, 0.0, 0.0, 1.0],
    ];
    return mat4MulMat4(mat, rot_mat);
}

function mat4GetProjection(aspect, fov_rad, near, far) {
    return [
        [aspect / Math.tan(fov_rad / 2), 0.0, 0.0, 0.0],
        [0.0, 1 / Math.tan(fov_rad / 2), 0.0, 0.0],
        [0.0, 0.0, far / (far - near), 1.0],
        [0.0, 0.0, (-far * near) / (far - near), 0.0],
    ];
}
function mat4GetLookAt(position, center, up) {
    let dir = vecSubVec(center, position);
    let right = vecNormalize(vec3CrossProduct(up, dir));
    let matUp = vec3CrossProduct(dir, right);
    return [
        [right[0], matUp[0], dir[0], 0],
        [right[1], matUp[1], dir[1], 0],
        [right[2], matUp[2], dir[2], 0],
        [
            -vecDot(position, right),
            -vecDot(position, matUp),
            -vecDot(position, dir),
            1,
        ],
    ];
}
function mat4MulMat4(b, a) {
    let result = mat4Identity();
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            result[r][c] =
                b[r][0] * a[0][c] +
                    b[r][1] * a[1][c] +
                    b[r][2] * a[2][c] +
                    b[r][3] * a[3][c];
        }
    }
    return result;
}

function mat4MulVec4(mat, vec) {
    let result = [0, 0, 0, 0];
    result[0] =
        vec[0] * mat[0][0] +
            vec[1] * mat[1][0] +
            vec[2] * mat[2][0] +
            vec[3] * mat[3][0];
    result[1] =
        vec[0] * mat[0][1] +
            vec[1] * mat[1][1] +
            vec[2] * mat[2][1] +
            vec[3] * mat[3][1];
    result[2] =
        vec[0] * mat[0][2] +
            vec[1] * mat[1][2] +
            vec[2] * mat[2][2] +
            vec[3] * mat[3][2];
    result[3] =
        vec[0] * mat[0][3] +
            vec[1] * mat[1][3] +
            vec[2] * mat[2][3] +
            vec[3] * mat[3][3];
    return result;
}

// -- Vector 4 Functions --
function vec4ScaleWithW(vec) {
    let result = Array.from(vec);
    if (result[3] != 0) {
        result[0] /= result[3];
        result[1] /= result[3];
        result[2] /= result[3];
    }
    return result;
}
function vec4IntoVec3(vec) {
    return [vec[0], vec[1], vec[2]];
}
// -- Vector 3 Functions --
function vec3CrossProduct(a, b) {
    let result = [0.0, 0.0, 0.0];
    result[0] = a[1] * b[2] - a[2] * b[1];
    result[1] = a[2] * b[0] - a[0] * b[2];
    result[2] = a[0] * b[1] - a[1] * b[0];
    return result;
}

// -- General Vector Functions --
function vecAddVec(a, b) {
    let result = Array.from(a);
    for (let i = 0; i < a.length; i++) {
        result[i] += b[i];
    }
    return result;
}

function vecSubVec(a, b) {
    let result = Array.from(a);
    for (let i = 0; i < a.length; i++) {
        result[i] -= b[i];
    }
    return result;
}

function vecDistance(a, b) {
    return vecLength(vecSubVec(b, a));
}

function vecAddScalar(v, s) {
    let result = Array.from(v);
    for (let i = 0; i < v.length; i++) {
        result[i] += s;
    }
    return result;
}
function vecMulScalar(a, b) {
    let result = Array.from(a);
    for (let i = 0; i < a.length; i++) {
        result[i] *= b;
    }
    return result;
}

function vecNormalize(v) {
    let length = vecLength(v);
    if (length == 0) {
        length += 0.00001;
    }
    return vecMulScalar(v, 1 / length);
}

function vecDot(a, b) {
    let result = 0;
    for (let i = 0; i < a.length; i++) {
        result += a[i] * b[i];
    }
    return result;
}

function vecLength(v) {
    let sqsum = 0;
    for (let i = 0; i < v.length; i++) {
        sqsum += v[i] * v[i];
    }
    return Math.sqrt(sqsum);
}

// -- Clipping --
function vecIntersectsPlane(planePoint, planeNormal, lineStart, lineEnd) {
    let d = -vecDot(planeNormal, planePoint);
    let ad = vecDot(lineStart, planeNormal);
    let bd = vecDot(lineEnd, planeNormal);
    let td = bd - ad;
    if (td == 0) {
        td += 0.00001;
    }
    let t = (-d - ad) / td;
    let lineStartToEnd = vecSubVec(lineEnd, lineStart);
    let lineToIntersect = vecMulScalar(lineStartToEnd, t);
    return vecAddVec(lineStart, lineToIntersect);
}

function triangleClipPlane(planePoint, planeNormal, triangle) {
    let dist = (point) => {
        return vecDot(planeNormal, point) - vecDot(planeNormal, planePoint);
    };
    let insidePoints = [];
    let outsidePoints = [];
    let d0 = dist(triangle[0]);
    let d1 = dist(triangle[1]);
    let d2 = dist(triangle[2]);
    if (d0 >= 0) {
        insidePoints.push(triangle[0]);
    }
    else {
        outsidePoints.push(triangle[0]);
    }
    if (d1 >= 0) {
        insidePoints.push(triangle[1]);
    }
    else {
        outsidePoints.push(triangle[1]);
    }
    if (d2 >= 0) {
        insidePoints.push(triangle[2]);
    }
    else {
        outsidePoints.push(triangle[2]);
    }
    if (insidePoints.length == 3) {
        return [triangle];
    }
    if (insidePoints.length == 1 && outsidePoints.length == 2) {
        return [
            [
                insidePoints[0],
                vecIntersectsPlane(planePoint, planeNormal, insidePoints[0], outsidePoints[0]),
                vecIntersectsPlane(planePoint, planeNormal, insidePoints[0], outsidePoints[1]),
            ],
        ];
    }
    if (insidePoints.length == 2 && outsidePoints.length == 1) {
        let ot = vecIntersectsPlane(planePoint, planeNormal, insidePoints[0], outsidePoints[0]);
        return [
            [insidePoints[0], insidePoints[1], ot],
            [
                insidePoints[1],
                ot,
                vecIntersectsPlane(planePoint, planeNormal, insidePoints[1], outsidePoints[0]),
            ],
        ];
    }
    return [];
}

const deathMap = map`
ommnn
mnmom
nmonn
omnmo`;

const level = Math.floor(Math.random()*mainMaps.length);

setMap(backgrounds[level]);
addMap(mainMaps[level]);

px = getAll(player[0]).concat(getAll(player[1])).concat(getAll(player[2])).concat(getAll(player[3]))[0].x;
py = getAll(player[0]).concat(getAll(player[1])).concat(getAll(player[2])).concat(getAll(player[3]))[0].y;

mapNat = getMapV2();
setMapV2(trimMapV2(px - 5, py - 4, 10, 8, mapNat));

setSolids(wall.concat(player).concat(enemy));

addText(ammo > 0 ? "Ammo: " + ammo : "RELOAD", {x: 0, color: color`7`});

onInput("w", () => {
  dir = 0;
});

onInput("a", () => {
  dir = 3;
});

onInput("s", () => {
  dir = 2;
});

onInput("d", () => {
  dir = 1;
});

onInput("k", () => {
  moveTurn = false;
  shoot = true;
});

onInput("l", () => {
  ammo = 10;
  reloadFrame = frames;
  moveTurn = false;
});

onInput("i", () => {
  moveTurn = false;
});

onInput("j", () => {
  moveTurn = false;
});

let interval = setInterval(() => {
  let enemies = getAll(enemy[0]).concat(getAll(enemy[1])).concat(getAll(enemy[2])).concat(getAll(enemy[3]));
  let players = getAll(player[0]).concat(getAll(player[1])).concat(getAll(player[2])).concat(getAll(player[3]));
  //die
  for (var i = 0; i < players.length; i++) {
    for (var j = 0; j < enemies.length; j++) {      
      if (Math.abs(players[i].x - enemies[j].x) + Math.abs(players[i].y - enemies[j].y) === 1) {
        clearInterval(interval);
        dead = true;
        clearText();
        addText("You died.", {
          color: color`3`
        });
        setMap(deathMap);
      }
    }
  }
  if(!dead){
    frames++;
    setMapV2(mapNat);
    //bullets
    let bullets = getAll(bullet[0]).concat(getAll(bullet[1])).concat(getAll(bullet[2])).concat(getAll(bullet[3]));
    for (var i = 0; i < bullets.length; i++) {
      if (bullet.indexOf(bullets[i].type) === 0) {
        let prevy = bullets[i].y;
        bullets[i].y--;
        if (bullets[i].y === prevy) {
          bullets[i].remove();
        }
      } else if (bullet.indexOf(bullets[i].type) === 1) {
        let prevx = bullets[i].x;
        bullets[i].x++;
        if (bullets[i].x === prevx) {
          bullets[i].remove();
        }
      } else if (bullet.indexOf(bullets[i].type) === 2) {
        let prevy = bullets[i].y;
        bullets[i].y++;
        if (bullets[i].y === prevy) {
          bullets[i].remove();
        }
      } else if (bullet.indexOf(bullets[i].type) === 3) {
        let prevx = bullets[i].x;
        bullets[i].x--;
        if (bullets[i].x === prevx) {
          bullets[i].remove();
        }
      }
      let bulletTile = getTile(bullets[i].x, bullets[i].y);
      for (var j = 0; j < bulletTile.length; j++) {
        if (enemy.includes(bulletTile[j].type)) {
          bullets[i].remove();
          bulletTile[j].remove();
          score++;
        } else if (wall.includes(bulletTile[j].type)) {
          if (!bullets[i]) break;
          bullets[i].remove();
        }
      }
    }
    //enemies
    enemies = getAll(enemy[0]).concat(getAll(enemy[1])).concat(getAll(enemy[2])).concat(getAll(enemy[3]));
    players = getAll(player[0]).concat(getAll(player[1])).concat(getAll(player[2])).concat(getAll(player[3]));
    if (frames % 4 === 0) {
      for (var i = 0; i < enemies.length; i++) {
        if (enemy.indexOf(enemies[i].type) === 0) {
          enemies[i].y--;
        } else if (enemy.indexOf(enemies[i].type) === 1) {
          enemies[i].x++;
        } else if (enemy.indexOf(enemies[i].type) === 2) {
          enemies[i].y++;
        } else if (enemy.indexOf(enemies[i].type) === 3) {
          enemies[i].x--;
        }
        if (players[0].y < enemies[i].y) {
          enemies[i].type = enemy[0];
        } else if (players[0].x > enemies[i].x) {
          enemies[i].type = enemy[1];
        } else if (players[0].y > enemies[i].y) {
          enemies[i].type = enemy[2];
        } else if (players[0].x < enemies[i].x) {
          enemies[i].type = enemy[3];
        }
      }
    }
    if (frames % 10 === 0) {
      let grasses = getAll(grass[0]).concat(getAll(grass[1])).concat(getAll(grass[2]));
      let spawn = grasses[Math.round(Math.random() * grasses.length - 1)];
      addSprite(spawn.x, spawn.y, enemy[0]);
    }
    mapNat = getMapV2();
    setMapV2(trimMapV2(px - 5, py - 4, 10, 8, mapNat));
    addText(ammo > 0 ? reloadFrame < frames-8 ? "Ammo: " + ammo : "RELOADING" : "RELOAD", {x: 0, color: color`7`});
    addText("Score: " + score, {x: 0, y: Math.round(height()*1.9), color: color`7`});
  }
}, 250);

afterInput(() => {
  if(!dead){
    clearText();
    addText(ammo > 0 ? reloadFrame < frames-8 ? "Ammo: " + ammo : "RELOADING" : "RELOAD", {x: 0, color: color`7`});
    addText("Score: " + score, {x: 0, y: Math.round(height()*1.9), color: color`7`});
    setMapV2(mapNat);
    let players = getAll(player[0]).concat(getAll(player[1])).concat(getAll(player[2])).concat(getAll(player[3]));
    if (moveTurn) {
      for (var i = 0; i < players.length; i++) {
        if (dir === 0) {
          players[i].y--;
        } else if (dir === 1) {
          players[i].x++;
        } else if (dir === 2) {
          players[i].y++;
        } else if (dir === 3) {
          players[i].x--;
        }
        players[i].type = player[dir];
      }
    }
    if (shoot && ammo > 0 && reloadFrame < frames-8) {
      for (var i = 0; i < players.length; i++) {
        addSprite(players[i].x, players[i].y, bullet[dir]);
        ammo--;
      }
    }
    px = players[0].x;
    py = players[0].y;
    mapNat = getMapV2();
    setMapV2(trimMapV2(px - 5, py - 4, 10, 8, mapNat));
    moveTurn = true;
    shoot = false;
  }
});
