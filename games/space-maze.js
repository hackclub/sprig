
/* 
@title: space_maze
@author: klumey
@tags: ['space', 'maze', 'puzzle', 'alien']
@addedOn: 2024-08-31

----------------------CONTROLS--------------

w,s,a,d - to move
j - reset current map if stuck
i - collect an item
k - use an item

----------- ABOUT GAME ----------

You are an alien flying through space mazes! Space is filled with all types of dangers, don't fall into black holes or step into rips in space and time!
Try to escape those so you can get to the planet. 
After landing, you're job is to abduct cows! Only after getting all of them, you can fly away on your space ship. 
But beware! You start getting hungry - eat apples to finish your job and not starve!

This game has 36 levels, every one is different and difficulty may differ between them. 

Have fun!

*/


// ------------objects and bitmaps ------------
    let player = '';
    const shipGoal = "i"
    const fence = "e"
    const ship = "z"
    const alien = "l"
    const space = "x"
    const planet = "k"
    const asteroid = "a"
    const gate = "g"
    const crystal = "c"
    const spacerock = "s"
    const blackhole = "b"
    const crack = "r"
    const spacerip = "y"
    const blWormhole = "!"
    const rdWormhole = "?"
    const arrowPointDown = "d"
    const fakePlanet = "f"
    const groundBg = "h"
    const cow = "q"
    const house = "j"
    const apple = "o"
    const alienPic = bitmap`
................
................
.....4....4.....
......4444......
......44444.....
.....400400D....
.....400400D....
......44DDD.....
.....4444444....
....44444444D...
....4444444DD...
....444444DDD...
.....44DDDDD....
................
................
................`;
    const shipPic = bitmap`................
................
................
....DD444DD.....
...DD111L0D4....
.4DD41111LLD4...
4DL1D141414L4D4.
D11L11D1D1L000DD
4111LLLLLLLLL004
DD11111L1LLL0004
.44DLLLLLL000DDD
...DDDD4444DDD..
................
................
................
................`;
setLegend(
  [shipGoal, bitmap`
................
................
....DD444DD.....
...DD111L0D4....
.4DD41111LLD4...
4DL1D141414L4D4.
D11L11D1D1L000DD
4111LLLLLLLLL004
DD11111L1LLL0004
.44DLLLLLL000DDD
...DDDD44D4DDD..
.....4DDD4......
....4DD4D4D.....
....4D444D4.....
...D4D4D4D4D....
................`],
  [ ship, shipPic],
  [ alien, alienPic],
  [ apple, bitmap`
.......C........
......CC..D4....
......C.DD44....
......CDD44.....
...6693CD433....
..69999333333...
..96333333223...
..99333333323...
..69393333333...
..93333333323...
..99333333333...
...9393333333...
...333333333....
.....33333......
................
................`],
  [ space, bitmap`
0000100000001000
0000000000010100
0000000000001000
0000000000000000
0100000000000000
1010000100000000
0100000000000010
0000000000000000
0001000000000000
0000000000000000
0000000000000000
0000000000000000
0001000000001000
0011100000000000
0001000010000000
0000000000000000` ],
  [ asteroid, bitmap `
................
....22121L1L....
...211L11LLLL...
..222LLLLLL1LL..
.22111LLLLLLLLL.
.211L1LL11LLLLL.
.2211LL11LLL1LL.
.211LLL111L1LLL.
.221LLLLLLLL1LL.
.21111LL1LLLLLL.
.2111L1LLLL1LLL.
.2211LLLLL1LLLL.
.22121L1LL11LL..
...2111LLLLLL...
....2221LL1L....
................`],
  [planet, bitmap`
................
.....933C3C.....
...9939933CCC...
..6669939333CC..
.699999993933CC.
.6699669333333C.
.996669999393CC.
.6696993339933C.
.66999999933CCC.
.999996999939CC.
.6669969939333C.
.69996933333CCC.
..66999999C33C..
...69996693CC...
....66633CCC....
................` ],
  [gate, bitmap`
.....269CC2.....
.....2CFFC2.....
.....2CFFC2.....
.....29CCC2.....
....22CFFC22....
...29CC00CCC2...
..29CLL11LLCC2..
..260L1111L0C2..
..29CLL11LLCC2..
...29CC00CCC2...
....22CFFC22....
.....29FFC2.....
.....269CC2.....
.....2CFFC2.....
.....2CFFC2.....
.....269CC2.....`],
  [crystal, bitmap`
7..7..7...777..7
..7757HHHH55...7
...75HH828H57.7.
..75HH8H888857..
.75HH88H2888H57.
..HHH88H28888H7.
.7HH88H22888887.
75H88H28H2888H57
75HH2H28H28H2857
75H882288222887.
.5H88H28H288887.
7.HHH8H22888885.
..7HHH8H2888H75.
7755HH8H28885...
.7.77HHH28H57...
7..7.7HHHH5577..`],
  [spacerock, bitmap`
................
...22222222222..
..2211111111122.
.221LL1111111122
.21L1LLLL11L1112
.2LLLLL1LLL11112
.2LLLLLLL1LL1112
.2LL1LLLLLL1LL12
.2L1LLLLLLLLL112
.2LL1LLL1LLLLL12
.2LLLLL1L1L1LL12
.2LLLLLL1LLLLL12
.2LLLLLLLLLLL1L2
.22LLLLLLLLLLL22
..22LLLLLLLLL22.
...22222222222..`],
  [blackhole, bitmap`
................
................
....99666699....
...9662222669...
..622200002266..
66220000000226..
992000000000226.
966000000000029.
396966000000026.
.999969666902299
..92093336696669
..92000099993393
..662200000269..
...6622222226...
.....9966966....
................`],
  [crack, bitmap`
................
.............1..
........L...11..
........LL..L1..
.......L0..1L...
........L11LL...
........L10L....
........00L.....
.LLLL.11L1......
...LL010L1......
....1L0L1.......
....LL110LL.....
...1L1..L0......
...11....LL.....
.LL1............
................`],
  [spacerip, bitmap`
.....L.........0
.L0.L.....LL.LLL
..0LL.70LLL0LL0.
..L..L777HHHH0..
..LL00HH7888H00.
...L0HH8788HH00.
.LL0H888778HHL..
.L777755788H0L..
.7777HH788HHLL0L
LLH8757788H0L..0
.0H878887HHLL...
.0888HHH700L....
.088HHH00LL.....
L0HHH0L0LLL.....
LLLLLLL....0LL0.
L0.........0L...`],
  [blWormhole, bitmap`
....2155777.....
.7.27HH55577.2..
...25HH55557272.
...25H5HHH557.7.
7.71HH555HH57...
..25555555H51...
..7255HHH5HL7.7.
2..755H5H5117.7.
77.275H555755.2.
.72577HH555557..
.777555H55H572..
.7.55H5555H57...
..7.5HHHHHH72...
.77775555777....
.7..227755.7..7.
..7....77772....`],
  [rdWormhole, bitmap`
....2833888.....
.8.283333388.2..
...833993338282.
..88393399338.8.
8.88993333938...
.8239333333388..
..83333993388.8.
2..8339339888.8.
88.2839939833.2.
.8238839393338..
.8883333393382..
.8.3393339338...
..8.339993382...
.88883333888....
.8..228833.8..8.
..8..8.88882....`],
  [arrowPointDown, bitmap`
................
.....66666......
.....66666......
.....66666......
.....66666......
.....66666......
.....66666......
.....66666......
.6666666666666..
..66666666666...
...666666666....
....6666666.....
.....66666......
......666.......
.......6........
................`],
  [fakePlanet, bitmap`
................
.....933333.....
...9939933333...
..666993993333..
.69999999393333.
.66996693333333.
.99666999939333.
.66969933399333.
.66999999933333.
.99999699993933.
.66699699399333.
.69996933333333.
..669999999333..
...6999669333...
....66633333....
................` ],
  [ groundBg, bitmap`
8888888888888888
8688888888888688
8898888688888988
8888888988888898
8888889888688888
8866888888968888
8868888888898888
8898888888888888
8988888688888868
8888888688888868
8888889888688988
8898888988888888
8888888888868888
8886888888889888
8898888688888888
8888888888888888` ],
  [ cow, bitmap`
................
................
..........1111..
.........1122F1.
....11111122021.
.111120022022C1.
1100022200002281
1200002220000081
120002222220111.
0122222200221...
0110288202201...
1.12218111201...
..122111.1221...
..101....1101...
..111.....11....
................` ],
  [fence, bitmap`
.CCC..........C.
CCFFC......CCCCC
CF1FFC...CCCFFCC
CCFFFFCCCCCFF1FC
.CFFFFFCCCFFFFFC
..CFFCCCFCCFFFCC
...CCCFFFFCFFCC.
..CCCCFFFFCCCC..
.CCCFCCFFFCCC...
CCCFFCCCFFCCFCC.
CFFFFFCCCCCFFFCC
CFFFFFCCCCFFFFFC
FF1FFCCC.CCFF1FC
CFFFCC....CCFFFC
.CCC.......CCFFC
............CCC.`],
  [house, bitmap`
................
................
................
...CC.333C......
...CC33333C.....
...CC33333CC....
..3333333CCCCC..
.33333CCCCCCCC..
.3CCCCCCCCCCCCC.
...2221211211...
...2752222751...
...2772221771...
...2752CC2751...
...2222FC2111...
...2212CC1211...
................`],
)
setSolids([ship,alien,asteroid,gate,spacerock,fence])
setPushables({
    [ spacerock ]: [spacerock],
	[ alien ]: [spacerock],
    [ ship ] : [spacerock],
})

