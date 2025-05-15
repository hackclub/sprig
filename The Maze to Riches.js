/* 
@title: The Maze to Riches
@description: A simple template to help you get started with making a maze game.
@author: Gabriella Olvera
@tags: []
@addedOn: 2023-08-08
*/


setBackground(color``);

size: 2,

addText("Mr.Bob was hacked!", { y: 1, color: color`2` });
addText("Help him get all ", { y: 2, color: color`2` });
addText("his money back", { y: 3, color: color`2` });

addText("key W: up", { y: 5, color: color`6` });
addText("key A: left", { y: 6, color: color`6` });
addText("key S: down", { y: 7, color: color`6` });
addText("key D: right", { y: 8, color: color`6` });

addText("key L: restart level", { y: 9, color: color`6` });


addText("complete the maze ", { y: 11, color: color`H` });
addText("to collect the money", { y: 12, color: color`H` });

addText("Click the key J to ", { y: 14, color: color`7` });
addText("continue", { y: 15, color: color`7` });




onInput("l", () => {
  clearText();  
  setMap(levels[3]);
});



const player = "p";
const goal = "g";
const wall = "w";
const orangePortal ="r";   
const pinkPortal = "i";  
const key ="k";
const lock = "l";
const floor  ="f";
const box = "u";
const creditCard ="c";
const hacker = "h";
const bank ="b";
const computer= "m";
const floor2 = "a";
const fakeMoney = "y";
const anotherBackground="t";
const arrow="e";
const arrow2 ="d";
const melody= tune`
240,
240: C5^240,
240,
240: A4^240,
240: A4^240 + D5^240,
240: A4^240,
720,
240: C5^240,
240,
240: A4^240,
240: A4^240,
240,
240: A4^240,
720,
240: C5^240,
240,
240: A4^240,
240: A4^240,
480,
240: B4^240,
480,
240: D5^240,
240: G4^240,
240: A4^240,
240,
240: D5^240`
const playback = playTune(melody, Infinity);


 setLegend(
  [ player, bitmap`
.....0000000....
.....0000000....
.....0000000....
....000000000...
.....6666666....
....666666666...
...66066666066..
.666666666666666
.6.66663336766.6
...66666666666..
....666666666...
.....6666666....
.......6.6......
.......6.6......
................
................`],
  [ goal, bitmap`
LLLLLLLLLLLLLLLL
L6LLLLLLLLL6LL6L
LLLLLL6LLLLLLLLL
LLLLLLLLLLLLLLLL
DDDDDDDDDDDDDDDD
D44DDD6666DDD44D
D4DDD666666DDD4D
DDDDD606606DDDDD
DDDDD666666DDDDD
D44DDDDDDDDDD44D
DDDDDDDDDDDDDDDD
LLLLLLLLLL6LLLLL
6LLLLLLLLLLLLLLL
LLL6LLL6LLLLLLLL
LLLLLLLLLLLL6LLL
LLLLLLLLLLLLLLLL`],
  [ wall, bitmap`
0000000000000000
0111111111111110
0151155515515510
0515115115151510
0555115115111510
0515115115111510
0111111111111110
0111111111111110
0112222222222110
0112222222222110
0112222222222110
0111100000011110
011111LLLL111110
0D1D199133166110
0111111111111110
0000000000000000`],
  [ orangePortal, bitmap`
9999999999999999
9090003333000909
9909000990009099
9090909999090909
9909099229909099
9090992222990909
9009922222299009
9309922222299039
9300992222990039
9009099229909009
9090909999090909
9909090990909099
9090900000090909
9909000000009099
9090003333000909
9999999999999999`],
  [ pinkPortal, bitmap`
8888888888888888
8808000000008088
8020200000020208
8808080880808088
8020808228080208
8008088HH8808008
800082H88H280008
800082H88H280008
8000088HH8800008
8000808228080008
8008080880808008
8020808008080208
8808080000808088
8020200000020208
8808000000008088
8888888888888888`],
  [ key, bitmap`
0000000000000000
0000066666600000
0000666666660000
0006600000066000
0066000000006600
0066000000006600
0006666666666000
0000666660000000
0000000660000000
0000066660000000
0000066660000000
0000000660000000
0000000660000000
0000666660000000
0000666660000000
0000000000000000`],
  [ lock, bitmap`
................
.00000000000000.
.00000000000000.
.00000000000000.
.00000666660000.
.00006000006000.
.00006000006000.
.00006666666000.
.00006600066000.
.00006660666000.
.00006666666000.
.00006666666000.
.00000000000000.
.00000000000000.
.00000000000000.
................`],
  [ floor,bitmap`
0000000440000000
0000000440000000
0000000440000000
0000000000000000
0000000000000000
0000000440000000
0000000440000000
0000000440000000
0000000440000000
0000000000000000
0000000000000000
0000000440000000
0000000440000000
0000000440000000
0000000440000000
0000000000000000`],
  [ box, bitmap`
LLLLLLLLLLLLLLLL
LL11111L111111LL
L1L11111L1111L1L
LL1LL11L111LL1LL
L1LL1L1LL1L1LL1L
L111L1LLLL1L111L
L1111LL66LL1111L
L1L1LL6666LL1L1L
LL1L1LL66LL1L1LL
L111L1LLLL1L111L
L11L1L1LL1L1L11L
L1L1L111L11L1L1L
LL1L111L1111L1LL
L1L11111L1111L1L
LL11111L111111LL
LLLLLLLLLLLLLLLL`],
  [ creditCard, bitmap`
................
................
................
.00000000000000.
0CCCCCCCCCCCCCC0
0000000000000000
0000000000000000
0CCCCCCCCCCCCCC0
0C6CCC2222222CC0
0CCCCCCCCCCCCCC0
0CCCCCCHC88CC7C0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
.00000000000000.
................
................`],
  [ hacker, bitmap `
0008888888800000
0008888888800000
0008888888800000
0008888888800000
0008888888800000
0008888888800000
0000008800000000
0000008800000000
0000888888000000
00088088088CCC00
00000088000C0C00
0000008800CCCCC0
0000008800CCDDC0
0000088880CCDCC0
0000080080CDDCC0
0000880088CCCCC0`],
  [ bank, bitmap`
2222222222222222
0000024442200000
0000224224220000
0002224224222000
0022224442222200
0222224224222220
1112224224222111
2211114441111122
7212222222222127
7212222222222127
7212222222222127
7212LLLLLLLL2127
7212L22LL22L2127
7212L22LL22L2127
2212L26LL26L2122
2212L22LL22L2122`],
  [ computer, bitmap`
000000000000000L
044444333444444L
044443363344444L
044433363334444L
044333333333444L
043333363333344L
043333333333344L
044444444444444L
0444444LL444444L
000000000000000L
0222222222222220
0072727272727270
.022222222222220
.072727272727270
.022225555222220
.000000000000000`],
  [ floor2, bitmap`
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
  [ fakeMoney, bitmap`
2222222222222222
2622222222262262
2222226222222222
2222222222222222
DDDDDDDDDDDDDDDD
D44DDD8888DDD44D
D4DDD888888DDD4D
DDDDD808808DDDDD
DDDDD888888DDDDD
D44DDDDDDDDDD44D
DDDDDDDDDDDDDDDD
2222222222622222
6222222222222222
2226222622222222
2222222222226222
2222222222222222`],
  [ anotherBackground, bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  [arrow, bitmap`
0000003333000000
0000003333000000
0000003333000000
0000003333000000
0000003333000000
0000003333000000
0000003333000000
0000003333000000
0000000000000000
0003333333333000
0003333333333000
0000333333330000
0000033333300000
0000003333000000
0000000330000000
0000000000000000`],
  [arrow2, bitmap`
0000000000000000
0000000000000000
0000000003000000
0000000003300000
0000000003330000
3333333303333000
3333333303333300
3333333303333300
3333333303333000
0000000003330000
0000000003300000
0000000003000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  
  
  
 
);

//const currentLevel = levels[level];
//setMap(currentLevel);


setSolids([ player,box,wall,lock,creditCard,hacker,bank,computer,fakeMoney, anotherBackground, floor2]);

setBackground("f");


let level = 0
const levels = [
  map`
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
  map`
araaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaa
aiaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaa
akaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaa
alaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaa
auduaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaa
apaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaa
agaaaaaaaaaaaaaaaaaaaaaaaaaa
agaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
  map`
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`,
  map`
.a...aa...www...ww.....w..g
a..a..aa..d...w..wwwwwww..w
..aaa..add..www...www.ww.ww
ka..au....u.wwwc....wuauuuw
a..m..u...cww.wwwwwuwau...w
.u.....a...a..w...wuwu.u.uw
u.uauuae....i.....w.w.....w
au.uuaualaamhbhmww..wu.uwuw
uau..u.eu.uw...www..w.a.u.w
a..uua.e.uaw.p.ww..wwu.u.uw
u.u..u.auauwr..ww.wuw.u.u.w
au.uu.ueauamhwhmwmwu.u.uuuw
u.u.au.eu.uu..u.wywau.u.w.w
au.uu..u.uu.uu.uwwwu.u.uwuw
u.ua.u..uaau..u.u.u.u.aau.w
.uetuauu.uu.ut.u.u.uwu.uw.w
a.u..uaau.auaaaaaaacwlw...w
.u.uu.uu.u.ddddu.......wwww
k.u..u..u.u..u...w.w...ww..`,
  map`
wpu.w...wwwww.ww...............w.w.w.y
wu..m.h.wi..w.www.wwwwwwwwwww..w.w.w.w
b.h.....w..kw.www.wwwwwww...w..w.w.w.w
.....wwwwwwww.w.w...........w..w.w.w.w
..r..l..m.....w.wwwwwwwww...w..w.w.w.w
.....ww....mw.w.........www.w..w.w.w.w
wwwuwuw.hwwwwwww.....wwww.w.w..w.w.w.w
k...whw.l.....l.ww..w....w..eu.w.w.w.w
....w.u..w..www...ww..ww....eu.w.w.w.w
wwwmwwwwwwuww.www....ww.wwwueu.w.w.w.w
u.............w..wwwww..www.w..w.w.w.w
.muwwwwwww.ww.w.........w.w.w..w.w.w.w
......m..w.w..w.ww.wwwwww...w..w.w.w.w
k..u...b......w.w...........waaw.w.w.w
wwwwwwwwwwwwwww.dawwwwwwwwwwwddd.www.w
.....................................w
u.uuu.u.uu.u.u.uwwwwwwwwwwwwwwwwwwwwaa
.u...u.u..u.u.uw...w...w...ww..uuwwww.
u.uuu.u.uu.u.u.w.w.w.w.w.w.w.uu..wwww.
.u.u.u.u.u.u.u.w.w.w.w.w.w.wu....wwww.
u.u...u...uuu.uw.w.w.w.w.w.wuuuuul...g
.uu....u.u.u.u.w.w.w.w.w.w.w.u...wwwww
u.uuu.u.u.uuu.uw.w.w.w.w.w.wu.u..wwww.
.u.u.u.u.u.u.u.w.w.w.w.w.w.w.u.u...u..
..u.u.u.u.u.u.u..w.w.w.w.w...uu.uu.u..
k.uu.u.u..u..u...w...w...w.w..u...u.u.`,
 
  
];


setMap(levels[level])

setPushables({
  [player]: [floor2],
  [player]: [box],
  [box]: [ box ]
  
});


onInput("w", () => {
  getFirst(player).y -= 1;
  if (onInput['w']) {
    playTune(melody, 1);
  }
});


onInput("a", () => {
  getFirst(player).x -= 1;
  if (onInput['a']) {
    playTune(melody, 1);
  }
});


onInput("s", () => {
  getFirst(player).y += 1;
  if (onInput['s']) {
    playTune(melody, 1);
  }
});


onInput("d", () => {
  getFirst(player).x += 1;
  if (onInput['d']) {
    playTune(melody, 1);
  }
});

onInput("j", () => {
const currentLevel = levels[level]; 

  
  if (levels[level]=1) {
  
    clearText("");
    addText("Portal 1", { y: 0, color: color`9` });
    addText("Portal 2", { y: 2, color: color`8` });
    addText("Key for lock", { y: 4, color: color`6` });
    addText("The lock", { y: 6, color: color`F` });
    addText("a Pushbox", { y: 8, color: color`0` });
    addText("Mr. Bob", { y: 10, color: color`7` });
    addText("Money/Goal", { y: 12, color: color`4` });
    addText("Click the key I to", { y: 14, color: color`2` });
    addText("continue", { y: 15, color: color`2` });
    
    setMap(levels[1]);
  }
});

onInput("i", () => {
const currentLevel = levels[level]; 

  
  if (levels[level]=2) {
     clearText("");
     addText("Mr.Bob was on a ", { y: 0, color: color`6` });
     addText("vacation until ", { y: 1, color: color`6` });
     addText("his employees ", { y: 2, color: color`6` });
     addText("from the bank told", { y: 3, color: color`6` });
     addText("him that his bank ", { y: 4, color: color`6` });
     addText("account was hacked.", { y: 5, color: color`6` });
     addText("He was very sad,so", { y: 6, color: color`6` });
     addText("he went on a mission", { y: 7, color: color`6` });
     addText("to find & collect", { y: 8, color: color`6` });
     addText("all his money back.", { y: 9, color: color`6` });
     addText("Help Mr.Bob get", { y: 10, color: color`6` });
     addText("his money back,so", { y: 11, color: color`6` });
     addText("he can be happy.", { y: 12, color: color`6` });
     addText("Click they key K to", { y: 14, color: color`2` });
     addText("continue", { y: 15, color: color`2` });
     
    
    setMap(levels[2]);
  }
});


onInput("k", () => {
const currentLevel = levels[level]; 

  
  if (levels[level]=3) {
    clearText("");
    setMap(levels[3]);
  }
});



afterInput(() => {
  const goalsS = tilesWith(player, goal); 

        
    if (goalsS. length >= 1){
      level = level + 4;

        
        if (level < levels.length) {
            setMap(levels[level]);
        } else {
            //setMap(levels[5]);
            addText("YOU WIN!", { y: 7, color: color`2` });
        }

        
    }
});





afterInput(() => {
  const orangePortal1 = tilesWith(player, orangePortal);
  const pinkPortal2 = tilesWith(player, pinkPortal);
  
  //allows player teleport
  if (orangePortal1.length >= 1) {
    const pp = getFirst(pinkPortal);
    const pl = getFirst(player);

    
    pl.x = pp.x;
    pl.y = pp.y;
  }

  
  if (pinkPortal2.length >= 1) {
    const op = getFirst(orangePortal);
    const pl = getFirst(player);

    
    pl.x = op.x;
    pl.y = op.y;
  }
  
  
    
});






//third afterinput for keys and locks
afterInput(() => {
  const goals = tilesWith(player, goal); 
  const keyAndLock = tilesWith(player, key); 


if (goals.length >= 1) {

level = level + 1;

  const currentLevel = levels[level];

    
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      
    }
}


if (keyAndLock.length >= 1) {
getFirst(lock).remove();
getFirst(key).remove();
}

});
