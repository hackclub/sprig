/*
Morse code trainer by Yutaro
Has two modes: Morse to text and text to morse
Used for learning morse code
*/

//backgrounds
const titleScreen = "t";
const menuSelect = "m";

const maps = [
  map``
]
setLegend(
  [titleScreen,bitmap`
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
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [menuSelect,bitmap`
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
)

setMap(map`.`)

let currentState = "title";
let sound = false;
//display screen drawing function
function drawScreen(){
  clearText()
  if (currentState == "title"){
    setBackground(titleScreen);
    addText("Morse Trainer", { 
    x: 4,
    y: 4,
    color: color`3`
    })
    
    //sound message
    addText(`Sound: ${sound}`, { 
      x: 4,
      y: 6,
      color: color`3`
    })
    
    //addText("Press A to start\nD to toggle sound", { 
    //  x: 2,
    //  y: 12,
    //  color: color`3`
    //})
  }

  if (currentState == "modeSelect"){
    setBackground(menuSelect);
    addText("W: Instructions", { 
    x: 1,
    y: 5,
    color: color`3`
    })

    addText("S: morse -> text", { 
    x: 1,
    y: 7,
    color: color`3`
    })

    addText("A: text -> morse", { 
    x: 1,
    y: 9,
    color: color`3`
    })
  }
  
}

drawScreen();


//character database
const characters = {"0":"-----","1":".----","2":"..---","3":"...--","4":"....-","5":".....","6":"-....","7":"--...","8":"---..","9":"----.","a":".-","b":"-...","c":"-.-.","d":"-..","e":".","f":"..-.","g":"--.","h":"....","i":"..","j":".---","k":"-.-","l":".-..","m":"--","n":"-.","o":"---","p":".--.","q":"--.-","r":".-.","s":"...","t":"-","u":"..-","v":"...-","w":".--","x":"-..-","y":"-.--","z":"--..",".":".-.-.-",",":"--..--","?":"..--..","!":"-.-.--","-":"-....-","/":"-..-.","@":".--.-.","(":"-.--.",")":"-.--.-"}

//sorted version 
const charIndex = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9"]

//funciton to convert the typed morese code to text
function findCharacter(moresePattern){
  //not found
  let ret = "NF";
  let keys = Object.keys(characters);
  for(let i = 0;i<keys.length;i++){
    if(characters[keys[i]] == moresePattern){
      ret = "";
      ret+=keys[i]
      return ret;
    }
  }
  return ret;
}

const dash = tune`
2000: G5/2000,
62000`
const dot = tune`
666.6666666666666: G5/666.6666666666666,
20666.666666666664`
const silence = tune`
500: C4-500,
15500`

let currentMorse = "";
let currentCharacterBuffer = "";

let textMorsedisplay = "";
let currentCharIndex = 0;
let charLen = 0;

function game(){
  if(currentState == "instructions"){
    clearText();
    addText("Game about morse cod\ne.\n\ntext to morse is le\narning morse\n\nmorse to text is usi\nng morse", { x: 0,y: 2,color: color`3`});
  }

  if (currentState == "morseText"){
    //main game loop where user enters morse using buttons and machine decodes
    clearText();
    addText("W: dot, S: dash, \nA: Enter, D: Clear", { x: 0,y: 2,color: color`3`});
    addText(currentCharacterBuffer, { x: 0,y: 6,color: color`3`});
    addText(currentMorse, { x: 0,y: 10,color: color`3`});
  }

  if(currentState == "textMorse"){
    clearText();
    addText("W: up, S: down, \nA: Enter, D: Clear", { x: 0,y: 2,color: color`3`});
    addText(`Current char: (${charIndex[currentCharIndex]})`, { x: 0,y: 6,color: color`3`});
    addText(textMorsedisplay, { x: 0,y: 8,color: color`3`});
  }
}

//key press callbacks
onInput("d", () => {
  if(currentState == "title"){
    sound = !sound;
    drawScreen();
  }
  if(currentState == "morseText"){
    currentMorse = "";
    game();
    return;
  }
  if(currentState == "textMorse"){
    textMorsedisplay = "";
    charLen = 0;
    game();
  }
});

onInput("a", () => {
  if(currentState == "title"){
    currentState = "modeSelect";
    drawScreen();
    return;
  }
  if(currentState == "modeSelect"){
    currentState = "textMorse";
    game();
    return;
  }
  if(currentState == "morseText"){
    let tem = findCharacter(currentMorse);
    currentMorse = "";
    if(tem != "NF")currentCharacterBuffer+=tem;
    game();
    return;
  }

  if(currentState == "textMorse"){
    charLen+=characters[charIndex[currentCharIndex]].length+1;
    if(charLen>15) {textMorsedisplay+="\n";charLen = 0;}
    textMorsedisplay+=characters[charIndex[currentCharIndex]]+" ";
    game();
  }
});

onInput("w", () => {
  if(currentState == "modeSelect"){
    currentState = "instructions";
    game();
    return;
  }
  if(currentState == "morseText"){
    currentMorse+=".";
    game();
  }
  if(currentState == "textMorse"){
    if(currentCharIndex<charIndex.length-1)currentCharIndex+=1;
    else currentCharIndex = 0;
    game();
  }
});

onInput("s", () => {
  if(currentState == "modeSelect"){
    currentState = "morseText";
    game();
    return;
  }
  if(currentState == "morseText"){
    currentMorse+="-";
    game();
  }
  if(currentState == "textMorse"){
    if(currentCharIndex>=0)currentCharIndex-=1;
    game();
  }
});


