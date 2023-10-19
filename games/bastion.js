/*
Bastion:
Simple Fireboy/Watergirl styled game with a few more obstacles (but isn't completely puzzle yet!).

by de-y (Dheeraj)

This is a 2-player game that uses both the WASD keys & JIKL keys for controlling either fireboy (JIL) or watergirl (WAD).
Remember that you can change anything in this code!
*/

// Music as usual
const music = tune`
121.95121951219512: F4~121.95121951219512 + D5^121.95121951219512 + C4/121.95121951219512,
121.95121951219512: D4~121.95121951219512,
121.95121951219512: C5^121.95121951219512,
121.95121951219512: A4~121.95121951219512 + D4-121.95121951219512,
121.95121951219512,
121.95121951219512: C4-121.95121951219512 + B4/121.95121951219512,
121.95121951219512: E5-121.95121951219512,
121.95121951219512: C4/121.95121951219512,
121.95121951219512,
121.95121951219512: A4^121.95121951219512,
121.95121951219512,
121.95121951219512: F5~121.95121951219512 + F4-121.95121951219512,
121.95121951219512: D4/121.95121951219512,
121.95121951219512: F4-121.95121951219512 + B4^121.95121951219512 + D5-121.95121951219512 + F5^121.95121951219512 + C5~121.95121951219512,
121.95121951219512: D4/121.95121951219512,
121.95121951219512: C4-121.95121951219512,
121.95121951219512: F4-121.95121951219512,
121.95121951219512: A4~121.95121951219512 + C5^121.95121951219512,
121.95121951219512: D4/121.95121951219512,
121.95121951219512: G4-121.95121951219512,
121.95121951219512: C5~121.95121951219512,
121.95121951219512: D4^121.95121951219512,
121.95121951219512: G4-121.95121951219512 + C5-121.95121951219512,
121.95121951219512: F5/121.95121951219512 + D4/121.95121951219512 + B4-121.95121951219512,
121.95121951219512: A5^121.95121951219512,
121.95121951219512: C4^121.95121951219512 + G4-121.95121951219512,
121.95121951219512: D5/121.95121951219512 + G5-121.95121951219512,
121.95121951219512,
121.95121951219512: C4^121.95121951219512 + A4/121.95121951219512 + E4-121.95121951219512 + F5-121.95121951219512 + D5^121.95121951219512,
121.95121951219512: A5/121.95121951219512 + A4-121.95121951219512,
121.95121951219512: G4/121.95121951219512 + D5-121.95121951219512,
121.95121951219512: E5/121.95121951219512`

playTune(music,Infinity);

