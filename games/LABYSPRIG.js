/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: LabySprig
@author: Robin Berchemin-Sirven
@description : Make the phantom finds his way to the castle. It's dfferent from other labyrinth as, depending on the difficulty, you may not see the full map, or even see only your position so that you'll have to remember when you already went.
@tags: ['labyrinth']
@addedOn: 2025-09-14
*/

const player = "p"
const curseur = "s"
const noob = "n"
const labyd = "d"
const labydg = "a"
const labydh = "z"
const labydb = "e"
const labydgb = "u"
const labydgh = "i"
const labyhbd = "f"
const labyhbg = "q"
const labydghb = "o"
const labyg = "g"
const labygh = "r"
const labygb = "t"
const labyh = "h"
const labyhb = "y"
const labyb = "b"
const castle = "c"
const mur = "m"

setLegend(
  [ player, bitmap`
................
................
......0000......
.....022220.....
.....022220.....
....02022020....
....02222220....
....02022220....
...0222002220...
...0222222220...
..012212212210..
..0L11L11L11L0..
...0LL0LL0LL0...
....00.00.00....
................
................` ],
  [ curseur, bitmap`
................
................
......0000......
.....022220.....
.....022220.....
....02022020....
....02222220....
....02022220....
...0222002220...
...0222222220...
..012212212210..
..0L11L11L11L0..
...0LL0LL0LL0...
....00.00.00....
................
................` ],
  [ castle, bitmap`
.......11.......
......1111......
.....111111.....
.....1LLLL1.....
......LLLL......
......LLLL......
1.11.11L11.11.11
11111L111111L111
11L1111L1111111L
111111CCCC1L1111
L1111CCCCCC111L1
1111LCCCCCC11111
1L111CCCCCC1L111
11111CCCCFC1111L
111L1CCCCCC11111
11111CCCCCC11L11` ],
  [ noob, bitmap`
................
................
......0000......
.....022220.....
.....022220.....
....02022020....
....02222220....
....02022220....
...0222002220...
...0222222220...
..012212212210..
..0L11L11L11L0..
...0LL0LL0LL0...
....00.00.00....
................
................` ],
  [ mur, bitmap`
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
0000000000000000` ],
  [ labyd, bitmap`
LLLLLLLLLLLLLLLL
L111111111111111
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L111111111111111
LLLLLLLLLLLLLLLL` ],
  [ labydg, bitmap`
LLLLLLLLLLLLLLLL
1111111111111111
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
1111111111111111
LLLLLLLLLLLLLLLL` ],
  [ labydh, bitmap`
L1............1L
L1............11
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L111111111111111
LLLLLLLLLLLLLLLL` ],
  [ labydb, bitmap`
LLLLLLLLLLLLLLLL
L111111111111111
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1............11
L1............1L` ],
  [ labydgb, bitmap`
LLLLLLLLLLLLLLLL
1111111111111111
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
11............11
L1............1L` ],
  [ labydgh, bitmap`
L1............1L
11............11
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
1111111111111111
LLLLLLLLLLLLLLLL` ],
  [ labydghb, bitmap`
L1............1L
11............11
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
11............11
L1............1L` ],
  [ labyhbg, bitmap`
L1............1L
11............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
11............1L
L1............1L` ],
  [ labyhbd, bitmap`
L1............1L
L1............11
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1..............
L1............11
L1............1L` ],
  [ labyg, bitmap`
LLLLLLLLLLLLLLLL
111111111111111L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
111111111111111L
LLLLLLLLLLLLLLLL` ],
  [ labygh, bitmap`
L1............1L
11............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
111111111111111L
LLLLLLLLLLLLLLLL` ],
  [ labygb, bitmap`
LLLLLLLLLLLLLLLL
111111111111111L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
..............1L
11............1L
L1............1L` ],
  [ labyh, bitmap`
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L11111111111111L
LLLLLLLLLLLLLLLL` ],
  [ labyhb, bitmap`
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L` ],
  [ labyb, bitmap`
LLLLLLLLLLLLLLLL
L11111111111111L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L
L1............1L` ]
  )

let Difficulty = 0

