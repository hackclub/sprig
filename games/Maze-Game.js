
/* 
@title: maze_game_starter
@description: A simple template to help you get started with making a maze game.
@author: Cheru Berhanu
@tags: []
@addedOn: 2023-08-08
*/

    const player = "p";
    const wall = "w";
    const goal = "g";
    const key = "k";
    const lock = "l";
    const box = "b";
    const fire = "f";
    const rportal = "r";
    const bportal = "o";
    const fragile = "e";
    const hole = "h";




setLegend(
	[ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................` ],
    [ wall, bitmap`
.D.D.....D..D..D
.D...D.D......D.
.D4.D......D..DD
.D..4.D..D..DD..
.4..D.D.........
.D44D......D.D..
...4...D..D..DDD
..D.4....D444...
.DD.D.4444....D.
....D4.D....D..D
D....4.D........
.DD.D.4DDDDDDD.D
....D........D..
DD....DD....DD..
....D...D4D.D.D.
.DD......44..DD.` ],
    [ goal, bitmap`
................
................
................
.......DDDDD....
......D...D.D...
.....D.......D..
....D........D..
....D........D..
....D........D..
....D........D..
....D........D..
.....D......D...
.....D.....D....
......D.DDD.....
.......D........
................` ],
  [ key, bitmap`
................
................
................
................
....66..........
...6666.........
...6..66........
...6...6666666..
...6..6...66....
...6666...6.....
................
................
................
................
................
................` ],  
    [lock, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666622222666666
6666626662666666
6666226662666666
6662266662226666
6622666666622666
6626666266662666
6626662226662666
6626662226662666
6622666666622666
6662222222226666
6666666666666666
6666666666666666
6666666666666666`],
  [ box, bitmap`
0000000000000000
00LLLLLLLLLLLL00
000LLLLLLLLLL000
0L00LLLLLLLL00L0
0LL00LLLLLL00LL0
0LLL00LLLL00LLL0
0LLLL00LL00LLLL0
0LLLLL0000LLLLL0
0LLLLLL00LLLLLL0
0LLLLL0000LLLLL0
0LLLL00LL00LLLL0
0LLL00LLLL00LLL0
0LL00LLLLLL00LL0
0L00LLLLLLLL00L0
000LLLLLLLLLL000
0000000000000000` ],
    [ fire, bitmap`
................
................
................
................
................
.....3333.......
......3993......
......3993......
......3993......
......3993......
.....339933.....
....339C9993....
...399CCC9933...
..399CCCC99933..
..39CCCCCCC993..
..3999CCCCC9933.` ],
  [ rportal, bitmap`
................
................
................
....00000000....
....03333330....
...0333333330...
...0333333330...
...0333333330...
...0333333330...
...0333333330...
...0333333330...
...0333333330...
...0033333300...
....00000000....
................
................` ],
  [ bportal, bitmap`
................
................
................
....00000000....
....05555550....
...0555555550...
...0555555550...
...0555555550...
...0555555550...
...0555555550...
...0555555550...
...0555555550...
...0055555500...
....00000000....
................
................` ],
  [ fragile, bitmap`
....1...........
...11........1..
...1.11.111.11..
...1...1........
.1.1..11..11.1..
.1.1..1.1.1.11..
.1.1..1.1.1111..
1...1...1.11.1..
1...1.1.1.1..1..
1...1.1.1.1.11..
....1.1.1.1111..
....1...11......
.1.......1.1..1.
.11....11..1..1.
.......1111..11.
.....11.........` ],
  [ hole, bitmap`
................
................
................
....00000000....
....01111110....
...0111LL1110...
...011LLLL110...
...011LLLL110...
...011LLLL110...
...011LLLL110...
...0111LL1110...
...0111111110...
...0011111100...
....00000000....
................
................` ],


);

//levels

const levels = [map`
......
.w.w..
.w.ww.
pw.ww.
w...w.
.w...g`,
map`
p..www
ww.wgw
.w.w.w
.w.w.w
.w.w.w
.w...w`,
map`
p.wkw.w
w.w.ww.
w.w.w..
w.w..w.
w..w.w.
gl.....`,
map`
.wgw...
.w.w...
.w.w...
.w.w...
.w.w...
pb..w..`,
map`
pw.lb..
.w.w.w.
...w.w.
.f.w.w.
.w.w.w.
fk.fg..`,
map`
pwfw.w
.wow.w
.w.wgw
.w.wlw
kw.w.w
rw.b..`,
map`
pw....
.w....
ew....
.w....
ew....
gw....`,
map`
......
..w...
..w...
p.ww.g
ffffff
ffffff`,
]
setMap(levels[0])
let level = 0;



