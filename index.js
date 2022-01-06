import { render, html, svg } from './uhtml.js';

const hexToRGBA = hex => {
	let [r, g, b, a = 255] = hex
		.match(/\w\w/g)
		.map(x => parseInt(x, 16));
	return [r, g, b, a]
}

function RGBA_to_hex(orig) {
    var a, isPercent,
    rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
    alpha = (rgb && rgb[4] || "").trim(),
    hex = rgb ?
    (rgb[1] | 1 << 8).toString(16).slice(1) +
    (rgb[2] | 1 << 8).toString(16).slice(1) +
    (rgb[3] | 1 << 8).toString(16).slice(1) : orig;
  
    if (alpha !== "") { a = alpha; }
    else { a = 1; }
    hex = hex + a;
  
    return hex;
}

let seen = false;

const state = {
	canvas: null,
	gridColors: [],
	tempGridColors: [],
	gridSize: [64, 64],
	canvasSize: [500, 500],
	maxCanvasSize: 500,
	selected: [],
	tool: "draw",
	color: hexToRGBA("#000000"),
	mousedown: false,
	mousedownPt: [0, 0],
	currentPt: [0, 0],
	showGrid: false,
	defaultGridArraySize: [128, 128],
	// hoveredCell: null,
}

const view = state => html`
	<div class="canvas-container">
		<canvas class="drawing-canvas"></canvas>
	</div>
	<div class="toolbox">
		<button @click=${() => state.tool = "draw"}>draw</button>
		<button @click=${() => state.tool = "circle"}>circle</button>
		<button @click=${() => state.tool = "rectangle"}>rectangle</button>
		<button @click=${() => state.tool = "line"}>line</button>
		<button @click=${() => state.tool = "bucket"}>bucket</button>
		<button @click=${() => state.tool = "select"}>select</button>
		<button @click=${() => state.tool = "copy"}>TODO copy</button>
		<button @click=${() => state.tool = "paste"}>TODO paste</button>
		<button @click=${() => state.tool = "move"}>TODO move</button>
		<button @click=${() => {}}>TODO export</button>
		<div>
			<span>x:</span>
			<input 
				class="gridsize" 
				type="number" 
				min="1"
				max="${state.defaultGridArraySize[0]}"
				.value=${state.gridSize[0]}
				@input=${e => { 
					state.gridSize[0] = clamp(Number(e.target.value), 1, state.defaultGridArraySize[0]);
					setCanvasSize(state.canvas);
				}}/>
			<span>y:</span>
			<input 
				class="gridsize" 
				type="number" 
				min="1"
				max="${state.defaultGridArraySize[1]}"
				.value=${state.gridSize[1]}
				@input=${e => { 
					state.gridSize[1] = clamp(Number(e.target.value), 1, state.defaultGridArraySize[1]);
					setCanvasSize(state.canvas);
				}}/>
		</div>

		<div class="view-window">
			<canvas
				width="${state.defaultGridArraySize[0]}"
				height="${state.defaultGridArraySize[1]}"
				class="preview-canvas"
			></canvas>
		</div>
	</div>

	<div class="colors">
		<button>+ add color</button>
		<input 
			type="color" 
			.value=${state.color} 
			@input=${e => state.color = hexToRGBA(e.target.value)}
			@click=${e => state.color = hexToRGBA(e.target.value)}/>
		<button @click=${() => state.color = hexToRGBA("#00000000")}>clear</button>
	</div>
`

const r = () => {
	render(document.body, view(state));
}

const readCanvas = canvas => {
	const w = canvas.width;
	const h = canvas.height;
	const ctx = canvas.getContext("2d");

	return [w, h, ctx]
}

function line(from, to) {
	const points = [];
	if (Math.abs(from[0] - to[0]) > Math.abs(from[1] - to[1])) {
		if (from[0] > to[0]) [from, to] = [to, from];
		let slope = (to[1] - from[1]) / (to[0] - from[0]);
		for (let [x, y] = from; x <= to[0]; x++) {
			points.push([ x, Math.round(y) ]);
			y += slope;
		}
	} else {
		if (from[1] > to[1]) [from, to] = [to, from];
		let slope = (to[0] - from[0]) / (to[1] - from[1]);
		for (let [x, y] = from; y <= to[1]; y++) {
			points.push([ Math.round(x), y ]);
			x += slope;
		}
	}
	return points;
}

