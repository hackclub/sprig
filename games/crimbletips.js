/*
@title: CrimbLetips
@author: ShawnM
@tags: []
@addedOn: 2022-12-19
*/

const Black = "B";
var section = 0;
var x = 3;
var y = 1;
var intenx = x;
var inteny = y;
var ID
var keypress = "null";
var timeout1 = undefined;
setLegend(
  /*[ player, bitmap`
................
................
.......000......
.......0.0......
......0..0......
......0...0.0...
....0003.30.0...
....0.0...000...
....0.05550.....
......0...0.....
.....0....0.....
.....0...0......
......000.......
......0.0.......
.....00.00......
................`],*/
  [ Black, bitmap`
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
LLLLLLLLLLLLLLLL`]
);

let level = 0;
const levels = [
  map`
BBBBBBBBBB
BBBBBBBBBB
BBBBBBBBBB
BBBBBBBBBB
BBBBBBBBBB
BBBBBBBBBB
BBBBBBBBBB
BBBBBBBBBB`,
];
const error = tune`
166.66666666666666: c5/166.66666666666666 + b4/166.66666666666666 + a4/166.66666666666666,
166.66666666666666: c5/166.66666666666666 + b4/166.66666666666666 + a4/166.66666666666666,
5000`
const ItemFound = tune`
150: a4^150 + f4^150,
150: b4^150 + g4^150,
150,
150: c5^150 + e5^150 + a4^150,
150,
150: b4^150 + g4^150,
150: a4^150 + c5^150,
150,
150: b4^150 + f5^150 + d5~150,
150: d5~150 + f5^150 + b4^150,
3300`
const Move = tune`
125: c4/125 + e4/125,
125: g4/125 + e4/125,
125: c4/125 + e4/125,
3625`
const UseItem = tune`
166.66666666666666: b4^166.66666666666666 + d5^166.66666666666666,
166.66666666666666: c5^166.66666666666666 + e5^166.66666666666666,
166.66666666666666: d5^166.66666666666666 + f5^166.66666666666666,
4833.333333333333`
const Victory = tune`
166.66666666666666: c5~166.66666666666666 + g4~166.66666666666666 + b5^166.66666666666666,
166.66666666666666: d5~166.66666666666666 + a4~166.66666666666666 + b5^166.66666666666666,
166.66666666666666: e5~166.66666666666666 + b4~166.66666666666666 + a5^166.66666666666666,
166.66666666666666: a5^166.66666666666666,
166.66666666666666: e5~166.66666666666666 + g5^166.66666666666666,
166.66666666666666: g5^166.66666666666666,
166.66666666666666: e5~166.66666666666666 + f5^166.66666666666666,
166.66666666666666: f5^166.66666666666666,
166.66666666666666: e5~166.66666666666666 + b4~166.66666666666666,
166.66666666666666: d5~166.66666666666666 + a4~166.66666666666666,
166.66666666666666: c5~166.66666666666666 + g4~166.66666666666666,
166.66666666666666,
166.66666666666666: c5~166.66666666666666 + g4~166.66666666666666,
166.66666666666666,
166.66666666666666: c5~166.66666666666666 + g4~166.66666666666666,
2833.333333333333`
const Select = tune`
500: c5/500,
15500`
const Intro = tune`
100,
100: c4~100 + g4^100 + f4^100,
100: c4^100,
100: d4^100 + f4^100 + e4^100,
100: c4~100,
100: b4^100 + g4^100 + e4^100 + d5^100,
100: a4^100 + f4^100 + d4^100 + c5^100,
100: c4~100 + b4^100,
100: d4^100 + f4^100 + e4^100 + a4^100,
100: c4^100 + g4^100,
100: c4~100 + f4^100,
100: e4^100,
100: d4^100,
100: c4^100,
1800`
setMap(levels[level]);

//create inventory system function 
var inventory = []

