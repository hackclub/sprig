/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Math Mechanics
@author: Oikko
@tags: []
@addedOn: 2024-09-03
*/

const oikko = "p";
const step = "i";
const adiyat = "A";

const carson = "C";
const finch = "F";
const weber = "k"
const dole = "q";
const yugo = "y";
const chlud = "Q";


const jojo = "j";
const up = "w";
const down = "s";
const right = "d";
const left = "a";
const hole = "H";
const fakehole = "N";
const startground = "n";
const wall = "W";
const zero = "z";
const one = "e";
const no = "O";
const yes = "Y";
const Dee = "D";
const I_aye = "I";



setLegend(
  [adiyat, bitmap`
................
................
.....000000.....
....00000000....
....00CCCC00....
....0C0CC0C0....
....CCCCCCCC....
.....C0000C.....
.....CCCCCC.....
......5CC5......
....55555555....
....55555555....
....55555555....
....C555555C....
.....333333.....
.....00..00.....` ],
  [carson, bitmap`
................
................
.....666666.....
....66666666....
....66222266....
....62022026....
....22222222....
.....200002.....
.....222222.....
......C22C......
....CCCCCCCC....
....CCCCCCCC....
....CCCCCCCC....
....2CCCCCC2....
.....000000.....
.....00..00.....`],
  [finch, bitmap`
................
................
.....111111.....
....11222211....
....12222221....
....12022021....
....22222222....
.....200002.....
.....211112.....
......5225......
....55555555....
....55555555....
....55555555....
....25555552....
.....000000.....
.....00..00.....`],
  [weber, bitmap`
................
......2222......
.....222222.....
....22222222....
....22222222....
....22022022....
....22222222....
.....200002.....
.....222222.....
......4224......
....44444444....
....44444444....
....44444444....
....24444442....
.....666666.....
.....00..00.....`],
  [dole, bitmap`
................
................
.....111111.....
....12211221....
....12222221....
....12022021....
....22222222....
.....200002.....
.....211112.....
......2112......
....76767676....
....67676767....
....76767676....
....27676762....
.....FFFFFF.....
.....00..00.....`],
  [chlud, bitmap`
................
................
.....CCCCCC.....
....CCCCCCCC....
....CC2222CC....
...CC202202CC...
...C22222222C...
....C200002CC...
...CC222222C....
....CC5225CCC...
...C5C5555C5C...
....55555555....
....55555555....
....25555552....
.....000000.....
.....00..00.....`],
  [yugo, bitmap`
................
................
.....000000.....
....00000000....
....00000200....
....02022020....
....22222222....
.....200002.....
.....222222.....
......7227......
....77777777....
....77777777....
....77777777....
....27777772....
.....666666.....
.....00..00.....`],
  
  [jojo, bitmap`
................
.....000000.....
....00000000....
....00000000....
....00CCCC00....
....0C0CC0C0....
....CCCCCCCC....
.....C0000C.....
.....CCCCCC.....
......HCCH......
....HHHHHHHH....
....HHHHHHHH....
....HHHHHHHH....
....CHHHHHHC....
.....555555.....
.....00..00.....` ],
  [ oikko, bitmap`
................
.....000000.....
....00000000....
...0000000000...
...00000C0000...
...0000CC0C00...
...00CCCCCC00...
....0C0000C0....
....0CCCCCC0....
.....05CC50.....
....55555555....
....52555525....
....52777725....
....C277772C....
.....DDDDDD.....
.....55..55.....` ],
  [zero,  bitmap`
0000000000000000
0000002222000000
0000020000200000
0000200000020000
0000200000020000
0000200000020000
0000200000020000
0000200000020000
0000200000020000
0000200000020000
0000200000020000
0000020000200000
0000002222000000
0000000000000000
0000000000000000
0000000000000000` ],
  [one,  bitmap`
0000000000000000
0000000220000000
0000002220000000
0000022020000000
0000000020000000
0000000020000000
0000000020000000
0000000020000000
0000000020000000
0000000020000000
0000000020000000
0000000020000000
0000000020000000
0000000020000000
0000022222220000
0000000000000000`],
  [hole, bitmap`
7000000000000007
0700000000000070
0070000000000700
0007000000007000
0000700000070000
0000070000700000
0000007007000000
0000000770000000
0000000770000000
0000007007000000
0000070000700000
0000700000070000
0007000000007000
0070000000000700
0700000000000070
7000000000000007` ],
  [no,  bitmap`
4400000000000444
4440000000000044
4440000000000044
4444000000000044
4404400000000044
4400440000000044
4400044000000044
4400004400000044
4400000440000044
4400000044000044
4400000004400044
4400000000440044
4400000000044044
4400000000004444
4400000000000444
4440000000000044`],
  [yes,   bitmap`
4400000000000044
0440000000000440
0044000000004400
0004400000044000
0000440000440000
0000044004400000
0000004444000000
0000000440000000
0000000440000000
0000000440000000
0000000440000000
0000000440000000
0000000440000000
0000000440000000
0000000440000000
0000000440000000`],
  [fakehole,  bitmap`
7000000000000007
0700000000000070
0070000000000700
0007000000007000
0000700000070000
0000070000700000
0000007007000000
0000000770000000
0000000770000000
0000007007000000
0000070000700000
0000700000070000
0007000000007000
0070000000000700
0700000000000070
7000000000000007`],
  [startground, bitmap`
LLLLLLLLLLLLLLLL
L1LLLLLLLLLLLL1L
LLLLLLLLLLLLLLLL
LLL0LLLLLLLL0LLL
LLLLLLLLLLLLLLLL
LLLLL1LLLL1LLLLL
LLLLLLLLLLLLLLLL
LLLLLLL01LLLLLLL
LLLLLLL10LLLLLLL
LLLLLLLLLLLLLLLL
LLLLL1LLLL1LLLLL
LLLLLLLLLLLLLLLL
LLL0LLLLLLLL0LLL
LLLLLLLLLLLLLLLL
L1LLLLLLLLLLLL1L
LLLLLLLLLLLLLLLL` ],
  [I_aye, bitmap`
0222222222222220
0000000220000000
0000000220000000
0000000220000000
0000000220000000
0000000220000000
0000000220000000
0000000220000000
0000000220000000
0000000220000000
0000000220000000
0000000220000000
0000000220000000
0000000220000000
0000000220000000
0222222222222200`],
  [Dee, bitmap`
0002222000000000
0002002200000000
0002000220000000
0002000022000000
0002000002200000
0002000000200000
0002000000200000
0002000000200000
0002000000200000
0002000000200000
0002000000200000
0002000002200000
0002000022000000
0002000220000000
0002002200000000
0002222000000000`],
  [wall, bitmap`
................
................
..0000000000000.
..000........00.
...00.........0.
....000.......0.
....0000........
......000.......
.......000......
.........00.....
........00......
.......00.......
......00........
....000.......0.
...00........00.
..0000000000000.`] 
)

