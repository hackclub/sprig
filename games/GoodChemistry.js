/*
This is a Quiz game for children to learn some chemistry.
It can be played with 1 or 2 players.
Questions are related to (some) chemical elements like
- The Element Name
- The Atomic Mass
- The PSE Symbol
- The Atomic Number
Note: Not all elements are included.
If this is a game for children, they most likely don't know all of them anyway. Feel free to add more!

And yes, I know this game is awkward. Actually it all started because I wanted to understand how to render
bitmaps ar arbitrary places. Then I wondered why there were so many similar tile-based games and decided to
give some fresh ideas to the game pool by adding a quiz game.
Feel free to change the topic to any other quiz game you like.
It's open source so adapt it. My suggestion would be:
City Questions:
 - Population
 - Continent
 - Country
 ...
Movies:
 - Year
 - Genre
 - Actors
 - Box Office revenue
People, Countries, Historic Events, Trivia...

That should not be too hard to adopt.
I hope it inspires many of you to make different kind of games.


# There are still some TODOS for those wo like to improve it:
1: Think of different game modes 
That could be like 
  - "both can answer and both get scores", 
  - "fastest answer only" (As it it right now), 
  - "other player can guess if first is wrong"... 
or also selecting specific question types only (e.g. only asking for the mass, amount of protons...)
  - That however might be messy to configure
2: The emulator shows the text at a different position than the console display.
  - Not sure why this is the case but thats not my focus right now
3: Internationalization (multi language) support
  I tried an English and German version but this "Engine" does not really make it easy.
  There is no generalized flow where I get an i18n String instead of switch-cases for each string
  But what's worse, the text-engine does not produce any accents!!!
  Thus other languages might have trouble since it produces broken characters for äöüßàĉ etc.
  I really hope they will add this in the future!


# A Note - Learnings from that test project:

A note for all of you who like to learn from what I did here (or those who like to remix this):
I tried to produce clean code (e.g. making classes etc.) but this single-file environment is making it hard. So keep things simple!
I also did this pretty fast (built the console and tried my first game the same day) so many solutions might be bad.
Especially since I had my trouble with this pretty rigid structure of bitmaps and texts. 
The manual is not really helpful here. But I hope my comments help.
So far I have not found a nice solution for rendering images at arbitrary places. Instead the engine enforces bitmaps being drawn
in a "map" structure, enforcing a squared tile structure with each tile getting resized to fit the block it's placed at.
E.g. if your map is a 16x16 String the screen is divided into 16x16 blocks where each part draws the bitmap associated with 
the character (yes those you specify in the legend!) at the specified position.
So the bitmap maps to a char, the map consists of a squared array of chars!
That way, when changing the layout of the map, all images resize aswell. This then also messes with the text which always
seems to be kept in a 16x20 grid (where character 21 is written the same line but at x=0 again).
That's why I used the map basically only for creating "background images".

If you want to adopt this game for own types of questions you simply need to change the Element class to a "Question" of
your choice, adapting it's properties. (E.g. make it "City" instead and change the properties from "mass" to 
"population"/"continent"/"country" or so in order to quickly make a Quiz game that asks for cities instead of chemical elements.

And yes, the i18n does not really work. I started implementing a map-based localization system but quickly noticed the
text renderer does not support other than ASCII chacacters. So I decided to leave out all that (and Spanish/Portuguese support).
You might want to skip that GameState and jump right into the setup for a faster game!

Anyway, write me a mail in case you have trouble understanding what I did. Maybe I can help. And I'd like to hear and see what you
did with that code. I hope it inspired you for some great game ideas.

@title: GoodChemistry
@author: Tobias
@mail: mad.scientist@freenet.de
@tags: [Quiz, learning game, multiplayer, chemistry]
@addedOn: 2026-01-04
*/

// --------------------------- ASSETS ---------------------------

// Why ever the colors are distributed that way, these are the color codes usable
// So if you want to set colors don't think you can use HEX values. Instead its that list:
// const COLORS = ['0', 'L', '1', '2', '3','C','7','5','6','F','4','D','8','H','9'];

const TOTAL_ANSWERS = 3; // I noticed 4 are difficult to place on such a small screen

// Give players a distinc color for better accessibility.
const COLOR_PLAYER1 = color`6`;
const COLOR_PLAYER2 = color`H`;
const COLOR_TEXT = color`3`;
const COLOR_HIGHLIGHT = color`9`;
const COLOR_WRONG = color`3`;
const COLOR_CORRECT = color`4`;
const COLOR_ANSWER = color`2`;

// Constants used for placing in the map
const BLACK = "b";
const ANSWER_BG_LEFT  = "l";
const ANSWER_BG_MID   = "m";
const ANSWER_BG_RIGHT = "r";
const ARROW_UP = "U";
const ARROW_LEFT = "L";
const ARROW_DOWN = "D";
const ARROW_RIGHT = "R";

const LANGUAGE_EN = "e";
const LANGUAGE_DE = "d";
const LANGUAGE_ES = "s"; // unused
const LANGUAGE_PT = "p"; // unused

