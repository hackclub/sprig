# make it go left

## Link

https://gamelab.hackclub.com/?id=78bf1fe0734a3319ef458b7a3d7cce65

## Problem

```
const e = createEngine(gameCanvas, 296, 248);

e.add({
  sprite: floor,
  scale: 3,
  x: 69, 
  y: 202,
  update: (me, them) => {
    if (e.heldKey("ArrowRight")) me.x += 3;
  }
})

e.start();
```

## Solution

```
const e = createEngine(gameCanvas, 296, 248);

e.add({
  sprite: floor,
  scale: 3,
  x: 69, 
  y: 202,
  update: (me, them) => {
    if (e.heldKey("ArrowRight")) {
      me.x += 3;
    }

    if (e.heldKey("ArrowLeft")) {
      me.x -= 3;
    }

  }
})

e.start();
```