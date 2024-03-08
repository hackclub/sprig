/*
  @title: Mandelbrot Set Generator
@tags: ['fractal', 'visualization']
@img: "https://upload.wikimedia.org/wikipedia/commons/2/21/Mandel_zoom_00_mandelbrot_set.jpg"
@addedOn: 2024-03-08
@author: Radhesh Goel
*/
  
const DEFAULT_XOFFSET = -0.5;
const DEFAULT_YOFFSET = 0.0;
const DEFAULT_SIZE = 3.3;
const MAX_COLORS = 10;
const MAX_ITERATIONS = 200;
const IMAGE_DIMENSIONS = 500;
var XOFFSET = Number(DEFAULT_XOFFSET);
var YOFFSET = Number(DEFAULT_YOFFSET);
var SIZE = Number(DEFAULT_SIZE);
var TOAST_ID = 0;

function complex_new(r, i) {
  return { r: r, i: i };
}

function complex_add(c1, c2) {
  return complex_new(c1.r + c2.r, c1.i + c2.i);
}

function complex_mul(c1, c2) {
  return complex_new(
    c1.r * c2.r - c1.i * c2.i,
    c1.r * c2.i + c1.i * c2.r
  );
}

function complex_abs(c1) {
  return Math.sqrt(c1.r * c1.r + c1.i * c1.i);
}

function mandelbrot(z) {
  let orig = z;
  for (let i = 0; i < MAX_ITERATIONS; i++) {
    if (complex_abs(z) > 2.0) return i;
    z = complex_add(complex_mul(z, z), orig);
  }
  return MAX_COLORS;
}

function createMap() {
  let m = "";
  for (let h = 0; h < IMAGE_DIMENSIONS; h++) {
    for (let w = 0; w < IMAGE_DIMENSIONS; w++) {
      let x0 = XOFFSET - SIZE / 2 + (SIZE * w) / IMAGE_DIMENSIONS;
      let y0 = YOFFSET - SIZE / 2 + (SIZE * h) / IMAGE_DIMENSIONS;
      let z0 = complex_new(x0, y0);
      let colorIndex = Math.min(
        Math.max(0, MAX_COLORS - mandelbrot(z0)),
        MAX_COLORS - 1
      );
      m = m + colorIndex.toString();
    }
    m = m + "\n";
  }
  return eval("map`" + m + "`");
}

function round(num) {
  return Number(Number(num).toFixed(1));
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function render() {
  SIZE = round(SIZE);
  XOFFSET = round(XOFFSET);
  YOFFSET = round(YOFFSET);
  
  setMap(createMap());
  
  addText("Zoom: " + SIZE, { x: 2, y: 15, color: color`2` });
  addText("X: " + XOFFSET, { x: 2, y: 13, color: color`2` });
  addText("Y: " + YOFFSET, { x: 2, y: 14, color: color`2` });
  
  TOAST_ID = TOAST_ID + 1;
  let currentNotification = TOAST_ID;
  
  delay(1500).then(() => {
    if (currentNotification == TOAST_ID) {
      clearText();
    }
  });
}

setLegend.apply(this, createColors());
render();

onInput("w", () => {
  YOFFSET = YOFFSET + 0.1;
  render();
});

onInput("s", () => {
  YOFFSET -= 0.1;
  render();
});

onInput("a", () => {
  XOFFSET += 0.1;
  render();
});

onInput("d", () => {
  XOFFSET -= 0.1;
  render();
});

onInput("j", () => {
  SIZE = SIZE - 0.1;
  render();
});

onInput("i", () => {
  SIZE = SIZE + 0.1;
  render();
});

onInput("k", () => {
  SIZE = DEFAULT_SIZE;
  XOFFSET = DEFAULT_XOFFSET;
  YOFFSET = DEFAULT_YOFFSET;
  render();
});

function createColors() {
  let colors = [];
  for (let i = 0; i < MAX_COLORS; i++) {
    const name = "" + i.toString();
    let bm = "";
    for (let width = 0; width < 16; width++) {
      for (let height = 0; height < 16; height++) {
        bm = bm + i.toString();
      }
      bm = bm + "\n";
    }
    
    let myBitmap = eval("bitmap`" + bm + "`");
    let entry = [name, myBitmap];
    colors.push(entry);
  }
  return colors;
}