// Bitmaps that will be associated with one of the constants above via setLegend
// That way the maps can draw these images in the background
const BLACK_BITMAP = bitmap`
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
0000000000000000` ;
const ANSWER_LEFT_BITMAP = bitmap`
..25252572757575
.257777777777777
2577777777777777
5777777777777777
5777777777777777
5777777777777777
5777777777777777
5777777777777777
5777777777777777
5777777777777777
5777777777777777
5777777777777777
5777777777777777
5577777777777777
5557777777777777
.055555555555555`;
const ANSWER_MID_BITMAP = bitmap`
7575757575757575
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
5050505050505050`;
const ANSWER_RIGHT_BITMAP = bitmap`
57575757575757..
777777777777557.
777777777777755.
777777777777775.
777777777777770.
777777777777775.
777777777777770.
777777777777775.
777777777777770.
777777777777775.
777777777777770.
777777777777775.
777777777777770.
777777777777705.
777777777777050.
50505050505050..`;
const ARROR_UP_BITMAP = bitmap`
................
.......3........
......333.......
.....33333......
....3333333.....
...333333333....
......333.......
......333.......
......333.......
......333.......
......333.......
......333.......
......333.......
......333.......
......333.......
................`;
const ARROR_LEFT_BITMAP = bitmap`
................
................
................
................
.....3..........
....33..........
...333..........
..3333333333333.
.33333333333333.
..3333333333333.
...333..........
....33..........
.....3..........
................
................
................`;
const ARROR_DOWN_BITMAP = bitmap`
................
................
......333.......
......333.......
......333.......
......333.......
......333.......
......333.......
......333.......
......333.......
...333333333....
....3333333.....
.....33333......
......333.......
.......3........
................`;
const ARROR_RIGHT_BITMAP = bitmap`
................
................
................
................
..........3.....
..........33....
..........333...
.3333333333333..
.33333333333333.
.3333333333333..
..........333...
..........33....
..........3.....
................
................
................`;

// Prepared Bitmaps for internationalization
const FLAG_EN_BITMAP = bitmap`
................
23255..332555232
5232552332552325
5523252332523255
5552322332232555
5555232332325555
2222223333222222
3333333333333333
3333333333333333
2222223333222222
5555232332325555
5552322332232555
5523252332523255
5232552332552325
2325552332555232
................`;
const FLAG_DE_BITMAP = bitmap`
................
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
LLLLLLLLLLLLLLLL
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
6666666666666666
6666666666666666
6666666666666666
6666666666666666
................`;
const FLAG_ES_BITMAP = bitmap`
................
3333333333333333
3333333333333333
3333333333333333
3333333333333333
6666666666666666
6663363666666666
6636336666666666
6663336666666666
6663363666666666
6666666666666666
3333333333333333
3333333333333333
3333333333333333
3333333333333333
................`;
const FLAG_BR_BITMAP = bitmap`
................
DDDDDDDD6DDDDDDD
DDDDDDD666DDDDDD
DDDDDD66666DDDDD
DDDDD6666666DDDD
DDDD665555566DDD
DDD66555555566DD
DD6662225515666D
D666655522556666
DD6665155522666D
DDD66552155566DD
DDDD665552566DDD
DDDDD6666666DDDD
DDDDDD66666DDDDD
DDDDDDD464DDDDDD
................`;

// --------------------------- SOUNDS ---------------------------

const onLanguageSelected = tune`
500: G4~500 + E4/500,
500: G4/500 + C5~500,
500: C5/500 + E4/500 + G5~500,
14500`;

// Hint sounds for selecting 1 or 2 players
const onePlayerSelected = tune`
250: C5~250,
250,
250: G5~250 + C5~250,
7250`;
const twoPlayersSelected = tune`
250: C5~250,
250,
250: C5~250,
250,
250: G5~250 + C5~250,
6750`;

// Hint sounds for correct or wrong answers
const answerCorrect = tune`
187.5: F4~187.5 + A4~187.5,
187.5,
187.5: C5~187.5 + E5~187.5,
187.5: E5~187.5 + C5~187.5,
187.5: A5~187.5 + E5~187.5 + C5~187.5 + A4~187.5 + F4~187.5,
5062.5`;
const answerWrong = tune`
500: G5~500 + C5/500 + F4/500,
500: F5~500 + B4/500 + E4/500,
500: C4/500 + D5~500 + G4^500,
14500`;

// The melody once the game is over (and the GameOver screen is shown)
const gameOver = tune`
250: A5^250 + F5-250 + E4~250,
250,
250: A5^250 + F5-250 + B4/250 + D4~250,
250: A4/250,
250: G5^250 + E5-250 + E4~250,
250: A4/250,
250: G5^250 + E5-250,
250: G4/250,
250: E5^250 + C5-250 + F4/250 + E4~250,
250: G4/250,
250: G5^250 + E5-250 + D4~250,
250: F5^250 + D5-250 + B4/250,
250: E4~250 + C5-250 + E5^250,
250: G5^250 + E5-250 + D4~250,
250: G5-250 + E5/250 + C4~250 + C5-250,
4250`;


// --------------------------- Maps / Background ---------------------------


