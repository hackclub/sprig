# pass score to leaderboard

## Link

https://gamelab.hackclub.com/?id=a1eb48c14c179312a75204c7f0743745

## Problem

```
const e = createEngine(gameCanvas, 300, 300);

let score = 0;
const scoreText = e.addText("", 150, 150, { size: 30 });
 
let tick = setInterval(() => scoreText.text = score++, 750);

loopTune(elevator_music);

e.add({
  update() {
    if (e.pressedKey(' ')) {
      clearInterval(tick);
      e.leaderboard(0);
    }
  }
})

e.addText("DO NOT PRESS SPACE", 150, 177);
e.start();
```

## Solution

```
const e = createEngine(gameCanvas, 300, 300);

let score = 0;
const scoreText = e.addText("", 150, 150, { size: 30 });
 
let tick = setInterval(() => scoreText.text = score++, 750);

loopTune(elevator_music);

e.add({
  update() {
    if (e.pressedKey(' ')) {
      clearInterval(tick);
      e.leaderboard(score);
    }
  }
})

e.addText("DO NOT PRESS SPACE", 150, 177);
e.start();
```
