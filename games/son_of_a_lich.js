/*
@title: son_of_a_lich
@author: William Lay
@tags: []
@addedOn: 2023-01-30
*/

/*
Controls:
  WASD to move
  I to focus an attack
  J to make an attack
  L to block an attack
  K to interact with NPCs
Attacking without focusing beforehand will result in a miss.
Moving and blocking will lose your focus.
*/

const armor = "a";
const armorB = "b";
const player = "p";
const playerR = "r";
const playerL = "l";
const money = "m";
const door = "d";
const wall = "w";
const wallSecret = "s";
const floor = "f";
const grass = "g";
const tree = "t";
const darkness = "v";
const slash = "0";
const slashR = "1";
const slashL = "2";
const slashU = "3";
const slashD = "4";
const focus = "5";
const shield = "6";
const blast = "7";
const shieldM = "8";
const lich = "u";
const skull = "q";
const skullEmpty = "e"
const npc1 = "x";
const npc2 = "y";
const npc3 = "z";

setLegend(
  [ slashR, bitmap`
................
................
122.............
.122............
..122...........
..1122..........
...112..........
...112..........
...112..........
...112..........
..1122..........
..122...........
.122............
122.............
................
................`],
  [ slashL, bitmap`
................
................
.............221
............221.
...........221..
..........2211..
..........211...
..........211...
..........211...
..........211...
..........2211..
...........221..
............221.
.............221
................
................`],
  [ slashU, bitmap`
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
.....222222.....
....22111122....
...2211111122...
..2211....1122..
..21........12..
..1..........1..`],
  [ slashD, bitmap`
..1..........1..
..21........12..
..2211....1122..
...2211111122...
....22111122....
.....222222.....
................
................
................
................
................
................
................
................
................
................`],
  [ blast, bitmap`
...33...........
..3993...33.....
..39993333933...
..3966999999933.
.39966666966993.
.39996622669933.
..339622222693..
...3622222263...
.3336222226993..
3399622266969933
.333962269399993
...399669333933.
...3396993.393..
....399933..33..
....33333.......
.....33.........`],
  [ focus, bitmap`
...............3
.....3.........3
.....3.........3
.....3.........C
.....C..........
................
.............3..
.............3..
..3..........3..
..3..........3..
..3....3.....C..
..C....3........
3......3........
3......C........
3...............
C...............`],
  [ shield, bitmap`
................
................
................
.....000000.....
...0011111L00...
...01221111L0...
...01211111L0...
....011111L0....
....011111L0....
....011111L0....
.....0111L0.....
......0LL0......
.......00.......
................
................
................`],
  [ shieldM, bitmap`
................
....55555555....
...5577777755...
..557......755..
.557........755.
.57..........75.
.57..........75.
.57..........75.
.57..........75.
.57..........75.
.57..........75.
.557........755.
..557......755..
...5577777755...
....55555555....
................`],
  [ slash, bitmap`
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
................
................
................
................
................
................`],
  [ playerR, bitmap`
........00000...
.......01L1L10..
..55.0001L1L10..
.5750110111110..
5755011600000...
575.01166565....
.5..01166565.2..
....01116666.2..
.....011166..2..
....00000000.2..
...01101110102..
..LLL0100010LLLL
..LLL011110116..
..LLL0CCFC0..L..
...L.0L00L0.....
.....0110110....`],
  [ playerL, bitmap`
...00000........
..01L1L10.......
..01L1L1000.55..
..0111110110575.
...0000061105575
....56566110.575
..2.56566110..5.
..2.66661110....
..2..661110.....
..2.00LLL000....
..20101110110...
LLLL0100010LLL..
..611011110LLL..
..L..0CFCC0LLL..
.....0L00L0.L...
....0110110.....`],
  [ player, bitmap`
................
................
................
................
................
................
................
................
................
.......3.3......
.......333......
........3.......
................
................
................
................`],
  [ armor, bitmap`
......0000......
.....021110.....
....02LLLL10....
....011LL110....
.....01LL10.....
...0000110000...
..021010010110..
.00001211110000.
..010211111010..
..010111111010..
..010011110010..
...00.0000.00...
......0100......
.....001000.....
....02210110....
....00000000....`],
  [ armorB, bitmap`
......0000......
.....01LLL0.....
....010000L0....
....0LL00LL0....
.....0L00L0.....
...0000LL0000...
..01L0L00L0LL0..
.0000L1LLLL0000.
..0L01LLLLL0L0..
..0L0LLLLLL0L0..
..0L00LLLL00L0..
...00.0000.00...
......0L00......
.....00L000.....
....011L0LL0....
....00000000....`],
  [ lich, bitmap`
......0000......
.....0L22L0.....
....022LL220....
....02322320....
....02222220....
.....0212L0.....
....00012000....
...06HL00LH60...
..06HHHLLHHH60..
..0H0HHHLHH0H0..
..000HHHLHH000..
..020066L60020..
...0.0HHLH0.0...
.....0HHLH0.....
.....0HLHH0.....
....0HHLHHH0....`],
  [ skull, bitmap`
................
................
................
................
......0000......
.....0L22L0.....
....022LL220....
....02322320....
....02222220....
.....0212L0.....
....0001200.....
...06HH00H600...
..06HHHHLHH660..
.0HHH6666LHHHH0.
.00000000000000.
................`],
  [ skullEmpty, bitmap`
................
................
................
................
......0000......
.....022220.....
....02222220....
....02022020....
....02222220....
.....0212L0.....
....0001200.....
...06HH00H600...
..06HHHHLHH660..
.0HHH6666LHHHH0.
.00000000000000.
................`],
  [ npc1, bitmap`
................
................
.....000000.....
....0CCCCCC0....
....0CCCC666....
....0CCC6565....
....0CCC6565....
....0CC66666....
.....0C6666.....
....00000000....
...0330666030...
...0303000300...
...0603333060...
....00CCFC00....
.....0L00L0.....
.....0CC0CC0....`],
  [ npc2, bitmap`
................
................
.....000000.....
...00CCCCCC0....
..0C0CCCC666....
..0C0CCC6565....
..0C0CCC6565....
..0C0CC66666....
..0CC0C6666.....
..0C00000000....
..00770666070...
...0707000700...
...0607777060...
....0077L700....
.....077L70.....
....077L770.....`],
  [ npc3, bitmap`
................
................
.....000000.....
....06661110....
....66666110....
....56566610....
....L6L66610....
....66666110....
.....666110.....
....00LLL000....
...0906660990...
...0090009090...
...0609999060...
....00CFCC00....
.....0L00L0.....
....0CC0CC0.....`],
  [ money, bitmap`
................
................
................
................
................
................
................
....CCCCCCCCC...
..CCC6666666CCC.
..C66666666666C.
..CC6666666CCCC.
...CCCCCCCCCCC..
..CCCLLLLLLCCC..
.CCLLLCCCCCLLCC.
.CCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [ door, bitmap`
L000000000000000
L000000000000000
L0000CCCCCC00000
L000CCCCCCCC0000
L00CCCCCCCCCC000
L00CCCCCCCCCC000
L00CCCCCCCCCC000
LLLCCCCCCCCCCLLL
000CCCCCCCCCC000
000CCCCCCCCCC000
000C66CCCCCCC000
000C66CCCCCCC000
000CCCCCCCCCC000
000CCCCCCCCCC000
000CCCCCCCCCC000
LLLCCCCCCCCCCLLL`],
  [ wall, bitmap`
L000000000000000
L000000000000000
L000000000000000
L000000000000000
L000000000000000
L000000000000000
L000000000000000
LLLLLLLLLLLLLLLL
0000000L00000000
0000000L00000000
0000000L00000000
0000000L00000000
0000000L00000000
0000000L00000000
0000000L00000000
LLLLLLLLLLLLLLLL`],
  [ wallSecret, bitmap`
L000000000000000
L000000000000000
L000000000000000
L000000000000000
L000000000000000
L000000000000000
L000000000000000
LLLLLLLLLLLLLLLL
0000000L00000000
0000000L00000000
0000000L00000000
0000000L00000000
0000000L00000000
0000000L00000000
0000000L00000000
LLLLLLLLLLLLLLLL`],
  [ floor, bitmap`
LLL100000001LLLL
LLL100000001LLLL
LLL100000001LLLL
1111111111111111
00000001LLLLLLL1
00000001LLLLLLL1
00000001LLLLLLL1
1111111111111111
LLL100000001LLLL
LLL100000001LLLL
LLL100000001LLLL
1111111111111111
00000001LLLLLLL1
00000001LLLLLLL1
00000001LLLLLLL1
1111111111111111`],
  [ tree, bitmap`
.....DDDDDD.....
....DDD44DDD....
...DDD4444DDD...
..DD4D4444DDDD..
..D444444D44DD..
..DD44444444DD..
..DDD444444DDD..
...DDD4444DDD...
....DDDD44DDC...
.....DDDDDDC....
......CCCCC.....
......CCCC......
......CCC.......
......CCC.......
......CCC.......
.....CCCCC......`],
  [ grass, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
444D44D444444444
444D4D44D444D444
4444D4444D4D4444
4444D4444D4D4444
4444444444D44444
4444444444444444
4444444444444444
44444444D4444444
4444D44D44444444
44444D4D44444444
444444D444444444
4444444444444444`],
  [ darkness, bitmap`
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
0000000000000000`]
)

