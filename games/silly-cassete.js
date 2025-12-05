/*
@title: Cassette Player
@author: 
@tags: [music, retro]
@addedOn: 2025-12-05

*/

const player = "p"
const reel = "r"
const reelSpin = "s"
const tape = "t"
const playBtn = "1"
const pauseBtn = "2"
const stopBtn = "3"
const prevBtn = "4"
const nextBtn = "5"
const display = "d"

setLegend(
  [player, bitmap`
0000000000000000
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CC3333333333CC0
0CC3333333333CC0
0CC3333333333CC0
0CC3333333333CC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0CCCCCCCCCCCCCC0
0000000000000000`],
  [reel, bitmap`
................
................
.....000000.....
....00000000....
...0000000000...
...0000110000...
...0001111000...
...0001111000...
...0000110000...
...0000000000...
....00000000....
.....000000.....
................
................
................
................`],
  [reelSpin, bitmap`
................
................
.....000000.....
....00000000....
...0000000000...
...0001001000...
...0010010100...
...0010010100...
...0001001000...
...0000000000...
....00000000....
.....000000.....
................
................
................
................`],
  [tape, bitmap`
3333333333333333
3333333333333333
3333333333333333
3LLLLLLLLLLLLLL3
3LLLLLLLLLLLLLL3
3LLLLLLLLLLLLLL3
3LLLLLLLLLLLLLL3
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333
3333333333333333`],
  [playBtn, bitmap`
4444444444444444
4..............4
4...44.........4
4...444........4
4...4444.......4
4...44444......4
4...444444.....4
4...444444.....4
4...44444......4
4...4444.......4
4...444........4
4...44.........4
4..............4
4444444444444444
................
................`],
  [pauseBtn, bitmap`
4444444444444444
4..............4
4...44....44...4
4...44....44...4
4...44....44...4
4...44....44...4
4...44....44...4
4...44....44...4
4...44....44...4
4...44....44...4
4...44....44...4
4...44....44...4
4..............4
4444444444444444
................
................`],
  [stopBtn, bitmap`
4444444444444444
4..............4
4...33333333...4
4...33333333...4
4...33333333...4
4...33333333...4
4...33333333...4
4...33333333...4
4...33333333...4
4...33333333...4
4...33333333...4
4...33333333...4
4..............4
4444444444444444
................
................`],
  [prevBtn, bitmap`
4444444444444444
4..............4
4...3...44.....4
4...3..444.....4
4...3.4444.....4
4...344444.....4
4...344444.....4
4...3.4444.....4
4...3..444.....4
4...3...44.....4
4..............4
4444444444444444
................
................
................
................`],
  [nextBtn, bitmap`
4444444444444444
4..............4
4.....44...3...4
4.....444..3...4
4.....4444.3...4
4.....444443...4
4.....444443...4
4.....4444.3...4
4.....444..3...4
4.....44...3...4
4..............4
4444444444444444
................
................
................
................`],
  [display, bitmap`
0000000000000000
0222222222222220
0222222222222220
0222222222222220
0222222222222220
0000000000000000
................
................
................
................
................
................
................
................
................
................`]
)

setSolids([])

const level = map`
dddddddddddddddd
dddddddddddddddd
tttttttttttttttt
tttttttttttttttt
tttr.......rtttt
tttt.......ttttt
tttt.......ttttt
tttttttttttttttt
tttttttttttttttt
................
....4.1.2.3.5...
................
pppppppppppppppp
pppppppppppppppp
pppppppppppppppp
pppppppppppppppp`

setMap(level)

// Game state
let isPlaying = false
let isPaused = false
let currentTrack = 0
let animationInterval = null
let currentPlayback = null

const tracks = [
  "SUMMER NIGHTS",
  "NEON DREAMS",
  "CITY LIGHTS",
  "MIDNIGHT DRIVE",
  "RETROWAVE"
]

