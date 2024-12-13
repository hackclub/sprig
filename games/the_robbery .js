
/* 
@title: maze_game_starter
@author: Cheru Berhanu
@tags: []
@addedOn: 2023-08-08
*/

    const player = "p";
    const wall = "w";
    const goal = "g";
    const block = "b";
    const wall2 = "o";
    const enemy = "e";
    const bullet = "q"
setLegend(
	[ player, bitmap`
................
................
................
......DDD.......
...DDD...DDD....
...DD...0..D....
....DDD....D....
.....DD....DD...
......D.....D...
.DDDDDD.....D...
..DDDD......D...
.....D......D...
.....D....D.DD..
.....DDDDDDDDD..
.......D..D.....
.......D..D.....` ],
    [ wall, bitmap `
0000000000000000
0000000000LL0000
000000000LLLL000
000000009990L000
0000000099922220
0000000009022220
0000000000022222
0000000000002222
0000000000002222
0000000000000222
0000000000000022
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
    [ goal, bitmap`
0300000300000003
0333000330000333
003CCC00030CCC30
000C6CC003CC6C00
300C66CCCCC66C00
330C0666C0600C00
033C6006C6066C30
003C0066C6600C33
000C6606C6006C33
000C6666C6666C03
000CCCCCCCCCCC00
000033CCCCC00000
0003300000330000
0033000000333000
3303300000003300
3000030000000330`],
    [ block, bitmap`
CCCCCCCCCCCCCCCC
CC..........4.CC
CC..........48CC
CCCCCCCCCCCCCCCC
CC0...........CC
CC0F.......555CC
CCCCCCCCCCCCCCCC
CC96.........1CC
CC96C.......31CC
CCCCCCCCCCCCCCCC
CC7.94........CC
CC7394D.......CC
CC7394D555....CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
    [ wall2, bitmap`
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
    [ enemy, bitmap`
....777777......
..7777777777....
..77222722270...
..02227222270...
..02202220220...
..02202220220...
..04422322440...
..04422222440...
..02006222020...
..02200000020...
..02222262220...
...000000000....
................
................
................
................`],
    [bullet, bitmap`
................
................
................
................
......9C........
....9CC.........
....C11111......
...C11LLLL......
....C11111......
....9CC.........
.....99C........
................
................
................
................
................`]
)

setSolids([ player, wall, block, wall2, enemy]); // sprites cannot go inside of these blocks

let health = 100

let level = 0;
let levels = [
	map`
opw
o.o
o.w
o.o
o.w
o.o
o.w
o.o
o.w
o.o
o.w
o.o
o.w
o.o
ogw`, 
    map`
o.poooooooooooo
o..wbbbb...bbbo
o.bw....bb.b.bo
o..wbb.......bo
o..wwbbbbbb..bo
o...wwwwoob..go
o......o.oo..bo
o.......ooo..bo
o............bo
o............bo
ooooooooooooooo`,
    map`
pb..........b...b...b....
.b.bb.bbb...bb..b...b....
.b.bbb...b.b..b..b....b..
.b.bb....b.b....b..bb..b.
.bbb..b.b..b........bbbbb
.b..bb..bb.b..b..bb....b.
...bb.bb.b.b...b...b.....
.b....b....b....b..bb.b..
bb.b....b.b.........bb.b.
...bbb..bbb...bb.....b...
bb...b....bb....bb.......
.bbb.bbb.....bbb..bbbb.b.
...bb.b........bb........
bb..b.bbbbb.bb.bbb..b..b.
.b..b..b.b...bbb.b...b.bb
.bb.bb.b.bb.............b
..bb.bb....b......b...b..
....bbbb.bb.bbb...bbbb.b.
..bbbb.bb.bb..bb..b..bb.b
b...b...b..bb....bb....bb
.....bb..b..bbb...bb....b
......bbbb....bb...bbb..g`,
    map`
wowowowowowowowowowow
p....b..bb...b...b..b
.....b....b...b.b...g
owowowowowowowowowowo`,
    map`
owowowowowoo
o........b.o
o..b..b.qebw
op........go
o.......qebw
o.......b..o
o..b..b....w
owowowowowoo` 
]
// level = level + 1 // increment the level number by 1
setMap(levels[level]) // update Sprig represented by the level number

setPushables({
	[ player ]: [block, player]
})

onInput("s", () => {
	getFirst(player).y += 1; // positive y is downwards
})
onInput("w", () => {
    getFirst(player).y -= 1; // negative y is upwards 
})
onInput("a", () => { 
    getFirst(player).x -=1;
})
onInput("d", () => {
    getFirst(player).x +=1;
})
onInput("j", () => {
    setMap(levels[level]);
})
// these get run after every input
afterInput(() => {
    const goalsCovered = tilesWith(player, goal); // tiles that both contain the player and goal

    for (let i = 0; i < getAll(enemy).length; i++) {
      addSprite(getAll(enemy)[i].x, getAll(enemy)[i].y, bullet)
    }
  
    // if at least one goal is overlapping with a player, proceed to the next level
    if (goalsCovered.length >= 1) {
        // increase the current level number
        level = level + 1;

        // check if current level number is valid
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            addText("you win!", { y: 4, color: color`0` });
          level = level + 1 
          setMap(levels[level]) 
        }
    }
    if (health <= 0){
      setMap(levels[level]);
      health = 100
    }
  
})

function game() {
  const gameLoop = setInterval(() => {

    for (let i = 0; i < getAll(bullet).length; i++) {
      getAll(bullet)[i].x -= 1
      getAll(bullet)[i].y += Math.floor(Math.random() * 3) - 1
    }
    if (tilesWith(player, bullet).length >= 1) {
      health -= 20;
    }
    clearText()
    addText(health+"" , { x: 0 , y: 0, color: color`2`})
      
            
  }, 333)
}

game() 