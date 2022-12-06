export function sizeGameCanvas() {
  const container = document.querySelector(".game-canvas-container");
  const canvas = container.querySelector(".game-canvas");
  if (!container || !canvas) return;

  // const ar = canvas.width/canvas.height;
  const { width, height } = container.getBoundingClientRect();
  // if (height*ar > width) {
  //   canvas.style["width"] = `${width}px`;
  //   canvas.style.removeProperty("height");
  // } else {
  //   canvas.style["height"] = `${height}px`;
  //   canvas.style.removeProperty("width");
  // }

  const actualFromIdeal = (idealWidth, idealHeight) => {
    let scale = Math.min(width/idealWidth, height/idealHeight);
    // scale = nearestPowerOf2(scale);
    return {
      w: Math.floor(idealWidth * scale),
      h: Math.floor(idealHeight * scale)
    };
  }

  const { w, h } = actualFromIdeal(5, 4);
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");
  ctx.webkitImageSmoothingEnabled = false;
  ctx.mozImageSmoothingEnabled = false;
  ctx.imageSmoothingEnabled = false;
}

function nearestPowerOf2(n) {
  return 1 << 31 - Math.clz32(n);
}

