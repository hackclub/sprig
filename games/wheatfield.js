/*
@title: WheatField
@author: FEEJEE
@tags: ['simulation']
@addedOn: 2024-03-00

@img: ""


.𖥔 ݁ ˖
𝐖𝐞𝐥𝐜𝐨𝐦𝐞 𝐭𝐨 𝐖𝐡𝐞𝐚𝐭𝐅𝐢𝐞𝐥𝐝 

The 𝐨𝐛𝐣𝐞𝐜𝐭𝐢𝐯𝐞 of this game is to plant the crops, mostly flowers.
All types of crops give 𝐝𝐢𝐟𝐟𝐞𝐫𝐞𝐧𝐭 ranges amount of seeds.
Which can be 𝐬𝐨𝐥𝐝 later on for 𝐭𝐨𝐤𝐞𝐧𝐬.

Tokens can be used to 𝐮𝐩𝐠𝐫𝐚𝐝𝐞 your seeds.
(Icon on the bottom right side of your screen.)

-----------------------------------------------------------------
◘ IMPORTANT:

❖ Harvest 𝐢𝐧 𝐨𝐫𝐝𝐞𝐫 of planting ⋄❥
❖ 𝐖𝐚𝐭𝐜𝐡 𝐨𝐮𝐭 for your crops, they may disappear ⋄❥
❖ West and East 𝐟𝐞𝐧𝐜𝐞𝐬 can interact ⋄❥
❖ Stand on the 𝐦𝐚𝐫𝐤 to interact with villagers ⋄❥
❖ Types of crops that are planted will be 𝐫𝐚𝐧𝐝𝐨𝐦 ⋄❥
❖ 𝐆𝐫𝐚𝐬𝐬𝐞𝐬 can be interact⋄ ⋄❥
-----------------------------------------------------------------

WASD to move
J to use items
I to change items
L to interact

*/

const wheat_icon = "1"
const rose_icon = "2"
const white_rose_icon = "3"
const lily_valley_icon = "4"
const bag_icon = "B"
const harvester_icon = "H"
const potion_icon = "P"

const playerlt = "o"
const playerrt = "p"
const playerup = "["
const playerdw = "]"

const buyer = "5"
const florist = "6"
const inventorysmith = "7"
const buyspot = "8"
const floristspot = "9"
const upgraderspot = "0"


const wheat = "a"
const rose = "b"
const white_rose = "c"
const lily_valley = "d"
const seedling = "e"
const hoed_dirt = "f"

const dirt = "g"
const grass = "h"
const log = "i"
const log_wheat = "j"
const log_rose = "k"

const fenceup = "^"
const fencedw = "v"
const fencelt = "<"
const fencert = ">"

const grey = "G"

const haverestTune = tune`
66.66666666666667: F4/66.66666666666667 + A4~66.66666666666667,
66.66666666666667: G4/66.66666666666667 + B4~66.66666666666667,
66.66666666666667: B5-66.66666666666667 + G5-66.66666666666667,
1933.3333333333335`;
const plantTune = tune`
66.66666666666667: D5~66.66666666666667 + B4^66.66666666666667,
66.66666666666667: C5~66.66666666666667 + A4^66.66666666666667,
66.66666666666667: E4-66.66666666666667 + C4-66.66666666666667,
1933.3333333333335`;
const sellTune = tune`
37.5: B4/37.5,
37.5: A5/37.5 + F5/37.5 + D5/37.5,
37.5: B5^37.5 + G5^37.5,
1087.5`;
const lilyTune = tune`
120: C4~120 + E4^120,
120: E4~120 + G4^120,
120: F4~120 + A4^120,
120,
120: B4^120 + D5^120 + F5^120,
120: F5/120 + B4/120 + D5/120 + E4~120,
120: G5/120 + E5/120 + C5/120 + E4~120,
120: A5/120 + F5/120 + D5/120 + E4~120,
120: B5/120 + G5/120 + E5/120 + G4~120,
120: B5/120 + G5/120 + E5/120 + G4~120,
2640`;




