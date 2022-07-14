export function sizeGameCanvas() {
  const container = document.querySelector(".game-canvas-container");
  const canvas = container.querySelector("canvas");
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

  const [idealWidth, idealHeight] = window.idealDimensions || [1, 1];
  let scale = Math.min(width/idealWidth, height/idealHeight);
  // scale = nearestPowerOf2(scale);
  const w = Math.floor(idealWidth * scale);
  const h = Math.floor(idealHeight * scale);

  // console.log("scale", scale);

  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
}

function nearestPowerOf2(n) {
  return 1 << 31 - Math.clz32(n);
}