//flag establishing
var flags = {torch:0,crowbar:0,bluekey:0,redkey:0,ID1:0,ID3:0,ID3_2:0,ID8:0,ID5:0,ID5_2:0,ID13:0,ID20:0,ID27:0}
//main(1,4)
playTune(Select)
//titlescreen
addText("Welcome to",{x:5,y:1,color: color`9`})
addText("      Letips",{x:4,y:2,color:color`9`})
addText("Crimb_",{x:4,y:2,color:color`H`})
addText("V 1.0",{x:7,y:4,color:color`9`})
addText("Press I to start!",{x:2,y:12,color:color`H`})


onInput("k", () => {
keypress = "k"
if (section == 1){
  switch(ID){
    case 1:
    case 4:
    case 6:
    case 7:
    case 8:
    case 20:
      bodyprint("There is nothing\nwhich requires use\nof an item here.")
      break;
    case 3:
      if (flags.ID3_2 == 1){
        flags.ID3_2 = 0 //add victory "cutscene"
      }else{
        bodyprint("You have yet to\nfind both keys.")
      if(flags.bluekey == 1 && flags.redkey == 1){
        bodyprint("The keys turn, and\nthe gate opens...\n(I to continue)")
        flags.ID3_2 = 1
        section = 3
      }
      }
      break;
    case 5:
      bodyprint("There is nothing\nwhich requires use\nof an item here.")
      if (flags.ID5 == 1){
        bodyprint("You don't have any\nitems to use here.")
        if (flags.crowbar == 1){
        bodyprint("You use your\ncrowbar to pry open\nthe trapdoor,\nallowing you access\nto the secrets it\nholds.")
        flags.ID5_2 = 1
        playTune(ItemFound)
        }
      }
      break;
    case 11:
    case 15:
      if(flags.torch == 0){
      bodyprint("You do not have any\nitems to use here.") 
      }else{
        bodyprint("you'd rather save\nyour torch for\ndeeper in.")
      }
    break;
    case 19:
      if(flags.torch == 0){
        bodyprint("You do not have any\nitems to use here.")
      }else{
        bodyprint("Igniting your\ntorch, the intric-\nate pattern carved\ninto the ceiling is\nilluminated to you.")
      }
    break;
    case 27:
    if(flags.torch == 0){
      bodyprint("You don't have any\nitems to use here.")
    }else{
      bodyprint("your torch illumin-\nates this place,\nand makes it's\nnature clear to\nyou. You are within\na tomb.")
    }
    break;
    case 9:
    if(flags.torch == 0){
      bodyprint("There is nothing\nwhich requires use\nof an item here.")
    }else{
      bodyprint("while it is dark,\nusing your torch\nhere would be\nunnecessary.")
    }
    break;
    case 13:
    if(flags.torch == 0){
      bodyprint("You do not have any\nitems to use here.")
    }else{
      bodyprint("Igniting your\ntorch, You confirm\nthat rows of\nfermentation\nbarrels inhabit the\nroom. you also see\na few creatures\nyou'd rather not\nhave known were\nthere.")
    break;
    }
    }
  }
})

