/*
@title: Party Games
@author: iambodha
@tags: ['multiplayer']
@addedOn: 2024-06-22
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@img: ""
*/

const background = "b";
const character_arrow_right = ">"
const character_arrow_left = "<"
const colorPaletteMainMenu = ['C', '3', 'C', 'C', '1', '1', 'C', '2', '2', '3', '1', '1', '1', '1', 'C', '4'];
const colorPaletteSpy = ['C', '3', 'C', 'C', '1', '1', 'C', '2', '3', 'C', '1', '1', '1', '1', 'C', '4'];
const spyWords = ['       Monopoly     ', '        Phone       ', '        Laptop      ', '      Headphones    ', '          TV        ', '       Parents      ', '       Friends      ', '     Husband/Wife   ', '  Boyfriend/Husband ', '        Pizza       ', '        Ramen       ', '        Burger      ', '        Sushi       ', '       Hot Dog      ', '         Dosa       ', '        Chips       ', '       Popcorn      ', '        Cookie      ', '     Paneer Tikka   ', '       Smoothie     ', '        Juice       ', '        Water       ', '         Fart       ', '         Rain       ', '         Snow       ', '        Money       ', '        Coins       ', '        Camera      ', '        Drone       ', '        Disney      ', '        Mouse       ', '       Keyboard     ', '      Microphone    ', '     Rubix Cubes    ', '         Toys       ', '       Cooking      ', '     Electricity    ', '        Batman      ', '        Flash       ', '       Iron Man     ', '      Spider Man    ', '     Wonder Woman   ', '      Super Man     ', '         Thor       ', '       Dustbin      ', '         Gun        ', '     Escape Room    ', '   Sherlock Holmes  ', '         Time       ', '        Chess       ', '       Football     ', '      Basketball    ', '      Volleyball    ', '  Cristiano Ronaldo ', 'Dwayne Johnson(Rock)', '     Johnny Depp    ', '     Taylor Swift   ', '  Robert Downey Jr. ', '  Leonardo DiCaprio ', '      Tom Cruise    ', '      Bouldering    ', '       Kayaking     ', '        Paris       ', '        Berlin      ', '    New York City   ', '      Skydiving     ', '       Birthday     ', '     Anniversary    ', '      Mona Lisa     ', '       New Year     ', '        China       ', '        Turkey      ', '        India       ', '         USA        ', '       Germany      ', '        Italy       ', '        France      ', '     South Africa   ', '         Dog        ', '         Cat        ', '        Horse       ', '        Human       ', '         Cow        ', '        Monkey      ', '     Grandparents   ', '        Japan       ', '        Pencil      ', '        Eraser      ', '       Teacher      ', '        Doctor      ', '        Server      ', '      Elon Musk     ', ' Your Class Teacher', '        Earth       ', '         Mars       ', '         Sun        ', '         Moon       ', '       Youtube      ', '      Instagram     ', '        Tiktok      ', '       Snapchat     ', '       Facebook     ', '       MrBeast      ', '      PewDiePie     ', '     Selena Gomez   ', '      Ed Sheeran    ', '       Pyramid      ', ' Great Wall of China', '      Minecraft     ', '       Fortnite     ', '        GTA V       ', '        Mario       ']

