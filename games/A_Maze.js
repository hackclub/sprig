/*
@title: A Maze
@author: Ethan C
@tags: []
@addedOn: 2024-09-03
*/

const player = "p"
const wall = "w"
const end = "e"
const fake = "f"
const broken = "b"
const foreseer = "r"
const devil = "d"
const askB = "a"
const askD = "v"


setLegend(
  [player, bitmap`
................
.......CCC......
......C666......
......6620......
......6666......
.......66.......
......5555......
......5335......
......5335......
......5335......
......5665......
......5559......
......9999......
......9..9......
......9..9......
......99.99.....` ],
  [wall, bitmap`
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
  [end, bitmap`
0033003300330033
0033003300330033
3300330033003300
3300330033003300
0033222662220033
0033266666620033
3300226666223300
3300262662623300
0033262662620033
0033226666220033
3300222662223300
3300266666623300
0033003300330033
0033003300330033
3300330033003300
3300330033003300`],
  [fake, bitmap`
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
  [broken, bitmap`
00HH00HH00HH00HH
00HH00HH00HH00HH
HH00HH00HH00HH00
HH00HH00HH00HH00
00HH...66...00HH
00HH.666606.00HH
HH00..0666..HH00
HH00.6.00.6.HH00
00HH.6.60.6.00HH
00HH..6660..00HH
HH00...06...HH00
HH00.666666.HH00
00HH00HH00HH00HH
00HH00HH00HH00HH
HH00HH00HH00HH00
HH00HH00HH00HH00`],
  [foreseer, bitmap`
................
.....FFF........
....F000F.......
...F00000F......
..FF0L0L0F......
.F6F00000F......
.F6FF0000F......
FFF6FF00F.......
F6FF6FF0F.......
FF6FFFFF........
FF6FF6FF........
FF6FF6FFF.......
FF6FF6FFF.......
FF6FF6FFFFF.....
F6FFF6FFFFFF....
FFFF6FFFFFFFF...`],
  [devil, bitmap `
................
.....000...00...
....0CCC0.0220..
...0C313C0220...
..0C313C0CC0....
.0C313C0C23C0...
.C3133C0CCCCC0..
.C31331C0CC00...
.C313133CCCC000.
.C313131CCCCCC3.
.C313131CCCCC30.
.0C33131CCCC00..
..0C333CCCCC0...
...0C3C0C0.C0...
....0C00C0.C0...
.......0CC0CC0..`],
  [askB, bitmap`
6666666666666666
6666666666666666
66............66
66....666.....66
66...66.66....66
66..66...66...66
66..66...66...66
66.......66...66
66......66....66
66.....66.....66
66............66
66.....66.....66
66.....66.....66
66............66
6666666666666666
6666666666666666`],
  [askD, bitmap `
3333333333333333
3333333333333333
33............33
33....CCC.....33
33...CC.CC....33
33..CC...CC...33
33..CC...CC...33
33.......CC...33
33......CC....33
33.....CC.....33
33............33
33.....CC.....33
33.....CC.....33
33............33
3333333333333333
3333333333333333`]
)

setSolids([player, wall, fake, foreseer])

let level = 0;
const levels = [
  map`
p.....we.
w.w.ww.w.
w.w.w....
w.w.wwfww
..w......
ww..wwww.
...ww....`,
  map`
pf...w......w..f.d
ffw....wwww....w.w
.wwwwfw...www.ww.w
....w...w...w....w
.ww...w..fw...www.
.w.w..www..wwww...
...ww..we......ww.
.w...w.wwwwfw..f..
.www...w....www..w
..wwww...w...www.w
.d.f....wwww.....w`,
  map`
p........wwww..f..w.....www....w
..wwww.w...w...w.w..www.....ww.w
.w.....www.w.w.w...w.d.wwww.ww.w
.w.ww.w..w.www.www.......ww.....
.w..w..w.........w..wfw....ww.wf
..w.ww..wwww.www..w.w.wwww..wfw.
w....ww......w....w.w.w...w.w.w.
.ww.f..wdwwwww.ww.w.w.f.e.w.w.w.
..w.w.....ww...w..w.w.w...w.f.w.
.w..www......w...ww.w..w.w..w...
.w.ww...ww.wdww.w.w.w...ww.www..
.w....ww...wew..w.w..w...w...w..
...w.w...wwww...w..w..wffwwwwwfw
w.w....w..ww..w..w..w.w....f..w.
ew..ww.ww.w....w..w.w.ww...f....
..ww.w.....ww.www.w.w.wwwwwww..w
wwww...www.......f..w.......w...
ra..wwfwwwwwwfwwwwwwwwwwwww.w.e.
a...........................w...`,
  map`
wwwwwwwwwwwwww
w.f.f.w.f....w
w.f.f.f.w..a.w
wpf.w.f.f.ar.e
w.f.f.w.w..a.w
w.f.f.f.f....w
wwwwwwwwwwwwww`,
  map `
wwwwwwwwwwwwww
w..d..d..dw.dw
..f...w..f..w.
pw.w.f..w.wf.e
..w...w..f..f.
w..d..d..d..dw
wwwwwwwwwwwwww`,
  map`
...w..f..e..w
w..ff.wf.f..w
.vdw..w...wfw
..w.ffwfw..fw
f..f..w..fffw
w.f.f.wf..f.w
.f....w..f..w
wwwwwww.f.w.w
..f..w.w..wfw
www..w..w...w
p.f..f....f.w
ww..w.f.ff..w
.w.f...w....w
wwwwwwwwwwwww`
];

// set the map displayed to the current level
const currentLevel = levels[level];
setMap(currentLevel);

// make sure the level exists before we load it
if (currentLevel !== undefined) {
  clearText("");
  setMap(currentLevel);
}

setMap(levels[level])

setPushables({
  [ player ]: [fake],
  [ fake ]: [fake]
})

//player movement
onInput("s", () => {
  getFirst(player).y += 1
})

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})


