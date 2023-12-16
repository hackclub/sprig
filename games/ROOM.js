//
//   ____    _____   _____
// /\  _`\ /\  __`\/\  __`\  /'\_/`\
// \ \ \L\ \ \ \/\ \ \ \/\ \/\      \
//  \ \ ,  /\ \ \ \ \ \ \ \ \ \ \__\ \
//   \ \ \\ \\ \ \_\ \ \ \_\ \ \ \_/\ \
//    \ \_\ \_\ \_____\ \_____\ \_\\ \_\
//     \/_/\/ /\/_____/\/_____/\/_/ \/_/
//
// This is ROOM, a DOOM inspired 3D [pew pew]-er, built for the sprig.
//
// /   w   [oooo]   i   \
// \ a s d [oooo] j k l /
//
// w = Forward      i = Pew Pew
// s = Go Left      j = Look Left
// d = Go Right     l = Look Right
// a = Backward     k = Look Behind
//
// Trapped in a claustrophobic room, you must survive for as long as possible.
// Your health slowly drains, so you must run around and collect medkits.
// Be sure to avoid the spin-y people.
// They are not your friend.
//
// Hey, why does this code look weird?
// Well, ROOM was written in typescript and compiled into javascript.
// The original source is at https://github.com/davnotdev/Room.
//
// Want to edit the game?
// Go ahead! 
// Game logic is in the game.ts section.
// You can create your own models in the models.ts section.
// Sounds are at the very bottom.
// Also, don't touch graphics.ts unless if you really know what you're doing.
// More information will be on the Github!
//

//
// game.ts
//

// -- Framebuffer Globals --
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

//
// model.ts
//

"use strict";

function verticesCube() {
    return [
        -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0,
        -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, 1.0, -1.0,
        -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0,
        -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0,
        -1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,
        1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0,
        1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, 1.0, -1.0,
        1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, -1.0, 1.0,
    ];
}

