/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: WIZARD DEFENCE
@author:Hudson Rairigh
@tags: [1 player ,fighting, adventure, tense, frustrating]
@addedOn: 2024-9-
*/
//ATENTION!!!!! ESSENTAL YOU READ INSTRUCTIONS/CONTROLS BEFORE PLAYING
//STORY
// orcs have broken free and are ravenging the countryside, they have destroyed most of middle earth, 
//you Gandalf must save the shire by preventing the orcs from reaching Bag End, you most save the innicent
//hobbots from horrible deaths, if you do not know who Gandalf and Hobbits are you should watch the great film
//"Lord of The Rings" directed by Peter Jackson
// CONTROLS
// A and D to move left and right 
// W to jump, L to cast a energy ball J to cast a shielding spell
// INSTRUCTIONS 
//the top green number is your lives below it is how many 
//goblins exist on the map, level 1 wave is 50 goblins
//prevent the orcs from going near Bag End if they reach bag end the game 
//will end and you have failed kill all the
//orcs without dying to go on to the next level good luck the Hobbits
//are counting on your video game skills to save the day
//please do not hold down any of the keys 
//(sorry if there are some minor glitches)

const melody = tune`
352.94117647058823: G4^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: A4^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: B4^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: D5^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: B4^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: A4^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: G4^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: C4~352.94117647058823,
352.94117647058823: B4^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: D5^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: E5^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: G5^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: E5^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: D5^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: B4^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: C5^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: B4^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: A4^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: G4^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: A4^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: B4^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: D5^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: B4^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: A4^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: G4^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: B4^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: D5^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: E5^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: D5^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: B4^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: A4^352.94117647058823 + C4~352.94117647058823,
352.94117647058823: G4^352.94117647058823 + C4~352.94117647058823`

playTune(melody)

const playback = playTune(melody, Infinity)
let time = 10000
let num = 4 
const platform = "f"
const hit = "h"
const energyball = "e"
let playerspell = "S"
let playershield = "P"
const sky = "s"
const clouds = "c"
const ground = "g"
let player = "p"
let agoblin = "B"
let goblin = "C"
let wgoblin = "D"
let hgoblin = "A"
const shire = "x"
const boulder = "w"