onInput("i", () => { //press to start, search
keypress = "i"
if (section == 4){
  clearText()
  addText(" Thank you\nfor playing!\n\n-Shawn M.",{x:4,y:6,color:color`9`})
}
if (section == 3){
  section = 4
  clearText()
  playTune(Victory)
  addText(" THE DOOR OPENS..",{x:1,y:1,color:color`9`})
  addText("As you are envelo-\nped in a light so\nunfathomably bri-\nght. Euphoria\nwashes over you as\nyou walk through\nthe gate. What lies\non the other side\nis a story for\nanother time.\n\npress I\nto continue...",{x:1,y:2,color:color`H`})
}
if (section == 1){
  switch(ID){
    case 1:
      if(flags.ID1 == 0){
        bodyprint("Initial observation\nyields nothing.")
      }
      if(flags.ID1 == 1){
        bodyprint("You find a key.\nIt's handle takes\nthe shape of a\nbeast from legends\nyou cannot fully\nrecall, grasping\na ruby. Even thro-\nugh the layer of\ndust, it shines\nin the moonlight.")
        flags.redkey = 1
        inventory.push("Ruby Key")
        playTune(ItemFound)
      }
      break;
    case 3:
      bodyprint("You feel every\ncrevice of the\ngate. You inspect\nit's hinges, its\nbrickwork. There's\nno way you're\nbreaking this\nthing open.")
      break;
    case 4:
      bodyprint("There is nothing of\nvalue to be found\nhere, unless you're\na squirrel.")
      break;
    case 5:
      bodyprint("Upon scouring the\nroom, you find a\ntrapdoor beneath\nthe carpet to the\nsouth. its imposs-\nible to open with\nyour hands,\nhowever.")
      flags.ID5 = 1
      break;
    case 6:
      bodyprint("Despite it's grand\nappearance, it's\ndevoid of anything\nuseful. The candles\nof the chandelier\nhave all burnt out.")
      break;
    case 7:
      bodyprint("You crawl along\nthe path, investi-\ngating the soil.\nYou look silly.")
      break;
    case 8:
      if(flags.ID8 == 1){
      bodyprint("You find a crowbar\nwithin the waste.\nAt least humanities\nmistakes have\namounted to somet-\nhing potentially\nuseful.")
      flags.crowbar = 1
      inventory.push("Crowbar")
      playTune(ItemFound)
      }
      if(flags.ID8 == 0){
      bodyprint("After a quick\nglance, it seems\nthat there's\nnothing useful here\nright now. ")
      }
      break;
    case 9:
      bodyprint("You feel around\nthe crevices of the\ncobblestone walls\nencasing you. There\nis nothing to be\nfound.")
      break;
    case 11:
      bodyprint("The entrance cont-\nains no sconces or\nother forms of\nlight you could\npotentially take\ninside. It's just\na plain old stone\ncave entrance.")
      break;
    case 13:
      if(flags.ID13 == 0){
      bodyprint("You take a quick\nlook. it was\npointless.")
      }
      if(flags.ID13 == 1){
      bodyprint("You grab the\nobject, and hear\nsomething else\ndrop. holding both,\nyou walk up the\nstairs to see what\nyou are holding in\nthe moonlight. It's\na torch, and a box\nof matchsticks.")
      flags.torch = 1
      inventory.push("Torch")
      playTune(ItemFound)
      }
      break;
    case 15:
      bodyprint("The staircase\ncontains nothing of\nvalue. It's simply\na set of stone\nsteps.")
      break;
    case 19:
      bodyprint("You accept that you\nwill not find\nanything here\nwithout some form\nof light. You scour\nthe room, and come\nto conclusion there\nis nothing to be\nfound but pinecones\nwhich had blown in.")
      break;
    case 20:
      if(flags.torch == 0){
      bodyprint("You're not able to\nmake out much in\nthe dark.")
      }
      if (flags.torch == 1 && flags.ID20 == 0){
      bodyprint("Nothing stands out\nto you immediately.")
      }
      if (flags.ID20 == 1){
      bodyprint("Closer inspection\nshows that the dark\nspot is caused by\nan absense of dust.\nPerhaps a casket of\nsome kind rested\nhere. Otherwise,\nthere is nothing of\nvalue here. ")
      }
      break;
    case 27:
      if(flags.torch == 0){
      bodyprint("I'd like to see\nyou try. ")
      }
      if (flags.torch == 1 && flags.ID27 == 0){
      bodyprint("You cannot see\nanything\nimmediately.")
      }
      if (flags.ID27 == 1){
      bodyprint("You rummage through\nthe riches, in\nhopes of finding\nanything useful to\nyou right now.\nMiraculously,\nyou come across a\nsapphire adorned\nkey.")
      inventory.push("Sapphire Key")
      playTune(ItemFound)
      flags.bluekey = 1
      }
      break;
    
  }  
}
if (section == 0.5){ 
  playTune(Select)
  clearText()
  locdefine()
  printcord()
  section =  1
}
if (section == 0) {
  clearText()
  section = 0.5
  playTune(Intro)
  addText("  ENTER THE GATE.",{x:1,y:1,color:color`9`})
  addText("You find yourself\non the ground.\nIt's night. You\ndon't know how you\ngot here, nor how\nlong you have been\nlaying in the dirt.\nall you know is\nthat you mustn't\nstay here long...\n\npress I\nto continue...",{x:1,y:2,color:color`H`})
  //printcord()
}
})