//resets the game.
onInput("k", () => {
  clearText();
  level = 0;
  setMap(levels[0]);
})


  //checks stuff after every input. 
afterInput(() => {

  //checks if player is over is over the end tile.
  const win = tilesWith(end, player).length;
  const stop = tilesWith(fake, end).length;
  const dead = tilesWith(player, devil).length;
  const know = tilesWith(player, askB).length;
  const lies = tilesWith(player, askD).length;

  if(win >= 1)
  {
    level = level + 1;
    
    if (level < levels.length)
    {
      clearText();
      setMap(levels[level]);
    }

    //says you win if it is the last level.
    if (level == 6)
    {
      clearText();
      addText ("You Win! for now...", {y: 5,color: `5`});
    }
  }

  

  // stops goal from working on level 2 if fake block is there.
  if( stop == 1 & level == 1) 
  {
    clearTile(8,6);
    addSprite(8,6,broken);
  }

  //stops goal from working on level 3.
  if( stop == 1 & level == 2)
  {
    clearTile(24,7);
    addSprite(24,7,broken);
  }

  //stops goalform working on level 6.
  if (stop == 1 & level == 5)
  {
    clearTile(9,0);
    addSprite(9,0,broken);
  }
  

  if( know == 1 & level == 2) // activates the foreseer in level 3.
  {
    addText("They lie!!!!", {y: 4, color: `4`})
    addSprite(5,18,devil); // blocks way out
    clearTile(1,16); //opens secret passage to exit.
  }

  if(know == 1 & level == 3) // activates foreseer in level 4.
  {
    clearText();
    addText("We are trapped here", {y: 4, color: `4`});
    addText("for eternity", {y:5, color: `4`});
  }

  if(lies == 1 & level == 5) //activates the demons talk in level 6.
  {
    clearText();
    addText("We shall keep ", {y:5, color: `9`});
    addText("you here!", {y:6, color: `9` });
  }
  

  //kills
  if(dead == 1)
  {
    clearText();
    addText("You Died", { y: 5, color: `3`}) // tells player game is over.

    if(level == 1) // gets rid of player on the second level.
    {
      clearTile(1,10);
      clearTile(17,0);
    }
    if(level == 2)// gets rid of player on the third level.
    {
      clearTile(8,7);
      clearTile(12,10);
      clearTile(21,2);
      clearTile(5,18);
    }
    if(level == 4) //gets rid of player on the fifth level.
    {
      clearTile(3,1);
      clearTile(3,5);
      clearTile(6,1);
      clearTile(6,5);
      clearTile(9,1);
      clearTile(9,5);
      clearTile(12,1);
      clearTile(12,5);
    }
    if(level == 5) //gets rid of player on the sixth level.
    {
      clearTile(2,2);
    }
  }

  
})
