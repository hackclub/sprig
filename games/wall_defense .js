/*
@title: wall_defense
@author: Danger
@version: 1.4 (alpha)
@objective: protect the walls of the city from waves of enemies

NOTE:  Any suggestion on how to make an enemy hp system is welcome.

*/
//sprites
const player = "p"
const wall = "w"
//attacks
const fireball = "j"
const lightning_bolt = "i"
const earth_wall = "k"
const water_strike = "l"
//background
const dirt = "h"
const floor = "f"
const street = "s"
const street_under = "u"
const street_top = "t"
//enemies
const enemy_one = "a"
const enemy_two = "b"
const enemy_three = "c"
const enemy_four = "d"
const enemy_five = "e"
const enemy_boss = "g"
const tower = "q"
const enemy_necromancer = "n"
const grave = "m"
setLegend(
  [wall, bitmap`
01LLL0LLLLLLLLLL
01L1101111L1111L
01L11011L1L11L1L
01L1101L11L1L11L
0LL11011L1L11L1L
01L1101L11L1L11L
01LLL01111L1111L
01L110LLLLLLLLLL
01L110LLLLLLLLLL
0LL1101111L1111L
01L11011L1L11L1L
01L1101L11L1L11L
01LLL011L1L11L1L
0LL1101L11L1L11L
01L1101111L1111L
01L110LLLLLLLLLL`],
  [player, bitmap`
..0....00000....
.030..0666660...
0C3C0.0CCCCC0...
.0C0..07C7CC0...
.0C0..0CCCCC0...
.0C0...0CCC00...
.0C0...00000....
.00000000000000.
.0C110FF333FF010
.000000FF3FF0010
.0C0.010FFF010C0
.0C0.0110F01100.
.0C0.000000000..
.0C0..010.010...
.0C0..010.010...
..0...000.000...`],
  //projectiles
  [fireball, bitmap`
................
.....33333333...
...333399999333.
..33999666933...
.3392666666933..
.39266666693....
.39666666693....
.3966666666933..
.396666666669333
.3926666666933..
.33926666693....
..33999999993...
...33333333333..
................
................
................`],
  [lightning_bolt, bitmap`
........6.......
.........6......
........6.......
.....666666.....
..6.66727766....
.6.6777727776...
...6727777276...
...67772277766.6
...6727227726.6.
...6772777276...
...6777777776...
....67772776....
...6.666666.....
..6.......6.6...
...6.......6.6..
..6.............`],
  [earth_wall, bitmap`
....000.........
...0CCC0222.2...
...0CCC0........
..0CCCC0........
..0CCCC022.2....
..0CCCC0........
..0CCCC0222.2...
..0CCCC0........
..0CCCC0222.2...
..0CCCC0........
..0CCCC0........
..0CCCC02222.2..
.0CCCCC0........
.0CCCCC0........
.0CCCCC0222.2...
.0CCCCC0........`],
  [water_strike, bitmap`
..........27....
.........277777.
..........27....
..27....7.......
.27777.........7
..27.......7....
.......277......
......277777....
.....2777777777.
......277777....
.......277.....7
.27.............
27777..7..27....
.27......27777..
..........27....
................`],
  //enemies
  [enemy_one, bitmap`
........000000..
........088DD0..
........0DD0D0..
........0DDDD0..
.......00DD000..
......00DDDDD0..
.....00DD000000.
....00DDD0CCDD0.
....0CCCCC000000
....0CCDCCCCCDD0
....0CDDCC000000
....0CCCCC0.....
...00CCCCC00....
..0CCC000CC00...
.0DD00..00DD0...
.0000....0000...`],
  [enemy_two, bitmap`
......3333333...
.......3922223..
......39922023..
.......3922223..
....3..3922223..
..3..333999923..
...3339999333...
....399993......
..3.3966993.....
...33996693.....
....3996693.....
....3999993.....
....39339933....
....393.39933...
..3.3223.3223...
...33333.3333...`],
  [enemy_three, bitmap`
................
......7.........
.....7.7........
......7......7..
............7.7.
..7..........7..
.7.7............
..7...000000....
.....07277720...
....0777272770..
....0777777770..
...07777277270..
...07777777770..
...077772227770.
.00777727772770.
077777777777770.`],
  [enemy_four, bitmap`
.....00000......
....0LLLLL0.....
....0LL4L40.....
..000LLLLL0000..
.00DDLLLLLDDD00.
.0LLLDDDLLLLLD00
00L0LLLLDDDL0LL0
0DL0L4DLLL000LL0
0LD0LD4LLD0.0LL0
0L0.0LLDDL0.0LL0
000.0DDLLL0..000
....0LLLLLD0....
...0LL0000LD0...
...0LD0..0LL0...
...0DL0..0LL0...
...0000..0000...`],
  [enemy_five, bitmap`
...7.77...7.....
..7.7627...7....
.....7627.7.....
..7...7627...7..
.7.7.766667.7.7.
....76676767....
...7666666667...
...7666676627...
..7.766767277...
.7..76666627.7..
..7..766667...7.
....7.76667..7..
...7...7667.....
........7667.7..
.....7.7.7667.7.
......7...77....`],
  [enemy_boss, bitmap`
............0...
...H.......060..
H.....0.0.03670.
.....0F0F003470.
..H.0FFFF00040..
H...0CCHC0.0C0..
....0CCCC0.0C0..
H..0L00CC0.0C0..
..055LLL0..0C0..
..055555000000..
.H055555555LC0..
..055555555L00..
H.0555555000C0..
.055555550.0C0..
.055555550.0C0..
0555555550.000..`],
  [tower, bitmap`
................
.......3.6......
......33.66.....
................
....L.44.77.L...
....L..4.7..L...
....LL.....LL...
.....LL...LL....
......LLLLL.....
......LLLLL.....
......LLLLL.....
......LLLLL.....
......LLLLL.....
.....LLLLLLL....
....LLLLLLLLL...
...LLLLLLLLLLL..`],
  [enemy_necromancer, bitmap`
................
................
........00......
......00LL0...4.
.....0LL0000....
.....0L02220...4
....0LL02420.4..
....0LL02220....
...0LLLL0220000.
...0LLLLL00LLL20
..0LLLLLLLLLLL0.
..0LLLLLLLLL00..
..0LLLLLLLLL0...
..0LLLLLLLLL0...
.0LLLLLLLLLL0...
0LLLLLLLLLLL0...`],
  [grave, bitmap`
................
................
................
................
................
................
................
................
................
................
.......000......
......02220.....
......02020.....
...0..022200....
..0200CCC20200..
.02CC222CCCC2C0.`],
  //background
  [dirt, bitmap`
DDDDDDDD4DDDDDDD
DDDD4DDDDDDD4DDD
DD4DDDD0DDD0DD0D
0D0DDD0C0D0C00C0
C0C0D0CCC0CCCCCC
CCLC0C1CCCCCCCCC
1CCCCCCCCLCCCC1C
CCCCLCCCCCCCLCCC
CCCCCCC1CCCCCCCC
CCC1CCCCCCCCCCCC
LCCC0CCC0CCC1CCC
C0C0D0C0D0CCCCLC
0D0DDD0DDD0C00C0
DDDDDDD4DDD0DD0D
DD4DDDDDDDD4DDDD
4DDDDDDD4DDDDD4D`],
  [floor, bitmap`
DDDDDDDD4DDDDDDD
DDDDDDDDDDDD4DDD
DD4DDD4DDD4DDDDD
DDDDDDDDDDDDDD4D
DDDDD4DDDDDDDDDD
DD4DDDDDD4DDDDDD
DDDDDDD4DDD4DD4D
DDD4DDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DD4DDDDDD4DD4DDD
4DDDDD4DDDDDDDDD
DDDDDDDDDDDDDDDD
DDD4DDDDDD4DD4DD
DDDDDD4DDDDDDDDD
DD4DDDDDD4DDD4DD
DDDDDDDDDDDDDDDD`],
  [street, bitmap`
11L1111L111L111L
11L1111L111L11L1
111L1LL111L11L11
1LL111LL1LL1L1L1
1L1L1L11L11L11LL
LL11L11111L11L11
L1111L111L11L11L
LLLL11LLL1LL1LL1
11L1L111L1L111L1
1L11LL11L11L1L1L
L11L11LL1111LL11
11L11L11L1LL11LL
LL1L11L11LL1L111
1L1L1LL1L111LL11
1L11L11LLL1L11LL
1L1L11L111L1111L`],
  [street_top, bitmap`
LLLLLLLLLLLLLLLL
1L1111L11L11111L
11L11L111LL111LL
11L11L11111L11L1
111LL1LL1LLL1LL1
111L1111L111L111
L1L1L111L1111L11
1L111LL1L11111LL
1L11L11LL11LLL11
1L11L1111LL11111
1L11L111L11LL111
11LL1L1L11111L11
L1111L1L1L1111L1
1L1111L1L1LL1L1L
11LL1L11L111L111
1111L111L111L111`],
  [street_under, bitmap`
1111L111L111L111
11LL1L11L111L111
1L1111L1L1LL1L1L
L1111L1L1L1111L1
1LLLL11L11111L11
1L11L111L11LL111
1L11L1111LL11111
1L11L11LL11LLL11
1L111LL1L11111LL
L1L1L111L1111L11
111L1111L111L111
111LL1LL1LLL1LL1
11L11L11111L11L1
11L11L111LL111LL
1L1111L11L11111L
LLLLLLLLLLLLLLLL`]
)

