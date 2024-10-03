/*
@title: Terminal-Dungeon
@author: adadyer
@tags: ['puzzle']
@addedOn: 2022-12-20

WASD to move, IJKL to interact.

Learn about Linux, meet Tux, escape the dungeon. Not a very complicated game. :3
*/

const player = "p";
const wall = "w";
const terminal = "^";
const bg = "b";
const door = "d";
const black = "o"
const openDoor = "r"
const water = "s"
const bridge = "-"
const tux = "8"
const grass = "g"

const openTerminal = tune`
93.75,
93.75: c4/93.75,
93.75: d4/93.75,
93.75: e4/93.75,
93.75: f4/93.75,
2531.25`
const yay = tune`
111.11111111111111,
111.11111111111111: c4~111.11111111111111 + d4~111.11111111111111 + e4~111.11111111111111 + f4~111.11111111111111,
111.11111111111111: f4~111.11111111111111 + e4~111.11111111111111 + d4~111.11111111111111 + c4~111.11111111111111,
111.11111111111111: c4~111.11111111111111 + d4~111.11111111111111 + e4~111.11111111111111 + f4~111.11111111111111,
3111.1111111111113`

setLegend(
  [player, bitmap`
................
......CCC.......
......666.......
......666.......
.....C666C......
....CCC6CCC.....
....C33333C.....
....C33333C.....
....C33333C.....
.....33333......
.....35553......
.....35.53......
.....35.53......
......5.5.......
......5.5.......
......5.5.......`],
  [wall, bitmap`
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
LLLLLLLLLLLLLLLL`],
  [bg, bitmap`
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
1111111111111111`],
  [door, bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [terminal, bitmap`
................
.........0......
.........0LL....
.........0LL....
.........0LL....
.........0LL....
.........0LL....
.........0LL....
....LLLL..LL0...
...CCCCCCCCC0...
...CCLLLCCCC0...
...CC3LLCCC00...
...CCLLLC000C...
...CC3LL00CCC...
...CCLLLCCCCC...
...CCLLLCCCCC...`],
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
  [openDoor, bitmap`
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
1111111111111111`],
  [water, bitmap`
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
7777777777777777`],
  [bridge, bitmap`
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF
FFFFFFFFFFFFFFFF`],
  [tux, bitmap`
................
.....000000.....
....00000000....
...0222002220...
...0202002020...
...0222002220...
...0000000000...
..000009900000..
.00000000000000.
.00000000000000.
.00000222200000.
...0022222200...
....02222220....
.....000000.....
...9999..9999...
................`],
  [grass, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`]
);

setSolids([player, wall, terminal, door, water, tux]);

let level = 0;
const levels = [
  map`
wwwwwww
wp....w
w.....w
w.....w
w....^w
w.....d
wwwwwww`,
  map`
wwwwwwwwdww
w........^w
w.........w
w.........w
w.........w
w.........w
w.........w
wp........w
wwwwwwwwwww`,
  map`
wwwwwwwwwww
wp...s....w
w....s....w
w....s....w
w....s....w
w....s....w
w..^.s....r
wwwwwwwwwww`,
  map`
wwwwwwwww
w.......w
wp..^...r
w.......w
wwwwwwwww`,
  map`
wwwwwwwwww
w........w
w........w
wp....^..w
w........w
w........w
wwwwwwwwww`,
  map`
wwwwwwwww
w..w....w
w.......w
wp...^..r
w.......w
w.....w.w
wwwwwwwww`,
  map`
wwwwwwwwww
w........w
w........w
wp...^...r
w........w
w........w
wwwwwwwwww`,
  map`
wwwwwwwww
w.......w
w.......w
wp..^..8w
w.......w
w.......w
wwwwwwwww`,
  map`
wggggggggg
wggggggggg
wggggggggg
wwwggggggg
b8pggg^ggg
wwwggggggg
wggggggggg
wggggggggg
wggggggggg`
];

setMap(levels[level]);
setBackground(bg);


setPushables({
  [ player ]: [],
});

onInput("w", () => {
  getFirst(player).y -= 1;

  clearText()
  atComputer = false
});

onInput("a", () => {
  getFirst(player).x -= 1;

  clearText()
  atComputer = false
});

onInput("s", () => {
  getFirst(player).y += 1;

  clearText()
  atComputer = false
});

onInput("d", () => {
  getFirst(player).x += 1;

  clearText()
  atComputer = false
});

let atComputer = false

let compQs = [
  [["open door", ""], ["open(door)", "command not found"], ["cat tux_0.txt", "Hey, loser!"]],
  [["open door", "Permission denied"], ["sudo open door", ""], ["cat tux_1.txt", "You're in a dungeon"]],
  [["open door", "no such file"], ["vim bridge", ""], ["cat tux_2.txt", "A most evil dungeon"]],
  [["cat tux_3_1.txt", "You are here"], ["cat tux_3_2.txt", "so you will learn"], ["cat tux_3_3.txt", "about linux."]],
  [["cd room6", ""], ["open door", "no such file"], ["cat tux_4.txt", "I am very scary"]],
  [["echo who are u", "who are u"], ["who are you", "command not found"], ["cat tux_5.txt", "I'm Tux"]],
  [["echo where are u", "where are u"], ["open door", "no such file"], ["rm tux", "permission denied"]],
  [["echo hi tux", "hi tux"], ["cat tux_7.txt", "hello human"], ["cd ..", ""]],
  [["echo bye tux", "bye tux"], ["echo thank you", "thank you"], ["cat tux_8.txt", "good luck human"]]
]

let correctResp = ["j", "k", "k", "", "j", "", "", "l", "l"]

var options = compQs[level]

onInput("i", () => {
  // interact with computer
  clearText()
  
  let thing = getTile(getFirst(player).x + 1, getFirst(player).y)[0]

  if (thing) {
    if (thing._type == "^") {
      atComputer = true
        playTune(openTerminal)
        addText("u@dgn/room" + (level + 1) + ">>>", { y: 11, color: color`2`})
        options = compQs[level]
        addText("J) " + options[0][0], { y: 13, color: color`2`})
        addText("K) " + options[1][0], { y: 14, color: color`2`})
        addText("L) " + options[2][0], { y: 15, color: color`2`})
    }
  }
  
});

async function checkCorrect(key) {

  if (level == 8) {
      addText("The End", { color: color`3` })
      return ""
  }
  
  if (key == correctResp[level]) {
    
    if (getFirst(door)) {
      let d = getFirst(door)
      clearTile(d.x, d.y)
      addSprite(d.x, d.y, "r")
      playTune(yay)
    } else if (getFirst(water)) {
      let w = getFirst(water)
      clearTile(w.x, w.y)
      addSprite(w.x, w.y, "-")
      playTune(yay)
    } else {
      level += 1
      setMap(levels[level])
    }
  }
}

onInput("j", () => {
  if (atComputer) {
    clearText()
    addText(options[0][1], { y: 13, color: color`2`})
    checkCorrect("j")
  }
  
});

onInput("k", () => {
  if (atComputer) {
    clearText()
    addText(options[1][1], { y: 13, color: color`2`})
    checkCorrect("k")
  }
  
});

onInput("l", () => {
  if (atComputer) {
    clearText()
    addText(options[2][1], { y: 13, color: color`2`})
    checkCorrect("l")
  }
  
});

afterInput(() => {

  let tilesWithPlayer = tilesWith(player)
  let tilesWithPlayerAndDoor = tilesWith(player, openDoor)
  
  if (tilesWithPlayer.length == tilesWithPlayerAndDoor.length) {
    level += 1
    setMap(levels[level]);
    atComputer = false
  }
  
});
