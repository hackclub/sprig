/*
@title: Kitchen Nightmares
@author: Aditya Nair
@tags: []
@addedOn: 2024-05-31
@img: ""
*/
const background = "b"; 
const player = "p";
const tomatoV = "v";
const tomatoH = "h";
let isDead = false;
let score = 0;
let highScore = 0;


setLegend(
  [tomatoV ,bitmap`
.........00.....
.........0......
......0000000...
....0003333300..
....0333333330..
....0333333330..
....0333333330..
....0333333330..
....033333330...
....003333300...
.....0003330....
.......00000....
................
................
................
................`],
  [ player, bitmap`
................
.....00000......
....0022200.....
....0222220.....
...002222200....
...022222220....
...022222220....
...000000000....
...0CCCCCCC0....
..00C00C00C00...
..0CC00C00CC0...
..0CCCCCCCCC0...
..0CCC333CCC0...
..00CCCCCCC00...
...000000000....
................` ], 
  [background,bitmap`
2222002000000002
2222002000000002
2222020000002002
2222020000000022
2222222000000022
2222222000000022
2222222020002022
2222222220202202
2222202220202222
2222222222220222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [tomatoH ,bitmap`
........000.....
........0.......
.....000000.....
....03333330....
...0333333330...
...0333333330...
...0333333330...
...0333333330...
...0333333330...
...0333333330...
....03333330....
.....000000.....
................
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

function spawntomatoV() 
{
  let x = Math.floor(Math.random() * 8);
  let y = 0; 
  addSprite(x, y, tomatoV);
}

function spawntomatoH() 
{
  let x = 0
  let y = Math.floor(Math.random() * 8);
  addSprite(x, y, tomatoH);
}

function movetomatosV() 
{
  let tomatos = getAll(tomatoV);

  for (let i = 0; i < tomatos.length; i++) 
  {
    tomatos[i].y += 1;
  }
}

function movetomatosH() 
{
  let tomatos = getAll(tomatoH);

  for (let i = 0; i < tomatos.length; i++) 
  {
    tomatos[i].x += 1;
  }
}

function despawntomatosV() 
{
  let tomatoArray = getAll(tomatoV);

  for (let i = 0; i < tomatoArray.length; i++) 
  {
   if (tomatoArray[i].y >= 7) 
   {
     tomatoArray[i].remove();
     if (!isDead)
     score++;
   }
  }
}

function despawntomatosH() 
{
  let tomatoArray = getAll(tomatoH);

  for (let i = 0; i < tomatoArray.length; i++) 
  {
   if (tomatoArray[i].x >= 7) 
   {
     tomatoArray[i].remove();
     score++;
   }
  }
}
function despawntomatos()
{
let tomatoArray = getAll(tomatoH);

  for (let i = 0; i < tomatoArray.length; i++) 
  {
     tomatoArray[i].remove();
  }

  tomatoArray = getAll(tomatoV);

  for (let i = 0; i < tomatoArray.length; i++) 
  {
     tomatoArray[i].remove();
  }
}

function tomatoTouchingPlayer() 
{
  let tomatoArrayV = getAll(tomatoV);
  let tomatoArrayH = getAll(tomatoH);
  let p = getFirst(player);

  for (let i = 0; i < tomatoArrayV.length; i++) 
  {
    if (tomatoArrayV[i].x == p.x && tomatoArrayV[i].y == p.y) 
    {
      isDead = true;
      return true;
    }
  }

  for (let i = 0; i < tomatoArrayH.length; i++) 
  {
    if (tomatoArrayH[i].x == p.x && tomatoArrayH[i].y == p.y) 
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
  		despawntomatosV();
  		despawntomatosH();
 		movetomatosV();
  		movetomatosH();
 		spawntomatoV();
  		spawntomatoH();
    }
	
  if (tomatoTouchingPlayer()) 
  {
    if (score > highScore)
    {
      highScore = score;
    }
    isDead = true;
    despawntomatos();
    
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


  