setSolids([enemy_one, enemy_two, enemy_three, enemy_four, enemy_five, enemy_boss, enemy_necromancer]);
setBackground(dirt);
const level = [map`
fffffffffffffw
fffffffffffffw
tttttttttttttw
sssssssssssssw
uuuuuuuuuuuuuw
fffffffffffffw
fffffffffffffw`, ]

setMap(level[0])

setPushables({
  [enemy_one]: [enemy_one, enemy_two, enemy_three, enemy_four, enemy_five, enemy_boss, enemy_necromancer],
  [enemy_two]: [enemy_one, enemy_two, enemy_three, enemy_four, enemy_five, enemy_boss, enemy_necromancer],
  [enemy_three]: [enemy_one, enemy_two, enemy_three, enemy_four, enemy_five, enemy_boss, enemy_necromancer],
  [enemy_four]: [enemy_one, enemy_two, enemy_three, enemy_four, enemy_five, enemy_boss, enemy_necromancer],
  [enemy_five]: [enemy_one, enemy_two, enemy_three, enemy_four, enemy_five, enemy_boss, enemy_necromancer],
  [enemy_boss]: [enemy_one, enemy_two, enemy_three, enemy_four, enemy_five, enemy_boss, enemy_necromancer],
  [enemy_necromancer]: [enemy_one, enemy_two, enemy_three, enemy_four, enemy_five, enemy_boss, enemy_necromancer]
})
//Variables
const crystal_price = 20,
  price_multiplier = 1;
