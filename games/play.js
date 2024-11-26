/*
@title: Play?
@author: deepnilray
@tags: []
@addedOn: 2024-11-25
*/

// Creating the piano keys and their corresponding sounds

const notes = [
  { note: 'C', sound: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3') },
  { note: 'C#', sound: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3') },
  { note: 'D', sound: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3') },
  { note: 'D#', sound: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3') },
  { note: 'E', sound: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3') },
  { note: 'F', sound: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3') },
  { note: 'F#', sound: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3') },
  { note: 'G', sound: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3') },
  { note: 'G#', sound: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3') },
  { note: 'A', sound: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3') },
  { note: 'A#', sound: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3') },
  { note: 'B', sound: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3') },
  { note: 'C2', sound: new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3') }
];

// Create piano keys dynamically
function createPiano() {
  const piano = document.createElement('div');
  piano.style.display = 'flex';
  piano.style.alignItems = 'center';

  notes.forEach((note, index) => {
    const key = document.createElement('div');
    key.style.width = '40px';
    key.style.height = '150px';
    key.style.margin = '0 2px';
    key.style.backgroundColor = 'white';
    key.style.border = '1px solid black';
    key.style.position = 'relative';
    key.style.cursor = 'pointer';

    if (note.note.includes('#')) {
      key.style.backgroundColor = 'black';
      key.style.zIndex = '1';
      key.style.width = '30px';
      key.style.height = '100px';
      key.style.marginLeft = '-15px';
    }

    key.addEventListener('click', () => playSound(note.sound));

    // Add note text to the keys for identification
    const noteText = document.createElement('span');
    noteText.innerText = note.note;
    noteText.style.color = 'white';
    noteText.style.fontSize = '12px';
    noteText.style.position = 'absolute';
    noteText.style.top = '50%';
    noteText.style.left = '50%';
    noteText.style.transform = 'translate(-50%, -50%)';
    key.appendChild(noteText);

    piano.appendChild(key);
  });

  document.body.appendChild(piano);
}

// Play sound on key press
function playSound(audio) {
  audio.currentTime = 0; // Reset audio to start
  audio.play();
}

// Calling the function to create the piano
createPiano();

// Adding keyboard event listeners for physical keyboard input
document.addEventListener('keydown', (e) => {
  const keyMap = {
    'a': 0, 'w': 1, 's': 2, 'e': 3, 'd': 4, 'f': 5, 't': 6, 'g': 7, 'y': 8, 'h': 9, 'u': 10, 'j': 11, 'k': 12
  };

  if (keyMap[e.key]) {
    playSound(notes[keyMap[e.key]].sound);
  }
});
