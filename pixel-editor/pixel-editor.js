import { render, html, svg } from "../uhtml.js";
import { pixelStyles } from "./pixel-styles.js";

const hexToRGBA = (hex) => {
  let [r, g, b, a = 255] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
  return [r, g, b, a];
};

function RGBA_to_hex([r, g, b, a]) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);
  a = a.toString(16);

  if (r.length == 1) r = "0" + r;
  if (g.length == 1) g = "0" + g;
  if (b.length == 1) b = "0" + b;
  if (a.length == 1) a = "0" + a;

  return "#" + r + g + b + a;
}

export function createPixelEditor(target) {
  const state = {
    canvas: null,
    gridColors: [],
    tempGridColors: [],
    viewboxSize: [32, 32],
    canvasSize: [500, 500],
    maxCanvasSize: 350,
    selected: [],
    tool: "draw",
    color: hexToRGBA("#000000"),
    mousedown: false,
    mousedownPt: [0, 0],
    currentPt: [0, 0],
    showGrid: false,
    gridSize: [32, 32],
    undoRedoStack: [],
    animationId: null,
    selectHandle: {
      clicked: false,
      dragged: false,
    },
    // hoveredCell: null,
  };

  function upload(files, extensions = []) {
    let file = files[0];
    let fileName = file.name.split(".");
    let name = fileName[0];
    const extension = fileName[fileName.length - 1];

    if (extensions.length > 0 && extensions.includes(enxtension))
      throw "Extension not recongized: " + fileName;

    readFile(file);
  }

  function readFile(file) {
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onloadend = (event) => {
      let raw = reader.result;

      // const json = JSON.parse(raw);
      // const { song, cells, bpm } = json;

      // state.cells = cells;
      // state.bpm = bpm;
      setImageData(file);
      r();
    };
  }

  function addDropUpload() {
    const container = target.querySelector(".pixel-editor-container");

    container.addEventListener("drop", (e) => {
      let dt = e.dataTransfer;
      let files = dt.files;

      upload(files);

      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
      e.cancelBubble = true;
      e.returnValue = false;
    });

    container.addEventListener("dragover", (e) => {
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
      e.cancelBubble = true;
      e.returnValue = false;
    });
  }

  const setImageData = (file) => {
    let reader = new FileReader();
    reader.onload = (event) => {
      const dataURL = event.target.result;
      const canvas = target.querySelector("#offscreen-canvas");
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const image = new Image();
      image.onload = () => {
        const w = Math.min(image.width, 32);
        const h = Math.min(image.height, 32);
        ctx.drawImage(image, 0, 0, w, h);
        const imageData = ctx.getImageData(0, 0, 32, 32);
        for (let i = 0; i < state.gridColors.length; i++) {
          state.gridColors[i] = [
            imageData.data[i * 4],
            imageData.data[i * 4 + 1],
            imageData.data[i * 4 + 2],
            imageData.data[i * 4 + 3],
          ];
        }
      };
      image.src = dataURL;
    };
    reader.readAsDataURL(file);
  };

  const renderTool = (toolName, state) => html`
    <button
      class=${[state.tool === toolName ? "selected-tool" : ""].join(" ")}
      @click=${() => {
        state.tool = toolName;
        r();
      }}
      style="
        display: flex; 
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: min-content;
      "
      title="${toolName}"
    >
      <img src=${`./assets/${toolName}.png`} alt=${toolName} width="25px" />
      ${toolName}
    </button>
  `;

  const view = (state) => html`
    ${pixelStyles}
    <div class="pixel-editor-container">
      <div class="canvas-container">
        <canvas class="drawing-canvas"></canvas>
        <canvas
          class="offscreen-canvas"
          id="offscreen-canvas"
          width="32"
          height="32"
        ></canvas>
      </div>
      <div class="toolbox">
        <div class="tools">
          ${["draw", "circle", "rectangle", "line", "bucket", "move"].map(
            (name) => renderTool(name, state)
          )}
          <button
            @click=${() => {
              if (state.undoRedoStack.length === 0) return;
              const grid = JSON.parse(state.undoRedoStack.pop());
              state.gridColors.forEach((arr, i) => {
                state.gridColors[i] = grid[i];
              });
            }}
            style="
              display: flex; 
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: min-content;
            "
            title="undo"
          >
            <img src="./assets/undo.png" alt="undo" width="25px" />
            undo
          </button>
          <button
            title="export"
            @click=${() => {
              const canvas = target.querySelector("#offscreen-canvas");
              drawCanvasNoBg(canvas);
              const image = canvas.toDataURL();
              const aDownloadLink = document.createElement("a");
              aDownloadLink.download = "sprite.png";
              aDownloadLink.href = image;
              aDownloadLink.click();
            }}
          >
            export
          </button>
        </div>

        ${drawColorsButtons(state)}
      </div>
    </div>
  `;

  const drawColorsButtons = (state) => html`
    <div class="colors">
      <input
        type="color"
        @input=${(e) => {
          state.color = hexToRGBA(e.target.value);
          r();
        }}
        @click=${(e) => {
          state.color = hexToRGBA(e.target.value);
          r();
        }}
        class=${RGBA_to_hex(state.color) !== "#00000000" ? "selected-tool" : ""}
        style=${`
          height: 35px; 
          width: 35px; 
        `}
      />
      <button
        class=${RGBA_to_hex(state.color) === "#00000000" ? "selected-tool" : ""}
        @click=${() => {
          state.color = hexToRGBA("#00000000");
          r();
        }}
        style="height: 35px;"
      >
        <img src="./assets/clear.png" width="25px" />
      </button>
    </div>
  `;

  const r = () => {
    render(target, view(state));
  };

  const readCanvas = (canvas) => {
    const w = canvas.width;
    const h = canvas.height;
    const ctx = canvas.getContext("2d");

    return [w, h, ctx];
  };

  function line(from, to) {
    const points = [];
    if (Math.abs(from[0] - to[0]) > Math.abs(from[1] - to[1])) {
      if (from[0] > to[0]) [from, to] = [to, from];
      let slope = (to[1] - from[1]) / (to[0] - from[0]);
      for (let [x, y] = from; x <= to[0]; x++) {
        points.push([x, Math.round(y)]);
        y += slope;
      }
    } else {
      if (from[1] > to[1]) [from, to] = [to, from];
      let slope = (to[0] - from[0]) / (to[1] - from[1]);
      for (let [x, y] = from; y <= to[1]; y++) {
        points.push([Math.round(x), y]);
        x += slope;
      }
    }
    return points;
  }

  const drawGrid = (canvas) => {
    if (!state.showGrid) return;
    const [w, h, ctx] = readCanvas(canvas);
    const [gridW, gridH] = state.viewboxSize;
    const xSize = w / gridW;
    const ySize = h / gridH;

    for (let i = 0; i < gridW; i++) {
      const x = i * xSize;
      if (x === 0) continue;
      ctx.strokeStyle = `black`;
      ctx.lineWidth = xSize / 20;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }

    for (let i = 0; i < gridH; i++) {
      const y = i * ySize;
      if (y === 0) continue;
      ctx.strokeStyle = `black`;
      ctx.lineWidth = xSize / 20;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }
  };

  const tools_mousedown = {
    draw: (x, y) => {
      const [gridW, gridH] = state.gridSize;
      state.gridColors[gridW * y + x] = state.color;
    },
    bucket: (x, y) => {
      const [gridW, gridH] = state.gridSize;

      const startColor = RGBA_to_hex(state.gridColors[gridW * y + x]);
      const newColor = RGBA_to_hex(state.color);
      const grid = state.gridColors;

      const checkValidity = (x, y) => {
        return (
          x >= 0 &&
          y >= 0 &&
          x < gridW &&
          y < gridH &&
          RGBA_to_hex(grid[gridW * y + x]) === startColor &&
          startColor !== newColor
        );
      };

      const q = [];
      q.push([x, y]);
      while (q.length > 0) {
        const [x1, y1] = q.pop();
        grid[gridW * y1 + x1] = state.color;
        if (checkValidity(x1 + 1, y1)) q.push([x1 + 1, y1]);
        if (checkValidity(x1 - 1, y1)) q.push([x1 - 1, y1]);
        if (checkValidity(x1, y1 + 1)) q.push([x1, y1 + 1]);
        if (checkValidity(x1, y1 - 1)) q.push([x1, y1 - 1]);
      }
    },
    move: (x, y) => {
      const [gridW, gridH] = state.gridSize;
      const grid = state.gridColors;

      const checkValidity = (x, y) => {
        if (x < 0 || y < 0 || x > gridW - 1 || y > gridH - 1) return false;

        const color = RGBA_to_hex(grid[gridW * y + x]);
        return color !== "#00000000" && !seen.includes(y * gridW + x);
      };

      const seen = [];

      const q = [];

      const add = (x, y) => {
        q.push([x, y]);
        seen.push(y * gridW + x);
      };

      if (checkValidity(x, y)) add(x, y);

      while (q.length > 0) {
        const [x1, y1] = q.pop();
        if (checkValidity(x1 + 1, y1)) add(x1 + 1, y1);
        if (checkValidity(x1 + 1, y1 + 1)) add(x1 + 1, y1 + 1);
        if (checkValidity(x1 - 1, y1)) add(x1 - 1, y1);
        if (checkValidity(x1 - 1, y1 - 1)) add(x1 - 1, y1 - 1);
        if (checkValidity(x1, y1 + 1)) add(x1, y1 + 1);
        if (checkValidity(x1 - 1, y1 + 1)) add(x1 - 1, y1 + 1);
        if (checkValidity(x1, y1 - 1)) add(x1, y1 - 1);
        if (checkValidity(x1 + 1, y1 - 1)) add(x1 + 1, y1 - 1);
      }

      const newSelected = new Set([...state.selected, ...seen]);
      state.selected = seen.length > 0 ? [...newSelected] : [];

      const avg = (array) => array.reduce((a, b) => a + b) / array.length;

      if (state.selected.length > 0) {
        state.selectHandle.clicked = true;
      }
    },
  };

  const tools_mousemove = {
    draw: (x, y) => {
      if (!state.mousedown) return;
      const [gridW, gridH] = state.gridSize;

      const pts = line(state.currentPt, state.mousedownPt);

      pts.forEach(([x, y]) => {
        state.tempGridColors[gridW * y + x] = state.color;
      });

      state.mousedownPt = state.currentPt;
    },
    rectangle: (x, y) => {
      state.tempGridColors = state.tempGridColors.fill(null);
      if (!state.mousedown) return;
      const [gridW, gridH] = state.gridSize;

      const xMin = Math.min(state.currentPt[0], state.mousedownPt[0]);
      const xMax = Math.max(state.currentPt[0], state.mousedownPt[0]);
      const yMin = Math.min(state.currentPt[1], state.mousedownPt[1]);
      const yMax = Math.max(state.currentPt[1], state.mousedownPt[1]);
      for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
          state.tempGridColors[gridW * y + x] = state.color;
        }
      }
    },
    line: (x, y) => {
      state.tempGridColors = state.tempGridColors.fill(null);
      if (!state.mousedown) return;

      const [gridW, gridH] = state.gridSize;

      const pts = line(state.currentPt, state.mousedownPt);

      pts.forEach(([x, y]) => {
        state.tempGridColors[gridW * y + x] = state.color;
      });
    },
    circle: (x, y) => {
      state.tempGridColors = state.tempGridColors.fill(null);
      if (!state.mousedown) return;

      const [gridW, gridH] = state.gridSize;

      const xMin = Math.min(state.currentPt[0], state.mousedownPt[0]);
      const xMax = Math.max(state.currentPt[0], state.mousedownPt[0]);
      const yMin = Math.min(state.currentPt[1], state.mousedownPt[1]);
      const yMax = Math.max(state.currentPt[1], state.mousedownPt[1]);
      const horizAxisR = (xMax - xMin) / 2;
      const vertAxisR = (yMax - yMin) / 2;
      const center = [xMin + horizAxisR, yMin + vertAxisR];
      const inCircle = (x, y) =>
        Math.pow(x - center[0], 2) / Math.pow(horizAxisR, 2) +
          Math.pow(y - center[1], 2) / Math.pow(vertAxisR, 2) <
        1;

      for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
          if (inCircle(x, y)) {
            state.tempGridColors[gridW * y + x] = state.color;
          }
        }
      }
    },
  };

  const i_to_xy = (i) => {
    const x = i % state.gridSize[0];
    const y = Math.floor(i / state.gridSize[1]);

    return [x, y];
  };

  const BACKGROUND_BLUE = hexToRGBA("#b4e2fc87");
  const BACKGROUND_WHITE = hexToRGBA("#e3e3e34a");
  const tempCanvas = document.createElement("canvas");
  const tempCtx = tempCanvas.getContext("2d");

  const drawCanvas = (canvas, main = true) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const grid = state.tempGridColors.map((color, i) => {
      if (color === null) return state.gridColors[i];
      else return color;
    });

    const [w, h] = readCanvas(canvas);
    const [gridW, gridH] = main ? state.viewboxSize : state.gridSize;
    // const xSize = w/gridW;
    // const ySize = h/gridH;

    const pixels = new Uint8ClampedArray(
      state.gridSize[0] * state.gridSize[1] * 4
    );

    grid.forEach((color, i) => {
      if (color[3] === 0) {
        const [x, y] = i_to_xy(i);
        color =
          (x % 2 === 0 && y % 2 === 1) || (x % 2 === 1 && y % 2 === 0)
            ? BACKGROUND_BLUE
            : BACKGROUND_WHITE;
      }

      let index = i * 4;
      pixels[index] = color[0];
      pixels[index + 1] = color[1];
      pixels[index + 2] = color[2];
      pixels[index + 3] = color[3];
    });

    tempCanvas.width = gridW;
    tempCanvas.height = gridH;
    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;
    // tempCtx.webkitImageSmoothingEnabled = false;
    // tempCtx.mozImageSmoothingEnabled = false;
    // tempCtx.imageSmoothingEnabled = false;

    const image = new ImageData(pixels, state.gridSize[0], state.gridSize[1]);
    tempCtx.putImageData(image, 0, 0);

    state.selected.forEach((i) => {
      const [x, y] = i_to_xy(i);
      tempCtx.fillStyle = "#aaaaaaaa";
      tempCtx.fillRect(x, y, 1, 1);
    });

    ctx.drawImage(tempCanvas, 0, 0, w, h);
  };

  const drawCanvasNoBg = (canvas, main = true) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const [w, h] = readCanvas(canvas);
    const [gridW, gridH] = main ? state.viewboxSize : state.gridSize;

    const pixels = new Uint8ClampedArray(
      state.gridSize[0] * state.gridSize[1] * 4
    ).fill(0);

    state.gridColors.forEach((color, i) => {
      let index = i * 4;
      pixels[index] = color[0];
      pixels[index + 1] = color[1];
      pixels[index + 2] = color[2];
      pixels[index + 3] = color[3];
    });

    ctx.webkitImageSmoothingEnabled = false;
    ctx.mozImageSmoothingEnabled = false;
    ctx.imageSmoothingEnabled = false;

    const image = new ImageData(pixels, state.gridSize[0], state.gridSize[1]);

    ctx.putImageData(image, 0, 0);
  };

  const setCanvasSize = (c) => {
    if (state.viewboxSize[0] < state.viewboxSize[1]) {
      state.canvasSize[0] =
        (state.viewboxSize[0] / state.viewboxSize[1]) * state.maxCanvasSize;
      state.canvasSize[1] = state.maxCanvasSize;
    } else {
      state.canvasSize[0] = state.maxCanvasSize;
      state.canvasSize[1] =
        (state.viewboxSize[1] / state.viewboxSize[0]) * state.maxCanvasSize;
    }

    c.width = state.canvasSize[0];
    c.height = state.canvasSize[1];
    const ctx = c.getContext("2d");
    // ctx.translate(0.5, 0.5);
  };

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  function getPoint(e) {
    const c = target.querySelector(".drawing-canvas");
    const rect = c.getBoundingClientRect();
    const rawX = e.clientX - rect.left;
    const rawY = e.clientY - rect.top;

    const [w, h, ctx] = readCanvas(c);
    const [gridW, gridH] = state.viewboxSize;
    const xSize = w / gridW;
    const ySize = h / gridH;

    let x = Math.floor(rawX / xSize);
    let y = Math.floor(rawY / ySize);

    x = clamp(x, 0, state.gridSize[0] - 1);
    y = clamp(y, 0, state.gridSize[1] - 1);

    return [x, y];
  }

  const init = (state) => {
    r();
    const c = target.querySelector(".drawing-canvas");

    state.canvas = c;

    setCanvasSize(c);
    // init canvas data
    const [gridW, gridH] = state.viewboxSize;
    state.gridColors = new Array(state.gridSize[0] * state.gridSize[1]).fill(
      hexToRGBA("#00000000")
    );
    state.tempGridColors = new Array(
      state.gridSize[0] * state.gridSize[1]
    ).fill(null);

    animate();

    addDropUpload();

    c.addEventListener("mousedown", (e) => {
      state.undoRedoStack.push(JSON.stringify(state.gridColors));
      if (state.undoRedoStack.length > 15) state.undoRedoStack.unshift();

      state.mousedown = true;
      const pt = getPoint(e);
      state.mousedownPt = pt;

      if (state.tool in tools_mousedown) tools_mousedown[state.tool](...pt);
    });

    c.addEventListener("mousemove", (e) => {
      const pt = getPoint(e);
      state.currentPt = pt;
      if (state.tool in tools_mousemove) tools_mousemove[state.tool](...pt);

      if (state.selectHandle.clicked) {
        state.tempGridColors.fill(null);

        state.selected.forEach((i) => {
          const [x, y] = i_to_xy(i);
          const dx = pt[0] - state.mousedownPt[0];
          const dy = pt[1] - state.mousedownPt[1];
          const newX = x + dx;
          const newY = y + dy;
          if (
            newX < 0 ||
            newX >= state.gridSize[0] ||
            newY < 0 ||
            newY >= state.gridSize[1]
          )
            return;

          const newI = state.gridSize[0] * newY + newX;

          const currentColor = state.gridColors[i];
          state.tempGridColors[newI] = currentColor;
        });

        state.selectHandle.dragged = true;
      }
    });

    const resetDrawing = (e) => {
      state.mousedown = false;
      state.mousedownPt = [0, 0];
      state.currentPt = [0, 0];

      if (state.selectHandle.dragged) {
        state.selected.forEach((i) => {
          state.gridColors[i] = [0, 0, 0, 0];
        });

        state.selected = [];
      }

      state.selectHandle.clicked = false;
      state.selectHandle.dragged = false;

      state.tempGridColors.forEach((c, i) => {
        if (c !== null) state.gridColors[i] = c;
      });
      state.tempGridColors.fill(null);
    };

    c.addEventListener("mouseup", (e) => {
      resetDrawing();
    });

    c.addEventListener("mouseleave", (e) => {
      resetDrawing();
    });
  };

  const animate = () => {
    drawCanvas(state.canvas);
    state.animationId = window.requestAnimationFrame(animate); // need to cancel this animation frame
  };

  init(state);

  return {
    setGridColors: ({ colors, size }) => {
      state.gridColors = colors;
      state.gridSize = size;
      state.viewboxSize = size;
    },
    createEmptyGrid: () => ({
      size: state.gridSize,
      colors: new Array(state.gridSize[0] * state.gridSize[1]).fill([
        0, 0, 0, 0,
      ]),
    }),
    gridColors: () => state.gridColors,
    end() {
      if (state.animationId) window.cancelAnimationFrame(state.animationId);
    },
  };
}