let bool = true,
  clean = true,
  repetition = false;
let diff,
  waves = 20,
  score = 0,
  n = 1,
  time = 2,
  hp = 3,
  cash = 0,
  bombs = 0,
  snowglobe = 0,
  //price increase of objects in the shop
  hppi = 1,
  bombpi = 1,
  snwglbpi = 1;
addSprite(12, 3, player);
//bomb= instakill all enemies in same row , snowglobe= kill all enemies
//TIME 0=FIGHT, 1=CHOICE(A=CONTINUE, D=SHOP), 2=START, 3=CONTINUE, 4=SHOP, 5=END(WIN/LOSE), 6=TUTORIAL TEXTS.
//DIFFICULTY 0=TUTORIAL(TEXT HELP), 1=NORMAL(20 WAVES, 2 BOSSES[10,20]), 2=HELL(40 WAVES, CHANCES TO SPAWN BOSSES RANDOMLY), 3= INFINITE(ADDED SCORE)
onInput("a", () => {
  if (time === 2) {
    time = 6;
    diff = 0;
    waves = 5;
  }
  if (time === 6) {
    clearText();
    //tutorial text
    if (n === 1) {
      addText("Press W/S", {
        x: 5,
        y: 4,
        color: color`2`
      })
      addText("to move Up/Down", {
        x: 2,
        y: 5,
        color: color`2`
      })
      addText("Press J/I/K/L", {
        x: 3,
        y: 7,
        color: color`2`
      })
      addText("to attack", {
        x: 5,
        y: 8,
        color: color`2`
      })
      addText("Press A/D", {
        x: 5,
        y: 10,
        color: color`2`
      })
      addText("to use the objects", {
        x: 1,
        y: 11,
        color: color`2`
      })
    }
    if (n === 2) {
      addText("FIRE beats EARTH", {
        x: 2,
        y: 4,
        color: color`2`
      })
      addText("EARTH beats ELECTRIC", {
        x: 0,
        y: 5,
        color: color`2`
      })
      addText("ELECTRIC beats WATER", {
        x: 0,
        y: 6,
        color: color`2`
      })
      addText("WATER beats FIRE", {
        x: 2,
        y: 7,
        color: color`2`
      })
    }
    if (n === 3) {
      addText("Enemies might dodge", {
        x: 0,
        y: 4,
        color: color`2`
      })
      addText("Enemies are selected", {
        x: 0,
        y: 6,
        color: color`2`
      })
      addText("randomly", {
        x: 6,
        y: 7,
        color: color`2`
      })
    }
    if (n === 4) {
      addText("Necromancers", {
        x: 4,
        y: 4,
        color: color`2`
      })
      addText("resurrect enemies", {
        x: 1,
        y: 5,
        color: color`2`
      })
      addText("from their graves", {
        x: 1,
        y: 6,
        color: color`2`
      })
    }
    if (n === 5) {
      addText("Mages are invincible", {
        x: 0,
        y: 4,
        color: color`2`
      })
      addText("destroy towers to", {
        x: 1,
        y: 5,
        color: color`2`
      })
      addText("make them vulnerable", {
        x: 0,
        y: 6,
        color: color`2`
      })
    }
    addText("Do NOT press A now", {
      x: 1,
      y: 15,
      color: color`2`
    })
    setTimeout(() => {
      clearText();
      addText("Press Any button ", {
        x: 2,
        y: 5,
        color: color`2`
      })
      addText("to continue", {
        x: 5,
        y: 6,
        color: color`2`
      })
      time = 3;
    }, 6000);
  }
  if (time === 0 && bombs > 0)
    bomb_code();
  if (time === 1 || time === 4) {
    clearText();
    if (diff === 0) {
      addText("Press A ", {
        x: 6,
        y: 5,
        color: color`2`
      })
      addText("to continue", {
        x: 4,
        y: 6,
        color: color`2`
      })
      time = 6;
    } else
      time = 3;
  }
})