setLegend(
  [ boulder, bitmap`
................
................
................
................
................
................
................
................
....111.........
....11111..11...
...11L1111L111..
..1L111L1111111.
..11111111L11L1.
..L111L11111111.
.111L1111L1L1L11
.111111111111111`],
  [ shire, bitmap`
77777DDD4DD77777
77774D4DDD4D7777
77777DDD4D477777
7777777CC7777777
7777777CC7777777
77777CCCC7777777
7777777CCC777777
7777777CC7777777
7777444444447777
77744CCCCCC44777
7744CC1111CC4477
744CC11CC11CC447
44CC11CCCC11CC44
4CC11CCCC6C11CC4
CC1711CCCC1171CC
C111111CC111111C`],
  [ platform, bitmap`
L0L0L0L0L0L0L0L0
0L0L0L0L0L0L0L0L
L0L0L0L0L0L0L0L0
................
................
................
................
................
................
................
................
................
................
................
................
................`],
  [ agoblin, bitmap`
........DDD.....
.......DDDDD....
......DD3DDD....
...1C..2DDFF....
...CCCFFFFFFF...
.L...FFFFFFFFF..
33LLLLL1CLLLLLL3
.L...FFCCCFFFF..
.....FFFCCFFFF..
.....FFFFFFFFF..
.....FFFFFFFFF..
.....FFFFFFFFF..
.....FFFFFFFFF..
......FF...FF...
.....FFF..FFF...
....CCF..CCF....`],
  [ goblin,bitmap`
........DDD.....
.......DDDDD....
......DD3DDD....
...1C..2DDFF....
3L.CCCFFFFFFF...
LL..CFFFFFFFFF..
..L..FFFCCFFFF..
...L.FFCCCFFFF..
....LFCCCFFFFF..
.....CCCFFFFFF..
.....1CFFFFFFF..
.....FFLFFFFFF..
.....FFFLFFFFF..
......FF.L.FF...
.....FFF..LFF...
....11F..113....`],
  [ wgoblin, bitmap`
................
................
................
................
................
................
................
..L.............
3LLLLLLLLLLLLLL3
..L.............
................
................
................
................
................
................`],
  [ hgoblin, bitmap`
................
................
...............3
..............L.
.............L..
............L...
...........L....
..........L.....
.........L......
........L.......
.......L........
......L.........
.....L..........
....L...........
..LL............
..3L............`],
  [ playershield, bitmap`
....L.5H5H......
...LLL..H5H.....
..LLLLL..H5H....
LLLLLLLLL.H5H...
..CCC5C....H5H..
..CCCCCC....H5H.
..LLLC22.....H5H
.LLLLLL22.....H5
.LLLCCLCC.....5H
.LLLCCLLCC...C5C
00001100110005H5
.LLLLLLL.....C5C
.FFFFFF0......H5
.LLLLLLLL....H5H
CLLLLLLLL...H5H.
CCL....LCC5H5H..` ],
  [ hit, bitmap`
................
................
..5.............
..H5............
...H5...........
....H5..........
H55H5H..........
.HH5H5..........
H55H5H..........
....H5..........
...H5...........
..H5............
..5.............
................
................
................` ],
  [ energyball, bitmap`
................
................
................
................
.......5555.....
.....55HHH55....
...55HHH..H5H...
....H5.....H55..
...55HHH..H5H...
.....55HHH55....
.......5555.....
................
................
................
................
................` ],
  [ playerspell, bitmap`
....L...........
...LLL..........
..LLLLL.........
LLLLLLLLL.......
..CCC5C.........
..CCCCCC........
..LLLC22........
.LLLLLL22.......
.LLLCCLCC.......
.LLLCCLLCC...C5C
00001100110005H5
.LLLLLLL.....C5C
.FFFFFF0........
.LLLLLLLL.......
CLLLLLLLL.......
CCL....LCC......` ],
  [ ground, bitmap`
D44D4D44D4D44D44
D44D4D44D4D44D4D
444D44D44444D44D
D4D444D4D444D444
D4D44D44D4D444D4
CCCCCCCCCCCCCCCC
LCCCLCCFCCCCLCFC
CCFCCCCCCLCCCCCC
CCCCCCCCCCCCCCCC
CCLCCCFCCCLCFCCC
CCCCCCCCCCCCCCCC
CCFCCCCLCCCCCCCC
CCCCCFCCCCCCCCLC
CCCCCCCCLCCFCCCC
CLCCCCCCCCCCCCCC
CCCCLCCCCCCCCCCC` ],
  [ clouds, bitmap`
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
7777777777777777` ],
  [ sky, bitmap`
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
7777777777777777` ],
  [ player, bitmap`
........L.......
.......LLL...5..
......LLLLL.5C5.
....LLLLLLLLCHC.
......CCC5C.5C5.
......CCCCCC.0..
......LLC22..0..
.....LLLLL22.0..
.....LLLLCC2.0..
.....LLLLCCCC1..
.....LLLLCCCC1..
.....LLLLLLL.0..
.....FFFFFF0.0..
....LLLLLLLL.0..
...LLLLLLLLLL0..
..CCLLLLLLLLCC..`],
)

setSolids([shire, wgoblin, hgoblin, playershield])
//addText(getFirst(player).HP.toString, {color:color`D`})
//
setBackground(sky) 
function onTile(x, y, typs){
  for (let spt of getTile(x, y)){
      if (spt.type in typs){
        return true
      }
}
  return true}
