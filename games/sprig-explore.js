/*
@title: sprig-explore
@author: moustache cat productions
@tags: [rpg]
@addedOn: 2025-04-10
*/
//for those wondering, this project makes little to no use of generative AI. i asked the editor's built in chatbot a few times for support and it did not help whatsoever so you can consider this project AI-free.
//this is my first time programming in JS so this code is also messy and undocumented, have fun!

const player = "p"
const grass = "g"
const tree = "t"
const npc = "n"
const path = "r"
const flower = "f"
const rockwall = "s"
const battery = "b"
const singlerock = "m"
const deadtree = "/"
const water = "w"
const sand = "-"
const inside = "="
const table = "_"
const computer = "c"
const microscope = "q"
const black = "l"
const darkforest = "&"
const quadtorque = "]"
const textbox = "4"
const uproof = "2"
const downroof = "3"
const siding = "^"
const street = "#"
const umbrella = "*";
const aminal = "%";

const sprigstart = tune`
222.22222222222223: C4 222.22222222222223,
222.22222222222223: F4 222.22222222222223,
222.22222222222223: A4 222.22222222222223,
222.22222222222223: G4 222.22222222222223,
222.22222222222223: F4 222.22222222222223,
222.22222222222223: C5 222.22222222222223,
222.22222222222223: B4 222.22222222222223,
222.22222222222223: A4 222.22222222222223,
222.22222222222223: G4 222.22222222222223,
222.22222222222223: E5 222.22222222222223,
222.22222222222223: D5 222.22222222222223,
222.22222222222223: C5 222.22222222222223,
222.22222222222223: B4 222.22222222222223,
222.22222222222223: A4 222.22222222222223,
222.22222222222223: G4 222.22222222222223,
222.22222222222223: C5 222.22222222222223,
222.22222222222223: B4 222.22222222222223,
222.22222222222223: A4 222.22222222222223,
222.22222222222223: G4 222.22222222222223,
222.22222222222223: F4 222.22222222222223,
222.22222222222223: E4 222.22222222222223,
222.22222222222223: D4 222.22222222222223,
222.22222222222223: F4 222.22222222222223,
222.22222222222223: G4 222.22222222222223,
222.22222222222223: F4 222.22222222222223,
222.22222222222223: D4 222.22222222222223,
222.22222222222223: D4 222.22222222222223,
222.22222222222223: C4 222.22222222222223,
222.22222222222223: C4 222.22222222222223,
222.22222222222223: C4 222.22222222222223,
222.22222222222223: C4 222.22222222222223,
222.22222222222223: C4 222.22222222222223`

const select = tune`
97.71986970684038: C4-97.71986970684038,
97.71986970684038: C4-97.71986970684038,
97.71986970684038: C4-97.71986970684038,
97.71986970684038: C4-97.71986970684038,
97.71986970684038: C4-97.71986970684038,
97.71986970684038: C4-97.71986970684038,
97.71986970684038: C4-97.71986970684038,
97.71986970684038: C4-97.71986970684038,
97.71986970684038: C4-97.71986970684038,
97.71986970684038: C4-97.71986970684038,
2149.8371335504885`

const failure = tune`
500: G4~500,
500: E4~500,
500: C4~500,
14500`

const collect = tune`
222.22222222222223: D5~222.22222222222223,
222.22222222222223: D5~222.22222222222223,
222.22222222222223: D5~222.22222222222223,
222.22222222222223: E5~222.22222222222223,
222.22222222222223: D5~222.22222222222223,
222.22222222222223: D5~222.22222222222223,
222.22222222222223: D5~222.22222222222223,
222.22222222222223: C5~222.22222222222223,
222.22222222222223: B4~222.22222222222223,
222.22222222222223: B4~222.22222222222223,
222.22222222222223: B4~222.22222222222223,
222.22222222222223: A4~222.22222222222223,
222.22222222222223: B4~222.22222222222223,
222.22222222222223: B4~222.22222222222223,
222.22222222222223: B4~222.22222222222223,
222.22222222222223: A4~222.22222222222223,
222.22222222222223: G4~222.22222222222223,
222.22222222222223: G4~222.22222222222223,
222.22222222222223: G4~222.22222222222223,
222.22222222222223: A4~222.22222222222223,
222.22222222222223: G4~222.22222222222223,
222.22222222222223: G4~222.22222222222223,
222.22222222222223: G4~222.22222222222223,
222.22222222222223: F4~222.22222222222223,
222.22222222222223: E4~222.22222222222223,
222.22222222222223: E4~222.22222222222223,
222.22222222222223: D4~222.22222222222223,
222.22222222222223: D4~222.22222222222223,
222.22222222222223: C4~222.22222222222223,
222.22222222222223,
222.22222222222223: C4-222.22222222222223,
222.22222222222223`;



let currentLevelMapY = 5;
let currentLevelMapX = 22;

let currentLevel = 1;

let currentPartOfDialogue = 0;

let oldX = 0;
let oldY = 0;

let AudioOn = true;