function bomb_code() {
  let x;
  for (x = 0; x <= 11; x++) {
    playTune(boom)
    getTile(x, getFirst(player).y).forEach(sprite => {
      switch (sprite.type) {
        case "a":
          sprite.remove();
          break;
        case "b":
          sprite.remove();
          break;
        case "c":
          sprite.remove();
          break;
        case "d":
          sprite.remove();
          cash += 2;
          break;
        case "e":
          sprite.remove();
          break;
        case "g":
          sprite.remove();
          break;
        case "n":
          sprite.remove();
          break;
      }
    })
  }
  bombs -= 1;
}
onInput("w", () => {
  if (time === 2) {
    time = 3;
    diff = 1;
    clearText();
  }
  if (time === 0) {
    getFirst(player).y -= 1
    playTune(move)
  }
  if (time === 4 && cash >= 30 * bombpi) {
    playTune(buy)
    cash -= 30 * bombpi;
    bombs += 1;
    bombpi += price_multiplier;
  }
})
onInput("s", () => {
  if (time === 0) {
    getFirst(player).y += 1
    playTune(move)
  }
  if (time === 4 && cash >= 50 * snwglbpi) {
    playTune(buy)
    cash -= 50 * snwglbpi;
    snowglobe += 1;
    snwglbpi += price_multiplier;
  }
})
onInput("d", () => {
  if (time === 0 && snowglobe > 0) {
    playTune(shatter)
    snowstorm(enemy_one);
    snowstorm(enemy_two);
    snowstorm(enemy_three);
    snowstorm(enemy_four);
    snowstorm(enemy_five);
    snowglobe--;
  }
  if (time === 1) {
    setTimeout(() => {
      time = 4;
      clearText();
    }, 10);
  }
  if (time === 4 && cash >= 10 * hppi) {
    playTune(buy)
    cash -= 10 * hppi;
    hp += 1;
    hppi += price_multiplier;
  }
})

