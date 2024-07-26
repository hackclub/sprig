/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: Guessing game
@author: 
@tags: []
@addedOn: 2024-00-00
*/

slides = new Array(
  new Array( "welcome" ,"to Guess who said", "to play press w"),
  //new Array("Select an option:", ":Famous Quote" ,"version", ":Movie version"),
  new Array("1 who said \"Toto" ,"Ive a feeling" ,"were not in kansas" ,"any more\"",
            "a) Alice", 
            "w) Lucy", 
            "s) Dorothy", 
            "d) Wendy",),
  new Array("2 who said \"may the" ,"force be" ,"with you\"",
           "a) Luke",
           "w) Obi-Wan",
           "s) Lea",
           "d) Han Solo",),
  new Array("3 who said \"you are" ,"a brick\"",
           "a) Polly",
           "w) Digory",
           "s) Uncle Andrew",
           "d) White Witch", ),
  new Array("4 who said \"off" ,"with there heads\"",
           "a) White Witch", 
           "w) Evil Witch" ,"of the West",
           "s) Queen of Hearts",
           "d) Queen Heart",),
  new Array("5 who said \"dooty" ,"is dooty\"",
           "a) Captian Nemo",
           "w) Cap'n Silver",
           "s) Captian Hook",
           "d) Other",),
  new Array("6 who said \"so we" ,"meet again\"",
           "a) Queen Ruby",
           "w) Scarlet Overkill",
           "s) Queen Jasper",
           "d) Queen Scarlet",),
  new Array("7 who said \"I have" ,"the wipe" ,"in my pocket\"",
           "a) Oliver",
           "w) Charley",
           "s) Huck",
           "d) Tom",),
  new Array("8 who said \"we did" ,"it\"",
           "a) Gru",
           "w) Frodo",
           "s) Gandalf",
           "d) Peter",),
   new Array("9 who said \"this is" ,"hardly the time\"",
           "a) Tintin",
           "w) Captian",
           "s) Thompson",
           "d) Calcalus",),
   new Array("10 who said \"but I" ,"dont like lolilpops\"",
           "a) Butler",
           "w) Holly",
           "s) Root",
           "d) Artemis",),
  new Array("11 who said \"The" ,"only thing" ,"we have to fear" ,"is fear itself\"",
           "a) FD Roosevelt",
           "w) JFK",
           "s) TeddyRoosevelt",
           "d) Eisenhower",),
  new Array("12 who said \"Well" ,"done is" ,"better than" ,"well said\"",
           "a) FD Roosevelt",
           "w) JFK",
           "s) BenjaminFranklin",
           "d) Nixon",),
  new Array("13 who said \"The" ,"only impossible" ,"journey is the one" ,"you never" ,"begin\"",
           "a) Oscer Wilde",
           "w) Tony Robbins",
           "s) Babe Ruth",
           "d) Aristotle",),
  new Array("14 who said \"Be" ,"yourself; everyone" ,"else is already" ,"taken\"",
           "a) Oscer Wilde",
           "w) Tony Robbins",
           "s) Babe Ruth",
           "d) Aristotle",),
  new Array("15 who said\"Only a" ,"life lived for" ,"others is a" ,"life worthwhile\"",
           "a) Oscer Wilde",
           "w) Aristotle",
           "s) Albert Einstein",
           "d) Nelson Mandela",),
  new Array("You made it. Good" ,"job. Thank you" ,"for playing." ,"To restart press j"),
)
let lastKey = ""
let addScore = 0