let level = 0;
let question = 0;
const questions = [
  'M-series center?',//0
  'does 1/n converge?',//n
  'does 1/n^2 diverge?',//n
  'n test say converge',//n
  'T-polynom use D or I',//D
  "D of f = f'?",//Y
  '+ C when ind-I ?',//Y
  'is calc awesome?',//Y
  'AP GOV?',//Y
  'AP GOV!!!'
]

const levels = [
  map`
.........
.........
.........
.........
.........
.........
WWWWWWWWW
Wp.....jH
WWWWWWWWW`,
  map`
WWWW.......WWWW
WH.W.......W.NW
WzzW.......WeeW
WzzW.......WeeW
WzzW.......WeeW
WzzW.......WeeW
WzzWWWWWWWWWeeW
W.............W
W.............W
W.............W
W......j......W
W.............W
WWWWWWW.WWWWWWW
......WpW......
......WWW......`,
  map`
WWWWWWWWWWWWW
W...........W
W...........W
WYWWW...WWWOW
WYW.W...W.WOW
WYW.W...W.WOW
WYW.W...W.WOW
WYW.W...W.WOW
WYW.W.j.W.WOW
WYW.W...W.WOW
WYW..W.W..WOW
WNW..WpW..WHW
WWW..WWW..WWW`,
  map`
.WWWWWWWWWWW.
.W...WpW...W.
.W.........W.
.WY.W.j.W.OW.
.WY.W...W.OW.
.WY.WWWWW.OW.
.WY...W...OW.
.WY...W...OW.
.WY...W...OW.
.WY...W...OW.
.WYYYNWHOOOW.
.WWWWWWWWWWW.
.............`,
  map`
WWWWW.........
WNYY.W........
W...Y.W.......
WWW..Y.W......
...W..Y.W.....
....W..Y.WWWW.
.....W..Y....W
......W..j..pW
.....W..O....W
....W..O.WWWW.
WWWW..O.W.....
W....O.W......
WHOOO.W.......
WWWWWW........`,
  map`
WWWWWWWWWWWWW
W...........W
W...........W
WDWWW...WWWIW
WDW.W...W.WIW
WDW.W...W.WIW
WDW.W...W.WIW
WDW.W...W.WIW
WDW.W.j.W.WIW
WDW.W...W.WIW
WDW..W.W..WIW
WHW..WpW..WNW
WWW..WWW..WWW`,
  map`
WWWWWWWWWWWWWW
WWWW.........W
WWWW.OOOOOOO.W
WWWW.OWWWW.O.W
WWWW.OWWWWWO.W
WWW....WWWWO.W
WW......WWWO.W
Wp.j.....WWO.W
WW......WWWO.W
WHW....WWWWO.W
WYYWYYWWWWWO.W
W.YYYY.WW..O.W
W..YYY..WNOO.W
WWWWWWWWWWWWWW`,
  map`
WWW.............WWW
WN.W...........W.NW
WO..W.........W..YW
W.O..W.......W..Y.W
.W.O..W.....W..Y.W.
..W.O..W...W..Y.W..
...W.O..WWW..Y.W...
....W.O.....Y.W....
.....W.O.p.Y.W.....
......W.O.Y.W......
......W..j..W......
.....W..Y.O..W.....
....W..Y...O..W....
...W..Y..W..O..W...
..W..Y..W.W..O..W..
.W..Y..W...W..O..W.
WWHY..W.....W..ONWW
.WWWWW.......WWWWW.`,
  map`
p...OOOOWWWWWWWWW
....WW.OWW.....WW
..j.W..OW..YYY..W
.Y..W..OW.Y.W.Y.W
.YWWW.OOW.YWOWY.W
..Y.WO.W..YWOWY.W
...YWOW...YWOWY.W
...YWOW.HYYWOWY.W
...YWO.WWWWWOWY.W
W.Y.WOO.....OWY.W
WY.W...O.OOOOWY.W
WY.W....O...W.Y.W
WY.WWWWWWWWW..Y.W
W.Y.........YY.WW
W..YYYYYYYYY..W..
WWWWWWWWWWWWWW...`,
  map`
...............
...............
.......H.......
.......Y.......
.......Y.......
.......Y.......
.....Q.Y.y.....
.......Y.......
.....F.Y.k.....
...............
.....A.j.C.....
...............
.......p.......
...............
...............`,
  map`
....
....
....
Hj.p`
  
  
  
  
];
//backgrounds and map*********************************************************************