function printcord() { //updates coordinates and dev values. prints controls
addText(`x:${x}`,{x:1,y:2,color: color`9`})
addText(`y:${y}`,{x:1,y:3,color: color`9`})
//addText(`x:${intenx}`,{x:1,y:4,color: color`8`})
//addText(`y:${inteny}`,{x:1,y:5,color: color`8`})
addText(`WASD movement\nI:Search\nK:use Item\nJ:Observe`,{x:5,y:1,color:color`9`})
//addText(`${section} ${ID}`,{x:1,y:1,color: color`8`})
}

function bodyprint(bodytext){ //resets all text, updates coords, and prints text to the body
clearText()
printcord()
addText(bodytext, {x:1,y:6,color:color`H`})
}

onInput("w", () => { //move north
if (section == 1){
inteny = y-1
keypress = "w"
}
})

onInput("s", () => { //move south
if (section == 1){
inteny = y+1
keypress = "s"
}
})

onInput("a", () => { //move east
if (section == 1){
intenx = x-1
keypress = "a"
}
})

onInput("d", () => { //move west
if (section == 1){
intenx = x+1
keypress = "d"
}
})

afterInput(() => {
  if (keypress != "j" || keypress != "k" || keypress != "i" || keypress != "l"){
    clearTimeout()
    //exceptions, such as areas of the map which are innaccessible
    //if ((intenx == 1 && inteny > 3) || (intenx == 2 && inteny > 4) || (intenx == 4 && inteny == 4) || (intenx == 4 && inteny > 5)){
    if ((intenx < 3 && inteny>4) || (intenx == 2 && inteny < 5 && inteny > 2) || (intenx == 4 && inteny < 5 && inteny > 2) || (intenx == 4 && inteny == 6) || (intenx == 2 && inteny == 1)){
      section = 99
      inteny = y
      intenx = x
      cantpass()
    }
    if (flags.ID5_2 == 0 && intenx == 1 && inteny == 3 ){
      section = 99
      inteny = y
      intenx = x
      cantpass()
    }
    if (section == 1){ 
      if (keypress == "w" || keypress == "s"){ //checks if move is within bounds, then updates
        if(inteny<1 || inteny>6){
        cantpass()
        inteny = y
      }else{
        y = inteny
        locdefine()
        playTune(Move)
      }
      }
      if (keypress == "a" || keypress == "d"){ //checks if move is within bounds, then updates
        if(intenx<1 || intenx>4){
        cantpass()
        intenx = x
      }else{
        x = intenx
        locdefine()
        playTune(Move)
      }
      }
      printcord()
    }else if (section == 99){
      section = 1
    }
  }
})

function cantpass() {
bodyprint("you can't go there")
setTimeout(() => {locdefine()}, 2000); //resets to original body after 2 seconds
playTune(error)
}

