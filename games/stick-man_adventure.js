/*
@title: stick-man adventure
@author: Tak-min
@tags: ["adventure"]
@addedOn: 2025-08-08
@description: A adventure game where you jump and bounce to reach the goal. 
*/

const player = "p"
const grass = "g"
const platform = "c"
const platform_left = "l"
const platform_right = "r"
const end_1 = "e"
const sky = "s"
const dirt = "d"

setLegend(
  [ player, bitmap`
................
................
.....0000.......
....777700......
....777700......
....000000......
....00000.......
.....7777.......
....000000......
....0.00.0......
...00.00.0......
...0..00.00.....
...0..00..0.....
.....0000.......
.....0..0.......
....00..00......` ],
  [ platform, bitmap`
3333333333333333
3333333333333333
3333333333333333
3339333333393933
9939993933999933
9999999999999999
9999999999999999
9999999999999999
................
................
................
................
................
................
................
................` ],
  [ platform_left, bitmap`
3333333333333333
3333333333333333
3339333333393933
9939993933999993
.999999999999999
.999999999999999
..99999999999999
....999999999999
................
................
................
................
................
................
................
................` ],
  [ platform_right, bitmap`
3333333333333333
3333333333333333
3333333333333333
3339333333393933
9939993933999993
999999999999999.
99999999999999..
999999999999....
................
................
................
................
................
................
................
................` ],
  [ end_1, bitmap`
....39999993....
...3993333999...
..933333333399..
.93399999933399.
9399933399933393
3393339999933399
3933399339993339
9933993939393399
9333933993993393
9933993333993993
3933399999933933
3393333333339939
.33993333339939.
..339993999333..
...3339993333...
....99999999....` ],
  [ sky, bitmap`
2929292929292929
9292929292929292
2929292929292929
9292929292929292
2929292929292929
9292929292929292
2929292929292929
9292929292929292
2929292929292929
9292929292929292
2929292929292929
9292929292929292
2929292929292929
9292929292929292
2929292929292929
9292929292929292` ],
)

setSolids([player, grass, platform, platform_left, platform_right, dirt])

let level = 0
const levels = [
  map`
ssssssssss
ssssssssss
sssssss.ss
s.sss....s
...s......
.e........
........p.
cccccccccc`,
  map`
p.....ssss
ccccr..sss
.........s
...lcr....
..........
.lccr.....
.......e..
..........`,
  map`
ss...ss..s
p.........
cccccccr..
..........
...lcccccc
.........e
..........
...cccccr.`,
  map`
ss....ssss
s......sss
....p....s
....lccr..
.........e
..lccr...l
......lr..
ccr.......`,
  map`
essss.ssss
r.ss....ss
..........
ccr...lr..
..........
.........l
p.........
cccr..lccc`,
  map`
ssssssssss
.s.sssssss
....ss.sss
e........s
r.........
..lr......
.....lr..p
........lr`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

addText("right A", { 
  x: 3,
  y: 1,
  color: color`D`
})
addText("left D", { 
  x: 3,
  y: 2,
  color: color`D`
})
addText("up w", { 
  x: 3,
  y: 3,
  color: color`D`
})

isJumping = false;
isDied = false;

function gravity() {
  let prev_y = getFirst(player).y;
  const gravity_interval = setInterval(function() {
    if (isDied) {
      clearInterval(gravity_interval);
      return;
    }
    prev_y = getFirst(player).y;
    getFirst(player).y += 1;
    if (getFirst(player).y == prev_y) {
      clearInterval(gravity_interval);
      isJumping = false;
    } else if (getFirst(player).y == 7) {
      clearInterval(gravity_interval);
      isDied = true;
      addText("You Died", { 
        x: 6,
        y: 6,
        color: color`D`
      });
      addText("Play Again", { 
        x: 6,
        y: 7,
        color: color`D`
      });
      return;
    }
    after_move();
  }, 250);
  // clearInterval(gravity_interval);
}

onInput("w", () => {
  if (!isDied) {
    if (!isJumping) {
      isJumping = true
      getFirst(player).y -= 1;
      setTimeout(function(){ getFirst(player).y -= 1;}, 50);
      setTimeout(gravity, 100);
    }
  }
});
onInput("a", () => {
  if (!isDied) {
    getFirst(player).x -= 1;
    if (!isJumping) gravity();
  }
});
onInput("d", () => {
  if (!isDied) {
    getFirst(player).x += 1;
    if (!isJumping) gravity();
  }
});

function after_move() {
  if (tilesWith(player, end_1).length == 1) {
    level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
      animation = false;
      clearText();
      if (level == 5) {
        addText("Thanks for playing!", { 
          x: 1,
          y: 14,
          color: color`D`
        })
      }
    }
  }
}

afterInput(() => {
  after_move();
})