setLegend(

  [ lily_valley_icon, bitmap`
5555555555555555
570D7D77D7777775
502207747D777775
502220D074D77775
57000022D7D77775
56770222D07D7775
577770002207D745
577777022D42DD75
57776770D704D775
577777022022D775
576770222002D775
577777000770D775
577777776777D775
5L777L177777D715
5LL71LL1L7LLL1L5
5555555555555555` ],
  [ white_rose_icon, bitmap`
0000000000000000
0777777777777760
0677777776777770
0777777777700770
0777776770022070
0700077000222200
0022200220022020
0222202222040220
00220702220D2220
07427D7D2077D200
077DD74D7D7D7D40
0727D7DD77227D70
022DD277D2222D70
07DD7227D47D7770
0C4DDCCDDCC4DCD0
0000000000000000` ],
  [ rose_icon, bitmap`
0000000000000000
0111111111111110
0111111111111110
0111111111100110
0111111110033010
0100011000333300
0033300330033030
0333303333040330
00330103330D3330
01431D1D3011D300
011DD14D1D1D1D40
0131D1DD11331D10
033DD311D3333D10
01DD1331D41D1110
014DD11DD114DCD0
0000000000000000` ],
  [ wheat_icon, bitmap`
0000000000000000
0111111111111110
0111111111111110
01611F1111111110
01F1161161111F10
01F1161F611F6610
01611F1F116F1610
0116FF1611F16FF0
0116161F61616F60
0116F61F61666F60
0F66F66666F661F0
01F66F6F66F161F0
0F66666F6F6666F0
0F666661666116F0
06F61F6666616660
0000000000000000` ],
  [ bag_icon, bitmap`
0000000000000000
0..............0
0..............0
0..............0
0........0000..0
0...00000CCCC0.0
0..0CCCCCC4CC0.0
0..0C64646DDCC00
0..0CD666D66CC00
0.09CCCCCCCCCC00
0..0999C9C9C90.0
0.09C9C9C9C9C0.0
0..0CCCCCCCC0..0
0...00000000...0
0..............0
0000000000000000` ],
  [ harvester_icon, bitmap`
0000000000000000
0..............0
0.......0000...0
0.....0011110..0
0....011112110.0
0....011220210.0
0...011200.020.0
0..011120...0..0
0..00LL20......0
0.CCLCL0.......0
0.0LCLC0.......0
00LLLC0........0
00CCC0.........0
00LLL0.........0
007L0..........0
0000000000000000` ],
  [ potion_icon, bitmap`
0000000000000000
0..............0
0.....0000.....0
0....0111L0....0
0...00LLLL00...0
0...04D44D40...0
0....044440....0
0....04D4D0....0
0....044440....0
0....0D4D40....0
0....044440....0
0....044440....0
0....044440....0
0....004400....0
0......00......0
0000000000000000` ],

  [ playerlt, bitmap`
................
................
................
................
......66666.....
.....6666666....
...66666666666..
.....2222666....
....2202202.....
....22222222....
....22222222....
.....5L9L5......
....55999L55....
...55L191LL55...
....5L111L5L55..
..55L999999LL5..` ],
  [ playerrt, bitmap`
................
................
................
................
.....66666......
....6666666.....
..66666666666...
.....222222.....
....22022022....
....22222222....
....22222222....
......5L9L5.....
....55L99955....
...55LL191L55...
..55L5L111L5....
..5LL999999L55..` ],
  [ playerup, bitmap`
................
................
................
................
.......66666....
.....F666666....
.....FF66666F...
...F6FFFFFFF66..
..F666666666666.
.....22222222...
.....2222222....
.....5222225....
....55555555....
...5575555555...
..557555557555..
..555555555775..` ],
  [ playerdw, bitmap`
................
................
................
................
.....F66666.....
....FFF666F6....
...66FFFFF666...
..666666666666..
....22222222....
....22022022....
....22222222....
......5L9L5.....
....55L99955....
...55LL191L55...
..55L5L111L5....
..5LL999999L55..` ],

  [ inventorysmith, bitmap`
................
................
................
.....LLLLL......
...5L55L55L5....
.LLL5LL5LL5LLL..
....2222222.....
...222022202....
...222222222....
...22222222.....
....7222227.....
...7L7LL57L.....
..7L7L11LL77....
.7L7LL221LL7L...
.77551212LL57...
.7L12222111LL5..` ],
  [ buyer, bitmap`
................
................
....F6F6F6......
...F6F6F6F6.....
...6F6F6F6F6....
.66F6F6F6F6F66..
....2222222.....
...222022202....
...222222222....
...22222222.....
....D22222D.....
...DDDFF5DD.....
..DDDF11FFDD....
.DDDFF221FDDD...
.DD551212FF5D...
.DF12222111FF5..` ],
  [ florist, bitmap`
................
................
....36F6F6......
...3336F6F6.....
...636F6F6F6....
.66F6F6F6F6F66..
....2222222.....
...222822282....
...222222222....
...22222222.....
....D22222D.....
...DDDFF5DD.....
..DDDFLLFFDD....
.DDDFF22LFDDD...
.DD55L2L2FF5D...
.DFL2222LLLFF5..` ],
  [ buyspot, bitmap`
................
................
..6..........6..
.666........666.
..6..........6..
.......6........
......666.......
.......6........
................
................
................
................
................
................
................
................` ],
  [ floristspot, bitmap`
................
................
..3..........7..
.333........777.
..3..........7..
.......6........
......666.......
.......6........
................
................
................
................
................
................
................
................` ],
  [ upgraderspot, bitmap`
................
...5............
..5L5..1........
...5............
................
.1..1...........
................
......5.........
.....5L5........
......5.........
..1.............
................
...5............
..5L5..1........
...5............
................` ],
  
  [ fenceup, bitmap`
................
................
................
................
....000....00...
..00CCC00.0CC0..
.0CCCCCCC0CCCC0.
.0CCCCCC0CCCCC0.
.0CCCCCCC0CCCC0.
.0CCCCCC0CCCCC0.
.00CCCCC0CCCCC0.
.0C00CC0000CCC0.
.0CCC00C0CC0000.
.4CCCCCC0CCCCC04
D04C4CC4DCCC4C4.
4DDDD4DC4DCDCC0D` ],
  [ fencedw, bitmap`
................
................
................
................
....000....00...
..00CCC00.0CC0..
.0CCCCCCC0CCCC0.
.0CCCCCC0CCCCC0.
.0CCCCCCC0CCCC0.
.0CCCCCC0CCCCC0.
.00CCCCC0CCCCC0.
.0C00CC0000CCC0.
.0CCC00C0CC0000.
.4CCCCCC0CCCCC04
D04C4CC4DCCC4C4.
4DDDD4DC4DCDCC0D` ],
  [ fencelt, bitmap`
................
.....00000......
....0CCCCC00....
...0CCCCCCCC0...
...00CCCCCC00...
...0C000000C0...
...00CCCCC000...
...0CCCCCCCC0...
...00CCCCCCC0...
....00000000....
....0CCCCCCC04..
...0CCCCCCC00...
.4.00000000C0..4
..D0CCCCCCCC0D4.
.4D0CCCCCCCC0DD.
DD40CCCCCCCC0D4D` ],
  [ fencert, bitmap`
................
......00000.....
....00CCCCC0....
...0CCCCCCCC0...
...00CCCCCC00...
...0C000000C0...
...000CCCCC00...
...0CCCCCCCC0...
...0CCCCCCC00...
....00000000....
..40CCCCCCC0....
...00CCCCCCC0...
4..0C00000000.4.
.4D0CCCCCCCC0D..
.DD0CCCCCCCC0D4.
D4D0CCCCCCCC04DD` ],

  [ lily_valley, bitmap`
....4.4D........
..0D.D..D.......
.0220..4.D......
.02220D0.4D.....
..000022D.D.....
.6..0222D0.D....
.....000220.D.4.
......022D42DD..
....6..0D.04D...
......022022D...
..6..0222002D...
......000..0D...
1.......6...D...
LL...L1.....D.1L
1LL.1LL1L.LLL1LL
LLLLLLLL1LLLLLLL` ],
  [ white_rose, bitmap`
................
..............6.
.6.......6......
...........00...
......6..00220..
..000..00022220.
.022200220022020
0222202222040220
.0220.02220D2220
..42.D.D20..D20.
...DD.4D.D.D.D4.
..2.D.DD..22.D.4
.22DD2..D2222D.D
..DD.22.D4.D...D
.C4DDCCDDCC4DCDC
CCCDCCCDCCCCCDCC` ],
  [ rose, bitmap`
................
................
................
...........00...
.........00330..
..000..00033330.
.033300330033030
0333303333040330
.0330.03330D3330
..43.D.D30..D30.
...DD.4D.D.D.D4.
..3.D.DD..33.D.4
.33DD3..D3333D.D
..DD.33.D4.D...D
.C4DDCCDDCC4DCDC
CCCDCCCDCCCCCDCC` ],
  [ log_rose, bitmap`
................
................
................
...........00...
.........00330..
..000..00033330.
.033300330033030
0333303333040330
.0330.03330D3330
..43.D.D30..D30.
CCCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0C00C000CCCC0C0C
CCCCCCCCCCC0C00C
CCCCC0CC0CCCCCCC
00000.00.0000000` ],
  [ wheat, bitmap`
CCCCCCCCCCLCCCCC
CLFCCCCCFFFCLCCF
LFFFFFFFFFFFFFFC
LF6LCFCCCLCCCCCC
CCFCC6CC6CCLCFCL
CFFCC6CF6CCF66C6
FC6CCFCFCC6FC6CF
CCC6FFL6CCFC6FF6
FFC6C6FF6C6C6F66
LCC6F6CF6C666F6C
CF66F66666F66CF6
FCF66F6F66FC6CFL
CF66666F6F6666FF
LF66666C666CL6F6
F6F6LF66666C666F
C666CFC6FC66F66F` ],
  [ seedling, bitmap`
CCCCCCCCCCLCCCCC
C4FCCCCCFFFCLCC4
LD4FFFFF4FFF4FFD
FDDLCFC4DDCCDCDD
CDD4CCLDD4CCD4CC
CCCFLLFLFFFFDDFC
C4FFFFFFFFF4FFFC
FDDC4CCCCCC4CCCF
CD4CDD4CCCDDCCCC
CDDDD4DCC4DDDLCD
LFFDDDDFFFFFFFFL
FFFCCCCCCFFCFFFF
CCCD4CCCLCCCD4CD
DCL4DDFLFFF4DFFF
DFF4DD4FCF4DD4CC
FCDDDDDDCCDDDDDC` ],
  [ hoed_dirt, bitmap`
CCCCCCCCCCLCCCCC
CLFCCCCCFFFCLCCF
LFFFFFFFFFFFFFFC
FCLLCFCCCCCCCCCC
CCCCCCLCCCCCCCCC
CCCFLLFLFFFFLCFC
CFFFFFFFFFFFFFFC
FFFCCCCCCCCCCCCF
CCCCCLCCCCCCCCCC
CLLCLFCCCCCCLLCC
LFFFFFFFFFFFFFFL
FFFCCCCCCFFCFFFF
CCCCCCCCLCCCCCCC
CCLFFCFLFFFFFFFF
CFFFFFFFCFCCFFCC
FCCCCCCCCCCCLCLC` ],
  [ grass, bitmap`
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
.4..4.....4.....
..4.D4.4..D.4...
.4DD.D4.D.D4D.4.
DD4.DDDD4D4D.DD4` ],
  [ dirt, bitmap`
  FFFFFFFFFFFFFFFC
  FFFFFFFFFFFFFFFF
  FFFFCFFFFFFFFFFF
  FFFCCCFFFFFFFFFF
  FFFCCFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFCFFFFFF
  FFFFFFFFCCFFFFFF
  FFFFFFFFFFFFFFFF
  FFFFFFFFFFFFFFCF
  FFFFFFFFFFFFFCCF
  FFFFFFFFFFFFCFFF
  FFFFFFFFFFFFFFFF
  CFFFFFFFFFFFFFFF
  CCFFFFFFFFFFFFFF` ],
  [ log, bitmap`
................
................
................
................
................
...00...........
..0CC0000000....
000CCCCCCCCC0000
CCCCCCC000CCCCCC
CCCC0000C0000CCC
CCCCCCCCCCCCCCCC
0CCCCCCCCCCCCCCC
0C00C000CCCC0C0C
CCCCCCCCCCC0C00C
CCCCC0CC0CCCCCCC
00000.00.0000000` ],
  [ log_wheat, bitmap`
................
................
................
.....F.....F6...
..F6.6....66F...
..F6F66.F6F66...
..F66F6F666F6...
00666F6666F66600
C6F6F666F66F6FCC
CF66666F6666F6CC
C66FCC6C6FCC66CC
0C6CCF66C6C6FCCC
0C00C000CCCC0C0C
CCCCCCCCCCC0C00C
CCCCC0CC0CCCCCCC
00000.00.0000000` ],

  [ grey, bitmap`
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
LLLLLLLLLLLLLLLL` ],
  /*  [ wheat, bitmap`
  ................
  ................
  ................
  ..6..F..........
  ..F..6..6....F..
  ..F..6.F6..F66.6
  ..6..F.F..6F.6.F
  ...6FF.6..F.6FF6
  ...6.6.F6.6.6F66
  ...6F6.F6.666F6.
  .F66F66666F66.F6
  ..F66F6F66F.6.F.
  .F66666F6F6666FF
  .F66666.666..6F6
  .6F6.F66666.666F
  .666.F.6F.66F66F` ], */
  
)

