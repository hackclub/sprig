/*
  @title: newton_fractal_generator
@tags: ['sandbox', 'simulation']
@img: ""
@addedOn: 2024-03-08
@author: Radhesh Goel

Controls:
  w - Pan up
s - Pan down
a - Pan left
d - Pan right
i - Zoom in
j - Zoom out
k - Reset to defaults
*/
  
const DEFAULT_XOFFSET = -1.5;
const DEFAULT_YOFFSET = -1.5;
const DEFAULT_SIZE = 3;
const MAX_COLORS = 10;
const MAX_ITERATIONS = 30;
const IMAGE_DIMENSIONS = 64;
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

function complex_sub(c1, c2) {
  return complex_new(c1.r - c2.r, c1.i - c2.i);
}

function complex_div(c1, c2) {
  let denominator = c2.r * c2.r + c2.i * c2.i;
  return complex_new(
    (c1.r * c2.r + c1.i * c2.i) / denominator,
    (c1.i * c2.r - c1.r * c2.i) / denominator
  );
}

function complex_abs(c1) {
  return Math.sqrt(c1.r * c1.r + c1.i * c1.i);
}

function newton(z) {
  let dz;
  for (let i = 0; i < MAX_ITERATIONS; i++) {
    let f = complex_sub(complex_mul(z, z), complex_new(1, 0));
    if (complex_abs(f) < 0.001) return i;
    let df = complex_mul(complex_new(2, 0), z);
    dz = complex_div(f, df);
    z = complex_sub(z, dz);
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
        Math.max(0, MAX_COLORS - newton(z0)),
        MAX_COLORS - 1
      );
      m += colorIndex.toString();
    }
    m += "\n";
  }
  return eval("map`" + m + "`");
}

// Define set of colors to be used in the map
function createColors() {
  let colors = [];
  for (let i = 0; i < MAX_COLORS; i++) {
    const name = "" + i.toString();
    let bm = "";
    for (let width = 0; width < 16; width++) {
      for (let height = 0; height < 16; height++) {
        bm += i.toString();
      }
      bm += "\n";
    }
    
    let myBitmap = eval("bitmap`" + bm + "`");
    let entry = [name, myBitmap];
    colors.push(entry);
  }
  return colors;
}

function round(num) {
  return Number(Number(num).toFixed(1));
}

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

function render() {
  // Round all state variables to a single decimal place
  SIZE = round(SIZE);
  XOFFSET = round(XOFFSET);
  YOFFSET = round(YOFFSET);
  
  // Recreate the map
  setMap(createMap());
  
  // Add info text
  addText("Zoom: " + SIZE, { x: 2, y: 15, color: color`2` });
  addText("X: " + XOFFSET, { x: 2, y: 13, color: color`2` });
  addText("Y: " + YOFFSET, { x: 2, y: 14, color: color`2` });
  
  TOAST_ID++;
  let currentNotification = TOAST_ID;
  
  // Dismiss the text after 1.5 seconds
  delay(1500).then(() => {
    // Only clear the text if this was the most recent notification
    if (currentNotification == TOAST_ID) {
      clearText();
    }
  });
}

// Palette initialization and initial render
setLegend.apply(this, createColors());
render();

/**
  * Panning controls
*/
  onInput("w", () => {
    YOFFSET += 0.1;
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

/**
  * Zooming controls
*/
  onInput("j", () => {
    SIZE -= 0.1;
    render();
  });

onInput("i", () => {
  SIZE += 0.1;
  render();
});

/**
  * Misc controls
*/
  onInput("k", () => {
    SIZE = DEFAULT_SIZE;
    XOFFSET = DEFAULT_XOFFSET;
    YOFFSET = DEFAULT_YOFFSET;
    render();
  });