setLegend(
  [ BLACK, BLACK_BITMAP ],
  [ ANSWER_BG_LEFT, ANSWER_LEFT_BITMAP ],
  [ ANSWER_BG_MID, ANSWER_MID_BITMAP ],
  [ ANSWER_BG_RIGHT, ANSWER_RIGHT_BITMAP ],
  [ ARROW_UP, ARROR_UP_BITMAP ],
  [ ARROW_LEFT, ARROR_LEFT_BITMAP ],
  [ ARROW_DOWN, ARROR_DOWN_BITMAP ],
  [ ARROW_RIGHT, ARROR_RIGHT_BITMAP ],
  [ LANGUAGE_EN, FLAG_EN_BITMAP ],
  [ LANGUAGE_DE, FLAG_DE_BITMAP ],
  [ LANGUAGE_ES, FLAG_ES_BITMAP ],
  [ LANGUAGE_PT, FLAG_BR_BITMAP ],
)

// Screen Layout with answer slots
const ANSWER_SLOTS = [
  map`
............
............
............
............
lmmmmmmmr.U.
............
lmmmmmmmr.L.
............
lmmmmmmmr.D.
............`
]

// Screen Layout without answer slots (bascially an empty screen)
const NO_ANSWER_SLOTS = [
  map`
..
..`
]

// Screen Layout showing the languages
// the other array items only show the selected language
const LANGUAGE_SCREEN = [
  map`
.....eU
.....dL
.......
.......`,
  `
.....e.
.......
.......
.......`,
  `
.......
.....d.
.......
.......`
]

  
// --------------------------- Classes ---------------------------


/********************************************
 * Enum Class defining the game State
 ********************************************/
const GameState = {
  LANGUAGE_SELECTION: 0,
  INTRO: 1,
  GAME_SETUP: 2,
  PLAYING: 3,
  PRESENTING_SCORE: 4,
  ANOUNCE_WINNER: 5
};


/***************************************************
 * Enum Class defining the Question types available
 **************************************************/
const QuestionTypes = {
    NAME: 0,
    MASS: 1,
    PROTONS: 2,
    SYMBOL: 3
};


/***************************************************
 * Enum Class for the selected Language
 **************************************************/
const Language = {
    EN: 0,
    DE: 1,
    //ES: 2,
    //PT: 3
};


/*************************************************************
 *
 * This class represents one specific element and its values
 * like name, mass and amount of protons in it's core. 
 *
 ************************************************************/
class Element {
   constructor(nameEN, nameDE, protons, mass, symbol) {    
     this.nameEN = nameEN;
     this.nameDE = nameDE;
     this.protons = protons;
     this.mass = mass;
     this.symbol = symbol;
  } 
}

/**********************************************************************************************************
 *
 *  Game class that manages the game, score and player configs.
 *  It also contains enums for the specific GameState. The player input will be interpreted accordingly)
 *
 ***********************************************************************************************************/
class ChemistryGame {
  
  constructor() {
    this.gameState = GameState.LANGUAGE_SELECTION // The state the game is currently in (basically a simple StateMachine)
    this.scorePlayer1 = 0;          // The score for player 1
    this.scorePlayer2 = 0;          // The score for player 2
    this.amountPlayers = 1;         // The amount of players (left = player 1, right = player 2)
    this.questionNumber = 0;        // The number of the current questions
    this.questionsPerGame = 10;     // The amount of questions asked per game
    this.getNegativeScore = false;  // Defines whether wrong answers give negative points
    this.pse = this.generatePSE();  // Generates the elements of which some are selected for the questions
    this.questionTypes = [QuestionTypes.NAME, QuestionTypes.MASS, QuestionTypes.PROTONS, QuestionTypes.SYMBOL] // Which questions are asked
    this.language = Language.EN;    // The language of the game
  }

  
  /** This creates the elements which are picked for the questions.
   *  It only has to be done once (Atoms don't change after all)
   *  When a new game is started, we simply need to pick a different set of elements we want to ask questions about. */
  generatePSE(){
    var elementList = [];
    elementList.push(new Element("Hydrogen","Wasserstoff", 1, 1.0, "H"));
    elementList.push(new Element("Helium","Helium", 2, 4.0, "He"));
    elementList.push(new Element("Lithium","Lithium", 3, 6.94, "Li"));
    elementList.push(new Element("Beryllium","Beryllium", 4, 9.01, "Be"));
    elementList.push(new Element("Carbon","Kohlenstoff", 6, 12.01, "C"));
    elementList.push(new Element("Nitrogen","Stickstoff", 7, 14.01, "N"));
    elementList.push(new Element("Oxygen","Sauerstoff", 8, 15.99, "O"));
    elementList.push(new Element("Neon","Neon", 10, 20.18, "Ne"));
    elementList.push(new Element("Sodium","Natrium", 11, 22.99, "Na"));
    elementList.push(new Element("Magnesium","Magnesium", 12, 54.93, "Mg"));
    elementList.push(new Element("Aluminium","Aluminium", 13, 26.98, "Al"));
    elementList.push(new Element("Sulfur","Schwefel", 16, 32.06, "S"));
    elementList.push(new Element("Calcium","Calcium", 20, 40.08, "Ca"));
    elementList.push(new Element("Iron","Eisen", 26, 55.84, "Fe"));
    elementList.push(new Element("Copper","Kupfer", 29, 63.54, "Cu"));
    elementList.push(new Element("Silver","Silber", 47, 107.87, "Ag"));
    elementList.push(new Element("Tin","Zinn", 50, 118.71, "Sn"));
    elementList.push(new Element("Gold","Gold", 79, 196.97, "Au"));
    elementList.push(new Element("Mercury","Quecksilber", 80, 200.59, "Hg"));
    elementList.push(new Element("Lead","Blei", 82, 207.2, "Pb"));
    elementList.push(new Element("Uranium","Uran", 92, 238.03, "U"));
    elementList.push(new Element("Plutonium","Plutonium", 94, 244, "Pu"));
    return elementList;
  }
  