setSolids([playerlt,playerrt,playerup,playerdw,buyer,florist,log,log_wheat,log_rose,inventorysmith])


let mainLevel = 3 //Adjust main level
let level = mainLevel
const levels = [
  map`
..h......h
..........
..........
.........>
.....h.o.>
..........
..........
h.........`, //0 plain
  map`
....h.....
..........
..........
<.....h..>
<......o.>
..........
...h......
..........`, //1 plain
  map`
.........h
..hijj5...
......8...
<h.......>
<.......o>
..........
...h......
..........`, //2 Seeds buyer level
  map`
....^^...h
.h........
..........
<........>
<........>
.......o..
.hh......B
....vv...h`, //3 Main level
  map`
jj........
kk6.......
..9....h..
<.........
<p...h....
..........
..h.......
.........h`, //4 Florist level

]

setMap(levels[level])
setBackground(dirt);

setPushables({
})

var plr_x = getFirst(playerlt).x
var plr_y = getFirst(playerlt).y
var token = 0
var crops = 1
var inventory = 1
var inventoryLev = 0
var inventoryLevMax = 3
var inventoryLoop = false

var limit = 1
var floristLevel = 1
var required_florist_tokens = 1
var cooldown = false


function showSeeds() {
  if(inventory == 1){
    if(crops >= 1){
      addSprite(8, 6, wheat_icon)
    }
    if(crops >= 2){
      addSprite(7, 6, rose_icon)
    }
    if(crops >= 3){
      addSprite(6, 6, white_rose_icon)
    }
    if(crops >= 4){
      addSprite(5, 6, lily_valley_icon)
    }
  }
}
function delSeeds() {
  try{
    getFirst(wheat_icon).remove()
  }catch(error){}
  try{
    getFirst(rose_icon).remove()
  }catch(error){}
  try{
    getFirst(white_rose_icon).remove()
  }catch(error){}
  try{
    getFirst(lily_valley_icon).remove()
  }catch(error){}
}
function showGameMenu() {
  addText("Welcome to", {
    x: 4,
    y: 2,
    color: color`2`
  })
  addText("WheatField..", {
    x: 6,
    y: 3,
    color: color`2`
})
  addText("WASD to move", {
    x: 2,
    y: 6,
    color: color`2`
})
  addText("J to use item", {
    x: 2,
    y: 7,
    color: color`2`
})
  addText("I to change item", {
    x: 2,
    y: 8,
    color: color`2`
})
  addText("L to interact", {
    x: 2,
    y: 9,
    color: color`2`
}) 
}
showGameMenu()

