/*
  @title:  Sierpinski carpet Generator
@tags: ['fractal', 'visualization']
@img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Sierpinski_carpet_6.svg/200px-Sierpinski_carpet_6.svg.png"
@addedOn: 2024-03-08
@author: Radhesh Goel
*/
const DEFAULT_XOFFSET  = -1.5;
const DEFAULT_YOFFSET  = -1.5;
const DEFAULT_SIZE     = 100;
const MAX_COLORS       = 10; // Max number of colors
const IMAGE_DIMENSIONS = 64;
var XOFFSET            = Number(DEFAULT_XOFFSET);
var YOFFSET            = Number(DEFAULT_YOFFSET);
var SIZE               = Number(DEFAULT_SIZE);
var TOAST_ID           = 0; // A variable to avoid a UI glitch

function createMap() {
  let m = "";
  for(let h = 0; h < IMAGE_DIMENSIONS; h++) {
    for(let w = 0; w < IMAGE_DIMENSIONS; w++) {
      let x0 = XOFFSET - SIZE/2 + SIZE*w/IMAGE_DIMENSIONS;
      let y0 = YOFFSET - SIZE/2 + SIZE*h/IMAGE_DIMENSIONS;
      if (isInSierpinskiCarpet(x0, y0)) {
        m += "0"; // Inside the Sierpinski carpet
      } else {
        m += "9"; // Outside the Sierpinski carpet
      }
    }
    m += "\n";
  }
  return eval("map`" + m + "`");
}

function isInSierpinskiCarpet(x, y) {
  while (x > 0 || y > 0) {
    if (x % 3 == 1 && y % 3 == 1) {
      return false; // Inside a hole
    }
    x = Math.floor(x / 3);
    y = Math.floor(y / 3);
  }
  return true; // Inside the Sierpinski carpet
}

function createColors() {
  let colors = []
  for(let i = 0; i < MAX_COLORS; i++) {
    const name = "" + i.toString();
    let bm = ""
    for(let width = 0; width < 16; width++) {
      for(let height = 0; height < 16; height++) {
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
  return new Promise(resolve => setTimeout(resolve, time));
}

function render() {
  SIZE = round(SIZE);
  XOFFSET = round(XOFFSET);
  YOFFSET = round(YOFFSET);

  setMap(createMap());

  addText("Zoom: " + SIZE, { x: 2, y: 15, color: color`2`});
  addText("X: " + XOFFSET, { x: 2, y: 13, color: color`2`});
  addText("Y: " + YOFFSET, { x: 2, y: 14, color: color`2`});

  TOAST_ID++;
  let currentNotification = TOAST_ID;

  delay(1500).then(() => {
    if (currentNotification == TOAST_ID) {
      clearText();
    }
  });
}

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
