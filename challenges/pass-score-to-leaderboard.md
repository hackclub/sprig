# pass score to leaderboard

## Link

https://gamelab.hackclub.com/?id=44b596d6ca32c44dc85e38ecf3872eb0

## Problem

```
const e = createEngine(gameCanvas, 300, 300);

let score = 0;
const scoreText = e.addText("", 150, 150, { size: 30 });
 
let tick = setInterval(() => scoreText.text = score++, 750);

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
