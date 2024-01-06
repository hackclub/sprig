
/* 
@title: Meteor_Dodge
@author: Kritav
@tags: ['endless']
@img: ""
@addedOn: 2023-04-27
*/

    /*
* Meteor Dodge
* wasd to move
* don't hit the meteors
* my first game in javascript
*
*
*/

//variables
const background = "b"; 
const player = "p";
const meteorV = "v";
const meteorH = "h";
let isDead = false;
let score = 0;
let highScore = 0;


setLegend(
  [meteorV ,bitmap`
................
................
................
.......1LL......
.....1LLLLL.....
....1LLL11LL....
...0LLL111L0....
...0LLLL11L0....
...LL11LLLL0....
....0L1LLL0.....
.....00000......
................
................
................
................
................`],
  [ player, bitmap`
................
.....4444444....
....444444444...
...44442224444..
..4444222224444.
..4442200022444.
..444221L022444.
..4D442LL0244D4.
..44D4422244D44.
...44D44444D44..
....44DDDDD44...
....444242444...
...44..444..44..
.444.........444
.444.........444
................` ], 
  [background,bitmap`
0000000000000000
0000000000000000
0000000000002000
0000000000000000
0000002000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000002000
0000000000000000
0002000000000000
0000000000000000
0000000000000000`],
  [meteorH ,bitmap`
................
................
................
................
.....L000.......
....LLLLL0......
...LL111LL0.....
...LL111LL0.....
...1LL1LLL0.....
....LLLL110.....
....1LLL1L0.....
.....1LLL0......
......00L.......
................
................
................`]
)
setBackground(background);
setSolids([])

let level = 0
const levels = [
  map`
........
........
........
........
........
........
......p.
........`
]


//methods
setMap(levels[level])
setPushables({
  [ player ]: []
})

onInput("i", () => 
  {
    if (isDead)
      clearText();
      score = 0;
      isDead = false;
  }
    
);

onInput("w", () => 
  {
    if (!isDead)
    getFirst(player).y -= 1;
  });

onInput("a", () => 
  {
    if (!isDead)
    getFirst(player).x -= 1;
  });

onInput("s", () => 
  {
    if (!isDead)
    getFirst(player).y += 1;
  });

onInput("d", () => 
  {
    if (!isDead)
    getFirst(player).x += 1;
});

function spawnMeteorV() 
{
  let x = Math.floor(Math.random() * 8);
  let y = 0; 
  addSprite(x, y, meteorV);
}

function spawnMeteorH() 
{
  let x = 0
  let y = Math.floor(Math.random() * 8);
  addSprite(x, y, meteorH);
}

function moveMeteorsV() 
{
  let meteors = getAll(meteorV);

  for (let i = 0; i < meteors.length; i++) 
  {
    meteors[i].y += 1;
  }
}

function moveMeteorsH() 
{
  let meteors = getAll(meteorH);

  for (let i = 0; i < meteors.length; i++) 
  {
    meteors[i].x += 1;
  }
}

function despawnMeteorsV() 
{
  let meteorArray = getAll(meteorV);

  for (let i = 0; i < meteorArray.length; i++) 
  {
   if (meteorArray[i].y >= 7) 
   {
     meteorArray[i].remove();
     if (!isDead)
     score++;
   }
  }
}

function despawnMeteorsH() 
{
  let meteorArray = getAll(meteorH);

  for (let i = 0; i < meteorArray.length; i++) 
  {
   if (meteorArray[i].x >= 7) 
   {
     meteorArray[i].remove();
     score++;
   }
  }
}
function despawnMeteors()
{
let meteorArray = getAll(meteorH);

  for (let i = 0; i < meteorArray.length; i++) 
  {
     meteorArray[i].remove();
  }

  meteorArray = getAll(meteorV);

  for (let i = 0; i < meteorArray.length; i++) 
  {
     meteorArray[i].remove();
  }
}

function meteorTouchingPlayer() 
{
  let meteorArrayV = getAll(meteorV);
  let meteorArrayH = getAll(meteorH);
  let p = getFirst(player);

  for (let i = 0; i < meteorArrayV.length; i++) 
  {
    if (meteorArrayV[i].x == p.x && meteorArrayV[i].y == p.y) 
    {
      isDead = true;
      return true;
    }
  }

  for (let i = 0; i < meteorArrayH.length; i++) 
  {
    if (meteorArrayH[i].x == p.x && meteorArrayH[i].y == p.y) 
    {
      isDead = true;
      return true;
    }
  }

  return false;
}

var gameLoop = setInterval(() => {
  if (!isDead)
    {
  		despawnMeteorsV();
  		despawnMeteorsH();
 		moveMeteorsV();
  		moveMeteorsH();
 		spawnMeteorV();
  		spawnMeteorH();
    }
	
  if (meteorTouchingPlayer()) 
  {
    if (score > highScore)
    {
      highScore = score;
    }
    
    //clearInterval(gameLoop);
    isDead = true;
    despawnMeteors();
    
    {
      addText("YOU DIED!", {
        x: 6,
        y: 7,
        color: color`2`
      });
  
      addText("Score " + score.toString(), {
        x: 6,
        y: 8,
        color: color`2`
      });
  
      addText("HighScore " + highScore.toString(), {
        x: 4,
        y: 9,
        color: color`6`
      });
      addText("i to Restart", {
        x: 4,
        y: 10,
        color: color`2`
      });
    }
  }
}, 1000);


  