setLegend(
  [ background, bitmap`
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
  [character_arrow_right, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000002000
0000000000002220
2222222222222222
2222222222222222
0000000000002220
0000000000002000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [character_arrow_left, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0002000000000000
0222000000000000
2222222222222222
2222222222222222
0222000000000000
0002000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
)

setSolids([])

let level = 0
let currentGameMode = 0
let gameSetting = 0
const levels = [
  map`
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
b<bbbbbbbbbbbbbbbb>b
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
b<bbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbb>b
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
b<bbbbbbbbbbbbbbbb>b
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
b<bbbbbbbbbbbbbbbb>b
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
b<bbbbbbbbbbbbbbbb>b
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
b<bbbbbbbbbbbbbbbb>b
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
b<bbbbbbbbbbbbbbbb>b
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
b<bbbbbbbbbbbbbbbb>b
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
b<bbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb`,
  map`
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb
bbbbbbbbbbbbbbbbbbbb`,
]

const levelTexts = [
  ["", "     Party Games", "", "", "   Choose the game", "", "", "", "         Spy", "", "Everyone gets a word", "  except the spies", "who try to guess the", "         word.", "", "      Confirm(W)"],
  ["", "     Party Games", "", "", "   Choose the game", "", "", "", "     Party Bomb", "", "Everyone has a theme", " ,say words related", " to the theme until ", " the bomb explodes.", "", "      Confirm(W)"],
  ["", "     Party Games", "", "", "   Choose the game", "", "", "", "      Paranoia", "", "    Ask questions", "   secretly, name", " someone, coin flip", "decides if you hear.", "", "      Confirm(W)"],
  ["", "         Spy", "", "", "   Choose the game", "        format", "", "", "      2 players", "        1 spy", "", "", "", "", "", "      Confirm(I)"],
  ["", "         Spy", "", "", "   Choose the game", "        format", "", "", "      3 players", "        1 spy", "", "", "", "", "", "      Confirm(I)"],
  ["", "         Spy", "", "", "   Choose the game", "        format", "", "", "      4 players", "        1 spy", "", "", "", "", "", "      Confirm(I)"],
  ["", "         Spy", "", "", "   Choose the game", "        format", "", "", "      5 players", "        1 spy", "", "", "", "", "", "      Confirm(I)"],
  ["", "         Spy", "", "", "   Choose the game", "        format", "", "", "      5 players", "        2 spy", "", "", "", "", "", "      Confirm(I)"],
  ["", "         Spy", "", "", "   Choose the game", "        format", "", "", "      6 players", "        2 spy", "", "", "", "", "", "      Confirm(I)"],
  ["", "         Spy", "", "", "   Choose the game", "        format", "", "", "      7 players", "        2 spy", "", "", "", "", "", "      Confirm(I)"],
  ["", "         Spy", "", "", "   Choose the game", "        format", "", "", "      8 players", "        2 spy", "", "", "", "", "", "      Confirm(I)"],
  ["", "         Spy", "", "", "", "", "", "     You are the", "         Spy","", "", "", "", "", "", "      Confirm(K)"],
  ["", "         Spy", "", "", "", "", "", "     The word is", "","", "", "", "", "", "", "      Confirm(K)"],
  ["", "         Spy", "", "", "", "", "", " Pass to next person", "","", "", "", "", "", "", "      Confirm(K)"],
];

function addLevelTexts(colorPalette) {
  for (let i = 0; i < levelTexts[level].length; i++) {
    addText(levelTexts[level][i], {
      x: 0,
      y: i,
      color: color`${colorPalette[i]}`
    });
  }
}

function clearAllText() {
  for (let i = 0; i < height(); i++) {
    clearText(i);
  }
}

function updateClock(timeLeft, callback) {
  clearAllText();
  
  addText(`   Time Left: ${timeLeft}`, { x: 0, y: 8, color: color`4` });

  if (timeLeft > 0) {
    setTimeout(function() {
      updateClock(timeLeft - 1, callback);
    }, 1000);
  } else {
    clearAllText();
    addText("     Time's up!", { x: 0, y: 8, color: color`3` });
    setTimeout(function() {
        startSpyGameManager();
    }, 10000);
  }
}

function startSpyGameManager() {
  startSpyGame(gameSetting);
}

function startSpyGame(gameSetting) {
  clearAllText();

  const randomIndex = Math.floor(Math.random() * spyWords.length);
  const selectedWord = spyWords[randomIndex];

  const wordList = Array(gameSetting).fill(selectedWord);

  if (gameSetting <= 6) {
    const spyIndex = Math.floor(Math.random() * gameSetting);
    wordList[spyIndex] = 'SPY';
  } else if (gameSetting >= 7 && gameSetting <= 10) {
    const spyIndices = new Set();
    while (spyIndices.size < 2) {
      spyIndices.add(Math.floor(Math.random() * gameSetting));
    }
    spyIndices.forEach(index => {
      wordList[index] = 'SPY';
    });
  }

  const newList = ['WAIT'];
  wordList.forEach((word, index) => {
    newList.push(word);
    if (index < wordList.length - 1) {
      newList.push("WAIT");
    }
  });

  let currentIndex = 0;
  let functionEnded = false;

  function displayWord(index) {
    clearAllText();
    if (newList[index] === 'SPY') {
      level = 11;
      setMap(levels[level]);
      addLevelTexts(colorPaletteSpy);
    } else if (newList[index] === 'WAIT') {
      level = 13;
      setMap(levels[level]);
      addLevelTexts(colorPaletteMainMenu);
    } else {
      level = 12;
      setMap(levels[level]);
      addLevelTexts(colorPaletteMainMenu);
      addText(newList[index], {
        x: 0,
        y: 8,
        color: color`${colorPaletteMainMenu[8]}`
      });
    }
  }

  displayWord(currentIndex);
  
  onInput("k", () => {
    if (functionEnded) return;

    currentIndex++;
    if (currentIndex < newList.length) {
      displayWord(currentIndex);
    } else {
      clearAllText();
      updateClock(120, () => {
        console.log("Transitioning to the next phase of the game.");
      });
      functionEnded = true;
    }
  });
}



addLevelTexts(colorPaletteMainMenu);

setMap(levels[level])

onInput("d", () => {
  if (level >= 0 && level < 0) {
    level = Math.min(level + 1, 2);
    clearAllText();
    setMap(levels[level]);
    addLevelTexts(colorPaletteMainMenu);
    currentGameMode = level;
  }
  if (level >= 3 && level < 10) {
    level = Math.min(level + 1, 10);
    clearAllText();
    setMap(levels[level]);
    addLevelTexts(colorPaletteMainMenu);
  }
});

onInput("a", () => {
  if (level > 0 && level <= 0) {
    level = Math.max(level - 1, 0);
    clearAllText();
    setMap(levels[level]);
    addLevelTexts(colorPaletteMainMenu);
    currentGameMode = level;
  }
  if (level > 3 && level <= 10) {
    level = Math.max(level - 1, 2);
    clearAllText();
    setMap(levels[level]);
    addLevelTexts(colorPaletteMainMenu);
  }
});

onInput("w", () => {
  if (currentGameMode === 0) {
    level = 3;
    clearAllText();
    setMap(levels[level]);
    addLevelTexts(colorPaletteMainMenu);
  }
});

onInput("i", () => {
  if (currentGameMode === 0 && level >= 3 && level <= 10) {
    gameSetting = level;
    currentGameMode = 4
    startSpyGameManager();
  }
});

afterInput(() => {
  
})