const drawGrid = (canvas) => {
	if (!state.showGrid) return;
	const [ w, h, ctx ] = readCanvas(canvas);
	const [ gridW, gridH ] = state.gridSize;
	const xSize = w/gridW;
	const ySize = h/gridH;

	for (let i = 0; i < gridW; i++) {
	    const x = i*xSize;
	    if (x === 0) continue;
	    ctx.strokeStyle = `black`;
	    ctx.lineWidth = xSize/20;
	    ctx.beginPath();
	    ctx.moveTo(x, 0);
	    ctx.lineTo(x, h);
	    ctx.stroke();
	}

	for (let i = 0; i < gridH; i++) {
	    const y = i*ySize;
	    if (y === 0) continue;
	   	ctx.strokeStyle = `black`;
	   	ctx.lineWidth = xSize/20;
	    ctx.beginPath();
	    ctx.moveTo(0, y);
	    ctx.lineTo(w, y);
	    ctx.stroke();
	}
}

const tools_mousedown = {
	"draw": (x, y) => {
		const [ gridW, gridH ] = state.defaultGridArraySize;
		state.gridColors[gridW*y+x] = state.color;
	},
	"bucket": (x, y) => {
		const [ gridW, gridH ] = state.defaultGridArraySize;

		const startColor = state.gridColors[gridW*y+x];
		const newColor = state.color;
		const grid = state.gridColors;

		const checkValidity = (x, y) => {
			return (x >= 0 && y >= 0 && x < gridW && y < gridH) && grid[gridW*y+x] === startColor && startColor !== newColor;
		}

		// const floodFill = (startColor, newColor, x, y, grid) => {
		// 	if (x < 0 || y < 0 || x >= gridW || y >= gridH) return;

 	// 		if (grid[gridW*y+x] === startColor && startColor !== newColor) {
		// 		grid[gridW*y+x] = newColor;
		// 		floodFill(startColor, newColor, x+1, y, grid);
		// 		floodFill(startColor, newColor, x-1, y, grid);
		// 		floodFill(startColor, newColor, x, y+1, grid);
		// 		floodFill(startColor, newColor, x, y-1, grid);
		// 	}
			
		// }

		const q = [];
		q.push([x, y]);
		while (q.length > 0) {
			const [ x1, y1 ] = q.pop();
			grid[gridW*y1+x1] = newColor;
			if (checkValidity(x1+1,y1)) q.push([ x1+1, y1 ])
			if (checkValidity(x1-1,y1)) q.push([ x1-1, y1 ])
			if (checkValidity(x1,y1+1)) q.push([ x1, y1+1 ])
			if (checkValidity(x1,y1-1)) q.push([ x1, y1-1 ])
		}

		// floodFill(state.gridColors[gridW*y+x], state.color, x, y, state.gridColors)
	},
	"select": (x, y) => {
		const [ gridW, gridH ] = state.defaultGridArraySize;
		const grid = state.gridColors;

		const seen = [];

		const checkValidity = (x, y) => {
			const color = grid[gridW*y+x];
			return (x >= 0 && y >= 0 && x < gridW && y < gridH) && color !== "#00000000" && !seen.includes(y*gridW+x);
		}

		const q = [];

		const add = (x, y) => {
			q.push([x, y]);
			seen.push(y*gridW+x);
		}

		q.push([x, y]);
		while (q.length > 0) {
			const [ x1, y1 ] = q.pop();
			if (checkValidity(x1+1,y1)) add(x1+1, y1);
			if (checkValidity(x1+1,y1+1)) add(x1+1, y1+1);
			if (checkValidity(x1-1,y1)) add(x1-1, y1);
			if (checkValidity(x1-1,y1-1)) add(x1-1,y1-1);
			if (checkValidity(x1,y1+1)) add(x1, y1+1);
			if (checkValidity(x1-1,y1+1)) add(x1-1,y1+1);
			if (checkValidity(x1,y1-1)) add(x1, y1-1);
			if (checkValidity(x1+1,y1-1)) add(x1+1,y1-1);
		}

		state.selected = seen;
	},
}

