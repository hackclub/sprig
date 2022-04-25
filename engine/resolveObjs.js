function resolveObj(me, them) {
  if (me.id == them.id) return;

  const dx = me.x - me.lastX;
  const dy = me.y - me.lastY;

  me.x -= dx;
  me.y -= dy;

  const { top, bottom, left, right } = me.distanceTo(them);

  let canMoveInX = true;
  let canMoveInY = true;
  let collided = false;

  if (top*bottom < 0 && left*right < 0) collided = true;

  const bothSolid = them.solid && me.solid;

  const BUFFER = 0.1;

  if (dy < 0 && Math.abs(dy) > top && top >= -me.height + BUFFER) {
    if (bothSolid) {
      me.vy = -me.bounce * me.vy;
      me.y = me.y - top + BUFFER; // need a little buffer
      canMoveInY = false;
    }

    collided = true;
  }

  if (dy > 0 && Math.abs(dy) > bottom && bottom >= -me.height + BUFFER) {
    if (bothSolid) {
      me.vy = -me.bounce * me.vy;
      me.y = me.y + bottom - BUFFER;
      canMoveInY = false;
    }

    collided = true;
  }

  if (dx < 0 && Math.abs(dx) > left && left >= -me.width + BUFFER) {
    if (bothSolid) {
      me.vx = -me.bounce * me.vx;
      me.x = me.x - left + BUFFER;
      canMoveInX = false;
    }
    collided = true;
  }

  if (dx > 0 && Math.abs(dx) > right && right >= -me.width + BUFFER) {
    if (bothSolid) {
      me.vx = -me.bounce * me.vx;
      me.x = me.x + right - BUFFER;
      canMoveInX = false;
    }
    collided = true;
  }

  if (canMoveInX) me.x += dx;
  if (canMoveInY) me.y += dy;

  // if (collided && me.collides !== null) me.collides(me, them);
}

export function resolveObjs(objects) {
  for (let i = 0; i < objects.length; i++) {
    for (let j = 0; j < objects.length; j++) {
      const obj0 = objects[i];
      const obj1 = objects[j];

      resolveObj(obj0, obj1);
    }
  }
}