  // # 1 : LANGUAGE ------------
  

  /** Shows the language setting for the game. */
  showLanguageSetting(){
    this.gameState = GameState.LANGUAGE_SELECTION
    clearText();
    setBackground(BLACK);
    setMap(LANGUAGE_SCREEN[0]);
    
    addText(`Select Language`, {y:0, color: COLOR_TEXT})
    addText(`English`,    {x:1, y:3,  color: COLOR_TEXT})
    addText(`German`,     {x:1, y:6,  color: COLOR_TEXT})
    //addText(`Spanish`,    {x:1, y:9,  color: COLOR_TEXT})
    //addText(`Portuguese`, {x:1, y:12, color: COLOR_TEXT})
  }


  /** Sets the language of the game to a certain value and proceeds to the Game Setup */
  setLanguage(lang){
    this.language = lang;
    clearText();
    setBackground(BLACK);
    
    if (lang == Language.EN){
        setMap(LANGUAGE_SCREEN[1]);
        addText(`English`,    {x:1, y:3,  color: COLOR_HIGHLIGHT})
    } else if (lang == Language.DE){
        setMap(LANGUAGE_SCREEN[2]);
        addText(`German`,     {x:1, y:6,  color: COLOR_HIGHLIGHT})
    } /*else if (lang == Language.ES){
        setMap(LANGUAGE_SCREEN[3]);
        addText(`Spanish`,    {x:1, y:9,  color: color`2`})
    } else {
        setMap(LANGUAGE_SCREEN[4]);
        addText(`Portuguese`, {x:1, y:12, color: color`2`})
    } */

    // Play a "confirm" sound for the selected language
    playTune(onLanguageSelected);
    
    // Wait 2 seconds before proceed to the setup screen
    setTimeout(() => {
      this.showIntro();
    }, 2000);
  }

  
  // # 2 : INTRO ------------

  
  /* Shows the intro of the game.
   * transitions to the INTRO mode which resets the entire game, score and questions. */
  showIntro() {
    this.gameState = GameState.INTRO
    clearText();
    setBackground(BLACK);
    setMap(NO_ANSWER_SLOTS[0]);

    if(this.language == Language.DE){
      addText(`Willkommen`, {y:5, color: COLOR_TEXT})
      addText(`bei`, {y: 7,color: COLOR_TEXT})
      addText(`Good Chemistry`, {y: 9,color: COLOR_TEXT})
    } else {
      addText(`Welcome`, {y:5, color: COLOR_TEXT})
      addText(`to`, {y: 7,color: COLOR_TEXT})
      addText(`Good Chemistry`, {y: 9,color: COLOR_TEXT})
    }
  }

  
  // # 3 : SETUP SCREEN ------------
  
  
  /* Transitions to the player setup (either 1 or 2 players)
   * Here the player(s) have to decide how many people want to play */
  showGameSetup() {
    this.gameState = GameState.GAME_SETUP;
    setMap(NO_ANSWER_SLOTS[0]);
    clearText();
    setBackground(BLACK);
    this.printGameSetup();
  }

  
  /* Toggles the amount of players for this game (1 or 2) */
  toggleAmountPlayers() {
    if (this.amountPlayers == 1){
      this.amountPlayers = 2; 
    } else {
      this.amountPlayers = 1; 
    }
    // Update the setup texts
    this.printGameSetup();
  }
  

  /* Toggles the amount of Questions for this game (1 or 2) */
  toggleAmountQuestions() {
    if (this.questionsPerGame < 20){
      this.questionsPerGame += 5;
    } else {
      this.questionsPerGame = 5;
    }
    // Update the setup texts
    this.printGameSetup();
  }
  

  /* Toggles negative points for wrong answers */
  toggleNegativeScore() {
    this.getNegativeScore = !this.getNegativeScore
    // Update the setup texts
    this.printGameSetup();
  }