function snowstorm(enemy) {
  getAll(enemy).forEach(enemy => {
    enemy.remove();
  });
}
onInput("j", () => {
  const spritesOnTile = getTile(getFirst(player).x - 1, getFirst(player).y);
  spritesOnTile.forEach(sprite => {
    if (time === 0) {
      playTune(casting)
      addSprite(getFirst(player).x - 1, getFirst(player).y, fireball)
    }
  })
  if (time === 5) {
    game_reset();
  }
})

function game_reset() {
  cancel_run();
  getAll(player).forEach(player => player.remove());
  getAll(tower).forEach(enemy => enemy.remove());
  getAll(grave).forEach(enemy => enemy.remove());
  //recreate run
  addSprite(12, 3, player);
  time = 2;
  waves = 20;
  score = 0;
  n = 1;
  hp = 3;
  cash = 0;
  bombs = 0;
  snowglobe = 0;
  hppi = 1;
  bombpi = 1;
  snwglbpi = 1;
}

function cancel_run() {
  //cancel run
  clear_bullet(fireball);
  clear_bullet(lightning_bolt);
  clear_bullet(earth_wall);
  clear_bullet(water_strike);
  getAll(enemy_one).forEach(enemy => enemy.remove());
  getAll(enemy_two).forEach(enemy => enemy.remove());
  getAll(enemy_three).forEach(enemy => enemy.remove());
  getAll(enemy_four).forEach(enemy => enemy.remove());
  getAll(enemy_five).forEach(enemy => enemy.remove());
  getAll(enemy_boss).forEach(enemy => enemy.remove());
  getAll(enemy_necromancer).forEach(enemy => enemy.remove());
  clearText();
}
onInput("i", () => {
  if (time === 2) {
    time = 3;
    diff = 2;
    clearText();
  }
  const spritesOnTile = getTile(getFirst(player).x - 1, getFirst(player).y);
  spritesOnTile.forEach(sprite => {
    if (time === 0) {
      playTune(casting)
      addSprite(getFirst(player).x - 1, getFirst(player).y, lightning_bolt)
    }
  })
})
onInput("l", () => {
  if (time === 2) {
    time = 3;
    diff = 3;
    waves = n + 2;
    clearText();
  }
  const spritesOnTile = getTile(getFirst(player).x - 1, getFirst(player).y);
  spritesOnTile.forEach(sprite => {
    if (time === 0) {
      playTune(casting)
      addSprite(getFirst(player).x - 1, getFirst(player).y, water_strike)
    }
  })
})
onInput("k", () => {
  const spritesOnTile = getTile(getFirst(player).x - 1, getFirst(player).y);
  spritesOnTile.forEach(sprite => {
    if (time === 0) {
      playTune(casting)
      addSprite(getFirst(player).x - 1, getFirst(player).y, earth_wall)
    }
  })
})
//functions regarding the enemies
function control_end_wave() {
  if (tilesWith(enemy_one).length === 0 && tilesWith(enemy_two).length === 0 && tilesWith(enemy_three).length === 0 && tilesWith(enemy_four).length === 0 && tilesWith(enemy_five).length === 0 && tilesWith(enemy_boss).length === 0 && tilesWith(enemy_necromancer).length === 0) {
    clean = true;
    time = 1;
  } else
    time = 0;
}

function control_lose(enemy) {
  getAll(enemy).forEach(enemy => {
    const spritesOnTileEnemy = getTile(enemy.x, enemy.y);
    spritesOnTileEnemy.forEach(sprite => {
      if (repetition === false)
        if (sprite.type === wall || sprite.type === player) {
          if (hp > 0) {
            playTune(attack)
            hp--;
          } else {
            //lose
            time = 5;
            cancel_run();
            addText("You lose!", { x: 5, y: 5, color: color`2` });
            addText("Press J to restart", { x: 1, y: 6, color: color`2` });
            if (diff === 3)
              addText("Your score: " + score, { x: 3, y: 9, color: color`2` });
            playTune(lose_theme)
            repetition = true;
          }
          enemy.remove();
        }
    });
  });
}

function moveEnemy(enemy) {
  getAll(enemy).forEach(enemy => {
    playTune(movE)
    enemy.x += 1;
  });
  control_lose(enemy);
  setTimeout(() => {
    moveEnemy(enemy);
  }, 2000);
}

