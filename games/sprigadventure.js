/*
@title: sprig adventure
@author: stormypluto3865
@tags: []
@addedOn: 2022-12-23
 
hi!
 
***CONTROLS***
wasd - move
i - pause
d - confirm (in pause menu)
 
*/
 
const lose = tune`
60: g5~60 + e5/60,
60: a4~60 + f4/60,
60: g5~60 + e5/60,
60: a4~60 + f4/60,
1680`
const walk = tune`
60: c5~60,
1860`
const healthlower = tune`
60: a5-60,
1860`
const firedamage = tune`
30: a5/30 + c5/30,
30: b5/30,
30: a5/30 + c5/30,
30: g5/30,
30: a5/30 + c5/30,
30,
30: c5/30,
30,
30: c5/30,
30,
30: c5/30,
30,
30: c5/30,
30,
30: c5/30,
30,
30: c5/30,
30,
30: c5/30,
30,
30: c5/30,
30,
30: c5/30,
30,
30: c5/30,
30,
30: c5/30,
30,
30: c5/30,
30,
30: c5/30,
30`
const kaboom = tune`
30: e4/30,
30: f4/30,
30: e4/30,
30: f4/30,
30: e4/30,
30: f4/30,
780`
const prebeep = tune`
60: b5^60,
1860`
const stunsound = tune`
125: a5/125,
125: g5/125,
125: a5/125,
125: g5/125,
125: a5/125,
125: g5/125,
3250`
const thrown = tune`
60: a5-60,
60: g5-60,
60: f5-60,
60: e5-60,
60: d5-60,
60: c5-60,
60: b4-60,
60: a4-60,
60: g4-60,
1380`
const powerup = tune`
125: c5-125,
125: e5-125,
125: c5-125,
125: f5-125,
125: c5-125,
125: g5-125,
3250`
 
const qlose = tune`
60: g5~60 + e5~60,
60: a4~60 + f4~60,
60: g5~60 + e5~60,
60: a4~60 + f4~60,
1680`
const qwalk = tune`
60: c5~60,
1860`
const qhealthlower = tune`
60: a5^60,
1860`
const qfiredamage = tune`
30: a5^30 + c5^30,
30: b5^30,
30: a5^30 + c5^30,
30: g5^30,
30: a5^30 + c5^30,
30,
30: c5^30,
30,
30: c5^30,
30,
30: c5^30,
30,
30: c5^30,
30,
30: c5^30,
30,
30: c5^30,
30,
30: c5^30,
30,
30: c5^30,
30,
30: c5^30,
30,
30: c5^30,
30,
30: c5^30,
30,
30: c5^30,
30,
30: c5^30,
30`
const qkaboom = tune`
30: e4^30,
30: f4^30,
30: e4^30,
30: f4^30,
30: e4^30,
30: f4^30,
780`
const qprebeep = tune`
60: b5~60,
1860`
const qstunsound = tune`
125: a5~125,
125: g5~125,
125: a5~125,
125: g5~125,
125: a5~125,
125: g5~125,
3250`
const qthrown = tune`
60: a5^60,
60: g5^60,
60: f5^60,
60: e5^60,
60: d5^60,
60: c5^60,
60: b4^60,
60: a4^60,
60: g4^60,
1380`
const qpowerup = tune`
125: c5^125,
125: e5^125,
125: c5^125,
125: f5^125,
125: c5^125,
125: g5^125,
3250`
 
function sfx(inm){
  switch(inm){
    case "lose":
      if(settings.volume == 2){playTune(lose)}
      else if(settings.volume == 1){playTune(qlose)} break;
    case "walk":
      if(settings.volume == 2){playTune(walk)}
      else if(settings.volume == 1){playTune(qwalk)} break;
    case "healthlower":
      if(settings.volume == 2){playTune(healthlower)}
      else if(settings.volume == 1){playTune(qhealthlower)} break;
    case "firedamage":
      if(settings.volume == 2){playTune(firedamage)}
      else if(settings.volume == 1){playTune(qfiredamage)} break;
    case "kaboom":
      if(settings.volume == 2){playTune(kaboom)}
      else if(settings.volume == 1){playTune(qkaboom)} break;
    case "prebeep":
      if(settings.volume == 2){playTune(prebeep)}
      else if(settings.volume == 1){playTune(qprebeep)} break;
    case "stunsound":
      if(settings.volume == 2){playTune(stunsound)}
      else if(settings.volume == 1){playTune(qstunsound)} break;
    case "thrown":
      if(settings.volume == 2){playTune(thrown)}
      else if(settings.volume == 1){playTune(qthrown)} break;
    case "powerup":
      if(settings.volume == 2){playTune(powerup)}
      else if(settings.volume == 1){playTune(qpowerup)} break;
  }
}
 
let throwmx = 0
 
let health = 6
let maxhealth = 99
let fire = 0
let lastdmg = 0
let tcolr = color`3`
let time = 0
let stun = 0
let marker = false
 
let cursorpos = 1
 
let pause = false
let levelused = false
let temp = ""
 
const player = "p";
const key = "k";
const goal = "g";
const wall = "w";
const flowers = "v";
const flowers2 = "V";
const spookywall = "W";
const lava = "l"
const floor = "f"
const smallmoss = ","
const bush = "/"
const darkfloor = "?"
const hotfloor = "F"
const mine = "m"
const water = "~"
const sand = "*"
const smoothsand = "&"
const cacti = "X"
const smallcacti = "x"
const coastright = "6"
const coastleft = "7"
const coasttop = "8"
const coastbelow = "9"
const hud = "_"
const fireball = ">"
const heart = "3"
const thrower = "t"
 
