export function initSprite(spriteData, that) {
  if (typeof spriteData === "object") {
    const [w, h] = spriteData.size;

    that.imageData = new ImageData(
      new Uint8ClampedArray(spriteData.colors.flat()),
      w,
      h
    );

    const dx = spriteData.bounds.x;
    const dy = spriteData.bounds.y;
    that._width = spriteData.bounds.width;
    that._height = spriteData.bounds.height;

    that._sprite = document.createElement("canvas");
    that._sprite.width = that._width;
    that._sprite.height = that._height;
    that._sprite.getContext("2d").putImageData(that.imageData, -dx, -dy);
    if (that.initialized) that.draw();
  } else {
    that._sprite = null;
  }
}