let level = 1;
const levels = [
  map`
..........
..........
..........
..........
..........
....p.....
..........
..........`,
  map`
ttt....ttt
ttt....ttt
tt.y....tt
t........t
t......z.t
ttx.....tt
tt.....ttt
ttt.p.tttt`,
  map`
wwwwwwwwww
wwwwdwwwww
ffffffffff
ttt.a..ttt
ttt....ttt
tt......tt
ttt....ttt
ttt.p.tttt`,
  map`
wwwwdwwwww
wa.......w
w........w
w........w
wsww.....w
w.mw.wwwww
wm.w.wwwww
wwwwpwwwww`,
  map`
wwwwwwwwww
ww......aw
ss...www.w
sw...www.d
swa..wwwww
sww..s.m.w
smw..wm.mw
wwwwpwwwww`,
  map`
wwwwwwwwdw
w..awmmw.w
w...wmmw.w
p...wsww.w
w...wa...w
w...wwwwaw
w........w
wwwwwwwwww`,
  map`
wwwwwwwwww
wwwwwwwwww
w.......aw
db.......w
w........w
w........w
wwwwwwww.w
wwwwwwwwpw`,
  map`
wwdwwwwwww
w......www
w.b.....ww
s........p
sww..b...w
smww.....w
smmwwwwwww
wwwwwwwwww`,
  map`
wwwwwwwwww
w.b.....bw
w........w
w...wwww.w
w...wwww.w
w...wmmw.w
w...smmwbd
wwpwsswwww`,
  map`
wwwwdwwwww
w..b.b.wbw
w......wmw
w......wmw
w......wmw
w......wmw
p......wmw
wwwwwwsssw`,
  map`
wssswwwwdw
wmwb..wwbw
www.w....s
p.w.wwwwws
w.w....wws
w.wwww.wms
wb.....wms
wwwwwwwwww`,
  map`
gggggggggg
wwwwwdwwww
w...bu...w
w........w
w........w
w........w
w........w
wwwwpwwwww`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ armor, armorB, player, lich, skull, npc1, npc2, npc3, wall, tree ]);

