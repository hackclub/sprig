# add bounce sound

## Link

https://gamelab.hackclub.com/?id=5aff1db900613b02f603367c36dc4ce2

## Problem

```
const e = createEngine(gameCanvas, 409, 246);

e.add({
  tags: ["ball"],
  solid: true,
  x: 178,
  y: 126,
  vx: 1,
  vy: 3,
  sprite: ball,
  scale: 2,
  bounce: 1,
  collides(me, them) {
    if (them.hasTag("paddle")) {
      me.vx *= 1.3;
      me.vy *= 1.3;
    }
  },
  update: (obj) => {
      if (obj.y < 0) {
        obj.vy *= -1;
      }

      if (obj.y > e.height - obj.height) {
        obj.vy *= -1;
      }
    },
})

e.add({
  tags: ["left-paddle", "paddle"],
  solid: true,
  x: e.width - 25,
  y: 13,
  sprite: left_paddle,
  scale: 4,
  update: (obj) => {
    if (e.heldKey("ArrowUp")) {
      obj.y -= 3;
    }

    if (e.heldKey("ArrowDown")) {
      obj.y += 3;
    }
  },
})

e.add({
  tags: ["right-paddle", "paddle"],
  solid: true,
  x: 5,
  y: 13,
  sprite: right_paddle,
  scale: 4,
  update: (obj) => {
    if (e.heldKey("w")) {
      obj.y -= 3;
    }

    if (e.heldKey("s")) {
      obj.y += 3;
    }
  },
})

e.start();
```

## One Answer

```
const e = createEngine(gameCanvas, 409, 246);

e.add({
  tags: ["ball"],
  solid: true,
  x: 178,
  y: 126,
  vx: 1,
  vy: 3,
  sprite: ball,
  scale: 2,
  bounce: 1,
  collides(me, them) {
    if (them.hasTag("paddle")) {
      me.vx *= 1.3;
      me.vy *= 1.3;

      // have to create sound asset first
      playTune(bounce_sound);
    }
  },
  update: (obj) => {
    if (obj.y < 0) {
      obj.vy *= -1;
    }

    if (obj.y > e.height - obj.height) {
      obj.vy *= -1;
    }
  },
})

e.add({
  tags: ["left-paddle", "paddle"],
  solid: true,
  x: e.width - 25,
  y: 13,
  sprite: left_paddle,
  scale: 4,
  update: (obj) => {
    if (e.heldKey("ArrowUp")) {
      obj.y -= 3;
    }

    if (e.heldKey("ArrowDown")) {
      obj.y += 3;
    }
  },
})

e.add({
  tags: ["right-paddle", "paddle"],
  solid: true,
  x: 5,
  y: 13,
  sprite: right_paddle,
  scale: 4,
  update: (obj) => {
    if (e.heldKey("w")) {
      obj.y -= 3;
    }

    if (e.heldKey("s")) {
      obj.y += 3;
    }
  },
})

e.start();
```