  /** Helper function printing the game settings so we can call it
    * after each configuration change and always get the current setup printed */
  printGameSetup(){
    clearText();
    setBackground(BLACK);

    if(this.language == Language.DE){
      addText(`Einstellungen`, {color: COLOR_TEXT})
      
      addText(`Spielstart: W / I`, {x: 0, y: 3,color: COLOR_HIGHLIGHT})
      
      addText(`Spieleranzahl: ${this.amountPlayers}`, {x: 0, y: 5,color: COLOR_TEXT})
      addText(`Wechsel: A / J`, {x: 0, y: 6,color: COLOR_HIGHLIGHT})
  
      addText(`Fragen: ${this.questionsPerGame}`, {x: 0, y: 8,color: COLOR_TEXT})
      addText(`Wechsel: S / K`, {x: 0, y: 9,color: COLOR_HIGHLIGHT})
  
      addText(`Minuspunkte: ${this.getNegativeScore}`, {x: 0, y: 11,color: COLOR_TEXT})
      addText(`Wechsel: D / L`, {x: 0, y: 12,color: COLOR_HIGHLIGHT})
    } else {
      addText(`Game setup`, {color: COLOR_TEXT})
      
      addText(`Start Game: W / I`, {x: 0, y: 3,color: COLOR_HIGHLIGHT})
      
      addText(`Amount Players: ${this.amountPlayers}`, {x: 0, y: 5,color: COLOR_TEXT})
      addText(`Change: A / J`, {x: 0, y: 6,color: COLOR_HIGHLIGHT})
  
      addText(`Questions: ${this.questionsPerGame}`, {x: 0, y: 8,color: COLOR_TEXT})
      addText(`Change: S / K`, {x: 0, y: 9,color: COLOR_HIGHLIGHT})
  
      addText(`Minus Points: ${this.getNegativeScore}`, {x: 0, y: 11,color: COLOR_TEXT})
      addText(`Change: D / L`, {x: 0, y: 12,color: COLOR_HIGHLIGHT})
    }
  }