setPushables({ 
  [player]: [ npc1, npc2, npc3 ] 
})

addSprite(getFirst(player).x, getFirst(player).y, playerR);

let turn = 0;

// START - PLAYER MOVEMENT CONTROLS

let direction = "right";

onInput("s", () => {
  duringInput();
  getFirst(player).y += 1;
});

onInput("d", () => {
  duringInput();
  direction = "right";
  getFirst(player).x += 1;
});

onInput("w", () => {
  duringInput();
  getFirst(player).y -= 1;
});

onInput("a", () => {
  duringInput();
  direction = "left";
  getFirst(player).x -= 1;
});

// END - PLAYER MOVEMENT CONTROLS

// START - PLAYER COMBAT CONTROLS

let playerFocusMeter = 0;
let playerFocusing = false;
let enemyFocusMeter = 0;
let lichFocusMeter = 0;

onInput("j", () => {
  duringInput();
  let listOfEnemies = getAll();
  for (let i = 0; i < listOfEnemies.length; i++) {
    let currentEnemy = listOfEnemies[i];
    if (isEnemy(currentEnemy)) {
      let success = Attack(getFirst(player), currentEnemy);
      if (success === true) {
        addText("You attacked!", {y: 0, color: color`2`});
        break;
      }
      else {
        addText("You missed!", {y: 0, color: color`2`});
      }
    }
  }
});