function initStats(){
  /*[health, Attack, Defense(between 1-0), Rg(Range - 1), Projectile 
  speed(ms between Projectile moving),
  Aspeed(ms between attacks), Speed(ms between moving), attackType, defenseType, weapon, 
  hit, dir(1 or -1), [DefEnemy, AttEnemy, NormEnemy,...]]*/
  let Player = [45, 5, 0.6, 5, 100, 100, 100, playerspell, playershield, energyball, hit, 1, [goblin]]
  let Goblin = [20, 2, 0.8, 4, 350, 1000, 5000, agoblin, agoblin, wgoblin, hgoblin, -1, [player, shire]]
  stats = [Player, Goblin]
  typList = [player, goblin]
}
function getStats(typ){
  return stats[typList.indexOf(typ)]
}
function init_prj(self, ani, enm, At, Sp, Rg, dir){
  self.enm = enm
  self.Ap = At
  self.Rg = Rg
  self.ani = ani
  self.i = 0
  self.dir = dir
  self.Id = "Xb12"
  self.move = true
  self.run = setInterval(()=>{
        /*if (getTile(self.x, self.y).length > 1){
          console.log(spt.enm)
          console.log(onTile())}*/
        for (let spt of getTile(self.x, self.y)){
          if (self.enm.includes(spt.type)){
            spt.HP = spt.HP - Math.round(self.Ap*spt.Dp)
            self.move = false
            self.bitmap = self.ani
            setTimeout(()=>{clearInterval(self.run)
                          self.remove()}, 100)}}
    
    if (self.i >= self.Rg){
      self.bitmap = self.ani
      self.move = false 
      setTimeout(()=>{
                      clearInterval(self.run)
                      self.remove()}, 100)
    }
    if (self.move){
    self.x += self.dir}
    self.i += 1
  },Sp)
}
function update_prj(typ, ani, enm, At, Sp, Rg, dir){
  for (let chr of getAll(typ)){
    if (!(chr.Id == "Xb12")){
      init_prj(chr, ani, enm, At, Sp, Rg, dir)
    }
  }
}
function update_sld(typ){
  for (let chr of getAll(typ)){
    if (!(chr.Id == "Xb12")){
      let st = getStats(typ)
      init_sld(st[0],st[1],st[2],st[3],st[4],st[5],st[6],st[7],st[8],st[9],st[10],st[11], st[12],chr)
      if (typ != player){
        chr.AI()
      }
    }
  }
}
function init_sld(HP, Ap, Dp, Rg, Ps, As, Sp, Aform, Dform, Atool, AniTool, dir, enm, self){
  self.HP = HP
  self.Ap = Ap
  self.Id = "Xb12"
  self.Dp = Dp
  self.Rg = Rg
  self.Sp = Sp
  self.As = As
  self.Ps = Ps
  self.Aform = Aform
  self.Dform = Dform
  self.tool = Atool
  self.ani = AniTool
  self.dir = dir
  self.enm = enm
  self.dfn = true
  self.att = true
  self.loops = []
  self.defense = ()=>{
    if (self.dfn)
    self.Dp -= 0.2
    self.dfn = false
    addSprite(self.x,self.y, self.Dform)
    addSprite(self.x,self.y,sky)
    setTimeout(()=>{
      self.dfn = true
      self.Dp += 0.2
      getFirst(self.Dform).remove()
      for (let spt of getTile(self.x,self.y)){
        if (spt.type == sky){
          spt.remove()
        }
      }
    },2000)
  }
  self.attack = ()=>{
    if (self.att){
    addSprite(self.x,self.y, self.Aform)
    addSprite(self.x,self.y,sky)
    addSprite(self.x+dir, self.y, self.tool)
    update_prj(self.tool, self.ani, self.enm, self.Ap, self.Ps, self.Rg, self.dir)
    self.att = false
    setTimeout(()=>{
		if (! running) { return; }
      if (getAll(self.Aform).length > 0){
      getFirst(self.Aform).remove()}
      self.att = true
      for (let spt of getTile(self.x,self.y)){
        if (spt.type == sky){
          spt.remove()}}}, 300)}
  }
  self.die = ()=>{
    for (let lp of self.loops){
      clearInterval(lp)
    }
    for (let spt of getTile(self.x,self.y)){
        if (spt.type == sky){
          spt.remove()}}
    self.remove()
  }
  self.move = ()=>{
    self.x = self.x + dir
    if (onTile(self.x, self.y, self.enm)){
      self.x -= 1
    }
  }
  self.AI = ()=>{
    self.loops.push(setInterval(()=>{self.attack()},self.As))
    self.loops.push(setInterval(()=>{self.move()},self.Sp))
    self.loops.push(setInterval(()=>{
      if (self.HP < 1){
        self.die()
      }if (self.x == 1){
        endGame()
      }
    },100))
  }
}
function wave(no, time){
  let i = 0
  let loop = setInterval(()=>{
    addSprite(Math.floor(Math.random()*4)+7,5, goblin)
                  update_sld(goblin)
                  i += 1
                  if (i >= no || !running){
                    running = false
                    if (i >= no){
                      winLevel()
                    }
                    clearInterval(loop)
                  }},time)
  
  
}
function update_stats(lev){
  if (lev == 2){
    stats[1][0] += 10
    stats[1][1] += 2
    stats[1][2] -= 0.05
    stats[1][5] -= 50
    stats[1][6] -= 800
  }
  else if(lev == 3){
    stats[1][0] -= 15
    stats[1][1] += 4
    stats[1][2] += 0.05
    stats[1][3] += 3
  }
  else if(lev == 4){
    stats[1][0] += 10
    stats[1][1] += 2
    stats[1][2] += 0.7
    stats[1][5] -= 1200
    stats[0][0] -= 15
  }
  else{
    stats[1][0] = 20
    stats[1][1] = 2
    stats[1][2] = 0.8
    stats[1][3] = 4
    stats[1][4] = 350
    stats[1][5] = 1000
    stats[1][6] = 5000
  }
}
function winLevel(){
  for(let chr of getAll(goblin)) {
	  chr.die();
  }
 if (getAll(player).length < 1){
    getFirst(player).die();}
  clearInterval(game)
  setMap(winMap)
  addText("Congrats")
  update_stats(level+1)
  level += 1
  setTimeout(startGame, 10000);
  waveNo += 10
  waveTime -= 50
}
let level = 0
const levels = [
 map`
............
............
............
............
..ffff......
xp..........
gggggggggggg`,
 map`
............
............
....w....ff.
....ff.w....
f......f....
..xp..w.....
gggggggggggg`,
 map`
............
............
........ffff
......fff...
............
....xp......
gggggggggggg`,
 map`
..............
..f.f...f.....
f.....f.......
..f.f....fffff
.f............
.....xp.......
gggggggggggggg`
];
let loseMap = map`
..........f.
....f...f...
f...........
..f...f...f.
....f...f...
xwAwAASAhBCB
gggggggggggg`
let winMap = map`
............
f...f.....f.
..f....f....
...f.....f..
A....f.....f
xAAPADBBCCBB
gggggggggggg`
let running = true;
let game = null
let waveNo = 10
let waveTime = 4000
function startGame() {
    running = true
	wave(waveNo, waveTime)
	setMap(levels[level])
    getFirst(shire).HP = 10
    getFirst(shire).Dp = 0.95
	initStats()
	update_sld(player)
    game = setInterval(()=>{
    if ((getAll(player).length > 0 && getFirst(player).HP < 1) || getFirst(shire).HP < 1){
                endGame()
      }
    })
}