const NPCdialogues = ["", "Hello, welcome to ~explore! You're ~currently in the ~RP2040 gardens, a ~garden representing ~the CPU of ~your sprig! The ~guide to the ~north can help ~further if you ~need it. Have fun!~Oh yeah, by~the way, there's~this kid looking~for some help~over there", "This is the RP2040~chip. It is the CPU~of your sprig.~Everything~ in this world~comes through here~at some point.", "The trail north~will take you to~the outside of~the RP2040~chip. From there~you can travel~down out of the pi-~co. Outside, you'll~find the battery~hills, screen port,~speaker, and the~north and south~seismic research~bases.", "", "Hey, I'm~George!~I was looking for~my game when~this piece of…~whatever this is~fell from the sky.~Now I'm curious~I wanna see~what the rest~of it is.~Can you help~me find the~other pieces?", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "Welcome to the~battery hills.~Due to acid, this~tree is the only~growing thing here.~ I am the guard~of the tree.~If you attempt to~damage it, I will fine~you 1.3 air~dollars. Please~don't touch it.~Oh yeah, this thing~fell from the sky a few~minutes ago. Do you~want it?", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "hey dude, welcome~to the Sound Club.~come in and groove~out.~Wait,", "All the snacks are~gone but I can~teach you some-~thing about the~speaker instead!~The speaker~is an electro-~magnetic~coil attached~to a diaph-~ragm. When the~magnet is~energized,~it moves the~diaphragm,~which moves~the air to~produce~sound!~Isn't that~cool?", "this is an easter egg", "", "(ignores you and~keeps dancing)", "", "", "Welcome to the~west seismic~reseach base!~We normally moni-~tor the PCB~but all our~equipment~got knocked~out by a piece~of space~debris!~Wait, you're~LOOKING~for it?~Wow, great timing,~we were about~to toss it!", "Hey!~we share results w-~ith the east seismic~research base~to help under-~stand what makes~the shaking happen.~If you visit the~other base,~there pro-~bably won't be~anyone there.~We have oppo-~site sleep~schedules~so we can~always moni-~tor the data,~24/7!", "", "", "", "", "", "Oh hey there!~One of my friends~told me some-~body might be~coming down~this way.~That must be~you, right?~Anyway, the~path down here~will take you to~the outside of the~Pico. Go~left after that~for the West~Seismic~research base.~Go right~for the~battery hills,~the East~Seismic~reasearch base,~the Speaker,~and one of~the beaches.~Safe travels,~friend!", "", "52", "YOU SHALL ~NOTPA-oh~wait thats~the play~lines, sorry.~Welcome to~the Town of~the Screen~Port!~This is where~the signals fr-~om the Pico~get passed to~the other side~of the Sprig~to the screen~Wait, what?~You're here look-~ing for a~thing that~fell from the~sky?~Well, I can~let you~through then.~Have a great~day!", "54", "hey!~watch where~you're going!~you almost fell~into that pond!"];
const creditText = ["sprig-explore", "CREDITS:", "Code:", "watermelon-cat", "Art:", "watermelon-cat", "SFX:", "watermelon-cat", "Beta Testers:", "e, J, J, C, and T", "Inspired By:", "kano-overworld", "Sprig", "Hack Club", "", ""];
const backgrounds = [grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, grass, battery, battery, battery, battery, battery, battery, battery, battery, grass, grass, grass, grass, grass, grass, grass, sand, inside, inside, grass, inside, inside, sand, grass, inside, inside, inside, inside, inside, inside, grass, grass, battery, battery, battery, battery, grass, grass, sand, sand, sand, grass];

const mainmap = map`
llllllllllllllllllll
llllllllllllllllllll
lllllg&&&bbbb=glllll
lllllg&g&bbbbgglllll
l-gggg&&&bbbbggggg-l
l-gggg&&&bbbbggggg-l
l-gg=g&&&bbbbgg=gg-l
l-g===&&&bbbbg===g-l
l-gg=ggggbbbbgg=gg-l
l-gggggggbbbbggggg-l
l-gggggggbbbbggggg-l
l-gggggggbbbbggggg-l
llllllllllllllllllll
llllllllllllllllllll`;
const title = map`
llllllll
llllllll
llllllll
llllllll
llllllll
llllllll
llllllll
llllllll`;

let inMapMenu = false;

let GameStarted = false;

let PiecesUnlocked = 0;

let PieceUnlockedTiles = [];

let IntroDone = false;
let InCredits = false;
let timeout;
let interval;
let introrepeater = 0; //this is used for both the intro and credits repeater variables because i am very lazy and they both only run once.

function teleportPlayer() {
  const sprite = getFirst(player);

  if (oldX == 0) {
    addSprite(5, oldY, player)
  }

  if (oldX == 6) {
    addSprite(1, oldY, player)
  }

  if (oldY == 0) {
    addSprite(oldX, 4, player)
  }

  if (oldY == 5) {
    addSprite(oldX, 1, player)
  }
  setBackground(backgrounds[currentLevel])
  refresHUD()
  if (PieceUnlockedTiles.includes(currentLevel) && getAll(quadtorque) != 0) {
    getFirst(quadtorque).remove()
  }
}

