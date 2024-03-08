/*
@title: 
@author: 
@tags: []
@img: ""
@addedOn: 2024-00-00

How To Play:
Use the keys I: to jump, A: to move left, and D: to move right to help Richard Hendricks
collect his friends: Erlich, Jared, Gilfoyle, Dinesh, and Monica, before he begins to 
present at TechCrunch Disrupt! Be sure to avoid falling into the green lava of bugs!

Press J to restart on the currentlevel you are on!

*/
let collectedCharacters = [];

function richardDied() {
  try {
    if (tilesWith(player, codeBug).length == 1) {
      getFirst(player).remove();
      
      const erlichCollected = collectedCharacters.includes(erlich);
      const jaredCollected = collectedCharacters.includes(jared);
      const gilfoyleCollected = collectedCharacters.includes(gilfoyle);
      const dineshCollected = collectedCharacters.includes(dinesh);
      const monicaCollected = collectedCharacters.includes(monica);
      setTimeout(() => {
        setMap(levels[level]);
        if (erlichCollected) {
          clearTile(17, 3);
        }
        if (jaredCollected) {
          clearTile(22, 5);
        }
        if (gilfoyleCollected) {
          clearTile(0, 8);
        }
        if (dineshCollected) {
          clearTile(11, 1);
        }
        if (monicaCollected) {
          clearTile(0, 4);
        }
      }, 50);
    }
  } catch (error) {
    console.error("error in richardDied:", error);
  }
}

function collectCharacter(character, collectedArray, xPosition) {
  collectedArray.push(character);
  getFirst(character.char).remove();
  addText(`>${character.name} collected!`, { x: 0, y: 15, color: `2` });
  addSprite(xPosition, 0, character.char);
  setTimeout(() => {
    clearText();
    setUp();
  }, 1000);
}

function erlichCollect() {
  if (tilesWith(player, erlich.char).length == 1) {
    collectCharacter(erlich, collectedCharacters, 0);
  }
}
function jaredCollect() {
  if (tilesWith(player, jared.char).length == 1) {
    collectCharacter(jared, collectedCharacters, 1);
  }
}
function gilfoyleCollect()  {
  if (tilesWith(player, gilfoyle.char).length == 1) {
    collectCharacter(gilfoyle, collectedCharacters, 2);
  }
}
function dineshCollect() {
  if (tilesWith(player, dinesh.char).length == 1) {
    collectCharacter(dinesh, collectedCharacters, 3);
  }
}
function monicaCollect() {
  if (tilesWith(player, monica.char).length == 1) {
    collectCharacter(monica, collectedCharacters, 4);
  }
}
function displayCollectedCharacters() {
  // Display collected characters at the top
  collectedCharacters.forEach((character, index) => {
    addSprite(index, 0, character.char);
  });
}


function fall(char) {
  richardDied(level)
  const block_under_player = getTile(getFirst(char).x, getFirst(char).y + 1)
  
  if (block_under_player.length < 1) {
    setTimeout(() => {getFirst(char).y += 1;}, 100)
    setTimeout(() => {fall(char)}, 100)
  }
}



const siliconValley = tune `
333.3333333333333: C4-333.3333333333333 + E4^333.3333333333333,
333.3333333333333: C4-333.3333333333333 + E4^333.3333333333333,
333.3333333333333: E4^333.3333333333333 + G4^333.3333333333333 + C5-333.3333333333333,
333.3333333333333: A4-333.3333333333333 + F4^333.3333333333333,
333.3333333333333: C4-333.3333333333333 + E4^333.3333333333333,
333.3333333333333: C4-333.3333333333333 + E4^333.3333333333333,
333.3333333333333: G4^333.3333333333333 + E4^333.3333333333333 + C5-333.3333333333333,
333.3333333333333: G4-333.3333333333333 + C4^333.3333333333333 + E4^333.3333333333333,
333.3333333333333: C4-333.3333333333333 + E4^333.3333333333333,
333.3333333333333: C4-333.3333333333333 + E4^333.3333333333333,
333.3333333333333: E4^333.3333333333333 + G4^333.3333333333333 + C5-333.3333333333333,
333.3333333333333: F4-333.3333333333333 + C4^333.3333333333333,
333.3333333333333: C4-333.3333333333333 + E4^333.3333333333333,
333.3333333333333: C4-333.3333333333333 + E4^333.3333333333333,
333.3333333333333: E4^333.3333333333333 + G4^333.3333333333333 + C5-333.3333333333333,
333.3333333333333: F4^333.3333333333333 + A4-333.3333333333333 + D4^333.3333333333333,
333.3333333333333: G4^333.3333333333333 + C5^333.3333333333333 + E5-333.3333333333333,
333.3333333333333: C4-333.3333333333333 + E4^333.3333333333333,
333.3333333333333: C4-333.3333333333333 + E4^333.3333333333333,
333.3333333333333: E4^333.3333333333333 + G4^333.3333333333333 + C5-333.3333333333333,
333.3333333333333: E4^333.3333333333333 + G4-333.3333333333333,
333.3333333333333: F4-333.3333333333333 + C4^333.3333333333333,
333.3333333333333: C4^333.3333333333333 + F4~333.3333333333333,
333.3333333333333: D4^333.3333333333333,
333.3333333333333: D4^333.3333333333333 + F4~333.3333333333333,
333.3333333333333: D4^333.3333333333333,
333.3333333333333: D4^333.3333333333333 + F4~333.3333333333333,
333.3333333333333: D4^333.3333333333333,
333.3333333333333: D4^333.3333333333333 + G4^333.3333333333333 + C5-333.3333333333333,
1000`
playTune(siliconValley)