setMap(levels[level])






//setting pushable blocks
setPushables({
	[ player ]: [box],
    [ box ]: [box]
})


//setting solids

setSolids([ player, wall, lock, box])

//counting steps

const levellimits = [
  13,
  14,
  28,
  7,
]

let steps = 0

function Onsteps(){
  steps +=1
  clearText()

  addText("Steps Left: " + (levellimits[level] - steps), {
  y:4,
  color: color`5`
  })

  if (steps > levellimits[level]){
    clearText()
    setMap(levels[level])
    steps = 0
  }

}


//user input

onInput("d", () => {
	getFirst(player).x += 1
    Onsteps()
})

onInput("a", () => {
	getFirst(player).x -= 1
    Onsteps()
})

onInput("w", () => {
	getFirst(player).y -= 1
    Onsteps()
})

onInput("s", () => {
	getFirst(player).y += 1
    Onsteps()
})

onInput("j", () => {
      level = level + 1;
})

afterInput(() => {

})



//checking if user is on the goal

function checkForPlayer(x,y) { // this function accepts two paramaters: x & y
  let result = false
  getTile(x,y).map((tile) => { // .map runs the block of code between the brackets for every element in the array returned by getTile()
    if (tile.type == player)
      result = true
  })
  return result // this function returns true only if there is a player at (x,y)
}

let up = false

setInterval(() => {
    if (level == 7) { // run different code depending on the level
        if (up) { // run code depending on where the obstacle is
            if (!(checkForPlayer(2,3) || checkForPlayer(3,3))) { // only run code if there isn't a player in the way
                clearTile(2,0)
                clearTile(3,2)
                addSprite(2,3, wall)
                addSprite(3,3,wall)
                up = false // switch the variable to the opposite state
            }
        } else {
            if (!(checkForPlayer(2,0) || checkForPlayer(3,2))) {
                clearTile(2,3)
                clearTile(3,3)
                addSprite(2,0,wall)
                addSprite(3,2,wall)
                up = true
            }
        }
    } else if (level == 2) {
        // etc...
    }
}, 500)

let ishole = 0
let holex = 0
let holey = 0
afterInput(() => {
    const goalsCovered = tilesWith(player, goal); // tiles that both contain the player and goal
    const keygrabbed = tilesWith(player, key); // checks if there are any tiles with the key and the player ontop
    const onfire = tilesWith(player, fire) // checks if player is on fire
    const onrportal = tilesWith(player, rportal) // checks if players on red portal
    const onbportal = tilesWith(player, bportal) // checks if players on blue portal

    const onfragile = tilesWith(player, fragile)
    const onhole = tilesWith(player, hole)




    if (ishole == 1){
      addText("X Coordinate: "  , { y: 4, color: color`3` });
      clearTile(holex,holey)
      addSprite(holex, holey, hole)


    }

    ishole = 0

    // if at least one goal is overlapping with a player, proceed to the next level
    if (goalsCovered.length >= 1) {
        // increase the current level number
        level = level + 1;

        // check if current level number is valid
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
          clearText()  
          addText("you win!", { y: 4, color: color`7` });

        }
    }

    if (keygrabbed.length >= 1) {
      getFirst(lock).remove();
      getFirst(key).remove();
    }
    if (onfire.length >= 1) {
      setMap(levels[level])
    }


    if (onrportal.length >= 1) {
      const bp = getFirst(bportal)
      const pp = getFirst(player)

      pp.x = bp.x
      pp.y = bp.y
    }

    if (onbportal.length >=1) {
      const rp = getFirst(rportal)
      const pp = getFirst(player)

      pp.x = rp.x
      pp.y = rp.y
    }
    if (onfragile.length >= 1) {
      ishole += 1
      const pp = getFirst(player)


      holex = pp.x
      holey = pp.y


    }

    if (onhole.length >= 1) {
      setMap(levels[level])
    }



});