function refresHUD() {

  //this code ensures the HUD is the right size and refreshes it.
  bgstr = String(backgrounds[currentLevel])
  if (bgstr == "g") {
    bgname = "PCB Plains"
  }

  if (bgstr == "b") {
    bgname = "Battery Hills"
  }

  if (bgstr == "-") {
    bgname = "Memory Beach"
  }
  //console.log(String(backgrounds[currentLevel]));
  
    if(currentLevelMapY < 10) {
      
      addText(bgname, {
        x: 1,
        y: 0, 
        color: color`2`
      })
      
      addText(String(currentLevelMapX), {
        x: 15,
        y: 0, 
        color: color`2`
      })
      
      addText(",", {
        x: 17,
        y: 0, 
        color: color`2`
      })

      addText(String(currentLevelMapY), {
        x: 18,
        y: 0, 
        color: color`2`
      })
    }

  if(currentLevelMapY > 9) {

      addText(bgname, {
        x: 0,
        y: 0, 
        color: color`2`
      })
    
      addText(String(currentLevelMapX), {
        x: 15,
        y: 0, 
        color: color`2`
      })
      
      addText(",", {
        x: 17,
        y: 0, 
        color: color`2`
      })

      addText(String(currentLevelMapY), {
        x: 18,
        y: 0, 
        color: color`2`
      })
    }

  addSprite(0, 5, textbox)
    addSprite(1, 5, textbox)
    addSprite(2, 5, textbox)
    addSprite(3, 5, textbox)
    addSprite(4, 5, textbox)
    addSprite(5, 5, textbox)
    addSprite(6, 5, textbox)
  
}


const LevelMap = [
  [12,12,12,8,8,8,8,8,8,8,8,8,8,16,12,12,12,12,16,19,19,19,19,19,19,19,13,27,25,25,25,25,25,25,25,25,12,12,12,12,13,8,8,8,8,8,8,8,8,8,8,8,9,35],
[41,8,8,8,8,8,8,8,8,8,8,8,8,11,8,8,8,9,11,18,7,18,7,18,32,33,9,24,20,20,22,20,23,20,23,20,8,39,39,40,9,8,8,8,8,8,8,8,8,8,8,8,9,35],
[41,8,8,8,8,8,8,8,8,8,8,8,8,11,8,8,8,9,11,32,10,10,18,10,14,11,9,24,20,20,20,20,20,22,20,20,8,39,37,39,9,8,8,8,8,8,8,8,8,8,8,8,9,35],
[41,8,8,8,8,8,8,8,8,8,8,8,8,11,8,8,8,9,11,9,16,12,17,12,13,11,9,24,20,23,20,22,20,20,20,22,8,36,39,39,9,8,8,8,8,8,8,8,8,8,8,8,9,35],
[16,12,12,12,12,12,12,12,12,12,12,12,12,34,8,8,8,9,11,9,11,3,5,4,9,11,9,24,20,20,20,20,20,20,20,23,8,8,8,8,29,12,12,12,12,12,12,12,12,12,12,12,12,13],
[41,8,8,8,8,8,8,8,8,8,18,18,8,8,8,8,7,9,11,9,11,2,1,0,9,11,9,24,22,22,20,23,20,22,20,20,8,8,8,8,8,8,7,8,8,8,8,8,8,8,8,8,8,35],
[41,8,7,8,7,8,8,7,8,7,8,8,7,8,7,8,8,9,11,9,11,8,7,6,9,11,9,24,20,20,20,20,20,22,20,22,8,8,7,8,8,8,8,8,8,60,7,8,8,8,8,8,8,35],
[41,8,8,8,8,18,8,8,8,8,8,8,8,8,8,18,8,9,11,9,15,10,10,10,14,11,9,24,20,22,20,20,20,20,20,20,8,8,8,8,7,8,8,8,8,8,8,8,8,7,8,8,8,59],
[57,8,8,7,8,8,8,8,8,8,7,8,8,7,8,8,7,9,11,38,12,12,12,12,12,34,9,24,23,20,20,20,20,20,20,20,8,8,8,8,8,8,8,7,8,8,8,8,8,8,8,8,8,35],
[41,8,8,8,8,8,46,44,8,8,8,8,18,8,8,8,7,9,11,18,8,8,18,8,8,18,9,24,20,20,20,22,20,20,20,20,8,8,8,7,8,8,8,8,8,8,8,46,45,8,8,8,8,35],
[58,8,7,8,8,8,46,45,8,8,8,8,8,8,7,8,8,9,11,18,8,8,8,8,7,8,9,52,20,23,20,20,22,20,20,20,8,8,8,8,8,7,8,7,8,8,8,46,45,8,8,8,8,59],
[41,8,8,8,48,48,39,39,48,48,8,8,18,8,8,8,8,9,11,8,8,8,7,8,18,8,9,51,20,20,23,20,20,20,22,20,8,7,7,8,8,8,8,8,8,48,48,39,39,48,48,8,8,35],
[58,8,18,8,47,47,39,39,47,47,8,8,8,18,8,60,8,9,11,8,8,18,8,8,8,8,9,52,20,20,20,20,20,20,20,20,8,8,8,8,8,7,8,8,8,47,47,39,39,47,47,8,7,35],
[41,8,8,7,8,8,46,45,8,8,8,8,8,8,8,8,18,9,11,7,18,8,8,18,8,7,9,54,20,20,20,21,20,22,20,20,8,8,8,8,8,8,8,8,8,8,8,46,45,8,8,8,8,35],
[58,8,7,8,8,8,43,45,8,8,8,8,8,8,7,8,8,9,11,8,7,8,8,8,18,8,9,52,20,20,23,20,20,20,20,20,8,8,7,8,8,8,8,8,8,8,8,46,45,8,8,8,8,35],
[41,8,8,18,60,7,8,8,8,8,8,8,8,8,8,8,8,9,11,18,8,7,8,8,8,8,9,51,20,22,20,20,20,20,23,20,8,8,8,8,7,8,60,8,8,8,8,8,8,8,8,8,8,59],
[41,8,8,7,8,8,7,8,8,8,7,8,8,8,18,8,7,9,11,8,8,8,8,7,8,8,9,52,20,20,20,20,23,22,20,20,8,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,35],
[58,8,18,8,7,8,8,8,8,8,8,8,8,8,8,8,8,9,11,18,7,8,8,8,18,8,9,51,20,22,23,20,23,20,20,20,8,8,8,8,7,8,7,8,8,7,8,7,8,7,8,7,8,35],
[41,8,7,18,7,8,7,8,7,8,8,8,7,8,8,7,8,9,11,8,8,7,18,8,8,8,9,53,20,22,20,20,20,20,20,20,8,8,7,8,8,8,8,7,8,8,8,8,8,8,8,8,8,35],
[58,8,8,8,8,8,8,8,8,8,8,8,8,7,8,8,8,9,11,7,8,18,8,8,8,7,9,24,20,23,20,23,22,20,23,20,8,8,8,8,8,8,8,8,8,8,8,8,8,7,8,7,8,35],
[41,8,8,7,8,7,18,8,8,8,7,18,8,8,18,8,8,9,11,8,8,8,8,7,18,8,9,24,23,20,20,22,20,20,22,20,8,8,8,8,7,8,8,8,7,8,8,8,8,8,8,8,8,35],
[41,8,8,8,8,18,8,7,18,8,8,8,8,7,8,7,8,9,15,10,10,10,50,10,10,10,14,24,20,20,20,20,20,20,20,20,8,8,7,8,8,8,7,8,8,7,8,8,8,8,8,8,8,35],
[58,8,7,8,7,8,8,8,8,8,18,8,7,8,8,8,18,42,12,12,12,12,17,12,12,12,12,34,20,23,20,20,22,20,23,20,8,8,8,8,8,7,8,8,8,8,8,8,7,8,8,8,7,35], //here
[41,8,18,8,8,8,8,7,8,8,7,8,8,7,8,8,8,8,7,8,8,7,8,8,7,8,8,20,20,23,20,22,22,20,20,22,8,8,7,8,7,8,8,8,8,8,8,8,7,8,55,8,8,35],
[41,8,8,8,7,18,8,8,8,7,8,8,8,8,7,8,7,8,8,8,7,8,8,7,8,8,7,20,23,22,20,20,23,22,20,20,8,8,8,8,8,8,7,8,8,8,8,8,8,8,8,8,8,35],
[15,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,26,26,26,26,26,26,26,26,26,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,14],

];