onInput("i", () => {
  duringInput();
  Focus(getFirst(player));
  playerFocusing = true;
  addText("You focused!", {color: color`2`});
});

onInput("l", () => {
  duringInput();
  Block(getFirst(player));
  addText("You blocked!", {color: color`2`});
});

//END PLAYER COMBAT CONTROLS

onInput("k", () => {
  duringInput();

  if (gameOver === true) {
    gameOver = false;
    moneyAmount = 0;
    turn = 0;
    level = 1;
    enemyFocusMeter = 0;
    const currentLevel = levels[level];
    setMap(currentLevel);
    setBackground(grass);
  }
  
  let listOfSprites = getAll();
  for (let i = 0; i < listOfSprites.length; i++) {
    let currentSprite = listOfSprites[i];
    
    if (isInRange(getFirst(player), currentSprite)) {
      switch (currentSprite.type) {
        case npc1:
          addText("I'm sure you've", {y: 0, color: color`2`});
          addText("heard, but your", {y: 1, color: color`2`});
          addText("father has gone", {y: 2, color: color`2`});
          addText("missing!", {y: 3, color: color`2`});
          break;
        case npc2:
          addText("That northern castle", {y: 0, color: color`2`});
          addText("is quite dangerous.", {y: 1, color: color`2`});
          addText("I've heard a lich", {y: 2, color: color`2`});
          addText("was seen there!", {y: 3, color: color`2`});
          break;
        case npc3:
          addText("I believe I last", {y: 0, color: color`2`});
          addText("saw your father", {y: 1, color: color`2`});
          addText("around that castle", {y: 2, color: color`2`});
          addText("up north.", {y: 3, color: color`2`});
          break;
        case skull:
          addText("You think I killed", {y: 0, color: color`2`});
          addText("your father? No,", {y: 1, color: color`2`});
          addText("I AM your father!", {y: 2, color: color`2`});
          addText("Now, begone!", {y: 3, color: color`2`});
          currentSprite.type = skullEmpty;
          break;
      }
    }
  }
});

let gameOver = false;
let blocked;

function duringInput() {
  clearText();
  collect();
  clearSlashes();
  clearCombat();
  enemyTurn();
}

let moneyAmount = 0;
let stackedMoney = 0;

function collect() {
  let spriteList = getTile(getFirst(player).x, getFirst(player).y);
  for (let i = 0; i < spriteList.length; i++) {
    if (spriteList[i].type === money) {
      stackedMoney += 100;
      addText("+" + stackedMoney + " gold!", {x: 0, y: 15, color: color`2`});
      spriteList[i].remove();
      moneyAmount += 100;
    }
  }
  stackedMoney = 0;
}

function clearSlashes() {
  let allSlashes = getAll(slash);
  for (let i = 0; i < allSlashes.length; i++) {
    let xCoord = allSlashes[i].x
    let yCoord = allSlashes[i].y
    let spriteList = getTile(xCoord, yCoord);

    for (let j = 0; j < spriteList.length; j++) {
      switch (spriteList[j].type) {
        case shield:
          blocked = true;
          break;
        case shieldM:
          blocked = true;
          break;
        case player: 
          gameOver = true;
          break;
        case armor:
          spriteList[j].type = money;
          addText("Enemy defeated!", {y: 1, color: color`2`});
          break;
        case armorB:
          spriteList[j].type = money;
          addText("Enemy defeated!", {y: 1, color: color`2`});
          break;
        case lich:
          spriteList[j].type = skull;
          addText("Lich slain!", {y: 1, color: color`2`});
          break;
      }
      if (blocked === true) {
        blocked = false;
        break;
      }
    }
  }
}