const menu = ["Play","Map","Difficulty"]
const ListMap1 = ["Map 1","Map 3","Map 5"]
const ListMap2 = ["Map 2","Map 4","Map 6"]
const Listdifficulty = ["Easy","Medium","Hard"]


let level = 0
const levels = [
  map`
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................
....................`,
  map`
pageaateaauteteatbec
fauitdqzatyhhfrbfqyb
ybztzgydtyzaareryhzq
yftzutztfigeaaitfugy
zrherztyydureatyhzar
eatzagyhztyerbfogeag
ftzaaaqetziqeqyheitb
yztegdrhzugzryzarbyy
zuioageatyeatzgegzoq
bztztbybzirbydaqearh
yeitfrfoagdoiatyydat
zogyherheathetfqzaaq
ererbyduqbztyhyheugy
yeiurzthfitziareryer
hydrdaotzthduagzgyyb
diaaaarzgzaaiaaaaiir`,
  map`
puaugdteateageaaugec
yyeregfitfqeaiagzarb
hyhbfaigyyyztdteaaaq
erbyzauthyzgzairbdaq
ftyzugyzgfuatdaureur
yzqdoarberztzagyerfg
ftzgfuarheaitbeirdrb
yzaaqzaagydtyyfuager
zaagzgeatzgzqzqheait
eateterbzaaarbzardty
ybyhfqbfaagearbdugfr
yzoaryfreaareareoarb
yereghzaqdteoathyeur
yzardteaqbyyhbybzqzt
fategyybzioiuryzaoaq
zgziaiirdaigzgzaaiar`,
  map`
pageaaateaaateaauagc
faurbeaqyeathydtztby
ydiarheryybybztybfry
heutdaqdqyfiqbyyyzar
eqyzteotyyybyyzqzaat
hyyeqyyziryyyztzatby
erhyyhzteaoqybydaiqy
ydarzathhbyhyyztdtzt
yeaagbztdqherztztzty
foaaaogzaiareareiair
yheutztegeatzaurdaat
zuryztyyeitzgbyduaty
erdigyhyftzterzarbyy
yeaaurbfrzgfiaauaryy
yydareryeatfaatheary
hzaaaiairdrzagzaiaar`,
  map`
patbeategeateugeaaac
yerfrbfrerbzqheiaaat
yzgfaqzarerbzardaath
fatztzaaarerdaaauaqb
ftztzaaaatzteaaarbzq
yztzageagzaireaaaigy
zgftbeiuauaagfateger
eaqyfrbydqbearbziarb
heryyerztzrybeigeuar
ereryzugzaarfreaqzat
ydrbzaoaagearerbzath
fuaiatzaaureareiagzt
yfaatheagzaregfauaty
yzugheiuauagzuogzthy
ftzugfgztheathfatzar
hzgzaiagzaigzaigzaag`,
  map`
pauaauateauaugeaugec
ftzatyerybztyerbfarb
yfagyyherfgyyfarzagy
hzatyyerbyeqyyduaaaq
eatyyyybyyyhhzareagy
yeqhyhzqzqfautegfaar
yyzaregzaqfgyhfardat
yzageiaagyyerbydaaaq
yegeiutduryyeryduaty
frerbyyerbyyztzarbyy
faiaqyyydirftyeaarzq
hdauryyztdaryyfaauty
eatherzgyeuaryyeaqhy
ydiareagyyydaqyheqby
fuaagfaarhfaurybyhyy
hzaaaiaaagzgzairzair`,
  map`
pteaaaauugeategeautc
yyfaagdqyeigyyerbyyy
yyzateurhybeqyyeryhy
yzatyyfteryyzqyybzar
faghyhyhydqzthzqybet
fateitfaiaigfutzqzry
fthyerfageathyybzaaq
yzarzghearbyeqyybdty
zaageaarduryyyhfigyy
dauarbdaaourhybfaury
durbeiagdryduryybzar
erdqyeaautzarbyzqdug
ydaoryegyyegeirbzurb
futfaryerzreiuuqbyer
yyhyetyfagerbyyhfrzt
hzairzrzaaiarhzaiaar`
]