function updateDisplay() {
  clearText()
  
  let status = ""
  if (isPlaying && !isPaused) {
    status = "PLAYING"
  } else if (isPaused) {
    status = "PAUSED"
  } else {
    status = "STOPPED"
  }
  
  addText(status, {
    x: 6,
    y: 0,
    color: color`4`
  })
  
  addText(tracks[currentTrack], {
    x: 2,
    y: 1,
    color: color`6`
  })
  
  addText(`Track ${currentTrack + 1}/${tracks.length}`, {
    x: 5,
    y: 2,
    color: color`5`
  })
  
  // Controls help
  addText("W:Play A:Prev", {
    x: 2,
    y: 14,
    color: color`2`
  })
  addText("S:Stop D:Next I:Pause", {
    x: 0,
    y: 15,
    color: color`2`
  })
}

function startReelAnimation() {
  // Animate reels spinning
  animationInterval = setInterval(() => {
    const reels = getAll(reel).concat(getAll(reelSpin))
    reels.forEach(r => {
      const x = r.x
      const y = r.y
      r.remove()
      
      // Alternate between reel and reelSpin sprites
      if (r.type === reel) {
        addSprite(x, y, reelSpin)
      } else {
        addSprite(x, y, reel)
      }
    })
  }, 300)
}

function stopReelAnimation() {
  if (animationInterval) {
    clearInterval(animationInterval)
    animationInterval = null
  }
  
  // Reset all to static reel
  const reels = getAll(reel).concat(getAll(reelSpin))
  reels.forEach(r => {
    const x = r.x
    const y = r.y
    r.remove()
    addSprite(x, y, reel)
  })
}

function play() {
  if (!isPlaying || isPaused) {
    isPlaying = true
    isPaused = false
    startReelAnimation()
    playMusic()
    updateDisplay()
  }
}