  // # 4 : PLAY ------------
  
  
  /** This starts the game with the given amount of players (either 1 or 2) */
  startGame(){
    clearText();
    setBackground(BLACK);
    setMap(NO_ANSWER_SLOTS[0]);
    
    // Reset scores and questions, then play a tune to indicate the amount of players
    this.questionNumber = 0;
    this.scorePlayer1 = 0;
    this.scorePlayer2 = 0;
    if (this.amountPlayers == 1){
      playTune(onePlayerSelected);
    } else {
      playTune(twoPlayersSelected);
    }
    
    // Create questions
    this.questions = [];
    for(let i = 0; i < this.questionsPerGame; i++) {
      // Pick random elements from the PSE which will create the questions.
      var element = this.pse[Math.floor(Math.random()*this.pse.length)];
      this.questions.push(element); 
    }

    this.questionTypes = [QuestionTypes.NAME,QuestionTypes.MASS, QuestionTypes.PROTONS, QuestionTypes.SYMBOL]
    this.showQuestion(this.questionNumber);
  }

  
  /* Shows the question with the given number of the set of questions for this game
   * We will start with question 0, then 1, 2, 3 ...
   * Once the questionNumber reaches the last question we transition to showEndGame */
  showQuestion(questionNumber){
    clearText();
    setBackground(BLACK);
    setMap(ANSWER_SLOTS[0]);
    // Switching to the state of "Playing" so we are accepting Input (and thus we are not presenting the result)
    this.gameState = GameState.PLAYING;

    // Check if the game is over. If so, show the end game mode!
    if (questionNumber >= this.questions.length){
      this.showEndGame();
      return;
    }

    // Pick the elements for that question (including 3 wrong answers)
    var element = this.questions[questionNumber];
    var answers = [];
    answers.push(element); //always add the right one, then fill up with others
    do{
      var e = this.pse[Math.floor(Math.random()*this.pse.length)];
      if(!answers.includes(e)){
        answers.push(e);
      }
    } while(answers.length < TOTAL_ANSWERS);
    this.shuffle(answers); //Shuffle the array afterwards
    
    // store all answers (not sure if we need that. Maybe for removing wrong answers for player 2!?)
    this.allAnswers = answers;

    // store the insed of the correct answer so we can evaluate it on user input
    this.rightAnswerNumber = answers.indexOf(element);

    // Show the questions:
    addText(`Question ${questionNumber+1} / ${this.questions.length} `, {color: COLOR_TEXT})
    
    let questionType = this.questionTypes[Math.floor(Math.random()*this.questionTypes.length)];
    if(questionType == QuestionTypes.NAME){
      if(this.language == Language.DE){
        addText(`Welches Element hat`, {x:0, y:2, color: COLOR_TEXT})
        addText(`das Symbol: ${element.symbol}?`, {x:0, y:3, color: COLOR_TEXT})
        addText(`1: ${answers[0].nameDE}`, {x: 1, y:7, color: COLOR_ANSWER})  // Answer 1
        addText(`2: ${answers[1].nameDE}`, {x: 1, y:10, color: COLOR_ANSWER}) // Answer 2
        addText(`3: ${answers[2].nameDE}`, {x: 1, y:13, color: COLOR_ANSWER}) // Answer 3
      } else {
        addText(`What is the name of`, {x:0, y:2, color: COLOR_TEXT})
        addText(`Element ${element.symbol}?`, {x:0, y:3, color: COLOR_TEXT})
        addText(`1: ${answers[0].nameEN}`, {x: 1, y:7, color: COLOR_ANSWER})  // Answer 1
        addText(`2: ${answers[1].nameEN}`, {x: 1, y:10, color: COLOR_ANSWER}) // Answer 2
        addText(`3: ${answers[2].nameEN}`, {x: 1, y:13, color: COLOR_ANSWER}) // Answer 3
      }     
    
    } else if (questionType == QuestionTypes.MASS){  
      if(this.language == Language.DE){
        addText(`Die Masse`, {x:0, y:2, color: COLOR_TEXT})
        addText(`von ${element.nameDE} ist:`, {x:0, y:3, color: COLOR_TEXT})
        addText(`1: ${answers[0].mass}`, {x: 1, y:7, color: COLOR_ANSWER})  // Answer 1
        addText(`2: ${answers[1].mass}`, {x: 1, y:10, color: COLOR_ANSWER}) // Answer 2
        addText(`3: ${answers[2].mass}`, {x: 1, y:13, color: COLOR_ANSWER}) // Answer 3
      } else {
        addText(`What is the mass`, {x:0, y:2, color: COLOR_TEXT})
        addText(`of ${element.nameEN}?`, {x:0, y:3, color: COLOR_TEXT})
        addText(`1: ${answers[0].mass}`, {x: 1, y:7, color: COLOR_ANSWER})  // Answer 1
        addText(`2: ${answers[1].mass}`, {x: 1, y:10, color: COLOR_ANSWER}) // Answer 2
        addText(`3: ${answers[2].mass}`, {x: 1, y:13, color: COLOR_ANSWER}) // Answer 3
      }
      
    } else if (questionType == QuestionTypes.PROTONS){
      if(this.language == Language.DE){
        addText(`Wie viele Protonen`, {x:0, y:2, color: COLOR_TEXT})
        addText(`hat ${element.nameDE}?`, {x:0, y:3, color: COLOR_TEXT})
        addText(`1: ${answers[0].protons}`, {x: 1, y:7, color: COLOR_ANSWER})  // Answer 1
        addText(`2: ${answers[1].protons}`, {x: 1, y:10, color: COLOR_ANSWER}) // Answer 2
        addText(`3: ${answers[2].protons}`, {x: 1, y:13, color: COLOR_ANSWER}) // Answer 3 
      } else {
        addText(`How many protons`, {x:0, y:2, color: COLOR_TEXT})
        addText(`does ${element.nameEN} have?`, {x:0, y:3, color: COLOR_TEXT})
        addText(`1: ${answers[0].protons}`, {x: 1, y:7, color: COLOR_ANSWER})  // Answer 1
        addText(`2: ${answers[1].protons}`, {x: 1, y:10, color: COLOR_ANSWER}) // Answer 2
        addText(`3: ${answers[2].protons}`, {x: 1, y:13, color: COLOR_ANSWER}) // Answer 3 
      }
      
    } else { // QuestionTypes.SYMBOL
      if(this.language == Language.DE){
        addText(`Wie ist das Symbol`, {x:0, y:2, color: COLOR_TEXT})
        addText(`von ${element.nameDE}?`, {x:0, y:3, color: COLOR_TEXT})
        addText(`1: ${answers[0].symbol}`, {x: 1, y:7, color: COLOR_ANSWER})  // Answer 1
        addText(`2: ${answers[1].symbol}`, {x: 1, y:10, color: COLOR_ANSWER}) // Answer 2
        addText(`3: ${answers[2].symbol}`, {x: 1, y:13, color: COLOR_ANSWER}) // Answer 3
      } else {
        addText(`What is the symbol`, {x:0, y:2, color: COLOR_TEXT})
        addText(`of ${element.nameEN}?`, {x:0, y:3, color: COLOR_TEXT})
        addText(`1: ${answers[0].symbol}`, {x: 1, y:7, color: COLOR_ANSWER})  // Answer 1
        addText(`2: ${answers[1].symbol}`, {x: 1, y:10, color: COLOR_ANSWER}) // Answer 2
        addText(`3: ${answers[2].symbol}`, {x: 1, y:13, color: COLOR_ANSWER}) // Answer 3
      }
    }

    // At the bottom, wrote the score:
    addText(`P1: ${this.scorePlayer1}`, {x:1, y:15, color: COLOR_PLAYER1})

    // Show the player 2 score only if 2 players are actually playing
    if (this.amountPlayers == 2){
      addText(`P2: ${this.scorePlayer2}`, {x:12, y:15, color: COLOR_PLAYER2})
    }
  }

  
  /* A simple and fast way to shuffle an array. This is needed in 
   * order to get the right answer in different slots */
  shuffle(array) {
    let currentIndex = array.length;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  }
  

