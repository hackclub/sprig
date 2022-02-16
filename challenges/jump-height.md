# jump to new platform

## Link

https://gamelab.hackclub.com/?id=b19577800e2b5995664c8ff247af6ad1

## Problem

```
const e = createEngine(gameCanvas, 334, 270);

e.add({
  sprite: player,
  solid: true,
  scale: 3,
  x: 88,
  update: (me, them) => {
    me.vy += 3
    
    if (e.pressedKey(" ")) {
      me.vy -= 10;
    }

    if (e.heldKey("ArrowRight")) {
      me.x += 3;
    }

    if (e.heldKey("ArrowLeft")) {
      me.x -= 3;
    }
    
  }
})

e.add({
  sprite: floor,
  solid: true,
  scale: 3,
  x: 161, 
  y: 93
})

e.add({
  sprite: floor,
  solid: true,
  scale: 3,
  x: 69, 
  y: 202
})



e.start();
```

## Solution

```
const e = createEngine(gameCanvas, 334, 270);

e.add({
  sprite: player,
  solid: true,
  scale: 3,
  x: 88,
  update: (me, them) => {
    me.vy += 3
    
    if (e.pressedKey(" ")) {
      me.vy -= 35;
    }

    if (e.heldKey("ArrowRight")) {
      me.x += 3;
    }

    if (e.heldKey("ArrowLeft")) {
      me.x -= 3;
    }
    
  }
})

e.add({
  sprite: floor,
  solid: true,
  scale: 3,
  x: 161, 
  y: 93
})

e.add({
  sprite: floor,
  solid: true,
  scale: 3,
  x: 69, 
  y: 202
})



e.start();
```