function handleHarvest() {
  if(inventory == 2){
    try{
      if(plr_x == getFirst(wheat).x && plr_y == getFirst(wheat).y){
        let seeds_rnd = Math.floor((Math.random() * 2) + 1);
        getFirst(wheat).remove()
        limit += seeds_rnd
        playTune(haverestTune)
      }
    }catch(error){}
    try{
        if (plr_x == getFirst(rose).x && plr_y == getFirst(rose).y){
          let seeds_rnd = Math.floor((Math.random() * 3) + 1);
          getFirst(rose).remove()
          limit += seeds_rnd
          playTune(haverestTune)
          
        }
      }catch(error){}
    try{
        if (plr_x == getFirst(white_rose).x && plr_y == getFirst(white_rose).y){
              let seeds_rnd = Math.floor((Math.random() * 4) + 1);
              getFirst(white_rose).remove()
              limit += seeds_rnd
              playTune(haverestTune)
          
        }
      }catch(error){}
    try{
        if (plr_x == getFirst(lily_valley).x && plr_y == getFirst(lily_valley).y){
          let seeds_rnd = Math.floor((Math.random() * 7) + 1);
          getFirst(lily_valley).remove()
          limit += seeds_rnd
          playTune(haverestTune)
          
        } 
    }catch(error){}
  }
}
function handlePlanting() {
  if(inventory == 1){
    if (limit > 0 && cooldown == false){
    
      playTune(plantTune);
        
      addSprite(plr_x, plr_y, hoed_dirt);
      limit -= 1
      cooldown = true
      
      var hdrt_x = getFirst(hoed_dirt).x
      var hdrt_y = getFirst(hoed_dirt).y
        
      setTimeout(function(){ /*Spawn seedling*/
        
        addSprite(hdrt_x, hdrt_y, seedling);
        cooldown = false
    
        setTimeout(function(){
          getFirst(hoed_dirt).remove()
        }, 10)
        
              
      }, 2000);  
      setTimeout(function(){ /*Spawn crops*/
        if(crops == 1){
          getFirst(seedling).remove()    
          addSprite(hdrt_x, hdrt_y, wheat)
        }
        
        if(crops >= 4){
          let crop_random = Math.floor((Math.random() * 4) + 1);
          let crop_type = wheat
    
          if(crop_random == 2){
            crop_type = rose
          }
          
          if(crop_random == 3){
            crop_type = white_rose
          }
    
          if(crop_random == 4 && plr_y <= 0){
            crop_type = lily_valley
            playTune(lilyTune)
          }
  
          try{
            getFirst(seedling).remove() 
          }catch(error) {}  
          addSprite(hdrt_x, hdrt_y, crop_type)      
          
          }else{
            if(crops >= 3){
              let crop_random = Math.floor((Math.random() * 3) + 1);
              let crop_type = wheat
        
              if(crop_random == 2){
                crop_type = rose
              }
              
              if(crop_random == 3){
                crop_type = white_rose
              }
              
              try{
                getFirst(seedling).remove() 
              }catch(error) {}     
              addSprite(hdrt_x, hdrt_y, crop_type)
              
            }else{
              if(crops >= 2){
              let crop_random = Math.floor((Math.random() * 2) + 1);
              let crop_type = wheat
        
              if(crop_random == 2){
                crop_type = rose
              }
              
              try{
                getFirst(seedling).remove() 
              }catch(error) {}     
              addSprite(hdrt_x, hdrt_y, crop_type)
            }
          }
        }     
      }, 16000);
    
    }else{
  
      if (cooldown == 1){
        
        addText("In cooldown", {
        x: 8,
        y: 1,
        color: color`2`
        })
        
      }else{
        addText("Out of seeds", {
        x: 8,
        y: 1,
        color: color`2`
        })     
      }    
    }
  }

}