  /** Evaluates the given answer of the given player
   *  Then proceeds with the next question */
  evaluateAnswer(player, answer){
    if (player == 2 && this.amountPlayers == 1){
      // We assume the player accidentally pressed the wrong button
      return;
    }

    // Switches to the state of "presenting" so we ignore input
    // Once the function is finished (and the timeout over) we switch 
    // to showQuestion again setting it to state "PLAYING" again
    this.gameState = GameState.PRESENTING_SCORE;
    
    clearText();
    setBackground(BLACK);
    setMap(NO_ANSWER_SLOTS[0]);

    if(answer == this.rightAnswerNumber){
      // Correct
      playTune(answerCorrect);
      
      if(this.language == Language.DE){
        addText(`Richtig`, {y:7, color: COLOR_CORRECT});
      } else {
        addText(`Correct`, {y:7, color: COLOR_CORRECT});
      }
      
      if (player == 1){
        addText(`Player 1`, {y:9, color: COLOR_PLAYER1});
        this.scorePlayer1++;
      } else {
        addText(`Player 2`, {y:9, color: COLOR_PLAYER2});
        this.scorePlayer2++;
      }
    } else {
      // Wrong
      playTune(answerWrong);
      
      if(this.language == Language.DE){
        addText(`Falsch`, {y:7, color: COLOR_WRONG});
      } else {
        addText(`Wrong`, {y:7, color: COLOR_WRONG});
      }
      
      if (player == 1){
        addText(`Player 1`, {y:9, color: COLOR_PLAYER1});
        if(this.getNegativeScore){
          this.scorePlayer1--;
        }
      } else {
        addText(`Player 2`, {y:9, color: COLOR_PLAYER2});
        if(this.getNegativeScore){
          this.scorePlayer2--;
        }
      }
    }
    
    // Wait 2 seconds before proceed to the next question
    setTimeout(() => {
      this.questionNumber++;
      this.showQuestion( this.questionNumber);
    }, 2000)
  }


  // # 5 : GAME OVER ------------
  
  
  /** Shows the result (and winner) of the game */
  showEndGame() {
    this.gameState = GameState.ANOUNCE_WINNER;
    clearText();
    setBackground(BLACK);
    setMap(NO_ANSWER_SLOTS[0]);
    
    playTune(gameOver);

    if (this.amountPlayers == 1){ // SINGLE PLAYER
      // No need in showing who won. Show the score instead!
      
      if(this.language == Language.DE){
        addText(`Spiel vorbei!`, {y: 3, color: COLOR_TEXT});
        addText(`Du hast:`, {y: 5, color: COLOR_TEXT});
        addText(`${this.scorePlayer1} Punkte`, {y: 7, color: COLOR_PLAYER1});
        if(this.scorePlayer1 == this.questionsPerGame){
          addText(`PERFEKT!!!`, {y: 9, color: COLOR_PLAYER1});
        }        
      } else {
        addText(`Game over!`, {y: 3, color: COLOR_TEXT});
        addText(`You got:`, {y: 5, color: COLOR_TEXT});
        addText(`${this.scorePlayer1} Points`, {y: 7, color: COLOR_PLAYER1});
        if(this.scorePlayer1 == this.questionsPerGame){
          addText(`PERFECT!!!`, {y: 9, color: COLOR_PLAYER1});
        }
      }
      
    } else { // MULTIPLAYER
      // Show who won (or the draw if both have the same score)
      
      if(this.language == Language.DE){
        addText(`Spiel vorbei!`, {y: 3, color: COLOR_TEXT});
      } else {
        addText(`Game over!`, {y: 3, color: COLOR_TEXT});
      }
      if (this.scorePlayer1 == this.scorePlayer2){
        if(this.language == Language.DE){
          addText(`Gleichstand!`, {y: 6, color: COLOR_HIGHLIGHT});
        } else {
          addText(`Draw!`, {y: 6, color: COLOR_HIGHLIGHT});
        }
      } else if (this.scorePlayer1 > this.scorePlayer2){
        if(this.language == Language.DE){
          addText(`Spieler 1 gewinnt!`, {y: 6, color: COLOR_PLAYER1})
        } else {
           addText(`Player 1 won!`, {y: 6, color: COLOR_PLAYER1})
        }
      } else {
        if(this.language == Language.DE){
          addText(`Spieler 2 gewinnt!`, {y: 6, color: COLOR_PLAYER2})
        } else {
          addText(`Player 2 won!`, {y: 6, color: COLOR_PLAYER2})
        }
      }
    }

    if(this.language == Language.DE){
      addText(`Taste W oder I`, {y: 11, color: COLOR_TEXT})
      addText(`zum Neustart!`, {y: 12, color: COLOR_TEXT})
    } else {
      addText(`Press W or I`, {y: 11, color: COLOR_TEXT})
      addText(`to restart!`, {y: 12, color: COLOR_TEXT})
    }
  }

  
  // --------------------------------------------
  // ----- Inputs handled by the game class -----
  // --------------------------------------------

  
  // ----- PLAYER 1 (left side) -----
  
  // Reaction to when the "W" key is pressed (left UP)
  onWPressed(){
    if (this.gameState == GameState.LANGUAGE_SELECTION) {
      game.setLanguage(Language.EN);
    } else if (this.gameState == GameState.INTRO) {
      game.showGameSetup();
    } else if (this.gameState == GameState.GAME_SETUP) {
      game.startGame();
    } else if (game.gameState == GameState.PLAYING) {
      game.evaluateAnswer(1, 0);      
    } else if (game.gameState == GameState.ANOUNCE_WINNER) {
      game.showGameSetup();
    }
  }