const music = {
  menu: tune`
250: c5~250 + a4-250,
250: f5~250 + a5~250,
250: c5~250,
250: f5~250 + a5~250,
250: c5~250 + a4-250,
250: f5~250 + a5~250,
250: c5~250,
250: f5~250 + a5~250,
250: c5~250 + a4-250,
250: f5~250 + d5~250,
250: a5~250 + f5~250,
250: b5~250 + g5~250,
250: a5~250 + a4-250 + f5~250,
250: f5~250 + d5~250,
250: c5~250 + a4~250,
250,
250: a4-250 + d5~250 + f5~250,
250,
250: d5~250 + f5~250,
250,
250: a4-250 + f5~250 + a5~250,
250: c5~250 + e5~250,
500,
250: a4-250 + e5~250 + g5~250,
250,
250: f5~250 + a5~250,
250: f5~250 + a5~250,
250: a4-250 + f5~250 + a5~250,
250: g5~250 + e5~250,
250: a5~250 + f5~250,
250: g5~250 + e5~250`,
  menu2: tune`
250: d5-250 + e5~250 + c5~250,
250: f5~250 + d5~250,
250: g5~250 + e5~250,
250,
250: d5-250 + b5~250 + g5~250,
250: a5~250 + f5~250,
250: f5~250 + d5~250,
250,
250: d5-250 + g5~250 + e5~250,
250: a5~250 + f5~250,
250: e5~250 + c5~250,
250,
250: d5-250 + f5~250 + a5~250,
250: e5~250 + c5~250,
250: c5~250 + a4~250,
250,
250: d5-250 + g4~250 + e4~250,
250: c5~250 + a4~250,
250: d5~250 + b4~250,
250,
250: d5-250 + g4~250 + b4~250,
250: d5~250 + b4~250,
250: e5~250 + c5~250,
250,
250: d5-250 + g4~250 + b4~250,
250: e5~250 + c5~250,
250: f5~250 + d5~250,
250: a5~250 + f5~250,
250: d5-250 + g5~250 + e5~250,
250: f5~250 + d5~250,
250: e5~250 + c5~250,
250: d5~250 + b4~250`,
  menu3: tune`
250: a4-250 + c5~250,
250,
250: b4~250,
250,
250: c5-250 + e5~250,
250,
250: d5~250,
250: g5~250,
250: a4-250 + c5~250,
250,
250: b4~250,
250,
250: c5-250 + e5~250,
250: a5~250,
250: d5~250,
250,
250: e5-250 + g5~250,
250,
250: f5~250,
250: a5~250,
250: c5-250 + e5~250,
250,
250: d5~250,
250: f5~250,
250: a4-250 + c5~250,
250,
250: b4~250,
250: d5~250,
250: f4-250 + a4~250,
250,
250: g4~250,
250`,
  game: tune`
125: c5~125 + e5~125,
125: d5~125 + f5~125,
125: e5~125 + g5~125,
125: f5~125 + d5~125,
125: e5~125 + c5~125,
125: d5~125 + b4~125,
125: e5~125 + c5~125,
125: d5~125 + b4~125,
125: e5~125 + c5~125,
125: g4~125 + c5~125,
125: a4~125 + d5~125,
125: b4~125 + e5~125,
125: c5~125 + f5~125,
125,
125: b4~125 + e5~125,
125: c5~125 + f5~125,
125: d5~125 + g5~125,
125: a5~125 + e5~125,
125: g5~125 + d5~125,
125,
125: c5~125 + e5~125,
125: d5~125 + f5~125,
125: c5~125 + f5~125,
125: d5~125 + g5~125,
125: b4~125 + f5~125,
125: c5~125 + g5~125,
125: c5~125 + e5~125,
125: d5~125 + f5~125,
125: e5~125 + c5~125,
125: d5~125 + b4~125,
125,
125: d5~125 + b4~125`,
  game2: tune`
125: c5~125 + e5~125 + e4~125,
125: e4~125 + g5~125,
125: e4~125 + f5~125,
125: e4~125,
125: e5~125 + c5~125 + e4~125,
125: g5~125,
125: g4~125 + f5~125,
125,
125: e5~125 + c5~125 + e4~125,
125: e4~125,
125: e4~125,
125: e4~125,
125: e5~125 + c5~125 + e4~125,
125,
125: g5~125 + f4~125,
125,
125: d5~125 + b4~125 + d4~125,
125: d4~125 + f5~125,
125: d4~125 + e5~125,
125: d4~125,
125: d5~125 + b4~125 + d4~125,
125: f5~125,
125: f4~125 + e5~125,
125,
125: d5~125 + b4~125 + d4~125,
125: d4~125,
125: f5~125 + d4~125,
125: d4~125,
125: d5~125 + b4~125 + d4~125,
125,
125: d5~125 + b4~125 + g4~125,
125`,
  spookygame2: tune`
125: e5~125 + d4~125 + a4~125 + f4-125,
125: a5~125 + b5/125,
125: f5~125 + a5/125,
125: g5/125,
125: e5~125 + d4~125 + a4~125 + f4-125,
125: a5~125,
125: g4~125 + f5~125 + b5/125,
125: g5/125,
125: e5~125 + d4~125 + a4~125 + a5/125 + f4-125,
125,
125: e5/125,
125,
125: e5~125 + d4~125 + a4~125 + f4-125,
125,
125: g5~125 + f4~125 + d5/125,
125: e5/125,
125: d5~125 + c4~125 + g4~125 + e4-125,
125: g5~125 + c5/125,
125: e5~125,
125,
125: d5~125 + c4~125 + g4~125 + e4-125,
125: g5~125,
125: f4~125 + e5~125 + c5/125,
125,
125: d5~125 + c4~125 + g4~125 + f5/125 + e4-125,
125,
125: f5~125 + e5/125,
125,
125: d5~125 + c4~125 + g4~125 + e4-125,
125,
125: d5~125 + g4~125,
125`,
  game3p1: tune`
125: f4/125 + f5~125 + a4-125,
125,
125: f5~125,
125,
125: f4/125 + f5~125 + a4-125,
125,
125: g5~125,
125,
125: f4/125 + a5~125 + a4-125,
125,
125: g5~125,
125,
125: f4/125 + f5~125 + a4-125,
125,
125: g5~125,
125,
125: f4/125 + g5~125 + a4-125,
375,
125: f4/125 + f5~125 + a4-125,
375,
125: f4/125 + f5~125 + a4-125,
125: g5~125,
125: a5~125,
125,
125: f4/125 + a4-125,
375`,
  game3p2: tune`
125: f4/125 + a4-125 + f5~125,
125: g5~125,
125: a5~125,
125: g5~125,
125: f4/125 + a4-125 + f5~125,
125: e5~125,
125: f5~125,
125: g5~125,
125: f4/125 + c5-125 + f5~125,
125: e5~125,
125: f5~125,
125: g5~125,
125: f4/125 + a4-125 + f5~125,
125: g5~125,
125: a5~125,
125: g5~125,
125: f4/125 + g4-125 + f5~125,
125: e5~125,
125: f5~125,
125: g5~125,
125: f4/125 + a4-125 + f5~125,
125: e5~125,
125: f5~125,
125: g5~125,
125: f4/125 + a4-125 + f5~125,
125: e5~125,
125: f5~125,
125: g5~125,
125: f4/125 + g4-125 + f5~125,
125: e5~125,
125: f5~125,
125: g5~125`,
  game4p1: tune`
125: a5/125,
125: a5/125,
125: a4/125,
125: a4/125,
125: a5/125,
125: a4/125,
125: a5/125,
125: a4/125,
125: a5/125 + a4/125 + c5/125,
125: g5/125 + g4/125 + b4/125,
125: a5/125 + a4/125 + c5/125,
125: b5/125 + b4/125 + d5/125,
125: a5/125 + a4/125 + c5/125,
125: e4/125,
125: g5/125,
125: g4/125,
125: g4/125,
125: g5/125,
125: g4/125,
125: g5/125,
125: g4/125,
125: g5/125 + g4/125 + b4/125,
125: f5/125 + f4/125 + a4/125,
125: a5/125 + a4/125 + c5/125,
125: f5/125 + a4/125 + f4/125,
125: g5/125 + b4/125 + g4/125,
125: d4/125,
125: g5/125 + e5/125,
125: f5/125 + d5/125,
125: d5/125 + b4/125,
125: e5/125 + c5/125,
125: g5/125 + e5/125`,
  game4p2: tune`
125: a5-125,
125: a5-125,
125: a5-125,
125: a5-125,
125: a4/125,
125: a4/125,
125: a4/125,
125: a4/125,
125: a5-125,
125,
125: a5-125,
125: a5-125,
125: a4/125,
125,
125: a4/125,
125: a4/125,
125: f5-125,
125: g5-125,
125: a5-125 + f4/125,
125: b5-125 + g4/125,
125: a4/125 + a5-125,
125: b4/125 + g5-125,
125: f5-125 + a4/125,
125: g5-125 + g4/125,
125: a5-125 + f4/125,
125: g4/125,
125: a4/125,
125: e5/125 + g4/125 + e4/125,
125: f4/125 + f5/125 + a4/125,
125: g4/125 + g5/125 + b4/125,
125: a4/125 + a5/125 + c5/125,
125: b5/125 + d5/125 + b4/125`,
  game4p3: tune`
125: b5/125 + g5/125 + e5-125 + f4^125 + a4^125,
125: a5/125 + f5/125 + d5-125,
125: b5/125 + g5/125 + e5-125 + f4^125,
125: g5/125 + e5/125 + c5-125,
125: a5/125 + f5/125 + d5-125 + f4^125,
125: g5/125 + e5/125 + c5-125,
125: a5/125 + f5/125 + d5-125 + f4^125,
125: f5/125 + d5/125 + b4-125,
125: d4-125 + b5~125 + f4^125 + a4^125,
125: d4-125 + a5~125,
125: d4-125 + g5~125 + f4^125,
125: d4-125 + f5~125,
125: c5/125 + a4/125 + f4^125,
125: d5/125 + b4/125,
125: e5/125 + c5/125 + f4^125,
125: d5/125 + b4/125,
125: f5/125 + d5/125 + a4^125 + f4^125,
125: e5/125 + c5/125,
125: f5/125 + d5/125 + f4^125,
125: g5/125 + e5/125,
125: f5/125 + c5/125 + f4^125,
125: e5/125 + b4/125,
125: d5/125 + g4/125 + a5~125 + f4^125,
125: a4/125 + e5/125 + b5~125,
125: b4/125 + g5/125 + a5~125 + a4^125 + f4^125,
125: c5/125 + f5/125,
125: d5/125 + g5/125 + f4^125,
125: a5/125,
125: g5/125 + e5/125 + f4^125,
125: f5/125 + d5/125,
125: e5/125 + c5/125 + f4^125,
125: d5/125 + b4/125`
}
const lowmusic = {
  menu: tune`
250: c5~250 + a4^250,
250: f5~250 + a5~250,
250: c5~250,
250: f5~250 + a5~250,
250: c5~250 + a4^250,
250: f5~250 + a5~250,
250: c5~250,
250: f5~250 + a5~250,
250: c5~250 + a4^250,
250: f5~250 + d5~250,
250: a5~250 + f5~250,
250: b5~250 + g5~250,
250: a5~250 + a4^250 + f5~250,
250: f5~250 + d5~250,
250: c5~250 + a4~250,
250,
250: a4^250 + d5~250 + f5~250,
250,
250: d5~250 + f5~250,
250,
250: a4^250 + f5~250 + a5~250,
250: c5~250 + e5~250,
500,
250: a4^250 + e5~250 + g5~250,
250,
250: f5~250 + a5~250,
250: f5~250 + a5~250,
250: a4^250 + f5~250 + a5~250,
250: g5~250 + e5~250,
250: a5~250 + f5~250,
250: g5~250 + e5~250`,
  menu2: tune`
250: d5^250 + e5~250 + c5~250,
250: f5~250 + d5~250,
250: g5~250 + e5~250,
250,
250: d5^250 + b5~250 + g5~250,
250: a5~250 + f5~250,
250: f5~250 + d5~250,
250,
250: d5^250 + g5~250 + e5~250,
250: a5~250 + f5~250,
250: e5~250 + c5~250,
250,
250: d5^250 + f5~250 + a5~250,
250: e5~250 + c5~250,
250: c5~250 + a4~250,
250,
250: d5^250 + g4~250 + e4~250,
250: c5~250 + a4~250,
250: d5~250 + b4~250,
250,
250: d5^250 + g4~250 + b4~250,
250: d5~250 + b4~250,
250: e5~250 + c5~250,
250,
250: d5^250 + g4~250 + b4~250,
250: e5~250 + c5~250,
250: f5~250 + d5~250,
250: a5~250 + f5~250,
250: d5^250 + g5~250 + e5~250,
250: f5~250 + d5~250,
250: e5~250 + c5~250,
250: d5~250 + b4~250`,
  menu3: tune`
250: a4~250 + c5~250,
250,
250: b4~250,
250,
250: c5~250 + e5~250,
250,
250: d5~250,
250: g5~250,
250: a4~250 + c5~250,
250,
250: b4~250,
250,
250: c5~250 + e5~250,
250: a5~250,
250: d5~250,
250,
250: e5~250 + g5~250,
250,
250: f5~250,
250: a5~250,
250: c5~250 + e5~250,
250,
250: d5~250,
250: f5~250,
250: a4~250 + c5~250,
250,
250: b4~250,
250: d5~250,
250: f4~250 + a4~250,
250,
250: g4~250,
250`,
  game: tune`
125: c5~125 + e5~125,
125: d5~125 + f5~125,
125: e5~125 + g5~125,
125: f5~125 + d5~125,
125: e5~125 + c5~125,
125: d5~125 + b4~125,
125: e5~125 + c5~125,
125: d5~125 + b4~125,
125: e5~125 + c5~125,
125: g4~125 + c5~125,
125: a4~125 + d5~125,
125: b4~125 + e5~125,
125: c5~125 + f5~125,
125,
125: b4~125 + e5~125,
125: c5~125 + f5~125,
125: d5~125 + g5~125,
125: a5~125 + e5~125,
125: g5~125 + d5~125,
125,
125: c5~125 + e5~125,
125: d5~125 + f5~125,
125: c5~125 + f5~125,
125: d5~125 + g5~125,
125: b4~125 + f5~125,
125: c5~125 + g5~125,
125: c5~125 + e5~125,
125: d5~125 + f5~125,
125: e5~125 + c5~125,
125: d5~125 + b4~125,
125,
125: d5~125 + b4~125`,
  game2: tune`
125: c5~125 + e5~125 + e4~125,
125: e4~125 + g5~125,
125: e4~125 + f5~125,
125: e4~125,
125: e5~125 + c5~125 + e4~125,
125: g5~125,
125: g4~125 + f5~125,
125,
125: e5~125 + c5~125 + e4~125,
125: e4~125,
125: e4~125,
125: e4~125,
125: e5~125 + c5~125 + e4~125,
125,
125: g5~125 + f4~125,
125,
125: d5~125 + b4~125 + d4~125,
125: d4~125 + f5~125,
125: d4~125 + e5~125,
125: d4~125,
125: d5~125 + b4~125 + d4~125,
125: f5~125,
125: f4~125 + e5~125,
125,
125: d5~125 + b4~125 + d4~125,
125: d4~125,
125: f5~125 + d4~125,
125: d4~125,
125: d5~125 + b4~125 + d4~125,
125,
125: d5~125 + b4~125 + g4~125,
125`,
  spookygame2: tune`
125: e5~125 + d4~125 + a4~125 + f4^125,
125: a5~125 + b5^125,
125: f5~125 + a5^125,
125: g5^125,
125: e5~125 + d4~125 + a4~125 + f4^125,
125: a5~125,
125: g4~125 + f5~125 + b5^125,
125: g5^125,
125: e5~125 + d4~125 + a4~125 + a5^125 + f4^125,
125,
125: e5^125,
125,
125: e5~125 + d4~125 + a4~125 + f4^125,
125,
125: g5~125 + f4~125 + d5^125,
125: e5^125,
125: d5~125 + c4~125 + g4~125 + e4^125,
125: g5~125 + c5^125,
125: e5~125,
125,
125: d5~125 + c4~125 + g4~125 + e4^125,
125: g5~125,
125: f4~125 + e5~125 + c5^125,
125,
125: d5~125 + c4~125 + g4~125 + e4^125 + f5^125,
125,
125: f5~125 + e5^125,
125,
125: d5~125 + c4~125 + g4~125 + e4^125,
125,
125: d5~125 + g4~125,
125`,
  game3p1: tune`
125: f4/125 + f5~125 + a4^125,
125,
125: f5~125,
125,
125: f4/125 + f5~125 + a4^125,
125,
125: g5~125,
125,
125: f4/125 + a5~125 + a4^125,
125,
125: g5~125,
125,
125: f4/125 + f5~125 + a4^125,
125,
125: g5~125,
125,
125: f4/125 + g5~125 + a4^125,
375,
125: f4/125 + f5~125 + a4^125,
375,
125: f4/125 + f5~125 + a4^125,
125: g5~125,
125: a5~125,
125,
125: f4/125 + a4^125,
375`,
  game3p2: tune`
125: f4/125 + a4^125 + f5~125,
125: g5~125,
125: a5~125,
125: g5~125,
125: f4/125 + a4^125 + f5~125,
125: e5~125,
125: f5~125,
125: g5~125,
125: f4/125 + c5^125 + f5~125,
125: e5~125,
125: f5~125,
125: g5~125,
125: f4/125 + a4^125 + f5~125,
125: g5~125,
125: a5~125,
125: g5~125,
125: f4/125 + g4^125 + f5~125,
125: e5~125,
125: f5~125,
125: g5~125,
125: f4/125 + a4^125 + f5~125,
125: e5~125,
125: f5~125,
125: g5~125,
125: f4/125 + a4^125 + f5~125,
125: e5~125,
125: f5~125,
125: g5~125,
125: f4/125 + g4^125 + f5~125,
125: e5~125,
125: f5~125,
125: g5~125`,
  game4p1: tune`
125: a5^125,
125: a5^125,
125: a4^125,
125: a4^125,
125: a5^125,
125: a4^125,
125: a5^125,
125: a4^125,
125: a5^125 + a4^125 + c5^125,
125: g5^125 + b4^125 + g4^125,
125: a5^125 + a4^125 + c5^125,
125: b5^125 + b4^125 + d5^125,
125: a5^125 + a4^125 + c5^125,
125: e4^125,
125: g5^125,
125: g4^125,
125: g4^125,
125: g5^125,
125: g4^125,
125: g5^125,
125: g4^125,
125: g5^125 + g4^125 + b4^125,
125: f5^125 + f4^125 + a4^125,
125: a5^125 + a4^125 + c5^125,
125: f5^125 + a4^125 + f4^125,
125: g5^125 + b4^125 + g4^125,
125: d4^125,
125: g5^125 + e5^125,
125: f5^125 + d5^125,
125: d5^125 + b4^125,
125: e5^125 + c5^125,
125: g5^125 + e5^125`,
  game4p2: tune`
125: a5~125,
125: a5~125,
125: a5~125,
125: a5~125,
125: a4^125,
125: a4^125,
125: a4^125,
125: a4^125,
125: a5~125,
125,
125: a5~125,
125: a5~125,
125: a4^125,
125,
125: a4^125,
125: a4^125,
125: f5~125,
125: g5~125,
125: a5~125 + f4^125,
125: b5~125 + g4^125,
125: a4^125 + a5~125,
125: b4^125 + g5~125,
125: f5~125 + a4^125,
125: g5~125 + g4^125,
125: a5~125 + f4^125,
125: g4^125,
125: a4^125,
125: e5^125 + g4^125 + e4^125,
125: f4^125 + f5^125 + a4^125,
125: g4^125 + g5^125 + b4^125,
125: a4^125 + a5^125 + c5^125,
125: b5^125 + d5^125 + b4^125`,
  game4p3: tune`
125: f4^125 + a4^125 + b5~125 + g5~125 + e5^125,
125: a5~125 + f5~125 + d5^125,
125: b5~125 + g5~125 + e5^125 + f4^125,
125: g5~125 + e5~125 + c5^125,
125: a5~125 + f5~125 + d5^125 + f4^125,
125: g5~125 + e5~125 + c5^125,
125: a5~125 + f5~125 + d5^125 + f4^125,
125: f5~125 + d5~125 + b4^125,
125: d4^125 + b5~125 + f4^125 + a4^125,
125: d4^125 + a5~125,
125: d4^125 + g5~125 + f4^125,
125: d4^125 + f5~125,
125: c5~125 + a4~125 + f4^125,
125: d5~125 + b4~125,
125: e5~125 + c5~125 + f4^125,
125: d5~125 + b4~125,
125: f5~125 + d5~125 + a4^125 + f4^125,
125: e5~125 + c5~125,
125: f5~125 + d5~125 + f4^125,
125: g5~125 + e5~125,
125: f5~125 + c5~125 + f4^125,
125: e5~125 + b4~125,
125: d5~125 + g4~125 + a5~125 + f4^125,
125: a4~125 + e5~125 + b5~125,
125: a5~125 + a4^125 + f4^125 + b4~125 + g5~125,
125: c5~125 + f5~125,
125: d5~125 + g5~125 + f4^125,
125: a5~125,
125: g5~125 + e5~125 + f4^125,
125: f5~125 + d5~125,
125: e5~125 + c5~125 + f4^125,
125: d5~125 + b4~125`
}
 