function purchaseSeeds() {
    
  if (floristLevel == 1 && token >= 10){
    token -= 10
    floristLevel += 1
    crops += 1
    playTune(sellTune)
      
  }else{
    if (floristLevel == 2 && token >= 35){
      token -= 35
      floristLevel += 1
      crops += 1
      playTune(sellTune)
      
    }else{
      if (floristLevel == 3 && token >= 60){
        token -= 60
        floristLevel += 1
        crops += 1
        playTune(sellTune)
        
      }else{
        if (floristLevel == 4 && token >= 75){
          token -= 75
          crops += 1
          playTune(sellTune)
          
        }
      }
    }
  }
  
}
function sellSeeds() {
  token += 1
  limit -= 3
  playTune(sellTune)
}
function upgradeInventory() {
  if(inventoryLev != inventoryLevMax && token >= 35 ){
    token -= 35
    inventoryLev += 1
    playTune(sellTune)
    getFirst(inventorysmith).remove()
    getFirst(upgraderspot).remove()
  }
}
function runInventoryLoop() {
  if(inventoryLoop == true){
    if(inventory >= 3){
      if(inventoryLev != 1){
        inventory = 1
        addSprite(9, 6, bag_icon)
      }else{
        inventoryLoop = false
      }
    }
  }
}