//---------------controls-------------------------------

  onInput("w", () => {
    const alienSprite = getFirst(alien)
    if (alienSprite) {
      getFirst(alien).y -= 1;
      alienY = getFirst(alien).y;
    }
    else {
      getFirst(ship).y -= 1;
      shipY = getFirst(ship).y;
    }
    playTune(moveSound);
  })
onInput("s", () => {
    const alienSprite = getFirst(alien)
	if (alienSprite) {
      getFirst(alien).y += 1;
      alienY = getFirst(alien).y;
    }
    else {
      getFirst(ship).y += 1;
      shipY = getFirst(ship).y;
    }
    playTune(moveSound);
})
onInput("a", () => {
   const alienSprite = getFirst(alien)
  if (alienSprite) {
      getFirst(alien).x -= 1;
      alienY = getFirst(alien).x;
    }
    else {
      getFirst(ship).x -= 1;
      shipY = getFirst(ship).x;
    }
  playTune(moveSound);
})
onInput("d", () => {
   const alienSprite = getFirst(alien)
  if (alienSprite) {
      getFirst(alien).x += 1;
      alienY = getFirst(alien).x;
    }
    else {
      getFirst(ship).x += 1;
      shipY = getFirst(ship).x;
    }
  playTune(moveSound);
})

// ------------ lv reset -------
onInput("j", () => {
  playerDeath();
});