function locdefine() { //prints body text of the area and sets the ID to that area. This ID is used for search, items, and observe. 
switch (y) { // All Y cords
  case 1:
    switch (x) {
      case 1:
      bodyprint("You enter into to\na barren room. The\nstale air infiltra-\ntes your nose, and\nyour eyes are\npulled towards\nthe glimmer on a\ndesk.")
      ID=1;
      break;
    case 2:
      bodyprint("Y1X2") // no room here
      ID=2;
      break;
    case 3:
      bodyprint("A towering gate\nstands before you.\nYour only means of\nescape from this\nwretched place.\nTwo keyholes stand\nout to you, barely\nwithin reach.")
      ID=3;
      break;
    case 4:
      bodyprint("The forest\nstretches unto\ninfinity. There is\nnothing for you\nhere.")
      ID=4;
      break;
    }
    break;
  case 2:
    switch (x) {
      case 1:
      bodyprint("You enter the\ndining hall. Dishes\nlay across the\ntable, festering.\nThe site was\nabandoned, and\nrecently.")
      ID=5;
      break;
    case 2:
      bodyprint("You enter the\nentrance hall of\nthe abandoned\nhouse. Its chande-\nlier having fallen\nlong ago, and its\ncarpets stained\nwith who knows\nwhat.")
      ID=6;
      break;
    case 3:
      bodyprint("A dirt path has\nbeen carved in the\nearth. it is not\novergrown despite\nthe seemingly\nabandoned nature\nof this place.")
      ID=7
      break;
    case 4:
      bodyprint("A pond shimmers in\nthe moonlight.\nIts natural beauty\nis tainted by the\nwaste of humanity.")
      ID=8
      break;
    }
    break;
  case 3:
    switch (x) {
      case 1:
      bodyprint("The stairs descend\nsouth, to a depth\nmuch deeper than\nyou expected.")
      ID=9
      break;
    case 2:
      bodyprint("Y3X2") // no room here
      break;
    case 3:
      bodyprint("A gateway between\nthe surface and\nearth beneath lies\nhere. The\nartificial cave\nstretches farther\nthan the dim\nmoonlight can\nreach.")
      ID=11
      break;
    case 4:
      bodyprint("Y3X4") // no room here
      break;
    }
    break;
  case 4:
    switch (x) {
      case 1:
      bodyprint("The staircase\nterminates in a\ncellar. The cool,\nstale air rushes\npast you as\nyou slowly open\nit's door.")
      ID=13
      break;
    case 2:
      bodyprint("Y4X2") // no room here
      break;
    case 3:
      bodyprint("The tunnel\ncontinues deeper\nunder the earth.\nThe air feels\ndifferent, in a\nway you cannot\ndescribe. It isn't\nlong before you\ncan barely see your\nown feet.")
      ID=15
      break;
    case 4:
      bodyprint("Y4X4") // no room here
      break;
    }
    break;
  case 5:
    switch (x) {
      case 1:
      bodyprint("Y5X1") // no room here
      break;
    case 2:
      bodyprint("Y5X2") // no room here
      break;
    case 3:
      bodyprint("You now enter the\nmain room. It's\nbecoming very\ndifficult to tell\nwhere you are\ngoing at this\npoint.")
      ID=19
      break;
    case 4:
      bodyprint("This room is\ndarker than the\nlast. It's almost\nimpossible to see\nanything here.")
      ID=20
      break;
    }
    break;
  case 6:
    switch (x) {
      case 1:
      bodyprint("Y6X1") // no room here
      break;
    case 2:
      bodyprint("Y6X2") // no room here
      break;
    case 3:
      bodyprint("You may as well\nhave closed your\neyes. you cannot\nsee a thing here.")
      ID=27
      break;
    case 4:
      bodyprint("Y6X4") // no room here
      break;
    }
    break;
}
}