// COLLECTED CHARACTERS OBJECTS
const erlich = {
  name: 'Erlich',
  char: "1",
  bitmap: bitmap`
................
......FFFFF.....
......F666F.....
......F666F.....
......F6F6F.....
.....0033300....
.....0003000....
.....0003000....
.....0000000....
.....0000000....
.....6000006....
......33.33.....
......33.33.....
......33.33.....
......33.33.....
......LL.LL.....`,
  x: 7,
  y: 9,
};
const jared = {
  name: 'Jared',
  char: "2",
  bitmap: bitmap `
................
.......CCC......
.......C6C......
.......666......
.......666......
.....FDD6DDF....
.....FDDFDDF....
.....FDDFDDF....
.....FDDFDDF....
.....FDDFDDF....
.....6DDFDD6....
......CC.CC.....
......CC.CC.....
......CC.CC.....
......CC.CC.....
......00.00.....`
};
const gilfoyle = {
  name: 'Gilfoyle',
  char: "3",
  bitmap: bitmap `
................
......CCCC......
......C66CC.....
......C666C.....
......CCCCC.....
.....3311133....
.....3311133....
.....3311133....
.....3311133....
.....3311133....
.....6311136....
......30.03.....
......00.00.....
......00.00.....
......00.00.....
......CC.CC.....`
};
const dinesh = {
  name: 'Dinesh',
  char: "4",
  bitmap: bitmap `
................
.......000......
.......060......
.......666......
.......666......
.....D5FFF5D....
.....5DDFDD5....
.....D55555D....
.....5DDDDD5....
.....D55555D....
.....6DDDDD6....
......33.33.....
......33.33.....
......33.33.....
......33.33.....
......CC.CC.....`
};
const monica = {
  name: 'Monica',
  char: "5",
  bitmap: bitmap `
................
.......CCC......
......CC6CC.....
......C666C.....
......C666C.....
.....0C00CC0....
.....00C0C00....
.....0000000....
.....6000006....
.....6LLLLL6....
.....6LLLLL6....
......LLL0L.....
......LLL0L.....
......66.66.....
......66.66.....
......00.00.....`
};

const player = "p"
const erlichBag = "a"
const jaredBag = "b"
const gilfoyleBag = "c"
const dineshBag = "d"
const monicaBag = "e"
const macbook = "6"
const code = "7"
const codea = "8"
const codeb = "9"
const codec = "v"
const coded = "w"
const codee = "x"
const codef = "y"
const black = "f"
const darkGrey = "g"
const lightGrey = "h"
const white = "i"
const red = "j"
const brown = "k"
const cyan = "s"
const blue = "m"
const yellow = "n"
const darkYellow = "o"
const neonGreen = "q"
const green = "r"
const pink = "l"
const purple = "t"
const orange = "u"
const codeBug = "/"
const goal = "0"