const Background = "b"
const melody = tune`
288.46153846153845: G4^288.46153846153845 + F4~288.46153846153845,
288.46153846153845: D5^288.46153846153845 + C5~288.46153846153845,
288.46153846153845: D5^288.46153846153845 + C5~288.46153846153845,
288.46153846153845: A4^288.46153846153845 + G4~288.46153846153845,
288.46153846153845: G4^288.46153846153845 + F4~288.46153846153845,
288.46153846153845: G4^288.46153846153845 + F4~288.46153846153845,
288.46153846153845: D4^288.46153846153845 + C4~288.46153846153845,
288.46153846153845: G4^288.46153846153845 + F4~288.46153846153845,
288.46153846153845: G4^288.46153846153845 + F4~288.46153846153845,
288.46153846153845: A4^288.46153846153845 + G4~288.46153846153845,
288.46153846153845: G4^288.46153846153845 + F4~288.46153846153845,
288.46153846153845,
288.46153846153845: G4^288.46153846153845 + F4~288.46153846153845,
288.46153846153845: D5^288.46153846153845 + C5~288.46153846153845,
288.46153846153845: D5^288.46153846153845 + C5~288.46153846153845,
288.46153846153845: A4^288.46153846153845 + G4~288.46153846153845,
288.46153846153845: G4^288.46153846153845 + F4~288.46153846153845,
288.46153846153845: G4^288.46153846153845 + F4~288.46153846153845,
288.46153846153845: D4^288.46153846153845 + C4~288.46153846153845,
288.46153846153845: G4^288.46153846153845 + F4~288.46153846153845,
288.46153846153845: G4^288.46153846153845 + F4~288.46153846153845,
288.46153846153845: A4^288.46153846153845 + G4~288.46153846153845,
288.46153846153845: G4^288.46153846153845 + F4~288.46153846153845,
288.46153846153845,
288.46153846153845: G4^288.46153846153845 + F4~288.46153846153845,
288.46153846153845: D5^288.46153846153845 + C5~288.46153846153845,
288.46153846153845: C5^288.46153846153845 + B4~288.46153846153845,
288.46153846153845: G4^288.46153846153845 + F4~288.46153846153845,
288.46153846153845,
288.46153846153845: A4^288.46153846153845 + G4~288.46153846153845,
288.46153846153845: F4^288.46153846153845 + E4~288.46153846153845,
288.46153846153845: F4^288.46153846153845 + E4~288.46153846153845`

playTune(melody)
const playback = playTune(melody, Infinity)

setLegend(
  [ Background, bitmap`
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444
4444444444444444` ],
 )

setBackground(Background)