// Functions
try {
  function text(string,x,y,color){
    clearText()
    addText(string, {x: x, y: y,color: color}) 
  }
  function checkButtonPressed() {
      try {
      if(tilesWith(character,button).length == 1 || tilesWith(character2,button).length == 1) {
        // getFirst(blocked_door).y += 1
        console.log(getFirst(blocked_door))
        console.log(getFirst(blocked_door).remove())
      }
      else {
        getFirst(blocked_door).y -= 1
      }
    }
    catch (exceptionVar) {
      console.log("Skipping Button Press.")
    }
  }
  function checkIfWaterBoyDied(level) {
    if (tilesWith(character,lava).length == 1 || tilesWith(character,green_goo).length == 1 || tilesWith(character,spikes).length == 1 || tilesWith(character,spikes_upsidedown).length == 1) {
        console.log("Player 1(Waterboy) WASD died.");
        getFirst(character).remove()
        text('Player 1 died!\nRestarting level in \n3 seconds.',0,6,color`2`)
        level = level
        setTimeout(() => {setMap(levels[level]);    clearText()}, 3000)
        // level = level + 1
        // setMap(levels[level])
      }
  }
  function checkIfLavaGirlDied(level) {
    if (tilesWith(character2,water).length == 1 || tilesWith(character2,green_goo).length == 1 || tilesWith(character2,spikes).length == 1 || tilesWith(character2,spikes_upsidedown).length == 1) {
        console.log("Player 2(LavaGirl) IJKL died.");
        getFirst(character2).remove()
        text('Player 2 died!\nRestarting level in \n3 seconds.',0,6,color`2`)
        console.log(level)
        level = level
        setTimeout(() => {setMap(levels[level]);    clearText()}, 3000)
        // level = level + 1
        // setMap(levels[level])
      }
  }
  function fall(char) {
    try {
      checkIfWaterBoyDied(level)
      checkIfLavaGirlDied(level)
      checkButtonPressed()
      const player_tile_under = getTile(getFirst(char).x,getFirst(char).y + 1)
      if (player_tile_under.length < 1) {
        setTimeout(() => {getFirst(char).y += 1;}, 100)
        setTimeout(() => {fall(char)},150)
      }
      else {
        if (player_tile_under[0]['_type'] == 'l' || player_tile_under[0]['_type'] == 'y' || player_tile_under[0]['_type'] == 'g' || player_tile_under[0]['_type'] == 'd' || player_tile_under[0]['_type'] == 'e' || player_tile_under[0]['_type'] == 's' || player_tile_under[0]['_type'] == 't' || player_tile_under[0]['_type'] == 'b') {        
          try {
            setTimeout(() => {getFirst(char).y +=1;},100)
          }
          catch (exceptionVar) {
            console.log("Already dead, bypassing.")
          }
        }
      }
    }
    catch (exceptionVar) {
      console.log("Player is dead so...");
    }
  }
  
  
  // Character and Map Definitions
  const character = "p"
  const character2 = "q"
  const wall = 'w'
  const background = 'z'
  const lava = 'l'
  const water = 'y'
  const door1 = 'd'
  const door2 = 'e'
  const green_goo = 'g'
  const spikes = 's'
  const spikes_upsidedown = 't'
  const button = 'b'
  const button2 = 'a'
  const blocked_door = 'c'
  const fakeWall = 'f'
  const obviouslyFakeButRealWall = 'h'
  const obviouslyFakeIsFake = 'j'
  const fakeBlockedWall = 'x'
  
  setLegend(
    [character,bitmap`
  ................
  ................
  ................
  ......7777......
  .....755557.....
  ....75555557....
  ....75255257....
  ....75555557....
  ....75555557....
  .....755557.....
  ....75555557....
  ....75555557....
  ....75555557....
  .....757757.....
  .....757757.....
  ....75577557....`],
    [ wall, bitmap`
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
    [lava, bitmap`
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
  9999999999999999
  9999999999999999`],
    [water, bitmap`
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
  5555555555555555
  5555555555555555`],
    [background,bitmap`
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
    [character2,bitmap`
  ................
  ................
  ................
  ......9999......
  .....933339.....
  ....93333339....
  ....93033039....
  ....93333339....
  ....93333339....
  .....933339.....
  ....93333339....
  ....93333339....
  .....933339.....
  .....939939.....
  .....939939.....
  ....93399339....`],
    [door1, bitmap`
  ................
  ................
  ..CCCCCCCCCCC...
  ..CCCCCCCCCCC...
  ..CCCC555CCCC...
  ..CCC55555CCC...
  ..CCC55555CCC...
  ..CCC55555CCC...
  ..CCCC555CCCC...
  ..CCCCC5CCCCC...
  ..CCCCCCCCCCC...
  ..CCCCCCCCCCC...
  ..CCCCCCCCCCC...
  ..CCCCCCCCCCC...
  ..CCCCCCCCCCC...
  ..CCCCCCCCCCC...`],
    [door2, bitmap`
  ................
  ................
  ..CCCCCCCCCCC...
  ..CCCCCCCCCCC...
  ..CCCCCCCCCCC...
  ..CCC99999CCC...
  ..CCC99999CCC...
  ..CCC99999CCC...
  ..CCC99999CCC...
  ..CCC99999CCC...
  ..CCCCCCCCCCC...
  ..CCCCCCCCCCC...
  ..CCCCCCCCCCC...
  ..CCCCCCCCCCC...
  ..CCCCCCCCCCC...
  ..CCCCCCCCCCC...`],
    [green_goo,bitmap`
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
  DDDDDDDDDDDDDDDD
  DDDDDDDDDDDDDDDD`], 
    [spikes,bitmap`
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
  .......00.......
  ......0LL0......
  .....0LLLL0.....
  ....0LLLLLL0....
  ...0LLLLLLLL0...`],
    [spikes_upsidedown,bitmap`
  ...0LLLLLLLL0...
  ....0LLLLLL0....
  .....0LLLL0.....
  ......0LL0......
  .......00.......
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
    [button, bitmap`
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
  .......333......
  .......333......
  ......22222.....
  ......21112.....
  ......21112.....`],
    [button2, bitmap`
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
  .......444......
  .......444......
  ......22222.....
  ......21112.....
  ......21112.....`],
    [blocked_door, bitmap`
  7555775575555557
  5755757575555575
  5575775775555755
  5577575755557555
  5557557775575555
  5575757757755555
  5575577757755555
  5755557775575555
  5755557755557555
  7555557575557555
  5555577577755755
  5555757575575575
  5557557557557557
  5575575557555755
  5755575555755575
  7555575555755557`],
    [fakeWall,  bitmap`
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
    [obviouslyFakeButRealWall, bitmap`
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
    [obviouslyFakeIsFake, bitmap`
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
    [fakeBlockedWall, bitmap`
  7555775575555557
  5755757575555575
  5575775775555755
  5577575755557555
  5557557775575555
  5575757757755555
  5575577757755555
  5755557775575555
  5755557755557555
  7555557575557555
  5555577577755755
  5555757575575575
  5557557557557557
  5575575557555755
  5755575555755575
  7555575555755557`],
  )
  
  let level = 0
  const levels = [
      map`
..de.
..www
.w...
p.lyq
wwwww`,  // Level 0
      map`
  ...............
  ed.............
  wwwwwwwwwwww..w
  tttttttw.w...w.
  .........c..w..
  ....w....w.w...
  pggqwb...ww....
  wwwwwwwwww.....`,  // Level 1
      map`
wwwwwwww......wwwwwwww
.e...................d
wwwwwwwww.....wwwwwwww
wwwwwwww.w....wwwwwwww
wwwwwwww...w..........
wwwwwwww..www.....yy.p
.q..b.c..wwwwwb.yywwww
wwwwwwwwwwwwwwwwwwwwww`,   // Level 2
      map`
wwwwwwwwwww...........wwwwww
wwwwwwwwww..............wwww
wwwwwwwww...............wwww
wwwwwwwww..w.w.w.w......wwww
py...ll....yyyyyyyyy....wwww
wwww.wwwwwwwwwwwwwww....wwww
qll..yy.............ws......
wwwwwwwwww.w.w.w.w...w......
wwwwwwwwwwlllllllll.......ed
wwwwwwwwwwwwwwwwwwwwwwwwwwww`,  // Level 3
      map`
.......................
.......................
..w.w.w.w..w..w.w.w.w..
e.wgggggwp.w.qwggwg.w.d
wwwwwwwwwwwwwwwwwwwwwww`,  // Level 4 (5)
      map`
tttttttttt.
...........
...........
...w..w.w..
esgqpggggsd
wwwwwwwwwww`,
      map`
.......fffff
....f..fffff
wjwww..wwwfw
w.p.xdecbq.w
wwfwwwwwwwww`,
      map`
.....de.......
...wwwwwww....
wwj..ttt..wwjw
www.......jjjw
www.gp.qg.wwww
wwwwwwwwwwwwww`,
      map`
...........
.fwwwwwfww.
ffh......w.
www......w.
......wwww.
p...gggwde.
wwwwfjwwwww
q.........w
wwwwwwwwwww`,
      map`
.........................
.........d.e.............
g.gg....wwwww.........ggg
wjwws...w...f...sw....wjw
w..wwwwwwwwjwwwwww..ww..w
.w.f.w..f...w..w.w.w.w.ww
..ww..f.w...j.w..ww..ww.w
...wwwwwwwwwwwwwwwwwwwwww`,
      map`
..
pq
ww`,
  ]
  setBackground(background)
  setMap(levels[level])
  setSolids([character,wall, character2,blocked_door, fakeBlockedWall])
  setPushables({
    [ character ]: [],
    [character2]:[],
  })
  
  
  // Game Logic
  
  // Level 1 text:
  text('Welcome to Bastion!',0,0,color`2`)
  setTimeout(() => {text('This is just\nfireboy & watergirl.',0,0,color`2`)
  }, 2000);
  setTimeout(() => {text('Enjoy!',0,0,color`2`)
  }, 4000);
  setTimeout(() => {clearText()}, 6000);
  
  // Movement
  onInput("a", () => {
      try {
      getFirst(character).x -= 1
      fall(character)
    }
    catch (exceptionVar) {
      console.log("No moving!")
    }
  })
  
  // onInput("s", () => {
  //   getFirst(character).y += 1
  // })
  onInput("w", () => {
    try {
      getFirst(character).y -= 1
      setTimeout((getFirst(character).y -= 1), 300);
      setTimeout(() => {fall(character); checkIfWaterBoyDied(level)}, 500);    
    } catch (exceptionVar) {
      console.log("No moving!")
    }
  })
  onInput("d", () => {
    try {
      getFirst(character).x += 1
      setTimeout(() => {fall(character); checkIfWaterBoyDied(level)}, 1000);    
    } catch (exceptionVar) {
      console.log("No moving!")
    }
  })
  onInput("j", () => {
    try {
      getFirst(character2).x -= 1
      setTimeout(() => {fall(character2); checkIfLavaGirlDied(level)}, 1000);    
    }
    catch (exceptionVar) {
      console.log("No moving!")
    }
  })
  onInput("i", () => {
    try {
      getFirst(character2).y -= 1
      setTimeout((getFirst(character2).y -= 1), 200);
      setTimeout(() => {fall(character2); checkIfLavaGirlDied(level)}, 1000);    
    } catch (exceptionVar) {
      console.log("No moving!")
    }
  })
  // onInput("s", () => {
  //   getFirst(character).y += 1
  // })
  onInput("l", () => {
    try {
      getFirst(character2).x += 1
      fall(character2)
    }
    catch (exceptionVar) {
      console.log("No moving!")
    }
  })
  
  
  // Moving to next level
  afterInput(() => {
    if (tilesWith(character,door1).length == 1 && tilesWith(character2,door2).length == 1) {
      text('Great job!\nMoving onto level ' + (level + 1),0,6,color`2`)
      setTimeout(() => {level = level + 1; setMap(levels[level]);clearText()},1000)
      setTimeout(() => {text('Level:' + level, 0,0,color`2`)},1000)
    }
  })
  // Make buttons work
  afterInput(() => {
    checkButtonPressed();
  })
  // Death with lava & water
  afterInput(() => {
    checkIfWaterBoyDied(level)
    checkIfLavaGirlDied(level)
    // if (tilesWith(character,lava).length == 1) {
    //   console.log("Player 1(Watergirl) WASD died.");
    //   getFirst(character).remove()
    //   text('Player 1 died!\nRestarting level in\n3 seconds.',0,6,color`2`)
    //   setTimeout(() => {setMap(levels[level]);    clearText()}, 3000)
    //   // level = level + 1
    //   // setMap(levels[level])
    // }
    // else if (tilesWith(character2,water).length == 1) {
    //   console.log("Player 2(Fireboy) using IJKL died.");
    //   getFirst(character2).remove()
    //   text('Player w died!\nRestarting level in \n3 seconds.',0,6,color`2`)
    //   setTimeout(() => {setMap(levels[level]);    clearText()}, 3000)
    // }
  })
}
catch (exceptionVar) {
  console.log("Some error here.")
}