setLegend(
  [textbox, bitmap`
................
................
................
................
................
................
................
................
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
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
0000000000000000`],
  [player, bitmap`
.....LLLLLL.....
....LCCCCCCL....
...L0HCCCCH0L...
...LCCCCCCCCL...
...LCC0CC0CCL...
...LCCC00CCCL...
...LCCCCCCCCL...
...L77777777L...
...L77777777L...
...L77777777L...
...L77777777L...
...L77777777L...
...LL777777LL...
....L077770L....
....L0LLLL0L....
....LLL..LLL....`],
  [grass, bitmap`
4444444444444444
44444444D4444444
4444444444444444
4444444444444444
444D44444444D444
4444444444444444
44444444D4444444
4444444444444444
4444444444444444
444444D444444444
444444444D444D44
4444444444444444
44D4444444444444
4444444444444444
444444444D444444
4444444444444444`],
  [tree, bitmap`
................
................
................
......DDD.......
......DDDDD.....
....DDDDDDDD....
....DDDDDDDD....
....DDDDDDDD....
....DDDDDDDD....
....DDDDDDD.....
.....DDDDD......
.......C........
.......C........
.......C........
.......C........
.......C........`],
  [npc, bitmap`
.....LLLLLL.....
....LLCCCCLL....
....L50CC05L....
....LCCCCCCL....
....LCCCCCCL....
....LCCCCCCL....
....L333333L....
....L333333L....
....L333333L....
....L333333L....
....L333333L....
....LL3333L.....
.....L3333L.....
.....L0LL0L.....
.....L0LL0L.....
.....L0LL0L.....`],
  [path, bitmap`
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCFCCCCCCCCCCCCC
CCCCCCCFCCCCFCCC
CCFCCCCCCFCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCFCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCFCCC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC
CCCFCCCCCCCCCCCC
CCFCCCCCCCFCCCFC
CCCCCCCCCCCCCCCC
CCCCCCCCCCCCCCCC`],
  [flower, bitmap`
................
................
......HHHHHH....
.....HHHHHHHH...
....HHH88888HH..
....HHH88888HH..
....HHH88788HH..
....HHH88888HH..
....HHH88888HH..
....HHHHHHHHHH..
.....HHHHHHHH...
.....DHHHHHH....
....D...........
....D...........
....D...........
....D...........`],
  [rockwall, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLL11LLLLLLLLLLL
LL1LLLLLLLLLLLLL
LL1LLLLLLLLLLLLL
LL111LLLLLLLLLLL
LLLL11LLLLL1LLLL
LLLLLLLLLL11LLLL
LLLLLLLLL11LLLLL
LLL11LLLL1LLLLLL
LLLL111LLLLLLLLL
LLLLLL111LLLLLLL
LLLLLLLL1LLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [battery, bitmap`
0000000000000000
0900000000000000
0000009000000000
0000000000000000
0000000000090000
0000000000000000
0000009000000000
0000000000090000
0009000000000000
0000000000000000
0000000000000000
0000000000000000
0090000009009000
0000000000000000
0000000000000000
0000000000000000`],
  [singlerock, bitmap`
................
.......111......
......11111.....
....11111111....
...1111111111...
..111L111L111...
.1111L111LL11...
.1111LL111L111..
.11111L1111L11..
.1LLL111111L11..
..11LL1111LL11..
..11111111L111..
...11111111111..
.....1111111....
................
................`],
  [deadtree, bitmap`
................
................
........C.......
........C.......
.......CCC......
.......CCC......
.......CCC......
.......CCC......
.......CCC......
......CCCCC.....
.....CCCCCC.....
.....CCCCCCC....
...CCCCCCCCCC...
................
................
................`],
  [water, bitmap`
5555555555555555
5557555555555555
5575755555575575
5555555555557755
5555577555555555
5555755755555555
5555555555555555
5555555555555555
5557775555555555
5575557555575555
5555555555757555
5555555555555555
5555775555555577
7557557555577775
5555555555555555
5555555555555555`],
  [sand, bitmap`
6666666666666666
6666666666666666
6F6666666F66F666
6666F66666666666
6666666666666666
6666666F666666F6
66666F6666666666
666666666F666666
6666666666666666
6F66666666666F66
6666F66666666666
6666666666666666
6666666F6F666666
666F666666666666
6666666666666666
6666666666F66666`],
  [inside, bitmap`
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
11111111LLLLLLLL
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111
LLLLLLLL11111111`],
  [table, bitmap`
................
................
................
..FCFCFCFCFCFC..
..FCFCFCFCFCFC..
..FCFCFCFCFCFC..
..FCFCFCFCFCFC..
..FCFCFCFCFCFC..
..FCFCFCFCFCFC..
..FCFCFCFCFCFC..
..FCFCFCFCFCFC..
..FCFCFCFCFCFC..
..FCFCFCFCFCFC..
..C..........C..
..C..........C..
................`],
  [computer, bitmap`
................
....11111111....
....14444001....
..FC10000001FC..
..FC14444401FC..
..FC10000001FC..
..FC14440001FC..
..FC11111111FC..
..FCFCF11CFCFC..
..FCFCF11CFCFC..
..FL1L1L1L1L1C..
..F1L1L1L1L1LC..
..FL1L1L1L1L1C..
..C........00C..
..C........00C..
................`],
  [microscope, bitmap`
................
.........1.1....
........LLLL....
..FCFCFLLLLLFC..
..FCFCLLLLLLFC..
..FCFLLLLLLLFC..
..FCF11CLLLLFC..
..FCFCFCLLLLFC..
..FCFCFCLLLLFC..
..FCLLLLLLLLFC..
..FCFCFCFCFCFC..
..FCFCFCFCFCFC..
..FCFCFCFCFCFC..
..C..........C..
..C..........C..
................`],
  [darkforest, bitmap`
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
D4DDDDDDDDD4DDDD
DDDDDDDDDDDDDDDD
DDDD4DDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDD4DDDDD4DDD
DDDDDDDDDDDDDDDD
DD4DDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD
DDDD4DDDDD4DDDDD
DDDDDDDDDDDDDDDD
D4DDDDDDDDDDDDDD
DDDDDDDDDDDDDDDD`],
  [quadtorque, bitmap`
................
....DDD.DDD.....
...D9DD..DDD....
...DDDD4..DDD...
...DDD44D.DDD...
...DD44DD44DDD..
..4D44DDDD44DD..
..D44D9DDDD44DD.
..4D44DDD9DD444.
.DDDD44DDDDDD9D.
.D9DDD4DDDDDDDD.
.DDDDD449DDDDD..
.D..D9D44DDD....
.D..DDD4449D....
...DDDD4D4DD....
................`],
  [downroof, bitmap`
...............L
..............LL
.............LLL
............LLLL
...........11111
..........111111
.........1111111
........LLLLLLLL
.......LLLLLLLLL
......LLLLLLLLLL
.....11111111111
....111111111111
...1111111111111
..LLLLLLLLLLLLLL
.LLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [uproof, bitmap`
LLLLLLLLLLLLLLLL
.LLLLLLLLLLLLLLL
..LLLLLLLLLLLLLL
...LLLLLLLLLLLLL
....111111111111
.....11111111111
......1111111111
.......LLLLLLLLL
........LLLLLLLL
.........LLLLLLL
..........111111
...........11111
............1111
.............LLL
..............LL
...............L`],
  [siding, bitmap`
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
1111111111111111
1111111111111111
1111111111111111
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL`],
  [street, bitmap`
1L11L11L11L11L11
LLLLLLLLLLLLLLLL
1L11L11L11L11L11
LLLLLLLLLLLLLLLL
1L11L11L11L11L11
LLLLLLLLLLLLLLLL
1L11L11L11L11L11
LLLLLLLLLLLLLLLL
1L11L11L11L11L11
LLLLLLLLLLLLLLLL
1L11L11L11L11L11
LLLLLLLLLLLLLLLL
1L11L11L11L11L11
LLLLLLLLLLLLLLLL
1L11L11L11L11L11
LLLLLLLLLLLLLLLL`],
  [umbrella, bitmap`
................
............3333
........33333333
.........3333333
..........33333.
...........0333.
..........0.333.
..........0..33.
.........0....3.
........0.......
.......0........
.......0........
......0.........
................
................
................`],
  [aminal, bitmap`
C...C...........
CCCCC...........
C0C0C...........
CCCCC...........
C0C0CCCCCCCCCC..
.C0CCCCCCCCCCCC.
...CCCCCCCCCCCCC
...CCCCCCCCCCCCC
...CCCCCCCCCCCCC
....CCCCCCCCCCCC
.....C..C..C..CC
.....C..C..C..C.
.....C..C..C..C.
.....C.....C....
................
................`],
  
)

setSolids([player, tree, npc, flower, singlerock, rockwall, water, table, computer, microscope, siding, umbrella, aminal])

let level = 0
const levels = [
  map`
t......
...t...
rrrrrrr
rrrrrrr
.......
.t....t`, //0
  map`
...r...
.n.rt..
rrrrrrr
rrrrrrr
.t.rt..
...r...`, //1
  map`
..t....
...n...
rrrrrrr
rrrrrrr
......t
.......`, //2
  map`
.......
.n.t.t.
.trrr..
..rrrrr
.trrrt.
.......`, //3
  map`
ttt.ttt
ttt.ttt
.......
.......
ttt.ttt
ttt.ttt`, //4
  map`
...r...
..nr.t.
.t.r...
rrrr...
.].rt..
...r...`, //5
  map`
.....t.
.t...t.
.......
.......
.t..t..
.......`, //6
  map`
.......
.t..t..
..t....
....t..
.t.....
.......`, //7
  map`
.......
.......
.......
.......
.......
.......`, //8
  map`
....ttt
....ttt
....ttt
....ttt
....ttt
....ttt`, //9 right side tree line x3
  map`
.......
.......
.......
ttttttt
ttttttt
ttttttt`, //10 bottom side tree line 
  map`
ttt....
ttt....
ttt....
ttt....
ttt....
ttt....`, //11 left side tree line x3
  map`
ttttttt
ttttttt
ttttttt
.......
.......
.......`, //12 top tree line
  map`
ttttttt
ttttttt
ttttttt
....ttt
....ttt
....ttt`, //13
  map`
....ttt
....ttt
....ttt
ttttttt
ttttttt
ttttttt`, //14
  map`
ttt....
ttt....
ttt....
ttttttt
ttttttt
ttttttt`, //15 inner corner for left
  map`
ttttttt
ttttttt
ttttttt
ttt....
ttt....
ttt....`, //16
  map`
tttrttt
tttrttt
tttrttt
...r...
...r...
...r...`, //17
  map`
.......
.f.t.f.
.......
..f....
.t...f.
.......`, //18
  map`
sssssss
sstsfss
sssssss
.t.....
.....t.
.......`, //19
  map`
.......
.......
.......
.......
.......
.......`, //20
  map`
.....m.
.m...m.
..tn.m.
....m].
.m...m.
.....m.`, //21
  map`
.m/....
...m.m.
.m../..
./m..m.
.m.m.m.
....m..`, //22
  map`
.......
.m.s...
....ms.
.m.....
..s..m.
.......`, //23
  map`
sss./.m
sss....
sss..s.
ssssm..
sss....
sss....`, //24
  map`
sssssss
sssssss
sssssss
.......
.......
.......`, //25
  map`
.......
.......
.......
sssssss
sssssss
sssssss`, //26
  map`
sssssss
sssssss
sssssss
sssm../
sss/m..
sss....`, //27
  map`
sss...m
sss.m..
sss....
sssssss
sssssss
sssssss`, //28
  map`
....ttt
.f..ttt
..t.ttt
.t.....
...f.f.
.f..t..`, //29
  map`
sssssss
sssssss
sssssss
.......
.......
.......`, //30
  map`
.......
.......
.......
sssssss
sssssss
sssssss`, //31
  map`
.......
.f..t..
..t....
.t..ttt
...fttt
.f..ttt`, //32
  map`
.......
.f..t.f
.......
ttt....
ttt.f..
ttt....`, //33
  map`
ttt....
ttt....
ttt.ft.
.......
..f.t..
.t.....`, //34
  map`
.....ww
.....ww
.....ww
.....ww
.....ww
.....ww`, //35
  map`
.......
.......
...___.
..n....
.......
.......`, //36
  map`
.......
.......
.___n..
.......
.......
.......`, //37
  map`
....ttt
...fttt
....ttt
..n_...
.....f.
.f.....`, //38
  map`
.......
.......
.......
.......
.......
.......`, //39 blank with flooring
  map`
...._..
._..c].
..n.___
.......
.__....
.......`, //40
  map`