function clearCombat() {
  let allSprites = getAll();
  for (let i = 0; i < allSprites.length; i++) {
    if (allSprites[i].type === slash ||
        allSprites[i].type === slashU ||
        allSprites[i].type === slashD ||
        allSprites[i].type === slashR ||
        allSprites[i].type === slashL ||
        allSprites[i].type === blast ||
        allSprites[i].type === focus || 
        allSprites[i].type === shield ||
        allSprites[i].type === shieldM ||
        allSprites[i].type === playerR ||
        allSprites[i].type === playerL) {
      allSprites[i].remove();
    }
  };
}

afterInput(() => {
  nextRoom();
  
  if (playerFocusing === true) {
    playerFocusMeter = 1;
    playerFocusing = false;
  } else {
    playerFocusMeter = 0;
  };
    
  if (gameOver === true) {
    clearText();
    addText("Game Over!", {y: 6, color: color`3`});
    addText("Total: " + moneyAmount + " gold", {y: 7, color: color`2`});
    addText("Press 'k' to restart", {y: 8, color: color`2`});
    setBackground(darkness);
    setMap(levels[0]);
  };

  if (direction === "right") {
    addSprite(getFirst(player).x, getFirst(player).y, playerR);
  }
  else {
    addSprite(getFirst(player).x, getFirst(player).y, playerL);
  };

  turn += 1;
  let turnText = new String(turn);
  let textx = 15 - turnText.length
  addText("Turn:" + turn, {x: textx, y: 15, color: color`2`})
})

function nextRoom() {
  const numberCovered = tilesWith(door, player).length;

  if (numberCovered === 1 || (level <= 2 && getFirst(player).y === 0)) {
    level = level + 1;

    if (level > 2) {
      setBackground(floor);
    }

    enemyFocusMeter = 0;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } 
    else {
      addText("You Win!", {y: 7, color: color`2`});
      addText("Total: " + moneyAmount + " gold!", {y: 8, color: color`2`});
    }
  };
}

function enemyTurn () {
  let enemyAttacking = false;
  
  let listOfEnemies = getAll();
  for (let i = 0; i < listOfEnemies.length; i++) {
    let currentEnemy = listOfEnemies[i];

    if (currentEnemy.type === lich) {
      lichTurn(currentEnemy);
    }
    else if (isEnemy(currentEnemy)) {
      let distanceX = getFirst(player).x - currentEnemy.x;
      let distanceY = getFirst(player).y - currentEnemy.y;

      if (playerFocusMeter === 1 && Math.floor(Math.random() * 2) > 0) {
        Block(currentEnemy);
        addText("Enemy blocked!", {y: 1, color: color`2`});
        enemyFocusMeter = 0;
      }
      else if (isInRange(currentEnemy, getFirst(player))) {
        let choices = 2;
        if (enemyFocusMeter === 1) {
          choices += 2;
          if (currentEnemy.type === armorB || currentEnemy.type === lich) {
          choices += 1;
          }
        }
        let choice = Math.floor(Math.random() * choices);
        if (choice === 0) {
          Focus(currentEnemy);
          addText("Enemy focused!", {y: 1, color: color`2`});
          enemyFocusMeter = 1;
        }
        else if (choice === 1) {
          Block(currentEnemy);
          addText("Enemy blocked!", {y: 1, color: color`2`});
          enemyFocusMeter = 0;
        }
        else {
          let successEnemy = Attack(currentEnemy, getFirst(player));
          if (successEnemy === true) {
            addText("Enemy attacked!", {y: 1, color: color`2`});
          }
          else {
            addText("Enemy missed!", {y: 1, color: color`2`});
          }
          enemyFocusMeter = 0;
        }
      }
      else if ((Math.abs(distanceX) < Math.abs(distanceY) && distanceX != 0) 
               || Math.floor(Math.random() * 2) === 0) {
        enemyFocusMeter = 0;
        if (Math.sign(distanceX) === 1)
        {
          currentEnemy.x += 1;
        } else if (Math.sign(distanceX) === -1)
        {
          currentEnemy.x -= 1;
        };
      } 
      else {
        enemyFocusMeter = 0;
        if (Math.sign(distanceY) === 1) {
          currentEnemy.y += 1;
        } 
        else if (Math.sign(distanceY) === -1) {
          currentEnemy.y -= 1;
        };
      }
    }
  }
}