function verticesBobPerson() {
    return [
        -3.003639, 181.55959, 14.82626, -0.09376, 183.3437, 18.49699, -2.151869,
        185.70786, 15.229183, -0.09376, 173.49391, 15.120314, -3.003639, 181.55959,
        14.82626, -5.608439, 173.86244, 12.336845, -0.09376, 183.3437, 18.49699,
        -0.09376, 188.77335, 15.775118, -2.151869, 185.70786, 15.229183, -3.003639,
        181.55959, 14.82626, -7.781168, 187.34822, 13.10606, -6.681612, 181.6082,
        12.778654, -7.698488, 174.74835, 2.385685, -6.705513, 173.45268, 7.865694,
        -10.422307, 181.78899, 1.891512, -6.650137, 176.50154, -3.482457,
        -10.422307, 181.78899, 1.891512, -11.147788, 184.13615, -1.08761, -7.045439,
        184.48523, -7.060825, -11.007938, 190.28868, -1.547568, -7.634086,
        191.09583, -7.741708, -10.317651, 188.73183, 1.811197, -9.459242, 187.808,
        8.350927, -10.201733, 195.31082, 3.62348, -11.007938, 190.28868, -1.547568,
        -6.990853, 198.81671, -5.037816, -7.634086, 191.09583, -7.741708, -9.459242,
        187.808, 8.350927, -10.422307, 181.78899, 1.891512, -9.260859, 181.68558,
        8.14398, -6.650137, 176.50154, -3.482457, -7.045439, 184.48523, -7.060825,
        -0.09376, 176.80714, -6.911478, -10.201733, 195.31082, 3.62348, -6.918818,
        198.11917, 11.531952, -7.817504, 200.31906, 3.375647, -7.632315, 189.39076,
        14.936037, -9.459242, 187.808, 8.350927, -7.781168, 187.34822, 13.10606,
        -5.608439, 173.86244, 12.336845, -6.681612, 181.6082, 12.778654, -9.260859,
        181.68558, 8.14398, -6.705513, 173.45268, 7.865694, -5.608439, 173.86244,
        12.336845, -9.260859, 181.68558, 8.14398, -0.09376, 183.13756, -9.90349,
        -7.634086, 191.09583, -7.741708, -0.09376, 191.65102, -10.6928, -0.09376,
        191.65102, -10.6928, -6.990853, 198.81671, -5.037816, -0.09376, 200.07652,
        -5.964356, -0.09376, 200.07652, -5.964356, -7.817504, 200.31906, 3.375647,
        -0.09376, 202.2252, 4.30405, -0.09376, 202.2252, 4.30405, -6.918818,
        198.11917, 11.531952, -0.09376, 199.2527, 13.548878, -0.09376, 199.2527,
        13.548878, -7.632315, 189.39076, 14.936037, -0.09376, 188.77335, 15.775118,
        -11.147788, 184.13615, -1.08761, -7.045439, 184.48523, -7.060825, -6.650137,
        176.50154, -3.482457, -10.317651, 188.73183, 1.811197, -11.146482,
        191.03552, -0.179888, -12.679113, 189.41019, -2.269108, -10.317651,
        188.73183, 1.811197, -11.007938, 190.28868, -1.547568, -11.146482,
        191.03552, -0.179888, -11.146482, 191.03552, -0.179888, -11.007938,
        190.28868, -1.547568, -12.679113, 189.41019, -2.269108, -11.147788,
        184.13615, -1.08761, -12.679113, 189.41019, -2.269108, -11.007938,
        190.28868, -1.547568, -10.422307, 181.78899, 1.891512, -11.808664, 183.8664,
        -1.505643, -11.147788, 184.13615, -1.08761, -0.09376, 180.7657, 15.697264,
        -0.09376, 183.3437, 18.49699, -3.003639, 181.55959, 14.82626, -5.608439,
        173.86244, 12.336845, -0.09376, 171.7362, 9.812624, -0.09376, 173.49391,
        15.120314, -2.151869, 185.70786, 15.229183, -7.781168, 187.34822, 13.10606,
        -3.003639, 181.55959, 14.82626, -7.781168, 187.34822, 13.10606, -0.09376,
        188.77335, 15.775118, -7.632315, 189.39076, 14.936037, -2.151869, 185.70786,
        15.229183, -0.09376, 188.77335, 15.775118, -7.781168, 187.34822, 13.10606,
        -0.09376, 173.49391, 15.120314, -0.09376, 180.7657, 15.697264, -3.003639,
        181.55959, 14.82626, -6.650137, 176.50154, -3.482457, -7.698488, 174.74835,
        2.385685, -10.422307, 181.78899, 1.891512, -7.045439, 184.48523, -7.060825,
        -11.147788, 184.13615, -1.08761, -11.007938, 190.28868, -1.547568,
        -11.007938, 190.28868, -1.547568, -10.317651, 188.73183, 1.811197,
        -10.201733, 195.31082, 3.62348, -9.459242, 187.808, 8.350927, -10.317651,
        188.73183, 1.811197, -10.422307, 181.78899, 1.891512, -6.990853, 198.81671,
        -5.037816, -11.007938, 190.28868, -1.547568, -10.201733, 195.31082, 3.62348,
        -9.459242, 187.808, 8.350927, -7.632315, 189.39076, 14.936037, -10.201733,
        195.31082, 3.62348, -0.09376, 176.80714, -6.911478, -7.045439, 184.48523,
        -7.060825, -0.09376, 183.13756, -9.90349, -0.09376, 183.13756, -9.90349,
        -7.045439, 184.48523, -7.060825, -7.634086, 191.09583, -7.741708, -0.09376,
        191.65102, -10.6928, -7.634086, 191.09583, -7.741708, -6.990853, 198.81671,
        -5.037816, -0.09376, 200.07652, -5.964356, -6.990853, 198.81671, -5.037816,
        -7.817504, 200.31906, 3.375647, -0.09376, 202.2252, 4.30405, -7.817504,
        200.31906, 3.375647, -6.918818, 198.11917, 11.531952, -0.09376, 199.2527,
        13.548878, -6.918818, 198.11917, 11.531952, -7.632315, 189.39076, 14.936037,
        -12.679113, 189.41019, -2.269108, -11.808664, 183.8664, -1.505643,
        -10.317651, 188.73183, 1.811197, -11.808664, 183.8664, -1.505643,
        -10.422307, 181.78899, 1.891512, -10.317651, 188.73183, 1.811197,
        -11.147788, 184.13615, -1.08761, -11.808664, 183.8664, -1.505643,
        -12.679113, 189.41019, -2.269108, -5.608439, 173.86244, 12.336845,
        -6.705513, 173.45268, 7.865694, -0.09376, 171.7362, 9.812624, -6.990853,
        198.81671, -5.037816, -10.201733, 195.31082, 3.62348, -7.817504, 200.31906,
        3.375647, -10.201733, 195.31082, 3.62348, -7.632315, 189.39076, 14.936037,
        -6.918818, 198.11917, 11.531952, -6.705513, 173.45268, 7.865694, -0.09376,
        166.95822, 9.955076, -0.09376, 171.7362, 9.812624, -6.650137, 176.50154,
        -3.482457, -0.09376, 171.74997, -7.982829, -8.365941, 171.5989, -5.172494,
        -6.705513, 173.45268, 7.865694, -10.024375, 170.07367, 2.029528, -7.395879,
        167.89127, 7.94491, -7.698488, 174.74835, 2.385685, -8.365941, 171.5989,
        -5.172494, -10.024375, 170.07367, 2.029528, -7.395879, 167.89127, 7.94491,
        -0.09376, 160.32742, 13.698597, -0.09376, 166.95822, 9.955076, -14.065025,
        164.31694, 7.906994, -10.024375, 170.07367, 2.029528, -15.612803, 166.97174,
        0.344693, -18.714283, 158.59456, -11.616861, -21.79404, 149.73053,
        -11.179743, -27.860195, 154.29488, -7.663479, -13.916588, 136.7114,
        11.435217, -0.09376, 120.69466, 14.081373, -0.09376, 139.59744, 13.433695,
        -15.166553, 120.92279, 12.049509, -20.356783, 132.6048, 0.303063,
        -19.982998, 121.27292, 0.309567, -20.356783, 132.6048, 0.303063, -19.56999,
        145.86487, 10.750969, -25.55555, 148.82236, 0.315778, -15.166553, 120.92279,
        12.049509, -20.86922, 109.22975, 0.325292, -17.263863, 105.438774, 9.754482,
        -0.09376, 120.69466, 14.081373, -17.263863, 105.438774, 9.754482, -0.09376,
        102.23226, 12.219009, -0.09376, 102.23226, 12.219009, -6.829031, 95.0891,
        9.730982, -0.09376, 96.421036, 10.384417, -7.248255, 90.829704, 10.812244,
        -16.690434, 69.84307, 10.148636, -9.200029, 69.84324, 10.151785, -9.200029,
        69.84324, 10.151785, -16.129133, 64.0992, 8.971176, -9.687086, 64.09151,
        8.967402, -18.543995, 91.737785, 10.808916, -20.685503, 69.85565, 0.220555,
        -16.690434, 69.84307, 10.148636, -22.929823, 93.78615, 0.195134, -17.263863,
        105.438774, 9.754482, -20.86922, 109.22975, 0.325292, -7.248255, 90.829704,
        10.812244, -5.014924, 69.84093, 0.216538, -3.011169, 92.80522, 0.252903,
        -6.829031, 95.0891, 9.730982, -3.011169, 92.80522, 0.252903, -0.09376,
        94.0281, 0.299632, -5.014924, 69.84093, 0.216538, -9.687086, 64.09151,
        8.967402, -6.143153, 64.05022, 0.160611, -16.129133, 64.0992, 8.971176,
        -20.685503, 69.85565, 0.220555, -20.182674, 64.06278, 0.16067, -16.129133,
        64.0992, 8.971176, -9.565851, 55.89525, 11.251183, -9.687086, 64.09151,
        8.967402, -16.82056, 55.90477, 11.243004, -9.436416, 44.59767, 8.078434,
        -9.565851, 55.89525, 11.251183, -9.687086, 64.09151, 8.967402, -6.143897,
        55.929947, -0.02751, -6.143153, 64.05022, 0.160611, -6.143897, 55.929947,
        -0.02751, -9.436416, 44.59767, 8.078434, -4.470686, 44.66829, -2.080527,
        -17.044073, 44.600082, 8.06889, -19.71799, 55.92906, -0.028131, -21.25618,
        44.667236, -2.079227, -19.71799, 55.92906, -0.028131, -16.129133, 64.0992,
        8.971176, -20.182674, 64.06278, 0.16067, -9.436416, 44.59767, 8.078434,
        -6.713756, 14.201065, -1.76, -4.470686, 44.66829, -2.080527, -17.044073,
        44.600082, 8.06889, -10.336361, 14.31868, 8.949894, -9.436416, 44.59767,
        8.078434, -21.25618, 44.667236, -2.079227, -15.903207, 14.336258, 8.946716,
        -17.044073, 44.600082, 8.06889, -15.903207, 14.336258, 8.946716, -17.540668,
        12.685638, -2.006492, -15.265563, 12.997787, 6.992805, -10.336361, 14.31868,
        8.949894, -8.489206, 12.628387, -2.009067, -6.713756, 14.201065, -1.76,
        -15.903207, 14.336258, 8.946716, -11.165036, 12.97049, 7.006327, -10.336361,
        14.31868, 8.949894, -9.436704, 3.479156, 24.856838, -6.374583, 0.135803,
        8.113768, -6.207625, 3.259644, 8.108295, -8.489206, 12.628387, -2.009067,
        -11.165036, 12.97049, 7.006327, -8.459431, 9.111618, 5.260471, -15.265563,
        12.997787, 6.992805, -10.962499, 9.339417, 10.853382, -11.165036, 12.97049,
        7.006327, -15.265563, 12.997787, 6.992805, -17.540668, 12.685638, -2.006492,
        -18.389282, 9.164932, 5.284815, -18.143896, 3.477707, 24.429726, -14.23395,
        0.201767, 26.635769, -13.733412, 3.478439, 26.833542, -14.065025, 164.31694,
        7.906994, -24.243874, 163.72849, 8.314461, -18.708027, 157.41881, 11.07737,
        -0.09376, 148.61722, 16.134731, -18.708027, 157.41881, 11.07737, -19.56999,
        145.86487, 10.750969, -31.751047, 162.34445, 6.83536, -49.727013, 156.52638,
        5.787483, -25.892784, 154.30783, 7.506359, -49.850777, 161.34015, 5.75894,
        -55.39423, 156.21768, 6.628387, -49.727013, 156.52638, 5.787483, -55.36705,
        162.15805, 6.573559, -81.40752, 156.57841, 5.457367, -55.39423, 156.21768,
        6.628387, -18.123695, 0.203247, 24.357979, -20.322643, 3.359085, 10.637484,
        -20.23993, 0.16066, 10.61248, -0.09376, 160.0227, -13.901306, -14.005656,
        164.36447, -8.225239, -0.09376, 166.86476, -10.624881, -0.09376, 151.86748,
        -15.11038, -13.922115, 136.69167, -10.80815, -21.79404, 149.73053,
        -11.179743, -0.09376, 120.73334, -11.827755, -13.922115, 136.69167,
        -10.80815, -0.09376, 139.55891, -12.810705, -15.161923, 120.93446,
        -9.802008, -20.356783, 132.6048, 0.303063, -13.922115, 136.69167, -10.80815,
        -15.161923, 120.93446, -9.802008, -20.86922, 109.22975, 0.325292,
        -19.982998, 121.27292, 0.309567, -0.09376, 120.73334, -11.827755,
        -17.307951, 107.66594, -9.054958, -15.161923, 120.93446, -9.802008,
        -0.09376, 98.418365, -15.257325, -18.567759, 91.6555, -10.972906,
        -10.673033, 102.66724, -14.434296, -7.323554, 90.488014, -9.226171,
        -16.674091, 69.83636, -7.833611, -18.567759, 91.6555, -10.972906, -9.213158,
        69.844345, -7.835956, -16.099537, 64.09556, -6.982725, -16.674091, 69.83636,
        -7.833611, -20.685503, 69.85565, 0.220555, -18.567759, 91.6555, -10.972906,
        -16.674091, 69.83636, -7.833611, -17.307951, 107.66594, -9.054958,
        -22.929823, 93.78615, 0.195134, -20.86922, 109.22975, 0.325292, -7.323554,
        90.488014, -9.226171, -5.014924, 69.84093, 0.216538, -9.213158, 69.844345,
        -7.835956, -6.143153, 64.05022, 0.160611, -9.213158, 69.844345, -7.835956,
        -5.014924, 69.84093, 0.216538, -16.099537, 64.09556, -6.982725, -20.685503,
        69.85565, 0.220555, -16.674091, 69.83636, -7.833611, -9.57314, 55.99031,
        -8.496269, -16.099537, 64.09556, -6.982725, -9.714047, 64.09047, -6.977741,
        -9.482639, 44.683228, -10.648571, -16.817343, 55.997803, -8.483673,
        -9.57314, 55.99031, -8.496269, -9.714047, 64.09047, -6.977741, -6.143897,
        55.929947, -0.02751, -9.57314, 55.99031, -8.496269, -4.470686, 44.66829,
        -2.080527, -9.57314, 55.99031, -8.496269, -6.143897, 55.929947, -0.02751,
        -21.25618, 44.667236, -2.079227, -16.817343, 55.997803, -8.483673,
        -17.000568, 44.68242, -10.639189, -16.099537, 64.09556, -6.982725,
        -19.71799, 55.92906, -0.028131, -20.182674, 64.06278, 0.16067, -4.470686,
        44.66829, -2.080527, -10.393785, 14.23877, -9.063151, -9.482639, 44.683228,
        -10.648571, -10.393785, 14.23877, -9.063151, -17.000568, 44.68242,
        -10.639189, -9.482639, 44.683228, -10.648571, -15.848475, 14.248123,
        -9.059662, -21.25618, 44.667236, -2.079227, -17.000568, 44.68242,
        -10.639189, -15.848475, 14.248123, -9.059662, -17.540668, 12.685638,
        -2.006492, -18.942345, 14.219406, -1.760128, -8.489206, 12.628387,
        -2.009067, -10.393785, 14.23877, -9.063151, -6.713756, 14.201065, -1.76,
        -11.189796, 12.65152, -8.135422, -15.848475, 14.248123, -9.059662,
        -10.393785, 14.23877, -9.063151, -7.483142, 0.179794, -3.734459, -11.617541,
        3.258652, -9.916503, -7.362124, 3.248413, -3.767816, -7.362124, 3.248413,
        -3.767816, -11.189796, 12.65152, -8.135422, -8.489206, 12.628387, -2.009067,
        -11.617541, 3.258652, -9.916503, -15.262919, 12.680801, -8.129285,
        -11.189796, 12.65152, -8.135422, -15.262919, 12.680801, -8.129285,
        -19.632889, 3.272827, -3.696265, -17.540668, 12.685638, -2.006492,
        -11.665204, 0.192154, -9.811804, -15.807463, 3.273636, -10.209295,
        -11.617541, 3.258652, -9.916503, -15.76105, 0.201416, -10.113838,
        -19.632889, 3.272827, -3.696265, -15.807463, 3.273636, -10.209295,
        -14.005656, 164.36447, -8.225239, -18.714283, 158.59456, -11.616861,
        -24.71369, 163.60635, -7.489639, -27.860195, 154.29488, -7.663479,
        -24.71369, 163.60635, -7.489639, -18.714283, 158.59456, -11.616861,
        -49.725365, 156.5267, -5.136601, -32.10503, 162.20996, -6.039694,
        -27.860195, 154.29488, -7.663479, -55.394184, 156.2177, -5.979229,
        -49.707092, 162.0504, -5.107384, -49.725365, 156.5267, -5.136601, -82.09133,
        157.59846, -2.894408, -81.41046, 162.07013, -4.384408, -81.40687, 156.93275,
        -4.420877, -19.632889, 3.272827, -3.696265, -18.389282, 9.164932, 5.284815,
        -17.540668, 12.685638, -2.006492, -6.374583, 0.135803, 8.113768, -7.362124,
        3.248413, -3.767816, -6.207625, 3.259644, 8.108295, -6.207625, 3.259644,
        8.108295, -7.362124, 3.248413, -3.767816, -8.489206, 12.628387, -2.009067,
        -0.09376, 166.86476, -10.624881, -8.365941, 171.5989, -5.172494, -0.09376,
        171.74997, -7.982829, -8.365941, 171.5989, -5.172494, -15.612803, 166.97174,
        0.344693, -10.024375, 170.07367, 2.029528, -18.389282, 9.164932, 5.284815,
        -15.823111, 9.198776, 10.849604, -15.265563, 12.997787, 6.992805,
        -20.322643, 3.359085, 10.637484, -19.509016, 0.175873, -3.667883, -20.23993,
        0.16066, 10.61248, -15.823111, 9.198776, 10.849604, -13.733412, 3.478439,
        26.833542, -10.962499, 9.339417, 10.853382, -8.459431, 9.111618, 5.260471,
        -10.962499, 9.339417, 10.853382, -6.207625, 3.259644, 8.108295, -8.459431,
        9.111618, 5.260471, -6.207625, 3.259644, 8.108295, -8.489206, 12.628387,
        -2.009067, -49.850777, 161.34015, 5.75894, -31.849222, 165.58897, 0.511407,
        -49.735264, 164.96886, 0.358373, -49.735264, 164.96886, 0.358373, -32.10503,
        162.20996, -6.039694, -49.707092, 162.0504, -5.107384, -19.56999, 145.86487,
        10.750969, -25.892784, 154.30783, 7.506359, -25.55555, 148.82236, 0.315778,
        -49.75173, 152.10565, 0.325217, -25.892784, 154.30783, 7.506359, -49.727013,
        156.52638, 5.787483, -55.39423, 156.21768, 6.628387, -49.75173, 152.10565,
        0.325217, -49.727013, 156.52638, 5.787483, -24.243874, 163.72849, 8.314461,
        -31.849222, 165.58897, 0.511407, -31.751047, 162.34445, 6.83536, -24.549576,
        168.27138, 0.509057, -14.065025, 164.31694, 7.906994, -15.612803, 166.97174,
        0.344693, -49.850777, 161.34015, 5.75894, -55.38349, 165.39693, 0.36268,
        -55.36705, 162.15805, 6.573559, -55.38349, 165.39693, 0.36268, -49.707092,
        162.0504, -5.107384, -55.367004, 163.43588, -5.923852, -55.394184, 156.2177,
        -5.979229, -49.75173, 152.10565, 0.325217, -55.415, 151.7283, 0.324563,
        -27.860195, 154.29488, -7.663479, -49.75173, 152.10565, 0.325217,
        -49.725365, 156.5267, -5.136601, -21.79404, 149.73053, -11.179743,
        -25.55555, 148.82236, 0.315778, -27.860195, 154.29488, -7.663479,
        -31.849222, 165.58897, 0.511407, -24.71369, 163.60635, -7.489639, -32.10503,
        162.20996, -6.039694, -24.71369, 163.60635, -7.489639, -15.612803,
        166.97174, 0.344693, -14.005656, 164.36447, -8.225239, -0.09376, 148.61722,
        16.134731, -13.916588, 136.7114, 11.435217, -0.09376, 139.59744, 13.433695,
        -18.714283, 158.59456, -11.616861, -0.09376, 151.86748, -15.11038,
        -21.79404, 149.73053, -11.179743, -0.09376, 160.32742, 13.698597,
        -18.708027, 157.41881, 11.07737, -0.09376, 148.61722, 16.134731, -15.612803,
        166.97174, 0.344693, -24.71369, 163.60635, -7.489639, -24.549576, 168.27138,
        0.509057, -10.673033, 102.66724, -14.434296, -0.09376, 109.24249,
        -14.044044, -0.09376, 98.418365, -15.257325, -7.323554, 90.488014,
        -9.226171, -0.09376, 94.0281, 0.299632, -3.011169, 92.80522, 0.252903,
        -10.673033, 102.66724, -14.434296, -18.567759, 91.6555, -10.972906,
        -17.307951, 107.66594, -9.054958, -6.829031, 95.0891, 9.730982, -0.09376,
        102.23226, 12.219009, -17.263863, 105.438774, 9.754482, -0.09376, 96.421036,
        10.384417, -6.829031, 95.0891, 9.730982, -0.09376, 94.0281, 0.299632,
        -7.323554, 90.488014, -9.226171, -0.09376, 92.21055, -8.49113, -0.09376,
        94.0281, 0.299632, -6.705513, 173.45268, 7.865694, -7.395879, 167.89127,
        7.94491, -0.09376, 166.95822, 9.955076, -6.650137, 176.50154, -3.482457,
        -0.09376, 176.80714, -6.911478, -0.09376, 171.74997, -7.982829, -6.705513,
        173.45268, 7.865694, -7.698488, 174.74835, 2.385685, -10.024375, 170.07367,
        2.029528, -7.698488, 174.74835, 2.385685, -6.650137, 176.50154, -3.482457,
        -8.365941, 171.5989, -5.172494, -7.395879, 167.89127, 7.94491, -14.065025,
        164.31694, 7.906994, -0.09376, 160.32742, 13.698597, -14.065025, 164.31694,
        7.906994, -7.395879, 167.89127, 7.94491, -10.024375, 170.07367, 2.029528,
        -14.065025, 164.31694, 7.906994, -18.708027, 157.41881, 11.07737, -0.09376,
        160.32742, 13.698597, -13.916588, 136.7114, 11.435217, -15.166553,
        120.92279, 12.049509, -0.09376, 120.69466, 14.081373, -15.166553, 120.92279,
        12.049509, -13.916588, 136.7114, 11.435217, -20.356783, 132.6048, 0.303063,
        -20.356783, 132.6048, 0.303063, -13.916588, 136.7114, 11.435217, -19.56999,
        145.86487, 10.750969, -15.166553, 120.92279, 12.049509, -19.982998,
        121.27292, 0.309567, -20.86922, 109.22975, 0.325292, -0.09376, 120.69466,
        14.081373, -15.166553, 120.92279, 12.049509, -17.263863, 105.438774,
        9.754482, -6.829031, 95.0891, 9.730982, -17.263863, 105.438774, 9.754482,
        -7.248255, 90.829704, 10.812244, -7.248255, 90.829704, 10.812244,
        -18.543995, 91.737785, 10.808916, -16.690434, 69.84307, 10.148636,
        -9.200029, 69.84324, 10.151785, -16.690434, 69.84307, 10.148636, -16.129133,
        64.0992, 8.971176, -18.543995, 91.737785, 10.808916, -22.929823, 93.78615,
        0.195134, -20.685503, 69.85565, 0.220555, -22.929823, 93.78615, 0.195134,
        -18.543995, 91.737785, 10.808916, -17.263863, 105.438774, 9.754482,
        -7.248255, 90.829704, 10.812244, -9.200029, 69.84324, 10.151785, -5.014924,
        69.84093, 0.216538, -6.829031, 95.0891, 9.730982, -7.248255, 90.829704,
        10.812244, -3.011169, 92.80522, 0.252903, -5.014924, 69.84093, 0.216538,
        -9.200029, 69.84324, 10.151785, -9.687086, 64.09151, 8.967402, -16.129133,
        64.0992, 8.971176, -16.690434, 69.84307, 10.148636, -20.685503, 69.85565,
        0.220555, -16.129133, 64.0992, 8.971176, -16.82056, 55.90477, 11.243004,
        -9.565851, 55.89525, 11.251183, -16.82056, 55.90477, 11.243004, -17.044073,
        44.600082, 8.06889, -9.436416, 44.59767, 8.078434, -9.687086, 64.09151,
        8.967402, -9.565851, 55.89525, 11.251183, -6.143897, 55.929947, -0.02751,
        -6.143897, 55.929947, -0.02751, -9.565851, 55.89525, 11.251183, -9.436416,
        44.59767, 8.078434, -17.044073, 44.600082, 8.06889, -16.82056, 55.90477,
        11.243004, -19.71799, 55.92906, -0.028131, -19.71799, 55.92906, -0.028131,
        -16.82056, 55.90477, 11.243004, -16.129133, 64.0992, 8.971176, -9.436416,
        44.59767, 8.078434, -10.336361, 14.31868, 8.949894, -6.713756, 14.201065,
        -1.76, -17.044073, 44.600082, 8.06889, -15.903207, 14.336258, 8.946716,
        -10.336361, 14.31868, 8.949894, -21.25618, 44.667236, -2.079227, -18.942345,
        14.219406, -1.760128, -15.903207, 14.336258, 8.946716, -15.903207,
        14.336258, 8.946716, -18.942345, 14.219406, -1.760128, -17.540668,
        12.685638, -2.006492, -10.336361, 14.31868, 8.949894, -11.165036, 12.97049,
        7.006327, -8.489206, 12.628387, -2.009067, -15.903207, 14.336258, 8.946716,
        -15.265563, 12.997787, 6.992805, -11.165036, 12.97049, 7.006327, -9.436704,
        3.479156, 24.856838, -9.454875, 0.199966, 24.781517, -6.374583, 0.135803,
        8.113768, -15.265563, 12.997787, 6.992805, -15.823111, 9.198776, 10.849604,
        -10.962499, 9.339417, 10.853382, -18.143896, 3.477707, 24.429726,
        -18.123695, 0.203247, 24.357979, -14.23395, 0.201767, 26.635769, -24.243874,
        163.72849, 8.314461, -31.751047, 162.34445, 6.83536, -25.892784, 154.30783,
        7.506359, -31.751047, 162.34445, 6.83536, -49.850777, 161.34015, 5.75894,
        -49.727013, 156.52638, 5.787483, -49.850777, 161.34015, 5.75894, -55.36705,
        162.15805, 6.573559, -55.39423, 156.21768, 6.628387, -55.36705, 162.15805,
        6.573559, -81.41097, 162.54784, 5.420212, -81.40752, 156.57841, 5.457367,
        -18.123695, 0.203247, 24.357979, -18.143896, 3.477707, 24.429726,
        -20.322643, 3.359085, 10.637484, -0.09376, 160.0227, -13.901306, -18.714283,
        158.59456, -11.616861, -14.005656, 164.36447, -8.225239, -0.09376,
        151.86748, -15.11038, -0.09376, 139.55891, -12.810705, -13.922115,
        136.69167, -10.80815, -0.09376, 120.73334, -11.827755, -15.161923,
        120.93446, -9.802008, -13.922115, 136.69167, -10.80815, -15.161923,
        120.93446, -9.802008, -19.982998, 121.27292, 0.309567, -20.356783, 132.6048,
        0.303063, -25.55555, 148.82236, 0.315778, -21.79404, 149.73053, -11.179743,
        -20.356783, 132.6048, 0.303063, -15.161923, 120.93446, -9.802008,
        -17.307951, 107.66594, -9.054958, -20.86922, 109.22975, 0.325292, -0.09376,
        120.73334, -11.827755, -0.09376, 109.24249, -14.044044, -17.307951,
        107.66594, -9.054958, -0.09376, 98.418365, -15.257325, -7.323554, 90.488014,
        -9.226171, -18.567759, 91.6555, -10.972906, -7.323554, 90.488014, -9.226171,
        -9.213158, 69.844345, -7.835956, -16.674091, 69.83636, -7.833611, -9.213158,
        69.844345, -7.835956, -9.714047, 64.09047, -6.977741, -16.099537, 64.09556,
        -6.982725, -20.685503, 69.85565, 0.220555, -22.929823, 93.78615, 0.195134,
        -18.567759, 91.6555, -10.972906, -17.307951, 107.66594, -9.054958,
        -18.567759, 91.6555, -10.972906, -22.929823, 93.78615, 0.195134, -7.323554,
        90.488014, -9.226171, -3.011169, 92.80522, 0.252903, -5.014924, 69.84093,
        0.216538, -6.143153, 64.05022, 0.160611, -9.714047, 64.09047, -6.977741,
        -9.213158, 69.844345, -7.835956, -16.099537, 64.09556, -6.982725,
        -20.182674, 64.06278, 0.16067, -20.685503, 69.85565, 0.220555, -9.57314,
        55.99031, -8.496269, -16.817343, 55.997803, -8.483673, -16.099537, 64.09556,
        -6.982725, -9.482639, 44.683228, -10.648571, -17.000568, 44.68242,
        -10.639189, -16.817343, 55.997803, -8.483673, -9.714047, 64.09047,
        -6.977741, -6.143153, 64.05022, 0.160611, -6.143897, 55.929947, -0.02751,
        -4.470686, 44.66829, -2.080527, -9.482639, 44.683228, -10.648571, -9.57314,
        55.99031, -8.496269, -21.25618, 44.667236, -2.079227, -19.71799, 55.92906,
        -0.028131, -16.817343, 55.997803, -8.483673, -16.099537, 64.09556,
        -6.982725, -16.817343, 55.997803, -8.483673, -19.71799, 55.92906, -0.028131,
        -4.470686, 44.66829, -2.080527, -6.713756, 14.201065, -1.76, -10.393785,
        14.23877, -9.063151, -10.393785, 14.23877, -9.063151, -15.848475, 14.248123,
        -9.059662, -17.000568, 44.68242, -10.639189, -15.848475, 14.248123,
        -9.059662, -18.942345, 14.219406, -1.760128, -21.25618, 44.667236,
        -2.079227, -15.848475, 14.248123, -9.059662, -15.262919, 12.680801,
        -8.129285, -17.540668, 12.685638, -2.006492, -8.489206, 12.628387,
        -2.009067, -11.189796, 12.65152, -8.135422, -10.393785, 14.23877, -9.063151,
        -11.189796, 12.65152, -8.135422, -15.262919, 12.680801, -8.129285,
        -15.848475, 14.248123, -9.059662, -7.483142, 0.179794, -3.734459,
        -11.665204, 0.192154, -9.811804, -11.617541, 3.258652, -9.916503, -7.362124,
        3.248413, -3.767816, -11.617541, 3.258652, -9.916503, -11.189796, 12.65152,
        -8.135422, -11.617541, 3.258652, -9.916503, -15.807463, 3.273636,
        -10.209295, -15.262919, 12.680801, -8.129285, -15.262919, 12.680801,
        -8.129285, -15.807463, 3.273636, -10.209295, -19.632889, 3.272827,
        -3.696265, -11.665204, 0.192154, -9.811804, -15.76105, 0.201416, -10.113838,
        -15.807463, 3.273636, -10.209295, -15.76105, 0.201416, -10.113838,
        -19.509016, 0.175873, -3.667883, -19.632889, 3.272827, -3.696265,
        -27.860195, 154.29488, -7.663479, -32.10503, 162.20996, -6.039694,
        -24.71369, 163.60635, -7.489639, -49.725365, 156.5267, -5.136601,
        -49.707092, 162.0504, -5.107384, -32.10503, 162.20996, -6.039694,
        -55.394184, 156.2177, -5.979229, -55.367004, 163.43588, -5.923852,
        -49.707092, 162.0504, -5.107384, -82.09133, 157.59846, -2.894408, -82.10255,
        160.73541, -2.88169, -81.41046, 162.07013, -4.384408, -6.374583, 0.135803,
        8.113768, -7.483142, 0.179794, -3.734459, -7.362124, 3.248413, -3.767816,
        -0.09376, 166.86476, -10.624881, -14.005656, 164.36447, -8.225239,
        -8.365941, 171.5989, -5.172494, -8.365941, 171.5989, -5.172494, -14.005656,
        164.36447, -8.225239, -15.612803, 166.97174, 0.344693, -18.389282, 9.164932,
        5.284815, -20.322643, 3.359085, 10.637484, -15.823111, 9.198776, 10.849604,
        -10.962499, 9.339417, 10.853382, -9.436704, 3.479156, 24.856838, -6.207625,
        3.259644, 8.108295, -20.322643, 3.359085, 10.637484, -19.632889, 3.272827,
        -3.696265, -19.509016, 0.175873, -3.667883, -15.823111, 9.198776, 10.849604,
        -18.143896, 3.477707, 24.429726, -13.733412, 3.478439, 26.833542,
        -20.322643, 3.359085, 10.637484, -18.389282, 9.164932, 5.284815, -19.632889,
        3.272827, -3.696265, -15.823111, 9.198776, 10.849604, -20.322643, 3.359085,
        10.637484, -18.143896, 3.477707, 24.429726, -8.459431, 9.111618, 5.260471,
        -11.165036, 12.97049, 7.006327, -10.962499, 9.339417, 10.853382, -49.850777,
        161.34015, 5.75894, -31.751047, 162.34445, 6.83536, -31.849222, 165.58897,
        0.511407, -49.735264, 164.96886, 0.358373, -31.849222, 165.58897, 0.511407,
        -32.10503, 162.20996, -6.039694, -49.75173, 152.10565, 0.325217, -25.55555,
        148.82236, 0.315778, -25.892784, 154.30783, 7.506359, -55.39423, 156.21768,
        6.628387, -55.415, 151.7283, 0.324563, -49.75173, 152.10565, 0.325217,
        -24.243874, 163.72849, 8.314461, -24.549576, 168.27138, 0.509057,
        -31.849222, 165.58897, 0.511407, -24.549576, 168.27138, 0.509057,
        -24.243874, 163.72849, 8.314461, -14.065025, 164.31694, 7.906994,
        -49.850777, 161.34015, 5.75894, -49.735264, 164.96886, 0.358373, -55.38349,
        165.39693, 0.36268, -55.38349, 165.39693, 0.36268, -49.735264, 164.96886,
        0.358373, -49.707092, 162.0504, -5.107384, -55.394184, 156.2177, -5.979229,
        -49.725365, 156.5267, -5.136601, -49.75173, 152.10565, 0.325217, -27.860195,
        154.29488, -7.663479, -25.55555, 148.82236, 0.315778, -49.75173, 152.10565,
        0.325217, -31.849222, 165.58897, 0.511407, -24.549576, 168.27138, 0.509057,
        -24.71369, 163.60635, -7.489639, -0.09376, 148.61722, 16.134731, -19.56999,
        145.86487, 10.750969, -13.916588, 136.7114, 11.435217, -18.714283,
        158.59456, -11.616861, -0.09376, 160.0227, -13.901306, -0.09376, 151.86748,
        -15.11038, -10.673033, 102.66724, -14.434296, -17.307951, 107.66594,
        -9.054958, -0.09376, 109.24249, -14.044044, -0.09376, 92.21055, -8.49113,
        -7.323554, 90.488014, -9.226171, -0.09376, 98.418365, -15.257325,
        -100.583534, 159.21793, 2.510687, -94.87406, 158.19353, -1.553889,
        -97.14889, 158.60205, 2.731585, -105.593315, 159.10333, -6.076679,
        -102.02214, 162.20671, -2.13446, -100.22604, 161.89435, -5.892924,
        -106.28826, 157.06691, 2.106632, -101.11331, 158.86504, -2.051573,
        -100.583534, 159.21793, 2.510687, -100.583534, 159.21793, 2.510687,
        -106.951004, 159.0707, 2.119013, -106.28826, 157.06691, 2.106632,
        -106.64906, 157.04564, -2.474645, -105.593315, 159.10333, -6.076679,
        -104.92189, 157.09349, -5.95056, -94.6028, 162.21555, -1.51487, -100.22604,
        161.89435, -5.892924, -102.02214, 162.20671, -2.13446, -99.22806, 159.28145,
        -5.831779, -94.87406, 158.19353, -1.553889, -101.11331, 158.86504,
        -2.051573, -102.02214, 162.20671, -2.13446, -106.951004, 159.0707, 2.119013,
        -101.583855, 161.8562, 2.465956, -99.22806, 159.28145, -5.831779,
        -105.593315, 159.10333, -6.076679, -100.22604, 161.89435, -5.892924,
        -101.11331, 158.86504, -2.051573, -104.92189, 157.09349, -5.95056,
        -99.22806, 159.28145, -5.831779, -97.14889, 158.60205, 2.731585, -94.87406,
        158.19353, -1.553889, -94.38212, 158.37016, 6.331047, -94.6028, 162.21555,
        -1.51487, -101.583855, 161.8562, 2.465956, -97.63022, 161.9928, 2.784914,
        -106.951004, 159.0707, 2.119013, -106.64906, 157.04564, -2.474645,
        -106.28826, 157.06691, 2.106632, -93.22879, 152.63966, 14.020803, -95.63094,
        153.33739, 12.615957, -94.658325, 151.68024, 12.571562, -91.33679,
        153.72879, 10.707344, -90.75369, 154.33694, 5.23115, -87.47691, 155.20001,
        7.249554, -89.50633, 158.6334, 8.145693, -94.16408, 161.52509, 6.579082,
        -94.38212, 158.37016, 6.331047, -100.61877, 159.18132, 6.443607, -106.76884,
        158.94032, 6.322006, -106.185104, 157.00198, 6.354237, -100.22604,
        161.89435, -5.892924, -88.11605, 156.95886, -4.182884, -99.22806, 159.28145,
        -5.831779, -100.39661, 159.1756, 3.252394, -97.63022, 161.9928, 2.784914,
        -97.14889, 158.60205, 2.731585, -106.76884, 158.94032, 6.322006,
        -106.162224, 157.05695, 3.642189, -106.185104, 157.00198, 6.354237,
        -94.16408, 161.52509, 6.579082, -101.51744, 161.85464, 3.384033, -101.53712,
        161.76689, 6.537149, -100.39661, 159.1756, 3.252394, -94.38212, 158.37016,
        6.331047, -100.61877, 159.18132, 6.443607, -106.659836, 159.14801, 3.434637,
        -101.53712, 161.76689, 6.537149, -101.51744, 161.85464, 3.384033,
        -100.39661, 159.1756, 3.252394, -106.659836, 159.14801, 3.434637,
        -101.51744, 161.85464, 3.384033, -100.61877, 159.18132, 6.443607,
        -106.162224, 157.05695, 3.642189, -100.39661, 159.1756, 3.252394, -90.75369,
        154.33694, 5.23115, -94.75894, 155.2693, 9.122351, -94.38212, 158.37016,
        6.331047, -93.47147, 152.58038, 9.396738, -95.63094, 153.33739, 12.615957,
        -94.75894, 155.2693, 9.122351, -93.13, 156.42589, 10.779707, -95.63094,
        153.33739, 12.615957, -93.8001, 154.32712, 13.875965, -91.33679, 153.72879,
        10.707344, -94.658325, 151.68024, 12.571562, -93.47147, 152.58038, 9.396738,
        -93.13, 156.42589, 10.779707, -94.38212, 158.37016, 6.331047, -94.75894,
        155.2693, 9.122351, -89.50633, 158.6334, 8.145693, -91.33679, 153.72879,
        10.707344, -87.47691, 155.20001, 7.249554, -91.33679, 153.72879, 10.707344,
        -93.8001, 154.32712, 13.875965, -93.22879, 152.63966, 14.020803, -90.75369,
        154.33694, 5.23115, -94.38212, 158.37016, 6.331047, -94.87406, 158.19353,
        -1.553889, -87.47691, 155.20001, 7.249554, -90.75369, 154.33694, 5.23115,
        -85.516815, 155.22197, 1.214287, -82.09133, 157.59846, -2.894408, -82.11689,
        155.8176, 0.303644, -85.516815, 155.22197, 1.214287, -87.47691, 155.20001,
        7.249554, -82.01441, 157.56055, 3.579102, -89.50633, 158.6334, 8.145693,
        -97.63022, 161.9928, 2.784914, -100.583534, 159.21793, 2.510687, -97.14889,
        158.60205, 2.731585, -100.583534, 159.21793, 2.510687, -101.11331,
        158.86504, -2.051573, -94.87406, 158.19353, -1.553889, -105.593315,
        159.10333, -6.076679, -107.25584, 159.15373, -2.570219, -102.02214,
        162.20671, -2.13446, -106.28826, 157.06691, 2.106632, -106.64906, 157.04564,
        -2.474645, -101.11331, 158.86504, -2.051573, -100.583534, 159.21793,
        2.510687, -101.583855, 161.8562, 2.465956, -106.951004, 159.0707, 2.119013,
        -82.10255, 160.73541, -2.88169, -88.11605, 156.95886, -4.182884, -100.22604,
        161.89435, -5.892924, -97.63022, 161.9928, 2.784914, -86.92077, 161.49197,
        5.668367, -94.6028, 162.21555, -1.51487, -106.64906, 157.04564, -2.474645,
        -107.25584, 159.15373, -2.570219, -105.593315, 159.10333, -6.076679,
        -102.02214, 162.20671, -2.13446, -107.25584, 159.15373, -2.570219,
        -106.951004, 159.0707, 2.119013, -99.22806, 159.28145, -5.831779,
        -104.92189, 157.09349, -5.95056, -105.593315, 159.10333, -6.076679,
        -101.11331, 158.86504, -2.051573, -106.64906, 157.04564, -2.474645,
        -104.92189, 157.09349, -5.95056, -94.6028, 162.21555, -1.51487, -102.02214,
        162.20671, -2.13446, -101.583855, 161.8562, 2.465956, -106.951004, 159.0707,
        2.119013, -107.25584, 159.15373, -2.570219, -106.64906, 157.04564,
        -2.474645, -93.22879, 152.63966, 14.020803, -93.8001, 154.32712, 13.875965,
        -95.63094, 153.33739, 12.615957, -91.33679, 153.72879, 10.707344, -93.47147,
        152.58038, 9.396738, -90.75369, 154.33694, 5.23115, -89.50633, 158.6334,
        8.145693, -86.92077, 161.49197, 5.668367, -94.16408, 161.52509, 6.579082,
        -100.61877, 159.18132, 6.443607, -101.53712, 161.76689, 6.537149,
        -106.76884, 158.94032, 6.322006, -94.16408, 161.52509, 6.579082, -86.92077,
        161.49197, 5.668367, -97.63022, 161.9928, 2.784914, -100.39661, 159.1756,
        3.252394, -101.51744, 161.85464, 3.384033, -97.63022, 161.9928, 2.784914,
        -106.76884, 158.94032, 6.322006, -106.659836, 159.14801, 3.434637,
        -106.162224, 157.05695, 3.642189, -94.16408, 161.52509, 6.579082, -97.63022,
        161.9928, 2.784914, -101.51744, 161.85464, 3.384033, -100.39661, 159.1756,
        3.252394, -97.14889, 158.60205, 2.731585, -94.38212, 158.37016, 6.331047,
        -94.16408, 161.52509, 6.579082, -101.53712, 161.76689, 6.537149, -100.61877,
        159.18132, 6.443607, -94.38212, 158.37016, 6.331047, -94.16408, 161.52509,
        6.579082, -100.61877, 159.18132, 6.443607, -106.659836, 159.14801, 3.434637,
        -106.76884, 158.94032, 6.322006, -101.53712, 161.76689, 6.537149,
        -100.39661, 159.1756, 3.252394, -106.162224, 157.05695, 3.642189,
        -106.659836, 159.14801, 3.434637, -100.61877, 159.18132, 6.443607,
        -106.185104, 157.00198, 6.354237, -106.162224, 157.05695, 3.642189,
        -94.6028, 162.21555, -1.51487, -82.084045, 162.03973, 0.337693, -100.22604,
        161.89435, -5.892924, -90.75369, 154.33694, 5.23115, -93.47147, 152.58038,
        9.396738, -94.75894, 155.2693, 9.122351, -93.47147, 152.58038, 9.396738,
        -94.658325, 151.68024, 12.571562, -95.63094, 153.33739, 12.615957, -93.13,
        156.42589, 10.779707, -94.75894, 155.2693, 9.122351, -95.63094, 153.33739,
        12.615957, -91.33679, 153.72879, 10.707344, -93.22879, 152.63966, 14.020803,
        -94.658325, 151.68024, 12.571562, -93.13, 156.42589, 10.779707, -89.50633,
        158.6334, 8.145693, -94.38212, 158.37016, 6.331047, -89.50633, 158.6334,
        8.145693, -93.13, 156.42589, 10.779707, -91.33679, 153.72879, 10.707344,
        -91.33679, 153.72879, 10.707344, -93.13, 156.42589, 10.779707, -93.8001,
        154.32712, 13.875965, -94.87406, 158.19353, -1.553889, -99.22806, 159.28145,
        -5.831779, -88.11605, 156.95886, -4.182884, -88.11605, 156.95886, -4.182884,
        -90.75369, 154.33694, 5.23115, -94.87406, 158.19353, -1.553889, -88.11605,
        156.95886, -4.182884, -82.09133, 157.59846, -2.894408, -85.516815,
        155.22197, 1.214287, -82.09133, 157.59846, -2.894408, -88.11605, 156.95886,
        -4.182884, -82.10255, 160.73541, -2.88169, -86.92077, 161.49197, 5.668367,
        -82.06319, 160.77011, 3.55191, -82.084045, 162.03973, 0.337693, -97.63022,
        161.9928, 2.784914, -101.583855, 161.8562, 2.465956, -100.583534, 159.21793,
        2.510687, -86.92077, 161.49197, 5.668367, -82.084045, 162.03973, 0.337693,
        -94.6028, 162.21555, -1.51487, -82.084045, 162.03973, 0.337693, -82.10255,
        160.73541, -2.88169, -100.22604, 161.89435, -5.892924, -85.516815,
        155.22197, 1.214287, -82.01441, 157.56055, 3.579102, -87.47691, 155.20001,
        7.249554, -85.516815, 155.22197, 1.214287, -90.75369, 154.33694, 5.23115,
        -88.11605, 156.95886, -4.182884, -81.40687, 156.93275, -4.420877, -81.41104,
        152.92778, -0.059091, -82.11689, 155.8176, 0.303644, -81.40687, 156.93275,
        -4.420877, -55.394184, 156.2177, -5.979229, -81.41104, 152.92778, -0.059091,
        -55.394184, 156.2177, -5.979229, -55.415, 151.7283, 0.324563, -81.41104,
        152.92778, -0.059091, -81.41097, 162.54784, 5.420212, -55.36705, 162.15805,
        6.573559, -55.38349, 165.39693, 0.36268, -81.41046, 162.07013, -4.384408,
        -81.41928, 164.42244, -0.027995, -55.38349, 165.39693, 0.36268, -81.41046,
        162.07013, -4.384408, -82.10255, 160.73541, -2.88169, -81.41928, 164.42244,
        -0.027995, -82.10255, 160.73541, -2.88169, -82.084045, 162.03973, 0.337693,
        -81.41928, 164.42244, -0.027995, -81.41104, 152.92778, -0.059091, -55.415,
        151.7283, 0.324563, -55.39423, 156.21768, 6.628387, -81.40752, 156.57841,
        5.457367, -81.41097, 162.54784, 5.420212, -82.01441, 157.56055, 3.579102,
        -81.41097, 162.54784, 5.420212, -82.06319, 160.77011, 3.55191, -82.01441,
        157.56055, 3.579102, -81.40687, 156.93275, -4.420877, -82.11689, 155.8176,
        0.303644, -82.09133, 157.59846, -2.894408, -82.06319, 160.77011, 3.55191,
        -81.41928, 164.42244, -0.027995, -82.084045, 162.03973, 0.337693, -82.06319,
        160.77011, 3.55191, -81.41097, 162.54784, 5.420212, -81.41928, 164.42244,
        -0.027995, -81.41097, 162.54784, 5.420212, -55.38349, 165.39693, 0.36268,
        -81.41928, 164.42244, -0.027995, -81.41046, 162.07013, -4.384408, -55.38349,
        165.39693, 0.36268, -55.367004, 163.43588, -5.923852, -82.11689, 155.8176,
        0.303644, -81.40752, 156.57841, 5.457367, -82.01441, 157.56055, 3.579102,
        -82.11689, 155.8176, 0.303644, -81.41104, 152.92778, -0.059091, -81.40752,
        156.57841, 5.457367, -81.41104, 152.92778, -0.059091, -55.39423, 156.21768,
        6.628387, -81.40752, 156.57841, 5.457367, -81.40687, 156.93275, -4.420877,
        -55.367004, 163.43588, -5.923852, -55.394184, 156.2177, -5.979229,
        -81.40687, 156.93275, -4.420877, -81.41046, 162.07013, -4.384408,
        -55.367004, 163.43588, -5.923852, -7.248255, 90.829704, 10.812244,
        -17.263863, 105.438774, 9.754482, -18.543995, 91.737785, 10.808916,
        -85.516815, 155.22197, 1.214287, -82.11689, 155.8176, 0.303644, -82.01441,
        157.56055, 3.579102, -6.374583, 0.135803, 8.113768, -9.454875, 0.199966,
        24.781517, -14.23395, 0.201767, 26.635769, -19.509016, 0.175873, -3.667883,
        -15.76105, 0.201416, -10.113838, -11.665204, 0.192154, -9.811804, -6.374583,
        0.135803, 8.113768, -19.509016, 0.175873, -3.667883, -7.483142, 0.179794,
        -3.734459, -20.23993, 0.16066, 10.61248, -19.509016, 0.175873, -3.667883,
        -6.374583, 0.135803, 8.113768, -11.665204, 0.192154, -9.811804, -7.483142,
        0.179794, -3.734459, -19.509016, 0.175873, -3.667883, -25.892784, 154.30783,
        7.506359, -19.56999, 145.86487, 10.750969, -18.708027, 157.41881, 11.07737,
        -18.708027, 157.41881, 11.07737, -24.243874, 163.72849, 8.314461,
        -25.892784, 154.30783, 7.506359, -6.681612, 181.6082, 12.778654, -5.608439,
        173.86244, 12.336845, -3.003639, 181.55959, 14.82626, -9.260859, 181.68558,
        8.14398, -10.422307, 181.78899, 1.891512, -6.705513, 173.45268, 7.865694,
        -9.260859, 181.68558, 8.14398, -6.681612, 181.6082, 12.778654, -9.459242,
        187.808, 8.350927, -9.459242, 187.808, 8.350927, -6.681612, 181.6082,
        12.778654, -7.781168, 187.34822, 13.10606, -82.01441, 157.56055, 3.579102,
        -86.92077, 161.49197, 5.668367, -89.50633, 158.6334, 8.145693, -82.01441,
        157.56055, 3.579102, -82.06319, 160.77011, 3.55191, -86.92077, 161.49197,
        5.668367, -20.356783, 132.6048, 0.303063, -21.79404, 149.73053, -11.179743,
        -13.922115, 136.69167, -10.80815, -13.733412, 3.478439, 26.833542,
        -14.23395, 0.201767, 26.635769, -9.454875, 0.199966, 24.781517, -14.23395,
        0.201767, 26.635769, -18.123695, 0.203247, 24.357979, -20.23993, 0.16066,
        10.61248, -10.962499, 9.339417, 10.853382, -13.733412, 3.478439, 26.833542,
        -9.436704, 3.479156, 24.856838, -20.23993, 0.16066, 10.61248, -6.374583,
        0.135803, 8.113768, -14.23395, 0.201767, 26.635769, 2.81612, 181.55959,
        14.82626, 1.96435, 185.70786, 15.229183, -0.09376, 183.3437, 18.49699,
        -0.09376, 173.49391, 15.120314, 5.42092, 173.86244, 12.336845, 2.81612,
        181.55959, 14.82626, -0.09376, 183.3437, 18.49699, 1.96435, 185.70786,
        15.229183, -0.09376, 188.77335, 15.775118, 2.81612, 181.55959, 14.82626,
        6.494093, 181.6082, 12.778654, 7.593648, 187.34822, 13.10606, 7.510969,
        174.74835, 2.385685, 10.234788, 181.78899, 1.891512, 6.517993, 173.45268,
        7.865694, 6.462618, 176.50154, -3.482457, 10.960269, 184.13615, -1.08761,
        10.234788, 181.78899, 1.891512, 6.85792, 184.48523, -7.060825, 7.446567,
        191.09583, -7.741708, 10.820419, 190.28868, -1.547568, 10.130132, 188.73183,
        1.811197, 10.014214, 195.31082, 3.62348, 9.271723, 187.808, 8.350927,
        10.820419, 190.28868, -1.547568, 7.446567, 191.09583, -7.741708, 6.803334,
        198.81671, -5.037816, 9.271723, 187.808, 8.350927, 9.073339, 181.68558,
        8.14398, 10.234788, 181.78899, 1.891512, 6.462618, 176.50154, -3.482457,
        -0.09376, 176.80714, -6.911478, 6.85792, 184.48523, -7.060825, 10.014214,
        195.31082, 3.62348, 7.629985, 200.31906, 3.375647, 6.731299, 198.11917,
        11.531952, 7.444796, 189.39076, 14.936037, 7.593648, 187.34822, 13.10606,
        9.271723, 187.808, 8.350927, 5.42092, 173.86244, 12.336845, 9.073339,
        181.68558, 8.14398, 6.494093, 181.6082, 12.778654, 6.517993, 173.45268,
        7.865694, 9.073339, 181.68558, 8.14398, 5.42092, 173.86244, 12.336845,
        -0.09376, 183.13756, -9.90349, -0.09376, 191.65102, -10.6928, 7.446567,
        191.09583, -7.741708, -0.09376, 191.65102, -10.6928, -0.09376, 200.07652,
        -5.964356, 6.803334, 198.81671, -5.037816, -0.09376, 200.07652, -5.964356,
        -0.09376, 202.2252, 4.30405, 7.629985, 200.31906, 3.375647, -0.09376,
        202.2252, 4.30405, -0.09376, 199.2527, 13.548878, 6.731299, 198.11917,
        11.531952, -0.09376, 199.2527, 13.548878, -0.09376, 188.77335, 15.775118,
        7.444796, 189.39076, 14.936037, 10.960269, 184.13615, -1.08761, 6.462618,
        176.50154, -3.482457, 6.85792, 184.48523, -7.060825, 10.130132, 188.73183,
        1.811197, 12.491594, 189.41019, -2.269108, 10.958962, 191.03552, -0.179888,
        10.130132, 188.73183, 1.811197, 10.958962, 191.03552, -0.179888, 10.820419,
        190.28868, -1.547568, 10.958962, 191.03552, -0.179888, 12.491594, 189.41019,
        -2.269108, 10.820419, 190.28868, -1.547568, 10.960269, 184.13615, -1.08761,
        10.820419, 190.28868, -1.547568, 12.491594, 189.41019, -2.269108, 10.234788,
        181.78899, 1.891512, 10.960269, 184.13615, -1.08761, 11.621145, 183.8664,
        -1.505643, -0.09376, 180.7657, 15.697264, 2.81612, 181.55959, 14.82626,
        -0.09376, 183.3437, 18.49699, 5.42092, 173.86244, 12.336845, -0.09376,
        173.49391, 15.120314, -0.09376, 171.7362, 9.812624, 1.96435, 185.70786,
        15.229183, 2.81612, 181.55959, 14.82626, 7.593648, 187.34822, 13.10606,
        7.593648, 187.34822, 13.10606, 7.444796, 189.39076, 14.936037, -0.09376,
        188.77335, 15.775118, 1.96435, 185.70786, 15.229183, 7.593648, 187.34822,
        13.10606, -0.09376, 188.77335, 15.775118, -0.09376, 173.49391, 15.120314,
        2.81612, 181.55959, 14.82626, -0.09376, 180.7657, 15.697264, 6.462618,
        176.50154, -3.482457, 10.234788, 181.78899, 1.891512, 7.510969, 174.74835,
        2.385685, 6.85792, 184.48523, -7.060825, 10.820419, 190.28868, -1.547568,
        10.960269, 184.13615, -1.08761, 10.820419, 190.28868, -1.547568, 10.014214,
        195.31082, 3.62348, 10.130132, 188.73183, 1.811197, 9.271723, 187.808,
        8.350927, 10.234788, 181.78899, 1.891512, 10.130132, 188.73183, 1.811197,
        6.803334, 198.81671, -5.037816, 10.014214, 195.31082, 3.62348, 10.820419,
        190.28868, -1.547568, 9.271723, 187.808, 8.350927, 10.014214, 195.31082,
        3.62348, 7.444796, 189.39076, 14.936037, -0.09376, 176.80714, -6.911478,
        -0.09376, 183.13756, -9.90349, 6.85792, 184.48523, -7.060825, -0.09376,
        183.13756, -9.90349, 7.446567, 191.09583, -7.741708, 6.85792, 184.48523,
        -7.060825, -0.09376, 191.65102, -10.6928, 6.803334, 198.81671, -5.037816,
        7.446567, 191.09583, -7.741708, -0.09376, 200.07652, -5.964356, 7.629985,
        200.31906, 3.375647, 6.803334, 198.81671, -5.037816, -0.09376, 202.2252,
        4.30405, 6.731299, 198.11917, 11.531952, 7.629985, 200.31906, 3.375647,
        -0.09376, 199.2527, 13.548878, 7.444796, 189.39076, 14.936037, 6.731299,
        198.11917, 11.531952, 12.491594, 189.41019, -2.269108, 10.130132, 188.73183,
        1.811197, 11.621145, 183.8664, -1.505643, 11.621145, 183.8664, -1.505643,
        10.130132, 188.73183, 1.811197, 10.234788, 181.78899, 1.891512, 10.960269,
        184.13615, -1.08761, 12.491594, 189.41019, -2.269108, 11.621145, 183.8664,
        -1.505643, 5.42092, 173.86244, 12.336845, -0.09376, 171.7362, 9.812624,
        6.517993, 173.45268, 7.865694, 6.803334, 198.81671, -5.037816, 7.629985,
        200.31906, 3.375647, 10.014214, 195.31082, 3.62348, 10.014214, 195.31082,
        3.62348, 6.731299, 198.11917, 11.531952, 7.444796, 189.39076, 14.936037,
        6.517993, 173.45268, 7.865694, -0.09376, 171.7362, 9.812624, -0.09376,
        166.95822, 9.955076, 6.462618, 176.50154, -3.482457, 8.178422, 171.5989,
        -5.172494, -0.09376, 171.74997, -7.982829, 6.517993, 173.45268, 7.865694,
        7.20836, 167.89127, 7.94491, 9.836856, 170.07367, 2.029528, 7.510969,
        174.74835, 2.385685, 9.836856, 170.07367, 2.029528, 8.178422, 171.5989,
        -5.172494, 7.20836, 167.89127, 7.94491, -0.09376, 166.95822, 9.955076,
        -0.09376, 160.32742, 13.698597, 13.877506, 164.31694, 7.906994, 15.425283,
        166.97174, 0.344693, 9.836856, 170.07367, 2.029528, 18.526764, 158.59456,
        -11.616861, 27.672676, 154.29488, -7.663479, 21.606522, 149.73053,
        -11.179743, 13.729069, 136.7114, 11.435217, -0.09376, 139.59744, 13.433695,
        -0.09376, 120.69466, 14.081373, 14.979034, 120.92279, 12.049509, 19.795479,
        121.27292, 0.309567, 20.169264, 132.6048, 0.303063, 20.169264, 132.6048,
        0.303063, 25.36803, 148.82236, 0.315778, 19.382471, 145.86487, 10.750969,
        14.979034, 120.92279, 12.049509, 17.076344, 105.438774, 9.754482, 20.681702,
        109.22975, 0.325292, -0.09376, 120.69466, 14.081373, -0.09376, 102.23226,
        12.219009, 17.076344, 105.438774, 9.754482, -0.09376, 102.23226, 12.219009,
        -0.09376, 96.421036, 10.384417, 6.641512, 95.0891, 9.730982, 7.060736,
        90.829704, 10.812244, 9.01251, 69.84324, 10.151785, 16.502914, 69.84307,
        10.148636, 9.01251, 69.84324, 10.151785, 9.499567, 64.09151, 8.967402,
        15.941614, 64.0992, 8.971176, 18.356476, 91.737785, 10.808916, 16.502914,
        69.84307, 10.148636, 20.497984, 69.85565, 0.220555, 22.742304, 93.78615,
        0.195134, 20.681702, 109.22975, 0.325292, 17.076344, 105.438774, 9.754482,
        7.060736, 90.829704, 10.812244, 2.82365, 92.80522, 0.252903, 4.827405,
        69.84093, 0.216538, 6.641512, 95.0891, 9.730982, -0.09376, 94.0281,
        0.299632, 2.82365, 92.80522, 0.252903, 4.827405, 69.84093, 0.216538,
        5.955634, 64.05022, 0.160611, 9.499567, 64.09151, 8.967402, 15.941614,
        64.0992, 8.971176, 19.995155, 64.06278, 0.16067, 20.497984, 69.85565,
        0.220555, 15.941614, 64.0992, 8.971176, 9.499567, 64.09151, 8.967402,
        9.378332, 55.89525, 11.251183, 16.633041, 55.90477, 11.243004, 9.378332,
        55.89525, 11.251183, 9.248897, 44.59767, 8.078434, 9.499567, 64.09151,
        8.967402, 5.955634, 64.05022, 0.160611, 5.956378, 55.929947, -0.02751,
        5.956378, 55.929947, -0.02751, 4.283167, 44.66829, -2.080527, 9.248897,
        44.59767, 8.078434, 16.856554, 44.600082, 8.06889, 21.06866, 44.667236,
        -2.079227, 19.530472, 55.92906, -0.028131, 19.530472, 55.92906, -0.028131,
        19.995155, 64.06278, 0.16067, 15.941614, 64.0992, 8.971176, 9.248897,
        44.59767, 8.078434, 4.283167, 44.66829, -2.080527, 6.526237, 14.201065,
        -1.76, 16.856554, 44.600082, 8.06889, 9.248897, 44.59767, 8.078434,
        10.148842, 14.31868, 8.949894, 21.06866, 44.667236, -2.079227, 16.856554,
        44.600082, 8.06889, 15.715688, 14.336258, 8.946716, 15.715688, 14.336258,
        8.946716, 15.078044, 12.997787, 6.992805, 17.35315, 12.685638, -2.006492,
        10.148842, 14.31868, 8.949894, 6.526237, 14.201065, -1.76, 8.301687,
        12.628387, -2.009067, 15.715688, 14.336258, 8.946716, 10.148842, 14.31868,
        8.949894, 10.977517, 12.97049, 7.006327, 9.249185, 3.479156, 24.856838,
        6.020106, 3.259644, 8.108295, 6.187064, 0.135803, 8.113768, 8.301687,
        12.628387, -2.009067, 8.271912, 9.111618, 5.260471, 10.977517, 12.97049,
        7.006327, 15.078044, 12.997787, 6.992805, 10.977517, 12.97049, 7.006327,
        10.77498, 9.339417, 10.853382, 15.078044, 12.997787, 6.992805, 18.201763,
        9.164932, 5.284815, 17.35315, 12.685638, -2.006492, 17.956377, 3.477707,
        24.429726, 13.545893, 3.478439, 26.833542, 14.046431, 0.201767, 26.635769,
        13.877506, 164.31694, 7.906994, 18.520508, 157.41881, 11.07737, 24.056355,
        163.72849, 8.314461, -0.09376, 148.61722, 16.134731, 19.382471, 145.86487,
        10.750969, 18.520508, 157.41881, 11.07737, 31.563528, 162.34445, 6.83536,
        25.705265, 154.30783, 7.506359, 49.53949, 156.52638, 5.787483, 49.663254,
        161.34015, 5.75894, 49.53949, 156.52638, 5.787483, 55.206707, 156.21768,
        6.628387, 55.179527, 162.15805, 6.573559, 55.206707, 156.21768, 6.628387,
        81.22, 156.57841, 5.457367, 17.936176, 0.203247, 24.357979, 20.05241,
        0.16066, 10.61248, 20.135124, 3.359085, 10.637484, -0.09376, 160.0227,
        -13.901306, -0.09376, 166.86476, -10.624881, 13.818137, 164.36447,
        -8.225239, -0.09376, 151.86748, -15.11038, 21.606522, 149.73053, -11.179743,
        13.734596, 136.69167, -10.80815, -0.09376, 120.73334, -11.827755, -0.09376,
        139.55891, -12.810705, 13.734596, 136.69167, -10.80815, 14.974404,
        120.93446, -9.802008, 13.734596, 136.69167, -10.80815, 20.169264, 132.6048,
        0.303063, 14.974404, 120.93446, -9.802008, 19.795479, 121.27292, 0.309567,
        20.681702, 109.22975, 0.325292, -0.09376, 120.73334, -11.827755, 14.974404,
        120.93446, -9.802008, 17.120432, 107.66594, -9.054958, -0.09376, 98.418365,
        -15.257325, 10.485514, 102.66724, -14.434296, 18.38024, 91.6555, -10.972906,
        7.136035, 90.488014, -9.226171, 18.38024, 91.6555, -10.972906, 16.486572,
        69.83636, -7.833611, 9.025639, 69.844345, -7.835956, 16.486572, 69.83636,
        -7.833611, 15.912018, 64.09556, -6.982725, 20.497984, 69.85565, 0.220555,
        16.486572, 69.83636, -7.833611, 18.38024, 91.6555, -10.972906, 17.120432,
        107.66594, -9.054958, 20.681702, 109.22975, 0.325292, 22.742304, 93.78615,
        0.195134, 7.136035, 90.488014, -9.226171, 9.025639, 69.844345, -7.835956,
        4.827405, 69.84093, 0.216538, 5.955634, 64.05022, 0.160611, 4.827405,
        69.84093, 0.216538, 9.025639, 69.844345, -7.835956, 15.912018, 64.09556,
        -6.982725, 16.486572, 69.83636, -7.833611, 20.497984, 69.85565, 0.220555,
        9.385621, 55.99031, -8.496269, 9.526528, 64.09047, -6.977741, 15.912018,
        64.09556, -6.982725, 9.29512, 44.683228, -10.648571, 9.385621, 55.99031,
        -8.496269, 16.629824, 55.997803, -8.483673, 9.526528, 64.09047, -6.977741,
        9.385621, 55.99031, -8.496269, 5.956378, 55.929947, -0.02751, 4.283167,
        44.66829, -2.080527, 5.956378, 55.929947, -0.02751, 9.385621, 55.99031,
        -8.496269, 21.06866, 44.667236, -2.079227, 16.81305, 44.68242, -10.639189,
        16.629824, 55.997803, -8.483673, 15.912018, 64.09556, -6.982725, 19.995155,
        64.06278, 0.16067, 19.530472, 55.92906, -0.028131, 4.283167, 44.66829,
        -2.080527, 9.29512, 44.683228, -10.648571, 10.206265, 14.23877, -9.063151,
        10.206265, 14.23877, -9.063151, 9.29512, 44.683228, -10.648571, 16.81305,
        44.68242, -10.639189, 15.660956, 14.248123, -9.059662, 16.81305, 44.68242,
        -10.639189, 21.06866, 44.667236, -2.079227, 15.660956, 14.248123, -9.059662,
        18.754826, 14.219406, -1.760128, 17.35315, 12.685638, -2.006492, 8.301687,
        12.628387, -2.009067, 6.526237, 14.201065, -1.76, 10.206265, 14.23877,
        -9.063151, 11.002277, 12.65152, -8.135422, 10.206265, 14.23877, -9.063151,
        15.660956, 14.248123, -9.059662, 7.295623, 0.179794, -3.734459, 7.174605,
        3.248413, -3.767816, 11.430022, 3.258652, -9.916503, 7.174605, 3.248413,
        -3.767816, 8.301687, 12.628387, -2.009067, 11.002277, 12.65152, -8.135422,
        11.430022, 3.258652, -9.916503, 11.002277, 12.65152, -8.135422, 15.0754,
        12.680801, -8.129285, 15.0754, 12.680801, -8.129285, 17.35315, 12.685638,
        -2.006492, 19.44537, 3.272827, -3.696265, 11.477685, 0.192154, -9.811804,
        11.430022, 3.258652, -9.916503, 15.619944, 3.273636, -10.209295, 15.573531,
        0.201416, -10.113838, 15.619944, 3.273636, -10.209295, 19.44537, 3.272827,
        -3.696265, 13.818137, 164.36447, -8.225239, 24.52617, 163.60635, -7.489639,
        18.526764, 158.59456, -11.616861, 27.672676, 154.29488, -7.663479,
        18.526764, 158.59456, -11.616861, 24.52617, 163.60635, -7.489639, 49.53784,
        156.5267, -5.136601, 27.672676, 154.29488, -7.663479, 31.91751, 162.20996,
        -6.039694, 55.20666, 156.2177, -5.979229, 49.53784, 156.5267, -5.136601,
        49.51957, 162.0504, -5.107384, 81.90382, 157.59846, -2.894408, 81.21935,
        156.93275, -4.420877, 81.222946, 162.07013, -4.384408, 19.44537, 3.272827,
        -3.696265, 17.35315, 12.685638, -2.006492, 18.201763, 9.164932, 5.284815,
        6.187064, 0.135803, 8.113768, 6.020106, 3.259644, 8.108295, 7.174605,
        3.248413, -3.767816, 6.020106, 3.259644, 8.108295, 8.301687, 12.628387,
        -2.009067, 7.174605, 3.248413, -3.767816, -0.09376, 166.86476, -10.624881,
        -0.09376, 171.74997, -7.982829, 8.178422, 171.5989, -5.172494, 8.178422,
        171.5989, -5.172494, 9.836856, 170.07367, 2.029528, 15.425283, 166.97174,
        0.344693, 18.201763, 9.164932, 5.284815, 15.078044, 12.997787, 6.992805,
        15.635592, 9.198776, 10.849604, 20.135124, 3.359085, 10.637484, 20.05241,
        0.16066, 10.61248, 19.321497, 0.175873, -3.667883, 15.635592, 9.198776,
        10.849604, 10.77498, 9.339417, 10.853382, 13.545893, 3.478439, 26.833542,
        8.271912, 9.111618, 5.260471, 6.020106, 3.259644, 8.108295, 10.77498,
        9.339417, 10.853382, 8.271912, 9.111618, 5.260471, 8.301687, 12.628387,
        -2.009067, 6.020106, 3.259644, 8.108295, 49.663254, 161.34015, 5.75894,
        49.54774, 164.96886, 0.358373, 31.661703, 165.58897, 0.511407, 49.54774,
        164.96886, 0.358373, 49.51957, 162.0504, -5.107384, 31.91751, 162.20996,
        -6.039694, 19.382471, 145.86487, 10.750969, 25.36803, 148.82236, 0.315778,
        25.705265, 154.30783, 7.506359, 49.56421, 152.10565, 0.325217, 49.53949,
        156.52638, 5.787483, 25.705265, 154.30783, 7.506359, 55.206707, 156.21768,
        6.628387, 49.53949, 156.52638, 5.787483, 49.56421, 152.10565, 0.325217,
        24.056355, 163.72849, 8.314461, 31.563528, 162.34445, 6.83536, 31.661703,
        165.58897, 0.511407, 24.362057, 168.27138, 0.509057, 15.425283, 166.97174,
        0.344693, 13.877506, 164.31694, 7.906994, 49.663254, 161.34015, 5.75894,
        55.179527, 162.15805, 6.573559, 55.19597, 165.39693, 0.36268, 55.19597,
        165.39693, 0.36268, 55.17948, 163.43588, -5.923852, 49.51957, 162.0504,
        -5.107384, 55.20666, 156.2177, -5.979229, 55.227478, 151.7283, 0.324563,
        49.56421, 152.10565, 0.325217, 27.672676, 154.29488, -7.663479, 49.53784,
        156.5267, -5.136601, 49.56421, 152.10565, 0.325217, 21.606522, 149.73053,
        -11.179743, 27.672676, 154.29488, -7.663479, 25.36803, 148.82236, 0.315778,
        31.661703, 165.58897, 0.511407, 31.91751, 162.20996, -6.039694, 24.52617,
        163.60635, -7.489639, 24.52617, 163.60635, -7.489639, 13.818137, 164.36447,
        -8.225239, 15.425283, 166.97174, 0.344693, -0.09376, 148.61722, 16.134731,
        -0.09376, 139.59744, 13.433695, 13.729069, 136.7114, 11.435217, 18.526764,
        158.59456, -11.616861, 21.606522, 149.73053, -11.179743, -0.09376,
        151.86748, -15.11038, -0.09376, 160.32742, 13.698597, -0.09376, 148.61722,
        16.134731, 18.520508, 157.41881, 11.07737, 15.425283, 166.97174, 0.344693,
        24.362057, 168.27138, 0.509057, 24.52617, 163.60635, -7.489639, 10.485514,
        102.66724, -14.434296, -0.09376, 98.418365, -15.257325, -0.09376, 109.24249,
        -14.044044, 7.136035, 90.488014, -9.226171, 2.82365, 92.80522, 0.252903,
        -0.09376, 94.0281, 0.299632, 10.485514, 102.66724, -14.434296, 17.120432,
        107.66594, -9.054958, 18.38024, 91.6555, -10.972906, 6.641512, 95.0891,
        9.730982, 17.076344, 105.438774, 9.754482, -0.09376, 102.23226, 12.219009,
        -0.09376, 96.421036, 10.384417, -0.09376, 94.0281, 0.299632, 6.641512,
        95.0891, 9.730982, 7.136035, 90.488014, -9.226171, -0.09376, 94.0281,
        0.299632, -0.09376, 92.21055, -8.49113, 6.517993, 173.45268, 7.865694,
        -0.09376, 166.95822, 9.955076, 7.20836, 167.89127, 7.94491, 6.462618,
        176.50154, -3.482457, -0.09376, 171.74997, -7.982829, -0.09376, 176.80714,
        -6.911478, 6.517993, 173.45268, 7.865694, 9.836856, 170.07367, 2.029528,
        7.510969, 174.74835, 2.385685, 7.510969, 174.74835, 2.385685, 8.178422,
        171.5989, -5.172494, 6.462618, 176.50154, -3.482457, 7.20836, 167.89127,
        7.94491, -0.09376, 160.32742, 13.698597, 13.877506, 164.31694, 7.906994,
        13.877506, 164.31694, 7.906994, 9.836856, 170.07367, 2.029528, 7.20836,
        167.89127, 7.94491, 13.877506, 164.31694, 7.906994, -0.09376, 160.32742,
        13.698597, 18.520508, 157.41881, 11.07737, 13.729069, 136.7114, 11.435217,
        -0.09376, 120.69466, 14.081373, 14.979034, 120.92279, 12.049509, 14.979034,
        120.92279, 12.049509, 20.169264, 132.6048, 0.303063, 13.729069, 136.7114,
        11.435217, 20.169264, 132.6048, 0.303063, 19.382471, 145.86487, 10.750969,
        13.729069, 136.7114, 11.435217, 14.979034, 120.92279, 12.049509, 20.681702,
        109.22975, 0.325292, 19.795479, 121.27292, 0.309567, -0.09376, 120.69466,
        14.081373, 17.076344, 105.438774, 9.754482, 14.979034, 120.92279, 12.049509,
        6.641512, 95.0891, 9.730982, 7.060736, 90.829704, 10.812244, 17.076344,
        105.438774, 9.754482, 7.060736, 90.829704, 10.812244, 16.502914, 69.84307,
        10.148636, 18.356476, 91.737785, 10.808916, 9.01251, 69.84324, 10.151785,
        15.941614, 64.0992, 8.971176, 16.502914, 69.84307, 10.148636, 18.356476,
        91.737785, 10.808916, 20.497984, 69.85565, 0.220555, 22.742304, 93.78615,
        0.195134, 22.742304, 93.78615, 0.195134, 17.076344, 105.438774, 9.754482,
        18.356476, 91.737785, 10.808916, 7.060736, 90.829704, 10.812244, 4.827405,
        69.84093, 0.216538, 9.01251, 69.84324, 10.151785, 6.641512, 95.0891,
        9.730982, 2.82365, 92.80522, 0.252903, 7.060736, 90.829704, 10.812244,
        4.827405, 69.84093, 0.216538, 9.499567, 64.09151, 8.967402, 9.01251,
        69.84324, 10.151785, 15.941614, 64.0992, 8.971176, 20.497984, 69.85565,
        0.220555, 16.502914, 69.84307, 10.148636, 15.941614, 64.0992, 8.971176,
        9.378332, 55.89525, 11.251183, 16.633041, 55.90477, 11.243004, 16.633041,
        55.90477, 11.243004, 9.248897, 44.59767, 8.078434, 16.856554, 44.600082,
        8.06889, 9.499567, 64.09151, 8.967402, 5.956378, 55.929947, -0.02751,
        9.378332, 55.89525, 11.251183, 5.956378, 55.929947, -0.02751, 9.248897,
        44.59767, 8.078434, 9.378332, 55.89525, 11.251183, 16.856554, 44.600082,
        8.06889, 19.530472, 55.92906, -0.028131, 16.633041, 55.90477, 11.243004,
        19.530472, 55.92906, -0.028131, 15.941614, 64.0992, 8.971176, 16.633041,
        55.90477, 11.243004, 9.248897, 44.59767, 8.078434, 6.526237, 14.201065,
        -1.76, 10.148842, 14.31868, 8.949894, 16.856554, 44.600082, 8.06889,
        10.148842, 14.31868, 8.949894, 15.715688, 14.336258, 8.946716, 21.06866,
        44.667236, -2.079227, 15.715688, 14.336258, 8.946716, 18.754826, 14.219406,
        -1.760128, 15.715688, 14.336258, 8.946716, 17.35315, 12.685638, -2.006492,
        18.754826, 14.219406, -1.760128, 10.148842, 14.31868, 8.949894, 8.301687,
        12.628387, -2.009067, 10.977517, 12.97049, 7.006327, 15.715688, 14.336258,
        8.946716, 10.977517, 12.97049, 7.006327, 15.078044, 12.997787, 6.992805,
        9.249185, 3.479156, 24.856838, 6.187064, 0.135803, 8.113768, 9.267356,
        0.199966, 24.781517, 15.078044, 12.997787, 6.992805, 10.77498, 9.339417,
        10.853382, 15.635592, 9.198776, 10.849604, 17.956377, 3.477707, 24.429726,
        14.046431, 0.201767, 26.635769, 17.936176, 0.203247, 24.357979, 24.056355,
        163.72849, 8.314461, 25.705265, 154.30783, 7.506359, 31.563528, 162.34445,
        6.83536, 31.563528, 162.34445, 6.83536, 49.53949, 156.52638, 5.787483,
        49.663254, 161.34015, 5.75894, 49.663254, 161.34015, 5.75894, 55.206707,
        156.21768, 6.628387, 55.179527, 162.15805, 6.573559, 55.179527, 162.15805,
        6.573559, 81.22, 156.57841, 5.457367, 81.22346, 162.54784, 5.420212,
        17.936176, 0.203247, 24.357979, 20.135124, 3.359085, 10.637484, 17.956377,
        3.477707, 24.429726, -0.09376, 160.0227, -13.901306, 13.818137, 164.36447,
        -8.225239, 18.526764, 158.59456, -11.616861, -0.09376, 151.86748, -15.11038,
        13.734596, 136.69167, -10.80815, -0.09376, 139.55891, -12.810705, -0.09376,
        120.73334, -11.827755, 13.734596, 136.69167, -10.80815, 14.974404,
        120.93446, -9.802008, 14.974404, 120.93446, -9.802008, 20.169264, 132.6048,
        0.303063, 19.795479, 121.27292, 0.309567, 25.36803, 148.82236, 0.315778,
        20.169264, 132.6048, 0.303063, 21.606522, 149.73053, -11.179743, 14.974404,
        120.93446, -9.802008, 20.681702, 109.22975, 0.325292, 17.120432, 107.66594,
        -9.054958, -0.09376, 120.73334, -11.827755, 17.120432, 107.66594, -9.054958,
        -0.09376, 109.24249, -14.044044, -0.09376, 98.418365, -15.257325, 18.38024,
        91.6555, -10.972906, 7.136035, 90.488014, -9.226171, 7.136035, 90.488014,
        -9.226171, 16.486572, 69.83636, -7.833611, 9.025639, 69.844345, -7.835956,
        9.025639, 69.844345, -7.835956, 15.912018, 64.09556, -6.982725, 9.526528,
        64.09047, -6.977741, 20.497984, 69.85565, 0.220555, 18.38024, 91.6555,
        -10.972906, 22.742304, 93.78615, 0.195134, 17.120432, 107.66594, -9.054958,
        22.742304, 93.78615, 0.195134, 18.38024, 91.6555, -10.972906, 7.136035,
        90.488014, -9.226171, 4.827405, 69.84093, 0.216538, 2.82365, 92.80522,
        0.252903, 5.955634, 64.05022, 0.160611, 9.025639, 69.844345, -7.835956,
        9.526528, 64.09047, -6.977741, 15.912018, 64.09556, -6.982725, 20.497984,
        69.85565, 0.220555, 19.995155, 64.06278, 0.16067, 9.385621, 55.99031,
        -8.496269, 15.912018, 64.09556, -6.982725, 16.629824, 55.997803, -8.483673,
        9.29512, 44.683228, -10.648571, 16.629824, 55.997803, -8.483673, 16.81305,
        44.68242, -10.639189, 9.526528, 64.09047, -6.977741, 5.956378, 55.929947,
        -0.02751, 5.955634, 64.05022, 0.160611, 4.283167, 44.66829, -2.080527,
        9.385621, 55.99031, -8.496269, 9.29512, 44.683228, -10.648571, 21.06866,
        44.667236, -2.079227, 16.629824, 55.997803, -8.483673, 19.530472, 55.92906,
        -0.028131, 15.912018, 64.09556, -6.982725, 19.530472, 55.92906, -0.028131,
        16.629824, 55.997803, -8.483673, 4.283167, 44.66829, -2.080527, 10.206265,
        14.23877, -9.063151, 6.526237, 14.201065, -1.76, 10.206265, 14.23877,
        -9.063151, 16.81305, 44.68242, -10.639189, 15.660956, 14.248123, -9.059662,
        15.660956, 14.248123, -9.059662, 21.06866, 44.667236, -2.079227, 18.754826,
        14.219406, -1.760128, 15.660956, 14.248123, -9.059662, 17.35315, 12.685638,
        -2.006492, 15.0754, 12.680801, -8.129285, 8.301687, 12.628387, -2.009067,
        10.206265, 14.23877, -9.063151, 11.002277, 12.65152, -8.135422, 11.002277,
        12.65152, -8.135422, 15.660956, 14.248123, -9.059662, 15.0754, 12.680801,
        -8.129285, 7.295623, 0.179794, -3.734459, 11.430022, 3.258652, -9.916503,
        11.477685, 0.192154, -9.811804, 7.174605, 3.248413, -3.767816, 11.002277,
        12.65152, -8.135422, 11.430022, 3.258652, -9.916503, 11.430022, 3.258652,
        -9.916503, 15.0754, 12.680801, -8.129285, 15.619944, 3.273636, -10.209295,
        15.0754, 12.680801, -8.129285, 19.44537, 3.272827, -3.696265, 15.619944,
        3.273636, -10.209295, 11.477685, 0.192154, -9.811804, 15.619944, 3.273636,
        -10.209295, 15.573531, 0.201416, -10.113838, 15.573531, 0.201416,
        -10.113838, 19.44537, 3.272827, -3.696265, 19.321497, 0.175873, -3.667883,
        27.672676, 154.29488, -7.663479, 24.52617, 163.60635, -7.489639, 31.91751,
        162.20996, -6.039694, 49.53784, 156.5267, -5.136601, 31.91751, 162.20996,
        -6.039694, 49.51957, 162.0504, -5.107384, 55.20666, 156.2177, -5.979229,
        49.51957, 162.0504, -5.107384, 55.17948, 163.43588, -5.923852, 81.90382,
        157.59846, -2.894408, 81.222946, 162.07013, -4.384408, 81.91503, 160.73541,
        -2.88169, 6.187064, 0.135803, 8.113768, 7.174605, 3.248413, -3.767816,
        7.295623, 0.179794, -3.734459, -0.09376, 166.86476, -10.624881, 8.178422,
        171.5989, -5.172494, 13.818137, 164.36447, -8.225239, 8.178422, 171.5989,
        -5.172494, 15.425283, 166.97174, 0.344693, 13.818137, 164.36447, -8.225239,
        18.201763, 9.164932, 5.284815, 15.635592, 9.198776, 10.849604, 20.135124,
        3.359085, 10.637484, 10.77498, 9.339417, 10.853382, 6.020106, 3.259644,
        8.108295, 9.249185, 3.479156, 24.856838, 20.135124, 3.359085, 10.637484,
        19.321497, 0.175873, -3.667883, 19.44537, 3.272827, -3.696265, 15.635592,
        9.198776, 10.849604, 13.545893, 3.478439, 26.833542, 17.956377, 3.477707,
        24.429726, 20.135124, 3.359085, 10.637484, 19.44537, 3.272827, -3.696265,
        18.201763, 9.164932, 5.284815, 15.635592, 9.198776, 10.849604, 17.956377,
        3.477707, 24.429726, 20.135124, 3.359085, 10.637484, 8.271912, 9.111618,
        5.260471, 10.77498, 9.339417, 10.853382, 10.977517, 12.97049, 7.006327,
        49.663254, 161.34015, 5.75894, 31.661703, 165.58897, 0.511407, 31.563528,
        162.34445, 6.83536, 49.54774, 164.96886, 0.358373, 31.91751, 162.20996,
        -6.039694, 31.661703, 165.58897, 0.511407, 49.56421, 152.10565, 0.325217,
        25.705265, 154.30783, 7.506359, 25.36803, 148.82236, 0.315778, 55.206707,
        156.21768, 6.628387, 49.56421, 152.10565, 0.325217, 55.227478, 151.7283,
        0.324563, 24.056355, 163.72849, 8.314461, 31.661703, 165.58897, 0.511407,
        24.362057, 168.27138, 0.509057, 24.362057, 168.27138, 0.509057, 13.877506,
        164.31694, 7.906994, 24.056355, 163.72849, 8.314461, 49.663254, 161.34015,
        5.75894, 55.19597, 165.39693, 0.36268, 49.54774, 164.96886, 0.358373,
        55.19597, 165.39693, 0.36268, 49.51957, 162.0504, -5.107384, 49.54774,
        164.96886, 0.358373, 55.20666, 156.2177, -5.979229, 49.56421, 152.10565,
        0.325217, 49.53784, 156.5267, -5.136601, 27.672676, 154.29488, -7.663479,
        49.56421, 152.10565, 0.325217, 25.36803, 148.82236, 0.315778, 31.661703,
        165.58897, 0.511407, 24.52617, 163.60635, -7.489639, 24.362057, 168.27138,
        0.509057, -0.09376, 148.61722, 16.134731, 13.729069, 136.7114, 11.435217,
        19.382471, 145.86487, 10.750969, 18.526764, 158.59456, -11.616861, -0.09376,
        151.86748, -15.11038, -0.09376, 160.0227, -13.901306, 10.485514, 102.66724,
        -14.434296, -0.09376, 109.24249, -14.044044, 17.120432, 107.66594,
        -9.054958, -0.09376, 92.21055, -8.49113, -0.09376, 98.418365, -15.257325,
        7.136035, 90.488014, -9.226171, 100.39602, 159.21793, 2.510687, 96.96137,
        158.60205, 2.731585, 94.68655, 158.19353, -1.553889, 105.4058, 159.10333,
        -6.076679, 100.03853, 161.89435, -5.892924, 101.834625, 162.20671, -2.13446,
        106.100746, 157.06691, 2.106632, 100.39602, 159.21793, 2.510687, 100.9258,
        158.86504, -2.051573, 100.39602, 159.21793, 2.510687, 106.100746, 157.06691,
        2.106632, 106.76349, 159.0707, 2.119013, 106.46155, 157.04564, -2.474645,
        104.734375, 157.09349, -5.95056, 105.4058, 159.10333, -6.076679, 94.41528,
        162.21555, -1.51487, 101.834625, 162.20671, -2.13446, 100.03853, 161.89435,
        -5.892924, 99.04054, 159.28145, -5.831779, 100.9258, 158.86504, -2.051573,
        94.68655, 158.19353, -1.553889, 101.834625, 162.20671, -2.13446, 101.39634,
        161.8562, 2.465956, 106.76349, 159.0707, 2.119013, 99.04054, 159.28145,
        -5.831779, 100.03853, 161.89435, -5.892924, 105.4058, 159.10333, -6.076679,
        100.9258, 158.86504, -2.051573, 99.04054, 159.28145, -5.831779, 104.734375,
        157.09349, -5.95056, 96.96137, 158.60205, 2.731585, 94.1946, 158.37016,
        6.331047, 94.68655, 158.19353, -1.553889, 94.41528, 162.21555, -1.51487,
        97.4427, 161.9928, 2.784914, 101.39634, 161.8562, 2.465956, 106.76349,
        159.0707, 2.119013, 106.100746, 157.06691, 2.106632, 106.46155, 157.04564,
        -2.474645, 93.041275, 152.63966, 14.020803, 94.47081, 151.68024, 12.571562,
        95.44343, 153.33739, 12.615957, 91.14928, 153.72879, 10.707344, 87.2894,
        155.20001, 7.249554, 90.56618, 154.33694, 5.23115, 89.31882, 158.6334,
        8.145693, 94.1946, 158.37016, 6.331047, 93.97656, 161.52509, 6.579082,
        100.43125, 159.18132, 6.443607, 105.99759, 157.00198, 6.354237, 106.58132,
        158.94032, 6.322006, 100.03853, 161.89435, -5.892924, 99.04054, 159.28145,
        -5.831779, 87.928535, 156.95886, -4.182884, 100.20909, 159.1756, 3.252394,
        96.96137, 158.60205, 2.731585, 97.4427, 161.9928, 2.784914, 106.58132,
        158.94032, 6.322006, 105.99759, 157.00198, 6.354237, 105.97471, 157.05695,
        3.642189, 93.97656, 161.52509, 6.579082, 101.3496, 161.76689, 6.537149,
        101.329926, 161.85464, 3.384033, 100.20909, 159.1756, 3.252394, 100.43125,
        159.18132, 6.443607, 94.1946, 158.37016, 6.331047, 106.47232, 159.14801,
        3.434637, 101.329926, 161.85464, 3.384033, 101.3496, 161.76689, 6.537149,
        100.20909, 159.1756, 3.252394, 101.329926, 161.85464, 3.384033, 106.47232,
        159.14801, 3.434637, 100.43125, 159.18132, 6.443607, 100.20909, 159.1756,
        3.252394, 105.97471, 157.05695, 3.642189, 90.56618, 154.33694, 5.23115,
        94.1946, 158.37016, 6.331047, 94.57143, 155.2693, 9.122351, 93.28396,
        152.58038, 9.396738, 94.57143, 155.2693, 9.122351, 95.44343, 153.33739,
        12.615957, 92.94248, 156.42589, 10.779707, 93.61259, 154.32712, 13.875965,
        95.44343, 153.33739, 12.615957, 91.14928, 153.72879, 10.707344, 93.28396,
        152.58038, 9.396738, 94.47081, 151.68024, 12.571562, 92.94248, 156.42589,
        10.779707, 94.57143, 155.2693, 9.122351, 94.1946, 158.37016, 6.331047,
        89.31882, 158.6334, 8.145693, 87.2894, 155.20001, 7.249554, 91.14928,
        153.72879, 10.707344, 91.14928, 153.72879, 10.707344, 93.041275, 152.63966,
        14.020803, 93.61259, 154.32712, 13.875965, 90.56618, 154.33694, 5.23115,
        94.68655, 158.19353, -1.553889, 94.1946, 158.37016, 6.331047, 87.2894,
        155.20001, 7.249554, 85.3293, 155.22197, 1.214287, 90.56618, 154.33694,
        5.23115, 81.90382, 157.59846, -2.894408, 85.3293, 155.22197, 1.214287,
        81.929375, 155.8176, 0.303644, 87.2894, 155.20001, 7.249554, 89.31882,
        158.6334, 8.145693, 81.8269, 157.56055, 3.579102, 97.4427, 161.9928,
        2.784914, 96.96137, 158.60205, 2.731585, 100.39602, 159.21793, 2.510687,
        100.39602, 159.21793, 2.510687, 94.68655, 158.19353, -1.553889, 100.9258,
        158.86504, -2.051573, 105.4058, 159.10333, -6.076679, 101.834625, 162.20671,
        -2.13446, 107.06832, 159.15373, -2.570219, 106.100746, 157.06691, 2.106632,
        100.9258, 158.86504, -2.051573, 106.46155, 157.04564, -2.474645, 100.39602,
        159.21793, 2.510687, 106.76349, 159.0707, 2.119013, 101.39634, 161.8562,
        2.465956, 81.91503, 160.73541, -2.88169, 100.03853, 161.89435, -5.892924,
        87.928535, 156.95886, -4.182884, 97.4427, 161.9928, 2.784914, 94.41528,
        162.21555, -1.51487, 86.73325, 161.49197, 5.668367, 106.46155, 157.04564,
        -2.474645, 105.4058, 159.10333, -6.076679, 107.06832, 159.15373, -2.570219,
        101.834625, 162.20671, -2.13446, 106.76349, 159.0707, 2.119013, 107.06832,
        159.15373, -2.570219, 99.04054, 159.28145, -5.831779, 105.4058, 159.10333,
        -6.076679, 104.734375, 157.09349, -5.95056, 100.9258, 158.86504, -2.051573,
        104.734375, 157.09349, -5.95056, 106.46155, 157.04564, -2.474645, 94.41528,
        162.21555, -1.51487, 101.39634, 161.8562, 2.465956, 101.834625, 162.20671,
        -2.13446, 106.76349, 159.0707, 2.119013, 106.46155, 157.04564, -2.474645,
        107.06832, 159.15373, -2.570219, 93.041275, 152.63966, 14.020803, 95.44343,
        153.33739, 12.615957, 93.61259, 154.32712, 13.875965, 91.14928, 153.72879,
        10.707344, 90.56618, 154.33694, 5.23115, 93.28396, 152.58038, 9.396738,
        89.31882, 158.6334, 8.145693, 93.97656, 161.52509, 6.579082, 86.73325,
        161.49197, 5.668367, 100.43125, 159.18132, 6.443607, 106.58132, 158.94032,
        6.322006, 101.3496, 161.76689, 6.537149, 93.97656, 161.52509, 6.579082,
        97.4427, 161.9928, 2.784914, 86.73325, 161.49197, 5.668367, 100.20909,
        159.1756, 3.252394, 97.4427, 161.9928, 2.784914, 101.329926, 161.85464,
        3.384033, 106.58132, 158.94032, 6.322006, 105.97471, 157.05695, 3.642189,
        106.47232, 159.14801, 3.434637, 93.97656, 161.52509, 6.579082, 101.329926,
        161.85464, 3.384033, 97.4427, 161.9928, 2.784914, 100.20909, 159.1756,
        3.252394, 94.1946, 158.37016, 6.331047, 96.96137, 158.60205, 2.731585,
        93.97656, 161.52509, 6.579082, 100.43125, 159.18132, 6.443607, 101.3496,
        161.76689, 6.537149, 94.1946, 158.37016, 6.331047, 100.43125, 159.18132,
        6.443607, 93.97656, 161.52509, 6.579082, 106.47232, 159.14801, 3.434637,
        101.3496, 161.76689, 6.537149, 106.58132, 158.94032, 6.322006, 100.20909,
        159.1756, 3.252394, 106.47232, 159.14801, 3.434637, 105.97471, 157.05695,
        3.642189, 100.43125, 159.18132, 6.443607, 105.97471, 157.05695, 3.642189,
        105.99759, 157.00198, 6.354237, 94.41528, 162.21555, -1.51487, 100.03853,
        161.89435, -5.892924, 81.89653, 162.03973, 0.337693, 90.56618, 154.33694,
        5.23115, 94.57143, 155.2693, 9.122351, 93.28396, 152.58038, 9.396738,
        93.28396, 152.58038, 9.396738, 95.44343, 153.33739, 12.615957, 94.47081,
        151.68024, 12.571562, 92.94248, 156.42589, 10.779707, 95.44343, 153.33739,
        12.615957, 94.57143, 155.2693, 9.122351, 91.14928, 153.72879, 10.707344,
        94.47081, 151.68024, 12.571562, 93.041275, 152.63966, 14.020803, 92.94248,
        156.42589, 10.779707, 94.1946, 158.37016, 6.331047, 89.31882, 158.6334,
        8.145693, 89.31882, 158.6334, 8.145693, 91.14928, 153.72879, 10.707344,
        92.94248, 156.42589, 10.779707, 91.14928, 153.72879, 10.707344, 93.61259,
        154.32712, 13.875965, 92.94248, 156.42589, 10.779707, 94.68655, 158.19353,
        -1.553889, 87.928535, 156.95886, -4.182884, 99.04054, 159.28145, -5.831779,
        87.928535, 156.95886, -4.182884, 94.68655, 158.19353, -1.553889, 90.56618,
        154.33694, 5.23115, 87.928535, 156.95886, -4.182884, 85.3293, 155.22197,
        1.214287, 81.90382, 157.59846, -2.894408, 81.90382, 157.59846, -2.894408,
        81.91503, 160.73541, -2.88169, 87.928535, 156.95886, -4.182884, 86.73325,
        161.49197, 5.668367, 81.89653, 162.03973, 0.337693, 81.87567, 160.77011,
        3.55191, 97.4427, 161.9928, 2.784914, 100.39602, 159.21793, 2.510687,
        101.39634, 161.8562, 2.465956, 86.73325, 161.49197, 5.668367, 94.41528,
        162.21555, -1.51487, 81.89653, 162.03973, 0.337693, 81.89653, 162.03973,
        0.337693, 100.03853, 161.89435, -5.892924, 81.91503, 160.73541, -2.88169,
        85.3293, 155.22197, 1.214287, 87.2894, 155.20001, 7.249554, 81.8269,
        157.56055, 3.579102, 85.3293, 155.22197, 1.214287, 87.928535, 156.95886,
        -4.182884, 90.56618, 154.33694, 5.23115, 81.21935, 156.93275, -4.420877,
        81.929375, 155.8176, 0.303644, 81.223526, 152.92778, -0.059091, 81.21935,
        156.93275, -4.420877, 81.223526, 152.92778, -0.059091, 55.20666, 156.2177,
        -5.979229, 55.20666, 156.2177, -5.979229, 81.223526, 152.92778, -0.059091,
        55.227478, 151.7283, 0.324563, 81.22346, 162.54784, 5.420212, 55.19597,
        165.39693, 0.36268, 55.179527, 162.15805, 6.573559, 81.222946, 162.07013,
        -4.384408, 55.19597, 165.39693, 0.36268, 81.231766, 164.42244, -0.027995,
        81.222946, 162.07013, -4.384408, 81.231766, 164.42244, -0.027995, 81.91503,
        160.73541, -2.88169, 81.91503, 160.73541, -2.88169, 81.231766, 164.42244,
        -0.027995, 81.89653, 162.03973, 0.337693, 81.223526, 152.92778, -0.059091,
        55.206707, 156.21768, 6.628387, 55.227478, 151.7283, 0.324563, 81.22,
        156.57841, 5.457367, 81.8269, 157.56055, 3.579102, 81.22346, 162.54784,
        5.420212, 81.22346, 162.54784, 5.420212, 81.8269, 157.56055, 3.579102,
        81.87567, 160.77011, 3.55191, 81.21935, 156.93275, -4.420877, 81.90382,
        157.59846, -2.894408, 81.929375, 155.8176, 0.303644, 81.87567, 160.77011,
        3.55191, 81.89653, 162.03973, 0.337693, 81.231766, 164.42244, -0.027995,
        81.87567, 160.77011, 3.55191, 81.231766, 164.42244, -0.027995, 81.22346,
        162.54784, 5.420212, 81.22346, 162.54784, 5.420212, 81.231766, 164.42244,
        -0.027995, 55.19597, 165.39693, 0.36268, 81.222946, 162.07013, -4.384408,
        55.17948, 163.43588, -5.923852, 55.19597, 165.39693, 0.36268, 81.929375,
        155.8176, 0.303644, 81.8269, 157.56055, 3.579102, 81.22, 156.57841,
        5.457367, 81.929375, 155.8176, 0.303644, 81.22, 156.57841, 5.457367,
        81.223526, 152.92778, -0.059091, 81.223526, 152.92778, -0.059091, 81.22,
        156.57841, 5.457367, 55.206707, 156.21768, 6.628387, 81.21935, 156.93275,
        -4.420877, 55.20666, 156.2177, -5.979229, 55.17948, 163.43588, -5.923852,
        81.21935, 156.93275, -4.420877, 55.17948, 163.43588, -5.923852, 81.222946,
        162.07013, -4.384408, 7.060736, 90.829704, 10.812244, 18.356476, 91.737785,
        10.808916, 17.076344, 105.438774, 9.754482, 85.3293, 155.22197, 1.214287,
        81.8269, 157.56055, 3.579102, 81.929375, 155.8176, 0.303644, 6.187064,
        0.135803, 8.113768, 14.046431, 0.201767, 26.635769, 9.267356, 0.199966,
        24.781517, 19.321497, 0.175873, -3.667883, 11.477685, 0.192154, -9.811804,
        15.573531, 0.201416, -10.113838, 6.187064, 0.135803, 8.113768, 7.295623,
        0.179794, -3.734459, 19.321497, 0.175873, -3.667883, 20.05241, 0.16066,
        10.61248, 6.187064, 0.135803, 8.113768, 19.321497, 0.175873, -3.667883,
        11.477685, 0.192154, -9.811804, 19.321497, 0.175873, -3.667883, 7.295623,
        0.179794, -3.734459, 25.705265, 154.30783, 7.506359, 18.520508, 157.41881,
        11.07737, 19.382471, 145.86487, 10.750969, 18.520508, 157.41881, 11.07737,
        25.705265, 154.30783, 7.506359, 24.056355, 163.72849, 8.314461, 6.494093,
        181.6082, 12.778654, 2.81612, 181.55959, 14.82626, 5.42092, 173.86244,
        12.336845, 9.073339, 181.68558, 8.14398, 6.517993, 173.45268, 7.865694,
        10.234788, 181.78899, 1.891512, 9.073339, 181.68558, 8.14398, 9.271723,
        187.808, 8.350927, 6.494093, 181.6082, 12.778654, 9.271723, 187.808,
        8.350927, 7.593648, 187.34822, 13.10606, 6.494093, 181.6082, 12.778654,
        81.8269, 157.56055, 3.579102, 89.31882, 158.6334, 8.145693, 86.73325,
        161.49197, 5.668367, 81.8269, 157.56055, 3.579102, 86.73325, 161.49197,
        5.668367, 81.87567, 160.77011, 3.55191, 20.169264, 132.6048, 0.303063,
        13.734596, 136.69167, -10.80815, 21.606522, 149.73053, -11.179743,
        13.545893, 3.478439, 26.833542, 9.249185, 3.479156, 24.856838, 9.267356,
        0.199966, 24.781517, 14.046431, 0.201767, 26.635769, 20.05241, 0.16066,
        10.61248, 17.936176, 0.203247, 24.357979, 10.77498, 9.339417, 10.853382,
        9.249185, 3.479156, 24.856838, 13.545893, 3.478439, 26.833542, 20.05241,
        0.16066, 10.61248, 14.046431, 0.201767, 26.635769, 6.187064, 0.135803,
        8.113768,
    ];
}