// ---------------levels/maps ------------------------
let level = 0;
const levels = [
  map`
z.
.k`, //0 - space
  map`
l...
....
q..i`, // 1     - planet
  map`
.aa..
.....
...a.
..a..
zak..`, //2 - space 
  map`
lei..
.e.q.
..ee.
..q..`, // 3     - planet
  map`
za.k
sa.a
.s..
.a..`, //4  - space 
  map`
leeei
q.qe.
...j.
q.qe.
.e...`, //5    - planet
  map`
zsss.
ssss.
ss...
.sss.
s.ska`,//6 - space 
  map`
ljeoq.qjeji
.qej.e..eq.
j.e..ejqe.j
q.eqje..e.q
.je..e.jej.
.qej.eq.e..
j.e.qej.e.j
o.q.je.q.qo`,//7     - planet
  map`
..a...
....ad
.aa.ac
...aaa
aa.aka
z..g..`,//8 - space 
  map`
.l...q..j
jejejej.o
eq...q...
..jejejej
o..q...qe
ejejeje..
j.q...q.o
..ejejeje
q...q..qi`,//9     - planet
  map`
.....az..a.
aa.a.aaa.a.
...a...a...
.aaaaa.aaa.
.....a.a.a.
.aaa.a.a.a.
.a...a...a.
.a.aaa.aaa.
.a.akg.a...
.a.aaaaa.aa
ca.........`,//10 - space 
  map`
...qeej.l
.q....e..
o..q.o.e.
.q...q.e.
......ie.
..q.q.ej.
q.....e..
.oq.e....`,//11    - planet
  map`
..z..
.aaa.
.kab.`,//12 - space
  map`
.....j...j
lj........
eeeeeeee..
q...q....o
..q....ej.
......qeo.
o......e..
j..q...ej.
......qei.`,//13    - planet
  map`
..ba...ba.
a.aa.a.aaa
as...a....
asaaaaaaa.
....aka.a.
.a..a.b.a.
.aa.a..sa.
.ba.aaasa.
aaasaba.s.
z...a.s...`,//14 - space 
  map`
l........
...q.o.q.
.........
q..q....q
.......o.
q.....q..
.o..q...i`,//15     - planet
  map`
ca...rs..a
.a.aaaa.a.
.ar.a.a.a.
...s..a...
ba.saaa.aa
aaa.abs...
a.rs.asaa.
a.asaa...r
a..aza.aab
a....a.g.k`,//16 - space 
  map`
l......j
ejeejeo.
q....oe.
...q.ej.
....ej..
o.......
.qe..q..
.ej....o
eeeeeej.
i.......`,//17    -planet
  map`
.g.a.......
.a..saaaaa.
ra.a.a.s.a.
.aaaaaaa.r.
kaca...aaa.
aa.a.a.a...
...aaasr.aa
.aaa.asaaaz
.a..sa...a.
.a.a.aaara.
...a.......`,//18 - space 
  map`
.q....
.....j
...q..
.qj.q.
.....j
.li.q.`,//19    -planet
  map`
!ab.k
.a...
.a.aa
za..?`,//20 - space 
  map`
.....qj....
.q.....o...
.........q.
....eeej...
....li.e...
...e...e...
...e...e...
q..jeeejq..
...........
....o.q....`,//21    -planet
  map`
a.s.....a..b
a.aaaas.a.aa
a.r..as.a.ak
baaa.a....a.
..r..aaa..a.
aaaaraba..a.
..ca...ab.g.
.aaa.a.aaaaa
?a...ar..baz
aa.araaa.aa.
!..a..ba....`,//22 - space 
  map`
o.q..q
......
q...q.
eeee.j
il....`,//23    -planet
  map `
.r.gka!.
.aaaaaa.
.?a...a.
aaa.a.s.
....a...
.aaaaaa.
.a....a.
..saa.ac
.s.az.ab`,//24 - space 
  map`
j.jq.i
....lj
jq....
....qj
jq....
.j.j.j`,//25    -planet
  map`
.i.
d..
kaf`,//26 - space 
  map`
....l.i.
.joj.j.j
q...q...
j.j.j.j.
.q....q.
.j.joj.j
.q.....q
j.jqj.j.`,//27    -planet
  map`
.....r.c.
.aaaaaaar
....sb.a!
.aaa.aaaa
..fa.akg.
.aaa.aaa.
.a?.sa...
.aaa...a.
..za..baf`,//28 - space 
  map`
.ji.lj...
...j..oj.
.j...j...
...j...j.
qj...j...
...j...j.
.j...j...
...j..ojq`,//29   -planet
  map`
z..a......ab.b
aa.a.aaaa.a...
...a....a.r.af
s.aaa.a.aaaaaa
...r..a.a.....
.aaaaaa.a.aaas
.a..afa...afs.
raf.a.aaaaa..b
.ss......fa.aa
b..ab....ba..k`, //30 - space 
  map`
..i....
.......
...l...
e.eeeee
....q..
.......
.q.....`,//31      -planet
  map`
..faf.r....a...
...aaaa..a.aaa.
fa.a.....a.a...
aara..aa.a...a.
...aa..aaaaaaa.
.a...ss..ba.s..
.a.aaaaaaaa.saa
.afa....za...a.
.aaa.aaaaa.aaa.
.....a...a...a.
raaaaa.a..aa...
.a...a.aa....aa
ba.s...ra..aak.
aa.aaaa.araf...
c..r.faba.g...b`, //32 - space 
  map`
..o...
...q..
q.....
eeeee.
q.....
.il.e.
....e.`, // 33   -planet
  map`
.za...a....a.....
.ab.a.a.ba.a.baa.
....a....a.a.a...
aaaaaaaa.a.a.a.aa
...s...a.a...a...
..aaaa.aaaaaaa.a.
.af.ra.......a.a.
.aaa..raaaaa.aab.
...aaaaa?a.ss....
sa....ab...aaaaa.
..aab.aaaaaa...a.
...a..a...a..as.b
aa.a.aa.a.a.aa...
...a....a.a..aaar
raaaaaaaa.aa.b...
.a.......r!a.ak..
.b.aaaabaaaa.aaaa
fa...............`,//34 - space 
  map`
l......
i...q..
..o..q.
.....q.
....q..
.....q.
..o..q.
....q..`, //35    -planet
  map`
............
............
.....ccc....
....c...c...
...c...ccc..
...c..c..zc.
.ccc..c...c.
.ckc..c...c.
.ckc...ccc..
.ckc.....c..
.ccc.ccc.c..
...c.c.c.c..
...ccc.ccc..`,//36 - space 
];
const startScreen = [
  map`
......
......
......
......
......`
];
const endScreen = [
 map`
......
......
......
......
......`,
];