setPushables({
  [ player ]: []
})

onInput("d", () => {
	if (!running) { return; }
  if ((getFirst(player).dfn) && getFirst(player).att){
  getFirst(player).x += 1}
})

onInput("w", () => {
	if (!running) { return; }
  if ((getFirst(player).dfn) && getFirst(player).att){
  getFirst(player).y -= 2}
})

onInput("a", () => {
	if (!running) { return; }
  if (getFirst(player).dfn && getFirst(player).att && !onTile(getFirst(player).x-1, getFirst(player).y, [goblin])){
  getFirst(player).x -= 1}
})

onInput("l", () => {
	if (!running) { return; }
  getFirst(player).attack()
})

onInput("j", () => {
	if (!running) { return; }
  getFirst(player).defense()
})

onInput("k", () => {
	if (!running) { return; }
  wave(num,time)
    time -= 500 
      num += 2})

afterInput(() => {
  //wave(1, 100)
})

startGame()
function gravity() {
	if (!running) { return; }
  let ply = getFirst(player)
  for (let i of getTile(ply.x, ply.y+1)){
  if (i.type == ground || i.type == platform){return}}
  getFirst(player).y += 1
}
setInterval(gravity, 100)
setInterval(()=>{
		if (!running) { return; }
	if(getAll(player).length > 0){
  clearText("")
  addText(getAll(goblin).length.toString(), {y:1})
  
  try {
    health = getFirst(player).HP;
    addText(health.toString(), {color:color`D`})
  } catch (error) {
    health = 0;
    addText(health.toString(), {color:color`D`})
  }
  
  }}, 100)

function endGame() {
	running = false;
  addText("You have failed!", {color:color`3`, x:3, y:4});
  addText("game will", {color:color`0`,x:1, y:5});
  addText("restart on its own", {color:color`0`, x:1, y:6});
  for(let chr of getAll(goblin)) {
	  chr.die();
  }
 if (getAll(player).length < 1){
    getFirst(player).die();}
  clearInterval(game)
  setMap(loseMap)
  setTimeout(startGame, 10000);
}