www....
www....
www....
www....
www....
www....`, //41
  map`
....ttt
....ttt
....ttt
.......
.......
.......`, //42
  map`
_......
cq]c...
_.n....
q......
c...q..
_......`, //43
  map`
......_
.]..c.c
......_
...qn.q
......_
......_`, //44
  map`
......_
...._.c
......_
.._..._
......c
......_`, //45
  map`
c..._..
_......
_......
c._....
_......
_......`, //46
  map`
.......
.......
.......
.......
.......
_c__c__`, //47
  map`
_c__c__
.......
.......
.......
.......
.......`, //48
  map`
.......
.......
..n....
....]..
.......
.......`, //49
  map`
...r...
.t.r.t.
..nr...
t]_rww.
t..rww.
tttrttt`, //50
  map`
....m##
.3^^^##
3^^..##
2^^..##
.2^^^##
....m##`, //51
  map`
....s##
^^^^^##
.^^..##
.^^..##
.2^^^##
....s##`, //52
  map`
m^^.^^/
m^^.^^/
m.n....
m.../..
mm...m.
m./....`, //53
  map`
...m/##
.3^^^##
.^^.]##
.^^..##
.2^^^##
...m/##`, //54
  map`
.......
ttn..t.
.].www.
tt.www.
.t.wwwt
..t....`, //55
  map`
.......
..f.t..
.t.....
...t...
.f...f.
.......`, //56
  map`
www....
www....
www.]*.
www*...
www....
www....`, //57
  map`
www....
www.*..
www....
www..*.
www....
www....`, //58
  map`
.....ww
.*...ww
.....ww
.....ww
...*.ww
.....ww`, //59
  map`
.......
..%t.t.
.t.....
.......
..t.tt.
.......`, //60
]
function drawmenu() {
  IntroDone = true;
  setMap(title)
  clearTimeout(drawmenu);
  addText("sprig-explore", {
    x:4,
    y:2,
    color:color`D`
  })
  
  addText("Controls:", {
    x:6,
    y:5,
    color:color`7`
  })
  addText("WASD to move", {
    x:5,
    y:6,
    color:color`2`
  })
  addText("L to interact", {
    x:4,
    y:7,
    color:color`2`
  })
  addText("I open/close map", {
    x:2,
    y:8,
    color:color`2`
  })
  addText("K toggle audio", {
    x:3,
    y:9,
    color:color`2`
  })
  addText("Press L", {
    x:7,
    y:14,
    color:color`6`
  })
}