const playersprites = [
  bitmap`
................
................
................
.......4........
.....044400.....
....0DDDDD00....
....0D0D0DD0....
....0DDDDDD0....
....0DDDDDD0....
....00DDDD0.....
......00000.....
......0...0.....
....000...000...
................
................
................`,
  bitmap`
................
................
...9.3.6666.9...
..9....4......3.
...99946433333..
....0DDDDD00....
....0DHDHDD0....
....0DDDDDD0....
....0DDDDDD0....
....00DDDD0.....
......00000.....
......0...0.....
....000...000...
................
................
................`,
  bitmap`
................
................
....6666..9.33..
..3....4......3.
.....9999.6.33..
....0DDDDD00....
....0DHDHDD0....
....0DDDDDD0....
....0DDDDDD0....
....00DDDD0.....
......00000.....
......0...0.....
....000...000...
................
................
................`,
  bitmap`
................
...3............
..3.3...........
..3.3.......0...
.....0000...0...
..9.60DDD0000...
.....DDDDD0.....
....9DHDDD0.....
..649DDDDD0.....
..6.9DHDDD000...
..6.9DDDD0..0...
..6..00000..0...
................
...3............
................
................`,
  bitmap`
................
................
............3...
................
...0..00000..6..
...0..0DDDD9.6..
...000DDDHD9.6..
.....0DDDDD946..
.....0DDDHD9....
.....0DDDDD.....
...0000DDD06.9..
...0...0000.....
...0.......3.3..
...........3.3..
............3...
................`,
  bitmap`
................
................
................
.......4........
.....044400.....
....0DDDDD00....
....0D0D0DD0....
....077DD777....
...77777772777..
...77777277777..
...77777777777..
...77777777777..
...77777777777..
...7......777...
................
................`,
  bitmap`
................
................
.......4........
.....044400.....
....0DDDDD00....
.5..0D0D0DD0..5.
..5.0DDDDDD075..
....077DD7727...
...77777727777..
...77772777777..
...77777777777..
...77777777777..
...77777777777..
...7......775...
.............5..
................`,
  bitmap`
................
..6....9........
......939....6..
.....934399.....
....93444339....
...93DDDDD339...
.6.93D1D1DD39...
...93DDDDDD39...
...93DDDDDD39.6.
...933DDDD39....
....99333339....
.6..993999399...
...93339993339..
....999...999...
..............6.
................`,
  bitmap`
.......9........
..6...999...6...
.....99399......
....99343999....
...9934443399...
..993DDDDD3399..
.6993D1D1DD399..
..993DDDDDD399..
..993DDDDDD3996.
..9933DDDD399...
..99993333399...
..999939993999..
6.9933399933399.
...99999999999..
....999...999...
..............6.`
]
let playersprite = 0;
 
let settings = {
  volume: 2,
  animations: true,
  language: "en",
  darkmode: false //inert
}
 
 
 
let langdata = {
  "en":{paused:"paused", unpause:"unpause", 
        volmax:"VOLUME: MAX", volmid:"volume: medium", 
        volmute:"volume: muted", darkmodeoff:"new game",
        darkmodeon:"new game", animsoff:"anims: off",
        animson:"anims: on", langchange:"Espanhol"},
  "es":{paused:"en pausa", unpause:"reanudar", 
        volmax:"VOLUMEN: MAX.", volmid:"volumen: medio", 
        volmute:"volumen: nada", darkmodeoff:"juego nuevo",
        darkmodeon:"juego nuevo", animsoff:"animac.: no",
        animson:"animac.: si", langchange:"English"},
}
 
let playback = playTune(music.menu, Infinity);
 
function playmusic(inm){
   if (playback) playback.end();;
  switch(inm){
    case "menu":
      if(settings.volume == 2){
        if (playback) playback.end();
        playback = playTune(music.menu, Infinity)
      }else if(settings.volume == 1){
        if (playback) playback.end();
        playback = playTune(lowmusic.menu, Infinity)
      }else{
        if (playback) playback.end();
      }
      break;
    case "menu2":
      if(settings.volume == 2){
        if (playback) playback.end();
        playback = playTune(music.menu2, Infinity)
      }else if(settings.volume == 1){
        if (playback) playback.end();
        playback = playTune(lowmusic.menu2, Infinity)
      }else{
        if (playback) playback.end();
      }
      break;
    case "menu3":
      if(settings.volume == 2){
        if (playback) playback.end();
        playback = playTune(music.menu3, Infinity)
      }else if(settings.volume == 1){
        if (playback) playback.end();
        playback = playTune(lowmusic.menu3, Infinity)
      }else{
        if (playback) playback.end();
      }
      break;
    case "game":
      if(settings.volume == 2){
        if (playback) playback.end();
        playback = playTune(music.game, Infinity)
      }else if(settings.volume == 1){
        if (playback) playback.end();
        playback = playTune(lowmusic.game, Infinity)
      }else{
        if (playback) playback.end();
      }
      break;
    case "game2":
      if(settings.volume == 2){
        if (playback) playback.end();
        playback = playTune(music.game2, Infinity)
      }else if(settings.volume == 1){
        if (playback) playback.end();
        playback = playTune(lowmusic.game2, Infinity)
      }else{
        if (playback) playback.end();
      }
      break;
    case "spookygame2":
      if(settings.volume == 2){
        if (playback) playback.end();
        playback = playTune(music.spookygame2, Infinity)
      }else if(settings.volume == 1){
        if (playback) playback.end();
        playback = playTune(lowmusic.spookygame2, Infinity)
      }else{
        if (playback) playback.end();
      }
      break;
       case "game3p1":
      if(settings.volume == 2){
        if (playback) playback.end();
        playback = playTune(music.game3p1, Infinity)
      }else if(settings.volume == 1){
        if (playback) playback.end();
        playback = playTune(lowmusic.game3p1, Infinity)
      }else{
        if (playback) playback.end();
      }
      break;
      case "game3p2":
      if(settings.volume == 2){
        if (playback) playback.end();
        playback = playTune(music.game3p2, Infinity)
      }else if(settings.volume == 1){
        if (playback) playback.end();
        playback = playTune(lowmusic.game3p2, Infinity)
      }else{
        if (playback) playback.end();
      }
      break
      case "game4p1":
      if(settings.volume == 2){
        if (playback) playback.end();
        playback = playTune(music.game4p1, Infinity)
      }else if(settings.volume == 1){
        if (playback) playback.end();
        playback = playTune(lowmusic.game4p1, Infinity)
      }else{
        if (playback) playback.end();
      }
      break;
      case "game4p2":
      if(settings.volume == 2){
        if (playback) playback.end();
        playback = playTune(music.game4p2, Infinity)
      }else if(settings.volume == 1){
        if (playback) playback.end();
        playback = playTune(lowmusic.game4p2, Infinity)
      }else{
        if (playback) playback.end();
      }
      break;
      case "game4p3":
      if(settings.volume == 2){
        if (playback) playback.end();
        playback = playTune(music.game4p3, Infinity)
      }else if(settings.volume == 1){
        if (playback) playback.end();
        playback = playTune(lowmusic.game4p3, Infinity)
      }else{
        if (playback) playback.end();
      }
      break;
  }
    
}
 
