/*
@title: BigButton
@author: LinusSkucas
@tags: []
@addedOn: 2022-12-17
*/

const buttonBitmaps = ["a"];
var hasStartedGame = false;
const buttonOptions = ["w", "a", "s", "d", "i", "j", "k", "l"];

Array.prototype.random = function () {
  return this[Math.floor((Math.random()*this.length))];
}

setLegend(
  [ buttonBitmaps[0], bitmap`
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [ "b", bitmap`
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
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  ["w", bitmap`
................
................
................
................
................
......777777....
.....77777777...
....7777777777..
....7777777777..
....7777777777..
....7777777777..
....7777777777..
....7777777777..
.....77777777...
......777777....
................`]
);

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

const melody = tune`
54.74452554744526: b4^54.74452554744526 + e4^54.74452554744526 + g5^54.74452554744526,
54.74452554744526: f4^54.74452554744526 + e4^54.74452554744526 + d4^54.74452554744526,
54.74452554744526: a4^54.74452554744526 + b4^54.74452554744526 + c5^54.74452554744526 + g5-54.74452554744526,
54.74452554744526: c5^54.74452554744526 + b4^54.74452554744526 + a4^54.74452554744526,
54.74452554744526: e4~54.74452554744526 + d5^54.74452554744526 + c5^54.74452554744526,
54.74452554744526: e4~54.74452554744526 + d5^54.74452554744526,
54.74452554744526: d4~54.74452554744526 + e5^54.74452554744526,
54.74452554744526: d4~54.74452554744526 + e4~54.74452554744526 + d5^54.74452554744526 + e5^54.74452554744526 + a4/54.74452554744526,
54.74452554744526: e4~54.74452554744526 + f4~54.74452554744526 + d5^54.74452554744526,
54.74452554744526: f4~54.74452554744526 + g4~54.74452554744526 + g5^54.74452554744526 + c5^54.74452554744526 + d5^54.74452554744526,
54.74452554744526: g4~54.74452554744526 + g5^54.74452554744526 + b4^54.74452554744526 + c5^54.74452554744526,
54.74452554744526: f4~54.74452554744526 + g5^54.74452554744526 + f5^54.74452554744526 + a5~54.74452554744526,
54.74452554744526: f4~54.74452554744526 + a4^54.74452554744526 + b4^54.74452554744526 + c5^54.74452554744526,
54.74452554744526: f4~54.74452554744526 + e4~54.74452554744526 + d4~54.74452554744526 + c5^54.74452554744526 + d5^54.74452554744526,
54.74452554744526: d4~54.74452554744526 + e5^54.74452554744526 + d5^54.74452554744526 + f5^54.74452554744526 + b4^54.74452554744526,
54.74452554744526: d4~54.74452554744526 + f5^54.74452554744526 + g5^54.74452554744526 + a4^54.74452554744526 + b4^54.74452554744526,
54.74452554744526: d4~54.74452554744526 + e4~54.74452554744526 + f4~54.74452554744526 + g5^54.74452554744526 + g4^54.74452554744526,
54.74452554744526: f4^54.74452554744526 + g4^54.74452554744526 + f5^54.74452554744526 + e5^54.74452554744526,
54.74452554744526: g4~54.74452554744526 + f4^54.74452554744526 + e5^54.74452554744526 + d5^54.74452554744526 + a4/54.74452554744526,
54.74452554744526: f4~54.74452554744526 + e4~54.74452554744526 + d4~54.74452554744526 + d5^54.74452554744526 + c5^54.74452554744526,
54.74452554744526: d4~54.74452554744526 + c5^54.74452554744526 + d5^54.74452554744526 + e4^54.74452554744526,
54.74452554744526: d4~54.74452554744526 + d5^54.74452554744526 + e5^54.74452554744526 + f4^54.74452554744526 + e4^54.74452554744526,
54.74452554744526: e4~54.74452554744526 + f4~54.74452554744526 + g4~54.74452554744526 + e5^54.74452554744526 + f5^54.74452554744526,
54.74452554744526: a4~54.74452554744526 + b4~54.74452554744526 + c5~54.74452554744526 + d5~54.74452554744526 + g5^54.74452554744526,
54.74452554744526: d5~54.74452554744526 + e5~54.74452554744526 + a5^54.74452554744526 + g4^54.74452554744526 + f4^54.74452554744526,
54.74452554744526: e5~54.74452554744526 + g4^54.74452554744526,
54.74452554744526: e5~54.74452554744526 + d5~54.74452554744526 + c5~54.74452554744526 + a4^54.74452554744526 + g4^54.74452554744526,
54.74452554744526: c5~54.74452554744526 + b4~54.74452554744526 + a4^54.74452554744526,
54.74452554744526: a4^54.74452554744526 + g4~54.74452554744526 + f4~54.74452554744526 + e4~54.74452554744526 + a5~54.74452554744526,
54.74452554744526: e4~54.74452554744526 + d4~54.74452554744526 + b4^54.74452554744526 + a4^54.74452554744526,
54.74452554744526: d4~54.74452554744526 + e4~54.74452554744526 + b4^54.74452554744526 + a4/54.74452554744526,
54.74452554744526: e4^54.74452554744526 + f4~54.74452554744526 + g5^54.74452554744526 + b4^54.74452554744526`

const levels = [
  map`
...
...
...`,
];

const playback = playTune(melody, Infinity);

setMap(levels[0]);

addText("Press w\nto start!", { x: 3, y: 1, color: color`3`});

addText("Press the\nspecified\nbutton when the\nscreen turns\nto red", { x: 3, y: 5, color: color`H`});
var button = "";
var startTime = new Date().getTime();

onInput("w", () => {
  if (!hasStartedGame) {
    hasStartedGame = true;
    clearText();
    if (playback) playback.end();
    addSprite(1, 1, "w");
    setTimeout(() => {  
      clearTile(1, 1); 
      setTimeout(() => {  
    addSprite(1, 1, "w");
        setTimeout(() => {  
    clearTile(1, 1);
          setTimeout(() => {  
    addSprite(1, 1, "w");
            setTimeout(() => {  
    clearTile(1,1);
              setTimeout(() => {  
              button = buttonOptions.random();
                addText(button, {x: 9, y: 7, color: color`7`});
                setBackground("a");
               startTime = new Date().getTime();
              
    }, Math.floor(Math.random() * 6000));  
    }, 600);
    }, 90);
    }, 500);
    }, 90);
    }, 500);
  } else {
    clearText();
    setBackground("b");
    if (button == "w") {
      const endTime = new Date().getTime();
      const mseconds = endTime - startTime;
      addText("Time:  " + mseconds + "ms", { x: 3, y: 7, color: color`4`});
      if (mseconds < 70) {
        addText("Fast!", { x: 3, y: 2, color: color`8`});
      } else {
      addText("Congrats!\nYou're slower\nthan mud!", { x: 3, y: 2, color: color`3`});
    }
    } else {
      // Wrong button
      addText("Wrong Button!", { x: 3, y: 1, color: color`3`});
    }
    
    addText("Press w\nto play again", { x: 3, y: 11, color: color`H`});
    hasStartedGame = false;
  }
});

onInput("a", () => {
  clearText();
  setBackground("b");
	if (button == "a") {
	  const endTime = new Date().getTime();
	  const mseconds = endTime - startTime;
	  addText("Time:  " + mseconds + "ms", { x: 3, y: 7, color: color`4`});
	  if (mseconds < 70) {
		addText("Fast!", { x: 3, y: 2, color: color`8`});
	  } else {
	  addText("Congrats!\nYou're slower\nthan mud!", { x: 3, y: 2, color: color`3`});
	}
	} else {
	  // Wrong button
	  addText("Wrong Button!", { x: 3, y: 1, color: color`3`});
	}
	
	addText("Press w\nto play again", { x: 3, y: 11, color: color`H`});
	hasStartedGame = false;
});

onInput("s", () => {
  clearText();
  setBackground("b");
	if (button == "s") {
	  const endTime = new Date().getTime();
	  const mseconds = endTime - startTime;
	  addText("Time:  " + mseconds + "ms", { x: 3, y: 7, color: color`4`});
	  if (mseconds < 70) {
		addText("Fast!", { x: 3, y: 2, color: color`8`});
	  } else {
	  addText("Congrats!\nYou're slower\nthan mud!", { x: 3, y: 2, color: color`3`});
	}
	} else {
	  // Wrong button
	  addText("Wrong Button!", { x: 3, y: 1, color: color`3`});
	}
	
	addText("Press w\nto play again", { x: 3, y: 11, color: color`H`});
	hasStartedGame = false;
});

onInput("d", () => {
  clearText();
  setBackground("b");
	if (button == "d") {
	  const endTime = new Date().getTime();
	  const mseconds = endTime - startTime;
	  addText("Time:  " + mseconds + "ms", { x: 3, y: 7, color: color`4`});
	  if (mseconds < 70) {
		addText("Fast!", { x: 3, y: 2, color: color`8`});
	  } else {
	  addText("Congrats!\nYou're slower\nthan mud!", { x: 3, y: 2, color: color`3`});
	}
	} else {
	  // Wrong button
	  addText("Wrong Button!", { x: 3, y: 1, color: color`3`});
	}
	
	addText("Press w\nto play again", { x: 3, y: 11, color: color`H`});
	hasStartedGame = false;
});

onInput("i", () => {
  clearText();
  setBackground("b");
	if (button == "i") {
	  const endTime = new Date().getTime();
	  const mseconds = endTime - startTime;
	  addText("Time:  " + mseconds + "ms", { x: 3, y: 7, color: color`4`});
	  if (mseconds < 70) {
		addText("Fast!", { x: 3, y: 2, color: color`8`});
	  } else {
	  addText("Congrats!\nYou're slower\nthan mud!", { x: 3, y: 2, color: color`3`});
	}
	} else {
	  // Wrong button
	  addText("Wrong Button!", { x: 3, y: 1, color: color`3`});
	}
	
	addText("Press w\nto play again", { x: 3, y: 11, color: color`H`});
	hasStartedGame = false;
});

onInput("j", () => {
  clearText();
  setBackground("b");
	if (button == "j") {
	  const endTime = new Date().getTime();
	  const mseconds = endTime - startTime;
	  addText("Time:  " + mseconds + "ms", { x: 3, y: 7, color: color`4`});
	  if (mseconds < 70) {
		addText("Fast!", { x: 3, y: 2, color: color`8`});
	  } else {
	  addText("Congrats!\nYou're slower\nthan mud!", { x: 3, y: 2, color: color`3`});
	}
	} else {
	  // Wrong button
	  addText("Wrong Button!", { x: 3, y: 1, color: color`3`});
	}
	
	addText("Press w\nto play again", { x: 3, y: 11, color: color`H`});
	hasStartedGame = false;
});

onInput("k", () => {
  clearText();
  setBackground("b");
	if (button == "k") {
	  const endTime = new Date().getTime();
	  const mseconds = endTime - startTime;
	  addText("Time:  " + mseconds + "ms", { x: 3, y: 7, color: color`4`});
	  if (mseconds < 70) {
		addText("Fast!", { x: 3, y: 2, color: color`8`});
	  } else {
	  addText("Congrats!\nYou're slower\nthan mud!", { x: 3, y: 2, color: color`3`});
	}
	} else {
	  // Wrong button
	  addText("Wrong Button!", { x: 3, y: 1, color: color`3`});
	}
	
	addText("Press w\nto play again", { x: 3, y: 11, color: color`H`});
	hasStartedGame = false;
});

onInput("l", () => {
  clearText();
  setBackground("b");
	if (button == "l") {
	  const endTime = new Date().getTime();
	  const mseconds = endTime - startTime;
	  addText("Time:  " + mseconds + "ms", { x: 3, y: 7, color: color`4`});
	  if (mseconds < 70) {
		addText("Fast!", { x: 3, y: 2, color: color`8`});
	  } else {
	  addText("Congrats!\nYou're slower\nthan mud!", { x: 3, y: 2, color: color`3`});
	}
	} else {
	  // Wrong button
	  addText("Wrong Button!", { x: 3, y: 1, color: color`3`});
	}
	
	addText("Press w\nto play again", { x: 3, y: 11, color: color`H`});
	hasStartedGame = false;
});
