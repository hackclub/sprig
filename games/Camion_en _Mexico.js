/*
@title: Camión en México
@author: Cesar Garnica
@tags: ["levels", "maze"]
@addedOn: 2024-08-23
*/
/*The goal is to reach the end with a minimum amount of money. To advance to the next level, 
you must reach it with the blue-capped stickman with at least 3 points. There are 
three other types of stickman: the normal one gives 1 point, the one with the clubs gives 0.5 points,
and the one with red eyes subtracts 1 point. The other buses (red, yellow, and blue) 
will send you back to the beginning of the level you are in.*/

/*It's very easy once you realize all the mistakes I didn't fix, but it's the best I could do; 
it's my first time writing code in JavaScript.*/

const player = "p"
const wall = "w"
const usuario = "u"
const viejito = "v"
const asaltante = "a"
const checa_rutas = "c"
const checador_gandalla = "g"
const river = "r"
const antiguo = "*"
const raro = "o"
const tu_lugar = "t"
const compas_de_ruta= "b"
const fondo = "f"
const genteesperando = "e" 
const collectUsuario = tune`
500: G5~500,
15500`
const collectViejito = tune`
500: D5~500,
15500`
const collectChecador = tune`
500: B5~500,
15500`
const collectAsaltante = tune`
500: B5-500,
15500`
const win = tune`
500: C5~500,
500: D5~500,
500: E5~500,
500: F5~500,
500: E5~500,
500: D5~500,
500: E5~500,
500: D5~500,
500: C5~500,
11500`
const lose = tune`
500: C5~500,
500: B4~500,
500: A4~500,
500: G4~500,
500: A4~500,
500: B4~500,
500: A4~500,
500: G4~500,
500: A4~500,
500: B4~500,
11000`
const choque = tune`
500,
500: G5/500 + A5/500,
15000`
setLegend(
  [ player, bitmap`
................
................
..000000000000..
.04444444444440.
0000000000000000
.07777777777770.
.07777777777770.
.07777777777770.
.00000000000000.
.02044444444020.
.00044444444000.
.04444444444440.
.00000000000000.
.000........000.
.000........000.
................` ],
  [ wall, bitmap`
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
0000000000000000` ],
  [ usuario, bitmap`
................
................
......000.......
.....0...0......
.....0...0......
.....0...0......
......000.......
.......0........
.....00000......
....0..0..0.....
.......0........
......0.0.......
.....0...0......
................
................
................` ],
  [ viejito, bitmap`
................
......CCC.......
.....CCCCC......
....CCCCCCC.....
.....0...0......
.....0...0......
.....0...0......
......000.......
.......0...CC...
.....00000C..C..
....0..0..0.....
.......0..C.....
......0.0.C.....
.....0...0C.....
................
................` ],
  [ asaltante, bitmap`
................
................
......000.......
.....00000......
.....03030......
.....00000......
......000.......
.......0..LLL...
.....00000L.....
....0..0..0.....
.......0........
......0.0.......
.....3...3......
................
................
................` ],
  [ checa_rutas, bitmap`
................
......777.......
.....77777......
.....7777777....
.....0...0......
.....0...0......
.....0...0......
......000.......
....3..0..11....
....60000022....
....0..0..02....
....6..0..22....
....L.0.0.......
.....0...0......
................
................` ],
  [ checador_gandalla, bitmap`
................
......333.......
.....33333......
.....3333333....
.....00000......
.....00000......
.....00000......
......000.......
....5..0..11....
....50000022....
....0..0..22....
....5..0..22....
......0.0.......
.....0...0......
................
................` ],
  [ river, bitmap`
...........0....
.000000000000...
.0003020777030..
.0003000777030..
...03330777030..
...03330777030..
...03330777030..
...03330777030..
...03330777030..
...03330777030..
...03330777030..
...03330777030..
.0003000777030..
.0003020777030..
.000000000000...
...........0....` ],
  [ antiguo, bitmap`
................
................
..000000000000..
.05555555555550.
0000000000000000
.07777777777770.
.07777777777770.
.07777777777770.
.00000000000000.
.02055555555020.
.00055555555000.
.05555555555550.
.00000000000000.
.000........000.
.000........000.
................` ],
  [ raro, bitmap`
................
.000........000.
.000........000.
.00000000000000.
.06666666666660.
.00066666666000.
.02066666666020.
.00000000000000.
.07777777777770.
.07777777777770.
.07777777777770.
0000000000000000
.06666666666660.
..000000000000..
................
................` ],
  [ tu_lugar, bitmap`
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111
1111111111111111` ],
   [ compas_de_ruta, bitmap`
................
................
..000000000000..
.0DDDDDDDDDDDD0.
0000000000000000
.07777777777770.
.07777777777770.
.07777777777770.
.00000000000000.
.020DDDDDDDD020.
.000DDDDDDDD000.
.0DDDDDDDDDDDD0.
.00000000000000.
.000........000.
.000........000.
................` ],
  [ fondo, bitmap`
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
2222222222222222` ],
  [ genteesperando, bitmap`
................
................
......000.......
.....03330......
.....03330......
.....03330......
......000.......
.......0........
.....00000......
....0..0..0.....
.......0........
......0.0.......
.....0...0......
................
................
................` ],
 
 
    
);

