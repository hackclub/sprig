const maxIter = 64; // Iteration limit for Mandelbrot
let centerX = -0.5;
let centerY = 0.0;
let zoom = 2.0;
const gridWidth = 256;
const gridHeight = 256;

const shades = ["0", "1"];

setLegend(
  ["0", bitmap`
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222
2222222222222222`],
  ["1", bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`]
);

function mandelbrot(x, y) {
  let real = x;
  let imag = y;
  let iter = 0;
  while (real * real + imag * imag <= 4 && iter < maxIter) {
    let temp = real * real - imag * imag + x;
    imag = 2 * real * imag + y;
    real = temp;
    iter++;
  }
  return iter;
}

function drawMandelbrot() {
  let level = "";
  for (let j = 0; j < gridHeight; j++) {
    for (let i = 0; i < gridWidth; i++) {
      let x = centerX + (i - gridWidth / 2) * (zoom / gridWidth);
      let y = centerY + (j - gridHeight / 2) * (zoom / gridHeight);
      let iter = mandelbrot(x, y);
      let char = Math.floor(iter / (maxIter / shades.length));
      level += shades[Math.min(char, shades.length - 1)];
    }
    level += "\n";
  }
  setMap(map`${level}`);
}

drawMandelbrot();

onInput("w", () => { centerY -= zoom * 0.1; drawMandelbrot(); });
onInput("s", () => { centerY += zoom * 0.1; drawMandelbrot(); });
onInput("a", () => { centerX -= zoom * 0.1; drawMandelbrot(); });
onInput("d", () => { centerX += zoom * 0.1; drawMandelbrot(); });
onInput("i", () => { zoom *= 0.8; drawMandelbrot(); });
onInput("k", () => { zoom *= 1.25; drawMandelbrot(); });