//
// sounds.ts
//

"use strict";

function soundPickUp() {
    return tune`
83.33333333333333: E5-83.33333333333333,
83.33333333333333: D5-83.33333333333333,
83.33333333333333: G5-83.33333333333333,
2416.6666666666665`;
}

function soundExplosion() {
    return tune`
37.5: C4-37.5 + D4-37.5 + E4-37.5 + B5-37.5 + F4/37.5,
37.5: C4-37.5 + D4-37.5 + E4/37.5 + F4^37.5,
37.5: C4-37.5 + D4/37.5 + E4/37.5,
37.5: C4-37.5 + D4^37.5,
37.5: C4-37.5 + D4/37.5,
37.5: C4-37.5 + D4^37.5,
37.5: C4/37.5,
937.5`;
}

function soundPew() {
    return tune`
42.73504273504273: E5-42.73504273504273,
1324.7863247863247`;
}

function soundDeath() {
    return tune`
5000: C5^5000 + D5-5000,
155000`;
}

function soundEnemyAttack() {
    return tune`
41.899441340782126: E5/41.899441340782126 + G5/41.899441340782126,
1298.8826815642458`;
}

function soundStageUp() {
    return tune`
120: B4^120 + G4~120,
120: D5^120 + B4~120,
120: G5^120 + E5~120,
3480`;
}