function Attack(me, target) {
  let focusMeter;
  let attackR;
  let attackL;
  let attackU;
  let attackD;
  
  if (me.type === player) {
    focusMeter = playerFocusMeter;
    attackR = slashR;
    attackL = slashL;
    attackU = slashU;
    attackD = slashD;
  }
  else if (me.type === lich) {
    focusMeter = lichFocusMeter;
    attackR = blast;
    attackL = blast;
    attackU = blast;
    attackD = blast;
  }
  else {
    focusMeter = enemyFocusMeter;
    attackR = slashR;
    attackL = slashL;
    attackU = slashU;
    attackD = slashD;
  }
  
  if (focusMeter > 0) {
    let distanceX = target.x - me.x;
    let distanceY = target.y - me.y;
    
    if (me.type === lich || isInRange(me, target)) {
      if (Math.sign(distanceX) === -1) {
        addSprite(target.x, target.y, attackL);
        if (me.type === player) {
          direction = "left";
        }
      }
      else if (Math.sign(distanceX) === 1) {          
        addSprite(target.x, target.y, attackR);
        if (me.type === player) {
          direction = "right";
        }
      } 
      else if (Math.sign(distanceY) === -1) {
        addSprite(target.x, target.y, attackU);
      } 
      else if (Math.sign(distanceY) === 1) {
        addSprite(target.x, target.y, attackD);
      }
        
      addSprite(target.x, target.y, slash);

      return true;
    }
  } 
  else {
    return false;
  }
}

function Focus(me) {
  addSprite(me.x, me.y, focus);
}

function Block(me) {
  if (me.type === lich) {
    addSprite(me.x, me.y, shieldM);
  }
  else {
    addSprite(me.x, me.y, shield);
  }
}

function isEnemy(sprite) {
  if (sprite.type === armor || sprite.type === armorB || sprite.type === lich) {
    return true;
  }
  return false;
}

function isInRange(me, target) {
  let distanceX = target.x - me.x;
  let distanceY = target.y - me.y;
    
  if ((Math.abs(distanceX) <= 1 && Math.abs(distanceY) === 0) || 
      (Math.abs(distanceX) === 0 && Math.abs(distanceY) <= 1)) {
    return true;
  }
  return false;
}

function lichTurn(me) {
  let distanceX = getFirst(player).x - me.x;
  let distanceY = getFirst(player).y - me.y;

  if (playerFocusMeter === 1 && Math.floor(Math.random() * 2) > 0) {
    Block(me);
    addText("Lich blocked!", {y: 2, color: color`2`});
    lichFocusMeter = 0;
  }
  else {
    let choices = 2;
    if (lichFocusMeter === 1) {
      choices += 5;
    }
    let choice = Math.floor(Math.random() * choices);
    if (choice === 0) {
      Focus(me);
      addText("Lich focused!", {y: 2, color: color`2`});
      lichFocusMeter = 1;
    }
    else if (choice === 1) {
      Block(me);
      addText("Lich blocked!", {y: 2, color: color`2`});
      lichFocusMeter = 0;
    }
    else if (choice > 1) {
      let successEnemy = Attack(me, getFirst(player));
      if (successEnemy === true) {
        addText("Lich attacked!", {y: 2, color: color`2`});
      }
      else {
        addText("Lich missed!", {y: 2, color: color`2`});
      }
      lichFocusMeter = 0;
    }
  }
}

setMap(levels[1]);
addSprite(getFirst(player).x, getFirst(player).y, playerR);
setBackground(grass);