function sprigintro() {
  setMap(title)
  if (introrepeater == 0) {
    addText("sprig", {
        x:8,
        y:8,
        color:color`2`
    })
    introrepeater += 1;
  }
  else if (introrepeater == 1) {
    addText("sprig", {
        x:8,
        y:8,
        color:color`3`
    })
    introrepeater += 1;
  }
  else if (introrepeater == 2) {
    addText("sprig", {
        x:8,
        y:8,
        color:color`D`
    })
    introrepeater += 1;
  }
  else if (introrepeater == 3) {
    addText("sprig", {
        x:8,
        y:8,
        color:color`6`
    })
    introrepeater += 1;
  }
  else if (introrepeater == 4) {
    addText("sprig", {
        x:8,
        y:8,
        color:color`H`
    })
    introrepeater += 1;
  }
  else if (introrepeater == 5) {
    clearText();
    clearInterval(interval);
    setMap(title)
    addText("moustache cat", {
      x:4,
      y:8,
      color:color`2`
    })
    timeout = setTimeout(drawmenu, 2000);
    introrepeater = 0;
  }
}

function credits() {
  GameStarted = false;
  InCredits = true;
  clearText();
  setMap(title)
  if (introrepeater == 14) {
    clearInterval(interval);

    clearText();
    GameStarted = true;
    const sprite = getFirst(player);
    inMapMenu = false;
    setMap(levels[LevelMap[currentLevelMapY][currentLevelMapX]])
    addSprite(3, 3, player)

    clearText();
    InCredits = false;
    teleportPlayer();
    refresHUD();
  }
    addText(creditText[introrepeater], {
        x:10 - Math.round(creditText[introrepeater].length / 2),
        y:8,
        color:color`2`
    })
    introrepeater += 1;

    addText(creditText[introrepeater], {
        x:10 - Math.round(creditText[introrepeater].length / 2),
        y:9,
        color:color`2`
    })
    introrepeater += 1;
}