setLegend(
  [ player, bitmap`
.......CCC......
......CCCCC.....
......CC66C.....
......C666......
......36663.....
.....3326233....
.....3322233....
.....3322233....
.....3322233....
.....3322233....
.....6F22236....
......FF.FF.....
......FF.FF.....
......FF.FF.....
......FF.FF.....
......55.55.....` ],
  [erlich.char, erlich.bitmap],
  [jared.char, jared.bitmap],
  [gilfoyle.char, gilfoyle.bitmap],
  [dinesh.char, dinesh.bitmap],
  [monica.char, monica.bitmap],
  [ erlichBag, bitmap `
................
......00000.....
......00000.....
......00000.....
......00000.....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
......00.00.....
......00.00.....
......00.00.....
......00.00.....
......00.00.....`],
  [ jaredBag, bitmap `
................
.......000......
.......000......
.......000......
.......000......
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
......00.00.....
......00.00.....
......00.00.....
......00.00.....
......00.00.....`],
  [ gilfoyleBag, bitmap `
................
......0000......
......00000.....
......00000.....
......00000.....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
......00.00.....
......00.00.....
......00.00.....
......00.00.....
......00.00.....`],
  [ dineshBag, bitmap `
................
.......000......
.......000......
.......000......
.......000......
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
......00.00.....
......00.00.....
......00.00.....
......00.00.....
......00.00.....`],
  [ monicaBag, bitmap `
................
.......000......
......00000.....
......00000.....
......00000.....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
.....0000000....
......00000.....
......00000.....
......00.00.....
......00.00.....
......00.00.....`],
  [ macbook, bitmap `
...000100011....
FF.6001006.CCC..
6F..LL.LL.CCCCC.
66..LLFFF.C666C.
6333LFF6FFC666C.
3333LF666FC767C7
3333CF666F777777
33338FF6FF877777
33338FF8FF87777F
333688888887777F
.11.8888888LLLLF
.11.8888888LLLLF
.11.6555556LLLLF
.11..55.55LLLLL6
.00..55.5566.66.
..CCC55.5500.00.`],
  [ code, bitmap `
.CC6CC5.55...CC.
.C666C0.00..CC6C
..666...FFF.C66C
DDD4DDD.F66.CCCC
DDD4DDD.666LLLLL
DDDDDDDH666HLLLL
00DDDDDHH6HHHLLL
66DDDDDHHHHHHLLL
66DD99999HHHHLLL
688899999HHHHLLL
HHHH96669HHHH.00
8888C666HHHH6.00
HHH0011100CC0.00
8880001000CC0.00
HHH0001000CC1.11
.LL0001000CC....`],
  [ codea, bitmap `
....LL.CCC1CCC..
....LL.CCC1CCC.F
....00.CCC1CCC.F
.......6000006.6
00000...00000333
00600...00060333
06660...66.66333
06660...66.66333
FF6FFF..FF.FF333
FFFFFFCCCCC..633
FFFFFFC666C...11
FFFFFF.666....11
FFFFFF.6C6....11
FFFFF6477744..11
00.004447444..00
00.CCC444444....`],
  [ codeb, bitmap `
00.6664444000...
00.66644400600..
19911199406660..
.9991999.1666...
L99999995556555.
L9999FFF9999999.
L999966655555550
L6999FFF99999996
L.C000H055555556
6.C000H069999888
..C000H00FFF0HHH
..C000H0FF6FF888
..L000H0F666FHHH
...600H0F666F888
....LLLCCC1CC6HH
....LL.CCC1CCCLL`],
  [ codec, bitmap `
...0001000......
FF.6001006.CCC..
6F..LL.LL.CCCCC.
66..LLFFF.C666C.
6333LFF6FFC666C.
3333LF666FC767C7
3333CF666F777777
33338FF6FF877777
33338FF8FF877777
3336888888877777
.11.8888888LLLL6
.11.8888888LLLL.
.11.6555556LLLL.
.11..55.55LLLLL.
.00..55.5566.66.
.....55.5500.00.`],
  [ coded, bitmap `
.....55.55...CC.
.....00.00..CC6C
............C66C
............CCCC
..........LLLLLL
..........LLLLLL
00........LLLLLL
66........LLLLLL
66..99999.LLLLLL
688899999.6LLLLL
HHHH96669..00.00
8888.666...00.00
HHH0011100.00.00
8880001000.00.00
HHH0001000.11.11
.LL0001000......`],
  [ codee, bitmap `
................
...............F
...............F
...............6
.............333
.............333
.............333
.............333
.............333
......CCCCC..633
......C666C...11
.......666....11
.......6C6....11
.....4477744..11
.....4447444..00
.....4444444....`],
  [ codef, bitmap `
.....44444000...
.....444400600..
.....644406660..
......11.1666...
L.....115556555.
L.....119999999.
L.....1155555550
L.....0099999996
L.......55555556
6.......69999888
.........00.0HHH
.........00.0888
.........00.0HHH
.........00.0888
.........CC.C6HH
..............LL`],
  [ black, bitmap `
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
  [ darkGrey, bitmap `
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
  [ lightGrey, bitmap `
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
  [ white, bitmap `
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
  [ red, bitmap `
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
  [ brown, bitmap `
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [ cyan, bitmap `
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
  [ blue, bitmap `
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555
5555555555555555`],
  [ yellow, bitmap `
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [ darkYellow, bitmap `
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
  [ neonGreen, bitmap `
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
4444444444444444`],
  [ green, bitmap `
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
DDDDDDDDDDDDDDDD`],
  [ pink, bitmap `
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888
8888888888888888`],
  [ purple, bitmap `
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH
HHHHHHHHHHHHHHHH`],
  [ orange, bitmap `
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`],
  [ codeBug, bitmap `
................
................
................
................
................
................
................
................
................
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444`],
  [ goal, bitmap `
..CCCCCCCCCCCC..
..CCCCC22CCCCC..
..CCCC2222CCCC..
..CCC222222CCC..
..CCC222222CCC..
..CCC222222CCC..
..CCCCCCCCCCCC..
..CCCCCCCCCC0C..
..CCCCCCCCCC0C..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..
..CCCCCCCCCCCC..`]
)

let level = 0
const levels = [
  map`
rrrrrhhhhhggggggsshhggggggghhhhhhhhhhkhsishsiiishsiisiiiiishhhhhkhhgghhhhggghhgggggggghhhhhhhhhhgghh
fgggghssshhgfggghhsgggghhhhhhhhhhhsshsiiiiiisishhhsiiiiissiihhhhkhkggghgggggggghggghhhhhhhhhhhggghhh
gggggggghhhgggggggggggghhhhhggggkhhsshiiiiiiiiiiisiiiishiiiiihhhkhgggggggggghhgghhhhhhhhhhhhhhhhhhhh
ggggghhgggggggghhggghgggghhgggghhhhhhsssisiiiissiiiihhhsiiiiiihhgkgggggggggghhhhhhhhhhhhhhhhhhhhghhh
hhhghihgggghgggghhhhggghgggghhhkkkkkksshhsisishhsshhhhhiiiiiishkkggggggggggghnnhghhhhhhghhhhhhhhhhgg
hhghsggghgggghhgghhggghhhhhhhgghhkkkkhiuuhhsisshhhhhhhhssshhhhhhkggggggggggghnnhnhhhhgghhhhhhhhhhhhh
ggghshhhhhhgggghkkhgghhhhhhggghhhhkkksiiuuuuhshishhhhhgsiihhhhhhggggghhggghhhhnnnnhhnghhhhhhhhhhhhhg
ghghihhhggghhgfkkkgggghhhgghhhggkkkkghsiiisushhhhhhhhhghiihhhshggggggghhhhghhhhnnnnhhhgghhhhhgghghgg
gghhhgfggghhhhhhkkgghgggghhhggggffkgfsihsiiisihhhhhhhgghisshhrrrrggggrrrriisgggghhnnnhggggggfggggggg
ishggggghsiihhhhhkgggggggggggghgfgffgkiiihhiiihhhhgghghssishhrrrrrrrrrrrrhhhggggghhnnggggggggggggfff
hhhghhhssshsissshsggghgggggghggggghhkhhhiiihhihhhhhhgggsssiiishrrrrrrrrhhhhhhggggggggggghhgggggfffff
hghhssshhshhsishghghhrgggghhgggghiissshhhhiihhhishggggghhiiiiiiihrrgrhhhhhhhhgffggggggggghgggfffffff
hishshhhhsssshgffghhrrrqgggghgggghshssssshshiishhggggghiihhiiiiiiihhhhhhhhggggffffggggggfggffffggggg
ghishhsssshhishghsiiihrrrrrggghhggghsgjkhsishhhihhggggghsiiisiiiiihhhhhhggggghhshfffggffffffffgggggg
gghishhhkgghsssshshhhihgfrrrrrgghhgjjjjjjjhsishhhggggghihhsiiisiiishhggggghhhhisishfffffffffggghgggg
hgggggfggghhsshhhsssiihgfqqrrrrggghjjjggjjgghhsshghhhhhhiihhsiiisigggghhhhssiiiiisihhggfggggffhhgggg
ggfggfgghiihhshsssishkgggrqfrfggjjggjjjjggjjjjhsihhhiiihhhiishhiiiggghhhsiihiiissiiiiihgggfggfhhgggg
gggffhiihhmmhhsishkggggfqrfjjggijjjjjjjgjjjjjhjjhhshhhiiiihhiihhhihghsiiiiihiiiiiiiisiihggggggfhsihh
shghiihmmmmmhhhgggggggfrrjjjggghihjjjhgjjjjhhjjjjghsihhhhsishhiihhgghsiiiishhhhhhiishhhiihggghsssssh
siihmmmmimmmggfggggrrrrrjjgggjjgghhhhhjjjjhjjjjjjgggghsshhhhhshhsihghissiiisiiiissiiihhhhihhsiiisiii
hmmmmmmmiimmfffgggqrrrrjjggjjjjjhggghhgjjgjjjjggggggjjjhishgggsshhgghsiihsiisssiisssiiihhhiissiiiiss
mmmmmigiiimmfgggrrqqrrjjjjjjjjhhjjjjjhhhhjjjjgggggjjjjjgkhshggghssgghishiissiiiisiisshshhhsisiiiisii
mmmiiiiigmmmggfrrrrrrijjjjjhhjjjjjgjjhhghhjjjjjgjjjjjhgjjjjjhgggghgfhhsishiishiiishiihiishsiiiiiiihh
mimiigimmmmfgfrrqqrrghhjjghjjjjjgggjjggjjghhjjjjjjjjjjjjjjjjjhhhgggghishhishsishiiiiiiisiiiiiiiiihhg
iiigimmmfgffrrrrqrrfghhhggjjjjjjgjjjjgjjjghhhhghjjjhjjjjggjjjnshhhhhhhhsshsishsiihiisiississiiiiihgg
immmmmmmgghgrrrqrrffghhhghhjjggjjjjjgjjjgggggghghhhgjjjgghnjjjjjjjgggishhsshhishihihsiississiihhhggg
mmmghhghhhhqrrrqrgfghhhhghhhggjjjjhgjjjjhggjjjgggigjjjjjjgjjjjjgjjjkggghhhhsihhiihhhshsssissishggggg
mgghhhhhgggqrrrgghhghhhhghhhgghjjhjjjjghggjjjjggghhihjjjjjjjjggjjjjgkkkkgghhhsihhihhshississishggggg
hggggggrrrrrrgggkggfghhhghhhgghhhhjjjjjggjjjjgggggggggggjjjjggjjjjgjjjjgkgggsshhihshsiiiisssishggggg
grrrrrqqqrrgghgggggfhhhhghhhgghhhhihjjjgjjjjhhggggjjjgghijjjjjjggjjjjjggkkkgghhhhhshisssssisishggggg
rqrrqqrrrgghgggggssggohhghhhgghhhhiihhgjjjjggggggjjjjjjjiihgggggjjjgjjgjjjkgggggghhhhsihhsisiihggggg
rqrrrrrrhhggffghuusshooohhhhgghhhhhhhhiijjjjgggjjjjjgjjjgjjgggjjjggjjgjjjjkkffgggghssshhishsishhhggg
rrrrrgghhgffgghuiiussssooohhgghhhhhhhhiiihjjjjjjjjjjjghgjjjgghhgggjjjjjkkgggggffgggghhihhsishshhssih
qrrghghgggggggsuiiusssssoooogghhhhhhhhiiiiihjjjjjgjjggggjjjggggghjjjjkkgggggfggfffggghhhsshhiihishhi
gggggggggggghhssuussssssshoooohhhhhhhhiiiiihiijjjjghgggjjjjjjjjghhjjjgggggfgffgggggfgghihhshsihshhhh
hhgffgghgghhhgmssssssssssshoooohhhhhhhiiiiihiiiijjjgggjjjjjjjjjggggggggggggggfffgggggghhhisshhhshhhs
gfffgggghhhghgijnsssssssssghoooooohhhhiiiiihiiiiijjgjjjjjgggghhhgfggggggfggffgfffgggffghhihhhhiishsh
gggggghhgggghhiiiqjsssssssgrrrrooooooohiiiihiiiihhghjjjggggghhhhgfggggfggfggfggffgggfffghhhhhhhhhhhg
hgghhhgqgrrrrriiiiiiisssssgqrrrffooooohiiihhiiiihgghhjjggggggggggfgggggfgfffffgfffggfffgfghhhhhhgggf
gghsrrqrrqrrrqriiiiiiisssgrqqrqrgrroooohiihhiiiihgghhhgggggggggggfggfggffgffffgffgrrfffrgffghhhhgggg
ghsgqqrrqrrrrrrrhiiiiiigrqrrrrrrrhhrooooohhhiihhggghhhgggggggggggffggfgfffffffgfgffgfrrrrrfghhihgggg
hihfqrrrrrrrrrhhshhhhhhhrrfiiiiigggggroooohhihfffffghhgggggggggggfffgfffffffffgfgffffrrfrfrghghhhggg
hhhggrrrrrqqrrhhhhhhhhhhggiiiissifghgrroooohhfffffffghggttttgffgffffffffffggfgffffggfrrfffrrhhhggggg
hhhhhhihrrrrrhhhhhhshhggggissssiihhhffrrrooofffggffffggttttttgggffffffffffggggffffffffrrffrrhhhhhggg
ffgfhhkhihrrhhhhhhhhkkggghiisssiigfffrhhhhooffggggfffgttttttttggfffffffffffgrgffffffrrrrrrrrhhhhhggg
hfffhjjjhsshkhhhhskhhkgghhhiisiihfggrhhhhgghffhihgffffttttttttggffhgfffffgrrrfffffrrffffrrhhhhhhhggg
hhhffjijjhhhghhhhskkhhhhhgghiiishghhhhhhhgghgfihhhffffttttttttgfggggffgggfgrgfffffrrfrffffhhsshhgfgg
hhhhhjjiijhhgghhhskhhhhggggghhhgggfhhhhhhggggfhihgffffitttttttgfgggggggggggghghhgggrrrffffgkhssshhhs
hhsishjjjjhhhhjgkshshgggghhhhggggggfhhgggggggfffffffffilliittgggggggghhhhhhhsshhhhhhhhggfggfgghsgsii
ghhhssssshshhqgffhhskggghhhgggggggffghgggggfffffffffggtiiittgfgghsiishhhhhhhhhhhsiiisshhrgggfgghgsih
ggghhhssihhnmgfffgkhkggggggggfggfgffghgggfffffffffgggfftiitgfghsshhgggggggghghhghhsssiiihhhhgggggghg
ggggghhhhmjffgffghshhkgggfffgfffffgffgfffffffffffgfffffgttffhhhgggggggrrrggggrgrhhhhssiiishhhggrgggg
ggggggghgfffffffghhkhhggfffffffggffgffffffffffgggffffffgtfghhhggggrrggrrrrrrrrrghggghssiiiihhhhggggg
ggggggggggffffffghhhkkgggfffffgggffffffffggggffggfffffghggshggggrrrrgrrrhhhgrrrrgrgggghhsiiiihhhghhh
ghhggggggfffffffgghkkkggfffggfgffffgfffffggfffgggfffgghgggigggrrrrrrrggiiiiiirhshggrrrrghhiiihhhhhhg
fghhhggggffffffgffhgkghggggggfgffffffffggfffggffffggghgghhhgggrrrrgrrhiiiiiiiiiigggrrrrrgggshhhhhhgh
....................................................................................................
....................................................................................................
....................................................................................................
....................................................................................................
....................................................................................................
....................................................................................................
....................................................................................................
....................................................................................................`, // starter screen
  map`
abcde..............
...................
...................
.p...............10
fff.............fff
ffff.ff.ff.ff.fffff
ffff.ff.ff.ff.ff...
ffff...............
.fff//.............
..fffq.............
.....q.............
/////q////.........
fffffffffq/////////
fffffffffffffffffff`, // lvl 1
  map`
abcde..................
.......................
fp...................ff
ffff.................ff
ffff.................f.
ffff.f..........f.f...2
ffff.f.f........f...fff
ffff...f.ff...f........
.fff//.f.ffff..........
..ffff....fff......f...
.....f......f..........
....0f//////////////f..
...fff..............f..
..ff................f..
f..................ff..
ff.....................
fffffff.f.f.f.fffffffff
ff/////////////////////
fffffffffffffffffffffff`, // lvl 2
  map`
abcde..................
......................0
....................fff
...................f...
..................ff...
..............f........
.....ff.ff.f.ff.f......
....fff................
3......................
fff....................
q.fff..................
q.....ff...............
q........fff...........
q...........f.........p
q.............f.ffff.ff
q....................ff
qq/////////////////////
fffffffffffffffffffffff`, // lvl 3
  map`
abcde.....f...............
..........f4..............
..........fffff...........
................f.........
..................ff......
.....................f....
..........................
.......................fff
..........................
............f.........f...
...................ff.....
..........f......f........
..............ff.......ff.
........f.................
..........................
......f...............f///
..................ff...fff
....f...................0f
.p...................fffff
fff.......................
//////////////////////////`, // lvl 4
  map`
abcde.....................
..........................
..........................
..........................
5.........................
ff.......f.f.f............
...f...f......f...........
.///f.f.........ff.f......
.qqf////////////////...///
/qffqqq..............f....
ffffqqq...................
ffff.qq................f..
.....qq...................
.....qq...............f...
......q...................
.....................f////
.......f..f..f..f..f..ffff
.....f....................
p..f................ffff.0
ff.....................fff
//////qqqq////////////////`, // lvl 5
  map`
abcde.............
..................
......qqq.qq......
.......q.q........
.......q.qqq......
..................
..................
..................
..................
........p.........
ffffffffffffffffff
ffffffffffffffffff
ffffffffffffffffff
ffffffffffffffffff`, // the end!
  map`
rrrrrhhhhhggggggsshhggggggghhhhhhhhhhkhsishsiiishsiisiiiiishhhhhkhhgghhhhggghhgggggggghhhhhhhhhhgghh
fgggghssshhgfggghhsgggghhhhhhhhhhhsshsiiiiiisishhhsiiiiissiihhhhkhkggghgggggggghggghhhhhhhhhhhggghhh
gggggggghhhgggggggggggghhhhhggggkhhsshiiiiiiiiiiisiiiishiiiiihhhkhgggggggggghrgghhhhhhhhhhhhhhhhhhhh
ggggghhgggggggghhggghgggghhgggghhhhhhsssisiiiissiiiihhhsiiiiiihhgkgggggggggrhrhhhhhhhhhhhhhhhhhhghhh
hhhghihgggghgggghhhhggghgggghhhkkkkkksshhsisishhsshhhhhiiiiiishkkggggggggggrhnnhkhhhhhhghhhhhhhhhhgg
hhghsggghgggghhgghhggghhhhhhhgghhkkkkhiishhsisshhhhhhhhssshhhhhhkggggggggggrhnnhnhrrrgghhhhhhhhhhhhh
ggghshhhhhhgggghkkhgghhhhhhggghhhhkkksiihssshshishhhhhgsiihhhhhhggggghhggghhhhnnnnnnnkhhhhhhhhhhhhhg
ghghihhhggghhgfkkkgggghhhgghhhggkkkkghsiiissshhhhhhhhhghiihhhshggggggghhhhghhrrnnnnnnrgghhhhhgghghgg
gghhhgfggghhhhhhkkgghgggghhhggggffkgfsihsiiisihhhhhhhgghisshhrrrrggggrrrriisgggkrhnnnrggggggfggggggg
ishggggghsiihhhhhkgggggggggggghgfgffgkiiihhiiihhhhgghghssishhrrrrrrrrrrrrhhhggggghnnnggggggggggggfff
hhhghhhssshsissshsggghgggggghggggghhkhhhiiihhihhhhhhgggsssiiishrrrrrrrrhhhhhhggggggkgggghhgggggfffff
hghhssshhshhsishghghhrgggghhgggghiissshhhhiihhhishggggghhiiiiiiihrrgrhhhhhhhhgffggggggggghgggfffffff
hishshhhhsssshgffghhrrrrgggghgggghshssssshshiishhggggghiihhiiiiiiihhhhhhhhggggffffggggggfggffffggggg
ghishhsssshhishghsiiihffgffggghhggkhsnjkhsishhhihhggggghsiiisiiiiihhhhhhggggghhshfffggffffffffgggggg
gghishhhkgghsssshshhhihgfgggrrgkhhkjjjjjjjhsishhhggggghihhsiiisiiishhggggghhhhisishfffffffffggghgggg
hgggggfggghhsshhhsssiihgffgrrrrkkkhjjjjnjjjkhhsshghhhhhhiihhsiiisigggghhhhssiiiiisihhggfggggffhhgggg
ggfggfgghiihhshsssishkgggrrfrfkkjjjnjjjjnnjjjjhsihhhiiihhhiishhiiiggghhhsiihiiissiiiiihgggfggfhhgggg
gggffhiihhffhhsishkggggfrrfkkkknjjjjjjjjjjjjjjjjhhshhhiiiihhiihhhihghsiiiiihiiiiiiiisiihggggggfhsihh
shghiihgffffhhhgggggggffrkkjjjkhshkjjjjjjjjjjjjjjkhsihhhhsishhiihhgghsiiiishhhhhhiishhhiihggghsssssh
siihgfffggffggfgggggggfrkkjjjjkkkhhhjjjjjjjjjjjjjkkgkhsshhhhhshhsihghissiiisiiiissiiihhhhihhsiiisiii
hgffffffghgffffgggrrrrkkjjjjjjjjjkkkhhkjjjjjjjkkkkkjjjjhishgggsshhgghsiihsiisssiisssiiihhhiissiiiiss
fffgfgghhhfffgggrfrrrrkjjjjjjjjjjjjkkhhhjjjjjkkkkkjjjjjjkhshggghssgghishiissiiiisiisshshhhsisiiiisii
ffghhhhhggffggfrrrrrrkjjjjjjjjjjjjjjjjkkhhjjjjjjjjjjjjjjjjjjhgggghgfhhsishiishiiishiihiishsiiiiiiihh
ghhhhggfffffgfrgfgrfghhjjjjjjjjjjjjjjjkkkkhhjjjjjjjjjjjjjjjjjhhhgggghishhishsishiiiiiiisiiiiiiiiihhg
gghggffffgffffffffffghhhhhjjjjjjjjjjjkkjjjjhhhkkjjjjjjjjkkjjjnshhhhhhhhsshsishsiihiisiississiiiiihgg
ggffffffgghgffffffffghhhghhjjjjjjjjjjjjjjjkkkkhkkjjjjjjkkhnjjjjjjjgggishhsshhishihihsiississiihhhggg
fffghhghhhhgfffffgfghhhhghhhkkjjjjjjjjjjjkkggkkkksjjjjjjjjjjjjjjjjjkggghhhhsihhiihhhshsssissishggggg
fgghhhhhgggffffgghhghhhhghhhgksnjjjjjjjjjkkkkkjkkhhshjjjjjjjjjjjjjjjkkkkgghhhsihhihhshississishggggg
hggggggfgggffgggkggfghhhghhhggshhhjjjjjkkkjjjjjkkkgkkkkkjjjjjjjjjjjjjjjjkgggsshhihshsiiiisssishggggg
gffffffffffgghgggggfhhhhghhhgghhhhshjjkkjjjjjjkkkkkkkkkhnjjjjjjjjjjjjjjjkkkgghhhhhshisssssisishggggg
fffffffffgghggggggggghhhghhhgghhhhsshhkjjjjjkkkkkjjjjjjjnshkkjjjjjjjjjjjjjkgggggghhhhsihhsisiihggggg
fffffffghhggffghhhhhhssshhhhgghhhhhhhhssjjjjkkkjjjjjjjjjkkkkkkjjjjjjjjjjjjkkffgggghssshhishsishhhggg
ffgffgghhgffgghsshhshhsshhhhgghhhhhhhhssshjjjjjjjjjjjjhkjjjjkhhkjjjjjjjkkgggggffgggghhihhsishshhssih
ffgghghggggggghhhsiiihhhhshhgghhhhhhhhssssshjjjjjjjjkkkkjjjjkkkkhjjjjkkgggggfggfffggghhhsshhiihishhi
gggggggggggghhhhhhssshhkhshhhhhhhhhhhhssssshssjjjjkhkkkjjjjjjjkkhhhkggggggfgffgggggfgghihhshsihshhhh
hhgffgghgghhhghsshhhhhhsiihhhshhhhhhhhsssshhssssjkkgkkjjjjjjjjkkgggggggggggggfffgggggghhhisshhhshhhs
gfffgggghhhghgkhhshhhhsshhghhhhrgrrhhhsssshhssssskkkjjjjjkkkkhhhgfggggggfggffgfffgggffghhihhhhiishsh
gggggghhgggghhhhghhshhhhhhhhhhrgffgrhkhssshhsssshhkhnjjkgggghhhhgfggggfggfggfggffgggfffghhhhhhhhhhhg
hgghhhgfgfffhsssggkhsshhhhgghffffffhhhhssshhsssshkghhhhggggggggggfgggggfgfffffgfffggfffgfghhhhhhgggf
gghsrrgffrrffrssshhsshhhgggfgfffgrrrrhkhsshhsssshgghhhgggggggggggfggfggffgffffgffgrrfffrgffghhhhgggg
ghsgfffffrfffrrkhhshhhhgfggghhggrhhrrrfhhhhhsshhggghhhgggggggggggffggfgfffffffgfgffgfrrrrrfghhihgggg
hihffrrrfffff.hhshhhhhhhfffiiiihgggggrffgkssshfffffghhgggggggggggfffgfffffffffgfgffffrrfrfrghghhhggg
hhhggrrrrrrrhhhhhhhhhhshggghiiihffghgrrrrrhshfffffffghggttttgffgffffffffffggfgffffggfrrfffrrhhhggggg
ggghhhihrrrrhhhhhhhshhgggghhhmhihhhhffrrrrhhfffggffffggttttttgggffffffffffggggffffffffrrffrrhhhhhggg
gggghhkhihrrhhhhhhhhkkggghhimmhihgfffrhhhhhhffggggfffgttttttttggfffffffffffgrgffffffrrrrrrrrhhhhhggg
fgggkhnjksshkhhhhskhhkgghhhhmmiihfggrhhhhgghffhihgffffttttttttggffhgfffffgrrrfffffrrffffrrhhhhhhhggg
ffhhhhhhshhhghhhhskkhhhhhgghiiishghhhhhhhgghgfihhhffffttttttttgfggggffgggfgrgfffffrrfrffffhhsshhgfgg
ghshhhhhshhhgghhhskhhhhggggghhigggfhhhhhhggggfhihgffffsttttttgtfgggggggggggghghhgggrrrffffgkhssshhhs
hhsishhhhkhhhhhgkshshgggghhhhggggggfhhgggggggfffffffffhsssstggggggggghhhhhhhsshhhhhhhhggfggfgghsgsii
ghhhssssshshhggffhhskggghhhgggggggffghgggggfffffffffgghiishhgfgghsiishhhhhhhhhhhsiiisshhrgggfgghgsih
ggghhhssihhgggfffgkhkggggggggfggfgffghgggfffffffffgggffhshtgfghsshhgggggggghghhghhsssiiihhhhgggggghg
ggggghhhhgfffgffghshhkgggfffgfffffgffgfffffffffffgfffffgggffhhhgggggggrrrggggfgfhhhhssiiishhhggrgggg
ggggggghgfffffffghhkhhggfffffffggffgffffffffffgggffffffggfghhhggggffggrrrffffffghggghssiiiihhhhggggg
ggggggggggffffffghhhkkgggfffffgggffffffffggggffggfffffghggshggggffffgffrhhhgffffgfgggghhsiiiihhhghhh
ghhggggggfffffffgghkkkggfffggfgffffgfffffggfffgggfffgghgggigggfffffffggiiiiiighshggfrrrghhiiihhhhhhg
fghhhggggffffffgffhgkghggggggfgffffffffggfffggffffggghgghhhgggffffgffhiiiiiiiiiigggfrfffgggshhhhhhgh`,
  
]

/* makes the players a solid*/
let set = [player, erlichBag, jaredBag, gilfoyleBag, dineshBag, monicaBag, white, darkGrey, black, neonGreen]
setSolids(set)

function setUp() {
  clearText()
}

setMap(levels[level])
addText("Press 'j' to begin!", {
      x: 0,
      y: 13,
      color: color`4`
    });

setPushables({
  [ player ]: []
})

onInput("j", () => {
  if (level == 0) {
    level = level + 1;
  }
  else if (level == 6) {
    level = level - 5;
    collectedCharacters.length = 0;
    setUp();
  }
  
  const erlichCollected = collectedCharacters.includes(erlich);
  const jaredCollected = collectedCharacters.includes(jared);
  const gilfoyleCollected = collectedCharacters.includes(gilfoyle);
  const dineshCollected = collectedCharacters.includes(dinesh);
  const monicaCollected = collectedCharacters.includes(monica);
  
  clearText();
  setMap(levels[level]);
  
  if (erlichCollected) {
    clearTile(17, 3);
  }
  if (jaredCollected) {
    clearTile(22, 5);
  }
  if (gilfoyleCollected) {
    clearTile(0, 8);
  }
  if (dineshCollected) {
    clearTile(11, 1);
  }
  if (monicaCollected) {
    clearTile(0, 4);
  }
});

onInput("i", () => {
    try {
      getFirst(player).y -= 1
      setTimeout((getFirst(player).y -= 1), 8000);
      setTimeout(() => {fall(player); richardDied(level)}, 250);    
    } catch (exceptionVar) {
      console.log("not moving")
    }
});

onInput("a", () => {
  try {
    getFirst(player).x -= 1
    fall(player)
  }
  catch (exceptionVar) {
    console.log("not moving")
  }
});

onInput("d", () => {
  try {
    getFirst(player).x += 1
    setTimeout(() => {fall(player); richardDied(level)}, 100);    
  } catch (exceptionVar) {
    console.log("not moving")
  }
});

afterInput(() => {
  if (tilesWith(player,goal).length == 1) {
    setTimeout(() => {level = level + 1; setMap(levels[level]);},500)
  }
  const erlichCollected = collectedCharacters.includes(erlich);
  const jaredCollected = collectedCharacters.includes(jared);
  const gilfoyleCollected = collectedCharacters.includes(gilfoyle);
  const dineshCollected = collectedCharacters.includes(dinesh);
  const monicaCollected = collectedCharacters.includes(monica);
  
  if (level == 6) {
    if (erlichCollected && jaredCollected && gilfoyleCollected && dineshCollected && monicaCollected) {
      addSprite(7, 9, erlich.char)
      addSprite(6, 9, jared.char)
      addSprite(9, 9, gilfoyle.char)
      addSprite(10, 9, dinesh.char)
      addSprite(11, 9, monica.char)
      addText("You collected them\nall!Successful\nTechCrunch :D", { 
        x: 1,
        y: 12,
        color: color`2`
      })
    }
    else {
      addText("You didn't collect\nthem all! Failed\nTechCrunch :(", { 
        x: 1,
        y: 12,
        color: color`2`
      })
    }
  }
  richardDied();
  displayCollectedCharacters();
  
  erlichCollect();
  jaredCollect();
  gilfoyleCollect();
  dineshCollect();
  monicaCollect();
  
})