  // Reaction to when the "A" key is pressed (left LEFT)
  onAPressed(){
    if (this.gameState == GameState.LANGUAGE_SELECTION) {
      game.setLanguage(Language.DE);
    } else if (this.gameState == GameState.INTRO) {
      game.showGameSetup();
    } else if (this.gameState == GameState.LANGUAGE_SELECTION) {
      game.setLanguage(Language.DE);
    } else if (this.gameState == GameState.GAME_SETUP) {
      game.toggleAmountPlayers();
    } else if (game.gameState == GameState.PLAYING) {
      game.evaluateAnswer(1, 1);  
    } else if (game.gameState == GameState.ANOUNCE_WINNER) {
        
    }
  }

  // Reaction to when the "S" key is pressed (left DOWN)
  onSPressed(){
    if (this.gameState == GameState.LANGUAGE_SELECTION) {
      //game.setLanguage(Language.ES);
    } else if (this.gameState == GameState.INTRO) {
      game.showGameSetup();
    } else if (this.gameState == GameState.GAME_SETUP) {
      game.toggleAmountQuestions();
    } else if (game.gameState == GameState.PLAYING) {
      game.evaluateAnswer(1, 2);
    } else if (game.gameState == GameState.ANOUNCE_WINNER) {
      // Nothing to do here
    }
  }

  // Reaction to when the "D" key is pressed (left RIGHT)
  onDPressed(){
    if (this.gameState == GameState.LANGUAGE_SELECTION) {
      //game.setLanguage(Language.PT);
    } else if (this.gameState == GameState.INTRO) {
      game.showGameSetup();
    } else if (this.gameState == GameState.GAME_SETUP) {
      game.toggleNegativeScore();
    } else if (game.gameState == GameState.PLAYING) {
      // Nothing to do here
    } else if (game.gameState == GameState.ANOUNCE_WINNER) {
      // Nothing to do here
    }
  }

  // ----- PLAYER 2 (right side) -----
  
  // Reaction to when the "I" key is pressed (right UP)
  onIPressed(){
    if (this.gameState == GameState.LANGUAGE_SELECTION) {
      game.setLanguage(Language.EN);
    } else if (this.gameState == GameState.INTRO) {
      game.showGameSetup();
    } else if (this.gameState == GameState.GAME_SETUP) {
      game.startGame();
    } else if (game.gameState == GameState.PLAYING) {
      game.evaluateAnswer(2, 0);
    } else if (game.gameState == GameState.ANOUNCE_WINNER) {
      game.showGameSetup();
    }
  }

  // Reaction to when the "J" key is pressed (left LEFT)
  onJPressed(){
    if (this.gameState == GameState.LANGUAGE_SELECTION) {
      game.setLanguage(Language.DE);
    } else if (this.gameState == GameState.INTRO) {
      game.showGameSetup();
    } else if (this.gameState == GameState.GAME_SETUP) {
      game.toggleAmountPlayers();
    } else if (game.gameState == GameState.PLAYING) {
      game.evaluateAnswer(2, 1);
    } else if (game.gameState == GameState.ANOUNCE_WINNER) {
      // Nothing to do here  
    }
    
  }

  // Reaction to when the "K" key is pressed (left DOWN)
  onKPressed(){
    if (this.gameState == GameState.LANGUAGE_SELECTION) {
      //game.setLanguage(Language.ES);
    } else if (this.gameState == GameState.INTRO) {
      game.showGameSetup();
    } else if (this.gameState == GameState.GAME_SETUP) {
      game.toggleAmountQuestions();
    } else if (game.gameState == GameState.PLAYING) {
      game.evaluateAnswer(2, 2);
    } else if (game.gameState == GameState.ANOUNCE_WINNER) {
      // Nothing to do here  
    }
  }

  // Reaction to when the "L" key is pressed (left RIGHT)
  onLPressed(){
    if (this.gameState == GameState.LANGUAGE_SELECTION) {
      //game.setLanguage(Language.PT);
    } else if (this.gameState == GameState.INTRO) {
      game.showGameSetup();
    } else if (this.gameState == GameState.GAME_SETUP) {
      game.toggleNegativeScore();
    } else if (game.gameState == GameState.PLAYING) {
      // Nothing to do here
    } else if (game.gameState == GameState.ANOUNCE_WINNER) {
      // Nothing to do here
    }
  }
  
} // End of ChemistryGame class



// ----------------------------------------------------------------------------------------------------------------------------
//  The top-level code begins here
// ----------------------------------------------------------------------------------------------------------------------------



// -------------- INPUTS --------------

onInput("w", () => { game.onWPressed(); })
onInput("a", () => { game.onAPressed(); })
onInput("s", () => { game.onSPressed(); })
onInput("d", () => { game.onDPressed(); })

onInput("i", () => { game.onIPressed(); })
onInput("j", () => { game.onJPressed(); })
onInput("k", () => { game.onKPressed(); })
onInput("l", () => { game.onLPressed(); })

// Create a game
let game = new ChemistryGame();

// Then show the language setup. The rest will be done by the game class.
game.showLanguageSetting();
