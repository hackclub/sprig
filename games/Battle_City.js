/*
@title: Battle_City
@author: DevIos
@tags: []
@addedOn: 2023-01-09
*/
const player = "p";
const wall = "w";
const breakable = "s";
const plaser = "l";
const elaser = "!";
let Pframe = 0;
let eframe = 0;
let black = "q";
const blast = "/";
let laser_anim = 0;
let bullet = 0;

const enemy1f = "e";
const enemy1b = "f";
const enemy1l = "g";
const enemy1r = "h";

const enemy2f = "i";
const enemy2b = "j";
const enemy2l = "k";
const enemy2r = "m";

const enemy3f = "n";
const enemy3b = "o";
const enemy3l = "r";
const enemy3r = "t";

let currentTanks = [];

const tankLevels = {
  "1": {
    "w": enemy1f,
    "a": enemy1l,
    "s": enemy1b,
    "d": enemy1r
  },
  "2": {
    "w": enemy2f,
    "a": enemy2l,
    "s": enemy2b,
    "d": enemy2r
  },
  "3": {
    "w": enemy3f,
    "a": enemy3l,
    "s": enemy3b,
    "d": enemy3r
  },
};

class Tank {
  constructor(tag, x, y) {
    this.x = x;
    this.y = y;
    this.tag = tag;
    this.lastInput = "w";
    this.tankLevel = this.GetLevelFromSprite();
    this.dead = false;
    this.gotHit = false;
    this.laser_anim = null;


    this.ChangeDirection();
  }

  GetLevelFromSprite() {
    var levels = Object.keys(tankLevels);

    for(var i = 0; i < levels.length; i++) {
      var level = levels[i]; 
      var directions = Object.keys(tankLevels[level]);

      for(var j = 0; j < directions.length; j++) {
        var direction = directions[j];
        
        if(tankLevels[level][direction] == this.tag) {
          return parseInt(level);
        }
      }
    }
  }

  Move() {
    if(this.dead) return;

    this.HandleShooting();

    const { x, y } = this.GetDirectionFromInput(this.lastInput);
    
    if(getTile(this.x + x, this.y + y).length > 0) {
      return;
    }
    
    removeSprite(this.x, this.y, this.tag);
    
    this.x += x; this.y += y;
    
    this.tag = tankLevels[this.tankLevel][this.lastInput];
    
    addSprite(this.x, this.y, this.tag);
  }

  ChangeDirection() {
    if(this.dead) return;

    var directions = Object.keys(tankLevels[this.tankLevel]);
    var rand = Math.floor(Math.random() * directions.length);
    
    const { x, y } = this.GetDirectionFromInput(directions[rand]);
    
    if(getTile(this.x + x, this.y + y).length > 0) {
      return;
    }

    this.lastInput = directions[rand];
  }

  GetDirectionFromInput(input) {
    switch(input) {
      case "w": 
        return { "x": 0, "y": -1 }
      case "a": 
        return { "x": -1, "y": 0 }
      case "s": 
        return { "x": 0, "y": 1 }
      case "d": 
        return { "x": 1, "y": 0 }
    }
  }

  TakeHit(x, y) {
    if(this.x == x && this.y == y) {
      removeSprite(this.x, this.y, this.tag);
      setTimeout(() => {
        removeSprite(this.x, this.y, blast);
      }, 200);
      
      if(this.tankLevel - 1 < 1) {
        currentTanks.splice(currentTanks.findIndex(tank => tank === this), 1);
        this.dead = true;
      } else {
        this.tankLevel -= 1;
        addSprite(this.x, this.y, tankLevels[this.tankLevel][this.lastInput]);
        this.tag = tankLevels[this.tankLevel][this.lastInput];
      }

      return true;
    }

    return false;
  }

