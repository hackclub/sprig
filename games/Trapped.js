/*
@title: Trapped
@author: Lockloo50
@tags: ['escape', 'puzzle']
@addedOn: 2024-11-30
*/

/*
Controls - 
a - move left
d - move right
w - interact with doors and objects
s - exit menus and move down
j - open letter
l - pick up object
i - start game
k - mute music
*/

const player = "p"
const ePlayer = "n"
const background = "b"
const specialBackground = "y"
const eDoor = "e"
const door = "d"
const door2 = "r"
const black = "z"
const safe = "s"
const window = "w"
const key = "k"
const crowbar = "c"
const letter = "l"
const rock = "o"
const lGray = "g"
const gray = "m"
const ladder = "t"
const sLadder = "f"
const blue = "h"
const oWindow = "u"
const car = "v"

setLegend(
  [player, bitmap`
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F66611111111666F
F6F6111111116F6F
FF6F11111111F6FF
F66111111111166F
F61111111111116F
FF600000000006FF
F66099999999066F
F6F0990990990F6F
FF609909909906FF
F66099999999066F
F6F0999999990F6F
FF609999999906FF
F66000000000066F` ],
  [ePlayer, bitmap`
................
................
................
....11111111....
....11111111....
....11111111....
...1111111111...
..111111111111..
...0000000000...
...0999999990...
...0990990990...
...0990990990...
...0999999990...
...0999999990...
...0999999990...
...0000000000...` ],
  [background, bitmap`
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F666F666666F666F`],
  [specialBackground, bitmap`
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F666F666666F666F`],
  [eDoor, bitmap`
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F666LLLLLLLL666F
F6F6LLLLLLLL6F6F
FF6FLLLLLLLLF6FF
F666LLL00LLL666F
F6F6LLL00LLL6F6F
FF6FLLLLLLLLF6FF
F666LLLLLLLL666F
F6F6L00LLLLL6F6F
FF6FLLL0LLLLF6FF
F666LLLLLLLL666F
F6F6LLLLLLLL6F6F
FF6FLLLLLLLLF6FF
F666LLLLLLLL666F`],
  [door, bitmap`
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F666LLLLLLLL666F
F6F6LLLLLLLL6F6F
FF6FLLLLLLLLF6FF
F666LLL00LLL666F
F6F6LLL00LLL6F6F
FF6FLLLLLLLLF6FF
F666LLLLLLLL666F
F6F6L00LLLLL6F6F
FF6FLLL0LLLLF6FF
F666LLLLLLLL666F
F6F6LLLLLLLL6F6F
FF6FLLLLLLLLF6FF
F666LLLLLLLL666F`],
  [door2, bitmap`
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F666LLLLLLLL666F
F6F6LLLLLLLL6F6F
FF6FLLLLLLLLF6FF
F666LLL00LLL666F
F6F6LLL00LLL6F6F
FF6FLLLLLLLLF6FF
F666LLLLLLLL666F
F6F6L00LLLLL6F6F
FF6FLLL0LLLLF6FF
F666LLLLLLLL666F
F6F6LLLLLLLL6F6F
FF6FLLLLLLLLF6FF
F666LLLLLLLL666F`],
  [safe, bitmap`
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F666F666666F666F
F000000000006F6F
F00LLLLLLLLL06FF
F0L0LLLLLLLLL06F
F0LL00000000006F
F0LL0LLLL1LLL0FF
F0LL0LLL111LL06F
F0LL0LL1L1L1L06F
F0LL0L11111110FF
F0LL0LL1L1L1L06F
F0LL0LLL111LL06F
FF0L0LLLL1LLL0FF
F66000000000006F`],
  [window, bitmap`
F666F666666F666F
FCC6F66FF66F6CCF
FCCC00000000CCCF
F0CCC770077CCC0F
F07CCC7007CCC70F
F000CCC00CCC000F
F0777CCCCCC7770F
F07L77CCCC777L0F
F0LLL7CCCC777L0F
F0LLLCCCCCCL7L0F
F000CCC00CCC000F
F0LCCCL007CCCL0F
F0CCC7L007LCCC0F
FCCC00000000CCCF
FCCFF6F66F6FFCCF
F666F666666F666F`],
  [oWindow, bitmap`
F666F666666F666F
F6F6F66FF66F6F6F
F00000000000000F
F0FFFFF00FFFFF0F
F0FFFFF00FFFFF0F
F00000000000000F
F0FFFFF00FFFFF0F
F0FFFFF00FFFFF0F
F0FFFFF00FFFFF0F
F0FFFFF00FFFFF0F
F00000000000000F
F0FFFFF00FFFFF0F
F0FFFFF00FFFFF0F
F00000000000000F
FF6FF6F66F6FF6FF
F666F666666F666F`],
  [key, bitmap`
F666F666666F666F
F6F6FLLLLLLF6F6F
FF6FLLLLLLLLF6FF
F666LL6666LL666F
F6F6LL6FF6LL6F6F
FF6FLLF66FLLF6FF
F666LLLLLLLL666F
F6F6FLLLLLLF6F6F
FF6FF6FLLF6FF6FF
F666F66LL66F666F
F6F6F66LLLLF6F6F
FF6FF6FLLLLFF6FF
F666F66LL66F666F
F6F6F66LLLLF6F6F
FF6FF6FLLLLFF6FF
F666F666666F666F`],
  [crowbar, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLL000LL
LLLLLLLLLL02220L
LLLLLLLLL033020L
LLLLLLLL0330L0LL
LLLLLLL0330LLLLL
LLLLLL0330LLLLLL
LLLLL0330LLLLLLL
LLLL0330LLLLLLLL
LLL0330LLLLLLLLL
LLL030LLLLLLLLLL
LLL00LLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [letter, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLL000000LLLL
LLLLL0222220LLLL
LLLLL020020LLLLL
LLLLL022220LLLLL
LLLLL020020LLLLL
LLLLL022220LLLLL
LLLL020020LLLLLL
LLLL022220LLLLLL
LLLL020020LLLLLL
LLLL000000LLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [rock, bitmap`
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF11F
F666F666666F1111`],
  [ladder, bitmap`
F66000666600066F
F6F0006FF6000F6F
FF6F16F66F61F6FF
F66611111111666F
F6F6166FF6616F6F
FF6F11111111F6FF
F66616666661666F
F6F6111111116F6F
FF6F16F66F61F6FF
F66611111111666F
F6F6166FF6616F6F
FF6F11111111F6FF
F66616666661666F
F6F6166FF6616F6F
FF6000F66F0006FF
F66000666600066F`],
  [sLadder, bitmap`
F66000666600066F
F6F0006FF6000F6F
FF6F16F66F61F6FF
F66611111111666F
F6F6166FF6616F6F
FF6F11111111F6FF
F66616666661666F
F6F6111111116F6F
FF6F16F66F61F6FF
F66611111111666F
F6F6166FF6616F6F
FF6F11111111F6FF
F66616666661666F
F6F6166FF6616F6F
FF6000F66F0006FF
F66000666600066F`],
  [car, bitmap`
F666F666666F666F
F6F6F66FF66F6F6F
FF6FF6F66F6FF6FF
F666LLLLLLLL666F
F6FLL222012LLF6F
FFLL22220122LLFF
LLL1222201222LLF
L111111101111LLL
L1111001011001LL
L11111110111111L
L11111110111111L
L11111110111111L
LLLLLLLLLLLLLLLL
F600066FF660006F
FF0206F66F6020FF
F60006666660006F`],
  [lGray, bitmap`
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
  [gray, bitmap`
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
  [blue, bitmap`
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
0000000000000000`]
)

setSolids([player])

let level = 0
const levels = [
  map`
b........b
....b..b..
..b.n.....
......b...
b...b.....
..b...b..b
...b......
.b........
......b...
.b..b....b`,
  map`
bbbbb
bbbbb
bbbbd`,
  map`
bbbbb
bbbbb
ebdbr`,
  map`
bbbbb
bbbbb
sbrbw`,
  map`
bbbbb
bbkbb
dbybo`,
  map`
mggggggggm
gmmmmmmmmg
gmmmmmmmmg
gmmmmmmmmg
gmmlmmcmmg
gmmmmmmmmg
gmmmmmmmmg
gmmmmmmmmg
gmmmmmmmmg
mggggggggm`,
  map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........`,
  map`
utbub
btbbb
ufbub`,
  map`
tbbbb
tbbbb
tbdbv`,
  map`
..........
..........
..........
..........
..........
..........
..........
..........
..........
..........`
]

setMap(levels[level])

setPushables({
  [ player ]: []
})

var haveKey = false;
var haveCrowbar = false;
var haveRock = false;
var playMusic = true;
var kCheck = true;

const music = tune`
300: C5~300,
300: B5~300,
300: C5~300 + F5^300 + A4^300,
300,
300: C5~300 + A4^300 + F5^300,
300,
300: C5~300,
300: B5~300,
300: C5~300,
300,
300: C5~300,
300,
300: C5~300,
300: B5~300,
300: C5~300 + F5^300 + A4^300,
300,
300: C5~300 + F5^300 + A4^300,
300,
300: D5-300,
300: B4-300,
300: D5-300,
300: E5-300,
300: F5-300,
300: D5-300,
300: B4-300,
300: D5-300,
300: F5^300 + C5~300 + A4^300,
300,
300: C5~300 + F5^300 + A4^300,
300,
300: C5~300,
300`
const collectionSound = tune`
150: F5~150,
150: A5~150,
150: B5~150,
4350`
const doorSound = tune`
500: E4/500 + F4~500,
15500`
var playback = playTune(music, Infinity);

// Start Screen Text
if(level == 0){
  addText("Press i to Start", {x: 2, y: 5, color:color`0`});
  addText("Trapped", {x: 6, y: 1, color:color`9`});
  addText("  Press k to \n  Mute Music", {x: 3, y: 13, color:color`9`});
}

// Starts the game
onInput("i", () => {
  kCheck = false;
  if(level == 0){
    level = 1;
    const cLevel = levels[level];
    if (cLevel != undefined) {
      setMap(cLevel);
      clearText();
      addSprite(0, 2, player);
      addText("I was sent to\nthis apartment\nto find a wanted\nman,\nlittle did I know \nwhat would happen.", {x: 0, y: 4, color:color`0`});
    }
  }
});

let isMusicPlaying = true;

onInput("k", () => {
  kCheck = true;
  isMusicPlaying = !isMusicPlaying;
  if (isMusicPlaying) {
    playMusic = true;
  } else {
    playMusic = false;
  }
});

// Moves the player left
onInput("a", () => {
  kCheck = false;
  if(level != 0 && level != 5 && level != 6 && level != 7 && level != 9){
    getFirst(player).x -= 1;
  }
});


// Moves the player Right
onInput("d", () => {
  kCheck = false;
  if(level != 0 && level != 5 && level != 6 && level != 7 && level != 9){
    getFirst(player).x += 1;
  }
});

// Enters door
onInput("w", () => {
  kCheck = false;
  if(level == 1){
    const doorNum = tilesWith(door).length;
    const doorCovered = tilesWith(door, player).length;
  
    if(doorNum == doorCovered){
      level = 2;
      const cLevel = levels[level];
      if (cLevel != undefined) {
        setMap(cLevel);
        clearText();
        addSprite(1, 2, player);
        playTune(doorSound);
      }
    }
  }

  if (level == 2){
    const doorNum = tilesWith(door).length;
    const door2Num = tilesWith(door2).length;
    const doorCovered = tilesWith(door, player).length;
    const door2Covered = tilesWith(door2, player).length;

    if(doorNum == doorCovered){
      level = 3;
      const cLevel = levels[level];
      setMap(cLevel);
      clearText();
      addSprite(1, 2, player);
      playTune(doorSound);
    }
    else if(door2Num == door2Covered){
      level = 4;
      const cLevel = levels[level];
      setMap(cLevel);
      clearText();
      addSprite(1, 2, player);
      playTune(doorSound);
      if(haveRock == true){
        getFirst(rock).remove();
        addSprite(4, 2, background)
      }
      if(haveKey == true){
        getFirst(key).remove();
        addSprite(2, 1, background)
        addText("Key Obtained", {x: 4, y: 5, color:color`0`});
      }
    }
  }

  if(level == 3){
    const door2Num = tilesWith(door2).length;
    const door2Covered = tilesWith(door2, player).length;
    const safeNum = tilesWith(safe).length;
    const safeCovered = tilesWith(safe, player).length;
    const windowNum = tilesWith(window).length;
    const windowCovered = tilesWith(window, player).length;

    if(door2Num == door2Covered){
      level = 2;
      const cLevel = levels[level];
      setMap(cLevel);
      clearText();
      addSprite(1, 2, player);
      playTune(doorSound);
    }
    else if(safeNum == safeCovered && haveKey){
      level = 5;
      const cLevel = levels[level];
      setMap(cLevel);
      clearText();
      addText("Press s to exit Safe", {x: 0, y: 15, color:color`2`});
      addText("Press j to Open \n     Letter", {x: 3, y: 3, color:color`2`});
      playTune(doorSound);

      if(!haveCrowbar){
        addText("Press l to Take \n     Crowbar", {x: 3, y: 10, color:color`2`});
      }
      else if(haveCrowbar){
        getFirst(crowbar).remove();
        addSprite(6, 4, gray)
      }
      
    }
    else if(windowNum == windowCovered && haveCrowbar){
      level = 7;
      const cLevel = levels[level];
      setMap(cLevel);
      clearText();
      addSprite(1, 0, player);
      playTune(doorSound);
    }
    
  }

  if(level == 4){
    const doorNum = tilesWith(door).length;
    const doorCovered = tilesWith(door, player).length;
    const rockNum = tilesWith(rock).length;
    const rockCovered = tilesWith(rock, player).length;
    const specialBackgroundNum = tilesWith(specialBackground).length;
    const specialBackgroundCovered = tilesWith(specialBackground, player).length;
    const keyNum = tilesWith(key).length;

    if(doorNum == doorCovered){
      level = 2;
      const cLevel = levels[level];
      if (cLevel != undefined) {
        setMap(cLevel);
        clearText();
        addSprite(1, 2, player);
        playTune(doorSound);
      }
    }
    
    if(rockNum == rockCovered && rockNum != 0){
      haveRock = true;
      getFirst(rock).remove();
      addSprite(4, 2, background)
      playTune(collectionSound);
    }

    if(specialBackgroundNum == specialBackgroundCovered && keyNum != 0 && haveRock){
      haveKey = true
      getFirst(key).remove();
      addSprite(2, 1, background)
      addText("Key Obtained", {x: 4, y: 5, color:color`0`});
      playTune(collectionSound);
    }
    
  }

  if(level == 8){
    const carNum = tilesWith(car).length;
    const carCovered = tilesWith(car, player).length;

    if(carNum == carCovered){
      level = 9;
      const cLevel = levels[level];
      if (cLevel != undefined) {
        setMap(cLevel);
        clearText();
        addText("  You did it, \nyou finally made \n    it out", {x: 2, y: 3, color:color`0`});
        addText("this time...", {x: 4, y: 8, color:color`3`});
        addText("  Thank you for \n    playing :)", {x: 1, y: 11, color:color`9`});
        addText("    Press s to \n Go Back to Menu", {x: 1, y: 14, color:color`9`});
        playTune(doorSound);
      }
    
    }
  }
  
});

onInput("j", () => {
  kCheck = false;
  if(level == 5){
    level = 6;
    const cLevel = levels[level];
    setMap(cLevel);
    clearText();
    addText("Well well well \ndetective, after \nall this time I \nhave to let you \non a little... \nSecret.", {x: 2, y: 1, color:color`0`});
    addText("Eua'bk hkkt \ningyotm \ng mnuyz... \nUrj Lxoktj", {x: 4, y: 8, color:color`3`});
    addText("Press s to \nexit Safe", {x: 4, y: 13, color:color`0`});
  }
});

onInput("l", () => {
  kCheck = false;
  if(level == 5){
    if(!haveCrowbar){
      haveCrowbar = true;
      getFirst(crowbar).remove();
      addSprite(6, 4, gray);
      addText("                              ", {x: 3, y: 10, color:color`2`});
      addText("                              ", {x: 3, y: 11, color:color`2`});
      playTune(collectionSound);
    }
  }
});

onInput("s", () => {
  kCheck = false;
  if(level == 5){
    level = 3;
    const cLevel = levels[level];
    setMap(cLevel);
    clearText();
    addSprite(1, 2, player);
  }
  else if(level == 6){
    level = 3;
    const cLevel = levels[level];
    setMap(cLevel);
    clearText();
    addSprite(1, 2, player);
  }
  else if(level == 7){
    const sLadderNum = tilesWith(sLadder).length;
    const sLadderCovered = tilesWith(sLadder, player).length;
    const ladderNum = tilesWith(ladder).length;
    const ladderCovered = tilesWith(ladder, player).length;
    
    getFirst(player).y += 1;
    if(sLadderNum == sLadderCovered){
      level = 8;
      const cLevel = levels[level];
      setMap(cLevel);
      clearText();
      addSprite(1, 2, player);
    }
  }
  else if(level == 9){
    level = 0;
    const cLevel = levels[level];
    setMap(cLevel);
    clearText();
    addText("Press i to Start", {x: 2, y: 5, color:color`0`});
    addText("Trapped", {x: 6, y: 1, color:color`9`});
    addText("  Press k to \n  Mute Music", {x: 3, y: 13, color:color`9`});
    haveKey = false;
    haveCrowbar = false;
    haveRock = false;
  }
});

afterInput(() => {
  
// If hover over door, then show text
  if(level == 1){
    const doorNum = tilesWith(door).length;
    const doorCovered = tilesWith(door, player). length;

    if(doorNum == doorCovered){
      addText("Press w to Enter", {x: 0, y: 2, color:color`0`});
    }
    else{
      addText("                  ", {x: 0, y: 2, color:color`0`});
    }
  }

// If hover over door, then show text
  if(level == 2){
    const doorNum = tilesWith(door).length;
    const eDoorNum = tilesWith(eDoor).length;
    const door2Num = tilesWith(door2).length;
    const doorCovered = tilesWith(door, player).length;
    const eDoorCovered = tilesWith(eDoor, player).length;
    const door2Covered = tilesWith(door2, player).length;

    if(eDoorNum == eDoorCovered){
      if(!haveKey){
        addText("It locked behind me!\nI have to find a \nway out!", {x: 0, y: 2, color:color`0`});
      }
      else if(haveKey){
        addText("This key doesnt\nwork here", {x: 0, y: 2, color:color`0`});
      }
    }
    else if(doorNum == doorCovered){
      addText("Press w to Enter", {x: 0, y: 2, color:color`0`});
    }
    else if(door2Num == door2Covered){
      addText("Press w to Enter", {x: 0, y: 2, color:color`0`});
    }
    else{
      addText("                    \n                  \n           ", {x: 0, y: 2, color:color`0`});
    }
  }

// If hover over Item, then show text  
  if(level == 3){
    const door2Num = tilesWith(door2).length;
    const door2Covered = tilesWith(door2, player).length;
    const safeNum = tilesWith(safe).length;
    const safeCovered = tilesWith(safe, player).length;
    const windowNum = tilesWith(window).length;
    const windowCovered = tilesWith(window, player).length;

    if(door2Num == door2Covered){
      addText("Press w to Enter", {x: 0, y: 2, color:color`0`});
    }
    else if(safeNum == safeCovered){
      if(!haveKey){
        addText("Why does this \nSafe need a Key?", {x: 0, y: 2, color:color`0`});
      }
      else if(haveKey){
        addText("Press w to Open Safe", {x: 0, y: 2, color:color`0`});
      }
    }
    else if(windowNum == windowCovered){
      if(!haveCrowbar){
        addText("It's boarded, \nI need something to \nBreak it Open", {x: 0, y: 2, color:color`0`});
      }
      else if(haveCrowbar){
        addText("Press w to Escape", {x: 0, y: 2, color:color`0`});
      }
    }
    else{
      addText("                    \n                   \n             ", {x: 0, y: 2, color:color`0`});
    }
  }

// If hover over Item, then show text
  if(level == 4){
    const doorNum = tilesWith(door).length;
    const doorCovered = tilesWith(door, player).length;
    const rockNum = tilesWith(rock).length;
    const rockCovered = tilesWith(rock, player).length;
    const specialBackgroundNum = tilesWith(specialBackground).length;
    const specialBackgroundCovered = tilesWith(specialBackground, player).length;
    const keyNum = tilesWith(key).length;

    if(doorNum == doorCovered){
      addText("Press w to Enter", {x: 0, y: 2, color:color`0`});
    }
    else if(rockNum == rockCovered && rockNum != 0){
      addText("Press w to Pick Up\nRock", {x: 0, y: 2, color:color`0`});
    }
    else if(specialBackgroundNum == specialBackgroundCovered && keyNum != 0){
      if(!haveRock){
        addText("That key is too high\nmaybe if I \nthrow something.", {x: 0, y: 2, color:color`0`});
      }
      else if(haveRock){
        addText("Press w to Throw\nRock at Key", {x: 0, y: 2, color:color`0`});
      }
    }
    else{
      addText("                    \n                  \n                ", {x: 0, y: 2, color:color`0`});
    }
  }

  if(level == 7){
    const sLadderNum = tilesWith(sLadder).length;
    const sLadderCovered = tilesWith(sLadder, player).length;
    const ladderNum = tilesWith(ladder).length;
    const ladderCovered = tilesWith(ladder, player).length;

    if((ladderNum - 1) == ladderCovered){
      addText("Press s to Go \nDown", {x: 2, y: 3, color:color`2`});
    }
    else if(sLadderNum == sLadderCovered){
      addText("Press s to Go \nDown", {x: 2, y: 3, color:color`2`});
    }
    else{
      addText("                    \n                  \n                ", {x: 2, y: 3, color:color`0`});
    }
    
  }

  if(level == 8){
    const doorNum = tilesWith(door).length;
    const doorCovered = tilesWith(door, player).length;
    const carNum = tilesWith(car).length;
    const carCovered = tilesWith(car, player).length;

    if(doorNum == doorCovered){
      addText("Don't want to go in \nthere again", {x: 0, y: 3, color:color`0`});
    }
    else if(carNum == carCovered){
      addText("Press w to get out \nof here", {x: 0, y: 3, color:color`0`});
    }
    else{
      addText("                    \n                  \n                ", {x: 0, y: 3, color:color`0`});
    }
    
  }

  if (isMusicPlaying && kCheck) {
    playback = playTune(music, Infinity)
  } 
  else if(!isMusicPlaying && kCheck) {
   playback.end()
  }
  
})