function ishield() {
  let randomY, randomX;
  for (let j = 0; j < 2; j++) {
    do {
      randomY = Math.floor(Math.random() * 7);
      randomX = Math.floor(Math.random() * 7);
    } while (randomY === getFirst(enemy_boss).y);
    addSprite(randomX, randomY, tower);
  }
}

function final_requiem() {
  getAll(grave).forEach(grave => {
    addSprite(grave.x, grave.y, enemy_one);
    playTune(reborn)
    grave.remove();
  });
}

//functions regarding projectiles
function clear_bullet(bullet) {
  getAll(bullet).forEach(bullet => {
    bullet.remove();
  })
}

function moveBullet(bullet) {
  getAll(bullet).forEach(bullet => {
    bullet.x -= 1;
    if (bullet.x <= 0) {
      bullet.remove();
    }
    control_hit(bullet);
  });
  setTimeout(() => {
    moveBullet(bullet);
  }, 5);
}

function control_hit(bullet) {
  const spritesOnTile = getTile(bullet.x, bullet.y);
  spritesOnTile.forEach(sprite => {
    let grave_chance = Math.floor(Math.random() * 6);
    switch (sprite.type) {
      case enemy_one:
        if (grave_chance === 0)
          addSprite(sprite.x, sprite.y, grave)
        playTune(hit)
        sprite.remove();
        cash += 1;
        score += 5;
        bullet.remove();
        break;
      case "b":
        if (bullet.type === water_strike) {
          if (grave_chance === 0)
            addSprite(sprite.x, sprite.y, grave)
          playTune(hit)
          sprite.remove();
          cash += 3;
          score += 10;
        } else
          playTune(block)
        bullet.remove();
        break;
      case "c":
        if (bullet.type === lightning_bolt) {
          if (grave_chance === 0)
            addSprite(sprite.x, sprite.y, grave)
          playTune(hit)
          sprite.remove();
          cash += 3;
          score += 10;
        } else
          playTune(block)
        bullet.remove();
        break;
      case "d":
        if (bullet.type === fireball) {
          if (grave_chance === 0)
            addSprite(sprite.x, sprite.y, grave)
          playTune(hit)
          sprite.remove();
          cash += 3;
          score += 10;
        } else
          playTune(block)
        bullet.remove();
        break;
      case "e":
        if (bullet.type === earth_wall) {
          if (grave_chance === 0)
            addSprite(sprite.x, sprite.y, grave)
          playTune(hit)
          sprite.remove();
          cash += 3;
          score += 10;
        } else
          playTune(block)
        bullet.remove();
        break;
      case "g":
        if (tilesWith(tower).length === 0) {
          if (grave_chance === 0)
            addSprite(sprite.x, sprite.y, grave)
          playTune(hit)
          sprite.remove();
          cash += 20;
          score += 50;
        } else
          playTune(block)
        bullet.remove();
        break;
      case "n":
        if (grave_chance === 0)
          addSprite(sprite.x, sprite.y, grave)
        playTune(hit)
        sprite.remove();
        cash += 15;
        score += 50;
        bullet.remove();
        break;
      case "q":
        playTune(shatter)
        sprite.remove();
        bullet.remove();
        score += 1;
        break;
        //code against bullet overlap
      case "j":
      case "i":
      case "l":
      case "k":
        if (sprite.type != bullet.type)
          bullet.remove();
        break;
    }
  });
}

//move all the sprites
moveEnemy(enemy_one);
moveEnemy(enemy_two);
moveEnemy(enemy_three);
moveEnemy(enemy_four);
moveEnemy(enemy_five);
moveEnemy(enemy_boss);
moveEnemy(enemy_necromancer);
moveBullet(fireball);
moveBullet(lightning_bolt);
moveBullet(water_strike);
moveBullet(earth_wall);

//Functions regarding texts