//------------------- music and sounds ------------

const moveSound = tune`
142.85714285714286: A4^142.85714285714286,
4428.571428571428`
const crysSound = tune`
134.52914798206277: G5/134.52914798206277,
134.52914798206277: B5/134.52914798206277,
4035.874439461883`
const deathSound = tune`
192.30769230769232: F4^192.30769230769232,
192.30769230769232: G4^192.30769230769232,
192.30769230769232: F4^192.30769230769232,
192.30769230769232: E4^192.30769230769232,
192.30769230769232: D4^192.30769230769232,
5192.307692307692`
const gateOpenSound = tune`
163.9344262295082: E4-163.9344262295082,
163.9344262295082: E4-163.9344262295082,
163.9344262295082: C4-163.9344262295082,
4754.098360655738`
const nextLvSound = tune `
176.47058823529412: D5^176.47058823529412,
176.47058823529412: E5^176.47058823529412,
176.47058823529412: F5^176.47058823529412,
176.47058823529412,
176.47058823529412: A5^176.47058823529412,
176.47058823529412: B5^176.47058823529412,
4588.235294117647`
const winSound = tune `
156.25: B4~156.25 + C5^156.25,
156.25: C5~156.25 + D5^156.25,
156.25: E5~156.25 + F5^156.25,
156.25: C5~156.25 + D5^156.25,
156.25: D5~156.25 + E5^156.25,
156.25: C5^156.25 + B4~156.25,
4062.5`
const portalSound = tune`
909.0909090909091: C5~909.0909090909091,
28181.818181818184`
const cowSound = tune`
157.06806282722513: D4/157.06806282722513,
157.06806282722513: E4/157.06806282722513,
157.06806282722513: E4/157.06806282722513,
4554.973821989529`
//--------------------------------------------
let shipPosX;
let shipPosY;
let alienPosX;
let alienPosY;
let hunger;
let crystals = 0;
let stepCount = 0;
let previousX = 0;
let previousY = 0;
let gateCoordinates = { x: 0, y: 0 };
let shipSprite = getFirst(ship);
let cowsFinal = 0; 
let cowsCurrent = 0;