let lastInput = "";
let positioncurseurprincipal = 5
let menuItem = 0
let MapMenu = 0
let niveaux = 0


const initialiseMenuPrincipal = () => {
  let level = 0
  setMap(levels[level]);
}

const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

const afficheMenuPrincipal = () => {
  menuItem = 0;
  let decalageMenu = 0;
  for (let key in menu)
  {
    addText(menu[key], {x:3, y:5+decalageMenu, color:color`7`});
    decalageMenu += 2
  }
  
  addText("J to select", {x:7, y:2, color:color`D`});
  addText("Move in the game", {x:2, y:12, color:color`3`});
  addText("with W A S D ", {x:3, y:13, color:color`3`});

  if (getFirst(curseur) == null)
  {
    addSprite(1, positioncurseurprincipal, curseur);
  }
}

const afficheMenuListMap = () => {
  menuItem = 1
  let decalageMenu1 = 0;
  let decalageMenu2 = 0;
  for (let key in ListMap1)
  {
    addText(ListMap1[key], {x:3, y:5+decalageMenu1, color:color`7`});
    decalageMenu1 += 2

    addText("J to select", {x:7, y:2, color:color`D`});
    addText("K to go back", {x:4, y:12, color:color`9`});
  }

  for (let key in ListMap2)
  {
    addText(ListMap2[key], {x:12, y:5+decalageMenu2, color:color`7`});
    decalageMenu2 += 2
  }
  
  if (getFirst(curseur) == null)
  {
    addSprite(1, positioncurseurprincipal, curseur);
  }
}

const afficheMenuListDifficulty = () => {
  menuItem = 2
  let decalageMenu = 0;
  for (let key in Listdifficulty)
  {
    addText(Listdifficulty[key], {x:3, y:5+decalageMenu, color:color`7`});
    decalageMenu += 2

    addText("J to select", {x:7, y:2, color:color`D`});
    addText("K to go back", {x:4, y:12, color:color`9`});
  }
  
  if (getFirst(curseur) == null)
  {
    addSprite(1, positioncurseurprincipal, curseur);
  }
}


const demarreJeu = () => {

  setSolids([])
  
  setMap(levels[level]);

  setPushables({
    [ player ]: []
  })

  addSprite(0,0, noob);

  if(Difficulty != 0)
  {
    for (let i = 0; i < 20; i++)
    {
      for (let j = 0; j < 16; j++)
      {
        addSprite(i, j, mur)
      }
    }
  }
}

const effaceCroix = () => {

  if(getFirst(player).x>=0 && getFirst(player).x<20 && getFirst(player).y>=0 && getFirst(player).y<16)
  {
     addSprite(getFirst(player).x, getFirst(player).y,mur);
  }
  if(getFirst(player).x>=0 && getFirst(player).x<20 && (getFirst(player).y+1)>=0 && (getFirst(player).y+1)<16)
  {  addSprite(getFirst(player).x, getFirst(player).y+1,mur);
  }
  if(getFirst(player).x>=0 && getFirst(player).x<20 && (getFirst(player).y-1)>=0 && (getFirst(player).y-1)<16)
  {  addSprite(getFirst(player).x, getFirst(player).y-1,mur);
  }
  if((getFirst(player).x+1)>=0 && (getFirst(player).x+1)<20 && getFirst(player).y>=0 && getFirst(player).y<16)
  {  addSprite(getFirst(player).x+1, getFirst(player).y,mur);
  }
  if((getFirst(player).x-1)>=0 && (getFirst(player).x-1)<20 && getFirst(player).y>=0 && getFirst(player).y<16)
  { addSprite(getFirst(player).x-1, getFirst(player).y,mur);
  }
}