onInput("j", () => { //Observe messages
//inventory.push("Torch","Crowbar")
//bodyprint(`${inventory}`)
keypress = "j"
switch (ID) {

  case 1:
    bodyprint("You find a table\nriddled with\nvarious books,\nhastily written\nletters, and the\nremains of\ncreatures who had\ntaken refuge here.\nSomething glimmers.")
    flags.ID1 = 1
    break;
  case 3:
    if (flags.ID3 == 1){
      bodyprint("To your east, you\nsee a moonlit\nhorizon obscured\nby woodland. to\nyour west, impass-\nible foliage you\ncannot comprehend.\nto your south, a\ndirt path. ")
      flags.ID3 = 0
      break;
    }
    bodyprint("You walk around the\ngate. There is\nseemingly nothing\non the other side.\nYou don't know\nwhere it leads.\nAll you know is\nthat you must\nenter through it...\n(j to continue)")
    flags.ID3 = 1
    break;
  case 4:
    bodyprint("A forest of\nconifer trees,\nStretching past\nthe horizon. It may\nbe another avenue\nfor escape, though\nit's likely you'll\nsuccumb to the\nelements first.")
    break;
  case 5:
    bodyprint("To the north, you\nsee the entrance to\nanother room, it's\nrotten door\nallowing you to see\ninto what appears\nto be a study.")
    break;
  case 6:
    bodyprint("To the east, you\nsee the near-\ncollapsed archway\ninto the dining\nhall. the stairs to\nthe second floor\nhave collapsed,\nleaving it\ninnacessible.")
    break;
  case 7:
    bodyprint("The path shows\nmarks of foot\ntravel, though the\nfeet do not appear\nhuman. The ground\nis dry. It hasn't\nrained in some\ntime.")
    break;
  case 8:
    bodyprint("The pond fills you\nwith slight reass-\nurance, knowing\nyou at least have\na source of water,\nalbeit tainted.\nWithin the waste,\na silver glimmer\nstands out to you.")
    flags.ID8 = 1
    break;
  case 9:
    bodyprint("The stairs are\nfashioned from\nplanks, which are \nsuprisingly well\npreserved compared\nto the home they\nlay beneath. they\ncreak with every\nstep.")
    break;
  case 11:
    bodyprint("The cave was carved\nby an expert, or\nexperts. The\ncraftsman ship is\nimpressive. this\nisn't a hobbyist's\ncave.")
    break;
  case 13:
    if(flags.torch == 0){
    bodyprint("It's nearly pitch\nblack. you attempt\nto feel around,\nstumbling through\nrows of barrels.\nYour hands brush\nover a cylindrical\nobject.")
    flags.ID13 = 1
    }
    if(flags.torch == 1){
    bodyprint("The barrels appear\nto hold some sort \nof alcohol. You'd\nrather not risk\ndrinking it.\nThe movements of\nthe creatures\ninhabiting the\ncellar implore you\nto leave.")
    }
    break;
  case 15:
    bodyprint("You feel along the\nwalls, their\nsmoothness devoid\nof any obvious\nhuman carvings.")
    break;
  case 19:
    if (flags.torch == 0 ){
    bodyprint("You attempt to feel\naround, but realize\nyou won't get\nanywhere without\nsome form of light.")
    }
    if (flags.torch == 1 ){
    bodyprint("the room, now\nilluminated,\npresents itself to\nyou. A door leading\neast and a door\nleading south pique\nyour interest.")
    }
    break;
  case 20:
    if (flags.torch == 0 ){
    bodyprint("You attempt to make\nsome observations,\nbefore realizing\nthat you actually\nneed light to be\nable to see.\nImagine that.")
    }
    if (flags.torch == 1 ){
    bodyprint("The eastern room\nis curiously devoid\nof anything as\nwell. The center of\nthe room contains\na lighter rectang-\nular spot, indic-\nating that whatever\nwas once there was\ntaken.")  
    flags.ID20 = 1
    }
    break;
  case 27:
    if (flags.torch == 0){
    bodyprint("Observe what?\nThe darkness?")
    }
    if (flags.torch == 1){
    bodyprint("A sarcphogus lays\nbefore you, with\nriches at its feet.\nBurned out candles\nsurround the\nresting place in a\nsporadic fashion.\nThe silence makes\nyou uneasy. You\nshouldn't be here.")
    flags.ID27 = 1
    }
}
})

onInput("l", () => {
bodyprint(`${inventory}`)
playTune(Select)
setTimeout(() => {locdefine()}, 2000); //resets to original body after 2(?) seconds
})