setMap(levels[level]);
setBackground(startground);

//beginning words**************************************************************************
addText("Math Mechanics", { y: 1, color: color`4` });
addText("The rules of math", { y: 3, color: color`6` });
addText("have been broken", { y: 4, color: color`6` });
addText("BY JOSEPHINE", { y: 5, color: color`3` });
addText("Help me fix math", { y: 7, color: color`2` });
addText("Before its too late", { y: 8, color: color`2` });
addText("THROW HER INTO HOLE", { y: 9, color: color`7` });

//solids and pushables**********************************************************************
setSolids([oikko, jojo, adiyat, wall]);
setPushables({  [oikko]: [adiyat, jojo]});

let cooldown = false;
//keybindings**********************************************************************
onInput("w", () => {
  if (!cooldown){  getFirst(oikko).y -= 1}});

onInput("a", () => {
  if (!cooldown){getFirst(oikko).x -= 1   }});

onInput("s", () => {
  if (!cooldown){ getFirst(oikko).y += 1    }});

onInput("d", () => {
  if (!cooldown){    getFirst(oikko).x += 1}});

onInput("i", () => {
  if (!cooldown) {
    setMap(levels[level]);
  }
});

//**************************************************************************************
afterInput(() => {
  
  if (cooldown) return; // Ignore the movements in the cooldown
  const jojos = getAll(jojo);
  let allInHole = true;

  for (const j of jojos) {
    const tile = getTile(j.x, j.y);
    if (!tile.some(sprite => sprite.type === hole)) {
      allInHole = false;
      break;
    }
  }

  if (allInHole) {
    cooldown = true; // Activate the cooldown
    clearText();
    addText("Level Complete!", { y: 7, color: color`2` });

    if (level < levels.length - 1) {
      // Let a 1 sec delay
      setTimeout(() => {
        level++;
        setMap(levels[level]);
        clearText();
        question++;
        addText(questions[question - 1], { y: 2, color: color`2` });
        cooldown = false;
      }, 1000);
    } else {
      // After all of the levels
      addText("THE END!", { y: 9, color: color`2` });
      addText("MATH IS SAVED", { y: 10, color: color`7` });
      
    } 
  }
});