const tools_mousemove = {
	"draw": (x, y) => {
		if (!state.mousedown) return;
		const [ gridW, gridH ] = state.defaultGridArraySize;

		const pts = line(state.currentPt, state.mousedownPt);

		pts.forEach(([ x, y ]) => {
			state.tempGridColors[gridW*y+x] = state.color;
		})

		state.mousedownPt = state.currentPt;
	},
	"rectangle": (x, y) => {
		state.tempGridColors = state.tempGridColors.fill(null);
		if (!state.mousedown) return;
		const [ gridW, gridH ] = state.defaultGridArraySize;

		const xMin = Math.min(state.currentPt[0], state.mousedownPt[0]);
		const xMax = Math.max(state.currentPt[0], state.mousedownPt[0]);
		const yMin = Math.min(state.currentPt[1], state.mousedownPt[1]);
		const yMax = Math.max(state.currentPt[1], state.mousedownPt[1]);
		for (let x = xMin; x <= xMax; x++) {
			for (let y = yMin; y <= yMax; y++) {
				state.tempGridColors[gridW*y+x] = state.color;
			}
		}
	},
	"line": (x, y) => {
		state.tempGridColors = state.tempGridColors.fill(null);
		if (!state.mousedown) return;

		const [ gridW, gridH ] = state.defaultGridArraySize;

		const pts = line(state.currentPt, state.mousedownPt);

		pts.forEach(([ x, y ]) => {
			state.tempGridColors[gridW*y+x] = state.color;
		})
	},
	"circle": (x, y) => {
		state.tempGridColors = state.tempGridColors.fill(null);
		if (!state.mousedown) return;

		const [ gridW, gridH ] = state.defaultGridArraySize;

		const xMin = Math.min(state.currentPt[0], state.mousedownPt[0]);
		const xMax = Math.max(state.currentPt[0], state.mousedownPt[0]);
		const yMin = Math.min(state.currentPt[1], state.mousedownPt[1]);
		const yMax = Math.max(state.currentPt[1], state.mousedownPt[1]);
		const horizAxisR = (xMax - xMin)/2
		const vertAxisR = (yMax - yMin)/2
		const center = [xMin+horizAxisR, yMin+vertAxisR]
		const inCircle = (x,y) => ( (Math.pow(x-center[0],2)/Math.pow(horizAxisR,2)) + (Math.pow(y-center[1],2)/Math.pow(vertAxisR,2)) ) < 1

		for (let x = xMin; x <= xMax; x++) {
			for (let y = yMin; y <= yMax; y++) {
				if (inCircle(x,y)) {
					state.tempGridColors[gridW*y+x] = state.color;
				}
			}
		}
	}
}

const BACKGROUND_BLUE = hexToRGBA("#b4e2fc87");
const BACKGROUND_WHITE = hexToRGBA("#e3e3e34a");
const tempCanvas = document.createElement("canvas");
tempCanvas.getContext("2d").webkitImageSmoothingEnabled = false;
tempCanvas.getContext("2d").mozImageSmoothingEnabled = false;
tempCanvas.getContext("2d").imageSmoothingEnabled = false;