const afficheCroix = () => {

  
  if(Difficulty == 1)
  {
    let spriteToRemoveArray = [];
    let nbToRemove=0;

    for (let key in getTile(getFirst(player).x, getFirst(player).y))
    {
      spriteToRemove = getTile(getFirst(player).x, getFirst(player).y)[key];
      if (spriteToRemove && spriteToRemove["type"] == "m") {
        spriteToRemoveArray[nbToRemove] = spriteToRemove;
        nbToRemove = nbToRemove+1;
      }
    }

    for (let toto=0; toto < nbToRemove; toto++)
    {
        spriteToRemoveArray[toto].remove();
    }
  }
  
  if(Difficulty == 2)
  {
    let spriteToRemoveArray = [];
    let nbToRemove=0;
  
    for (let key in getTile(getFirst(player).x, getFirst(player).y))
    {
      spriteToRemove = getTile(getFirst(player).x, getFirst(player).y)[key];
      if (spriteToRemove && spriteToRemove["type"] == "m") {
        spriteToRemoveArray[nbToRemove] = spriteToRemove;
        nbToRemove = nbToRemove+1;
      }
    }
    
    for (let key in getTile(getFirst(player).x-1, getFirst(player).y))
    {
      spriteToRemove = getTile(getFirst(player).x-1, getFirst(player).y)[key];
      if (spriteToRemove && spriteToRemove["type"] == "m") {
        spriteToRemoveArray[nbToRemove] = spriteToRemove;
        nbToRemove = nbToRemove+1;
      }
    }
    
    for (let key in getTile(getFirst(player).x+1, getFirst(player).y))
    {
      spriteToRemove = getTile(getFirst(player).x+1, getFirst(player).y)[key];
      if (spriteToRemove && spriteToRemove["type"] == "m") {
        spriteToRemoveArray[nbToRemove] = spriteToRemove;
        nbToRemove = nbToRemove+1;
      }
    }
      
    for (let key in getTile(getFirst(player).x, getFirst(player).y-1))
    {
      spriteToRemove = getTile(getFirst(player).x, getFirst(player).y-1)[key];
      if (spriteToRemove && spriteToRemove["type"] == "m") {
        spriteToRemoveArray[nbToRemove] = spriteToRemove;
        nbToRemove = nbToRemove+1;
      }
    }
      
    for (let key in getTile(getFirst(player).x, getFirst(player).y+1))
    {
      spriteToRemove = getTile(getFirst(player).x, getFirst(player).y+1)[key];
      if (spriteToRemove && spriteToRemove["type"] == "m") {
        spriteToRemoveArray[nbToRemove] = spriteToRemove;
        nbToRemove = nbToRemove+1;
      }
    }
    
    for (let toto=0; toto < nbToRemove; toto++)
    {
        spriteToRemoveArray[toto].remove();
    }
  }
}

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Logique
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

initialiseMenuPrincipal()
afficheMenuPrincipal()


onInput("s", () => {
  if (level == 0)
  {
    if ((getFirst(curseur).y == 5) || (getFirst(curseur).y == 7))
    getFirst(curseur).y += 2;
  }
  else
  {
    if(Difficulty == 0)
    {
      if ((tilesWith(player,labyd) == false) && (tilesWith(player,labydg) == false) && (tilesWith(player,labydh) == false) && (tilesWith(player,labydgh) == false)
        && (tilesWith(player,labyg) == false) && (tilesWith(player,labygh) == false) && (tilesWith(player,labyh) == false) && (tilesWith(player,castle) == false))
        {
          getFirst(player).y += 1;
        }
    }
    else if(Difficulty == 1)
    {
      if ((tilesWith(player,labyd) == false) && (tilesWith(player,labydg) == false) && (tilesWith(player,labydh) == false) && (tilesWith(player,labydgh) == false)
        && (tilesWith(player,labyg) == false) && (tilesWith(player,labygh) == false) && (tilesWith(player,labyh) == false) && (tilesWith(player,castle) == false))
      {
        getFirst(player).y += 1;
      }
      afficheCroix();
    }
    
    else if(Difficulty == 2)
    {
      effaceCroix();
      if ((tilesWith(player,labyd) == false) && (tilesWith(player,labydg) == false) && (tilesWith(player,labydh) == false) && (tilesWith(player,labydgh) == false)
        && (tilesWith(player,labyg) == false) && (tilesWith(player,labygh) == false) && (tilesWith(player,labyh) == false) && (tilesWith(player,castle) == false))
      {
        getFirst(player).y += 1;
      }
      afficheCroix();
    }
  }
  
})