playmusic("menu")
 
function textures(type){
  switch(type){
    case 1:
      setLegend(
    [ player, playersprites[playersprite]],
    [ fireball, bitmap`
................
................
................
................
................
......3333......
.....339933.....
.....396693.....
.....396693.....
.....339933.....
......3333......
................
................
................
................
................` ],
    [ key, bitmap`
................
................
................
................
................
................
....FFF.........
...F666F........
...F666FFFFF....
...F666F.F.F....
....FFF.........
................
................
................
................
................`],
    [ goal, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDD44444444DDDD
DDDD44444444DDDD
DDDD44444444DDDD
DDDD44444444DDDD
DDDD44444444DDDD
DDDD44444444DDDD
DDDD44444444DDDD
DDDD44444444DDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
    [ wall, bitmap`
0000100000000100
0000010000000010
00000000L0000001
1000000L00000000
0000000000000000
0000000000000000
00000L0010000000
0L0000000100L000
L000000000000000
000000100L00000L
0000010000L000L0
0000000000000000
000000L000000000
0L00000000000000
L000000000000000
000100000000000L`],
    [ flowers, bitmap`
0CCCCCCCCCCLCCCC
CCC3CCCDDCCCDDCC
CC363CCD3CCDCDCC
CCC3DCC363CDH0CC
CCCCDCCD3CDH6HCC
CDDDHDCDDCD4HCCC
CDDH6HD4DCD4DCLC
CDDDHDD4DCD4DCCD
CDDD4D44DD4DDCDD
CDDD4D4DDD4DC0DD
CCDD4D4DD44DDDDC
CCDDDD4D444D4DDC
CLDDDD4D404D4DCC
CCD444444DDDDDCC
CCD444DDDLCCCCCC
CCDDDDDCCCCCCCCC`],
    [ flowers2, bitmap`
0CCCCC888CCLCCCC
CCCCC88688CCCCCC
CCCCC86F68CCCCCC
CCCCL88688CCC0CC
CCCCCC888CCCCCCC
C1CCCC4D4CCCCCCC
CCCCCC4D4444CCLC
CCC0CC4D44D4CCCC
CCC4444D4D44CCCC
CCC44D4DD44CC0CC
CCCC44DD44CCCCCC
CCCCC44D4CCCC0CC
CLCC0C4D40CCCCCC
CCCCCCCCCCCCC1CC
CCCCCCCCCLCCCCCC
CCCCCCCCCCCCCCCC`],
    [ lava, bitmap`
9963999999999999
9996399999999999
9999999999999999
3999999999993999
9399999999999399
9999C99999999939
99999C9999999999
9999999999999999
9999999999699999
9999999996999999
9999999999999999
9993999999999999
9999399999999969
9999939999999996
6999999999999999
9639999999999999`],
    [ spookywall, bitmap`
00D010L004L00100
L00D010DD00L0010
0000D0D0LDD00001
10040D0L000D0000
003000000000DDD0
000300000004000D
DD000L0010000000
0LD0000L0100L00L
L00D90DD04003300
0000DD10DL0000DL
000401000DLDDDL0
D003000303D003DD
0D3000L030000030
0LD000030300000L
L0D0000L0000L000
0D040L00L00L000L`],
    [ floor, bitmap`
0CCCCCCCCCCLCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCLCCCCCCCC0CC
CCCCCCC0CCCCCCCC
C1CCCCCCCCCCCCCC
CCCCCCCCCCCCCCLC
CCC0CCCC1CCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCLCCCLCC0CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCC0CC
CLCC0CCCC0CCCCCC
CCCCCCCCCCCCC1CC
CCCCCCCCCLCCCCCC
CCCCCCCCCCCCCCCC`],
    [ smallmoss, bitmap`
0CCCCCCCCCCLCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCLCCCCCCCC0CC
CCCCCCC0CDCDCCCC
C1CCCCCCCCDCCCCC
CCCCCCCCCCCCCCLC
CCC0CCCC1CCCCCCC
CCCCCCCCCCCCCCCC
CCCDCDLCCCLCC0CC
CCCCDCCCCCCCCCCC
CCCCCCCCCCCDCDCC
CLCC0CCCC0CCDCCC
CCCCCCCCCCCCC1CC
CCCCCCCCCLCCCCCC
CCCCCCCCCCCCCCCC`],
    [ bush, bitmap`
0CCCCCCCCCCLCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCLCCCCCCCC0CC
CCCCCCC0CCCCDCCC
C1CCCCCCCCCD4DCC
CCCCCCDCDCCCCCLC
CCC0CD4D4DCDCCCC
CCCCD4D4D4D4DCCC
CCCD4D4D4D4D4DCC
CCCCD4D4D4D4DCCC
CCCCCCCCCCCCCCCC
CLCC0CCCC0CCCCCC
CCCCCCCCCCCCC1CC
CCCCCCCCCLCCCCCC
CCCCCCCCCCCCCCCC`],
    [ darkfloor, bitmap`
0CCCCCCCCCCLCCCC
CCCCCCCCCCCCCCCC
DCCCC0CCCCCCCCDD
CCCC000CCCCCCLCC
CCCDCCC0CDCC0CCC
C00CCCCCCCC0D0CC
CCCCCC0C0CCCCCLC
CCC0C0D0D0C0CCCC
CCCC0D0D0D0D0CCC
CCC0D0D0D0D0D0DC
CCCC0D0D0D0D0CCC
CCCCCCCCCCCCCCCC
C00C00CCC0CC00CC
CCCCCCCCCCC0000C
CCCDCCCCCLCCCDCC
CCCCCCCCCCCCCCCC`],
    [ hotfloor, bitmap`
LCCCCCCCCCCLCCCC
CCCCCCCC2CCCCCCC
CCCCCCCCCCCCCCCC
CCCC9CCCC6C3C1CC
CCCCCCCLCCCCCCCC
C6CCCCCCCCCCCCCC
CCCC3CCCCCC2CC9C
CCCLC9CCLCCCCCCC
CCCCCCCCCCCCCCC9
CC2C6C1C6CLCC3CC
CCCCCCCC9CCCCCCC
CCCCC9CCCCC6CLCC
C9CCLCCCC0CCCCCC
CCCCCCCCCCCCC0CC
CCCCCCC2C9CC9CCC
CCCCCCCCCCCCCCCC`],
    [ mine, bitmap`
0CCCCCC233CLCCCC
CCCCCCCC233CCCCC
CCCCCCCC233CCCCC
CCCC32CC233C10CC
CCCC3322333CCC1C
CC113333333CC4CC
C1C1111111DD0CLC
C3111310010DCCCC
C3212319941D4C4C
C311131001L4D0CC
C32123111110DCCC
CC3331111141D0CC
CD04011C101111CC
CC4CC1C1111111CC
C04DCCCCCLCCCCCC
CC40CCCCCCCCCCCC`],
    [ water, bitmap`
5777777777777757
7777777777777577
7577777777775777
5777777777757777
7777757777777775
7777577777777757
7777777777777777
7777777777777777
7777777577777757
7777777757777775
5777777777757777
7577777777775777
7757777777777777
7777777777777777
7777777777777777
7777777777777775`],
    [ sand, bitmap`
6666666666666666
6666666666666666
6666666666666666
F66666666666666F
6F666666F66666F6
6666666666666666
6666666666666666
66666FF666666666
6666F66F66666666
6666666666666666
666666666666FF66
66666666666F66F6
6666666666666666
666FF66666666666
66F66F6666666666
6666666666666666`],
    [ smoothsand, bitmap`
6666666666666666
6666666666666666
F6666666666FFFFF
6F66666666F66666
6666666666666666
6666666666666666
66666FFF66666666
6666F666F6666666
6666666666666666
6666666666FFFF66
F666666FFF6666FF
6666666666666666
6666666666666666
666666FFFF666666
666FFF6666FF6666
6666666666666666`],
    [ cacti, bitmap`
6666666666666666
6666666666666666
6666666666666666
F6666662D266666F
6F6666DDDDD666F6
666662D2D2D26666
666666DDDDD66666
666662D2D2D26666
6666F6DDDDD66666
666662D2D2D26666
666666DDDDD6FF66
666662D2D2D266F6
6666666666666666
666FF66666666666
66F66F6666666666
6666666666666666`],
    [ smallcacti, bitmap`
6666666666666666
6666666666666666
6666666666666666
F666D6666666D66F
6F66D666666DDDF6
66666666662D2D26
666666DD666DDD66
666662D2D62D2D26
6666FDDDD66DDD66
666662D2D6666666
66666DDDD666FF66
66666666666666F6
66666666666D6666
666FF666666D6666
66F66F6666666666
6666666666666666`],
    [ coasttop, bitmap`
7777777757777777
7777777777777777
7776667777766777
F66666666666666F
6F666666666666F6
6666666666666666
6666666666666666
6666666666666FF6
6666666666666666
6666666666666666
666666F666666666
666666666666F666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
    [ coastleft, bitmap`
7666666666666666
7666666666666666
766666FF66666666
77666666666F6666
7766666666666666
7766666666666666
7766666666666666
7766666666666666
7766666666666666
7766666666F66666
7766666666666666
7766666666666666
7766666666666666
7776666666666666
777666666666FF66
7766666666666666`],
    [ coastright, bitmap`
6666666666666777
66FF666666666777
6666666666666677
6666666666666677
6666666666666677
6666666666666677
66666F6666666677
6666666666666677
6666666666666677
6666666666666677
6666666666666677
6666666666666677
6666F66666666677
66666666FF666777
6666666666666777
6666666666666677`],
    [ coastbelow, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
666FF66666666666
6666666666666666
6666666666666666
6666666666F66666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
7777677777666777
7777775777777777
7777757777777777`],
    [ hud, bitmap`
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
................
................
................
0L0L0L0L0L0L0L0L`],
    [ heart, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11100011000111L
L11033300333011L
L10333333333301L
L10333333333301L
L10333333333301L
L11033333333011L
L11103333330111L
L11110333301111L
L11111033011111L
L11111100111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
    [ thrower, bitmap`
0CCCCCCCCCCLCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCDCCCCCCC
CCCCLCCDCCCCC0CC
CCCCDCC0DCCDCCCC
C1CCCDCDCCDCCCCC
CCCCCCD44DCCCCLC
CCD0DC4774DCDCCC
CCCDCD4774CDCDCC
CCCCCCD44DCCC0CC
CCCCCDCCDCDCCCCC
CCCCDCCDCCCDC0CC
CLCC0CCCD0CCCCCC
CCCCCCCDCCCCC1CC
CCCCCCCCCLCCCCCC
CCCCCCCCCCCCCCCC`]
    );
    break;
  case 2:
      setLegend(
  [ player, playersprites[playersprite]],
  [ fireball, bitmap`
................
................
................
................
.......33.......
......3993......
.....396693.....
....39666693....
....39666693....
.....396693.....
......3993......
.......33.......
................
................
................
................` ],
  [ key, bitmap`
................
................
................
................
................
................
....FFF.........
...F666F........
...F666FFFFF....
...F666F.F.F....
....FFF.........
................
................
................
................
................`],
  [ goal, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDD4444444444DDD
DDD4444444444DDD
DDD4444444444DDD
DDD4444444444DDD
DDD4444444444DDD
DDD4444444444DDD
DDD4444444444DDD
DDD4444444444DDD
DDD4444444444DDD
DDD4444444444DDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ wall, bitmap`
0000100000000100
0000010000000010
00000000L0000001
0000000L00000000
0000000000000000
0000000000000000
00000L0010000000
0L0000000100L000
L000000000000000
000000100L00000L
0000010000L000L0
0000000000000000
000000L000000000
0L00000000000000
L010000000000000
000100000000000L`],
  [ flowers, bitmap`
0CCCCCCCCCCLCCCC
CC3CCCCDDCCCCCCC
C363CCCD3CCCCCCC
CC3DDCC363CDDCCC
CCCCDCCD3CDDHCCC
CDDD4DCDDCDH6HCC
CDDDHDD4DCD4HCLC
CDDH6HD4DCD4DCCD
CDDDHD44DD4DDCDD
CDDD4D4DDD4DC0DD
CCDD4D4DD44DDDDC
CCDDDD4D444D4DDC
CLDDDD4D444D4DCC
CCD4444444DDDDCC
CCD444DDDDCCCCCC
CCDDDDDCCCCCCCCC`],
  [ flowers2, bitmap`
0CCCCC8HHCCLCCCC
CCCCC8H688CCCCCC
CCCCCH6F68CCCCCC
CCCCLH8688CCC0CC
CCCCCC888CC8CCCC
C1CCCC4D4CCCCCCC
CCC8CC4D4444CCLC
CCC0CC4D44D4CCCC
CCC4444D4D44CCCC
CCC44D4DD44CC0CC
CCCC44DD44CCCCCC
CCCCC44D4CCCC0CC
CLCC0C4D40CCCCCC
CCCCCCCCCCCCC1CC
CCCCCCCCCLCCCCCC
CCCCCCCCCCCCCCCC`],
  [ lava, bitmap`
9963999993999999
9996399999399999
9999999999939999
3999999999993999
9399999999999999
9999999999999999
999999C999999999
99999C9999999999
9999999996999999
9999999999699999
9939999999999999
9993999999999999
9999399999999969
9999999999999996
6999999999999999
9639999939999999`],
  [ spookywall, bitmap`
00D010L004L00100
L00D010DD00L0010
0000DDD0LDD00001
1004030L430DD000
0030000003000DD0
000300000000430D
DD000L0010000300
0LD0000L0100L00L
L00D90DD04003300
0000DD10DL0000DL
000401000DDDDDL0
D0330004330003DD
0D3300L333000030
0LD000023400000L
L0D0000L0000L000
0D040L00L00L000L`],
  [ floor, bitmap`
0CCCCCCCCCCLCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCLCCCCCCCCCCC
CCCCCCC0CCCCC0CC
C1CCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCC0CCCCCCCCCCLC
CCCCCCCC1CCCCCCC
CCCCCCLCCCLCC0CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCC0CC
CLCC0CCCC0CCCCCC
CCCCCCCCCCCCC1CC
CCCCCCCCCLCCCCCC
CCCCCCCCCCCCCCCC`],
  [ smallmoss, bitmap`
0CCCCCCCCCCLCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCLCCCCCCCC0CC
CCCCCCC0CDCCCCCC
C1CCCCCCCCDDCCCC
CCCCCCCCCCCCCCLC
CCC0CCCC1CCCCCCC
CCCCCCCCCCCCCCCC
CCCDCDLCCCLCC0CC
CCCCDCCCCCCCCCCC
CCCCCCCCCCCCCDCC
CLCC0CCCC0CDDCCC
CCCCCCCCCCCCC1CC
CCCCCCCCCLCCCCCC
CCCCCCCCCCCCCCCC`],
  [ bush, bitmap`
CCCCCCCCCCCLCCCC
0CCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCLCCCCCCCC0CC
CCCCCCC0CCCCDCCC
C1CCCCCCCCCD4DCC
CCCCCCDCDCCCCCLC
CCC0CD4D4DCDCCCC
CCCCD4D4D4D4DCCC
CCCD4D4D4D4D4DCC
CCCCD4D4D4D4DCCC
CCCCCCCCCCCCCCCC
CLCC0CCCC0CCCCCC
CCCCCCCCCCCCC1CC
CCCCCCCCCLCCCCCC
CCCCCCCCCCCCCCCC`],
  [ darkfloor, bitmap`
0CCCCCCCCCCLCCCC
CCCCCCCCCCCCCCCC
DCCCC0CCCCCCCCDD
CCCC000CCCCCCLCC
CCCDCCC0CDCC0CCC
CC00CCCCCCC0D0CC
CCCCCC0C0CCCCCLC
CCC0C0D0D0C0CCCC
CCCC0D0D0D0D0CCC
CCC0D0D0D0D0D0DC
CCCC0D0D0D0D0CCC
CCCCCCCCCCCC000C
C00C00CCC0C03030
CCCCCCCCCCC00000
CCCDCCCCCLCCCDCC
CCCCCCCCCCCCCCCC`],
  [ hotfloor, bitmap`
LCCCCCCCCCCCCCCC
CCCCCCCC2CCLCCCC
CCCCCC3CCCCCCCCC
CCCC9CCC6CC3C1CC
CCCCCLCCCCCCCCCC
C63CC2CC3CCCCC3C
CCCCCCCCCC92CC6C
CCCLC9CCLCCCCCCC
CCCCCCCCCCCCCCC9
CC2C6C3C6CLCC3CC
CCCCCCCC9CCCCCCC
CCCCCCCCCCC62LCC
C9C9LCCCC03CCCCC
CCCCC3CCCCCCC0CC
CCC6CCC2C9CC9CCC
CCCCCCCCCCCCCCCC`],
  [ mine, bitmap`
0CCCCCCCCCCLCCCC
CCCCCCCC23CCCCCC
CCCC32CC23CCCCCC
CCCC32CC233C10CC
CCCC3322333CCC1C
CC111333333CC4CC
C1C1111111DD0CLC
C3111310010DCCCC
C3212316641D4C4C
C321231001L4D0CC
C32123111110DCCC
CC3331111141D0CC
CD04011C101111CC
CC4CC1C1111111CC
C04DCCCCCLCCCCCC
CC40CCCCCCCCCCCC`],
  [ water, bitmap`
5775777777777757
7757777757777577
7777777577777777
7777777775777777
7777777777577777
7777777777757777
7777757777775777
7777775777777777
7777777775777777
7777777777577777
7777777777777777
7777777777777777
7757777777777777
7577777777777777
5777777777777777
7777577777777775`],
  [ sand, bitmap`
6666666666666666
6666666666666666
6666666666666666
F66666F66666666F
6F666666666666F6
6666666666666666
6666666666666666
66666FF666666666
6666F66F66666666
6666666666666666
666666666666FF66
66666666666F66F6
666666666F666666
666FF66666666666
66F66F6666666666
6666666666666666`],
  [ smoothsand, bitmap`
6666666666666666
6666666666666666
F6666666666FFFFF
6F66666666F66666
6666666666666666
6666666666666666
66666FFF66666666
6666F666F6666666
6666666666666666
6666666666FFFF66
F666666FFF6666FF
6666666666666666
6666666666666666
666666FFFF666666
666FFF6666FF6666
6666666666666666`],
  [ cacti, bitmap`
6666666666666666
6666666666666666
6666666666666666
F6666662D266666F
6F6666DDD4D666F6
666662D242D26666
666666D4DDD66666
66666242D2D26666
6666F6DDDDD66666
666662D2D2D26666
666666DDDDD6FF66
666662D2D2D266F6
6666666666666666
666FF66666666666
66F66F6666666666
6666666666666666`],
  [ smallcacti, bitmap`
6666666666666666
6666666666666666
6666666666666666
F666D6666666D66F
6F66D666666DD4F6
66666666662D2D26
666666DD6664DD66
666662D2D62D2D26
6666FD4DD66DDD66
666662D2D6666666
66666DDDD666FF66
66666666666666F6
66666666666D6666
666FF666666D6666
66F66F6666666666
6666666666666666`],
  [ coasttop, bitmap`
7777777777777777
7777777777777777
7777777777777777
F66777666677766F
6F666666666666F6
6666666666666666
6666666666666666
6666666666666FF6
6666666666666666
6666666666666666
666666F666666666
666666666666F666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [ coastleft, bitmap`
7766666666666666
7766666666666666
777666FF66666666
77766666666F6666
7776666666666666
7776666666666666
7776666666666666
7776666666666666
7776666666666666
7776666666F66666
7766666666666666
7766666666666666
7766666666666666
7666666666666666
766666666666FF66
7666666666666666`],
  [ coastright, bitmap`
6666666666666777
66FF666666666777
6666666666666777
6666666666666777
6666666666666777
6666666666666777
66666F6666666677
6666666666666677
6666666666666677
6666666666666677
6666666666666677
6666666666666677
6666F66666666677
66666666FF666777
6666666666666777
6666666666666777`],
  [ coastbelow, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
666FF66666666666
6666666666666666
6666666666666666
6666666666F66666
6666666666666666
6666666666666666
6666666666666666
6666777777766666
7777777777777777
7777775777757777
7777777577577777`],
  [ hud, bitmap`
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
................
................
................
L0L0L0L0L0L0L0L0`],
  [ heart, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11100011000111L
L11033300333011L
L10333333333301L
L10333333333301L
L10333333333301L
L11033333333011L
L11103333330111L
L11110333301111L
L11111033011111L
L11111100111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [ thrower, bitmap`
0CCCCCCCCCCLCCCC
CC4CCCCCCCCCC4CC
C4DCCCCDCCCCCD4C
CCCDLCCCDCCCDCCC
CCCCDCCDCCCDCCCC
C1CCCDCCDCDCCCCC
CCCCCCD44DCCCCLC
CCCDCD4554CDCDCC
CCDCDC4554DCDCCC
CCCCCCD44DCCC0CC
CCCCCDCDCCDCCCCC
CCCCDCCCDCCDC0CC
CLCD0CCDC0CCDCCC
C4DCCCCCDCCCCD4C
CC4CCCCCCLCCC4CC
CCCCCCCCCCCCCCCC`]
      );
      break;
    case 3:
          setLegend(
  [ player, playersprites[playersprite]],
  [ fireball, bitmap`
................
................
................
................
....3......3....
.......33.......
......3993......
.....396693.....
.....396693.....
......3993......
.......33.......
....3......3....
................
................
................
................` ],
  [ key, bitmap`
................
................
................
................
................
................
....FFF.........
...F666F........
...F666FFFFF....
...F666F.F.F....
....FFF.........
................
................
................
................
................`],
  [ goal, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDD444444DDDDD
DDDDD444444DDDDD
DDDDD444444DDDDD
DDDDD444444DDDDD
DDDDD444444DDDDD
DDDDD444444DDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [ wall, bitmap`
0000100000000100
0000010000000010
00000000L0000001
0000000L00000000
0000000000000000
0000000000000000
00000L0010000000
0L0000000100L000
L000000000000000
000000100L00000L
0000010000L000L0
0000000000000000
000000L000000000
0L00000000000000
L010000000000000
000100000000000L`],
  [ flowers, bitmap`
0CCCCCCCCCCLCCCC
CCCC4CCCCCCCC4CC
CCCC3CCCC3CCCCCC
CCC363CD363DDCCC
CCCC3CCDD3DDDCCC
CDDD4DCDDCDDHCCC
CDDDHDD4DCDH6HLC
CDDH6HD4DCD4HCCD
CDDDHD44DD4DDCDD
CDDD4D4DDD4DC0DD
CCDD4D4DD44DDDDC
CCDDDD4D444D4DDC
CLDDDD4D444D4DCC
CCD4444444DDDDCC
CCD444DDDDCCCC4C
CCDDDDDCCCCCCCCC`],
  [ flowers2, bitmap`
0CCCCC888CCLCCCC
CCCCC8868HCCCCCC
CCCCC86F6HCCCCCC
CCCCL886H8CCC0CC
CCCCCCHH8CCCCCCC
C1CCCC4D4CCHCCCC
CCCCCC4D4444CCLC
CCCHCC4D44D4CCCC
CCC4444D4D44CCCC
CCC44D4DD44CC0CC
CCCC44DD44CCCCCC
CCCCC44D4CCCC0CC
CLCC0C4D40CCCCCC
CCCCCCCCCCCCC1CC
CCCCCCCCCLCCCCCC
CCCCCCCCCCCCCCCC`],
  [ lava, bitmap`
9963999993999999
9996399999399999
9999999999999999
3999999999999999
9399999999999999
9999999C99999999
999999C999999999
99999C9999999999
9999999996999999
9999999999699999
9939999999999999
9993999999999999
9999399999999969
9999999999999996
6999999399999999
9639999939999999`],
  [ spookywall, bitmap`
00D010L004L00100
L00D010DD00L0010
0000DDD0LDD00001
1004030L430DD000
0030000003000DD0
000300000000430D
DD000L0010000300
0LD0090L0100L00L
L00D90DD04003300
0000DD10DL0000DL
000401000D00DDL0
D033000433DD03DD
0D3300L033000030
0LD000000400000L
L0D4000L0000L000
0D000L00L00L000L`],
  [ floor, bitmap`
0CCCCCCCCCCLCCCC
CCCCCCCCCCCCCCCC
CCCCLCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCC0CCCCC0CC
C1CCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCC0CCCCCCCCCCLC
CCCCCCLC1CLCCCCC
CCCCCCCCCCCCC0CC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCC0CC
CLCC0CCCC0CCCCCC
CCCCCCCCCCCCC1CC
CCCCCCCCCLCCCCCC
CCCCCCCCCCCCCCCC`],
  [ smallmoss, bitmap`
0CCCCCCCCCCLCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCLCCCCCCCC0CC
CCCCCCC0CDCDCCCC
C1CCCCCCCCDCCCCC
CCCCCCCCCCCCCCLC
CCC0CCCC1CCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCLCCCLCC0CC
CCCDDDCCCCCCCCCC
CCCCCCCCCCCDCDCC
CLCC0CCCC0CCDCCC
CCCCCCCCCCCCC1CC
CCCCCCCCCLCCCCCC
CCCCCCCCCCCCCCCC`],
  [ bush, bitmap`
CCCCCCCCCCCLCCCC
0CCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCLCCCCCCCC0CC
CCCCCCC0CCCCDCCC
C1CCCCCCCCCD4DCC
CCC0CCDCDCCCCCLC
CCCCCD4D4DCDCCCC
CCCCD4D4D4D4DCCC
CCCD4D4D4D4D4DCC
CCCCD4D4D4D4DCCC
CCCCCCCCCCCCCCCC
CLCC0CCCC0CCCCCC
CCCCCCCCCCCCC1CC
CCCCCCCCCLCCCCCC
CCCCCCCCCCCCCCCC`],
  [ darkfloor, bitmap`
0CCCCCCCCCCLCCCC
CCCCCCCCCCCCCCCC
DCCCC0CCCCCCCCDD
CCCC000CCCCCCLCC
CCCDCCC0CDCC0CCC
CC00CCCCCCC0D0CC
CCCCCC0C0CCCCCLC
CCC0C0D0D0C0CCCC
CCCC0D0D0D0D0CCC
CCC0D0D0D0D0D0DC
CCCC0D0D0D0D0CCC
CCCCCCCCCCCC000C
C00C00CCC0C00000
CCCCCCCCCCC00000
CCCDCCCCCLCCCDCC
CCCCCCCCCCCCCCCC`],
  [ hotfloor, bitmap`
LCCCCCCCCCCCCCCC
CC2CCCCC2CCLCCCC
CCCCCCCCCCCC2CCC
CCCCC9CCCCCCC2CC
CCCCCCCCCCCCCCCC
C62CC3CC3CCCCC3C
CCCC0CCCCC9CC9CC
CCCCC9C3C3CCCCCC
CC2CCCCCCCCCCCC9
CC2C2C3C6C322CCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCC62C3C
C9CCCCC9C03CCCCC
CCCCC3C3CCCCC0CC
CCC6CCCCC9CC9C6C
CCCCCCCCCLCCCCCC`],
  [ mine, bitmap`
0CCCCCCCCCCLCCCC
CCCCCCCCCCCCCCCC
CCCC32CC23CCCCCC
CCCC32CC23CC10CC
CCCC332233CCCC1C
CC111333333CC4CC
C1C1111111DD0CLC
C3111310010DCCCC
C3212313341D4C4C
C311131001L4D0CC
C32123111110DCCC
CC3331111141D0CC
CD04011C101111CC
CC4CC1C1111111CC
C04DCCCCCLCCCCCC
CC40CCCCCCCCCCCC`],
  [ water, bitmap`
5777777777777775
7777777777777757
7577777577577577
5777775775757777
7777777775775777
7777777777577777
7777757777777777
7777577777777777
7777777775777777
7777777757777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
5577777777777777
7577577777777775`],
  [ sand, bitmap`
6666666666666666
F666666666666666
6666666666666666
F66666666666666F
6F666666666666F6
6666666666666666
6666666666666666
66666FF666666666
6666F66F66666666
6666666666666666
666666666666FF66
66666666666F66F6
6666666666666666
666FF66666666666
66F66F6666666666
6666666666666666`],
  [ smoothsand, bitmap`
6666666666666666
6666666666666666
F6666666666FFFFF
6F66666666F66666
6666666666666666
6666666666666666
66666FFF66666666
6666F666F6666666
6666666666666666
6666666666FFFF66
F666666FFF6666FF
6666666666666666
6666666666666666
666666FFFF666666
666FFF6666FF6666
6666666666666666`],
  [ cacti, bitmap`
6666666666666666
6666666666666666
6666666666666666
F6666662D266666F
6F6666DDDDD666F6
666662D2D2D26666
666666DDDDD66666
666662D2D2426666
6666F6DDD4D66666
666662D242D26666
666666D4DDD6FF66
66666242D2D266F6
6666666666666666
666FF66666666666
66F66F6666666666
6666666666666666`],
  [ smallcacti, bitmap`
6666666666666666
6666666666666666
6666666666666666
F666D6666666D66F
6F664666666DDDF6
66666666662D2D26
666666DD666DD466
666662D2D62D2D26
6666FDDD4664DD66
666662D2D6666666
66666D4DD666FF66
66666666666666F6
66666666666D6666
666FF66666646666
66F66F6666666666
6666666666666666`],
  [ coasttop, bitmap`
7777777777777777
7777777777777777
7777777777777777
7766666777666667
6F666666666666F6
6666666666666666
6666666666666666
6666666666666FF6
6666666666666666
6666666666666666
666666F666666666
666666666666F666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [ coastleft, bitmap`
7776666666666666
7776666666666666
776666FF66666666
77666666666F6666
7766666666666666
7766666666666666
7766666666666666
7766666666666666
7766666666666666
7766666666F66666
7766666666666666
7766666666666666
7666666666666666
7666666666666666
776666666666FF66
7776666666666666`],
  [ coastright, bitmap`
6666666666666777
66FF666666666777
6666666666666677
6666666666666677
6666666666666677
6666666666666677
66666F6666666677
6666666666666677
6666666666666677
6666666666666777
6666666666666777
6666666666666777
6666F66666666777
66666666FF666777
6666666666666777
6666666666666777`],
  [ coastbelow, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
666FF66666666666
6666666666666666
6666666666666666
6666666666F66666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666777776666
7777777777777777
7777777777777777`],
  [ hud, bitmap`
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
................
................
................
L0L0L0L0L0L0L0L0`],
  [ heart, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L11111111111111L
L11100011000111L
L11033300333011L
L10333333333301L
L10333333333301L
L10333333333301L
L11033333333011L
L11103333330111L
L11110333301111L
L11111033011111L
L11111100111111L
L11111111111111L
L11111111111111L
LLLLLLLLLLLLLLLL`],
  [ thrower, bitmap`
CCCCCCC44CCCCCCC
0CCCCCCDCCLCCCCC
CCCCCCCCDCCCCCCC
CCCCCCCDCCCCCCCC
CCCCDCC0DCCDCCCC
CC1CCDCDCCDCCCCC
CCCCCCD44DCCCCLC
4CD0DC4HH4DCDCD4
4DCDCD4HH4CDCDC4
CCCCCCD44DCCC0CC
CCCCCDCCDCDCCCCC
CCCCDCCDCCCDC0CC
CCCC0CCCD0CCCCCC
CCCCCCCDCCCCCCCC
CCCCCCCCDLCCCCCC
CCCCCCC44CCCCCCC`]
      );
      break;
  case 11:
      setLegend(
    [ player, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ fireball, bitmap`
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
................
................
................
................` ],
    [ key, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ goal, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ wall, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ flowers, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ flowers2, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ lava, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ spookywall, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ floor, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ smallmoss, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ bush, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ darkfloor, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ hotfloor, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ mine, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ water, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ sand, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ smoothsand, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ cacti, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ smallcacti, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ coasttop, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ coastleft, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ coastright, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ coastbelow, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ hud, bitmap`
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
................
................
................
0L0L0L0L0L0L0L0L`],
    [ heart, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`],
    [ thrower, bitmap`
0000000000000000
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL
0LLLLLLLLLLLLLLL`]
    );
    break;
  }
}
 
textures(1);
setInterval(function(){
  if(pause){
    textures(11)
  }else if(settings.animations){
    textures(Math.round((time/2))%3 + 1)
  }else{
    textures(1)
  }
},50)
 
 
 
let level = 0;
 
const toptemplates = [
  map`
vfffWWWg&6~~
ffwf,?/**&88
,,Vff,mf****`,
  map`
ffmfFlllllFg
ffffFFFFFFFf
ffffffffffff`,
  map`
WWW&&**6~~7g
**W&mf*6~~99
*****f&6~~~~`,
  map`
lFfff,ffff,g
FFf,ffmfWWWW
fWfWWff??WWW`
]
const midtemplates = [
  map`
ffFFFFFfffff
VfFlllFfmfvf
ffWWWWWfwwfw`,
  map`
mmfmff,mfmmf
Vf,ffmfwffvf
wfWwfwWwwwfw`,
  map`
mffWWWvf*999
Vf/??Wff6~~~
fffff,fV*888`,
  map`
*xf***f**f*&
*ff**Xfffff&
&fX&fffx&&f&`
]
const lowtemplates = [
  map`
wWWWWffwfffw
wp??fffffFFF
wffffv//wFll`,
  map`
wfff***99999
wpWW**6~~~~~
wm?***6~~~~~`,
  map`
wwww*****w*w
*p*X*www***w
*x****X*x*ww`,
  map`
v,V,,/,/v/,V
,p,,v,,m/VWW
V,,v,vV,W/??`
]
const toptemplates1 = [
  map`
ffWWf&&g&6~~
ft?fft&&*6~~
tff/tf&**6~~`,
  map`
f,,,V,**6~7g
fmf/,m**6~99
ffVf,v*x6~~~`,
  map`
WWW&&fV6~~7g
ffW&mff6~~99
fVf**f&6~~~~`,
  map`
g&x&&x&&&X&&
x&&x&&&x&&&~
Xx&&&x&&&~~~`
]
const midtemplates1 = [
  map`
WWvWWWVm,m~~
v/VfVV/Wm6~m
W,vWvWW,w6m~`,
  map`
mmfWfm,mm6~~
Xx?WXXfXxXxX
wf**f*****m~`,
  map`
mX&9999mm~~7
Vf6~mW~~~tmm
tf&8t88~t~~~`,
  map`
tff&tff&&6~~
&tt&Xttm&6~m
&x&&&fxf&6~~`
]
const lowtemplates1 = [
  map`
&&*&&*&&6~~~
***3*9999~~~
*&**6~~~~~~~`,
  map`
wfff****6~~~
wfWW*36~~~~~
wm?***6~~~~~`,
  map`
**X****99~~~
/&*3*99~~~~~
ff**9~~~~~~~`,
  map`
***&9999~~88
*&*6~~~~~83&
****8~~~~7&x`
]
const toptemplates2 = [
  map`
wfffffgffFll
Wf?WwfffffFl
wfffffFffffF`,
  map`
llllFffffffg
lFFFffffffff
FfffffFfffff`,
  map`
llFffffW?ffg
lFfffWfffWff
FffWffFfffff`,
  map`
gfff/vWmFlll
WwWWf?fffFFF
wffffWFwffff`
]
const midtemplates2 = [
  map`
mfFFFlFFFFfm
ffFllllllFfv
?mFFFFFFFFm?`,
  map`
fffWfFlFmfff
ff?***F****&
w&**f&&&fff&`,
  map`
mfmfFFlFFtft
VftFlllllFft
fmmfFFFFFWff`,
  map`
Vftf/FlFffft
tVt?t/Fftvtv
f?WWWfffW??f`
]
const lowtemplates2 = [
  map`
ffffffffffff
ffffFFFFf3ff
fffFllllFfff`,
  map`
ffWffWfFFw*&
WffWffFllw3&
ffffffFllwww`,
  map`
ffffwffwWWW*
fffwVvvVw***
fffffVVw3*WW`,
  map`
ffffwFw,vVV,
fffWFlFwVV3V
ffffFlFW,VVv`
]
 
const top = map`
____________
.>.>.>.>.>.>
____________`
const top2 = map`
____________
>>.>>.>>.>>.
____________`
 
let levels = []
function initlevels(){
marker = false
levels = [
  map`
____________
............
____________
~~~~7wwwwwww
8888*w&*6~~w
wwwwww&*6~~w
wfffff&&*88w
wfffff&&&&gw
wwwwfwwwwwww
WWWwfwtFFFFF
WpfffwFFllll
WWWWwwFlllll`,
  map`
wwWwwwwwww
WFFFF*99*W
wFllF6~~7w
wFllF6~~7w
wFFFF*88*W
WwwwwWwwww`,
  top+toptemplates1[Math.round(Math.random()*3)]+midtemplates1[Math.round(Math.random()*3)]+lowtemplates1[Math.round(Math.random()*3)],
  top+toptemplates1[Math.round(Math.random()*3)]+midtemplates1[Math.round(Math.random()*3)]+lowtemplates1[Math.round(Math.random()*3)],
  top+toptemplates1[Math.round(Math.random()*3)]+midtemplates1[Math.round(Math.random()*3)]+lowtemplates1[Math.round(Math.random()*3)],
  top+toptemplates1[Math.round(Math.random()*3)]+midtemplates1[Math.round(Math.random()*3)]+lowtemplates1[Math.round(Math.random()*3)],
  top2+toptemplates1[Math.round(Math.random()*3)]+midtemplates1[Math.round(Math.random()*3)]+lowtemplates1[Math.round(Math.random()*3)],
  top2+toptemplates1[Math.round(Math.random()*3)]+midtemplates1[Math.round(Math.random()*3)]+lowtemplates1[Math.round(Math.random()*3)],
  top2+toptemplates1[Math.round(Math.random()*3)]+midtemplates1[Math.round(Math.random()*3)]+lowtemplates1[Math.round(Math.random()*3)],
  top2+toptemplates1[Math.round(Math.random()*3)]+midtemplates1[Math.round(Math.random()*3)]+lowtemplates1[Math.round(Math.random()*3)],
  top2+toptemplates2[Math.round(Math.random()*3)]+midtemplates2[Math.round(Math.random()*3)]+lowtemplates2[Math.round(Math.random()*3)],
  top2+toptemplates2[Math.round(Math.random()*3)]+midtemplates2[Math.round(Math.random()*3)]+lowtemplates2[Math.round(Math.random()*3)],
  top2+toptemplates2[Math.round(Math.random()*3)]+midtemplates2[Math.round(Math.random()*3)]+lowtemplates2[Math.round(Math.random()*3)],
  top2+toptemplates2[Math.round(Math.random()*3)]+midtemplates2[Math.round(Math.random()*3)]+lowtemplates2[Math.round(Math.random()*3)],
  map`
____________
9999VVVV6~*g
~~~~7VVV6~7V
~~~~7&Vv6~~7
~~~~7&Vfv6~7
~~88&vvvv6~7
88&vwv/w/6~~
/v,vvvvv//6~
vv/wVVvvw/6~
v,VVwwww,6~~
vvvvv/v,v6~7
v,,,vvvv6~~7`
]
}
 
initlevels()
 
const testlevels = [
  map`
_____________
.............
_____________
*******6~~~~~
*******6~~~~~
****Xx**88888
***xxX*******
*x*&&*x&&&***
&&&x&&&&*****
*&&&***x*ww**
*&&*f,fv,?Www
p**f/V,mF/?gW`,
  map`
_____________
>.>.>.>.>.>.>
_____________
www,,fwwwwWWW
ffVf/Vfff,,,W
f?f/vfFFFFfww
ffvffFFllFffg
f?f?fFlllFFff
fffffFllllF,f
fffmfFllllFff
ffffmFllllFff
pffffFlllFFff`,
  map`
_____________
>>>>>>>>>>>>>
_____________
WWWwwwwwwWWWW
ff,ff,fff,,,W
fffw,wfmffffw
fmffwfFFFfmff
ffffffwlFmffm
ffffffwlFwm,f
fffmffFlFFfff
ffvfmfFllFgFF
pmfffvFllFfFl`,
  map`
_____________
>>>>>>>>>>>>>
_____________
WWWwwwwwwWWWW
ff,ff,fff,,,W
fffw,wfmffffw
fmffwfFFFfmff
9999999999999
8888888888888
fffmffFlFFfff
ffvfmfFllFgFF
pmfffvFllFfFl`,
  map`
~~~~~~~~7**&**&**&*&*&fwwf>>
~~~~~~88***wWWwWWwWwfffffffl
~~~~88****fwwfwWwFFFFffffffl
8888*****f??/f?wwFFlFffffffl
**&****ffff//fffFFllFffWWffl
****&*&ff,,ffffFFlllFffffffl
***&&&ffv,W,ffFFFlllFffffffl
&&&&&&fVf?,vVfFFllllFffffffl
x&&&&ffff,,fffFFllllF*Xffffl
&&&x&fffffffmfFFllllF*9&fffl
&p&&&kff3ffffffFFlllF6~7Xffl
XXX&&fffftffmffFFlllF*8XXgfl`
];
 
 
function setMusic(){
if(level != 0){
  if(time == 200){
    playmusic("spookygame2")
  }else{
    if(level > 11){
    playmusic("game3p2")
    }else if(level > 9){
    playmusic("game3p1")
    }else if(level > 5){
    playmusic("game")
    }else{
    playmusic("game2")
    }
  }
}else{
  playmusic("menu")
}
   
}
 
 
const currentLevel = levels[level];
setMap(currentLevel);
 
setSolids([ player, key, wall, spookywall, hud]);
 
setPushables({
  [player]: [key]
});
 
setMusic();
 
 
// START - PLAYER MOVEMENT CONTROLS
 
  
onInput("w", () => {
  try{
  if(pause){cursorpos-=1}else{
  if(stun == 0){
  getFirst(player).y -= 1;
  }
  }
  }catch(e){addSprite(1, 11, player);}
});
 
onInput("a", () => {
  try{
  if(pause){
    if(cursorpos == 1){pause = !pause}
    if(cursorpos == 2){
      settings.volume--;
      if(settings.volume < 0){settings.volume=0}
      setMusic();
    }
  }else{
  if(stun == 0){
  getFirst(player).x -= 1;
  }
  }
  }catch(e){addSprite(1, 11, player);}
});
 
onInput("s", () => {
  try{
  if(pause){cursorpos+=1}else{
  if(stun == 0){
  getFirst(player).y += 1;
  }
  }
  }catch(e){addSprite(1, 11, player);}
});
 
onInput("d", () => {
  try{
  if(pause){
    if(cursorpos == 1){pause = !pause}
    if(cursorpos == 2){
      settings.volume++;
      if(settings.volume > 2){settings.volume=2};
      setMusic();
    }
      if(cursorpos == 3){initlevels(); level = 0;
                      const currentLevel = levels[level];
                      setMap(currentLevel); pause = false; setMusic()}
    if(cursorpos == 4){settings.animations = !settings.animations}
    if(cursorpos == 5){
      if(settings.language == "en"){settings.language = "es"}else{settings.language = "en"}
    }
  }else{
  if(stun == 0){
  getFirst(player).x += 1;
  }
  }
  }catch(e){addSprite(1, 11, player);}
});
 
 
// END - PLAYER MOVEMENT CONTROLS
 
setInterval(function(){
if(!pause){
  try{
  if(level == 0){
    
  }else if(level<5){
    for(let i = 0; i < getAll(fireball).length; i++){
      if(getAll(fireball)[i].x == getFirst(player).x || getAll(fireball)[i].y != 1){
      if(time > 200){
        if(getAll(fireball)[i].x == getFirst(player).x || getAll(fireball)[i].y != 1){
          if(getAll(fireball)[i].x > getFirst(player).x){
            getAll(fireball)[i].x =getAll(fireball)[i].x - 1 + Math.round(Math.random())
          }else if(getAll(fireball)[i].x > getFirst(player).x){
            getAll(fireball)[i].x =getAll(fireball)[i].x + 1 + Math.round(Math.random())
          }
        }
      }
      if(time != 0){
      getAll(fireball)[i].y = getAll(fireball)[i].y + 1
      if(getAll(fireball)[i].y == 11){
        getAll(fireball)[i].y = 1
      }
      }
      }
    }
  }else{
    for(let i = 0; i < getAll(fireball).length; i++){
      if(getAll(fireball)[i].x == getFirst(player).x || getAll(fireball)[i].y != 1){
      if(time > 200){
        if(getAll(fireball)[i].x == getFirst(player).x || getAll(fireball)[i].y != 1){
          if(getAll(fireball)[i].x > getFirst(player).x){
            getAll(fireball)[i].x =getAll(fireball)[i].x - 1 + Math.round(Math.random())
          }else if(getAll(fireball)[i].x > getFirst(player).x){
            getAll(fireball)[i].x =getAll(fireball)[i].x + 1 + Math.round(Math.random())
          }
        }
      }
      getAll(fireball)[i].y = getAll(fireball)[i].y + 1
      if(getAll(fireball)[i].y == 11){
        getAll(fireball)[i].y = 1
      }
    }
    }
  }
  }catch(e){
    ;
  }
}
},200)
    
onInput("i", () => {
  if(pause){pause = false}else{pause = true}
});
 
setInterval(function(){
if(!pause){
  if(health <= 0 && marker == false){
    stun = 100
    marker = true
    setTimeout(function(){
    fire = 0
    time = 0
    level = 0
    stun = 0
    playmusic("menu")
    initlevels()
    sfx("lose")
    const currentLevel = levels[level];
    if (currentLevel !== undefined) {
      clearText("");
      setMap(currentLevel);
    }
    getFirst(player).y = 10;
    getFirst(player).x = 1;
    health = 6
      lastdmg = 0
    },1000)
  }
  if(tilesWith(hotfloor,player).length == 1){
    if(time%5 == 0){
    health = health - 1
    }
    lastdmg = 200
    sfx("firedamage")
    fire = fire + 2
  }
  if(tilesWith(heart,player).length == 1){
    if(!levelused){
    health++;
    levelused = true
    sfx("powerup")
    }
  }
  if(tilesWith(fireball,player).length > 0){
    lastdmg = 200
    health = health - 1
    fire = fire + 5
    sfx("firedamage")
    getFirst(player).y = getFirst(player).y + 1
  }
  if(tilesWith(thrower,player).length > 0){
    stun = stun + 10
    health = health - 1
    throwmx = (Math.round(Math.random())-0.5)*5
    sfx("thrown")
  }
  if(tilesWith(mine,player).length == 1){
    sfx("prebeep");
    setTimeout(function(){
    sfx("kaboom")
    lastdmg = 200
    if(tilesWith(mine,player).length == 1){
      health = health - 1
      stun = stun + 10
      getFirst(player).x = getFirst(player).x + (Math.round(Math.random())*2)-1
    }
    }
    ,100)
  }
  if(tilesWith(cacti,player).length == 1){
    sfx("healthlower");
    health = health - 1
  }
  if(tilesWith(smallcacti,player).length == 1){
    sfx("healthlower");
    health = health - 1
  }
  if(tilesWith(lava,player).length == 1){
    health = health - 50
    lastdmg = 200
    sfx("firedamage")
    fire = fire + 5
  }
  
      playersprite = 0
 
  
  fire = fire - 1
  if(fire > 0){
    lastdmg = 200
    if(time%20 == 0){
      sfx("firedamage")
      health = health - 1
    }
    if(fire%2 == 0){
      playersprite = 7
    }else{
      playersprite = 8
    }
  }
  stun = stun - 1
 
 
  if(stun < 0){
    stun = 0
  }
  if(stun != 0){
    if(stun%2 == 0){
      playersprite = 1
    }else{
      playersprite = 2
    }
  }
  lastdmg = lastdmg - 1
  if(lastdmg < 0){
    lastdmg = 0
  }
  if(tilesWith(water,player).length == 1){
    if(Math.round(time/2)%2 == 0){
      playersprite = 5
    }else{
      playersprite = 6
    }
    fire = 0
  }
  
  if(fire > 100){fire = 100}
  if(lastdmg > 300){lastdmg = 300}
  
  health = Math.round(health)
  if(health > maxhealth){health = maxhealth}
  if(fire < 0){fire = 0}
 
  if(throwmx != 0){
    if(throwmx>0){
      playersprite = 3
      if(time%2 == 0){
        throwmx = throwmx - 0.5
        getFirst(player).x += Math.floor(throwmx);
      }
    }else{
      playersprite = 4
      if(time%2 == 0){
        throwmx = throwmx + 0.5
        getFirst(player).x += Math.ceil(throwmx);
      }
    }
  }
}
 
 
  
  clearText("")
 
  
  
  if(health < 1){
    tcolr = color`3`
  }else if(health < 3){
    tcolr = color`9`
  }else if(health < 5){
    tcolr = color`F`
  }else{
    tcolr = color`4`
  }
  if(fire>0){
    if(fire%2==0){tcolr = color`3`}else{tcolr = color`9`}
  }
  
  addText(""+health, { x: 0, y: 0, color: tcolr });
  addText(""+Math.round(time*10)/100, { x: 6, y: 0, color: color`D` });
  if(pause){
    if(cursorpos<1){cursorpos=1} if(cursorpos>5){cursorpos=5}
    
    addText(langdata[settings.language].paused, { x: 4, y: 2, color: color`L` });
    if(cursorpos == 1){tcolr=color`4`;temp=">"}else{tcolr=color`1`;temp=" "}
    addText(temp+langdata[settings.language].unpause, { x: 3, y: 5, color: tcolr });
    if(cursorpos == 2){tcolr=color`4`;temp=">"}else{tcolr=color`1`;temp=" "}
    if(settings.volume == 2){
      addText(temp+langdata[settings.language].volmax, { x: 3, y: 6, color: tcolr });
    }else if(settings.volume == 1){
      addText(temp+langdata[settings.language].volmid, { x: 3, y: 6, color: tcolr });
    }else{
      addText(temp+langdata[settings.language].volmute, { x: 3, y: 6, color: tcolr });
    }
    if(cursorpos == 3){tcolr=color`4`;temp=">"}else{tcolr=color`1`;temp=" "}
    if(settings.darkmode){
    addText(temp+langdata[settings.language].darkmodeoff, { x: 3, y: 7, color: tcolr });
    }else{
    addText(temp+langdata[settings.language].darkmodeon, { x: 3, y: 7, color: tcolr });
    }
    if(cursorpos == 4){tcolr=color`4`;temp=">"}else{tcolr=color`1`;temp=" "}
    if(settings.animations){
    addText(temp+langdata[settings.language].animson, { x: 3, y: 8, color: tcolr });
    }else{
    addText(temp+langdata[settings.language].animsoff, { x: 3, y: 8, color: tcolr });
    }
    if(cursorpos == 5){tcolr=color`4`;temp=">"}else{tcolr=color`1`;temp=" "}
    addText(temp+langdata[settings.language].langchange, { x: 3, y: 9, color: tcolr });
  }
 
  if(level == 0){
  if(time%800 == 0 || time%800 == 315){
    playmusic("menu")
  }else if(time%800 == 155 || time%800 == 475){
    playmusic("menu2")
  }else if(time%800 == 635){
    playmusic("menu3")
  }
  }else if(level == 14){
  if(time%800 == 0 || time%800 == 315){
    playmusic("game4p1")
  }else if(time%800 == 155 || time%800 == 475){
    playmusic("game4p2")
  }else if(time%800 == 635){
    playmusic("game4p3")
  }
  }else{
  if(time == 200){
    playmusic("spookygame2")
  }
  }
}
,50)
setInterval(
function(){
  if(!pause){
    time = time + 1
  }
}    
,100)
 
afterInput(() => {
  
  sfx("walk")
  lastdmg = lastdmg + 5
  
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, player).length;
 
  if (numberCovered === targetNumber) {
    // increase the current level number
    if(level == 0){level = 2}
    else if(level == 1){level = 0}
    else{level++;}
    levelused = false
    time = 0
    setMusic();
 
    const currentLevel = levels[level];
 
    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
      addSprite(1, 10, player);
    } else {
      addText(":)", { y: 4, color: color`D` });
      initlevels()
      level = 1
    }
    
  }
});
 
 
 
 