function title() {
  let s = n - 1;
  if (time != 2) {
    addText("HP:" + hp, {
      x: 15,
      y: 1,
      color: color`2`
    });
    addText("C:" + Math.round(cash), {
        x: 1,
        y: 1,
        color: color`2`
      }),
      addText("Bombs:" + bombs, {
        x: 12,
        y: 14,
        color: color`2`
      }),
      addText("SNWGLB:" + snowglobe, {
        x: 1,
        y: 14,
        color: color`2`
      })
    if (diff === 3 && score < 100)
      addText("Score:" + score, {
        x: 6,
        y: 1,
        color: color`2`
      })
    if (diff === 3 && score >= 100)
      addText("S:" + score, {
        x: 7,
        y: 1,
        color: color`2`
      })

  }
  if (time === 1 && s > 0) {
    if (diff === 3)
      addText("Wave " + s + " cleared", {
        x: 3,
        y: 4,
        color: color`2`
      });
    else
      addText("Wave " + s + "/" + waves + " cleared", {
        x: 1,
        y: 4,
        color: color`2`
      });
    addText("Press A to continue", {
      x: 1,
      y: 6,
      color: color`2`
    });
    addText("Press D to shop", {
      x: 1,
      y: 7,
      color: color`2`
    });
  }
  if (time === 4) {
    addText("SHOP", {
      x: 6,
      y: 3,
      color: color`2`
    });
    addText("A: Next wave", {
      x: 3,
      y: 5,
      color: color`2`
    });
    addText("W:+1 Bomb:" + 30 * bombpi + "C", {
      x: 1,
      y: 6,
      color: color`2`
    });
    addText("D:+1 HP:" + 10 * hppi + "C", {
      x: 1,
      y: 7,
      color: color`2`
    });
    addText("S:+1 Snowglobe:" + 50 * snwglbpi + "C", {
      x: 1,
      y: 8,
      color: color`2`
    });
  }
  setTimeout(() => {
    title();
  }, 2);
}
//Game music
const move = tune`
229.00763358778627: C4^229.00763358778627 + G4~229.00763358778627,
7099.236641221374`
const movE = tune`
229.00763358778627: C4~229.00763358778627 + G4~229.00763358778627,
7099.236641221374`
const casting = tune`
229.00763358778627: F5^229.00763358778627 + F4/229.00763358778627 + C5^229.00763358778627,
7099.236641221374`
const boom = tune`
229.00763358778627: C4/229.00763358778627 + D4-229.00763358778627 + F4~229.00763358778627,
7099.236641221374`
const shatter = tune`
229.00763358778627: F4/229.00763358778627 + C4-229.00763358778627 + B5^229.00763358778627,
7099.236641221374`
const hit = tune`
229.00763358778627: F4/229.00763358778627 + E4~229.00763358778627,
7099.236641221374`
const reborn = tune`
67.26457399103138: C4/67.26457399103138 + D4-67.26457399103138 + F5~67.26457399103138,
67.26457399103138: C4-67.26457399103138 + D5~67.26457399103138,
67.26457399103138: B4~67.26457399103138,
1950.6726457399102`
const block = tune`
48.54368932038835: B5^48.54368932038835 + G5~48.54368932038835,
48.54368932038835: B5^48.54368932038835 + G5~48.54368932038835,
1456.3106796116506`
const attack = tune`
109.0909090909091: C4/109.0909090909091 + E4-109.0909090909091 + C5~109.0909090909091 + B4~109.0909090909091,
3381.818181818182`
const buy = tune`
56.28517823639775: B5-56.28517823639775 + A5/56.28517823639775 + G5^56.28517823639775,
56.28517823639775: B5-56.28517823639775 + A5^56.28517823639775,
1688.5553470919324`
const win_theme = tune`
740.7407407407408,
370.3703703703704: A4^370.3703703703704 + E4~370.3703703703704 + C4/370.3703703703704,
370.3703703703704: C5^370.3703703703704 + G4~370.3703703703704 + E4/370.3703703703704,
370.3703703703704: F5^370.3703703703704 + C5~370.3703703703704 + A4/370.3703703703704,
10000`
const lose_theme = tune`
370.3703703703704,
370.3703703703704: F5/370.3703703703704 + C5-370.3703703703704 + A4~370.3703703703704,
370.3703703703704: C5/370.3703703703704 + G4-370.3703703703704 + E4~370.3703703703704,
370.3703703703704: E4-370.3703703703704 + C4~370.3703703703704 + A4/370.3703703703704,
370.3703703703704: C4~370.3703703703704 + D4-370.3703703703704 + F4/370.3703703703704,
10000`
//Code that spawns the enemies
function spawn() {
  let j, boss_rep = false;
  for (j = 0; j < n; j++) {
    let randomY = Math.floor(Math.random() * 7),
      randomE = Math.floor(Math.random() * 5);
    if (diff === 2 || (diff === 3 && n % 5 === 0)) {
      randomE = Math.floor(Math.random() * 7);
      select_enemy(randomE, randomY);
    }
    if (diff === 1 || (diff === 3 && n % 5 != 0)) {
      if (n >= 5) {
        select_enemy(randomE, randomY);
      } else {
        if (boss_rep === false)
          addSprite(0, randomY, enemy_one)
      }
      if (boss_rep === false && n === 10) {
        addSprite(0, randomY, enemy_necromancer)
        final_requiem();
        boss_rep = true;
      }
      if (boss_rep === false && n === 20) {
        addSprite(0, randomY, enemy_boss)
        ishield();
        boss_rep = true;
      }
    }
    if (diff === 0) {
      if (n === 1) {
        addSprite(0, randomY, enemy_one)
      }
      if (boss_rep === false && n === 2) {
        addSprite(0, randomY, enemy_two)
        randomY = Math.floor(Math.random() * 7)
        addSprite(0, randomY, enemy_three)
        randomY = Math.floor(Math.random() * 7)
        addSprite(0, randomY, enemy_four)
        randomY = Math.floor(Math.random() * 7)
        addSprite(0, randomY, enemy_five)
        boss_rep = true;
      }
      if (n === 3) {
        select_enemy(randomE, randomY);
      }
      if (boss_rep === false && n === 4) {
        addSprite(0, randomY, enemy_necromancer)
        final_requiem();
        boss_rep = true;
      }
      if (boss_rep === false && n === 5) {
        addSprite(0, randomY, enemy_boss)
        ishield();
        boss_rep = true;
      }
    }
  }
  time = 0;
}

