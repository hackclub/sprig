/*
@title: Untitled
@author: 
@tags: []
@addedOn: 2025-00-00
*/
    const player = "p"
    const wall = "w"
    const wall2 = "s"
    const goal = "g"
    const key = "k"
    const lock = "l"
    const crate = "c"
    const trap = "t"
    const fake = "f"

setLegend(
	[ player, bitmap`
................
................
........0000000.
.....000......0.
....00........0.
...00........00.
...0..0..0...0..
...0..0..0...0..
..0..........0..
..0..00000..0...
..0........00...
..0........00...
..0000000000....
...0......0.....
...0......0.....
...000....000...` ],
    [ wall, bitmap`
....111LL111....
....110LL111....
....1HHLL101....
....1HHLL611....
....111LL611....
....111LL611....
....151LL101....
....115LL111....
....151LL111....
....111LL111....
....511LL111....
....111LLCC1....
....111LLCC1....
....111LLCC1....
....111LLCC1....
....111LL111....` ],
    [ wall2, bitmap`
................
................
................
................
111CCC1110111111
111CCC11HH11CCC1
11111111HH11CCC1
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111141116661111
1441141101110111
1111111111111111
................
................
................
................`],
    [ goal, bitmap`
................
................
.......666666...
......6666666...
.....66666666...
....666666666...
....666666666...
....666666666...
....666666666...
....666666666...
....666666666...
....666666666...
................
................
................
................` ],
    [ key, bitmap`
................
................
................
................
66666666666666..
6...6666666666..
6...6.....66.6..
6...6.....66.6..
66666...........
................
................
................
................
................
................
................` ],
    [ lock, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLL666666LLLLL
LLLLL6LLLL6LLLLL
LLLLL6LLLL6LLLLL
LLLLL6LLLL6LLLLL
LLLLL666666LLLLL
LLLLL666666LLLLL
LLLLL666666LLLLL
LLLLL666666LLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL` ],
    [ crate, bitmap`
LLLLLLLLLLLLLLLL
LLCCCCCCCCCCCCLL
LCLCCCCCCCCCCLCL
LCCLCCCCCCCCLCCL
LCCCLCCCCCCLCCCL
LCCCCLCCCCLCCCCL
LCCCCCLCCLCCCCCL
LCCCCCCLLCCCCCCL
LCCCCCCLLCCCCCCL
LCCCCCLCCLCCCCCL
LCCCCLCCCCLCCCCL
LCCCLCCCCCCLCCCL
LCCLCCCCCCCCLCCL
LCLCCCCCCCCCCLCL
LLCCCCCCCCCCCCLL
LLLLLLLLLLLLLLLL`],
    [ trap, bitmap`
................
................
................
.......3........
......3.3.......
.....3...3......
.....3....3.....
....3.0.0.3.....
...3.......3....
..3..000000.3...
..3..........3..
.33333333333333.
...3.......3....
...3.......3....
...333.....333..
................`],
    [ fake, bitmap`
................
................
................
................
66666666666666..
6...6666666666..
6...6.....66.6..
6...6.....66.6..
66666...........
................
................
................
................
................
................
................` ],
)

setSolids([ player, wall, wall2, crate, lock ])

let level = 0
const levels = [
	map`
..wg
p.w.
..w.
....`,
    map`
....w..c.w.g.
.ss.w....wss.
....w.ss...w.
.c...c...c.w.
sss....sssss.
....w..c.....
..c.w..w.ssss
p...w..w.....
....w..w.....
....w..sss.w.
c...w.....cw.
...c.........
.sss...sss...
......c......`,
    map`
g....
sslss
p....
...w.
...wk`,
    map`
g.
ll
..
.s
..
s.
..
..
.s
..
s.
..
.s
..
s.
..
.s
..
s.
..
.s
..
s.
..
.s
..
s.
..
.s
..
s.
..
..
.s
..
s.
..
.s
..
s.
.p
..
..
..
..
..
..
..
..
k.`,
    map`
k..w.
ss.w.
p.c..
sssls
g....`,
    map`
...p
tc..
..ts
..g.`,
    map`
p...cckc
...c.c.t
...t.ccc
t...cc..
..t.c..t
........
.t.t.wls
.....w.g`,
    map`
ffffffffffffffw.
ffffffffffffffw.
ffffffffffffffwg
ffffffffffffffw.
ffffffffffffffw.
pfffffffffffffl.
fffffffffffkffw.
ffffffffffffffw.
ffffffffffffffw.
ffffffffffffffw.
ffffffffffffffw.
ffffffffffffffw.`,
    map`
pc..t..f
c.....t.
t.t.....
....t.t.
t.t..ssl
k....w..
.t.t.w.g`,
];

setMap(levels[level])

setPushables({
	[ player ]: [crate],
})

onInput("j", () => {
  const currentLevel = levels[level];

  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

onInput("w", () => {
	getFirst(player).y -= 1
})
onInput("a", () => {
	getFirst(player).x -= 1
})
onInput("s", () => {
	getFirst(player).y += 1
})
onInput("d", () => {
	getFirst(player).x += 1
})

afterInput(() => {
  const goalsCovered = tilesWith(player, goal); // tiles that both contain the player and goal
  const keysTaken = tilesWith(player, key); // ADDED: all the keys that the player is on

if (goalsCovered.length >= 1) {

level = level + 1;

    const currentLevel = levels[level];

    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`7` });
    }
}

if (keysTaken.length >= 1) {
getFirst(lock).remove();
getFirst(key).remove();
}

});

afterInput(() => {
    const trapsCovered = tilesWith(player, trap);
    
    if (trapsCovered.length > 0) {
        setMap(levels[level])
    }
})