setSolids([])

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
....................`
]

setMap(levels[level])

let slide_idx = -1
function drawSlide() {
  clearText() 
  
  if (slide_idx == -1) {
    slide_idx = 0;
  } else if (slide_idx == 0) {
    slide_idx = 1;
  } else if (slide_idx == 1) {
    if (lastKey == "s") {
      slide_idx = 2;
      addText("correct", {x: 1, y:2})
      addScore += 1
    } else {
      addText("ahem drink coffee", {x: 1, y:2})
      addScore -= 1
      slide_idx = 1
    }
  } else if (slide_idx == 2) {
    if (lastKey == "d") {
      slide_idx = 3;
      addText("lets go", {x: 1, y:2})
      addScore += 1
    } else {
      addText("Not again", {x: 1, y:2})
      addScore -= 1 
      slide_idx = 2
    }
  }else if (slide_idx == 3) {
    if (lastKey == "w") {
      slide_idx = 4
      addText("coooorrrrect", {x: 1, y:2})
      addScore += 1
    } else {
      addText("!!!!!!??????????", {x: 1, y:2})
      addScore -= 1
      slide_idx = 3
    }
  }else if (slide_idx == 4) {
    if (lastKey == "s") {
      slide_idx = 5;
      addText("you,know,your,books ", {x: 1, y:2})
      addScore += 1
    } else {
      addText("words,are,failing,me", {x: 1, y:2})
      addScore -= 1
      slide_idx = 4
    }
  }else if (slide_idx == 5) {
    if (lastKey == "w") {
      slide_idx = 6;
      addText("Correct", {x: 1, y:2})
      addScore += 1
    } else {
      addText("guess what wrongggg", {x: 1, y:2})
      addScore -= 1
      slide_idx = 5
    }
  }else if (slide_idx == 6) {
    if (lastKey == "d") {
      slide_idx = 7;
      addText("Correcttttttttt", {x: 1, y:2})
      addScore += 1
    } else {
      addText("WRONGGGGGGGGGGGG", {x: 1, y:2})
      addScore -= 1
      slide_idx = 6
    }
  }else if (slide_idx == 7) {
    if (lastKey == "w") {
      slide_idx = 8;
      addText("Correct", {x: 1, y:2})
      addScore += 1
    } else {
      addText("WRONG", {x: 1, y:2})
      addScore -= 1
      slide_idx = 7
    }
  }else if (slide_idx == 8) {
    if (lastKey == "w") {
      slide_idx = 9;
      addText("Correct", {x: 1, y:2})
      addScore += 1
    } else {
      addText("WRONG", {x: 1, y:2})
      addScore -= 1
      slide_idx = 8
    }
  }else if (slide_idx == 9) {
    if (lastKey == "a") {
      slide_idx = 10;
      addText("Correct", {x: 1, y:2})
      addScore += 1
    } else {
      addText("WRONG", {x: 1, y:2})
      addScore -= 1
      slide_idx = 9
    }
  }else if (slide_idx == 10) {
    if (lastKey == "d") {
      slide_idx = 11;
      addText("Correct", {x: 1, y:2})
      addScore += 1
    } else {
      addText("WRONG", {x: 1, y:2})
      addScore -= 1
      slide_idx = 10
    }
  }else if (slide_idx == 11) {
    if (lastKey == "a") {
      slide_idx =12;
      addText("Correct", {x: 1, y:2})
      addScore += 1
    } else {
      addText("WRONG", {x: 1, y:2})
      addScore -= 1
      slide_idx = 11
    }
  }else if (slide_idx == 12) {
    if (lastKey == "s") {
      slide_idx =13;
      addText("Correct", {x: 1, y:2})
      addScore += 1
    } else {
      addText("WRONG", {x: 1, y:2})
      addScore -= 1
      slide_idx = 12
    }
  }else if (slide_idx == 13) {
    if (lastKey == "w") {
      slide_idx =14;
      addText("Correct", {x: 1, y:2})
      addScore += 1
    } else {
      addText("WRONG", {x: 1, y:2})
      addScore -= 1
      slide_idx = 13
    }
  }else if (slide_idx == 14) {
    if (lastKey == "a") {
      slide_idx =15;
      addText("Correct", {x: 1, y:2})
      addScore += 1
    } else {
      addText("WRONG", {x: 1, y:2})
      addScore -= 1
      slide_idx = 14
    }
  }else if (slide_idx == 15) {
    if (lastKey == "s") {
      slide_idx = 16;
      addText("Correct", {x: 1, y:2})
      addScore += 1
    } else {
      addText("WRONG", {x: 1, y:2})
      addScore -= 1
      slide_idx = 15
    }
  }else if (slide_idx == 16) {
    if (lastKey == "j") {
      
      slide_idx = 0;
      } else {
      slide_idx = 0
    }
  }
  
  
  addText("score: " + addScore.toString(), {x: 5, y:12})

  lines = slides[slide_idx];
  for (idx=0; idx < lines.length; idx +=1) {
    addText(lines[idx], {
      x:1,
      y: idx + 3,
      size:1
    })
  }
}
afterInput(drawSlide)
drawSlide()

onInput("w", () => {
  lastKey = "w"
})
onInput("a", () => {
  lastKey = "a"
})
onInput("s", () => {
  lastKey = "s"
})
onInput("d", () => {
  lastKey = "d"
})
onInput("i", () => {
  lastKey = "i"
})
onInput("j", () => {
  lastKey = "j"
})
onInput("j", () => {
  lastKey = "k"
})
onInput("l", () => {
  lastKey = "l"
})


