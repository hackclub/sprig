let letters = {
  "c": 16.35,
  "c#": 17.32,
  "d": 18.35,
  "d#": 19.45,
  "e": 20.6,
  "f": 21.83,
  "f#": 23.12,
  "g": 24.5,
  "g#": 25.96,
  "a": 27.5,
  "a#": 29.14,
  "b": 30.87,
}

for (let i = 1; i < 10; i++) {
  for (const k in letters) {
    letters[`${k}${i}`] = letters[k]*2**i;
  }
}

const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

function playNoteHelper(frequency, duration, instrument) {
  var o = audioCtx.createOscillator()
  var g = audioCtx.createGain()
  o.frequency.value = frequency;
  o.type = instrument ?? 'sine';
  o.connect(g)
  g.connect(audioCtx.destination)
  o.start();

  const endTime = audioCtx.currentTime + duration*2/1000;
  o.stop(endTime)
  
  g.gain.setValueAtTime(0, audioCtx.currentTime);
  g.gain.linearRampToValueAtTime(.2, audioCtx.currentTime + duration/5/1000);
  g.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration/1000)
  g.gain.linearRampToValueAtTime(0, audioCtx.currentTime + duration*2/1000) // does this ramp from the last ramp
  // await audioCtx.close();
  o.onended = () => {
    g.disconnect();
  };
}

// instrument :: sine | triangle | square | sawtooth


function playNote(symbol, duration, instrument) {
  let hz = letters[symbol];
  playNoteHelper(hz, duration, instrument);
}

export { playNote };