const tracks_music = [
  tune`
272.72727272727275: G4~272.72727272727275,
272.72727272727275: B4~272.72727272727275,
272.72727272727275: G4~272.72727272727275,
272.72727272727275,
272.72727272727275: F4^272.72727272727275,
272.72727272727275: D4^272.72727272727275,
272.72727272727275: F4^272.72727272727275,
272.72727272727275,
272.72727272727275: G4~272.72727272727275,
272.72727272727275: B4~272.72727272727275,
272.72727272727275: G4~272.72727272727275,
272.72727272727275,
272.72727272727275: F4^272.72727272727275,
272.72727272727275: D4^272.72727272727275,
272.72727272727275: F4^272.72727272727275,
272.72727272727275,
272.72727272727275: G4~272.72727272727275,
272.72727272727275: B4~272.72727272727275,
272.72727272727275: G4~272.72727272727275,
272.72727272727275,
272.72727272727275: F4^272.72727272727275,
272.72727272727275: D4^272.72727272727275,
272.72727272727275: F4^272.72727272727275,
272.72727272727275,
272.72727272727275: G4~272.72727272727275,
272.72727272727275: A4~272.72727272727275,
272.72727272727275: G4~272.72727272727275,
1363.6363636363637`,
  tune`
400: G4-400 + B4-400 + D5-400,
400: A4-400 + C5-400 + E5-400,
400: B4-400 + D5-400 + F5-400,
400: C5-400 + E5-400 + G5-400,
400: D5-400 + F5-400 + A5-400,
400: E5-400 + G5-400 + B5-400,
400: F5-400 + A5-400 + C6-400,
400: G5-400 + B5-400 + D6-400,
400: F5-400 + A5-400 + C6-400,
400: E5-400 + G5-400 + B5-400,
400: D5-400 + F5-400 + A5-400,
400: C5-400 + E5-400 + G5-400,
400: B4-400 + D5-400 + F5-400,
400: A4-400 + C5-400 + E5-400,
400: G4-400 + B4-400 + D5-400,
400: A4-400 + C5-400 + E5-400`,
  tune`
600: E5-600 + G5-600 + B5-600,
600: F5-600 + A5-600 + C6-600,
600: G5-600 + B5-600 + D6-600,
600: A5-600 + C6-600 + E6-600,
600: G5-600 + B5-600 + D6-600,
600: F5-600 + A5-600 + C6-600,
600: E5-600 + G5-600 + B5-600,
600: D5-600 + F5-600 + A5-600,
600: E5-600 + G5-600 + B5-600,
600: F5-600 + A5-600 + C6-600,
600: G5-600 + B5-600 + D6-600,
600: A5-600 + C6-600 + E6-600,
600: G5-600 + B5-600 + D6-600,
600: F5-600 + A5-600 + C6-600,
600: E5-600 + G5-600 + B5-600,
600: D5-600 + F5-600 + A5-600`,
  tune`
450: D5-450 + F5-450 + A5-450,
450: E5-450 + G5-450 + B5-450,
450: F5-450 + A5-450 + C6-450,
450: G5-450 + B5-450 + D6-450,
450: A5-450 + C6-450 + E6-450,
450: B5-450 + D6-450 + F6-450,
450: A5-450 + C6-450 + E6-450,
450: G5-450 + B5-450 + D6-450,
450: F5-450 + A5-450 + C6-450,
450: E5-450 + G5-450 + B5-450,
450: D5-450 + F5-450 + A5-450,
450: C5-450 + E5-450 + G5-450,
450: D5-450 + F5-450 + A5-450,
450: E5-450 + G5-450 + B5-450,
450: F5-450 + A5-450 + C6-450,
450: G5-450 + B5-450 + D6-450`,
  tune`
550: A4-550 + C5-550 + E5-550,
550: B4-550 + D5-550 + F5-550,
550: C5-550 + E5-550 + G5-550,
550: D5-550 + F5-550 + A5-550,
550: E5-550 + G5-550 + B5-550,
550: F5-550 + A5-550 + C6-550,
550: G5-550 + B5-550 + D6-550,
550: A5-550 + C6-550 + E6-550,
550: G5-550 + B5-550 + D6-550,
550: F5-550 + A5-550 + C6-550,
550: E5-550 + G5-550 + B5-550,
550: D5-550 + F5-550 + A5-550,
550: C5-550 + E5-550 + G5-550,
550: B4-550 + D5-550 + F5-550,
550: A4-550 + C5-550 + E5-550,
550: B4-550 + D5-550 + F5-550`
]

function playMusic() {
  // Stop any currently playing music
  if (currentPlayback) {
    currentPlayback.end()
  }
  // Play the current track on loop
  currentPlayback = playTune(tracks_music[currentTrack], Infinity)
}

function pause() {
  if (isPlaying && !isPaused) {
    isPaused = true
    stopReelAnimation()
    playTune(tune`
90: G4-90,
1920`)
    updateDisplay()
  }
}

function stop() {
  isPlaying = false
  isPaused = false
  stopReelAnimation()
  // Stop all music
  if (currentPlayback) {
    currentPlayback.end()
    currentPlayback = null
  }
  playTune(tune`
120: C4-120,
1920`)
  updateDisplay()
}

function prevTrack() {
  currentTrack = (currentTrack - 1 + tracks.length) % tracks.length
  playTune(tune`
60: D5-60,
1920`)
  if (isPlaying && !isPaused) {
    playMusic()
  }
  updateDisplay()
}

function nextTrack() {
  currentTrack = (currentTrack + 1) % tracks.length
  playTune(tune`
60: G5-60,
1920`)
  if (isPlaying && !isPaused) {
    playMusic()
  }
  updateDisplay()
}

// Controls
onInput("w", () => {
  play()
})

onInput("i", () => {
  pause()
})

onInput("s", () => {
  stop()
})

onInput("a", () => {
  prevTrack()
})

onInput("d", () => {
  nextTrack()
})

// Initialize
updateDisplay()