function pickingGrass() {
  var seed_chance = Math.floor(Math.random() * 100)

  if (seed_chance == 1){
    limit += 1
  }
  if (seed_chance == 2){
    limit -= 1
  }  
}
function spawnInventorysmith() {
  if(level == 0 || level == 1){
    smithspawn = Math.floor(Math.random() * 7);
    if(smithspawn == 1){
      smith_x = Math.floor(Math.random() * 7);
      smith_y = Math.floor(Math.random() * 7) + 1;
      addSprite(smith_x, smith_y, inventorysmith)
      addSprite(smith_x += 1, smith_y, upgraderspot)
      addText("35tokens", {
        x: smith_x,
        y: smith_y -= 1,
        color: color`5`
      })
    }
  }
}

function interactWestGate() {
  level -= 1
  setMap(levels[level])
  spawnInventorysmith()
}
function interactEastGate() {
  level += 1
  setMap(levels[level])
  spawnInventorysmith()
}

function updatePlrData() {
  try{
    plr_x = getFirst(playerlt).x
    plr_y = getFirst(playerlt).y
  }catch(error){}
  try{
    plr_x = getFirst(playerrt).x
    plr_y = getFirst(playerrt).y
  }catch(error){}
  try{
    plr_x = getFirst(playerup).x
    plr_y = getFirst(playerup).y
  }catch(error){}
  try{
    plr_x = getFirst(playerdw).x
    plr_y = getFirst(playerdw).y
  }catch(error){}
  crops = crops
}
function updatePlrInventory() {
  try{
    getFirst(bag_icon).remove()
  }catch(error){}
  try{
    getFirst(harvester_icon).remove()
  }catch(error){}
  try{
    getFirst(potion_icon).remove()
  }catch(error){}
  
  if(inventory == 1){
    addSprite(9, 6, bag_icon)
  }
  if(inventory == 2){
    addSprite(9, 6, harvester_icon)
  }
  if(inventoryLev >=1){
    if(inventory == 3){
      addSprite(9, 6, potion_icon)
    }
  }
}
function updateFloristLevel() {
    if(floristLevel == 1){
      required_florist_tokens = 10
    }
    if(floristLevel == 2){
      required_florist_tokens = 35
    }
    if(floristLevel == 3){
      required_florist_tokens = 60
    }
    if(floristLevel == 4){
      required_florist_tokens = 75
    }
}