// ------------------------ functions ------------------------------------

function changeHoleWhenStepped (x, y, changedSprite)
  {
    if (x >= 0 && y >= 0) {
    //check if tile that player is standing on contains sprite - crack
        let crackRemove = getTile(x, y).find(sprite => sprite.type === crack);
        if (crackRemove) {
            crackRemove.remove();
            addSprite(x,y,changedSprite)
          }
      }
  }
function playerDeath ()
  {
    playTune(deathSound);
    clearText();
    stepCount = 0;
    previousX = 0;
    previousY = 0;
    crystals = 0;
    hunger = 20;
    cowsCurrent = 0;
    setMap(levels[level]);
    gateCoordinates = { x: 0, y: 0 };
    if(level%2 != 0)
    {
      addText("Lv:" + (level),{
           x:1,
           y:1,
        color: color`5`})
      let alienSprite = getFirst(alien);
    alienPosX = alienSprite.x;
    alienPosY = alienSprite.y;
    }
    if(level%2 == 0)
    {
      addText("Lv:" + (level),{
           x:1,
           y:1,
        color: color`8`})
      let shipSprite = getFirst(ship);
    shipPosX = shipSprite.x;
    shipPosY = shipSprite.y;
    }
    
  }
function stepOnPortal ()
  {
    const onBluePort = tilesWith(blWormhole, ship)
    const onRedPort = tilesWith(rdWormhole, ship)
    //console.log("red worm:", onRedPort.length)
    if(onRedPort.length == 1)
    {
      //console.log("blue worm:", getFirst(blWormhole).x, getFirst(blWormhole).y)
      playTune(portalSound);
      getFirst(ship).x = getFirst(blWormhole).x;
      getFirst(ship).y = getFirst(blWormhole).y;
    }
    //console.log("blue worm:", onBluePort.length)
    if(onBluePort.length == 1)
    {
      //console.log("red worm:", getFirst(rdWormhole).x, getFirst(rdWormhole).y)
      playTune(portalSound);
      getFirst(ship).x = getFirst(rdWormhole).x;
      getFirst(ship).y = getFirst(rdWormhole).y;
      //console.log("ship's coordinates(x,y):", getFirst(ship).x, getFirst(ship).y)
    }
  }