onInput("w", () => {
  if (level == 0)
  {
    if ((getFirst(curseur).y == 9) || (getFirst(curseur).y == 7))
      getFirst(curseur).y -= 2;
  }
  else
  {
    if(Difficulty == 0)
    {
      if ((tilesWith(player,labyd) == false) && (tilesWith(player,labydg) == false) && (tilesWith(player,labydb) == false) && (tilesWith(player,labydgb) == false)
        && (tilesWith(player,labyg) == false) && (tilesWith(player,labygb) == false) && (tilesWith(player,labyb) == false) && (tilesWith(player,castle) == false))
      {
        getFirst(player).y -= 1;
      }
    }
    else if(Difficulty == 1)
    {
      if ((tilesWith(player,labyd) == false) && (tilesWith(player,labydg) == false) && (tilesWith(player,labydb) == false) && (tilesWith(player,labydgb) == false)
        && (tilesWith(player,labyg) == false) && (tilesWith(player,labygb) == false) && (tilesWith(player,labyb) == false) && (tilesWith(player,castle) == false))
      {
        getFirst(player).y -= 1;
      }
      afficheCroix();
    }
      
    else if(Difficulty == 2)
    {
      effaceCroix();
      if ((tilesWith(player,labyd) == false) && (tilesWith(player,labydg) == false) && (tilesWith(player,labydb) == false) && (tilesWith(player,labydgb) == false)
        && (tilesWith(player,labyg) == false) && (tilesWith(player,labygb) == false) && (tilesWith(player,labyb) == false) && (tilesWith(player,castle) == false))
      {
        getFirst(player).y -= 1;
      }
      afficheCroix();
    }
  }
})

onInput("d", () => {
  if (level == 0)
  {
    if (MapMenu == 1)
    {
      if ((getFirst(curseur).x == 1) && ((getFirst(curseur).y == 9) || (getFirst(curseur).y == 7) || (getFirst(curseur).y == 5)))
        getFirst(curseur).x += 9;

    }
  }
  else
  {
    if(Difficulty == 0)
    {
      if ((tilesWith(player,labyhbg) == false) && (tilesWith(player,labyg) == false) && (tilesWith(player,labygh) == false) && (tilesWith(player,labygb) == false)
        && (tilesWith(player,labyh) == false) && (tilesWith(player,labyhb) == false) && (tilesWith(player,labyb) == false) && (tilesWith(player,castle) == false))
      { 
        getFirst(player).x += 1
      }
    }
    else if(Difficulty == 1)
    {
      if ((tilesWith(player,labyhbg) == false) && (tilesWith(player,labyg) == false) && (tilesWith(player,labygh) == false) && (tilesWith(player,labygb) == false)
        && (tilesWith(player,labyh) == false) && (tilesWith(player,labyhb) == false) && (tilesWith(player,labyb) == false) && (tilesWith(player,castle) == false))
      { 
        getFirst(player).x += 1
      }
      afficheCroix();
    }
    else if(Difficulty == 2)
    {
      effaceCroix();
      if ((tilesWith(player,labyhbg) == false) && (tilesWith(player,labyg) == false) && (tilesWith(player,labygh) == false) && (tilesWith(player,labygb) == false)
        && (tilesWith(player,labyh) == false) && (tilesWith(player,labyhb) == false) && (tilesWith(player,labyb) == false) && (tilesWith(player,castle) == false))
      { 
        getFirst(player).x += 1
      }
      afficheCroix();
    }
  }
})