setBackground(fondo)

var score = 0
const dineroTexto = addText(`Dinero: ${score}`, { x: 0, y: 0, color: color`5` });
addText(`Dinero: ${score}`,{x: 0, y: 0, color: color`5`});

let level = 0 ;
const levels = [
   map`
.wwwwu..g
c..wuw..w
ww.....wv
u.....w..
aw......w
...ww...w
vw...wa.w
w..w..w..
p..wa.uwu`,
  map`
p.w.....v.g
w..w.......
.wv...rww..
..........r
.w...w.w...
.ww.uw..w..
u....w....u
o..........
wwwwo...www
....ua..w.w
v....c....a`,
   map`
uw*..w.....p
.....wu.....
............
wwww.wa..wv.
g..a..w.w.ww
.......wu..v
vw..o.....a.
wuw...o..www
w.w...w.....
w.w.w..w*..u
w.w....aw...
a....u...w.c`,
    map`
uw*..w.....p
.....wu.....
............
wwww.wa..wv.
g..a..w.w.ww
.......wu..v
vw..o.....a.
wuw...o..www
w.w...w.....
w.w.w..w*..u
w.w....aw...
a....u...w.c`,
   map`
pw..*.w.u...
.w....w.....
.w...ww..ww.
....vw.....c
*.....w..w..
www......w..
v.......owu.`,
   map`
*w..wv.a......
.w..w.w.......
.w..w..w..*..a
.w..w.u.w.....
....w....w.w..
.w.uw.v....rw.
......wwwwwwc.
.w..w....*.uw.
.w..w......w..
.wa.wa..w.....
.w..w..wu.a.w.
.w..w..uw...w.
.w..w.www...w.
pwou.v....v..r`,
   map`
ca...u*u...g
...........w
.aw.*.....w*
..w.....a...
.uw..rwwww.v
..w.........
..wv...a....
............
uo.a..uwww.p`,
   map`
p.wt.b.b.b.w
..w........w
..wwwww..www
e...........
e..........r
eo...eeeeee.`,
];

const currentLevel = levels[level];
setMap(currentLevel);


setSolids([player,wall,compas_de_ruta,genteesperando])


setPushables({
  [ player ]: []
});
function updateText() {
 clearText(); 
 addText(`Dinero: ${score}`, { x: 0, y: 0, color: color`5` }); 
}
function removeSprite(player,viejito) {
  if(tilesWith(sprite,player).length >= 1) {
    sprite.remove();
  }
}  

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

  
let dineroText = addText(`Dinero: ${score}`, { x: 0, y: 0, color: color`5` });
onInput("j", () => {
level=0
score=0  
const newLevel = levels[level];
  
  if (newLevel) {
    setMap(newLevel); 
    clearText(7, 8); 
    clearText(0, 10);
  }

});

afterInput(() => {
  const playerSprite = getFirst(player);
  const checkpointSprite = getFirst(checa_rutas); 
  
  if (playerSprite && checkpointSprite) {
    if (playerSprite.x === checkpointSprite.x && playerSprite.y === checkpointSprite.y) {
      if ( score >= 3 ) {
      playTune(collectChecador);
      level++; 
      const newLevel = levels[level];
      
      if (newLevel) {
          setMap(newLevel); 
        }
      }
    }
  }
});
afterInput(() => {
 if (tilesWith(usuario, player).length >= 1) {
   playTune(collectUsuario);
  score += 1
   
}
  updateText()
})

afterInput(() => {
 if (tilesWith(viejito, player).length >= 1) {
    playTune(collectViejito);
  score += 0.5;
   
}
  updateText()

})

afterInput(() => {
 if (tilesWith(asaltante, player).length >= 1) {
    playTune(collectAsaltante);
  score -= 2
}
  updateText()
})

afterInput(() => {
  const playerSprite = getFirst(player);
  const winSprite = getFirst(tu_lugar); 
  
  if (playerSprite && winSprite && score >= 10) {
    if (playerSprite.x === winSprite.x && playerSprite.y === winSprite.y) {
      playTune(win);
      addText("You win!", { x: 7, y: 8, color: color`4` }); 
      addText("Press j to restart", { x: 1, y: 10, color: color`6` }); 
    }
  }
});
afterInput(() => {
  const playerSprite = getFirst(player);
  const winSprite = getFirst(tu_lugar); 
  
  if (playerSprite && winSprite && score < 10) {
    if (playerSprite.x === winSprite.x && playerSprite.y === winSprite.y) {
      playTune(lose);
      addText("You lose!", { x: 6, y: 8, color: color`3` }); 
      addText("Press j to restart", { x: 1, y: 10, color: color`6` }); 
    }
  }
});
afterInput(() => {
    
    const choque = tilesWith(player, river);
    
    if (choque.length > 0) {
        setMap(levels[level])
       
    }
})
afterInput(() => {
    
    const choque = tilesWith(player, antiguo);
    
    if (choque.length > 0) {
        setMap(levels[level]);
    }
})
afterInput(() => {
    
    const choque = tilesWith(player, raro);
    
    if (choque.length > 0) {
        setMap(levels[level])
    }
})