// -------------------- start screen -------------------------
player = ship;
setMap(startScreen[0])
  setBackground("x");
/*addText("Lv:" + (level),{
           x:1,
           y:1,
        color: color`8`})*/
addText("Welcome! ",
            {
              x:6,
              y:1,
              color: color`6`
            })
addText( "Tip - press:",
            {
              x:4,
              y:3,
              color: color`6`
            })
addText( "i: collect\n crystals",
            {
              x:3,
              y:5,
              color: color`6`
            })
addText( "k: use\n crystal",
            {
              x:3,
              y:8,
              color: color`6`
            })
addText( "w,s,a,d: move",
            {
              x:3,
              y:11,
              color: color`6`
            })
addText( "\nj: Start playing!!\n   (reset level)",
            {
              x:1,
              y:12,
              color: color`6`
            })


//--------------------after input-------------------------

afterInput(() => {

// -------------- level with alien ------------------
  if(level%2 != 0)
  {
    if (level>=7)
    {
      hunger--;
      if( hunger < 10)
      {
      hunger = '0' + hunger;
      }
      addText( "Hunger:" + hunger,
            {
              x:0,
              y:3,
              color: color`6`
            })
      if(hunger==0)
      {
        playerDeath();
      }
    }
    
    let alienSprite = getFirst(alien);
    previousX = alienPosX;
    previousY = alienPosY;
    alienPosX = alienSprite.x;
    alienPosY = alienSprite.y;
    stepCount += 1;
    if (alienPosX >= 0 && alienPosY >= 0) {
    //check if tile that alien is standing on contains sprite - cow
        let cowToRemove = getTile(alienPosX, alienPosY).find(sprite => sprite.type === cow);
        if (cowToRemove) {
            cowToRemove.remove();
            playTune(cowSound);
            cowsCurrent += 1;
             console.log("Cows this Lv:" , cowsCurrent);
          console.log("Cows fin:" , cowsFinal);
      }
      let appleToRemove = getTile(alienPosX, alienPosY).find(sprite => sprite.type === apple);
        if (appleToRemove) {
            appleToRemove.remove();
            hunger=20;
      }
    }
    addText( "Cows:" + cowsCurrent,
            {
              x:13,
              y:1,
              color: color`5`
            })
    const howMuchCows = tilesWith(cow)
    if(howMuchCows == 0)
    {
          const  onShip = tilesWith(shipGoal, alien)
  if ( onShip.length >= 1){ 
    level +=1;
    if (level < levels.length) { 
      playTune(nextLvSound);
      setMap(levels[level]);
      setBackground("x");
      cowsFinal += cowsCurrent;
      cowsCurrent = 0;
      stepCount = 0;
      clearText();
      addText("Lv:" + (level),{
           x:1,
           y:1,
        color: color`8`})
      //reset the gate coordinates after changing map
      gateCoordinates = { x: 0, y: 0 };
      }
    }
  }
    }
    const onHouse = tilesWith(alien, house)
    if(onHouse.length ==1)
    {
      playerDeath();
    }
    // ------------------------------ win!!!!! --------------



  
// --------------------------- level with ship ---------------------------
 if(level%2 == 0) 
 { 
    //console.log("ship's prev coordinates(x,y):", previousX, previousY);

///----------------ship position ---------------------
  let shipSprite = getFirst(ship);
  previousX = shipPosX;
  previousY = shipPosY;
  shipPosX = shipSprite.x;
  shipPosY = shipSprite.y;
  //console.log("ship's coordinates(x,y):", shipPosX, shipPosY); 
  stepCount += 1;

// ----------------change crack to spaceRip and damage handling ------------
  
  changeHoleWhenStepped (previousX,previousY,spacerip);
  const onRip = tilesWith(ship, spacerip)
  if(onRip.length ==1)
  {
    playerDeath();
  }  

// ------------------------- wormholes!!!!!!!!!!!!-----------
 
stepOnPortal();
  
//------------------ collecting the crystal ---------------
  if (level==13)
  {
    addText( "Choose the real one",
            {
              x:1,
              y:4,
              color: color`7`
            })
  }
  if (shipPosX >= 0 && shipPosY >= 0) {
    //check if tile that ship is standing on contains sprite - crystal
        let spriteToRemove = getTile(shipPosX, shipPosY).find(sprite => sprite.type === crystal);
        if (spriteToRemove) {
           onInput("i", () => {
            playTune(crysSound);
            spriteToRemove.remove();
            if(level==8){
              let arrowRemove = getFirst(arrowPointDown);
              arrowRemove.remove();
            }
            crystals += 1;
             console.log("Crystals:" , crystals);
      
          })
      }
    }
  
// --------------------- opening the gate with crystal -----------------------
  if(crystals > 0 && level!=18)
  {
    //get coords of the first gate visible on map
    let gateSprite = getAll("g")[0];
    //new coordinates
    gateCoordinates.x = gateSprite.x;
    gateCoordinates.y = gateSprite.y;
    //calculate the distance
    let gateDisX = Math.abs(gateSprite.x - shipPosX);
    let gateDisY = Math.abs(gateSprite.y - shipPosY);
    console.log("ship - gate coordinates(x,y):", gateDisX, gateDisY);
    //check if ship is standing next to the gate
    if(gateDisX <= 1 && gateDisY <=1 ){
      //check if coordinates are only for this map
      if (gateSprite.x === gateCoordinates.x && gateSprite.y === gateCoordinates.y) {
        onInput("k", () => {
          playTune(gateOpenSound);
          //use new coordinates and clear tile with the gate
          clearTile(gateCoordinates.x, gateCoordinates.y);
          crystals = 0;
          console.log("Crystals:", crystals);
        })
    }
    }
  }

  
  //--------------------------Lv 3 - step counter------------------------------

  if(level==12 || level==14 || level==34)
  {
    let maxSteps = 100
    if (level==14){ maxSteps = 41}
    if (level==12){ maxSteps = 5}
    if (level==34){ maxSteps = 133}
    let remainingSteps = maxSteps - stepCount;
    if( remainingSteps < 10)
    {
      remainingSteps = '0' + remainingSteps;
    }
    addText("Steps left:" + remainingSteps, { y: 4, color: color`4` });
    console.log("steps left:" + (maxSteps - stepCount));
    if( stepCount > maxSteps )
    {
      playerDeath();
    }
  }
  
//------------------------------------------------------------
  const onFake = tilesWith(ship, fakePlanet)
    if(onFake.length ==1)
    {
      playerDeath();
    }
  
  //checking if ship stepped on a black hole, then restarting the level
  
  const onBlackHole = tilesWith(ship, blackhole)
  if(onBlackHole.length ==1)
  {
    playerDeath();
  }

  // check if stepped on a planet - then win screen or proceed to the next level
  const  onPlanet = tilesWith(ship, planet)
  if ( onPlanet.length >= 1){ 
    level +=1;
    if (level < levels.length) { 
      playTune(nextLvSound);
      setMap(levels[level]);
      setBackground("h");
      stepCount = 0;
      clearText();
      addText("Lv:" + (level),{
           x:0,
           y:1,
        color: color`5`})
      //reset the gate coordinates after changing map
      gateCoordinates = { x: 0, y: 0 };
      }
    else {
      playTune(winSound);
      clearText();
      setMap(endScreen[0]);
      addText("You win!\n", { y: 3, color: color`6` });
      addText("Abducted: " + cowsFinal + " cows", {y:5, color: color`8`});
      addText("Thanks for playing!", { y: 8, color: color`6` });
      addText("Made by: klumey", {y:10, color: color`6` });
      }
    }
 }
})