const drawCanvas = (canvas, main = true) => {
	const ctx = canvas.getContext("2d");
	ctx.fillStyle = "white";
	ctx.fillRect(0, 0, canvas.width, canvas.height);

	const grid = state.tempGridColors.map((color, i) => {
		if (color === null) return state.gridColors[i];
		else return color; 
	})

	const [ w, h ] = readCanvas(canvas);
	const [ gridW, gridH ] = main ? state.gridSize : state.defaultGridArraySize;
	// const xSize = w/gridW;
	// const ySize = h/gridH;

	const pixels = new Uint8ClampedArray(gridW * gridH * 4);

	let iPixel = 0;
	grid.forEach((color, i) => {
		const x = i % gridW;
		const y = Math.floor(i / gridH);

		if (x >= gridW || y >= gridH) return;

		if (color[3] < 255) {
			color = (x%2 === 0 && y%2 === 1) || (x%2 === 1 && y%2 === 0)
				? BACKGROUND_BLUE
				: BACKGROUND_WHITE;
		}

	 	pixels[iPixel++] = color[0];
	 	pixels[iPixel++] = color[1];
	 	pixels[iPixel++] = color[2];
	 	pixels[iPixel++] = color[3];
	})

	if (main) console.log(iPixel, pixels.length);

	if (!seen) {
		console.log({ grid, pixels, gridW, gridH, w, h })
		seen = true
	}

	tempCanvas.width = gridW;
	tempCanvas.height = gridH;

	const image = new ImageData(pixels, gridW, gridH);
	tempCanvas.getContext("2d").putImageData(image, 0, 0);

	state.selected.forEach(i => {
		const x = i % gridW;
		const y = Math.floor(i / gridH);
		tempCanvas.getContext("2d").fillStyle = "#aaaaaaaa";
		tempCanvas.getContext("2d").fillRect(x, y, 1, 1);
	})

	ctx.webkitImageSmoothingEnabled = false;
	ctx.mozImageSmoothingEnabled = false;
	ctx.imageSmoothingEnabled = false;
	ctx.drawImage(tempCanvas, 0, 0, w, h);
}

