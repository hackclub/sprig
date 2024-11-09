/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Revenge of the kitty
@author: Pugx23
@tags: ['action']
@addedOn: 2024-09-27
*/

const player = "p"
const floor = "f"
const sun = "s"
const wall = "w"
const boss = "b"
const enemy = "e"
const statue = "t"
const projectile = "o"
const gold = "l"
const goldstatue = "d"

const projectiles = [];

const background = "g"
const background2 = "c"


let isWinTextDisplayed = false;
let isFirstMapTextDisplayed = false;


setLegend(
  [ player, bitmap`
................
................
................
................
................
000..000...000..
020..085000580..
050..055555550..
050..052052050..
0550..7558550...
0555007777770...
.055555555550...
.055555555550...
.055555555550...
.055555555550...
.05050005050....` ],[background, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],[background2, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`], [floor, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
44444444CCC44444
CCCC444CCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`], [sun, bitmap`
7666777666666666
6667767766666666
6777667766666666
7776677776666666
7766776776666666
7777766777666666
7777667767766666
7776677666777666
7777776667777776
7777766677776777
7777667777766677
7777677777666776
7777777776667766
7777777776677766
7777777777777667
7777777777777767`],[wall, bitmap`
LLLLLLLLLLLLLLLL
L11111LL111L111L
L1L11111L11L111L
L11L1LL111L111LL
L111111L1111LL1L
L11LLL11111L111L
L1L11L111LL11L1L
L111L11111L11L1L
L1L111L11L1L111L
LL11LL11L111111L
L11L111111111L1L
L111LL11L1L1L11L
L1LL111L11L11L1L
L1L11L111L111L1L
LL11L1111L1L1L1L
LLLLLLLLLLLLLLLL`], [ boss, bitmap`
................
................
.........00000..
.........000000.
.............000
...........00000
.........0000000
........00000C00
........000CC000
........00000300
........0CCCC00C
......00CCCCCCCC
......00CCCCC222
.......CC2222222
........CCCCCCCC
.........CCCCCCC`] , [projectile , bitmap`
................
................
................
................
................
................
................
................
......CFC.......
.....CCFFC......
.....CFCCF......
......CFC.......
................
................
................
................`],[enemy , bitmap`
................
................
................
................
3333............
8833C...........
...C33.......33.
..3023........33
.33333333......3
8333333333333333
3222333333333333
.333333333333333
....333333333333
....3..3.....3.3
....3..3.....3.3
....3..3.....3.3`],[statue, bitmap`
......L...L.....
.....L1LLL1L....
.....L11111L....
....LL02102LL...
...L1L11111L1L..
..L1LL11111LL1L.
..L1LL1LLL1LL1L.
...L1L11L11L1L..
....LL1LLL1LL...
.....L11L11L....
....LL11111L....
...L11111111L...
...L11LLLL11L...
..L11LLLLLL11L..
..LLL111111LLL..
.L111111111111L.`],[gold, bitmap`
FFFFFFFFFFFFFFFF
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66666666666666F
F66266666666666F
F66626666666666F
F62662666666666F
F66266666666666F
F66626666666666F
F66666666666666F
F66666666666666F
FFFFFFFFFFFFFFFF`],[goldstatue, bitmap`
......0...0.....
.....0600060....
.....0666660....
....007267200...
...06066666060..
..0600666660060.
..0600600060060.
...06066066060..
....006000600...
.....0660660....
....00666660....
...0666666660...
...0660000660...
..066000000660..
..000666666000..
.06666666666660.`]
)

setBackground(background)

setSolids([player, floor, wall, boss, enemy, gold])



let level = 0
const levels = [
  map`
......sw
.......w
.......w
.......w
p..e....
ffffffff`
, map`
wwwwwww
w.....w
w..w..w
p.w.w..
wwwwwww`
, map`
www.www
w..p..w
w.....w
w....e.
wwwwwww`
, map`
wwwwwww
w..e.ew
w..w.ww
p.w..e.
wwwwwww`
, map`
wwwwwww
w.....w
w.....w
p.tet..
wwwwwww`
, map`
wwwwwww
w.....w
w.....w
p..e.b.
wwwwwww`
, map`
lllllll
l.....l
l.....l
p.d.d.l
lllllll`]
setMap(levels[level])


const checkLevelTransition = () => {
  if (getFirst(player).x === width() - 1 && getFirst(player).y === height() - 2) {
    nextLevel();
    if (level < levels.length) {
      setMap(levels[level]);
      setBackground(background2)
    } else {
    }
  }
};
    

function nextLevel() {
  level++
}

const shootProjectile = () => {
  const playerSprite = getFirst(player);
  const newprojectile = addSprite(getFirst(player).x, getFirst(player).y, projectile);
  projectiles.push(newprojectile);
};

const moveProjectiles = () => {
  getAll(projectile).forEach((p) => {
    p.lifespan = p.lifespan ? p.lifespan - 1 : 5;
    
    p.x++;

const getTypeFromTile = (x,y, type) => {
  const sprites = getTile(x,y);
  const sprite = sprites.find((s) => s.type === type);
  return sprite;
};
    
    if (p.lifespan <= 0 || p.x > width() || getTypeFromTile(p.x, p.y, wall, gold)) {
      p.remove();
    }
  });
};

  
setPushables({
  [ player ]: []
})

onInput("k", () => {
  shootProjectile();
});

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  if (jumps > 0){
    getFirst(player).y -=1;
    jumps -= 1;
  
    }
});

let jumps = 1000;

const jump = async () => {
  await createArray(3).reduce(async (promise) => {
    await promise;

    getFirst(player).y--;


    await wait(100);
  }, Promise.resolve());

  await resetGravity();
};
setInterval(() => {
  if (getFirst(player).y === 10) return;

  getFirst(player).y++;
}, 200);

onInput("a", () => {
  getFirst(player).x += -1
})

onInput("d", () => {
  getFirst(player).x += 1
})


const handleProjectileEnemyCollision = () => {
  getAll(projectile).forEach((p) => {

  const enemyHit = getAll(enemy).some((e) => p.x === e.x && p.y === e.y);

    if (enemyHit) {
    p.remove();

    getAll(enemy).forEach((e) => {
      if (p.x === e.x && p.y === e.y) {
        e.remove();
        }
      });
    }
  });
};


const handleProjectileBossCollision = () => {
  getAll(projectile).forEach((p) => {

    const bossHit = getAll(boss).some((b) => p.x === b.x && p.y === b.y);

    if (bossHit) {
      p.remove();


      getAll(boss).forEach((b) => {
        if (p.x === b.x && p.y === b.y) {
          b.remove();
          if (getAll(boss).length === 0 && !isWinTextDisplayed) {
            addText("YOU WIN!", { x: 5, y: 5, color: color`7` });
            isWinTextDisplayed = true;
          }
        }
      });
    }
  });
};

afterInput(() => {
  checkLevelTransition();
  moveProjectiles();
  handleProjectileBossCollision();
  handleProjectileEnemyCollision();
});


                            
