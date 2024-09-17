/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: oneway
@author: SpeedyGo55
@tags: ["labyrinth", "topdown"]
@addedOn: 2024-08-23
*/

const step_sound = tune`
37.5: C4^37.5,
37.5: D4^37.5,
1125`

const exit_sound = tune`
230.76923076923077: G5^230.76923076923077,
230.76923076923077: A5^230.76923076923077,
6923.076923076923`

const relic_sound = tune`
37.5: A5^37.5,
37.5: B5^37.5,
1125`

const player = "p"
const wall = "w"
const exit = "e"
const relic = "r"
const trap = "t"
const line = "l"
const activated_exit = "a"

setLegend(
  [ player, bitmap`
9999999999999999
9999999999999999
9999999999999999
9994449999444999
9994449999444999
9994449999444999
9999999999999999
9999999999999999
9992999999999999
9929229999999999
9992292299999999
9999922922999999
9999999229229999
9999999992292999
9999999999929999
9999999999999999`],
  [ wall, bitmap`
LLLLLLLLLLLLLLLL
L0L0L0L0L0L0L0LL
LL0000000000000L
L0000000000000LL
LL0000000000000L
L0000000000000LL
LL0000000000000L
L0000000000000LL
LL0000000000000L
L0000000000000LL
LL0000000000000L
L0000000000000LL
LL0000000000000L
L0000000000000LL
LL0L0L0L0L0L0L0L
LLLLLLLLLLLLLLLL`],
  [ exit, bitmap`
...7777777777...
...7C33333337...
...73C3333337...
...73C3333337...
...733C333337...
...733C333337...
...7333C33337...
...7333C33337...
...73333C3337...
...73333C3337...
...733333C337...
...733333C337...
...7333333C37...
...7333333C37...
...73333333C7...
...7777777777...`],
  [ activated_exit, bitmap`
...7777777777...
...7D44444447...
...74D4444447...
...74D4444447...
...744D444447...
...744D444447...
...7444D44447...
...7444D44447...
...74444D4447...
...74444D4447...
...744444D447...
...744444D447...
...7444444D47...
...7444444D47...
...74444444D7...
...7777777777...`],
  [ relic, bitmap`
................
................
....33333333....
.....333333.....
.....333333.....
......3333......
.......33.......
.......33.......
.......66.......
.......33.......
.......33.......
.......33.......
....33333333....
................
................
................`],
  [ line, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`]
)

setSolids([wall,player,line])

let level = 0
const levels = [  
  map`
wwwwwww
wwwwwww
wwwwwww
wwerpww
wwwwwww
wwwwwww
wwwwwww`,
  map`
wwwwwwwwww
w.......pw
w...www..w
w.r....w.w
w...e..w.w
w.w....w.w
w.w...r..w
wrw......w
w....www.w
wwwwwwwwww`,
  map`
wwwwwwwwwww
w.....w...w
w.www.....w
w.wew.rww.w
w.w.w...w.w
w...p...w.w
w.......rww
w..www...ww
wwr...w...w
www......rw
wwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwww
w.....w...........w
w.w.w.w.wwwww.w.www
w.w.w.w.....w.w...w
w.w.w.w.wwwww.w.w.w
w...w.w.r.....w.w.w
wwwww.wwwww.w.w.w.w
w.....w...w.w.w.w.w
w.w.w.w.w.w.w.w.w.w
w.w.w.w.w.r.w.w.w.w
w.w.w.w.wwwww.w.w.w
w.w.w.w.....w.w.w.w
w.w.w.wwwww.w.w.w.w
w.w.w.......w...r.w
w.w.wwwwwwwwwwww.ww
w.w.............r.w
w.wwwwwwwwwwwww.www
w.....w...........w
w.w.w.w.wwwwwww.www
wpw.w.w....e..w...w
wwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwww
w...w...r...........w
w.w.w.wwwwwwww...w..w
w.w...w...........w.w
w.wwwwww.wwwww.ww.w.w
w.w.......r.w....rw.w
w.w.wwwww.w.wwwww.w.w
w.wr......w.......w.w
w.wwwwwwwww.w.wwwww.w
w...........w.......w
www.wwwwwwwwww.wwww.w
wp.....w........r...w
wwww.w.w.w.wwwwww.w.w
w........w........w.w
w.wwwwwwwwwwwww.w.w.w
w.w......w...w..w.w.w
w.w.wwwwwwww.w.ww.w.w
w.r.............w...e
wwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwww
w.......w...r...w..w
w.wwwww.w.wwwww.ww.w
w.w...w.w.......w..w
w.w.w.w.w.www.w.ww.w
w.w.w.w...r...w.ww.w
w.w.w.wwwwwwwww.ww.w
w.w.w...........w..w
w.w.wwwwwwwww.wwww.w
w...........w......w
w.wwwwwww.wwwwwwww.w
w.w.......w........w
w.w.w.w.www.w.w.ww.w
w.w.w.w.....w.w..w.w
w.w.wwwwwwwww.ww.w.w
w.w...w.......w..w.w
w.wwwwwwwwwww.wwww.w
wp...r..........e..w
wwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwww
w.......w...........w
w.w.wwwww.wwwwwwwww.w
w.w.......w.......w.w
w.w.w.w.w.w.w.w.w.w.w
w...w.w.w.w.w.w.w...w
www.w.w.w.w.w.w.w.www
w.r.....w.....r.....w
w.wwwwwww.wwwwww.ww.w
w.w...............w.w
w.w.ww.wwwww.wwww.w.w
w.w.w.r.......r...w.w
w.w.wwwwwww.wwwww.w.w
w.w.w.....w...r...w.w
w.wwwwwwwwwwwwwwwww.w
w.........w.........w
w.wwwwwwww.wwwwwwww.w
w.w...............w.w
w.wwwwwwww.wwwwwwww.w
w....r.....p......e.w
wwwwwwwwwwwwwwwwwwwww`,
  map`
wwwwwwwwwwwwwwwwwwwww
wr............w.....w
w.wwwww.wwwwwww.wwwww
w.......w.....w.w..rw
www.ww.w.w.w.ww.w.w.w
w...w....r.w........w
w.w.wwwwwwwww.wwwww.w
w.w.........w...w...w
w.w.wwwwwww.w.w.w.w.w
w.w.........w.w...w.w
w.wwwwwwwwwwww.w.ww.w
w.w.......r.w...w.w.w
w.w.wwwwwww.wwwww...w
w...w.....w.w.....w.w
wwwww.wwwww.w.w.wwwww
w...w.w.....w.w.....w
w.w.w.wrwwwww.w.w.w.w
w.w...w.......w.w.w.w
w.w.w.wwwwwww.w.w.w.w
w.w.w.........w.w.w.w
w.w.wwwwwwwwwww.w.w.w
w.w.............w...w
w.w.wwwwwwwwwwwwwww.w
wp.............r..e.w
wwwwwwwwwwwwwwwwwwwww`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

onInput("s", () => {
  const player_data = getFirst(player)
  if (getTile(player_data.x, player_data.y + 1).length == 0 || getTile(player_data.x, player_data.y + 1)[0].type != "w" && getTile(player_data.x, player_data.y + 1)[0].type != "w") {
  addSprite(player_data.x, player_data.y, line)
  }
  player_data.y += 1
})
onInput("w", () => {
  const player_data = getFirst(player)
  if (getTile(player_data.x, player_data.y - 1).length == 0 || getTile(player_data.x, player_data.y - 1 )[0].type != "w" && getTile(player_data.x, player_data.y - 1)[0].type != "l") {
  addSprite(player_data.x, player_data.y, line)
  }
  player_data.y -= 1
})
onInput("d", () => {
  const player_data = getFirst(player)
  if (getTile(player_data.x + 1, player_data.y).length == 0 || getTile(player_data.x + 1, player_data.y)[0].type != "w" && getTile(player_data.x + 1, player_data.y)[0].type != "l") {
  addSprite(player_data.x, player_data.y, line)
  }
  player_data.x += 1
})
onInput("a", () => {  
  const player_data = getFirst(player)
  if (getTile(player_data.x - 1, player_data.y).length == 0 || getTile(player_data.x - 1, player_data.y)[0].type != "w" && getTile(player_data.x - 1, player_data.y)[0].type != "l") {
  addSprite(player_data.x, player_data.y, line)
  }
  player_data.x -= 1
})
onInput("j", () => {
  setMap(levels[level])
})

afterInput(() => {
  playTune(step_sound)
  
  const targetNumber = tilesWith(relic).length;

  const players_on_exit = tilesWith(player, activated_exit).length;

  
  if (targetNumber == 0 && players_on_exit != 0) {
    playTune(exit_sound)
    level = level + 1
        const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    // otherwise, we have finished the last level, there is no level
    // after the last level
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 7, color: color`9` });
    }
  }
  if (tilesWith(relic,player).length != 0) {
    
    getTile(getFirst(player).x, getFirst(player).y)[1].remove()
    const targetNumber = tilesWith(relic).length;
    if (targetNumber == 0) {
    const exits = getAll(exit)
      if (exits.length != 0) {
        exits[0].remove()
        addSprite(exits[0].x,exits[0].y, activated_exit)
      }
    }
  }
  if (tilesWith(player, exit).length != 0) {
    setMap(levels[level])
  }
})

