
/* 
@title: Among_The_Stars
@author: VanGo
@tags: ['endless']
@img: ""
@addedOn: 2023-04-11
*/

    var Previous = 1;
var Player = 1;
var PlayerMoveSpeed = 3;
var PlayerX = 40;
var PlayerY = 32;
var score = 0;
var FlyLazerSpeed = 1000;
var EnemySpawnRate = 500;
var EnemyMoveRate = 500;
var Iterations = 0;
var LazerCharged = false;
var PlayerCanMove = true;
var Pause = false;
var Levels = 0;
var LastDir = "d";
const player1 = "p";
const player2 = "w";
const Backround = "b";
const FlyLazerLeft = "j";
const FlyLazerRight = "l";
const FlyLazerUp = "i";
const FlyLazerDown = "k";
const Enemy = "e";
const ShopTheme = tune`
37.5: A5/37.5 + G5-37.5 + F5/37.5,
37.5: G5/37.5 + F5-37.5 + E5/37.5,
1125`
const LazerSFX = tune`
49.504950495049506: A5/49.504950495049506 + G5-49.504950495049506 + F5/49.504950495049506,
49.504950495049506: G5/49.504950495049506 + F5-49.504950495049506 + E5/49.504950495049506,
1485.1485148514853`
const EnemyMoveSFX = tune`
37.5: D4~37.5,
1162.5`
setLegend(
  [player1, bitmap`6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
................
................
................
................
................
................
................
................` ], 
  [player2, bitmap`
................
................
................
................
................
................
................
................
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [Backround, bitmap`
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
  [FlyLazerLeft, bitmap`
................
................
................
................
..........6.....
.......66.66....
.666.....666....
...6.666..666666
66.6666666666666
666..66666666..6
.....6.6666.....
..........6.....
...........6....
................
................
................`],
  [FlyLazerRight, bitmap`
................
................
................
................
.....6..........
....66.66.......
....666.....666.
666666..666.6...
6666666666666.66
6..66666666..666
.....6666.6.....
.....6..........
....6...........
................
................
................`],
  [FlyLazerUp, bitmap`
.......666......
.......66.......
.......66.......
.......666......
.....66666..6...
....66666666....
......6.666.....
.....6..666.....
.....6.6666.....
.......666......
.......6666.....
........6.......
......666.......
......6..6......
......6.66......
........66......`],
  [FlyLazerDown, bitmap`
......66........
......66.6......
......6..6......
.......666......
.......6........
.....6666.......
......666.......
.....6666.6.....
.....666..6.....
.....666.6......
....66666666....
...6..66666.....
......666.......
.......66.......
.......66.......
......666.......`], 
  [Enemy, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`]
)

setSolids([])

let level = 0;
const levels = [
  map`
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
e...............................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................
................................................................................`
]

setTimeout(function(){ LazerCharged = true; }, FlyLazerSpeed);

function reset(){
  Previous = 1;
  Player = 1;
  PlayerX = 40;
  PlayerY = 32;
  score = 0;
  FlyLazerSpeed = 1000;
  EnemySpawnRate = 500;
  EnemyMoveRate = 500;
  Iterations = 0;
  LazerCharged = false;
  PlayerCanMove = true;
  Pause = true;
  Levels = 0;
  setTimeout(function(){ LazerCharged = true; }, FlyLazerSpeed);
  clearText();
  setMap(levels[0]);
    addText("Among the stars", { 
      x: 0,
      y: 1,
      color: color`2`
    })
  setTimeout(function(){ 
    Pause = false;   
    clearText(); 
    setTimeout(function(){if(!Pause){SpawnEnemies()}}, EnemySpawnRate)
    setTimeout(function(){if(!Pause){MoveEnemies()}}, EnemyMoveRate)
  }, 2000);
}
  
setBackground(Backround)

setMap(levels[level])

setPushables({
  [ player1 ]: []
})

  onInput("j", () => {
    if(!Pause){
      if(LazerCharged == true){
        playTune(LazerSFX)
        LazerCharged = false;
        setTimeout(function(){ LazerCharged = true; }, FlyLazerSpeed)
        switch (LastDir) {
          case "w":
            addSprite(PlayerX, PlayerY - 1, FlyLazerUp);
            break;
          case "a":
            addSprite(PlayerX - 1, PlayerY, FlyLazerLeft);
            break;
          case "s":
            addSprite(PlayerX, PlayerY + 1, FlyLazerDown);
            break;
          case "d":
            addSprite(PlayerX + 1, PlayerY, FlyLazerRight);
            break;
          default:
            console.log("I don't know what fruit that is.");
        }
      }
    }
  
  })

  onInput("l", () => {
    setTimeout(PauseFunct(), 500);
  })

  onInput("i", () => {

  })

  onInput("k", () => {
    
  })

  onInput("s", () => {
    if(!Pause){
      if(PlayerY + 1 != 63){
        if(CheckCollision(player1, Enemy, 0, 1) || CheckCollision(player2, Enemy, 0, 1)){
          reset();
        }
        clearTile(PlayerX, PlayerY);
        PlayerY += 1;
        LastDir = "s";
        renderPlayer(false);
        PlayerCanMove = false;
        setTimeout(function(){ PlayerCanMove = true; }, PlayerMoveSpeed);
      }
    }else{
      //menu options
    }
  })

  onInput("w", () => {
    if(!Pause){
      if(PlayerY - 1 != 3){
        if(CheckCollision(player1, Enemy, 0, -1) || CheckCollision(player2, Enemy, 0, -1)){
          reset();
        }
        clearTile(PlayerX, PlayerY);
        PlayerY -= 1;
        LastDir = "w";
        renderPlayer(false);
        PlayerCanMove = false;
        setTimeout(function(){ PlayerCanMove = true; }, PlayerMoveSpeed);
      }
    }
  })

  onInput("a", () => {
    if(!Pause){
      if(PlayerX - 1 != 1){
        if(CheckCollision(player1, Enemy, -1, 0) || CheckCollision(player2, Enemy, -1, 0)){
          reset();
        }
        clearTile(PlayerX, PlayerY);
        PlayerX -= 1;
        LastDir = "a";
        renderPlayer(false);
        PlayerCanMove = false;
        setTimeout(function(){ PlayerCanMove = true; }, PlayerMoveSpeed);
      }
    }else{
      clearText();
      Levels++;
      if(score - LevelUp(Levels, true) >= 0){
        score -= LevelUp(Levels, false);
      }else{
        Levels--
      }
      addText("Level Up\n" + LevelUp(Levels+1,true) + " <-", { 
        x: 0,
        y: 7,
        color: color`2`
      })
    }
  })

  onInput("d", () => {
    if(!Pause){
      if(PlayerX + 1 != 78){
        if(CheckCollision(player1, Enemy, 1, 0) || CheckCollision(player2, Enemy, 1, 0)){
          reset();
        }
        clearTile(PlayerX, PlayerY);
        PlayerX += 1;
        LastDir = "d";
        renderPlayer(false);
        PlayerCanMove = false;
        setTimeout(function(){ PlayerCanMove = true; }, PlayerMoveSpeed);
      }
    }
  })

afterInput(() => {
})

function CheckCollision(Obj1, Obj2, DirX, DirY){
   for (var i = 0; i < getAll(Obj1).length; i++) {
      for (var j = 0; j < getTile(getAll(Obj1)[i].x + DirX, getAll(Obj1)[i].y + DirY).length; j++){
        for(var x = 0; x < getAll(Obj2).length; x++){
          if(getTile(getAll(Obj1)[i].x + DirX, getAll(Obj1)[i].y + DirY)[j] == getAll(Obj2)[x]){
            //clearTile(getAll(Obj1)[i].x + DirX, getAll(Obj1)[i].y + DirY);
            return true;
            break;
          }
        }
      }
   }
    return false;
}

function PauseFunct(){
  Pause = !Pause;
    const playback = playTune(ShopTheme, Infinity);
  if(Pause){
    playback.end();
    //clearText();
    addText("Level Up\n" + LevelUp(Levels+1,true) + " <-", { 
      x: 0,
      y: 7,
      color: color`2`
    })
  }else{
    playback.end();
    clearText();
    PlayerCanMove = true;
    clearTimeout(intervalIdMove);
    clearTimeout(intervalIdSpawn);
    setTimeout(function(){if(!Pause){SpawnEnemies(); MoveEnemies();}}, EnemySpawnRate)
  }
}

function EnemySpeedCalc(Iter){
  EnemySpawnRate =  Math.max(10, EnemySpawnRate - (Iter / 100));
  EnemyMoveRate  = Math.max(10, EnemySpawnRate - (Iter / 200));
}

function LevelUp(Level, Check){
  if(!Check){
    var speedDecrease = Math.sqrt(FlyLazerSpeed) * (FlyLazerSpeed / 40);
    FlyLazerSpeed -= FlyLazerSpeed - speedDecrease;
    if (FlyLazerSpeed < 1) {
      FlyLazerSpeed = 1;
    }
    return 10*(Level ** 2)
  }else{
    return 10*(Level ** 2)
  }
  return 0;
}

function renderPlayer(Change){
  clearTile(PlayerX, PlayerY);
  if(Player == 1){
    addSprite(PlayerX, PlayerY, player2);
    if(Change){
      Player = 2;
    }
  }else{
    addSprite(PlayerX, PlayerY, player1);
    if(Change){
      Player = 1;
    }
    
  }
}

setInterval(function() {
  renderPlayer(true);
  Previous = -Previous;
  if(!Pause){
    Iterations++
    EnemySpeedCalc(Iterations);
  }
}, 510);

function SpawnEnemies(){
  if(!Pause){
    if(Math.round(Math.random() * 1) == 1){
      addSprite(Math.round(Math.random() * 1) * 79, Math.round(Math.random() * 59) + 4, Enemy);
    }else{
      addSprite(Math.round(Math.random() * 79), Math.round(Math.random() * 1) * 59 + 4, Enemy);
    }
    var intervalIdSpawn = setTimeout(function(){if(!Pause){SpawnEnemies()}}, EnemySpawnRate)
  }
}

function MoveEnemies(){
  if(!Pause){
    for (var i = 0; i < getAll(Enemy).length; i++) {
        var dx = PlayerX - getAll(Enemy)[i].x;
        var dy = PlayerY - getAll(Enemy)[i].y;
        var slope = dy / dx;
        var NoEnemies = true;
        if (dx > 0) {
          for (var j = 0; j < getAll(Enemy).length; j++) {
            if (j != i && getAll(Enemy)[j].x == getAll(Enemy)[i].x + 1 && getAll(Enemy)[j].y == getAll(Enemy)[i].y) {
              NoEnemies = false;
              break;
            }
          }
          if(NoEnemies){
            getAll(Enemy)[i].x++;
          }
        } else if (dx < 0) {
          for (var j = 0; j < getAll(Enemy).length; j++) {
            if (j != i && getAll(Enemy)[j].x == getAll(Enemy)[i].x - 1 && getAll(Enemy)[j].y == getAll(Enemy)[i].y) {
              NoEnemies = false;
              break;
            }
          }
          if(NoEnemies){
            getAll(Enemy)[i].x--;
          }
        }
        //y
        if (dy > 0) {
          for (var j = 0; j < getAll(Enemy).length; j++) {
            if (j != i && getAll(Enemy)[j].y == getAll(Enemy)[i].y + 1 && getAll(Enemy)[j].x == getAll(Enemy)[i].x) {
              NoEnemies = false;
              break;
            }
          }
          if(NoEnemies){
            getAll(Enemy)[i].y++;
          }
        } else if (dy < 0) {
          for (var j = 0; j < getAll(Enemy).length; j++) {
            if (j != i && getAll(Enemy)[j].y == getAll(Enemy)[i].y - 1 && getAll(Enemy)[j].x == getAll(Enemy)[i].x) {
              NoEnemies = false;
              break;
            }
          }
          if(NoEnemies){
            getAll(Enemy)[i].y--;
          }
        }
    }
    if(tilesWith(player1, Enemy).length > 0 || tilesWith(player2, Enemy).length > 0){
      reset();
    }
    playTune(EnemyMoveSFX);
    var intervalIdMove = setTimeout(function(){if(!Pause){MoveEnemies()}}, EnemyMoveRate);
  }
}

var intervalIdSpawn = setTimeout(function(){if(!Pause){SpawnEnemies()}}, EnemySpawnRate)

var intervalIdMove = setTimeout(function(){if(!Pause){MoveEnemies()}}, EnemyMoveRate)

setInterval(function() {
  if(!Pause){
    for (var i = 0; i < getAll(FlyLazerLeft).length; i++) {
      for (var j = 0; j < getTile(getAll(FlyLazerLeft)[i].x - 1, getAll(FlyLazerLeft)[i].y).length; j++){
        for(var x = 0; x < getAll(Enemy).length; x++){
          if(getTile(getAll(FlyLazerLeft)[i].x - 1, getAll(FlyLazerLeft)[i].y)[j] == getAll(Enemy)[x]){
            clearTile(getAll(FlyLazerLeft)[i].x - 1, getAll(FlyLazerLeft)[i].y);
            score++
            break;
          }
        }
      
      }
      getAll(FlyLazerLeft)[i].x -= 1;
      if (getAll(FlyLazerLeft)[i].x < 1) {
        getAll(FlyLazerLeft)[i].remove()
      } 
    }
    
    for (var i = 0; i < getAll(FlyLazerRight).length; i++) {
      for (var j = 0; j < getTile(getAll(FlyLazerRight)[i].x + 1, getAll(FlyLazerRight)[i].y).length; j++){
        for(var x = 0; x < getAll(Enemy).length; x++){
          if(getTile(getAll(FlyLazerRight)[i].x + 1, getAll(FlyLazerRight)[i].y)[j] == getAll(Enemy)[x]){
            clearTile(getAll(FlyLazerRight)[i].x + 1, getAll(FlyLazerRight)[i].y);
            score++
            break;
          }
        }
      
      }
      getAll(FlyLazerRight)[i].x += 1;
      if (getAll(FlyLazerRight)[i].x > 78) {
        getAll(FlyLazerRight)[i].remove()
      } 
    }
    
    for (var i = 0; i < getAll(FlyLazerUp).length; i++) {
      for (var j = 0; j < getTile(getAll(FlyLazerUp)[i].x, getAll(FlyLazerUp)[i].y - 1).length; j++){
        for(var x = 0; x < getAll(Enemy).length; x++){
          if(getTile(getAll(FlyLazerUp)[i].x, getAll(FlyLazerUp)[i].y - 1)[j] == getAll(Enemy)[x]){
            clearTile(getAll(FlyLazerUp)[i].x, getAll(FlyLazerUp)[i].y - 1);
            score++
            break;
          }
        }
      
      }
      getAll(FlyLazerUp)[i].y -= 1;
      if (getAll(FlyLazerUp)[i].y < 5) {
        getAll(FlyLazerUp)[i].remove()
      } 
    }
    for (var i = 0; i < getAll(FlyLazerDown).length; i++) {
      for (var j = 0; j < getTile(getAll(FlyLazerDown)[i].x, getAll(FlyLazerDown)[i].y + 1).length; j++){
        for(var x = 0; x < getAll(Enemy).length; x++){
          if(getTile(getAll(FlyLazerDown)[i].x, getAll(FlyLazerDown)[i].y + 1)[j] == getAll(Enemy)[x]){
            clearTile(getAll(FlyLazerDown)[i].x, getAll(FlyLazerDown)[i].y + 1);
            score++
            break;
          }
        }
      
      }
      getAll(FlyLazerDown)[i].y += 1;
      if (getAll(FlyLazerDown)[i].y > 62) {
        getAll(FlyLazerDown)[i].remove()
      } 
    }
  }
  addText("SCORE " + score, { 
    x: 0,
    y: 0,
    color: color`2`
  })
}, 60);