 HandleShooting() {
    var rand = Math.floor(Math.random() * 2);

    if(rand === 0 || this.laser_anim) return; 
    
    addSprite(this.x, this.y, elaser);
    var newLaser = getAll(elaser)[getAll(elaser).length - 1];
    
    const bullet_travel = (orientation, curlaser) => {    
      curlaser.x += orientation.x;
      curlaser.y += orientation.y;

      this.HandleBulletHit(curlaser);
    }
  
    this.laser_anim = setInterval(() => bullet_travel(this.GetDirectionFromInput(this.lastInput), newLaser), 30);
    setTimeout(() => { 
      if(newLaser) 
        newLaser.remove(); 
      
      if(this.laser_anim) {
        clearInterval(this.laser_anim); 
        this.laser_anim = null;
      }
    }, 1000);
  }

  HandleBulletHit(currentLaser) {
    const laserX = currentLaser.x, laserY = currentLaser.y;

    var tiles = getTile(laserX, laserY);

    for(var i = 0; i < tiles.length; i++) {
      var tile = tiles[i];
      
      if (tile.type === wall) {
        currentLaser.remove();
        clearInterval(this.laser_anim);
        return;
      }
    
      if (tile.type === breakable) {
        removeSprite(laserX, laserY, breakable)
        currentLaser.remove();
        addSprite(laserX, laserY, blast);
        
        setTimeout(() => {
           bullet = 0;
          removeSprite(laserX, laserY, blast);
        }, 200);
        
        clearInterval(this.laser_anim);
        return;
      }

      if (tile.type === player) {
        setMap(levels[level]);
        InitializeTanks();
        
        return;
      }
    }
  }
}

function InitializeTanks() {
  currentTanks = [];
  var tiles = getAll();
  var tankSprites = [];

  var levels = Object.keys(tankLevels);

  for(var i = 0; i < levels.length; i++) {
    var level = levels[i]; 
    var directions = Object.keys(tankLevels[level]);

    for(var j = 0; j < directions.length; j++) {
      var direction = directions[j];
        
      tankSprites.push(tankLevels[level][direction]);
    }
  }

  tiles.forEach(tile => {
    if(tankSprites.includes(tile.type)) {
      currentTanks.push(new Tank(tile.type, tile.x, tile.y));
    }
  });
}

function removeSprite(x, y, spriteType) {
  var sprite = getTile(x, y)
  var fSprite = sprite[sprite.map(x => x.type).indexOf(spriteType)];
  if(fSprite) fSprite.remove();
}

setSolids([player, enemy1f, enemy1l, enemy1r, enemy1b, enemy2f, enemy2b, enemy2l, enemy2r, enemy3f, enemy3b, enemy3l, enemy3r, wall, breakable]);

var playerBitmap = bitmap`
.......0........
.......6........
.......6........
000000060000000.
06990DD6DD0D990.
06990DD6DD0D990.
0DD6669999DDDD0.
0696699DD9DD990.
0DD66969D9DDDD0.
06966969D9DD990.
0DD6696699DDDD0.
069696999DDD990.
0DD60669990DDD0.
069900000006990.
00000.....00000.
................`;