if (GameStarted) {
  setMap(levels[LevelMap[currentLevelMapY][currentLevelMapX]])
  setBackground(grass)
  addSprite(3, 3, player)
  //this will run when the game is started to refresh the HUD
  refresHUD();
} else if (!GameStarted && !inMapMenu && !IntroDone) {
  interval = setInterval(sprigintro, 500);
  sprigintro();
  }

//playTune(bgm)

onInput("k", () => {
  if (!GameStarted && !inMapMenu && IntroDone) {
    if (AudioOn) {
      AudioOn = false;
    }
    else if (!AudioOn) {
      AudioOn = true;
    }
  }
})

onInput("s", () => {
  if (!inMapMenu && GameStarted) {
    const sprite = getFirst(player);
    sprite.y += 1

    clearText()
    currentPartOfDialogue = 0;
  }
})

onInput("d", () => {
  if (!inMapMenu && GameStarted) {
    const sprite = getFirst(player);
    sprite.x += 1

    clearText()
    currentPartOfDialogue = 0;
  }
})

onInput("a", () => {
  if (!inMapMenu && GameStarted) {
    const sprite = getFirst(player);
    sprite.x -= 1

    clearText()
    currentPartOfDialogue = 0;
  }
})

onInput("w", () => {
  if (!inMapMenu && GameStarted) {
    const sprite = getFirst(player);
    sprite.y -= 1

    clearText()
    currentPartOfDialogue = 0;
  }
})

