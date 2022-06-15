class Sprite {
  constructor(type, x, y) {
    this._type = null;
    this._x = x;
    this._y = y;
  }

  set type(k) {

    if (!(k in legend)) throw `"${k}" not in legend.`

    
    this._type = k;
  }

  get type() {
    return this._type;
  }

  set x(newX) {
    const dx = newX - this.x;
    canMoveToPush(this, dx, 0);
    return this;
  }

  get x() {
    return this._x;
  }

  set y(newY) {
    const dy = newY - this.y;
    canMoveToPush(this, 0, dy);
    return this;
  }

  get y() {
    return this._y;
  }

  remove() {
    sprites = sprites.filter(s => s !== this);
    return this;
  }
}


const canMoveToPush = (sprite, dx, dy) => {
  const { x, y, type } = sprite;
  const cellKey = `${x+dx},${y+dy}`;

  const notSolid = !solids.includes(type);
  const noMovement = dx === 0 && dy === 0;
  const movingToEmpty = !grid[cellKey];

  if (notSolid || noMovement || movingToEmpty) {
    sprite._x += dx;
    sprite._y += dy;
    return true;
  }

  let canMove = true;

  grid[cellKey].forEach(sprite => {
    const isSolid = solids.includes(sprite.bitmapKey);
    const isPushable = (bitmapKey in pushable) && pushable[bitmapKey].includes(sprite.bitmapKey);

    if (isSolid && !isPushable)
      canMove = false;

    if (isSolid && isPushable) {
      canMove = canMove && canMoveToPush(sprite, dx, dy);
    }
  })

  if (canMove) {
    sprite._x += dx;
    sprite._y += dy;
  }

  return canMove;

}