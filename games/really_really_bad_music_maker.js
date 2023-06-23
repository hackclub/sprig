// ==lib==
const wholeNotes = ["C", "D", "E", "F", "G", "A", "B"];
const allNotes =  ["C", "C#", "D", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

const wScale = ["D", "E", "F#", "G", "A", "B", "C#"];
const aScale = ["C", "D", "E", "F", "G"];
const sScale = ["C", "E", "C", "F#"];
const dScale = ["C", "E", "G", "A"];
let currScale = dScale;

const allKinds = ["~", "-", "^", "/"];

// raw note, stores data for an individual sound that can be manipulated
class Note {
  constructor(note="C", noteOctave=4, duration=300, kind="^", delay) {
    // hacky fix
    if (typeof note === 'string' || note instanceof String) {
      this.note = note;
    } else {
      console.error(note);
      throw new Error("note must be string");
    }

    this.octave = noteOctave;
    this.duration = duration;
    this.kind = kind;
    this.delay = delay;
  }

  sound() {
    return `${this.delay ? this.delay : this.duration}: ${this.note}${this.octave}${this.kind}${this.duration}`
  }
}

// squeezes an array of Note() into an array of strings for the tunePlayer
function squeezeSong(notes, loopDelay = 100) {
  const vals = [];
  for (let i=0; i<notes.length; i++) {
    vals.push(notes[i].sound());
  }
  vals.push(`${loopDelay}`);

  return vals;
}

// holds a tune of Note() and a context for the playing note
class Comp {
  constructor(tune, context) {
    this.tune = tune;
    this.ctx = context;
  }
}

// holds a list of Comp() and provides functionality for adding, removing, starting, and stopping songs
class Song {
  constructor() {
    this.tunes = {};

    this.playing = false;
  }

  add(name, tune) {
    this.tunes[name] = new Comp(tune);
  }

  remove(name) {
    if (!this.tunes[name]) return;
    if (this.tunes[name].ctx.isPlaying()) {
      this.contexts[name].ctx.end();
    }

    delete this.tunes[name]
  }

  play(name, times) {
    if (name) {
      if (!this.tunes[name]) return;

      this.tunes[name].ctx = playTune(squeezeSong(this.tunes[name].tune).join(", "), times ? times : Infinity);
    } else {
      for (const tune in this.tunes) {
        this.tunes[tune].ctx = playTune(squeezeSong(this.tunes[tune].tune).join(", "), times ? times : Infinity);
      }
    }
  }

  stop(name) {
    if (name && this.tunes[name]) {
      this.tunes[name].ctx.end();
    } else {
      for (const tune in this.tunes) {
        this.tunes[tune].ctx.end();
      }
    }
  }
}

// ==globals==
let song = new Song();
let octave = 4;
let playing = false;
let kind = 2;
  
// ==tools==
function buildScale(duration=300) {
  let scale = [...currScale]; // just js moments ✨
  for (let i=0; i<scale.length; i++) {
    scale[i] = new Note(scale[i], octave, duration, allKinds[kind]);
  }
  return scale;
}

function randomNotes(length=10, dur={min: 700, max: 2000}) {
  const notes = [];
  const scale = buildScale();

  for (let i=0; i<length; i++) {
    // semi-fix for below comment
    const noteRef = scale[Math.floor(Math.random()*scale.length)];
    const note = new Note(noteRef.note, noteRef.octave, noteRef.duration, noteRef.kind, noteRef.delay);
    
    let duration = Math.floor(Math.random() * (dur.max - dur.min + 1) + dur.min);
    
    note.duration = duration;    
    notes.push(note);
  }

  // somehow the note octave gets corrupted here
  return notes;
}

// from https://stackoverflow.com/questions/3579486/sort-a-javascript-array-by-frequency-and-then-filter-repeats
function sortByFrequency(array, key) {
  var frequency = {};

  array.forEach(function(value) { frequency[value.note] = 0; });

  var uniques = array.filter(function(value) {
    return ++frequency[value.note] == 1;
  });

  return uniques.sort(function(a, b) {
    return frequency[b] - frequency[a];
  });
}

// from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

function bassLine(tune) {
  const bassNotes = sortByFrequency(tune).slice(0, 3);

  for (let i=0; i<bassNotes.length; i++) {
    const note = bassNotes[i];
    
    note.octave = Math.max(2, octave-3);
    note.duration = 6000;
    note.delay = 400;
    
    bassNotes[i] = note;
  }

  for (let i=0; i<3; i++) {
    bassNotes.push(...shuffleArray(bassNotes));
  }

  return bassNotes;
}

// ==start==
function start() {
  if (playing) return;

  song.remove("melody");
  const melody = randomNotes(100);
  song.add("melody", melody);

  const altMelody = randomNotes(33, {min: 500, max: 1000});
  song.add("altmelody", altMelody);
  
  const bass = bassLine(melody);
  song.add("bass", bass);
  song.play();
  playing = true;
}

function stop() {
  if (!playing) return;
  
  song.stop();
  playing = false;
}

onInput("k", () => {  
  if (playing) {
    stop();
  } else {
    start();
  }
});

// ==cycle sound==
onInput("l", () => {
  kind++;
  kind = kind % allKinds.length;

  if (playing) {
    stop();
    start();
  }
});

// ==scale selection==
const scaleMap = {
  "w": wScale,
  "a": aScale,
  "s": sScale,
  "d": dScale,
}

for (const key in scaleMap) {
  onInput(key, () => {
    if (currScale == scaleMap[key]) return;
    
    currScale = scaleMap[key];

    if (playing) {
      stop();
      start();
    }
    
    refreshText();
  });
}

// ==octave switching==
onInput("i", () => {
  octave = Math.min(7, octave+1);

  if (playing) {
    stop();
    start();
  }
});

onInput("j", () => {
  octave = Math.max(2, octave-1);

  if (playing) {
    stop();
    start();
  }
});

// ==init==
const rbg = "r";
const lbg = "l";

setLegend([rbg, bitmap`
6F..............
6F..............
6F..............
6F..............
6F..............
6F..............
6F..............
6F..............
6F..............
6F..............
6F..............
6F..............
6F..............
6F..............
6F..............
6F..............`],
          [lbg,  bitmap`
..............F6
..............F6
..............F6
..............F6
..............F6
..............F6
..............F6
..............F6
..............F6
..............F6
..............F6
..............F6
..............F6
..............F6
..............F6
..............F6`])


let level = 0
const levels = [
  map`
r...l
r...l
r...l
r...l
r...l`
]
setMap(levels[level])

function refreshText() {
  clearText();
  
  addText("R.R.B.M.M", {y: 1, color: color`3`});
  addText("by shav", {y: 2, color: color`1`});
  
  addText("start/stop  k", {y: 4, color: color`7`});
  addText("cycle sound l", {y: 5, color: color`7`});
  addText("octave+     i", {y: 6, color: color`7`});
  addText("octave-     j", {y: 7, color: color`7`});  
  
  addText("current notes:", {y: 9, color: color`3`});
  addText(currScale.join(" "), {y: 10, color: color`9`});

  addText("type", {y: 12, color: color`3`});
  addText("w, a, s, d", {y: 13, color: color`7`});
  addText("for new notes", {y: 14, color: color`3`});
}
refreshText();