function showSeedsTokensValue() {
  let seeds = limit.toString();
  addText(seeds, {
        x: 1,
        y: 13,
        color: color`2`
  })

  let tokens = token.toString();
  addText(tokens, {
        x: 1,
        y: 14,
        color: color`6`
  })

}
function showBuyerDialogue() {
  if (level == 2){
    addText("3seeds for 1token", {
      x: 3,
      y: 1,
      color: color`2`
    })
  
  } 
}
function showFloristDialogue() {
  if (level == 4){
    if(crops != 4){
      addText("Upgrade seeds", {
        x: 7,
        y: 1,
        color: color`2`
      })
      addText(required_florist_tokens.toString(), {
        x: 11,
        y: 2,
        color: color`6`
      })
      addText("Tokens", {
        x: 13,
        y: 2,
        color: color`6`
      })
      
    }else{
      addText("Great seeds!", {
        x: 7,
        y: 1,
        color: color`2`
      })
    }
  }
}





onInput("w", () => {
  if(plr_y != 0){
    try{
      getFirst(playerlt).remove()
    }catch(error){}
    try{
        getFirst(playerrt).remove()
      }catch(error){}
    try{
          getFirst(playerup).remove()
        }catch(error){}
    try{
            getFirst(playerdw).remove()
          }catch(error){}
    addSprite(plr_x, plr_y, playerup)
    getFirst(playerup).y -= 1
  }else{
    try{
      getFirst(playerlt).remove()
    }catch(error){}
    try{
        getFirst(playerrt).remove()
      }catch(error){}
    try{
          getFirst(playerup).remove()
        }catch(error){}
    try{
            getFirst(playerdw).remove()
          }catch(error){}
    addSprite(plr_x, plr_y, playerup)
    
  }
  
})
onInput("a", () => {
  if(plr_x != 0){
    try{
      getFirst(playerlt).remove()
    }catch(error){}
    try{
        getFirst(playerrt).remove()
      }catch(error){}
    try{
          getFirst(playerup).remove()
        }catch(error){}
    try{
            getFirst(playerdw).remove()
          }catch(error){}
    addSprite(plr_x, plr_y, playerlt)
    getFirst(playerlt).x -= 1
  }else{
    try{
      getFirst(playerlt).remove()
    }catch(error){}
    try{
        getFirst(playerrt).remove()
      }catch(error){}
    try{
          getFirst(playerup).remove()
        }catch(error){}
    try{
            getFirst(playerdw).remove()
          }catch(error){}
    addSprite(plr_x, plr_y, playerlt) 
  }

})
onInput("s", () => {
  if(plr_y != 7){
    try{
      getFirst(playerlt).remove()
    }catch(error){}
    try{
        getFirst(playerrt).remove()
      }catch(error){}
    try{
          getFirst(playerup).remove()
        }catch(error){}
    try{
            getFirst(playerdw).remove()
          }catch(error){}
    addSprite(plr_x, plr_y, playerdw)
    getFirst(playerdw).y += 1
  }else{
    try{
      getFirst(playerlt).remove()
    }catch(error){}
    try{
        getFirst(playerrt).remove()
      }catch(error){}
    try{
          getFirst(playerup).remove()
        }catch(error){}
    try{
            getFirst(playerdw).remove()
          }catch(error){}
    addSprite(plr_x, plr_y, playerdw)
  }

})
onInput("d", () => {
  if(plr_x != 9){
    try{
      getFirst(playerlt).remove()
    }catch(error){}
    try{
        getFirst(playerrt).remove()
      }catch(error){}
    try{
          getFirst(playerup).remove()
        }catch(error){}
    try{
            getFirst(playerdw).remove()
          }catch(error){}
    addSprite(plr_x, plr_y, playerrt)
    getFirst(playerrt).x += 1
  }else{
    try{
      getFirst(playerlt).remove()
    }catch(error){}
    try{
        getFirst(playerrt).remove()
      }catch(error){}
    try{
          getFirst(playerup).remove()
        }catch(error){}
    try{
            getFirst(playerdw).remove()
          }catch(error){}
    addSprite(plr_x, plr_y, playerrt)
  }

})
onInput("i", () => {
  if(inventory != 3){
    inventory += 1
    inventoryLoop = true
  }else{
    inventory = 1
  }
})
onInput("j", () => {
  handleHarvest()
  handlePlanting()
})
onInput("k", () => {})
onInput("l", () => {
  
  //Florist
  try{
    if (tilesWith(playerlt, floristspot).length == 1 && floristLevel != 4){purchaseSeeds()}
  }catch(error){}
  try{
    if (tilesWith(playerrt, floristspot).length == 1 && floristLevel != 4){purchaseSeeds()}
  }catch(error){}
  try{
    if (tilesWith(playerup, floristspot).length == 1 && floristLevel != 4){purchaseSeeds()}
  }catch(error){}
  try{
    if (tilesWith(playerdw, floristspot).length == 1 && floristLevel != 4){purchaseSeeds()}
  }catch(error){}

  //SeedsBuyer
  try{
    if (tilesWith(playerlt, buyspot).length == 1 && limit >= 3){sellSeeds()}
  }catch(error){}
  try{
    if (tilesWith(playerrt, buyspot).length == 1 && limit >= 3){sellSeeds()}
  }catch(error){}
  try{
    if (tilesWith(playerup, buyspot).length == 1 && limit >= 3){sellSeeds()}
  }catch(error){}
  try{
    if (tilesWith(playerdw, buyspot).length == 1 && limit >= 3){sellSeeds()}
  }catch(error){}

  //fencelt
  try{
      if (tilesWith(playerlt, fencelt).length == 1){interactWestGate()}
  }catch(error){}
  try{
      if (tilesWith(playerrt, fencelt).length == 1){interactWestGate()}
  }catch(error){}
  try{
      if (tilesWith(playerup, fencelt).length == 1){interactWestGate()}
  }catch(error){}
  try{
      if (tilesWith(playerdw, fencelt).length == 1){interactWestGate()}
  }catch(error){}

  //fencert
  try{
    if (tilesWith(playerlt, fencert).length == 1){interactEastGate()}
  }catch(error){}
  try{
    if (tilesWith(playerrt, fencert).length == 1){interactEastGate()}
  }catch(error){}
  try{
    if (tilesWith(playerup, fencert).length == 1){interactEastGate()}
  }catch(error){}
  try{
    if (tilesWith(playerdw, fencert).length == 1){interactEastGate()}
  }catch(error){}

  //grass
  try{
    if (tilesWith(playerlt, grass).length == 1){pickingGrass()}
  }catch(error){}
  try{
    if (tilesWith(playerrt, grass).length == 1){pickingGrass()}
  }catch(error){}
  try{
    if (tilesWith(playerup, grass).length == 1){pickingGrass()}
  }catch(error){}
  try{
    if (tilesWith(playerdw, grass).length == 1){pickingGrass()}
  }catch(error){}

  //inventorysmith
  try{
    if (tilesWith(playerlt, upgraderspot).length == 1){upgradeInventory()}
  }catch(error){}
  try{
    if (tilesWith(playerrt, upgraderspot).length == 1){upgradeInventory()}
  }catch(error){}
  try{
    if (tilesWith(playerup, upgraderspot).length == 1){upgradeInventory()}
  }catch(error){}
  try{
    if (tilesWith(playerdw, upgraderspot).length == 1){upgradeInventory()}
  }catch(error){}
  
})

        
afterInput(() => {

  /*Prevent negative seeds*/
  if(limit <= 0){
    limit = 0
  }

  /*Prevent negative tokens*/
  if(token <= 0){
    token = 0
  }
  
  /*Update information*/
  updatePlrData()
  updatePlrInventory()
  updateFloristLevel()
  runInventoryLoop()
  delSeeds()
  showSeeds()
  
  
  /*Handle texts on screen*/
  clearText()
  showSeedsTokensValue()
  showBuyerDialogue()
  showFloristDialogue() 
  
})