onInput("a", () => {
     if (level == 0)
  {
    if (MapMenu == 1)
    {
      if ((getFirst(curseur).x == 10) && ((getFirst(curseur).y == 9) || (getFirst(curseur).y == 7) || (getFirst(curseur).y == 5)))
        getFirst(curseur).x -= 9;
    }
  }
  else
  {
    if(Difficulty == 0)
    {
      if ((tilesWith(player,labyd) == false) && (tilesWith(player,labydh) == false) && (tilesWith(player,labydb) == false) && (tilesWith(player,labyhbd) == false)
        && (tilesWith(player,labyh) == false) && (tilesWith(player,labyhb) == false) && (tilesWith(player,labyb) == false) && (tilesWith(player,castle) == false))
      {
        getFirst(player).x -= 1
      }
    }
    else if(Difficulty == 1)
    {
       if ((tilesWith(player,labyd) == false) && (tilesWith(player,labydh) == false) && (tilesWith(player,labydb) == false) && (tilesWith(player,labyhbd) == false)
        && (tilesWith(player,labyh) == false) && (tilesWith(player,labyhb) == false) && (tilesWith(player,labyb) == false) && (tilesWith(player,castle) == false))
      {
        getFirst(player).x -= 1
      }
      afficheCroix();
    }
    else if(Difficulty == 2)
    {
    effaceCroix();
    if ((tilesWith(player,labyd) == false) && (tilesWith(player,labydh) == false) && (tilesWith(player,labydb) == false) && (tilesWith(player,labyhbd) == false)
      && (tilesWith(player,labyh) == false) && (tilesWith(player,labyhb) == false) && (tilesWith(player,labyb) == false) && (tilesWith(player,castle) == false))
    {
      getFirst(player).x -= 1
    }
    afficheCroix();
    }
  }
})

onInput("j", () => {
  if(level == 0)
  {
    if(menuItem == 0)
    {
      switch (getFirst(curseur).y)
      {
        case 5:
          if((niveaux >= 1) && (niveaux <= 6))
          {
            level = niveaux
            demarreJeu()
          }
          break
        case 7:
          afficheMenuListMap()
          MapMenu = 1
          break
        case 9:
          afficheMenuListDifficulty()
          break
      }
    }
    else if(menuItem == 1)
    {
      switch (getFirst(curseur).y)
      {
        case 5:
                switch (getFirst(curseur).x)
                {
                  case 1: niveaux = 1
                          
                    break

                  case 10: niveaux = 2
                    break
                }
          break
        case 7:
                switch (getFirst(curseur).x)
                {
                  case 1: niveaux = 3
                    break

                  case 10: niveaux = 4
                    break
                }
          break
        case 9:
                switch (getFirst(curseur).x)
                {
                  case 1: niveaux = 5
                    break

                  case 10: niveaux = 6
                    break
                }
          break
      }
    }
    else if(menuItem == 2)
    {
      switch (getFirst(curseur).y)
      {
        case 5:
          Difficulty = 0
          break
        case 7:
          Difficulty = 1
          break
        case 9:
          Difficulty = 2
          break
      }
    }
  }
})

onInput("k", () => {
  lastInput = "k"; 
  
  if (getFirst(player) != null)
  {
    toto = getTile(getFirst(player).x, getFirst(player).y)[0]
    if (toto != null)
      toto.remove()
  }
  
  if (getFirst(castle) != null)
  {
    toto = getTile(getFirst(castle).x, getFirst(castle).y)[0]
    if (toto != null)
      toto.remove()
  }
  
  if (getFirst(noob) != null)
  {
    toto = getTile(getFirst(noob).x, getFirst(noob).y)[0]
    if (toto != null)
      toto.remove()
  }
  initialiseMenuPrincipal()
  afficheMenuPrincipal()
})

afterInput(async() => {
  if ((level == 0) || (lastInput == "k"))
  {
    clearText();
    
    if (menuItem == 0)
      afficheMenuPrincipal();
    else if (menuItem == 1)
      afficheMenuListMap();
    else if (menuItem == 2)
      afficheMenuListDifficulty();

    if (lastInput == "k")
    {
      level = 0
      MapMenu = 0
      menuItem = 0
      lastInput = ""
    }
  }
  else
  {
    clearText();
    if(tilesWith(player,castle).length >= 1)
    {
      if(Difficulty == 0)
      {
        addText("Victory!", {x:6, y:7, color:color`3`});
      }
      else if(Difficulty == 2)
      {
        addText("Victory!", {x:6, y:7, color:color`6`});
      }
      else if(Difficulty == 2)
      {
        addText("Victory!", {x:6, y:7, color:color`2`});
      }

      await sleep(3000);
      clearText()
      level = 0
      menuItem = 0
      niveaux = 0
      initialiseMenuPrincipal()
      afficheMenuPrincipal();
    }
  }
})