function select_enemy(rE, rY) {
  switch (rE) {
    case 0:
      addSprite(0, rY, enemy_one)
      break;
    case 1:
      addSprite(0, rY, enemy_two)
      break;
    case 2:
      addSprite(0, rY, enemy_three)
      break;
    case 3:
      addSprite(0, rY, enemy_four)
      break;
    case 4:
      addSprite(0, rY, enemy_five)
      break;
    case 5:
      addSprite(0, rY, enemy_boss)
      ishield();
      break;
    case 6:
      addSprite(0, rY, enemy_necromancer)
      final_requiem();
      break;
  }
}
//Code controlling in-game istances
setInterval(() => {
  if (time === 2) {
    addText("Wall Defense", {
      x: 4,
      y: 1,
      color: color`2`
    })
    addText("Choose the diff lv", {
      x: 1,
      y: 4,
      color: color`2`
    })
    addText("Tutorial (Press A)", {
      x: 1,
      y: 6,
      color: color`2`
    })
    addText("Normal (Press W)", {
      x: 1,
      y: 7,
      color: color`2`
    })
    addText("Hell (Press I)", {
      x: 1,
      y: 8,
      color: color`2`
    })
    addText("Infinite (Press L)", {
      x: 1,
      y: 9,
      color: color`2`
    })
    addText("Made by Danger", {
      x: 3,
      y: 14,
      color: color`3`
    })
  }
  if (time === 4) {
    clearText();
    title();
  }
  if (time === 1) {
    title();
    clear_bullet(fireball);
    clear_bullet(lightning_bolt);
    clear_bullet(earth_wall);
    clear_bullet(water_strike);
    //tower is not a projectile, however it must be destroyed at the end of a wave
    clear_bullet(tower);
  }
  if (time === 0) {
    title();
    clean = false;
    control_end_wave();
    control_hit(fireball);
    control_hit(water_strike);
    control_hit(lightning_bolt);
    control_hit(earth_wall);
  }
}, 2);
afterInput(() => {
  if (diff === 3)
    waves = n + 2;
  if (clean === true) {
    if (n > waves && repetition === false) {
      //win
      time = 5;
      addText("You win!", { x: 6, y: 5, color: color`2` });
      addText("Press J to restart", { x: 1, y: 6, color: color`2` });
      playTune(win_theme)
      repetition = true;
    }
    if (n <= waves && time === 3) {
      clearText();
      spawn()
      n += 1;
    }
  }
})