function soundSettingChange() {
    return tune`
666.6666666666666: C5^666.6666666666666,
20666.666666666664`;
}

function soundMenuMusic() {
    return tune`
5000: B4/5000 + C4-5000,
5000: C5/5000 + E4-5000,
5000: B4/5000 + C4-5000,
5000: E4-5000 + G4/5000,
5000: C4-5000 + C5/5000,
5000: E5/5000 + G4-5000,
5000: A4/5000 + C4-5000,
5000: C5/5000 + F4-5000,
5000: B4/5000 + C4-5000,
5000: C5/5000 + G4-5000,
5000: B4/5000 + C4-5000,
5000: G4/5000 + E4-5000,
5000: E5/5000 + C5/5000 + F4-5000,
5000: A4/5000 + D4-5000,
5000: B4^5000 + E4-5000,
5000: C5^5000 + F4-5000,
5000: B4^5000 + E4-5000,
5000: G4^5000 + C4-5000,
5000: E5^5000 + F4-5000,
5000: G5^5000 + G4-5000,
5000: E5^5000 + F4-5000,
5000: A4^5000 + C4-5000,
5000: C5^5000 + F4-5000,
5000: F5^5000 + G4-5000,
5000: E5^5000 + F4-5000,
5000: G4^5000 + C4-5000,
5000: E4^5000,
5000,
5000: B4/5000,
5000,
5000: B4/5000,
5000`;
}