onInput("l", () => {
  if (GameStarted && !inMapMenu && !InCredits) {
    const sprite = getFirst(player);

    if (getAll(npc) != 0 && getFirst(npc).y == sprite.y && getFirst(npc).x == sprite.x - 1) {
      if (AudioOn) {
        playTune(select)
      }
    
      clearText()
      let currentDialogue = NPCdialogues[currentLevel].split('~');

      if (currentPartOfDialogue == currentDialogue.length) {
        currentPartOfDialogue = 0;
      }
      addText(currentDialogue[currentPartOfDialogue], {
        x: 10 - Math.round(currentDialogue[currentPartOfDialogue].length / 2),
        y: 15,
        color: color`2`
      })
      console.log(10 - Math.round(currentDialogue[currentPartOfDialogue].length / 2))
      currentPartOfDialogue += 1
    } else{
      if (!inMapMenu || GameStarted) {
        if (AudioOn) {
          playTune(failure)
        }
      }
    }

  } else if (!GameStarted && !inMapMenu && IntroDone) {
    clearText();
    GameStarted = true;
    const sprite = getFirst(player);
    inMapMenu = false;
    setMap(levels[LevelMap[currentLevelMapY][currentLevelMapX]])
    addSprite(3, 3, player)
  }
})

onInput("i", () => {
  if (inMapMenu == true && GameStarted && InCredits == false) {
    const sprite = getFirst(player);
    inMapMenu = false;
    setMap(levels[LevelMap[currentLevelMapY][currentLevelMapX]])
    addSprite(3, 3, player)
    clearText()
  }
    
  else if (inMapMenu == false && GameStarted) {
    const sprite = getFirst(player);
    sprite.remove()
    setMap(mainmap)
    currentPartOfDialogue = 0;
    clearText()
    addText("Map", {
      x: 9,
      y: 0,
      color: color`2`
    })
    
    addText(String(PiecesUnlocked), {
      x: 6,
      y: 14,
      color: color`2`
    })
    addText("/9 pieces", {
      x: 7,
      y: 14,
      color: color`2`
    })
    
    inMapMenu = true
  }
})


afterInput(() => {

  if (inMapMenu == false && GameStarted == true) {
    const sprite = getFirst(player);

    oldX = sprite.x;
    oldY = sprite.y;

    if (sprite.x == 0) {
      sprite.remove()
      currentLevelMapX -= 1;
      setMap(levels[LevelMap[currentLevelMapY][currentLevelMapX]])
    }

    if (sprite.x == 6) {
      sprite.remove()
      currentLevelMapX += 1;
      setMap(levels[LevelMap[currentLevelMapY][currentLevelMapX]])
    }

    if (sprite.y == 0) {
      sprite.remove()
      currentLevelMapY -= 1;
      setMap(levels[LevelMap[currentLevelMapY][currentLevelMapX]])
    }

    if (sprite.y == 5) {
      sprite.remove()
      currentLevelMapY += 1;
      setMap(levels[LevelMap[currentLevelMapY][currentLevelMapX]])
    }

    currentLevel = LevelMap[currentLevelMapY][currentLevelMapX];


    teleportPlayer();
    
    if (getAll(quadtorque) != 0 && sprite.x == getFirst(quadtorque).x && sprite.y == getFirst(quadtorque).y) {
      console.log("gotcha")
      if(AudioOn) {
        playTune(collect)
      }
      PiecesUnlocked += 1;
      getFirst(quadtorque).remove()
      PieceUnlockedTiles.push(currentLevel)
      console.log(PieceUnlockedTiles.toString())

      if (PiecesUnlocked == 9) {
        interval = setInterval(credits, 4000);
        credits();
      }
    }
  }
})