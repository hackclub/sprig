export function size_up_sprites(sprites) {
  function contextBoundingBox(sprite, w, h) {
    const occupiedPixel = (pixel) => pixel[3] > 0;

    const ascending = (a, b) => a - b;
    const xs = sprite
      .reduce((a, p, i) => (p[3] == 0 ? a : [...a, i % w]), [])
      .sort(ascending);
    const ys = sprite
      .reduce((a, p, i) => (p[3] == 0 ? a : [...a, Math.floor(i / w)]), [])
      .sort(ascending);

    return {
      x: xs[0],
      y: ys[0],
      maxX: xs[xs.length - 1],
      maxY: ys[ys.length - 1],
      width: xs[xs.length - 1] - xs[0] + 1,
      height: ys[ys.length - 1] - ys[0] + 1,
    };
  }

  for (const sprite of Object.values(sprites)) {
    sprite.bounds = contextBoundingBox(sprite.colors, ...sprite.size);
    if (sprite.bounds.x === undefined) {
      sprite.bounds = {
        x: 0,
        y: 0,
        maxX: 0,
        maxY: 0,
        width: 1,
        height: 1,
      };
    }
  }
}