function changeSprite() {
  switch (Pframe) {
    case 0:
      playerBitmap = bitmap`
  .......0........
  .......6........
  .......6........
  000000060000000.
  06990DD6DD0D990.
  06990DD6DD0D990.
  0DD6669999DDDD0.
  0696699DD9DD990.
  0DD66969D9DDDD0.
  06966969D9DD990.
  0DD6696699DDDD0.
  069696999DDD990.
  0DD60669990DDD0.
  069900000006990.
  00000.....00000.
  ................`;
      break;
    case 1:
      playerBitmap = bitmap`
  ................
  ...000000000000.
  ...099D9D9D9D90.
  ...099D9D9D9D90.
  ...0DDDDDDDDD60.
  ...000DDDDDD000.
  ...0DD99999D90..
  ...0DD9DDD9990..
  0666669D996990..
  ...0DD99666960..
  ...0DD69999660..
  ...000666669000.
  ...099666666690.
  ...099D9D9D9D90.
  ...066D6D6D6D60.
  ...000000000000.`
      break;
    case 2:
      playerBitmap = bitmap`
  ................
  .00000.....00000
  .099600000009960
  .0DDD09996606DD0
  .099DDD999696960
  .0DDDD9966966DD0
  .099DD9D96966960
  .0DDDD9D96966DD0
  .099DD9DD9966960
  .0DDDD9999666DD0
  .099D0DD6DD09960
  .099D0DD6DD09960
  .000000060000000
  ........6.......
  ........6.......
  ........0.......`;
      break;
    case 3:
      playerBitmap = bitmap`
  .000000000000...
  .06D6D6D6D660...
  .09D9D9D9D990...
  .096666666990...
  .000966666000...
  ..06699996DD0...
  ..06966699DD0...
  ..099699D9666660
  ..0999DDD9DD0...
  ..09D99999DD0...
  .000DDDDDD000...
  .06DDDDDDDDD0...
  .09D9D9D9D990...
  .09D9D9D9D990...
  .000000000000...
  ................`;
      break;
  }

  setLegend(
    [player, playerBitmap],
    [black, bitmap`
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
    [wall, bitmap`
  CCC11CCCCCC1CCCC
  99911C999991C999
  99911C999991C999
  1111111111111111
  1111111111111111
  1111111111111111
  1CCCCCC11CCCCCCC
  1C9999911C999999
  1C9999911C999999
  1111111111111111
  CCCC1CCCCCCC1CCC
  99991C9999991C99
  99991C9999991C99
  1111111111111111
  11CCCCC111CCCCCC
  11C9999111C99999`],
    [plaser, bitmap`
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
  .............6..
  ..6..........6..
  ..6..........6..
  ..6..........6..
  ..6.............
  ..6.............`],
    [elaser, bitmap`
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
  .............3..
  ..3..........3..
  ..3..........3..
  ..3..........3..
  ..3.............
  ..3.............`],
    [breakable, bitmap`
  1111111111111111
  1111111111111111
  1111111111111111
  1112222222222111
  1112222222222111
  1112222222222111
  1112222222222111
  1112222222222111
  1112222222222111
  1112222222222111
  1112222222222111
  1112222222222111
  1112222222222111
  1111111111111111
  1111111111111111
  1111111111111111`],
    [blast, bitmap`
  66..............
  6366.....66.....
  633066...666....
  636336606036....
  63663L6060366...
  .6001330333L66..
  .6303LL663LL36..
  .66001303L666...
  ..630L00166.....
  ...6366L136.....
  ...63L03L336....
  ..66LL31LL306...
  .66LL3666LL306..
  663L606.6666666.
  66666...........
  66..............`],
  
    [enemy1f, bitmap`
  .......0........
  .......2........
  .......2........
  000000020000000.
  011202125502110.
  011202125501110.
  055222515551550.
  011225521151110.
  055225221151550.
  011225221151110.
  055221111551550.
  011222115551110.
  055205555501550.
  011200000001110.
  00000.....00000.
  ................`],
    [enemy1b, bitmap`
  ................
  .00000.....00000
  .011100000002110
  .055105555502550
  .011155511222110
  .055155111122550
  .011151122522110
  .055151122522550
  .011151125522110
  .055155515222550
  .011105521202110
  .011205521202110
  .000000020000000
  ........2.......
  ........2.......
  ........0.......`],
    [enemy1l, bitmap`
  ................
  ...000000000000.
  ...011515151510.
  ...011515151510.
  ...021111111110.
  ...000555555000.
  ...05551115550..
  ...05551111550..
  02222212221150..
  ...01155221150..
  ...02225551250..
  ...000222222000.
  ...022222222220.
  ...011515151510.
  ...011515151510.
  ...000000000000.`],
    [enemy1r, bitmap`
  .000000000000...
  .015151515110...
  .015151515110...
  .022222222220...
  .000222222000...
  ..05215552220...
  ..05112255110...
  ..05112221222220
  ..05511115550...
  ..05551115550...
  .000555555000...
  .011111111120...
  .015151515110...
  .015151515110...
  .000000000000...
  ................`],
  
    [enemy2f, bitmap`
  .......0........
  .......6........
  .......6........
  000000060000000.
  069906466406990.
  069906466406990.
  099666999966660.
  069669449964990.
  099669649966640.
  069669649966990.
  099669669966660.
  069696999666990.
  099606699906660.
  069900000006990.
  00000.....00000.
  ................`],
    [enemy2b, bitmap`
  ................
  .00000.....00000
  .099600000009960
  .066609996606990
  .099666999696960
  .066669966966990
  .099669946966960
  .046669946966990
  .099469944966960
  .066669999666990
  .099604664609960
  .099604664609960
  .000000060000000
  ........6.......
  ........6.......
  ........0.......`],
    [enemy2l, bitmap`
  ................
  ...000000000000.
  ...099694969690.
  ...099696969690.
  ...066646666660.
  ...000666666000.
  ...04499999690..
  ...06699999990..
  06666694446990..
  ...04494666960..
  ...06669999660..
  ...000666669000.
  ...099666666690.
  ...099999999990.
  ...066969696960.
  ...000000000000.`],
    [enemy2r, bitmap`
  .000000000000...
  .069696969660...
  .099999999990...
  .096666666990...
  .000966666000...
  ..06699996660...
  ..06966649440...
  ..09964449666660
  ..09999999660...
  ..09699999440...
  .000666666000...
  .066666646660...
  .096969696990...
  .096969496990...
  .000000000000...
  ................`],
  
    [enemy3f, bitmap`
  .......0........
  .......4........
  .......4........
  000000040000000.
  04DD04444404DD0.
  04DD04444404DD0.
  0DD444D44444440.
  04D44D44D444DD0.
  0DD44D444444440.
  04D44D44DD44DD0.
  0DD44D44DD44440.
  04D4D4DDD444DD0.
  0DD4044DDD04440.
  04DD00000004DD0.
  00000.....00000.
  ................`],
    [enemy3b, bitmap`
  ................
  .00000.....00000
  .0DD40000000DD40
  .04440DDD4404DD0
  .0DD444DDD4D4D40
  .04444DD44D44DD0
  .0DD44DD44D44D40
  .044444444D44DD0
  .0DD444D44D44D40
  .04444444D444DD0
  .0DD40444440DD40
  .0DD40444440DD40
  .000000040000000
  ........4.......
  ........4.......
  ........0.......`],
    [enemy3l, bitmap`
  ................
  ...000000000000.
  ...0DD4D4D4D4D0.
  ...0DD4D4D4D4D0.
  ...044444444440.
  ...000444444000.
  ...044444DD4D0..
  ...0444D4DDDD0..
  04444444444DD0..
  ...044D4444D40..
  ...0444DDDD440..
  ...00044444D000.
  ...0DD4444444D0.
  ...0DDDDDDDDDD0.
  ...044D4D4D4D40.
  ...000000000000.`],
    [enemy3r, bitmap`
  .000000000000...
  .04D4D4D4D440...
  .0DDDDDDDDDD0...
  .0D4444444DD0...
  .000D44444000...
  ..044DDDD4440...
  ..04D4444D440...
  ..0DD44444444440
  ..0DDDD4D4440...
  ..0D4DD444440...
  .000444444000...
  .044444444440...
  .0D4D4D4D4DD0...
  .0D4D4D4D4DD0...
  .000000000000...
  ................`]
  );
}

changeSprite();

setBackground(black);

let level = 0;

const levels = [
  map`
wwwwwwwwwwwwwwwwwwwwww
wf...................w
w...................gw
w..w..w...ww.ww.w.w..w
w..w..w...ww.ww.w.w..w
w..w..w...wwsww.w.w..w
w..wssw...wwsww.w.w..w
w..w..w...ww.ww.w.w..w
w..w..w.........w.w..w
w..w..w...ww.w..w.w..w
w.........ww.w.......w
wh...www........www..w
wss..www........www.sw
w.........w..w.......w
w..w..w...wwww..w.w..w
w..w..w...wwww..w.w..w
w..w..w...w..w..w.w..w
w..w.pw...w..w..wsw..w
w..w..w.........w.w..w
w..w..w...www...w.w..w
w.........w.w......e.w
wwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwww
wf..................ow
w....................w
w..w..w...ww.ww.w.w..w
w..w..w...ww.ww.w.w..w
w..w..w...wwsww.w.w..w
w..wssw...wwsww.w.w..w
w..w..w...ww.ww.w.w..w
w..w..w.....j...w.w..w
w..w..w...ww.w..w.w..w
w.........ww.w.......w
wm...www........www..w
wss..www........www.sw
w.........w..w.......w
w..w..w...wwww..w.w..w
w..w..w...wwww..w.w..w
w..w..w.p.w..w..w.w..w
w..w..w...w..w..wsw..w
w..w..w.........w.w..w
w..w..w...www...w.w..w
wh........w.w......i.w
wwwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwwww
w....................w
wt......j........o...w
w..w..w...ww.ww.w.w..w
w..wf.w...ww.ww.w.w..w
w..w..w...sssss.w.w..w
w..ssss...sssss.w.w..w
w..w..w...ww.ww.w.w..w
w..w..w.........w.w..w
w..w..w...ww.w..w.w.ow
w.........ww.w.......w
w....www........www..w
wss..www......e.www.sw
w.........w..w.......w
w..w..w...wssw..w.w..w
w..w..w...wssw..w.w..w
w..s..s...w..w..w.w..w
w..s.ps...w..w..wsw..w
w..w..w.........w.w..w
w..w..w...www..iw.w..w
wt........w.w....h...w
wwwwwwwwwwwwwwwwwwwwww`,
];
 
setMap(levels[level]);

InitializeTanks();

onInput("w", () => {
  Pframe = 0;
  const playerSprite = getFirst(player);
  playerSprite.y -= 1;
});

onInput("a", () => {
  Pframe = 1;
  const playerSprite = getFirst(player);
  playerSprite.x -= 1;
});

onInput("s", () => {
  Pframe = 2;
  const playerSprite = getFirst(player);
  playerSprite.y += 1;
});

onInput("d", () => {
  Pframe = 3;
  const playerSprite = getFirst(player);
  playerSprite.x += 1;
});

onInput("k", () => {
  if(bullet == 0){
    bullet = 1;
  const playerSprite = getFirst(player);
  addSprite(playerSprite.x, playerSprite.y, plaser);
  var newLaser = getAll(plaser)[getAll(plaser).length - 1];

  const _copyPframe = Pframe;
  
  const bullet_travel = (orientation, curlaser) => {    
    if (orientation == 0) {
      curlaser.y -= 1
    } else if (orientation == 1) {
      curlaser.x -= 1
    } else if (orientation == 2) {
      curlaser.y += 1
    } else if (orientation == 3) {
      curlaser.x += 1
    }

    handleObjectHit(curlaser);
  }
  
  laser_anim = setInterval(() => bullet_travel(_copyPframe, newLaser), 30);
  setTimeout(() => { if(newLaser) newLaser.remove(); }, 1000);
} 
});

function handleObjectHit(currentLaser)
{
  const laserX = currentLaser.x, laserY = currentLaser.y;

  var tiles = getTile(laserX, laserY);

  for(var i = 0; i < tiles.length; i++) {
    var tile = tiles[i];
    
    if (tile.type === wall) {
       bullet = 0;
      currentLaser.remove();
      clearInterval(laser_anim);
      return;
    }
  
    if (tile.type === breakable) {
       bullet = 0;
      removeSprite(laserX, laserY, breakable)
      currentLaser.remove();
      addSprite(laserX, laserY, blast);
      
      setTimeout(() => {
         bullet = 0;
        removeSprite(laserX, laserY, blast);
      }, 200);
      clearInterval(laser_anim);
      return;
    }
  }

  currentTanks.forEach(tank => {
    if(tank.TakeHit(laserX, laserY)) {
       bullet = 0;
      currentLaser.remove();
      clearInterval(laser_anim);
    }
  });
}

afterInput(() => {
  changeSprite();

  if(currentTanks.length == 0)
  {
    changeSprite();
    addText("level: " + level + " completed", { y: 8, color: color`2` });
    setTimeout(() => {
      clearText();
      }, 1000);
     level += 1;
    if (level >= levels.length) {
      addText("you have beaten the game", { y: 8, color: color`2` });
    } else {
      setMap(levels[level]);
      InitializeTanks();
    }
  }
});

setInterval(() => {
  currentTanks.forEach(tank => {
    tank.Move();
  });
}, 500);

setInterval(() => {
  currentTanks.forEach(tank => {
    tank.ChangeDirection();
  });
}, 2000);