const setCanvasSize = c => {
	if (state.gridSize[0] < state.gridSize[1]) {
		state.canvasSize[0] = state.gridSize[0]/state.gridSize[1]*state.maxCanvasSize;
		state.canvasSize[1] = state.maxCanvasSize;
	} else {
		state.canvasSize[0] = state.maxCanvasSize;
		state.canvasSize[1] = state.gridSize[1]/state.gridSize[0]*state.maxCanvasSize;
	}

	c.width = state.canvasSize[0];
	c.height = state.canvasSize[1];
	const ctx = c.getContext("2d");
	// ctx.translate(0.5, 0.5);
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

function getPoint(e) {
	const c = document.querySelector(".drawing-canvas");
	const rect = c.getBoundingClientRect();
  	const rawX = e.clientX - rect.left;
  	const rawY = e.clientY - rect.top;

  	const [ w, h, ctx ] = readCanvas(c);
	const [ gridW, gridH ] = state.gridSize;
	const xSize = w/gridW;
	const ySize = h/gridH;

  	let x = Math.floor(rawX/xSize);
  	let y = Math.floor(rawY/ySize);

  	// x = clamp(x, 0, state.defaultGridArraySize[0] - 1);
  	// y = clamp(y, 0, state.defaultGridArraySize[1] - 1);

  	return [ x, y ];
}

const viewState = {
	min: { x: 16,  y: 16 },
	max: { x: 48,  y: 48 },
	cornerIndex: null,
};
const viewCorners = () => {
	const { min, max } = viewState;
	return [
		[min.x, max.y],
		[max.x, max.y],
		[max.x, min.y],
		[min.x, min.y],
	];
}

const drawView = (canvas) => {
	const ctx = canvas.getContext('2d');
	const { min, max } = viewState;

	const [x, y] = state.defaultGridArraySize;
	const [a, b, c, d] = viewCorners();
	ctx.beginPath();
	ctx.moveTo(0, 0);
	[
		d, c, b, a, d,
		[0, 0],
		[0, y],
		[x, y], 
		[x, 0],
		[0, 0],
	].forEach(corner => ctx.lineTo(...corner));
	ctx.fillStyle = '#99999999';
	ctx.fill();

	ctx.beginPath();
	ctx.strokeStyle = 'yellow';
	ctx.lineWidth = '2px';
	ctx.moveTo(min.x, min.y);
	ctx.fillStyle = 'orange';
	viewCorners().forEach((corner, i) => {
		if (i == viewState.cornerIndex)
			ctx.fillRect(...corner.map(x => x - 4), 4, 4);
		ctx.lineTo(...corner);
	});
	ctx.stroke();
}

const initView = (canvas) => {
	const localMousePos = ev => {
		let { x: bX, y: bY } = canvas.getBoundingClientRect();
		[bX, bY] = [bX, bY].map(x => parseInt(x));
		return [ev.pageX - bX, ev.pageY - bY]
			.map((v, i) => clamp(v, 0, state.defaultGridArraySize[i]));
	}

	const mouseInput = canvas.onmousemove = ev => {
		if (viewState.cornerIndex == null) return;
		const [x, y] = localMousePos(ev);

		const [cornerX, cornerY] = viewCorners()[viewState.cornerIndex];
		viewState[cornerX == viewState.min.x ? 'min' : 'max'].x = x;
		viewState[cornerY == viewState.min.y ? 'min' : 'max'].y = y;

		const { min, max } = viewState;
		const minX = Math.min(min.x, max.x);
		const maxX = Math.max(min.x, max.x);
		const minY = Math.min(min.y, max.y);
		const maxY = Math.max(min.y, max.y);
		state.gridSize = [maxX - minX, maxY - minY]
			.map(x => Math.max(x, 1));
	}
	
	const distance = (x0, y0, x1, y1) => Math.sqrt((x0 - x1)*(x0 - x1) + (y0 - y1)*(y0 - y1));
	canvas.onmousedown = ev => {
		const clickDist = xy => distance(...localMousePos(ev), ...xy);
		const { i, dist } = viewCorners()
			.map((xy, i) => ({ dist: clickDist(xy), i }))
			.sort((a, b) => a.dist - b.dist)
			.splice(0, 1)[0];

		/* have to be at least this close to grab the corner ... */
		if (dist < 8) viewState.cornerIndex = i;

		mouseInput(ev);
	}
	window.addEventListener('mouseup', ev => (mouseInput(ev), viewState.cornerIndex = null));
}

const init = state => {
	render(document.body, view(state));

	initView(document.querySelector(".preview-canvas"));

	const c = document.querySelector(".drawing-canvas");
	state.canvas = c;

	setCanvasSize(c);
	// init canvas data
	const [ gridW, gridH ] = state.gridSize;
	state.gridColors = new Array(state.defaultGridArraySize[0] * state.defaultGridArraySize[1]).fill(hexToRGBA("#00000000"));
	state.tempGridColors = new Array(state.defaultGridArraySize[0] * state.defaultGridArraySize[1]).fill(null);

	animate();

	c.addEventListener("mousedown", (e) => {
	  	state.mousedown = true;
	  	const pt = getPoint(e);
	  	state.mousedownPt = pt;
	  	if (state.tool in tools_mousedown) tools_mousedown[state.tool](...pt);
	})

	c.addEventListener("mousemove", (e) => {
		const pt = getPoint(e);
	  	state.currentPt = pt;
	  	if (state.tool in tools_mousemove) tools_mousemove[state.tool](...pt);
	})

	c.addEventListener("mouseup", (e) => {
		state.mousedown = false;
		state.mousedownPt = [0, 0];
		state.currentPt = [0, 0];

		state.tempGridColors.forEach((c, i) => {
			if (c !== null) state.gridColors[i] = c;
		})

		state.tempGridColors.fill(null);
	})

	c.addEventListener("mouseleave", (e) => {
		state.mousedown = false;
		state.mousedownPt = [0, 0];
		state.currentPt = [0, 0];

		state.tempGridColors.forEach((c, i) => {
			if (c !== null) state.gridColors[i] = c;
		})

		state.tempGridColors.fill(null);
	})
}

const animate = () => {
	drawCanvas(state.canvas);
	const previewC = document.querySelector(".preview-canvas");
	drawCanvas(previewC, false);
	drawView(previewC);
	window.requestAnimationFrame(animate);
}

init(state);




