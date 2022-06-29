export function sizeGameCanvas() {
  const container = document.querySelector(".game-canvas-container");
  const canvas = container.querySelector("canvas");
  if (!container || !canvas) return;

  const ar = canvas.width/canvas.height;
  const { width, height } = container.getBoundingClientRect();
  if (height*ar > width) {
    canvas.style["width"] = "100%";
    canvas.style.removeProperty("height");
  } else {
    canvas.style["height"] = "100%";
    canvas.style.removeProperty("width");
  }
}